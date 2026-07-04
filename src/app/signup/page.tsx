"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth, getApiError } from "@/context/AuthContext";

const schema = z.object({
  fullName: z.string().min(2),
  email:    z.string().min(1, "Email required"),
  mobile:   z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile"),
  password: z.string().min(8, "Min 8 characters"),
  confirmPassword: z.string(),
  terms: z.boolean().refine(v => v, "Accept terms to continue"),
}).refine(d => d.password === d.confirmPassword, { message: "Passwords don't match", path: ["confirmPassword"] });

type FormData = z.infer<typeof schema>;

function strength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++; if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++; if (/[^A-Za-z0-9]/.test(pw)) s++;
  return { score: s, ...[{label:"Weak",color:"bg-red-500"},{label:"Fair",color:"bg-amber-500"},{label:"Good",color:"bg-yellow-400"},{label:"Strong",color:"bg-green-500"},{label:"Very Strong",color:"bg-emerald-600"}][s] };
}

export default function SignupPage() {
  const { userSignup, loginWithGoogle } = useAuth();
  const [showPw, setShowPw]   = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [pw, setPw]           = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const pwStr = strength(pw);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true); setError("");
    try {
      await userSignup({ name: data.fullName, email: data.email, mobile: data.mobile, password: data.password });
    } catch (err) {
      setError(getApiError(err));
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Left hero */}
      <div className="hidden lg:flex lg:w-[52%] relative bg-gradient-to-br from-[#0a1628] via-brand-navy to-[#0d1f3c] overflow-hidden flex-col justify-center px-16">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, rgba(225,29,72,.8) 1.5px, transparent 1.5px)", backgroundSize: "36px 36px" }} />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-brand-red/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-md">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Link href="/"><div className="relative h-16 w-52 mb-12"><Image src="/logo.png" alt="Sarkar Packers" fill className="object-contain" sizes="208px" /></div></Link>
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">Join Sarkar<br />Packers & Movers</h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">Create your account and get instant relocation support, real-time tracking, and exclusive offers.</p>
            <div className="grid grid-cols-2 gap-4">
              {[["5000+","Happy Customers"],["100+","Cities"],["17+","Years Trust"],["✓","Verified"]].map(([v,l]) => (
                <div key={l} className="bg-white/5 border border-white/10 rounded-xl p-3.5">
                  <div className="text-xl font-bold text-brand-red">{v}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right form */}
      <div className="w-full lg:w-[48%] relative flex items-center justify-center bg-slate-950 lg:bg-gray-50 p-5 sm:p-8 overflow-y-auto overflow-x-hidden">
        <div className="absolute inset-0 lg:hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#0d1525] to-black" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-brand-red/5 rounded-full blur-3xl" />
        </div>

        <motion.div className="relative z-10 w-full max-w-[420px] py-4" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex justify-center mb-6 lg:hidden">
            <Link href="/"><div className="relative h-12 w-40"><Image src="/logo.png" alt="Sarkar Packers" fill className="object-contain" sizes="160px" /></div></Link>
          </div>

          <div className="bg-white/8 lg:bg-white backdrop-blur-xl lg:backdrop-blur-none border border-white/10 lg:border-gray-100 rounded-2xl shadow-2xl lg:shadow-sm p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white lg:text-brand-navy">Create Account</h2>
              <p className="text-slate-400 lg:text-gray-500 text-sm mt-1">Start your relocation journey</p>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-3.5 mb-4 text-xs"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" /><span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {[
                { name: "fullName", label: "Full Name",     type: "text",     placeholder: "Your full name" },
                { name: "email",    label: "Email",          type: "email",    placeholder: "you@example.com" },
                { name: "mobile",   label: "Mobile Number",  type: "tel",      placeholder: "10-digit number" },
              ].map(({ name, label, type, placeholder }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-slate-200 lg:text-gray-700 mb-1.5">{label}</label>
                  <input {...register(name as "fullName"|"email"|"mobile")} type={type} placeholder={placeholder}
                    className="w-full h-11 px-4 bg-white/90 lg:bg-transparent border border-white/20 lg:border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red transition-all duration-200"
                  />
                  {errors[name as keyof FormData] && <p className="text-red-400 text-xs mt-1">{errors[name as keyof FormData]?.message as string}</p>}
                </div>
              ))}

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-200 lg:text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input {...register("password")} type={showPw ? "text" : "password"} placeholder="Min 8 characters"
                    onChange={e => setPw(e.target.value)}
                    className="w-full h-11 px-4 pr-11 bg-white/90 lg:bg-transparent border border-white/20 lg:border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red transition-all duration-200"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">{showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                </div>
                {pw.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-0.5">{[0,1,2,3].map(k => <div key={k} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${k < pwStr.score ? pwStr.color : "bg-white/20 lg:bg-gray-200"}`} />)}</div>
                    <p className="text-xs text-slate-300 lg:text-gray-400">Strength: <span className="font-medium text-white lg:text-gray-700">{pwStr.label}</span></p>
                  </div>
                )}
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-slate-200 lg:text-gray-700 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <input {...register("confirmPassword")} type={showCpw ? "text" : "password"} placeholder="Repeat password"
                    className="w-full h-11 px-4 pr-11 bg-white/90 lg:bg-transparent border border-white/20 lg:border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red transition-all duration-200"
                  />
                  <button type="button" onClick={() => setShowCpw(!showCpw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">{showCpw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                </div>
                {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
              </div>

              <div className="flex items-start gap-2.5">
                <input {...register("terms")} id="terms" type="checkbox" className="h-4 w-4 mt-0.5 rounded accent-brand-red" />
                <label htmlFor="terms" className="text-xs text-slate-300 lg:text-gray-600">
                  I agree to the <Link href="#" className="text-brand-red hover:underline">Terms</Link> and <Link href="#" className="text-brand-red hover:underline">Privacy Policy</Link>
                </label>
              </div>
              {errors.terms && <p className="text-red-400 text-xs -mt-1">{errors.terms.message}</p>}

              <button type="submit" disabled={loading}
                className="w-full h-11 bg-gradient-to-r from-brand-red to-rose-600 hover:from-brand-red-dark hover:to-brand-red text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-red-glow active:scale-[0.98] disabled:opacity-60 mt-1"
              >
                {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating…</> : <><span>Create Account</span><ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>

            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-white/10 lg:bg-gray-200" />
              <span className="text-xs text-slate-500 lg:text-gray-400">or</span>
              <div className="flex-1 h-px bg-white/10 lg:bg-gray-200" />
            </div>

            <button onClick={loginWithGoogle}
              className="w-full h-11 flex items-center justify-center gap-2.5 border border-white/20 lg:border-gray-200 rounded-xl text-sm font-medium text-white lg:text-gray-700 hover:bg-white/5 lg:hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>

            <p className="text-center text-sm text-slate-400 lg:text-gray-500 mt-4">
              Already have an account? <Link href="/login" className="text-brand-red font-semibold hover:text-brand-red-dark">Sign in</Link>
            </p>
          </div>
          <div className="text-center mt-5">
            <Link href="/" className="text-xs text-slate-600 hover:text-slate-400">← Back to main site</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
