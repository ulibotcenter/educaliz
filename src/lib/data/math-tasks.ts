// Misiones de matemáticas de verano (4º → 5º) — Academia Arcana
// 30 misiones · progresión suave · variedad de tipos

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

export type MathTask = {
  id: number;
  level: 1 | 2 | 3 | 4 | 5;
  order: number;
  exercises: MathExercise[];
};

export const MATH_TASKS: MathTask[] = [
  {
    "id": 1,
    "order": 1,
    "level": 1,
    "exercises": [
      {
        "type": "calculo_mental",
        "prompt": "Cálculo mental: 8 + 7 = ?",
        "answer": 15,
        "hint": "Usa 8+2=10 y luego +5.",
        "explanation": "¡Casi! 8 + 7 = 15. Un truco: 8+2=10 y 10+5=15."
      },
      {
        "type": "calculo_mental",
        "prompt": "Cálculo mental: 12 − 5 = ?",
        "answer": 7,
        "hint": "Parte de 12 y baja 5.",
        "explanation": "12 − 5 = 7. ¡Bien contado!"
      },
      {
        "type": "suma",
        "prompt": "Suma: 34 + 25",
        "answer": 59,
        "hint": "Suma unidades y decenas.",
        "explanation": "34 + 25 = 59: 4+5=9 y 3+2=5."
      },
      {
        "type": "comparacion",
        "prompt": "¿Cuál es mayor: 48 o 39? Escribe el mayor.",
        "answer": 48,
        "hint": "Mira las decenas primero.",
        "explanation": "48 es mayor que 39 porque 4 decenas son más que 3."
      },
      {
        "type": "problema",
        "prompt": "Liz encuentra 6 monedas y luego 5 más. ¿Cuántas tiene?",
        "answer": 11,
        "hint": "Suma las monedas.",
        "explanation": "6 + 5 = 11 monedas mágicas."
      }
    ]
  },
  {
    "id": 2,
    "order": 2,
    "level": 1,
    "exercises": [
      {
        "type": "calculo_mental",
        "prompt": "Cálculo mental: 9 × 3 = ?",
        "answer": 27,
        "hint": "Suma 9 tres veces.",
        "explanation": "9 × 3 = 27."
      },
      {
        "type": "resta",
        "prompt": "Resta: 50 − 18",
        "answer": 32,
        "hint": "50−10=40, luego −8.",
        "explanation": "50 − 18 = 32."
      },
      {
        "type": "valor_posicional",
        "prompt": "En el número 582, ¿qué cifra está en las decenas?",
        "answer": 8,
        "hint": "De derecha a izquierda: unidades, decenas, centenas.",
        "explanation": "En 582 la cifra de las decenas es 8."
      },
      {
        "type": "suma",
        "prompt": "Suma: 46 + 37",
        "answer": 83,
        "hint": "6+7=13: escribe 3 y lleva 1.",
        "explanation": "46 + 37 = 83."
      },
      {
        "type": "problema",
        "prompt": "Un dragón tiene 10 escamas y pierde 3. ¿Cuántas le quedan?",
        "answer": 7,
        "hint": "Resta.",
        "explanation": "10 − 3 = 7 escamas."
      }
    ]
  },
  {
    "id": 3,
    "order": 3,
    "level": 1,
    "exercises": [
      {
        "type": "multiplicacion",
        "prompt": "Multiplica: 6 × 4",
        "answer": 24,
        "hint": "6+6+6+6.",
        "explanation": "6 × 4 = 24."
      },
      {
        "type": "division",
        "prompt": "Divide (exacta): 18 ÷ 3",
        "answer": 6,
        "hint": "¿Cuántas veces cabe 3 en 18?",
        "explanation": "18 ÷ 3 = 6."
      },
      {
        "type": "comparacion",
        "prompt": "¿Cuál es el menor: 72, 27 o 52? Escribe el menor.",
        "answer": 27,
        "hint": "Compara las decenas.",
        "explanation": "27 es el menor de los tres."
      },
      {
        "type": "medida",
        "prompt": "Un lápiz mide 15 cm y otro 12 cm. ¿Cuántos cm miden juntos?",
        "answer": 27,
        "hint": "Suma longitudes.",
        "explanation": "15 + 12 = 27 cm."
      },
      {
        "type": "problema",
        "prompt": "Hay 4 pisos con 5 antorchas cada uno. ¿Cuántas antorchas hay?",
        "answer": 20,
        "hint": "Multiplica.",
        "explanation": "4 × 5 = 20 antorchas."
      }
    ]
  },
  {
    "id": 4,
    "order": 4,
    "level": 1,
    "exercises": [
      {
        "type": "calculo_mental",
        "prompt": "Cálculo mental: 25 + 25 = ?",
        "answer": 50,
        "hint": "Dos medias centenas.",
        "explanation": "25 + 25 = 50."
      },
      {
        "type": "valor_posicional",
        "prompt": "¿Cuánto vale el 7 en el número 704?",
        "answer": 700,
        "hint": "El 7 está en las centenas.",
        "explanation": "En 704 el 7 vale 700."
      },
      {
        "type": "resta",
        "prompt": "Resta: 90 − 34",
        "answer": 56,
        "hint": "90−30−4.",
        "explanation": "90 − 34 = 56."
      },
      {
        "type": "fraccion",
        "prompt": "¿Cuánto es la mitad de 16? (1/2 de 16)",
        "answer": 8,
        "hint": "Divide entre 2.",
        "explanation": "La mitad de 16 es 8."
      },
      {
        "type": "problema",
        "prompt": "Liz lee 9 páginas por la mañana y 8 por la tarde. ¿Cuántas en total?",
        "answer": 17,
        "hint": "Suma.",
        "explanation": "9 + 8 = 17 páginas."
      }
    ]
  },
  {
    "id": 5,
    "order": 5,
    "level": 1,
    "exercises": [
      {
        "type": "suma",
        "prompt": "Suma: 128 + 45",
        "answer": 173,
        "hint": "Alinea por la derecha.",
        "explanation": "128 + 45 = 173."
      },
      {
        "type": "multiplicacion",
        "prompt": "Multiplica: 7 × 8",
        "answer": 56,
        "hint": "Tabla del 7 u 8.",
        "explanation": "7 × 8 = 56."
      },
      {
        "type": "geometria",
        "prompt": "Un cuadrado tiene lado 4 cm. ¿Perímetro? (4 lados)",
        "answer": 16,
        "hint": "4 × lado.",
        "explanation": "4 × 4 = 16 cm."
      },
      {
        "type": "comparacion",
        "prompt": "¿Cuál es mayor: 305 o 350? Escribe el mayor.",
        "answer": 350,
        "hint": "Compara decenas.",
        "explanation": "350 > 305."
      },
      {
        "type": "problema",
        "prompt": "Hay 24 pociones en cajas de 6. ¿Cuántas cajas se llenan?",
        "answer": 4,
        "hint": "Divide.",
        "explanation": "24 ÷ 6 = 4 cajas."
      }
    ]
  },
  {
    "id": 6,
    "order": 6,
    "level": 1,
    "exercises": [
      {
        "type": "division",
        "prompt": "Divide: 36 ÷ 4",
        "answer": 9,
        "hint": "Tabla del 4.",
        "explanation": "36 ÷ 4 = 9."
      },
      {
        "type": "medida",
        "prompt": "Un frasco tiene 250 ml. ¿Cuántos ml hay en 2 frascos?",
        "answer": 500,
        "hint": "250 × 2.",
        "explanation": "250 × 2 = 500 ml."
      },
      {
        "type": "fraccion",
        "prompt": "¿Cuánto es 1/4 de 20?",
        "answer": 5,
        "hint": "20 ÷ 4.",
        "explanation": "Un cuarto de 20 es 5."
      },
      {
        "type": "calculo_mental",
        "prompt": "Cálculo mental: 100 − 40 = ?",
        "answer": 60,
        "hint": "Quita 4 decenas.",
        "explanation": "100 − 40 = 60."
      },
      {
        "type": "problema",
        "prompt": "El guardián da 15 monedas a Liz y 12 a su familiar. ¿Cuántas dio en total?",
        "answer": 27,
        "hint": "Suma.",
        "explanation": "15 + 12 = 27."
      }
    ]
  },
  {
    "id": 7,
    "order": 7,
    "level": 2,
    "exercises": [
      {
        "type": "suma",
        "prompt": "Suma: 256 + 178",
        "answer": 434,
        "hint": "Lleva cuando pases de 9.",
        "explanation": "256 + 178 = 434."
      },
      {
        "type": "resta",
        "prompt": "Resta: 400 − 125",
        "answer": 275,
        "hint": "Cuidado con los ceros.",
        "explanation": "400 − 125 = 275."
      },
      {
        "type": "valor_posicional",
        "prompt": "En 3642, ¿qué cifra está en las centenas?",
        "answer": 6,
        "hint": "u · d · c · um.",
        "explanation": "En 3642 las centenas son 6."
      },
      {
        "type": "multiplicacion",
        "prompt": "Multiplica: 12 × 5",
        "answer": 60,
        "hint": "12×10=120, mitad 60.",
        "explanation": "12 × 5 = 60."
      },
      {
        "type": "problema",
        "prompt": "Liz camina 18 min al colegio y 18 de vuelta. ¿Minutos en total?",
        "answer": 36,
        "hint": "Ida + vuelta.",
        "explanation": "18 + 18 = 36 minutos."
      }
    ]
  },
  {
    "id": 8,
    "order": 8,
    "level": 2,
    "exercises": [
      {
        "type": "calculo_mental",
        "prompt": "Cálculo mental: 15 × 4 = ?",
        "answer": 60,
        "hint": "15×2×2.",
        "explanation": "15 × 4 = 60."
      },
      {
        "type": "division",
        "prompt": "Divide: 72 ÷ 8",
        "answer": 9,
        "hint": "Tabla del 8.",
        "explanation": "72 ÷ 8 = 9."
      },
      {
        "type": "geometria",
        "prompt": "Rectángulo 8 cm × 3 cm. ¿Perímetro? (2×largo + 2×ancho)",
        "answer": 22,
        "hint": "2×8 + 2×3.",
        "explanation": "16 + 6 = 22 cm."
      },
      {
        "type": "comparacion",
        "prompt": "¿Cuál es menor: 1090 o 1009? Escribe el menor.",
        "answer": 1009,
        "hint": "Compara cifra a cifra.",
        "explanation": "1009 < 1090."
      },
      {
        "type": "problema",
        "prompt": "Una varita cuesta 14 monedas. Liz tiene 50. ¿Cuánto le sobra?",
        "answer": 36,
        "hint": "50 − 14.",
        "explanation": "Le sobran 36 monedas."
      }
    ]
  },
  {
    "id": 9,
    "order": 9,
    "level": 2,
    "exercises": [
      {
        "type": "fraccion",
        "prompt": "¿Cuánto es 1/3 de 24?",
        "answer": 8,
        "hint": "24 ÷ 3.",
        "explanation": "1/3 de 24 = 8."
      },
      {
        "type": "suma",
        "prompt": "Suma: 399 + 201",
        "answer": 600,
        "hint": "Casi 400+200.",
        "explanation": "399 + 201 = 600."
      },
      {
        "type": "medida",
        "prompt": "Hay 3 km a la fuente. Liz va y vuelve. ¿Cuántos km?",
        "answer": 6,
        "hint": "×2.",
        "explanation": "3 × 2 = 6 km."
      },
      {
        "type": "resta",
        "prompt": "Resta: 830 − 275",
        "answer": 555,
        "hint": "Columna a columna.",
        "explanation": "830 − 275 = 555."
      },
      {
        "type": "problema",
        "prompt": "El dragón come 7 manzanas al día. ¿Cuántas en 5 días?",
        "answer": 35,
        "hint": "7 × 5.",
        "explanation": "35 manzanas."
      }
    ]
  },
  {
    "id": 10,
    "order": 10,
    "level": 2,
    "exercises": [
      {
        "type": "multiplicacion",
        "prompt": "Multiplica: 23 × 4",
        "answer": 92,
        "hint": "20×4 + 3×4.",
        "explanation": "23 × 4 = 92."
      },
      {
        "type": "division",
        "prompt": "Divide: 96 ÷ 6",
        "answer": 16,
        "hint": "6×16=96.",
        "explanation": "96 ÷ 6 = 16."
      },
      {
        "type": "decimal",
        "prompt": "¿Cuántas décimas hay en 3,7? (la cifra de las décimas)",
        "answer": 7,
        "hint": "Después de la coma: décimas.",
        "explanation": "En 3,7 la décima es 7."
      },
      {
        "type": "valor_posicional",
        "prompt": "¿Cuántas unidades de millar hay en 5280?",
        "answer": 5,
        "hint": "Cifra de los millares.",
        "explanation": "Hay 5 unidades de millar."
      },
      {
        "type": "problema",
        "prompt": "Hay 40 pergaminos. Se pierden 15 y encuentran 9. ¿Cuántos hay al final?",
        "answer": 34,
        "hint": "40−15+9.",
        "explanation": "25+9=34 pergaminos."
      }
    ]
  },
  {
    "id": 11,
    "order": 11,
    "level": 2,
    "exercises": [
      {
        "type": "calculo_mental",
        "prompt": "Cálculo mental: 48 + 27 = ?",
        "answer": 75,
        "hint": "48+20+7.",
        "explanation": "48 + 27 = 75."
      },
      {
        "type": "geometria",
        "prompt": "Triángulo equilátero de lado 6 cm. ¿Perímetro?",
        "answer": 18,
        "hint": "3 lados iguales.",
        "explanation": "6 × 3 = 18 cm."
      },
      {
        "type": "fraccion",
        "prompt": "¿Cuánto es 3/4 de 20?",
        "answer": 15,
        "hint": "1/4 de 20 es 5; ×3.",
        "explanation": "5 × 3 = 15."
      },
      {
        "type": "resta",
        "prompt": "Resta: 1000 − 256",
        "answer": 744,
        "hint": "Cuidado con los ceros.",
        "explanation": "1000 − 256 = 744."
      },
      {
        "type": "problema",
        "prompt": "Liz compra 3 libros a 9 monedas cada uno. ¿Cuánto paga?",
        "answer": 27,
        "hint": "3 × 9.",
        "explanation": "Paga 27 monedas."
      }
    ]
  },
  {
    "id": 12,
    "order": 12,
    "level": 2,
    "exercises": [
      {
        "type": "suma",
        "prompt": "Suma: 567 + 289",
        "answer": 856,
        "hint": "Lleva con calma.",
        "explanation": "567 + 289 = 856."
      },
      {
        "type": "multiplicacion",
        "prompt": "Multiplica: 15 × 6",
        "answer": 90,
        "hint": "15×5 + 15.",
        "explanation": "15 × 6 = 90."
      },
      {
        "type": "medida",
        "prompt": "Un mural mide 2 m. ¿Cuántos cm son? (1 m = 100 cm)",
        "answer": 200,
        "hint": "×100.",
        "explanation": "2 × 100 = 200 cm."
      },
      {
        "type": "comparacion",
        "prompt": "¿Cuál es mayor: 2499 o 2501? Escribe el mayor.",
        "answer": 2501,
        "hint": "Compara.",
        "explanation": "2501 > 2499."
      },
      {
        "type": "problema",
        "prompt": "La biblioteca tiene 120 libros. Prestan 35 y devuelven 10. ¿Cuántos hay ahora?",
        "answer": 95,
        "hint": "120−35+10.",
        "explanation": "85+10=95 libros."
      }
    ]
  },
  {
    "id": 13,
    "order": 13,
    "level": 3,
    "exercises": [
      {
        "type": "suma",
        "prompt": "Suma: 1245 + 678",
        "answer": 1923,
        "hint": "Alinea miles.",
        "explanation": "1245 + 678 = 1923."
      },
      {
        "type": "division",
        "prompt": "Divide: 144 ÷ 12",
        "answer": 12,
        "hint": "12×12=144.",
        "explanation": "144 ÷ 12 = 12."
      },
      {
        "type": "problema",
        "prompt": "Liz tiene 60 monedas. Gasta 18 en un mapa y 15 en un amuleto. ¿Cuánto le queda?",
        "answer": 27,
        "hint": "Resta las dos compras.",
        "explanation": "18+15=33; 60−33=27."
      },
      {
        "type": "geometria",
        "prompt": "Cuadrado de lado 9 cm. ¿Perímetro?",
        "answer": 36,
        "hint": "4 × 9.",
        "explanation": "36 cm."
      },
      {
        "type": "decimal",
        "prompt": "En 25 décimas, ¿cuántas unidades enteras completas hay?",
        "answer": 2,
        "hint": "10 décimas = 1 unidad.",
        "explanation": "25 décimas = 2 unidades y 5 décimas. Enteras completas: 2."
      }
    ]
  },
  {
    "id": 14,
    "order": 14,
    "level": 3,
    "exercises": [
      {
        "type": "multiplicacion",
        "prompt": "Multiplica: 34 × 6",
        "answer": 204,
        "hint": "30×6 + 4×6.",
        "explanation": "34 × 6 = 204."
      },
      {
        "type": "resta",
        "prompt": "Resta: 2500 − 786",
        "answer": 1714,
        "hint": "Columna a columna.",
        "explanation": "2500 − 786 = 1714."
      },
      {
        "type": "fraccion",
        "prompt": "¿Cuánto es 2/5 de 30?",
        "answer": 12,
        "hint": "1/5 de 30 es 6; ×2.",
        "explanation": "6 × 2 = 12."
      },
      {
        "type": "medida",
        "prompt": "Un cinturón mide 80 cm. ¿Cuántos mm son? (1 cm = 10 mm)",
        "answer": 800,
        "hint": "×10.",
        "explanation": "80 × 10 = 800 mm."
      },
      {
        "type": "problema",
        "prompt": "En 3 cofres hay 45 monedas en total, repartidas por igual. ¿Cuántas monedas por cofre?",
        "answer": 15,
        "hint": "Divide 45 ÷ 3.",
        "explanation": "45 ÷ 3 = 15 monedas."
      }
    ]
  },
  {
    "id": 15,
    "order": 15,
    "level": 3,
    "exercises": [
      {
        "type": "calculo_mental",
        "prompt": "Cálculo mental: 99 + 26 = ?",
        "answer": 125,
        "hint": "99+1=100, luego +25.",
        "explanation": "99 + 26 = 125."
      },
      {
        "type": "division",
        "prompt": "Divide (cociente entero): 100 ÷ 8",
        "answer": 12,
        "hint": "8×12=96; sobra resto, solo cociente.",
        "explanation": "100 ÷ 8 = 12 (resto 4). Cociente 12."
      },
      {
        "type": "geometria",
        "prompt": "Rectángulo 12 cm × 5 cm. ¿Perímetro?",
        "answer": 34,
        "hint": "2×12 + 2×5.",
        "explanation": "24+10=34 cm."
      },
      {
        "type": "valor_posicional",
        "prompt": "En 60.405, ¿qué cifra está en las decenas de millar?",
        "answer": 6,
        "hint": "Lee el número con calma.",
        "explanation": "En 60405 las decenas de millar son 6."
      },
      {
        "type": "problema",
        "prompt": "Liz practica 25 min el lunes y el doble el martes. ¿Cuántos minutos el martes?",
        "answer": 50,
        "hint": "El doble de 25.",
        "explanation": "25 × 2 = 50 minutos."
      }
    ]
  },
  {
    "id": 16,
    "order": 16,
    "level": 3,
    "exercises": [
      {
        "type": "suma",
        "prompt": "Suma: 1899 + 456",
        "answer": 2355,
        "hint": "Lleva con cuidado.",
        "explanation": "1899 + 456 = 2355."
      },
      {
        "type": "multiplicacion",
        "prompt": "Multiplica: 28 × 7",
        "answer": 196,
        "hint": "20×7 + 8×7.",
        "explanation": "28 × 7 = 196."
      },
      {
        "type": "decimal",
        "prompt": "¿Cuánto es 4,0 + 3,0? (suma de enteros con coma)",
        "answer": 7,
        "hint": "4+3.",
        "explanation": "4,0 + 3,0 = 7."
      },
      {
        "type": "comparacion",
        "prompt": "¿Cuál es mayor: 10.010 o 10.100? Escribe el mayor.",
        "answer": 10100,
        "hint": "Compara centenas.",
        "explanation": "10100 > 10010."
      },
      {
        "type": "problema",
        "prompt": "Un hechizo usa 8 hierbas. Liz quiere 6 hechizos. ¿Cuántas hierbas necesita?",
        "answer": 48,
        "hint": "8 × 6.",
        "explanation": "48 hierbas."
      }
    ]
  },
  {
    "id": 17,
    "order": 17,
    "level": 3,
    "exercises": [
      {
        "type": "resta",
        "prompt": "Resta: 4030 − 1256",
        "answer": 2774,
        "hint": "Pide prestado.",
        "explanation": "4030 − 1256 = 2774."
      },
      {
        "type": "fraccion",
        "prompt": "¿Cuánto es 5/6 de 18?",
        "answer": 15,
        "hint": "1/6 de 18 es 3; ×5.",
        "explanation": "3 × 5 = 15."
      },
      {
        "type": "medida",
        "prompt": "Liz corre 1500 m. ¿Cuántos km son? (1000 m = 1 km). Escribe solo los km enteros.",
        "answer": 1,
        "hint": "1500 m = 1 km y 500 m.",
        "explanation": "Kilómetros enteros completos: 1."
      },
      {
        "type": "division",
        "prompt": "Divide: 225 ÷ 15",
        "answer": 15,
        "hint": "15×15=225.",
        "explanation": "225 ÷ 15 = 15."
      },
      {
        "type": "problema",
        "prompt": "Hay 90 estrellas. Se apagan 28 y se encienden 17. ¿Cuántas brillan?",
        "answer": 79,
        "hint": "90−28+17.",
        "explanation": "62+17=79 estrellas."
      }
    ]
  },
  {
    "id": 18,
    "order": 18,
    "level": 3,
    "exercises": [
      {
        "type": "calculo_mental",
        "prompt": "Cálculo mental: 250 − 75 = ?",
        "answer": 175,
        "hint": "250−70−5.",
        "explanation": "250 − 75 = 175."
      },
      {
        "type": "geometria",
        "prompt": "Pentágono regular de lado 7 cm. ¿Perímetro? (5 lados)",
        "answer": 35,
        "hint": "5 × 7.",
        "explanation": "35 cm."
      },
      {
        "type": "multiplicacion",
        "prompt": "Multiplica: 45 × 8",
        "answer": 360,
        "hint": "45×10=450; 450−45×2=450−90.",
        "explanation": "45 × 8 = 360."
      },
      {
        "type": "decimal",
        "prompt": "¿Cuántas décimas equivalen a 3 unidades?",
        "answer": 30,
        "hint": "1 unidad = 10 décimas.",
        "explanation": "3 × 10 = 30 décimas."
      },
      {
        "type": "problema",
        "prompt": "La torre tiene 12 ventanas por piso y 4 pisos. ¿Cuántas ventanas en total?",
        "answer": 48,
        "hint": "12 × 4.",
        "explanation": "48 ventanas."
      }
    ]
  },
  {
    "id": 19,
    "order": 19,
    "level": 4,
    "exercises": [
      {
        "type": "suma",
        "prompt": "Suma: 4567 + 2893",
        "answer": 7460,
        "hint": "Miles y centenas.",
        "explanation": "4567 + 2893 = 7460."
      },
      {
        "type": "multiplicacion",
        "prompt": "Multiplica: 56 × 9",
        "answer": 504,
        "hint": "50×9 + 6×9.",
        "explanation": "56 × 9 = 504."
      },
      {
        "type": "problema",
        "prompt": "Liz tiene 120 monedas. Compra 3 mapas a 18 monedas cada uno. ¿Cuánto le queda?",
        "answer": 66,
        "hint": "3×18=54; 120−54.",
        "explanation": "Le quedan 66 monedas."
      },
      {
        "type": "fraccion",
        "prompt": "¿Cuánto es 3/8 de 32?",
        "answer": 12,
        "hint": "1/8 de 32 es 4; ×3.",
        "explanation": "4 × 3 = 12."
      },
      {
        "type": "geometria",
        "prompt": "Rectángulo 15 cm × 8 cm. ¿Perímetro?",
        "answer": 46,
        "hint": "2×15 + 2×8.",
        "explanation": "30+16=46 cm."
      }
    ]
  },
  {
    "id": 20,
    "order": 20,
    "level": 4,
    "exercises": [
      {
        "type": "resta",
        "prompt": "Resta: 8000 − 3456",
        "answer": 4544,
        "hint": "Cuidado con ceros.",
        "explanation": "8000 − 3456 = 4544."
      },
      {
        "type": "division",
        "prompt": "Divide: 336 ÷ 14",
        "answer": 24,
        "hint": "14×24=336.",
        "explanation": "336 ÷ 14 = 24."
      },
      {
        "type": "decimal",
        "prompt": "¿Cuántos céntimos son 3 euros y 25 céntimos?",
        "answer": 325,
        "hint": "1 euro = 100 céntimos.",
        "explanation": "3×100 + 25 = 325 céntimos."
      },
      {
        "type": "valor_posicional",
        "prompt": "En 48.216, ¿qué cifra está en las centenas?",
        "answer": 2,
        "hint": "Localiza centenas.",
        "explanation": "En 48216 las centenas son 2."
      },
      {
        "type": "problema",
        "prompt": "Un dragón vuela 45 km al día durante 6 días. ¿Cuántos km en total?",
        "answer": 270,
        "hint": "45 × 6.",
        "explanation": "270 km."
      }
    ]
  },
  {
    "id": 21,
    "order": 21,
    "level": 4,
    "exercises": [
      {
        "type": "calculo_mental",
        "prompt": "Cálculo mental: 125 × 4 = ?",
        "answer": 500,
        "hint": "125×4 = 500.",
        "explanation": "125 × 4 = 500."
      },
      {
        "type": "medida",
        "prompt": "Una cuerda mide 3 m y 40 cm. ¿Cuántos cm mide en total?",
        "answer": 340,
        "hint": "3 m = 300 cm.",
        "explanation": "300 + 40 = 340 cm."
      },
      {
        "type": "multiplicacion",
        "prompt": "Multiplica: 67 × 5",
        "answer": 335,
        "hint": "60×5 + 7×5.",
        "explanation": "67 × 5 = 335."
      },
      {
        "type": "comparacion",
        "prompt": "¿Cuál es menor: 99.999 o 100.001? Escribe el menor.",
        "answer": 99999,
        "hint": "Mira la cantidad de cifras.",
        "explanation": "99999 tiene 5 cifras; 100001 tiene 6 y es mayor. Menor: 99999."
      },
      {
        "type": "problema",
        "prompt": "Hay 200 pociones. Usan 1/4 de ellas. ¿Cuántas usan?",
        "answer": 50,
        "hint": "1/4 de 200.",
        "explanation": "200 ÷ 4 = 50 pociones."
      }
    ]
  },
  {
    "id": 22,
    "order": 22,
    "level": 4,
    "exercises": [
      {
        "type": "suma",
        "prompt": "Suma: 9999 + 1",
        "answer": 10000,
        "hint": "Casi 10000.",
        "explanation": "9999 + 1 = 10000."
      },
      {
        "type": "division",
        "prompt": "Divide: 540 ÷ 12",
        "answer": 45,
        "hint": "12×45=540.",
        "explanation": "540 ÷ 12 = 45."
      },
      {
        "type": "geometria",
        "prompt": "Cuadrado de lado 12 cm. ¿Perímetro?",
        "answer": 48,
        "hint": "4 × 12.",
        "explanation": "48 cm."
      },
      {
        "type": "fraccion",
        "prompt": "¿Cuánto es 7/10 de 50?",
        "answer": 35,
        "hint": "1/10 de 50 es 5; ×7.",
        "explanation": "5 × 7 = 35."
      },
      {
        "type": "problema",
        "prompt": "Liz gana 15 puntos en 4 misiones iguales. ¿Puntos en total?",
        "answer": 60,
        "hint": "15 × 4.",
        "explanation": "60 puntos."
      }
    ]
  },
  {
    "id": 23,
    "order": 23,
    "level": 4,
    "exercises": [
      {
        "type": "resta",
        "prompt": "Resta: 12.050 − 3.478",
        "answer": 8572,
        "hint": "Alinea bien.",
        "explanation": "12050 − 3478 = 8572."
      },
      {
        "type": "multiplicacion",
        "prompt": "Multiplica: 48 × 12",
        "answer": 576,
        "hint": "48×10 + 48×2.",
        "explanation": "480 + 96 = 576."
      },
      {
        "type": "decimal",
        "prompt": "¿Cuántos céntimos hay en 7,50 euros? (7 euros y 50 céntimos)",
        "answer": 750,
        "hint": "×100.",
        "explanation": "7,50 € = 750 céntimos."
      },
      {
        "type": "medida",
        "prompt": "Un mapa mide 2 km. ¿Cuántos metros son? (1 km = 1000 m)",
        "answer": 2000,
        "hint": "×1000.",
        "explanation": "2000 m."
      },
      {
        "type": "problema",
        "prompt": "Un cofre tiene 96 gemas. Se reparten entre 8 magos por igual. ¿Cuántas cada uno?",
        "answer": 12,
        "hint": "96 ÷ 8.",
        "explanation": "12 gemas cada uno."
      }
    ]
  },
  {
    "id": 24,
    "order": 24,
    "level": 4,
    "exercises": [
      {
        "type": "calculo_mental",
        "prompt": "Cálculo mental: 360 ÷ 6 = ?",
        "answer": 60,
        "hint": "36÷6=6, luego ×10.",
        "explanation": "360 ÷ 6 = 60."
      },
      {
        "type": "suma",
        "prompt": "Suma: 3785 + 4628",
        "answer": 8413,
        "hint": "Lleva con cuidado.",
        "explanation": "3785 + 4628 = 8413."
      },
      {
        "type": "geometria",
        "prompt": "Rectángulo 20 cm × 9 cm. ¿Perímetro?",
        "answer": 58,
        "hint": "2×20 + 2×9.",
        "explanation": "40+18=58 cm."
      },
      {
        "type": "fraccion",
        "prompt": "¿Cuánto es 5/4 de 16? (más de un entero)",
        "answer": 20,
        "hint": "1/4 de 16 es 4; ×5.",
        "explanation": "4 × 5 = 20."
      },
      {
        "type": "problema",
        "prompt": "Liz estudia 40 min y descansa 15. Luego estudia 25 min más. ¿Cuántos minutos de estudio (sin el descanso)?",
        "answer": 65,
        "hint": "40+25.",
        "explanation": "65 minutos de estudio."
      }
    ]
  },
  {
    "id": 25,
    "order": 25,
    "level": 5,
    "exercises": [
      {
        "type": "multiplicacion",
        "prompt": "Multiplica: 125 × 8",
        "answer": 1000,
        "hint": "125×8=1000.",
        "explanation": "125 × 8 = 1000."
      },
      {
        "type": "division",
        "prompt": "Divide: 1008 ÷ 24",
        "answer": 42,
        "hint": "24×40=960; 48÷24=2.",
        "explanation": "1008 ÷ 24 = 42."
      },
      {
        "type": "problema",
        "prompt": "Un tren mágico lleva 48 pasajeros en cada vagón y tiene 6 vagones. Si bajan 30, ¿cuántos quedan?",
        "answer": 258,
        "hint": "48×6 − 30.",
        "explanation": "288 − 30 = 258 pasajeros."
      },
      {
        "type": "decimal",
        "prompt": "¿Cuántos céntimos son 12 euros?",
        "answer": 1200,
        "hint": "×100.",
        "explanation": "1200 céntimos."
      },
      {
        "type": "geometria",
        "prompt": "Cuadrado de lado 25 cm. ¿Perímetro?",
        "answer": 100,
        "hint": "4 × 25.",
        "explanation": "100 cm."
      }
    ]
  },
  {
    "id": 26,
    "order": 26,
    "level": 5,
    "exercises": [
      {
        "type": "resta",
        "prompt": "Resta: 50.000 − 17.856",
        "answer": 32144,
        "hint": "Ceros: pide prestado.",
        "explanation": "50000 − 17856 = 32144."
      },
      {
        "type": "fraccion",
        "prompt": "¿Cuánto es 3/5 de 85?",
        "answer": 51,
        "hint": "1/5 de 85 es 17; ×3.",
        "explanation": "17 × 3 = 51."
      },
      {
        "type": "medida",
        "prompt": "Liz camina 2 km 350 m. ¿Cuántos metros en total?",
        "answer": 2350,
        "hint": "2 km = 2000 m.",
        "explanation": "2000 + 350 = 2350 m."
      },
      {
        "type": "multiplicacion",
        "prompt": "Multiplica: 76 × 15",
        "answer": 1140,
        "hint": "76×10 + 76×5.",
        "explanation": "760 + 380 = 1140."
      },
      {
        "type": "problema",
        "prompt": "Hay 360 páginas. Liz lee 1/3 el lunes y 1/4 el martes. ¿Cuántas páginas lee el lunes?",
        "answer": 120,
        "hint": "1/3 de 360.",
        "explanation": "360 ÷ 3 = 120 páginas el lunes."
      }
    ]
  },
  {
    "id": 27,
    "order": 27,
    "level": 5,
    "exercises": [
      {
        "type": "suma",
        "prompt": "Suma: 9876 + 5432",
        "answer": 15308,
        "hint": "Miles.",
        "explanation": "9876 + 5432 = 15308."
      },
      {
        "type": "division",
        "prompt": "Divide: 945 ÷ 27",
        "answer": 35,
        "hint": "27×35=945.",
        "explanation": "945 ÷ 27 = 35."
      },
      {
        "type": "calculo_mental",
        "prompt": "Cálculo mental: 75 × 8 = ?",
        "answer": 600,
        "hint": "75×8 = 600.",
        "explanation": "75 × 8 = 600."
      },
      {
        "type": "geometria",
        "prompt": "Triángulo de lados 12, 15 y 18 cm. ¿Perímetro?",
        "answer": 45,
        "hint": "Suma los 3 lados.",
        "explanation": "12+15+18=45 cm."
      },
      {
        "type": "problema",
        "prompt": "Un hechizo cuesta 45 monedas. Liz hace 4 hechizos y le dan 20 monedas de regalo. ¿Cuánto gasta en total (sin contar el regalo)?",
        "answer": 180,
        "hint": "45×4.",
        "explanation": "Gasta 180 monedas en hechizos."
      }
    ]
  },
  {
    "id": 28,
    "order": 28,
    "level": 5,
    "exercises": [
      {
        "type": "multiplicacion",
        "prompt": "Multiplica: 99 × 12",
        "answer": 1188,
        "hint": "100×12 − 12.",
        "explanation": "1188."
      },
      {
        "type": "decimal",
        "prompt": "¿Cuántos céntimos hay en 9,99 euros? (aproxima: 9 euros y 99 céntimos)",
        "answer": 999,
        "hint": "9×100 + 99.",
        "explanation": "999 céntimos."
      },
      {
        "type": "fraccion",
        "prompt": "¿Cuánto es 7/8 de 64?",
        "answer": 56,
        "hint": "1/8 de 64 es 8; ×7.",
        "explanation": "8 × 7 = 56."
      },
      {
        "type": "resta",
        "prompt": "Resta: 20.005 − 8.786",
        "answer": 11219,
        "hint": "Pide prestado.",
        "explanation": "20005 − 8786 = 11219."
      },
      {
        "type": "problema",
        "prompt": "La academia tiene 5 torres. En cada torre hay 48 ventanas. ¿Cuántas ventanas hay en total?",
        "answer": 240,
        "hint": "5 × 48.",
        "explanation": "240 ventanas."
      }
    ]
  },
  {
    "id": 29,
    "order": 29,
    "level": 5,
    "exercises": [
      {
        "type": "division",
        "prompt": "Divide: 2040 ÷ 24",
        "answer": 85,
        "hint": "24×80=1920; 120÷24=5.",
        "explanation": "2040 ÷ 24 = 85."
      },
      {
        "type": "medida",
        "prompt": "Una botella tiene 1 l y 250 ml. ¿Cuántos ml en total? (1 l = 1000 ml)",
        "answer": 1250,
        "hint": "1000+250.",
        "explanation": "1250 ml."
      },
      {
        "type": "calculo_mental",
        "prompt": "Cálculo mental: 48 × 25 = ?",
        "answer": 1200,
        "hint": "48×100÷4.",
        "explanation": "48 × 25 = 1200."
      },
      {
        "type": "comparacion",
        "prompt": "¿Cuál es mayor: 87.654 o 87.645? Escribe el mayor.",
        "answer": 87654,
        "hint": "Compara unidades y decenas.",
        "explanation": "87654 > 87645."
      },
      {
        "type": "problema",
        "prompt": "Liz resuelve 12 retos el lunes, el doble el martes y 8 el miércoles. ¿Cuántos retos en los 3 días?",
        "answer": 44,
        "hint": "12 + 24 + 8.",
        "explanation": "12+24=36; 36+8=44 retos."
      }
    ]
  },
  {
    "id": 30,
    "order": 30,
    "level": 5,
    "exercises": [
      {
        "type": "suma",
        "prompt": "Suma: 15.678 + 9.999",
        "answer": 25677,
        "hint": "+10000 −1.",
        "explanation": "15678 + 9999 = 25677."
      },
      {
        "type": "multiplicacion",
        "prompt": "Multiplica: 125 × 16",
        "answer": 2000,
        "hint": "125×16=2000.",
        "explanation": "125 × 16 = 2000."
      },
      {
        "type": "geometria",
        "prompt": "Rectángulo 25 cm × 14 cm. ¿Perímetro?",
        "answer": 78,
        "hint": "2×25 + 2×14.",
        "explanation": "50+28=78 cm."
      },
      {
        "type": "fraccion",
        "prompt": "¿Cuánto es 9/10 de 90?",
        "answer": 81,
        "hint": "1/10 de 90 es 9; ×9.",
        "explanation": "9 × 9 = 81."
      },
      {
        "type": "problema",
        "prompt": "Un guardián guarda 360 monedas. Da 1/4 a la torre y 1/5 al bosque. ¿Cuántas monedas se queda?",
        "answer": 198,
        "hint": "Quita 1/4 y 1/5 de 360.",
        "explanation": "1/4 de 360=90; 1/5=72; 90+72=162; 360−162=198 monedas."
      }
    ]
  }
];

export const TYPE_LABELS: Record<MathExerciseType, string> = {
  "suma": "Suma",
  "resta": "Resta",
  "multiplicacion": "Multiplicación",
  "division": "División",
  "problema": "Problema",
  "calculo_mental": "Cálculo mental",
  "valor_posicional": "Valor posicional",
  "comparacion": "Comparación",
  "fraccion": "Fracciones",
  "decimal": "Decimales",
  "medida": "Medidas",
  "geometria": "Geometría"
};

export const LEVEL_LABELS: Record<number, string> = {
  1: "Chispa",
  2: "Llama",
  3: "Hechizo",
  4: "Arcano",
  5: "Maestría",
};

/** Tasks sorted by pedagogical progression */
export function getMathTasksProgressive(): MathTask[] {
  return [...MATH_TASKS].sort((a, b) => a.order - b.order);
}
