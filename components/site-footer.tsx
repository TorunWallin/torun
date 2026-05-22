import { Reveal } from "./reveal";
import { BeholdWidget } from "./behold-widget";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#0F4C3A]">
      {/* Top decorative border */}
      <div className="h-[4px] w-full bg-[#ec4d9c] shadow-[0_0_24px_8px_rgba(236,77,156,0.35)]" />

      {/* Instagram-strip header */}
      <div className="flex items-center justify-between bg-[#ec4d9c] px-6 py-5 md:px-16">
        <div className="flex items-center gap-3">
          <svg className="h-4 w-4 text-white/70" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
          </svg>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/80">@toruncoach</span>
        </div>
        <a
          href="https://www.instagram.com/toruncoach"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] uppercase tracking-[0.25em] text-white transition-colors duration-200 hover:text-white/70"
        >
          Följ mig →
        </a>
      </div>

      {/* Behold widget */}
      <div className="w-full">
        <BeholdWidget feedId="RP0hblqJB7tQ66Hc26w6" />
      </div>

      {/* Glows */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#ff4fc4]/6 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/3 rounded-full bg-[#ff8fd4]/5 blur-[120px]" />

      {/* Editorial statement */}
      <Reveal delay={0}>
        <div className="relative px-6 pt-24 pb-16 text-center md:px-16 md:pt-32 md:pb-20">
          <div className="mb-6 inline-flex items-center gap-4">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-[#ff4fc4]/40" />
            <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-[#ff4fc4]/70">Torun Coach</span>
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-[#ff4fc4]/40" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <h2 className="font-pacifico text-[42px] leading-none text-white/90 md:text-[76px]">
              hälsa på dina villkor
            </h2>
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#ff4fc4]/20 border border-[#ff4fc4]/30 md:h-14 md:w-14">
              <svg className="h-5 w-5 text-[#ff4fc4] md:h-7 md:w-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </div>
         <p className="mx-auto mt-8 max-w-[440px] font-mono leading-[2] text-white/60">
  <span className="text-[15px] font-bold md:text-[16px]">
    Online-PT för tjejer och kvinnor som vill bli starka,
  </span>
  <span className="text-[15px] italic md:text-[16px] whitespace-nowrap">
    må bra och bygga vanor som faktiskt håller.
  </span>
</p>
        </div>
      </Reveal>

      {/* Thin divider */}
      <div className="mx-6 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent md:mx-16" />

      {/* Link grid */}
      <Reveal delay={80}>
        <div className="mx-auto max-w-[1200px] px-6 py-16 md:px-16 md:py-20">
          <div className="grid grid-cols-2 gap-12 md:grid-cols-4 md:gap-8">

            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="mb-5 inline-block rounded-[16px] border border-white/10 bg-white/5 px-5 py-3">
                <span className="font-playwrite text-[20px] leading-none text-[#ffa3f0]">Torun</span>
              </div>
              <p className="font-mono text-[12px] leading-[1.8] text-white/30">
                hälsa på dina villkor ♡ 
              </p>
            </div>

            {/* Utforska */}
            <div>
              <div className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#ff4fc4]/55">
                Utforska
              </div>
              <ul className="flex flex-col gap-4">
                {[
                  { href: "#program", label: "Program & paket" },
                  { href: "#filosofi", label: "Filosofi" },
                  { href: "#om", label: "Om mig" },
                  { href: "#guide", label: "Startguide" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <a href={href} className="font-mono text-[13px] text-white/35 transition-colors duration-200 hover:text-white">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kontakt */}
            <div>
              <div className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#ff4fc4]/55">
                Kontakt
              </div>
              <ul className="flex flex-col gap-4">
                <li>
                  <a href="mailto:hej@torun.se" className="font-mono text-[13px] text-white/35 transition-colors duration-200 hover:text-white">
                    hej@torun.se
                  </a>
                </li>
                <li>
                  <a href="https://app.everfit.io" target="_blank" rel="noopener noreferrer" className="font-mono text-[13px] text-white/35 transition-colors duration-200 hover:text-white">
                    Logga in →
                  </a>
                </li>
                <li>
                  <a href="/integritetspolicy" className="font-mono text-[13px] text-white/35 transition-colors duration-200 hover:text-white">
                    Integritetspolicy
                  </a>
                </li>
              </ul>
            </div>

            {/* Följ med */}
            <div>
              <div className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#ff4fc4]/55">
                Följ med
              </div>
              <div className="flex gap-2.5">
                <a
                  href="https://www.instagram.com/toruncoach"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-all duration-300 hover:-translate-y-[2px] hover:border-[#ff4fc4] hover:bg-[#ff4fc4]"
                >
                  <svg className="h-[15px] w-[15px] text-white/50 transition-colors duration-300 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@toruncoach"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-all duration-300 hover:-translate-y-[2px] hover:border-white/30 hover:bg-[#111]"
                >
                  <svg className="h-[15px] w-[15px] text-white/50 transition-colors duration-300 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </Reveal>

      {/* Bottom bar */}
      <div className="mx-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent md:mx-16" />
      <Reveal delay={120}>
        <div className="flex flex-col items-center justify-between gap-3 px-6 py-8 text-center md:flex-row md:px-16 md:text-left">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/22">
            © {new Date().getFullYear()} Toruncoach · Alla rättigheter förbehållna
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#ff4fc4]/50">♡</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/22">
              Gjord med kärlek
            </span>
          </div>
        </div>
      </Reveal>

    </footer>
  );
}
