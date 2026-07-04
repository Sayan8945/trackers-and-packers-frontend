import type { Lead, Customer, BlogPost, Testimonial } from "@/types/admin";

export const MOCK_LEADS: Lead[] = [
  { id: "1", name: "Ravi Kumar", phone: "+91 98765 11111", movingFrom: "Kolkata", movingTo: "Mumbai", status: "new", date: "2024-06-10", service: "Household Shifting" },
  { id: "2", name: "Sunita Pal", phone: "+91 98765 22222", movingFrom: "Delhi", movingTo: "Bangalore", status: "contacted", date: "2024-06-09", service: "Office Relocation" },
  { id: "3", name: "Arjun Mehta", phone: "+91 98765 33333", movingFrom: "Pune", movingTo: "Hyderabad", status: "converted", date: "2024-06-08", service: "Car Transport" },
  { id: "4", name: "Priya Singh", phone: "+91 98765 44444", movingFrom: "Chennai", movingTo: "Kolkata", status: "new", date: "2024-06-07", service: "Household Shifting" },
  { id: "5", name: "Amit Sharma", phone: "+91 98765 55555", movingFrom: "Ahmedabad", movingTo: "Delhi", status: "lost", date: "2024-06-06", service: "Bike Transport" },
  { id: "6", name: "Deepa Roy", phone: "+91 98765 66666", movingFrom: "Kolkata", movingTo: "Pune", status: "contacted", date: "2024-06-05", service: "Warehousing" },
  { id: "7", name: "Vikash Gupta", phone: "+91 98765 77777", movingFrom: "Mumbai", movingTo: "Kolkata", status: "converted", date: "2024-06-04", service: "Household Shifting" },
  { id: "8", name: "Neha Joshi", phone: "+91 98765 88888", movingFrom: "Jaipur", movingTo: "Lucknow", status: "new", date: "2024-06-03", service: "Office Relocation" },
  { id: "9", name: "Suresh Das", phone: "+91 98765 99999", movingFrom: "Patna", movingTo: "Guwahati", status: "contacted", date: "2024-06-02", service: "Car Transport" },
  { id: "10", name: "Kavita Nair", phone: "+91 98765 10101", movingFrom: "Bangalore", movingTo: "Chennai", status: "new", date: "2024-06-01", service: "Household Shifting" },
  { id: "11", name: "Rahul Verma", phone: "+91 98765 10201", movingFrom: "Kolkata", movingTo: "Delhi", status: "converted", date: "2024-05-31", service: "Packing Services" },
  { id: "12", name: "Anjali Bose", phone: "+91 98765 10301", movingFrom: "Hyderabad", movingTo: "Mumbai", status: "new", date: "2024-05-30", service: "Household Shifting" },
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: "1", name: "Ravi Kumar", email: "ravi@example.com", phone: "+91 98765 11111", city: "Mumbai", totalMoves: 2, joinedDate: "2023-01-15", status: "active" },
  { id: "2", name: "Arjun Mehta", email: "arjun@example.com", phone: "+91 98765 33333", city: "Hyderabad", totalMoves: 1, joinedDate: "2023-03-22", status: "active" },
  { id: "3", name: "Vikash Gupta", email: "vikash@example.com", phone: "+91 98765 77777", city: "Kolkata", totalMoves: 3, joinedDate: "2022-11-10", status: "active" },
  { id: "4", name: "Rahul Verma", email: "rahul@example.com", phone: "+91 98765 10201", city: "Delhi", totalMoves: 1, joinedDate: "2024-05-31", status: "active" },
  { id: "5", name: "Meena Iyer", email: "meena@example.com", phone: "+91 98765 20201", city: "Chennai", totalMoves: 4, joinedDate: "2022-06-05", status: "inactive" },
  { id: "6", name: "Sanjay Pillai", email: "sanjay@example.com", phone: "+91 98765 30301", city: "Bangalore", totalMoves: 2, joinedDate: "2023-07-18", status: "active" },
  { id: "7", name: "Pooja Agarwal", email: "pooja@example.com", phone: "+91 98765 40401", city: "Pune", totalMoves: 1, joinedDate: "2024-01-08", status: "active" },
  { id: "8", name: "Nitin Rao", email: "nitin@example.com", phone: "+91 98765 50501", city: "Ahmedabad", totalMoves: 2, joinedDate: "2023-09-14", status: "inactive" },
];

export const MOCK_BLOGS: BlogPost[] = [
  { id: "1", title: "10 Tips for a Stress-Free Home Move", slug: "10-tips-stress-free-move", excerpt: "Moving home can be overwhelming. Here are 10 proven tips to make your next move smooth and stress-free.", category: "Tips", status: "published", date: "2024-06-01", author: "Admin" },
  { id: "2", title: "How to Pack Fragile Items Safely", slug: "pack-fragile-items-safely", excerpt: "Learn the professional techniques used by expert packers to protect your fragile belongings during transit.", category: "Packing", status: "published", date: "2024-05-25", author: "Admin" },
  { id: "3", title: "Office Relocation Checklist 2024", slug: "office-relocation-checklist-2024", excerpt: "A comprehensive checklist to ensure your office move goes smoothly with zero downtime.", category: "Office", status: "published", date: "2024-05-18", author: "Admin" },
  { id: "4", title: "Car Transportation Guide: What to Expect", slug: "car-transportation-guide", excerpt: "Everything you need to know about transporting your car safely across India.", category: "Vehicle", status: "draft", date: "2024-06-08", author: "Admin" },
  { id: "5", title: "Benefits of Professional Warehousing", slug: "benefits-professional-warehousing", excerpt: "Why short-term storage can save you money and stress during your relocation.", category: "Warehousing", status: "draft", date: "2024-06-10", author: "Admin" },
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  { id: "1", name: "Priya Sharma", role: "HR Manager, TCS Kolkata", city: "Kolkata → Mumbai", rating: 5, text: "Absolutely seamless experience! Sarkar Packers moved our entire 3BHK without a single scratch.", status: "published", date: "2024-05-20" },
  { id: "2", name: "Rajesh Kumar", role: "Senior Engineer, Infosys", city: "Kolkata → Bangalore", rating: 5, text: "Used them for office relocation. The process was incredibly smooth. Zero downtime for our team.", status: "published", date: "2024-05-15" },
  { id: "3", name: "Ananya Bose", role: "Homemaker", city: "Kolkata → Delhi", rating: 5, text: "My first time moving inter-city. Sarkar Packers made it feel effortless. 10/10!", status: "published", date: "2024-05-10" },
  { id: "4", name: "Vikram Mehta", role: "Business Owner", city: "Kolkata → Hyderabad", rating: 4, text: "Moved my car and household goods together. Both arrived in perfect condition.", status: "published", date: "2024-04-30" },
  { id: "5", name: "Sunita Das", role: "Teacher", city: "Kolkata → Pune", rating: 5, text: "Professional, affordable, and reliable. Will use again!", status: "hidden", date: "2024-04-20" },
];
