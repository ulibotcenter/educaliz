import { LEVEL_META, countInLevel, type DiffLevel } from "@/lib/data/question-banks";
import { cn } from "@/lib/utils";

const LEVELS: DiffLevel[] = [1, 2, 3, 4, 5];

export function LevelPicker({
  area,
  onPick,
  runsByLevel,
}: {
  area: "math" | "language" | "english";
  onPick: (level: DiffLevel) => void;
  runsByLevel?: Partial<Record<DiffLevel, number>>;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {LEVELS.map((lv) => {
        const meta = LEVEL_META[lv];
        const n = countInLevel(area, lv);
        const runs = runsByLevel?.[lv] ?? 0;
        return (
          <button
            key={lv}
            type="button"
            onClick={() => onPick(lv)}
            className={cn(
              "flex min-h-[5.5rem] flex-col items-start gap-1 rounded-2xl border border-border bg-card p-4 text-left transition",
              "hover:border-primary/50 hover:bg-surface active:scale-[0.99]",
            )}
          >
            <span className="text-2xl" aria-hidden>
              {meta.emoji}
            </span>
            <span className="font-display text-lg font-semibold text-fg">
              {meta.name}
            </span>
            <span className="text-sm text-muted">{meta.blurb}</span>
            <span className="mt-1 text-xs text-muted">
              {n} preguntas en el baúl · {runs} partidas hechas
            </span>
          </button>
        );
      })}
    </div>
  );
}
