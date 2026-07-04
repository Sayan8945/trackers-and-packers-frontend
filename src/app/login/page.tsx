"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowRight, AlertCircle, Package, Truck, MapPin, CheckCircle, Phone, Mail } from "lucide-react";
import { useAuth, getApiError } from "@/context/AuthContext";

/* ─── Schemas ──────────────────────────────────────────── */
const phoneSchema = z.object({
  countryCode: z.string().min(1),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number"),
});
type PhoneFormData = z.infer<typeof phoneSchema>;

const emailSchema = z.object({
  email:      z.string().min(1, "Email required"),
  password:   z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});
type EmailFormData = z.infer<typeof emailSchema>;

/* ─── Country codes ────────────────────────────────────── */
const COUNTRY_CODES = [
  { code: "+91",  flag: "🇮🇳", label: "India" },
  { code: "+1",   flag: "🇺🇸", label: "USA / Canada" },
  { code: "+44",  flag: "🇬🇧", label: "United Kingdom" },
  { code: "+61",  flag: "🇦🇺", label: "Australia" },
  { code: "+971", flag: "🇦🇪", label: "UAE" },
  { code: "+65",  flag: "🇸🇬", label: "Singapore" },
];

/* ─── Floating icons (hero) ────────────────────────────── */
const floatingItems = [
  { icon: "📦", x: "10%", y: "20%", delay: 0,   size: "text-3xl" },
  { icon: "🚚", x: "75%", y: "15%", delay: 0.4, size: "text-4xl" },
  { icon: "📍", x: "20%", y: "65%", delay: 0.8, size: "text-2xl" },
  { icon: "🏠", x: "80%", y: "60%", delay: 1.2, size: "text-3xl" },
  { icon: "⭐", x: "50%", y: "80%", delay: 0.6, size: "text-2xl" },
];

