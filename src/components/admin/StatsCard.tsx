"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  change?: string;
  positive?: boolean;
}

export default function StatsCard({ title, value, suffix = "", icon: Icon, color, bgColor, change, positive }: StatsCardProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        {change && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${positive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
            {change}
          </span>
        )}
      </div>
      <div className="text-3xl font-bold text-brand-navy mb-1">
        {inView ? <CountUp end={value} duration={2} separator="," /> : "0"}
        <span className={color}>{suffix}</span>
      </div>
      <p className="text-gray-500 text-sm">{title}</p>
    </motion.div>
  );
}
