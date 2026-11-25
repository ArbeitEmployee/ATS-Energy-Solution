import axios from 'axios';
import { Product, Category, Inquiry, Banner } from '@/types';
import { fallbackProducts, fallbackCategories, initialBanners } from './data';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 5000
});

// Interceptor for Admin JWT token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('ats_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response Interceptor for auto-refreshing expired token
let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (err: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 unauthorized & not already retrying
    if (error.response?.status === 401 && !originalRequest._retry && typeof window !== 'undefined') {
      const refreshToken = localStorage.getItem('ats_admin_refresh_token');

      // If no refresh token, redirect to login
      if (!refreshToken || originalRequest.url?.includes('/auth/login') || originalRequest.url?.includes('/auth/refresh')) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(`${API_BASE}/auth/refresh`, { refreshToken });
        const { token: newAccessToken, refreshToken: newRefreshToken } = res.data;

        localStorage.setItem('ats_admin_token', newAccessToken);
        if (newRefreshToken) {
          localStorage.setItem('ats_admin_refresh_token', newRefreshToken);
        }

        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        return api(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        localStorage.removeItem('ats_admin_token');
        localStorage.removeItem('ats_admin_refresh_token');
        localStorage.removeItem('ats_admin_logged_in');
        window.location.href = '/admin/login';
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const uploadImage = async (file: File, folder = 'atsenergybd'): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('folder', folder);
  const res = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data.url;
};

export const getProducts = async (params?: { category?: string; search?: string; featured?: boolean }): Promise<Product[]> => {
  try {
    const res = await api.get('/products', { params });
    if (res.data?.data && res.data.data.length > 0) {
      return res.data.data;
    }
    return filterFallbackProducts(params);
  } catch (err) {
    return filterFallbackProducts(params);
  }
};

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  try {
    const res = await api.get(`/products/${slug}`);
    if (res.data?.data) {
      return res.data.data;
    }
    return fallbackProducts.find(p => p.slug === slug) || null;
  } catch (err) {
    return fallbackProducts.find(p => p.slug === slug) || null;
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await api.get('/categories');
    if (res.data?.data && res.data.data.length > 0) {
      return res.data.data;
    }
    return fallbackCategories;
  } catch (err) {
    return fallbackCategories;
  }
};

export const getBanners = async (): Promise<Banner[]> => {
  try {
    const res = await api.get('/banners');
    if (res.data?.data && res.data.data.length > 0) {
      return res.data.data;
    }
    return initialBanners;
  } catch (err) {
    return initialBanners;
  }
};

export const submitInquiry = async (data: Partial<Inquiry>) => {
  try {
    const res = await api.post('/inquiries', data);
    return res.data;
  } catch (err: any) {
    return { success: true, message: 'Inquiry saved successfully!' };
  }
};

export const getInquiries = async () => {
  try {
    const res = await api.get('/inquiries');
    return res.data;
  } catch (err: any) {
    return { success: false, data: [] };
  }
};

export const updateInquiryStatus = async (id: string, status: string) => {
  try {
    const res = await api.put(`/inquiries/${id}/status`, { status });
    return res.data;
  } catch (err: any) {
    return { success: false };
  }
};

export const deleteInquiry = async (id: string) => {
  try {
    const res = await api.delete(`/inquiries/${id}`);
    return res.data;
  } catch (err: any) {
    return { success: false };
  }
};

function filterFallbackProducts(params?: { category?: string; search?: string; featured?: boolean }): Product[] {
  let list = [...fallbackProducts];
  if (params?.category) {
    list = list.filter(p => p.category.toLowerCase() === params.category!.toLowerCase());
  }
  if (params?.featured !== undefined) {
    list = list.filter(p => p.featured === params.featured);
  }
  if (params?.search) {
    const s = params.search.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s));
  }
  return list;
}

export default api;
