import { o as __toESM } from "../_runtime.mjs";
import { N as require_react, g as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as ArrowLeft, C as Dumbbell, D as Check, E as CircleCheck, O as BookOpen, S as FileDown, T as CircleHelp, _ as Lock, a as Trophy, b as Gift, c as Target, d as Sparkles, f as Scroll, g as Map$1, h as Moon, i as User, k as BookMarked, l as Swords, m as Play, n as X, p as RotateCcw, r as WandSparkles, s as ThumbsUp, t as Zap, u as Star, v as Languages, w as CircleX, x as Flame, y as House } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-ihe95br5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** XP, levels, badges catalog, narrative chapters, avatar unlocks */
var XP_THRESHOLDS = [
	0,
	50,
	120,
	220,
	350,
	520,
	720,
	960,
	1250,
	1600,
	2e3
];
var LEVEL_TITLES = {
	1: "Aprendiz de chispas",
	2: "Chispa errante",
	3: "Hechicera novata",
	4: "Guardiana de runas",
	5: "Tejedora de hechizos",
	6: "Maestra de la torre",
	7: "Archimaga joven",
	8: "Señora de la Academia",
	9: "Estrella arcana",
	10: "Leyenda de verano",
	11: "Eterna Arcana"
};
function levelFromXp(xp) {
	let level = 1;
	for (let i = 0; i < XP_THRESHOLDS.length; i++) if (xp >= XP_THRESHOLDS[i]) level = i + 1;
	return Math.min(level, XP_THRESHOLDS.length);
}
function xpProgress(xp) {
	const level = levelFromXp(xp);
	const start = XP_THRESHOLDS[level - 1] ?? 0;
	const nextAt = XP_THRESHOLDS[level] ?? null;
	const intoLevel = xp - start;
	const needed = nextAt === null ? 1 : nextAt - start;
	const pct = nextAt === null ? 100 : Math.min(100, Math.round(intoLevel / needed * 100));
	return {
		level,
		title: LEVEL_TITLES[level] ?? `Nivel ${level}`,
		current: xp,
		nextAt,
		intoLevel,
		needed,
		pct
	};
}
var DEFAULT_AVATAR = {
	hat: "none",
	cape: "violet",
	wand: "violet",
	familiar: "owl"
};
var AVATAR_OPTIONS = {
	hat: [
		{
			id: "none",
			label: "Sin sombrero",
			minLevel: 1
		},
		{
			id: "star",
			label: "Diadema de estrella",
			minLevel: 2
		},
		{
			id: "wizard",
			label: "Sombrero de maga",
			minLevel: 4
		},
		{
			id: "crown",
			label: "Corona arcana",
			minLevel: 7
		}
	],
	cape: [
		{
			id: "violet",
			label: "Capa violeta",
			minLevel: 1
		},
		{
			id: "teal",
			label: "Capa turquesa",
			minLevel: 3
		},
		{
			id: "rose",
			label: "Capa rosa",
			minLevel: 5
		},
		{
			id: "gold",
			label: "Capa dorada",
			minLevel: 8
		}
	],
	wand: [
		{
			id: "violet",
			label: "Varita violeta",
			minLevel: 1
		},
		{
			id: "gold",
			label: "Varita dorada",
			minLevel: 3
		},
		{
			id: "cyan",
			label: "Varita cian",
			minLevel: 5
		},
		{
			id: "pink",
			label: "Varita rosa",
			minLevel: 6
		}
	],
	familiar: [
		{
			id: "owl",
			label: "Búho",
			minLevel: 1
		},
		{
			id: "fox",
			label: "Zorro",
			minLevel: 3
		},
		{
			id: "cat",
			label: "Gato mágico",
			minLevel: 5
		},
		{
			id: "dragon",
			label: "Dragón bebé",
			minLevel: 8
		}
	]
};
var STORY_CHAPTERS = [
	{
		id: "intro",
		title: "Las puertas de la Academia",
		text: "Liz empuja las puertas de cristal estrellado. Un susurro dice: «Bienvenida, pequeña maga. Tus hechizos de verano despertarán la Academia Arcana.»",
		unlock: "level",
		value: 1
	},
	{
		id: "level-3",
		title: "La primera runa",
		text: "En el patio de las chispas, una runa brilla bajo los pies de Liz. «Cada acierto enciende una estrella», canta el viento. El mapa de la Academia se hace más claro.",
		unlock: "level",
		value: 3
	},
	{
		id: "level-5",
		title: "El pasillo de los espejos",
		text: "Los espejos muestran a Liz un poco más alta, con capa al viento. «No eres solo puntos: eres historia en marcha», susurran. El familiar guiña un ojo.",
		unlock: "level",
		value: 5
	},
	{
		id: "level-8",
		title: "La cumbre de la torre",
		text: "Desde lo alto, Liz ve Madri lejano y el cielo de verano. La Academia le confía un secreto: el conocimiento es la magia más fuerte de todas.",
		unlock: "level",
		value: 8
	},
	{
		id: "boss-math",
		title: "El Guardián de los Números",
		text: "El Guardián de la Torre de Números inclina la corona de dígitos. «Has vencido mi prueba. Guarda esta llave de oro: abre la sala de las cuentas eternas.»",
		unlock: "boss",
		value: "math"
	},
	{
		id: "boss-lang",
		title: "La Bibliotecaria de las Sombras",
		text: "La Bibliotecaria cierra un libro gigante. «Sujeto y predicado bailan en tus manos. La Biblioteca Misteriosa te nombra Maestra de las Oraciones.»",
		unlock: "boss",
		value: "language"
	},
	{
		id: "boss-eng",
		title: "The English Sphinx",
		text: "A smiling sphinx whispers in two languages: «Your English spark shines. Keep playing, little mage — words open worlds.»",
		unlock: "boss",
		value: "english"
	},
	{
		id: "streak-3",
		title: "La llama de tres días",
		text: "Tres soles se alinean sobre la Academia. Una llama suave se posa en el hombro de Liz: «La constancia es un hechizo que no se apaga.»",
		unlock: "streak",
		value: 3
	},
	{
		id: "streak-7",
		title: "La semana de las estrellas",
		text: "Siete estrellas caen en el cuaderno de Liz. «Una semana de magia diaria», canta el coro. El verano se siente más brillante.",
		unlock: "streak",
		value: 7
	},
	{
		id: "zone-math-half",
		title: "Eco en la Torre",
		text: "A mitad de la Torre de Números, los escalones cantan. Liz ya no teme a las restas largas: cada paso suena a victoria.",
		unlock: "zone",
		value: "math-half"
	},
	{
		id: "zone-lang-half",
		title: "Páginas que susurran",
		text: "Las oraciones del pasillo se ordenan solas. «Quién hace qué», repite Liz, y las páginas se abren como alas.",
		unlock: "zone",
		value: "lang-half"
	}
];
var ALL_BADGES = {
	"racha-3": {
		name: "Racha de 3 días",
		desc: "Jugaste 3 días seguidos",
		emoji: "🔥"
	},
	"racha-7": {
		name: "Racha de 7 días",
		desc: "¡Una semana de magia diaria!",
		emoji: "🌟"
	},
	"cien-puntos": {
		name: "Cien estrellas",
		desc: "Alcanzaste 100 puntos",
		emoji: "✨"
	},
	quinientos: {
		name: "Maestra Arcana",
		desc: "500 puntos de magia",
		emoji: "👑"
	},
	"math-5": {
		name: "Aprendiz de números",
		desc: "5 misiones de mates",
		emoji: "🔢"
	},
	"math-15": {
		name: "Hechicera del cálculo",
		desc: "15 misiones de mates",
		emoji: "🪄"
	},
	"math-all": {
		name: "Guardiana de los Números",
		desc: "¡Las 30 misiones de la Torre!",
		emoji: "🏰"
	},
	"lang-5": {
		name: "Exploradora de palabras",
		desc: "5 oraciones analizadas",
		emoji: "📖"
	},
	"lang-all": {
		name: "Maestra de las Oraciones",
		desc: "15 oraciones completas",
		emoji: "📜"
	},
	"eng-half": {
		name: "Exploradora del Inglés",
		desc: "6 retos de inglés",
		emoji: "🧭"
	},
	"eng-all": {
		name: "Bilingual Mage",
		desc: "12 retos de inglés",
		emoji: "🇬🇧"
	},
	lectora: {
		name: "Lectora de dos mundos",
		desc: "2 fichas de lectura",
		emoji: "📚"
	},
	"boss-math": {
		name: "Vencedora del Guardián",
		desc: "Ganaste la Prueba del Guardián de Números",
		emoji: "⚔️"
	},
	"boss-lang": {
		name: "Vencedora de la Biblioteca",
		desc: "Ganaste la Prueba de la Bibliotecaria",
		emoji: "🦉"
	},
	"boss-eng": {
		name: "Sphinx Friend",
		desc: "Beat the English Sphinx trial",
		emoji: "🦁"
	},
	"perfect-mission": {
		name: "Primera misión perfecta",
		desc: "Completaste una misión sin fallar",
		emoji: "💎"
	},
	"level-5": {
		name: "Tejedora de hechizos",
		desc: "Alcanzaste el nivel 5",
		emoji: "🧵"
	},
	"level-10": {
		name: "Leyenda de verano",
		desc: "Alcanzaste el nivel 10",
		emoji: "🌙"
	}
};
/** Boss unlock thresholds (missions completed in zone) */
var BOSS_UNLOCK = {
	math: 8,
	language: 5,
	english: 4
};
function bossUnlocked(zone, completedCount) {
	return completedCount >= BOSS_UNLOCK[zone];
}
var LEVEL_META = {
	1: {
		name: "Chispa",
		emoji: "✨",
		blurb: "Empezamos con calma"
	},
	2: {
		name: "Llama",
		emoji: "🔥",
		blurb: "Un poco más de magia"
	},
	3: {
		name: "Hechizo",
		emoji: "🪄",
		blurb: "Retos intermedios"
	},
	4: {
		name: "Arcano",
		emoji: "📜",
		blurb: "Nivel avanzado"
	},
	5: {
		name: "Maestría",
		emoji: "👑",
		blurb: "¡Desafío de maga!"
	}
};
var MATH_BANK = [
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
		"answer": 3e3,
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
		"answer": 2e3,
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
		"answer": 1e3,
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
		"answer": 2e3,
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
var LANG_BANK = [
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
var ENG_BANK = [
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
	{
		"id": "e201",
		"level": 2,
		"kind": "translate",
		"prompt": "How do you say «zapatos»?",
		"promptEs": "¿Cómo se dice zapatos?",
		"options": [
			"shoes",
			"shows",
			"shops",
			"ships"
		],
		"answer": "shoes",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «shoes»."
	},
	{
		"id": "e202",
		"level": 2,
		"kind": "translate",
		"prompt": "How do you say «manos»?",
		"promptEs": "¿Cómo se dice manos?",
		"options": [
			"hands",
			"heads",
			"hats",
			"hills"
		],
		"answer": "hands",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «hands»."
	},
	{
		"id": "e203",
		"level": 2,
		"kind": "translate",
		"prompt": "How do you say «ojos»?",
		"promptEs": "¿Cómo se dice ojos?",
		"options": [
			"eyes",
			"ears",
			"eggs",
			"ends"
		],
		"answer": "eyes",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «eyes»."
	},
	{
		"id": "e204",
		"level": 2,
		"kind": "choose",
		"prompt": "It ___ cold today.",
		"promptEs": "Elige.",
		"options": [
			"is",
			"are",
			"am",
			"be"
		],
		"answer": "is",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «is»."
	},
	{
		"id": "e205",
		"level": 2,
		"kind": "complete",
		"prompt": "Please ___ the door.",
		"promptEs": "Completa.",
		"options": [
			"close",
			"cloth",
			"clock",
			"cloud"
		],
		"answer": "close",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «close»."
	},
	{
		"id": "e206",
		"level": 3,
		"kind": "translate",
		"prompt": "How do you say «desayuno»?",
		"promptEs": "¿Cómo se dice desayuno?",
		"options": [
			"breakfast",
			"break",
			"bread",
			"beach"
		],
		"answer": "breakfast",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «breakfast»."
	},
	{
		"id": "e207",
		"level": 3,
		"kind": "translate",
		"prompt": "How do you say «cena»?",
		"promptEs": "¿Cómo se dice cena?",
		"options": [
			"dinner",
			"driver",
			"danger",
			"dollar"
		],
		"answer": "dinner",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «dinner»."
	},
	{
		"id": "e208",
		"level": 3,
		"kind": "translate",
		"prompt": "How do you say «almuerzo»?",
		"promptEs": "¿Cómo se dice almuerzo?",
		"options": [
			"lunch",
			"launch",
			"lamp",
			"land"
		],
		"answer": "lunch",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «lunch»."
	},
	{
		"id": "e209",
		"level": 3,
		"kind": "choose",
		"prompt": "My name ___ Liz.",
		"promptEs": "Elige.",
		"options": [
			"is",
			"are",
			"am",
			"be"
		],
		"answer": "is",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «is»."
	},
	{
		"id": "e210",
		"level": 3,
		"kind": "complete",
		"prompt": "I like to ___.",
		"promptEs": "Completa (jugar).",
		"options": [
			"play",
			"pray",
			"plan",
			"plot"
		],
		"answer": "play",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «play»."
	},
	{
		"id": "e211",
		"level": 3,
		"kind": "translate",
		"prompt": "How do you say «jugar»?",
		"promptEs": "¿Cómo se dice jugar?",
		"options": [
			"play",
			"pray",
			"pay",
			"ply"
		],
		"answer": "play",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «play»."
	},
	{
		"id": "e212",
		"level": 4,
		"kind": "translate",
		"prompt": "How do you say «valiente»?",
		"promptEs": "¿Cómo se dice valiente?",
		"options": [
			"brave",
			"bread",
			"break",
			"brain"
		],
		"answer": "brave",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «brave»."
	},
	{
		"id": "e213",
		"level": 4,
		"kind": "translate",
		"prompt": "How do you say «rápido»?",
		"promptEs": "¿Cómo se dice rápido?",
		"options": [
			"fast",
			"fist",
			"feast",
			"first"
		],
		"answer": "fast",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «fast»."
	},
	{
		"id": "e214",
		"level": 4,
		"kind": "translate",
		"prompt": "How do you say «lento»?",
		"promptEs": "¿Cómo se dice lento?",
		"options": [
			"slow",
			"snow",
			"show",
			"slot"
		],
		"answer": "slow",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «slow»."
	},
	{
		"id": "e215",
		"level": 4,
		"kind": "choose",
		"prompt": "The books ___ on the table.",
		"promptEs": "Elige.",
		"options": [
			"are",
			"is",
			"am",
			"be"
		],
		"answer": "are",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «are»."
	},
	{
		"id": "e216",
		"level": 4,
		"kind": "complete",
		"prompt": "Can you ___ me?",
		"promptEs": "Completa (ayudar).",
		"options": [
			"help",
			"hold",
			"hope",
			"heap"
		],
		"answer": "help",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «help»."
	},
	{
		"id": "e217",
		"level": 4,
		"kind": "translate",
		"prompt": "How do you say «ayudar»?",
		"promptEs": "¿Cómo se dice ayudar?",
		"options": [
			"help",
			"held",
			"heap",
			"hope"
		],
		"answer": "help",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «help»."
	},
	{
		"id": "e218",
		"level": 5,
		"kind": "translate",
		"prompt": "How do you say «poder» (habilidad)?",
		"promptEs": "¿Cómo se dice poder?",
		"options": [
			"power",
			"powder",
			"pollen",
			"piano"
		],
		"answer": "power",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «power»."
	},
	{
		"id": "e219",
		"level": 5,
		"kind": "translate",
		"prompt": "How do you say «conocimiento»?",
		"promptEs": "¿Cómo se dice conocimiento?",
		"options": [
			"knowledge",
			"know",
			"known",
			"knife"
		],
		"answer": "knowledge",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «knowledge»."
	},
	{
		"id": "e220",
		"level": 5,
		"kind": "translate",
		"prompt": "How do you say «magia»?",
		"promptEs": "¿Cómo se dice magia?",
		"options": [
			"magic",
			"magnet",
			"major",
			"mango"
		],
		"answer": "magic",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «magic»."
	},
	{
		"id": "e221",
		"level": 5,
		"kind": "choose",
		"prompt": "___ there a spell?",
		"promptEs": "Elige.",
		"options": [
			"Is",
			"Are",
			"Am",
			"Do"
		],
		"answer": "Is",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «Is»."
	},
	{
		"id": "e222",
		"level": 5,
		"kind": "complete",
		"prompt": "We ___ learning English.",
		"promptEs": "Completa.",
		"options": [
			"are",
			"is",
			"am",
			"be"
		],
		"answer": "are",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «are»."
	},
	{
		"id": "e223",
		"level": 5,
		"kind": "translate",
		"prompt": "How do you say «aprender»?",
		"promptEs": "¿Cómo se dice aprender?",
		"options": [
			"learn",
			"lean",
			"leave",
			"least"
		],
		"answer": "learn",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «learn»."
	},
	{
		"id": "e224",
		"level": 5,
		"kind": "choose",
		"prompt": "She does not ___ late.",
		"promptEs": "Elige.",
		"options": [
			"arrive",
			"arrival",
			"around",
			"arrow"
		],
		"answer": "arrive",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «arrive»."
	},
	{
		"id": "e225",
		"level": 2,
		"kind": "translate",
		"prompt": "How do you say «nariz»?",
		"promptEs": "¿Cómo se dice nariz?",
		"options": [
			"nose",
			"noise",
			"note",
			"none"
		],
		"answer": "nose",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «nose»."
	},
	{
		"id": "e226",
		"level": 2,
		"kind": "choose",
		"prompt": "I ___ not tired.",
		"promptEs": "Elige.",
		"options": [
			"am",
			"is",
			"are",
			"be"
		],
		"answer": "am",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «am»."
	},
	{
		"id": "e227",
		"level": 3,
		"kind": "choose",
		"prompt": "You ___ very kind.",
		"promptEs": "Elige.",
		"options": [
			"are",
			"is",
			"am",
			"be"
		],
		"answer": "are",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «are»."
	},
	{
		"id": "e228",
		"level": 4,
		"kind": "choose",
		"prompt": "This ___ my wand.",
		"promptEs": "Elige.",
		"options": [
			"is",
			"are",
			"am",
			"be"
		],
		"answer": "is",
		"hint": "Think carefully.",
		"explanation": "¡Casi! La respuesta es «is»."
	}
];
function bankByLevel(bank, level) {
	return bank.filter((q) => q.level === level);
}
function pickRandom(arr, n) {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a.slice(0, Math.min(n, a.length));
}
function pickMathSession(level, n = 5) {
	return pickRandom(bankByLevel(MATH_BANK, level), n);
}
function pickLangSession(level, n = 5) {
	return pickRandom(bankByLevel(LANG_BANK, level), n);
}
function pickEngSession(level, n = 5) {
	return pickRandom(bankByLevel(ENG_BANK, level), n);
}
function countInLevel(area, level) {
	if (area === "math") return bankByLevel(MATH_BANK, level).length;
	if (area === "language") return bankByLevel(LANG_BANK, level).length;
	return bankByLevel(ENG_BANK, level).length;
}
var emptyRuns = () => ({
	1: 0,
	2: 0,
	3: 0,
	4: 0,
	5: 0
});
var emptyBook = () => ({
	titulo: "",
	trata: "",
	gusto: "",
	nota: 0,
	dibujo: "⭐",
	completed: false
});
var today = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
var emptyDaily = () => ({
	date: today(),
	math: false,
	language: false,
	english: false
});
function maybeAddBadge(badges, id) {
	if (badges.includes(id)) return badges;
	return [...badges, id];
}
function trackNewBadges(prev, next, recent) {
	const added = next.filter((id) => !prev.includes(id));
	if (added.length === 0) return recent;
	return [...added, ...recent].slice(0, 12);
}
function bumpSkill(stats, tag, result) {
	if (!tag) return stats;
	const cur = stats[tag] ?? {
		ok: 0,
		bad: 0
	};
	return {
		...stats,
		[tag]: result === "ok" ? {
			ok: cur.ok + 1,
			bad: cur.bad
		} : {
			ok: cur.ok,
			bad: cur.bad + 1
		}
	};
}
function unlockStoriesForState(s) {
	const level = levelFromXp(s.xp);
	const unlocked = new Set(s.unlockedStories);
	const newIds = [];
	for (const ch of STORY_CHAPTERS) {
		if (unlocked.has(ch.id)) continue;
		let ok = false;
		if (ch.unlock === "level" && level >= Number(ch.value)) ok = true;
		if (ch.unlock === "streak" && s.streak >= Number(ch.value)) ok = true;
		if (ch.unlock === "boss" && ch.value === "math" && s.bossBeaten.math) ok = true;
		if (ch.unlock === "boss" && ch.value === "language" && s.bossBeaten.language) ok = true;
		if (ch.unlock === "boss" && ch.value === "english" && s.bossBeaten.english) ok = true;
		if (ch.unlock === "zone" && ch.value === "math-half" && s.mathCompleted.length >= 15) ok = true;
		if (ch.unlock === "zone" && ch.value === "lang-half" && s.languageCompleted.length >= 8) ok = true;
		if (ok) {
			unlocked.add(ch.id);
			newIds.push(ch.id);
		}
	}
	if (!unlocked.has("intro")) {
		unlocked.add("intro");
		if (!s.unlockedStories.includes("intro")) newIds.push("intro");
	}
	const list = [...unlocked];
	const pending = newIds.length > 0 ? newIds[newIds.length - 1] : null;
	return {
		unlockedStories: list,
		pendingStoryId: pending && !s.unlockedStories.includes(pending) ? pending : null,
		newIds
	};
}
var useGameStore = create()(persist((set, get) => ({
	playerName: "Liz",
	points: 0,
	xp: 0,
	streak: 0,
	lastPlayDate: null,
	mathCompleted: [],
	mathExerciseDone: {},
	languageCompleted: [],
	englishCompleted: [],
	books: [emptyBook(), emptyBook()],
	badges: [],
	totalCorrect: 0,
	totalWrong: 0,
	playMode: "official",
	reviewQueue: [],
	avatar: { ...DEFAULT_AVATAR },
	unlockedStories: ["intro"],
	pendingStoryId: null,
	bossBeaten: {
		math: false,
		language: false,
		english: false
	},
	perfectMissions: 0,
	skillStats: {},
	maxStreak: 0,
	recentBadgeIds: [],
	diagnosticDone: false,
	diagnosticSkipped: false,
	suggestedFocus: null,
	theme: "chispa",
	session: null,
	levelRuns: {
		math: emptyRuns(),
		language: emptyRuns(),
		english: emptyRuns()
	},
	areaSessionCount: {
		math: 0,
		language: 0,
		english: 0
	},
	dailyParts: emptyDaily(),
	rouletteSpins: 0,
	lastRouletteDate: null,
	tempBadges: {},
	lastAppOpen: null,
	view: "home",
	activeMathTask: null,
	activeLangId: null,
	activeEngId: null,
	setView: (v) => set({ view: v }),
	setName: (n) => set({ playerName: n.trim() || "Liz" }),
	setPlayMode: (m) => set({ playMode: m }),
	setTheme: (t) => set({ theme: t }),
	setAvatar: (partial) => set({ avatar: {
		...get().avatar,
		...partial
	} }),
	startMath: (taskId) => set({
		activeMathTask: taskId,
		view: "math-play"
	}),
	startLang: (id) => set({
		activeLangId: id,
		view: "language-play"
	}),
	startEng: (id) => set({
		activeEngId: id,
		view: "english-play"
	}),
	startLevel: (area, level) => {
		const n = 5;
		let ids = [];
		if (area === "math") ids = pickMathSession(level, n).map((q) => q.id);
		else if (area === "language") ids = pickLangSession(level, n).map((q) => q.id);
		else ids = pickEngSession(level, n).map((q) => q.id);
		set({
			session: {
				area,
				level,
				ids
			},
			view: area === "math" ? "math-play" : area === "language" ? "language-play" : "english-play"
		});
	},
	clearSession: () => set({ session: null }),
	completeSession: () => {
		const s = get();
		const sess = s.session;
		if (!sess) return;
		if (s.playMode === "practice") {
			set({ session: null });
			return;
		}
		const levelRuns = {
			...s.levelRuns,
			[sess.area]: {
				...s.levelRuns[sess.area],
				[sess.level]: (s.levelRuns[sess.area][sess.level] ?? 0) + 1
			}
		};
		const areaSessionCount = {
			...s.areaSessionCount,
			[sess.area]: s.areaSessionCount[sess.area] + 1
		};
		const token = Math.floor(Date.now() / 1e3) + areaSessionCount[sess.area];
		let mathCompleted = s.mathCompleted;
		let languageCompleted = s.languageCompleted;
		let englishCompleted = s.englishCompleted;
		if (sess.area === "math") mathCompleted = [...mathCompleted, token];
		if (sess.area === "language") languageCompleted = [...languageCompleted, token];
		if (sess.area === "english") englishCompleted = [...englishCompleted, token];
		const d = today();
		let dailyParts = s.dailyParts.date === d ? { ...s.dailyParts } : emptyDaily();
		dailyParts = {
			...dailyParts,
			date: d,
			[sess.area]: true
		};
		set({
			session: null,
			levelRuns,
			areaSessionCount,
			mathCompleted,
			languageCompleted,
			englishCompleted,
			dailyParts,
			rouletteSpins: s.rouletteSpins + 1
		});
	},
	touchActivity: () => {
		const s = get();
		const now = Date.now();
		const last = s.lastAppOpen ? Date.parse(s.lastAppOpen) : 0;
		let tempBadges = { ...s.tempBadges };
		if (last && now - last > 864e5) tempBadges = {};
		for (const [id, exp] of Object.entries(tempBadges)) if (exp <= now) delete tempBadges[id];
		const d = today();
		const dailyParts = s.dailyParts.date === d ? s.dailyParts : emptyDaily();
		set({
			lastAppOpen: (/* @__PURE__ */ new Date()).toISOString(),
			tempBadges,
			dailyParts
		});
	},
	spinRoulette: (sliceId) => {
		const s = get();
		const d = today();
		let spins = s.rouletteSpins;
		let lastRouletteDate = s.lastRouletteDate;
		const free = lastRouletteDate !== d;
		if (!free && spins <= 0) return "No te quedan giros.";
		if (free) lastRouletteDate = d;
		else spins = Math.max(0, spins - 1);
		let xp = s.xp;
		let points = s.points;
		const tempBadges = { ...s.tempBadges };
		const exp = Date.now() + 864e5;
		let msg = "¡Premio mágico!";
		if (sliceId.startsWith("xp")) {
			const n = Number(sliceId.replace("xp", "")) || 10;
			xp += n;
			points += Math.max(1, Math.floor(n / 2));
			msg = `¡Premio! +${n} XP mágicos`;
		} else if (sliceId === "badge-brisa") {
			tempBadges["temp-brisa"] = exp;
			msg = "¡Insignia temporal: Brisa del día!";
		} else if (sliceId === "badge-chispa") {
			tempBadges["temp-chispa"] = exp;
			msg = "¡Insignia temporal: Chispa fugaz!";
		} else if (sliceId === "badge-eco") {
			tempBadges["temp-eco"] = exp;
			msg = "¡Insignia temporal: Eco mágico!";
		} else {
			xp += 10;
			msg = "¡Premio! +10 XP";
		}
		set({
			rouletteSpins: spins,
			lastRouletteDate,
			xp,
			points,
			tempBadges,
			lastAppOpen: (/* @__PURE__ */ new Date()).toISOString()
		});
		return msg;
	},
	startBoss: (zone) => {
		if (zone === "math") set({ view: "math-boss" });
		else if (zone === "language") set({ view: "language-boss" });
		else set({ view: "english-boss" });
	},
	awardXp: (amount) => {
		const s = get();
		if (s.playMode === "practice" || amount <= 0) return;
		const xp = s.xp + amount;
		let badges = s.badges;
		const nextLevel = levelFromXp(xp);
		if (nextLevel >= 5) badges = maybeAddBadge(badges, "level-5");
		if (nextLevel >= 10) badges = maybeAddBadge(badges, "level-10");
		const story = unlockStoriesForState({
			...s,
			xp,
			badges
		});
		set({
			xp,
			badges,
			unlockedStories: story.unlockedStories,
			pendingStoryId: story.pendingStoryId ?? s.pendingStoryId
		});
	},
	awardCorrect: (pts = 10) => {
		const s = get();
		if (s.playMode === "practice") {
			set({ totalCorrect: s.totalCorrect + 1 });
			return;
		}
		const d = today();
		let streak = s.streak;
		let streakBonusXp = 0;
		let badges = s.badges;
		if (s.lastPlayDate !== d) {
			const yesterday = /* @__PURE__ */ new Date();
			yesterday.setDate(yesterday.getDate() - 1);
			const y = yesterday.toISOString().slice(0, 10);
			streak = s.lastPlayDate === y ? s.streak + 1 : 1;
			streakBonusXp = 5;
			if (streak >= 3) badges = maybeAddBadge(badges, "racha-3");
			if (streak >= 7) badges = maybeAddBadge(badges, "racha-7");
			if (streak === 3) streakBonusXp += 15;
			if (streak === 7) streakBonusXp += 30;
		}
		if (s.points + pts >= 100) badges = maybeAddBadge(badges, "cien-puntos");
		if (s.points + pts >= 500) badges = maybeAddBadge(badges, "quinientos");
		const xpGain = pts + streakBonusXp;
		const xp = s.xp + xpGain;
		const nextLevel = levelFromXp(xp);
		if (nextLevel >= 5) badges = maybeAddBadge(badges, "level-5");
		if (nextLevel >= 10) badges = maybeAddBadge(badges, "level-10");
		const story = unlockStoriesForState({
			...s,
			xp,
			streak,
			badges
		});
		const recentBadgeIds = trackNewBadges(s.badges, badges, s.recentBadgeIds);
		const maxStreak = Math.max(s.maxStreak, streak);
		const now = Date.now();
		let tempBadges = { ...s.tempBadges };
		const last = s.lastAppOpen ? Date.parse(s.lastAppOpen) : 0;
		if (last && now - last > 864e5) tempBadges = {};
		set({
			points: s.points + pts,
			xp,
			totalCorrect: s.totalCorrect + 1,
			streak,
			maxStreak,
			lastPlayDate: d,
			badges,
			recentBadgeIds,
			unlockedStories: story.unlockedStories,
			pendingStoryId: story.pendingStoryId ?? s.pendingStoryId,
			lastAppOpen: (/* @__PURE__ */ new Date()).toISOString(),
			tempBadges
		});
	},
	awardWrong: () => set({ totalWrong: get().totalWrong + 1 }),
	recordSkill: (tag, result) => {
		set({ skillStats: bumpSkill(get().skillStats, tag, result) });
	},
	recordFail: (area, key) => {
		const queue = [...get().reviewQueue];
		const i = queue.findIndex((r) => r.area === area && r.key === key);
		const d = today();
		if (i >= 0) queue[i] = {
			...queue[i],
			fails: queue[i].fails + 1,
			lastFail: d
		};
		else queue.push({
			area,
			key,
			fails: 1,
			lastFail: d
		});
		queue.sort((a, b) => b.fails - a.fails);
		set({ reviewQueue: queue.slice(0, 40) });
	},
	clearReviewKey: (area, key) => {
		set({ reviewQueue: get().reviewQueue.filter((r) => !(r.area === area && r.key === key)) });
	},
	completeMathExercise: () => {},
	completeLanguage: () => {},
	completeEnglish: () => {},
	recordPerfectMission: () => {
		const s = get();
		if (s.playMode === "practice") return;
		const badges = maybeAddBadge(s.badges, "perfect-mission");
		set({
			perfectMissions: s.perfectMissions + 1,
			badges,
			recentBadgeIds: trackNewBadges(s.badges, badges, s.recentBadgeIds)
		});
	},
	beatBoss: (zone) => {
		const s = get();
		if (s.bossBeaten[zone]) return;
		const bossBeaten = {
			...s.bossBeaten,
			[zone]: true
		};
		let badges = s.badges;
		if (zone === "math") badges = maybeAddBadge(badges, "boss-math");
		if (zone === "language") badges = maybeAddBadge(badges, "boss-lang");
		if (zone === "english") badges = maybeAddBadge(badges, "boss-eng");
		const bonusXp = 80;
		const bonusPts = 50;
		const xp = s.xp + bonusXp;
		const story = unlockStoriesForState({
			...s,
			bossBeaten,
			badges,
			xp
		});
		const recentBadgeIds = trackNewBadges(s.badges, badges, s.recentBadgeIds);
		set({
			bossBeaten,
			badges,
			recentBadgeIds,
			xp,
			points: s.points + bonusPts,
			unlockedStories: story.unlockedStories,
			pendingStoryId: story.pendingStoryId
		});
	},
	dismissStory: () => set({ pendingStoryId: null }),
	finishDiagnostic: (focus) => set({
		diagnosticDone: true,
		diagnosticSkipped: false,
		suggestedFocus: focus,
		view: "daily",
		playMode: "official"
	}),
	skipDiagnostic: () => set({
		diagnosticSkipped: true,
		view: "home"
	}),
	saveBook: (index, data) => {
		const books = [...get().books];
		const merged = {
			...books[index],
			...data
		};
		const completed = merged.titulo.trim().length > 0 && merged.trata.trim().length > 10 && merged.gusto.trim().length > 5 && merged.nota > 0;
		books[index] = {
			...merged,
			completed
		};
		let badges = get().badges;
		if (books[0].completed && books[1].completed) badges = maybeAddBadge(badges, "lectora");
		set({
			books,
			badges
		});
	},
	resetProgress: () => set({
		points: 0,
		xp: 0,
		streak: 0,
		lastPlayDate: null,
		mathCompleted: [],
		mathExerciseDone: {},
		languageCompleted: [],
		englishCompleted: [],
		books: [emptyBook(), emptyBook()],
		badges: [],
		totalCorrect: 0,
		totalWrong: 0,
		reviewQueue: [],
		avatar: { ...DEFAULT_AVATAR },
		unlockedStories: ["intro"],
		pendingStoryId: null,
		bossBeaten: {
			math: false,
			language: false,
			english: false
		},
		perfectMissions: 0,
		skillStats: {},
		maxStreak: 0,
		recentBadgeIds: [],
		diagnosticDone: false,
		diagnosticSkipped: false,
		suggestedFocus: null,
		session: null,
		levelRuns: {
			math: emptyRuns(),
			language: emptyRuns(),
			english: emptyRuns()
		},
		areaSessionCount: {
			math: 0,
			language: 0,
			english: 0
		},
		dailyParts: emptyDaily(),
		rouletteSpins: 0,
		lastRouletteDate: null,
		tempBadges: {},
		lastAppOpen: null,
		view: "home",
		activeMathTask: null,
		activeLangId: null,
		activeEngId: null
	})
}), { name: "liz-academia-arcana-v4" }));
var BADGE_INFO = ALL_BADGES;
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function normalizeAnswer(raw) {
	return raw.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.,;:!?¿¡"']/g, "").replace(/\s+/g, " ");
}
function normalizeNumberInput(raw) {
	const cleaned = raw.trim().replace(/\s/g, "").replace(/\./g, "").replace(/,/g, "");
	if (!/^-?\d+$/.test(cleaned)) return null;
	const n = Number(cleaned);
	return Number.isFinite(n) ? n : null;
}
function XpBar({ compact }) {
	const prog = xpProgress(useGameStore((s) => s.xp));
	if (compact) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-[5.5rem] flex-col gap-0.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-1 text-[10px] text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-semibold text-primary",
				children: ["Nv.", prog.level]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular-nums",
				children: prog.nextAt === null ? "MAX" : `${prog.intoLevel}/${prog.needed}`
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-1.5 overflow-hidden rounded-full bg-surface-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-full rounded-full bg-primary transition-all duration-500",
				style: { width: `${prog.pct}%` }
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5 rounded-xl border border-border bg-card p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-sm font-semibold text-fg",
					children: [
						"Nivel ",
						prog.level,
						" · ",
						prog.title
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tabular-nums text-muted",
					children: prog.nextAt === null ? "Nivel máximo" : `${prog.intoLevel} / ${prog.needed} XP`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-2.5 overflow-hidden rounded-full bg-surface-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"),
					style: { width: `${prog.pct}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[11px] text-muted",
				children: [prog.current, " XP total"]
			})
		]
	});
}
var HAT_EMOJI = {
	none: "",
	star: "⭐",
	wizard: "🧙",
	crown: "👑"
};
var FAMILIAR_EMOJI = {
	owl: "🦉",
	fox: "🦊",
	cat: "🐱",
	dragon: "🐉"
};
var CAPE_CLASS = {
	violet: "from-violet-600/80 to-purple-900/80",
	teal: "from-teal-500/80 to-cyan-900/80",
	rose: "from-rose-500/80 to-pink-900/80",
	gold: "from-amber-400/80 to-yellow-800/80"
};
var WAND_CLASS = {
	violet: "bg-violet-400 shadow-violet-400/50",
	gold: "bg-amber-300 shadow-amber-300/50",
	cyan: "bg-cyan-300 shadow-cyan-300/50",
	pink: "bg-pink-300 shadow-pink-300/50"
};
function AvatarPortrait({ size = "md", className }) {
	const avatar = useGameStore((s) => s.avatar);
	const level = levelFromXp(useGameStore((s) => s.xp));
	const dim = size === "sm" ? "h-14 w-14" : size === "lg" ? "h-36 w-36" : "h-24 w-24";
	const face = size === "sm" ? "text-2xl" : size === "lg" ? "text-6xl" : "text-4xl";
	const glow = level >= 8 ? "ring-2 ring-primary shadow-lg shadow-primary/30" : level >= 4 ? "ring-1 ring-accent/50" : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative inline-flex flex-col items-center", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("relative grid place-items-center rounded-full bg-gradient-to-b", CAPE_CLASS[avatar.cape], dim, glow),
			children: [
				avatar.hat !== "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("absolute -top-1 left-1/2 -translate-x-1/2", size === "sm" ? "text-sm" : "text-xl"),
					"aria-hidden": true,
					children: HAT_EMOJI[avatar.hat]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: face,
					"aria-hidden": true,
					children: "👧"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("absolute -right-1 bottom-2 h-8 w-1.5 rounded-full shadow-md", WAND_CLASS[avatar.wand], size === "sm" && "h-5 w-1", size === "lg" && "h-12 w-2"),
					"aria-hidden": true
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("absolute -bottom-1 -right-1 rounded-full bg-card px-1", size === "sm" ? "text-sm" : "text-xl"),
			"aria-hidden": true,
			children: FAMILIAR_EMOJI[avatar.familiar]
		})]
	});
}
function AvatarCustomizer() {
	const avatar = useGameStore((s) => s.avatar);
	const setAvatar = useGameStore((s) => s.setAvatar);
	const xp = useGameStore((s) => s.xp);
	const name = useGameStore((s) => s.playerName);
	const setView = useGameStore((s) => s.setView);
	const prog = xpProgress(xp);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-2xl font-semibold text-fg",
					children: ["Tu avatar, ", name]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"Nivel ",
						prog.level,
						" · ",
						prog.title,
						". ¡Personaliza tu look mágico!"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarPortrait, { size: "lg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Al subir de nivel desbloqueas sombreros, capas y familiares nuevos."
				})]
			}),
			[
				[
					"hat",
					"Sombrero",
					AVATAR_OPTIONS.hat
				],
				[
					"cape",
					"Capa",
					AVATAR_OPTIONS.cape
				],
				[
					"wand",
					"Varita",
					AVATAR_OPTIONS.wand
				],
				[
					"familiar",
					"Familiar",
					AVATAR_OPTIONS.familiar
				]
			].map(([key, label, opts]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold text-fg",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-2",
					children: opts.map((o) => {
						const locked = prog.level < o.minLevel;
						const active = avatar[key] === o.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: locked,
							onClick: () => setAvatar({ [key]: o.id }),
							className: cn("min-h-12 rounded-xl border px-3 py-2 text-left text-sm transition", active && "border-primary bg-primary/15", !active && !locked && "border-border bg-surface hover:border-primary/40", locked && "cursor-not-allowed border-border/50 bg-surface/40 opacity-50"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-fg",
								children: o.label
							}), locked && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-0.5 block text-[11px] text-muted",
								children: ["Nivel ", o.minLevel]
							})]
						}, o.id);
					})
				})]
			}, key)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setView("progress"),
				className: "min-h-11 w-full rounded-lg border border-border bg-surface text-sm text-fg",
				children: "Volver a la Sala de Trofeos"
			})
		]
	});
}
function StoryModal() {
	const pendingStoryId = useGameStore((s) => s.pendingStoryId);
	const dismissStory = useGameStore((s) => s.dismissStory);
	const unlockedStories = useGameStore((s) => s.unlockedStories);
	const chapter = STORY_CHAPTERS.find((c) => c.id === pendingStoryId) ?? (pendingStoryId ? {
		id: pendingStoryId,
		title: "Capítulo mágico",
		text: "Una nueva página se abre en tu aventura."
	} : null);
	if (!pendingStoryId || !chapter) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "story-title",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md space-y-4 rounded-2xl border border-primary/40 bg-card p-5 shadow-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-3.5 w-3.5" }), "Capítulo desbloqueado"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: dismissStory,
						className: "grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-surface",
						"aria-label": "Cerrar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "story-title",
					className: "font-display text-xl font-semibold text-fg",
					children: chapter.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted sm:text-base",
					children: chapter.text
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] text-muted",
					children: [
						"Capítulos en el grimorio: ",
						unlockedStories.length,
						"/",
						STORY_CHAPTERS.length
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: dismissStory,
					className: "min-h-12 w-full rounded-lg bg-primary font-semibold text-primary-fg",
					children: "¡Seguir la aventura!"
				})
			]
		})
	});
}
function StoryLog() {
	const unlocked = useGameStore((s) => s.unlockedStories);
	const chapters = STORY_CHAPTERS.filter((c) => unlocked.includes(c.id));
	if (chapters.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Aún no hay capítulos. ¡Juega para desbloquearlos!"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-3",
		children: chapters.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "rounded-xl border border-border bg-card p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display font-semibold text-fg",
				children: c.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm leading-relaxed text-muted",
				children: c.text
			})]
		}, c.id))
	});
}
var THEMES = [{
	id: "chispa",
	label: "Chispa",
	desc: "Lila, rosa y dorado",
	icon: Moon
}, {
	id: "trueno",
	label: "Trueno",
	desc: "Azul petróleo y plata",
	icon: Zap
}];
/** Compact control for header */
function ThemeToggle({ compact }) {
	const theme = useGameStore((s) => s.theme);
	const setTheme = useGameStore((s) => s.setTheme);
	if (compact) {
		const next = theme === "chispa" ? "trueno" : "chispa";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setTheme(next),
			className: "inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-xs font-semibold text-fg",
			title: `Tema: ${theme === "chispa" ? "Chispa" : "Trueno"}. Toca para cambiar.`,
			"aria-label": `Cambiar tema. Ahora: ${theme}`,
			children: [theme === "chispa" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-3.5 w-3.5 text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-3.5 w-3.5 text-accent-2" }), theme === "chispa" ? "Chispa" : "Trueno"]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold text-fg",
			children: "Tema de colores"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-2",
			children: THEMES.map((t) => {
				const Icon = t.icon;
				const active = theme === t.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setTheme(t.id),
					className: cn("flex min-h-14 flex-col items-start justify-center gap-0.5 rounded-xl border px-3 py-2 text-left transition", active ? "border-primary bg-primary/15" : "border-border bg-surface hover:border-primary/40"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5 text-sm font-semibold text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), t.label]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] text-muted",
						children: t.desc
					})]
				}, t.id);
			})
		})]
	});
}
/** Keeps <html data-theme> in sync with persisted preference */
function ThemeApplier() {
	const theme = useGameStore((s) => s.theme);
	(0, import_react.useEffect)(() => {
		document.documentElement.setAttribute("data-theme", theme);
		document.body.setAttribute("data-theme", theme);
	}, [theme]);
	return null;
}
var NAV = [
	{
		id: "home",
		label: "Mapa",
		icon: House
	},
	{
		id: "daily",
		label: "Hoy",
		icon: Flame
	},
	{
		id: "math",
		label: "Mates",
		icon: WandSparkles
	},
	{
		id: "language",
		label: "Lengua",
		icon: BookOpen
	},
	{
		id: "english",
		label: "English",
		icon: Languages
	},
	{
		id: "reading",
		label: "Libros",
		icon: Sparkles
	},
	{
		id: "progress",
		label: "Logros",
		icon: Trophy
	}
];
var WHERE = {
	home: "Mapa de la Academia",
	daily: "Misión de hoy",
	math: "Torre de Números",
	"math-play": "Torre · jugando",
	"math-boss": "Torre · batalla final",
	language: "Biblioteca Misteriosa",
	"language-play": "Biblioteca · jugando",
	"language-boss": "Biblioteca · batalla final",
	english: "Cámara del Inglés",
	"english-play": "English · jugando",
	"english-boss": "English · batalla final",
	reading: "Salón de Lectura",
	progress: "Sala de Trofeos",
	avatar: "Tu avatar",
	diagnostic: "Diagnóstico mágico"
};
function Shell({ children }) {
	const view = useGameStore((s) => s.view);
	const setView = useGameStore((s) => s.setView);
	const points = useGameStore((s) => s.points);
	const streak = useGameStore((s) => s.streak);
	const touchActivity = useGameStore((s) => s.touchActivity);
	(0, import_react.useEffect)(() => {
		touchActivity();
	}, [touchActivity]);
	const activeNav = view === "math-play" || view === "math-boss" ? "math" : view === "language-play" || view === "language-boss" ? "language" : view === "english-play" || view === "english-boss" ? "english" : view === "avatar" || view === "story" || view === "diagnostic" ? "progress" : view;
	const where = WHERE[view] ?? "Academia Arcana";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[calc(100dvh-var(--grok-banner-h,0px))] flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeApplier, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-[var(--grok-banner-h,0px)] z-30 border-b border-border/60 bg-bg/90 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setView("home"),
						className: "flex min-h-12 items-center gap-2 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarPortrait, { size: "sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-sm font-semibold tracking-wide text-fg sm:text-base",
								children: "Academia Arcana"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-[10rem] truncate text-xs text-muted sm:max-w-none",
								children: where
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-1.5 sm:gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, { compact: true }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XpBar, { compact: true }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-h-11 items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
									className: "h-4 w-4 text-primary",
									"aria-hidden": true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold tabular-nums text-fg",
									children: points
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-h-11 items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
									className: "h-4 w-4 text-danger",
									"aria-hidden": true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold tabular-nums text-fg",
									children: streak
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-5xl flex-1 animate-fade-in px-4 py-5 pb-36 sm:py-8 sm:pb-36",
				children
			}, view),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryModal, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-border/70 bg-bg/95 backdrop-blur-md",
				style: { paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" },
				"aria-label": "Navegación principal",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex max-w-5xl items-stretch justify-between gap-0.5 overflow-x-auto px-1 py-1.5",
					children: NAV.map(({ id, label, icon: Icon }) => {
						const active = activeNav === id;
						const isDaily = id === "daily";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setView(id),
							className: cn("flex min-h-14 min-w-[3.25rem] flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] font-medium transition sm:text-xs", active ? isDaily ? "bg-danger/20 text-danger" : "bg-primary/15 text-primary" : "text-muted hover:bg-surface hover:text-fg", isDaily && !active && "text-danger/80"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: cn("h-5 w-5 sm:h-6 sm:w-6", isDaily && "h-6 w-6"),
								"aria-hidden": true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
						}, id);
					})
				})
			})
		]
	});
}
var SKILL_LABELS = {
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
	complete: "Completar frases en inglés"
};
function skillLabel(tag) {
	return SKILL_LABELS[tag] ?? tag;
}
function skillAccuracy(s) {
	const t = s.ok + s.bad;
	if (t === 0) return null;
	return Math.round(s.ok / t * 100);
}
function analyzeSkills(stats) {
	const ranked = Object.entries(stats).map(([tag, s]) => {
		const attempts = s.ok + s.bad;
		const accuracy = skillAccuracy(s);
		return {
			tag,
			label: skillLabel(tag),
			accuracy: accuracy ?? 0,
			attempts
		};
	}).filter((r) => r.attempts >= 2).sort((a, b) => b.accuracy - a.accuracy || b.attempts - a.attempts);
	const strong = ranked.filter((r) => r.accuracy >= 70).slice(0, 3);
	const weak = [...ranked].filter((r) => r.accuracy < 70).sort((a, b) => a.accuracy - b.accuracy).slice(0, 3);
	if (weak.length === 0 && ranked.length > 1) {
		const bottom = ranked[ranked.length - 1];
		if (bottom.accuracy < 90) weak.push(bottom);
	}
	return {
		strong,
		weak,
		ranked
	};
}
function childFriendlyInsights(stats) {
	const { strong, weak } = analyzeSkills(stats);
	if (strong.length === 0 && weak.length === 0) return {
		hasData: false,
		strongLine: "Tu magia aún se está despertando. ¡Haz unas misiones y verás brillos aquí!",
		weakLine: "Cuando practiques un poco más, te diré qué hechizos entrenar en el Modo Entrenamiento."
	};
	return {
		hasData: true,
		strongLine: strong.length > 0 ? `Tu magia es más fuerte en: ${strong.map((s) => s.label).join(", ")}.` : "Sigues creciendo: aún no hay un hechizo superestrella, ¡pero vas bien!",
		weakLine: weak.length > 0 ? `Puedes entrenar más: ${weak.map((s) => s.label).join(", ")}. ¡El Entrenamiento te espera sin presión!` : "No hay áreas débiles claras: ¡estás equilibrada como una verdadera maga!"
	};
}
function parentRecommendations(stats, accuracy, streak, maxStreak) {
	const { strong, weak } = analyzeSkills(stats);
	const lines = [];
	if (accuracy === null) lines.push("Aun hay poca actividad registrada. Se recomienda practicar un poco cada dia (5-10 minutos).");
	else if (accuracy >= 80) lines.push(`Excelente precision general (${accuracy}%). Conviene mantener la rutina corta y regular.`);
	else if (accuracy >= 50) lines.push(`Precision general del ${accuracy}%. Buen avance: reforzar con el modo Entrenamiento los temas con mas fallos.`);
	else lines.push(`Precision general del ${accuracy}%. Es normal al empezar: priorizar practicar sin presion y repasar con calma.`);
	if (strong.length > 0) lines.push(`Areas mas solidas: ${strong.map((s) => `${s.label} (${s.accuracy}%)`).join("; ")}.`);
	if (weak.length > 0) lines.push(`Areas a reforzar: ${weak.map((s) => `${s.label} (${s.accuracy}%)`).join("; ")}. Sugerencia: 1 sesion corta de entrenamiento en esos temas.`);
	if (maxStreak >= 3 || streak >= 3) lines.push(`La constancia es un punto fuerte (racha actual ${streak} dia(s), maxima ${maxStreak}). Seguir con una mision breve al dia ayuda a fijar lo aprendido.`);
	else lines.push("Intentar jugar al menos un poco casi todos los dias refuerza la memoria a largo plazo.");
	lines.push("Este informe es orientativo y positivo: celebra los aciertos y trata los errores como parte del aprendizaje.");
	return lines;
}
function ProgressPanel({ compact }) {
	const mathCompleted = useGameStore((s) => s.mathCompleted);
	const languageCompleted = useGameStore((s) => s.languageCompleted);
	const englishCompleted = useGameStore((s) => s.englishCompleted);
	const areaSessionCount = useGameStore((s) => s.areaSessionCount);
	const books = useGameStore((s) => s.books);
	const streak = useGameStore((s) => s.streak);
	const maxStreak = useGameStore((s) => s.maxStreak);
	const xp = useGameStore((s) => s.xp);
	const badges = useGameStore((s) => s.badges);
	const recentBadgeIds = useGameStore((s) => s.recentBadgeIds);
	const skillStats = useGameStore((s) => s.skillStats);
	const points = useGameStore((s) => s.points);
	const prog = xpProgress(xp);
	const insights = childFriendlyInsights(skillStats);
	const readingDone = books.filter((b) => b.completed).length;
	const towers = [
		{
			label: "Matemáticas",
			emoji: "🔢",
			value: areaSessionCount.math || mathCompleted.length,
			max: 30,
			color: "bg-primary"
		},
		{
			label: "Lengua",
			emoji: "📖",
			value: areaSessionCount.language || languageCompleted.length,
			max: 15,
			color: "bg-accent"
		},
		{
			label: "Inglés",
			emoji: "🇬🇧",
			value: areaSessionCount.english || englishCompleted.length,
			max: 12,
			color: "bg-accent-2"
		},
		{
			label: "Lectura",
			emoji: "📚",
			value: readingDone,
			max: 2,
			color: "bg-success"
		}
	];
	const recent = recentBadgeIds.length > 0 ? recentBadgeIds.slice(0, 4) : badges.slice(-4).reverse();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("space-y-4", compact && "space-y-3"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
								className: "h-4 w-4 text-danger",
								"aria-hidden": true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold tabular-nums text-fg",
								children: streak
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted",
								children: "racha"
							}),
							maxStreak > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[10px] text-muted",
								children: [
									"(máx. ",
									maxStreak,
									")"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
								className: "h-4 w-4 text-primary",
								"aria-hidden": true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold tabular-nums text-fg",
								children: points
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted",
								children: "pts"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
								className: "h-4 w-4 text-accent",
								"aria-hidden": true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold tabular-nums text-fg",
								children: badges.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted",
								children: "insignias"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XpBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2 sm:grid-cols-2",
				children: towers.map((t) => {
					const pct = Math.min(100, Math.round(t.value / t.max * 100));
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-surface/40 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1.5 flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-medium text-fg",
								children: [
									t.emoji,
									" ",
									t.label
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums text-xs text-muted",
								children: [t.value, t.label === "Lectura" ? `/${t.max}` : " partidas"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2 overflow-hidden rounded-full bg-surface-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("h-full rounded-full transition-all", t.color),
								style: { width: `${pct}%` }
							})
						})]
					}, t.label);
				})
			}),
			!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "space-y-1 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["· ", insights.strongLine] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["· ", insights.weakLine] })]
			}),
			!compact && recent.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs font-medium text-muted",
				children: "Insignias recientes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: recent.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-fg",
					children: [
						BADGE_INFO[id]?.emoji ?? "🏅",
						" ",
						BADGE_INFO[id]?.name ?? id
					]
				}, id))
			})] }),
			compact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: [
					"Nv. ",
					prog.level,
					" · ",
					prog.title
				]
			})
		]
	});
}
function HomeView() {
	const setView = useGameStore((s) => s.setView);
	const name = useGameStore((s) => s.playerName);
	const setName = useGameStore((s) => s.setName);
	const mathCompleted = useGameStore((s) => s.mathCompleted);
	const languageCompleted = useGameStore((s) => s.languageCompleted);
	const englishCompleted = useGameStore((s) => s.englishCompleted);
	const books = useGameStore((s) => s.books);
	const badges = useGameStore((s) => s.badges);
	const xp = useGameStore((s) => s.xp);
	const diagnosticDone = useGameStore((s) => s.diagnosticDone);
	const diagnosticSkipped = useGameStore((s) => s.diagnosticSkipped);
	const startLevel = useGameStore((s) => s.startLevel);
	const setPlayMode = useGameStore((s) => s.setPlayMode);
	const dailyPartsState = useGameStore((s) => s.dailyParts);
	const prog = xpProgress(xp);
	const day = (/* @__PURE__ */ new Date()).getDate();
	const dailyLevel = Math.min(5, 1 + day % 5) || 1;
	const levelName = LEVEL_META[dailyLevel].name;
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const dp = dailyPartsState.date === today ? dailyPartsState : {
		date: today,
		math: false,
		language: false,
		english: false
	};
	const dailyParts = [
		{
			key: "math",
			done: dp.math,
			label: "Mates",
			start: () => {
				setPlayMode("official");
				startLevel("math", dailyLevel);
			}
		},
		{
			key: "language",
			done: dp.language,
			label: "Lengua",
			start: () => {
				setPlayMode("official");
				startLevel("language", dailyLevel);
			}
		},
		{
			key: "english",
			done: dp.english,
			label: "English",
			start: () => {
				setPlayMode("official");
				startLevel("english", dailyLevel);
			}
		}
	];
	const dailyDone = dailyParts.filter((p) => p.done).length;
	const nextPart = dailyParts.find((p) => !p.done) ?? null;
	const showDiagInvite = !diagnosticDone && !diagnosticSkipped;
	const zones = [
		{
			id: "math",
			title: "Torre de Números",
			subtitle: "5 niveles · baúl aleatorio + guardián",
			icon: WandSparkles,
			accent: "text-primary bg-primary/15",
			progress: `${mathCompleted.length} partidas`
		},
		{
			id: "language",
			title: "Biblioteca Misteriosa",
			subtitle: "Elige nivel · 5 retos al azar",
			icon: BookOpen,
			accent: "text-accent bg-accent/15",
			progress: `${languageCompleted.length} partidas`
		},
		{
			id: "english",
			title: "Cámara del Inglés",
			subtitle: "Levels + Sphinx trial",
			icon: Languages,
			accent: "text-accent-2 bg-accent-2/15",
			progress: `${englishCompleted.length} partidas`
		},
		{
			id: "reading",
			title: "Salón de Lectura",
			subtitle: "2 fichas de libros de verano",
			icon: Sparkles,
			accent: "text-success bg-success/15",
			progress: `${books.filter((b) => b.completed).length}/2`
		},
		{
			id: "progress",
			title: "Sala de Trofeos",
			subtitle: `${badges.length} insignias · roleta mágica`,
			icon: Trophy,
			accent: "text-primary bg-primary/15",
			progress: null
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "animate-fade-in space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden rounded-2xl border border-border bg-card p-5 card-glow sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-accent/20 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex items-start gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setView("avatar"),
						className: "shrink-0",
						"aria-label": "Personalizar avatar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarPortrait, { size: "md" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1 space-y-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map$1, {
									className: "h-3.5 w-3.5",
									"aria-hidden": true
								}), "Academia Arcana · Verano"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "font-display text-2xl font-semibold tracking-tight text-fg text-balance sm:text-3xl",
								children: [
									"¡Hola, ",
									name,
									"!"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									"Nivel ",
									prog.level,
									" · ",
									prog.title
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex max-w-[12rem] flex-col gap-1 pt-1 text-xs text-muted",
								children: ["Tu nombre de maga", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: name,
									onChange: (e) => setName(e.target.value),
									className: "min-h-11 rounded-lg border border-border bg-surface px-3 text-sm text-fg outline-none ring-primary focus:ring-2",
									maxLength: 20
								})]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-border bg-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: "Elige tu look mágico. Se guarda solo y no se olvida al volver."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden rounded-2xl border-2 border-danger/50 bg-gradient-to-br from-danger/20 via-card to-primary/10 p-5 shadow-lg sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute -right-6 top-0 text-7xl opacity-15",
					"aria-hidden": true,
					children: "🔥"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-11 w-11 place-items-center rounded-xl bg-danger/25 text-danger",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
									className: "h-6 w-6",
									"aria-hidden": true
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold uppercase tracking-wide text-danger",
								children: "Lo más importante hoy"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-display text-xl font-semibold text-fg sm:text-2xl",
								children: ["Misión de hoy · ", levelName]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base text-muted",
							children: dailyDone === 3 ? "¡Ritual completo! Puedes repasar o explorar el mapa." : "3 partes cortas · mates + lengua + un poco de inglés. ¡1 toque para seguir!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-2",
							children: dailyParts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("h-3 flex-1 rounded-full", p.done ? "bg-success" : "bg-surface-2"),
								title: p.label
							}, p.key))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-medium text-fg",
							children: [dailyDone, "/3 hechas"]
						}),
						dailyDone < 3 && nextPart ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: nextPart.start,
							className: "flex min-h-16 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-lg font-bold text-primary-fg shadow-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
								className: "h-6 w-6",
								"aria-hidden": true
							}), dailyDone === 0 ? "¡Empezar misión de hoy!" : `Continuar: ${nextPart.label}`]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setView("daily"),
							className: "flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border border-success/40 bg-success/15 text-base font-semibold text-success",
							children: "Ver ritual completo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setView("daily"),
							className: "min-h-11 w-full text-sm font-medium text-muted underline-offset-2 hover:text-fg hover:underline",
							children: "Ver las 3 partes del día"
						})
					]
				})]
			}),
			showDiagInvite && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-accent/40 bg-accent/10 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-base font-semibold text-fg",
						children: "¿Primera vez en la Academia?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Diagnóstico mágico opcional (7 preguntas). Te sugiere por dónde empezar."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-2 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setView("diagnostic"),
							className: "min-h-12 rounded-xl bg-accent px-4 font-semibold text-white",
							children: "Hacer diagnóstico"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => useGameStore.getState().skipDiagnostic(),
							className: "min-h-12 rounded-xl border border-border bg-surface font-medium text-fg",
							children: "Ahora no"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-border bg-card p-4 sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold text-fg",
						children: "Tu progreso"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setView("progress"),
						className: "min-h-10 text-sm font-medium text-primary",
						children: "Ver todo →"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressPanel, { compact: true })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-display text-lg font-semibold text-fg",
				children: "Explorar el mapa"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: zones.map((z) => {
					const Icon = z.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setView(z.id),
						className: cn("group flex min-h-[4.75rem] items-start gap-3 rounded-2xl border border-border bg-card p-4 text-left transition", "hover:border-primary/40 hover:bg-surface active:scale-[0.99]"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("grid h-12 w-12 shrink-0 place-items-center rounded-xl", z.accent),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "h-6 w-6",
								"aria-hidden": true
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-base font-semibold text-fg",
									children: z.title
								}), z.progress && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 rounded-full bg-surface-2 px-2 py-0.5 text-xs tabular-nums text-muted",
									children: z.progress
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 block text-sm text-muted",
								children: z.subtitle
							})]
						})]
					}, z.id);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-sm text-muted",
				children: "Consejo: un poquito cada día = magia que se queda."
			})
		]
	});
}
function DailyMission() {
	const setView = useGameStore((s) => s.setView);
	const setPlayMode = useGameStore((s) => s.setPlayMode);
	const startLevel = useGameStore((s) => s.startLevel);
	const name = useGameStore((s) => s.playerName);
	const suggestedFocus = useGameStore((s) => s.suggestedFocus);
	const dailyPartsState = useGameStore((s) => s.dailyParts);
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const dp = dailyPartsState.date === today ? dailyPartsState : {
		date: today,
		math: false,
		language: false,
		english: false
	};
	const day = (/* @__PURE__ */ new Date()).getDate();
	const level = Math.min(5, 1 + day % 5) || 1;
	const levelName = LEVEL_META[level].name;
	const items = [
		{
			key: "math",
			title: "Torre · partida del día",
			desc: `Nivel ${levelName} · 5 preguntas al azar`,
			emoji: "🔢",
			done: dp.math,
			action: () => {
				setPlayMode("official");
				startLevel("math", level);
			}
		},
		{
			key: "language",
			title: "Biblioteca · partida del día",
			desc: `Nivel ${levelName} · 5 retos de lengua`,
			emoji: "📖",
			done: dp.language,
			action: () => {
				setPlayMode("official");
				startLevel("language", level);
			}
		},
		{
			key: "english",
			title: "English · partida del día",
			desc: `Level ${levelName} · 5 English spells`,
			emoji: "🇬🇧",
			done: dp.english,
			action: () => {
				setPlayMode("official");
				startLevel("english", level);
			}
		}
	];
	const doneCount = items.filter((i) => i.done).length;
	const next = items.find((i) => !i.done) ?? items[0];
	const focusHint = suggestedFocus === "math" ? "Tu diagnóstico sugirió practicar mates." : suggestedFocus === "language" ? "Tu diagnóstico sugirió lengua." : suggestedFocus === "english" ? "Tu diagnóstico sugirió inglés." : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg animate-fade-in space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "inline-flex items-center gap-1.5 text-sm font-medium text-danger",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
							className: "h-4 w-4",
							"aria-hidden": true
						}), "Misión de hoy"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-display text-2xl font-semibold text-fg sm:text-3xl",
						children: ["Tu ritual de magia, ", name]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-base text-muted",
						children: [
							"Tres partidas cortas (nivel del día: ",
							levelName,
							"). Cada una sortea preguntas nuevas."
						]
					})
				]
			}),
			focusHint && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mr-1 inline h-4 w-4 text-accent" }), focusHint]
			}),
			doneCount < 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: next.action,
				className: "flex min-h-16 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-lg font-bold text-primary-fg shadow-lg card-glow",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
					className: "h-6 w-6",
					"aria-hidden": true
				}), doneCount === 0 ? `Empezar: ${next.title}` : `Continuar: ${next.title}`]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: cn("flex items-center gap-3 rounded-2xl border p-4", item.done ? "border-success/40 bg-success/10" : "border-border bg-card"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-2xl",
							"aria-hidden": true,
							children: item.done ? "✅" : item.emoji
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-fg",
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: item.desc
							})]
						}),
						item.done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-6 w-6 shrink-0 text-success" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: item.action,
							className: "min-h-11 shrink-0 rounded-xl bg-primary px-3 text-sm font-semibold text-primary-fg",
							children: "Jugar"
						})
					]
				}, item.key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setView("home"),
				className: "min-h-11 w-full text-sm font-medium text-muted",
				children: "Volver al mapa"
			})
		]
	});
}
function ModeToggle({ className }) {
	const mode = useGameStore((s) => s.playMode);
	const setPlayMode = useGameStore((s) => s.setPlayMode);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("space-y-2", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium text-muted",
			children: "Elige tu modo mágico"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeCard, {
				active: mode === "practice",
				onClick: () => setPlayMode("practice"),
				icon: Dumbbell,
				title: "Modo Entrenamiento",
				desc: "Practica sin presión. No sube el progreso oficial ni da puntos."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeCard, {
				active: mode === "official",
				onClick: () => setPlayMode("official"),
				icon: Scroll,
				title: "Misión oficial",
				desc: "Cuenta para el progreso, da puntos y avanza la barra."
			})]
		})]
	});
}
function ModeCard({ active, onClick, icon: Icon, title, desc }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: cn("flex min-h-[5.5rem] flex-col items-start gap-1 rounded-xl border p-3 text-left transition", active ? "border-primary bg-primary/15 ring-2 ring-primary/40" : "border-border bg-card hover:border-primary/30"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1.5 text-sm font-semibold text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "h-4 w-4 text-primary",
				"aria-hidden": true
			}), title]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[11px] leading-snug text-muted",
			children: desc
		})]
	});
}
function ModeBadge({ mode }) {
	const official = mode === "official";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold", official ? "bg-primary/20 text-primary" : "bg-accent-2/20 text-accent-2"),
		children: official ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scroll, {
			className: "h-3 w-3",
			"aria-hidden": true
		}), " Misión oficial"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, {
			className: "h-3 w-3",
			"aria-hidden": true
		}), " Entrenamiento"] })
	});
}
function BossGate({ zone, completed, title, blurb }) {
	const startBoss = useGameStore((s) => s.startBoss);
	const beaten = useGameStore((s) => s.bossBeaten[zone]);
	const open = bossUnlocked(zone, completed);
	const need = BOSS_UNLOCK[zone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		disabled: !open,
		onClick: () => open && startBoss(zone),
		className: cn("flex w-full items-start gap-3 rounded-xl border p-4 text-left transition", beaten ? "border-success/40 bg-success/10" : open ? "border-danger/40 bg-danger/10 hover:border-danger/60" : "cursor-not-allowed border-border bg-surface/50 opacity-70"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-card",
			children: beaten ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-5 w-5 text-success" }) : open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, { className: "h-5 w-5 text-danger" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-5 w-5 text-muted" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0 flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-display font-semibold text-fg",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-0.5 block text-sm text-muted",
					children: blurb
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-xs text-muted",
					children: beaten ? "¡Prueba superada! Puedes repetir por diversión." : open ? "5 preguntas finales · recompensa especial" : `Desbloquea con ${need} misiones oficiales (${completed}/${need})`
				})
			]
		})]
	});
}
var LEVELS = [
	1,
	2,
	3,
	4,
	5
];
function LevelPicker({ area, onPick, runsByLevel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 sm:grid-cols-2",
		children: LEVELS.map((lv) => {
			const meta = LEVEL_META[lv];
			const n = countInLevel(area, lv);
			const runs = runsByLevel?.[lv] ?? 0;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onPick(lv),
				className: cn("flex min-h-[5.5rem] flex-col items-start gap-1 rounded-2xl border border-border bg-card p-4 text-left transition", "hover:border-primary/50 hover:bg-surface active:scale-[0.99]"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-2xl",
						"aria-hidden": true,
						children: meta.emoji
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg font-semibold text-fg",
						children: meta.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted",
						children: meta.blurb
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-1 text-xs text-muted",
						children: [
							n,
							" preguntas en el baúl · ",
							runs,
							" partidas hechas"
						]
					})
				]
			}, lv);
		})
	});
}
function MathMap() {
	const startLevel = useGameStore((s) => s.startLevel);
	const mathCompleted = useGameStore((s) => s.mathCompleted);
	const levelRuns = useGameStore((s) => s.levelRuns.math);
	const areaSessionCount = useGameStore((s) => s.areaSessionCount.math);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "inline-flex items-center gap-1.5 text-sm font-medium text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, {
							className: "h-4 w-4",
							"aria-hidden": true
						}), "Torre de Números"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl font-semibold text-fg",
						children: "Elige tu nivel"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "El baúl sortea 5 preguntas al azar de ese nivel. ¡Cada partida es distinta!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-medium text-fg",
						children: [
							"Partidas oficiales: ",
							areaSessionCount,
							" · (para el guardián: ",
							mathCompleted.length,
							")"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeToggle, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BossGate, {
				zone: "math",
				completed: mathCompleted.length,
				title: "Batalla final: Guardián de los Números",
				blurb: "Cinco hechizos difíciles al final de la Torre."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LevelPicker, {
				area: "math",
				runsByLevel: levelRuns,
				onPick: (level) => startLevel("math", level)
			})
		]
	});
}
var MATH_TASKS = [
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
				"answer": 1e4,
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
				"answer": 2e3,
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
				"answer": 1e3,
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
				"answer": 2e3,
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
var TYPE_LABELS = {
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
/** Richer math explanation (2–4 sentences, kid-friendly) */
function enrichMathExplanation(ex) {
	const base = ex.explanation.trim();
	if (base.length > 140) return base;
	return `${base} ${{
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
		geometria: "El perímetro es la suma de los lados."
	}[ex.type] ?? ""} ¡Con calma lo lograrás!`.trim();
}
function missionTier(percent) {
	if (percent >= 80) return "great";
	if (percent >= 50) return "ok";
	return "low";
}
function missionMessages(tier, name) {
	if (tier === "great") return {
		title: `¡Brillante, ${name}!`,
		body: "Tu magia brilla con fuerza. Has acertado casi todo: la Academia Arcana está orgullosa de ti."
	};
	if (tier === "ok") return {
		title: `¡Buen camino, ${name}!`,
		body: "Vas bien. Un poco más de práctica y llegarás a la maestría. ¡Tú puedes!"
	};
	return {
		title: `¡Ánimo, ${name}!`,
		body: "Errar también enseña. Vuelve al Entrenamiento, repite con calma y verás cómo sube tu poder."
	};
}
function practiceSuggestion(failTags, area) {
	const counts = /* @__PURE__ */ new Map();
	for (const t of failTags) counts.set(t, (counts.get(t) ?? 0) + 1);
	let top = "";
	let n = 0;
	for (const [k, v] of counts) if (v > n) {
		top = k;
		n = v;
	}
	const focus = {
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
		complete: "completar frases"
	}[top] ?? top;
	if (!focus) return area === "english" ? "Te recomiendo practicar un poco más en el Modo Entrenamiento." : "Te recomiendo practicar más en el Modo Entrenamiento.";
	return `Te recomiendo practicar más ${focus} en el Modo Entrenamiento.`;
}
/** Soft UI sounds via Web Audio (no asset files). */
var audioCtx = null;
function getCtx() {
	if (typeof window === "undefined") return null;
	try {
		if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		if (audioCtx.state === "suspended") audioCtx.resume();
		return audioCtx;
	} catch {
		return null;
	}
}
function tone(freq, start, duration, type, gainPeak) {
	const ctx = getCtx();
	if (!ctx) return;
	const osc = ctx.createOscillator();
	const gain = ctx.createGain();
	osc.type = type;
	osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
	gain.gain.setValueAtTime(1e-4, ctx.currentTime + start);
	gain.gain.exponentialRampToValueAtTime(gainPeak, ctx.currentTime + start + .02);
	gain.gain.exponentialRampToValueAtTime(1e-4, ctx.currentTime + start + duration);
	osc.connect(gain);
	gain.connect(ctx.destination);
	osc.start(ctx.currentTime + start);
	osc.stop(ctx.currentTime + start + duration + .02);
}
/** Happy ascending chime when the answer is correct */
function playCorrect() {
	tone(523.25, 0, .12, "sine", .12);
	tone(659.25, .08, .12, "sine", .11);
	tone(783.99, .16, .18, "triangle", .1);
}
/** Soft low buzz when the answer is wrong */
function playWrong() {
	tone(220, 0, .1, "square", .04);
	tone(165, .08, .16, "square", .03);
}
/** Mission summary: great result — lively fanfare */
function playMissionGreat() {
	tone(523.25, 0, .12, "triangle", .1);
	tone(659.25, .1, .12, "triangle", .1);
	tone(783.99, .2, .12, "triangle", .1);
	tone(1046.5, .32, .28, "sine", .12);
	tone(783.99, .45, .2, "sine", .08);
}
/** Mission summary: ok result — neutral soft arpeggio */
function playMissionOk() {
	tone(392, 0, .15, "sine", .08);
	tone(493.88, .14, .15, "sine", .08);
	tone(587.33, .28, .22, "triangle", .07);
}
/** Mission summary: low score — funny soft “puér puér puér” sad beeps */
function playMissionLow() {
	tone(330, 0, .14, "square", .035);
	tone(277, .16, .14, "square", .03);
	tone(220, .32, .18, "square", .035);
	tone(185, .5, .22, "triangle", .03);
}
function playMissionResult(tier) {
	if (tier === "great") playMissionGreat();
	else if (tier === "ok") playMissionOk();
	else playMissionLow();
}
function AnswerFeedback({ kind, title, body, correctAnswer, points, practice }) {
	if (kind === "ok") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden rounded-xl bg-success/10 p-4 text-base text-success",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0 confetti-burst",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex items-start gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 h-6 w-6 shrink-0" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg font-semibold",
						children: title
					}),
					practice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Entrenamiento: ¡bien practicado! (sin puntos oficiales)"
					}) : points && points > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm",
						children: [
							"+",
							points,
							" puntos de magia"
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Ya tenías este hechizo oficial"
					}),
					body && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: body
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
					className: "ml-auto h-6 w-6 shrink-0 animate-pulse text-primary",
					"aria-hidden": true
				})
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-xl bg-danger/10 p-4 text-base",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-2 text-danger",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "mt-0.5 h-6 w-6 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg font-semibold",
						children: title
					}),
					correctAnswer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-base text-fg",
						children: [
							"Respuesta correcta:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-success",
								children: correctAnswer
							})
						]
					}),
					body && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted sm:text-base",
						children: body
					})
				]
			})]
		})
	});
}
function HintBox({ text, used }) {
	if (!used) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: cn("rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm leading-relaxed text-muted sm:text-base"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium text-accent",
			children: "Pista: "
		}), text]
	});
}
function MissionSummary({ correct, wrong, failTags, area, playerName, onContinue, practiceLabel, onPractice }) {
	const total = correct + wrong;
	const percent = total === 0 ? 0 : Math.round(correct / total * 100);
	const tier = missionTier(percent);
	const msg = missionMessages(tier, playerName);
	const suggestion = percent < 50 ? practiceSuggestion(failTags, area) : null;
	(0, import_react.useEffect)(() => {
		playMissionResult(tier);
	}, [tier]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("mx-auto max-w-lg space-y-5 rounded-xl border p-6", tier === "great" && "border-success/40 bg-success/10", tier === "ok" && "border-primary/40 bg-primary/10", tier === "low" && "border-accent/40 bg-accent/10"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [tier === "great" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
					className: "h-8 w-8 shrink-0 text-primary",
					"aria-hidden": true
				}) : tier === "ok" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsUp, {
					className: "h-8 w-8 shrink-0 text-accent-2",
					"aria-hidden": true
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {
					className: "h-8 w-8 shrink-0 text-accent",
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold text-fg",
					children: msg.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm leading-relaxed text-muted sm:text-base",
					children: msg.body
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
						label: "Aciertos",
						value: String(correct),
						tone: "success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
						label: "Errores",
						value: String(wrong),
						tone: "danger"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
						label: "Porcentaje",
						value: `${percent}%`,
						tone: "primary"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-3 overflow-hidden rounded-full bg-surface-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("h-full rounded-full transition-all duration-500", tier === "great" && "bg-success", tier === "ok" && "bg-primary", tier === "low" && "bg-accent"),
					style: { width: `${percent}%` }
				})
			}),
			suggestion && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rounded-lg border border-border bg-card/80 px-3 py-3 text-sm leading-relaxed text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold text-primary",
					children: "Consejo mágico: "
				}), suggestion]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onContinue,
					className: "min-h-12 flex-1 rounded-lg bg-primary px-4 text-base font-semibold text-primary-fg",
					children: "Continuar"
				}), suggestion && onPractice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onPractice,
					className: "min-h-12 flex-1 rounded-lg border border-border bg-surface px-4 text-sm font-medium text-fg",
					children: practiceLabel ?? "Ir a Entrenamiento"
				})]
			})
		]
	});
}
function Stat$1({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-3 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("font-display text-xl font-semibold tabular-nums", tone === "success" ? "text-success" : tone === "danger" ? "text-danger" : "text-primary"),
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: label
		})]
	});
}
/**
* Standard action row for all subjects:
* - Before answer: Comprobar (+ optional hint)
* - After answer: Siguiente pregunta / Ver resumen
*/
function PlayActions({ answered, isLast, onCheck, onNext, onHint, hintUsed, showHint = true, checkLabel = "Comprobar" }) {
	if (answered) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: onNext,
		className: "min-h-14 w-full rounded-xl bg-primary text-base font-bold text-primary-fg shadow-md",
		children: isLast ? "Ver resumen" : "Siguiente pregunta"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex w-full flex-wrap gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: onCheck,
			className: "min-h-14 min-w-0 flex-1 rounded-xl bg-primary text-base font-semibold text-primary-fg",
			children: checkLabel
		}), showHint && onHint && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: onHint,
			disabled: hintUsed,
			className: "inline-flex min-h-14 shrink-0 items-center gap-1.5 rounded-xl border border-border bg-surface px-3 text-sm text-muted disabled:opacity-50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { className: "h-4 w-4" }), hintUsed ? "Pista usada" : "Pista"]
		})]
	});
}
var typeColor = {
	suma: "bg-accent-2/15 text-accent-2",
	resta: "bg-danger/15 text-danger",
	multiplicacion: "bg-primary/15 text-primary",
	division: "bg-accent/15 text-accent",
	problema: "bg-success/15 text-success",
	calculo_mental: "bg-primary/20 text-primary",
	valor_posicional: "bg-accent/20 text-accent",
	comparacion: "bg-accent-2/20 text-accent-2",
	fraccion: "bg-success/20 text-success",
	decimal: "bg-primary/15 text-primary",
	medida: "bg-accent-2/15 text-accent-2",
	geometria: "bg-accent/15 text-accent"
};
function MathPlay() {
	const session = useGameStore((s) => s.session);
	const setView = useGameStore((s) => s.setView);
	const playMode = useGameStore((s) => s.playMode);
	const playerName = useGameStore((s) => s.playerName);
	const awardCorrect = useGameStore((s) => s.awardCorrect);
	const awardWrong = useGameStore((s) => s.awardWrong);
	const recordSkill = useGameStore((s) => s.recordSkill);
	const setPlayMode = useGameStore((s) => s.setPlayMode);
	const completeSession = useGameStore((s) => s.completeSession);
	const clearSession = useGameStore((s) => s.clearSession);
	const recordPerfectMission = useGameStore((s) => s.recordPerfectMission);
	const [sessionSnap] = (0, import_react.useState)(() => {
		const s = useGameStore.getState().session;
		if (!s || s.area !== "math") return [];
		return s.ids.map((id) => MATH_BANK.find((q) => q.id === id)).filter(Boolean);
	});
	const [levelSnap] = (0, import_react.useState)(() => useGameStore.getState().session?.level ?? 1);
	const questions = (0, import_react.useMemo)(() => {
		if (sessionSnap.length > 0) return sessionSnap;
		if (!session || session.area !== "math") return [];
		return session.ids.map((id) => MATH_BANK.find((q) => q.id === id)).filter(Boolean);
	}, [session, sessionSnap]);
	const [idx, setIdx] = (0, import_react.useState)(0);
	const [input, setInput] = (0, import_react.useState)("");
	const [feedback, setFeedback] = (0, import_react.useState)(null);
	const [earnedPts, setEarnedPts] = (0, import_react.useState)(0);
	const [hintUsed, setHintUsed] = (0, import_react.useState)(false);
	const [correctCount, setCorrectCount] = (0, import_react.useState)(0);
	const [wrongCount, setWrongCount] = (0, import_react.useState)(0);
	const [failTags, setFailTags] = (0, import_react.useState)([]);
	const [showSummary, setShowSummary] = (0, import_react.useState)(false);
	if (showSummary) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionSummary, {
		correct: correctCount,
		wrong: wrongCount,
		failTags,
		area: "math",
		playerName,
		onContinue: () => {
			clearSession();
			setView("math");
		},
		practiceLabel: "Practicar en Entrenamiento",
		onPractice: () => {
			setPlayMode("practice");
			clearSession();
			setView("math");
		}
	});
	if (questions.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "Elige un nivel en la Torre de Números."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setView("math"),
			className: "text-primary",
			children: "Volver"
		})]
	});
	const ex = questions[idx];
	const practice = playMode === "practice";
	const answered = feedback === "ok" || feedback === "bad";
	const explanation = enrichMathExplanation({
		type: ex.type,
		prompt: ex.prompt,
		answer: ex.answer,
		hint: ex.hint,
		explanation: ex.explanation
	});
	const levelName = LEVEL_META[levelSnap].name;
	function submit() {
		if (answered) return;
		const n = normalizeNumberInput(input);
		if (n === null) {
			setFeedback("bad");
			setEarnedPts(0);
			playWrong();
			setWrongCount((c) => c + 1);
			setFailTags((t) => [...t, ex.type]);
			recordSkill(ex.type, "bad");
			awardWrong();
			return;
		}
		if (n === ex.answer) {
			const basePts = ex.type === "problema" ? 15 : 10;
			setEarnedPts(practice ? 0 : basePts);
			setFeedback("ok");
			playCorrect();
			setCorrectCount((c) => c + 1);
			recordSkill(ex.type, "ok");
			awardCorrect(practice ? 0 : basePts);
		} else {
			setFeedback("bad");
			setEarnedPts(0);
			playWrong();
			awardWrong();
			setWrongCount((c) => c + 1);
			setFailTags((t) => [...t, ex.type]);
			recordSkill(ex.type, "bad");
		}
	}
	function next() {
		if (idx < questions.length - 1) {
			setIdx(idx + 1);
			setInput("");
			setFeedback(null);
			setEarnedPts(0);
			setHintUsed(false);
		} else {
			if (wrongCount === 0 && correctCount > 0 && playMode === "official") recordPerfectMission();
			completeSession();
			setShowSummary(true);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							clearSession();
							setView("math");
						},
						className: "grid h-11 w-11 place-items-center rounded-lg border border-border bg-surface",
						"aria-label": "Volver",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								"Nivel ",
								levelName,
								" · ",
								idx + 1,
								"/",
								questions.length,
								practice ? " · entrenamiento" : " · misión oficial"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-xl font-semibold text-fg",
							children: "Torre de Números"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeBadge, { mode: playMode })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1.5",
				children: questions.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-2.5 flex-1 rounded-full", i < idx ? "bg-success" : i === idx ? "bg-primary" : "bg-surface-2") }, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 rounded-xl border border-border bg-card p-5 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("inline-flex rounded-full px-3 py-1 text-sm font-semibold", typeColor[ex.type] ?? "bg-surface-2 text-fg"),
						children: TYPE_LABELS[ex.type] ?? ex.type
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whitespace-pre-line font-display text-xl font-semibold leading-relaxed text-fg sm:text-2xl",
						children: ex.prompt
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted",
							children: "Tu respuesta (número entero)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							inputMode: "numeric",
							value: input,
							onChange: (e) => setInput(e.target.value),
							onKeyDown: (e) => e.key === "Enter" && !answered && submit(),
							className: "min-h-14 w-full rounded-xl border border-border bg-surface px-4 text-xl tabular-nums text-fg outline-none ring-primary focus:ring-2",
							placeholder: "Escribe aquí…",
							disabled: answered
						})]
					}),
					feedback === "ok" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnswerFeedback, {
						kind: "ok",
						title: "¡Correcto! ¡Eres una maga del cálculo!",
						points: earnedPts,
						practice
					}),
					feedback === "bad" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnswerFeedback, {
						kind: "bad",
						title: "¡Casi! La magia se entrena con calma.",
						correctAnswer: String(ex.answer),
						body: explanation
					}),
					!answered && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HintBox, {
						text: ex.hint,
						used: hintUsed
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayActions, {
						answered,
						isLast: idx >= questions.length - 1,
						onCheck: submit,
						onNext: next,
						onHint: () => setHintUsed(true),
						hintUsed
					})
				]
			})
		]
	});
}
function LanguageMap() {
	const startLevel = useGameStore((s) => s.startLevel);
	const languageCompleted = useGameStore((s) => s.languageCompleted);
	const levelRuns = useGameStore((s) => s.levelRuns.language);
	const areaSessionCount = useGameStore((s) => s.areaSessionCount.language);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "inline-flex items-center gap-1.5 text-sm font-medium text-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
							className: "h-4 w-4",
							"aria-hidden": true
						}), "Biblioteca Misteriosa"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl font-semibold text-fg",
						children: "Elige tu nivel"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Sujeto, predicado, verbos, tipos de oración y ortografía — 5 retos al azar por partida."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-medium text-fg",
						children: ["Partidas oficiales: ", areaSessionCount]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeToggle, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BossGate, {
				zone: "language",
				completed: languageCompleted.length,
				title: "Batalla final: Bibliotecaria de las Sombras",
				blurb: "Cinco retos finales de la biblioteca."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LevelPicker, {
				area: "language",
				runsByLevel: levelRuns,
				onPick: (level) => startLevel("language", level)
			})
		]
	});
}
/** Fisher–Yates shuffle — new random order every call */
function shuffleArray(arr) {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const t = a[i];
		a[i] = a[j];
		a[j] = t;
	}
	return a;
}
/** Unique options; ensures correct answer is included; random order */
function shuffleAnswerOptions(options, correct) {
	return shuffleArray([...new Set([...options ?? [], correct].map((o) => o.trim()).filter(Boolean))]);
}
function LanguagePlay() {
	const setView = useGameStore((s) => s.setView);
	const playMode = useGameStore((s) => s.playMode);
	const playerName = useGameStore((s) => s.playerName);
	const awardCorrect = useGameStore((s) => s.awardCorrect);
	const awardWrong = useGameStore((s) => s.awardWrong);
	const recordSkill = useGameStore((s) => s.recordSkill);
	const setPlayMode = useGameStore((s) => s.setPlayMode);
	const completeSession = useGameStore((s) => s.completeSession);
	const clearSession = useGameStore((s) => s.clearSession);
	const [questions] = (0, import_react.useState)(() => {
		const s = useGameStore.getState().session;
		if (!s || s.area !== "language") return [];
		return s.ids.map((id) => LANG_BANK.find((q) => q.id === id)).filter(Boolean);
	});
	const [levelSnap] = (0, import_react.useState)(() => useGameStore.getState().session?.level ?? 1);
	const [idx, setIdx] = (0, import_react.useState)(0);
	const [choice, setChoice] = (0, import_react.useState)(null);
	const [feedback, setFeedback] = (0, import_react.useState)(null);
	const [earnedPts, setEarnedPts] = (0, import_react.useState)(0);
	const [hintUsed, setHintUsed] = (0, import_react.useState)(false);
	const [options, setOptions] = (0, import_react.useState)([]);
	const [correctCount, setCorrectCount] = (0, import_react.useState)(0);
	const [wrongCount, setWrongCount] = (0, import_react.useState)(0);
	const [failTags, setFailTags] = (0, import_react.useState)([]);
	const [showSummary, setShowSummary] = (0, import_react.useState)(false);
	const q = questions[idx];
	(0, import_react.useEffect)(() => {
		if (!q || showSummary) return;
		setOptions(shuffleAnswerOptions(q.options, q.answer));
		setChoice(null);
		setFeedback(null);
		setEarnedPts(0);
		setHintUsed(false);
	}, [
		q,
		idx,
		showSummary
	]);
	if (showSummary) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionSummary, {
		correct: correctCount,
		wrong: wrongCount,
		failTags,
		area: "language",
		playerName,
		onContinue: () => {
			clearSession();
			setView("language");
		},
		practiceLabel: "Practicar en Entrenamiento",
		onPractice: () => {
			setPlayMode("practice");
			clearSession();
			setView("language");
		}
	});
	if (!q) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => setView("language"),
		className: "text-primary",
		children: "Volver a la biblioteca"
	});
	const practice = playMode === "practice";
	const answered = feedback === "ok" || feedback === "bad";
	const levelName = LEVEL_META[levelSnap].name;
	function submit() {
		if (!choice || answered) return;
		if (normalizeAnswer(choice) === normalizeAnswer(q.answer)) {
			setEarnedPts(practice ? 0 : 12);
			setFeedback("ok");
			playCorrect();
			awardCorrect(practice ? 0 : 12);
			setCorrectCount((n) => n + 1);
			recordSkill(q.skillTag, "ok");
		} else {
			setFeedback("bad");
			setEarnedPts(0);
			playWrong();
			awardWrong();
			setWrongCount((n) => n + 1);
			setFailTags((t) => [...t, q.skillTag]);
			recordSkill(q.skillTag, "bad");
		}
	}
	function next() {
		if (idx < questions.length - 1) setIdx(idx + 1);
		else {
			completeSession();
			setShowSummary(true);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						clearSession();
						setView("language");
					},
					className: "grid h-11 w-11 place-items-center rounded-lg border border-border bg-surface",
					"aria-label": "Volver",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							"Nivel ",
							levelName,
							" · ",
							idx + 1,
							"/",
							questions.length
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-xl font-semibold text-fg",
						children: "Biblioteca Misteriosa"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeBadge, { mode: playMode })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5 rounded-xl border border-border bg-card p-5 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold text-fg sm:text-2xl",
					children: q.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-sm text-muted",
					children: q.tip
				})] }),
				q.showSentence && q.text && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border-2 border-accent/50 bg-surface-2 px-4 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs font-semibold uppercase tracking-wide text-accent",
						children: "Oración a analizar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl font-semibold text-fg",
						children: q.text
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2.5",
					children: options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: answered,
						onClick: () => setChoice(opt),
						className: cn("w-full min-h-14 rounded-xl border px-4 py-3 text-left text-base", choice === opt ? "border-primary bg-primary/15" : "border-border bg-surface"),
						children: opt
					}, opt))
				}),
				feedback === "ok" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnswerFeedback, {
					kind: "ok",
					title: "¡Bien! La biblioteca te sonríe.",
					points: earnedPts,
					practice
				}),
				feedback === "bad" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnswerFeedback, {
					kind: "bad",
					title: "¡Casi! Las palabras te esperan.",
					correctAnswer: q.answer,
					body: q.explanation
				}),
				!answered && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HintBox, {
					text: q.hint,
					used: hintUsed
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayActions, {
					answered,
					isLast: idx >= questions.length - 1,
					onCheck: submit,
					onNext: next,
					onHint: () => setHintUsed(true),
					hintUsed
				})
			]
		})]
	});
}
function EnglishMap() {
	const startLevel = useGameStore((s) => s.startLevel);
	const englishCompleted = useGameStore((s) => s.englishCompleted);
	const levelRuns = useGameStore((s) => s.levelRuns.english);
	const areaSessionCount = useGameStore((s) => s.areaSessionCount.english);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "inline-flex items-center gap-1.5 text-sm font-medium text-accent-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, {
							className: "h-4 w-4",
							"aria-hidden": true
						}), "Cámara del Inglés"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl font-semibold text-fg",
						children: "Choose your level"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Vocabulary + simple sentences — 5 random spells each run."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-medium text-fg",
						children: ["Partidas oficiales: ", areaSessionCount]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeToggle, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BossGate, {
				zone: "english",
				completed: englishCompleted.length,
				title: "Final Trial: English Sphinx",
				blurb: "Five English riddles from the Sphinx."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LevelPicker, {
				area: "english",
				runsByLevel: levelRuns,
				onPick: (level) => startLevel("english", level)
			})
		]
	});
}
function EnglishPlay() {
	const setView = useGameStore((s) => s.setView);
	const playMode = useGameStore((s) => s.playMode);
	const playerName = useGameStore((s) => s.playerName);
	const awardCorrect = useGameStore((s) => s.awardCorrect);
	const awardWrong = useGameStore((s) => s.awardWrong);
	const recordSkill = useGameStore((s) => s.recordSkill);
	const setPlayMode = useGameStore((s) => s.setPlayMode);
	const completeSession = useGameStore((s) => s.completeSession);
	const clearSession = useGameStore((s) => s.clearSession);
	const [questions] = (0, import_react.useState)(() => {
		const s = useGameStore.getState().session;
		if (!s || s.area !== "english") return [];
		return s.ids.map((id) => ENG_BANK.find((q) => q.id === id)).filter(Boolean);
	});
	const [levelSnap] = (0, import_react.useState)(() => useGameStore.getState().session?.level ?? 1);
	const [idx, setIdx] = (0, import_react.useState)(0);
	const [choice, setChoice] = (0, import_react.useState)(null);
	const [feedback, setFeedback] = (0, import_react.useState)(null);
	const [earnedPts, setEarnedPts] = (0, import_react.useState)(0);
	const [hintUsed, setHintUsed] = (0, import_react.useState)(false);
	const [options, setOptions] = (0, import_react.useState)([]);
	const [correctCount, setCorrectCount] = (0, import_react.useState)(0);
	const [wrongCount, setWrongCount] = (0, import_react.useState)(0);
	const [failTags, setFailTags] = (0, import_react.useState)([]);
	const [showSummary, setShowSummary] = (0, import_react.useState)(false);
	const q = questions[idx];
	(0, import_react.useEffect)(() => {
		if (!q || showSummary) return;
		setOptions(shuffleAnswerOptions(q.options, q.answer));
		setChoice(null);
		setFeedback(null);
		setEarnedPts(0);
		setHintUsed(false);
	}, [
		q,
		idx,
		showSummary
	]);
	if (showSummary) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionSummary, {
		correct: correctCount,
		wrong: wrongCount,
		failTags,
		area: "english",
		playerName,
		onContinue: () => {
			clearSession();
			setView("english");
		},
		practiceLabel: "Practice mode",
		onPractice: () => {
			setPlayMode("practice");
			clearSession();
			setView("english");
		}
	});
	if (!q) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => setView("english"),
		className: "text-primary",
		children: "Back"
	});
	const practice = playMode === "practice";
	const answered = feedback === "ok" || feedback === "bad";
	const levelName = LEVEL_META[levelSnap].name;
	function submit() {
		if (!choice || answered) return;
		if (normalizeAnswer(choice) === normalizeAnswer(q.answer)) {
			setEarnedPts(practice ? 0 : 10);
			setFeedback("ok");
			playCorrect();
			awardCorrect(practice ? 0 : 10);
			setCorrectCount((n) => n + 1);
			recordSkill(q.kind, "ok");
		} else {
			setFeedback("bad");
			setEarnedPts(0);
			playWrong();
			awardWrong();
			setWrongCount((n) => n + 1);
			setFailTags((t) => [...t, q.kind]);
			recordSkill(q.kind, "bad");
		}
	}
	function next() {
		if (idx < questions.length - 1) setIdx(idx + 1);
		else {
			completeSession();
			setShowSummary(true);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						clearSession();
						setView("english");
					},
					className: "grid h-11 w-11 place-items-center rounded-lg border border-border bg-surface",
					"aria-label": "Volver",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							"Level ",
							levelName,
							" · ",
							idx + 1,
							"/",
							questions.length
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-xl font-semibold text-fg",
						children: "Cámara del Inglés"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeBadge, { mode: playMode })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 rounded-xl border border-border bg-card p-5 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-base text-muted",
					children: q.promptEs
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl font-semibold text-fg sm:text-2xl",
					children: q.prompt
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2.5",
					children: options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: answered,
						onClick: () => setChoice(opt),
						className: cn("w-full min-h-14 rounded-xl border px-4 text-left text-base font-medium", choice === opt ? "border-accent-2 bg-accent-2/15" : "border-border bg-surface"),
						children: opt
					}, opt))
				}),
				feedback === "ok" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnswerFeedback, {
					kind: "ok",
					title: "Great! English magic works!",
					points: earnedPts,
					practice
				}),
				feedback === "bad" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnswerFeedback, {
					kind: "bad",
					title: "Almost! Remember this spell.",
					correctAnswer: q.answer,
					body: q.explanation
				}),
				!answered && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HintBox, {
					text: q.hint,
					used: hintUsed
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayActions, {
					answered,
					isLast: idx >= questions.length - 1,
					onCheck: submit,
					onNext: next,
					onHint: () => setHintUsed(true),
					hintUsed,
					checkLabel: "Comprobar"
				})
			]
		})]
	});
}
var DIBUJOS = [
	"⭐",
	"🐉",
	"🏰",
	"🔮",
	"🌙",
	"🦊",
	"📖",
	"⚔️",
	"🌟",
	"🦋"
];
function ReadingJournal() {
	const books = useGameStore((s) => s.books);
	const saveBook = useGameStore((s) => s.saveBook);
	const awardCorrect = useGameStore((s) => s.awardCorrect);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "inline-flex items-center gap-1.5 text-sm font-medium text-success",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookMarked, {
						className: "h-4 w-4",
						"aria-hidden": true
					}), "Salón de Lectura"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold text-fg",
					children: "Fichas de los dos libros"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "En las misiones de verano de Liz hay que leer dos libros y rellenar la ficha mágica. Completa cada ficha para ganar la insignia de lectora."
				})
			]
		}), [0, 1].map((idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookCard, {
			index: idx,
			book: books[idx],
			onSave: (data, firstComplete) => {
				saveBook(idx, data);
				if (firstComplete) awardCorrect(25);
			}
		}, idx))]
	});
}
function BookCard({ index, book, onSave }) {
	const wasDone = book.completed;
	function update(partial) {
		const next = {
			...book,
			...partial
		};
		const willComplete = next.titulo.trim().length > 0 && next.trata.trim().length > 10 && next.gusto.trim().length > 5 && next.nota > 0;
		onSave(partial, !wasDone && willComplete);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-4 rounded-xl border border-border bg-card p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-lg font-semibold text-fg",
					children: ["Libro ", index + 1]
				}), book.completed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-medium text-success",
					children: "Completa"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block space-y-1 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted",
					children: "Título"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: book.titulo,
					onChange: (e) => update({ titulo: e.target.value }),
					className: "min-h-11 w-full rounded-lg border border-border bg-surface px-3 text-fg outline-none ring-primary focus:ring-2",
					placeholder: "Título del libro"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block space-y-1 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted",
					children: "El libro trata…"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: book.trata,
					onChange: (e) => update({ trata: e.target.value }),
					rows: 3,
					className: "w-full rounded-lg border border-border bg-surface px-3 py-2 text-fg outline-none ring-primary focus:ring-2",
					placeholder: "Resume de qué va la historia…"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block space-y-1 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted",
					children: "Lo que más me ha gustado ha sido…"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: book.gusto,
					onChange: (e) => update({ gusto: e.target.value }),
					rows: 2,
					className: "w-full rounded-lg border border-border bg-surface px-3 py-2 text-fg outline-none ring-primary focus:ring-2",
					placeholder: "Personajes, magia, el final…"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted",
					children: "Mi nota"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1",
					children: [
						1,
						2,
						3,
						4,
						5
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => update({ nota: n }),
						className: "grid h-11 w-11 place-items-center rounded-lg border border-border bg-surface",
						"aria-label": `${n} estrellas`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("h-5 w-5", book.nota >= n ? "fill-primary text-primary" : "text-muted") })
					}, n))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted",
					children: "Mi dibujo (elige un sello mágico)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: DIBUJOS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => update({ dibujo: d }),
						className: cn("grid h-12 w-12 place-items-center rounded-full border text-xl transition", book.dibujo === d ? "scale-110 border-primary bg-primary/15" : "border-border bg-surface"),
						children: d
					}, d))
				})]
			})
		]
	});
}
function choice(title, tip, options, answer, explanation, skillTag, hint) {
	return {
		kind: "choice",
		title,
		tip,
		options,
		answer,
		explanation,
		skillTag,
		hint
	};
}
function nucleos(ns, np, explanation, hint) {
	return {
		kind: "nucleos",
		title: "Núcleos del SN y del SV",
		tip: "Escribe el núcleo del sujeto y el del predicado",
		nucleoSujeto: ns,
		nucleoPredicado: np,
		explanation,
		skillTag: "nucleos",
		hint
	};
}
var LANGUAGE_SENTENCES = [
	{
		id: 1,
		order: 1,
		level: 1,
		text: "Ana salta en el jardín.",
		showSentence: true,
		sujeto: "Ana",
		predicado: "salta en el jardín",
		sujetoOptions: [
			"Ana",
			"salta",
			"el jardín",
			"en el jardín"
		],
		predicadoOptions: [
			"salta en el jardín",
			"Ana",
			"el jardín",
			"salta"
		],
		explainSujeto: "¡Casi! El sujeto es quien hace la acción. Aquí «Ana» es quien salta.",
		explainPredicado: "¡Casi! El predicado es lo que se dice del sujeto: «salta en el jardín».",
		steps: [
			choice("1. ¿Cuál es el sujeto?", "Quién realiza la acción", [
				"Ana",
				"salta",
				"el jardín",
				"en el jardín"
			], "Ana", "¡Casi! El sujeto es la persona o cosa que hace la acción. En «Ana salta en el jardín», quien salta es Ana. Por eso el sujeto es «Ana».", "sujeto", "Pregunta: ¿quién salta?"),
			choice("2. ¿Cuál es el predicado?", "Qué se dice del sujeto", [
				"salta en el jardín",
				"Ana",
				"el jardín",
				"en"
			], "salta en el jardín", "¡Casi! El predicado es todo lo que se dice del sujeto, empezando por el verbo. Aquí: «salta en el jardín».", "predicado", "Empieza en el verbo «salta»."),
			choice("3. ¿Cuál es el verbo?", "La palabra de la acción", [
				"salta",
				"Ana",
				"jardín",
				"en"
			], "salta", "¡Casi! El verbo es la palabra que expresa la acción: «salta».", "verbo", "¿Qué acción hace Ana?")
		]
	},
	{
		id: 2,
		order: 2,
		level: 1,
		text: "El gato duerme.",
		showSentence: true,
		sujeto: "El gato",
		predicado: "duerme",
		sujetoOptions: [
			"El gato",
			"duerme",
			"gato",
			"El"
		],
		predicadoOptions: [
			"duerme",
			"El gato",
			"gato",
			"El"
		],
		explainSujeto: "El sujeto es «El gato»: quien duerme.",
		explainPredicado: "El predicado es «duerme»: lo que hace el gato.",
		steps: [
			choice("1. ¿Cuál es el sujeto?", "Quién realiza la acción", [
				"El gato",
				"duerme",
				"gato",
				"El"
			], "El gato", "¡Casi! El sujeto completo es «El gato» (artículo + sustantivo). Es quien duerme.", "sujeto", "¿Quién duerme?"),
			choice("2. ¿Cuál es el predicado?", "Qué se dice del sujeto", [
				"duerme",
				"El gato",
				"gato",
				"El"
			], "duerme", "¡Casi! El predicado aquí es solo el verbo «duerme».", "predicado", "¿Qué hace el gato?"),
			nucleos("gato", "duerme", "¡Casi! Núcleo del sujeto: «gato» (la palabra principal). Núcleo del predicado: el verbo «duerme».", "El núcleo del SN es el sustantivo; el del SV es el verbo.")
		]
	},
	{
		id: 3,
		order: 3,
		level: 1,
		text: "¿Viene Pedro mañana?",
		showSentence: true,
		sujeto: "Pedro",
		predicado: "Viene mañana",
		sujetoOptions: [
			"Pedro",
			"Viene",
			"mañana",
			"¿Viene"
		],
		predicadoOptions: [
			"Viene mañana",
			"Pedro",
			"mañana",
			"Viene"
		],
		explainSujeto: "El sujeto es Pedro.",
		explainPredicado: "El predicado es Viene mañana.",
		steps: [
			choice("1. Tipo de oración", "Según la intención del hablante", [
				"Interrogativa",
				"Enunciativa",
				"Exclamativa",
				"Imperativa"
			], "Interrogativa", "¡Casi! Lleva signos de interrogación (¿…?), así que es interrogativa: se usa para preguntar.", "tipo_oracion", "Mira los signos ¿ ?"),
			choice("2. ¿Cuál es el sujeto?", "Quién realiza la acción", [
				"Pedro",
				"Viene",
				"mañana",
				"¿Viene Pedro"
			], "Pedro", "¡Casi! Quien viene es Pedro. El sujeto es «Pedro».", "sujeto", "¿Quién viene?"),
			choice("3. ¿Cuál es el verbo?", "Palabra de la acción", [
				"Viene",
				"Pedro",
				"mañana",
				"¿"
			], "Viene", "¡Casi! El verbo es «Viene»: la acción de la oración.", "verbo", "¿Qué acción hay?")
		]
	},
	{
		id: 4,
		order: 4,
		level: 1,
		text: "Los niños juegan al balón.",
		showSentence: true,
		sujeto: "Los niños",
		predicado: "juegan al balón",
		sujetoOptions: [
			"Los niños",
			"juegan",
			"al balón",
			"niños"
		],
		predicadoOptions: [
			"juegan al balón",
			"Los niños",
			"al balón",
			"juegan"
		],
		explainSujeto: "Sujeto: Los niños.",
		explainPredicado: "Predicado: juegan al balón.",
		steps: [
			choice("1. ¿Cuál es el sujeto?", "Quién realiza la acción", [
				"Los niños",
				"juegan",
				"al balón",
				"balón"
			], "Los niños", "¡Casi! El sujeto es «Los niños»: ellos juegan.", "sujeto", "¿Quiénes juegan?"),
			choice("2. Separa: ¿dónde termina el sujeto?", "Sujeto | predicado", [
				"Los niños | juegan al balón",
				"Los | niños juegan al balón",
				"Los niños juegan | al balón",
				"Los niños juegan al | balón"
			], "Los niños | juegan al balón", "¡Casi! Primero el sujeto «Los niños» y después el predicado «juegan al balón».", "separar", "Corta antes del verbo."),
			choice("3. ¿Cuál es el verbo?", "Acción principal", [
				"juegan",
				"niños",
				"balón",
				"Los"
			], "juegan", "¡Casi! El verbo es «juegan».", "verbo", "¿Qué hacen los niños?")
		]
	},
	{
		id: 5,
		order: 5,
		level: 2,
		text: "María escribe una carta.",
		showSentence: true,
		sujeto: "María",
		predicado: "escribe una carta",
		sujetoOptions: [
			"María",
			"escribe",
			"una carta",
			"carta"
		],
		predicadoOptions: [
			"escribe una carta",
			"María",
			"una carta",
			"escribe"
		],
		explainSujeto: "Sujeto: María.",
		explainPredicado: "Predicado: escribe una carta.",
		steps: [
			choice("1. ¿Cuál es el sujeto?", "Quién hace la acción", [
				"María",
				"escribe",
				"una carta",
				"carta"
			], "María", "¡Casi! «María» es quien escribe. Ese es el sujeto.", "sujeto", "¿Quién escribe?"),
			choice("2. ¿Cuál es el predicado?", "Qué se dice del sujeto", [
				"escribe una carta",
				"María",
				"una carta",
				"escribe"
			], "escribe una carta", "¡Casi! El predicado completo es «escribe una carta».", "predicado", "Desde el verbo hasta el final."),
			choice("3. Morfología: «carta» es…", "Tipo de palabra", [
				"sustantivo",
				"verbo",
				"adjetivo",
				"adverbio"
			], "sustantivo", "¡Casi! «Carta» nombra una cosa: es un sustantivo.", "morfo", "¿Nombra una persona, animal o cosa?")
		]
	},
	{
		id: 6,
		order: 6,
		level: 2,
		text: "¡Qué bonita es la luna!",
		showSentence: true,
		sujeto: "la luna",
		predicado: "es bonita",
		sujetoOptions: [
			"la luna",
			"bonita",
			"es",
			"Qué"
		],
		predicadoOptions: [
			"es bonita",
			"la luna",
			"bonita",
			"Qué bonita"
		],
		explainSujeto: "Sujeto: la luna.",
		explainPredicado: "Predicado: es bonita (con el adjetivo).",
		steps: [
			choice("1. Tipo de oración", "Intención del hablante", [
				"Exclamativa",
				"Interrogativa",
				"Enunciativa",
				"Imperativa"
			], "Exclamativa", "¡Casi! Los signos ¡! marcan una oración exclamativa: expresa emoción.", "tipo_oracion", "Mira ¡ !"),
			choice("2. ¿Cuál es el sujeto?", "De quién se dice algo", [
				"la luna",
				"bonita",
				"es",
				"Qué"
			], "la luna", "¡Casi! Se habla de «la luna»: ese es el sujeto.", "sujeto", "¿De qué se dice que es bonita?"),
			choice("3. ¿Qué tipo de palabra es «bonita»?", "Morfología", [
				"adjetivo",
				"sustantivo",
				"verbo",
				"adverbio"
			], "adjetivo", "¡Casi! «Bonita» describe a la luna: es un adjetivo.", "morfo", "¿Describe cómo es algo?")
		]
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
			choice("Ortografía: elige la forma correcta", "Concordancia de género", [
				"La niña contenta juega.",
				"La niña contento juega.",
				"El niña contenta juega.",
				"La niño contenta juega."
			], "La niña contenta juega.", "¡Casi! «Niña» es femenino, así que el adjetivo va en femenino: contenta. Artículo «la».", "ortografia", "Mira el género: niña → contenta."),
			choice("Ortografía: ¿cuál está bien?", "Uso de mayúscula", [
				"Madrid es una ciudad.",
				"madrid es una ciudad.",
				"Madrid es Una ciudad.",
				"madrid Es una ciudad."
			], "Madrid es una ciudad.", "¡Casi! Los nombres propios (Madrid) llevan mayúscula. El resto va en minúscula, salvo el inicio.", "ortografia", "Los nombres de ciudades empiezan con mayúscula."),
			choice("Concordancia: elige la frase correcta", "Sujeto y verbo", [
				"Los perros corren rápido.",
				"Los perros corre rápido.",
				"El perros corren rápido.",
				"Los perro corren rápido."
			], "Los perros corren rápido.", "¡Casi! Sujeto plural «Los perros» → verbo en plural «corren».", "ortografia", "Plural con plural.")
		]
	},
	{
		id: 8,
		order: 8,
		level: 2,
		text: "Mis amigos cantan en el coro.",
		showSentence: true,
		sujeto: "Mis amigos",
		predicado: "cantan en el coro",
		sujetoOptions: [
			"Mis amigos",
			"cantan",
			"el coro",
			"en el coro"
		],
		predicadoOptions: [
			"cantan en el coro",
			"Mis amigos",
			"el coro",
			"cantan"
		],
		explainSujeto: "Sujeto: Mis amigos.",
		explainPredicado: "Predicado: cantan en el coro.",
		steps: [
			choice("1. ¿Cuál es el sujeto?", "Quién realiza la acción", [
				"Mis amigos",
				"cantan",
				"el coro",
				"Mis"
			], "Mis amigos", "¡Casi! Quienes cantan son «Mis amigos». Ese es el sujeto.", "sujeto", "¿Quiénes cantan?"),
			choice("2. ¿Cuál es el predicado?", "Qué se dice del sujeto", [
				"cantan en el coro",
				"Mis amigos",
				"en el coro",
				"amigos"
			], "cantan en el coro", "¡Casi! Predicado: «cantan en el coro».", "predicado", "Desde el verbo."),
			nucleos("amigos", "cantan", "¡Casi! Núcleo del sujeto: «amigos». Núcleo del predicado: «cantan».", "Sustantivo principal y verbo principal.")
		]
	},
	{
		id: 9,
		order: 9,
		level: 3,
		text: "Cierra la puerta, por favor.",
		showSentence: true,
		sujeto: "(tú)",
		predicado: "Cierra la puerta",
		sujetoOptions: [
			"(tú omitido)",
			"puerta",
			"Cierra",
			"favor"
		],
		predicadoOptions: [
			"Cierra la puerta",
			"por favor",
			"la puerta",
			"Cierra"
		],
		explainSujeto: "Sujeto omitido: tú.",
		explainPredicado: "Predicado: Cierra la puerta.",
		steps: [
			choice("1. Tipo de oración", "Intención", [
				"Imperativa",
				"Interrogativa",
				"Enunciativa",
				"Exclamativa"
			], "Imperativa", "¡Casi! Da una orden o ruego: «Cierra…». Es imperativa. El sujeto (tú) suele omitirse.", "tipo_oracion", "¿Es una orden o petición?"),
			choice("2. ¿Cuál es el verbo?", "Acción", [
				"Cierra",
				"puerta",
				"favor",
				"la"
			], "Cierra", "¡Casi! El verbo en imperativo es «Cierra».", "verbo", "¿Qué se pide hacer?"),
			choice("3. El sujeto de esta oración…", "Sujeto omitido", [
				"Está omitido (tú)",
				"Es «la puerta»",
				"Es «por favor»",
				"No hay sujeto posible"
			], "Está omitido (tú)", "¡Casi! En las imperativas el sujeto «tú» casi no se dice, pero se entiende.", "sujeto", "¿Quién debe cerrar?")
		]
	},
	{
		id: 10,
		order: 10,
		level: 3,
		text: "El mago antiguo abre el libro secreto.",
		showSentence: true,
		sujeto: "El mago antiguo",
		predicado: "abre el libro secreto",
		sujetoOptions: [
			"El mago antiguo",
			"abre",
			"el libro secreto",
			"mago"
		],
		predicadoOptions: [
			"abre el libro secreto",
			"El mago antiguo",
			"el libro secreto",
			"abre"
		],
		explainSujeto: "Sujeto: El mago antiguo.",
		explainPredicado: "Predicado: abre el libro secreto.",
		steps: [
			choice("1. ¿Cuál es el sujeto?", "Quién hace la acción", [
				"El mago antiguo",
				"abre",
				"el libro secreto",
				"libro"
			], "El mago antiguo", "¡Casi! El sujeto incluye el adjetivo: «El mago antiguo» es quien abre.", "sujeto", "¿Quién abre?"),
			choice("2. Separa sujeto y predicado", "Corte correcto", [
				"El mago antiguo | abre el libro secreto",
				"El mago | antiguo abre el libro secreto",
				"El mago antiguo abre | el libro secreto",
				"El | mago antiguo abre el libro secreto"
			], "El mago antiguo | abre el libro secreto", "¡Casi! Sujeto hasta antes del verbo: «El mago antiguo | abre el libro secreto».", "separar", "Corta delante de «abre»."),
			choice("3. «antiguo» es…", "Morfología", [
				"adjetivo",
				"sustantivo",
				"verbo",
				"adverbio"
			], "adjetivo", "¡Casi! «Antiguo» describe al mago: es adjetivo.", "morfo", "¿Describe al mago?")
		]
	},
	{
		id: 11,
		order: 11,
		level: 3,
		text: "Nosotros leemos cuentos de magia.",
		showSentence: true,
		sujeto: "Nosotros",
		predicado: "leemos cuentos de magia",
		sujetoOptions: [
			"Nosotros",
			"leemos",
			"cuentos de magia",
			"magia"
		],
		predicadoOptions: [
			"leemos cuentos de magia",
			"Nosotros",
			"cuentos de magia",
			"leemos"
		],
		explainSujeto: "Sujeto: Nosotros.",
		explainPredicado: "Predicado: leemos cuentos de magia.",
		steps: [
			choice("1. ¿Cuál es el sujeto?", "Quién", [
				"Nosotros",
				"leemos",
				"cuentos",
				"magia"
			], "Nosotros", "¡Casi! El pronombre «Nosotros» es el sujeto: quienes leen.", "sujeto", "¿Quiénes leen?"),
			choice("2. ¿Cuál es el predicado?", "Qué se dice", [
				"leemos cuentos de magia",
				"Nosotros",
				"cuentos de magia",
				"de magia"
			], "leemos cuentos de magia", "¡Casi! Todo desde el verbo: «leemos cuentos de magia».", "predicado", "Desde «leemos»."),
			choice("3. ¿Cuál es el verbo?", "Acción", [
				"leemos",
				"Nosotros",
				"cuentos",
				"magia"
			], "leemos", "¡Casi! El verbo es «leemos».", "verbo", "¿Qué hacemos?")
		]
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
			choice("Ortografía: elige la correcta", "b / v", [
				"El barco navega en el mar.",
				"El varco navega en el mar.",
				"El barco navega en el mab.",
				"El barco nabeга en el mar."
			], "El barco navega en el mar.", "¡Casi! Se escribe «barco» con b y «navega» con v. La frase correcta es la primera.", "ortografia", "Barco se escribe con b."),
			choice("Ortografía: plural correcto", "Concordancia", [
				"Las flores son bonitas.",
				"Las flores es bonitas.",
				"La flores son bonitas.",
				"Las flor son bonitas."
			], "Las flores son bonitas.", "¡Casi! Plural «Las flores» + verbo «son» + adjetivo «bonitas».", "ortografia", "Todo en plural."),
			choice("¿Qué oración es enunciativa?", "Tipo de oración", [
				"Hoy hace sol.",
				"¿Hoy hace sol?",
				"¡Hoy hace sol!",
				"Cierra la ventana."
			], "Hoy hace sol.", "¡Casi! Enunciativa: afirma algo con punto, sin ¿? ni ¡! ni orden.", "tipo_oracion", "Afirma algo con calma.")
		]
	},
	{
		id: 13,
		order: 13,
		level: 4,
		text: "Las estrellas brillan sobre la academia.",
		showSentence: true,
		sujeto: "Las estrellas",
		predicado: "brillan sobre la academia",
		sujetoOptions: [
			"Las estrellas",
			"brillan",
			"la academia",
			"sobre la academia"
		],
		predicadoOptions: [
			"brillan sobre la academia",
			"Las estrellas",
			"sobre la academia",
			"brillan"
		],
		explainSujeto: "Sujeto: Las estrellas.",
		explainPredicado: "Predicado: brillan sobre la academia.",
		steps: [
			choice("1. ¿Cuál es el sujeto?", "Quién / qué", [
				"Las estrellas",
				"brillan",
				"la academia",
				"sobre"
			], "Las estrellas", "¡Casi! Lo que brilla son «Las estrellas». Ese es el sujeto.", "sujeto", "¿Qué brilla?"),
			choice("2. ¿Cuál es el predicado?", "Qué se dice", [
				"brillan sobre la academia",
				"Las estrellas",
				"sobre la academia",
				"academia"
			], "brillan sobre la academia", "¡Casi! Predicado completo: «brillan sobre la academia».", "predicado", "Desde el verbo."),
			nucleos("estrellas", "brillan", "¡Casi! Núcleo SN: «estrellas». Núcleo SV: «brillan».", "Sustantivo y verbo principales.")
		]
	},
	{
		id: 14,
		order: 14,
		level: 4,
		text: "El pequeño dragón verde guarda un tesoro enorme.",
		showSentence: true,
		sujeto: "El pequeño dragón verde",
		predicado: "guarda un tesoro enorme",
		sujetoOptions: [
			"El pequeño dragón verde",
			"guarda",
			"un tesoro enorme",
			"dragón"
		],
		predicadoOptions: [
			"guarda un tesoro enorme",
			"El pequeño dragón verde",
			"un tesoro enorme",
			"guarda"
		],
		explainSujeto: "Sujeto largo con adjetivos.",
		explainPredicado: "Predicado: guarda un tesoro enorme.",
		steps: [
			choice("1. ¿Cuál es el sujeto completo?", "Todo el grupo del que se habla", [
				"El pequeño dragón verde",
				"dragón verde",
				"El pequeño dragón",
				"guarda un tesoro enorme"
			], "El pequeño dragón verde", "¡Casi! El sujeto incluye artículos y adjetivos: «El pequeño dragón verde».", "sujeto", "Todo lo que va antes del verbo."),
			choice("2. ¿Cuál es el predicado?", "Desde el verbo", [
				"guarda un tesoro enorme",
				"El pequeño dragón verde",
				"un tesoro enorme",
				"tesoro"
			], "guarda un tesoro enorme", "¡Casi! Predicado: «guarda un tesoro enorme».", "predicado", "Empieza en «guarda»."),
			choice("3. «enorme» es…", "Morfología", [
				"adjetivo",
				"sustantivo",
				"verbo",
				"pronombre"
			], "adjetivo", "¡Casi! «Enorme» describe el tesoro: adjetivo.", "morfo", "¿Describe el tamaño?")
		]
	},
	{
		id: 15,
		order: 15,
		level: 5,
		text: "¿Por qué estudian las magas cada tarde?",
		showSentence: true,
		sujeto: "las magas",
		predicado: "estudian cada tarde",
		sujetoOptions: [
			"las magas",
			"estudian",
			"cada tarde",
			"Por qué"
		],
		predicadoOptions: [
			"estudian cada tarde",
			"las magas",
			"cada tarde",
			"estudian"
		],
		explainSujeto: "Sujeto: las magas.",
		explainPredicado: "Predicado: estudian cada tarde.",
		steps: [
			choice("1. Tipo de oración", "Intención", [
				"Interrogativa",
				"Enunciativa",
				"Exclamativa",
				"Imperativa"
			], "Interrogativa", "¡Casi! Pregunta con ¿?: es interrogativa.", "tipo_oracion", "¿Es una pregunta?"),
			choice("2. ¿Cuál es el sujeto?", "Quién estudia", [
				"las magas",
				"estudian",
				"cada tarde",
				"Por qué"
			], "las magas", "¡Casi! Quienes estudian son «las magas».", "sujeto", "¿Quiénes estudian?"),
			choice("3. Separa sujeto y predicado", "Corte", [
				"las magas | estudian cada tarde",
				"las | magas estudian cada tarde",
				"las magas estudian | cada tarde",
				"¿Por qué | estudian las magas cada tarde?"
			], "las magas | estudian cada tarde", "¡Casi! Sujeto «las magas» y predicado «estudian cada tarde». «¿Por qué» es un nexo interrogativo, no el sujeto.", "separar", "El sujeto es quien estudia.")
		]
	}
];
LANGUAGE_SENTENCES[11].steps[0] = choice("Ortografía: elige la correcta", "b / v", [
	"El barco navega en el mar.",
	"El varco navega en el mar.",
	"El barco navega en el mab.",
	"El barco nabeva en el mar."
], "El barco navega en el mar.", "¡Casi! Se escribe «barco» con b y «navega» con v. La frase correcta es la primera.", "ortografia", "Barco se escribe con b.");
var ENGLISH_TASKS = [
	{
		id: 1,
		order: 1,
		level: 1,
		kind: "translate",
		prompt: "How do you say «libro» in English?",
		promptEs: "¿Cómo se dice «libro» en inglés?",
		options: [
			"book",
			"look",
			"boot",
			"brook"
		],
		answer: "book",
		hint: "You read a book.",
		explanation: "¡Casi! «Libro» es book. Look es mirar y boot es bota: suenan parecido, pero book es el de leer."
	},
	{
		id: 2,
		order: 2,
		level: 1,
		kind: "translate",
		prompt: "What is «casa» in English?",
		promptEs: "¿Cómo se dice «casa»?",
		options: [
			"house",
			"horse",
			"mouse",
			"home"
		],
		answer: "house",
		hint: "Where you live (building).",
		explanation: "¡Casi! «Casa» (edificio) es house. Horse es caballo y mouse es ratón. Home es más «hogar»."
	},
	{
		id: 3,
		order: 3,
		level: 1,
		kind: "translate",
		prompt: "How do you say «amigo»?",
		promptEs: "¿Qué es «amigo» en inglés?",
		options: [
			"friend",
			"family",
			"father",
			"fresh"
		],
		answer: "friend",
		hint: "Someone you like to play with.",
		explanation: "¡Casi! Amigo = friend. Family es familia y father es padre. Un friend es tu compañero de juegos."
	},
	{
		id: 4,
		order: 4,
		level: 1,
		kind: "choose",
		prompt: "I ___ a student.",
		promptEs: "Elige el verbo: «Yo ___ un estudiante.»",
		options: [
			"am",
			"is",
			"are",
			"be"
		],
		answer: "am",
		hint: "With I we use am.",
		explanation: "¡Casi! Con I (yo) se usa am: I am a student. Is va con he/she/it y are con you/we/they."
	},
	{
		id: 5,
		order: 5,
		level: 2,
		kind: "translate",
		prompt: "What colour is the sky on a clear day? (in English)",
		promptEs: "¿De qué color es el cielo despejado? (en inglés)",
		options: [
			"blue",
			"black",
			"brown",
			"blond"
		],
		answer: "blue",
		hint: "Not green, not red…",
		explanation: "¡Casi! El cielo despejado es blue (azul). Black es negro y brown es marrón."
	},
	{
		id: 6,
		order: 6,
		level: 2,
		kind: "complete",
		prompt: "She ___ happy today.",
		promptEs: "Completa: «Ella ___ feliz hoy.»",
		options: [
			"is",
			"am",
			"are",
			"be"
		],
		answer: "is",
		hint: "She → is",
		explanation: "¡Casi! Con she/he/it usamos is: She is happy. Am es para I y are para you/we/they."
	},
	{
		id: 7,
		order: 7,
		level: 2,
		kind: "translate",
		prompt: "How do you say «perro»?",
		promptEs: "¿Cómo se dice «perro»?",
		options: [
			"dog",
			"god",
			"dot",
			"dig"
		],
		answer: "dog",
		hint: "A pet that barks.",
		explanation: "¡Casi! Perro = dog. God es dios y dig es cavar. ¡Recuerda: dog!"
	},
	{
		id: 8,
		order: 8,
		level: 3,
		kind: "choose",
		prompt: "They ___ my friends.",
		promptEs: "Elige: «Ellos ___ mis amigos.»",
		options: [
			"are",
			"is",
			"am",
			"be"
		],
		answer: "are",
		hint: "They → are",
		explanation: "¡Casi! They (ellos) va con are: They are my friends. Is es singular (he/she)."
	},
	{
		id: 9,
		order: 9,
		level: 3,
		kind: "complete",
		prompt: "I can ___ a bike.",
		promptEs: "Completa: «Puedo ___ en bici.» (verbo en inglés)",
		options: [
			"ride",
			"read",
			"write",
			"run"
		],
		answer: "ride",
		hint: "You ride a bike / a horse.",
		explanation: "¡Casi! Se dice ride a bike (montar en bici). Read es leer y write es escribir."
	},
	{
		id: 10,
		order: 10,
		level: 3,
		kind: "translate",
		prompt: "How do you say «escuela»?",
		promptEs: "¿Cómo se dice «escuela / colegio»?",
		options: [
			"school",
			"shop",
			"shell",
			"skill"
		],
		answer: "school",
		hint: "Where you learn.",
		explanation: "¡Casi! Escuela es school. Shop es tienda. ¡School es donde aprendes magia… y mates!"
	},
	{
		id: 11,
		order: 11,
		level: 4,
		kind: "choose",
		prompt: "There ___ two cats in the garden.",
		promptEs: "Elige: «Hay dos gatos en el jardín.»",
		options: [
			"are",
			"is",
			"am",
			"be"
		],
		answer: "are",
		hint: "Two cats = plural → are",
		explanation: "¡Casi! Con plural (two cats) usamos there are. There is es para uno solo."
	},
	{
		id: 12,
		order: 12,
		level: 4,
		kind: "complete",
		prompt: "Good morning! How ___ you?",
		promptEs: "Completa el saludo: «¡Buenos días! ¿Cómo ___ tú?»",
		options: [
			"are",
			"is",
			"am",
			"be"
		],
		answer: "are",
		hint: "How are you?",
		explanation: "¡Casi! La frase fija es How are you? Con you siempre are en este saludo."
	}
];
var DEFAULT = {
	studentName: "Liz",
	period: "Verano 2026",
	mathDone: 0,
	mathTotal: 30,
	languageDone: 0,
	languageTotal: 15,
	englishDone: 0,
	englishTotal: 12,
	readingDone: 0,
	readingTotal: 2,
	missionsCompleted: 0,
	missionsTotal: 59,
	accuracyPercent: null,
	streakDays: 0,
	maxStreak: 0,
	points: 0,
	xp: 0,
	level: 1,
	levelTitle: "Aprendiz",
	badges: [],
	strongAreas: [],
	weakAreas: [],
	observations: [],
	generatedAt: ""
};
function foldChar(ch) {
	const code = ch.charCodeAt(0);
	if (code >= 32 && code <= 126) return ch;
	return {
		225: "a",
		233: "e",
		237: "i",
		243: "o",
		250: "u",
		241: "n",
		252: "u",
		193: "A",
		201: "E",
		205: "I",
		211: "O",
		218: "U",
		209: "N",
		191: "?",
		161: "!",
		183: "-",
		8211: "-",
		8212: "-",
		8230: "...",
		171: "\"",
		187: "\""
	}[code] ?? "?";
}
function escapePdfText(text) {
	let out = "";
	for (const ch of text) {
		const folded = foldChar(ch);
		if (folded === "\\") out += "\\\\";
		else if (folded === "(") out += "\\(";
		else if (folded === ")") out += "\\)";
		else out += folded;
	}
	return out;
}
function pct(done, total) {
	if (total <= 0) return "0%";
	return `${Math.round(done / total * 100)}%`;
}
function wrapLine(text, max = 88) {
	const words = text.split(/\s+/);
	const lines = [];
	let cur = "";
	for (const w of words) {
		const next = cur ? `${cur} ${w}` : w;
		if (next.length > max) {
			if (cur) lines.push(cur);
			cur = w;
		} else cur = next;
	}
	if (cur) lines.push(cur);
	return lines.length ? lines : [""];
}
/** Multi-section PDF report for parents */
function buildProgressReportPdf(data = {}) {
	const d = {
		...DEFAULT,
		...data
	};
	const name = d.studentName || "Alumna";
	const period = d.period || "Verano 2026";
	const acc = d.accuracyPercent === null || Number.isNaN(d.accuracyPercent) ? "Sin datos suficientes" : `${d.accuracyPercent}%`;
	const strong = d.strongAreas.length > 0 ? d.strongAreas.join("; ") : "Aun no hay suficientes datos (hace falta practicar un poco mas).";
	const weak = d.weakAreas.length > 0 ? d.weakAreas.join("; ") : "Sin areas debiles claras por ahora.";
	const badgeLine = d.badges.length > 0 ? d.badges.join("; ") : "Todavia sin insignias desbloqueadas.";
	const obs = d.observations.length > 0 ? d.observations : ["Seguir con sesiones cortas y regulares (5-10 minutos al dia).", "Celebrar los aciertos y usar los errores como parte del aprendizaje."];
	const lines = [
		"Informe de progreso - Academia Arcana · Verano",
		"",
		"Documento generado por la familia. La familia decide si lo guarda o lo comparte.",
		"No incluye nombres de centro escolar ni de docentes.",
		d.generatedAt ? `Generado: ${d.generatedAt}` : "",
		"",
		"================================================",
		"DATOS GENERALES",
		"================================================",
		"",
		`Nombre de la alumna:  ${name}`,
		`Periodo:              ${period}`,
		`Nivel en el juego:    ${d.level} - ${d.levelTitle}`,
		`XP total:             ${d.xp}`,
		`Puntos:               ${d.points}`,
		"",
		"================================================",
		"PROGRESO POR AREA",
		"================================================",
		"",
		`Matematicas:  ${d.mathDone}/${d.mathTotal}  (${pct(d.mathDone, d.mathTotal)})`,
		`Lengua:       ${d.languageDone}/${d.languageTotal}  (${pct(d.languageDone, d.languageTotal)})`,
		`Ingles:       ${d.englishDone}/${d.englishTotal}  (${pct(d.englishDone, d.englishTotal)})`,
		`Lectura:      ${d.readingDone}/${d.readingTotal}  (${pct(d.readingDone, d.readingTotal)})`,
		"",
		`Misiones completadas (total):  ${d.missionsCompleted}/${d.missionsTotal}  (${pct(d.missionsCompleted, d.missionsTotal)})`,
		"",
		"================================================",
		"RENDIMIENTO",
		"================================================",
		"",
		`Porcentaje general de aciertos:  ${acc}`,
		`Racha actual:                    ${d.streakDays} dia(s)`,
		`Racha maxima:                    ${d.maxStreak} dia(s)`,
		"",
		"================================================",
		"INSIGNIAS CONQUISTADAS",
		"================================================",
		"",
		...wrapLine(badgeLine),
		"",
		"================================================",
		"AREAS MAS FUERTES",
		"================================================",
		"",
		...wrapLine(strong),
		"",
		"================================================",
		"AREAS QUE NECESITAN MAS PRACTICA",
		"================================================",
		"",
		...wrapLine(weak),
		"",
		"================================================",
		"OBSERVACIONES Y RECOMENDACIONES",
		"================================================",
		""
	];
	for (const o of obs) {
		for (const w of wrapLine(`- ${o}`)) lines.push(w);
		lines.push("");
	}
	lines.push("================================================");
	lines.push("");
	lines.push("Academia Arcana - Misiones de verano");
	lines.push("Informe familiar neutro. Uso libre de la familia.");
	const leading = 13;
	const left = 48;
	const pageHeight = Math.max(842, 80 + lines.length * leading);
	const startY = pageHeight - 50;
	const contentOps = [];
	contentOps.push("BT");
	contentOps.push("/F1 12 Tf");
	contentOps.push(`${left} ${startY} Td`);
	contentOps.push(`(${escapePdfText(lines[0])}) Tj`);
	for (let i = 1; i < lines.length; i++) {
		contentOps.push(`0 -${leading} Td`);
		contentOps.push(`(${escapePdfText(lines[i])}) Tj`);
	}
	contentOps.push("ET");
	const streamFinal = contentOps.join("\n");
	const streamLenFinal = new TextEncoder().encode(streamFinal).length;
	const objects = [];
	objects.push("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
	objects.push("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n");
	objects.push(`3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 ${pageHeight}] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n`);
	objects.push(`4 0 obj\n<< /Length ${streamLenFinal} >>\nstream\n${streamFinal}\nendstream\nendobj\n`);
	objects.push("5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n");
	let pdf = "%PDF-1.4\n";
	const offsets = [0];
	for (const obj of objects) {
		offsets.push(pdf.length);
		pdf += obj;
	}
	const xrefPos = pdf.length;
	pdf += `xref\n0 ${objects.length + 1}\n`;
	pdf += "0000000000 65535 f \n";
	for (let i = 1; i <= objects.length; i++) pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
	pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
	pdf += `startxref\n${xrefPos}\n%%EOF`;
	return new Blob([pdf], { type: "application/pdf" });
}
function downloadProgressReportPdf(data, filename = "informe-progreso-academia-arcana.pdf") {
	const blob = buildProgressReportPdf(data);
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.rel = "noopener";
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}
function buildReportFromState(s) {
	const prog = xpProgress(s.xp);
	const accuracy = s.totalCorrect + s.totalWrong === 0 ? null : Math.round(s.totalCorrect / (s.totalCorrect + s.totalWrong) * 100);
	const mathDone = s.mathCompleted.length;
	const langDone = s.languageCompleted.length;
	const engDone = s.englishCompleted.length;
	const readDone = s.books.filter((b) => b.completed).length;
	const missionsCompleted = mathDone + langDone + engDone + readDone;
	const missionsTotal = MATH_TASKS.length + LANGUAGE_SENTENCES.length + ENGLISH_TASKS.length + 2;
	const { strong, weak } = analyzeSkills(s.skillStats);
	const badgeNames = s.badges.map((id) => ALL_BADGES[id]?.name ?? id);
	const observations = parentRecommendations(s.skillStats, accuracy, s.streak, s.maxStreak);
	const generatedAt = (/* @__PURE__ */ new Date()).toLocaleString("es-ES", {
		dateStyle: "medium",
		timeStyle: "short"
	});
	return {
		studentName: s.playerName,
		period: "Verano 2026",
		mathDone,
		mathTotal: MATH_TASKS.length,
		languageDone: langDone,
		languageTotal: LANGUAGE_SENTENCES.length,
		englishDone: engDone,
		englishTotal: ENGLISH_TASKS.length,
		readingDone: readDone,
		readingTotal: 2,
		missionsCompleted,
		missionsTotal,
		accuracyPercent: accuracy,
		streakDays: s.streak,
		maxStreak: s.maxStreak,
		points: s.points,
		xp: s.xp,
		level: prog.level,
		levelTitle: prog.title,
		badges: badgeNames,
		strongAreas: strong.map((x) => `${x.label} (${x.accuracy}%)`),
		weakAreas: weak.map((x) => `${x.label} (${x.accuracy}%)`),
		observations,
		generatedAt
	};
}
function downloadLiveParentReport(s) {
	downloadProgressReportPdf(buildReportFromState(s), `informe-progreso-academia-arcana-${(s.playerName || "Liz").replace(/[^\w\-]+/g, "_").slice(0, 24)}.pdf`);
}
var SLICES = [
	{
		id: "xp10",
		label: "+10 XP",
		color: "#7c5cfc"
	},
	{
		id: "xp20",
		label: "+20 XP",
		color: "#e8a838"
	},
	{
		id: "xp30",
		label: "+30 XP",
		color: "#2eb8a0"
	},
	{
		id: "badge-brisa",
		label: "Brisa",
		color: "#3ecf8e"
	},
	{
		id: "xp15",
		label: "+15 XP",
		color: "#9b7dff"
	},
	{
		id: "badge-chispa",
		label: "Chispa",
		color: "#e85d4c"
	},
	{
		id: "xp40",
		label: "+40 XP",
		color: "#5b3fd4"
	},
	{
		id: "badge-eco",
		label: "Eco",
		color: "#f0b429"
	}
];
var TEMP_LABELS = {
	"temp-brisa": "Brisa del día",
	"temp-chispa": "Chispa fugaz",
	"temp-eco": "Eco mágico"
};
function RewardRoulette() {
	const spins = useGameStore((s) => s.rouletteSpins);
	const lastSpinDate = useGameStore((s) => s.lastRouletteDate);
	const spinRoulette = useGameStore((s) => s.spinRoulette);
	const tempBadges = useGameStore((s) => s.tempBadges);
	const touchActivity = useGameStore((s) => s.touchActivity);
	const [spinning, setSpinning] = (0, import_react.useState)(false);
	const [rotation, setRotation] = (0, import_react.useState)(0);
	const [result, setResult] = (0, import_react.useState)(null);
	const freeToday = lastSpinDate !== (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const available = spins + (freeToday ? 1 : 0);
	const canSpin = available > 0 && !spinning;
	const tempList = (0, import_react.useMemo)(() => Object.entries(tempBadges).filter(([, exp]) => exp > Date.now()), [tempBadges]);
	const conic = SLICES.map((s, i) => {
		const start = i / SLICES.length * 360;
		const end = (i + 1) / SLICES.length * 360;
		return `${s.color} ${start}deg ${end}deg`;
	}).join(", ");
	function spin() {
		if (!canSpin) return;
		touchActivity();
		setSpinning(true);
		setResult(null);
		const idx = Math.floor(Math.random() * SLICES.length);
		const sliceAngle = 360 / SLICES.length;
		const extra = 1800 + (360 - idx * sliceAngle - sliceAngle / 2);
		setRotation((r) => r + extra);
		window.setTimeout(() => {
			const prize = spinRoulette(SLICES[idx].id);
			setResult(prize);
			setSpinning(false);
		}, 3200);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-4 rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/10 via-card to-accent/10 p-4 sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "h-6 w-6" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold text-fg",
						children: "Roleta de Recompensas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "1 giro gratis al día · más giros al completar partidas oficiales."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm font-medium text-fg",
						children: [
							"Giros disponibles: ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: available }),
							freeToday ? " (incluye el gratis de hoy)" : ""
						]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto w-full max-w-[280px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1 text-2xl text-primary drop-shadow",
					"aria-hidden": true,
					children: "▼"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("relative mx-auto aspect-square w-full overflow-hidden rounded-full border-4 border-primary shadow-[0_0_30px_rgba(124,92,252,0.35)]", spinning ? "transition-transform duration-[3200ms] ease-out" : "transition-transform duration-300"),
					style: {
						transform: `rotate(${rotation}deg)`,
						background: `conic-gradient(${conic})`
					},
					children: [
						SLICES.map((s, i) => {
							const angle = (i + .5) / SLICES.length * 360;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute left-1/2 top-1/2 origin-center text-[10px] font-bold text-white drop-shadow sm:text-xs",
								style: { transform: `rotate(${angle}deg) translateY(-88px) rotate(${-angle}deg)` },
								children: s.label
							}, s.id);
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-[38%] rounded-full border-2 border-white/40 bg-card shadow-inner" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/15 to-transparent" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				disabled: !canSpin,
				onClick: spin,
				className: "flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary text-base font-bold text-primary-fg shadow-md disabled:opacity-50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" }), spinning ? "Girando…" : canSpin ? "¡Girar la roleta!" : "Vuelve mañana o completa una partida"]
			}),
			result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "animate-fade-in rounded-xl border border-success/40 bg-success/10 p-3 text-center text-sm font-medium text-fg",
				children: ["✨ ", result]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 rounded-xl border border-dashed border-accent/50 bg-accent/10 p-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold text-fg",
						children: "Insignias temporales (brillo especial)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Son extras, distintas de las permanentes. Mientras entres al menos 1 vez cada 24 h, las mantienes. Si pasas 24 h sin entrar, se pierden todas. ¡Puedes acumular varias!"
					}),
					tempList.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Aún no tienes insignias temporales activas."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-wrap gap-2",
						children: tempList.map(([id]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-full border border-dashed border-accent bg-accent/20 px-3 py-1 text-xs font-medium text-fg shadow-[0_0_12px_rgba(232,168,56,0.35)]",
							children: ["⏳ ", TEMP_LABELS[id] ?? id]
						}, id))
					})
				]
			})
		]
	});
}
function ProgressView() {
	const points = useGameStore((s) => s.points);
	const xp = useGameStore((s) => s.xp);
	const streak = useGameStore((s) => s.streak);
	const maxStreak = useGameStore((s) => s.maxStreak);
	const badges = useGameStore((s) => s.badges);
	const mathCompleted = useGameStore((s) => s.mathCompleted);
	const languageCompleted = useGameStore((s) => s.languageCompleted);
	const englishCompleted = useGameStore((s) => s.englishCompleted);
	const totalCorrect = useGameStore((s) => s.totalCorrect);
	const totalWrong = useGameStore((s) => s.totalWrong);
	const name = useGameStore((s) => s.playerName);
	const resetProgress = useGameStore((s) => s.resetProgress);
	const setView = useGameStore((s) => s.setView);
	const bossBeaten = useGameStore((s) => s.bossBeaten);
	const perfectMissions = useGameStore((s) => s.perfectMissions);
	const skillStats = useGameStore((s) => s.skillStats);
	const tempBadges = useGameStore((s) => s.tempBadges);
	const areaSessionCount = useGameStore((s) => s.areaSessionCount);
	const prog = xpProgress(xp);
	const accuracy = totalCorrect + totalWrong === 0 ? null : Math.round(totalCorrect / (totalCorrect + totalWrong) * 100);
	const { strong, weak } = analyzeSkills(skillStats);
	const lockedBadges = Object.keys(ALL_BADGES).filter((id) => !badges.includes(id));
	const activeTemp = Object.entries(tempBadges).filter(([, exp]) => exp > Date.now());
	function downloadReport() {
		const s = useGameStore.getState();
		downloadLiveParentReport({
			playerName: s.playerName,
			mathCompleted: s.mathCompleted,
			languageCompleted: s.languageCompleted,
			englishCompleted: s.englishCompleted,
			books: s.books,
			totalCorrect: s.totalCorrect,
			totalWrong: s.totalWrong,
			streak: s.streak,
			maxStreak: s.maxStreak,
			points: s.points,
			xp: s.xp,
			badges: s.badges,
			skillStats: s.skillStats
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarPortrait, { size: "md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1 space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "inline-flex items-center gap-1.5 text-sm font-medium text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, {
								className: "h-4 w-4",
								"aria-hidden": true
							}), "Sala de Trofeos"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-display text-2xl font-semibold text-fg",
							children: ["Tus logros, ", name]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								"Nivel ",
								prog.level,
								" · ",
								prog.title
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setView("avatar"),
							className: "mt-1 inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 text-xs font-medium text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3.5 w-3.5" }), "Personalizar avatar"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3 rounded-xl border-2 border-primary/40 bg-primary/10 p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold text-fg",
						children: "Informe de progreso – Academia Arcana · Verano"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"Para papá o mamá: descarga un PDF con el progreso real de ",
							name,
							".",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-fg",
								children: "Lo genera la familia"
							}),
							" y decide si lo guarda o lo comparte. Sin nombres de colegio ni de docentes."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "grid gap-1 text-xs text-muted sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· Progreso por área con %" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· Aciertos, rachas e insignias" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· Áreas fuertes y a practicar" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· Recomendaciones positivas" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: downloadReport,
						className: "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-base font-semibold text-primary-fg shadow-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, { className: "h-5 w-5" }), "Descargar informe PDF para la familia"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RewardRoulette, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-card p-4 sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 font-display text-lg font-semibold text-fg",
					children: "Panel de progreso"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressPanel, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Puntos",
						value: String(points)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "XP",
						value: String(xp)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Racha / máx.",
						value: `${streak}/${maxStreak}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Precisión",
						value: accuracy === null ? "—" : `${accuracy}%`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-success/30 bg-success/10 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-success",
						children: "Áreas más fuertes"
					}), strong.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Practica un poco más para ver brillos aquí."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-1 text-sm text-fg",
						children: strong.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"✦ ",
							s.label,
							" · ",
							s.accuracy,
							"%"
						] }, s.tag))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-accent/30 bg-accent/10 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-accent",
						children: "Áreas a mejorar"
					}), weak.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "¡Equilibrada! Sigue así."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-1 text-sm text-fg",
						children: weak.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"✧ ",
							s.label,
							" · ",
							s.accuracy,
							"%"
						] }, s.tag))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-surface/50 p-3 text-sm text-muted",
				children: [
					"Perfectas: ",
					perfectMissions,
					" · Jefes:",
					" ",
					[
						bossBeaten.math && "Números",
						bossBeaten.language && "Lengua",
						bossBeaten.english && "English"
					].filter(Boolean).join(", ") || "ninguno aún",
					" ",
					"· Partidas: mates ",
					areaSessionCount.math,
					" · lengua ",
					areaSessionCount.language,
					" · eng",
					" ",
					areaSessionCount.english,
					" (",
					mathCompleted.length + languageCompleted.length + englishCompleted.length,
					" ",
					"en total)"
				]
			}),
			activeTemp.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold text-fg",
					children: "Insignias temporales"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-wrap gap-2",
					children: activeTemp.map(([id]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-full border border-dashed border-accent bg-accent/15 px-3 py-1.5 text-sm font-medium text-fg",
						children: [
							"⏳",
							" ",
							id === "temp-brisa" ? "Brisa del día" : id === "temp-chispa" ? "Chispa fugaz" : id === "temp-eco" ? "Eco mágico" : id
						]
					}, id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold text-fg",
						children: "Insignias permanentes"
					}),
					badges.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Completa partidas, rachas y batallas finales para desbloquear insignias mágicas."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-2 sm:grid-cols-2",
						children: badges.map((id) => {
							const info = BADGE_INFO[id];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3 rounded-xl border border-primary/30 bg-primary/10 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl",
									"aria-hidden": true,
									children: info?.emoji ?? "🏅"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-fg",
									children: info?.name ?? id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: info?.desc
								})] })]
							}, id);
						})
					}),
					lockedBadges.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs font-medium text-muted",
						children: "Aún por descubrir"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid grid-cols-2 gap-2 sm:grid-cols-3",
						children: lockedBadges.slice(0, 6).map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-lg border border-dashed border-border bg-surface/40 p-2 text-center text-xs text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-lg opacity-40",
								children: "❓"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1",
								children: ALL_BADGES[id]?.name
							})]
						}, id))
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 font-display text-lg font-semibold text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-primary" }), "Grimorio de la historia"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryLog, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					if (confirm("¿Borrar todo el progreso de este dispositivo?")) resetProgress();
				},
				className: "inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-danger",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" }), "Reiniciar progreso"]
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-3 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xl font-semibold tabular-nums text-fg",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: label
		})]
	});
}
var ZONE_META = {
	math: {
		title: "Prueba del Guardián de los Números",
		guardian: "Un ser de dígitos dorados bloquea la cima de la Torre…",
		map: "math"
	},
	language: {
		title: "Prueba de la Bibliotecaria",
		guardian: "La Bibliotecaria de las Sombras abre un libro vacío…",
		map: "language"
	},
	english: {
		title: "Trial of the English Sphinx",
		guardian: "The Sphinx smiles: five English riddles await…",
		map: "english"
	}
};
function buildBossQuestions(zone) {
	if (zone === "math") return pickRandom(MATH_BANK.filter((q) => q.level >= 4), 5).map((ex) => ({
		kind: "math",
		prompt: ex.prompt,
		answer: ex.answer,
		explanation: ex.explanation,
		tag: ex.type
	}));
	if (zone === "language") return pickRandom(LANG_BANK.filter((q) => q.level >= 3), 5).map((s) => ({
		kind: "lang",
		prompt: s.title,
		sentence: s.text || s.title,
		options: s.options,
		answer: s.answer,
		explanation: s.explanation,
		tag: s.skillTag
	}));
	return pickRandom(ENG_BANK.filter((q) => q.level >= 3), 5).map((t) => ({
		kind: "eng",
		prompt: t.prompt,
		promptEs: t.promptEs,
		options: t.options,
		answer: t.answer,
		explanation: t.explanation,
		tag: t.kind
	}));
}
function grantBossHit(pts) {
	useGameStore.setState((s) => ({
		points: s.points + pts,
		xp: s.xp + pts,
		totalCorrect: s.totalCorrect + 1
	}));
}
function BossBattle({ zone }) {
	const setView = useGameStore((s) => s.setView);
	const beatBoss = useGameStore((s) => s.beatBoss);
	const playerName = useGameStore((s) => s.playerName);
	const setPlayMode = useGameStore((s) => s.setPlayMode);
	const bossBeaten = useGameStore((s) => s.bossBeaten);
	const awardWrong = useGameStore((s) => s.awardWrong);
	const recordSkill = useGameStore((s) => s.recordSkill);
	const questions = (0, import_react.useMemo)(() => buildBossQuestions(zone), [zone]);
	const meta = ZONE_META[zone];
	const [idx, setIdx] = (0, import_react.useState)(0);
	const [input, setInput] = (0, import_react.useState)("");
	const [choice, setChoice] = (0, import_react.useState)(null);
	const [feedback, setFeedback] = (0, import_react.useState)(null);
	const [correct, setCorrect] = (0, import_react.useState)(0);
	const [wrong, setWrong] = (0, import_react.useState)(0);
	const [failTags, setFailTags] = (0, import_react.useState)([]);
	const [done, setDone] = (0, import_react.useState)(false);
	const [victory, setVictory] = (0, import_react.useState)(false);
	const [opts, setOpts] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const qq = questions[idx];
		if (!qq) return;
		if (qq.kind === "lang") setOpts(shuffleAnswerOptions(qq.options, qq.answer));
		else if (qq.kind === "eng") setOpts(shuffleAnswerOptions(qq.options, qq.answer));
		else setOpts([]);
	}, [idx, questions]);
	const q = questions[idx];
	const answered = feedback === "ok" || feedback === "bad";
	function submit() {
		if (answered) return;
		let ok = false;
		if (q.kind === "math") ok = normalizeNumberInput(input) === q.answer;
		else ok = choice !== null && normalizeAnswer(choice) === normalizeAnswer(q.answer);
		if (ok) {
			setFeedback("ok");
			playCorrect();
			setCorrect((c) => c + 1);
			recordSkill(q.tag, "ok");
			grantBossHit(20);
		} else {
			setFeedback("bad");
			playWrong();
			setWrong((w) => w + 1);
			setFailTags((t) => [...t, q.tag]);
			recordSkill(q.tag, "bad");
			awardWrong();
		}
	}
	function next() {
		if (!(idx >= questions.length - 1)) {
			setFeedback(null);
			setInput("");
			setChoice(null);
			setIdx(idx + 1);
			return;
		}
		const win = correct >= 3;
		setVictory(win);
		if (win && !bossBeaten[zone]) {
			beatBoss(zone);
			playMissionGreat();
		} else if (!win) playMissionLow();
		else playMissionGreat();
		setDone(true);
	}
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			victory && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-success/40 bg-success/10 p-4 text-sm text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-lg font-semibold text-success",
					children: [
						"¡Victoria, ",
						playerName,
						"!"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-muted",
					children: "Has vencido la prueba. Recompensa: insignia especial + 80 XP + 50 puntos + un capítulo de la historia."
				})]
			}),
			!victory && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg font-semibold",
					children: "El guardián te espera otra vez"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-muted",
					children: "Necesitas al menos 3 aciertos de 5. Entrena un poco y vuelve a intentarlo — ¡tú puedes!"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionSummary, {
				correct,
				wrong,
				failTags,
				area: zone,
				playerName,
				onContinue: () => setView(meta.map),
				practiceLabel: "Entrenar más",
				onPractice: () => {
					setPlayMode("practice");
					setView(meta.map);
				}
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setView(meta.map),
					className: "grid h-11 w-11 place-items-center rounded-lg border border-border bg-surface",
					"aria-label": "Volver",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "inline-flex items-center gap-1 text-xs font-medium text-danger",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, { className: "h-3.5 w-3.5" }),
							"Batalla final · ",
							idx + 1,
							"/",
							questions.length
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-lg font-semibold text-fg sm:text-xl",
						children: meta.title
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: meta.guardian
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 rounded-xl border border-danger/30 bg-card p-5",
				children: [
					q.kind === "math" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whitespace-pre-line font-display text-xl font-semibold text-fg",
						children: q.prompt
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						inputMode: "numeric",
						value: input,
						onChange: (e) => setInput(e.target.value),
						disabled: answered,
						className: "min-h-14 w-full rounded-xl border border-border bg-surface px-4 text-xl tabular-nums text-fg outline-none ring-primary focus:ring-2",
						placeholder: "Respuesta…"
					})] }),
					q.kind === "lang" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base font-semibold text-fg",
							children: q.prompt
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-xl border-2 border-accent/40 bg-surface-2 px-4 py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg font-semibold text-fg",
								children: q.sentence
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: opts.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: answered,
								onClick: () => setChoice(o),
								className: cn("w-full min-h-14 rounded-xl border px-3 text-left text-base", choice === o ? "border-primary bg-primary/15" : "border-border bg-surface"),
								children: o
							}, o))
						})
					] }),
					q.kind === "eng" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: q.promptEs
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl font-semibold text-fg",
							children: q.prompt
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: opts.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: answered,
								onClick: () => setChoice(o),
								className: cn("w-full min-h-14 rounded-xl border px-3 text-left text-base", choice === o ? "border-accent-2 bg-accent-2/15" : "border-border bg-surface"),
								children: o
							}, o))
						})
					] }),
					feedback === "ok" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnswerFeedback, {
						kind: "ok",
						title: "¡El guardián retrocede!",
						points: 20
					}),
					feedback === "bad" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnswerFeedback, {
						kind: "bad",
						title: "¡Casi! El guardián sonríe con amabilidad.",
						correctAnswer: String(q.answer),
						body: q.explanation
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayActions, {
						answered,
						isLast: idx >= questions.length - 1,
						onCheck: submit,
						onNext: next,
						showHint: false,
						checkLabel: "Lanzar hechizo"
					})
				]
			})
		]
	});
}
var QUESTIONS = [
	{
		id: "d1",
		area: "math",
		kind: "number",
		prompt: "¿Cuánto es 48 + 27?",
		answer: 75
	},
	{
		id: "d2",
		area: "math",
		kind: "number",
		prompt: "¿Cuánto es 9 × 7?",
		answer: 63
	},
	{
		id: "d3",
		area: "math",
		kind: "number",
		prompt: "¿Cuánto es 56 ÷ 8?",
		answer: 7
	},
	{
		id: "d4",
		area: "language",
		kind: "choice",
		prompt: "En «Ana come manzanas», ¿cuál es el sujeto?",
		options: [
			"Ana",
			"come",
			"manzanas",
			"come manzanas"
		],
		answer: "Ana"
	},
	{
		id: "d5",
		area: "language",
		kind: "choice",
		prompt: "En «El gato duerme», ¿cuál es el predicado?",
		options: [
			"El gato",
			"duerme",
			"gato",
			"El"
		],
		answer: "duerme"
	},
	{
		id: "d6",
		area: "english",
		kind: "choice",
		prompt: "How do you say «libro» in English?",
		options: [
			"book",
			"look",
			"boot",
			"cook"
		],
		answer: "book"
	},
	{
		id: "d7",
		area: "english",
		kind: "choice",
		prompt: "I ___ happy. (elige el verbo)",
		options: [
			"am",
			"is",
			"are",
			"be"
		],
		answer: "am"
	}
];
function DiagnosticView() {
	const finishDiagnostic = useGameStore((s) => s.finishDiagnostic);
	const skipDiagnostic = useGameStore((s) => s.skipDiagnostic);
	const name = useGameStore((s) => s.playerName);
	const [idx, setIdx] = (0, import_react.useState)(0);
	const [input, setInput] = (0, import_react.useState)("");
	const [choice, setChoice] = (0, import_react.useState)(null);
	const [scores, setScores] = (0, import_react.useState)({
		math: 0,
		language: 0,
		english: 0
	});
	const [attempts, setAttempts] = (0, import_react.useState)({
		math: 0,
		language: 0,
		english: 0
	});
	const [done, setDone] = (0, import_react.useState)(false);
	const [opts, setOpts] = (0, import_react.useState)([]);
	const [answered, setAnswered] = (0, import_react.useState)(false);
	const [lastOk, setLastOk] = (0, import_react.useState)(false);
	const q = QUESTIONS[idx];
	const progress = Math.round((idx + (done ? 1 : 0)) / QUESTIONS.length * 100);
	(0, import_react.useEffect)(() => {
		if (q.kind === "choice") setOpts(shuffleAnswerOptions(q.options, q.answer));
		else setOpts([]);
		setChoice(null);
		setInput("");
		setAnswered(false);
	}, [idx, q]);
	function submit() {
		if (answered) return;
		let ok = false;
		if (q.kind === "number") ok = normalizeNumberInput(input) === q.answer;
		else ok = choice !== null && normalizeAnswer(choice) === normalizeAnswer(q.answer);
		setAnswered(true);
		setLastOk(ok);
		if (ok) playCorrect();
		else playWrong();
		setScores((s) => ({
			...s,
			[q.area]: s[q.area] + (ok ? 1 : 0)
		}));
		setAttempts((a) => ({
			...a,
			[q.area]: a[q.area] + 1
		}));
	}
	function next() {
		if (idx < QUESTIONS.length - 1) setIdx(idx + 1);
		else setDone(true);
	}
	const focus = (0, import_react.useMemo)(() => {
		const rates = {
			math: attempts.math ? scores.math / attempts.math : 1,
			language: attempts.language ? scores.language / attempts.language : 1,
			english: attempts.english ? scores.english / attempts.english : 1
		};
		const entries = Object.entries(rates);
		entries.sort((a, b) => a[1] - b[1]);
		const weakest = entries[0][0];
		if (entries.every(([, r]) => r >= .75)) return "balanced";
		return weakest;
	}, [scores, attempts]);
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-lg animate-fade-in space-y-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border border-primary/40 bg-card p-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mx-auto h-10 w-10 text-primary" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-3 font-display text-2xl font-semibold text-fg",
					children: [
						"¡Listo, ",
						name,
						"!"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-base text-muted",
					children: [
						"La Academia ha leído tu magia. Te sugerimos practicar un poquito más en",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-fg",
							children: {
								math: "la Torre de Números",
								language: "la Biblioteca Misteriosa",
								english: "la Cámara del Inglés",
								balanced: "cualquier zona (¡vas genial!)"
							}[focus]
						}),
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						"Aciertos: mates ",
						scores.math,
						"/",
						attempts.math,
						" · lengua ",
						scores.language,
						"/",
						attempts.language,
						" · english ",
						scores.english,
						"/",
						attempts.english
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => finishDiagnostic(focus),
					className: "mt-6 min-h-14 w-full rounded-xl bg-primary text-base font-semibold text-primary-fg",
					children: "¡Empezar la misión de hoy!"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg animate-fade-in space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-primary",
						children: "Diagnóstico mágico · opcional"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-display text-2xl font-semibold text-fg",
						children: [
							"¿Cómo está tu magia, ",
							name,
							"?"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"Solo ",
							QUESTIONS.length,
							" preguntas rápidas. Puedes saltarlas cuando quieras."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2.5 overflow-hidden rounded-full bg-surface-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-primary transition-all duration-300",
							style: { width: `${progress}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							"Pregunta ",
							idx + 1,
							" de ",
							QUESTIONS.length
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 rounded-2xl border border-border bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl font-semibold leading-snug text-fg",
						children: q.prompt
					}),
					q.kind === "number" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						inputMode: "numeric",
						value: input,
						onChange: (e) => setInput(e.target.value),
						disabled: answered,
						onKeyDown: (e) => e.key === "Enter" && !answered && submit(),
						className: "min-h-14 w-full rounded-xl border border-border bg-surface px-4 text-xl tabular-nums text-fg outline-none ring-primary focus:ring-2",
						placeholder: "Tu número…",
						autoFocus: true
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2.5",
						children: opts.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: answered,
							onClick: () => setChoice(o),
							className: cn("w-full min-h-14 rounded-xl border px-4 text-left text-base font-medium", choice === o ? "border-primary bg-primary/15 text-fg" : "border-border bg-surface text-fg"),
							children: o
						}, o))
					}),
					answered && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("text-sm font-medium", lastOk ? "text-success" : "text-accent"),
						children: lastOk ? "¡Bien! Sigue así." : `Casi… la respuesta era: ${String(q.answer)}`
					}),
					answered ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: next,
						className: "min-h-14 w-full rounded-xl bg-primary text-base font-bold text-primary-fg",
						children: idx < QUESTIONS.length - 1 ? "Siguiente pregunta" : "Ver resultado"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: submit,
						className: "min-h-14 w-full rounded-xl bg-primary text-base font-semibold text-primary-fg",
						children: "Comprobar"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => skipDiagnostic(),
				className: "min-h-12 w-full text-sm font-medium text-muted underline-offset-2 hover:text-fg hover:underline",
				children: "Saltar diagnóstico → ir al mapa"
			})
		]
	});
}
function App() {
	const view = useGameStore((s) => s.view);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		view === "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeView, {}),
		view === "daily" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DailyMission, {}),
		view === "diagnostic" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiagnosticView, {}),
		view === "math" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathMap, {}),
		view === "math-play" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathPlay, {}),
		view === "math-boss" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BossBattle, { zone: "math" }),
		view === "language" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageMap, {}),
		view === "language-play" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguagePlay, {}),
		view === "language-boss" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BossBattle, { zone: "language" }),
		view === "english" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnglishMap, {}),
		view === "english-play" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnglishPlay, {}),
		view === "english-boss" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BossBattle, { zone: "english" }),
		view === "reading" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadingJournal, {}),
		view === "progress" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressView, {}),
		view === "avatar" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarCustomizer, {})
	] });
}
//#endregion
export { App as component };
