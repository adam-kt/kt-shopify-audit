# Knock Twice Shopify — Conversion Audit

Marketing site for the Knock Twice Shopify Conversion Audit ($750). Built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stripe Setup

1. Create a [Stripe account](https://dashboard.stripe.com/register) or log in
2. Go to **Products** → **Add product**
   - Name: `Shopify Conversion Audit`
   - Price: `$750.00 USD` (one-time)
3. Copy the **Price ID** (starts with `price_`)
4. Go to **Developers** → **API keys**
5. Update `.env.local`:

```env
STRIPE_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_PRICE_ID_AUDIT=price_your_price_id_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production, use live keys and update `NEXT_PUBLIC_SITE_URL` to your domain.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata & fonts
│   ├── page.tsx            # Landing page (all sections)
│   ├── globals.css         # Theme tokens & base styles
│   ├── robots.ts           # Robots.txt generation
│   ├── sitemap.ts          # Sitemap generation
│   ├── api/
│   │   ├── checkout/route.ts  # Stripe checkout session
│   │   └── lead/route.ts      # Lead capture endpoint
│   ├── success/page.tsx    # Post-purchase confirmation
│   └── cancel/page.tsx     # Checkout cancellation
├── components/
│   ├── header.tsx          # Fixed nav with scroll effect
│   ├── hero.tsx            # Hero section
│   ├── trust-strip.tsx     # Credibility & logos
│   ├── problem.tsx         # Pain points
│   ├── what-you-get.tsx    # Deliverables
│   ├── how-it-works.tsx    # Process steps
│   ├── what-we-review.tsx  # Review areas
│   ├── why-knock-twice.tsx # Credibility & differentiators
│   ├── sample-findings.tsx # Example audit findings
│   ├── pricing.tsx         # Pricing card + checkout
│   ├── faq.tsx             # Accordion FAQ
│   ├── final-cta.tsx       # Closing CTA
│   ├── lead-capture.tsx    # Lead form fallback
│   ├── footer.tsx          # Footer
│   ├── section-wrapper.tsx # Reusable section layout
│   ├── cta-button.tsx      # Reusable CTA button
│   └── mobile-sticky-cta.tsx # Mobile sticky CTA bar
└── lib/
    ├── utils.ts            # cn() utility
    └── stripe.ts           # Stripe client
```

## Customization

### Branding

- **Colors**: Edit theme tokens in `src/app/globals.css`
- **Typography**: Font is loaded in `src/app/layout.tsx` (Inter by default)
- **Logo**: Replace the text logo in `header.tsx` and `footer.tsx` with an image/SVG

### Content

- **Copy**: All section copy is inline in each component — edit directly
- **FAQs**: Edit the `faqs` array in `src/components/faq.tsx`
- **Sample findings**: Edit the `findings` array in `src/components/sample-findings.tsx`
- **Deliverables**: Edit the `deliverables` array in `src/components/what-you-get.tsx`

### Assets to Replace

- `public/favicon.ico` — Replace with your actual favicon
- `public/og-image.png` — Create a 1200x630 OG image
- Logo placeholder slots in `trust-strip.tsx`
- Brand image placeholder in `why-knock-twice.tsx`
- Screenshot placeholders in `sample-findings.tsx`

### Lead Capture

The lead form posts to `/api/lead`. Connect it to your preferred destination by editing `src/app/api/lead/route.ts`. Options documented in the file:
- Email service (Resend, SendGrid)
- CRM (HubSpot, Salesforce)
- Webhook (Zapier, Make)
- Database

### Analytics

Add your analytics script in the `<head>` of `src/app/layout.tsx`.

## Deployment

Deploy to Vercel:

```bash
npm run build
```

Set environment variables in Vercel dashboard:
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_PRICE_ID_AUDIT`
- `NEXT_PUBLIC_SITE_URL` (your production domain)

## Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** (scroll animations)
- **Lucide React** (icons)
- **Stripe** (payments)
