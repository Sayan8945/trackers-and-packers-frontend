"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, RefreshCw, ArrowLeft, Smartphone } from "lucide-react";
import { useAuth, getApiError } from "@/context/AuthContext";

/* ─── OTP digit box ────────────────────────────────────── */
function OtpInput({
  value,
  onChange,
  onKeyDown,
  inputRef,
  filled,
}: {
  value: string;
  onChange: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  filled: boolean;
}) {
  return (
    <motion.input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={value}
      onChange={e => {
        const v = e.target.value.replace(/\D/g, "");
        onChange(v);
      }}
      onKeyDown={onKeyDown}
      whileFocus={{ scale: 1.05 }}
      className={`
        w-12 h-14 text-center text-xl font-bold rounded-xl border-2 transition-all duration-200
        bg-white/5 text-white caret-transparent
        focus:outline-none focus:ring-0
        ${filled ? "border-brand-red shadow-[0_0_12px_rgba(225,29,72,0.4)]" : "border-white/15"}
      `}
    />
  );
}

/* ─── Inner page (uses useSearchParams) ─────────────────── */
function VerifyOtpInner() {
  const router       = useRouter();
  const params       = useSearchParams();
  const phone        = params.get("phone") ?? "";

  const { confirmPhoneOtp, sendPhoneOtp } = useAuth();

  const [digits,    setDigits]    = useState(["", "", "", "", "", ""]);
  const [error,     setError]     = useState("");
  const [loading,   setLoading]   = useState(false);
  const [success,   setSuccess]   = useState(false);
  const [timer,     setTimer]     = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [resending, setResending] = useState(false);
  const inputRefs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));
  const autoSubmitRef = useRef(false);

  /* ── Countdown ─────────────────────────────────────── */
  useEffect(() => {
    if (timer <= 0) { setCanResend(true); return; }
    const id = setTimeout(() => setTimer(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  /* ── Auto-focus first box on mount ─────────────────── */
  useEffect(() => {
    setTimeout(() => inputRefs[0].current?.focus(), 150);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Handle digit input ─────────────────────────────── */
  const handleChange = useCallback((idx: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    setDigits(prev => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
    if (val && idx < 5) {
      inputRefs[idx + 1].current?.focus();
    }
  }, [inputRefs]);

  const handleKeyDown = useCallback((idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      inputRefs[idx - 1].current?.focus();
    }
    // Allow paste on first box
    if (e.key === "v" && (e.ctrlKey || e.metaKey)) return;
  }, [digits, inputRefs]);

  /* ── Handle paste (fills all 6 boxes) ──────────────── */
  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLDivElement>) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (text.length === 6) {
      setDigits(text.split(""));
      inputRefs[5].current?.focus();
    }
  }, [inputRefs]);

  /* ── Verify OTP ─────────────────────────────────────── */
  const verify = useCallback(async (code: string) => {
    if (autoSubmitRef.current) return;
    autoSubmitRef.current = true;
    setLoading(true);
    setError("");
    try {
      await confirmPhoneOtp(code);
      setSuccess(true);
    } catch (err) {
      setError(getApiError(err));
      setDigits(["", "", "", "", "", ""]);
      setTimeout(() => inputRefs[0].current?.focus(), 50);
    } finally {
      setLoading(false);
      autoSubmitRef.current = false;
    }
  }, [confirmPhoneOtp, inputRefs]);

  /* ── Auto-submit when all 6 digits entered ──────────── */
  useEffect(() => {
    const code = digits.join("");
    if (code.length === 6 && !loading && !success) {
      verify(code);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digits]);

  /* ── Resend OTP ─────────────────────────────────────── */
  const handleResend = useCallback(async () => {
    if (!canResend || !phone) return;
    setResending(true);
    setError("");
    try {
      await sendPhoneOtp(phone, "recaptcha-resend");
      setCanResend(false);
      setTimer(60);
      setDigits(["", "", "", "", "", ""]);
      setTimeout(() => inputRefs[0].current?.focus(), 50);
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setResending(false);
    }
  }, [canResend, phone, sendPhoneOtp, inputRefs]);

  /* ── Manual submit button ────────────────────────────── */
  const handleManualSubmit = useCallback(() => {
    const code = digits.join("");
    if (code.length === 6) verify(code);
  }, [digits, verify]);

  return (
    <div className="min-h-screen relative flex items-center justify-center p-5 sm:p-8 overflow-hidden bg-slate-950">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#0d1525] to-black pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-red/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, rgba(225,29,72,.9) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      {/* Hidden reCAPTCHA containers for resend */}
      <div id="recaptcha-resend" className="hidden" />

      <motion.div className="relative z-10 w-full max-w-[420px]"
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      >
        <div className="bg-white/6 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 text-center">
          <AnimatePresence mode="wait">

            {/* ── Success ── */}
            {success && (
              <motion.div key="success"
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="py-4"
              >
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="w-20 h-20 bg-green-500/15 border border-green-500/25 rounded-full flex items-center justify-center mx-auto mb-5"
                >
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </motion.div>
                <h2 className="text-xl font-bold text-white mb-2">Phone Verified!</h2>
                <p className="text-slate-400 text-sm">You&apos;re logged in. Redirecting…</p>
              </motion.div>
            )}

            {/* ── Form ── */}
            {!success && (
              <motion.div key="form">
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 bg-brand-red/10 border border-brand-red/20 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  animate={{ boxShadow: ["0 0 0px rgba(225,29,72,0)", "0 0 24px rgba(225,29,72,0.3)", "0 0 0px rgba(225,29,72,0)"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Smartphone className="w-8 h-8 text-brand-red" />
                </motion.div>

                <h1 className="text-2xl font-bold text-white mb-1.5">Verify Your Phone</h1>
                <p className="text-slate-400 text-sm mb-1">We sent a 6-digit code to</p>
                <p className="font-semibold text-white text-sm mb-7 tracking-wide">{phone}</p>

                {/* OTP boxes */}
                <div
                  className="flex gap-2 justify-center mb-5"
                  onPaste={handlePaste}
                >
                  {digits.map((digit, i) => (
                    <OtpInput
                      key={i}
                      value={digit}
                      onChange={v => handleChange(i, v)}
                      onKeyDown={e => handleKeyDown(i, e)}
                      inputRef={inputRefs[i]}
                      filled={!!digit}
                    />
                  ))}
                </div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-3 mb-4 text-xs text-left"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Verify button */}
                <button onClick={handleManualSubmit}
                  disabled={loading || digits.join("").length < 6}
                  className="w-full h-11 bg-brand-red hover:bg-brand-red-dark text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-red-glow active:scale-[0.98] disabled:opacity-60 mb-4"
                >
                  {loading
                    ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Verifying…</>
                    : "Verify OTP"
                  }
                </button>

                {/* Resend */}
                <button onClick={handleResend}
                  disabled={!canResend || resending}
                  className="flex items-center gap-1.5 text-sm mx-auto text-slate-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${resending ? "animate-spin" : ""}`} />
                  {canResend ? "Resend OTP" : `Resend in ${timer}s`}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Back link */}
        <div className="text-center mt-5">
          <Link href="/login"
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-400 transition-colors duration-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-red/30 border-t-brand-red rounded-full animate-spin" />
      </div>
    }>
      <VerifyOtpInner />
    </Suspense>
  );
}
