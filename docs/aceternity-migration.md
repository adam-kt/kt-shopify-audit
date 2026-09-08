# Aceternity migration — content & integration spec

Working document for porting `auditshopify.com` block by block onto Aceternity UI.

**How to use:** each block below is self-contained. Take one, build it, tick its
checkbox, move on. All copy is verbatim from the live page as of commit `fea1dbe` —
port it exactly unless you're deliberately rewriting. Anything under **Must survive**
is live commerce or measurement; breaking it costs money, not polish.

---

## 0. Pre-flight

### The Tailwind problem

This project runs **Tailwind 4.2.2 with CSS-first config**. There is no
`tailwind.config.ts`. `src/app/globals.css` bootstraps with `@import "tailwindcss"`
followed by an `@theme {}` block.

Aceternity components are written for **Tailwind v3**. Their install steps tell you to
add `theme.extend.animation` / `theme.extend.keyframes` to a config file that doesn't
exist here, and several ship an `addVariablesForColors` plugin snippet importing
`tailwindcss/plugin`.

Two options:

1. **Compat bridge (recommended for a copy-paste-heavy port).** Create
   `tailwind.config.ts` and add `@config "../../tailwind.config.ts";` to the top of
   `globals.css`, immediately after the `@import`. Aceternity's instructions then work
   as published.
2. **Translate per component.** Move each component's keyframes into `globals.css` as
   `@keyframes` plus `@theme { --animate-*: ... }`. Cleaner long-term, slower per block.

Good news: the `@theme` block *extends* Tailwind's default palette rather than
replacing it, so Aceternity's `bg-slate-900` / `text-neutral-300` classes resolve fine.

### Dependencies

| Package | State | Action |
|---|---|---|
| `framer-motion` | `^11.15.0`, **imported nowhere** | Re-adopt, or swap to `motion` if your components use the renamed package |
| `gsap` | `^3.15.0`, drives all current animation | Decide: keep, or retire as blocks migrate. **Do not ship both permanently.** |
| `react` | `19.2.5` | Framer Motion ≥ 11.11 required — current version is fine |
| `next` | `15.5.15` | App Router, RSC. Aceternity components need `"use client"` |
| `tailwindcss` | `4.2.2` | See above |

### Motion budget

The page currently ships **12 distinct animation durations and 7 easings**. Pick a
constrained set before you start — 4 durations, 2 easings — and hold every Aceternity
component to it. Otherwise the port inherits the same inconsistency in a new costume.

---

## 1. Must survive the migration

Non-negotiable. Verify each after every block that touches it.

| Concern | Where | Note |
|---|---|---|
| Square checkout | `src/app/api/checkout/route.ts`, `src/lib/square.ts` | Modal collects name + email, POSTs `/api/checkout`, redirects to `data.url` |
| Lead capture | `src/components/thanks/checkout.tsx:68` → `/api/lead` → `src/lib/klaviyo.ts` | Fires **before** checkout so abandoned carts are still captured |
| Square webhook | `src/app/api/webhooks/square/route.ts` | Order confirmation; `src/lib/order-email-store.ts` |
| Intake submission | `src/app/api/intake/route.ts` | Post-purchase form |
| GA4 + consent | `src/app/layout.tsx:37,103-127` | ID `G-PC8RMENX1Z`, `analytics_storage: 'denied'` by default |
| Cookie consent | `src/components/cookie-consent.tsx` | Gates the above |
| SEO metadata | `src/app/layout.tsx` | Title, description, OG, Twitter, keywords — see §3 |
| Routes | `/intake`, `/success`, `/cancel`, `/privacy`, `/terms`, `/robots.txt`, `/sitemap.xml` | Must keep resolving |
| Anchors | `#what-you-get`, `#pricing`, `#faq`, `#deliverables` | Header nav and every in-page CTA depends on these |

---

## 2. Current design tokens

Defined in `src/app/globals.css` under `@theme`. Carry forward or deliberately replace —
don't let them drift.

