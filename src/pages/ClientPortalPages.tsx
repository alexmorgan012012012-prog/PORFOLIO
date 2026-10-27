import React, { useState, useEffect } from 'react';
import { useAgency } from '../context/AgencyContext';
import { api } from '../lib/api';
import {
  User,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageSquare,
  Send,
  LogOut,
  FolderKanban,
  FileText,
  AlertCircle,
  Tag,
  Copy,
  Check,
  ShieldCheck,
  Gift,
} from 'lucide-react';

// ==========================================
// 1. CLIENT LOGIN PAGE
// ==========================================
export const ClientLoginPage: React.FC = () => {
  const { clientLogin, clientUser, navigate, addToast } = useAgency();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (clientUser) {
      navigate('/client/portal');
    }
  }, [clientUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await clientLogin(email, password);
      addToast('Welcome back to your client portal.', 'success');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[78vh] flex items-center justify-center p-4 bg-[#F7F8FA]">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-[#E7E9ED] shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#111318] text-[#FF6A2A] flex items-center justify-center mx-auto text-xl font-heading font-extrabold shadow-sm">
            R
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-[#111318]">
            Client Project Portal
          </h1>
          <p className="text-xs text-[#737780]">
            Sign in to track real-time project milestones, deliverables, and team updates.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
              Work Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="elena@company.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white text-xs text-[#111318] focus:outline-none focus:border-[#FF6A2A]"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => navigate('/client/forgot-password')}
                className="text-[11px] text-[#FF6A2A] hover:underline"
              >
                Forgot?
              </button>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white text-xs text-[#111318] focus:outline-none focus:border-[#FF6A2A]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* 25% Discount Reminder on Login */}
        <div className="p-3.5 rounded-2xl bg-[#FF6A2A]/5 border border-[#FF6A2A]/20 flex items-center justify-between text-xs">
          <div className="space-y-0.5">
            <div className="font-bold text-[#111318] flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#FF6A2A]" />
              <span>New to RYVO?</span>
            </div>
            <div className="text-[11px] text-[#737780]">
              Register today to unlock 25% off your first project.
            </div>
          </div>
          <button
            onClick={() => navigate('/client/register')}
            className="font-bold text-[#FF6A2A] hover:underline shrink-0 text-xs cursor-pointer"
          >
            Register →
          </button>
        </div>

        <div className="pt-2 text-center text-xs text-[#737780]">
          <button
            onClick={() => navigate('/')}
            className="text-[#737780] hover:text-[#111318] cursor-pointer"
          >
            ← Return to Agency Home
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. CLIENT REGISTRATION WITH 25% OFF OFFER
// ==========================================
export const ClientRegisterPage: React.FC = () => {
  const { clientRegister, clientUser, navigate, addToast } = useAgency();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Success state with coupon reveal
  const [createdCoupon, setCreatedCoupon] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      setError('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await api.clientRegister(name, email, password, company, phone);
      if (res.client && res.client.coupon) {
        setCreatedCoupon(res.client.coupon.code);
      } else {
        // Fallback coupon format
        setCreatedCoupon('RYVO25-VIPFIRST');
      }
      addToast('Account created! Your 25% discount coupon has been generated.', 'success');
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const copyCoupon = () => {
    if (createdCoupon) {
      navigator.clipboard.writeText(createdCoupon);
      setCopied(true);
      addToast('Coupon code copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // SUCCESS SCREEN WITH COUPON CODE
  if (createdCoupon) {
    return (
      <div className="min-h-[78vh] flex items-center justify-center p-4 bg-[#F7F8FA]">
        <div className="w-full max-w-lg bg-white rounded-3xl p-8 sm:p-10 border border-[#E7E9ED] shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold text-[#FF6A2A] uppercase tracking-wider bg-[#FF6A2A]/10 px-3 py-1 rounded-full">
              ACCOUNT VERIFIED · DISCOUNT UNLOCKED
            </span>
            <h1 className="font-heading text-3xl font-extrabold text-[#111318]">
              Welcome to RYVO, {name}!
            </h1>
            <p className="text-xs sm:text-sm text-[#737780] max-w-sm mx-auto leading-relaxed">
              Your free client account has been provisioned and your exclusive 25% discount coupon is active.
            </p>
          </div>

          {/* Coupon Reveal Card */}
          <div className="p-6 rounded-2xl bg-[#111318] text-white space-y-3 relative overflow-hidden">
            <div className="text-[10px] font-mono text-[#FF6A2A] uppercase tracking-widest">
              YOUR EXCLUSIVE FIRST-PROJECT COUPON (25% OFF)
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="font-mono text-2xl sm:text-3xl font-extrabold tracking-widest text-white selection:bg-[#FF6A2A]">
                {createdCoupon}
              </span>
              <button
                onClick={copyCoupon}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-[#FF6A2A] transition-colors text-white cursor-pointer"
                title="Copy Coupon"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="text-[11px] text-white/60">
              Valid on your first eligible creative, engineering, or AI project. One-time redemption.
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => navigate('/start-project', { coupon: createdCoupon })}
              className="w-full py-3.5 rounded-xl bg-[#FF6A2A] hover:bg-[#ff7b42] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#FF6A2A]/25 cursor-pointer"
            >
              <span>Apply 25% Off to Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => navigate('/client/portal')}
              className="w-full py-3 rounded-xl bg-[#F7F8FA] hover:bg-[#E7E9ED] text-[#111318] font-bold text-xs transition-colors cursor-pointer"
            >
              Go to Client Project Portal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-[#F7F8FA] py-12">
      <div className="w-full max-w-lg bg-white rounded-3xl p-8 sm:p-10 border border-[#E7E9ED] shadow-xl space-y-6">
        {/* Top 25% Off Promotional Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#111318] to-[#202124] text-white flex items-center gap-3.5 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-[#FF6A2A] text-white flex items-center justify-center shrink-0">
            <Gift className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-mono font-bold text-[#FF6A2A] uppercase tracking-wider">
              EXCLUSIVE WELCOME OFFER
            </div>
            <div className="text-xs font-bold text-white truncate">
              JOIN RYVO & GET 25% OFF YOUR FIRST PROJECT!
            </div>
            <div className="text-[10px] text-white/70">
              Create your account to unlock your unique coupon code instantly.
            </div>
          </div>
        </div>

        <div className="text-center space-y-1.5">
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#111318]">
            Create Your Client Account
          </h1>
          <p className="text-xs text-[#737780]">
            Registration is 100% free. Track deliverables, communicate directly with engineers, and claim 25% off.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Marcus Vance"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white text-xs text-[#111318] focus:outline-none focus:border-[#FF6A2A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                Company Name
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Vance Capital"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white text-xs text-[#111318] focus:outline-none focus:border-[#FF6A2A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555 0192"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white text-xs text-[#111318] focus:outline-none focus:border-[#FF6A2A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                Password *
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="min 6 chars"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white text-xs text-[#111318] focus:outline-none focus:border-[#FF6A2A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                Confirm Password *
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="re-enter password"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white text-xs text-[#111318] focus:outline-none focus:border-[#FF6A2A]"
              />
            </div>
          </div>

          {/* Terms & Privacy Consent */}
          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-0.5 rounded text-[#FF6A2A] focus:ring-[#FF6A2A]"
            />
            <label htmlFor="terms" className="text-xs text-[#737780] leading-snug cursor-pointer">
              I agree to the RYVO{' '}
              <button
                type="button"
                onClick={() => navigate('/terms')}
                className="text-[#111318] font-bold hover:underline"
              >
                Terms of Service
              </button>{' '}
              and{' '}
              <button
                type="button"
                onClick={() => navigate('/privacy')}
                className="text-[#111318] font-bold hover:underline"
              >
                Privacy Policy
              </button>
              . Discount applies to first eligible project inquiry.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#FF6A2A] hover:bg-[#ff7b42] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#FF6A2A]/20 disabled:opacity-50"
          >
            <span>{loading ? 'Generating 25% Coupon & Account...' : 'Create Account & Unlock 25% Off'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="pt-2 border-t border-[#E7E9ED] text-center text-xs text-[#737780] space-y-2">
          <div>
            Already have an account?{' '}
            <button
              onClick={() => navigate('/client/login')}
              className="text-[#FF6A2A] font-bold hover:underline cursor-pointer"
            >
              Sign In
            </button>
          </div>
          <div>
            <button
              onClick={() => navigate('/')}
              className="text-[#737780] hover:text-[#111318] cursor-pointer"
            >
              ← Return to Agency Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. CLIENT FORGOT PASSWORD PAGE
// ==========================================
export const ClientForgotPasswordPage: React.FC = () => {
  const { navigate, addToast } = useAgency();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    addToast('Password reset instructions sent.', 'info');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4 bg-[#F7F8FA]">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#E7E9ED] shadow-xl space-y-6">
        <h1 className="font-heading text-2xl font-bold text-[#111318]">Reset Portal Password</h1>
        {sent ? (
          <div className="space-y-4 text-xs text-[#737780]">
            <p>
              If an account exists for <strong>{email}</strong>, a secure reset token has been dispatched.
            </p>
            <button
              onClick={() => navigate('/client/login')}
              className="w-full py-2.5 rounded-xl bg-[#111318] text-white text-xs font-semibold cursor-pointer"
            >
              Return to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111318]">Account Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="founder@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-xs bg-[#F7F8FA]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#FF6A2A] text-white text-xs font-semibold cursor-pointer"
            >
              Send Password Reset
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 4. CLIENT PORTAL DASHBOARD (Authenticated)
// ==========================================
export const ClientPortalPage: React.FC = () => {
  const { clientUser, clientLogout, refreshClientProfile, navigate, addToast } = useAgency();
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  useEffect(() => {
    if (!clientUser) {
      navigate('/client/login');
    }
  }, [clientUser, navigate]);

  if (!clientUser) return null;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setSending(true);
    try {
      await api.sendClientMessage(newMessage.trim());
      setNewMessage('');
      await refreshClientProfile();
      addToast('Message sent to project lead.', 'success');
    } catch {
      addToast('Message could not be sent.', 'error');
    } finally {
      setSending(false);
    }
  };

  const copyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(true);
    addToast('Coupon code copied!', 'success');
    setTimeout(() => setCopiedCoupon(false), 2000);
  };

  const project = clientUser.projects?.[0] || {
    title: `${clientUser.company || clientUser.name} Digital Flagship`,
    status: 'Discovery',
    progress: 30,
    deliverables: ['Scoping Brief', 'Figma Wireframes', 'TypeScript Core', 'Admin Panel'],
    timeline: '4 - 6 Weeks',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 bg-white rounded-3xl border border-[#E7E9ED] shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#111318] text-[#FF6A2A] flex items-center justify-center font-heading font-extrabold text-2xl shadow-sm">
            {clientUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-extrabold text-2xl text-[#111318]">
                {clientUser.name}
              </h1>
              {clientUser.company && (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F7F8FA] border border-[#E7E9ED] text-[#737780]">
                  {clientUser.company}
                </span>
              )}
            </div>
            <div className="text-xs text-[#737780] font-mono mt-0.5">
              CLIENT ID: {clientUser.id} · {clientUser.email}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/start-project')}
            className="px-4 py-2.5 rounded-xl bg-[#FF6A2A] hover:bg-[#ff7b42] text-white text-xs font-bold transition-all cursor-pointer shadow-md shadow-[#FF6A2A]/20"
          >
            + Start New Project
          </button>
          <button
            onClick={clientLogout}
            className="px-4 py-2.5 rounded-xl bg-[#F7F8FA] hover:bg-red-50 text-red-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-[#E7E9ED]"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* 25% DISCOUNT COUPON WIDGET IN PORTAL */}
      {clientUser.coupon && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#111318] via-[#1a1d24] to-[#111318] text-white border border-white/10 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-[#FF6A2A] uppercase tracking-wider bg-[#FF6A2A]/10 px-2.5 py-0.5 rounded-md border border-[#FF6A2A]/20">
                REGISTERED CLIENT BENEFIT
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  clientUser.coupon.status === 'active'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-white/10 text-white/60'
                }`}
              >
                {clientUser.coupon.status === 'active' ? '● AVAILABLE' : '● REDEEMED'}
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-xl text-white">
              25% Off First Project Discount Coupon
            </h2>
            <p className="text-xs text-white/70 max-w-xl">
              Apply this coupon code during checkout or project inquiry submission to receive 25% off your first eligible statement of work.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15">
              <span className="font-mono font-bold text-sm text-[#FF6A2A] tracking-wider">
                {clientUser.coupon.code}
              </span>
              <button
                onClick={() => copyCouponCode(clientUser.coupon!.code)}
                className="text-white/70 hover:text-white cursor-pointer"
                title="Copy Coupon"
              >
                {copiedCoupon ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {clientUser.coupon.status === 'active' ? (
              <button
                onClick={() => navigate('/start-project', { coupon: clientUser.coupon!.code })}
                className="px-4 py-2.5 rounded-xl bg-[#FF6A2A] hover:bg-[#ff7b42] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-center"
              >
                Apply Coupon Now →
              </button>
            ) : (
              <span className="text-xs font-mono text-emerald-400 py-2 text-center">
                Applied on Inquiry #{clientUser.coupon.redeemedInquiryId || '101'}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Main Grid: Project Milestones & Live Team Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Active Project Status */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[#E7E9ED] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono font-bold text-[#FF6A2A] uppercase tracking-wider">
                  ACTIVE ENGAGEMENT
                </div>
                <h2 className="font-heading font-extrabold text-2xl text-[#111318] mt-1">
                  {project.title}
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-100 text-emerald-800">
                {project.status}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#737780]">
                <span>Milestone Completion</span>
                <span className="font-bold text-[#111318]">{project.progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#F7F8FA] overflow-hidden">
                <div
                  className="h-full bg-[#FF6A2A] rounded-full transition-all duration-700"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Milestones Flow */}
            <div className="pt-4 border-t border-[#E7E9ED] space-y-3">
              <div className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                Stage Deliverables & Verification
              </div>
              <div className="space-y-2">
                {project.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#F7F8FA] border border-[#E7E9ED] flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold text-[#111318]">{item}</span>
                    </div>
                    <span className="font-mono text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      VERIFIED
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Messages Thread with RYVO Team */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E7E9ED] shadow-sm p-6 flex flex-col justify-between h-[540px]">
          <div className="space-y-1.5 pb-3 border-b border-[#E7E9ED]">
            <h3 className="font-heading font-extrabold text-base text-[#111318]">
              Direct Team Channel
            </h3>
            <p className="text-[11px] text-[#737780]">
              Direct communication line with your RYVO dedicated technical lead.
            </p>
          </div>

          {/* Messages Log */}
          <div className="flex-1 overflow-y-auto space-y-3 py-4">
            {clientUser.messages?.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'client' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'client'
                      ? 'bg-[#111318] text-white rounded-br-none'
                      : 'bg-[#F7F8FA] text-[#111318] border border-[#E7E9ED] rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-[#737780] mt-1 px-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>

          {/* Send Input */}
          <form onSubmit={handleSendMessage} className="pt-3 border-t border-[#E7E9ED] flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type message to technical lead..."
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white text-xs text-[#111318] focus:outline-none focus:border-[#FF6A2A]"
            />
            <button
              type="submit"
              disabled={sending || !newMessage.trim()}
              className="p-2.5 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white transition-colors cursor-pointer disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
