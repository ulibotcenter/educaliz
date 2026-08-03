import { useEffect } from "react";
import { CloudOff } from "lucide-react";
import { useGameStore } from "@/lib/game-store";
import { useProfilesStore } from "@/lib/profiles";

/**
 * Keeps the active student profile progress in sync with the live game store
 * and pushes updates to Supabase (debounced inside the store).
 */
export function ProfileSync() {
  const activeProfileId = useProfilesStore((s) => s.activeProfileId);
  const syncActiveFromGame = useProfilesStore((s) => s.syncActiveFromGame);
  const cloudError = useProfilesStore((s) => s.cloudError);
  const clearCloudError = useProfilesStore((s) => s.clearCloudError);
  const lastSyncOk = useProfilesStore((s) => s.lastSyncOk);
  const flushActiveToCloud = useProfilesStore((s) => s.flushActiveToCloud);

  const xp = useGameStore((s) => s.xp);
  const points = useGameStore((s) => s.points);
  const streak = useGameStore((s) => s.streak);
  const badges = useGameStore((s) => s.badges);
  const avatar = useGameStore((s) => s.avatar);
  const areaSessionCount = useGameStore((s) => s.areaSessionCount);
  const mathCompleted = useGameStore((s) => s.mathCompleted);
  const languageCompleted = useGameStore((s) => s.languageCompleted);
  const englishCompleted = useGameStore((s) => s.englishCompleted);
  const playerName = useGameStore((s) => s.playerName);
  const ownedShopItems = useGameStore((s) => s.ownedShopItems);
  const tempBadges = useGameStore((s) => s.tempBadges);
  const equippedTempBadge = useGameStore((s) => s.equippedTempBadge);
  const theme = useGameStore((s) => s.theme);

  useEffect(() => {
    if (!activeProfileId) return;
    const t = window.setTimeout(() => {
      syncActiveFromGame();
    }, 450);
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
    languageCompleted,
    englishCompleted,
    playerName,
    ownedShopItems,
    tempBadges,
    equippedTempBadge,
    theme,
  ]);

  // Flush once when the tab is hidden / closed
  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState === "hidden") {
        void flushActiveToCloud();
      }
    };
    const onUnload = () => {
      void flushActiveToCloud();
    };
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", onUnload);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", onUnload);
    };
  }, [flushActiveToCloud]);

  if (!cloudError || lastSyncOk) return null;

  return (
    <div
      className="fixed bottom-24 left-1/2 z-40 w-[min(22rem,calc(100%-1.5rem))] -translate-x-1/2 rounded-xl border border-danger/40 bg-card/95 px-3 py-2.5 text-center text-xs font-medium text-danger shadow-lg backdrop-blur"
      role="status"
    >
      <p className="inline-flex items-center gap-1.5">
        <CloudOff className="h-3.5 w-3.5 shrink-0" />
        {cloudError}
      </p>
      <button
        type="button"
        className="mt-1 font-bold underline"
        onClick={() => {
          clearCloudError();
          void flushActiveToCloud();
        }}
      >
        Reintentar
      </button>
    </div>
  );
}
