"use client";

import { SectionWrapper } from "./section-wrapper";
import { CTAButton } from "./cta-button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Pill } from "./ui/pill";
import { Sticker } from "./ui/sticker";
import { CoinSticker, ChartSticker } from "./stickers";

export function ROISection() {
  return (
    <SectionWrapper id="roi">
      <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
        <div className="relative">
          <Sticker size="md" tilt={-10} float className="absolute -top-6 -left-4 hidden sm:block">
            <CoinSticker />
          </Sticker>

          <Pill tone="butter" className="mb-4">The cost of doing nothing</Pill>
          <h2 className="text-headline text-ink-900">
            A 1% conversion lift on $500K is{" "}
            <span className="text-coral-600">$5,000 per month.</span>
          </h2>
          <p className="mt-5 text-body-lg max-w-lg">
            Most stores we audit have 3&ndash;5 high-impact issues, each worth
            0.1&ndash;0.3% in conversion. The audit pays for itself in the
            first week of improvements.
          </p>

          <div className="mt-8">
            <CTAButton href="#pricing" size="lg">
              Get my audit — $750
              <ArrowRight className="h-4 w-4" />
            </CTAButton>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-5"
        >
          {/* Anchor pricing comparison */}
          <div className="rounded-[var(--radius-card)] border border-ink-100 bg-white p-7 shadow-soft">
            <p className="text-caption text-ink-400 mb-4">What others charge</p>
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-ink-700">Typical CRO agency audit</span>
                <span className="text-sm text-ink-400 line-through">$5,000 – $15,000</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-ink-700">Freelance UX review</span>
                <span className="text-sm text-ink-400 line-through">$2,000 – $5,000</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-ink-700">Internal team time (opportunity cost)</span>
                <span className="text-sm text-ink-400 line-through">$3,000 – $8,000</span>
              </div>
              <div className="border-t border-ink-200 pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-ink-900">Knock Twice audit</span>
                <span className="text-3xl font-extrabold tracking-tight text-coral-600">$750</span>
              </div>
            </div>
          </div>

          {/* Before / After example */}
          <div className="relative rounded-[var(--radius-card)] bg-[var(--color-mint-soft)] p-7 border border-[var(--color-mint)]">
            <Sticker size="sm" tilt={14} className="absolute -top-4 -right-4">
              <ChartSticker />
            </Sticker>
            <Pill tone="mint" className="mb-4">Real result</Pill>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-[11px] font-bold text-ink-500 tracking-[0.1em] uppercase mb-1">Before audit</p>
                <p className="text-4xl font-extrabold tracking-tight text-ink-400">1.8%</p>
                <p className="text-xs text-ink-500 mt-1">conversion rate</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-coral-600 tracking-[0.1em] uppercase mb-1">After top 3 fixes</p>
                <p className="text-4xl font-extrabold tracking-tight text-coral-600">2.4%</p>
                <p className="text-xs text-coral-600 mt-1">conversion rate</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-ink-700 leading-relaxed">
              12 issues found. Top 3 implemented in one sprint. $4,200/mo
              revenue increase on existing traffic.
            </p>
            <p className="mt-2 text-[11px] text-ink-400 tracking-wide">
              Placeholder — replace with real client data
            </p>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
