import React, { useState, useEffect } from 'react';
import { useAgency } from '../context/AgencyContext';
import { api } from '../lib/api';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Tag,
  DollarSign,
  Calendar,
  Globe,
  Check,
  AlertCircle,
  Copy,
} from 'lucide-react';

const availableServices = [
  { id: 'website-development', name: 'Website Development', desc: 'Custom React platforms, web apps & marketing sites' },
  { id: 'app-development', name: 'App Development', desc: 'Native iOS, Android & cross-platform apps' },
  { id: 'video-editing', name: 'Video Editing', desc: 'Viral Reels, YouTube productions & commercial edits' },
  { id: 'graphic-design', name: 'Graphic Design', desc: 'Brand identity, social assets & promotional design' },
  { id: 'ai-automation', name: 'AI Automation', desc: 'Workflow pipelines, CRM integrations & autonomous agents' },
  { id: 'ai-calling', name: 'AI Calling Agents', desc: 'Real-time conversational voice agents & appointment bots' },
  { id: 'digital-marketing', name: 'Digital Marketing', desc: 'Paid social media campaigns & high-ROAS creative' },
  { id: 'seo', name: 'SEO (Search Optimization)', desc: 'Technical audits, ranking strategies & content tuning' },
  { id: 'game-development', name: 'Game Development', desc: '2D/3D interactive games, prototypes & WebGL' },
  { id: 'ecommerce-solutions', name: 'E-commerce Solutions', desc: 'Headless stores, shopping carts & custom checkouts' },
  { id: 'ui-ux-design', name: 'UI/UX Design', desc: 'Wireframes, prototypes & design system tokens' },
  { id: 'other', name: 'Other Custom Engineering', desc: 'Enterprise business tools & custom API integrations' },
];

const budgetRanges = [
  { label: '$1,000 - $3,000', approx: 2000, desc: 'Essential MVP, focused scope, fast turnaround' },
  { label: '$3,000 - $7,500', approx: 5000, desc: 'Growth tier, advanced animations & full custom build' },
  { label: '$7,500 - $15,000', approx: 11000, desc: 'Enterprise scale, multi-platform & automated AI pipelines' },
  { label: '$15,000+', approx: 20000, desc: 'Flagship multi-discipline technical architecture' },
];

const timelineOptions = [
  'Urgent (< 2 Weeks)',
  '2 - 4 Weeks (Standard)',
  '1 - 2 Months',
  'Flexible / Ongoing Partnership',
];

