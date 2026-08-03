/** XP, levels, badges catalog, narrative chapters, avatar unlocks, XP shop */

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

/* ─── Avatar ─────────────────────────────────────────────── */

export type AvatarConfig = {
  /** Apariencia base: chica o chico */
  look: "girl" | "boy";
  hair:
    | "none"
    | "short"
    | "wavy"
    | "curly"
    | "long"
    | "bun"
    | "spiky"
    | "braids"
    | "ponytail";
  skin:
    | "fair"
    | "warm"
    | "deep"
    | "rose"
    | "peach"
    | "olive"
    | "golden"
    | "bronze"
    | "ivory";
  hat:
    | "none"
    | "star"
    | "wizard"
    | "crown"
    | "beret"
    | "flower"
    | "crystal"
    | "moon"
    | "leaf"
    | "comet"
    | "phoenix"
    | "nebula";
  cape:
    | "violet"
    | "teal"
    | "rose"
    | "gold"
    | "midnight"
    | "emerald"
    | "coral"
    | "ice"
    | "silver"
    | "aurora"
    | "starlight";
  wand:
    | "violet"
    | "gold"
    | "cyan"
    | "pink"
    | "emerald"
    | "starlight"
    | "crystal"
    | "moon"
    | "shadow"
    | "rainbow"
    | "comet";
  familiar:
    | "owl"
    | "fox"
    | "cat"
    | "bunny"
    | "spark"
    | "wolf"
    | "raven"
    | "otter"
    | "dragon"
    | "phoenix"
    | "unicorn";
  accessory:
    | "none"
    | "glasses"
    | "scarf"
    | "bow"
    | "earrings"
    | "amulet"
    | "badge"
    | "wings"
    | "halo"
    | "belt";
};

export const DEFAULT_AVATAR: AvatarConfig = {
  look: "girl",
  hair: "wavy",
  skin: "fair",
  hat: "none",
  cape: "violet",
  wand: "violet",
  familiar: "owl",
  accessory: "none",
};

type OptBase = {
  label: string;
  emoji: string;
  minLevel?: number;
  requireBadge?: string;
  shopId?: string;
  /** short tag shown on the card */
  tag?: string;
  /** free personal / basic option — never gated by XP or level */
  free?: boolean;
};

