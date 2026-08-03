import { SESSION_GOALS, SESSION_GOAL_TOTAL } from "@/lib/progress-goals";
import { ALL_BADGES, xpProgress } from "@/lib/progression";
import {
  analyzeSkills,
  parentRecommendations,
} from "@/lib/skill-insights";
import type { ProgressReportData } from "@/lib/report-pdf";
import { downloadProgressReportPdf } from "@/lib/report-pdf";
import type { BookFicha } from "@/lib/game-store";

export type ReportSource = {
  playerName: string;
  mathCompleted: number[];
  languageCompleted: number[];
  englishCompleted: number[];
  /** Official sessions finished (preferred count for PDF) */
  areaSessionCount?: { math: number; language: number; english: number };
  books: [BookFicha, BookFicha];
  totalCorrect: number;
  totalWrong: number;
  streak: number;
  maxStreak: number;
  points: number;
  xp: number;
  badges: string[];
  skillStats: Record<string, { ok: number; bad: number }>;
  bossBeaten?: { math: boolean; language: boolean; english: boolean };
  perfectMissions?: number;
  levelRuns?: {
    math: Record<number, number>;
    language: Record<number, number>;
    english: Record<number, number>;
  };
};

function areaDone(
  sessions: number | undefined,
  completed: number[],
): number {
  const a = typeof sessions === "number" ? sessions : 0;
  const b = completed?.length ?? 0;
  return Math.max(a, b);
}

export function buildReportFromState(s: ReportSource): ProgressReportData {
  const prog = xpProgress(s.xp);
  const answered = (s.totalCorrect ?? 0) + (s.totalWrong ?? 0);
  const accuracy =
    answered === 0
      ? null
      : Math.round((s.totalCorrect / answered) * 100);

  const mathDone = areaDone(s.areaSessionCount?.math, s.mathCompleted);
  const langDone = areaDone(s.areaSessionCount?.language, s.languageCompleted);
  const engDone = areaDone(s.areaSessionCount?.english, s.englishCompleted);
  const readDone = (s.books ?? []).filter((b) => b.completed).length;

  const missionsCompleted = mathDone + langDone + engDone + readDone;
  const missionsTotal = SESSION_GOAL_TOTAL;

  const { strong, weak } = analyzeSkills(s.skillStats ?? {});

  const badgeNames = (s.badges ?? []).map(
    (id) => ALL_BADGES[id]?.name ?? id,
  );

  const observations = parentRecommendations(
    s.skillStats ?? {},
    accuracy,
    s.streak ?? 0,
    s.maxStreak ?? 0,
  );

  // Extra positive notes from real progress
  if (missionsCompleted > 0) {
    observations.unshift(
      `Ha completado ${missionsCompleted} partida(s) oficial(es) en total (mates, lengua, inglés y lectura).`,
    );
  }
  if ((s.xp ?? 0) > 0) {
    observations.unshift(
      `Lleva ${s.xp} XP y está en el nivel ${prog.level} (${prog.title}).`,
    );
  }
  if (s.bossBeaten?.math || s.bossBeaten?.language || s.bossBeaten?.english) {
    const bosses = [
      s.bossBeaten.math ? "Guardian de los Numeros" : null,
      s.bossBeaten.language ? "Bibliotecaria" : null,
      s.bossBeaten.english ? "English Sphinx" : null,
    ].filter(Boolean);
    observations.unshift(`Jefes vencidos: ${bosses.join(", ")}.`);
  }
  if ((s.perfectMissions ?? 0) > 0) {
    observations.unshift(
      `Partidas perfectas (sin errores): ${s.perfectMissions}.`,
    );
  }

  const now = new Date();
  const generatedAt = now.toLocaleString("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Level run summary line
  const levelSummary: string[] = [];
  if (s.levelRuns) {
    for (const area of ["math", "language", "english"] as const) {
      const runs = s.levelRuns[area];
      if (!runs) continue;
      const parts = Object.entries(runs)
        .filter(([, n]) => (n as number) > 0)
        .map(([lv, n]) => `Nv.${lv}×${n}`);
      if (parts.length) {
        const label =
          area === "math"
            ? "Mates"
            : area === "language"
              ? "Lengua"
              : "Ingles";
        levelSummary.push(`${label}: ${parts.join(", ")}`);
      }
    }
  }

  return {
    studentName: (s.playerName || "Aprendiz").trim() || "Aprendiz",
    period: "Verano 2026",
    mathDone,
    mathTotal: SESSION_GOALS.math,
    languageDone: langDone,
    languageTotal: SESSION_GOALS.language,
    englishDone: engDone,
    englishTotal: SESSION_GOALS.english,
    readingDone: readDone,
    readingTotal: SESSION_GOALS.reading,
    missionsCompleted,
    missionsTotal,
    accuracyPercent: accuracy,
    streakDays: s.streak ?? 0,
    maxStreak: s.maxStreak ?? 0,
    points: s.points ?? 0,
    xp: s.xp ?? 0,
    level: prog.level,
    levelTitle: prog.title,
    badges: badgeNames,
    strongAreas: strong.map((x) => `${x.label} (${x.accuracy}%)`),
    weakAreas: weak.map((x) => `${x.label} (${x.accuracy}%)`),
    observations: observations.slice(0, 8),
    generatedAt,
    totalCorrect: s.totalCorrect ?? 0,
    totalWrong: s.totalWrong ?? 0,
    bossBeaten: s.bossBeaten ?? {
      math: false,
      language: false,
      english: false,
    },
    perfectMissions: s.perfectMissions ?? 0,
    levelSummary,
  };
}

export function downloadLiveParentReport(
  s: ReportSource,
): { ok: true; filename: string } | { ok: false; error: string } {
  try {
    const data = buildReportFromState(s);
    const safe = (s.playerName || "aprendiz")
      .replace(/[^\w\-]+/g, "_")
      .slice(0, 24);
    const filename = `informe-progreso-academia-arcana-${safe || "aprendiz"}.pdf`;
    const result = downloadProgressReportPdf(data, filename);
    if (!result.ok) return result;
    return { ok: true, filename };
  } catch (e) {
    return {
      ok: false,
      error:
        e instanceof Error
          ? e.message
          : "No se pudo generar el informe. Inténtalo otra vez.",
    };
  }
}