```
Ground      --color-bg #f9f4ea   --color-cream #f3f2ee   --color-cream-soft #f8f7f4
Ink         --color-ink-950 #000000 … --color-ink-50 #f6f6f6  (11 steps)
Brand       --color-brand-500 #3dbf7a  (green, 50–800, 9 steps)
Accents     --color-pink-500 #f4b1dc   --color-golden #ecb94a  --color-peach #ffcfa8
            --color-tan #ede2d1        --color-sky #c3dff4     --color-mint #bfe8c9
            (each with a -soft variant)
Coral       --color-coral-500/600/700  (used for CTA pings and link underlines)
Type        --font-sans → F37 Zagma (local, 6 weights)
            --font-display → F37 Elastica / Anton (condensed)
            --font-mono-display → F37 Ginger Mono
Shape       --radius-card, --radius-card-lg, --shadow-soft, --shadow-soft-lg
```

> **Licensing:** Zagma, Elastica and Ginger Mono are loaded from
> `public/fonts/**` as **Trial** files. If the rebuild keeps them, buy licenses.

### Type scale — fix this during the port

The live page uses **21 distinct type sizes** (14 hardcoded `text-[Npx]` + 7 overlapping
`clamp()` scales) and **9 tracking values**. Two of the clamps differ by 4px and do the
same job. Define six sizes and snap every block to them as you migrate. This is the
single highest-return change in the whole port, independent of Aceternity.

---

## 3. Site metadata

```
title       Shopify Conversion Audit — Knock Twice
description Expert Shopify conversion audit for DTC brands. We review your storefront
            and deliver prioritized, actionable recommendations to improve conversion,
            trust, and revenue. $750.
keywords    Shopify audit, conversion audit, Shopify conversion, ecommerce UX,
            Shopify optimization, DTC brands, Shopify CRO, store audit
author      Knock Twice
metadataBase NEXT_PUBLIC_SITE_URL || https://auditshopify.com
OG          type website · locale en_US · siteName "Knock Twice Shopify"
            image /og-image.png (1200×630) alt "Knock Twice Shopify Conversion Audit"
OG title    Shopify Conversion Audit — Knock Twice
OG desc     Expert Shopify conversion audit for DTC brands. Prioritized findings,
            actionable recommendations, delivered in 5 days. $750.
Twitter     summary_large_image, same title, /og-image.png
Twitter desc Expert Shopify conversion audit for DTC brands. Prioritized findings,
            actionable recommendations. $750.
robots      index, follow
```

---

# Block inventory

---

## B1 — Header  `[ ]`

**Current:** `src/components/thanks/header.tsx` · **Aceternity candidate:** Floating Navbar / Resizable Navbar

Fixed, `z-50`, transparent until `scrollY > 20`, then fades to
`rgba(255,255,255,0.7)` with a soft shadow; logo scales `1 → 0.82`.

- Logo: `CircleLogo size={76}` (`thanks/circle-logo.tsx`), links `/`, aria-label "Home"
- Nav (hidden below `lg`): **What we review** `/#what-you-get` · **Pricing** `/#pricing` · **FAQ** `/#faq`
- CTA: **Get my audit** → `/#pricing`
- Mobile: hamburger button, `aria-label="Open menu"` — **currently renders but does nothing.** Wire it during the port.

**Must survive:** the three anchor hrefs.

---

## B2 — Hero  `[ ]`

**Current:** `src/components/thanks/hero.tsx` · **Aceternity candidates:** Spotlight, Hero Highlight; Flip Words or Typewriter Effect for the rotating line; Infinite Moving Cards for the logo strip

- Pill (with animated coral ping dot): **3 audit slots open this month**
- H1 line 1: **The Shopify audit**
- H1 line 2 rotates through (`thanks/word-swap.tsx`):
  - that pays for itself
  - that finds hidden revenue
  - your competitors wish they had
  - ranked by ROI
- Subhead: *A conversion review of your Shopify storefront, verified against your live store data. Prioritized findings, annotated screenshots, and a 30-day rescan — delivered in 5 business days.*
- Primary CTA: **Get my audit — $750** → `#pricing` (with `ArrowRight`)
- Secondary CTA: **See what's included** → `#what-you-get`
- Trust line (uppercase, tracked): **Delivered in 5 business days · Every claim verified · Free 30-day rescan**
- Sticker: `BigCursorSticker`, `size="lg"`, tilt `-10`, floating

