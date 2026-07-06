"use client";

import React, {
  createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { authApi, userApi } from "@/lib/api";
import {
  persistUserSession, clearUserSession, getUserUser, isUserAuthenticated,
  persistAdminSession, clearAdminSession, getAdminUser, isAdminAuthenticated,
} from "@/lib/auth";
import type { User } from "@/types/auth";
import { AxiosError } from "axios";
import type { ConfirmationResult } from "@/lib/firebase";
import { useToast } from "@/components/ui/toast";

/* ── Types ─────────────────────────────────────────────── */
interface AuthContextValue {
  user:              User | null;
  adminUser:         User | null;
  loading:           boolean;
  isUserLoggedIn:    boolean;
  isAdminLoggedIn:   boolean;

  // User auth (email / password)
  userSignup:  (data: { name: string; email: string; mobile: string; password: string }) => Promise<void>;
  userSignIn:  (data: { email?: string; mobile?: string; password: string; remember?: boolean }) => Promise<void>;
  userSignOut: () => Promise<void>;
  refreshUser: () => Promise<void>;

  // Firebase Phone Auth
  sendPhoneOtp:   (phoneNumber: string, recaptchaContainerId: string) => Promise<void>;
  confirmPhoneOtp:(otp: string, remember?: boolean) => Promise<void>;

  // Admin auth
  adminSignIn:  (email: string, password: string, remember?: boolean) => Promise<void>;
  adminSignOut: () => void;

  // Google
  loginWithGoogle: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/* ── Provider ──────────────────────────────────────────── */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,        setUser]        = useState<User | null>(null);
  const [adminUser,   setAdminUser]   = useState<User | null>(null);
  const [loading,     setLoading]     = useState(true);
  const confirmRef = useRef<ConfirmationResult | null>(null);
  const router = useRouter();
  const { show: toast } = useToast();

  // Hydrate from storage on mount
  useEffect(() => {
    setUser(getUserUser());
    setAdminUser(getAdminUser());
    setLoading(false);
  }, []);

  /* ── User Signup ─────────────────────────────────────── */
  const userSignup = useCallback(async (data: {
    name: string; email: string; mobile: string; password: string;
  }) => {
    const res = await authApi.register(data);
    const { accessToken, refreshToken, user: u } = res.data.data;
    persistUserSession(u, accessToken, refreshToken);
    setUser(u);
    toast(`Welcome, ${u.name}! Account created successfully.`, "success");
    router.push("/");
  }, [router, toast]);

  /* ── User Login (email/password) ─────────────────────── */
  const userSignIn = useCallback(async (data: {
    email?: string; mobile?: string; password: string; remember?: boolean;
  }) => {
    const res = await authApi.login({ email: data.email, mobile: data.mobile, password: data.password });
    const { accessToken, refreshToken, user: u } = res.data.data;
    persistUserSession(u, accessToken, refreshToken, data.remember);
    setUser(u);
    toast(`Welcome back, ${u.name}!`, "success");
    router.push("/");
  }, [router, toast]);

  /* ── User Logout ─────────────────────────────────────── */
  const userSignOut = useCallback(async () => {
    try { await authApi.logout(); } catch { /* ignore */ }
    clearUserSession();
    setUser(null);
    toast("You've been signed out.", "info");
    router.push("/");
  }, [router, toast]);

  /* ── Refresh user from backend ───────────────────────── */
  const refreshUser = useCallback(async () => {
    try {
      const res = await userApi.getProfile();
      const fresh: User = res.data.data;
      setUser(fresh);
      const stored = getUserUser();
      if (stored) {
        const token = localStorage.getItem("sarkar_access_token") ?? "";
        persistUserSession(fresh, token);
      }
    } catch { /* token expired — cleared by interceptor */ }
  }, []);

  /* ── Firebase Phone: Send OTP ─────────────────────────── */
  const sendPhoneOtp = useCallback(async (
    phoneNumber: string,
    recaptchaContainerId: string
  ) => {
    // Lazy-load Firebase to avoid SSR issues
    const { auth, RecaptchaVerifier, signInWithPhoneNumber } = await import("@/lib/firebase");

    // Clean up any existing verifier widget
    if ((window as Window & { recaptchaVerifier?: InstanceType<typeof RecaptchaVerifier> }).recaptchaVerifier) {
      (window as Window & { recaptchaVerifier?: InstanceType<typeof RecaptchaVerifier> }).recaptchaVerifier!.clear();
    }

    const verifier = new RecaptchaVerifier(auth, recaptchaContainerId, {
      size: "invisible",
      callback: () => { /* reCAPTCHA solved */ },
    });

    (window as Window & { recaptchaVerifier?: InstanceType<typeof RecaptchaVerifier> }).recaptchaVerifier = verifier;

    const confirmation = await signInWithPhoneNumber(auth, phoneNumber, verifier);
    confirmRef.current = confirmation;
  }, []);

  /* ── Firebase Phone: Verify OTP & obtain JWT ─────────── */
  const confirmPhoneOtp = useCallback(async (otp: string, remember = false) => {
    if (!confirmRef.current) throw new Error("No OTP session — call sendPhoneOtp first");

    const result   = await confirmRef.current.confirm(otp);
    const idToken  = await result.user.getIdToken();

    const res = await authApi.firebaseLogin(idToken);
    const { accessToken, refreshToken, user: u } = res.data.data;

    persistUserSession(u, accessToken, refreshToken, remember);
    setUser(u);
    confirmRef.current = null;
    toast(`Welcome, ${u.name}!`, "success");
    router.push("/");
  }, [router, toast]);

  /* ── Admin Login ─────────────────────────────────────── */
  const adminSignIn = useCallback(async (email: string, password: string, remember = false) => {
    const { adminApi } = await import("@/lib/api");
    const res = await adminApi.login(email, password);
    const { accessToken, refreshToken, admin } = res.data.data;
    persistAdminSession(admin, accessToken, refreshToken, remember);
    setAdminUser(admin);
    toast(`Welcome, ${admin.name}!`, "success");
    window.location.href = "/admin";
  }, [toast]);

  /* ── Admin Logout ────────────────────────────────────── */
  const adminSignOut = useCallback(() => {
    clearAdminSession();
    setAdminUser(null);
    toast("Admin signed out.", "info");
    router.push("/admin-login");
  }, [router, toast]);

  /* ── Google OAuth ────────────────────────────────────── */
  const loginWithGoogle = useCallback(() => {
    authApi.googleLogin();
  }, []);

  return (
    <AuthContext.Provider value={{
      user, adminUser, loading,
      isUserLoggedIn:  isUserAuthenticated(),
      isAdminLoggedIn: isAdminAuthenticated(),
      userSignup, userSignIn, userSignOut, refreshUser,
      sendPhoneOtp, confirmPhoneOtp,
      adminSignIn, adminSignOut, loginWithGoogle,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

/* ── Hook ──────────────────────────────────────────────── */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

/* ── Error extractor ─────────────────────────────────────*/
export function getApiError(err: unknown): string {
  if (err instanceof AxiosError) {
    return err.response?.data?.message ?? err.message ?? "Something went wrong";
  }
  return String(err);
}
