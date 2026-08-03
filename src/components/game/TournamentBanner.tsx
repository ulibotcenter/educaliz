import { useEffect, useState } from "react";
import { Timer } from "lucide-react";
import {
  TOURNAMENT_LABEL,
  getCountdown,
  type CountdownParts,
} from "@/lib/profiles/tournament";
import { useGameStore } from "@/lib/game-store";
import { cn } from "@/lib/utils";

/** Compact countdown for home — live to the second */
export function TournamentBanner({ compact }: { compact?: boolean }) {
  const setView = useGameStore((s) => s.setView);
  const [parts, setParts] = useState<CountdownParts>(() => getCountdown());
  const [tick, setTick] = useState(false);

  useEffect(() => {
    const t = window.setInterval(() => {
      setParts(getCountdown());
      setTick((v) => !v);
    }, 1000);
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

  const cells = [
    { label: "Días", value: parts.days },
    { label: "Horas", value: parts.hours },
    { label: "Min", value: parts.minutes },
    { label: "Seg", value: parts.seconds },
  ];

  return (
    <button
      type="button"
      onClick={() => setView("ranking")}
      className="relative w-full overflow-hidden rounded-2xl border-2 border-primary/45 bg-gradient-to-r from-primary/15 via-card to-accent/15 p-4 text-left transition hover:border-primary/70"
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl transition-opacity duration-700",
          tick ? "opacity-80" : "opacity-40",
        )}
        aria-hidden
      />
      <div className="relative space-y-3">
        <div className="flex items-center gap-2">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/20 text-primary">
            <Timer className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-bold uppercase tracking-wide text-primary">
              {TOURNAMENT_LABEL}
            </span>
            <span className="block font-display text-sm font-semibold text-fg sm:text-base">
              Empieza en:
            </span>
          </span>
        </div>

        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
          {cells.map((c, i) => (
            <div
              key={c.label}
              className={cn(
                "rounded-xl border border-border bg-card/90 px-1 py-2 text-center",
                c.label === "Seg" && "border-primary/40 bg-primary/10",
              )}
            >
              <p
                className={cn(
                  "font-display text-xl font-bold tabular-nums text-fg sm:text-2xl",
                  c.label === "Seg" && "text-primary",
                  c.label === "Seg" && tick && "scale-105",
                )}
              >
                {String(c.value).padStart(2, "0")}
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                {c.label}
              </p>
              {i < 3 && (
                <span className="sr-only"> · </span>
              )}
            </div>
          ))}
        </div>

        {!compact && (
          <p className="text-xs text-muted">
            5 sept 2026 · 12:00 Madrid · Toca para ver el ranking
          </p>
        )}
      </div>
    </button>
  );
}
