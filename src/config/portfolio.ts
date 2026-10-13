// ============================================================================
// PORTFOLIO CONFIGURATION — Choyon Nath
// ============================================================================
// This is the single source of truth for all editable content.
// Update values here and they will reflect across the entire site.
// ============================================================================

export const profile = {
  name: 'Choyon Nath',
  roles: ['SEO Expert', 'Web Developer', 'Graphic Designer'],
  // A short, professional introduction shown in the hero and about sections.
  tagline:
    'Helping brands grow online through search visibility, modern web experiences, and compelling visual design.',
  // Longer bio for the About section. Keep it professional and editable.
  about:
    'I work at the intersection of SEO, web development, and graphic design — combining technical know-how with creative thinking to help businesses establish a strong, cohesive digital presence. My focus is on building fast, accessible websites that rank well and look great.',
  // Replace this path only when providing a newer local profile image.
  profileImage: '/FB_IMG_1791894269594 copy.jpg',
  // Set this to a real email address to enable the contact form and email link.
  // Leave as empty string to keep email-dependent features hidden.
  email: 'choyonxyz@gmail.com',
  // Canonical URL — update after you choose a custom domain.
  // Leave empty to use a relative canonical link.
  canonicalUrl: '',
};

export const social = {
  facebook: 'https://www.facebook.com/share/1K8U8gi25g/',
  // Add more social links when ready. Empty strings keep the icon hidden.
  github: '',
  linkedin: '',
  twitter: '',
  instagram: '',
};

export type ServiceItem = {
  title: string;
  description: string;
};

export type ServiceCategory = {
  id: string;
  title: string;
  icon: 'search' | 'code' | 'palette';
  tagline: string;
  items: ServiceItem[];
};

export const services: ServiceCategory[] = [
  {
    id: 'seo',
    title: 'SEO Services',
    icon: 'search',
    tagline: 'Improve search visibility and drive organic growth.',
    items: [
      {
        title: 'Keyword Research',
        description:
          'Identify high-value keywords and build a data-driven content roadmap.',
      },
      {
        title: 'On-Page SEO',
        description:
          'Optimize titles, meta tags, headings, and content structure for relevance.',
      },
      {
        title: 'Technical SEO',
        description:
          'Fix crawlability, site speed, structured data, and mobile issues.',
      },
    ],
  },
  {
    id: 'web',
    title: 'Web Development',
    icon: 'code',
    tagline: 'Fast, modern, responsive websites built to convert.',
    items: [
      {
        title: 'Responsive Website Development',
        description:
          'Sites that look and work flawlessly across every screen size.',
      },
      {
        title: 'Modern Frontend Development',
        description:
          'Clean, maintainable interfaces using React, TypeScript, and modern tooling.',
      },
      {
        title: 'Website Performance Optimization',
        description:
          'Reduce load times, improve Core Web Vitals, and deliver a snappy experience.',
      },
    ],
  },
  {
    id: 'design',
    title: 'Graphic Design',
    icon: 'palette',
    tagline: 'Visual identity that makes your brand memorable.',
    items: [
      {
        title: 'Social Media Design',
        description:
          'Scroll-stopping post designs, covers, and story templates.',
      },
      {
        title: 'Branding and Visual Design',
        description:
          'Logos, color systems, and brand guidelines that tell your story.',
      },
      {
        title: 'Creative Digital Assets',
        description:
          'Banners, flyers, and marketing collateral for any campaign.',
      },
    ],
  },
];

export type Skill = {
  name: string;
  // Placeholder proficiency — update with your real skill levels (0–100).
  level: number;
  category: 'SEO' | 'Web Development' | 'Design';
};

export const skills: Skill[] = [
  { name: 'Keyword Research', level: 75, category: 'SEO' },
  { name: 'On-Page SEO', level: 70, category: 'SEO' },
  { name: 'Technical SEO', level: 65, category: 'SEO' },
  { name: 'Google Analytics', level: 60, category: 'SEO' },
  { name: 'HTML & CSS', level: 78, category: 'Web Development' },
  { name: 'JavaScript', level: 68, category: 'Web Development' },
  { name: 'React', level: 65, category: 'Web Development' },
  { name: 'Responsive Design', level: 80, category: 'Web Development' },
  { name: 'Adobe Photoshop', level: 72, category: 'Design' },
  { name: 'Adobe Illustrator', level: 68, category: 'Design' },
  { name: 'Logo Design', level: 70, category: 'Design' },
  { name: 'Social Media Design', level: 75, category: 'Design' },
];

export type Project = {
  id: string;
  title: string;
  category: 'SEO' | 'Web Development' | 'Graphic Design';
  description: string;
  image: string;
  technologies: string[];
  url: string;
  isDemo: boolean;
};

export const projects: Project[] = [
  {
    id: 'demo-1',
    title: 'Demo — E-Commerce SEO Audit',
    category: 'SEO',
    description:
      'A sample SEO audit project showing keyword analysis, technical fixes, and on-page recommendations for an e-commerce site.',
    image: '/projects/demo-seo.svg',
    technologies: ['SEO Audit', 'Keyword Research', 'Technical SEO'],
    url: '#',
    isDemo: true,
  },
  {
    id: 'demo-2',
    title: 'Demo — Portfolio Website Build',
    category: 'Web Development',
    description:
      'A sample web development project demonstrating a responsive, animated portfolio built with React and TypeScript.',
    image: '/projects/demo-web.svg',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    url: '#',
    isDemo: true,
  },
  {
    id: 'demo-3',
    title: 'Demo — Social Media Campaign Kit',
    category: 'Graphic Design',
    description:
      'A sample graphic design project featuring social media post templates, story covers, and a cohesive brand color system.',
    image: '/projects/demo-design.svg',
    technologies: ['Photoshop', 'Illustrator', 'Branding'],
    url: '#',
    isDemo: true,
  },
  {
    id: 'demo-4',
    title: 'Demo — Local Business SEO Strategy',
    category: 'SEO',
    description:
      'A sample local SEO project with Google Business Profile optimization, local keyword targeting, and citation building.',
    image: '/projects/demo-local-seo.svg',
    technologies: ['Local SEO', 'GBP', 'Citations'],
    url: '#',
    isDemo: true,
  },
  {
    id: 'demo-5',
    title: 'Demo — Landing Page for SaaS',
    category: 'Web Development',
    description:
      'A sample landing page project with performance optimization, A/B-ready sections, and a clean conversion-focused layout.',
    image: '/projects/demo-landing.svg',
    technologies: ['React', 'Vite', 'Performance'],
    url: '#',
    isDemo: true,
  },
  {
    id: 'demo-6',
    title: 'Demo — Brand Identity Package',
    category: 'Graphic Design',
    description:
      'A sample branding project including logo concepts, color palette, typography system, and business card design.',
    image: '/projects/demo-branding.svg',
    technologies: ['Illustrator', 'Logo Design', 'Brand Guidelines'],
    url: '#',
    isDemo: true,
  },
];

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];
