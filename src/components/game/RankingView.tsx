import { useEffect, useState } from "react";
import { Crown, Medal, Sparkles, Timer, Trophy } from "lucide-react";
import { useGameStore } from "@/lib/game-store";
import {
  TOURNAMENT_LABEL,
  TOURNAMENT_MIN_LEVEL,
  TOURNAMENT_MIN_SESSIONS,
  eligibilityHint,
  getCountdown,
  type CountdownParts,
} from "@/lib/profiles/tournament";
import { useProfilesStore } from "@/lib/profiles";
import { snapshotProgress } from "@/lib/profiles/progress";
import { cn } from "@/lib/utils";

function CountdownBlock() {
  const [parts, setParts] = useState<CountdownParts>(() => getCountdown());

  useEffect(() => {
    const t = window.setInterval(() => setParts(getCountdown()), 1000);
    return () => window.clearInterval(t);
  }, []);

  if (parts.started) {
    return (
      <div className="rounded-2xl border-2 border-success/45 bg-success/10 p-5 text-center">
        <p className="font-display text-xl font-semibold text-success">
          ¡El {TOURNAMENT_LABEL} ha comenzado!
        </p>
        <p className="mt-1 text-sm text-muted">¡Que gane la mejor maga!</p>
      </div>
    );
  }

  const cells = [
    { label: "Días", value: parts.days },
    { label: "Horas", value: parts.hours },
    { label: "Min", value: parts.minutes },
    { label: "Seg", value: parts.seconds },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-primary/50 bg-gradient-to-br from-primary/20 via-card to-accent/15 p-5 card-glow">
      <div className="pointer-events-none absolute -right-6 -top-6 text-7xl opacity-10" aria-hidden>
        🏆
      </div>
      <div className="relative space-y-3">
        <p className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-primary">
          <Timer className="h-4 w-4" />
          Cuenta atrás
        </p>
        <h2 className="font-display text-xl font-semibold text-fg sm:text-2xl">
          {TOURNAMENT_LABEL} empieza en:
        </h2>
        <p className="text-sm text-muted">5 de septiembre de 2026 · 12:00 (Madrid)</p>
        <div className="grid grid-cols-4 gap-2">
          {cells.map((c) => (
            <div
              key={c.label}
              className="rounded-xl border border-border bg-card/90 px-1 py-3 text-center"
            >
              <p className="font-display text-2xl font-bold tabular-nums text-fg sm:text-3xl">
                {String(c.value).padStart(2, "0")}
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                {c.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function RankingView() {
  const ranking = useProfilesStore((s) => s.ranking);
  const getActive = useProfilesStore((s) => s.getActive);
  const syncActiveFromGame = useProfilesStore((s) => s.syncActiveFromGame);
  const setView = useGameStore((s) => s.setView);
  const game = useGameStore();

  // Keep ranking fresh with live progress
  useEffect(() => {
    syncActiveFromGame();
  }, [
    syncActiveFromGame,
    game.xp,
    game.streak,
    game.areaSessionCount.math,
    game.areaSessionCount.language,
    game.areaSessionCount.english,
  ]);

  const rows = ranking(20);
  const active = getActive();
  const progress = snapshotProgress(game);
  const hint = eligibilityHint(progress);
  const eligible = active?.tournamentEligible || false;

  return (
    <div className="mx-auto max-w-lg animate-fade-in space-y-6">
      <header className="space-y-1">
        <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          <Trophy className="h-4 w-4" />
          Ranking de la Academia
        </p>
        <h1 className="font-display text-2xl font-semibold text-fg sm:text-3xl">
          Tabla de magas
        </h1>
        <p className="text-base text-muted">
          Ordenado por XP total. Preparado para filtrar «esta semana» más adelante.
        </p>
      </header>

      <CountdownBlock />

      <section
        className={cn(
          "rounded-2xl border p-4",
          eligible
            ? "border-success/40 bg-success/10"
            : "border-border bg-card",
        )}
      >
        <p className="flex items-center gap-2 font-semibold text-fg">
          <Sparkles className="h-4 w-4 text-primary" />
          Tu plaza en el torneo
        </p>
        <p className="mt-1 text-sm text-muted">{hint}</p>
        <p className="mt-2 text-xs text-muted">
          Meta: nivel {TOURNAMENT_MIN_LEVEL} o {TOURNAMENT_MIN_SESSIONS} partidas oficiales.
        </p>
        {eligible && (
          <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-success/20 px-3 py-1 text-xs font-bold text-success">
            ✓ Elegible para el Torneo
          </p>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-semibold text-fg">Top {Math.min(20, Math.max(rows.length, 10))}</h2>
        {rows.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-4 text-sm text-muted">
            Aún no hay perfiles en el ranking. ¡Crea el tuyo!
          </p>
        ) : (
          <ol className="space-y-2">
            {rows.map((r) => {
              const isMe = r.profileId === active?.id;
              const medal =
                r.rank === 1 ? "🥇" : r.rank === 2 ? "🥈" : r.rank === 3 ? "🥉" : null;
              return (
                <li
                  key={r.profileId}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border px-3 py-3",
                    isMe
                      ? "border-primary/50 bg-primary/10"
                      : "border-border bg-card",
                  )}
                >
                  <span className="grid w-9 place-items-center font-display text-lg font-bold tabular-nums text-muted">
                    {medal ?? r.rank}
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-b from-violet-500/80 to-purple-900/80 text-xl">
                    👧
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-1.5">
                      <span className="font-semibold text-fg">
                        {r.displayName}
                        {isMe ? " (tú)" : ""}
                      </span>
                      {r.tournamentEligible && (
                        <span title="Elegible torneo">
                          <Medal className="h-3.5 w-3.5 text-primary" />
                        </span>
                      )}
                      {r.rank === 1 && (
                        <Crown className="h-3.5 w-3.5 text-primary" aria-hidden />
                      )}
                    </span>
                    <span className="block text-xs text-muted">
                      @{r.username} · Nv.{r.level} · racha {r.streak}
                    </span>
                  </span>
                  <span className="shrink-0 text-right">
                    <span className="block font-display text-base font-bold tabular-nums text-primary">
                      {r.xp}
                    </span>
                    <span className="text-[10px] uppercase text-muted">XP</span>
                  </span>
                </li>
              );
            })}
          </ol>
        )}
      </section>

      <button
        type="button"
        onClick={() => setView("home")}
        className="min-h-12 w-full rounded-xl border border-border bg-surface font-semibold text-fg"
      >
        Volver al mapa
      </button>
    </div>
  );
}
