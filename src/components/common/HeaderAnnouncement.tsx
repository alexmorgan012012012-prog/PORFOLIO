import React from 'react';
import { useAgency } from '../../context/AgencyContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HeaderAnnouncement: React.FC = () => {
  const { settings, navigate } = useAgency();

  if (!settings?.announcementBar?.enabled || !settings.announcementBar.text) {
    return null;
  }

  const { text, linkText, linkUrl } = settings.announcementBar;

  return (
    <div className="relative bg-[#111318] text-white text-xs font-medium py-2 px-4 border-b border-white/10 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden mx-auto">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6A2A] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6A2A]"></span>
          </span>
          <span className="truncate text-white/90 tracking-wide">{text}</span>
          {linkText && linkUrl && (
            <button
              onClick={() => navigate(linkUrl)}
              className="inline-flex items-center gap-1 text-[#FF6A2A] hover:text-white transition-colors ml-1 font-semibold underline decoration-[#FF6A2A]/40 underline-offset-4 cursor-pointer"
            >
              <span>{linkText}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
