import type { ContestConfig } from '../../types/contest';

export const CONTESTS: ContestConfig[] = [
  {
    id: 'ai-innovation-contest',
    status: 'OPEN',
    title: 'AI Innovation Contest',
    subtitle: 'Build the future with Artificial Intelligence.',
    category: 'Software Engineering',
    difficulty: 'Advanced',
    prizeHighlight: '₹50 Lakhs Prize Pool',
    theme: {
      primaryAccent: 'purple-600',
      secondaryAccent: 'blue-500',
      accentGradient: 'from-purple-600 to-blue-500',
      backgroundStyle: 'cinematic',
    },
    artworkType: 'AI',

    seo: {
      title: 'AI Innovation Contest | Global Talent Hunt',
      description: 'Build the future with Generative AI.',
      ogImage: ''
    },
    registrationFee: 100,
    currency: 'INR',
    paymentRequired: true,
    statistics: [
      { label: 'Prize Pool', value: '$50,000' },
      { label: 'Registration', value: '₹500' },
      { label: 'Mode', value: 'Global Online' },
      { label: 'Deadline', value: 'Nov 30, 2026' }
    ],
    description: 'Welcome to the ultimate AI App Creation challenge. Your mission is to engineer the next generation of applications utilizing cutting-edge Generative AI tools. Whether you are architecting a revolutionary productivity tool, an autonomous smart assistant, or an entirely new software paradigm, we want to see how you leverage LLMs and APIs to solve high-impact, real-world problems. Show the world what AI can achieve in the hands of visionary developers.',
    whyParticipate: [
      { title: 'Build an incredible portfolio', description: 'Deploy a cutting edge AI app that will wow top employers.' },
      { title: 'Showcase your AI skills', description: 'Demonstrate your ability to leverage LLMs and AI APIs in real-world scenarios.' },
      { title: 'Compete globally', description: 'Test your engineering chops against top talent worldwide.' },
      { title: 'Receive lifetime tools', description: 'Every participant receives lifetime access to premium tools.' }
    ],
    timeline: [
      { title: 'Click Register', date: 'Step 1', description: 'Begin your journey.' },
      { title: 'Complete Registration', date: 'Step 2', description: 'Submit your details on the website.' },
      { title: 'Receive Confirmation', date: 'Step 3', description: 'Get access to resources.' },
      { title: 'Build your project', date: 'Step 4', description: 'You have 4 weeks.' },
      { title: 'Submit before deadline', date: 'Step 5', description: 'Code and video demo.' },
      { title: 'Winner Announcement', date: 'Step 6', description: 'Live broadcast.' }
    ],
    judgingCriteria: [
      { name: 'Innovation', weight: '30%', description: 'Novel application of AI.' },
      { name: 'Technical Excellence', weight: '25%', description: 'Code quality and architecture.' },
      { name: 'Design', weight: '20%', description: 'UI/UX and polish.' },
      { name: 'Impact', weight: '15%', description: 'Real world utility.' },
      { name: 'Presentation', weight: '10%', description: 'Clarity of the demo.' }
    ],
    eligibility: [
      { title: 'Who can participate', description: 'Open globally.' },
      { title: 'Team size', description: 'Solo or up to 4 members.' }
    ],
    faqs: [
      { q: 'Can I use open source models?', a: 'Yes.' },
      { q: 'Do I keep my IP?', a: 'Yes.' }
    ],
    rewards: [
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
    registration: {
      mode: 'EMBEDDED_FORM',
      url: 'https://docs.google.com/forms/placeholder',
      buttonText: 'REGISTER NOW'
    }
  },
  {
    id: 'career-accelerator-contest',
    status: 'OPEN',
    title: 'Career Accelerator Contest',
    subtitle: 'Optimize your career.',
    category: 'Career',
    difficulty: 'All Levels',
    prizeHighlight: '₹50 Lakhs Prize Pool',
    theme: {
      primaryAccent: 'emerald-500',
      secondaryAccent: 'cyan-500',
      accentGradient: 'from-emerald-500 to-cyan-500',
      backgroundStyle: 'light',
    },
    artworkType: 'JOB',

    seo: { title: 'Career Accelerator Contest', description: '', ogImage: '' },
    registrationFee: 100,
    currency: 'INR',
    paymentRequired: true,
    statistics: [
      { label: 'Prize Pool', value: '$50,000' },
      { label: 'Registration', value: '₹200' },
      { label: 'Mode', value: 'Global Online' },
      { label: 'Deadline', value: 'Nov 30, 2026' }
    ],
    description: 'Powered by JobFinderAI, this challenge is designed to revolutionize the global recruitment industry. Your mission is to architect an outstanding AI-driven job application ecosystem or a hyper-intelligent resume generator. Maximize application success rates by leveraging smart data matching, automated tailoring, and predictive hiring algorithms. Build the future of hiring and redefine how talent meets opportunity.',
    whyParticipate: [],
    timeline: [
      { title: 'Click Register', date: 'Step 1', description: 'Begin your journey.' },
      { title: 'Complete Registration', date: 'Step 2', description: 'Submit your details on the website.' },
      { title: 'Receive Confirmation', date: 'Step 3', description: 'Get access to resources.' },
      { title: 'Build your project', date: 'Step 4', description: 'You have 4 weeks.' },
      { title: 'Submit before deadline', date: 'Step 5', description: 'Code and video demo.' },
      { title: 'Winner Announcement', date: 'Step 6', description: 'Live broadcast.' }
    ],
    judgingCriteria: [],
    eligibility: [],
    faqs: [],
    rewards: [
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
    registration: {
      mode: 'EMBEDDED_FORM',
      url: 'https://docs.google.com/forms/placeholder',
      buttonText: 'REGISTER NOW'
    }
  },
  {
    id: '3d-asset-design-contest',
    status: 'OPEN',
    title: '3D Asset Design Contest',
    subtitle: 'Build the metaverse.',
    category: 'Design',
    difficulty: 'Intermediate',
    prizeHighlight: '₹50 Lakhs Prize Pool',
    theme: {
      primaryAccent: 'orange-500',
      secondaryAccent: 'rose-500',
      accentGradient: 'from-orange-500 to-rose-500',
      backgroundStyle: 'dark',
    },
    artworkType: '3D_ASSET',

    seo: { title: '3D Asset Design Contest', description: '', ogImage: '' },
    registrationFee: 100,
    currency: 'INR',
    paymentRequired: true,
    statistics: [
      { label: 'Prize Pool', value: '$50,000' },
      { label: 'Registration', value: '₹200' },
      { label: 'Mode', value: 'Global Online' },
      { label: 'Deadline', value: 'Nov 30, 2026' }
    ],
    description: 'Merge traditional 3D modeling pipelines with next-gen generative AI tools to forge stunning, production-ready 3D assets. From sci-fi vehicles and intricate fantasy props to hyper-realistic architectural elements, your challenge is to demonstrate how AI can drastically accelerate texturing, unwrapping, and conceptual phases while maintaining flawless, industry-standard topology.',
    whyParticipate: [],
    timeline: [
      { title: 'Click Register', date: 'Step 1', description: 'Begin your journey.' },
      { title: 'Complete Registration', date: 'Step 2', description: 'Submit your details on the website.' },
      { title: 'Receive Confirmation', date: 'Step 3', description: 'Get access to resources.' },
      { title: 'Build your project', date: 'Step 4', description: 'You have 4 weeks.' },
      { title: 'Submit before deadline', date: 'Step 5', description: 'Code and video demo.' },
      { title: 'Winner Announcement', date: 'Step 6', description: 'Live broadcast.' }
    ],
    judgingCriteria: [],
    eligibility: [],
    faqs: [],
    rewards: [
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
    registration: {
      mode: 'EMBEDDED_FORM',
      url: 'https://docs.google.com/forms/placeholder',
      buttonText: 'REGISTER NOW'
    }
  },
  {
    id: 'digital-character-design-contest',
    status: 'OPEN',
    title: 'Digital Character Design Contest',
    subtitle: 'Bring digital humans to life.',
    category: 'Design',
    difficulty: 'Advanced',
    prizeHighlight: '₹50 Lakhs Prize Pool',
    theme: {
      primaryAccent: 'pink-500',
      secondaryAccent: 'violet-500',
      accentGradient: 'from-pink-500 to-violet-500',
      backgroundStyle: 'cinematic',
    },
    artworkType: '3D_CHARACTER',

    seo: { title: 'Digital Character Design Contest', description: '', ogImage: '' },
    registrationFee: 100,
    currency: 'INR',
    paymentRequired: true,
    statistics: [
      { label: 'Prize Pool', value: '$50,000' },
      { label: 'Registration', value: '₹200' },
      { label: 'Mode', value: 'Global Online' },
      { label: 'Deadline', value: 'Nov 30, 2026' }
    ],
    description: 'Push the absolute boundaries of digital identity in this elite character modeling challenge. Sculpt, texture, and rig a next-gen 3D character that belongs in a AAA game or blockbuster film. We demand incredible attention to detail across anatomy, clothing, and micro-expressions. Integrate cutting-edge AI workflows for concept generation and advanced material creation to bring your vision to life.',
    whyParticipate: [],
    timeline: [
      { title: 'Click Register', date: 'Step 1', description: 'Begin your journey.' },
      { title: 'Complete Registration', date: 'Step 2', description: 'Submit your details on the website.' },
      { title: 'Receive Confirmation', date: 'Step 3', description: 'Get access to resources.' },
      { title: 'Build your project', date: 'Step 4', description: 'You have 4 weeks.' },
      { title: 'Submit before deadline', date: 'Step 5', description: 'Code and video demo.' },
      { title: 'Winner Announcement', date: 'Step 6', description: 'Live broadcast.' }
    ],
    judgingCriteria: [],
    eligibility: [],
    faqs: [],
    rewards: [
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
    registration: {
      mode: 'EMBEDDED_FORM',
      url: 'https://docs.google.com/forms/placeholder',
      buttonText: 'REGISTER NOW'
    }
  },
  {
    id: 'web-experience-design-contest',
    status: 'OPEN',
    title: 'Web Experience Design Contest',
    subtitle: 'Craft perfect interfaces.',
    category: 'Design',
    difficulty: 'All Levels',
    prizeHighlight: '₹50 Lakhs Prize Pool',
    theme: {
      primaryAccent: 'yellow-400',
      secondaryAccent: 'orange-500',
      accentGradient: 'from-yellow-400 to-orange-500',
      backgroundStyle: 'light',
    },
    artworkType: 'UI_UX',

    seo: { title: 'Web Experience Design Contest', description: '', ogImage: '' },
    registrationFee: 100,
    currency: 'INR',
    paymentRequired: true,
    statistics: [
      { label: 'Prize Pool', value: '$50,000' },
      { label: 'Registration', value: '₹200' },
      { label: 'Mode', value: 'Global Online' },
      { label: 'Deadline', value: 'Nov 30, 2026' }
    ],
    description: 'Design the future of the web. Your challenge is to craft stunning, user-centric interfaces and breathtaking web experiences that redefine modern digital standards. Focus on premium aesthetics like glassmorphism, fluid micro-interactions, flawless typography scales, and highly accessible color palettes. Evolve your wireframes into hyper-polished, high-fidelity prototypes that leave users in absolute awe of your digital craftsmanship.',
    whyParticipate: [],
    timeline: [
      { title: 'Click Register', date: 'Step 1', description: 'Begin your journey.' },
      { title: 'Complete Registration', date: 'Step 2', description: 'Submit your details on the website.' },
      { title: 'Receive Confirmation', date: 'Step 3', description: 'Get access to resources.' },
      { title: 'Build your project', date: 'Step 4', description: 'You have 4 weeks.' },
      { title: 'Submit before deadline', date: 'Step 5', description: 'Code and video demo.' },
      { title: 'Winner Announcement', date: 'Step 6', description: 'Live broadcast.' }
    ],
    judgingCriteria: [],
    eligibility: [],
    faqs: [],
    rewards: [
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
    registration: {
      mode: 'EMBEDDED_FORM',
      url: 'https://docs.google.com/forms/placeholder',
      buttonText: 'REGISTER NOW'
    }
  },
  {
    id: 'ai-education-innovation-contest',
    status: 'COMING_SOON',
    title: 'AI Education Innovation Contest',
    subtitle: 'The future of learning.',
    category: 'Education',
    difficulty: 'All Levels',
    prizeHighlight: '₹50 Lakhs Prize Pool',
    theme: {
      primaryAccent: 'blue-500',
      secondaryAccent: 'indigo-500',
      accentGradient: 'from-blue-500 to-indigo-500',
      backgroundStyle: 'cinematic',
    },
    artworkType: 'EDU',

    seo: { title: 'AI Education Innovation Contest', description: '', ogImage: '' },
    registrationFee: 100,
    currency: 'INR',
    paymentRequired: true,
    statistics: [
      { label: 'Prize Pool', value: '$50,000' },
      { label: 'Registration', value: '₹200' },
      { label: 'Mode', value: 'Global Online' },
      { label: 'Deadline', value: 'Nov 30, 2026' }
    ],
    description: '',
    whyParticipate: [],
    timeline: [
      { title: 'Click Register', date: 'Step 1', description: 'Begin your journey.' },
      { title: 'Complete Registration', date: 'Step 2', description: 'Submit your details on the website.' },
      { title: 'Receive Confirmation', date: 'Step 3', description: 'Get access to resources.' },
      { title: 'Build your project', date: 'Step 4', description: 'You have 4 weeks.' },
      { title: 'Submit before deadline', date: 'Step 5', description: 'Code and video demo.' },
      { title: 'Winner Announcement', date: 'Step 6', description: 'Live broadcast.' }
    ],
    judgingCriteria: [],
    eligibility: [],
    faqs: [],
    rewards: [
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
    registration: { mode: 'COMING_SOON', buttonText: 'COMING SOON' }
  }
];

export const getContestConfig = (slug: string): ContestConfig | undefined => {
  return CONTESTS.find(c => c.id === slug);
};
