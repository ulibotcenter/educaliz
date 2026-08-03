import { HelpCircle } from "lucide-react";

/**
 * Standard action row for all subjects:
 * - Before answer: Comprobar (+ optional hint)
 * - After answer: Siguiente pregunta / Ver resumen
 */
export function PlayActions({
  answered,
  isLast,
  onCheck,
  onNext,
  onHint,
  hintUsed,
  showHint = true,
  checkLabel = "Comprobar",
}: {
  answered: boolean;
  isLast: boolean;
  onCheck: () => void;
  onNext: () => void;
  onHint?: () => void;
  hintUsed?: boolean;
  showHint?: boolean;
  checkLabel?: string;
}) {
  if (answered) {
    return (
      <button
        type="button"
        onClick={onNext}
        className="min-h-14 w-full rounded-xl bg-primary text-base font-bold text-primary-fg shadow-md"
      >
        {isLast ? "Ver resumen" : "Siguiente pregunta"}
      </button>
    );
  }

  return (
    <div className="flex w-full flex-wrap gap-2">
      <button
        type="button"
        onClick={onCheck}
        className="min-h-14 min-w-0 flex-1 rounded-xl bg-primary text-base font-semibold text-primary-fg"
      >
        {checkLabel}
      </button>
      {showHint && onHint && (
        <button
          type="button"
          onClick={onHint}
          disabled={hintUsed}
          className="inline-flex min-h-14 shrink-0 items-center gap-1.5 rounded-xl border border-border bg-surface px-3 text-sm text-muted disabled:opacity-50"
        >
          <HelpCircle className="h-4 w-4" />
          {hintUsed ? "Pista usada" : "Pista"}
        </button>
      )}
    </div>
  );
}
