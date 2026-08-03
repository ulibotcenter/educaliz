/**
 * Torneo de la Academia — countdown + eligibility (local rules).
 * Start: 5 September 2026, 12:00 Europe/Madrid.
 */

import { levelFromXp } from "@/lib/progression";
import type { PlayerProgress } from "@/lib/profiles/types";

/** Madrid CEST (UTC+2) on that date — September is still summer time in 2026 */
export const TOURNAMENT_START_ISO = "2026-09-05T12:00:00+02:00";
export const TOURNAMENT_START_MS = Date.parse(TOURNAMENT_START_ISO);

export const TOURNAMENT_LABEL = "Torneo de la Academia";

/** Min level to enter (or sessions goal below) */
export const TOURNAMENT_MIN_LEVEL = 5;
/** Official sessions across all subjects */
export const TOURNAMENT_MIN_SESSIONS = 15;

export type CountdownParts = {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  started: boolean;
};

export function getCountdown(now = Date.now()): CountdownParts {
  const totalMs = Math.max(0, TOURNAMENT_START_MS - now);
  const started = totalMs <= 0;
  const days = Math.floor(totalMs / 86400000);
  const hours = Math.floor((totalMs % 86400000) / 3600000);
  const minutes = Math.floor((totalMs % 3600000) / 60000);
  const seconds = Math.floor((totalMs % 60000) / 1000);
  return { totalMs, days, hours, minutes, seconds, started };
}

export function isTournamentEligible(progress: PlayerProgress): boolean {
  const level = levelFromXp(progress.xp);
  const sessions =
    (progress.areaSessionCount?.math ?? 0) +
    (progress.areaSessionCount?.language ?? 0) +
    (progress.areaSessionCount?.english ?? 0);
  return level >= TOURNAMENT_MIN_LEVEL || sessions >= TOURNAMENT_MIN_SESSIONS;
}

export function eligibilityHint(progress: PlayerProgress): string {
  const level = levelFromXp(progress.xp);
  const sessions =
    (progress.areaSessionCount?.math ?? 0) +
    (progress.areaSessionCount?.language ?? 0) +
    (progress.areaSessionCount?.english ?? 0);
  if (isTournamentEligible(progress)) {
    return "¡Ya eres elegible para el Torneo!";
  }
  const needLevel = Math.max(0, TOURNAMENT_MIN_LEVEL - level);
  const needSess = Math.max(0, TOURNAMENT_MIN_SESSIONS - sessions);
  return `Para el Torneo: nivel ${TOURNAMENT_MIN_LEVEL} (te faltan ${needLevel}) o ${TOURNAMENT_MIN_SESSIONS} partidas oficiales (te faltan ${needSess}).`;
}
