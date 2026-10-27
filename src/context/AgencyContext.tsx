import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  ClientAccount,
  DiscoveryBooking,
} from '../types';
import { api } from '../lib/api';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ActiveRoute {
  path: string;
  params: Record<string, string>;
}

interface AgencyContextType {
  settings: WebsiteSettings | null;
  services: ServiceItem[];
  projects: PortfolioProject[];
  inquiries: ClientInquiry[];
  contacts: ContactMessage[];
  newsletters: NewsletterSubscriber[];
  blogPosts: BlogPost[];
  analytics: AnalyticsSummary | null;
  auditLogs: AuditLog[];
  isLoading: boolean;
  adminUser: { email: string; token: string } | null;
  clientUser: ClientAccount | null;
  activeRoute: ActiveRoute;
  navigate: (path: string, params?: Record<string, string>) => void;
  refreshData: () => Promise<void>;
  refreshSettings: () => Promise<void>;
  refreshServices: () => Promise<void>;
  refreshProjects: () => Promise<void>;
  refreshInquiries: () => Promise<void>;
  refreshBlogPosts: () => Promise<void>;
  refreshClientProfile: () => Promise<void>;
  adminLogin: (email: string, pass: string) => Promise<void>;
  adminLogout: () => Promise<void>;
  clientLogin: (email: string, pass: string) => Promise<void>;
  clientRegister: (name: string, email: string, pass: string, company?: string, phone?: string) => Promise<void>;
  clientLogout: () => void;
  restoreDefaultSettings: () => Promise<void>;
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  // Modals & Intro
  isPreviewIntroOpen: boolean;
  setPreviewIntroOpen: (open: boolean) => void;
  isStartProjectOpen: boolean;
  setStartProjectOpen: (open: boolean) => void;
  activePreviewProject: PortfolioProject | null;
  setActivePreviewProject: (project: PortfolioProject | null) => void;
  activeVideo: { url: string; title: string } | null;
  setActiveVideo: (video: { url: string; title: string } | null) => void;
  activeLightbox: { images: string[]; title: string; initialIndex?: number } | null;
  setActiveLightbox: (lightbox: { images: string[]; title: string; initialIndex?: number } | null) => void;
}

const AgencyContext = createContext<AgencyContextType | undefined>(undefined);

