"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function PageTransitionLoader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="ml-2 text-primary font-medium">Loading...</span>
        </div>
      )}
      <div className={isLoading ? "opacity-50 pointer-events-none" : ""}>{children}</div>
    </div>
  );
}
