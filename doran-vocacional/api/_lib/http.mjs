const hits = new Map();

export const send = (res, status, data) => {
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  res.end(JSON.stringify(data));
};

export function allow(req) {
  const key = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "x").split(",")[0];
  const now = Date.now();
  const attempts = (hits.get(key) || []).filter((timestamp) => now - timestamp < 600000);
  if (attempts.length >= 5) return false;
  attempts.push(now);
  hits.set(key, attempts);
  return true;
}

export function read(req) {
  return new Promise((resolve, reject) => {
    let text = "";
    let bytes = 0;
    req.on("data", (chunk) => {
      bytes += chunk.length;
      if (bytes > 262144) {
        reject(new Error("Payload muito grande"));
        req.destroy();
        return;
      }
      text += chunk;
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(text || "{}"));
      } catch {
        reject(new Error("JSON inválido"));
      }
    });
    req.on("error", reject);
  });
}

function cleanText(value, max = 1200) {
  return typeof value === "string" ? value.replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, max) : "";
}

function cleanStringArray(value, maxItems = 12, maxLength = 180) {
  if (!Array.isArray(value)) return [];
  return value.slice(0, maxItems).map((item) => cleanText(item, maxLength)).filter(Boolean);
}

export function sanitizeDossier(input) {
  const candidates = Array.isArray(input?.candidates)
    ? input.candidates.slice(0, 10).map((item) => ({
        course: cleanText(item?.course, 100),
        axis: cleanText(item?.axis, 100),
        code: cleanText(item?.code, 6),
        fit: Math.max(0, Math.min(1, Number(item?.fit) || 0)),
        relativeProbability: Math.max(0, Math.min(100, Number(item?.relativeProbability) || 0)),
      })).filter((item) => item.course)
    : [];

  const leastFitCandidates = Array.isArray(input?.leastFitCandidates)
    ? input.leastFitCandidates.slice(0, 5).map((item) => ({
        course: cleanText(item?.course, 100),
        axis: cleanText(item?.axis, 100),
        code: cleanText(item?.code, 6),
        fit: Math.max(0, Math.min(1, Number(item?.fit) || 0)),
      })).filter((item) => item.course)
    : [];

  const averages = input?.riasec?.averages && typeof input.riasec.averages === "object"
    ? Object.fromEntries([..."RIASEC"].map((letter) => [letter, Math.max(0, Math.min(5, Number(input.riasec.averages[letter]) || 0))]))
    : {};

  const adaptiveAnswers = input?.context?.adaptiveAnswers && typeof input.context.adaptiveAnswers === "object"
    ? Object.fromEntries(
        Object.entries(input.context.adaptiveAnswers)
          .slice(0, 20)
          .map(([key, value]) => [cleanText(key, 80), cleanText(value, 180)])
          .filter(([key, value]) => key && value),
      )
    : {};

  return {
    schema: "doran-op-v5.1",
    boundary: cleanText(input?.boundary, 350),
    riasec: {
      code: cleanText(input?.riasec?.code, 3),
      averages,
    },
    context: {
      reason: cleanText(input?.context?.reason, 120),
      duration: cleanText(input?.context?.duration, 120),
      weeklyAvailability: cleanText(input?.context?.weeklyAvailability, 120),
      formatPreference: cleanText(input?.context?.formatPreference, 120),
      energy: cleanText(input?.context?.energy),
      experience: cleanText(input?.context?.experience),
      limits: cleanText(input?.context?.limits),
      values: input?.context?.values && typeof input.context.values === "object" ? input.context.values : {},
      avoidedEnvironments: cleanStringArray(input?.context?.avoidedEnvironments),
      avoidedRoutines: cleanStringArray(input?.context?.avoidedRoutines),
      rejectedArea: cleanText(input?.context?.rejectedArea, 120),
      adaptiveModules: cleanStringArray(input?.context?.adaptiveModules, 4),
      adaptiveAnswers,
    },
    candidates,
    leastFitCandidates,
  };
}

export function errorStatus(error) {
  const candidates = [error?.status, error?.code, error?.response?.status, error?.error?.code, error?.cause?.status];
  for (const candidate of candidates) {
    const value = Number(candidate);
    if (Number.isInteger(value) && value >= 100 && value <= 599) return value;
  }
  const match = String(error?.message || "").match(/\b(4\d\d|5\d\d)\b/);
  return match ? Number(match[1]) : 0;
}
