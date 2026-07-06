"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Types ─────────────────────────────────────────────── */
export type ToastVariant = "success" | "error" | "info";

export interface ToastMessage {
  id:       string;
  title:    string;
  variant:  ToastVariant;
}

/* ── Context ────────────────────────────────────────────── */
interface ToastContextValue {
  show: (title: string, variant?: ToastVariant) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

/* ── Icon map ───────────────────────────────────────────── */
const icons: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0" />,
  error:   <XCircle    className="w-4.5 h-4.5 text-red-400    flex-shrink-0" />,
  info:    <Info       className="w-4.5 h-4.5 text-blue-400   flex-shrink-0" />,
};

const variantStyles: Record<ToastVariant, string> = {
  success: "border-emerald-500/30 bg-emerald-500/10",
  error:   "border-red-500/30    bg-red-500/10",
  info:    "border-blue-500/30   bg-blue-500/10",
};

/* ── Provider + renderer ────────────────────────────────── */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const show = React.useCallback((title: string, variant: ToastVariant = "info") => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, title, variant }]);
    // Auto-remove after 3.5s
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}

        <AnimatePresence>
          {toasts.map(toast => (
            <ToastPrimitive.Root key={toast.id} open asChild forceMount>
              <motion.div
                initial={{ opacity: 0, y: -16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0,   scale: 1    }}
                exit={{    opacity: 0, y: -12,  scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl",
                  "text-sm text-white min-w-[260px] max-w-[360px]",
                  variantStyles[toast.variant]
                )}
              >
                {icons[toast.variant]}
                <ToastPrimitive.Title className="flex-1 font-medium leading-snug">
                  {toast.title}
                </ToastPrimitive.Title>
                <ToastPrimitive.Close asChild>
                  <button
                    onClick={() => dismiss(toast.id)}
                    className="text-white/40 hover:text-white/80 transition-colors ml-1"
                    aria-label="Dismiss"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </ToastPrimitive.Close>
              </motion.div>
            </ToastPrimitive.Root>
          ))}
        </AnimatePresence>

        {/* Viewport — top-center */}
        <ToastPrimitive.Viewport
          className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 items-center pointer-events-none [&>*]:pointer-events-auto"
        />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}
