import Link from "next/link";

export function SiteNav() {
  return (
    <nav className="bg-cream py-4 px-6 md:px-10 flex items-center justify-between border-b border-cream-warm">
      <Link href="/" className="block">
        <span className="display-italic text-[30px] -tracking-[0.025em] text-teal block leading-none">
          torun.
        </span>
        <span className="font-script text-[16px] text-pink-hot block mt-0.5 leading-none">
          hälsa · styrka · vardag
        </span>
      </Link>
      <ul className="hidden md:flex gap-8 list-none">
        <li>
          <Link href="#program" className="nav-link">
            Program
          </Link>
        </li>
        <li>
          <Link href="#filosofi" className="nav-link">
            Filosofi
          </Link>
        </li>
        <li>
          <Link href="#om" className="nav-link">
            Om mig
          </Link>
        </li>
        <li>
          <a
            href="https://app.everfit.io"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            Logga in
          </a>
        </li>
      </ul>
      <Link href="#program" className="btn-lime">
        Börja här ♡
      </Link>
    </nav>
  );
}
