import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section
      className="hero-section relative min-h-[1100px] md:min-h-[1200px] lg:min-h-[1280px] flex items-center px-6 md:px-16 lg:px-20 pt-20 md:pt-32 pb-56 md:pb-72 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.25) 60%, rgba(10,10,10,0.85) 100%), linear-gradient(to right, rgba(10,10,10,0.68) 0%, rgba(10,10,10,0.42) 50%, rgba(10,10,10,0.15) 80%), url('https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1920&q=85&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center 25%",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative z-10 max-w-[820px] text-white">
        <Reveal delay={0}>
          <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-3xl border border-white/40 hover:border-[#f4c1f0]/60 px-9 py-4 rounded-full font-mono text-[15px] tracking-wider mb-10 shadow-xl shadow-black/40 transition-all">
            <span className="text-[#f4c1f0] text-xl">{"✦"}</span>
            <span className="text-[#f4c1f0] font-extrabold">ERBJUDANDE</span>
            <span className="text-white/60"></span>
            <span className="text-white/90">Founding Members • 20% rabatt | 10 platser kvar</span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="font-pacifico text-[52px] md:text-[64px] lg:text-[64px] leading-[1.06] tracking-[-0.03em] font-light mb-6">
            Träning som får dig att må bra
            <span className="block text-[#f4c1f0] text-[0.93em]">— på riktigt & helhjärtat</span>
          </h1>
        </Reveal>

        <Reveal delay={250}>
          <p className="font-serif text-[22px] md:text-[25px] leading-tight mb-8 text-white/95 tracking-wide">
            <b> Så glad att du är här </b>
            <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">*๑♡՞</span>
          </p>
        </Reveal>

        <Reveal delay={350}>
          <p className="font-mono text-[17.5px] leading-relaxed max-w-[560px] mb-12 opacity-95">
            Jag hjälper tjejer och kvinnor att bygga styrka, trygghet och hållbara vanor —
            utan dietkultur, skuld eller extrema regler.
          </p>
        </Reveal>

        <Reveal delay={450}>
          <div className="flex flex-wrap gap-4">
            <a
              href="#program"
              className="group inline-flex items-center justify-center gap-3 bg-[#ec4d9c] hover:bg-[#d13f87] text-white font-mono font-bold text-base px-9 py-5 rounded-full transition-all duration-500 hover:-translate-y-1 hover:scale-[1.04] shadow-lg shadow-[#ec4d9c]/40 hover:shadow-xl hover:shadow-[#ec4d9c]/50 active:scale-[0.97]"
            >
              Se programmen
              <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">→</span>
            </a>

            <a
              href="#startguide"
              className="group inline-flex items-center justify-center gap-3 bg-transparent border-2 border-[#f4c1f0] hover:border-[#ec4d9c] hover:bg-white/10 text-[#f4c1f0] hover:text-white font-mono font-bold text-base px-8 py-5 rounded-full transition-all duration-500 hover:-translate-y-1 hover:scale-[1.04] active:scale-[0.97]"
            >
              Gratis 7-dagars startguide
            </a>
          </div>
        </Reveal>
      </div>

      {/* Mjuk gradient-fade i botten */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-black/40 to-black/80" />

      {/* LYXIG SCROLL-INDIKATOR */}
      <a
        href="#program"
        className="group absolute bottom-16 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-5 z-20"
        aria-label="Scrolla ner"
      >
        <div className="absolute -inset-8 rounded-full bg-[#f4c1f0]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative font-mono text-[11px] tracking-[0.4em] text-white/80 group-hover:text-[#f4c1f0] transition-colors duration-500">
          UPPTÄCK MER
        </div>

        <div className="relative w-[26px] h-[42px] rounded-full border border-white/50 group-hover:border-[#f4c1f0] transition-colors duration-500 flex justify-center pt-2 backdrop-blur-sm bg-white/5">
          <span className="block w-[3px] h-[8px] rounded-full bg-[#f4c1f0] animate-scroll-dot" />
        </div>

        <div className="flex flex-col items-center gap-1 -mt-1">
          <span className="block w-2 h-2 border-r border-b border-white/60 rotate-45 animate-bounce-slow group-hover:border-[#f4c1f0]" />
          <span className="block w-2 h-2 border-r border-b border-white/30 rotate-45 animate-bounce-slow-delayed group-hover:border-[#f4c1f0]/60" />
        </div>

        <div className="w-px h-16 bg-gradient-to-b from-white/60 via-[#f4c1f0]/40 to-transparent" />
      </a>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes scroll-dot {
              0%   { transform: translateY(0);    opacity: 1; }
              70%  { transform: translateY(14px); opacity: 0; }
              100% { transform: translateY(0);    opacity: 0; }
            }
            @keyframes bounce-slow {
              0%, 100% { transform: rotate(45deg) translateY(0);  opacity: 0.7; }
              50%      { transform: rotate(45deg) translateY(4px); opacity: 1; }
            }
            .animate-scroll-dot          { animation: scroll-dot 2.2s cubic-bezier(0.65,0,0.35,1) infinite; }
            .animate-bounce-slow         { animation: bounce-slow 2s ease-in-out infinite; }
            .animate-bounce-slow-delayed { animation: bounce-slow 2s ease-in-out infinite 0.3s; }

            /* På mobil: använd "fixed-liknande" med background-attachment: scroll
               eftersom iOS Safari inte stöder fixed bakgrund bra */
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
