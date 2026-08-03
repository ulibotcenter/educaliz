import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { LEVEL_META, LANG_BANK, type LangQ } from "@/lib/data/question-banks";
import { useGameStore } from "@/lib/game-store";
import { playCorrect, playWrong } from "@/lib/sounds";
import { cn, normalizeAnswer } from "@/lib/utils";
import { shuffleAnswerOptions } from "@/lib/shuffle";
import { AnswerFeedback, HintBox } from "@/components/game/AnswerFeedback";
import { ModeBadge } from "@/components/game/ModeToggle";
import { MissionSummary } from "@/components/game/MissionSummary";
import { PlayActions } from "@/components/game/PlayActions";

export function LanguagePlay() {
  const setView = useGameStore((s) => s.setView);
  const playMode = useGameStore((s) => s.playMode);
  const playerName = useGameStore((s) => s.playerName);
  const awardCorrect = useGameStore((s) => s.awardCorrect);
  const awardWrong = useGameStore((s) => s.awardWrong);
  const recordSkill = useGameStore((s) => s.recordSkill);
  const setPlayMode = useGameStore((s) => s.setPlayMode);
  const completeSession = useGameStore((s) => s.completeSession);
  const clearSession = useGameStore((s) => s.clearSession);

  const [questions] = useState<LangQ[]>(() => {
    const s = useGameStore.getState().session;
    if (!s || s.area !== "language") return [];
    return s.ids
      .map((id) => LANG_BANK.find((q) => q.id === id))
      .filter(Boolean) as LangQ[];
  });
  const [levelSnap] = useState(
    () => useGameStore.getState().session?.level ?? 1,
  );

  const [idx, setIdx] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"ok" | "bad" | null>(null);
  const [earnedPts, setEarnedPts] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [failTags, setFailTags] = useState<string[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const q = questions[idx];

  useEffect(() => {
    if (!q || showSummary) return;
    setOptions(shuffleAnswerOptions(q.options, q.answer));
    setChoice(null);
    setFeedback(null);
    setEarnedPts(0);
    setHintUsed(false);
  }, [q, idx, showSummary]);

  if (showSummary) {
    return (
      <MissionSummary
        correct={correctCount}
        wrong={wrongCount}
        failTags={failTags}
        area="language"
        playerName={playerName}
        onContinue={() => {
          clearSession();
          setView("language");
        }}
        practiceLabel="Practicar en Entrenamiento"
        onPractice={() => {
          setPlayMode("practice");
          clearSession();
          setView("language");
        }}
      />
    );
  }

  if (!q) {
    return (
      <button type="button" onClick={() => setView("language")} className="text-primary">
        Volver a la biblioteca
      </button>
    );
  }

  const practice = playMode === "practice";
  const answered = feedback === "ok" || feedback === "bad";
  const levelName = LEVEL_META[levelSnap as 1 | 2 | 3 | 4 | 5].name;

  function submit() {
    if (!choice || answered) return;
    if (normalizeAnswer(choice) === normalizeAnswer(q.answer)) {
      const pts = practice ? 0 : 12;
      setEarnedPts(pts);
      setFeedback("ok");
      playCorrect();
      awardCorrect(practice ? 0 : 12);
      setCorrectCount((n) => n + 1);
      recordSkill(q.skillTag, "ok");
    } else {
      setFeedback("bad");
      setEarnedPts(0);
      playWrong();
      awardWrong();
      setWrongCount((n) => n + 1);
      setFailTags((t) => [...t, q.skillTag]);
      recordSkill(q.skillTag, "bad");
    }
  }

  function next() {
    if (idx < questions.length - 1) {
      setIdx(idx + 1);
    } else {
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
            setView("language");
          }}
          className="grid h-11 w-11 place-items-center rounded-lg border border-border bg-surface"
          aria-label="Volver"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted">
            Nivel {levelName} · {idx + 1}/{questions.length}
          </p>
          <h1 className="font-display text-xl font-semibold text-fg">Biblioteca Misteriosa</h1>
        </div>
        <ModeBadge mode={playMode} />
      </div>

      <div className="space-y-5 rounded-xl border border-border bg-card p-5 sm:p-6">
        <div>
          <h2 className="font-display text-xl font-semibold text-fg sm:text-2xl">{q.title}</h2>
          <p className="mt-1.5 text-sm text-muted">{q.tip}</p>
        </div>

        {q.showSentence && q.text && (
          <div className="rounded-xl border-2 border-accent/50 bg-surface-2 px-4 py-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">
              Oración a analizar
            </p>
            <p className="font-display text-xl font-semibold text-fg">{q.text}</p>
          </div>
        )}

        <div className="space-y-2.5">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              disabled={answered}
              onClick={() => setChoice(opt)}
              className={cn(
                "w-full min-h-14 rounded-xl border px-4 py-3 text-left text-base",
                choice === opt
                  ? "border-primary bg-primary/15"
                  : "border-border bg-surface",
              )}
            >
              {opt}
            </button>
          ))}
        </div>

        {feedback === "ok" && (
          <AnswerFeedback
            kind="ok"
            title="¡Bien! La biblioteca te sonríe."
            points={earnedPts}
            practice={practice}
          />
        )}
        {feedback === "bad" && (
          <AnswerFeedback
            kind="bad"
            title="¡Casi! Las palabras te esperan."
            correctAnswer={q.answer}
            body={q.explanation}
          />
        )}

        {!answered && <HintBox text={q.hint} used={hintUsed} />}

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
