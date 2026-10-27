import React from 'react';
import { useAgency } from '../context/AgencyContext';
import {
  VideoEditingMotion,
  GraphicDesignMotion,
  AICallingMotion,
  WebsiteDevMotion,
  AIAutomationMotion,
  SEOMotion,
  DigitalMarketingMotion,
  AppDevMotion,
  GameDevMotion,
} from '../components/motion/ServiceMotions';
import { ArrowRight, CheckCircle2, Sparkles, Layers } from 'lucide-react';

const motionLookup: Record<string, React.ReactNode> = {
  'video-editing': <VideoEditingMotion />,
  'graphic-design': <GraphicDesignMotion />,
  'ai-calling-agents': <AICallingMotion />,
  'website-development': <WebsiteDevMotion />,
  'ai-automation': <AIAutomationMotion />,
  'seo-services': <SEOMotion />,
  'digital-marketing': <DigitalMarketingMotion />,
  'app-development': <AppDevMotion />,
  'game-development': <GameDevMotion />,
};

export const ServicesPage: React.FC = () => {
  const { services, navigate, setStartProjectOpen } = useAgency();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Complete Agency Capabilities</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-[#111318] tracking-tight">
          Specialized Digital Services
        </h1>
        <p className="text-base sm:text-lg text-[#737780] leading-relaxed">
          From viral video production to sub-second web applications and autonomous AI calling agents. Every service is delivered with dedicated engineering standards.
        </p>
      </div>

      {/* Services List with Full Feature Breakdown */}
      <div className="space-y-16">
        {services.map((srv, idx) => (
          <div
            key={srv.id}
            id={srv.slug}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-10 rounded-3xl border border-[#E7E9ED] bg-white hover:border-[#FF6A2A]/40 transition-all duration-300 hover:shadow-xl ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Service Details */}
            <div className={`space-y-6 ${idx % 2 === 1 ? 'lg:col-span-7 lg:order-2' : 'lg:col-span-7'}`}>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#737780] font-semibold">
                  <span className="text-[#FF6A2A]">0{idx + 1}</span>
                  <span>·</span>
                  <span>{srv.category}</span>
                  {srv.badge && (
                    <>
                      <span>·</span>
                      <span className="text-[#111318] font-bold">{srv.badge}</span>
                    </>
                  )}
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#111318]">
                  {srv.title}
                </h2>
                <div className="text-sm font-semibold text-[#FF6A2A]">
                  {srv.tagline}
                </div>
              </div>

              <p className="text-sm text-[#737780] leading-relaxed">
                {srv.fullDescription}
              </p>

              {/* Deliverables Checklist */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                  Key Deliverables
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#202124]">
                  {srv.deliverables.slice(0, 4).map((d, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FF6A2A] shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate(`/services/${srv.slug}`)}
                  className="px-5 py-2.5 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Full Service Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setStartProjectOpen(true)}
                  className="px-5 py-2.5 rounded-xl border border-[#E7E9ED] hover:bg-[#F7F8FA] text-[#111318] text-xs font-semibold transition-colors cursor-pointer"
                >
                  Inquire About This Service
                </button>
              </div>
            </div>

            {/* Service Motion Graphic Canvas */}
            <div className={`relative ${idx % 2 === 1 ? 'lg:col-span-5 lg:order-1' : 'lg:col-span-5'}`}>
              <div className="w-full">
                {motionLookup[srv.slug] || <WebsiteDevMotion />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
