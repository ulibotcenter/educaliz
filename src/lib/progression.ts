/** XP, levels, badges catalog, narrative chapters, avatar unlocks */

export const XP_THRESHOLDS = [0, 50, 120, 220, 350, 520, 720, 960, 1250, 1600, 2000];

export const LEVEL_TITLES: Record<number, string> = {
  1: "Aprendiz de chispas",
  2: "Chispa errante",
  3: "Hechicera novata",
  4: "Guardiana de runas",
  5: "Tejedora de hechizos",
  6: "Maestra de la torre",
  7: "Archimaga joven",
  8: "Señora de la Academia",
  9: "Estrella arcana",
  10: "Leyenda de verano",
  11: "Eterna Arcana",
};

export function levelFromXp(xp: number): number {
  let level = 1;
  for (let i = 0; i < XP_THRESHOLDS.length; i++) {
    if (xp >= XP_THRESHOLDS[i]!) level = i + 1;
  }
  return Math.min(level, XP_THRESHOLDS.length);
}

export function xpProgress(xp: number): {
  level: number;
  title: string;
  current: number;
  nextAt: number | null;
  intoLevel: number;
  needed: number;
  pct: number;
} {
  const level = levelFromXp(xp);
  const start = XP_THRESHOLDS[level - 1] ?? 0;
  const nextAt = XP_THRESHOLDS[level] ?? null;
  const intoLevel = xp - start;
  const needed = nextAt === null ? 1 : nextAt - start;
  const pct = nextAt === null ? 100 : Math.min(100, Math.round((intoLevel / needed) * 100));
  return {
    level,
    title: LEVEL_TITLES[level] ?? `Nivel ${level}`,
    current: xp,
    nextAt,
    intoLevel,
    needed,
    pct,
  };
}

export type AvatarConfig = {
  hat: "none" | "star" | "wizard" | "crown";
  cape: "violet" | "teal" | "rose" | "gold";
  wand: "violet" | "gold" | "cyan" | "pink";
  familiar: "owl" | "fox" | "dragon" | "cat";
};

export const DEFAULT_AVATAR: AvatarConfig = {
  hat: "none",
  cape: "violet",
  wand: "violet",
  familiar: "owl",
};

export const AVATAR_OPTIONS = {
  hat: [
    { id: "none" as const, label: "Sin sombrero", minLevel: 1 },
    { id: "star" as const, label: "Diadema de estrella", minLevel: 2 },
    { id: "wizard" as const, label: "Sombrero de maga", minLevel: 4 },
    { id: "crown" as const, label: "Corona arcana", minLevel: 7 },
  ],
  cape: [
    { id: "violet" as const, label: "Capa violeta", minLevel: 1 },
    { id: "teal" as const, label: "Capa turquesa", minLevel: 3 },
    { id: "rose" as const, label: "Capa rosa", minLevel: 5 },
    { id: "gold" as const, label: "Capa dorada", minLevel: 8 },
  ],
  wand: [
    { id: "violet" as const, label: "Varita violeta", minLevel: 1 },
    { id: "gold" as const, label: "Varita dorada", minLevel: 3 },
    { id: "cyan" as const, label: "Varita cian", minLevel: 5 },
    { id: "pink" as const, label: "Varita rosa", minLevel: 6 },
  ],
  familiar: [
    { id: "owl" as const, label: "Búho", minLevel: 1 },
    { id: "fox" as const, label: "Zorro", minLevel: 3 },
    { id: "cat" as const, label: "Gato mágico", minLevel: 5 },
    { id: "dragon" as const, label: "Dragón bebé", minLevel: 8 },
  ],
};

