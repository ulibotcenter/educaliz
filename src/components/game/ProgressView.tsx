import { FileDown, RotateCcw, Sparkles, Trophy, User } from "lucide-react";
import { useGameStore } from "@/lib/game-store";
import { ALL_BADGES, xpProgress } from "@/lib/progression";
import { downloadLiveParentReport } from "@/lib/build-parent-report";
import { analyzeSkills } from "@/lib/skill-insights";
import { AvatarPortrait } from "@/components/game/AvatarView";
import { ProgressPanel } from "@/components/game/ProgressPanel";
import { StoryLog } from "@/components/game/StoryModal";
import { RewardRoulette } from "@/components/game/RewardRoulette";
import { PermanentBadgeCard, TempBadgeChip } from "@/components/game/BadgeChips";

export function ProgressView() {
  const points = useGameStore((s) => s.points);
  const xp = useGameStore((s) => s.xp);
  const streak = useGameStore((s) => s.streak);
  const maxStreak = useGameStore((s) => s.maxStreak);
  const badges = useGameStore((s) => s.badges);
  const mathCompleted = useGameStore((s) => s.mathCompleted);
  const languageCompleted = useGameStore((s) => s.languageCompleted);
  const englishCompleted = useGameStore((s) => s.englishCompleted);
  const books = useGameStore((s) => s.books);
  const totalCorrect = useGameStore((s) => s.totalCorrect);
  const totalWrong = useGameStore((s) => s.totalWrong);
  const name = useGameStore((s) => s.playerName);
  const resetProgress = useGameStore((s) => s.resetProgress);
  const setView = useGameStore((s) => s.setView);
  const bossBeaten = useGameStore((s) => s.bossBeaten);
  const perfectMissions = useGameStore((s) => s.perfectMissions);
  const skillStats = useGameStore((s) => s.skillStats);
  const areaSessionCount = useGameStore((s) => s.areaSessionCount);
  const tempBadges = useGameStore((s) => s.tempBadges);

  const prog = xpProgress(xp);
  const accuracy =
    totalCorrect + totalWrong === 0
      ? null
      : Math.round((totalCorrect / (totalCorrect + totalWrong)) * 100);

  const { strong, weak } = analyzeSkills(skillStats);
  const lockedBadges = Object.keys(ALL_BADGES).filter((id) => !badges.includes(id));
  const activeTemp = Object.entries(tempBadges).filter(([, exp]) => exp > Date.now());
  const sessionsTotal =
    areaSessionCount.math + areaSessionCount.language + areaSessionCount.english;

  function downloadReport() {
    const s = useGameStore.getState();
    downloadLiveParentReport({
      playerName: s.playerName,
      mathCompleted: s.mathCompleted,
      languageCompleted: s.languageCompleted,
      englishCompleted: s.englishCompleted,
      books: s.books,
      totalCorrect: s.totalCorrect,
      totalWrong: s.totalWrong,
      streak: s.streak,
      maxStreak: s.maxStreak,
      points: s.points,
      xp: s.xp,
      badges: s.badges,
      skillStats: s.skillStats,
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <AvatarPortrait size="md" />
        <div className="min-w-0 flex-1 space-y-1">
          <p className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            <Trophy className="h-4 w-4" aria-hidden />
            Sala de Trofeos
          </p>
          <h1 className="font-display text-2xl font-semibold text-fg">Tus logros, {name}</h1>
          <p className="text-sm text-muted">
            Nivel {prog.level} · {prog.title}
          </p>
          <button
            type="button"
            onClick={() => setView("avatar")}
            className="mt-1 inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 text-xs font-medium text-fg"
          >
            <User className="h-3.5 w-3.5" />
            Personalizar avatar
          </button>
        </div>
      </div>

      <section className="space-y-3 rounded-xl border-2 border-primary/40 bg-primary/10 p-4 sm:p-5">
        <h2 className="font-display text-lg font-semibold text-fg">
          Informe de progreso – Academia Arcana · Verano
        </h2>
        <p className="text-sm text-muted">
          Para papá o mamá: descarga un PDF con el progreso real de {name}.{" "}
          <strong className="text-fg">Lo genera la familia</strong> y decide si lo guarda o lo
          comparte. Sin nombres de colegio ni de docentes.
        </p>
        <ul className="grid gap-1 text-xs text-muted sm:grid-cols-2">
          <li>· Progreso por área con %</li>
          <li>· Aciertos, rachas e insignias</li>
          <li>· Áreas fuertes y a practicar</li>
          <li>· Recomendaciones positivas</li>
        </ul>
        <button
          type="button"
          onClick={downloadReport}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-base font-semibold text-primary-fg shadow-md"
        >
          <FileDown className="h-5 w-5" />
          Descargar informe PDF para la familia
        </button>
      </section>

      <RewardRoulette />

      <section className="rounded-xl border border-border bg-card p-4 sm:p-5">
        <h2 className="mb-3 font-display text-lg font-semibold text-fg">Panel de progreso</h2>
        <ProgressPanel />
      </section>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Puntos" value={String(points)} />
        <Stat label="XP" value={String(xp)} />
        <Stat label="Racha / máx." value={`${streak}/${maxStreak}`} />
        <Stat label="Precisión" value={accuracy === null ? "—" : `${accuracy}%`} />
      </div>

      <section className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-success/30 bg-success/10 p-4">
          <p className="text-sm font-semibold text-success">Áreas más fuertes</p>
          {strong.length === 0 ? (
            <p className="mt-2 text-sm text-muted">Practica un poco más para ver brillos aquí.</p>
          ) : (
            <ul className="mt-2 space-y-1 text-sm text-fg">
              {strong.map((s) => (
                <li key={s.tag}>
                  ✦ {s.label} · {s.accuracy}%
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-xl border border-accent/30 bg-accent/10 p-4">
          <p className="text-sm font-semibold text-accent">Áreas a mejorar</p>
          {weak.length === 0 ? (
            <p className="mt-2 text-sm text-muted">¡Equilibrado! Sigue así.</p>
          ) : (
            <ul className="mt-2 space-y-1 text-sm text-fg">
              {weak.map((s) => (
                <li key={s.tag}>
                  ✧ {s.label} · {s.accuracy}%
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <div className="rounded-xl border border-border bg-surface/50 p-3 text-sm text-muted">
        Partidas perfectas: {perfectMissions} · Jefes:{" "}
        {[
          bossBeaten.math && "Números",
          bossBeaten.language && "Lengua",
          bossBeaten.english && "English",
        ]
          .filter(Boolean)
          .join(", ") || "ninguno aún"}{" "}
        · Partidas oficiales: {sessionsTotal} · Libros:{" "}
        {books.filter((b) => b.completed).length}/2
      </div>

      <section className="space-y-3 rounded-2xl border-2 border-dashed border-accent/50 bg-gradient-to-br from-accent/10 via-card to-primary/5 p-4">
        <div>
          <h2 className="font-display text-lg font-semibold text-fg">Insignias temporales</h2>
          <p className="text-xs text-muted">
            Toca una para ver su magia y equipar el brillo en tu avatar. Duran 24 h (renuevas si entras cada día).
          </p>
        </div>
        {activeTemp.length === 0 ? (
          <p className="text-sm text-muted">
            Gira la ruleta para ganar Brisa Arcana, Llama Fugaz o Eco de las Estrellas.
          </p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {activeTemp.map(([id, exp]) => (
              <li key={id}>
                <TempBadgeChip id={id} showBlurb expiresAt={exp} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-semibold text-fg">Insignias permanentes</h2>
        {badges.length === 0 ? (
          <p className="text-sm text-muted">
            Completa partidas, rachas y batallas finales para desbloquear insignias mágicas.
          </p>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2">
            {badges.map((id) => (
              <PermanentBadgeCard key={id} id={id} />
            ))}
          </ul>
        )}
        {lockedBadges.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-medium text-muted">Aún por descubrir</p>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {lockedBadges.slice(0, 6).map((id) => (
                <li
                  key={id}
                  className="rounded-lg border border-dashed border-border bg-surface/40 p-2 text-center text-xs text-muted"
                >
                  <span className="text-lg opacity-40">❓</span>
                  <p className="mt-1">{ALL_BADGES[id]?.name}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-fg">
          <Sparkles className="h-5 w-5 text-primary" />
          Grimorio de la historia
        </h2>
        <StoryLog />
      </section>

      <button
        type="button"
        onClick={() => {
          if (confirm("¿Borrar todo el progreso de este dispositivo?")) resetProgress();
        }}
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-danger"
      >
        <RotateCcw className="h-4 w-4" />
        Reiniciar progreso
      </button>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3 text-center">
      <p className="font-display text-xl font-semibold tabular-nums text-fg">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}
