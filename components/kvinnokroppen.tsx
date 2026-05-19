import { Reveal } from "./reveal";

export function Kvinnokroppen() {
  return (
    <section className="relative px-6 md:px-16 py-28 md:py-36 bg-cream text-center overflow-hidden">
      <div className="max-w-[860px] mx-auto">
        <Reveal delay={0}>
          <div className="mono-eyebrow text-pink-hot mb-5">en annan approach</div>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="font-pacifico text-[44px] md:text-[64px] text-teal leading-[1.05] mb-8">
            för kvinnokroppen <span className="text-pink-hot">·</span> inte emot den
          </h2>
        </Reveal>
        <Reveal delay={260}>
          <p className="text-[18px] leading-[1.8] text-ink-charcoal font-serif mb-6">
            Jag coachar tjejer och kvinnor utifrån hur kvinnokroppen{" "}
            <em className="italic text-teal">faktiskt</em> fungerar.
          </p>
        </Reveal>
        <Reveal delay={360}>
          <p className="text-[17px] leading-[1.8] text-ink-charcoal font-serif mb-6">
            Det betyder att vi tar hänsyn till stress, återhämtning, hormoner,
            menscykel och energi — istället för att försöka pressa kroppen
            hårdare hela tiden.
          </p>
        </Reveal>
        <Reveal delay={460}>
          <p className="text-[17px] leading-[1.8] text-ink-charcoal font-serif italic">
            Du behöver inte leva som en fitnessprofil för att få resultat. Du
            behöver vanor som fungerar i ditt riktiga liv.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
