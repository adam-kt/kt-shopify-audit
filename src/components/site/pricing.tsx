"use client";

/**
 * B13 — pricing and checkout. LIVE COMMERCE — see docs/aceternity-migration.md §1.
 *
 * Adapted from @aceternity/pricing-page-with-featured-and-enterprise
 * (src/block/pricing-page-with-featured-and-enterprise.tsx, pristine). Kept the
 * card shell, the featured-tier treatment and the tick-list.
 *
 * Changed from upstream:
 *  - Three subscription tiers (Starter/Premium/Business, $19–$99 per month with
 *    AI credits) reduced to two, and the separate enterprise band dropped — with
 *    only two cards it would have read as a third tier.
 *  - Upstream cards are static buttons with a `priceId` field for Stripe. This
 *    wires tier one to the existing Square flow instead.
 *
 * Why the second tier is a quote and not a purchase: /api/checkout hardcodes
 * the product (`quickPay: { name: "Shopify Conversion Audit", 75000 }`) and
 * accepts only name/email. A second purchasable tier means changing that route
 * and the webhook that reconciles it. Implementation is scoped per engagement
 * anyway — the FAQ already says so — so it is a contact tier.
 *
 * The checkout sequence is carried over verbatim and must stay in this order:
 *   submit -> POST /api/lead   (Klaviyo, fire-and-forget)
 *          -> POST /api/checkout (Square)
 *          -> window.location.href = data.url
 * The lead fires first and unawaited so a prospect who abandons at Square is
 * still captured. Do not await it, and do not reorder.
 */

import React, { useState, type FormEvent } from "react";
import { IconCheck } from "@tabler/icons-react";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

/** Fire a GA4 event when consent allows. No-ops if gtag is absent. */
const track = (event: string, params?: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...a: unknown[]) => void };
  w.gtag?.("event", event, params ?? {});
};

const AUDIT_FEATURES = [
  "Every page, desktop and phone",
  "Findings ranked by impact",
  "An annotated screenshot per finding",
  "Claims checked against your live store data",
  "Five business days",
  "30-day rescan included",
];

/** Moved up from the closing CTA. Someone weighing $750 wants to know what
 *  they are signing up for before the price, not four viewports after it. */
const STEPS = [
  "Send your store URL and fill in the intake form. About five minutes.",
  "We review the storefront and check every finding against your live store data.",
  "Five business days later the document is in your inbox.",
  "Thirty days after you ship, we rescan and confirm what landed.",
];

const IMPLEMENTATION_FEATURES = [
  "Everything in the audit",
  "We make the changes ourselves",
  "Quoted once you've read the findings",
  "Work sequenced by the same ranking",
  "Rescan when the work is done",
];

export function SitePricing() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="pricing" className="scroll-mt-28 px-4 py-16 md:px-8 md:py-24 lg:px-16">
      <div className="mx-auto w-full max-w-5xl">
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
          One price. No retainer.
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-center text-base text-balance md:text-lg">
          Buy the audit on its own. If you want us to make the changes too,
          we&rsquo;ll quote that once you&rsquo;ve seen the findings.
        </p>

        <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step} className="flex gap-3">
              <span className="bg-muted text-foreground flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular-nums">
                {i + 1}
              </span>
              <span className="text-muted-foreground text-sm">{step}</span>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          <PlanCard
            featured
            name="The audit"
            description="We find the problems. Your team fixes them."
            price="$750"
            priceNote="one time"
            features={AUDIT_FEATURES}
            cta="Get my audit"
            onClick={() => {
              track("begin_checkout", { tier: "audit", value: 750, currency: "USD" });
              setModalOpen(true);
            }}
          />
          <PlanCard
            name="Audit + implementation"
            description="We find the problems and fix them too."
            price="Quoted"
            priceNote="from the audit"
            features={IMPLEMENTATION_FEATURES}
            cta="Talk to us"
            href="mailto:hello@knocktwice.io?subject=Audit%20%2B%20implementation"
            onClick={() => track("contact_click", { tier: "implementation" })}
          />
        </div>

        <p className="text-muted-foreground mt-8 text-center text-sm">
          No admin access needed &middot; Full refund if we haven&rsquo;t started
          &middot; Secure payment via Square
        </p>
      </div>

      {modalOpen && <CheckoutModal onClose={() => setModalOpen(false)} />}
    </section>
  );
}

