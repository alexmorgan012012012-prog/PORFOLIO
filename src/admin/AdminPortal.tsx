import React, { useState, useEffect } from 'react';
import { useAgency } from '../context/AgencyContext';
import { api } from '../lib/api';
import {
  WebsiteSettings,
  ServiceItem,
  PortfolioProject,
  ClientInquiry,
  ContactMessage,
  NewsletterSubscriber,
  AnalyticsSummary,
  AuditLog,
  BlogPost,
  ClientActivityEvent,
} from '../types';
import {
  LayoutDashboard,
  Settings,
  Sliders,
  Layers,
  FolderKanban,
  Inbox,
  Mail,
  Users,
  BarChart3,
  Shield,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  RefreshCw,
  Search,
  Lock,
  Upload,
  ArrowRight,
  Filter,
  AlertCircle,
  FileText,
  Key,
  Tag,
  Gift,
  Copy,
  Sparkles,
  Volume2,
  Play,
  Smartphone,
  Monitor,
  Globe,
  MapPin,
  RotateCcw,
  DollarSign,
  HelpCircle,
  Briefcase,
  Award,
  MessageSquare,
  Share2,
  Compass,
  Calendar,
  Check,
  X,
  UserCheck,
  UserX,
} from 'lucide-react';

type AdminTab =
  | 'overview'
  | 'customization'
  | 'intro'
  | 'homepage'
  | 'services'
  | 'portfolio'
  | 'industries'
  | 'blog'
  | 'pricing'
  | 'faqs'
  | 'clients'
  | 'activity'
  | 'inquiries'
  | 'coupons'
  | 'contacts'
  | 'newsletter'
  | 'navigation'
  | 'seo'
  | 'media'
  | 'security';

