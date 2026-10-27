import React, { useState, useRef, useEffect } from 'react';
import { PortfolioProject } from '../../types';
import { useAgency } from '../../context/AgencyContext';
import {
  ExternalLink,
  Eye,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Lock,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface WebsitePreviewCardProps {
  project: PortfolioProject;
}

export const WebsitePreviewCard: React.FC<WebsitePreviewCardProps> = ({ project }) => {
  const { navigate, setActivePreviewProject } = useAgency();
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollDirectionRef = useRef<'down' | 'up'>('down');
  const animationFrameRef = useRef<number | null>(null);

  // Check user preference for reduced motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Auto-scrolling effect on hover
  useEffect(() => {
    if (!isHovered || isPaused || prefersReducedMotion || !project.autoScrollSupported) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    let lastTime = performance.now();

    const step = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Speed: ~18% per second for smooth readable motion
      const speed = 18;

      setScrollProgress((prev) => {
        let next = prev;
        if (scrollDirectionRef.current === 'down') {
          next = prev + speed * delta;
          if (next >= 100) {
            next = 100;
            scrollDirectionRef.current = 'up';
          }
        } else {
          next = prev - speed * delta * 1.5; // return up slightly faster
          if (next <= 0) {
            next = 0;
            scrollDirectionRef.current = 'down';
          }
        }
        return next;
      });

      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isHovered, isPaused, prefersReducedMotion, project.autoScrollSupported]);

  const handleResetScroll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScrollProgress(0);
    scrollDirectionRef.current = 'down';
  };

  const handleTogglePause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPaused(!isPaused);
  };

  // Open live preview in modal
  const handleOpenPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePreviewProject(project);
  };

  const websiteUrl = project.websiteUrl || project.previewUrl || '';
  const domainOnly = websiteUrl
    ? websiteUrl.replace(/^https?:\/\//i, '').split('/')[0]
    : 'ryvo-showcase.agency';

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPaused(false);
      }}
      className="group bg-white rounded-2xl border border-[#E7E9ED] overflow-hidden hover:border-[#FF6A2A]/40 transition-all duration-300 hover:shadow-xl flex flex-col"
    >
      {/* Browser Chrome Header */}
      <div className="bg-[#111318] text-white px-3.5 py-2.5 flex items-center justify-between border-b border-white/10 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>

        {/* URL Address Bar */}
        <div className="flex-1 max-w-[200px] sm:max-w-[260px] mx-2 px-2.5 py-0.5 rounded-md bg-white/10 border border-white/10 text-[10px] text-white/70 font-mono truncate flex items-center gap-1.5">
          <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
          <span className="truncate">{domainOnly}</span>
        </div>

        {/* Browser Quick Action */}
        <div className="flex items-center gap-1">
          {project.autoScrollSupported && isHovered && (
            <div className="flex items-center gap-1 bg-white/10 rounded px-1.5 py-0.5 text-[9px] font-mono text-white/80">
              <button
                onClick={handleTogglePause}
                className="hover:text-[#FF6A2A] transition-colors cursor-pointer"
                title={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
              >
                {isPaused ? <Play className="w-2.5 h-2.5" /> : <Pause className="w-2.5 h-2.5" />}
              </button>
              <button
                onClick={handleResetScroll}
                className="hover:text-[#FF6A2A] transition-colors cursor-pointer"
                title="Reset to top"
              >
                <RotateCcw className="w-2.5 h-2.5" />
              </button>
            </div>
          )}

          <button
            onClick={handleOpenPreview}
            className="p-1 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Open Interactive Live Preview Modal"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Website Viewport Area with Auto-Scroll Visual Simulation */}
      <div
        onClick={handleOpenPreview}
        className="relative h-64 sm:h-72 w-full bg-[#F7F8FA] overflow-hidden cursor-pointer"
      >
        <div
          className="w-full h-[180%] relative transition-transform duration-75 ease-out"
          style={{
            transform: `translateY(-${(scrollProgress * 44) / 100}%)`,
          }}
        >
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover object-top select-none"
          />
        </div>

        {/* Hover Overlay Hint */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-md text-[#111318] px-4 py-2 rounded-xl text-xs font-semibold shadow-xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-[#FF6A2A]" />
            <span>Launch Live Preview</span>
          </div>
        </div>

        {/* Auto-scroll progress bar at bottom of preview */}
        {project.autoScrollSupported && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10">
            <div
              className="h-full bg-[#FF6A2A] transition-all duration-75"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Unboxed Metadata (Zero-pill discipline) */}
          <div className="flex items-center gap-2 text-xs text-[#737780] mb-1.5 font-medium">
            <span className="text-[#111318]">{project.category}</span>
            {project.year && (
              <>
                <span aria-hidden="true">·</span>
                <span>{project.year}</span>
              </>
            )}
            {project.client && (
              <>
                <span aria-hidden="true">·</span>
                <span className="truncate">{project.client}</span>
              </>
            )}
          </div>

          <h3
            onClick={() => navigate(`/project/${project.slug}`)}
            className="font-heading text-lg font-bold text-[#111318] hover:text-[#FF6A2A] transition-colors cursor-pointer"
          >
            {project.title}
          </h3>

          <p className="text-xs text-[#737780] line-clamp-2 mt-2 leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mt-3 text-[11px] text-[#737780]">
              {project.tags.slice(0, 3).map((tag, idx) => (
                <span key={idx}>
                  {idx > 0 && <span className="mr-1.5">/</span>}
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-[#E7E9ED] flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleOpenPreview}
              className="px-3 py-1.5 rounded-lg bg-[#111318] text-white hover:bg-[#FF6A2A] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Eye className="w-3 h-3" />
              <span>Live Preview</span>
            </button>

            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-2.5 py-1.5 rounded-lg border border-[#E7E9ED] text-[#202124] hover:bg-[#F7F8FA] hover:text-[#FF6A2A] text-xs font-medium flex items-center gap-1 transition-colors"
                title="Open live website in new tab"
              >
                <ExternalLink className="w-3 h-3" />
                <span className="hidden sm:inline">Website</span>
              </a>
            )}
          </div>

          <button
            onClick={() => navigate(`/project/${project.slug}`)}
            className="text-xs font-semibold text-[#737780] hover:text-[#111318] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Case Study</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
