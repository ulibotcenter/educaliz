import { CheckCircle2, Flame, PartyPopper, Play, Sparkles } from "lucide-react";
import { useGameStore } from "@/lib/game-store";
import { LEVEL_META, type DiffLevel } from "@/lib/data/question-banks";
import { cn } from "@/lib/utils";

export function DailyMission() {
  const setView = useGameStore((s) => s.setView);
  const setPlayMode = useGameStore((s) => s.setPlayMode);
  const startLevel = useGameStore((s) => s.startLevel);
  const name = useGameStore((s) => s.playerName);
  const suggestedFocus = useGameStore((s) => s.suggestedFocus);
  const dailyPartsState = useGameStore((s) => s.dailyParts);

  const today = new Date().toISOString().slice(0, 10);
  const dp =
    dailyPartsState.date === today
      ? dailyPartsState
      : { date: today, math: false, language: false, english: false };

  const day = new Date().getDate();
  const level = (Math.min(5, 1 + (day % 5)) || 1) as DiffLevel;
  const levelName = LEVEL_META[level].name;

  const items = [
    {
      key: "math" as const,
      step: 1,
      title: "Mates del día",
      desc: `Nivel ${levelName} · 5 preguntas al azar`,
      emoji: "🔢",
      done: dp.math,
      action: () => {
        setPlayMode("official");
        startLevel("math", level);
      },
    },
    {
      key: "language" as const,
      step: 2,
      title: "Lengua del día",
      desc: `Nivel ${levelName} · 5 retos de lengua`,
      emoji: "📖",
      done: dp.language,
      action: () => {
        setPlayMode("official");
        startLevel("language", level);
      },
    },
    {
      key: "english" as const,
      step: 3,
      title: "English del día",
      desc: `Nivel ${levelName} · 5 English spells`,
      emoji: "🇬🇧",
      done: dp.english,
      action: () => {
        setPlayMode("official");
        startLevel("english", level);
      },
    },
  ];

  const doneCount = items.filter((i) => i.done).length;
  const next = items.find((i) => !i.done) ?? items[0]!;

  const focusHint =
    suggestedFocus === "math"
      ? "Tu diagnóstico sugirió practicar mates."
      : suggestedFocus === "language"
        ? "Tu diagnóstico sugirió lengua."
        : suggestedFocus === "english"
          ? "Tu diagnóstico sugirió inglés."
          : null;

  return (
    <div className="mx-auto max-w-lg animate-fade-in space-y-5">
      <div className="space-y-2">
        <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-danger">
          <Flame className="h-4 w-4" aria-hidden />
          Misión de hoy
        </p>
        <h1 className="font-display text-2xl font-semibold text-fg sm:text-3xl">
          Tu ritual de magia, {name}
        </h1>
        <p className="text-base leading-relaxed text-muted">
          Tres partidas cortas (nivel del día: <strong className="text-fg">{levelName}</strong>
          ). Orden sugerido: mates → lengua → inglés.
        </p>
      </div>

      {/* Progress strip */}
      <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3">
        <div className="flex h-2.5 flex-1 gap-1.5">
          {items.map((i) => (
            <div
              key={i.key}
              className={cn(
                "h-full flex-1 rounded-full",
                i.done ? "bg-success" : "bg-surface-2",
              )}
            />
          ))}
        </div>
        <span className="text-sm font-bold tabular-nums text-fg">{doneCount}/3</span>
      </div>

      {doneCount === 3 && (
        <div className="rounded-2xl border-2 border-success/45 bg-success/10 p-4 text-center">
          <PartyPopper className="mx-auto h-8 w-8 text-success" aria-hidden />
          <p className="mt-2 font-display text-lg font-semibold text-fg">
            ¡Ritual del día completo!
          </p>
          <p className="mt-1 text-sm text-muted">
            Tres hechizos hechos. Vuelve mañana por más magia, o explora el mapa ahora.
          </p>
        </div>
      )}

      {focusHint && (
        <p className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-muted">
          <Sparkles className="mr-1 inline h-4 w-4 text-accent" />
          {focusHint}
        </p>
      )}

      {doneCount < 3 && (
        <button
          type="button"
          onClick={next.action}
          className="flex min-h-[4.25rem] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-lg font-bold text-primary-fg shadow-lg card-glow"
        >
          <Play className="h-6 w-6" aria-hidden />
          {doneCount === 0
            ? `Empezar paso ${next.step}: ${next.title}`
            : `Continuar paso ${next.step}: ${next.title}`}
        </button>
      )}

      <ul className="space-y-3">
        {items.map((item) => {
          const isNext = !item.done && item.key === next.key && doneCount < 3;
          return (
            <li
              key={item.key}
              className={cn(
                "flex items-center gap-3 rounded-2xl border p-4",
                item.done
                  ? "border-success/40 bg-success/10"
                  : isNext
                    ? "border-primary/50 bg-primary/10 ring-1 ring-primary/25"
                    : "border-border bg-card",
              )}
            >
              <span
                className={cn(
                  "grid h-11 w-11 shrink-0 place-items-center rounded-xl text-lg font-bold",
                  item.done ? "bg-success/20 text-success" : "bg-surface text-muted",
                )}
              >
                {item.done ? <CheckCircle2 className="h-6 w-6" /> : item.step}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-base font-semibold text-fg">
                  <span aria-hidden>{item.emoji} </span>
                  {item.title}
                </p>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
              {item.done ? (
                <span className="shrink-0 text-xs font-bold uppercase tracking-wide text-success">
                  Hecho
                </span>
              ) : (
                <button
                  type="button"
                  onClick={item.action}
                  className="min-h-12 shrink-0 rounded-xl bg-primary px-4 text-sm font-bold text-primary-fg"
                >
                  Jugar
                </button>
              )}
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => setView("home")}
        className="min-h-12 w-full rounded-xl border border-border bg-surface text-sm font-semibold text-fg"
      >
        Volver al mapa
      </button>
    </div>
  );
}
