import { GoogleGenAI } from "@google/genai";
import { errorStatus } from "./http.mjs";
import { buildPrompt } from "./prompt.mjs";
import { responseSchema } from "./schema.mjs";

export const PRIMARY = process.env.DORAN_GEMINI_MODEL || "gemini-2.5-flash";
export const FALLBACK = process.env.DORAN_GEMINI_FALLBACK_MODEL || "gemini-2.5-flash-lite";
const KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || "";
const TRANSIENT = new Set([0, 408, 429, 500, 502, 503, 504]);
export const aiConfigured = Boolean(KEY);

function boundedInteger(value, fallback, minimum, maximum) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(minimum, Math.min(maximum, parsed));
}

export const ATTEMPT_TIMEOUT_MS = boundedInteger(
  process.env.DORAN_AI_ATTEMPT_TIMEOUT_MS,
  12000,
  5000,
  25000,
);
export const TOTAL_TIMEOUT_MS = boundedInteger(
  process.env.DORAN_AI_TOTAL_TIMEOUT_MS,
  48000,
  15000,
  54000,
);

const MIN_REMAINING_MS = 2500;

function safeError(error, model, attempt) {
  return {
    model,
    attempt,
    status: errorStatus(error),
    message: String(error?.message || "Falha desconhecida no provedor").slice(0, 500),
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function timeoutError(model, timeoutMs, scope = "tentativa") {
  const error = new Error(`O modelo ${model} excedeu o limite de ${timeoutMs} ms por ${scope}.`);
  error.status = 504;
  error.code = scope === "orçamento total" ? "AI_TOTAL_TIMEOUT" : "AI_ATTEMPT_TIMEOUT";
  return error;
}

async function withTimeout(promise, timeoutMs, model) {
  let timer;
  try {
    return await Promise.race([
      promise,
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(timeoutError(model, timeoutMs)), timeoutMs);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

function parseModelJson(text) {
  if (!text || typeof text !== "string") throw new Error("Resposta estruturada ausente");
  try {
    return JSON.parse(text);
  } catch {
    const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1];
    if (fenced) return JSON.parse(fenced);
    throw new Error("O Gemini devolveu JSON inválido");
  }
}

async function callModel(client, model, dossier, timeoutMs) {
  const candidates = dossier.candidates.slice(0, 5);
  const leastFitCandidates = dossier.leastFitCandidates.slice(0, 3);
  const courseIds = candidates.map((candidate) => candidate.course);
  const leastFitCourseIds = leastFitCandidates.map((candidate) => candidate.course);
  const request = client.models.generateContent({
    model,
    contents: buildPrompt(dossier, courseIds, leastFitCourseIds),
    config: {
      temperature: 0.2,
      responseMimeType: "application/json",
      responseSchema: responseSchema(courseIds, leastFitCourseIds),
    },
  });
  const response = await withTimeout(request, timeoutMs, model);

  return {
    data: parseModelJson(response.text),
    model,
    usage: response.usageMetadata || response.usage_metadata || undefined,
  };
}

export async function analyze(dossier) {
  const client = new GoogleGenAI({ apiKey: KEY });
  const failures = [];
  const deadline = Date.now() + TOTAL_TIMEOUT_MS;

  modelLoop:
  for (const model of [PRIMARY, FALLBACK]) {
    for (let attempt = 1; attempt <= 2; attempt += 1) {
      const remaining = deadline - Date.now();
      if (remaining < MIN_REMAINING_MS) {
        failures.push(safeError(timeoutError(model, TOTAL_TIMEOUT_MS, "orçamento total"), model, attempt));
        break modelLoop;
      }

      const timeoutMs = Math.max(1000, Math.min(ATTEMPT_TIMEOUT_MS, remaining - 1500));
      try {
        return { ...(await callModel(client, model, dossier, timeoutMs)), failures };
      } catch (error) {
        const failure = safeError(error, model, attempt);
        failures.push(failure);
        if (!TRANSIENT.has(failure.status) || attempt === 2) break;

        const backoffMs = 450 * 2 ** (attempt - 1) + Math.floor(Math.random() * 250);
        const availableForBackoff = deadline - Date.now() - MIN_REMAINING_MS;
        if (availableForBackoff <= 0) break modelLoop;
        await sleep(Math.min(backoffMs, availableForBackoff));
      }
    }
  }

  const last = failures.at(-1) || { status: 0, message: "Falha desconhecida no provedor" };
  const error = new Error(last.message);
  error.status = last.status;
  error.failures = failures;
  throw error;
}
