import React, { useState } from 'react';
import { useAgency } from '../context/AgencyContext';
import { WebsitePreviewCard } from '../components/portfolio/WebsitePreviewCard';
import { PortfolioProject } from '../types';
import {
  ExternalLink,
  Play,
  Maximize2,
  Sparkles,
  Layers,
  ArrowRight,
  Video,
  Image as ImageIcon,
  Globe,
} from 'lucide-react';

export const PortfolioPage: React.FC = () => {
  const {
    projects,
    activeRoute,
    navigate,
    setActivePreviewProject,
    setActiveVideo,
    setActiveLightbox,
    setStartProjectOpen,
  } = useAgency();

  // Category filter from query params or local state
  const initialCat = activeRoute.params.category || 'All';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [mediaTypeFilter, setMediaTypeFilter] = useState<'all' | 'website' | 'video' | 'image'>('all');

  const categories = [
    'All',
    'Website Development',
    'Video Editing',
    'Graphic Design',
    'AI Automation',
    'App Development',
  ];

  const filteredProjects = projects.filter((p) => {
    if (!p.published) return false;
    if (selectedCategory !== 'All' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }
    if (mediaTypeFilter !== 'all' && p.mediaType !== mediaTypeFilter) {
      return false;
    }
    return true;
  });

  const handleProjectClick = (p: PortfolioProject) => {
    if (p.mediaType === 'video' && p.videoUrl) {
      setActiveVideo({ url: p.videoUrl, title: p.title });
    } else if (p.mediaType === 'image' && p.galleryImages?.length) {
      setActiveLightbox({ images: p.galleryImages, title: p.title });
    } else {
      setActivePreviewProject(p);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Portfolio & Media Archive</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-[#111318] tracking-tight">
          Selected Agency Works
        </h1>
        <p className="text-base sm:text-lg text-[#737780] leading-relaxed">
          Hover over website projects to trigger auto-scrolling viewports, open interactive browser modals, or inspect high-definition video and design galleries.
        </p>
      </div>

      {/* Filter Bar (Zero-Pill interactive segmented control) */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-b border-[#E7E9ED] pb-6">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F7F8FA] rounded-xl border border-[#E7E9ED]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-[#111318] shadow-sm'
                  : 'text-[#737780] hover:text-[#111318]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Media Type Segment */}
        <div className="flex items-center gap-1 text-xs text-[#737780]">
          <span className="text-[11px] font-mono mr-1">FORMAT:</span>
          <button
            onClick={() => setMediaTypeFilter('all')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              mediaTypeFilter === 'all' ? 'bg-[#111318] text-white' : 'hover:bg-[#F7F8FA]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setMediaTypeFilter('website')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              mediaTypeFilter === 'website' ? 'bg-[#111318] text-white' : 'hover:bg-[#F7F8FA]'
            }`}
          >
            Websites
          </button>
          <button
            onClick={() => setMediaTypeFilter('video')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              mediaTypeFilter === 'video' ? 'bg-[#111318] text-white' : 'hover:bg-[#F7F8FA]'
            }`}
          >
            Videos
          </button>
          <button
            onClick={() => setMediaTypeFilter('image')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              mediaTypeFilter === 'image' ? 'bg-[#111318] text-white' : 'hover:bg-[#F7F8FA]'
            }`}
          >
            Graphics
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center space-y-3 bg-[#F7F8FA] rounded-3xl border border-[#E7E9ED]">
          <p className="text-sm text-[#737780]">No projects found matching the current filter criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setMediaTypeFilter('all');
            }}
            className="text-xs font-semibold text-[#FF6A2A] hover:underline"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            // If website preview with URL, render the rich WebsitePreviewCard
            if (project.mediaType === 'website') {
              return <WebsitePreviewCard key={project.id} project={project} />;
            }

            // Video Project Card
            if (project.mediaType === 'video') {
              return (
                <div
                  key={project.id}
                  onClick={() => handleProjectClick(project)}
                  className="group bg-white rounded-2xl border border-[#E7E9ED] overflow-hidden hover:border-[#FF6A2A]/40 transition-all duration-300 hover:shadow-xl flex flex-col cursor-pointer"
                >
                  <div className="relative h-64 bg-black overflow-hidden">
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#FF6A2A] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur px-2 py-0.5 rounded text-[10px] font-mono text-white flex items-center gap-1">
                      <Video className="w-3 h-3 text-[#FF6A2A]" />
                      <span>VIDEO SHOWREEL</span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#737780] mb-1.5 font-medium">
                        <span>{project.category}</span>
                        {project.year && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{project.year}</span>
                          </>
                        )}
                      </div>
                      <h3 className="font-heading text-lg font-bold text-[#111318] group-hover:text-[#FF6A2A] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[#737780] line-clamp-2 mt-2 leading-relaxed">
                        {project.shortDescription}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E7E9ED] flex items-center justify-between text-xs font-semibold text-[#111318]">
                      <span className="flex items-center gap-1.5 text-[#FF6A2A]">
                        <Play className="w-3 h-3" />
                        <span>Watch Video Preview</span>
                      </span>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/project/${project.slug}`);
                        }}
                        className="text-[#737780] hover:text-[#111318] cursor-pointer"
                      >
                        Details →
                      </span>
                    </div>
                  </div>
                </div>
              );
            }

            // Graphic Design Project Card
            return (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className="group bg-white rounded-2xl border border-[#E7E9ED] overflow-hidden hover:border-[#FF6A2A]/40 transition-all duration-300 hover:shadow-xl flex flex-col cursor-pointer"
              >
                <div className="relative h-64 bg-[#F7F8FA] overflow-hidden">
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#111318] flex items-center gap-1.5 shadow-xl">
                      <Maximize2 className="w-3.5 h-3.5 text-[#FF6A2A]" />
                      <span>View Lightbox</span>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-mono text-[#111318] flex items-center gap-1">
                    <ImageIcon className="w-3 h-3 text-[#FF6A2A]" />
                    <span>GRAPHIC POSTER</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#737780] mb-1.5 font-medium">
                      <span>{project.category}</span>
                      {project.client && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="truncate">{project.client}</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-heading text-lg font-bold text-[#111318] group-hover:text-[#FF6A2A] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#737780] line-clamp-2 mt-2 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E7E9ED] flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#FF6A2A] flex items-center gap-1">
                      <Maximize2 className="w-3 h-3" />
                      <span>Enlarge Artwork</span>
                    </span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/project/${project.slug}`);
                      }}
                      className="text-[#737780] hover:text-[#111318] cursor-pointer"
                    >
                      Case Study →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CTA Section */}
      <div className="pt-12 border-t border-[#E7E9ED] flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#F7F8FA] p-8 rounded-3xl">
        <div className="space-y-1">
          <h3 className="font-heading font-bold text-xl text-[#111318]">
            Need a Bespoke Solution Built for Your Business?
          </h3>
          <p className="text-xs text-[#737780]">
            We architect and launch custom web applications, video pipelines, and AI calling systems.
          </p>
        </div>
        <button
          onClick={() => setStartProjectOpen(true)}
          className="px-6 py-3 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white font-semibold text-xs transition-colors shrink-0 cursor-pointer"
        >
          Start a Project Brief
        </button>
      </div>
    </div>
  );
};
