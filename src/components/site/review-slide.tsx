"use client";

/**
 * A review slide: a storefront screenshot with the findings pinned onto it.
 *
 * Replaces the flat PNG that used to fill the hero's browser panel. That was a
 * wide report page scaled into a narrow box, and at 375px it lost 46% of its
 * width to cropping, which made the page's best asset an unreadable sliver on
 * the majority of traffic.
 *
 * The fix is that the findings are HTML rather than baked pixels. The base
 * screenshot is now context, and cropping it costs nothing, because every word
 * a visitor needs to read reflows:
 *
 *   lg and up   pins on the screenshot, cards floating beside them in depth
 *   below lg    pins on the screenshot, cards listed underneath, same numbers
 *
 * Depth is a small translateZ on a perspective stage. It is deliberately subtle:
 * the cards have to stay readable, and the browser chrome around them is already
 * doing the "this is a real interface" work.
 *
 * Base images are storefront captures from a Shopify theme demo store, not pages
 * of the audit document. Cards listing findings over a document that already
 * lists findings read as findings-on-findings. A theme demo means no real
 * merchant is publicly critiqued and no permission is needed, while still being
 * a real, competently built storefront rather than a wireframe.
 */

import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { SEVERITY, findingsFor, type Surface } from "@/content/findings";

interface ReviewSlideProps {
  surface: Surface;
  image: StaticImageData;
  alt: string;
  priority?: boolean;
}

export function ReviewSlide({ surface, image, alt, priority }: ReviewSlideProps) {
  const findings = findingsFor(surface);
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex h-full flex-col">
      {/* Stage: screenshot plus pins */}
      <div className="perspective-distant relative min-h-56 flex-1 overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          placeholder="blur"
          priority={priority}
          // Legible enough to read as a real shop, held back enough that the
          // finding cards stay the thing you look at.
          className="object-cover object-top opacity-55"
        />
        {/* Darken so the cards and pins hold contrast over any screenshot. */}
        <div aria-hidden className="from-background/85 via-background/40 absolute inset-0 bg-gradient-to-t to-transparent" />

        {findings.map((f, i) => {
          const sev = SEVERITY[f.severity];
          return (
            <div key={f.rank}>
              {/* Pin. Decorative: the card beside or below carries the text. */}
              <motion.span
                aria-hidden
                initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.3 }}
                style={{ left: f.pin.x, top: f.pin.y }}
                className={cn(
                  "absolute z-20 flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[10px] font-bold text-white ring-4",
                  sev.dot,
                  sev.ring
                )}
              >
                {i + 1}
              </motion.span>

              {/* Floating card, large screens only. */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.4 }}
                style={{
                  left: f.pin.x,
                  top: `calc(${f.pin.y} + 1.75rem)`,
                  transform: "translateZ(40px)",
                }}
                className="bg-card absolute z-30 hidden w-64 -translate-x-1/2 rounded-lg p-3 shadow-2xl ring-1 ring-black/10 lg:block dark:ring-white/10"
              >
                <CardBody index={i + 1} finding={f} />
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Below lg the cards become a list, so nothing depends on the crop. */}
      <ul className="divide-border grid shrink-0 divide-y border-t lg:hidden">
        {findings.map((f, i) => (
          <li key={f.rank} className="bg-card px-4 py-3">
            <CardBody index={i + 1} finding={f} />
          </li>
        ))}
      </ul>
    </div>
  );
}

const CardBody = ({
  index,
  finding,
}: {
  index: number;
  finding: ReturnType<typeof findingsFor>[number];
}) => {
  const sev = SEVERITY[finding.severity];
  return (
    <>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "flex size-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white",
            sev.dot
          )}
        >
          {index}
        </span>
        <span className="text-muted-foreground font-mono text-[10px] tabular-nums">
          {finding.rank}
        </span>
        <span className={cn("text-[10px] font-semibold", sev.text)}>
          {sev.label}
        </span>
        <span className="text-muted-foreground ml-auto text-[10px] uppercase">
          {finding.area}
        </span>
      </div>
      <p className="mt-1.5 text-xs font-semibold">{finding.title}</p>
      <p className="text-muted-foreground mt-0.5 text-xs leading-snug">
        {finding.impact}
      </p>
    </>
  );
};
