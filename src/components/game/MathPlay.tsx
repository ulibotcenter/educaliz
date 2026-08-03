import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { LEVEL_META, MATH_BANK, type MathQ } from "@/lib/data/question-banks";
import { TYPE_LABELS, type MathExerciseType } from "@/lib/data/math-tasks";
import { correctCheer, enrichMathExplanation } from "@/lib/explain";
import { useGameStore } from "@/lib/game-store";
import { playCorrect, playWrong } from "@/lib/sounds";
import { cn, normalizeNumberInput } from "@/lib/utils";
import { AnswerFeedback, HintBox } from "@/components/game/AnswerFeedback";
import { ModeBadge } from "@/components/game/ModeToggle";
import { MissionSummary } from "@/components/game/MissionSummary";
import { PlayActions } from "@/components/game/PlayActions";

const typeColor: Partial<Record<string, string>> = {
  suma: "bg-accent-2/15 text-accent-2",
  resta: "bg-danger/15 text-danger",
  multiplicacion: "bg-primary/15 text-primary",
  division: "bg-accent/15 text-accent",
  problema: "bg-success/15 text-success",
  calculo_mental: "bg-primary/20 text-primary",
  valor_posicional: "bg-accent/20 text-accent",
  comparacion: "bg-accent-2/20 text-accent-2",
  fraccion: "bg-success/20 text-success",
  decimal: "bg-primary/15 text-primary",
  medida: "bg-accent-2/15 text-accent-2",
  geometria: "bg-accent/15 text-accent",
};

