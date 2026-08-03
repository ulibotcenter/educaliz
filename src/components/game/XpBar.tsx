import { useGameStore } from "@/lib/game-store";
import { xpProgress } from "@/lib/progression";
import { cn } from "@/lib/utils";

export function XpBar({ compact }: { compact?: boolean }) {
  const xp = useGameStore((s) => s.xp);
  const prog = xpProgress(xp);

  if (compact) {
    return (
      <div className="flex min-w-[5.5rem] flex-col gap-0.5">
        <div className="flex items-center justify-between gap-1 text-[10px] text-muted">
          <span className="font-semibold text-primary">Nv.{prog.level}</span>
          <span className="tabular-nums">
            {prog.nextAt === null ? "MAX" : `${prog.intoLevel}/${prog.needed}`}
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${prog.pct}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1.5 rounded-xl border border-border bg-card p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="font-display text-sm font-semibold text-fg">
          Nivel {prog.level} · {prog.title}
        </p>
        <p className="text-xs tabular-nums text-muted">
          {prog.nextAt === null ? "Nivel máximo" : `${prog.intoLevel} / ${prog.needed} XP`}
        </p>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-surface-2">
        <div
          className={cn("h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500")}
          style={{ width: `${prog.pct}%` }}
        />
      </div>
      <p className="text-[11px] text-muted">{prog.current} XP total</p>
    </div>
  );
}
