"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sticker } from "@/components/ui/sticker";
import { HeartSticker, StarSticker, LightningSticker } from "@/components/stickers";
import { useGsapHoverPop, useGsapIn } from "@/lib/gsap-hooks";

const included = [
  "Complete storefront analysis",
  "Homepage, collections, PDPs, cart & mobile",
  "Prioritized findings by revenue impact",
  "Annotated screenshots",
  "30-day automated re-scan",
  "Actionable recommendations",
  "Next-step roadmap",
  "Delivered within 5 business days",
];

export function ThanksCheckout() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const cardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const modalCardRef = useRef<HTMLDivElement>(null);

  useGsapHoverPop(ctaRef, { scale: 1.02, rotate: 0 });
  useGsapIn(cardRef, {
    from: { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
    scroll: true,
  });

  // Animate modal in when opened
  useEffect(() => {
    if (!modalOpen || !modalCardRef.current) return;
    let ctx: gsap.Context | undefined;
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      if (cancelled) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          modalCardRef.current,
          { y: 40, opacity: 0, scale: 0.95, rotate: -2 },
          { y: 0, opacity: 1, scale: 1, rotate: 0, duration: 0.55, ease: "back.out(1.6)" }
        );
      });
    })();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [modalOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    try {
      // Fire-and-forget lead capture so Klaviyo has the prospect even if checkout bails
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

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json();
      if (data.url) {
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
    <section
      id="pricing"
      className="relative py-24 sm:py-32 bg-[var(--color-neutral-50)] overflow-hidden"
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-14 text-center">
        <p className="text-caption mb-4 text-rose-700">Pricing</p>
        <h2
          className="text-mega mx-auto max-w-[14ch]"
          style={{ color: "var(--color-neutral-950)" }}
        >
          One audit. One price.
        </h2>
        <p className="mt-6 mx-auto max-w-lg text-[15px] sm:text-base font-medium text-neutral-800">
          What agencies charge $5&ndash;15K for. Delivered in 5 days, priced to be a no-brainer.
        </p>

        {/* Value anchor bar */}
        <div className="mx-auto max-w-3xl mt-12 grid grid-cols-3 rounded-[var(--radius-card)] border border-neutral-200 bg-white shadow-soft overflow-hidden">
          {[
            { k: "7", v: "surfaces reviewed — homepage to checkout, desktop and mobile" },
            { k: "5 days", v: "from purchase to findings in your inbox" },
            { k: "30 days", v: "later, a free rescan to confirm the fixes landed" },
          ].map((s, i) => (
            <div
              key={i}
              className={cn(
                "px-4 sm:px-6 py-6 text-center",
                i > 0 && "border-l border-neutral-100"
              )}
            >
              <div
                className="text-[clamp(1.5rem,2.8vw,2.25rem)] tracking-[-0.02em] leading-none text-neutral-950"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
              >
                {s.k}
              </div>
              <p className="mt-2 text-[11px] sm:text-[12px] font-semibold text-neutral-600 leading-snug">
                {s.v}
              </p>
            </div>
          ))}
        </div>

        {/* Pricing card */}
        <div className="relative mx-auto max-w-lg mt-14">
          <Sticker size="lg" tilt={-18} float className="absolute -top-12 -left-10 z-10 hidden sm:block">
            <HeartSticker />
          </Sticker>
          <Sticker size="md" tilt={22} float className="absolute -top-8 -right-6 z-10 hidden sm:block">
            <StarSticker />
          </Sticker>
          <Sticker size="md" tilt={-14} float className="absolute -bottom-6 -right-10 z-10 hidden sm:block">
            <LightningSticker />
          </Sticker>

          <div
            ref={cardRef}
            className="relative rounded-[var(--radius-card-lg)] bg-white border-2 border-neutral-950 p-10 sm:p-12 overflow-hidden shadow-soft-lg"
            style={{ rotate: "-1deg" }}
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-indigo-500" />

            <div className="text-center mt-2">
              <span className="inline-flex items-center rounded-full bg-indigo-100 text-indigo-700 px-3 py-1 text-[11px] font-bold tracking-wider uppercase">
                Shopify Conversion Audit
              </span>
              <div className="mt-6">
                <span
                  className="text-[clamp(3.5rem,6vw,5.5rem)] font-extrabold tracking-[-0.04em] text-neutral-950"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  $750
                </span>
              </div>
              <p className="mt-3 text-sm text-neutral-600 font-medium max-w-sm mx-auto">
                Flat price. No retainers. No upsells.
              </p>
            </div>

            <div className="my-8 border-t border-neutral-100" />

            <ul className="space-y-3">
              {included.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                  <span className="text-[14px] text-neutral-800 font-medium text-left">{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center justify-center gap-2 mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-600" />
              </span>
              <span className="text-[11px] font-bold text-neutral-800 tracking-[0.1em] uppercase">
                3 spots remaining this month
              </span>
            </div>

            <button
              ref={ctaRef}
              onClick={() => setModalOpen(true)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 text-white px-8 py-4 text-[15px] font-semibold hover:bg-neutral-800 transition-colors shadow-soft cursor-pointer"
            >
              Get my audit — $750
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="mt-5 rounded-2xl bg-[var(--color-neutral-50)] px-4 py-3 text-center">
              <p className="text-[13px] text-neutral-800 font-semibold">
                Full refund if we haven&rsquo;t started your review.
              </p>
            </div>

            <p className="mt-4 text-center text-[11px] text-neutral-500 tracking-[0.1em] uppercase font-semibold">
              Secure payment via Square · Delivered in 5 business days
            </p>
          </div>
        </div>

        <p className="mt-10 text-sm text-neutral-600">
          Need help implementing the recommendations?{" "}
          <a
            href="mailto:hello@knocktwice.io"
            className="text-rose-600 hover:text-rose-700 underline underline-offset-4 decoration-rose-200 hover:decoration-rose-500 transition-all font-semibold"
          >
            Get in touch
          </a>
        </p>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Start checkout"
        >
          <div
            className="absolute inset-0 bg-neutral-950/55 backdrop-blur-sm"
            onClick={() => !loading && setModalOpen(false)}
          />
          <div
            ref={modalCardRef}
            className="relative w-full max-w-md rounded-[var(--radius-card-lg)] bg-white p-8 sm:p-10 shadow-soft-lg"
          >
            <button
              onClick={() => !loading && setModalOpen(false)}
              disabled={loading}
              className="absolute top-4 right-4 rounded-full p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer disabled:opacity-50"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="inline-flex items-center rounded-full bg-indigo-100 text-indigo-700 px-3 py-1 text-[11px] font-bold tracking-wider uppercase">
              One step to checkout
            </span>
            <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 leading-[1.1]">
              Where should we send the receipt and intake form?
            </h3>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
              />
              {error && (
                <p className="text-xs text-rose-700 font-semibold">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 text-white px-6 py-3.5 text-sm font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-50 shadow-soft"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Processing...
                  </>
                ) : (
                  <>
                    Continue to payment
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-4 text-[11px] text-neutral-500 text-center">
              Secure payment via Square on the next step.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
