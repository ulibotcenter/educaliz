import { useEffect } from "react";
import { useGameStore } from "@/lib/game-store";
import { useProfilesStore } from "@/lib/profiles";

/**
 * Keeps the active student profile progress in sync with the live game store.
 * Debounced so frequent awardCorrect calls don't thrash localStorage.
 */
export function ProfileSync() {
  const activeProfileId = useProfilesStore((s) => s.activeProfileId);
  const syncActiveFromGame = useProfilesStore((s) => s.syncActiveFromGame);
  const xp = useGameStore((s) => s.xp);
  const points = useGameStore((s) => s.points);
  const streak = useGameStore((s) => s.streak);
  const badges = useGameStore((s) => s.badges);
  const avatar = useGameStore((s) => s.avatar);
  const areaSessionCount = useGameStore((s) => s.areaSessionCount);
  const mathCompleted = useGameStore((s) => s.mathCompleted);
  const playerName = useGameStore((s) => s.playerName);

  useEffect(() => {
    if (!activeProfileId) return;
    const t = window.setTimeout(() => {
      syncActiveFromGame();
    }, 400);
    return () => window.clearTimeout(t);
  }, [
    activeProfileId,
    syncActiveFromGame,
    xp,
    points,
    streak,
    badges,
    avatar,
    areaSessionCount,
    mathCompleted,
    playerName,
  ]);

  return null;
}
