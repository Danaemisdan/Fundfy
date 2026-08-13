const fs = require('fs');

let content = fs.readFileSync('src/data/contests/index.ts', 'utf8');

const updatedBenefits = `[
      { title: 'Assured Placements & Support', description: 'Every participant receives assured internships, jobs, or comprehensive career support.' },
      { title: 'Confirmed Interview', description: 'Skip the line. You secure an interview just for participating.' },
      { title: 'Momentum EDU+ Access', description: 'Get access to your personal AI learning companion that teaches you anything.' },
      { title: 'JobFinderAI Free Forever', description: 'Lifetime access to our premium AI-driven job matching ecosystem.' },
      { title: 'Fundfy.app Access', description: 'Find funds, sponsorships, grants, and investors if you are building a startup.' }
    ]`;

const updatedRewards = `[
      {
        title: 'EVERY SINGLE PARTICIPANT RECEIVES',
        theme: 'premium',
        items: [
          { title: 'Assured Internship / Job Support' },
          { title: 'Confirmed Interview' },
          { title: 'Momentum EDU+ AI Companion Access' },
          { title: 'Lifetime FREE JobFinderAI Premium' }
        ]
      },
      {
        title: 'OVERALL WINNERS',
        theme: 'light',
        items: [
          { title: '$15,000 USD', description: '1st Place Grand Prize', value: '1ST' },
          { title: '$10,000 USD', description: '2nd Place Runner Up', value: '2ND' },
          { title: '$5,000 USD', description: '3rd Place Bronze', value: '3RD' },
          { title: '$20,000 USD Pool', description: 'Distributed among 10 Honorable Mentions', value: 'TOP 10' }
        ]
      }
    ]`;

// We use regex to replace whyParticipate and rewards arrays in the file
content = content.replace(/whyParticipate:\s*\[[\s\S]*?\],/g, `whyParticipate: ${updatedBenefits},`);
content = content.replace(/rewards:\s*\[[\s\S]*?\],/g, `rewards: ${updatedRewards},`);

// Also update descriptions to mention "assured internships"
content = content.replace(/description: 'Welcome to the ultimate AI App Creation challenge[^']*',/g, 
  "description: 'Welcome to the ultimate AI App Creation challenge. Your mission is to engineer the next generation of applications. For just ₹100, you are securing a massive career upgrade. Every participant gets assured internships, interviews, and lifetime access to our premium AI upskilling and recruitment tools.',"
);

content = content.replace(/description: 'Powered by JobFinderAI[^']*',/g, 
  "description: 'Powered by JobFinderAI, this challenge is designed to revolutionize recruitment. For just ₹100, you are securing a massive career upgrade. Every participant gets assured internships, interviews, and lifetime access to our premium AI upskilling and recruitment tools.',"
);

content = content.replace(/description: 'Merge traditional 3D modeling pipelines[^']*',/g, 
  "description: 'Merge traditional 3D modeling pipelines with next-gen generative AI tools. For just ₹100, you are securing a massive career upgrade. Every participant gets assured internships, interviews, and lifetime access to our premium AI upskilling and recruitment tools.',"
);

content = content.replace(/description: 'Push the absolute boundaries of digital identity[^']*',/g, 
  "description: 'Push the absolute boundaries of digital identity in this elite character modeling challenge. For just ₹100, you are securing a massive career upgrade. Every participant gets assured internships, interviews, and lifetime access to our premium tools.',"
);

content = content.replace(/description: 'Design the future of the web[^']*',/g, 
  "description: 'Design the future of the web. Craft stunning interfaces and breathtaking web experiences. For just ₹100, you are securing a massive career upgrade. Every participant gets assured internships, interviews, and lifetime access to our premium tools.',"
);

fs.writeFileSync('src/data/contests/index.ts', content);
console.log('Updated contests successfully.');
