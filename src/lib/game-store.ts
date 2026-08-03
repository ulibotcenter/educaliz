import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ALL_BADGES,
  DEFAULT_AVATAR,
  STORY_CHAPTERS,
  levelFromXp,
  type AvatarConfig,
  xpProgress,
} from "@/lib/progression";
import type { SkillStat } from "@/lib/skill-insights";
import type { DiffLevel } from "@/lib/data/question-banks";
import {
  pickMathSession,
  pickLangSession,
  pickEngSession,
} from "@/lib/data/question-banks";
import { messageForPrize } from "@/lib/roulette-prizes";

export type ViewId =
  | "home"
  | "math"
  | "math-play"
  | "math-boss"
  | "language"
  | "language-play"
  | "language-boss"
  | "english"
  | "english-play"
  | "english-boss"
  | "reading"
  | "progress"
  | "daily"
  | "avatar"
  | "story"
  | "diagnostic";

export type PlayMode = "practice" | "official";

export type ReviewKey = {
  area: "math" | "language" | "english";
  key: string;
  fails: number;
  lastFail: string;
};

export type BookFicha = {
  titulo: string;
  trata: string;
  gusto: string;
  nota: number;
  dibujo: string;
  completed: boolean;
};

export type FocusArea = "math" | "language" | "english" | "balanced";
export type ThemeId = "chispa" | "trueno";

export type PlaySession = {
  area: "math" | "language" | "english";
  level: DiffLevel;
  ids: string[];
};

export type LevelRuns = Record<DiffLevel, number>;

export type DailyParts = {
  date: string;
  math: boolean;
  language: boolean;
  english: boolean;
};

