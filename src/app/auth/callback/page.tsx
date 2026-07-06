"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { persistUserSession } from "@/lib/auth";
import { userApi, tokenStorage } from "@/lib/api";
import { useToast } from "@/components/ui/toast";

function CallbackInner() {
  const router  = useRouter();
  const params  = useSearchParams();
  const { show: toast } = useToast();

  useEffect(() => {
    const accessToken  = params.get("accessToken");
    const refreshToken = params.get("refreshToken") ?? undefined;

    if (!accessToken) {
      router.replace("/login");
      return;
    }

    tokenStorage.setAccess(accessToken);
    if (refreshToken) tokenStorage.setRefresh(refreshToken);

    userApi.getProfile()
      .then((res) => {
        const user = res.data.data;
        persistUserSession(user, accessToken, refreshToken);
        toast(`Welcome, ${user.name}!`, "success");
        router.replace("/");
      })
      .catch(() => {
        router.replace("/");
      });
  }, [params, router, toast]);

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
