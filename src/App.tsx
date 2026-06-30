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
import { ArrowUp } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [selectedPackageId, setSelectedPackageId] = useState<string>("");
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [language, setLanguage] = useState<"sv" | "en">("sv");

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
  const handleSelectPackage = (packageId: string) => {
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
    </div>
  );
}
