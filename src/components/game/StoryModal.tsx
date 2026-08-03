import { BookOpen, X } from "lucide-react";
import { useGameStore } from "@/lib/game-store";
import { STORY_CHAPTERS } from "@/lib/progression";

export function StoryModal() {
  const pendingStoryId = useGameStore((s) => s.pendingStoryId);
  const dismissStory = useGameStore((s) => s.dismissStory);
  const unlockedStories = useGameStore((s) => s.unlockedStories);

  const chapter =
    STORY_CHAPTERS.find((c) => c.id === pendingStoryId) ??
    (pendingStoryId
      ? { id: pendingStoryId, title: "Capítulo mágico", text: "Una nueva página se abre en tu aventura." }
      : null);

  if (!pendingStoryId || !chapter) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="story-title"
    >
      <div className="w-full max-w-md space-y-4 rounded-2xl border border-primary/40 bg-card p-5 shadow-xl">
        <div className="flex items-start justify-between gap-2">
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
            <BookOpen className="h-3.5 w-3.5" />
            Capítulo desbloqueado
          </p>
          <button
            type="button"
            onClick={dismissStory}
            className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-surface"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <h2 id="story-title" className="font-display text-xl font-semibold text-fg">
          {chapter.title}
        </h2>
        <p className="text-sm leading-relaxed text-muted sm:text-base">{chapter.text}</p>
        <p className="text-[11px] text-muted">
          Capítulos en el grimorio: {unlockedStories.length}/{STORY_CHAPTERS.length}
        </p>
        <button
          type="button"
          onClick={dismissStory}
          className="min-h-12 w-full rounded-lg bg-primary font-semibold text-primary-fg"
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
    return <p className="text-sm text-muted">Aún no hay capítulos. ¡Juega para desbloquearlos!</p>;
  }

  return (
    <ul className="space-y-3">
      {chapters.map((c) => (
        <li key={c.id} className="rounded-xl border border-border bg-card p-3">
          <p className="font-display font-semibold text-fg">{c.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">{c.text}</p>
        </li>
      ))}
    </ul>
  );
}
