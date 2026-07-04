"use client";
/**
 * useAuth.ts — thin wrappers around AuthContext for backward compatibility.
 * Existing admin portal components (Sidebar, AdminHeader) import these.
 */
export { useAuth, useAuth as useAdminAuth, useAuth as useUserAuth } from "@/context/AuthContext";
