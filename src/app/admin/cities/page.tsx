"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CITIES } from "@/lib/constants";

export default function CitiesAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-brand-navy">Cities Coverage</h2>
        <p className="text-gray-500 text-sm">{CITIES.length} cities configured</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              {["City", "Type", "Status"].map(h => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CITIES.map((city, i) => (
              <motion.tr key={city.name}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                className="border-b border-gray-50 hover:bg-gray-50/70 transition-colors duration-150 last:border-0"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-4 h-4 flex-shrink-0 ${city.isHQ ? "text-brand-red" : "text-gray-400"}`} />
                    <span className="font-medium text-brand-navy">{city.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <Badge variant={city.isHQ ? "default" : "secondary"}>{city.isHQ ? "Headquarters" : "Service City"}</Badge>
                </td>
                <td className="px-5 py-3.5">
                  <Badge variant="success">Active</Badge>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
