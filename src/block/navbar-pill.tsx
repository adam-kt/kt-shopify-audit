"use client";

import { useState } from "react";
import {
  IconMenu2 as Menu,
  IconX as X,
  IconChevronRight as ChevronRight,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";

const links = ["Dashboard", "Team", "Projects", "Calendar", "Reports"];

const tapProps = {
  whileTap: { scale: 0.98 },
  transition: {
    type: "spring" as const,
    stiffness: 500,
    damping: 30,
    mass: 0.6,
  },
};

export default function NavbarPill() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");

  return (
    <header className="bg-card w-full rounded-xl border">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex w-full items-center justify-between gap-3 md:w-auto">
            <span className="font-semibold">Pill</span>
            <motion.button
              aria-label="Toggle menu"
              className="hover:bg-muted inline-flex size-10 items-center justify-center rounded-md border md:hidden"
              onClick={() => setOpen((s) => !s)}
              whileTap={{ scale: 0.92 }}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>

          <nav className="bg-background/60 supports-[backdrop-filter]:bg-background/40 hidden items-center gap-2 rounded-full border p-1 backdrop-blur md:flex">
            {links.map((l) => (
              <motion.a
                key={l}
                href="#"
                onClick={() => setActive(l)}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                  active === l
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "hover:bg-muted"
                }`}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                {l}
              </motion.a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {/* Contact: violet theme */}
            <motion.button
              {...tapProps}
              className="hidden rounded-full bg-black px-8 py-2 text-sm font-bold text-white shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.4)_inset] md:block dark:bg-white dark:text-black"
            >
              Contact
            </motion.button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="border-t py-2 md:hidden"
            >
              <nav className="flex flex-wrap gap-2">
                {links.map((l) => (
                  <motion.button
                    key={l}
                    onClick={() => {
                      setActive(l);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-full border px-3 py-1.5 text-sm ${
                      active === l
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "hover:bg-muted"
                    }`}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{l}</span>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </motion.button>
                ))}
                <div className="flex w-full items-center gap-2 pt-2">
                  <div className="flex-1" />
                  <motion.button
                    {...tapProps}
                    className="rounded-full bg-black px-4 py-2 text-sm font-bold text-white shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.4)_inset] dark:bg-white dark:text-black"
                  >
                    Contact
                  </motion.button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