export const AVATAR_OPTIONS = {
  look: [
    { id: "girl" as const, label: "Chica", emoji: "👧", free: true, tag: "base" },
    { id: "boy" as const, label: "Chico", emoji: "👦", free: true, tag: "base" },
  ],
  hair: [
    { id: "none" as const, label: "Al natural", emoji: "✨", free: true, tag: "base" },
    { id: "short" as const, label: "Corto", emoji: "✂️", free: true, tag: "base" },
    { id: "wavy" as const, label: "Ondulado", emoji: "🌊", free: true, tag: "base" },
    { id: "curly" as const, label: "Rizado", emoji: "🌀", free: true, tag: "base" },
    { id: "long" as const, label: "Largo", emoji: "💇", free: true, tag: "base" },
    { id: "bun" as const, label: "Moño", emoji: "🎀", free: true, tag: "base" },
    { id: "spiky" as const, label: "Picos", emoji: "⚡", free: true, tag: "base" },
    { id: "braids" as const, label: "Trenzas", emoji: "🧵", free: true, tag: "base" },
    { id: "ponytail" as const, label: "Coleta", emoji: "🎐", free: true, tag: "base" },
  ],
  skin: [
    { id: "fair" as const, label: "Claro", emoji: "🏻", free: true, tag: "base" },
    { id: "ivory" as const, label: "Marfil", emoji: "🤍", free: true, tag: "base" },
    { id: "warm" as const, label: "Cálido", emoji: "🏼", free: true, tag: "base" },
    { id: "peach" as const, label: "Melocotón", emoji: "🍑", free: true, tag: "base" },
    { id: "rose" as const, label: "Rosado", emoji: "🌸", free: true, tag: "base" },
    { id: "golden" as const, label: "Dorado", emoji: "🟨", free: true, tag: "base" },
    { id: "olive" as const, label: "Oliva", emoji: "🫒", free: true, tag: "base" },
    { id: "bronze" as const, label: "Bronce", emoji: "🥉", free: true, tag: "base" },
    { id: "deep" as const, label: "Moreno", emoji: "🏽", free: true, tag: "base" },
  ],
  hat: [
    { id: "none" as const, label: "Sin sombrero", emoji: "·", free: true, tag: "base" },
    { id: "star" as const, label: "Diadema estrella", emoji: "⭐", free: true, tag: "base" },
    { id: "beret" as const, label: "Boina mágica", emoji: "🎩", free: true, tag: "base" },
    { id: "flower" as const, label: "Corona de flores", emoji: "🌸", free: true, tag: "base" },
    { id: "leaf" as const, label: "Corona de hojas", emoji: "🍃", free: true, tag: "base" },
    { id: "wizard" as const, label: "Sombrero de maga", emoji: "🧙", free: true, tag: "base" },
    { id: "moon" as const, label: "Diadema lunar", emoji: "🌙", minLevel: 5 },
    { id: "crystal" as const, label: "Tiara de cristal", emoji: "💎", minLevel: 6 },
    { id: "crown" as const, label: "Corona arcana", emoji: "👑", minLevel: 7 },
    { id: "comet" as const, label: "Diadema cometa", emoji: "☄️", minLevel: 8 },
    {
      id: "phoenix" as const,
      label: "Cresta Fénix",
      emoji: "🔥",
      shopId: "shop-hat-phoenix",
      tag: "tienda",
    },
    {
      id: "nebula" as const,
      label: "Corona nebulosa",
      emoji: "🌌",
      shopId: "shop-hat-nebula",
      tag: "tienda",
    },
  ],
  cape: [
    { id: "violet" as const, label: "Capa violeta", emoji: "💜", free: true, tag: "base" },
    { id: "teal" as const, label: "Capa turquesa", emoji: "🩵", free: true, tag: "base" },
    { id: "rose" as const, label: "Capa rosa", emoji: "💗", free: true, tag: "base" },
    { id: "coral" as const, label: "Capa coral", emoji: "🧡", free: true, tag: "base" },
    { id: "midnight" as const, label: "Capa medianoche", emoji: "🌙", free: true, tag: "base" },
    { id: "emerald" as const, label: "Capa esmeralda", emoji: "💚", minLevel: 5 },
    { id: "ice" as const, label: "Capa de hielo", emoji: "❄️", minLevel: 6 },
    { id: "gold" as const, label: "Capa dorada", emoji: "💛", minLevel: 7 },
    {
      id: "silver" as const,
      label: "Capa de plata",
      emoji: "🤍",
      shopId: "shop-cape-silver",
      tag: "tienda",
    },
    {
      id: "aurora" as const,
      label: "Capa aurora",
      emoji: "🌈",
      shopId: "shop-cape-aurora",
      tag: "tienda",
    },
    {
      id: "starlight" as const,
      label: "Capa estelar",
      emoji: "✨",
      shopId: "shop-cape-starlight",
      tag: "tienda",
    },
  ],
  wand: [
    { id: "violet" as const, label: "Varita violeta", emoji: "🪄", free: true, tag: "base" },
    { id: "gold" as const, label: "Varita dorada", emoji: "✨", free: true, tag: "base" },
    { id: "cyan" as const, label: "Varita cian", emoji: "💧", free: true, tag: "base" },
    { id: "pink" as const, label: "Varita rosa", emoji: "🌸", free: true, tag: "base" },
    { id: "emerald" as const, label: "Varita esmeralda", emoji: "🌿", free: true, tag: "base" },
    { id: "crystal" as const, label: "Varita de cristal", emoji: "💠", minLevel: 5 },
    { id: "moon" as const, label: "Varita lunar", emoji: "🌕", minLevel: 6 },
    { id: "starlight" as const, label: "Varita estelar", emoji: "🌟", minLevel: 7 },
    {
      id: "shadow" as const,
      label: "Varita de sombra",
      emoji: "🌑",
      requireBadge: "boss-math",
      tag: "jefes",
    },
    {
      id: "rainbow" as const,
      label: "Varita arcoíris",
      emoji: "🌈",
      shopId: "shop-wand-rainbow",
      tag: "tienda",
    },
    {
      id: "comet" as const,
      label: "Varita cometa",
      emoji: "☄️",
      shopId: "shop-wand-comet",
      tag: "tienda",
    },
  ],
  familiar: [
    { id: "owl" as const, label: "Búho sabio", emoji: "🦉", free: true, tag: "base" },
    { id: "fox" as const, label: "Zorro listo", emoji: "🦊", free: true, tag: "base" },
    { id: "bunny" as const, label: "Conejo lunar", emoji: "🐰", free: true, tag: "base" },
    { id: "cat" as const, label: "Gato mágico", emoji: "🐱", free: true, tag: "base" },
    { id: "otter" as const, label: "Nutria del río", emoji: "🦦", free: true, tag: "base" },
    { id: "spark" as const, label: "Chispa viva", emoji: "✨", minLevel: 4 },
    { id: "raven" as const, label: "Cuervo de runas", emoji: "🐦‍⬛", minLevel: 5 },
    { id: "wolf" as const, label: "Lobo de niebla", emoji: "🐺", minLevel: 6 },
    { id: "dragon" as const, label: "Dragón bebé", emoji: "🐉", minLevel: 7 },
    {
      id: "phoenix" as const,
      label: "Fénix bebé",
      emoji: "🐦",
      requireBadge: "level-5",
      tag: "logro",
    },
    {
      id: "unicorn" as const,
      label: "Unicornio",
      emoji: "🦄",
      shopId: "shop-familiar-unicorn",
      tag: "tienda",
    },
  ],
  accessory: [
    { id: "none" as const, label: "Sin accesorio", emoji: "·", free: true, tag: "base" },
    { id: "glasses" as const, label: "Gafas de runas", emoji: "👓", free: true, tag: "base" },
    { id: "bow" as const, label: "Lazo de seda", emoji: "🎀", free: true, tag: "base" },
    { id: "scarf" as const, label: "Bufanda de hebras", emoji: "🧣", free: true, tag: "base" },
    { id: "earrings" as const, label: "Pendientes de luna", emoji: "🌙", free: true, tag: "base" },
    { id: "amulet" as const, label: "Amuleto de luna", emoji: "🔮", minLevel: 5 },
    { id: "belt" as const, label: "Cinto de magia", emoji: "⚡", minLevel: 6 },
    {
      id: "badge" as const,
      label: "Broche de la Academia",
      emoji: "🏅",
      requireBadge: "perfect-mission",
      tag: "logro",
    },
    {
      id: "wings" as const,
      label: "Alas de luz",
      emoji: "🪽",
      shopId: "shop-acc-wings",
      tag: "tienda",
    },
    {
      id: "halo" as const,
      label: "Halo de estrellas",
      emoji: "💫",
      shopId: "shop-acc-halo",
      tag: "tienda",
    },
  ],
} as const satisfies Record<keyof AvatarConfig, readonly ({ id: string } & OptBase)[]>;

