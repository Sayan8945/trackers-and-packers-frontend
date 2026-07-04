"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Upload, Building2, Mail, Phone, MapPin, Palette, CheckCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { COMPANY } from "@/lib/constants";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [company, setCompany] = useState({
    name: COMPANY.name,
    email: COMPANY.email,
    phone: COMPANY.phone,
    address: COMPANY.address,
    tagline: COMPANY.tagline,
  });
  const [theme, setTheme] = useState({ primaryColor: "#E11D48", accentColor: "#0F172A" });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <Tabs defaultValue="company">
        <TabsList className="mb-6">
          <TabsTrigger value="company">Company Info</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        {/* Company Info */}
        <TabsContent value="company">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5"
          >
            <h3 className="font-bold text-brand-navy text-base border-b border-gray-100 pb-4">Company Information</h3>

            {/* Logo upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Company Logo</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <button className="flex items-center gap-2 text-sm font-medium text-brand-red hover:text-brand-red-dark border border-brand-red/30 rounded-xl px-4 py-2 transition-colors duration-200">
                    <Upload className="w-4 h-4" /> Upload Logo
                  </button>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</p>
                </div>
              </div>
            </div>

            {/* Fields */}
            {[
              { label: "Company Name", key: "name", icon: Building2, placeholder: "Company name" },
              { label: "Email Address", key: "email", icon: Mail, placeholder: "email@example.com", type: "email" },
              { label: "Phone Number", key: "phone", icon: Phone, placeholder: "+91 XXXXX XXXXX" },
              { label: "Tagline", key: "tagline", icon: Building2, placeholder: "Your company tagline" },
            ].map(({ label, key, icon: Icon, placeholder, type }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                <div className="relative">
                  <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type={type || "text"} value={company[key as keyof typeof company]}
                    onChange={e => setCompany(c => ({ ...c, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full h-11 pl-10 pr-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-all duration-200"
                  />
                </div>
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <textarea value={company.address} onChange={e => setCompany(c => ({ ...c, address: e.target.value }))}
                  rows={2} placeholder="Full address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red resize-none transition-all duration-200"
                />
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Theme */}
        <TabsContent value="theme">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6"
          >
            <h3 className="font-bold text-brand-navy text-base border-b border-gray-100 pb-4">Theme Settings</h3>
            {[
              { label: "Primary Color (Red)", key: "primaryColor" },
              { label: "Accent Color (Navy)", key: "accentColor" },
            ].map(({ label, key }) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-brand-navy text-sm">{label}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{theme[key as keyof typeof theme]}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl border border-gray-200 overflow-hidden">
                    <input type="color" value={theme[key as keyof typeof theme]}
                      onChange={e => setTheme(t => ({ ...t, [key]: e.target.value }))}
                      className="w-full h-full cursor-pointer border-0 p-0"
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
              <Palette className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-500">Theme changes are previewed here only. Apply them to <code className="bg-gray-200 px-1 rounded text-xs">tailwind.config.ts</code> for production.</p>
            </div>
          </motion.div>
        </TabsContent>

        {/* Account */}
        <TabsContent value="account">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5"
          >
            <h3 className="font-bold text-brand-navy text-base border-b border-gray-100 pb-4">Account Settings</h3>
            {[
              { label: "Current Password", placeholder: "••••••••" },
              { label: "New Password", placeholder: "Min. 8 characters" },
              { label: "Confirm New Password", placeholder: "Repeat password" },
            ].map(({ label, placeholder }) => (
              <div key={label}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                <input type="password" placeholder={placeholder}
                  className="w-full h-11 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-all duration-200"
                />
              </div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Save button */}
      <div className="flex items-center gap-4">
        <button onClick={handleSave}
          className="flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all duration-200 hover:shadow-red-glow active:scale-95"
        >
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
        {saved && (
          <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-green-600 text-sm font-medium">
            Settings saved successfully
          </motion.p>
        )}
      </div>
    </div>
  );
}
