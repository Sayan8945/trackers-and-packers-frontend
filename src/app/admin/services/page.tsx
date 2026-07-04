"use client";

import { motion } from "framer-motion";
import { Home, Building2, Car, Bike, Warehouse, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SERVICES } from "@/lib/constants";

const icons: Record<string, React.ElementType> = { Home, Building2, Car, Bike, Warehouse, Package };

export default function ServicesAdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-brand-navy">Services</h2>
          <p className="text-gray-500 text-sm">{SERVICES.length} active services</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SERVICES.map((service, i) => {
          const Icon = icons[service.icon];
          return (
            <motion.div key={service.id}
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-11 h-11 bg-brand-red/10 rounded-xl flex items-center justify-center">
                  {Icon && <Icon className="w-5 h-5 text-brand-red" />}
                </div>
                <Badge variant="success">Active</Badge>
              </div>
              <h3 className="font-bold text-brand-navy mb-1">{service.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-3">{service.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {service.features.map(f => (
                  <span key={f} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{f}</span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
