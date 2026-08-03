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
  books: [BookFicha, BookFicha];
  totalCorrect: number;
  totalWrong: number;
  streak: number;
  maxStreak: number;
  points: number;
  xp: number;
  badges: string[];
  skillStats: Record<string, { ok: number; bad: number }>;
};

export function buildReportFromState(s: ReportSource): ProgressReportData {
  const prog = xpProgress(s.xp);
  const accuracy =
    s.totalCorrect + s.totalWrong === 0
      ? null
      : Math.round((s.totalCorrect / (s.totalCorrect + s.totalWrong)) * 100);

  const mathDone = s.mathCompleted.length;
  const langDone = s.languageCompleted.length;
  const engDone = s.englishCompleted.length;
  const readDone = s.books.filter((b) => b.completed).length;

  const missionsCompleted = mathDone + langDone + engDone + readDone;
  const missionsTotal = SESSION_GOAL_TOTAL;

  const { strong, weak } = analyzeSkills(s.skillStats);

  const badgeNames = s.badges.map((id) => ALL_BADGES[id]?.name ?? id);

  const observations = parentRecommendations(
    s.skillStats,
    accuracy,
    s.streak,
    s.maxStreak,
  );

  const now = new Date();
  const generatedAt = now.toLocaleString("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return {
    studentName: s.playerName,
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
    streakDays: s.streak,
    maxStreak: s.maxStreak,
    points: s.points,
    xp: s.xp,
    level: prog.level,
    levelTitle: prog.title,
    badges: badgeNames,
    strongAreas: strong.map((x) => `${x.label} (${x.accuracy}%)`),
    weakAreas: weak.map((x) => `${x.label} (${x.accuracy}%)`),
    observations,
    generatedAt,
  };
}

export function downloadLiveParentReport(s: ReportSource) {
  const data = buildReportFromState(s);
  const safe = (s.playerName || "Liz").replace(/[^\w\-]+/g, "_").slice(0, 24);
  downloadProgressReportPdf(
    data,
    `informe-progreso-academia-arcana-${safe}.pdf`,
  );
}
