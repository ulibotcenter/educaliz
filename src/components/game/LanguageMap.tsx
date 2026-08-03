import { BookOpen } from "lucide-react";
import { useGameStore } from "@/lib/game-store";
import { ModeToggle } from "@/components/game/ModeToggle";
import { BossGate } from "@/components/game/BossGate";
import { LevelPicker } from "@/components/game/LevelPicker";
import type { DiffLevel } from "@/lib/data/question-banks";

export function LanguageMap() {
  const startLevel = useGameStore((s) => s.startLevel);
  const languageCompleted = useGameStore((s) => s.languageCompleted);
  const levelRuns = useGameStore((s) => s.levelRuns.language);
  const areaSessionCount = useGameStore((s) => s.areaSessionCount.language);

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          <BookOpen className="h-4 w-4" aria-hidden />
          Biblioteca Misteriosa
        </p>
        <h1 className="font-display text-2xl font-semibold text-fg">Elige tu nivel</h1>
        <p className="text-sm text-muted">
          Sujeto, predicado, verbos, tipos de oración y ortografía — 5 retos al azar por partida.
        </p>
        <p className="text-sm font-medium text-fg">Partidas oficiales: {areaSessionCount}</p>
      </div>

      <ModeToggle />

      <BossGate
        zone="language"
        completed={languageCompleted.length}
        title="Batalla final: Bibliotecaria de las Sombras"
        blurb="Cinco retos finales de la biblioteca."
      />

      <LevelPicker
        area="language"
        runsByLevel={levelRuns}
        onPick={(level: DiffLevel) => startLevel("language", level)}
      />
    </div>
  );
}
