"use client";

import { Bell, Search, Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface AdminHeaderProps {
  title: string;
  onMenuClick: () => void;
}

export default function AdminHeader({ title, onMenuClick }: AdminHeaderProps) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-100 h-16 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick}
          className="lg:hidden text-gray-500 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-brand-navy">{title}</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-48 lg:w-64">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input placeholder="Search…" className="bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none w-full" />
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors duration-200">
          <Bell className="w-4.5 h-4.5 w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-red rounded-full" />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl bg-brand-red flex items-center justify-center text-white text-sm font-bold cursor-pointer">
          {user?.name?.charAt(0) ?? "A"}
        </div>
      </div>
    </header>
  );
}
