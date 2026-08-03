import { useState } from "react";
import { Lock, ShoppingBag, Sparkles, Star } from "lucide-react";
import { useGameStore } from "@/lib/game-store";
import {
  AVATAR_OPTIONS,
  XP_SHOP,
  avatarFaceEmoji,
  defaultFaceForLook,
  facesForLook,
  isAvatarOptionUnlocked,
  normalizeAvatar,
  type AvatarConfig,
  levelFromXp,
  xpProgress,
} from "@/lib/progression";
import { TEMP_BADGE_LABELS } from "@/lib/roulette-prizes";
import { cn } from "@/lib/utils";

const CAPE_RING: Record<AvatarConfig["cape"], string> = {
  violet: "from-violet-500/90 to-purple-900/90",
  teal: "from-teal-400/90 to-cyan-800/90",
  rose: "from-rose-400/90 to-pink-800/90",
  gold: "from-amber-300/90 to-yellow-700/90",
  midnight: "from-indigo-700/95 to-slate-950/95",
  emerald: "from-emerald-400/90 to-green-800/90",
  silver: "from-slate-200/95 to-slate-500/90",
  aurora: "from-fuchsia-400/90 via-violet-500/90 to-amber-300/90",
  coral: "from-orange-400/90 to-rose-700/90",
  ice: "from-sky-200/95 to-cyan-600/90",
  starlight: "from-yellow-200/90 via-violet-400/90 to-indigo-800/90",
  cosmic: "from-indigo-950/95 via-fuchsia-600/90 to-cyan-400/90",
};

const WAND_DOT: Record<AvatarConfig["wand"], string> = {
  violet: "bg-violet-400",
  gold: "bg-amber-300",
  cyan: "bg-cyan-300",
  pink: "bg-pink-300",
  emerald: "bg-emerald-400",
  starlight: "bg-yellow-200",
  shadow: "bg-slate-600",
  rainbow: "bg-gradient-to-b from-pink-400 to-cyan-400",
  crystal: "bg-cyan-100",
  moon: "bg-indigo-200",
  comet: "bg-gradient-to-b from-amber-200 to-orange-500",
};

