import React from 'react';
import { AgencyProvider, useAgency } from './context/AgencyContext';
import { HeaderAnnouncement } from './components/common/HeaderAnnouncement';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingContact } from './components/common/FloatingContact';

import { StartProjectModal } from './components/common/StartProjectModal';
import { BrowserPreviewModal } from './components/portfolio/BrowserPreviewModal';
import { VideoPlayerModal } from './components/portfolio/VideoPlayerModal';
import { GraphicLightboxModal } from './components/portfolio/GraphicLightboxModal';
import { CinematicIntro } from './components/common/CinematicIntro';

// Core Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ProcessPage } from './pages/ProcessPage';
import { PricingPage } from './pages/PricingPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { StartProjectPage, InquiryConfirmationPage } from './pages/StartProjectPage';
import { LegalPage, NotFoundPage } from './pages/LegalPage';

// Domain, Strategic & Conversion Pages
import { IndustriesPage } from './pages/IndustriesPage';
import { TechnologyPage } from './pages/TechnologyPage';
import { WhyChooseRyvoPage } from './pages/WhyChooseRyvoPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { BlogPage, BlogPostPage } from './pages/BlogPage';
import {
  RequestQuotePage,
  BookCallPage,
  CareersPage,
  PartnershipsPage,
  CookiePolicyPage,
} from './pages/ConversionPages';
import {
  ClientLoginPage,
  ClientRegisterPage,
  ClientForgotPasswordPage,
  ClientPortalPage,
} from './pages/ClientPortalPages';

// Admin Portal
import { AdminPortal } from './admin/AdminPortal';

const AppContent: React.FC = () => {
  const { activeRoute, toasts, removeToast } = useAgency();
  const path = activeRoute.path;

  // Dedicated full-screen admin route (handles both /admin and /admin/login)
  if (path.startsWith('/admin')) {
    return <AdminPortal />;
  }

  // Route dispatcher
  const renderPage = () => {
    if (path === '/') return <HomePage />;
    if (path === '/about') return <AboutPage />;
    if (path === '/services') return <ServicesPage />;
    if (path.startsWith('/services/')) {
      const slug = path.replace('/services/', '');
      return <ServiceDetailPage slug={slug} />;
    }
    if (path === '/portfolio') return <PortfolioPage />;
    if (path.startsWith('/project/')) {
      const slug = path.replace('/project/', '');
      return <ProjectDetailPage slug={slug} />;
    }
    if (path === '/process') return <ProcessPage />;
    if (path === '/pricing') return <PricingPage />;
    if (path === '/faq') return <FaqPage />;
    if (path === '/contact') return <ContactPage />;
    if (path === '/start-project') return <StartProjectPage />;
    if (path === '/inquiry-confirmation') return <InquiryConfirmationPage />;

    // Strategic & Insights
    if (path === '/industries') return <IndustriesPage />;
    if (path === '/technology') return <TechnologyPage />;
    if (path === '/why-ryvo') return <WhyChooseRyvoPage />;
    if (path === '/testimonials') return <TestimonialsPage />;
    if (path === '/blog') return <BlogPage />;
    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      return <BlogPostPage slug={slug} />;
    }

    // Conversions & Engagement
    if (path === '/request-quote') return <RequestQuotePage />;
    if (path === '/book-call') return <BookCallPage />;
    if (path === '/careers') return <CareersPage />;
    if (path === '/partnerships') return <PartnershipsPage />;

    // Client Portal
    if (path === '/client/login') return <ClientLoginPage />;
    if (path === '/client/register') return <ClientRegisterPage />;
    if (path === '/client/forgot-password') return <ClientForgotPasswordPage />;
    if (path === '/client/portal' || path === '/client') return <ClientPortalPage />;

    // Legal
    if (path === '/privacy') return <LegalPage type="privacy" />;
    if (path === '/terms') return <LegalPage type="terms" />;
    if (path === '/cookie-policy') return <CookiePolicyPage />;

    return <NotFoundPage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#202124] selection:bg-[#FF6A2A]/20 selection:text-[#111318]">
      {/* Top Announcement Bar */}
      <HeaderAnnouncement />

      {/* Main Sticky Navbar */}
      <Navbar />

      {/* Render Active View */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Global Agency Footer */}
      <Footer />

      {/* Global Floating Contact Widget */}
      <FloatingContact />

      {/* Global Modals & Cinematic Intro */}
      <CinematicIntro />
      <StartProjectModal />
      <BrowserPreviewModal />
      <VideoPlayerModal />
      <GraphicLightboxModal />

      {/* Toast Notification Container */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            className={`pointer-events-auto px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2.5 transition-all duration-300 animate-in slide-in-from-left-4 cursor-pointer border ${
              toast.type === 'success'
                ? 'bg-[#111318] text-white border-emerald-500/40'
                : toast.type === 'error'
                ? 'bg-red-950 text-white border-red-500/40'
                : 'bg-white text-[#111318] border-[#E7E9ED]'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                toast.type === 'success'
                  ? 'bg-emerald-400'
                  : toast.type === 'error'
                  ? 'bg-red-400'
                  : 'bg-[#FF6A2A]'
              }`}
            />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AgencyProvider>
      <AppContent />
    </AgencyProvider>
  );
}
