"use client";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { STATS } from "@/lib/constants";
import { Users, Truck, MapPin, Trophy } from "lucide-react";

const icons = [Users, Truck, MapPin, Trophy];

export default function TrustStats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-brand-red/10 text-brand-red text-xs font-semibold uppercase tracking-wider rounded-full mb-3">
            Trusted by Thousands
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy">
            Numbers That Speak for Themselves
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STATS.map((stat, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-6 lg:p-8 text-center shadow-sm border border-gray-100 hover:border-brand-red/20 hover:shadow-card-hover transition-all duration-300">
                  <div className="w-14 h-14 bg-brand-red/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-red group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-brand-red group-hover:text-white transition-colors duration-300" />
                  </div>

                  <div className="text-4xl lg:text-5xl font-bold text-brand-navy mb-2">
                    {inView ? (
                      <CountUp
                        start={0}
                        end={stat.value}
                        duration={2.5}
                        separator=","
                        useEasing
                        delay={i * 0.2}
                      />
                    ) : (
                      "0"
                    )}
                    <span className="text-brand-red">{stat.suffix}</span>
                  </div>

                  <p className="text-gray-500 font-medium text-sm">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
