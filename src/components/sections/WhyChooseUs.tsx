"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHY_CHOOSE_US } from "@/lib/constants";

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/3 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-navy/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left – Benefits */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-brand-red/10 text-brand-red text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                Why Sarkar Packers and Movers
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy mb-4 leading-tight">
                The Smarter Way to{" "}
                <span className="text-gradient">Move</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-10">
                We combine 17+ years of experience with modern technology to deliver a
                relocation experience that&apos;s stress-free, transparent, and reliable.
              </p>
            </motion.div>

            <div className="space-y-5">
              {WHY_CHOOSE_US.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-brand-red/10 rounded-xl flex items-center justify-center group-hover:bg-brand-red transition-colors duration-300 mt-0.5">
                    <CheckCircle2 className="w-5 h-5 text-brand-red group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy text-base mb-1 group-hover:text-brand-red transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10"
            >
              <Button size="lg" asChild className="group">
                <a href="#quote">
                  Get Your Free Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Right – Image with overlays */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative px-8 pb-10"
          >
            {/* Image container — no overflow-hidden so cards aren't clipped */}
            <div className="relative rounded-3xl shadow-2xl overflow-hidden">
              <div className="relative h-[520px]">
                <Image
                  src="/images/service4.jpeg"
                  alt="Professional movers handling goods"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating stat card — outside overflow-hidden, positioned on the wrapper */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 left-0 bg-white rounded-2xl shadow-2xl p-4 border border-gray-100 min-w-[140px] z-10"
            >
              <div className="flex items-baseline gap-1 mb-0.5">
                <span className="text-3xl font-extrabold text-brand-red leading-none">4.5</span>
                <span className="text-xl font-bold text-amber-400">★</span>
              </div>
              <div className="text-sm font-semibold text-gray-800">Google Rating</div>
              <div className="text-xs text-gray-400 mt-0.5">Based on 100+ reviews</div>
            </motion.div>

            {/* Floating badge — outside overflow-hidden */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-4 right-0 bg-brand-red rounded-2xl shadow-2xl p-4 text-white min-w-[120px] z-10"
            >
              <div className="text-3xl font-extrabold leading-none mb-0.5">5+</div>
              <div className="text-sm font-semibold opacity-95">Years of Trust</div>
              <div className="text-xs opacity-75 mt-0.5">Since 2021</div>
            </motion.div>

            {/* Background blob */}
            <div className="absolute -z-10 -top-6 -right-2 w-full h-full bg-brand-red/5 rounded-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
