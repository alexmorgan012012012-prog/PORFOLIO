import React, { useState } from 'react';
import { useAgency } from '../context/AgencyContext';
import { api } from '../lib/api';
import {
  Sparkles,
  ArrowRight,
  Calendar,
  Clock,
  CheckCircle2,
  Calculator,
  ShieldCheck,
  Briefcase,
  Users,
  Building,
  Mail,
} from 'lucide-react';

// ==========================================
// 1. REQUEST A QUOTE (Interactive Estimator)
// ==========================================
export const RequestQuotePage: React.FC = () => {
  const { services, navigate, addToast, refreshInquiries } = useAgency();

  const [selectedServices, setSelectedServices] = useState<string[]>(['Website Development']);
  const [tier, setTier] = useState<'Standard' | 'Performance' | 'Enterprise'>('Performance');
  const [timeline, setTimeline] = useState('4 Weeks');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Approximate estimator math
  const baseServiceCost = selectedServices.length * 2000;
  const multiplier = tier === 'Standard' ? 1 : tier === 'Performance' ? 1.4 : 2.2;
  const estimatedCost = Math.round(baseServiceCost * multiplier);

  const toggleService = (title: string) => {
    if (selectedServices.includes(title)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== title));
      }
    } else {
      setSelectedServices([...selectedServices, title]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      addToast('Please enter your name and email.', 'error');
      return;
    }
    try {
      const summary = `Quote Estimate: ~$${estimatedCost.toLocaleString()} (${tier} Tier, ${timeline}). Selected Disciplines: ${selectedServices.join(', ')}. Details: ${notes}`;
      const res = await api.submitInquiry({
        clientName: name,
        email,
        serviceRequested: selectedServices.join(' + '),
        projectDescription: summary,
        budgetRange: `$${estimatedCost.toLocaleString()} Estimated`,
        timeline,
      });
      setSubmitted(true);
      await refreshInquiries();
      addToast('Quote request registered successfully.', 'success');
    } catch (err: any) {
      addToast(err.message || 'Failed to submit quote request', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
          <Calculator className="w-3.5 h-3.5" />
          <span>Transparent Scope Estimator</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#111318]">
          Request a Tailored Quote
        </h1>
        <p className="text-sm text-[#737780]">
          Configure your service requirements below for an instant indicative estimate and customized project proposal.
        </p>
      </div>

      {submitted ? (
        <div className="p-10 bg-white rounded-3xl border border-[#E7E9ED] text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="font-heading font-bold text-2xl text-[#111318]">Quote Request Logged</h2>
          <p className="text-sm text-[#737780] max-w-md mx-auto">
            Thank you, {name}. Our technical estimators will prepare an itemized milestone specification and email you within 4 business hours.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 rounded-xl bg-[#111318] text-white text-xs font-semibold hover:bg-[#FF6A2A] transition-colors"
          >
            Return to Homepage
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8 sm:p-10 bg-white rounded-3xl border border-[#E7E9ED] shadow-sm space-y-8">
          {/* Service Picker */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
              1. Select Target Disciplines:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {services.slice(0, 9).map((s) => {
                const selected = selectedServices.includes(s.title);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleService(s.title)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                      selected
                        ? 'border-[#FF6A2A] bg-orange-50/40 text-[#111318] shadow-sm ring-1 ring-[#FF6A2A]'
                        : 'border-[#E7E9ED] bg-[#F7F8FA] text-[#737780] hover:border-[#111318]'
                    }`}
                  >
                    {s.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tier Picker */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
              2. Choose Engagement Architecture:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { name: 'Standard', desc: 'Core delivery with clean architecture & source files.' },
                { name: 'Performance', desc: 'High-pacing motion, sub-second latency & private admin.' },
                { name: 'Enterprise', desc: 'Dedicated engineering squad, autonomous AI & priority SLA.' },
              ].map((t) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setTier(t.name as any)}
                  className={`p-4 rounded-2xl border text-left space-y-1 transition-all cursor-pointer ${
                    tier === t.name
                      ? 'border-[#FF6A2A] bg-[#111318] text-white shadow-md'
                      : 'border-[#E7E9ED] bg-[#F7F8FA] text-[#111318] hover:border-[#111318]'
                  }`}
                >
                  <div className="font-heading font-bold text-sm">{t.name}</div>
                  <div className={`text-[11px] leading-snug ${tier === t.name ? 'text-white/70' : 'text-[#737780]'}`}>
                    {t.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Live Estimate Ticker */}
          <div className="p-6 rounded-2xl bg-[#111318] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono text-[#FF6A2A] uppercase">
                ESTIMATED INVESTMENT RANGE
              </div>
              <div className="font-heading font-extrabold text-3xl">
                ~${estimatedCost.toLocaleString()}
              </div>
            </div>
            <div className="text-xs text-white/70 text-right">
              Indicative milestone scope · Final quotation provided post-brief review
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111318] uppercase">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Marcus Vance"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-xs bg-[#F7F8FA] focus:bg-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111318] uppercase">Work Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="marcus@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-xs bg-[#F7F8FA] focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#FF6A2A] hover:bg-[#ff7b42] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Request Official Proposal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      )}
    </div>
  );
};

// ==========================================
// 2. BOOK A DISCOVERY CALL (Real Booking)
// ==========================================
export const BookCallPage: React.FC = () => {
  const { services, addToast, navigate } = useAgency();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [date, setDate] = useState('2026-10-30');
  const [timeSlot, setTimeSlot] = useState('14:00 PKT (UTC+5)');
  const [serviceTopic, setServiceTopic] = useState('Website Development');
  const [notes, setNotes] = useState('');
  const [booked, setBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !date || !timeSlot) {
      addToast('Please complete all required fields.', 'error');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await api.bookDiscoveryCall({
        name,
        email,
        phone,
        company,
        date,
        timeSlot,
        serviceTopic,
        notes,
      });
      setBooked(true);
      addToast(res.message, 'success');
    } catch (err: any) {
      addToast(err.message || 'Booking failed.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" />
          <span>Technical Architecture Review</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#111318]">
          Book a 30-Min Discovery Session
        </h1>
        <p className="text-sm text-[#737780] max-w-md mx-auto">
          Speak directly with a RYVO solutions architect to evaluate technical feasibility, timelines, and costs.
        </p>
      </div>

      {booked ? (
        <div className="p-10 bg-white rounded-3xl border border-[#E7E9ED] text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="font-heading font-bold text-2xl text-[#111318]">Session Scheduled</h2>
          <p className="text-sm text-[#737780] max-w-md mx-auto">
            We have reserved your discovery session for <strong>{date} at {timeSlot}</strong>. A calendar invite has been dispatched to {email}.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 rounded-xl bg-[#111318] text-white text-xs font-semibold hover:bg-[#FF6A2A] transition-colors"
          >
            Return to Agency Home
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8 sm:p-10 bg-white rounded-3xl border border-[#E7E9ED] shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111318]">Your Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Marcus Vance"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-xs bg-[#F7F8FA]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111318]">Work Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="marcus@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-xs bg-[#F7F8FA]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111318]">Preferred Date *</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-xs bg-[#F7F8FA]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111318]">Time Slot *</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-xs bg-[#F7F8FA]"
              >
                <option value="11:00 PKT (UTC+5)">11:00 PKT (06:00 UTC)</option>
                <option value="14:00 PKT (UTC+5)">14:00 PKT (09:00 UTC)</option>
                <option value="16:30 PKT (UTC+5)">16:30 PKT (11:30 UTC)</option>
                <option value="19:00 PKT (UTC+5)">19:00 PKT (14:00 UTC)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#111318]">Primary Topic</label>
            <select
              value={serviceTopic}
              onChange={(e) => setServiceTopic(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-xs bg-[#F7F8FA]"
            >
              {services.map((s) => (
                <option key={s.id} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#111318]">Key Objectives / Questions</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What specific questions would you like addressed during the call?"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-xs bg-[#F7F8FA] resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Reserving Slot...' : 'Confirm Discovery Session'}</span>
          </button>
        </form>
      )}
    </div>
  );
};

// ==========================================
// 3. CAREERS PAGE
// ==========================================
export const CareersPage: React.FC = () => {
  const { navigate, setStartProjectOpen } = useAgency();

  const openings = [
    { title: 'Senior Fullstack TypeScript Engineer', type: 'Full-time · Remote', desc: 'Architecting React 19 web applications, PostgreSQL schemas, and low-latency Node services.' },
    { title: 'Lead 2D/3D Motion Graphics Artist', type: 'Contract / Full-time', desc: 'Crafting viral short-form video pacing, kinetic typography, and after-effects title suites.' },
    { title: 'Conversational Voice AI Engineer', type: 'Full-time · Remote', desc: 'Building sub-500ms voice agent pipelines, WebRTC streaming, and LLM function calling systems.' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
          <Users className="w-3.5 h-3.5" />
          <span>Talent & Culture</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#111318]">
          Build the Future with RYVO
        </h1>
        <p className="text-sm text-[#737780] max-w-md mx-auto">
          We operate as an elite, high-velocity engineering and creative studio. Zero bureaucracy, pure craft.
        </p>
      </div>

      <div className="space-y-4">
        {openings.map((op, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-white border border-[#E7E9ED] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-base text-[#111318]">{op.title}</h3>
              <div className="text-[11px] font-mono text-[#FF6A2A]">{op.type}</div>
              <p className="text-xs text-[#737780]">{op.desc}</p>
            </div>
            <a
              href="mailto:alexmorgan012012012@gmail.com?subject=Career Application"
              className="px-4 py-2 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white text-xs font-semibold shrink-0 transition-colors text-center"
            >
              Apply via Email
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 4. PARTNERSHIPS PAGE
// ==========================================
export const PartnershipsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
          <Building className="w-3.5 h-3.5" />
          <span>Agency Collaboration</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#111318]">
          White-Label & Referral Partnerships
        </h1>
        <p className="text-sm text-[#737780] max-w-md mx-auto">
          Expand your agency capacity with white-label video production, custom TypeScript development, and AI voice infrastructure.
        </p>
      </div>

      <div className="p-8 bg-white rounded-3xl border border-[#E7E9ED] space-y-6 text-sm text-[#202124] leading-relaxed">
        <h2 className="font-heading font-bold text-xl text-[#111318]">How We Partner</h2>
        <p>
          We partner with creative shops, growth agencies, and management consultants who need reliable technical execution without the overhead of hiring in-house engineering and 3D motion departments.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E7E9ED] space-y-1">
            <strong className="text-[#111318]">White-Label Delivery</strong>
            <p className="text-xs text-[#737780]">We work under your agency brand, using your Slack and communication channels under strict NDA.</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E7E9ED] space-y-1">
            <strong className="text-[#111318]">Referral Commissions</strong>
            <p className="text-xs text-[#737780]">Earn recurring referral commissions on enterprise software and AI calling contracts you introduce.</p>
          </div>
        </div>
        <div className="pt-4 border-t border-[#E7E9ED] flex justify-center">
          <a
            href="mailto:alexmorgan012012012@gmail.com?subject=Agency Partnership Inquiry"
            className="px-6 py-3 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white text-xs font-semibold transition-colors flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>Inquire About Partnership</span>
          </a>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. COOKIE POLICY
// ==========================================
export const CookiePolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-sm text-[#202124] leading-relaxed">
      <h1 className="font-heading text-3xl font-extrabold text-[#111318]">Cookie Policy</h1>
      <p className="text-xs text-[#737780]">Effective Date: October 2026</p>
      <div className="space-y-4">
        <p>
          RYVO Digital Agency respects your privacy. We use minimal, strictly necessary cookies for session authentication and privacy-conscious first-party telemetry.
        </p>
        <h2 className="font-heading font-bold text-lg text-[#111318]">No Third-Party Cross-Site Trackers</h2>
        <p>
          We do not sell user data to advertising data brokers or employ invasive fingerprinting scripts. Session tokens are used solely to preserve client and administrator authentication state.
        </p>
      </div>
    </div>
  );
};
