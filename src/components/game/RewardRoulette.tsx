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
/** Keep pointer away from slice borders (~12% each side) */
const EDGE_PAD = SLICE * 0.12;
const FULL_TURNS = 10;

/**
 * Geometry (CSS):
 * - conic-gradient from 0° at top, clockwise
 * - slice i covers [i*SLICE, (i+1)*SLICE)
 * - positive CSS rotate moves the wheel clockwise
 * - pointer fixed at top (0°)
 * - wheel angle θ lands under pointer when rotation ≡ -θ (mod 360)
 */
export function pickLanding(idx: number, rand = Math.random()): {
  idx: number;
  /** Absolute angle on the wheel (deg) that stops under the pointer */
  targetAngle: number;
  /** Shortest positive rotation delta in [0, 360) */
  land: number;
} {
  const safeIdx = ((idx % N) + N) % N;
  const min = safeIdx * SLICE + EDGE_PAD;
  const max = (safeIdx + 1) * SLICE - EDGE_PAD;
  const targetAngle = min + rand * (max - min);
  const land = (360 - targetAngle + 360) % 360;
  return { idx: safeIdx, targetAngle, land };
}

/** Which slice is under the pointer for a given CSS rotation */
export function sliceUnderPointer(rotationDeg: number): number {
  const r = ((rotationDeg % 360) + 360) % 360;
  // Angle of wheel that sits at top
  const angleAtTop = (360 - r) % 360;
  return Math.min(N - 1, Math.floor(angleAtTop / SLICE));
}

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

  // Standard conic: from top (0°), clockwise — matches label + landing math
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
    const { land } = pickLanding(idx);
    const extra = FULL_TURNS * 360 + land;
    // Use current rotation (not setState updater side-effects — StrictMode-safe)
    const base = Math.ceil(rotation / 360) * 360;
    const finalRotation = base + extra;
    setRotation(finalRotation);

    playRouletteSpin(SPIN_MS);

    window.setTimeout(() => {
      // Safety: prize must match the slice under the pointer
      const landed = sliceUnderPointer(finalRotation);
      const prizeIdx = landed === idx ? idx : landed;
      const prize = ROULETTE_PRIZES[prizeIdx]!;
      const msg = spinRoulette(prize.id);
      if (msg === "No te quedan giros.") {
        setDeniedMsg(msg);
        setSpinning(false);
        return;
      }
      setResultMsg(msg);
      setWonPrize(prizeById(prize.id) ?? prize);
      setHighlightIdx(prizeIdx);
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

      <div className="relative mx-auto w-full max-w-[320px] select-none">
        <div
          className={cn(
            "pointer-events-none absolute inset-[-10px] rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 blur-md",
            spinning && "roulette-glow-pulse",
          )}
          aria-hidden
        />
        {/* Pointer at top — points down into the wheel */}
        <div
          className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1"
          aria-hidden
        >
          <div className="h-0 w-0 border-l-[14px] border-r-[14px] border-t-[26px] border-l-transparent border-r-transparent border-t-primary drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]" />
          <div className="absolute left-1/2 top-[18px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary ring-2 ring-card" />
        </div>

        <div className="relative aspect-square w-full">
          <div
            className="absolute inset-0 rounded-full border-[6px] border-primary/50 shadow-[inset_0_0_24px_rgba(0,0,0,0.15),0_8px_28px_rgba(0,0,0,0.12)]"
            style={{
              // from 0deg = top, clockwise — aligned with label + landing math
              background: `conic-gradient(from 0deg, ${conic})`,
              transform: `rotate(${rotation}deg)`,
              transition: spinning
                ? `transform ${SPIN_MS}ms cubic-bezier(0.12, 0.75, 0.12, 1)`
                : "none",
            }}
          >
            {ROULETTE_PRIZES.map((p, i) => {
              // Label at geometric center of slice i
              const mid = i * SLICE + SLICE / 2;
              const rad = ((mid - 90) * Math.PI) / 180;
              const r = 36;
              const x = 50 + r * Math.cos(rad);
              const y = 50 + r * Math.sin(rad);
              const won = !spinning && highlightIdx === i;
              return (
                <div
                  key={p.id}
                  className={cn(
                    "absolute flex w-[24%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center transition-transform",
                    won && "z-10 scale-125 drop-shadow-lg",
                  )}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <span
                    className={cn(
                      "text-[1.15rem] leading-none sm:text-[1.35rem]",
                      won && "text-[1.45rem] sm:text-[1.6rem]",
                    )}
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
              <Sparkles
                className="h-4 w-4 text-primary sm:h-5 sm:w-5"
                aria-hidden
              />
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
