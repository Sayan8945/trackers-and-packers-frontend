"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Users, UserCheck, Briefcase, MapPin,
  FileText, Star, Settings, LogOut, ChevronLeft, ChevronRight,
  Truck, Menu,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/customers", label: "Customers", icon: UserCheck },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/cities", label: "Cities", icon: MapPin },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { adminUser: user, adminSignOut: signOut } = useAuth();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-full bg-brand-navy z-30 flex flex-col border-r border-white/5 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/5 min-h-[72px]">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="relative h-10 w-32">
                <Image src="/logo.jpeg" alt="Sarkar Packers" fill className="object-contain brightness-0 invert" sizes="128px" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {collapsed && (
          <div className="w-9 h-9 bg-brand-red rounded-xl flex items-center justify-center mx-auto">
            <Truck className="w-4 h-4 text-white" />
          </div>
        )}
        {!collapsed && (
          <button onClick={onToggle}
            className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200 ml-2 flex-shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
        <div className="space-y-0.5 px-2">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const active = isActive(href, exact);
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  active
                    ? "bg-brand-red text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
                title={collapsed ? label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User + Logout */}
      <div className="border-t border-white/5 p-3">
        {!collapsed && user && (
          <div className="flex items-center gap-3 px-2 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">{user.name}</p>
              <p className="text-gray-500 text-[10px] truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button onClick={signOut}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-sm font-medium"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        {collapsed && (
          <button onClick={onToggle}
            className="flex items-center justify-center w-full p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors duration-200 mt-1"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.aside>
  );
}
