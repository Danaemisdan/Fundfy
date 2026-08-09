import type { ContestConfig } from '../../types/contest';

export const CONTESTS: ContestConfig[] = [
  {
    id: 'ai-innovation-contest',
    status: 'OPEN',
    title: 'AI Innovation Contest',
    subtitle: 'Build the future with Artificial Intelligence.',
    category: 'Software Engineering',
    difficulty: 'Advanced',
    prizeHighlight: 'Registration Open',
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
      { title: 'Registration Opens', date: 'Phase 1', description: 'Sign up and get instant access to premium resources and platforms.' },
      { title: 'Kickoff & Masterclasses', date: 'Phase 2', description: 'Join exclusive live sessions with industry experts to learn the tools.' },
      { title: 'Build Phase', date: 'Phase 3', description: 'Develop your project with 24/7 technical support and mentorship.' },
      { title: 'Submission Deadline', date: 'Phase 4', description: 'Submit your code, presentation, and video pitch for evaluation.' },
      { title: 'Global Finals & Awards', date: 'Phase 5', description: 'Top teams pitch live to VIP judges for the massive prize pool.' }
    ],
    judgingCriteria: [
      { name: 'Innovation & Creativity', weight: '30%', description: 'How novel and original is the approach? Does it break new ground?' },
      { name: 'Technical Execution', weight: '25%', description: 'Code quality, architecture scalability, and robust deployment.' },
      { name: 'User Experience (UX)', weight: '20%', description: 'Intuitive design, accessibility, and overall polish of the interface.' },
      { name: 'Real-World Impact', weight: '15%', description: 'Does it solve a genuine problem? What is the market potential?' },
      { name: 'Pitch & Presentation', weight: '10%', description: 'Clarity of the video demo and effectiveness of communication.' }
    ],
    eligibility: [
      { title: 'Who can participate', description: 'Open globally.' },
      { title: 'Team size', description: 'Solo or up to 4 members.' }
    ],
    faqs: [
      { q: 'Can I use open source models?', a: 'Yes.' },
      { q: 'Do I keep my IP?', a: 'Yes.' }
    ],
    resources: [
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
    prizeHighlight: 'Registration Open',
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

      { label: 'Mode', value: 'Global Online' },
      { label: 'Deadline', value: 'Nov 30, 2026' }
    ],
    description: 'Powered by JobFinderAI, this challenge is designed to revolutionize the global recruitment industry. Your mission is to architect an outstanding AI-driven job application ecosystem or a hyper-intelligent resume generator. Maximize application success rates by leveraging smart data matching, automated tailoring, and predictive hiring algorithms. Build the future of hiring and redefine how talent meets opportunity.',
    whyParticipate: [],
    timeline: [
      { title: 'Registration Opens', date: 'Phase 1', description: 'Sign up and get instant access to premium resources and platforms.' },
      { title: 'Kickoff & Masterclasses', date: 'Phase 2', description: 'Join exclusive live sessions with industry experts to learn the tools.' },
      { title: 'Build Phase', date: 'Phase 3', description: 'Develop your project with 24/7 technical support and mentorship.' },
      { title: 'Submission Deadline', date: 'Phase 4', description: 'Submit your code, presentation, and video pitch for evaluation.' },
      { title: 'Global Finals & Awards', date: 'Phase 5', description: 'Top teams pitch live to VIP judges for the massive prize pool.' }
    ],
    judgingCriteria: [
      { name: 'Innovation & Creativity', weight: '30%', description: 'How novel and original is the approach? Does it break new ground?' },
      { name: 'Technical Execution', weight: '25%', description: 'Code quality, architecture scalability, and robust deployment.' },
      { name: 'User Experience (UX)', weight: '20%', description: 'Intuitive design, accessibility, and overall polish of the interface.' },
      { name: 'Real-World Impact', weight: '15%', description: 'Does it solve a genuine problem? What is the market potential?' },
      { name: 'Pitch & Presentation', weight: '10%', description: 'Clarity of the video demo and effectiveness of communication.' }
    ],
    eligibility: [],
    faqs: [],
    resources: [
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
    prizeHighlight: 'Registration Open',
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

      { label: 'Mode', value: 'Global Online' },
      { label: 'Deadline', value: 'Nov 30, 2026' }
    ],
    description: 'Merge traditional 3D modeling pipelines with next-gen generative AI tools to forge stunning, production-ready 3D assets. From sci-fi vehicles and intricate fantasy props to hyper-realistic architectural elements, your challenge is to demonstrate how AI can drastically accelerate texturing, unwrapping, and conceptual phases while maintaining flawless, industry-standard topology.',
    whyParticipate: [],
    timeline: [
      { title: 'Registration Opens', date: 'Phase 1', description: 'Sign up and get instant access to premium resources and platforms.' },
      { title: 'Kickoff & Masterclasses', date: 'Phase 2', description: 'Join exclusive live sessions with industry experts to learn the tools.' },
      { title: 'Build Phase', date: 'Phase 3', description: 'Develop your project with 24/7 technical support and mentorship.' },
      { title: 'Submission Deadline', date: 'Phase 4', description: 'Submit your code, presentation, and video pitch for evaluation.' },
      { title: 'Global Finals & Awards', date: 'Phase 5', description: 'Top teams pitch live to VIP judges for the massive prize pool.' }
    ],
    judgingCriteria: [
      { name: 'Innovation & Creativity', weight: '30%', description: 'How novel and original is the approach? Does it break new ground?' },
      { name: 'Technical Execution', weight: '25%', description: 'Code quality, architecture scalability, and robust deployment.' },
      { name: 'User Experience (UX)', weight: '20%', description: 'Intuitive design, accessibility, and overall polish of the interface.' },
      { name: 'Real-World Impact', weight: '15%', description: 'Does it solve a genuine problem? What is the market potential?' },
      { name: 'Pitch & Presentation', weight: '10%', description: 'Clarity of the video demo and effectiveness of communication.' }
    ],
    eligibility: [],
    faqs: [],
    resources: [
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
    prizeHighlight: 'Registration Open',
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

      { label: 'Mode', value: 'Global Online' },
      { label: 'Deadline', value: 'Nov 30, 2026' }
    ],
    description: 'Push the absolute boundaries of digital identity in this elite character modeling challenge. Sculpt, texture, and rig a next-gen 3D character that belongs in a AAA game or blockbuster film. We demand incredible attention to detail across anatomy, clothing, and micro-expressions. Integrate cutting-edge AI workflows for concept generation and advanced material creation to bring your vision to life.',
    whyParticipate: [],
    timeline: [
      { title: 'Registration Opens', date: 'Phase 1', description: 'Sign up and get instant access to premium resources and platforms.' },
      { title: 'Kickoff & Masterclasses', date: 'Phase 2', description: 'Join exclusive live sessions with industry experts to learn the tools.' },
      { title: 'Build Phase', date: 'Phase 3', description: 'Develop your project with 24/7 technical support and mentorship.' },
      { title: 'Submission Deadline', date: 'Phase 4', description: 'Submit your code, presentation, and video pitch for evaluation.' },
      { title: 'Global Finals & Awards', date: 'Phase 5', description: 'Top teams pitch live to VIP judges for the massive prize pool.' }
    ],
    judgingCriteria: [
      { name: 'Innovation & Creativity', weight: '30%', description: 'How novel and original is the approach? Does it break new ground?' },
      { name: 'Technical Execution', weight: '25%', description: 'Code quality, architecture scalability, and robust deployment.' },
      { name: 'User Experience (UX)', weight: '20%', description: 'Intuitive design, accessibility, and overall polish of the interface.' },
      { name: 'Real-World Impact', weight: '15%', description: 'Does it solve a genuine problem? What is the market potential?' },
      { name: 'Pitch & Presentation', weight: '10%', description: 'Clarity of the video demo and effectiveness of communication.' }
    ],
    eligibility: [],
    faqs: [],
    resources: [
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
    prizeHighlight: 'Registration Open',
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

      { label: 'Mode', value: 'Global Online' },
      { label: 'Deadline', value: 'Nov 30, 2026' }
    ],
    description: 'Design the future of the web. Your challenge is to craft stunning, user-centric interfaces and breathtaking web experiences that redefine modern digital standards. Focus on premium aesthetics like glassmorphism, fluid micro-interactions, flawless typography scales, and highly accessible color palettes. Evolve your wireframes into hyper-polished, high-fidelity prototypes that leave users in absolute awe of your digital craftsmanship.',
    whyParticipate: [],
    timeline: [
      { title: 'Registration Opens', date: 'Phase 1', description: 'Sign up and get instant access to premium resources and platforms.' },
      { title: 'Kickoff & Masterclasses', date: 'Phase 2', description: 'Join exclusive live sessions with industry experts to learn the tools.' },
      { title: 'Build Phase', date: 'Phase 3', description: 'Develop your project with 24/7 technical support and mentorship.' },
      { title: 'Submission Deadline', date: 'Phase 4', description: 'Submit your code, presentation, and video pitch for evaluation.' },
      { title: 'Global Finals & Awards', date: 'Phase 5', description: 'Top teams pitch live to VIP judges for the massive prize pool.' }
    ],
    judgingCriteria: [
      { name: 'Innovation & Creativity', weight: '30%', description: 'How novel and original is the approach? Does it break new ground?' },
      { name: 'Technical Execution', weight: '25%', description: 'Code quality, architecture scalability, and robust deployment.' },
      { name: 'User Experience (UX)', weight: '20%', description: 'Intuitive design, accessibility, and overall polish of the interface.' },
      { name: 'Real-World Impact', weight: '15%', description: 'Does it solve a genuine problem? What is the market potential?' },
      { name: 'Pitch & Presentation', weight: '10%', description: 'Clarity of the video demo and effectiveness of communication.' }
    ],
    eligibility: [],
    faqs: [],
    resources: [
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
    ],
    registration: {
      mode: 'EMBEDDED_FORM',
      url: 'https://docs.google.com/forms/placeholder',
      buttonText: 'REGISTER NOW'
    }
  },
  {
    id: 'ai-education-innovation-contest',
    status: 'OPEN',
    title: 'AI Education Innovation Contest',
    subtitle: 'The future of learning.',
    category: 'Education',
    difficulty: 'All Levels',
    prizeHighlight: 'Registration Open',
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

      { label: 'Mode', value: 'Global Online' },
      { label: 'Deadline', value: 'Nov 30, 2026' }
    ],
    description: '',
    whyParticipate: [],
    timeline: [
      { title: 'Registration Opens', date: 'Phase 1', description: 'Sign up and get instant access to premium resources and platforms.' },
      { title: 'Kickoff & Masterclasses', date: 'Phase 2', description: 'Join exclusive live sessions with industry experts to learn the tools.' },
      { title: 'Build Phase', date: 'Phase 3', description: 'Develop your project with 24/7 technical support and mentorship.' },
      { title: 'Submission Deadline', date: 'Phase 4', description: 'Submit your code, presentation, and video pitch for evaluation.' },
      { title: 'Global Finals & Awards', date: 'Phase 5', description: 'Top teams pitch live to VIP judges for the massive prize pool.' }
    ],
    judgingCriteria: [
      { name: 'Innovation & Creativity', weight: '30%', description: 'How novel and original is the approach? Does it break new ground?' },
      { name: 'Technical Execution', weight: '25%', description: 'Code quality, architecture scalability, and robust deployment.' },
      { name: 'User Experience (UX)', weight: '20%', description: 'Intuitive design, accessibility, and overall polish of the interface.' },
      { name: 'Real-World Impact', weight: '15%', description: 'Does it solve a genuine problem? What is the market potential?' },
      { name: 'Pitch & Presentation', weight: '10%', description: 'Clarity of the video demo and effectiveness of communication.' }
    ],
    eligibility: [],
    faqs: [],
    resources: [
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
    ],
    registration: { mode: 'EMBEDDED_FORM', buttonText: 'REGISTER NOW' }
  }
];

export const getContestConfig = (slug: string): ContestConfig | undefined => {
  return CONTESTS.find(c => c.id === slug);
};
