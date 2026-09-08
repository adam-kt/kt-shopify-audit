/**
 * Open Graph / Twitter card image.
 *
 * layout.tsx referenced /og-image.png, which never existed, so every share of
 * this link in Slack, iMessage or a DM has been rendering a broken preview.
 *
 * Generated from code rather than exported as a PNG so it cannot drift away
 * from the page it represents, and so the headline only ever has to be changed
 * in one place. Next renders it at build time; the route below replaces the
 * static file reference.
 */

import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Shopify conversion audit by Knock Twice";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              background: "#fafafa",
              color: "#0a0a0a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            KT
          </div>
          <div style={{ color: "#a1a1a1", fontSize: 24, letterSpacing: "0.12em" }}>
            SHOPIFY CONVERSION AUDIT
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#fafafa",
            fontSize: 82,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          <div>Where your store</div>
          <div>loses buyers.</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#a1a1a1",
            fontSize: 26,
          }}
        >
          <div style={{ display: "flex" }}>
            Five business days &middot; $750 &middot; Free rescan
          </div>
          <div style={{ display: "flex", color: "#fafafa" }}>auditshopify.com</div>
        </div>
      </div>
    ),
    size
  );
}
