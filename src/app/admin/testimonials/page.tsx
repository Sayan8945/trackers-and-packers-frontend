"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MOCK_TESTIMONIALS } from "@/lib/mockData";
import type { Testimonial } from "@/types/admin";

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>(MOCK_TESTIMONIALS);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ name: "", role: "", city: "", rating: 5, text: "", status: "published" as "published" | "hidden" });

  const openAdd = () => { setEditing(null); setForm({ name: "", role: "", city: "", rating: 5, text: "", status: "published" }); setShowModal(true); };
  const openEdit = (t: Testimonial) => { setEditing(t); setForm({ name: t.name, role: t.role, city: t.city, rating: t.rating, text: t.text, status: t.status }); setShowModal(true); };

  const save = () => {
    if (!form.name.trim()) return;
    if (editing) {
      setItems(prev => prev.map(t => t.id === editing.id ? { ...t, ...form } : t));
    } else {
      setItems(prev => [{ id: Date.now().toString(), date: new Date().toISOString().split("T")[0], ...form }, ...prev]);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-brand-navy">Testimonials</h2>
          <p className="text-gray-500 text-sm">{items.length} reviews</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-red-glow"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((t, i) => (
          <motion.div key={t.id}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-sm transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-brand-navy text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Badge variant={t.status === "published" ? "success" : "secondary"}>{t.status}</Badge>
              </div>
            </div>

            <div className="flex gap-0.5 mb-2">
              {[1,2,3,4,5].map(s => (
                <Star key={s} className={`w-3.5 h-3.5 ${s <= t.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}`} />
              ))}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">&ldquo;{t.text}&rdquo;</p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{t.city} · {t.date}</span>
              <div className="flex gap-1">
                <button onClick={() => openEdit(t)}
                  className="w-7 h-7 flex items-center justify-center text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                ><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => setItems(prev => prev.filter(x => x.id !== t.id))}
                  className="w-7 h-7 flex items-center justify-center text-red-400 hover:bg-red-50 rounded-lg transition-colors duration-200"
                ><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-brand-navy mb-5">{editing ? "Edit Testimonial" : "Add Testimonial"}</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[{ label: "Name", key: "name" }, { label: "Role", key: "role" }].map(({ label, key }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                      <input value={form[key as keyof typeof form] as string} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                        className="w-full h-10 px-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">City Route (e.g. Kolkata → Mumbai)</label>
                  <input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                    className="w-full h-10 px-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(s => (
                      <button key={s} type="button" onClick={() => setForm(f => ({ ...f, rating: s }))}>
                        <Star className={`w-6 h-6 transition-colors duration-150 ${s <= form.rating ? "text-amber-400 fill-amber-400" : "text-gray-200 hover:text-amber-200"}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Review Text</label>
                  <textarea value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-red resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as "published" | "hidden" }))}
                    className="w-full h-10 px-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                  >
                    <option value="published">Published</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowModal(false)}
                  className="flex-1 h-10 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50"
                >Cancel</button>
                <button onClick={save}
                  className="flex-1 h-10 bg-brand-red text-white rounded-xl text-sm font-semibold hover:bg-brand-red-dark"
                >{editing ? "Update" : "Add"}</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
