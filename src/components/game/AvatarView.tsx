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

const SKIN_FACE: Record<AvatarConfig["skin"], string> = {
  fair: "👧",
  warm: "👧🏻",
  deep: "👩🏽",
  rose: "👩🏻",
  peach: "👧🏻",
  olive: "👩🏽‍🦱",
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

const ACC_EMOJI: Record<AvatarConfig["accessory"], string> = {
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

const CAPE_CLASS: Record<AvatarConfig["cape"], string> = {
  violet: "from-violet-600/85 to-purple-900/85",
  teal: "from-teal-500/85 to-cyan-900/85",
  rose: "from-rose-500/85 to-pink-900/85",
  gold: "from-amber-400/85 to-yellow-800/85",
  midnight: "from-indigo-800/90 to-slate-950/90",
  emerald: "from-emerald-500/85 to-green-900/85",
  silver: "from-slate-300/90 to-slate-600/90",
  aurora: "from-fuchsia-400/80 via-violet-500/80 to-amber-300/80",
  coral: "from-orange-400/85 to-rose-700/85",
  ice: "from-sky-200/90 to-cyan-700/85",
  starlight: "from-yellow-200/90 via-violet-400/80 to-indigo-800/90",
};

const WAND_CLASS: Record<AvatarConfig["wand"], string> = {
  violet: "bg-violet-400 shadow-violet-400/50",
  gold: "bg-amber-300 shadow-amber-300/50",
  cyan: "bg-cyan-300 shadow-cyan-300/50",
  pink: "bg-pink-300 shadow-pink-300/50",
  emerald: "bg-emerald-400 shadow-emerald-400/50",
  starlight: "bg-yellow-200 shadow-yellow-200/60",
  shadow: "bg-slate-700 shadow-slate-700/50",
  rainbow: "bg-gradient-to-b from-pink-400 via-violet-400 to-cyan-400 shadow-violet-400/50",
  crystal: "bg-cyan-100 shadow-cyan-200/60",
  moon: "bg-indigo-200 shadow-indigo-200/50",
  comet: "bg-gradient-to-b from-amber-200 via-orange-400 to-violet-600 shadow-orange-400/50",
};

const RARITY_LABEL: Record<string, string> = {
  rara: "Rara",
  épica: "Épica",
  legendaria: "Legendaria",
};

const RARITY_CLASS: Record<string, string> = {
  rara: "border-accent/40 bg-accent/10 text-accent",
  épica: "border-primary/50 bg-primary/15 text-primary",
  legendaria: "border-amber-300/50 bg-amber-300/15 text-amber-200",
};

export function AvatarPortrait({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const raw = useGameStore((s) => s.avatar);
  const avatar = normalizeAvatar(raw);
  const xp = useGameStore((s) => s.xp);
  const level = levelFromXp(xp);
  const equippedTemp = useGameStore((s) => s.equippedTempBadge);
  const tempBadges = useGameStore((s) => s.tempBadges);
  const dim = size === "sm" ? "h-14 w-14" : size === "lg" ? "h-40 w-40" : "h-24 w-24";
  const face = size === "sm" ? "text-2xl" : size === "lg" ? "text-7xl" : "text-4xl";
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
      {(avatar.accessory === "wings" || avatar.accessory === "halo") && (
        <span
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 opacity-90",
            size === "sm" ? "text-2xl" : size === "lg" ? "text-6xl" : "text-4xl",
          )}
          aria-hidden
        >
          {avatar.accessory === "halo" ? "💫" : "🪽"}
        </span>
      )}
      <div
        className={cn(
          "relative z-[1] grid place-items-center rounded-full bg-gradient-to-b",
          CAPE_CLASS[avatar.cape] ?? CAPE_CLASS.violet,
          dim,
          glow,
          tempActive && "ring-2 ring-offset-2 ring-offset-bg",
          tempInfo?.hue === "mint" && "ring-emerald-300/80",
          tempInfo?.hue === "ember" && "ring-orange-300/80",
          tempInfo?.hue === "sky" && "ring-sky-300/80",
        )}
      >
        {avatar.hat !== "none" && (
          <span
            className={cn(
              "absolute -top-1 left-1/2 -translate-x-1/2",
              size === "sm" ? "text-sm" : size === "lg" ? "text-2xl" : "text-xl",
            )}
            aria-hidden
          >
            {HAT_EMOJI[avatar.hat]}
          </span>
        )}
        <span className={face} aria-hidden>
          {SKIN_FACE[avatar.skin] ?? "👧"}
        </span>
        {avatar.accessory !== "none" &&
          avatar.accessory !== "wings" &&
          avatar.accessory !== "halo" && (
            <span
              className={cn(
                "absolute -left-0.5 bottom-1",
                size === "sm" ? "text-[10px]" : "text-sm",
              )}
              aria-hidden
            >
              {ACC_EMOJI[avatar.accessory]}
            </span>
          )}
        <span
          className={cn(
            "absolute -right-1 bottom-2 h-8 w-1.5 rounded-full shadow-md",
            WAND_CLASS[avatar.wand] ?? WAND_CLASS.violet,
            size === "sm" && "h-5 w-1",
            size === "lg" && "h-12 w-2",
          )}
          aria-hidden
        />
      </div>
      <span
        className={cn(
          "absolute -bottom-1 -right-1 z-[2] rounded-full bg-card px-1 shadow-md",
          size === "sm" ? "text-sm" : size === "lg" ? "text-2xl" : "text-xl",
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
  { key: "skin", label: "Tono", emoji: "🎨" },
  { key: "hat", label: "Sombrero", emoji: "👑" },
  { key: "cape", label: "Capa", emoji: "🧥" },
  { key: "wand", label: "Varita", emoji: "🪄" },
  { key: "familiar", label: "Familiar", emoji: "🦉" },
  { key: "accessory", label: "Accesorio", emoji: "✨" },
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
  const [section, setSection] = useState<keyof typeof AVATAR_OPTIONS>("hat");

  const unlockCtx = {
    level: prog.level,
    badges,
    ownedShop: ownedShopItems,
  };

  const unlockedCount = SECTIONS.reduce((acc, { key }) => {
    return (
      acc +
      AVATAR_OPTIONS[key].filter((o) => isAvatarOptionUnlocked(o, unlockCtx).ok).length
    );
  }, 0);
  const totalCount = SECTIONS.reduce((acc, { key }) => acc + AVATAR_OPTIONS[key].length, 0);

  return (
    <div className="mx-auto max-w-lg space-y-6 px-0.5 sm:space-y-7">
      <div className="space-y-1.5">
        <h1 className="font-display text-2xl font-semibold text-fg sm:text-3xl">
          Tu avatar, {name}
        </h1>
        <p className="text-sm leading-snug text-muted sm:text-base">
          Nivel {prog.level} · {prog.title}. ¡Prueba combinaciones mágicas!
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 card-glow">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 50% 20%, color-mix(in oklab, var(--color-accent) 35%, transparent), transparent 55%)",
          }}
        />
        <div className="relative flex flex-col items-center gap-4">
          <AvatarPortrait size="lg" />
          <p className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-sm font-semibold text-fg">
            <Star className="h-3.5 w-3.5 text-primary" aria-hidden />
            {xp} XP · {unlockedCount}/{totalCount} looks
          </p>
          <p className="text-center text-sm text-muted">
            Toca una opción y el retrato se actualiza al instante.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 rounded-2xl border border-border bg-surface/50 p-1.5">
        <button
          type="button"
          onClick={() => setTab("look")}
          className={cn(
            "min-h-12 rounded-xl text-sm font-bold transition sm:text-base",
            tab === "look" ? "bg-primary text-primary-fg shadow-sm" : "text-muted hover:text-fg",
          )}
        >
          Personalizar
        </button>
        <button
          type="button"
          onClick={() => setTab("shop")}
          className={cn(
            "inline-flex min-h-12 items-center justify-center gap-1.5 rounded-xl text-sm font-bold transition sm:text-base",
            tab === "shop" ? "bg-primary text-primary-fg shadow-sm" : "text-muted hover:text-fg",
          )}
        >
          <ShoppingBag className="h-4 w-4" aria-hidden />
          Tienda de XP
        </button>
      </div>

      {tab === "look" && (
        <div className="space-y-5">
          <p className="text-sm leading-snug text-muted sm:text-base">
            Lo básico está libre. Sube de nivel, gana insignias o visita la tienda para looks
            especiales.
          </p>

          {/* Category tabs — wrap, large touch targets, no cramped scroll chips */}
          <div
            className="grid grid-cols-3 gap-2 sm:grid-cols-3 sm:gap-2.5"
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
                  "flex min-h-[3.5rem] flex-col items-center justify-center gap-0.5 rounded-2xl border-2 px-1.5 py-2 text-center transition active:scale-[0.98] sm:min-h-[3.75rem] sm:flex-row sm:gap-1.5 sm:px-2",
                  section === key
                    ? "border-primary bg-primary/20 text-fg shadow-sm"
                    : "border-border bg-surface text-muted hover:border-primary/35 hover:text-fg",
                )}
              >
                <span className="text-lg leading-none sm:text-xl" aria-hidden>
                  {emoji}
                </span>
                <span className="text-[11px] font-bold leading-tight sm:text-xs">
                  {label}
                </span>
              </button>
            ))}
          </div>

          <section className="space-y-3">
            <h2 className="font-display text-base font-semibold text-fg sm:text-lg">
              {SECTIONS.find((s) => s.key === section)?.emoji}{" "}
              {SECTIONS.find((s) => s.key === section)?.label}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-3.5">
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
                      "flex min-h-[5.25rem] flex-col items-center justify-center rounded-2xl border-2 px-2.5 py-3.5 text-center transition active:scale-[0.98] sm:min-h-[5.5rem]",
                      active && ok && "border-primary bg-primary/20 ring-2 ring-primary/30",
                      !active && ok && "border-border bg-surface hover:border-primary/40",
                      !ok && "cursor-not-allowed border-border/50 bg-surface/40 opacity-55",
                    )}
                  >
                    <span className="block text-3xl leading-none" aria-hidden>
                      {o.emoji === "·" ? "○" : o.emoji}
                    </span>
                    <span className="mt-2 block text-xs font-bold leading-snug text-fg sm:text-sm">
                      {o.label}
                    </span>
                    {"tag" in o && o.tag === "tienda" && ok && (
                      <span className="mt-1.5 inline-block rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
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
        <div className="space-y-5">
          <section className="rounded-2xl border-2 border-accent/40 bg-gradient-to-br from-accent/15 via-card to-primary/10 p-5">
            <div className="flex items-start gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/20 text-accent">
                <ShoppingBag className="h-5 w-5" aria-hidden />
              </span>
              <div className="min-w-0 space-y-1">
                <h2 className="font-display text-lg font-semibold text-fg">
                  Tienda mágica de XP
                </h2>
                <p className="text-sm leading-snug text-muted">
                  Opcional: gasta XP en aderezos exclusivos. Se equipan al comprar.
                </p>
                <p className="text-sm font-semibold text-fg">Tu saldo: {xp} XP</p>
              </div>
            </div>
          </section>

          <ul className="space-y-3.5">
            {XP_SHOP.map((item) => {
              const owned = ownedShopItems.includes(item.id);
              const canAfford = xp >= item.cost;
              const equipped =
                owned &&
                (avatar[item.slot] as string) === item.optionId;
              return (
                <li
                  key={item.id}
                  className={cn(
                    "flex flex-col gap-3 rounded-2xl border bg-card p-4 sm:flex-row sm:items-center sm:gap-4",
                    owned ? "border-success/35" : "border-border",
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
                      <p className="font-display text-base font-semibold text-fg">{item.name}</p>
                      <span
                        className={cn(
                          "rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                          RARITY_CLASS[item.rarity],
                        )}
                      >
                        {RARITY_LABEL[item.rarity]}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm leading-snug text-muted">{item.blurb}</p>
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
