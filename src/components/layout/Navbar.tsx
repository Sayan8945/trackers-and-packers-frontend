"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, Phone,
  Home, Building2, Car, Bike, Warehouse, Package,
  LogIn, UserPlus, ShieldCheck, LayoutDashboard,
  LogOut, Settings, User, Award,
} from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { handleNavClick } from "@/lib/smoothScroll";
import {
  getAdminUser, isAdminAuthenticated, adminLogout,
  isUserAuthenticated, getUserUser, userLogout,
} from "@/lib/auth";
import type { User as AuthUser } from "@/types/auth";

/* ─── data ─────────────────────────────────────────────── */
const sidebarLinks = [
  { label: "Home",       href: "/" },
  { label: "About Us",   href: "#about" },
  { label: "Process",    href: "#process" },
  { label: "Network",    href: "#cities" },
  { label: "Blog",       href: "#why-us" },
  { label: "Contact Us", href: "#contact", badge: true },
];

const serviceItems = [
  { icon: Home,      label: "Household Shifting",  href: "#services" },
  { icon: Building2, label: "Office Relocation",   href: "#services" },
  { icon: Car,       label: "Car Transportation",  href: "#services" },
  { icon: Bike,      label: "Bike Transportation", href: "#services" },
  { icon: Warehouse, label: "Local Shifting",      href: "#services" },
  { icon: Package,   label: "Domestic Relocation", href: "#services" },
];

