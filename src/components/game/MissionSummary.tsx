import { useEffect } from "react";
import { Sparkles, Target, ThumbsUp } from "lucide-react";
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

  useEffect(() => {
    playMissionResult(tier);
  }, [tier]);

  return (
    <div
      className={cn(
        "mx-auto max-w-lg space-y-5 rounded-xl border p-6",
        tier === "great" && "border-success/40 bg-success/10",
        tier === "ok" && "border-primary/40 bg-primary/10",
        tier === "low" && "border-accent/40 bg-accent/10",
      )}
    >
      <div className="flex items-start gap-3">
        {tier === "great" ? (
          <Sparkles className="h-8 w-8 shrink-0 text-primary" aria-hidden />
        ) : tier === "ok" ? (
          <ThumbsUp className="h-8 w-8 shrink-0 text-accent-2" aria-hidden />
        ) : (
          <Target className="h-8 w-8 shrink-0 text-accent" aria-hidden />
        )}
        <div>
          <h2 className="font-display text-2xl font-semibold text-fg">{msg.title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted sm:text-base">{msg.body}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Stat label="Aciertos" value={String(correct)} tone="success" />
        <Stat label="Errores" value={String(wrong)} tone="danger" />
        <Stat label="Porcentaje" value={`${percent}%`} tone="primary" />
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-surface-2">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            tier === "great" && "bg-success",
            tier === "ok" && "bg-primary",
            tier === "low" && "bg-accent",
          )}
          style={{ width: `${percent}%` }}
        />
      </div>

      {suggestion && (
        <p className="rounded-lg border border-border bg-card/80 px-3 py-3 text-sm leading-relaxed text-fg">
          <span className="font-semibold text-primary">Consejo mágico: </span>
          {suggestion}
        </p>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={onContinue}
          className="min-h-12 flex-1 rounded-lg bg-primary px-4 text-base font-semibold text-primary-fg"
        >
          Continuar
        </button>
        {suggestion && onPractice && (
          <button
            type="button"
            onClick={onPractice}
            className="min-h-12 flex-1 rounded-lg border border-border bg-surface px-4 text-sm font-medium text-fg"
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
    <div className="rounded-xl border border-border bg-card p-3 text-center">
      <p className={cn("font-display text-xl font-semibold tabular-nums", color)}>{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}
