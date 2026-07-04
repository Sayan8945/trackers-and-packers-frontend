"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mail, CheckCircle, ArrowRight, KeyRound } from "lucide-react";
import type { ForgotPasswordFormData } from "@/types/auth";

const schema = z.object({
  email: z.string().min(1, "Email is required"),
});

export default function ForgotPasswordPage() {
  const [sent, setSent]           = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<ForgotPasswordFormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    await new Promise(r => setTimeout(r, 1000));
    setSentEmail(data.email);
    setSent(true);
  };

  return (
    /* Full-page dark bg — matches /login and /signup mobile theme */
    <div className="min-h-screen relative flex items-center justify-center p-5 sm:p-8 overflow-hidden bg-slate-950">

      {/* ── Animated background layers ──────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#0d1525] to-black pointer-events-none" />

      {/* Radial glow top-centre */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-brand-red/6 rounded-full blur-3xl pointer-events-none" />
      {/* Bottom-right accent */}
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      {/* Bottom-left accent */}
      <div className="absolute bottom-1/4 left-0 w-56 h-56 bg-brand-red/4 rounded-full blur-3xl pointer-events-none" />

      {/* Floating animated blobs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-40 h-40 bg-rose-500/5 rounded-full blur-2xl pointer-events-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/5 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, delay: 1.5 }}
      />

      {/* Subtle dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(225,29,72,.9) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Card ────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 w-full max-w-[420px]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo — unchanged /logo.png */}
        <motion.div
          className="flex justify-center mb-7"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link href="/">
            <div className="relative h-14 w-44">
              <Image
                src="/logo.png"
                alt="Sarkar Packers"
                fill
                className="object-contain"
                sizes="176px"
                priority
              />
            </div>
          </Link>
        </motion.div>

        {/* Glassmorphism card */}
        <div className="bg-white/6 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <AnimatePresence mode="wait">

            {/* ── Success state ─────────────────────────── */}
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35 }}
                className="px-7 py-10 text-center"
              >
                {/* Animated check */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1, stiffness: 200, damping: 18 }}
                  className="w-20 h-20 bg-green-500/15 border border-green-500/25 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </motion.div>

                <h2 className="text-xl font-bold text-white mb-2">Check Your Inbox</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-1">
                  We&apos;ve sent a reset link to
                </p>
                <p className="font-semibold text-white text-sm mb-5 break-all">{sentEmail}</p>
                <p className="text-slate-500 text-xs mb-8 leading-relaxed">
                  Didn&apos;t receive it? Check your spam folder or wait a few minutes and try again.
                </p>

                <button
                  onClick={() => setSent(false)}
                  className="text-brand-red text-sm font-semibold hover:text-rose-400 transition-colors duration-200"
                >
                  ← Try a different email
                </button>

                <div className="mt-8 pt-6 border-t border-white/8 text-center">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors duration-200"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to login
                  </Link>
                </div>
              </motion.div>
            ) : (

            /* ── Form state ───────────────────────────── */
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="px-7 py-9"
              >
                {/* Icon */}
                <motion.div
                  className="flex justify-center mb-6"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", delay: 0.15, stiffness: 180, damping: 16 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-brand-red/10 border border-brand-red/20 rounded-2xl flex items-center justify-center"
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(225,29,72,0)",
                        "0 0 24px rgba(225,29,72,0.25)",
                        "0 0 0px rgba(225,29,72,0)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <KeyRound className="w-7 h-7 text-brand-red" />
                  </motion.div>
                </motion.div>

                <h1 className="text-2xl font-bold text-white text-center mb-1.5">
                  Reset Password
                </h1>
                <p className="text-slate-400 text-sm text-center mb-7 leading-relaxed">
                  Enter your email and we&apos;ll send you a secure reset link.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="your@email.com"
                        autoComplete="email"
                        className="w-full h-11 pl-10 pr-4 bg-white/90 border border-white/20 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red/60 focus:border-brand-red/60 transition-all duration-200"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 bg-gradient-to-r from-brand-red to-rose-600 hover:from-brand-red-dark hover:to-brand-red text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-red-glow active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Reset Link
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-7 pt-6 border-t border-white/8 text-center">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors duration-200"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to login
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Back to site */}
        <div className="text-center mt-5">
          <Link
            href="/"
            className="text-xs text-slate-600 hover:text-slate-400 transition-colors duration-200"
          >
            ← Back to main website
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
