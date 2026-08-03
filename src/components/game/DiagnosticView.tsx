import { useEffect, useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { useGameStore } from "@/lib/game-store";
import { playCorrect, playWrong } from "@/lib/sounds";
import { cn, normalizeAnswer, normalizeNumberInput } from "@/lib/utils";
import { shuffleAnswerOptions } from "@/lib/shuffle";

type Q =
  | {
      id: string;
      area: "math" | "language" | "english";
      kind: "number";
      prompt: string;
      answer: number;
    }
  | {
      id: string;
      area: "math" | "language" | "english";
      kind: "choice";
      prompt: string;
      options: string[];
      answer: string;
    };

const QUESTIONS: Q[] = [
  {
    id: "d1",
    area: "math",
    kind: "number",
    prompt: "¿Cuánto es 48 + 27?",
    answer: 75,
  },
  {
    id: "d2",
    area: "math",
    kind: "number",
    prompt: "¿Cuánto es 9 × 7?",
    answer: 63,
  },
  {
    id: "d3",
    area: "math",
    kind: "number",
    prompt: "¿Cuánto es 56 ÷ 8?",
    answer: 7,
  },
  {
    id: "d4",
    area: "language",
    kind: "choice",
    prompt: "En «Ana come manzanas», ¿cuál es el sujeto?",
    options: ["Ana", "come", "manzanas", "come manzanas"],
    answer: "Ana",
  },
  {
    id: "d5",
    area: "language",
    kind: "choice",
    prompt: "En «El gato duerme», ¿cuál es el predicado?",
    options: ["El gato", "duerme", "gato", "El"],
    answer: "duerme",
  },
  {
    id: "d6",
    area: "english",
    kind: "choice",
    prompt: "How do you say «libro» in English?",
    options: ["book", "look", "boot", "cook"],
    answer: "book",
  },
  {
    id: "d7",
    area: "english",
    kind: "choice",
    prompt: "I ___ happy. (elige el verbo)",
    options: ["am", "is", "are", "be"],
    answer: "am",
  },
];

export function DiagnosticView() {
  const finishDiagnostic = useGameStore((s) => s.finishDiagnostic);
  const skipDiagnostic = useGameStore((s) => s.skipDiagnostic);
  const name = useGameStore((s) => s.playerName);

  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [choice, setChoice] = useState<string | null>(null);
  const [scores, setScores] = useState({ math: 0, language: 0, english: 0 });
  const [attempts, setAttempts] = useState({ math: 0, language: 0, english: 0 });
  const [done, setDone] = useState(false);
  const [opts, setOpts] = useState<string[]>([]);
  const [answered, setAnswered] = useState(false);
  const [lastOk, setLastOk] = useState(false);

  const q = QUESTIONS[idx]!;
  const progress = Math.round(((idx + (done ? 1 : 0)) / QUESTIONS.length) * 100);

  useEffect(() => {
    if (q.kind === "choice") {
      setOpts(shuffleAnswerOptions(q.options, q.answer));
    } else {
      setOpts([]);
    }
    setChoice(null);
    setInput("");
    setAnswered(false);
  }, [idx, q]);

  function submit() {
    if (answered) return;
    let ok = false;
    if (q.kind === "number") {
      ok = normalizeNumberInput(input) === q.answer;
    } else {
      ok = choice !== null && normalizeAnswer(choice) === normalizeAnswer(q.answer);
    }
    setAnswered(true);
    setLastOk(ok);
    if (ok) playCorrect();
    else playWrong();
    setScores((s) => ({ ...s, [q.area]: s[q.area] + (ok ? 1 : 0) }));
    setAttempts((a) => ({ ...a, [q.area]: a[q.area] + 1 }));
  }

  function next() {
    if (idx < QUESTIONS.length - 1) {
      setIdx(idx + 1);
    } else {
      setDone(true);
    }
  }

  const focus = useMemo(() => {
    const rates = {
      math: attempts.math ? scores.math / attempts.math : 1,
      language: attempts.language ? scores.language / attempts.language : 1,
      english: attempts.english ? scores.english / attempts.english : 1,
    };
    const entries = Object.entries(rates) as [keyof typeof rates, number][];
    entries.sort((a, b) => a[1] - b[1]);
    const weakest = entries[0]![0];
    const allHigh = entries.every(([, r]) => r >= 0.75);
    if (allHigh) return "balanced" as const;
    return weakest;
  }, [scores, attempts]);

  if (done) {
    const labels = {
      math: "la Torre de Números",
      language: "la Biblioteca Misteriosa",
      english: "la Cámara del Inglés",
      balanced: "cualquier zona (¡vas genial!)",
    };
    return (
      <div className="mx-auto max-w-lg animate-fade-in space-y-5">
        <div className="rounded-2xl border border-primary/40 bg-card p-6 text-center">
          <Sparkles className="mx-auto h-10 w-10 text-primary" />
          <h1 className="mt-3 font-display text-2xl font-semibold text-fg">
            ¡Listo, {name}!
          </h1>
          <p className="mt-2 text-base text-muted">
            La Academia ha leído tu magia. Te sugerimos practicar un poquito más en{" "}
            <strong className="text-fg">{labels[focus]}</strong>.
          </p>
          <p className="mt-3 text-sm text-muted">
            Aciertos: mates {scores.math}/{attempts.math} · lengua {scores.language}/
            {attempts.language} · english {scores.english}/{attempts.english}
          </p>
          <button
            type="button"
            onClick={() => finishDiagnostic(focus)}
            className="mt-6 min-h-14 w-full rounded-xl bg-primary text-base font-semibold text-primary-fg"
          >
            ¡Empezar la misión de hoy!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg animate-fade-in space-y-5">
      <div className="space-y-2">
        <p className="text-sm font-medium text-primary">Diagnóstico mágico · opcional</p>
        <h1 className="font-display text-2xl font-semibold text-fg">
          ¿Cómo está tu magia, {name}?
        </h1>
        <p className="text-sm text-muted">
          Solo {QUESTIONS.length} preguntas rápidas. Puedes saltarlas cuando quieras.
        </p>
        <div className="h-2.5 overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted">
          Pregunta {idx + 1} de {QUESTIONS.length}
        </p>
      </div>

      <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
        <p className="font-display text-xl font-semibold leading-snug text-fg">{q.prompt}</p>

        {q.kind === "number" ? (
          <input
            inputMode="numeric"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={answered}
            onKeyDown={(e) => e.key === "Enter" && !answered && submit()}
            className="min-h-14 w-full rounded-xl border border-border bg-surface px-4 text-xl tabular-nums text-fg outline-none ring-primary focus:ring-2"
            placeholder="Tu número…"
            autoFocus
          />
        ) : (
          <div className="space-y-2.5">
            {opts.map((o) => (
              <button
                key={o}
                type="button"
                disabled={answered}
                onClick={() => setChoice(o)}
                className={cn(
                  "w-full min-h-14 rounded-xl border px-4 text-left text-base font-medium",
                  choice === o
                    ? "border-primary bg-primary/15 text-fg"
                    : "border-border bg-surface text-fg",
                )}
              >
                {o}
              </button>
            ))}
          </div>
        )}

        {answered && (
          <p className={cn("text-sm font-medium", lastOk ? "text-success" : "text-accent")}>
            {lastOk
              ? "¡Bien! Sigue así."
              : `Casi… la respuesta era: ${String(q.answer)}`}
          </p>
        )}

        {answered ? (
          <button
            type="button"
            onClick={next}
            className="min-h-14 w-full rounded-xl bg-primary text-base font-bold text-primary-fg"
          >
            {idx < QUESTIONS.length - 1 ? "Siguiente pregunta" : "Ver resultado"}
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            className="min-h-14 w-full rounded-xl bg-primary text-base font-semibold text-primary-fg"
          >
            Comprobar
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={() => skipDiagnostic()}
        className="min-h-12 w-full text-sm font-medium text-muted underline-offset-2 hover:text-fg hover:underline"
      >
        Saltar diagnóstico → ir al mapa
      </button>
    </div>
  );
}
