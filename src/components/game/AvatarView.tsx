import { useState } from "react";
import { Lock, ShoppingBag, Sparkles, Star } from "lucide-react";
import { useGameStore } from "@/lib/game-store";
import {
  AVATAR_OPTIONS,
  XP_SHOP,
  isAvatarOptionUnlocked,
  normalizeAvatar,
  type AvatarConfig,
  levelFromXp,
  xpProgress,
} from "@/lib/progression";
import { TEMP_BADGE_LABELS } from "@/lib/roulette-prizes";
import { cn } from "@/lib/utils";

/** Real skin tones (not emoji stickers) */
const SKIN_HEX: Record<AvatarConfig["skin"], string> = {
  fair: "#f6d4b5",
  ivory: "#ffe8d4",
  warm: "#e4b07a",
  peach: "#f0bc9c",
  rose: "#efc0b4",
  golden: "#d4a06a",
  olive: "#c49a62",
  bronze: "#a06a40",
  deep: "#6b3f24",
};

const HAIR_HEX: Record<AvatarConfig["hair"], string> = {
  none: "transparent",
  short: "#3a2412",
  wavy: "#5c3618",
  curly: "#2a180c",
  long: "#6b3f1a",
  bun: "#8b4a1e",
  spiky: "#1c1a28",
  braids: "#4a2810",
  ponytail: "#3d2010",
};

const CAPE_CLASS: Record<AvatarConfig["cape"], string> = {
  violet: "from-violet-600 to-purple-950",
  teal: "from-teal-400 to-cyan-900",
  rose: "from-rose-400 to-pink-900",
  gold: "from-amber-300 to-yellow-800",
  midnight: "from-indigo-800 to-slate-950",
  emerald: "from-emerald-400 to-green-900",
  silver: "from-slate-200 to-slate-600",
  aurora: "from-fuchsia-400 via-violet-500 to-amber-300",
  coral: "from-orange-400 to-rose-700",
  ice: "from-sky-200 to-cyan-700",
  starlight: "from-yellow-200 via-violet-400 to-indigo-900",
  cosmic: "from-indigo-950 via-fuchsia-700 to-cyan-400",
};

const WAND_CLASS: Record<AvatarConfig["wand"], string> = {
  violet: "bg-violet-400 shadow-violet-400/50",
  gold: "bg-amber-300 shadow-amber-300/50",
  cyan: "bg-cyan-300 shadow-cyan-300/50",
  pink: "bg-pink-300 shadow-pink-300/50",
  emerald: "bg-emerald-400 shadow-emerald-400/50",
  starlight: "bg-yellow-200 shadow-yellow-200/60",
  shadow: "bg-slate-700 shadow-slate-700/50",
  rainbow:
    "bg-gradient-to-b from-pink-400 via-violet-400 to-cyan-400 shadow-violet-400/50",
  crystal: "bg-cyan-100 shadow-cyan-200/60",
  moon: "bg-indigo-200 shadow-indigo-200/50",
  comet:
    "bg-gradient-to-b from-amber-200 via-orange-400 to-violet-600 shadow-orange-400/50",
};

const HAT_EMOJI: Record<AvatarConfig["hat"], string> = {
  none: "",
  star: "⭐",
  wizard: "🧙",
  crown: "👑",
  beret: "🎩",
  flower: "🌸",
  crystal: "💎",
  moon: "🌙",
  leaf: "🍃",
  comet: "☄️",
  phoenix: "🔥",
  nebula: "🌌",
};

const FAMILIAR_EMOJI: Record<AvatarConfig["familiar"], string> = {
  owl: "🦉",
  fox: "🦊",
  cat: "🐱",
  dragon: "🐉",
  bunny: "🐰",
  spark: "✨",
  phoenix: "🐦",
  unicorn: "🦄",
  wolf: "🐺",
  raven: "🐦‍⬛",
  otter: "🦦",
};

const RARITY_LABEL: Record<string, string> = {
  común: "Común",
  rara: "Rara",
  épica: "Épica",
  legendaria: "Legendaria",
  mítica: "Mítica",
};

