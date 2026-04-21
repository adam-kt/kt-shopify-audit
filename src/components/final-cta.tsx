"use client";

import { CTAButton } from "./cta-button";
import { ArrowRight } from "lucide-react";
import { Sticker } from "./ui/sticker";
import {
  PartySticker,
  HeartSticker,
  StarSticker,
  CoinSticker,
  LightningSticker,
} from "./stickers";

export function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="relative overflow-hidden bg-coral-600 py-24 sm:py-32 lg:py-40"
    >
      {/* Scattered stickers */}
      <Sticker size="lg" tilt={-16} float className="absolute top-[18%] left-[6%]">
        <HeartSticker />
      </Sticker>
      <Sticker size="md" tilt={22} float className="absolute top-[14%] right-[8%]" style={{ animationDelay: "0.6s" }}>
        <StarSticker />
      </Sticker>
      <Sticker size="md" tilt={-12} float className="absolute bottom-[16%] left-[10%] hidden sm:block" style={{ animationDelay: "1.2s" }}>
        <CoinSticker />
      </Sticker>
      <Sticker size="lg" tilt={14} float className="absolute bottom-[14%] right-[6%] hidden sm:block" style={{ animationDelay: "0.4s" }}>
        <PartySticker />
      </Sticker>
      <Sticker size="sm" tilt={-20} float className="absolute top-[48%] left-[18%] hidden lg:block" style={{ animationDelay: "1.8s" }}>
        <LightningSticker />
      </Sticker>

      <div className="relative mx-auto max-w-[1100px] px-6 sm:px-10 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-display text-white">
            A sharper store starts with knowing what to fix.
          </h2>
          <p className="mt-6 text-lg text-white/85 leading-relaxed max-w-lg mx-auto font-medium">
            Expert eyes on your Shopify storefront. Prioritized findings.
            Actionable recommendations. Delivered in days.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5">
            <CTAButton
              href="#pricing"
              size="lg"
              className="!bg-white !text-coral-700 hover:!bg-ink-50"
            >
              Get my audit — $750
              <ArrowRight className="h-4 w-4" />
            </CTAButton>
            <CTAButton
              href="#lead-capture"
              variant="ghost"
              size="lg"
              className="!text-white/80 hover:!text-white decoration-white/40 hover:decoration-white"
            >
              Not ready? Leave your details
            </CTAButton>
          </div>
          <p className="mt-8 text-[11px] font-bold text-white/70 tracking-[0.14em] uppercase">
            Secure checkout · 5 business day turnaround · 100% tailored to your store
          </p>
        </div>
      </div>
    </section>
  );
}
