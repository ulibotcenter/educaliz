// Oraciones y retos de lengua (4º → 5º) — Academia Arcana
// Variedad: análisis, verbo, tipo de oración, ortografía, separar SN/SV

export type LangChoiceStep = {
  kind: "choice";
  title: string;
  tip: string;
  options: string[];
  answer: string;
  explanation: string;
  skillTag: string;
  hint: string;
};

export type LangNucleosStep = {
  kind: "nucleos";
  title: string;
  tip: string;
  nucleoSujeto: string;
  nucleoPredicado: string;
  explanation: string;
  skillTag: string;
  hint: string;
};

export type LangStep = LangChoiceStep | LangNucleosStep;

export type LanguageSentence = {
  id: number;
  order: number;
  level: 1 | 2 | 3 | 4 | 5;
  /** Oración a mostrar (puede usarse en varios pasos) */
  text: string;
  showSentence: boolean;
  steps: LangStep[];
  // Compat helpers for boss battles (sujeto/predicado)
  sujeto: string;
  predicado: string;
  sujetoOptions: string[];
  predicadoOptions: string[];
  explainSujeto: string;
  explainPredicado: string;
};

function choice(
  title: string,
  tip: string,
  options: string[],
  answer: string,
  explanation: string,
  skillTag: string,
  hint: string,
): LangChoiceStep {
  return { kind: "choice", title, tip, options, answer, explanation, skillTag, hint };
}

function nucleos(
  ns: string,
  np: string,
  explanation: string,
  hint: string,
): LangNucleosStep {
  return {
    kind: "nucleos",
    title: "Núcleos del SN y del SV",
    tip: "Escribe el núcleo del sujeto y el del predicado",
    nucleoSujeto: ns,
    nucleoPredicado: np,
    explanation,
    skillTag: "nucleos",
    hint,
  };
}

