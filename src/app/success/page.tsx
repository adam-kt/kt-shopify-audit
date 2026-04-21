import { CheckCircle, Mail, FileText, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { ThanksHeader } from "@/components/thanks/header";
import { ThanksFooter } from "@/components/thanks/footer";

export const metadata: Metadata = {
  title: "Audit Purchased — Knock Twice Shopify",
  description: "Your Shopify Conversion Audit has been booked.",
  robots: { index: false, follow: false },
};

const nextSteps = [
  {
    icon: Mail,
    title: "Check your email",
    description:
      "You'll receive a confirmation email with a short intake form. Share your store URL, goals, and any specific areas you'd like us to focus on.",
  },
  {
    icon: FileText,
    title: "We begin your review",
    description:
      "Once you've submitted the intake form, our team starts a thorough review of your Shopify storefront — every page, flow, and conversion touchpoint.",
  },
  {
    icon: Clock,
    title: "Receive your audit",
    description:
      "Within 5 business days, you'll receive your complete audit with prioritized findings, annotated screenshots, and action plan. Thirty days later, you'll get an automated re-scan report.",
  },
];

export default function SuccessPage() {
  return (
    <>
      <ThanksHeader />
      <main className="min-h-screen bg-[var(--color-cream)]">
      <div className="mx-auto max-w-2xl px-6 sm:px-10 pt-36 pb-20 sm:pt-44 sm:pb-28">
        <div className="text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-mint-soft)]">
            <CheckCircle className="h-8 w-8 text-emerald-700" />
          </div>
          <h1 className="text-headline text-ink-900">
            Your audit is <span className="text-coral-600">booked.</span>
          </h1>
          <p className="mt-4 text-lg text-ink-600 leading-relaxed max-w-md mx-auto">
            Thanks for purchasing a Shopify Conversion Audit. We&rsquo;re
            looking forward to helping you improve your store.
          </p>
        </div>

        <div className="mt-14">
          <p className="text-caption mb-6">What happens next</p>
          <div className="space-y-4">
            {nextSteps.map((step, index) => (
              <div
                key={step.title}
                className="flex gap-4 rounded-[var(--radius-card)] border border-ink-100 bg-white p-6 shadow-soft"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-coral-600 text-white">
                    <step.icon className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-coral-700 tracking-[0.1em] uppercase">
                    Step {index + 1}
                  </span>
                  <h3 className="mt-1 text-[16px] font-bold tracking-tight text-ink-900">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-[var(--radius-card)] bg-ink-950 p-6 sm:p-8 text-center shadow-soft">
          <p className="text-[11px] font-bold text-coral-300 tracking-[0.12em] uppercase">
            Step 1 — Now
          </p>
          <h3 className="mt-2 text-[20px] sm:text-[22px] font-extrabold tracking-[-0.015em] text-white">
            Fill out the intake form
          </h3>
          <p className="mt-2 text-sm text-white/70 max-w-sm mx-auto leading-relaxed">
            Five minutes of detail about your store, products, and struggles
            — the more we know, the sharper the audit.
          </p>
          <Link
            href="/intake"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white text-ink-950 px-6 py-3 text-sm font-semibold hover:bg-ink-100 transition-colors"
          >
            Start the intake
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 rounded-[var(--radius-card)] border border-ink-100 bg-white p-6 text-center shadow-soft">
          <p className="text-sm text-ink-600">
            Questions about your audit? Reach out any time.
          </p>
          <a
            href="mailto:hello@knocktwice.io"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-coral-600 hover:text-coral-700 transition-colors"
          >
            hello@knocktwice.io
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-ink-500 hover:text-ink-900 transition-colors font-medium"
          >
            &larr; Back to Knock Twice Shopify
          </Link>
        </div>
      </div>
    </main>
      <ThanksFooter />
    </>
  );
}