**Logo marquee** — label: **A few of the brands we've worked with**

Nine real logos, in order: Brightwood · Alexis Lauren (`al.png`) · Jack Henry (`jh.png`) ·
Omura · R&R · Táche · Madrinas · Barbara Katz *(invert)* · Chused & Co *(invert)*

> Two logos need `filter: invert(1)` — they're white-on-transparent and vanish on a light
> ground. Any replacement marquee must keep a per-logo invert flag.
>
> The strip renders `MARQUEE_COPIES = 3` times so the loop spans ultrawide viewports.
> Eight `brand-a`–`brand-h` placeholders were removed in `f8d41ef` — **do not reintroduce
> filler logos.**

---

## B3 — Audit deliverable preview  `[ ]`

**Current:** `thanks/audit-deliverable-preview.tsx` + `.module.css` · **Aceternity candidate:** none — **port as-is**

Your strongest asset and the only thing on the page no library can supply. A mock audit
report: cover, findings register, annotated PDP. Uses its own CSS module and the
`--font-mono-display` face.

Content: `KNOCK TWICE` · `01 / 47` · `REPORT № 042 · SERIES A` · "Shopify conversion
audit." · `PREPARED FOR Marlow & Grove` · findings register (22 findings, 7 critical,
12–18% est. lift, 6wk payback) with F.01–F.05 · homepage annotations 01–04.

> **Open issue:** "Marlow & Grove" is a fictional brand presented as a real client
> report, and the numbers are invented. Label it a sample during the port.

---

## B4 — Intro text  `[ ]`

**Current:** `thanks/intro-text.tsx` · **Aceternity candidate:** Text Generate Effect

> Every Shopify store leaks revenue. Most leaks are small but fixable. We measure your
> storefront against its own live data, then rank the highest-impact fixes by hand —
> shipped in 5 business days.

---

## B5 — Section headline  `[ ]`

**Current:** `thanks/super-headline.tsx`

Eyebrow **How it works** · Headline **Find the friction. Fix the revenue.**

---

## B6 — Feature grid (2×2)  `[ ]`

**Current:** `thanks/feature-grid.tsx` · **Aceternity candidate:** Bento Grid / Feature Section with Bento Grid

| Tone | Title | Body | Image | Sticker |
|---|---|---|---|---|
| brand | Every page reviewed | Homepage, collections, PDPs, cart, checkout, navigation, mobile. Nothing skipped. | `macbook-1.png` | Heart, tilt −14 |
| peach | Ship-ready roadmap | Each fix is sequenced by impact — so your team starts with the biggest wins and stops guessing what to work on. | `macbook-2.png` | Lightning, tilt 12 |
| tan | Annotated screenshots | Exactly what to change, where, and why it matters. Your dev team can start Monday. | `iphone-1.png` | Chart, tilt −10 |
| lilac | 30-day rescan included | We check back once your fixes ship — free — to confirm impact and flag regressions. | `iphone-2.png` | Sparkle, tilt 14 |

Images use `fill` + `placeholder="blur"` + `sizes="(max-width: 640px) 100vw, 480px"`.

---

## B7 — Carousel 1: what we review  `[ ]`

**Current:** `thanks/tab-band.tsx` · id `what-you-get` · tone `golden` · **Aceternity candidate:** Tabs

Eyebrow **What we review** · Headline **Every surface. Every friction point.**
Subhead: *We audit each touchpoint in your funnel with the same rigor — because your revenue leaks compound across them.*

| Tab | Title | Body | Tone | Image |
|---|---|---|---|---|
| Homepage | Homepage | Hero clarity, value prop visibility, nav depth, and the first 3 seconds of trust that decide whether a visitor stays. | peach | `review/homepage-trust.png` |
| PDP | Product pages | Variant clarity, sticky ATC, reviews placement, urgency signals — the moment browsers become buyers. | brand | `review/product-evidence.png` |
| Cart | Cart & checkout | Trust cues at the decision point, shipping surprises, and the micro-friction that triggers abandonment. | tan | `review/cart-funnel.png` |
| Mobile | Mobile experience | The surface most stores optimize last. Sticky elements, tap targets, scroll depth, and mobile-specific drop-offs. | mint | `review/mobile-thumb.png` |

