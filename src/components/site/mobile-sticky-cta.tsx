"use client";

/**
 * Sticky purchase bar, mobile only.
 *
 * The live site has two buy buttons across seventeen viewports, and the
 * component that would have fixed it was written and never wired (it was among
 * the dead files deleted in fea1dbe). This is that idea, rebuilt.
 *
 * Appears once the hero CTA has scrolled out of view, so it never competes with
 * the in-page button, and hides again over the pricing section where a real
 * purchase control is already on screen.
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileStickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector("h1");
      const pricing = document.getElementById("pricing");
      if (!hero) return;

      const pastHero = hero.getBoundingClientRect().bottom < 0;
      // Hide while the pricing section is on screen; its own CTA is visible there.
      const pricingVisible = pricing
        ? pricing.getBoundingClientRect().top < window.innerHeight &&
          pricing.getBoundingClientRect().bottom > 0
        : false;

      setShow(pastHero && !pricingVisible);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "bg-background/90 fixed inset-x-0 bottom-0 z-50 border-t p-3 backdrop-blur md:hidden",
        "transition-transform duration-200",
        show ? "translate-y-0" : "translate-y-full"
      )}
      // Keep it out of the tab order and off screen readers while hidden.
      // React 19 types inert as a boolean.
      aria-hidden={!show}
      inert={!show}
    >
      <Link
        href="#pricing"
        className="bg-primary text-primary-foreground flex min-h-11 w-full items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold"
      >
        Get my audit for $750
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
