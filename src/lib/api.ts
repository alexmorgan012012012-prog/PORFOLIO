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

const API_BASE = '/api';

function getAdminAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('ryvo_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function getClientAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('ryvo_client_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  // --- SETTINGS ---
  async getSettings(): Promise<WebsiteSettings> {
    const res = await fetch(`${API_BASE}/settings`);
    if (!res.ok) throw new Error('Failed to fetch settings');
    return res.json();
  },

  async updateSettings(settings: Partial<WebsiteSettings>): Promise<WebsiteSettings> {
    const res = await fetch(`${API_BASE}/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAdminAuthHeader(),
      },
      body: JSON.stringify(settings),
    });
    if (!res.ok) throw new Error('Failed to update settings');
    return res.json();
  },

  async restoreDefaultSettings(): Promise<WebsiteSettings> {
    const res = await fetch(`${API_BASE}/settings/restore-defaults`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAdminAuthHeader(),
      },
    });
    if (!res.ok) throw new Error('Failed to restore default settings');
    return res.json();
  },

  // --- SERVICES ---
  async getServices(admin = false): Promise<ServiceItem[]> {
    const res = await fetch(`${API_BASE}/services${admin ? '?admin=true' : ''}`);
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json();
  },

  async getServiceBySlug(slug: string): Promise<ServiceItem> {
    const res = await fetch(`${API_BASE}/services/${slug}`);
    if (!res.ok) throw new Error('Service not found');
    return res.json();
  },

  async createService(service: Omit<ServiceItem, 'id'>): Promise<ServiceItem> {
    const res = await fetch(`${API_BASE}/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAdminAuthHeader(),
      },
      body: JSON.stringify(service),
    });
    if (!res.ok) throw new Error('Failed to create service');
    return res.json();
  },

  async updateService(id: string, updates: Partial<ServiceItem>): Promise<ServiceItem> {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAdminAuthHeader(),
      },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update service');
    return res.json();
  },

  async deleteService(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'DELETE',
      headers: { ...getAdminAuthHeader() },
    });
    return res.ok;
  },

  // --- PROJECTS ---
  async getProjects(admin = false, category?: string): Promise<PortfolioProject[]> {
    const params = new URLSearchParams();
    if (admin) params.set('admin', 'true');
    if (category) params.set('category', category);
    const qs = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE}/projects${qs}`);
    if (!res.ok) throw new Error('Failed to fetch portfolio projects');
    return res.json();
  },

  async getProjectBySlug(slug: string): Promise<PortfolioProject> {
    const res = await fetch(`${API_BASE}/projects/${slug}`);
    if (!res.ok) throw new Error('Project not found');
    return res.json();
  },

  async createProject(project: Omit<PortfolioProject, 'id'>): Promise<PortfolioProject> {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAdminAuthHeader(),
      },
      body: JSON.stringify(project),
    });
    if (!res.ok) throw new Error('Failed to create project');
    return res.json();
  },

  async updateProject(id: string, updates: Partial<PortfolioProject>): Promise<PortfolioProject> {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAdminAuthHeader(),
      },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update project');
    return res.json();
  },

  async deleteProject(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
      headers: { ...getAdminAuthHeader() },
    });
    return res.ok;
  },

  // --- BLOG ---
  async getBlogPosts(admin = false): Promise<BlogPost[]> {
    const res = await fetch(`${API_BASE}/blog${admin ? '?admin=true' : ''}`);
    if (!res.ok) throw new Error('Failed to fetch blog articles');
    return res.json();
  },

  async getBlogPostBySlug(slug: string): Promise<BlogPost> {
    const res = await fetch(`${API_BASE}/blog/${slug}`);
    if (!res.ok) throw new Error('Article not found');
    return res.json();
  },

  async createBlogPost(post: Omit<BlogPost, 'id'>): Promise<BlogPost> {
    const res = await fetch(`${API_BASE}/blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAdminAuthHeader(),
      },
      body: JSON.stringify(post),
    });
    if (!res.ok) throw new Error('Failed to create article');
    return res.json();
  },

  async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    const res = await fetch(`${API_BASE}/blog/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAdminAuthHeader(),
      },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update article');
    return res.json();
  },

  async deleteBlogPost(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/blog/${id}`, {
      method: 'DELETE',
      headers: { ...getAdminAuthHeader() },
    });
    return res.ok;
  },

  // --- DISCOVERY BOOKINGS ---
  async bookDiscoveryCall(booking: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    date: string;
    timeSlot: string;
    serviceTopic: string;
    notes?: string;
  }): Promise<{ success: boolean; message: string; bookingId: string }> {
    const res = await fetch(`${API_BASE}/discovery-calls`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to book discovery session');
    }
    return res.json();
  },

  // --- CLIENT AUTH & PORTAL ---
  async clientRegister(name: string, email: string, password: string, company?: string, phone?: string): Promise<{ success: boolean; token: string; client: ClientAccount }> {
    const res = await fetch(`${API_BASE}/client/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, company, phone }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Client registration failed');
    }
    return res.json();
  },

  async clientLogin(email: string, password: string): Promise<{ success: boolean; token: string; client: ClientAccount }> {
    const res = await fetch(`${API_BASE}/client/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Client login failed');
    }
    return res.json();
  },

  async clientLogout(email?: string): Promise<void> {
    try {
      await fetch(`${API_BASE}/client/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getClientAuthHeader(),
        },
        body: JSON.stringify({ email }),
      });
    } catch {
      // non-blocking
    }
  },

  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/client/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Password reset request failed');
    }
    return res.json();
  },

  async getClientProfile(): Promise<ClientAccount> {
    const res = await fetch(`${API_BASE}/client/profile`, {
      headers: { ...getClientAuthHeader() },
    });
    if (!res.ok) throw new Error('Unauthorized or client not found');
    return res.json();
  },

  async sendClientMessage(text: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/client/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getClientAuthHeader(),
      },
      body: JSON.stringify({ text }),
    });
    return res.json();
  },

  // --- ADMIN CLIENTS MANAGEMENT ---
  async getClients(): Promise<any[]> {
    const res = await fetch(`${API_BASE}/admin/clients`, {
      headers: { ...getAdminAuthHeader() },
    });
    if (!res.ok) throw new Error('Failed to fetch clients');
    return res.json();
  },

  async getClientDetails(id: string): Promise<any> {
    const res = await fetch(`${API_BASE}/admin/clients/${id}`, {
      headers: { ...getAdminAuthHeader() },
    });
    if (!res.ok) throw new Error('Failed to fetch client details');
    return res.json();
  },

  async updateClientStatus(id: string, status: 'active' | 'suspended'): Promise<void> {
    const res = await fetch(`${API_BASE}/admin/clients/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAdminAuthHeader(),
      },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update client status');
  },

  async getClientEvents(): Promise<any[]> {
    const res = await fetch(`${API_BASE}/admin/client-events`, {
      headers: { ...getAdminAuthHeader() },
    });
    if (!res.ok) throw new Error('Failed to fetch client activity events');
    return res.json();
  },

  // --- INQUIRIES ---
  async getInquiries(): Promise<ClientInquiry[]> {
    const res = await fetch(`${API_BASE}/inquiries`, {
      headers: { ...getAdminAuthHeader() },
    });
    if (!res.ok) throw new Error('Failed to fetch inquiries');
    return res.json();
  },

  async submitInquiry(data: {
    clientName: string;
    email: string;
    phone?: string;
    companyName?: string;
    serviceRequested: string;
    projectDescription: string;
    budgetRange?: string;
    timeline?: string;
    referenceWebsite?: string;
    couponCode?: string;
    discountApplied?: boolean;
    discountPercent?: number;
    originalEstimate?: string;
    discountedEstimate?: string;
  }): Promise<{ success: boolean; message: string; inquiryId: string }> {
    const res = await fetch(`${API_BASE}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to submit inquiry');
    }
    return res.json();
  },

  // --- COUPON VALIDATION ---
  async validateCoupon(code: string, email?: string): Promise<{ valid: boolean; discountPercent: number; coupon?: any; error?: string }> {
    const res = await fetch(`${API_BASE}/coupon/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, email }),
    });
    const data = await res.json();
    if (!res.ok || !data.valid) {
      throw new Error(data.error || 'Invalid coupon code');
    }
    return data;
  },

  async getAdminCoupons(): Promise<{ clientName: string; clientEmail: string; coupon: any }[]> {
    const res = await fetch(`${API_BASE}/admin/coupons`, {
      headers: { ...getAdminAuthHeader() },
    });
    if (!res.ok) throw new Error('Failed to fetch coupons');
    return res.json();
  },

  async updateInquiry(id: string, updates: Partial<ClientInquiry>): Promise<ClientInquiry> {
    const res = await fetch(`${API_BASE}/inquiries/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAdminAuthHeader(),
      },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update inquiry');
    return res.json();
  },

  async deleteInquiry(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/inquiries/${id}`, {
      method: 'DELETE',
      headers: { ...getAdminAuthHeader() },
    });
    return res.ok;
  },

  // --- CONTACTS ---
  async getContacts(): Promise<ContactMessage[]> {
    const res = await fetch(`${API_BASE}/contacts`, {
      headers: { ...getAdminAuthHeader() },
    });
    if (!res.ok) throw new Error('Failed to fetch contact messages');
    return res.json();
  },

  async submitContact(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }): Promise<{ success: boolean; message: string; id: string }> {
    const res = await fetch(`${API_BASE}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to submit contact');
    }
    return res.json();
  },

  // --- NEWSLETTER ---
  async getNewsletters(): Promise<NewsletterSubscriber[]> {
    const res = await fetch(`${API_BASE}/newsletter`, {
      headers: { ...getAdminAuthHeader() },
    });
    if (!res.ok) throw new Error('Failed to fetch newsletter subscribers');
    return res.json();
  },

  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return res.json();
  },

  // --- ANALYTICS ---
  async getAnalytics(): Promise<AnalyticsSummary> {
    const res = await fetch(`${API_BASE}/analytics`);
    if (!res.ok) throw new Error('Failed to fetch analytics');
    return res.json();
  },

  async trackView(page: string): Promise<void> {
    try {
      await fetch(`${API_BASE}/analytics/track-view`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page }),
      });
    } catch {
      // non-blocking
    }
  },

  async trackEvent(type: string, label: string): Promise<void> {
    try {
      await fetch(`${API_BASE}/analytics/track-event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, label }),
      });
    } catch {
      // non-blocking
    }
  },

  // --- AUDIT LOGS ---
  async getAuditLogs(): Promise<AuditLog[]> {
    const res = await fetch(`${API_BASE}/audit-logs`, {
      headers: { ...getAdminAuthHeader() },
    });
    if (!res.ok) throw new Error('Failed to fetch audit logs');
    return res.json();
  },

  // --- ADMIN AUTH ---
  async adminLogin(email: string, password: string): Promise<{ success: boolean; token: string; email: string }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Authentication failed');
    }
    return res.json();
  },

  async changePassword(newPassword: string): Promise<void> {
    const res = await fetch(`${API_BASE}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAdminAuthHeader(),
      },
      body: JSON.stringify({ newPassword }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to update password');
    }
  },

  async uploadMedia(dataUrl: string, filename: string): Promise<{ url: string; filename: string }> {
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAdminAuthHeader(),
      },
      body: JSON.stringify({ dataUrl, filename }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Media upload failed');
    }
    return res.json();
  },

  async checkFrameSupport(url: string): Promise<{ canEmbed: boolean; reason?: string }> {
    try {
      const res = await fetch(`${API_BASE}/check-frame?url=${encodeURIComponent(url)}`);
      if (!res.ok) return { canEmbed: false };
      return res.json();
    } catch {
      return { canEmbed: false };
    }
  },
};
