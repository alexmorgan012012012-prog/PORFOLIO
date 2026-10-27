import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  PhoneCall,
  Mic,
  Activity,
  Layers,
  Code,
  Sparkles,
  Zap,
  CheckCircle2,
  Search,
  TrendingUp,
  BarChart3,
  Smartphone,
  Gamepad2,
  Cpu,
  ArrowUpRight,
  RefreshCw,
  Sliders,
} from 'lucide-react';

// =========================================================================
// 1. VIDEO EDITING MOTION
// Animated video timeline, scrub playhead, audio channels, and frame slices
// =========================================================================
export const VideoEditingMotion: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [playheadPos, setPlayheadPos] = useState(25);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setPlayheadPos((prev) => (prev >= 95 ? 5 : prev + 0.6));
    }, 40);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className={`relative bg-[#111318] rounded-2xl p-4 border border-white/10 text-white overflow-hidden shadow-xl ${className}`}>
      {/* Top Header / Viewport Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="font-mono text-white/80">TIMELINE: 00:01:24:18</span>
        </div>
        <div className="flex items-center gap-3 text-white/60 font-mono text-[11px]">
          <span>60 FPS</span>
          <span>4K PRORES</span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 rounded bg-white/10 hover:bg-[#FF6A2A] text-white transition-colors"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Mini Video Monitor Preview */}
      <div className="relative my-3 h-28 rounded-lg bg-black/60 border border-white/5 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-purple-500/20 animate-pulse" />
        <div className="relative text-center space-y-1">
          <div className="text-[11px] font-mono tracking-widest text-[#FF6A2A] uppercase">
            [ RYVO VIRAL CUT ]
          </div>
          <div className="text-xs font-semibold text-white/90">Kinetic Hook Sequence</div>
        </div>
        {/* Safe Area Guides */}
        <div className="absolute inset-3 border border-dashed border-white/20 rounded pointer-events-none" />
      </div>

      {/* Multi-Track Timeline */}
      <div className="space-y-2 relative pt-1">
        {/* Scrub Playhead */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-[#FF6A2A] z-20 shadow-[0_0_8px_#FF6A2A] transition-all duration-75"
          style={{ left: `${playheadPos}%` }}
        >
          <div className="w-2 h-2 bg-[#FF6A2A] rotate-45 -translate-x-[3px] -translate-y-1" />
        </div>

        {/* Video Track 1 */}
        <div className="h-6 rounded bg-white/5 border border-white/10 flex items-center px-2 gap-1 overflow-hidden relative">
          <span className="text-[10px] font-mono text-white/40 shrink-0 w-8">V1</span>
          <div className="h-4 w-28 bg-[#FF6A2A]/40 border border-[#FF6A2A] rounded text-[9px] flex items-center px-1 font-mono truncate">
            Hook_Cut_A.mp4
          </div>
          <div className="h-4 w-36 bg-blue-500/30 border border-blue-400 rounded text-[9px] flex items-center px-1 font-mono truncate">
            B-Roll_Cinematic.mov
          </div>
          <div className="h-4 flex-1 bg-amber-500/30 border border-amber-400 rounded text-[9px] flex items-center px-1 font-mono truncate">
            Motion_Title_02
          </div>
        </div>

        {/* Audio Track 1 - Waveform simulation */}
        <div className="h-6 rounded bg-white/5 border border-white/10 flex items-center px-2 gap-1 overflow-hidden relative">
          <span className="text-[10px] font-mono text-white/40 shrink-0 w-8">A1</span>
          <div className="flex-1 flex items-center gap-[3px] h-3 px-1 bg-emerald-500/20 rounded border border-emerald-500/40">
            {Array.from({ length: 32 }).map((_, i) => (
              <span
                key={i}
                className="w-1 bg-emerald-400 rounded-full transition-all duration-150"
                style={{
                  height: `${Math.sin(i * 0.4 + playheadPos * 0.1) * 8 + 10}px`,
                  opacity: i < playheadPos * 0.32 ? 1 : 0.4,
                }}
              />
            ))}
          </div>
        </div>

        {/* SFX Track 2 */}
        <div className="h-6 rounded bg-white/5 border border-white/10 flex items-center px-2 gap-1 overflow-hidden relative">
          <span className="text-[10px] font-mono text-white/40 shrink-0 w-8">SFX</span>
          <div className="w-14 h-3.5 bg-purple-500/40 border border-purple-400 rounded text-[8px] flex items-center justify-center font-mono ml-4">
            Whoosh
          </div>
          <div className="w-14 h-3.5 bg-purple-500/40 border border-purple-400 rounded text-[8px] flex items-center justify-center font-mono ml-8">
            Impact
          </div>
          <div className="w-16 h-3.5 bg-purple-500/40 border border-purple-400 rounded text-[8px] flex items-center justify-center font-mono ml-12">
            Riser_04
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 2. GRAPHIC DESIGN MOTION
// Floating design layers, color swatches, caliper rulers, typography metrics
// =========================================================================
export const GraphicDesignMotion: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [activeLayer, setActiveLayer] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLayer((l) => (l >= 3 ? 1 : l + 1));
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative bg-white rounded-2xl p-5 border border-[#E7E9ED] shadow-xl overflow-hidden ${className}`}>
      {/* Design Artboard Canvas */}
      <div className="relative h-64 bg-[#F7F8FA] rounded-xl border border-dashed border-[#E7E9ED] flex items-center justify-center p-6 overflow-hidden">
        {/* Isometric Grid & Calipers */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E7E9ED_1px,transparent_1px),linear-gradient(to_bottom,#E7E9ED_1px,transparent_1px)] bg-[size:20px_20px] opacity-60" />

        {/* Layer 1: Base Geometry */}
        <div
          className={`absolute w-36 h-48 rounded-xl bg-white border border-[#E7E9ED] shadow-md p-3 transition-all duration-700 ${
            activeLayer === 1 ? 'scale-105 shadow-xl ring-2 ring-[#FF6A2A]' : 'opacity-70 -rotate-3 -translate-x-6'
          }`}
        >
          <div className="w-full h-24 bg-[#111318] rounded-lg p-2 flex items-center justify-center">
            <span className="font-heading font-extrabold text-white text-2xl tracking-tighter">
              R<span className="text-[#FF6A2A]">·</span>
            </span>
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="h-2 w-3/4 bg-[#111318]/20 rounded" />
            <div className="h-1.5 w-1/2 bg-[#111318]/10 rounded" />
          </div>
        </div>

        {/* Layer 2: Editorial Poster */}
        <div
          className={`absolute w-40 h-52 rounded-xl bg-[#111318] text-white p-4 shadow-xl border border-white/10 transition-all duration-700 ${
            activeLayer === 2 ? 'scale-105 z-10 ring-2 ring-[#FF6A2A]' : 'opacity-80 rotate-2 translate-x-4'
          }`}
        >
          <div className="flex items-center justify-between text-[9px] text-[#FF6A2A] font-mono uppercase">
            <span>RYVO ARCHIVE</span>
            <span>2026</span>
          </div>
          <div className="mt-4 font-heading font-bold text-lg leading-tight">
            PRECISION<br />
            <span className="text-[#FF6A2A]">FORM</span> & FLOW
          </div>
          <div className="mt-8 pt-3 border-t border-white/20 flex items-center justify-between text-[10px] text-white/60">
            <span>HELVETICA</span>
            <span>01/100</span>
          </div>
        </div>

        {/* Floating Tooltips / Ruler */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-md text-[10px] font-mono text-[#111318] shadow-sm border border-[#E7E9ED] flex items-center gap-1.5">
          <Layers className="w-3 h-3 text-[#FF6A2A]" />
          <span>Layer: {activeLayer === 1 ? 'Monogram.svg' : activeLayer === 2 ? 'Editorial.artboard' : 'Vector_Suite.ai'}</span>
        </div>

        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-[#E7E9ED] shadow-sm">
          <span className="w-3 h-3 rounded-full bg-[#111318]" />
          <span className="w-3 h-3 rounded-full bg-[#FF6A2A]" />
          <span className="w-3 h-3 rounded-full bg-[#F7F8FA] border border-[#E7E9ED]" />
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 3. AI CALLING AGENTS MOTION
// Neural voice waveform, live transcription ticker, latency telemetry
// =========================================================================
export const AICallingMotion: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => (p + 1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative bg-[#111318] rounded-2xl p-5 border border-white/10 text-white overflow-hidden shadow-xl ${className}`}>
      {/* Top telemetry */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-emerald-400">ACTIVE CALL SESSION</span>
        </div>
        <div className="flex items-center gap-2 text-white/50 font-mono text-[11px]">
          <span>LATENCY: 380MS</span>
          <span className="text-[#FF6A2A]">LIVE</span>
        </div>
      </div>

      {/* Neural Voice Visualizer */}
      <div className="py-6 flex items-center justify-center gap-1.5 h-28">
        {Array.from({ length: 24 }).map((_, i) => {
          const height = Math.abs(Math.sin((i + pulse) * 0.35)) * 48 + 8;
          return (
            <div
              key={i}
              className="w-1.5 rounded-full transition-all duration-100"
              style={{
                height: `${height}px`,
                backgroundColor: i % 3 === 0 ? '#FF6A2A' : '#FFFFFF',
                opacity: 0.85,
              }}
            />
          );
        })}
      </div>

      {/* Live AI Speech Transcription Card */}
      <div className="bg-white/5 rounded-xl p-3 border border-white/10 space-y-2">
        <div className="flex items-center gap-2 text-[10px] font-mono text-[#FF6A2A]">
          <Mic className="w-3 h-3" />
          <span>AUTONOMOUS AGENT · TRANSCRIPT</span>
        </div>
        <p className="text-xs text-white/90 leading-relaxed font-sans">
          "Certainly, Marcus. I have qualified your enterprise criteria and reserved the Thursday 2:00 PM discovery slot on calendar."
        </p>
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/50">
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>CRM Sync Complete</span>
          </span>
          <span>Confidence: 99.4%</span>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 4. WEBSITE DEVELOPMENT MOTION
// Interactive browser frame, responsive inspect guides, speed metrics
// =========================================================================
export const WebsiteDevMotion: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative bg-white rounded-2xl p-4 border border-[#E7E9ED] shadow-xl overflow-hidden ${className}`}>
      {/* Browser Chrome Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E7E9ED] text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>
        <div className="flex-1 max-w-xs mx-4 bg-[#F7F8FA] border border-[#E7E9ED] rounded-lg px-3 py-1 text-[11px] text-[#737780] font-mono truncate flex items-center gap-1.5">
          <span className="text-emerald-600">https://</span>
          <span>client-enterprise.ryvo.agency</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
          <span>99/100</span>
        </div>
      </div>

      {/* Rendered Web Canvas */}
      <div className="mt-3 p-4 bg-[#F7F8FA] rounded-xl border border-[#E7E9ED] space-y-3">
        {/* Mock Hero in Browser */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#111318]" />
            <div className="w-16 h-2.5 bg-[#111318]/20 rounded" />
          </div>
          <div className="flex gap-2">
            <div className="w-10 h-2 bg-[#737780]/30 rounded" />
            <div className="w-10 h-2 bg-[#737780]/30 rounded" />
          </div>
        </div>

        <div className="py-4 space-y-2">
          <div className="w-3/4 h-5 bg-[#111318] rounded-md" />
          <div className="w-1/2 h-5 bg-[#FF6A2A] rounded-md" />
          <div className="w-5/6 h-2 bg-[#737780]/40 rounded mt-2" />
        </div>

        {/* 3 Interactive Feature Cards */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="p-2 bg-white rounded-lg border border-[#E7E9ED] shadow-sm space-y-1">
            <div className="w-4 h-4 rounded bg-[#FF6A2A]/20" />
            <div className="w-12 h-2 bg-[#111318]/30 rounded" />
          </div>
          <div className="p-2 bg-white rounded-lg border border-[#E7E9ED] shadow-sm space-y-1">
            <div className="w-4 h-4 rounded bg-[#111318]/20" />
            <div className="w-12 h-2 bg-[#111318]/30 rounded" />
          </div>
          <div className="p-2 bg-white rounded-lg border border-[#E7E9ED] shadow-sm space-y-1">
            <div className="w-4 h-4 rounded bg-emerald-500/20" />
            <div className="w-12 h-2 bg-[#111318]/30 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 5. AI AUTOMATION MOTION
// Connected SVG node workflow, flowing data pulses
// =========================================================================
export const AIAutomationMotion: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative bg-[#111318] rounded-2xl p-5 border border-white/10 text-white shadow-xl overflow-hidden ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
        <span className="font-mono text-[#FF6A2A] flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5" />
          <span>AUTONOMOUS PIPELINE</span>
        </span>
        <span className="text-white/40 text-[11px] font-mono">STATUS: ZERO LATENCY</span>
      </div>

      <div className="relative py-6 flex items-center justify-between gap-2">
        {/* Node 1: Inbound Webhook */}
        <div className="flex flex-col items-center gap-1.5 z-10">
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shadow-lg">
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
          <span className="text-[10px] font-mono text-white/70">Webhook</span>
        </div>

        {/* Pulse Connector Line 1 */}
        <div className="flex-1 h-[2px] bg-white/10 relative overflow-hidden">
          <div className="absolute inset-y-0 w-8 bg-[#FF6A2A] animate-[pulse_1.5s_ease-in-out_infinite]" />
        </div>

        {/* Node 2: LLM Parser */}
        <div className="flex flex-col items-center gap-1.5 z-10">
          <div className="w-14 h-14 rounded-xl bg-[#FF6A2A] text-white flex items-center justify-center shadow-lg ring-4 ring-[#FF6A2A]/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-[10px] font-mono text-white font-semibold">LLM Parser</span>
        </div>

        {/* Pulse Connector Line 2 */}
        <div className="flex-1 h-[2px] bg-white/10 relative overflow-hidden">
          <div className="absolute inset-y-0 w-8 bg-[#FF6A2A] animate-[pulse_1.5s_ease-in-out_infinite] delay-300" />
        </div>

        {/* Node 3: CRM Dispatch */}
        <div className="flex flex-col items-center gap-1.5 z-10">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-[10px] font-mono text-white/70">PostgreSQL</span>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-2.5 text-[11px] font-mono text-white/70 flex items-center justify-between">
        <span>Processed 1,420 events today</span>
        <span className="text-emerald-400">0.00% Error</span>
      </div>
    </div>
  );
};

// =========================================================================
// 6. SEO SERVICES MOTION
// Search bar, SERP position #1 badge, Core Web Vitals
// =========================================================================
export const SEOMotion: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative bg-white rounded-2xl p-5 border border-[#E7E9ED] shadow-xl overflow-hidden ${className}`}>
      {/* Mock Search Bar */}
      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F7F8FA] border border-[#E7E9ED] text-xs">
        <Search className="w-4 h-4 text-[#FF6A2A]" />
        <span className="text-[#111318] font-medium">enterprise ai solutions</span>
        <span className="ml-auto text-[10px] text-[#737780] font-mono">24,000 / MO</span>
      </div>

      {/* Top Ranking Result */}
      <div className="mt-4 p-3 rounded-xl border border-[#FF6A2A]/30 bg-orange-50/30 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            RANK #1 · ORGANIC
          </span>
          <span className="text-[10px] font-mono text-[#737780]">CTR: 38.4%</span>
        </div>
        <div className="text-sm font-bold text-[#111318] hover:underline cursor-pointer">
          Enterprise AI Workflow Engine & Calling Platform
        </div>
        <p className="text-xs text-[#737780] line-clamp-2">
          Engineered for rapid integration. Sub-second conversational responses, automated CRM pipelines, and zero downtime.
        </p>
      </div>

      {/* Growth Metric Ticker */}
      <div className="mt-3 grid grid-cols-2 gap-2 text-center">
        <div className="p-2 rounded-lg bg-[#F7F8FA] border border-[#E7E9ED]">
          <div className="text-xs text-[#737780]">Core Web Vitals</div>
          <div className="text-sm font-bold text-emerald-600">100 / 100 PASS</div>
        </div>
        <div className="p-2 rounded-lg bg-[#F7F8FA] border border-[#E7E9ED]">
          <div className="text-xs text-[#737780]">Organic Pipeline</div>
          <div className="text-sm font-bold text-[#FF6A2A]">+240% YoY</div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 7. DIGITAL MARKETING MOTION
// Multichannel campaign cards, ROAS gauge
// =========================================================================
export const DigitalMarketingMotion: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative bg-[#111318] rounded-2xl p-5 border border-white/10 text-white shadow-xl overflow-hidden ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
        <span className="font-mono text-white/60">CAMPAIGN: SCALE_Q1</span>
        <span className="text-[#FF6A2A] font-bold">ROAS: 4.8X</span>
      </div>

      <div className="grid grid-cols-2 gap-3 my-4">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
          <div className="text-[10px] text-white/40 uppercase">Conversion Rate</div>
          <div className="text-xl font-heading font-bold text-white">4.82%</div>
          <div className="text-[10px] text-emerald-400">+1.2% this week</div>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
          <div className="text-[10px] text-white/40 uppercase">Qualified Leads</div>
          <div className="text-xl font-heading font-bold text-[#FF6A2A]">342</div>
          <div className="text-[10px] text-white/60">CAC: $48.20</div>
        </div>
      </div>

      {/* Mini Bar Chart */}
      <div className="pt-2 flex items-end gap-2 h-14">
        {[30, 45, 60, 50, 75, 90, 85, 100].map((val, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={`w-full rounded-t transition-all duration-300 ${
                idx === 7 ? 'bg-[#FF6A2A]' : 'bg-white/20'
              }`}
              style={{ height: `${val}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// =========================================================================
// 8. APP DEVELOPMENT MOTION
// Smartphone frame with fluid interface cards
// =========================================================================
export const AppDevMotion: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative bg-white rounded-2xl p-5 border border-[#E7E9ED] shadow-xl flex items-center justify-center ${className}`}>
      {/* Smartphone Bezel */}
      <div className="w-52 h-72 rounded-[28px] bg-[#111318] p-2.5 shadow-2xl border-2 border-white/20 relative">
        {/* Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full z-20" />

        {/* Screen */}
        <div className="w-full h-full bg-[#FFFFFF] rounded-[20px] overflow-hidden p-3 pt-6 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[9px] text-[#737780]">
              <span>RYVO MOBILE</span>
              <span>9:41</span>
            </div>
            <div className="h-3 w-24 bg-[#111318] rounded" />
            <div className="h-10 w-full bg-[#F7F8FA] border border-[#E7E9ED] rounded-lg p-1.5 flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#FF6A2A] text-white flex items-center justify-center text-[10px] font-bold">
                $
              </div>
              <div className="space-y-1">
                <div className="h-2 w-16 bg-[#111318]/20 rounded" />
                <div className="h-1.5 w-10 bg-[#111318]/10 rounded" />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="h-8 w-full bg-[#111318] rounded-lg text-white text-[10px] font-semibold flex items-center justify-center">
              Authenticate
            </div>
            <div className="w-16 h-1 bg-[#111318]/20 rounded-full mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 9. GAME DEVELOPMENT MOTION
// Interactive 2D/3D arcade preview
// =========================================================================
export const GameDevMotion: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [score, setScore] = useState(1280);

  return (
    <div className={`relative bg-[#111318] rounded-2xl p-5 border border-white/10 text-white shadow-xl overflow-hidden ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
        <span className="font-mono text-[#FF6A2A] flex items-center gap-1.5">
          <Gamepad2 className="w-4 h-4" />
          <span>WEBGL ENGINE PREVIEW</span>
        </span>
        <span className="font-mono text-emerald-400">SCORE: {score}</span>
      </div>

      <div
        onClick={() => setScore((s) => s + 100)}
        className="my-4 h-32 rounded-xl bg-gradient-to-br from-purple-900/40 via-black to-orange-950/40 border border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-[#FF6A2A] transition-all relative overflow-hidden group select-none"
      >
        <div className="w-12 h-12 rounded-xl bg-[#FF6A2A] text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all">
          <Gamepad2 className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-mono text-white/70 mt-2">CLICK TO INTERACT</span>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-white/50">
        <span>PHYSICS: CANNON-ES</span>
        <span>SHADERS: GLSL</span>
      </div>
    </div>
  );
};
