import React, { useRef } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { X, Play, Pause, Volume2, Sparkles, MessageSquare } from 'lucide-react';

export const VideoPlayerModal: React.FC = () => {
  const { activeVideo, setActiveVideo, setStartProjectOpen } = useAgency();
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!activeVideo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111318] rounded-2xl border border-white/20 shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6A2A]" />
            <h3 className="font-heading font-bold text-base truncate">{activeVideo.title}</h3>
          </div>
          <button
            onClick={() => setActiveVideo(null)}
            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas */}
        <div className="relative bg-black flex items-center justify-center min-h-[360px] sm:min-h-[460px]">
          <video
            ref={videoRef}
            src={activeVideo.url}
            controls
            autoPlay
            playsInline
            className="max-h-[70vh] w-full object-contain"
          />
        </div>

        {/* Footer CTA */}
        <div className="p-4 bg-[#1A1D24] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-white/70">
          <div>
            Cut with surgical pacing, bespoke sound design, and kinetic typography by RYVO.
          </div>
          <button
            onClick={() => {
              setActiveVideo(null);
              setStartProjectOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-[#FF6A2A] hover:bg-[#ff7b42] text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Commission Similar Edit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
