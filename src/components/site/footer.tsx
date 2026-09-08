import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-[13px] text-muted-foreground sm:flex-row">
        <p className="font-medium">&copy; {new Date().getFullYear()} Knock Twice</p>
        <nav className="flex items-center gap-6">
          <Link href="/privacy" className="transition-colors hover:text-foreground">Privacy</Link>
          <Link href="/terms" className="transition-colors hover:text-foreground">Terms</Link>
          <a href="mailto:hello@knocktwice.io" className="transition-colors hover:text-foreground">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
