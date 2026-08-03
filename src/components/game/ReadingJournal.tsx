import { BookMarked, Star } from "lucide-react";
import { useGameStore, type BookFicha } from "@/lib/game-store";
import { cn } from "@/lib/utils";

const DIBUJOS = ["⭐", "🐉", "🏰", "🔮", "🌙", "🦊", "📖", "⚔️", "🌟", "🦋"];

export function ReadingJournal() {
  const books = useGameStore((s) => s.books);
  const saveBook = useGameStore((s) => s.saveBook);
  const awardCorrect = useGameStore((s) => s.awardCorrect);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="inline-flex items-center gap-1.5 text-sm font-medium text-success">
          <BookMarked className="h-4 w-4" aria-hidden />
          Salón de Lectura
        </p>
        <h1 className="font-display text-2xl font-semibold text-fg">Fichas de los dos libros</h1>
        <p className="text-sm text-muted">
          En las misiones de verano de Liz hay que leer dos libros y rellenar la ficha mágica.
          Completa cada ficha para ganar la insignia de lector.
        </p>
      </div>

      {[0, 1].map((idx) => (
        <BookCard
          key={idx}
          index={idx as 0 | 1}
          book={books[idx]!}
          onSave={(data, firstComplete) => {
            saveBook(idx as 0 | 1, data);
            if (firstComplete) awardCorrect(25);
          }}
        />
      ))}
    </div>
  );
}

function BookCard({
  index,
  book,
  onSave,
}: {
  index: 0 | 1;
  book: BookFicha;
  onSave: (data: Partial<BookFicha>, firstComplete: boolean) => void;
}) {
  const wasDone = book.completed;

  function update(partial: Partial<BookFicha>) {
    const next = { ...book, ...partial };
    const willComplete =
      next.titulo.trim().length > 0 &&
      next.trata.trim().length > 10 &&
      next.gusto.trim().length > 5 &&
      next.nota > 0;
    onSave(partial, !wasDone && willComplete);
  }

  return (
    <article className="space-y-4 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-fg">Libro {index + 1}</h2>
        {book.completed && (
          <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-medium text-success">
            Completa
          </span>
        )}
      </div>

      <label className="block space-y-1 text-sm">
        <span className="text-muted">Título</span>
        <input
          value={book.titulo}
          onChange={(e) => update({ titulo: e.target.value })}
          className="min-h-11 w-full rounded-lg border border-border bg-surface px-3 text-fg outline-none ring-primary focus:ring-2"
          placeholder="Título del libro"
        />
      </label>

      <label className="block space-y-1 text-sm">
        <span className="text-muted">El libro trata…</span>
        <textarea
          value={book.trata}
          onChange={(e) => update({ trata: e.target.value })}
          rows={3}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-fg outline-none ring-primary focus:ring-2"
          placeholder="Resume de qué va la historia…"
        />
      </label>

      <label className="block space-y-1 text-sm">
        <span className="text-muted">Lo que más me ha gustado ha sido…</span>
        <textarea
          value={book.gusto}
          onChange={(e) => update({ gusto: e.target.value })}
          rows={2}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-fg outline-none ring-primary focus:ring-2"
          placeholder="Personajes, magia, el final…"
        />
      </label>

      <div className="space-y-1.5">
        <span className="text-sm text-muted">Mi nota</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => update({ nota: n })}
              className="grid h-11 w-11 place-items-center rounded-lg border border-border bg-surface"
              aria-label={`${n} estrellas`}
            >
              <Star
                className={cn(
                  "h-5 w-5",
                  book.nota >= n ? "fill-primary text-primary" : "text-muted",
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <span className="text-sm text-muted">Mi dibujo (elige un sello mágico)</span>
        <div className="flex flex-wrap gap-2">
          {DIBUJOS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => update({ dibujo: d })}
              className={cn(
                "grid h-12 w-12 place-items-center rounded-full border text-xl transition",
                book.dibujo === d
                  ? "scale-110 border-primary bg-primary/15"
                  : "border-border bg-surface",
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}
