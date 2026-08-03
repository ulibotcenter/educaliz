/** Extract / apply PlayerProgress to and from the live game store. */

import {
  normalizeThemeId,
  type BookFicha,
  type GameState,
  type ThemeId,
} from "@/lib/game-store";
import { DEFAULT_AVATAR, normalizeAvatar } from "@/lib/progression";
import type { PlayerProgress } from "@/lib/profiles/types";

const emptyBook = (): BookFicha => ({
  titulo: "",
  trata: "",
  gusto: "",
  nota: 0,
  dibujo: "⭐",
  completed: false,
});

const emptyRuns = () => ({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }) as const;

export function emptyProgress(displayName: string): PlayerProgress {
  return {
    playerName: displayName || "Maga",
    points: 0,
    xp: 0,
    streak: 0,
    lastPlayDate: null,
    mathCompleted: [],
    languageCompleted: [],
    englishCompleted: [],
    books: [emptyBook(), emptyBook()],
    badges: [],
    totalCorrect: 0,
    totalWrong: 0,
    playMode: "official",
    reviewQueue: [],
    avatar: { ...DEFAULT_AVATAR },
    unlockedStories: ["intro"],
    pendingStoryId: null,
    bossBeaten: { math: false, language: false, english: false },
    perfectMissions: 0,
    skillStats: {},
    maxStreak: 0,
    recentBadgeIds: [],
    diagnosticDone: false,
    diagnosticSkipped: false,
    suggestedFocus: null,
    theme: "aurora",
    session: null,
    levelRuns: {
      math: { ...emptyRuns() },
      language: { ...emptyRuns() },
      english: { ...emptyRuns() },
    },
    areaSessionCount: { math: 0, language: 0, english: 0 },
    dailyParts: {
      date: new Date().toISOString().slice(0, 10),
      math: false,
      language: false,
      english: false,
    },
    rouletteSpins: 0,
    lastRouletteDate: null,
    tempBadges: {},
    equippedTempBadge: null,
    ownedShopItems: [],
    lastAppOpen: null,
  };
}

/** Snapshot serializable fields from live game state */
export function snapshotProgress(s: GameState): PlayerProgress {
  return {
    playerName: s.playerName,
    points: s.points,
    xp: s.xp,
    streak: s.streak,
    lastPlayDate: s.lastPlayDate,
    mathCompleted: [...s.mathCompleted],
    languageCompleted: [...s.languageCompleted],
    englishCompleted: [...s.englishCompleted],
    books: [
      { ...s.books[0] },
      { ...s.books[1] },
    ],
    badges: [...s.badges],
    totalCorrect: s.totalCorrect,
    totalWrong: s.totalWrong,
    playMode: s.playMode,
    reviewQueue: s.reviewQueue.map((r) => ({ ...r })),
    avatar: normalizeAvatar(s.avatar),
    unlockedStories: [...s.unlockedStories],
    pendingStoryId: s.pendingStoryId,
    bossBeaten: { ...s.bossBeaten },
    perfectMissions: s.perfectMissions,
    skillStats: { ...s.skillStats },
    maxStreak: s.maxStreak,
    recentBadgeIds: [...s.recentBadgeIds],
    diagnosticDone: s.diagnosticDone,
    diagnosticSkipped: s.diagnosticSkipped,
    suggestedFocus: s.suggestedFocus,
    theme: normalizeThemeId(s.theme) as ThemeId,
    session: null,
    levelRuns: {
      math: { ...s.levelRuns.math },
      language: { ...s.levelRuns.language },
      english: { ...s.levelRuns.english },
    },
    areaSessionCount: { ...s.areaSessionCount },
    dailyParts: { ...s.dailyParts },
    rouletteSpins: s.rouletteSpins,
    lastRouletteDate: s.lastRouletteDate,
    tempBadges: { ...s.tempBadges },
    equippedTempBadge: s.equippedTempBadge ?? null,
    ownedShopItems: [...s.ownedShopItems],
    lastAppOpen: s.lastAppOpen,
  };
}

/** Patch to apply onto the game store when selecting a profile */
export function progressToGamePatch(
  p: PlayerProgress,
  displayName: string,
): Partial<GameState> {
  return {
    playerName: displayName || p.playerName || "Maga",
    points: p.points ?? 0,
    xp: p.xp ?? 0,
    streak: p.streak ?? 0,
    lastPlayDate: p.lastPlayDate ?? null,
    mathCompleted: p.mathCompleted ?? [],
    languageCompleted: p.languageCompleted ?? [],
    englishCompleted: p.englishCompleted ?? [],
    books: p.books ?? [emptyBook(), emptyBook()],
    badges: p.badges ?? [],
    totalCorrect: p.totalCorrect ?? 0,
    totalWrong: p.totalWrong ?? 0,
    playMode: p.playMode ?? "official",
    reviewQueue: p.reviewQueue ?? [],
    avatar: normalizeAvatar(p.avatar),
    unlockedStories: p.unlockedStories?.length ? p.unlockedStories : ["intro"],
    pendingStoryId: p.pendingStoryId ?? null,
    bossBeaten: p.bossBeaten ?? { math: false, language: false, english: false },
    perfectMissions: p.perfectMissions ?? 0,
    skillStats: p.skillStats ?? {},
    maxStreak: p.maxStreak ?? 0,
    recentBadgeIds: p.recentBadgeIds ?? [],
    diagnosticDone: p.diagnosticDone ?? false,
    diagnosticSkipped: p.diagnosticSkipped ?? false,
    suggestedFocus: p.suggestedFocus ?? null,
    theme: normalizeThemeId(p.theme),
    session: null,
    levelRuns: p.levelRuns ?? {
      math: { ...emptyRuns() },
      language: { ...emptyRuns() },
      english: { ...emptyRuns() },
    },
    areaSessionCount: p.areaSessionCount ?? {
      math: 0,
      language: 0,
      english: 0,
    },
    dailyParts: p.dailyParts ?? {
      date: new Date().toISOString().slice(0, 10),
      math: false,
      language: false,
      english: false,
    },
    rouletteSpins: p.rouletteSpins ?? 0,
    lastRouletteDate: p.lastRouletteDate ?? null,
    tempBadges: p.tempBadges ?? {},
    equippedTempBadge: p.equippedTempBadge ?? null,
    ownedShopItems: p.ownedShopItems ?? [],
    lastAppOpen: p.lastAppOpen ?? null,
    view: "home",
  };
}