const RARITY_CLASS: Record<string, string> = {
  común: "border-border bg-surface text-muted",
  rara: "border-accent/40 bg-accent/10 text-accent",
  épica: "border-primary/50 bg-primary/15 text-primary",
  legendaria: "border-amber-300/50 bg-amber-300/15 text-amber-200",
  mítica:
    "border-fuchsia-400/60 bg-gradient-to-r from-fuchsia-500/20 to-cyan-400/20 text-fuchsia-200",
};

function HairLayer({
  hair,
  color,
  size,
}: {
  hair: AvatarConfig["hair"];
  color: string;
  size: "sm" | "md" | "lg";
}) {
  if (hair === "none") return null;
  const s = size === "sm" ? 1 : size === "lg" ? 1.35 : 1.1;

  // Layered CSS hair that actually changes shape with the selection
  if (hair === "short") {
    return (
      <span
        className="absolute left-1/2 top-[8%] z-[2] -translate-x-1/2 rounded-[50%] "
        style={{
          width: `${52 * s}%`,
          height: `${28 * s}%`,
          background: color,
          boxShadow: `0 2px 0 ${color}`,
        }}
        aria-hidden
      />
    );
  }
  if (hair === "spiky") {
    return (
      <span className="absolute left-1/2 top-[2%] z-[2] flex -translate-x-1/2 gap-0.5" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="block origin-bottom"
            style={{
              width: size === "sm" ? 5 : size === "lg" ? 10 : 7,
              height: size === "sm" ? 12 : size === "lg" ? 22 : 16,
              background: color,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              transform: `rotate(${(i - 2) * 12}deg)`,
            }}
          />
        ))}
      </span>
    );
  }
  if (hair === "bun") {
    return (
      <>
        <span
          className="absolute left-1/2 top-[10%] z-[2] -translate-x-1/2 rounded-full"
          style={{
            width: `${48 * s}%`,
            height: `${22 * s}%`,
            background: color,
          }}
          aria-hidden
        />
        <span
          className="absolute left-1/2 top-[-2%] z-[3] -translate-x-1/2 rounded-full"
          style={{
            width: `${28 * s}%`,
            height: `${28 * s}%`,
            background: color,
            boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.2)",
          }}
          aria-hidden
        />
      </>
    );
  }
  if (hair === "ponytail") {
    return (
      <>
        <span
          className="absolute left-1/2 top-[10%] z-[2] -translate-x-1/2 rounded-[50%]"
          style={{
            width: `${50 * s}%`,
            height: `${24 * s}%`,
            background: color,
          }}
          aria-hidden
        />
        <span
          className="absolute right-[18%] top-[28%] z-[1] rounded-full"
          style={{
            width: size === "sm" ? 8 : size === "lg" ? 16 : 12,
            height: size === "sm" ? 28 : size === "lg" ? 52 : 38,
            background: color,
            transform: "rotate(18deg)",
          }}
          aria-hidden
        />
      </>
    );
  }
  if (hair === "braids") {
    return (
      <>
        <span
          className="absolute left-1/2 top-[10%] z-[2] -translate-x-1/2 rounded-[50%]"
          style={{
            width: `${50 * s}%`,
            height: `${24 * s}%`,
            background: color,
          }}
          aria-hidden
        />
        {(["left", "right"] as const).map((side) => (
          <span
            key={side}
            className={cn(
              "absolute top-[32%] z-[1] rounded-full",
              side === "left" ? "left-[12%]" : "right-[12%]",
            )}
            style={{
              width: size === "sm" ? 7 : size === "lg" ? 14 : 10,
              height: size === "sm" ? 32 : size === "lg" ? 58 : 42,
              background: `repeating-linear-gradient(180deg, ${color}, ${color} 4px, #1a0e06 4px, #1a0e06 5px)`,
            }}
            aria-hidden
          />
        ))}
      </>
    );
  }
  if (hair === "long" || hair === "wavy") {
    return (
      <>
        <span
          className="absolute left-1/2 top-[8%] z-[2] -translate-x-1/2 rounded-[50%_50%_40%_40%]"
          style={{
            width: `${54 * s}%`,
            height: `${30 * s}%`,
            background: color,
          }}
          aria-hidden
        />
        {(["left", "right"] as const).map((side) => (
          <span
            key={side}
            className={cn(
              "absolute top-[22%] z-[1]",
              side === "left" ? "left-[8%]" : "right-[8%]",
              hair === "wavy" ? "rounded-[40%]" : "rounded-full",
            )}
            style={{
              width: size === "sm" ? 12 : size === "lg" ? 22 : 16,
              height: size === "sm" ? 36 : size === "lg" ? 64 : 48,
              background: color,
              transform: side === "left" ? "rotate(-6deg)" : "rotate(6deg)",
            }}
            aria-hidden
          />
        ))}
      </>
    );
  }
  // curly
  return (
    <>
      <span
        className="absolute left-1/2 top-[4%] z-[2] -translate-x-1/2 rounded-full"
        style={{
          width: `${58 * s}%`,
          height: `${38 * s}%`,
          background: color,
          boxShadow: `
            -10px 6px 0 0 ${color},
            10px 6px 0 0 ${color},
            -6px 14px 0 0 ${color},
            6px 14px 0 0 ${color}
          `,
        }}
        aria-hidden
      />
    </>
  );
}

