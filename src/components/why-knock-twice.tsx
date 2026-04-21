"use client";

import { SectionWrapper } from "./section-wrapper";
import { PlaceholderImage } from "./placeholder-image";
import { motion } from "framer-motion";
import { Pill } from "./ui/pill";
import macbook1 from "@/images/macbook-1.png";

const stats = [
  { value: "2.7×", label: "avg conversion lift", tone: "text-coral-600" },
  { value: "5", label: "days to deliver", tone: "text-ink-900" },
  { value: "30d", label: "automated re-scan", tone: "text-[var(--color-mauve-600)]" },
];

const reasons = [
  {
    title: "Ecommerce-native perspective",
    description:
      "We think in terms of revenue, AOV, and conversion — not just aesthetics. Every recommendation ties back to commercial impact.",
  },
  {
    title: "Design + implementation fluency",
    description:
      "We understand what it takes to actually build changes in Shopify. Recommendations are practical, not theoretical.",
  },
  {
    title: "Premium UX standards",
    description:
      "We hold your store to the same standard as the best DTC brands. Clean design, clear messaging, confident buying experiences.",
  },
  {
    title: "Conversion and experience, together",
    description:
      "We don't trade off user experience for conversion tricks. The best-performing stores do both well — and we audit for both.",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function WhyKnockTwice() {
  return (
    <SectionWrapper id="why-knock-twice">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-16 sm:mb-20">
        {stats.map((s) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center sm:text-left"
          >
            <p className={`text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.035em] ${s.tone}`}>
              {s.value}
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-600 tracking-tight">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
        <div>
          <Pill tone="lavender" className="mb-4">Why Knock Twice</Pill>
          <h2 className="text-headline text-ink-900">
            Built on real ecommerce experience,{" "}
            <span className="text-ink-400">not just theory.</span>
          </h2>
          <p className="mt-5 text-body-lg">
            Knock Twice brings a sharp eye for both design craft and conversion
            performance. We&rsquo;ve worked across Shopify stores, digital
            products, and brand experiences — and we apply all of it to your
            audit.
          </p>

          <div className="mt-10">
            <PlaceholderImage
              src={macbook1}
              alt="A Shopify storefront Knock Twice has reviewed"
              label="Storefronts we review"
              aspect="video"
            />
          </div>
        </div>

        <motion.div
          className="space-y-3 lg:mt-12"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={item}
              className="rounded-2xl border border-ink-100 bg-white p-5 sm:p-6 transition-all hover:border-coral-200 hover:shadow-soft group"
            >
              <h3 className="text-[16px] font-bold tracking-tight text-ink-900 group-hover:text-coral-700 transition-colors">
                {reason.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
