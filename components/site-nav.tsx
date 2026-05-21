"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const links = [
  { href: "#program", label: "Program" },
  { href: "#filosofi", label: "Filosofi" },
  { href: "#om", label: "Om mig" },
  { href: "https://app.everfit.io", label: "Logga in", external: true },
];

export function SiteNav() {
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY || currentScrollY < 80) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stäng meny vid resize till desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav
        className={`bg-[#fdfaf5] backdrop-blur-xl py-4 md:py-7 px-6 md:px-12 flex items-center justify-between border-b border-[#f0e6d8] sticky top-0 z-50 transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Logotyp */}
        <Link href="/" className="block group">
          <span className="font-playwrite text-[18px] md:text-[25px] text-ink-charcoal block leading-[1.1]">
            Torun Coach
          </span>
          <span className="font-mono italic text-[11px] md:text-[13px] text-ink-charcoal/85 block mt-0.5 tracking-tight">
            hälsa · styrka · vardag
          </span>
        </Link>

        {/* Desktop-nav (centrerad) */}
        <ul className="hidden md:flex gap-10 list-none absolute left-1/2 -translate-x-1/2">
          {links.map(({ href, label, external }) => (
            <li key={href}>
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="font-mono text-[15px] font-medium text-ink hover:text-pink-hot transition-all duration-200 tracking-[1.5px] uppercase"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="#program"
          className="hidden md:inline-flex group relative items-center justify-center bg-[#0a594c] hover:bg-[#ec4d9c] text-white font-serif font-semibold text-[18px] pl-9 pr-12 py-3 rounded-full transition-all duration-300 hover:scale-[1.05]"
        >
          Börja här
          <img
            src="/heart_white.png"
            alt=""
            className="absolute right-6 w-6 h-6 opacity-0 group-hover:opacity-100 transition-all duration-300"
          />
        </Link>

        {/* Hamburger (mobil) */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] p-2 -mr-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Stäng meny" : "Öppna meny"}
        >
          <span
            className={`block h-[2px] w-6 bg-ink-charcoal rounded-full transition-all duration-300 origin-center ${
              menuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-ink-charcoal rounded-full transition-all duration-300 ${
              menuOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-ink-charcoal rounded-full transition-all duration-300 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobil-meny overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ top: "73px" }}
      >
        {/* Bakgrund */}
        <div
          className="absolute inset-0 bg-[#fdfaf5]"
          onClick={() => setMenuOpen(false)}
        />

        {/* Innehåll */}
        <div className="relative flex flex-col px-8 pt-10 pb-12 gap-2 h-full overflow-y-auto">
          {links.map(({ href, label, external }, i) => (
            <a
              key={href}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              onClick={() => setMenuOpen(false)}
              className={`font-mono text-[22px] font-medium text-ink hover:text-pink-hot transition-all duration-200 tracking-[0.1em] uppercase py-5 border-b border-[#f0e6d8] ${
                menuOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {label}
            </a>
          ))}

          <Link
            href="#program"
            onClick={() => setMenuOpen(false)}
            className="mt-8 flex items-center justify-center bg-[#0a594c] hover:bg-[#ec4d9c] text-white font-serif font-semibold text-[18px] px-9 py-4 rounded-full transition-colors duration-300"
          >
            Börja här ♡
          </Link>
        </div>
      </div>
    </>
  );
}
