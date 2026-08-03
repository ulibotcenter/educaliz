import { Check, Lock, Swords } from "lucide-react";
import { useGameStore } from "@/lib/game-store";
import { BOSS_UNLOCK, bossUnlocked } from "@/lib/progression";
import { cn } from "@/lib/utils";

export function BossGate({
  zone,
  completed,
  title,
  blurb,
}: {
  zone: "math" | "language" | "english";
  completed: number;
  title: string;
  blurb: string;
}) {
  const startBoss = useGameStore((s) => s.startBoss);
  const beaten = useGameStore((s) => s.bossBeaten[zone]);
  const open = bossUnlocked(zone, completed);
  const need = BOSS_UNLOCK[zone];

  return (
    <button
      type="button"
      disabled={!open}
      onClick={() => open && startBoss(zone)}
      className={cn(
        "flex w-full items-start gap-3 rounded-xl border p-4 text-left transition",
        beaten
          ? "border-success/40 bg-success/10"
          : open
            ? "border-danger/40 bg-danger/10 hover:border-danger/60"
            : "cursor-not-allowed border-border bg-surface/50 opacity-70",
      )}
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-card">
        {beaten ? (
          <Check className="h-5 w-5 text-success" />
        ) : open ? (
          <Swords className="h-5 w-5 text-danger" />
        ) : (
          <Lock className="h-5 w-5 text-muted" />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display font-semibold text-fg">{title}</span>
        <span className="mt-0.5 block text-sm text-muted">{blurb}</span>
        <span className="mt-1 block text-xs text-muted">
          {beaten
            ? "¡Prueba superada! Puedes repetir por diversión."
            : open
              ? "5 preguntas finales · recompensa especial"
              : `Desbloquea con ${need} misiones oficiales (${completed}/${need})`}
        </span>
      </span>
    </button>
  );
}
