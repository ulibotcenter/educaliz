import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ALL_BADGES } from "@/lib/progression";
import {
  TEMP_BADGE_LABELS,
  hoursLeft,
  type TempBadgeInfo,
} from "@/lib/roulette-prizes";
import { useGameStore } from "@/lib/game-store";

const GLOW: Record<string, string> = {
  gold: "border-primary/50 bg-primary/15 shadow-[0_0_18px_color-mix(in_oklab,var(--color-primary)_35%,transparent)]",
  violet:
    "border-accent/50 bg-accent/15 shadow-[0_0_18px_color-mix(in_oklab,var(--color-accent)_35%,transparent)]",
  teal: "border-success/40 bg-success/10 shadow-[0_0_14px_color-mix(in_oklab,var(--color-success)_30%,transparent)]",
  rose: "border-danger/40 bg-danger/10 shadow-[0_0_14px_color-mix(in_oklab,var(--color-danger)_28%,transparent)]",
};

const TEMP_HUE: Record<TempBadgeInfo["hue"], string> = {
  mint: "from-emerald-400/30 to-teal-500/20 border-emerald-300/70",
  ember: "from-orange-400/35 to-rose-500/25 border-orange-300/70",
  sky: "from-sky-400/30 to-indigo-500/25 border-sky-300/70",
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

/** Temporary badge — clickable, equippable, dashed glow */
export function TempBadgeChip({
  id,
  showBlurb,
  expiresAt,
}: {
  id: string;
  showBlurb?: boolean;
  expiresAt?: number;
}) {
  const [open, setOpen] = useState(false);
  const equipped = useGameStore((s) => s.equippedTempBadge);
  const equipTempBadge = useGameStore((s) => s.equipTempBadge);
  const tempBadges = useGameStore((s) => s.tempBadges);
  const info = TEMP_BADGE_LABELS[id];
  const hue = TEMP_HUE[info?.hue ?? "sky"];
  const isEquipped = equipped === id;
  const exp = expiresAt ?? tempBadges[id] ?? 0;
  const left = exp > Date.now() ? hoursLeft(exp) : 0;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "temp-badge-pulse inline-flex max-w-full items-center gap-2 rounded-2xl border-2 border-dashed bg-gradient-to-br px-3 py-2 text-left text-sm font-semibold text-fg transition hover:brightness-110 active:scale-[0.98]",
          hue,
          isEquipped && "ring-2 ring-primary ring-offset-2 ring-offset-bg",
        )}
        aria-label={`${info?.name ?? id}. Toca para ver y equipar.`}
      >
        <span className="text-lg" aria-hidden>
          {info?.emoji ?? "⏳"}
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block">
            {info?.name ?? id}
            {isEquipped ? " · ✨" : ""}
          </span>
          {showBlurb && info?.blurb && (
            <span className="block text-[11px] font-normal text-muted">
              {info.blurb}
            </span>
          )}
          <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-wide text-accent">
            Temporal · {left > 0 ? `~${left} h` : "24 h"}
            {isEquipped ? " · equipada" : " · toca"}
          </span>
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-bg/70 p-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`temp-badge-${id}-title`}
          onClick={() => setOpen(false)}
        >
          <div
            className={cn(
              "relative w-full max-w-sm overflow-hidden rounded-2xl border-2 border-dashed bg-gradient-to-br p-5 shadow-xl",
              hue,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-fg"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 pr-10">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-card/80 text-3xl shadow-inner">
                {info?.emoji ?? "⏳"}
              </span>
              <div>
                <p
                  id={`temp-badge-${id}-title`}
                  className="font-display text-lg font-semibold text-fg"
                >
                  {info?.name ?? id}
                </p>
                <p className="text-xs font-bold uppercase tracking-wide text-accent">
                  Insignia temporal
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-fg">
              {info?.effect ?? info?.blurb ?? "Una insignia mágica de un día."}
            </p>
            <p className="mt-2 text-xs text-muted">
              {left > 0
                ? `Quedan unas ${left} hora${left === 1 ? "" : "s"} si sigues entrando cada día. Si pasas 24 h sin abrir la Academia, se desvanece.`
                : "Se desvanece si pasas 24 h sin entrar a la Academia."}
            </p>

            <div className="mt-5 grid gap-2">
              {isEquipped ? (
                <button
                  type="button"
                  onClick={() => {
                    equipTempBadge(null);
                    setOpen(false);
                  }}
                  className="min-h-12 rounded-xl border border-border bg-card font-semibold text-fg"
                >
                  Quitar brillo del avatar
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    equipTempBadge(id);
                    setOpen(false);
                  }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary font-bold text-primary-fg"
                >
                  <Sparkles className="h-4 w-4" />
                  Equipar en el avatar
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="min-h-11 text-sm font-semibold text-muted"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
