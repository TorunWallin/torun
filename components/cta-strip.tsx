import { Reveal } from "./reveal";
import { SubscribeForm } from "./subscribe-form";

export function CtaStrip() {
  return (
    <section
      id="guide"
      className="bg-pink-hot text-white py-28 md:py-36 px-6 md:px-12 text-center border-t-[1.5px] border-b-[1.5px] border-ink"
    >
      <Reveal delay={0}>
        <div className="mono-eyebrow text-white opacity-95 mb-5">nyhetsbrevet</div>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="font-pacifico text-[52px] md:text-[80px] leading-[1.0] mb-8">
          Stanna kvar <span className="text-cream">♡</span>
        </h2>
      </Reveal>
      <Reveal delay={260}>
        <p className="max-w-[600px] mx-auto mb-3 text-[18px] leading-[1.7] font-serif">
          Få min gratis 7-dagars startguide direkt i inkorgen.
        </p>
      </Reveal>
      <Reveal delay={360}>
        <p className="max-w-[600px] mx-auto mb-12 text-[16px] leading-[1.7] opacity-90 font-serif">
          Små steg, träningstips, tankar kring kvinnlig hälsa och påminnelser
          om att du inte behöver göra allt perfekt för att må bra.{" "}
          <em className="italic">Bara ett mjukare sätt att börja.</em>
        </p>
      </Reveal>
      <Reveal delay={480}>
        <SubscribeForm variant="pink" />
      </Reveal>
      <Reveal delay={600}>
        <p className="mt-8 text-[12px] opacity-80 max-w-[400px] mx-auto">
          Du får också mina nyhetsbrev då och då. Avregistrera dig när du vill.
        </p>
      </Reveal>
    </section>
  );
}
