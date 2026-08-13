const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const referrers = ['chinni'];  // only Chinni for now; add more to generate more

const BASE_URL = 'http://localhost:4173/id-card';
const OUTPUT_DIR = path.join(__dirname, 'Employee ID');

async function generateIDCards() {
  console.log('Launching browser for ID card generation...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('hasSeenSplash', 'true');
  });

  // ID card canvas = 1012×638px — set scale 2 for high-res
  await page.setViewport({ width: 1012, height: 638, deviceScaleFactor: 2 });

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const ref of referrers) {
    const url = `${BASE_URL}/${ref}`;
    console.log(`Loading ${url}...`);
    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      await new Promise(r => setTimeout(r, 3000)); // wait for globe + QR

      const card = await page.$('.w-\\[1012px\\]');
      if (!card) {
        console.error(`ERROR: Could not find ID card element for ${ref}`);
        continue;
      }

      const outPath = path.join(OUTPUT_DIR, `${ref}-id-card.png`);
      await card.screenshot({ path: outPath });
      console.log(`✅ Saved: ${outPath}`);
    } catch (e) {
      console.error(`❌ Failed for ${ref}:`, e.message);
    }
  }

  await browser.close();
  console.log('\nAll done!');
}

generateIDCards().catch(console.error);