const HAT_EMOJI: Record<AvatarConfig["hat"], string> = {
  none: "",
  star: "⭐",
  wizard: "🎩",
  crown: "👑",
  beret: "🧢",
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

const ACC_BADGE: Record<AvatarConfig["accessory"], string> = {
  none: "",
  glasses: "👓",
  scarf: "🧣",
  amulet: "🔮",
  wings: "🪽",
  badge: "🏅",
  bow: "🎀",
  earrings: "🌙",
  halo: "💫",
  belt: "⚡",
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

export function AvatarPortrait({
  size = "md",
  className,
  avatar: avatarProp,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
  avatar?: Partial<AvatarConfig> | null;
}) {
  const storeAvatar = useGameStore((s) => s.avatar);
  const avatar = normalizeAvatar(avatarProp ?? storeAvatar);
  const xp = useGameStore((s) => s.xp);
  const level = levelFromXp(xp);
  const equippedTemp = useGameStore((s) => s.equippedTempBadge);
  const tempBadges = useGameStore((s) => s.tempBadges);

  const dim =
    size === "sm" ? "h-12 w-12" : size === "lg" ? "h-28 w-28" : "h-20 w-20";
  const face =
    size === "sm" ? "text-3xl" : size === "lg" ? "text-6xl" : "text-4xl";
  const hatSize =
    size === "sm" ? "text-base" : size === "lg" ? "text-3xl" : "text-xl";
  const chip =
    size === "sm" ? "h-4 w-4 text-[8px]" : size === "lg" ? "h-7 w-7 text-sm" : "h-5 w-5 text-[10px]";

  const glow =
    level >= 8
      ? "ring-2 ring-primary shadow-md shadow-primary/25"
      : level >= 4
        ? "ring-1 ring-accent/40"
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

  const faceEmoji = avatarFaceEmoji(avatar);

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        className,
      )}
    >
      {tempActive && (
        <span
          className={cn(
            "pointer-events-none absolute inset-0 z-0 scale-125 rounded-full",
            auraClass,
          )}
          aria-hidden
        />
      )}

      {/* Hat sits ABOVE the face circle — larger, never over eyes */}
      {avatar.hat !== "none" && (
        <span
          className={cn(
            "pointer-events-none absolute left-1/2 z-[5] -translate-x-1/2 drop-shadow-md",
            hatSize,
            size === "sm" ? "-top-2" : size === "lg" ? "-top-4" : "-top-3",
          )}
          aria-hidden
        >
          {HAT_EMOJI[avatar.hat]}
        </span>
      )}

      {/* Cape ring behind face */}
      <div
        className={cn(
          "relative z-[1] grid place-items-center rounded-full bg-gradient-to-b p-[11%]",
          CAPE_RING[avatar.cape] ?? CAPE_RING.violet,
          dim,
          glow,
          tempActive && "ring-2 ring-offset-1 ring-offset-bg",
          tempInfo?.hue === "mint" && "ring-emerald-300/80",
          tempInfo?.hue === "ember" && "ring-orange-300/80",
          tempInfo?.hue === "sky" && "ring-sky-300/80",
        )}
      >
        <div className="relative grid h-full w-full place-items-center rounded-full bg-card/25">
          {/* Face emoji — full face with hair baked in; always unobstructed */}
          <span
            className={cn("relative z-[3] leading-none select-none", face)}
            aria-hidden
          >
            {faceEmoji}
          </span>
          <span
            className={cn(
              "absolute bottom-[8%] right-[4%] z-[2] h-[28%] w-[10%] rounded-full shadow",
              WAND_DOT[avatar.wand] ?? WAND_DOT.violet,
            )}
            aria-hidden
          />
        </div>
      </div>

      {/* Accessory chip — outside face */}
      {avatar.accessory !== "none" && (
        <span
          className={cn(
            "absolute -left-0.5 top-1 z-[4] grid place-items-center rounded-full border border-border bg-card shadow",
            chip,
          )}
          aria-hidden
        >
          {ACC_BADGE[avatar.accessory]}
        </span>
      )}

      {/* Familiar */}
      <span
        className={cn(
          "absolute -bottom-0.5 -right-1 z-[4] drop-shadow",
          size === "sm" ? "text-sm" : size === "lg" ? "text-2xl" : "text-lg",
        )}
        aria-hidden
      >
        {FAMILIAR_EMOJI[avatar.familiar] ?? "🦉"}
      </span>

      {tempActive && tempInfo && (
        <span
          className={cn(
            "absolute -right-1 top-0 z-[5] rounded-full border border-dashed border-accent/70 bg-card px-0.5 shadow",
            size === "sm" ? "text-[10px]" : "text-sm",
          )}
          title={tempInfo.name}
        >
          {tempInfo.emoji}
        </span>
      )}
    </div>
  );
}

type Tab = "look" | "shop";

