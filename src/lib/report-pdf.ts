/**
 * Parent-facing progress report PDF — colorful, clear, family-friendly.
 * Neutral: no school or teacher names.
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
  totalCorrect?: number;
  totalWrong?: number;
  bossBeaten?: { math: boolean; language: boolean; english: boolean };
  perfectMissions?: number;
  levelSummary?: string[];
};

const DEFAULT: ProgressReportData = {
  studentName: "Aprendiz",
  period: "Verano 2026",
  mathDone: 0,
  mathTotal: 30,
  languageDone: 0,
  languageTotal: 20,
  englishDone: 0,
  englishTotal: 15,
  readingDone: 0,
  readingTotal: 2,
  missionsCompleted: 0,
  missionsTotal: 67,
  accuracyPercent: null,
  streakDays: 0,
  maxStreak: 0,
  points: 0,
  xp: 0,
  level: 1,
  levelTitle: "Aprendiz de chispas",
  badges: [],
  strongAreas: [],
  weakAreas: [],
  observations: [],
  generatedAt: "",
  totalCorrect: 0,
  totalWrong: 0,
  bossBeaten: { math: false, language: false, english: false },
  perfectMissions: 0,
  levelSummary: [],
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

function pct(done: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(100, Math.round((done / total) * 100));
}

function wrapLine(text: string, max = 72): string[] {
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

type Op = string;

function rgb(r: number, g: number, b: number): string {
  return `${(r / 255).toFixed(3)} ${(g / 255).toFixed(3)} ${(b / 255).toFixed(3)}`;
}

/** Multi-section colorful PDF report for parents */
export function buildProgressReportPdf(
  data: Partial<ProgressReportData> = {},
): Blob {
  const d: ProgressReportData = { ...DEFAULT, ...data };
  const name = d.studentName || "Aprendiz";
  const period = d.period || "Verano 2026";
  const acc =
    d.accuracyPercent === null || Number.isNaN(d.accuracyPercent)
      ? null
      : d.accuracyPercent;
  const answered = (d.totalCorrect ?? 0) + (d.totalWrong ?? 0);

  const strong =
    d.strongAreas.length > 0
      ? d.strongAreas
      : ["Aun no hay suficientes datos (hace falta practicar un poco mas)."];
  const weak =
    d.weakAreas.length > 0
      ? d.weakAreas
      : ["Sin areas debiles claras por ahora. Sigue practicando!"];
  const badges =
    d.badges.length > 0
      ? d.badges
      : ["Todavia sin insignias desbloqueadas."];

  const obs =
    d.observations.length > 0
      ? d.observations
      : [
          "Seguir con sesiones cortas y regulares (5-10 minutos al dia).",
          "Celebrar los aciertos y usar los errores como parte del aprendizaje.",
        ];

  const pageW = 595;
  const pageH = 842;
  const margin = 40;
  const contentW = pageW - margin * 2;
  const ops: Op[] = [];

  let y = pageH - 36;

  const fillRect = (
    x: number,
    yy: number,
    w: number,
    h: number,
    color: string,
  ) => {
    ops.push(`${color} rg`);
    ops.push(`${x.toFixed(1)} ${yy.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)} re f`);
  };

  const strokeRect = (
    x: number,
    yy: number,
    w: number,
    h: number,
    color: string,
    lw = 1,
  ) => {
    ops.push(`${lw} w`);
    ops.push(`${color} RG`);
    ops.push(`${x.toFixed(1)} ${yy.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)} re S`);
  };

  const textAt = (
    str: string,
    x: number,
    yy: number,
    size: number,
    color = "0 0 0",
    bold = false,
  ) => {
    ops.push("BT");
    ops.push(`${color} rg`);
    ops.push(`/${bold ? "F2" : "F1"} ${size} Tf`);
    ops.push(`${x.toFixed(1)} ${yy.toFixed(1)} Td`);
    ops.push(`(${escapePdfText(str)}) Tj`);
    ops.push("ET");
  };

  const ensureSpace = (need: number) => {
    if (y - need < 48) {
      // Soft stop — content is sized for one page; compress if needed
      y = Math.max(y, 50);
    }
  };

  // ── Header banner ──
  fillRect(0, pageH - 88, pageW, 88, rgb(88, 60, 160));
  fillRect(0, pageH - 92, pageW, 6, rgb(245, 190, 70));
  textAt("ACADEMIA ARCANA", margin, pageH - 38, 11, "1 1 1", true);
  textAt("Informe de progreso familiar", margin, pageH - 58, 18, "1 1 1", true);
  textAt(
    d.generatedAt ? `Generado: ${d.generatedAt}` : period,
    margin,
    pageH - 76,
    9,
    rgb(220, 210, 255),
  );
  y = pageH - 110;

  // ── Student card ──
  fillRect(margin, y - 58, contentW, 62, rgb(245, 240, 255));
  strokeRect(margin, y - 58, contentW, 62, rgb(160, 130, 220), 1.2);
  textAt(name, margin + 12, y - 22, 16, rgb(50, 30, 100), true);
  textAt(
    `Nivel ${d.level}  ·  ${d.levelTitle}`,
    margin + 12,
    y - 40,
    11,
    rgb(80, 60, 140),
  );
  textAt(
    `Periodo: ${period}   |   XP: ${d.xp}   |   Puntos: ${d.points}`,
    margin + 12,
    y - 54,
    9,
    rgb(90, 80, 120),
  );
  y -= 78;

  // ── Big stats row ──
  const statW = (contentW - 18) / 4;
  const stats: { label: string; value: string; bg: string; fg: string }[] = [
    {
      label: "Aciertos",
      value: acc === null ? "—" : `${acc}%`,
      bg: rgb(220, 245, 230),
      fg: rgb(20, 100, 50),
    },
    {
      label: "Racha",
      value: `${d.streakDays}d`,
      bg: rgb(255, 235, 220),
      fg: rgb(160, 70, 20),
    },
    {
      label: "Partidas",
      value: `${d.missionsCompleted}`,
      bg: rgb(225, 235, 255),
      fg: rgb(30, 60, 140),
    },
    {
      label: "Insignias",
      value: `${d.badges.length}`,
      bg: rgb(255, 245, 210),
      fg: rgb(140, 100, 10),
    },
  ];
  stats.forEach((st, i) => {
    const x = margin + i * (statW + 6);
    fillRect(x, y - 48, statW, 50, st.bg);
    strokeRect(x, y - 48, statW, 50, st.fg, 0.8);
    textAt(st.value, x + 8, y - 22, 14, st.fg, true);
    textAt(st.label, x + 8, y - 38, 8, st.fg);
  });
  y -= 66;

  if (answered > 0) {
    textAt(
      `Preguntas respondidas: ${answered}  (${d.totalCorrect ?? 0} bien · ${d.totalWrong ?? 0} a repasar)`,
      margin,
      y,
      9,
      rgb(70, 70, 90),
    );
    y -= 16;
  }

  // ── Progress by area ──
  textAt("PROGRESO POR AREA", margin, y, 12, rgb(60, 40, 120), true);
  y -= 8;
  fillRect(margin, y - 2, 120, 3, rgb(245, 190, 70));
  y -= 18;

  const areas: {
    label: string;
    done: number;
    total: number;
    color: string;
  }[] = [
    {
      label: "Matematicas",
      done: d.mathDone,
      total: d.mathTotal,
      color: rgb(100, 80, 200),
    },
    {
      label: "Lengua",
      done: d.languageDone,
      total: d.languageTotal,
      color: rgb(40, 150, 160),
    },
    {
      label: "Ingles",
      done: d.englishDone,
      total: d.englishTotal,
      color: rgb(50, 110, 200),
    },
    {
      label: "Lectura",
      done: d.readingDone,
      total: d.readingTotal,
      color: rgb(40, 160, 90),
    },
  ];

  for (const a of areas) {
    ensureSpace(28);
    const p = pct(a.done, a.total);
    textAt(
      `${a.label}:  ${a.done}/${a.total} partidas  (${p}%)`,
      margin,
      y,
      10,
      rgb(40, 40, 60),
      true,
    );
    y -= 8;
    // bar background
    const barH = 10;
    const barY = y - barH;
    fillRect(margin, barY, contentW, barH, rgb(230, 230, 240));
    const fillW = Math.max(2, (contentW * p) / 100);
    fillRect(margin, barY, fillW, barH, a.color);
    y -= 22;
  }

  // overall bar
  const overall = pct(d.missionsCompleted, d.missionsTotal);
  textAt(
    `Total de metas blandas: ${d.missionsCompleted}/${d.missionsTotal}  (${overall}%)`,
    margin,
    y,
    9,
    rgb(60, 50, 90),
  );
  y -= 20;

  // ── Bosses + perfect ──
  const bosses = d.bossBeaten ?? {
    math: false,
    language: false,
    english: false,
  };
  textAt("JEFES Y LOGROS", margin, y, 12, rgb(60, 40, 120), true);
  y -= 8;
  fillRect(margin, y - 2, 100, 3, rgb(245, 190, 70));
  y -= 16;
  const bossLine = [
    `Guardian de Numeros: ${bosses.math ? "VENCIDO" : "pendiente"}`,
    `Biblioteca: ${bosses.language ? "VENCIDO" : "pendiente"}`,
    `English Sphinx: ${bosses.english ? "VENCIDO" : "pendiente"}`,
  ].join("   ·   ");
  for (const line of wrapLine(bossLine, 78)) {
    textAt(line, margin, y, 9, rgb(50, 50, 70));
    y -= 12;
  }
  textAt(
    `Partidas perfectas: ${d.perfectMissions ?? 0}   ·   Racha maxima: ${d.maxStreak} dia(s)`,
    margin,
    y,
    9,
    rgb(50, 50, 70),
  );
  y -= 18;

  if (d.levelSummary && d.levelSummary.length > 0) {
    textAt("Partidas por nivel:", margin, y, 9, rgb(60, 50, 100), true);
    y -= 12;
    for (const ls of d.levelSummary) {
      for (const w of wrapLine(ls, 78)) {
        textAt(w, margin, y, 8, rgb(70, 70, 90));
        y -= 11;
      }
    }
    y -= 6;
  }

  // ── Badges ──
  textAt("INSIGNIAS", margin, y, 12, rgb(60, 40, 120), true);
  y -= 8;
  fillRect(margin, y - 2, 70, 3, rgb(245, 190, 70));
  y -= 16;
  for (const b of badges) {
    for (const w of wrapLine(`* ${b}`, 78)) {
      textAt(w, margin, y, 9, rgb(50, 50, 70));
      y -= 11;
    }
  }
  y -= 8;

  // ── Strong / weak ──
  const colW = (contentW - 12) / 2;
  const boxH = 72;
  ensureSpace(boxH + 20);
  fillRect(margin, y - boxH, colW, boxH, rgb(225, 245, 230));
  strokeRect(margin, y - boxH, colW, boxH, rgb(40, 140, 70), 0.8);
  fillRect(margin + colW + 12, y - boxH, colW, boxH, rgb(255, 235, 230));
  strokeRect(margin + colW + 12, y - boxH, colW, boxH, rgb(180, 70, 50), 0.8);
  textAt("Areas fuertes", margin + 8, y - 14, 10, rgb(20, 100, 50), true);
  textAt(
    "A practicar",
    margin + colW + 20,
    y - 14,
    10,
    rgb(150, 50, 30),
    true,
  );
  let ys = y - 28;
  let yw = y - 28;
  for (const s of strong.slice(0, 3)) {
    for (const w of wrapLine(s, 32)) {
      textAt(w, margin + 8, ys, 8, rgb(30, 80, 40));
      ys -= 10;
    }
  }
  for (const s of weak.slice(0, 3)) {
    for (const w of wrapLine(s, 32)) {
      textAt(w, margin + colW + 20, yw, 8, rgb(120, 40, 30));
      yw -= 10;
    }
  }
  y -= boxH + 16;

  // ── Recommendations ──
  textAt("RECOMENDACIONES", margin, y, 12, rgb(60, 40, 120), true);
  y -= 8;
  fillRect(margin, y - 2, 120, 3, rgb(245, 190, 70));
  y -= 16;
  for (const o of obs.slice(0, 6)) {
    for (const w of wrapLine(`- ${o}`, 78)) {
      ensureSpace(12);
      textAt(w, margin, y, 9, rgb(40, 40, 55));
      y -= 11;
    }
    y -= 3;
  }

  // Footer
  fillRect(0, 0, pageW, 36, rgb(88, 60, 160));
  textAt(
    "Academia Arcana · Informe familiar · Sin datos de colegio ni docentes",
    margin,
    14,
    8,
    "1 1 1",
  );
  textAt(
    "La familia decide si guarda o comparte este documento.",
    margin + 280,
    14,
    7,
    rgb(220, 210, 255),
  );

  const streamFinal = ops.join("\n");
  const streamLenFinal = new TextEncoder().encode(streamFinal).length;

  const objects: string[] = [];
  objects.push("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
  objects.push("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n");
  objects.push(
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj\n`,
  );
  objects.push(
    `4 0 obj\n<< /Length ${streamLenFinal} >>\nstream\n${streamFinal}\nendstream\nendobj\n`,
  );
  objects.push(
    "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
  );
  objects.push(
    "6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n",
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
): { ok: true } | { ok: false; error: string } {
  try {
    const blob = buildProgressReportPdf(data);
    if (!blob || blob.size < 100) {
      return {
        ok: false,
        error: "No se pudo crear el PDF. Inténtalo otra vez.",
      };
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
    a.rel = "noopener";
    a.type = "application/pdf";
    a.style.display = "none";
    document.body.appendChild(a);

    // Synchronous click in the same user-gesture stack (mobile + desktop)
    a.click();

    // iOS / some WebViews ignore download attr — open in a new tab as backup
    const isIOS =
      typeof navigator !== "undefined" &&
      /iPad|iPhone|iPod|Mobile/.test(navigator.userAgent);
    if (isIOS) {
      window.setTimeout(() => {
        try {
          window.open(url, "_blank", "noopener,noreferrer");
        } catch {
          /* ignore */
        }
      }, 250);
    }

    window.setTimeout(() => {
      try {
        a.remove();
        URL.revokeObjectURL(url);
      } catch {
        /* ignore */
      }
    }, 60_000);

    return { ok: true };
  } catch (e) {
    const msg =
      e instanceof Error ? e.message : "Error al generar el informe PDF.";
    return { ok: false, error: msg };
  }
}
