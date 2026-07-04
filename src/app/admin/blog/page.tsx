"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MOCK_BLOGS } from "@/lib/mockData";
import type { BlogPost } from "@/types/admin";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(MOCK_BLOGS);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState({ title: "", category: "", excerpt: "", status: "draft" as "published" | "draft" });

  const openAdd = () => { setEditing(null); setForm({ title: "", category: "", excerpt: "", status: "draft" }); setShowModal(true); };
  const openEdit = (p: BlogPost) => { setEditing(p); setForm({ title: p.title, category: p.category, excerpt: p.excerpt, status: p.status }); setShowModal(true); };

  const save = () => {
    if (!form.title.trim()) return;
    if (editing) {
      setPosts(prev => prev.map(p => p.id === editing.id ? { ...p, ...form } : p));
    } else {
      const newPost: BlogPost = {
        id: Date.now().toString(),
        slug: form.title.toLowerCase().replace(/\s+/g, "-"),
        author: "Admin",
        date: new Date().toISOString().split("T")[0],
        ...form,
      };
      setPosts(prev => [newPost, ...prev]);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-brand-navy">Blog Posts</h2>
          <p className="text-gray-500 text-sm">{posts.length} articles</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-red-glow active:scale-95"
        >
          <Plus className="w-4 h-4" /> Add Blog
        </button>
      </div>

      <div className="grid gap-4">
        {posts.map((post, i) => (
          <motion.div key={post.id}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-sm transition-shadow duration-200"
          >
            <div className="w-10 h-10 bg-brand-red/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-brand-red" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-semibold text-brand-navy truncate">{post.title}</h3>
                <Badge variant={post.status === "published" ? "success" : "secondary"} className="flex-shrink-0">
                  {post.status}
                </Badge>
              </div>
              <p className="text-gray-500 text-xs truncate">{post.excerpt}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                <span>{post.category}</span>
                <span>·</span>
                <span>{post.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => openEdit(post)}
                className="w-8 h-8 flex items-center justify-center text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              ><Pencil className="w-4 h-4" /></button>
              <button onClick={() => setPosts(prev => prev.filter(p => p.id !== post.id))}
                className="w-8 h-8 flex items-center justify-center text-red-400 hover:bg-red-50 rounded-lg transition-colors duration-200"
              ><Trash2 className="w-4 h-4" /></button>
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
              <h3 className="text-lg font-bold text-brand-navy mb-5">{editing ? "Edit Blog Post" : "Add Blog Post"}</h3>
              <div className="space-y-4">
                {[
                  { label: "Title", key: "title", placeholder: "Post title" },
                  { label: "Category", key: "category", placeholder: "e.g. Tips, Packing, Office" },
                  { label: "Excerpt", key: "excerpt", placeholder: "Short description" },
                ].map(({ label, key, placeholder }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                    <input value={form[key as keyof typeof form]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full h-10 px-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as "published" | "draft" }))}
                    className="w-full h-10 px-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowModal(false)}
                  className="flex-1 h-10 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                >Cancel</button>
                <button onClick={save}
                  className="flex-1 h-10 bg-brand-red text-white rounded-xl text-sm font-semibold hover:bg-brand-red-dark transition-colors duration-200"
                >{editing ? "Update" : "Create"}</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
