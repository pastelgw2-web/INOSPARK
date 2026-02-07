
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
  },
  {
    id: 'u4',
    name: 'Budi Santoso',
    email: 'budi@donor.com',
    role: UserRole.DONOR,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=budi',
    bio: 'Filantropis yang fokus pada dukungan pendanaan inovasi ramah lingkungan dan teknologi tepat guna.',
    isVerified: true,
    kycStatus: VerificationStatus.VERIFIED
  },
  {
    id: 'u5',
    name: 'Siti Aminah',
    email: 'siti@volunteer.com',
    role: UserRole.VOLUNTEER,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=siti',
    bio: 'Full-stack developer yang berdedikasi menyumbangkan keahlian teknis untuk membantu mewujudkan proyek inovasi sosial.',
    skills: ['React', 'Node.js', 'UI Design'],
    isVerified: true,
    kycStatus: VerificationStatus.VERIFIED
  }
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'n1',
    title: 'InovasiKita Summit 2025',
    content: 'Bergabunglah dalam pertemuan inovator terbesar di Asia Tenggara. Daftar sekarang!',
    imageUrl: 'https://images.unsplash.com/photo-1540575861501-7ad05823c95b?auto=format&fit=crop&w=1200&q=80',
    link: '#',
    active: true
  },
  {
    id: 'n2',
    title: 'Darurat Teknologi Air Bersih',
    content: 'Sebuah desa di NTT membutuhkan filtrasi berkelanjutan. Dukung proyeknya hari ini.',
    imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=80',
    link: '#',
    active: true
  }
];

export const MOCK_CHALLENGES: InnovationChallenge[] = [
  {
    id: 'c1',
    companyName: 'AutoParts Global',
    title: 'Industrial EV Component Integration',
    description: 'Kami mencari inovator yang sedang mengembangkan sistem manajemen daya atau motor listrik. Kami menyediakan akses ke rantai pasok komponen otomotif kami.',
    reward: 'Supply Chain Integration & Industrial Mentorship',
    skillsNeeded: ['Power Electronics', 'Supply Chain Management', 'Mechanical Design']
  },
  {
    id: 'c2',
    companyName: 'TechLab Research Institute',
    title: 'Advanced Materials Testing Support',
    description: 'Punya inovasi di bidang material berkelanjutan? Kami membuka laboratorium pengujian struktur kami untuk membantu validasi teknis prototipe Anda.',
    reward: 'Free Lab Access & Certification Guidance',
    skillsNeeded: ['Materials Science', 'Structural Analysis', 'Quality Assurance']
  }
];

