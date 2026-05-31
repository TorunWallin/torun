import { Reveal } from "./reveal";

export function HeroV2() {
  return (
    <section
      className="hero-section relative min-h-[100svh] md:min-h-[1200px] lg:min-h-[1280px] flex items-start px-6 md:px-16 lg:px-20 pt-24 md:pt-40 lg:pt-48 pb-32 md:pb-72 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.25) 60%, rgba(10,10,10,0.85) 100%), linear-gradient(to right, rgba(10,10,10,0.68) 0%, rgba(10,10,10,0.42) 50%, rgba(10,10,10,0.15) 80%), url('https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1920&q=85&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center 25%",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative z-10 max-w-[820px] text-white">
        {/* Pill — FITNESSCOACH · För tjejer & kvinnor */}
        <Reveal delay={0}>
          <div className="inline-flex flex-col md:flex-row md:items-center gap-1 md:gap-3 bg-white/15 backdrop-blur-3xl border border-white/40 hover:border-[#f4c1f0]/60 px-5 py-3 md:px-9 md:py-4 rounded-2xl md:rounded-full font-mono text-[12px] md:text-[15px] tracking-wide md:tracking-wider mb-8 md:mb-10 shadow-xl shadow-black/40 transition-all">
            <div className="flex items-center gap-2">
              <span className="text-[#f4c1f0]">✦</span>
              <span className="text-[#f4c1f0] font-extrabold">FITNESSCOACH</span>
              <span className="text-white/90">För tjejer &amp; kvinnor</span>
            </div>
          </div>
        </Reveal>

        {/* Headline — den kraftfulla raden */}
        <Reveal delay={100}>
          <h1 className="font-pacifico text-[36px] sm:text-[44px] md:text-[58px] lg:text-[60px] leading-[1.06] tracking-[-0.03em] font-light mb-7 max-w-[680px]">
            Du behöver inte förtjäna din egen kropp.
          </h1>
        </Reveal>

        {/* Tagline — med rosa accent på "en kropp som bär dem genom livet" */}
        <Reveal delay={250}>
          <p className="font-serif text-[19px] md:text-[22px] leading-[1.45] mb-8 text-white/95 tracking-wide max-w-[680px]">
            <b>
              Styrketräning och coaching för kvinnor som vill må bra på riktigt
              — genom styrka, energi och{" "}
              <span className="text-[#f4c1f0]">en kropp som bär dem genom livet.</span>
            </b>
          </p>
        </Reveal>

        {/* Body — UPDATED */}
        <Reveal delay={350}>
          <p className="font-mono text-[15.5px] md:text-[16.5px] leading-relaxed max-w-[600px] mb-12 opacity-95">
            För dig som tränat för att straffa, ätit för att kompensera eller
            tappat bort känslan av att vara på samma lag som din kropp. Här
            finns en mjukare väg framåt. En plats där du får bygga styrka,
            skapa hållbara vanor och må bra<i> utan att din relation till kroppen
            tar över hela ditt liv.</i>
          </p>
        </Reveal>

        <Reveal delay={450}>
          <div className="flex flex-wrap gap-4">
            <a
              href="#program"
              className="group relative overflow-hidden inline-flex items-center justify-center bg-gradient-to-br from-[#f4c1f0] to-[#ec4d9c] text-white font-mono font-bold text-base px-9 py-5 rounded-full transition-all duration-300 hover:-translate-y-1 hover:from-[#fce4ee] hover:to-[#f4a6cc] hover:text-[#111] shadow-[0_4px_20px_rgba(0,0,0,0.22)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.28)] active:scale-[0.97]"
            >
              <span className="block transition-transform duration-300 group-hover:-translate-x-2">
                Se programmen
              </span>
              <span className="absolute inset-y-0 right-7 flex items-center translate-x-16 transition-transform duration-300 group-hover:translate-x-0">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 16 16"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </a>

            <a
              href="#guide"
              className="group relative overflow-hidden inline-flex items-center justify-center bg-transparent border-2 border-[#f4c1f0] hover:border-[#ec4d9c] hover:bg-white/10 text-[#f4c1f0] hover:text-white font-mono font-bold text-base px-8 py-5 rounded-full transition-all duration-300 hover:-translate-y-1 active:scale-[0.97]"
            >
              <span className="absolute inset-y-0 left-6 flex items-center -translate-x-16 transition-transform duration-300 group-hover:translate-x-0">
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1 L9.3 6.7 L15 8 L9.3 9.3 L8 15 L6.7 9.3 L1 8 L6.7 6.7 Z" />
                </svg>
              </span>
              <span className="block transition-transform duration-300 group-hover:translate-x-5">
                Gratis 7-dagars startguide
              </span>
            </a>
          </div>
        </Reveal>
      </div>

      {/* Fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-black/40 to-black/80" />

      {/* Scroll indicator */}
      <a
        href="#program"
        className="group absolute bottom-16 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-5 z-20"
        aria-label="Scrolla ner"
      >
        <div className="relative font-mono text-[11px] tracking-[0.4em] text-white/80 group-hover:text-[#f4c1f0] transition-colors duration-500">
          UPPTÄCK MER
        </div>
      </a>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 768px) {
              .hero-section {
                background-attachment: scroll !important;
              }
            }
          `,
        }}
      />
    </section>
  );
}