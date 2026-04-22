import type { Metadata } from "next";
import { Anton } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import { CookieConsent } from "@/components/cookie-consent";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-anton",
});

const gingerMono = localFont({
  src: [
    { path: "../../public/fonts/ginger-mono/F37GingerMonoTrial-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/ginger-mono/F37GingerMonoTrial-Bold.otf", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-mono-display",
});

const zagma = localFont({
  src: [
    { path: "../../public/fonts/zagma/F37ZagmaTrial-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/zagma/F37ZagmaTrial-Book.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/zagma/F37ZagmaTrial-BookItalic.otf", weight: "400", style: "italic" },
    { path: "../../public/fonts/zagma/F37ZagmaTrial-Regular.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/zagma/F37ZagmaTrial-RegularItalic.otf", weight: "500", style: "italic" },
    { path: "../../public/fonts/zagma/F37ZagmaTrial-Bold.otf", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-zagma",
});

const GA_MEASUREMENT_ID = "G-PC8RMENX1Z";

export const metadata: Metadata = {
  title: "Shopify Conversion Audit — Knock Twice",
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
    title: "Shopify Conversion Audit — Knock Twice",
    description:
      "Expert Shopify conversion audit for DTC brands. Prioritized findings, actionable recommendations, delivered in 5 days. $750.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Knock Twice Shopify Conversion Audit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopify Conversion Audit — Knock Twice",
    description:
      "Expert Shopify conversion audit for DTC brands. Prioritized findings, actionable recommendations. $750.",
    images: ["/og-image.png"],
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
  return (
    <html
      lang="en"
      className={`${zagma.variable} ${anton.variable} ${gingerMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased">
        {children}
        <CookieConsent />
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
