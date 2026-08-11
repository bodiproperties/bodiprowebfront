export type Language = 'mn' | 'en';

export interface HeroSlide {
  id: string;
  image: string;
  label: Record<Language, string>;
  title: Record<Language, string>;
  desc: Record<Language, string>;
  category: Record<Language, string>;
}

export interface JobPosition {
  id: string;
  title: Record<Language, string>;
  department: string;
  location: Record<Language, string>;
  type: Record<Language, string>;
  experience: Record<Language, string>;
  salaryRange?: string;
  summary: Record<Language, string>;
  responsibilities: Record<Language, string[]>;
  requirements: Record<Language, string[]>;
  benefits: Record<Language, string[]>;
  featured?: boolean;
}

export interface BenefitItem {
  number: string;
  iconName: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
}

export interface HiringStep {
  number: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  description: Record<Language, string>;
  duration: Record<Language, string>;
  tips: Record<Language, string>;
}

export interface Testimonial {
  id: string;
  name: string;
  role: Record<Language, string>;
  avatar: string;
  quote: Record<Language, string>;
  yearsAtCompany: number;
}

export interface ApplicationFormData {
  positionId: string;
  positionTitle: string;
  fullName: string;
  email: string;
  phone: string;
  portfolioUrl: string;
  linkedinUrl: string;
  coverLetter: string;
  resumeFile: File | null;
}