**Must survive:** anchor `#what-you-get` (header nav + hero secondary CTA).

> Known bug: `TabBand` triggers a React "unique key prop" warning. Fix during the port.

---

## B8 — Carousel 2: what you receive  `[ ]`

**Current:** `thanks/tab-band.tsx` · id `deliverables` · tone `brand` · no images

Eyebrow **What you receive** · Headline **Deliverables your team can ship.**
Subhead: *Not a deck. Not a checklist. A prioritized action plan with exact, implementable fixes.*

| Tab | Title | Body | Tone |
|---|---|---|---|
| Audit doc | The audit document | A single, focused document with every finding ranked by revenue impact. No filler, no fluff. | lilac |
| Screenshots | Annotated screenshots | Every issue shown on a real screenshot of your store. Exactly what to change, and where. | peach |
| Roadmap | Ship-first roadmap | What to tackle first, second, third — with optional implementation estimates so planning is trivial. | mint |
| Rescan | 30-day rescan report | One month after delivery, an automated re-scan to verify fixes shipped cleanly and flag anything new. | sky |

Separated from B7 by a `h-8 sm:h-14` spacer.

---

## B9 — Stats band  `[ ]`

**Current:** `thanks/stats-band.tsx` · **Aceternity candidate:** Card Hover Effect / Wobble Card

Headline **Built for revenue, not reports.** (animates word by word)
Subhead: *Priced and scoped to be a no-brainer next to a $15K agency audit.*

| Value | Label |
|---|---|
| 5 days | from purchase to findings in your inbox |
| $750 | flat price, no retainers, no upsells |
| Free | 30-day rescan once your fixes ship |

Cards: `bg-brand-500`, `aspect-[3/4]`, 3-col, `max-w-[640px]`. Decorative stickers
(Star, Sparkle, Lightning, Chart) + `ThanksMascot` anchored bottom-center.

> These replaced an unsourced "2.7× avg conversion lift" claim in `f8d41ef`.
> **Every value here is true by construction. Keep it that way** — don't let a
> template's stat block tempt you back into invented numbers.

---

## B10 — Testimonial  `[ ]`

**Current:** `thanks/testimonial.tsx` · **Aceternity candidate:** Animated Testimonials

Card rotated `-2deg`, `bg-tan-soft`, split grid `1fr / 1.3fr`, image `iphone-3.png` on `bg-peach`.

> "They found 14 issues we'd been blind to for months. Three of the top fixes took our dev team a single sprint — conversion went from 1.6% to 2.3% within six weeks."
> — **Sarah Chen**, Head of Ecommerce, DTC apparel brand

> **Blocked:** attribution needs a real brand name. A named person with no company,
> beside specific numbers, reads as template residue. Resolve before or during the port.

---

## B11 — Feature trio (4 items)  `[ ]`

**Current:** `thanks/feature-trio.tsx` · **Aceternity candidate:** Card Hover Effect / Hover Border Gradient

| Sticker | Title | Body |
|---|---|---|
| Cursor | Machine-verified, human-judged | Every numeric claim is checked against your store's live catalog data before it ships. Every recommendation is written by someone who ships Shopify for a living — no generic checklists, no unverified guesses. |
| Sparkle | Shopify-native | Our process, benchmarks, and recommendations are calibrated for Shopify. We understand what your dev team can actually build. |
| Chart | Ranked by revenue | Every finding scored by likely conversion impact — so you never wonder which fix is worth the sprint and which is cosmetic. |
| Star | 30-day rescan included | We check back after your team ships. Confirms impact, catches regressions, keeps the team accountable. Free, every time. |

> Item 1 is the positioning line, rewritten in `f8d41ef`. The old "no AI slop /
> hand-reviewed by humans" framing was inaccurate — shopscan feeds the delivered audit.
> **Do not restore human-only copy anywhere in the port.**

