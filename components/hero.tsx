import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section
      className="relative min-h-[760px] flex items-center px-6 md:px-16 lg:px-20 py-24 md:py-36 pb-32 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(10,10,10,0.50) 0%, rgba(10,10,10,0.20) 50%, rgba(10,10,10,0) 80%), url('https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1920&q=85&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 max-w-[720px] text-white">
        <Reveal delay={0}>
          <span className="inline-block bg-lime text-ink py-2 px-5 rounded-full font-sans text-[13px] font-semibold border-[1.5px] border-ink mb-8 tracking-wide">
            Founding Members · 20% · 10 platser
          </span>
        </Reveal>
        <Reveal delay={140}>
          <h1 className="display-italic text-[60px] md:text-[88px] lg:text-[104px] leading-[0.95] mb-6 tracking-tight">
            Hälsa som verktyg
            <br />
            <span className="text-pink">— inte ett mål.</span>
          </h1>
        </Reveal>
        <Reveal delay={280}>
          <div className="font-script text-pink text-[34px] md:text-[44px] leading-none mb-10 -rotate-2 inline-block">
            så kul att du är här
          </div>
        </Reveal>
        <Reveal delay={400}>
          <p className="text-[18px] leading-[1.65] max-w-[500px] mb-12 opacity-95 font-serif">
            Träning, mat och välmående utan diet-tjat, vågen som coach eller skam.
            Ett annat samtal om hälsa — varmt, ärligt, gjort för verkliga liv.
          </p>
        </Reveal>
        <Reveal delay={500}>
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
