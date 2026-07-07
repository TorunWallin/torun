import React from "react";
import { ArrowLeft, ArrowRight, Play, Check, Heart, Sparkles, Activity } from "lucide-react";
import { motion } from "motion/react";
import { Package } from "../types";
import { getPackages } from "../data";
import torunDock from "../../assets/torun_dock.jpg";

interface ProgramsPageProps {
  onNavigate: (tabId: string) => void;
  onSelectPackage: (packageId: string) => void;
  language: "sv" | "en";
}

export default function ProgramsPage({ onNavigate, onSelectPackage, language }: ProgramsPageProps) {
  const packages = getPackages(language);

  React.useEffect(() => {
    const handleScrollToProgram = () => {
      const targetId = localStorage.getItem("torun_scroll_to_program");
      if (targetId) {
        localStorage.removeItem("torun_scroll_to_program");
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 150);
      }
    };

    handleScrollToProgram();
    window.addEventListener("torun-scroll-to-program-updated", handleScrollToProgram);
    return () => {
      window.removeEventListener("torun-scroll-to-program-updated", handleScrollToProgram);
    };
  }, []);

  // Framer motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Detailed descriptions for each package to give "längre förklaringar"
  const detailedDescriptions: Record<string, {
    targetGroup: string;
    philosophy: string;
    details: string[];
  }> = language === "sv" ? {
    kickstart: {
      targetGroup: "För dig som vill komma igång med träning på ett kravlöst, mjukt sätt efter ett uppehåll, eller som känner dig vilsen bland alla dieter och träningshets.",
      philosophy: "Här kastar vi ut all stress. Fokus ligger på att bygga en enkel vardagsrutin som känns rolig och hållbar, utan att hela ditt liv måste vändas upp och ner på en gång. Du får enkla, trygga baslyft och stöd att hitta tillbaka till rörelseglädje.",
      details: [
        "Kravlöst 4-veckors träningsprogram (anpassat för hemmet eller gymmet)",
        "Tydliga videoinstruktioner till varje enskild rörelse för full trygghet",
        "Enkla rutiner för sömn, andning och näringsrik mat utan förbud",
        "Full tillgång till ditt program i Everfit-appen under en hel månad",
        "Support via chatt där du kan ställa frågor och få stöd när du kör fast"
      ]
    },
    "stark-med-torun": {
      targetGroup: "För dig som vill bygga en stark, trygg och funktionell kropp långsiktigt, och lära dig anpassa träningen efter menscykeln, stress och hormonella livsfaser.",
      philosophy: "Detta är mitt mest populära medlemskapsprogram. Vi samarbetar med din kvinnliga biologi istället för att kämpa emot den. Jag justerar din träning och kost vecka för vecka utifrån din stress, sömn och var du befinner dig i din hormonella cykel.",
      details: [
        "Skräddarsytt träningsprogram som anpassas och justeras varje vecka",
        "Månadsvisa check-ins och samtal via video eller telefon för djupare avstämning",
        "Veckovisa skriftliga incheckningar där jag personligen ger feedback på din vecka",
        "Kostvägledning som stöttar din sköldkörtel och dina muskler (ingen kaloriräkning)",
        "Anpassning för menscykelns faser, perimenopaus, klimakteriet eller hög stress",
        "Löpande vardagssupport via chatten i Everfit-appen för frågor och peptalk"
      ]
    },
    "coaching-oneonone": {
      targetGroup: "För dig som vill göra ett djupt och livsförändrande skifte i din relation till din kropp, kost och mentala hälsa med dagligt stöd vid din sida.",
      philosophy: "Den ultimata omfamningen. Detta är mitt djupaste stöd för dig som är redo att göra arbetet på riktigt. Vi ses varje vecka i 1:1-videosamtal och hörs dagligen via chatten. Vi jobbar parallellt med träning, kost, hormonbalans, nervsystemsreglering och mental självkänsla.",
      details: [
        "Dagliga avstämningar och support via chatten varje vardag",
        "Veckovisa 1:1 coaching-samtal live via video (bara du och jag, 30-45 min)",
        "Helt individuellt kostschema och recept anpassade efter din kropps behov",
        "Mental coaching och samtalsstöd kring stress, kroppsbild och prestation",
        "Prioriterad hjälp, realtidsjusteringar av träningsprogram och schema",
        "Obegränsad tillgång till alla mina interaktiva verktyg och guider"
      ]
    },
    "medlemsportal-app": {
      targetGroup: "För dig som vill träna självständigt på dina egna villkor, men vill ha full tillgång till cykelsynkade verktyg, träningsbibliotek och stöttande recept i vardagen.",
      philosophy: "Här får du hela min digitala verktygslåda direkt i fickan. Inga dyra coachingsamtal – bara ren inspiration, kunskap och verktyg för att samarbeta med din kropp när det passar dig.",
      details: [
        "Full tillgång till receptdatabasen (Nourishment Vault) för menscykelns alla faser",
        "Träningsprogram för både hemmet och gymmet (självstudier)",
        "Interaktiva verktyg som Hormonkompassen och Dagsformshjulet direkt i mobilen",
        "Toruns egna mobilapp (under utveckling, lanseras inom kort!)",
        "Möjlighet att uppgradera till personlig coaching när du vill"
      ]
    }
  } : {
    kickstart: {
      targetGroup: "For those who want to get started with exercise in a gentle, stress-free way after a break, or feel lost among all diets and fitness trends.",
      philosophy: "Here we discard all stress. The focus is on building a simple daily routine that feels fun and sustainable, without turning your entire life upside down at once. You get simple, safe compound lifts and support to find your way back to the joy of movement.",
      details: [
        "Stress-free 4-week training program (adapted for home or gym)",
        "Clear video instructions for every movement for full safety",
        "Simple routines for sleep, breathing, and nutritious food without restriction",
        "Full access to your program in the Torun app (Everfit) for a whole month",
        "Support via chat where you can ask questions and get help when stuck"
      ]
    },
    "stark-med-torun": {
      targetGroup: "For those who want to build a strong, safe, and functional body long-term, and learn to adapt training to the menstrual cycle, stress, and hormonal life phases.",
      philosophy: "This is my most popular membership program. We cooperate with your female biology instead of fighting it. I adjust your training and nutrition week by week based on your stress, sleep, and where you are in your hormonal cycle.",
      details: [
        "Tailored training program that is adapted and adjusted weekly",
        "Monthly check-ins and calls via video or phone for deeper evaluation",
        "Weekly written check-ins where I personally give feedback on your week",
        "Nutrition guidance that supports your thyroid and muscles (no calorie counting)",
        "Adaptation for menstrual cycle phases, perimenopause, menopause, or high stress",
        "Ongoing daily support via chat in the Everfit app for questions and pep talk"
      ]
    },
    "coaching-oneonone": {
      targetGroup: "For those who want to make a deep and life-changing shift in their relationship with their body, diet, and mental health with daily support by their side.",
      philosophy: "The ultimate embrace. This is my deepest support for those ready to do the work for real. We meet weekly in 1:1 video calls and connect daily via chat. We work in parallel with training, nutrition, hormonal balance, nervous system regulation, and mental self-esteem.",
      details: [
        "Daily check-ins and support via chat every weekday",
        "Weekly 1:1 coaching calls live via video (just you and me, 30-45 min)",
        "Completely individual meal plan and recipes adapted to your body's needs",
        "Mental coaching and counseling support around stress, body image, and performance",
        "Prioritized help, real-time adjustments of training programs and schedule",
        "Unlimited access to all my interactive tools and guides"
      ]
    },
    "medlemsportal-app": {
      targetGroup: "For those who want to train independently on their own terms, but want full access to cycle-synced tools, exercise libraries, and supporting recipes in daily life.",
      philosophy: "Here you get my entire digital toolbox right in your pocket. No expensive coaching calls – just pure inspiration, knowledge, and tools to cooperate with your body when it suits you.",
      details: [
        "Full access to the recipe database (Nourishment Vault) for all phases of the cycle",
        "Training programs for both home and gym (self-study)",
        "Interactive tools like the Hormone Compass and Daily Form Wheel directly in your phone",
        "Torun's own mobile app (under development, launching soon!)",
        "Opportunity to upgrade to personal coaching whenever you want"
      ]
    }
  };

  const t = {
    sv: {
      backBtn: "Gå tillbaka till startsidan",
      tag: "COACHING & TRÄNINGSPROGRAM",
      title: "Mina program & vägar",
      subtitle: "Här hittar du mina coachingpaket och medlemskap. Jag stöttar dig att bygga en stark, trygg kropp som bär dig genom livet — helt utan hets, förbud eller kaloripiskor.",
      greetingTag: "En personlig hälsning",
      greetingQuote: '"Låt oss hitta den väg som stöttar ditt nervsystem bäst just nu."',
      greetingPara1: "I den här korta videon förklarar jag tanken bakom mina vägar. Styrketräning handlar inte om att straffa kroppen eller kompensera för vad du åt igår. Det handlar om att bygga en trygg boning att trivas och leva i.",
      greetingPara2: "Oavsett om du vill ha en snabb och enkel kickstart eller ett dagligt, djupgående samtals- och träningsstöd, så finns det en mjukare väg framåt för dig.",
      greetingSign: "Hjärtliga hälsningar,",
      popularBadge: "MEST POPULÄR",
      whoIsItFor: "Vem är det för?",
      philosophyHeader: "Filosofi",
      whatIncludes: "Vad som ingår i detalj:",
      videoNote: "Hör mig berätta om programmen ♡"
    },
    en: {
      backBtn: "Return to home page",
      tag: "COACHING & TRAINING PROGRAMS",
      title: "My Programs & Packages",
      subtitle: "Here you find my coaching packages and memberships. I support you to build a strong, secure body that carries you through life — completely without stress, prohibitions, or calorie starvation.",
      greetingTag: "A personal message",
      greetingQuote: '"Let us find the path that supports your nervous system best right now."',
      greetingPara1: "In this short video I explain the idea behind my programs. Strength training is not about punishing your body or compensating for what you ate yesterday. It is about building a secure place to live and thrive in.",
      greetingPara2: "Whether you want a quick and simple kickstart or a daily, in-depth coaching and training support, there is a gentler path forward for you.",
      greetingSign: "Warmest wishes,",
      popularBadge: "MOST POPULAR",
      whoIsItFor: "Who is it for?",
      philosophyHeader: "Philosophy",
      whatIncludes: "What is included in detail:",
      videoNote: "Hear me talk about the programs ♡"
    }
  }[language];

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      {/* Soft branding aurora blobs for background depth */}
      <div className="absolute top-[10%] left-[-10%] w-[40rem] h-[40rem] bg-[#fd80ff]/3 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[35rem] h-[35rem] bg-[#230c1e]/2 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Back navigation button */}
        <div className="mb-6 flex justify-start">
          <button 
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2.5 text-[10px] font-sans font-bold uppercase tracking-[0.16em] text-[#230c1e]/75 bg-white/70 backdrop-blur-md border border-white/85 shadow-xs px-4 py-2.5 rounded-full hover:bg-white hover:text-[#230c1e] hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer select-none"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#fd80ff] stroke-[2.5]" /> {t.backBtn}
          </button>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/80 p-6 sm:p-10 md:p-12 shadow-xs space-y-16"
        >
          {/* Header Introduction */}
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#fd80ff] uppercase block">
              {t.tag}
            </span>
            <h1 className="font-serif text-4xl sm:text-[54px] font-normal text-[#230c1e] tracking-wide leading-tight">
              {t.title}
            </h1>
            <p className="text-[#230c1e]/85 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-sans">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Interactive Video Explanation Section */}
          <motion.div variants={itemVariants} className="w-full">
            <div className="bg-white/75 backdrop-blur-md rounded-[2.5rem] border border-white/60 p-6 sm:p-10 shadow-[0_20px_50px_rgba(35,12,30,0.03)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
              {/* Decorative detail */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#fd80ff]/5 rounded-full filter blur-2xl pointer-events-none" />

              {/* Video Player */}
              <div className="lg:col-span-5 relative">
                <div className="absolute inset-0 border border-[#230c1e]/8 rounded-[2rem] translate-x-3 translate-y-3 -z-10" />
                <div className="bg-white rounded-[2rem] border border-[#f3ebf0] p-1.5 relative z-10 overflow-hidden shadow-md group">
                  <div className="aspect-[4/5] bg-[#1e151b] rounded-[1.8rem] overflow-hidden relative flex items-center justify-center">
                    <video 
                      id="program-page-video"
                      src="https://assets.mixkit.co/videos/preview/mixkit-woman-doing-yoga-in-a-park-34281-large.mp4"
                      className="w-full h-full object-cover"
                      loop
                      playsInline
                      controls
                      poster={torunDock}
                    />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center text-center p-4 transition-opacity group-hover:bg-black/35 pointer-events-none" id="program-video-overlay">
                      <div className="w-14 h-14 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-lg border border-[#fd80ff]/30 transform group-hover:scale-110 transition-all duration-300 pointer-events-auto cursor-pointer"
                           onClick={() => {
                             const vid = document.getElementById("program-page-video") as HTMLVideoElement;
                             const overlay = document.getElementById("program-video-overlay");
                             if (vid) {
                               vid.play();
                               if (overlay) overlay.style.opacity = "0";
                             }
                           }}
                      >
                        <Play className="w-4.5 h-4.5 text-[#fd80ff] fill-[#fd80ff] translate-x-0.5" />
                      </div>
                      <span className="text-[9px] text-white/95 uppercase font-sans font-bold tracking-widest mt-3">{t.videoNote}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Text Copy */}
              <div className="lg:col-span-7 space-y-5 text-left">
                <div className="inline-flex items-center gap-1.5 bg-[#FFF5FC] border border-[#fd80ff]/20 px-3 py-1.5 rounded-xl text-[#fd80ff] font-sans font-bold text-[9px] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> {t.greetingTag}
                </div>
                <h3 className="font-serif text-2xl sm:text-[28px] font-normal text-[#230c1e] tracking-wide leading-tight">
                  {t.greetingQuote}
                </h3>
                <div className="space-y-3 text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
                  <p>
                    {t.greetingPara1}
                  </p>
                  <p>
                    {t.greetingPara2}
                  </p>
                </div>
                <div className="pt-2 flex items-center gap-2 italic font-serif text-[#230c1e] text-sm">
                  <span>{t.greetingSign}</span>
                  <span className="font-signature text-[#fd80ff] text-[17px] sm:text-xl tracking-normal">Torun 🤍</span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Detailed Program Packages Loop */}
          <div className="space-y-12">
            {packages.filter((pkg) => pkg.id !== "medlemsportal-app").map((pkg: Package) => {
              const details = detailedDescriptions[pkg.id] || { targetGroup: "", philosophy: "", details: [] };
              const isRecommended = pkg.recommended;
              const isGreenButton = pkg.colorTheme === "sage";
              const buttonBgClass = isGreenButton 
                ? "bg-[#02473E] hover:bg-[#012d27] shadow-sm hover:shadow-md" 
                : "bg-[#fd80ff] hover:bg-[#eb5cf0] shadow-sm hover:shadow-md";

              return (
                <motion.div 
                  variants={itemVariants}
                  key={pkg.id}
                  id={pkg.id}
                  className={`bg-white rounded-[2.5rem] border p-8 sm:p-12 shadow-[0_15px_50px_-15px_rgba(35,12,30,0.03)] hover:shadow-[0_30px_60px_-15px_rgba(253,128,255,0.08)] relative overflow-hidden text-left transition-all duration-500 hover:-translate-y-1 hover:border-[#fd80ff]/30 ${
                    isRecommended ? "border-[#fd80ff]/25 ring-2 ring-[#fd80ff]/5" : "border-[#f3ebf0]"
                  }`}
                >
                  {/* Top Badge for Recommended Package */}
                  {isRecommended && (
                    <div className="absolute top-6 right-6 inline-flex items-center gap-1.5 bg-white/45 backdrop-blur-md text-[#fd80ff] border border-[#fd80ff]/55 px-3.5 py-1.5 rounded-full text-[9px] font-sans font-extrabold uppercase tracking-[0.16em] shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
                      <Sparkles className="w-3 h-3 text-[#fd80ff] stroke-[2]" /> {t.popularBadge}
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Header Package Name */}
                    <div className="space-y-2">
                      {pkg.badge && (
                        <div className="mb-2">
                          <span className="inline-flex items-center bg-white/45 backdrop-blur-md text-[#fd80ff] border border-[#fd80ff]/50 px-3.5 py-1.5 rounded-full text-[9px] font-sans font-extrabold uppercase tracking-[0.14em] shadow-[0_4px_12px_rgba(0,0,0,0.02)] leading-none">
                            {pkg.badge}
                          </span>
                        </div>
                      )}
                      <h3 className="font-serif text-3xl sm:text-[34px] font-normal text-[#230c1e] tracking-wide leading-tight">
                        {pkg.name}
                      </h3>
                      <p className="text-xs font-sans font-bold text-stone-400 tracking-wider uppercase">
                        {pkg.subtitle}
                      </p>
                    </div>

                    {/* Price Tag Box */}
                    <div className="bg-[#fcf7fa] rounded-2xl p-5 border border-[#f3ebf0] inline-block font-sans">
                      <div className="flex items-baseline gap-2">
                        {pkg.originalPrice && (
                          <span className="text-stone-400 line-through text-sm font-light">
                            {pkg.originalPrice}
                          </span>
                        )}
                        <span className="text-2xl sm:text-3xl font-black text-[#fd80ff] tracking-tight">
                          {pkg.price}
                        </span>
                        <span className="text-xs text-stone-500 font-medium lowercase tracking-normal">
                          {pkg.period}
                        </span>
                      </div>
                    </div>

                    {/* Detailed grids for Target Group & Philosophy */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 font-sans text-sm sm:text-base leading-relaxed border-t border-stone-100">
                      <div className="space-y-2.5">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.18em] text-[#230c1e]/50 flex items-center gap-2">
                          <Activity className="w-3.5 h-3.5 text-[#fd80ff]" /> {t.whoIsItFor}
                        </h4>
                        <p className="text-stone-600 leading-relaxed">
                          {details.targetGroup}
                        </p>
                      </div>
                      <div className="space-y-2.5">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.18em] text-[#230c1e]/50 flex items-center gap-2">
                          <Heart className="w-3.5 h-3.5 text-[#fd80ff] fill-[#fd80ff]/10" /> {t.philosophyHeader}
                        </h4>
                        <p className="text-stone-600 leading-relaxed">
                          {details.philosophy}
                        </p>
                      </div>
                    </div>

                    {/* Feature Details List */}
                    <div className="space-y-4 font-sans pt-6 border-t border-stone-100">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.18em] text-[#230c1e]/50">
                        {t.whatIncludes}
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5 text-sm sm:text-base text-stone-700">
                        {details.details.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="w-5.5 h-5.5 rounded-full bg-[#fd80ff]/10 border border-[#fd80ff]/15 flex items-center justify-center text-[#fd80ff] shrink-0 mt-0.5 shadow-2xs">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </span>
                            <span className="leading-relaxed">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 border-t border-stone-100 flex justify-center sm:justify-end w-full">
                      <button 
                        onClick={() => onSelectPackage(pkg.id)}
                        className={`group relative inline-flex items-center justify-center text-[16.5px] sm:text-[18.5px] font-serif font-normal tracking-wide px-12 py-4.5 rounded-full transition-all duration-300 ease-[0.16,1,0.3,1] cursor-pointer ${buttonBgClass} text-white border border-white/20 hover:-translate-y-0.5 active:scale-[0.98] select-none overflow-hidden w-full sm:w-auto`}
                      >
                        <span className="transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:-translate-x-2.5">
                          {pkg.buttonText}
                        </span>
                        <span className="absolute right-5 opacity-0 scale-50 translate-x-2 transition-all duration-300 ease-[0.16,1,0.3,1] group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 flex items-center justify-center">
                          <svg 
                            viewBox="0 0 24 24" 
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="w-3.5 h-3.5 text-white flex-shrink-0"
                          >
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                          </svg>
                        </span>
                      </button>
                    </div>

                  </div>
                </motion.div>
              );
            })}

            {/* Standalone card section for Medlemsportal & App */}
            {(() => {
              const appPkg = packages.find(p => p.id === "medlemsportal-app");
              if (!appPkg) return null;
              const details = detailedDescriptions[appPkg.id] || { targetGroup: "", philosophy: "", details: [] };
              return (
                <motion.div 
                  variants={itemVariants}
                  key={appPkg.id}
                  id={appPkg.id}
                  className="bg-gradient-to-br from-white via-[#fbf7f9] to-[#fff5fc] rounded-[2.5rem] border border-[#fd80ff]/25 p-8 sm:p-12 shadow-[0_15px_50px_-15px_rgba(253,128,255,0.04)] hover:shadow-[0_30px_60px_-15px_rgba(253,128,255,0.09)] hover:-translate-y-1 transition-all duration-500 relative overflow-hidden text-left"
                >
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#230c1e] via-[#fd80ff] to-[#f5c7fa]" />
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#fd80ff]/4 rounded-full filter blur-2xl pointer-events-none" />

                  <div className="space-y-6">
                    {/* Header Package Name */}
                    <div className="space-y-2">
                      {appPkg.badge && (
                        <span className="inline-flex items-center gap-1.5 bg-white/45 backdrop-blur-md text-[#fd80ff] border border-[#fd80ff]/50 px-3.5 py-2 rounded-full font-sans font-extrabold text-[9px] uppercase tracking-[0.12em] leading-none w-fit shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
                          {appPkg.badge}
                        </span>
                      )}
                      <h3 className="font-serif text-3xl sm:text-[34px] font-normal text-[#230c1e] tracking-wide leading-tight">
                        {appPkg.name}
                      </h3>
                      <p className="text-xs font-sans font-bold text-stone-400 tracking-wider uppercase">
                        {appPkg.subtitle}
                      </p>
                    </div>

                    {/* Price Tag Box */}
                    <div className="bg-[#fcf7fa] rounded-2xl p-5 border border-[#f3ebf0] inline-block font-sans">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-black text-[#fd80ff] tracking-tight">
                          {appPkg.price}
                        </span>
                        <span className="text-xs text-stone-500 font-medium lowercase tracking-normal">
                          {appPkg.period}
                        </span>
                      </div>
                    </div>

                    {/* Detailed grids for Target Group & Philosophy */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 font-sans text-sm sm:text-base leading-relaxed border-t border-stone-100">
                      <div className="space-y-2.5">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.18em] text-[#230c1e]/50 flex items-center gap-2">
                          <Activity className="w-3.5 h-3.5 text-[#fd80ff]" /> {t.whoIsItFor}
                        </h4>
                        <p className="text-stone-600 leading-relaxed">
                          {details.targetGroup}
                        </p>
                      </div>
                      <div className="space-y-2.5">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.18em] text-[#230c1e]/50 flex items-center gap-2">
                          <Heart className="w-3.5 h-3.5 text-[#fd80ff] fill-[#fd80ff]/10" /> {t.philosophyHeader}
                        </h4>
                        <p className="text-stone-600 leading-relaxed">
                          {details.philosophy}
                        </p>
                      </div>
                    </div>

                    {/* Feature Details List */}
                    <div className="space-y-4 font-sans pt-6 border-t border-stone-100">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.18em] text-[#230c1e]/50 font-sans">
                        {t.whatIncludes}
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5 text-sm sm:text-base text-stone-700">
                        {details.details.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="w-5.5 h-5.5 rounded-full bg-[#fd80ff]/10 border border-[#fd80ff]/15 flex items-center justify-center text-[#fd80ff] shrink-0 mt-0.5 shadow-2xs">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </span>
                            <span className="leading-relaxed">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 border-t border-stone-100 flex justify-center sm:justify-end w-full">
                      <button 
                        onClick={() => onSelectPackage(appPkg.id)}
                        className="group relative inline-flex items-center justify-center text-[16.5px] sm:text-[18.5px] font-serif font-normal tracking-wide px-12 py-4.5 rounded-full transition-all duration-300 ease-[0.16,1,0.3,1] cursor-pointer bg-[#02473E] hover:bg-[#012d27] text-white border border-white/20 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] select-none overflow-hidden w-full sm:w-auto"
                      >
                        <span className="transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:-translate-x-2.5">
                          {appPkg.buttonText}
                        </span>
                        <span className="absolute right-5 opacity-0 scale-50 translate-x-2 transition-all duration-300 ease-[0.16,1,0.3,1] group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 flex items-center justify-center">
                          <svg 
                            viewBox="0 0 24 24" 
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="w-3.5 h-3.5 text-white flex-shrink-0"
                          >
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                          </svg>
                        </span>
                      </button>
                    </div>

                  </div>
                </motion.div>
              );
            })()}
          </div>

        </motion.div>

      </div>
    </div>
  );
}