export default function LoginPage() {
  const { sendPhoneOtp, userSignIn, loginWithGoogle } = useAuth();
  const router = useRouter();
  const recaptchaRef = useRef<HTMLDivElement>(null);

  const [tab,      setTab]      = useState<"phone" | "email">("phone");
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  /* ── Phone form ──────────────────────────────────────── */
  const phoneForm = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { countryCode: "+91", mobile: "" },
  });

  const onSendOtp = useCallback(async (data: PhoneFormData) => {
    setLoading(true);
    setError("");
    try {
      const fullPhone = `${data.countryCode}${data.mobile}`;
      await sendPhoneOtp(fullPhone, "recaptcha-container");
      router.push(`/verify-otp?phone=${encodeURIComponent(fullPhone)}`);
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
    }
  }, [sendPhoneOtp, router]);

  /* ── Email form ──────────────────────────────────────── */
  const emailForm = useForm<EmailFormData>({ resolver: zodResolver(emailSchema) });

  const onEmailLogin = async (data: EmailFormData) => {
    setLoading(true);
    setError("");
    try {
      await userSignIn({ email: data.email, password: data.password, remember: data.rememberMe });
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* ── Left hero ── */}
      <div className="hidden lg:flex lg:w-[52%] relative bg-gradient-to-br from-brand-navy via-[#0d1f3c] to-brand-navy overflow-hidden flex-col justify-center px-16">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-red/15 rounded-full blur-3xl" />
        {floatingItems.map((item, idx) => (
          <motion.div key={idx} className={`absolute ${item.size} select-none pointer-events-none`}
            style={{ left: item.x, top: item.y }}
            animate={{ y: [0, -16, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4 + idx * 0.5, repeat: Infinity, delay: item.delay, ease: "easeInOut" }}
          >{item.icon}</motion.div>
        ))}
        <motion.div className="absolute bottom-24 text-4xl pointer-events-none"
          animate={{ x: ["-10%", "110%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        >🚛</motion.div>
        <div className="relative z-10 max-w-md">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Link href="/"><div className="relative h-16 w-52 mb-12"><Image src="/logo.png" alt="Sarkar Packers" fill className="object-contain" sizes="208px" /></div></Link>
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">Welcome Back</h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">Track your relocation journey and manage your enquiries — all in one place.</p>
            <div className="space-y-4">
              {[
                { icon: Package,     text: "Real-time shipment tracking" },
                { icon: MapPin,      text: "Pan-India coverage — 100+ cities" },
                { icon: Truck,       text: "Safe, insured transportation" },
                { icon: CheckCircle, text: "Verified Moving Services — trusted since 2007" },
              ].map(({ icon: Icon, text }, idx) => (
                <motion.div key={text} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-7 h-7 bg-brand-red/20 rounded-lg flex items-center justify-center flex-shrink-0"><Icon className="w-3.5 h-3.5 text-brand-red" /></div>
                  <span className="text-gray-300 text-sm">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="w-full lg:w-[48%] relative flex items-center justify-center bg-slate-950 lg:bg-gray-50 p-6 sm:p-10 overflow-hidden">
        {/* Mobile background */}
        <div className="absolute inset-0 lg:hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-brand-red/6 rounded-full blur-3xl" />
        </div>

        <motion.div className="relative z-10 w-full max-w-[420px]"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-6 lg:hidden">
            <Link href="/"><div className="relative h-12 w-40"><Image src="/logo.png" alt="Sarkar Packers" fill className="object-contain" sizes="160px" /></div></Link>
          </div>

          <div className="bg-white/8 lg:bg-white backdrop-blur-xl lg:backdrop-blur-none border border-white/10 lg:border-gray-100 rounded-2xl shadow-2xl lg:shadow-sm p-7 sm:p-8">
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-white lg:text-brand-navy">Sign In</h2>
              <p className="text-slate-400 lg:text-gray-500 text-sm mt-1">Welcome back! Verify your phone or use email.</p>
            </div>

            {/* ── Tabs ── */}
            <div className="flex gap-1 bg-white/5 lg:bg-gray-100 rounded-xl p-1 mb-5">
              {(["phone", "email"] as const).map(t => (
                <button key={t} onClick={() => { setTab(t); setError(""); }}
                  className={`flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg text-sm font-medium transition-all duration-200 ${
                    tab === t
                      ? "bg-brand-red text-white shadow-sm"
                      : "text-slate-400 lg:text-gray-500 hover:text-white lg:hover:text-gray-700"
                  }`}
                >
                  {t === "phone" ? <Phone className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
                  {t === "phone" ? "Phone OTP" : "Email"}
                </button>
              ))}
            </div>

            {/* ── Error banner ── */}
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 text-red-400 lg:bg-red-50 lg:border-red-200 lg:text-red-700 rounded-xl p-3.5 mb-4 text-xs"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {/* ── Phone OTP tab ── */}
              {tab === "phone" && (
                <motion.div key="phone" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}>
                  <form onSubmit={phoneForm.handleSubmit(onSendOtp)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-200 lg:text-gray-700 mb-1.5">Mobile Number</label>
                      <div className="flex gap-2">
                        {/* Country code selector */}
                        <select
                          {...phoneForm.register("countryCode")}
                          className="h-11 px-3 bg-white/90 lg:bg-transparent border border-white/20 lg:border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red transition-all w-[100px] cursor-pointer"
                        >
                          {COUNTRY_CODES.map(c => (
                            <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                          ))}
                        </select>
                        {/* Mobile input */}
                        <input
                          {...phoneForm.register("mobile")}
                          type="tel"
                          placeholder="9876543210"
                          inputMode="numeric"
                          autoComplete="tel-national"
                          className="flex-1 h-11 px-4 bg-white/90 lg:bg-transparent border border-white/20 lg:border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red transition-all"
                        />
                      </div>
                      {phoneForm.formState.errors.mobile && (
                        <p className="text-red-400 text-xs mt-1">{phoneForm.formState.errors.mobile.message}</p>
                      )}
                    </div>

                    {/* Invisible reCAPTCHA container */}
                    <div ref={recaptchaRef} id="recaptcha-container" />

                    <button type="submit" disabled={loading}
                      className="w-full h-11 bg-gradient-to-r from-brand-red to-rose-600 hover:from-brand-red-dark hover:to-brand-red text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-red-glow active:scale-[0.98] disabled:opacity-60"
                    >
                      {loading
                        ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending OTP…</>
                        : <><Phone className="w-4 h-4" /><span>Send OTP</span><ArrowRight className="w-4 h-4" /></>
                      }
                    </button>
                  </form>

                  <p className="text-center text-xs text-slate-400 lg:text-gray-500 mt-4">
                    We&apos;ll send a 6-digit code via SMS. Standard rates may apply.
                  </p>
                </motion.div>
              )}

              {/* ── Email / Password tab ── */}
              {tab === "email" && (
                <motion.div key="email" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                  <form onSubmit={emailForm.handleSubmit(onEmailLogin)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-200 lg:text-gray-700 mb-1.5">Email</label>
                      <input {...emailForm.register("email")} type="email" placeholder="you@example.com" autoComplete="email"
                        className="w-full h-11 px-4 bg-white/90 lg:bg-transparent border border-white/20 lg:border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red transition-all"
                      />
                      {emailForm.formState.errors.email && <p className="text-red-400 text-xs mt-1">{emailForm.formState.errors.email.message}</p>}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-sm font-medium text-slate-200 lg:text-gray-700">Password</label>
                        <Link href="/forgot-password" className="text-xs text-brand-red hover:text-brand-red-dark">Forgot?</Link>
                      </div>
                      <div className="relative">
                        <input {...emailForm.register("password")} type={showPw ? "text" : "password"} placeholder="••••••••" autoComplete="current-password"
                          className="w-full h-11 px-4 pr-11 bg-white/90 lg:bg-transparent border border-white/20 lg:border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red transition-all"
                        />
                        <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                          {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {emailForm.formState.errors.password && <p className="text-red-400 text-xs mt-1">{emailForm.formState.errors.password.message}</p>}
                    </div>

                    <div className="flex items-center gap-2.5">
                      <input {...emailForm.register("rememberMe")} id="rem" type="checkbox" className="h-4 w-4 rounded accent-brand-red" />
                      <label htmlFor="rem" className="text-sm text-slate-300 lg:text-gray-600 select-none">Remember me</label>
                    </div>

                    <button type="submit" disabled={loading}
                      className="w-full h-11 bg-gradient-to-r from-brand-red to-rose-600 hover:from-brand-red-dark hover:to-brand-red text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-red-glow active:scale-[0.98] disabled:opacity-60"
                    >
                      {loading
                        ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in…</>
                        : <><span>Sign In</span><ArrowRight className="w-4 h-4" /></>
                      }
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Divider + Google ── */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-white/10 lg:bg-gray-200" />
              <span className="text-xs text-slate-500 lg:text-gray-400">or</span>
              <div className="flex-1 h-px bg-white/10 lg:bg-gray-200" />
            </div>

            <button onClick={loginWithGoogle}
              className="w-full h-11 flex items-center justify-center gap-2.5 border border-white/20 lg:border-gray-200 rounded-xl text-sm font-medium text-white lg:text-gray-700 hover:bg-white/5 lg:hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <p className="text-center text-sm text-slate-400 lg:text-gray-500 mt-5">
              New here?{" "}
              <Link href="/signup" className="text-brand-red font-semibold hover:text-brand-red-dark">Create account</Link>
            </p>
          </div>

          <div className="text-center mt-5 space-y-2">
            <Link href="/" className="block text-xs text-slate-600 hover:text-slate-400">← Back to main site</Link>
            <Link href="/admin-login" className="block text-xs text-slate-600 hover:text-slate-400">Admin? Sign in here →</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
