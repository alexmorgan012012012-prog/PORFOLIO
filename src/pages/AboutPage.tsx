import React from 'react';
import { useAgency } from '../context/AgencyContext';
import {
  Sparkles,
  Zap,
  Cpu,
  Layers,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Code2,
  Terminal,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { settings, navigate, setStartProjectOpen } = useAgency();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
      {/* Hero */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Independent Digital Studio</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-[#111318] tracking-tight">
          About RYVO Digital Agency
        </h1>
        <div className="font-heading text-xl sm:text-2xl font-bold text-[#FF6A2A]">
          {settings?.tagline || 'We Build. We Automate. We Create.'}
        </div>
        <p className="text-base sm:text-lg text-[#737780] leading-relaxed">
          {settings?.supportingStatement || 'Digital experiences engineered for growth.'}
        </p>
      </div>

      {/* Philosophy Statement */}
      <section className="bg-[#111318] text-white rounded-3xl p-8 sm:p-14 border border-white/10 space-y-8">
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold text-[#FF6A2A] uppercase tracking-wider">
            Our Core Thesis
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight">
            Engineering Rigor Meets High-Pacing Creative Production.
          </h2>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            Most digital agencies force you to choose between beautiful visuals that load slowly or fast code that looks dated. RYVO was founded to abolish this compromise. We combine Swiss typographic discipline, sub-second TypeScript architectures, and autonomous AI pipelines into unified products that compound enterprise value.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
          <div className="space-y-2">
            <div className="font-mono text-xl font-bold text-[#FF6A2A]">01 / Precision</div>
            <p className="text-xs text-white/60">
              Clean zero-pill design systems, high-contrast editorial typography, and disciplined layouts that command authority.
            </p>
          </div>
          <div className="space-y-2">
            <div className="font-mono text-xl font-bold text-[#FF6A2A]">02 / Speed</div>
            <p className="text-xs text-white/60">
              Lighthouse 95+ score baselines, sub-500ms voice agent response budgets, and rapid production cycles.
            </p>
          </div>
          <div className="space-y-2">
            <div className="font-mono text-xl font-bold text-[#FF6A2A]">03 / Control</div>
            <p className="text-xs text-white/60">
              Dedicated private admin dashboards for every client so you can manage copy, projects, and media without paying maintenance tolls.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities Stack */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
            Modern Tech Stack
          </div>
          <h2 className="font-heading text-3xl font-extrabold text-[#111318]">
            Built with Industry-Leading Standards
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Frontend Systems', desc: 'React 19, TypeScript, Tailwind CSS, Framer Motion, WebGL' },
            { title: 'Backend & APIs', desc: 'Node.js, Express, PostgreSQL, REST, Webhooks, Server-Sent Events' },
            { title: 'AI & Voice Engines', desc: 'Conversational Voice AI, LLM RAG pipelines, Neural TTS, Webhooks' },
            { title: 'Media Production', desc: '4K ProRes, After Effects, DaVinci Resolve, Figma, Adobe Suite' },
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-[#E7E9ED] space-y-2 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-[#F7F8FA] border border-[#E7E9ED] flex items-center justify-center text-[#FF6A2A]">
                <Code2 className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#111318]">{item.title}</h3>
              <p className="text-xs text-[#737780] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="p-10 rounded-3xl bg-[#F7F8FA] border border-[#E7E9ED] text-center space-y-4">
        <h3 className="font-heading font-bold text-2xl text-[#111318]">
          Let's Build Something Exceptional Together
        </h3>
        <p className="text-sm text-[#737780] max-w-md mx-auto">
          Contact our team to review your technical roadmap or schedule a direct consultation.
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
