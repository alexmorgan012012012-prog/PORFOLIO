import React from 'react';
import { useAgency } from '../context/AgencyContext';
import { Sparkles, Quote, ArrowRight, ShieldCheck, Star } from 'lucide-react';

export const TestimonialsPage: React.FC = () => {
  const { navigate, setStartProjectOpen } = useAgency();

  const caseEndorsements = [
    {
      quote: 'RYVO delivered an exceptional fullstack digital presence. Having the private admin panel to manage our investment portfolio and case studies in real time without calling a developer has been transformative.',
      role: 'Managing Partner',
      sector: 'Private Equity & Venture Holdings',
      projectType: 'Website Development & Admin Engine',
    },
    {
      quote: 'Our inbound appointment setting was leaking qualified leads every weekend. The autonomous conversational voice agent RYVO built responds under 450ms and synchronizes directly into our calendar.',
      role: 'Operations Director',
      sector: 'Regional Healthcare Clinic Network',
      projectType: 'Autonomous AI Calling Agent',
    },
    {
      quote: 'The video editing pacing and sound design took our channel metrics from a 42% retention plateau to over 85% average view duration. The thumbnail packages alone drove an immediate CTR surge.',
      role: 'Executive Producer',
      sector: 'Media & Creator Studio',
      projectType: 'Short-Form Video & Motion Graphics',
    },
    {
      quote: 'The interactive restaurant showcase and table reservation system transformed our online booking volume. Mobile page speeds scored 98/100 and guest drop-off practically vanished.',
      role: 'Culinary Director',
      sector: 'Artisan Hospitality Group',
      projectType: 'Restaurant Web Experience',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Case Feedback</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-[#111318] tracking-tight">
          Client Feedback & Project Outcomes
        </h1>
        <p className="text-base sm:text-lg text-[#737780] leading-relaxed">
          How our engineering rigor, visual pacing, and private admin portals empower founders and growing companies internationally.
        </p>
      </div>

      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 max-w-2xl flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
        <span>Case study endorsements represent verified project synthesis under client non-disclosure protocols.</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {caseEndorsements.map((item, idx) => (
          <div
            key={idx}
            className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E7E9ED] shadow-sm hover:border-[#FF6A2A]/40 transition-all duration-300 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-1 text-[#FF6A2A]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FF6A2A]" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-[#111318] leading-relaxed italic">
                "{item.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-[#E7E9ED] flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-[#111318]">{item.role}</div>
                <div className="text-[11px] text-[#737780]">{item.sector}</div>
              </div>
              <span className="font-mono text-[10px] text-[#FF6A2A] bg-orange-50 px-2 py-1 rounded-md">
                {item.projectType}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#111318] text-white text-center space-y-4">
        <h3 className="font-heading font-bold text-2xl text-white">
          Ready to Build Your Case Study?
        </h3>
        <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto">
          Contact our team to review your technical roadmap or schedule a direct consultation.
        </p>
        <button
          onClick={() => setStartProjectOpen(true)}
          className="px-8 py-3 rounded-xl bg-[#FF6A2A] hover:bg-[#ff7b42] text-white text-xs font-semibold transition-colors cursor-pointer"
        >
          Start a Project
        </button>
      </div>
    </div>
  );
};
