"use client";

import type { ElementType } from "react";
import { motion } from "framer-motion";
import { FileText, Search, Package, Truck, CheckCircle } from "lucide-react";
import { PROCESS_STEPS } from "@/lib/constants";

const iconMap: Record<string, ElementType> = {
  FileText, Search, Package, Truck, CheckCircle,
};

export default function ProcessTimeline() {
  return (
    <section id="process" className="py-20 lg:py-28 bg-brand-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-brand-red/20 text-brand-red text-xs font-semibold uppercase tracking-wider rounded-full mb-3 border border-brand-red/20">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Your Move in{" "}
            <span className="text-gradient">5 Simple Steps</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            A seamless, transparent process designed to take the stress out of moving.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = iconMap[step.icon];
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative text-center group"
                >
                  {/* Step number & icon */}
                  <div className="relative mx-auto mb-5">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                      className="w-20 h-20 mx-auto bg-brand-navy-mid border-2 border-white/10 rounded-2xl flex flex-col items-center justify-center group-hover:border-brand-red group-hover:bg-brand-red/10 transition-all duration-300"
                    >
                      {Icon && <Icon className="w-7 h-7 text-brand-red mb-0.5 group-hover:scale-110 transition-transform duration-200" />}
                      <span className="text-[10px] font-bold text-gray-500 group-hover:text-brand-red transition-colors duration-200">
                        STEP {step.step}
                      </span>
                    </motion.div>

                    {/* Connector arrow between steps (desktop) */}
                    {i < PROCESS_STEPS.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 text-brand-red/30 text-lg">
                        →
                      </div>
                    )}
                  </div>

                  <h3 className="text-white font-bold text-base mb-2 group-hover:text-brand-red transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="#quote"
            className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-red-glow active:scale-95 text-base"
          >
            Start Your Move Today
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
