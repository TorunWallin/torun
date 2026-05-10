import { ImgSticker } from "./img-sticker";
import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section
      className="relative min-h-[680px] flex items-center px-6 md:px-12 py-20 md:py-28 pb-32 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.18) 50%, rgba(10,10,10,0) 80%), url('https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1920&q=85&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Reveal direction="scale" delay={400}>
        <ImgSticker
          src="/PinkDumbells.png"
          size={130}
          className="absolute top-14 right-12 md:right-24 animate-float drop-shadow-[0_10px_28px_rgba(0,0,0,0.35)] -rotate-6"
        />
      </Reveal>

      <div className="relative z-10 max-w-[680px] text-white">
        <Reveal delay={0}>
          <span className="inline-block bg-lime text-ink py-2 px-5 rounded-full font-sans text-[14px] font-semibold border-[1.5px] border-ink mb-7">
            ✨ Founding Members · 20% rabatt · 10 platser
          </span>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="display-italic text-[56px] md:text-[80px] lg:text-[92px] leading-[1.0] mb-4 tracking-tight">
            Hälsa som verktyg
            <br />
            — inte ett <span className="text-pink">mål</span>.
          </h1>
        </Reveal>
        <Reveal delay={240}>
          <div className="font-script text-pink text-[32px] md:text-[40px] leading-none mb-7 -rotate-2 inline-block drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            så kul att du är här
          </div>
        </Reveal>
        <Reveal delay={340}>
          <p className="text-[17px] leading-[1.6] max-w-[480px] mb-9 opacity-95">
            Träning, mat och välmående utan diet-tjat, vågen som coach eller skam.
            Det här är ett annat samtal om hälsa — varmt, ärligt, gjort för
            verkliga liv.
          </p>
        </Reveal>
        <Reveal delay={440}>
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
