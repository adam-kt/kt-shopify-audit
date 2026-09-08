import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { CookieConsent } from "@/components/cookie-consent";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const GA_MEASUREMENT_ID = "G-PC8RMENX1Z";

export const metadata: Metadata = {
  title: "Shopify Conversion Audit | Knock Twice",
  description:
    "Expert Shopify conversion audit for DTC brands. We review your storefront and deliver prioritized, actionable recommendations to improve conversion, trust, and revenue. $750.",
  keywords: [
    "Shopify audit",
    "conversion audit",
    "Shopify conversion",
    "ecommerce UX",
    "Shopify optimization",
    "DTC brands",
    "Shopify CRO",
    "store audit",
  ],
  authors: [{ name: "Knock Twice" }],
  creator: "Knock Twice",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://auditshopify.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Knock Twice Shopify",
    title: "Shopify Conversion Audit | Knock Twice",
    description:
      "Expert Shopify conversion audit for DTC brands. Prioritized findings, actionable recommendations, delivered in 5 days. $750.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopify Conversion Audit | Knock Twice",
    description:
      "Expert Shopify conversion audit for DTC brands. Prioritized findings, actionable recommendations. $750.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // `dark` on <html> switches the shadcn token set and activates every
  // dark: variant in the vendored Aceternity blocks.
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased">
        {children}
        <CookieConsent />

        {/* Consent Mode defaults to denied; CookieConsent grants on opt-in. */}
        <Script id="gtag-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              wait_for_update: 500,
            });
          `}
        </Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
