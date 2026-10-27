import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { X, ChevronLeft, ChevronRight, ZoomIn, Download, Sparkles } from 'lucide-react';

export const GraphicLightboxModal: React.FC = () => {
  const { activeLightbox, setActiveLightbox, setStartProjectOpen } = useAgency();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!activeLightbox || !activeLightbox.images?.length) return null;

  const images = activeLightbox.images;
  const currentImg = images[currentIndex] || images[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[85vh] flex flex-col justify-between">
        {/* Top bar */}
        <div className="flex items-center justify-between text-white pb-3 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6A2A]" />
            <h3 className="font-heading font-semibold text-sm sm:text-base">{activeLightbox.title}</h3>
            {images.length > 1 && (
              <span className="text-xs text-white/50 ml-2">
                ({currentIndex + 1} / {images.length})
              </span>
            )}
          </div>
          <button
            onClick={() => setActiveLightbox(null)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image viewport */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden">
          <img
            src={currentImg}
            alt={activeLightbox.title}
            className="max-w-full max-h-full object-contain rounded-xl select-none shadow-2xl transition-all duration-300"
          />

          {/* Navigation Arrows if multiple images */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 p-3 rounded-full bg-black/60 hover:bg-[#FF6A2A] text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 p-3 rounded-full bg-black/60 hover:bg-[#FF6A2A] text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Bottom bar */}
        <div className="pt-3 flex flex-wrap items-center justify-between gap-4 text-xs text-white/70 z-10">
          <div className="flex items-center gap-2">
            {images.length > 1 && (
              <div className="flex items-center gap-1.5">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentIndex ? 'border-[#FF6A2A] scale-105' : 'border-white/20 opacity-60'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setActiveLightbox(null);
              setStartProjectOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-[#FF6A2A] hover:bg-[#ff7b42] text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Commission Visual Identity</span>
          </button>
        </div>
      </div>
    </div>
  );
};
