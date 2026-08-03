/**
 * Multi-student profiles — local today, Supabase-ready shape tomorrow.
 * Progress is a serializable snapshot of the game store (no actions).
 */

import type { AvatarConfig } from "@/lib/progression";
import type {
  BookFicha,
  DailyParts,
  FocusArea,
  LevelRuns,
  PlayMode,
  ReviewKey,
  ThemeId,
} from "@/lib/game-store";
import type { SkillStat } from "@/lib/skill-insights";
import type { DiffLevel } from "@/lib/data/question-banks";

/** Serializable progress bound to one student profile */
export type PlayerProgress = {
  playerName: string;
  points: number;
  xp: number;
  streak: number;
  lastPlayDate: string | null;
  mathCompleted: number[];
  languageCompleted: number[];
  englishCompleted: number[];
  books: [BookFicha, BookFicha];
  badges: string[];
  totalCorrect: number;
  totalWrong: number;
  playMode: PlayMode;
  reviewQueue: ReviewKey[];
  avatar: AvatarConfig;
  unlockedStories: string[];
  pendingStoryId: string | null;
  bossBeaten: { math: boolean; language: boolean; english: boolean };
  perfectMissions: number;
  skillStats: Record<string, SkillStat>;
  maxStreak: number;
  recentBadgeIds: string[];
  diagnosticDone: boolean;
  diagnosticSkipped: boolean;
  suggestedFocus: FocusArea | null;
  theme: ThemeId;
  session: null;
  levelRuns: { math: LevelRuns; language: LevelRuns; english: LevelRuns };
  areaSessionCount: { math: number; language: number; english: number };
  dailyParts: DailyParts;
  rouletteSpins: number;
  lastRouletteDate: string | null;
  tempBadges: Record<string, number>;
  ownedShopItems: string[];
  lastAppOpen: string | null;
  /** Not restored as play view — always home on load */
  view?: never;
};

export type StudentProfile = {
  id: string;
  /** Unique handle: lowercase letters + numbers, no spaces */
  username: string;
  /** Friendly name shown in UI / ranking */
  displayName: string;
  /** Optional 4-digit PIN (plain local for kids; hash when moving to Supabase) */
  pin: string | null;
  createdAt: string;
  updatedAt: string;
  /** True when student met tournament min goal */
  tournamentEligible: boolean;
  /** Week XP bucket for future "esta semana" filter */
  weekXp: number;
  weekKey: string;
  progress: PlayerProgress;
};

export type ProfilesRegistry = {
  version: number;
  activeProfileId: string | null;
  profiles: Record<string, StudentProfile>;
};

export type RankingRow = {
  rank: number;
  profileId: string;
  username: string;
  displayName: string;
  avatar: AvatarConfig;
  level: number;
  xp: number;
  streak: number;
  tournamentEligible: boolean;
};

export type CreateProfileInput = {
  username: string;
  displayName: string;
  pin?: string | null;
};

export type UsernameCheck =
  | { ok: true; normalized: string }
  | { ok: false; error: string };

/** Username: 3–16 chars, letters/numbers only (no spaces) */
export function validateUsername(raw: string): UsernameCheck {
  const normalized = raw.trim().toLowerCase();
  if (normalized.length < 3) {
    return { ok: false, error: "El nombre debe tener al menos 3 letras o números." };
  }
  if (normalized.length > 16) {
    return { ok: false, error: "Máximo 16 letras o números." };
  }
  if (!/^[a-z0-9]+$/.test(normalized)) {
    return {
      ok: false,
      error: "Solo letras y números, sin espacios ni símbolos.",
    };
  }
  return { ok: true, normalized };
}

export function validatePin(pin: string | null | undefined): string | null {
  if (pin == null || pin === "") return null;
  if (!/^\d{4}$/.test(pin)) return null;
  return pin;
}

export function weekKeyNow(d = new Date()): string {
  // ISO week-ish key for future weekly ranking filter
  const tmp = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = tmp.getUTCDay() || 7;
  tmp.setUTCDate(tmp.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((tmp.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${tmp.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

export type { DiffLevel };
