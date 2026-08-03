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
import { cn } from "@/lib/utils";

const SKIN_FACE: Record<AvatarConfig["skin"], string> = {
  fair: "👧",
  warm: "👧🏻",
  deep: "👩🏽",
  rose: "👩🏻",
};

const HAT_EMOJI: Record<AvatarConfig["hat"], string> = {
  none: "",
  star: "⭐",
  wizard: "🧙",
  crown: "👑",
  beret: "🎩",
  flower: "🌸",
  crystal: "💎",
  phoenix: "🔥",
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
};

const ACC_EMOJI: Record<AvatarConfig["accessory"], string> = {
  none: "",
  glasses: "👓",
  scarf: "🧣",
  amulet: "🔮",
  wings: "🪽",
  badge: "🏅",
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
  const dim = size === "sm" ? "h-14 w-14" : size === "lg" ? "h-36 w-36" : "h-24 w-24";
  const face = size === "sm" ? "text-2xl" : size === "lg" ? "text-6xl" : "text-4xl";
  const glow =
    level >= 8
      ? "ring-2 ring-primary shadow-lg shadow-primary/30"
      : level >= 4
        ? "ring-1 ring-accent/50"
        : "";

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      {avatar.accessory === "wings" && (
        <span
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 opacity-90",
            size === "sm" ? "text-2xl" : size === "lg" ? "text-6xl" : "text-4xl",
          )}
          aria-hidden
        >
          🪽
        </span>
      )}
      <div
        className={cn(
          "relative z-[1] grid place-items-center rounded-full bg-gradient-to-b",
          CAPE_CLASS[avatar.cape] ?? CAPE_CLASS.violet,
          dim,
          glow,
        )}
      >
        {avatar.hat !== "none" && (
          <span
            className={cn(
              "absolute -top-1 left-1/2 -translate-x-1/2",
              size === "sm" ? "text-sm" : "text-xl",
            )}
            aria-hidden
          >
            {HAT_EMOJI[avatar.hat]}
          </span>
        )}
        <span className={face} aria-hidden>
          {SKIN_FACE[avatar.skin] ?? "👧"}
        </span>
        {avatar.accessory !== "none" && avatar.accessory !== "wings" && (
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
          "absolute -bottom-1 -right-1 z-[2] rounded-full bg-card px-1",
          size === "sm" ? "text-sm" : "text-xl",
        )}
        aria-hidden
      >
        {FAMILIAR_EMOJI[avatar.familiar] ?? "🦉"}
      </span>
    </div>
  );
}

type Tab = "look" | "shop";

