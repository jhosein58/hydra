"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useIdentity } from "@/features/identity/hooks/useIdentity";

export function IdentityProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { data: keys, isLoading } = useIdentity();

  useEffect(() => {
    if (isLoading) return;

    const path = window.location.pathname;

    const isSetupPage = path.startsWith("/setup");

    if (keys && isSetupPage) {
      router.replace("/chat");
    }
  }, [keys, isLoading, router]);

  return children;
}
