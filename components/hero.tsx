import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section
      className="relative min-h-[780px] flex items-center px-6 md:px-16 lg:px-20 py-20 md:py-32 pb-32 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0.35) 50%, rgba(10,10,10,0.1) 80%), url('https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1920&q=85&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 max-w-[760px] text-white">
        
        {/* Badge – exakt som i din bild */}
        <Reveal delay={0}>
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-lime-400 to-emerald-400 text-ink py-3 px-8 rounded-full font-semibold text-[15px] tracking-wider mb-10 shadow-lg shadow-lime/30 border border-white/30">
            ERBJUDANDE
            <span className="text-ink/70">•</span>
            Founding Members · 20% rabatt · 10 platser kvar →
          </div>
        </Reveal>

        {/* Rubrik */}
        <Reveal delay={140}>
          <h1 className="font-pacifico text-[56px] md:text-[82px] lg:text-[92px] leading-[1.02] mb-6 tracking-[-0.02em]">
            Träning som får dig att må bra
            <span className="block text-pink text-[0.92em]">— på riktigt & helhjärtat</span>
          </h1>
        </Reveal>

        <Reveal delay={300}>
          <div className="font-playwrite text-[21px] md:text-[24px] leading-tight mb-6 text-white/95">
            Så glad att du är här <span className="text-pink">♡</span>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <p className="text-[17.5px] leading-relaxed max-w-[560px] mb-10 opacity-95">
            Jag hjälper tjejer och kvinnor att bygga styrka, trygghet och hållbara vanor — 
            utan dietkultur, skuld eller extrema regler.
          </p>
        </Reveal>

        {/* NY GENOMSKINLIG ROSA KNAPP */}
        <Reveal delay={520}>
          <a
            href="#program"
            className="group relative inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-xl border border-white/30 hover:border-pink/50 text-white font-semibold text-xl px-14 py-7 rounded-full overflow-hidden transition-all hover:scale-[1.03] active:scale-95 shadow-2xl shadow-black/30"
          >
            <span className="relative z-10 flex items-center gap-3">
              Ta del av erbjudandet nu
              <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
            </span>
            
            {/* Rosa glow vid hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink/20 to-rose-400/20 opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </a>
        </Reveal>
      </div>

      {/* Lyxig scroll */}
      <div className="absolute bottom-12 left-1/2 hidden md:flex flex-col items-center gap-2 text-white/70 text-xs tracking-widest">
        <div>SCROLL</div>
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
      </div>
    </section>
  );
}
