import { MATH_TASKS } from "@/lib/data/math-tasks";
import { LANGUAGE_SENTENCES } from "@/lib/data/language-tasks";
import { ENGLISH_TASKS } from "@/lib/data/english-tasks";

export function dayIndex() {
  const start = new Date(2026, 5, 22);
  const now = new Date();
  const diff = Math.floor((now.getTime() - start.getTime()) / 86400000);
  return Math.max(0, diff);
}

export function getDailyIds() {
  const d = dayIndex();
  return {
    mathId: (d % MATH_TASKS.length) + 1,
    langId: LANGUAGE_SENTENCES[d % LANGUAGE_SENTENCES.length]!.id,
    engId: ENGLISH_TASKS[d % ENGLISH_TASKS.length]!.id,
  };
}
