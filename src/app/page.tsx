import { ThanksHeader } from "@/components/thanks/header";
import { ThanksHero } from "@/components/thanks/hero";
import { AuditDeliverablePreview } from "@/components/thanks/audit-deliverable-preview";
import { IntroText } from "@/components/thanks/intro-text";
import { SuperHeadline } from "@/components/thanks/super-headline";
import { FeatureGrid } from "@/components/thanks/feature-grid";
import { TabBand } from "@/components/thanks/tab-band";
import { StatsBand } from "@/components/thanks/stats-band";
import { Testimonial } from "@/components/thanks/testimonial";
import { FeatureTrio } from "@/components/thanks/feature-trio";
import { ThanksFAQ } from "@/components/thanks/faq";
import { ThanksCheckout } from "@/components/thanks/checkout";
import { ThanksFinalCTA } from "@/components/thanks/final-cta";
import { ThanksFooter } from "@/components/thanks/footer";
import {
  HeartSticker,
  SparkleSticker,
  CursorSticker,
  LightningSticker,
  ChartSticker,
  StarSticker,
} from "@/components/stickers";
import { Sticker } from "@/components/ui/sticker";
import Image from "next/image";
import macbook1 from "@/images/macbook-1.png";
import macbook2 from "@/images/macbook-2.png";
import iphone1 from "@/images/iphone-1.png";
import iphone2 from "@/images/iphone-2.png";
import reviewHomepage from "@/images/review/homepage-trust.png";
import reviewProduct from "@/images/review/product-evidence.png";
import reviewCart from "@/images/review/cart-funnel.png";
import reviewMobile from "@/images/review/mobile-thumb.png";

