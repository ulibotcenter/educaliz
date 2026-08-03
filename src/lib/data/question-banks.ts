// Bancos de preguntas por nivel — Academia Arcana
// Sorteo aleatorio al elegir dificultad

export type DiffLevel = 1 | 2 | 3 | 4 | 5;

export const LEVEL_META: Record<DiffLevel, { name: string; emoji: string; blurb: string }> = {
  1: { name: "Chispa", emoji: "✨", blurb: "Empezamos con calma" },
  2: { name: "Llama", emoji: "🔥", blurb: "Un poco más de magia" },
  3: { name: "Hechizo", emoji: "🪄", blurb: "Retos intermedios" },
  4: { name: "Arcano", emoji: "📜", blurb: "Nivel avanzado" },
  5: { name: "Maestría", emoji: "👑", blurb: "¡Desafío de maga!" },
};

export type MathQ = {
  id: string;
  level: DiffLevel;
  type: string;
  prompt: string;
  answer: number;
  hint: string;
  explanation: string;
};

export type LangQ = {
  id: string;
  level: DiffLevel;
  title: string;
  tip: string;
  text: string;
  options: string[];
  answer: string;
  explanation: string;
  skillTag: string;
  hint: string;
  showSentence: boolean;
};

export type EngQ = {
  id: string;
  level: DiffLevel;
  kind: "translate" | "choose" | "complete";
  prompt: string;
  promptEs: string;
  options: string[];
  answer: string;
  hint: string;
  explanation: string;
};

