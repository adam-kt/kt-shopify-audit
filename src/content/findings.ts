/**
 * The sample findings, shared by the hero review slides and the findings
 * register in the deliverable section.
 *
 * These are REAL findings from real audits, de-identified. Every one was
 * measured on a live Shopify storefront, and the numbers in them are counts
 * taken off the page, not estimates. The previous set was invented, which was
 * defensible as a placeholder and is not defensible now that real ones exist.
 *
 * De-identified on purpose. Several of the audited stores are clients, and
 * naming a store while listing its defects on our own marketing page is a bad
 * trade regardless of how good the finding is. Auditing a stranger's store and
 * emailing them their own findings is useful to them; publishing those findings
 * to everyone except them is not. Identifying details are generalised and exact
 * counts rounded where the precise figure would fingerprint a store.
 *
 * The numbers that remain are measurements of an interface, never claims about
 * visitor behaviour. "Over 200 footer links under 44px" is a fact about a page.
 * "6.1% drop-off" would be a claim about people, and we have no access to that.
 *
 * One finding records something working. A register that only ever reports
 * problems is less believable than one that also says what to leave alone.
 */

export type Severity = "high" | "med" | "ok";

/** Which hero tab a finding is pinned to. */
export type Surface = "homepage" | "product" | "cart" | "mobile";

export interface Finding {
  rank: string;
  severity: Severity;
  surface: Surface;
  /** Label shown in the register. */
  area: string;
  title: string;
  impact: string;
  /** Pin position over the base screenshot, as percentages. */
  pin: { x: string; y: string };
}

export const SEVERITY: Record<
  Severity,
  { label: string; dot: string; text: string; ring: string }
> = {
  high: {
    label: "High",
    dot: "bg-red-500",
    text: "text-red-400",
    ring: "ring-red-500/40",
  },
  med: {
    label: "Medium",
    dot: "bg-amber-500",
    text: "text-amber-400",
    ring: "ring-amber-500/40",
  },
  ok: {
    label: "Working",
    dot: "bg-emerald-500",
    text: "text-emerald-400",
    ring: "ring-emerald-500/40",
  },
};

export const FINDINGS: Finding[] = [
  // ---- Cart: the strongest finding of the set ----
  {
    rank: "F.01",
    severity: "high",
    surface: "cart",
    area: "Cart",
    title: "Add to cart fails silently when options are unselected",
    impact:
      "Two option groups are required and neither is labelled. Click add to cart without choosing and nothing happens: the cart stays empty and no message says why.",
    pin: { x: "30%", y: "34%" },
  },
  {
    rank: "F.02",
    severity: "med",
    surface: "cart",
    area: "Cart",
    title: "No delivery expectation before checkout",
    impact:
      "Subtotal and a taxes-calculated-later note, but no lead time or ship window on made-to-order furniture, where timing is the main hesitation.",
    pin: { x: "62%", y: "58%" },
  },
  {
    rank: "F.03",
    severity: "ok",
    surface: "cart",
    area: "Checkout",
    title: "Accelerated checkout is correctly placed",
    impact:
      "Shop Pay and PayPal sit directly under the primary button at a comfortable size. Flagged so nobody moves it.",
    pin: { x: "78%", y: "80%" },
  },

  // ---- Product ----
  {
    rank: "F.04",
    severity: "high",
    surface: "product",
    area: "Product page",
    title: "No sticky add-to-cart",
    impact:
      "The buy button sits near the top of a page seven screens long. Once it scrolls away there is no way to act without scrolling back.",
    pin: { x: "66%", y: "60%" },
  },
  {
    rank: "F.05",
    severity: "med",
    surface: "product",
    area: "Product page",
    title: "No shipping, returns or guarantee language",
    impact:
      "Nothing on the page addresses what happens after the order. The words do not appear anywhere in the copy.",
    pin: { x: "28%", y: "38%" },
  },

  // ---- Homepage ----
  {
    rank: "F.06",
    severity: "high",
    surface: "homepage",
    area: "Homepage",
    title: "Store logo is marked up as an empty heading",
    impact:
      "The page's top-level heading contains no text at all, and the real headline below it is duplicated in the markup.",
    pin: { x: "22%", y: "14%" },
  },
  {
    rank: "F.07",
    severity: "med",
    surface: "homepage",
    area: "Homepage",
    title: "Ten images ship with no alt attribute",
    impact:
      "Eight links also have no accessible name, so their purpose is unavailable to a screen reader or a crawler.",
    pin: { x: "58%", y: "52%" },
  },

  // ---- Mobile ----
  {
    rank: "F.08",
    severity: "med",
    surface: "mobile",
    area: "Mobile",
    title: "Over 200 footer links below the touch minimum",
    impact:
      "Rows are 16px tall against a 44px minimum, and around thirty fall under even the 24px floor. Concentrated in the footer rather than spread across the site.",
    pin: { x: "48%", y: "72%" },
  },
  {
    rank: "F.09",
    severity: "med",
    surface: "mobile",
    area: "Mobile",
    title: "Primary navigation is 16px tall",
    impact:
      "The top-level category links are a third of the recommended touch height, so mis-taps land on the neighbouring item.",
    pin: { x: "36%", y: "22%" },
  },
];

export const findingsFor = (surface: Surface) =>
  FINDINGS.filter((f) => f.surface === surface);
