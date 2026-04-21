"use client";

import { SectionWrapper } from "./section-wrapper";
import { PlaceholderImage } from "./placeholder-image";
import { motion } from "framer-motion";
import { Pill } from "./ui/pill";
import iphone1 from "@/images/iphone-1.png";
import iphone3 from "@/images/iphone-3.png";
import iphone6 from "@/images/iphone-6.png";

const findings = [
  {
    severity: "high",
    area: "Mobile PDP",
    finding: "Sticky add-to-cart missing on mobile product pages",
    impact: "Customers must scroll back up to add to cart. High drop-off on longer PDPs.",
  },
  {
    severity: "high",
    area: "Product Page",
    finding: "Variant selection is unclear and increases hesitation",
    impact: "Color/size options lack visual cues. Selected state is hard to distinguish.",
  },
  {
    severity: "high",
    area: "Cart",
    finding: "Cart lacks confidence-building cues before checkout",
    impact: "No shipping info, no returns policy, no trust badges at decision point.",
  },
  {
    severity: "medium",
    area: "Collections",
    finding: "Collection pages aren't optimizing for product discovery",
    impact: "No visual hierarchy between products. Filtering hidden on mobile.",
  },
  {
    severity: "medium",
    area: "Homepage",
    finding: "Homepage over-prioritizes brand imagery over action",
    impact: "Hero section has no clear CTA. Visitors don't know what to do next.",
  },
  {
    severity: "medium",
    area: "Product Page",
    finding: "No clear hierarchy around product value propositions",
    impact: "Key benefits buried below the fold. Features listed but not framed.",
  },
];

const severityStyle: Record<string, string> = {
  high: "bg-coral-600",
  medium: "bg-[var(--color-butter)]",
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function SampleFindings() {
  return (
    <SectionWrapper id="sample-findings" background="mauve-soft">
      <div className="max-w-xl mx-auto text-center mb-14 sm:mb-16">
        <Pill tone="butter" className="mb-4">Example insights</Pill>
        <h2 className="text-headline text-ink-900">
          Real findings from{" "}
          <span className="text-coral-600">real Shopify audits.</span>
        </h2>
        <p className="mt-5 text-body-lg mx-auto max-w-lg">
          A sample of the actionable, specific findings you&rsquo;ll receive.
        </p>
      </div>

      {/* Representative mobile storefronts — horizontal scroll snap carousel */}
      <div className="mb-14 sm:mb-16">
        <div className="snap-scroller flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3">
          {[iphone1, iphone3, iphone6].map((src, i) => (
            <div key={i} className="flex-shrink-0 w-[75vw] max-w-[340px] sm:w-auto">
              <PlaceholderImage
                src={src}
                alt="Mobile storefront reviewed during an audit"
                label="Mobile review"
                aspect="tall"
              />
            </div>
          ))}
        </div>
      </div>

      <motion.div
        className="space-y-3"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {findings.map((f) => (
          <motion.div
            key={f.finding}
            variants={item}
            className="grid sm:grid-cols-[140px_1fr_1fr] gap-3 sm:gap-6 rounded-2xl border border-ink-100 bg-white p-5 sm:p-6 transition-all hover:shadow-soft hover:border-coral-200"
          >
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full flex-shrink-0 ${severityStyle[f.severity]}`} />
              <span className="text-[11px] font-bold text-ink-600 uppercase tracking-[0.1em]">
                {f.area}
              </span>
            </div>
            <p className="text-[15px] font-bold text-ink-900 leading-snug tracking-tight">
              {f.finding}
            </p>
            <p className="text-sm text-ink-600 leading-relaxed">
              {f.impact}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
