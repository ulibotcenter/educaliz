/**
 * Tipos y etiquetas de ejercicios de matemáticas.
 * El contenido jugable vive en `question-banks` / `banks/math-bank`.
 */

export type MathExerciseType =
  | "suma"
  | "resta"
  | "multiplicacion"
  | "division"
  | "problema"
  | "calculo_mental"
  | "valor_posicional"
  | "comparacion"
  | "fraccion"
  | "decimal"
  | "medida"
  | "geometria";

export type MathExercise = {
  type: MathExerciseType;
  prompt: string;
  answer: number;
  remainder?: number;
  hint: string;
  explanation: string;
};

export const TYPE_LABELS: Record<MathExerciseType, string> = {
  suma: "Suma",
  resta: "Resta",
  multiplicacion: "Multiplicación",
  division: "División",
  problema: "Problema",
  calculo_mental: "Cálculo mental",
  valor_posicional: "Valor posicional",
  comparacion: "Comparación",
  fraccion: "Fracciones",
  decimal: "Decimales",
  medida: "Medidas",
  geometria: "Geometría",
};

/** Reexporta nombres de nivel de dificultad (Chispa…Maestría) */
export { LEVEL_LABELS } from "@/lib/data/question-banks";
