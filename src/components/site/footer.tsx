/**
 * B15 — footer. Used by the landing page and all five secondary routes.
 *
 * Adapted from @aceternity/centered-with-logo (src/block/centered-with-logo.tsx,
 * pristine). Kept the centred stack, the dashed rule and the split bottom row.
 *
 * Changed from upstream:
 *  - The wordmark was a remote image on assets.aceternity.com plus "DevStudio".
 *    Uses the local CircleLogo.
 *  - Seven placeholder links, and an upstream bug alongside them: the map emits
 *    href="#" rather than page.href, so every link in the block is dead even
 *    once you fill the array in. Real destinations here.
 *  - Five social icons dropped rather than pointed somewhere invented. Knock
 *    Twice has no profiles wired up, and a row of icons linking to "#" is worse
 *    than no row. Contact sits there instead. Add them back when there are
 *    real handles to point at.
 *  - "© DevStudios LLABC" replaced with the real entity.
 */

import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { CircleLogo } from "./circle-logo";

const LINKS = [
  { title: "What we review", href: "/#what-you-get" },
  { title: "Pricing", href: "/#pricing" },
  { title: "FAQ", href: "/#faq" },
  { title: "Privacy", href: "/privacy" },
  { title: "Terms", href: "/terms" },
];

export function SiteFooter() {
  return (
    <footer className="relative w-full overflow-x-clip border-t px-8 py-16 md:py-20">
      <div className="text-muted-foreground mx-auto max-w-7xl items-start justify-between text-sm md:px-8">
        <div className="relative flex w-full flex-col items-center justify-center">
          <Link
            href="/"
            aria-label="Knock Twice home"
            className="mb-6 flex items-center gap-2.5"
          >
            <CircleLogo size={32} />
            <span className="text-foreground font-medium">Knock Twice</span>
          </Link>

          <nav aria-label="Footer">
            <ul className="flex list-none flex-col items-center gap-4 sm:flex-row">
              {LINKS.map((link) => (
                <li key={link.href} className="list-none">
                  <Link
                    href={link.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <GridLineHorizontal className="mx-auto mt-8 max-w-7xl" />
        </div>

        <div className="mt-8 flex w-full flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
          <p>&copy; {new Date().getFullYear()} Knock Twice</p>
          <a
            href="mailto:hello@knocktwice.io"
            className="hover:text-foreground transition-colors"
          >
            hello@knocktwice.io
          </a>
        </div>
      </div>
    </footer>
  );
}

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px",
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    />
  );
};