---

## B12 — FAQ  `[ ]`

**Current:** `thanks/faq.tsx` · id `faq` · **Aceternity candidate:** none canonical — pair with shadcn/ui Accordion

Headline **Every objection, handled.**

1. **Who is this for?** — Shopify brands — founders, operators, ecom managers, growth leads — who know their store could be performing better and want a specific, actionable plan to fix it. If your monthly revenue is north of $50K, the audit pays for itself in the first week of improvements.
2. **Is this only for Shopify stores?** — Yes. We only audit Shopify storefronts. Our process, benchmarks, and recommendations are all calibrated specifically for the Shopify ecosystem.
3. **What exactly do I receive?** — A comprehensive audit document with prioritized findings (ranked by revenue impact), annotated screenshots of your actual store, and a next-step action plan. Thirty days later, you get an automated rescan report showing what's been fixed and what's new.
4. **How long does it take?** — Five business days from the moment you complete the short intake form. The intake itself takes under 5 minutes.
5. **Do you implement the recommendations?** — The audit is analysis and recommendations. If you want implementation support afterward we'll scope it separately. Most clients brief their internal team or existing agency directly from the audit.
6. **What if I already have a CRO agency or internal team?** — Even better. The audit gives them a prioritized roadmap to work from — no ramp-up, no guessing. Every engagement we've done for teams with in-house CRO has surfaced issues the team missed.

**Must survive:** anchor `#faq`. Keep semantic `<details>`/accordion markup — this is SEO surface.

---

## B13 — Pricing & checkout  `[ ]` ⚠️ **live commerce**

**Current:** `thanks/checkout.tsx` · id `pricing` · **Port the UI; do not rewrite the flow.**

Eyebrow **Pricing** · Headline **One audit. One price.**
Sub: *What agencies charge $5–15K for. Delivered in 5 days, priced to be a no-brainer.*

**Value bar** (3-col, `max-w-3xl`):

| | |
|---|---|
| **7** | surfaces reviewed — homepage to checkout, desktop and mobile |
| **5 days** | from purchase to findings in your inbox |
| **30 days** | later, a free rescan to confirm the fixes landed |

**Price card** — white, `border-2 border-ink-950`, rotated `-1deg`, `bg-brand-500` top bar,
stickers Heart / Star / Lightning:

- Badge: **Shopify Conversion Audit**
- Price: **$750** (display face) · *Flat price. No retainers. No upsells.*
- Included list: Complete storefront analysis · Homepage, collections, PDPs, cart & mobile · Prioritized findings by revenue impact · Annotated screenshots · 30-day automated re-scan · Actionable recommendations · Next-step roadmap · Delivered within 5 business days
- Scarcity (coral ping): **3 spots remaining this month**
- Button: **Get my audit — $750** → opens modal
- Guarantee: *Full refund if we haven't started your review.*
- Footnote: **Secure payment via Square · Delivered in 5 business days**
- Below card: *Need help implementing the recommendations?* → `mailto:hello@knocktwice.io`

**Modal** (`role="dialog"`, `aria-modal`, backdrop blur, closes on backdrop click unless loading):

- Badge **One step to checkout**
- Heading **Where should we send the receipt and intake form?**
- Fields: name, email → submit

**Flow — preserve exactly:**
```
submit → POST /api/lead   (Klaviyo; fire-and-forget so a bail is still captured)
       → POST /api/checkout (Square)
       → window.location.href = data.url
```

**Must survive:** anchor `#pricing`; both API calls in that order; loading/error states.

> **Open issues:** (a) "3 spots remaining" is hardcoded — mechanize or remove.
> (b) There is no implementation tier at checkout, only a mailto. If the audit is
> origination for implementation work, an order bump belongs here.

---

## B14 — Final CTA  `[ ]`

**Current:** `thanks/final-cta.tsx` · `bg-brand-500`, inset rounded panel

- Headline: **Stop guessing. Start shipping the fixes that actually move revenue.**
- Tagline: **$750. 5-day turnaround. Full refund if we haven't started.**
- Primary: **Get my audit — $750** → `#pricing`
- Secondary: **Questions? Email us** → `mailto:hello@knocktwice.io`
- Trust chips: Square secure checkout · 5-day turnaround · 30-day rescan · Full refund

