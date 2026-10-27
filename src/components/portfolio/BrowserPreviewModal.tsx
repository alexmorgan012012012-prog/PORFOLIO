import React, { useState, useEffect, useRef } from 'react';
import { useAgency } from '../../context/AgencyContext';
import {
  X,
  ExternalLink,
  RotateCcw,
  Play,
  Pause,
  Monitor,
  Tablet,
  Smartphone,
  ShieldCheck,
  ShieldAlert,
  Maximize2,
  Minimize2,
  Sparkles,
} from 'lucide-react';

export const BrowserPreviewModal: React.FC = () => {
  const { activePreviewProject, setActivePreviewProject } = useAgency();
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [scrollOffset, setScrollOffset] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    setIframeError(false);
    setIsLoading(true);
    setScrollOffset(0);
    setIsAutoScrolling(true);
  }, [activePreviewProject]);

  // Simulated auto-scroll for screenshot view or embedded frame
  useEffect(() => {
    if (!isAutoScrolling || !activePreviewProject) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    let direction: 'down' | 'up' = 'down';
    let lastTime = performance.now();

    const step = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      setScrollOffset((prev) => {
        let next = prev;
        const speed = 25; // px per second
        if (direction === 'down') {
          next = prev + speed * delta * 5;
          if (next >= 400) {
            next = 400;
            direction = 'up';
          }
        } else {
          next = prev - speed * delta * 8;
          if (next <= 0) {
            next = 0;
            direction = 'down';
          }
        }
        return next;
      });

      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isAutoScrolling, activePreviewProject]);

  if (!activePreviewProject) return null;

  const targetUrl = activePreviewProject.websiteUrl || activePreviewProject.previewUrl || '';
  const canActuallyEmbed = activePreviewProject.canEmbed && !iframeError;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Modal Dialog Window */}
      <div
        className={`bg-[#111318] rounded-2xl border border-white/20 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-6xl h-[88vh]'
        }`}
      >
        {/* Browser Top Window Bar */}
        <div className="bg-[#1A1D24] px-4 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Window Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActivePreviewProject(null)}
              className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group cursor-pointer"
              title="Close Preview"
            >
              <X className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="w-3.5 h-3.5 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors flex items-center justify-center group cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? (
                <Minimize2 className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
              ) : (
                <Maximize2 className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
              )}
            </button>
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
          </div>

          {/* URL Address Bar */}
          <div className="flex-1 max-w-xl mx-2 bg-black/50 border border-white/10 rounded-xl px-3.5 py-1.5 flex items-center justify-between gap-2 text-xs font-mono text-white/80">
            <div className="flex items-center gap-2 truncate">
              {canActuallyEmbed ? (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              )}
              <span className="truncate">{targetUrl || 'https://ryvo.agency'}</span>
            </div>
            <button
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 500);
              }}
              className="text-white/40 hover:text-white transition-colors"
              title="Reload frame"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Device Switcher & Controls */}
          <div className="flex items-center gap-2">
            {/* Device Toggles */}
            <div className="hidden sm:flex items-center p-0.5 rounded-lg bg-black/40 border border-white/10">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                  deviceMode === 'desktop' ? 'bg-white/20 text-[#FF6A2A]' : 'text-white/60 hover:text-white'
                }`}
                title="Desktop View (100%)"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeviceMode('tablet')}
                className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                  deviceMode === 'tablet' ? 'bg-white/20 text-[#FF6A2A]' : 'text-white/60 hover:text-white'
                }`}
                title="Tablet View (768px)"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                  deviceMode === 'mobile' ? 'bg-white/20 text-[#FF6A2A]' : 'text-white/60 hover:text-white'
                }`}
                title="Mobile View (390px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Auto-Scroll Controls */}
            <button
              onClick={() => setIsAutoScrolling(!isAutoScrolling)}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {isAutoScrolling ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span className="hidden md:inline">{isAutoScrolling ? 'Pause Scroll' : 'Auto Scroll'}</span>
            </button>

            {/* Reset to top */}
            <button
              onClick={() => setScrollOffset(0)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Reset view to top"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Open in New Tab */}
            {targetUrl && (
              <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#FF6A2A] hover:bg-[#ff7b42] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Open Site</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            <button
              onClick={() => setActivePreviewProject(null)}
              className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Viewport Workspace */}
        <div className="flex-1 bg-[#0A0C10] overflow-hidden flex items-center justify-center p-2 sm:p-4 relative">
          <div
            className={`h-full bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 relative flex flex-col ${
              deviceMode === 'mobile'
                ? 'w-[390px]'
                : deviceMode === 'tablet'
                ? 'w-[768px]'
                : 'w-full'
            }`}
          >
            {/* EMBEDDED IFRAME or AUTHENTIC FALLBACK */}
            {canActuallyEmbed ? (
              <div className="w-full h-full relative">
                <iframe
                  src={targetUrl}
                  title={activePreviewProject.title}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  onLoad={() => setIsLoading(false)}
                  onError={() => {
                    setIframeError(true);
                    setIsLoading(false);
                  }}
                />
              </div>
            ) : (
              /* Honest Fallback Canvas */
              <div className="w-full h-full flex flex-col bg-[#F7F8FA] overflow-y-auto relative">
                {/* Security Restriction Notification Header */}
                <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-2 text-amber-900">
                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      External host policy prohibits inline embedding (X-Frame-Options: SAMEORIGIN/DENY). Displaying verified high-resolution viewport preview.
                    </span>
                  </div>
                  {targetUrl && (
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-md bg-[#111318] text-white font-semibold text-[11px] shrink-0 hover:bg-[#FF6A2A] transition-colors flex items-center gap-1"
                    >
                      <span>Open Live Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {/* Smooth Scrollable Preview Image */}
                <div
                  ref={scrollRef}
                  className="flex-1 overflow-hidden relative"
                >
                  <div
                    className="w-full transition-transform duration-100 ease-out"
                    style={{ transform: `translateY(-${scrollOffset}px)` }}
                  >
                    <img
                      src={activePreviewProject.thumbnailUrl}
                      alt={activePreviewProject.title}
                      className="w-full object-cover select-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Info */}
        <div className="bg-[#1A1D24] px-4 py-2.5 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">{activePreviewProject.title}</span>
            <span>·</span>
            <span>{activePreviewProject.category}</span>
          </div>
          <div className="text-[11px] text-white/40">
            Hover or toggle auto-scroll to inspect UX & typography flow.
          </div>
        </div>
      </div>
    </div>
  );
};
