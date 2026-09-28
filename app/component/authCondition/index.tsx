"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      router.replace("/auth");
      return;
    }

    try {
      const data = JSON.parse(userData);

      if (data.user?.role !== "ADMIN") {
        router.replace("/auth");
      }
    } catch (error) {
      localStorage.removeItem("user");
      router.replace("/auth");
    }
  }, [router]);

  return <>{children}</>;
}