export type StoryChapter = {
  id: string;
  title: string;
  text: string;
  /** unlock condition type */
  unlock: "level" | "boss" | "streak" | "zone";
  value: string | number;
};

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: "intro",
    title: "Las puertas de la Academia",
    text: "Liz empuja las puertas de cristal estrellado. Un susurro dice: «Bienvenida, pequeña maga. Tus hechizos de verano despertarán la Academia Arcana.»",
    unlock: "level",
    value: 1,
  },
  {
    id: "level-3",
    title: "La primera runa",
    text: "En el patio de las chispas, una runa brilla bajo los pies de Liz. «Cada acierto enciende una estrella», canta el viento. El mapa de la Academia se hace más claro.",
    unlock: "level",
    value: 3,
  },
  {
    id: "level-5",
    title: "El pasillo de los espejos",
    text: "Los espejos muestran a Liz un poco más alta, con capa al viento. «No eres solo puntos: eres historia en marcha», susurran. El familiar guiña un ojo.",
    unlock: "level",
    value: 5,
  },
  {
    id: "level-8",
    title: "La cumbre de la torre",
    text: "Desde lo alto, Liz ve Madri lejano y el cielo de verano. La Academia le confía un secreto: el conocimiento es la magia más fuerte de todas.",
    unlock: "level",
    value: 8,
  },
  {
    id: "boss-math",
    title: "El Guardián de los Números",
    text: "El Guardián de la Torre de Números inclina la corona de dígitos. «Has vencido mi prueba. Guarda esta llave de oro: abre la sala de las cuentas eternas.»",
    unlock: "boss",
    value: "math",
  },
  {
    id: "boss-lang",
    title: "La Bibliotecaria de las Sombras",
    text: "La Bibliotecaria cierra un libro gigante. «Sujeto y predicado bailan en tus manos. La Biblioteca Misteriosa te nombra Maestra de las Oraciones.»",
    unlock: "boss",
    value: "language",
  },
  {
    id: "boss-eng",
    title: "The English Sphinx",
    text: "A smiling sphinx whispers in two languages: «Your English spark shines. Keep playing, little mage — words open worlds.»",
    unlock: "boss",
    value: "english",
  },
  {
    id: "streak-3",
    title: "La llama de tres días",
    text: "Tres soles se alinean sobre la Academia. Una llama suave se posa en el hombro de Liz: «La constancia es un hechizo que no se apaga.»",
    unlock: "streak",
    value: 3,
  },
  {
    id: "streak-7",
    title: "La semana de las estrellas",
    text: "Siete estrellas caen en el cuaderno de Liz. «Una semana de magia diaria», canta el coro. El verano se siente más brillante.",
    unlock: "streak",
    value: 7,
  },
  {
    id: "zone-math-half",
    title: "Eco en la Torre",
    text: "A mitad de la Torre de Números, los escalones cantan. Liz ya no teme a las restas largas: cada paso suena a victoria.",
    unlock: "zone",
    value: "math-half",
  },
  {
    id: "zone-lang-half",
    title: "Páginas que susurran",
    text: "Las oraciones del pasillo se ordenan solas. «Quién hace qué», repite Liz, y las páginas se abren como alas.",
    unlock: "zone",
    value: "lang-half",
  },
];

export const ALL_BADGES: Record<
  string,
  { name: string; desc: string; emoji: string }
> = {
  "racha-3": {
    name: "Racha de 3 días",
    desc: "Jugaste 3 días seguidos",
    emoji: "🔥",
  },
  "racha-7": {
    name: "Racha de 7 días",
    desc: "¡Una semana de magia diaria!",
    emoji: "🌟",
  },
  "cien-puntos": {
    name: "Cien estrellas",
    desc: "Alcanzaste 100 puntos",
    emoji: "✨",
  },
  quinientos: {
    name: "Maestra Arcana",
    desc: "500 puntos de magia",
    emoji: "👑",
  },
  "math-5": {
    name: "Aprendiz de números",
    desc: "5 misiones de mates",
    emoji: "🔢",
  },
  "math-15": {
    name: "Hechicera del cálculo",
    desc: "15 misiones de mates",
    emoji: "🪄",
  },
  "math-all": {
    name: "Guardiana de los Números",
    desc: "¡Las 30 misiones de la Torre!",
    emoji: "🏰",
  },
  "lang-5": {
    name: "Exploradora de palabras",
    desc: "5 oraciones analizadas",
    emoji: "📖",
  },
  "lang-all": {
    name: "Maestra de las Oraciones",
    desc: "15 oraciones completas",
    emoji: "📜",
  },
  "eng-half": {
    name: "Exploradora del Inglés",
    desc: "6 retos de inglés",
    emoji: "🧭",
  },
  "eng-all": {
    name: "Bilingual Mage",
    desc: "12 retos de inglés",
    emoji: "🇬🇧",
  },
  lectora: {
    name: "Lectora de dos mundos",
    desc: "2 fichas de lectura",
    emoji: "📚",
  },
  "boss-math": {
    name: "Vencedora del Guardián",
    desc: "Ganaste la Prueba del Guardián de Números",
    emoji: "⚔️",
  },
  "boss-lang": {
    name: "Vencedora de la Biblioteca",
    desc: "Ganaste la Prueba de la Bibliotecaria",
    emoji: "🦉",
  },
  "boss-eng": {
    name: "Sphinx Friend",
    desc: "Beat the English Sphinx trial",
    emoji: "🦁",
  },
  "perfect-mission": {
    name: "Primera misión perfecta",
    desc: "Completaste una misión sin fallar",
    emoji: "💎",
  },
  "level-5": {
    name: "Tejedora de hechizos",
    desc: "Alcanzaste el nivel 5",
    emoji: "🧵",
  },
  "level-10": {
    name: "Leyenda de verano",
    desc: "Alcanzaste el nivel 10",
    emoji: "🌙",
  },
};

/** Boss unlock thresholds (missions completed in zone) */
export const BOSS_UNLOCK = {
  math: 8,
  language: 5,
  english: 4,
} as const;

export function bossUnlocked(
  zone: "math" | "language" | "english",
  completedCount: number,
): boolean {
  return completedCount >= BOSS_UNLOCK[zone];
}
