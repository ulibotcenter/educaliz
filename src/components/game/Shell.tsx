import { type ReactNode } from "react";
import {
  BookOpen,
  Flame,
  Home,
  Languages,
  Sparkles,
  Star,
  Trophy,
  Wand2,
} from "lucide-react";
import { useGameStore, type ViewId } from "@/lib/game-store";
import { cn } from "@/lib/utils";
import { XpBar } from "@/components/game/XpBar";
import { AvatarPortrait } from "@/components/game/AvatarView";
import { StoryModal } from "@/components/game/StoryModal";
import { ThemeToggle } from "@/components/game/ThemeToggle";
import { ThemeApplier } from "@/components/game/ThemeApplier";
import { useEffect } from "react";

const NAV: { id: ViewId; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Mapa", icon: Home },
  { id: "daily", label: "Hoy", icon: Flame },
  { id: "math", label: "Mates", icon: Wand2 },
  { id: "language", label: "Lengua", icon: BookOpen },
  { id: "english", label: "English", icon: Languages },
  { id: "reading", label: "Libros", icon: Sparkles },
  { id: "progress", label: "Logros", icon: Trophy },
];

const WHERE: Partial<Record<ViewId, string>> = {
  home: "Mapa de la Academia",
  daily: "Misión de hoy",
  math: "Torre de Números",
  "math-play": "Torre · jugando",
  "math-boss": "Torre · batalla final",
  language: "Biblioteca Misteriosa",
  "language-play": "Biblioteca · jugando",
  "language-boss": "Biblioteca · batalla final",
  english: "Cámara del Inglés",
  "english-play": "English · jugando",
  "english-boss": "English · batalla final",
  reading: "Salón de Lectura",
  progress: "Sala de Trofeos",
  avatar: "Tu avatar",
  diagnostic: "Diagnóstico mágico",
};

export function Shell({ children }: { children: ReactNode }) {
  const view = useGameStore((s) => s.view);
  const setView = useGameStore((s) => s.setView);
  const points = useGameStore((s) => s.points);
  const streak = useGameStore((s) => s.streak);
  const touchActivity = useGameStore((s) => s.touchActivity);

  useEffect(() => {
    touchActivity();
  }, [touchActivity]);

  const activeNav =
    view === "math-play" || view === "math-boss"
      ? "math"
      : view === "language-play" || view === "language-boss"
        ? "language"
        : view === "english-play" || view === "english-boss"
          ? "english"
          : view === "avatar" || view === "story" || view === "diagnostic"
            ? "progress"
            : view;

  const where = WHERE[view] ?? "Academia Arcana";

  return (
    <div className="flex min-h-[calc(100dvh-var(--grok-banner-h,0px))] flex-col">
      <ThemeApplier />
      <header className="sticky top-[var(--grok-banner-h,0px)] z-30 border-b border-border/60 bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3">
          <button
            type="button"
            onClick={() => setView("home")}
            className="flex min-h-12 items-center gap-2 text-left"
          >
            <AvatarPortrait size="sm" />
            <div className="leading-tight">
              <p className="font-display text-sm font-semibold tracking-wide text-fg sm:text-base">
                Academia Arcana
              </p>
              <p className="max-w-[10rem] truncate text-xs text-muted sm:max-w-none">
                {where}
              </p>
            </div>
          </button>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <ThemeToggle compact />
            <XpBar compact />
            <div className="flex min-h-11 items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1 text-sm">
              <Star className="h-4 w-4 text-primary" aria-hidden />
              <span className="font-semibold tabular-nums text-fg">{points}</span>
            </div>
            <div className="flex min-h-11 items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1 text-sm">
              <Flame className="h-4 w-4 text-danger" aria-hidden />
              <span className="font-semibold tabular-nums text-fg">{streak}</span>
            </div>
          </div>
        </div>
      </header>

      <main
        key={view}
        className="mx-auto w-full max-w-5xl flex-1 animate-fade-in px-4 py-5 pb-36 sm:py-8 sm:pb-36"
      >
        {children}
      </main>

      <StoryModal />

      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border/70 bg-bg/95 backdrop-blur-md"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
        aria-label="Navegación principal"
      >
        <div className="mx-auto flex max-w-5xl items-stretch justify-between gap-0.5 overflow-x-auto px-1 py-1.5">
          {NAV.map(({ id, label, icon: Icon }) => {
            const active = activeNav === id;
            const isDaily = id === "daily";
            return (
              <button
                key={id}
                type="button"
                onClick={() => setView(id)}
                className={cn(
                  "flex min-h-14 min-w-[3.25rem] flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] font-medium transition sm:text-xs",
                  active
                    ? isDaily
                      ? "bg-danger/20 text-danger"
                      : "bg-primary/15 text-primary"
                    : "text-muted hover:bg-surface hover:text-fg",
                  isDaily && !active && "text-danger/80",
                )}
              >
                <Icon className={cn("h-5 w-5 sm:h-6 sm:w-6", isDaily && "h-6 w-6")} aria-hidden />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
