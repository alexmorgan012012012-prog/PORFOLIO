import React, { useState } from 'react';
import { useAgency } from '../context/AgencyContext';
import { WebsitePreviewCard } from '../components/portfolio/WebsitePreviewCard';
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
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Phone,
  Mail,
  MessageSquare,
  HelpCircle,
  Briefcase,
  Layers,
} from 'lucide-react';

const motionLookup: Record<string, React.ReactNode> = {
  'video-editing': <VideoEditingMotion className="w-full" />,
  'graphic-design': <GraphicDesignMotion className="w-full" />,
  'ai-calling-agents': <AICallingMotion className="w-full" />,
  'website-development': <WebsiteDevMotion className="w-full" />,
  'ai-automation': <AIAutomationMotion className="w-full" />,
  'seo-services': <SEOMotion className="w-full" />,
  'digital-marketing': <DigitalMarketingMotion className="w-full" />,
  'app-development': <AppDevMotion className="w-full" />,
  'game-development': <GameDevMotion className="w-full" />,
};

export const ServiceDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { services, projects, settings, navigate, setStartProjectOpen } = useAgency();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const service = services.find((s) => s.slug === slug) || services[0];

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold">Service Not Found</h1>
        <button
          onClick={() => navigate('/services')}
          className="px-4 py-2 bg-[#111318] text-white rounded-xl text-sm"
        >
          View All Services
        </button>
      </div>
    );
  }

  // Related projects
  const relatedProjects = projects
    .filter((p) => p.published && p.category.toLowerCase().includes(service.title.toLowerCase().split(' ')[0]))
    .slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
      {/* Service Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#737780]">
            <button onClick={() => navigate('/services')} className="hover:text-[#FF6A2A]">
              Services
            </button>
            <span>/</span>
            <span className="text-[#FF6A2A] font-bold">{service.category}</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#111318] tracking-tight">
            {service.title}
          </h1>

          <div className="font-heading text-xl sm:text-2xl font-bold text-[#FF6A2A]">
            {service.tagline}
          </div>

          <p className="text-base sm:text-lg text-[#737780] leading-relaxed">
            {service.fullDescription}
          </p>

          {service.startingPrice && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#F7F8FA] border border-[#E7E9ED] text-xs font-mono text-[#111318]">
              <span className="text-[#737780]">Pricing:</span>
              <span className="font-bold">{service.startingPrice}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setStartProjectOpen(true)}
              className="px-7 py-3.5 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white font-semibold text-sm transition-all shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <span>Commission {service.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#F7F8FA] text-[#111318] border border-[#E7E9ED] font-semibold text-sm transition-all cursor-pointer"
            >
              Discuss Scope
            </button>
          </div>
        </div>

        {/* Hero Visual Motion */}
        <div className="lg:col-span-5">
          <div className="w-full">
            {motionLookup[service.slug] || <WebsiteDevMotion />}
          </div>
        </div>
      </section>

      {/* What is Included & Deliverables */}
      <section className="bg-[#F7F8FA] rounded-3xl p-8 sm:p-12 border border-[#E7E9ED] space-y-8">
        <div className="space-y-2">
          <div className="text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
            Scope & Outputs
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#111318]">
            What is Included
          </h2>
          <p className="text-sm text-[#737780]">
            Every delivery includes full source assets, production-ready documentation, and post-launch support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {service.deliverables.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-[#E7E9ED] flex items-start gap-3 shadow-sm"
            >
              <div className="w-6 h-6 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF6A2A]" />
              </div>
              <span className="text-sm font-medium text-[#202124] leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Business Use Cases */}
      {service.useCases && service.useCases.length > 0 && (
        <section className="space-y-8">
          <div className="space-y-2">
            <div className="text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
              Strategic Value
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#111318]">
              Target Business Use Cases
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.useCases.map((uc, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-[#E7E9ED] bg-white space-y-2 hover:border-[#FF6A2A]/40 transition-colors"
              >
                <div className="text-xs font-mono font-bold text-[#FF6A2A]">CASE 0{idx + 1}</div>
                <p className="text-sm text-[#202124] leading-relaxed">{uc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Delivery Workflow Steps */}
      {service.workflowSteps && service.workflowSteps.length > 0 && (
        <section className="space-y-8">
          <div className="space-y-2">
            <div className="text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
              Methodology
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#111318]">
              Service Workflow
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.workflowSteps.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-2xl bg-white border border-[#E7E9ED] space-y-3"
              >
                <div className="w-8 h-8 rounded-xl bg-[#111318] text-[#FF6A2A] flex items-center justify-center font-mono font-bold text-xs">
                  {step.step}
                </div>
                <h3 className="font-heading font-bold text-base text-[#111318]">{step.title}</h3>
                <p className="text-xs text-[#737780] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Relevant Portfolio Projects */}
      {relatedProjects.length > 0 && (
        <section className="space-y-8 pt-6 border-t border-[#E7E9ED]">
          <div className="space-y-2">
            <div className="text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
              Relevant Work
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#111318]">
              Case Studies in {service.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProjects.map((p) => (
              <WebsitePreviewCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <div className="text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
              Inquiries & Answers
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#111318]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {service.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#E7E9ED] bg-white overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-semibold text-sm sm:text-base text-[#111318] hover:text-[#FF6A2A] transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#737780] transition-transform ${
                      openFaqIndex === idx ? 'rotate-180 text-[#FF6A2A]' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#737780] leading-relaxed border-t border-[#E7E9ED]/60 bg-[#F7F8FA]">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="bg-[#111318] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight">
          Ready to Deploy {service.title}?
        </h2>
        <p className="text-sm text-white/70 max-w-md mx-auto">
          Contact RYVO today for a customized technical architecture brief and timeline estimate.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setStartProjectOpen(true)}
            className="px-8 py-3.5 rounded-xl bg-[#FF6A2A] hover:bg-[#ff7b42] text-white font-semibold text-sm transition-all shadow-lg cursor-pointer"
          >
            Start a Project Brief
          </button>
          <a
            href={settings?.whatsappUrl || 'https://wa.me/923082436424'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Chat via WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  );
};
