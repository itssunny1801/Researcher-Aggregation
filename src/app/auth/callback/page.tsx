"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setStoredToken } from "@/lib/auth";
import { Suspense } from "react";

function AuthCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "error">("loading");

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("auth_error");

    if (error) {
      setStatus("error");
      setTimeout(() => router.replace("/login"), 3000);
      return;
    }

    if (!token) {
      setStatus("error");
      setTimeout(() => router.replace("/login"), 3000);
      return;
    }

    // Store the JWT in localStorage — works across all domains
    setStoredToken(token);

    // Redirect to account page
    router.replace("/account");
  }, [searchParams, router]);

  if (status === "error") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-lg font-bold text-academic-primary mb-2">Authentication Failed</h1>
          <p className="text-sm text-academic-muted">Something went wrong. Redirecting you back...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        {/* Animated spinner */}
        <div className="w-16 h-16 mx-auto mb-6 relative">
          <div className="w-16 h-16 rounded-full border-2 border-academic-border" />
          <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-t-academic-orcid animate-spin" />
        </div>
        <h1 className="text-lg font-semibold text-academic-primary mb-2">Signing you in…</h1>
        <p className="text-sm text-academic-muted">Verifying your ORCID credentials</p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-t-academic-orcid animate-spin" />
      </div>
    }>
      <AuthCallbackInner />
    </Suspense>
  );
}
