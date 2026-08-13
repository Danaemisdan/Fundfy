export type ContestStatus = 'OPEN' | 'COMING_SOON' | 'CLOSED';
export type ContestDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
export type RegistrationMode = 'EMBEDDED_FORM' | 'EXTERNAL_URL' | 'COMING_SOON';

export interface SEOConfig {
  title: string;
  description: string;
  ogImage: string;
}

export interface RewardCategory {
  title: string;
  theme: 'light' | 'dark' | 'premium'; // premium for dramatic "Meet Akon" styles
  items: {
    title: string;
    description?: string;
    value?: string;
    icon?: string;
  }[];
}

export interface ContestConfig {
  id: string; // slug
  status: ContestStatus;
  
  // Showcase Metadata
  title: string;
  subtitle: string;
  category: string;
  difficulty: ContestDifficulty;
  prizeHighlight: string;
  
  theme: {
    primaryAccent: string; // Tailwind color name e.g., 'purple-600'
    secondaryAccent: string;
    accentGradient: string;
    backgroundStyle: 'light' | 'dark' | 'cinematic';
  };
  
  // Artwork hints for CSS generation
  artworkType: 'AI' | 'JOB' | '3D_ASSET' | '3D_CHARACTER' | 'UI_UX' | 'EDU';

  seo: SEOConfig;
  
  // Registration Payment Data
  registrationFee: number;
  currency: string;
  paymentRequired: boolean;

  // Hero Statistics
  statistics: {
    label: string;
    value: string;
    link?: string;
  }[];

  // Content
  description: string;
  whyParticipate: {
    title: string;
    description: string;
  }[];
  
  timeline: {
    title: string;
    date: string;
    description: string;
  }[];
  
  judgingCriteria: {
    name: string;
    weight: string;
    description: string;
  }[];
  
  eligibility: {
    title: string;
    description: string;
  }[];
  
  faqs: {
    q: string;
    a: string;
  }[];

  resources?: {
    title: string;
    description: string;
    icon?: string;
  }[];

  rewards: RewardCategory[];

  registration: {
    mode: RegistrationMode;
    url?: string; // external or form URL
    buttonText: string;
  };
}
