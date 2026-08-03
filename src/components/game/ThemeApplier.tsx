import { useEffect } from "react";
import { useGameStore, type ThemeId } from "@/lib/game-store";

const VALID: ThemeId[] = ["aurora", "trueno"];

/** Keeps <html data-theme> in sync with persisted preference */
export function ThemeApplier() {
  const theme = useGameStore((s) => s.theme);
  const setTheme = useGameStore((s) => s.setTheme);

  // One-shot migration for any legacy value still in memory/storage
  useEffect(() => {
    if (!VALID.includes(theme)) setTheme("aurora");
  }, [theme, setTheme]);

  const resolved: ThemeId = theme === "trueno" ? "trueno" : "aurora";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", resolved);
    document.body.setAttribute("data-theme", resolved);
  }, [resolved]);

  return null;
}