/** No "Pelo" — faces in Tono include hair */
const SECTIONS: {
  key: Exclude<keyof typeof AVATAR_OPTIONS, "hair">;
  label: string;
  short: string;
}[] = [
  { key: "look", label: "Look", short: "👤" },
  { key: "skin", label: "Tono", short: "😊" },
  { key: "hat", label: "Gorro", short: "👑" },
  { key: "cape", label: "Capa", short: "🧥" },
  { key: "wand", label: "Varita", short: "🪄" },
  { key: "familiar", label: "Amigo", short: "🦉" },
  { key: "accessory", label: "Extra", short: "✨" },
];

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
  const [section, setSection] =
    useState<(typeof SECTIONS)[number]["key"]>("skin");

  const unlockCtx = {
    level: prog.level,
    badges,
    ownedShop: ownedShopItems,
  };

  const faceLabel =
    AVATAR_OPTIONS.skin.find((s) => s.id === avatar.skin)?.label ??
    (avatar.look === "boy" ? "Chico" : "Chica");
  const lookLabel = avatar.look === "boy" ? "Chico" : "Chica";

  const optionsForSection = () => {
    if (section === "skin") {
      return facesForLook(avatar.look);
    }
    return AVATAR_OPTIONS[section];
  };

  function pickOption(sectionKey: (typeof SECTIONS)[number]["key"], id: string) {
    if (sectionKey === "look") {
      const look = id as "girl" | "boy";
      // Switch to a matching face so the emoji matches Chico/Chica
      const face = defaultFaceForLook(look);
      setAvatar({ look, skin: face, hair: "none" });
      setSection("skin");
      return;
    }
    if (sectionKey === "skin") {
      setAvatar({ skin: id as AvatarConfig["skin"], hair: "none" });
      return;
    }
    setAvatar({ [sectionKey]: id } as Partial<AvatarConfig>);
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col">
      {/* Sticky preview + tabs */}
      <div className="sticky top-[calc(var(--grok-banner-h,0px)+3.6rem)] z-20 -mx-1 border-b border-border/80 bg-bg/95 px-1 pb-2.5 pt-1 backdrop-blur-md supports-[backdrop-filter]:bg-bg/90">
        <div className="flex items-center gap-3 rounded-2xl border-2 border-primary/35 bg-card px-3 py-2.5 shadow-sm">
          <AvatarPortrait size="md" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-base font-semibold text-fg">
              {name}
            </p>
            <p className="truncate text-xs text-muted">
              {lookLabel} · {faceLabel}
            </p>
            <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
              <Star className="h-3 w-3" aria-hidden />
              {xp} XP · Nv. {prog.level}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setView("home")}
            className="shrink-0 rounded-xl border border-border bg-surface px-2.5 py-2 text-xs font-semibold text-muted"
          >
            Listo
          </button>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-1.5 rounded-xl border border-border bg-surface/60 p-1">
          <button
            type="button"
            onClick={() => setTab("look")}
            className={cn(
              "min-h-10 rounded-lg text-sm font-bold transition",
              tab === "look"
                ? "bg-primary text-primary-fg shadow-sm"
                : "text-muted",
            )}
          >
            Personalizar
          </button>
          <button
            type="button"
            onClick={() => setTab("shop")}
            className={cn(
              "inline-flex min-h-10 items-center justify-center gap-1 rounded-lg text-sm font-bold transition",
              tab === "shop"
                ? "bg-primary text-primary-fg shadow-sm"
                : "text-muted",
            )}
          >
            <ShoppingBag className="h-3.5 w-3.5" aria-hidden />
            Tienda
          </button>
        </div>
      </div>

      <div className="mt-3 space-y-3 pb-6">
        {tab === "look" && (
          <>
            {/* Category grid — stays inside screen, no off-screen scroll */}
            <div
              className="grid grid-cols-4 gap-1.5"
              role="tablist"
              aria-label="Categorías"
            >
              {SECTIONS.map(({ key, label, short }) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={section === key}
                  onClick={() => setSection(key)}
                  className={cn(
                    "flex min-h-[3.25rem] flex-col items-center justify-center gap-0.5 rounded-xl border-2 px-1 py-1.5 text-center transition active:scale-[0.98]",
                    section === key
                      ? "border-primary bg-primary/20 text-fg"
                      : "border-border bg-surface text-muted",
                  )}
                >
                  <span className="text-base leading-none" aria-hidden>
                    {short}
                  </span>
                  <span className="text-[10px] font-bold leading-tight">
                    {label}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-xs text-muted">
              {section === "skin"
                ? "Elige el rostro (piel + pelo incluidos). Cambia al instante arriba."
                : "Toca una opción: el retrato de arriba se actualiza al momento."}
            </p>

            <div className="grid grid-cols-3 gap-2">
              {optionsForSection().map((o) => {
                const { ok, reason } = isAvatarOptionUnlocked(o, unlockCtx);
                const active =
                  section === "skin"
                    ? avatar.skin === o.id
                    : avatar[section] === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    disabled={!ok}
                    onClick={() => pickOption(section, o.id)}
                    className={cn(
                      "flex min-h-[5rem] flex-col items-center justify-center rounded-xl border-2 px-1.5 py-2 text-center transition active:scale-[0.97]",
                      active &&
                        ok &&
                        "border-primary bg-primary/20 ring-2 ring-primary/25",
                      !active &&
                        ok &&
                        "border-border bg-surface hover:border-primary/40",
                      !ok &&
                        "cursor-not-allowed border-border/40 bg-surface/40 opacity-50",
                    )}
                  >
                    {section === "skin" || section === "look" ? (
                      <span className="text-3xl leading-none" aria-hidden>
                        {o.emoji}
                      </span>
                    ) : section === "cape" ? (
                      <span
                        className={cn(
                          "mx-auto block h-8 w-8 rounded-full bg-gradient-to-b",
                          CAPE_RING[o.id as AvatarConfig["cape"]] ??
                            CAPE_RING.violet,
                        )}
                        aria-hidden
                      />
                    ) : (
                      <span className="text-2xl leading-none" aria-hidden>
                        {o.emoji === "·" ? "○" : o.emoji}
                      </span>
                    )}
                    <span className="mt-1 line-clamp-2 text-[10px] font-bold leading-tight text-fg">
                      {o.label}
                    </span>
                    {!ok && (
                      <span className="mt-0.5 flex items-center gap-0.5 text-[9px] text-muted">
                        <Lock className="h-2.5 w-2.5" aria-hidden />
                        <span className="line-clamp-1">{reason}</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {tab === "shop" && (
          <div className="space-y-3">
            <div className="rounded-xl border border-accent/35 bg-accent/10 px-3 py-2.5">
              <p className="text-sm font-semibold text-fg">
                Tu saldo: {xp} XP
              </p>
              <p className="text-xs text-muted">
                Común 30–50 · Rara 80–120 · Épica 150–180 · Legendaria 200–250 ·
                Mítica 500
              </p>
            </div>

            <ul className="space-y-2.5">
              {XP_SHOP.map((item) => {
                const owned = ownedShopItems.includes(item.id);
                const canAfford = xp >= item.cost;
                const equipped =
                  owned && (avatar[item.slot] as string) === item.optionId;
                return (
                  <li
                    key={item.id}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border bg-card p-3",
                      owned ? "border-success/35" : "border-border",
                      item.rarity === "mítica" &&
                        !owned &&
                        "border-fuchsia-400/45",
                    )}
                  >
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-surface text-xl"
                      aria-hidden
                    >
                      {item.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <p className="text-sm font-bold text-fg">{item.name}</p>
                        <span
                          className={cn(
                            "rounded-full border px-1.5 py-0.5 text-[9px] font-bold uppercase",
                            RARITY_CLASS[item.rarity],
                          )}
                        >
                          {RARITY_LABEL[item.rarity]}
                        </span>
                      </div>
                      <p className="text-[11px] leading-snug text-muted">
                        {item.blurb}
                      </p>
                      <p
                        className={cn(
                          "mt-0.5 text-xs font-semibold",
                          owned
                            ? "text-success"
                            : canAfford
                              ? "text-primary"
                              : "text-muted",
                        )}
                      >
                        {owned
                          ? equipped
                            ? "✓ Equipado"
                            : "✓ Tuyo"
                          : `${item.cost} XP`}
                      </p>
                    </div>
                    {!owned && (
                      <button
                        type="button"
                        disabled={!canAfford}
                        onClick={() => setShopMsg(buyShopItem(item.id))}
                        className={cn(
                          "min-h-10 shrink-0 rounded-lg px-3 text-xs font-bold",
                          canAfford
                            ? "bg-primary text-primary-fg"
                            : "cursor-not-allowed bg-surface-2 text-muted",
                        )}
                      >
                        {canAfford ? "Comprar" : "—"}
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
                        className="min-h-10 shrink-0 rounded-lg border border-primary/40 bg-primary/15 px-3 text-xs font-bold text-fg"
                      >
                        Equipar
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>

            {shopMsg && (
              <p
                className="rounded-xl border border-success/40 bg-success/10 p-2.5 text-center text-sm font-medium text-fg"
                role="status"
              >
                <Sparkles className="mr-1 inline h-4 w-4 text-primary" />
                {shopMsg}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
