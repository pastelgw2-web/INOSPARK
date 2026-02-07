import { Project, ProjectCategory, ProjectStatus, User, UserRole, Announcement, InnovationChallenge, VerificationStatus } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Dr. Sarah Connor',
    email: 'sarah@innovate.com',
    role: UserRole.INNOVATOR,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    bio: 'Robotics enthusiast and AI researcher working on sustainable tech.',
    isVerified: true,
    kycStatus: VerificationStatus.VERIFIED
  },
  {
    id: 'u2',
    name: 'Ahmad Admin',
    email: 'admin@innospark.com',
    role: UserRole.ADMIN,
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=admin',
    isVerified: true,
    kycStatus: VerificationStatus.VERIFIED
  },
  {
    id: 'u3',
    name: 'AutoParts Global',
    email: 'contact@autoparts.com',
    role: UserRole.COLLABORATOR,
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=autoparts',
    bio: 'Collaborator Entitas: Memberikan bimbingan teknis dan integrasi komponen industri untuk inovator startup EV.',
    isVerified: true,
    kycStatus: VerificationStatus.VERIFIED
  }
];

// NAMA VARIABEL DI BAWAH INI HARUS PERSIS SEPERTI INI AGAR APP.TSX TIDAK ERROR
export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'n1',
    title: 'InovasiKita Summit 2025',
    content: 'Bergabunglah dalam pertemuan inovator terbesar di Asia Tenggara. Daftar sekarang!',
    imageUrl: 'https://images.unsplash.com/photo-1540575861501-7ad05823c95b?auto=format&fit=crop&w=1200&q=80',
    link: '#',
    active: true
  }
];

export const MOCK_CHALLENGES: InnovationChallenge[] = [
  {
    id: 'c1',
    companyName: 'AutoParts Global',
    title: 'Industrial EV Component Integration',
    description: 'Kami mencari inovator yang sedang mengembangkan sistem manajemen daya atau motor listrik.',
    reward: 'Supply Chain Integration & Industrial Mentorship',
    skillsNeeded: ['Power Electronics', 'Mechanical Design']
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'OceanPlastic Bot',
    tagline: 'Robot otonom pembersih sampah plastik terumbu karang.',
    description: 'Drone bawah air bertenaga AI yang dapat mengidentifikasi dan mengumpulkan sampah plastik.',
    innovatorId: 'u1',
    category: ProjectCategory.ENVIRONMENT,
    status: ProjectStatus.ACTIVE,
    targetFunding: 150000000,
    currentFunding: 45000000,
    imageUrl: 'https://images.unsplash.com/photo-1484291470158-b8f8d608850d?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
    donorsCount: 88,
    volunteersCount: 4,
    requirements: [
      { id: 's1', name: 'Computer Vision', totalSlots: 2, filledSlots: 1 }
    ]
  }
];
