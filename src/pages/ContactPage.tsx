import React, { useState } from 'react';
import { useAgency } from '../context/AgencyContext';
import { api } from '../lib/api';
import {
  Phone,
  Mail,
  MessageSquare,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, addToast } = useAgency();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      addToast('Please complete all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.submitContact({ name, email, phone, subject, message });
      setSubmitted(true);
      addToast(res.message, 'success');
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      addToast(err.message || 'Failed to send message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Direct Communication</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-[#111318] tracking-tight">
          Connect with RYVO
        </h1>
        <p className="text-base sm:text-lg text-[#737780] leading-relaxed">
          Reach our team directly for project inquiries, technical partnerships, or general questions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Official Direct Contact Channels */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-[#111318] text-white p-8 rounded-3xl border border-white/10 space-y-6">
            <h2 className="font-heading text-xl font-bold text-white">
              Official Contact Directory
            </h2>

            <div className="space-y-4">
              {/* Telephone */}
              <a
                href={settings?.phoneLink || 'tel:+923082436424'}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FF6A2A] transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#FF6A2A] group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-white/50">Telephone</div>
                  <div className="text-sm font-semibold text-white group-hover:text-[#FF6A2A] transition-colors">
                    {settings?.phone || '+92 308 2436424'}
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href={settings?.emailLink || 'mailto:alexmorgan012012012@gmail.com'}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FF6A2A] transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#FF6A2A] group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-white/50">Email Address</div>
                  <div className="text-sm font-semibold text-white group-hover:text-[#FF6A2A] transition-colors truncate max-w-[220px] sm:max-w-none">
                    {settings?.email || 'alexmorgan012012012@gmail.com'}
                  </div>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={settings?.whatsappUrl || 'https://wa.me/923082436424'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-400 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-emerald-400">Direct WhatsApp</div>
                  <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    +92 308 2436424
                  </div>
                </div>
              </a>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center gap-3 text-xs text-white/60">
              <Clock className="w-4 h-4 text-[#FF6A2A]" />
              <span>Typical response time: Under 4 hours on business days</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#F7F8FA] border border-[#E7E9ED] space-y-2">
            <div className="text-xs font-bold text-[#111318] uppercase">Office Hours & Availability</div>
            <p className="text-xs text-[#737780] leading-relaxed">
              Monday through Saturday: 09:00 — 19:00 PKT (UTC+5). Available for global emergency escalations 24/7.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#E7E9ED] shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-[#111318]">Message Transmitted</h3>
              <p className="text-sm text-[#737780] max-w-md mx-auto">
                Thank you for contacting RYVO. Your message has been logged in our secure backend and our team will get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-[#111318] text-white text-xs font-semibold hover:bg-[#FF6A2A] transition-colors"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <h2 className="font-heading text-2xl font-bold text-[#111318]">
                  Send a Direct Message
                </h2>
                <p className="text-xs text-[#737780]">
                  Fill out this form and it will be delivered directly to our executive inbox.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                    Full Name <span className="text-[#FF6A2A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#FF6A2A] text-sm text-[#111318] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                    Email Address <span className="text-[#FF6A2A]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#FF6A2A] text-sm text-[#111318] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 308 2436424"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#FF6A2A] text-sm text-[#111318] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                    Subject Line <span className="text-[#FF6A2A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Project Inquiry / Agency Partnership"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#FF6A2A] text-sm text-[#111318] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                  Your Message <span className="text-[#FF6A2A]">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can RYVO help accelerate your digital roadmap?"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#FF6A2A] text-sm text-[#111318] transition-colors resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-[#737780]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Privacy protected</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? <span>Sending...</span> : <span>Send Message</span>}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
