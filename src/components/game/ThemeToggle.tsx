import { Moon, Zap } from "lucide-react";
import { useGameStore, type ThemeId } from "@/lib/game-store";
import { cn } from "@/lib/utils";

const THEMES: {
  id: ThemeId;
  label: string;
  desc: string;
  icon: typeof Moon;
}[] = [
  {
    id: "chispa",
    label: "Chispa",
    desc: "Lila, rosa y dorado",
    icon: Moon,
  },
  {
    id: "trueno",
    label: "Trueno",
    desc: "Azul petróleo y plata",
    icon: Zap,
  },
];

/** Compact control for header */
export function ThemeToggle({ compact }: { compact?: boolean }) {
  const theme = useGameStore((s) => s.theme);
  const setTheme = useGameStore((s) => s.setTheme);

  if (compact) {
    const next: ThemeId = theme === "chispa" ? "trueno" : "chispa";
    return (
      <button
        type="button"
        onClick={() => setTheme(next)}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-xs font-semibold text-fg"
        title={`Tema: ${theme === "chispa" ? "Chispa" : "Trueno"}. Toca para cambiar.`}
        aria-label={`Cambiar tema. Ahora: ${theme}`}
      >
        {theme === "chispa" ? (
          <Moon className="h-3.5 w-3.5 text-accent" />
        ) : (
          <Zap className="h-3.5 w-3.5 text-accent-2" />
        )}
        {theme === "chispa" ? "Chispa" : "Trueno"}
      </button>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-fg">Tema de colores</p>
      <div className="grid grid-cols-2 gap-2">
        {THEMES.map((t) => {
          const Icon = t.icon;
          const active = theme === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTheme(t.id)}
              className={cn(
                "flex min-h-14 flex-col items-start justify-center gap-0.5 rounded-xl border px-3 py-2 text-left transition",
                active
                  ? "border-primary bg-primary/15"
                  : "border-border bg-surface hover:border-primary/40",
              )}
            >
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg">
                <Icon className="h-4 w-4" />
                {t.label}
              </span>
              <span className="text-[11px] text-muted">{t.desc}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
