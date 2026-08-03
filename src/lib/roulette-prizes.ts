/** Catálogo de premios de la Roleta mágica — nombres y colores. */

export type RoulettePrize = {
  id: string;
  /** Texto corto en el disco (legible) */
  wheelLabel: string;
  /** Nombre mágico completo al revelar */
  fullName: string;
  emoji: string;
  color: string;
  /** Color de texto sobre el sector (claro u oscuro) */
  textOn: "light" | "dark";
};

/**
 * 8 sectores — XP + insignias temporales.
 * Colores vivos con Aurora (lila/dorado) y Trueno (azul/plata).
 */
export const ROULETTE_PRIZES: RoulettePrize[] = [
  {
    id: "xp10",
    wheelLabel: "+10 XP",
    fullName: "+10 XP — Destello Dorado",
    emoji: "✨",
    color: "#e8c547",
    textOn: "dark",
  },
  {
    id: "xp15",
    wheelLabel: "+15 XP",
    fullName: "+15 XP — Destello de Suerte",
    emoji: "⚡",
    color: "#f0a0d0",
    textOn: "dark",
  },
  {
    id: "xp20",
    wheelLabel: "+20 XP",
    fullName: "+20 XP — Aura de Sabiduría",
    emoji: "🔮",
    color: "#6ec8f0",
    textOn: "dark",
  },
  {
    id: "badge-brisa",
    wheelLabel: "Brisa",
    fullName: "Insignia temporal — Brisa Arcana",
    emoji: "🌬️",
    color: "#3dd6a0",
    textOn: "dark",
  },
  {
    id: "xp30",
    wheelLabel: "+30 XP",
    fullName: "+30 XP — Estrella Arcana",
    emoji: "🌟",
    color: "#b794f6",
    textOn: "dark",
  },
  {
    id: "badge-chispa",
    wheelLabel: "Llama",
    fullName: "Insignia temporal — Llama Fugaz",
    emoji: "🔥",
    color: "#ff7a6e",
    textOn: "dark",
  },
  {
    id: "xp40",
    wheelLabel: "+40 XP",
    fullName: "+40 XP — Tesoro del Baúl",
    emoji: "💎",
    color: "#f0c674",
    textOn: "dark",
  },
  {
    id: "badge-eco",
    wheelLabel: "Eco",
    fullName: "Insignia temporal — Eco de las Estrellas",
    emoji: "🌀",
    color: "#3d8ec4",
    textOn: "light",
  },
];

export type TempBadgeInfo = {
  name: string;
  emoji: string;
  blurb: string;
  /** Longer kid-friendly effect text shown on tap */
  effect: string;
  hue: "mint" | "ember" | "sky";
  /** Soft aura class name key for avatar */
  aura: "breeze" | "ember" | "stars";
};

/** Temporary badges (24h) — distinct names & visual hue from permanents */
export const TEMP_BADGE_LABELS: Record<string, TempBadgeInfo> = {
  "temp-brisa": {
    name: "Brisa Arcana",
    emoji: "🌬️",
    blurb: "Una ráfaga de magia suave (24 h)",
    effect:
      "Cuando la equipas, un brillo de brisa envuelve tu avatar. Es solo de adorno mágico… ¡pero te hace sentir más ligera al estudiar!",
    hue: "mint",
    aura: "breeze",
  },
  "temp-chispa": {
    name: "Llama Fugaz",
    emoji: "🔥",
    blurb: "Fuego amable que brilla hoy (24 h)",
    effect:
      "Equípala y tu avatar arde con un fulgor amable (sin quemar nada). Perfecta para días de mucha energía.",
    hue: "ember",
    aura: "ember",
  },
  "temp-eco": {
    name: "Eco de las Estrellas",
    emoji: "🌀",
    blurb: "Un eco cósmico en tu capa (24 h)",
    effect:
      "Al equiparla, un eco de estrellas brilla a tu alrededor. Ideal para sentirte como una maga del cielo.",
    hue: "sky",
    aura: "stars",
  },
};

export function prizeById(id: string): RoulettePrize | undefined {
  return ROULETTE_PRIZES.find((p) => p.id === id);
}

export function messageForPrize(id: string): string {
  const p = prizeById(id);
  if (!p) return "¡Premio mágico!";
  if (id.startsWith("xp")) {
    const n = Number(id.replace("xp", "")) || 10;
    return `¡Premio! +${n} XP mágicos — ${p.fullName}`;
  }
  const tempKey =
    id === "badge-brisa"
      ? "temp-brisa"
      : id === "badge-chispa"
        ? "temp-chispa"
        : "temp-eco";
  return `¡Insignia temporal: ${TEMP_BADGE_LABELS[tempKey]?.name ?? p.fullName}!`;
}

export function tempIdFromPrize(sliceId: string): string | null {
  if (sliceId === "badge-brisa") return "temp-brisa";
  if (sliceId === "badge-chispa") return "temp-chispa";
  if (sliceId === "badge-eco") return "temp-eco";
  return null;
}

export function hoursLeft(expiresAt: number, now = Date.now()): number {
  return Math.max(0, Math.ceil((expiresAt - now) / (60 * 60 * 1000)));
}
