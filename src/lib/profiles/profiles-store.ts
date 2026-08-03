/**
 * Multi-profile registry (localStorage). Ready to swap for Supabase later:
 * - listProfiles / createProfile / selectProfile map cleanly to REST/RPC.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { levelFromXp } from "@/lib/progression";
import { useGameStore } from "@/lib/game-store";
import {
  emptyProgress,
  progressToGamePatch,
  snapshotProgress,
} from "@/lib/profiles/progress";
import { isTournamentEligible } from "@/lib/profiles/tournament";
import {
  type CreateProfileInput,
  type PlayerProgress,
  type RankingRow,
  type StudentProfile,
  type UsernameCheck,
  validatePin,
  validateUsername,
  weekKeyNow,
} from "@/lib/profiles/types";

export const USERNAME_TAKEN_MSG =
  "Este nome já está a ser usado. Escolhe outro.";

const LEGACY_GAME_KEY = "liz-academia-arcana-v4";

function newId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function nowIso() {
  return new Date().toISOString();
}

type ProfilesState = {
  activeProfileId: string | null;
  profiles: Record<string, StudentProfile>;
  bootstrapped: boolean;

  listProfiles: () => StudentProfile[];
  getActive: () => StudentProfile | null;
  isUsernameTaken: (username: string, exceptId?: string) => boolean;
  checkUsername: (
    raw: string,
    exceptId?: string,
  ) => UsernameCheck | { ok: false; error: string };

  createProfile: (
    input: CreateProfileInput,
  ) => { ok: true; profile: StudentProfile } | { ok: false; error: string };

  selectProfile: (
    id: string,
    pin?: string,
  ) => { ok: true } | { ok: false; error: string };

  syncActiveFromGame: () => void;
  signOutToPicker: () => void;
  ranking: (limit?: number) => RankingRow[];
  bootstrapFromLegacy: () => void;
};

function applyProgressToGame(progress: PlayerProgress, displayName: string) {
  useGameStore.setState(progressToGamePatch(progress, displayName) as never);
}

export const useProfilesStore = create<ProfilesState>()(
  persist(
    (set, get) => ({
      activeProfileId: null,
      profiles: {},
      bootstrapped: false,

      listProfiles: () =>
        Object.values(get().profiles).sort((a, b) =>
          a.displayName.localeCompare(b.displayName, "es"),
        ),

      getActive: () => {
        const id = get().activeProfileId;
        if (!id) return null;
        return get().profiles[id] ?? null;
      },

      isUsernameTaken: (username, exceptId) => {
        const u = username.trim().toLowerCase();
        return Object.values(get().profiles).some(
          (p) => p.username === u && p.id !== exceptId,
        );
      },

      checkUsername: (raw, exceptId) => {
        const v = validateUsername(raw);
        if (!v.ok) return v;
        if (get().isUsernameTaken(v.normalized, exceptId)) {
          return { ok: false, error: USERNAME_TAKEN_MSG };
        }
        return v;
      },

      createProfile: (input) => {
        const check = get().checkUsername(input.username);
        if (!check.ok) return { ok: false, error: check.error };

        const pin = validatePin(input.pin ?? null);
        if (input.pin && input.pin.length > 0 && !pin) {
          return {
            ok: false,
            error: "El PIN debe ser exactamente 4 dígitos (o déjalo vacío).",
          };
        }

        const displayName =
          input.displayName.trim() ||
          check.normalized.charAt(0).toUpperCase() + check.normalized.slice(1);

        get().syncActiveFromGame();

        const id = newId();
        const progress = emptyProgress(displayName);
        const profile: StudentProfile = {
          id,
          username: check.normalized,
          displayName,
          pin,
          createdAt: nowIso(),
          updatedAt: nowIso(),
          tournamentEligible: false,
          weekXp: 0,
          weekKey: weekKeyNow(),
          progress,
        };

        set((s) => ({
          profiles: { ...s.profiles, [id]: profile },
          activeProfileId: id,
        }));

        applyProgressToGame(progress, displayName);
        return { ok: true, profile };
      },

      selectProfile: (id, pin) => {
        const profile = get().profiles[id];
        if (!profile) return { ok: false, error: "No encontramos ese perfil." };

        if (profile.pin) {
          if (!pin || pin !== profile.pin) {
            return { ok: false, error: "PIN incorrecto. Prueba otra vez." };
          }
        }

        get().syncActiveFromGame();

        set({ activeProfileId: id });
        applyProgressToGame(profile.progress, profile.displayName);
        const eligible = isTournamentEligible(profile.progress);
        if (eligible !== profile.tournamentEligible) {
          set((s) => ({
            profiles: {
              ...s.profiles,
              [id]: { ...profile, tournamentEligible: eligible },
            },
          }));
        }
        return { ok: true };
      },

      syncActiveFromGame: () => {
        const id = get().activeProfileId;
        if (!id) return;
        const prev = get().profiles[id];
        if (!prev) return;

        const game = useGameStore.getState();
        const progress = snapshotProgress(game);
        const displayName = (game.playerName || prev.displayName).trim() || prev.displayName;
        progress.playerName = displayName;

        const wk = weekKeyNow();
        let weekXp = prev.weekXp;
        let weekKey = prev.weekKey;
        if (weekKey !== wk) {
          weekKey = wk;
          weekXp = 0;
        }
        if (progress.xp > (prev.progress.xp ?? 0) && weekKey === wk) {
          weekXp += progress.xp - (prev.progress.xp ?? 0);
        }

        const tournamentEligible = isTournamentEligible(progress);

        const next: StudentProfile = {
          ...prev,
          displayName,
          updatedAt: nowIso(),
          tournamentEligible,
          weekXp,
          weekKey,
          progress,
        };

        set((s) => ({
          profiles: { ...s.profiles, [id]: next },
        }));
      },

      signOutToPicker: () => {
        get().syncActiveFromGame();
        set({ activeProfileId: null });
      },

      ranking: (limit = 20) => {
        const rows = Object.values(get().profiles)
          .map((p) => ({
            profileId: p.id,
            username: p.username,
            displayName: p.displayName,
            avatar: p.progress.avatar,
            level: levelFromXp(p.progress.xp),
            xp: p.progress.xp,
            streak: p.progress.streak,
            tournamentEligible: p.tournamentEligible,
          }))
          .sort((a, b) => {
            if (b.xp !== a.xp) return b.xp - a.xp;
            if (b.level !== a.level) return b.level - a.level;
            return a.displayName.localeCompare(b.displayName, "es");
          })
          .slice(0, limit)
          .map((r, i) => ({ ...r, rank: i + 1 }));
        return rows;
      },

      bootstrapFromLegacy: () => {
        if (get().bootstrapped) return;
        const existing = Object.keys(get().profiles);
        if (existing.length > 0) {
          set({ bootstrapped: true });
          const aid = get().activeProfileId;
          if (aid && get().profiles[aid]) {
            const p = get().profiles[aid]!;
            applyProgressToGame(p.progress, p.displayName);
          }
          return;
        }

        let legacyProgress: PlayerProgress | null = null;
        let displayName = "Liz";
        try {
          const raw = localStorage.getItem(LEGACY_GAME_KEY);
          if (raw) {
            const parsed = JSON.parse(raw) as {
              state?: Record<string, unknown>;
            };
            const st = parsed.state;
            if (st && typeof st === "object") {
              const base = emptyProgress(
                typeof st.playerName === "string" ? st.playerName : "Liz",
              );
              const merged = {
                ...base,
                ...(st as Partial<PlayerProgress>),
                session: null as null,
              };
              const patch = progressToGamePatch(
                merged,
                typeof st.playerName === "string" ? st.playerName : "Liz",
              );
              useGameStore.setState(patch as never);
              legacyProgress = snapshotProgress(useGameStore.getState());
              displayName =
                typeof st.playerName === "string" && st.playerName.trim()
                  ? st.playerName.trim()
                  : "Liz";
            }
          }
        } catch {
          /* ignore */
        }

        if (!legacyProgress) {
          set({ bootstrapped: true, activeProfileId: null });
          return;
        }

        let finalUser = "liz";
        let n = 1;
        while (get().isUsernameTaken(finalUser)) {
          finalUser = `liz${n++}`;
        }

        const id = newId();
        const profile: StudentProfile = {
          id,
          username: finalUser,
          displayName,
          pin: null,
          createdAt: nowIso(),
          updatedAt: nowIso(),
          tournamentEligible: isTournamentEligible(legacyProgress),
          weekXp: legacyProgress.xp,
          weekKey: weekKeyNow(),
          progress: legacyProgress,
        };

        set({
          profiles: { [id]: profile },
          activeProfileId: id,
          bootstrapped: true,
        });
        applyProgressToGame(legacyProgress, displayName);
      },
    }),
    {
      name: "academia-arcana-profiles-v1",
      version: 1,
      partialize: (s) => ({
        activeProfileId: s.activeProfileId,
        profiles: s.profiles,
      }),
    },
  ),
);

export function usernameAvailability(
  raw: string,
  exceptId?: string,
): UsernameCheck | { ok: false; error: string } {
  return useProfilesStore.getState().checkUsername(raw, exceptId);
}
