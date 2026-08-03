import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ENG_BANK, LEVEL_META, type EngQ } from "@/lib/data/question-banks";
import { useGameStore } from "@/lib/game-store";
import { playCorrect, playWrong } from "@/lib/sounds";
import { cn, normalizeAnswer } from "@/lib/utils";
import { shuffleAnswerOptions } from "@/lib/shuffle";
import { AnswerFeedback, HintBox } from "@/components/game/AnswerFeedback";
import { ModeBadge } from "@/components/game/ModeToggle";
import { MissionSummary } from "@/components/game/MissionSummary";
import { PlayActions } from "@/components/game/PlayActions";

export function EnglishPlay() {
  const setView = useGameStore((s) => s.setView);
  const playMode = useGameStore((s) => s.playMode);
  const playerName = useGameStore((s) => s.playerName);
  const awardCorrect = useGameStore((s) => s.awardCorrect);
  const awardWrong = useGameStore((s) => s.awardWrong);
  const recordSkill = useGameStore((s) => s.recordSkill);
  const setPlayMode = useGameStore((s) => s.setPlayMode);
  const completeSession = useGameStore((s) => s.completeSession);
  const clearSession = useGameStore((s) => s.clearSession);

  const [questions] = useState<EngQ[]>(() => {
    const s = useGameStore.getState().session;
    if (!s || s.area !== "english") return [];
    return s.ids
      .map((id) => ENG_BANK.find((q) => q.id === id))
      .filter(Boolean) as EngQ[];
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
        area="english"
        playerName={playerName}
        onContinue={() => {
          clearSession();
          setView("english");
        }}
        practiceLabel="Practice mode"
        onPractice={() => {
          setPlayMode("practice");
          clearSession();
          setView("english");
        }}
      />
    );
  }

  if (!q) {
    return (
      <button type="button" onClick={() => setView("english")} className="text-primary">
        Back
      </button>
    );
  }

  const practice = playMode === "practice";
  const answered = feedback === "ok" || feedback === "bad";
  const levelName = LEVEL_META[levelSnap as 1 | 2 | 3 | 4 | 5].name;

  function submit() {
    if (!choice || answered) return;
    if (normalizeAnswer(choice) === normalizeAnswer(q.answer)) {
      const pts = practice ? 0 : 10;
      setEarnedPts(pts);
      setFeedback("ok");
      playCorrect();
      awardCorrect(practice ? 0 : 10);
      setCorrectCount((n) => n + 1);
      recordSkill(q.kind, "ok");
    } else {
      setFeedback("bad");
      setEarnedPts(0);
      playWrong();
      awardWrong();
      setWrongCount((n) => n + 1);
      setFailTags((t) => [...t, q.kind]);
      recordSkill(q.kind, "bad");
    }
  }

  function next() {
    if (idx < questions.length - 1) setIdx(idx + 1);
    else {
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
            setView("english");
          }}
          className="grid h-11 w-11 place-items-center rounded-lg border border-border bg-surface"
          aria-label="Volver"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted">
            Level {levelName} · {idx + 1}/{questions.length}
          </p>
          <h1 className="font-display text-xl font-semibold text-fg">Cámara del Inglés</h1>
        </div>
        <ModeBadge mode={playMode} />
      </div>

      <div className="space-y-4 rounded-xl border border-border bg-card p-5 sm:p-6">
        <p className="text-base text-muted">{q.promptEs}</p>
        <p className="font-display text-xl font-semibold text-fg sm:text-2xl">{q.prompt}</p>

        <div className="space-y-2.5">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              disabled={answered}
              onClick={() => setChoice(opt)}
              className={cn(
                "w-full min-h-14 rounded-xl border px-4 text-left text-base font-medium",
                choice === opt
                  ? "border-accent-2 bg-accent-2/15"
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
            title="Great! English magic works!"
            points={earnedPts}
            practice={practice}
          />
        )}
        {feedback === "bad" && (
          <AnswerFeedback
            kind="bad"
            title="Almost! Remember this spell."
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
          checkLabel="Comprobar"
        />
      </div>
    </div>
  );
}
