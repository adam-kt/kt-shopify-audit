"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function MobileStickyC() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 right-4 z-40 sm:hidden",
        "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        visible ? "translate-y-0" : "translate-y-[150%]"
      )}
      role="complementary"
      aria-label="Purchase audit"
    >
      <a
        href="#pricing"
        className="flex items-center justify-between rounded-full bg-coral-600 px-5 py-3.5 text-white shadow-soft-lg"
      >
        <span className="text-sm font-semibold tracking-tight">Get my audit — $750</span>
        <span className="text-[11px] font-medium text-white/80">5-day turnaround</span>
      </a>
    </div>
  );
}
