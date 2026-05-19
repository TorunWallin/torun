import { Reveal } from "./reveal";

export function StarkTjej() {
  return (
    <section className="relative px-6 md:px-16 py-28 md:py-36 bg-teal text-cream overflow-hidden">
      <div className="max-w-[920px] mx-auto text-center">
        <Reveal delay={0}>
          <div className="mono-eyebrow text-lime mb-6">en plats per kvartal</div>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="display-italic text-[44px] md:text-[64px] text-white mb-8 leading-[1.0] tracking-tight">
            Stark Tjej — för dig som behöver det mest
          </h2>
        </Reveal>
        <Reveal delay={260}>
          <p className="text-[18px] leading-[1.75] text-pink-light max-w-[720px] mx-auto mb-8 opacity-95">
            En gång per kvartal går en plats i <em className="italic text-lime">Stark med Torun</em> till
            en ung tjej som behöver hitta tillbaka till sin styrka. Ingen kostnad. Inga
            krav på prestation. Bara ett varmt rum att börja om i.
          </p>
        </Reveal>
        <Reveal delay={380}>
          <p className="text-[16px] leading-[1.75] text-pink-light max-w-[680px] mx-auto mb-12 opacity-90">
            Träning är ett verktyg för att må bra — aldrig för att straffa. För dig
            som är 16-22 år och vill bygga en sund relation till din kropp, finns
            den här platsen. Skicka ett mejl, skriv lite om dig, så pratar vi.
          </p>
        </Reveal>
        <Reveal delay={500}>
          <a href="#kontakt" className="btn-lime">
            Ansök om en Stark Tjej-plats
          </a>
        </Reveal>
      </div>
    </section>
  );
}
