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
 * Colores vivos que funcionan con Chispa (lila/dorado) y Trueno (azul/plata).
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
    fullName: "+15 XP — Chispa de Suerte",
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
    id: "xp30",
    wheelLabel: "+30 XP",
    fullName: "+30 XP — Trueno de Poder",
    emoji: "⛈️",
    color: "#5b8def",
    textOn: "light",
  },
  {
    id: "xp40",
    wheelLabel: "+40 XP",
    fullName: "+40 XP — Corona Arcana",
    emoji: "👑",
    color: "#8b5cf6",
    textOn: "light",
  },
  {
    id: "badge-brisa",
    wheelLabel: "Brisa",
    fullName: "Insignia Temporal: Brisa Arcana",
    emoji: "🌬️",
    color: "#2dd4a8",
    textOn: "dark",
  },
  {
    id: "badge-chispa",
    wheelLabel: "Llama",
    fullName: "Insignia Temporal: Llama Fugaz",
    emoji: "🔥",
    color: "#f07178",
    textOn: "light",
  },
  {
    id: "badge-eco",
    wheelLabel: "Eco",
    fullName: "Insignia Temporal: Eco de las Estrellas",
    emoji: "🌟",
    color: "#f0b429",
    textOn: "dark",
  },
];

export const TEMP_BADGE_LABELS: Record<string, { name: string; emoji: string }> = {
  "temp-brisa": { name: "Brisa Arcana", emoji: "🌬️" },
  "temp-chispa": { name: "Llama Fugaz", emoji: "🔥" },
  "temp-eco": { name: "Eco de las Estrellas", emoji: "🌟" },
};

export function prizeById(id: string): RoulettePrize | undefined {
  return ROULETTE_PRIZES.find((p) => p.id === id);
}

export function messageForPrize(sliceId: string): string {
  const p = prizeById(sliceId);
  if (p) return `¡Has ganado! ${p.fullName}`;
  return "¡Premio mágico!";
}
