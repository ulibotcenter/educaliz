/**
 * Multi-profile store — Supabase is source of truth when configured.
 * localStorage keeps active session + offline cache.
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
import {
  CLOUD_ERROR_MSG,
  isSupabaseConfigured,
} from "@/lib/supabase/client";
import {
  deleteProfileRemote,
  fetchAllProfiles,
  fetchProfileById,
  insertProfile,
  isUsernameTakenRemote,
  updateProfileRemote,
  upsertProfileByUsername,
} from "@/lib/profiles/supabase-api";
import {
  FRIEND_XP,
  REFERRER_XP,
  generateInviteCode,
  normalizeInviteCode,
} from "@/lib/profiles/referral";

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

function toMap(list: StudentProfile[]): Record<string, StudentProfile> {
  const m: Record<string, StudentProfile> = {};
  for (const p of list) m[p.id] = ensureInviteFields(p);
  return m;
}

function ensureInviteFields(p: StudentProfile): StudentProfile {
  const inviteCode =
    p.inviteCode && p.inviteCode.length > 0
      ? p.inviteCode
      : generateInviteCode(p.username, p.id);
  return {
    ...p,
    inviteCode,
    referralCount: typeof p.referralCount === "number" ? p.referralCount : 0,
    referredBy: p.referredBy ?? null,
  };
}

function findByInviteCode(
  profiles: Record<string, StudentProfile>,
  code: string,
): StudentProfile | null {
  const c = normalizeInviteCode(code);
  if (!c) return null;
  for (const p of Object.values(profiles)) {
    const fixed = ensureInviteFields(p);
    const codes = new Set(
      [
        fixed.inviteCode,
        generateInviteCode(fixed.username, fixed.id),
        // Also match codes stored only inside progress JSON
        (fixed.progress as { inviteCode?: string } | null)?.inviteCode,
      ]
        .filter(Boolean)
        .map((x) => normalizeInviteCode(String(x))),
    );
    if (codes.has(c)) return fixed;
  }
  return null;
}

/** Keep the richer progress when merging local vs cloud copies of the same profile */
function mergeProfilePreferRicher(
  local: StudentProfile | undefined,
  remote: StudentProfile,
): StudentProfile {
  if (!local) return ensureInviteFields(remote);
  const l = ensureInviteFields(local);
  const r = ensureInviteFields(remote);
  const localXp = l.progress.xp ?? 0;
  const remoteXp = r.progress.xp ?? 0;
  const localRef = l.referralCount ?? 0;
  const remoteRef = r.referralCount ?? 0;
  const localTime = Date.parse(l.updatedAt || "") || 0;
  const remoteTime = Date.parse(r.updatedAt || "") || 0;

  // Prefer higher XP / referral counts (referral rewards must never be lost)
  const useLocalProgress =
    localXp > remoteXp ||
    (localXp === remoteXp && localRef > remoteRef) ||
    (localXp === remoteXp && localRef === remoteRef && localTime > remoteTime);

  if (!useLocalProgress) {
    return ensureInviteFields({
      ...r,
      referralCount: Math.max(localRef, remoteRef),
      inviteCode: l.inviteCode || r.inviteCode,
      referredBy: r.referredBy ?? l.referredBy,
    });
  }

  return ensureInviteFields({
    ...l,
    // keep cloud pin/username if present
    pin: r.pin ?? l.pin,
    username: r.username || l.username,
    displayName: l.displayName || r.displayName,
    referralCount: Math.max(localRef, remoteRef),
    progress: {
      ...r.progress,
      ...l.progress,
      xp: Math.max(localXp, remoteXp),
      points: Math.max(l.progress.points ?? 0, r.progress.points ?? 0),
    },
    weekXp: Math.max(l.weekXp ?? 0, r.weekXp ?? 0),
    updatedAt: localTime >= remoteTime ? l.updatedAt : r.updatedAt,
  });
}

function awardReferrerXp(referrer: StudentProfile): StudentProfile {
  const base = ensureInviteFields(referrer);
  const xp = (base.progress.xp || 0) + REFERRER_XP;
  const points = (base.progress.points || 0) + Math.floor(REFERRER_XP / 2);
  return ensureInviteFields({
    ...base,
    referralCount: (base.referralCount || 0) + 1,
    weekXp: (base.weekXp || 0) + REFERRER_XP,
    updatedAt: nowIso(),
    progress: {
      ...base.progress,
      xp,
      points,
      // keep invite meta inside progress for cloud round-trips
      ...( {
        inviteCode: base.inviteCode,
        referralCount: (base.referralCount || 0) + 1,
        referredBy: base.referredBy,
      } as object),
    },
  });
}


