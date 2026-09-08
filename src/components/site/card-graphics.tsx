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

/* -------------------------------------------------- card 1, alternative */

/**
 * Page silhouettes rather than a list of surface names.
 *
 * The first version rendered the surfaces as text chips, which restated the
 * card's own body copy word for word. These are abstract wireframes: each page
 * type has a recognisably different shape, so the card shows range instead of
 * repeating a list.
 */
const PAGE_SHAPES = [
  { name: "Home", rows: ["h-5 w-full", "h-1.5 w-2/3", "h-1.5 w-1/2"] },
  { name: "Collection", grid: true },
  { name: "Product", split: true },
  { name: "Cart", rows: ["h-2 w-full", "h-2 w-full", "h-1.5 w-1/3"] },
  { name: "Checkout", rows: ["h-1.5 w-full", "h-1.5 w-full", "h-1.5 w-full", "h-3 w-1/2"] },
  { name: "Nav", nav: true },
];

export function PageSilhouettes() {
  const reduceMotion = useReducedMotion();
  return (
    <div aria-hidden className="grid h-full w-full grid-cols-3 gap-2 p-1">
      {PAGE_SHAPES.map((p, i) => (
        <motion.div
          key={p.name}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.28, delay: i * 0.05 }}
          className="border-border flex flex-col gap-1 rounded border p-1.5"
        >
          <div className="flex flex-1 flex-col gap-1 overflow-hidden">
            {p.grid && (
              <div className="grid flex-1 grid-cols-3 gap-0.5">
                {Array.from({ length: 6 }, (_, n) => (
                  <span key={n} className="bg-muted rounded-[1px]" />
                ))}
              </div>
            )}
            {p.split && (
              <div className="flex flex-1 gap-1">
                <span className="bg-muted flex-1 rounded-[1px]" />
                <div className="flex flex-1 flex-col gap-0.5">
                  <span className="bg-muted h-1 w-full rounded-[1px]" />
                  <span className="bg-muted h-1 w-2/3 rounded-[1px]" />
                  <span className="bg-muted/60 mt-auto h-2 w-full rounded-[1px]" />
                </div>
              </div>
            )}
            {p.nav && (
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="bg-muted h-1.5 w-full rounded-[1px]" />
                <span className="bg-muted/60 h-1 w-1/2 rounded-[1px]" />
                <span className="bg-muted/60 h-1 w-2/3 rounded-[1px]" />
              </div>
            )}
            {p.rows?.map((r, n) => (
              <span key={n} className={cn("bg-muted rounded-[1px]", r)} />
            ))}
          </div>
          <span className="text-muted-foreground text-[8px] leading-none">
            {p.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* -------------------------------------------------- card 3, alternative */

/**
 * A stack of annotated frames rather than one.
 *
 * The first version put a single pin on a single capture, which is exactly what
 * the hero already does two sections above. The word doing the work on this card
 * is "every", so the graphic shows several: one frame per finding, stacked.
 */
export function AnnotatedStack() {
  const reduceMotion = useReducedMotion();
  const shown = FINDINGS.slice(0, 4);
  return (
    <div aria-hidden className="relative h-full w-full p-1">
      {shown.map((f, i) => {
        const sev = SEVERITY[f.severity];
        return (
          <motion.div
            key={f.rank}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            style={{ top: `${i * 24}%`, left: `${i % 2 === 0 ? 0 : 8}%`, zIndex: i }}
            className="border-border bg-card absolute w-[88%] rounded border p-2 shadow-md"
          >
            {/* Abstract page behind the mark */}
            <div className="relative mb-1.5 flex h-10 gap-1 overflow-hidden rounded-[2px]">
              <span className="bg-muted w-1/3 rounded-[1px]" />
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="bg-muted h-1 w-full rounded-[1px]" />
                <span className="bg-muted h-1 w-2/3 rounded-[1px]" />
                <span className="bg-muted/60 mt-auto h-2 w-1/2 rounded-[1px]" />
              </div>
              <span
                className={cn(
                  "absolute size-2.5 rounded-full ring-2",
                  sev.dot,
                  sev.ring
                )}
                style={{ left: f.pin.x, top: f.pin.y }}
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className={cn("size-1.5 shrink-0 rounded-full", sev.dot)} />
              <span className="text-muted-foreground font-mono text-[8px]">
                {f.rank}
              </span>
              <span className="truncate text-[9px] font-medium">{f.title}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------- card 4, alternative */

/**
 * The rescan as a before-and-after of the findings themselves.
 *
 * The timeline version was vertical in a card twice as wide as it is tall, so it
 * left most of the width empty and read thin beside the other three. This runs
 * across the card and shows what the rescan actually produces rather than the
 * dates it happens on.
 *
 * Deliberately not all-green. The card says we "confirm the fixes landed, and
 * flag anything new", so one finding is still open and one is new. A graphic
 * where every problem resolves would promise an outcome we do not control.
 */
const RESCAN_BEFORE = FINDINGS.slice(0, 3);

export function RescanCheck() {
  const reduceMotion = useReducedMotion();

  const Column = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <span className="text-muted-foreground text-[10px] font-semibold tracking-wide uppercase">
        {label}
      </span>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );

  const Row = ({
    rank,
    text,
    tone,
    i,
  }: {
    rank: string;
    text: string;
    tone: "open" | "fixed" | "new";
    i: number;
  }) => (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 4 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.28, delay: i * 0.07 }}
      className="border-border flex items-center gap-2 rounded border px-2 py-1.5"
    >
      <span
        className={cn(
          "flex size-3 shrink-0 items-center justify-center rounded-full text-[7px] font-bold text-white",
          tone === "fixed" && "bg-emerald-500",
          tone === "open" && "bg-red-500",
          tone === "new" && "bg-amber-500"
        )}
      >
        {tone === "fixed" ? "\u2713" : tone === "new" ? "+" : ""}
      </span>
      <span className="text-muted-foreground font-mono text-[9px] tabular-nums">
        {rank}
      </span>
      <span className="truncate text-[10px]">{text}</span>
    </motion.div>
  );

  return (
    <div aria-hidden className="flex h-full w-full items-center gap-4 p-2 md:gap-6">
      <Column label="Day 0 · delivered">
        {RESCAN_BEFORE.map((f, i) => (
          <Row key={f.rank} rank={f.rank} text={f.title} tone="open" i={i} />
        ))}
      </Column>

      <div className="text-muted-foreground flex shrink-0 flex-col items-center gap-1">
        <span className="bg-border h-8 w-px" />
        <span className="text-[9px] whitespace-nowrap">30 days</span>
        <span className="bg-border h-8 w-px" />
      </div>

      <Column label="Day 30 · rescan">
        <Row rank={RESCAN_BEFORE[0].rank} text="Fixed, confirmed" tone="fixed" i={0} />
        <Row rank={RESCAN_BEFORE[1].rank} text="Fixed, confirmed" tone="fixed" i={1} />
        <Row rank={RESCAN_BEFORE[2].rank} text="Still open" tone="open" i={2} />
        <Row rank="F.10" text="New since launch" tone="new" i={3} />
      </Column>
    </div>
  );
}
