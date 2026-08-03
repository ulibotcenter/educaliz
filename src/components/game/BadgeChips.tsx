import { cn } from "@/lib/utils";
import { ALL_BADGES } from "@/lib/progression";
import { TEMP_BADGE_LABELS, type TempBadgeInfo } from "@/lib/roulette-prizes";

const GLOW: Record<string, string> = {
  gold: "border-primary/50 bg-primary/15 shadow-[0_0_18px_color-mix(in_oklab,var(--color-primary)_35%,transparent)]",
  violet:
    "border-accent/50 bg-accent/15 shadow-[0_0_18px_color-mix(in_oklab,var(--color-accent)_35%,transparent)]",
  teal: "border-success/40 bg-success/10 shadow-[0_0_14px_color-mix(in_oklab,var(--color-success)_30%,transparent)]",
  rose: "border-danger/40 bg-danger/10 shadow-[0_0_14px_color-mix(in_oklab,var(--color-danger)_28%,transparent)]",
};

const TEMP_HUE: Record<TempBadgeInfo["hue"], string> = {
  mint: "from-emerald-400/30 to-teal-500/20 border-emerald-300/60",
  ember: "from-orange-400/35 to-rose-500/25 border-orange-300/60",
  sky: "from-sky-400/30 to-indigo-500/25 border-sky-300/60",
};

/** Permanent badge card — solid look, soft glow by type */
export function PermanentBadgeCard({
  id,
  compact,
}: {
  id: string;
  compact?: boolean;
}) {
  const info = ALL_BADGES[id];
  const glow = GLOW[info?.glow ?? "violet"] ?? GLOW.violet;
  if (compact) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs text-fg",
          glow,
        )}
      >
        <span aria-hidden>{info?.emoji ?? "🏅"}</span>
        {info?.name ?? id}
      </span>
    );
  }
  return (
    <li className={cn("flex gap-3 rounded-xl border p-3", glow)}>
      <span
        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-card/70 text-2xl"
        aria-hidden
      >
        {info?.emoji ?? "🏅"}
      </span>
      <span className="min-w-0">
        <p className="font-semibold text-fg">{info?.name ?? id}</p>
        <p className="text-xs text-muted">{info?.desc}</p>
        <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-primary/80">
          Permanente
        </p>
      </span>
    </li>
  );
}

/** Temporary badge — dashed glow ring, timed feel */
export function TempBadgeChip({
  id,
  showBlurb,
}: {
  id: string;
  showBlurb?: boolean;
}) {
  const info = TEMP_BADGE_LABELS[id];
  const hue = TEMP_HUE[info?.hue ?? "sky"];
  return (
    <span
      className={cn(
        "temp-badge-pulse inline-flex max-w-full items-center gap-2 rounded-2xl border-2 border-dashed bg-gradient-to-br px-3 py-2 text-sm font-semibold text-fg",
        hue,
      )}
    >
      <span className="text-lg" aria-hidden>
        {info?.emoji ?? "⏳"}
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block">{info?.name ?? id}</span>
        {showBlurb && info?.blurb && (
          <span className="block text-[11px] font-normal text-muted">{info.blurb}</span>
        )}
        <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-wide text-accent">
          Temporal · 24 h
        </span>
      </span>
    </span>
  );
}
