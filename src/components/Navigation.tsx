import React, { useState, useEffect } from "react";
import { 
  Menu, X, Sparkles, Compass, ClipboardCheck, Heart, ArrowRight, User, Mail, 
  ChevronDown, BookOpen, Activity, Soup, ShieldAlert, FileText, Calendar, Sliders
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  
  // Dropdown states
  const [activeDropdown, setActiveDropdown] = useState<"home" | "startguide" | "status" | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);

  // Wellness metrics synced from widgets via localStorage & custom events
  const [wellness, setWellness] = useState({
    score: 82,
    cycleDay: 14,
    selectedTab: "cycle",
    specialPhase: "klimakterie"
  });

  const loadWellness = () => {
    const score = parseInt(localStorage.getItem("torun_recovery_score") || "82", 10);
    const cycleDay = parseInt(localStorage.getItem("torun_cycle_day") || "14", 10);
    const selectedTab = localStorage.getItem("torun_selected_tab") || "cycle";
    const specialPhase = localStorage.getItem("torun_special_phase") || "klimakterie";
    setWellness({ score, cycleDay, selectedTab, specialPhase });
  };

  useEffect(() => {
    loadWellness();
    
    // Listen for custom wellness events or storage updates
    window.addEventListener("torun-wellness-updated", loadWellness);
    window.addEventListener("storage", loadWellness);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("torun-wellness-updated", loadWellness);
      window.removeEventListener("storage", loadWellness);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseEnter = (menu: "home" | "startguide" | "status") => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 180); // Slight delay for smooth cursor transitions
    setDropdownTimeout(timeout);
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSectionClick = (tabId: string, sectionId: string) => {
    setActiveTab(tabId);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    
    if (sectionId === "cycle-sync-compass" || sectionId === "dagsforms-hjul" || sectionId === "recept-valv") {
      localStorage.setItem("torun_active_tool_tab", sectionId);
      window.dispatchEvent(new Event("torun-active-tool-tab-updated"));
    }

    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 150);
  };

  // Helper to compute active wellness status
  const getWellnessDetails = () => {
    const { score, cycleDay, selectedTab, specialPhase } = wellness;
    let phaseName = "";
    let phaseEmoji = "";
    let advice = "";

    if (selectedTab === "cycle") {
      if (cycleDay >= 1 && cycleDay <= 5) {
        phaseName = `Menscykel: Dag ${cycleDay} (Vinter)`;
        phaseEmoji = "🌊";
        advice = "Menstruation. Välj mjuk rörelse: yinyoga, rörlighet eller lugna promenader.";
      } else if (cycleDay >= 6 && cycleDay <= 12) {
        phaseName = `Menscykel: Dag ${cycleDay} (Vår)`;
        phaseEmoji = "🌱";
        advice = "Follikulärfas. Östrogenet stiger. Perfekt läge för tunga lyft och basövningar.";
      } else if (cycleDay >= 13 && cycleDay <= 16) {
        phaseName = `Menscykel: Dag ${cycleDay} (Sommar)`;
        phaseEmoji = "⚡";
        advice = "Ägglossning. Högsta energinivå! Utmana dig men värm upp ordentligt.";
      } else {
        phaseName = `Menscykel: Dag ${cycleDay} (Höst)`;
        phaseEmoji = "🍂";
        advice = "Lutealfas. Progesteronet dominerar. Fokusera på lugna, tunga kontrollerade lyft.";
      }
    } else {
      if (specialPhase === "klimakterie") {
        phaseName = "Klimakteriet / Perimenopaus";
        phaseEmoji = "🌸";
        advice = "Tung basstyrka bevarar benhälsa och muskelmassa när östrogenet svänger.";
      } else {
        phaseName = "Nervsystem-Support";
        phaseEmoji = "🕯️";
        advice = "Högt kortisol/stress. Ersätt gympasset med andning, yinyoga eller vila.";
      }
    }

    let recoveryLabel = "";
    let recoveryColor = "";
    let recoveryBadge = "";
    if (score >= 80) {
      recoveryLabel = "Optimal (Full kraft)";
      recoveryColor = "text-emerald-600 bg-emerald-50 border-emerald-200";
      recoveryBadge = "bg-emerald-500";
    } else if (score >= 50) {
      recoveryLabel = "Balans (Sänk tempot något)";
      recoveryColor = "text-[#230c1e] bg-[#fff5fc] border-[#fd80ff]/20";
      recoveryBadge = "bg-[#fd80ff]";
    } else {
      recoveryLabel = "Känsligt läge (Vila)";
      recoveryColor = "text-amber-800 bg-amber-50 border-amber-200";
      recoveryBadge = "bg-amber-500";
    }

    return { phaseName, phaseEmoji, advice, recoveryLabel, recoveryColor, recoveryBadge, score };
  };

  const currentWellness = getWellnessDetails();

  const menuItems = [
    { id: "home", label: "Hem & Filosofi", hasDropdown: true },
    { id: "startguide", label: "Gratis Startguide", hasDropdown: true },
    { id: "programs", label: "Program", hasDropdown: false },
    { id: "articles", label: "Artiklar", hasDropdown: false },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-[0.16,1,0.3,1] ${
        isScrolled 
          ? "py-2 px-3 sm:px-6 lg:px-8 bg-transparent" 
          : "py-4 px-4 sm:px-6 lg:px-8 bg-transparent absolute"
      }`} 
      id="main-navigation"
    >
      {/* Morphing Organic Glass Frame */}
      <motion.div 
        layout
        transition={{ type: "spring", stiffness: 220, damping: 28 }}
        className={`mx-auto flex items-center justify-between relative transition-all duration-500 ${
          isScrolled 
            ? "max-w-6xl bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_12px_45px_-12px_rgba(35,12,30,0.14)] rounded-[2rem] h-14 px-4 sm:px-5" 
            : "max-w-7xl bg-white/20 backdrop-blur-md border border-white/35 shadow-[0_8px_32px_rgba(28,23,20,0.01)] rounded-full h-18 px-5 sm:px-6"
        }`}
      >
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleTabClick("home")}
          className="flex items-center gap-2 cursor-pointer group select-none ml-1"
          id="logo-container"
        >
          <div className="w-8.5 h-8.5 rounded-full bg-white/40 flex items-center justify-center border border-white/50 group-hover:bg-[#fff2fb] group-hover:border-[#fd80ff]/40 transition-all duration-500 shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-[#230c1e] group-hover:text-[#fd80ff] fill-[#fd80ff]/0 group-hover:fill-[#fd80ff]/10 group-hover:scale-115 group-hover:rotate-12 transition-all duration-500" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-[#230c1e] leading-none transition-transform group-hover:scale-[1.01]">
              TORUN
            </span>
            {!isScrolled && (
              <span className="text-[7px] font-sans font-bold tracking-[0.14em] text-[#230c1e]/70 uppercase leading-none mt-1.5 transition-colors group-hover:text-[#fd80ff] whitespace-nowrap">
                Vägen till ett hälsosammare liv
              </span>
            )}
          </div>
        </div>

        {/* Desktop Menu Link Bar */}
        <div className={`hidden lg:flex items-center ${isScrolled ? "gap-1.5" : "gap-2.5"}`} id="desktop-menu">
          
          {/* Main Links Container */}
          <div className="bg-white/20 backdrop-blur-md px-1 py-1 rounded-full border border-white/30 flex items-center gap-0.5">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              const isHovered = hoveredTab === item.id;
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => {
                    setHoveredTab(item.id);
                    if (item.hasDropdown) {
                      handleMouseEnter(item.id as "home" | "startguide");
                    } else {
                      if (dropdownTimeout) {
                        clearTimeout(dropdownTimeout);
                      }
                      setActiveDropdown(null);
                    }
                  }}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => {
                      if (item.sectionId) {
                        handleSectionClick(item.id, item.sectionId);
                      } else {
                        handleTabClick(item.id);
                      }
                    }}
                    id={`nav-btn-${item.id}`}
                    className="relative px-3.5 py-2 rounded-full text-xs font-extrabold uppercase tracking-[0.14em] transition-all duration-300 select-none cursor-pointer flex items-center gap-1.5 whitespace-nowrap group"
                  >
                    {/* Active highlight glow capsule */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeTabGlow"
                        className="absolute inset-0 bg-white/90 rounded-full border border-white/95 shadow-[0_3px_12px_rgba(35,12,30,0.04)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className={`relative z-10 transition-colors duration-300 flex items-center gap-1 whitespace-nowrap ${isActive ? "text-[#230c1e] font-extrabold" : "text-[#230c1e]/65 hover:text-[#230c1e]"}`}>
                      {item.label}
                      {item.hasDropdown && (
                        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === item.id ? "rotate-180 text-[#fd80ff]" : "opacity-60"}`} />
                      )}
                    </span>
                    {/* Underline expanding animation on hover */}
                    {!isActive && (
                      <span className="absolute bottom-1.5 left-3.5 right-3.5 h-0.5 bg-[#fd80ff]/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center z-10" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
          
          {/* Member Login */}
          <button
            onClick={() => handleTabClick("contact")}
            className="relative px-3.5 py-2 text-xs font-sans font-extrabold uppercase tracking-[0.14em] text-[#230c1e]/70 hover:text-[#230c1e] transition-all cursor-pointer mr-0.5 group whitespace-nowrap"
          >
            Kontakta mig
            <span className="absolute bottom-1.5 left-3.5 right-3.5 h-0.5 bg-[#fd80ff]/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </button>

          {/* Premium Call to Action */}
          <button
            onClick={() => handleTabClick("apply")}
            id="nav-quick-cta"
            className="group bg-white/45 backdrop-blur-md hover:bg-[#230c1e] border border-white/55 shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_0_20px_rgba(253,128,255,0.4)] hover:border-[#fd80ff]/50 pr-4.5 pl-1.5 py-1.5 rounded-full flex items-center gap-2 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            <div className="w-7 h-7 rounded-full bg-[#fdf0f8] group-hover:bg-white text-[#230c1e] flex items-center justify-center transition-all duration-300 pointer-events-none">
              <Heart className="w-3.5 h-3.5 text-[#230c1e] group-hover:text-[#fd80ff] fill-none group-hover:fill-[#fd80ff]/10 animate-heartbeat-hover transition-all duration-300" />
            </div>
            <span className="font-sans text-xs font-black tracking-[0.14em] text-[#230c1e] group-hover:text-white uppercase transition-colors duration-300 whitespace-nowrap">
              Starta nu
            </span>
          </button>
        </div>

        {/* Mobile Menu Icon container */}
        <div className="flex lg:hidden items-center gap-2 mr-1" id="mobile-menu-trigger-container">


          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            className="w-8.5 h-8.5 rounded-full border border-stone-200/80 text-[#230c1e] bg-white flex items-center justify-center hover:bg-stone-50 focus:outline-none transition-colors"
            aria-label="Öppna meny"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* --- Mega Dropdown for "Hem & Filosofi" --- */}
        <AnimatePresence>
          {activeDropdown === "home" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => handleMouseEnter("home")}
              onMouseLeave={handleMouseLeave}
              className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-full pt-4.5 -mt-1 w-[74rem] max-w-[calc(100vw-2rem)] z-50"
            >
              <div className="bg-[#FAF8F5] border border-[#fd80ff]/25 rounded-[2.5rem] shadow-[0_30px_90px_-10px_rgba(35,12,30,0.25)] overflow-hidden text-[#230c1e] font-sans">
                <div className="grid grid-cols-12">
                  {/* Left Side: Navigation Links */}
                  <div className="col-span-8 p-12 grid grid-cols-2 gap-10 bg-white">
                    <div className="space-y-6">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#230c1e]/50 block border-b border-stone-100 pb-2">
                        Filosofi & Träning
                      </span>
                      
                      <div 
                        onClick={() => handleSectionClick("home", "philosophy-section")}
                        className="group/item flex gap-4 p-4 rounded-3xl hover:bg-[#fff5fc]/60 border border-transparent hover:border-[#fd80ff]/10 cursor-pointer transition-all duration-300 shadow-2xs hover:shadow-xs"
                      >
                        <Compass className="w-7 h-7 text-[#fd80ff] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-base sm:text-lg font-black block group-hover/item:text-[#fd80ff] transition-colors leading-tight">
                            Träningsfilosofi
                          </span>
                          <span className="text-[13px] text-[#230c1e]/70 leading-relaxed block mt-1.5">
                            Basstyrka anpassad för kvinnans anatomi, graviditet och återhämtning.
                          </span>
                        </div>
                      </div>

                      <div 
                        onClick={() => handleSectionClick("about", "story-section")}
                        className="group/item flex gap-4 p-4 rounded-3xl hover:bg-[#fff5fc]/60 border border-transparent hover:border-[#fd80ff]/10 cursor-pointer transition-all duration-300 shadow-2xs hover:shadow-xs"
                      >
                        <User className="w-7 h-7 text-[#fd80ff] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-base sm:text-lg font-black block group-hover/item:text-[#fd80ff] transition-colors leading-tight">
                            Om Coach Torun
                          </span>
                          <span className="text-[13px] text-[#230c1e]/70 leading-relaxed block mt-1.5">
                            Lic. PT & gravidträningsspecialist under samtalsterapeututbildning.
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#230c1e]/50 block border-b border-stone-100 pb-2">
                        Interaktiva Moduler
                      </span>

                      <div 
                        onClick={() => handleSectionClick("home", "cycle-sync-compass")}
                        className="group/item flex gap-4 p-4 rounded-3xl hover:bg-[#fff5fc]/60 border border-transparent hover:border-[#fd80ff]/10 cursor-pointer transition-all duration-300 shadow-2xs hover:shadow-xs"
                      >
                        <Calendar className="w-7 h-7 text-[#fd80ff] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-base sm:text-lg font-black block group-hover/item:text-[#fd80ff] transition-colors leading-tight">
                            Hormonkompassen
                          </span>
                          <span className="text-[13px] text-[#230c1e]/70 leading-relaxed block mt-1.5">
                            Synka dina träningspass, råvaror och återhämtning efter din menscykel.
                          </span>
                        </div>
                      </div>

                      <div 
                        onClick={() => handleSectionClick("home", "dagsforms-hjul")}
                        className="group/item flex gap-4 p-4 rounded-3xl hover:bg-[#fff5fc]/60 border border-transparent hover:border-[#fd80ff]/10 cursor-pointer transition-all duration-300 shadow-2xs hover:shadow-xs"
                      >
                        <Activity className="w-7 h-7 text-[#fd80ff] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-base sm:text-lg font-black block group-hover/item:text-[#fd80ff] transition-colors leading-tight">
                            Dagsformshjulet
                          </span>
                          <span className="text-[13px] text-[#230c1e]/70 leading-relaxed block mt-1.5">
                            Mät stress, sömn & kramper för att justera intensiteten idag.
                          </span>
                        </div>
                      </div>

                      <div 
                        onClick={() => handleSectionClick("home", "recept-valv")}
                        className="group/item flex gap-4 p-4 rounded-3xl hover:bg-[#fff5fc]/60 border border-transparent hover:border-[#fd80ff]/10 cursor-pointer transition-all duration-300 shadow-2xs hover:shadow-xs"
                      >
                        <Soup className="w-7 h-7 text-[#fd80ff] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-base sm:text-lg font-black block group-hover/item:text-[#fd80ff] transition-colors leading-tight">
                            Nourishment Vault
                          </span>
                          <span className="text-[13px] text-[#230c1e]/70 leading-relaxed block mt-1.5">
                            Hitta hormonstöttande recept för PMS, trötthet, energi eller stress.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Showcase Info Card */}
                  <div className="col-span-4 p-12 bg-[#fff5fc] border-l border-[#fd80ff]/15 flex flex-col justify-between">
                    <div className="space-y-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase bg-pink-100/50 text-[#fd80ff] border border-pink-200/40 shadow-3xs">
                        <Sparkles className="w-3.5 h-3.5" /> Medlemsportal
                      </span>
                      <h4 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                        Ta din träning till nästa nivå
                      </h4>
                      <p className="text-sm leading-relaxed text-[#230c1e]/75 font-light">
                        Få tillgång till fulla träningsprogram, videobibliotek med säkra gravidövningar, symptom-loggbok och gemenskap.
                      </p>
                    </div>

                    <div className="pt-8 space-y-3">
                      <button 
                        onClick={() => handleTabClick("programs")}
                        className="w-full flex items-center justify-between bg-[#230c1e] hover:bg-[#230c1e]/90 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-4 rounded-xl transition-all cursor-pointer shadow-md active:scale-98"
                      >
                        <span>Utforska mina program</span>
                        <ArrowRight className="w-4 h-4 text-pink-200" />
                      </button>
                      <span className="block text-[10px] text-center text-[#230c1e]/50 font-bold tracking-wider uppercase">
                        Ingen bindningstid • Starta idag
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Mega Dropdown for "Gratis Startguide" --- */}
        <AnimatePresence>
          {activeDropdown === "startguide" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => handleMouseEnter("startguide")}
              onMouseLeave={handleMouseLeave}
              className="hidden lg:block absolute left-[55%] -translate-x-1/2 top-full pt-4.5 -mt-1 w-[50rem] max-w-[calc(100vw-2rem)] z-50"
            >
              <div className="bg-[#FAF8F5] border border-[#fd80ff]/25 rounded-[2.5rem] shadow-[0_30px_90px_-10px_rgba(35,12,30,0.25)] overflow-hidden text-[#230c1e] font-sans">
                <div className="grid grid-cols-2">
                  {/* Left Side: Guide details */}
                  <div className="p-12 bg-[#fff5fc] flex flex-col justify-between">
                    <div className="space-y-5">
                      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center border border-[#fd80ff]/20 shadow-xs">
                        <Sparkles className="w-6 h-6 text-[#fd80ff]" />
                      </div>
                      <h4 className="font-serif text-2xl sm:text-3xl font-bold">
                        Stark & Trygg: Startguide
                      </h4>
                      <p className="text-sm sm:text-[15px] text-[#230c1e]/75 leading-relaxed font-light">
                        En kostnadsfri PDF-guide med de 3 absolut viktigaste nycklarna till trygg styrketräning vid graviditet och smart uppbyggnad efter födsel.
                      </p>
                    </div>

                    <button
                      onClick={() => handleTabClick("startguide")}
                      className="w-full bg-[#230c1e] hover:bg-[#230c1e]/90 text-white font-extrabold text-xs uppercase tracking-wider py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-8 cursor-pointer shadow-md active:scale-98"
                    >
                      Hämta PDF-guide gratis <ArrowRight className="w-4 h-4 text-pink-200" />
                    </button>
                  </div>

                  {/* Right Side: Popular Articles list */}
                  <div className="p-12 bg-white border-l border-[#fd80ff]/15 flex flex-col justify-between">
                    <div className="space-y-5">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#230c1e]/50 block border-b border-stone-100 pb-2">
                        Populärt i Kunskapsarkivet
                      </span>

                      <div className="space-y-5">
                        <div 
                          onClick={() => handleTabClick("articles")}
                          className="group/art cursor-pointer"
                        >
                          <span className="text-[14px] sm:text-[15px] font-black block group-hover/art:text-[#fd80ff] transition-colors leading-snug">
                            Träning & Foglossning
                          </span>
                          <span className="text-xs text-[#230c1e]/60 mt-1 block">3 min läsning • Graviditet</span>
                        </div>

                        <div 
                          onClick={() => handleTabClick("articles")}
                          className="group/art cursor-pointer"
                        >
                          <span className="text-[14px] sm:text-[15px] font-black block group-hover/art:text-[#fd80ff] transition-colors leading-snug">
                            Återhämta nervsystemet efter förlossning
                          </span>
                          <span className="text-xs text-[#230c1e]/60 mt-1 block">5 min läsning • Postpartum</span>
                        </div>

                        <div 
                          onClick={() => handleTabClick("articles")}
                          className="group/art cursor-pointer"
                        >
                          <span className="text-[14px] sm:text-[15px] font-black block group-hover/art:text-[#fd80ff] transition-colors leading-snug">
                            Magmuskeldelning (Diastas): Sanning & Myt
                          </span>
                          <span className="text-xs text-[#230c1e]/60 mt-1 block">4 min läsning • Smart Uppbyggnad</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleTabClick("articles")}
                      className="text-[#fd80ff] hover:text-[#230c1e] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mt-8 transition-colors cursor-pointer self-start"
                    >
                      Visa alla artiklar <BookOpen className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden absolute top-full left-4 right-4 mt-2 border border-stone-200 bg-[#FAF8F5]/95 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl z-55 text-[#230c1e]" 
            id="mobile-drawer"
          >
            <div className="p-4 space-y-3">
              {/* Menu Options */}
              <div className="space-y-1">
                {menuItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.sectionId) {
                          handleSectionClick(item.id, item.sectionId);
                        } else {
                          handleTabClick(item.id);
                        }
                      }}
                      id={`mobile-nav-btn-${item.id}`}
                      className={`flex items-center justify-between w-full px-5 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-[0.14em] transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#230c1e]/5 text-[#230c1e] border border-[#230c1e]/10 font-extrabold"
                          : "text-[#230c1e]/75 hover:bg-white/50 border border-transparent"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <Heart className="w-3 h-3 text-[#fd80ff] fill-[#fd80ff]" />}
                    </button>
                  );
                })}
              </div>


              
              {/* CTAs */}
              <div className="pt-1 flex flex-col gap-2">
                <button
                  onClick={() => handleTabClick("contact")}
                  className="w-full flex items-center justify-center gap-2 bg-white/70 text-[#230c1e] border border-stone-200 font-extrabold text-xs uppercase tracking-[0.14em] py-3.5 rounded-xl transition-all active:scale-98 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-[#fd80ff]" />
                  Kontakta mig
                </button>
                <button
                  onClick={() => handleTabClick("apply")}
                  id="mobile-nav-cta"
                  className="w-full flex items-center justify-center gap-2 bg-[#230c1e] text-white font-extrabold text-xs uppercase tracking-[0.14em] py-3.5 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  <ClipboardCheck className="w-3.5 h-3.5 text-pink-200" />
                  Ansök om coachning nu
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
