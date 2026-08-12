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
  'admin'
];

const contests = [
  'ai-innovation-contest',
  'career-accelerator-contest',
  '3d-asset-design-contest',
  'digital-character-design-contest',
  'web-experience-design-contest',
  'ai-education-innovation-contest'
];

const BASE_URL = 'http://localhost:4173/poster';

async function generatePosters() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: "new"
  });
  const page = await browser.newPage();
  
  // Bypass splash screen!
  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('hasSeenSplash', 'true');
  });

  // Set viewport large enough to fit the poster
  await page.setViewport({ width: 800, height: 1200, deviceScaleFactor: 2 }); // Scale factor 2 for high quality retina images

  const outputDir = path.join(__dirname, 'Generated_Posters');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  for (const referrer of referrers) {
    const referrerDir = path.join(outputDir, referrer);
    if (!fs.existsSync(referrerDir)) {
      fs.mkdirSync(referrerDir);
    }

    console.log(`\nGenerating posters for: ${referrer}`);

    for (const contest of contests) {
      const url = `${BASE_URL}/${contest}?ref=${referrer}`;
      console.log(`Loading ${url}...`);
      
      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        
        // Wait an extra 2 seconds to ensure fonts, globe, and QR code have fully loaded and rendered
        await new Promise(r => setTimeout(r, 2000));
        
        // Target the actual poster element so we don't get the background padding
        const posterElement = await page.$('.max-w-\\[500px\\]');
        if (!posterElement) {
          console.error(`ERROR: Could not find poster element on ${url}`);
          continue;
        }

        const screenshotPath = path.join(referrerDir, `${contest}.png`);
        
        // Take screenshot of only the poster box
        await posterElement.screenshot({ path: screenshotPath });
        console.log(`✅ Saved: ${screenshotPath}`);
      } catch (e) {
        console.error(`❌ Failed to capture ${contest} for ${referrer}:`, e.message);
      }
    }
  }

  await browser.close();
  console.log('\nAll done! Posters are saved in the Generated_Posters directory.');
}

generatePosters().catch(console.error);
