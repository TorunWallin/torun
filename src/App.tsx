import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import StartGuide from "./components/StartGuide";
import ProgramsPage from "./components/ProgramsPage";
import ApplicationForm from "./components/ApplicationForm";
import TorunAiChat from "./components/TorunAiChat";
import ArticlesPage from "./components/ArticlesPage";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp, Check } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [selectedPackageId, setSelectedPackageId] = useState<string>("");
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [language, setLanguage] = useState<"sv" | "en">("sv");
  const [showKickstartSuccess, setShowKickstartSuccess] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("kickstart_success") === "true") {
      setShowKickstartSuccess(true);
      if (typeof window !== "undefined" && (window as any).pintrk) {
        (window as any).pintrk('track', 'checkout', {
          value: 795,
          currency: 'SEK'
        });
      }
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Listen to window scroll to toggle scroll-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Custom callback when navigating to tabs generally
  const handleNavigateToTab = (tabId: string) => {
    if (tabId === "apply") {
      setSelectedPackageId("");
    }
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Custom callback when client clicks on a package pricing card
  const handleSelectPackage = async (packageId: string) => {
    if (packageId === "kickstart") {
      try {
        const res = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          alert("Kunde inte starta betalning för Kickstart. Försök igen eller kontakta mig.");
        }
      } catch (err) {
        console.error(err);
        alert("Ett nätverksfel uppstod. Kontrollera din anslutning och försök igen.");
      }
      return;
    }

    setSelectedPackageId(packageId);
    setActiveTab("apply");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#ffffff] text-[#09090b] selection:bg-[#a855f7]/20 selection:text-[#09090b]" id="torun-app-orchestrator">
      {/* Floating Top Navigation Header */}
      <Navigation activeTab={activeTab} setActiveTab={handleNavigateToTab} language={language} setLanguage={setLanguage} />

      {/* Main Panel views */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {(activeTab === "home" || activeTab === "packages" || activeTab === "about") && (
              <LandingPage 
                onNavigate={handleNavigateToTab} 
                onSelectPackage={handleSelectPackage} 
                language={language}
              />
            )}
            {activeTab === "programs" && (
              <ProgramsPage 
                onNavigate={handleNavigateToTab}
                onSelectPackage={handleSelectPackage}
                language={language}
              />
            )}
            {activeTab === "startguide" && (
              <StartGuide onNavigate={handleNavigateToTab} language={language} />
            )}
            {activeTab === "apply" && (
              <ApplicationForm 
                selectedPackageId={selectedPackageId} 
                onNavigate={handleNavigateToTab}
                language={language}
              />
            )}
            {activeTab === "contact" && (
              <ContactForm onNavigate={handleNavigateToTab} language={language} />
            )}
            {activeTab === "chat" && (
              <TorunAiChat />
            )}
            {activeTab === "articles" && (
              <ArticlesPage onNavigate={handleNavigateToTab} language={language} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onNavigate={handleNavigateToTab} language={language} />

      {/* Elegantly floating scroll-to-top button (Active globally across all pages, with highest z-index) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scrollTopBtn"
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-70 w-11 h-11 bg-white text-[#230c1e] hover:bg-[#230c1e] hover:text-white border border-stone-200/60 rounded-full flex items-center justify-center shadow-[0_12px_36px_rgba(2,71,62,0.12)] hover:shadow-[0_15px_30px_rgba(253,128,255,0.22)] transition-all duration-300 active:scale-95 cursor-pointer outline-none"
            title="Skrolla till toppen"
          >
            <ArrowUp className="w-4.5 h-4.5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Stripe payment success modal overlay */}
      <AnimatePresence>
        {showKickstartSuccess && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-[#230c1e]/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-[2.5rem] p-8 sm:p-10 max-w-md w-full shadow-2xl border border-white/60 text-center space-y-6 relative overflow-hidden font-sans"
            >
              {/* Soft decorative background circles */}
              <div className="absolute -right-16 -top-16 w-36 h-36 rounded-full bg-[#fff5fc] -z-10 blur-xl opacity-80" />
              <div className="absolute -left-16 -bottom-16 w-36 h-36 rounded-full bg-pink-50/50 -z-10 blur-xl opacity-80" />

              <div className="w-16 h-16 rounded-full bg-pink-50 border border-pink-100 text-[#fd80ff] flex items-center justify-center mx-auto text-3xl font-light shadow-sm">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#fd80ff]">BETALNING BEKRÄFTAD 💎</span>
                <h2 className="text-xl sm:text-2xl font-display font-light text-[#230c1e] leading-snug">
                  Välkommen till Kickstart! 🎀
                </h2>
                <p className="text-[#230c1e]/80 text-xs sm:text-[13px] leading-relaxed font-light">
                  Din betalning via Stripe har genomförts och du har nu direkt tillgång! Ett bekräftelsemejl har skickats till dig med instruktioner för hur du loggar in i Everfit-appen och startar ditt program.
                </p>
              </div>

              <div className="bg-[#fafafa] border border-stone-100 p-4 rounded-2xl text-left space-y-1">
                <span className="text-[9px] font-sans uppercase font-black text-[#fd80ff] tracking-wider block">Vad händer nu?</span>
                <ul className="text-xs text-[#230c1e]/90 space-y-1.5 list-disc pl-4 font-light">
                  <li>Kolla din e-post (och eventuellt skräppost) efter inloggningslänken.</li>
                  <li>Ladda ner Everfit-appen och logga in med din e-post.</li>
                  <li>Ditt program och dina första träningspass ligger färdiga i appen!</li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => setShowKickstartSuccess(false)}
                className="w-full py-3.5 bg-[#230c1e] hover:bg-[#3d1534] text-white text-[11px] font-sans font-extrabold uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-[0.99]"
              >
                Kom igång nu
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
