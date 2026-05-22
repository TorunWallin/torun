import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integritetspolicy — Torun Coach",
  description: "Hur Torun Coach hanterar dina personuppgifter.",
};

export default function IntegritetspolicyPage() {
  return (
    <main className="min-h-screen bg-[#fef6fb]">

      {/* Header */}
      <div className="bg-[#0F4C3A] px-6 py-16 text-center md:px-16 md:py-24">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-white/40 transition-colors duration-200 hover:text-white/70"
        >
          ← Tillbaka till startsidan
        </Link>
        <h1 className="font-pacifico text-[42px] leading-[1.1] text-white/90 md:text-[64px]">
          Integritetspolicy
        </h1>
        <p className="mx-auto mt-4 max-w-[480px] font-mono text-[13px] leading-[1.8] text-white/45">
          Senast uppdaterad: maj 2025
        </p>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[760px] px-6 py-16 md:px-8 md:py-24">
        <div className="space-y-12">

          <Section title="1. Vem ansvarar för dina uppgifter?">
            <p>
              Torun Coach (nedan "vi", "oss" eller "Toruncoach") ansvarar för behandlingen av dina personuppgifter. Har du frågor är du alltid välkommen att kontakta oss på{" "}
              <a href="mailto:hej@torun.se" className="text-[#ec4d9c] underline underline-offset-2 hover:text-[#ff4fc4]">
                hej@torun.se
              </a>.
            </p>
          </Section>

          <Section title="2. Vilka uppgifter samlar vi in?">
            <p>Vi samlar bara in det vi faktiskt behöver:</p>
            <ul>
              <li><strong>E-postadress</strong> — när du anmäler dig till vår gratis startguide eller nyhetsbrev.</li>
              <li><strong>Namn och kontaktuppgifter</strong> — om du tar kontakt med oss via mejl.</li>
              <li><strong>Tränings- och hälsoinformation</strong> — om du är klient och vi använder träningsplattformen Everfit.</li>
            </ul>
          </Section>

          <Section title="3. Varför behandlar vi dina uppgifter?">
            <ul>
              <li><strong>Leverera startguiden och nyhetsbrev</strong> — för att skicka det du bad om.</li>
              <li><strong>Kundkommunikation</strong> — för att svara på dina frågor och administrera coaching-samarbetet.</li>
              <li><strong>Förbättra tjänsten</strong> — vi analyserar aldrig enskilda beteenden, bara anonyma aggregerade data.</li>
            </ul>
            <p>Vi säljer, hyr ut eller delar aldrig dina uppgifter med tredje part för marknadsföring.</p>
          </Section>

          <Section title="4. Hur länge sparar vi dina uppgifter?">
            <ul>
              <li><strong>Nyhetsbrev/startguide</strong> — så länge du är prenumerant. Du kan avsluta när som helst via länken i varje utskick.</li>
              <li><strong>Mejlkonversationer</strong> — i upp till 24 månader efter senaste kontakt.</li>
              <li><strong>Klientdata i Everfit</strong> — under aktiv coaching-period och i upp till 12 månader därefter.</li>
            </ul>
          </Section>

          <Section title="5. Tredjepartstjänster">
            <p>Vi använder ett fåtal externa tjänster för att driva sajten:</p>
            <ul>
              <li><strong>Behold.so</strong> — visar vårt Instagram-flöde på sajten. Inga besökaruppgifter lagras av Behold.</li>
              <li><strong>Everfit</strong> — träningsplattform för klienter. Hanterar egna personuppgifter enligt sin integritetspolicy.</li>
              <li><strong>E-postleverantör</strong> — används för att skicka nyhetsbrev. Dina uppgifter lagras på servrar inom EU/EES.</li>
            </ul>
          </Section>

          <Section title="6. Dina rättigheter (GDPR)">
            <p>Enligt dataskyddsförordningen (GDPR) har du rätt att:</p>
            <ul>
              <li>Begära ett <strong>registerutdrag</strong> — se vilka uppgifter vi har om dig.</li>
              <li>Begära <strong>rättelse</strong> av felaktiga uppgifter.</li>
              <li>Begära <strong>radering</strong> ("rätten att bli bortglömd").</li>
              <li>Begära <strong>begränsning</strong> av behandlingen.</li>
              <li><strong>Invända</strong> mot behandling som grundar sig på berättigat intresse.</li>
              <li>Lämna in klagomål till <strong>Integritetsskyddsmyndigheten (IMY)</strong> på{" "}
                <span className="text-[#ec4d9c]">imy.se</span>.
              </li>
            </ul>
            <p>
              Skicka din begäran till{" "}
              <a href="mailto:hej@torun.se" className="text-[#ec4d9c] underline underline-offset-2 hover:text-[#ff4fc4]">
                hej@torun.se
              </a>{" "}
              så återkommer vi inom 30 dagar.
            </p>
          </Section>

          <Section title="7. Cookies">
            <p>
              Sajten använder inga spårnings- eller marknadsföringscookies. Eventuella tekniska cookies (t.ex. för att sajten ska fungera) lagrar ingen personlig information.
            </p>
          </Section>

          <Section title="8. Ändringar i policyn">
            <p>
              Om vi uppdaterar den här policyn publicerar vi den nya versionen här med ett nytt datum. Väsentliga ändringar kommunicerar vi via nyhetsbrevet.
            </p>
          </Section>

          <Section title="9. Kontakt">
            <p>
              Frågor, funderingar eller en begäran om dina uppgifter? Hör av dig:{" "}
              <a href="mailto:hej@torun.se" className="text-[#ec4d9c] underline underline-offset-2 hover:text-[#ff4fc4]">
                hej@torun.se
              </a>
            </p>
          </Section>

        </div>
      </div>

    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 font-pacifico text-[22px] text-[#0F4C3A] md:text-[26px]">{title}</h2>
      <div className="space-y-3 font-mono text-[14px] leading-[1.85] text-black/60 [&_a]:transition-colors [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-[#ec4d9c] [&_li]:before:content-['·'] [&_ul]:mt-2 [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  );
}
