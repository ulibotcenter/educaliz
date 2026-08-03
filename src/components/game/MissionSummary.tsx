import { useEffect } from "react";
import { PartyPopper, Sparkles, Target, ThumbsUp } from "lucide-react";
import {
  missionMessages,
  missionTier,
  practiceSuggestion,
  type MissionTier,
} from "@/lib/explain";
import { playMissionResult } from "@/lib/sounds";
import { cn } from "@/lib/utils";

export type MissionSummaryStats = {
  correct: number;
  wrong: number;
  /** Categories of failed questions (e.g. "suma", "sujeto") */
  failTags: string[];
  area: "math" | "language" | "english";
  playerName: string;
  onContinue: () => void;
  /** Optional practice CTA label */
  practiceLabel?: string;
  onPractice?: () => void;
};

export function MissionSummary({
  correct,
  wrong,
  failTags,
  area,
  playerName,
  onContinue,
  practiceLabel,
  onPractice,
}: MissionSummaryStats) {
  const total = correct + wrong;
  const percent = total === 0 ? 0 : Math.round((correct / total) * 100);
  const tier: MissionTier = missionTier(percent);
  const msg = missionMessages(tier, playerName);
  const suggestion = percent < 50 ? practiceSuggestion(failTags, area) : null;
  const perfect = wrong === 0 && correct > 0;

  useEffect(() => {
    playMissionResult(tier);
  }, [tier]);

  return (
    <div
      className={cn(
        "mx-auto max-w-lg animate-fade-in space-y-5 rounded-2xl border-2 p-6 sm:p-7",
        tier === "great" && "border-success/45 bg-success/10",
        tier === "ok" && "border-primary/45 bg-primary/10",
        tier === "low" && "border-accent/45 bg-accent/10",
      )}
    >
      {perfect && (
        <p className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3 py-1.5 text-sm font-semibold text-fg">
          <PartyPopper className="h-4 w-4 text-primary" aria-hidden />
          ¡Partida perfecta!
        </p>
      )}

      <div className="flex items-start gap-3">
        {tier === "great" ? (
          <Sparkles className="h-9 w-9 shrink-0 text-primary" aria-hidden />
        ) : tier === "ok" ? (
          <ThumbsUp className="h-9 w-9 shrink-0 text-accent-2" aria-hidden />
        ) : (
          <Target className="h-9 w-9 shrink-0 text-accent" aria-hidden />
        )}
        <div>
          <h2 className="font-display text-2xl font-semibold leading-tight text-fg sm:text-3xl">
            {msg.title}
          </h2>
          <p className="mt-2 text-base leading-relaxed text-muted">{msg.body}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Stat label="Aciertos" value={String(correct)} tone="success" />
        <Stat label="Errores" value={String(wrong)} tone="danger" />
        <Stat label="Porcentaje" value={`${percent}%`} tone="primary" />
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-medium text-muted">
          <span>Tu magia de hoy</span>
          <span className="tabular-nums">{percent}%</span>
        </div>
        <div className="h-3.5 overflow-hidden rounded-full bg-surface-2">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-700",
              tier === "great" && "bg-success",
              tier === "ok" && "bg-primary",
              tier === "low" && "bg-accent",
            )}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {suggestion && (
        <p className="rounded-xl border border-border bg-card/90 px-4 py-3.5 text-base leading-relaxed text-fg">
          <span className="font-semibold text-primary">Consejo mágico: </span>
          {suggestion}
        </p>
      )}

      {!suggestion && tier === "great" && (
        <p className="text-center text-sm text-muted">
          ¿Listo para más magia? Puedes seguir con la misión de hoy o explorar el mapa.
        </p>
      )}

      <div className="flex flex-col gap-2.5 sm:flex-row">
        <button
          type="button"
          onClick={onContinue}
          className="min-h-14 flex-1 rounded-xl bg-primary px-4 text-base font-bold text-primary-fg shadow-md"
        >
          Continuar
        </button>
        {suggestion && onPractice && (
          <button
            type="button"
            onClick={onPractice}
            className="min-h-14 flex-1 rounded-xl border border-border bg-surface px-4 text-base font-semibold text-fg"
          >
            {practiceLabel ?? "Ir a Entrenamiento"}
          </button>
        )}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "success" | "danger" | "primary";
}) {
  const color =
    tone === "success"
      ? "text-success"
      : tone === "danger"
        ? "text-danger"
        : "text-primary";
  return (
    <div className="rounded-xl border border-border bg-card p-3 text-center sm:p-3.5">
      <p className={cn("font-display text-2xl font-semibold tabular-nums", color)}>{value}</p>
      <p className="text-xs text-muted sm:text-sm">{label}</p>
    </div>
  );
}