const SECTIONS: {
  key: keyof typeof AVATAR_OPTIONS;
  label: string;
}[] = [
  { key: "skin", label: "Tono" },
  { key: "hat", label: "Sombrero" },
  { key: "cape", label: "Capa" },
  { key: "wand", label: "Varita" },
  { key: "familiar", label: "Familiar" },
  { key: "accessory", label: "Accesorio" },
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

  const unlockCtx = {
    level: prog.level,
    badges,
    ownedShop: ownedShopItems,
  };

  return (
    <div className="mx-auto max-w-lg space-y-5">
      <div className="space-y-1">
        <h1 className="font-display text-2xl font-semibold text-fg">Tu avatar, {name}</h1>
        <p className="text-sm text-muted">
          Nivel {prog.level} · {prog.title}. Personaliza tu look o visita la Tienda de XP.
        </p>
      </div>

      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 card-glow">
        <AvatarPortrait size="lg" />
        <p className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-fg">
          <Star className="h-3.5 w-3.5 text-primary" aria-hidden />
          {xp} XP disponibles
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 rounded-xl border border-border bg-surface/50 p-1">
        <button
          type="button"
          onClick={() => setTab("look")}
          className={cn(
            "min-h-11 rounded-lg text-sm font-semibold transition",
            tab === "look" ? "bg-primary text-primary-fg" : "text-muted hover:text-fg",
          )}
        >
          Personalizar
        </button>
        <button
          type="button"
          onClick={() => setTab("shop")}
          className={cn(
            "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg text-sm font-semibold transition",
            tab === "shop" ? "bg-primary text-primary-fg" : "text-muted hover:text-fg",
          )}
        >
          <ShoppingBag className="h-4 w-4" aria-hidden />
          Tienda de XP
        </button>
      </div>

      {tab === "look" && (
        <div className="space-y-5">
          <p className="text-sm text-muted">
            Lo básico está libre. Sube de nivel, gana insignias o compra en la tienda para looks
            especiales.
          </p>
          {SECTIONS.map(({ key, label }) => (
            <section key={key} className="space-y-2">
              <h2 className="text-sm font-semibold text-fg">{label}</h2>
              <div className="grid grid-cols-2 gap-2">
                {AVATAR_OPTIONS[key].map((o) => {
                  const { ok, reason } = isAvatarOptionUnlocked(o, unlockCtx);
                  const active = avatar[key] === o.id;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      disabled={!ok}
                      onClick={() =>
                        setAvatar({ [key]: o.id } as Partial<AvatarConfig>)
                      }
                      className={cn(
                        "min-h-12 rounded-xl border px-3 py-2 text-left text-sm transition",
                        active && ok && "border-primary bg-primary/15",
                        !active && ok && "border-border bg-surface hover:border-primary/40",
                        !ok && "cursor-not-allowed border-border/50 bg-surface/40 opacity-55",
                      )}
                    >
                      <span className="flex items-center gap-1.5 font-medium text-fg">
                        <span aria-hidden>{o.emoji}</span>
                        {o.label}
                      </span>
                      {!ok && (
                        <span className="mt-0.5 flex items-center gap-1 text-[11px] text-muted">
                          <Lock className="h-3 w-3" aria-hidden />
                          {reason}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}

      {tab === "shop" && (
        <div className="space-y-4">
          <section className="rounded-2xl border-2 border-accent/40 bg-gradient-to-br from-accent/15 via-card to-primary/10 p-4">
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/20 text-accent">
                <ShoppingBag className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h2 className="font-display text-lg font-semibold text-fg">
                  Tienda mágica de XP
                </h2>
                <p className="text-sm text-muted">
                  Opcional: gasta XP en aderezos exclusivos. No es obligatorio para progresar.
                </p>
                <p className="mt-1 text-sm font-semibold text-fg">Tu saldo: {xp} XP</p>
              </div>
            </div>
          </section>

          <ul className="space-y-3">
            {XP_SHOP.map((item) => {
              const owned = ownedShopItems.includes(item.id);
              const canAfford = xp >= item.cost;
              return (
                <li
                  key={item.id}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center"
                >
                  <span
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-surface text-2xl"
                    aria-hidden
                  >
                    {item.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-base font-semibold text-fg">{item.name}</p>
                    <p className="text-sm text-muted">{item.blurb}</p>
                    <p
                      className={cn(
                        "mt-1 text-sm font-semibold",
                        owned
                          ? "text-success"
                          : canAfford
                            ? "text-primary"
                            : "text-muted",
                      )}
                    >
                      {owned ? "✓ Ya lo tienes" : `${item.cost} XP`}
                      {!owned && !canAfford && (
                        <span className="ml-1 font-normal text-muted">
                          · te faltan {item.cost - xp}
                        </span>
                      )}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={owned || !canAfford}
                    onClick={() => {
                      const msg = buyShopItem(item.id);
                      setShopMsg(msg);
                    }}
                    className={cn(
                      "min-h-12 shrink-0 rounded-xl px-4 text-sm font-bold sm:min-w-[7.5rem]",
                      owned
                        ? "border border-success/40 bg-success/15 text-success"
                        : canAfford
                          ? "bg-primary text-primary-fg"
                          : "cursor-not-allowed bg-surface-2 text-muted opacity-70",
                    )}
                  >
                    {owned ? "Tuyo" : canAfford ? "Comprar" : "Sin XP"}
                  </button>
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
        className="min-h-11 w-full rounded-lg border border-border bg-surface text-sm text-fg"
      >
        Volver a la Sala de Trofeos
      </button>
    </div>
  );
}
