import { BookOpen, Sparkles, X } from "lucide-react";
import { useGameStore } from "@/lib/game-store";
import { STORY_CHAPTERS } from "@/lib/progression";

export function StoryModal() {
  const pendingStoryId = useGameStore((s) => s.pendingStoryId);
  const dismissStory = useGameStore((s) => s.dismissStory);
  const unlockedStories = useGameStore((s) => s.unlockedStories);

  const chapter =
    STORY_CHAPTERS.find((c) => c.id === pendingStoryId) ??
    (pendingStoryId
      ? {
          id: pendingStoryId,
          title: "Capítulo mágico",
          text: "Una nueva página se abre en tu aventura.",
        }
      : null);

  if (!pendingStoryId || !chapter) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="story-title"
    >
      <div className="w-full max-w-md animate-fade-in space-y-4 rounded-2xl border-2 border-primary/50 bg-card p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-2">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            ¡Capítulo nuevo!
          </p>
          <button
            type="button"
            onClick={dismissStory}
            className="grid h-10 w-10 place-items-center rounded-lg text-muted hover:bg-surface"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
            <BookOpen className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h2 id="story-title" className="font-display text-xl font-semibold text-fg sm:text-2xl">
              {chapter.title}
            </h2>
            <p className="mt-2 text-base leading-relaxed text-muted">{chapter.text}</p>
          </div>
        </div>
        <p className="text-center text-xs text-muted">
          Grimorio: {unlockedStories.length}/{STORY_CHAPTERS.length} capítulos
        </p>
        <button
          type="button"
          onClick={dismissStory}
          className="min-h-14 w-full rounded-xl bg-primary text-base font-bold text-primary-fg"
        >
          ¡Seguir la aventura!
        </button>
      </div>
    </div>
  );
}

export function StoryLog() {
  const unlocked = useGameStore((s) => s.unlockedStories);
  const chapters = STORY_CHAPTERS.filter((c) => unlocked.includes(c.id));

  if (chapters.length === 0) {
    return (
      <p className="text-sm text-muted">
        Aún no hay capítulos. ¡Juega para desbloquearlos!
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {chapters.map((c) => (
        <li key={c.id} className="rounded-xl border border-border bg-card p-3.5">
          <p className="font-display font-semibold text-fg">{c.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">{c.text}</p>
        </li>
      ))}
    </ul>
  );
}
