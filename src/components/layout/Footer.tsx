import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { Logo } from '../common/Logo';
import { api } from '../../lib/api';
import {
  Phone,
  Mail,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Tag,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, services, navigate, setStartProjectOpen, addToast } = useAgency();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast('Please enter a valid work email address.', 'error');
      return;
    }
    setIsSubscribing(true);
    try {
      const res = await api.subscribeNewsletter(newsletterEmail);
      setSubscribed(true);
      addToast(res.message, 'success');
      setNewsletterEmail('');
    } catch {
      addToast('Subscription could not be processed.', 'error');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-[#111318] text-white border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top CTA Banner */}
        <div className="mb-16 pb-16 border-b border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#FF6A2A] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Independent Digital Studio · International Delivery</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Have a Vision? Let's Build It.
            </h2>
            <p className="text-sm text-white/70 leading-relaxed">
              Transforming ambitious brands through high-performance software, AI calling, viral video editing, and digital marketing.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/start-project')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF6A2A] hover:bg-[#ff7b42] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#FF6A2A]/25 cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/client/register')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wider transition-all cursor-pointer border border-white/10"
            >
              <Tag className="w-3.5 h-3.5 text-[#FF6A2A]" />
              <span>Get 25% Off</span>
            </button>
          </div>
        </div>

        {/* 6 Structured Columns as required */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-16">
          {/* Column 1: RYVO */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="dark" className="h-10" />
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              RYVO helps businesses grow through high-performance websites, mobile apps, creative content, AI automation, and digital marketing.
            </p>
            <p className="text-xs text-white/50 max-w-sm font-medium">
              We Build. We Automate. We Create.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2 max-w-sm space-y-2">
              <div className="text-[11px] font-bold text-white uppercase tracking-wider">
                Agency Newsletter
              </div>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter work email"
                  required
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#FF6A2A]"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-3.5 py-2 bg-[#FF6A2A] hover:bg-[#ff7b42] text-white rounded-xl text-xs font-bold shrink-0 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {subscribed ? 'Joined' : 'Join'}
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: EXPLORE */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF6A2A]">
              Explore
            </h3>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <button onClick={() => navigate('/')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-white transition-colors cursor-pointer text-left">
                  About RYVO
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/portfolio')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/industries')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Industries We Serve
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/process')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Our Process
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: SERVICES */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF6A2A]">
              Services
            </h3>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <button onClick={() => navigate('/services/website-development')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Website Development
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services/video-editing')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Video Editing
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services/ai-automation')} className="hover:text-white transition-colors cursor-pointer text-left">
                  AI Automation
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services/app-development')} className="hover:text-white transition-colors cursor-pointer text-left">
                  App Development
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services/graphic-design')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Graphic Design
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services/digital-marketing')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Digital Marketing
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services')} className="text-[#FF6A2A] hover:underline pt-1 inline-block">
                  View All 12 Services →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: RESOURCES */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF6A2A]">
              Resources
            </h3>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <button onClick={() => navigate('/blog')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Blog & Insights
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/faq')} className="hover:text-white transition-colors cursor-pointer text-left">
                  FAQs
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/pricing')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Pricing & Packages
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/technology')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Tech & Tools
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/why-ryvo')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Why Choose RYVO
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: GET STARTED & CONTACT */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF6A2A]">
              Get Started
            </h3>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <button onClick={() => navigate('/start-project')} className="text-white font-semibold hover:text-[#FF6A2A] transition-colors cursor-pointer text-left flex items-center gap-1.5">
                  <span>Start a Project</span>
                  <ArrowRight className="w-3 h-3 text-[#FF6A2A]" />
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/client/register')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Register Account
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/client/register')} className="text-[#FF6A2A] font-bold hover:underline transition-colors cursor-pointer text-left">
                  Get 25% Off Code
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/book-call')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Book Discovery Call
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/client/login')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Client Portal Login
                </button>
              </li>
            </ul>

            {/* Direct Contact Links */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              <a
                href={settings?.phoneLink || 'tel:+923082436424'}
                className="flex items-center gap-2 text-xs text-white/80 hover:text-[#FF6A2A] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#FF6A2A] shrink-0" />
                <span>+92 308 2436424</span>
              </a>
              <a
                href={settings?.emailLink || 'mailto:alexmorgan012012012@gmail.com'}
                className="flex items-center gap-2 text-xs text-white/80 hover:text-[#FF6A2A] transition-colors truncate"
              >
                <Mail className="w-3.5 h-3.5 text-[#FF6A2A] shrink-0" />
                <span className="truncate">alexmorgan012012012@gmail.com</span>
              </a>
              <a
                href={settings?.whatsappUrl || 'https://wa.me/923082436424'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-white/80 hover:text-emerald-400 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>WhatsApp: +92 308 2436424</span>
              </a>
            </div>
          </div>
        </div>

        {/* Absolute Bottom Bar with Small Discreet Admin Portal Link */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span>Copyright © 2026 RYVO Digital Agency. All rights reserved.</span>
            <span>·</span>
            <button
              onClick={() => navigate('/admin/login')}
              className="text-white/25 hover:text-white/70 transition-colors cursor-pointer text-[11px]"
              title="Restricted Staff & Admin Portal"
            >
              Admin Portal
            </button>
          </div>
          <div className="flex items-center gap-5">
            <button onClick={() => navigate('/privacy')} className="hover:text-white/80 transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span>·</span>
            <button onClick={() => navigate('/terms')} className="hover:text-white/80 transition-colors cursor-pointer">
              Terms of Service
            </button>
            <span>·</span>
            <button onClick={() => navigate('/cookie-policy')} className="hover:text-white/80 transition-colors cursor-pointer">
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
