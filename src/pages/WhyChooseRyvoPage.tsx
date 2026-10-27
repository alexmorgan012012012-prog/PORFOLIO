import React from 'react';
import { useAgency } from '../context/AgencyContext';
import { Sparkles, CheckCircle2, Zap, ArrowRight, Shield, Award, Users, Code2 } from 'lucide-react';

export const WhyChooseRyvoPage: React.FC = () => {
  const { navigate, setStartProjectOpen } = useAgency();

  const reasons = [
    {
      title: 'Fullstack Ownership & Private Admin Access',
      desc: 'You are never held hostage by an agency retainer just to update text, replace project images, or check customer inquiries. Every client gets their own dedicated private admin portal.',
    },
    {
      title: 'Sub-Second Performance & Lighthouse 95+ Baselines',
      desc: 'We do not build on bloated WordPress themes or sluggish page builders. Every line of TypeScript is engineered for speed, clean DOM rendering, and instant Core Web Vitals.',
    },
    {
      title: 'Zero-Pill Typographic Restraint',
      desc: 'Our interfaces look like they were designed by Swiss typography masters, not an AI model repeating purple gradients and rounded capsule bubbles. High authority, high readability.',
    },
    {
      title: 'Autonomous AI Voice & Calling Systems',
      desc: 'We engineer real, working sub-500ms voice agents that pick up your phone, qualify leads, and synchronize calendar bookings into your CRM 24 hours a day, 7 days a week.',
    },
    {
      title: '100% Intellectual Property Handover',
      desc: 'Upon final settlement, you own 100% of the source code, Figma design files, media assets, and database architecture. Zero proprietary agency lock-in.',
    },
    {
      title: 'Transparent Milestones & Fixed Pricing',
      desc: 'No unpredictable hourly billing surprises. We scope requirements, agree on deliverables, and execute within agreed milestone budgets.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The RYVO Standard</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-[#111318] tracking-tight">
          Why Ambitious Brands Choose RYVO
        </h1>
        <p className="text-base sm:text-lg text-[#737780] leading-relaxed">
          We combine the aesthetic mastery of a boutique creative studio with the architectural discipline of a senior software engineering firm.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((r, idx) => (
          <div
            key={idx}
            className="p-8 rounded-3xl bg-white border border-[#E7E9ED] hover:border-[#FF6A2A]/40 transition-all duration-300 shadow-sm hover:shadow-xl space-y-3"
          >
            <div className="w-8 h-8 rounded-xl bg-[#111318] text-[#FF6A2A] flex items-center justify-center font-mono font-bold text-xs">
              0{idx + 1}
            </div>
            <h3 className="font-heading font-bold text-lg text-[#111318]">
              {r.title}
            </h3>
            <p className="text-xs text-[#737780] leading-relaxed">
              {r.desc}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="p-10 rounded-3xl bg-[#F7F8FA] border border-[#E7E9ED] text-center space-y-4">
        <h3 className="font-heading font-bold text-2xl text-[#111318]">
          Ready to Experience Real Digital Velocity?
        </h3>
        <p className="text-xs text-[#737780] max-w-md mx-auto">
          Start your project brief today or schedule a technical discovery session with our lead architects.
        </p>
        <button
          onClick={() => setStartProjectOpen(true)}
          className="px-8 py-3 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white text-xs font-semibold transition-colors cursor-pointer"
        >
          Start a Project
        </button>
      </div>
    </div>
  );
};
