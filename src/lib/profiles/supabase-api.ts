/**
 * Supabase persistence for student profiles.
 * Maps app StudentProfile ↔ public.profiles table.
 */

import {
  CLOUD_ERROR_MSG,
  getSupabase,
  isSupabaseConfigured,
  type ProfileInsert,
  type ProfileRow,
} from "@/lib/supabase/client";
import { normalizeAvatar, type AvatarConfig } from "@/lib/progression";
import { emptyProgress } from "@/lib/profiles/progress";
import {
  type PlayerProgress,
  type StudentProfile,
  weekKeyNow,
} from "@/lib/profiles/types";
import { isTournamentEligible } from "@/lib/profiles/tournament";

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; code?: string };

/** Progress JSON may embed week buckets for ranking filters later */
type ProgressPayload = PlayerProgress & {
  weekXp?: number;
  weekKey?: string;
  inviteCode?: string;
  referralCount?: number;
  referredBy?: string | null;
};

function friendlyError(err: unknown): string {
  const msg =
    err && typeof err === "object" && "message" in err
      ? String((err as { message: string }).message)
      : String(err ?? "");
  if (/duplicate|unique|23505/i.test(msg)) {
    return "Este nombre ya está en uso. Elige otro.";
  }
  if (/Failed to fetch|NetworkError|fetch/i.test(msg)) {
    return CLOUD_ERROR_MSG;
  }
  if (/JWT|API key|Invalid/i.test(msg)) {
    return CLOUD_ERROR_MSG;
  }
  return CLOUD_ERROR_MSG;
}

function asProgress(raw: unknown, displayName: string): ProgressPayload {
  const base = emptyProgress(displayName);
  if (!raw || typeof raw !== "object") return base;
  const p = raw as Partial<ProgressPayload>;
  return {
    ...base,
    ...p,
    playerName: typeof p.playerName === "string" ? p.playerName : displayName,
    avatar: normalizeAvatar(p.avatar as Partial<AvatarConfig>),
    session: null,
    books: p.books ?? base.books,
    badges: Array.isArray(p.badges) ? p.badges : [],
    mathCompleted: Array.isArray(p.mathCompleted) ? p.mathCompleted : [],
    languageCompleted: Array.isArray(p.languageCompleted)
      ? p.languageCompleted
      : [],
    englishCompleted: Array.isArray(p.englishCompleted)
      ? p.englishCompleted
      : [],
    ownedShopItems: Array.isArray(p.ownedShopItems) ? p.ownedShopItems : [],
    tempBadges:
      p.tempBadges && typeof p.tempBadges === "object" ? p.tempBadges : {},
    skillStats:
      p.skillStats && typeof p.skillStats === "object" ? p.skillStats : {},
    reviewQueue: Array.isArray(p.reviewQueue) ? p.reviewQueue : [],
    unlockedStories: Array.isArray(p.unlockedStories)
      ? p.unlockedStories
      : ["intro"],
    levelRuns: p.levelRuns ?? base.levelRuns,
    areaSessionCount: p.areaSessionCount ?? base.areaSessionCount,
    dailyParts: p.dailyParts ?? base.dailyParts,
    bossBeaten: p.bossBeaten ?? base.bossBeaten,
  };
}

export function rowToProfile(row: ProfileRow): StudentProfile {
  const displayName = row.display_name || row.username;
  const progress = asProgress(row.progress, displayName);
  if (row.avatar && typeof row.avatar === "object") {
    progress.avatar = normalizeAvatar(row.avatar as Partial<AvatarConfig>);
  }
  const meta = progress as ProgressPayload;
  const inviteCode =
    (typeof meta.inviteCode === "string" && meta.inviteCode) ||
    `ARC-${row.username.slice(0, 3).toUpperCase()}${row.id.replace(/-/g, "").slice(-4).toUpperCase()}`;
  return {
    id: row.id,
    username: row.username,
    displayName,
    pin: row.pin ?? null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    tournamentEligible: Boolean(row.tournament_eligible),
    weekXp: progress.weekXp ?? 0,
    weekKey: progress.weekKey ?? weekKeyNow(),
    inviteCode,
    referralCount:
      typeof meta.referralCount === "number" ? meta.referralCount : 0,
    referredBy: meta.referredBy ?? null,
    progress,
  };
}

