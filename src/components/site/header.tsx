import Link from "next/link";

/**
 * Minimal header for the secondary routes (privacy, terms, success, cancel,
 * intake) so they keep building on the fresh base. The landing page gets the
 * Aceternity navbar; once that is adapted this should be replaced by it so the
 * site does not ship two different navs. See docs/aceternity-migration.md §B1.
 */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Knock Twice
        </Link>
        <Link
          href="/#pricing"
          className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Get my audit
        </Link>
      </div>
    </header>
  );
}
