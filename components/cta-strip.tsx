import { Reveal } from "./reveal";
import { SubscribeForm } from "./subscribe-form";

export function CtaStrip() {
  return (
    <section
      id="guide"
      className="bg-pink-hot text-white py-28 md:py-36 px-6 md:px-12 text-center border-t-[1.5px] border-b-[1.5px] border-ink"
    >
      <Reveal delay={0}>
        <div className="mono-eyebrow text-white opacity-95 mb-4">gratis startguide</div>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="display-italic text-[44px] md:text-[64px] mb-6 leading-[1.0] tracking-tight">
          Stanna kvar — det är bara början.
        </h2>
      </Reveal>
      <Reveal delay={260}>
        <p className="max-w-[560px] mx-auto mb-12 text-[17px] leading-[1.7]">
          Få min 7-dagars startguide direkt i inkorgen. Inga listor över förbjudet.
          Bara ett varmt sätt att börja röra på dig — på dina villkor.
        </p>
      </Reveal>
      <Reveal delay={400}>
        <SubscribeForm variant="pink" />
      </Reveal>
      <Reveal delay={520}>
        <p className="mt-8 text-[12px] opacity-80 max-w-[400px] mx-auto">
          Du får också mina nyhetsbrev då och då. Avregistrera dig när du vill.
        </p>
      </Reveal>
    </section>
  );
}
