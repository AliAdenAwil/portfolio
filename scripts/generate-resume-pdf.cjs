/**
 * Renders resume-src.html to resume.pdf (Letter) using Playwright Chromium.
 * Requires: npm run install:browsers
 */
const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require('@playwright/test');

const ROOT = path.join(__dirname, '..');
const src = path.join(ROOT, 'resume-src.html');
const out = path.join(ROOT, 'resume.pdf');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(pathToFileURL(src).href, { waitUntil: 'load' });
  await page.pdf({
    path: out,
    format: 'Letter',
    printBackground: true,
    margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' },
  });
  await browser.close();
  console.log('Wrote', out);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
