/** Friend invite codes — unique per profile, XP on successful signup. */

export const REFERRER_XP = 30;
export const FRIEND_XP = 20;

/** Short magical code: ARC-XXXX (letters/numbers). */
export function generateInviteCode(username: string, profileId: string): string {
  const base = username.replace(/[^a-z0-9]/gi, "").toUpperCase().slice(0, 3) || "MAG";
  const tail = profileId.replace(/-/g, "").toUpperCase().slice(-4) || "0000";
  return `ARC-${base}${tail}`;
}

export function normalizeInviteCode(raw: string): string {
  return raw
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/[^A-Z0-9-]/g, "");
}

export function isValidInviteCodeFormat(code: string): boolean {
  const c = normalizeInviteCode(code);
  return /^ARC-[A-Z0-9]{4,12}$/.test(c);
}