---

## B15 — Footer  `[ ]`

**Current:** `thanks/footer.tsx`

`© {current year} Knock Twice` · Privacy `/privacy` · Terms `/terms` · Contact `mailto:hello@knocktwice.io`

> `TrustStrip`, which carried a "A focused service from Knock Twice" link to
> knocktwice.io, was deleted in `f8d41ef`. Decide whether that link returns — the
> destination currently renders three words, so it leaks trust rather than building it.

---

# Secondary routes

Lower priority than the landing page, but they ship with it.

## R1 — `/intake`  `[ ]`

Post-purchase form. **Must survive:** `POST /api/intake`.

Sections and fields:

| Section | Fields |
|---|---|
| Who's this for? | Your name (`Jane Doe`) · Email (`you@brand.com`) |
| About the store | Store URL (`https://yourbrand.com`) · Brand name (`Marlow & Grove`) · Category · Monthly revenue · Team size |
| What are you selling? | Best-selling products — *Top 3–5 SKUs by revenue, and anything you want us to scrutinize closely.* |
| Where it hurts | Biggest struggles right now — *What's not converting? Where does traffic drop off? What have you tried that hasn't moved the needle?* · What would a great audit uncover? — *Specific surfaces (PDP, cart, mobile), metrics you're chasing, or a hypothesis you'd love us to validate.* |
| Stack & tools | CRM / email platform (*Klaviyo, Attentive, Hubspot, etc.*) · Analytics & other tools (*GA4, Hotjar, Shopify Analytics, Triple Whale, Loop Returns…*) |
| Anything else | Notes for the team (optional) — *Anything else we should know — brand guidelines, upcoming launches, things off-limits.* |

## R2 — `/success`  `[ ]`
Post-payment. Copy: *Within 5 business days, you'll receive your complete audit with prioritized findings, annotated screenshots, and action plan. Thirty days later, you'll get an automated re-scan report.*

## R3 — `/cancel`  `[ ]`  · R4 — `/privacy`  `[ ]`  · R5 — `/terms`  `[ ]`
Low-complexity. Port last.

---

# Assets

**In use** — `src/images/`: `macbook-1`, `macbook-2`, `iphone-1`, `iphone-2`, `iphone-3`,
`review/homepage-trust`, `review/product-evidence`, `review/cart-funnel`, `review/mobile-thumb`.
`src/logos/`: the nine listed in B2.

**Orphaned** (13 files, from the `fea1dbe` deletion) — `annotated-pdp.png`,
`iphone-4`–`iphone-7`, `macbook-3`–`macbook-9`,
`shopify_audit_deliverable_knocktwice_styled.svg`.
`src/images/` totals **85 MB**. Prune during the port.

**Components kept but unused:** `src/components/logo.tsx` (Knock Twice wordmark). The live
header uses `thanks/circle-logo.tsx`. Decide where the wordmark belongs.

---

# Done criteria

Run before calling the migration complete.

- [ ] `npx tsc --noEmit` clean
- [ ] `npm run build` succeeds
- [ ] Only **one** animation runtime shipping (GSAP *or* Framer Motion)
- [ ] Type scale is ≤ 6 sizes; no stray `text-[Npx]`
- [ ] All four anchors resolve: `#what-you-get` `#pricing` `#faq` `#deliverables`
- [ ] Checkout end-to-end in Square **sandbox**: modal → `/api/lead` → `/api/checkout` → redirect
- [ ] `/api/lead` still fires when the user abandons after the modal
- [ ] Square webhook still processes an order
- [ ] `/intake` submits
- [ ] GA4 loads and respects consent default
- [ ] Cookie banner renders and gates analytics
- [ ] Metadata + OG image intact (§3)
- [ ] `/robots.txt` and `/sitemap.xml` resolve
- [ ] Mobile menu button actually opens a menu (currently dead)
- [ ] No placeholder logos, no invented statistics, no human-only copy
- [ ] Font licenses resolved if trial faces are retained
