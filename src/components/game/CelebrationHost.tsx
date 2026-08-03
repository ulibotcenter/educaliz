import { useEffect, useRef, useState } from "react";
import { Sparkles, X } from "lucide-react";
import { useGameStore } from "@/lib/game-store";
import { ALL_BADGES, LEVEL_TITLES, levelFromXp } from "@/lib/progression";
import { playMissionGreat } from "@/lib/sounds";
import { cn } from "@/lib/utils";

/**
 * Soft UI celebrations (level-up, new badge) — does not change game logic.
 */
export function CelebrationHost() {
  const xp = useGameStore((s) => s.xp);
  const recentBadgeIds = useGameStore((s) => s.recentBadgeIds);
  const level = levelFromXp(xp);

  const [toast, setToast] = useState<{
    title: string;
    body: string;
    kind: "level" | "badge";
  } | null>(null);

  const ready = useRef(false);
  const prevLevel = useRef(level);
  const seenBadges = useRef<Set<string>>(new Set(recentBadgeIds));

  useEffect(() => {
    if (!ready.current) {
      ready.current = true;
      prevLevel.current = level;
      seenBadges.current = new Set(recentBadgeIds);
      return;
    }
    if (level > prevLevel.current) {
      const title = LEVEL_TITLES[level] ?? `Nivel ${level}`;
      setToast({
        kind: "level",
        title: `¡Nivel ${level}!`,
        body: `Eres ${title}. ¡La Academia brilla contigo!`,
      });
      playMissionGreat();
    }
    prevLevel.current = level;
  }, [level, recentBadgeIds]);

  useEffect(() => {
    if (!ready.current) return;
    for (const id of recentBadgeIds) {
      if (!seenBadges.current.has(id)) {
        seenBadges.current.add(id);
        const info = ALL_BADGES[id];
        setToast({
          kind: "badge",
          title: `${info?.emoji ?? "🏅"} ¡Nueva insignia!`,
          body: info?.name ?? "Logro mágico desbloqueado",
        });
        playMissionGreat();
        break;
      }
    }
  }, [recentBadgeIds]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 5200);
    return () => window.clearTimeout(t);
  }, [toast]);

  if (!toast) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-[calc(var(--grok-banner-h,0px)+4.5rem)] z-40 flex justify-center px-3"
      role="status"
      aria-live="polite"
    >
      <div
        className={cn(
          "pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border-2 p-4 shadow-xl animate-fade-in",
          toast.kind === "level"
            ? "border-primary/60 bg-gradient-to-br from-primary/25 via-card to-accent/20"
            : "border-accent/50 bg-gradient-to-br from-accent/20 via-card to-primary/15",
        )}
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/20 text-primary">
          <Sparkles className="h-6 w-6" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-semibold text-fg">{toast.title}</p>
          <p className="text-sm leading-snug text-muted">{toast.body}</p>
        </div>
        <button
          type="button"
          onClick={() => setToast(null)}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted hover:bg-surface"
          aria-label="Cerrar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
