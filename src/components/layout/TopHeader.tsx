import { Mail, Phone, Facebook, Instagram, Twitter, Youtube, Award } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export default function TopHeader() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[110] bg-brand-navy border-b border-white/5 py-2 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between text-xs">
          {/* Left – Verified Badge + Email */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-brand-red/20 border border-brand-red/30 rounded-full px-3 py-1">
              <Award className="w-3 h-3 text-brand-red" />
              <span className="text-brand-red font-semibold uppercase tracking-wide text-[10px]">
                Verified Moving Services
              </span>
            </div>
            <a
              href={`mailto:${COMPANY.email}`}
              className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Mail className="w-3 h-3" />
              <span>{COMPANY.email}</span>
            </a>
          </div>

          {/* Right – Social + Phone */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
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
                  className="text-gray-400 hover:text-brand-red transition-colors duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
            <div className="w-px h-4 bg-white/10" />
            <a
              href={`tel:${COMPANY.phone}`}
              className="flex items-center gap-1.5 text-white hover:text-brand-red transition-colors duration-200 font-medium"
            >
              <Phone className="w-3 h-3 text-brand-red" />
              <span>{COMPANY.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