export const StartProjectPage: React.FC = () => {
  const { clientUser, navigate, addToast, refreshInquiries, activeRoute } = useAgency();

  // Current Step: 1 to 6
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Selected Services
  const [selectedServices, setSelectedServices] = useState<string[]>(['Website Development']);

  // Step 2: Project Details
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [referenceWebsite, setReferenceWebsite] = useState('');

  // Step 3: Budget & Timeline
  const [selectedBudget, setSelectedBudget] = useState('$3,000 - $7,500');
  const [selectedTimeline, setSelectedTimeline] = useState('2 - 4 Weeks (Standard)');

  // Step 4: Contact Details
  const [clientName, setClientName] = useState(clientUser?.name || '');
  const [email, setEmail] = useState(clientUser?.email || '');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState(clientUser?.company || '');

  // Step 5: Discount & Coupon Code
  const [couponCode, setCouponCode] = useState('');
  const [couponValidating, setCouponValidating] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponError, setCouponError] = useState('');

  // Step 6: Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if coupon passed via navigation state or client account
  useEffect(() => {
    if (activeRoute.params?.coupon) {
      setCouponCode(activeRoute.params.coupon);
      applyCoupon(activeRoute.params.coupon);
    } else if (clientUser?.coupon && clientUser.coupon.status === 'active') {
      setCouponCode(clientUser.coupon.code);
    }
  }, [activeRoute, clientUser]);

  const toggleService = (name: string) => {
    if (selectedServices.includes(name)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== name));
      }
    } else {
      setSelectedServices([...selectedServices, name]);
    }
  };

  const applyCoupon = async (codeToTest?: string) => {
    const code = (codeToTest || couponCode).trim();
    if (!code) {
      setCouponError('Please enter a coupon code.');
      return;
    }
    setCouponValidating(true);
    setCouponError('');
    try {
      const res = await api.validateCoupon(code, email || undefined);
      setDiscountApplied(true);
      setDiscountPercent(res.discountPercent || 25);
      setCouponCode(code.toUpperCase());
      addToast(`25% Discount Coupon (${code.toUpperCase()}) successfully applied!`, 'success');
    } catch (err: any) {
      setDiscountApplied(false);
      setDiscountPercent(0);
      setCouponError(err.message || 'Invalid coupon code');
    } finally {
      setCouponValidating(false);
    }
  };

  const removeCoupon = () => {
    setDiscountApplied(false);
    setDiscountPercent(0);
    setCouponCode('');
    setCouponError('');
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (selectedServices.length === 0) {
        addToast('Please select at least one service.', 'error');
        return;
      }
    }
    if (currentStep === 2) {
      if (!projectDescription.trim()) {
        addToast('Please provide a brief project description.', 'error');
        return;
      }
    }
    if (currentStep === 4) {
      if (!clientName.trim() || !email.trim() || !email.includes('@')) {
        addToast('Please enter your full name and valid email address.', 'error');
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 6));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const fullBrief = `[Project Title: ${projectTitle || 'Untitled Brief'}]\nServices: ${selectedServices.join(', ')}\nDetails: ${projectDescription}\nReference URLs: ${referenceWebsite || 'None provided'}\nTimeline: ${selectedTimeline}`;

      const res = await api.submitInquiry({
        clientName,
        email,
        phone,
        companyName,
        serviceRequested: selectedServices.join(' + '),
        projectDescription: fullBrief,
        budgetRange: selectedBudget,
        timeline: selectedTimeline,
        referenceWebsite,
        couponCode: discountApplied ? couponCode : undefined,
        discountApplied,
        discountPercent: discountApplied ? discountPercent : undefined,
        originalEstimate: selectedBudget,
        discountedEstimate: discountApplied ? `${selectedBudget} (25% OFF APPLIED)` : undefined,
      });

      await refreshInquiries();
      navigate('/inquiry-confirmation', {
        id: res.inquiryId,
        name: clientName,
        service: selectedServices.join(' + '),
        discountApplied: discountApplied ? 'true' : 'false',
        couponCode: couponCode || '',
      });
    } catch (err: any) {
      addToast(err.message || 'Failed to submit inquiry', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsMeta = [
    { num: 1, title: 'Services' },
    { num: 2, title: 'Project Scope' },
    { num: 3, title: 'Budget & Timing' },
    { num: 4, title: 'Contact' },
    { num: 5, title: '25% Discount' },
    { num: 6, title: 'Submit' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF6A2A] uppercase tracking-wider bg-[#FF6A2A]/10 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Scoping Wizard · Step {currentStep} of 6</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#111318] tracking-tight">
          Start a Project with RYVO
        </h1>
        <p className="text-xs sm:text-sm text-[#737780]">
          Engineer your digital flagship. Every brief receives dedicated architectural review within 24 hours.
        </p>
      </div>

      {/* Progress Steps Indicator */}
      <div className="p-4 bg-[#F7F8FA] rounded-2xl border border-[#E7E9ED]">
        <div className="grid grid-cols-6 gap-2 text-center">
          {stepsMeta.map((s) => (
            <button
              key={s.num}
              onClick={() => s.num < currentStep && setCurrentStep(s.num)}
              className={`space-y-1 cursor-pointer transition-colors ${
                s.num === currentStep
                  ? 'text-[#FF6A2A]'
                  : s.num < currentStep
                  ? 'text-[#111318]'
                  : 'text-[#737780]/50'
              }`}
            >
              <div
                className={`w-7 h-7 mx-auto rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                  s.num === currentStep
                    ? 'bg-[#FF6A2A] text-white shadow-md shadow-[#FF6A2A]/30 ring-2 ring-[#FF6A2A]/20'
                    : s.num < currentStep
                    ? 'bg-[#111318] text-white'
                    : 'bg-white border border-[#E7E9ED] text-[#737780]'
                }`}
              >
                {s.num < currentStep ? '✓' : s.num}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider truncate hidden sm:block">
                {s.title}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Form Steps Container */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E7E9ED] shadow-sm">
        {/* ========================================================
            STEP 1: SELECT SERVICES
           ======================================================== */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <h2 className="font-heading text-xl font-bold text-[#111318]">
                Step 1: Which disciplines does your vision require?
              </h2>
              <p className="text-xs text-[#737780]">
                Select one or multiple capabilities. You can combine engineering, creative, and AI.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableServices.map((srv) => {
                const isSelected = selectedServices.includes(srv.name);
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => toggleService(srv.name)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'border-[#FF6A2A] bg-[#FF6A2A]/5 shadow-sm'
                        : 'border-[#E7E9ED] bg-white hover:border-[#111318]/40 hover:bg-[#F7F8FA]'
                    }`}
                  >
                    <div>
                      <div className={`font-heading font-bold text-xs ${isSelected ? 'text-[#FF6A2A]' : 'text-[#111318]'}`}>
                        {srv.name}
                      </div>
                      <div className="text-[11px] text-[#737780] leading-snug mt-0.5">
                        {srv.desc}
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${
                        isSelected
                          ? 'bg-[#FF6A2A] border-[#FF6A2A] text-white'
                          : 'border-[#E7E9ED] bg-white'
                      }`}
                    >
                      {isSelected ? '✓' : ''}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 2: PROJECT DETAILS
           ======================================================== */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <h2 className="font-heading text-xl font-bold text-[#111318]">
                Step 2: Tell us about the project
              </h2>
              <p className="text-xs text-[#737780]">
                Outline what you're building, target outcomes, and existing inspiration.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                  Project Title (Optional)
                </label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g. Next-Gen Restaurant Web Platform & AI Calling"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white text-xs text-[#111318] focus:outline-none focus:border-[#FF6A2A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                  Project Scope & Goals *
                </label>
                <textarea
                  rows={5}
                  required
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Describe the key features, target audience, problem you want solved, or deliverables required..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white text-xs text-[#111318] focus:outline-none focus:border-[#FF6A2A] resize-none leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                  Reference Website or Inspiration Links
                </label>
                <input
                  type="url"
                  value={referenceWebsite}
                  onChange={(e) => setReferenceWebsite(e.target.value)}
                  placeholder="https://example.com, Figma link, or competitor site"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white text-xs text-[#111318] focus:outline-none focus:border-[#FF6A2A]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 3: BUDGET AND TIMELINE
           ======================================================== */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <h2 className="font-heading text-xl font-bold text-[#111318]">
                Step 3: Estimated Investment & Target Timeframe
              </h2>
              <p className="text-xs text-[#737780]">
                Helps us architect a feasible solution that matches your target deployment schedule.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                  Estimated Budget Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {budgetRanges.map((b, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedBudget(b.label)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedBudget === b.label
                          ? 'border-[#FF6A2A] bg-[#FF6A2A]/5 shadow-sm'
                          : 'border-[#E7E9ED] hover:border-[#111318]/40 bg-white'
                      }`}
                    >
                      <div className="font-heading font-bold text-sm text-[#111318] flex items-center justify-between">
                        <span>{b.label}</span>
                        {selectedBudget === b.label && (
                          <span className="text-[10px] text-[#FF6A2A] font-extrabold uppercase">Selected</span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#737780] mt-1">{b.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                  Preferred Delivery Schedule
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {timelineOptions.map((t, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedTimeline(t)}
                      className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                        selectedTimeline === t
                          ? 'border-[#FF6A2A] bg-[#FF6A2A]/5 text-[#FF6A2A]'
                          : 'border-[#E7E9ED] text-[#111318] hover:bg-[#F7F8FA]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 4: CONTACT DETAILS
           ======================================================== */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <h2 className="font-heading text-xl font-bold text-[#111318]">
                Step 4: Your Contact Information
              </h2>
              <p className="text-xs text-[#737780]">
                Guests can submit without registering. We treat your information with strict confidentiality.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Marcus Vance"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white text-xs text-[#111318] focus:outline-none focus:border-[#FF6A2A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                  Work Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="marcus@vancecapital.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white text-xs text-[#111318] focus:outline-none focus:border-[#FF6A2A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                  WhatsApp / Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 308 2436424"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white text-xs text-[#111318] focus:outline-none focus:border-[#FF6A2A]"
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
                  placeholder="Vance Capital LLC"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white text-xs text-[#111318] focus:outline-none focus:border-[#FF6A2A]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 5: DISCOUNT & COUPON CODE
           ======================================================== */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <h2 className="font-heading text-xl font-bold text-[#111318]">
                Step 5: Unlock 25% Discount
              </h2>
              <p className="text-xs text-[#737780]">
                If you have registered an account or received a RYVO promotional code, apply it here.
              </p>
            </div>

            {/* If registered user has a coupon */}
            {clientUser?.coupon && clientUser.coupon.status === 'active' && !discountApplied && (
              <div className="p-4 rounded-2xl bg-[#111318] text-white flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono font-bold text-[#FF6A2A] uppercase">
                    DETECTED FROM YOUR ACCOUNT
                  </div>
                  <div className="font-heading font-bold text-sm">
                    Exclusive 25% Coupon: {clientUser.coupon.code}
                  </div>
                  <div className="text-[11px] text-white/70">
                    Ready to apply directly to this project brief.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => applyCoupon(clientUser.coupon!.code)}
                  className="px-4 py-2 rounded-xl bg-[#FF6A2A] hover:bg-[#ff7b42] text-white text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer"
                >
                  Apply 25% Off
                </button>
              </div>
            )}

            {/* Coupon Applied State */}
            {discountApplied ? (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="font-heading font-bold text-sm text-emerald-900">
                      25% Discount Applied ({couponCode})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-xs text-red-600 hover:underline font-semibold cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
                <p className="text-xs text-emerald-800">
                  Your first project statement of work will reflect a 25% deduction on milestone pricing.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="e.g. RYVO25-XXXXXX"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white text-xs font-mono font-bold text-[#111318] focus:outline-none focus:border-[#FF6A2A] uppercase"
                  />
                  <button
                    type="button"
                    disabled={couponValidating || !couponCode.trim()}
                    onClick={() => applyCoupon()}
                    className="px-5 py-2.5 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-40"
                  >
                    {couponValidating ? 'Verifying...' : 'Validate Code'}
                  </button>
                </div>

                {couponError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{couponError}</span>
                  </div>
                )}

                <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E7E9ED] text-xs text-[#737780] space-y-1">
                  <div className="font-bold text-[#111318]">Don't have a 25% discount code yet?</div>
                  <p>
                    You can{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/client/register')}
                      className="text-[#FF6A2A] font-bold hover:underline"
                    >
                      create a free client account
                    </button>{' '}
                    in under 60 seconds to unlock your unique 25% voucher. Or proceed as a guest below.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            STEP 6: REVIEW & SUBMISSION
           ======================================================== */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <h2 className="font-heading text-xl font-bold text-[#111318]">
                Step 6: Review & Finalize Project Submission
              </h2>
              <p className="text-xs text-[#737780]">
                Please review your scoping parameters before submitting to our engineering queue.
              </p>
            </div>

            {/* Summary Card */}
            <div className="rounded-2xl border border-[#E7E9ED] bg-[#F7F8FA] p-5 space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#E7E9ED]">
                <span className="text-[#737780] font-bold uppercase">Client Name</span>
                <span className="font-bold text-[#111318]">{clientName}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E7E9ED]">
                <span className="text-[#737780] font-bold uppercase">Work Email</span>
                <span className="font-bold text-[#111318]">{email}</span>
              </div>
              {phone && (
                <div className="flex justify-between py-1.5 border-b border-[#E7E9ED]">
                  <span className="text-[#737780] font-bold uppercase">Phone / WhatsApp</span>
                  <span className="font-bold text-[#111318]">{phone}</span>
                </div>
              )}
              <div className="flex justify-between py-1.5 border-b border-[#E7E9ED]">
                <span className="text-[#737780] font-bold uppercase">Selected Services</span>
                <span className="font-bold text-[#FF6A2A] text-right">{selectedServices.join(' + ')}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E7E9ED]">
                <span className="text-[#737780] font-bold uppercase">Budget Estimate</span>
                <span className="font-bold text-[#111318]">{selectedBudget}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E7E9ED]">
                <span className="text-[#737780] font-bold uppercase">Timeline</span>
                <span className="font-bold text-[#111318]">{selectedTimeline}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-[#E7E9ED] items-center">
                <span className="text-[#737780] font-bold uppercase">Promotional Discount</span>
                {discountApplied ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-mono font-bold text-[11px]">
                    25% OFF APPLIED ({couponCode})
                  </span>
                ) : (
                  <span className="text-[#737780]">Standard Rates</span>
                )}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                Submission creates a persistent inquiry record in our database and alerts the technical lead. No upfront payment required to review specifications.
              </span>
            </div>
          </div>
        )}

        {/* Step Navigation Buttons */}
        <div className="pt-6 border-t border-[#E7E9ED] flex items-center justify-between gap-4">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-4 py-2.5 rounded-xl border border-[#E7E9ED] hover:bg-[#F7F8FA] text-xs font-bold text-[#111318] flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
            >
              <span>Continue to Step {currentStep + 1}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleFinalSubmit}
              className="px-8 py-3 rounded-xl bg-[#FF6A2A] hover:bg-[#ff7b42] text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-[#FF6A2A]/25 transition-all disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Transmitting Brief...' : 'Confirm & Transmit Project Brief'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// INQUIRY CONFIRMATION PAGE
// ==========================================
export const InquiryConfirmationPage: React.FC = () => {
  const { activeRoute, navigate } = useAgency();
  const params = activeRoute.params || {};

  const [copiedId, setCopiedId] = useState(false);

  const copyId = () => {
    if (params.id) {
      navigator.clipboard.writeText(params.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-8">
      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-bold font-mono text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <span>INQUIRY REGISTERED IN DATABASE</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#111318]">
          Project Brief Received, {params.name || 'Valued Client'}
        </h1>
        <p className="text-xs sm:text-sm text-[#737780] leading-relaxed max-w-lg mx-auto">
          Our engineering leadership has queued your brief for technical feasibility and scope estimation. You will receive an initial response within 24 hours.
        </p>
      </div>

      {/* Inquiry Reference Card */}
      <div className="p-6 rounded-2xl bg-[#F7F8FA] border border-[#E7E9ED] max-w-md mx-auto space-y-3 text-left">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#737780] font-bold uppercase">Inquiry ID:</span>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-[#111318]">{params.id || 'RYVO-INQ-1049'}</span>
            <button
              onClick={copyId}
              className="text-[#FF6A2A] hover:text-[#111318] cursor-pointer"
              title="Copy Inquiry ID"
            >
              {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {params.service && (
          <div className="flex items-center justify-between text-xs border-t border-[#E7E9ED] pt-2">
            <span className="text-[#737780] font-bold uppercase">Disciplines:</span>
            <span className="font-semibold text-[#111318] truncate max-w-[200px]">{params.service}</span>
          </div>
        )}

        {params.discountApplied && (
          <div className="flex items-center justify-between text-xs border-t border-[#E7E9ED] pt-2">
            <span className="text-[#737780] font-bold uppercase">Discount Status:</span>
            <span className="font-mono text-emerald-600 font-bold">25% VOUCHER LOCKED</span>
          </div>
        )}
      </div>

      <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white text-xs font-bold transition-colors cursor-pointer"
        >
          Return to Agency Home
        </button>
        <button
          onClick={() => navigate('/portfolio')}
          className="px-6 py-2.5 rounded-xl border border-[#E7E9ED] hover:bg-[#F7F8FA] text-[#111318] text-xs font-bold transition-colors cursor-pointer"
        >
          Explore Live Portfolio
        </button>
      </div>
    </div>
  );
};
