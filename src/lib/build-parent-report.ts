import { MATH_TASKS } from "@/lib/data/math-tasks";
import { LANGUAGE_SENTENCES } from "@/lib/data/language-tasks";
import { ENGLISH_TASKS } from "@/lib/data/english-tasks";
import { ALL_BADGES, xpProgress } from "@/lib/progression";
import {
  analyzeSkills,
  parentRecommendations,
  skillLabel,
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
  const missionsTotal =
    MATH_TASKS.length + LANGUAGE_SENTENCES.length + ENGLISH_TASKS.length + 2;

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
    mathTotal: MATH_TASKS.length,
    languageDone: langDone,
    languageTotal: LANGUAGE_SENTENCES.length,
    englishDone: engDone,
    englishTotal: ENGLISH_TASKS.length,
    readingDone: readDone,
    readingTotal: 2,
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
