import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Swords } from "lucide-react";
import { MATH_BANK, LANG_BANK, ENG_BANK, pickRandom } from "@/lib/data/question-banks";
import { useGameStore } from "@/lib/game-store";
import { playCorrect, playWrong, playMissionGreat, playMissionLow } from "@/lib/sounds";
import { cn, normalizeAnswer, normalizeNumberInput } from "@/lib/utils";
import { shuffleAnswerOptions } from "@/lib/shuffle";
import { AnswerFeedback } from "@/components/game/AnswerFeedback";
import { MissionSummary } from "@/components/game/MissionSummary";
import { PlayActions } from "@/components/game/PlayActions";

type Zone = "math" | "language" | "english";

type BossQ =
  | { kind: "math"; prompt: string; answer: number; explanation: string; tag: string }
  | {
      kind: "lang";
      prompt: string;
      sentence: string;
      options: string[];
      answer: string;
      explanation: string;
      tag: string;
    }
  | {
      kind: "eng";
      prompt: string;
      promptEs: string;
      options: string[];
      answer: string;
      explanation: string;
      tag: string;
    };

const ZONE_META: Record<
  Zone,
  { title: string; guardian: string; map: "math" | "language" | "english" }
> = {
  math: {
    title: "Prueba del Guardián de los Números",
    guardian: "Un ser de dígitos dorados bloquea la cima de la Torre…",
    map: "math",
  },
  language: {
    title: "Prueba de la Bibliotecaria",
    guardian: "La Bibliotecaria de las Sombras abre un libro vacío…",
    map: "language",
  },
  english: {
    title: "Trial of the English Sphinx",
    guardian: "The Sphinx smiles: five English riddles await…",
    map: "english",
  },
};

function buildBossQuestions(zone: Zone): BossQ[] {
  if (zone === "math") {
    const pool = MATH_BANK.filter((q) => q.level >= 4);
    return pickRandom(pool, 5).map((ex) => ({
      kind: "math" as const,
      prompt: ex.prompt,
      answer: ex.answer,
      explanation: ex.explanation,
      tag: ex.type,
    }));
  }
  if (zone === "language") {
    return pickRandom(LANG_BANK.filter((q) => q.level >= 3), 5).map((s) => ({
      kind: "lang" as const,
      prompt: s.title,
      sentence: s.text || s.title,
      options: s.options,
      answer: s.answer,
      explanation: s.explanation,
      tag: s.skillTag,
    }));
  }
  return pickRandom(ENG_BANK.filter((q) => q.level >= 3), 5).map((t) => ({
    kind: "eng" as const,
    prompt: t.prompt,
    promptEs: t.promptEs,
    options: t.options,
    answer: t.answer,
    explanation: t.explanation,
    tag: t.kind,
  }));
}

function grantBossHit(pts: number) {
  useGameStore.setState((s) => ({
    points: s.points + pts,
    xp: s.xp + pts,
    totalCorrect: s.totalCorrect + 1,
  }));
}

