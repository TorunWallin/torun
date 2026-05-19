import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section
      className="relative min-h-[900px] flex items-center px-6 md:px-16 lg:px-20 py-20 md:py-32 pb-32 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(10,10,10,0.68) 0%, rgba(10,10,10,0.42) 50%, rgba(10,10,10,0.15) 80%), url('https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1920&q=85&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
      }}
    >
      <div className="relative z-10 max-w-[820px] text-white">
      
        {/* Premium Badge - MYCKET rundare */}
        <Reveal delay={0}>
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-3xl border border-white/40 hover:border-[#f4c1f0]/60 px-9 py-4 rounded-full font-semibold text-[15px] tracking-wider mb-10 shadow-xl shadow-black/40 transition-all">
            <span className="text-[#f4c1f0] text-xl">✦</span>
            <span className="text-[#f4c1f0] font-bold">ERBJUDANDE</span>
            <span className="text-white/60">•</span>
            <span className="text-white/90">Founding Members • 20% rabatt | 10 platser kvar</span>
          </div>
        </Reveal>

        {/* Rubrik - Pacifico lättare */}
        <Reveal delay={100}>
          <h1 className="font-pacifico text-[52px] md:text-[64px] lg:text-[64px] leading-[1.06] tracking-[-0.03em] font-light mb-6">
            Träning som får dig att må bra
            <span className="block text-[#f4c1f0] text-[0.93em]">— på riktigt & helhjärtat</span>
          </h1>
        </Reveal>

        {/* "Så glad att du är här" - Merriweather + vackert hjärta */}
        <Reveal delay={250}>
          <p className="font-serif text-[22px] md:text-[25px] leading-tight mb-8 text-white/95 tracking-wide">
            Så glad att du är här <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">♡</span>
          </p>
        </Reveal>

        {/* Beskrivning */}
        <Reveal delay={350}>
          <p className="font-mono text-[17.5px] leading-relaxed max-w-[560px] mb-12 opacity-95">
            Jag hjälper tjejer och kvinnor att bygga styrka, trygghet och hållbara vanor — 
            utan dietkultur, skuld eller extrema regler.
          </p>
        </Reveal>

        {/* Två CTA-knappar - MYCKET rundare + PREMIUM stil */}
        <Reveal delay={450}>
          <div className="flex flex-wrap gap-4">
            {/* Rosa knapp - premium stil */}
            <a
              href="#program"
              className="group inline-flex items-center justify-center gap-3 bg-[#ec4d9c] hover:bg-[#d13f87] text-white font-semibold text-lg px-12 py-6 rounded-full transition-all duration-300 hover:-translate-y-0.5"
            >
              Se programmen
              <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
            </a>

            {/* Grön knapp - premium stil */}
            <a
              href="#startguide"
              className="group inline-flex items-center justify-center gap-3 bg-[#D9FF4D] hover:bg-[#c5ee3a] text-[#0A0A0A] font-semibold text-lg px-12 py-6 rounded-full transition-all duration-300 hover:-translate-y-0.5"
            >
              Gratis 7-dagars startguide
            </a>
          </div>
        </Reveal>
      </div>

      {/* Scroll */}
      <div className="absolute bottom-12 left-1/2 hidden md:flex flex-col items-center gap-2 text-white/70 text-xs tracking-widest">
        <div>SCROLL</div>
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
      </div>
    </section>
  );
}