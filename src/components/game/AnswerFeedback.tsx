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
      <div className="relative overflow-hidden rounded-xl bg-success/10 p-4 text-base text-success">
        <div className="pointer-events-none absolute inset-0 confetti-burst" aria-hidden />
        <div className="relative flex items-start gap-2">
          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0" />
          <div>
            <p className="text-lg font-semibold">{title}</p>
            {practice ? (
              <p className="mt-1 text-sm text-muted">
                Entrenamiento: ¡bien practicado! (sin puntos oficiales)
              </p>
            ) : points && points > 0 ? (
              <p className="mt-1 text-sm">+{points} puntos de magia</p>
            ) : (
              <p className="mt-1 text-sm text-muted">Ya tenías este hechizo oficial</p>
            )}
            {body && <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>}
          </div>
          <Sparkles className="ml-auto h-6 w-6 shrink-0 animate-pulse text-primary" aria-hidden />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-danger/10 p-4 text-base">
      <div className="flex items-start gap-2 text-danger">
        <XCircle className="mt-0.5 h-6 w-6 shrink-0" />
        <div className="space-y-2">
          <p className="text-lg font-semibold">{title}</p>
          {correctAnswer && (
            <p className="text-base text-fg">
              Respuesta correcta:{" "}
              <strong className="text-success">{correctAnswer}</strong>
            </p>
          )}
          {body && (
            <p className="text-sm leading-relaxed text-muted sm:text-base">{body}</p>
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
        "rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm leading-relaxed text-muted sm:text-base",
      )}
    >
      <span className="font-medium text-accent">Pista: </span>
      {text}
    </p>
  );
}
