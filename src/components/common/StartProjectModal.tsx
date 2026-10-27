import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { api } from '../../lib/api';
import {
  X,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  ShieldCheck,
} from 'lucide-react';

export const StartProjectModal: React.FC = () => {
  const {
    isStartProjectOpen,
    setStartProjectOpen,
    services,
    settings,
    navigate,
    addToast,
    refreshInquiries,
  } = useAgency();

  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [serviceRequested, setServiceRequested] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [timeline, setTimeline] = useState('');
  const [referenceWebsite, setReferenceWebsite] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isStartProjectOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !email || !serviceRequested || !projectDescription) {
      addToast('Please fill in your name, email, target service, and project summary.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.submitInquiry({
        clientName,
        email,
        phone,
        companyName,
        serviceRequested,
        projectDescription,
        budgetRange,
        timeline,
        referenceWebsite,
      });

      addToast(res.message, 'success');
      setStartProjectOpen(false);
      await refreshInquiries();

      // Navigate to confirmation page with inquiry ID
      navigate('/inquiry-confirmation', { id: res.inquiryId, name: clientName, service: serviceRequested });

      // Reset form
      setClientName('');
      setEmail('');
      setPhone('');
      setCompanyName('');
      setServiceRequested('');
      setProjectDescription('');
      setBudgetRange('');
      setTimeline('');
      setReferenceWebsite('');
    } catch (err: any) {
      addToast(err.message || 'Failed to submit project inquiry.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#E7E9ED] shadow-2xl w-full max-w-2xl my-auto overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#111318] text-white p-6 sm:p-8 flex items-start justify-between relative">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF6A2A] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Project Scoping Brief</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Start a Project with RYVO
            </h2>
            <p className="text-xs sm:text-sm text-white/70">
              Tell us about your objectives. We will review requirements and schedule a technical discovery call.
            </p>
          </div>
          <button
            onClick={() => setStartProjectOpen(false)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                Your Full Name <span className="text-[#FF6A2A]">*</span>
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Marcus Vance"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#FF6A2A] text-sm text-[#111318] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                Work Email Address <span className="text-[#FF6A2A]">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="marcus@company.com"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#FF6A2A] text-sm text-[#111318] transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Phone & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                Phone / WhatsApp (Optional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555 0192"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#FF6A2A] text-sm text-[#111318] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                Company / Organization (Optional)
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Acme Innovations"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#FF6A2A] text-sm text-[#111318] transition-colors"
              />
            </div>
          </div>

          {/* Service Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
              Primary Service Needed <span className="text-[#FF6A2A]">*</span>
            </label>
            <select
              required
              value={serviceRequested}
              onChange={(e) => setServiceRequested(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#FF6A2A] text-sm text-[#111318] transition-colors"
            >
              <option value="">Select a primary service discipline...</option>
              {services.map((s) => (
                <option key={s.id} value={s.title}>
                  {s.title} ({s.category})
                </option>
              ))}
              <option value="Multi-Service Retainer">Multi-Service Retainer / Custom Scope</option>
            </select>
          </div>

          {/* Row 3: Budget & Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                Target Budget Range
              </label>
              <select
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#FF6A2A] text-sm text-[#111318] transition-colors"
              >
                <option value="">Select an estimated investment...</option>
                <option value="$1,500 - $3,500">$1,500 - $3,500</option>
                <option value="$3,500 - $7,500">$3,500 - $7,500</option>
                <option value="$7,500 - $15,000">$7,500 - $15,000</option>
                <option value="$15,000 - $30,000+">$15,000 - $30,000+</option>
                <option value="Enterprise / Dedicated Retainer">Enterprise / Dedicated Retainer</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                Estimated Delivery Timeline
              </label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#FF6A2A] text-sm text-[#111318] transition-colors"
              >
                <option value="">Select expected launch window...</option>
                <option value="Immediate (< 2 Weeks)">Immediate (&lt; 2 Weeks)</option>
                <option value="3 - 4 Weeks">3 - 4 Weeks</option>
                <option value="1 - 2 Months">1 - 2 Months</option>
                <option value="Flexible / Ongoing">Flexible / Ongoing</option>
              </select>
            </div>
          </div>

          {/* Reference URL */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
              Reference Website or Competitor URL (Optional)
            </label>
            <input
              type="url"
              value={referenceWebsite}
              onChange={(e) => setReferenceWebsite(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#FF6A2A] text-sm text-[#111318] transition-colors"
            />
          </div>

          {/* Project Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
              Project Scope & Objectives <span className="text-[#FF6A2A]">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Describe what you want to build or automate. Include any current bottlenecks, target metrics, or design inspirations..."
              className="w-full px-4 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#FF6A2A] text-sm text-[#111318] transition-colors resize-none"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#737780]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Strict NDA confidentiality guaranteed.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white font-semibold text-sm transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Submitting Brief...</span>
              ) : (
                <>
                  <span>Submit Project Brief</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
