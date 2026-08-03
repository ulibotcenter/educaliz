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

/**
 * Prefer the bank's pedagogical explanation when it's already rich.
 * Only append a short tip if the bank text is still thin.
 */
export function enrichMathExplanation(ex: MathExercise): string {
  const base = ex.explanation.trim();
  if (base.length >= 90) return base;

  const tip: Partial<Record<MathExerciseType, string>> = {
    suma: "Alinea las cifras y suma columna a columna, de derecha a izquierda.",
    resta: "Si la cifra de arriba es menor, pide prestado a la izquierda.",
    multiplicacion: "Puedes descomponer o usar la tabla: paso a paso.",
    division: "Piensa cuántas veces cabe el divisor y comprueba multiplicando.",
    problema: "Subraya datos y pregunta; elige la operación con calma.",
    calculo_mental: "Busca un truco: redondear, descomponer o usar dobles.",
    valor_posicional: "De derecha a izquierda: unidades, decenas, centenas…",
    comparacion: "Compara primero las cifras de la izquierda.",
    fraccion: "Divide el total en partes iguales y quédate con las que piden.",
    decimal: "Alinea la coma; cada lugar vale 10 veces menos a la derecha.",
    medida: "Recuerda: 1 m = 100 cm, 1 km = 1000 m, 1 h = 60 min.",
    geometria: "El perímetro suma lados; el área llena el interior.",
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
      body: "¡Qué magia tan limpia! Casi todo correcto. La Academia Arcana aplaude y tu grimorio brilla un poquito más.",
    };
  }
  if (tier === "ok") {
    return {
      title: `¡Buen hechizo, ${name}!`,
      body: "Vas por buen camino. Un poco de práctica y subirás de nivel mágico. ¡Tú puedes con calma y sonrisa!",
    };
  }
  return {
    title: `¡Ánimo, ${name}!`,
    body: "Errar también enseña a las grandes magas. Vuelve al Entrenamiento sin prisa: cada intento te hace más fuerte.",
  };
}

/** Short titles for correct answers (rotate by streak count) */
export function correctCheer(streak: number, area: "math" | "language" | "english"): string {
  if (streak >= 4) {
    return area === "english"
      ? "Amazing streak! You're on fire!"
      : "¡Racha de magia! ¡No paras de brillar!";
  }
  if (streak >= 3) {
    return area === "english"
      ? "Three in a row — super star!"
      : "¡Tres seguidos! Eres imparable.";
  }
  if (streak >= 2) {
    return area === "english"
      ? "Yes! Two in a row!"
      : "¡Dos seguidos! Qué hechicera.";
  }
  if (area === "math") return "¡Correcto! Magia de números.";
  if (area === "language") return "¡Bien! La biblioteca te sonríe.";
  return "Great! English magic works!";
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
      n = v;
      top = k;
    }
  }
  if (!top) {
    return area === "math"
      ? "Repasa sumas, restas y un problema con calma en Entrenamiento."
      : area === "language"
        ? "Practica sujeto, predicado y verbo en Entrenamiento."
        : "Repasa vocabulario y to be en el modo Entrenamiento.";
  }
  if (area === "math") {
    return `Te recomiendo practicar ${TYPE_NAME[top as MathExerciseType] ?? top} en Entrenamiento.`;
  }
  if (area === "language") {
    const labels: Record<string, string> = {
      sujeto: "el sujeto",
      predicado: "el predicado",
      verbo: "los verbos",
      tipo_oracion: "los tipos de oración",
      ortografia: "la ortografía",
      concordancia: "la concordancia",
      complemento: "los complementos",
      lexico: "clases de palabras",
      sintaxis: "el análisis de oraciones",
    };
    return `Te recomiendo practicar ${labels[top] ?? top} en la Biblioteca (Entrenamiento).`;
  }
  return `Practica un poco más «${top}» en English (Entrenamiento).`;
}
