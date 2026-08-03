/** Friendly strong / weak skill analysis for Liz + parents */

export type SkillStat = { ok: number; bad: number };

export const SKILL_LABELS: Record<string, string> = {
  suma: "Sumas",
  resta: "Restas",
  multiplicacion: "Multiplicaciones",
  division: "Divisiones",
  problema: "Problemas de mates",
  calculo_mental: "Cálculo mental",
  valor_posicional: "Valor posicional",
  comparacion: "Comparación de números",
  fraccion: "Fracciones",
  decimal: "Decimales",
  medida: "Medidas",
  geometria: "Geometría",
  sujeto: "Sujeto",
  predicado: "Predicado",
  nucleos: "Núcleos (SN/SV)",
  morfo: "Morfología",
  verbo: "Verbo",
  tipo_oracion: "Tipos de oración",
  ortografia: "Ortografía y concordancia",
  separar: "Separar sujeto y predicado",
  translate: "Vocabulario inglés",
  choose: "Elegir en inglés",
  complete: "Completar frases en inglés",
};

export function skillLabel(tag: string): string {
  return SKILL_LABELS[tag] ?? tag;
}

export function skillAccuracy(s: SkillStat): number | null {
  const t = s.ok + s.bad;
  if (t === 0) return null;
  return Math.round((s.ok / t) * 100);
}

export function analyzeSkills(stats: Record<string, SkillStat>): {
  strong: { tag: string; label: string; accuracy: number; attempts: number }[];
  weak: { tag: string; label: string; accuracy: number; attempts: number }[];
  ranked: { tag: string; label: string; accuracy: number; attempts: number }[];
} {
  const ranked = Object.entries(stats)
    .map(([tag, s]) => {
      const attempts = s.ok + s.bad;
      const accuracy = skillAccuracy(s);
      return {
        tag,
        label: skillLabel(tag),
        accuracy: accuracy ?? 0,
        attempts,
      };
    })
    .filter((r) => r.attempts >= 2)
    .sort((a, b) => b.accuracy - a.accuracy || b.attempts - a.attempts);

  const strong = ranked.filter((r) => r.accuracy >= 70).slice(0, 3);
  const weak = [...ranked]
    .filter((r) => r.accuracy < 70)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3);

  if (weak.length === 0 && ranked.length > 1) {
    const bottom = ranked[ranked.length - 1]!;
    if (bottom.accuracy < 90) weak.push(bottom);
  }

  return { strong, weak, ranked };
}

export function childFriendlyInsights(stats: Record<string, SkillStat>): {
  strongLine: string;
  weakLine: string;
  hasData: boolean;
} {
  const { strong, weak } = analyzeSkills(stats);
  if (strong.length === 0 && weak.length === 0) {
    return {
      hasData: false,
      strongLine:
        "Tu magia aún se está despertando. ¡Haz unas partidas y verás brillos aquí!",
      weakLine:
        "Cuando practiques un poco más, te diré qué hechizos entrenar en el Modo Entrenamiento.",
    };
  }
  const strongLine =
    strong.length > 0
      ? `Tu magia es más fuerte en: ${strong.map((s) => s.label).join(", ")}.`
      : "Sigues creciendo: aún no hay un hechizo superestrella, ¡pero vas bien!";
  const weakLine =
    weak.length > 0
      ? `Puedes entrenar más: ${weak.map((s) => s.label).join(", ")}. ¡El Entrenamiento te espera sin presión!`
      : "No hay áreas débiles claras: ¡estás equilibrado como un verdadero mago!";
  return { hasData: true, strongLine, weakLine };
}

export function parentRecommendations(
  stats: Record<string, SkillStat>,
  accuracy: number | null,
  streak: number,
  maxStreak: number,
): string[] {
  const { strong, weak } = analyzeSkills(stats);
  const lines: string[] = [];

  if (accuracy === null) {
    lines.push(
      "Aun hay poca actividad registrada. Se recomienda practicar un poco cada dia (5-10 minutos).",
    );
  } else if (accuracy >= 80) {
    lines.push(
      `Excelente precision general (${accuracy}%). Conviene mantener la rutina corta y regular.`,
    );
  } else if (accuracy >= 50) {
    lines.push(
      `Precision general del ${accuracy}%. Buen avance: reforzar con el modo Entrenamiento los temas con mas fallos.`,
    );
  } else {
    lines.push(
      `Precision general del ${accuracy}%. Es normal al empezar: priorizar practicar sin presion y repasar con calma.`,
    );
  }

  if (strong.length > 0) {
    lines.push(
      `Areas mas solidas: ${strong.map((s) => `${s.label} (${s.accuracy}%)`).join("; ")}.`,
    );
  }
  if (weak.length > 0) {
    lines.push(
      `Areas a reforzar: ${weak.map((s) => `${s.label} (${s.accuracy}%)`).join("; ")}. Sugerencia: 1 sesion corta de entrenamiento en esos temas.`,
    );
  }

  if (maxStreak >= 3 || streak >= 3) {
    lines.push(
      `La constancia es un punto fuerte (racha actual ${streak} dia(s), maxima ${maxStreak}). Seguir con una partida breve al día ayuda a fijar lo aprendido.`,
    );
  } else {
    lines.push(
      "Intentar jugar al menos un poco casi todos los dias refuerza la memoria a largo plazo.",
    );
  }

  lines.push(
    "Este informe es orientativo y positivo: celebra los aciertos y trata los errores como parte del aprendizaje.",
  );

  return lines;
}
