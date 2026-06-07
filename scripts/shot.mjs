import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const URL = process.env.SHOT_URL || "http://localhost:3000";
const OUT = "/tmp/shots";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

async function capture(theme, mouse, tag) {
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
  await page.mouse.move(mouse.x, mouse.y);
  await page.waitForTimeout(600);

  await page.screenshot({ path: `${OUT}/${theme}-${tag}-header.png`, clip: { x: 0, y: 0, width: 1440, height: 160 } });
  await page.screenshot({ path: `${OUT}/${theme}-${tag}-hero.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });
  await ctx.close();
}

// center-resting cursor
await capture("dark", { x: 720, y: 460 }, "center");
// cursor parked right next to the logo
await capture("dark", { x: 170, y: 32 }, "logo");
await capture("light", { x: 170, y: 32 }, "logo");
await browser.close();
console.log("done");
