"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Phone, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

export default function CTABanner() {
  return (
    <section id="contact" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy" />
      {/* Optimised background image via Next/Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=60"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-5"
          priority={false}
          aria-hidden="true"
        />
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-red/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(225,29,72,1) 1px, transparent 1px), linear-gradient(90deg, rgba(225,29,72,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Floating truck animation */}
        <motion.div
          animate={{ x: [-20, 20, -20], y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="flex justify-center mb-6"
        >
          <div className="w-20 h-20 bg-brand-red/20 rounded-2xl flex items-center justify-center border border-brand-red/30">
            <Truck className="w-10 h-10 text-brand-red" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1.5 bg-brand-red/20 text-brand-red text-xs font-semibold uppercase tracking-wider rounded-full mb-5 border border-brand-red/20">
            Limited Time Offer
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Contact{" "}
            <span className="text-gradient">Sarkar Packers and Movers</span> {" "}
             Today !
          </h2>

          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Searching for honest <span className="text-white font-semibold">Packers and Movers </span> for vehicle transportation services, household shifting services and office relocation services?
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="xl" asChild className="group shadow-red-glow">
              <a href="#quote">
                Get Free Quote Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </Button>
            <Button size="xl" variant="ghost-white" asChild>
              <a href={`tel:${COMPANY.phone}`}>
                <Phone className="w-5 h-5" />
                {COMPANY.phone}
              </a>
            </Button>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-gray-400">
            {["✓ Verified Moving Services", "✓ Free Survey", "✓ Transparent Pricing", "✓ GPS Tracking", "✓ Insured Moves"].map((item) => (
              <span key={item} className="text-gray-300">{item}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
