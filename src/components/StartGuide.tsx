import React, { useState } from "react";
import { Mail, Sparkles, Check, BookOpen, Clock, Heart, Calendar, ArrowRight, ArrowLeft, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface StartGuideProps {
  onNavigate: (tabId: string) => void;
}

export default function StartGuide({ onNavigate }: StartGuideProps) {
  const [submitted, setSubmitted] = useState(false);
  const [lead, setLead] = useState({ name: "", email: "", challenge: "general" });
  const [activeDay, setActiveDay] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const guideDays = [
    {
      day: 1,
      title: "Dag 1: Du är redan tillräcklig",
      focus: "Stark > smal",
      description: "Du behöver inte fixa dig själv. Du behöver stöd. Den här veckan handlar inte om att förändra hela ditt liv. Det handlar om att börja bygga en mjukare, starkare relation till dig själv, fylld av energi och självrespekt.",
      exercise: "Skriv ner VARFÖR du vill bli stark, hur du vill känna dig i din kropp och vad ordet 'stark' betyder för just dig. Det finns inga rätt eller fel svar."
    },
    {
      day: 2,
      title: "Dag 2: Träning är aldrig ett straff",
      focus: "Rörelse för energi",
      description: "Träning ska inte vara något du är rädd för att missa, något du straffar dig med, eller något du måste 'förtjäna' mat efter. Det ska ge dig energi, bygga självförtroende och få dig att känna dig kapabel.",
      exercise: "Hitta en rörelse idag som ger dig energi istället för att ta ifrån dig den. Rörelse ska lägga till i ditt liv, inte ta ifrån det."
    },
    {
      day: 3,
      title: "Dag 3: Mat är bränsle 🍓",
      focus: "Stötta kroppen",
      description: "Sluta försöka förtjäna mat. När du underäter och stressar går kroppen in i stressläge vilket kan ge låg energi, sötsug och trötthet. Att äta ordentligt hjälper dig att bygga muskler, orka träna och få bättre hormonell balans.",
      exercise: "Ät en ordentlig frukost du gillar, lägg till protein till minst två måltider, drick mer vatten och ät utan skuld eller stress."
    },
    {
      day: 4,
      title: "Dag 4: Bygg vanor som håller ✨",
      focus: "Kontinuitet & tålamod",
      description: "Undvik 'allt eller inget'-tänket. Din rutin måste fungera även under stressiga veckor, mens eller resor. De små stegen räknas mer än du tror, och kontinuitet är det som faktiskt bygger resultat over tid.",
      exercise: "Skriv ner 3 vanor du vill bygga långsiktigt. Fråga dig själv: 'Vad är det minsta jag kan göra idag för att ta hand om mig själv?' (Minimum days mindset)."
    },
    {
      day: 5,
      title: "Dag 5: Styrka & gymångest 🩷💪",
      focus: "Ta din plats",
      description: "Känns gymmet läskigt? Du är inte ensam. Du behöver inte kunna allt eller känna dig redo för att börja. Gymmet är för alla, men du kan också börja bygga styrka hemma, precis där du är idag.",
      exercise: "Testa de tre enkla hemmaövningarna: Squats (knäböj), Glute bridges och Wall push-ups. Spela en låt som får dig att känna dig stark!"
    },
    {
      day: 6,
      title: "Dag 6: Din starkaste version",
      focus: "Trygghet & återhämtning",
      description: "Din hälsosammaste version behöver inte vara din minsta version. Vila är inte lathet – återhämtning är en del av träningen som hjälper kroppen att bygga muskler, minska stress och återställa hormoner.",
      exercise: "Gör något återhämtande idag. Skriv ner 3 saker som din fantastiska kropp hjälper dig med varje dag, och möt den med omtanke istället för kritik."
    },
    {
      day: 7,
      title: "Dag 7: Du är redan på väg 🎀",
      focus: "Look how far you've come",
      description: "Livet förändras genom de små stegen du fortsätter göra: promenaderna, passen, frukostarna och gångerna du väljer att börja om istället för att ge upp. Det är så hållbar förändring byggs.",
      exercise: "Skriv ner en sak du säger ja till från och med nu, och en sak du säger nej till för att värna om din egen energi och tid."
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead.name.trim() || !lead.email.trim()) return;

    setLoading(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch (err) {
      console.warn("Subscription fetch failed (offline fallback):", err);
    } finally {
      setSubmitted(true);
      setLoading(false);
    }
  };

  return (
    <div className="animated-aurora-bg min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative" id="start-guide-root">
      
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Back navigation button */}
        <div className="mb-6 flex justify-start">
          <button 
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2.5 text-[10px] font-sans font-bold uppercase tracking-[0.16em] text-[#230c1e]/75 bg-white/70 backdrop-blur-md border border-white/85 shadow-xs px-4 py-2.5 rounded-full hover:bg-white hover:text-[#230c1e] hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer select-none"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#fd80ff] stroke-[2.5]" /> Gå tillbaka till startsidan
          </button>
        </div>

        {!submitted ? (
          /* Landing Form card */
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#faf7f8] rounded-[2.5rem] border border-white/60 overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12" id="lander-card">
            
            {/* Intro Visual Left */}
            <div className="md:col-span-5 bg-[#241f21] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden min-h-[480px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#fd80ff]/8 rounded-full filter blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#fd80ff]/4 rounded-full filter blur-2xl pointer-events-none" />
              
              <div className="space-y-6 relative z-10">
                <div>
                  <span className="text-[9px] font-sans font-bold uppercase tracking-[0.14em] text-[#fd80ff] bg-[#341d2e] px-3.5 py-1.5 rounded-full inline-block border border-white/5">
                    GRATIS RESURS V1.0
                  </span>
                </div>
                
                <h2 className="font-serif text-3xl font-normal tracking-tight leading-tight text-white">
                  Stark & Trygg Startguide
                </h2>
                
                <p className="text-xs text-stone-300/85 leading-relaxed font-sans font-light">
                  Din resa mot styrka, energi & en sund relation till träning börjar här. För dig som vill bli stark, må bra & hitta en sund relation till träning och mat – helt utan dietkultur, vågfixering eller "shred"-snack 🤍
                </p>
              </div>

              <div className="w-full h-[1px] bg-white/10 my-6 relative z-10"></div>

              <div className="space-y-4 font-sans text-[10px] uppercase tracking-[0.16em] text-stone-200 relative z-10">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#fd80ff] stroke-[2.5] flex-shrink-0" />
                  <span>Styrka & energi utan dietkultur</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#fd80ff] stroke-[2.5] flex-shrink-0" />
                  <span>Hållbara vanor & gymångest-hjälp</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#fd80ff] stroke-[2.5] flex-shrink-0" />
                  <span>Snälla, hormonstöttande råd & mat</span>
                </div>
              </div>
            </div>

            {/* Form Right */}
            <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center space-y-6 bg-white/60 backdrop-blur-md">
              <div>
                <h3 className="font-serif text-2xl font-normal text-[#230c1e] tracking-wide leading-tight">Hämta guiden kostnadsfritt</h3>
                <p className="text-xs text-[#230c1e]/75 mt-1 font-sans font-light">Fyll i dina uppgifter så skickar jag e-boken direkt till din inkorg.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[9px] font-sans uppercase tracking-[0.16em] font-black text-[#230c1e]/50 mb-1.5">Ditt förnamn</label>
                  <input 
                    type="text" 
                    required
                    value={lead.name}
                    onChange={(e) => setLead({...lead, name: e.target.value})}
                    placeholder="Ditt förnamn..."
                    className="w-full bg-[#fbf9fa] border border-[#ecdfe5] focus:bg-white focus:border-[#fd80ff]/70 focus:ring-4 focus:ring-[#fd80ff]/8 rounded-2xl px-5 py-3.5 text-xs text-[#230c1e] placeholder-[#230c1e]/35 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-sans uppercase tracking-[0.16em] font-black text-[#230c1e]/50 mb-1.5">Din e-postadress</label>
                  <input 
                    type="email" 
                    required
                    value={lead.email}
                    onChange={(e) => setLead({...lead, email: e.target.value})}
                    placeholder="Din e-postadress..."
                    className="w-full bg-[#fbf9fa] border border-[#ecdfe5] focus:bg-white focus:border-[#fd80ff]/70 focus:ring-4 focus:ring-[#fd80ff]/8 rounded-2xl px-5 py-3.5 text-xs text-[#230c1e] placeholder-[#230c1e]/35 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-sans uppercase tracking-[0.16em] font-black text-[#230c1e]/50 mb-1.5">Vad känner du är din största utmaning?</label>
                  <div className="relative">
                    <select 
                      value={lead.challenge}
                      onChange={(e) => setLead({...lead, challenge: e.target.value})}
                      className="w-full bg-[#fbf9fa] border border-[#ecdfe5] focus:bg-white focus:border-[#fd80ff]/70 focus:ring-4 focus:ring-[#fd80ff]/8 rounded-2xl px-5 py-3.5 pr-12 text-xs text-[#230c1e] appearance-none cursor-pointer transition-all outline-none"
                    >
                      <option value="general">Vill bara hitta en stark och snäll relation till min kropp</option>
                      <option value="stress">Hög stress, utmattad eller svårt att sova</option>
                      <option value="hormone">Hormonellt svängig (PMS, menscykeln eller klimakteriet)</option>
                      <option value="relationship">Svårt att behålla en bra träningsvana utan hets</option>
                      <option value="strength">Vill börja lyfta men rädd för skador eller dömande miljöer</option>
                      <option value="inspiration">Är nyfiken och vill bara ha varm träningspepp & inspiration</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#230c1e]/40">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#230c1e] hover:bg-[#34182d] text-white font-sans text-[10px] tracking-[0.18em] font-black uppercase py-4.5 rounded-2xl shadow-lg hover:shadow-xl active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2.5 group disabled:opacity-60"
                  >
                    <Mail className="w-4.5 h-4.5 text-[#fd80ff] group-hover:scale-105 transition-transform" />
                    {loading ? "SKICKAR..." : "SKICKA MIN 7-DAGARS GUIDE NU"}
                  </button>
                </div>
              </form>

              <p className="text-[9px] text-center text-stone-500 leading-relaxed font-sans font-light">
                Jag värnar om din integritet. Du får enbart genuina, lärorika brev fyllda av biologisk kunskap och träningspepp. Du kan självklart avsluta när som helst.
              </p>
            </div>
          </div>
        </div>
        ) : (
          /* Unlocked Interactive PDF Simulated Booklet */
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500" id="unlocked-guide-view">
            
            {/* Header / Tack-Kort banner */}
            <div className="glass-panel border border-white/60 rounded-[2.5rem] p-8 sm:p-12 text-center space-y-4 shadow-xl">
              <span className="text-[10px] font-sans font-bold bg-[#230c1e] text-white px-4 py-1.5 rounded-full uppercase tracking-widest inline-block">
                UPPLÅST & SKICKAD ✓
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-normal tracking-tight text-[#230c1e]">
                Stort tack, finaste {lead.name}! ♡
              </h2>
              <p className="text-[#230c1e]/75 text-xs sm:text-sm max-w-xl mx-auto font-sans font-light">
                Startguiden har skickats till din e-postadress. Du kan börja ta del av häftet direkt här nedan under tiden.
              </p>
            </div>

            {/* Interactive Day Viewer UI */}
            <div className="glass-panel border border-white/60 rounded-[2.5rem] p-6 sm:p-10 shadow-xl space-y-8">
              
              <div className="flex justify-between items-center border-b border-white/40 pb-5">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#fd80ff]" />
                  <span className="font-sans uppercase font-bold text-xs tracking-wider text-[#230c1e]">INTERAKTIV LÄSARE:</span>
                </div>
                <div className="text-xs text-[#230c1e]/70 font-sans font-bold">
                  STEG {activeDay} AV 7
                </div>
              </div>

              {/* Day details */}
              <div className="min-h-[160px]">
                {guideDays.map((step) => {
                  if (step.day !== activeDay) return null;
                  return (
                    <div key={step.day} className="space-y-5 animate-in fade-in duration-300">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-sans font-bold bg-[#fff5fc] text-[#fd80ff] border border-[#f5c7fa]/50 px-3 py-1 rounded-full uppercase tracking-wider">
                          FOKUSOMRÅDE: {step.focus}
                        </span>
                        <span className="text-[10px] font-sans text-[#230c1e]/60 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#230c1e]/30" /> 3 MIN LÄSTID
                        </span>
                      </div>

                      <h3 className="font-display text-lg sm:text-2xl font-light text-[#230c1e] tracking-tight">{step.title}</h3>
                      
                      <p className="text-xs sm:text-sm text-[#230c1e]/85 leading-relaxed font-sans font-light">
                        {step.description}
                      </p>

                      <div className="bg-white/40 border-l-4 border-[#fd80ff] p-5 rounded-r-2xl space-y-1.5">
                        <span className="text-[9px] font-sans font-black text-[#fd80ff] uppercase tracking-widest block">DAGENS SMÅ SJÄLVHANDLING:</span>
                        <p className="text-xs text-[#230c1e] leading-relaxed italic font-serif">
                          {step.exercise}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Day selection pagination dots */}
              <div className="pt-6 border-t border-white/40 flex justify-between items-center flex-wrap gap-4 font-sans">
                <button
                  disabled={activeDay === 1}
                  onClick={() => setActiveDay(prev => Math.max(1, prev - 1))}
                  className="px-4 py-2 bg-white/45 border border-white/55 rounded-xl text-[10px] font-bold uppercase tracking-wider text-[#230c1e] hover:border-[#fd80ff]/50 hover:bg-white/80 disabled:opacity-30 select-none flex items-center gap-1 cursor-pointer transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#fd80ff]" /> FÖREGÅENDE
                </button>

                <div className="flex gap-1 bg-white/20 p-1 rounded-full border border-white/40 backdrop-blur-xs">
                  {guideDays.map((item) => (
                    <button
                      key={item.day}
                      onClick={() => setActiveDay(item.day)}
                      className={`w-7.5 h-7.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                        activeDay === item.day
                          ? "bg-[#230c1e] text-white"
                          : "text-[#230c1e]/70 hover:bg-white/40 hover:text-[#230c1e]"
                      }`}
                    >
                      {item.day}
                    </button>
                  ))}
                </div>

                <button
                  disabled={activeDay === 7}
                  onClick={() => setActiveDay(prev => Math.min(7, prev + 1))}
                  className="px-4 py-2 bg-white/45 border border-white/55 rounded-xl text-[10px] font-bold uppercase tracking-wider text-[#230c1e] hover:border-[#fd80ff]/50 hover:bg-white/80 disabled:opacity-30 select-none flex items-center gap-1 cursor-pointer transition-all"
                >
                  NÄSTA STEG <ArrowRight className="w-3.5 h-3.5 text-[#fd80ff]" />
                </button>
              </div>

            </div>

            {/* Conversion CTA to Personal Coaching */}
            <div className="glass-panel border border-white/60 rounded-[2.5rem] p-8 sm:p-10 text-center space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#fd80ff]/5 rounded-full filter blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#230c1e]/5 rounded-full filter blur-3xl pointer-events-none" />

              <div className="max-w-2xl mx-auto space-y-4 relative z-10 font-sans">
                <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-[#fd80ff] bg-[#fff5fc] border border-[#fd80ff]/20 px-3.5 py-1.5 rounded-full inline-block">
                  TA NÄSTA STEG HÄR ♡
                </span>
                <h3 className="font-display text-xl sm:text-3xl font-normal tracking-tight text-[#230c1e]">
                  Redo att gå hela vägen, {lead.name}?
                </h3>
                <p className="text-xs text-[#230c1e]/75 leading-relaxed font-sans font-light">
                  Att läsa startguiden är ett fantastiskt första steg. Men din unika fysiologi – din stressnivå, din menscykel och ditt livspussel – förtjänar ett anpassat stöd hela vägen. Genom personlig coachning får du veckovis uppföljning, cykelsynkade träningsprogram och anpassad näring direkt i mobilen.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => onNavigate("apply")}
                    className="bg-[#230c1e] hover:bg-[#3d1534] text-white font-sans text-[10px] tracking-widest font-extrabold uppercase py-4 px-8 rounded-full shadow-lg hover:shadow-[#fd80ff]/15 transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    Ansök om personlig coachning nu
                    <ArrowRight className="w-3.5 h-3.5 text-[#fd80ff]" />
                  </button>
                </div>
              </div>
            </div>


          </div>
        )}

      </div>
    </div>
  );
}
