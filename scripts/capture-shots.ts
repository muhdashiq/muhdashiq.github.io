// Takes a phone-sized screenshot of every live project, for the cards.
// Runs in CI before the build; a project that fails keeps its placeholder.
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { loadProjects } from './load-projects.ts';

const VIEWPORT = { width: 390, height: 844 };
const MAX_HEIGHT = Math.round(VIEWPORT.height * 2.4);

const shotsDir = fileURLToPath(new URL('../public/shots/', import.meta.url));
const manifestPath = fileURLToPath(new URL('../src/generated/shots.json', import.meta.url));

type Shot = { file: string; width: number; height: number };

const projects = (await loadProjects()).filter((project) => project.url);
await mkdir(shotsDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: 1,
  isMobile: true,
  hasTouch: true,
  colorScheme: 'light',
  reducedMotion: 'reduce',
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
});

const shots: Record<string, Shot> = {};

for (const project of projects) {
  if (!project.url) continue;
  const page = await context.newPage();
  try {
    await page.goto(project.url, { waitUntil: 'networkidle', timeout: 45_000 });
    await page.waitForTimeout(1_500);
    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const height = Math.min(Math.max(pageHeight, VIEWPORT.height), MAX_HEIGHT);
    const file = `${project.slug}.jpg`;
    await page.screenshot({
      path: shotsDir + file,
      type: 'jpeg',
      quality: 78,
      fullPage: true,
      clip: { x: 0, y: 0, width: VIEWPORT.width, height },
    });
    shots[project.slug] = { file, width: VIEWPORT.width, height };
    console.log(`captured ${project.slug} (${height}px tall)`);
  } catch (error) {
    console.warn(`skipped ${project.slug}: ${error instanceof Error ? error.message.split('\n')[0] : String(error)}`);
  } finally {
    await page.close();
  }
}

await browser.close();
await writeFile(manifestPath, `${JSON.stringify(shots, null, 2)}\n`);
console.log(`${Object.keys(shots).length} of ${projects.length} screenshots captured`);
