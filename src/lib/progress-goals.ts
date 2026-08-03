/**
 * Metas blandas de partidas oficiales (no misiones fijas numeradas).
 * Usadas en informe PDF y paneles de progreso.
 */
export const SESSION_GOALS = {
  math: 30,
  language: 20,
  english: 15,
  reading: 2,
} as const;

export const SESSION_GOAL_TOTAL =
  SESSION_GOALS.math +
  SESSION_GOALS.language +
  SESSION_GOALS.english +
  SESSION_GOALS.reading;
