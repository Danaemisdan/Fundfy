const fs = require('fs');
const path = require('path');

function patchData() {
  const file = path.join(__dirname, 'src/data/contests/index.ts');
  let code = fs.readFileSync(file, 'utf8');

  const newTimeline = `timeline: [
      { title: 'Registration Opens', date: 'Phase 1', description: 'Sign up and get instant access to premium resources and platforms.' },
      { title: 'Kickoff & Masterclasses', date: 'Phase 2', description: 'Join exclusive live sessions with industry experts to learn the tools.' },
      { title: 'Build Phase', date: 'Phase 3', description: 'Develop your project with 24/7 technical support and mentorship.' },
      { title: 'Submission Deadline', date: 'Phase 4', description: 'Submit your code, presentation, and video pitch for evaluation.' },
      { title: 'Global Finals & Awards', date: 'Phase 5', description: 'Top teams pitch live to VIP judges for the massive prize pool.' }
    ]`;

  const newJudging = `judgingCriteria: [
      { name: 'Innovation & Creativity', weight: '30%', description: 'How novel and original is the approach? Does it break new ground?' },
      { name: 'Technical Execution', weight: '25%', description: 'Code quality, architecture scalability, and robust deployment.' },
      { name: 'User Experience (UX)', weight: '20%', description: 'Intuitive design, accessibility, and overall polish of the interface.' },
      { name: 'Real-World Impact', weight: '15%', description: 'Does it solve a genuine problem? What is the market potential?' },
      { name: 'Pitch & Presentation', weight: '10%', description: 'Clarity of the video demo and effectiveness of communication.' }
    ]`;

  const newRewards = `resources: [
      { title: 'Premium APIs', description: 'Full access to cutting edge LLM models and cloud APIs for the duration of the hackathon.' },
      { title: 'Expert Masterclasses', description: 'Live weekly sessions with senior engineers teaching modern tech stacks.' },
      { title: 'Cloud Infrastructure', description: 'Free server hosting credits to deploy and showcase your live projects.' }
    ],
    rewards: [
      {
        title: 'OVERALL WINNERS',
        theme: 'premium',
        items: [
          { title: '$15,000 USD', description: '1st Place Grand Prize', value: '1ST' },
          { title: '$10,000 USD', description: '2nd Place Runner Up', value: '2ND' },
          { title: '$5,000 USD', description: '3rd Place Bronze', value: '3RD' },
          { title: '$20,000 USD Pool', description: 'Distributed among 10 Honorable Mentions', value: 'TOP 10' }
        ]
      },
      {
        title: 'EVERY PARTICIPANT RECEIVES',
        theme: 'light',
        items: [
          { title: 'Verified Global Participation Certificate' },
          { title: 'Lifetime FREE JobFinderAI Premium Subscription' },
          { title: '$500 AWS Cloud Credits for Deployment' }
        ]
      }
    ]`;

  // We know timeline ends before judgingCriteria.
  code = code.replace(/timeline: [\s\S]*?\n    judgingCriteria:/g, newTimeline + ',\n    judgingCriteria:');
  
  // We know judgingCriteria ends before eligibility.
  code = code.replace(/judgingCriteria: [\s\S]*?\n    eligibility:/g, newJudging + ',\n    eligibility:');
  
  // We know rewards ends before registration.
  code = code.replace(/rewards: [\s\S]*?\n    registration:/g, newRewards + ',\n    registration:');

  fs.writeFileSync(file, code, 'utf8');
}

patchData();
console.log('Data patched!');
