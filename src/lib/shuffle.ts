/** Fisher–Yates shuffle — new random order every call */
export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]!;
    a[i] = a[j]!;
    a[j] = t;
  }
  return a;
}

/** Unique options; ensures correct answer is included; random order */
export function shuffleAnswerOptions(
  options: string[] | undefined | null,
  correct: string,
): string[] {
  const unique = [
    ...new Set(
      [...(options ?? []), correct]
        .map((o) => o.trim())
        .filter(Boolean),
    ),
  ];
  return shuffleArray(unique);
}
