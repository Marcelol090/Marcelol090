import { GoogleGenAI } from "@google/genai";
import { errorStatus } from "./http.mjs";
import { buildPrompt } from "./prompt.mjs";
import { responseSchema } from "./schema.mjs";

export const PRIMARY = process.env.DORAN_GEMINI_MODEL || "gemini-2.5-flash";
export const FALLBACK = process.env.DORAN_GEMINI_FALLBACK_MODEL || "gemini-2.5-flash-lite";
const KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || "";
const TRANSIENT = new Set([0, 408, 429, 500, 502, 503, 504]);
export const aiConfigured = Boolean(KEY);

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

async function callModel(client, model, dossier) {
  const candidates = dossier.candidates.slice(0, 5);
  const leastFitCandidates = dossier.leastFitCandidates.slice(0, 3);
  const courseIds = candidates.map((candidate) => candidate.course);
  const leastFitCourseIds = leastFitCandidates.map((candidate) => candidate.course);
  const response = await client.models.generateContent({
    model,
    contents: buildPrompt(dossier, courseIds, leastFitCourseIds),
    config: {
      temperature: 0.2,
      responseMimeType: "application/json",
      responseSchema: responseSchema(courseIds, leastFitCourseIds),
    },
  });

  return {
    data: parseModelJson(response.text),
    model,
    usage: response.usageMetadata || response.usage_metadata || undefined,
  };
}

export async function analyze(dossier) {
  const client = new GoogleGenAI({ apiKey: KEY });
  const failures = [];
  for (const model of [PRIMARY, FALLBACK]) {
    for (let attempt = 1; attempt <= 2; attempt += 1) {
      try {
        return { ...(await callModel(client, model, dossier)), failures };
      } catch (error) {
        const failure = safeError(error, model, attempt);
        failures.push(failure);
        if (!TRANSIENT.has(failure.status) || attempt === 2) break;
        await sleep(450 * 2 ** (attempt - 1) + Math.floor(Math.random() * 250));
      }
    }
  }
  const last = failures.at(-1) || { status: 0, message: "Falha desconhecida no provedor" };
  const error = new Error(last.message);
  error.status = last.status;
  error.failures = failures;
  throw error;
}
