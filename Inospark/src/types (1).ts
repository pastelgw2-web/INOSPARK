
export enum ProjectCategory {
  TECHNOLOGY = 'Technology',
  SOCIAL = 'Social',
  ENVIRONMENT = 'Environment',
  EDUCATION = 'Education',
  HEALTH = 'Health'
}

export enum ProjectStatus {
  PENDING = 'Pending Curated',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
  REJECTED = 'Rejected'
}

export enum UserRole {
  DONOR = 'Donor',
  INNOVATOR = 'Innovator',
  VOLUNTEER = 'Volunteer',
  COLLABORATOR = 'Collaborator',
  ADMIN = 'Admin'
}

export enum VerificationStatus {
  UNVERIFIED = 'Unverified',
  PENDING = 'Pending',
  VERIFIED = 'Verified'
}

export interface SiteSettings {
  platformName: string;
  primaryColor: string;
  logoUrl: string;
}

export interface SkillRequirement {
  id: string;
  name: string;
  totalSlots: number;
  filledSlots: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  bio?: string;
  skills?: string[];
  isVerified: boolean;
  kycStatus?: VerificationStatus;
  isRestricted?: boolean;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  innovatorId: string;
  category: ProjectCategory;
  status: ProjectStatus;
  targetFunding: number;
  currentFunding: number;
  imageUrl: string;
  createdAt: string;
  requirements: SkillRequirement[];
  donorsCount: number;
  volunteersCount: number;
}

export interface Donation {
  id: string;
  projectId: string;
  donorName: string;
  amount: number;
  isRecurring: boolean;
  timestamp: string;
}

export interface VolunteerApplication {
  id: string;
  projectId: string;
  userId: string;
  skillId: string;
  pitch: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

// Added missing Announcement interface for NewsSlider and constant mocks
export interface Announcement {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  link: string;
  active: boolean;
}

// Added missing InnovationChallenge interface for CollaborationHub and constant mocks
export interface InnovationChallenge {
  id: string;
  companyName: string;
  title: string;
  description: string;
  reward: string;
  skillsNeeded: string[];
}
