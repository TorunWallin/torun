import React, { useState } from "react";
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

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [selectedPackageId, setSelectedPackageId] = useState<string>("");

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
      <Navigation activeTab={activeTab} setActiveTab={handleNavigateToTab} />

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
              />
            )}
            {activeTab === "programs" && (
              <ProgramsPage 
                onNavigate={handleNavigateToTab}
                onSelectPackage={handleSelectPackage}
              />
            )}
            {activeTab === "startguide" && (
              <StartGuide onNavigate={handleNavigateToTab} />
            )}
            {activeTab === "apply" && (
              <ApplicationForm 
                selectedPackageId={selectedPackageId} 
                onNavigate={handleNavigateToTab}
              />
            )}
            {activeTab === "contact" && (
              <ContactForm onNavigate={handleNavigateToTab} />
            )}
            {activeTab === "chat" && (
              <TorunAiChat />
            )}
            {activeTab === "articles" && (
              <ArticlesPage onNavigate={handleNavigateToTab} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onNavigate={handleNavigateToTab} />
    </div>
  );
}
