/**
 * StarkTjej — Standalone version som matchar bilden hon delade:
 * EN PLATS PER KVARTAL · Stark Tjej ♡ · gammal copy · pink "Skicka ett mejl"-knapp
 * Delar bakgrund med KvinnokroppenV2 ovanför (inget jack).
 */
import { Reveal } from "./reveal";

export function StarkTjej() {
  return (
    <section
      id="stipendiet"
      className="relative overflow-hidden px-6 md:px-16 pt-12 md:pt-16 pb-24 md:pb-32"
    >
      {/* Bakgrund — fortsätter sömlöst från KvinnokroppenV2 */}
      <div className="absolute inset-0 bg-[#fdeaf8]/80" />
      <div className="absolute right-[-100px] top-[10%] h-[480px] w-[480px] rounded-full bg-[#ff8fd4]/40 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-32 left-[-80px] h-[420px] w-[420px] rounded-full bg-white/60 blur-[140px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ff4fc4 1px, transparent 0)`,
          backgroundSize: "22px 22px",
        }}
      />

      <Reveal delay={0} className="relative mx-auto max-w-[860px]">
        <div className="relative overflow-hidden rounded-[32px] md:rounded-[40px] border border-white/50 bg-white/30 px-6 py-10 shadow-[0_8px_40px_rgba(255,79,196,0.12),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-2xl md:px-16 md:py-16">
          <div className="relative">
            {/* Eyebrow med linjer */}
            <div className="mb-6 inline-flex items-center gap-3">
              <div className="h-[1px] w-10 bg-[#ff4fc4]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-[#ff4fc4]">
                En plats per kvartal
              </span>
              <div className="h-[1px] w-10 bg-[#ff4fc4]" />
            </div>

            <h3 className="font-pacifico text-[38px] leading-[1.15] text-[#111] md:text-[50px]">
              Stark Tjej{" "}
              <span className="text-[#ff4fc4]">♡</span>
            </h3>

            <p className="mt-6 font-serif text-[18px] leading-[1.8] text-black/80 md:text-[20px]">
              En gång per kvartal ger jag bort en plats i{" "}
              <b>Stark med Torun</b> till en ung tjej som behöver stöd,
              trygghet och en ny start i sin relation till träning och sig själv.
            </p>

            <div className="mt-8 rounded-2xl bg-[#fdeaf8]/70 px-6 py-5">
              <p className="font-mono text-[15px] italic leading-[1.7] text-[#111]">
                Ingen prestation. Ingen press att vara duktig.
                Bara ett varmt rum att börja om i.
              </p>
            </div>

            <p className="mt-8 font-mono text-[13px] tracking-[0.08em] text-black/60">
              För dig mellan{" "}
              <span className="font-bold text-[#ff4fc4]">16–22 år</span>{" "}
              som vill bygga styrka, självkänsla och en snällare relation till kroppen.
            </p>

            <div className="mt-10">
              <a
                href="/kontakt#stark-tjej"
                className="group relative overflow-hidden inline-flex items-center justify-center rounded-full bg-[#ff4fc4] px-10 py-4 font-serif text-[16px] tracking-[0.02em] text-white transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#e03db0]"
              >
                <span className="block transition-transform duration-300 group-hover:-translate-x-2">
                  Skicka ett mejl
                </span>
                <span className="absolute inset-y-0 right-5 flex items-center translate-x-16 transition-transform duration-300 group-hover:translate-x-0">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.593C6.37 16.054 1 11.296 1 7.19 1 3.8 3.78 2 6.281 2c1.312 0 3.5.612 5.719 3.457C14.219 2.612 16.407 2 17.719 2 20.22 2 23 3.8 23 7.19c0 4.106-5.37 8.864-11 14.403z" />
                    </svg>
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
