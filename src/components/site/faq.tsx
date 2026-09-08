/**
 * B12 — FAQ.
 *
 * Adapted from @aceternity/frequently-asked-questions-accordion
 * (src/block/frequently-asked-questions-accordion.tsx, pristine). Kept the
 * two-column layout and the plus/minus affordance.
 *
 * Rebuilt on <details>/<summary> rather than upstream's React state, for two
 * reasons that both cost real money on a page like this:
 *
 *  1. SEO. Upstream mounts the answer only while open (AnimatePresence), so a
 *     crawler sees six questions and no answers. FAQ copy is the best long-tail
 *     search surface on the page — the live site throws all of it away.
 *  2. Accessibility. Upstream's toggle is a <div> with onClick: not focusable,
 *     not operable by keyboard, no expanded state announced. <summary> is all
 *     three for free.
 *
 * The open/close animation is CSS (grid-template-rows 0fr -> 1fr), so it also
 * works with JavaScript disabled and needs no client component.
 *
 * Copy is the six answers from the previous build, edited for length.
 */

import { IconPlus } from "@tabler/icons-react";

const FAQS = [
  {
    question: "Who is this for?",
    answer:
      "Shopify brands doing enough revenue that a few points of conversion matter — founders, operators, ecommerce and growth leads. If you know the store could be doing better but not what to change first, that's the gap this fills.",
  },
  {
    question: "Is this only for Shopify stores?",
    answer:
      "Yes. Only Shopify storefronts. The process and the benchmarks are specific to the platform, and that's the reason the recommendations are things your team can actually build.",
  },
  {
    question: "What exactly do I receive?",
    answer:
      "One document. Every finding ranked by what's worth doing first, each shown on an annotated screenshot of your own store, plus a next-step order of work. Thirty days later, a rescan report showing what shipped and what's new.",
  },
  {
    question: "How long does it take?",
    answer:
      "Five business days from the moment you finish the intake form, which takes under five minutes.",
  },
  {
    question: "Do you implement the recommendations?",
    answer:
      "Not in the $750 audit — that's analysis and recommendations. If you want the changes made, we quote that from the findings once you've seen them, so you're scoping against a real list rather than a guess.",
  },
  {
    question: "What if I already have an agency or an in-house team?",
    answer:
      "That's usually the better case. They get a prioritized list to work from with no ramp-up, and no argument about what to do first — the ranking does that. Most of our audits go straight to a team that's already building.",
  },
];

export function SiteFaq() {
  return (
    <section id="faq" className="scroll-mt-28 px-4 py-16 md:px-8 md:py-24 lg:px-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
            Questions people ask
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md text-base md:text-lg">
            If yours isn&rsquo;t here,{" "}
            <a
              href="mailto:hello@knocktwice.io"
              className="underline underline-offset-4 hover:no-underline"
            >
              email us
            </a>{" "}
            and we&rsquo;ll answer it.
          </p>
        </div>

        <div className="divide-border divide-y">
          {FAQS.map((faq) => (
            <details key={faq.question} className="group py-4">
              <summary className="flex cursor-pointer list-none items-start gap-4 [&::-webkit-details-marker]:hidden">
                <IconPlus
                  aria-hidden
                  className="text-muted-foreground mt-0.5 size-5 shrink-0 transition-transform duration-200 group-open:rotate-45"
                />
                <h3 className="text-base font-medium md:text-lg">
                  {faq.question}
                </h3>
              </summary>
              {/* 0fr -> 1fr animates to auto height without measuring. */}
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-out group-open:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="text-muted-foreground pt-3 pl-9 text-sm md:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
