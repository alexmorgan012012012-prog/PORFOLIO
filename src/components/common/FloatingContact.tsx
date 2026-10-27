import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { MessageSquare, Phone, Mail, X, Sparkles } from 'lucide-react';

export const FloatingContact: React.FC = () => {
  const { settings, setStartProjectOpen } = useAgency();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none">
      {isOpen && (
        <div className="bg-white rounded-2xl p-4 shadow-2xl border border-[#E7E9ED] w-72 space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-[#E7E9ED]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-[#111318]">Direct Agency Connect</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-[#737780] hover:bg-[#F7F8FA]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5">
            {/* WhatsApp */}
            <a
              href={settings?.whatsappUrl || 'https://wa.me/923082436424'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50 text-emerald-800 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#111318]">WhatsApp Business</div>
                <div className="text-[11px] text-[#737780] truncate">+92 308 2436424</div>
              </div>
            </a>

            {/* Email */}
            <a
              href={settings?.emailLink || 'mailto:alexmorgan012012012@gmail.com'}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F7F8FA] transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#111318] text-[#FF6A2A] flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#111318]">Official Email</div>
                <div className="text-[11px] text-[#737780] truncate">{settings?.email || 'alexmorgan012012012@gmail.com'}</div>
              </div>
            </a>

            {/* Phone Call */}
            <a
              href={settings?.phoneLink || 'tel:+923082436424'}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F7F8FA] transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#F7F8FA] border border-[#E7E9ED] text-[#111318] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#111318]">Direct Phone</div>
                <div className="text-[11px] text-[#737780] truncate">{settings?.phone || '+92 308 2436424'}</div>
              </div>
            </a>
          </div>

          <div className="pt-2 border-t border-[#E7E9ED]">
            <button
              onClick={() => {
                setIsOpen(false);
                setStartProjectOpen(true);
              }}
              className="w-full py-2 px-3 rounded-xl bg-[#FF6A2A] hover:bg-[#ff7b42] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start a Project Brief</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-13 h-13 rounded-2xl bg-[#111318] text-white hover:bg-[#FF6A2A] shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-white/10 active:scale-95"
        aria-label="Quick contact"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageSquare className="w-6 h-6 text-[#FF6A2A] group-hover:text-white transition-colors" />
        )}
      </button>
    </div>
  );
};
