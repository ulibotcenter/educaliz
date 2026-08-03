import { useEffect, useState } from "react";
import { Timer } from "lucide-react";
import {
  TOURNAMENT_LABEL,
  getCountdown,
  type CountdownParts,
} from "@/lib/profiles/tournament";
import { useGameStore } from "@/lib/game-store";

/** Compact countdown for home / ranking teaser */
export function TournamentBanner({ compact }: { compact?: boolean }) {
  const setView = useGameStore((s) => s.setView);
  const [parts, setParts] = useState<CountdownParts>(() => getCountdown());

  useEffect(() => {
    const t = window.setInterval(() => setParts(getCountdown()), 30_000);
    return () => window.clearInterval(t);
  }, []);

  if (parts.started) {
    return (
      <button
        type="button"
        onClick={() => setView("ranking")}
        className="flex w-full items-center gap-3 rounded-2xl border border-success/40 bg-success/10 p-4 text-left"
      >
        <span className="text-2xl" aria-hidden>
          🏆
        </span>
        <span>
          <span className="block font-display font-semibold text-fg">
            ¡{TOURNAMENT_LABEL} en marcha!
          </span>
          <span className="text-sm text-muted">Mira el ranking →</span>
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setView("ranking")}
      className="flex w-full items-center gap-3 rounded-2xl border-2 border-primary/40 bg-gradient-to-r from-primary/15 to-accent/10 p-4 text-left transition hover:border-primary/60"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/20 text-primary">
        <Timer className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-bold uppercase tracking-wide text-primary">
          {TOURNAMENT_LABEL}
        </span>
        <span className="block font-display text-base font-semibold text-fg">
          Empieza en:{" "}
          <span className="tabular-nums text-primary">
            {parts.days}d {parts.hours}h {parts.minutes}m
          </span>
        </span>
        {!compact && (
          <span className="block text-xs text-muted">
            5 sept 2026 · 12:00 Madrid · Ver ranking
          </span>
        )}
      </span>
    </button>
  );
}
