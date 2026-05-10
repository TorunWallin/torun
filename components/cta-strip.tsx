import { Reveal } from "./reveal";

export function CtaStrip() {
  return (
    <section
      id="guide"
      className="bg-pink-hot text-white py-24 md:py-28 px-6 md:px-12 text-center border-t-[1.5px] border-b-[1.5px] border-ink"
    >
      <Reveal delay={0}>
        <h2 className="display-italic text-display-sm mb-6">
          Stanna kvar — det är bara början.
        </h2>
      </Reveal>
      <Reveal delay={150}>
        <p className="max-w-[540px] mx-auto mb-9 text-[17px] leading-[1.6]">
          Få den första startguiden direkt i inkorgen. Inga listor över förbjudet.
          Bara ett varmt sätt att börja.
        </p>
      </Reveal>
      <Reveal delay={300}>
        <a href="#" className="btn-pill bg-white text-pink-hot hover:bg-teal hover:text-white">
          Skicka mig guiden
        </a>
      </Reveal>
    </section>
  );
}