type ActionResult = { ok: true } | { ok: false; error: string };
type CreateResult =
  | { ok: true; profile: StudentProfile }
  | { ok: false; error: string };


function isTombstoned(
  s: { deletedIds: string[]; deletedUsernames: string[] },
  id: string,
  username?: string,
): boolean {
  if (s.deletedIds.includes(id)) return true;
  if (username && s.deletedUsernames.includes(username.trim().toLowerCase())) {
    return true;
  }
  return false;
}

function withTombstone(
  s: ProfilesState,
  id: string,
  username: string,
): Partial<ProfilesState> {
  const deletedIds = s.deletedIds.includes(id)
    ? s.deletedIds
    : [...s.deletedIds, id];
  const u = username.trim().toLowerCase();
  const deletedUsernames =
    u && !s.deletedUsernames.includes(u)
      ? [...s.deletedUsernames, u]
      : s.deletedUsernames;
  const profiles = { ...s.profiles };
  delete profiles[id];
  const activeProfileId =
    s.activeProfileId === id ? null : s.activeProfileId;
  return { deletedIds, deletedUsernames, profiles, activeProfileId };
}

type ProfilesState = {
  activeProfileId: string | null;
  profiles: Record<string, StudentProfile>;
  /** Tombstones so deleted profiles never reappear from cloud or cache */
  deletedIds: string[];
  deletedUsernames: string[];
  bootstrapped: boolean;
  loading: boolean;
  cloudEnabled: boolean;
  cloudError: string | null;
  lastSyncOk: boolean;

  listProfiles: () => StudentProfile[];
  getActive: () => StudentProfile | null;
  isUsernameTaken: (username: string, exceptId?: string) => boolean;
  checkUsername: (
    raw: string,
    exceptId?: string,
  ) => UsernameCheck | { ok: false; error: string };
  checkUsernameAsync: (
    raw: string,
    exceptId?: string,
  ) => Promise<UsernameCheck | { ok: false; error: string }>;

  createProfile: (input: CreateProfileInput) => Promise<CreateResult>;
  deleteProfile: (id: string) => Promise<ActionResult>;
  selectProfile: (id: string, pin?: string) => Promise<ActionResult>;
  syncActiveFromGame: () => void;
  /** Awaitable sync used before switch / ranking refresh */
  flushActiveToCloud: () => Promise<void>;
  refreshFromCloud: () => Promise<ActionResult>;
  signOutToPicker: () => void;
  ranking: (limit?: number) => RankingRow[];
  bootstrapFromLegacy: () => Promise<void>;
  clearCloudError: () => void;
};

function applyProgressToGame(progress: PlayerProgress, displayName: string) {
  useGameStore.setState(progressToGamePatch(progress, displayName) as never);
}

let syncTimer: ReturnType<typeof setTimeout> | null = null;
let syncInFlight = false;

