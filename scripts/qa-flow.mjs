import { chromium } from "playwright";
import { mkdirSync } from "fs";

mkdirSync("/workspace/screenshots", { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});

await page.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle" });
await page.waitForTimeout(800);

// skip diagnostic if present
const skip = page.getByRole("button", { name: /Ahora no/i });
if (await skip.count()) await skip.click();

await page.screenshot({ path: "/workspace/screenshots/v4-home.png", fullPage: true });

// go to math via nav or map
const mates = page.getByRole("button", { name: /Mates|Torre de Números/i }).first();
await mates.click();
await page.waitForTimeout(500);
await page.screenshot({ path: "/workspace/screenshots/v4-math-levels.png", fullPage: true });

// pick Chispa
const chispa = page.getByRole("button", { name: /Chispa/i }).first();
await chispa.click();
await page.waitForTimeout(600);
await page.screenshot({ path: "/workspace/screenshots/v4-math-play.png", fullPage: true });

// before answer: should see Comprobar, not Siguiente
const comprobar = page.getByRole("button", { name: /^Comprobar$/i });
const siguiente0 = page.getByRole("button", { name: /Siguiente pregunta/i });
console.log("before: Comprobar", await comprobar.count(), "Siguiente", await siguiente0.count());

// type wrong answer
const input = page.locator("input").first();
if (await input.count()) {
  await input.fill("99999");
  await comprobar.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: "/workspace/screenshots/v4-math-after-wrong.png", fullPage: true });
  const nextBtn = page.getByRole("button", { name: /Siguiente pregunta|Ver resumen/i });
  console.log("after wrong: next buttons", await nextBtn.count(), "Comprobar", await comprobar.count());
  await nextBtn.first().click();
  await page.waitForTimeout(400);
}

// answer remaining quickly with empty/wrong then next
for (let i = 0; i < 6; i++) {
  const check = page.getByRole("button", { name: /^Comprobar$/i });
  if (await check.count() === 0) break;
  const inp = page.locator("input").first();
  if (await inp.count()) await inp.fill("1");
  await check.click();
  await page.waitForTimeout(250);
  const next = page.getByRole("button", { name: /Siguiente pregunta|Ver resumen/i });
  if (await next.count()) {
    const label = await next.first().innerText();
    console.log("next label:", label);
    await next.first().click();
    await page.waitForTimeout(400);
  }
}

await page.screenshot({ path: "/workspace/screenshots/v4-math-summary.png", fullPage: true });

// trophies / roulette
const logros = page.getByRole("button", { name: /Logros|Sala de Trofeos/i }).first();
await logros.click();
await page.waitForTimeout(600);
await page.screenshot({ path: "/workspace/screenshots/v4-roulette.png", fullPage: true });
const spin = page.getByRole("button", { name: /Girar la roleta/i });
console.log("spin button", await spin.count());
if (await spin.count()) {
  await spin.click();
  await page.waitForTimeout(3500);
  await page.screenshot({ path: "/workspace/screenshots/v4-roulette-result.png", fullPage: true });
}

// language levels
const lengua = page.getByRole("button", { name: /Lengua|Biblioteca/i }).first();
await lengua.click();
await page.waitForTimeout(400);
await page.screenshot({ path: "/workspace/screenshots/v4-lang-levels.png", fullPage: true });
const llama = page.getByRole("button", { name: /Llama/i }).first();
if (await llama.count()) {
  await llama.click();
  await page.waitForTimeout(500);
  // select first option
  const opts = page.locator("button").filter({ hasText: /.+/ });
  // click an answer option that's not Comprobar
  const optionBtns = page.locator("div.space-y-2\\.5 button, div.space-y-2 button");
  if (await optionBtns.count()) {
    await optionBtns.first().click();
  }
  const chk = page.getByRole("button", { name: /^Comprobar$/i });
  if (await chk.count()) {
    await chk.click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: "/workspace/screenshots/v4-lang-after.png", fullPage: true });
    console.log("lang after: Siguiente", await page.getByRole("button", { name: /Siguiente pregunta|Ver resumen/i }).count());
  }
}

// english
const eng = page.getByRole("button", { name: /English/i }).first();
await eng.click();
await page.waitForTimeout(400);
const hechizo = page.getByRole("button", { name: /Hechizo/i }).first();
if (await hechizo.count()) {
  await hechizo.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: "/workspace/screenshots/v4-eng-play.png", fullPage: true });
}

console.log("ERRORS:", errors.length ? errors : "none");
const body = await page.locator("body").innerText();
console.log("body sample:", body.slice(0, 200).replace(/\n/g, " | "));
await browser.close();
