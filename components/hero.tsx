import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section
      className="relative min-h-[100dvh] flex items-center px-6 md:px-16 lg:px-24 py-20 overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(
            to bottom, 
            rgba(10,10,10,0.65) 0%, 
            rgba(10,10,10,0.45) 40%, 
            rgba(10,10,10,0.25) 70%, 
            rgba(10,10,10,0.1) 100%
          ), 
          url('https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=2000&q=90&auto=format&fit=crop')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF88]/10 via-transparent to-[#B76A7E]/10" />

      <div className="relative z-10 max-w-3xl">
        <Reveal delay={0}>
          <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-md text-ink px-6 py-2.5 rounded-3xl border border-[#D4AF88]/30 mb-8 shadow-sm">
            <span className="text-[#D4AF88] text-xl">✦</span>
            <span className="font-semibold tracking-wider text-sm">
              FOUNDING MEMBERS • 20% RABATT • 10 PLATSER KVAR
            </span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="font-display text-[clamp(56px,8.5vw,108px)] leading-[0.92] tracking-[-0.04em] text-white mb-6">
            Träning som får dig att<span className="block text-[#D4AF88]">må bra</span>
            <span className="text-[#B76A7E]"> — på riktigt.</span>
          </h1>
        </Reveal>

        <Reveal delay={300}>
          <p className="font-serif text-[21px] md:text-[24px] leading-tight text-white/95 mb-8 max-w-lg">
            Så glad att du är här <span className="text-[#D4AF88]">♡</span>
          </p>
        </Reveal>

        <Reveal delay={400}>
          <div className="space-y-6 text-lg leading-relaxed text-white/90 max-w-md">
            <p>
              Jag hjälper kvinnor att bygga styrka, trygghet och hållbara vanor — 
              utan dietkultur, skuld eller extrema regler.
            </p>
            <p className="italic opacity-90">
              Här handlar hälsa om att känna sig stark, lugn och hemma i sin egen kropp.
            </p>
          </div>
        </Reveal>

        <Reveal delay={600}>
          <a
            href="#program"
            className="mt-12 group inline-flex items-center gap-4 bg-white text-ink px-10 py-5 rounded-2xl font-semibold text-lg tracking-tight hover:bg-[#D4AF88] hover:text-white transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-black/10"
          >
            Se programmen
            <span className="text-2xl group-hover:rotate-12 transition-transform">→</span>
          </a>
        </Reveal>
      </div>

      <div className="absolute bottom-12 left-1/2 hidden md:flex flex-col items-center gap-2 text-white/70 text-xs tracking-widest">
        <div>SCROLL</div>
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
      </div>
    </section>
  );
}
