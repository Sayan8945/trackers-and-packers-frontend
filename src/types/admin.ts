export interface Lead {
  id: string;
  name: string;
  phone: string;
  movingFrom: string;
  movingTo: string;
  status: "new" | "contacted" | "converted" | "lost";
  date: string;
  service: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalMoves: number;
  joinedDate: string;
  status: "active" | "inactive";
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  status: "published" | "draft";
  date: string;
  author: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  rating: number;
  text: string;
  status: "published" | "hidden";
  date: string;
}

export type StatusBadge = "new" | "contacted" | "converted" | "lost" | "active" | "inactive" | "published" | "draft" | "hidden";
