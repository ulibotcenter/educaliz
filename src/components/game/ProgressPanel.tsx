import { Flame, Sparkles, Star } from "lucide-react";
import { useGameStore } from "@/lib/game-store";
import { SESSION_GOALS } from "@/lib/progress-goals";
import { xpProgress } from "@/lib/progression";
import { childFriendlyInsights } from "@/lib/skill-insights";
import { XpBar } from "@/components/game/XpBar";
import { PermanentBadgeCard } from "@/components/game/BadgeChips";
import { cn } from "@/lib/utils";

export function ProgressPanel({ compact }: { compact?: boolean }) {
  const mathCompleted = useGameStore((s) => s.mathCompleted);
  const languageCompleted = useGameStore((s) => s.languageCompleted);
  const englishCompleted = useGameStore((s) => s.englishCompleted);
  const areaSessionCount = useGameStore((s) => s.areaSessionCount);
  const books = useGameStore((s) => s.books);
  const streak = useGameStore((s) => s.streak);
  const maxStreak = useGameStore((s) => s.maxStreak);
  const xp = useGameStore((s) => s.xp);
  const badges = useGameStore((s) => s.badges);
  const recentBadgeIds = useGameStore((s) => s.recentBadgeIds);
  const skillStats = useGameStore((s) => s.skillStats);
  const points = useGameStore((s) => s.points);

  const prog = xpProgress(xp);
  const insights = childFriendlyInsights(skillStats);
  const readingDone = books.filter((b) => b.completed).length;

  const towers = [
    {
      label: "Matemáticas",
      emoji: "🔢",
      value: areaSessionCount.math || mathCompleted.length,
      max: SESSION_GOALS.math,
      color: "bg-primary",
    },
    {
      label: "Lengua",
      emoji: "📖",
      value: areaSessionCount.language || languageCompleted.length,
      max: SESSION_GOALS.language,
      color: "bg-accent",
    },
    {
      label: "Inglés",
      emoji: "🇬🇧",
      value: areaSessionCount.english || englishCompleted.length,
      max: SESSION_GOALS.english,
      color: "bg-accent-2",
    },
    {
      label: "Lectura",
      emoji: "📚",
      value: readingDone,
      max: SESSION_GOALS.reading,
      color: "bg-success",
    },
  ];

  const recent =
    recentBadgeIds.length > 0
      ? recentBadgeIds.slice(0, 4)
      : badges.slice(-4).reverse();

  return (
    <div className={cn("space-y-4", compact && "space-y-3")}>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm">
          <Flame className="h-4 w-4 text-danger" aria-hidden />
          <span className="font-semibold tabular-nums text-fg">{streak}</span>
          <span className="text-xs text-muted">racha</span>
          {maxStreak > 0 && (
            <span className="text-[10px] text-muted">(máx. {maxStreak})</span>
          )}
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm">
          <Star className="h-4 w-4 text-primary" aria-hidden />
          <span className="font-semibold tabular-nums text-fg">{points}</span>
          <span className="text-xs text-muted">pts</span>
        </div>
        <div className="min-w-[8rem] flex-1">
          <XpBar compact />
        </div>
      </div>

      <div className="space-y-2.5">
        {towers.map((t) => {
          const pct = Math.min(100, Math.round((t.value / t.max) * 100));
          return (
            <div key={t.label} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-fg">
                  {t.emoji} {t.label}
                </span>
                <span className="tabular-nums text-muted">
                  {t.value}/{t.max} partidas
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                <div
                  className={cn("h-full rounded-full transition-all", t.color)}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {!compact && insights.hasData && (
        <div className="rounded-xl border border-border bg-surface/40 p-3 text-sm text-muted">
          <p className="font-medium text-fg">
            <Sparkles className="mr-1 inline h-4 w-4 text-primary" />
            Brillos recientes
          </p>
          <p className="mt-1">{insights.strongLine}</p>
          <p className="mt-1">{insights.weakLine}</p>
        </div>
      )}

      {!compact && recent.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {recent.map((id) => (
            <PermanentBadgeCard key={id} id={id} compact />
          ))}
        </div>
      )}

      {compact && (
        <p className="text-xs text-muted">
          Nv.{prog.level} · {prog.title} · {badges.length} insignias
        </p>
      )}
    </div>
  );
}
