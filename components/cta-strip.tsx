import { Reveal } from "./reveal";
import { SubscribeForm } from "./subscribe-form";

export function CtaStrip() {
  return (
    <section
      id="guide"
      className="relative overflow-hidden bg-[#fdeaf8] px-6 py-24 md:px-16 md:py-32"
    >
      {/* Glows — rosa + grön */}
      <div className="pointer-events-none absolute -left-40 -top-20 h-[500px] w-[500px] rounded-full bg-[#ff8fd4]/25 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-20 -right-40 h-[450px] w-[450px] rounded-full bg-[#245648]/20 blur-[120px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[350px] w-[350px] rounded-full bg-[#0F4C3A]/15 blur-[100px]" />
      <div className="pointer-events-none absolute right-1/4 top-0 h-[300px] w-[300px] rounded-full bg-[#ffccf7]/40 blur-[100px]" />

      <div className="relative mx-auto max-w-[820px]">
        <Reveal delay={0}>
          <div
            className="relative rounded-[42px] border-[1.5px] border-[#f6c9ea] bg-white/100 px-10 py-12 md:px-16 md:py-16"
            style={{ animation: "scaleIn 1.2s ease-out forwards" }}
          >

            {/* Eyebrow */}
            <div className="mb-3 font-mono text-[16px] font-bold uppercase tracking-[0.18em] text-[#f09ad6] md:text-[18px]">
              nyhetsbrevet
            </div>

            {/* Stor rubrik */}
            <h2
              className="font-serif text-[54px] leading-[1.2] tracking-[-0.06em] text-[#ffccf7] md:text-[64px]"
              style={{
                textShadow: "0px 1px 0px #e5a8d7, 0px 1px 0px rgba(236,77,156,0.18)",
              }}
            >
              Stanna kvar
            </h2>

            {/* Script-rad */}
            <div className="font-playwrite -mt-1 mb-10 text-[26px] leading-none text-[#245648] md:text-[30px]">
              direkt i inkorgen ♡
            </div>

            {/* Blob-piller */}
            <div className="mb-10">
              <span className="box-decoration-clone inline rounded-[22px] bg-[#fdeaf8] px-4 py-2 font-mono text-[13px] font-extrabold uppercase leading-[1.7] text-[#ffa3f0] decoration-clone md:text-[15px]">
                FÅ MIN GRATIS 7-DAGARS STARTGUIDE
              </span>
            </div>

            {/* Brödtext */}
            <div className="mb-12 max-w-[560px] space-y-5">
              <p className="font-mono text-[16px] leading-[1.65] tracking-[-0.01em] text-black md:text-[17px]">
                Små steg, träningstips, tankar kring kvinnlig hälsa och
                påminnelser om att du inte behöver göra allt perfekt för att
                må bra.
              </p>
              <p className="font-mono text-[16px] italic leading-[1.4] text-black md:text-[17px]">
                Bara ett mjukare sätt att börja.
              </p>
            </div>

            {/* Formulär */}
            <SubscribeForm variant="cream" />

            {/* Disclaimer */}
            <p className="mt-6 max-w-[420px] font-mono text-[12px] text-black/50">
              Du får också mina nyhetsbrev då och då. Avregistrera dig när du
              vill.
            </p>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
