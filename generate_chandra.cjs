const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');

const referrer = 'chandra';

const contests = [
  {
    id: 'ai-innovation-contest',
    name: 'AI Innovation Contest',
    copy: "𝗚𝗟𝗢𝗕𝗔𝗟 𝗧𝗔𝗟𝗘𝗡𝗧 𝗛𝗨𝗡𝗧 𝟮𝟬𝟮𝟲 🌏 is LIVE! \nEnter the AI Innovation Contest powered by AWS, Google Cloud, and IBM. Compete for a massive 🏆 ₹𝟱𝟬 𝗟𝗔𝗞𝗛𝗦 prize pool and unlock 𝗔𝘀𝘀𝘂𝗿𝗲𝗱 𝗜𝗻𝘁𝗲𝗿𝗻𝘀𝗵𝗶𝗽𝘀 & 𝗣𝗹𝗮𝗰𝗲𝗺𝗲𝗻𝘁 𝗦𝘂𝗽𝗽𝗼𝗿𝘁 for every participant! 💼✨\nSecure your entry here:\n"
  },
  {
    id: '3d-asset-design-contest',
    name: '3D Asset Design Contest',
    copy: "𝗚𝗟𝗢𝗕𝗔𝗟 𝗧𝗔𝗟𝗘𝗡𝗧 𝗛𝗨𝗡𝗧 𝟮𝟬𝟮𝟲 🌏 is LIVE! \nEnter the 3D Asset Design Contest powered by AWS, Google Cloud, and IBM. Compete for a massive 🏆 ₹𝟱𝟬 𝗟𝗔𝗞𝗛𝗦 prize pool and unlock 𝗔𝘀𝘀𝘂𝗿𝗲𝗱 𝗜𝗻𝘁𝗲𝗿𝗻𝘀𝗵𝗶𝗽𝘀 & 𝗣𝗹𝗮𝗰𝗲𝗺𝗲𝗻𝘁 𝗦𝘂𝗽𝗽𝗼𝗿𝘁 for every participant! 💼✨\nSecure your entry here:\n"
  },
  {
    id: 'digital-character-design-contest',
    name: 'Digital Character Design Contest',
    copy: "𝗚𝗟𝗢𝗕𝗔𝗟 𝗧𝗔𝗟𝗘𝗡𝗧 𝗛𝗨𝗡𝗧 𝟮𝟬𝟮𝟲 🌏 is LIVE! \nEnter the Digital Character Design Contest powered by AWS, Google Cloud, and IBM. Compete for a massive 🏆 ₹𝟱𝟬 𝗟𝗔𝗞𝗛𝗦 prize pool and unlock 𝗔𝘀𝘀𝘂𝗿𝗲𝗱 𝗜𝗻𝘁𝗲𝗿𝗻𝘀𝗵𝗶𝗽𝘀 & 𝗣𝗹𝗮𝗰𝗲𝗺𝗲𝗻𝘁 𝗦𝘂𝗽𝗽𝗼𝗿𝘁 for every participant! 💼✨\nSecure your entry here:\n"
  },
  {
    id: 'web-experience-design-contest',
    name: 'Web Experience Design Contest',
    copy: "𝗚𝗟𝗢𝗕𝗔𝗟 𝗧𝗔𝗟𝗘𝗡𝗧 𝗛𝗨𝗡𝗧 𝟮𝟬𝟮𝟲 🌏 is LIVE! \nEnter the Web Experience Design Contest powered by AWS, Google Cloud, and IBM. Compete for a massive 🏆 ₹𝟱𝟬 𝗟𝗔𝗞𝗛𝗦 prize pool and unlock 𝗔𝘀𝘀𝘂𝗿𝗲𝗱 𝗜𝗻𝘁𝗲𝗿𝗻𝘀𝗵𝗶𝗽𝘀 & 𝗣𝗹𝗮𝗰𝗲𝗺𝗲𝗻𝘁 𝗦𝘂𝗽𝗽𝗼𝗿𝘁 for every participant! 💼✨\nSecure your entry here:\n"
  },
  {
    id: 'career-accelerator-program',
    name: 'Career Accelerator Program',
    copy: "𝗚𝗟𝗢𝗕𝗔𝗟 𝗧𝗔𝗟𝗘𝗡𝗧 𝗛𝗨𝗡𝗧 𝟮𝟬𝟮𝟲 🌏 is LIVE! \nEnter the Career Accelerator Program powered by AWS, Google Cloud, and IBM. Compete for a massive 🏆 ₹𝟱𝟬 𝗟𝗔𝗞𝗛𝗦 prize pool and unlock 𝗔𝘀𝘀𝘂𝗿𝗲𝗱 𝗜𝗻𝘁𝗲𝗿𝗻𝘀𝗵𝗶𝗽𝘀 & 𝗣𝗹𝗮𝗰𝗲𝗺𝗲𝗻𝘁 𝗦𝘂𝗽𝗽𝗼𝗿𝘁 for every participant! 💼✨\nSecure your entry here:\n"
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
