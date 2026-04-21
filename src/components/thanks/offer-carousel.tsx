"use client";

import { cn } from "@/lib/utils";

export interface Offer {
  brandInitial: string;
  headline: string;
  ctaLabel: string;
  tone: "sage" | "sunflower" | "berry" | "stone" | "indigo" | "coral";
  ctaTone: "sage" | "sunflower" | "berry" | "stone" | "indigo" | "coral";
}

const cardToneStyles: Record<Offer["tone"], string> = {
  sage: "bg-[#d6e9c8]",
  sunflower: "bg-[#f6e4a3]",
  berry: "bg-[#d9bfbf]",
  stone: "bg-[#e7e4db]",
  indigo: "bg-[#7c72e0]",
  coral: "bg-[#f5c8b0]",
};

const ctaToneStyles: Record<Offer["ctaTone"], string> = {
  sage: "bg-[#4fb86b] text-white",
  sunflower: "bg-[#f2c645] text-ink-950",
  berry: "bg-[#b03a3a] text-white",
  stone: "bg-[#2f5f83] text-white",
  indigo: "bg-[#584ed1] text-white",
  coral: "bg-[#df5b3a] text-white",
};

interface OfferCarouselProps {
  offers: Offer[];
}

export function OfferCarousel({ offers }: OfferCarouselProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="snap-scroller flex gap-5 overflow-x-auto px-6 sm:px-10 lg:px-14 pb-4">
        {offers.map((offer, i) => (
          <article
            key={i}
            className={cn(
              "flex-shrink-0 w-[300px] sm:w-[340px] rounded-[var(--radius-card)] p-6 flex flex-col gap-4",
              cardToneStyles[offer.tone]
            )}
          >
            {/* Brand circle + image placeholder */}
            <div className="relative aspect-[4/3] rounded-[20px] bg-white/40 overflow-hidden flex items-center justify-center">
              <span className="absolute top-3 left-3 h-10 w-10 rounded-full bg-white flex items-center justify-center text-[11px] font-bold text-ink-950">
                {offer.brandInitial}
              </span>
              <span className="text-caption text-ink-700">Offer image</span>
            </div>

            <p className="text-[15px] font-bold text-ink-950 text-center leading-snug px-2">
              {offer.headline}
            </p>

            <button
              className={cn(
                "mt-auto rounded-full py-3 text-[14px] font-semibold transition-opacity hover:opacity-90",
                ctaToneStyles[offer.ctaTone]
              )}
            >
              {offer.ctaLabel}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
