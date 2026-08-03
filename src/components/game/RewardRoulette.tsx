import { useMemo, useState } from "react";
import { Gift, Sparkles, Star } from "lucide-react";
import { useGameStore } from "@/lib/game-store";
import {
  ROULETTE_PRIZES,
  prizeById,
  type RoulettePrize,
} from "@/lib/roulette-prizes";
import { playRoulettePrize, playRouletteSpin } from "@/lib/sounds";
import { TempBadgeChip } from "@/components/game/BadgeChips";
import { cn } from "@/lib/utils";

/** 5.5–6.5s feel; fixed 6s for sound sync */
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
      {/* Magical ambient blobs */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-accent/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-14 -left-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-1/3 top-1/2 h-24 w-24 rounded-full bg-success/10 blur-2xl"
        aria-hidden
      />

      <div className="relative flex items-start gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 text-primary shadow-inner ring-1 ring-primary/30">
          <Gift className="h-6 w-6" aria-hidden />
        </span>
        <div className="min-w-0">
          <h2 className="font-display text-xl font-semibold tracking-tight text-fg">
            Roleta de Recompensas
          </h2>
          <p className="mt-0.5 text-sm text-muted">
            1 giro gratis al día · más giros al completar partidas oficiales.
          </p>
          <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-primary/35 bg-primary/15 px-3 py-1 text-sm font-semibold text-fg">
            <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
            Giros: {available}
            {freeToday ? " · incluye el gratis de hoy" : ""}
          </p>
        </div>
      </div>

      {/* Wheel stage */}
      <div className="relative mx-auto w-full max-w-[320px] select-none">
        {/* Outer glow ring */}
        <div
          className={cn(
            "pointer-events-none absolute inset-[-10px] rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 blur-md",
            spinning && "roulette-glow-pulse",
          )}
          aria-hidden
        />

        {/* Decorative stars */}
        <Star
          className="pointer-events-none absolute -left-1 top-8 h-4 w-4 text-primary/70"
          aria-hidden
        />
        <Star
          className="pointer-events-none absolute -right-0 top-16 h-3.5 w-3.5 text-accent"
          aria-hidden
        />
        <Sparkles
          className="pointer-events-none absolute bottom-6 -left-2 h-4 w-4 text-primary/60"
          aria-hidden
        />

        {/* Pointer — prominent gold pin */}
        <div
          className="absolute left-1/2 top-0 z-40 -translate-x-1/2 -translate-y-1"
          aria-hidden
        >
          <div className="relative flex flex-col items-center drop-shadow-[0_4px_12px_color-mix(in_oklab,var(--color-primary)_55%,transparent)]">
            <div className="h-4 w-4 rounded-full border-2 border-primary-fg bg-primary shadow-md ring-2 ring-primary/40" />
            <div
              className="h-0 w-0 border-l-[14px] border-r-[14px] border-t-[22px] border-l-transparent border-r-transparent border-t-primary"
              style={{ marginTop: -3 }}
            />
            <div
              className="absolute top-[18px] h-0 w-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-primary-fg/30"
            />
          </div>
        </div>

        {/* Metallic outer rim */}
        <div className="relative rounded-full bg-gradient-to-br from-primary/80 via-accent/50 to-primary/70 p-[7px] shadow-[0_0_36px_color-mix(in_oklab,var(--color-primary)_35%,transparent)]">
          <div className="rounded-full bg-gradient-to-b from-card to-surface p-[5px]">
            <div
              className={cn(
                "relative aspect-square w-full overflow-hidden rounded-full border-2 border-primary-fg/20",
                spinning && "roulette-spinning",
              )}
              style={{
                background: `conic-gradient(${conic})`,
                transform: `rotate(${rotation}deg)`,
                transition: spinning
                  ? `transform ${SPIN_MS}ms cubic-bezier(0.08, 0.82, 0.08, 1)`
                  : "transform 0.35s ease",
                boxShadow:
                  "inset 0 0 28px rgba(0,0,0,0.18), inset 0 0 4px rgba(255,255,255,0.25)",
              }}
            >
              {/* Slice dividers */}
              {ROULETTE_PRIZES.map((_, i) => (
                <div
                  key={`div-${i}`}
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[48%] w-[1.5px] origin-bottom bg-card/40"
                  style={{
                    transform: `translateX(-50%) rotate(${i * SLICE}deg)`,
                  }}
                  aria-hidden
                />
              ))}

              {/* Labels: polar placement (upright, mid-slice, outer ring) */}
              {ROULETTE_PRIZES.map((p, i) => {
                const mid = i * SLICE + SLICE / 2;
                const won = highlightIdx === i && !spinning;
                // CSS conic 0° = top; x = 50 + sinθ·r, y = 50 − cosθ·r
                const rad = (mid * Math.PI) / 180;
                const radius = 39; // % from center — outer band of each slice
                const x = 50 + Math.sin(rad) * radius;
                const y = 50 - Math.cos(rad) * radius;
                return (
                  <div
                    key={p.id}
                    className={cn(
                      "pointer-events-none absolute z-[5] flex w-[3.5rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center sm:w-[3.9rem]",
                      won && "scale-110 drop-shadow-md",
                    )}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                    }}
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

              {/* Center hub */}
              <div className="absolute left-1/2 top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-primary/70 bg-gradient-to-br from-card via-primary/20 to-accent/30 shadow-[0_0_14px_color-mix(in_oklab,var(--color-primary)_40%,transparent),inset_0_2px_6px_rgba(255,255,255,0.35)] sm:h-12 sm:w-12">
                <Sparkles className="h-4 w-4 text-primary sm:h-5 sm:w-5" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        disabled={!canSpin}
        onClick={spin}
        className={cn(
          "relative min-h-14 w-full rounded-2xl text-base font-bold transition sm:text-lg",
          canSpin
            ? "bg-gradient-to-r from-primary to-accent/90 text-primary-fg shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.99]"
            : "cursor-not-allowed bg-surface-2 text-muted",
        )}
      >
        {spinning
          ? "✨ Girando la magia…"
          : canSpin
            ? "¡Girar la ruleta!"
            : "Sin giros ahora"}
      </button>

      {resultMsg && wonPrize && (
        <div
          key={revealKey}
          className="roulette-reveal relative overflow-hidden rounded-2xl border-2 border-primary/60 bg-gradient-to-br from-primary/20 via-card to-accent/15 p-5 text-center confetti-burst shadow-[0_0_28px_color-mix(in_oklab,var(--color-primary)_30%,transparent)]"
        >
          <p className="text-4xl drop-shadow" aria-hidden>
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