export type XpShopItem = {
  id: string;
  name: string;
  blurb: string;
  emoji: string;
  cost: number;
  slot: keyof typeof AVATAR_OPTIONS;
  optionId: string;
  rarity: "rara" | "épica" | "legendaria";
};

export const XP_SHOP: XpShopItem[] = [
  {
    id: "shop-cape-aurora",
    name: "Capa Aurora",
    blurb: "Colores del amanecer mágico",
    emoji: "🌈",
    cost: 40,
    slot: "cape",
    optionId: "aurora",
    rarity: "rara",
  },
  {
    id: "shop-cape-silver",
    name: "Capa de Plata",
    blurb: "Brillo de luna fría",
    emoji: "🤍",
    cost: 55,
    slot: "cape",
    optionId: "silver",
    rarity: "rara",
  },
  {
    id: "shop-cape-starlight",
    name: "Capa Estelar",
    blurb: "Cosida con polvo de estrellas",
    emoji: "✨",
    cost: 65,
    slot: "cape",
    optionId: "starlight",
    rarity: "épica",
  },
  {
    id: "shop-wand-rainbow",
    name: "Varita Arcoíris",
    blurb: "Un hechizo de todos los colores",
    emoji: "🌈",
    cost: 70,
    slot: "wand",
    optionId: "rainbow",
    rarity: "épica",
  },
  {
    id: "shop-hat-phoenix",
    name: "Cresta Fénix",
    blurb: "Sombrero de fuego suave",
    emoji: "🔥",
    cost: 80,
    slot: "hat",
    optionId: "phoenix",
    rarity: "épica",
  },
  {
    id: "shop-wand-comet",
    name: "Varita Cometa",
    blurb: "Deja una estela brillante al girar",
    emoji: "☄️",
    cost: 85,
    slot: "wand",
    optionId: "comet",
    rarity: "épica",
  },
  {
    id: "shop-acc-wings",
    name: "Alas de Luz",
    blurb: "Vuela un poquito con la magia",
    emoji: "🪽",
    cost: 90,
    slot: "accessory",
    optionId: "wings",
    rarity: "épica",
  },
  {
    id: "shop-hat-nebula",
    name: "Corona Nebulosa",
    blurb: "Galaxias diminutas en la frente",
    emoji: "🌌",
    cost: 95,
    slot: "hat",
    optionId: "nebula",
    rarity: "legendaria",
  },
  {
    id: "shop-acc-halo",
    name: "Halo de Estrellas",
    blurb: "Un círculo de luz que te sigue",
    emoji: "💫",
    cost: 100,
    slot: "accessory",
    optionId: "halo",
    rarity: "legendaria",
  },
  {
    id: "shop-familiar-unicorn",
    name: "Unicornio",
    blurb: "El familiar más soñado",
    emoji: "🦄",
    cost: 110,
    slot: "familiar",
    optionId: "unicorn",
    rarity: "legendaria",
  },
];

