import { chromium } from "playwright";
import { mkdirSync } from "fs";

mkdirSync("/workspace/screenshots", { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => {
  if (m.type() === "error") errors.push("console:" + m.text());
});

await page.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

// dismiss story / diag
for (const name of [/Ahora no/i, /Continuar|Cerrar|Entendido|¡Vamos!/i]) {
  const b = page.getByRole("button", { name });
  if (await b.count()) {
    try { await b.first().click({ timeout: 1000 }); } catch {}
    await page.waitForTimeout(300);
  }
}

// clear localStorage and reload for clean state
await page.evaluate(() => {
  localStorage.clear();
});
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(800);
const skip = page.getByRole("button", { name: /Ahora no/i });
if (await skip.count()) await skip.first().click();
await page.waitForTimeout(300);

console.log("HOME text sample:", (await page.locator("body").innerText()).slice(0, 300).replace(/\n/g," | "));

// Click Torre de Números on map
const torre = page.getByRole("button", { name: /Torre de Números/i });
console.log("torre count", await torre.count());
if (await torre.count()) await torre.first().click();
else {
  // bottom nav Mates
  await page.getByRole("button", { name: /^Mates$/i }).click();
}
await page.waitForTimeout(600);
console.log("MATH MAP:", (await page.locator("body").innerText()).slice(0, 400).replace(/\n/g," | "));
await page.screenshot({ path: "/workspace/screenshots/v4-math-levels.png", fullPage: true });

const levelBtn = page.getByRole("button", { name: /Chispa/i });
console.log("Chispa", await levelBtn.count());
await levelBtn.first().click();
await page.waitForTimeout(700);
console.log("PLAY:", (await page.locator("body").innerText()).slice(0, 400).replace(/\n/g," | "));
await page.screenshot({ path: "/workspace/screenshots/v4-math-play.png", fullPage: true });

// list all buttons
const buttons = await page.locator("button").allInnerTexts();
console.log("buttons:", buttons.map(t => t.trim().slice(0,40)));

const input = page.locator("input[inputmode=numeric], input").first();
console.log("input", await input.count());
if (await input.count()) await input.fill("99999");

const comprobar = page.getByRole("button", { name: /Comprobar/i });
console.log("comprobar", await comprobar.count());
if (await comprobar.count()) await comprobar.first().click();
await page.waitForTimeout(500);
const afterBtns = await page.locator("button").allInnerTexts();
console.log("after answer buttons:", afterBtns.map(t => t.trim().slice(0,40)));
await page.screenshot({ path: "/workspace/screenshots/v4-math-after-wrong.png", fullPage: true });

const next = page.getByRole("button", { name: /Siguiente pregunta|Ver resumen/i });
console.log("next count", await next.count());
if (await next.count()) await next.first().click();
await page.waitForTimeout(400);

// finish mission
for (let i = 0; i < 8; i++) {
  const chk = page.getByRole("button", { name: /Comprobar/i });
  if (!(await chk.count())) break;
  const inp = page.locator("input").first();
  if (await inp.count()) await inp.fill(String(i + 1));
  await chk.first().click();
  await page.waitForTimeout(200);
  const n = page.getByRole("button", { name: /Siguiente pregunta|Ver resumen/i });
  if (await n.count()) {
    console.log("step", i, await n.first().innerText());
    await n.first().click();
    await page.waitForTimeout(300);
  }
}
await page.screenshot({ path: "/workspace/screenshots/v4-math-summary.png", fullPage: true });
console.log("SUMMARY:", (await page.locator("body").innerText()).slice(0, 300).replace(/\n/g," | "));

// progress
await page.getByRole("button", { name: /^Logros$/i }).click();
await page.waitForTimeout(600);
console.log("TROFEOS has roleta:", (await page.locator("body").innerText()).includes("Roleta"));
await page.screenshot({ path: "/workspace/screenshots/v4-roulette.png", fullPage: true });
const spin = page.getByRole("button", { name: /Girar la roleta/i });
if (await spin.count()) {
  await spin.click();
  await page.waitForTimeout(3600);
  console.log("after spin:", (await page.locator("body").innerText()).match(/Premio|Insignia|Giros|No te quedan|¡Premio[^|]+/)?.[0]);
  await page.screenshot({ path: "/workspace/screenshots/v4-roulette-result.png", fullPage: true });
}

// language flow buttons
await page.getByRole("button", { name: /^Lengua$/i }).click();
await page.waitForTimeout(400);
await page.getByRole("button", { name: /Llama/i }).first().click();
await page.waitForTimeout(500);
// pick option
const cardOpts = page.locator(".space-y-2\\.5 > button, .space-y-2 > button, .space-y-5 button, .space-y-4 button");
// simpler: click buttons that look like options - not Comprobar/Volver
const allB = page.locator("main button, [class*='max-w'] button");
// use text from page
const langBtns = await page.locator("button").allInnerTexts();
console.log("lang buttons", langBtns);
// find option by excluding known
for (const t of langBtns) {
  const s = t.trim();
  if (!s || /Comprobar|Pista|Volver|Mapa|Hoy|Mates|Lengua|English|Libros|Logros|Entrenamiento|Oficial|Trueno|Chispa/i.test(s)) continue;
  if (s.length < 40) {
    await page.getByRole("button", { name: s, exact: true }).first().click();
    break;
  }
}
await page.getByRole("button", { name: /Comprobar/i }).click();
await page.waitForTimeout(300);
console.log("lang after:", (await page.getByRole("button", { name: /Siguiente pregunta|Ver resumen|Comprobar/i }).allInnerTexts()));
await page.screenshot({ path: "/workspace/screenshots/v4-lang-after.png", fullPage: true });

console.log("ERRORS", errors.length ? errors : "none");
await browser.close();
