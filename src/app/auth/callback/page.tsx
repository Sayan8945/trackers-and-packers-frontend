"use client";

/**
 * /auth/callback
 * Landing page for Google OAuth redirect from backend.
 * Backend sends:  {CLIENT_URL}/auth/callback?accessToken=...&refreshToken=...
 * This page reads those tokens, persists the session, then redirects to /.
 */

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { persistUserSession } from "@/lib/auth";
import { userApi } from "@/lib/api";
import { tokenStorage } from "@/lib/api";

function CallbackInner() {
  const router       = useRouter();
  const params       = useSearchParams();

  useEffect(() => {
    const accessToken  = params.get("accessToken");
    const refreshToken = params.get("refreshToken") ?? undefined;

    if (!accessToken) {
      // No tokens — something went wrong, send back to login
      router.replace("/login");
      return;
    }

    // 1. Store tokens
    tokenStorage.setAccess(accessToken);
    if (refreshToken) tokenStorage.setRefresh(refreshToken);

    // 2. Fetch user profile and persist full session
    userApi.getProfile()
      .then((res) => {
        const user = res.data.data;
        persistUserSession(user, accessToken, refreshToken);
        router.replace("/");
      })
      .catch(() => {
        // Profile fetch failed — still redirect home, user can retry
        router.replace("/");
      });
  }, [params, router]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-2 border-brand-red/30 border-t-brand-red rounded-full animate-spin" />
      <p className="text-slate-400 text-sm">Completing sign in…</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-brand-red/30 border-t-brand-red rounded-full animate-spin" />
      </div>
    }>
      <CallbackInner />
    </Suspense>
  );
}