function idsOf<T extends { id: string }>(opts: readonly T[]): Set<string> {
  return new Set(opts.map((o) => o.id));
}

const VALID_LOOK = idsOf(AVATAR_OPTIONS.look);
const VALID_HAIR = idsOf(AVATAR_OPTIONS.hair);
const VALID_SKIN = idsOf(AVATAR_OPTIONS.skin);
const VALID_HAT = idsOf(AVATAR_OPTIONS.hat);
const VALID_CAPE = idsOf(AVATAR_OPTIONS.cape);
const VALID_WAND = idsOf(AVATAR_OPTIONS.wand);
const VALID_FAM = idsOf(AVATAR_OPTIONS.familiar);
const VALID_ACC = idsOf(AVATAR_OPTIONS.accessory);

export function normalizeAvatar(raw: Partial<AvatarConfig> | null | undefined): AvatarConfig {
  const pick = <K extends keyof AvatarConfig>(
    key: K,
    valid: Set<string>,
    fallback: AvatarConfig[K],
  ): AvatarConfig[K] => {
    const v = raw?.[key];
    return v && valid.has(v as string) ? (v as AvatarConfig[K]) : fallback;
  };
  return {
    look: pick("look", VALID_LOOK, DEFAULT_AVATAR.look),
    hair: pick("hair", VALID_HAIR, DEFAULT_AVATAR.hair),
    skin: pick("skin", VALID_SKIN, DEFAULT_AVATAR.skin),
    hat: pick("hat", VALID_HAT, DEFAULT_AVATAR.hat),
    cape: pick("cape", VALID_CAPE, DEFAULT_AVATAR.cape),
    wand: pick("wand", VALID_WAND, DEFAULT_AVATAR.wand),
    familiar: pick("familiar", VALID_FAM, DEFAULT_AVATAR.familiar),
    accessory: pick("accessory", VALID_ACC, DEFAULT_AVATAR.accessory),
  };
}

/** Face emoji from look + skin (personal traits, always free). */
export function avatarFaceEmoji(avatar: AvatarConfig): string {
  const a = normalizeAvatar(avatar);
  if (a.look === "boy") {
    const boys: Record<AvatarConfig["skin"], string> = {
      fair: "👦",
      ivory: "👦🏻",
      warm: "👦🏼",
      peach: "👦🏼",
      rose: "👦🏻",
      golden: "👦🏽",
      olive: "👦🏽",
      bronze: "👦🏾",
      deep: "👦🏿",
    };
    return boys[a.skin] ?? "👦";
  }
  const girls: Record<AvatarConfig["skin"], string> = {
    fair: "👧",
    ivory: "👧🏻",
    warm: "👧🏼",
    peach: "👧🏼",
    rose: "👧🏻",
    golden: "👧",
    olive: "👧",
    bronze: "👧🏾",
    deep: "👧🏿",
  };
  return girls[a.skin] ?? "👧";
}

