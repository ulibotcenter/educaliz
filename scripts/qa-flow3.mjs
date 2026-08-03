import { chromium } from "playwright";
import { mkdirSync } from "fs";
mkdirSync("/workspace/screenshots", { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));

await page.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle" });
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(600);
if (await page.getByRole("button", { name: /Ahora no/i }).count())
  await page.getByRole("button", { name: /Ahora no/i }).click();

// Math
await page.getByRole("button", { name: /Torre de Números/i }).click();
await page.waitForTimeout(400);
await page.getByRole("button", { name: /Empezamos con calma/i }).click();
await page.waitForTimeout(600);
console.log("view header:", await page.locator("header").innerText());
console.log("play body has Comprobar:", (await page.locator("body").innerText()).includes("Comprobar"));
await page.screenshot({ path: "/workspace/screenshots/v4-math-play.png", fullPage: true });

await page.locator("input").first().fill("99999");
await page.getByRole("button", { name: /^Comprobar$/ }).click();
await page.waitForTimeout(400);
const after = await page.getByRole("button", { name: /Siguiente pregunta|Ver resumen|Comprobar/ }).allInnerTexts();
console.log("math after wrong:", after);
await page.screenshot({ path: "/workspace/screenshots/v4-math-after-wrong.png", fullPage: true });

// finish 5 questions
for (let i = 0; i < 6; i++) {
  const chk = page.getByRole("button", { name: /^Comprobar$/ });
  if (await chk.count()) {
    const inp = page.locator("input").first();
    if (await inp.count()) await inp.fill("0");
    await chk.click();
    await page.waitForTimeout(200);
  }
  const n = page.getByRole("button", { name: /Siguiente pregunta|Ver resumen/ });
  if (await n.count()) {
    console.log("btn:", (await n.innerText()).trim());
    await n.click();
    await page.waitForTimeout(300);
  } else break;
}
await page.screenshot({ path: "/workspace/screenshots/v4-math-summary.png", fullPage: true });
console.log("summary has:", (await page.locator("body").innerText()).slice(0,250).replace(/\n/g," | "));

// Roulette
await page.getByRole("button", { name: /^Logros$/ }).click();
await page.waitForTimeout(500);
await page.screenshot({ path: "/workspace/screenshots/v4-roulette.png", fullPage: true });
const body = await page.locator("body").innerText();
console.log("roulette section:", body.includes("Roleta de Recompensas"), "giros:", body.match(/Giros disponibles: \d+/)?.[0]);
await page.getByRole("button", { name: /Girar la roleta/i }).click();
await page.waitForTimeout(3600);
const afterSpin = await page.locator("body").innerText();
console.log("prize:", afterSpin.match(/¡Premio[^!\n]*!|¡Insignia[^!\n]*!/)?.[0]);
await page.screenshot({ path: "/workspace/screenshots/v4-roulette-result.png", fullPage: true });

// English levels + buttons
await page.getByRole("button", { name: /^English$/ }).click();
await page.waitForTimeout(400);
await page.getByRole("button", { name: /Retos intermedios|Hechizo/i }).first().click();
await page.waitForTimeout(500);
// click option
const btns = await page.locator("button").allInnerTexts();
for (const t of btns) {
  const s = t.trim();
  if (s && !/Comprobar|Pista|Mapa|Hoy|Mates|Lengua|English|Libros|Logros|Trueno|Chispa|Volver/i.test(s) && s.length < 30) {
    await page.getByRole("button", { name: s, exact: true }).first().click();
    break;
  }
}
await page.getByRole("button", { name: /^Comprobar$/ }).click();
await page.waitForTimeout(300);
console.log("eng after:", await page.getByRole("button", { name: /Siguiente|Ver resumen|Comprobar/ }).allInnerTexts());
await page.screenshot({ path: "/workspace/screenshots/v4-eng-after.png", fullPage: true });

// desktop viewport home levels
const page2 = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page2.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle" });
await page2.waitForTimeout(500);
await page2.screenshot({ path: "/workspace/screenshots/v4-desktop-home.png", fullPage: false });

console.log("ERRORS", errors.length ? errors : "none");
await browser.close();
