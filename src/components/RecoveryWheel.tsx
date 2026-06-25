import React, { useState } from "react";
import { Heart, Activity, Sliders, ShieldAlert, Sparkles, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function RecoveryWheel() {
  const [sleep, setSleep] = useState<number>(() => {
    const saved = localStorage.getItem("torun_recovery_sleep");
    return saved ? parseInt(saved, 10) : 8;
  });
  const [stress, setStress] = useState<number>(() => {
    const saved = localStorage.getItem("torun_recovery_stress");
    return saved ? parseInt(saved, 10) : 3;
  });
  const [soreness, setSoreness] = useState<number>(() => {
    const saved = localStorage.getItem("torun_recovery_soreness");
    return saved ? parseInt(saved, 10) : 2;
  });
  const [cramps, setCramps] = useState<number>(() => {
    const saved = localStorage.getItem("torun_recovery_cramps");
    return saved ? parseInt(saved, 10) : 1;
  });
  const [hasCheckedIn, setHasCheckedIn] = useState<boolean>(() => {
    return localStorage.getItem("torun_recovery_checked_in") === "true";
  });

  // Compute nervous system balance score
  const computeScore = () => {
    const positive = sleep * 10; // max 100
    const negative = (stress * 4) + (soreness * 3) + (cramps * 3); // max 40 + 30 + 30 = 100
    const score = Math.max(12, Math.min(100, Math.round(positive - (negative * 0.5) + 20)));
    return score;
  };

  const score = computeScore();

  React.useEffect(() => {
    localStorage.setItem("torun_recovery_sleep", sleep.toString());
    localStorage.setItem("torun_recovery_stress", stress.toString());
    localStorage.setItem("torun_recovery_soreness", soreness.toString());
    localStorage.setItem("torun_recovery_cramps", cramps.toString());
    localStorage.setItem("torun_recovery_checked_in", hasCheckedIn ? "true" : "false");
    localStorage.setItem("torun_recovery_score", score.toString());
    window.dispatchEvent(new CustomEvent("torun-wellness-updated"));
  }, [sleep, stress, soreness, cramps, hasCheckedIn, score]);

  const getStatus = (val: number) => {
    if (val >= 80) {
      return {
        title: "Hormonell Homeostas & Maximal Prestationsförmåga",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200",
        accent: "#10b981",
        desc: "Ditt nervsystem uppvisar stark parasympatisk tonus och optimal återhämtning. Könshormoner och kortisolsvar är i fullständig harmoni, vilket medför hög stresstålighet, utmärkt insulinkänslighet och maximal neuromuskulär rekrytering. Detta är ett perfekt fysiologiskt tillfälle för progressiv överbelastning (progressive overload), explosivitet och tunga baslyft. Din kropp är ready att belastas!",
        adjustment: "100% kapacitet: Kör enligt ditt primära styrkeschema. Utmana dig i tunga set med perfekt teknik."
      };
    } else if (val >= 50) {
      return {
        title: "Måttlig systembelastning (Dagsformsjustering rekommenderas)",
        color: "text-[#230c1e] bg-[#fff5fc]/60 border-[#fd80ff]/15",
        accent: "#fd80ff",
        desc: "Ditt nervsystem befinner sig i en funktionell balans, men indikerar mild ackumulerad trötthet, begynnande muskelnedbrytning (träningsvärk) eller förhöjt mentalt kortisolpådrag. Din glykogensyntes och återhämtningshastighet är något nedsatt. Styrketräning är fortfarande högst gynnsamt, men prioritera rörelsekvalitet framför utmattning. Förläng vilan mellan seten med 30 sekunder för komplett ATP-återhämtning.",
        adjustment: "Kompensera för belastningen: Behåll träningsvikterna men minska volymen genom att kapa sista repetitionen på varje set. Undvik helt att träna till fail."
      };
    } else {
      return {
        title: "Sympatisk Dominans & Dränerade Reserver",
        color: "text-amber-800 bg-amber-50/70 border-amber-200",
        accent: "#f59e0b",
        desc: "Ditt system uppvisar tecken på akut stressbelastning (sympatikus-dominans). Med förhöjda kortisolnivåer och nedsatt sömnkvalitet är kroppen i en katabol (nedbrytande) fas. Att utsätta kroppen för tunga lyft eller hård pulsträning nu kommer hämma sköldkörtelfunktionen (konverteringen av T4 till aktivt T3), öka muskelnedbrytningen och motverka dina mål. Ge kroppen trygghet för att sänka stressen.",
        adjustment: "Nervsystemsreglering: Byt ut styrkepasset mot 20 minuter yinyoga, rörlighetsträning eller en lugn promenad. Din vila bygger din styrka ♡"
      };
    }
  };

  const status = getStatus(score);

  return (
    <div className="glass-panel rounded-[2.5rem] border border-white/60 shadow-xl overflow-hidden p-6 sm:p-10 text-[#230c1e] relative" id="recovery-wheel-widget">
      
      {/* Aurora glow spheres */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#fd80ff]/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
        <div className="w-12 h-12 rounded-full bg-[#fff5fc] border border-[#fd80ff]/20 flex items-center justify-center mx-auto">
          <Activity className="w-6 h-6 text-[#fd80ff]" />
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-normal tracking-tight">
          Nervsystemsbalans & Dagsformshjul
        </h3>
        <p className="text-xs sm:text-sm text-[#230c1e]/75 font-sans font-light">
          Din kropp är inte en maskin som ska piskas. Checka in med ditt nervsystem nedan för att få en skräddarsydd och biologiskt sund träningsjustering baserat på din dagsform.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Sliders Control Panel Left */}
        <div className="lg:col-span-6 space-y-5 bg-white/20 p-6 rounded-3xl border border-white/40 shadow-xs font-sans">
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#230c1e]/60 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5" /> DINA BIOLOGISKA INDIKATORER
          </span>

          <div className="space-y-4">
            {/* Sleep Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-[#230c1e]">
                <span className="font-bold">1. Sömnkvalitet 🌙</span>
                <span className="text-[#fd80ff] font-extrabold">{sleep} / 10</span>
              </div>
              <input 
                type="range" min="1" max="10" value={sleep}
                onChange={(e) => { setSleep(parseInt(e.target.value)); setHasCheckedIn(true); }}
                className="premium-slider"
              />
              <span className="text-[9.5px] text-[#230c1e]/60 block">1: Sömnlös, orolig natt • 10: Djup, stärkande sömn</span>
            </div>

            {/* Stress Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-[#230c1e]">
                <span className="font-bold">2. Mental stress & krav 🧠</span>
                <span className="text-[#fd80ff] font-extrabold">{stress} / 10</span>
              </div>
              <input 
                type="range" min="1" max="10" value={stress}
                onChange={(e) => { setStress(parseInt(e.target.value)); setHasCheckedIn(true); }}
                className="premium-slider"
              />
              <span className="text-[9.5px] text-[#230c1e]/60 block">1: Helt lugn i själen • 10: Hög puls, mycket stress / måsten</span>
            </div>

            {/* Muscle Soreness */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-[#230c1e]">
                <span className="font-bold">3. Träningsvärk & ledömhet 💪</span>
                <span className="text-[#fd80ff] font-extrabold">{soreness} / 10</span>
              </div>
              <input 
                type="range" min="1" max="10" value={soreness}
                onChange={(e) => { setSoreness(parseInt(e.target.value)); setHasCheckedIn(true); }}
                className="premium-slider"
              />
              <span className="text-[9.5px] text-[#230c1e]/60 block">1: Fräsch i musklerna • 10: Mycket stel, öm eller ledvärk</span>
            </div>

            {/* Cramps / PMS */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-[#230c1e]">
                <span className="font-bold">4. Mensvärk / PMS-belastning 🌸</span>
                <span className="text-[#fd80ff] font-extrabold">{cramps} / 10</span>
              </div>
              <input 
                type="range" min="1" max="10" value={cramps}
                onChange={(e) => { setCramps(parseInt(e.target.value)); setHasCheckedIn(true); }}
                className="premium-slider"
              />
              <span className="text-[9.5px] text-[#230c1e]/60 block">1: Inga besvär • 10: Svåra kramper, hormonell sårbarhet</span>
            </div>
          </div>
        </div>

        {/* Dynamic Result Visualizer Right */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 space-y-6">
          
          {/* Glowing heart indicating score */}
          <div className="relative flex items-center justify-center">
            {/* Pulsating background ring */}
            <motion.div 
              animate={{ scale: [1, 1.06, 0.98, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute w-36 h-36 rounded-full opacity-10 filter blur-xl"
              style={{ backgroundColor: status.accent }}
            />
            
            {/* Heart container */}
            <div 
              className="w-32 h-32 rounded-full bg-white/70 backdrop-blur-md border border-white flex flex-col items-center justify-center shadow-lg relative z-10 transition-all duration-500"
              style={{ boxShadow: `0 10px 30px -10px ${status.accent}40` }}
            >
              <Heart 
                className="w-10 h-10 absolute opacity-10 transition-transform duration-500"
                style={{ color: status.accent, fill: `${status.accent}15`, transform: `scale(${1 + score/150})` }}
              />
              <span className="text-3xl font-serif font-black text-[#230c1e] relative z-10 leading-none">{score}%</span>
              <span className="text-[8px] font-sans font-bold tracking-widest text-[#230c1e]/60 mt-1 uppercase relative z-10">NERVSYSTEM</span>
            </div>
          </div>

          {/* Diagnosis details */}
          <div className="w-full text-center space-y-3.5">
            <div>
              <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-[#230c1e]/60 block">STATUS</span>
              <h4 className="font-serif text-lg font-bold text-[#230c1e] mt-0.5">
                {status.title}
              </h4>
            </div>

            <p className="text-xs sm:text-[13.5px] text-[#230c1e]/80 leading-relaxed font-sans font-light max-w-md mx-auto">
              {status.desc}
            </p>

            {/* Workout Adjustment Banner */}
            <div className={`p-4 rounded-2xl border text-left font-sans ${status.color} shadow-2xs`}>
              <div className="flex gap-2 items-start">
                <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: status.accent }} />
                <div>
                  <span className="block text-[9px] font-bold uppercase tracking-wider opacity-70">REKOMMENDERAD JUSTERING:</span>
                  <span className="block text-xs sm:text-[13px] font-bold leading-normal mt-0.5">{status.adjustment}</span>
                </div>
              </div>
            </div>

            {hasCheckedIn && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-1.5 text-[10px] font-sans text-emerald-600 font-bold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full w-fit mx-auto"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Incheckad! Information skickas till ditt träningsschema.</span>
              </motion.div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
