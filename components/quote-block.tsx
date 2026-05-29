import { Reveal } from "./reveal";

export function QuoteBlock() {
  return (
    <section className="relative bg-cream-warm px-6 md:px-16 py-24 md:py-36 overflow-hidden">
      {/* Mjuka bakgrundsformar */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -top-20 -left-20 h-[360px] w-[360px] rounded-full bg-pink-light blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-[420px] w-[420px] rounded-full bg-[#fff0f7] blur-3xl" />
      </div>

      <div className="relative max-w-[880px] mx-auto text-center">
        <Reveal delay={0}>
          <div
            aria-hidden="true"
            className="font-pacifico text-pink-hot/40 text-[120px] md:text-[180px] leading-none -mb-10 select-none"
          >
            &ldquo;
          </div>
        </Reveal>

        <Reveal delay={150}>
          <blockquote className="font-pacifico text-teal text-[36px] md:text-[56px] lg:text-[68px] leading-[1.1] mb-10">
            Du har inte gått vilse. Du har bara varit borta från dig själv ett tag.
          </blockquote>
        </Reveal>

        <Reveal delay={320}>
          <div className="flex items-center justify-center gap-4">
            <span className="block h-px w-12 bg-pink-hot/60" />
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-ink-charcoal">
              Torun
            </span>
            <span className="block h-px w-12 bg-pink-hot/60" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
