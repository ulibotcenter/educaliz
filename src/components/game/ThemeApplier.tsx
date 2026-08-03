import { useEffect } from "react";
import { useGameStore } from "@/lib/game-store";

/** Keeps <html data-theme> in sync with persisted preference */
export function ThemeApplier() {
  const theme = useGameStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return null;
}
