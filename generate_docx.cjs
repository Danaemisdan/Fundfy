const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');

const referrers = [
  'hgnma50', 'uiapm3492', 'shruti1', 'shruti', 'chinni', 
  'uhg0192ha', 'shrishtipaagal', 'harshasai', 'dannyk.virtualex', 'admin'
];

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
  fs.writeFileSync("WhatsApp_Promos.docx", buffer);
  console.log("Created WhatsApp_Promos.docx successfully!");
});
