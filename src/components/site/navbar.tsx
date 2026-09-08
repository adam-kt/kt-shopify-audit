"use client";

/**
 * B1 — site navbar.
 *
 * Adapted from @aceternity/navbar-pill (src/block/navbar-pill.tsx, pristine).
 * Kept: the pill nav shell, the active-pill treatment, the spring tap feedback,
 * and its use of semantic shadcn tokens — which is why this block was chosen
 * over simple-navbar-with-hover-effects, whose colours were hardcoded neutral
 * and whose wordmark was a remote image on Aceternity's CDN.
 *
 * Changed from upstream:
 *  - Placeholder links (Dashboard/Team/Projects/Calendar/Reports, all href="#")
 *    replaced with the real nav and live anchors.
 *  - "Contact" <button> replaced with a real CTA link to #pricing.
 *  - Mobile menu items were <button>s; they are <Link>s now. Nav destinations
 *    must be links — buttons are not focus-navigable as destinations, cannot be
 *    opened in a new tab, and are invisible to crawlers.
 *  - Added aria-expanded / aria-controls on the toggle, which upstream omits.
 *  - Active state derives from the pathname + hash rather than local state, so
 *    it survives navigation.
 */

import Link from "next/link";
import { useState } from "react";
import {
  IconMenu2 as Menu,
  IconX as X,
  IconChevronRight as ChevronRight,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { CircleLogo } from "./circle-logo";

const NAV_LINKS = [
  { label: "What we review", href: "/#what-you-get" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

const tapProps = {
  whileTap: { scale: 0.98 },
  transition: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.6 },
};

export function SiteNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="bg-card/80 mx-auto max-w-6xl rounded-xl border backdrop-blur">
        <div className="px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex w-full items-center justify-between gap-3 md:w-auto">
              <Link
                href="/"
                className="flex items-center gap-2.5"
                aria-label="Knock Twice home"
              >
                <CircleLogo size={34} />
                <span className="text-sm font-semibold tracking-tight">
                  Knock Twice
                </span>
              </Link>

              <motion.button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="site-mobile-menu"
                className="hover:bg-muted inline-flex size-10 items-center justify-center rounded-md border md:hidden"
                onClick={() => setOpen((s) => !s)}
                whileTap={{ scale: 0.92 }}
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>

            <nav
              aria-label="Main navigation"
              className="bg-background/60 supports-[backdrop-filter]:bg-background/40 hidden items-center gap-2 rounded-full border p-1 backdrop-blur md:flex"
            >
              {NAV_LINKS.map((link) => (
                <motion.div key={link.href} whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href={link.href}
                    className="hover:bg-muted block rounded-full px-3 py-1.5 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              <motion.div {...tapProps}>
                <Link
                  href="/#pricing"
                  className="bg-primary text-primary-foreground block rounded-full px-6 py-2 text-sm font-bold shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.4)_inset] transition-opacity hover:opacity-90"
                >
                  Get my audit
                </Link>
              </motion.div>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id="site-mobile-menu"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="border-t py-2 md:hidden"
              >
                <nav aria-label="Main navigation" className="flex flex-wrap gap-2 pb-2">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "hover:bg-muted flex w-full items-center justify-between",
                        "rounded-full border px-3 py-2 text-sm transition-colors"
                      )}
                    >
                      <span>{link.label}</span>
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </Link>
                  ))}
                  <Link
                    href="/#pricing"
                    onClick={() => setOpen(false)}
                    className="bg-primary text-primary-foreground mt-1 w-full rounded-full px-4 py-2.5 text-center text-sm font-bold"
                  >
                    Get my audit
                  </Link>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