export function MathPlay() {
  const session = useGameStore((s) => s.session);
  const setView = useGameStore((s) => s.setView);
  const playMode = useGameStore((s) => s.playMode);
  const playerName = useGameStore((s) => s.playerName);
  const awardCorrect = useGameStore((s) => s.awardCorrect);
  const awardWrong = useGameStore((s) => s.awardWrong);
  const recordSkill = useGameStore((s) => s.recordSkill);
  const setPlayMode = useGameStore((s) => s.setPlayMode);
  const completeSession = useGameStore((s) => s.completeSession);
  const clearSession = useGameStore((s) => s.clearSession);
  const recordPerfectMission = useGameStore((s) => s.recordPerfectMission);

  // Snapshot questions when session starts so summary survives completeSession()
  const [sessionSnap] = useState(() => {
    const s = useGameStore.getState().session;
    if (!s || s.area !== "math") return [] as MathQ[];
    return s.ids
      .map((id) => MATH_BANK.find((q) => q.id === id))
      .filter(Boolean) as MathQ[];
  });
  const [levelSnap] = useState(() => useGameStore.getState().session?.level ?? 1);

  const questions: MathQ[] = useMemo(() => {
    if (sessionSnap.length > 0) return sessionSnap;
    if (!session || session.area !== "math") return [];
    return session.ids
      .map((id) => MATH_BANK.find((q) => q.id === id))
      .filter(Boolean) as MathQ[];
  }, [session, sessionSnap]);

  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<"ok" | "bad" | null>(null);
  const [earnedPts, setEarnedPts] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [failTags, setFailTags] = useState<string[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [streakOk, setStreakOk] = useState(0);

  if (showSummary) {
    return (
      <MissionSummary
        correct={correctCount}
        wrong={wrongCount}
        failTags={failTags}
        area="math"
        playerName={playerName}
        onContinue={() => {
          clearSession();
          setView("math");
        }}
        practiceLabel="Practicar en Entrenamiento"
        onPractice={() => {
          setPlayMode("practice");
          clearSession();
          setView("math");
        }}
      />
    );
  }

  if (questions.length === 0) {
    return (
      <div className="space-y-3">
        <p className="text-muted">Elige un nivel en la Torre de Números.</p>
        <button type="button" onClick={() => setView("math")} className="text-primary">
          Volver
        </button>
      </div>
    );
  }

  const ex = questions[idx]!;
  const practice = playMode === "practice";
  const answered = feedback === "ok" || feedback === "bad";
  const explanation = enrichMathExplanation({
    type: ex.type as MathExerciseType,
    prompt: ex.prompt,
    answer: ex.answer,
    hint: ex.hint,
    explanation: ex.explanation,
  });
  const levelName = LEVEL_META[levelSnap as 1 | 2 | 3 | 4 | 5].name;

  function submit() {
    if (answered) return;
    const n = normalizeNumberInput(input);
    if (n === null) {
      setFeedback("bad");
      setEarnedPts(0);
      playWrong();
      setStreakOk(0);
      setWrongCount((c) => c + 1);
      setFailTags((t) => [...t, ex.type]);
      recordSkill(ex.type, "bad");
      awardWrong();
      return;
    }
    if (n === ex.answer) {
      const basePts = ex.type === "problema" ? 15 : 10;
      const pts = practice ? 0 : basePts;
      setEarnedPts(pts);
      setFeedback("ok");
      playCorrect();
      setStreakOk((s) => s + 1);
      setCorrectCount((c) => c + 1);
      recordSkill(ex.type, "ok");
      awardCorrect(practice ? 0 : basePts);
    } else {
      setFeedback("bad");
      setEarnedPts(0);
      playWrong();
      awardWrong();
      setStreakOk(0);
      setWrongCount((c) => c + 1);
      setFailTags((t) => [...t, ex.type]);
      recordSkill(ex.type, "bad");
    }
  }

  function next() {
    if (idx < questions.length - 1) {
      setIdx(idx + 1);
      setInput("");
      setFeedback(null);
      setEarnedPts(0);
      setHintUsed(false);
    } else {
      if (wrongCount === 0 && correctCount > 0 && playMode === "official") {
        recordPerfectMission();
      }
      completeSession();
      setShowSummary(true);
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => {
            clearSession();
            setView("math");
          }}
          className="grid h-11 w-11 place-items-center rounded-lg border border-border bg-surface"
          aria-label="Volver"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted">
            Nivel {levelName} · {idx + 1}/{questions.length}
            {practice ? " · entrenamiento" : " · misión oficial"}
          </p>
          <h1 className="font-display text-xl font-semibold text-fg">Torre de Números</h1>
        </div>
        <ModeBadge mode={playMode} />
      </div>

      <div className="flex gap-1.5">
        {questions.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-2.5 flex-1 rounded-full",
              i < idx ? "bg-success" : i === idx ? "bg-primary" : "bg-surface-2",
            )}
          />
        ))}
      </div>

      <div className="space-y-4 rounded-xl border border-border bg-card p-5 sm:p-6">
        <span
          className={cn(
            "inline-flex rounded-full px-3 py-1 text-sm font-semibold",
            typeColor[ex.type] ?? "bg-surface-2 text-fg",
          )}
        >
          {TYPE_LABELS[ex.type as MathExerciseType] ?? ex.type}
        </span>
        <p className="whitespace-pre-line font-display text-[1.35rem] font-semibold leading-snug text-fg sm:text-2xl">
          {ex.prompt}
        </p>

        <label className="block space-y-1.5">
          <span className="text-sm text-muted">Tu respuesta (número entero)</span>
          <input
            inputMode="numeric"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !answered && submit()}
            className="min-h-16 w-full rounded-xl border border-border bg-surface px-4 text-2xl tabular-nums text-fg outline-none ring-primary focus:ring-2"
            placeholder="Escribe aquí…"
            disabled={answered}
          />
        </label>

        {feedback === "ok" && (
          <AnswerFeedback
            kind="ok"
            title={correctCheer(streakOk, "math")}
            points={earnedPts}
            practice={practice}
          />
        )}
        {feedback === "bad" && (
          <AnswerFeedback
            kind="bad"
            title="¡Casi! La magia se entrena con calma."
            correctAnswer={String(ex.answer)}
            body={explanation}
          />
        )}

        {!answered && <HintBox text={ex.hint} used={hintUsed} />}

        <PlayActions
          answered={answered}
          isLast={idx >= questions.length - 1}
          onCheck={submit}
          onNext={next}
          onHint={() => setHintUsed(true)}
          hintUsed={hintUsed}
        />
      </div>
    </div>
  );
}
