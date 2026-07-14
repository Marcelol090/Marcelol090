const rawBaseUrl = import.meta.env.VITE_DORAN_API_URL || "";
const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");
const HEALTH_TIMEOUT_MS = 7000;
const REPORT_TIMEOUT_MS = 52000;

export function apiUrl(path) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalized}`;
}

function responseMessage(status, text) {
  if (status === 429) return "O limite temporário da análise foi atingido. Tente novamente mais tarde.";
  if (status === 503) return "A análise inteligente está temporariamente indisponível. Seu resultado local continua válido.";
  if (status >= 500) return "O servidor encontrou um erro ao processar a análise.";
  if (status === 404) return "A rota da análise não foi encontrada. O frontend e o backend podem estar fora de sincronia.";
  if (status >= 400) return "A solicitação foi recusada pelo servidor.";
  return text || "A resposta do servidor não pôde ser interpretada.";
}

function requestSignal(externalSignal, timeoutMs) {
  const controller = new AbortController();
  let timedOut = false;

  const abortFromExternal = () => controller.abort(externalSignal?.reason);
  if (externalSignal?.aborted) abortFromExternal();
  else externalSignal?.addEventListener("abort", abortFromExternal, { once: true });

  const timeout = globalThis.setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  return {
    signal: controller.signal,
    didTimeout: () => timedOut,
    cleanup() {
      globalThis.clearTimeout(timeout);
      externalSignal?.removeEventListener("abort", abortFromExternal);
    },
  };
}

export async function readApiResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();
  let payload = null;

  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      if (contentType.includes("application/json")) {
        const error = new Error("O backend declarou JSON, mas devolveu uma resposta inválida.");
        error.details = { status: response.status, contentType, responsePreview: text.slice(0, 320) };
        throw error;
      }
    }
  }

  if (!response.ok) {
    const message = payload?.message || payload?.error || responseMessage(response.status, text.slice(0, 180));
    const error = new Error(message);
    error.details = payload || {
      status: response.status,
      contentType,
      responsePreview: text.slice(0, 320),
    };
    throw error;
  }

  if (!payload || typeof payload !== "object") {
    const error = new Error("O servidor respondeu, mas não enviou JSON válido.");
    error.details = { status: response.status, contentType, responsePreview: text.slice(0, 320) };
    throw error;
  }

  return payload;
}

async function request(path, options, externalSignal, timeoutMs) {
  const controlled = requestSignal(externalSignal, timeoutMs);
  try {
    const response = await fetch(apiUrl(path), {
      ...options,
      signal: controlled.signal,
    });
    return await readApiResponse(response);
  } catch (error) {
    if (controlled.didTimeout()) {
      const timeoutError = new Error(
        path === "/api/report" && options?.method === "POST"
          ? "A análise excedeu o limite operacional. Seu resultado local continua disponível."
          : "A API demorou demais para responder.",
      );
      timeoutError.name = "TimeoutError";
      timeoutError.details = { timeoutMs, path };
      throw timeoutError;
    }

    if (error instanceof TypeError) {
      const networkError = new Error("Não foi possível conectar ao servidor do Doran.");
      networkError.name = "NetworkError";
      networkError.details = { path, cause: error.message };
      throw networkError;
    }

    throw error;
  } finally {
    controlled.cleanup();
  }
}

export function requestAIReport(dossier, signal) {
  return request(
    "/api/report",
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ consentToAI: true, dossier }),
    },
    signal,
    REPORT_TIMEOUT_MS,
  );
}

export function getApiHealth(signal) {
  return request(
    "/api/report",
    {
      method: "GET",
      headers: { accept: "application/json" },
      cache: "no-store",
    },
    signal,
    HEALTH_TIMEOUT_MS,
  );
}

export { API_BASE_URL };
