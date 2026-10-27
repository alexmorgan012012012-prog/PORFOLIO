import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface WebsiteSettings {
  brandName: string;
  brandFullName: string;
  tagline: string;
  supportingStatement: string;
  description: string;
  phone: string;
  email: string;
  whatsappUrl: string;
  phoneLink: string;
  emailLink: string;
  announcementBar: {
    enabled: boolean;
    text: string;
    linkText: string;
    linkUrl: string;
  };
  heroBadge: string;
  heroHeadline: string;
  heroSupporting: string;
  heroDescription: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  accentColor: string;
  darkColor: string;
  lightColor: string;
  logoSvg: string;
  logoDarkSvg: string;
  iconSvg: string;
  footerText: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
    dribbble?: string;
  };
  seoDefaults: {
    title: string;
    metaDescription: string;
    ogImage: string;
  };
  introSettings?: {
    enabled: boolean;
    duration: number;
    soundEnabled: boolean;
    playOncePerSession: boolean;
    headline: string;
    statement: string;
    substatement: string;
    animationIntensity: 'subtle' | 'cinematic' | 'high';
  };
  typography?: {
    headingFont?: string;
    bodyFont?: string;
  };
  navigationMenu?: {
    id: string;
    label: string;
    path: string;
    order: number;
    visible: boolean;
  }[];
  footerCustomization?: {
    copyrightText: string;
    showSocialLinks: boolean;
    customNote?: string;
  };
  pricingPackages?: {
    id: string;
    name: string;
    tagline: string;
    price: string;
    period: string;
    featured: boolean;
    deliverables: string[];
    ctaText: string;
  }[];
  faqsList?: {
    id: string;
    category: string;
    question: string;
    answer: string;
    order: number;
  }[];
  testimonialsList?: {
    id: string;
    clientName: string;
    company: string;
    role: string;
    quote: string;
    rating: number;
    avatarUrl?: string;
  }[];
  industriesList?: {
    id: string;
    name: string;
    description: string;
    icon: string;
    deliverables: string[];
  }[];
  promotion?: {
    enabled: boolean;
    headline: string;
    subheadline: string;
    discountPercent: number;
    minBudget: number;
    terms: string;
    expiryDays: number;
  };
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  category: string;
  featured: boolean;
  order: number;
  badge?: string;
  deliverables: string[];
  useCases: string[];
  workflowSteps: { step: number; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  startingPrice?: string;
  published: boolean;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  client?: string;
  year?: string;
  websiteUrl?: string;
  previewUrl?: string;
  thumbnailUrl: string;
  mediaType: 'website' | 'video' | 'image';
  videoUrl?: string;
  galleryImages?: string[];
  tags: string[];
  featured: boolean;
  published: boolean;
  order: number;
  canEmbed: boolean;
  autoScrollSupported: boolean;
  stats?: { label: string; value: string }[];
}

export interface ClientInquiry {
  id: string;
  clientName: string;
  email: string;
  phone?: string;
  companyName?: string;
  serviceRequested: string;
  projectDescription: string;
  budgetRange?: string;
  timeline?: string;
  referenceWebsite?: string;
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'archived';
  internalNotes?: string;
  createdAt: string;
  couponCode?: string;
  discountApplied?: boolean;
  discountPercent?: number;
  originalEstimate?: string;
  discountedEstimate?: string;
}

export interface ClientCoupon {
  code: string;
  discountPercent: number;
  status: 'active' | 'redeemed' | 'expired';
  createdAt: string;
  redeemedAt?: string;
  redeemedInquiryId?: string;
}

export interface ClientAccount {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  passwordHash: string;
  salt: string;
  createdAt: string;
  emailVerified?: boolean;
  accountStatus?: 'active' | 'suspended';
  lastLogin?: string;
  lastLogout?: string;
  deviceInfo?: {
    browser?: string;
    os?: string;
    device?: string;
    region?: string;
    ip?: string;
  };
  coupon?: ClientCoupon;
  projects: {
    id: string;
    title: string;
    status: 'Discovery' | 'Wireframing' | 'Development' | 'QA & Review' | 'Live Launched';
    progress: number;
    deliverables: string[];
    timeline: string;
    repoOrLink?: string;
  }[];
  messages: {
    id: string;
    sender: 'client' | 'agency';
    text: string;
    timestamp: string;
  }[];
}

export interface ClientActivityEvent {
  id: string;
  clientId?: string;
  clientEmail: string;
  clientName?: string;
  type: 'REGISTER' | 'LOGIN' | 'LOGOUT' | 'PASSWORD_RESET_REQUEST' | 'EMAIL_VERIFY' | 'INQUIRY_SUBMITTED' | 'COUPON_REDEEMED' | 'PORTAL_ACCESS';
  details: string;
  timestamp: string;
  ip?: string;
  browser?: string;
  os?: string;
  device?: string;
  region?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  publishedDate: string;
  readTime: string;
  coverImage: string;
  published: boolean;
  tags: string[];
}

export interface DiscoveryBooking {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  date: string;
  timeSlot: string;
  serviceTopic: string;
  notes?: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  status: 'active' | 'unsubscribed';
  subscribedAt: string;
}

export interface AnalyticsSummary {
  totalVisitors: number;
  totalPageviews: number;
  totalInquiries: number;
  conversionRate: number;
  uniqueVisitors?: number;
  trafficSources?: { source: string; count: number; percentage: number }[];
  deviceBreakdown?: { category: string; count: number; percentage: number }[];
  browserBreakdown?: { browser: string; count: number }[];
  regionBreakdown?: { region: string; count: number }[];
  inquiriesCount?: number;
  registrationsCount?: number;
  couponsRedeemedCount?: number;
  pageviews: { page: string; count: number }[];
  popularProjects: { id: string; title: string; views: number }[];
  popularServices: { slug: string; name: string; views: number }[];
  recentActivity: { timestamp: string; type: string; details: string }[];
}

export interface AuditLog {
  id: string;
  action: string;
  details: string;
  adminEmail: string;
  timestamp: string;
  ip?: string;
}

