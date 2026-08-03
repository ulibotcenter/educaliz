// Práctica de inglés — Academia Arcana (refuerzo de verano 4º→5º)
// 12 misiones · vocabulario + frases · distractores plausibles

export type EnglishItem = {
  id: number;
  order: number;
  level: 1 | 2 | 3 | 4 | 5;
  kind: "translate" | "choose" | "complete";
  prompt: string;
  promptEs: string;
  options?: string[];
  answer: string;
  hint: string;
  explanation: string;
};

export const ENGLISH_TASKS: EnglishItem[] = [
  {
    id: 1,
    order: 1,
    level: 1,
    kind: "translate",
    prompt: "How do you say «libro» in English?",
    promptEs: "¿Cómo se dice «libro» en inglés?",
    options: ["book", "look", "boot", "brook"],
    answer: "book",
    hint: "You read a book.",
    explanation:
      "¡Casi! «Libro» es book. Look es mirar y boot es bota: suenan parecido, pero book es el de leer.",
  },
  {
    id: 2,
    order: 2,
    level: 1,
    kind: "translate",
    prompt: "What is «casa» in English?",
    promptEs: "¿Cómo se dice «casa»?",
    options: ["house", "horse", "mouse", "home"],
    answer: "house",
    hint: "Where you live (building).",
    explanation:
      "¡Casi! «Casa» (edificio) es house. Horse es caballo y mouse es ratón. Home es más «hogar».",
  },
  {
    id: 3,
    order: 3,
    level: 1,
    kind: "translate",
    prompt: "How do you say «amigo»?",
    promptEs: "¿Qué es «amigo» en inglés?",
    options: ["friend", "family", "father", "fresh"],
    answer: "friend",
    hint: "Someone you like to play with.",
    explanation:
      "¡Casi! Amigo = friend. Family es familia y father es padre. Un friend es tu compañero de juegos.",
  },
  {
    id: 4,
    order: 4,
    level: 1,
    kind: "choose",
    prompt: "I ___ a student.",
    promptEs: "Elige el verbo: «Yo ___ un estudiante.»",
    options: ["am", "is", "are", "be"],
    answer: "am",
    hint: "With I we use am.",
    explanation:
      "¡Casi! Con I (yo) se usa am: I am a student. Is va con he/she/it y are con you/we/they.",
  },
  {
    id: 5,
    order: 5,
    level: 2,
    kind: "translate",
    prompt: "What colour is the sky on a clear day? (in English)",
    promptEs: "¿De qué color es el cielo despejado? (en inglés)",
    options: ["blue", "black", "brown", "blond"],
    answer: "blue",
    hint: "Not green, not red…",
    explanation:
      "¡Casi! El cielo despejado es blue (azul). Black es negro y brown es marrón.",
  },
  {
    id: 6,
    order: 6,
    level: 2,
    kind: "complete",
    prompt: "She ___ happy today.",
    promptEs: "Completa: «Ella ___ feliz hoy.»",
    options: ["is", "am", "are", "be"],
    answer: "is",
    hint: "She → is",
    explanation:
      "¡Casi! Con she/he/it usamos is: She is happy. Am es para I y are para you/we/they.",
  },
  {
    id: 7,
    order: 7,
    level: 2,
    kind: "translate",
    prompt: "How do you say «perro»?",
    promptEs: "¿Cómo se dice «perro»?",
    options: ["dog", "god", "dot", "dig"],
    answer: "dog",
    hint: "A pet that barks.",
    explanation:
      "¡Casi! Perro = dog. God es dios y dig es cavar. ¡Recuerda: dog!",
  },
  {
    id: 8,
    order: 8,
    level: 3,
    kind: "choose",
    prompt: "They ___ my friends.",
    promptEs: "Elige: «Ellos ___ mis amigos.»",
    options: ["are", "is", "am", "be"],
    answer: "are",
    hint: "They → are",
    explanation:
      "¡Casi! They (ellos) va con are: They are my friends. Is es singular (he/she).",
  },
  {
    id: 9,
    order: 9,
    level: 3,
    kind: "complete",
    prompt: "I can ___ a bike.",
    promptEs: "Completa: «Puedo ___ en bici.» (verbo en inglés)",
    options: ["ride", "read", "write", "run"],
    answer: "ride",
    hint: "You ride a bike / a horse.",
    explanation:
      "¡Casi! Se dice ride a bike (montar en bici). Read es leer y write es escribir.",
  },
  {
    id: 10,
    order: 10,
    level: 3,
    kind: "translate",
    prompt: "How do you say «escuela»?",
    promptEs: "¿Cómo se dice «escuela / colegio»?",
    options: ["school", "shop", "shell", "skill"],
    answer: "school",
    hint: "Where you learn.",
    explanation:
      "¡Casi! Escuela es school. Shop es tienda. ¡School es donde aprendes magia… y mates!",
  },
  {
    id: 11,
    order: 11,
    level: 4,
    kind: "choose",
    prompt: "There ___ two cats in the garden.",
    promptEs: "Elige: «Hay dos gatos en el jardín.»",
    options: ["are", "is", "am", "be"],
    answer: "are",
    hint: "Two cats = plural → are",
    explanation:
      "¡Casi! Con plural (two cats) usamos there are. There is es para uno solo.",
  },
  {
    id: 12,
    order: 12,
    level: 4,
    kind: "complete",
    prompt: "Good morning! How ___ you?",
    promptEs: "Completa el saludo: «¡Buenos días! ¿Cómo ___ tú?»",
    options: ["are", "is", "am", "be"],
    answer: "are",
    hint: "How are you?",
    explanation:
      "¡Casi! La frase fija es How are you? Con you siempre are en este saludo.",
  },
];

export function getEnglishProgressive(): EnglishItem[] {
  return [...ENGLISH_TASKS].sort((a, b) => a.order - b.order);
}
