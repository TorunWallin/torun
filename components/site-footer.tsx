export function SiteFooter() {
  return (
    <footer className="bg-cream py-14 px-6 md:px-10 border-t border-cream-warm">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        <div>
          <div className="display-italic text-[28px] text-teal mb-1.5 leading-none">
            torun.
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-charcoal mb-4">
            Hälsa · Styrka · Vardag
          </div>
          <p className="text-[14px] leading-[1.6] text-ink-charcoal max-w-[300px]">
            Online-PT för tjejer och kvinnor som vill bli starka, må bra och
            äta utan skam. Baserad i Mälardalen, jobbar 100% online via
            Everfit.
          </p>
        </div>

        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-pink-hot font-bold mb-4">
            Innehåll
          </div>
          <ul className="flex flex-col gap-2.5">
            <li><a href="#program" className="text-[14px] text-ink-charcoal hover:text-pink-hot transition-colors">Program & paket</a></li>
            <li><a href="#filosofi" className="text-[14px] text-ink-charcoal hover:text-pink-hot transition-colors">Filosofi</a></li>
            <li><a href="#om" className="text-[14px] text-ink-charcoal hover:text-pink-hot transition-colors">Om mig</a></li>
            <li><a href="#kontakt" className="text-[14px] text-ink-charcoal hover:text-pink-hot transition-colors">Kontakt</a></li>
            <li><a href="https://app.everfit.io" target="_blank" rel="noopener noreferrer" className="text-[14px] text-ink-charcoal hover:text-pink-hot transition-colors">Logga in i appen →</a></li>
          </ul>
        </div>

        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-pink-hot font-bold mb-4">
            Följ med
          </div>
          <ul className="flex flex-col gap-2.5">
            <li>
              <a
                href="https://www.tiktok.com/@toruncoach"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-ink-charcoal hover:text-pink-hot transition-colors"
              >
                TikTok @toruncoach →
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/toruncoach"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-ink-charcoal hover:text-pink-hot transition-colors"
              >
                Instagram @toruncoach →
              </a>
            </li>
            <li>
              <a
                href="mailto:hej@torun.se"
                className="text-[14px] text-ink-charcoal hover:text-pink-hot transition-colors"
              >
                hej@torun.se
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream-warm pt-6 flex flex-col md:flex-row justify-between gap-3 max-w-[1100px] mx-auto">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-gray">
          © {new Date().getFullYear()} TORUN. · Alla rättigheter förbehållna
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-gray">
          Mälardalen · 100% online
        </div>
      </div>
    </footer>
  );
}