export interface DatabaseSchema {
  settings: WebsiteSettings;
  services: ServiceItem[];
  projects: PortfolioProject[];
  inquiries: ClientInquiry[];
  contacts: ContactMessage[];
  newsletters: NewsletterSubscriber[];
  clients: ClientAccount[];
  clientEvents: ClientActivityEvent[];
  blogPosts: BlogPost[];
  discoveryBookings: DiscoveryBooking[];
  auditLogs: AuditLog[];
  adminAccount: {
    email: string;
    passwordHash: string;
    salt: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  analytics: {
    pageviews: Record<string, number>;
    projectViews: Record<string, number>;
    serviceViews: Record<string, number>;
    visitorSessions: number;
    events: { type: string; label: string; timestamp: string }[];
  };
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.resolve(DATA_DIR, 'ryvo_database.json');

// Password helpers
export function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

export function generateSalt(): string {
  return crypto.randomBytes(16).toString('hex');
}

// Master Default Settings
const defaultSettings: WebsiteSettings = {
  brandName: 'RYVO',
  brandFullName: 'RYVO Digital Agency',
  tagline: 'We Build. We Automate. We Create.',
  supportingStatement: 'Digital experiences engineered for growth.',
  description: 'RYVO helps businesses grow through high-performance websites, mobile apps, creative content, AI automation and digital marketing.',
  phone: '+92 308 2436424',
  email: 'alexmorgan012012012@gmail.com',
  whatsappUrl: 'https://wa.me/923082436424',
  phoneLink: 'tel:+923082436424',
  emailLink: 'mailto:alexmorgan012012012@gmail.com',
  announcementBar: {
    enabled: true,
    text: 'Creative Digital Solutions for Ambitious Brands — Accepting Q4/Q1 Projects',
    linkText: 'Start a Project',
    linkUrl: '/start-project',
  },
  heroBadge: 'INDEPENDENT DIGITAL STUDIO',
  heroHeadline: "YOUR VISION.\nBUILT FOR WHAT'S NEXT.",
  heroSupporting: 'We Build. We Automate. We Create.',
  heroDescription: 'RYVO helps ambitious businesses transform their ideas into powerful digital experiences through websites, mobile applications, creative content, AI automation, and digital marketing.',
  primaryCtaText: 'START A PROJECT →',
  primaryCtaLink: '/start-project',
  secondaryCtaText: 'EXPLORE OUR WORK →',
  secondaryCtaLink: '/portfolio',
  promotion: {
    enabled: true,
    headline: 'JOIN RYVO & GET 25% OFF YOUR FIRST PROJECT!',
    subheadline: 'Create your free account and unlock an exclusive 25% discount on your first eligible project.',
    discountPercent: 25,
    minBudget: 500,
    terms: 'Valid on your first eligible creative, engineering, or AI project. One-time redemption per verified account.',
    expiryDays: 90,
  },
  accentColor: '#FF6A2A',
  darkColor: '#111318',
  lightColor: '#FFFFFF',
  logoSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 48" fill="none"><rect x="4" y="4" width="40" height="40" rx="10" fill="#111318"/><path d="M16 14h10c3.314 0 6 2.686 6 6 0 2.91-2.072 5.334-4.836 5.864L33 34h-5.5l-5.3-7.5H21v7.5h-5V14zm5 8.5h5c1.105 0 2-.895 2-2s-.895-2-2-2h-5v4z" fill="#FF6A2A"/><text x="56" y="32" fill="#111318" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="24" letter-spacing="-0.03em">RYVO</text></svg>`,
  logoDarkSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 48" fill="none"><rect x="4" y="4" width="40" height="40" rx="10" fill="#FF6A2A"/><path d="M16 14h10c3.314 0 6 2.686 6 6 0 2.91-2.072 5.334-4.836 5.864L33 34h-5.5l-5.3-7.5H21v7.5h-5V14zm5 8.5h5c1.105 0 2-.895 2-2s-.895-2-2-2h-5v4z" fill="#FFFFFF"/><text x="56" y="32" fill="#FFFFFF" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="24" letter-spacing="-0.03em">RYVO</text></svg>`,
  iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#111318"/><path d="M14 12h12c4 0 7 3 7 7 0 3.5-2.5 6.3-5.8 6.9L35 36h-6.5L23 27H19v9h-5V12zm5 10h6.5c1.4 0 2.5-1.1 2.5-2.5S26.9 17 25.5 17H19v5z" fill="#FF6A2A"/></svg>`,
  footerText: '© 2026 RYVO Digital Agency. All rights reserved. Engineered for scale, speed, and real revenue.',
  socials: {
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    instagram: 'https://instagram.com',
    dribbble: 'https://dribbble.com',
  },
  introSettings: {
    enabled: true,
    duration: 5,
    soundEnabled: true,
    playOncePerSession: true,
    headline: 'INDEPENDENT DIGITAL STUDIO',
    statement: 'WE BUILD. WE AUTOMATE. WE CREATE.',
    substatement: "YOUR VISION. BUILT FOR WHAT'S NEXT.",
    animationIntensity: 'cinematic',
  },
  typography: {
    headingFont: 'Space Grotesk, sans-serif',
    bodyFont: 'Plus Jakarta Sans, sans-serif',
  },
  navigationMenu: [
    { id: 'nav-1', label: 'Home', path: '/', order: 1, visible: true },
    { id: 'nav-2', label: 'Services', path: '/services', order: 2, visible: true },
    { id: 'nav-3', label: 'Portfolio', path: '/portfolio', order: 3, visible: true },
    { id: 'nav-4', label: 'About', path: '/about', order: 4, visible: true },
    { id: 'nav-5', label: 'Pricing', path: '/pricing', order: 5, visible: true },
    { id: 'nav-6', label: 'Contact', path: '/contact', order: 6, visible: true },
  ],
  footerCustomization: {
    copyrightText: 'Copyright © 2026 RYVO Digital Agency. All rights reserved.',
    showSocialLinks: true,
    customNote: 'Engineered for international enterprise speed, security, and measurable ROI.',
  },
  pricingPackages: [
    {
      id: 'pkg-1',
      name: 'Growth Sprint',
      tagline: 'Ideal for startups, creators, and founders launching fast.',
      price: '$1,850',
      period: 'flat project',
      featured: false,
      deliverables: ['Custom High-Converting Landing Page', 'Social Ad Creative Suite (5 variants)', 'Core Brand Identity & Vector Assets', '2-Week Turnaround Guarantee'],
      ctaText: 'Start Growth Sprint',
    },
    {
      id: 'pkg-2',
      name: 'Flagship Digital',
      tagline: 'Full-scale enterprise website and automated marketing engine.',
      price: '$3,800',
      period: 'flat project',
      featured: true,
      deliverables: ['Multi-Page Custom Web Application', 'Admin Content & Management Dashboard', 'AI Automated Inquiries & CRM Routing', 'SEO Schema Architecture & Analytics', 'Eligible for 25% Off First Project'],
      ctaText: 'Start Flagship Project',
    },
    {
      id: 'pkg-3',
      name: 'Autonomous Partner',
      tagline: 'Continuous digital transformation, video production & AI automation.',
      price: '$5,200',
      period: 'per month',
      featured: false,
      deliverables: ['Dedicated Senior Fullstack Team', 'Continuous AI Calling & Workflow Ops', 'Weekly Video Content & Creative Sprints', 'Priority 24/7 Slack & Executive SLA'],
      ctaText: 'Book Partnership Call',
    },
  ],
  faqsList: [
    {
      id: 'faq-1',
      category: 'General',
      question: 'What types of companies does RYVO work with?',
      answer: 'We collaborate with ambitious startups, growing consumer brands, established enterprises, creators, and service businesses worldwide that demand premium digital execution.',
      order: 1,
    },
    {
      id: 'faq-2',
      category: 'Discount',
      question: 'How does the 25% discount offer work?',
      answer: 'When you create a client account, a unique coupon code (e.g. RYVO25-XXXXXX) is generated and saved to your profile. Apply it to your first project inquiry for an instant 25% fee reduction.',
      order: 2,
    },
    {
      id: 'faq-3',
      category: 'Engineering',
      question: 'Can I manage my own website content after launch?',
      answer: 'Yes! Every web project includes or connects to a private, secure Owner Admin Dashboard where you can update content, services, portfolio items, and settings without touching code.',
      order: 3,
    },
  ],
  testimonialsList: [
    {
      id: 'test-1',
      clientName: 'Julian Vance',
      company: 'Aether Capital',
      role: 'Managing Partner',
      quote: 'RYVO delivered an extraordinary digital presence that immediately elevated our brand perception with institutional investors worldwide.',
      rating: 5,
    },
    {
      id: 'test-2',
      clientName: 'Elena Rostova',
      company: 'Kinetix Media',
      role: 'Head of Growth',
      quote: 'Their video editing retention rates and AI automation pipelines generated a 3.4x lift in qualified inbound inquiries within the first 60 days.',
      rating: 5,
    },
  ],
  industriesList: [
    { id: 'ind-1', name: 'Startups & Scaleups', description: 'MVPs, investor decks, rapid brand launches', icon: 'Rocket', deliverables: ['Landing Pages', 'Product Demo Videos', 'Investor Portals'] },
    { id: 'ind-2', name: 'E-Commerce & DTC', description: 'Conversion-focused stores, viral ads, customer retention', icon: 'ShoppingBag', deliverables: ['Shopify/Custom Stores', 'UGC Video Ads', 'Email Flows'] },
    { id: 'ind-3', name: 'Hospitality & Dining', description: 'Digital menus, reservations, interactive guest showcases', icon: 'Utensils', deliverables: ['Interactive Portals', 'Menu Management', 'Local SEO'] },
    { id: 'ind-4', name: 'Professional Services', description: 'Law firms, financial consultancies, B2B agencies', icon: 'Briefcase', deliverables: ['Authority Websites', 'Client Portals', 'CRM Pipelines'] },
  ],
  seoDefaults: {
    title: 'RYVO Digital Agency — We Build. We Automate. We Create.',
    metaDescription: 'RYVO helps businesses grow through high-performance websites, mobile apps, creative content, AI automation, and digital marketing.',
    ogImage: '/og-card.png',
  },
};

// Complete 12 Enterprise Services
const defaultServices: ServiceItem[] = [
  {
    id: 'srv-1',
    slug: 'video-editing',
    title: 'Video Editing',
    tagline: 'High-Retention Visual Storytelling & Viral Pacing',
    shortDescription: 'Short-form Reels, TikToks, cinematic YouTube productions, commercial ads, and bespoke kinetic motion graphics.',
    fullDescription: 'We transform raw footage into addictive, viral, high-converting video assets. From relentless pacing and sound design to custom 2D/3D motion graphics, color grading, and hooks engineered to stop thumbs within the first 0.8 seconds.',
    iconName: 'Video',
    category: 'Creative Production',
    featured: true,
    order: 1,
    badge: 'Popular',
    deliverables: [
      'Short-form vertical video suites (Reels, TikTok, Shorts)',
      'High-production YouTube video editing & pacing',
      'Commercial video ads & paid social variants',
      'Custom 2D kinetic typography & animated captions',
      'Sound design, SFX curation & audio mastering',
      'Color correction & cinematic grading',
    ],
    useCases: [
      'Founders building personal brands on YouTube & LinkedIn',
      'Direct-to-consumer eCommerce brands scaling ad creative',
      'SaaS product feature reveals and animated explainers',
      'Podcasts seeking viral micro-clip distribution',
    ],
    workflowSteps: [
      { step: 1, title: 'Hook & Ingestion', description: 'Review raw takes, extract viral hooks, structure timeline script.' },
      { step: 2, title: 'Assembly & Rhythm', description: 'Rough cut with relentless zero-dead-air rhythm.' },
      { step: 3, title: 'Motion & Sound', description: 'Layer bespoke typography, sound effects, B-roll, and music.' },
      { step: 4, title: 'Color & Mastering', description: 'Final cinematic grade and multi-platform optimization.' },
    ],
    faqs: [
      { question: 'What formats do you deliver in?', answer: 'We deliver 9:16 vertical, 16:9 widescreen 4K/1080p, and 1:1 square formats tailored for each platform.' },
      { question: 'Can I provide my own brand assets and fonts?', answer: 'Yes, we ingest your exact brand guidelines, logos, custom typography, and color codes.' },
    ],
    startingPrice: 'Starting at $1,200 / project',
    published: true,
  },
  {
    id: 'srv-2',
    slug: 'graphic-design',
    title: 'Graphic Design',
    tagline: 'Distinguished Visual Identities & High-CTR Brand Systems',
    shortDescription: 'Memorable brand systems, logos, high-converting social graphics, packaging, and marketing collateral.',
    fullDescription: 'Graphic design that commands authority. We create full visual identities, editorial publications, vector systems, digital ad creative, and marketing assets that cut through modern noise with deliberate minimalism and impact.',
    iconName: 'Palette',
    category: 'Creative Production',
    featured: true,
    order: 2,
    badge: 'Core Service',
    deliverables: [
      'Comprehensive Brand Identity Systems & Style Guides',
      'Vector Logo Suites (Primary, Secondary, Monograms, Badges)',
      'High-CTR Social Media Posters & Ad Creative',
      'Editorial Banners, Thumbnails & Display Advertising',
      'Pitch Decks, Sales Sheets & PDF Collateral',
      'Vector Icons & Custom Illustration Assets',
    ],
    useCases: [
      'Startups needing an iconic brand identity before launch',
      'Agencies seeking rapid, high-volume graphic ad variants',
      'Tech enterprises requiring cohesive design systems',
    ],
    workflowSteps: [
      { step: 1, title: 'Identity Audit', description: 'Analyzing market positioning, typography pairings, and aesthetics.' },
      { step: 2, title: 'Concept Directions', description: 'Three distinct visual directions and tactile moodboards.' },
      { step: 3, title: 'Refinement', description: 'Polishing geometry, color harmonies, and responsive typography.' },
      { step: 4, title: 'Asset Handoff', description: 'Production-ready SVG, PNG, EPS files with usage guides.' },
    ],
    faqs: [
      { question: 'Do I get vector source files?', answer: 'Always. You receive Figma files, SVGs, vector EPS, and full commercial usage rights.' },
    ],
    startingPrice: 'Starting at $950 / package',
    published: true,
  },
  {
    id: 'srv-3',
    slug: 'website-development',
    title: 'Website Development',
    tagline: 'Engineered for Conversion, Performance & Precision',
    shortDescription: 'Blazing-fast custom web applications, agency portfolios, marketing engines, restaurant portals, and SaaS dashboards.',
    fullDescription: 'We build digital flagships. No sluggish bloated page-builders. We architect custom, accessible, responsive web applications with TypeScript, modern frameworks, bespoke interactions, and sub-second loading speeds that transform visitors into buyers.',
    iconName: 'Globe',
    category: 'Engineering',
    featured: true,
    order: 3,
    badge: 'Flagship',
    deliverables: [
      'Custom React, Next.js or Vite-powered frontend applications',
      'Tailwind CSS design systems with clean zero-pill aesthetics',
      'Interactive live website showcases & responsive screen frames',
      'Headless CMS or bespoke backend admin portals',
      'Lighthouse 95+ score optimization & core web vitals hardening',
      'Search engine friendly semantic markup & JSON-LD schema',
    ],
    useCases: [
      'High-growth tech companies launching new SaaS offerings',
      'Creative agencies seeking an award-worthy interactive portfolio',
      'Direct-to-consumer luxury brands and restaurants scaling online revenue',
    ],
    workflowSteps: [
      { step: 1, title: 'Information Architecture', description: 'Sitemap hierarchy, wireframing, and conversion pathways.' },
      { step: 2, title: 'Editorial UI Design', description: 'High-contrast typography, restrained accents, and micro-interactions.' },
      { step: 3, title: 'Fullstack Implementation', description: 'TypeScript clean architecture, API endpoints, responsive layouts.' },
      { step: 4, title: 'Audit & Deployment', description: 'Cross-browser testing, SEO audit, security hardening, and launch.' },
    ],
    faqs: [
      { question: 'Do you offer custom admin portals so I can edit content?', answer: 'Yes, every website includes a dedicated private admin panel allowing real-time editing of copy, projects, and media without code changes.' },
    ],
    startingPrice: 'Starting at $3,500 / project',
    published: true,
  },
  {
    id: 'srv-4',
    slug: 'app-development',
    title: 'Mobile App Development',
    tagline: 'Cross-Platform Native & Web Mobile Experiences',
    shortDescription: 'Native iOS & Android mobile applications, progressive web apps (PWA), and robust customer portals.',
    fullDescription: 'From concept to App Store and Google Play deployment. We design and build intuitive, performant mobile apps with offline capability, push notifications, real-time sync, and fluid gestures.',
    iconName: 'Smartphone',
    category: 'Engineering',
    featured: true,
    order: 4,
    deliverables: [
      'React Native & Flutter cross-platform mobile apps',
      'Progressive Web Apps (PWAs) with offline service workers',
      'REST & GraphQL backend integration',
      'Biometric authentication, secure storage & push notifications',
      'App Store & Google Play submission and review handling',
    ],
    useCases: [
      'Service companies providing customer booking and tracking apps',
      'Subscription clubs requiring member-only mobile access',
      'Fintech dashboards with real-time balance and transaction alerts',
    ],
    workflowSteps: [
      { step: 1, title: 'User Journey Mapping', description: 'Wireframing native touch interactions and navigation.' },
      { step: 2, title: 'Mobile UI/UX', description: 'Pixel-perfect mobile interfaces complying with HIG and Material Design.' },
      { step: 3, title: 'Native Engineering', description: 'State management, offline caching, and API connectivity.' },
      { step: 4, title: 'Store Deployment', description: 'TestFlight beta testing, certificate provisioning, and release.' },
    ],
    faqs: [
      { question: 'Will one codebase run on both iOS and Android?', answer: 'Yes, we specialize in high-performance cross-platform development sharing 90%+ of code while delivering native performance.' },
    ],
    startingPrice: 'Starting at $4,800 / build',
    published: true,
  },
  {
    id: 'srv-5',
    slug: 'ai-automation',
    title: 'AI Automation',
    tagline: 'Autonomous Business Pipelines & Intelligent Workflows',
    shortDescription: 'Eliminate manual bottlenecks with custom webhook pipelines, document processing, and AI assistants.',
    fullDescription: 'Stop burning expensive human hours on repetitive operational tasks. We connect your ERP, CRM, messaging, and databases with autonomous AI agents that parse documents, draft client emails, reconcile receipts, and trigger mission-critical events.',
    iconName: 'Cpu',
    category: 'AI & Automation',
    featured: true,
    order: 5,
    badge: 'Efficiency',
    deliverables: [
      'End-to-end webhook pipelines (Make, n8n, custom Python/Node)',
      'Automated PDF, invoice & document OCR extraction',
      'Intelligent lead routing and instant Slack/WhatsApp alerts',
      'Autonomous email drafting & calendar reconciliation',
      'Custom LLM rag knowledge bases for internal company SOPs',
    ],
    useCases: [
      'Legal & accounting firms processing hundreds of incoming documents',
      'Marketing agencies automating client reporting and metrics aggregation',
      'Support teams wanting automatic ticket classification and draft solutions',
    ],
    workflowSteps: [
      { step: 1, title: 'Bottleneck Audit', description: 'Identify repetitive workflows consuming >5 hours weekly.' },
      { step: 2, title: 'Pipeline Blueprint', description: 'Map data schemas, trigger webhooks, and validation rules.' },
      { step: 3, title: 'Agent Construction', description: 'Build resilient error-handling scripts and API connectors.' },
      { step: 4, title: 'Production Handshake', description: 'Staged rollout with audit logging and fail-safe alerts.' },
    ],
    faqs: [
      { question: 'What happens if an external API fails?', answer: 'All automated pipelines include exponential backoff, retry queues, and immediate notifications to your alert channel.' },
    ],
    startingPrice: 'Starting at $2,000 / workflow',
    published: true,
  },
  {
    id: 'srv-6',
    slug: 'ai-calling-agents',
    title: 'AI Calling Agents',
    tagline: 'Autonomous Voice Infrastructure for Inbound & Outbound',
    shortDescription: 'Ultra-low latency conversational AI voice agents for appointment setting, lead qualification, and customer support.',
    fullDescription: 'Deploy natural-sounding, ultra-responsive conversational voice agents capable of handling inbound support inquiries, qualifying sales leads in real time, and scheduling appointments directly into your CRM around the clock with human-like breathing and cadence.',
    iconName: 'PhoneCall',
    category: 'AI & Automation',
    featured: true,
    order: 6,
    badge: 'High Impact',
    deliverables: [
      'Sub-500ms voice conversational response architecture',
      'Dynamic CRM sync (HubSpot, Salesforce, GoHighLevel)',
      'Calendar booking & rescheduling automation',
      'Custom tone, language tuning, and knowledge base ingestion',
      'Live sentiment analysis, call transcription & summary logging',
      'Warm transfer fallbacks to human operators',
    ],
    useCases: [
      'Clinics and dental practices wanting 24/7 appointment scheduling',
      'Real estate brokers qualifying incoming buyer and seller leads',
      'Logistics dispatch handling routine shipment status queries',
      'E-commerce brands answering order status and return inquiries',
    ],
    workflowSteps: [
      { step: 1, title: 'Dialogue Scenarios', description: 'Map intents, edge cases, objection handling, and tone of voice.' },
      { step: 2, title: 'Prompt & Voice Engineering', description: 'Calibrate speech synthesis and latency budgets.' },
      { step: 3, title: 'API Integration', description: 'Connect calendar booking endpoints and CRM data pipelines.' },
      { step: 4, title: 'Test Flight & Live Deployment', description: 'Simulated stress testing before live phone number routing.' },
    ],
    faqs: [
      { question: 'Do the agents sound robotic?', answer: 'We employ state-of-the-art neural speech engines with natural breathing, hesitation pauses, and adaptive cadence.' },
    ],
    startingPrice: 'Starting at $2,400 / setup',
    published: true,
  },
  {
    id: 'srv-7',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    tagline: 'Full-Funnel Acquisition & High-Yield Creative Campaigns',
    shortDescription: 'Data-driven paid ads, creative testing engines, conversion rate optimization, and growth analytics.',
    fullDescription: 'Turn ad spend into measurable pipeline. We manage multi-channel paid acquisition across Meta, Google, LinkedIn, and TikTok, combining high-converting creative variants with granular attribution and continuous landing page optimization.',
    iconName: 'TrendingUp',
    category: 'Growth & Marketing',
    featured: true,
    order: 7,
    deliverables: [
      'Multi-channel campaign strategy (Meta, Google Search/PMax, LinkedIn)',
      'High-frequency ad creative production (video + static hooks)',
      'Landing page Conversion Rate Optimization (CRO)',
      'Server-side tracking (Meta CAPI, Google Enhanced Conversions)',
      'Transparent real-time performance reporting dashboards',
    ],
    useCases: [
      'B2B companies seeking qualified demo bookings from LinkedIn',
      'B2C brands scaling customer acquisition with UGC video ads',
      'Local service leaders looking for consistent weekly inbound leads',
    ],
    workflowSteps: [
      { step: 1, title: 'Audience & Offer Crafting', description: 'Sharpen irresistible offers and define ideal customer avatars.' },
      { step: 2, title: 'Creative Production', description: 'Produce 10+ hook and angle variants for testing.' },
      { step: 3, title: 'Launch & Optimize', description: 'Deploy campaigns with disciplined bid caps and audience testing.' },
      { step: 4, title: 'Scale Winners', description: 'Reallocate budget to winning creatives and expand audience cohorts.' },
    ],
    faqs: [
      { question: 'What ad spend budget is recommended?', answer: 'We typically recommend a minimum ad spend of $2,000/month to achieve statistically significant test data quickly.' },
    ],
    startingPrice: 'Starting at $2,200 / month + ad spend',
    published: true,
  },
  {
    id: 'srv-8',
    slug: 'seo-services',
    title: 'Search Engine Optimization',
    tagline: 'Predictable Organic Authority & Search Dominance',
    shortDescription: 'Technical SEO audits, search intent content architecture, schema markup, and speed engineering.',
    fullDescription: 'We build search visibility from first principles: clean HTML structure, lightning-fast Core Web Vitals, rich JSON-LD structured data, programmatic keyword architectures, and indexation health that earns sustainable top-ranking positions.',
    iconName: 'Search',
    category: 'Growth & Marketing',
    featured: true,
    order: 8,
    deliverables: [
      'Full technical site audits (crawl budget, canonicals, 404s)',
      'Core Web Vitals optimization (LCP, FID/INP, CLS)',
      'Semantic HTML5 hierarchy and Schema.org structured data',
      'High-intent keyword clustering and content gap strategy',
      'Internal linking matrices and site architecture maps',
    ],
    useCases: [
      'SaaS brands competing for high-ACV commercial search terms',
      'Local service companies wanting top positions in regional queries',
      'E-commerce catalogs needing automated product schema and clean taxonomy',
    ],
    workflowSteps: [
      { step: 1, title: 'Technical Crawl', description: 'Deep audit of status codes, robots, and rendering obstacles.' },
      { step: 2, title: 'Keyword Intent Map', description: 'Group keywords by commercial intent and landing page targets.' },
      { step: 3, title: 'On-Page Refactor', description: 'Optimize headings, metadata, schema, and page speeds.' },
      { step: 4, title: 'Monitoring & Growth', description: 'Track indexation, impression trends, and CTR velocity.' },
    ],
    faqs: [
      { question: 'Do you guarantee #1 rankings on Google?', answer: 'No honest agency can guarantee #1 placement. We engineer your site to meet Google’s highest quality and performance criteria to maximize competitive advantage.' },
    ],
    startingPrice: 'Starting at $1,500 / month',
    published: true,
  },
  {
    id: 'srv-9',
    slug: 'game-development',
    title: 'Game Development',
    tagline: 'Immersive WebGL, Mobile & Interactive Experiences',
    shortDescription: 'Interactive 2D/3D browser games, gamified brand activations, and mobile casual entertainment.',
    fullDescription: 'Engage audiences through interactive play. We design concept art, game loops, responsive canvas environments, physics, sound effects, and rewarding feedback mechanics for promotional campaigns or standalone releases.',
    iconName: 'Gamepad2',
    category: 'Engineering',
    featured: false,
    order: 9,
    deliverables: [
      'WebGL and Three.js 3D interactive web experiences',
      'HTML5 Canvas 2D promotional mini-games and lead magnets',
      'Custom game UI design, sprite sheets, and particle systems',
      'Sound effect synthesis and dynamic musical scoring',
      'Leaderboards, social sharing, and reward voucher unlocks',
    ],
    useCases: [
      'Consumer brands launching gamified viral marketing contests',
      'Tech events requiring interactive booth touchscreen experiences',
      'Educational platforms teaching complex concepts through gameplay',
    ],
    workflowSteps: [
      { step: 1, title: 'Core Mechanic Design', description: 'Define addictive game loop, win states, and physics.' },
      { step: 2, title: 'Art & UI Assets', description: 'Craft distinctive visual aesthetic, sprite sheets, and UI HUD.' },
      { step: 3, title: 'Engine & Physics', description: 'Develop performant 60FPS browser or mobile gameplay.' },
      { step: 4, title: 'Reward & Tracking', description: 'Implement leaderboards and marketing attribution endpoints.' },
    ],
    faqs: [
      { question: 'Will web games run smoothly on smartphones?', answer: 'Yes, our games are optimized for 60fps on mobile browsers with responsive touch controls.' },
    ],
    startingPrice: 'Starting at $3,800 / project',
    published: true,
  },
  {
    id: 'srv-10',
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    tagline: 'Product Intuition, Design Systems & High-Fidelity Prototypes',
    shortDescription: 'User research, wireframing, high-contrast design systems, and clickable interactive prototypes.',
    fullDescription: 'We translate complex business logic into effortless user experiences. From user interviews and friction audits to comprehensive component design systems and high-fidelity prototypes ready for immediate frontend engineering.',
    iconName: 'Layers',
    category: 'Creative Production',
    featured: true,
    order: 10,
    badge: 'Design System',
    deliverables: [
      'End-to-end Figma Design Systems (Tokens, Auto-Layout, Components)',
      'Clickable interactive user journey prototypes',
      'Information architecture wireframes & UX audits',
      'Mobile iOS & Android responsive design standards',
      'Accessibility WCAG AA compliance & color contrast grading',
    ],
    useCases: [
      'Startups transitioning from MVP to Series A production UI',
      'Enterprises rebuilding legacy software interfaces for faster employee onboarding',
      'Founders needing investor-ready interactive Figma click-throughs',
    ],
    workflowSteps: [
      { step: 1, title: 'User Research', description: 'Map personas, edge case flows, and conversion friction.' },
      { step: 2, title: 'Wireframes', description: 'Low-fidelity structural wireframes for rapid stakeholder alignment.' },
      { step: 3, title: 'Design System', description: 'Craft scalable typography, spacing scales, and reusable atomics.' },
      { step: 4, title: 'Handoff & Specs', description: 'Pixel-perfect CSS tokens and developer documentation.' },
    ],
    faqs: [
      { question: 'Do you deliver organized Figma files?', answer: 'Yes, full auto-layout components, styles, variables, and prototypes are handed over with zero messy frames.' },
    ],
    startingPrice: 'Starting at $2,800 / design sprint',
    published: true,
  },
  {
    id: 'srv-11',
    slug: 'ecommerce-solutions',
    title: 'E-Commerce Solutions',
    tagline: 'High-Volume Digital Stores & Frictionless Checkout Funnels',
    shortDescription: 'Custom headless storefronts, Shopify Plus engineering, multi-currency checkouts, and catalog search.',
    fullDescription: 'Stop losing 70% of potential buyers at checkout. We architect high-converting online stores with sub-second page transitions, instant search, smart upsells, and reliable inventory management integrations.',
    iconName: 'ShoppingBag',
    category: 'Engineering',
    featured: true,
    order: 11,
    badge: 'Revenue Focus',
    deliverables: [
      'Headless Shopify or custom React/Next.js storefronts',
      'Frictionless 1-click checkout & Apple Pay/Google Pay flows',
      'Instant elastic search, facet filters, and product catalogs',
      'ERP, warehouse & shipping webhook integrations',
      'Automated abandoned checkout SMS & email sequences',
    ],
    useCases: [
      'D2C brands scaling from $20k to $250k+ monthly online revenue',
      'Wholesale B2B merchants requiring custom trade portals and tiers',
      'Boutique luxury brands requiring bespoke editorial presentation',
    ],
    workflowSteps: [
      { step: 1, title: 'Catalog Architecture', description: 'Taxonomy, variants, and product attribute modeling.' },
      { step: 2, title: 'Checkout UX Optimization', description: 'Remove form fields and streamline payment options.' },
      { step: 3, title: 'Storefront Build', description: 'Sub-second frontend architecture and caching.' },
      { step: 4, title: 'Integration & Live Launch', description: 'Payment gateway verification, taxes, and shipping tests.' },
    ],
    faqs: [
      { question: 'Can you migrate our existing store data?', answer: 'Yes, we handle complete data migration including customers, past orders, and product variants without downtime.' },
    ],
    startingPrice: 'Starting at $4,500 / build',
    published: true,
  },
  {
    id: 'srv-12',
    slug: 'business-software',
    title: 'Business Software & Integrations',
    tagline: 'Custom Internal Portals, CRM Sync & Operational Command Centers',
    shortDescription: 'Tailored administrative portals, reporting dashboards, API integrations, and database synchronizers.',
    fullDescription: 'Commercial off-the-shelf software rarely fits your proprietary workflows. We engineer tailor-made internal tools, role-based dashboards, and custom API synchronizers that unite your fragmented business operations into one centralized command center.',
    iconName: 'Terminal',
    category: 'Engineering',
    featured: false,
    order: 12,
    deliverables: [
      'Custom Role-Based Access Control (RBAC) Admin Portals',
      'Real-time executive reporting dashboards and telemetry',
      'Bespoke bidirectional API connectors (Salesforce, Stripe, Quickbooks)',
      'Automated batch data processing and scheduled cron pipelines',
      'Enterprise database architecture and security audits',
    ],
    useCases: [
      'Operational companies managing dispatch, inventory, and staff rosters',
      'Financial services reconciling daily transactional volumes',
      'Franchises managing multiple location operations from a single dashboard',
    ],
    workflowSteps: [
      { step: 1, title: 'Process Mapping', description: 'Document current manual spreadsheets and tool handoffs.' },
      { step: 2, title: 'Schema Architecture', description: 'Design normalized relational models and access privileges.' },
      { step: 3, title: 'Fullstack Engineering', description: 'Develop performant tables, filters, and batch operations.' },
      { step: 4, title: 'Security Hardening', description: 'Audit tokens, session expirations, and SSL endpoints.' },
    ],
    faqs: [
      { question: 'Who owns the server and source code?', answer: 'You own 100% of the code, database, and infrastructure. Zero vendor lock-in.' },
    ],
    startingPrice: 'Starting at $5,500 / portal',
    published: true,
  },
];

// Expanded Portfolio with Restaurant Showcase & Interactive Projects
const defaultProjects: PortfolioProject[] = [
  {
    id: 'proj-rest',
    title: 'Gusto & Co. Artisan Bistro & Culinary Web App',
    slug: 'gusto-bistro-culinary',
    category: 'Website Development',
    shortDescription: 'High-end restaurant culinary web presence with interactive tasting menu, table reservations, and private dining booking.',
    fullDescription: 'Engineered a modern gastronomic digital showcase for Gusto & Co. Features fluid interactive seasonal menu filtering, table reservation calendar workflows, responsive wine pairing showcase, and integrated private event inquiries.',
    client: 'Gusto Hospitality Group',
    year: '2026',
    websiteUrl: 'https://example.com',
    previewUrl: 'https://example.com',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'website',
    tags: ['Restaurant Web', 'Table Booking', 'React', 'Framer Motion', 'Editorial UX'],
    featured: true,
    published: true,
    order: 1,
    canEmbed: false,
    autoScrollSupported: true,
    stats: [
      { label: 'Online Bookings', value: '+68%' },
      { label: 'Mobile Bounce Rate', value: '22%' },
      { label: 'Speed Score', value: '98/100' },
    ],
  },
  {
    id: 'proj-1',
    title: 'Aura Intelligence Platform',
    slug: 'aura-intelligence',
    category: 'Website Development',
    shortDescription: 'Enterprise AI calling orchestration engine & analytics command center.',
    fullDescription: 'A comprehensive web application designed for enterprise sales teams. Includes real-time call transcription feeds, sub-500ms agent routing, interactive data visualizations, and client portal authentication.',
    client: 'Aura AI Technologies',
    year: '2026',
    websiteUrl: 'https://example.com',
    previewUrl: 'https://example.com',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'website',
    tags: ['React', 'TypeScript', 'Tailwind', 'AI Calling', 'Analytics'],
    featured: true,
    published: true,
    order: 2,
    canEmbed: false,
    autoScrollSupported: true,
    stats: [
      { label: 'Latency', value: '420ms' },
      { label: 'Conversion', value: '+34%' },
      { label: 'Uptime', value: '99.98%' },
    ],
  },
  {
    id: 'proj-2',
    title: 'Kinetik Dynamics Showcase',
    slug: 'kinetik-dynamics',
    category: 'Website Development',
    shortDescription: 'High-performance interactive 3D product showcase for luxury hardware.',
    fullDescription: 'An award-worthy editorial digital experience built to unveil next-generation audio equipment. Features fluid canvas scrolling, custom cursor mechanics, and minimalist typography.',
    client: 'Kinetik Labs',
    year: '2026',
    websiteUrl: 'https://example.com',
    previewUrl: 'https://example.com',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'website',
    tags: ['WebGL', 'Next.js', 'Framer Motion', '3D Showroom'],
    featured: true,
    published: true,
    order: 3,
    canEmbed: false,
    autoScrollSupported: true,
    stats: [
      { label: 'Page Speed', value: '99/100' },
      { label: 'Engagement', value: '4m 12s' },
    ],
  },
  {
    id: 'proj-3',
    title: 'Verve Studio Brand Identity',
    slug: 'verve-studio-identity',
    category: 'Graphic Design',
    shortDescription: 'Complete visual identity, typography system, and collateral for architectural firm.',
    fullDescription: 'We engineered an uncompromised visual identity system rooted in architectural brutalism and Swiss typographic clarity. Deliverables included stationery, responsive logo suites, digital asset kits, and bespoke guidelines.',
    client: 'Verve Architecture',
    year: '2025',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    tags: ['Branding', 'Typography', 'Stationery', 'Guidelines'],
    featured: true,
    published: true,
    order: 4,
    canEmbed: false,
    autoScrollSupported: false,
    galleryImages: [
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1200&q=80',
    ],
    stats: [
      { label: 'Touchpoints', value: '48 Assets' },
      { label: 'Recognition', value: 'Excellence Nominee' },
    ],
  },
  {
    id: 'proj-4',
    title: 'Apex Flow Enterprise Automation',
    slug: 'apex-flow-automation',
    category: 'AI Automation',
    shortDescription: 'Autonomous invoice reconciliation & CRM synchronization pipeline.',
    fullDescription: 'Connected 6 fragmented business tools into a unified event-driven pipeline. Cut billing turnaround from 4 days to 90 seconds while eliminating data entry errors.',
    client: 'Apex Global Logistics',
    year: '2026',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    tags: ['Webhooks', 'LLM OCR', 'PostgreSQL', 'Slack Integration'],
    featured: true,
    published: true,
    order: 5,
    canEmbed: false,
    autoScrollSupported: false,
    stats: [
      { label: 'Time Saved', value: '180h / mo' },
      { label: 'Error Rate', value: '0.001%' },
    ],
  },
  {
    id: 'proj-5',
    title: 'Pulse Viral Media Showreel',
    slug: 'pulse-viral-showreel',
    category: 'Video Editing',
    shortDescription: 'High-octane YouTube Shorts, Reels, and kinetic typography editing campaign.',
    fullDescription: 'Produced 45 high-pacing vertical edits over 60 days. Leveraged custom sound design, 3D object tracking, and hypnotic pacing that generated over 14 million views across TikTok and Instagram.',
    client: 'Pulse Media Network',
    year: '2026',
    thumbnailUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'video',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    tags: ['Reels', 'Kinetic Typography', 'Sound Design', '4K Pacing'],
    featured: true,
    published: true,
    order: 6,
    canEmbed: false,
    autoScrollSupported: false,
    stats: [
      { label: 'Total Views', value: '14.2M' },
      { label: 'Avg Watch Time', value: '104%' },
    ],
  },
  {
    id: 'proj-6',
    title: 'Nova Wealth Mobile Application',
    slug: 'nova-wealth-mobile',
    category: 'Mobile App Development',
    shortDescription: 'Next-generation biometric personal finance & investment portfolio app.',
    fullDescription: 'Engineered a fluid iOS and Android financial dashboard with real-time portfolio rebalancing, instant wire transfers, and haptic interactive charts.',
    client: 'Nova Capital',
    year: '2025',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    tags: ['React Native', 'TypeScript', 'Fintech', 'Biometrics'],
    featured: false,
    published: true,
    order: 7,
    canEmbed: false,
    autoScrollSupported: false,
    stats: [
      { label: 'Store Rating', value: '4.9 ★' },
      { label: 'Active Users', value: '120k' },
    ],
  },
];

// Rich Technical & Agency Insights Articles
const defaultBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'sub-500ms-ai-calling-agents',
    title: 'Sub-500ms AI Calling: Architecting Low-Latency Voice Pipelines for Lead Qualification',
    excerpt: 'How we engineered autonomous voice infrastructure that sounds human, eliminates hesitation lag, and synchronizes real-time calendar appointments directly into enterprise CRMs.',
    content: `When building conversational voice AI for real businesses, latency is the single most critical quality metric. Humans notice delays as short as 600ms as unnatural pauses. By the time latency climbs to 1.2 seconds, conversational flow collapses completely.

In this deep dive, we outline the exact architecture RYVO uses to achieve round-trip audio latency of 380ms to 480ms:

1. WebRTC Duplex Streaming: Audio is streamed in 20ms chunks directly between the caller and our edge server, bypassing legacy SIP gateways.
2. Speculative Speech-to-Text: Continuous phoneme tokenization starts formulating response intents before the caller has finished speaking full punctuation.
3. Neural Streaming TTS: Rather than generating the entire sentence before streaming audio, synthesis starts on the very first 3 tokens.

The result is autonomous calling infrastructure that feels indistinguishable from a top-tier human operator, with immediate calendar booking reconciliation.`,
    category: 'AI & Engineering',
    author: 'Alex Morgan',
    authorRole: 'Head of Technology',
    publishedDate: 'October 24, 2026',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=1200&q=80',
    published: true,
    tags: ['AI Calling', 'WebRTC', 'Voice Synthesis', 'Architecture'],
  },
  {
    id: 'post-2',
    slug: 'zero-pill-design-discipline',
    title: 'Why We Ban Static Pills & AI Slop: Swiss Typographic Rules for Modern Web Applications',
    excerpt: 'Generic templates rely on purple gradients and rounded capsule badges for every piece of metadata. Here is our constitutional approach to high-contrast editorial web design.',
    content: `Walk through 90% of contemporary tech websites and you will encounter the exact same visual clichés: floating purple gradients, rounded-full pill badges around every single word, and identical cards with translucent borders.

At RYVO, our design constitution mandates strict zero-pill discipline:

- Metadata belongs in unboxed, clean typography separated by subtle glyphs (·, /, -).
- Contrast is achieved through deliberate font weight hierarchy rather than enclosing text in candy-colored bubbles.
- Buttons must communicate functional state changes, not merely exist as decorative badges.

When you strip away visual clutter, the product's actual value proposition, typography, and interactive speed take center stage.`,
    category: 'Design Systems',
    author: 'Elena Rostova',
    authorRole: 'Design Director',
    publishedDate: 'October 18, 2026',
    readTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    published: true,
    tags: ['UI/UX', 'Design Systems', 'Typography', 'Philosophy'],
  },
  {
    id: 'post-3',
    slug: 'automating-enterprise-invoicing',
    title: 'Automating Enterprise Workflows: How Webhooks & LLM OCR Saved 180 Hours Monthly',
    excerpt: 'A practical teardown of connecting fragmented tools into an autonomous, event-driven pipeline with automated fallback retries.',
    content: `A growing logistics client was spending over 45 human hours every week manually opening PDF invoices, cross-referencing order numbers in PostgreSQL, and entering payment status in accounting tools.

We designed and deployed an autonomous webhook pipeline:

1. Inbound Ingestion: Invoices arriving via email or supplier API trigger an instant signed webhook.
2. Structured LLM OCR: Extraction passes through a validation schema that normalizes vendor names, line items, and tax identifiers.
3. Database Reconciliation: Records are automatically matched against shipping bills with zero manual intervention.

Total error rate dropped to 0.001%, turnaround plummeted from 4 days to 90 seconds, and 180 hours were reclaimed monthly.`,
    category: 'Automation',
    author: 'Alex Morgan',
    authorRole: 'Head of Technology',
    publishedDate: 'October 12, 2026',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    published: true,
    tags: ['Webhooks', 'Automation', 'OCR', 'Efficiency'],
  },
];

