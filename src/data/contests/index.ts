import type { ContestConfig } from '../../types/contest';

export const CONTESTS: ContestConfig[] = [
  {
    id: 'ai-app-creation',
    status: 'OPEN',
    title: 'AI App Creation',
    subtitle: 'Build the future with Artificial Intelligence.',
    category: 'Software Engineering',
    difficulty: 'Advanced',
    prizeHighlight: '$10,000 + AWS Credits',
    theme: {
      primaryAccent: 'purple-600',
      secondaryAccent: 'blue-500',
      accentGradient: 'from-purple-600 to-blue-500',
      backgroundStyle: 'cinematic',
    },
    artworkType: 'AI',

    seo: {
      title: 'AI App Creation | Global Talent Hunt',
      description: 'Build the future with Generative AI.',
      ogImage: ''
    },
    statistics: [
      { label: 'Prize Pool', value: '$25,000+' },
      { label: 'Registration', value: 'Free' },
      { label: 'Mode', value: 'Global Online' },
      { label: 'Deadline', value: 'Nov 30, 2026' }
    ],
    description: 'Welcome to the ultimate AI App Creation challenge. In this contest, you are tasked with building the next generation of applications utilizing cutting-edge Generative AI tools. Show the world what AI can do when placed in the hands of visionary developers.',
    whyParticipate: [
      { title: 'Build an incredible portfolio', description: 'Deploy a cutting edge AI app that will wow top employers.' },
      { title: 'Showcase your AI skills', description: 'Demonstrate your ability to leverage LLMs and AI APIs in real-world scenarios.' },
      { title: 'Compete globally', description: 'Test your engineering chops against top talent worldwide.' },
      { title: 'Receive lifetime tools', description: 'Every participant receives lifetime access to premium tools.' }
    ],
    timeline: [
      { title: 'Click Register', date: 'Step 1', description: 'Begin your journey.' },
      { title: 'Fill Google Form', date: 'Step 2', description: 'Submit your details.' },
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
          { title: 'Lifetime FREE JobFinderAI Premium Subscription' },
          { title: 'Digital Participation Certificate' }
        ]
      },
      {
        title: 'TOP WINNERS RECEIVE',
        theme: 'dark',
        items: [
          { title: 'Cash Prize', value: '$10,000' },
          { title: '$5,000 AWS Credits', description: 'Top 5 Winners' },
          { title: 'Gaming PC', description: 'Runner up' },
          { title: 'PlayStation 5', description: 'Runner up' }
        ]
      },
      {
        title: 'EXCLUSIVE EXPERIENCES',
        theme: 'premium',
        items: [
          { title: 'Meet Akon', description: 'Once in a lifetime VIP experience.' }
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
    id: 'job-application-contest',
    status: 'OPEN',
    title: 'Job Contest',
    subtitle: 'Optimize your career.',
    category: 'Career',
    difficulty: 'All Levels',
    prizeHighlight: 'Premium Mentorship',
    theme: {
      primaryAccent: 'emerald-500',
      secondaryAccent: 'cyan-500',
      accentGradient: 'from-emerald-500 to-cyan-500',
      backgroundStyle: 'light',
    },
    artworkType: 'JOB',

    seo: { title: 'Job Contest', description: '', ogImage: '' },
    statistics: [],
    description: 'Optimize your resume and interview skills.',
    whyParticipate: [],
    timeline: [],
    judgingCriteria: [],
    eligibility: [],
    faqs: [],
    rewards: [
      {
        title: 'EVERY PARTICIPANT RECEIVES',
        theme: 'light',
        items: [
          { title: 'Lifetime FREE JobFinderAI Premium Subscription' },
          { title: 'Digital Participation Certificate' }
        ]
      },
      {
        title: 'TOP WINNERS RECEIVE',
        theme: 'dark',
        items: [
          { title: 'Premium Mentorship', value: '1-on-1' },
          { title: '$5,000 AWS Credits', description: 'Top 5 Winners' }
        ]
      }
    ],
    registration: { mode: 'COMING_SOON', buttonText: 'COMING SOON' }
  },
  {
    id: '3d-asset-creation',
    status: 'OPEN',
    title: '3D Asset Creation',
    subtitle: 'Build the metaverse.',
    category: 'Design',
    difficulty: 'Intermediate',
    prizeHighlight: '$5,000',
    theme: {
      primaryAccent: 'orange-500',
      secondaryAccent: 'rose-500',
      accentGradient: 'from-orange-500 to-rose-500',
      backgroundStyle: 'dark',
    },
    artworkType: '3D_ASSET',

    seo: { title: '3D Asset', description: '', ogImage: '' },
    statistics: [],
    description: '',
    whyParticipate: [],
    timeline: [],
    judgingCriteria: [],
    eligibility: [],
    faqs: [],
    rewards: [
      {
        title: 'EVERY PARTICIPANT RECEIVES',
        theme: 'light',
        items: [
          { title: 'Lifetime FREE JobFinderAI Premium Subscription' },
          { title: 'Digital Participation Certificate' }
        ]
      },
      {
        title: 'TOP WINNERS RECEIVE',
        theme: 'dark',
        items: [
          { title: 'Cash Prize', value: '$5,000' },
          { title: '$5,000 AWS Credits', description: 'Top 5 Winners' },
          { title: 'PlayStation 5', description: 'Runner up' }
        ]
      }
    ],
    registration: { mode: 'COMING_SOON', buttonText: 'COMING SOON' }
  },
  {
    id: '3d-character-modeling',
    status: 'OPEN',
    title: 'Character Modeling',
    subtitle: 'Bring digital humans to life.',
    category: 'Design',
    difficulty: 'Advanced',
    prizeHighlight: 'RTX 4090 PC',
    theme: {
      primaryAccent: 'pink-500',
      secondaryAccent: 'violet-500',
      accentGradient: 'from-pink-500 to-violet-500',
      backgroundStyle: 'cinematic',
    },
    artworkType: '3D_CHARACTER',

    seo: { title: '3D Character', description: '', ogImage: '' },
    statistics: [],
    description: '',
    whyParticipate: [],
    timeline: [],
    judgingCriteria: [],
    eligibility: [],
    faqs: [],
    rewards: [
      {
        title: 'EVERY PARTICIPANT RECEIVES',
        theme: 'light',
        items: [
          { title: 'Lifetime FREE JobFinderAI Premium Subscription' },
          { title: 'Digital Participation Certificate' }
        ]
      },
      {
        title: 'TOP WINNERS RECEIVE',
        theme: 'dark',
        items: [
          { title: 'Gaming PC', value: 'RTX 4090' },
          { title: '$5,000 AWS Credits', description: 'Top 5 Winners' },
          { title: 'Cash Prize', description: '$2,000 for runner up' }
        ]
      }
    ],
    registration: { mode: 'COMING_SOON', buttonText: 'COMING SOON' }
  },
  {
    id: 'ui-ux-design',
    status: 'OPEN',
    title: 'UI/UX Design',
    subtitle: 'Craft perfect interfaces.',
    category: 'Design',
    difficulty: 'All Levels',
    prizeHighlight: '$8,000',
    theme: {
      primaryAccent: 'yellow-400',
      secondaryAccent: 'orange-500',
      accentGradient: 'from-yellow-400 to-orange-500',
      backgroundStyle: 'light',
    },
    artworkType: 'UI_UX',

    seo: { title: 'UI/UX Design', description: '', ogImage: '' },
    statistics: [],
    description: '',
    whyParticipate: [],
    timeline: [],
    judgingCriteria: [],
    eligibility: [],
    faqs: [],
    rewards: [
      {
        title: 'EVERY PARTICIPANT RECEIVES',
        theme: 'light',
        items: [
          { title: 'Lifetime FREE JobFinderAI Premium Subscription' },
          { title: 'Digital Participation Certificate' }
        ]
      },
      {
        title: 'TOP WINNERS RECEIVE',
        theme: 'dark',
        items: [
          { title: 'Cash Prize', value: '$8,000' },
          { title: '$5,000 AWS Credits', description: 'Top 5 Winners' },
          { title: 'MacBook Pro M3', description: 'Runner up' }
        ]
      }
    ],
    registration: { mode: 'COMING_SOON', buttonText: 'COMING SOON' }
  },
  {
    id: 'momentum-edu',
    status: 'COMING_SOON',
    title: 'Momentum Edu+',
    subtitle: 'The future of learning.',
    category: 'Education',
    difficulty: 'All Levels',
    prizeHighlight: 'TBA',
    theme: {
      primaryAccent: 'blue-500',
      secondaryAccent: 'indigo-500',
      accentGradient: 'from-blue-500 to-indigo-500',
      backgroundStyle: 'cinematic',
    },
    artworkType: 'EDU',

    seo: { title: 'Momentum Edu+', description: '', ogImage: '' },
    statistics: [],
    description: '',
    whyParticipate: [],
    timeline: [],
    judgingCriteria: [],
    eligibility: [],
    faqs: [],
    rewards: [
      {
        title: 'EVERY PARTICIPANT RECEIVES',
        theme: 'light',
        items: [
          { title: 'Lifetime FREE JobFinderAI Premium Subscription' },
          { title: 'Digital Participation Certificate' }
        ]
      },
      {
        title: 'TOP WINNERS RECEIVE',
        theme: 'dark',
        items: [
          { title: 'Grand Prize', value: 'TBA' },
          { title: '$5,000 AWS Credits', description: 'Top 5 Winners' }
        ]
      }
    ],
    registration: { mode: 'COMING_SOON', buttonText: 'COMING SOON' }
  }
];

export const getContestConfig = (slug: string): ContestConfig | undefined => {
  return CONTESTS.find(c => c.id === slug);
};
