import React, { useState, useEffect } from "react";
import { 
  Heart, ShieldCheck, Activity, Soup, Calendar, 
  ArrowRight, Sparkles, BookOpen, User, Star, 
  Check, Quote, HelpCircle, Eye, ChevronRight, Bell, Zap, Compass, ArrowUp
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { packages, testimonials, articles } from "../data";
import { Package, Testimonial, Article } from "../types";
import CycleCompass from "./CycleCompass";
import RecoveryWheel from "./RecoveryWheel";
import NourishmentVault from "./NourishmentVault";
import torunMeadow from "../../assets/torun_meadow.jpg";
import torunAppPreview from "../../assets/torun_app_preview.png";

interface LandingPageProps {
  onNavigate: (tabId: string) => void;
  onSelectPackage: (packageId: string) => void;
}

export default function LandingPage({ onNavigate, onSelectPackage }: LandingPageProps) {
  // Framer Motion Scroll Parallax Hook
  const { scrollY, scrollYProgress } = useScroll();
  
  // Parallax ranges for Hero section
  const heroBgY = useTransform(scrollY, [0, 800], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const floatingY1 = useTransform(scrollY, [0, 800], [0, -100]);
  const floatingY2 = useTransform(scrollY, [0, 800], [0, 80]);
  const textParallaxY = useTransform(scrollY, [0, 800], [0, 35]);
  const cardParallaxY = useTransform(scrollY, [0, 800], [0, -20]);

  // Navigation & filtering states
  const [selectedPillar, setSelectedPillar] = useState<string>("stark-inifran");
  const [activeTestimonialTag, setActiveTestimonialTag] = useState<string>("Alla");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Active interactive tool dashboard tab
  const [activeTool, setActiveTool] = useState<"compass" | "wheel" | "vault">("compass");

  // Listen to navigation-initiated tool tab updates
  useEffect(() => {
    const handleActiveToolTabUpdate = () => {
      const activeTab = localStorage.getItem("torun_active_tool_tab");
      if (activeTab === "cycle-sync-compass") {
        setActiveTool("compass");
      } else if (activeTab === "dagsforms-hjul") {
        setActiveTool("wheel");
      } else if (activeTab === "recept-valv") {
        setActiveTool("vault");
      }
    };
    window.addEventListener("torun-active-tool-tab-updated", handleActiveToolTabUpdate);
    return () => {
      window.removeEventListener("torun-active-tool-tab-updated", handleActiveToolTabUpdate);
    };
  }, []);

  // Scroll tracker past the hero section
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic Matchmaking tool state
  const [userNeeds, setUserNeeds] = useState({
    wantsWeeklyCalls: false,
    needsCycleSync: false,
    under23: false,
    exhausted: false,
  });

  const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState<boolean>(false);

  // Pillars content
  const pillars = [
    {
      id: "stark-inifran",
      title: "Stark inifrån",
      tagline: "Relationen till dig själv",
      icon: ShieldCheck,
      color: "text-[#fd80ff] bg-[#fff5fc] border-[#fd80ff]/20",
      accent: "#fd80ff",
      description: "När du blir stark förändras din relation till dig själv. Inte för att du ser annorlunda ut i spegeln – utan för att du känner dig annorlunda. Du tar plats. Du litar på din kropp. Du upptäcker att du klarar saker du aldrig trodde var möjliga.",
      extended: "Det här handlar om mer än muskelmassa – det handlar om att hitta en inre säkerhet och kapacitet som bär dig genom hela din vardag och livets skiftningar med absolut mjukhet."
    },
    {
      id: "ata-for-att-prestera",
      title: "Äta för att prestera",
      tagline: "Mata din kropp för att blomstra",
      icon: Soup,
      color: "text-[#230c1e] bg-[#fff5fc] border-[#f5c7fa]/50",
      accent: "#230c1e",
      description: "Mat är inte fienden. Mat är inte en belöning. Mat är bränslet som låter din kropp göra det den är skapad för. Här lär du dig att äta för att blomstra — inte för att krympa.",
      extended: "Jag kastar bort daterade kaloripiskor och stela dieter. Jag lär dig att ge din sköldkörtel och dina muskler den näring de förtjänar för att hålla din energi, ditt humör och din hormonbalans i balans."
    },
    {
      id: "hjartat-forst",
      title: "Hjärtat först",
      tagline: "Hälsa som läker, utan hets",
      icon: Heart,
      color: "text-[#fd80ff] bg-[#fff5fc] border-[#fd80ff]/20",
      accent: "#fd80ff",
      description: "Jag börjar med relationen — till träning, mat, kropp och dig själv. För när hjärtat är på rätt plats blir resten av resan så mycket mjukare. Det här är hälsa som läker, inte håller dig kvar i kontrollen.",
      extended: "Hjärtat först är din inbjudan till att träna i samarbete med ditt nervsystem. Jag anpassar kraven och intensiteten efter din dagsform så att du bygger upp din styrka utan att bränna ut dig."
    }
  ];

  // Testimonial Filters
  const testimonialTags = ["Alla", "Nervsystem", "Hormonbalans", "Klimakteriet", "Träningsglädje", "Äta för att prestera"];

  const filteredTestimonials = testimonials.filter(t => {
    if (activeTestimonialTag === "Alla") return true;
    return t.tags.includes(activeTestimonialTag);
  });

  const getRecommendedPackage = () => {
    if (userNeeds.wantsWeeklyCalls) return "coaching-oneonone";
    return "stark-med-torun"; // default popular
  };

  const currentRecommendationId = getRecommendedPackage();

  // Framer Motion presets for calm, luxurious, and gentle scroll-triggered entries
  const fUpVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.985 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const fLeftVariants = {
    hidden: { opacity: 0, x: -35, scale: 0.99 },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const fRightVariants = {
    hidden: { opacity: 0, x: 35, scale: 0.99 },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.04
      }
    }
  };

  return (
    <div className="animated-aurora-bg text-[#230c1e] min-h-screen relative font-sans font-sans" id="landing-page-root">
      
      {/* Luminous Scrolling Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#fd80ff] via-[#eb5cf0] to-[#02473E] z-[100] origin-left pointer-events-none shadow-[0_2px_10px_rgba(253,128,255,0.4)]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* REVOLUTIONARY GLASSMORPHIC HERO SECTION */}
      <section className="relative min-h-[96vh] lg:min-h-[100vh] flex items-center justify-center pt-36 pb-20 lg:pt-44 lg:pb-28 px-4 sm:px-6 lg:px-8 border-b border-[#fd80ff]/15 bg-gradient-to-tr from-[#FFF3FA] via-[#FAF8F5] to-[#F1EEFC] overflow-hidden" id="hero-section">
        
        {/* Large Scale Full-bleed Premium Background Image with Parallax Depth */}
        <motion.div style={{ y: heroBgY }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1920&q=80" 
            alt="Soft morning yoga stretching in warm light" 
            className="w-full h-full object-cover object-center lg:object-[72%_center] scale-102 select-none pointer-events-none opacity-15 mix-blend-multiply"
            referrerPolicy="no-referrer"
          />
          {/* Glassmorphic & Warm Aesthetic Color Grading Filters */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFF5FB]/40 to-[#FFF5FB]/80 z-10" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#fd80ff]/5 via-transparent to-[#f5c7fa]/5 z-15 mix-blend-overlay" />
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#FFF5FB]/40 via-transparent to-transparent z-10" />
        </motion.div>

        {/* Floating Abstract Pastel Glows & Romantic Parallax Blobs */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {/* Pulsating rose-water sphere */}
          <motion.div 
            animate={{ 
              opacity: [0.5, 0.7, 0.5],
              x: [0, 30, -20, 0],
              y: [0, -40, 20, 0],
              scale: [1, 1.1, 0.9, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "easeInOut"
            }}
            className="absolute top-[18%] left-[12%] w-80 h-80 rounded-full bg-gradient-to-tr from-[#f5c7fa]/20 via-[#fd80ff]/8 to-transparent filter blur-2xl opacity-70 pointer-events-none"
          />
          {/* Pulsating champagne-glow sphere */}
          <motion.div 
            animate={{ 
              opacity: [0.55, 0.75, 0.55],
              x: [0, -35, 25, 0],
              y: [0, 45, -30, 0],
              scale: [1, 0.9, 1.1, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-gradient-to-bl from-[#230c1e]/6 via-[#f5c7fa]/15 to-transparent filter blur-2xl opacity-75 pointer-events-none"
          />

          {/* Floating Bow and Blossom symbols representing raw kindness & cozy aesthetics */}
          <motion.div 
            style={{ y: floatingY1 }}
            animate={{ rotate: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute top-[20%] right-[25%] pointer-events-none text-[#fd80ff]/60 text-4xl hidden md:block"
          >
            🎀
          </motion.div>
          <motion.div 
            style={{ y: floatingY2 }}
            animate={{ rotate: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[25%] left-[8%] pointer-events-none text-[#fd80ff]/40 text-5xl hidden lg:block"
          >
            🌸
          </motion.div>
        </div>

        {/* Foreground Content Grid */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-20">
          
          <motion.div 
            style={{ y: textParallaxY, opacity: heroOpacity }}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-6 lg:col-start-2 space-y-4 text-left"
          >
            {/* Elegant luxury badge in warm satin white & rose petals */}
            <motion.div 
              variants={fUpVariants}
              className="inline-flex items-center gap-2 bg-[#fff5fa]/90 hover:bg-white text-[#230c1e] border border-pink-200/80 px-4.5 py-1.5 rounded-full text-xs font-semibold tracking-[0.16em] uppercase backdrop-blur-md transition-all shadow-[0_4px_20px_rgba(219,101,162,0.03)] cursor-default"
            >
              <span className="w-1 h-1 rounded-full bg-[#fd80ff]" />
              <span className="font-sans text-xs tracking-[0.12em] font-extrabold text-[#fd80ff]">✦ FITNESSCOACH För tjejer & kvinnor</span>
              <span className="w-1 h-1 rounded-full bg-[#fd80ff]" />
            </motion.div>
            
            {/* Elegant Boutique Typography pairing Cormorant Garamond display and italic serif */}
            <motion.h1 
              variants={fUpVariants}
              className="font-display text-4xl sm:text-5xl lg:text-[56px] font-normal tracking-tight text-[#230c1e] leading-[1.15] sm:leading-[1.05]"
            >
              Du behöver inte{" "}
              <span className="font-script text-[#fd80ff]/95 text-3xl sm:text-4xl lg:text-[40px] inline-block mx-1 tracking-normal lowercase align-middle">förtjäna</span> <br />
              din egen kropp.
            </motion.h1>
            
            <div className="space-y-2.5">
              <motion.p 
                variants={fUpVariants}
                className="text-lg sm:text-xl font-sans font-semibold text-[#230c1e] leading-relaxed max-w-xl"
              >
                Styrketräning och coaching för kvinnor som vill må bra på riktigt — genom styrka, energi och en kropp som bär dem genom livet.
              </motion.p>
              
              <motion.p 
                variants={fUpVariants}
                className="text-sm sm:text-base text-[#230c1e]/80 font-normal leading-relaxed max-w-xl font-sans"
              >
                För dig som tränat för att straffa, ätit för att kompensera eller tappat bort känslan av att vara på samma lag som din kropp. Här finns en mjukare väg framåt. En plats där du får bygga styrka, skapa hållbara vanor och må bra utan att din relation till kroppen tar över hela ditt liv.
              </motion.p>
            </div>

            {/* Premium Feminine CTA Buttons */}
            <motion.div 
              variants={fUpVariants}
              className="flex flex-col sm:flex-row gap-3 pt-0"
            >
              <button
                onClick={() => onNavigate("startguide")}
                className="group relative inline-flex items-center justify-center text-xs font-sans font-black uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-300 ease-[0.16,1,0.3,1] bg-[#fd80ff] hover:bg-[#eb5cf0] text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.01] cursor-pointer overflow-hidden"
                id="hero-cta-primary"
              >
                <span className="transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:-translate-x-2.5">
                  Hämta din 7-dagars startguide
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
              
              <button
                onClick={() => onNavigate("programs")}
                className="group relative inline-flex items-center justify-center text-xs font-sans font-black uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-300 ease-[0.16,1,0.3,1] backdrop-blur-md bg-[#230c1e]/5 hover:bg-[#230c1e]/10 border border-[#230c1e]/10 shadow-[0_6px_15px_-8px_rgba(0,0,0,0.05)] text-[#230c1e] hover:-translate-y-0.5 cursor-pointer overflow-hidden"
                id="hero-cta-secondary"
              >
                <span className="transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:-translate-x-2">
                  Utforska programmen
                </span>
                <span className="absolute right-5 opacity-0 scale-50 translate-x-2 transition-all duration-300 ease-[0.16,1,0.3,1] group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-[#230c1e] flex-shrink-0" />
                </span>
              </button>
            </motion.div>

            {/* Soft grid of kind philosophy notes (Polished, centered layout) */}
            <motion.div 
              variants={fUpVariants}
              className="grid grid-cols-3 divide-x divide-pink-100 p-2.5 rounded-xl bg-white border border-pink-100/50 shadow-[0_12px_30px_rgba(35,12,30,0.02)] w-full max-w-md font-sans"
            >
              <div className="flex flex-col items-center justify-center px-1 text-center space-y-0.5">
                <span className="text-2xl font-serif font-bold text-[#fd80ff] leading-none">0%</span>
                <span className="text-[9px] uppercase tracking-wider text-stone-500 font-extrabold block leading-normal">Krav & Hets</span>
              </div>
              <div className="flex flex-col items-center justify-center px-1 text-center space-y-0.5">
                <span className="text-lg font-serif font-bold text-[#fd80ff] leading-none">Synkad</span>
                <span className="text-[9px] uppercase tracking-wider text-stone-500 font-extrabold block leading-normal">Efter menscykel</span>
              </div>
              <div className="flex flex-col items-center justify-center px-1 text-center space-y-0.5">
                <span className="text-lg font-serif font-bold text-[#230c1e] leading-none">Mjuk</span>
                <span className="text-[9px] uppercase tracking-wider text-stone-500 font-extrabold block leading-normal">Återhämtning</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Majestic Interactive Visual Stage (Glassmorphism & scrapbook style) */}
          <motion.div 
            style={{ y: cardParallaxY, opacity: heroOpacity }}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            {/* Centered relative wrapper to anchor floating capsules to the card edge */}
            <div className="relative w-full max-w-[330px]" id="hero-interactive-stage">
              {/* Extremely luxurious Solid White Card containing Torun's philosophy to prevent overlapping silhouettes */}
              <motion.div 
                whileHover={{ y: -5, scale: 1.015, rotate: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-full rounded-[1.75rem] bg-gradient-to-tr from-white to-[#f5c7fa]/40 p-[1.5px] shadow-[0_30px_70px_-15px_rgba(219,101,162,0.12),inset_0_4px_30px_rgba(255,255,255,0.9)] relative overflow-hidden group border border-white/40 cursor-default" 
                id="hero-philosophy-card"
              >
                <div className="absolute inset-0 bg-white rounded-[1.75rem] -z-10" />
                
                <div className="min-h-[380px] lg:min-h-[390px] w-full rounded-[1.65rem] bg-white overflow-hidden relative flex flex-col justify-between p-5 border border-white/80 shadow-inner">
                  
                  <div className="flex justify-between items-center">
                    <div className="w-10 h-10 rounded-full bg-[#FFF5FB]/90 backdrop-blur-md flex items-center justify-center border border-pink-100 shadow-sm">
                      <Heart className="w-5 h-5 text-[#fd80ff] fill-[#fd80ff]/10" />
                    </div>
                    <span className="text-[10px] font-sans text-[#fd80ff] bg-white border border-pink-100 px-3.5 py-1 rounded-full uppercase tracking-widest font-extrabold flex items-center gap-1.5 shadow-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#fd80ff] animate-ping" />
                      Personligt & Tryggt ♡
                    </span>
                  </div>

                  <div className="my-auto py-2.5 space-y-3.5">
                    <span className="text-[10px] uppercase font-sans tracking-widest font-black text-[#fd80ff] block">
                      Min filosofi
                    </span>
                    <blockquote className="font-serif text-lg sm:text-lg lg:text-[19px] text-[#230c1e] italic leading-relaxed tracking-tight font-normal">
                      "Jag vill ge dig verktygen att älska din unika kropps fantastiska intelligens. Du tränar inte för att bli mindre – du tränar för att ta <span className="text-[#fd80ff] underline decoration-[#f5c7fa] decoration-2 underline-offset-4 font-semibold">mer plats</span>."
                    </blockquote>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-current text-[#fd80ff]" />
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto border-t border-[#f5c7fa]/30 pt-3 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#230c1e] to-[#fd80ff] overflow-hidden flex items-center justify-center text-white border border-white shadow-md">
                      <span className="font-serif text-xs font-bold italic">tw</span>
                    </div>
                    <div>
                      <span className="block font-signature text-sm text-[#fd80ff] tracking-normal leading-none mb-1.5">Torun Wallin</span>
                      <span className="block text-[10px] font-sans text-stone-500 uppercase tracking-widest leading-none mt-0.5">Lic. PT (Mamma- & Gravidtränare)</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Solid White Floating Capsule 1 (Left bottom) */}
              <motion.div 
                style={{ y: floatingY1 }}
                whileHover={{ scale: 1.05, rotate: -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="absolute -bottom-14 left-2 sm:-bottom-16 sm:left-4 md:-bottom-10 md:-left-12 lg:-left-16 lg:-bottom-8 bg-white text-stone-800 px-4 py-3 rounded-2xl shadow-[0_15px_30px_rgba(219,101,162,0.08)] hover:shadow-[0_20px_40px_rgba(219,101,162,0.14)] border border-pink-100/80 text-[10.5px] max-w-[170px] sm:max-w-[185px] space-y-0.5 z-15 transition-shadow duration-300 cursor-default"
                id="hero-floating-capsule-1"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">🌸</span>
                  <p className="font-bold uppercase tracking-widest text-[8px] text-[#fd80ff]">Cykel-Synk</p>
                </div>
                <p className="text-[#230c1e] leading-snug font-medium font-sans">Synkronisera intensiteten enkelt med alla mensens 4 faser.</p>
              </motion.div>

              {/* Solid White Floating Capsule 2 (Right top) */}
              <motion.div 
                style={{ y: floatingY2 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="absolute -top-8 right-2 sm:-top-10 sm:right-4 md:-top-4 md:-right-12 lg:-right-16 lg:-top-8 bg-white shadow-[0_15px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-pink-100/80 max-w-[155px] p-3 rounded-2xl space-y-1 z-15 transition-shadow duration-300 cursor-default"
                id="hero-floating-capsule-2"
              >
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#fd80ff] animate-pulse" />
                  <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-[#fd80ff]">ÖPPET FÖR INTAG</span>
                </div>
                <p className="text-xs font-extrabold text-[#230c1e] leading-snug">Hitta din plats 🎀</p>
                <p className="text-[10px] text-[#230c1e]/75 leading-snug font-medium">Börja när du känner dig redo ♡</p>
              </motion.div>
            </div>

          </motion.div>
          </div>
        </section>

      {/* STANDALONE HERO TESTIMONIAL SECTION */}
      <section className="bg-[#02473E] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="hero-testimonial-section">
        {/* Soft glowing spots in the background */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#fd80ff]/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
          {/* Centered large quotation mark (elegant serif style) */}
          <div className="text-6xl sm:text-7xl font-serif text-[#fd80ff] leading-none select-none mb-3">
            “
          </div>

          {/* Centered elegant quote in serif font */}
          <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white/90 leading-relaxed tracking-tight max-w-4xl font-light">
            "Hoppade av min pulsklocka, tog ett djupt andetag och började lyfta på kroppens villkor. PMS-ledvärken och sömnsvårigheterna är <span className="italic font-medium text-[#fd80ff]">äntligen borta!</span>"
          </blockquote>

          {/* Centered author attribution */}
          <p className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-white/50 mt-8">
            Hanna, varm medlem sedan 2024
          </p>
        </div>
      </section>

      {/* 1.5 VARFÖR VÄLJA EN MJUKARE VÄG (KÄRNAN) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]" id="why-softer-way">
        <div className="max-w-7xl mx-auto space-y-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fUpVariants}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <span className="text-xs font-sans font-medium tracking-[0.22em] text-[#fd80ff] uppercase block">
              KÄRNAN I MIN COACHNING
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-light text-[#230c1e] tracking-tight">
              Varför välja en mjukare väg?
            </h2>
            <p className="text-[#230c1e]/80 text-sm sm:text-base font-sans leading-relaxed max-w-xl mx-auto font-light">
              Jag vägrar att klämma in din unika fysiologi i stela, daterade mallar. Här är grundpelarna för att bygga en kropp som samarbetar med dig.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          >
            {[
              {
                title: "Styrka är medicinen",
                desc: "Träning handlar inte om att straffa kroppen eller krympa dig själv. Det handlar om att bygga en stark, trygg kropp som bär dig genom hela livet — på dina egna villkor, helt utan hets, skam eller förbjudna livsmedel.",
                icon: "✦"
              },
              {
                title: "Cykel-synk & Nervsystem",
                desc: "Jag anpassar rörelserna, näringen och vilan efter ditt nervsystems biologiska röst och din menscykels naturliga skiftningar. Istället för allt-eller-inget lär du dig träna i samarbete med kroppen – aldrig någonsin emot den.",
                icon: "✦"
              },
              {
                title: "Vetenskapligt & tryggt",
                desc: "Med djup biologisk förståelse för kvinnans fysiologi (stress, hormoner, graviditet och återhämtning) skapar jag vanor som faktiskt fungerar i ditt riktiga vardagsliv. Träning som ger energi, och mat som ger kraft.",
                icon: "✦"
              }
            ].map((item, index) => (
              <motion.div
                variants={fUpVariants}
                key={index}
                className="bg-white/45 backdrop-blur-md border border-white/70 p-8 rounded-[2.5rem] shadow-xs hover:shadow-lg transition-all duration-300 space-y-4 hover:translate-y-[-4px]"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#fff5fc] border border-[#fd80ff]/20 flex items-center justify-center text-[#fd80ff] text-xl font-bold">
                  {item.icon}
                </div>
                <h3 className="font-serif text-2xl text-[#230c1e] font-normal leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans font-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. TRE VÄGAR TILLBAKA (PACKAGES SECTION) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#f5c7fa]/10" id="packages-section">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fUpVariants}
            className="text-center max-w-2xl mx-auto space-y-4"
          >
            <span className="text-xs font-sans font-medium tracking-[0.22em] text-[#fd80ff] uppercase block">
              TRE VÄGAR TILLBAKA
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-light text-[#230c1e] tracking-tight">
              Välj din väg hem.
            </h2>
            <p className="text-[#230c1e]/75 text-sm sm:text-base leading-relaxed font-sans font-light">
              Oavsett var du börjar handlar det om samma sak — att hitta tillbaka till en kropp som är trygg, stark och din.
            </p>
          </motion.div>
 
          {/* Dynamic Matchmaker Board (Boutique cozy design) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fUpVariants}
            className="glass-panel rounded-4xl p-6 sm:p-10 max-w-3xl mx-auto shadow-2xl space-y-8 relative overflow-hidden"
          >
            {/* Elegant warm satin top line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#230c1e] via-[#fd80ff] to-[#f5c7fa]" />
            
            <div className="flex items-center justify-between pb-4 border-b border-[#f5c7fa]/25">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fd80ff]" />
                <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-stone-700">Skapa din personliga hälsoprofil</h3>
              </div>
              <span className="text-[10px] font-sans font-bold text-[#fd80ff] uppercase tracking-widest">Utan press eller hets</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: "wantsWeeklyCalls", label: "Jag önskar mjuka, djupa 1:1-samtal varannan vecka", desc: "Personlig närvaro och coachning" },
                { key: "needsCycleSync", label: "Jag vill synka min träning och kost med menscykeln", desc: "Hormonell harmoni & styrka" },
                { key: "under23", label: "Jag är en yngre tjej (15–22 år)", desc: "Träningsglädje utan piska och press" },
                { key: "exhausted", label: "Jag känner mig väldigt trött eller stressad just nu", desc: "Mjuk nervsystemreglering" }
              ].map((opt) => (
                <label 
                  key={opt.key}
                  className={`p-4.5 rounded-2xl border transition-all cursor-pointer select-none flex items-start gap-3.5 relative overflow-hidden ${
                    userNeeds[opt.key as keyof typeof userNeeds]
                      ? "bg-white/70 border-[#fd80ff] backdrop-blur-md shadow-sm" 
                      : "bg-white/10 border-white/35 hover:bg-white/25 hover:border-white/55 backdrop-blur-xs"
                  }`}
                >
                  <input 
                    type="checkbox"
                    checked={userNeeds[opt.key as keyof typeof userNeeds]}
                    onChange={(e) => setUserNeeds({...userNeeds, [opt.key]: e.target.checked})}
                    className="mt-1 w-4.5 h-4.5 rounded text-[#fd80ff] border-[#f5c7fa] focus:ring-[#fd80ff]"
                  />
                  <div>
                    <span className="block text-xs font-bold text-[#230c1e] leading-snug">{opt.label}</span>
                    <span className="block text-[9px] font-sans text-[#fd80ff] font-bold uppercase tracking-wider mt-0.5">{opt.desc}</span>
                  </div>
                </label>
              ))}
            </div>

            {/* Match output panel */}
            <div className="bg-white/30 backdrop-blur-md p-5 rounded-3xl border border-white/50 flex flex-col sm:flex-row justify-between items-center gap-5 shadow-inner">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm border border-[#f5c7fa] flex items-center justify-center text-[#fd80ff] text-xs font-bold shadow-xs">
                  ✓
                </div>
                <div>
                  <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#fd80ff] block font-medium">REKOMMENDERAT MEDLEMSKAP</span>
                  <span className="text-base font-display text-[#230c1e] tracking-wide block mt-0.5 font-medium">
                    {packages.find(p => p.id === currentRecommendationId)?.name} — {packages.find(p => p.id === currentRecommendationId)?.subtitle}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onSelectPackage(currentRecommendationId)}
                className="w-full sm:w-auto bg-[#230c1e] hover:bg-[#3d1534] text-white font-sans text-[11px] tracking-widest font-semibold uppercase px-8 py-3.5 rounded-full shadow-sm transition-all cursor-pointer"
              >
                Välj detta program
              </button>
            </div>
          </motion.div>

          {/* Cards Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto"
          >
            {packages.filter((pkg) => pkg.id !== "medlemsportal-app").map((pkg) => {
              const isMatch = pkg.id === currentRecommendationId;
              return (
                <motion.div 
                  variants={fUpVariants}
                  key={pkg.id}
                  id={`package-card-${pkg.id}`}
                  className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 border ${
                    pkg.recommended 
                      ? "border-[#fd80ff]/60 bg-white/55 backdrop-blur-xl shadow-[0_10px_35px_rgba(253,128,255,0.08)] scale-[1.02]" 
                      : "border-white/50 bg-white/25 backdrop-blur-xl shadow-sm hover:border-white/70 hover:bg-white/40"
                  } ${isMatch ? "ring-2 ring-[#fd80ff]/20 ring-offset-2" : ""}`}
                >
                  {/* Recommended / Popular badge */}
                  {pkg.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-white/45 backdrop-blur-md text-[#fd80ff] border border-[#fd80ff]/55 px-4.5 py-1.5 rounded-full text-[9.5px] font-sans font-extrabold uppercase tracking-widest shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
                      <Sparkles className="w-3 h-3 text-[#fd80ff] stroke-[2]" /> REKOMMENDERAS ✨
                    </div>
                  )}

                  {isMatch && !pkg.recommended && (
                    <div className="absolute -top-3 right-4 inline-flex items-center gap-1 bg-white/45 backdrop-blur-md text-[#fd80ff] border border-[#fd80ff]/45 px-3.5 py-1.5 rounded-full text-[8.5px] font-sans font-extrabold uppercase tracking-widest shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
                      DIN MATCH 🎀
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="pt-2">
                      {pkg.badge && (
                        <span className="inline-block bg-white/45 backdrop-blur-md text-[#fd80ff] border border-[#fd80ff]/50 px-3 py-1.5 rounded-full text-[9px] font-sans font-extrabold uppercase tracking-[0.12em] mb-2 shadow-[0_4px_12px_rgba(0,0,0,0.02)] leading-none">
                          {pkg.badge}
                        </span>
                      )}
                      <span className="text-[10px] font-sans uppercase tracking-widest text-[#fd80ff] block font-bold leading-none mb-1">
                        {pkg.subtitle}
                      </span>
                      <h3 className="font-display text-xl font-normal text-[#230c1e] tracking-wide">{pkg.name}</h3>
                      <div className="mt-2.5 flex flex-wrap items-baseline gap-1.5 bg-white/45 p-2.5 rounded-xl border border-white/65 w-fit">
                        {pkg.originalPrice && (
                          <span className="text-xs text-stone-400 line-through font-bold mr-1.5 whitespace-nowrap">{pkg.originalPrice}</span>
                        )}
                        <span className="text-xl font-display font-bold text-[#fd80ff] whitespace-nowrap">{pkg.price}</span>
                        <span className="text-[10px] text-stone-400 font-sans tracking-widest uppercase font-bold whitespace-nowrap">{pkg.period}</span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-500 leading-relaxed h-[80px] overflow-hidden">
                      {pkg.description}
                    </p>

                    {pkg.outputGoal && (
                      <p className="text-[10px] font-sans font-bold text-[#230c1e] leading-snug bg-[#fff5fc] p-3 rounded-2xl border border-[#fd80ff]/10">
                        {pkg.outputGoal}
                      </p>
                    )}

                    <div className="border-t border-rose-50 pt-5">
                      <p className="text-[10px] font-sans uppercase tracking-widest font-extrabold text-[#fd80ff] mb-3 block">
                        VAD SOM INGÅR:
                      </p>
                      <ul className="space-y-2.5 text-xs text-stone-600">
                        {pkg.features.map((feat, i) => (
                           <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[#fd80ff] flex-shrink-0 mt-0.5" />
                            <span className="leading-snug">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-neutral-100">
                    {(() => {
                      const isGreenButton = pkg.colorTheme === "sage";
                      const buttonBgClass = isGreenButton 
                        ? "bg-[#02473E] hover:bg-[#012d27] text-white shadow-sm hover:shadow-md border border-transparent" 
                        : "bg-[#fd80ff] hover:bg-[#eb5cf0] text-white shadow-sm hover:shadow-md border border-transparent";
                      return (
                        <div className="space-y-3 w-full">
                          <button
                            onClick={() => onSelectPackage(pkg.id)}
                            className={`group relative inline-flex items-center justify-center text-[10px] font-sans font-black uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-300 ease-[0.16,1,0.3,1] cursor-pointer hover:-translate-y-0.5 active:scale-[0.98] select-none w-full overflow-hidden ${buttonBgClass}`}
                          >
                            <span className="transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:-translate-x-2.5">
                              {pkg.buttonText || "Påbörja din resa"}
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
                          
                          <button
                            onClick={() => {
                              onNavigate("programs");
                              setTimeout(() => {
                                const el = document.getElementById(pkg.id);
                                if (el) {
                                  el.scrollIntoView({ behavior: "smooth", block: "center" });
                                }
                              }, 300);
                            }}
                            className="w-full text-center text-[9px] font-sans font-black uppercase tracking-widest text-[#230c1e]/60 hover:text-[#fd80ff] transition-colors cursor-pointer block mt-1 hover:underline outline-none"
                          >
                            Läs fullständiga detaljer ➔
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Standalone card section for Medlemsportal & App */}
          {(() => {
            const appPkg = packages.find(p => p.id === "medlemsportal-app");
            if (!appPkg) return null;
            return (
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fUpVariants}
                className="max-w-6xl mx-auto mt-16"
              >
                <div className="relative rounded-[3rem] p-8 sm:p-12 overflow-hidden border border-[#fd80ff]/20 bg-gradient-to-br from-white/70 via-white/55 to-[#fff5fc]/55 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row gap-12 items-center text-left">
                  {/* Elegant warm satin top line */}
                  <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#230c1e] via-[#fd80ff] to-[#f5c7fa]" />
                  {/* Subtle decorative glows */}
                  <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-bl from-[#fd80ff]/15 to-transparent filter blur-3xl opacity-80 pointer-events-none" />
                  <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-[#f5c7fa]/20 to-transparent filter blur-3xl opacity-80 pointer-events-none" />

                  {/* Left Side: Info & Details */}
                  <div className="flex-1 space-y-8 z-10">
                    <div className="space-y-4">
                      <span className="inline-flex items-center gap-1.5 bg-white/45 backdrop-blur-md text-[#fd80ff] border border-[#fd80ff]/50 px-3.5 py-1.5 rounded-full text-[9px] font-sans font-extrabold uppercase tracking-widest shadow-[0_4px_12px_rgba(0,0,0,0.02)] leading-none w-fit">
                        KOMMANDE · LANSERAS SNART 💎
                      </span>
                      
                      <div className="space-y-2">
                        <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#fd80ff] block font-bold">
                          {appPkg.subtitle}
                        </span>
                        <h3 className="font-display text-3xl sm:text-5xl font-light text-[#230c1e] tracking-tight leading-tight">
                          {appPkg.name}
                        </h3>
                      </div>

                      <div className="flex items-baseline gap-2 bg-white/60 backdrop-blur-sm border border-white/80 p-3.5 rounded-2xl w-fit shadow-2xs">
                        <span className="text-3xl font-display font-black text-[#fd80ff] leading-none">{appPkg.price}</span>
                        <span className="text-xs text-stone-500 font-sans tracking-widest uppercase font-bold">{appPkg.period}</span>
                      </div>
                    </div>

                    <div className="space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed font-light font-sans">
                      <p>
                        {appPkg.description}
                      </p>
                      {appPkg.outputGoal && (
                        <div className="text-xs font-sans font-bold text-[#230c1e] leading-relaxed bg-[#fff5fc] p-4.5 rounded-2.5xl border border-[#fd80ff]/15 shadow-2xs relative">
                          <span className="absolute -top-2.5 left-5 bg-white border border-[#fd80ff]/20 text-[#fd80ff] text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-sans font-black">Din digitala friszon</span>
                          {appPkg.outputGoal.replace("Du kommer få: ", "")}
                        </div>
                      )}
                    </div>

                    <div className="border-t border-rose-100/60 pt-6 space-y-4">
                      <span className="text-[10px] font-sans uppercase tracking-widest font-extrabold text-[#fd80ff] block">
                        VAD SOM INGÅR I VERKTYGSTLÅDAN:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs sm:text-sm text-stone-600 font-sans">
                        {appPkg.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-[#FFF5FC] border border-pink-100 flex items-center justify-center text-[#fd80ff] shrink-0 mt-0.5 shadow-3xs">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </span>
                            <span className="leading-snug">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={() => onSelectPackage(appPkg.id)}
                        className="group relative inline-flex items-center justify-center text-xs font-sans font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 ease-[0.16,1,0.3,1] cursor-pointer bg-[#02473E] hover:bg-[#012d27] text-white border border-transparent shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] select-none w-full sm:w-auto overflow-hidden"
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

                  {/* Right Side: App Mockup Image */}
                  <div className="w-full lg:w-[440px] shrink-0 z-10 self-center">
                    <div className="relative group">
                      {/* Soft ambient background glow */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#fd80ff]/20 to-[#f5c7fa]/20 rounded-[2.7rem] translate-x-3.5 translate-y-3.5 -z-10 blur-xl group-hover:scale-105 transition-transform duration-500" />
                      {/* Premium border and frame */}
                      <div className="border border-stone-200/50 p-1.5 rounded-[2.7rem] bg-white/40 backdrop-blur-sm shadow-xl overflow-hidden">
                        <img 
                          src={torunAppPreview} 
                          alt="Torun Medlemsportal & App mockups" 
                          className="w-full h-auto rounded-[2.3rem] shadow-sm filter blur-[2.5px] opacity-90 group-hover:blur-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-[1.01]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })()}

          <div className="text-center pt-4">
            <p className="text-xs text-stone-500 font-sans">
              Undrar du över detaljer eller har anpassade behov? <button onClick={() => onNavigate("contact")} className="text-[#fd80ff] underline font-sans font-semibold tracking-wider cursor-pointer">Kontakta mig</button> eller skicka din ansökan direkt.
            </p>
          </div>
        </div>
      </section>

      {/* 3. BIOCENTRERAD VETENSKAP (PHILOSOPHY SECTION) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-b border-[#f5c7fa]/25 relative overflow-hidden" id="philosophy-section">
        {/* Orbiting background glows */}
        <div className="absolute top-1/4 left-[8%] w-80 h-80 rounded-full bg-gradient-to-tr from-[#f5c7fa]/15 via-[#fd80ff]/6 to-transparent filter blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute bottom-1/4 right-[8%] w-96 h-96 rounded-full bg-gradient-to-bl from-[#230c1e]/4 via-[#f5c7fa]/10 to-transparent filter blur-3xl opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fUpVariants}
            className="text-center max-w-2xl mx-auto space-y-4"
          >
            <span className="text-xs font-sans font-medium tracking-[0.22em] text-[#fd80ff] uppercase block">
              BIOCENTRERAD VETENSKAP
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-light text-[#230c1e] tracking-tight">
              Bärande pelare för din livskraft
            </h2>
            <p className="text-[#230c1e]/80 text-sm sm:text-base font-sans leading-relaxed max-w-xl mx-auto font-light">
              Jag vägrar att klämma in din unika fysiologi i stela daterade mallar. Jag lyssnar noga och anpassar rörelserna, näringen och vilan efter ditt nervsystems biologiska röst. Välj en pelare nedan för att läsa mer:
            </p>
          </motion.div>
 
          {/* Interactive Pillars Grid & Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch pt-4">
            
            {/* Left selector col */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="lg:col-span-5 space-y-3.5 flex flex-col justify-center"
            >
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                const isSelected = selectedPillar === pillar.id;
                return (
                  <motion.button
                    variants={fUpVariants}
                    key={pillar.id}
                    onClick={() => setSelectedPillar(pillar.id)}
                    className={`w-full text-left p-5 rounded-3xl border transition-all duration-300 flex gap-4 items-center relative cursor-pointer select-none ${
                      isSelected 
                        ? "bg-white/60 border-white/70 backdrop-blur-md shadow-[0_4px_18px_rgba(253,128,255,0.06)] translate-x-1.5 font-bold" 
                        : "bg-white/20 hover:bg-white/40 border-white/25 hover:border-[#fd80ff]/30 backdrop-blur-xs"
                    }`}
                  >
                    {isSelected && (
                      <motion.div 
                        layoutId="selectedPillarIndicator"
                        className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-[#fd80ff] rounded-r-full"
                      />
                    )}
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border flex-shrink-0 ${pillar.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-sans text-xs font-black text-[#230c1e] uppercase tracking-widest flex items-center gap-2">
                        {pillar.title}
                        {isSelected && <Sparkles className="w-3.5 h-3.5 text-[#fd80ff] animate-pulse" />}
                      </h3>
                      <p className="text-xs text-stone-500 font-sans mt-0.5">{pillar.tagline}</p>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
 
            {/* Right Detailed Card (Dynamic display) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {pillars.map((pillar) => {
                  if (pillar.id !== selectedPillar) return null;
                  const Icon = pillar.icon;
                  return (
                    <motion.div 
                      key={pillar.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="h-full bg-white/40 backdrop-blur-xl border border-white/60 p-8 sm:p-10 rounded-4xl shadow-lg flex flex-col justify-between relative overflow-hidden"
                    >
                      {/* Luminous micro spot */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#fd80ff]/5 rounded-full filter blur-xl" />
                      
                      <div className="space-y-6 relative z-10">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${pillar.color}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-[10px] font-sans uppercase font-extrabold text-[#fd80ff] tracking-widest block">Mjuk filosofi ♡</span>
                            <h3 className="font-display text-2xl font-normal text-[#230c1e] tracking-wide">{pillar.title}</h3>
                          </div>
                        </div>

                        <p className="text-[#230c1e] text-lg sm:text-lg font-serif italic leading-relaxed border-l-2 border-[#fd80ff] pl-4 py-1">
                          "{pillar.description}"
                        </p>

                        <div className="space-y-4 text-xs sm:text-sm text-[#230c1e]/80 leading-relaxed font-sans">
                          <p>{pillar.extended}</p>
                          <p>TORUN bjuder in dig till en långsiktigt hållbar anpassning. Du bär med dig kraften och energin genom alla menscykelns faser eller klimakteriets förändringar med absolut mjukhet och lätthet.</p>
                        </div>
                      </div>

                      <div className="pt-8 mt-8 border-t border-[#f5c7fa]/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
                        <div className="flex flex-wrap gap-1.5">
                          <span className="inline-flex items-center gap-1.5 bg-white/45 backdrop-blur-md text-[#fd80ff] border border-[#fd80ff]/50 px-3.5 py-1.5 rounded-full text-[9px] font-sans font-extrabold uppercase tracking-widest shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
                            Starkt
                          </span>
                          <span className="text-[9px] text-[#230c1e] font-sans font-bold uppercase tracking-widest bg-emerald-50/50 border border-[#230c1e]/20 px-3 py-1 rounded-full">
                            Hetsfritt
                          </span>
                          <span className="text-[9px] text-stone-700 font-sans font-bold uppercase tracking-widest bg-stone-50 border border-stone-200 px-3 py-1 rounded-full">
                            Skonsamt
                          </span>
                        </div>
                        <button 
                          onClick={() => onNavigate("apply")}
                          className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-[#230c1e] hover:text-[#fd80ff] flex items-center gap-1.5 group select-none cursor-pointer"
                        >
                          Ansök om din plats här
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DINA INTERAKTIVA VERKTYG (TOOLS SECTION) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFF5FC] to-[#FAF8F5] border-t border-b border-[#fd80ff]/10 relative z-60" id="tools-section">
        <div className="max-w-7xl mx-auto space-y-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fUpVariants}
            className="text-center max-w-2xl mx-auto space-y-4"
          >
            <span className="text-xs font-sans font-medium tracking-[0.22em] text-[#fd80ff] uppercase block">
              DINA INTERAKTIVA VERKTYG
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-light text-[#230c1e] tracking-tight">
              Testa din biologi redan idag
            </h2>
            <p className="text-[#230c1e]/80 text-sm sm:text-base font-sans leading-relaxed max-w-xl mx-auto font-light font-sans">
              Här kan du utforska hur din menscykel, din stress och din kost samspelar med din träning. Prova mina skräddarsydda, vetenskapliga miniräknare och receptkort helt kostnadsfritt.
            </p>
          </motion.div>

          {/* Dashboard Tab Selector */}
          <div className="flex justify-center mb-8 relative z-20">
            <div className="bg-white/45 backdrop-blur-md border border-[#fd80ff]/20 p-1.5 rounded-full inline-flex gap-1.5 shadow-[0_8px_30px_rgba(219,101,162,0.03)] max-w-full overflow-x-auto no-scrollbar">
              {[
                { id: "compass", label: "Hormonkompassen", icon: Calendar, targetId: "cycle-sync-compass" },
                { id: "wheel", label: "Dagsformshjulet", icon: Activity, targetId: "dagsforms-hjul" },
                { id: "vault", label: "Kostrecepten", icon: Soup, targetId: "recept-valv" }
              ].map((t) => {
                const isActive = activeTool === t.id;
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setActiveTool(t.id as "compass" | "wheel" | "vault");
                      localStorage.setItem("torun_active_tool_tab", t.targetId);
                    }}
                    className={`group relative flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-sans font-black uppercase tracking-wider transition-all duration-300 cursor-pointer select-none whitespace-nowrap ${
                      isActive 
                        ? "text-white" 
                        : "text-[#230c1e]/70 hover:text-[#230c1e] hover:bg-white/40"
                    }`}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="activeToolTabHighlight"
                        className="absolute inset-0 bg-[#fd80ff] rounded-full -z-10 shadow-sm"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Icon className={`w-3.5 h-3.5 transition-transform duration-300 ${isActive ? "text-white scale-110" : "text-[#fd80ff]/80 group-hover:scale-110"}`} />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Tool View with AnimatePresence */}
          <div className="relative min-h-[500px]" id="tools-dashboard-view">
            {/* Absolute anchors for navigation scroll targets */}
            <div id="cycle-sync-compass" className="absolute -top-36 pointer-events-none" />
            <div id="dagsforms-hjul" className="absolute -top-36 pointer-events-none" />
            <div id="recept-valv" className="absolute -top-36 pointer-events-none" />

            <AnimatePresence mode="wait">
              {activeTool === "compass" && (
                <motion.div
                  key="compass"
                  initial={{ opacity: 0, y: 15, scale: 0.995 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.995 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <CycleCompass />
                </motion.div>
              )}

              {activeTool === "wheel" && (
                <motion.div
                  key="wheel"
                  initial={{ opacity: 0, y: 15, scale: 0.995 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.995 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <RecoveryWheel />
                </motion.div>
              )}

              {activeTool === "vault" && (
                <motion.div
                  key="vault"
                  initial={{ opacity: 0, y: 15, scale: 0.995 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.995 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NourishmentVault />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 5. PORTAL CALLOUT BANNER (ALTERNATIV 1) - Integrated inside the tools section */}
          <div className="pt-16 max-w-4xl mx-auto border-t border-[#f5c7fa]/15 mt-16" id="portal-section">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fUpVariants}
              className="bg-white/70 backdrop-blur-md border border-[#fd80ff]/15 rounded-[2.5rem] p-8 sm:p-12 text-[#230c1e] text-center relative overflow-hidden shadow-[0_15px_35px_rgba(219,101,162,0.03)] animate-in-fade-slide"
            >
              {/* Soft pink blur spot */}
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#fd80ff]/5 rounded-full filter blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#fd80ff] block">
                  VILL DU HA HELA VERKTYGSTLÅDAN?
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-light tracking-tight text-[#230c1e] leading-[1.2]">
                  Detta är bara ett smakprov på hur du kan börja samarbeta med din kropp.
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans font-light max-w-xl mx-auto">
                  Som medlem får du tillgång till hela min digitala portal – där du hittar fullständiga träningsprogram, djupare hormon-analyser, <span className="font-semibold text-[#230c1e]">obegränsad tillgång till alla dessa interaktiva verktyg</span> och hundratals recept anpassade efter din unika cykel.
                </p>
                
                <div className="pt-4">
                  <button 
                    onClick={() => onNavigate("programs")}
                    className="bg-[#fd80ff] hover:bg-[#eb5cf0] text-white text-[11px] font-sans font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all cursor-pointer shadow-md hover:-translate-y-0.5 active:scale-98"
                  >
                    Bli medlem och lås upp hela din potential 🎀
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 4. DIN HISTORIA - "Hej, jag är Torun" */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#f5c7fa]/10" id="story-section">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Premium Photo/Video Container */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fLeftVariants}
              className="relative w-full max-w-sm"
            >
              {/* Collaging details/glows */}
              <div className="absolute top-1/4 -left-6 w-48 bg-[#f5c7fa]/20 aspect-square rounded-full filter blur-3xl pointer-events-none" />
              <div className="absolute bottom-10 -right-6 w-48 bg-[#fd80ff]/5 aspect-square rounded-full filter blur-3xl pointer-events-none" />
              
              {/* Offset outline frame behind the image */}
              <div className="absolute inset-0 border border-[#230c1e]/15 rounded-[2.5rem] translate-x-4 translate-y-4 -z-10" />

              {/* Main Photo Box */}
              <div className="bg-white rounded-[2.5rem] p-1.5 border border-[#230c1e]/10 relative z-10 overflow-hidden shadow-[0_20px_50px_rgba(35,12,30,0.06)] group">
                <div className="aspect-[4/5] bg-stone-100 relative overflow-hidden rounded-[2.4rem] flex items-center justify-center">
                  <img 
                    src={torunMeadow} 
                    alt="Torun Wallin" 
                    className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-[0.16,1,0.3,1]"
                  />
                </div>
              </div>

              {/* Overlapping Badge at bottom-center */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 bg-white border border-[#230c1e]/10 rounded-full px-5 py-2.5 shadow-md flex items-center justify-center whitespace-nowrap">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#230c1e]/85">
                  COACH · PT · WOMEN'S HEALTH
                </span>
              </div>

            </motion.div>
          </div>

          {/* Right Column: Copy and Presentation */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fRightVariants}
            className="lg:col-span-7 space-y-6 text-left order-1 lg:order-2"
          >
            {/* Header label with lines */}
            <div className="flex items-center gap-2 font-sans font-bold uppercase tracking-widest text-[#230c1e]/60 text-[10px]">
              <div className="h-[1px] w-8 bg-[#230c1e]/20" />
              <span>DIN COACH</span>
              <div className="h-[1px] w-8 bg-[#230c1e]/20" />
            </div>

            {/* Title with Torun in cursive script */}
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#230c1e] tracking-tight leading-tight">
              Hej, jag är <span className="font-signature text-[#fd80ff] text-3xl sm:text-5xl ml-1 tracking-normal">Torun.</span>
            </h2>
            
            {/* First paragraph in bold */}
            <p className="font-sans text-sm sm:text-base font-bold text-[#230c1e] leading-relaxed">
              Jag tror inte att din kropp är ett problem som ska fixas. Jag tror att den är ett hem du har varit borta från ett tag.
            </p>

            {/* Quote block */}
            <div className="border-l-2 border-[#fd80ff]/80 pl-4 py-1 italic font-serif text-lg sm:text-xl text-[#230c1e] leading-relaxed my-4">
              "& jag är här för att hjälpa dig hitta tillbaka."
            </div>

            {/* Two column grid for the main text */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-[#230c1e]/80 leading-relaxed font-sans font-light">
              <p>
                Jag har själv levt i det. I <span className="font-mono bg-[#230c1e]/5 px-1 py-0.5 rounded text-[11px] font-bold text-[#230c1e]">dietkulturen</span>, i kontrollen, i den utmattande jakten på en mindre version av mig själv. I tron att styrka var något jag måste förtjäna — och att vila var något jag skulle straffas för.
              </p>
              <p>
                Jag hittade tillbaka genom <span className="font-mono bg-[#230c1e]/5 px-1 py-0.5 rounded text-[11px] font-bold text-[#230c1e]">styrketräning</span>. Inte för att den förändrade min kropp — utan för att den förändrade mig. Den lärde mig att äta för att prestera. Att vila är intelligent. Och att kapacitet känns bättre än kontroll.
              </p>
            </div>

            {/* Summary sentence */}
            <p className="text-xs sm:text-sm text-[#230c1e]/90 leading-relaxed font-sans font-light">
              Det är det jag vill ge vidare. Inte ett program. Inte en quick fix. Utan en mjukare, sundare väg — <span className="italic">den jag själv önskar att jag haft.</span>
            </p>

            {/* Sub-label under content */}
            <div className="flex items-center gap-2 text-[#230c1e]/40 text-[10px] font-sans font-bold uppercase tracking-widest pt-2">
              <div className="h-[1px] w-6 bg-[#230c1e]/10" />
              <span>Certifierad PT · Inriktning kvinnors hälsa</span>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <button 
                onClick={() => onNavigate("programs")}
                className="group relative inline-flex items-center justify-center text-[10px] font-sans font-black uppercase tracking-widest px-8 py-3.5 rounded-full cursor-pointer bg-[#fd80ff] hover:bg-[#eb5cf0] text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-98 select-none overflow-hidden transition-all duration-300"
              >
                <span className="inline-block transition-transform duration-300 group-hover:-translate-x-2.5">
                  Se programmen
                </span>
                <span className="absolute right-5 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                </span>
              </button>
              <a 
                href="https://www.tiktok.com/@torunwallin" 
                target="_blank" 
                rel="noreferrer" 
                className="group relative inline-flex items-center justify-center text-[10px] font-sans font-black uppercase tracking-widest px-8 py-3.5 rounded-full cursor-pointer bg-white hover:bg-stone-50 border border-stone-200 text-[#230c1e] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-98 select-none overflow-hidden transition-all duration-300"
              >
                <span className="absolute left-5 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#230c1e]">
                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.52-4.06-1.39-.77-.57-1.39-1.35-1.77-2.24-.03 1.93-.01 3.86-.02 5.79-.06 2.73-1.01 5.48-2.97 7.37-2.02 2.01-5.11 2.87-7.9 2.23-2.91-.62-5.49-2.94-6.3-5.75-.95-3.14-.11-6.72 2.19-9.04 1.83-1.89 4.54-2.67 7.09-2.22v4.18c-1.52-.45-3.23-.07-4.41.97-1.07.94-1.54 2.47-1.28 3.88.29 1.62 1.67 2.92 3.3 3.1 1.79.23 3.65-.87 4.13-2.6.14-.52.17-1.07.17-1.61V.02z"/>
                  </svg>
                </span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-2.5">
                  Följ på TikTok
                </span>
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4.5 STARK TJEJ GIVEAWAY SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]" id="giveaway-section">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fUpVariants}
            className="bg-white border border-stone-200/50 rounded-[2.5rem] p-8 sm:p-12 shadow-xs relative overflow-hidden"
          >
            {/* Soft decorative background illustration/grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#230c1e_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="space-y-6 text-center relative z-10">
              {/* Badge with horizontal lines */}
              <div className="flex items-center justify-center gap-4 text-[10px] font-sans font-bold tracking-widest text-[#fd80ff]">
                <span className="h-[1px] w-8 sm:w-16 bg-[#fd80ff]/30"></span>
                <span>EN PLATS PER KVARTAL</span>
                <span className="h-[1px] w-8 sm:w-16 bg-[#fd80ff]/30"></span>
              </div>

              {/* Large Title */}
              <h2 className="font-display text-4xl sm:text-5xl font-light text-[#230c1e] tracking-tight flex items-center justify-center gap-2.5">
                Stark Tjej <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-[#fd80ff] fill-none stroke-[1.5]" />
              </h2>
              
              {/* Description */}
              <p className="font-sans text-sm sm:text-[15px] text-stone-700 max-w-2xl mx-auto leading-relaxed">
                Varje kvartal ger jag bort en plats i <strong className="font-bold text-[#230c1e]">Stark med Torun</strong> till en ung tjej som behöver stöd, trygghet och någon som tror på henne.
              </p>
              
              {/* Monospace Quote Box */}
              <div className="bg-stone-100/50 border border-stone-200/40 p-5 rounded-2xl max-w-xl mx-auto font-mono text-[11px] sm:text-xs text-stone-600 shadow-2xs leading-relaxed">
                Ingen prestation. Ingen press att vara duktig. Bara ett varmt rum att börja om i.
              </div>

              {/* Minor text with pink range */}
              <p className="text-[11px] sm:text-xs text-stone-500 font-sans leading-relaxed">
                För dig mellan <span className="text-[#fd80ff] font-bold">16–22 år</span> som vill bygga styrka, självkänsla och en snällare relation till kroppen.
              </p>

              {/* Bright Pink Pill Button */}
              <div className="pt-4">
                <button
                  onClick={() => onNavigate("apply")}
                  className="group relative inline-flex items-center justify-center text-[14.5px] sm:text-[16px] font-serif font-normal tracking-wide px-8 py-3.5 rounded-full transition-all duration-300 ease-[0.16,1,0.3,1] cursor-pointer bg-[#fd80ff] hover:bg-[#eb5cf0] text-white border border-white/20 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] select-none overflow-hidden"
                >
                  <span className="transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:-translate-x-2.5">
                    Ansök — för dig själv eller någon du tror på
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
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION (REMOVED) */}

      {/* 6. ARTICLES / KUNSKAPSBIBLIOTEK SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#f5c7fa]/10" id="library-section">
        <div className="max-w-7xl mx-auto space-y-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fUpVariants}
            className="text-center max-w-2xl mx-auto space-y-4"
          >
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#fd80ff] block">
              KUNSKAP & INSPIRATION
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#230c1e] tracking-tight">
              Träning & hälsa på kroppens villkor
            </h2>
            <p className="text-[#230c1e]/80 text-xs sm:text-sm font-sans font-light leading-relaxed max-w-lg mx-auto">
              Här samlar jag artiklar och enkla tips om hur du tränar smart, lyssnar på dagsformen och hittar en stark och snäll relation till din kropp – helt utan krångel och pekpinnar.
            </p>
          </motion.div>

          {/* Articles Grid (Latest 3 articles) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {articles.slice(0, 3).map((article) => (
              <motion.div 
                variants={fUpVariants}
                key={article.id}
                className="bg-white/20 hover:bg-white/40 border border-white/50 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:shadow-lg transition-all duration-300 backdrop-blur-md text-left"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center gap-1.5 bg-white/45 backdrop-blur-md text-[#fd80ff] border border-[#fd80ff]/50 px-3.5 py-1.5 rounded-full text-[9px] font-sans font-extrabold uppercase tracking-widest shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
                      {article.category}
                    </span>
                    <span className="text-[10px] text-stone-400 font-sans tracking-widest font-bold">
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-sans text-sm font-black uppercase tracking-widest text-[#230c1e] leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-stone-500 leading-relaxed font-sans font-light">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-neutral-100/55 flex justify-end">
                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="text-[10px] font-sans font-black uppercase tracking-widest text-[#fd80ff] hover:text-[#e472e6] flex items-center gap-1.5 cursor-pointer select-none"
                  >
                    Läs artikeln
                    <ArrowRight className="w-3.5 h-3.5 text-[#fd80ff]" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center pt-10">
            <button
              onClick={() => onNavigate("articles")}
              className="group relative inline-flex items-center justify-center gap-0 hover:gap-2.5 text-[10px] font-sans font-black uppercase tracking-widest px-7 hover:px-9 py-3.5 rounded-full transition-all duration-300 ease-[0.16,1,0.3,1] cursor-pointer bg-[#02473E] hover:bg-[#012d27] text-white border border-white/20 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-98 select-none"
            >
              <span>Visa alla artiklar i kunskapsbiblioteket</span>
              <span className="w-0 opacity-0 scale-50 transition-all duration-300 ease-[0.16,1,0.3,1] group-hover:w-4 group-hover:opacity-100 group-hover:scale-100 flex items-center justify-center overflow-hidden">
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
      </section>

      {/* Article Detail Drawer Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-[#230c1e]/20 backdrop-blur-sm flex items-center justify-center p-4" 
            id="article-modal"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white/90 backdrop-blur-2xl rounded-4xl max-w-4xl w-full max-h-[85vh] overflow-y-auto border border-white/60 shadow-2xl p-8 sm:p-12 md:p-14 relative text-left"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-[#f5c7fa]/60 hover:bg-[#fff5fc] text-[#fd80ff] focus:outline-none cursor-pointer w-9 h-9 flex items-center justify-center font-bold"
                aria-label="Stäng artikel"
              >
                ×
              </button>
              
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 bg-white/45 backdrop-blur-md text-[#fd80ff] border border-[#fd80ff]/50 px-3.5 py-1.5 rounded-full text-[9px] font-sans font-extrabold uppercase tracking-widest shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
                    {selectedArticle.category}
                  </span>
                  <span className="text-xs text-stone-400 font-sans tracking-widest uppercase font-medium">
                    {selectedArticle.readTime} i lästid
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-4xl font-light text-[#230c1e] tracking-tight leading-tight">
                  {selectedArticle.title}
                </h3>

                <div className="border-t border-neutral-100 pt-6 space-y-5 text-sm sm:text-base leading-relaxed text-stone-600 font-sans font-light">
                  {selectedArticle.content.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <span className="text-xs text-stone-400 font-sans">Skrivet med värme av <span className="font-signature text-lg text-[#fd80ff] ml-1 tracking-normal align-middle inline-block transform translate-y-[-2px]">Torun Wallin</span></span>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="w-full sm:w-auto bg-[#230c1e] hover:bg-[#3d1534] text-white text-[10px] font-sans font-semibold uppercase tracking-widest px-8 py-3.5 rounded-full cursor-pointer"
                  >
                    Stäng artikel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. SOFT PREMIUM NEWSLETTER SIGNUP */}
      {/* 7. SOFT PREMIUM NEWSLETTER SIGNUP */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]" id="newsletter-section">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fUpVariants}
          className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md border border-[#fd80ff]/15 rounded-[2.5rem] p-8 sm:p-12 text-[#230c1e] relative overflow-hidden shadow-[0_15px_35px_rgba(219,101,162,0.04)] text-center"
        >
          {/* Luminous spot */}
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#fd80ff]/5 rounded-full filter blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#02473E] block">
              NYHETSBREVET
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[#230c1e] leading-[1.1]">
              Stanna kvar <br />
              <span className="font-script text-[#02473E] text-2xl sm:text-3xl my-1.5 tracking-normal lowercase flex items-center justify-center gap-2">
                direkt i inkorgen <Heart className="w-5 h-5 text-[#02473E] fill-none stroke-[1.5]" />
              </span>
            </h2>
            <p className="font-serif italic text-base sm:text-lg font-bold text-[#fd80ff] tracking-normal">
              Få min gratis 7-dagars startguide.
            </p>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans font-light max-w-lg mx-auto">
              Små steg, träningstips, tankar kring kvinnlig hälsa <br />
              och påminnelser om att du inte behöver göra allt <br />
              perfekt för att må bra.
              <span className="block mt-4 font-serif italic font-medium text-stone-600">Bara ett mjukare sätt att börja.</span>
            </p>

            {isNewsletterSubscribed ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#fff5fc] border border-[#fd80ff]/20 p-5 rounded-2xl text-center"
              >
                <span className="text-xs font-sans font-semibold text-[#fd80ff]">Tack för ditt förtroende. Din e-postadress är registrerad och du får min guide och kommande nyhetsbrev. ♡</span>
              </motion.div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsNewsletterSubscribed(true);
                }}
                className="flex flex-col sm:flex-row gap-3 pt-4 max-w-md mx-auto"
              >
                <input 
                  type="email" 
                  required
                  placeholder="din@mejl.se"
                  className="bg-white border border-stone-200 rounded-full px-6 py-3.5 text-xs text-[#230c1e] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:border-transparent flex-grow text-center sm:text-left"
                />
                <button 
                  type="submit"
                  className="group relative inline-flex items-center justify-center gap-1.5 text-[10px] font-sans font-black uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-300 ease-[0.16,1,0.3,1] cursor-pointer bg-[#fd80ff] hover:bg-[#eb5cf0] text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] select-none overflow-hidden"
                >
                  <span className="flex items-center gap-1.5">
                    Skicka guiden <Heart className="w-3 h-3 text-white fill-none stroke-[2]" />
                  </span>
                </button>
              </form>
            )}
            
            <p className="text-[10px] text-stone-400 font-sans mt-2">
              Du får också mina nyhetsbrev då och då. Avregistrera dig när du vill.
            </p>
          </div>
        </motion.div>
      </section>


      {/* Elegantly floating scroll-to-top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scrollTopBtn"
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-40 w-11 h-11 bg-white text-[#230c1e] hover:bg-[#230c1e] hover:text-white border border-stone-200/60 rounded-full flex items-center justify-center shadow-[0_12px_36px_rgba(2,71,62,0.12)] hover:shadow-[0_15px_30px_rgba(253,128,255,0.22)] transition-all duration-300 active:scale-95 cursor-pointer outline-none"
            title="Skrolla till toppen"
          >
            <ArrowUp className="w-4.5 h-4.5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