export const MATH_BANK: MathQ[] = [
  {
    "id": "m1",
    "level": 1,
    "type": "calculo_mental",
    "prompt": "Cálculo mental: 5 + 6 = ?",
    "answer": 11,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 11. ¡Sigue practicando!"
  },
  {
    "id": "m2",
    "level": 1,
    "type": "calculo_mental",
    "prompt": "Cálculo mental: 9 + 4 = ?",
    "answer": 13,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 13. ¡Sigue practicando!"
  },
  {
    "id": "m3",
    "level": 1,
    "type": "calculo_mental",
    "prompt": "Cálculo mental: 7 + 8 = ?",
    "answer": 15,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 15. ¡Sigue practicando!"
  },
  {
    "id": "m4",
    "level": 1,
    "type": "calculo_mental",
    "prompt": "Cálculo mental: 10 − 3 = ?",
    "answer": 7,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 7. ¡Sigue practicando!"
  },
  {
    "id": "m5",
    "level": 1,
    "type": "calculo_mental",
    "prompt": "Cálculo mental: 15 − 6 = ?",
    "answer": 9,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 9. ¡Sigue practicando!"
  },
  {
    "id": "m6",
    "level": 1,
    "type": "calculo_mental",
    "prompt": "Cálculo mental: 4 × 5 = ?",
    "answer": 20,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 20. ¡Sigue practicando!"
  },
  {
    "id": "m7",
    "level": 1,
    "type": "calculo_mental",
    "prompt": "Cálculo mental: 3 × 6 = ?",
    "answer": 18,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 18. ¡Sigue practicando!"
  },
  {
    "id": "m8",
    "level": 1,
    "type": "calculo_mental",
    "prompt": "Cálculo mental: 2 × 9 = ?",
    "answer": 18,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 18. ¡Sigue practicando!"
  },
  {
    "id": "m9",
    "level": 1,
    "type": "suma",
    "prompt": "Suma: 23 + 14",
    "answer": 37,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 37. ¡Sigue practicando!"
  },
  {
    "id": "m10",
    "level": 1,
    "type": "suma",
    "prompt": "Suma: 41 + 28",
    "answer": 69,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 69. ¡Sigue practicando!"
  },
  {
    "id": "m11",
    "level": 1,
    "type": "suma",
    "prompt": "Suma: 56 + 22",
    "answer": 78,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 78. ¡Sigue practicando!"
  },
  {
    "id": "m12",
    "level": 1,
    "type": "suma",
    "prompt": "Suma: 19 + 17",
    "answer": 36,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 36. ¡Sigue practicando!"
  },
  {
    "id": "m13",
    "level": 1,
    "type": "resta",
    "prompt": "Resta: 40 − 15",
    "answer": 25,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 25. ¡Sigue practicando!"
  },
  {
    "id": "m14",
    "level": 1,
    "type": "resta",
    "prompt": "Resta: 60 − 22",
    "answer": 38,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 38. ¡Sigue practicando!"
  },
  {
    "id": "m15",
    "level": 1,
    "type": "resta",
    "prompt": "Resta: 35 − 18",
    "answer": 17,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 17. ¡Sigue practicando!"
  },
  {
    "id": "m16",
    "level": 1,
    "type": "resta",
    "prompt": "Resta: 90 − 40",
    "answer": 50,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 50. ¡Sigue practicando!"
  },
  {
    "id": "m17",
    "level": 1,
    "type": "multiplicacion",
    "prompt": "Multiplica: 5 × 4",
    "answer": 20,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 20. ¡Sigue practicando!"
  },
  {
    "id": "m18",
    "level": 1,
    "type": "multiplicacion",
    "prompt": "Multiplica: 6 × 3",
    "answer": 18,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 18. ¡Sigue practicando!"
  },
  {
    "id": "m19",
    "level": 1,
    "type": "multiplicacion",
    "prompt": "Multiplica: 7 × 2",
    "answer": 14,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 14. ¡Sigue practicando!"
  },
  {
    "id": "m20",
    "level": 1,
    "type": "division",
    "prompt": "Divide: 12 ÷ 3",
    "answer": 4,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 4. ¡Sigue practicando!"
  },
  {
    "id": "m21",
    "level": 1,
    "type": "division",
    "prompt": "Divide: 20 ÷ 5",
    "answer": 4,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 4. ¡Sigue practicando!"
  },
  {
    "id": "m22",
    "level": 1,
    "type": "division",
    "prompt": "Divide: 16 ÷ 4",
    "answer": 4,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 4. ¡Sigue practicando!"
  },
  {
    "id": "m23",
    "level": 1,
    "type": "comparacion",
    "prompt": "¿Cuál es mayor: 27 o 32? Escribe el mayor.",
    "answer": 32,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 32. ¡Sigue practicando!"
  },
  {
    "id": "m24",
    "level": 1,
    "type": "comparacion",
    "prompt": "¿Cuál es menor: 45 o 54? Escribe el menor.",
    "answer": 45,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 45. ¡Sigue practicando!"
  },
  {
    "id": "m25",
    "level": 1,
    "type": "comparacion",
    "prompt": "¿Cuál es mayor: 100 o 99? Escribe el mayor.",
    "answer": 100,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 100. ¡Sigue practicando!"
  },
  {
    "id": "m26",
    "level": 1,
    "type": "valor_posicional",
    "prompt": "En 345, ¿qué cifra está en las decenas?",
    "answer": 4,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 4. ¡Sigue practicando!"
  },
  {
    "id": "m27",
    "level": 1,
    "type": "valor_posicional",
    "prompt": "En 702, ¿qué cifra está en las unidades?",
    "answer": 2,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 2. ¡Sigue practicando!"
  },
  {
    "id": "m28",
    "level": 1,
    "type": "valor_posicional",
    "prompt": "En 519, ¿qué cifra está en las centenas?",
    "answer": 5,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 5. ¡Sigue practicando!"
  },
  {
    "id": "m29",
    "level": 1,
    "type": "fraccion",
    "prompt": "¿Cuánto es la mitad de 10?",
    "answer": 5,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 5. ¡Sigue practicando!"
  },
  {
    "id": "m30",
    "level": 1,
    "type": "fraccion",
    "prompt": "¿Cuánto es 1/2 de 14?",
    "answer": 7,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 7. ¡Sigue practicando!"
  },
  {
    "id": "m31",
    "level": 1,
    "type": "geometria",
    "prompt": "Cuadrado de lado 3 cm. ¿Perímetro?",
    "answer": 12,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 12. ¡Sigue practicando!"
  },
  {
    "id": "m32",
    "level": 1,
    "type": "geometria",
    "prompt": "Cuadrado de lado 5 cm. ¿Perímetro?",
    "answer": 20,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 20. ¡Sigue practicando!"
  },
  {
    "id": "m33",
    "level": 1,
    "type": "medida",
    "prompt": "12 cm + 8 cm = ? cm",
    "answer": 20,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 20. ¡Sigue practicando!"
  },
  {
    "id": "m34",
    "level": 1,
    "type": "medida",
    "prompt": "20 cm − 5 cm = ? cm",
    "answer": 15,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 15. ¡Sigue practicando!"
  },
  {
    "id": "m35",
    "level": 1,
    "type": "problema",
    "prompt": "Liz tiene 8 monedas y encuentra 5. ¿Cuántas tiene?",
    "answer": 13,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 13. ¡Sigue practicando!"
  },
  {
    "id": "m36",
    "level": 1,
    "type": "problema",
    "prompt": "Hay 9 estrellas. Se apagan 2. ¿Cuántas quedan?",
    "answer": 7,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 7. ¡Sigue practicando!"
  },
  {
    "id": "m37",
    "level": 1,
    "type": "problema",
    "prompt": "3 cofres con 4 monedas cada uno. ¿Total?",
    "answer": 12,
    "hint": "Piensa con calma.",
    "explanation": "¡Casi! La respuesta es 12. ¡Sigue practicando!"
  },
  {
    "id": "m38",
    "level": 2,
    "type": "calculo_mental",
    "prompt": "Cálculo mental: 25 + 17 = ?",
    "answer": 42,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 42."
  },
  {
    "id": "m39",
    "level": 2,
    "type": "calculo_mental",
    "prompt": "Cálculo mental: 50 − 18 = ?",
    "answer": 32,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 32."
  },
  {
    "id": "m40",
    "level": 2,
    "type": "calculo_mental",
    "prompt": "Cálculo mental: 12 × 4 = ?",
    "answer": 48,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 48."
  },
  {
    "id": "m41",
    "level": 2,
    "type": "calculo_mental",
    "prompt": "Cálculo mental: 36 ÷ 6 = ?",
    "answer": 6,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 6."
  },
  {
    "id": "m42",
    "level": 2,
    "type": "suma",
    "prompt": "Suma: 156 + 87",
    "answer": 243,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 243."
  },
  {
    "id": "m43",
    "level": 2,
    "type": "suma",
    "prompt": "Suma: 234 + 159",
    "answer": 393,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 393."
  },
  {
    "id": "m44",
    "level": 2,
    "type": "suma",
    "prompt": "Suma: 399 + 101",
    "answer": 500,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 500."
  },
  {
    "id": "m45",
    "level": 2,
    "type": "resta",
    "prompt": "Resta: 200 − 67",
    "answer": 133,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 133."
  },
  {
    "id": "m46",
    "level": 2,
    "type": "resta",
    "prompt": "Resta: 450 − 128",
    "answer": 322,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 322."
  },
  {
    "id": "m47",
    "level": 2,
    "type": "resta",
    "prompt": "Resta: 800 − 255",
    "answer": 545,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 545."
  },
  {
    "id": "m48",
    "level": 2,
    "type": "multiplicacion",
    "prompt": "Multiplica: 14 × 5",
    "answer": 70,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 70."
  },
  {
    "id": "m49",
    "level": 2,
    "type": "multiplicacion",
    "prompt": "Multiplica: 23 × 3",
    "answer": 69,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 69."
  },
  {
    "id": "m50",
    "level": 2,
    "type": "multiplicacion",
    "prompt": "Multiplica: 16 × 6",
    "answer": 96,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 96."
  },
  {
    "id": "m51",
    "level": 2,
    "type": "division",
    "prompt": "Divide: 48 ÷ 6",
    "answer": 8,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 8."
  },
  {
    "id": "m52",
    "level": 2,
    "type": "division",
    "prompt": "Divide: 81 ÷ 9",
    "answer": 9,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 9."
  },
  {
    "id": "m53",
    "level": 2,
    "type": "division",
    "prompt": "Divide: 64 ÷ 8",
    "answer": 8,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 8."
  },
  {
    "id": "m54",
    "level": 2,
    "type": "comparacion",
    "prompt": "¿Cuál es menor: 308 o 380? Escribe el menor.",
    "answer": 308,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 308."
  },
  {
    "id": "m55",
    "level": 2,
    "type": "comparacion",
    "prompt": "¿Cuál es mayor: 1002 o 1020? Escribe el mayor.",
    "answer": 1020,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 1020."
  },
  {
    "id": "m56",
    "level": 2,
    "type": "valor_posicional",
    "prompt": "En 2.845, ¿cifra de las centenas?",
    "answer": 8,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 8."
  },
  {
    "id": "m57",
    "level": 2,
    "type": "valor_posicional",
    "prompt": "En 1.760, ¿cuánto vale el 7?",
    "answer": 700,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 700."
  },
  {
    "id": "m58",
    "level": 2,
    "type": "fraccion",
    "prompt": "¿Cuánto es 1/3 de 15?",
    "answer": 5,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 5."
  },
  {
    "id": "m59",
    "level": 2,
    "type": "fraccion",
    "prompt": "¿Cuánto es 1/4 de 24?",
    "answer": 6,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 6."
  },
  {
    "id": "m60",
    "level": 2,
    "type": "fraccion",
    "prompt": "¿Cuánto es 2/3 de 12?",
    "answer": 8,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 8."
  },
  {
    "id": "m61",
    "level": 2,
    "type": "geometria",
    "prompt": "Rectángulo 6×4 cm. ¿Perímetro? (2×6+2×4)",
    "answer": 20,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 20."
  },
  {
    "id": "m62",
    "level": 2,
    "type": "geometria",
    "prompt": "Triángulo equilátero lado 7 cm. ¿Perímetro?",
    "answer": 21,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 21."
  },
  {
    "id": "m63",
    "level": 2,
    "type": "medida",
    "prompt": "2 m = ¿cuántos cm?",
    "answer": 200,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 200."
  },
  {
    "id": "m64",
    "level": 2,
    "type": "medida",
    "prompt": "150 cm + 50 cm = ? cm",
    "answer": 200,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 200."
  },
  {
    "id": "m65",
    "level": 2,
    "type": "decimal",
    "prompt": "¿Cuántas décimas hay en 4,3?",
    "answer": 3,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 3."
  },
  {
    "id": "m66",
    "level": 2,
    "type": "decimal",
    "prompt": "¿Cuántas décimas hay en 2,9?",
    "answer": 9,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 9."
  },
  {
    "id": "m67",
    "level": 2,
    "type": "problema",
    "prompt": "Liz camina 12 min ida y 12 vuelta. ¿Total?",
    "answer": 24,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 24."
  },
  {
    "id": "m68",
    "level": 2,
    "type": "problema",
    "prompt": "5 cajas con 8 pociones. ¿Total pociones?",
    "answer": 40,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 40."
  },
  {
    "id": "m69",
    "level": 2,
    "type": "problema",
    "prompt": "Tiene 50 monedas y gasta 19. ¿Cuánto le queda?",
    "answer": 31,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 31."
  },
  {
    "id": "m70",
    "level": 2,
    "type": "problema",
    "prompt": "Lee 15 páginas y luego 17. ¿Cuántas leyó?",
    "answer": 32,
    "hint": "Revisa los datos.",
    "explanation": "¡Casi! La respuesta correcta es 32."
  },
  {
    "id": "m71",
    "level": 3,
    "type": "suma",
    "prompt": "Suma: 1.278 + 645",
    "answer": 1923,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 1923. Revisa la operación."
  },
  {
    "id": "m72",
    "level": 3,
    "type": "suma",
    "prompt": "Suma: 2.450 + 1.375",
    "answer": 3825,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 3825. Revisa la operación."
  },
  {
    "id": "m73",
    "level": 3,
    "type": "resta",
    "prompt": "Resta: 3.000 − 1.256",
    "answer": 1744,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 1744. Revisa la operación."
  },
  {
    "id": "m74",
    "level": 3,
    "type": "resta",
    "prompt": "Resta: 5.200 − 2.878",
    "answer": 2322,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 2322. Revisa la operación."
  },
  {
    "id": "m75",
    "level": 3,
    "type": "multiplicacion",
    "prompt": "Multiplica: 27 × 6",
    "answer": 162,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 162. Revisa la operación."
  },
  {
    "id": "m76",
    "level": 3,
    "type": "multiplicacion",
    "prompt": "Multiplica: 35 × 8",
    "answer": 280,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 280. Revisa la operación."
  },
  {
    "id": "m77",
    "level": 3,
    "type": "multiplicacion",
    "prompt": "Multiplica: 42 × 7",
    "answer": 294,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 294. Revisa la operación."
  },
  {
    "id": "m78",
    "level": 3,
    "type": "division",
    "prompt": "Divide: 144 ÷ 12",
    "answer": 12,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 12. Revisa la operación."
  },
  {
    "id": "m79",
    "level": 3,
    "type": "division",
    "prompt": "Divide: 225 ÷ 15",
    "answer": 15,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 15. Revisa la operación."
  },
  {
    "id": "m80",
    "level": 3,
    "type": "division",
    "prompt": "Divide: 168 ÷ 8",
    "answer": 21,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 21. Revisa la operación."
  },
  {
    "id": "m81",
    "level": 3,
    "type": "calculo_mental",
    "prompt": "Cálculo mental: 99 + 36 = ?",
    "answer": 135,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 135. Revisa la operación."
  },
  {
    "id": "m82",
    "level": 3,
    "type": "calculo_mental",
    "prompt": "Cálculo mental: 250 − 80 = ?",
    "answer": 170,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 170. Revisa la operación."
  },
  {
    "id": "m83",
    "level": 3,
    "type": "calculo_mental",
    "prompt": "Cálculo mental: 25 × 6 = ?",
    "answer": 150,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 150. Revisa la operación."
  },
  {
    "id": "m84",
    "level": 3,
    "type": "fraccion",
    "prompt": "¿Cuánto es 3/5 de 40?",
    "answer": 24,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 24. Revisa la operación."
  },
  {
    "id": "m85",
    "level": 3,
    "type": "fraccion",
    "prompt": "¿Cuánto es 2/5 de 35?",
    "answer": 14,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 14. Revisa la operación."
  },
  {
    "id": "m86",
    "level": 3,
    "type": "fraccion",
    "prompt": "¿Cuánto es 3/4 de 36?",
    "answer": 27,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 27. Revisa la operación."
  },
  {
    "id": "m87",
    "level": 3,
    "type": "geometria",
    "prompt": "Cuadrado lado 11 cm. ¿Perímetro?",
    "answer": 44,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 44. Revisa la operación."
  },
  {
    "id": "m88",
    "level": 3,
    "type": "geometria",
    "prompt": "Rectángulo 10×7. ¿Perímetro?",
    "answer": 34,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 34. Revisa la operación."
  },
  {
    "id": "m89",
    "level": 3,
    "type": "geometria",
    "prompt": "Pentágono regular lado 6. ¿Perímetro?",
    "answer": 30,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 30. Revisa la operación."
  },
  {
    "id": "m90",
    "level": 3,
    "type": "medida",
    "prompt": "3 km = ¿cuántos m?",
    "answer": 3000,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 3000. Revisa la operación."
  },
  {
    "id": "m91",
    "level": 3,
    "type": "medida",
    "prompt": "2 m 30 cm = ¿cuántos cm?",
    "answer": 230,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 230. Revisa la operación."
  },
  {
    "id": "m92",
    "level": 3,
    "type": "decimal",
    "prompt": "¿Cuántos céntimos hay en 2 euros?",
    "answer": 200,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 200. Revisa la operación."
  },
  {
    "id": "m93",
    "level": 3,
    "type": "decimal",
    "prompt": "¿Cuántos céntimos hay en 1 euro y 50 céntimos?",
    "answer": 150,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 150. Revisa la operación."
  },
  {
    "id": "m94",
    "level": 3,
    "type": "valor_posicional",
    "prompt": "En 45.302, ¿cifra de las unidades de millar?",
    "answer": 5,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 5. Revisa la operación."
  },
  {
    "id": "m95",
    "level": 3,
    "type": "valor_posicional",
    "prompt": "En 78.010, ¿cifra de las decenas?",
    "answer": 1,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 1. Revisa la operación."
  },
  {
    "id": "m96",
    "level": 3,
    "type": "comparacion",
    "prompt": "¿Cuál es mayor: 9.090 o 9.009? Escribe el mayor.",
    "answer": 9090,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 9090. Revisa la operación."
  },
  {
    "id": "m97",
    "level": 3,
    "type": "problema",
    "prompt": "60 monedas. Gasta 18 y 15. ¿Cuánto le queda?",
    "answer": 27,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 27. Revisa la operación."
  },
  {
    "id": "m98",
    "level": 3,
    "type": "problema",
    "prompt": "8 hierbas × 6 hechizos. ¿Hierbas en total?",
    "answer": 48,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 48. Revisa la operación."
  },
  {
    "id": "m99",
    "level": 3,
    "type": "problema",
    "prompt": "90 − 28 + 17 estrellas. ¿Cuántas brillan?",
    "answer": 79,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 79. Revisa la operación."
  },
  {
    "id": "m100",
    "level": 3,
    "type": "problema",
    "prompt": "Lee 25 min y el doble al día siguiente. ¿Minutos el 2º día?",
    "answer": 50,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 50. Revisa la operación."
  },
  {
    "id": "m101",
    "level": 3,
    "type": "problema",
    "prompt": "120 libros. Prestan 35 y devuelven 10. ¿Cuántos hay?",
    "answer": 95,
    "hint": "Paso a paso.",
    "explanation": "¡Casi! La respuesta es 95. Revisa la operación."
  },
  {
    "id": "m102",
    "level": 4,
    "type": "suma",
    "prompt": "Suma: 4.567 + 2.893",
    "answer": 7460,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 7460."
  },
  {
    "id": "m103",
    "level": 4,
    "type": "suma",
    "prompt": "Suma: 7.890 + 1.234",
    "answer": 9124,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 9124."
  },
  {
    "id": "m104",
    "level": 4,
    "type": "resta",
    "prompt": "Resta: 10.000 − 3.456",
    "answer": 6544,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 6544."
  },
  {
    "id": "m105",
    "level": 4,
    "type": "resta",
    "prompt": "Resta: 8.050 − 2.678",
    "answer": 5372,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 5372."
  },
  {
    "id": "m106",
    "level": 4,
    "type": "multiplicacion",
    "prompt": "Multiplica: 56 × 9",
    "answer": 504,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 504."
  },
  {
    "id": "m107",
    "level": 4,
    "type": "multiplicacion",
    "prompt": "Multiplica: 48 × 12",
    "answer": 576,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 576."
  },
  {
    "id": "m108",
    "level": 4,
    "type": "multiplicacion",
    "prompt": "Multiplica: 67 × 5",
    "answer": 335,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 335."
  },
  {
    "id": "m109",
    "level": 4,
    "type": "division",
    "prompt": "Divide: 336 ÷ 14",
    "answer": 24,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 24."
  },
  {
    "id": "m110",
    "level": 4,
    "type": "division",
    "prompt": "Divide: 540 ÷ 12",
    "answer": 45,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 45."
  },
  {
    "id": "m111",
    "level": 4,
    "type": "division",
    "prompt": "Divide: 720 ÷ 16",
    "answer": 45,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 45."
  },
  {
    "id": "m112",
    "level": 4,
    "type": "calculo_mental",
    "prompt": "Cálculo mental: 125 × 4 = ?",
    "answer": 500,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 500."
  },
  {
    "id": "m113",
    "level": 4,
    "type": "calculo_mental",
    "prompt": "Cálculo mental: 360 ÷ 6 = ?",
    "answer": 60,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 60."
  },
  {
    "id": "m114",
    "level": 4,
    "type": "fraccion",
    "prompt": "¿Cuánto es 3/8 de 32?",
    "answer": 12,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 12."
  },
  {
    "id": "m115",
    "level": 4,
    "type": "fraccion",
    "prompt": "¿Cuánto es 5/6 de 42?",
    "answer": 35,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 35."
  },
  {
    "id": "m116",
    "level": 4,
    "type": "fraccion",
    "prompt": "¿Cuánto es 7/10 de 50?",
    "answer": 35,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 35."
  },
  {
    "id": "m117",
    "level": 4,
    "type": "fraccion",
    "prompt": "¿Cuánto es 5/4 de 16?",
    "answer": 20,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 20."
  },
  {
    "id": "m118",
    "level": 4,
    "type": "geometria",
    "prompt": "Rectángulo 15×8. ¿Perímetro?",
    "answer": 46,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 46."
  },
  {
    "id": "m119",
    "level": 4,
    "type": "geometria",
    "prompt": "Cuadrado lado 12. ¿Perímetro?",
    "answer": 48,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 48."
  },
  {
    "id": "m120",
    "level": 4,
    "type": "geometria",
    "prompt": "Rectángulo 20×9. ¿Perímetro?",
    "answer": 58,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 58."
  },
  {
    "id": "m121",
    "level": 4,
    "type": "medida",
    "prompt": "3 m 40 cm = ¿cuántos cm?",
    "answer": 340,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 340."
  },
  {
    "id": "m122",
    "level": 4,
    "type": "medida",
    "prompt": "2 km = ¿cuántos m?",
    "answer": 2000,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 2000."
  },
  {
    "id": "m123",
    "level": 4,
    "type": "decimal",
    "prompt": "¿Cuántos céntimos son 3,25 euros?",
    "answer": 325,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 325."
  },
  {
    "id": "m124",
    "level": 4,
    "type": "decimal",
    "prompt": "¿Cuántos céntimos son 7,50 euros?",
    "answer": 750,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 750."
  },
  {
    "id": "m125",
    "level": 4,
    "type": "decimal",
    "prompt": "¿Cuántos céntimos son 12 euros?",
    "answer": 1200,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 1200."
  },
  {
    "id": "m126",
    "level": 4,
    "type": "comparacion",
    "prompt": "¿Cuál es menor: 99.999 o 100.001? Escribe el menor.",
    "answer": 99999,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 99999."
  },
  {
    "id": "m127",
    "level": 4,
    "type": "problema",
    "prompt": "120 monedas. 3 mapas a 18 c/u. ¿Cuánto le queda?",
    "answer": 66,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 66."
  },
  {
    "id": "m128",
    "level": 4,
    "type": "problema",
    "prompt": "45 km/día × 6 días. ¿Total km?",
    "answer": 270,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 270."
  },
  {
    "id": "m129",
    "level": 4,
    "type": "problema",
    "prompt": "200 pociones. Usan 1/4. ¿Cuántas usan?",
    "answer": 50,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 50."
  },
  {
    "id": "m130",
    "level": 4,
    "type": "problema",
    "prompt": "96 gemas ÷ 8 magos. ¿Cada uno?",
    "answer": 12,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 12."
  },
  {
    "id": "m131",
    "level": 4,
    "type": "problema",
    "prompt": "15 puntos × 4 misiones. ¿Total?",
    "answer": 60,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 60."
  },
  {
    "id": "m132",
    "level": 4,
    "type": "problema",
    "prompt": "40 min + 25 min de estudio. ¿Minutos de estudio?",
    "answer": 65,
    "hint": "Lee dos veces.",
    "explanation": "¡Casi! La respuesta correcta es 65."
  },
  {
    "id": "m133",
    "level": 5,
    "type": "multiplicacion",
    "prompt": "Multiplica: 125 × 8",
    "answer": 1000,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 1000. ¡Ánimo, maga!"
  },
  {
    "id": "m134",
    "level": 5,
    "type": "multiplicacion",
    "prompt": "Multiplica: 76 × 15",
    "answer": 1140,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 1140. ¡Ánimo, maga!"
  },
  {
    "id": "m135",
    "level": 5,
    "type": "multiplicacion",
    "prompt": "Multiplica: 99 × 12",
    "answer": 1188,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 1188. ¡Ánimo, maga!"
  },
  {
    "id": "m136",
    "level": 5,
    "type": "multiplicacion",
    "prompt": "Multiplica: 125 × 16",
    "answer": 2000,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 2000. ¡Ánimo, maga!"
  },
  {
    "id": "m137",
    "level": 5,
    "type": "division",
    "prompt": "Divide: 1008 ÷ 24",
    "answer": 42,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 42. ¡Ánimo, maga!"
  },
  {
    "id": "m138",
    "level": 5,
    "type": "division",
    "prompt": "Divide: 945 ÷ 27",
    "answer": 35,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 35. ¡Ánimo, maga!"
  },
  {
    "id": "m139",
    "level": 5,
    "type": "division",
    "prompt": "Divide: 2040 ÷ 24",
    "answer": 85,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 85. ¡Ánimo, maga!"
  },
  {
    "id": "m140",
    "level": 5,
    "type": "suma",
    "prompt": "Suma: 9.876 + 5.432",
    "answer": 15308,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 15308. ¡Ánimo, maga!"
  },
  {
    "id": "m141",
    "level": 5,
    "type": "suma",
    "prompt": "Suma: 15.678 + 9.999",
    "answer": 25677,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 25677. ¡Ánimo, maga!"
  },
  {
    "id": "m142",
    "level": 5,
    "type": "resta",
    "prompt": "Resta: 50.000 − 17.856",
    "answer": 32144,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 32144. ¡Ánimo, maga!"
  },
  {
    "id": "m143",
    "level": 5,
    "type": "resta",
    "prompt": "Resta: 20.005 − 8.786",
    "answer": 11219,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 11219. ¡Ánimo, maga!"
  },
  {
    "id": "m144",
    "level": 5,
    "type": "calculo_mental",
    "prompt": "Cálculo mental: 75 × 8 = ?",
    "answer": 600,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 600. ¡Ánimo, maga!"
  },
  {
    "id": "m145",
    "level": 5,
    "type": "calculo_mental",
    "prompt": "Cálculo mental: 48 × 25 = ?",
    "answer": 1200,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 1200. ¡Ánimo, maga!"
  },
  {
    "id": "m146",
    "level": 5,
    "type": "fraccion",
    "prompt": "¿Cuánto es 3/5 de 85?",
    "answer": 51,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 51. ¡Ánimo, maga!"
  },
  {
    "id": "m147",
    "level": 5,
    "type": "fraccion",
    "prompt": "¿Cuánto es 7/8 de 64?",
    "answer": 56,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 56. ¡Ánimo, maga!"
  },
  {
    "id": "m148",
    "level": 5,
    "type": "fraccion",
    "prompt": "¿Cuánto es 9/10 de 90?",
    "answer": 81,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 81. ¡Ánimo, maga!"
  },
  {
    "id": "m149",
    "level": 5,
    "type": "geometria",
    "prompt": "Cuadrado lado 25. ¿Perímetro?",
    "answer": 100,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 100. ¡Ánimo, maga!"
  },
  {
    "id": "m150",
    "level": 5,
    "type": "geometria",
    "prompt": "Triángulo 12+15+18. ¿Perímetro?",
    "answer": 45,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 45. ¡Ánimo, maga!"
  },
  {
    "id": "m151",
    "level": 5,
    "type": "geometria",
    "prompt": "Rectángulo 25×14. ¿Perímetro?",
    "answer": 78,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 78. ¡Ánimo, maga!"
  },
  {
    "id": "m152",
    "level": 5,
    "type": "medida",
    "prompt": "2 km 350 m = ¿metros?",
    "answer": 2350,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 2350. ¡Ánimo, maga!"
  },
  {
    "id": "m153",
    "level": 5,
    "type": "medida",
    "prompt": "1 l 250 ml = ¿ml? (1l=1000ml)",
    "answer": 1250,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 1250. ¡Ánimo, maga!"
  },
  {
    "id": "m154",
    "level": 5,
    "type": "decimal",
    "prompt": "¿Céntimos en 9,99 euros?",
    "answer": 999,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 999. ¡Ánimo, maga!"
  },
  {
    "id": "m155",
    "level": 5,
    "type": "decimal",
    "prompt": "¿Céntimos en 15 euros?",
    "answer": 1500,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 1500. ¡Ánimo, maga!"
  },
  {
    "id": "m156",
    "level": 5,
    "type": "comparacion",
    "prompt": "¿Cuál es mayor: 87.654 o 87.645? Escribe el mayor.",
    "answer": 87654,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 87654. ¡Ánimo, maga!"
  },
  {
    "id": "m157",
    "level": 5,
    "type": "problema",
    "prompt": "48 pasajeros × 6 vagones − 30. ¿Cuántos quedan?",
    "answer": 258,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 258. ¡Ánimo, maga!"
  },
  {
    "id": "m158",
    "level": 5,
    "type": "problema",
    "prompt": "360 monedas. Da 1/4 y 1/5. ¿Cuántas se queda?",
    "answer": 198,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 198. ¡Ánimo, maga!"
  },
  {
    "id": "m159",
    "level": 5,
    "type": "problema",
    "prompt": "5 torres × 48 ventanas. ¿Total?",
    "answer": 240,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 240. ¡Ánimo, maga!"
  },
  {
    "id": "m160",
    "level": 5,
    "type": "problema",
    "prompt": "12 + el doble + 8 retos en 3 días. ¿Total? (12+24+8)",
    "answer": 44,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 44. ¡Ánimo, maga!"
  },
  {
    "id": "m161",
    "level": 5,
    "type": "problema",
    "prompt": "45 monedas × 4 hechizos. ¿Gasto total?",
    "answer": 180,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 180. ¡Ánimo, maga!"
  },
  {
    "id": "m162",
    "level": 5,
    "type": "problema",
    "prompt": "360 páginas. Lee 1/3 el lunes. ¿Páginas el lunes?",
    "answer": 120,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 120. ¡Ánimo, maga!"
  },
  {
    "id": "m163",
    "level": 5,
    "type": "problema",
    "prompt": "Un tren: 36 asientos × 5 vagones. ¿Asientos?",
    "answer": 180,
    "hint": "Misión de maestría.",
    "explanation": "¡Casi! La respuesta es 180. ¡Ánimo, maga!"
  }
];
export const LANG_BANK: LangQ[] = [
  {
    "id": "l1",
    "level": 1,
    "title": "¿Cuál es el sujeto?",
    "tip": "Quién hace la acción",
    "text": "Ana salta.",
    "options": [
      "Ana",
      "salta",
      "en",
      "el"
    ],
    "answer": "Ana",
    "explanation": "El sujeto es Ana: quien salta.",
    "skillTag": "sujeto",
    "hint": "Lee con calma.",
    "showSentence": true
  },
  {
    "id": "l2",
    "level": 1,
    "title": "¿Cuál es el verbo?",
    "tip": "La acción",
    "text": "Ana salta.",
    "options": [
      "salta",
      "Ana",
      "el",
      "jardín"
    ],
    "answer": "salta",
    "explanation": "El verbo es salta.",
    "skillTag": "verbo",
    "hint": "Lee con calma.",
    "showSentence": true
  },
  {
    "id": "l3",
    "level": 1,
    "title": "¿Cuál es el predicado?",
    "tip": "Qué se dice del sujeto",
    "text": "El gato duerme.",
    "options": [
      "duerme",
      "El gato",
      "gato",
      "El"
    ],
    "answer": "duerme",
    "explanation": "Predicado: duerme.",
    "skillTag": "predicado",
    "hint": "Lee con calma.",
    "showSentence": true
  },
  {
    "id": "l4",
    "level": 1,
    "title": "¿Cuál es el sujeto?",
    "tip": "Quién",
    "text": "El gato duerme.",
    "options": [
      "El gato",
      "duerme",
      "gato",
      "El"
    ],
    "answer": "El gato",
    "explanation": "Sujeto: El gato.",
    "skillTag": "sujeto",
    "hint": "Lee con calma.",
    "showSentence": true
  },
  {
    "id": "l5",
    "level": 1,
    "title": "Tipo de oración",
    "tip": "Mira los signos",
    "text": "¿Vienes mañana?",
    "options": [
      "Interrogativa",
      "Enunciativa",
      "Exclamativa",
      "Imperativa"
    ],
    "answer": "Interrogativa",
    "explanation": "Lleva ¿?: interrogativa.",
    "skillTag": "tipo_oracion",
    "hint": "Lee con calma.",
    "showSentence": true
  },
  {
    "id": "l6",
    "level": 1,
    "title": "Tipo de oración",
    "tip": "Intención",
    "text": "Hoy llueve.",
    "options": [
      "Enunciativa",
      "Interrogativa",
      "Exclamativa",
      "Imperativa"
    ],
    "answer": "Enunciativa",
    "explanation": "Afirma con punto: enunciativa.",
    "skillTag": "tipo_oracion",
    "hint": "Lee con calma.",
    "showSentence": true
  },
  {
    "id": "l7",
    "level": 1,
    "title": "¿Cuál es el sujeto?",
    "tip": "Quién",
    "text": "Los niños juegan.",
    "options": [
      "Los niños",
      "juegan",
      "niños",
      "Los"
    ],
    "answer": "Los niños",
    "explanation": "Sujeto: Los niños.",
    "skillTag": "sujeto",
    "hint": "Lee con calma.",
    "showSentence": true
  },
  {
    "id": "l8",
    "level": 1,
    "title": "¿Cuál es el verbo?",
    "tip": "Acción",
    "text": "Los niños juegan.",
    "options": [
      "juegan",
      "niños",
      "Los",
      "al"
    ],
    "answer": "juegan",
    "explanation": "Verbo: juegan.",
    "skillTag": "verbo",
    "hint": "Lee con calma.",
    "showSentence": true
  },
  {
    "id": "l9",
    "level": 1,
    "title": "¿Cuál es el predicado?",
    "tip": "Desde el verbo",
    "text": "María lee.",
    "options": [
      "lee",
      "María",
      "un",
      "libro"
    ],
    "answer": "lee",
    "explanation": "Predicado: lee.",
    "skillTag": "predicado",
    "hint": "Lee con calma.",
    "showSentence": true
  },
  {
    "id": "l10",
    "level": 1,
    "title": "¿Cuál es el sujeto?",
    "tip": "Quién",
    "text": "María lee.",
    "options": [
      "María",
      "lee",
      "libro",
      "un"
    ],
    "answer": "María",
    "explanation": "Sujeto: María.",
    "skillTag": "sujeto",
    "hint": "Lee con calma.",
    "showSentence": true
  },
  {
    "id": "l11",
    "level": 1,
    "title": "Separa sujeto | predicado",
    "tip": "Corte",
    "text": "Pedro corre.",
    "options": [
      "Pedro | corre",
      "Pedro corre |",
      "| Pedro corre",
      "Pe | dro corre"
    ],
    "answer": "Pedro | corre",
    "explanation": "Sujeto Pedro, predicado corre.",
    "skillTag": "separar",
    "hint": "Lee con calma.",
    "showSentence": true
  },
  {
    "id": "l12",
    "level": 1,
    "title": "¿Cuál es el verbo?",
    "tip": "Acción",
    "text": "Yo como pan.",
    "options": [
      "como",
      "Yo",
      "pan",
      "el"
    ],
    "answer": "como",
    "explanation": "Verbo: como.",
    "skillTag": "verbo",
    "hint": "Lee con calma.",
    "showSentence": true
  },
  {
    "id": "l13",
    "level": 1,
    "title": "¿Cuál es el sujeto?",
    "tip": "Quién",
    "text": "Yo como pan.",
    "options": [
      "Yo",
      "como",
      "pan",
      "el"
    ],
    "answer": "Yo",
    "explanation": "Sujeto: Yo.",
    "skillTag": "sujeto",
    "hint": "Lee con calma.",
    "showSentence": true
  },
  {
    "id": "l14",
    "level": 1,
    "title": "Tipo de oración",
    "tip": "Signos",
    "text": "¡Qué bien!",
    "options": [
      "Exclamativa",
      "Interrogativa",
      "Enunciativa",
      "Imperativa"
    ],
    "answer": "Exclamativa",
    "explanation": "Signos ¡!: exclamativa.",
    "skillTag": "tipo_oracion",
    "hint": "Lee con calma.",
    "showSentence": true
  },
  {
    "id": "l15",
    "level": 1,
    "title": "Morfología: «casa» es…",
    "tip": "Tipo de palabra",
    "text": "La casa es grande.",
    "options": [
      "sustantivo",
      "verbo",
      "adjetivo",
      "adverbio"
    ],
    "answer": "sustantivo",
    "explanation": "Casa nombra una cosa: sustantivo.",
    "skillTag": "morfo",
    "hint": "Lee con calma.",
    "showSentence": true
  },
  {
    "id": "l16",
    "level": 1,
    "title": "Morfología: «grande» es…",
    "tip": "Tipo",
    "text": "La casa es grande.",
    "options": [
      "adjetivo",
      "sustantivo",
      "verbo",
      "pronombre"
    ],
    "answer": "adjetivo",
    "explanation": "Grande describe: adjetivo.",
    "skillTag": "morfo",
    "hint": "Lee con calma.",
    "showSentence": true
  },
  {
    "id": "l17",
    "level": 1,
    "title": "¿Cuál es el predicado?",
    "tip": "Qué se dice",
    "text": "Ellos cantan.",
    "options": [
      "cantan",
      "Ellos",
      "la",
      "canción"
    ],
    "answer": "cantan",
    "explanation": "Predicado: cantan.",
    "skillTag": "predicado",
    "hint": "Lee con calma.",
    "showSentence": true
  },
  {
    "id": "l18",
    "level": 1,
    "title": "¿Cuál es el sujeto?",
    "tip": "Quién",
    "text": "Ellos cantan.",
    "options": [
      "Ellos",
      "cantan",
      "canción",
      "la"
    ],
    "answer": "Ellos",
    "explanation": "Sujeto: Ellos.",
    "skillTag": "sujeto",
    "hint": "Lee con calma.",
    "showSentence": true
  },
  {
    "id": "l19",
    "level": 1,
    "title": "Ortografía",
    "tip": "Concordancia",
    "text": "",
    "options": [
      "Las flores son rojas.",
      "Las flores es rojas.",
      "La flores son rojas.",
      "Las flor son rojas."
    ],
    "answer": "Las flores son rojas.",
    "explanation": "Plural con plural.",
    "skillTag": "ortografia",
    "hint": "Lee con calma.",
    "showSentence": false
  },
  {
    "id": "l20",
    "level": 1,
    "title": "Ortografía",
    "tip": "Mayúscula",
    "text": "",
    "options": [
      "Madrid es bonita.",
      "madrid es bonita.",
      "Madrid Es bonita.",
      "madrid Es Bonita."
    ],
    "answer": "Madrid es bonita.",
    "explanation": "Nombres propios con mayúscula.",
    "skillTag": "ortografia",
    "hint": "Lee con calma.",
    "showSentence": false
  },
  {
    "id": "l21",
    "level": 1,
    "title": "¿Cuál es el verbo?",
    "tip": "Acción",
    "text": "Tú dibujas.",
    "options": [
      "dibujas",
      "Tú",
      "un",
      "mapa"
    ],
    "answer": "dibujas",
    "explanation": "Verbo: dibujas.",
    "skillTag": "verbo",
    "hint": "Lee con calma.",
    "showSentence": true
  },
  {
    "id": "l22",
    "level": 1,
    "title": "¿Cuál es el sujeto?",
    "tip": "Quién",
    "text": "Tú dibujas.",
    "options": [
      "Tú",
      "dibujas",
      "mapa",
      "un"
    ],
    "answer": "Tú",
    "explanation": "Sujeto: Tú.",
    "skillTag": "sujeto",
    "hint": "Lee con calma.",
    "showSentence": true
  },
  {
    "id": "l23",
    "level": 1,
    "title": "Tipo de oración",
    "tip": "Orden",
    "text": "Siéntate, por favor.",
    "options": [
      "Imperativa",
      "Enunciativa",
      "Interrogativa",
      "Exclamativa"
    ],
    "answer": "Imperativa",
    "explanation": "Da una orden: imperativa.",
    "skillTag": "tipo_oracion",
    "hint": "Lee con calma.",
    "showSentence": true
  },
  {
    "id": "l24",
    "level": 1,
    "title": "Separa sujeto | predicado",
    "tip": "Corte",
    "text": "Ana escribe.",
    "options": [
      "Ana | escribe",
      "Ana escribe |",
      "| Ana escribe",
      "An | a escribe"
    ],
    "answer": "Ana | escribe",
    "explanation": "Corta antes del verbo.",
    "skillTag": "separar",
    "hint": "Lee con calma.",
    "showSentence": true
  },
  {
    "id": "l25",
    "level": 1,
    "title": "¿Cuál es el predicado?",
    "tip": "Completo",
    "text": "Luis come fruta.",
    "options": [
      "come fruta",
      "Luis",
      "fruta",
      "come"
    ],
    "answer": "come fruta",
    "explanation": "Predicado: come fruta.",
    "skillTag": "predicado",
    "hint": "Lee con calma.",
    "showSentence": true
  },
  {
    "id": "l26",
    "level": 1,
    "title": "¿Cuál es el sujeto?",
    "tip": "Quién",
    "text": "Luis come fruta.",
    "options": [
      "Luis",
      "come",
      "fruta",
      "el"
    ],
    "answer": "Luis",
    "explanation": "Sujeto: Luis.",
    "skillTag": "sujeto",
    "hint": "Lee con calma.",
    "showSentence": true
  },
  {
    "id": "l27",
    "level": 1,
    "title": "Morfología: «rápido» es…",
    "tip": "Tipo",
    "text": "Corre rápido.",
    "options": [
      "adverbio",
      "sustantivo",
      "verbo",
      "pronombre"
    ],
    "answer": "adverbio",
    "explanation": "Rápido modifica al verbo: adverbio.",
    "skillTag": "morfo",
    "hint": "Lee con calma.",
    "showSentence": true
  },
  {
    "id": "l28",
    "level": 2,
    "title": "¿Cuál es el sujeto?",
    "tip": "Quién",
    "text": "Mis amigos cantan.",
    "options": [
      "Mis amigos",
      "cantan",
      "amigos",
      "Mis"
    ],
    "answer": "Mis amigos",
    "explanation": "¡Casi! Sujeto: Mis amigos.",
    "skillTag": "sujeto",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l29",
    "level": 2,
    "title": "¿Cuál es el predicado?",
    "tip": "Qué se dice",
    "text": "Mis amigos cantan en el coro.",
    "options": [
      "cantan en el coro",
      "Mis amigos",
      "el coro",
      "cantan"
    ],
    "answer": "cantan en el coro",
    "explanation": "¡Casi! Predicado desde el verbo.",
    "skillTag": "predicado",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l30",
    "level": 2,
    "title": "¿Cuál es el verbo?",
    "tip": "Acción",
    "text": "El mago abre el libro.",
    "options": [
      "abre",
      "mago",
      "libro",
      "El"
    ],
    "answer": "abre",
    "explanation": "¡Casi! Verbo: abre.",
    "skillTag": "verbo",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l31",
    "level": 2,
    "title": "¿Cuál es el sujeto?",
    "tip": "Completo",
    "text": "El mago antiguo lee.",
    "options": [
      "El mago antiguo",
      "lee",
      "mago",
      "El"
    ],
    "answer": "El mago antiguo",
    "explanation": "¡Casi! Incluye adjetivo.",
    "skillTag": "sujeto",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l32",
    "level": 2,
    "title": "Tipo de oración",
    "tip": "Signos",
    "text": "¡Qué noche tan mágica!",
    "options": [
      "Exclamativa",
      "Interrogativa",
      "Enunciativa",
      "Imperativa"
    ],
    "answer": "Exclamativa",
    "explanation": "¡Casi! ¡!: exclamativa.",
    "skillTag": "tipo_oracion",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l33",
    "level": 2,
    "title": "Tipo de oración",
    "tip": "Intención",
    "text": "Cierra el libro.",
    "options": [
      "Imperativa",
      "Enunciativa",
      "Interrogativa",
      "Exclamativa"
    ],
    "answer": "Imperativa",
    "explanation": "¡Casi! Orden: imperativa.",
    "skillTag": "tipo_oracion",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l34",
    "level": 2,
    "title": "Separa sujeto | predicado",
    "tip": "Corte",
    "text": "Nosotros leemos cuentos.",
    "options": [
      "Nosotros | leemos cuentos",
      "Nosotros leemos | cuentos",
      "| Nosotros leemos cuentos",
      "Nos | otros leemos cuentos"
    ],
    "answer": "Nosotros | leemos cuentos",
    "explanation": "¡Casi! Corta ante el verbo.",
    "skillTag": "separar",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l35",
    "level": 2,
    "title": "Morfología: «secreto» es…",
    "tip": "Tipo",
    "text": "Abre el libro secreto.",
    "options": [
      "adjetivo",
      "sustantivo",
      "verbo",
      "adverbio"
    ],
    "answer": "adjetivo",
    "explanation": "¡Casi! Describe al libro.",
    "skillTag": "morfo",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l36",
    "level": 2,
    "title": "Morfología: «libro» es…",
    "tip": "Tipo",
    "text": "Abre el libro secreto.",
    "options": [
      "sustantivo",
      "adjetivo",
      "verbo",
      "adverbio"
    ],
    "answer": "sustantivo",
    "explanation": "¡Casi! Nombra un objeto.",
    "skillTag": "morfo",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l37",
    "level": 2,
    "title": "Ortografía",
    "tip": "b/v",
    "text": "",
    "options": [
      "El barco navega.",
      "El varco navega.",
      "El barco nabega.",
      "El varco nabega."
    ],
    "answer": "El barco navega.",
    "explanation": "¡Casi! Barco con b.",
    "skillTag": "ortografia",
    "hint": "Pista: piensa en la regla.",
    "showSentence": false
  },
  {
    "id": "l38",
    "level": 2,
    "title": "Ortografía",
    "tip": "Concordancia",
    "text": "",
    "options": [
      "Los perros corren.",
      "Los perros corre.",
      "El perros corren.",
      "Los perro corren."
    ],
    "answer": "Los perros corren.",
    "explanation": "¡Casi! Plural + plural.",
    "skillTag": "ortografia",
    "hint": "Pista: piensa en la regla.",
    "showSentence": false
  },
  {
    "id": "l39",
    "level": 2,
    "title": "¿Cuál es el sujeto?",
    "tip": "Quién",
    "text": "Las estrellas brillan.",
    "options": [
      "Las estrellas",
      "brillan",
      "estrellas",
      "Las"
    ],
    "answer": "Las estrellas",
    "explanation": "¡Casi! Sujeto: Las estrellas.",
    "skillTag": "sujeto",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l40",
    "level": 2,
    "title": "¿Cuál es el predicado?",
    "tip": "Qué",
    "text": "Las estrellas brillan alto.",
    "options": [
      "brillan alto",
      "Las estrellas",
      "alto",
      "brillan"
    ],
    "answer": "brillan alto",
    "explanation": "¡Casi! Predicado completo.",
    "skillTag": "predicado",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l41",
    "level": 2,
    "title": "¿Cuál es el verbo?",
    "tip": "Acción",
    "text": "El dragón duerme.",
    "options": [
      "duerme",
      "dragón",
      "El",
      "cueva"
    ],
    "answer": "duerme",
    "explanation": "¡Casi! Verbo: duerme.",
    "skillTag": "verbo",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l42",
    "level": 2,
    "title": "Separa sujeto | predicado",
    "tip": "Corte",
    "text": "El dragón duerme.",
    "options": [
      "El dragón | duerme",
      "El | dragón duerme",
      "El dragón duerme |",
      "| El dragón duerme"
    ],
    "answer": "El dragón | duerme",
    "explanation": "¡Casi! Antes del verbo.",
    "skillTag": "separar",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l43",
    "level": 2,
    "title": "Tipo de oración",
    "tip": "Pregunta",
    "text": "¿Dónde está el mapa?",
    "options": [
      "Interrogativa",
      "Enunciativa",
      "Exclamativa",
      "Imperativa"
    ],
    "answer": "Interrogativa",
    "explanation": "¡Casi! ¿?: pregunta.",
    "skillTag": "tipo_oracion",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l44",
    "level": 2,
    "title": "¿Cuál es el sujeto?",
    "tip": "Quién",
    "text": "Tú escribes runas.",
    "options": [
      "Tú",
      "escribes",
      "runas",
      "las"
    ],
    "answer": "Tú",
    "explanation": "¡Casi! Sujeto: Tú.",
    "skillTag": "sujeto",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l45",
    "level": 2,
    "title": "¿Cuál es el predicado?",
    "tip": "Qué",
    "text": "Tú escribes runas.",
    "options": [
      "escribes runas",
      "Tú",
      "runas",
      "escribes"
    ],
    "answer": "escribes runas",
    "explanation": "¡Casi! Desde el verbo.",
    "skillTag": "predicado",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l46",
    "level": 2,
    "title": "Morfología: «muy» es…",
    "tip": "Tipo",
    "text": "Es muy alto.",
    "options": [
      "adverbio",
      "adjetivo",
      "sustantivo",
      "verbo"
    ],
    "answer": "adverbio",
    "explanation": "¡Casi! Muy modifica al adjetivo.",
    "skillTag": "morfo",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l47",
    "level": 2,
    "title": "Ortografía",
    "tip": "Mayúscula",
    "text": "",
    "options": [
      "España es un país.",
      "españa es un país.",
      "España Es un país.",
      "españa Es Un País."
    ],
    "answer": "España es un país.",
    "explanation": "¡Casi! Nombres propios.",
    "skillTag": "ortografia",
    "hint": "Pista: piensa en la regla.",
    "showSentence": false
  },
  {
    "id": "l48",
    "level": 2,
    "title": "¿Cuál es el verbo?",
    "tip": "Acción",
    "text": "Ellas pintan murales.",
    "options": [
      "pintan",
      "Ellas",
      "murales",
      "los"
    ],
    "answer": "pintan",
    "explanation": "¡Casi! Verbo: pintan.",
    "skillTag": "verbo",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l49",
    "level": 2,
    "title": "¿Cuál es el sujeto?",
    "tip": "Quién",
    "text": "Ellas pintan murales.",
    "options": [
      "Ellas",
      "pintan",
      "murales",
      "los"
    ],
    "answer": "Ellas",
    "explanation": "¡Casi! Sujeto: Ellas.",
    "skillTag": "sujeto",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l50",
    "level": 2,
    "title": "Separa sujeto | predicado",
    "tip": "Corte",
    "text": "El sol brilla.",
    "options": [
      "El sol | brilla",
      "El | sol brilla",
      "El sol brilla |",
      "| El sol brilla"
    ],
    "answer": "El sol | brilla",
    "explanation": "¡Casi! Corte correcto.",
    "skillTag": "separar",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l51",
    "level": 2,
    "title": "Tipo de oración",
    "tip": "Afirma",
    "text": "El sol brilla.",
    "options": [
      "Enunciativa",
      "Interrogativa",
      "Exclamativa",
      "Imperativa"
    ],
    "answer": "Enunciativa",
    "explanation": "¡Casi! Afirma: enunciativa.",
    "skillTag": "tipo_oracion",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l52",
    "level": 2,
    "title": "¿Cuál es el predicado?",
    "tip": "Completo",
    "text": "El sol brilla en el cielo.",
    "options": [
      "brilla en el cielo",
      "El sol",
      "en el cielo",
      "brilla"
    ],
    "answer": "brilla en el cielo",
    "explanation": "¡Casi! Predicado completo.",
    "skillTag": "predicado",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l53",
    "level": 2,
    "title": "Ortografía",
    "tip": "género",
    "text": "",
    "options": [
      "La niña contenta canta.",
      "La niña contento canta.",
      "El niña contenta canta.",
      "La niño contenta canta."
    ],
    "answer": "La niña contenta canta.",
    "explanation": "¡Casi! Femenino: contenta.",
    "skillTag": "ortografia",
    "hint": "Pista: piensa en la regla.",
    "showSentence": false
  },
  {
    "id": "l54",
    "level": 3,
    "title": "¿Cuál es el sujeto completo?",
    "tip": "Grupo",
    "text": "El pequeño dragón verde vuela.",
    "options": [
      "El pequeño dragón verde",
      "dragón verde",
      "El pequeño dragón",
      "vuela"
    ],
    "answer": "El pequeño dragón verde",
    "explanation": "¡Casi! Incluye adjetivos.",
    "skillTag": "sujeto",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l55",
    "level": 3,
    "title": "¿Cuál es el predicado?",
    "tip": "Desde verbo",
    "text": "El pequeño dragón verde vuela alto.",
    "options": [
      "vuela alto",
      "El pequeño dragón verde",
      "alto",
      "vuela"
    ],
    "answer": "vuela alto",
    "explanation": "¡Casi! Predicado: vuela alto.",
    "skillTag": "predicado",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l56",
    "level": 3,
    "title": "¿Cuál es el verbo?",
    "tip": "Acción",
    "text": "Las magas estudian cada tarde.",
    "options": [
      "estudian",
      "magas",
      "tarde",
      "Las"
    ],
    "answer": "estudian",
    "explanation": "¡Casi! Verbo: estudian.",
    "skillTag": "verbo",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l57",
    "level": 3,
    "title": "Separa sujeto | predicado",
    "tip": "Corte",
    "text": "Las magas estudian cada tarde.",
    "options": [
      "Las magas | estudian cada tarde",
      "Las | magas estudian cada tarde",
      "Las magas estudian | cada tarde",
      "¿Por qué | estudian las magas?"
    ],
    "answer": "Las magas | estudian cada tarde",
    "explanation": "¡Casi! Antes del verbo.",
    "skillTag": "separar",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l58",
    "level": 3,
    "title": "Tipo de oración",
    "tip": "Pregunta",
    "text": "¿Por qué estudian las magas?",
    "options": [
      "Interrogativa",
      "Enunciativa",
      "Exclamativa",
      "Imperativa"
    ],
    "answer": "Interrogativa",
    "explanation": "¡Casi! Pregunta.",
    "skillTag": "tipo_oracion",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l59",
    "level": 3,
    "title": "Tipo de oración",
    "tip": "Orden",
    "text": "Abre el pergamino ahora.",
    "options": [
      "Imperativa",
      "Enunciativa",
      "Interrogativa",
      "Exclamativa"
    ],
    "answer": "Imperativa",
    "explanation": "¡Casi! Orden.",
    "skillTag": "tipo_oracion",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l60",
    "level": 3,
    "title": "Morfología: «antiguo» es…",
    "tip": "Tipo",
    "text": "El castillo antiguo brilla.",
    "options": [
      "adjetivo",
      "sustantivo",
      "verbo",
      "adverbio"
    ],
    "answer": "adjetivo",
    "explanation": "¡Casi! Describe.",
    "skillTag": "morfo",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l61",
    "level": 3,
    "title": "Morfología: «castillo» es…",
    "tip": "Tipo",
    "text": "El castillo antiguo brilla.",
    "options": [
      "sustantivo",
      "adjetivo",
      "verbo",
      "adverbio"
    ],
    "answer": "sustantivo",
    "explanation": "¡Casi! Nombra.",
    "skillTag": "morfo",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l62",
    "level": 3,
    "title": "¿Cuál es el sujeto?",
    "tip": "Quién",
    "text": "Nosotros guardamos secretos.",
    "options": [
      "Nosotros",
      "guardamos",
      "secretos",
      "los"
    ],
    "answer": "Nosotros",
    "explanation": "¡Casi! Sujeto: Nosotros.",
    "skillTag": "sujeto",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l63",
    "level": 3,
    "title": "¿Cuál es el predicado?",
    "tip": "Qué",
    "text": "Nosotros guardamos secretos.",
    "options": [
      "guardamos secretos",
      "Nosotros",
      "secretos",
      "guardamos"
    ],
    "answer": "guardamos secretos",
    "explanation": "¡Casi! Predicado completo.",
    "skillTag": "predicado",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l64",
    "level": 3,
    "title": "Ortografía",
    "tip": "Plural",
    "text": "",
    "options": [
      "Los libros mágicos son largos.",
      "Los libros mágicos es largos.",
      "El libros mágicos son largos.",
      "Los libro mágicos son largos."
    ],
    "answer": "Los libros mágicos son largos.",
    "explanation": "¡Casi! Todo en plural.",
    "skillTag": "ortografia",
    "hint": "Pista: piensa en la regla.",
    "showSentence": false
  },
  {
    "id": "l65",
    "level": 3,
    "title": "Ortografía",
    "tip": "b/v",
    "text": "",
    "options": [
      "La biblioteca es grande.",
      "La viblioteca es grande.",
      "La biblioteca es grende.",
      "La viblioteca es grende."
    ],
    "answer": "La biblioteca es grande.",
    "explanation": "¡Casi! Biblioteca con b.",
    "skillTag": "ortografia",
    "hint": "Pista: piensa en la regla.",
    "showSentence": false
  },
  {
    "id": "l66",
    "level": 3,
    "title": "¿Cuál es el verbo?",
    "tip": "Acción",
    "text": "El guardián protege la torre.",
    "options": [
      "protege",
      "guardián",
      "torre",
      "El"
    ],
    "answer": "protege",
    "explanation": "¡Casi! Verbo: protege.",
    "skillTag": "verbo",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l67",
    "level": 3,
    "title": "¿Cuál es el sujeto?",
    "tip": "Completo",
    "text": "El guardián de la torre duerme.",
    "options": [
      "El guardián de la torre",
      "guardián",
      "duerme",
      "torre"
    ],
    "answer": "El guardián de la torre",
    "explanation": "¡Casi! Sujeto largo.",
    "skillTag": "sujeto",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l68",
    "level": 3,
    "title": "Separa sujeto | predicado",
    "tip": "Corte",
    "text": "El guardián protege la torre.",
    "options": [
      "El guardián | protege la torre",
      "El | guardián protege la torre",
      "El guardián protege | la torre",
      "| El guardián protege la torre"
    ],
    "answer": "El guardián | protege la torre",
    "explanation": "¡Casi! Corte ante verbo.",
    "skillTag": "separar",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l69",
    "level": 3,
    "title": "Tipo de oración",
    "tip": "Emoción",
    "text": "¡Qué torre tan alta!",
    "options": [
      "Exclamativa",
      "Interrogativa",
      "Enunciativa",
      "Imperativa"
    ],
    "answer": "Exclamativa",
    "explanation": "¡Casi! ¡!",
    "skillTag": "tipo_oracion",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l70",
    "level": 3,
    "title": "Morfología: «rápidamente» es…",
    "tip": "Tipo",
    "text": "Corre rápidamente.",
    "options": [
      "adverbio",
      "adjetivo",
      "sustantivo",
      "verbo"
    ],
    "answer": "adverbio",
    "explanation": "¡Casi! Modifica al verbo.",
    "skillTag": "morfo",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l71",
    "level": 3,
    "title": "¿Cuál es el predicado?",
    "tip": "Completo",
    "text": "Pedro y Ana abren el mapa.",
    "options": [
      "abren el mapa",
      "Pedro y Ana",
      "el mapa",
      "abren"
    ],
    "answer": "abren el mapa",
    "explanation": "¡Casi! Desde el verbo.",
    "skillTag": "predicado",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l72",
    "level": 3,
    "title": "¿Cuál es el sujeto?",
    "tip": "Quiénes",
    "text": "Pedro y Ana abren el mapa.",
    "options": [
      "Pedro y Ana",
      "abren",
      "el mapa",
      "mapa"
    ],
    "answer": "Pedro y Ana",
    "explanation": "¡Casi! Sujeto compuesto.",
    "skillTag": "sujeto",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l73",
    "level": 3,
    "title": "Ortografía",
    "tip": "Concordancia",
    "text": "",
    "options": [
      "Esta runa es poderosa.",
      "Esta runa son poderosa.",
      "Estas runa es poderosa.",
      "Esta runa es poderosos."
    ],
    "answer": "Esta runa es poderosa.",
    "explanation": "¡Casi! Singular + singular.",
    "skillTag": "ortografia",
    "hint": "Pista: piensa en la regla.",
    "showSentence": false
  },
  {
    "id": "l74",
    "level": 3,
    "title": "¿Cuál es el verbo?",
    "tip": "Acción",
    "text": "Los vientos soplan fuerte.",
    "options": [
      "soplan",
      "vientos",
      "fuerte",
      "Los"
    ],
    "answer": "soplan",
    "explanation": "¡Casi! Verbo: soplan.",
    "skillTag": "verbo",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l75",
    "level": 3,
    "title": "Separa sujeto | predicado",
    "tip": "Corte",
    "text": "Los vientos soplan fuerte.",
    "options": [
      "Los vientos | soplan fuerte",
      "Los | vientos soplan fuerte",
      "Los vientos soplan | fuerte",
      "| Los vientos soplan fuerte"
    ],
    "answer": "Los vientos | soplan fuerte",
    "explanation": "¡Casi! Corte correcto.",
    "skillTag": "separar",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l76",
    "level": 3,
    "title": "Tipo de oración",
    "tip": "Afirma",
    "text": "Los vientos soplan fuerte.",
    "options": [
      "Enunciativa",
      "Interrogativa",
      "Exclamativa",
      "Imperativa"
    ],
    "answer": "Enunciativa",
    "explanation": "¡Casi! Afirma.",
    "skillTag": "tipo_oracion",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l77",
    "level": 3,
    "title": "¿Cuál es el sujeto?",
    "tip": "Quién",
    "text": "Ella descifra códigos.",
    "options": [
      "Ella",
      "descifra",
      "códigos",
      "los"
    ],
    "answer": "Ella",
    "explanation": "¡Casi! Sujeto: Ella.",
    "skillTag": "sujeto",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l78",
    "level": 3,
    "title": "¿Cuál es el predicado?",
    "tip": "Qué",
    "text": "Ella descifra códigos.",
    "options": [
      "descifra códigos",
      "Ella",
      "códigos",
      "descifra"
    ],
    "answer": "descifra códigos",
    "explanation": "¡Casi! Predicado.",
    "skillTag": "predicado",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l79",
    "level": 3,
    "title": "Morfología: «códigos» es…",
    "tip": "Tipo",
    "text": "Ella descifra códigos.",
    "options": [
      "sustantivo",
      "verbo",
      "adjetivo",
      "adverbio"
    ],
    "answer": "sustantivo",
    "explanation": "¡Casi! Nombra.",
    "skillTag": "morfo",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l80",
    "level": 4,
    "title": "¿Cuál es el sujeto completo?",
    "tip": "Grupo largo",
    "text": "La joven maga de la academia resuelve enigmas.",
    "options": [
      "La joven maga de la academia",
      "resuelve enigmas",
      "maga",
      "academia"
    ],
    "answer": "La joven maga de la academia",
    "explanation": "¡Casi! Sujeto largo.",
    "skillTag": "sujeto",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l81",
    "level": 4,
    "title": "¿Cuál es el predicado?",
    "tip": "Completo",
    "text": "La joven maga de la academia resuelve enigmas.",
    "options": [
      "resuelve enigmas",
      "La joven maga de la academia",
      "enigmas",
      "resuelve"
    ],
    "answer": "resuelve enigmas",
    "explanation": "¡Casi! Desde el verbo.",
    "skillTag": "predicado",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l82",
    "level": 4,
    "title": "¿Cuál es el verbo?",
    "tip": "Acción",
    "text": "Los antiguos libros guardan secretos.",
    "options": [
      "guardan",
      "libros",
      "secretos",
      "Los"
    ],
    "answer": "guardan",
    "explanation": "¡Casi! Verbo: guardan.",
    "skillTag": "verbo",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l83",
    "level": 4,
    "title": "Separa sujeto | predicado",
    "tip": "Corte",
    "text": "Los antiguos libros guardan secretos.",
    "options": [
      "Los antiguos libros | guardan secretos",
      "Los | antiguos libros guardan secretos",
      "Los antiguos libros guardan | secretos",
      "| Los antiguos libros guardan secretos"
    ],
    "answer": "Los antiguos libros | guardan secretos",
    "explanation": "¡Casi! Corte.",
    "skillTag": "separar",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l84",
    "level": 4,
    "title": "Tipo de oración",
    "tip": "Pregunta",
    "text": "¿Cuándo abre la biblioteca misteriosa?",
    "options": [
      "Interrogativa",
      "Enunciativa",
      "Exclamativa",
      "Imperativa"
    ],
    "answer": "Interrogativa",
    "explanation": "¡Casi! Pregunta.",
    "skillTag": "tipo_oracion",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l85",
    "level": 4,
    "title": "Tipo de oración",
    "tip": "Orden",
    "text": "Trae el grimorio ahora mismo.",
    "options": [
      "Imperativa",
      "Enunciativa",
      "Interrogativa",
      "Exclamativa"
    ],
    "answer": "Imperativa",
    "explanation": "¡Casi! Orden.",
    "skillTag": "tipo_oracion",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l86",
    "level": 4,
    "title": "Morfología: «misteriosa» es…",
    "tip": "Tipo",
    "text": "La biblioteca misteriosa brilla.",
    "options": [
      "adjetivo",
      "sustantivo",
      "verbo",
      "adverbio"
    ],
    "answer": "adjetivo",
    "explanation": "¡Casi! Describe.",
    "skillTag": "morfo",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l87",
    "level": 4,
    "title": "Ortografía",
    "tip": "Difícil",
    "text": "",
    "options": [
      "Hubo una tormenta mágica.",
      "Ubo una tormenta mágica.",
      "Hubo una tormentas mágica.",
      "Huvo una tormenta mágica."
    ],
    "answer": "Hubo una tormenta mágica.",
    "explanation": "¡Casi! Hubo con h.",
    "skillTag": "ortografia",
    "hint": "Pista: piensa en la regla.",
    "showSentence": false
  },
  {
    "id": "l88",
    "level": 4,
    "title": "¿Cuál es el sujeto?",
    "tip": "Quiénes",
    "text": "Vosotros conocéis el camino.",
    "options": [
      "Vosotros",
      "conocéis",
      "camino",
      "el"
    ],
    "answer": "Vosotros",
    "explanation": "¡Casi! Sujeto: Vosotros.",
    "skillTag": "sujeto",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l89",
    "level": 4,
    "title": "¿Cuál es el predicado?",
    "tip": "Qué",
    "text": "Vosotros conocéis el camino oculto.",
    "options": [
      "conocéis el camino oculto",
      "Vosotros",
      "el camino oculto",
      "conocéis"
    ],
    "answer": "conocéis el camino oculto",
    "explanation": "¡Casi! Predicado completo.",
    "skillTag": "predicado",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l90",
    "level": 4,
    "title": "Separa sujeto | predicado",
    "tip": "Corte",
    "text": "El eco de la torre responde.",
    "options": [
      "El eco de la torre | responde",
      "El eco | de la torre responde",
      "El | eco de la torre responde",
      "| El eco de la torre responde"
    ],
    "answer": "El eco de la torre | responde",
    "explanation": "¡Casi! Corte.",
    "skillTag": "separar",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l91",
    "level": 4,
    "title": "Tipo de oración",
    "tip": "Emoción",
    "text": "¡Nunca había visto tanta luz!",
    "options": [
      "Exclamativa",
      "Interrogativa",
      "Enunciativa",
      "Imperativa"
    ],
    "answer": "Exclamativa",
    "explanation": "¡Casi! ¡!",
    "skillTag": "tipo_oracion",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l92",
    "level": 4,
    "title": "¿Cuál es el verbo?",
    "tip": "Acción",
    "text": "El eco de la torre responde.",
    "options": [
      "responde",
      "eco",
      "torre",
      "El"
    ],
    "answer": "responde",
    "explanation": "¡Casi! Verbo: responde.",
    "skillTag": "verbo",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l93",
    "level": 4,
    "title": "Morfología: «nunca» es…",
    "tip": "Tipo",
    "text": "Nunca había visto tanta luz.",
    "options": [
      "adverbio",
      "adjetivo",
      "sustantivo",
      "verbo"
    ],
    "answer": "adverbio",
    "explanation": "¡Casi! Nunca es adverbio.",
    "skillTag": "morfo",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l94",
    "level": 4,
    "title": "Ortografía",
    "tip": "Concordancia",
    "text": "",
    "options": [
      "Estas runas antiguas brillan.",
      "Estas runas antiguas brilla.",
      "Esta runas antiguas brillan.",
      "Estas runa antiguas brillan."
    ],
    "answer": "Estas runas antiguas brillan.",
    "explanation": "¡Casi! Plural coherente.",
    "skillTag": "ortografia",
    "hint": "Pista: piensa en la regla.",
    "showSentence": false
  },
  {
    "id": "l95",
    "level": 4,
    "title": "¿Cuál es el sujeto?",
    "tip": "Completo",
    "text": "Todas las antorchas del pasillo se apagan.",
    "options": [
      "Todas las antorchas del pasillo",
      "se apagan",
      "antorchas",
      "pasillo"
    ],
    "answer": "Todas las antorchas del pasillo",
    "explanation": "¡Casi! Sujeto largo.",
    "skillTag": "sujeto",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l96",
    "level": 4,
    "title": "¿Cuál es el predicado?",
    "tip": "Qué",
    "text": "Todas las antorchas del pasillo se apagan.",
    "options": [
      "se apagan",
      "Todas las antorchas del pasillo",
      "apagan",
      "se"
    ],
    "answer": "se apagan",
    "explanation": "¡Casi! Predicado: se apagan.",
    "skillTag": "predicado",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l97",
    "level": 4,
    "title": "Tipo de oración",
    "tip": "Afirma",
    "text": "Todas las antorchas del pasillo se apagan.",
    "options": [
      "Enunciativa",
      "Interrogativa",
      "Exclamativa",
      "Imperativa"
    ],
    "answer": "Enunciativa",
    "explanation": "¡Casi! Afirma.",
    "skillTag": "tipo_oracion",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l98",
    "level": 4,
    "title": "Separa sujeto | predicado",
    "tip": "Corte",
    "text": "Un susurro cruza el salón.",
    "options": [
      "Un susurro | cruza el salón",
      "Un | susurro cruza el salón",
      "Un susurro cruza | el salón",
      "| Un susurro cruza el salón"
    ],
    "answer": "Un susurro | cruza el salón",
    "explanation": "¡Casi! Corte.",
    "skillTag": "separar",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l99",
    "level": 4,
    "title": "¿Cuál es el verbo?",
    "tip": "Acción",
    "text": "Un susurro cruza el salón.",
    "options": [
      "cruza",
      "susurro",
      "salón",
      "Un"
    ],
    "answer": "cruza",
    "explanation": "¡Casi! Verbo: cruza.",
    "skillTag": "verbo",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l100",
    "level": 4,
    "title": "Morfología: «salón» es…",
    "tip": "Tipo",
    "text": "Un susurro cruza el salón.",
    "options": [
      "sustantivo",
      "adjetivo",
      "verbo",
      "adverbio"
    ],
    "answer": "sustantivo",
    "explanation": "¡Casi! Nombra lugar.",
    "skillTag": "morfo",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l101",
    "level": 4,
    "title": "Ortografía",
    "tip": "Mayúscula",
    "text": "",
    "options": [
      "Europa tiene muchos países.",
      "europa tiene muchos países.",
      "Europa Tiene muchos países.",
      "europa Tiene Muchos Países."
    ],
    "answer": "Europa tiene muchos países.",
    "explanation": "¡Casi! Continente con mayúscula.",
    "skillTag": "ortografia",
    "hint": "Pista: piensa en la regla.",
    "showSentence": false
  },
  {
    "id": "l102",
    "level": 4,
    "title": "¿Cuál es el sujeto?",
    "tip": "Quién",
    "text": "Ese mapa antiguo revela islas.",
    "options": [
      "Ese mapa antiguo",
      "revela islas",
      "mapa",
      "islas"
    ],
    "answer": "Ese mapa antiguo",
    "explanation": "¡Casi! Sujeto.",
    "skillTag": "sujeto",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l103",
    "level": 4,
    "title": "¿Cuál es el predicado?",
    "tip": "Qué",
    "text": "Ese mapa antiguo revela islas.",
    "options": [
      "revela islas",
      "Ese mapa antiguo",
      "islas",
      "revela"
    ],
    "answer": "revela islas",
    "explanation": "¡Casi! Predicado.",
    "skillTag": "predicado",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l104",
    "level": 4,
    "title": "Tipo de oración",
    "tip": "Pregunta",
    "text": "¿Revela el mapa islas lejanas?",
    "options": [
      "Interrogativa",
      "Enunciativa",
      "Exclamativa",
      "Imperativa"
    ],
    "answer": "Interrogativa",
    "explanation": "¡Casi! Pregunta.",
    "skillTag": "tipo_oracion",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l105",
    "level": 4,
    "title": "Ortografía",
    "tip": "h",
    "text": "",
    "options": [
      "Hay un enigma en la puerta.",
      "Ay un enigma en la puerta.",
      "Hay un enigma en la puertah.",
      "Hay un enígma en la puerta."
    ],
    "answer": "Hay un enigma en la puerta.",
    "explanation": "¡Casi! Hay con h.",
    "skillTag": "ortografia",
    "hint": "Pista: piensa en la regla.",
    "showSentence": false
  },
  {
    "id": "l106",
    "level": 5,
    "title": "¿Cuál es el sujeto completo?",
    "tip": "Grupo largo",
    "text": "La joven maga de la Academia Arcana resuelve enigmas.",
    "options": [
      "La joven maga de la academia",
      "resuelve enigmas",
      "maga",
      "academia"
    ],
    "answer": "La joven maga de la academia",
    "explanation": "¡Casi! Sujeto largo.",
    "skillTag": "sujeto",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l107",
    "level": 5,
    "title": "¿Cuál es el predicado?",
    "tip": "Completo",
    "text": "La joven maga de la Academia Arcana resuelve enigmas.",
    "options": [
      "resuelve enigmas",
      "La joven maga de la academia",
      "enigmas",
      "resuelve"
    ],
    "answer": "resuelve enigmas",
    "explanation": "¡Casi! Desde el verbo.",
    "skillTag": "predicado",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l108",
    "level": 5,
    "title": "¿Cuál es el verbo?",
    "tip": "Acción",
    "text": "Los antiguos libros guardan secretos.",
    "options": [
      "guardan",
      "libros",
      "secretos",
      "Los"
    ],
    "answer": "guardan",
    "explanation": "¡Casi! Verbo: guardan.",
    "skillTag": "verbo",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l109",
    "level": 5,
    "title": "Separa sujeto | predicado",
    "tip": "Corte",
    "text": "Los antiguos libros guardan secretos.",
    "options": [
      "Los antiguos libros | guardan secretos",
      "Los | antiguos libros guardan secretos",
      "Los antiguos libros guardan | secretos",
      "| Los antiguos libros guardan secretos"
    ],
    "answer": "Los antiguos libros | guardan secretos",
    "explanation": "¡Casi! Corte.",
    "skillTag": "separar",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l110",
    "level": 5,
    "title": "Tipo de oración",
    "tip": "Pregunta",
    "text": "¿Cuándo abre la biblioteca misteriosa?",
    "options": [
      "Interrogativa",
      "Enunciativa",
      "Exclamativa",
      "Imperativa"
    ],
    "answer": "Interrogativa",
    "explanation": "¡Casi! Pregunta.",
    "skillTag": "tipo_oracion",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l111",
    "level": 5,
    "title": "Tipo de oración",
    "tip": "Orden",
    "text": "Trae el grimorio ahora mismo.",
    "options": [
      "Imperativa",
      "Enunciativa",
      "Interrogativa",
      "Exclamativa"
    ],
    "answer": "Imperativa",
    "explanation": "¡Casi! Orden.",
    "skillTag": "tipo_oracion",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l112",
    "level": 5,
    "title": "Morfología: «misteriosa» es…",
    "tip": "Tipo",
    "text": "La biblioteca misteriosa brilla.",
    "options": [
      "adjetivo",
      "sustantivo",
      "verbo",
      "adverbio"
    ],
    "answer": "adjetivo",
    "explanation": "¡Casi! Describe.",
    "skillTag": "morfo",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l113",
    "level": 5,
    "title": "Ortografía",
    "tip": "Difícil",
    "text": "",
    "options": [
      "Hubo una tormenta mágica.",
      "Ubo una tormenta mágica.",
      "Hubo una tormentas mágica.",
      "Huvo una tormenta mágica."
    ],
    "answer": "Hubo una tormenta mágica.",
    "explanation": "¡Casi! Hubo con h.",
    "skillTag": "ortografia",
    "hint": "Pista: piensa en la regla.",
    "showSentence": false
  },
  {
    "id": "l114",
    "level": 5,
    "title": "¿Cuál es el sujeto?",
    "tip": "Quiénes",
    "text": "Vosotros conocéis el camino.",
    "options": [
      "Vosotros",
      "conocéis",
      "camino",
      "el"
    ],
    "answer": "Vosotros",
    "explanation": "¡Casi! Sujeto: Vosotros.",
    "skillTag": "sujeto",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l115",
    "level": 5,
    "title": "¿Cuál es el predicado?",
    "tip": "Qué",
    "text": "Vosotros conocéis el camino oculto.",
    "options": [
      "conocéis el camino oculto",
      "Vosotros",
      "el camino oculto",
      "conocéis"
    ],
    "answer": "conocéis el camino oculto",
    "explanation": "¡Casi! Predicado completo.",
    "skillTag": "predicado",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l116",
    "level": 5,
    "title": "Separa sujeto | predicado",
    "tip": "Corte",
    "text": "El eco de la torre responde.",
    "options": [
      "El eco de la torre | responde",
      "El eco | de la torre responde",
      "El | eco de la torre responde",
      "| El eco de la torre responde"
    ],
    "answer": "El eco de la torre | responde",
    "explanation": "¡Casi! Corte.",
    "skillTag": "separar",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l117",
    "level": 5,
    "title": "Tipo de oración",
    "tip": "Emoción",
    "text": "¡Nunca había visto tanta luz!",
    "options": [
      "Exclamativa",
      "Interrogativa",
      "Enunciativa",
      "Imperativa"
    ],
    "answer": "Exclamativa",
    "explanation": "¡Casi! ¡!",
    "skillTag": "tipo_oracion",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l118",
    "level": 5,
    "title": "¿Cuál es el verbo?",
    "tip": "Acción",
    "text": "El eco de la torre responde.",
    "options": [
      "responde",
      "eco",
      "torre",
      "El"
    ],
    "answer": "responde",
    "explanation": "¡Casi! Verbo: responde.",
    "skillTag": "verbo",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l119",
    "level": 5,
    "title": "Morfología: «nunca» es…",
    "tip": "Tipo",
    "text": "Nunca había visto tanta luz.",
    "options": [
      "adverbio",
      "adjetivo",
      "sustantivo",
      "verbo"
    ],
    "answer": "adverbio",
    "explanation": "¡Casi! Nunca es adverbio.",
    "skillTag": "morfo",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l120",
    "level": 5,
    "title": "Ortografía",
    "tip": "Concordancia",
    "text": "",
    "options": [
      "Estas runas antiguas brillan.",
      "Estas runas antiguas brilla.",
      "Esta runas antiguas brillan.",
      "Estas runa antiguas brillan."
    ],
    "answer": "Estas runas antiguas brillan.",
    "explanation": "¡Casi! Plural coherente.",
    "skillTag": "ortografia",
    "hint": "Pista: piensa en la regla.",
    "showSentence": false
  },
  {
    "id": "l121",
    "level": 5,
    "title": "¿Cuál es el sujeto?",
    "tip": "Completo",
    "text": "Todas las antorchas del pasillo se apagan.",
    "options": [
      "Todas las antorchas del pasillo",
      "se apagan",
      "antorchas",
      "pasillo"
    ],
    "answer": "Todas las antorchas del pasillo",
    "explanation": "¡Casi! Sujeto largo.",
    "skillTag": "sujeto",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l122",
    "level": 5,
    "title": "¿Cuál es el predicado?",
    "tip": "Qué",
    "text": "Todas las antorchas del pasillo se apagan.",
    "options": [
      "se apagan",
      "Todas las antorchas del pasillo",
      "apagan",
      "se"
    ],
    "answer": "se apagan",
    "explanation": "¡Casi! Predicado: se apagan.",
    "skillTag": "predicado",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l123",
    "level": 5,
    "title": "Tipo de oración",
    "tip": "Afirma",
    "text": "Todas las antorchas del pasillo se apagan.",
    "options": [
      "Enunciativa",
      "Interrogativa",
      "Exclamativa",
      "Imperativa"
    ],
    "answer": "Enunciativa",
    "explanation": "¡Casi! Afirma.",
    "skillTag": "tipo_oracion",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l124",
    "level": 5,
    "title": "Separa sujeto | predicado",
    "tip": "Corte",
    "text": "Un susurro cruza el salón.",
    "options": [
      "Un susurro | cruza el salón",
      "Un | susurro cruza el salón",
      "Un susurro cruza | el salón",
      "| Un susurro cruza el salón"
    ],
    "answer": "Un susurro | cruza el salón",
    "explanation": "¡Casi! Corte.",
    "skillTag": "separar",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l125",
    "level": 5,
    "title": "¿Cuál es el verbo?",
    "tip": "Acción",
    "text": "Un susurro cruza el salón.",
    "options": [
      "cruza",
      "susurro",
      "salón",
      "Un"
    ],
    "answer": "cruza",
    "explanation": "¡Casi! Verbo: cruza.",
    "skillTag": "verbo",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l126",
    "level": 5,
    "title": "Morfología: «salón» es…",
    "tip": "Tipo",
    "text": "Un susurro cruza el salón.",
    "options": [
      "sustantivo",
      "adjetivo",
      "verbo",
      "adverbio"
    ],
    "answer": "sustantivo",
    "explanation": "¡Casi! Nombra lugar.",
    "skillTag": "morfo",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l127",
    "level": 5,
    "title": "Ortografía",
    "tip": "Mayúscula",
    "text": "",
    "options": [
      "Europa tiene muchos países.",
      "europa tiene muchos países.",
      "Europa Tiene muchos países.",
      "europa Tiene Muchos Países."
    ],
    "answer": "Europa tiene muchos países.",
    "explanation": "¡Casi! Continente con mayúscula.",
    "skillTag": "ortografia",
    "hint": "Pista: piensa en la regla.",
    "showSentence": false
  },
  {
    "id": "l128",
    "level": 5,
    "title": "¿Cuál es el sujeto?",
    "tip": "Quién",
    "text": "Ese mapa antiguo revela islas.",
    "options": [
      "Ese mapa antiguo",
      "revela islas",
      "mapa",
      "islas"
    ],
    "answer": "Ese mapa antiguo",
    "explanation": "¡Casi! Sujeto.",
    "skillTag": "sujeto",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l129",
    "level": 5,
    "title": "¿Cuál es el predicado?",
    "tip": "Qué",
    "text": "Ese mapa antiguo revela islas.",
    "options": [
      "revela islas",
      "Ese mapa antiguo",
      "islas",
      "revela"
    ],
    "answer": "revela islas",
    "explanation": "¡Casi! Predicado.",
    "skillTag": "predicado",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l130",
    "level": 5,
    "title": "Tipo de oración",
    "tip": "Pregunta",
    "text": "¿Revela el mapa islas lejanas?",
    "options": [
      "Interrogativa",
      "Enunciativa",
      "Exclamativa",
      "Imperativa"
    ],
    "answer": "Interrogativa",
    "explanation": "¡Casi! Pregunta.",
    "skillTag": "tipo_oracion",
    "hint": "Pista: piensa en la regla.",
    "showSentence": true
  },
  {
    "id": "l131",
    "level": 5,
    "title": "Ortografía",
    "tip": "h",
    "text": "",
    "options": [
      "Hay un enigma en la puerta.",
      "Ay un enigma en la puerta.",
      "Hay un enigma en la puertah.",
      "Hay un enígma en la puerta."
    ],
    "answer": "Hay un enigma en la puerta.",
    "explanation": "¡Casi! Hay con h.",
    "skillTag": "ortografia",
    "hint": "Pista: piensa en la regla.",
    "showSentence": false
  }
];
export const ENG_BANK: EngQ[] = [
  {
    "id": "e1",
    "level": 1,
    "kind": "translate",
    "prompt": "How do you say «libro» in English?",
    "promptEs": "¿Cómo se dice «libro»?",
    "options": [
      "book",
      "look",
      "boot",
      "brook"
    ],
    "answer": "book",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «libro» es book."
  },
  {
    "id": "e2",
    "level": 1,
    "kind": "translate",
    "prompt": "How do you say «casa» in English?",
    "promptEs": "¿Cómo se dice «casa»?",
    "options": [
      "house",
      "horse",
      "mouse",
      "home"
    ],
    "answer": "house",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «casa» es house."
  },
  {
    "id": "e3",
    "level": 1,
    "kind": "translate",
    "prompt": "How do you say «amigo» in English?",
    "promptEs": "¿Cómo se dice «amigo»?",
    "options": [
      "friend",
      "family",
      "father",
      "fresh"
    ],
    "answer": "friend",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «amigo» es friend."
  },
  {
    "id": "e4",
    "level": 1,
    "kind": "translate",
    "prompt": "How do you say «perro» in English?",
    "promptEs": "¿Cómo se dice «perro»?",
    "options": [
      "dog",
      "god",
      "dot",
      "dig"
    ],
    "answer": "dog",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «perro» es dog."
  },
  {
    "id": "e5",
    "level": 1,
    "kind": "translate",
    "prompt": "How do you say «gato» in English?",
    "promptEs": "¿Cómo se dice «gato»?",
    "options": [
      "cat",
      "cut",
      "cap",
      "car"
    ],
    "answer": "cat",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «gato» es cat."
  },
  {
    "id": "e6",
    "level": 1,
    "kind": "translate",
    "prompt": "How do you say «agua» in English?",
    "promptEs": "¿Cómo se dice «agua»?",
    "options": [
      "water",
      "waiter",
      "winter",
      "watch"
    ],
    "answer": "water",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «agua» es water."
  },
  {
    "id": "e7",
    "level": 1,
    "kind": "translate",
    "prompt": "How do you say «sol» in English?",
    "promptEs": "¿Cómo se dice «sol»?",
    "options": [
      "sun",
      "son",
      "sum",
      "sin"
    ],
    "answer": "sun",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «sol» es sun."
  },
  {
    "id": "e8",
    "level": 1,
    "kind": "translate",
    "prompt": "How do you say «luna» in English?",
    "promptEs": "¿Cómo se dice «luna»?",
    "options": [
      "moon",
      "soon",
      "noon",
      "moan"
    ],
    "answer": "moon",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «luna» es moon."
  },
  {
    "id": "e9",
    "level": 1,
    "kind": "translate",
    "prompt": "How do you say «rojo» in English?",
    "promptEs": "¿Cómo se dice «rojo»?",
    "options": [
      "red",
      "read",
      "rid",
      "rod"
    ],
    "answer": "red",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «rojo» es red."
  },
  {
    "id": "e10",
    "level": 1,
    "kind": "translate",
    "prompt": "How do you say «azul» in English?",
    "promptEs": "¿Cómo se dice «azul»?",
    "options": [
      "blue",
      "blow",
      "ball",
      "bell"
    ],
    "answer": "blue",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «azul» es blue."
  },
  {
    "id": "e11",
    "level": 1,
    "kind": "translate",
    "prompt": "How do you say «verde» in English?",
    "promptEs": "¿Cómo se dice «verde»?",
    "options": [
      "green",
      "grey",
      "great",
      "grain"
    ],
    "answer": "green",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «verde» es green."
  },
  {
    "id": "e12",
    "level": 1,
    "kind": "translate",
    "prompt": "How do you say «escuela» in English?",
    "promptEs": "¿Cómo se dice «escuela»?",
    "options": [
      "school",
      "shop",
      "shell",
      "skill"
    ],
    "answer": "school",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «escuela» es school."
  },
  {
    "id": "e13",
    "level": 1,
    "kind": "translate",
    "prompt": "How do you say «feliz» in English?",
    "promptEs": "¿Cómo se dice «feliz»?",
    "options": [
      "happy",
      "hungry",
      "heavy",
      "hurry"
    ],
    "answer": "happy",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «feliz» es happy."
  },
  {
    "id": "e14",
    "level": 2,
    "kind": "translate",
    "prompt": "How do you say «manzana» in English?",
    "promptEs": "¿Cómo se dice «manzana»?",
    "options": [
      "apple",
      "apply",
      "apron",
      "april"
    ],
    "answer": "apple",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «manzana» es apple."
  },
  {
    "id": "e15",
    "level": 2,
    "kind": "translate",
    "prompt": "How do you say «ventana» in English?",
    "promptEs": "¿Cómo se dice «ventana»?",
    "options": [
      "window",
      "winter",
      "winner",
      "wind"
    ],
    "answer": "window",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «ventana» es window."
  },
  {
    "id": "e16",
    "level": 2,
    "kind": "translate",
    "prompt": "How do you say «puerta» in English?",
    "promptEs": "¿Cómo se dice «puerta»?",
    "options": [
      "door",
      "deer",
      "dear",
      "down"
    ],
    "answer": "door",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «puerta» es door."
  },
  {
    "id": "e17",
    "level": 2,
    "kind": "translate",
    "prompt": "How do you say «mesa» in English?",
    "promptEs": "¿Cómo se dice «mesa»?",
    "options": [
      "table",
      "tablet",
      "cable",
      "able"
    ],
    "answer": "table",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «mesa» es table."
  },
  {
    "id": "e18",
    "level": 2,
    "kind": "translate",
    "prompt": "How do you say «silla» in English?",
    "promptEs": "¿Cómo se dice «silla»?",
    "options": [
      "chair",
      "chain",
      "cheer",
      "char"
    ],
    "answer": "chair",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «silla» es chair."
  },
  {
    "id": "e19",
    "level": 2,
    "kind": "translate",
    "prompt": "How do you say «libro» in English?",
    "promptEs": "¿Cómo se dice «libro»?",
    "options": [
      "book",
      "hook",
      "took",
      "look"
    ],
    "answer": "book",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «libro» es book."
  },
  {
    "id": "e20",
    "level": 2,
    "kind": "translate",
    "prompt": "How do you say «niño» in English?",
    "promptEs": "¿Cómo se dice «niño»?",
    "options": [
      "boy",
      "bay",
      "buy",
      "bow"
    ],
    "answer": "boy",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «niño» es boy."
  },
  {
    "id": "e21",
    "level": 2,
    "kind": "translate",
    "prompt": "How do you say «niña» in English?",
    "promptEs": "¿Cómo se dice «niña»?",
    "options": [
      "girl",
      "grill",
      "goal",
      "gold"
    ],
    "answer": "girl",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «niña» es girl."
  },
  {
    "id": "e22",
    "level": 3,
    "kind": "translate",
    "prompt": "How do you say «profesor» in English?",
    "promptEs": "¿Cómo se dice «profesor»?",
    "options": [
      "teacher",
      "teaser",
      "treater",
      "theater"
    ],
    "answer": "teacher",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «profesor» es teacher."
  },
  {
    "id": "e23",
    "level": 3,
    "kind": "translate",
    "prompt": "How do you say «estudiante» in English?",
    "promptEs": "¿Cómo se dice «estudiante»?",
    "options": [
      "student",
      "studio",
      "study",
      "sudden"
    ],
    "answer": "student",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «estudiante» es student."
  },
  {
    "id": "e24",
    "level": 3,
    "kind": "translate",
    "prompt": "How do you say «familia» in English?",
    "promptEs": "¿Cómo se dice «familia»?",
    "options": [
      "family",
      "famous",
      "farmer",
      "fairy"
    ],
    "answer": "family",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «familia» es family."
  },
  {
    "id": "e25",
    "level": 3,
    "kind": "translate",
    "prompt": "How do you say «ciudad» in English?",
    "promptEs": "¿Cómo se dice «ciudad»?",
    "options": [
      "city",
      "cite",
      "cute",
      "cat"
    ],
    "answer": "city",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «ciudad» es city."
  },
  {
    "id": "e26",
    "level": 3,
    "kind": "translate",
    "prompt": "How do you say «país» in English?",
    "promptEs": "¿Cómo se dice «país»?",
    "options": [
      "country",
      "county",
      "count",
      "counter"
    ],
    "answer": "country",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «país» es country."
  },
  {
    "id": "e27",
    "level": 4,
    "kind": "translate",
    "prompt": "How do you say «biblioteca» in English?",
    "promptEs": "¿Cómo se dice «biblioteca»?",
    "options": [
      "library",
      "liberty",
      "likely",
      "lizard"
    ],
    "answer": "library",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «biblioteca» es library."
  },
  {
    "id": "e28",
    "level": 4,
    "kind": "translate",
    "prompt": "How do you say «aventura» in English?",
    "promptEs": "¿Cómo se dice «aventura»?",
    "options": [
      "adventure",
      "advance",
      "advice",
      "avenue"
    ],
    "answer": "adventure",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «aventura» es adventure."
  },
  {
    "id": "e29",
    "level": 4,
    "kind": "translate",
    "prompt": "How do you say «misterio» in English?",
    "promptEs": "¿Cómo se dice «misterio»?",
    "options": [
      "mystery",
      "mastery",
      "ministry",
      "memory"
    ],
    "answer": "mystery",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «misterio» es mystery."
  },
  {
    "id": "e30",
    "level": 5,
    "kind": "translate",
    "prompt": "How do you say «hechizo» in English?",
    "promptEs": "¿Cómo se dice «hechizo»?",
    "options": [
      "spell",
      "spill",
      "smell",
      "shell"
    ],
    "answer": "spell",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «hechizo» es spell."
  },
  {
    "id": "e31",
    "level": 5,
    "kind": "translate",
    "prompt": "How do you say «dragón» in English?",
    "promptEs": "¿Cómo se dice «dragón»?",
    "options": [
      "dragon",
      "drag",
      "drain",
      "drawn"
    ],
    "answer": "dragon",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «dragón» es dragon."
  },
  {
    "id": "e32",
    "level": 5,
    "kind": "translate",
    "prompt": "How do you say «estrella» in English?",
    "promptEs": "¿Cómo se dice «estrella»?",
    "options": [
      "star",
      "stare",
      "start",
      "store"
    ],
    "answer": "star",
    "hint": "Think of the meaning.",
    "explanation": "¡Casi! «estrella» es star."
  },
  {
    "id": "e33",
    "level": 1,
    "kind": "choose",
    "prompt": "I ___ a student.",
    "promptEs": "Elige el verbo.",
    "options": [
      "am",
      "is",
      "are",
      "be"
    ],
    "answer": "am",
    "hint": "Grammar spell.",
    "explanation": "¡Casi! La forma correcta es «am»."
  },
  {
    "id": "e34",
    "level": 1,
    "kind": "choose",
    "prompt": "She ___ my sister.",
    "promptEs": "Elige.",
    "options": [
      "is",
      "am",
      "are",
      "be"
    ],
    "answer": "is",
    "hint": "Grammar spell.",
    "explanation": "¡Casi! La forma correcta es «is»."
  },
  {
    "id": "e35",
    "level": 1,
    "kind": "choose",
    "prompt": "They ___ friends.",
    "promptEs": "Elige.",
    "options": [
      "are",
      "is",
      "am",
      "be"
    ],
    "answer": "are",
    "hint": "Grammar spell.",
    "explanation": "¡Casi! La forma correcta es «are»."
  },
  {
    "id": "e36",
    "level": 1,
    "kind": "complete",
    "prompt": "I can ___ a book.",
    "promptEs": "Completa.",
    "options": [
      "read",
      "ride",
      "red",
      "run"
    ],
    "answer": "read",
    "hint": "Grammar spell.",
    "explanation": "¡Casi! La forma correcta es «read»."
  },
  {
    "id": "e37",
    "level": 1,
    "kind": "complete",
    "prompt": "This is a ___.",
    "promptEs": "Completa (gato).",
    "options": [
      "cat",
      "cut",
      "cap",
      "car"
    ],
    "answer": "cat",
    "hint": "Grammar spell.",
    "explanation": "¡Casi! La forma correcta es «cat»."
  },
  {
    "id": "e38",
    "level": 2,
    "kind": "choose",
    "prompt": "He ___ happy.",
    "promptEs": "Elige.",
    "options": [
      "is",
      "am",
      "are",
      "be"
    ],
    "answer": "is",
    "hint": "Grammar spell.",
    "explanation": "¡Casi! La forma correcta es «is»."
  },
  {
    "id": "e39",
    "level": 2,
    "kind": "choose",
    "prompt": "We ___ ready.",
    "promptEs": "Elige.",
    "options": [
      "are",
      "is",
      "am",
      "be"
    ],
    "answer": "are",
    "hint": "Grammar spell.",
    "explanation": "¡Casi! La forma correcta es «are»."
  },
  {
    "id": "e40",
    "level": 2,
    "kind": "complete",
    "prompt": "I can ___ a bike.",
    "promptEs": "Completa.",
    "options": [
      "ride",
      "read",
      "write",
      "run"
    ],
    "answer": "ride",
    "hint": "Grammar spell.",
    "explanation": "¡Casi! La forma correcta es «ride»."
  },
  {
    "id": "e41",
    "level": 2,
    "kind": "complete",
    "prompt": "Good ___, teacher!",
    "promptEs": "Saludo matutino.",
    "options": [
      "morning",
      "night",
      "evening",
      "bye"
    ],
    "answer": "morning",
    "hint": "Grammar spell.",
    "explanation": "¡Casi! La forma correcta es «morning»."
  },
  {
    "id": "e42",
    "level": 2,
    "kind": "choose",
    "prompt": "You ___ my friend.",
    "promptEs": "Elige.",
    "options": [
      "are",
      "is",
      "am",
      "be"
    ],
    "answer": "are",
    "hint": "Grammar spell.",
    "explanation": "¡Casi! La forma correcta es «are»."
  },
  {
    "id": "e43",
    "level": 3,
    "kind": "choose",
    "prompt": "There ___ two cats.",
    "promptEs": "Elige.",
    "options": [
      "are",
      "is",
      "am",
      "be"
    ],
    "answer": "are",
    "hint": "Grammar spell.",
    "explanation": "¡Casi! La forma correcta es «are»."
  },
  {
    "id": "e44",
    "level": 3,
    "kind": "choose",
    "prompt": "There ___ a book.",
    "promptEs": "Elige.",
    "options": [
      "is",
      "are",
      "am",
      "be"
    ],
    "answer": "is",
    "hint": "Grammar spell.",
    "explanation": "¡Casi! La forma correcta es «is»."
  },
  {
    "id": "e45",
    "level": 3,
    "kind": "complete",
    "prompt": "How ___ you?",
    "promptEs": "Saludo.",
    "options": [
      "are",
      "is",
      "am",
      "be"
    ],
    "answer": "are",
    "hint": "Grammar spell.",
    "explanation": "¡Casi! La forma correcta es «are»."
  },
  {
    "id": "e46",
    "level": 3,
    "kind": "complete",
    "prompt": "She can ___ English.",
    "promptEs": "Completa.",
    "options": [
      "speak",
      "spike",
      "spoon",
      "spot"
    ],
    "answer": "speak",
    "hint": "Grammar spell.",
    "explanation": "¡Casi! La forma correcta es «speak»."
  },
  {
    "id": "e47",
    "level": 3,
    "kind": "choose",
    "prompt": "It ___ a map.",
    "promptEs": "Elige.",
    "options": [
      "is",
      "are",
      "am",
      "be"
    ],
    "answer": "is",
    "hint": "Grammar spell.",
    "explanation": "¡Casi! La forma correcta es «is»."
  },
  {
    "id": "e48",
    "level": 4,
    "kind": "choose",
    "prompt": "There ___ many stars.",
    "promptEs": "Elige.",
    "options": [
      "are",
      "is",
      "am",
      "be"
    ],
    "answer": "are",
    "hint": "Grammar spell.",
    "explanation": "¡Casi! La forma correcta es «are»."
  },
  {
    "id": "e49",
    "level": 4,
    "kind": "complete",
    "prompt": "I ___ from Spain.",
    "promptEs": "Completa.",
    "options": [
      "am",
      "is",
      "are",
      "be"
    ],
    "answer": "am",
    "hint": "Grammar spell.",
    "explanation": "¡Casi! La forma correcta es «am»."
  },
  {
    "id": "e50",
    "level": 4,
    "kind": "complete",
    "prompt": "They ___ playing.",
    "promptEs": "Completa.",
    "options": [
      "are",
      "is",
      "am",
      "be"
    ],
    "answer": "are",
    "hint": "Grammar spell.",
    "explanation": "¡Casi! La forma correcta es «are»."
  },
  {
    "id": "e51",
    "level": 4,
    "kind": "choose",
    "prompt": "Where ___ you from?",
    "promptEs": "Elige.",
    "options": [
      "are",
      "is",
      "am",
      "be"
    ],
    "answer": "are",
    "hint": "Grammar spell.",
    "explanation": "¡Casi! La forma correcta es «are»."
  },
  {
    "id": "e52",
    "level": 4,
    "kind": "complete",
    "prompt": "We can ___ the door.",
    "promptEs": "Completa.",
    "options": [
      "open",
      "oven",
      "over",
      "only"
    ],
    "answer": "open",
    "hint": "Grammar spell.",
    "explanation": "¡Casi! La forma correcta es «open»."
  },
  {
    "id": "e53",
    "level": 5,
    "kind": "choose",
    "prompt": "There ___ an ancient map.",
    "promptEs": "Elige.",
    "options": [
      "is",
      "are",
      "am",
      "be"
    ],
    "answer": "is",
    "hint": "Grammar spell.",
    "explanation": "¡Casi! La forma correcta es «is»."
  },
  {
    "id": "e54",
    "level": 5,
    "kind": "complete",
    "prompt": "How old ___ you?",
    "promptEs": "Pregunta.",
    "options": [
      "are",
      "is",
      "am",
      "be"
    ],
    "answer": "are",
    "hint": "Grammar spell.",
    "explanation": "¡Casi! La forma correcta es «are»."
  },
  {
    "id": "e55",
    "level": 5,
    "kind": "complete",
    "prompt": "She ___ not here.",
    "promptEs": "Completa.",
    "options": [
      "is",
      "are",
      "am",
      "be"
    ],
    "answer": "is",
    "hint": "Grammar spell.",
    "explanation": "¡Casi! La forma correcta es «is»."
  },
  {
    "id": "e56",
    "level": 5,
    "kind": "choose",
    "prompt": "___ you like magic?",
    "promptEs": "Elige.",
    "options": [
      "Do",
      "Does",
      "Is",
      "Are"
    ],
    "answer": "Do",
    "hint": "Grammar spell.",
    "explanation": "¡Casi! La forma correcta es «Do»."
  },
  {
    "id": "e57",
    "level": 5,
    "kind": "complete",
    "prompt": "I ___ not a dragon.",
    "promptEs": "Completa.",
    "options": [
      "am",
      "is",
      "are",
      "be"
    ],
    "answer": "am",
    "hint": "Grammar spell.",
    "explanation": "¡Casi! La forma correcta es «am»."
  },
  {
    "id": "e58",
    "level": 1,
    "kind": "translate",
    "prompt": "How do you say «uno»?",
    "promptEs": "¿Cómo se dice «uno»?",
    "options": [
      "one",
      "two",
      "three",
      "four"
    ],
    "answer": "one",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «uno» es one."
  },
  {
    "id": "e59",
    "level": 1,
    "kind": "translate",
    "prompt": "How do you say «dos»?",
    "promptEs": "¿Cómo se dice «dos»?",
    "options": [
      "two",
      "one",
      "three",
      "four"
    ],
    "answer": "two",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «dos» es two."
  },
  {
    "id": "e60",
    "level": 1,
    "kind": "translate",
    "prompt": "How do you say «tres»?",
    "promptEs": "¿Cómo se dice «tres»?",
    "options": [
      "three",
      "one",
      "two",
      "four"
    ],
    "answer": "three",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «tres» es three."
  },
  {
    "id": "e61",
    "level": 1,
    "kind": "translate",
    "prompt": "How do you say «cuatro»?",
    "promptEs": "¿Cómo se dice «cuatro»?",
    "options": [
      "four",
      "one",
      "two",
      "three"
    ],
    "answer": "four",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «cuatro» es four."
  },
  {
    "id": "e62",
    "level": 1,
    "kind": "translate",
    "prompt": "How do you say «cinco»?",
    "promptEs": "¿Cómo se dice «cinco»?",
    "options": [
      "five",
      "one",
      "two",
      "three"
    ],
    "answer": "five",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «cinco» es five."
  },
  {
    "id": "e63",
    "level": 1,
    "kind": "translate",
    "prompt": "How do you say «seis»?",
    "promptEs": "¿Cómo se dice «seis»?",
    "options": [
      "six",
      "one",
      "two",
      "three"
    ],
    "answer": "six",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «seis» es six."
  },
  {
    "id": "e64",
    "level": 1,
    "kind": "translate",
    "prompt": "How do you say «siete»?",
    "promptEs": "¿Cómo se dice «siete»?",
    "options": [
      "seven",
      "one",
      "two",
      "three"
    ],
    "answer": "seven",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «siete» es seven."
  },
  {
    "id": "e65",
    "level": 1,
    "kind": "translate",
    "prompt": "How do you say «ocho»?",
    "promptEs": "¿Cómo se dice «ocho»?",
    "options": [
      "eight",
      "one",
      "two",
      "three"
    ],
    "answer": "eight",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «ocho» es eight."
  },
  {
    "id": "e66",
    "level": 1,
    "kind": "translate",
    "prompt": "How do you say «nueve»?",
    "promptEs": "¿Cómo se dice «nueve»?",
    "options": [
      "nine",
      "one",
      "two",
      "three"
    ],
    "answer": "nine",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «nueve» es nine."
  },
  {
    "id": "e67",
    "level": 1,
    "kind": "translate",
    "prompt": "How do you say «diez»?",
    "promptEs": "¿Cómo se dice «diez»?",
    "options": [
      "ten",
      "one",
      "two",
      "three"
    ],
    "answer": "ten",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «diez» es ten."
  },
  {
    "id": "e68",
    "level": 2,
    "kind": "translate",
    "prompt": "How do you say «once»?",
    "promptEs": "¿Cómo se dice «once»?",
    "options": [
      "eleven",
      "twelve",
      "twenty",
      "thirty"
    ],
    "answer": "eleven",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «once» es eleven."
  },
  {
    "id": "e69",
    "level": 2,
    "kind": "translate",
    "prompt": "How do you say «doce»?",
    "promptEs": "¿Cómo se dice «doce»?",
    "options": [
      "twelve",
      "eleven",
      "twenty",
      "thirty"
    ],
    "answer": "twelve",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «doce» es twelve."
  },
  {
    "id": "e70",
    "level": 2,
    "kind": "translate",
    "prompt": "How do you say «veinte»?",
    "promptEs": "¿Cómo se dice «veinte»?",
    "options": [
      "twenty",
      "eleven",
      "twelve",
      "thirty"
    ],
    "answer": "twenty",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «veinte» es twenty."
  },
  {
    "id": "e71",
    "level": 2,
    "kind": "translate",
    "prompt": "How do you say «treinta»?",
    "promptEs": "¿Cómo se dice «treinta»?",
    "options": [
      "thirty",
      "eleven",
      "twelve",
      "twenty"
    ],
    "answer": "thirty",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «treinta» es thirty."
  },
  {
    "id": "e72",
    "level": 2,
    "kind": "translate",
    "prompt": "How do you say «día»?",
    "promptEs": "¿Cómo se dice «día»?",
    "options": [
      "day",
      "eleven",
      "twelve",
      "twenty"
    ],
    "answer": "day",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «día» es day."
  },
  {
    "id": "e73",
    "level": 2,
    "kind": "translate",
    "prompt": "How do you say «noche»?",
    "promptEs": "¿Cómo se dice «noche»?",
    "options": [
      "night",
      "eleven",
      "twelve",
      "twenty"
    ],
    "answer": "night",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «noche» es night."
  },
  {
    "id": "e74",
    "level": 2,
    "kind": "translate",
    "prompt": "How do you say «comida»?",
    "promptEs": "¿Cómo se dice «comida»?",
    "options": [
      "food",
      "eleven",
      "twelve",
      "twenty"
    ],
    "answer": "food",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «comida» es food."
  },
  {
    "id": "e75",
    "level": 2,
    "kind": "translate",
    "prompt": "How do you say «leche»?",
    "promptEs": "¿Cómo se dice «leche»?",
    "options": [
      "milk",
      "eleven",
      "twelve",
      "twenty"
    ],
    "answer": "milk",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «leche» es milk."
  },
  {
    "id": "e76",
    "level": 2,
    "kind": "translate",
    "prompt": "How do you say «pan»?",
    "promptEs": "¿Cómo se dice «pan»?",
    "options": [
      "bread",
      "eleven",
      "twelve",
      "twenty"
    ],
    "answer": "bread",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «pan» es bread."
  },
  {
    "id": "e77",
    "level": 2,
    "kind": "translate",
    "prompt": "How do you say «pez»?",
    "promptEs": "¿Cómo se dice «pez»?",
    "options": [
      "fish",
      "eleven",
      "twelve",
      "twenty"
    ],
    "answer": "fish",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «pez» es fish."
  },
  {
    "id": "e78",
    "level": 3,
    "kind": "translate",
    "prompt": "How do you say «lunes»?",
    "promptEs": "¿Cómo se dice «lunes»?",
    "options": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday"
    ],
    "answer": "Monday",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «lunes» es Monday."
  },
  {
    "id": "e79",
    "level": 3,
    "kind": "translate",
    "prompt": "How do you say «martes»?",
    "promptEs": "¿Cómo se dice «martes»?",
    "options": [
      "Tuesday",
      "Monday",
      "Wednesday",
      "Thursday"
    ],
    "answer": "Tuesday",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «martes» es Tuesday."
  },
  {
    "id": "e80",
    "level": 3,
    "kind": "translate",
    "prompt": "How do you say «miércoles»?",
    "promptEs": "¿Cómo se dice «miércoles»?",
    "options": [
      "Wednesday",
      "Monday",
      "Tuesday",
      "Thursday"
    ],
    "answer": "Wednesday",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «miércoles» es Wednesday."
  },
  {
    "id": "e81",
    "level": 3,
    "kind": "translate",
    "prompt": "How do you say «jueves»?",
    "promptEs": "¿Cómo se dice «jueves»?",
    "options": [
      "Thursday",
      "Monday",
      "Tuesday",
      "Wednesday"
    ],
    "answer": "Thursday",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «jueves» es Thursday."
  },
  {
    "id": "e82",
    "level": 3,
    "kind": "translate",
    "prompt": "How do you say «viernes»?",
    "promptEs": "¿Cómo se dice «viernes»?",
    "options": [
      "Friday",
      "Monday",
      "Tuesday",
      "Wednesday"
    ],
    "answer": "Friday",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «viernes» es Friday."
  },
  {
    "id": "e83",
    "level": 3,
    "kind": "translate",
    "prompt": "How do you say «madre»?",
    "promptEs": "¿Cómo se dice «madre»?",
    "options": [
      "mother",
      "Monday",
      "Tuesday",
      "Wednesday"
    ],
    "answer": "mother",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «madre» es mother."
  },
  {
    "id": "e84",
    "level": 3,
    "kind": "translate",
    "prompt": "How do you say «padre»?",
    "promptEs": "¿Cómo se dice «padre»?",
    "options": [
      "father",
      "Monday",
      "Tuesday",
      "Wednesday"
    ],
    "answer": "father",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «padre» es father."
  },
  {
    "id": "e85",
    "level": 3,
    "kind": "translate",
    "prompt": "How do you say «hermano»?",
    "promptEs": "¿Cómo se dice «hermano»?",
    "options": [
      "brother",
      "Monday",
      "Tuesday",
      "Wednesday"
    ],
    "answer": "brother",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «hermano» es brother."
  },
  {
    "id": "e86",
    "level": 3,
    "kind": "translate",
    "prompt": "How do you say «hermana»?",
    "promptEs": "¿Cómo se dice «hermana»?",
    "options": [
      "sister",
      "Monday",
      "Tuesday",
      "Wednesday"
    ],
    "answer": "sister",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «hermana» es sister."
  },
  {
    "id": "e87",
    "level": 3,
    "kind": "translate",
    "prompt": "How do you say «bebé»?",
    "promptEs": "¿Cómo se dice «bebé»?",
    "options": [
      "baby",
      "Monday",
      "Tuesday",
      "Wednesday"
    ],
    "answer": "baby",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «bebé» es baby."
  },
  {
    "id": "e88",
    "level": 4,
    "kind": "translate",
    "prompt": "How do you say «tiempo/clima»?",
    "promptEs": "¿Cómo se dice «tiempo/clima»?",
    "options": [
      "weather",
      "summer",
      "winter",
      "spring"
    ],
    "answer": "weather",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «tiempo/clima» es weather."
  },
  {
    "id": "e89",
    "level": 4,
    "kind": "translate",
    "prompt": "How do you say «verano»?",
    "promptEs": "¿Cómo se dice «verano»?",
    "options": [
      "summer",
      "weather",
      "winter",
      "spring"
    ],
    "answer": "summer",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «verano» es summer."
  },
  {
    "id": "e90",
    "level": 4,
    "kind": "translate",
    "prompt": "How do you say «invierno»?",
    "promptEs": "¿Cómo se dice «invierno»?",
    "options": [
      "winter",
      "weather",
      "summer",
      "spring"
    ],
    "answer": "winter",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «invierno» es winter."
  },
  {
    "id": "e91",
    "level": 4,
    "kind": "translate",
    "prompt": "How do you say «primavera»?",
    "promptEs": "¿Cómo se dice «primavera»?",
    "options": [
      "spring",
      "weather",
      "summer",
      "winter"
    ],
    "answer": "spring",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «primavera» es spring."
  },
  {
    "id": "e92",
    "level": 4,
    "kind": "translate",
    "prompt": "How do you say «otoño»?",
    "promptEs": "¿Cómo se dice «otoño»?",
    "options": [
      "autumn",
      "weather",
      "summer",
      "winter"
    ],
    "answer": "autumn",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «otoño» es autumn."
  },
  {
    "id": "e93",
    "level": 4,
    "kind": "translate",
    "prompt": "How do you say «montaña»?",
    "promptEs": "¿Cómo se dice «montaña»?",
    "options": [
      "mountain",
      "weather",
      "summer",
      "winter"
    ],
    "answer": "mountain",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «montaña» es mountain."
  },
  {
    "id": "e94",
    "level": 4,
    "kind": "translate",
    "prompt": "How do you say «río»?",
    "promptEs": "¿Cómo se dice «río»?",
    "options": [
      "river",
      "weather",
      "summer",
      "winter"
    ],
    "answer": "river",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «río» es river."
  },
  {
    "id": "e95",
    "level": 4,
    "kind": "translate",
    "prompt": "How do you say «bosque»?",
    "promptEs": "¿Cómo se dice «bosque»?",
    "options": [
      "forest",
      "weather",
      "summer",
      "winter"
    ],
    "answer": "forest",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «bosque» es forest."
  },
  {
    "id": "e96",
    "level": 4,
    "kind": "translate",
    "prompt": "How do you say «castillo»?",
    "promptEs": "¿Cómo se dice «castillo»?",
    "options": [
      "castle",
      "weather",
      "summer",
      "winter"
    ],
    "answer": "castle",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «castillo» es castle."
  },
  {
    "id": "e97",
    "level": 4,
    "kind": "translate",
    "prompt": "How do you say «puente»?",
    "promptEs": "¿Cómo se dice «puente»?",
    "options": [
      "bridge",
      "weather",
      "summer",
      "winter"
    ],
    "answer": "bridge",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «puente» es bridge."
  },
  {
    "id": "e98",
    "level": 5,
    "kind": "translate",
    "prompt": "How do you say «aventura»?",
    "promptEs": "¿Cómo se dice «aventura»?",
    "options": [
      "adventure",
      "mystery",
      "courage",
      "wisdom"
    ],
    "answer": "adventure",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «aventura» es adventure."
  },
  {
    "id": "e99",
    "level": 5,
    "kind": "translate",
    "prompt": "How do you say «misterio»?",
    "promptEs": "¿Cómo se dice «misterio»?",
    "options": [
      "mystery",
      "adventure",
      "courage",
      "wisdom"
    ],
    "answer": "mystery",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «misterio» es mystery."
  },
  {
    "id": "e100",
    "level": 5,
    "kind": "translate",
    "prompt": "How do you say «valor»?",
    "promptEs": "¿Cómo se dice «valor»?",
    "options": [
      "courage",
      "adventure",
      "mystery",
      "wisdom"
    ],
    "answer": "courage",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «valor» es courage."
  },
  {
    "id": "e101",
    "level": 5,
    "kind": "translate",
    "prompt": "How do you say «sabiduría»?",
    "promptEs": "¿Cómo se dice «sabiduría»?",
    "options": [
      "wisdom",
      "adventure",
      "mystery",
      "courage"
    ],
    "answer": "wisdom",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «sabiduría» es wisdom."
  },
  {
    "id": "e102",
    "level": 5,
    "kind": "translate",
    "prompt": "How do you say «libertad»?",
    "promptEs": "¿Cómo se dice «libertad»?",
    "options": [
      "freedom",
      "adventure",
      "mystery",
      "courage"
    ],
    "answer": "freedom",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «libertad» es freedom."
  },
  {
    "id": "e103",
    "level": 5,
    "kind": "translate",
    "prompt": "How do you say «viaje»?",
    "promptEs": "¿Cómo se dice «viaje»?",
    "options": [
      "journey",
      "adventure",
      "mystery",
      "courage"
    ],
    "answer": "journey",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «viaje» es journey."
  },
  {
    "id": "e104",
    "level": 5,
    "kind": "translate",
    "prompt": "How do you say «tesoro»?",
    "promptEs": "¿Cómo se dice «tesoro»?",
    "options": [
      "treasure",
      "adventure",
      "mystery",
      "courage"
    ],
    "answer": "treasure",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «tesoro» es treasure."
  },
  {
    "id": "e105",
    "level": 5,
    "kind": "translate",
    "prompt": "How do you say «leyenda»?",
    "promptEs": "¿Cómo se dice «leyenda»?",
    "options": [
      "legend",
      "adventure",
      "mystery",
      "courage"
    ],
    "answer": "legend",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «leyenda» es legend."
  },
  {
    "id": "e106",
    "level": 5,
    "kind": "translate",
    "prompt": "How do you say «sombra»?",
    "promptEs": "¿Cómo se dice «sombra»?",
    "options": [
      "shadow",
      "adventure",
      "mystery",
      "courage"
    ],
    "answer": "shadow",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «sombra» es shadow."
  },
  {
    "id": "e107",
    "level": 5,
    "kind": "translate",
    "prompt": "How do you say «luz»?",
    "promptEs": "¿Cómo se dice «luz»?",
    "options": [
      "light",
      "adventure",
      "mystery",
      "courage"
    ],
    "answer": "light",
    "hint": "Vocabulary spell.",
    "explanation": "¡Casi! «luz» es light."
  },
{"id":"e201","level":2,"kind":"translate","prompt":"How do you say «zapatos»?","promptEs":"¿Cómo se dice zapatos?","options":["shoes","shows","shops","ships"],"answer":"shoes","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «shoes»."},
{"id":"e202","level":2,"kind":"translate","prompt":"How do you say «manos»?","promptEs":"¿Cómo se dice manos?","options":["hands","heads","hats","hills"],"answer":"hands","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «hands»."},
{"id":"e203","level":2,"kind":"translate","prompt":"How do you say «ojos»?","promptEs":"¿Cómo se dice ojos?","options":["eyes","ears","eggs","ends"],"answer":"eyes","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «eyes»."},
{"id":"e204","level":2,"kind":"choose","prompt":"It ___ cold today.","promptEs":"Elige.","options":["is","are","am","be"],"answer":"is","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «is»."},
{"id":"e205","level":2,"kind":"complete","prompt":"Please ___ the door.","promptEs":"Completa.","options":["close","cloth","clock","cloud"],"answer":"close","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «close»."},
{"id":"e206","level":3,"kind":"translate","prompt":"How do you say «desayuno»?","promptEs":"¿Cómo se dice desayuno?","options":["breakfast","break","bread","beach"],"answer":"breakfast","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «breakfast»."},
{"id":"e207","level":3,"kind":"translate","prompt":"How do you say «cena»?","promptEs":"¿Cómo se dice cena?","options":["dinner","driver","danger","dollar"],"answer":"dinner","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «dinner»."},
{"id":"e208","level":3,"kind":"translate","prompt":"How do you say «almuerzo»?","promptEs":"¿Cómo se dice almuerzo?","options":["lunch","launch","lamp","land"],"answer":"lunch","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «lunch»."},
{"id":"e209","level":3,"kind":"choose","prompt":"My name ___ Liz.","promptEs":"Elige.","options":["is","are","am","be"],"answer":"is","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «is»."},
{"id":"e210","level":3,"kind":"complete","prompt":"I like to ___.","promptEs":"Completa (jugar).","options":["play","pray","plan","plot"],"answer":"play","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «play»."},
{"id":"e211","level":3,"kind":"translate","prompt":"How do you say «jugar»?","promptEs":"¿Cómo se dice jugar?","options":["play","pray","pay","ply"],"answer":"play","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «play»."},
{"id":"e212","level":4,"kind":"translate","prompt":"How do you say «valiente»?","promptEs":"¿Cómo se dice valiente?","options":["brave","bread","break","brain"],"answer":"brave","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «brave»."},
{"id":"e213","level":4,"kind":"translate","prompt":"How do you say «rápido»?","promptEs":"¿Cómo se dice rápido?","options":["fast","fist","feast","first"],"answer":"fast","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «fast»."},
{"id":"e214","level":4,"kind":"translate","prompt":"How do you say «lento»?","promptEs":"¿Cómo se dice lento?","options":["slow","snow","show","slot"],"answer":"slow","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «slow»."},
{"id":"e215","level":4,"kind":"choose","prompt":"The books ___ on the table.","promptEs":"Elige.","options":["are","is","am","be"],"answer":"are","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «are»."},
{"id":"e216","level":4,"kind":"complete","prompt":"Can you ___ me?","promptEs":"Completa (ayudar).","options":["help","hold","hope","heap"],"answer":"help","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «help»."},
{"id":"e217","level":4,"kind":"translate","prompt":"How do you say «ayudar»?","promptEs":"¿Cómo se dice ayudar?","options":["help","held","heap","hope"],"answer":"help","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «help»."},
{"id":"e218","level":5,"kind":"translate","prompt":"How do you say «poder» (habilidad)?","promptEs":"¿Cómo se dice poder?","options":["power","powder","pollen","piano"],"answer":"power","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «power»."},
{"id":"e219","level":5,"kind":"translate","prompt":"How do you say «conocimiento»?","promptEs":"¿Cómo se dice conocimiento?","options":["knowledge","know","known","knife"],"answer":"knowledge","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «knowledge»."},
{"id":"e220","level":5,"kind":"translate","prompt":"How do you say «magia»?","promptEs":"¿Cómo se dice magia?","options":["magic","magnet","major","mango"],"answer":"magic","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «magic»."},
{"id":"e221","level":5,"kind":"choose","prompt":"___ there a spell?","promptEs":"Elige.","options":["Is","Are","Am","Do"],"answer":"Is","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «Is»."},
{"id":"e222","level":5,"kind":"complete","prompt":"We ___ learning English.","promptEs":"Completa.","options":["are","is","am","be"],"answer":"are","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «are»."},
{"id":"e223","level":5,"kind":"translate","prompt":"How do you say «aprender»?","promptEs":"¿Cómo se dice aprender?","options":["learn","lean","leave","least"],"answer":"learn","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «learn»."},
{"id":"e224","level":5,"kind":"choose","prompt":"She does not ___ late.","promptEs":"Elige.","options":["arrive","arrival","around","arrow"],"answer":"arrive","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «arrive»."},
{"id":"e225","level":2,"kind":"translate","prompt":"How do you say «nariz»?","promptEs":"¿Cómo se dice nariz?","options":["nose","noise","note","none"],"answer":"nose","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «nose»."},
{"id":"e226","level":2,"kind":"choose","prompt":"I ___ not tired.","promptEs":"Elige.","options":["am","is","are","be"],"answer":"am","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «am»."},
{"id":"e227","level":3,"kind":"choose","prompt":"You ___ very kind.","promptEs":"Elige.","options":["are","is","am","be"],"answer":"are","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «are»."},
{"id":"e228","level":4,"kind":"choose","prompt":"This ___ my wand.","promptEs":"Elige.","options":["is","are","am","be"],"answer":"is","hint":"Think carefully.","explanation":"¡Casi! La respuesta es «is»."}
];

export function bankByLevel<T extends { level: DiffLevel }>(bank: T[], level: DiffLevel): T[] {
  return bank.filter((q) => q.level === level);
}

export function pickRandom<T>(arr: T[], n: number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a.slice(0, Math.min(n, a.length));
}

export function pickMathSession(level: DiffLevel, n = 5): MathQ[] {
  return pickRandom(bankByLevel(MATH_BANK, level), n);
}
export function pickLangSession(level: DiffLevel, n = 5): LangQ[] {
  return pickRandom(bankByLevel(LANG_BANK, level), n);
}
export function pickEngSession(level: DiffLevel, n = 5): EngQ[] {
  return pickRandom(bankByLevel(ENG_BANK, level), n);
}

export function countInLevel(area: "math" | "language" | "english", level: DiffLevel): number {
  if (area === "math") return bankByLevel(MATH_BANK, level).length;
  if (area === "language") return bankByLevel(LANG_BANK, level).length;
  return bankByLevel(ENG_BANK, level).length;
}