function profileToRow(p: StudentProfile): ProfileInsert {
  const progress: ProgressPayload = {
    ...p.progress,
    weekXp: p.weekXp,
    weekKey: p.weekKey,
    playerName: p.displayName,
    avatar: p.progress.avatar,
    inviteCode: p.inviteCode,
    referralCount: p.referralCount,
    referredBy: p.referredBy,
  };
  return {
    id: p.id,
    username: p.username,
    display_name: p.displayName,
    pin: p.pin,
    avatar: p.progress.avatar,
    progress,
    tournament_eligible:
      p.tournamentEligible || isTournamentEligible(p.progress),
    created_at: p.createdAt,
    updated_at: p.updatedAt,
  };
}

export async function fetchAllProfiles(): Promise<ApiResult<StudentProfile[]>> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: CLOUD_ERROR_MSG, code: "not_configured" };
  }
  const sb = getSupabase();
  if (!sb) return { ok: false, error: CLOUD_ERROR_MSG, code: "not_configured" };

  try {
    const { data, error } = await sb
      .from("profiles")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) return { ok: false, error: friendlyError(error), code: error.code };
    return {
      ok: true,
      data: (data as ProfileRow[] | null)?.map(rowToProfile) ?? [],
    };
  } catch (e) {
    return { ok: false, error: friendlyError(e) };
  }
}

export async function fetchProfileByUsername(
  username: string,
): Promise<ApiResult<StudentProfile>> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: CLOUD_ERROR_MSG, code: "not_configured" };

  try {
    const u = username.trim().toLowerCase();
    const { data, error } = await sb
      .from("profiles")
      .select("*")
      .eq("username", u)
      .maybeSingle();
    if (error) return { ok: false, error: friendlyError(error), code: error.code };
    if (!data) {
      return {
        ok: false,
        error: "No encontramos ese usuario. Revisa el nombre.",
        code: "not_found",
      };
    }
    return { ok: true, data: rowToProfile(data as ProfileRow) };
  } catch (e) {
    return { ok: false, error: friendlyError(e) };
  }
}

export async function fetchProfileById(
  id: string,
): Promise<ApiResult<StudentProfile>> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: CLOUD_ERROR_MSG, code: "not_configured" };

  try {
    const { data, error } = await sb
      .from("profiles")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) return { ok: false, error: friendlyError(error), code: error.code };
    if (!data) {
      return { ok: false, error: "No encontramos ese perfil.", code: "not_found" };
    }
    return { ok: true, data: rowToProfile(data as ProfileRow) };
  } catch (e) {
    return { ok: false, error: friendlyError(e) };
  }
}

export async function isUsernameTakenRemote(
  username: string,
  exceptId?: string,
): Promise<ApiResult<boolean>> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: CLOUD_ERROR_MSG, code: "not_configured" };

  try {
    let q = sb
      .from("profiles")
      .select("id")
      .eq("username", username.trim().toLowerCase())
      .limit(1);

    if (exceptId) q = q.neq("id", exceptId);

    const { data, error } = await q;
    if (error) return { ok: false, error: friendlyError(error), code: error.code };
    return { ok: true, data: (data?.length ?? 0) > 0 };
  } catch (e) {
    return { ok: false, error: friendlyError(e) };
  }
}

export async function insertProfile(
  profile: StudentProfile,
): Promise<ApiResult<StudentProfile>> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: CLOUD_ERROR_MSG, code: "not_configured" };

  try {
    const row = profileToRow(profile);
    const { data, error } = await sb
      .from("profiles")
      .insert(row)
      .select("*")
      .single();

    if (error) return { ok: false, error: friendlyError(error), code: error.code };
    return { ok: true, data: rowToProfile(data as ProfileRow) };
  } catch (e) {
    return { ok: false, error: friendlyError(e) };
  }
}

