import { Reveal } from "./reveal";
import { SubscribeForm } from "./subscribe-form";

export function CtaStrip() {
  return (
    <section
      id="guide"
      className="bg-pink-hot text-white py-24 md:py-28 px-6 md:px-12 text-center border-t-[1.5px] border-b-[1.5px] border-ink"
    >
      <Reveal delay={0}>
        <div className="font-script text-[28px] md:text-[34px] -rotate-2 inline-block mb-3 text-white">
          gratis startguide
        </div>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="display-italic text-display-sm mb-6">
          Stanna kvar — det är bara början.
        </h2>
      </Reveal>
      <Reveal delay={240}>
        <p className="max-w-[540px] mx-auto mb-9 text-[17px] leading-[1.6]">
          Få min 7-dagars startguide direkt i inkorgen. Inga listor över förbjudet.
          Bara ett varmt sätt att börja röra på dig — på dina villkor.
        </p>
      </Reveal>
      <Reveal delay={360}>
        <SubscribeForm variant="pink" />
      </Reveal>
      <Reveal delay={500}>
        <p className="mt-6 text-[12px] opacity-80 max-w-[400px] mx-auto">
          Du får också mina nyhetsbrev då och då. Avregistrera dig när du vill.
        </p>
      </Reveal>
    </section>
  );
}
