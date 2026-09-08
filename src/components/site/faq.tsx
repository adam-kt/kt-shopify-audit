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
      "Shopify brands at the point where a couple of points of conversion move a number that matters. Usually that is a founder, an ecommerce manager or a growth lead at a store doing enough volume that small changes compound. If you already suspect the store could be doing better but cannot say which change to make first, that is the gap this fills.",
  },
  {
    question: "Do you work with stores on other platforms?",
    answer:
      "No, Shopify storefronts only. Themes, apps, variant handling, cart behaviour and the checkout all work in particular ways on Shopify, and knowing those specifics is what keeps the recommendations buildable. A platform-agnostic audit tends to produce advice your developer then has to translate before anyone can act on it.",
  },
  {
    question: "What exactly do I receive?",
    answer:
      "A single document rather than a deck. Every finding is ranked by what is worth doing first, and each one appears on an annotated screenshot of your own store showing the element in question and the change we suggest. There is a short order of work at the end so the list can go straight into a sprint. Thirty days later you get a rescan report covering what shipped, what did not, and anything new that has appeared since.",
  },
  {
    question: "What do you need from me?",
    answer:
      "Your store URL and about five minutes on the intake form. We review the public storefront the same way a customer sees it, so there is no admin access to grant, no app to install and no code to add to your site. If there are particular pages, products or hypotheses you want examined closely, the intake form is where to tell us.",
  },
  {
    question: "How long does it take?",
    answer:
      "Five business days from the moment you submit the intake form. If we need something from you during the review we will ask, but the timeline assumes we will not have to.",
  },
  {
    question: "Do you implement the recommendations?",
    answer:
      "Not as part of the $750 audit, which is analysis and recommendations. Most clients hand the document to their own developer or agency, since the findings are written to be picked up directly. If you would rather we made the changes, we quote that separately once you have read the findings, so you are scoping against a real list instead of an estimate.",
  },
  {
    question: "What if we already have an agency or an in-house team?",
    answer:
      "That is usually the better case. A team that already knows the codebase can act on a ranked list immediately, and the ranking settles the argument about what goes first. The audit is written as input for people who are already building, not as a replacement for them.",
  },
  {
    question: "What if you do not find much?",
    answer:
      "The document contains what the review actually surfaces. Every finding is checked against your live store data before it goes in, so nothing is padded to make the list look longer. If we have not started your review, you can have a full refund.",
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
