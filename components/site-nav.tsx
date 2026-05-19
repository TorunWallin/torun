import Link from "next/link";

export function SiteNav() {
  return (
    <nav className="bg-cream-warm py-6 md:py-7 px-6 md:px-12 flex items-center justify-between border-b border-cream-warm">
      <Link href="/" className="block group">
        <span className="font-playwrite text-[28px] md:text-[40px] text-ink-charcoal block leading-[1.1]">
          Torun Coach
        </span>
        <span className="font-serif italic text-[14px] md:text-[16px] text-ink-charcoal/85 block mt-1">
          hälsa · styrka · vardag
        </span>
      </Link>
      <ul className="hidden md:flex gap-9 list-none">
        <li>
          <Link
            href="#program"
            className="font-sans text-[15px] font-medium text-ink hover:text-pink-hot transition-colors"
          >
            Program
          </Link>
        </li>
        <li>
          <Link
            href="#filosofi"
            className="font-sans text-[15px] font-medium text-ink hover:text-pink-hot transition-colors"
          >
            Filosofi
          </Link>
        </li>
        <li>
          <Link
            href="#om"
            className="font-sans text-[15px] font-medium text-ink hover:text-pink-hot transition-colors"
          >
            Om mig
          </Link>
        </li>
        <li>
          <a
            href="https://app.everfit.io"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[15px] font-medium text-ink hover:text-pink-hot transition-colors"
          >
            Logga in
          </a>
        </li>
      </ul>
      <Link href="#program" className="btn-teal-deep">
        Börja här ♡
      </Link>
    </nav>
  );
}
