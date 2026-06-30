import React, { useState } from "react";
import { Compass, Sparkles, Activity, Soup, Heart, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PhaseData {
  name: string;
  days: string;
  hormones: {
    estrogen: number;
    progesterone: number;
    cortisol: number;
  };
  energy: string;
  trainingAdvice: string;
  nutritionAdvice: string;
  mindsetMantra: string;
  emoji: string;
}

interface CycleCompassProps {
  language: "sv" | "en";
}

export default function CycleCompass({ language }: CycleCompassProps) {
  const [selectedTab, setSelectedTab] = useState<"cycle" | "special">(() => {
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

  const t = {
    sv: {
      headerTitle: "Hormon- & Träningskompassen",
      headerSub: "Anpassa din styrka efter din biologiska rytm. Välj din menscykeldag eller din nuvarande livsfas för att se hur du bäst samarbetar med din kropp idag.",
      tabCycle: "Menscykeln (Dag 1-28)",
      tabSpecial: "Andra Livsfaser",
      cycleStart: "Dag 1 (Mensstart)",
      cycleEnd: "Dag 28",
      estLevels: "Hormonella nivåer (Estimerade)",
      estrogenLabel: "Östrogen (Styrka & Energi)",
      progesteroneLabel: "Progesteron (Lugn & Värme)",
      cortisolLabel: "Stresskänslighet (Kortisol)",
      energyLabel: "Dagsform & Energi",
      trainFoc: "Dagens träningsfokus",
      nutriFoc: "Dagens näring",
      bannerText: "Detta är generella fysiologiska riktlinjer. I medlemsportalen får du fullständiga träningsprogram och kostscheman anpassade helt efter din unika menscykel, hormonnivåer och livspussel.",
      bannerBtn: "Se medlemskapet & appen →",
      dayText: "DAG"
    },
    en: {
      headerTitle: "Hormone & Training Compass",
      headerSub: "Adapt your strength to your biological rhythm. Choose your menstrual cycle day or your current life phase to see how you best cooperate with your body today.",
      tabCycle: "Menstrual Cycle (Day 1-28)",
      tabSpecial: "Other Life Phases",
      cycleStart: "Day 1 (Period start)",
      cycleEnd: "Day 28",
      estLevels: "Hormonal Levels (Estimated)",
      estrogenLabel: "Estrogen (Strength & Energy)",
      progesteroneLabel: "Progesterone (Calm & Heat)",
      cortisolLabel: "Stress Sensitivity (Cortisol)",
      energyLabel: "Daily Form & Energy",
      trainFoc: "Today's Training Focus",
      nutriFoc: "Today's Nutrition",
      bannerText: "These are general physiological guidelines. In the member portal, you get full training programs and nutrition plans customized entirely to your unique menstrual cycle, hormone levels, and daily puzzle.",
      bannerBtn: "See membership & app →",
      dayText: "DAY"
    }
  }[language];

  const phasesSv: Record<string, PhaseData> = {
    menstruation: {
      name: "Menstruationsfasen (Hormonell Vinter)",
      days: "Dag 1-5",
      hormones: { estrogen: 15, progesterone: 5, cortisol: 40 },
      energy: "Låg biologisk energi (Nervsystemet söker djup återhämtning)",
      trainingAdvice: "Dina könshormoner (östrogen och progesteron) befinner sig vid sin lägsta baslinje. Kroppen lägger mycket energi på det inflammatoriska och energikrävande arbetet att avlägsna livmoderslemhinnan. Belasta inte systemet med hård mjölksyraträning eller högintensiva intervaller (HIIT), vilket höjer kortisolet i onödan. Välj istället lågintensiv rörelse som yinyoga, rörlighetsträning, lugna promenader eller snälla styrkepass med fokus på andning och bäckenbottenstabilisering.",
      nutritionAdvice: "Fokusera på mineralrik och lättsmält kost. Varma grytor och benbuljong fyller på depåerna. Prioritera järnrika källor (rött kött, spenat, linser) i kombination med vitamin C för optimalt upptag. Lägg till antiinflammatoriska kryddor som gurkmeja och ingefära, samt te på hallonblad för att lindra uterus-kramper.",
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
      trainingAdvice: "Estradiol når sin absoluta topp precis innan ägglossningen sker, samtidigt som testosteronet peakar. Det här ger dig maximal neuromuskulär kontakt, explosivitet och styrka. Utnyttja denna biologiska superkraft till toppa med personliga rekord (PR) eller köra tunga, explosiva lyft. Var extra noggrann med uppvärmningen, då högt östrogen kan göra ledband och ligament mer töjbara (kollagenpåverkan). Behåll perfekt teknik.",
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
      nutritionAdvice: "Din ämnesomsättning stiger naturligt och kroppen behöver mer energi. Ät komplexa, fiberrika kolhydrater (havre, sötpotatis, rotfrukter) för att styra progesteronproduktionen och stabilisera blodsockret. Detta minskar PMS och sötsug avsevärt. Lägg till magnesiumrika livsmedel.",
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

  const phasesEn: Record<string, PhaseData> = {
    menstruation: {
      name: "Menstrual Phase (Hormonal Winter)",
      days: "Days 1-5",
      hormones: { estrogen: 15, progesterone: 5, cortisol: 40 },
      energy: "Low biological energy (Nervous system seeks deep recovery)",
      trainingAdvice: "Your sex hormones (estrogen and progesterone) are at their lowest baseline. The body puts a lot of energy into the inflammatory and energy-demanding work of shedding the uterine lining. Do not stress the system with hard lactic acid training or high-intensity intervals (HIIT), which elevate cortisol unnecessarily. Instead, choose low-intensity movement such as yin yoga, mobility training, gentle walks, or kind strength sessions focusing on breathing and pelvic floor stabilization.",
      nutritionAdvice: "Focus on mineral-rich and easily digestible foods. Warm stews and bone broth replenish your reserves. Prioritize iron-rich sources (red meat, spinach, lentils) combined with vitamin C for optimal absorption. Add anti-inflammatory spices like turmeric and ginger, as well as raspberry leaf tea to ease uterine cramps.",
      mindsetMantra: "I respect my lowest biological point. Resting during winter nourishes my coming strength. ♡",
      emoji: "🌊"
    },
    follikular: {
      name: "Follicular Phase (Hormonal Spring)",
      days: "Days 6-12",
      hormones: { estrogen: 65, progesterone: 10, cortisol: 30 },
      energy: "Rising anabolic energy (High stress tolerance & cognitive clarity)",
      trainingAdvice: "The pituitary gland secretes follicle-stimulating hormone (FSH), which makes egg follicles grow and triggers the production of estradiol (estrogen). The rising estrogen has a powerful anabolic (rebuilding) effect on muscle tissue, increases your insulin sensitivity, and improves your recovery. This is your optimal phase for building muscle mass! Increase training volume, challenge yourself in heavy compound lifts, and run more intense sessions – your body is physiologically equipped for high loads.",
      nutritionAdvice: "Support the liver's estrogen metabolism by eating cruciferous vegetables (broccoli, cabbage, Brussels sprouts) containing Indole-3-carbinol. Ensure a high intake of complete protein at every meal to match the rebuilding training, and add fermented foods for gut health.",
      mindsetMantra: "My estrogen is rising and my strength is building. I challenge my body with curiosity and power. 🌱",
      emoji: "🌱"
    },
    ovulation: {
      name: "Ovulation Phase (Hormonal Summer)",
      days: "Days 13-16",
      hormones: { estrogen: 95, progesterone: 40, cortisol: 35 },
      energy: "Peak physical capacity (Peak testosterone & estradiol)",
      trainingAdvice: "Estradiol reaches its absolute peak right before ovulation occurs, while testosterone peaks. This gives you maximum neuromuscular contact, explosiveness, and strength. Utilize this biological superpower to set personal records (PRs) or perform heavy, explosive lifts. Be extra thorough with your warm-up, as high estrogen can make ligaments and tendons more lax (collagen effect). Maintain perfect technique.",
      nutritionAdvice: "The liver is working hard now to metabolize excess estrogen. Eat fiber-rich foods that bind bile acids in the gut and help the body clear out used estrogen (e.g. chia seeds, flax seeds, raw grated carrots). Drink plenty of water and eat easily digestible, colorful foods.",
      mindsetMantra: "I stand in my biological summer and own my full power. I lift heavy, controlled, and confidently. ⚡",
      emoji: "⚡"
    },
    luteal: {
      name: "Luteal Phase (Hormonal Autumn)",
      days: "Days 17-28",
      hormones: { estrogen: 45, progesterone: 80, cortisol: 55 },
      energy: "Shifting from endurance to nesting (Dominant progesterone)",
      trainingAdvice: "After ovulation, the empty follicle forms a corpus luteum which produces progesterone – the body's calming, but also heating hormone. Progesterone raises your body temperature by about 0.5°C and increases your resting heart rate, making cardiorespiratory exercise feel significantly heavier. The body now prefers fat over glycogen as fuel. Focus on controlled strength training with longer rest, and lower the intensity at the end of the phase.",
      nutritionAdvice: "Your metabolism naturally increases and the body needs more energy. Eat complex, fiber-rich carbohydrates (oats, sweet potato, root vegetables) to support progesterone production and stabilize blood sugar. This significantly reduces PMS and cravings. Add magnesium-rich foods.",
      mindsetMantra: "I respect my need for a slower pace. My body is preparing for recovery, and I listen to its signals. 🍂",
      emoji: "🍂"
    },
    klimakterie: {
      name: "Menopause & Perimenopause (Hormonal transition)",
      days: "Life Phase",
      hormones: { estrogen: 20, progesterone: 15, cortisol: 65 },
      energy: "Fluctuating daily form (Requires stabilization and strength focus)",
      trainingAdvice: "During perimenopause, estrogen fluctuates heavily, before dropping permanently in menopause. This changes bone density and decreases muscle mass (risk of sarcopenia). Strength training is now your absolute most important health investment! Heavy, controlled strength training creates the mechanical stress required to stimulate osteoblasts (bone-building cells) and preserve your muscle mass. Avoid prolonged, stressful cardio that drives up cortisol and wears on joints. Instead, run fewer repetitions with more rest.",
      nutritionAdvice: "Prioritize high-quality protein (at least 1.6-2g per kg of body weight) to maintain muscle mass and increase satiety. Add calcium-rich sources, healthy fats (omega-3, avocado, olive oil) and phytoestrogens (crushed flaxseeds, organic tofu) to support mucous membranes and ease hot flashes.",
      mindsetMantra: "I build my future strength and protect my bones. My body is wise, strong, and supportive. 🌸",
      emoji: "🌸"
    },
    stress: {
      name: "Nervous System Balance (During high stress load)",
      days: "Acute State",
      hormones: { estrogen: 25, progesterone: 15, cortisol: 95 },
      energy: "Drained (Sympathetic nervous system in fight-or-flight)",
      trainingAdvice: "When stress is chronic, the adrenal glands run high, pumping out cortisol and adrenaline. Running hard gym sessions or Crossfit in this state breaks down your body further (catabolic state), inhibits the thyroid, and can lead to chronic fatigue. Your priority is to activate the parasympathetic nervous system (rest-and-digest). Replace strength training with nervous system regulation: 15-20 minutes of deep breathing, yin yoga, mobility training, or pressure-free walks in nature. Rest is your most productive session right now!",
      nutritionAdvice: "Long-term stress drains the body of magnesium, zinc, and B-vitamins. Drink plenty of minerals, salt your food with unrefined sea salt, and eat regularly to prevent blood sugar swings that the body interprets as acute threats. Avoid caffeine and sugar that trigger further stress spikes.",
      mindsetMantra: "I lay down all performance. My body needs safety and recovery first. Rest is my chosen strength session. 🕯️",
      emoji: "🕯️"
    }
  };

  const phases = language === "en" ? phasesEn : phasesSv;

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
        <h3 className="font-display text-2xl sm:text-3xl font-normal tracking-tight text-center">
          {t.headerTitle}
        </h3>
        <p className="text-xs sm:text-sm text-[#230c1e]/75 font-sans font-light text-center">
          {t.headerSub}
        </p>

        {/* Tab selection */}
        <div className="inline-flex bg-white/30 backdrop-blur-md p-1 rounded-full border border-white/45 shadow-sm mt-4 font-sans">
          <button
            onClick={() => setSelectedTab("cycle")}
            className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedTab === "cycle" 
                ? "bg-[#230c1e] text-white shadow-md" 
                : "text-[#230c1e]/60 hover:text-[#230c1e]"
            }`}
          >
            {t.tabCycle}
          </button>
          <button
            onClick={() => setSelectedTab("special")}
            className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedTab === "special" 
                ? "bg-[#230c1e] text-white shadow-md" 
                : "text-[#230c1e]/60 hover:text-[#230c1e]"
            }`}
          >
            {t.tabSpecial}
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center font-sans">
        
        {/* Interactive Controls Left */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6 bg-white/20 p-6 rounded-3xl border border-white/40 shadow-xs font-sans">
          
          {selectedTab === "cycle" ? (
            <div className="w-full space-y-6">
              <div className="text-center relative py-6">
                {/* Visual Wheel Representation */}
                <div className="w-40 h-40 rounded-full border-4 border-dashed border-[#fd80ff]/20 flex items-center justify-center mx-auto relative bg-white/40 shadow-inner">
                  <div className="text-center space-y-1">
                    <span className="text-4xl block leading-none">{activePhase.emoji}</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#230c1e]/60">{t.dayText}</span>
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
                  <span>{t.cycleStart}</span>
                  <span>{t.cycleEnd}</span>
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
            <div className="w-full flex flex-col gap-3 font-sans">
              {(language === "sv" ? [
                { id: "klimakterie", label: "Klimakteriet & Perimenopaus", emoji: "🌸", desc: "När östrogenet sjunker naturligt." },
                { id: "stress", label: "Nervsystemsbalans (Utbränd/Stressad)", emoji: "🕯️", desc: "När stress och utmattning tar över." },
                { id: "menstruation", label: "Menscykel: Vinter (Mensfas)", emoji: "🌊", desc: "Dag 1-5 av din cykliska rytm." },
                { id: "ovulation", label: "Menscykel: Sommar (Ägglossning)", emoji: "⚡", desc: "Dag 13-16 med maximal energi." },
              ] : [
                { id: "klimakterie", label: "Menopause & Perimenopause", emoji: "🌸", desc: "When estrogen levels drop naturally." },
                { id: "stress", label: "Nervous System Balance (Stress/Burnout)", emoji: "🕯️", desc: "When stress and exhaustion take over." },
                { id: "menstruation", label: "Menstrual Cycle: Winter (Period)", emoji: "🌊", desc: "Days 1-5 of your cyclic rhythm." },
                { id: "ovulation", label: "Menstrual Cycle: Summer (Ovulation)", emoji: "⚡", desc: "Days 13-16 with peak energy." },
              ]).map((phase) => (
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
          <div className="w-full bg-white/45 p-4.5 rounded-2xl border border-white/50 space-y-3 shadow-2xs font-sans">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#230c1e]/60 block">{t.estLevels}</span>
            
            <div className="space-y-2.5 font-sans">
              {/* Estrogen */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-[#230c1e]/80">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#fd80ff]" /> {t.estrogenLabel}</span>
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
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> {t.progesteroneLabel}</span>
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
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> {t.cortisolLabel}</span>
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
              <div className="flex items-center gap-3 text-left">
                <span className="text-3xl">{activePhase.emoji}</span>
                <div>
                  <span className="inline-flex items-center bg-white/45 backdrop-blur-md text-[#fd80ff] border border-[#fd80ff]/50 px-3.5 py-1.5 rounded-full text-[9px] font-sans font-extrabold uppercase tracking-widest shadow-[0_4px_12px_rgba(0,0,0,0.02)] leading-none">{activePhase.days}</span>
                  <h4 className="font-display text-xl sm:text-2xl font-bold mt-1 text-[#230c1e]">
                    {activePhase.name}
                  </h4>
                </div>
              </div>

              {/* Biological Energy level card */}
              <div className="bg-[#fff5fc]/30 border border-[#fd80ff]/15 p-4 rounded-2xl flex items-center gap-3.5 shadow-2xs text-left">
                <div className="w-8.5 h-8.5 rounded-full bg-white/50 flex items-center justify-center border border-white/60">
                  <Activity className="w-4 h-4 text-[#fd80ff]" />
                </div>
                <div>
                  <span className="block text-[8px] uppercase tracking-wider font-bold text-[#230c1e]/60">{t.energyLabel}</span>
                  <span className="block text-xs font-bold text-[#230c1e]">{activePhase.energy}</span>
                </div>
              </div>

              {/* Details sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                
                {/* Training advice */}
                <div className="bg-white/45 border border-white/60 p-5 rounded-2.5xl space-y-2.5 shadow-2xs">
                  <span className="text-[9px] font-black uppercase tracking-wider text-[#fd80ff] flex items-center gap-1.5 font-sans">
                    <Heart className="w-3.5 h-3.5 fill-[#fd80ff]/10" /> {t.trainFoc}
                  </span>
                  <p className="text-xs sm:text-[13.5px] text-[#230c1e]/85 leading-relaxed font-light">
                    {activePhase.trainingAdvice}
                  </p>
                </div>

                {/* Nutrition advice */}
                <div className="bg-white/45 border border-white/60 p-5 rounded-2.5xl space-y-2.5 shadow-2xs font-sans">
                  <span className="text-[9px] font-black uppercase tracking-wider text-[#230c1e]/70 flex items-center gap-1.5">
                    <Soup className="w-3.5 h-3.5" /> {t.nutriFoc}
                  </span>
                  <p className="text-xs sm:text-[13.5px] text-[#230c1e]/85 leading-relaxed font-light">
                    {activePhase.nutritionAdvice}
                  </p>
                </div>

              </div>

              {/* Premium callout banner */}
              <div className="bg-white/50 border border-[#fd80ff]/20 p-4 rounded-2xl flex items-start gap-3 shadow-2xs font-sans text-left">
                <span className="text-sm mt-0.5">💡</span>
                <p className="text-[10.5px] sm:text-xs text-[#230c1e]/80 leading-normal font-light">
                  {t.bannerText} 
                  <button 
                    onClick={() => {
                      const el = document.getElementById("packages-section");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="ml-1 text-[#fd80ff] hover:text-[#d94ee0] underline font-bold cursor-pointer transition-colors"
                  >
                    {t.bannerBtn}
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
