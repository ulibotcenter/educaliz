import { Languages } from "lucide-react";
import { useGameStore } from "@/lib/game-store";
import { ModeToggle } from "@/components/game/ModeToggle";
import { BossGate } from "@/components/game/BossGate";
import { LevelPicker } from "@/components/game/LevelPicker";
import type { DiffLevel } from "@/lib/data/question-banks";

export function EnglishMap() {
  const startLevel = useGameStore((s) => s.startLevel);
  const englishCompleted = useGameStore((s) => s.englishCompleted);
  const levelRuns = useGameStore((s) => s.levelRuns.english);
  const areaSessionCount = useGameStore((s) => s.areaSessionCount.english);

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-2">
          <Languages className="h-4 w-4" aria-hidden />
          Cámara del Inglés
        </p>
        <h1 className="font-display text-2xl font-semibold text-fg">Choose your level</h1>
        <p className="text-sm text-muted">
          Vocabulary + simple sentences — 5 random spells each run.
        </p>
        <p className="text-sm font-medium text-fg">Partidas oficiales: {areaSessionCount}</p>
      </div>

      <ModeToggle />

      <BossGate
        zone="english"
        completed={englishCompleted.length}
        title="Final Trial: English Sphinx"
        blurb="Five English riddles from the Sphinx."
      />

      <LevelPicker
        area="english"
        runsByLevel={levelRuns}
        onPick={(level: DiffLevel) => startLevel("english", level)}
      />
    </div>
  );
}
