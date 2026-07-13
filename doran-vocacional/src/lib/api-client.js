const rawBaseUrl = import.meta.env.VITE_DORAN_API_URL || "";
const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

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

export async function requestAIReport(dossier, signal) {
  const response = await fetch(apiUrl("/api/report"), {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({ consentToAI: true, dossier }),
    signal,
  });
  return readApiResponse(response);
}

export async function getApiHealth(signal) {
  const response = await fetch(apiUrl("/api/report"), {
    method: "GET",
    headers: { accept: "application/json" },
    cache: "no-store",
    signal,
  });
  return readApiResponse(response);
}

export { API_BASE_URL };
