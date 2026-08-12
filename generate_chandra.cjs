const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');

const referrer = 'chandra';

const contests = [
  {
    id: 'ai-innovation-contest',
    name: 'AI Innovation Contest',
    copy: "Secure your spot for the AI Innovation Contest powered by AWS, Google Cloud, and IBM. The $50,000 prize pool is live, and winners will be awarded by Akon and Sonu Sood. Apply here:\n"
  },
  {
    id: 'career-accelerator-contest',
    name: 'Career Accelerator Contest',
    copy: "The Career Accelerator Contest powered by AWS, Google Cloud, and IBM is officially open. Compete for the $50,000 prize pool and an award from Akon and Sonu Sood. Submit your application here:\n"
  },
  {
    id: '3d-asset-design-contest',
    name: '3D Asset Design Contest',
    copy: "Registration is now open for the 3D Asset Design Contest powered by AWS, Google Cloud, and IBM. There is a $50,000 prize pool on the line, with awards presented by Akon and Sonu Sood. Register here:\n"
  },
  {
    id: 'digital-character-design-contest',
    name: 'Digital Character Design Contest',
    copy: "Applications are live for the Digital Character Design Contest powered by AWS, Google Cloud, and IBM. The prize pool is $50,000, and winners will be awarded by Akon and Sonu Sood. Apply here:\n"
  },
  {
    id: 'web-experience-design-contest',
    name: 'Web Experience Design Contest',
    copy: "The Web Experience Design Contest powered by AWS, Google Cloud, and IBM is now accepting applications. Compete for a $50,000 prize pool, with winners awarded by Akon and Sonu Sood. Enter here:\n"
  },
  {
    id: 'ai-education-innovation-contest',
    name: 'AI Education Innovation Contest',
    copy: "Enter the AI Education Innovation Contest powered by AWS, Google Cloud, and IBM. There is a $50,000 prize pool, and winners are awarded by Akon and Sonu Sood. Secure your entry here:\n"
  }
];

const BASE_URL = 'http://localhost:4173/poster';

async function generateAll() {
  const outputDir = path.join(__dirname, 'Chandra');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  // 1. Generate DOCX
  console.log('Generating DOCX for Chandra...');
  const children = [];
  children.push(
    new Paragraph({
      text: "WhatsApp Promotional Messages - Global Talent Hunt 2026",
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 400 }
    })
  );

  children.push(
    new Paragraph({
      text: `Referrer: ${referrer}`,
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 400, after: 200 }
    })
  );

  contests.forEach((contest) => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: contest.name, bold: true }),
        ],
        spacing: { before: 200 }
      })
    );

    const fullText = contest.copy + `https://fundfy.app/contests/${contest.id}?ref=${referrer}`;
    const lines = fullText.split('\n');

    lines.forEach((line) => {
      children.push(
        new Paragraph({
          text: line,
        })
      );
    });
  });

  const doc = new Document({
    sections: [{ children: children }]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(outputDir, "WhatsApp_Promos.docx"), buffer);
  console.log("✅ Created WhatsApp_Promos.docx successfully!");

  // 2. Generate Posters
  console.log('\nLaunching browser to generate posters...');
  const browser = await puppeteer.launch({
    headless: "new"
  });
  const page = await browser.newPage();
  
  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('hasSeenSplash', 'true');
  });

  await page.setViewport({ width: 800, height: 1200, deviceScaleFactor: 2 });

  for (const contest of contests) {
    const url = `${BASE_URL}/${contest.id}?ref=${referrer}`;
    console.log(`Loading ${url}...`);
    
    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      
      await new Promise(r => setTimeout(r, 2000));
      
      const posterElement = await page.$('.max-w-\\[500px\\]');
      if (!posterElement) {
        console.error(`ERROR: Could not find poster element on ${url}`);
        continue;
      }

      const screenshotPath = path.join(outputDir, `${contest.id}.png`);
      
      await posterElement.screenshot({ path: screenshotPath });
      console.log(`✅ Saved: ${screenshotPath}`);
    } catch (e) {
      console.error(`❌ Failed to capture ${contest.id} for ${referrer}:`, e.message);
    }
  }

  await browser.close();
  console.log('\nAll done! Files are saved in the Chandra directory.');
}

generateAll().catch(console.error);