export function BossBattle({ zone }: { zone: Zone }) {
  const setView = useGameStore((s) => s.setView);
  const beatBoss = useGameStore((s) => s.beatBoss);
  const playerName = useGameStore((s) => s.playerName);
  const setPlayMode = useGameStore((s) => s.setPlayMode);
  const bossBeaten = useGameStore((s) => s.bossBeaten);
  const awardWrong = useGameStore((s) => s.awardWrong);
  const recordSkill = useGameStore((s) => s.recordSkill);

  const questions = useMemo(() => buildBossQuestions(zone), [zone]);
  const meta = ZONE_META[zone];

  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [choice, setChoice] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"ok" | "bad" | null>(null);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [failTags, setFailTags] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [victory, setVictory] = useState(false);
  const [opts, setOpts] = useState<string[]>([]);

  useEffect(() => {
    const qq = questions[idx];
    if (!qq) return;
    if (qq.kind === "lang") setOpts(shuffleAnswerOptions(qq.options, qq.answer));
    else if (qq.kind === "eng") setOpts(shuffleAnswerOptions(qq.options, qq.answer));
    else setOpts([]);
  }, [idx, questions]);

  const q = questions[idx]!;
  const answered = feedback === "ok" || feedback === "bad";

  function submit() {
    if (answered) return;
    let ok = false;
    if (q.kind === "math") {
      const n = normalizeNumberInput(input);
      ok = n === q.answer;
    } else {
      ok = choice !== null && normalizeAnswer(choice) === normalizeAnswer(q.answer);
    }
    if (ok) {
      setFeedback("ok");
      playCorrect();
      setCorrect((c) => c + 1);
      recordSkill(q.tag, "ok");
      grantBossHit(20);
    } else {
      setFeedback("bad");
      playWrong();
      setWrong((w) => w + 1);
      setFailTags((t) => [...t, q.tag]);
      recordSkill(q.tag, "bad");
      awardWrong();
    }
  }

  function next() {
    const isLast = idx >= questions.length - 1;
    if (!isLast) {
      setFeedback(null);
      setInput("");
      setChoice(null);
      setIdx(idx + 1);
      return;
    }
    const totalOk = correct;
    const win = totalOk >= 3;
    setVictory(win);
    if (win && !bossBeaten[zone]) {
      beatBoss(zone);
      playMissionGreat();
    } else if (!win) {
      playMissionLow();
    } else {
      playMissionGreat();
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="space-y-4">
        {victory && (
          <div className="rounded-xl border border-success/40 bg-success/10 p-4 text-sm text-fg">
            <p className="font-display text-lg font-semibold text-success">
              ¡Victoria, {playerName}!
            </p>
            <p className="mt-1 text-muted">
              Has vencido la prueba. Recompensa: insignia especial + 80 XP + 50 puntos + un capítulo
              de la historia.
            </p>
          </div>
        )}
        {!victory && (
          <div className="rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm text-fg">
            <p className="font-display text-lg font-semibold">El guardián te espera otra vez</p>
            <p className="mt-1 text-muted">
              Necesitas al menos 3 aciertos de 5. Entrena un poco y vuelve a intentarlo — ¡tú puedes!
            </p>
          </div>
        )}
        <MissionSummary
          correct={correct}
          wrong={wrong}
          failTags={failTags}
          area={zone}
          playerName={playerName}
          onContinue={() => setView(meta.map)}
          practiceLabel="Entrenar más"
          onPractice={() => {
            setPlayMode("practice");
            setView(meta.map);
          }}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setView(meta.map)}
          className="grid h-11 w-11 place-items-center rounded-lg border border-border bg-surface"
          aria-label="Volver"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="inline-flex items-center gap-1 text-xs font-medium text-danger">
            <Swords className="h-3.5 w-3.5" />
            Batalla final · {idx + 1}/{questions.length}
          </p>
          <h1 className="font-display text-lg font-semibold text-fg sm:text-xl">{meta.title}</h1>
        </div>
      </div>

      <p className="text-sm text-muted">{meta.guardian}</p>

      <div className="space-y-4 rounded-xl border border-danger/30 bg-card p-5">
        {q.kind === "math" && (
          <>
            <p className="whitespace-pre-line font-display text-xl font-semibold text-fg">
              {q.prompt}
            </p>
            <input
              inputMode="numeric"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={answered}
              className="min-h-14 w-full rounded-xl border border-border bg-surface px-4 text-xl tabular-nums text-fg outline-none ring-primary focus:ring-2"
              placeholder="Respuesta…"
            />
          </>
        )}
        {q.kind === "lang" && (
          <>
            <p className="text-base font-semibold text-fg">{q.prompt}</p>
            <div className="rounded-xl border-2 border-accent/40 bg-surface-2 px-4 py-4">
              <p className="font-display text-lg font-semibold text-fg">{q.sentence}</p>
            </div>
            <div className="space-y-2">
              {opts.map((o) => (
                <button
                  key={o}
                  type="button"
                  disabled={answered}
                  onClick={() => setChoice(o)}
                  className={cn(
                    "w-full min-h-14 rounded-xl border px-3 text-left text-base",
                    choice === o ? "border-primary bg-primary/15" : "border-border bg-surface",
                  )}
                >
                  {o}
                </button>
              ))}
            </div>
          </>
        )}
        {q.kind === "eng" && (
          <>
            <p className="text-sm text-muted">{q.promptEs}</p>
            <p className="font-display text-xl font-semibold text-fg">{q.prompt}</p>
            <div className="space-y-2">
              {opts.map((o) => (
                <button
                  key={o}
                  type="button"
                  disabled={answered}
                  onClick={() => setChoice(o)}
                  className={cn(
                    "w-full min-h-14 rounded-xl border px-3 text-left text-base",
                    choice === o
                      ? "border-accent-2 bg-accent-2/15"
                      : "border-border bg-surface",
                  )}
                >
                  {o}
                </button>
              ))}
            </div>
          </>
        )}

        {feedback === "ok" && (
          <AnswerFeedback kind="ok" title="¡El guardián retrocede!" points={20} />
        )}
        {feedback === "bad" && (
          <AnswerFeedback
            kind="bad"
            title="¡Casi! El guardián sonríe con amabilidad."
            correctAnswer={String(q.answer)}
            body={q.explanation}
          />
        )}

        <PlayActions
          answered={answered}
          isLast={idx >= questions.length - 1}
          onCheck={submit}
          onNext={next}
          showHint={false}
          checkLabel="Lanzar hechizo"
        />
      </div>
    </div>
  );
}