export const useProfilesStore = create<ProfilesState>()(
  persist(
    (set, get) => ({
      activeProfileId: null,
      profiles: {},
      deletedIds: [],
      deletedUsernames: [],
      bootstrapped: false,
      loading: false,
      cloudEnabled: isSupabaseConfigured(),
      cloudError: null,
      lastSyncOk: true,

      clearCloudError: () => set({ cloudError: null }),

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

      checkUsernameAsync: async (raw, exceptId) => {
        const local = get().checkUsername(raw, exceptId);
        if (!local.ok) return local;
        if (!isSupabaseConfigured()) {
          set({ cloudEnabled: false });
          return local;
        }
        set({ cloudEnabled: true });

        const remote = await isUsernameTakenRemote(local.normalized, exceptId);
        if (!remote.ok) {
          // Soft-fail: allow local check if cloud flaky during typing
          return local;
        }
        if (remote.data) return { ok: false, error: USERNAME_TAKEN_MSG };
        return local;
      },

      createProfile: async (input) => {
        const cloudOn = isSupabaseConfigured();
        set({ cloudError: null, loading: true, cloudEnabled: cloudOn });
        try {
          const check = await get().checkUsernameAsync(input.username);
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
            check.normalized.charAt(0).toUpperCase() +
              check.normalized.slice(1);

          // Allow reusing a previously deleted username
          set((s) => ({
            deletedUsernames: s.deletedUsernames.filter(
              (u) => u !== check.normalized,
            ),
          }));

          await get().flushActiveToCloud();

          const id = newId();
          const progress = emptyProgress(displayName);
          const inviteCode = generateInviteCode(check.normalized, id);

          // Friend referral — only on real new profile creation
          let referredBy: string | null = null;
          let referrerPatch: StudentProfile | null = null;
          const rawFriend = (input.friendCode ?? "").trim();
          if (rawFriend) {
            const code = normalizeInviteCode(rawFriend);
            // Prefer cloud list if available
            if (cloudOn || get().cloudEnabled) {
              const all = await fetchAllProfiles();
              if (all.ok) {
                set((s) => ({
                  profiles: { ...s.profiles, ...toMap(all.data) },
                }));
              }
            }
            const referrer = findByInviteCode(get().profiles, code);
            if (!referrer) {
              return {
                ok: false,
                error: "Ese código de amigo no existe. Pídeselo otra vez o créalo sin código.",
              };
            }
            if (referrer.username === check.normalized) {
              return { ok: false, error: "No puedes usar tu propio código." };
            }
            referredBy = ensureInviteFields(referrer).inviteCode;
            progress.xp = (progress.xp || 0) + FRIEND_XP;
            progress.points = (progress.points || 0) + Math.floor(FRIEND_XP / 2);
            // Award +30 XP to the inviter (persisted even if they are offline)
            referrerPatch = awardReferrerXp(referrer);
            // Write inviter progress to local store immediately (before cloud)
            set((s) => ({
              profiles: {
                ...s.profiles,
                [referrerPatch!.id]: referrerPatch!,
              },
            }));
          }

          let profile: StudentProfile = ensureInviteFields({
            id,
            username: check.normalized,
            displayName,
            pin,
            createdAt: nowIso(),
            updatedAt: nowIso(),
            tournamentEligible: false,
            weekXp: progress.xp,
            weekKey: weekKeyNow(),
            inviteCode,
            referralCount: 0,
            referredBy,
            progress,
          });

          if (cloudOn || isSupabaseConfigured()) {
            set({ cloudEnabled: true });
            const remote = await insertProfile(profile);
            if (!remote.ok) {
              // Cloud failed — keep local progress, never block the child
              console.warn(
                "[Academia Arcana] Nube: no se pudo crear el perfil en la nube ·",
                remote.error,
                "· se guarda en local",
              );
              set((s) => {
                const profiles = { ...s.profiles, [id]: profile };
                if (referrerPatch) profiles[referrerPatch.id] = referrerPatch;
                return {
                  profiles,
                  activeProfileId: id,
                  lastSyncOk: false,
                  cloudError:
                    "La nube no respondió, pero tu perfil está guardado en este aparato. Puedes seguir jugando.",
                };
              });
              applyProgressToGame(progress, displayName);
              return { ok: true, profile };
            }
            let saved = ensureInviteFields(remote.data);
            // Prefer our full local snapshot if cloud row came back thinner
            saved = mergeProfilePreferRicher(profile, saved);
            // Persist invite meta if remote row lacked it
            if (!remote.data.inviteCode || referredBy) {
              const up = await updateProfileRemote({
                ...saved,
                inviteCode: saved.inviteCode || inviteCode,
                referredBy,
                referralCount: 0,
                progress: profile.progress,
              });
              if (up.ok) saved = mergeProfilePreferRicher(saved, up.data);
            }
            if (referrerPatch) {
              const upRef = await updateProfileRemote(referrerPatch);
              if (upRef.ok) {
                // Never accept a cloud row that lost the referral XP
                referrerPatch = mergeProfilePreferRicher(
                  referrerPatch,
                  upRef.data,
                );
                // If cloud still behind, force one more write with our richer copy
                if ((upRef.data.progress.xp ?? 0) < (referrerPatch.progress.xp ?? 0)) {
                  const retry = await updateProfileRemote(referrerPatch);
                  if (retry.ok) {
                    referrerPatch = mergeProfilePreferRicher(
                      referrerPatch,
                      retry.data,
                    );
                  }
                }
              }
              // Always keep the richer local copy in memory regardless of cloud
            }
            set((s) => {
              const profiles = {
                ...s.profiles,
                [saved.id]: saved,
              };
              if (referrerPatch) profiles[referrerPatch.id] = referrerPatch;
              return {
                profiles,
                activeProfileId: saved.id,
                lastSyncOk: true,
                cloudError: null,
              };
            });
            applyProgressToGame(saved.progress, saved.displayName);
            return { ok: true, profile: saved };
          }

          // Offline / no Supabase env — local only (progress stays safe)
          set((s) => {
            const profiles = { ...s.profiles, [id]: profile };
            if (referrerPatch) profiles[referrerPatch.id] = referrerPatch;
            return {
              profiles,
              activeProfileId: id,
              cloudEnabled: false,
              cloudError: null,
            };
          });
          applyProgressToGame(progress, displayName);
          return { ok: true, profile };
        } finally {
          set({ loading: false });
        }
      },

      selectProfile: async (id, pin) => {
        const cloudOn = isSupabaseConfigured();
        set({ cloudError: null, loading: true, cloudEnabled: cloudOn });
        try {
          let profile = get().profiles[id];

          // Prefer fresh cloud copy
          if (cloudOn) {
            const remote = await fetchProfileById(id);
            if (remote.ok) {
              const local = get().profiles[id];
              profile = mergeProfilePreferRicher(local, remote.data);
              set((s) => ({
                profiles: { ...s.profiles, [id]: profile! },
              }));
              // Push local referral XP up if cloud was stale
              if (
                local &&
                (local.progress.xp ?? 0) > (remote.data.progress.xp ?? 0)
              ) {
                void updateProfileRemote(profile);
              }
            } else if (!profile) {
              set({ cloudError: remote.error, lastSyncOk: false });
              return { ok: false, error: remote.error };
            } else {
              // Keep local cache, warn softly
              set({ cloudError: remote.error, lastSyncOk: false });
            }
          }

          if (!profile) {
            return { ok: false, error: "No encontramos ese perfil." };
          }

          if (profile.pin) {
            if (!pin || pin !== profile.pin) {
              return { ok: false, error: "PIN incorrecto. Prueba otra vez." };
            }
          }

          await get().flushActiveToCloud();

          set({ activeProfileId: id });
          applyProgressToGame(profile.progress, profile.displayName);

          const eligible = isTournamentEligible(profile.progress);
          if (eligible !== profile.tournamentEligible) {
            const next = { ...profile, tournamentEligible: eligible };
            set((s) => ({
              profiles: { ...s.profiles, [id]: next },
            }));
            if (get().cloudEnabled) {
              void updateProfileRemote(next);
            }
          }
          return { ok: true };
        } finally {
          set({ loading: false });
        }
      },

      syncActiveFromGame: () => {
        const id = get().activeProfileId;
        if (!id) return;
        const prev = get().profiles[id];
        if (!prev) return;

        const game = useGameStore.getState();
        const progress = snapshotProgress(game);
        const displayName =
          (game.playerName || prev.displayName).trim() || prev.displayName;
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
        const next: StudentProfile = ensureInviteFields({
          ...prev,
          displayName,
          updatedAt: nowIso(),
          tournamentEligible,
          weekXp,
          weekKey,
          progress,
        });

        set((s) => ({
          profiles: { ...s.profiles, [id]: next },
        }));

        // Debounced cloud write
        if (!isSupabaseConfigured()) {
          set({ cloudEnabled: false });
          return;
        }
        set({ cloudEnabled: true });
        if (syncTimer) clearTimeout(syncTimer);
        syncTimer = setTimeout(() => {
          void get().flushActiveToCloud();
        }, 900);
      },

      flushActiveToCloud: async () => {
        if (!isSupabaseConfigured()) {
          set({ cloudEnabled: false });
          return;
        }
        set({ cloudEnabled: true });
        const id = get().activeProfileId;
        if (!id) return;
        // Ensure latest local snapshot first
        const prev = get().profiles[id];
        if (!prev) return;

        // Re-snapshot game if this is still the active profile
        if (get().activeProfileId === id) {
          const game = useGameStore.getState();
          const progress = snapshotProgress(game);
          const displayName =
            (game.playerName || prev.displayName).trim() || prev.displayName;
          progress.playerName = displayName;
          const tournamentEligible = isTournamentEligible(progress);
          const next: StudentProfile = {
            ...prev,
            displayName,
            updatedAt: nowIso(),
            tournamentEligible,
            progress,
            weekXp: prev.weekXp,
            weekKey: prev.weekKey,
          };
          set((s) => ({
            profiles: { ...s.profiles, [id]: next },
          }));
        }

        if (!get().cloudEnabled) return;
        if (syncInFlight) return;
        syncInFlight = true;
        try {
          const profile = get().profiles[id];
          if (!profile) return;
          const remote = await updateProfileRemote(profile);
          if (!remote.ok) {
            // Soft-fail: local progress stays; friendly notice only
            console.warn(
              "[Academia Arcana] Nube: no se pudo sincronizar ·",
              remote.error,
              "· progreso local intacto",
            );
            set({
              cloudError:
                "No pudimos sincronizar con la nube ahora. Tu progreso sigue guardado aquí.",
              lastSyncOk: false,
            });
            return;
          }
          // Keep the richer of local vs cloud (never drop XP)
          const merged = mergeProfilePreferRicher(profile, remote.data);
          set((s) => ({
            profiles: { ...s.profiles, [id]: merged },
            lastSyncOk: true,
            cloudError: null,
          }));
        } finally {
          syncInFlight = false;
        }
      },

      refreshFromCloud: async () => {
        const cloudOn = isSupabaseConfigured();
        set({ cloudEnabled: cloudOn });
        if (!cloudOn) {
          return {
            ok: false,
            error: "La nube no está configurada todavía.",
          };
        }
        set({ loading: true, cloudError: null });
        try {
          const res = await fetchAllProfiles();
          if (!res.ok) {
            set({ cloudError: res.error, lastSyncOk: false });
            return { ok: false, error: res.error };
          }
          const localAll = get().profiles;
          const tomb = get();
          const map: Record<string, StudentProfile> = {};
          for (const remote of res.data) {
            if (isTombstoned(tomb, remote.id, remote.username)) {
              void deleteProfileRemote(remote.id, remote.username);
              continue;
            }
            map[remote.id] = mergeProfilePreferRicher(
              localAll[remote.id],
              remote,
            );
          }
          for (const [id, p] of Object.entries(localAll)) {
            if (map[id]) continue;
            if (isTombstoned(tomb, id, p.username)) continue;
            map[id] = ensureInviteFields(p);
          }
          set({
            profiles: map,
            lastSyncOk: true,
            cloudError: null,
          });
          return { ok: true };
        } finally {
          set({ loading: false });
        }
      },

      deleteProfile: async (id) => {
        const cloudOn = isSupabaseConfigured();
        set({ cloudError: null, loading: true, cloudEnabled: cloudOn });
        try {
          const profile = get().profiles[id];
          if (!profile) {
            // Still tombstone unknown ids so they never reappear
            set((s) => ({
              ...withTombstone(s as ProfilesState, id, ""),
              lastSyncOk: true,
              cloudError: null,
            }));
            return { ok: true };
          }

          const username = profile.username;

          // Tombstone first so reload / bootstrap cannot resurrect
          set((s) => ({
            ...withTombstone(s as ProfilesState, id, username),
            lastSyncOk: false,
          }));
          try {
            // Never re-import legacy Liz after a deliberate delete
            localStorage.setItem("academia-arcana-legacy-migrated-v1", "1");
          } catch {
            /* ignore */
          }

          if (cloudOn) {
            // Retry a few times — permanent delete on cloud is required
            let lastErr = "";
            let ok = false;
            for (let attempt = 0; attempt < 3; attempt++) {
              const remote = await deleteProfileRemote(id, username);
              if (remote.ok) {
                ok = true;
                break;
              }
              lastErr = remote.error;
              console.warn(
                "[Academia Arcana] Nube: intento de borrado fallido ·",
                attempt + 1,
                remote.error,
              );
            }
            if (!ok) {
              // Local + tombstone stay; warn but do not bring profile back
              set({
                lastSyncOk: false,
                cloudError:
                  lastErr ||
                  "Perfil borrado en este aparato. La nube no confirmó el borrado.",
              });
              return { ok: true };
            }
          }

          set({ lastSyncOk: true, cloudError: null });
          return { ok: true };
        } finally {
          set({ loading: false });
        }
      },

      signOutToPicker: () => {
        void get().flushActiveToCloud();
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
            xp: p.progress.xp ?? 0,
            streak: p.progress.streak ?? 0,
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

      bootstrapFromLegacy: async () => {
        // Wait for localStorage rehydrate so deletedIds tombstones are present
        await new Promise<void>((resolve) => {
          const api = useProfilesStore.persist;
          if (api.hasHydrated()) {
            resolve();
            return;
          }
          const unsub = api.onFinishHydration(() => {
            unsub();
            resolve();
          });
          // Safety timeout if rehydrate never fires
          setTimeout(() => resolve(), 1500);
        });

        if (get().bootstrapped) return;
        const cloudOn = isSupabaseConfigured();
        if (typeof console !== "undefined") {
          console.info(
            "[Academia Arcana] bootstrap · cloudEnabled=",
            cloudOn,
            "· tombstones=",
            get().deletedIds.length,
          );
        }
        set({
          loading: true,
          cloudEnabled: cloudOn,
          cloudError: null,
        });

        try {
          // 1) Load from Supabase when available
          if (cloudOn) {
            const res = await fetchAllProfiles();
            if (res.ok) {
              const local = get().profiles;
              const tomb = get();
              const map: Record<string, StudentProfile> = {};
              for (const remote of res.data) {
                if (isTombstoned(tomb, remote.id, remote.username)) {
                  // Re-attempt permanent cloud delete for tombstoned rows
                  void deleteProfileRemote(remote.id, remote.username);
                  continue;
                }
                map[remote.id] = mergeProfilePreferRicher(
                  local[remote.id],
                  remote,
                );
              }
              // Keep any local-only profiles (not yet on cloud, not deleted)
              for (const [id, p] of Object.entries(local)) {
                if (map[id]) continue;
                if (isTombstoned(tomb, id, p.username)) continue;
                map[id] = ensureInviteFields(p);
              }
              set({ profiles: map, lastSyncOk: true });
            } else {
              set({
                cloudError: res.error,
                lastSyncOk: false,
              });
              // Keep any cached profiles from persist
            }
          }

          // 2) Migrate legacy Liz save ONCE — never resurrect after delete
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
                const name =
                  typeof st.playerName === "string" && st.playerName.trim()
                    ? st.playerName.trim()
                    : "Liz";
                const patch = progressToGamePatch(merged, name);
                useGameStore.setState(patch as never);
                legacyProgress = snapshotProgress(useGameStore.getState());
                displayName = name;
              }
            }
          } catch {
            /* ignore */
          }

          const alreadyMigrated =
            typeof localStorage !== "undefined" &&
            localStorage.getItem("academia-arcana-legacy-migrated-v1") === "1";

          if (legacyProgress && !alreadyMigrated) {
            // Already have a liz-like user in cloud/cache?
            const hasLiz = Object.values(get().profiles).some(
              (p) =>
                p.username === "liz" ||
                p.username.startsWith("liz") ||
                p.displayName.toLowerCase() === "liz",
            );
            const lizTombstoned = isTombstoned(get(), "", "liz");

            // Only create when missing AND not intentionally deleted
            if (!hasLiz && !lizTombstoned && Object.keys(get().profiles).length === 0) {
              let finalUser = "liz";
              let n = 1;
              while (get().isUsernameTaken(finalUser)) {
                finalUser = `liz${n++}`;
              }

              // Also check remote uniqueness if cloud up
              if (get().cloudEnabled) {
                for (let i = 0; i < 20; i++) {
                  const taken = await isUsernameTakenRemote(finalUser);
                  if (taken.ok && taken.data) {
                    finalUser = `liz${n++}`;
                  } else break;
                }
              }

              // Skip if this username was deleted
              if (isTombstoned(get(), "", finalUser)) {
                try {
                  localStorage.setItem("academia-arcana-legacy-migrated-v1", "1");
                  localStorage.removeItem(LEGACY_GAME_KEY);
                } catch {
                  /* ignore */
                }
              } else {
              const id = newId();
              const profile: StudentProfile = ensureInviteFields({
                id,
                username: finalUser,
                displayName,
                pin: null,
                createdAt: nowIso(),
                updatedAt: nowIso(),
                tournamentEligible: isTournamentEligible(legacyProgress),
                weekXp: legacyProgress.xp,
                weekKey: weekKeyNow(),
                inviteCode: generateInviteCode(finalUser, id),
                referralCount: 0,
                referredBy: null,
                progress: legacyProgress,
              });

              if (get().cloudEnabled) {
                const up = await upsertProfileByUsername(profile);
                if (up.ok) {
                  set((s) => ({
                    profiles: { ...s.profiles, [up.data.id]: up.data },
                    activeProfileId: up.data.id,
                  }));
                  applyProgressToGame(up.data.progress, up.data.displayName);
                } else {
                  // Local fallback so Liz is not lost
                  set((s) => ({
                    profiles: { ...s.profiles, [id]: profile },
                    activeProfileId: id,
                    cloudError: up.error,
                  }));
                  applyProgressToGame(legacyProgress, displayName);
                }
              } else {
                set((s) => ({
                  profiles: { ...s.profiles, [id]: profile },
                  activeProfileId: id,
                }));
                applyProgressToGame(legacyProgress, displayName);
              }
              try {
                localStorage.setItem("academia-arcana-legacy-migrated-v1", "1");
                localStorage.removeItem(LEGACY_GAME_KEY);
              } catch {
                /* ignore */
              }
              } // end else not tombstoned
            } else {
              // Profiles already present or liz deleted — don't re-create
              try {
                localStorage.setItem("academia-arcana-legacy-migrated-v1", "1");
                localStorage.removeItem(LEGACY_GAME_KEY);
              } catch {
                /* ignore */
              }
            }
          } else if (legacyProgress && alreadyMigrated) {
            // Drop stale legacy blob so it never re-imports
            try {
              localStorage.removeItem(LEGACY_GAME_KEY);
            } catch {
              /* ignore */
            }
          }

          // 3) Rehydrate active profile into game store
          const aid = get().activeProfileId;
          if (aid && get().profiles[aid]) {
            const p = get().profiles[aid]!;
            // Fresh fetch if cloud
            if (get().cloudEnabled) {
              const fresh = await fetchProfileById(aid);
              if (fresh.ok) {
                set((s) => ({
                  profiles: { ...s.profiles, [aid]: fresh.data },
                }));
                applyProgressToGame(fresh.data.progress, fresh.data.displayName);
              } else {
                applyProgressToGame(p.progress, p.displayName);
              }
            } else {
              applyProgressToGame(p.progress, p.displayName);
            }
          }
        } finally {
          // One-shot: ensure every cached profile has inviteCode
          const profiles = { ...get().profiles };
          for (const id of Object.keys(profiles)) {
            profiles[id] = ensureInviteFields(profiles[id]!);
          }
          // Always open on profile picker (device shared by siblings)
          set({
            profiles,
            activeProfileId: null,
            bootstrapped: true,
            loading: false,
          });
        }
      },
    }),
    {
      name: "academia-arcana-profiles-v1",
      version: 4,
      partialize: (s) => ({
        // Don't persist active session — always open on profile picker
        profiles: s.profiles,
        deletedIds: s.deletedIds,
        deletedUsernames: s.deletedUsernames,
      }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<typeof current>;
        const deletedIds = Array.isArray(p.deletedIds)
          ? (p.deletedIds as string[])
          : current.deletedIds;
        const deletedUsernames = Array.isArray(p.deletedUsernames)
          ? (p.deletedUsernames as string[])
          : current.deletedUsernames;
        const rawProfiles =
          (p.profiles as typeof current.profiles) ?? current.profiles;
        // Drop any tombstoned profiles from cache
        const profiles: typeof current.profiles = {};
        for (const [id, prof] of Object.entries(rawProfiles || {})) {
          if (deletedIds.includes(id)) continue;
          if (
            prof?.username &&
            deletedUsernames.includes(prof.username.toLowerCase())
          ) {
            continue;
          }
          profiles[id] = prof;
        }
        return {
          ...current,
          profiles,
          deletedIds,
          deletedUsernames,
          activeProfileId: null,
          bootstrapped: false,
          cloudEnabled: isSupabaseConfigured(),
          cloudError: null,
        };
      },
    },
  ),
);

export function usernameAvailability(
  raw: string,
  exceptId?: string,
): UsernameCheck | { ok: false; error: string } {
  return useProfilesStore.getState().checkUsername(raw, exceptId);
}

export async function usernameAvailabilityAsync(
  raw: string,
  exceptId?: string,
): Promise<UsernameCheck | { ok: false; error: string }> {
  return useProfilesStore.getState().checkUsernameAsync(raw, exceptId);
}

export { CLOUD_ERROR_MSG };
