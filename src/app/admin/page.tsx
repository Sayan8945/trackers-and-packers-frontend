"use client";

import { motion } from "framer-motion";
import { Users, UserCheck, Briefcase, TrendingUp, PhoneCall, CheckCircle, Clock, XCircle } from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import { MOCK_LEADS } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";

const STATUS_CONFIG = {
  new: { label: "New", variant: "info" as const },
  contacted: { label: "Contacted", variant: "warning" as const },
  converted: { label: "Converted", variant: "success" as const },
  lost: { label: "Closed", variant: "danger" as const },
};

export default function AdminDashboard() {
  const recentLeads = MOCK_LEADS.slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-2xl font-bold text-brand-navy">Good morning, Admin 👋</h2>
        <p className="text-gray-500 text-sm mt-1">Here&apos;s what&apos;s happening with Sarkar Packers today.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatsCard title="Total Leads" value={248} suffix="" icon={Users} color="text-blue-600" bgColor="bg-blue-50" change="+12%" positive />
        <StatsCard title="Customers" value={MOCK_LEADS.filter(l => l.status === "converted").length + 184} suffix="" icon={UserCheck} color="text-green-600" bgColor="bg-green-50" change="+8%" positive />
        <StatsCard title="Active Services" value={6} suffix="" icon={Briefcase} color="text-purple-600" bgColor="bg-purple-50" />
        <StatsCard title="Monthly Enquiries" value={42} suffix="" icon={TrendingUp} color="text-brand-red" bgColor="bg-brand-red/10" change="+24%" positive />
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: PhoneCall, label: "New Leads", value: MOCK_LEADS.filter(l => l.status === "new").length, color: "text-blue-500", bg: "bg-blue-50" },
          { icon: Clock, label: "Contacted", value: MOCK_LEADS.filter(l => l.status === "contacted").length, color: "text-amber-500", bg: "bg-amber-50" },
          { icon: CheckCircle, label: "Converted", value: MOCK_LEADS.filter(l => l.status === "converted").length, color: "text-green-500", bg: "bg-green-50" },
          { icon: XCircle, label: "Lost", value: MOCK_LEADS.filter(l => l.status === "lost").length, color: "text-red-500", bg: "bg-red-50" },
        ].map(({ icon: Icon, label, value, color, bg }, i) => (
          <motion.div key={label}
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-3"
          >
            <div className={`w-9 h-9 ${bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <div>
              <div className="text-xl font-bold text-brand-navy">{value}</div>
              <div className="text-xs text-gray-500">{label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Leads */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-brand-navy">Recent Leads</h3>
          <a href="/admin/leads" className="text-brand-red text-sm font-medium hover:text-brand-red-dark transition-colors duration-200">
            View all →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50">
                {["Name", "Phone", "Route", "Service", "Status", "Date"].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead, i) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors duration-150"
                >
                  <td className="px-6 py-3.5 font-medium text-brand-navy">{lead.name}</td>
                  <td className="px-6 py-3.5 text-gray-500">{lead.phone}</td>
                  <td className="px-6 py-3.5 text-gray-500">{lead.movingFrom} → {lead.movingTo}</td>
                  <td className="px-6 py-3.5 text-gray-500">{lead.service}</td>
                  <td className="px-6 py-3.5">
                    <Badge variant={STATUS_CONFIG[lead.status].variant}>{STATUS_CONFIG[lead.status].label}</Badge>
                  </td>
                  <td className="px-6 py-3.5 text-gray-400">{lead.date}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
