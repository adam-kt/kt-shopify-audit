import { rawIcons } from "./raw";

// Tight content bounding boxes per icon, computed from the source path data
// (see scripts in docs). Overriding viewBox with these crops the canvas so
// each icon visually centers inside its Sticker slot — the source files all
// ship at 512×512 with ~80px of margin, which made small renders drift.
const viewBoxes: Record<string, string> = {
  Secure_Shild_Verified: "44 51 409 409",
  Alert_Bell: "21 10 398 433",
  Alert_Check: "21 10 430 443",
  View: "61 112 376 287",
  Share: "0 0 446 452",
  Settings_Approved: "61 61 388 388",
  Alerts_Triangle: "80 60 375 368",
  Image_Article: "38 44 405 468",
  Image_Illustration: "41 63 454 449",
  Share_Megaphone: "1 17 459 397",
  View_Square: "82 80 355 335",
};

interface IconProps {
  name: keyof typeof rawIcons | string;
  /** Replaces the default primary fill (#9296FF) in the source SVG. */
  primary?: string;
  /** Replaces the default secondary fill (#FFD789). */
  secondary?: string;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}

/**
 * Renders one of the line-drawn icons shipped in public/icons.
 *
 * The raw SVG markup is inlined (authored by us, so dangerouslySetInnerHTML
 * is safe) and the two theme colors from the source files — `#9296FF` for
 * the primary fill and `#FFD789` for the accent — are swapped per-instance.
 * That's enough to retheme a two-tone icon without keeping multiple copies
 * of each file on disk.
 */
export function Icon({
  name,
  primary,
  secondary,
  className,
  style,
  title,
}: IconProps) {
  const raw = rawIcons[name];
  if (!raw) return null;
  let svg = raw;
  if (primary) svg = svg.replace(/#9296FF/gi, primary);
  if (secondary) svg = svg.replace(/#FFD789/gi, secondary);
  // Source files ship at 512×512 intrinsic. Force the root svg to fill
  // its parent so the Sticker wrapper — or any container — controls size.
  svg = svg
    .replace(/(<svg\b[^>]*?)\swidth="[^"]*"/i, "$1")
    .replace(/(<svg\b[^>]*?)\sheight="[^"]*"/i, "$1")
    .replace(/<svg\b/i, '<svg width="100%" height="100%"');
  // Tighten the viewBox to crop whitespace around the content.
  const vb = viewBoxes[name];
  if (vb) {
    svg = svg.replace(/viewBox="[^"]*"/i, `viewBox="${vb}"`);
  }
  return (
    <span
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={className}
      style={{
        display: "block",
        lineHeight: 0,
        width: "100%",
        height: "100%",
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
