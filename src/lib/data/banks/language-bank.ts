/** Banco de Lengua por nivel — Academia Arcana */
import type { LangQ } from "@/lib/data/question-banks";

export const LANG_BANK: LangQ[] = [
  {
    "id": "l1",
    "level": 1,
    "title": "¿Cuál es el sujeto?",
    "tip": "El sujeto dice de quién se habla.",
    "text": "La lechuza duerme en la torre.",
    "options": [
      "duerme en la torre",
      "duerme",
      "en la torre",
      "La lechuza"
    ],
    "answer": "La lechuza",
    "explanation": "¡Casi! El sujeto es «La lechuza»: es de quién hablamos. «duerme en la torre» es lo que hace (predicado). ¡Ojo de búho!",
    "skillTag": "sujeto",
    "hint": "Pregunta: ¿quién duerme?",
    "showSentence": true
  },
  {
    "id": "l2",
    "level": 1,
    "title": "¿Cuál es el predicado?",
    "tip": "El predicado dice qué se hace o qué pasa.",
    "text": "Los dragones vuelan alto.",
    "options": [
      "vuelan alto",
      "Los dragones",
      "alto",
      "Los"
    ],
    "answer": "vuelan alto",
    "explanation": "¡Casi! El predicado es «vuelan alto»: es lo que hacen los dragones. El sujeto es «Los dragones». ¡Predicado al vuelo!",
    "skillTag": "predicado",
    "hint": "¿Qué hacen los dragones?",
    "showSentence": true
  },
  {
    "id": "l3",
    "level": 1,
    "title": "¿Cuál es el verbo?",
    "tip": "El verbo es la acción o el estado.",
    "text": "Liz abre el grimorio.",
    "options": [
      "grimorio",
      "abre",
      "Liz",
      "el grimorio"
    ],
    "answer": "abre",
    "explanation": "¡Casi! El verbo es «abre»: es la acción. Liz es quien abre; el grimorio es el objeto. ¡Verbo desbloqueado!",
    "skillTag": "verbo",
    "hint": "¿Qué acción ocurre?",
    "showSentence": true
  },
  {
    "id": "l4",
    "level": 1,
    "title": "¿Sujeto o predicado? Marca el sujeto",
    "tip": "¿De quién se habla?",
    "text": "El gato mágico maúlla fuerte.",
    "options": [
      "mágico",
      "fuerte",
      "El gato mágico",
      "maúlla fuerte"
    ],
    "answer": "El gato mágico",
    "explanation": "¡Casi! «El gato mágico» es el sujeto (quién). «maúlla fuerte» es el predicado (qué hace).",
    "skillTag": "sujeto",
    "hint": "¿Quién maúlla?",
    "showSentence": true
  },
  {
    "id": "l5",
    "level": 1,
    "title": "Separa: ¿qué es el predicado?",
    "tip": "Todo lo que no es sujeto suele ser predicado.",
    "text": "Mis amigas leen en silencio.",
    "options": [
      "leen en silencio",
      "Mis amigas",
      "en silencio",
      "Mis"
    ],
    "answer": "leen en silencio",
    "explanation": "¡Casi! Sujeto = «Mis amigas». Predicado = «leen en silencio». ¡Separación perfecta!",
    "skillTag": "predicado",
    "hint": "¿Qué hacen mis amigas?",
    "showSentence": true
  },
  {
    "id": "l6",
    "level": 1,
    "title": "¿Tipo de oración?",
    "tip": "Enunciativa dice algo; interrogativa pregunta; exclamativa emociona.",
    "text": "¡Qué varita tan brillante!",
    "options": [
      "Exclamativa",
      "Negativa",
      "Interrogativa",
      "Enunciativa"
    ],
    "answer": "Exclamativa",
    "explanation": "¡Casi! Lleva ¡! y expresa emoción: es exclamativa. Las interrogativas llevan ¿?. ¡Tipos de hechizo-oración!",
    "skillTag": "tipo_oracion",
    "hint": "Mira los signos ¡!",
    "showSentence": false
  },
  {
    "id": "l7",
    "level": 1,
    "title": "¿Tipo de oración?",
    "tip": "¿Pregunta o afirma?",
    "text": "¿Dónde está el mapa?",
    "options": [
      "Imperativa",
      "Enunciativa",
      "Interrogativa",
      "Exclamativa"
    ],
    "answer": "Interrogativa",
    "explanation": "¡Casi! Tiene ¿? y pregunta algo: es interrogativa. ¡Buen detective!",
    "skillTag": "tipo_oracion",
    "hint": "Signos ¿?",
    "showSentence": false
  },
  {
    "id": "l8",
    "level": 1,
    "title": "Ortografía: elige la correcta",
    "tip": "b/v y h a veces engañan.",
    "text": "",
    "options": [
      "La bruja huela",
      "La vruga vuela",
      "La bruja vuela",
      "La bruja buela"
    ],
    "answer": "La bruja vuela",
    "explanation": "¡Casi! Se escribe «vuela» con v (del verbo volar). «Bruja» con b. ¡Ortografía mágica!",
    "skillTag": "ortografia",
    "hint": "Volar → vuela",
    "showSentence": false
  },
  {
    "id": "l9",
    "level": 1,
    "title": "Concordancia: elige bien",
    "tip": "El adjetivo se lleva bien con el sustantivo.",
    "text": "Las ___ son brillantes.",
    "options": [
      "estrella",
      "estrellas",
      "estrellan",
      "estrellos"
    ],
    "answer": "estrellas",
    "explanation": "¡Casi! «Las» y «brillantes» van en femenino plural, así que «estrellas». ¡Acuerdo perfecto!",
    "skillTag": "concordancia",
    "hint": "Femenino plural",
    "showSentence": false
  },
  {
    "id": "l10",
    "level": 1,
    "title": "¿Cuál es el sujeto?",
    "tip": "Puede ser una persona, animal o cosa.",
    "text": "El sol ilumina el patio.",
    "options": [
      "ilumina",
      "el patio",
      "El sol",
      "ilumina el patio"
    ],
    "answer": "El sol",
    "explanation": "¡Casi! Hablamos del sol → sujeto «El sol». El resto es predicado.",
    "skillTag": "sujeto",
    "hint": "¿Quién/qué ilumina?",
    "showSentence": true
  },
  {
    "id": "l11",
    "level": 1,
    "title": "¿Verbo en la oración?",
    "tip": "Busca la acción.",
    "text": "Nosotros cantamos en el coro.",
    "options": [
      "cantamos",
      "en el coro",
      "coro",
      "Nosotros"
    ],
    "answer": "cantamos",
    "explanation": "¡Casi! «cantamos» es el verbo (acción). «Nosotros» es el sujeto.",
    "skillTag": "verbo",
    "hint": "¿Qué hacemos?",
    "showSentence": true
  },
  {
    "id": "l12",
    "level": 1,
    "title": "¿Predicado?",
    "tip": "Lo que se dice del sujeto.",
    "text": "Tu varita brilla mucho.",
    "options": [
      "mucho",
      "brilla mucho",
      "Tu",
      "Tu varita"
    ],
    "answer": "brilla mucho",
    "explanation": "¡Casi! Sujeto «Tu varita»; predicado «brilla mucho».",
    "skillTag": "predicado",
    "hint": "¿Qué hace la varita?",
    "showSentence": true
  },
  {
    "id": "l13",
    "level": 1,
    "title": "Ortografía mágica",
    "tip": "¿h o sin h?",
    "text": "",
    "options": [
      "Hay un hechizo",
      "Allí un hechizo mal",
      "Ay un hechizo",
      "Hai un hechizo"
    ],
    "answer": "Hay un hechizo",
    "explanation": "¡Casi! «Hay» de haber lleva h. Significa «existe». ¡H de hechizo y de hay!",
    "skillTag": "ortografia",
    "hint": "Haber → hay",
    "showSentence": false
  },
  {
    "id": "l14",
    "level": 1,
    "title": "¿Sujeto?",
    "tip": "A veces el sujeto está al final.",
    "text": "En la torre duerme un dragón.",
    "options": [
      "En la torre",
      "un dragón",
      "la torre",
      "duerme"
    ],
    "answer": "un dragón",
    "explanation": "¡Casi! Aunque va al final, de quien se habla es «un dragón». «En la torre duerme» es predicado. ¡Orden flexible!",
    "skillTag": "sujeto",
    "hint": "¿Quién duerme?",
    "showSentence": true
  },
  {
    "id": "l15",
    "level": 1,
    "title": "Concordancia",
    "tip": "Singular o plural.",
    "text": "El búho ___ sabio.",
    "options": [
      "son",
      "somos",
      "sois",
      "es"
    ],
    "answer": "es",
    "explanation": "¡Casi! «El búho» es singular → verbo «es». «Son» sería para varios. ¡Concordancia al vuelo!",
    "skillTag": "concordancia",
    "hint": "Un solo búho",
    "showSentence": false
  },
  {
    "id": "l16",
    "level": 1,
    "title": "Tipo de oración",
    "tip": "Lee el tono.",
    "text": "Cierra el libro con cuidado.",
    "options": [
      "Negativa",
      "Exclamativa",
      "Interrogativa",
      "Imperativa / orden"
    ],
    "answer": "Imperativa / orden",
    "explanation": "¡Casi! Da una orden o petición: es imperativa. ¡A obedecer el hechizo!",
    "skillTag": "tipo_oracion",
    "hint": "¿Ordena algo?",
    "showSentence": false
  },
  {
    "id": "l17",
    "level": 1,
    "title": "¿Verbo?",
    "tip": "Estado o acción.",
    "text": "Estamos felices en la Academia.",
    "options": [
      "Estamos",
      "la Academia",
      "en la Academia",
      "felices"
    ],
    "answer": "Estamos",
    "explanation": "¡Casi! «Estamos» es el verbo (estado). El resto complementa. ¡Verbos de estado también cuentan!",
    "skillTag": "verbo",
    "hint": "¿Qué forma de «estar»?",
    "showSentence": true
  },
  {
    "id": "l18",
    "level": 1,
    "title": "Separa sujeto y predicado",
    "tip": "Marca solo el sujeto.",
    "text": "Las nubes esconden la luna.",
    "options": [
      "la luna",
      "esconden la luna",
      "esconden",
      "Las nubes"
    ],
    "answer": "Las nubes",
    "explanation": "¡Casi! Sujeto «Las nubes»; predicado «esconden la luna».",
    "skillTag": "sujeto",
    "hint": "¿Quién esconde?",
    "showSentence": true
  },
  {
    "id": "l19",
    "level": 1,
    "title": "¿Predicado completo?",
    "tip": "Todo lo que no es sujeto.",
    "text": "Mi hermana dibuja runas azules.",
    "options": [
      "runas azules",
      "dibuja runas azules",
      "dibuja",
      "Mi hermana"
    ],
    "answer": "dibuja runas azules",
    "explanation": "¡Casi! El predicado incluye verbo y complementos: «dibuja runas azules».",
    "skillTag": "predicado",
    "hint": "¿Qué hace mi hermana?",
    "showSentence": true
  },
  {
    "id": "l20",
    "level": 1,
    "title": "Ortografía: mayúscula",
    "tip": "Nombres propios y inicio.",
    "text": "",
    "options": [
      "Liz vive en Madrid",
      "liz vive en Madrid",
      "Liz vive en madrid",
      "liz vive en madrid"
    ],
    "answer": "Liz vive en Madrid",
    "explanation": "¡Casi! «Liz» y «Madrid» son nombres propios: mayúscula. También al empezar la frase. ¡Mayúsculas de honor!",
    "skillTag": "ortografia",
    "hint": "Nombres propios",
    "showSentence": false
  },
  {
    "id": "l21",
    "level": 1,
    "title": "¿Sujeto?",
    "tip": "Quién hace la magia.",
    "text": "Aquellos aprendices practican mucho.",
    "options": [
      "mucho",
      "aprendices",
      "practican mucho",
      "Aquellos aprendices"
    ],
    "answer": "Aquellos aprendices",
    "explanation": "¡Casi! El sujeto es «Aquellos aprendices». El predicado es «practican mucho».",
    "skillTag": "sujeto",
    "hint": "¿Quiénes practican?",
    "showSentence": true
  },
  {
    "id": "l22",
    "level": 1,
    "title": "¿Verbo principal?",
    "tip": "Una sola acción principal.",
    "text": "El mapa brilla y tiembla.",
    "options": [
      "El mapa",
      "tiembla también es verbo — elige «brilla» como primero",
      "brilla",
      "y"
    ],
    "answer": "brilla",
    "explanation": "¡Casi! Hay dos verbos coordinados; «brilla» es el primero. Ambos son acciones del mapa. ¡Oración con doble magia!",
    "skillTag": "verbo",
    "hint": "Primera acción",
    "showSentence": true
  },
  {
    "id": "l23",
    "level": 1,
    "title": "Concordancia de género",
    "tip": "Femenino / masculino.",
    "text": "La poción está ___.",
    "options": [
      "lista",
      "listo",
      "listas y listo",
      "listos"
    ],
    "answer": "lista",
    "explanation": "¡Casi! «La poción» es femenina singular → «lista». ¡Encaja como un hechizo!",
    "skillTag": "concordancia",
    "hint": "Femenino",
    "showSentence": false
  },
  {
    "id": "l24",
    "level": 1,
    "title": "Tipo: ¿enunciativa?",
    "tip": "Afirma algo sin ¿! ni orden.",
    "text": "La Academia abre al amanecer.",
    "options": [
      "Interrogativa",
      "Imperativa",
      "Exclamativa",
      "Enunciativa"
    ],
    "answer": "Enunciativa",
    "explanation": "¡Casi! Solo informa un hecho: enunciativa. Sin signos de pregunta ni exclamación. ¡Claro y sereno!",
    "skillTag": "tipo_oracion",
    "hint": "¿Solo informa?",
    "showSentence": false
  },
  {
    "id": "l25",
    "level": 1,
    "title": "¿Quién es el sujeto?",
    "tip": "Puede incluir determinantes.",
    "text": "Nuestra profesora sonríe.",
    "options": [
      "Nuestra",
      "Nuestra profesora",
      "profesora solo",
      "sonríe"
    ],
    "answer": "Nuestra profesora",
    "explanation": "¡Casi! El sujeto completo es «Nuestra profesora» (determinante + nombre).",
    "skillTag": "sujeto",
    "hint": "Grupo completo",
    "showSentence": true
  },
  {
    "id": "l26",
    "level": 1,
    "title": "Predicado: elige",
    "tip": "Verbo + complementos.",
    "text": "Los alumnos copian la runa con cuidado.",
    "options": [
      "con cuidado",
      "copian la runa con cuidado",
      "Los alumnos",
      "la runa"
    ],
    "answer": "copian la runa con cuidado",
    "explanation": "¡Casi! Todo lo que hacen es el predicado: «copian la runa con cuidado».",
    "skillTag": "predicado",
    "hint": "¿Qué hacen?",
    "showSentence": true
  },
  {
    "id": "l27",
    "level": 1,
    "title": "Ortografía: c/z/s suave",
    "tip": "Escucha el sonido.",
    "text": "",
    "options": [
      "El lápiz magico",
      "El lápiz mágico",
      "El lapiz mágico",
      "El lápis mágico"
    ],
    "answer": "El lápiz mágico",
    "explanation": "¡Casi! «Lápiz» termina en z; «mágico» lleva tilde en á. ¡Detalle de maga!",
    "skillTag": "ortografia",
    "hint": "z final",
    "showSentence": false
  },
  {
    "id": "l28",
    "level": 2,
    "title": "Sujeto compuesto",
    "tip": "Puede haber más de un núcleo.",
    "text": "Liz y Maya estudian juntas.",
    "options": [
      "juntas",
      "estudian juntas",
      "Liz y Maya",
      "estudian"
    ],
    "answer": "Liz y Maya",
    "explanation": "¡Casi! El sujeto es «Liz y Maya» (dos personas). Predicado: «estudian juntas». ¡Sujeto doble!",
    "skillTag": "sujeto",
    "hint": "¿Quiénes?",
    "showSentence": true
  },
  {
    "id": "l29",
    "level": 2,
    "title": "¿Núcleo del predicado?",
    "tip": "El verbo es el núcleo.",
    "text": "El guardián protege la torre antigua.",
    "options": [
      "la torre antigua",
      "protege",
      "El guardián",
      "antigua"
    ],
    "answer": "protege",
    "explanation": "¡Casi! El núcleo del predicado es el verbo «protege». El resto son complementos. ¡Núcleo brillante!",
    "skillTag": "verbo",
    "hint": "Verbo principal",
    "showSentence": true
  },
  {
    "id": "l30",
    "level": 2,
    "title": "Complemento: ¿dónde?",
    "tip": "CC de lugar.",
    "text": "Guardamos el libro en el baúl.",
    "options": [
      "en el baúl",
      "Guardamos",
      "Guardamos el libro",
      "el libro"
    ],
    "answer": "en el baúl",
    "explanation": "¡Casi! «en el baúl» dice dónde: complemento circunstancial de lugar. ¡Lugar del hechizo!",
    "skillTag": "complemento",
    "hint": "¿Dónde?",
    "showSentence": true
  },
  {
    "id": "l31",
    "level": 2,
    "title": "Ortografía: tilde",
    "tip": "Agudas, llanas, esdrújulas.",
    "text": "",
    "options": [
      "mágico",
      "mági co",
      "magico",
      "mágíco"
    ],
    "answer": "mágico",
    "explanation": "¡Casi! «Mágico» es esdrújula: siempre lleva tilde. ¡Acento de magia!",
    "skillTag": "ortografia",
    "hint": "Esdrújula",
    "showSentence": false
  },
  {
    "id": "l32",
    "level": 2,
    "title": "Concordancia verbo-sujeto",
    "tip": "Plural con plural.",
    "text": "Las torres ___ altas.",
    "options": [
      "es",
      "está",
      "soy",
      "son"
    ],
    "answer": "son",
    "explanation": "¡Casi! «Las torres» (plural) va con «son». ¡Plural con plural!",
    "skillTag": "concordancia",
    "hint": "Varias torres",
    "showSentence": false
  },
  {
    "id": "l33",
    "level": 2,
    "title": "Tipo de oración",
    "tip": "Negación.",
    "text": "No quiero cerrar el mapa todavía.",
    "options": [
      "Imperativa",
      "Interrogativa",
      "Exclamativa",
      "Enunciativa negativa"
    ],
    "answer": "Enunciativa negativa",
    "explanation": "¡Casi! Afirma (enunciativa) pero con «no»: negativa. ¡Matices de hechicera!",
    "skillTag": "tipo_oracion",
    "hint": "Hay un «no»",
    "showSentence": false
  },
  {
    "id": "l34",
    "level": 2,
    "title": "¿Sujeto omitido?",
    "tip": "A veces no se escribe porque se entiende.",
    "text": "Abrimos las ventanas al alba.",
    "options": [
      "al alba",
      "las ventanas",
      "Abrimos",
      "nosotros/as (omitido)"
    ],
    "answer": "nosotros/as (omitido)",
    "explanation": "¡Casi! El verbo «abrimos» ya dice que el sujeto es nosotros/as, aunque no se escriba. ¡Sujeto escondido!",
    "skillTag": "sujeto",
    "hint": "Persona del verbo",
    "showSentence": true
  },
  {
    "id": "l35",
    "level": 2,
    "title": "Predicado nominal o verbal",
    "tip": "Con ser/estar suele ser nominal.",
    "text": "La noche está serena.",
    "options": [
      "está serena (predicado)",
      "está",
      "La noche",
      "serena solo"
    ],
    "answer": "está serena (predicado)",
    "explanation": "¡Casi! «está serena» es el predicado (con verbo estar + atributo). Sujeto: «La noche».",
    "skillTag": "predicado",
    "hint": "¿Qué se dice de la noche?",
    "showSentence": true
  },
  {
    "id": "l36",
    "level": 2,
    "title": "Ortografía: b/v",
    "tip": "Verbos y nombres.",
    "text": "",
    "options": [
      "Escrivimos un verso",
      "Escribimos un verso",
      "Escrivimos un ber so",
      "Escribimos un ber so"
    ],
    "answer": "Escribimos un verso",
    "explanation": "¡Casi! «Escribir» con b; «verso» con v. ¡Par b/v resuelto!",
    "skillTag": "ortografia",
    "hint": "escribir → b",
    "showSentence": false
  },
  {
    "id": "l37",
    "level": 2,
    "title": "Identifica el verbo",
    "tip": "Puede haber perífrasis.",
    "text": "Debemos terminar el ejercicio.",
    "options": [
      "terminar solo",
      "el ejercicio",
      "Debemos solo",
      "Debemos terminar"
    ],
    "answer": "Debemos terminar",
    "explanation": "¡Casi! «Debemos terminar» es una perífrasis verbal (dos formas = un significado). ¡Verbo compuesto!",
    "skillTag": "verbo",
    "hint": "Dos formas, una idea",
    "showSentence": true
  },
  {
    "id": "l38",
    "level": 2,
    "title": "¿Complemento directo?",
    "tip": "¿Qué + verbo?",
    "text": "Liz lee un pergamino.",
    "options": [
      "lee un",
      "un pergamino",
      "Liz",
      "lee"
    ],
    "answer": "un pergamino",
    "explanation": "¡Casi! «un pergamino» es CD: responde a «¿qué lee Liz?». ¡Objeto del hechizo!",
    "skillTag": "complemento",
    "hint": "¿Qué lee?",
    "showSentence": true
  },
  {
    "id": "l39",
    "level": 2,
    "title": "Sujeto",
    "tip": "Grupo nominal.",
    "text": "Aquella estrella lejana parpadea.",
    "options": [
      "lejana",
      "Aquella estrella lejana",
      "estrella",
      "parpadea"
    ],
    "answer": "Aquella estrella lejana",
    "explanation": "¡Casi! Todo el grupo «Aquella estrella lejana» es el sujeto. ¡No te dejes solo el nombre!",
    "skillTag": "sujeto",
    "hint": "Grupo completo",
    "showSentence": true
  },
  {
    "id": "l40",
    "level": 2,
    "title": "Tipo exclamativa",
    "tip": "Emoción fuerte.",
    "text": "¡Hoy aprendí un hechizo nuevo!",
    "options": [
      "Exclamativa",
      "Enunciativa",
      "Interrogativa",
      "Condicional"
    ],
    "answer": "Exclamativa",
    "explanation": "¡Casi! Emoción + ¡!: exclamativa. ¡Felicidades internas!",
    "skillTag": "tipo_oracion",
    "hint": "¡!",
    "showSentence": false
  },
  {
    "id": "l41",
    "level": 2,
    "title": "Concordancia",
    "tip": "Género y número.",
    "text": "Los grimorios viejos están ___.",
    "options": [
      "abierto",
      "abiertas",
      "abierta",
      "abiertos"
    ],
    "answer": "abiertos",
    "explanation": "¡Casi! Masculino plural → «abiertos». ¡Encaja con «grimorios»!",
    "skillTag": "concordancia",
    "hint": "Plural masculino",
    "showSentence": false
  },
  {
    "id": "l42",
    "level": 2,
    "title": "Ortografía: g/j",
    "tip": "Sonido fuerte.",
    "text": "",
    "options": [
      "El mago biaja",
      "El mago viaja",
      "El majo viaja",
      "El mago viajaa"
    ],
    "answer": "El mago viaja",
    "explanation": "¡Casi! «Viaja» con j (viajar). «Mago» con g suave. ¡Buen oído!",
    "skillTag": "ortografia",
    "hint": "viajar → j",
    "showSentence": false
  },
  {
    "id": "l43",
    "level": 2,
    "title": "¿Predicado?",
    "tip": "Todo lo dicho del sujeto.",
    "text": "Tus ideas iluminan la clase.",
    "options": [
      "iluminan",
      "Tus ideas",
      "la clase",
      "iluminan la clase"
    ],
    "answer": "iluminan la clase",
    "explanation": "¡Casi! Predicado completo: «iluminan la clase».",
    "skillTag": "predicado",
    "hint": "¿Qué hacen las ideas?",
    "showSentence": true
  },
  {
    "id": "l44",
    "level": 2,
    "title": "Verbo en pasado",
    "tip": "Tiempo verbal.",
    "text": "Ayer cantamos en el salón.",
    "options": [
      "Ayer",
      "en el salón",
      "cantamos",
      "salón"
    ],
    "answer": "cantamos",
    "explanation": "¡Casi! «cantamos» aquí está en pasado (pretérito). ¡El tiempo también es magia!",
    "skillTag": "verbo",
    "hint": "Acción de ayer",
    "showSentence": true
  },
  {
    "id": "l45",
    "level": 2,
    "title": "Sujeto con artículo",
    "tip": "El/la/los/las.",
    "text": "La biblioteca guarda secretos.",
    "options": [
      "La biblioteca",
      "guarda secretos",
      "guarda",
      "secretos"
    ],
    "answer": "La biblioteca",
    "explanation": "¡Casi! Sujeto «La biblioteca»; predicado «guarda secretos».",
    "skillTag": "sujeto",
    "hint": "¿Quién guarda?",
    "showSentence": true
  },
  {
    "id": "l46",
    "level": 2,
    "title": "Complemento de tiempo",
    "tip": "¿Cuándo?",
    "text": "Practicamos magia por la tarde.",
    "options": [
      "Practicamos magia",
      "magia",
      "Practicamos",
      "por la tarde"
    ],
    "answer": "por la tarde",
    "explanation": "¡Casi! «por la tarde» es CC de tiempo (¿cuándo?). ¡Reloj de la Academia!",
    "skillTag": "complemento",
    "hint": "¿Cuándo?",
    "showSentence": true
  },
  {
    "id": "l47",
    "level": 2,
    "title": "Ortografía: ll/y",
    "tip": "Atención al sonido.",
    "text": "",
    "options": [
      "La lla ve del cofre",
      "La llabe del cofre",
      "La llave del cofre",
      "La yave del cofre"
    ],
    "answer": "La llave del cofre",
    "explanation": "¡Casi! «Llave» se escribe con ll. ¡Abre el cofre de la ortografía!",
    "skillTag": "ortografia",
    "hint": "llave",
    "showSentence": false
  },
  {
    "id": "l48",
    "level": 2,
    "title": "Tipo interrogativa",
    "tip": "Pregunta directa.",
    "text": "¿Quién abrió la puerta secreta?",
    "options": [
      "Desiderativa",
      "Interrogativa",
      "Enunciativa",
      "Exclamativa"
    ],
    "answer": "Interrogativa",
    "explanation": "¡Casi! Pregunta con ¿?: interrogativa. ¡Misterio en la Academia!",
    "skillTag": "tipo_oracion",
    "hint": "¿?",
    "showSentence": false
  },
  {
    "id": "l49",
    "level": 2,
    "title": "Concordancia sutil",
    "tip": "Con colectivos.",
    "text": "El grupo de magos ___ listo.",
    "options": [
      "están",
      "sois",
      "está",
      "somos"
    ],
    "answer": "está",
    "explanation": "¡Casi! «El grupo» es singular → «está». Aunque haya varios magos dentro. ¡Truco gramatical!",
    "skillTag": "concordancia",
    "hint": "Núcleo: grupo",
    "showSentence": false
  },
  {
    "id": "l50",
    "level": 2,
    "title": "¿CD o sujeto?",
    "tip": "No confundas.",
    "text": "El dragón custodia el tesoro.",
    "options": [
      "el (CD)",
      "el tesoro (CD)",
      "custodia (CD)",
      "El dragón (CD)"
    ],
    "answer": "el tesoro (CD)",
    "explanation": "¡Casi! Sujeto = El dragón. CD = el tesoro (¿qué custodia?). ¡Roles claros!",
    "skillTag": "complemento",
    "hint": "¿Qué custodia?",
    "showSentence": true
  },
  {
    "id": "l51",
    "level": 2,
    "title": "Predicado",
    "tip": "Completo.",
    "text": "Hoy el viento mueve las banderas.",
    "options": [
      "mueve las banderas",
      "las banderas",
      "Hoy",
      "Hoy el viento"
    ],
    "answer": "mueve las banderas",
    "explanation": "¡Casi! Sujeto «el viento»; «Hoy» es CC de tiempo; predicado «mueve las banderas».",
    "skillTag": "predicado",
    "hint": "¿Qué hace el viento?",
    "showSentence": true
  },
  {
    "id": "l52",
    "level": 2,
    "title": "Verbo",
    "tip": "Auxiliar + principal.",
    "text": "Hemos ganado la batalla.",
    "options": [
      "la batalla",
      "ganado solo",
      "Hemos ganado",
      "Hemos"
    ],
    "answer": "Hemos ganado",
    "explanation": "¡Casi! Pretérito perfecto: «Hemos ganado» funciona como unidad verbal. ¡Victoria gramatical!",
    "skillTag": "verbo",
    "hint": "Forma compuesta",
    "showSentence": true
  },
  {
    "id": "l53",
    "level": 2,
    "title": "Ortografía: mayúsculas en títulos",
    "tip": "Nombres de lugares mágicos.",
    "text": "",
    "options": [
      "Torre de Números",
      "torre De Números",
      "torre de números",
      "Torre de números"
    ],
    "answer": "Torre de Números",
    "explanation": "¡Casi! Como nombre propio del lugar en la Academia, se escriben mayúsculas en las palabras importantes. ¡Nombre con honor!",
    "skillTag": "ortografia",
    "hint": "Nombre propio",
    "showSentence": false
  },
  {
    "id": "l54",
    "level": 4,
    "title": "Análisis: sujeto",
    "tip": "Largo y preciso.",
    "text": "La maestra de runas del tercer piso explica el hechizo.",
    "options": [
      "La maestra",
      "del tercer piso",
      "La maestra de runas del tercer piso",
      "explica el hechizo"
    ],
    "answer": "La maestra de runas del tercer piso",
    "explanation": "¡Casi! Todo el grupo nominal extenso es el sujeto. El predicado empieza en «explica».",
    "skillTag": "sujeto",
    "hint": "Hasta antes del verbo",
    "showSentence": true
  },
  {
    "id": "l55",
    "level": 4,
    "title": "CI y CD juntos",
    "tip": "Dos objetos.",
    "text": "Entregué la carta a la bibliotecaria.",
    "options": [
      "la carta = CD; a la bibliotecaria = CI",
      "a la bibliotecaria = CD",
      "la carta = CI",
      "Entregué = sujeto"
    ],
    "answer": "la carta = CD; a la bibliotecaria = CI",
    "explanation": "¡Casi! ¿Qué entregué? la carta (CD). ¿A quién? a la bibliotecaria (CI).",
    "skillTag": "complemento",
    "hint": "¿Qué? ¿A quién?",
    "showSentence": true
  },
  {
    "id": "l56",
    "level": 4,
    "title": "Oración copulativa",
    "tip": "Ser/estar + atributo.",
    "text": "Aquellos ejercicios son difíciles.",
    "options": [
      "son",
      "difíciles solo",
      "Aquellos ejercicios",
      "son difíciles"
    ],
    "answer": "son difíciles",
    "explanation": "¡Casi! Predicado nominal: «son» + atributo «difíciles».",
    "skillTag": "predicado",
    "hint": "Ser + cualidad",
    "showSentence": true
  },
  {
    "id": "l57",
    "level": 4,
    "title": "Ortografía: haya/halla/aya",
    "tip": "Homófonos.",
    "text": "",
    "options": [
      "Espero que aya magia",
      "Espero que ha ya magia",
      "Espero que haya magia",
      "Espero que halla magia"
    ],
    "answer": "Espero que haya magia",
    "explanation": "¡Casi! «Haya» viene de haber. «Halla» es encontrar; «aya» es niñera.",
    "skillTag": "ortografia",
    "hint": "Haber",
    "showSentence": false
  },
  {
    "id": "l58",
    "level": 4,
    "title": "Modo verbal",
    "tip": "Subjuntivo.",
    "text": "Ojalá practiques más.",
    "options": [
      "Gerundio",
      "Indicativo",
      "Subjuntivo",
      "Imperativo"
    ],
    "answer": "Subjuntivo",
    "explanation": "¡Casi! Tras «ojalá» usamos subjuntivo: «practiques».",
    "skillTag": "verbo",
    "hint": "Ojalá",
    "showSentence": false
  },
  {
    "id": "l59",
    "level": 4,
    "title": "CC de causa",
    "tip": "¿Por qué?",
    "text": "Sonreímos porque entendimos la lección.",
    "options": [
      "Sonreímos",
      "la lección",
      "porque entendimos la lección",
      "entendimos"
    ],
    "answer": "porque entendimos la lección",
    "explanation": "¡Casi! Esa parte indica la causa del verbo principal.",
    "skillTag": "complemento",
    "hint": "¿Por qué sonreímos?",
    "showSentence": true
  },
  {
    "id": "l60",
    "level": 4,
    "title": "Sujeto oracional (infinitivo)",
    "tip": "Infinitivo como sujeto.",
    "text": "Conviene estudiar un poco cada día.",
    "options": [
      "Conviene",
      "un poco",
      "estudiar un poco cada día",
      "cada día"
    ],
    "answer": "estudiar un poco cada día",
    "explanation": "¡Casi! El infinitivo con sus complementos es el sujeto de «conviene».",
    "skillTag": "sujeto",
    "hint": "¿Qué conviene?",
    "showSentence": true
  },
  {
    "id": "l61",
    "level": 4,
    "title": "Pronombre de CD",
    "tip": "lo/la…",
    "text": "Vi la torre y la dibujé.",
    "options": [
      "y",
      "la (en «la dibujé»)",
      "Vi",
      "la torre solo"
    ],
    "answer": "la (en «la dibujé»)",
    "explanation": "¡Casi! «la» sustituye a «la torre» como CD en la segunda parte.",
    "skillTag": "complemento",
    "hint": "¿Qué dibujé?",
    "showSentence": true
  },
  {
    "id": "l62",
    "level": 4,
    "title": "Ortografía: sino / si no",
    "tip": "Contraste vs condición.",
    "text": "",
    "options": [
      "No es rojo sinó dorado",
      "No es rojo sino dorado",
      "No es rojo si-no dorado",
      "No es rojo si no dorado"
    ],
    "answer": "No es rojo sino dorado",
    "explanation": "¡Casi! «Sino» (junto) introduce contraste. «Si no» (separado) es condición.",
    "skillTag": "ortografia",
    "hint": "Contraste",
    "showSentence": false
  },
  {
    "id": "l63",
    "level": 4,
    "title": "Tipo condicional",
    "tip": "Si…",
    "text": "Si practicas, mejorarás.",
    "options": [
      "Imperativa pura",
      "Condicional",
      "Solo interrogativa",
      "Exclamativa"
    ],
    "answer": "Condicional",
    "explanation": "¡Casi! Tiene condición «si…»: oración condicional. ¡Causa-efecto mágico!",
    "skillTag": "tipo_oracion",
    "hint": "Si…",
    "showSentence": false
  },
  {
    "id": "l64",
    "level": 4,
    "title": "Núcleo del CD",
    "tip": "Sustantivo del objeto.",
    "text": "Abrimos grandes ventanas del salón.",
    "options": [
      "del salón",
      "ventanas",
      "grandes",
      "Abrimos"
    ],
    "answer": "ventanas",
    "explanation": "¡Casi! CD = grandes ventanas del salón; núcleo = ventanas.",
    "skillTag": "complemento",
    "hint": "¿Qué abrimos? núcleo",
    "showSentence": true
  },
  {
    "id": "l65",
    "level": 4,
    "title": "Adjetivo vs adverbio",
    "tip": "Rápido / rápidamente.",
    "text": "Corre rápidamente al patio.",
    "options": [
      "rápidamente (adverbio)",
      "Corre (adverbio)",
      "al patio (adverbio)",
      "rápido mal escrito"
    ],
    "answer": "rápidamente (adverbio)",
    "explanation": "¡Casi! «rápidamente» modifica al verbo → adverbio. ¡-mente suena a adverbio!",
    "skillTag": "lexico",
    "hint": "¿Cómo corre?",
    "showSentence": true
  },
  {
    "id": "l66",
    "level": 4,
    "title": "Concordancia de atributo",
    "tip": "Con ser.",
    "text": "Las normas son claras.",
    "options": [
      "clara",
      "claro",
      "claros",
      "claras"
    ],
    "answer": "claras",
    "explanation": "¡Casi! Atributo en femenino plural como «normas»: «claras».",
    "skillTag": "concordancia",
    "hint": "Femenino plural",
    "showSentence": false
  },
  {
    "id": "l67",
    "level": 4,
    "title": "Ortografía: por qué pregunta",
    "tip": "",
    "text": "",
    "options": [
      "No sé porque fallé",
      "No sé por qué fallé",
      "No sé el porque fallé",
      "No sé porqué fallé (sin el)"
    ],
    "answer": "No sé por qué fallé",
    "explanation": "¡Casi! En interrogativa indirecta también «por qué» separado. «No sé por qué…».",
    "skillTag": "ortografia",
    "hint": "por qué",
    "showSentence": false
  },
  {
    "id": "l68",
    "level": 4,
    "title": "Predicado con dos verbos",
    "tip": "Coordinados.",
    "text": "Entramos y saludamos a todos.",
    "options": [
      "Entramos y saludamos a todos",
      "Entramos solo es predicado",
      "a todos",
      "y"
    ],
    "answer": "Entramos y saludamos a todos",
    "explanation": "¡Casi! Hay dos verbos coordinados que forman el predicado del sujeto omitido nosotros/as.",
    "skillTag": "predicado",
    "hint": "Dos acciones",
    "showSentence": true
  },
  {
    "id": "l69",
    "level": 4,
    "title": "Complemento de compañía",
    "tip": "¿Con quién?",
    "text": "Voy con mi familiar al patio.",
    "options": [
      "con mi familiar",
      "al patio",
      "mi familiar sin con",
      "Voy"
    ],
    "answer": "con mi familiar",
    "explanation": "¡Casi! «con mi familiar» = CC de compañía. «al patio» es de lugar.",
    "skillTag": "complemento",
    "hint": "¿Con quién?",
    "showSentence": true
  },
  {
    "id": "l70",
    "level": 4,
    "title": "Sujeto",
    "tip": "Pasiva.",
    "text": "Fueron resueltos todos los acertijos.",
    "options": [
      "resueltos",
      "Fueron",
      "Fueron resueltos",
      "todos los acertijos"
    ],
    "answer": "todos los acertijos",
    "explanation": "¡Casi! En pasiva, el sujeto es «todos los acertijos».",
    "skillTag": "sujeto",
    "hint": "¿Qué fue resuelto?",
    "showSentence": true
  },
  {
    "id": "l71",
    "level": 4,
    "title": "Verbo auxiliar",
    "tip": "Haber / ser / estar.",
    "text": "Habían preparado el aula.",
    "options": [
      "Habían preparado",
      "preparado solo",
      "Habían",
      "el aula"
    ],
    "answer": "Habían preparado",
    "explanation": "¡Casi! Pretérito pluscuamperfecto: auxiliar «habían» + participio.",
    "skillTag": "verbo",
    "hint": "Forma compuesta",
    "showSentence": true
  },
  {
    "id": "l72",
    "level": 4,
    "title": "Ortografía: mayúscula tras :",
    "tip": "Según norma escolar simple.",
    "text": "",
    "options": [
      "consejo: practica",
      "Consejo practica:",
      "Consejo: Practica cada día (también válido en títulos)",
      "Consejo: practica cada día"
    ],
    "answer": "Consejo: practica cada día",
    "explanation": "¡Casi! Tras dos puntos, en enumeraciones o consejos suele seguir minúscula si no es nombre propio. ¡Detalle fino!",
    "skillTag": "ortografia",
    "hint": "Después de :",
    "showSentence": false
  },
  {
    "id": "l73",
    "level": 4,
    "title": "Análisis predicado",
    "tip": "",
    "text": "Nunca olvidaremos este verano.",
    "options": [
      "este verano solo",
      "Nunca",
      "Nunca olvidaremos este verano",
      "Nunca olvidaremos"
    ],
    "answer": "Nunca olvidaremos este verano",
    "explanation": "¡Casi! Sujeto omitido nosotros/as; predicado completo con CC «Nunca» + CD «este verano».",
    "skillTag": "predicado",
    "hint": "Todo excepto sujeto",
    "showSentence": true
  },
  {
    "id": "l74",
    "level": 4,
    "title": "Tipo desiderativa",
    "tip": "Deseo.",
    "text": "Que tengas muy buena suerte.",
    "options": [
      "Enunciativa neutra",
      "Desiderativa",
      "Interrogativa",
      "Imperativa dura"
    ],
    "answer": "Desiderativa",
    "explanation": "¡Casi! Expresa un deseo para otra persona: desiderativa. ¡Buenos deseos!",
    "skillTag": "tipo_oracion",
    "hint": "Que tengas…",
    "showSentence": false
  },
  {
    "id": "l75",
    "level": 4,
    "title": "Ortografía: porqué sustantivo",
    "tip": "",
    "text": "",
    "options": [
      "Me contó el porqué de su risa",
      "Me contó el porque de su risa",
      "Me contó el por qué de su risa",
      "Me contó el por-que"
    ],
    "answer": "Me contó el porqué de su risa",
    "explanation": "¡Casi! «El porqué» = la razón. Una palabra, con tilde.",
    "skillTag": "ortografia",
    "hint": "el porqué",
    "showSentence": false
  },
  {
    "id": "l76",
    "level": 4,
    "title": "CD",
    "tip": "Persona con a.",
    "text": "Saludamos a la directora.",
    "options": [
      "a",
      "a la directora",
      "la directora sin a",
      "Saludamos"
    ],
    "answer": "a la directora",
    "explanation": "¡Casi! CD de persona suele llevar «a»: a la directora. ¡«a» personal!",
    "skillTag": "complemento",
    "hint": "¿A quién saludamos?",
    "showSentence": true
  },
  {
    "id": "l77",
    "level": 4,
    "title": "Lexico: preposición",
    "tip": "Relaciona palabras.",
    "text": "El libro de magia está sobre la mesa.",
    "options": [
      "magia",
      "de / sobre",
      "El libro",
      "está"
    ],
    "answer": "de / sobre",
    "explanation": "¡Casi! «de» y «sobre» son preposiciones: unen y marcan relación. ¡Pegamento del idioma!",
    "skillTag": "lexico",
    "hint": "Palabritas de relación",
    "showSentence": true
  },
  {
    "id": "l78",
    "level": 4,
    "title": "Concordancia",
    "tip": "Con «usted».",
    "text": "Usted ___ muy amable.",
    "options": [
      "sois",
      "eres",
      "es",
      "somos"
    ],
    "answer": "es",
    "explanation": "¡Casi! «Usted» se trata en 3.ª persona: «es». ¡Cortesía gramatical!",
    "skillTag": "concordancia",
    "hint": "Usted = 3ª",
    "showSentence": false
  },
  {
    "id": "l79",
    "level": 4,
    "title": "Predicado",
    "tip": "",
    "text": "Con alegría resolvió el enigma.",
    "options": [
      "Con alegría resolvió el enigma — elige el núcleo verbal + CD",
      "el enigma",
      "resolvió el enigma",
      "Con alegría (solo)"
    ],
    "answer": "resolvió el enigma",
    "explanation": "¡Casi! Núcleo verbal + CD: «resolvió el enigma». «Con alegría» es CC de modo aparte, pero el predicado verbal central es ese; si te pidieran todo el predicado incluiría el CC. Aquí marcamos verbo+CD.",
    "skillTag": "predicado",
    "hint": "Verbo + qué",
    "showSentence": true
  },
  {
    "id": "l80",
    "level": 5,
    "title": "Sujeto extenso",
    "tip": "Máxima precisión.",
    "text": "Cada una de las aprendices del turno de tarde prepara su varita.",
    "options": [
      "prepara su varita",
      "Cada una",
      "del turno de tarde",
      "Cada una de las aprendices del turno de tarde"
    ],
    "answer": "Cada una de las aprendices del turno de tarde",
    "explanation": "¡Casi! El sujeto incluye todo el grupo: «Cada una de las aprendices del turno de tarde».",
    "skillTag": "sujeto",
    "hint": "Grupo entero",
    "showSentence": true
  },
  {
    "id": "l81",
    "level": 5,
    "title": "Análisis CD/CI",
    "tip": "",
    "text": "La esfinge contó un secreto a Liz.",
    "options": [
      "La esfinge = CD",
      "un secreto = CD; a Liz = CI",
      "a Liz = CD",
      "un secreto = CI"
    ],
    "answer": "un secreto = CD; a Liz = CI",
    "explanation": "¡Casi! ¿Qué contó? un secreto (CD). ¿A quién? a Liz (CI).",
    "skillTag": "complemento",
    "hint": "¿Qué? ¿A quién?",
    "showSentence": true
  },
  {
    "id": "l82",
    "level": 5,
    "title": "Perífrasis de obligación",
    "tip": "Tener que / hay que / deber.",
    "text": "Hay que repasar las fracciones.",
    "options": [
      "repasar",
      "Hay",
      "Hay que repasar",
      "las fracciones"
    ],
    "answer": "Hay que repasar",
    "explanation": "¡Casi! «Hay que repasar» expresa obligación impersonal. ¡Deber mágico de practicar!",
    "skillTag": "verbo",
    "hint": "Obligación",
    "showSentence": true
  },
  {
    "id": "l83",
    "level": 5,
    "title": "Ortografía avanzada",
    "tip": "Porqué / porque / por qué / por que.",
    "text": "",
    "options": [
      "Ignoro el porqué, pero practicaré porque quiero y sé por qué me cuesta",
      "Ignoro el por qué (sustantivo mal)",
      "Todo con porque junto",
      "Ignoro el porque, pero…"
    ],
    "answer": "Ignoro el porqué, pero practicaré porque quiero y sé por qué me cuesta",
    "explanation": "¡Casi! «el porqué» (razón), «porque» (causa), «por qué» (pregunta). ¡Trío maestro!",
    "skillTag": "ortografia",
    "hint": "Tres formas",
    "showSentence": false
  },
  {
    "id": "l84",
    "level": 5,
    "title": "Oración subordinada (reconocer)",
    "tip": "La que completa.",
    "text": "Creo que el hechizo funcionará.",
    "options": [
      "el hechizo",
      "que el hechizo funcionará",
      "funcionará solo",
      "Creo"
    ],
    "answer": "que el hechizo funcionará",
    "explanation": "¡Casi! «que el hechizo funcionará» es una subordinada que completa a «Creo». ¡Oración dentro de oración!",
    "skillTag": "sintaxis",
    "hint": "Después de «que»",
    "showSentence": true
  },
  {
    "id": "l85",
    "level": 5,
    "title": "Estilo: voz pasiva",
    "tip": "Ser + participio.",
    "text": "El examen fue corregido ayer.",
    "options": [
      "ayer",
      "El examen",
      "corregido solo",
      "fue corregido"
    ],
    "answer": "fue corregido",
    "explanation": "¡Casi! «fue corregido» es la forma de pasiva (ser + participio).",
    "skillTag": "verbo",
    "hint": "Ser + participio",
    "showSentence": true
  },
  {
    "id": "l86",
    "level": 5,
    "title": "CC de finalidad",
    "tip": "¿Para qué?",
    "text": "Estudiamos para aprender mejor.",
    "options": [
      "mejor",
      "Estudiamos",
      "para aprender mejor",
      "aprender"
    ],
    "answer": "para aprender mejor",
    "explanation": "¡Casi! «para aprender mejor» indica finalidad. ¡Meta del estudio!",
    "skillTag": "complemento",
    "hint": "¿Para qué?",
    "showSentence": true
  },
  {
    "id": "l87",
    "level": 5,
    "title": "Concordancia en pasiva",
    "tip": "Participio.",
    "text": "Las puertas fueron ___.",
    "options": [
      "abierta",
      "abiertos",
      "abiertas",
      "abierto"
    ],
    "answer": "abiertas",
    "explanation": "¡Casi! Participio en femenino plural: «abiertas», como «puertas».",
    "skillTag": "concordancia",
    "hint": "Femenino plural",
    "showSentence": false
  },
  {
    "id": "l88",
    "level": 5,
    "title": "Tipo exclamativa retórica",
    "tip": "Emoción + matiz.",
    "text": "¡Cuánta magia hay en una suma bien hecha!",
    "options": [
      "Exclamativa",
      "Interrogativa real",
      "Condicional",
      "Imperativa"
    ],
    "answer": "Exclamativa",
    "explanation": "¡Casi! Aunque parece pregunta de cantidad, los ¡! marcan exclamativa. ¡Asombro matemágico!",
    "skillTag": "tipo_oracion",
    "hint": "¡!",
    "showSentence": false
  },
  {
    "id": "l89",
    "level": 5,
    "title": "Núcleo del atributo",
    "tip": "",
    "text": "Esa idea es increíblemente buena.",
    "options": [
      "increíblemente",
      "idea",
      "es",
      "buena"
    ],
    "answer": "buena",
    "explanation": "¡Casi! Atributo «increíblemente buena»; núcleo del atributo = «buena». «increíblemente» es adverbio.",
    "skillTag": "complemento",
    "hint": "Adjetivo principal",
    "showSentence": true
  },
  {
    "id": "l90",
    "level": 5,
    "title": "Ortografía: por que (relativo)",
    "tip": "El motivo por que…",
    "text": "",
    "options": [
      "Este es el motivo por-que",
      "Este es el motivo porque luchamos",
      "Este es el motivo porqué luchamos",
      "Este es el motivo por que luchamos"
    ],
    "answer": "Este es el motivo por que luchamos",
    "explanation": "¡Casi! «por que» = por el cual (relativo). Menos frecuente, pero correcto. ¡Nivel pro!",
    "skillTag": "ortografia",
    "hint": "por + que relativo",
    "showSentence": false
  },
  {
    "id": "l91",
    "level": 5,
    "title": "Sujeto omitido",
    "tip": "Persona verbal.",
    "text": "Seguiréis aprendiendo sin dudar.",
    "options": [
      "aprendiendo",
      "vosotros/as (omitido)",
      "Seguiréis",
      "sin dudar"
    ],
    "answer": "vosotros/as (omitido)",
    "explanation": "¡Casi! «Seguiréis» marca 2.ª persona plural: sujeto vosotros/as omitido.",
    "skillTag": "sujeto",
    "hint": "Terminación -éis",
    "showSentence": true
  },
  {
    "id": "l92",
    "level": 5,
    "title": "Complementos múltiples",
    "tip": "Orden lógico.",
    "text": "Ayer di el regalo a mi amiga en el patio.",
    "options": [
      "Solo hay CD",
      "Ayer=tiempo; el regalo=CD; a mi amiga=CI; en el patio=lugar",
      "Todo es sujeto",
      "Solo hay CI"
    ],
    "answer": "Ayer=tiempo; el regalo=CD; a mi amiga=CI; en el patio=lugar",
    "explanation": "¡Casi! Varios complementos en una sola oración. ¡Mapa completo de funciones!",
    "skillTag": "complemento",
    "hint": "¿Cuándo? ¿Qué? ¿A quién? ¿Dónde?",
    "showSentence": true
  },
  {
    "id": "l93",
    "level": 5,
    "title": "Lexico: conjunción",
    "tip": "Une oraciones.",
    "text": "Practico y después descanso.",
    "options": [
      "después solo como verbo",
      "y / después (después también adv.)",
      "Practico",
      "descanso"
    ],
    "answer": "y / después (después también adv.)",
    "explanation": "¡Casi! «y» es conjunción coordinante. «después» aquí funciona como adverbio de tiempo.",
    "skillTag": "lexico",
    "hint": "Palabra de unión",
    "showSentence": true
  },
  {
    "id": "l94",
    "level": 5,
    "title": "Predicado",
    "tip": "Pasiva refleja.",
    "text": "Se abrieron las ventanas al amanecer.",
    "options": [
      "Se abrieron al amanecer (con sujeto «las ventanas»)",
      "Se",
      "al amanecer es sujeto",
      "Se abrieron las ventanas al amanecer es todo sujeto"
    ],
    "answer": "Se abrieron al amanecer (con sujeto «las ventanas»)",
    "explanation": "¡Casi! Sujeto «las ventanas»; predicado «Se abrieron al amanecer». Pasiva refleja con «se».",
    "skillTag": "predicado",
    "hint": "¿Qué se abrió?",
    "showSentence": true
  },
  {
    "id": "l95",
    "level": 5,
    "title": "Ortografía: por qué / porque mix",
    "tip": "",
    "text": "",
    "options": [
      "Porque lo haces porque me gusta",
      "¿Por qué lo haces? Lo hago por qué me gusta",
      "¿Porque lo haces? Lo hago por qué me gusta",
      "¿Por qué lo haces? Lo hago porque me gusta"
    ],
    "answer": "¿Por qué lo haces? Lo hago porque me gusta",
    "explanation": "¡Casi! Pregunta con «por qué»; respuesta con «porque». ¡Perfecto dúo!",
    "skillTag": "ortografia",
    "hint": "Pregunta / causa",
    "showSentence": false
  },
  {
    "id": "l96",
    "level": 5,
    "title": "Verbo en condicional",
    "tip": "-ría.",
    "text": "Me gustaría viajar a una isla mágica.",
    "options": [
      "viajar",
      "isla",
      "Me",
      "gustaría"
    ],
    "answer": "gustaría",
    "explanation": "¡Casi! «gustaría» está en condicional (deseo educado). ¡Modo cortés!",
    "skillTag": "verbo",
    "hint": "-ría",
    "showSentence": true
  },
  {
    "id": "l97",
    "level": 5,
    "title": "Sujeto",
    "tip": "Con cuantificador.",
    "text": "Ninguno de los mapas estaba roto.",
    "options": [
      "Ninguno de los mapas",
      "estaba roto",
      "de los mapas",
      "Ninguno"
    ],
    "answer": "Ninguno de los mapas",
    "explanation": "¡Casi! El sujeto es «Ninguno de los mapas» (cuantificador + grupo).",
    "skillTag": "sujeto",
    "hint": "Grupo con ninguno",
    "showSentence": true
  },
  {
    "id": "l98",
    "level": 5,
    "title": "Tipo exhortativa formal",
    "tip": "",
    "text": "Mantengamos el aula en orden.",
    "options": [
      "Exclamativa",
      "Exhortativa",
      "Interrogativa",
      "Solo condicional"
    ],
    "answer": "Exhortativa",
    "explanation": "¡Casi! Primera persona plural de ruego/ánimo: exhortativa. ¡Equipo unido!",
    "skillTag": "tipo_oracion",
    "hint": "Mantengamos",
    "showSentence": false
  },
  {
    "id": "l99",
    "level": 5,
    "title": "Análisis fino CD",
    "tip": "",
    "text": "No lo entendí al principio.",
    "options": [
      "No",
      "entendí",
      "al principio",
      "lo"
    ],
    "answer": "lo",
    "explanation": "¡Casi! «lo» es CD pronominal. «al principio» es CC de tiempo.",
    "skillTag": "complemento",
    "hint": "¿Qué no entendí?",
    "showSentence": true
  },
  {
    "id": "l100",
    "level": 5,
    "title": "Ortografía: sino",
    "tip": "",
    "text": "",
    "options": [
      "No quiero oro sino sabiduría",
      "No quiero oro sinó sabiduría",
      "No quiero oro si-no sabiduría",
      "No quiero oro si no sabiduría"
    ],
    "answer": "No quiero oro sino sabiduría",
    "explanation": "¡Casi! Contraste: «sino» junto. ¡Elegancia ortográfica!",
    "skillTag": "ortografia",
    "hint": "Contraste",
    "showSentence": false
  },
  {
    "id": "l101",
    "level": 5,
    "title": "Predicado nominal",
    "tip": "",
    "text": "Vuestra amistad es un tesoro.",
    "options": [
      "es",
      "es un tesoro",
      "un tesoro solo",
      "Vuestra amistad"
    ],
    "answer": "es un tesoro",
    "explanation": "¡Casi! «es un tesoro» = predicado nominal (ser + atributo).",
    "skillTag": "predicado",
    "hint": "Ser + …",
    "showSentence": true
  },
  {
    "id": "l102",
    "level": 5,
    "title": "CC de instrumento",
    "tip": "¿Con qué?",
    "text": "Cortó el hilo con unas tijeras mágicas.",
    "options": [
      "el hilo",
      "Cortó",
      "unas tijeras sin con",
      "con unas tijeras mágicas"
    ],
    "answer": "con unas tijeras mágicas",
    "explanation": "¡Casi! Instrumento: «con unas tijeras mágicas». CD: el hilo.",
    "skillTag": "complemento",
    "hint": "¿Con qué cortó?",
    "showSentence": true
  },
  {
    "id": "l103",
    "level": 5,
    "title": "Concordancia difícil",
    "tip": "Uno de los que…",
    "text": "Una de las que más estudian es Maya.",
    "options": [
      "estudian (plural por «las que»)",
      "estudia",
      "estudiamos",
      "estudiáis"
    ],
    "answer": "estudian (plural por «las que»)",
    "explanation": "¡Casi! En «una de las que estudian», el verbo de la relativa va en plural. ¡Nivel élite!",
    "skillTag": "concordancia",
    "hint": "las que…",
    "showSentence": false
  },
  {
    "id": "l104",
    "level": 5,
    "title": "Lexico: interjección",
    "tip": "Emoción suelta.",
    "text": "¡Hola! Bienvenida a la clase.",
    "options": [
      "¡Hola!",
      "a la clase",
      "Bienvenida a la clase",
      "Bienvenida"
    ],
    "answer": "¡Hola!",
    "explanation": "¡Casi! «¡Hola!» es interjección: emoción o saludo suelto. ¡Primer hechizo social!",
    "skillTag": "lexico",
    "hint": "Saludo",
    "showSentence": false
  },
  {
    "id": "l105",
    "level": 5,
    "title": "Sujeto y predicado finales",
    "tip": "",
    "text": "Tras el examen, brillaron sus sonrisas.",
    "options": [
      "sus sonrisas = sujeto; brillaron = núcleo del predicado",
      "Tras el examen = sujeto",
      "sus sonrisas = predicado",
      "brillaron = sujeto"
    ],
    "answer": "sus sonrisas = sujeto; brillaron = núcleo del predicado",
    "explanation": "¡Casi! Aunque el orden es invertido, el sujeto es «sus sonrisas». «Tras el examen» es CC de tiempo.",
    "skillTag": "sujeto",
    "hint": "¿Qué brilló?",
    "showSentence": true
  },
  {
    "id": "l106",
    "level": 3,
    "title": "¿Cuál es el sujeto completo?",
    "tip": "Incluye todos los modificadores.",
    "text": "El pequeño dragón de escamas verdes duerme.",
    "options": [
      "El pequeño dragón de escamas verdes",
      "duerme",
      "de escamas verdes",
      "El pequeño"
    ],
    "answer": "El pequeño dragón de escamas verdes",
    "explanation": "¡Casi! El sujeto es todo el grupo: «El pequeño dragón de escamas verdes». No te quedes solo con «dragón»: adjetivos y complementos van con él. El predicado es «duerme».",
    "skillTag": "sujeto",
    "hint": "Grupo completo antes del verbo",
    "showSentence": true
  },
  {
    "id": "l107",
    "level": 3,
    "title": "¿Núcleo del sujeto?",
    "tip": "El sustantivo principal del sujeto.",
    "text": "Las antiguas páginas del libro brillan.",
    "options": [
      "páginas",
      "Las antiguas",
      "del libro",
      "brillan"
    ],
    "answer": "páginas",
    "explanation": "¡Casi! El núcleo del sujeto es «páginas». «Antiguas» y «del libro» lo acompañan, pero el sustantivo central es páginas. ¡Núcleo hallado!",
    "skillTag": "sujeto",
    "hint": "Sustantivo clave",
    "showSentence": true
  },
  {
    "id": "l108",
    "level": 3,
    "title": "¿Cuál es el predicado?",
    "tip": "Todo lo que se dice del sujeto.",
    "text": "Sin miedo, la aprendiz cruza el puente.",
    "options": [
      "cruza el puente",
      "Sin miedo, la aprendiz",
      "la aprendiz",
      "Sin miedo"
    ],
    "answer": "cruza el puente",
    "explanation": "¡Casi! El sujeto es «la aprendiz». «Sin miedo» es un complemento de modo. El predicado verbal central es «cruza el puente» (verbo + complemento).",
    "skillTag": "predicado",
    "hint": "¿Qué hace la aprendiz?",
    "showSentence": true
  },
  {
    "id": "l109",
    "level": 3,
    "title": "¿Cuál es el verbo (núcleo del predicado)?",
    "tip": "La palabra de acción principal.",
    "text": "El guardián protege la torre antigua.",
    "options": [
      "protege",
      "El guardián",
      "la torre antigua",
      "antigua"
    ],
    "answer": "protege",
    "explanation": "¡Casi! El verbo «protege» es el núcleo del predicado: es la acción. «la torre antigua» es el complemento directo (¿qué protege?).",
    "skillTag": "verbo",
    "hint": "Acción principal",
    "showSentence": true
  },
  {
    "id": "l110",
    "level": 3,
    "title": "Identifica el atributo",
    "tip": "Con ser, estar o parecer.",
    "text": "Esa runa parece antigua.",
    "options": [
      "antigua",
      "Esa runa",
      "parece",
      "runa"
    ],
    "answer": "antigua",
    "explanation": "¡Casi! Con verbos como parecer/ser/estar, lo que califica al sujeto es el atributo. Aquí «antigua» dice cómo parece la runa. ¡Atributo al descubierto!",
    "skillTag": "complemento",
    "hint": "¿Cómo parece la runa?",
    "showSentence": true
  },
  {
    "id": "l111",
    "level": 3,
    "title": "Complemento de lugar",
    "tip": "¿Dónde ocurre la acción?",
    "text": "Guardamos el libro en el baúl.",
    "options": [
      "en el baúl",
      "Guardamos",
      "el libro",
      "Guardamos el libro"
    ],
    "answer": "en el baúl",
    "explanation": "¡Casi! «en el baúl» responde a ¿dónde? → complemento circunstancial de lugar. «el libro» es el complemento directo (¿qué guardamos?).",
    "skillTag": "complemento",
    "hint": "¿Dónde?",
    "showSentence": true
  },
  {
    "id": "l112",
    "level": 3,
    "title": "Complemento directo",
    "tip": "¿Qué + verbo?",
    "text": "Liz lee un pergamino antiguo.",
    "options": [
      "un pergamino antiguo",
      "Liz",
      "lee",
      "antiguo solo"
    ],
    "answer": "un pergamino antiguo",
    "explanation": "¡Casi! Pregunta: ¿qué lee Liz? → «un pergamino antiguo». Ese es el complemento directo. El sujeto es Liz.",
    "skillTag": "complemento",
    "hint": "¿Qué lee?",
    "showSentence": true
  },
  {
    "id": "l113",
    "level": 3,
    "title": "Complemento indirecto",
    "tip": "¿A quién?",
    "text": "Liz regala un libro a Maya.",
    "options": [
      "a Maya",
      "un libro",
      "Liz",
      "regala"
    ],
    "answer": "a Maya",
    "explanation": "¡Casi! ¿Qué regala? un libro (CD). ¿A quién? a Maya (CI). El «a» delante de persona suele marcar el complemento indirecto.",
    "skillTag": "complemento",
    "hint": "¿A quién regala el libro?",
    "showSentence": true
  },
  {
    "id": "l114",
    "level": 3,
    "title": "Tipo de oración: deseo",
    "tip": "Palabras como ojalá.",
    "text": "Ojalá salga bien el hechizo.",
    "options": [
      "Desiderativa (deseo)",
      "Interrogativa",
      "Imperativa",
      "Enunciativa neutra"
    ],
    "answer": "Desiderativa (deseo)",
    "explanation": "¡Casi! «Ojalá» expresa un deseo → oración desiderativa. No pregunta ni ordena: desea. ¡Magia de los deseos!",
    "skillTag": "tipo_oracion",
    "hint": "Ojalá…",
    "showSentence": false
  },
  {
    "id": "l115",
    "level": 3,
    "title": "Tipo de oración: duda",
    "tip": "Quizá, tal vez…",
    "text": "Quizá llueva magia esta noche.",
    "options": [
      "Dubitativa",
      "Imperativa",
      "Exclamativa",
      "Interrogativa directa"
    ],
    "answer": "Dubitativa",
    "explanation": "¡Casi! «Quizá» marca duda o posibilidad → dubitativa. ¡Incertidumbre mágica bien nombrada!",
    "skillTag": "tipo_oracion",
    "hint": "Quizá",
    "showSentence": false
  },
  {
    "id": "l116",
    "level": 3,
    "title": "Ortografía: por qué / porque",
    "tip": "Pregunta frente a respuesta.",
    "text": "",
    "options": [
      "¿Por qué brilla? Porque es mágica.",
      "¿Porque brilla? Por que es mágica.",
      "¿Por que brilla? Porqué es mágica.",
      "Porqué brilla porque es mágica."
    ],
    "answer": "¿Por qué brilla? Porque es mágica.",
    "explanation": "¡Casi! En la pregunta escribimos «por qué» (separado). En la respuesta causal, «porque» (junto). ¡Dúo clásico de la ortografía!",
    "skillTag": "ortografia",
    "hint": "Pregunta vs causa",
    "showSentence": false
  },
  {
    "id": "l117",
    "level": 3,
    "title": "Ortografía: tú / tu",
    "tip": "Pronombre frente a posesivo.",
    "text": "",
    "options": [
      "Tú lees tu libro",
      "Tu lees tú libro",
      "Tú lees tú libro",
      "Tu lees tu libro"
    ],
    "answer": "Tú lees tu libro",
    "explanation": "¡Casi! «Tú» (pronombre, quien hace la acción) lleva tilde. «tu» (posesivo: tu libro) no lleva tilde. ¡Tilde diacrítica!",
    "skillTag": "ortografia",
    "hint": "Pronombre vs posesivo",
    "showSentence": false
  },
  {
    "id": "l118",
    "level": 3,
    "title": "Concordancia: sujeto múltiple",
    "tip": "Varias cosas unidas por «y».",
    "text": "El mapa y la brújula ___ sobre la mesa.",
    "options": [
      "están",
      "está",
      "es",
      "soy"
    ],
    "answer": "están",
    "explanation": "¡Casi! «El mapa y la brújula» son dos cosas → plural. Por eso el verbo es «están», no «está». ¡Suma de sujetos!",
    "skillTag": "concordancia",
    "hint": "Mapa + brújula",
    "showSentence": false
  },
  {
    "id": "l119",
    "level": 3,
    "title": "Concordancia de género",
    "tip": "El adjetivo copia al sustantivo.",
    "text": "Las normas son ___.",
    "options": [
      "claras",
      "claro",
      "claros",
      "clara"
    ],
    "answer": "claras",
    "explanation": "¡Casi! «Normas» es femenino plural, así que el atributo va en femenino plural: «claras». ¡Acuerdo perfecto!",
    "skillTag": "concordancia",
    "hint": "Femenino plural",
    "showSentence": false
  },
  {
    "id": "l120",
    "level": 3,
    "title": "¿Verbo impersonal?",
    "tip": "Haber / hacer tiempo.",
    "text": "Hay estrellas en el techo pintado.",
    "options": [
      "Hay",
      "estrellas",
      "en el techo pintado",
      "techo"
    ],
    "answer": "Hay",
    "explanation": "¡Casi! «Hay» (del verbo haber) es impersonal: no tiene un sujeto personal claro. Presenta la existencia de algo. ¡Magia gramatical!",
    "skillTag": "verbo",
    "hint": "Forma de haber",
    "showSentence": true
  },
  {
    "id": "l121",
    "level": 3,
    "title": "Perífrasis verbal",
    "tip": "Dos formas, un significado.",
    "text": "Debemos terminar el ejercicio.",
    "options": [
      "Debemos terminar",
      "el ejercicio",
      "Debemos solo",
      "terminar solo"
    ],
    "answer": "Debemos terminar",
    "explanation": "¡Casi! «Debemos terminar» es una perífrasis: dos formas verbales con un solo sentido (obligación). El CD es «el ejercicio».",
    "skillTag": "verbo",
    "hint": "Dos formas, una idea",
    "showSentence": true
  },
  {
    "id": "l122",
    "level": 3,
    "title": "Clase de palabra: adjetivo",
    "tip": "Califica al nombre.",
    "text": "Una torre alta vigila el valle.",
    "options": [
      "alta",
      "torre",
      "vigila",
      "valle"
    ],
    "answer": "alta",
    "explanation": "¡Casi! «alta» es un adjetivo: dice cómo es la torre. «vigila» es el verbo. ¡Calificativo listo!",
    "skillTag": "lexico",
    "hint": "¿Cómo es la torre?",
    "showSentence": true
  },
  {
    "id": "l123",
    "level": 3,
    "title": "Clase de palabra: adverbio",
    "tip": "Modifica al verbo.",
    "text": "Llegamos temprano a la clase.",
    "options": [
      "temprano",
      "Llegamos",
      "a la clase",
      "clase"
    ],
    "answer": "temprano",
    "explanation": "¡Casi! «temprano» es un adverbio de tiempo: responde a ¿cuándo llegamos? No describe un nombre, sino la acción.",
    "skillTag": "lexico",
    "hint": "¿Cuándo llegamos?",
    "showSentence": true
  },
  {
    "id": "l124",
    "level": 3,
    "title": "Sujeto en voz pasiva",
    "tip": "Quién recibe la acción.",
    "text": "El pergamino fue firmado por la decana.",
    "options": [
      "El pergamino",
      "fue firmado por la decana",
      "la decana",
      "fue firmado"
    ],
    "answer": "El pergamino",
    "explanation": "¡Casi! En pasiva, el sujeto es quien recibe la acción: «El pergamino». «por la decana» es el complemento agente (quién firmó).",
    "skillTag": "sujeto",
    "hint": "¿Qué fue firmado?",
    "showSentence": true
  },
  {
    "id": "l125",
    "level": 3,
    "title": "Complemento agente",
    "tip": "Por + quien hace (pasiva).",
    "text": "La puerta fue abierta por el guardián.",
    "options": [
      "por el guardián",
      "La puerta",
      "fue abierta",
      "el guardián sin por"
    ],
    "answer": "por el guardián",
    "explanation": "¡Casi! En la pasiva, «por el guardián» es el complemento agente: nos dice quién realizó la acción. El sujeto es «La puerta».",
    "skillTag": "complemento",
    "hint": "¿Por quién?",
    "showSentence": true
  },
  {
    "id": "l126",
    "level": 3,
    "title": "Complemento de modo",
    "tip": "¿Cómo?",
    "text": "Resuelve el problema con calma.",
    "options": [
      "con calma",
      "Resuelve",
      "el problema",
      "Resuelve el problema"
    ],
    "answer": "con calma",
    "explanation": "¡Casi! «con calma» responde a ¿cómo? → complemento circunstancial de modo. ¡Estilo de maga paciente!",
    "skillTag": "complemento",
    "hint": "¿Cómo resuelve?",
    "showSentence": true
  },
  {
    "id": "l127",
    "level": 3,
    "title": "Ortografía: haya / halla / aya",
    "tip": "Homófonos tramposos.",
    "text": "",
    "options": [
      "Espero que haya magia",
      "Espero que halla magia",
      "Espero que aya magia",
      "Espero que ha ya magia"
    ],
    "answer": "Espero que haya magia",
    "explanation": "¡Casi! «Haya» es forma de haber (subjuntivo). «Halla» significa encuentra. «Aya» es una niñera. Aquí necesitamos haber → haya.",
    "skillTag": "ortografia",
    "hint": "Verbo haber",
    "showSentence": false
  },
  {
    "id": "l128",
    "level": 3,
    "title": "Ortografía: gue / güe",
    "tip": "La diéresis avisa.",
    "text": "",
    "options": [
      "La cigüeña vuela",
      "La cigueña vuela",
      "La cigüeña buela",
      "La sigüeña vuela"
    ],
    "answer": "La cigüeña vuela",
    "explanation": "¡Casi! En «cigüeña» la diéresis (ü) hace que suene la u. Sin diéresis, la u no se oiría. ¡Detalle de pro!",
    "skillTag": "ortografia",
    "hint": "Diéresis ü",
    "showSentence": false
  },
  {
    "id": "l129",
    "level": 3,
    "title": "Separa sujeto y predicado",
    "tip": "Marca el predicado completo.",
    "text": "Tus ideas iluminan la clase entera.",
    "options": [
      "iluminan la clase entera",
      "Tus ideas",
      "la clase entera",
      "iluminan"
    ],
    "answer": "iluminan la clase entera",
    "explanation": "¡Casi! Sujeto = «Tus ideas». Predicado = «iluminan la clase entera» (verbo + complementos). ¡No te dejes solo el verbo!",
    "skillTag": "predicado",
    "hint": "¿Qué hacen las ideas?",
    "showSentence": true
  },
  {
    "id": "l130",
    "level": 3,
    "title": "Concordancia con «se»",
    "tip": "Mira el número del nombre.",
    "text": "Se venden grimorios antiguos.",
    "options": [
      "venden (plural)",
      "vende",
      "vendemos",
      "vendéis"
    ],
    "answer": "venden (plural)",
    "explanation": "¡Casi! En «se venden grimorios», el verbo va en plural porque «grimorios» es plural. Es una pasiva refleja. ¡Ojo al número!",
    "skillTag": "concordancia",
    "hint": "Grimorios = plural",
    "showSentence": false
  },
  {
    "id": "l131",
    "level": 3,
    "title": "Pronombre de CD",
    "tip": "lo / la / los / las.",
    "text": "Lo guardé en el cajón.",
    "options": [
      "Lo",
      "guardé",
      "en el cajón",
      "Yo (omitido)"
    ],
    "answer": "Lo",
    "explanation": "¡Casi! «Lo» es el complemento directo en forma de pronombre (¿qué guardé? → lo). «en el cajón» es de lugar. El sujeto «yo» está omitido.",
    "skillTag": "complemento",
    "hint": "¿Qué guardé?",
    "showSentence": true
  }
];
