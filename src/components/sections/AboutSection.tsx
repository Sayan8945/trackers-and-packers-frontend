"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Target,
  Eye,
  Users,
  CheckCircle2,
  Truck,
  Package,
  ShieldCheck,
  Clock,
} from "lucide-react";

/* ── Story paragraphs ───────────────────────────────────── */
const STORY = [
  "At Sarkar Packers and Movers Pvt. Ltd., our focus is on making shifting hassle-free, easy and secure, so you do not have to worry about hidden complications, damaged goods and delayed deliveries during your moving process.",
  "With decades of work experience in the shifting industry, we have successfully completed hundreds of commercial and household relocation projects across many states of India. Our work involves long-distance moving solutions, home relocation, office shifting, vehicle transportation and packing services. Over the years, we have built a strong network of satisfied clients, repeat referrals and repeat clients — reflecting our dedication to customer satisfaction and quality service.",
  "Most clients face common shifting challenges such as lack of communication, improper packing, damaged goods and delayed deliveries. We decided to be different. Instead of providing basic relocation, we focus on complete shifting solutions with safe handling, proper planning and secure packing of every item. Our team consists of professional drivers, experienced relocation coordinators, trained packers and skilled loaders who manage every stage of the shifting procedure.",
];

/* ── Mission & Vision cards ─────────────────────────────── */
const MV = [
  {
    icon: Target,
    label: "Our Mission",
    color: "bg-brand-red",
    textColor: "text-brand-red",
    bgLight: "bg-brand-red/8",
    border: "border-brand-red/15",
    text: "To offer dependable, inexpensive and expert packing and moving services that make shifting easier for our clients. We use efficient transportation methods, quality packing materials and modern handling techniques to ensure every shift is completed safely and punctually.",
  },
  {
    icon: Eye,
    label: "Our Vision",
    color: "bg-brand-navy",
    textColor: "text-brand-navy",
    bgLight: "bg-brand-navy/5",
    border: "border-brand-navy/10",
    text: "To become Eastern India's most trusted relocation partner — a company where every client experiences stress-free, transparent and professional shifting, backed by a team that genuinely cares about their belongings and time.",
  },
];

/* ── Highlight stats ─────────────────────────────────────── */
const HIGHLIGHTS = [
  { icon: Users,      value: "5000+",  label: "Happy Clients" },
  { icon: Truck,      value: "10K+",   label: "Successful Moves" },
  { icon: ShieldCheck,value: "100%",   label: "Insured Shifts" },
  { icon: Clock,      value: "On Time",label: "Delivery Promise" },
];

/* ── Differentiators ─────────────────────────────────────── */
const DIFFERENTIATORS = [
  "Personalised shifting plan before every move",
  "Transparent pricing — no hidden charges",
  "Trained packers using premium packing materials",
  "Professional drivers & experienced coordinators",
  "Clear communication at every step",
  "Safe handling of fragile and valuable items",
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Subtle background decorations */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/20 to-transparent" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-brand-red/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-brand-navy/3 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-brand-red/10 text-brand-red text-xs font-semibold uppercase tracking-wider rounded-full mb-3">
            Who We Are
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy mb-4 leading-tight">
            About{" "}
            <span className="text-gradient">Sarkar Packers</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            A trusted name in relocation — built on years of experience, dedicated people and an unwavering commitment to safe, on-time shifting.
          </p>
        </motion.div>

        {/* ── Story + image grid ───────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center mb-20">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            {STORY.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-gray-600 text-base leading-relaxed"
              >
                {para}
              </motion.p>
            ))}

            {/* Differentiators */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="pt-4 grid sm:grid-cols-2 gap-2.5"
            >
              {DIFFERENTIATORS.map((item) => (
                <div key={item} className="flex items-start gap-2.5 group">
                  <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm text-gray-700 leading-snug">{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="relative h-[440px]">
                <Image
                  src="/images/service7.webp"
                  alt="Sarkar Packers and Movers team at work"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating badge — experience */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 z-10"
            >
              <div className="flex items-baseline gap-1 mb-0.5">
                <span className="text-3xl font-extrabold text-brand-red leading-none">5+</span>
              </div>
              <div className="text-sm font-semibold text-gray-800">Years of Trust</div>
              <div className="text-xs text-gray-400">Since 2021</div>
            </motion.div>

            {/* Floating badge — rating */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-4 -right-4 bg-brand-red rounded-2xl shadow-xl p-4 text-white z-10"
            >
              <div className="text-2xl font-extrabold leading-none mb-0.5">4.5 ★</div>
              <div className="text-xs font-semibold opacity-95">Google Rating</div>
            </motion.div>

            {/* Background blob */}
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-brand-red/5 rounded-3xl" />
          </motion.div>
        </div>

        {/* ── Highlight stats row ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20"
        >
          {HIGHLIGHTS.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-center group hover:border-brand-red/20 hover:shadow-card-hover transition-all duration-300"
            >
              <div className="w-11 h-11 bg-brand-red/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-red group-hover:scale-110 transition-all duration-300">
                <Icon className="w-5 h-5 text-brand-red group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="text-2xl font-bold text-brand-navy mb-0.5">{value}</div>
              <div className="text-xs text-gray-500 font-medium">{label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Mission & Vision ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-2"
        >
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 bg-brand-navy/5 text-brand-navy text-xs font-semibold uppercase tracking-wider rounded-full mb-3">
              Purpose & Direction
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-navy">
              Our Mission &amp; Vision
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {MV.map(({ icon: Icon, label, color, textColor, bgLight, border, text }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className={`relative rounded-2xl border ${border} ${bgLight} p-7 overflow-hidden group hover:-translate-y-1 transition-transform duration-300`}
              >
                {/* Background watermark icon */}
                <Icon
                  className={`absolute -bottom-4 -right-4 w-28 h-28 opacity-[0.04] ${textColor}`}
                  strokeWidth={1}
                />

                <div className="relative z-10">
                  <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-5 shadow-md`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className={`text-xl font-bold ${textColor} mb-3`}>{label}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
