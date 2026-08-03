import { useMemo, useState } from "react";
import { Gift, Sparkles } from "lucide-react";
import { useGameStore } from "@/lib/game-store";
import {
  ROULETTE_PRIZES,
  TEMP_BADGE_LABELS,
  prizeById,
  type RoulettePrize,
} from "@/lib/roulette-prizes";
import { playRoulettePrize, playRouletteSpin } from "@/lib/sounds";
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
    // Pointer at top (0°). conic starts at top going clockwise.
    // Center of slice idx is at idx*SLICE + SLICE/2 from the top in wheel coords.
    // To land that center under the pointer, rotate wheel so that angle goes to top:
    // final rotation mod 360 should be 360 - (idx*SLICE + SLICE/2)
    const targetInSlice = idx * SLICE + SLICE / 2;
    const land = 360 - targetInSlice;
    // A few more full turns so a longer spin still feels lively
    const extra = 9 * 360 + land;
    setRotation((r) => {
      // keep accumulating so CSS transition always spins forward
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
      {/* soft sparkles bg */}
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

      {/* Wheel */}
      <div className="relative mx-auto w-full max-w-[300px] select-none">
        {/* Pointer / arrow */}
        <div className="absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-1" aria-hidden>
          <div className="relative flex flex-col items-center">
            <div className="h-3.5 w-3.5 rounded-full border-2 border-primary-fg bg-primary shadow-md" />
            <div
              className="h-0 w-0 border-l-[12px] border-r-[12px] border-t-[18px] border-l-transparent border-r-transparent border-t-primary drop-shadow-md"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.35))" }}
            />
          </div>
        </div>

        {/* Outer ornate ring */}
        <div className="rounded-full bg-gradient-to-br from-primary via-accent to-accent-2 p-[5px] shadow-[0_0_28px_color-mix(in_oklab,var(--color-primary)_35%,transparent)]">
          <div className="rounded-full bg-card p-[3px]">
            <div
              className={cn(
                "relative aspect-square w-full overflow-hidden rounded-full",
                spinning
                  ? "roulette-spinning"
                  : "transition-transform duration-300 ease-out",
              )}
              style={{
                transform: `rotate(${rotation}deg)`,
                transitionDuration: spinning ? `${SPIN_MS}ms` : undefined,
                transitionTimingFunction: spinning
                  ? "cubic-bezier(0.08, 0.82, 0.12, 1)"
                  : undefined,
                background: `
                  radial-gradient(circle at 50% 50%, transparent 34%, rgba(0,0,0,0.12) 35%, transparent 36%),
                  conic-gradient(from 0deg, ${conic})
                `,
              }}
            >
              {/* sector separators */}
              {ROULETTE_PRIZES.map((_, i) => (
                <div
                  key={`sep-${i}`}
                  className="absolute left-1/2 top-0 h-1/2 w-[2px] origin-bottom bg-black/20"
                  style={{ transform: `translateX(-50%) rotate(${i * SLICE}deg)` }}
                  aria-hidden
                />
              ))}

              {/* labels — radial, readable */}
              {ROULETTE_PRIZES.map((s, i) => {
                const mid = i * SLICE + SLICE / 2;
                const dark = s.textOn === "dark";
                return (
                  <div
                    key={s.id}
                    className="absolute left-1/2 top-1/2 h-0 w-0"
                    style={{ transform: `rotate(${mid}deg)` }}
                  >
                    <div
                      className="flex w-[5.5rem] -translate-x-1/2 -translate-y-[6.35rem] flex-col items-center gap-0.5 text-center"
                      style={{ transform: `rotate(${-mid}deg)` }}
                    >
                      <span className="text-base leading-none drop-shadow-sm" aria-hidden>
                        {s.emoji}
                      </span>
                      <span
                        className={cn(
                          "font-display text-[11px] font-bold leading-tight tracking-wide sm:text-xs",
                          dark ? "text-[#1a1208]" : "text-white",
                        )}
                        style={{
                          textShadow: dark
                            ? "0 1px 0 rgba(255,255,255,0.45)"
                            : "0 1px 2px rgba(0,0,0,0.55)",
                        }}
                      >
                        {s.wheelLabel}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* center hub */}
              <div className="absolute inset-[32%] flex items-center justify-center rounded-full border-2 border-white/50 bg-gradient-to-br from-card via-surface to-card shadow-[inset_0_2px_12px_rgba(0,0,0,0.35)]">
                <span
                  className={cn(
                    "text-2xl transition-transform",
                    spinning && "animate-pulse",
                  )}
                  aria-hidden
                >
                  🪄
                </span>
              </div>

              {/* gloss */}
              <div
                className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/25 via-transparent to-black/10"
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
        className={cn(
          "relative flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl text-base font-bold shadow-lg transition active:scale-[0.99]",
          canSpin
            ? "bg-primary text-primary-fg hover:brightness-105"
            : "bg-surface-2 text-muted opacity-80",
        )}
      >
        <Sparkles className="h-5 w-5" aria-hidden />
        {spinning
          ? "Girando la magia…"
          : canSpin
            ? "¡Girar la roleta!"
            : "Vuelve mañana o completa una partida"}
      </button>

      {/* Prize reveal */}
      {wonPrize && resultMsg && !spinning && (
        <div
          key={revealKey}
          className="roulette-reveal relative overflow-hidden rounded-2xl border-2 border-success/50 bg-gradient-to-br from-success/20 via-card to-primary/15 p-4 text-center sm:p-5"
          role="status"
          aria-live="polite"
        >
          <div className="confetti-burst absolute inset-0" aria-hidden />
          <p className="text-xs font-bold uppercase tracking-widest text-success">
            ¡Premio revelado!
          </p>
          <p className="mt-2 text-4xl" aria-hidden>
            {wonPrize.emoji}
          </p>
          <p className="mt-2 font-display text-lg font-semibold leading-snug text-fg text-balance sm:text-xl">
            {wonPrize.fullName}
          </p>
          <p className="mt-1 text-sm text-muted">{resultMsg}</p>
        </div>
      )}

      {/* Legend of prizes */}
      <div className="rounded-xl border border-border/80 bg-surface/40 p-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          Premios de la roleta
        </p>
        <ul className="grid gap-1.5 sm:grid-cols-2">
          {ROULETTE_PRIZES.map((p) => (
            <li
              key={p.id}
              className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/60 px-2.5 py-1.5 text-left text-xs text-fg"
            >
              <span
                className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-sm"
                style={{ backgroundColor: `${p.color}33` }}
                aria-hidden
              >
                {p.emoji}
              </span>
              <span className="min-w-0 leading-snug">
                <span className="font-semibold">{p.fullName}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2 rounded-xl border border-dashed border-accent/50 bg-accent/10 p-3 text-sm">
        <p className="font-semibold text-fg">Insignias temporales (brillo especial)</p>
        <p className="text-xs text-muted">
          Son extras, distintas de las permanentes. Mientras entres al menos 1 vez cada 24 h, las
          mantienes. Si pasas 24 h sin entrar, se pierden todas. ¡Puedes acumular varias!
        </p>
        {tempList.length === 0 ? (
          <p className="text-xs text-muted">Aún no tienes insignias temporales activas.</p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {tempList.map(([id]) => {
              const info = TEMP_BADGE_LABELS[id];
              return (
                <li
                  key={id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-accent bg-accent/20 px-3 py-1.5 text-xs font-medium text-fg shadow-[0_0_14px_color-mix(in_oklab,var(--color-accent)_40%,transparent)]"
                >
                  <span aria-hidden>{info?.emoji ?? "⏳"}</span>
                  {info?.name ?? id}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
