import { CheckCircle2, Sparkles, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function AnswerFeedback({
  kind,
  title,
  body,
  correctAnswer,
  points,
  practice,
}: {
  kind: "ok" | "bad";
  title: string;
  body?: string;
  correctAnswer?: string;
  points?: number;
  practice?: boolean;
}) {
  if (kind === "ok") {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-success/30 bg-success/10 p-4 text-base text-success sm:p-5">
        <div className="pointer-events-none absolute inset-0 confetti-burst" aria-hidden />
        <div className="relative flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-7 w-7 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-lg font-bold leading-snug sm:text-xl">{title}</p>
            {practice ? (
              <p className="mt-1.5 text-base text-muted">
                Entrenamiento: ¡bien practicado! (sin puntos oficiales)
              </p>
            ) : points && points > 0 ? (
              <p className="mt-1.5 text-base font-semibold text-fg">
                +{points} puntos de magia ✨
              </p>
            ) : (
              <p className="mt-1.5 text-base text-muted">¡Sigue así, mago!</p>
            )}
            {body && (
              <p className="mt-2 text-base leading-relaxed text-muted">{body}</p>
            )}
          </div>
          <Sparkles
            className="ml-auto h-6 w-6 shrink-0 animate-pulse text-primary"
            aria-hidden
          />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-danger/25 bg-danger/10 p-4 text-base sm:p-5">
      <div className="flex items-start gap-3 text-danger">
        <XCircle className="mt-0.5 h-7 w-7 shrink-0" />
        <div className="min-w-0 space-y-2.5">
          <p className="text-lg font-bold leading-snug sm:text-xl">{title}</p>
          {correctAnswer && (
            <p className="text-base leading-snug text-fg sm:text-lg">
              Respuesta correcta:{" "}
              <strong className="text-success">{correctAnswer}</strong>
            </p>
          )}
          {body && (
            <p className="text-base leading-relaxed text-muted">{body}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function HintBox({ text, used }: { text: string; used: boolean }) {
  if (!used) return null;
  return (
    <p
      className={cn(
        "rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3.5 text-base leading-relaxed text-muted",
      )}
    >
      <span className="font-semibold text-accent">Pista: </span>
      {text}
    </p>
  );
}
