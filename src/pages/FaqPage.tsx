import React, { useState } from 'react';
import { useAgency } from '../context/AgencyContext';
import { ChevronDown, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const { setStartProjectOpen, navigate, settings } = useAgency();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does RYVO differ from traditional marketing agencies?',
      a: 'Traditional agencies outsource code to cheap third-party themes or bloated WordPress builders that load slowly and require constant maintenance retainers. RYVO builds custom, fullstack TypeScript web applications with modern design systems, integrated private admin panels, and autonomous AI automation pipelines.',
    },
    {
      q: 'Will I be able to update my website content without editing code?',
      a: 'Yes. Every web application we deliver includes a private admin portal allowing administrators to create and edit services, upload portfolio projects, manage website copy, review incoming client inquiries, and view privacy-first analytics without touching source code.',
    },
    {
      q: 'How does the interactive live website preview work?',
      a: 'You can input any completed project website URL from your private admin portal. When published, the public portfolio renders a browser-style preview window with automatic hover scrolling, pause/resume/reset controls, and fullscreen options. If an external site restricts direct iframe embedding via security headers, an authentic high-resolution preview and direct live link are seamlessly provided.',
    },
    {
      q: 'What are AI Calling Agents and how do they work?',
      a: 'AI Calling Agents are conversational voice systems engineered for sub-500ms response times. They can handle inbound inquiries, answer business FAQs, qualify sales leads, and book calendar appointments directly into your CRM around the clock with human-like cadence.',
    },
    {
      q: 'What is your typical project delivery timeline?',
      a: 'Creative video and graphic sprints are typically delivered within 1 to 2 weeks. Fullstack website applications with custom admin panels typically take 3 to 6 weeks depending on requirements.',
    },
    {
      q: 'Do you offer ongoing technical maintenance and support?',
      a: 'Yes, we provide post-launch SLA monitoring, server maintenance, continuous conversion optimization, and quarterly retainer options.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Clarity & Methodology</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#111318] tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-[#737780] max-w-xl mx-auto">
          Everything you need to know about our engineering standards, turnaround times, and delivery practices.
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-[#E7E9ED] bg-white overflow-hidden shadow-sm"
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-base text-[#111318] hover:text-[#FF6A2A] transition-colors cursor-pointer"
            >
              <span>{faq.q}</span>
              <ChevronDown
                className={`w-5 h-5 text-[#737780] shrink-0 transition-transform ${
                  openIdx === idx ? 'rotate-180 text-[#FF6A2A]' : ''
                }`}
              />
            </button>
            {openIdx === idx && (
              <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-[#737780] leading-relaxed border-t border-[#E7E9ED]/60 bg-[#F7F8FA]">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Still Have Questions CTA */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#111318] text-white text-center space-y-4">
        <h3 className="font-heading font-bold text-2xl">Still Have Specific Questions?</h3>
        <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto">
          Reach out directly to our team via WhatsApp or email for immediate answers.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href={settings?.whatsappUrl || 'https://wa.me/923082436424'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </a>
          <button
            onClick={() => navigate('/contact')}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Send Inquiry Form
          </button>
        </div>
      </div>
    </div>
  );
};
