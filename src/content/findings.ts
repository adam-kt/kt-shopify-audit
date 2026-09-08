/**
 * The sample findings, shared by the hero review slides and the findings
 * register in the deliverable section.
 *
 * One source so the two cannot drift. The hero shows a finding pinned to the
 * page it was found on; the register lists the same finding with its rank. Same
 * F-numbers in both places, which is what makes them read as one system rather
 * than two sets of made-up examples.
 *
 * Impact lines are qualitative on purpose. They describe what the issue does to
 * the experience, never a percentage. Inventing "6.1% drop-off" here would
 * contradict the "every claim checked against your live store data" promise the
 * page makes three sections down, and it is the exact copy that was stripped
 * out of the old site.
 *
 * F.05 records something working. A register that only ever reports problems is
 * less believable than one that also says what to leave alone.
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
  {
    rank: "F.01",
    severity: "high",
    surface: "product",
    area: "Product page",
    title: "No sticky add-to-cart",
    impact:
      "On longer pages the buy button scrolls out of reach and stays there.",
    pin: { x: "68%", y: "62%" },
  },
  {
    rank: "F.02",
    severity: "high",
    surface: "cart",
    area: "Cart",
    title: "No confidence cues before checkout",
    impact:
      "Shipping threshold, returns policy and trust marks are all absent at the decision point.",
    pin: { x: "58%", y: "44%" },
  },
  {
    rank: "F.03",
    severity: "high",
    surface: "homepage",
    area: "Navigation",
    title: "Best sellers sit two taps deep",
    impact:
      "Reaching the collection needs a mega-menu hover that does not exist on touch.",
    pin: { x: "34%", y: "16%" },
  },
  {
    rank: "F.04",
    severity: "med",
    surface: "product",
    area: "Product page",
    title: "Selected variant has low contrast",
    impact: "The chosen size is hard to confirm before adding to cart.",
    pin: { x: "26%", y: "40%" },
  },
  {
    rank: "F.05",
    severity: "ok",
    surface: "cart",
    area: "Checkout",
    title: "Shop Pay is well positioned",
    impact: "Working as intended. Flagged so nobody moves it.",
    pin: { x: "72%", y: "76%" },
  },
  {
    rank: "F.06",
    severity: "med",
    surface: "mobile",
    area: "Mobile",
    title: "Tap targets below the 44px minimum",
    impact: "Several controls are too small to hit reliably on a phone.",
    pin: { x: "44%", y: "58%" },
  },
];

export const findingsFor = (surface: Surface) =>
  FINDINGS.filter((f) => f.surface === surface);
