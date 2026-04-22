import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://auditshopify.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/success", "/cancel", "/intake"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