export function AvatarPortrait({
  size = "md",
  className,
  avatar: avatarProp,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Optional override (e.g. profile card); defaults to live game store */
  avatar?: Partial<AvatarConfig> | null;
}) {
  const storeAvatar = useGameStore((s) => s.avatar);
  const avatar = normalizeAvatar(avatarProp ?? storeAvatar);
  const xp = useGameStore((s) => s.xp);
  const level = levelFromXp(xp);
  const equippedTemp = useGameStore((s) => s.equippedTempBadge);
  const tempBadges = useGameStore((s) => s.tempBadges);

  const dim =
    size === "sm" ? "h-14 w-14" : size === "lg" ? "h-44 w-44" : "h-28 w-28";
  const headPct = size === "sm" ? "52%" : "50%";
  const glow =
    level >= 8
      ? "ring-2 ring-primary shadow-lg shadow-primary/30"
      : level >= 4
        ? "ring-1 ring-accent/50"
        : "";

  const tempActive =
    equippedTemp &&
    tempBadges[equippedTemp] &&
    tempBadges[equippedTemp]! > Date.now()
      ? equippedTemp
      : null;
  const tempInfo = tempActive ? TEMP_BADGE_LABELS[tempActive] : null;
  const auraClass =
    tempInfo?.aura === "breeze"
      ? "temp-aura-breeze"
      : tempInfo?.aura === "ember"
        ? "temp-aura-ember"
        : tempInfo?.aura === "stars"
          ? "temp-aura-stars"
          : "";

  const skin = SKIN_HEX[avatar.skin] ?? SKIN_HEX.fair;
  const hairColor = HAIR_HEX[avatar.hair] ?? HAIR_HEX.wavy;
  const isBoy = avatar.look === "boy";
  const eyeSize = size === "sm" ? 3 : size === "lg" ? 7 : 5;
  const mouthW = size === "sm" ? 8 : size === "lg" ? 16 : 12;

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      {tempActive && (
        <span
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 scale-125 rounded-full",
            dim,
            auraClass,
          )}
          aria-hidden
        />
      )}

      {/* Wings / halo behind body */}
      {avatar.accessory === "wings" && (
        <span
          className={cn(
            "pointer-events-none absolute left-1/2 top-[38%] z-0 -translate-x-1/2 -translate-y-1/2 text-sky-200/90",
            size === "sm" ? "text-2xl" : size === "lg" ? "text-6xl" : "text-4xl",
          )}
          aria-hidden
        >
          🪽
        </span>
      )}
      {avatar.accessory === "halo" && (
        <span
          className={cn(
            "pointer-events-none absolute left-1/2 z-[4] -translate-x-1/2 rounded-full border-2 border-amber-200/90",
            size === "sm" ? "top-0 h-3 w-7" : size === "lg" ? "-top-1 h-6 w-16" : "top-0 h-4 w-11",
          )}
          style={{ boxShadow: "0 0 10px rgba(253,224,71,0.7)" }}
          aria-hidden
        />
      )}

      {/* Body = cape shape */}
      <div
        className={cn(
          "relative z-[1] overflow-visible rounded-[42%] bg-gradient-to-b shadow-inner",
          CAPE_CLASS[avatar.cape] ?? CAPE_CLASS.violet,
          dim,
          glow,
          tempActive && "ring-2 ring-offset-2 ring-offset-bg",
          tempInfo?.hue === "mint" && "ring-emerald-300/80",
          tempInfo?.hue === "ember" && "ring-orange-300/80",
          tempInfo?.hue === "sky" && "ring-sky-300/80",
        )}
      >
        {/* Neck */}
        <span
          className="absolute left-1/2 top-[48%] z-[2] -translate-x-1/2 rounded-b-md"
          style={{
            width: size === "sm" ? 10 : size === "lg" ? 22 : 14,
            height: size === "sm" ? 8 : size === "lg" ? 16 : 12,
            background: skin,
          }}
          aria-hidden
        />

        {/* Scarf / belt at collar */}
        {avatar.accessory === "scarf" && (
          <span
            className="absolute left-1/2 top-[52%] z-[3] -translate-x-1/2 rounded-full bg-rose-400"
            style={{
              width: size === "sm" ? 22 : size === "lg" ? 48 : 32,
              height: size === "sm" ? 6 : size === "lg" ? 12 : 8,
            }}
            aria-hidden
          />
        )}
        {avatar.accessory === "belt" && (
          <span
            className="absolute left-1/2 top-[72%] z-[3] -translate-x-1/2 rounded-sm bg-amber-400"
            style={{
              width: size === "sm" ? 20 : size === "lg" ? 44 : 30,
              height: size === "sm" ? 4 : size === "lg" ? 8 : 5,
            }}
            aria-hidden
          />
        )}

        {/* Head */}
        <div
          className={cn(
            "absolute left-1/2 top-[18%] z-[3] -translate-x-1/2",
            isBoy ? "rounded-[42%]" : "rounded-full",
          )}
          style={{
            width: headPct,
            height: headPct,
            background: skin,
            boxShadow: "inset -3px -4px 8px rgba(0,0,0,0.12), inset 2px 2px 4px rgba(255,255,255,0.25)",
          }}
        >
          <HairLayer hair={avatar.hair} color={hairColor} size={size} />

          {/* Eyes */}
          <span
            className="absolute left-[28%] top-[46%] rounded-full bg-stone-900"
            style={{ width: eyeSize, height: eyeSize }}
            aria-hidden
          />
          <span
            className="absolute right-[28%] top-[46%] rounded-full bg-stone-900"
            style={{ width: eyeSize, height: eyeSize }}
            aria-hidden
          />
          {!isBoy && (
            <>
              <span
                className="absolute left-[26%] top-[44%] h-px bg-stone-800/70"
                style={{ width: eyeSize + 2 }}
                aria-hidden
              />
              <span
                className="absolute right-[26%] top-[44%] h-px bg-stone-800/70"
                style={{ width: eyeSize + 2 }}
                aria-hidden
              />
            </>
          )}

          {/* Smile */}
          <span
            className="absolute left-1/2 top-[62%] -translate-x-1/2 rounded-b-full border-b-2 border-stone-800/70"
            style={{ width: mouthW, height: mouthW * 0.45 }}
            aria-hidden
          />

          {/* Glasses */}
          {avatar.accessory === "glasses" && (
            <span
              className="absolute left-1/2 top-[42%] z-[5] flex -translate-x-1/2 items-center gap-0.5"
              aria-hidden
            >
              <span
                className="rounded-full border-2 border-violet-700/80 bg-sky-200/20"
                style={{ width: eyeSize * 2.2, height: eyeSize * 1.8 }}
              />
              <span className="h-px w-1 bg-violet-700/80" />
              <span
                className="rounded-full border-2 border-violet-700/80 bg-sky-200/20"
                style={{ width: eyeSize * 2.2, height: eyeSize * 1.8 }}
              />
            </span>
          )}

          {/* Bow / earrings / amulet / badge as small integrated accents */}
          {avatar.accessory === "bow" && (
            <span
              className="absolute left-1/2 top-[8%] z-[5] -translate-x-1/2 text-rose-400"
              style={{ fontSize: size === "sm" ? 8 : size === "lg" ? 16 : 12 }}
              aria-hidden
            >
              🎀
            </span>
          )}
          {avatar.accessory === "earrings" && (
            <>
              <span
                className="absolute left-[8%] top-[58%] text-sky-300"
                style={{ fontSize: size === "sm" ? 7 : 11 }}
                aria-hidden
              >
                🌙
              </span>
              <span
                className="absolute right-[8%] top-[58%] text-sky-300"
                style={{ fontSize: size === "sm" ? 7 : 11 }}
                aria-hidden
              >
                🌙
              </span>
            </>
          )}
          {avatar.accessory === "amulet" && (
            <span
              className="absolute left-1/2 top-[88%] z-[5] -translate-x-1/2"
              style={{ fontSize: size === "sm" ? 8 : size === "lg" ? 16 : 12 }}
              aria-hidden
            >
              🔮
            </span>
          )}
          {avatar.accessory === "badge" && (
            <span
              className="absolute right-[6%] top-[70%] z-[5]"
              style={{ fontSize: size === "sm" ? 8 : 12 }}
              aria-hidden
            >
              🏅
            </span>
          )}
        </div>

        {/* Hat on top of head */}
        {avatar.hat !== "none" && (
          <span
            className={cn(
              "absolute left-1/2 z-[6] -translate-x-1/2 drop-shadow",
              size === "sm" ? "-top-1 text-sm" : size === "lg" ? "-top-2 text-3xl" : "-top-1.5 text-xl",
            )}
            aria-hidden
          >
            {HAT_EMOJI[avatar.hat]}
          </span>
        )}

        {/* Wand */}
        <span
          className={cn(
            "absolute bottom-[12%] right-[6%] z-[4] rounded-full shadow-md",
            WAND_CLASS[avatar.wand] ?? WAND_CLASS.violet,
            size === "sm" ? "h-5 w-1" : size === "lg" ? "h-14 w-2" : "h-9 w-1.5",
          )}
          aria-hidden
        />
        <span
          className={cn(
            "absolute z-[5] rounded-full bg-yellow-200 shadow",
            size === "sm"
              ? "bottom-[28%] right-[3%] h-1.5 w-1.5"
              : size === "lg"
                ? "bottom-[38%] right-[2%] h-3 w-3"
                : "bottom-[32%] right-[2%] h-2 w-2",
          )}
          aria-hidden
        />
      </div>

      {/* Familiar sits beside, not as a sticker on the face */}
      <span
        className={cn(
          "absolute -bottom-0.5 -right-1 z-[2] drop-shadow",
          size === "sm" ? "text-base" : size === "lg" ? "text-3xl" : "text-2xl",
        )}
        aria-hidden
      >
        {FAMILIAR_EMOJI[avatar.familiar] ?? "🦉"}
      </span>

      {tempActive && tempInfo && (
        <span
          className={cn(
            "absolute -left-1 -top-1 z-[3] rounded-full border border-dashed border-accent/70 bg-card/95 px-0.5 shadow",
            size === "sm" ? "text-[10px]" : "text-sm",
          )}
          title={tempInfo.name}
          aria-label={`Insignia temporal equipada: ${tempInfo.name}`}
        >
          {tempInfo.emoji}
        </span>
      )}
    </div>
  );
}

