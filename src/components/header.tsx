"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { CTAButton } from "./cta-button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/85 backdrop-blur-lg border-b border-ink-100"
          : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex max-w-[1180px] items-center justify-between px-6 sm:px-10 lg:px-12 py-4"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center">
          <Logo color="dark" />
        </Link>

        <div className="flex items-center gap-2">
          <a
            href="#what-you-get"
            className="hidden lg:inline-block rounded-full px-4 py-2 text-[13px] font-medium text-ink-700 hover:bg-ink-100 transition-colors"
          >
            What&rsquo;s Included
          </a>
          <a
            href="#pricing"
            className="hidden lg:inline-block rounded-full px-4 py-2 text-[13px] font-medium text-ink-700 hover:bg-ink-100 transition-colors"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="hidden lg:inline-block rounded-full px-4 py-2 text-[13px] font-medium text-ink-700 hover:bg-ink-100 transition-colors"
          >
            FAQ
          </a>
          <CTAButton href="#pricing" size="sm" className="ml-2">
            Get my audit
          </CTAButton>
        </div>
      </nav>
    </header>
  );
}