export const AgencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [inquiries, setInquiries] = useState<ClientInquiry[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [newsletters, setNewsletters] = useState<NewsletterSubscriber[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [adminUser, setAdminUser] = useState<{ email: string; token: string } | null>(() => {
    const token = localStorage.getItem('ryvo_admin_token');
    const email = localStorage.getItem('ryvo_admin_email');
    return token && email ? { token, email } : null;
  });

  const [clientUser, setClientUser] = useState<ClientAccount | null>(() => {
    const saved = localStorage.getItem('ryvo_client_data');
    return saved ? JSON.parse(saved) : null;
  });

  // Client-side router path state
  const parseCurrentUrl = (): ActiveRoute => {
    const path = window.location.pathname || '/';
    const params: Record<string, string> = {};
    const search = new URLSearchParams(window.location.search);
    search.forEach((val, key) => {
      params[key] = val;
    });
    return { path, params };
  };

  const [activeRoute, setActiveRoute] = useState<ActiveRoute>(parseCurrentUrl);

  const navigate = useCallback((path: string, params?: Record<string, string>) => {
    let url = path;
    if (params && Object.keys(params).length > 0) {
      const q = new URLSearchParams(params).toString();
      url = `${path}?${q}`;
    }
    window.history.pushState({}, '', url);
    setActiveRoute({ path, params: params || {} });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    api.trackView(path);
  }, []);

  // Listen to popstate
  useEffect(() => {
    const handlePopState = () => {
      setActiveRoute(parseCurrentUrl());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);
  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Modals & Cinematic Intro
  const [isPreviewIntroOpen, setPreviewIntroOpen] = useState(false);
  const [isStartProjectOpen, setStartProjectOpen] = useState(false);
  const [activePreviewProject, setActivePreviewProject] = useState<PortfolioProject | null>(null);
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
  const [activeLightbox, setActiveLightbox] = useState<{ images: string[]; title: string; initialIndex?: number } | null>(null);

  // Restore factory defaults
  const restoreDefaultSettings = useCallback(async () => {
    try {
      const res = await api.restoreDefaultSettings();
      setSettings(res);
      addToast('Restored website settings to defaults', 'success');
    } catch (err: any) {
      addToast(err.message || 'Failed to restore settings', 'error');
    }
  }, [addToast]);

  // Data fetching
  const refreshSettings = useCallback(async () => {
    try {
      const data = await api.getSettings();
      setSettings(data);
    } catch (e) {
      console.warn('Failed loading settings:', e);
    }
  }, []);

  const refreshServices = useCallback(async () => {
    try {
      const data = await api.getServices(adminUser !== null);
      setServices(data);
    } catch (e) {
      console.warn('Failed loading services:', e);
    }
  }, [adminUser]);

  const refreshProjects = useCallback(async () => {
    try {
      const data = await api.getProjects(adminUser !== null);
      setProjects(data);
    } catch (e) {
      console.warn('Failed loading projects:', e);
    }
  }, [adminUser]);

  const refreshBlogPosts = useCallback(async () => {
    try {
      const data = await api.getBlogPosts(adminUser !== null);
      setBlogPosts(data);
    } catch (e) {
      console.warn('Failed loading blog posts:', e);
    }
  }, [adminUser]);

  const refreshInquiries = useCallback(async () => {
    if (!adminUser) return;
    try {
      const data = await api.getInquiries();
      setInquiries(data);
    } catch (e) {
      console.warn('Failed loading inquiries:', e);
    }
  }, [adminUser]);

  const refreshClientProfile = useCallback(async () => {
    const token = localStorage.getItem('ryvo_client_token');
    if (!token) return;
    try {
      const profile = await api.getClientProfile();
      setClientUser(profile);
      localStorage.setItem('ryvo_client_data', JSON.stringify(profile));
    } catch {
      localStorage.removeItem('ryvo_client_token');
      localStorage.removeItem('ryvo_client_data');
      setClientUser(null);
    }
  }, []);

  const refreshAdminExtra = useCallback(async () => {
    if (!adminUser) return;
    try {
      const [cnts, subs, anlt, logs] = await Promise.allSettled([
        api.getContacts(),
        api.getNewsletters(),
        api.getAnalytics(),
        api.getAuditLogs(),
      ]);
      if (cnts.status === 'fulfilled') setContacts(cnts.value);
      if (subs.status === 'fulfilled') setNewsletters(subs.value);
      if (anlt.status === 'fulfilled') setAnalytics(anlt.value);
      if (logs.status === 'fulfilled') setAuditLogs(logs.value);
    } catch (e) {
      console.warn('Failed loading admin extra:', e);
    }
  }, [adminUser]);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    await Promise.allSettled([refreshSettings(), refreshServices(), refreshProjects(), refreshBlogPosts()]);
    if (adminUser) {
      await Promise.allSettled([refreshInquiries(), refreshAdminExtra()]);
    }
    if (localStorage.getItem('ryvo_client_token')) {
      await refreshClientProfile();
    }
    setIsLoading(false);
  }, [refreshSettings, refreshServices, refreshProjects, refreshBlogPosts, refreshInquiries, refreshAdminExtra, refreshClientProfile, adminUser]);

  useEffect(() => {
    refreshData();
    api.trackView(window.location.pathname || '/');
  }, [refreshData]);

  // Admin Auth
  const adminLogin = async (email: string, pass: string) => {
    const res = await api.adminLogin(email, pass);
    localStorage.setItem('ryvo_admin_token', res.token);
    localStorage.setItem('ryvo_admin_email', res.email);
    setAdminUser({ token: res.token, email: res.email });
    addToast('Authenticated as Administrator', 'success');
    await refreshData();
  };

  const adminLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminUser?.token || ''}` },
      });
    } catch {
      // ignore
    }
    localStorage.removeItem('ryvo_admin_token');
    localStorage.removeItem('ryvo_admin_email');
    setAdminUser(null);
    addToast('Signed out of admin portal', 'info');
  };

  // Client Auth
  const clientLogin = async (email: string, pass: string) => {
    const res = await api.clientLogin(email, pass);
    localStorage.setItem('ryvo_client_token', res.token);
    localStorage.setItem('ryvo_client_data', JSON.stringify(res.client));
    setClientUser(res.client);
    addToast(`Welcome back, ${res.client.name}`, 'success');
    navigate('/client/portal');
  };

  const clientRegister = async (name: string, email: string, pass: string, company?: string, phone?: string) => {
    const res = await api.clientRegister(name, email, pass, company, phone);
    localStorage.setItem('ryvo_client_token', res.token);
    localStorage.setItem('ryvo_client_data', JSON.stringify(res.client));
    setClientUser(res.client);
    addToast(`Account created. Welcome to RYVO Client Portal!`, 'success');
    navigate('/client/portal');
  };

  const clientLogout = () => {
    const currentEmail = clientUser?.email;
    if (currentEmail) {
      api.clientLogout(currentEmail);
    }
    localStorage.removeItem('ryvo_client_token');
    localStorage.removeItem('ryvo_client_data');
    setClientUser(null);
    addToast('Signed out of client portal', 'info');
    navigate('/');
  };

  return (
    <AgencyContext.Provider
      value={{
        settings,
        services,
        projects,
        inquiries,
        contacts,
        newsletters,
        blogPosts,
        analytics,
        auditLogs,
        isLoading,
        adminUser,
        clientUser,
        activeRoute,
        navigate,
        refreshData,
        refreshSettings,
        refreshServices,
        refreshProjects,
        refreshInquiries,
        refreshBlogPosts,
        refreshClientProfile,
        adminLogin,
        adminLogout,
        clientLogin,
        clientRegister,
        clientLogout,
        restoreDefaultSettings,
        toasts,
        addToast,
        removeToast,
        isPreviewIntroOpen,
        setPreviewIntroOpen,
        isStartProjectOpen,
        setStartProjectOpen,
        activePreviewProject,
        setActivePreviewProject,
        activeVideo,
        setActiveVideo,
        activeLightbox,
        setActiveLightbox,
      }}
    >
      {children}
    </AgencyContext.Provider>
  );
};

export const useAgency = () => {
  const ctx = useContext(AgencyContext);
  if (!ctx) throw new Error('useAgency must be used within AgencyProvider');
  return ctx;
};