type Tab = "look" | "shop";

const SECTIONS: {
  key: keyof typeof AVATAR_OPTIONS;
  label: string;
  emoji: string;
}[] = [
  { key: "look", label: "Look", emoji: "👤" },
  { key: "skin", label: "Tono", emoji: "🎨" },
  { key: "hair", label: "Pelo", emoji: "💇" },
  { key: "hat", label: "Sombrero", emoji: "👑" },
  { key: "cape", label: "Capa", emoji: "🧥" },
  { key: "wand", label: "Varita", emoji: "🪄" },
  { key: "familiar", label: "Familiar", emoji: "🦉" },
  { key: "accessory", label: "Extra", emoji: "✨" },
];

function OptionSwatch({
  section,
  id,
}: {
  section: keyof typeof AVATAR_OPTIONS;
  id: string;
}) {
  if (section === "skin") {
    return (
      <span
        className="mx-auto block h-9 w-9 rounded-full border-2 border-white/40 shadow-inner sm:h-10 sm:w-10"
        style={{ background: SKIN_HEX[id as AvatarConfig["skin"]] ?? "#ccc" }}
        aria-hidden
      />
    );
  }
  if (section === "hair") {
    return (
      <span
        className="mx-auto block h-9 w-9 rounded-full border-2 border-white/30 shadow-inner sm:h-10 sm:w-10"
        style={{
          background:
            id === "none"
              ? "linear-gradient(135deg,#eee,#ccc)"
              : HAIR_HEX[id as AvatarConfig["hair"]] ?? "#3a2412",
        }}
        aria-hidden
      />
    );
  }
  if (section === "look") {
    return (
      <span className="text-3xl" aria-hidden>
        {id === "boy" ? "👦" : "👧"}
      </span>
    );
  }
  if (section === "cape") {
    return (
      <span
        className={cn(
          "mx-auto block h-9 w-9 rounded-full bg-gradient-to-b sm:h-10 sm:w-10",
          CAPE_CLASS[id as AvatarConfig["cape"]] ?? CAPE_CLASS.violet,
        )}
        aria-hidden
      />
    );
  }
  const opt = AVATAR_OPTIONS[section].find((o) => o.id === id);
  return (
    <span className="text-3xl leading-none" aria-hidden>
      {opt?.emoji === "·" ? "○" : opt?.emoji}
    </span>
  );
}

