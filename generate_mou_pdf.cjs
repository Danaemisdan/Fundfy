const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const PAGE_H = 1528;
const PAGE_W = 1080;
const PORT = 4175;

(async () => {
  console.log('🚀 Launching browser to generate MOU PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--use-gl=swiftshader',
      '--enable-webgl',
      '--enable-accelerated-2d-canvas',
      '--ignore-gpu-blocklist',
      '--disable-gpu-sandbox',
      '--font-render-hinting=none',
    ],
  });

  const page = await browser.newPage();

  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('hasSeenSplash', 'true');
  });

  await page.setViewport({ width: PAGE_W, height: PAGE_H, deviceScaleFactor: 1 });

  console.log(`📄 Loading http://localhost:${PORT}/pdf-mou ...`);
  await page.goto(`http://localhost:${PORT}/pdf-mou`, {
    waitUntil: 'networkidle0',
    timeout: 30000,
  });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise(r => setTimeout(r, 2000)); // wait for images

  const outputPath = path.resolve(__dirname, 'Fundfy_Partnership_MOU.pdf');

  console.log('🖨️  Generating PDF...');
  await page.pdf({
    path: outputPath,
    width: `${PAGE_W}px`,
    height: `${PAGE_H}px`,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();

  const sizeMB = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(2);
  console.log(`\n✅ PDF ready: Fundfy_Partnership_MOU.pdf (${sizeMB} MB)`);
  console.log(`📁 ${outputPath}`);
})();
