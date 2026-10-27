import React, { useState, useEffect, useRef } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { Logo } from '../common/Logo';
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Video,
  Palette,
  PhoneCall,
  Globe,
  Smartphone,
  Cpu,
  Search,
  TrendingUp,
  Gamepad2,
  Layers,
  ShoppingBag,
  Terminal,
  User,
  Sparkles,
  Tag,
  LogOut,
  ExternalLink,
} from 'lucide-react';

const serviceIcons: Record<string, React.ReactNode> = {
  'video-editing': <Video className="w-4 h-4 text-[#FF6A2A]" />,
  'graphic-design': <Palette className="w-4 h-4 text-[#FF6A2A]" />,
  'website-development': <Globe className="w-4 h-4 text-[#FF6A2A]" />,
  'app-development': <Smartphone className="w-4 h-4 text-[#FF6A2A]" />,
  'ai-automation': <Cpu className="w-4 h-4 text-[#FF6A2A]" />,
  'ai-calling': <PhoneCall className="w-4 h-4 text-[#FF6A2A]" />,
  'digital-marketing': <TrendingUp className="w-4 h-4 text-[#FF6A2A]" />,
  'seo': <Search className="w-4 h-4 text-[#FF6A2A]" />,
  'game-development': <Gamepad2 className="w-4 h-4 text-[#FF6A2A]" />,
  'ui-ux-design': <Layers className="w-4 h-4 text-[#FF6A2A]" />,
  'ecommerce-solutions': <ShoppingBag className="w-4 h-4 text-[#FF6A2A]" />,
  'business-software': <Terminal className="w-4 h-4 text-[#FF6A2A]" />,
};

