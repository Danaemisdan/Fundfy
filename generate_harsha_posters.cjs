const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const contests = [
  'ai-innovation-contest',
  '3d-asset-design-contest',
  'digital-character-design-contest',
  'web-experience-design-contest',
  'career-accelerator-program'
];

const BASE_URL = 'http://localhost:4173/harsha-poster';

async function generateHarshaPosters() {
  console.log('Launching browser for Harsha Sai posters...');
  const browser = await puppeteer.launch({
    headless: "new"
  });
  const page = await browser.newPage();
  
  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('hasSeenSplash', 'true');
  });

  // Set viewport to exact Instagram portrait size
  await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 2 }); 

  const outputDir = path.join(__dirname, 'Harsha Sai');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  console.log(`\nGenerating posters for: Harsha Sai in Instagram format (1080x1350)`);

  for (const contest of contests) {
    const url = `${BASE_URL}/${contest}?ref=harshasai`;
    console.log(`Loading ${url}...`);
    
    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      
      await new Promise(r => setTimeout(r, 2000));
      
      const posterElement = await page.$('.w-\\[1080px\\]');
      if (!posterElement) {
        console.error(`ERROR: Could not find poster element on ${url}`);
        continue;
      }

      const screenshotPath = path.join(outputDir, `${contest}.png`);
      
      await posterElement.screenshot({ path: screenshotPath });
      console.log(`✅ Saved: ${screenshotPath}`);
    } catch (e) {
      console.error(`❌ Failed to capture ${contest}:`, e.message);
    }
  }

  await browser.close();
  console.log('\nAll done! Posters are saved in the "Harsha Sai" directory.');
}

generateHarshaPosters().catch(console.error);
