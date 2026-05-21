import { Reveal } from "./reveal";
import { SubscribeForm } from "./subscribe-form";

export function CtaStrip() {
  return (
    <section
      id="guide"
      className="relative overflow-hidden bg-[#fdeaf8] px-6 py-24 md:px-16 md:py-36 text-center"
    >
      {/* Glows — rosa + grön */}
      <div className="pointer-events-none absolute -left-40 -top-20 h-[500px] w-[500px] rounded-full bg-[#ff8fd4]/25 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-20 -right-40 h-[450px] w-[450px] rounded-full bg-[#245648]/20 blur-[120px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[350px] w-[350px] rounded-full bg-[#0F4C3A]/15 blur-[100px]" />
      <div className="pointer-events-none absolute right-1/4 top-0 h-[300px] w-[300px] rounded-full bg-[#ffccf7]/40 blur-[100px]" />

      <div className="relative mx-auto max-w-[720px]">

        {/* Eyebrow */}
        <Reveal delay={0}>
          <div className="mb-4 font-mono text-[13px] font-bold uppercase tracking-[0.28em] text-[#ff4fc4]">
            nyhetsbrevet
          </div>
        </Reveal>

        {/* Rubrik */}
        <Reveal delay={80}>
          <h2 className="font-serif text-[48px] leading-[1.15] tracking-[-0.05em] text-[#111] md:text-[72px]">
            Stanna kvar
          </h2>
        </Reveal>

        {/* Script-rad */}
        <Reveal delay={160}>
          <div className="font-playwrite mt-1 mb-10 text-[22px] leading-none text-[#245648] md:text-[28px]">
            direkt i inkorgen ♡
          </div>
        </Reveal>

        {/* Blob-piller */}
        <Reveal delay={240}>
          <div className="mb-10 flex justify-center">
            <span className="rounded-[22px] bg-white/70 px-5 py-2 font-mono text-[12px] font-extrabold uppercase tracking-[0.15em] text-[#ff4fc4] shadow-sm md:text-[14px]">
              FÅ MIN GRATIS 7-DAGARS STARTGUIDE
            </span>
          </div>
        </Reveal>

        {/* Brödtext */}
        <Reveal delay={320}>
          <div className="mx-auto mb-12 max-w-[520px] space-y-4">
            <p className="font-mono text-[15px] leading-[1.7] text-black/75 md:text-[16px]">
              Små steg, träningstips, tankar kring kvinnlig hälsa och
              påminnelser om att du inte behöver göra allt perfekt för att må bra.
            </p>
            <p className="font-mono text-[15px] italic leading-[1.5] text-black/60 md:text-[16px]">
              Bara ett mjukare sätt att börja.
            </p>
          </div>
        </Reveal>

        {/* Formulär */}
        <Reveal delay={400}>
          <SubscribeForm variant="cream" />
        </Reveal>

        {/* Disclaimer */}
        <Reveal delay={480}>
          <p className="mt-6 font-mono text-[12px] text-black/40">
            Du får också mina nyhetsbrev då och då. Avregistrera dig när du vill.
          </p>
        </Reveal>

      </div>
    </section>
  );
}
