import React, { useState } from "react";
import { Compass, Sparkles, Activity, Soup, Heart, ArrowRight, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PhaseData {
  name: string;
  days: string;
  hormones: {
    estrogen: number; // 0-100
    progesterone: number; // 0-100
    cortisol: number; // 0-100
  };
  energy: string;
  trainingAdvice: string;
  nutritionAdvice: string;
  mindsetMantra: string;
  emoji: string;
}

export default function CycleCompass() {
  const [selectedTab, setSelectedTab] = useState<"cycle" | "special" >(() => {
    return (localStorage.getItem("torun_selected_tab") as "cycle" | "special") || "cycle";
  });
  const [cycleDay, setCycleDay] = useState<number>(() => {
    const saved = localStorage.getItem("torun_cycle_day");
    return saved ? parseInt(saved, 10) : 14;
  });
  const [specialPhase, setSpecialPhase] = useState<string>(() => {
    return localStorage.getItem("torun_special_phase") || "klimakterie";
  });

  React.useEffect(() => {
    localStorage.setItem("torun_selected_tab", selectedTab);
    localStorage.setItem("torun_cycle_day", cycleDay.toString());
    localStorage.setItem("torun_special_phase", specialPhase);
    window.dispatchEvent(new CustomEvent("torun-wellness-updated"));
  }, [selectedTab, cycleDay, specialPhase]);

  const phases: Record<string, PhaseData> = {
    menstruation: {
      name: "Menstruationsfasen (Hormonell Vinter)",
      days: "Dag 1-5",
      hormones: { estrogen: 15, progesterone: 5, cortisol: 40 },
      energy: "Låg biologisk energi (Nervsystemet söker djup återhämtning)",
      trainingAdvice: "Dina könshormoner (östrogen och progesteron) befinner sig vid sin lägsta baslinje. Kroppen lägger mycket energi på det inflammatoriska och energikrävande arbetet att avlägsna livmoderslemhinnan. Belasta inte systemet med hård mjölksyraträning eller högintensiva intervaller (HIIT), vilket höjer kortisolet i onödan. Välj istället lågintensiv rörelse som yinyoga, rörlighetsträning, lugna promenader eller snälla styrkepass med fokus på andning och bäckenbottenstabilisering.",
      nutritionAdvice: "Fokusera på mineralrik och lättsmält kost. Varma grytor och benbuljong fyller på depåerna. Prioritera järnrika källor (rött kött, spenat, linser) i kombination med vitamin C for optimalt upptag. Lägg till antiinflammatoriska kryddor som gurkmeja och ingefära, samt te på hallonblad för att lindra uterus-kramper.",
      mindsetMantra: "Jag respekterar min lägsta biologiska punkt. Att vila under vintern ger näring åt min kommande styrka. ♡",
      emoji: "🌊"
    },
    follikular: {
      name: "Follikulärfasen (Hormonell Vår)",
      days: "Dag 6-12",
      hormones: { estrogen: 65, progesterone: 10, cortisol: 30 },
      energy: "Stigande anabol energi (Hög stresstålighet & kognitiv skärpa)",
      trainingAdvice: "Hypofysen utsöndrar follikelstimulerande hormon (FSH), vilket får äggblåsorna att växa och sätter igång produktionen av estradiol (östrogen). Det stigande östrogenet har en kraftfull anabol (uppbyggande) effekt på muskelvävnad, ökar din insulinkänslighet och förbättrar din återhämtningsförmåga. Det här är din optimala fas för att bygga muskelmassa! Höj träningsvolymen, utmana dig i tunga baslyft och kör intensivare pass – din kropp är fysiologiskt rustad för hög belastning.",
      nutritionAdvice: "Stötta leverns östrogenmetabolism genom att äta korsblommiga grönsaker (broccoli, kål, brysselkål) som innehåller Indol-3-karbinol. Säkerställ ett högt intag av fullvärdigt protein vid varje måltid för att matcha den uppbyggande träningen, och lägg till fermenterad mat för tarmhälsan.",
      mindsetMantra: "Mitt östrogen stiger och min styrka byggs upp. Jag utmanar min kropp med nyfikenhet och kraft. 🌱",
      emoji: "🌱"
    },
    ovulation: {
      name: "Ägglossningsfasen (Hormonell Sommar)",
      days: "Dag 13-16",
      hormones: { estrogen: 95, progesterone: 40, cortisol: 35 },
      energy: "Maximal fysisk kapacitet (Peak testosteron & estradiol)",
      trainingAdvice: "Estradiol når sin absoluta topp precis innan ägglossningen sker, samtidigt som testosteronet peakar. Det här ger dig maximal neuromuskulär kontakt, explosivitet och styrka. Utnyttja denna biologiska superkraft till att slå personliga rekord (PR) eller köra tunga, explosiva lyft. Var extra noggrann med uppvärmningen, då högt östrogen kan göra ledband och ligament mer töjbara (kollagenpåverkan). Behåll perfekt teknik.",
      nutritionAdvice: "Levern arbetar nu på högvarv för att metabolisera östrogenöverskottet. Ät fiberrika livsmedel som binder gallsyror i tarmen och hjälper kroppen att rensa ut använt östrogen (t.ex. chiafrön, linfrön, rårivna morötter). Drick mycket vatten och ät lättsmält, färgrik mat.",
      mindsetMantra: "Jag står i min biologiska sommar och äger min fulla kraft. Jag lyfter tungt, kontrollerat och självsäkert. ⚡",
      emoji: "⚡"
    },
    luteal: {
      name: "Lutealfasen (Hormonell Höst)",
      days: "Dag 17-28",
      hormones: { estrogen: 45, progesterone: 80, cortisol: 55 },
      energy: "Skiftande från uthållighet till boande (Dominerande progesteron)",
      trainingAdvice: "Efter ägglossningen bildar den tomma äggblåsan en gulkropp (corpus luteum) som producerar progesteron – kroppens lugnande, men också värmande hormon. Progesteron höjer din kroppstemperatur med ca 0.5°C och ökar din vilopuls, vilket gör att flåsig cardio känns betydligt tyngre. Kroppen använder nu hellre fett framför glykogen som bränsle. Fokusera på kontrollerad styrketräning med längre vila, och sänk intensiteten i slutet av fasen.",
      nutritionAdvice: "Din ämnesomsättning stiger naturligt och kroppen behöver mer energi. Ät komplexa, fiberrika kolhydrater (havre, sötpotatis, rotfrukter) för att stötta progesteronproduktionen och stabilisera blodsockret. Detta minskar PMS och sötsug avsevärt. Lägg till magnesiumrika livsmedel.",
      mindsetMantra: "Jag respekterar mitt behov av långsammare tempo. Min kropp förbereder sig på återhämtning, och jag lyssnar på dess signaler. 🍂",
      emoji: "🍂"
    },
    klimakterie: {
      name: "Klimakteriet & Perimenopaus (Hormonell transition)",
      days: "Livsfas",
      hormones: { estrogen: 20, progesterone: 15, cortisol: 65 },
      energy: "Fluktuerande dagsform (Kräver stabilisering och styrkefokus)",
      trainingAdvice: "Under perimenopausen fluktuerar östrogenet kraftigt, för att i menopausen sjunka permanent. Detta förändrar bentätheten och minskar muskelmassan (risk för sarkopeni). Styrketräning är nu din absolut viktigaste hälsoinvestering! Tung, kontrollerad styrketräning skapar det mekaniska tryck som krävs för att stimulera osteoblasterna (skelettuppbyggande celler) och bevara din muskelmassa. Undvik långvarig, stressande cardio som driver upp kortisolet och sliter på lederna. Kör istället färre repetitioner med mer vila.",
      nutritionAdvice: "Prioritera högkvalitativt protein (minst 1.6-2g per kg kroppsvikt) för att bibehålla muskelmassa och stärka mättnadskänslan. Lägg till kalciumrika källor, nyttiga fetter (omega-3, avokado, olivolja) samt fytoöstrogener (krossade linfrön, ekologisk tofu) för att stötta slemhinnor och lindra värmevallningar.",
      mindsetMantra: "Jag bygger min framtida styrka och skyddar min benstomme. Min kropp är vis, stark och bärande. 🌸",
      emoji: "🌸"
    },
    stress: {
      name: "Nervsystemsbalans (Vid hög stressbelastning)",
      days: "Akutläge",
      hormones: { estrogen: 25, progesterone: 15, cortisol: 95 },
      energy: "Dränerad (Sympatiska nervsystemet i fight-or-flight)",
      trainingAdvice: "När stressen är kronisk går binjurarna på högvarv och pumpar ut kortisol och adrenalin. Att köra hårda gympass eller crossfit i detta läge bryter ner din kropp ytterligare (katabolt tillstånd), hämmar sköldkörteln och kan leda till kronisk trötthet. Din prioritet är att aktivera det parasympatiska nervsystemet (lugn-och-ro). Ersätt styrketräningen med nervsystemsreglering: 15-20 minuters djupandning, yinyoga, rörlighetsträning eller kravlösa promenader i naturen. Vila är ditt mest produktiva pass just nu!",
      nutritionAdvice: "Långvarig stress dränerar kroppen på magnesium, zink och B-vitaminer. Drick mycket mineraler, salta maten med oraffinerat havssalt och ät regelbundet för att förhindra de blodsockersvängningar som kroppen tolkar som akuta hot. Undvik koffein och socker som triggar ytterligare stresspåslag.",
      mindsetMantra: "Jag lägger ner alla prestationer. Min kropp behöver trygghet och återhämtning först. Vila är mitt valda styrkepass. 🕯️",
      emoji: "🕯️"
    }
  };

  const getCyclePhase = (day: number): PhaseData => {
    if (day >= 1 && day <= 5) return phases.menstruation;
    if (day >= 6 && day <= 12) return phases.follikular;
    if (day >= 13 && day <= 16) return phases.ovulation;
    return phases.luteal;
  };

  const activePhase = selectedTab === "cycle" 
    ? getCyclePhase(cycleDay) 
    : phases[specialPhase];

  return (
    <div className="glass-panel rounded-[2.5rem] border border-white/60 shadow-xl overflow-hidden p-6 sm:p-10 text-[#230c1e] relative" id="cycle-compass-widget">
      
      {/* Background soft light elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#fd80ff]/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#230c1e]/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
        <div className="w-12 h-12 rounded-full bg-[#fff5fc] border border-[#fd80ff]/20 flex items-center justify-center mx-auto">
          <Compass className="w-6 h-6 text-[#fd80ff]" />
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-normal tracking-tight">
          Hormon- & Träningskompassen
        </h3>
        <p className="text-xs sm:text-sm text-[#230c1e]/75 font-sans font-light">
          Anpassa din styrka efter din biologiska rytm. Välj din menscykeldag eller din nuvarande livsfas för att se hur du bäst samarbetar med din kropp idag.
        </p>

        {/* Tab selection */}
        <div className="inline-flex bg-white/30 backdrop-blur-md p-1 rounded-full border border-white/45 shadow-sm mt-4">
          <button
            onClick={() => setSelectedTab("cycle")}
            className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedTab === "cycle" 
                ? "bg-[#230c1e] text-white shadow-md" 
                : "text-[#230c1e]/60 hover:text-[#230c1e]"
            }`}
          >
            Menscykeln (Dag 1-28)
          </button>
          <button
            onClick={() => setSelectedTab("special")}
            className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedTab === "special" 
                ? "bg-[#230c1e] text-white shadow-md" 
                : "text-[#230c1e]/60 hover:text-[#230c1e]"
            }`}
          >
            Andra Livsfaser
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center font-sans">
        
        {/* Interactive Controls Left */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6 bg-white/20 p-6 rounded-3xl border border-white/40 shadow-xs">
          
          {selectedTab === "cycle" ? (
            <div className="w-full space-y-6">
              <div className="text-center relative py-6">
                {/* Visual Wheel Representation */}
                <div className="w-40 h-40 rounded-full border-4 border-dashed border-[#fd80ff]/20 flex items-center justify-center mx-auto relative bg-white/40 shadow-inner">
                  <div className="text-center space-y-1">
                    <span className="text-4xl block leading-none">{activePhase.emoji}</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#230c1e]/60">DAG</span>
                    <span className="text-3xl font-serif font-black text-[#230c1e] leading-none block">{cycleDay}</span>
                  </div>
                  {/* Small rotating dot along border */}
                  <div 
                    className="absolute w-4 h-4 bg-[#fd80ff] border-2 border-white rounded-full shadow-md transition-all duration-300"
                    style={{
                      transform: `rotate(${(cycleDay / 28) * 360}deg) translate(80px) rotate(-${(cycleDay / 28) * 360}deg)`,
                      top: "calc(50% - 8px)",
                      left: "calc(50% - 8px)"
                    }}
                  />
                </div>
              </div>

              {/* Slider selector */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#230c1e]/70">
                  <span>Dag 1 (Mensstart)</span>
                  <span>Dag 28</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="28" 
                  value={cycleDay}
                  onChange={(e) => setCycleDay(parseInt(e.target.value))}
                  className="premium-slider"
                />
                <div className="flex justify-center gap-1.5 mt-2">
                  {[1, 7, 14, 21, 28].map(day => (
                    <button
                      key={day}
                      onClick={() => setCycleDay(day)}
                      className={`w-7 h-7 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                        cycleDay === day 
                          ? "bg-[#fd80ff] text-white border-transparent scale-110 shadow-sm" 
                          : "bg-white/40 hover:bg-white/80 text-[#230c1e] border-white/50"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Special Life Phases List */
            <div className="w-full flex flex-col gap-3">
              {[
                { id: "klimakterie", label: "Klimakteriet & Perimenopaus", emoji: "🌸", desc: "När östrogenet sjunker naturligt." },
                { id: "stress", label: "Nervsystemsbalans (Utbränd/Stressad)", emoji: "🕯️", desc: "När stress och utmattning tar över." },
                { id: "menstruation", label: "Menscykel: Vinter (Mensfas)", emoji: "🌊", desc: "Dag 1-5 av din cykliska rytm." },
                { id: "ovulation", label: "Menscykel: Sommar (Ägglossning)", emoji: "⚡", desc: "Dag 13-16 med maximal energi." },
              ].map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => setSpecialPhase(phase.id)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-4 ${
                    specialPhase === phase.id 
                      ? "bg-white/65 border-[#fd80ff]/40 shadow-sm" 
                      : "bg-white/10 hover:bg-white/30 border-white/30"
                  }`}
                >
                  <span className="text-2xl">{phase.emoji}</span>
                  <div className="font-sans">
                    <span className="block text-xs font-bold text-[#230c1e]">{phase.label}</span>
                    <span className="block text-[10px] text-[#230c1e]/70 mt-0.5 leading-tight">{phase.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Hormone graph visualizer */}
          <div className="w-full bg-white/45 p-4.5 rounded-2xl border border-white/50 space-y-3 shadow-2xs">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#230c1e]/60 block">Hormonella nivåer (Estimerade)</span>
            
            <div className="space-y-2.5">
              {/* Estrogen */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-[#230c1e]/80">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#fd80ff]" /> Östrogen (Styrka & Energi)</span>
                  <span className="font-bold">{activePhase.hormones.estrogen}%</span>
                </div>
                <div className="w-full bg-white/40 h-2 rounded-full overflow-hidden border border-white/50">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${activePhase.hormones.estrogen}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full bg-[#fd80ff] rounded-full"
                  />
                </div>
              </div>

              {/* Progesterone */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-[#230c1e]/80">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Progesteron (Lugn & Värme)</span>
                  <span className="font-bold">{activePhase.hormones.progesterone}%</span>
                </div>
                <div className="w-full bg-white/40 h-2 rounded-full overflow-hidden border border-white/50">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${activePhase.hormones.progesterone}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full bg-emerald-500 rounded-full"
                  />
                </div>
              </div>

              {/* Cortisol */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-[#230c1e]/80">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Stresskänslighet (Kortisol)</span>
                  <span className="font-bold">{activePhase.hormones.cortisol}%</span>
                </div>
                <div className="w-full bg-white/40 h-2 rounded-full overflow-hidden border border-white/50">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${activePhase.hormones.cortisol}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full bg-amber-500 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Content Panel Right */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              {/* Phase name & Badge */}
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activePhase.emoji}</span>
                <div>
                  <span className="inline-flex items-center bg-white/45 backdrop-blur-md text-[#fd80ff] border border-[#fd80ff]/50 px-3.5 py-1.5 rounded-full text-[9px] font-sans font-extrabold uppercase tracking-widest shadow-[0_4px_12px_rgba(0,0,0,0.02)] leading-none">{activePhase.days}</span>
                  <h4 className="font-display text-xl sm:text-2xl font-bold mt-1 text-[#230c1e]">
                    {activePhase.name}
                  </h4>
                </div>
              </div>

              {/* Biological Energy level card */}
              <div className="bg-[#fff5fc]/30 border border-[#fd80ff]/15 p-4 rounded-2xl flex items-center gap-3.5 shadow-2xs">
                <div className="w-8.5 h-8.5 rounded-full bg-white/50 flex items-center justify-center border border-white/60">
                  <Activity className="w-4 h-4 text-[#fd80ff]" />
                </div>
                <div>
                  <span className="block text-[8px] uppercase tracking-wider font-bold text-[#230c1e]/60">Dagsform & Energi</span>
                  <span className="block text-xs font-bold text-[#230c1e]">{activePhase.energy}</span>
                </div>
              </div>

              {/* Details sections (Fully visible!) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Training advice */}
                <div className="bg-white/45 border border-white/60 p-5 rounded-2.5xl space-y-2.5 shadow-2xs">
                  <span className="text-[9px] font-black uppercase tracking-wider text-[#fd80ff] flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 fill-[#fd80ff]/10" /> Dagens träningsfokus
                  </span>
                  <p className="text-xs sm:text-[13.5px] text-[#230c1e]/85 leading-relaxed font-light">
                    {activePhase.trainingAdvice}
                  </p>
                </div>

                {/* Nutrition advice */}
                <div className="bg-white/45 border border-white/60 p-5 rounded-2.5xl space-y-2.5 shadow-2xs font-sans">
                  <span className="text-[9px] font-black uppercase tracking-wider text-[#230c1e]/70 flex items-center gap-1.5">
                    <Soup className="w-3.5 h-3.5" /> Dagens näring
                  </span>
                  <p className="text-xs sm:text-[13.5px] text-[#230c1e]/85 leading-relaxed font-light">
                    {activePhase.nutritionAdvice}
                  </p>
                </div>

              </div>

              {/* Premium callout banner */}
              <div className="bg-white/50 border border-[#fd80ff]/20 p-4 rounded-2xl flex items-start gap-3 shadow-2xs font-sans">
                <span className="text-sm mt-0.5">💡</span>
                <p className="text-[10.5px] sm:text-xs text-[#230c1e]/80 leading-normal font-light">
                  <strong>Detta är generella fysiologiska riktlinjer.</strong> I medlemsportalen får du fullständiga träningsprogram och kostscheman anpassade helt efter din unika menscykel, hormonnivåer och livspussel. 
                  <button 
                    onClick={() => {
                      const el = document.getElementById("packages-section");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="ml-1 text-[#fd80ff] hover:text-[#d94ee0] underline font-bold cursor-pointer transition-colors"
                  >
                    Se medlemskapet & appen →
                  </button>
                </p>
              </div>

              {/* Mindset Quote block */}
              <div className="glass-panel-vibrant rounded-2.5xl p-6 border border-white/65 shadow-2xs relative overflow-hidden font-serif italic text-center text-xs sm:text-sm text-[#230c1e]/90 leading-relaxed">
                <span className="absolute -top-3 -left-1 text-7xl text-[#fd80ff]/8 select-none pointer-events-none">“</span>
                <p className="relative z-10 px-4">
                  {activePhase.mindsetMantra}
                </p>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
