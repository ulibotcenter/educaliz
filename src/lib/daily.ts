import type { DiffLevel } from "@/lib/data/question-banks";

export function dayIndex() {
  const start = new Date(2026, 5, 22);
  const now = new Date();
  const diff = Math.floor((now.getTime() - start.getTime()) / 86400000);
  return Math.max(0, diff);
}

export type DailyLevelInput = {
  /** Official sessions finished per area (new profiles = 0 → Chispa) */
  areaSessionCount?: { math?: number; language?: number; english?: number };
  /** Optional: highest level the child already played successfully */
  levelRuns?: {
    math?: Partial<Record<number, number>>;
    language?: Partial<Record<number, number>>;
    english?: Partial<Record<number, number>>;
  };
};

/**
 * Difficulty for “Misión de hoy”.
 * - Brand-new profiles always start at Chispa (1).
 * - Rises gently with official practice (never calendar-based).
 * - Manual higher levels stay available on each tower map.
 */
export function getDailyLevel(input: DailyLevelInput = {}): DiffLevel {
  const m = input.areaSessionCount?.math ?? 0;
  const l = input.areaSessionCount?.language ?? 0;
  const e = input.areaSessionCount?.english ?? 0;
  const total = Math.max(0, m + l + e);

  // Soft ladder: need a few official runs before climbing
  let bySessions: DiffLevel = 1;
  if (total >= 3) bySessions = 2;
  if (total >= 9) bySessions = 3;
  if (total >= 18) bySessions = 4;
  if (total >= 30) bySessions = 5;

  // If they already cleared higher levels on the map, allow daily to match
  // (but never jump a brand-new profile past Chispa)
  let byExperience: DiffLevel = 1;
  if (input.levelRuns && total > 0) {
    let maxPlayed = 1;
    for (const area of ["math", "language", "english"] as const) {
      const runs = input.levelRuns[area] ?? {};
      for (const [lv, n] of Object.entries(runs)) {
        if ((n as number) > 0) maxPlayed = Math.max(maxPlayed, Number(lv) || 1);
      }
    }
    byExperience = Math.min(5, Math.max(1, maxPlayed)) as DiffLevel;
  }

  // Prefer session ladder; experience can only raise by 1 step max over sessions
  const recommended = Math.min(
    5,
    Math.max(bySessions, Math.min(byExperience, bySessions + 1)),
  ) as DiffLevel;

  return recommended;
}
