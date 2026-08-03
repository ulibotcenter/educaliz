import {
  BookOpen,
  Check,
  Flame,
  Languages,
  Map as MapIcon,
  Play,
  Sparkles,
  Trophy,
  Wand2,
} from "lucide-react";
import { useGameStore } from "@/lib/game-store";
import { LEVEL_META, type DiffLevel } from "@/lib/data/question-banks";
import { cn } from "@/lib/utils";
import { AvatarPortrait } from "@/components/game/AvatarView";
import { ProgressPanel } from "@/components/game/ProgressPanel";
import { ThemeToggle } from "@/components/game/ThemeToggle";
import { xpProgress } from "@/lib/progression";
import { InviteFriendCard } from "@/components/game/InviteFriendCard";
import { useProfilesStore } from "@/lib/profiles";

export function HomeView() {
  const setView = useGameStore((s) => s.setView);
  const name = useGameStore((s) => s.playerName);
  const setName = useGameStore((s) => s.setName);
  const mathCompleted = useGameStore((s) => s.mathCompleted);
  const languageCompleted = useGameStore((s) => s.languageCompleted);
  const englishCompleted = useGameStore((s) => s.englishCompleted);
  const books = useGameStore((s) => s.books);
  const badges = useGameStore((s) => s.badges);
  const xp = useGameStore((s) => s.xp);
  const diagnosticDone = useGameStore((s) => s.diagnosticDone);
  const diagnosticSkipped = useGameStore((s) => s.diagnosticSkipped);
  const startLevel = useGameStore((s) => s.startLevel);
  const setPlayMode = useGameStore((s) => s.setPlayMode);
  const dailyPartsState = useGameStore((s) => s.dailyParts);
  const prog = xpProgress(xp);
  const activeId = useProfilesStore((s) => s.activeProfileId);
  const active = useProfilesStore((s) =>
    activeId ? s.profiles[activeId] ?? null : null,
  );

  const day = new Date().getDate();
  const dailyLevel = (Math.min(5, 1 + (day % 5)) || 1) as DiffLevel;
  const levelName = LEVEL_META[dailyLevel].name;
  const today = new Date().toISOString().slice(0, 10);
  const dp =
    dailyPartsState.date === today
      ? dailyPartsState
      : { date: today, math: false, language: false, english: false };

  const dailyParts = [
    {
      key: "math" as const,
      done: dp.math,
      label: "Mates",
      emoji: "🔢",
      step: 1,
      start: () => {
        setPlayMode("official");
        startLevel("math", dailyLevel);
      },
    },
    {
      key: "language" as const,
      done: dp.language,
      label: "Lengua",
      emoji: "📖",
      step: 2,
      start: () => {
        setPlayMode("official");
        startLevel("language", dailyLevel);
      },
    },
    {
      key: "english" as const,
      done: dp.english,
      label: "English",
      emoji: "🇬🇧",
      step: 3,
      start: () => {
        setPlayMode("official");
        startLevel("english", dailyLevel);
      },
    },
  ];
  const dailyDone = dailyParts.filter((p) => p.done).length;
  const nextPart = dailyParts.find((p) => !p.done) ?? null;
  const showDiagInvite = !diagnosticDone && !diagnosticSkipped;

  const zones = [
    {
      id: "math" as const,
      title: "Torre de Números",
      subtitle: "Elige nivel · 5 retos al azar",
      icon: Wand2,
      accent: "text-primary bg-primary/15",
      progress: `${mathCompleted.length} partidas`,
    },
    {
      id: "language" as const,
      title: "Biblioteca Misteriosa",
      subtitle: "Elige nivel · 5 retos al azar",
      icon: BookOpen,
      accent: "text-accent bg-accent/15",
      progress: `${languageCompleted.length} partidas`,
    },
    {
      id: "english" as const,
      title: "Cámara del Inglés",
      subtitle: "Levels + prueba final",
      icon: Languages,
      accent: "text-accent-2 bg-accent-2/15",
      progress: `${englishCompleted.length} partidas`,
    },
    {
      id: "reading" as const,
      title: "Salón de Lectura",
      subtitle: "2 fichas de libros de verano",
      icon: Sparkles,
      accent: "text-success bg-success/15",
      progress: `${books.filter((b) => b.completed).length}/2`,
    },
    {
      id: "progress" as const,
      title: "Sala de Trofeos",
      subtitle: `${badges.length} insignias · ruleta mágica`,
      icon: Trophy,
      accent: "text-primary bg-primary/15",
      progress: null as string | null,
    },
  ];

  return (
    <div className="animate-fade-in space-y-5 sm:space-y-6">
      {/* Compact greeting */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-4 card-glow sm:p-5">
        <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setView("avatar")}
            className="shrink-0"
            aria-label="Personalizar avatar"
          >
            <AvatarPortrait size="md" />
          </button>
          <div className="min-w-0 flex-1 space-y-0.5">
            <p className="inline-flex items-center gap-1 text-xs font-medium text-muted">
              <MapIcon className="h-3.5 w-3.5" aria-hidden />
              Academia Arcana
            </p>
            <h1 className="font-display text-xl font-semibold tracking-tight text-fg sm:text-2xl">
              ¡Hola, {name}!
            </h1>
            <p className="text-sm text-muted">
              Nivel {prog.level} · {prog.title}
              {active ? ` · @${active.username}` : ""}
            </p>
          </div>
        </div>
      </section>

      {/* Friend invite — under profile card */}
      <div className="flex justify-end">
        <div className="w-full max-w-md sm:ml-auto">
          <InviteFriendCard />
        </div>
      </div>

      {/* Misión de hoy — hero, first real action */}
      <section className="relative overflow-hidden rounded-2xl border-[3px] border-danger/55 bg-gradient-to-br from-danger/25 via-card to-primary/15 p-5 shadow-[0_0_36px_color-mix(in_oklab,var(--color-danger)_18%,transparent)] sm:p-6">
        <div className="pointer-events-none absolute -right-4 top-2 text-8xl opacity-10" aria-hidden>
          🔥
        </div>
        <div className="relative space-y-4">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-danger/30 text-danger">
              <Flame className="h-7 w-7" aria-hidden />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-danger">
                Empieza aquí · lo más fácil
              </p>
              <h2 className="font-display text-xl font-semibold text-fg sm:text-2xl">
                Misión de hoy · {levelName}
              </h2>
            </div>
          </div>

          <p className="text-base leading-snug text-muted sm:text-lg">
            {dailyDone === 3
              ? "¡Ritual completo! Ya hiciste las 3 partes. Puedes repasar o explorar el mapa."
              : "Solo 3 partes cortas: mates → lengua → inglés. Un toque y empiezas."}
          </p>

          {/* Step chips */}
          <ol className="grid grid-cols-3 gap-2">
            {dailyParts.map((p) => (
              <li
                key={p.key}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl border px-2 py-2.5 text-center",
                  p.done
                    ? "border-success/45 bg-success/15"
                    : nextPart?.key === p.key
                      ? "border-primary/50 bg-primary/15 ring-1 ring-primary/30"
                      : "border-border bg-surface/60",
                )}
              >
                <span className="text-lg" aria-hidden>
                  {p.done ? "✅" : p.emoji}
                </span>
                <span className="text-[11px] font-bold text-muted">Paso {p.step}</span>
                <span className="text-xs font-semibold text-fg">{p.label}</span>
              </li>
            ))}
          </ol>

          <div className="flex items-center gap-2">
            <div className="flex h-2.5 flex-1 gap-1.5">
              {dailyParts.map((p) => (
                <div
                  key={p.key}
                  className={cn(
                    "h-full flex-1 rounded-full transition-colors",
                    p.done ? "bg-success" : "bg-surface-2",
                  )}
                />
              ))}
            </div>
            <span className="shrink-0 text-sm font-bold tabular-nums text-fg">
              {dailyDone}/3
            </span>
          </div>

          {dailyDone < 3 && nextPart ? (
            <button
              type="button"
              onClick={nextPart.start}
              className="flex min-h-[4.25rem] w-full items-center justify-center gap-2.5 rounded-2xl bg-primary text-lg font-bold text-primary-fg shadow-lg active:scale-[0.99] sm:text-xl"
            >
              <Play className="h-7 w-7" aria-hidden />
              {dailyDone === 0
                ? "¡Empezar misión de hoy!"
                : `Continuar: ${nextPart.label}`}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setView("daily")}
              className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border border-success/45 bg-success/15 text-base font-bold text-success"
            >
              <Check className="h-5 w-5" aria-hidden />
              ¡Ritual completo! Ver detalles
            </button>
          )}

          <button
            type="button"
            onClick={() => setView("daily")}
            className="min-h-11 w-full text-sm font-semibold text-muted underline-offset-2 hover:text-fg hover:underline"
          >
            Ver las 3 partes del día
          </button>
        </div>
      </section>

      {showDiagInvite && (
        <section className="rounded-2xl border border-accent/40 bg-accent/10 p-4">
          <p className="font-display text-base font-semibold text-fg">
            ¿Primera vez en la Academia?
          </p>
          <p className="mt-1 text-sm text-muted">
            Diagnóstico mágico opcional (7 preguntas). Te sugiere por dónde empezar.
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setView("diagnostic")}
              className="min-h-12 rounded-xl bg-accent px-4 font-semibold text-white"
            >
              Hacer diagnóstico
            </button>
            <button
              type="button"
              onClick={() => useGameStore.getState().skipDiagnostic()}
              className="min-h-12 rounded-xl border border-border bg-surface font-medium text-fg"
            >
              Ahora no
            </button>
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="font-display text-lg font-semibold text-fg">Tu progreso</h2>
          <button
            type="button"
            onClick={() => setView("progress")}
            className="min-h-10 text-sm font-semibold text-primary"
          >
            Ver todo →
          </button>
        </div>
        <ProgressPanel compact />
      </section>

      <section>
        <h2 className="mb-3 font-display text-lg font-semibold text-fg">Explorar el mapa</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {zones.map((z) => {
            const Icon = z.icon;
            return (
              <button
                key={z.id}
                type="button"
                onClick={() => setView(z.id)}
                className={cn(
                  "group flex min-h-[4.75rem] items-start gap-3 rounded-2xl border border-border bg-card p-4 text-left transition",
                  "hover:border-primary/40 hover:bg-surface active:scale-[0.99]",
                )}
              >
                <span
                  className={cn(
                    "grid h-12 w-12 shrink-0 place-items-center rounded-xl",
                    z.accent,
                  )}
                >
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-display text-base font-semibold text-fg">
                      {z.title}
                    </span>
                    {z.progress && (
                      <span className="shrink-0 rounded-full bg-surface-2 px-2 py-0.5 text-xs tabular-nums text-muted">
                        {z.progress}
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted">{z.subtitle}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card/80 p-4">
        <ThemeToggle />
        <label className="mt-3 flex max-w-xs flex-col gap-1 text-xs text-muted">
          Tu nombre de mago
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="min-h-11 rounded-lg border border-border bg-surface px-3 text-sm text-fg outline-none ring-primary focus:ring-2"
            maxLength={20}
          />
        </label>
      </section>

      <p className="pb-2 text-center text-sm text-muted">
        Consejo: un poquito cada día = magia que se queda.
      </p>

      {/* Torneo — mención discreta al final */}
      <p className="torneo-soft-link pt-1 text-center text-xs text-muted">
        <button
          type="button"
          onClick={() => setView("ranking")}
          className="inline-flex items-center gap-1 font-medium text-muted underline-offset-2 hover:text-primary hover:underline"
        >
          Torneo de la Academia · ver cuenta atrás y ranking
        </button>
      </p>
    </div>
  );
}
