"use client";

import { SectionWrapper } from "./section-wrapper";
import { AnnotatedScreenshot } from "./annotated-screenshot";
import { motion } from "framer-motion";
import { Pill } from "./ui/pill";
import annotatedPdp from "@/images/annotated-pdp.png";

const painPoints = [
  "Weak mobile experience that doesn't match your desktop quality",
  "Product pages that don't make a clear case to buy",
  "Collection pages that fail at product discovery",
  "Cart friction creating abandonment at the worst moment",
  "Navigation that confuses instead of guiding",
  "Missing trust cues eroding buyer confidence",
  "Conversion signals that are absent or poorly executed",
  "No clear path from landing to purchase",
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Problem() {
  return (
    <SectionWrapper id="problem">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div>
          <Pill tone="mauve" className="mb-4">The problem</Pill>
          <h2 className="text-headline text-ink-900">
            Small UX issues compound into serious{" "}
            <span className="text-coral-600">revenue loss.</span>
          </h2>
          <p className="mt-5 text-body-lg">
            Most Shopify stores have the same handful of fixable issues. The
            challenge is identifying which ones matter most — and addressing
            them in the right order.
          </p>
        </div>

        <motion.ul
          className="space-y-3 lg:pt-2"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {painPoints.map((point) => (
            <motion.li
              key={point}
              variants={item}
              className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-white px-4 py-3 transition-all hover:border-coral-200 hover:shadow-soft group"
            >
              <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-coral-200 group-hover:bg-coral-600 transition-colors flex-shrink-0" />
              <span className="text-[15px] text-ink-700 leading-relaxed">
                {point}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <div className="mt-16 sm:mt-20">
        <AnnotatedScreenshot
          src={annotatedPdp}
          alt="Annotated Shopify product page showing common conversion issues"
          aspect="wide"
          annotations={[
            { x: 50, y: 4, label: "Top banner earns attention well", severity: "positive" },
            { x: 28, y: 50, label: "Product video aids consideration", severity: "positive" },
            { x: 70, y: 38, label: "No review rating beside price", severity: "medium" },
            { x: 70, y: 72, label: "Add-to-cart lacks visual priority", severity: "high" },
          ]}
        />
      </div>
    </SectionWrapper>
  );
}
