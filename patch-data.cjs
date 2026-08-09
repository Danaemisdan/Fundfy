const fs = require('fs');
const path = require('path');

function patchTypes() {
  const file = path.join(__dirname, 'src/types/contest.ts');
  let code = fs.readFileSync(file, 'utf8');

  const target = `  rewards: RewardCategory[];`;
  const replacement = `  resources?: {
    title: string;
    description: string;
    icon?: string;
  }[];

  rewards: RewardCategory[];`;

  if (!code.includes('resources?:')) {
    code = code.replace(target, replacement);
    fs.writeFileSync(file, code, 'utf8');
  }
}

function patchData() {
  const file = path.join(__dirname, 'src/data/contests/index.ts');
  let code = fs.readFileSync(file, 'utf8');

  // We want to replace the timeline, judgingCriteria, and rewards for ALL contests with a standard high-end template.
  
  // Replace timeline
  const timelineTarget = `    timeline: [
      { title: 'Click Register', date: 'Step 1', description: 'Begin your journey.' },
      { title: 'Complete Registration', date: 'Step 2', description: 'Submit your details on the website.' },
      { title: 'Receive Confirmation', date: 'Step 3', description: 'Get access to resources.' },
      { title: 'Build your project', date: 'Step 4', description: 'You have 4 weeks.' },
      { title: 'Submit before deadline', date: 'Step 5', description: 'Code and video demo.' },
      { title: 'Winner Announcement', date: 'Step 6', description: 'Live broadcast.' }
    ],`;
  
  const timelineReplacement = `    timeline: [
      { title: 'Registration Opens', date: 'Phase 1', description: 'Sign up and get instant access to premium resources and platforms.' },
      { title: 'Kickoff & Masterclasses', date: 'Phase 2', description: 'Join exclusive live sessions with industry experts to learn the tools.' },
      { title: 'Build Phase', date: 'Phase 3', description: 'Develop your project with 24/7 technical support and mentorship.' },
      { title: 'Submission Deadline', date: 'Phase 4', description: 'Submit your code, presentation, and video pitch for evaluation.' },
      { title: 'Global Finals & Awards', date: 'Phase 5', description: 'Top teams pitch live to VIP judges for the massive prize pool.' }
    ],`;
    
  code = code.replace(new RegExp(timelineTarget.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), timelineReplacement);
  
  // Replace judgingCriteria
  const judgingTarget = `    judgingCriteria: [
      { name: 'Innovation', weight: '30%', description: 'Novel application of AI.' },
      { name: 'Technical Excellence', weight: '25%', description: 'Code quality and architecture.' },
      { name: 'Design', weight: '20%', description: 'UI/UX and polish.' },
      { name: 'Impact', weight: '15%', description: 'Real world utility.' },
      { name: 'Presentation', weight: '10%', description: 'Clarity of the demo.' }
    ],`;
    
  const judgingReplacement = `    judgingCriteria: [
      { name: 'Innovation & Creativity', weight: '30%', description: 'How novel and original is the approach? Does it break new ground?' },
      { name: 'Technical Execution', weight: '25%', description: 'Code quality, architecture scalability, and robust deployment.' },
      { name: 'User Experience (UX)', weight: '20%', description: 'Intuitive design, accessibility, and overall polish of the interface.' },
      { name: 'Real-World Impact', weight: '15%', description: 'Does it solve a genuine problem? What is the market potential?' },
      { name: 'Pitch & Presentation', weight: '10%', description: 'Clarity of the video demo and effectiveness of communication.' }
    ],`;
    
  code = code.replace(new RegExp(judgingTarget.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), judgingReplacement);
  
  // Also replace empty arrays for other contests
  code = code.replace(/timeline: \[\],/g, timelineReplacement);
  code = code.replace(/judgingCriteria: \[\],/g, judgingReplacement);

  // Replace Rewards
  const rewardsRegex = /rewards: \[\s*\{\s*title: 'EVERY PARTICIPANT RECEIVES',[\s\S]*?\}\s*\]/g;
  const rewardsReplacement = `rewards: [
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
    
  code = code.replace(rewardsRegex, rewardsReplacement);
  
  // Add Resources right before rewards
  if (!code.includes('resources: [')) {
    code = code.replace(/rewards: \[/g, `resources: [
      { title: 'Premium APIs', description: 'Full access to cutting edge LLM models and cloud APIs for the duration of the hackathon.' },
      { title: 'Expert Masterclasses', description: 'Live weekly sessions with senior engineers teaching modern tech stacks.' },
      { title: 'Cloud Infrastructure', description: 'Free server hosting credits to deploy and showcase your live projects.' }
    ],
    rewards: [`);
  }

  fs.writeFileSync(file, code, 'utf8');
}

patchTypes();
patchData();
console.log('Data patched!');
