import { useEffect, useState } from "react";
import {
  CloudOff,
  Crown,
  Medal,
  RefreshCw,
  Sparkles,
  Timer,
  Trophy,
} from "lucide-react";
import { useGameStore } from "@/lib/game-store";
import {
  TOURNAMENT_LABEL,
  TOURNAMENT_MIN_LEVEL,
  TOURNAMENT_MIN_SESSIONS,
  eligibilityHint,
  getCountdown,
  isTournamentEligible,
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
      <div
        className="pointer-events-none absolute -right-6 -top-6 text-7xl opacity-10"
        aria-hidden
      >
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
        <p className="text-sm text-muted">
          5 de septiembre de 2026 · 12:00 (Madrid)
        </p>
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
  const refreshFromCloud = useProfilesStore((s) => s.refreshFromCloud);
  const flushActiveToCloud = useProfilesStore((s) => s.flushActiveToCloud);
  const cloudError = useProfilesStore((s) => s.cloudError);
  const cloudEnabled = useProfilesStore((s) => s.cloudEnabled);
  const loading = useProfilesStore((s) => s.loading);
  const clearCloudError = useProfilesStore((s) => s.clearCloudError);
  const setView = useGameStore((s) => s.setView);
  const xp = useGameStore((s) => s.xp);
  const streak = useGameStore((s) => s.streak);
  const areaSessionCount = useGameStore((s) => s.areaSessionCount);
  const playerName = useGameStore((s) => s.playerName);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    syncActiveFromGame();
    if (cloudEnabled) {
      void refreshFromCloud();
    }
  }, [cloudEnabled, refreshFromCloud, syncActiveFromGame]);

  useEffect(() => {
    syncActiveFromGame();
  }, [syncActiveFromGame, xp, streak, areaSessionCount, playerName]);

  async function onRefresh() {
    setRefreshing(true);
    clearCloudError();
    syncActiveFromGame();
    await flushActiveToCloud();
    await refreshFromCloud();
    setRefreshing(false);
  }

  const rows = ranking(20);
  const active = getActive();
  const progress = snapshotProgress(useGameStore.getState());
  const hint = eligibilityHint(progress);
  const eligible =
    Boolean(active?.tournamentEligible) || isTournamentEligible(progress);

  return (
    <div className="mx-auto max-w-lg animate-fade-in space-y-6">
      <header className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            <Trophy className="h-4 w-4" />
            Ranking de la Academia
          </p>
          <h1 className="font-display text-2xl font-semibold text-fg sm:text-3xl">
            Tabla de magas
          </h1>
          <p className="text-base text-muted">
            {cloudEnabled
              ? "Datos reales de la nube · ordenado por XP total."
              : "Ranking local · conecta la nube en el despliegue."}
          </p>
        </div>
        <button
          type="button"
          onClick={() => void onRefresh()}
          disabled={refreshing || loading}
          className="inline-flex min-h-11 shrink-0 items-center gap-1 rounded-full border border-border bg-surface px-3 text-xs font-semibold text-fg disabled:opacity-50"
          title="Actualizar ranking"
        >
          <RefreshCw
            className={cn(
              "h-3.5 w-3.5",
              (refreshing || loading) && "animate-spin",
            )}
          />
          Actualizar
        </button>
      </header>

      {cloudError && (
        <div
          className="flex items-start gap-2 rounded-xl border border-danger/40 bg-danger/10 px-3 py-2.5 text-sm text-danger"
          role="alert"
        >
          <CloudOff className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-medium">{cloudError}</p>
            <button
              type="button"
              className="mt-1 text-xs font-bold underline"
              onClick={() => void onRefresh()}
            >
              Reintentar
            </button>
          </div>
        </div>
      )}

      <CountdownBlock />

      <section
        className={cn(
          "rounded-2xl border p-4",
          eligible ? "border-success/40 bg-success/10" : "border-border bg-card",
        )}
      >
        <p className="flex items-center gap-2 font-semibold text-fg">
          <Sparkles className="h-4 w-4 text-primary" />
          Tu plaza en el torneo
        </p>
        <p className="mt-1 text-sm text-muted">{hint}</p>
        <p className="mt-2 text-xs text-muted">
          Meta: nivel {TOURNAMENT_MIN_LEVEL} o {TOURNAMENT_MIN_SESSIONS} partidas
          oficiales.
        </p>
        {eligible && (
          <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-success/20 px-3 py-1 text-xs font-bold text-success">
            ✓ Elegible para el Torneo
          </p>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-semibold text-fg">
          Top {Math.min(20, Math.max(rows.length, 10))}
        </h2>
        {rows.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-4 text-sm text-muted">
            Aún no hay perfiles en el ranking. ¡Crea el tuyo!
          </p>
        ) : (
          <ol className="space-y-2">
            {rows.map((r) => {
              const isMe = r.profileId === active?.id;
              const medal =
                r.rank === 1
                  ? "🥇"
                  : r.rank === 2
                    ? "🥈"
                    : r.rank === 3
                      ? "🥉"
                      : null;
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
                        <Crown
                          className="h-3.5 w-3.5 text-primary"
                          aria-hidden
                        />
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
