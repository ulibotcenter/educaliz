import { useEffect } from "react";
import {
  normalizeThemeId,
  useGameStore,
  type ThemeId,
} from "@/lib/game-store";

/** Keeps <html data-theme> in sync — only "aurora" | "trueno". */
export function ThemeApplier() {
  const theme = useGameStore((s) => s.theme);
  const setTheme = useGameStore((s) => s.setTheme);

  // Heal any legacy value still in memory (e.g. old "chispa")
  useEffect(() => {
    const fixed = normalizeThemeId(theme);
    if (fixed !== theme) setTheme(fixed);
  }, [theme, setTheme]);

  const resolved: ThemeId = normalizeThemeId(theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", resolved);
    document.body.setAttribute("data-theme", resolved);
  }, [resolved]);

  return null;
}
