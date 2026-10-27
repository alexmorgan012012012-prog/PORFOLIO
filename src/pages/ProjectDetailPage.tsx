import React from 'react';
import { useAgency } from '../context/AgencyContext';
import {
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Maximize2,
  Play,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const ProjectDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const {
    projects,
    navigate,
    setActivePreviewProject,
    setActiveVideo,
    setActiveLightbox,
    setStartProjectOpen,
  } = useAgency();

  const project = projects.find((p) => p.slug === slug) || projects[0];

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold">Project Not Found</h1>
        <button
          onClick={() => navigate('/portfolio')}
          className="px-4 py-2 bg-[#111318] text-white rounded-xl text-sm"
        >
          Back to Portfolio
        </button>
      </div>
    );
  }

  // Next project finder
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const handleLaunchMedia = () => {
    if (project.mediaType === 'video' && project.videoUrl) {
      setActiveVideo({ url: project.videoUrl, title: project.title });
    } else if (project.mediaType === 'image' && project.galleryImages?.length) {
      setActiveLightbox({ images: project.galleryImages, title: project.title });
    } else {
      setActivePreviewProject(project);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/portfolio')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#737780] hover:text-[#FF6A2A] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio Showcase</span>
        </button>
      </div>

      {/* Hero Header */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#737780]">
          <span className="text-[#FF6A2A] font-bold">{project.category}</span>
          {project.year && (
            <>
              <span aria-hidden="true">·</span>
              <span>Delivered {project.year}</span>
            </>
          )}
          {project.client && (
            <>
              <span aria-hidden="true">·</span>
              <span>Client: {project.client}</span>
            </>
          )}
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-[#111318] tracking-tight">
          {project.title}
        </h1>

        <p className="text-lg sm:text-xl text-[#737780] leading-relaxed max-w-3xl">
          {project.shortDescription}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={handleLaunchMedia}
            className="px-6 py-3.5 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white font-semibold text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer"
          >
            {project.mediaType === 'video' ? (
              <>
                <Play className="w-4 h-4" />
                <span>Play Full Video Showreel</span>
              </>
            ) : project.mediaType === 'image' ? (
              <>
                <Maximize2 className="w-4 h-4" />
                <span>Open Artwork Lightbox</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4" />
                <span>Launch Interactive Live Preview</span>
              </>
            )}
          </button>

          {project.websiteUrl && (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl border border-[#E7E9ED] bg-white hover:bg-[#F7F8FA] text-[#111318] font-semibold text-sm transition-all flex items-center gap-2"
            >
              <span>Visit External Live Site</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Primary Hero Showcase Media Banner */}
      <div
        onClick={handleLaunchMedia}
        className="relative rounded-3xl overflow-hidden border border-[#E7E9ED] bg-[#111318] max-h-[540px] cursor-pointer group shadow-2xl"
      >
        <img
          src={project.thumbnailUrl}
          alt={project.title}
          className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-white px-5 py-2.5 rounded-xl text-xs font-bold text-[#111318] flex items-center gap-2 shadow-2xl">
            <Maximize2 className="w-4 h-4 text-[#FF6A2A]" />
            <span>Click to Expand Interactive Viewport</span>
          </div>
        </div>
      </div>

      {/* Case Study Deep Dive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Narrative */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-4">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#111318]">
              Project Overview & Architecture
            </h2>
            <p className="text-base text-[#737780] leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Secondary Gallery Images if available */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="font-heading text-xl font-bold text-[#111318]">
                Visual Collateral & Assets
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() =>
                      setActiveLightbox({
                        images: project.galleryImages || [],
                        title: project.title,
                        initialIndex: idx,
                      })
                    }
                    className="rounded-2xl overflow-hidden border border-[#E7E9ED] cursor-pointer hover:border-[#FF6A2A] transition-all h-56"
                  >
                    <img src={img} alt="detail" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Specifications */}
        <div className="lg:col-span-4 space-y-6">
          {/* Key Metrics Card */}
          {project.stats && project.stats.length > 0 && (
            <div className="bg-[#111318] text-white p-6 rounded-3xl space-y-4 border border-white/10">
              <div className="text-xs font-mono font-bold text-[#FF6A2A] uppercase tracking-wider">
                Performance Telemetry
              </div>
              <div className="space-y-3">
                {project.stats.map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-xs text-white/70">{s.label}</span>
                    <span className="font-heading font-bold text-lg text-white">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack & Tags */}
          <div className="bg-white p-6 rounded-3xl border border-[#E7E9ED] space-y-3">
            <div className="text-xs font-bold text-[#111318] uppercase tracking-wider">
              Technologies & Tags
            </div>
            <div className="flex flex-wrap gap-1.5 text-xs text-[#737780]">
              {project.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-[#F7F8FA] border border-[#E7E9ED] text-[#111318] font-mono text-[11px]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Inquire CTA */}
          <div className="bg-[#F7F8FA] p-6 rounded-3xl border border-[#E7E9ED] space-y-3 text-center">
            <h4 className="font-heading font-bold text-base text-[#111318]">
              Interested in a Similar Build?
            </h4>
            <p className="text-xs text-[#737780]">
              We scope, design, and launch production systems with transparent pricing.
            </p>
            <button
              onClick={() => setStartProjectOpen(true)}
              className="w-full py-3 rounded-xl bg-[#FF6A2A] hover:bg-[#ff7b42] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Start a Project Brief
            </button>
          </div>
        </div>
      </div>

      {/* Next Project Navigator */}
      {nextProject && (
        <div className="pt-12 border-t border-[#E7E9ED] flex items-center justify-between">
          <div>
            <div className="text-xs text-[#737780]">Next Case Study</div>
            <div className="font-heading text-lg font-bold text-[#111318]">
              {nextProject.title}
            </div>
          </div>
          <button
            onClick={() => navigate(`/project/${nextProject.slug}`)}
            className="px-5 py-2.5 rounded-xl border border-[#E7E9ED] hover:bg-[#111318] hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>View Case Study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
