export interface RegistrationData {
  // Contest Info
  contestSlug: string;
  contestName: string;
  
  // Participant Info
  participant: {
    firstName: string;
    lastName: string;
  };
  email: string;
  phone: string;
  
  // Location
  country: string;
  state: string;
  city: string;
  
  // Role & Affiliation
  role: 'student' | 'professional' | '';
  collegeCompany: string; // Optional if not applicable, but generally useful
  
  // Links
  linkedin?: string;
  portfolio?: string;
  github?: string;
  
  // Financials
  registrationFee: number;
  currency: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'not_required';
  
  // Meta
  registrationStatus: 'draft' | 'submitted' | 'verified';
  registrationId: string;
  createdAt: string; // ISO string
}
