/**
 * auth.ts — real backend auth helpers
 * All mock/demo logic removed. Uses backend REST API via axios.
 */
import { tokenStorage } from "./api";
import type { User } from "@/types/auth";

const ADMIN_USER_KEY = "sarkar_admin_user";
const USER_USER_KEY  = "sarkar_user_user";
const ADMIN_FLAG_KEY = "sarkar_admin_flag";

// ── Cookie helpers (for Next.js proxy middleware) ─────────
function setCookie(name: string, value: string, days = 1) {
  if (typeof document === "undefined") return;
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; path=/; expires=${d.toUTCString()}; SameSite=Lax`;
}
function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax`;
}

// ── Admin session helpers ─────────────────────────────────
export function persistAdminSession(user: User, accessToken: string, refreshToken?: string, remember = false) {
  const s = remember ? localStorage : sessionStorage;
  s.setItem(ADMIN_USER_KEY, JSON.stringify(user));
  s.setItem(ADMIN_FLAG_KEY, "true");
  tokenStorage.setAccess(accessToken);
  if (refreshToken) tokenStorage.setRefresh(refreshToken);
  setCookie("sarkar_admin_auth", "true", remember ? 30 : 1);
}

export function clearAdminSession() {
  [localStorage, sessionStorage].forEach(s => {
    s.removeItem(ADMIN_USER_KEY);
    s.removeItem(ADMIN_FLAG_KEY);
  });
  tokenStorage.clear();
  deleteCookie("sarkar_admin_auth");
}

export function getAdminUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ADMIN_USER_KEY) || sessionStorage.getItem(ADMIN_USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch { return null; }
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return (
    localStorage.getItem(ADMIN_FLAG_KEY) === "true" ||
    sessionStorage.getItem(ADMIN_FLAG_KEY) === "true"
  );
}

// ── User session helpers ──────────────────────────────────
export function persistUserSession(user: User, accessToken: string, refreshToken?: string, remember = true) {
  // Always use localStorage — sessionStorage is per-tab and lost on mobile navigation
  localStorage.setItem(USER_USER_KEY, JSON.stringify(user));
  tokenStorage.setAccess(accessToken);
  if (refreshToken) tokenStorage.setRefresh(refreshToken);
  setCookie("sarkar_user_auth", "true", remember ? 30 : 1);
}

export function clearUserSession() {
  [localStorage, sessionStorage].forEach(s => s.removeItem(USER_USER_KEY));
  tokenStorage.clear();
  deleteCookie("sarkar_user_auth");
}

export function getUserUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_USER_KEY) || sessionStorage.getItem(USER_USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch { return null; }
}

export function isUserAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return !!(localStorage.getItem(USER_USER_KEY) || sessionStorage.getItem(USER_USER_KEY));
}

// ── Legacy aliases (admin portal Sidebar/Header still import these) ──
export const adminLogout = clearAdminSession;
export const userLogout  = clearUserSession;
export const logout      = clearAdminSession;
export const getUser     = getAdminUser;
export const isAuthenticated = isAdminAuthenticated;
