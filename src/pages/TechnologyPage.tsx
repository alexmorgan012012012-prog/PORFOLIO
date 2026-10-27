import React from 'react';
import { useAgency } from '../context/AgencyContext';
import {
  Sparkles,
  Cpu,
  Layers,
  Code2,
  Terminal,
  Zap,
  ShieldCheck,
  Database,
  Globe,
  ArrowRight,
} from 'lucide-react';

export const TechnologyPage: React.FC = () => {
  const { navigate, setStartProjectOpen } = useAgency();

  const stacks = [
    {
      category: 'Frontend Engineering',
      tools: [
        { name: 'React 19 & TypeScript', desc: 'Strict typing, modern hooks, zero runtime regressions.' },
        { name: 'Vite & Next.js', desc: 'Sub-second compilation, edge rendering, and optimal tree-shaking.' },
        { name: 'Tailwind CSS v4', desc: 'Zero-pill discipline, minimal bundle footprint, and custom design tokens.' },
        { name: 'Framer Motion & Three.js', desc: '60FPS fluid gestures, micro-interactions, and WebGL canvases.' },
      ],
    },
    {
      category: 'Backend & Data Persistence',
      tools: [
        { name: 'Node.js & Express / Fastify', desc: 'High-concurrency event loops, clean REST APIs, and signed webhooks.' },
        { name: 'PostgreSQL & SQLite', desc: 'ACID compliance, relational integrity, and rapid indexed queries.' },
        { name: 'WebSockets & SSE', desc: 'Real-time telemetry, live call transcripts, and instant client notifications.' },
        { name: 'Cloud Run & Docker', desc: 'Automated horizontal scaling and zero-downtime rolling deploys.' },
      ],
    },
    {
      category: 'AI & Autonomous Voice Infrastructure',
      tools: [
        { name: 'Sub-500ms Voice Synthesis', desc: 'Neural low-latency speech engines with natural conversational breathing.' },
        { name: 'LLM Function Calling', desc: 'Structured JSON output parsing and autonomous database mutations.' },
        { name: 'Vector RAG Pipelines', desc: 'Proprietary knowledge base ingestion for precise support responses.' },
        { name: 'CRM & Webhook Connectors', desc: 'Bidirectional sync with HubSpot, Salesforce, and custom REST APIs.' },
      ],
    },
    {
      category: 'Media & Creative Toolset',
      tools: [
        { name: '4K ProRes Pacing Suites', desc: 'DaVinci Resolve and Adobe Premiere Pro for cinematic color grading.' },
        { name: 'After Effects & Blender', desc: '2D/3D kinetic typography, spatial tracking, and particle simulation.' },
        { name: 'Figma Auto-Layout Systems', desc: 'Comprehensive token-based design systems and interactive prototypes.' },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Architectural Infrastructure</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-[#111318] tracking-tight">
          Technology & Toolstack
        </h1>
        <p className="text-base sm:text-lg text-[#737780] leading-relaxed">
          We use battle-tested, modern technologies to build software that scales cleanly, loads instantly, and delivers uncompromised reliability.
        </p>
      </div>

      {/* Grid of Technology Categories */}
      <div className="space-y-12">
        {stacks.map((stack, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="font-heading text-xl font-bold text-[#111318] border-b border-[#E7E9ED] pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6A2A]" />
              <span>{stack.category}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stack.tools.map((t, tIdx) => (
                <div
                  key={tIdx}
                  className="p-5 rounded-2xl bg-white border border-[#E7E9ED] shadow-sm hover:border-[#FF6A2A]/40 transition-all space-y-2"
                >
                  <div className="font-heading font-bold text-sm text-[#111318]">{t.name}</div>
                  <p className="text-xs text-[#737780] leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Infrastructure CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#111318] text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <div className="text-xs font-bold text-[#FF6A2A] uppercase">Zero Technical Debt</div>
          <h3 className="font-heading font-bold text-2xl text-white">
            Have custom infrastructure or legacy stack requirements?
          </h3>
          <p className="text-xs text-white/70">
            We adapt seamlessly to your existing cloud infrastructure, GitHub workflows, and CI/CD pipelines.
          </p>
        </div>
        <button
          onClick={() => setStartProjectOpen(true)}
          className="px-6 py-3 rounded-xl bg-[#FF6A2A] hover:bg-[#ff7b42] text-white text-xs font-semibold shrink-0 transition-colors cursor-pointer"
        >
          Discuss Tech Specs
        </button>
      </div>
    </div>
  );
};