export async function updateProfileRemote(
  profile: StudentProfile,
): Promise<ApiResult<StudentProfile>> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: CLOUD_ERROR_MSG, code: "not_configured" };

  try {
    const row = profileToRow({
      ...profile,
      updatedAt: new Date().toISOString(),
    });
    const { data, error } = await sb
      .from("profiles")
      .update({
        display_name: row.display_name,
        pin: row.pin,
        avatar: row.avatar,
        progress: row.progress,
        tournament_eligible: row.tournament_eligible,
        updated_at: row.updated_at,
      })
      .eq("id", profile.id)
      .select("*")
      .single();

    if (error) return { ok: false, error: friendlyError(error), code: error.code };
    return { ok: true, data: rowToProfile(data as ProfileRow) };
  } catch (e) {
    return { ok: false, error: friendlyError(e) };
  }
}

/** Upsert used for Liz migration (create if missing by username). */
export async function upsertProfileByUsername(
  profile: StudentProfile,
): Promise<ApiResult<StudentProfile>> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: CLOUD_ERROR_MSG, code: "not_configured" };

  try {
    const { data: existing, error: findErr } = await sb
      .from("profiles")
      .select("*")
      .eq("username", profile.username)
      .maybeSingle();

    if (findErr) {
      return { ok: false, error: friendlyError(findErr), code: findErr.code };
    }

    if (existing) {
      const remote = rowToProfile(existing as ProfileRow);
      if ((remote.progress.xp ?? 0) >= (profile.progress.xp ?? 0)) {
        return { ok: true, data: remote };
      }
      const merged: StudentProfile = {
        ...remote,
        displayName: profile.displayName || remote.displayName,
        progress: profile.progress,
        tournamentEligible:
          profile.tournamentEligible || remote.tournamentEligible,
        weekXp: profile.weekXp,
        weekKey: profile.weekKey,
        inviteCode: profile.inviteCode || remote.inviteCode,
        referralCount: Math.max(
          profile.referralCount || 0,
          remote.referralCount || 0,
        ),
        referredBy: profile.referredBy ?? remote.referredBy,
        updatedAt: new Date().toISOString(),
      };
      return updateProfileRemote(merged);
    }

    return insertProfile(profile);
  } catch (e) {
    return { ok: false, error: friendlyError(e) };
  }
}

/** Delete a profile row from Supabase by id (and username fallback). Verifies gone. */
export async function deleteProfileRemote(
  id: string,
  username?: string,
): Promise<ApiResult<true>> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: CLOUD_ERROR_MSG, code: "not_configured" };

  try {
    const { error } = await sb.from("profiles").delete().eq("id", id);
    if (error) return { ok: false, error: friendlyError(error), code: error.code };

    // Fallback by username (some policies key on username)
    if (username) {
      const u = username.trim().toLowerCase();
      if (u) {
        await sb.from("profiles").delete().eq("username", u);
      }
    }

    // Verify the row is actually gone
    const { data: still, error: checkErr } = await sb
      .from("profiles")
      .select("id")
      .eq("id", id)
      .maybeSingle();
    if (checkErr) {
      // Treat check failure as soft uncertainty — caller still tombs locally
      console.warn(
        "[Academia Arcana] Nube: no se pudo verificar el borrado ·",
        checkErr.message,
      );
      return { ok: true, data: true };
    }
    if (still) {
      return {
        ok: false,
        error:
          "No pudimos borrar el perfil en la nube. Revisa los permisos de la tabla profiles.",
        code: "delete_blocked",
      };
    }

    if (username) {
      const { data: byUser } = await sb
        .from("profiles")
        .select("id")
        .eq("username", username.trim().toLowerCase())
        .maybeSingle();
      if (byUser) {
        return {
          ok: false,
          error:
            "No pudimos borrar el perfil en la nube. Revisa los permisos de la tabla profiles.",
          code: "delete_blocked",
        };
      }
    }

    return { ok: true, data: true };
  } catch (e) {
    return { ok: false, error: friendlyError(e) };
  }
}
