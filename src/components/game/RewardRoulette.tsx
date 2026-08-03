import { useMemo, useState } from "react";
import { Gift, Lock, Sparkles, Star } from "lucide-react";
import { useGameStore } from "@/lib/game-store";
import {
  ROULETTE_PRIZES,
  prizeById,
  type RoulettePrize,
} from "@/lib/roulette-prizes";
import { playRoulettePrize, playRouletteSpin } from "@/lib/sounds";
import { TempBadgeChip } from "@/components/game/BadgeChips";
import { cn } from "@/lib/utils";

/** 5.5–6.5s feel; fixed 6.2s for sound sync */
const SPIN_MS = 6200;
const N = ROULETTE_PRIZES.length;
const SLICE = 360 / N;

export function RewardRoulette() {
  const spins = useGameStore((s) => s.rouletteSpins);
  const lastSpinDate = useGameStore((s) => s.lastRouletteDate);
  const spinRoulette = useGameStore((s) => s.spinRoulette);
  const tempBadges = useGameStore((s) => s.tempBadges);
  const touchActivity = useGameStore((s) => s.touchActivity);

  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [resultMsg, setResultMsg] = useState<string | null>(null);
  const [wonPrize, setWonPrize] = useState<RoulettePrize | null>(null);
  const [revealKey, setRevealKey] = useState(0);
  const [highlightIdx, setHighlightIdx] = useState<number | null>(null);
  const [deniedMsg, setDeniedMsg] = useState<string | null>(null);

  const today = new Date().toISOString().slice(0, 10);
  const freeToday = lastSpinDate !== today;
  const bonusSpins = Math.max(0, spins);
  const available = bonusSpins + (freeToday ? 1 : 0);
  const canSpin = available > 0 && !spinning;

  const tempList = useMemo(
    () => Object.entries(tempBadges).filter(([, exp]) => exp > Date.now()),
    [tempBadges],
  );

  const conic = ROULETTE_PRIZES.map((s, i) => {
    const start = i * SLICE;
    const end = (i + 1) * SLICE;
    return `${s.color} ${start}deg ${end}deg`;
  }).join(", ");

  function spin() {
    if (!canSpin) {
      setDeniedMsg(
        freeToday
          ? "Espera un momento… la ruleta se está preparando."
          : "No te quedan giros. ¡Completa una partida oficial o vuelve mañana por el giro gratis!",
      );
      window.setTimeout(() => setDeniedMsg(null), 3500);
      return;
    }
    setDeniedMsg(null);
    touchActivity();
    setSpinning(true);
    setResultMsg(null);
    setWonPrize(null);
    setHighlightIdx(null);

    const idx = Math.floor(Math.random() * N);
    const targetInSlice = idx * SLICE + SLICE / 2;
    const land = 360 - targetInSlice;
    const extra = 10 * 360 + land;
    setRotation((r) => {
      const base = Math.ceil(r / 360) * 360;
      return base + extra;
    });

    playRouletteSpin(SPIN_MS);

    window.setTimeout(() => {
      const prize = ROULETTE_PRIZES[idx]!;
      const msg = spinRoulette(prize.id);
      // Store may reject if spins race to 0
      if (msg === "No te quedan giros.") {
        setDeniedMsg(msg);
        setSpinning(false);
        return;
      }
      setResultMsg(msg);
      setWonPrize(prizeById(prize.id) ?? prize);
      setHighlightIdx(idx);
      setRevealKey((k) => k + 1);
      setSpinning(false);
      playRoulettePrize();
    }, SPIN_MS);
  }

  return (
    <section className="relative space-y-5 overflow-hidden rounded-2xl border-2 border-primary/50 bg-gradient-to-br from-primary/20 via-card to-accent/20 p-4 shadow-[0_0_48px_color-mix(in_oklab,var(--color-primary)_22%,transparent)] sm:p-6">
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-accent/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-14 -left-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl"
        aria-hidden
      />

      <div className="relative flex items-start gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 text-primary shadow-inner ring-1 ring-primary/30">
          <Gift className="h-6 w-6" aria-hidden />
        </span>
        <div className="min-w-0">
          <h2 className="font-display text-xl font-semibold tracking-tight text-fg">
            Ruleta de Recompensas
          </h2>
          <p className="mt-0.5 text-sm text-muted">
            1 giro gratis al día · +1 giro al completar cada partida oficial.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold",
                available > 0
                  ? "border-primary/35 bg-primary/15 text-fg"
                  : "border-border bg-surface-2 text-muted",
              )}
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
              Giros disponibles: {available}
            </span>
            {freeToday ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-success/40 bg-success/15 px-2.5 py-1 text-xs font-bold text-success">
                <Star className="h-3 w-3" />
                Incluye 1 gratis de hoy
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium text-muted">
                Gratis de hoy: ya usado
              </span>
            )}
            {bonusSpins > 0 && (
              <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/15 px-2.5 py-1 text-xs font-bold text-fg">
                Extra por partidas: {bonusSpins}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Wheel stage — keep existing visual structure below via remaining file */}
      <div className="relative mx-auto w-full max-w-[320px] select-none">
        <div
          className={cn(
            "pointer-events-none absolute inset-[-10px] rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 blur-md",
            spinning && "roulette-glow-pulse",
          )}
          aria-hidden
        />
        {/* Pointer */}
        <div
          className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1"
          aria-hidden
        >
          <div className="h-0 w-0 border-l-[12px] border-r-[12px] border-t-[22px] border-l-transparent border-r-transparent border-t-primary drop-shadow-md" />
        </div>

        <div className="relative aspect-square w-full">
          <div
            className="absolute inset-0 rounded-full border-[6px] border-primary/50 shadow-[inset_0_0_24px_rgba(0,0,0,0.15),0_8px_28px_rgba(0,0,0,0.12)]"
            style={{
              background: `conic-gradient(from -${SLICE / 2}deg, ${conic})`,
              transform: `rotate(${rotation}deg)`,
              transition: spinning
                ? `transform ${SPIN_MS}ms cubic-bezier(0.12, 0.75, 0.12, 1)`
                : "none",
            }}
          >
            {ROULETTE_PRIZES.map((p, i) => {
              const mid = i * SLICE + SLICE / 2;
              const rad = ((mid - 90) * Math.PI) / 180;
              const r = 39;
              const x = 50 + r * Math.cos(rad);
              const y = 50 + r * Math.sin(rad);
              const won = !spinning && highlightIdx === i;
              return (
                <div
                  key={p.id}
                  className={cn(
                    "absolute flex w-[22%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center",
                    won && "scale-110 drop-shadow-md",
                  )}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <span
                    className="text-[1.15rem] leading-none sm:text-[1.35rem]"
                    aria-hidden
                  >
                    {p.emoji}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 max-w-full text-[9px] font-extrabold leading-[1.05] tracking-tight sm:text-[10px]",
                      p.textOn === "light"
                        ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]"
                        : "text-stone-900 drop-shadow-[0_1px_0_rgba(255,255,255,0.5)]",
                    )}
                  >
                    {p.wheelLabel}
                  </span>
                </div>
              );
            })}
            <div className="absolute left-1/2 top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-primary/70 bg-gradient-to-br from-card via-primary/20 to-accent/30 shadow-[0_0_14px_color-mix(in_oklab,var(--color-primary)_40%,transparent),inset_0_2px_6px_rgba(255,255,255,0.35)] sm:h-12 sm:w-12">
              <Sparkles className="h-4 w-4 text-primary sm:h-5 sm:w-5" aria-hidden />
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        disabled={!canSpin}
        onClick={spin}
        aria-disabled={!canSpin}
        className={cn(
          "relative min-h-14 w-full rounded-2xl text-base font-bold transition sm:text-lg",
          canSpin
            ? "bg-gradient-to-r from-primary to-accent/90 text-primary-fg shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.99]"
            : "cursor-not-allowed border-2 border-dashed border-border bg-surface-2 text-muted",
        )}
      >
        {spinning ? (
          "✨ Girando la magia…"
        ) : canSpin ? (
          "¡Girar la ruleta!"
        ) : (
          <span className="inline-flex items-center justify-center gap-2">
            <Lock className="h-4 w-4" aria-hidden />
            Sin giros · juega una partida o vuelve mañana
          </span>
        )}
      </button>

      {!canSpin && !spinning && (
        <p className="rounded-xl border border-border bg-surface/80 px-3 py-2.5 text-center text-sm text-muted">
          <strong className="text-fg">Cómo ganar giros:</strong> 1 gratis cada
          día + 1 extra al terminar una partida oficial (Misión de hoy o por
          nivel).
        </p>
      )}

      {deniedMsg && (
        <p
          className="rounded-xl border border-danger/40 bg-danger/10 px-3 py-2 text-center text-sm font-semibold text-danger"
          role="status"
        >
          {deniedMsg}
        </p>
      )}

      {resultMsg && wonPrize && (
        <div
          key={revealKey}
          className="roulette-reveal relative overflow-hidden rounded-2xl border-2 border-primary/60 bg-gradient-to-br from-primary/20 via-card to-accent/15 p-5 text-center confetti-burst shadow-[0_0_28px_color-mix(in_oklab,var(--color-primary)_30%,transparent)]"
        >
          <p className="text-[11px] font-bold uppercase tracking-wide text-primary">
            ¡Premio revelado!
          </p>
          <p className="mt-1 text-4xl drop-shadow" aria-hidden>
            {wonPrize.emoji}
          </p>
          <p className="mt-2 font-display text-xl font-semibold text-fg">
            {resultMsg}
          </p>
          <p className="mt-1 text-sm font-medium text-primary">
            {wonPrize.fullName}
          </p>
          {wonPrize.id.startsWith("badge-") && (
            <p className="mt-2 text-xs text-muted">
              ¡Toca la insignia temporal abajo para verla y equipar el brillo en
              tu avatar!
            </p>
          )}
        </div>
      )}

      <div className="space-y-2 rounded-xl border-2 border-dashed border-accent/55 bg-gradient-to-br from-accent/15 to-primary/10 p-3.5 text-sm">
        <p className="font-semibold text-fg">
          Insignias temporales · toca para usar
        </p>
        <p className="text-xs text-muted">
          Son extras mágicos (no permanentes). Toca una para leer su efecto y
          equipar el brillo en tu avatar. Si pasas 24 h sin entrar, se pierden.
        </p>
        {tempList.length === 0 ? (
          <p className="text-xs text-muted">
            Aún no tienes insignias temporales. ¡Gíralas en la ruleta!
          </p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {tempList.map(([id, exp]) => (
              <li key={id}>
                <TempBadgeChip id={id} showBlurb expiresAt={exp} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
