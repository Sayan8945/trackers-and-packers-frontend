"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { COMPANY } from "@/lib/constants";

export default function WhatsAppButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  const waLink = `https://wa.me/${COMPANY.whatsapp}?text=Hi%20Sarkar%20Packers!%20I'd%20like%20a%20free%20moving%20quote.`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="bg-white rounded-2xl shadow-2xl p-4 max-w-xs border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Sarkar Packers Support</p>
                <p className="text-xs text-green-500">● Online now</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              👋 Hi there! Need help with your move? Chat with us on WhatsApp for a free quote!
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2.5 px-4 rounded-xl text-center transition-colors duration-200"
            >
              Start Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl text-white transition-colors duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -8, 0] }}
        transition={{
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 0.2 },
        }}
      >
        {/* Ping animation */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
        {isExpanded ? (
          <X className="w-6 h-6 relative z-10" />
        ) : (
          <MessageCircle className="w-7 h-7 relative z-10" />
        )}
      </motion.button>
    </div>
  );
}