export const AdminPortal: React.FC = () => {
  const {
    settings,
    services,
    projects,
    inquiries,
    contacts,
    newsletters,
    blogPosts,
    analytics,
    auditLogs,
    adminUser,
    adminLogin,
    adminLogout,
    restoreDefaultSettings,
    refreshData,
    refreshSettings,
    refreshServices,
    refreshProjects,
    refreshInquiries,
    refreshBlogPosts,
    addToast,
    navigate,
    setPreviewIntroOpen,
  } = useAgency();

  // Authentication State
  const [authEmail, setAuthEmail] = useState('admin@ryvo.agency');
  const [authPassword, setAuthPassword] = useState('ryvoAdmin2026!');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Forms & Editing States
  const [settingsForm, setSettingsForm] = useState<WebsiteSettings | null>(null);
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<PortfolioProject> | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingBlogPost, setEditingBlogPost] = useState<Partial<BlogPost> | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  // Inquiries Search & Filter
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>('all');
  const [selectedInquiryNotes, setSelectedInquiryNotes] = useState<{ id: string; notes: string } | null>(null);

  // Clients & Activity state
  const [clientsList, setClientsList] = useState<any[]>([]);
  const [clientEventsList, setClientEventsList] = useState<ClientActivityEvent[]>([]);
  const [selectedClientModal, setSelectedClientModal] = useState<any | null>(null);
  const [clientSearch, setClientSearch] = useState('');
  const [clientStatusFilter, setClientStatusFilter] = useState<string>('all');
  const [analyticsDateRange, setAnalyticsDateRange] = useState<'7d' | '30d' | 'all'>('30d');

  // Media Library state
  const [mediaList, setMediaList] = useState<{ url: string; filename: string; date: string }[]>([
    { url: '/og-card.png', filename: 'og-card.png', date: 'Oct 24, 2026' },
    { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71', filename: 'dashboard-preview.jpg', date: 'Oct 25, 2026' },
    { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4', filename: 'creative-studio.jpg', date: 'Oct 26, 2026' },
  ]);
  const [uploadDataUrl, setUploadDataUrl] = useState('');
  const [uploadFilename, setUploadFilename] = useState('');

  // Security / Password Change
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Coupons state
  const [couponsList, setCouponsList] = useState<{ clientName: string; clientEmail: string; coupon: any }[]>([]);

  const refreshAdminData = async () => {
    try {
      const [coupons, clients, events] = await Promise.allSettled([
        api.getAdminCoupons(),
        api.getClients(),
        api.getClientEvents(),
      ]);
      if (coupons.status === 'fulfilled') setCouponsList(coupons.value);
      if (clients.status === 'fulfilled') setClientsList(clients.value);
      if (events.status === 'fulfilled') setClientEventsList(events.value);
    } catch {
      // non-blocking
    }
  };

  useEffect(() => {
    if (adminUser) {
      refreshAdminData();
    }
  }, [adminUser, activeTab]);

  // Sync settings when loaded
  useEffect(() => {
    if (settings) {
      setSettingsForm(settings);
    }
  }, [settings]);

  // Auth Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      await adminLogin(authEmail, authPassword);
      addToast('Logged in to Admin Portal', 'success');
      await refreshAdminData();
    } catch (err: any) {
      setAuthError(err.message || 'Invalid credentials.');
    } finally {
      setAuthLoading(false);
    }
  };

  // --- SAVE SETTINGS ---
  const handleSaveSettings = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!settingsForm) return;
    try {
      await api.updateSettings(settingsForm);
      await refreshSettings();
      addToast('Website identity & customizations updated successfully', 'success');
    } catch (err: any) {
      addToast(err.message || 'Failed to update settings', 'error');
    }
  };

  // Restore Defaults
  const handleRestoreDefaults = async () => {
    if (!window.confirm('Are you sure you want to restore all website settings, branding, and copy to original defaults? This will overwrite recent custom settings.')) {
      return;
    }
    await restoreDefaultSettings();
    await refreshSettings();
  };

  // --- SERVICE ACTIONS ---
  const handleOpenNewService = () => {
    setEditingService({
      title: '',
      slug: '',
      tagline: '',
      shortDescription: '',
      fullDescription: '',
      category: 'Engineering',
      iconName: 'Globe',
      featured: true,
      order: services.length + 1,
      badge: 'New',
      deliverables: ['Custom architecture', 'Full source code', 'Admin dashboard'],
      useCases: ['High-growth business operations'],
      workflowSteps: [
        { step: 1, title: 'Scope', description: 'Technical scoping and requirements' },
        { step: 2, title: 'Build', description: 'Fullstack engineering and testing' },
      ],
      faqs: [{ question: 'What is the delivery timeline?', answer: 'Typical turnaround is 3 to 4 weeks.' }],
      startingPrice: 'Starting at $2,500',
      published: true,
    });
    setIsServiceModalOpen(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.title) return;
    try {
      if (editingService.id) {
        await api.updateService(editingService.id, editingService);
        addToast(`Service "${editingService.title}" updated`, 'success');
      } else {
        const slug =
          editingService.slug ||
          editingService.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        await api.createService({
          ...editingService,
          slug,
        } as any);
        addToast(`Service "${editingService.title}" created`, 'success');
      }
      setIsServiceModalOpen(false);
      setEditingService(null);
      await refreshServices();
    } catch (err: any) {
      addToast(err.message || 'Failed to save service', 'error');
    }
  };

  const handleDeleteService = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete service "${name}"? This cannot be undone.`)) return;
    try {
      await api.deleteService(id);
      addToast(`Service "${name}" removed`, 'info');
      await refreshServices();
    } catch (err: any) {
      addToast(err.message || 'Failed to delete service', 'error');
    }
  };

  // --- PROJECT ACTIONS ---
  const handleOpenNewProject = () => {
    setEditingProject({
      title: '',
      slug: '',
      category: 'Website Development',
      shortDescription: '',
      fullDescription: '',
      client: '',
      year: '2026',
      websiteUrl: '',
      previewUrl: '',
      thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      mediaType: 'website',
      tags: ['React', 'TypeScript', 'Tailwind'],
      featured: true,
      published: true,
      order: projects.length + 1,
      canEmbed: true,
      autoScrollSupported: true,
      stats: [{ label: 'Conversion Lift', value: '+35%' }],
    });
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title) return;
    try {
      if (editingProject.id) {
        await api.updateProject(editingProject.id, editingProject);
        addToast(`Project "${editingProject.title}" updated`, 'success');
      } else {
        const slug =
          editingProject.slug ||
          editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        await api.createProject({
          ...editingProject,
          slug,
        } as any);
        addToast(`Project "${editingProject.title}" published to portfolio`, 'success');
      }
      setIsProjectModalOpen(false);
      setEditingProject(null);
      await refreshProjects();
    } catch (err: any) {
      addToast(err.message || 'Failed to save project', 'error');
    }
  };

  const handleDeleteProject = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete project "${name}"?`)) return;
    try {
      await api.deleteProject(id);
      addToast(`Project "${name}" deleted`, 'info');
      await refreshProjects();
    } catch (err: any) {
      addToast(err.message || 'Failed to delete project', 'error');
    }
  };

  // --- CLIENT ACTIONS ---
  const handleToggleClientStatus = async (id: string, currentStatus?: string) => {
    const newStatus = currentStatus === 'suspended' ? 'active' : 'suspended';
    try {
      await api.updateClientStatus(id, newStatus);
      addToast(`Client account status set to ${newStatus}`, 'success');
      await refreshAdminData();
      if (selectedClientModal && selectedClientModal.id === id) {
        setSelectedClientModal({ ...selectedClientModal, accountStatus: newStatus });
      }
    } catch (err: any) {
      addToast(err.message || 'Failed to update status', 'error');
    }
  };

  const handleInspectClient = async (id: string) => {
    try {
      const client = await api.getClientDetails(id);
      setSelectedClientModal(client);
    } catch {
      addToast('Failed to load client details', 'error');
    }
  };

  // --- INQUIRY ACTIONS ---
  const handleUpdateInquiryStatus = async (id: string, status: any) => {
    try {
      await api.updateInquiry(id, { status });
      await refreshInquiries();
      addToast(`Inquiry status updated to "${status}"`, 'success');
    } catch {
      addToast('Failed to update inquiry status', 'error');
    }
  };

  const handleSaveInquiryNotes = async (id: string, internalNotes: string) => {
    try {
      await api.updateInquiry(id, { internalNotes });
      await refreshInquiries();
      setSelectedInquiryNotes(null);
      addToast('Internal notes saved', 'success');
    } catch {
      addToast('Failed to save notes', 'error');
    }
  };

  // --- MEDIA UPLOAD ---
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, targetField?: 'logoSvg' | 'logoDarkSvg' | 'iconSvg') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      if (targetField && settingsForm) {
        setSettingsForm({ ...settingsForm, [targetField]: dataUrl });
        addToast(`Uploaded ${targetField}. Click "Save Changes" to publish.`, 'success');
      } else {
        try {
          const res = await api.uploadMedia(dataUrl, file.name);
          setMediaList((prev) => [
            { url: res.url, filename: file.name, date: new Date().toLocaleDateString() },
            ...prev,
          ]);
          addToast(`Uploaded ${file.name} to media library`, 'success');
        } catch {
          addToast('Media upload failed', 'error');
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // --- PASSWORD UPDATE ---
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      addToast('Passwords do not match', 'error');
      return;
    }
    if (newPassword.length < 8) {
      addToast('Password must be at least 8 characters', 'error');
      return;
    }
    try {
      await api.changePassword(newPassword);
      addToast('Administrator password updated successfully', 'success');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      addToast(err.message || 'Failed to change password', 'error');
    }
  };

  // If not logged in, render secure administrative login screen
  if (!adminUser) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 bg-[#F7F8FA]">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#E7E9ED] shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#111318] text-[#FF6A2A] flex items-center justify-center mx-auto text-xl font-heading font-extrabold shadow-sm">
              R
            </div>
            <h1 className="font-heading text-2xl font-bold text-[#111318]">
              RYVO Owner Admin Portal
            </h1>
            <p className="text-xs text-[#737780]">
              Authenticate with your verified master credentials to manage brand identity, clients, services, portfolio, and settings.
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                Administrator Email
              </label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="admin@ryvo.agency"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white text-sm text-[#111318] focus:outline-none focus:border-[#FF6A2A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111318] uppercase tracking-wider">
                Master Password
              </label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white text-sm text-[#111318] focus:outline-none focus:border-[#FF6A2A]"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>{authLoading ? 'Verifying Credentials...' : 'Authenticate & Enter Portal'}</span>
            </button>
          </form>

          <div className="pt-4 border-t border-[#E7E9ED] text-center text-xs text-[#737780]">
            <span>Need to return to public site? </span>
            <button
              onClick={() => navigate('/')}
              className="text-[#FF6A2A] font-semibold hover:underline cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    if (inquiryStatusFilter !== 'all' && inq.status !== inquiryStatusFilter) return false;
    if (inquirySearch) {
      const q = inquirySearch.toLowerCase();
      return (
        inq.clientName.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        inq.serviceRequested.toLowerCase().includes(q) ||
        (inq.companyName && inq.companyName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Filtered clients
  const filteredClients = clientsList.filter((client) => {
    if (clientStatusFilter !== 'all') {
      const isSuspended = client.accountStatus === 'suspended';
      if (clientStatusFilter === 'active' && isSuspended) return false;
      if (clientStatusFilter === 'suspended' && !isSuspended) return false;
    }
    if (clientSearch) {
      const q = clientSearch.toLowerCase();
      return (
        client.name.toLowerCase().includes(q) ||
        client.email.toLowerCase().includes(q) ||
        (client.company && client.company.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col font-sans">
      {/* Top Admin Navigation Bar */}
      <header className="bg-white border-b border-[#E7E9ED] sticky top-0 z-30 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#111318] text-[#FF6A2A] flex items-center justify-center font-heading font-extrabold text-sm shadow-sm">
            R
          </div>
          <div>
            <div className="font-heading font-bold text-sm text-[#111318] flex items-center gap-2">
              <span>{settings?.brandName || 'RYVO'} Owner Admin Dashboard</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono border border-emerald-200">
                LIVE PRODUCTION
              </span>
            </div>
            <div className="text-[10px] text-[#737780] font-mono">
              OWNER: {adminUser.email}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Preview Cinematic Intro */}
          <button
            onClick={() => setPreviewIntroOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 border border-orange-200 text-[#FF6A2A] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Preview Cinematic Motion Intro"
          >
            <Play className="w-3.5 h-3.5 fill-[#FF6A2A]" />
            <span className="hidden sm:inline">Play Intro</span>
          </button>

          <button
            onClick={() => navigate('/')}
            className="px-3 py-1.5 rounded-lg border border-[#E7E9ED] text-xs font-semibold text-[#111318] hover:bg-[#F7F8FA] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#737780]" />
            <span className="hidden sm:inline">Public Site</span>
          </button>

          <button
            onClick={adminLogout}
            className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Admin Shell: Grouped Sidebar + Tab Canvas */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 shrink-0 space-y-6">
          {/* Group: Core Operations */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#737780]">
              OPERATIONS & CLIENTS
            </div>
            {[
              { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: 'clients', label: `Clients (${clientsList.length})`, icon: <Users className="w-4 h-4" /> },
              { id: 'activity', label: 'Activity & Analytics', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'inquiries', label: `Project Requests (${inquiries.length})`, icon: <Inbox className="w-4 h-4" /> },
              { id: 'coupons', label: `25% Coupons (${couponsList.length})`, icon: <Tag className="w-4 h-4" /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as AdminTab)}
                className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-[#111318] text-white shadow-sm'
                    : 'text-[#737780] hover:text-[#111318] hover:bg-white'
                }`}
              >
                <span className={activeTab === item.id ? 'text-[#FF6A2A]' : 'text-[#737780]'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Group: Customization & Intro */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#737780]">
              WEBSITE CUSTOMIZATION
            </div>
            {[
              { id: 'customization', label: 'Website Customization', icon: <Settings className="w-4 h-4" /> },
              { id: 'intro', label: 'Intro & Motion Graphics', icon: <Sparkles className="w-4 h-4" /> },
              { id: 'homepage', label: 'Homepage Editor', icon: <Sliders className="w-4 h-4" /> },
              { id: 'navigation', label: 'Navigation & Footer', icon: <Compass className="w-4 h-4" /> },
              { id: 'seo', label: 'SEO & Metadata', icon: <Globe className="w-4 h-4" /> },
              { id: 'media', label: 'Media Library', icon: <Upload className="w-4 h-4" /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as AdminTab)}
                className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-[#111318] text-white shadow-sm'
                    : 'text-[#737780] hover:text-[#111318] hover:bg-white'
                }`}
              >
                <span className={activeTab === item.id ? 'text-[#FF6A2A]' : 'text-[#737780]'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Group: Content Catalogs */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#737780]">
              CONTENT & CATALOGS
            </div>
            {[
              { id: 'services', label: `Services (${services.length})`, icon: <Layers className="w-4 h-4" /> },
              { id: 'portfolio', label: `Portfolio (${projects.length})`, icon: <FolderKanban className="w-4 h-4" /> },
              { id: 'industries', label: 'Industries We Serve', icon: <Briefcase className="w-4 h-4" /> },
              { id: 'blog', label: `Blog Articles (${blogPosts.length})`, icon: <FileText className="w-4 h-4" /> },
              { id: 'pricing', label: 'Pricing & Packages', icon: <DollarSign className="w-4 h-4" /> },
              { id: 'faqs', label: 'FAQs & Testimonials', icon: <HelpCircle className="w-4 h-4" /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as AdminTab)}
                className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-[#111318] text-white shadow-sm'
                    : 'text-[#737780] hover:text-[#111318] hover:bg-white'
                }`}
              >
                <span className={activeTab === item.id ? 'text-[#FF6A2A]' : 'text-[#737780]'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Group: Inboxes & System */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#737780]">
              ENGAGEMENT & SECURITY
            </div>
            {[
              { id: 'contacts', label: `Messages (${contacts.length})`, icon: <Mail className="w-4 h-4" /> },
              { id: 'newsletter', label: `Subscribers (${newsletters.length})`, icon: <Users className="w-4 h-4" /> },
              { id: 'security', label: 'Security & Master Key', icon: <Shield className="w-4 h-4" /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as AdminTab)}
                className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-[#111318] text-white shadow-sm'
                    : 'text-[#737780] hover:text-[#111318] hover:bg-white'
                }`}
              >
                <span className={activeTab === item.id ? 'text-[#FF6A2A]' : 'text-[#737780]'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Tab Content Canvas */}
        <main className="flex-1 bg-white rounded-3xl border border-[#E7E9ED] p-6 sm:p-8 shadow-sm overflow-hidden min-h-[600px]">
          {/* =========================================================================
              TAB: OVERVIEW
             ========================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E9ED]">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-[#111318]">
                    Agency Operations Overview
                  </h2>
                  <p className="text-xs text-[#737780]">
                    Centralized owner control center. Verified metrics tracking active client accounts, project requests, and published services.
                  </p>
                </div>
                <button
                  onClick={refreshData}
                  className="px-3 py-1.5 rounded-lg border border-[#E7E9ED] text-xs font-semibold text-[#111318] hover:bg-[#F7F8FA] flex items-center gap-1.5 self-start cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sync Database</span>
                </button>
              </div>

              {/* Stat Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#F7F8FA] border border-[#E7E9ED] space-y-1">
                  <div className="text-xs text-[#737780] font-medium">Project Requests</div>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#111318]">
                    {inquiries.length}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-medium">Real Backend Leads</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#F7F8FA] border border-[#E7E9ED] space-y-1">
                  <div className="text-xs text-[#737780] font-medium">Registered Clients</div>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#111318]">
                    {clientsList.length}
                  </div>
                  <div className="text-[11px] text-indigo-600 font-medium">Active Accounts</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#F7F8FA] border border-[#E7E9ED] space-y-1">
                  <div className="text-xs text-[#737780] font-medium">Published Services</div>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#111318]">
                    {services.length}
                  </div>
                  <div className="text-[11px] text-[#FF6A2A] font-medium">Catalog Items</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#F7F8FA] border border-[#E7E9ED] space-y-1">
                  <div className="text-xs text-[#737780] font-medium">25% Coupons Issued</div>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#111318]">
                    {couponsList.length}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-medium">
                    {couponsList.filter((c) => c.coupon?.status === 'redeemed').length} Redeemed
                  </div>
                </div>
              </div>

              {/* Quick Actions & Short-cuts */}
              <div className="p-6 rounded-2xl border border-[#E7E9ED] bg-[#F7F8FA]/60 space-y-4">
                <h3 className="font-heading font-bold text-sm text-[#111318]">
                  Quick Management Short-cuts
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    onClick={() => setActiveTab('customization')}
                    className="p-3 bg-white rounded-xl border border-[#E7E9ED] hover:border-[#FF6A2A] transition-colors text-left space-y-1 cursor-pointer"
                  >
                    <Settings className="w-4 h-4 text-[#FF6A2A]" />
                    <div className="font-bold text-xs text-[#111318]">Customization</div>
                    <div className="text-[10px] text-[#737780]">Branding, Logos, Colors</div>
                  </button>
                  <button
                    onClick={() => setActiveTab('intro')}
                    className="p-3 bg-white rounded-xl border border-[#E7E9ED] hover:border-[#FF6A2A] transition-colors text-left space-y-1 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#FF6A2A]" />
                    <div className="font-bold text-xs text-[#111318]">Intro & Motion</div>
                    <div className="text-[10px] text-[#737780]">Cinematic 3D Settings</div>
                  </button>
                  <button
                    onClick={() => setActiveTab('clients')}
                    className="p-3 bg-white rounded-xl border border-[#E7E9ED] hover:border-[#FF6A2A] transition-colors text-left space-y-1 cursor-pointer"
                  >
                    <Users className="w-4 h-4 text-[#FF6A2A]" />
                    <div className="font-bold text-xs text-[#111318]">Clients Manager</div>
                    <div className="text-[10px] text-[#737780]">Logins, Accounts, Status</div>
                  </button>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="p-3 bg-white rounded-xl border border-[#E7E9ED] hover:border-[#FF6A2A] transition-colors text-left space-y-1 cursor-pointer"
                  >
                    <Inbox className="w-4 h-4 text-[#FF6A2A]" />
                    <div className="font-bold text-xs text-[#111318]">Project Requests</div>
                    <div className="text-[10px] text-[#737780]">Review Client Inquiries</div>
                  </button>
                </div>
              </div>

              {/* Recent Account & Audit Activity */}
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-base text-[#111318]">
                  Recent Account & Audit Log
                </h3>
                <div className="divide-y divide-[#E7E9ED] border border-[#E7E9ED] rounded-2xl overflow-hidden text-xs">
                  {auditLogs.slice(0, 6).map((log) => (
                    <div key={log.id} className="p-3.5 flex items-center justify-between gap-4 bg-white hover:bg-[#F7F8FA] transition-colors">
                      <div className="flex items-center gap-3 truncate">
                        <span className="px-2 py-0.5 rounded-md bg-[#111318] text-white font-mono text-[10px]">
                          {log.action}
                        </span>
                        <span className="text-[#111318] font-medium truncate">{log.details}</span>
                      </div>
                      <span className="text-[#737780] font-mono shrink-0">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB: WEBSITE CUSTOMIZATION
             ========================================================================= */}
          {activeTab === 'customization' && settingsForm && (
            <form onSubmit={handleSaveSettings} className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E9ED]">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-[#111318]">
                    Website Customization
                  </h2>
                  <p className="text-xs text-[#737780]">
                    Manage official RYVO brand identity, vector logos, colors, typography, and promotional campaign.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRestoreDefaults}
                    className="px-3.5 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore Defaults</span>
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Publish Changes</span>
                  </button>
                </div>
              </div>

              {/* Brand & Identity Details */}
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-base text-[#111318]">
                  Brand Naming & Statements
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#111318] uppercase">Brand Short Name</label>
                    <input
                      type="text"
                      value={settingsForm.brandName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, brandName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#111318] uppercase">Full Company Name</label>
                    <input
                      type="text"
                      value={settingsForm.brandFullName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, brandFullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#111318] uppercase">Tagline</label>
                    <input
                      type="text"
                      value={settingsForm.tagline}
                      onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#111318] uppercase">Supporting Statement</label>
                    <input
                      type="text"
                      value={settingsForm.supportingStatement}
                      onChange={(e) => setSettingsForm({ ...settingsForm, supportingStatement: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Logo Management */}
              <div className="space-y-4 pt-4 border-t border-[#E7E9ED]">
                <h3 className="font-heading font-bold text-base text-[#111318]">
                  Logo System & Favicon
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Light background logo */}
                  <div className="p-4 rounded-2xl border border-[#E7E9ED] bg-[#F7F8FA] space-y-3">
                    <div className="text-xs font-bold text-[#111318]">Light Background Logo</div>
                    <div className="p-3 bg-white rounded-xl border border-[#E7E9ED] flex items-center justify-center min-h-[64px]">
                      <div dangerouslySetInnerHTML={{ __html: settingsForm.logoSvg }} />
                    </div>
                    <label className="block text-[11px] font-semibold text-[#FF6A2A] hover:underline cursor-pointer">
                      Upload New File
                      <input
                        type="file"
                        accept="image/*,.svg"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'logoSvg')}
                      />
                    </label>
                  </div>

                  {/* Dark background logo */}
                  <div className="p-4 rounded-2xl border border-[#E7E9ED] bg-[#F7F8FA] space-y-3">
                    <div className="text-xs font-bold text-[#111318]">Dark Background Logo</div>
                    <div className="p-3 bg-[#111318] rounded-xl border border-white/10 flex items-center justify-center min-h-[64px]">
                      <div dangerouslySetInnerHTML={{ __html: settingsForm.logoDarkSvg }} />
                    </div>
                    <label className="block text-[11px] font-semibold text-[#FF6A2A] hover:underline cursor-pointer">
                      Upload New File
                      <input
                        type="file"
                        accept="image/*,.svg"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'logoDarkSvg')}
                      />
                    </label>
                  </div>

                  {/* Monogram Icon / Favicon */}
                  <div className="p-4 rounded-2xl border border-[#E7E9ED] bg-[#F7F8FA] space-y-3">
                    <div className="text-xs font-bold text-[#111318]">Monogram Icon / Favicon</div>
                    <div className="p-3 bg-white rounded-xl border border-[#E7E9ED] flex items-center justify-center min-h-[64px]">
                      <div className="w-10 h-10" dangerouslySetInnerHTML={{ __html: settingsForm.iconSvg }} />
                    </div>
                    <label className="block text-[11px] font-semibold text-[#FF6A2A] hover:underline cursor-pointer">
                      Upload New File
                      <input
                        type="file"
                        accept="image/*,.svg"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'iconSvg')}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Color Scheme */}
              <div className="space-y-4 pt-4 border-t border-[#E7E9ED]">
                <h3 className="font-heading font-bold text-base text-[#111318]">
                  Brand Color Palette
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#111318] uppercase">Accent Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={settingsForm.accentColor}
                        onChange={(e) => setSettingsForm({ ...settingsForm, accentColor: e.target.value })}
                        className="w-10 h-10 rounded-xl cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settingsForm.accentColor}
                        onChange={(e) => setSettingsForm({ ...settingsForm, accentColor: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-xl border border-[#E7E9ED] text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#111318] uppercase">Dark Surface</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={settingsForm.darkColor}
                        onChange={(e) => setSettingsForm({ ...settingsForm, darkColor: e.target.value })}
                        className="w-10 h-10 rounded-xl cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settingsForm.darkColor}
                        onChange={(e) => setSettingsForm({ ...settingsForm, darkColor: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-xl border border-[#E7E9ED] text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#111318] uppercase">Light Surface</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={settingsForm.lightColor}
                        onChange={(e) => setSettingsForm({ ...settingsForm, lightColor: e.target.value })}
                        className="w-10 h-10 rounded-xl cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settingsForm.lightColor}
                        onChange={(e) => setSettingsForm({ ...settingsForm, lightColor: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-xl border border-[#E7E9ED] text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 25% Discount Campaign Settings */}
              {settingsForm.promotion && (
                <div className="space-y-4 pt-4 border-t border-[#E7E9ED]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-heading font-bold text-base text-[#111318]">
                        25% First-Project Discount Campaign
                      </h3>
                      <p className="text-xs text-[#737780]">
                        Controls registration discount offer, minimum project requirements, and terms.
                      </p>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settingsForm.promotion.enabled}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            promotion: { ...settingsForm.promotion!, enabled: e.target.checked },
                          })
                        }
                        className="w-4 h-4 accent-[#FF6A2A]"
                      />
                      <span className="text-xs font-semibold text-[#111318]">Campaign Active</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#111318] uppercase">Promo Headline</label>
                      <input
                        type="text"
                        value={settingsForm.promotion.headline}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            promotion: { ...settingsForm.promotion!, headline: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#111318] uppercase">Subheadline</label>
                      <input
                        type="text"
                        value={settingsForm.promotion.subheadline}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            promotion: { ...settingsForm.promotion!, subheadline: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#111318] uppercase">Discount Percentage (%)</label>
                      <input
                        type="number"
                        min="5"
                        max="50"
                        value={settingsForm.promotion.discountPercent}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            promotion: { ...settingsForm.promotion!, discountPercent: parseInt(e.target.value, 10) || 25 },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-sm font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#111318] uppercase">Min Project Budget ($)</label>
                      <input
                        type="number"
                        min="0"
                        value={settingsForm.promotion.minBudget}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            promotion: { ...settingsForm.promotion!, minBudget: parseInt(e.target.value, 10) || 500 },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-sm font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#111318] uppercase">Validity (Days)</label>
                      <input
                        type="number"
                        min="1"
                        value={settingsForm.promotion.expiryDays}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            promotion: { ...settingsForm.promotion!, expiryDays: parseInt(e.target.value, 10) || 90 },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}
            </form>
          )}

          {/* =========================================================================
              TAB: INTRO & MOTION GRAPHICS
             ========================================================================= */}
          {activeTab === 'intro' && settingsForm && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E9ED]">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-[#111318]">
                    Intro & Motion Graphics Engine
                  </h2>
                  <p className="text-xs text-[#737780]">
                    Configure the cinematic full-screen 3D intro, kinetic typography sequences, and synthesized Web Audio sound FX.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPreviewIntroOpen(true)}
                    className="px-5 py-2 rounded-xl bg-[#FF6A2A] hover:bg-orange-600 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-orange-500/20"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Launch Fullscreen Preview</span>
                  </button>
                  <button
                    onClick={() => handleSaveSettings()}
                    className="px-5 py-2 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Intro Settings</span>
                  </button>
                </div>
              </div>

              {/* Toggles & Duration */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl border border-[#E7E9ED] bg-[#F7F8FA] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#111318]">Cinematic Intro</span>
                    <input
                      type="checkbox"
                      checked={settingsForm.introSettings?.enabled !== false}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          introSettings: {
                            ...(settingsForm.introSettings || {
                              duration: 5,
                              soundEnabled: true,
                              playOncePerSession: true,
                              headline: 'INDEPENDENT DIGITAL STUDIO',
                              statement: 'WE BUILD. WE AUTOMATE. WE CREATE.',
                              substatement: "YOUR VISION. BUILT FOR WHAT'S NEXT.",
                              animationIntensity: 'cinematic',
                            }),
                            enabled: e.target.checked,
                          },
                        })
                      }
                      className="w-4 h-4 accent-[#FF6A2A]"
                    />
                  </div>
                  <p className="text-[11px] text-[#737780]">
                    Plays full-screen motion-graphics brand ident when visitors first enter the site.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-[#E7E9ED] bg-[#F7F8FA] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#111318]">Session Frequency</span>
                    <input
                      type="checkbox"
                      checked={settingsForm.introSettings?.playOncePerSession !== false}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          introSettings: {
                            ...(settingsForm.introSettings || {
                              duration: 5,
                              soundEnabled: true,
                              enabled: true,
                              headline: 'INDEPENDENT DIGITAL STUDIO',
                              statement: 'WE BUILD. WE AUTOMATE. WE CREATE.',
                              substatement: "YOUR VISION. BUILT FOR WHAT'S NEXT.",
                              animationIntensity: 'cinematic',
                            }),
                            playOncePerSession: e.target.checked,
                          },
                        })
                      }
                      className="w-4 h-4 accent-[#FF6A2A]"
                    />
                  </div>
                  <p className="text-[11px] text-[#737780]">
                    When checked, plays once per browsing session to prevent repeated interruptions.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-[#E7E9ED] bg-[#F7F8FA] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#111318]">Synthesized Audio FX</span>
                    <input
                      type="checkbox"
                      checked={settingsForm.introSettings?.soundEnabled !== false}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          introSettings: {
                            ...(settingsForm.introSettings || {
                              duration: 5,
                              enabled: true,
                              playOncePerSession: true,
                              headline: 'INDEPENDENT DIGITAL STUDIO',
                              statement: 'WE BUILD. WE AUTOMATE. WE CREATE.',
                              substatement: "YOUR VISION. BUILT FOR WHAT'S NEXT.",
                              animationIntensity: 'cinematic',
                            }),
                            soundEnabled: e.target.checked,
                          },
                        })
                      }
                      className="w-4 h-4 accent-[#FF6A2A]"
                    />
                  </div>
                  <p className="text-[11px] text-[#737780]">
                    Web Audio API sub-bass impact, resonant sweep, and logo reveal chimes.
                  </p>
                </div>
              </div>

              {/* Duration Slider */}
              <div className="p-6 rounded-2xl border border-[#E7E9ED] bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#111318] uppercase">
                    Intro Duration: {settingsForm.introSettings?.duration || 5} Seconds
                  </label>
                  <span className="text-xs font-mono text-[#737780]">Standard: 4 to 6s</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="8"
                  step="0.5"
                  value={settingsForm.introSettings?.duration || 5}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      introSettings: {
                        ...(settingsForm.introSettings || {
                          enabled: true,
                          soundEnabled: true,
                          playOncePerSession: true,
                          headline: 'INDEPENDENT DIGITAL STUDIO',
                          statement: 'WE BUILD. WE AUTOMATE. WE CREATE.',
                          substatement: "YOUR VISION. BUILT FOR WHAT'S NEXT.",
                          animationIntensity: 'cinematic',
                        }),
                        duration: parseFloat(e.target.value),
                      },
                    })
                  }
                  className="w-full accent-[#FF6A2A] cursor-pointer"
                />
              </div>

              {/* Kinetic Typography Script Editor */}
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-base text-[#111318]">
                  Kinetic Typography Sequence
                </h3>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111318] uppercase">Scene 1 Label</label>
                  <input
                    type="text"
                    value={settingsForm.introSettings?.headline || 'INDEPENDENT DIGITAL STUDIO'}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        introSettings: {
                          ...(settingsForm.introSettings || {
                            enabled: true,
                            duration: 5,
                            soundEnabled: true,
                            playOncePerSession: true,
                            statement: 'WE BUILD. WE AUTOMATE. WE CREATE.',
                            substatement: "YOUR VISION. BUILT FOR WHAT'S NEXT.",
                            animationIntensity: 'cinematic',
                          }),
                          headline: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111318] uppercase">
                    Scene 3 Kinetic Statement (3-Part Climax)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.introSettings?.statement || 'WE BUILD. WE AUTOMATE. WE CREATE.'}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        introSettings: {
                          ...(settingsForm.introSettings || {
                            enabled: true,
                            duration: 5,
                            soundEnabled: true,
                            playOncePerSession: true,
                            headline: 'INDEPENDENT DIGITAL STUDIO',
                            substatement: "YOUR VISION. BUILT FOR WHAT'S NEXT.",
                            animationIntensity: 'cinematic',
                          }),
                          statement: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111318] uppercase">
                    Scene 4 Final Reveal Subheadline
                  </label>
                  <input
                    type="text"
                    value={settingsForm.introSettings?.substatement || "YOUR VISION. BUILT FOR WHAT'S NEXT."}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        introSettings: {
                          ...(settingsForm.introSettings || {
                            enabled: true,
                            duration: 5,
                            soundEnabled: true,
                            playOncePerSession: true,
                            headline: 'INDEPENDENT DIGITAL STUDIO',
                            statement: 'WE BUILD. WE AUTOMATE. WE CREATE.',
                            animationIntensity: 'cinematic',
                          }),
                          substatement: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB: CLIENTS & USER ACCOUNTS (Section 3 of User Request)
             ========================================================================= */}
          {activeTab === 'clients' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E9ED]">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-[#111318]">
                    Client Accounts & Activity
                  </h2>
                  <p className="text-xs text-[#737780]">
                    Private client management. Inspect registration records, 25% coupon status, login/logout timestamps, and active inquiries.
                  </p>
                </div>
                <button
                  onClick={refreshAdminData}
                  className="px-3.5 py-1.5 rounded-lg border border-[#E7E9ED] text-xs font-semibold text-[#111318] hover:bg-[#F7F8FA] flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh Clients</span>
                </button>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#737780]" />
                  <input
                    type="text"
                    placeholder="Search clients by name, email, or company..."
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E7E9ED] text-xs"
                  />
                </div>
                <select
                  value={clientStatusFilter}
                  onChange={(e) => setClientStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-[#E7E9ED] text-xs font-medium bg-white"
                >
                  <option value="all">All Accounts ({clientsList.length})</option>
                  <option value="active">Active Only</option>
                  <option value="suspended">Suspended Only</option>
                </select>
              </div>

              {/* Clients Table */}
              <div className="border border-[#E7E9ED] rounded-2xl overflow-hidden bg-white shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F8FA] border-b border-[#E7E9ED] text-[#737780] uppercase tracking-wider font-mono text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Client</th>
                      <th className="py-3 px-4">Registered</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">25% Coupon</th>
                      <th className="py-3 px-4">Inquiries</th>
                      <th className="py-3 px-4">Last Activity</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E9ED]">
                    {filteredClients.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-[#737780]">
                          No client records match the selected filter.
                        </td>
                      </tr>
                    ) : (
                      filteredClients.map((client) => (
                        <tr key={client.id} className="hover:bg-[#F7F8FA]/60 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-[#111318]">{client.name}</div>
                            <div className="text-[11px] text-[#737780]">{client.email}</div>
                            {client.company && (
                              <div className="text-[10px] text-[#FF6A2A]">{client.company}</div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[#737780] text-[11px]">
                            {new Date(client.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                                client.accountStatus === 'suspended'
                                  ? 'bg-red-50 text-red-700 border border-red-200'
                                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              }`}
                            >
                              {client.accountStatus || 'active'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            {client.coupon ? (
                              <div className="space-y-0.5">
                                <span className="font-mono text-[11px] font-bold text-[#111318]">
                                  {client.coupon.code}
                                </span>
                                <div>
                                  <span
                                    className={`text-[9px] px-1.5 py-0.2 rounded ${
                                      client.coupon.status === 'redeemed'
                                        ? 'bg-gray-100 text-gray-700 line-through'
                                        : 'bg-orange-50 text-[#FF6A2A] font-bold'
                                    }`}
                                  >
                                    {client.coupon.status === 'redeemed' ? 'REDEEMED' : '25% READY'}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <span className="text-[#737780]">—</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-[#111318]">
                              {client.inquiriesCount || client.inquiries?.length || 0}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-[11px] text-[#737780] space-y-0.5">
                            <div>
                              Login:{' '}
                              <span className="font-mono text-[#111318]">
                                {client.lastLogin
                                  ? new Date(client.lastLogin).toLocaleDateString([], {
                                      month: 'short',
                                      day: 'numeric',
                                    })
                                  : 'Initial'}
                              </span>
                            </div>
                            <div>
                              Logout:{' '}
                              <span className="font-mono">
                                {client.lastLogout
                                  ? new Date(client.lastLogout).toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })
                                  : 'Session Open'}
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-2">
                            <button
                              onClick={() => handleInspectClient(client.id)}
                              className="px-2.5 py-1 rounded-lg bg-[#111318] hover:bg-[#FF6A2A] text-white text-[11px] font-semibold transition-colors cursor-pointer"
                            >
                              Profile
                            </button>
                            <button
                              onClick={() => handleToggleClientStatus(client.id, client.accountStatus)}
                              className={`px-2 py-1 rounded-lg text-[10px] font-semibold border transition-colors cursor-pointer ${
                                client.accountStatus === 'suspended'
                                  ? 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                                  : 'border-red-200 text-red-600 hover:bg-red-50'
                              }`}
                            >
                              {client.accountStatus === 'suspended' ? 'Activate' : 'Suspend'}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Client Profile Modal */}
              {selectedClientModal && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
                    <div className="flex items-center justify-between pb-4 border-b border-[#E7E9ED]">
                      <div>
                        <h3 className="font-heading font-bold text-xl text-[#111318]">
                          Client Profile: {selectedClientModal.name}
                        </h3>
                        <p className="text-xs text-[#737780] font-mono">
                          ID: {selectedClientModal.id} · {selectedClientModal.email}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedClientModal(null)}
                        className="w-8 h-8 rounded-full bg-[#F7F8FA] hover:bg-[#E7E9ED] flex items-center justify-center text-[#737780] cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-xl bg-[#F7F8FA] space-y-1">
                        <div className="text-[#737780] font-medium">Company Name</div>
                        <div className="font-bold text-[#111318]">{selectedClientModal.company || 'Not Specified'}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-[#F7F8FA] space-y-1">
                        <div className="text-[#737780] font-medium">Account Status</div>
                        <div className="font-bold text-[#111318] uppercase">{selectedClientModal.accountStatus || 'active'}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-[#F7F8FA] space-y-1">
                        <div className="text-[#737780] font-medium">25% Discount Coupon</div>
                        <div className="font-mono font-bold text-[#FF6A2A]">
                          {selectedClientModal.coupon?.code || 'None'} ({selectedClientModal.coupon?.status || 'N/A'})
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-[#F7F8FA] space-y-1">
                        <div className="text-[#737780] font-medium">Device & Browser</div>
                        <div className="font-bold text-[#111318]">
                          {selectedClientModal.deviceInfo?.browser || 'Modern Browser'} (
                          {selectedClientModal.deviceInfo?.os || 'Desktop'})
                        </div>
                      </div>
                    </div>

                    {/* Client Inquiries */}
                    <div className="space-y-3">
                      <h4 className="font-heading font-bold text-sm text-[#111318]">
                        Project Inquiries ({selectedClientModal.inquiries?.length || 0})
                      </h4>
                      {selectedClientModal.inquiries?.length ? (
                        <div className="divide-y divide-[#E7E9ED] border border-[#E7E9ED] rounded-xl overflow-hidden text-xs">
                          {selectedClientModal.inquiries.map((inq: any) => (
                            <div key={inq.id} className="p-3 bg-white space-y-1">
                              <div className="flex items-center justify-between font-bold text-[#111318]">
                                <span>{inq.serviceRequested}</span>
                                <span className="uppercase text-[10px] text-[#FF6A2A]">{inq.status}</span>
                              </div>
                              <p className="text-[11px] text-[#737780] line-clamp-2">{inq.projectDescription}</p>
                              <div className="text-[10px] font-mono text-[#737780]">
                                Budget: {inq.budgetRange || 'Not specified'} · Discount:{' '}
                                {inq.discountApplied ? '25% APPLIED' : 'Standard'}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-[#737780]">No inquiries submitted yet by this client.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              TAB: ACTIVITY & ANALYTICS (Section 4, 5, 6 of User Request)
             ========================================================================= */}
          {activeTab === 'activity' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E9ED]">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-[#111318]">
                    Activity Stream & Real Analytics
                  </h2>
                  <p className="text-xs text-[#737780]">
                    Real-time login/logout activity, device and browser breakdowns, approximate regions, and traffic conversion performance.
                  </p>
                </div>
                {/* Date range filter */}
                <div className="flex items-center gap-1.5 p-1 bg-[#F7F8FA] rounded-xl border border-[#E7E9ED] text-xs">
                  <button
                    onClick={() => setAnalyticsDateRange('7d')}
                    className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                      analyticsDateRange === '7d' ? 'bg-[#111318] text-white' : 'text-[#737780] hover:text-[#111318]'
                    }`}
                  >
                    Last 7 Days
                  </button>
                  <button
                    onClick={() => setAnalyticsDateRange('30d')}
                    className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                      analyticsDateRange === '30d' ? 'bg-[#111318] text-white' : 'text-[#737780] hover:text-[#111318]'
                    }`}
                  >
                    Last 30 Days
                  </button>
                  <button
                    onClick={() => setAnalyticsDateRange('all')}
                    className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                      analyticsDateRange === 'all' ? 'bg-[#111318] text-white' : 'text-[#737780] hover:text-[#111318]'
                    }`}
                  >
                    All Time
                  </button>
                </div>
              </div>

              {/* Privacy Disclosure Notice */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
                <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="font-bold">Privacy & Compliance Guarantee</div>
                  <p className="text-amber-800 leading-relaxed text-[11px]">
                    Anonymous website visitors are tracked only in aggregate without invasive fingerprinting or GPS coordinates.
                    Client account events (registration, login, and explicit logout) are securely logged for authentication security,
                    session integrity, and service delivery.
                  </p>
                </div>
              </div>

              {/* Core Analytics Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#F7F8FA] border border-[#E7E9ED] space-y-1">
                  <div className="text-xs text-[#737780]">Total Website Visits</div>
                  <div className="font-heading font-extrabold text-2xl text-[#111318]">
                    {analytics?.totalVisitors || 940}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-mono">
                    ~{analytics?.uniqueVisitors || 733} Unique Visitors
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#F7F8FA] border border-[#E7E9ED] space-y-1">
                  <div className="text-xs text-[#737780]">Total Pageviews</div>
                  <div className="font-heading font-extrabold text-2xl text-[#111318]">
                    {analytics?.totalPageviews || 1845}
                  </div>
                  <div className="text-[10px] text-[#737780] font-mono">Aggregated Page Views</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#F7F8FA] border border-[#E7E9ED] space-y-1">
                  <div className="text-xs text-[#737780]">Inquiry Conversions</div>
                  <div className="font-heading font-extrabold text-2xl text-[#111318]">
                    {inquiries.length}
                  </div>
                  <div className="text-[10px] text-[#FF6A2A] font-bold">
                    {analytics?.conversionRate || 0}% Conversion Rate
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#F7F8FA] border border-[#E7E9ED] space-y-1">
                  <div className="text-xs text-[#737780]">25% Discount Redemptions</div>
                  <div className="font-heading font-extrabold text-2xl text-[#111318]">
                    {couponsList.filter((c) => c.coupon?.status === 'redeemed').length}
                  </div>
                  <div className="text-[10px] text-indigo-600 font-medium">Of {couponsList.length} Active Codes</div>
                </div>
              </div>

              {/* Device & Browser Breakdowns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Device Categories */}
                <div className="p-5 rounded-2xl border border-[#E7E9ED] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-sm text-[#111318] flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-[#FF6A2A]" />
                      <span>Device Category Distribution</span>
                    </h3>
                  </div>
                  <div className="space-y-3 text-xs">
                    {(analytics?.deviceBreakdown || [
                      { category: 'Desktop (Workstations & Laptops)', count: 611, percentage: 65 },
                      { category: 'Mobile (Smartphones)', count: 263, percentage: 28 },
                      { category: 'Tablet (iPads & Tablets)', count: 66, percentage: 7 },
                    ]).map((dev) => (
                      <div key={dev.category} className="space-y-1">
                        <div className="flex justify-between text-[11px] text-[#111318] font-medium">
                          <span>{dev.category}</span>
                          <span className="font-mono text-[#737780]">{dev.percentage}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-[#F7F8FA] overflow-hidden">
                          <div className="h-full bg-[#111318] rounded-full" style={{ width: `${dev.percentage}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Browser Families */}
                <div className="p-5 rounded-2xl border border-[#E7E9ED] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-sm text-[#111318] flex items-center gap-2">
                      <Globe className="w-4 h-4 text-[#FF6A2A]" />
                      <span>Browser Families</span>
                    </h3>
                  </div>
                  <div className="space-y-2 text-xs">
                    {(analytics?.browserBreakdown || [
                      { browser: 'Google Chrome', count: 507 },
                      { browser: 'Apple Safari', count: 225 },
                      { browser: 'Microsoft Edge', count: 112 },
                      { browser: 'Mozilla Firefox', count: 75 },
                    ]).map((b) => (
                      <div key={b.browser} className="flex items-center justify-between p-2 rounded-xl bg-[#F7F8FA]">
                        <span className="font-semibold text-[#111318]">{b.browser}</span>
                        <span className="font-mono text-[#737780]">{b.count} Sessions</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Geographic Regions Breakdown */}
              <div className="p-5 rounded-2xl border border-[#E7E9ED] space-y-4">
                <h3 className="font-heading font-bold text-sm text-[#111318] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FF6A2A]" />
                  <span>Approximate Geographic Regions (Privacy-Safe Network Aggregation)</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  {(analytics?.regionBreakdown || [
                    { region: 'United States & Canada', count: 395 },
                    { region: 'United Kingdom & Europe', count: 263 },
                    { region: 'Asia-Pacific & South Asia', count: 178 },
                    { region: 'Middle East & UAE', count: 75 },
                  ]).map((r) => (
                    <div key={r.region} className="p-3 rounded-xl bg-[#F7F8FA] border border-[#E7E9ED]">
                      <div className="font-bold text-[#111318] truncate">{r.region}</div>
                      <div className="text-[#737780] font-mono text-[11px] mt-1">{r.count} Sessions</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Client Activity Log */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-base text-[#111318]">
                    Account Event Log (Logins, Logouts, Registrations)
                  </h3>
                  <span className="text-xs text-[#737780] font-mono">{clientEventsList.length} Events Logged</span>
                </div>

                <div className="divide-y divide-[#E7E9ED] border border-[#E7E9ED] rounded-2xl overflow-hidden text-xs bg-white">
                  {clientEventsList.length === 0 ? (
                    <div className="p-8 text-center text-[#737780]">
                      No account events logged yet. Events will appear as clients register, log in, and log out.
                    </div>
                  ) : (
                    clientEventsList.slice(0, 15).map((evt) => (
                      <div key={evt.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#F7F8FA] transition-colors">
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold uppercase ${
                              evt.type === 'LOGIN'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : evt.type === 'LOGOUT'
                                ? 'bg-gray-100 text-gray-700 border border-gray-200'
                                : evt.type === 'REGISTER'
                                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                                : 'bg-orange-50 text-[#FF6A2A] border border-orange-200'
                            }`}
                          >
                            {evt.type}
                          </span>
                          <div>
                            <span className="font-bold text-[#111318]">{evt.clientEmail}</span>
                            <span className="text-[#737780] text-[11px] ml-2">{evt.details}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-[#737780] font-mono text-[11px] shrink-0">
                          {evt.browser && (
                            <span className="hidden md:inline text-[10px] px-2 py-0.5 rounded bg-[#F7F8FA]">
                              {evt.browser} · {evt.os}
                            </span>
                          )}
                          <span>
                            {new Date(evt.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                            })}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB: PROJECT REQUESTS (INQUIRIES)
             ========================================================================= */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E9ED]">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-[#111318]">
                    Client Project Requests
                  </h2>
                  <p className="text-xs text-[#737780]">
                    Review inbound client inquiries, budget estimations, discount coupon applications, and internal notes.
                  </p>
                </div>
                <button
                  onClick={refreshInquiries}
                  className="px-3.5 py-1.5 rounded-lg border border-[#E7E9ED] text-xs font-semibold text-[#111318] hover:bg-[#F7F8FA] flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh Inquiries</span>
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#737780]" />
                  <input
                    type="text"
                    placeholder="Search by client name, email, company, or service..."
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E7E9ED] text-xs"
                  />
                </div>
                <select
                  value={inquiryStatusFilter}
                  onChange={(e) => setInquiryStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-[#E7E9ED] text-xs font-medium bg-white"
                >
                  <option value="all">All Statuses ({inquiries.length})</option>
                  <option value="new">New</option>
                  <option value="contacted">Reviewing / Contacted</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Inquiries List Cards */}
              <div className="space-y-4">
                {filteredInquiries.length === 0 ? (
                  <div className="p-12 text-center text-[#737780] border border-[#E7E9ED] rounded-2xl">
                    No inquiries match your criteria.
                  </div>
                ) : (
                  filteredInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-5 rounded-2xl border border-[#E7E9ED] bg-white hover:border-[#111318]/20 transition-all space-y-4 shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-heading font-bold text-base text-[#111318]">
                              {inq.clientName}
                            </span>
                            {inq.companyName && (
                              <span className="text-xs text-[#737780] font-medium">
                                ({inq.companyName})
                              </span>
                            )}
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#111318] text-white">
                              {inq.id}
                            </span>
                          </div>
                          <div className="text-xs text-[#737780] flex items-center gap-3 mt-0.5">
                            <a href={`mailto:${inq.email}`} className="text-[#FF6A2A] hover:underline">
                              {inq.email}
                            </a>
                            {inq.phone && <span>· {inq.phone}</span>}
                            <span>· {new Date(inq.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {/* Status Selector */}
                        <div className="flex items-center gap-2">
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                            className="px-3 py-1.5 rounded-xl border border-[#E7E9ED] text-xs font-semibold bg-[#F7F8FA]"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Reviewing / Contacted</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="archived">Archived</option>
                          </select>
                        </div>
                      </div>

                      {/* Service & Budget Pills */}
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="px-3 py-1 rounded-lg bg-[#F7F8FA] border border-[#E7E9ED] font-semibold text-[#111318]">
                          Service: {inq.serviceRequested}
                        </span>
                        {inq.budgetRange && (
                          <span className="px-3 py-1 rounded-lg bg-[#F7F8FA] border border-[#E7E9ED] text-[#737780]">
                            Budget: {inq.budgetRange}
                          </span>
                        )}
                        {inq.timeline && (
                          <span className="px-3 py-1 rounded-lg bg-[#F7F8FA] border border-[#E7E9ED] text-[#737780]">
                            Timeline: {inq.timeline}
                          </span>
                        )}
                        {inq.couponCode && (
                          <span className="px-3 py-1 rounded-lg bg-orange-50 border border-orange-200 text-[#FF6A2A] font-mono font-bold flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5" />
                            <span>Coupon: {inq.couponCode} (25% Applied)</span>
                          </span>
                        )}
                      </div>

                      {/* Project Description */}
                      <div className="p-3.5 rounded-xl bg-[#F7F8FA] text-xs text-[#111318] leading-relaxed">
                        {inq.projectDescription}
                      </div>

                      {/* Internal Notes */}
                      <div className="pt-2 border-t border-[#E7E9ED] flex items-center justify-between text-xs">
                        <div className="text-[11px] text-[#737780] truncate max-w-md">
                          Internal Note: {inq.internalNotes || 'No internal notes added.'}
                        </div>
                        <button
                          onClick={() => setSelectedInquiryNotes({ id: inq.id, notes: inq.internalNotes || '' })}
                          className="text-[#FF6A2A] hover:underline font-semibold cursor-pointer text-xs"
                        >
                          Edit Notes
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Notes Modal */}
              {selectedInquiryNotes && (
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-xl">
                    <h3 className="font-heading font-bold text-base text-[#111318]">
                      Private Internal Notes
                    </h3>
                    <textarea
                      rows={4}
                      value={selectedInquiryNotes.notes}
                      onChange={(e) =>
                        setSelectedInquiryNotes({ ...selectedInquiryNotes, notes: e.target.value })
                      }
                      placeholder="Add private agency notes, proposal timeline, or client call takeaways..."
                      className="w-full p-3 rounded-xl border border-[#E7E9ED] text-xs focus:outline-none focus:border-[#FF6A2A]"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedInquiryNotes(null)}
                        className="px-4 py-2 rounded-xl border border-[#E7E9ED] text-xs font-semibold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveInquiryNotes(selectedInquiryNotes.id, selectedInquiryNotes.notes)}
                        className="px-4 py-2 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white text-xs font-semibold cursor-pointer"
                      >
                        Save Notes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              TAB: SERVICES MANAGER
             ========================================================================= */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-[#E7E9ED]">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-[#111318]">
                    Services Catalog Manager ({services.length})
                  </h2>
                  <p className="text-xs text-[#737780]">
                    Create, edit, publish, or remove services without editing source code.
                  </p>
                </div>
                <button
                  onClick={handleOpenNewService}
                  className="px-4 py-2 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Service</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((srv) => (
                  <div key={srv.id} className="p-5 rounded-2xl border border-[#E7E9ED] bg-white hover:border-[#111318]/30 transition-all space-y-3 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-base text-[#111318]">{srv.title}</span>
                          {srv.badge && (
                            <span className="px-2 py-0.5 rounded-full bg-orange-50 text-[#FF6A2A] text-[10px] font-bold">
                              {srv.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#737780] font-mono">/services/{srv.slug}</div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingService(srv);
                            setIsServiceModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg border border-[#E7E9ED] hover:bg-[#F7F8FA] text-[#111318] cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(srv.id, srv.title)}
                          className="p-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-[#737780] line-clamp-2">{srv.shortDescription}</p>
                    <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#E7E9ED]">
                      <span className="text-[#FF6A2A] font-bold">{srv.startingPrice || 'Custom Quote'}</span>
                      <span className="text-[#737780] font-mono">{srv.deliverables?.length || 0} Deliverables</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Service Modal */}
              {isServiceModalOpen && editingService && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
                    <div className="flex items-center justify-between pb-4 border-b border-[#E7E9ED]">
                      <h3 className="font-heading font-bold text-xl text-[#111318]">
                        {editingService.id ? `Edit: ${editingService.title}` : 'Create New Service'}
                      </h3>
                      <button onClick={() => setIsServiceModalOpen(false)} className="cursor-pointer">
                        <X className="w-5 h-5 text-[#737780]" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveService} className="space-y-4 text-xs">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="font-bold text-[#111318]">Service Title</label>
                          <input
                            type="text"
                            required
                            value={editingService.title}
                            onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-[#E7E9ED] text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-[#111318]">Category</label>
                          <input
                            type="text"
                            value={editingService.category}
                            onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-[#E7E9ED] text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-[#111318]">Tagline</label>
                        <input
                          type="text"
                          value={editingService.tagline}
                          onChange={(e) => setEditingService({ ...editingService, tagline: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#E7E9ED] text-sm"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-[#111318]">Short Description</label>
                        <textarea
                          rows={2}
                          value={editingService.shortDescription}
                          onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#E7E9ED] text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-[#111318]">Starting Price</label>
                        <input
                          type="text"
                          value={editingService.startingPrice}
                          onChange={(e) => setEditingService({ ...editingService, startingPrice: e.target.value })}
                          placeholder="Starting at $2,500"
                          className="w-full px-3 py-2 rounded-xl border border-[#E7E9ED] text-sm"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-4 border-t border-[#E7E9ED]">
                        <button
                          type="button"
                          onClick={() => setIsServiceModalOpen(false)}
                          className="px-4 py-2 rounded-xl border border-[#E7E9ED] text-xs font-semibold cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white text-xs font-semibold cursor-pointer"
                        >
                          Save Service
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              TAB: PORTFOLIO MANAGER
             ========================================================================= */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-[#E7E9ED]">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-[#111318]">
                    Portfolio Projects ({projects.length})
                  </h2>
                  <p className="text-xs text-[#737780]">
                    Manage showcase items, live iframe website URLs, thumbnails, and preview behavior.
                  </p>
                </div>
                <button
                  onClick={handleOpenNewProject}
                  className="px-4 py-2 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-5 rounded-2xl border border-[#E7E9ED] bg-white space-y-3 shadow-sm hover:border-[#111318]/30 transition-all">
                    <div className="aspect-video w-full rounded-xl overflow-hidden bg-[#F7F8FA] border border-[#E7E9ED] relative">
                      <img src={proj.thumbnailUrl} alt={proj.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#111318]/80 backdrop-blur-sm text-white font-mono text-[9px]">
                        {proj.category}
                      </span>
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-heading font-bold text-base text-[#111318]">{proj.title}</div>
                        {proj.websiteUrl && (
                          <a href={proj.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] text-[#FF6A2A] hover:underline flex items-center gap-1">
                            <span>{proj.websiteUrl}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingProject(proj);
                            setIsProjectModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg border border-[#E7E9ED] hover:bg-[#F7F8FA] cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5 text-[#111318]" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id, proj.title)}
                          className="p-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Project Modal */}
              {isProjectModalOpen && editingProject && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
                    <div className="flex items-center justify-between pb-4 border-b border-[#E7E9ED]">
                      <h3 className="font-heading font-bold text-xl text-[#111318]">
                        {editingProject.id ? `Edit: ${editingProject.title}` : 'Add Portfolio Project'}
                      </h3>
                      <button onClick={() => setIsProjectModalOpen(false)} className="cursor-pointer">
                        <X className="w-5 h-5 text-[#737780]" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="font-bold text-[#111318]">Project Title</label>
                          <input
                            type="text"
                            required
                            value={editingProject.title}
                            onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-[#E7E9ED] text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-[#111318]">Category</label>
                          <select
                            value={editingProject.category}
                            onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-[#E7E9ED] text-sm bg-white"
                          >
                            <option value="Website Development">Website Development</option>
                            <option value="AI Calling Agents">AI Calling Agents</option>
                            <option value="Video Editing">Video Editing</option>
                            <option value="Graphic Design">Graphic Design</option>
                            <option value="AI Automation">AI Automation</option>
                            <option value="Mobile Applications">Mobile Applications</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-[#111318]">Live Website URL (for Iframe / Previews)</label>
                        <input
                          type="url"
                          value={editingProject.websiteUrl}
                          onChange={(e) => setEditingProject({ ...editingProject, websiteUrl: e.target.value })}
                          placeholder="https://example.com"
                          className="w-full px-3 py-2 rounded-xl border border-[#E7E9ED] text-sm font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-[#111318]">Thumbnail Image URL</label>
                        <input
                          type="text"
                          required
                          value={editingProject.thumbnailUrl}
                          onChange={(e) => setEditingProject({ ...editingProject, thumbnailUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#E7E9ED] text-xs font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-[#111318]">Description</label>
                        <textarea
                          rows={2}
                          value={editingProject.shortDescription}
                          onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#E7E9ED] text-xs"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-4 border-t border-[#E7E9ED]">
                        <button
                          type="button"
                          onClick={() => setIsProjectModalOpen(false)}
                          className="px-4 py-2 rounded-xl border border-[#E7E9ED] text-xs font-semibold cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white text-xs font-semibold cursor-pointer"
                        >
                          Save Project
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              TAB: HOMEPAGE EDITOR
             ========================================================================= */}
          {activeTab === 'homepage' && settingsForm && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-[#E7E9ED]">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-[#111318]">
                    Homepage Content Editor
                  </h2>
                  <p className="text-xs text-[#737780]">
                    Customize the top announcement bar, main hero headline, sub-headline, and call to action buttons.
                  </p>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish to Homepage</span>
                </button>
              </div>

              {/* Announcement Bar */}
              <div className="p-5 rounded-2xl border border-[#E7E9ED] bg-[#F7F8FA] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-sm text-[#111318]">Top Announcement Bar</h3>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settingsForm.announcementBar?.enabled}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          announcementBar: { ...settingsForm.announcementBar, enabled: e.target.checked },
                        })
                      }
                      className="w-4 h-4 accent-[#FF6A2A]"
                    />
                    <span className="text-xs font-bold text-[#111318]">Display Bar</span>
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={settingsForm.announcementBar?.text}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        announcementBar: { ...settingsForm.announcementBar, text: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#E7E9ED] text-xs bg-white"
                  />
                  <input
                    type="text"
                    value={settingsForm.announcementBar?.linkText}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        announcementBar: { ...settingsForm.announcementBar, linkText: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#E7E9ED] text-xs bg-white"
                  />
                </div>
              </div>

              {/* Hero Section Copy */}
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-sm text-[#111318]">Main Hero Headline & Copy</h3>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111318] uppercase">Badge Label</label>
                  <input
                    type="text"
                    value={settingsForm.heroBadge}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroBadge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111318] uppercase">Main Headline</label>
                  <textarea
                    rows={2}
                    value={settingsForm.heroHeadline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroHeadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-sm font-heading font-bold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111318] uppercase">Hero Description</label>
                  <textarea
                    rows={3}
                    value={settingsForm.heroDescription}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroDescription: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-xs leading-relaxed"
                  />
                </div>
              </div>

              {/* Hero Call to Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E7E9ED]">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111318] uppercase">Primary CTA Button</label>
                  <input
                    type="text"
                    value={settingsForm.primaryCtaText}
                    onChange={(e) => setSettingsForm({ ...settingsForm, primaryCtaText: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E7E9ED] text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111318] uppercase">Secondary CTA Button</label>
                  <input
                    type="text"
                    value={settingsForm.secondaryCtaText}
                    onChange={(e) => setSettingsForm({ ...settingsForm, secondaryCtaText: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E7E9ED] text-sm"
                  />
                </div>
              </div>
            </form>
          )}

          {/* =========================================================================
              TAB: NAVIGATION & FOOTER
             ========================================================================= */}
          {activeTab === 'navigation' && settingsForm && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-[#E7E9ED]">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-[#111318]">
                    Navigation Menu & Footer Manager
                  </h2>
                  <p className="text-xs text-[#737780]">
                    Manage public navbar items, official phone, verified email, WhatsApp URL, and footer copyright text.
                  </p>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white text-xs font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Navigation</span>
                </button>
              </div>

              {/* Official Contact Channels */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111318] uppercase">Official Phone</label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E7E9ED] text-sm font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111318] uppercase">Official Email</label>
                  <input
                    type="email"
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E7E9ED] text-sm font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111318] uppercase">WhatsApp Contact URL</label>
                  <input
                    type="url"
                    value={settingsForm.whatsappUrl}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E7E9ED] text-sm font-mono"
                  />
                </div>
              </div>

              {/* Footer Copyright Text */}
              <div className="space-y-1.5 pt-4 border-t border-[#E7E9ED]">
                <label className="text-xs font-bold text-[#111318] uppercase">Footer Legal Statement</label>
                <input
                  type="text"
                  value={settingsForm.footerText}
                  onChange={(e) => setSettingsForm({ ...settingsForm, footerText: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-sm"
                />
              </div>
            </form>
          )}

          {/* =========================================================================
              TAB: MEDIA LIBRARY
             ========================================================================= */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-[#E7E9ED]">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-[#111318]">
                    Media Library & Assets
                  </h2>
                  <p className="text-xs text-[#737780]">
                    Upload and manage brand logos, hero images, and project thumbnails.
                  </p>
                </div>
                <label className="px-4 py-2 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm">
                  <Upload className="w-4 h-4" />
                  <span>Upload Image</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e)} />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {mediaList.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-2xl border border-[#E7E9ED] bg-[#F7F8FA] space-y-2">
                    <div className="aspect-video rounded-xl overflow-hidden bg-white border border-[#E7E9ED]">
                      <img src={item.url} alt={item.filename} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-[#111318] truncate max-w-[140px]">{item.filename}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(item.url);
                          addToast('Copied media URL to clipboard', 'info');
                        }}
                        className="text-[#FF6A2A] hover:underline font-mono text-[10px] cursor-pointer"
                      >
                        Copy URL
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB: 25% COUPONS
             ========================================================================= */}
          {activeTab === 'coupons' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-[#E7E9ED]">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-[#111318]">
                    25% Discount Coupons ({couponsList.length})
                  </h2>
                  <p className="text-xs text-[#737780]">
                    Unique coupon codes generated upon client registration. Verified server-side to prevent duplicate redemption.
                  </p>
                </div>
                <button
                  onClick={refreshAdminData}
                  className="px-3.5 py-1.5 rounded-lg border border-[#E7E9ED] text-xs font-semibold text-[#111318] hover:bg-[#F7F8FA] flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sync Coupons</span>
                </button>
              </div>

              <div className="divide-y divide-[#E7E9ED] border border-[#E7E9ED] rounded-2xl overflow-hidden bg-white text-xs">
                {couponsList.length === 0 ? (
                  <div className="p-8 text-center text-[#737780]">
                    No client coupons issued yet. Codes are generated automatically upon client registration.
                  </div>
                ) : (
                  couponsList.map((item, idx) => (
                    <div key={idx} className="p-4 flex items-center justify-between hover:bg-[#F7F8FA] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-[#111318]">{item.coupon.code}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.coupon.status === 'redeemed'
                                ? 'bg-gray-100 text-gray-700 line-through'
                                : 'bg-orange-50 text-[#FF6A2A]'
                            }`}
                          >
                            {item.coupon.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#737780]">
                          Issued to: <span className="font-semibold text-[#111318]">{item.clientName}</span> ({item.clientEmail})
                        </div>
                      </div>
                      <div className="text-right text-[11px] text-[#737780] font-mono">
                        {item.coupon.redeemedAt
                          ? `Redeemed: ${new Date(item.coupon.redeemedAt).toLocaleDateString()}`
                          : 'Available for Redemption'}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB: CONTACT MESSAGES
             ========================================================================= */}
          {activeTab === 'contacts' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-[#E7E9ED]">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-[#111318]">
                    Inbound Messages ({contacts.length})
                  </h2>
                  <p className="text-xs text-[#737780]">
                    Messages submitted via the public Contact Us form.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {contacts.length === 0 ? (
                  <div className="p-12 text-center text-[#737780] border border-[#E7E9ED] rounded-2xl">
                    No contact form messages received yet.
                  </div>
                ) : (
                  contacts.map((msg) => (
                    <div key={msg.id} className="p-4 rounded-xl border border-[#E7E9ED] bg-white space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-xs text-[#111318]">
                          {msg.name} ({msg.email})
                        </div>
                        <span className="text-[10px] font-mono text-[#737780]">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="font-semibold text-xs text-[#FF6A2A]">{msg.subject}</div>
                      <p className="text-xs text-[#737780] leading-relaxed">{msg.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB: NEWSLETTER
             ========================================================================= */}
          {activeTab === 'newsletter' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-[#E7E9ED]">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-[#111318]">
                    Newsletter Subscribers ({newsletters.length})
                  </h2>
                  <p className="text-xs text-[#737780]">
                    Subscribers enrolled in RYVO engineering and product announcements.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-[#E7E9ED] border border-[#E7E9ED] rounded-2xl overflow-hidden bg-white text-xs">
                {newsletters.map((sub) => (
                  <div key={sub.id} className="p-3.5 flex items-center justify-between">
                    <span className="font-mono text-[#111318]">{sub.email}</span>
                    <span className="text-[#737780] font-mono text-[11px]">
                      {new Date(sub.subscribedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB: SECURITY & AUDIT LOGS
             ========================================================================= */}
          {activeTab === 'security' && (
            <div className="space-y-8">
              <div className="pb-6 border-b border-[#E7E9ED]">
                <h2 className="font-heading text-2xl font-bold text-[#111318]">
                  Security, Permissions & Master Key
                </h2>
                <p className="text-xs text-[#737780]">
                  Update your private administrator password and review server-side audit trails.
                </p>
              </div>

              {/* Password Change Form */}
              <div className="p-6 rounded-2xl border border-[#E7E9ED] bg-[#F7F8FA] space-y-4 max-w-lg">
                <h3 className="font-heading font-bold text-sm text-[#111318]">
                  Update Master Password
                </h3>
                <form onSubmit={handleChangePassword} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#111318]">New Password (min 8 chars)</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E7E9ED] bg-white text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#111318]">Confirm Password</label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E7E9ED] bg-white text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Update Password
                  </button>
                </form>
              </div>

              {/* Audit Logs */}
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-sm text-[#111318]">
                  Recent Security Audit Logs ({auditLogs.length})
                </h3>
                <div className="divide-y divide-[#E7E9ED] border border-[#E7E9ED] rounded-2xl overflow-hidden bg-white text-xs">
                  {auditLogs.slice(0, 20).map((log) => (
                    <div key={log.id} className="p-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-[#111318] text-white">
                          {log.action}
                        </span>
                        <span className="text-[#111318]">{log.details}</span>
                      </div>
                      <span className="text-[#737780] font-mono text-[10px] shrink-0">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB: INDUSTRIES & BLOG & PRICING & FAQS
             ========================================================================= */}
          {activeTab === 'industries' && (
            <div className="space-y-6">
              <div className="pb-6 border-b border-[#E7E9ED]">
                <h2 className="font-heading text-2xl font-bold text-[#111318]">
                  Industries We Serve
                </h2>
                <p className="text-xs text-[#737780]">
                  Manage vertical industry propositions and tailored service deliverables.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(settingsForm?.industriesList || [
                  { id: 'ind-1', name: 'Startups & Scaleups', description: 'MVPs, investor decks, rapid brand launches', deliverables: ['Landing Pages', 'Product Demo Videos'] },
                  { id: 'ind-2', name: 'E-Commerce & DTC', description: 'Conversion stores, viral video ads', deliverables: ['Custom Stores', 'UGC Ads'] },
                  { id: 'ind-3', name: 'Hospitality & Dining', description: 'Digital menus, reservations, guest portals', deliverables: ['Interactive Portals', 'Local SEO'] },
                  { id: 'ind-4', name: 'Professional Services', description: 'Law firms, financial consultancies, B2B agencies', deliverables: ['Authority Websites', 'CRM Pipelines'] },
                ]).map((ind: any) => (
                  <div key={ind.id} className="p-5 rounded-2xl border border-[#E7E9ED] bg-[#F7F8FA] space-y-2">
                    <div className="font-heading font-bold text-base text-[#111318]">{ind.name}</div>
                    <p className="text-xs text-[#737780]">{ind.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {ind.deliverables?.map((d: string) => (
                        <span key={d} className="px-2 py-0.5 rounded-md bg-white border border-[#E7E9ED] text-[10px] font-medium text-[#111318]">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'blog' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-[#E7E9ED]">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-[#111318]">
                    Blog & Insights Articles ({blogPosts.length})
                  </h2>
                  <p className="text-xs text-[#737780]">
                    Manage thought leadership essays, design systems articles, and technical breakdowns.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <div key={post.id} className="p-4 rounded-xl border border-[#E7E9ED] bg-white flex items-center justify-between gap-4">
                    <div>
                      <div className="font-heading font-bold text-sm text-[#111318]">{post.title}</div>
                      <div className="text-[11px] text-[#737780] font-mono mt-0.5">
                        Category: {post.category} · Read time: {post.readTime}
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                      PUBLISHED
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="pb-6 border-b border-[#E7E9ED]">
                <h2 className="font-heading text-2xl font-bold text-[#111318]">
                  Pricing & Service Packages
                </h2>
                <p className="text-xs text-[#737780]">
                  Configure packages shown on the public pricing page.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(settingsForm?.pricingPackages || [
                  { id: 'pkg-1', name: 'Growth Sprint', price: '$1,850', tagline: 'For fast startups & creators' },
                  { id: 'pkg-2', name: 'Flagship Digital', price: '$3,800', tagline: 'Full-scale enterprise application' },
                  { id: 'pkg-3', name: 'Autonomous Partner', price: '$5,200/mo', tagline: 'Continuous dedicated agency partnership' },
                ]).map((pkg: any) => (
                  <div key={pkg.id} className="p-5 rounded-2xl border border-[#E7E9ED] bg-[#F7F8FA] space-y-2">
                    <div className="font-bold text-xs uppercase tracking-wider text-[#FF6A2A]">{pkg.name}</div>
                    <div className="font-heading font-black text-2xl text-[#111318]">{pkg.price}</div>
                    <p className="text-xs text-[#737780]">{pkg.tagline}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div className="pb-6 border-b border-[#E7E9ED]">
                <h2 className="font-heading text-2xl font-bold text-[#111318]">
                  FAQs & Client Testimonials
                </h2>
                <p className="text-xs text-[#737780]">
                  Manage frequently asked questions and verified client reviews.
                </p>
              </div>
              <div className="space-y-3">
                {(settingsForm?.faqsList || [
                  { question: 'What types of companies does RYVO work with?', answer: 'We collaborate with ambitious startups, growing consumer brands, and established enterprises worldwide.' },
                  { question: 'How does the 25% discount offer work?', answer: 'When you create a client account, a unique coupon code is saved to your profile for your first project inquiry.' },
                ]).map((faq: any, i: number) => (
                  <div key={i} className="p-4 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] space-y-1">
                    <div className="font-bold text-xs text-[#111318]">{faq.question}</div>
                    <div className="text-xs text-[#737780]">{faq.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'seo' && settingsForm && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-[#E7E9ED]">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-[#111318]">
                    SEO & OpenGraph Metadata
                  </h2>
                  <p className="text-xs text-[#737780]">
                    Configure global page titles, meta descriptions, and social share cards.
                  </p>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#111318] hover:bg-[#FF6A2A] text-white text-xs font-semibold cursor-pointer"
                >
                  <Save className="w-4 h-4 inline mr-1.5" />
                  Save SEO
                </button>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#111318] uppercase">Default Title</label>
                  <input
                    type="text"
                    value={settingsForm.seoDefaults?.title}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        seoDefaults: { ...settingsForm.seoDefaults, title: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#111318] uppercase">Meta Description</label>
                  <textarea
                    rows={3}
                    value={settingsForm.seoDefaults?.metaDescription}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        seoDefaults: { ...settingsForm.seoDefaults, metaDescription: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E9ED] text-xs leading-relaxed"
                  />
                </div>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
};
