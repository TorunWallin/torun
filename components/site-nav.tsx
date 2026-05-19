import Link from "next/link";

export function SiteNav() {
  return (
    <nav className="bg-cream-warm py-5 px-6 md:px-12 flex items-center justify-between border-b border-cream-warm">
      <Link href="/" className="block group">
        <span className="font-pacifico text-[36px] md:text-[44px] text-ink block leading-none">
          Torun Coach
        </span>
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-charcoal block mt-1.5">
          hälsa · styrka · vardag
        </span>
      </Link>
      <ul className="hidden md:flex gap-10 list-none">
        <li>
          <Link
            href="#program"
            className="font-sans text-[14px] font-semibold uppercase tracking-[0.15em] text-ink hover:text-pink-hot transition-colors"
          >
            Program
          </Link>
        </li>
        <li>
          <Link
            href="#filosofi"
            className="font-sans text-[14px] font-semibold uppercase tracking-[0.15em] text-ink hover:text-pink-hot transition-colors"
          >
            Filosofi
          </Link>
        </li>
        <li>
          <Link
            href="#om"
            className="font-sans text-[14px] font-semibold uppercase tracking-[0.15em] text-ink hover:text-pink-hot transition-colors"
          >
            Om mig
          </Link>
        </li>
        <li>
          <a
            href="https://app.everfit.io"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[14px] font-semibold uppercase tracking-[0.15em] text-ink hover:text-pink-hot transition-colors"
          >
            Logga in
          </a>
        </li>
      </ul>
      <Link href="#program" className="btn-teal-deep">
        Börja Här ♡
      </Link>
    </nav>
  );
}
