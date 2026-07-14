import { allow, errorStatus, read, sanitizeDossier, send } from "./_lib/http.mjs";
import { finalize } from "./_lib/finalize.mjs";
import {
  aiConfigured,
  analyze,
  ATTEMPT_TIMEOUT_MS,
  FALLBACK,
  PRIMARY,
  TOTAL_TIMEOUT_MS,
} from "./_lib/provider.mjs";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return send(res, 200, {
      ok: true,
      service: "doran-op-unified",
      version: "5.1.1",
      apiMode: "generate-content-structured",
      primaryModel: PRIMARY,
      fallbackModel: FALLBACK,
      aiConfigured,
      timeoutPolicy: {
        attemptMs: ATTEMPT_TIMEOUT_MS,
        totalMs: TOTAL_TIMEOUT_MS,
      },
    });
  }
  if (req.method !== "POST") return send(res, 405, { error: "method_not_allowed" });
  if (!aiConfigured) {
    return send(res, 503, {
      error: "ai_not_configured",
      message: "A variável GEMINI_API_KEY ainda não foi configurada na Vercel.",
    });
  }
  if (!allow(req)) {
    return send(res, 429, {
      error: "rate_limited",
      message: "Limite temporário. Tente novamente em alguns minutos.",
    });
  }

  try {
    const body = await read(req);
    if (body.consentToAI !== true) {
      return send(res, 400, { error: "consent_required", message: "É necessário consentimento explícito." });
    }
    const dossier = sanitizeDossier(body.dossier);
    if (dossier.candidates.length < 3) {
      return send(res, 400, { error: "invalid_dossier", message: "Dossiê inválido ou incompleto." });
    }
    const analysis = await analyze(dossier);
    return send(res, 200, finalize(dossier, analysis));
  } catch (error) {
    const upstreamStatus = errorStatus(error);
    const publicStatus = upstreamStatus === 429 ? 429 : upstreamStatus >= 400 && upstreamStatus < 500 ? 400 : 503;
    console.error("Gemini analysis failed", {
      upstreamStatus,
      message: String(error?.message || "").slice(0, 500),
      failures: error?.failures,
    });
    return send(res, publicStatus, {
      error: upstreamStatus === 429 ? "ai_rate_limited" : "ai_unavailable",
      message:
        upstreamStatus === 429
          ? "A cota do Gemini foi atingida. Tente novamente após a renovação do limite."
          : "O Gemini não conseguiu concluir a análise dentro do limite operacional. O modelo de fallback também foi tentado.",
      upstreamStatus: upstreamStatus || undefined,
      attempts: error?.failures,
    });
  }
}
