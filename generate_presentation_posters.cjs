const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const referrers = [
  'hgnma50',
  'uiapm3492',
  'shruti1',
  'shruti',
  'chinni',
  'uhg0192ha',
  'shrishtipaagal',
  'harshasai',
  'dannyk.virtualex',
  'admin',
  'chandra',
  'originevents',
  'codequesters',
  'studentspot',
  'haricart',
  'nexgennexus'
];

const contests = [
  'ai-innovation-contest',
  '3d-asset-design-contest',
  'digital-character-design-contest',
  'web-experience-design-contest',
  'career-accelerator-program'
];

const BASE_URL = 'http://localhost:5174/presentation-poster';

async function generatePosters() {
  console.log('Launching browser for presentation posters...');
  const browser = await puppeteer.launch({
    headless: "new"
  });
  const page = await browser.newPage();
  
  // Bypass splash screen!
  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('hasSeenSplash', 'true');
  });

  // Set viewport to exactly 1920x1080
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 }); // Scale factor 2 for high quality retina images

  const outputDir = path.join(__dirname, 'Presentation_Posters');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  for (const referrer of referrers) {
    const referrerDir = path.join(outputDir, referrer);
    if (!fs.existsSync(referrerDir)) {
      fs.mkdirSync(referrerDir);
    }

    console.log(`\nGenerating presentation posters for: ${referrer}`);

    for (const contest of contests) {
      const url = `${BASE_URL}/${contest}?ref=${referrer}`;
      console.log(`Loading ${url}...`);
      
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        
        // Wait for React to render the poster element
        await page.waitForSelector('.w-\\[1920px\\]', { timeout: 15000 });

        // Wait an extra 2 seconds to ensure fonts, globe, and QR code have fully loaded and rendered
        await new Promise(r => setTimeout(r, 2000));
        
        // Target the 1920x1080 container element
        const posterElement = await page.$('.w-\\[1920px\\]');
        if (!posterElement) {
          console.error(`ERROR: Could not find presentation poster element on ${url}`);
          continue;
        }

        const screenshotPath = path.join(referrerDir, `${contest}-new-presentation.png`);
        
        // Take screenshot of only the poster box
        await posterElement.screenshot({ path: screenshotPath });
        console.log(`✅ Saved: ${screenshotPath}`);
      } catch (e) {
        console.error(`❌ Failed to capture presentation ${contest} for ${referrer}:`, e.message);
      }
    }
  }

  await browser.close();
  console.log('\nAll done! Presentation posters are saved in the Presentation_Posters directory.');
}

generatePosters().catch(console.error);