export function isAvatarOptionUnlocked(
  opt: {
    minLevel?: number;
    requireBadge?: string;
    shopId?: string;
    free?: boolean;
    tag?: string;
  },
  ctx: { level: number; badges: string[]; ownedShop: string[] },
): { ok: boolean; reason?: string } {
  // Personal / basic traits never depend on XP or level
  if (opt.free || opt.tag === "base") {
    return { ok: true };
  }
  if (opt.shopId && !ctx.ownedShop.includes(opt.shopId)) {
    return { ok: false, reason: "Solo en la tienda" };
  }
  if (opt.requireBadge && !ctx.badges.includes(opt.requireBadge)) {
    return { ok: false, reason: "Insignia especial" };
  }
  const min = opt.minLevel ?? 1;
  if (ctx.level < min) {
    return { ok: false, reason: `Nivel ${min}` };
  }
  return { ok: true };
}

export type StoryChapter = {
  id: string;
  title: string;
  text: string;
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
    text: "Desde lo alto, Liz ve Madrid lejano y el cielo de verano. La Academia le confía un secreto: el conocimiento es la magia más fuerte de todas.",
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

/** Permanent badges — magical names, same unlock ids (game logic untouched) */
export const ALL_BADGES: Record<
  string,
  { name: string; desc: string; emoji: string; glow: "gold" | "violet" | "teal" | "rose" }
> = {
  "racha-3": {
    name: "Llama de Tres Soles",
    desc: "¡3 días seguidos de magia!",
    emoji: "🔥",
    glow: "rose",
  },
  "racha-7": {
    name: "Corona de Siete Estrellas",
    desc: "Una semana entera de práctica",
    emoji: "🌟",
    glow: "gold",
  },
  "cien-puntos": {
    name: "Lluvia de Estrellas",
    desc: "100 puntos brillando en tu grimorio",
    emoji: "✨",
    glow: "gold",
  },
  quinientos: {
    name: "Trono Arcano",
    desc: "500 puntos de pura magia",
    emoji: "👑",
    glow: "gold",
  },
  "math-5": {
    name: "Semilla de Números",
    desc: "5 partidas en la Torre de Mates",
    emoji: "🔢",
    glow: "teal",
  },
  "math-15": {
    name: "Hechicera del Cálculo",
    desc: "15 partidas de matemáticas",
    emoji: "🪄",
    glow: "violet",
  },
  "math-all": {
    name: "Guardiana de la Torre",
    desc: "¡30 partidas en la Torre de Números!",
    emoji: "🏰",
    glow: "gold",
  },
  "lang-5": {
    name: "Exploradora de Palabras",
    desc: "5 partidas de lengua",
    emoji: "📖",
    glow: "teal",
  },
  "lang-all": {
    name: "Maestra de las Oraciones",
    desc: "Muchas partidas de lengua completadas",
    emoji: "📜",
    glow: "violet",
  },
  "eng-half": {
    name: "Brújula del Inglés",
    desc: "Varias partidas de English",
    emoji: "🧭",
    glow: "teal",
  },
  "eng-all": {
    name: "Maga Bilingüe",
    desc: "Muchas partidas de inglés",
    emoji: "🇬🇧",
    glow: "violet",
  },
  lectora: {
    name: "Lectora de Dos Mundos",
    desc: "Completaste las 2 fichas de lectura",
    emoji: "📚",
    glow: "rose",
  },
  "boss-math": {
    name: "Llave del Guardián",
    desc: "Venciste al Guardián de los Números",
    emoji: "⚔️",
    glow: "gold",
  },
  "boss-lang": {
    name: "Sello de la Biblioteca",
    desc: "Venciste a la Bibliotecaria Misteriosa",
    emoji: "🦉",
    glow: "violet",
  },
  "boss-eng": {
    name: "Amiga de la Esfinge",
    desc: "Superaste la prueba de la English Sphinx",
    emoji: "🦁",
    glow: "teal",
  },
  "perfect-mission": {
    name: "Diamante Sin Fallos",
    desc: "Una partida perfecta (¡ni un error!)",
    emoji: "💎",
    glow: "gold",
  },
  "level-5": {
    name: "Tejedora de Hechizos",
    desc: "Alcanzaste el nivel 5 de maga",
    emoji: "🧵",
    glow: "violet",
  },
  "level-10": {
    name: "Leyenda del Verano",
    desc: "Alcanzaste el nivel 10 — ¡eres leyenda!",
    emoji: "🌙",
    glow: "gold",
  },
};

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