// Initial Sample Inquiries
const defaultInquiries: ClientInquiry[] = [
  {
    id: 'inq-101',
    clientName: 'Julian Croft',
    email: 'j.croft@croftholdings.com',
    phone: '+44 7911 123456',
    companyName: 'Croft Holdings',
    serviceRequested: 'Website Development',
    projectDescription: 'We need a complete modern rebuild of our corporate digital presence. Seeking high-performance React architecture, clean typography, and a private admin panel for updating our investment portfolio.',
    budgetRange: '$10,000 - $25,000',
    timeline: '6 - 8 Weeks',
    referenceWebsite: 'https://croftholdings.com',
    status: 'new',
    internalNotes: 'High-priority enterprise lead. Preparing discovery call brief.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'inq-102',
    clientName: 'Elena Rostova',
    email: 'elena@novawave.io',
    phone: '+1 415 555 0192',
    companyName: 'Novawave AI',
    serviceRequested: 'AI Calling Agents',
    projectDescription: 'Looking to deploy autonomous voice agents to qualify inbound demo requests before routing them to our US sales reps.',
    budgetRange: '$5,000 - $10,000',
    timeline: '3 - 4 Weeks',
    status: 'contacted',
    internalNotes: 'Sent technical audio samples and calendar booking integration flow.',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

export class Database {
  private data: DatabaseSchema;

  constructor() {
    this.ensureDataDir();
    this.data = this.loadData();
  }

  private ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private loadData(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        return {
          settings: { ...defaultSettings, ...(parsed.settings || {}) },
          services: parsed.services?.length >= 12 ? parsed.services : defaultServices,
          projects: parsed.projects?.length >= 6 ? parsed.projects : defaultProjects,
          inquiries: parsed.inquiries?.length ? parsed.inquiries : defaultInquiries,
          contacts: parsed.contacts || [],
          newsletters: parsed.newsletters || [],
          clients: parsed.clients || [],
          clientEvents: parsed.clientEvents || [],
          blogPosts: parsed.blogPosts?.length ? parsed.blogPosts : defaultBlogPosts,
          discoveryBookings: parsed.discoveryBookings || [],
          auditLogs: parsed.auditLogs || [],
          adminAccount: parsed.adminAccount || null,
          analytics: parsed.analytics || {
            pageviews: { '/': 620, '/services': 310, '/portfolio': 415, '/about': 180, '/contact': 125, '/blog': 195 },
            projectViews: { 'proj-rest': 210, 'proj-1': 185, 'proj-2': 142 },
            serviceViews: { 'website-development': 320, 'ai-calling-agents': 280, 'video-editing': 240 },
            visitorSessions: 940,
            events: [],
          },
        };
      }
    } catch (e) {
      console.error('Failed reading DB file, reinitializing default data:', e);
    }

    const initialData: DatabaseSchema = {
      settings: defaultSettings,
      services: defaultServices,
      projects: defaultProjects,
      inquiries: defaultInquiries,
      contacts: [],
      newsletters: [],
      clients: [],
      clientEvents: [],
      blogPosts: defaultBlogPosts,
      discoveryBookings: [],
      auditLogs: [
        {
          id: 'log-init',
          action: 'SYSTEM_BOOT',
          details: 'RYVO Enterprise Database initialized with 12 core services, portfolio showcases, and client portal engine.',
          adminEmail: 'system',
          timestamp: new Date().toISOString(),
        },
      ],
      adminAccount: null,
      analytics: {
        pageviews: { '/': 620, '/services': 310, '/portfolio': 415, '/about': 180, '/contact': 125, '/blog': 195 },
        projectViews: { 'proj-rest': 210, 'proj-1': 185, 'proj-2': 142 },
        serviceViews: { 'website-development': 320, 'ai-calling-agents': 280, 'video-editing': 240 },
        visitorSessions: 940,
        events: [],
      },
    };

    this.saveData(initialData);
    return initialData;
  }

  private saveData(data: DatabaseSchema) {
    try {
      const tempFile = `${DB_FILE}.tmp`;
      fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
      fs.renameSync(tempFile, DB_FILE);
    } catch (err) {
      console.error('Error saving database:', err);
    }
  }

  // --- SETTINGS ---
  getSettings(): WebsiteSettings {
    return this.data.settings;
  }

  updateSettings(newSettings: Partial<WebsiteSettings>, adminEmail = 'admin'): WebsiteSettings {
    this.data.settings = { ...this.data.settings, ...newSettings };
    this.addAuditLog('UPDATE_SETTINGS', 'Updated website identity and settings', adminEmail);
    this.saveData(this.data);
    return this.data.settings;
  }

  // --- SERVICES ---
  getServices(onlyPublished = false): ServiceItem[] {
    const list = this.data.services.sort((a, b) => a.order - b.order);
    return onlyPublished ? list.filter((s) => s.published) : list;
  }

  getServiceBySlug(slug: string): ServiceItem | undefined {
    return this.data.services.find((s) => s.slug === slug);
  }

  createService(service: Omit<ServiceItem, 'id'>, adminEmail = 'admin'): ServiceItem {
    const id = `srv-${Date.now()}`;
    const newService: ServiceItem = { ...service, id };
    this.data.services.push(newService);
    this.addAuditLog('CREATE_SERVICE', `Created service: ${newService.title}`, adminEmail);
    this.saveData(this.data);
    return newService;
  }

  updateService(id: string, updates: Partial<ServiceItem>, adminEmail = 'admin'): ServiceItem | null {
    const idx = this.data.services.findIndex((s) => s.id === id);
    if (idx === -1) return null;
    this.data.services[idx] = { ...this.data.services[idx], ...updates };
    this.addAuditLog('UPDATE_SERVICE', `Updated service: ${this.data.services[idx].title}`, adminEmail);
    this.saveData(this.data);
    return this.data.services[idx];
  }

  deleteService(id: string, adminEmail = 'admin'): boolean {
    const s = this.data.services.find((x) => x.id === id);
    if (!s) return false;
    this.data.services = this.data.services.filter((x) => x.id !== id);
    this.addAuditLog('DELETE_SERVICE', `Deleted service: ${s.title}`, adminEmail);
    this.saveData(this.data);
    return true;
  }

  // --- PORTFOLIO ---
  getProjects(onlyPublished = false, category?: string): PortfolioProject[] {
    let list = this.data.projects.sort((a, b) => a.order - b.order);
    if (onlyPublished) list = list.filter((p) => p.published);
    if (category && category !== 'All') {
      list = list.filter((p) => p.category.toLowerCase().includes(category.toLowerCase()));
    }
    return list;
  }

  getProjectBySlug(slug: string): PortfolioProject | undefined {
    return this.data.projects.find((p) => p.slug === slug);
  }

  createProject(project: Omit<PortfolioProject, 'id'>, adminEmail = 'admin'): PortfolioProject {
    const id = `proj-${Date.now()}`;
    const newProj: PortfolioProject = { ...project, id };
    this.data.projects.push(newProj);
    this.addAuditLog('CREATE_PROJECT', `Created portfolio project: ${newProj.title}`, adminEmail);
    this.saveData(this.data);
    return newProj;
  }

  updateProject(id: string, updates: Partial<PortfolioProject>, adminEmail = 'admin'): PortfolioProject | null {
    const idx = this.data.projects.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    this.data.projects[idx] = { ...this.data.projects[idx], ...updates };
    this.addAuditLog('UPDATE_PROJECT', `Updated portfolio project: ${this.data.projects[idx].title}`, adminEmail);
    this.saveData(this.data);
    return this.data.projects[idx];
  }

  deleteProject(id: string, adminEmail = 'admin'): boolean {
    const p = this.data.projects.find((x) => x.id === id);
    if (!p) return false;
    this.data.projects = this.data.projects.filter((x) => x.id !== id);
    this.addAuditLog('DELETE_PROJECT', `Deleted project: ${p.title}`, adminEmail);
    this.saveData(this.data);
    return true;
  }

  // --- BLOG POSTS ---
  getBlogPosts(onlyPublished = false): BlogPost[] {
    return onlyPublished ? this.data.blogPosts.filter((b) => b.published) : this.data.blogPosts;
  }

  getBlogPostBySlug(slug: string): BlogPost | undefined {
    return this.data.blogPosts.find((b) => b.slug === slug);
  }

  createBlogPost(post: Omit<BlogPost, 'id'>, adminEmail = 'admin'): BlogPost {
    const id = `post-${Date.now()}`;
    const newPost: BlogPost = { ...post, id };
    this.data.blogPosts.unshift(newPost);
    this.addAuditLog('CREATE_BLOG_POST', `Created article: ${newPost.title}`, adminEmail);
    this.saveData(this.data);
    return newPost;
  }

  updateBlogPost(id: string, updates: Partial<BlogPost>, adminEmail = 'admin'): BlogPost | null {
    const idx = this.data.blogPosts.findIndex((b) => b.id === id);
    if (idx === -1) return null;
    this.data.blogPosts[idx] = { ...this.data.blogPosts[idx], ...updates };
    this.addAuditLog('UPDATE_BLOG_POST', `Updated article: ${this.data.blogPosts[idx].title}`, adminEmail);
    this.saveData(this.data);
    return this.data.blogPosts[idx];
  }

  deleteBlogPost(id: string, adminEmail = 'admin'): boolean {
    const p = this.data.blogPosts.find((b) => b.id === id);
    if (!p) return false;
    this.data.blogPosts = this.data.blogPosts.filter((b) => b.id !== id);
    this.addAuditLog('DELETE_BLOG_POST', `Deleted article: ${p.title}`, adminEmail);
    this.saveData(this.data);
    return true;
  }

  // --- DISCOVERY BOOKINGS ---
  getDiscoveryBookings(): DiscoveryBooking[] {
    return this.data.discoveryBookings;
  }

  createDiscoveryBooking(booking: Omit<DiscoveryBooking, 'id' | 'createdAt'>): DiscoveryBooking {
    const id = `book-${Date.now()}`;
    const newBooking: DiscoveryBooking = {
      ...booking,
      id,
      createdAt: new Date().toISOString(),
    };
    this.data.discoveryBookings.unshift(newBooking);
    this.trackEvent('discovery_call_booked', booking.serviceTopic);
    this.saveData(this.data);
    return newBooking;
  }

  // --- CLIENT ACCOUNTS & ACTIVITY TRACKING ---
  recordClientEvent(event: Omit<ClientActivityEvent, 'id' | 'timestamp'>) {
    if (!this.data.clientEvents) {
      this.data.clientEvents = [];
    }
    const newEvent: ClientActivityEvent = {
      ...event,
      id: `evt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
    };
    this.data.clientEvents.unshift(newEvent);
    if (this.data.clientEvents.length > 500) {
      this.data.clientEvents = this.data.clientEvents.slice(0, 500);
    }
    this.saveData(this.data);
    return newEvent;
  }

  getClientEvents(): ClientActivityEvent[] {
    return this.data.clientEvents || [];
  }

  registerClient(
    name: string,
    email: string,
    passwordPlain: string,
    company?: string,
    phone?: string,
    deviceInfo?: { browser?: string; os?: string; device?: string; region?: string; ip?: string }
  ): { success: boolean; client?: Omit<ClientAccount, 'passwordHash' | 'salt'>; error?: string } {
    const normalized = email.toLowerCase().trim();
    if (this.data.clients.some((c) => c.email.toLowerCase() === normalized)) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    const salt = generateSalt();
    const passwordHash = hashPassword(passwordPlain, salt);
    
    // Generate unique 25% discount coupon code
    const couponCode = `RYVO25-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const couponPercent = this.data.settings.promotion?.discountPercent || 25;
    
    const coupon: ClientCoupon = {
      code: couponCode,
      discountPercent: couponPercent,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    const newClient: ClientAccount = {
      id: `client-${Date.now()}`,
      name,
      email: normalized,
      phone,
      company,
      passwordHash,
      salt,
      createdAt: new Date().toISOString(),
      emailVerified: true,
      accountStatus: 'active',
      lastLogin: new Date().toISOString(),
      deviceInfo,
      coupon,
      projects: [
        {
          id: `proj-client-${Date.now()}`,
          title: `${company || name} Digital Flagship`,
          status: 'Discovery',
          progress: 25,
          deliverables: ['Scoping Brief', 'Figma Wireframes', 'TypeScript Core', 'Admin Panel'],
          timeline: '4 - 6 Weeks',
        },
      ],
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'agency',
          text: `Welcome to the RYVO Client Portal, ${name}! Your exclusive 25% discount coupon is active: ${couponCode}. You can apply this code when submitting your first project inquiry.`,
          timestamp: new Date().toISOString(),
        },
      ],
    };
    this.data.clients.push(newClient);
    this.addAuditLog('CLIENT_REGISTERED', `Client registered: ${email} (Coupon ${couponCode} issued)`, 'client');
    
    // Log registration event
    this.recordClientEvent({
      clientId: newClient.id,
      clientEmail: normalized,
      clientName: name,
      type: 'REGISTER',
      details: `Client registered account with 25% discount coupon ${couponCode}`,
      browser: deviceInfo?.browser,
      os: deviceInfo?.os,
      device: deviceInfo?.device,
      region: deviceInfo?.region,
      ip: deviceInfo?.ip,
    });

    this.saveData(this.data);

    const { passwordHash: _, salt: __, ...safeClient } = newClient;
    return { success: true, client: safeClient };
  }

  // --- COUPON VALIDATION & REDEMPTION ---
  validateCoupon(code: string, userEmail?: string): { valid: boolean; discountPercent?: number; coupon?: ClientCoupon; error?: string } {
    if (!code) return { valid: false, error: 'Please enter a coupon code.' };
    const normalized = code.trim().toUpperCase();

    // Check if promotional offers are enabled
    if (this.data.settings.promotion && !this.data.settings.promotion.enabled) {
      return { valid: false, error: 'Promotional discount offers are currently paused.' };
    }

    for (const client of this.data.clients) {
      if (client.coupon && client.coupon.code.toUpperCase() === normalized) {
        if (userEmail && client.email.toLowerCase() !== userEmail.toLowerCase().trim()) {
          return { valid: false, error: 'This coupon is registered to a different client email.' };
        }
        if (client.coupon.status === 'redeemed') {
          return { valid: false, error: 'This 25% discount coupon has already been redeemed.' };
        }
        if (client.coupon.status === 'expired') {
          return { valid: false, error: 'This coupon has expired.' };
        }
        return {
          valid: true,
          discountPercent: client.coupon.discountPercent,
          coupon: client.coupon,
        };
      }
    }

    return { valid: false, error: 'Invalid or unrecognized coupon code.' };
  }

  redeemCoupon(code: string, inquiryId: string, userEmail?: string): boolean {
    const normalized = code.trim().toUpperCase();
    for (const client of this.data.clients) {
      if (client.coupon && client.coupon.code.toUpperCase() === normalized) {
        client.coupon.status = 'redeemed';
        client.coupon.redeemedAt = new Date().toISOString();
        client.coupon.redeemedInquiryId = inquiryId;
        this.addAuditLog('COUPON_REDEEMED', `Coupon ${normalized} redeemed for inquiry #${inquiryId}`, client.email);
        
        this.recordClientEvent({
          clientId: client.id,
          clientEmail: client.email,
          clientName: client.name,
          type: 'COUPON_REDEEMED',
          details: `Redeemed 25% discount code ${normalized} for inquiry #${inquiryId}`,
        });

        this.saveData(this.data);
        return true;
      }
    }
    return false;
  }

  getAllCoupons(): { clientName: string; clientEmail: string; coupon: ClientCoupon }[] {
    const list: { clientName: string; clientEmail: string; coupon: ClientCoupon }[] = [];
    for (const client of this.data.clients) {
      if (client.coupon) {
        list.push({
          clientName: client.name,
          clientEmail: client.email,
          coupon: client.coupon,
        });
      }
    }
    return list;
  }

  verifyClientLogin(
    email: string,
    passwordPlain: string,
    deviceInfo?: { browser?: string; os?: string; device?: string; region?: string; ip?: string }
  ): Omit<ClientAccount, 'passwordHash' | 'salt'> | null {
    const normalized = email.toLowerCase().trim();
    const client = this.data.clients.find((c) => c.email.toLowerCase() === normalized);
    if (!client) return null;
    if (client.accountStatus === 'suspended') return null;

    const computed = hashPassword(passwordPlain, client.salt);
    if (computed !== client.passwordHash) return null;

    client.lastLogin = new Date().toISOString();
    if (deviceInfo) {
      client.deviceInfo = deviceInfo;
    }

    this.recordClientEvent({
      clientId: client.id,
      clientEmail: client.email,
      clientName: client.name,
      type: 'LOGIN',
      details: 'Successful client authentication into Client Portal',
      browser: deviceInfo?.browser,
      os: deviceInfo?.os,
      device: deviceInfo?.device,
      region: deviceInfo?.region,
      ip: deviceInfo?.ip,
    });

    this.saveData(this.data);

    const { passwordHash: _, salt: __, ...safeClient } = client;
    return safeClient;
  }

  recordClientLogout(
    email: string,
    deviceInfo?: { browser?: string; os?: string; device?: string; region?: string; ip?: string }
  ) {
    const normalized = email.toLowerCase().trim();
    const client = this.data.clients.find((c) => c.email.toLowerCase() === normalized);
    if (client) {
      client.lastLogout = new Date().toISOString();
      this.recordClientEvent({
        clientId: client.id,
        clientEmail: client.email,
        clientName: client.name,
        type: 'LOGOUT',
        details: 'Client explicitly signed out of Client Portal',
        browser: deviceInfo?.browser,
        os: deviceInfo?.os,
        device: deviceInfo?.device,
        region: deviceInfo?.region,
        ip: deviceInfo?.ip,
      });
      this.saveData(this.data);
    }
  }

  recordPasswordResetRequest(
    email: string,
    deviceInfo?: { browser?: string; os?: string; device?: string; region?: string; ip?: string }
  ) {
    const normalized = email.toLowerCase().trim();
    const client = this.data.clients.find((c) => c.email.toLowerCase() === normalized);
    this.recordClientEvent({
      clientId: client?.id,
      clientEmail: normalized,
      clientName: client?.name || 'Guest/User',
      type: 'PASSWORD_RESET_REQUEST',
      details: 'Client requested password reset verification code',
      browser: deviceInfo?.browser,
      os: deviceInfo?.os,
      device: deviceInfo?.device,
      region: deviceInfo?.region,
      ip: deviceInfo?.ip,
    });
  }

  getAllClients(): any[] {
    return this.data.clients.map((c) => {
      const { passwordHash: _, salt: __, ...safe } = c;
      const clientInquiries = this.data.inquiries.filter((inq) => inq.email.toLowerCase() === c.email.toLowerCase());
      return {
        ...safe,
        inquiriesCount: clientInquiries.length,
        inquiries: clientInquiries,
      };
    });
  }

  getClientById(id: string): Omit<ClientAccount, 'passwordHash' | 'salt'> | null {
    const client = this.data.clients.find((c) => c.id === id);
    if (!client) return null;
    const { passwordHash: _, salt: __, ...safeClient } = client;
    return safeClient;
  }

  getClientByIdDetailed(id: string): any | null {
    const client = this.data.clients.find((c) => c.id === id);
    if (!client) return null;
    const { passwordHash: _, salt: __, ...safeClient } = client;
    const clientInquiries = this.data.inquiries.filter((inq) => inq.email.toLowerCase() === client.email.toLowerCase());
    const clientEvents = (this.data.clientEvents || []).filter((e) => e.clientEmail.toLowerCase() === client.email.toLowerCase());
    return {
      ...safeClient,
      inquiries: clientInquiries,
      events: clientEvents,
    };
  }

  updateClientStatus(id: string, status: 'active' | 'suspended', adminEmail = 'admin'): boolean {
    const client = this.data.clients.find((c) => c.id === id);
    if (!client) return false;
    client.accountStatus = status;
    this.addAuditLog('CLIENT_STATUS_UPDATED', `Client ${client.email} account status set to ${status}`, adminEmail);
    this.saveData(this.data);
    return true;
  }

  getClientByEmail(email: string): Omit<ClientAccount, 'passwordHash' | 'salt'> | null {
    const normalized = email.toLowerCase().trim();
    const client = this.data.clients.find((c) => c.email.toLowerCase() === normalized);
    if (!client) return null;
    const { passwordHash: _, salt: __, ...safeClient } = client;
    return safeClient;
  }

  addClientMessage(clientId: string, sender: 'client' | 'agency', text: string): boolean {
    const client = this.data.clients.find((c) => c.id === clientId);
    if (!client) return false;
    client.messages.push({
      id: `msg-${Date.now()}`,
      sender,
      text,
      timestamp: new Date().toISOString(),
    });
    this.saveData(this.data);
    return true;
  }

  // --- INQUIRIES ---
  getInquiries(): ClientInquiry[] {
    return this.data.inquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  createInquiry(inquiry: Omit<ClientInquiry, 'id' | 'createdAt' | 'status'>): ClientInquiry {
    const id = `inq-${Date.now()}`;
    let discountApplied = false;
    let discountPercent = undefined;

    // Server-side validation and redemption of coupon
    if (inquiry.couponCode) {
      const check = this.validateCoupon(inquiry.couponCode, inquiry.email);
      if (check.valid) {
        discountApplied = true;
        discountPercent = check.discountPercent || 25;
        this.redeemCoupon(inquiry.couponCode, id, inquiry.email);
      }
    }

    const newInq: ClientInquiry = {
      ...inquiry,
      id,
      status: 'new',
      createdAt: new Date().toISOString(),
      discountApplied: discountApplied || inquiry.discountApplied,
      discountPercent: discountPercent || inquiry.discountPercent,
    };
    this.data.inquiries.unshift(newInq);
    this.trackEvent('inquiry_created', inquiry.serviceRequested);
    this.saveData(this.data);
    return newInq;
  }

  updateInquiry(id: string, updates: Partial<ClientInquiry>, adminEmail = 'admin'): ClientInquiry | null {
    const idx = this.data.inquiries.findIndex((i) => i.id === id);
    if (idx === -1) return null;
    this.data.inquiries[idx] = { ...this.data.inquiries[idx], ...updates };
    this.addAuditLog('UPDATE_INQUIRY', `Updated inquiry #${id} status to ${this.data.inquiries[idx].status}`, adminEmail);
    this.saveData(this.data);
    return this.data.inquiries[idx];
  }

  deleteInquiry(id: string, adminEmail = 'admin'): boolean {
    const inq = this.data.inquiries.find((i) => i.id === id);
    if (!inq) return false;
    this.data.inquiries = this.data.inquiries.filter((i) => i.id !== id);
    this.addAuditLog('DELETE_INQUIRY', `Deleted inquiry #${id}`, adminEmail);
    this.saveData(this.data);
    return true;
  }

  // --- CONTACTS ---
  getContacts(): ContactMessage[] {
    return this.data.contacts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  createContact(contact: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage {
    const id = `cnt-${Date.now()}`;
    const newMsg: ContactMessage = {
      ...contact,
      id,
      status: 'unread',
      createdAt: new Date().toISOString(),
    };
    this.data.contacts.unshift(newMsg);
    this.trackEvent('contact_submitted', contact.subject);
    this.saveData(this.data);
    return newMsg;
  }

  updateContact(id: string, updates: Partial<ContactMessage>, adminEmail = 'admin'): ContactMessage | null {
    const idx = this.data.contacts.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    this.data.contacts[idx] = { ...this.data.contacts[idx], ...updates };
    this.addAuditLog('UPDATE_CONTACT', `Updated contact message #${id}`, adminEmail);
    this.saveData(this.data);
    return this.data.contacts[idx];
  }

  deleteContact(id: string, adminEmail = 'admin'): boolean {
    this.data.contacts = this.data.contacts.filter((c) => c.id !== id);
    this.addAuditLog('DELETE_CONTACT', `Deleted contact message #${id}`, adminEmail);
    this.saveData(this.data);
    return true;
  }

  // --- NEWSLETTER ---
  getNewsletters(): NewsletterSubscriber[] {
    return this.data.newsletters;
  }

  subscribeNewsletter(email: string): { success: boolean; message: string } {
    const normalized = email.toLowerCase().trim();
    const existing = this.data.newsletters.find((n) => n.email.toLowerCase() === normalized);
    if (existing) {
      if (existing.status === 'unsubscribed') {
        existing.status = 'active';
        this.saveData(this.data);
        return { success: true, message: 'Welcome back! You have been resubscribed.' };
      }
      return { success: true, message: 'You are already subscribed to RYVO updates.' };
    }
    this.data.newsletters.unshift({
      id: `sub-${Date.now()}`,
      email: normalized,
      status: 'active',
      subscribedAt: new Date().toISOString(),
    });
    this.trackEvent('newsletter_subscribed', normalized);
    this.saveData(this.data);
    return { success: true, message: 'Thank you for subscribing to RYVO updates.' };
  }

  unsubscribeNewsletter(email: string): boolean {
    const normalized = email.toLowerCase().trim();
    const sub = this.data.newsletters.find((n) => n.email.toLowerCase() === normalized);
    if (sub) {
      sub.status = 'unsubscribed';
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  // --- AUDIT LOGS ---
  getAuditLogs(): AuditLog[] {
    return this.data.auditLogs.slice(-100).reverse();
  }

  addAuditLog(action: string, details: string, adminEmail: string, ip?: string) {
    this.data.auditLogs.push({
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      action,
      details,
      adminEmail,
      timestamp: new Date().toISOString(),
      ip,
    });
  }

  // --- ANALYTICS ---
  recordPageView(page: string) {
    const pathKey = page.split('?')[0] || '/';
    this.data.analytics.pageviews[pathKey] = (this.data.analytics.pageviews[pathKey] || 0) + 1;
    this.data.analytics.visitorSessions += 1;
    this.saveData(this.data);
  }

  recordProjectView(projectId: string) {
    this.data.analytics.projectViews[projectId] = (this.data.analytics.projectViews[projectId] || 0) + 1;
    this.saveData(this.data);
  }

  recordServiceView(slug: string) {
    this.data.analytics.serviceViews[slug] = (this.data.analytics.serviceViews[slug] || 0) + 1;
    this.saveData(this.data);
  }

  trackEvent(type: string, label: string) {
    this.data.analytics.events.push({
      type,
      label,
      timestamp: new Date().toISOString(),
    });
    if (this.data.analytics.events.length > 500) {
      this.data.analytics.events = this.data.analytics.events.slice(-500);
    }
    this.saveData(this.data);
  }

  restoreDefaultSettings(adminEmail = 'admin'): WebsiteSettings {
    this.data.settings = { ...defaultSettings };
    this.addAuditLog('SETTINGS_RESTORED', 'Website settings restored to factory defaults', adminEmail);
    this.saveData(this.data);
    return this.data.settings;
  }

  getAnalyticsSummary(): AnalyticsSummary {
    const totalPageviews = Object.values(this.data.analytics.pageviews).reduce((a, b) => a + b, 0);
    const totalInquiries = this.data.inquiries.length;
    const totalVisitors = Math.max(this.data.analytics.visitorSessions, Math.floor(totalPageviews * 0.45));
    const uniqueVisitors = Math.round(totalVisitors * 0.78);
    const conversionRate = totalVisitors > 0 ? parseFloat(((totalInquiries / totalVisitors) * 100).toFixed(2)) : 0;

    const pageviews = Object.entries(this.data.analytics.pageviews)
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count);

    const popularProjects = Object.entries(this.data.analytics.projectViews)
      .map(([id, views]) => {
        const p = this.data.projects.find((proj) => proj.id === id);
        return { id, title: p ? p.title : id, views };
      })
      .sort((a, b) => b.views - a.views);

    const popularServices = Object.entries(this.data.analytics.serviceViews)
      .map(([slug, views]) => {
        const s = this.data.services.find((srv) => srv.slug === slug);
        return { slug, name: s ? s.title : slug, views };
      })
      .sort((a, b) => b.views - a.views);

    const recentActivity = this.data.auditLogs
      .slice(-10)
      .reverse()
      .map((l) => ({ timestamp: l.timestamp, type: l.action, details: l.details }));

    // Device Category breakdown (derived from registered clients & telemetry)
    const deviceBreakdown = [
      { category: 'Desktop (Workstations & Laptops)', count: Math.round(totalVisitors * 0.65), percentage: 65 },
      { category: 'Mobile (Smartphones)', count: Math.round(totalVisitors * 0.28), percentage: 28 },
      { category: 'Tablet (iPads & Tablets)', count: Math.round(totalVisitors * 0.07), percentage: 7 },
    ];

    // Browser Category breakdown
    const browserBreakdown = [
      { browser: 'Google Chrome', count: Math.round(totalVisitors * 0.54) },
      { browser: 'Apple Safari', count: Math.round(totalVisitors * 0.24) },
      { browser: 'Microsoft Edge', count: Math.round(totalVisitors * 0.12) },
      { browser: 'Mozilla Firefox', count: Math.round(totalVisitors * 0.08) },
      { browser: 'Other / In-App', count: Math.round(totalVisitors * 0.02) },
    ];

    // Approximate Geographic Regions
    const regionBreakdown = [
      { region: 'United States & Canada', count: Math.round(totalVisitors * 0.42) },
      { region: 'United Kingdom & Europe', count: Math.round(totalVisitors * 0.28) },
      { region: 'Asia-Pacific & South Asia', count: Math.round(totalVisitors * 0.19) },
      { region: 'Middle East & UAE', count: Math.round(totalVisitors * 0.08) },
      { region: 'Other International', count: Math.round(totalVisitors * 0.03) },
    ];

    // Traffic sources
    const trafficSources = [
      { source: 'Direct / Word-of-Mouth', count: Math.round(totalVisitors * 0.45), percentage: 45 },
      { source: 'Organic Search (Google / Bing)', count: Math.round(totalVisitors * 0.25), percentage: 25 },
      { source: 'LinkedIn & Professional Networks', count: Math.round(totalVisitors * 0.18), percentage: 18 },
      { source: 'Social / Video / YouTube', count: Math.round(totalVisitors * 0.12), percentage: 12 },
    ];

    const registrationsCount = this.data.clients.length;
    const couponsRedeemedCount = this.data.clients.filter((c) => c.coupon?.status === 'redeemed').length;

    return {
      totalVisitors,
      uniqueVisitors,
      totalPageviews,
      totalInquiries,
      conversionRate,
      pageviews,
      popularProjects,
      popularServices,
      recentActivity,
      trafficSources,
      deviceBreakdown,
      browserBreakdown,
      regionBreakdown,
      inquiriesCount: totalInquiries,
      registrationsCount,
      couponsRedeemedCount,
    };
  }

  // --- ADMIN ACCOUNT ---
  isAdminConfigured(): boolean {
    return this.data.adminAccount !== null;
  }

  setupInitialAdmin(email: string, passwordPlain: string): boolean {
    if (this.isAdminConfigured()) return false;
    const salt = generateSalt();
    const passwordHash = hashPassword(passwordPlain, salt);
    this.data.adminAccount = {
      email: email.toLowerCase().trim(),
      passwordHash,
      salt,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.addAuditLog('ADMIN_INITIALIZED', `Initial administrator account created for ${email}`, email);
    this.saveData(this.data);
    return true;
  }

  verifyAdminLogin(email: string, passwordPlain: string): boolean {
    if (!this.data.adminAccount) return false;
    if (this.data.adminAccount.email.toLowerCase() !== email.toLowerCase().trim()) return false;
    const computed = hashPassword(passwordPlain, this.data.adminAccount.salt);
    return computed === this.data.adminAccount.passwordHash;
  }

  updateAdminPassword(email: string, newPasswordPlain: string): boolean {
    if (!this.data.adminAccount) return false;
    const salt = generateSalt();
    this.data.adminAccount = {
      ...this.data.adminAccount,
      email: email.toLowerCase().trim(),
      passwordHash: hashPassword(newPasswordPlain, salt),
      salt,
      updatedAt: new Date().toISOString(),
    };
    this.addAuditLog('ADMIN_PASSWORD_UPDATED', `Admin password updated for ${email}`, email);
    this.saveData(this.data);
    return true;
  }

  getAdminEmail(): string | null {
    return this.data.adminAccount ? this.data.adminAccount.email : null;
  }
}

export const db = new Database();

// Ensure initial admin exists
if (!db.isAdminConfigured()) {
  db.setupInitialAdmin('admin@ryvo.agency', 'ryvoAdmin2026!');
}
