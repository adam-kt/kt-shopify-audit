import { type SVGProps } from "react";
import { Icon } from "@/components/icons/icon";

/**
 * Every named sticker export maps to one of the icons in public/icons —
 * recolored to match the prior chunky-sticker palette so the rest of the
 * app picks up the new look without touching call sites. A handful of
 * one-off shapes (Cloud, SunFace, BigCursor, ThanksMascot, Squiggle)
 * remain hand-drawn SVGs below because the icon set doesn't include a
 * close analog.
 */

type Props = SVGProps<SVGSVGElement>;

// Shared palette matching the prior sticker colors.
const palette = {
  coral: "#ff7a85",
  butter: "#fff0b8",
  mint: "#c9ecd5",
  lavender: "#dcd4ff",
  sky: "#cfe7ff",
  lilac: "#c99ad1",
  pink: "#f4b1dc",
};

// Icons mapped from public/icons — each call uses the corresponding
// name and passes `primary` / `secondary` to re-tint the two-tone art.
export function HeartSticker(_: Props) {
  return <Icon name="Secure_Shild_Verified" primary={palette.coral} secondary={palette.butter} />;
}

export function CoinSticker(_: Props) {
  return <Icon name="Alert_Bell" primary={palette.butter} secondary={palette.coral} />;
}

export function SmileySticker(_: Props) {
  return <Icon name="Alert_Check" primary={palette.butter} secondary={palette.butter} />;
}

export function CursorSticker(_: Props) {
  return <Icon name="View" primary={palette.lavender} secondary={palette.butter} />;
}

export function MailSticker(_: Props) {
  return <Icon name="Share" primary={palette.sky} secondary={palette.butter} />;
}

export function StarSticker(_: Props) {
  return <Icon name="Settings_Approved" primary={palette.butter} secondary={palette.coral} />;
}

export function LightningSticker(_: Props) {
  return <Icon name="Alerts_Triangle" primary={palette.coral} secondary={palette.butter} />;
}

export function ChartSticker(_: Props) {
  return <Icon name="Image_Article" primary={palette.mint} secondary={palette.coral} />;
}

export function SparkleSticker(_: Props) {
  return <Icon name="Image_Illustration" primary={palette.lilac} secondary={palette.butter} />;
}

export function PartySticker(_: Props) {
  return <Icon name="Share_Megaphone" primary={palette.coral} secondary={palette.butter} />;
}

// No clean analog in the icon set — keep the original hand-drawn look.

export function CloudSticker(p: Props) {
  return (
    <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" {...p}>
      <path
        d="M24 48 Q14 48 12 40 Q4 40 4 30 Q4 18 18 18 Q22 6 36 8 Q44 -2 58 4 Q72 -2 78 14 Q94 12 98 28 Q112 28 108 46 Q100 52 90 50 Z"
        fill="#ffffff"
        stroke="#141414"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle cx="44" cy="26" r="3" fill="#141414" />
      <circle cx="58" cy="26" r="3" fill="#141414" />
      <path d="M44 36 Q51 42 58 36" fill="none" stroke="#141414" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function BigCursorSticker() {
  return <Icon name="View_Square" primary={palette.pink} secondary={palette.butter} />;
}

export function SunFaceSticker(p: Props) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" {...p}>
      <g stroke="#141414" strokeWidth="4" strokeLinecap="round" fill="#f4b1dc">
        <path d="M50 6 L54 20 L62 8 L60 24 L74 14 L66 28 L82 26 L70 36 L86 40 L70 44 L82 58 L66 52 L74 66 L60 56 L62 72 L54 60 L50 74 L46 60 L38 72 L40 56 L26 66 L34 52 L18 58 L30 44 L14 40 L30 36 L18 26 L34 28 L26 14 L40 24 L38 8 L46 20 Z" />
      </g>
      <circle cx="50" cy="40" r="20" fill="#f4b1dc" stroke="#141414" strokeWidth="5" />
      <circle cx="43" cy="38" r="2.5" fill="#141414" />
      <circle cx="57" cy="38" r="2.5" fill="#141414" />
      <path d="M43 48 Q50 54 57 48" fill="none" stroke="#141414" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function ThanksMascot(p: Props) {
  return (
    <svg viewBox="0 0 160 220" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" {...p}>
      <path d="M120 70 L148 28 L158 36 L132 86 Z" fill="#3dbf7a" stroke="#141414" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="80" cy="80" r="56" fill="#3dbf7a" stroke="#141414" strokeWidth="5" />
      <circle cx="66" cy="72" r="4" fill="#141414" />
      <circle cx="94" cy="72" r="4" fill="#141414" />
      <path d="M62 94 Q80 108 98 94" fill="none" stroke="#141414" strokeWidth="5" strokeLinecap="round" />
      <path d="M34 96 L20 120 L28 128 L44 108 Z" fill="#3dbf7a" stroke="#141414" strokeWidth="4" strokeLinejoin="round" />
      <rect x="58" y="130" width="18" height="54" rx="9" fill="#ffffff" stroke="#141414" strokeWidth="4" />
      <rect x="86" y="130" width="18" height="54" rx="9" fill="#ffffff" stroke="#141414" strokeWidth="4" />
      <ellipse cx="67" cy="190" rx="14" ry="6" fill="#ffffff" stroke="#141414" strokeWidth="4" />
      <ellipse cx="95" cy="190" rx="14" ry="6" fill="#ffffff" stroke="#141414" strokeWidth="4" />
      <path d="M146 28 L140 10" stroke="#141414" strokeWidth="4" strokeLinecap="round" />
      <path d="M154 34 L158 14" stroke="#141414" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function SquiggleUnderline(p: Props) {
  return (
    <svg viewBox="0 0 240 24" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" {...p}>
      <path
        d="M4 14 C 30 4, 60 22, 90 12 S 150 4, 180 14 S 230 20, 236 10"
        fill="none"
        stroke="#ff5a66"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

