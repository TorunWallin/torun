import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section
      className="relative min-h-[780px] flex items-center px-6 md:px-16 lg:px-20 py-20 md:py-32 pb-32 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.25) 50%, rgba(10,10,10,0) 80%), url('https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1920&q=85&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 max-w-[760px] text-white">
        <Reveal delay={0}>
          <span className="inline-block bg-lime text-ink py-2 px-5 rounded-full font-sans text-[14px] font-semibold border-[1.5px] border-ink mb-10">
            Founding Members · 20% rabatt · 10 platser
          </span>
        </Reveal>

        <Reveal delay={140}>
          <h1 className="font-pacifico text-[52px] md:text-[78px] lg:text-[88px] leading-[1.05] mb-6 font-light tracking-tight">
            Träning som får dig att må bra
            <span className="text-pink"> — på riktigt.</span>
          </h1>
        </Reveal>

        <Reveal delay={300}>
          <div className="font-playwrite text-[18px] md:text-[22px] leading-relaxed mb-5 opacity-95">
            Så glad att du är här <span className="text-pink">♡</span>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <p className="text-[17px] leading-[1.75] max-w-[560px] mb-4 opacity-95 font-serif">
            Jag hjälper tjejer och kvinnor att bygga styrka, trygghet och
            hållbara vanor — utan dietkultur, skuld eller extrema regler.
          </p>
        </Reveal>

        <Reveal delay={480}>
          <p className="text-[16px] leading-[1.75] max-w-[560px] mb-4 opacity-90 font-serif">
            Här handlar hälsa inte om att bli mindre. Det handlar om att känna
            sig stark i kroppen, lugnare i huvudet och mer hemma i sig själv.
          </p>
        </Reveal>

        <Reveal delay={560}>
          <p className="text-[15.5px] leading-[1.75] max-w-[560px] mb-10 opacity-85 font-serif italic">
            Coachning anpassad efter kvinnokroppen, verkliga livet och dig som
            människa.
          </p>
        </Reveal>

        <Reveal delay={680}>
          <a href="#program" className="btn-lime">
            Se programmen →
          </a>
        </Reveal>
      </div>

      {/* Lyxig scroll-indikator du älskade */}
      <div className="absolute bottom-12 left-1/2 hidden md:flex flex-col items-center gap-2 text-white/70 text-xs tracking-widest">
        <div>SCROLL</div>
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
      </div>
    </section>
  );
}
