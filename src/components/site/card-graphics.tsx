"use client";

/**
 * The four bento card graphics.
 *
 * Built in code rather than generated or drawn, for three reasons that matter
 * more than the visual:
 *
 *  1. Two of them show real data. The findings list and the annotated crop read
 *     from src/content/findings.ts, the same source as the hero slides and the
 *     register, so they cannot drift out of sync with the copy beside them.
 *  2. They stay legible at any size and in both themes, which a raster export
 *     of a diagram does not.
 *  3. Nothing here is generated, so nothing here can invent a statistic or a
 *     storefront. That constraint has shaped every asset decision on this page.
 *
 * Each is decorative: the card's own heading and body carry the meaning, so
 * these are aria-hidden and contribute nothing to the accessible name.
 */

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { FINDINGS, SEVERITY } from "@/content/findings";
import storefrontPdp from "@/images/storefront/pdp.png";

/* ------------------------------------------------------------------ card 1 */

const SURFACES = [
  "Homepage",
  "Collections",
  "Product",
  "Cart",
  "Checkout",
  "Navigation",
];

/** Every surface reviewed, on both devices. Mirrors the hero tab labels. */
export function CoverageMap() {
  const reduceMotion = useReducedMotion();
  return (
    <div aria-hidden className="flex h-full w-full flex-col justify-center gap-3 p-2">
      {(["Desktop", "Phone"] as const).map((device, row) => (
        <div key={device} className="flex flex-col gap-1.5">
          <span className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
            {device}
          </span>
          <div className="flex flex-wrap gap-1">
            {SURFACES.map((s, i) => (
              <motion.span
                key={s}
                initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: (row * SURFACES.length + i) * 0.04 }}
                className="border-border text-muted-foreground rounded border px-1.5 py-1 text-[10px] whitespace-nowrap"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ card 2 */

/** Three real findings in rank order, highest severity first. */
export function RankedList() {
  const reduceMotion = useReducedMotion();
  const rows = [...FINDINGS]
    .sort((a, b) => (a.severity === "high" ? -1 : b.severity === "high" ? 1 : 0))
    .slice(0, 3);

  return (
    <div aria-hidden className="flex h-full w-full flex-col justify-center gap-1.5 p-2">
      {rows.map((f, i) => {
        const sev = SEVERITY[f.severity];
        return (
          <motion.div
            key={f.rank}
            initial={reduceMotion ? false : { opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className="border-border flex items-center gap-2 rounded border px-2 py-1.5"
          >
            <span className="text-muted-foreground font-mono text-[9px] tabular-nums">
              {f.rank}
            </span>
            <span className={cn("size-1.5 shrink-0 rounded-full", sev.dot)} />
            <span className="truncate text-[10px]">{f.title}</span>
          </motion.div>
        );
      })}
      <span className="text-muted-foreground pl-1 text-[9px]">
        and the rest, in order
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ card 3 */

/** A real capture with one real finding pinned to it, the hero idea at card scale. */
export function AnnotatedCrop() {
  const f = FINDINGS.find((x) => x.rank === "F.04")!;
  const sev = SEVERITY[f.severity];
  return (
    <div aria-hidden className="relative h-full w-full overflow-hidden rounded-md">
      <Image
        src={storefrontPdp}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 400px"
        placeholder="blur"
        className="object-cover object-right-top opacity-60"
      />
      <div className="from-background/80 absolute inset-0 bg-gradient-to-t to-transparent" />
      <span
        className={cn(
          "absolute top-[46%] left-[38%] size-5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4",
          sev.dot,
          sev.ring
        )}
      />
      <div className="bg-card absolute right-2 bottom-2 left-2 rounded border p-2 shadow-lg">
        <div className="flex items-center gap-1.5">
          <span className={cn("size-1.5 rounded-full", sev.dot)} />
          <span className="text-muted-foreground font-mono text-[9px]">{f.rank}</span>
          <span className={cn("text-[9px] font-semibold", sev.text)}>{sev.label}</span>
        </div>
        <p className="mt-0.5 text-[10px] font-semibold">{f.title}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ card 4 */

const TIMELINE = [
  { day: "Day 0", label: "Audit delivered", state: "done" as const },
  { day: "Day 1+", label: "Your team ships", state: "done" as const },
  { day: "Day 30", label: "We rescan and confirm", state: "next" as const },
];

/** The rescan, as a timeline. No before-and-after: we have no real pair yet, and
 *  a fabricated one is the worst possible asset for this particular page. */
export function RescanTimeline() {
  const reduceMotion = useReducedMotion();
  return (
    <div aria-hidden className="flex h-full w-full items-center p-2">
      <div className="relative flex w-full flex-col gap-4">
        <span className="bg-border absolute top-2 bottom-2 left-[5px] w-px" />
        {TIMELINE.map((t, i) => (
          <motion.div
            key={t.day}
            initial={reduceMotion ? false : { opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="relative flex items-center gap-3"
          >
            <span
              className={cn(
                "z-10 size-[11px] shrink-0 rounded-full border-2",
                t.state === "done"
                  ? "border-emerald-500 bg-emerald-500"
                  : "border-emerald-500 bg-transparent"
              )}
            />
            <span className="text-muted-foreground w-12 shrink-0 text-[10px] font-medium tabular-nums">
              {t.day}
            </span>
            <span className="text-[11px]">{t.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
