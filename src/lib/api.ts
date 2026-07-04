import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

// ── Token helpers ─────────────────────────────────────────
const TOKEN_KEY   = "sarkar_access_token";
const REFRESH_KEY = "sarkar_refresh_token";

export const tokenStorage = {
  getAccess:  ()          => (typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY)   : null),
  getRefresh: ()          => (typeof window !== "undefined" ? localStorage.getItem(REFRESH_KEY) : null),
  setAccess:  (t: string) => localStorage.setItem(TOKEN_KEY,   t),
  setRefresh: (t: string) => localStorage.setItem(REFRESH_KEY, t),
  clear:      ()          => { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(REFRESH_KEY); },
};

// ── Main Axios instance ───────────────────────────────────
export const api = axios.create({
  baseURL:         BASE_URL,
  withCredentials: true,           // send httpOnly cookies to backend
  timeout:         15_000,
  headers: { "Content-Type": "application/json" },
});

// ── Request interceptor: attach Bearer token ──────────────
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getAccess();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// ── Response interceptor: auto-refresh on 401 ────────────
let isRefreshing = false;
let queue: Array<(token: string) => void> = [];

const processQueue = (token: string) => {
  queue.forEach(cb => cb(token));
  queue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !original._retry) {
      const refreshToken = tokenStorage.getRefresh();
      if (!refreshToken) {
        tokenStorage.clear();
        if (typeof window !== "undefined") window.location.href = "/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push((token) => {
            original.headers!.Authorization = `Bearer ${token}`;
            resolve(api(original));
          });
          // timeout safety
          setTimeout(() => reject(error), 10_000);
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(`${BASE_URL}/auth/refresh-token`, { refreshToken });
        const newToken = data.data.accessToken;
        tokenStorage.setAccess(newToken);
        processQueue(newToken);
        original.headers!.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch {
        tokenStorage.clear();
        if (typeof window !== "undefined") window.location.href = "/login";
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// ── Auth API calls ────────────────────────────────────────
export const authApi = {
  register: (data: { name: string; email: string; mobile?: string; password: string }) =>
    api.post("/auth/register", data),

  login: (data: { email?: string; mobile?: string; password: string }) =>
    api.post("/auth/login", data),

  logout: () => api.post("/auth/logout"),

  refreshToken: (refreshToken: string) =>
    api.post("/auth/refresh-token", { refreshToken }),

  sendMobileOtp: (identifier: string) =>
    api.post("/auth/send-mobile-otp", { identifier }),

  verifyMobileOtp: (identifier: string, otp: string) =>
    api.post("/auth/verify-mobile-otp", { identifier, otp }),

  forgotPassword: (email: string) =>
    api.post("/auth/forgot-password", { email }),

  resetPassword: (email: string, otp: string, password: string) =>
    api.post("/auth/reset-password", { email, otp, password }),

  googleLogin: () => {
    window.location.href = `${BASE_URL}/auth/google`;
  },

  /** Exchange a Firebase ID Token for a backend JWT pair */
  firebaseLogin: (idToken: string) =>
    api.post("/auth/firebase-login", { idToken }),
};

// ── User API calls ────────────────────────────────────────
export const userApi = {
  getProfile: () => api.get("/users/profile"),

  updateProfile: (data: { name?: string; mobile?: string }) =>
    api.put("/users/profile", data),

  changePassword: (currentPassword: string, newPassword: string) =>
    api.put("/users/change-password", { currentPassword, newPassword }),

  uploadAvatar: (file: File) => {
    const form = new FormData();
    form.append("avatar", file);
    return api.post("/users/upload-avatar", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

// ── Lead API ──────────────────────────────────────────────
export const leadApi = {
  create: (data: {
    name: string; mobile: string; email?: string;
    moveFrom: string; moveTo: string; moveDate?: string;
    serviceType: string; message?: string;
  }) => api.post("/leads", data),
};

// ── Admin API ─────────────────────────────────────────────
export const adminApi = {
  login: (email: string, password: string) =>
    api.post("/admin/login", { email, password }),

  dashboard: () => api.get("/admin/dashboard"),
  leads:     (params?: Record<string, string>) => api.get("/admin/leads", { params }),
  deleteLead:(id: string) => api.delete(`/admin/leads/${id}`),
  updateLeadStatus: (id: string, status: string) => api.put(`/admin/leads/${id}`, { status }),
};

export default api;
