import React from 'react';
import { useAgency } from '../context/AgencyContext';
import { CheckCircle2, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { setStartProjectOpen, navigate } = useAgency();

  const packages = [
    {
      name: 'Creative Production',
      price: '$1,800',
      period: 'per project / sprint',
      description: 'Ideal for founders and direct-to-consumer brands needing high-retention video edits and graphic creative.',
      deliverables: [
        '10 Short-form viral video edits (Reels/Shorts)',
        'Kinetic typography & bespoke sound design',
        '3 High-CTR social graphic poster packs',
        'Full 4K ProRes & vertical format delivery',
        '48-hour turnarounds on revisions',
      ],
      featured: false,
    },
    {
      name: 'Flagship Web & Admin',
      price: '$4,200',
      period: 'one-time build',
      description: 'Fullstack modern web application with custom design system, live preview cards, and private admin portal.',
      deliverables: [
        'Custom React / TypeScript responsive architecture',
        'Bespoke zero-pill Tailwind design system',
        'Private Admin Portal with database persistence',
        'Interactive live website showcases & hover auto-scroll',
        'Lighthouse 95+ performance optimization',
        'Full technical SEO schema & OpenGraph cards',
      ],
      featured: true,
      badge: 'Most Popular',
    },
    {
      name: 'Autonomous AI Enterprise',
      price: '$6,800',
      period: 'setup + monthly retainer',
      description: 'Sub-500ms AI conversational calling agents, CRM pipelines, and automated business workflows.',
      deliverables: [
        'Autonomous inbound/outbound voice agent deployment',
        'Live CRM sync (HubSpot, Salesforce, PostgreSQL)',
        'Automated calendar booking & lead qualification',
        'Document parsing OCR & webhook automation pipelines',
        'Real-time call transcription & sentiment logging',
        'Dedicated SLA & 24/7 priority support',
      ],
      featured: false,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Transparent Commercial Framework</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-[#111318] tracking-tight">
          Pricing & Engagement Packages
        </h1>
        <p className="text-base sm:text-lg text-[#737780] leading-relaxed">
          Clear milestones, zero hidden hourly fees, and guaranteed full IP ownership upon project delivery.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {packages.map((pkg, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-8 flex flex-col justify-between space-y-8 transition-all duration-300 ${
              pkg.featured
                ? 'bg-[#111318] text-white border-2 border-[#FF6A2A] shadow-2xl relative'
                : 'bg-white text-[#111318] border border-[#E7E9ED] shadow-sm hover:shadow-xl'
            }`}
          >
            {pkg.badge && (
              <div className="absolute -top-3.5 right-8 px-3 py-1 bg-[#FF6A2A] text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md">
                {pkg.badge}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="font-heading text-xl font-bold">{pkg.name}</h3>
                <p className={`text-xs mt-1 leading-relaxed ${pkg.featured ? 'text-white/70' : 'text-[#737780]'}`}>
                  {pkg.description}
                </p>
              </div>

              <div className="pt-2">
                <span className="font-heading text-4xl font-extrabold tracking-tight">
                  {pkg.price}
                </span>
                <span className={`text-xs ml-2 ${pkg.featured ? 'text-white/60' : 'text-[#737780]'}`}>
                  / {pkg.period}
                </span>
              </div>

              <div className="pt-4 border-t border-current/10 space-y-2.5">
                <div className={`text-xs font-bold uppercase tracking-wider ${pkg.featured ? 'text-white/70' : 'text-[#111318]'}`}>
                  Scope Highlights:
                </div>
                {pkg.deliverables.map((item, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6A2A] shrink-0 mt-0.5" />
                    <span className={pkg.featured ? 'text-white/90' : 'text-[#202124]'}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <button
                onClick={() => setStartProjectOpen(true)}
                className={`w-full py-3.5 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  pkg.featured
                    ? 'bg-[#FF6A2A] hover:bg-[#ff7b42] text-white shadow-lg shadow-[#FF6A2A]/25'
                    : 'bg-[#111318] hover:bg-[#FF6A2A] text-white'
                }`}
              >
                <span>Select Package</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Enterprise Custom Scope */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#F7F8FA] border border-[#E7E9ED] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <div className="text-xs font-bold text-[#FF6A2A] uppercase">Custom Enterprise Scope</div>
          <h3 className="font-heading font-bold text-xl text-[#111318]">
            Need a dedicated cross-functional team or quarterly retainer?
          </h3>
          <p className="text-xs text-[#737780]">
            We build custom dedicated agreements for high-growth tech companies and enterprise operations.
          </p>
        </div>
        <button
          onClick={() => navigate('/contact')}
          className="px-6 py-3 rounded-xl bg-white hover:bg-[#111318] hover:text-white border border-[#E7E9ED] text-xs font-semibold transition-all shrink-0 cursor-pointer"
        >
          Request Custom Estimate
        </button>
      </div>
    </div>
  );
};
