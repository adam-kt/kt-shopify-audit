"use client";

/**
 * Adapted from the Aceternity `simple-navbar-with-hover-effects` block.
 *
 * Kept: the shared-layout hover pill on desktop (motion `layoutId`) and the
 * expanding mobile sheet. Replaced: the demo's remote logo image, "DevStudio"
 * wordmark, placeholder nav items and "Book a call" CTA — all of which pointed
 * at `href="#"`. Colors moved from neutral/zinc onto the site's ink/brand tokens.
 *
 * Diff against commit aafff94 to see exactly what changed from upstream.
 */

import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import React, { useState } from "react";
import { CircleLogo } from "@/components/thanks/circle-logo";

type NavItem = { name: string; link: string };

const navItems: NavItem[] = [
  { name: "What we review", link: "/#what-you-get" },
  { name: "Pricing", link: "/#pricing" },
  { name: "FAQ", link: "/#faq" },
];

export function SiteNavbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
      <DesktopNav navItems={navItems} />
      <MobileNav navItems={navItems} />
    </header>
  );
}

const DesktopNav = ({ navItems }: { navItems: NavItem[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.nav
      aria-label="Main navigation"
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-[1600px] flex-row items-center justify-between",
        "rounded-full border border-ink-100 bg-white/80 px-3 py-2 shadow-soft backdrop-blur-md lg:flex"
      )}
    >
      <Link href="/" aria-label="Knock Twice — home" className="relative z-20">
        <CircleLogo size={44} />
      </Link>

      <div className="flex flex-1 flex-row items-center justify-center space-x-1 text-sm font-semibold">
        {navItems.map((navItem, idx) => (
          <Link
            key={navItem.link}
            href={navItem.link}
            onMouseEnter={() => setHovered(idx)}
            onFocus={() => setHovered(idx)}
            className="relative rounded-full px-4 py-2 text-ink-900 transition-colors"
          >
            {hovered === idx && (
              <motion.span
                layoutId="nav-hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-ink-100"
              />
            )}
            <span className="relative z-20">{navItem.name}</span>
          </Link>
        ))}
      </div>

      <Link
        href="/#pricing"
        className="rounded-full bg-ink-950 px-7 py-3 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-ink-800"
      >
        Get my audit
      </Link>
    </motion.nav>
  );
};

const MobileNav = ({ navItems }: { navItems: NavItem[] }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      aria-label="Main navigation"
      animate={{ borderRadius: open ? "1.5rem" : "2rem" }}
      className="relative mx-auto flex w-full flex-col items-center justify-between border border-ink-100 bg-white/80 px-3 py-2 shadow-soft backdrop-blur-md lg:hidden"
    >
      <div className="flex w-full flex-row items-center justify-between">
        <Link href="/" aria-label="Knock Twice — home">
          <CircleLogo size={40} />
        </Link>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-ink-100"
        >
          {open ? <IconX className="h-5 w-5" /> : <IconMenu2 className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-20 flex w-full flex-col items-stretch gap-1 rounded-[var(--radius-card)] border border-ink-100 bg-white p-4 shadow-soft-lg"
          >
            {navItems.map((navItem) => (
              <Link
                key={navItem.link}
                href={navItem.link}
                onClick={() => setOpen(false)}
                className="rounded-full px-4 py-3 text-[15px] font-semibold text-ink-900 transition-colors hover:bg-ink-100"
              >
                {navItem.name}
              </Link>
            ))}
            <Link
              href="/#pricing"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-ink-950 px-6 py-3 text-center text-[15px] font-semibold text-white transition-colors hover:bg-ink-800"
            >
              Get my audit
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
