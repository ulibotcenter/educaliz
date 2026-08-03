import { Dumbbell, Scroll } from "lucide-react";
import { useGameStore, type PlayMode } from "@/lib/game-store";
import { cn } from "@/lib/utils";

export function ModeToggle({ className }: { className?: string }) {
  const mode = useGameStore((s) => s.playMode);
  const setPlayMode = useGameStore((s) => s.setPlayMode);

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-xs font-medium text-muted">Elige tu modo mágico</p>
      <div className="grid grid-cols-2 gap-2">
        <ModeCard
          active={mode === "practice"}
          onClick={() => setPlayMode("practice")}
          icon={Dumbbell}
          title="Modo Entrenamiento"
          desc="Practica sin presión. No sube el progreso oficial ni da puntos."
        />
        <ModeCard
          active={mode === "official"}
          onClick={() => setPlayMode("official")}
          icon={Scroll}
          title="Misión oficial"
          desc="Cuenta para el progreso, da puntos y avanza la barra."
        />
      </div>
    </div>
  );
}

function ModeCard({
  active,
  onClick,
  icon: Icon,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Dumbbell;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-h-[5.5rem] flex-col items-start gap-1 rounded-xl border p-3 text-left transition",
        active
          ? "border-primary bg-primary/15 ring-2 ring-primary/40"
          : "border-border bg-card hover:border-primary/30",
      )}
    >
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg">
        <Icon className="h-4 w-4 text-primary" aria-hidden />
        {title}
      </span>
      <span className="text-[11px] leading-snug text-muted">{desc}</span>
    </button>
  );
}

export function ModeBadge({ mode }: { mode: PlayMode }) {
  const official = mode === "official";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold",
        official ? "bg-primary/20 text-primary" : "bg-accent-2/20 text-accent-2",
      )}
    >
      {official ? (
        <>
          <Scroll className="h-3 w-3" aria-hidden /> Misión oficial
        </>
      ) : (
        <>
          <Dumbbell className="h-3 w-3" aria-hidden /> Entrenamiento
        </>
      )}
    </span>
  );
}
