import { Reveal } from "./reveal";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#0F4C3A] px-6 pt-20 pb-10 md:px-16 md:pt-28">

      {/* Glows */}
      <div className="pointer-events-none absolute -left-32 -top-20 h-[400px] w-[400px] rounded-full bg-[#ff4fc4]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-10 -right-32 h-[350px] w-[350px] rounded-full bg-[#ff8fd4]/10 blur-[100px]" />

      <div className="relative mx-auto max-w-[1200px]">

        {/* Stort kort */}
        <Reveal delay={0}>
          <div className="relative overflow-hidden rounded-[42px] bg-white/95 px-8 py-12 md:px-16 md:py-16 mb-10">

            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#fdeaf8]/80 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-[#d1fae5]/60 blur-[60px]" />

            <div className="relative grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20 items-center">

              {/* Vänster */}
              <div>
                <div className="inline-block rounded-[28px] bg-[#fdeaf8] px-8 py-6">
                  <span className="font-playwrite text-[32px] md:text-[42px] text-[#ffa3f0] block leading-[1.1]">
                    Torun Coach
                  </span>
                </div>
                <div className="pl-6">
                  <p className="mt-4 font-mono text-[13px] font-extrabold italic tracking-tight text-[#ec4d9c] md:text-[14px]">
                    hälsa på dina villkor ♡
                  </p>
                  <p className="mt-3 font-mono text-[14px] leading-[1.75] text-black/60 max-w-[320px]">
                    Online-PT för tjejer och kvinnor som vill bli starka, må bra
                    och bygga vanor som faktiskt håller — utan skuld och utan press.
                  </p>
                </div>
              </div>

              {/* Höger — länkar */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[#ff4fc4]">
                    Utforska
                  </div>
                  <ul className="flex flex-col gap-3">
                    {[
                      { href: "#program", label: "Program & paket" },
                      { href: "#filosofi", label: "Filosofi" },
                      { href: "#om", label: "Om mig" },
                      { href: "#guide", label: "Gratis startguide" },
                    ].map(({ href, label }) => (
                      <li key={href}>
                        <a href={href} className="font-mono text-[14px] text-black/55 transition-colors duration-200 hover:text-[#ff4fc4]">
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[#ff4fc4]">
                    Följ med
                  </div>
                  <ul className="flex flex-col gap-3">
                    <li>
                      <a href="https://www.tiktok.com/@toruncoach" target="_blank" rel="noopener noreferrer" className="font-mono text-[14px] text-black/55 transition-colors duration-200 hover:text-[#ff4fc4]">
                        TikTok →
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/toruncoach" target="_blank" rel="noopener noreferrer" className="font-mono text-[14px] text-black/55 transition-colors duration-200 hover:text-[#ff4fc4]">
                        Instagram →
                      </a>
                    </li>
                    <li>
                      <a href="mailto:hej@torun.se" className="font-mono text-[14px] text-black/55 transition-colors duration-200 hover:text-[#ff4fc4]">
                        hej@torun.se
                      </a>
                    </li>
                    <li>
                      <a href="https://app.everfit.io" target="_blank" rel="noopener noreferrer" className="font-mono text-[14px] text-black/55 transition-colors duration-200 hover:text-[#ff4fc4]">
                        Logga in →
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </Reveal>

        {/* Nedre rad */}
        <Reveal delay={100}>
          <div className="flex flex-col items-start justify-between gap-3 pt-2 md:flex-row md:items-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/30">
              © {new Date().getFullYear()} Toruncoach · Alla rättigheter förbehållna
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-sm">
              <span className="text-[#ff4fc4] text-[13px]">♡</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                Gjord med kärlek
              </span>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/30">
              Integritetspolicy
            </p>
          </div>
        </Reveal>

      </div>
    </footer>
  );
}
