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
} from '../components/motion/ServiceMotions';
import {
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  ExternalLink,
  Shield,
  Layers,
  Code,
  TrendingUp,
  Cpu,
  Video,
  Palette,
  PhoneCall,
  Globe,
  Tag,
  Gift,
  Building,
  Check,
  ChevronDown,
  Play,
  Monitor,
  Smartphone,
  SmartphoneNfc,
  Gamepad2,
  Database,
  Terminal,
  HelpCircle,
  Clock,
  Phone,
  Mail,
  MessageSquare,
} from 'lucide-react';

const serviceMotionMap: Record<string, React.ReactNode> = {
  'video-editing': <VideoEditingMotion className="mt-3" />,
  'graphic-design': <GraphicDesignMotion className="mt-3" />,
  'ai-calling': <AICallingMotion className="mt-3" />,
  'website-development': <WebsiteDevMotion className="mt-3" />,
  'ai-automation': <AIAutomationMotion className="mt-3" />,
  'seo': <SEOMotion className="mt-3" />,
  'digital-marketing': <DigitalMarketingMotion className="mt-3" />,
  'app-development': <AppDevMotion className="mt-3" />,
};

export const HomePage: React.FC = () => {
  const { settings, services, projects, blogPosts, navigate, setStartProjectOpen } = useAgency();

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const featuredProjects = projects.filter((p) => p.featured && p.published).slice(0, 4);
  const allProjects = projects.filter((p) => p.published);
  const featuredServices = services.filter((s) => s.published).slice(0, 8);
  const allServices = services.filter((s) => s.published);
  const recentArticles = blogPosts.filter((b) => b.published).slice(0, 3);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* =========================================================================
          SECTION 2: HIGH-IMPACT ANIMATED HERO SECTION
          Prompt Exact Headline: "YOUR VISION. BUILT FOR WHAT'S NEXT."
          Supporting Tagline: "We Build. We Automate. We Create."
          Description & Prominent Buttons
         ========================================================================= */}
      <section className="relative pt-8 sm:pt-16 pb-14 overflow-hidden border-b border-[#E7E9ED]/50">
        {/* Subtle engineering grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E7E9ED_1px,transparent_1px),linear-gradient(to_bottom,#E7E9ED_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_75%,transparent_100%)] opacity-35 pointer-events-none" />

        {/* Ambient Orange Glow Orb */}
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#FF6A2A]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Editorial Copy Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Studio Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F7F8FA] border border-[#E7E9ED] text-xs font-bold text-[#111318] tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-[#FF6A2A] animate-pulse" />
                <span>INDEPENDENT DIGITAL STUDIO</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-heading text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#111318] leading-[1.05]">
                <span>YOUR VISION.</span>
                <br />
                <span className="text-[#111318]">BUILT FOR WHAT'S NEXT.</span>
              </h1>

              {/* Supporting Tagline */}
              <div className="font-heading text-lg sm:text-2xl font-bold text-[#FF6A2A] tracking-tight">
                We Build. We Automate. We Create.
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg text-[#737780] leading-relaxed max-w-xl">
                RYVO helps ambitious businesses transform their ideas into powerful digital experiences through websites, mobile applications, creative content, AI automation, and digital marketing.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => navigate('/start-project')}
                  className="px-8 py-3.5 rounded-xl bg-[#FF6A2A] hover:bg-[#ff7b42] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#FF6A2A]/25 flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>START A PROJECT →</span>
                </button>

                <button
                  onClick={() => navigate('/portfolio')}
                  className="px-7 py-3.5 rounded-xl bg-white hover:bg-[#F7F8FA] text-[#111318] border border-[#E7E9ED] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>EXPLORE OUR WORK →</span>
                </button>
              </div>

              {/* Live Metric Badges */}
              <div className="pt-6 border-t border-[#E7E9ED] flex flex-wrap items-center gap-6 text-xs text-[#737780]">
                <div>
                  <span className="font-bold text-[#111318] text-sm font-heading">Sub-Second</span>
                  <span className="ml-1.5">Load Latency</span>
                </div>
                <span aria-hidden="true" className="text-[#E7E9ED]">·</span>
                <div>
                  <span className="font-bold text-[#111318] text-sm font-heading">Sub-500ms</span>
                  <span className="ml-1.5">AI Voice Response</span>
                </div>
                <span aria-hidden="true" className="text-[#E7E9ED]">·</span>
                <div>
                  <span className="font-bold text-[#111318] text-sm font-heading">Zero Junior</span>
                  <span className="ml-1.5">Delegation</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Animated Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none space-y-4">
                {/* Primary Interactive Browser Inspector Card */}
                <div className="relative z-10 transition-transform duration-500 hover:-translate-y-1 shadow-2xl rounded-3xl overflow-hidden border border-[#E7E9ED]">
                  <WebsiteDevMotion />
                </div>

                {/* Floating AI Calling & Audio Waveform Card */}
                <div className="bg-[#111318] text-white p-4 rounded-2xl border border-white/10 shadow-xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#FF6A2A] text-white flex items-center justify-center shrink-0">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Autonomous Voice Agent</div>
                      <div className="text-[10px] text-white/60 font-mono">LIVE CALL QUEUE · 284ms LATENCY</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-3 bg-[#FF6A2A] rounded-full animate-pulse" />
                    <span className="w-1 h-5 bg-[#FF6A2A] rounded-full animate-pulse delay-75" />
                    <span className="w-1 h-2 bg-[#FF6A2A] rounded-full animate-pulse delay-150" />
                    <span className="w-1 h-6 bg-white rounded-full animate-pulse delay-100" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: CAPABILITIES & TECHNOLOGY HIGHLIGHTS
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-[#F7F8FA] border border-[#E7E9ED]">
          <div className="space-y-1">
            <div className="text-[10px] font-mono font-bold text-[#FF6A2A] uppercase">ENGINEERING</div>
            <div className="font-heading font-extrabold text-base text-[#111318]">React 19 & TypeScript</div>
            <p className="text-[11px] text-[#737780]">Type-safe, componentized architecture.</p>
          </div>
          <div className="space-y-1">
            <div className="text-[10px] font-mono font-bold text-[#FF6A2A] uppercase">INTELLIGENCE</div>
            <div className="font-heading font-extrabold text-base text-[#111318]">AI Calling & Workflows</div>
            <p className="text-[11px] text-[#737780]">Automated bookings and qualification.</p>
          </div>
          <div className="space-y-1">
            <div className="text-[10px] font-mono font-bold text-[#FF6A2A] uppercase">CREATIVE</div>
            <div className="font-heading font-extrabold text-base text-[#111318]">Viral Motion & Video</div>
            <p className="text-[11px] text-[#737780]">Kinetic typography, 4K pacing & SFX.</p>
          </div>
          <div className="space-y-1">
            <div className="text-[10px] font-mono font-bold text-[#FF6A2A] uppercase">ADMINISTRATION</div>
            <div className="font-heading font-extrabold text-base text-[#111318]">Private Control Center</div>
            <p className="text-[11px] text-[#737780]">Full database CRUD with zero code.</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: REGISTRATION WITH 25% DISCOUNT PROMOTION BANNER
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#111318] via-[#1a1d24] to-[#111318] text-white border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF6A2A]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FF6A2A] uppercase tracking-wider bg-[#FF6A2A]/10 px-3 py-1 rounded-full border border-[#FF6A2A]/20">
                <Gift className="w-3.5 h-3.5" />
                <span>EXCLUSIVE CLIENT ONBOARDING BENEFIT</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                JOIN RYVO & GET 25% OFF YOUR FIRST PROJECT!
              </h2>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                Create your free account and unlock an exclusive 25% discount on your first eligible project. Your personal voucher code is generated instantly upon registration and can be applied during project brief submission.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-white/50 pt-1">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Free Client Registration</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>One-Time 25% Redemption</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Client Milestone Portal Access</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={() => navigate('/client/register')}
                className="px-8 py-4 rounded-xl bg-[#FF6A2A] hover:bg-[#ff7b42] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#FF6A2A]/30 cursor-pointer text-center"
              >
                Create Account & Claim 25% →
              </button>
              <button
                onClick={() => navigate('/start-project')}
                className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border border-white/15 text-center"
              >
                Explore Scoping
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 & 6: FEATURED SERVICES & COMPLETE 12 SERVICES OVERVIEW
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
              Complete Capabilities Directory
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111318]">
              All 12 Disciplines Engineered Under One Roof
            </h2>
            <p className="text-sm text-[#737780] max-w-xl">
              Each discipline operates with distinct visual motion graphics, senior engineering leads, and transparent SLAs.
            </p>
          </div>

          <button
            onClick={() => navigate('/services')}
            className="text-sm font-bold text-[#FF6A2A] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View Full Service Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 12 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allServices.map((srv) => (
            <div
              key={srv.id}
              onClick={() => navigate(`/services/${srv.slug}`)}
              className="group bg-white rounded-3xl p-6 border border-[#E7E9ED] hover:border-[#FF6A2A]/40 transition-all duration-300 hover:shadow-xl flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#737780] uppercase tracking-wider">
                    {srv.category}
                  </span>
                  {srv.badge && (
                    <span className="text-[10px] text-[#FF6A2A] font-bold tracking-wider uppercase bg-[#FF6A2A]/10 px-2 py-0.5 rounded-full">
                      {srv.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-heading text-xl font-bold text-[#111318] group-hover:text-[#FF6A2A] transition-colors mt-2">
                  {srv.title}
                </h3>
                <p className="text-xs text-[#737780] line-clamp-2 mt-1 leading-relaxed">
                  {srv.shortDescription}
                </p>

                {/* Embedded Motion Graphic */}
                <div className="my-3 pointer-events-none">
                  {serviceMotionMap[srv.slug] || <WebsiteDevMotion />}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E9ED] flex items-center justify-between text-xs font-bold text-[#111318] group-hover:text-[#FF6A2A]">
                <span>Explore Capabilities</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 & 8: FEATURED PORTFOLIO & INTERACTIVE PROJECT SHOWCASE
          Includes Gusto & Co. Artisan Bistro & Culinary Web App
         ========================================================================= */}
      <section className="bg-[#F7F8FA] py-20 border-y border-[#E7E9ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
                Proof of Execution
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111318]">
                Interactive Live Website Showcases
              </h2>
              <p className="text-sm text-[#737780] max-w-xl">
                Hover to auto-scroll viewports, launch interactive browser frames, or inspect original live sites.
              </p>
            </div>

            <button
              onClick={() => navigate('/portfolio')}
              className="text-sm font-bold text-[#111318] hover:text-[#FF6A2A] flex items-center gap-1.5 transition-colors cursor-pointer group"
            >
              <span>Explore All Projects ({allProjects.length})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <WebsitePreviewCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9 & 10: ABOUT RYVO & WHY CHOOSE RYVO
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111318] text-white rounded-3xl p-8 sm:p-14 border border-white/10 relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
              The RYVO Standard
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Speed, Architecture & Real Business Utility.
            </h2>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              We reject bloated page builders, slow legacy templates, and generic agency retainers that produce no measurable outcomes. Every product is architected with modern TypeScript, modular zero-pill aesthetics, responsive layouts, and transparent backends that you control.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10 relative z-10">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#FF6A2A]">
                <Zap className="w-5 h-5" />
              </div>
              <div className="font-heading font-bold text-base text-white">Fullstack Ownership</div>
              <p className="text-xs text-white/60 leading-relaxed">
                Frontend, backend API, persistent database, and private admin portal delivered as a single cohesive engine.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#FF6A2A]">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="font-heading font-bold text-base text-white">Autonomous AI Systems</div>
              <p className="text-xs text-white/60 leading-relaxed">
                Conversational voice calling and automated webhook pipelines that save hundreds of human operational hours.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#FF6A2A]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="font-heading font-bold text-base text-white">Viral Media Production</div>
              <p className="text-xs text-white/60 leading-relaxed">
                Short-form vertical video editing and brand systems engineered to stop thumbs and drive organic traction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11: OUR 5-STAGE PROCESS WORKFLOW
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
            Systematic Delivery
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111318]">
            Our 5-Stage Engineering Workflow
          </h2>
          <p className="text-sm text-[#737780]">
            From initial requirements scoping to post-launch optimization, every milestone is structured for transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { step: '01', title: 'Discover', desc: 'Identify bottlenecks, audience behavior, and technical constraints.' },
            { step: '02', title: 'Plan', desc: 'Sitemap hierarchy, interactive wireframes, and database architecture.' },
            { step: '03', title: 'Create', desc: 'Production design, TypeScript engineering, and custom motion graphics.' },
            { step: '04', title: 'Launch', desc: 'Rigorous cross-browser stress testing, security hardening, and live deployment.' },
            { step: '05', title: 'Optimize', desc: 'Performance telemetry, conversion tracking, and iterative growth.' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-[#E7E9ED] hover:border-[#FF6A2A] transition-all group flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="font-mono text-2xl font-bold text-[#FF6A2A]">
                  {item.step}
                </span>
                <h3 className="font-heading font-bold text-lg text-[#111318] group-hover:text-[#FF6A2A] transition-colors mt-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#737780] leading-relaxed mt-1">
                  {item.desc}
                </p>
              </div>
              <div className="w-full h-1 bg-[#F7F8FA] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FF6A2A] transition-all duration-500"
                  style={{ width: `${(idx + 1) * 20}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 12: INDUSTRIES WE SERVE
         ========================================================================= */}
      <section className="bg-[#F7F8FA] py-20 border-y border-[#E7E9ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
                Target Sectors
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111318]">
                Industries Engineered for Scale
              </h2>
              <p className="text-sm text-[#737780] max-w-xl">
                Domain-specific solutions tailored for conversion dynamics and compliance.
              </p>
            </div>
            <button
              onClick={() => navigate('/industries')}
              className="text-sm font-bold text-[#FF6A2A] hover:underline"
            >
              Explore All 10 Industry Tracks →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Startups & Scaleups', tag: 'Fast MVP & Series A Ready' },
              { name: 'Restaurants & Hospitality', tag: 'Online Ordering & Table Res' },
              { name: 'E-commerce Brands', tag: 'High-Converting Checkouts' },
              { name: 'Health & Wellness', tag: 'HIPAA-Aware Portals' },
              { name: 'Creators & Personal Brands', tag: 'Viral Video Retainers' },
              { name: 'Real Estate & Luxury', tag: 'Interactive 3D Virtual Tours' },
              { name: 'B2B SaaS & Tech', tag: 'API Dashboards & Docs' },
              { name: 'Professional Services', tag: 'Client Acquisition Funnels' },
              { name: 'Education & EdTech', tag: 'Course Platforms & Portals' },
              { name: 'FinTech & Finance', tag: 'Security-Hardened Systems' },
            ].map((ind, idx) => (
              <div
                key={idx}
                onClick={() => navigate('/industries')}
                className="p-4 rounded-2xl bg-white border border-[#E7E9ED] hover:border-[#FF6A2A] transition-all cursor-pointer group space-y-1"
              >
                <div className="font-heading font-bold text-xs text-[#111318] group-hover:text-[#FF6A2A] transition-colors">
                  {ind.name}
                </div>
                <div className="text-[10px] text-[#737780]">{ind.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 13: TECHNOLOGIES & TOOLS SHOWCASE
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-2">
          <div className="text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
            Modern Tech Stack
          </div>
          <h2 className="font-heading text-3xl font-extrabold text-[#111318]">
            Built with Modern, Battle-Tested Engineering
          </h2>
          <p className="text-xs sm:text-sm text-[#737780] max-w-lg mx-auto">
            Zero dependency lock-in. Clean, modular TypeScript and modern frameworks you own completely.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
          {[
            'React 19',
            'TypeScript 7',
            'Tailwind CSS v4',
            'Node.js & Express',
            'Vite',
            'Framer Motion',
            'PostgreSQL & Cloud SQL',
            'Google Gemini API',
            'OpenAI Whisper',
            'LiveKit WebRTC',
            'Stripe & Shopify',
            'Docker & Cloud Run',
          ].map((tech, idx) => (
            <span
              key={idx}
              className="px-4 py-2 rounded-xl bg-[#F7F8FA] border border-[#E7E9ED] text-xs font-mono font-semibold text-[#111318]"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 19: PRICING & PACKAGES PREVIEW
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
            Transparent Investment
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#111318]">
            Fixed Milestone Packages
          </h2>
          <p className="text-xs sm:text-sm text-[#737780]">
            Indicative scopes tailored for scale. New accounts receive an additional 25% discount.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Launchpad',
              price: '$2,500',
              desc: 'Essential flagship web build or targeted viral video package.',
              features: ['5 Core Responsive Views', 'Custom Motion Branding', 'Lead Inquiries Engine', 'Admin Content Editor', '2-Week Delivery'],
            },
            {
              name: 'Growth & Scale',
              price: '$5,800',
              featured: true,
              desc: 'Full-scale agency web architecture, AI calling bot & video suite.',
              features: ['Complete 12-Service CMS', 'Interactive Browser Previews', 'Sub-500ms Voice Agent Bot', 'Client Portal & Messaging', 'SEO & Analytics Telemetry'],
            },
            {
              name: 'Enterprise Custom',
              price: 'Custom Scope',
              desc: 'Dedicated bespoke engineering, mobile apps & automated workflows.',
              features: ['Fullstack TypeScript & PostgreSQL', 'Autonomous Webhook Pipelines', 'Dedicated Slack Channel SLA', 'Full IP & Code Transfer', 'Continuous Support'],
            },
          ].map((pkg, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl border transition-all flex flex-col justify-between ${
                pkg.featured
                  ? 'bg-[#111318] text-white border-[#111318] shadow-2xl scale-[1.02]'
                  : 'bg-white text-[#111318] border-[#E7E9ED]'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-extrabold text-lg">{pkg.name}</span>
                  {pkg.featured && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FF6A2A] text-white text-[10px] font-mono font-bold uppercase">
                      MOST POPULAR
                    </span>
                  )}
                </div>
                <div className="font-heading font-extrabold text-3xl">{pkg.price}</div>
                <p className={`text-xs ${pkg.featured ? 'text-white/70' : 'text-[#737780]'}`}>
                  {pkg.desc}
                </p>
                <div className="pt-4 border-t border-current/10 space-y-2.5 text-xs">
                  {pkg.features.map((f, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#FF6A2A]" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => navigate('/start-project')}
                  className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    pkg.featured
                      ? 'bg-[#FF6A2A] hover:bg-[#ff7b42] text-white shadow-lg shadow-[#FF6A2A]/20'
                      : 'bg-[#111318] hover:bg-[#FF6A2A] text-white'
                  }`}
                >
                  Request Proposal →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 21: FREQUENTLY ASKED QUESTIONS
         ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
            Clear Answers
          </div>
          <h2 className="font-heading text-3xl font-extrabold text-[#111318]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3 pt-4">
          {[
            {
              q: 'How does the 25% registration discount work?',
              a: 'When you register a free client account, our system generates a unique voucher code (e.g. RYVO25-XXXXXX). You can apply this code when submitting your first project brief to receive 25% off milestone pricing.',
            },
            {
              q: 'Can I add live website URLs to my portfolio from the admin panel?',
              a: 'Yes. Our private administration panel allows you to enter any external website URL. The system automatically renders a responsive browser-style preview with optional hover auto-scrolling, or falls back gracefully if the target website prohibits iframe embedding.',
            },
            {
              q: 'Do I own the intellectual property and source code?',
              a: '100%. Upon settlement of project milestones, complete ownership of source code, design Figma tokens, media assets, and database schemas transfers irrevocably to you.',
            },
            {
              q: 'How does the AI Calling Agent work?',
              a: 'Our voice agents use sub-500ms low-latency speech pipelines to answer inbound customer inquiries, qualify leads, and schedule appointments directly into your business calendar.',
            },
          ].map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#E7E9ED] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm text-[#111318] hover:text-[#FF6A2A] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#737780] transition-transform ${
                    activeFaq === idx ? 'rotate-180 text-[#FF6A2A]' : ''
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 text-xs text-[#737780] leading-relaxed border-t border-[#E7E9ED]/50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 22: LATEST INSIGHTS AND ARTICLES PREVIEW
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <div className="text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
              Engineering Notes
            </div>
            <h2 className="font-heading text-3xl font-extrabold text-[#111318]">
              Latest Insights & Technical Teardowns
            </h2>
          </div>
          <button
            onClick={() => navigate('/blog')}
            className="text-sm font-bold text-[#FF6A2A] hover:underline"
          >
            Explore Blog Archive →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentArticles.map((post) => (
            <article
              key={post.id}
              onClick={() => navigate(`/blog/${post.slug}`)}
              className="group bg-white rounded-3xl border border-[#E7E9ED] overflow-hidden hover:border-[#FF6A2A] transition-all cursor-pointer shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden bg-[#111318]">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <div className="text-[10px] font-mono text-[#FF6A2A] uppercase">
                    {post.category} · {post.readTime}
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#111318] group-hover:text-[#FF6A2A] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#737780] line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 text-xs font-bold text-[#FF6A2A] flex items-center gap-1">
                <span>Read Teardown</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 24 & 25: START A PROJECT CTA & DIRECT CONTACT CHANNELS
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-[#F7F8FA] rounded-3xl p-8 sm:p-14 border border-[#E7E9ED] text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF6A2A] uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-[#E7E9ED]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6A2A]" />
            <span>Official Communications Queue</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#111318] tracking-tight max-w-xl mx-auto">
            Ready to Build What's Next?
          </h2>

          <p className="text-xs sm:text-base text-[#737780] max-w-lg mx-auto">
            Initiate a project brief or connect directly through our official channels.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/start-project')}
              className="px-8 py-3.5 rounded-xl bg-[#FF6A2A] hover:bg-[#ff7b42] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#FF6A2A]/25 cursor-pointer"
            >
              Start a Project (Step 1 of 6) →
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-3.5 rounded-xl bg-white hover:bg-[#F7F8FA] text-[#111318] border border-[#E7E9ED] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Contact RYVO
            </button>
          </div>

          {/* Direct Contact Shortcuts */}
          <div className="pt-6 border-t border-[#E7E9ED] flex flex-wrap items-center justify-center gap-8 text-xs text-[#737780]">
            <a
              href="tel:+923082436424"
              className="hover:text-[#FF6A2A] flex items-center gap-2 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF6A2A]" />
              <span>+92 308 2436424</span>
            </a>
            <a
              href="mailto:alexmorgan012012012@gmail.com"
              className="hover:text-[#FF6A2A] flex items-center gap-2 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#FF6A2A]" />
              <span>alexmorgan012012012@gmail.com</span>
            </a>
            <a
              href="https://wa.me/923082436424"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-600 flex items-center gap-2 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
