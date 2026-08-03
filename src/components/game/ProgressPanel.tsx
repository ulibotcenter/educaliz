import { Flame, Sparkles, Star } from "lucide-react";
import { useGameStore, BADGE_INFO } from "@/lib/game-store";
import { xpProgress } from "@/lib/progression";
import { childFriendlyInsights } from "@/lib/skill-insights";
import { XpBar } from "@/components/game/XpBar";
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
      max: 30,
      color: "bg-primary",
    },
    {
      label: "Lengua",
      emoji: "📖",
      value: areaSessionCount.language || languageCompleted.length,
      max: 15,
      color: "bg-accent",
    },
    {
      label: "Inglés",
      emoji: "🇬🇧",
      value: areaSessionCount.english || englishCompleted.length,
      max: 12,
      color: "bg-accent-2",
    },
    {
      label: "Lectura",
      emoji: "📚",
      value: readingDone,
      max: 2,
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
        <div className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm">
          <Sparkles className="h-4 w-4 text-accent" aria-hidden />
          <span className="font-semibold tabular-nums text-fg">{badges.length}</span>
          <span className="text-xs text-muted">insignias</span>
        </div>
      </div>

      <XpBar />

      <div className="grid gap-2 sm:grid-cols-2">
        {towers.map((t) => {
          const pct = Math.min(100, Math.round((t.value / t.max) * 100));
          return (
            <div key={t.label} className="rounded-xl border border-border bg-surface/40 p-3">
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-fg">
                  {t.emoji} {t.label}
                </span>
                <span className="tabular-nums text-xs text-muted">
                  {t.value}
                  {t.label === "Lectura" ? `/${t.max}` : " partidas"}
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

      {!compact && (
        <ul className="space-y-1 text-sm text-muted">
          <li>· {insights.strongLine}</li>
          <li>· {insights.weakLine}</li>
        </ul>
      )}

      {!compact && recent.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-medium text-muted">Insignias recientes</p>
          <div className="flex flex-wrap gap-2">
            {recent.map((id) => (
              <span
                key={id}
                className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-fg"
              >
                {BADGE_INFO[id]?.emoji ?? "🏅"} {BADGE_INFO[id]?.name ?? id}
              </span>
            ))}
          </div>
        </div>
      )}

      {compact && (
        <p className="text-xs text-muted">
          Nv. {prog.level} · {prog.title}
        </p>
      )}
    </div>
  );
}
