import React from 'react';
import { useAgency } from '../context/AgencyContext';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const LegalPage: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  const { settings, navigate } = useAgency();
  const isPrivacy = type === 'privacy';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#737780] hover:text-[#FF6A2A] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </button>
      </div>

      <div className="space-y-3">
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#111318]">
          {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
        </h1>
        <p className="text-xs text-[#737780]">
          Last revised: October 2026 · Official governance for {settings?.brandFullName || 'RYVO Digital Agency'}
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-sm text-[#202124] leading-relaxed space-y-6">
        {isPrivacy ? (
          <>
            <section className="space-y-2">
              <h2 className="font-heading text-lg font-bold text-[#111318]">1. Information We Collect</h2>
              <p className="text-[#737780]">
                RYVO Digital Agency collects information provided voluntarily when you submit a project inquiry, contact message, or subscribe to updates. This includes your name, work email address, telephone/WhatsApp number, company name, and project scope details.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-lg font-bold text-[#111318]">2. First-Party Analytics & Privacy</h2>
              <p className="text-[#737780]">
                We use privacy-conscious, aggregate first-party telemetry to understand which services and portfolio case studies resonate with visitors. We do not sell, rent, or distribute personal data or execute invasive third-party cross-site behavioral tracking cookies.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-lg font-bold text-[#111318]">3. Data Protection & Confidentiality</h2>
              <p className="text-[#737780]">
                All client project specifications, architectural blueprints, and proprietary business workflows submitted to RYVO are treated under strict non-disclosure obligations.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-lg font-bold text-[#111318]">4. Official Contact Details</h2>
              <p className="text-[#737780]">
                For data access requests, contact our privacy officer at{' '}
                <a href={settings?.emailLink || 'mailto:alexmorgan012012012@gmail.com'} className="text-[#FF6A2A] underline">
                  {settings?.email || 'alexmorgan012012012@gmail.com'}
                </a>{' '}
                or via phone at{' '}
                <a href={settings?.phoneLink || 'tel:+923082436424'} className="text-[#FF6A2A] underline">
                  {settings?.phone || '+92 308 2436424'}
                </a>.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-2">
              <h2 className="font-heading text-lg font-bold text-[#111318]">1. Agreement to Terms</h2>
              <p className="text-[#737780]">
                By accessing or interacting with RYVO Digital Agency website and services, you agree to comply with and be bound by these Terms of Service.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-lg font-bold text-[#111318]">2. Intellectual Property Rights</h2>
              <p className="text-[#737780]">
                Upon full settlement of contracted milestone invoices, clients receive 100% intellectual property ownership and commercial usage rights for custom codebases, design assets, and video edits engineered specifically for their projects.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-lg font-bold text-[#111318]">3. Third-Party Integrations & External Iframes</h2>
              <p className="text-[#737780]">
                Our portfolio showcases external completed client websites. Direct browser embedding is subject to individual website security headers (such as Content Security Policy and X-Frame-Options). RYVO provides verified live website links when embedding is restricted.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-lg font-bold text-[#111318]">4. Governing Jurisdiction</h2>
              <p className="text-[#737780]">
                These terms are governed by applicable international commercial law and the legal domicile of RYVO Digital Agency.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export const NotFoundPage: React.FC = () => {
  const { navigate } = useAgency();

  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="font-mono text-7xl font-extrabold text-[#FF6A2A]">
        404
      </div>
      <h1 className="font-heading text-3xl font-bold text-[#111318]">
        Route Not Found
      </h1>
      <p className="text-sm text-[#737780] max-w-sm mx-auto">
        The requested agency destination does not exist or has been relocated within the directory.
      </p>
      <div className="pt-2">
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white text-xs font-semibold transition-colors cursor-pointer"
        >
          Return to Agency Homepage
        </button>
      </div>
    </div>
  );
};