const emptyRuns = (): LevelRuns => ({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
const emptyDaily = (): DailyParts => ({
  date: new Date().toISOString().slice(0, 10),
  math: false,
  language: false,
  english: false,
});

export type GameState = {
  playerName: string;
  points: number;
  xp: number;
  streak: number;
  lastPlayDate: string | null;
  mathCompleted: number[];
  mathExerciseDone: Record<string, boolean>;
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
  session: PlaySession | null;
  levelRuns: { math: LevelRuns; language: LevelRuns; english: LevelRuns };
  areaSessionCount: { math: number; language: number; english: number };
  dailyParts: DailyParts;
  rouletteSpins: number;
  lastRouletteDate: string | null;
  tempBadges: Record<string, number>;
  lastAppOpen: string | null;
  view: ViewId;
  activeMathTask: number | null;
  activeLangId: number | null;
  activeEngId: number | null;
  setView: (v: ViewId) => void;
  setName: (n: string) => void;
  setPlayMode: (m: PlayMode) => void;
  setTheme: (t: ThemeId) => void;
  setAvatar: (partial: Partial<AvatarConfig>) => void;
  startMath: (taskId: number) => void;
  startLang: (id: number) => void;
  startEng: (id: number) => void;
  startLevel: (area: "math" | "language" | "english", level: DiffLevel) => void;
  clearSession: () => void;
  completeSession: () => void;
  spinRoulette: (sliceId: string) => string;
  touchActivity: () => void;
  startBoss: (zone: "math" | "language" | "english") => void;
  awardCorrect: (pts?: number) => void;
  awardWrong: () => void;
  awardXp: (amount: number) => void;
  recordSkill: (tag: string, result: "ok" | "bad") => void;
  recordFail: (area: ReviewKey["area"], key: string) => void;
  clearReviewKey: (area: ReviewKey["area"], key: string) => void;
  completeMathExercise: (taskId: number, exIndex: number) => void;
  completeLanguage: (id: number) => void;
  completeEnglish: (id: number) => void;
  recordPerfectMission: () => void;
  beatBoss: (zone: "math" | "language" | "english") => void;
  dismissStory: () => void;
  finishDiagnostic: (focus: FocusArea) => void;
  skipDiagnostic: () => void;
  saveBook: (index: 0 | 1, data: Partial<BookFicha>) => void;
  resetProgress: () => void;
};

const emptyBook = (): BookFicha => ({
  titulo: "",
  trata: "",
  gusto: "",
  nota: 0,
  dibujo: "⭐",
  completed: false,
});

const today = () => new Date().toISOString().slice(0, 10);

function maybeAddBadge(badges: string[], id: string): string[] {
  if (badges.includes(id)) return badges;
  return [...badges, id];
}

function trackNewBadges(prev: string[], next: string[], recent: string[]): string[] {
  const added = next.filter((id) => !prev.includes(id));
  if (added.length === 0) return recent;
  return [...added, ...recent].slice(0, 12);
}

function bumpSkill(
  stats: Record<string, SkillStat>,
  tag: string | undefined,
  result: "ok" | "bad",
): Record<string, SkillStat> {
  if (!tag) return stats;
  const cur = stats[tag] ?? { ok: 0, bad: 0 };
  return {
    ...stats,
    [tag]:
      result === "ok"
        ? { ok: cur.ok + 1, bad: cur.bad }
        : { ok: cur.ok, bad: cur.bad + 1 },
  };
}

function unlockStoriesForState(s: {
  xp: number;
  streak: number;
  badges: string[];
  unlockedStories: string[];
  bossBeaten: { math: boolean; language: boolean; english: boolean };
  mathCompleted: number[];
  languageCompleted: number[];
}): { unlockedStories: string[]; pendingStoryId: string | null; newIds: string[] } {
  const level = levelFromXp(s.xp);
  const unlocked = new Set(s.unlockedStories);
  const newIds: string[] = [];

  for (const ch of STORY_CHAPTERS) {
    if (unlocked.has(ch.id)) continue;
    let ok = false;
    if (ch.unlock === "level" && level >= Number(ch.value)) ok = true;
    if (ch.unlock === "streak" && s.streak >= Number(ch.value)) ok = true;
    if (ch.unlock === "boss" && ch.value === "math" && s.bossBeaten.math) ok = true;
    if (ch.unlock === "boss" && ch.value === "language" && s.bossBeaten.language) ok = true;
    if (ch.unlock === "boss" && ch.value === "english" && s.bossBeaten.english) ok = true;
    if (ch.unlock === "zone" && ch.value === "math-half" && s.mathCompleted.length >= 15)
      ok = true;
    if (ch.unlock === "zone" && ch.value === "lang-half" && s.languageCompleted.length >= 8)
      ok = true;
    if (ok) {
      unlocked.add(ch.id);
      newIds.push(ch.id);
    }
  }

  if (!unlocked.has("intro")) {
    unlocked.add("intro");
    if (!s.unlockedStories.includes("intro")) newIds.push("intro");
  }

  const list = [...unlocked];
  const pending = newIds.length > 0 ? newIds[newIds.length - 1]! : null;

  return {
    unlockedStories: list,
    pendingStoryId: pending && !s.unlockedStories.includes(pending) ? pending : null,
    newIds,
  };
}

function ensureDaily(parts: DailyParts): DailyParts {
  const d = today();
  if (parts.date === d) return parts;
  return emptyDaily();
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      playerName: "Liz",
      points: 0,
      xp: 0,
      streak: 0,
      lastPlayDate: null,
      mathCompleted: [],
      mathExerciseDone: {},
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
      theme: "chispa",
      session: null,
      levelRuns: { math: emptyRuns(), language: emptyRuns(), english: emptyRuns() },
      areaSessionCount: { math: 0, language: 0, english: 0 },
      dailyParts: emptyDaily(),
      rouletteSpins: 0,
      lastRouletteDate: null,
      tempBadges: {},
      lastAppOpen: null,
      view: "home",
      activeMathTask: null,
      activeLangId: null,
      activeEngId: null,

      setView: (v) => set({ view: v }),
      setName: (n) => set({ playerName: n.trim() || "Liz" }),
      setPlayMode: (m) => set({ playMode: m }),
      setTheme: (t) => set({ theme: t }),
      setAvatar: (partial) => set({ avatar: { ...get().avatar, ...partial } }),

      startMath: (taskId) => set({ activeMathTask: taskId, view: "math-play" }),
      startLang: (id) => set({ activeLangId: id, view: "language-play" }),
      startEng: (id) => set({ activeEngId: id, view: "english-play" }),

      startLevel: (area, level) => {
        const n = 5;
        let ids: string[] = [];
        if (area === "math") ids = pickMathSession(level, n).map((q) => q.id);
        else if (area === "language") ids = pickLangSession(level, n).map((q) => q.id);
        else ids = pickEngSession(level, n).map((q) => q.id);
        const view =
          area === "math"
            ? "math-play"
            : area === "language"
              ? "language-play"
              : "english-play";
        set({ session: { area, level, ids }, view });
      },

      clearSession: () => set({ session: null }),

      completeSession: () => {
        const s = get();
        const sess = s.session;
        if (!sess) return;
        if (s.playMode === "practice") {
          set({ session: null });
          return;
        }
        const levelRuns = {
          ...s.levelRuns,
          [sess.area]: {
            ...s.levelRuns[sess.area],
            [sess.level]: (s.levelRuns[sess.area][sess.level] ?? 0) + 1,
          },
        };
        const areaSessionCount = {
          ...s.areaSessionCount,
          [sess.area]: s.areaSessionCount[sess.area] + 1,
        };
        const token = Math.floor(Date.now() / 1000) + areaSessionCount[sess.area];
        let mathCompleted = s.mathCompleted;
        let languageCompleted = s.languageCompleted;
        let englishCompleted = s.englishCompleted;
        if (sess.area === "math") mathCompleted = [...mathCompleted, token];
        if (sess.area === "language") languageCompleted = [...languageCompleted, token];
        if (sess.area === "english") englishCompleted = [...englishCompleted, token];

        const dailyParts = { ...ensureDaily(s.dailyParts) };
        dailyParts[sess.area] = true;

        set({
          session: null,
          levelRuns,
          areaSessionCount,
          mathCompleted,
          languageCompleted,
          englishCompleted,
          dailyParts,
          rouletteSpins: s.rouletteSpins + 1,
        });
      },

      touchActivity: () => {
        const s = get();
        const now = Date.now();
        const last = s.lastAppOpen ? Date.parse(s.lastAppOpen) : 0;
        let tempBadges = { ...s.tempBadges };
        if (last && now - last > 24 * 60 * 60 * 1000) {
          tempBadges = {};
        }
        for (const [id, exp] of Object.entries(tempBadges)) {
          if (exp <= now) delete tempBadges[id];
        }
        const dailyParts = ensureDaily(s.dailyParts);
        set({ lastAppOpen: new Date().toISOString(), tempBadges, dailyParts });
      },

      spinRoulette: (sliceId) => {
        const s = get();
        const d = today();
        let spins = s.rouletteSpins;
        let lastRouletteDate = s.lastRouletteDate;
        const free = lastRouletteDate !== d;
        if (!free && spins <= 0) return "No te quedan giros.";
        if (free) lastRouletteDate = d;
        else spins = Math.max(0, spins - 1);

        let xp = s.xp;
        let points = s.points;
        const tempBadges = { ...s.tempBadges };
        const exp = Date.now() + 24 * 60 * 60 * 1000;

        if (sliceId.startsWith("xp")) {
          const n = Number(sliceId.replace("xp", "")) || 10;
          xp += n;
          points += Math.max(1, Math.floor(n / 2));
        } else if (sliceId === "badge-brisa") {
          tempBadges["temp-brisa"] = exp;
        } else if (sliceId === "badge-chispa") {
          tempBadges["temp-chispa"] = exp;
        } else if (sliceId === "badge-eco") {
          tempBadges["temp-eco"] = exp;
        } else {
          xp += 10;
          points += 5;
        }

        const msg = messageForPrize(sliceId);

        set({
          rouletteSpins: spins,
          lastRouletteDate,
          xp,
          points,
          tempBadges,
          lastAppOpen: new Date().toISOString(),
        });
        return msg;
      },

      startBoss: (zone) => {
        if (zone === "math") set({ view: "math-boss" });
        else if (zone === "language") set({ view: "language-boss" });
        else set({ view: "english-boss" });
      },

      awardXp: (amount) => {
        const s = get();
        if (s.playMode === "practice" || amount <= 0) return;
        const xp = s.xp + amount;
        let badges = s.badges;
        const nextLevel = levelFromXp(xp);
        if (nextLevel >= 5) badges = maybeAddBadge(badges, "level-5");
        if (nextLevel >= 10) badges = maybeAddBadge(badges, "level-10");
        const story = unlockStoriesForState({ ...s, xp, badges });
        set({
          xp,
          badges,
          unlockedStories: story.unlockedStories,
          pendingStoryId: story.pendingStoryId ?? s.pendingStoryId,
        });
      },

      awardCorrect: (pts = 10) => {
        const s = get();
        if (s.playMode === "practice") {
          set({ totalCorrect: s.totalCorrect + 1 });
          return;
        }
        const d = today();
        let streak = s.streak;
        let streakBonusXp = 0;
        let badges = s.badges;
        if (s.lastPlayDate !== d) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const y = yesterday.toISOString().slice(0, 10);
          streak = s.lastPlayDate === y ? s.streak + 1 : 1;
          streakBonusXp = 5;
          if (streak >= 3) badges = maybeAddBadge(badges, "racha-3");
          if (streak >= 7) badges = maybeAddBadge(badges, "racha-7");
          if (streak === 3) streakBonusXp += 15;
          if (streak === 7) streakBonusXp += 30;
        }
        if (s.points + pts >= 100) badges = maybeAddBadge(badges, "cien-puntos");
        if (s.points + pts >= 500) badges = maybeAddBadge(badges, "quinientos");

        const xpGain = pts + streakBonusXp;
        const xp = s.xp + xpGain;
        const nextLevel = levelFromXp(xp);
        if (nextLevel >= 5) badges = maybeAddBadge(badges, "level-5");
        if (nextLevel >= 10) badges = maybeAddBadge(badges, "level-10");
        const story = unlockStoriesForState({ ...s, xp, streak, badges });
        const recentBadgeIds = trackNewBadges(s.badges, badges, s.recentBadgeIds);
        const maxStreak = Math.max(s.maxStreak, streak);

        const now = Date.now();
        let tempBadges = { ...s.tempBadges };
        const last = s.lastAppOpen ? Date.parse(s.lastAppOpen) : 0;
        if (last && now - last > 24 * 60 * 60 * 1000) tempBadges = {};

        set({
          points: s.points + pts,
          xp,
          totalCorrect: s.totalCorrect + 1,
          streak,
          maxStreak,
          lastPlayDate: d,
          badges,
          recentBadgeIds,
          unlockedStories: story.unlockedStories,
          pendingStoryId: story.pendingStoryId ?? s.pendingStoryId,
          lastAppOpen: new Date().toISOString(),
          tempBadges,
        });
      },

      awardWrong: () => set({ totalWrong: get().totalWrong + 1 }),

      recordSkill: (tag, result) => {
        set({ skillStats: bumpSkill(get().skillStats, tag, result) });
      },

      recordFail: (area, key) => {
        const queue = [...get().reviewQueue];
        const i = queue.findIndex((r) => r.area === area && r.key === key);
        const d = today();
        if (i >= 0) {
          queue[i] = { ...queue[i]!, fails: queue[i]!.fails + 1, lastFail: d };
        } else {
          queue.push({ area, key, fails: 1, lastFail: d });
        }
        queue.sort((a, b) => b.fails - a.fails);
        set({ reviewQueue: queue.slice(0, 40) });
      },

      clearReviewKey: (area, key) => {
        set({
          reviewQueue: get().reviewQueue.filter(
            (r) => !(r.area === area && r.key === key),
          ),
        });
      },

      completeMathExercise: () => {},
      completeLanguage: () => {},
      completeEnglish: () => {},

      recordPerfectMission: () => {
        const s = get();
        if (s.playMode === "practice") return;
        const badges = maybeAddBadge(s.badges, "perfect-mission");
        set({
          perfectMissions: s.perfectMissions + 1,
          badges,
          recentBadgeIds: trackNewBadges(s.badges, badges, s.recentBadgeIds),
        });
      },

      beatBoss: (zone) => {
        const s = get();
        if (s.bossBeaten[zone]) return;
        const bossBeaten = { ...s.bossBeaten, [zone]: true };
        let badges = s.badges;
        if (zone === "math") badges = maybeAddBadge(badges, "boss-math");
        if (zone === "language") badges = maybeAddBadge(badges, "boss-lang");
        if (zone === "english") badges = maybeAddBadge(badges, "boss-eng");
        const bonusXp = 80;
        const bonusPts = 50;
        const xp = s.xp + bonusXp;
        const story = unlockStoriesForState({ ...s, bossBeaten, badges, xp });
        const recentBadgeIds = trackNewBadges(s.badges, badges, s.recentBadgeIds);
        set({
          bossBeaten,
          badges,
          recentBadgeIds,
          xp,
          points: s.points + bonusPts,
          unlockedStories: story.unlockedStories,
          pendingStoryId: story.pendingStoryId,
        });
      },

      dismissStory: () => set({ pendingStoryId: null }),

      finishDiagnostic: (focus) =>
        set({
          diagnosticDone: true,
          diagnosticSkipped: false,
          suggestedFocus: focus,
          view: "daily",
          playMode: "official",
        }),

      skipDiagnostic: () =>
        set({
          diagnosticSkipped: true,
          view: "home",
        }),

      saveBook: (index, data) => {
        const books = [...get().books] as [BookFicha, BookFicha];
        const merged = { ...books[index], ...data };
        const completed =
          merged.titulo.trim().length > 0 &&
          merged.trata.trim().length > 10 &&
          merged.gusto.trim().length > 5 &&
          merged.nota > 0;
        books[index] = { ...merged, completed };
        let badges = get().badges;
        if (books[0].completed && books[1].completed) {
          badges = maybeAddBadge(badges, "lectora");
        }
        set({ books, badges });
      },

      resetProgress: () =>
        set({
          points: 0,
          xp: 0,
          streak: 0,
          lastPlayDate: null,
          mathCompleted: [],
          mathExerciseDone: {},
          languageCompleted: [],
          englishCompleted: [],
          books: [emptyBook(), emptyBook()],
          badges: [],
          totalCorrect: 0,
          totalWrong: 0,
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
          session: null,
          levelRuns: { math: emptyRuns(), language: emptyRuns(), english: emptyRuns() },
          areaSessionCount: { math: 0, language: 0, english: 0 },
          dailyParts: emptyDaily(),
          rouletteSpins: 0,
          lastRouletteDate: null,
          tempBadges: {},
          lastAppOpen: null,
          view: "home",
          activeMathTask: null,
          activeLangId: null,
          activeEngId: null,
        }),
    }),
    { name: "liz-academia-arcana-v4" },
  ),
);

export const BADGE_INFO = ALL_BADGES;

export function getXpBar() {
  const xp = useGameStore.getState().xp;
  return xpProgress(xp);
}