export default function HomePage() {
  return (
    <>
      <ThanksHeader />

      <main>
        <ThanksHero />

        <AuditDeliverablePreview />

        <IntroText>
          Every Shopify store leaks revenue. Most leaks are small but fixable.
          We review your storefront by hand and deliver the highest-impact fixes —
          ranked by revenue, shipped in 5 business days.
        </IntroText>

        <SuperHeadline eyebrow="How it works">
          Find the friction. Fix the revenue.
        </SuperHeadline>

        {/* 2x2 feature grid — deliverables */}
        <FeatureGrid
          features={[
            {
              tone: "brand",
              title: "Every page reviewed",
              body: "Homepage, collections, PDPs, cart, checkout, navigation, mobile. Nothing skipped.",
              visual: (
                <>
                  <Image
                    src={macbook1}
                    alt="Storefront review on desktop"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 480px"
                    placeholder="blur"
                  />
                  <Sticker
                    size="sm"
                    tilt={-14}
                    float
                    className="absolute top-4 right-4 z-20"
                  >
                    <HeartSticker />
                  </Sticker>
                </>
              ),
            },
            {
              tone: "peach",
              title: "Ship-ready roadmap",
              body: "Each fix is sequenced by impact — so your team starts with the biggest wins and stops guessing what to work on.",
              visual: (
                <>
                  <Image
                    src={macbook2}
                    alt="Prioritized action plan"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 480px"
                    placeholder="blur"
                  />
                  <Sticker
                    size="sm"
                    tilt={12}
                    float
                    className="absolute top-4 left-4 z-20"
                  >
                    <LightningSticker />
                  </Sticker>
                </>
              ),
            },
            {
              tone: "tan",
              title: "Annotated screenshots",
              body: "Exactly what to change, where, and why it matters. Your dev team can start Monday.",
              visual: (
                <>
                  <Image
                    src={iphone1}
                    alt="Annotated mobile screenshot"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 480px"
                    placeholder="blur"
                  />
                  <Sticker
                    size="sm"
                    tilt={-10}
                    float
                    className="absolute top-4 right-4 z-20"
                  >
                    <ChartSticker />
                  </Sticker>
                </>
              ),
            },
            {
              tone: "lilac",
              title: "30-day rescan included",
              body: "We check back once your fixes ship — free — to confirm impact and flag regressions.",
              visual: (
                <>
                  <Image
                    src={iphone2}
                    alt="Follow-up rescan"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 480px"
                    placeholder="blur"
                  />
                  <Sticker
                    size="sm"
                    tilt={14}
                    float
                    className="absolute top-4 left-4 z-20"
                  >
                    <SparkleSticker />
                  </Sticker>
                </>
              ),
            },
          ]}
        />

        {/* Carousel 1 — Pages we review */}
        <TabBand
          id="what-you-get"
          tone="golden"
          eyebrow="What we review"
          headline="Every surface. Every friction point."
          subhead="We audit each touchpoint in your funnel with the same rigor — because your revenue leaks compound across them."
          slides={[
            {
              label: "Homepage",
              title: "Homepage",
              body: "Hero clarity, value prop visibility, nav depth, and the first 3 seconds of trust that decide whether a visitor stays.",
              tone: "peach",
              image: reviewHomepage,
              imageAlt: "Homepage trust review",
              sticker: (
                <Sticker
                  size="md"
                  tilt={-14}
                  float
                  className="absolute -top-6 -right-6 z-30 pointer-events-none"
                >
                  <HeartSticker />
                </Sticker>
              ),
            },
            {
              label: "PDP",
              title: "Product pages",
              body: "Variant clarity, sticky ATC, reviews placement, urgency signals — the moment browsers become buyers.",
              tone: "brand",
              image: reviewProduct,
              imageAlt: "Product evidence review",
              sticker: (
                <Sticker
                  size="md"
                  tilt={14}
                  float
                  className="absolute -top-6 -left-6 z-30 pointer-events-none"
                >
                  <ChartSticker />
                </Sticker>
              ),
            },
            {
              label: "Cart",
              title: "Cart & checkout",
              body: "Trust cues at the decision point, shipping surprises, and the micro-friction that triggers abandonment.",
              tone: "tan",
              image: reviewCart,
              imageAlt: "Cart funnel review",
              sticker: (
                <Sticker
                  size="md"
                  tilt={-10}
                  float
                  className="absolute -bottom-6 -right-6 z-30 pointer-events-none"
                >
                  <LightningSticker />
                </Sticker>
              ),
            },
            {
              label: "Mobile",
              title: "Mobile experience",
              body: "Where 73% of traffic meets the friction. Sticky elements, tap targets, scroll depth, and mobile-specific drop-offs.",
              tone: "mint",
              image: reviewMobile,
              imageAlt: "Mobile experience review",
              sticker: (
                <Sticker
                  size="md"
                  tilt={16}
                  float
                  className="absolute -bottom-6 -left-6 z-30 pointer-events-none"
                >
                  <SparkleSticker />
                </Sticker>
              ),
            },
          ]}
        />

        <div className="h-8 sm:h-14" />

        {/* Carousel 2 — What you ship first */}
        <TabBand
          id="deliverables"
          tone="brand"
          eyebrow="What you receive"
          headline="Deliverables your team can ship."
          subhead="Not a deck. Not a checklist. A prioritized action plan with exact, implementable fixes."
          slides={[
            {
              label: "Audit doc",
              title: "The audit document",
              body: "A single, focused document with every finding ranked by revenue impact. No filler, no fluff.",
              tone: "lilac",
            },
            {
              label: "Screenshots",
              title: "Annotated screenshots",
              body: "Every issue shown on a real screenshot of your store. Exactly what to change, and where.",
              tone: "peach",
            },
            {
              label: "Roadmap",
              title: "Ship-first roadmap",
              body: "What to tackle first, second, third — with optional implementation estimates so planning is trivial.",
              tone: "mint",
            },
            {
              label: "Rescan",
              title: "30-day rescan report",
              body: "One month after delivery, an automated re-scan to verify fixes shipped cleanly and flag anything new.",
              tone: "sky",
            },
          ]}
        />

        {/* Stats band */}
        <StatsBand
          headline="Built for revenue, not reports."
          subhead="Priced and scoped to be a no-brainer next to a $15K agency audit."
          stats={[
            { value: "2.7×", label: "avg conversion lift after top 3 fixes" },
            { value: "5 days", label: "from purchase to findings in your inbox" },
            { value: "$750", label: "flat price, no retainers, no upsells" },
          ]}
        />

        {/* Testimonial */}
        <Testimonial
          quote="They found 14 issues we'd been blind to for months. Three of the top fixes took our dev team a single sprint — conversion went from 1.6% to 2.3% within six weeks."
          name="Sarah Chen"
          role="Head of Ecommerce, DTC apparel brand"
        />

        {/* Why Knock Twice feature trio */}
        <FeatureTrio
          items={[
            {
              sticker: <CursorSticker />,
              title: "Manual, not automated",
              body: "Every audit conducted by hand by our team. No generic checklist, no AI slop — just the judgment of people who ship Shopify for a living.",
            },
            {
              sticker: <SparkleSticker />,
              title: "Shopify-native",
              body: "Our process, benchmarks, and recommendations are calibrated for Shopify. We understand what your dev team can actually build.",
            },
            {
              sticker: <ChartSticker />,
              title: "Ranked by revenue",
              body: "Every finding scored by likely conversion impact — so you never wonder which fix is worth the sprint and which is cosmetic.",
            },
            {
              sticker: <StarSticker />,
              title: "30-day rescan included",
              body: "We check back after your team ships. Confirms impact, catches regressions, keeps the team accountable. Free, every time.",
            },
          ]}
        />

        {/* FAQ */}
        <ThanksFAQ
          headline="Every objection, handled."
          items={[
            {
              question: "Who is this for?",
              answer:
                "Shopify brands — founders, operators, ecom managers, growth leads — who know their store could be performing better and want a specific, actionable plan to fix it. If your monthly revenue is north of $50K, the audit pays for itself in the first week of improvements.",
            },
            {
              question: "Is this only for Shopify stores?",
              answer:
                "Yes. We only audit Shopify storefronts. Our process, benchmarks, and recommendations are all calibrated specifically for the Shopify ecosystem.",
            },
            {
              question: "What exactly do I receive?",
              answer:
                "A comprehensive audit document with prioritized findings (ranked by revenue impact), annotated screenshots of your actual store, and a next-step action plan. Thirty days later, you get an automated rescan report showing what's been fixed and what's new.",
            },
            {
              question: "How long does it take?",
              answer:
                "Five business days from the moment you complete the short intake form. The intake itself takes under 5 minutes.",
            },
            {
              question: "Do you implement the recommendations?",
              answer:
                "The audit is analysis and recommendations. If you want implementation support afterward we'll scope it separately. Most clients brief their internal team or existing agency directly from the audit.",
            },
            {
              question: "What if I already have a CRO agency or internal team?",
              answer:
                "Even better. The audit gives them a prioritized roadmap to work from — no ramp-up, no guessing. Every engagement we've done for teams with in-house CRO has surfaced issues the team missed.",
            },
          ]}
        />

        {/* Pricing + checkout */}
        <ThanksCheckout />

        {/* Final CTA */}
        <ThanksFinalCTA
          headline="Stop guessing. Start shipping the fixes that actually move revenue."
          tagline="$750. 5-day turnaround. Full refund if we haven't started."
        />
      </main>

      <ThanksFooter />
    </>
  );
}
