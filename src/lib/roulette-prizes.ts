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
    color: "#c9a227",
    textOn: "dark",
  },
  {
    id: "xp15",
    wheelLabel: "+15 XP",
    fullName: "+15 XP — Destello de Suerte",
    emoji: "⚡",
    color: "#e891c0",
    textOn: "dark",
  },
  {
    id: "xp20",
    wheelLabel: "+20 XP",
    fullName: "+20 XP — Aura de Sabiduría",
    emoji: "🔮",
    color: "#7ec8e3",
    textOn: "dark",
  },
  {
    id: "badge-brisa",
    wheelLabel: "Brisa",
    fullName: "Insignia temporal — Brisa Arcana",
    emoji: "🌬️",
    color: "#3dd68c",
    textOn: "dark",
  },
  {
    id: "xp30",
    wheelLabel: "+30 XP",
    fullName: "+30 XP — Estrella Arcana",
    emoji: "🌟",
    color: "#a78bfa",
    textOn: "dark",
  },
  {
    id: "badge-chispa",
    wheelLabel: "Llama",
    fullName: "Insignia temporal — Llama Fugaz",
    emoji: "🔥",
    color: "#f07178",
    textOn: "dark",
  },
  {
    id: "xp40",
    wheelLabel: "+40 XP",
    fullName: "+40 XP — Tesoro del Baúl",
    emoji: "💎",
    color: "#d4b06a",
    textOn: "dark",
  },
  {
    id: "badge-eco",
    wheelLabel: "Eco",
    fullName: "Insignia temporal — Eco de las Estrellas",
    emoji: "🌀",
    color: "#4a9fc0",
    textOn: "light",
  },
];

export type TempBadgeInfo = {
  name: string;
  emoji: string;
  blurb: string;
  hue: "mint" | "ember" | "sky";
};

/** Temporary badges (24h) — distinct names & visual hue from permanents */
export const TEMP_BADGE_LABELS: Record<string, TempBadgeInfo> = {
  "temp-brisa": {
    name: "Brisa Arcana",
    emoji: "🌬️",
    blurb: "Una ráfaga de magia suave (24 h)",
    hue: "mint",
  },
  "temp-chispa": {
    name: "Llama Fugaz",
    emoji: "🔥",
    blurb: "Fuego amable que brilla hoy (24 h)",
    hue: "ember",
  },
  "temp-eco": {
    name: "Eco de las Estrellas",
    emoji: "🌀",
    blurb: "Un eco cósmico en tu capa (24 h)",
    hue: "sky",
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
