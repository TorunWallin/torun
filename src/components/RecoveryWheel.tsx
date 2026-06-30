import React, { useState } from "react";
import { Heart, Activity, Sliders, ShieldAlert, Sparkles, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface RecoveryWheelProps {
  language: "sv" | "en";
}

export default function RecoveryWheel({ language }: RecoveryWheelProps) {
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

  const t = {
    sv: {
      headerTitle: "Nervsystemsbalans & Dagsformshjul",
      headerSub: "Din kropp är inte en maskin som ska piskas. Checka in med ditt nervsystem nedan för att få en skräddarsydd och biologiskt sund träningsjustering baserat på din dagsform.",
      indicators: "DINA BIOLOGISKA INDIKATORER",
      indicator1: "1. Sömnkvalitet 🌙",
      indicator1Desc: "1: Sömnlös, orolig natt • 10: Djup, stärkande sömn",
      indicator2: "2. Mental stress & krav 🧠",
      indicator2Desc: "1: Helt lugn i själen • 10: Hög puls, mycket stress / måsten",
      indicator3: "3. Träningsvärk & ledömhet 💪",
      indicator3Desc: "1: Fräsch i musklerna • 10: Mycket stel, öm eller ledvärk",
      indicator4: "4. Mensvärk / PMS-belastning 🌸",
      indicator4Desc: "1: Helt smärtfri/stabil • 10: Kraftig smärta, kramper eller hög PMS",
      checkedIn: "DAGSFORMEN RAPPORTERAD ✓",
      resultTitle: "DITT SYSTEMSTATUSVÄRDE",
      recTitle: "COACH TORUNS REKOMMENDATION:",
      adjTitle: "BIOLOGISK JUSTERING:"
    },
    en: {
      headerTitle: "Nervous System Balance & Daily Form Wheel",
      headerSub: "Your body is not a machine to be whipped. Check in with your nervous system below to get a customized and biologically sound training adjustment based on your daily form.",
      indicators: "YOUR BIOLOGICAL INDICATORS",
      indicator1: "1. Sleep Quality 🌙",
      indicator1Desc: "1: Sleepless, restless night • 10: Deep, restorative sleep",
      indicator2: "2. Mental Stress & Demands 🧠",
      indicator2Desc: "1: Completely calm in your soul • 10: High heart rate, high stress / tasks",
      indicator3: "3. Muscle Soreness & Joint Pain 💪",
      indicator3Desc: "1: Fresh in muscles • 10: Very stiff, sore, or joint pain",
      indicator4: "4. Period Pain / PMS Load 🌸",
      indicator4Desc: "1: Zero pain or PMS • 10: Heavy cramps, fatigue, high PMS weight",
      checkedIn: "DAILY FORM LOGGED ✓",
      resultTitle: "YOUR SYSTEM BALANCE SCORE",
      recTitle: "COACH TORUN'S RECOMMENDATION:",
      adjTitle: "BIOLOGICAL ADJUSTMENT:"
    }
  }[language];

  const getStatus = (val: number) => {
    if (language === "sv") {
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
    } else {
      if (val >= 80) {
        return {
          title: "Hormonal Homeostasis & Peak Performance Capacity",
          color: "text-emerald-700 bg-emerald-50 border-emerald-200",
          accent: "#10b981",
          desc: "Your nervous system exhibits strong parasympathetical tone and optimal recovery. Sex hormones and cortisol responses are in complete harmony, yielding high stress resilience, excellent insulin sensitivity, and peak neuromuscular recruitment. This is a perfect physiological opportunity for progressive overload, explosiveness, and heavy compound lifts. Your body is ready to be loaded!",
          adjustment: "100% Capacity: Train according to your primary strength routine. Challenge yourself in heavy sets with perfect form."
        };
      } else if (val >= 50) {
        return {
          title: "Moderate Systemic Load (Daily form adjustment recommended)",
          color: "text-[#230c1e] bg-[#fff5fc]/60 border-[#fd80ff]/15",
          accent: "#fd80ff",
          desc: "Your nervous system is in functional balance, but indicates mild accumulated fatigue, early muscle breakdown (soreness), or elevated cognitive cortisol. Your glycogen synthesis and recovery speed are slightly reduced. Strength training is still highly beneficial, but prioritize movement quality over exhaustion. Extend rest between sets by 30 seconds for complete ATP recovery.",
          adjustment: "Compensate for the load: Keep training weights but reduce volume by cutting the last repetition on each set. Completely avoid training to failure."
        };
      } else {
        return {
          title: "Sympathetic Dominance & Drained Reserves",
          color: "text-amber-800 bg-amber-50/70 border-amber-200",
          accent: "#f59e0b",
          desc: "Your system shows signs of acute stress load (sympathetic dominance). With elevated cortisol levels and reduced sleep quality, your body is in a catabolic (breakdown) phase. Subjecting the body to heavy lifts or hard cardiovascular training now will inhibit thyroid function (conversion of T4 to active T3), increase muscle breakdown, and work against your goals. Give your body safety to lower stress.",
          adjustment: "Nervous System Regulation: Swap the strength session for 20 minutes of yin yoga, mobility work, or a gentle walk. Your rest builds your strength ♡"
        };
      }
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
        <h3 className="font-display text-2xl sm:text-3xl font-normal tracking-tight text-center">
          {t.headerTitle}
        </h3>
        <p className="text-xs sm:text-sm text-[#230c1e]/75 font-sans font-light text-center">
          {t.headerSub}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Sliders Control Panel Left */}
        <div className="lg:col-span-6 space-y-5 bg-white/20 p-6 rounded-3xl border border-white/40 shadow-xs font-sans text-left">
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#230c1e]/60 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5" /> {t.indicators}
          </span>

          <div className="space-y-4">
            {/* Sleep Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-[#230c1e]">
                <span className="font-bold">{t.indicator1}</span>
                <span className="text-[#fd80ff] font-extrabold">{sleep} / 10</span>
              </div>
              <input 
                type="range" min="1" max="10" value={sleep}
                onChange={(e) => { setSleep(parseInt(e.target.value)); setHasCheckedIn(true); }}
                className="premium-slider"
              />
              <span className="text-[9.5px] text-[#230c1e]/60 block">{t.indicator1Desc}</span>
            </div>

            {/* Stress Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-[#230c1e]">
                <span className="font-bold">{t.indicator2}</span>
                <span className="text-[#fd80ff] font-extrabold">{stress} / 10</span>
              </div>
              <input 
                type="range" min="1" max="10" value={stress}
                onChange={(e) => { setStress(parseInt(e.target.value)); setHasCheckedIn(true); }}
                className="premium-slider"
              />
              <span className="text-[9.5px] text-[#230c1e]/60 block">{t.indicator2Desc}</span>
            </div>

            {/* Muscle Soreness */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-[#230c1e]">
                <span className="font-bold">{t.indicator3}</span>
                <span className="text-[#fd80ff] font-extrabold">{soreness} / 10</span>
              </div>
              <input 
                type="range" min="1" max="10" value={soreness}
                onChange={(e) => { setSoreness(parseInt(e.target.value)); setHasCheckedIn(true); }}
                className="premium-slider"
              />
              <span className="text-[9.5px] text-[#230c1e]/60 block">{t.indicator3Desc}</span>
            </div>

            {/* Cramps / PMS */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-[#230c1e]">
                <span className="font-bold">{t.indicator4}</span>
                <span className="text-[#fd80ff] font-extrabold">{cramps} / 10</span>
              </div>
              <input 
                type="range" min="1" max="10" value={cramps}
                onChange={(e) => { setCramps(parseInt(e.target.value)); setHasCheckedIn(true); }}
                className="premium-slider"
              />
              <span className="text-[9.5px] text-[#230c1e]/60 block">{t.indicator4Desc}</span>
            </div>
          </div>
        </div>

        {/* Results Panel Right */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white/40 border border-white/60 p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm relative overflow-hidden">
            
            {/* Visual Indicator of Check-in */}
            {hasCheckedIn && (
              <span className="absolute top-4 right-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 leading-none">
                <Check className="w-2.5 h-2.5" /> {t.checkedIn}
              </span>
            )}

            {/* Balance Score Display */}
            <div className="text-center space-y-2">
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#230c1e]/60 block">{t.resultTitle}</span>
              <div className="relative inline-block">
                <span className="text-5xl sm:text-6xl font-serif font-black text-[#230c1e] tracking-tight">{score}</span>
                <span className="text-sm font-sans font-bold text-[#fd80ff]/95 absolute -top-1 -right-4">%</span>
              </div>
              
              {/* Dynamic Progress line */}
              <div className="w-32 bg-stone-100 h-1.5 rounded-full mx-auto overflow-hidden border border-stone-200/40 relative mt-1">
                <div 
                  className="h-full rounded-full transition-all duration-500" 
                  style={{ 
                    width: `${score}%`,
                    backgroundColor: status.accent 
                  }} 
                />
              </div>
            </div>

            {/* Text description */}
            <div className="space-y-4 text-left font-sans">
              <div className="space-y-1">
                <span className="text-[8px] uppercase tracking-wider font-bold text-[#230c1e]/50 block">{t.recTitle}</span>
                <h4 className="text-xs sm:text-sm font-black text-[#230c1e] leading-snug">
                  {status.title}
                </h4>
                <p className="text-xs sm:text-[13px] text-[#230c1e]/80 leading-relaxed font-light mt-1.5">
                  {status.desc}
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${status.color} space-y-1.5`}>
                <span className="text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5">
                  {score < 50 ? <ShieldAlert className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                  {t.adjTitle}
                </span>
                <p className="text-xs sm:text-[12.5px] leading-relaxed font-semibold">
                  {status.adjustment}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
