import { useEffect } from "react";
import { useGameStore } from "@/lib/game-store";

/** Keeps <html data-theme> in sync with persisted preference */
export function ThemeApplier() {
  const theme = useGameStore((s) => s.theme);
  const setTheme = useGameStore((s) => s.setTheme);

  // Migrate legacy "chispa" id → "aurora"
  useEffect(() => {
    if ((theme as string) === "chispa") setTheme("aurora");
  }, [theme, setTheme]);

  const resolved = theme === "trueno" ? "trueno" : "aurora";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", resolved);
    document.body.setAttribute("data-theme", resolved);
  }, [resolved]);

  return null;
}
