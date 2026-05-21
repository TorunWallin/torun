import { Reveal } from "./reveal";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#0F4C3A] px-6 pb-10 pt-20 md:px-16 md:pt-28">

      {/* Dekorativa glows */}
      <div className="pointer-events-none absolute -left-32 -top-20 h-[400px] w-[400px] rounded-full bg-[#ff4fc4]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-10 -right-32 h-[350px] w-[350px] rounded-full bg-[#ff8fd4]/10 blur-[100px]" />

      {/* Övre del */}
      <div className="relative mx-auto max-w-[1200px]">

        {/* Logo + tagline */}
        <Reveal delay={0}>
          <div className="mb-16 border-b border-white/10 pb-16">
            <h2 className="font-pacifico text-[52px] leading-none text-white md:text-[72px]">
              torun<span className="text-[#ff4fc4]">.</span>
            </h2>
            <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.3em] text-white/50">
              Hälsa · Styrka · Vardag
            </p>
          </div>
        </Reveal>

        {/* Grid */}
        <Reveal delay={100}>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">

            {/* Om */}
            <div>
              <p className="font-serif text-[16px] leading-[1.8] text-white/70">
                Online-PT för tjejer och kvinnor som vill bli starka, må bra
                och bygga vanor som faktiskt håller — utan skuld och utan
                press.
              </p>
              <p className="mt-4 font-mono text-[12px] tracking-[0.08em] text-white/40">
                Baserad i Mälardalen · 100% online via Everfit
              </p>
            </div>

            {/* Innehåll */}
            <div>
              <div className="mb-5 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[#ff4fc4]">
                Utforska
              </div>
              <ul className="flex flex-col gap-3">
                {[
                  { href: "#program", label: "Program & paket" },
                  { href: "#filosofi", label: "Filosofi" },
                  { href: "#om", label: "Om mig" },
                  { href: "#guide", label: "Gratis startguide" },
                  { href: "https://app.everfit.io", label: "Logga in i appen →", external: true },
                ].map(({ href, label, external }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="font-mono text-[14px] text-white/60 transition-colors duration-200 hover:text-[#ff4fc4]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socialt */}
            <div>
              <div className="mb-5 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[#ff4fc4]">
                Följ med
              </div>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    href="https://www.tiktok.com/@toruncoach"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[14px] text-white/60 transition-colors duration-200 hover:text-[#ff4fc4]"
                  >
                    TikTok @toruncoach →
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/toruncoach"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[14px] text-white/60 transition-colors duration-200 hover:text-[#ff4fc4]"
                  >
                    Instagram @toruncoach →
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hej@torun.se"
                    className="font-mono text-[14px] text-white/60 transition-colors duration-200 hover:text-[#ff4fc4]"
                  >
                    hej@torun.se
                  </a>
                </li>
              </ul>

              {/* Hjärta-dekor */}
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 backdrop-blur-sm">
                <span className="text-[#ff4fc4]">♡</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                  Gjord med kärlek
                </span>
              </div>
            </div>

          </div>
        </Reveal>

        {/* Nedre rad */}
        <Reveal delay={200}>
          <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-8 md:flex-row md:items-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/30">
              © {new Date().getFullYear()} Toruncoach · Alla rättigheter förbehållna
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/30">
              Integritetspolicy
            </p>
          </div>
        </Reveal>

      </div>
    </footer>
  );
}
