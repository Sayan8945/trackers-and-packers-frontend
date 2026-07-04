"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

// Lazy-load Maps — excluded from initial bundle, SSR disabled (needs window)
const IndiaCoverageMap = dynamic(
  () => import("@/components/coverage/IndiaCoverageMap"),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse bg-brand-navy-light rounded-3xl h-[350px] lg:h-[500px] w-full" />
    ),
  }
);

/* ── Stats ──────────────────────────────────────────────── */
const COVERAGE_STATS = [
  { value: 30,   suffix: "+", label: "Cities Covered" },
  { value: 4,    suffix: "",  label: "States Served"  },
  { value: 5,   suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "+", label: "Successful Relocations" },
];

/* ── Featured cities grouped by state ──────────────────── */
const STATE_CITIES: { state: string; color: string; cities: string[] }[] = [
  {
    state: "West Bengal",
    color: "text-brand-red",
    cities: ["Siliguri (HQ)", "Kolkata", "Howrah", "Hooghly", "Durgapur", "Asansol", "Kharagpur", "Haldia", "Bardhaman", "Malda", "Jalpaiguri", "Cooch Behar", "Alipurduar", "Dinhata", "Mathabhanga", "Mal Bazar"],
  },
  {
    state: "Assam",
    color: "text-blue-400",
    cities: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon"],
  },
  {
    state: "Bihar",
    color: "text-amber-400",
    cities: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Purnia"],
  },
  {
    state: "Odisha",
    color: "text-emerald-400",
    cities: ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Puri"],
  },
  {
    state: "Jharkhand",
    color: "text-purple-400",
    cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
  },
];

export default function CitySection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="cities" className="py-20 lg:py-28 bg-brand-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy-light to-brand-navy" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(225,29,72,1) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 bg-brand-red/20 text-brand-red text-xs font-semibold uppercase tracking-wider rounded-full mb-3 border border-brand-red/20">
            Our Service Area
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Coverage Across{" "}
            <span className="text-gradient">Eastern India</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Serving Eastern India with trusted packing and moving solutions —
            headquartered in Kolkata with operations across West Bengal, Assam,
            Bihar, Odisha, and Jharkhand.
          </p>
        </motion.div>

        {/* ── Stats row ──────────────────────────────────── */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {COVERAGE_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold text-white mb-0.5">
                {inView ? (
                  <CountUp end={stat.value} duration={2.2} separator="," delay={i * 0.15} />
                ) : "0"}
                <span className="text-brand-red">{stat.suffix}</span>
              </div>
              <p className="text-gray-400 text-xs font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Map ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 rounded-3xl shadow-2xl overflow-hidden"
        >
          <IndiaCoverageMap />
        </motion.div>

        {/* ── City grid by state + CTA ────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* State-grouped city list */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <h3 className="text-lg font-bold text-white">Locations We Serve</h3>
            {STATE_CITIES.map((group, gi) => (
              <motion.div
                key={group.state}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.07 }}
              >
                <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${group.color}`}>
                  {group.state}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.cities.map(city => (
                    <span key={city}
                      className="inline-flex items-center gap-1 bg-white/5 border border-white/8 rounded-full px-2.5 py-1 text-xs text-gray-300 hover:border-brand-red/30 hover:text-white transition-colors duration-150"
                    >
                      <MapPin className="w-2.5 h-2.5 text-brand-red flex-shrink-0" />
                      {city}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 h-full flex flex-col">
              <h3 className="text-white font-bold text-lg mb-2">
                Don&apos;t see your city?
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                Our service area covers 30+ cities across Eastern India. We can often
                accommodate moves to and from locations not listed here — just reach out
                and we&apos;ll confirm availability.
              </p>

              <div className="space-y-3 mb-6 flex-1">
                {[
                  "Free quote within 30 minutes",
                  "Door-to-door service across Eastern India",
                  "GPS-tracked vehicles on all routes",
                  "Insurance coverage on every move",
                ].map(f => (
                  <div key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 bg-brand-red rounded-full flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>

              <a href="#quote"
                className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-red-glow active:scale-95 self-start group"
              >
                Check availability
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
