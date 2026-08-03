import type { MathExercise, MathExerciseType } from "@/lib/data/math-tasks";

const TYPE_NAME: Record<MathExerciseType, string> = {
  suma: "las sumas",
  resta: "las restas",
  multiplicacion: "las multiplicaciones",
  division: "las divisiones",
  problema: "los problemas",
  calculo_mental: "el cálculo mental",
  valor_posicional: "el valor posicional",
  comparacion: "comparar números",
  fraccion: "las fracciones",
  decimal: "los decimales",
  medida: "las medidas",
  geometria: "la geometría",
};

/** Richer math explanation (2–4 sentences, kid-friendly) */
export function enrichMathExplanation(ex: MathExercise): string {
  const base = ex.explanation.trim();
  if (base.length > 140) return base;
  const tip: Partial<Record<MathExerciseType, string>> = {
    suma: "Alinea las cifras y suma columna a columna.",
    resta: "Si no puedes restar, pide prestado a la izquierda.",
    multiplicacion: "Multiplica por cada cifra y suma los resultados.",
    division: "Piensa cuántas veces cabe el divisor.",
    problema: "Subraya datos y pregunta; elige la operación.",
    calculo_mental: "Busca un truco: redondear o descomponer.",
    valor_posicional: "De derecha a izquierda: u, d, c, um…",
    comparacion: "Compara primero las cifras de la izquierda.",
    fraccion: "Divide el total en partes iguales y quédate con las que piden.",
    decimal: "La coma separa enteros y décimas.",
    medida: "Recuerda las equivalencias (m, cm, km…).",
    geometria: "El perímetro es la suma de los lados.",
  };
  return `${base} ${tip[ex.type] ?? ""} ¡Con calma lo lograrás!`.trim();
}

export function mathTypeLabel(t: MathExerciseType): string {
  return TYPE_NAME[t];
}

export type MissionTier = "great" | "ok" | "low";

export function missionTier(percent: number): MissionTier {
  if (percent >= 80) return "great";
  if (percent >= 50) return "ok";
  return "low";
}

export function missionMessages(
  tier: MissionTier,
  name: string,
): { title: string; body: string } {
  if (tier === "great") {
    return {
      title: `¡Brillante, ${name}!`,
      body: "Tu magia brilla con fuerza. Has acertado casi todo: la Academia Arcana está orgullosa de ti.",
    };
  }
  if (tier === "ok") {
    return {
      title: `¡Buen camino, ${name}!`,
      body: "Vas bien. Un poco más de práctica y llegarás a la maestría. ¡Tú puedes!",
    };
  }
  return {
    title: `¡Ánimo, ${name}!`,
    body: "Errar también enseña. Vuelve al Entrenamiento, repite con calma y verás cómo sube tu poder.",
  };
}

export function practiceSuggestion(
  failTags: string[],
  area: "math" | "language" | "english",
): string {
  const counts = new Map<string, number>();
  for (const t of failTags) counts.set(t, (counts.get(t) ?? 0) + 1);
  let top = "";
  let n = 0;
  for (const [k, v] of counts) {
    if (v > n) {
      top = k;
      n = v;
    }
  }
  const labels: Record<string, string> = {
    suma: "las sumas",
    resta: "las restas",
    multiplicacion: "las multiplicaciones",
    division: "las divisiones",
    problema: "los problemas",
    calculo_mental: "el cálculo mental",
    valor_posicional: "el valor posicional",
    comparacion: "comparar números",
    fraccion: "las fracciones",
    decimal: "los decimales",
    medida: "las medidas",
    geometria: "la geometría",
    sujeto: "el sujeto",
    predicado: "el predicado",
    nucleos: "los núcleos",
    morfo: "la morfología",
    verbo: "el verbo",
    tipo_oracion: "los tipos de oración",
    ortografia: "la ortografía",
    separar: "separar sujeto y predicado",
    translate: "el vocabulario",
    choose: "elegir la forma correcta",
    complete: "completar frases",
  };
  const focus = labels[top] ?? top;
  if (!focus) {
    return area === "english"
      ? "Te recomiendo practicar un poco más en el Modo Entrenamiento."
      : "Te recomiendo practicar más en el Modo Entrenamiento.";
  }
  return `Te recomiendo practicar más ${focus} en el Modo Entrenamiento.`;
}
