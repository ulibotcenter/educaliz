import { Wand2 } from "lucide-react";
import { useGameStore } from "@/lib/game-store";
import { ModeToggle } from "@/components/game/ModeToggle";
import { BossGate } from "@/components/game/BossGate";
import { LevelPicker } from "@/components/game/LevelPicker";
import type { DiffLevel } from "@/lib/data/question-banks";

export function MathMap() {
  const startLevel = useGameStore((s) => s.startLevel);
  const mathCompleted = useGameStore((s) => s.mathCompleted);
  const levelRuns = useGameStore((s) => s.levelRuns.math);
  const areaSessionCount = useGameStore((s) => s.areaSessionCount.math);

  return (
    <div className="animate-fade-in space-y-5">
      <div className="space-y-2">
        <p className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          <Wand2 className="h-4 w-4" aria-hidden />
          Torre de Números
        </p>
        <h1 className="font-display text-2xl font-semibold text-fg">Elige tu nivel</h1>
        <p className="text-base text-muted">
          Cada partida sortea 5 preguntas nuevas de ese nivel. ¡Siempre es distinto!
        </p>
        <p className="text-sm font-medium text-fg">
          Partidas hechas: {areaSessionCount}
          {mathCompleted.length > 0 && (
            <span className="text-muted"> · progreso del guardián: {mathCompleted.length}</span>
          )}
        </p>
      </div>

      <ModeToggle />

      <BossGate
        zone="math"
        completed={mathCompleted.length}
        title="Batalla final: Guardián de los Números"
        blurb="Cinco hechizos difíciles al final de la Torre."
      />

      <LevelPicker
        area="math"
        runsByLevel={levelRuns}
        onPick={(level: DiffLevel) => startLevel("math", level)}
      />
    </div>
  );
}
