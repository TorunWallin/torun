import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section
      className="relative min-h-[760px] flex items-center px-6 md:px-16 lg:px-20 py-20 md:py-32 pb-32 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.25) 50%, rgba(10,10,10,0) 80%), url('https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1920&q=85&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "grayscale(0.15)",
      }}
    >
      <div className="relative z-10 max-w-[760px] text-white">
        <Reveal delay={0}>
          <span className="inline-flex items-center gap-3 bg-lime text-ink py-2 px-5 rounded-full font-sans text-[13px] font-semibold border-[1.5px] border-ink mb-10">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-80">
              Erbjudande
            </span>
            <span>Founding Members · 20% · 10 platser →</span>
          </span>
        </Reveal>

        <Reveal delay={140}>
          <h1 className="font-pacifico text-[54px] md:text-[80px] lg:text-[96px] leading-[1.0] mb-2">
            Träning som får dig att må bra
          </h1>
        </Reveal>

        <Reveal delay={260}>
          <div className="font-pacifico text-pink text-[40px] md:text-[60px] lg:text-[72px] leading-[1.05] mb-9 inline-block">
            — på riktigt & helhjärtat
          </div>
        </Reveal>

        <Reveal delay={380}>
          <div className="font-playwrite text-[18px] md:text-[20px] leading-relaxed mb-3 opacity-95">
            Så glad att du är här <span className="text-pink">♡</span>
          </div>
        </Reveal>

        <Reveal delay={460}>
          <p className="text-[17px] leading-[1.7] max-w-[520px] mb-10 opacity-95 font-serif">
            Jag hjälper tjejer och kvinnor att bygga styrka, trygghet och
            hållbara vanor — utan dietkultur, skuld eller extrema regler.
          </p>
        </Reveal>

        <Reveal delay={580}>
          <div className="flex flex-col sm:flex-row items-start gap-3">
            <a href="#program" className="btn-lime">
              Se programmen →
            </a>
            <a href="#filosofi" className="btn-teal">
              Hur jag tänker
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
