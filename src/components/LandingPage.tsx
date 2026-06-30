import React, { useState, useEffect } from "react";
import { 
  Heart, ShieldCheck, Activity, Soup, Calendar, 
  ArrowRight, Sparkles, BookOpen, User, Star, 
  Check, Quote, HelpCircle, Eye, ChevronRight, Bell, Zap, Compass, ArrowUp
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { getPackages, getTestimonials, getArticles } from "../data";
import { Package, Testimonial, Article } from "../types";
import CycleCompass from "./CycleCompass";
import RecoveryWheel from "./RecoveryWheel";
import NourishmentVault from "./NourishmentVault";
import torunMeadow from "../../assets/torun_meadow.jpg";
import torunAppPreview from "../../assets/torun_app_preview.png";

interface LandingPageProps {
  onNavigate: (tabId: string) => void;
  onSelectPackage: (packageId: string) => void;
  language: "sv" | "en";
}

export default function LandingPage({ onNavigate, onSelectPackage, language }: LandingPageProps) {
  const packages = getPackages(language);
  const testimonials = getTestimonials(language);
  const articles = getArticles(language);

  // Framer Motion Scroll Parallax Hook
  const { scrollY, scrollYProgress } = useScroll();
  
  // Parallax ranges for Hero section
  const heroBgY = useTransform(scrollY, [0, 800], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 1400], [1, 0]);
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

  const t = {
    sv: {
      fitnesscoachTag: "✦ FITNESSCOACH FÖR TJEJER & KVINNOR",
      heroTitlePre: "Du behöver inte ",
      heroTitleItalic: "förtjäna",
      heroTitlePost: " din egen kropp.",
      heroSubtitle: "Styrketräning och coaching för kvinnor som vill må bra på riktigt — genom styrka, energi och en kropp som bär dem genom livet.",
      heroParagraph: "För dig som tränat för att straffa, ätit för att kompensera eller tappat bort känslan av att vara på samma lag som din kropp. Här finns en mjukare väg framåt. En plats där du får bygga styrka, skapa hållbara vanor och må bra utan att din relation till kroppen tar över hela ditt liv.",
      heroCtaPrimary: "Hämta din 7-dagars startguide",
      heroCtaSecondary: "Utforska programmen",
      stat1Num: "0%",
      stat1Text: "Krav & Hets",
      stat2Num: "Synkad",
      stat2Text: "Efter menscykel",
      stat3Num: "Mjuk",
      stat3Text: "Återhämtning",
      stat4Num: "Tryggt",
      stat4Text: "Personligt & Tryggt",
      philCardTag: "Personligt & Tryggt",
      philCardTitle: "Min filosofi",
      philCardQuote: '"Jag vill ge dig verktygen att älska din unika kropps fantastiska intelligens. Du tränar inte för att bli mindre – du tränar för att ta mer plats."',
      philCardItalic: "mer plats",
      philCardCoach: "Lic. PT & Kostrådgivare",
      floatCapsule1Title: "Cykel-Synk",
      floatCapsule1Desc: "Synkronisera intensiteten enkelt med alla mensens 4 faser.",
      floatCapsule2Title: "ÖPPET FÖR INTAG",
      floatCapsule2Desc: "Hitta din plats 🎀",
      floatCapsule2Sub: "Börja när du känner dig ready",
      standQuote: '"Att skifta fokus till att lyssna på kroppen istället för pulsklockan har förändrat allt. Att träna på kroppens villkor ger så mycket mer energi och träningsglädje i vardagen!"',
      standQuoteBold1: "lyssna på kroppen",
      standQuoteBold2: "träna på kroppens villkor",
      s2Tag: "KÄRNAN I MIN COACHNING",
      s2Title: "Varför välja en mjukare väg?",
      s2Subtitle: "Jag vägrar att klämma in din unika fysiologi i stela, daterade mallar. Här är grundpelarna för att bygga en kropp som samarbetar med dig.",
      s3Tag: "TRE VÄGAR TILLBAKA",
      s3Title: "Välj din väg hem.",
      s3Subtitle: "Oavsett var du börjar handlar det om samma sak — att hitta tillbaka till en kropp som är trygg, stark och din.",
      s3MatchmakerTitle: "Skapa din personliga hälsoprofil",
      s3MatchmakerSub: "Utan press eller hets",
      s3MatchmakerRecommended: "REKOMMENDERAT MEDLEMSKAP",
      s3MatchmakerChoose: "Välj detta program",
      s3MatchmakerOpt1: "Jag önskar mjuka, djupa 1:1-samtal varannan vecka",
      s3MatchmakerOpt1Desc: "Personlig närvaro och coaching",
      s3MatchmakerOpt2: "Jag vill synka min träning och kost med menscykeln",
      s3MatchmakerOpt2Desc: "Hormonell harmoni & styrka",
      s3MatchmakerOpt3: "Jag är en yngre tjej (15–22 år)",
      s3MatchmakerOpt3Desc: "Träningsglädje utan piska och press",
      s3MatchmakerOpt4: "Jag känner mig väldigt trött eller stressad just nu",
      s3MatchmakerOpt4Desc: "Mjuk nervsystemreglering",
      s3RecommendedBadge: "REKOMMENDERAS ✨",
      s3MatchBadge: "DIN MATCH 🎀",
      s3IncludesHeader: "VAD SOM INGÅR:",
      s3BtnText: "Påbörja din resa",
      s3DetailsLink: "Läs fullständiga detaljer ➔",
      s3ContactPrompt: "Undrar du över detaljer eller har anpassade behov?",
      s3ContactBtn: "Kontakta mig",
      s3ContactOr: " eller skicka din ansökan direkt.",
      s3AppFriszon: "Din digitala friszon",
      s3AppIncludes: "VAD SOM INGÅR I VERKTYGSTLÅDAN:",
      s4Tag: "BIOCENTRERAD VETENSKAP",
      s4Title: "Bärande pelare för din livskraft",
      s4Subtitle: "Jag vägrar att klämma in din unika fysiologi i stela daterade mallar. Jag lyssnar noga och anpassar rörelserna, näringen och vilan efter ditt nervsystems biologiska röst. Välj en pelare nedan för att läsa mer:",
      s4PillarTag: "Mjuk filosofi ♡",
      s4PillarMore: "TORUN bjuder in dig till en långsiktigt hållbar anpassning. Du bär med dig kraften och energin genom alla menscykelns faser eller klimakteriets förändringar med absolut mjukhet och lätthet.",
      s4PillarStat1: "Starkt",
      s4PillarStat2: "Hetsfritt",
      s4PillarStat3: "Skonsamt",
      s4PillarApply: "Ansök om din plats här",
      s5Tag: "DINA INTERAKTIVA VERKTYG",
      s5Title: "Testa din biologi redan idag",
      s5Subtitle: "Här kan du utforska hur din menscykel, din stress och din kost samspelar med din träning. Prova mina skräddarsydda miniräknare och receptkort helt kostnadsfritt.",
      s5CalloutHeader: "VILL DU HA HELA VERKTYGSTLÅDAN?",
      s5CalloutTitle: "Detta är bara ett smakprov på hur du kan börja samarbeta med din kropp.",
      s5CalloutDesc: "Som medlem får du tillgång till hela min digitala portal – där du hittar fullständiga träningsprogram, djupare hormon-analyser, obegränsad tillgång till alla dessa interaktiva verktyg och hundratals recept anpassade efter din unika cykel.",
      s5CalloutBtn: "Bli medlem och lås upp hela din potential 🎀",
      s6Tag: "DIN COACH",
      s6IntroBold: "Jag tror inte att din kropp är ett problem som ska fixas. Jag tror att den är ett hem du har varit borta från ett tag.",
      s6IntroItalic: '"& jag är här för att hjälpa dig hitta tillbaka."',
      s6Paragraph1: "Jag har själv levt i det. I dietkulturen, i kontrollen, i den utmattande jakten på en mindre version av mig själv. I tron att styrka var något jag måste förtjäna — och att vila var något jag skulle straffas för.",
      s6Paragraph2: "Jag hittade tillbaka genom styrketräning. Inte för att den förändrade min kropp — utan för att den förändrade meg. Den lärde mig att äta för att prestera. Att vila är intelligent. Och att kapacitet känns bättre än kontroll.",
      s6Summary: "Det är det jag vill ge vidare. Inte ett program. Inte en quick fix. Utan en mjukare, sundare väg — den jag själv önskar att jag haft.",
      s6PtLabel: "Certifierad PT · Inriktning kvinnors hälsa",
      s6BtnPrograms: "Se programmen",
      s6BtnTiktok: "Följ på TikTok",
      s7Tag: "EN PLATS PER KVARTAL",
      s7Title: "Stark Tjej",
      s7Desc: "Varje kvartal ger jag bort en plats i Stark med Torun till en ung tjej som behöver stöd, trygghet och någon som tror på henne.",
      s7Quote: "Ingen prestation. Ingen press att vara duktig. Bara ett varmt rum att börja om i.",
      s7AgePrompt: "För dig mellan 16–22 år som vill bygga styrka, självkänsla och en snällare relation till kroppen.",
      s7ApplyBtn: "Ansök — för dig själv eller någon du tror på",
      s8Tag: "KUNSKAP & INSPIRATION",
      s8Title: "Träning & hälsa på kroppens villkor",
      s8Subtitle: "Här samlar jag artiklar och enkla tips om hur du tränar smart, lyssnar på dagsformen och hittar en stark och snäll relation till din kropp – helt utan krångel och pekpinnar.",
      s8ReadMore: "Läs artikeln",
      s8AllBtn: "Visa alla artiklar i kunskapsbiblioteket",
      s9Tag: "NYHETSBREVET",
      s9Title: "Stanna kvar",
      s9TitleCursive: "direkt i inkorgen",
      s9Sub: "Få min gratis 7-dagars startguide.",
      s9Desc: "Små steg, träningstips, tankar kring kvinnlig hälsa och påminnelser om att du inte behöver göra allt perfekt för att må bra.",
      s9CursiveFooter: "Bara ett mjukare sätt att börja.",
      s9Success: "Tack för ditt förtroende. Din e-postadress är registrerad och du får min guide och kommande nyhetsbrev. ♡",
      s9Placeholder: "din@mejl.se",
      s9Submit: "Skicka guiden",
      s9Footer: "Du får också mina nyhetsbrev då och då. Avregistrera dig när du vill."
    },
    en: {
      fitnesscoachTag: "✦ FITNESS COACH FOR GIRLS & WOMEN",
      heroTitlePre: "You do not have to ",
      heroTitleItalic: "earn",
      heroTitlePost: " your own body.",
      heroSubtitle: "Strength training and coaching for women who want to feel good for real — through strength, energy, and a body that carries them through life.",
      heroParagraph: "For those who trained to punish, ate to compensate, or lost the feeling of being on the same team as their body. Here is a gentler path forward. A place where you get to build strength, create sustainable habits, and feel good without your relationship with your body taking over your entire life.",
      heroCtaPrimary: "Get your 7-day start guide",
      heroCtaSecondary: "Explore the programs",
      stat1Num: "0%",
      stat1Text: "Pressure & Hype",
      stat2Num: "Synced",
      stat2Text: "With menstrual cycle",
      stat3Num: "Gentle",
      stat3Text: "Recovery",
      stat4Num: "Safe",
      stat4Text: "Personal & Safe",
      philCardTag: "Personal & Safe",
      philCardTitle: "My philosophy",
      philCardQuote: '"I want to give you the tools to love the amazing intelligence of your unique body. You do not train to become smaller – you train to take up more space."',
      philCardItalic: "more space",
      philCardCoach: "Lic. PT & Nutritionist",
      floatCapsule1Title: "Cycle Sync",
      floatCapsule1Desc: "Easily sync intensity with all 4 phases of your menstruation.",
      floatCapsule2Title: "OPEN FOR ENROLLMENT",
      floatCapsule2Desc: "Find your spot 🎀",
      floatCapsule2Sub: "Start when you feel ready",
      standQuote: '"Shifting focus to listening to my body instead of the fitness watch changed everything. Training on the body\'s terms gives so much more energy and joy in daily life!"',
      standQuoteBold1: "listening to my body",
      standQuoteBold2: "training on the body's terms",
      s2Tag: "THE CORE OF MY COACHING",
      s2Title: "Why choose a gentler path?",
      s2Subtitle: "I refuse to squeeze your unique physiology into rigid, dated templates. Here are the cornerstones for building a body that cooperates with you.",
      s3Tag: "THREE PATHS BACK",
      s3Title: "Choose your path home.",
      s3Subtitle: "No matter where you start, it is about the same thing — finding your way back to a body that is safe, strong, and yours.",
      s3MatchmakerTitle: "Create your personal health profile",
      s3MatchmakerSub: "Without pressure or hype",
      s3MatchmakerRecommended: "RECOMMENDED MEMBERSHIP",
      s3MatchmakerChoose: "Select this program",
      s3MatchmakerOpt1: "I wish for gentle, deep 1:1 calls every other week",
      s3MatchmakerOpt1Desc: "Personal presence and coaching",
      s3MatchmakerOpt2: "I want to sync my training and nutrition with my menstrual cycle",
      s3MatchmakerOpt2Desc: "Hormonal harmony & strength",
      s3MatchmakerOpt3: "I am a younger girl (15–22 years)",
      s3MatchmakerOpt3Desc: "Joy of training without whip and pressure",
      s3MatchmakerOpt4: "I feel very tired or stressed right now",
      s3MatchmakerOpt4Desc: "Gentle nervous system regulation",
      s3RecommendedBadge: "RECOMMENDED ✨",
      s3MatchBadge: "YOUR MATCH 🎀",
      s3IncludesHeader: "WHAT'S INCLUDED:",
      s3BtnText: "Begin your journey",
      s3DetailsLink: "Read full details ➔",
      s3ContactPrompt: "Wondering about details or have custom needs?",
      s3ContactBtn: "Contact me",
      s3ContactOr: " or send your application directly.",
      s3AppFriszon: "Your digital safe haven",
      s3AppIncludes: "WHAT'S INCLUDED IN THE TOOLBOX:",
      s4Tag: "BIOCENTERED SCIENCE",
      s4Title: "Supportive pillars for your vitality",
      s4Subtitle: "I refuse to squeeze your unique physiology into rigid dated templates. I listen carefully and adapt movements, nutrition, and rest to the biological voice of your nervous system. Choose a pillar below to read more:",
      s4PillarTag: "Gentle philosophy ♡",
      s4PillarMore: "TORUN invites you to a long-term sustainable adaptation. You carry the power and energy with you through all phases of the cycle or changes of menopause with absolute softness and ease.",
      s4PillarStat1: "Strong",
      s4PillarStat2: "Pressure-free",
      s4PillarStat3: "Gentle",
      s4PillarApply: "Apply for your spot here",
      s5Tag: "YOUR INTERACTIVE TOOLS",
      s5Title: "Test your biology today",
      s5Subtitle: "Here you can explore how your menstrual cycle, your stress, and your nutrition interact with your training. Try my customized calculators and recipe cards completely free of charge.",
      s5CalloutHeader: "WANT THE WHOLE TOOLBOX?",
      s5CalloutTitle: "This is just a taste of how you can start cooperating with your body.",
      s5CalloutDesc: "As a member, you get access to my full digital portal – where you'll find full training programs, deeper hormone analysis, unlimited access to all these interactive tools, and hundreds of recipes customized to your unique cycle.",
      s5CalloutBtn: "Become a member and unlock your full potential 🎀",
      s6Tag: "YOUR COACH",
      s6IntroBold: "I don't believe your body is a problem to be fixed. I believe it is a home you have been away from for a while.",
      s6IntroItalic: '"& I am here to help you find your way back."',
      s6Paragraph1: "I have lived it myself. In the diet culture, in the control, in the exhausting pursuit of a smaller version of myself. Believing that strength was something I had to earn — and that rest was something I should be punished for.",
      s6Paragraph2: "I found my way back through strength training. Not because it changed my body — but because it changed me. It taught me to eat to perform. That rest is intelligent. And that capacity feels better than control.",
      s6Summary: "That is what I want to pass on. Not a program. Not a quick fix. But a gentler, healthier path — the one I wish I had had myself.",
      s6PtLabel: "Certified PT · Focusing on women's health",
      s6BtnPrograms: "See the programs",
      s6BtnTiktok: "Follow on TikTok",
      s7Tag: "ONE SPOT PER QUARTER",
      s7Title: "Strong Girl",
      s7Desc: "Every quarter I give away a spot in Strong with Torun to a young girl who needs support, safety, and someone who believes in her.",
      s7Quote: "No performance. No pressure to be good. Just a warm room to start over in.",
      s7AgePrompt: "For those between 16–22 years who want to build strength, self-esteem, and a kinder relationship with the body.",
      s7ApplyBtn: "Apply — for yourself or someone you believe in",
      s8Tag: "KNOWLEDGE & INSPIRATION",
      s8Title: "Training & health on the body's terms",
      s8Subtitle: "Here I gather articles and simple tips on how to train smart, listen to your daily form, and find a strong and kind relationship with your body – completely without hassle or pointing fingers.",
      s8ReadMore: "Read article",
      s8AllBtn: "Show all articles in the knowledge library",
      s9Tag: "NEWSLETTER",
      s9Title: "Stay in touch",
      s9TitleCursive: "directly in your inbox",
      s9Sub: "Get my free 7-day start guide.",
      s9Desc: "Small steps, training tips, thoughts on female health, and reminders that you don't have to do everything perfectly to feel good.",
      s9CursiveFooter: "Just a gentler way to start.",
      s9Success: "Thank you for your trust. Your email is registered and you will receive my guide and upcoming newsletter. ♡",
      s9Placeholder: "your@email.com",
      s9Submit: "Send guide",
      s9Footer: "You will also get my newsletters now and then. Unsubscribe at any time."
    }
  }[language];

  const pillarsSv = [
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

  const pillarsEn = [
    {
      id: "stark-inifran",
      title: "Strong from Within",
      tagline: "The relationship with yourself",
      icon: ShieldCheck,
      color: "text-[#fd80ff] bg-[#fff5fc] border-[#fd80ff]/20",
      accent: "#fd80ff",
      description: "When you become strong, your relationship with yourself changes. Not because you look different in the mirror – but because you feel different. You take up space. You trust your body. You discover that you can do things you never thought possible.",
      extended: "This is about more than muscle mass – it is about finding an inner safety and capacity that carries you through your entire everyday life and life's shifts with absolute softness."
    },
    {
      id: "ata-for-att-prestera",
      title: "Eat to Perform",
      tagline: "Nourish your body to flourish",
      icon: Soup,
      color: "text-[#230c1e] bg-[#fff5fc] border-[#f5c7fa]/50",
      accent: "#230c1e",
      description: "Food is not the enemy. Food is not a reward. Food is the fuel that lets your body do what it was created to do. Here you learn to eat to flourish — not to shrink.",
      extended: "I throw away dated calorie whips and rigid diets. I teach you to give your thyroid and muscles the nutrition they deserve to keep your energy, mood, and hormone balance in harmony."
    },
    {
      id: "hjartat-forst",
      title: "Heart First",
      tagline: "Healing health, without pressure",
      icon: Heart,
      color: "text-[#fd80ff] bg-[#fff5fc] border-[#fd80ff]/20",
      accent: "#fd80ff",
      description: "I start with the relationship — to training, food, body, and yourself. Because when the heart is in the right place, the rest of the journey becomes so much softer. This is health that heals, not keeps you trapped in control.",
      extended: "Heart first is your invitation to train in cooperation with your nervous system. I adapt demands and intensity according to your daily form so you build your strength without burning out."
    }
  ];

  const pillars = language === "en" ? pillarsEn : pillarsSv;

  // Reset testimonial filter tag when language changes
  useEffect(() => {
    setActiveTestimonialTag(language === "sv" ? "Alla" : "All");
  }, [language]);

  const testimonialTags = language === "sv" 
    ? ["Alla", "Nervsystem", "Hormonbalans", "Klimakteriet", "Träningsglädje", "Äta för att prestera"]
    : ["All", "Nervous System", "Hormone Balance", "Menopause", "Joy of Training", "Eat to Perform"];

  const filteredTestimonials = testimonials.filter(t => {
    const allLabel = language === "sv" ? "Alla" : "All";
    if (activeTestimonialTag === allLabel) return true;
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
    hidden: { opacity: 0, x: -50, scale: 0.98 },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const fRightVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.98 },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08
      }
    }
  };

  return (
    <div className="relative overflow-x-hidden min-h-screen" id="torun-landing-page">
      
      {/* 1. HERO SECTION (Boutique cozy wellness) */}
      <section className="relative min-h-[92vh] sm:min-h-[96vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden select-none bg-gradient-to-b from-[#FFF5FC] via-[#FAF8F5] to-[#ffffff]" id="hero-section">
        
        {/* Organic Morphing Background Shapes */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <motion.div 
            style={{ y: heroBgY }}
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 4, 0],
              x: [0, 15, 0],
              y: [0, -10, 0]
            }}
            transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-15%] w-[55%] aspect-square bg-gradient-to-tr from-[#FFF2FA] to-[#fffbfe] rounded-full filter blur-[100px] opacity-75"
          />
          <motion.div 
            style={{ y: heroBgY }}
            animate={{ 
              scale: [1.02, 0.97, 1.02],
              rotate: [0, -5, 0],
              x: [0, -20, 0],
              y: [0, 15, 0]
            }}
            transition={{ repeat: Infinity, duration: 25, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[-15%] right-[-10%] w-[60%] aspect-square bg-[#FAF6F1] rounded-full filter blur-[110px] opacity-80"
          />
          
          {/* Subtle micro-glows */}
          <div className="absolute top-[35%] right-[20%] w-72 h-72 bg-[#fd80ff]/4 rounded-full filter blur-3xl opacity-40" />
          <div className="absolute bottom-[20%] left-[25%] w-80 h-80 bg-stone-200/20 rounded-full filter blur-3xl opacity-50" />
          
          {/* Floating flower details */}
          <motion.div 
            style={{ y: floatingY1 }}
            animate={{ rotate: [0, 15, 0] }}
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
            {/* Elegant luxury badge */}
            <motion.div 
              variants={fUpVariants}
              className="inline-flex items-center gap-2 bg-[#fff5fc]/90 hover:bg-white text-[#230c1e] border border-pink-200/80 px-4.5 py-1.5 rounded-full text-xs font-semibold tracking-[0.16em] uppercase backdrop-blur-md transition-all shadow-[0_4px_20px_rgba(219,101,162,0.03)] cursor-default"
            >
              <span className="w-1 h-1 rounded-full bg-[#fd80ff]" />
              <span className="font-sans text-xs tracking-[0.12em] font-extrabold text-[#fd80ff]">{t.fitnesscoachTag}</span>
              <span className="w-1 h-1 rounded-full bg-[#fd80ff]" />
            </motion.div>
            
            {/* Elegant Boutique Typography */}
            <motion.h1 
              variants={fUpVariants}
              className="font-display text-4xl sm:text-5xl lg:text-[56px] font-normal tracking-tight text-[#230c1e] leading-[1.15] sm:leading-[1.05]"
            >
              {t.heroTitlePre}
              <span className="font-script text-[#fd80ff]/95 text-[30px] sm:text-[38px] lg:text-[44px] inline-block mx-1 tracking-normal lowercase align-middle">{t.heroTitleItalic}</span> <br />
              {t.heroTitlePost}
            </motion.h1>
            
            <div className="space-y-2.5">
              <motion.p 
                variants={fUpVariants}
                className="text-lg sm:text-xl font-sans font-semibold text-[#230c1e] leading-relaxed max-w-xl"
              >
                {t.heroSubtitle}
              </motion.p>
              
              <motion.p 
                variants={fUpVariants}
                className="text-sm sm:text-base text-[#230c1e]/80 font-normal leading-relaxed max-w-xl font-sans"
              >
                {t.heroParagraph}
              </motion.p>
            </div>

            {/* Premium CTA Buttons */}
            <motion.div 
              variants={fUpVariants}
              className="flex flex-col sm:flex-row gap-3 pt-6 sm:pt-8"
            >
              <button
                onClick={() => onNavigate("startguide")}
                className="group relative inline-flex items-center justify-center text-xs font-sans font-black uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-300 ease-[0.16,1,0.3,1] bg-[#fd80ff] hover:bg-[#eb5cf0] text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.01] cursor-pointer overflow-hidden"
                id="hero-cta-primary"
              >
                <span className="transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:-translate-x-2.5">
                  {t.heroCtaPrimary}
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
                  {t.heroCtaSecondary}
                </span>
                <span className="absolute right-5 opacity-0 scale-50 translate-x-2 transition-all duration-300 ease-[0.16,1,0.3,1] group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-[#230c1e] flex-shrink-0" />
                </span>
              </button>
            </motion.div>

            {/* Soft grid of kind philosophy notes */}
            <div className="pt-6 sm:pt-10 w-full max-w-lg">
              <motion.div 
                variants={fUpVariants}
                className="grid grid-cols-2 sm:grid-cols-4 gap-y-4 sm:gap-y-0 p-3.5 sm:p-4 rounded-xl bg-white border border-pink-100/50 shadow-[0_12px_30px_rgba(35,12,30,0.02)] w-full font-sans items-stretch"
              >
                {/* Stat 1 */}
                <div className="flex flex-col items-center justify-start px-1 text-center border-r border-pink-100/30">
                  <div className="h-8 sm:h-9 flex items-end justify-center">
                    <span className="text-[20px] sm:text-[23px] font-serif font-bold text-[#fd80ff] leading-none">{t.stat1Num}</span>
                  </div>
                  <div className="mt-1.5 h-8 sm:h-9 flex items-start justify-center">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-stone-500 font-extrabold block leading-tight">{t.stat1Text}</span>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="flex flex-col items-center justify-start px-1 text-center sm:border-r border-pink-100/30">
                  <div className="h-8 sm:h-9 flex items-end justify-center">
                    <span className="text-[20px] sm:text-[23px] font-serif font-bold text-[#fd80ff] leading-none">{t.stat2Num}</span>
                  </div>
                  <div className="mt-1.5 h-8 sm:h-9 flex items-start justify-center">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-stone-500 font-extrabold block leading-tight">{t.stat2Text}</span>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col items-center justify-start px-1 text-center border-r border-pink-100/30 pt-2 sm:pt-0">
                  <div className="h-8 sm:h-9 flex items-end justify-center">
                    <span className="text-[20px] sm:text-[23px] font-serif font-bold text-[#fd80ff] leading-none">{t.stat3Num}</span>
                  </div>
                  <div className="mt-1.5 h-8 sm:h-9 flex items-start justify-center">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-stone-500 font-extrabold block leading-tight">{t.stat3Text}</span>
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="flex flex-col items-center justify-start px-1 text-center pt-2 sm:pt-0">
                  <div className="h-8 sm:h-9 flex items-end justify-center">
                    <span className="text-[20px] sm:text-[23px] font-serif font-bold text-[#fd80ff] leading-none">{t.stat4Num}</span>
                  </div>
                  <div className="mt-1.5 h-8 sm:h-9 flex items-start justify-center">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-stone-500 font-extrabold block leading-tight">{t.stat4Text}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Majestic Interactive Visual Stage */}
          <motion.div 
            style={{ y: cardParallaxY, opacity: heroOpacity }}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[360px]" id="hero-interactive-stage">
              {/* iOS glassmorphic Card */}
              <motion.div 
                whileHover={{ y: -5, scale: 1.015, rotate: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-full rounded-[1.75rem] bg-gradient-to-tr from-white/35 to-[#f5c7fa]/20 p-[1.5px] shadow-[0_30px_70px_-15px_rgba(219,101,162,0.06)] relative overflow-hidden group border border-white/20 backdrop-blur-2xl cursor-default" 
                id="hero-philosophy-card"
              >
                <div className="min-h-[430px] lg:min-h-[450px] h-auto w-full rounded-[1.65rem] bg-white/45 overflow-hidden relative flex flex-col justify-between p-5 border border-white/40 shadow-inner backdrop-blur-xl">
                  
                  <div className="flex justify-between items-center">
                    <div className="w-10 h-10 rounded-full bg-white/45 backdrop-blur-md flex items-center justify-center border border-white/60 shadow-sm group-hover:scale-105 transition-transform duration-300">
                      <Heart className="w-4.5 h-4.5 text-[#fd80ff] fill-[#fd80ff] drop-shadow-[0_2px_6px_rgba(253,128,255,0.45)]" />
                    </div>
                    <span className="text-[9.5px] font-sans text-[#fd80ff] bg-white/45 backdrop-blur-md border border-white/60 px-2.5 py-1.5 rounded-full uppercase tracking-wider font-extrabold flex items-center gap-1 shadow-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#fd80ff] animate-ping" />
                      <span>{t.philCardTag}</span>
                      <Heart className="w-2.5 h-2.5 text-[#fd80ff] fill-[#fd80ff] inline-block ml-0.5" />
                    </span>
                  </div>

                  <div className="my-auto py-2.5 space-y-3.5 text-left font-sans">
                    <span className="text-[10px] uppercase font-sans tracking-widest font-black text-[#fd80ff] block">
                      {t.philCardTitle}
                    </span>
                    <blockquote className="font-serif text-lg sm:text-lg lg:text-[19px] text-[#230c1e] italic leading-relaxed tracking-tight font-normal">
                      {language === "sv" ? (
                        <>
                          "Jag vill ge dig verktygen att älska din unika kropps fantastiska intelligens. Du tränar inte för att bli mindre – du tränar för att ta <span className="text-[#fd80ff] underline decoration-[#f5c7fa] decoration-2 underline-offset-4 font-semibold">mer plats</span>."
                        </>
                      ) : (
                        <>
                          "I want to give you the tools to love the amazing intelligence of your unique body. You do not train to become smaller – you train to take up <span className="text-[#fd80ff] underline decoration-[#f5c7fa] decoration-2 underline-offset-4 font-semibold">more space</span>."
                        </>
                      )}
                    </blockquote>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-current text-[#fd80ff]" />
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto border-t border-[#f5c7fa]/30 pt-3 flex items-center gap-3 text-left">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#230c1e] to-[#fd80ff] overflow-hidden flex items-center justify-center text-white border border-white shadow-md">
                      <span className="font-serif text-xs font-bold italic">tw</span>
                    </div>
                    <div>
                      <span className="block font-signature text-sm text-[#fd80ff] tracking-normal leading-none mb-1.5">Torun Wallin</span>
                      <span className="block text-[10px] font-sans text-stone-500 uppercase tracking-widest leading-none mt-0.5">{t.philCardCoach}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Solid White Floating Capsule 1 (Left bottom) */}
              <motion.div 
                style={{ y: floatingY1 }}
                whileHover={{ scale: 1.05, rotate: -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="absolute -bottom-16 -left-4 sm:-bottom-20 sm:-left-6 md:-bottom-12 md:-left-16 lg:-left-24 lg:-bottom-10 bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_15px_35px_rgba(219,101,162,0.03)] hover:shadow-[0_20px_45px_rgba(219,101,162,0.12)] p-4 rounded-2xl text-[10.5px] max-w-[170px] sm:max-w-[185px] space-y-0.5 z-15 transition-shadow duration-300 cursor-default text-left"
                id="hero-floating-capsule-1"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">🌸</span>
                  <p className="font-bold uppercase tracking-widest text-[8px] text-[#fd80ff]">{t.floatCapsule1Title}</p>
                </div>
                <p className="text-[#230c1e] leading-snug font-medium font-sans">{t.floatCapsule1Desc}</p>
              </motion.div>

              {/* Solid White Floating Capsule 2 (Right top) */}
              <motion.div 
                style={{ y: floatingY2 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="absolute -top-16 -right-6 sm:-top-20 sm:-right-8 md:-top-14 md:-right-20 lg:-right-32 lg:-top-16 bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_15px_35px_rgba(219,101,162,0.03)] hover:shadow-[0_20px_45px_rgba(219,101,162,0.08)] w-48 sm:w-52 p-4 rounded-2xl space-y-1 z-15 transition-shadow duration-300 cursor-default text-left"
                id="hero-floating-capsule-2"
              >
                <div className="flex items-center gap-1.5 font-sans">
                  <span className="h-2 w-2 rounded-full bg-[#fd80ff] animate-pulse" />
                  <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-[#fd80ff]">{t.floatCapsule2Title}</span>
                </div>
                <p className="text-xs font-extrabold text-[#230c1e] leading-snug font-sans">{t.floatCapsule2Desc}</p>
                <div className="text-[10px] text-[#230c1e]/75 leading-snug font-medium flex items-center flex-wrap gap-1 font-sans">
                  <span>{t.floatCapsule2Sub}</span>
                  <Heart className="w-3 h-3 text-[#fd80ff] fill-[#fd80ff] inline-block" />
                </div>
              </motion.div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* STANDALONE HERO TESTIMONIAL SECTION */}
      <section className="bg-[#02473E] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="hero-testimonial-section">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#fd80ff]/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="text-6xl sm:text-7xl font-serif text-[#fd80ff] leading-none select-none mb-3">
            “
          </div>

          <blockquote className="font-serif text-2xl sm:text-[28px] lg:text-[33px] text-white/90 leading-relaxed tracking-tight max-w-4xl font-light">
            "Jag har testat flera olika PT-tjänster genom åren, men <span className="text-[#fd80ff] font-medium">det här är det absolut bästa jag har gjort</span>. För första gången känner jag ett genuint lugn och att jag <span className="text-[#fd80ff] font-medium">bygger upp kroppen</span> istället för att straffa den!"
          </blockquote>
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
              {t.s2Tag}
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-light text-[#230c1e] tracking-tight">
              {t.s2Title}
            </h2>
            <p className="text-[#230c1e]/80 text-sm sm:text-base font-sans leading-relaxed max-w-xl mx-auto font-light">
              {t.s2Subtitle}
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 text-left"
          >
            {[
              {
                title: language === "sv" ? "Styrka är medicinen" : "Strength is the medicine",
                desc: language === "sv" 
                  ? "Träning handlar inte om att straffa kroppen eller krympa dig själv. Det handlar om att bygga en stark, trygg kropp som bär dig genom hela livet — på dina egna villkor, helt utan hets, skam eller förbjudna livsmedel."
                  : "Training is not about punishing your body or shrinking yourself. It's about building a strong, safe body that carries you through life — on your own terms, completely free from hype, shame, or forbidden foods.",
                icon: "✦"
              },
              {
                title: language === "sv" ? "Cykel-synk & Nervsystem" : "Cycle-sync & Nervous System",
                desc: language === "sv"
                  ? "Jag anpassar rörelserna, näringen och vilan efter ditt nervsystems biologiska röst och din menscykels naturliga skiftningar. Istället för allt-eller-inget lär du dig träna i samarbete med kroppen – aldrig emot den."
                  : "I adapt movements, nutrition, and rest to the biological voice of your nervous system and the natural shifts of your cycle. Instead of all-or-nothing, you learn to train in cooperation with your body – never against it.",
                icon: "✦"
              },
              {
                title: language === "sv" ? "Vetenskapligt & tryggt" : "Scientific & safe",
                desc: language === "sv"
                  ? "Med djup biologisk förståelse för kvinnans fysiologi (stress, hormoner, graviditet och återhämtning) skapar jag vanor som faktiskt fungerar i ditt riktiga vardagsliv. Träning som ger energi, och mat som ger kraft."
                  : "With a deep biological understanding of female physiology (stress, hormones, pregnancy, and recovery), I create habits that actually work in your real daily life. Training that gives energy, and food that gives power.",
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
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans font-light">
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
              {t.s3Tag}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-light text-[#230c1e] tracking-tight text-center">
              {t.s3Title}
            </h2>
            <p className="text-[#230c1e]/75 text-sm sm:text-base leading-relaxed font-sans font-light text-center">
              {t.s3Subtitle}
            </p>
          </motion.div>
  
          {/* Dynamic Matchmaker Board */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fUpVariants}
            className="glass-panel rounded-4xl p-6 sm:p-10 max-w-5xl mx-auto shadow-2xl space-y-8 relative overflow-hidden text-left"
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#230c1e] via-[#fd80ff] to-[#f5c7fa]" />
            
            <div className="flex items-center justify-between pb-4 border-b border-[#f5c7fa]/25">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fd80ff]" />
                <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-stone-700">{t.s3MatchmakerTitle}</h3>
              </div>
              <span className="text-[10px] font-sans font-bold text-[#fd80ff] uppercase tracking-widest">{t.s3MatchmakerSub}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: "wantsWeeklyCalls", label: t.s3MatchmakerOpt1, desc: t.s3MatchmakerOpt1Desc },
                { key: "needsCycleSync", label: t.s3MatchmakerOpt2, desc: t.s3MatchmakerOpt2Desc },
                { key: "under23", label: t.s3MatchmakerOpt3, desc: t.s3MatchmakerOpt3Desc },
                { key: "exhausted", label: t.s3MatchmakerOpt4, desc: t.s3MatchmakerOpt4Desc }
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
                  <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#fd80ff] block font-medium">{t.s3MatchmakerRecommended}</span>
                  <span className="text-base font-display text-[#230c1e] tracking-wide block mt-0.5 font-medium">
                    {packages.find(p => p.id === currentRecommendationId)?.name} — {packages.find(p => p.id === currentRecommendationId)?.subtitle}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onSelectPackage(currentRecommendationId)}
                className="w-full sm:w-auto bg-[#230c1e] hover:bg-[#3d1534] text-white font-sans text-[12px] tracking-widest font-extrabold uppercase px-11 py-4.5 rounded-full shadow-md transition-all cursor-pointer hover:-translate-y-0.5 active:scale-[0.98]"
              >
                {t.s3MatchmakerChoose}
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
                  onClick={() => {
                    onNavigate("programs");
                    localStorage.setItem("torun_scroll_to_program", pkg.id);
                    window.dispatchEvent(new Event("torun-scroll-to-program-updated"));
                  }}
                  className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 border cursor-pointer hover:scale-[1.01] text-left ${
                    pkg.recommended 
                      ? "border-[#fd80ff]/60 bg-white/55 backdrop-blur-xl shadow-[0_10px_35px_rgba(253,128,255,0.08)] scale-[1.02]" 
                      : "border-white/50 bg-white/25 backdrop-blur-xl shadow-sm hover:border-white/70 hover:bg-white/40"
                  } ${isMatch ? "ring-2 ring-[#fd80ff]/20 ring-offset-2" : ""}`}
                >
                  {/* Recommended badge */}
                  {pkg.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-white/45 backdrop-blur-md text-[#fd80ff] border border-[#fd80ff]/55 px-4.5 py-1.5 rounded-full text-[9.5px] font-sans font-extrabold uppercase tracking-widest shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
                      <Sparkles className="w-3 h-3 text-[#fd80ff] stroke-[2]" /> {t.s3RecommendedBadge}
                    </div>
                  )}

                  {isMatch && !pkg.recommended && (
                    <div className="absolute -top-3 right-4 inline-flex items-center gap-1 bg-white/45 backdrop-blur-md text-[#fd80ff] border border-[#fd80ff]/45 px-3.5 py-1.5 rounded-full text-[8.5px] font-sans font-extrabold uppercase tracking-widest shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
                      {t.s3MatchBadge}
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

                    <p className="text-sm text-stone-600 leading-relaxed font-sans font-light h-auto">
                      {pkg.description}
                    </p>

                    {pkg.outputGoal && (
                      <p className="text-[12px] font-sans font-bold text-[#230c1e] leading-snug bg-[#fff5fc] p-3.5 rounded-2xl border border-[#fd80ff]/10 shadow-3xs">
                        {pkg.outputGoal}
                      </p>
                    )}

                    <div className="border-t border-rose-50 pt-5">
                      <p className="text-[10px] font-sans uppercase tracking-widest font-extrabold text-[#fd80ff] mb-3 block">
                        {t.s3IncludesHeader}
                      </p>
                      <ul className="space-y-2.5 text-sm text-stone-600 font-sans font-light">
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
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectPackage(pkg.id);
                            }}
                            className={`group relative inline-flex items-center justify-center text-sm font-sans font-black uppercase tracking-widest px-12 py-4.5 rounded-full transition-all duration-300 ease-[0.16,1,0.3,1] cursor-pointer hover:-translate-y-0.5 active:scale-[0.98] select-none w-full overflow-hidden ${buttonBgClass}`}
                          >
                            <span className="transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:-translate-x-2.5">
                              {pkg.buttonText || t.s3BtnText}
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
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate("programs");
                              localStorage.setItem("torun_scroll_to_program", pkg.id);
                              window.dispatchEvent(new Event("torun-scroll-to-program-updated"));
                            }}
                            className="w-full text-center text-xs font-sans font-extrabold uppercase tracking-widest text-[#230c1e]/60 hover:text-[#fd80ff] transition-colors cursor-pointer block mt-2 hover:underline outline-none"
                          >
                            {t.s3DetailsLink}
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
                  <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#230c1e] via-[#fd80ff] to-[#f5c7fa]" />
                  <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-bl from-[#fd80ff]/15 to-transparent filter blur-3xl opacity-80 pointer-events-none" />
                  <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-[#f5c7fa]/20 to-transparent filter blur-3xl opacity-80 pointer-events-none" />

                  {/* Left Side: Info & Details */}
                  <div className="flex-1 space-y-8 z-10">
                    <div className="space-y-4">
                      <span className="inline-flex items-center gap-1.5 bg-white/45 backdrop-blur-md text-[#fd80ff] border border-[#fd80ff]/50 px-3.5 py-1.5 rounded-full text-[9px] font-sans font-extrabold uppercase tracking-widest shadow-[0_4px_12px_rgba(0,0,0,0.02)] leading-none w-fit">
                        {language === "sv" ? "KOMMANDE · LANSERAS SNART 💎" : "UPCOMING · LAUNCHING SOON 💎"}
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

                    <div className="space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed font-sans font-light">
                      <p>
                        {appPkg.description}
                      </p>
                      {appPkg.outputGoal && (
                        <div className="text-sm font-sans font-bold text-[#230c1e] leading-relaxed bg-[#fff5fc] p-4.5 rounded-2.5xl border border-[#fd80ff]/15 shadow-2xs relative">
                          <span className="absolute -top-2.5 left-5 bg-white border border-[#fd80ff]/20 text-[#fd80ff] text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-sans font-black">{t.s3AppFriszon}</span>
                          {appPkg.outputGoal.replace("Du kommer få: ", "").replace("You will get: ", "")}
                        </div>
                      )}
                    </div>

                    <div className="border-t border-rose-100/60 pt-6 space-y-4">
                      <span className="text-[10px] font-sans uppercase tracking-widest font-extrabold text-[#fd80ff] block">
                        {t.s3AppIncludes}
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm sm:text-base text-stone-600 font-sans font-light animate-in-fade-slide">
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
                        className="group relative inline-flex items-center justify-center text-sm font-sans font-black uppercase tracking-widest px-12 py-4.5 rounded-full transition-all duration-300 ease-[0.16,1,0.3,1] cursor-pointer bg-[#02473E] hover:bg-[#012d27] text-white border border-transparent shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] select-none w-full sm:w-auto overflow-hidden"
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

                  {/* Right Side: App Mockup */}
                  <div className="w-full lg:w-[440px] shrink-0 z-10 self-center">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#fd80ff]/20 to-[#f5c7fa]/20 rounded-[2.7rem] translate-x-3.5 translate-y-3.5 -z-10 blur-xl group-hover:scale-105 transition-transform duration-500" />
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

          <div className="text-center pt-4 font-sans text-xs text-stone-500">
            <p>
              {t.s3ContactPrompt}{" "}
              <button onClick={() => onNavigate("contact")} className="text-[#fd80ff] underline font-sans font-semibold tracking-wider cursor-pointer">
                {t.s3ContactBtn}
              </button>
              {t.s3ContactOr}
            </p>
          </div>
        </div>
      </section>

      {/* 3. BIOCENTRERAD VETENSKAP (PHILOSOPHY SECTION) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-b border-[#f5c7fa]/25 relative overflow-hidden" id="philosophy-section">
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
              {t.s4Tag}
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-light text-[#230c1e] tracking-tight">
              {t.s4Title}
            </h2>
            <p className="text-[#230c1e]/80 text-sm sm:text-base font-sans leading-relaxed max-w-xl mx-auto font-light">
              {t.s4Subtitle}
            </p>
          </motion.div>
 
          {/* Interactive Pillars Grid */}
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
                    <div className="font-sans">
                      <h3 className="text-xs font-black text-[#230c1e] uppercase tracking-widest flex items-center gap-2">
                        {pillar.title}
                        {isSelected && <Sparkles className="w-3.5 h-3.5 text-[#fd80ff] animate-pulse" />}
                      </h3>
                      <p className="text-xs text-stone-500 font-sans mt-0.5">{pillar.tagline}</p>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
 
            {/* Right Detailed Card */}
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
                      className="h-full bg-white/40 backdrop-blur-xl border border-white/60 p-8 sm:p-10 rounded-4xl shadow-lg flex flex-col justify-between relative overflow-hidden text-left"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#fd80ff]/5 rounded-full filter blur-xl" />
                      
                      <div className="space-y-6 relative z-10 font-sans">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${pillar.color}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-[10px] font-sans uppercase font-extrabold text-[#fd80ff] tracking-widest block">{t.s4PillarTag}</span>
                            <h3 className="font-display text-2xl font-normal text-[#230c1e] tracking-wide">{pillar.title}</h3>
                          </div>
                        </div>

                        <p className="text-[#230c1e] text-lg sm:text-lg font-serif italic leading-relaxed border-l-2 border-[#fd80ff] pl-4 py-1">
                          "{pillar.description}"
                        </p>

                        <div className="space-y-4 text-xs sm:text-sm text-[#230c1e]/80 leading-relaxed font-sans font-light">
                          <p>{pillar.extended}</p>
                          <p>{t.s4PillarMore}</p>
                        </div>
                      </div>

                      <div className="pt-8 mt-8 border-t border-[#f5c7fa]/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
                        <div className="flex flex-wrap gap-1.5 font-sans">
                          <span className="inline-flex items-center gap-1.5 bg-white/45 backdrop-blur-md text-[#fd80ff] border border-[#fd80ff]/50 px-3.5 py-1.5 rounded-full text-[9px] font-sans font-extrabold uppercase tracking-widest shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
                            {t.s4PillarStat1}
                          </span>
                          <span className="text-[9px] text-[#230c1e] font-sans font-bold uppercase tracking-widest bg-emerald-50/50 border border-[#230c1e]/20 px-3 py-1 rounded-full">
                            {t.s4PillarStat2}
                          </span>
                          <span className="text-[9px] text-stone-700 font-sans font-bold uppercase tracking-widest bg-stone-50 border border-stone-200 px-3 py-1 rounded-full">
                            {t.s4PillarStat3}
                          </span>
                        </div>
                        <button 
                          onClick={() => onNavigate("apply")}
                          className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-[#230c1e] hover:text-[#fd80ff] flex items-center gap-1.5 group select-none cursor-pointer"
                        >
                          {t.s4PillarApply}
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
              {t.s5Tag}
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-light text-[#230c1e] tracking-tight">
              {t.s5Title}
            </h2>
            <p className="text-[#230c1e]/80 text-sm sm:text-base font-sans leading-relaxed max-w-xl mx-auto font-light font-sans">
              {t.s5Subtitle}
            </p>
          </motion.div>

          {/* Dashboard Tab Selector */}
          <div className="flex justify-center mb-8 relative z-20">
            <div className="bg-white/45 backdrop-blur-md border border-[#fd80ff]/20 p-1.5 rounded-full inline-flex gap-1.5 shadow-[0_8px_30px_rgba(219,101,162,0.03)] max-w-full overflow-x-auto no-scrollbar">
              {[
                { id: "compass", label: language === "sv" ? "Hormon- & Träningskompassen" : "Hormone & Training Compass", icon: Calendar, targetId: "cycle-sync-compass" },
                { id: "wheel", label: language === "sv" ? "Dagsformshjulet" : "Daily Form Wheel", icon: Activity, targetId: "dagsforms-hjul" },
                { id: "vault", label: language === "sv" ? "Kostrecepten" : "Nourishment Vault", icon: Soup, targetId: "recept-valv" }
              ].map((tabInfo) => {
                const isActive = activeTool === tabInfo.id;
                const Icon = tabInfo.icon;
                return (
                  <button
                    key={tabInfo.id}
                    onClick={() => {
                      setActiveTool(tabInfo.id as "compass" | "wheel" | "vault");
                      localStorage.setItem("torun_active_tool_tab", tabInfo.targetId);
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
                    <span>{tabInfo.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Tool View */}
          <div className="relative min-h-[500px]" id="tools-dashboard-view">
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
                  <CycleCompass language={language} />
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
                  <RecoveryWheel language={language} />
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
                  <NourishmentVault language={language} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 5. PORTAL CALLOUT BANNER */}
          <div className="pt-16 max-w-4xl mx-auto border-t border-[#f5c7fa]/15 mt-16" id="portal-section">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fUpVariants}
              className="bg-white/70 backdrop-blur-md border border-[#fd80ff]/15 rounded-[2.5rem] p-8 sm:p-12 text-[#230c1e] text-center relative overflow-hidden shadow-[0_15px_35px_rgba(219,101,162,0.03)] animate-in-fade-slide"
            >
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#fd80ff]/5 rounded-full filter blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#fd80ff] block">
                  {t.s5CalloutHeader}
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-light tracking-tight text-[#230c1e] leading-[1.2] text-center">
                  {t.s5CalloutTitle}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans font-light max-w-xl mx-auto text-center">
                  {t.s5CalloutDesc}
                </p>
                
                <div className="pt-4">
                  <button 
                    onClick={() => onNavigate("programs")}
                    className="group bg-[#fd80ff] hover:bg-[#eb5cf0] text-white text-[11px] font-sans font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all cursor-pointer shadow-md hover:-translate-y-0.5 active:scale-98"
                  >
                    {t.s5CalloutBtn}
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
          
          {/* Left Column: Photo Box */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fLeftVariants}
              className="relative w-full max-w-sm"
            >
              <div className="absolute top-1/4 -left-6 w-48 bg-[#f5c7fa]/20 aspect-square rounded-full filter blur-3xl pointer-events-none" />
              <div className="absolute bottom-10 -right-6 w-48 bg-[#fd80ff]/5 aspect-square rounded-full filter blur-3xl pointer-events-none" />
              
              <div className="absolute inset-0 border border-[#230c1e]/15 rounded-[2.5rem] translate-x-4 translate-y-4 -z-10" />

              <div className="bg-white rounded-[2.5rem] p-1.5 border border-[#230c1e]/10 relative z-10 overflow-hidden shadow-[0_20px_50px_rgba(35,12,30,0.06)] group">
                <div className="aspect-[4/5] bg-stone-100 relative overflow-hidden rounded-[2.4rem] flex items-center justify-center">
                  <img 
                    src={torunMeadow} 
                    alt="Torun Wallin" 
                    className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-[0.16,1,0.3,1]"
                  />
                </div>
              </div>

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
            <div className="flex items-center gap-2 font-sans font-bold uppercase tracking-widest text-[#230c1e]/60 text-[10px]">
              <div className="h-[1px] w-8 bg-[#230c1e]/20" />
              <span>{t.s6Tag}</span>
              <div className="h-[1px] w-8 bg-[#230c1e]/20" />
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#230c1e] tracking-tight leading-tight">
              {language === "sv" ? "Hej, jag är " : "Hi, I am "}
              <span className="font-signature text-[#fd80ff] text-3xl sm:text-5xl ml-1 tracking-normal">Torun.</span>
            </h2>
            
            <p className="font-sans text-sm sm:text-base font-bold text-[#230c1e] leading-relaxed">
              {t.s6IntroBold}
            </p>

            <div className="border-l-2 border-[#fd80ff]/80 pl-4 py-1 italic font-serif text-lg sm:text-xl text-[#230c1e] leading-relaxed my-4">
              {t.s6IntroItalic}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-[#230c1e]/80 leading-relaxed font-sans font-light">
              <p>
                {language === "sv" ? (
                  <>
                    Jag har själv levt i det. I <span className="font-mono bg-[#230c1e]/5 px-1 py-0.5 rounded text-[11px] font-bold text-[#230c1e]">dietkulturen</span>, i kontrollen, i den utmattande jakten på en mindre version av mig själv. I tron att styrka var något jag måste förtjäna — och att vila var något jag skulle straffas för.
                  </>
                ) : (
                  <>
                    I have lived in it myself. In the <span className="font-mono bg-[#230c1e]/5 px-1 py-0.5 rounded text-[11px] font-bold text-[#230c1e]">diet culture</span>, in the control, in the exhausting pursuit of a smaller version of myself. Believing that strength was something I had to earn — and that rest was something I should be punished for.
                  </>
                )}
              </p>
              <p>
                {language === "sv" ? (
                  <>
                    Jag hittade tillbaka genom <span className="font-mono bg-[#230c1e]/5 px-1 py-0.5 rounded text-[11px] font-bold text-[#230c1e]">styrketräning</span>. Inte för att den förändrade min kropp — utan för att den förändrade mig. Den lärde mig att äta för att prestera. Att vila är intelligent. Och att kapacitet känns bättre än kontroll.
                  </>
                ) : (
                  <>
                    I found my way back through <span className="font-mono bg-[#230c1e]/5 px-1 py-0.5 rounded text-[11px] font-bold text-[#230c1e]">strength training</span>. Not because it changed my body — but because it changed me. It taught me to eat to perform. That rest is intelligent. And that capacity feels better than control.
                  </>
                )}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#230c1e]/90 leading-relaxed font-sans font-light">
              {t.s6Summary}
            </p>

            <div className="flex items-center gap-2 text-[#230c1e]/40 text-[10px] font-sans font-bold uppercase tracking-widest pt-2">
              <div className="h-[1px] w-6 bg-[#230c1e]/10" />
              <span>{t.s6PtLabel}</span>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <button 
                onClick={() => onNavigate("programs")}
                className="group relative inline-flex items-center justify-center text-[10px] font-sans font-black uppercase tracking-widest px-8 py-3.5 rounded-full cursor-pointer bg-[#fd80ff] hover:bg-[#eb5cf0] text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-98 select-none overflow-hidden transition-all duration-300"
              >
                <span className="inline-block transition-transform duration-300 group-hover:-translate-x-2.5">
                  {t.s6BtnPrograms}
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
                <span className="absolute left-5 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 w-4 h-4 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#230c1e]">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.99-1.72-.28-.24-.53-.5-.77-.78-.07 1.93-.03 3.85-.04 5.78-.04 2.63-.84 5.34-2.81 7.11-2.02 1.84-4.9 2.58-7.56 2.09-2.73-.47-5.26-2.45-6.19-5.11-.99-2.79-.47-6.08 1.44-8.37 1.78-2.16 4.67-3.12 7.37-2.58v4.18c-1.39-.42-2.99-.08-4.06.87-.99.86-1.43 2.29-1.2 3.58.21 1.22.99 2.36 2.1 2.87 1.34.63 3.09.47 4.14-.42.92-.72 1.38-1.87 1.37-3.05.02-4.46.01-8.91.01-13.37z" />
                  </svg>
                </span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-2.5">
                  {t.s6BtnTiktok}
                </span>
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4.5 STARK TJEJ GIVEAWAY SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]" id="giveaway-section">
        <div className="max-w-4xl mx-auto animate-in-fade-slide">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fUpVariants}
            className="bg-white border border-stone-200/50 rounded-[2.5rem] p-8 sm:p-12 shadow-xs relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#230c1e_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="space-y-6 text-center relative z-10">
              <div className="flex items-center justify-center gap-4 text-[10px] font-sans font-bold tracking-widest text-[#fd80ff]">
                <span className="h-[1px] w-8 sm:w-16 bg-[#fd80ff]/30"></span>
                <span>{t.s7Tag}</span>
                <span className="h-[1px] w-8 sm:w-16 bg-[#fd80ff]/30"></span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl font-light text-[#230c1e] tracking-tight flex items-center justify-center gap-2.5">
                {t.s7Title} <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-[#fd80ff] fill-none stroke-[1.5]" />
              </h2>
              
              <p className="font-sans text-base sm:text-lg lg:text-xl text-stone-700 max-w-3xl mx-auto leading-relaxed font-light">
                {t.s7Desc}
              </p>
              
              <div className="bg-stone-100/50 border border-stone-200/40 p-5.5 rounded-2xl max-w-2xl mx-auto font-mono text-sm sm:text-base text-stone-700 shadow-2xs leading-relaxed font-bold">
                {t.s7Quote}
              </div>

              <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed font-light">
                {t.s7AgePrompt}
              </p>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate("apply")}
                  className="group relative inline-flex items-center justify-center text-[14.5px] sm:text-[16px] font-serif font-normal tracking-wide px-8 py-3.5 rounded-full transition-all duration-300 ease-[0.16,1,0.3,1] cursor-pointer bg-[#fd80ff] hover:bg-[#eb5cf0] text-white border border-white/20 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] select-none overflow-hidden"
                >
                  <span className="transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:-translate-x-2.5">
                    {t.s7ApplyBtn}
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
              {t.s8Tag}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#230c1e] tracking-tight text-center">
              {t.s8Title}
            </h2>
            <p className="text-[#230c1e]/80 text-xs sm:text-sm font-sans font-light leading-relaxed max-w-lg mx-auto text-center font-sans">
              {t.s8Subtitle}
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
                onClick={() => {
                  localStorage.setItem("torun_selected_article_id", article.id);
                  window.dispatchEvent(new Event("torun-article-selected"));
                  onNavigate("articles");
                }}
                className="bg-white/20 hover:bg-white/40 border border-white/50 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:shadow-lg transition-all duration-300 backdrop-blur-md text-left cursor-pointer hover:-translate-y-0.5 group/card"
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

                  <h3 className="font-sans text-sm font-black uppercase tracking-widest text-[#230c1e] leading-snug group-hover/card:text-[#fd80ff] transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-sm text-stone-600 leading-relaxed font-sans font-light">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-neutral-100/55 flex justify-end">
                  <span
                    className="text-[10px] font-sans font-black uppercase tracking-widest text-[#fd80ff] group-hover/card:text-[#e472e6] flex items-center gap-1.5 select-none"
                  >
                    {t.s8ReadMore}
                    <ArrowRight className="w-3.5 h-3.5 text-[#fd80ff] group-hover/card:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center pt-10">
            <button
              onClick={() => onNavigate("articles")}
              className="group relative inline-flex items-center justify-center gap-0 hover:gap-2.5 text-[10px] font-sans font-black uppercase tracking-widest px-7 hover:px-9 py-3.5 rounded-full transition-all duration-300 ease-[0.16,1,0.3,1] cursor-pointer bg-[#02473E] hover:bg-[#012d27] text-white border border-white/20 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] select-none"
            >
              <span>{t.s8AllBtn}</span>
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
                aria-label="Close article"
              >
                ×
              </button>
              
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 bg-white/45 backdrop-blur-md text-[#fd80ff] border border-[#fd80ff]/50 px-3.5 py-1.5 rounded-full text-[9px] font-sans font-extrabold uppercase tracking-widest shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
                    {selectedArticle.category}
                  </span>
                  <span className="text-xs text-stone-400 font-sans tracking-widest uppercase font-medium">
                    {selectedArticle.readTime}
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
                    {language === "sv" ? "Stäng artikel" : "Close article"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. SOFT PREMIUM NEWSLETTER SIGNUP */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]" id="newsletter-section">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fUpVariants}
          className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md border border-[#fd80ff]/15 rounded-[2.5rem] p-8 sm:p-12 text-[#230c1e] relative overflow-hidden shadow-[0_15px_35px_rgba(219,101,162,0.04)] text-center"
        >
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#fd80ff]/5 rounded-full filter blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#02473E] block">
              {t.s9Tag}
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[#230c1e] leading-[1.1] text-center">
              {t.s9Title} <br />
              <span className="font-script text-[#02473E] text-2xl sm:text-3xl my-1.5 tracking-normal lowercase flex items-center justify-center gap-2">
                {t.s9TitleCursive} <Heart className="w-5 h-5 text-[#02473E] fill-none stroke-[1.5]" />
              </span>
            </h2>
            <p className="font-serif italic text-base sm:text-lg font-bold text-[#fd80ff] tracking-normal text-center">
              {t.s9Sub}
            </p>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans font-light max-w-lg mx-auto text-center font-sans">
              {t.s9Desc}
              <span className="block mt-4 font-serif italic font-medium text-stone-600">{t.s9CursiveFooter}</span>
            </p>

            {isNewsletterSubscribed ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#fff5fc] border border-[#fd80ff]/20 p-5 rounded-2xl text-center"
              >
                <span className="text-xs font-sans font-semibold text-[#fd80ff]">{t.s9Success}</span>
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
                  placeholder={t.s9Placeholder}
                  className="bg-white border border-stone-200 rounded-full px-6 py-3.5 text-xs text-[#230c1e] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:border-transparent flex-grow text-center sm:text-left font-sans"
                />
                <button 
                  type="submit"
                  className="group relative inline-flex items-center justify-center gap-1.5 text-[10px] font-sans font-black uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-300 ease-[0.16,1,0.3,1] cursor-pointer bg-[#fd80ff] hover:bg-[#eb5cf0] text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] select-none overflow-hidden"
                >
                  <span className="flex items-center gap-1.5 font-sans">
                    {t.s9Submit} <Heart className="w-3 h-3 text-white fill-none stroke-[2]" />
                  </span>
                </button>
              </form>
            )}
            
            <p className="text-[10px] text-stone-400 font-sans mt-2 text-center">
              {t.s9Footer}
            </p>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
