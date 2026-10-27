import React from 'react';
import { useAgency } from '../context/AgencyContext';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ProcessPage: React.FC = () => {
  const { navigate, setStartProjectOpen } = useAgency();

  const steps = [
    {
      num: '01',
      title: 'Discover & Scope',
      subtitle: 'Eliminating guesswork before writing a single line of code.',
      desc: 'We conduct a technical and commercial discovery session to dissect your target customer journey, current friction points, and operational bottlenecks. We map deliverables, API dependencies, and performance benchmarks.',
      deliverables: ['Requirements Specification Document', 'Technical Architecture Map', 'Timeline & Milestone Budget'],
    },
    {
      num: '02',
      title: 'Plan & Wireframe',
      subtitle: 'Designing information architecture with conversion intentionality.',
      desc: 'We craft high-contrast wireframes, typographic systems, and schema hierarchies. Every button, interaction, and data state is reviewed and approved before production build commences.',
      deliverables: ['Figma High-Fidelity Prototypes', 'Design System & Component Library', 'Database Schema Specification'],
    },
    {
      num: '03',
      title: 'Create & Engineer',
      subtitle: 'Production code and media assets cut with relentless precision.',
      desc: 'Our senior developers and motion artists execute the approved designs. We write clean, typed TypeScript, construct private admin portals, implement custom motion graphics, and integrate autonomous AI agents.',
      deliverables: ['Fullstack TypeScript Codebase', 'Bespoke Motion Graphics Assets', 'Private Admin Management Portal'],
    },
    {
      num: '04',
      title: 'Launch & Verify',
      subtitle: 'Zero-downtime deployment and rigorous cross-platform auditing.',
      desc: 'We conduct full Lighthouse audits, cross-device compatibility testing (iOS, Android, macOS, Windows), security header configuration, and Core Web Vitals validation before pointing production DNS.',
      deliverables: ['Production Cloud Deployment', 'Lighthouse 95+ Score Audit', 'Admin Portal Credentials & Guide'],
    },
    {
      num: '05',
      title: 'Optimize & Scale',
      subtitle: 'Continuous growth monitoring and data-backed iteration.',
      desc: 'Post-launch telemetry tracks visitor engagement, inquiry conversions, and voice calling latency. We iterate on high-leverage opportunities to compound your business return on investment.',
      deliverables: ['First-Party Visitor Telemetry', 'Conversion Rate Optimization', 'Dedicated Priority SLA Support'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Systematic Delivery Engine</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-[#111318] tracking-tight">
          Our 5-Stage Process
        </h1>
        <p className="text-base sm:text-lg text-[#737780] leading-relaxed">
          How RYVO engineers digital experiences from initial brief to high-performance scale.
        </p>
      </div>

      {/* Steps List */}
      <div className="space-y-8">
        {steps.map((s, idx) => (
          <div
            key={idx}
            className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E7E9ED] hover:border-[#FF6A2A]/40 transition-all duration-300 shadow-sm hover:shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            <div className="lg:col-span-3 space-y-2">
              <span className="font-mono text-4xl font-extrabold text-[#FF6A2A]">
                {s.num}
              </span>
              <h2 className="font-heading text-2xl font-bold text-[#111318]">
                {s.title}
              </h2>
              <div className="text-xs text-[#737780] font-medium leading-relaxed">
                {s.subtitle}
              </div>
            </div>

            <div className="lg:col-span-9 space-y-6">
              <p className="text-sm text-[#202124] leading-relaxed">
                {s.desc}
              </p>

              <div className="pt-4 border-t border-[#E7E9ED]">
                <div className="text-xs font-bold text-[#111318] uppercase tracking-wider mb-2">
                  Stage Deliverables
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {s.deliverables.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-[#737780]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6A2A] shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Process CTA */}
      <div className="bg-[#111318] text-white p-10 rounded-3xl text-center space-y-4">
        <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
          Experience the RYVO Standard
        </h3>
        <p className="text-sm text-white/70 max-w-md mx-auto">
          We are currently taking on select projects for this quarter. Schedule a discovery call to review timeline availability.
        </p>
        <button
          onClick={() => setStartProjectOpen(true)}
          className="px-8 py-3.5 rounded-xl bg-[#FF6A2A] hover:bg-[#ff7b42] text-white font-semibold text-xs transition-colors cursor-pointer"
        >
          Start a Project Brief
        </button>
      </div>
    </div>
  );
};