interface PlanCardProps {
  name: string;
  description: string;
  price: string;
  priceNote: string;
  features: string[];
  cta: string;
  featured?: boolean;
  href?: string;
  onClick?: () => void;
}

const PlanCard = ({
  name,
  description,
  price,
  priceNote,
  features,
  cta,
  featured,
  href,
  onClick,
}: PlanCardProps) => {
  const ctaClasses = cn(
    "mt-8 block w-full cursor-pointer rounded-lg px-4 py-3 text-center text-sm font-semibold transition duration-200 active:scale-[0.98]",
    featured
      ? "bg-primary text-primary-foreground"
      : "bg-card ring-1 ring-black/10 dark:ring-white/15"
  );

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-xl p-6 md:p-8",
        featured
          ? "bg-card shadow-lg ring-2 ring-black/10 dark:ring-white/20"
          : "bg-card/50 ring-1 ring-black/5 dark:ring-white/5"
      )}
    >
      <p className="text-base font-semibold md:text-lg">{name}</p>
      <p className="text-muted-foreground mt-1 text-sm">{description}</p>

      <div className="my-6">
        <span className="text-3xl font-medium md:text-4xl">{price}</span>
        <span className="text-muted-foreground ml-2 text-sm">{priceNote}</span>
      </div>

      <ul className="flex flex-col gap-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <IconCheck className="text-muted-foreground mt-0.5 size-4 shrink-0" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        {href ? (
          <a href={href} onClick={onClick} className={ctaClasses}>
            {cta}
          </a>
        ) : (
          <button type="button" onClick={onClick} className={ctaClasses}>
            {cta}
          </button>
        )}
      </div>
    </div>
  );
};

const CheckoutModal = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    try {
      // Fire-and-forget so Klaviyo has the prospect even if checkout bails.
      // Deliberately not awaited — see the header note.
      fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          storeUrl: "",
          message: "Pre-checkout capture",
        }),
      }).catch(() => {});
      track("generate_lead", { tier: "audit" });

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json();
      if (data.url) {
        track("checkout_redirect", { tier: "audit", value: 750, currency: "USD" });
        window.location.href = data.url;
      } else {
        setError("Could not start checkout. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Could not start checkout. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-heading"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => !loading && onClose()}
      />
      <div className="bg-card relative w-full max-w-md rounded-xl p-8 shadow-2xl ring-1 ring-black/10 dark:ring-white/10">
        <button
          type="button"
          onClick={() => !loading && onClose()}
          disabled={loading}
          aria-label="Close"
          className="text-muted-foreground hover:bg-muted absolute top-4 right-4 rounded-full p-1.5 transition-colors disabled:opacity-50"
        >
          <X className="size-5" />
        </button>

        <h3 id="checkout-heading" className="text-2xl font-bold tracking-tight">
          Where should we send the receipt?
        </h3>
        <p className="text-muted-foreground mt-2 text-sm">
          Then we&rsquo;ll take you to Square to pay. The intake form comes
          straight after.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <label className="sr-only" htmlFor="checkout-name">
            Your name
          </label>
          <input
            id="checkout-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            className="bg-background rounded-lg px-4 py-3 text-sm ring-1 ring-black/10 outline-none focus:ring-2 dark:ring-white/15"
          />
          <label className="sr-only" htmlFor="checkout-email">
            Email address
          </label>
          <input
            id="checkout-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@brand.com"
            autoComplete="email"
            className="bg-background rounded-lg px-4 py-3 text-sm ring-1 ring-black/10 outline-none focus:ring-2 dark:ring-white/15"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-primary-foreground mt-2 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? "Starting checkout…" : "Continue to payment"}
            {!loading && <ArrowRight className="size-4" />}
          </button>
        </form>
      </div>
    </div>
  );
};