export const LANGUAGE_SENTENCES: LanguageSentence[] = [
  {
    id: 1,
    order: 1,
    level: 1,
    text: "Ana salta en el jardín.",
    showSentence: true,
    sujeto: "Ana",
    predicado: "salta en el jardín",
    sujetoOptions: ["Ana", "salta", "el jardín", "en el jardín"],
    predicadoOptions: ["salta en el jardín", "Ana", "el jardín", "salta"],
    explainSujeto: "¡Casi! El sujeto es quien hace la acción. Aquí «Ana» es quien salta.",
    explainPredicado: "¡Casi! El predicado es lo que se dice del sujeto: «salta en el jardín».",
    steps: [
      choice("1. ¿Cuál es el sujeto?", "Quién realiza la acción", ["Ana", "salta", "el jardín", "en el jardín"], "Ana",
        "¡Casi! El sujeto es la persona o cosa que hace la acción. En «Ana salta en el jardín», quien salta es Ana. Por eso el sujeto es «Ana».",
        "sujeto", "Pregunta: ¿quién salta?"),
      choice("2. ¿Cuál es el predicado?", "Qué se dice del sujeto", ["salta en el jardín", "Ana", "el jardín", "en"], "salta en el jardín",
        "¡Casi! El predicado es todo lo que se dice del sujeto, empezando por el verbo. Aquí: «salta en el jardín».",
        "predicado", "Empieza en el verbo «salta»."),
      choice("3. ¿Cuál es el verbo?", "La palabra de la acción", ["salta", "Ana", "jardín", "en"], "salta",
        "¡Casi! El verbo es la palabra que expresa la acción: «salta».",
        "verbo", "¿Qué acción hace Ana?"),
    ],
  },
  {
    id: 2,
    order: 2,
    level: 1,
    text: "El gato duerme.",
    showSentence: true,
    sujeto: "El gato",
    predicado: "duerme",
    sujetoOptions: ["El gato", "duerme", "gato", "El"],
    predicadoOptions: ["duerme", "El gato", "gato", "El"],
    explainSujeto: "El sujeto es «El gato»: quien duerme.",
    explainPredicado: "El predicado es «duerme»: lo que hace el gato.",
    steps: [
      choice("1. ¿Cuál es el sujeto?", "Quién realiza la acción", ["El gato", "duerme", "gato", "El"], "El gato",
        "¡Casi! El sujeto completo es «El gato» (artículo + sustantivo). Es quien duerme.",
        "sujeto", "¿Quién duerme?"),
      choice("2. ¿Cuál es el predicado?", "Qué se dice del sujeto", ["duerme", "El gato", "gato", "El"], "duerme",
        "¡Casi! El predicado aquí es solo el verbo «duerme».",
        "predicado", "¿Qué hace el gato?"),
      nucleos("gato", "duerme",
        "¡Casi! Núcleo del sujeto: «gato» (la palabra principal). Núcleo del predicado: el verbo «duerme».",
        "El núcleo del SN es el sustantivo; el del SV es el verbo."),
    ],
  },
  {
    id: 3,
    order: 3,
    level: 1,
    text: "¿Viene Pedro mañana?",
    showSentence: true,
    sujeto: "Pedro",
    predicado: "Viene mañana",
    sujetoOptions: ["Pedro", "Viene", "mañana", "¿Viene"],
    predicadoOptions: ["Viene mañana", "Pedro", "mañana", "Viene"],
    explainSujeto: "El sujeto es Pedro.",
    explainPredicado: "El predicado es Viene mañana.",
    steps: [
      choice("1. Tipo de oración", "Según la intención del hablante",
        ["Interrogativa", "Enunciativa", "Exclamativa", "Imperativa"], "Interrogativa",
        "¡Casi! Lleva signos de interrogación (¿…?), así que es interrogativa: se usa para preguntar.",
        "tipo_oracion", "Mira los signos ¿ ?"),
      choice("2. ¿Cuál es el sujeto?", "Quién realiza la acción", ["Pedro", "Viene", "mañana", "¿Viene Pedro"], "Pedro",
        "¡Casi! Quien viene es Pedro. El sujeto es «Pedro».",
        "sujeto", "¿Quién viene?"),
      choice("3. ¿Cuál es el verbo?", "Palabra de la acción", ["Viene", "Pedro", "mañana", "¿"], "Viene",
        "¡Casi! El verbo es «Viene»: la acción de la oración.",
        "verbo", "¿Qué acción hay?"),
    ],
  },
  {
    id: 4,
    order: 4,
    level: 1,
    text: "Los niños juegan al balón.",
    showSentence: true,
    sujeto: "Los niños",
    predicado: "juegan al balón",
    sujetoOptions: ["Los niños", "juegan", "al balón", "niños"],
    predicadoOptions: ["juegan al balón", "Los niños", "al balón", "juegan"],
    explainSujeto: "Sujeto: Los niños.",
    explainPredicado: "Predicado: juegan al balón.",
    steps: [
      choice("1. ¿Cuál es el sujeto?", "Quién realiza la acción", ["Los niños", "juegan", "al balón", "balón"], "Los niños",
        "¡Casi! El sujeto es «Los niños»: ellos juegan.",
        "sujeto", "¿Quiénes juegan?"),
      choice("2. Separa: ¿dónde termina el sujeto?", "Sujeto | predicado",
        ["Los niños | juegan al balón", "Los | niños juegan al balón", "Los niños juegan | al balón", "Los niños juegan al | balón"],
        "Los niños | juegan al balón",
        "¡Casi! Primero el sujeto «Los niños» y después el predicado «juegan al balón».",
        "separar", "Corta antes del verbo."),
      choice("3. ¿Cuál es el verbo?", "Acción principal", ["juegan", "niños", "balón", "Los"], "juegan",
        "¡Casi! El verbo es «juegan».",
        "verbo", "¿Qué hacen los niños?"),
    ],
  },
  {
    id: 5,
    order: 5,
    level: 2,
    text: "María escribe una carta.",
    showSentence: true,
    sujeto: "María",
    predicado: "escribe una carta",
    sujetoOptions: ["María", "escribe", "una carta", "carta"],
    predicadoOptions: ["escribe una carta", "María", "una carta", "escribe"],
    explainSujeto: "Sujeto: María.",
    explainPredicado: "Predicado: escribe una carta.",
    steps: [
      choice("1. ¿Cuál es el sujeto?", "Quién hace la acción", ["María", "escribe", "una carta", "carta"], "María",
        "¡Casi! «María» es quien escribe. Ese es el sujeto.",
        "sujeto", "¿Quién escribe?"),
      choice("2. ¿Cuál es el predicado?", "Qué se dice del sujeto", ["escribe una carta", "María", "una carta", "escribe"], "escribe una carta",
        "¡Casi! El predicado completo es «escribe una carta».",
        "predicado", "Desde el verbo hasta el final."),
      choice("3. Morfología: «carta» es…", "Tipo de palabra", ["sustantivo", "verbo", "adjetivo", "adverbio"], "sustantivo",
        "¡Casi! «Carta» nombra una cosa: es un sustantivo.",
        "morfo", "¿Nombra una persona, animal o cosa?"),
    ],
  },
  {
    id: 6,
    order: 6,
    level: 2,
    text: "¡Qué bonita es la luna!",
    showSentence: true,
    sujeto: "la luna",
    predicado: "es bonita",
    sujetoOptions: ["la luna", "bonita", "es", "Qué"],
    predicadoOptions: ["es bonita", "la luna", "bonita", "Qué bonita"],
    explainSujeto: "Sujeto: la luna.",
    explainPredicado: "Predicado: es bonita (con el adjetivo).",
    steps: [
      choice("1. Tipo de oración", "Intención del hablante",
        ["Exclamativa", "Interrogativa", "Enunciativa", "Imperativa"], "Exclamativa",
        "¡Casi! Los signos ¡! marcan una oración exclamativa: expresa emoción.",
        "tipo_oracion", "Mira ¡ !"),
      choice("2. ¿Cuál es el sujeto?", "De quién se dice algo", ["la luna", "bonita", "es", "Qué"], "la luna",
        "¡Casi! Se habla de «la luna»: ese es el sujeto.",
        "sujeto", "¿De qué se dice que es bonita?"),
      choice("3. ¿Qué tipo de palabra es «bonita»?", "Morfología", ["adjetivo", "sustantivo", "verbo", "adverbio"], "adjetivo",
        "¡Casi! «Bonita» describe a la luna: es un adjetivo.",
        "morfo", "¿Describe cómo es algo?"),
    ],
  },
  {
    id: 7,
    order: 7,
    level: 2,
    text: "",
    showSentence: false,
    sujeto: "—",
    predicado: "—",
    sujetoOptions: ["—"],
    predicadoOptions: ["—"],
    explainSujeto: "—",
    explainPredicado: "—",
    steps: [
      choice("Ortografía: elige la forma correcta", "Concordancia de género",
        ["La niña contenta juega.", "La niña contento juega.", "El niña contenta juega.", "La niño contenta juega."],
        "La niña contenta juega.",
        "¡Casi! «Niña» es femenino, así que el adjetivo va en femenino: contenta. Artículo «la».",
        "ortografia", "Mira el género: niña → contenta."),
      choice("Ortografía: ¿cuál está bien?", "Uso de mayúscula",
        ["Madrid es una ciudad.", "madrid es una ciudad.", "Madrid es Una ciudad.", "madrid Es una ciudad."],
        "Madrid es una ciudad.",
        "¡Casi! Los nombres propios (Madrid) llevan mayúscula. El resto va en minúscula, salvo el inicio.",
        "ortografia", "Los nombres de ciudades empiezan con mayúscula."),
      choice("Concordancia: elige la frase correcta", "Sujeto y verbo",
        ["Los perros corren rápido.", "Los perros corre rápido.", "El perros corren rápido.", "Los perro corren rápido."],
        "Los perros corren rápido.",
        "¡Casi! Sujeto plural «Los perros» → verbo en plural «corren».",
        "ortografia", "Plural con plural."),
    ],
  },
  {
    id: 8,
    order: 8,
    level: 2,
    text: "Mis amigos cantan en el coro.",
    showSentence: true,
    sujeto: "Mis amigos",
    predicado: "cantan en el coro",
    sujetoOptions: ["Mis amigos", "cantan", "el coro", "en el coro"],
    predicadoOptions: ["cantan en el coro", "Mis amigos", "el coro", "cantan"],
    explainSujeto: "Sujeto: Mis amigos.",
    explainPredicado: "Predicado: cantan en el coro.",
    steps: [
      choice("1. ¿Cuál es el sujeto?", "Quién realiza la acción", ["Mis amigos", "cantan", "el coro", "Mis"], "Mis amigos",
        "¡Casi! Quienes cantan son «Mis amigos». Ese es el sujeto.",
        "sujeto", "¿Quiénes cantan?"),
      choice("2. ¿Cuál es el predicado?", "Qué se dice del sujeto", ["cantan en el coro", "Mis amigos", "en el coro", "amigos"], "cantan en el coro",
        "¡Casi! Predicado: «cantan en el coro».",
        "predicado", "Desde el verbo."),
      nucleos("amigos", "cantan",
        "¡Casi! Núcleo del sujeto: «amigos». Núcleo del predicado: «cantan».",
        "Sustantivo principal y verbo principal."),
    ],
  },
  {
    id: 9,
    order: 9,
    level: 3,
    text: "Cierra la puerta, por favor.",
    showSentence: true,
    sujeto: "(tú)",
    predicado: "Cierra la puerta",
    sujetoOptions: ["(tú omitido)", "puerta", "Cierra", "favor"],
    predicadoOptions: ["Cierra la puerta", "por favor", "la puerta", "Cierra"],
    explainSujeto: "Sujeto omitido: tú.",
    explainPredicado: "Predicado: Cierra la puerta.",
    steps: [
      choice("1. Tipo de oración", "Intención",
        ["Imperativa", "Interrogativa", "Enunciativa", "Exclamativa"], "Imperativa",
        "¡Casi! Da una orden o ruego: «Cierra…». Es imperativa. El sujeto (tú) suele omitirse.",
        "tipo_oracion", "¿Es una orden o petición?"),
      choice("2. ¿Cuál es el verbo?", "Acción", ["Cierra", "puerta", "favor", "la"], "Cierra",
        "¡Casi! El verbo en imperativo es «Cierra».",
        "verbo", "¿Qué se pide hacer?"),
      choice("3. El sujeto de esta oración…", "Sujeto omitido",
        ["Está omitido (tú)", "Es «la puerta»", "Es «por favor»", "No hay sujeto posible"],
        "Está omitido (tú)",
        "¡Casi! En las imperativas el sujeto «tú» casi no se dice, pero se entiende.",
        "sujeto", "¿Quién debe cerrar?"),
    ],
  },
  {
    id: 10,
    order: 10,
    level: 3,
    text: "El mago antiguo abre el libro secreto.",
    showSentence: true,
    sujeto: "El mago antiguo",
    predicado: "abre el libro secreto",
    sujetoOptions: ["El mago antiguo", "abre", "el libro secreto", "mago"],
    predicadoOptions: ["abre el libro secreto", "El mago antiguo", "el libro secreto", "abre"],
    explainSujeto: "Sujeto: El mago antiguo.",
    explainPredicado: "Predicado: abre el libro secreto.",
    steps: [
      choice("1. ¿Cuál es el sujeto?", "Quién hace la acción", ["El mago antiguo", "abre", "el libro secreto", "libro"], "El mago antiguo",
        "¡Casi! El sujeto incluye el adjetivo: «El mago antiguo» es quien abre.",
        "sujeto", "¿Quién abre?"),
      choice("2. Separa sujeto y predicado", "Corte correcto",
        ["El mago antiguo | abre el libro secreto", "El mago | antiguo abre el libro secreto", "El mago antiguo abre | el libro secreto", "El | mago antiguo abre el libro secreto"],
        "El mago antiguo | abre el libro secreto",
        "¡Casi! Sujeto hasta antes del verbo: «El mago antiguo | abre el libro secreto».",
        "separar", "Corta delante de «abre»."),
      choice("3. «antiguo» es…", "Morfología", ["adjetivo", "sustantivo", "verbo", "adverbio"], "adjetivo",
        "¡Casi! «Antiguo» describe al mago: es adjetivo.",
        "morfo", "¿Describe al mago?"),
    ],
  },
  {
    id: 11,
    order: 11,
    level: 3,
    text: "Nosotros leemos cuentos de magia.",
    showSentence: true,
    sujeto: "Nosotros",
    predicado: "leemos cuentos de magia",
    sujetoOptions: ["Nosotros", "leemos", "cuentos de magia", "magia"],
    predicadoOptions: ["leemos cuentos de magia", "Nosotros", "cuentos de magia", "leemos"],
    explainSujeto: "Sujeto: Nosotros.",
    explainPredicado: "Predicado: leemos cuentos de magia.",
    steps: [
      choice("1. ¿Cuál es el sujeto?", "Quién", ["Nosotros", "leemos", "cuentos", "magia"], "Nosotros",
        "¡Casi! El pronombre «Nosotros» es el sujeto: quienes leen.",
        "sujeto", "¿Quiénes leen?"),
      choice("2. ¿Cuál es el predicado?", "Qué se dice", ["leemos cuentos de magia", "Nosotros", "cuentos de magia", "de magia"], "leemos cuentos de magia",
        "¡Casi! Todo desde el verbo: «leemos cuentos de magia».",
        "predicado", "Desde «leemos»."),
      choice("3. ¿Cuál es el verbo?", "Acción", ["leemos", "Nosotros", "cuentos", "magia"], "leemos",
        "¡Casi! El verbo es «leemos».",
        "verbo", "¿Qué hacemos?"),
    ],
  },
  {
    id: 12,
    order: 12,
    level: 3,
    text: "",
    showSentence: false,
    sujeto: "—",
    predicado: "—",
    sujetoOptions: ["—"],
    predicadoOptions: ["—"],
    explainSujeto: "—",
    explainPredicado: "—",
    steps: [
      choice("Ortografía: elige la correcta", "b / v",
        ["El barco navega en el mar.", "El varco navega en el mar.", "El barco navega en el mab.", "El barco nabeга en el mar."],
        "El barco navega en el mar.",
        "¡Casi! Se escribe «barco» con b y «navega» con v. La frase correcta es la primera.",
        "ortografia", "Barco se escribe con b."),
      choice("Ortografía: plural correcto", "Concordancia",
        ["Las flores son bonitas.", "Las flores es bonitas.", "La flores son bonitas.", "Las flor son bonitas."],
        "Las flores son bonitas.",
        "¡Casi! Plural «Las flores» + verbo «son» + adjetivo «bonitas».",
        "ortografia", "Todo en plural."),
      choice("¿Qué oración es enunciativa?", "Tipo de oración",
        ["Hoy hace sol.", "¿Hoy hace sol?", "¡Hoy hace sol!", "Cierra la ventana."],
        "Hoy hace sol.",
        "¡Casi! Enunciativa: afirma algo con punto, sin ¿? ni ¡! ni orden.",
        "tipo_oracion", "Afirma algo con calma."),
    ],
  },
  {
    id: 13,
    order: 13,
    level: 4,
    text: "Las estrellas brillan sobre la academia.",
    showSentence: true,
    sujeto: "Las estrellas",
    predicado: "brillan sobre la academia",
    sujetoOptions: ["Las estrellas", "brillan", "la academia", "sobre la academia"],
    predicadoOptions: ["brillan sobre la academia", "Las estrellas", "sobre la academia", "brillan"],
    explainSujeto: "Sujeto: Las estrellas.",
    explainPredicado: "Predicado: brillan sobre la academia.",
    steps: [
      choice("1. ¿Cuál es el sujeto?", "Quién / qué", ["Las estrellas", "brillan", "la academia", "sobre"], "Las estrellas",
        "¡Casi! Lo que brilla son «Las estrellas». Ese es el sujeto.",
        "sujeto", "¿Qué brilla?"),
      choice("2. ¿Cuál es el predicado?", "Qué se dice", ["brillan sobre la academia", "Las estrellas", "sobre la academia", "academia"], "brillan sobre la academia",
        "¡Casi! Predicado completo: «brillan sobre la academia».",
        "predicado", "Desde el verbo."),
      nucleos("estrellas", "brillan",
        "¡Casi! Núcleo SN: «estrellas». Núcleo SV: «brillan».",
        "Sustantivo y verbo principales."),
    ],
  },
  {
    id: 14,
    order: 14,
    level: 4,
    text: "El pequeño dragón verde guarda un tesoro enorme.",
    showSentence: true,
    sujeto: "El pequeño dragón verde",
    predicado: "guarda un tesoro enorme",
    sujetoOptions: ["El pequeño dragón verde", "guarda", "un tesoro enorme", "dragón"],
    predicadoOptions: ["guarda un tesoro enorme", "El pequeño dragón verde", "un tesoro enorme", "guarda"],
    explainSujeto: "Sujeto largo con adjetivos.",
    explainPredicado: "Predicado: guarda un tesoro enorme.",
    steps: [
      choice("1. ¿Cuál es el sujeto completo?", "Todo el grupo del que se habla",
        ["El pequeño dragón verde", "dragón verde", "El pequeño dragón", "guarda un tesoro enorme"],
        "El pequeño dragón verde",
        "¡Casi! El sujeto incluye artículos y adjetivos: «El pequeño dragón verde».",
        "sujeto", "Todo lo que va antes del verbo."),
      choice("2. ¿Cuál es el predicado?", "Desde el verbo",
        ["guarda un tesoro enorme", "El pequeño dragón verde", "un tesoro enorme", "tesoro"],
        "guarda un tesoro enorme",
        "¡Casi! Predicado: «guarda un tesoro enorme».",
        "predicado", "Empieza en «guarda»."),
      choice("3. «enorme» es…", "Morfología", ["adjetivo", "sustantivo", "verbo", "pronombre"], "adjetivo",
        "¡Casi! «Enorme» describe el tesoro: adjetivo.",
        "morfo", "¿Describe el tamaño?"),
    ],
  },
  {
    id: 15,
    order: 15,
    level: 5,
    text: "¿Por qué estudian las magas cada tarde?",
    showSentence: true,
    sujeto: "las magas",
    predicado: "estudian cada tarde",
    sujetoOptions: ["las magas", "estudian", "cada tarde", "Por qué"],
    predicadoOptions: ["estudian cada tarde", "las magas", "cada tarde", "estudian"],
    explainSujeto: "Sujeto: las magas.",
    explainPredicado: "Predicado: estudian cada tarde.",
    steps: [
      choice("1. Tipo de oración", "Intención",
        ["Interrogativa", "Enunciativa", "Exclamativa", "Imperativa"], "Interrogativa",
        "¡Casi! Pregunta con ¿?: es interrogativa.",
        "tipo_oracion", "¿Es una pregunta?"),
      choice("2. ¿Cuál es el sujeto?", "Quién estudia", ["las magas", "estudian", "cada tarde", "Por qué"], "las magas",
        "¡Casi! Quienes estudian son «las magas».",
        "sujeto", "¿Quiénes estudian?"),
      choice("3. Separa sujeto y predicado", "Corte",
        ["las magas | estudian cada tarde", "las | magas estudian cada tarde", "las magas estudian | cada tarde", "¿Por qué | estudian las magas cada tarde?"],
        "las magas | estudian cada tarde",
        "¡Casi! Sujeto «las magas» y predicado «estudian cada tarde». «¿Por qué» es un nexo interrogativo, no el sujeto.",
        "separar", "El sujeto es quien estudia."),
    ],
  },
];

// Fix garbled option in id 12
LANGUAGE_SENTENCES[11]!.steps[0] = choice(
  "Ortografía: elige la correcta",
  "b / v",
  [
    "El barco navega en el mar.",
    "El varco navega en el mar.",
    "El barco navega en el mab.",
    "El barco nabeva en el mar.",
  ],
  "El barco navega en el mar.",
  "¡Casi! Se escribe «barco» con b y «navega» con v. La frase correcta es la primera.",
  "ortografia",
  "Barco se escribe con b.",
);

export function getLanguageProgressive(): LanguageSentence[] {
  return [...LANGUAGE_SENTENCES].sort((a, b) => a.order - b.order);
}

/** @deprecated morph helper kept for any residual imports */
export function morfologiaExplanation(word: string, tipo: string): string {
  return `¡Casi! La palabra «${word}» es un ${tipo}. Piensa en su papel en la oración y lo verás más claro la próxima vez.`;
}
