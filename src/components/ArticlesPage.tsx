import React, { useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Clock, Tag, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Article } from "../types";
import { getArticles } from "../data";

interface ArticlesPageProps {
  onNavigate: (tabId: string) => void;
  language: "sv" | "en";
}

export default function ArticlesPage({ onNavigate, language }: ArticlesPageProps) {
  const articles = getArticles(language);
  const defaultCategory = language === "sv" ? "Alla" : "All";
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Reset category filter when language changes
  React.useEffect(() => {
    setSelectedCategory(language === "sv" ? "Alla" : "All");
  }, [language]);

  // Sync selected article from landing page
  React.useEffect(() => {
    const handleArticleSelected = () => {
      const artId = localStorage.getItem("torun_selected_article_id");
      if (artId) {
        const found = articles.find((a) => a.id === artId);
        if (found) {
          setSelectedArticle(found);
          localStorage.removeItem("torun_selected_article_id");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    };

    handleArticleSelected();

    window.addEventListener("torun-article-selected", handleArticleSelected);
    return () => {
      window.removeEventListener("torun-article-selected", handleArticleSelected);
    };
  }, [articles]);

  // Framer motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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

  // Translation dictionary
  const text = {
    sv: {
      viewAll: "Visa alla artiklar",
      backHome: "Gå tillbaka till startsidan",
      tag: "HÄLSA PÅ DINA VILLKOR",
      title: "Kunskapsbank & Läslista 🌸",
      subtitle: "Här samlar jag klok vetenskap, artiklar och tankar kring menscykeln, styrketräning för kvinnor, klimakteriet och konsten att bygga en stark, trygg kropp helt utan press och hets.",
      writtenBy: "Skrivet av",
      readMore: "Läs hela artikeln",
      readTimeText: "i lästid",
      writtenWithWarmth: "Skrivet med värme av",
      pullQuote: '"Att leva i harmoni med sin egen biologi och menscykel är inte en begränsning – det är nyckeln till hållbar kraft och genuin rörelseglädje." ♡',
      ctaTag: "Personlig Coaching",
      ctaTitle: "Vill du ta nästa steg med mig? 🤍",
      ctaDesc: "Genom mina program får du träningsupplägg anpassade efter din kropp, menscykel och ditt livspussel. Låt oss bygga din styrka inifrån och ut – helt utan stress eller diethets.",
      ctaBtn: "Utforska mina program",
      backToList: "Tillbaka till alla artiklar"
    },
    en: {
      viewAll: "View all articles",
      backHome: "Return to home page",
      tag: "HEALTH ON YOUR TERMS",
      title: "Knowledge Hub & Reading List 🌸",
      subtitle: "Here I collect sound science, articles, and thoughts around the menstrual cycle, strength training for women, menopause, and the art of building a strong, secure body completely without pressure and stress.",
      writtenBy: "Written by",
      readMore: "Read full article",
      readTimeText: "read time",
      writtenWithWarmth: "Written with warmth by",
      pullQuote: '"Living in harmony with your own biology and menstrual cycle is not a limitation – it is the key to sustainable strength and genuine joy of movement." ♡',
      ctaTag: "Personal Coaching",
      ctaTitle: "Want to take the next step with me? 🤍",
      ctaDesc: "Through my programs, you get workout setups adapted to your body, menstrual cycle, and daily puzzle. Let's build your strength from the inside out – completely without stress or diet pressure.",
      ctaBtn: "Explore my programs",
      backToList: "Back to all articles"
    }
  }[language];

  // Get unique categories
  const categories = [defaultCategory, ...Array.from(new Set(articles.map(a => a.category)))];

  // Filter articles
  const filteredArticles = selectedCategory === defaultCategory 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      {/* Soft branding aurora blobs for background depth */}
      <div className="absolute top-[10%] left-[-10%] w-[40rem] h-[40rem] bg-[#fd80ff]/3 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[35rem] h-[35rem] bg-[#230c1e]/2 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Back navigation button */}
        <div className="mb-6 flex justify-start">
          {selectedArticle ? (
            <button 
              onClick={() => setSelectedArticle(null)}
              className="flex items-center gap-2.5 text-[10px] font-sans font-bold uppercase tracking-[0.16em] text-[#230c1e]/75 bg-white/70 backdrop-blur-md border border-white/85 shadow-xs px-4 py-2.5 rounded-full hover:bg-white hover:text-[#230c1e] hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer select-none"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#fd80ff] stroke-[2.5]" /> {text.viewAll}
            </button>
          ) : (
            <button 
              onClick={() => onNavigate("home")}
              className="flex items-center gap-2.5 text-[10px] font-sans font-bold uppercase tracking-[0.16em] text-[#230c1e]/75 bg-white/70 backdrop-blur-md border border-white/85 shadow-xs px-4 py-2.5 rounded-full hover:bg-white hover:text-[#230c1e] hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer select-none"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#fd80ff] stroke-[2.5]" /> {text.backHome}
            </button>
          )}
        </div>

        <motion.div 
          key={selectedArticle ? "article-detail" : "articles-list"}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/80 p-6 sm:p-10 md:p-12 shadow-xs"
        >
          {!selectedArticle ? (
            /* Articles List Grid View */
            <div className="space-y-12 animate-in fade-in duration-300">
              
              {/* Header Introduction */}
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#fd80ff] uppercase block">
                  {text.tag}
                </span>
                <h1 className="font-serif text-4xl sm:text-[54px] font-normal text-[#230c1e] tracking-wide leading-tight">
                  {text.title}
                </h1>
                <p className="text-[#230c1e]/85 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-sans">
                  {text.subtitle}
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 pb-4 border-b border-stone-200/40">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-[#230c1e] text-white shadow-xs"
                        : "bg-white/80 border border-stone-200/50 text-stone-500 hover:bg-white hover:text-[#230c1e]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <AnimatePresence mode="popLayout">
                  {filteredArticles.map((article) => (
                    <motion.div 
                      layout
                      variants={itemVariants}
                      key={article.id}
                      className="bg-white rounded-[2.5rem] border border-[#f3ebf0] hover:border-[#fd80ff]/30 p-8 sm:p-10 flex flex-col justify-between shadow-[0_15px_50px_-15px_rgba(35,12,30,0.02)] hover:shadow-[0_20px_50px_rgba(253,128,255,0.06)] hover:-translate-y-1 transition-all duration-500 relative overflow-hidden text-left"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#fd80ff]/3 rounded-full filter blur-2xl pointer-events-none" />
                      
                      <div className="space-y-5">
                        <div className="flex justify-between items-center">
                          <span className="inline-flex items-center gap-1.5 bg-white/45 backdrop-blur-md text-[#fd80ff] border border-[#fd80ff]/50 px-3.5 py-1.5 rounded-full text-[9px] font-sans font-extrabold uppercase tracking-widest shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
                            <Tag className="w-3 h-3 text-[#fd80ff]" /> {article.category}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] text-stone-400 font-sans tracking-widest uppercase font-bold">
                            <Clock className="w-3.5 h-3.5" /> {article.readTime}
                          </span>
                        </div>

                        <h3 className="font-serif text-2xl font-normal text-[#230c1e] leading-snug">
                          {article.title}
                        </h3>

                        <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                        <span className="text-[10.5px] text-stone-400 font-sans">
                          {text.writtenBy} <span className="font-signature text-xs text-[#fd80ff] ml-1 tracking-normal align-middle inline-block transform translate-y-[-1px]">Torun</span>
                        </span>
                        <button
                          onClick={() => setSelectedArticle(article)}
                          className="inline-flex items-center gap-1.5 text-[10px] font-sans font-black uppercase tracking-widest text-[#fd80ff] hover:text-[#eb5cf0] transition-colors cursor-pointer"
                        >
                          {text.readMore}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

            </div>
          ) : (
            /* Dedicated Editorial Full Article Reader View */
            <div className="space-y-8 animate-in fade-in duration-500 text-left max-w-3xl mx-auto">
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 bg-white/45 backdrop-blur-md text-[#fd80ff] border border-[#fd80ff]/50 px-3.5 py-1.5 rounded-full text-[9px] font-sans font-extrabold uppercase tracking-widest shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
                    <Tag className="w-3.5 h-3.5 text-[#fd80ff]" /> {selectedArticle.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-stone-400 font-sans tracking-widest uppercase font-bold">
                    <Clock className="w-3.5 h-3.5" /> {selectedArticle.readTime} {text.readTimeText}
                  </span>
                </div>

                <h1 className="font-serif text-3xl sm:text-[44px] font-normal text-[#230c1e] tracking-tight leading-tight">
                  {selectedArticle.title}
                </h1>

                <div className="flex items-center gap-2 font-sans text-stone-400 text-xs pb-4 border-b border-stone-200/40">
                  <span>{text.writtenWithWarmth} <span className="font-signature text-base text-[#fd80ff] ml-1 tracking-normal align-middle inline-block transform translate-y-[-1px]">Torun Wallin</span></span>
                  <Sparkles className="w-3.5 h-3.5 text-[#fd80ff] align-middle" />
                </div>
              </div>

              {/* Editorial Article Body */}
              <div className="space-y-6 text-base sm:text-lg leading-relaxed text-stone-800 font-sans font-normal max-w-2xl">
                {/* Lead intro paragraph */}
                <p className="text-lg sm:text-xl text-stone-900 font-normal italic leading-relaxed">
                  {selectedArticle.content[0]}
                </p>

                {/* Pull-quote decoration */}
                <div className="bg-[#fcf7fa] border-l-4 border-[#fd80ff] p-6 my-6 rounded-r-2xl">
                  <p className="text-sm sm:text-base text-[#230c1e]/90 leading-relaxed italic font-serif">
                    {text.pullQuote}
                  </p>
                </div>

                {/* Rest of the content */}
                {selectedArticle.content.slice(1).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Conversion Box at the bottom */}
              <div className="bg-[#230c1e] rounded-[2.5rem] p-8 sm:p-10 text-white flex flex-col sm:flex-row justify-between items-center gap-6 border border-[#fd80ff]/20 shadow-2xl relative overflow-hidden mt-12">
                <div className="absolute top-0 right-0 w-44 h-44 bg-[#fd80ff]/15 rounded-full filter blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#fd80ff]/10 rounded-full filter blur-3xl pointer-events-none" />
                <div className="space-y-2.5 text-center sm:text-left z-10">
                  <span className="text-[10px] font-sans font-bold tracking-widest text-[#fd80ff] uppercase block">
                    {text.ctaTag}
                  </span>
                  <h4 className="font-serif text-2xl font-normal text-white leading-tight">{text.ctaTitle}</h4>
                  <p className="text-xs text-white/80 font-sans font-light max-w-md leading-relaxed">
                    {text.ctaDesc}
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setSelectedArticle(null);
                    onNavigate("programs");
                  }}
                  className="group relative inline-flex items-center justify-center text-[11px] font-sans font-extrabold uppercase tracking-widest px-8 py-4 rounded-xl transition-all duration-300 cursor-pointer bg-[#fd80ff] hover:bg-[#eb5cf0] text-white border border-[#fd80ff]/25 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] select-none z-10 overflow-hidden"
                >
                  <span className="transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:-translate-x-2.5">
                    {text.ctaBtn}
                  </span>
                  <span className="absolute right-5 opacity-0 scale-50 translate-x-2 transition-all duration-300 ease-[0.16,1,0.3,1] group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white flex-shrink-0" />
                  </span>
                </button>
              </div>

              {/* Close Button block */}
              <div className="pt-6 border-t border-stone-200/40 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="bg-[#230c1e] hover:bg-[#34182d] text-white text-[10px] font-sans font-extrabold uppercase tracking-widest px-8 py-3.5 rounded-full cursor-pointer transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  {text.backToList}
                </button>
              </div>

            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
