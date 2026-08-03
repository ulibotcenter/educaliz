import { useGameStore } from "@/lib/game-store";
import {
  AVATAR_OPTIONS,
  type AvatarConfig,
  levelFromXp,
  xpProgress,
} from "@/lib/progression";
import { cn } from "@/lib/utils";

const HAT_EMOJI: Record<AvatarConfig["hat"], string> = {
  none: "",
  star: "⭐",
  wizard: "🧙",
  crown: "👑",
};

const FAMILIAR_EMOJI: Record<AvatarConfig["familiar"], string> = {
  owl: "🦉",
  fox: "🦊",
  cat: "🐱",
  dragon: "🐉",
};

const CAPE_CLASS: Record<AvatarConfig["cape"], string> = {
  violet: "from-violet-600/80 to-purple-900/80",
  teal: "from-teal-500/80 to-cyan-900/80",
  rose: "from-rose-500/80 to-pink-900/80",
  gold: "from-amber-400/80 to-yellow-800/80",
};

const WAND_CLASS: Record<AvatarConfig["wand"], string> = {
  violet: "bg-violet-400 shadow-violet-400/50",
  gold: "bg-amber-300 shadow-amber-300/50",
  cyan: "bg-cyan-300 shadow-cyan-300/50",
  pink: "bg-pink-300 shadow-pink-300/50",
};

export function AvatarPortrait({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const avatar = useGameStore((s) => s.avatar);
  const xp = useGameStore((s) => s.xp);
  const level = levelFromXp(xp);
  const dim = size === "sm" ? "h-14 w-14" : size === "lg" ? "h-36 w-36" : "h-24 w-24";
  const face = size === "sm" ? "text-2xl" : size === "lg" ? "text-6xl" : "text-4xl";
  const glow = level >= 8 ? "ring-2 ring-primary shadow-lg shadow-primary/30" : level >= 4 ? "ring-1 ring-accent/50" : "";

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      <div
        className={cn(
          "relative grid place-items-center rounded-full bg-gradient-to-b",
          CAPE_CLASS[avatar.cape],
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
          👧
        </span>
        <span
          className={cn(
            "absolute -right-1 bottom-2 h-8 w-1.5 rounded-full shadow-md",
            WAND_CLASS[avatar.wand],
            size === "sm" && "h-5 w-1",
            size === "lg" && "h-12 w-2",
          )}
          aria-hidden
        />
      </div>
      <span
        className={cn(
          "absolute -bottom-1 -right-1 rounded-full bg-card px-1",
          size === "sm" ? "text-sm" : "text-xl",
        )}
        aria-hidden
      >
        {FAMILIAR_EMOJI[avatar.familiar]}
      </span>
    </div>
  );
}

export function AvatarCustomizer() {
  const avatar = useGameStore((s) => s.avatar);
  const setAvatar = useGameStore((s) => s.setAvatar);
  const xp = useGameStore((s) => s.xp);
  const name = useGameStore((s) => s.playerName);
  const setView = useGameStore((s) => s.setView);
  const prog = xpProgress(xp);

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="space-y-1">
        <h1 className="font-display text-2xl font-semibold text-fg">Tu avatar, {name}</h1>
        <p className="text-sm text-muted">
          Nivel {prog.level} · {prog.title}. ¡Personaliza tu look mágico!
        </p>
      </div>

      <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6">
        <AvatarPortrait size="lg" />
        <p className="text-sm text-muted">
          Al subir de nivel desbloqueas sombreros, capas y familiares nuevos.
        </p>
      </div>

      {(
        [
          ["hat", "Sombrero", AVATAR_OPTIONS.hat],
          ["cape", "Capa", AVATAR_OPTIONS.cape],
          ["wand", "Varita", AVATAR_OPTIONS.wand],
          ["familiar", "Familiar", AVATAR_OPTIONS.familiar],
        ] as const
      ).map(([key, label, opts]) => (
        <section key={key} className="space-y-2">
          <h2 className="text-sm font-semibold text-fg">{label}</h2>
          <div className="grid grid-cols-2 gap-2">
            {opts.map((o) => {
              const locked = prog.level < o.minLevel;
              const active = avatar[key] === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  disabled={locked}
                  onClick={() => setAvatar({ [key]: o.id } as Partial<AvatarConfig>)}
                  className={cn(
                    "min-h-12 rounded-xl border px-3 py-2 text-left text-sm transition",
                    active && "border-primary bg-primary/15",
                    !active && !locked && "border-border bg-surface hover:border-primary/40",
                    locked && "cursor-not-allowed border-border/50 bg-surface/40 opacity-50",
                  )}
                >
                  <span className="font-medium text-fg">{o.label}</span>
                  {locked && (
                    <span className="mt-0.5 block text-[11px] text-muted">
                      Nivel {o.minLevel}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      ))}

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
