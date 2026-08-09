const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'contests', 'index.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace prizeHighlight
content = content.replace(/prizeHighlight:\s*['"].*?['"]/g, "prizeHighlight: '₹50 Lakhs Prize Pool'");

// Replace rewards array
const rewardsRegex = /rewards:\s*\[[\s\S]*?\],\n\s*registration/g;

const newRewards = `rewards: [
      {
        title: 'EVERY PARTICIPANT RECEIVES',
        theme: 'light',
        items: [
          { title: 'Verified Digital Participation Certificate' },
          { title: 'Lifetime FREE JobFinderAI Premium Subscription' }
        ]
      },
      {
        title: 'PRIZE POOL & CAREER',
        theme: 'dark',
        items: [
          { title: '₹50 Lakhs Total Prize Pool', value: 'CASH PRIZES' },
          { title: '$5,000 Amazon AWS Credits', value: 'AWS' },
          { title: 'Career Boost & Job Support', value: 'PLACEMENTS' }
        ]
      },
      {
        title: 'EXCLUSIVE VIP EXPERIENCE',
        theme: 'premium',
        items: [
          { title: 'Sit with Akon', description: 'Exclusive VIP meet & greet experience.' },
          { title: 'Photo Op with Akon', description: 'Take professional pictures with Akon.' }
        ]
      }
    ],
    registration`;

content = content.replace(rewardsRegex, newRewards);

// Also fix statistics
content = content.replace(/\{ label: 'Prize Pool', value: '.*?' \}/g, "{ label: 'Prize Pool', value: '₹50 Lakhs' }");

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully patched index.ts');
