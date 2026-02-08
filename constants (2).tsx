import { Project, ProjectCategory, ProjectStatus, User, UserRole, Announcement, InnovationChallenge, VerificationStatus } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Dr. Sarah Connor',
    email: 'sarah@innovate.com',
    role: UserRole.INNOVATOR,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    bio: 'Robotics enthusiast and AI researcher.',
    isVerified: true,
    kycStatus: VerificationStatus.VERIFIED
  }
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'n1',
    title: 'Welcome to INOSPARK',
    content: 'Platform kolaborasi inovasi masa depan.',
    imageUrl: 'https://images.unsplash.com/photo-1540575861501-7ad05823c95b?auto=format&fit=crop&w=1200&q=80',
    link: '#',
    active: true
  }
];

export const MOCK_CHALLENGES: InnovationChallenge[] = [
  {
    id: 'c1',
    companyName: 'InoSpark Tech',
    title: 'Future Tech Challenge',
    description: 'Mencari solusi teknologi berkelanjutan untuk industri.',
    reward: 'Mentorship & Funding',
    skillsNeeded: ['React', 'AI']
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Demo Project',
    tagline: 'Inovasi untuk masa depan.',
    description: 'Ini adalah proyek contoh untuk memastikan website berjalan.',
    innovatorId: 'u1',
    category: ProjectCategory.TECHNOLOGY,
    status: ProjectStatus.ACTIVE,
    targetFunding: 1000000,
    currentFunding: 500000,
    imageUrl: 'https://images.unsplash.com/photo-1484291470158-b8f8d608850d?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
    donorsCount: 10,
    volunteersCount: 2,
    requirements: [
      { id: 's1', name: 'Developer', totalSlots: 2, filledSlots: 1 }
    ]
  }
];