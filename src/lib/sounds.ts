/** Soft UI sounds via Web Audio (no asset files). */

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!audioCtx) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtx = new Ctx();
    }
    if (audioCtx.state === "suspended") {
      void audioCtx.resume();
    }
    return audioCtx;
  } catch {
    return null;
  }
}

function tone(
  freq: number,
  start: number,
  duration: number,
  type: OscillatorType,
  gainPeak: number,
) {
  const ctx = getCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
  gain.gain.setValueAtTime(0.0001, ctx.currentTime + start);
  gain.gain.exponentialRampToValueAtTime(gainPeak, ctx.currentTime + start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime + start);
  osc.stop(ctx.currentTime + start + duration + 0.02);
}

/** Happy ascending chime when the answer is correct */
export function playCorrect() {
  tone(523.25, 0, 0.12, "sine", 0.12);
  tone(659.25, 0.08, 0.12, "sine", 0.11);
  tone(783.99, 0.16, 0.18, "triangle", 0.1);
}

/** Soft low buzz when the answer is wrong */
export function playWrong() {
  tone(220, 0, 0.1, "square", 0.04);
  tone(165, 0.08, 0.16, "square", 0.03);
}

/** Mission summary: great result — lively fanfare */
export function playMissionGreat() {
  tone(523.25, 0, 0.12, "triangle", 0.1);
  tone(659.25, 0.1, 0.12, "triangle", 0.1);
  tone(783.99, 0.2, 0.12, "triangle", 0.1);
  tone(1046.5, 0.32, 0.28, "sine", 0.12);
  tone(783.99, 0.45, 0.2, "sine", 0.08);
}

/** Mission summary: ok result — neutral soft arpeggio */
export function playMissionOk() {
  tone(392, 0, 0.15, "sine", 0.08);
  tone(493.88, 0.14, 0.15, "sine", 0.08);
  tone(587.33, 0.28, 0.22, "triangle", 0.07);
}

/** Mission summary: low score — funny soft “puér puér puér” sad beeps */
export function playMissionLow() {
  tone(330, 0, 0.14, "square", 0.035);
  tone(277, 0.16, 0.14, "square", 0.03);
  tone(220, 0.32, 0.18, "square", 0.035);
  tone(185, 0.5, 0.22, "triangle", 0.03);
}

export type MissionMusicTier = "great" | "ok" | "low";

export function playMissionResult(tier: MissionMusicTier) {
  if (tier === "great") playMissionGreat();
  else if (tier === "ok") playMissionOk();
  else playMissionLow();
}

/**
 * Classic roulette tick while spinning: rapid clicks that gradually slow down.
 * Duration matches the visual spin (default ~6s). Soft enough for kids.
 */
export function playRouletteSpin(durationMs = 6000) {
  const ctx = getCtx();
  if (!ctx) return;

  const durationSec = durationMs / 1000;
  let t = 0;
  // start snappy, end leisurely — paced for a longer spin
  let gap = 0.04;
  let i = 0;

  while (t < durationSec - 0.06) {
    const progress = t / durationSec;
    // pitch drifts slightly lower as it slows
    const freq = 900 - progress * 320 + (i % 3) * 18;
    const peak = 0.026 + (1 - progress) * 0.016;
    const clickLen = 0.026;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(freq, ctx.currentTime + t);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime + t);
    gain.gain.exponentialRampToValueAtTime(peak, ctx.currentTime + t + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + t + clickLen);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + t);
    osc.stop(ctx.currentTime + t + clickLen + 0.01);

    // slow down with ease-out so ticks stay in sync with a long ease-out wheel
    gap = 0.04 + progress * progress * 0.22;
    t += gap;
    i += 1;
  }
}

/** Short magical “prize revealed” sparkle when the wheel stops */
export function playRoulettePrize() {
  // soft whoosh-ish low
  tone(196, 0, 0.12, "triangle", 0.05);
  // bright sparkle cascade
  tone(523.25, 0.06, 0.1, "sine", 0.1);
  tone(659.25, 0.14, 0.1, "sine", 0.1);
  tone(783.99, 0.22, 0.12, "triangle", 0.11);
  tone(1046.5, 0.34, 0.22, "sine", 0.12);
  tone(1318.5, 0.42, 0.18, "sine", 0.07);
}