export function AvatarCustomizer() {
  const rawAvatar = useGameStore((s) => s.avatar);
  const avatar = normalizeAvatar(rawAvatar);
  const setAvatar = useGameStore((s) => s.setAvatar);
  const buyShopItem = useGameStore((s) => s.buyShopItem);
  const ownedShopItems = useGameStore((s) => s.ownedShopItems);
  const badges = useGameStore((s) => s.badges);
  const xp = useGameStore((s) => s.xp);
  const name = useGameStore((s) => s.playerName);
  const setView = useGameStore((s) => s.setView);
  const prog = xpProgress(xp);
  const [tab, setTab] = useState<Tab>("look");
  const [shopMsg, setShopMsg] = useState<string | null>(null);
  const [section, setSection] = useState<keyof typeof AVATAR_OPTIONS>("look");

  const unlockCtx = {
    level: prog.level,
    badges,
    ownedShop: ownedShopItems,
  };

  const unlockedCount = SECTIONS.reduce((acc, { key }) => {
    return (
      acc +
      AVATAR_OPTIONS[key].filter((o) => isAvatarOptionUnlocked(o, unlockCtx).ok)
        .length
    );
  }, 0);
  const totalCount = SECTIONS.reduce(
    (acc, { key }) => acc + AVATAR_OPTIONS[key].length,
    0,
  );

  const skinLabel =
    AVATAR_OPTIONS.skin.find((s) => s.id === avatar.skin)?.label ?? "";
  const hairLabel =
    AVATAR_OPTIONS.hair.find((s) => s.id === avatar.hair)?.label ?? "";

  return (
    <div className="mx-auto max-w-lg space-y-5 px-0.5 sm:space-y-6">
      <div className="space-y-1">
        <h1 className="font-display text-2xl font-semibold text-fg sm:text-3xl">
          Tu avatar, {name}
        </h1>
        <p className="text-sm leading-snug text-muted sm:text-base">
          Nivel {prog.level} · {prog.title}. Elige look y ve el cambio al
          instante.
        </p>
      </div>

      {/* Live preview stage */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-card p-6 sm:p-8 card-glow">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(circle at 50% 15%, color-mix(in oklab, var(--color-accent) 40%, transparent), transparent 55%)",
          }}
        />
        <div className="relative flex flex-col items-center gap-3">
          <AvatarPortrait size="lg" />
          <p className="text-center text-sm font-semibold text-fg">
            {avatar.look === "boy" ? "Chico" : "Chica"}
            {" · "}
            {skinLabel}
            {" · "}
            {hairLabel}
          </p>
          <p className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-fg">
            <Star className="h-3.5 w-3.5 text-primary" aria-hidden />
            {xp} XP · {unlockedCount}/{totalCount} opciones
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 rounded-2xl border border-border bg-surface/50 p-1.5">
        <button
          type="button"
          onClick={() => setTab("look")}
          className={cn(
            "min-h-12 rounded-xl text-sm font-bold transition sm:text-base",
            tab === "look"
              ? "bg-primary text-primary-fg shadow-sm"
              : "text-muted hover:text-fg",
          )}
        >
          Personalizar
        </button>
        <button
          type="button"
          onClick={() => setTab("shop")}
          className={cn(
            "inline-flex min-h-12 items-center justify-center gap-1.5 rounded-xl text-sm font-bold transition sm:text-base",
            tab === "shop"
              ? "bg-primary text-primary-fg shadow-sm"
              : "text-muted hover:text-fg",
          )}
        >
          <ShoppingBag className="h-4 w-4" aria-hidden />
          Tienda de XP
        </button>
      </div>

      {tab === "look" && (
        <div className="space-y-4">
          <p className="text-sm leading-snug text-muted">
            Tono de piel y pelo cambian el dibujo de verdad (no son pegatinas).
            Lo básico es gratis.
          </p>

          <div
            className="grid grid-cols-4 gap-2"
            role="tablist"
            aria-label="Categorías del avatar"
          >
            {SECTIONS.map(({ key, label, emoji }) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={section === key}
                onClick={() => setSection(key)}
                className={cn(
                  "flex min-h-[3.5rem] flex-col items-center justify-center gap-0.5 rounded-2xl border-2 px-1 py-2 text-center transition active:scale-[0.98]",
                  section === key
                    ? "border-primary bg-primary/20 text-fg shadow-sm"
                    : "border-border bg-surface text-muted hover:border-primary/35 hover:text-fg",
                )}
              >
                <span className="text-lg leading-none" aria-hidden>
                  {emoji}
                </span>
                <span className="text-[11px] font-bold leading-tight">
                  {label}
                </span>
              </button>
            ))}
          </div>

          <section className="space-y-3">
            <h2 className="font-display text-base font-semibold text-fg">
              {SECTIONS.find((s) => s.key === section)?.emoji}{" "}
              {SECTIONS.find((s) => s.key === section)?.label}
            </h2>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
              {AVATAR_OPTIONS[section].map((o) => {
                const { ok, reason } = isAvatarOptionUnlocked(o, unlockCtx);
                const active = avatar[section] === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    disabled={!ok}
                    onClick={() =>
                      setAvatar({ [section]: o.id } as Partial<AvatarConfig>)
                    }
                    className={cn(
                      "flex min-h-[5.5rem] flex-col items-center justify-center rounded-2xl border-2 px-2 py-3 text-center transition active:scale-[0.98]",
                      active &&
                        ok &&
                        "border-primary bg-primary/20 ring-2 ring-primary/30",
                      !active &&
                        ok &&
                        "border-border bg-surface hover:border-primary/40",
                      !ok &&
                        "cursor-not-allowed border-border/50 bg-surface/40 opacity-55",
                    )}
                  >
                    <OptionSwatch section={section} id={o.id} />
                    <span className="mt-2 block text-xs font-bold leading-snug text-fg sm:text-sm">
                      {o.label}
                    </span>
                    {"tag" in o && o.tag === "tienda" && ok && (
                      <span className="mt-1 inline-block rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                        tienda
                      </span>
                    )}
                    {!ok && (
                      <span className="mt-1.5 flex items-center justify-center gap-1 px-1 text-[10px] leading-tight text-muted">
                        <Lock className="h-3 w-3 shrink-0" aria-hidden />
                        {reason}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {tab === "shop" && (
        <div className="space-y-4">
          <section className="rounded-2xl border-2 border-accent/40 bg-gradient-to-br from-accent/15 via-card to-primary/10 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/20 text-accent">
                <ShoppingBag className="h-5 w-5" aria-hidden />
              </span>
              <div className="min-w-0 space-y-1">
                <h2 className="font-display text-lg font-semibold text-fg">
                  Tienda mágica de XP
                </h2>
                <p className="text-sm leading-snug text-muted">
                  Precios por rareza: comunes baratos → míticos de 500 XP. Se
                  equipan al comprar.
                </p>
                <p className="text-sm font-semibold text-fg">
                  Tu saldo: {xp} XP
                </p>
              </div>
            </div>
          </section>

          <ul className="space-y-3">
            {XP_SHOP.map((item) => {
              const owned = ownedShopItems.includes(item.id);
              const canAfford = xp >= item.cost;
              const equipped =
                owned && (avatar[item.slot] as string) === item.optionId;
              return (
                <li
                  key={item.id}
                  className={cn(
                    "flex flex-col gap-3 rounded-2xl border bg-card p-4 sm:flex-row sm:items-center sm:gap-4",
                    owned ? "border-success/35" : "border-border",
                    item.rarity === "mítica" &&
                      !owned &&
                      "border-fuchsia-400/50 bg-gradient-to-br from-fuchsia-500/10 to-cyan-400/10",
                  )}
                >
                  <span
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-surface text-2xl"
                    aria-hidden
                  >
                    {item.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-display text-base font-semibold text-fg">
                        {item.name}
                      </p>
                      <span
                        className={cn(
                          "rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                          RARITY_CLASS[item.rarity],
                        )}
                      >
                        {RARITY_LABEL[item.rarity]}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm leading-snug text-muted">
                      {item.blurb}
                    </p>
                    <p
                      className={cn(
                        "mt-1.5 text-sm font-semibold",
                        owned
                          ? "text-success"
                          : canAfford
                            ? "text-primary"
                            : "text-muted",
                      )}
                    >
                      {owned
                        ? equipped
                          ? "✓ Tuyo y equipado"
                          : "✓ Ya lo tienes"
                        : `${item.cost} XP`}
                      {!owned && !canAfford && (
                        <span className="ml-1 font-normal text-muted">
                          · te faltan {item.cost - xp}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col gap-2 sm:min-w-[7.5rem]">
                    {!owned && (
                      <button
                        type="button"
                        disabled={!canAfford}
                        onClick={() => {
                          const msg = buyShopItem(item.id);
                          setShopMsg(msg);
                        }}
                        className={cn(
                          "min-h-12 rounded-xl px-4 text-sm font-bold",
                          canAfford
                            ? "bg-primary text-primary-fg"
                            : "cursor-not-allowed bg-surface-2 text-muted opacity-70",
                        )}
                      >
                        {canAfford ? "Comprar y equipar" : "Sin XP"}
                      </button>
                    )}
                    {owned && !equipped && (
                      <button
                        type="button"
                        onClick={() =>
                          setAvatar({
                            [item.slot]: item.optionId,
                          } as Partial<AvatarConfig>)
                        }
                        className="min-h-12 rounded-xl border border-primary/40 bg-primary/15 px-4 text-sm font-bold text-fg"
                      >
                        Equipar
                      </button>
                    )}
                    {owned && equipped && (
                      <span className="inline-flex min-h-12 items-center justify-center rounded-xl border border-success/40 bg-success/15 px-4 text-sm font-bold text-success">
                        Equipado
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          {shopMsg && (
            <p
              className="rounded-xl border border-success/40 bg-success/10 p-3 text-center text-sm font-medium text-fg"
              role="status"
            >
              <Sparkles className="mr-1 inline h-4 w-4 text-primary" />
              {shopMsg}
            </p>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => setView("progress")}
        className="min-h-12 w-full rounded-xl border border-border bg-surface text-sm font-semibold text-fg"
      >
        Volver a la Sala de Trofeos
      </button>
    </div>
  );
}
