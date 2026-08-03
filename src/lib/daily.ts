import type { DiffLevel } from "@/lib/data/question-banks";

export function dayIndex() {
  const start = new Date(2026, 5, 22);
  const now = new Date();
  const diff = Math.floor((now.getTime() - start.getTime()) / 86400000);
  return Math.max(0, diff);
}

/** Nivel de dificultad del día (1–5), rotativo y suave */
export function getDailyLevel(): DiffLevel {
  const d = dayIndex();
  return ((d % 5) + 1) as DiffLevel;
}
