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
