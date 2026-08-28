const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const SLIDE_H = 1080;
const SLIDE_W = 1920;
const TOTAL_SLIDES = 5;
const PORT = process.env.PORT || 4175;
const TMP_DIR = path.resolve(__dirname, '.tmp_slides');

(async () => {
  // Clean / create temp dir
  if (fs.existsSync(TMP_DIR)) fs.rmSync(TMP_DIR, { recursive: true });
  fs.mkdirSync(TMP_DIR);

  console.log('🚀 Launching browser with WebGL support...');
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

  // ── Step 1: Screenshot each slide ──────────────────────────────────────────
  const slidePage = await browser.newPage();

  await slidePage.evaluateOnNewDocument(() => {
    sessionStorage.setItem('hasSeenSplash', 'true');
  });

  await slidePage.setViewport({ width: SLIDE_W, height: SLIDE_H, deviceScaleFactor: 1 });

  console.log(`📄 Loading http://localhost:${PORT}/pdf-presentation ...`);
  await slidePage.goto(`http://localhost:${PORT}/pdf-presentation`, {
    waitUntil: 'networkidle0',
    timeout: 30000,
  });
  await slidePage.evaluateHandle('document.fonts.ready');

  const slidePaths = [];

  for (let i = 0; i < TOTAL_SLIDES; i++) {
    const scrollY = i * SLIDE_H;
    await slidePage.evaluate((y) => window.scrollTo(0, y), scrollY);

    const delay = i === 0 ? 7000 : 2000;
    console.log(`⏳ Slide ${i + 1}: waiting ${delay / 1000}s...`);
    await new Promise(r => setTimeout(r, delay));

    const filePath = path.join(TMP_DIR, `slide_${i + 1}.png`);
    await slidePage.screenshot({
      path: filePath,
      type: 'png',
      clip: { x: 0, y: scrollY, width: SLIDE_W, height: SLIDE_H },
    });
    slidePaths.push(filePath);
    console.log(`✓ Slide ${i + 1} → ${filePath}`);
  }

  await slidePage.close();

  // ── Step 2: Compose PNG files into a PDF ───────────────────────────────────
  console.log('\n🖨️  Composing PDF from PNG files...');

  // Write a temp HTML that references the PNGs via file:// URLs
  const slideHtml = slidePaths
    .map(p => `<div class="slide"><img src="${p.replace(/\\/g, '/')}" /></div>`)
    .join('\n    ');

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @page { size: ${SLIDE_W}px ${SLIDE_H}px; margin: 0; }
  body { background: #000; }
  .slide {
    width: ${SLIDE_W}px;
    height: ${SLIDE_H}px;
    page-break-after: always;
    break-after: page;
    overflow: hidden;
    display: block;
  }
  img {
    width: ${SLIDE_W}px;
    height: ${SLIDE_H}px;
    display: block;
    object-fit: cover;
  }
</style>
</head>
<body>
    ${slideHtml}
</body>
</html>`;

  const tmpHtmlPath = path.join(TMP_DIR, 'compose.html');
  fs.writeFileSync(tmpHtmlPath, htmlContent, 'utf8');

  const composePage = await browser.newPage();
  await composePage.setViewport({ width: SLIDE_W, height: SLIDE_H });

  // Navigate using file:// so local PNGs load correctly
  await composePage.goto(`file://${tmpHtmlPath}`, {
    waitUntil: 'networkidle0',
    timeout: 30000,
  });
  await new Promise(r => setTimeout(r, 1000));

  const outputPath = path.resolve(__dirname, 'GlobalTalentHunt2026_Presentation.pdf');

  await composePage.pdf({
    path: outputPath,
    width: `${SLIDE_W}px`,
    height: `${SLIDE_H}px`,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();

  // Cleanup temp files
  fs.rmSync(TMP_DIR, { recursive: true });

  const sizeMB = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(2);
  console.log(`\n✅ PDF ready: GlobalTalentHunt2026_Presentation.pdf (${sizeMB} MB)`);
  console.log(`📁 ${outputPath}`);
})();
