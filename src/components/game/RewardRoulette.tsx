import { useMemo, useState } from "react";
import { Gift, Sparkles } from "lucide-react";
import { useGameStore } from "@/lib/game-store";
import {
  ROULETTE_PRIZES,
  prizeById,
  type RoulettePrize,
} from "@/lib/roulette-prizes";
import { playRoulettePrize, playRouletteSpin } from "@/lib/sounds";
import { TempBadgeChip } from "@/components/game/BadgeChips";
import { cn } from "@/lib/utils";

/** ~6s spin for anticipation; sound is locked to the same duration */
const SPIN_MS = 6000;
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

  const today = new Date().toISOString().slice(0, 10);
  const freeToday = lastSpinDate !== today;
  const available = spins + (freeToday ? 1 : 0);
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
    if (!canSpin) return;
    touchActivity();
    setSpinning(true);
    setResultMsg(null);
    setWonPrize(null);

    const idx = Math.floor(Math.random() * N);
    const targetInSlice = idx * SLICE + SLICE / 2;
    const land = 360 - targetInSlice;
    const extra = 9 * 360 + land;
    setRotation((r) => {
      const base = Math.ceil(r / 360) * 360;
      return base + extra;
    });

    playRouletteSpin(SPIN_MS);

    window.setTimeout(() => {
      const prize = ROULETTE_PRIZES[idx]!;
      const msg = spinRoulette(prize.id);
      setResultMsg(msg);
      setWonPrize(prizeById(prize.id) ?? prize);
      setRevealKey((k) => k + 1);
      setSpinning(false);
      playRoulettePrize();
    }, SPIN_MS);
  }

  return (
    <section className="relative space-y-5 overflow-hidden rounded-2xl border-2 border-primary/45 bg-gradient-to-br from-primary/15 via-card to-accent/15 p-4 shadow-[0_0_40px_color-mix(in_oklab,var(--color-primary)_18%,transparent)] sm:p-6">
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-accent/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-primary/15 blur-3xl"
        aria-hidden
      />

      <div className="relative flex items-start gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/20 text-primary shadow-inner">
          <Gift className="h-6 w-6" aria-hidden />
        </span>
        <div className="min-w-0">
          <h2 className="font-display text-xl font-semibold tracking-tight text-fg">
            Roleta de Recompensas
          </h2>
          <p className="mt-0.5 text-sm text-muted">
            1 giro gratis al día · más giros al completar partidas oficiales.
          </p>
          <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-fg">
            <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
            Giros: {available}
            {freeToday ? " · incluye el gratis de hoy" : ""}
          </p>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[300px] select-none">
        <div className="absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-1" aria-hidden>
          <div className="relative flex flex-col items-center">
            <div className="h-3.5 w-3.5 rounded-full border-2 border-primary-fg bg-primary shadow-md" />
            <div
              className="h-0 w-0 border-l-[12px] border-r-[12px] border-t-[18px] border-l-transparent border-r-transparent border-t-primary drop-shadow-md"
              style={{ marginTop: -2 }}
            />
          </div>
        </div>

        <div
          className={cn(
            "relative aspect-square w-full rounded-full border-[6px] border-primary/50 shadow-[0_0_30px_color-mix(in_oklab,var(--color-primary)_25%,transparent)]",
            spinning && "roulette-spinning",
          )}
          style={{
            background: `conic-gradient(${conic})`,
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? `transform ${SPIN_MS}ms cubic-bezier(0.12, 0.75, 0.12, 1)`
              : undefined,
          }}
        >
          {ROULETTE_PRIZES.map((p, i) => {
            const mid = i * SLICE + SLICE / 2;
            return (
              <div
                key={p.id}
                className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0"
                style={{
                  transform: `rotate(${mid}deg) translateY(-38%)`,
                }}
              >
                <span
                  className={cn(
                    "block w-[4.6rem] -translate-x-1/2 text-center text-[10px] font-bold leading-tight tracking-tight sm:text-[11px]",
                    p.textOn === "light" ? "text-white drop-shadow" : "text-stone-900",
                  )}
                >
                  <span className="block text-sm leading-none">{p.emoji}</span>
                  {p.wheelLabel}
                </span>
              </div>
            );
          })}
          <div className="absolute left-1/2 top-1/2 z-10 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-primary/60 bg-card shadow-inner" />
        </div>
      </div>

      <button
        type="button"
        disabled={!canSpin}
        onClick={spin}
        className={cn(
          "relative min-h-12 w-full rounded-xl text-base font-bold transition",
          canSpin
            ? "bg-primary text-primary-fg shadow-md hover:brightness-110"
            : "cursor-not-allowed bg-surface-2 text-muted",
        )}
      >
        {spinning ? "Girando…" : canSpin ? "¡Girar la roleta!" : "Sin giros ahora"}
      </button>

      {resultMsg && wonPrize && (
        <div
          key={revealKey}
          className="roulette-reveal relative overflow-hidden rounded-2xl border-2 border-primary/50 bg-primary/10 p-4 text-center confetti-burst"
        >
          <p className="text-3xl" aria-hidden>
            {wonPrize.emoji}
          </p>
          <p className="mt-1 font-display text-lg font-semibold text-fg">{resultMsg}</p>
          <p className="text-xs text-muted">{wonPrize.fullName}</p>
        </div>
      )}

      <div className="space-y-2 rounded-xl border-2 border-dashed border-accent/50 bg-gradient-to-br from-accent/15 to-primary/5 p-3 text-sm">
        <p className="font-semibold text-fg">Insignias temporales (brillo especial)</p>
        <p className="text-xs text-muted">
          Son extras, distintas de las permanentes. Mientras entres al menos 1 vez cada 24 h, las
          mantienes. Si pasas 24 h sin entrar, se pierden todas. ¡Puedes acumular varias!
        </p>
        {tempList.length === 0 ? (
          <p className="text-xs text-muted">Aún no tienes insignias temporales activas.</p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {tempList.map(([id]) => (
              <li key={id}>
                <TempBadgeChip id={id} showBlurb />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
