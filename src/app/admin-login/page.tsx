"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, Activity, Server, Globe, Lock } from "lucide-react";
import { useAuth, getApiError } from "@/context/AuthContext";

const schema = z.object({
  email:      z.string().min(1, "Email required"),
  password:   z.string().min(6, "Password required"),
  rememberMe: z.boolean().optional(),
});
type FormData = z.infer<typeof schema>;

function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    const dots = Array.from({ length: 70 }, () => ({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, vx: (Math.random()-.5)*.35, vy: (Math.random()-.5)*.35, r: Math.random()*1.5+.5 }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      dots.forEach(d => { d.x+=d.vx; d.y+=d.vy; if(d.x<0||d.x>canvas.width)d.vx*=-1; if(d.y<0||d.y>canvas.height)d.vy*=-1; ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,Math.PI*2); ctx.fillStyle="rgba(239,68,68,0.55)"; ctx.fill(); });
      for(let a=0;a<dots.length;a++) for(let b=a+1;b<dots.length;b++) { const dx=dots[a].x-dots[b].x,dy=dots[a].y-dots[b].y,dist=Math.sqrt(dx*dx+dy*dy); if(dist<100){ctx.beginPath();ctx.moveTo(dots[a].x,dots[a].y);ctx.lineTo(dots[b].x,dots[b].y);ctx.strokeStyle=`rgba(239,68,68,${.12*(1-dist/100)})`;ctx.lineWidth=.6;ctx.stroke();} }
      raf = requestAnimationFrame(draw);
    }; draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize",resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

const widgets = [
  { label:"Active Leads",    value:"—",  change:"+12%", Icon:Activity, pos:"top-[12%] left-[6%]",    delay:0 },
  { label:"Monthly Revenue", value:"—",  change:"+8%",  Icon:Globe,    pos:"top-[18%] right-[5%]",   delay:0.25 },
  { label:"Moves / Month",   value:"—",  change:"+24%", Icon:Server,   pos:"bottom-[22%] left-[4%]", delay:0.5 },
  { label:"Cities Active",   value:"30+",change:"Live", Icon:Globe,    pos:"bottom-[18%] right-[4%]",delay:0.75 },
];

