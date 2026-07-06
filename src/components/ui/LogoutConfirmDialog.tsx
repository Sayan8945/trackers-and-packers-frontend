"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LogOut, X } from "lucide-react";

interface Props {
  open:      boolean;
  onConfirm: () => void;
  onCancel:  () => void;
  loading?:  boolean;
}

export default function LogoutConfirmDialog({ open, onConfirm, onCancel, loading }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            onClick={onCancel}
          />

          {/* Dialog */}
          <motion.div
            key="dialog"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{    opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[201]
                       w-[90vw] max-w-sm bg-[#0F172A] border border-white/10
                       rounded-2xl shadow-2xl p-6 text-center"
          >
            {/* Close */}
            <button
              onClick={onCancel}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-300 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon */}
            <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 rounded-full
                            flex items-center justify-center mx-auto mb-4">
              <LogOut className="w-6 h-6 text-red-400" />
            </div>

            <h2 className="text-white font-bold text-lg mb-1.5">Sign Out?</h2>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              You will be signed out of your account on this device.
            </p>

            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 h-10 rounded-xl border border-white/10 text-slate-300
                           hover:bg-white/5 text-sm font-medium transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className="flex-1 h-10 rounded-xl bg-red-600 hover:bg-red-700 text-white
                           text-sm font-semibold transition-all duration-200
                           disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading
                  ? <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing out…</>
                  : <><LogOut className="w-3.5 h-3.5" />Sign Out</>
                }
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
