const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:4173/presentation-poster/ai-education-innovation-contest?ref=admin', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: '/Users/sanjeevn/.gemini/antigravity/brain/991d2af4-74d4-47b6-9e3f-632b90ffb104/artifacts/test_shot.png' });
  await browser.close();
})();
