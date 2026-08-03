/**
 * Parent-facing progress report PDF.
 * Neutral: no school or teacher names. Family generates and decides whether to share.
 */

export type ProgressReportData = {
  studentName: string;
  period: string;
  mathDone: number;
  mathTotal: number;
  languageDone: number;
  languageTotal: number;
  englishDone: number;
  englishTotal: number;
  readingDone: number;
  readingTotal: number;
  missionsCompleted: number;
  missionsTotal: number;
  accuracyPercent: number | null;
  streakDays: number;
  maxStreak: number;
  points: number;
  xp: number;
  level: number;
  levelTitle: string;
  badges: string[];
  strongAreas: string[];
  weakAreas: string[];
  observations: string[];
  generatedAt: string;
};

const DEFAULT: ProgressReportData = {
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
  generatedAt: "",
};

function foldChar(ch: string): string {
  const code = ch.charCodeAt(0);
  if (code >= 0x20 && code <= 0x7e) return ch;
  const map: Record<number, string> = {
    0xe1: "a",
    0xe9: "e",
    0xed: "i",
    0xf3: "o",
    0xfa: "u",
    0xf1: "n",
    0xfc: "u",
    0xc1: "A",
    0xc9: "E",
    0xcd: "I",
    0xd3: "O",
    0xda: "U",
    0xd1: "N",
    0xbf: "?",
    0xa1: "!",
    0xb7: "-",
    0x2013: "-",
    0x2014: "-",
    0x2026: "...",
    0xab: '"',
    0xbb: '"',
  };
  return map[code] ?? "?";
}

function escapePdfText(text: string): string {
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

function pct(done: number, total: number): string {
  if (total <= 0) return "0%";
  return `${Math.round((done / total) * 100)}%`;
}

function wrapLine(text: string, max = 88): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > max) {
      if (cur) lines.push(cur);
      cur = w;
    } else {
      cur = next;
    }
  }
  if (cur) lines.push(cur);
  return lines.length ? lines : [""];
}

/** Multi-section PDF report for parents */
export function buildProgressReportPdf(data: Partial<ProgressReportData> = {}): Blob {
  const d: ProgressReportData = { ...DEFAULT, ...data };
  const name = d.studentName || "Alumno";
  const period = d.period || "Verano 2026";
  const acc =
    d.accuracyPercent === null || Number.isNaN(d.accuracyPercent)
      ? "Sin datos suficientes"
      : `${d.accuracyPercent}%`;

  const strong =
    d.strongAreas.length > 0
      ? d.strongAreas.join("; ")
      : "Aun no hay suficientes datos (hace falta practicar un poco mas).";
  const weak =
    d.weakAreas.length > 0
      ? d.weakAreas.join("; ")
      : "Sin areas debiles claras por ahora.";
  const badgeLine =
    d.badges.length > 0 ? d.badges.join("; ") : "Todavia sin insignias desbloqueadas.";

  const obs =
    d.observations.length > 0
      ? d.observations
      : [
          "Seguir con sesiones cortas y regulares (5-10 minutos al dia).",
          "Celebrar los aciertos y usar los errores como parte del aprendizaje.",
        ];

  const lines: string[] = [
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
    `Nombre del alumno:  ${name}`,
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
    "",
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

  const contentOps: string[] = [];
  contentOps.push("BT");
  contentOps.push("/F1 12 Tf");
  contentOps.push(`${left} ${startY} Td`);
  contentOps.push(`(${escapePdfText(lines[0]!)}) Tj`);

  for (let i = 1; i < lines.length; i++) {
    contentOps.push(`0 -${leading} Td`);
    contentOps.push(`(${escapePdfText(lines[i]!)}) Tj`);
  }
  contentOps.push("ET");

  const streamFinal = contentOps.join("\n");
  const streamLenFinal = new TextEncoder().encode(streamFinal).length;

  const objects: string[] = [];
  objects.push("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
  objects.push("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n");
  objects.push(
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 ${pageHeight}] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n`,
  );
  objects.push(
    `4 0 obj\n<< /Length ${streamLenFinal} >>\nstream\n${streamFinal}\nendstream\nendobj\n`,
  );
  objects.push(
    "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
  );

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [0];
  for (const obj of objects) {
    offsets.push(pdf.length);
    pdf += obj;
  }
  const xrefPos = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  pdf += `startxref\n${xrefPos}\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
}

export function downloadProgressReportPdf(
  data?: Partial<ProgressReportData>,
  filename = "informe-progreso-academia-arcana.pdf",
) {
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
