import type { ContestConfig } from '../../types/contest';

export const CONTESTS: ContestConfig[] = [
  {
    id: 'career-accelerator-program',
    status: 'OPEN',
    title: 'Career Accelerator Program',
    subtitle: 'The future of learning and career growth.',
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

    seo: { title: 'Career Accelerator Program', description: '', ogImage: '/contests/career-accelerator-program.jpg' },
    registrationFee: 100,
    currency: 'INR',
    paymentRequired: true,
    statistics: [
      { label: 'Registration', value: '₹100' },
      { label: 'Grants & Funding', value: '₹50 Lakhs' },
      { label: 'Mode', value: 'Global Online' },
      { label: 'Deadline', value: 'Nov 30, 2026' }
    ],
    description: 'Transform your future with the Career Accelerator Program. Upskill in AI and discover powerful AI use cases tailored to your specific industry. We focus heavily on communication skills and real-world readiness to make you unstoppable.',
    whyParticipate: [
      { title: 'Assured Placements & Support', description: 'Every participant receives assured internships, jobs, or comprehensive career support.' },
      { title: 'Confirmed Interview', description: 'Skip the line. You secure an interview just for participating.' },
      { title: 'JobFinderAI Free Forever', description: 'Lifetime access to our premium AI-driven job matching ecosystem.' },
      { title: 'Fundfy.app Access', description: 'Find funds, sponsorships, grants, and investors if you are building a startup.' }
    ],
    timeline: [
      { title: 'Registration & Access', date: 'Phase 1', description: 'Sign up and get immediate access to Fundfy.app and premium learning tools.' },
      { title: 'Masterclasses & Upskilling', date: 'Phase 2', description: 'Learn AI, communication skills, and discover industry-specific AI use-cases.' },
      { title: 'AI-Hosted Contest', date: 'Phase 3', description: 'Compete in our revolutionary contest hosted entirely by AI to showcase your new skills.' },
      { title: 'Grooming & Resume Building', date: 'Phase 4', description: 'Get your resume polished, communication refined, and become fully job-ready.' },
      { title: 'Assured Placements & Support', date: 'Phase 5', description: 'We support you completely to get a job, internship, startup funding, or recognition.' }
    ],
    judgingCriteria: [
      { name: 'Innovation & Creativity', weight: '30%', description: 'How novel and original is the approach? Does it break new ground?' },
      { name: 'Technical Execution', weight: '25%', description: 'Code quality, architecture scalability, and robust deployment.' },
      { name: 'User Experience (UX)', weight: '20%', description: 'Intuitive design, accessibility, and overall polish of the interface.' },
      { name: 'Real-World Impact', weight: '15%', description: 'Does it solve a genuine problem? What is the market potential?' },
      { name: 'Pitch & Presentation', weight: '10%', description: 'Clarity of the video demo and effectiveness of communication.' }
    ],
    eligibility: [
      { title: 'Who can participate', description: 'Open globally to all students and professionals.' },
      { title: 'Experience Level', description: 'Beginner friendly - we will train you!' }
    ],
    faqs: [
      { q: 'Is the interview really guaranteed?', a: 'Yes! 100% of participants will get an interview.' },
      { q: 'Do I need prior AI experience?', a: 'Not at all. The contest includes comprehensive upskilling.' }
    ],
    resources: [
      { title: 'JobFinderAI', description: 'Lifetime free access to the recruitment platform.' },
      { title: 'Premium APIs', description: 'Full access to cutting edge LLM models and cloud APIs for the duration of the hackathon.' },
      { title: 'Masterclasses', description: 'Exclusive access to expert-led sessions on AI, product building, and startup growth.' }
    ],
    rewards: [
      {
        title: 'EVERY SINGLE PARTICIPANT RECEIVES',
        theme: 'premium',
        items: [
          { title: 'Assured Internship / Job Support' },
          { title: 'Confirmed Interview' },
          { title: 'Fundfy.app Free Forever' },
          { title: 'Lifetime FREE JobFinderAI Premium' }
        ]
      },
      {
        title: 'TOP PERFORMERS',
        theme: 'light',
        items: [
          { title: '₹15 Lakhs', description: 'Backing Grant — Top Performer', value: '1ST' },
          { title: '₹10 Lakhs', description: 'Backing Grant — Runner Up', value: '2ND' },
          { title: '₹5 Lakhs', description: 'Backing Grant — 3rd Finalist', value: '3RD' },
          { title: '₹20 Lakhs Pool', description: 'Distributed across Top 10 Finalists as Startup Support', value: 'TOP 10' }
        ]
      }
    ],
    registration: { mode: 'EMBEDDED_FORM', buttonText: 'REGISTER NOW' }
  },
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
      { label: 'Registration', value: '₹100' },
      { label: 'Grants & Funding', value: '₹50 Lakhs' },
      { label: 'Mode', value: 'Global Online' },
      { label: 'Deadline', value: 'Nov 30, 2026' }
    ],
    description: 'Welcome to the ultimate AI App Creation challenge. Your mission is to engineer the next generation of applications. Every participant gets assured internships, interviews, and lifetime access to our premium AI upskilling and recruitment tools.',
    whyParticipate: [
      { title: 'Assured Placements & Support', description: 'Every participant receives assured internships, jobs, or comprehensive career support.' },
      { title: 'Confirmed Interview', description: 'Skip the line. You secure an interview just for participating.' },
      { title: 'JobFinderAI Free Forever', description: 'Lifetime access to our premium AI-driven job matching ecosystem.' },
      { title: 'Fundfy.app Access', description: 'Find funds, sponsorships, grants, and investors if you are building a startup.' }
    ],
    timeline: [
      { title: 'Registration Opens', date: 'Phase 1', description: 'Sign up and get access to premium resources and platforms.' },
      { title: 'Kickoff & Masterclasses', date: 'Phase 2', description: 'Join exclusive live sessions with industry experts to learn the tools.' },
      { title: 'Build Phase', date: 'Phase 3', description: 'Develop your project with 24/7 technical support and mentorship.' },
      { title: 'Submission Deadline', date: 'Phase 4', description: 'Submit your code, presentation, and video pitch for evaluation.' },
      { title: 'Global Finals & Recognition', date: 'Phase 5', description: 'Top performers present to VIP judges and industry leaders for recognition, grants, and career-defining opportunities.' }
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
        title: 'EVERY SINGLE PARTICIPANT RECEIVES',
        theme: 'premium',
        items: [
          { title: 'Assured Internship / Job Support' },
          { title: 'Confirmed Interview' },
          { title: 'Fundfy.app Free Forever' },
          { title: 'Lifetime FREE JobFinderAI Premium' }
        ]
      },
      {
        title: 'TOP PERFORMERS',
        theme: 'light',
        items: [
          { title: '₹15 Lakhs', description: 'Backing Grant — Top Performer', value: '1ST' },
          { title: '₹10 Lakhs', description: 'Backing Grant — Runner Up', value: '2ND' },
          { title: '₹5 Lakhs', description: 'Backing Grant — 3rd Finalist', value: '3RD' },
          { title: '₹20 Lakhs Pool', description: 'Distributed across Top 10 Finalists as Startup Support', value: 'TOP 10' }
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
      { label: 'Registration', value: '₹100' },
      { label: 'Grants & Funding', value: '₹50 Lakhs' },
      { label: 'Mode', value: 'Global Online' },
      { label: 'Deadline', value: 'Nov 30, 2026' }
    ],
    description: 'Merge traditional 3D modeling pipelines with next-gen generative AI tools. Every participant gets assured internships, interviews, and lifetime access to our premium AI upskilling and recruitment tools.',
    whyParticipate: [
      { title: 'Assured Placements & Support', description: 'Every participant receives assured internships, jobs, or comprehensive career support.' },
      { title: 'Confirmed Interview', description: 'Skip the line. You secure an interview just for participating.' },
      { title: 'JobFinderAI Free Forever', description: 'Lifetime access to our premium AI-driven job matching ecosystem.' },
      { title: 'Fundfy.app Access', description: 'Find funds, sponsorships, grants, and investors if you are building a startup.' }
    ],
    timeline: [
      { title: 'Registration Opens', date: 'Phase 1', description: 'Sign up and get access to premium resources and platforms.' },
      { title: 'Kickoff & Masterclasses', date: 'Phase 2', description: 'Join exclusive live sessions with industry experts to learn the tools.' },
      { title: 'Build Phase', date: 'Phase 3', description: 'Develop your project with 24/7 technical support and mentorship.' },
      { title: 'Submission Deadline', date: 'Phase 4', description: 'Submit your code, presentation, and video pitch for evaluation.' },
      { title: 'Global Finals & Recognition', date: 'Phase 5', description: 'Top performers present to VIP judges and industry leaders for recognition, grants, and career-defining opportunities.' }
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
        title: 'EVERY SINGLE PARTICIPANT RECEIVES',
        theme: 'premium',
        items: [
          { title: 'Assured Internship / Job Support' },
          { title: 'Confirmed Interview' },
          { title: 'Fundfy.app Free Forever' },
          { title: 'Lifetime FREE JobFinderAI Premium' }
        ]
      },
      {
        title: 'TOP PERFORMERS',
        theme: 'light',
        items: [
          { title: '₹15 Lakhs', description: 'Backing Grant — Top Performer', value: '1ST' },
          { title: '₹10 Lakhs', description: 'Backing Grant — Runner Up', value: '2ND' },
          { title: '₹5 Lakhs', description: 'Backing Grant — 3rd Finalist', value: '3RD' },
          { title: '₹20 Lakhs Pool', description: 'Distributed across Top 10 Finalists as Startup Support', value: 'TOP 10' }
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
      { label: 'Registration', value: '₹100' },
      { label: 'Grants & Funding', value: '₹50 Lakhs' },
      { label: 'Mode', value: 'Global Online' },
      { label: 'Deadline', value: 'Nov 30, 2026' }
    ],
    description: 'Push the absolute boundaries of digital identity in this elite character modeling challenge. Every participant gets assured internships, interviews, and lifetime access to our premium tools.',
    whyParticipate: [
      { title: 'Assured Placements & Support', description: 'Every participant receives assured internships, jobs, or comprehensive career support.' },
      { title: 'Confirmed Interview', description: 'Skip the line. You secure an interview just for participating.' },
      { title: 'JobFinderAI Free Forever', description: 'Lifetime access to our premium AI-driven job matching ecosystem.' },
      { title: 'Fundfy.app Access', description: 'Find funds, sponsorships, grants, and investors if you are building a startup.' }
    ],
    timeline: [
      { title: 'Registration Opens', date: 'Phase 1', description: 'Sign up and get access to premium resources and platforms.' },
      { title: 'Kickoff & Masterclasses', date: 'Phase 2', description: 'Join exclusive live sessions with industry experts to learn the tools.' },
      { title: 'Build Phase', date: 'Phase 3', description: 'Develop your project with 24/7 technical support and mentorship.' },
      { title: 'Submission Deadline', date: 'Phase 4', description: 'Submit your code, presentation, and video pitch for evaluation.' },
      { title: 'Global Finals & Recognition', date: 'Phase 5', description: 'Top performers present to VIP judges and industry leaders for recognition, grants, and career-defining opportunities.' }
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
        title: 'EVERY SINGLE PARTICIPANT RECEIVES',
        theme: 'premium',
        items: [
          { title: 'Assured Internship / Job Support' },
          { title: 'Confirmed Interview' },
          { title: 'Fundfy.app Free Forever' },
          { title: 'Lifetime FREE JobFinderAI Premium' }
        ]
      },
      {
        title: 'TOP PERFORMERS',
        theme: 'light',
        items: [
          { title: '₹15 Lakhs', description: 'Backing Grant — Top Performer', value: '1ST' },
          { title: '₹10 Lakhs', description: 'Backing Grant — Runner Up', value: '2ND' },
          { title: '₹5 Lakhs', description: 'Backing Grant — 3rd Finalist', value: '3RD' },
          { title: '₹20 Lakhs Pool', description: 'Distributed across Top 10 Finalists as Startup Support', value: 'TOP 10' }
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
      { label: 'Registration', value: '₹100' },
      { label: 'Grants & Funding', value: '₹50 Lakhs' },
      { label: 'Mode', value: 'Global Online' },
      { label: 'Deadline', value: 'Nov 30, 2026' }
    ],
    description: 'Design the future of the web. Craft stunning interfaces and breathtaking web experiences. Every participant gets assured internships, interviews, and lifetime access to our premium tools.',
    whyParticipate: [
      { title: 'Assured Placements & Support', description: 'Every participant receives assured internships, jobs, or comprehensive career support.' },
      { title: 'Confirmed Interview', description: 'Skip the line. You secure an interview just for participating.' },
      { title: 'JobFinderAI Free Forever', description: 'Lifetime access to our premium AI-driven job matching ecosystem.' },
      { title: 'Fundfy.app Access', description: 'Find funds, sponsorships, grants, and investors if you are building a startup.' }
    ],
    timeline: [
      { title: 'Registration Opens', date: 'Phase 1', description: 'Sign up and get access to premium resources and platforms.' },
      { title: 'Kickoff & Masterclasses', date: 'Phase 2', description: 'Join exclusive live sessions with industry experts to learn the tools.' },
      { title: 'Build Phase', date: 'Phase 3', description: 'Develop your project with 24/7 technical support and mentorship.' },
      { title: 'Submission Deadline', date: 'Phase 4', description: 'Submit your code, presentation, and video pitch for evaluation.' },
      { title: 'Global Finals & Recognition', date: 'Phase 5', description: 'Top performers present to VIP judges and industry leaders for recognition, grants, and career-defining opportunities.' }
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
        title: 'EVERY SINGLE PARTICIPANT RECEIVES',
        theme: 'premium',
        items: [
          { title: 'Assured Internship / Job Support' },
          { title: 'Confirmed Interview' },
          { title: 'Fundfy.app Free Forever' },
          { title: 'Lifetime FREE JobFinderAI Premium' }
        ]
      },
      {
        title: 'TOP PERFORMERS',
        theme: 'light',
        items: [
          { title: '₹15 Lakhs', description: 'Backing Grant — Top Performer', value: '1ST' },
          { title: '₹10 Lakhs', description: 'Backing Grant — Runner Up', value: '2ND' },
          { title: '₹5 Lakhs', description: 'Backing Grant — 3rd Finalist', value: '3RD' },
          { title: '₹20 Lakhs Pool', description: 'Distributed across Top 10 Finalists as Startup Support', value: 'TOP 10' }
        ]
      }
    ],
    registration: {
      mode: 'EMBEDDED_FORM',
      url: 'https://docs.google.com/forms/placeholder',
      buttonText: 'REGISTER NOW'
    }
  }
];

export const getContestConfig = (slug: string): ContestConfig | undefined => {
  return CONTESTS.find(c => c.id === slug);
};
