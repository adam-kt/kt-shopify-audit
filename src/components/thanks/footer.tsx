import Link from "next/link";

export function ThanksFooter() {
  return (
    <footer className="border-t border-ink-100 py-8 sm:py-10">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-ink-600">
        <p className="font-semibold">
          &copy; {new Date().getFullYear()} Knock Twice
        </p>
        <nav className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-ink-900 transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-ink-900 transition-colors">
            Terms
          </Link>
          <a
            href="mailto:hello@knocktwice.io"
            className="hover:text-ink-900 transition-colors"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