const desktopNavLinks = [
  { label: "Home",    href: "/" },
  { label: "About",   href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Network", href: "#cities" },
  { label: "Blog",    href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

/* ─── Admin user dropdown ───────────────────────────────── */
function AdminDropdown({ user, onLogout }: { user: AuthUser; onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button onClick={() => setOpen(!open)} onMouseEnter={() => setOpen(true)}
        className="flex items-center gap-1.5 group"
      >
        <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-white text-sm font-bold ring-2 ring-brand-red/30 group-hover:ring-brand-red transition-all duration-200">
          {user.name.charAt(0)}
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`absolute right-0 top-full mt-2 w-52 bg-brand-navy-light border border-white/10 rounded-2xl shadow-2xl p-1.5 transition-all duration-200 origin-top-right ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}>
        <div className="px-3 py-2.5 border-b border-white/5 mb-1">
          <p className="text-white text-sm font-semibold truncate">{user.name}</p>
          <p className="text-gray-500 text-xs truncate">{user.email}</p>
        </div>
        {[
          { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
          { icon: User, label: "Profile", href: "/admin/settings" },
          { icon: Settings, label: "Settings", href: "/admin/settings" },
        ].map(({ icon: Icon, label, href }) => (
          <Link key={label} href={href} onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 text-sm transition-all duration-150"
          >
            <Icon className="w-4 h-4 text-gray-400" />{label}
          </Link>
        ))}
        <div className="border-t border-white/5 mt-1 pt-1">
          <button onClick={() => { setOpen(false); onLogout(); }}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-red-400 hover:bg-red-400/10 text-sm transition-all duration-150"
          >
            <LogOut className="w-4 h-4" />Logout
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── User (customer) badge dropdown ────────────────────── */
function UserDropdown({ user, onLogout }: { user: AuthUser; onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button onClick={() => setOpen(!open)} onMouseEnter={() => setOpen(true)}
        className="flex items-center gap-1.5 group"
      >
        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold ring-2 ring-green-600/30 group-hover:ring-green-500 transition-all duration-200">
          {user.name.charAt(0)}
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`absolute right-0 top-full mt-2 w-52 bg-brand-navy-light border border-white/10 rounded-2xl shadow-2xl p-1.5 transition-all duration-200 origin-top-right ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}>
        <div className="px-3 py-2.5 border-b border-white/5 mb-1">
          <p className="text-white text-sm font-semibold truncate">{user.name}</p>
          <p className="text-gray-500 text-xs truncate">{user.email}</p>
        </div>
        <div className="border-t border-white/5 mt-1 pt-1">
          <button onClick={() => { setOpen(false); onLogout(); }}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-red-400 hover:bg-red-400/10 text-sm"
          >
            <LogOut className="w-4 h-4" />Logout
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Navbar ───────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<AuthUser | null>(null);
  const [userUser, setUserUser] = useState<AuthUser | null>(null);
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [userAuthed, setUserAuthed] = useState(false);
  const router = useRouter();

  const syncAuth = () => {
    setAdminUser(getAdminUser());
    setUserUser(getUserUser());
    setAdminAuthed(isAdminAuthenticated());
    setUserAuthed(isUserAuthenticated());
  };

  useEffect(() => {
    syncAuth();
    window.addEventListener("focus", syncAuth);
    return () => window.removeEventListener("focus", syncAuth);
  }, []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, []);

  const handleAdminLogout = () => { adminLogout(); syncAuth(); router.push("/"); };
  const handleUserLogout = () => { userLogout(); syncAuth(); router.push("/"); };
  const handleAdminPortal = () => router.push(adminAuthed ? "/admin" : "/admin-login");

  return (
    <>
      {/* ── Header ─────────────────────────────────────── */}
      <header className={`fixed top-0 md:top-[36px] left-0 right-0 z-[100] w-full transition-all duration-300 ${scrolled ? "bg-brand-navy/95 backdrop-blur-xl shadow-2xl border-b border-white/5" : "bg-brand-navy"}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-2">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-2 lg:gap-4">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="relative h-10 w-32 sm:h-12 sm:w-40 lg:h-16 lg:w-52">
                <Image src="/logo.png" alt="Sarkar Packers and Movers Pvt. Ltd." fill
                  sizes="(max-width:640px) 144px,(max-width:1024px) 176px,256px" className="object-contain" priority
                />
              </div>
            </Link>

            {/* ── Desktop nav ─────────────────────────── */}
            <nav className="hidden xl:flex items-center gap-0.5 flex-1 justify-center">
              {desktopNavLinks.map(link => (
                <a key={link.label} href={link.href}
                  onClick={e => handleNavClick(e, link.href)}
                  className="px-3.5 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-white/5 whitespace-nowrap cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
              {/* Services mega */}
              <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
                <button className="flex items-center gap-1 px-3.5 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-white/5 whitespace-nowrap">
                  Services <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-brand-navy-light border border-white/10 rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-1.5 transition-all duration-200 origin-top ${servicesOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}>
                  {serviceItems.map(({ icon: Icon, label, href }) => (
                    <a key={label} href={href}
                      onClick={e => handleNavClick(e, href)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-brand-red/10 hover:text-brand-red text-gray-300 transition-all duration-150 group cursor-pointer"
                    >
                      <div className="w-7 h-7 bg-brand-red/10 rounded-lg flex items-center justify-center group-hover:bg-brand-red/20 flex-shrink-0">
                        <Icon className="w-3.5 h-3.5 text-brand-red" />
                      </div>
                      <span className="text-sm font-medium">{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </nav>

            {/* ── Desktop right CTAs ───────────────────── */}
            <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
              {adminAuthed && adminUser ? (
                /* Admin logged in */
                <>
                  <Link href="/admin"
                    className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-200"
                  >
                    <LayoutDashboard className="w-4 h-4" />Dashboard
                  </Link>
                  <AdminDropdown user={adminUser} onLogout={handleAdminLogout} />
                </>
              ) : userAuthed && userUser ? (
                /* Customer logged in */
                <>
                  <UserDropdown user={userUser} onLogout={handleUserLogout} />
                  <button onClick={handleAdminPortal}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-brand-navy-mid hover:bg-brand-navy-light border border-white/10 rounded-xl transition-all duration-200 active:scale-95"
                  >
                    <ShieldCheck className="w-4 h-4 text-brand-red" />Admin Portal
                  </button>
                  <a href={`tel:${COMPANY.phone}`}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-all duration-200 active:scale-95"
                  >
                    <Phone className="w-4 h-4" />Call Now
                  </a>
                </>
              ) : (
                /* Not logged in */
                <>
                  <Link href="/login"
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white border border-white/30 hover:border-white/60 hover:bg-white/5 rounded-xl transition-all duration-200"
                  >
                    <LogIn className="w-4 h-4" />Login
                  </Link>
                  <Link href="/signup"
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-red to-rose-600 hover:from-brand-red-dark hover:to-brand-red rounded-xl shadow-md hover:shadow-red-glow active:scale-95 transition-all duration-200"
                  >
                    <UserPlus className="w-4 h-4" />Sign Up
                  </Link>
                  <button onClick={handleAdminPortal}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-brand-navy-mid hover:bg-brand-navy-light border border-white/10 rounded-xl transition-all duration-200 active:scale-95"
                  >
                    <ShieldCheck className="w-4 h-4 text-brand-red" />Admin Portal
                  </button>
                  <a href={`tel:${COMPANY.phone}`}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-all duration-200 active:scale-95"
                  >
                    <Phone className="w-4 h-4" />Call Now
                  </a>
                </>
              )}
            </div>

            {/* ── Mobile right cluster ─────────────────── */}
            <div className="flex lg:hidden items-center gap-1.5 flex-shrink-0">

              {/* Sign Up — only when NO user or admin logged in */}
              {!userAuthed && !adminAuthed && (
                <Link href="/signup"
                  className="flex items-center gap-1 h-9 px-2.5 sm:px-3 text-xs font-semibold text-white bg-gradient-to-r from-brand-red to-rose-600 rounded-lg whitespace-nowrap active:scale-95 transition-all duration-200"
                >
                  <UserPlus className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="hidden xs:inline sm:inline">Sign Up</span>
                </Link>
              )}

              {/* Admin Portal — always visible */}
              <button onClick={handleAdminPortal}
                className="flex items-center gap-1 h-9 px-2.5 sm:px-3 text-xs font-semibold text-white bg-brand-navy-mid border border-white/15 rounded-lg whitespace-nowrap active:scale-95 transition-all duration-200"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                <span className="hidden sm:inline">Admin</span>
              </button>

              {/* Hamburger */}
              <button onClick={() => setMobileOpen(!mobileOpen)}
                className="h-9 w-9 flex items-center justify-center text-white rounded-lg hover:bg-white/10 transition-colors duration-200"
                aria-label="Toggle menu" aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Mobile overlay ──────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div key="overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileOpen(false)} aria-hidden
          />
        )}
      </AnimatePresence>

      {/* ── Mobile drawer — NO auth items, only nav + CTA ─ */}
      <motion.div
        initial={false}
        animate={{ x: mobileOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="fixed right-0 top-0 bottom-0 w-[300px] sm:w-[320px] bg-brand-navy border-l border-white/10 z-50 lg:hidden flex flex-col"
        aria-hidden={!mobileOpen}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
          <div className="relative h-10 w-32">
            <Image src="/logo.png" alt="Sarkar Packers" fill sizes="128px" className="object-contain" />
          </div>
          <button onClick={() => setMobileOpen(false)}
            className="text-gray-400 hover:text-white p-1.5 hover:bg-white/10 rounded-lg transition-colors duration-200"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable nav area */}
        <div
          className="flex-1 overflow-y-auto overscroll-contain px-4 py-4"
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          <nav className="space-y-0.5">
            {sidebarLinks.map((link, i) => (
              <motion.div key={link.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: mobileOpen ? 1 : 0, x: mobileOpen ? 0 : 20 }}
                transition={{ delay: i * 0.04, duration: 0.25 }}
              >
                <a href={link.href}
                  onClick={e => handleNavClick(e, link.href, () => setMobileOpen(false))}
                  className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 text-sm font-medium cursor-pointer"
                >
                  {link.badge && <Award className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />}
                  {link.label}
                </a>
              </motion.div>
            ))}

            {/* Services sub-group */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: mobileOpen ? 1 : 0, x: mobileOpen ? 0 : 20 }}
              transition={{ delay: sidebarLinks.length * 0.04, duration: 0.25 }}
              className="px-4 pt-4 pb-1"
            >
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Services</p>
              {serviceItems.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href}
                  onClick={e => handleNavClick(e, href, () => setMobileOpen(false))}
                  className="flex items-center gap-3 py-2.5 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-brand-red flex-shrink-0" />
                  <span className="text-sm">{label}</span>
                </a>
              ))}
            </motion.div>
          </nav>
        </div>

        {/* ── Sticky footer CTA — always visible ────────── */}
        <div className="flex-shrink-0 px-4 py-4 border-t border-white/10 space-y-2.5 bg-brand-navy">
          <a href={`tel:${COMPANY.phone}`}
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full h-11 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition-colors duration-200 active:scale-95"
          >
            <Phone className="w-4 h-4" />
            <span> Call Now {COMPANY.phone}</span>
          </a>
          <a href="#quote"
            onClick={e => handleNavClick(e, "#quote", () => setMobileOpen(false))}
            className="flex items-center justify-center gap-2 w-full h-10 bg-brand-red/10 hover:bg-brand-red/20 border border-brand-red/20 text-brand-red text-sm font-semibold rounded-xl transition-colors duration-200 cursor-pointer"
          >
            Get Free Quote
          </a>
        </div>
      </motion.div>
    </>
  );
}
