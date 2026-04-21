import Link from "next/link";
import { Logo } from "./logo";
import { HeartSticker, StarSticker } from "./stickers";
import { Sticker } from "./ui/sticker";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink-100 bg-white">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10 lg:px-12 py-14 sm:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <Logo color="dark" />
            </div>
            <p className="mt-5 text-sm text-ink-500 leading-relaxed">
              Expert Shopify conversion audits for brands that want to sell
              more. A focused service from{" "}
              <a
                href="https://knocktwice.io"
                className="text-coral-600 hover:text-coral-700 transition-colors underline underline-offset-2 decoration-coral-200 font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Knock Twice
              </a>
              .
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-14 lg:gap-20">
            <div>
              <h4 className="text-caption mb-4">Offer</h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="#what-you-get" className="text-sm text-ink-500 hover:text-coral-600 transition-colors">
                    What&rsquo;s Included
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-sm text-ink-500 hover:text-coral-600 transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-sm text-ink-500 hover:text-coral-600 transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-sm text-ink-500 hover:text-coral-600 transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-caption mb-4">Company</h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="https://knocktwice.io"
                    className="text-sm text-ink-500 hover:text-coral-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Knock Twice
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@knocktwice.io"
                    className="text-sm text-ink-500 hover:text-coral-600 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 border-t border-ink-100 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="flex items-center gap-2 text-[12px] text-ink-400">
            Made with
            <Sticker size="xs" tilt={-6} className="inline-block !w-4 !h-4">
              <HeartSticker />
            </Sticker>
            &copy; {new Date().getFullYear()} Knock Twice.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[12px] text-ink-400 hover:text-ink-700 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-[12px] text-ink-400 hover:text-ink-700 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative sticker */}
      <div className="pointer-events-none absolute -top-6 -right-6 w-24 h-24 rotate-12 opacity-80">
        <StarSticker />
      </div>
    </footer>
  );
}
