/**
 * Local consent registry (cookies/storage + legal acceptance on signup).
 * Stored only in localStorage for now — ready to sync to Supabase later.
 */

const COOKIE_KEY = "academia-arcana-cookie-consent-v1";
const LEGAL_LOG_KEY = "academia-arcana-legal-acceptances-v1";

export type CookieConsent = {
  accepted: true;
  acceptedAt: string;
  version: 1;
};

export type LegalAcceptance = {
  username: string;
  displayName: string;
  acceptedAt: string;
  /** Policies version the user accepted */
  version: 1;
  acceptedPrivacy: true;
  acceptedTerms: true;
  acceptedDisclaimer: true;
  acceptedParentalDeclaration: true;
};

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsent;
    if (parsed?.accepted === true && parsed.acceptedAt) return parsed;
    return null;
  } catch {
    return null;
  }
}

export function hasCookieConsent(): boolean {
  return getCookieConsent() !== null;
}

export function acceptCookieConsent(): CookieConsent {
  const record: CookieConsent = {
    accepted: true,
    acceptedAt: new Date().toISOString(),
    version: 1,
  };
  try {
    localStorage.setItem(COOKIE_KEY, JSON.stringify(record));
  } catch {
    /* ignore quota */
  }
  return record;
}

export function listLegalAcceptances(): LegalAcceptance[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LEGAL_LOG_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as LegalAcceptance[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Record parental + legal acceptance at profile creation time */
export function recordLegalAcceptance(input: {
  username: string;
  displayName: string;
}): LegalAcceptance {
  const entry: LegalAcceptance = {
    username: input.username.trim().toLowerCase(),
    displayName: input.displayName.trim(),
    acceptedAt: new Date().toISOString(),
    version: 1,
    acceptedPrivacy: true,
    acceptedTerms: true,
    acceptedDisclaimer: true,
    acceptedParentalDeclaration: true,
  };
  try {
    const prev = listLegalAcceptances();
    prev.push(entry);
    localStorage.setItem(LEGAL_LOG_KEY, JSON.stringify(prev.slice(-100)));
  } catch {
    /* ignore */
  }
  return entry;
}
