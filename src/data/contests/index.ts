import type { ContestConfig } from '../../types/contest';

export const CONTESTS: ContestConfig[] = [
  {
    id: 'ai-education-innovation-contest',
    status: 'OPEN',
    title: 'AI Education Innovation Contest',
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

    seo: { title: 'AI Education Innovation Contest', description: '', ogImage: '' },
    registrationFee: 100,
    currency: 'INR',
    paymentRequired: true,
    statistics: [
      { label: 'Prize Pool', value: '$50,000' },
      { label: 'Mode', value: 'Global Online' },
      { label: 'Deadline', value: 'Nov 30, 2026' }
    ],
    description: 'Transform your future with the ultimate AI Education challenge. For just ₹100, you are securing a massive career upgrade. Upskill in AI and discover powerful AI use cases tailored to your specific industry. We focus heavily on communication skills and real-world readiness to make you unstoppable.',
    whyParticipate: [
      { title: 'Assured Placements & Support', description: 'Every participant receives assured internships, jobs, or comprehensive career support.' },
      { title: 'Confirmed Interview', description: 'Skip the line. You secure an interview just for participating.' },
      { title: 'Momentum EDU+ Access', description: 'Get access to your personal AI learning companion that teaches you anything.' },
      { title: 'JobFinderAI Free Forever', description: 'Lifetime access to our premium AI-driven job matching ecosystem.' },
      { title: 'Fundfy.app Access', description: 'Find funds, sponsorships, grants, and investors if you are building a startup.' }
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
      { title: 'Who can participate', description: 'Open globally to all students and professionals.' },
      { title: 'Experience Level', description: 'Beginner friendly - we will train you!' }
    ],
    faqs: [
      { q: 'Is the interview really guaranteed?', a: 'Yes! 100% of participants will get an interview.' },
      { q: 'Do I need prior AI experience?', a: 'Not at all. The contest includes comprehensive upskilling.' }
    ],
    resources: [
      { title: 'Momentum EDU+', description: 'Your personal AI companion for upskilling.' },
      { title: 'JobFinderAI', description: 'Lifetime free access to the recruitment platform.' },
      { title: 'Fundfy.app', description: 'Find funds, sponsorships, grants, and investors for your startup.' },
      { title: 'Premium APIs', description: 'Full access to cutting edge LLM models and cloud APIs for the duration of the hackathon.' }
    ],
    rewards: [
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
      { label: 'Prize Pool', value: '$50,000' },
      { label: 'Mode', value: 'Global Online' },
      { label: 'Deadline', value: 'Nov 30, 2026' }
    ],
    description: 'Welcome to the ultimate AI App Creation challenge. Your mission is to engineer the next generation of applications. For just ₹100, you are securing a massive career upgrade. Every participant gets assured internships, interviews, and lifetime access to our premium AI upskilling and recruitment tools.',
    whyParticipate: [
      { title: 'Assured Placements & Support', description: 'Every participant receives assured internships, jobs, or comprehensive career support.' },
      { title: 'Confirmed Interview', description: 'Skip the line. You secure an interview just for participating.' },
      { title: 'Momentum EDU+ Access', description: 'Get access to your personal AI learning companion that teaches you anything.' },
      { title: 'JobFinderAI Free Forever', description: 'Lifetime access to our premium AI-driven job matching ecosystem.' },
      { title: 'Fundfy.app Access', description: 'Find funds, sponsorships, grants, and investors if you are building a startup.' }
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
    description: 'Powered by JobFinderAI, this challenge is designed to revolutionize recruitment. For just ₹100, you are securing a massive career upgrade. Every participant gets assured internships, interviews, and lifetime access to our premium AI upskilling and recruitment tools.',
    whyParticipate: [
      { title: 'Assured Placements & Support', description: 'Every participant receives assured internships, jobs, or comprehensive career support.' },
      { title: 'Confirmed Interview', description: 'Skip the line. You secure an interview just for participating.' },
      { title: 'Momentum EDU+ Access', description: 'Get access to your personal AI learning companion that teaches you anything.' },
      { title: 'JobFinderAI Free Forever', description: 'Lifetime access to our premium AI-driven job matching ecosystem.' },
      { title: 'Fundfy.app Access', description: 'Find funds, sponsorships, grants, and investors if you are building a startup.' }
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
    description: 'Merge traditional 3D modeling pipelines with next-gen generative AI tools. For just ₹100, you are securing a massive career upgrade. Every participant gets assured internships, interviews, and lifetime access to our premium AI upskilling and recruitment tools.',
    whyParticipate: [
      { title: 'Assured Placements & Support', description: 'Every participant receives assured internships, jobs, or comprehensive career support.' },
      { title: 'Confirmed Interview', description: 'Skip the line. You secure an interview just for participating.' },
      { title: 'Momentum EDU+ Access', description: 'Get access to your personal AI learning companion that teaches you anything.' },
      { title: 'JobFinderAI Free Forever', description: 'Lifetime access to our premium AI-driven job matching ecosystem.' },
      { title: 'Fundfy.app Access', description: 'Find funds, sponsorships, grants, and investors if you are building a startup.' }
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
    description: 'Push the absolute boundaries of digital identity in this elite character modeling challenge. For just ₹100, you are securing a massive career upgrade. Every participant gets assured internships, interviews, and lifetime access to our premium tools.',
    whyParticipate: [
      { title: 'Assured Placements & Support', description: 'Every participant receives assured internships, jobs, or comprehensive career support.' },
      { title: 'Confirmed Interview', description: 'Skip the line. You secure an interview just for participating.' },
      { title: 'Momentum EDU+ Access', description: 'Get access to your personal AI learning companion that teaches you anything.' },
      { title: 'JobFinderAI Free Forever', description: 'Lifetime access to our premium AI-driven job matching ecosystem.' },
      { title: 'Fundfy.app Access', description: 'Find funds, sponsorships, grants, and investors if you are building a startup.' }
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
    description: 'Design the future of the web. Craft stunning interfaces and breathtaking web experiences. For just ₹100, you are securing a massive career upgrade. Every participant gets assured internships, interviews, and lifetime access to our premium tools.',
    whyParticipate: [
      { title: 'Assured Placements & Support', description: 'Every participant receives assured internships, jobs, or comprehensive career support.' },
      { title: 'Confirmed Interview', description: 'Skip the line. You secure an interview just for participating.' },
      { title: 'Momentum EDU+ Access', description: 'Get access to your personal AI learning companion that teaches you anything.' },
      { title: 'JobFinderAI Free Forever', description: 'Lifetime access to our premium AI-driven job matching ecosystem.' },
      { title: 'Fundfy.app Access', description: 'Find funds, sponsorships, grants, and investors if you are building a startup.' }
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
