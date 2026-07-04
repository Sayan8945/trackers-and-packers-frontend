"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Send,
  Award,
  CheckCircle,
} from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { handleNavClick } from "@/lib/smoothScroll";

const services = [
  "Household Shifting",
  "Office Relocation",
  "Car Transportation",
  "Bike Transportation",
  "Local Shifting",
  "Domestic Relocation",
];

const cities = [
  "Coochbehar",
  "Siliguri",
  "Jalpaiguri",
  "Alipurduar",
  "Malda",
  "Durgapur",
  "Kolkata",
  "Guwahati",
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-brand-navy border-t border-white/5 relative overflow-hidden">
      {/* Top gradient line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-brand-red to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="relative h-14 w-44">
                <Image
                  src="/logo.png"
                  alt="Sarkar Packers and Movers Pvt. Ltd."
                  fill
                  sizes="176px"
                  className="object-contain"
                />
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Our team of <span className="text-white font-semibold">Sarkar Packers and Movers</span> is ready to help you with secure packing, safe transportation and stress-free shifting assistance. Call us today for a free estimation and experience a smooth shifting journey with professionals you can rely on
            </p>

            {/* Verified Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/20 rounded-xl px-3 py-2 mb-5">
              <Award className="w-4 h-4 text-brand-red" />
              <span className="text-brand-red text-xs font-semibold">Verified Moving Services</span>
            </div>

            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5 text-gray-400">
                <MapPin className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                <span>{COMPANY.address}</span>
              </div>
              <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors duration-200">
                <Phone className="w-4 h-4 text-brand-red flex-shrink-0" />
                {COMPANY.phone}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors duration-200">
                <Mail className="w-4 h-4 text-brand-red flex-shrink-0" />
                {COMPANY.email}
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services"
                    onClick={e => handleNavClick(e, "#services")}
                    className="text-gray-400 hover:text-brand-red text-sm transition-colors duration-200 flex items-center gap-2 group cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 bg-brand-red/40 rounded-full group-hover:bg-brand-red transition-colors duration-200" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              Cities We Serve
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {cities.map((city) => (
                <a key={city} href="#cities"
                  onClick={e => handleNavClick(e, "#cities")}
                  className="text-gray-400 hover:text-brand-red text-sm transition-colors duration-200 cursor-pointer"
                >
                  {city}
                </a>
              ))}
            </div>
            <div className="mt-4">
              <a href="#cities"
                onClick={e => handleNavClick(e, "#cities")}
                className="text-brand-red hover:text-brand-red-light text-xs font-semibold transition-colors duration-200 cursor-pointer"
              >
                View all 50+ cities →
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              Stay Updated
            </h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Get moving tips, special offers, and updates delivered to your inbox.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 rounded-xl px-4 py-3 border border-green-400/20"
              >
                <CheckCircle className="w-4 h-4" />
                <span>You&apos;re subscribed!</span>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-all duration-200"
                />
                <button
                  type="submit"
                  className="w-10 h-10 bg-brand-red hover:bg-brand-red-dark rounded-xl flex items-center justify-center transition-colors duration-200 flex-shrink-0"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>
            )}

            {/* Social links */}
            <div className="mt-6">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { Icon: Facebook, href: "#", label: "Facebook" },
                  { Icon: Instagram, href: "#", label: "Instagram" },
                  { Icon: Twitter, href: "#", label: "Twitter" },
                  { Icon: Youtube, href: "#", label: "YouTube" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 bg-white/5 hover:bg-brand-red border border-white/10 hover:border-brand-red rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Sarkar Packers and Movers Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            {["Privacy Policy", "Terms of Service", "Sitemap"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-gray-500 hover:text-gray-300 transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
