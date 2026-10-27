import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, FastForward, Sparkles } from 'lucide-react';
import { useAgency } from '../../context/AgencyContext';

// Synthesized Web Audio API sound designer
class IntroAudioEngine {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public playAtmosphere() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(380, this.ctx.currentTime + 3.5);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 4.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 5.0);
    } catch {
      // Audio context restricted or unavailable
    }
  }

  public playLogoImpact() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Sub-bass impact
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(110, now);
      sub.frequency.exponentialRampToValueAtTime(38, now + 0.65);

      subGain.gain.setValueAtTime(0.25, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      sub.connect(subGain);
      subGain.connect(this.ctx.destination);
      sub.start(now);
      sub.stop(now + 1.3);

      // High shimmering metallic harmonic
      const chime = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();
      chime.type = 'triangle';
      chime.frequency.setValueAtTime(880, now);
      chime.frequency.exponentialRampToValueAtTime(440, now + 0.8);

      chimeGain.gain.setValueAtTime(0.04, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      chime.connect(chimeGain);
      chimeGain.connect(this.ctx.destination);
      chime.start(now);
      chime.stop(now + 1.0);
    } catch {
      // ignore
    }
  }

  public playWhoosh() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.35);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } catch {
      // ignore
    }
  }
}

export const CinematicIntro: React.FC = () => {
  const { settings, isPreviewIntroOpen, setPreviewIntroOpen } = useAgency();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<IntroAudioEngine>(new IntroAudioEngine());

  // Determine if intro should show
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    // Check user reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }
    // Check if admin explicitly previewed intro
    if (isPreviewIntroOpen) return true;
    // Check if intro is disabled in settings
    const introCfg = settings?.introSettings;
    if (introCfg && introCfg.enabled === false) return false;
    // Check if played once per session
    if (introCfg?.playOncePerSession !== false) {
      const seen = sessionStorage.getItem('ryvo_cinematic_intro_seen');
      if (seen) return false;
    }
    return true;
  });

  const [currentScene, setCurrentScene] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [statementWord, setStatementWord] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true); // Web audio safe default
  const [isExiting, setIsExiting] = useState<boolean>(false);

  const durationSec = settings?.introSettings?.duration || 5;

  // Complete and close intro
  const finishIntro = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      setPreviewIntroOpen(false);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('ryvo_cinematic_intro_seen', 'true');
      }
    }, 600);
  }, [setPreviewIntroOpen]);

  // Handle explicit preview trigger
  useEffect(() => {
    if (isPreviewIntroOpen) {
      setIsVisible(true);
      setIsExiting(false);
      setCurrentScene(1);
      setStatementWord(0);
      setProgress(0);
    }
  }, [isPreviewIntroOpen]);

  // Audio mute sync
  useEffect(() => {
    audioRef.current.isMuted = isAudioMuted;
  }, [isAudioMuted]);

  // Timeline & Sequence Runner
  useEffect(() => {
    if (!isVisible || isExiting) return;

    // Trigger initial cinematic atmosphere audio
    if (!isAudioMuted) {
      audioRef.current.playAtmosphere();
    }

    const startTime = Date.now();
    const totalDuration = durationSec * 1000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / totalDuration) * 100);
      setProgress(pct);

      // Sequence timeline:
      // 0.0s - 1.4s: Scene 1: Particle void & 3D geometry
      // 1.4s - 2.8s: Scene 2: Logo convergence & 3D reveal
      // 2.8s - 4.2s: Scene 3: Kinetic typography statement
      // 4.2s - 5.0s: Scene 4: Final Brand identity
      // 5.0s+: Scene 5: Zoom transition
      const progressFraction = elapsed / totalDuration;

      if (progressFraction < 0.28) {
        setCurrentScene(1);
      } else if (progressFraction < 0.52) {
        if (currentScene !== 2) {
          setCurrentScene(2);
          audioRef.current.playLogoImpact();
        }
      } else if (progressFraction < 0.78) {
        if (currentScene !== 3) {
          setCurrentScene(3);
        }
        // Advance kinetic typography words
        const subProgress = (progressFraction - 0.52) / 0.26;
        if (subProgress < 0.33) {
          setStatementWord(1); // WE BUILD.
        } else if (subProgress < 0.66) {
          if (statementWord < 2) audioRef.current.playWhoosh();
          setStatementWord(2); // WE AUTOMATE.
        } else {
          if (statementWord < 3) audioRef.current.playWhoosh();
          setStatementWord(3); // WE CREATE.
        }
      } else {
        if (currentScene !== 4) {
          setCurrentScene(4);
          audioRef.current.playLogoImpact();
        }
      }

      if (elapsed >= totalDuration) {
        clearInterval(interval);
        finishIntro();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isVisible, isExiting, durationSec, currentScene, statementWord, isAudioMuted, finishIntro]);

  // Canvas 3D Space Particle Engine
  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle geometry model
    interface Particle {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      alpha: number;
      color: string;
    }

    const particles: Particle[] = [];
    const count = width < 768 ? 70 : 160;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 800 + 50,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: -2.2,
        size: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.8 + 0.2,
        color: Math.random() > 0.4 ? '#FF6A2A' : '#FFFFFF',
      });
    }

    let rotationAngle = 0;

    const render = () => {
      ctx.fillStyle = 'rgba(10, 11, 14, 0.24)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      rotationAngle += 0.012;

      // Draw volumetric radial center glow
      const radial = ctx.createRadialGradient(cx, cy, 10, cx, cy, width * 0.45);
      radial.addColorStop(0, 'rgba(255, 106, 42, 0.12)');
      radial.addColorStop(0.5, 'rgba(255, 106, 42, 0.02)');
      radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      // Render 3D Wireframe Monogram / Diamond Ring in Background
      ctx.save();
      ctx.translate(cx, cy);
      ctx.strokeStyle = 'rgba(255, 106, 42, 0.16)';
      ctx.lineWidth = 1.2;

      const ringRadius = Math.min(width, height) * 0.28;
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const theta = rotationAngle + (i * Math.PI) / 4;
        const rx = Math.cos(theta) * ringRadius;
        const ry = Math.sin(theta) * (ringRadius * 0.38);
        if (i === 0) ctx.moveTo(rx, ry);
        else ctx.lineTo(rx, ry);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

      // Render 3D Perspective Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.z += p.vz;
        if (p.z <= 10) {
          p.z = 800;
          p.x = (Math.random() - 0.5) * width * 1.5;
          p.y = (Math.random() - 0.5) * height * 1.5;
        }

        // Perspective projection
        const fov = 350;
        const scale = fov / (fov + p.z);
        const px = cx + p.x * scale;
        const py = cy + p.y * scale;
        const pSize = Math.max(0.6, p.size * scale);

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          ctx.beginPath();
          ctx.arc(px, py, pSize, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.min(1, p.alpha * scale * 1.8);
          ctx.fill();

          // Energy streaks
          if (p.color === '#FF6A2A' && scale > 0.5) {
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(px - p.x * scale * 0.08, py - p.y * scale * 0.08);
            ctx.strokeStyle = 'rgba(255, 106, 42, 0.4)';
            ctx.lineWidth = pSize * 0.6;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="RYVO Digital Agency Cinematic Introduction"
      className={`fixed inset-0 z-50 bg-[#0B0D12] text-white flex flex-col items-center justify-center overflow-hidden transition-all duration-700 select-none ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* 3D Particle Starfield Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full" />

      {/* Ambient Radial Vignette & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#08090D_85%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Top Header Controls: Sound & Skip */}
      <header className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF6A2A] animate-ping" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-white/50">
            RYVO / MOTION IDENT
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Audio toggle button */}
          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-xs font-mono text-white/80 transition-all cursor-pointer"
            title={isAudioMuted ? 'Enable Sound FX' : 'Mute Sound'}
          >
            {isAudioMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-white/50" />
                <span className="text-[10px] text-white/60">AUDIO OFF</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#FF6A2A] animate-pulse" />
                <span className="text-[10px] text-white">AUDIO LIVE</span>
              </>
            )}
          </button>

          {/* Skip Intro button */}
          <button
            onClick={finishIntro}
            className="group flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-[#FF6A2A] hover:text-white backdrop-blur-md border border-white/15 text-xs font-medium text-white/90 transition-all cursor-pointer shadow-lg"
          >
            <span>Skip Intro</span>
            <FastForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </header>

      {/* Main Cinematic Motion Stage */}
      <main className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center justify-center text-center">
        {/* SCENE 1: Particle Void & Dimensional Label */}
        {currentScene === 1 && (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6A2A]/10 border border-[#FF6A2A]/30 text-[#FF6A2A] text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              <span>{settings?.introSettings?.headline || 'INDEPENDENT DIGITAL STUDIO'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extralight tracking-[0.25em] text-white/60 uppercase">
              INITIALIZING CREATIVE ENGINE
            </h2>
          </div>
        )}

        {/* SCENE 2: The RYVO Logo Reveal in 3D Motion */}
        {currentScene === 2 && (
          <div className="space-y-6 animate-in fade-in zoom-in-90 duration-500">
            <div className="relative mx-auto w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
              {/* Outer pulsing energy halo */}
              <div className="absolute inset-0 rounded-3xl bg-[#FF6A2A] blur-2xl opacity-40 animate-pulse" />
              
              {/* Geometric Monogram Tile */}
              <div className="relative w-full h-full rounded-3xl bg-[#111318] border border-[#FF6A2A]/50 shadow-2xl flex items-center justify-center transform hover:rotate-3 transition-transform">
                <span className="font-heading font-extrabold text-5xl sm:text-6xl text-[#FF6A2A] tracking-tighter drop-shadow-[0_0_25px_rgba(255,106,42,0.6)]">
                  R
                </span>
                {/* Diagonal light streak reflection */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                  <div className="w-[200%] h-12 bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-45 transform translate-y-8 animate-pulse" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-white tracking-tight drop-shadow-lg">
                RYVO
              </h1>
              <div className="text-xs sm:text-sm font-mono tracking-[0.35em] text-white/60 uppercase">
                DIGITAL AGENCY
              </div>
            </div>
          </div>
        )}

        {/* SCENE 3: Kinetic Typography Brand Statement */}
        {currentScene === 3 && (
          <div className="space-y-4 max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#FF6A2A]/80 mb-2">
              OUR CONSTITUTION
            </div>
            <div className="text-3xl sm:text-6xl font-heading font-extrabold tracking-tight space-y-3 leading-none">
              <div
                className={`transition-all duration-300 ${
                  statementWord >= 1
                    ? 'opacity-100 translate-y-0 text-white'
                    : 'opacity-10 translate-y-4'
                }`}
              >
                WE <span className="text-[#FF6A2A]">BUILD.</span>
              </div>
              <div
                className={`transition-all duration-300 ${
                  statementWord >= 2
                    ? 'opacity-100 translate-y-0 text-white'
                    : 'opacity-10 translate-y-4'
                }`}
              >
                WE <span className="text-white">AUTOMATE.</span>
              </div>
              <div
                className={`transition-all duration-300 ${
                  statementWord >= 3
                    ? 'opacity-100 translate-y-0 text-[#FF6A2A] drop-shadow-[0_0_30px_rgba(255,106,42,0.5)]'
                    : 'opacity-10 translate-y-4'
                }`}
              >
                WE <span className="text-[#FF6A2A]">CREATE.</span>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 4: Final Brand Climax & Headline */}
        {currentScene === 4 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono uppercase tracking-widest">
              <span>ESTABLISHED 2026 · INTERNATIONAL</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-heading font-black text-4xl sm:text-7xl text-white tracking-tighter leading-none">
                RYVO <span className="text-[#FF6A2A]">DIGITAL.</span>
              </h1>
              <p className="font-heading font-bold text-lg sm:text-2xl text-white/80 tracking-wide">
                YOUR VISION. BUILT FOR WHAT'S NEXT.
              </p>
            </div>

            <div className="pt-2 text-xs font-mono text-white/40 tracking-wider">
              ENTERPRISE SITES · AI CALLING · VIRAL PRODUCTION · AUTOMATION
            </div>
          </div>
        )}
      </main>

      {/* Bottom Progress Bar & Navigation Indicator */}
      <footer className="absolute bottom-8 left-6 right-6 flex items-center justify-between text-xs font-mono text-white/40">
        <div className="flex items-center gap-2">
          <span>PROGRESS</span>
          <div className="w-28 sm:w-44 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FF6A2A] to-orange-400 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span>{Math.round(progress)}%</span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[11px] text-white/30">
          <span className={currentScene === 1 ? 'text-white' : ''}>01 VOID</span>
          <span>/</span>
          <span className={currentScene === 2 ? 'text-white' : ''}>02 MONOGRAM</span>
          <span>/</span>
          <span className={currentScene === 3 ? 'text-white' : ''}>03 STATEMENT</span>
          <span>/</span>
          <span className={currentScene === 4 ? 'text-white' : ''}>04 READY</span>
        </div>
      </footer>
    </div>
  );
};
