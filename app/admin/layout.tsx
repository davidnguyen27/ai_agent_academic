"use client";

import { Header } from "@/components/layouts/admin/Header";
import { SideBar } from "@/components/layouts/admin/SideBar";
import PageTransitionLoader from "@/components/layouts/PageTransitionLoader";
import { isAdmin } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const isAuthorized = isAdmin();
    if (!isAuthorized) {
      router.replace("/authentication");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen h-screen">
      <SideBar />
      <div className="flex-1 flex flex-col bg-gray-100">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <PageTransitionLoader>{children}</PageTransitionLoader>
        </main>
      </div>
    </div>
  );
}
