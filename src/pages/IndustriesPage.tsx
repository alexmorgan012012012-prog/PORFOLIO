import React from 'react';
import { useAgency } from '../context/AgencyContext';
import {
  Sparkles,
  ArrowRight,
  Utensils,
  ShoppingBag,
  Zap,
  Building,
  Heart,
  Briefcase,
  Laptop,
  GraduationCap,
  Video,
} from 'lucide-react';

export const IndustriesPage: React.FC = () => {
  const { navigate, setStartProjectOpen } = useAgency();

  const industries = [
    {
      title: 'Restaurants & Hospitality',
      icon: <Utensils className="w-5 h-5 text-[#FF6A2A]" />,
      desc: 'Interactive tasting menus, table reservation engines, digital private dining inquiries, and local SEO dominance.',
      features: ['Reservation Workflows', 'Dynamic Menu Sync', 'Private Events Lead Routing'],
    },
    {
      title: 'Direct-to-Consumer & E-Commerce',
      icon: <ShoppingBag className="w-5 h-5 text-[#FF6A2A]" />,
      desc: 'Sub-second headless digital storefronts, high-converting product pages, and viral short-form video advertising.',
      features: ['Frictionless 1-Click Checkout', 'Inventory Webhook Sync', 'Paid Social Ad Suites'],
    },
    {
      title: 'Startups & Emerging Tech',
      icon: <Zap className="w-5 h-5 text-[#FF6A2A]" />,
      desc: 'Complete brand identity systems, investor-ready interactive Figma prototypes, and MVP fullstack web applications.',
      features: ['Design Systems', 'React/TypeScript SPAs', 'Sub-500ms AI Calling'],
    },
    {
      title: 'Real Estate & Property',
      icon: <Building className="w-5 h-5 text-[#FF6A2A]" />,
      desc: 'High-resolution property showcases, automated buyer lead qualification agents, and CRM pipeline sync.',
      features: ['Interactive Floorplans', '24/7 AI Voice Dispatch', 'Lead Scoring Webhooks'],
    },
    {
      title: 'Health, Wellness & Clinics',
      icon: <Heart className="w-5 h-5 text-[#FF6A2A]" />,
      desc: 'Automated 24/7 patient appointment scheduling, HIPAA-conscious intake forms, and local search authority.',
      features: ['Voice Appointment Setting', 'Patient Intake Automation', 'Speed Optimization'],
    },
    {
      title: 'Professional & Legal Services',
      icon: <Briefcase className="w-5 h-5 text-[#FF6A2A]" />,
      desc: 'Document OCR processing pipelines, client portal authentication, and high-authority editorial positioning.',
      features: ['Document Automation', 'Private Client Portals', 'Technical SEO'],
    },
    {
      title: 'Technology & Enterprise SaaS',
      icon: <Laptop className="w-5 h-5 text-[#FF6A2A]" />,
      desc: 'High-conversion marketing engines, interactive 3D product previews, and developer-friendly documentation.',
      features: ['Sub-Second Landing Pages', 'Interactive Previews', 'Role-Based Dashboards'],
    },
    {
      title: 'Creators & Personal Brands',
      icon: <Video className="w-5 h-5 text-[#FF6A2A]" />,
      desc: 'Relentless short-form video editing, YouTube long-form pacing, bespoke thumbnails, and digital storefronts.',
      features: ['4K Video Pacing', 'Viral Thumbnail Suites', 'Course & Membership Portals'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sector Expertise</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-[#111318] tracking-tight">
          Industries We Engineer For
        </h1>
        <p className="text-base sm:text-lg text-[#737780] leading-relaxed">
          We understand sector-specific customer acquisition mechanics, compliance requirements, and conversion pathways.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {industries.map((ind, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white border border-[#E7E9ED] hover:border-[#FF6A2A]/40 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F7F8FA] border border-[#E7E9ED] flex items-center justify-center">
                {ind.icon}
              </div>
              <h3 className="font-heading font-bold text-lg text-[#111318]">
                {ind.title}
              </h3>
              <p className="text-xs text-[#737780] leading-relaxed">
                {ind.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-[#E7E9ED] space-y-1.5">
              {ind.features.map((f, fIdx) => (
                <div key={fIdx} className="text-[11px] text-[#202124] flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#FF6A2A]" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="p-10 rounded-3xl bg-[#111318] text-white text-center space-y-4">
        <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
          Don't See Your Exact Sector Listed?
        </h3>
        <p className="text-sm text-white/70 max-w-md mx-auto">
          Our fullstack architecture and autonomous AI systems are customized to your specific operational workflows.
        </p>
        <button
          onClick={() => setStartProjectOpen(true)}
          className="px-8 py-3 rounded-xl bg-[#FF6A2A] hover:bg-[#ff7b42] text-white font-semibold text-xs transition-colors cursor-pointer"
        >
          Request Industry Consultation
        </button>
      </div>
    </div>
  );
};
