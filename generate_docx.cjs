const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');

const referrers = [
  'hgnma50', 'uiapm3492', 'shruti1', 'shruti', 'chinni', 
  'uhg0192ha', 'shrishtipaagal', 'harshasai', 'dannyk.virtualex', 'admin', 'chandra'
];

const contests = [
  {
    id: 'ai-innovation-contest',
    name: 'AI Innovation Contest',
    copy: "𝗚𝗟𝗢𝗕𝗔𝗟 𝗧𝗔𝗟𝗘𝗡𝗧 𝗛𝗨𝗡𝗧 𝟮𝟬𝟮𝟲 🌏 is LIVE! \nEnter the AI Innovation Contest powered by AWS, Google Cloud, and IBM. Compete for a massive 🏆 ₹𝟱𝟬 𝗟𝗔𝗞𝗛𝗦 prize pool and unlock 𝗔𝘀𝘀𝘂𝗿𝗲𝗱 𝗜𝗻𝘁𝗲𝗿𝗻𝘀𝗵𝗶𝗽𝘀 & 𝗣𝗹𝗮𝗰𝗲𝗺𝗲𝗻𝘁 𝗦𝘂𝗽𝗽𝗼𝗿𝘁 for every participant! 💼✨\nSecure your entry here:\n"
  },
  {
    id: 'career-accelerator-contest',
    name: 'Career Accelerator Contest',
    copy: "𝗚𝗟𝗢𝗕𝗔𝗟 𝗧𝗔𝗟𝗘𝗡𝗧 𝗛𝗨𝗡𝗧 𝟮𝟬𝟮𝟲 🌏 is LIVE! \nEnter the Career Accelerator Contest powered by AWS, Google Cloud, and IBM. Compete for a massive 🏆 ₹𝟱𝟬 𝗟𝗔𝗞𝗛𝗦 prize pool and unlock 𝗔𝘀𝘀𝘂𝗿𝗲𝗱 𝗜𝗻𝘁𝗲𝗿𝗻𝘀𝗵𝗶𝗽𝘀 & 𝗣𝗹𝗮𝗰𝗲𝗺𝗲𝗻𝘁 𝗦𝘂𝗽𝗽𝗼𝗿𝘁 for every participant! 💼✨\nSecure your entry here:\n"
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
    id: 'ai-education-innovation-contest',
    name: 'AI Education Innovation Contest',
    copy: "𝗚𝗟𝗢𝗕𝗔𝗟 𝗧𝗔𝗟𝗘𝗡𝗧 𝗛𝗨𝗡𝗧 𝟮𝟬𝟮𝟲 🌏 is LIVE! \nEnter the AI Education Innovation Contest powered by AWS, Google Cloud, and IBM. Compete for a massive 🏆 ₹𝟱𝟬 𝗟𝗔𝗞𝗛𝗦 prize pool and unlock 𝗔𝘀𝘀𝘂𝗿𝗲𝗱 𝗜𝗻𝘁𝗲𝗿𝗻𝘀𝗵𝗶𝗽𝘀 & 𝗣𝗹𝗮𝗰𝗲𝗺𝗲𝗻𝘁 𝗦𝘂𝗽𝗽𝗼𝗿𝘁 for every participant! 💼✨\nSecure your entry here:\n"
  }
];

const children = [];

children.push(
  new Paragraph({
    text: "WhatsApp Promotional Messages - Global Talent Hunt 2026",
    heading: HeadingLevel.HEADING_1,
    spacing: { after: 400 }
  })
);

referrers.forEach((ref) => {
  children.push(
    new Paragraph({
      text: `Referrer: ${ref}`,
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

    const fullText = contest.copy + `https://fundfy.app/contests/${contest.id}?ref=${ref}`;
    const lines = fullText.split('\n');

    lines.forEach((line) => {
      children.push(
        new Paragraph({
          text: line,
        })
      );
    });
  });
});

const doc = new Document({
  sections: [
    {
      children: children
    }
  ]
});

Packer.toBuffer(doc).then((buffer) => {
  if (!fs.existsSync("Generated_Posters")) {
    fs.mkdirSync("Generated_Posters", { recursive: true });
  }
  fs.writeFileSync("Generated_Posters/WhatsApp_Promos.docx", buffer);
  console.log("Created Generated_Posters/WhatsApp_Promos.docx successfully!");
});
