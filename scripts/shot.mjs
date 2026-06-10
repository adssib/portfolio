import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const URL = process.env.SHOT_URL || "http://localhost:3000";
const OUT = "/tmp/shots";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

async function capture(theme) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  await ctx.addInitScript((t) => {
    try {
      localStorage.setItem("theme", t);
    } catch {}
  }, theme);
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(2200);
  await page.mouse.move(900, 520);
  await page.waitForTimeout(400);

  // hero (nav accent, badge spark, moving-border CTA)
  await page.screenshot({
    path: `${OUT}/${theme}-hero.png`,
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });

  // section shots where the accent now shows
  for (const id of ["skills"]) {
    await page.evaluate((sel) => {
      document.querySelector(sel)?.scrollIntoView({ block: "start" });
    }, `#${id}`);
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${OUT}/${theme}-${id}.png` });
  }

  await ctx.close();
}

await capture("light");
await capture("dark");
await browser.close();
console.log("done");