export const Navbar: React.FC = () => {
  const {
    services,
    projects,
    activeRoute,
    navigate,
    setStartProjectOpen,
    clientUser,
    clientLogout,
  } = useAgency();

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
  }, [activeRoute.path]);

  const handleMouseEnter = (menuName: string) => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 180);
  };

  const isLinkActive = (path: string) => {
    if (path === '/') return activeRoute.path === '/';
    return activeRoute.path.startsWith(path);
  };

  // Group services into 3 neat pillars
  const engineeringServices = services.filter((s) =>
    ['website-development', 'app-development', 'ecommerce-solutions', 'business-software'].includes(s.slug)
  );
  const aiGrowthServices = services.filter((s) =>
    ['ai-automation', 'ai-calling', 'digital-marketing', 'seo'].includes(s.slug)
  );
  const creativeServices = services.filter((s) =>
    ['video-editing', 'graphic-design', 'ui-ux-design', 'game-development'].includes(s.slug)
  );

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E7E9ED]'
          : 'bg-white border-b border-[#E7E9ED]/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* LEFT: RYVO Logo (Large, recognizable, clean) */}
        <div className="flex items-center shrink-0">
          <Logo className="h-11 cursor-pointer transition-transform duration-200 hover:scale-[1.02]" />
        </div>

        {/* CENTER NAVIGATION: Home, Services, Portfolio, About, Pricing, Contact */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
          {/* 1. Home */}
          <button
            onClick={() => navigate('/')}
            className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-lg ${
              isLinkActive('/') && activeRoute.path === '/'
                ? 'text-[#FF6A2A]'
                : 'text-[#202124] hover:text-[#FF6A2A]'
            }`}
          >
            Home
          </button>

          {/* 2. Services (with Mega-Dropdown) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('services')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => navigate('/services')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-lg ${
                isLinkActive('/services')
                  ? 'text-[#FF6A2A]'
                  : 'text-[#202124] hover:text-[#FF6A2A]'
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeMenu === 'services' ? 'rotate-180 text-[#FF6A2A]' : 'text-[#737780]'
                }`}
              />
            </button>

            {/* Services Dropdown Panel */}
            {activeMenu === 'services' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[760px] animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="bg-white rounded-3xl p-6 shadow-2xl border border-[#E7E9ED] grid grid-cols-3 gap-6">
                  {/* Pillar 1: Software & Web */}
                  <div className="space-y-3">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#FF6A2A] border-b border-[#E7E9ED] pb-1.5 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" />
                      <span>Engineering & Web</span>
                    </div>
                    <div className="space-y-1">
                      {engineeringServices.map((srv) => (
                        <button
                          key={srv.id}
                          onClick={() => navigate(`/services/${srv.slug}`)}
                          className="w-full text-left p-2 rounded-xl hover:bg-[#F7F8FA] transition-colors group flex items-start gap-2.5 cursor-pointer"
                        >
                          <div className="p-1.5 rounded-lg bg-[#F7F8FA] border border-[#E7E9ED] group-hover:bg-[#111318] transition-colors shrink-0">
                            {serviceIcons[srv.slug] || <Globe className="w-3.5 h-3.5 text-[#FF6A2A]" />}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-[#111318] group-hover:text-[#FF6A2A] truncate">
                              {srv.title}
                            </div>
                            <div className="text-[10px] text-[#737780] truncate">
                              {srv.tagline}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pillar 2: AI & Growth */}
                  <div className="space-y-3">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#FF6A2A] border-b border-[#E7E9ED] pb-1.5 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>AI & Marketing</span>
                    </div>
                    <div className="space-y-1">
                      {aiGrowthServices.map((srv) => (
                        <button
                          key={srv.id}
                          onClick={() => navigate(`/services/${srv.slug}`)}
                          className="w-full text-left p-2 rounded-xl hover:bg-[#F7F8FA] transition-colors group flex items-start gap-2.5 cursor-pointer"
                        >
                          <div className="p-1.5 rounded-lg bg-[#F7F8FA] border border-[#E7E9ED] group-hover:bg-[#111318] transition-colors shrink-0">
                            {serviceIcons[srv.slug] || <Cpu className="w-3.5 h-3.5 text-[#FF6A2A]" />}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-[#111318] group-hover:text-[#FF6A2A] truncate">
                              {srv.title}
                            </div>
                            <div className="text-[10px] text-[#737780] truncate">
                              {srv.tagline}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pillar 3: Creative & Design */}
                  <div className="space-y-3">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#FF6A2A] border-b border-[#E7E9ED] pb-1.5 flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5" />
                      <span>Creative & Motion</span>
                    </div>
                    <div className="space-y-1">
                      {creativeServices.map((srv) => (
                        <button
                          key={srv.id}
                          onClick={() => navigate(`/services/${srv.slug}`)}
                          className="w-full text-left p-2 rounded-xl hover:bg-[#F7F8FA] transition-colors group flex items-start gap-2.5 cursor-pointer"
                        >
                          <div className="p-1.5 rounded-lg bg-[#F7F8FA] border border-[#E7E9ED] group-hover:bg-[#111318] transition-colors shrink-0">
                            {serviceIcons[srv.slug] || <Palette className="w-3.5 h-3.5 text-[#FF6A2A]" />}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-[#111318] group-hover:text-[#FF6A2A] truncate">
                              {srv.title}
                            </div>
                            <div className="text-[10px] text-[#737780] truncate">
                              {srv.tagline}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Strip of Dropdown */}
                  <div className="col-span-3 pt-3 border-t border-[#E7E9ED] flex items-center justify-between text-xs">
                    <div className="text-[#737780] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#FF6A2A]" />
                      <span>All 12 disciplines engineered in-house under strict SLA guarantees.</span>
                    </div>
                    <button
                      onClick={() => navigate('/services')}
                      className="font-bold text-[#FF6A2A] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore Services Directory</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Portfolio (with Dropdown) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('portfolio')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => navigate('/portfolio')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-lg ${
                isLinkActive('/portfolio')
                  ? 'text-[#FF6A2A]'
                  : 'text-[#202124] hover:text-[#FF6A2A]'
              }`}
            >
              <span>Portfolio</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeMenu === 'portfolio' ? 'rotate-180 text-[#FF6A2A]' : 'text-[#737780]'
                }`}
              />
            </button>

            {/* Portfolio Dropdown Panel */}
            {activeMenu === 'portfolio' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[540px] animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="bg-white rounded-3xl p-5 shadow-2xl border border-[#E7E9ED] space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <button
                      onClick={() => navigate('/portfolio')}
                      className="p-3 rounded-2xl border border-[#E7E9ED] hover:border-[#FF6A2A] hover:bg-[#F7F8FA] transition-all text-left group cursor-pointer"
                    >
                      <div className="font-bold text-[#111318] group-hover:text-[#FF6A2A]">
                        Websites & Web Apps
                      </div>
                      <div className="text-[11px] text-[#737780]">
                        High-converting React platforms, restaurant sites, and SaaS apps.
                      </div>
                    </button>
                    <button
                      onClick={() => navigate('/portfolio')}
                      className="p-3 rounded-2xl border border-[#E7E9ED] hover:border-[#FF6A2A] hover:bg-[#F7F8FA] transition-all text-left group cursor-pointer"
                    >
                      <div className="font-bold text-[#111318] group-hover:text-[#FF6A2A]">
                        AI & Automation
                      </div>
                      <div className="text-[11px] text-[#737780]">
                        Sub-500ms voice agents, workflow automation, and CRM integrations.
                      </div>
                    </button>
                    <button
                      onClick={() => navigate('/portfolio')}
                      className="p-3 rounded-2xl border border-[#E7E9ED] hover:border-[#FF6A2A] hover:bg-[#F7F8FA] transition-all text-left group cursor-pointer"
                    >
                      <div className="font-bold text-[#111318] group-hover:text-[#FF6A2A]">
                        Video & Motion
                      </div>
                      <div className="text-[11px] text-[#737780]">
                        Viral TikTok/Reel packages, commercials, and YouTube showreels.
                      </div>
                    </button>
                    <button
                      onClick={() => navigate('/portfolio')}
                      className="p-3 rounded-2xl border border-[#E7E9ED] hover:border-[#FF6A2A] hover:bg-[#F7F8FA] transition-all text-left group cursor-pointer"
                    >
                      <div className="font-bold text-[#111318] group-hover:text-[#FF6A2A]">
                        Brand Identity & UI
                      </div>
                      <div className="text-[11px] text-[#737780]">
                        Design systems, social collateral, and mobile prototypes.
                      </div>
                    </button>
                  </div>

                  {/* Featured Gusto & Co Restaurant Project */}
                  <div
                    onClick={() => navigate('/project/gusto-co-artisan-bistro')}
                    className="p-3 rounded-2xl bg-[#111318] text-white flex items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div>
                      <div className="text-[10px] font-mono text-[#FF6A2A] uppercase">
                        FEATURED CASE STUDY
                      </div>
                      <div className="font-bold text-xs group-hover:text-[#FF6A2A] transition-colors">
                        Gusto & Co. Artisan Bistro & Culinary Web App
                      </div>
                    </div>
                    <span className="text-xs text-[#FF6A2A] flex items-center gap-1 shrink-0">
                      <span>View Case</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 4. About */}
          <button
            onClick={() => navigate('/about')}
            className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-lg ${
              isLinkActive('/about')
                ? 'text-[#FF6A2A]'
                : 'text-[#202124] hover:text-[#FF6A2A]'
            }`}
          >
            About
          </button>

          {/* 5. Pricing */}
          <button
            onClick={() => navigate('/pricing')}
            className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-lg ${
              isLinkActive('/pricing')
                ? 'text-[#FF6A2A]'
                : 'text-[#202124] hover:text-[#FF6A2A]'
            }`}
          >
            Pricing
          </button>

          {/* 6. Contact */}
          <button
            onClick={() => navigate('/contact')}
            className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-lg ${
              isLinkActive('/contact')
                ? 'text-[#FF6A2A]'
                : 'text-[#202124] hover:text-[#FF6A2A]'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* RIGHT: Login, Register with 25% Off Badge, Prominent Orange Start a Project */}
        <div className="hidden sm:flex items-center gap-2.5">
          {clientUser ? (
            /* Logged-in Client State */
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/client/portal')}
                className="px-3.5 py-2 rounded-xl bg-[#F7F8FA] hover:bg-[#E7E9ED] text-[#111318] text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer border border-[#E7E9ED]"
              >
                <User className="w-3.5 h-3.5 text-[#FF6A2A]" />
                <span className="truncate max-w-[110px]">{clientUser.name}</span>
                {clientUser.coupon && clientUser.coupon.status === 'active' && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#FF6A2A] text-white text-[9px] font-extrabold uppercase">
                    25% OFF
                  </span>
                )}
              </button>
              <button
                onClick={() => clientLogout()}
                title="Log Out"
                className="p-2 rounded-xl text-[#737780] hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Guest / Visitor State */
            <div className="flex items-center gap-1.5">
              {/* Login */}
              <button
                onClick={() => navigate('/client/login')}
                className="px-3 py-2 text-xs font-bold text-[#111318] hover:text-[#FF6A2A] transition-colors cursor-pointer"
              >
                Login
              </button>

              {/* Register with 25% Off Badge */}
              <button
                onClick={() => navigate('/client/register')}
                className="px-3 py-2 rounded-xl border border-[#E7E9ED] hover:border-[#FF6A2A] hover:bg-[#F7F8FA] text-xs font-bold text-[#111318] flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Register</span>
                <span className="text-[10px] font-extrabold bg-[#FF6A2A]/10 text-[#FF6A2A] px-2 py-0.5 rounded-full border border-[#FF6A2A]/25 tracking-wide">
                  25% OFF
                </span>
              </button>
            </div>
          )}

          {/* Prominent Orange "Start a Project" Button */}
          <button
            onClick={() => navigate('/start-project')}
            className="px-5 py-2.5 rounded-xl bg-[#FF6A2A] hover:bg-[#ff7b42] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#FF6A2A]/25 flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => navigate('/start-project')}
            className="px-3 py-1.5 rounded-lg bg-[#FF6A2A] text-white text-xs font-bold uppercase tracking-wider"
          >
            Start
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-[#E7E9ED] text-[#111318]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E7E9ED] px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#E7E9ED]">
            <button
              onClick={() => navigate('/')}
              className="p-2.5 rounded-xl bg-[#F7F8FA] text-left text-xs font-bold text-[#111318]"
            >
              Home
            </button>
            <button
              onClick={() => navigate('/services')}
              className="p-2.5 rounded-xl bg-[#F7F8FA] text-left text-xs font-bold text-[#111318]"
            >
              All 12 Services
            </button>
            <button
              onClick={() => navigate('/portfolio')}
              className="p-2.5 rounded-xl bg-[#F7F8FA] text-left text-xs font-bold text-[#111318]"
            >
              Portfolio & Previews
            </button>
            <button
              onClick={() => navigate('/about')}
              className="p-2.5 rounded-xl bg-[#F7F8FA] text-left text-xs font-bold text-[#111318]"
            >
              About RYVO
            </button>
            <button
              onClick={() => navigate('/pricing')}
              className="p-2.5 rounded-xl bg-[#F7F8FA] text-left text-xs font-bold text-[#111318]"
            >
              Pricing & Packages
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="p-2.5 rounded-xl bg-[#F7F8FA] text-left text-xs font-bold text-[#111318]"
            >
              Contact Us
            </button>
          </div>

          {/* 25% Off Promotional Banner inside Mobile Menu */}
          <div
            onClick={() => navigate('/client/register')}
            className="p-3 rounded-2xl bg-[#FF6A2A]/10 border border-[#FF6A2A]/25 flex items-center justify-between cursor-pointer"
          >
            <div>
              <div className="text-[10px] font-bold text-[#FF6A2A] uppercase tracking-wider">
                Special Offer
              </div>
              <div className="text-xs font-bold text-[#111318]">
                Get 25% Off Your First Project
              </div>
            </div>
            <span className="text-xs font-extrabold text-[#FF6A2A]">Register →</span>
          </div>

          {/* Account Actions */}
          <div className="space-y-2">
            {clientUser ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F8FA] border border-[#E7E9ED]">
                <div className="text-xs font-bold text-[#111318]">
                  Signed in as {clientUser.name}
                </div>
                <button
                  onClick={() => navigate('/client/portal')}
                  className="text-xs font-bold text-[#FF6A2A]"
                >
                  Go to Portal →
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => navigate('/client/login')}
                  className="py-2.5 text-center text-xs font-bold rounded-xl border border-[#E7E9ED] text-[#111318]"
                >
                  Client Login
                </button>
                <button
                  onClick={() => navigate('/client/register')}
                  className="py-2.5 text-center text-xs font-bold rounded-xl bg-[#111318] text-white"
                >
                  Register (25% Off)
                </button>
              </div>
            )}

            <button
              onClick={() => navigate('/start-project')}
              className="w-full py-3 rounded-xl bg-[#FF6A2A] text-white text-xs font-bold uppercase tracking-wider text-center block shadow-lg shadow-[#FF6A2A]/20"
            >
              Start a Project Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