export const MOCK_PROJECTS: Project[] = [
  // ENVIRONMENT CATEGORY
  {
    id: 'p1',
    title: 'OceanPlastic Bot',
    tagline: 'Robot otonom pembersih sampah plastik terumbu karang.',
    description: 'Drone bawah air bertenaga AI yang dapat mengidentifikasi dan mengumpulkan sampah plastik dari terumbu karang tanpa merusak ekosistem.',
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
      { id: 's1', name: 'Computer Vision', totalSlots: 2, filledSlots: 1 },
      { id: 's2', name: 'Hardware Engineering', totalSlots: 1, filledSlots: 0 }
    ]
  },
  {
    id: 'p3',
    title: 'CarbonFootprint Tracker',
    tagline: 'IoT sensor untuk monitoring emisi karbon industri real-time.',
    description: 'Sistem sensor terintegrasi untuk pabrik skala menengah agar dapat memantau dan melaporkan emisi gas buang secara akurat dan transparan.',
    innovatorId: 'u1',
    category: ProjectCategory.ENVIRONMENT,
    status: ProjectStatus.ACTIVE,
    targetFunding: 75000000,
    currentFunding: 20000000,
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
    donorsCount: 32,
    volunteersCount: 2,
    requirements: [
      { id: 's10', name: 'IoT Development', totalSlots: 2, filledSlots: 1 },
      { id: 's11', name: 'Data Analytics', totalSlots: 1, filledSlots: 1 }
    ]
  },
  {
    id: 'p4',
    title: 'BioWaste-to-Energy',
    tagline: 'Konverter limbah organik rumah tangga menjadi energi listrik.',
    description: 'Alat komposter canggih yang mampu mengubah gas metana dari limbah dapur menjadi energi listrik untuk pengisian daya gadget.',
    innovatorId: 'u1',
    category: ProjectCategory.ENVIRONMENT,
    status: ProjectStatus.ACTIVE,
    targetFunding: 120000000,
    currentFunding: 85000000,
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
    donorsCount: 156,
    volunteersCount: 5,
    requirements: [
      { id: 's12', name: 'Chemical Engineering', totalSlots: 2, filledSlots: 2 },
      { id: 's13', name: 'Electrical Design', totalSlots: 2, filledSlots: 1 }
    ]
  },

  // TECHNOLOGY CATEGORY
  {
    id: 'p2',
    title: 'SolarGrid Connect',
    tagline: 'Demokratisasi energi bersih untuk desa terpencil.',
    description: 'Kit panel surya modular yang dirancang untuk perakitan mudah oleh komunitas lokal untuk pencahayaan berkelanjutan.',
    innovatorId: 'u3',
    category: ProjectCategory.TECHNOLOGY,
    status: ProjectStatus.ACTIVE,
    targetFunding: 250000000,
    currentFunding: 180000000,
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-fe5bb584850a?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
    donorsCount: 340,
    volunteersCount: 12,
    requirements: [
      { id: 's4', name: 'Electrical Engineering', totalSlots: 4, filledSlots: 2 },
      { id: 's5', name: 'Community Outreach', totalSlots: 3, filledSlots: 3 }
    ]
  },
  {
    id: 'p5',
    title: 'AgriDrone Precision',
    tagline: 'Drone pemetaan nutrisi tanah berbasis multispektral.',
    description: 'Drone murah yang membantu petani kecil mendeteksi kekurangan nutrisi tanah secara spesifik sehingga menghemat penggunaan pupuk.',
    innovatorId: 'u3',
    category: ProjectCategory.TECHNOLOGY,
    status: ProjectStatus.ACTIVE,
    targetFunding: 90000000,
    currentFunding: 15000000,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
    donorsCount: 22,
    volunteersCount: 1,
    requirements: [
      { id: 's14', name: 'Python Developer', totalSlots: 2, filledSlots: 1 },
      { id: 's15', name: 'GIS Specialist', totalSlots: 1, filledSlots: 0 }
    ]
  },
  {
    id: 'p6',
    title: 'QuantumSafe Network',
    tagline: 'Sistem enkripsi data masa depan tahan serangan komputer kuantum.',
    description: 'Protokol keamanan data baru yang dirancang untuk melindungi infrastruktur perbankan dari ancaman komputasi kuantum.',
    innovatorId: 'u3',
    category: ProjectCategory.TECHNOLOGY,
    status: ProjectStatus.ACTIVE,
    targetFunding: 500000000,
    currentFunding: 50000000,
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
    donorsCount: 12,
    volunteersCount: 2,
    requirements: [
      { id: 's16', name: 'Cryptography', totalSlots: 3, filledSlots: 1 },
      { id: 's17', name: 'Network Security', totalSlots: 2, filledSlots: 1 }
    ]
  },

  // SOCIAL CATEGORY
  {
    id: 'p7',
    title: 'Disability Inclusion Hub',
    tagline: 'Pusat pelatihan kerja digital untuk penyandang disabilitas.',
    description: 'Platform dan ruang fisik yang memfasilitasi pelatihan programming dan desain grafis khusus untuk penyandang disabilitas fisik.',
    innovatorId: 'u1',
    category: ProjectCategory.SOCIAL,
    status: ProjectStatus.ACTIVE,
    targetFunding: 60000000,
    currentFunding: 42000000,
    imageUrl: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
    donorsCount: 112,
    volunteersCount: 6,
    requirements: [
      { id: 's18', name: 'UI/UX Mentor', totalSlots: 3, filledSlots: 2 },
      { id: 's19', name: 'Soft Skill Coach', totalSlots: 2, filledSlots: 1 }
    ]
  },
  {
    id: 'p8',
    title: 'Village Book-Bus',
    tagline: 'Perpustakaan keliling berbasis bus listrik dengan akses internet.',
    description: 'Menyediakan akses buku fisik dan digital ke pelosok desa yang belum memiliki perpustakaan maupun jaringan internet yang stabil.',
    innovatorId: 'u1',
    category: ProjectCategory.SOCIAL,
    status: ProjectStatus.ACTIVE,
    targetFunding: 200000000,
    currentFunding: 35000000,
    imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
    donorsCount: 45,
    volunteersCount: 3,
    requirements: [
      { id: 's20', name: 'Librarian', totalSlots: 2, filledSlots: 1 },
      { id: 's21', name: 'Solar Technician', totalSlots: 1, filledSlots: 1 }
    ]
  },
  {
    id: 'p9',
    title: 'FoodRescue App',
    tagline: 'Menghubungkan restoran dengan bank makanan untuk cegah sampah.',
    description: 'Aplikasi logistik real-time yang menjemput sisa makanan layak konsumsi dari hotel/restoran untuk dibagikan ke komunitas pra-sejahtera.',
    innovatorId: 'u1',
    category: ProjectCategory.SOCIAL,
    status: ProjectStatus.ACTIVE,
    targetFunding: 40000000,
    currentFunding: 12000000,
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
    donorsCount: 28,
    volunteersCount: 8,
    requirements: [
      { id: 's22', name: 'Logistics Manager', totalSlots: 2, filledSlots: 2 },
      { id: 's23', name: 'React Native Dev', totalSlots: 1, filledSlots: 0 }
    ]
  },

  // EDUCATION CATEGORY
  {
    id: 'p10',
    title: 'EduVR Chemistry Lab',
    tagline: 'Laboratorium kimia virtual untuk sekolah tanpa fasilitas lab.',
    description: 'Aplikasi VR yang memungkinkan siswa melakukan simulasi reaksi kimia berbahaya secara aman dan interaktif tanpa biaya bahan kimia.',
    innovatorId: 'u1',
    category: ProjectCategory.EDUCATION,
    status: ProjectStatus.ACTIVE,
    targetFunding: 80000000,
    currentFunding: 55000000,
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
    donorsCount: 94,
    volunteersCount: 4,
    requirements: [
      { id: 's24', name: 'Unity/C# Developer', totalSlots: 2, filledSlots: 1 },
      { id: 's25', name: 'Chemistry Teacher', totalSlots: 1, filledSlots: 1 }
    ]
  },
  {
    id: 'p11',
    title: 'SignLang AI Tutor',
    tagline: 'Asisten belajar bahasa isyarat berbasis computer vision.',
    description: 'Aplikasi mobile yang mendeteksi gerakan tangan siswa secara real-time dan memberikan koreksi langsung untuk belajar bahasa isyarat.',
    innovatorId: 'u1',
    category: ProjectCategory.EDUCATION,
    status: ProjectStatus.ACTIVE,
    targetFunding: 65000000,
    currentFunding: 10000000,
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
    donorsCount: 15,
    volunteersCount: 2,
    requirements: [
      { id: 's26', name: 'ML Engineer', totalSlots: 2, filledSlots: 0 },
      { id: 's27', name: 'ASL Specialist', totalSlots: 1, filledSlots: 1 }
    ]
  },
  {
    id: 'p12',
    title: 'Rural STEM Box',
    tagline: 'Kit eksperimen sains bulanan untuk anak-anak di pedesaan.',
    description: 'Pengiriman kotak eksperimen DIY setiap bulan untuk memantik minat sains pada anak-anak yang memiliki akses pendidikan terbatas.',
    innovatorId: 'u1',
    category: ProjectCategory.EDUCATION,
    status: ProjectStatus.ACTIVE,
    targetFunding: 30000000,
    currentFunding: 28000000,
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
    donorsCount: 210,
    volunteersCount: 10,
    requirements: [
      { id: 's28', name: 'Content Creator', totalSlots: 2, filledSlots: 2 },
      { id: 's29', name: 'Operations', totalSlots: 3, filledSlots: 3 }
    ]
  },

  // HEALTH CATEGORY
  {
    id: 'p13',
    title: 'TeleMed Kiosk',
    tagline: 'Bilik konsultasi medis mandiri untuk area pasar tradisional.',
    description: 'Kios kesehatan yang dilengkapi alat cek tensi, gula darah, dan layar telekonsultasi dengan dokter umum secara langsung.',
    innovatorId: 'u1',
    category: ProjectCategory.HEALTH,
    status: ProjectStatus.ACTIVE,
    targetFunding: 180000000,
    currentFunding: 120000000,
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
    donorsCount: 77,
    volunteersCount: 4,
    requirements: [
      { id: 's30', name: 'Embedded Systems', totalSlots: 1, filledSlots: 0 },
      { id: 's31', name: 'General Practitioner', totalSlots: 5, filledSlots: 3 }
    ]
  },
  {
    id: 'p14',
    title: 'SmartInsulin Patch',
    tagline: 'Patch insulin cerdas tanpa jarum bertenaga biosensor.',
    description: 'Pengembangan teknologi patch kulit yang melepaskan insulin secara otomatis berdasarkan kadar glukosa dalam keringat.',
    innovatorId: 'u1',
    category: ProjectCategory.HEALTH,
    status: ProjectStatus.ACTIVE,
    targetFunding: 450000000,
    currentFunding: 30000000,
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
    donorsCount: 18,
    volunteersCount: 2,
    requirements: [
      { id: 's32', name: 'Biomedical Engineer', totalSlots: 2, filledSlots: 1 },
      { id: 's33', name: 'FDA Compliance Expert', totalSlots: 1, filledSlots: 0 }
    ]
  },
  {
    id: 'p15',
    title: 'AeroMask Filter+',
    tagline: 'Masker anti-polusi dengan filter graphene yang dapat dicuci.',
    description: 'Inovasi masker menggunakan lapisan graphene untuk menyaring partikel PM2.5 secara efektif namun tetap sangat nyaman untuk bernafas.',
    innovatorId: 'u1',
    category: ProjectCategory.HEALTH,
    status: ProjectStatus.ACTIVE,
    targetFunding: 50000000,
    currentFunding: 48000000,
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
    donorsCount: 312,
    volunteersCount: 5,
    requirements: [
      { id: 's34', name: 'Product Designer', totalSlots: 1, filledSlots: 1 },
      { id: 's35', name: 'Marketing Specialist', totalSlots: 2, filledSlots: 2 }
    ]
  }
];
