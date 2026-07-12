import { QUESTIONS, WORK_VALUES } from "@/lib/assessment";

export const STORAGE_KEY = "doran-op-v2-state";

export const INITIAL_STATE = {
  currentQuestion: 0,
  answers: Array(QUESTIONS.length).fill(null),
  reason: "Primeira formação",
  duration: "Curso técnico",
  energy: "",
  limits: "",
  values: Object.fromEntries(WORK_VALUES.map((item) => [item.key, 3])),
};

export function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!parsed || !Array.isArray(parsed.answers) || parsed.answers.length !== QUESTIONS.length) return INITIAL_STATE;
    return { ...INITIAL_STATE, ...parsed, values: { ...INITIAL_STATE.values, ...parsed.values } };
  } catch {
    return INITIAL_STATE;
  }
}
