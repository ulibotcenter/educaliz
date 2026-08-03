import { CheckCircle2, Flame, Play, Sparkles } from "lucide-react";
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
      title: "Torre · partida del día",
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
      title: "Biblioteca · partida del día",
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
      title: "English · partida del día",
      desc: `Level ${levelName} · 5 English spells`,
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
        <p className="inline-flex items-center gap-1.5 text-sm font-medium text-danger">
          <Flame className="h-4 w-4" aria-hidden />
          Misión de hoy
        </p>
        <h1 className="font-display text-2xl font-semibold text-fg sm:text-3xl">
          Tu ritual de magia, {name}
        </h1>
        <p className="text-base text-muted">
          Tres partidas cortas (nivel del día: {levelName}). Cada una sortea preguntas nuevas.
        </p>
      </div>

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
          className="flex min-h-16 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-lg font-bold text-primary-fg shadow-lg card-glow"
        >
          <Play className="h-6 w-6" aria-hidden />
          {doneCount === 0 ? `Empezar: ${next.title}` : `Continuar: ${next.title}`}
        </button>
      )}

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.key}
            className={cn(
              "flex items-center gap-3 rounded-2xl border p-4",
              item.done
                ? "border-success/40 bg-success/10"
                : "border-border bg-card",
            )}
          >
            <span className="text-2xl" aria-hidden>
              {item.done ? "✅" : item.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-fg">{item.title}</p>
              <p className="text-sm text-muted">{item.desc}</p>
            </div>
            {item.done ? (
              <CheckCircle2 className="h-6 w-6 shrink-0 text-success" />
            ) : (
              <button
                type="button"
                onClick={item.action}
                className="min-h-11 shrink-0 rounded-xl bg-primary px-3 text-sm font-semibold text-primary-fg"
              >
                Jugar
              </button>
            )}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setView("home")}
        className="min-h-11 w-full text-sm font-medium text-muted"
      >
        Volver al mapa
      </button>
    </div>
  );
}
