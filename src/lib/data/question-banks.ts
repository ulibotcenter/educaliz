// Bancos de preguntas por nivel — Academia Arcana
// Orquestador: tipos + helpers. Datos en ./banks/*

export type DiffLevel = 1 | 2 | 3 | 4 | 5;

export const LEVEL_META: Record<DiffLevel, { name: string; emoji: string; blurb: string }> = {
  1: { name: "Chispa", emoji: "✨", blurb: "Empezamos con calma" },
  2: { name: "Llama", emoji: "🔥", blurb: "Un poco más de magia" },
  3: { name: "Hechizo", emoji: "🪄", blurb: "Retos intermedios" },
  4: { name: "Arcano", emoji: "📜", blurb: "Nivel avanzado" },
  5: { name: "Maestría", emoji: "👑", blurb: "¡Desafío de maga!" },
};

/** Alias de nombres de nivel (UI / informes) */
export const LEVEL_LABELS: Record<DiffLevel, string> = {
  1: LEVEL_META[1].name,
  2: LEVEL_META[2].name,
  3: LEVEL_META[3].name,
  4: LEVEL_META[4].name,
  5: LEVEL_META[5].name,
};

export type MathQ = {
  id: string;
  level: DiffLevel;
  type: string;
  prompt: string;
  answer: number;
  hint: string;
  explanation: string;
};

export type LangQ = {
  id: string;
  level: DiffLevel;
  title: string;
  tip: string;
  text: string;
  options: string[];
  answer: string;
  explanation: string;
  skillTag: string;
  hint: string;
  showSentence: boolean;
};

export type EngQ = {
  id: string;
  level: DiffLevel;
  kind: "translate" | "choose" | "complete";
  prompt: string;
  promptEs: string;
  options: string[];
  answer: string;
  hint: string;
  explanation: string;
};

export { MATH_BANK } from "@/lib/data/banks/math-bank";
export { LANG_BANK } from "@/lib/data/banks/language-bank";
export { ENG_BANK } from "@/lib/data/banks/english-bank";

import { MATH_BANK } from "@/lib/data/banks/math-bank";
import { LANG_BANK } from "@/lib/data/banks/language-bank";
import { ENG_BANK } from "@/lib/data/banks/english-bank";

export function bankByLevel<T extends { level: DiffLevel }>(bank: T[], level: DiffLevel): T[] {
  return bank.filter((q) => q.level === level);
}

export function pickRandom<T>(arr: T[], n: number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a.slice(0, Math.min(n, a.length));
}

export function pickMathSession(level: DiffLevel, n = 5): MathQ[] {
  return pickRandom(bankByLevel(MATH_BANK, level), n);
}
export function pickLangSession(level: DiffLevel, n = 5): LangQ[] {
  return pickRandom(bankByLevel(LANG_BANK, level), n);
}
export function pickEngSession(level: DiffLevel, n = 5): EngQ[] {
  return pickRandom(bankByLevel(ENG_BANK, level), n);
}

export function countInLevel(area: "math" | "language" | "english", level: DiffLevel): number {
  if (area === "math") return bankByLevel(MATH_BANK, level).length;
  if (area === "language") return bankByLevel(LANG_BANK, level).length;
  return bankByLevel(ENG_BANK, level).length;
}