export default function AdminLoginPage() {
  const { adminSignIn } = useAuth();
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true); setError("");
    try {
      await adminSignIn(data.email, data.password, data.rememberMe);
    } catch (err) {
      setError(getApiError(err));
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-[#020617]">
      {/* Left hero */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden flex-col justify-center bg-[#020617]">
        <ParticleNetwork />
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0a1628]/85 to-[#020617]/95 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none" style={{backgroundImage:"linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px)",backgroundSize:"64px 64px"}} />
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-red-500/8 rounded-full blur-3xl pointer-events-none" />
        {widgets.map(({label,value,change,Icon,pos,delay}) => (
          <motion.div key={label} className={`absolute ${pos} bg-[#0F172A]/80 backdrop-blur-xl border border-white/8 rounded-xl px-4 py-3 min-w-[148px] shadow-2xl`}
            initial={{opacity:0,scale:.85,y:16}} animate={{opacity:1,scale:1,y:[0,-7,0]}}
            transition={{delay:delay+.8,duration:4.5,repeat:Infinity,repeatType:"reverse",ease:"easeInOut"}}
          >
            <div className="flex items-center gap-1.5 mb-1.5"><Icon className="w-3 h-3 text-red-500" /><span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest">{label}</span></div>
            <div className="text-[22px] font-bold text-white leading-none">{value}</div>
            <div className="text-[10px] font-semibold mt-1 text-emerald-400">{change !== "Live" ? "↑ " : "● "}{change}</div>
          </motion.div>
        ))}
        <div className="relative z-10 px-14 max-w-[520px]">
          <motion.div initial={{opacity:0,y:36}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
            <motion.div className="w-[72px] h-[72px] bg-red-500/10 border border-red-500/25 rounded-[18px] flex items-center justify-center mb-10 shadow-lg"
              animate={{boxShadow:["0 0 0px rgba(239,68,68,0)","0 0 32px rgba(239,68,68,0.35)","0 0 0px rgba(239,68,68,0)"]}}
              transition={{duration:3,repeat:Infinity}}
            ><ShieldCheck className="w-9 h-9 text-red-500" /></motion.div>
            <h1 className="text-[44px] lg:text-5xl font-bold text-white leading-[1.1] mb-4 tracking-tight">Admin Portal</h1>
            <p className="text-slate-400 text-[17px] leading-relaxed mb-10 max-w-sm">Secure access to the Sarkar Packers &amp; Movers management dashboard.</p>
            <div className="flex flex-wrap gap-2.5">
              {[{icon:Lock,label:"256-bit Encrypted"},{icon:ShieldCheck,label:"Session Protected"},{icon:Server,label:"Role-based Access"}].map(({icon:Icon,label}) => (
                <div key={label} className="flex items-center gap-1.5 bg-white/5 border border-white/8 rounded-full px-3 py-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-[11px] text-slate-400 font-medium">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right form */}
      <div className="w-full lg:w-[45%] relative flex items-center justify-center bg-[#020617] lg:bg-[#080f1e] p-5 sm:p-8 border-l border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 lg:hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-500/6 rounded-full blur-3xl" />
        </div>

        <motion.div className="relative z-10 w-full max-w-[400px]" initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.5}}>
          <div className="flex flex-col items-center gap-3 mb-7 lg:hidden">
            <motion.div className="w-14 h-14 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center"
              animate={{boxShadow:["0 0 0px rgba(239,68,68,0)","0 0 24px rgba(239,68,68,0.3)","0 0 0px rgba(239,68,68,0)"]}} transition={{duration:3,repeat:Infinity}}
            ><ShieldCheck className="w-7 h-7 text-red-500" /></motion.div>
            <div className="text-center"><h2 className="text-xl font-bold text-white">Admin Portal</h2><p className="text-slate-500 text-xs mt-0.5">Authorized access only</p></div>
          </div>

          <div className="bg-[#0F172A]/90 lg:bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="mb-6 hidden lg:block">
              <h2 className="text-2xl font-bold text-white">Secure Sign In</h2>
              <p className="text-slate-500 text-sm mt-1">Management dashboard access</p>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                  className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-3.5 mb-5 text-xs"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" /><span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Admin Email</label>
                <input {...register("email")} type="email" placeholder="admin@sarkarpackers.in" autoComplete="email"
                  className="w-full h-11 px-4 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-200"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <input {...register("password")} type={showPw?"text":"password"} placeholder="••••••••" autoComplete="current-password"
                    className="w-full h-11 px-4 pr-11 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-200"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400">{showPw?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}</button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input {...register("rememberMe")} id="remAdmin" type="checkbox" className="h-4 w-4 rounded accent-red-500" />
                  <label htmlFor="remAdmin" className="text-sm text-slate-500 select-none">Stay signed in</label>
                </div>
                <Link href="/forgot-password" className="text-xs text-red-500/70 hover:text-red-400 transition-colors duration-200">Forgot password?</Link>
              </div>
              <button type="submit" disabled={loading}
                className="w-full h-11 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-[0_0_24px_rgba(239,68,68,0.4)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Authenticating…</> : <><ShieldCheck className="w-4 h-4"/>Access Dashboard<ArrowRight className="w-4 h-4"/></>}
              </button>
            </form>
          </div>

          <div className="text-center mt-5 space-y-2">
            <Link href="/" className="block text-xs text-slate-600 hover:text-slate-400 transition-colors duration-200">← Back to main site</Link>
            <Link href="/login" className="block text-xs text-slate-600 hover:text-slate-400 transition-colors duration-200">Customer? Sign in here →</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
