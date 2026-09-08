import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { ThanksHeader } from "@/components/thanks/header";
import { ThanksFooter } from "@/components/thanks/footer";

export const metadata: Metadata = {
  title: "Checkout Cancelled — Knock Twice Shopify",
  description: "Your checkout was cancelled. No payment was taken.",
  robots: { index: false, follow: false },
};

export default function CancelPage() {
  return (
    <>
      <ThanksHeader />
      <main className="min-h-screen bg-[var(--background)]">
        <div className="mx-auto max-w-2xl px-6 sm:px-10 pt-36 pb-20 sm:pt-44 sm:pb-28">
        <div className="text-center">
          <h1 className="text-headline text-neutral-900">
            Checkout <span className="text-rose-600">cancelled.</span>
          </h1>
          <p className="mt-4 text-lg text-neutral-600 leading-relaxed max-w-md mx-auto">
            No payment was taken. If you changed your mind or ran into an issue,
            we&rsquo;re here to help.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link
              href="/#pricing"
              className="inline-flex items-center gap-2 rounded-full bg-rose-600 text-white px-7 py-3 text-sm font-semibold hover:bg-rose-700 transition-colors shadow-soft"
            >
              <ArrowLeft className="h-4 w-4" />
              Try again
            </Link>
            <a
              href="mailto:hello@knocktwice.io"
              className="inline-flex items-center gap-2 rounded-full border-2 border-neutral-900 bg-white px-7 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all"
            >
              Contact us
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <p className="mt-8 text-sm text-neutral-500">
            Have questions before purchasing?{" "}
            <Link
              href="/#faq"
              className="text-rose-600 hover:text-rose-700 underline underline-offset-4 decoration-rose-200 transition-all font-semibold"
            >
              Read our FAQ
            </Link>{" "}
            or{" "}
            <Link
              href="/#lead-capture"
              className="text-rose-600 hover:text-rose-700 underline underline-offset-4 decoration-rose-200 transition-all font-semibold"
            >
              leave your details
            </Link>{" "}
            and we&rsquo;ll follow up.
          </p>
        </div>
        </div>
      </main>
      <ThanksFooter />
    </>
  );
}
