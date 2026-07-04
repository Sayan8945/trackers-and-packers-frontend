"use client";

import type { ElementType } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Home, Building2, Car, Bike, Warehouse, Package, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/constants";

const iconMap: Record<string, ElementType> = {
  Home, Building2, Car, Bike, Warehouse, Package,
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-brand-navy relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy-light to-brand-navy" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(225,29,72,1) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
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
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Complete Relocation{" "}
            <span className="text-gradient">Solutions</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From packing your belongings to setting up your new space — we handle every step
            with expertise and care.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-brand-navy-light rounded-2xl overflow-hidden border border-white/5 hover:border-brand-red/30 transition-all duration-300 hover:shadow-card-hover cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-light via-brand-navy/60 to-transparent" />

                  {/* Icon overlay */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center shadow-lg">
                    {Icon && <Icon className="w-5 h-5 text-white" />}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-white font-bold text-xl mb-2 group-hover:text-brand-red transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-1.5 mb-5">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
                        <CheckCircle className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-brand-red group-hover:border-brand-red group-hover:text-white transition-all duration-200"
                    asChild
                  >
                    <a href="#quote">
                      Get Quote
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
