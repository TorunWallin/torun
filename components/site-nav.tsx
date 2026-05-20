"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export function SiteNav() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Visa om man scrollar upp eller är nära toppen
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

  return (
    <>
      <nav
className={`bg-[#fdfaf5] backdrop-blur-xl py-6 md:py-7 px-6 md:px-12 flex items-center justify-between border-b border-[#f0e6d8] sticky top-0 z-50 transition-all duration-300 ${ isVisible ? "translate-y-0" : "-translate-y-full"
  }`}
>
        <Link href="/" className="block group">
          <span className="font-playwrite text-[px] md:text-[25px] text-ink-charcoal block leading-[1.1]">
            Torun Coach
          </span>
    <span className="font-mono italic text-[13px] md:text-[13px] text-ink-charcoal/85 block mt-1 tracking-tight">
  hälsa · styrka · vardag
</span>
        </Link>

        <ul className="hidden md:flex gap-10 list-none absolute left-1/2 -translate-x-1/2">
          <li>
            <Link href="#program" className="font-mono text-[15px] font-medium text-ink hover:text-pink-hot transition-all duration-200 tracking-[1.5px] uppercase">Program</Link>
          </li>
          <li>
            <Link href="#filosofi" className="font-mono text-[15px] font-medium text-ink hover:text-pink-hot transition-all duration-200 tracking-[1.5px] uppercase">Filosofi</Link>
          </li>
          <li>
            <Link href="#om" className="font-mono text-[15px] font-medium text-ink hover:text-pink-hot transition-all duration-200 tracking-[1.5px] uppercase">Om mig</Link>
          </li>
          <li>
            <a href="https://app.everfit.io" target="_blank" rel="noopener noreferrer" className="font-mono text-[15px] font-medium text-ink hover:text-pink-hot transition-all duration-200 tracking-[1.5px] uppercase">Logga in</a>
          </li>
        </ul>

       <Link
  href="#program"
  className="group relative inline-flex items-center justify-center bg-[#0a594c] hover:bg-[#ec4d9c] text-white font-serif font-semibold text-[18px] pl-9 pr-12 py-3 rounded-full transition-all duration-300 hover:scale-[1.05]"
>
  Börja här
  <img
    src="/heart_white.png"
    alt="Hjärta"
    className="absolute right-6 w-6 h-6 opacity-0 group-hover:opacity-100 transition-all duration-300"
  />
</Link>
      </nav>
    </>
  );
}