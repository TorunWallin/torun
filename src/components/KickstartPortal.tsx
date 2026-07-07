import React, { useState, useEffect } from "react";
import { 
  Lock, Play, Check, Calendar, Activity, Soup, BookOpen, ArrowRight, ArrowLeft,
  Download, Save, FileText, Sparkles, ChevronRight, Moon, ShieldAlert, Award, Dumbbell,
  Video, Eye, Heart
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import torunMeadow from "../../assets/torun_meadow.jpg";
import torunDock from "../../assets/torun_dock.jpg";

interface KickstartPortalProps {
  onNavigate: (tabId: string) => void;
  language: "sv" | "en";
}

export default function KickstartPortal({ onNavigate, language }: KickstartPortalProps) {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [activePortalTab, setActivePortalTab] = useState<"welcome" | "workouts" | "videos" | "diary">("welcome");
  
  // Workouts version toggle: true = hemma, false = gym
  const [isHomeVersion, setIsHomeVersion] = useState(true);
  
  // Active day selection in daily videos calendar
  const [selectedDay, setSelectedDay] = useState<number>(1);
  
  // Text state for daily reflection
  const [reflectionText, setReflectionText] = useState("");
  const [reflectionSavedMessage, setReflectionSavedMessage] = useState(false);
  
  // Active exercise to show in video modal
  const [activeExerciseVideo, setActiveExerciseVideo] = useState<{ name: string; desc: string; videoUrl?: string } | null>(null);
  const [isPlayingExerciseVideo, setIsPlayingExerciseVideo] = useState(false);
  const [isPlayingCoachingVideo, setIsPlayingCoachingVideo] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const isAuth = localStorage.getItem("torun_kickstart_authorized") === "true";
    if (isAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch saved reflection whenever selectedDay changes
  useEffect(() => {
    const saved = localStorage.getItem(`torun_kickstart_reflection_${selectedDay}`) || "";
    setReflectionText(saved);
    setReflectionSavedMessage(false);
  }, [selectedDay]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = passcode.trim().toUpperCase();
    if (cleanCode === "KICKSTART2026" || cleanCode === "KICKSTART_MJUK" || cleanCode === "KICKSTART") {
      localStorage.setItem("torun_kickstart_authorized", "true");
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError(language === "sv" 
        ? "Felaktig accesskod. Vänligen kontrollera koden i ditt bekräftelsemejl."
        : "Invalid passcode. Please check the code in your confirmation email."
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("torun_kickstart_authorized");
    setIsAuthenticated(false);
    setPasscode("");
  };

  const handleSaveReflection = () => {
    localStorage.setItem(`torun_kickstart_reflection_${selectedDay}`, reflectionText);
    setReflectionSavedMessage(true);
    setTimeout(() => {
      setReflectionSavedMessage(false);
    }, 3000);
  };

  // Content dictionaries
  const t = {
    sv: {
      loginTitle: "Medlemsinloggning",
      loginSub: "KICKSTART PROGRAMPORTAL",
      loginDesc: "Välkommen till din personliga oas! Skriv in den accesskod du fick i ditt bekräftelsemejl från Stripe för att låsa upp programhandboken, dina 28 coachingvideor och träningspassen.",
      passcodePlaceholder: "Skriv din kod här...",
      loginBtn: "Lås upp portalen",
      buyPrompt: "Saknar du en kod? Kickstart är en 4-veckors handbok och träningsplan för dig som vill komma igång med rörelseglädje helt utan press.",
      readMoreBtn: "Läs mer & köp programmet",
      logoutBtn: "Logga ut",
      
      tabWelcome: "Välkommen & Handbok",
      tabWorkouts: "Träningsprogram",
      tabVideos: "28 Dagars Coaching",
      tabDiary: "Min Reflektionsbok",
      
      welcomeTitle: "Välkommen hem till dig själv",
      welcomeIntro: "Tack för att du valde att ge dig själv det här. Det här programmet är till för dig som vill ta små, snälla steg tillbaka till träningen – eller börja på ett sätt som känns hållbart och fint. Inget stort hopp. Inget 'allt eller inget'. Bara en mjuk struktur som hjälper dig att hitta tillbaka till känslan av att vara på samma lag som din kropp.",
      whatYouGetTitle: "Under dessa fyra veckor får du:",
      whatYouGetItems: [
        "Klarhet istället för gissningar",
        "Korta pass som passar in i ditt liv & vardag",
        "Verktyg för att lyssna på din kropp med respekt",
        "En coach som tror på dig, även de dagar du själv tvekar"
      ],
      pdfDownloadTitle: "Din Programhandbok (PDF)",
      pdfDownloadDesc: "Här kan du ladda ner den fullständiga handboken på 11 sidor i PDF-format för att spara lokalt på din mobil eller skriva ut. Den innehåller alla tankesätt kring mat, återhämtning, stress och träning.",
      pdfDownloadBtn: "Ladda ner Kickstart Handbok (PDF)",
      
      mindsetTitle1: "Varför styrketräning gör skillnad på riktigt",
      mindsetDesc1: "När du styrketränar på ett snällt och närvarande sätt börjar du långsamt lita på din kropp igen. Du upptäcker att du klarar mer än du trott. Du får energi som spiller över i vardagen. Du sover bättre, känner dig stabilare när livet är stressigt och börjar se din kropp som en vän istället för något du måste 'fixa'. Det är inte ytan som förändras först. Det är känslan inuti.",
      mindsetTitle2: "Mat är alltid ett stöd, inte ett straff",
      mindsetDesc2: "Många av oss har lärt oss att äta mindre för att bli 'bättre'. Men din kropp är inte byggd för konstant underskott. När du istället väljer att stötta din kropp med mat får du stabil energi, träningen känns roligare och återhämtningen går mycket snabbare. Det handlar inte om kalorier, det handlar om att ge din kropp det den behöver.",

      workoutIntro: "Här är ditt träningsprogram. Kom ihåg: börja mjukt, sikta på 2-3 set per övning och 8-15 repetitioner. Vila 60-90 sekunder mellan seten och lyssna alltid på kroppen. Form och intention är viktigare än tunga vikter!",
      toggleHome: "Visa Hemmapass",
      toggleGym: "Visa Gympass",
      viewVideoBtn: "Kolla övning",
      watchIntroBtn: "Titta på videointroduktionen",
      introVideoTitle: "Introduktion till Kickstart",
      introVideoDesc: "En kort hälsning från Torun där hon går igenom filosofin och hur du bäst lägger upp dina kommande fyra veckor.",

      calendarWeek: "Vecka",
      calendarDay: "Dag",
      coachingVideoTitle: "Dagens Pepp & Coaching",
      coachingVideoDesc: "Klicka på play-knappen nedan för att starta dagens korta röst- eller videomeddelande från mig.",
      reflectionTitle: "Dagens reflektion",
      reflectionPlaceholder: "Skriv ner dina tankar här... Hur kändes det att dyka upp för dig själv idag?",
      reflectionSaveBtn: "Spara reflektion",
      reflectionSaved: "Reflektion sparad i din webbläsare! ♡",
      
      diaryTitle: "Min personliga reflektionsbok",
      diaryIntro: "Här samlas alla dina sparade tankar och svar på reflektionsfrågorna under resans gång. Detta är ditt helt privata utrymme att titta tillbaka på för att se din utveckling.",
      diaryEmpty: "Du har inte sparat några reflektioner än. Gå till '28 Dagars Coaching' för att skriva dina första rader! ♡",
      diaryDayLabel: "Dag",
      diaryWeekLabel: "Vecka",

      backToStart: "Gå tillbaka"
    },
    en: {
      loginTitle: "Member Login",
      loginSub: "KICKSTART PROGRAM PORTAL",
      loginDesc: "Welcome to your personal sanctuary! Enter the access code you received in your Stripe confirmation email to unlock the guidebook, your 28 daily coaching videos, and the exercise logs.",
      passcodePlaceholder: "Enter your code here...",
      loginBtn: "Unlock Portal",
      buyPrompt: "Don't have a code? Kickstart is a gentle 4-week guidebook and workout plan designed for those who want to start exercising on their own terms.",
      readMoreBtn: "Read more & buy program",
      logoutBtn: "Log out",
      
      tabWelcome: "Welcome & Guide",
      tabWorkouts: "Workouts",
      tabVideos: "28 Days of Coaching",
      tabDiary: "My Reflection Log",
      
      welcomeTitle: "Welcome home to yourself",
      welcomeIntro: "Thank you for choosing to give yourself this. This program is for you who want to take small, gentle steps back to training – or start in a way that feels sustainable and nice. No giant leap. No 'all or nothing'. Just a soft structure that helps you find your way back to the feeling of being on the same team as your body.",
      whatYouGetTitle: "Over the next four weeks, you will get:",
      whatYouGetItems: [
        "Clarity instead of guessing",
        "Short sessions that fit your life & daily routine",
        "Tools to listen to your body with respect",
        "A coach who believes in you, even the days you doubt yourself"
      ],
      pdfDownloadTitle: "Your Program Handbook (PDF)",
      pdfDownloadDesc: "Here you can download the complete 11-page guidebook in PDF format to save locally on your device or print. It contains all key mindset guidelines about food, recovery, stress, and workouts.",
      pdfDownloadBtn: "Download Kickstart Handbook (PDF)",
      
      mindsetTitle1: "Why strength training makes a real difference",
      mindsetDesc1: "When you strength train in a kind and mindful way, you slowly begin to trust your body again. You discover that you can do more than you thought. You get energy that spills over into daily life. You sleep better, feel more stable when life is busy, and begin to see your body as a friend instead of something you must 'fix'. It's not the surface that changes first. It's the feeling inside.",
      mindsetTitle2: "Food is always a support, never a punishment",
      mindsetDesc2: "Many of us have learned to eat less to be 'better'. But your body is not built for a constant deficit. When you choose to support your body with nourishing food, you get stable energy, training becomes more fun, and recovery is much faster. It's not about calories – it's about giving your body what it needs.",

      workoutIntro: "Here is your workout program. Remember: start gently, aim for 2-3 sets per exercise and 8-15 repetitions. Rest 60-90 seconds between sets and always listen to your body. Form and intention are way more important than heavy weights!",
      toggleHome: "Show Home Version",
      toggleGym: "Show Gym Version",
      viewVideoBtn: "View exercise",
      watchIntroBtn: "Watch intro video",
      introVideoTitle: "Kickstart Introduction",
      introVideoDesc: "A brief welcome greeting from Torun discussing the philosophy and how to get the most out of your upcoming four weeks.",

      calendarWeek: "Week",
      calendarDay: "Day",
      coachingVideoTitle: "Today's Coaching & Encouragement",
      coachingVideoDesc: "Click the play button below to listen to today's short coaching message from me.",
      reflectionTitle: "Today's reflection",
      reflectionPlaceholder: "Write down your thoughts here... How did it feel to show up for yourself today?",
      reflectionSaveBtn: "Save reflection",
      reflectionSaved: "Reflection saved in your browser! ♡",
      
      diaryTitle: "My Reflection Logbook",
      diaryIntro: "This page collects all your saved thoughts and answers to the reflection questions. This is your completely private space to look back and trace your personal growth.",
      diaryEmpty: "You haven't saved any reflections yet. Go to '28 Days of Coaching' to write your first entries! ♡",
      diaryDayLabel: "Day",
      diaryWeekLabel: "Week",

      backToStart: "Go back"
    }
  }[language];

  // Exercises data
  const workouts = [
    {
      id: "pass1",
      title: language === "sv" ? "Pass 1: Lower & Glute Focus" : "Workout 1: Lower & Glute Focus",
      focus: language === "sv" ? "Fokus: Underkropp, säte & baksida lår" : "Focus: Lower body, glutes & hamstrings",
      gym: [
        { name: "Pulldown / Reverse-grip Seated High Row", reps: "3 set x 8-12 reps", desc: "Sitt stabilt, dra stången mot bröstet och knip ihop skulderbladen under full kontroll." },
        { name: "Hyperextension", reps: "2-3 set x 10-12 reps", desc: "Fokusera på sätet och baksida lår. Undvik att översträcka ländryggen i toppläget." },
        { name: "Hip Thrust", reps: "3 set x 8-12 reps", desc: "Tryck upp höften med hälarna, knip sätet ordentligt i toppen under en sekund." },
        { name: "Lateral Raise", reps: "2 set x 12-15 reps", desc: "Lyft hantlarna åt sidan med lätt böjd armbåge. Fokusera på utsida axel." },
        { name: "Cable Kneeling One Arm Pulldown", reps: "2-3 set x 10-12 reps", desc: "Fokusera på kontakten med den breda ryggmuskeln under hela rörelsebanan." },
        { name: "Side Lying Clam", reps: "2 set x 15 reps/sida", desc: "Ligg på sidan med böjda ben. Lyft det övre knäet utan att rulla höften bakåt." }
      ],
      home: [
        { name: "Superman", reps: "2-3 set x 10-12 reps", desc: "Ligg på mage, lyft armar och ben kontrollerat. Styrkebyggande för hela baksidan." },
        { name: "Bird Dog", reps: "3 set x 10 reps/sida", desc: "Stå på alla fyra, sträck ut motsatt arm och ben. Håll bålen helt stabil." },
        { name: "Single Leg Glute Bridge", reps: "3 set x 10-12 reps/sida", desc: "Höftlyft på ett ben. Kan göras med en ryggsäck eller vattenflaska på höften för extra motstånd." },
        { name: "Lateral Raise med vattenflaskor / böcker", reps: "2-3 set x 12-15 reps", desc: "Använd fyllda vattenflaskor för att bygga starka axlar utan tunga vikter." },
        { name: "Prone Row", reps: "3 set x 12 reps", desc: "Ligg på mage, lyft lätt bröstet och dra armbågarna bakåt mot höften. Knip skulderbladen." },
        { name: "Side Lying Clam", reps: "2 set x 15 reps/sida", desc: "Ligg på sidan med böjda ben. Lyft det övre knäet för att aktivera sätets utsida." }
      ]
    },
    {
      id: "pass2",
      title: language === "sv" ? "Pass 2: Kraft & Flöde" : "Workout 2: Strength & Flow",
      focus: language === "sv" ? "Fokus: Benstyrka, axelpressar & bålstabilitet" : "Focus: Leg strength, shoulder presses & core stability",
      gym: [
        { name: "Goblet Squat eller Full Squat", reps: "3 set x 8-12 reps", desc: "Håll en hantel eller kettlebell vid bröstet, sjunk djupt med stolt bröst och knän som spårar över tårna." },
        { name: "Dumbbell Bulgarian Split Squat", reps: "2-3 set x 8-10 reps/ben", desc: "Placera bakre foten på en bänk, sjunk ned med tyngdpunkten på främre hälen." },
        { name: "Seated Shoulder Press / Arnold Press", reps: "3 set x 10 reps", desc: "Pressa hantlarna kontrollerat över huvudet utan att svanka ryggen." },
        { name: "Front Raise", reps: "2 set x 12 reps", desc: "Lyft hantlarna framåt till ögonhöjd. Kontrollerad rörelse på vägen ner." },
        { name: "Cable Hip Abduction", reps: "2-3 set x 12 reps/ben", desc: "Stå stadigt och för benet utåt sidan för att stärka sätets stabiliserande muskler." },
        { name: "Bird Dog", reps: "2 set x 10 reps/sida", desc: "Stå på alla fyra, förläng motsatt arm och ben och håll höften helt plan." }
      ],
      home: [
        { name: "Bodyweight Goblet Squat", reps: "3 set x 12-15 reps", desc: "Gör knäböj med en fylld vattenflaska eller tung bok hållen intill bröstet." },
        { name: "Reverse Lunge", reps: "3 set x 10 reps/ben", desc: "Kliv bakåt kontrollerat och pressa dig upp igen genom det främre benets häl." },
        { name: "Shoulder Press med vattenflaskor / böcker", reps: "3 set x 12 reps", desc: "Pressa uppåt med stolt hållning. Aktiverar axlar och övre rygg." },
        { name: "Front Raise med vattenflaskor", reps: "2 set x 12 reps", desc: "Lyft flaskorna framåt med lätt böjda armar för att stärka axelns framsida." },
        { name: "Glute Kickback på alla fyra", reps: "3 set x 12-15 reps/ben", desc: "Pressa fotsulan mot taket och knip i sätet utan att svanka ländryggen." },
        { name: "Bird Dog", reps: "2 set x 10 reps/sida", desc: "Utmärkt övning för bålstabilitet och ryggstyrka utan redskap." }
      ]
    },
    {
      id: "pass3",
      title: language === "sv" ? "Pass 3: Helhet & Balans" : "Workout 3: Wholeness & Balance",
      focus: language === "sv" ? "Fokus: Höftfällning (hinge), armar & core" : "Focus: Hip hinge, arms & core",
      gym: [
        { name: "Romanian Deadlift / Barbell Bent Over Row", reps: "3 set x 8-12 reps", desc: "Skjut bak höften och fäll i ryggen med en rak stång nära benen för baksida lår och rygg." },
        { name: "Hip Thrust", reps: "3 set x 10 reps", desc: "Klassiskt höftlyft på bänk med stång eller tung hantel över höftkammen." },
        { name: "Dumbbell Hammer Curl", reps: "2-3 set x 12 reps", desc: "Stärk armarna genom att curla hantlarna med neutralt grepp (tummarna upp)." },
        { name: "Triceps Pushdown / Overhead Extension", reps: "2-3 set x 12 reps", desc: "Sträck ut armen helt för att aktivera baksida överarm." },
        { name: "Dumbbell Upright Row", reps: "2 set x 12 reps", desc: "Dra hantlarna upp mot hakan med armbågarna högre än händerna." },
        { name: "Side Lying Diagonal Backward Leg Raise", reps: "2 set x 12 reps/ben", desc: "Ligg på sidan och för det övre benet snett bakåt-uppåt för sätets djupare muskler." }
      ],
      home: [
        { name: "Good Morning (kroppsvikt) eller Single Leg RDL", reps: "3 set x 12 reps", desc: "Fäll fram i höften med rak rygg och mjuka knän. Känn hur det stramar lätt i baksida lår." },
        { name: "Hip Thrust (med ryggsäck/vattenflaskor)", reps: "3 set x 12-15 reps", desc: "Gör höftlyftet liggande på golvet med skuldrorna mot en soffkant för djupare rörelsebana." },
        { name: "Bicep Curl med vikter", reps: "3 set x 12 reps", desc: "Använd vattenflaskor, tunga böcker eller kassar för att curla under full kontroll." },
        { name: "Triceps Extension med bok / vattenflaska", reps: "2-3 set x 12 reps", desc: "Håll en bok bakom huvudet och pressa uppåt med fixerade armbågar." },
        { name: "Upright Row med fyllda vattenflaskor", reps: "2-3 set x 12 reps", desc: "Dra uppåt längs kroppen. Håll axlarna sänkta och led rörelsen med armbågarna." },
        { name: "Side Lying Clam eller Diagonal Leg Raise", reps: "2 set x 12-15 reps/sida", desc: "Stärker höftens utsida och sätet på ett extremt skonsamt sätt." }
      ]
    }
  ];

  // Daily coaching calendar metadata & reflection questions
  const dailyPrompts = Array.from({ length: 28 }, (_, index) => {
    const day = index + 1;
    let week = Math.ceil(day / 7);
    
    // Customize daily Swedish titles and reflection prompts matching PDF structure
    let svTitle = "";
    let enTitle = "";
    let svPrompt = "";
    let enPrompt = "";

    if (week === 1) {
      svTitle = `Hitta ditt varför & landa`;
      enTitle = `Find your why & land`;
      if (day === 1) {
        svPrompt = "Vad är din innersta intention med det här programmet? Skriv ner ditt varför.";
        enPrompt = "What is your innermost intention with this program? Write down your why.";
      } else if (day === 2) {
        svPrompt = "Hur kändes det att röra på dig idag på ett snällt sätt? Hade du något motstånd?";
        enPrompt = "How did it feel to move today in a kind way? Did you experience any resistance?";
      } else if (day === 3) {
        svPrompt = "Hur reagerar din kropp på stress just nu? Hur kan du ge den mer lugn idag?";
        enPrompt = "How is your body reacting to stress right now? How can you give it more peace today?";
      } else {
        svPrompt = "Vad är ett litet steg du har tagit den här veckan för att visa dig själv omsorg?";
        enPrompt = "What is a small step you have taken this week to show yourself care?";
      }
    } else if (week === 2) {
      svTitle = `Lyssna på kroppens signaler`;
      enTitle = `Listen to your body's signals`;
      if (day === 8) {
        svPrompt = "Märker du skillnad på kroppens energi beroende på sömn? Reflektera över din vila.";
        enPrompt = "Do you notice a difference in your body's energy depending on sleep? Reflect on your rest.";
      } else if (day === 9) {
        svPrompt = "Hur känns det att träna utan att räkna kalorier eller mäta prestation? Känns det ovant?";
        enPrompt = "How does it feel to train without counting calories or measuring performance? Does it feel unfamiliar?";
      } else {
        svPrompt = "Var i kroppen känner du dig starkast idag? Ge dig själv cred för den styrkan.";
        enPrompt = "Where in your body do you feel strongest today? Give yourself credit for that strength.";
      }
    } else if (week === 3) {
      svTitle = `Stärk tilliten & bygg grunden`;
      enTitle = `Strengthen trust & build the foundation`;
      if (day === 15) {
        svPrompt = "Har du märkt att du litar lite mer på din kropp nu än för tre veckor sedan? Hur visar det sig?";
        enPrompt = "Have you noticed that you trust your body slightly more now than three weeks ago? How does it show?";
      } else {
        svPrompt = "Vilken övning eller vilket träningspass har känts allra bäst den här veckan? Varför?";
        enPrompt = "Which exercise or workout session has felt the absolute best this week? Why?";
      }
    } else {
      svTitle = `Integrera rörelse i livet`;
      enTitle = `Integrate movement into your life`;
      if (day === 22) {
        svPrompt = "Hur känns det att ha kommit igenom dessa veckor? Vad vill du ta med dig framåt?";
        enPrompt = "How does it feel to have come through these weeks? What do you want to carry forward?";
      } else if (day === 28) {
        svPrompt = "Skriv ner tre saker du vill fortsätta med (en övning, en vana eller ett sätt att vara snäll mot dig själv).";
        enPrompt = "Write down three things you want to continue with (an exercise, a habit, or a way to be kind to yourself).";
      } else {
        svPrompt = "Hur kan du fortsätta lyssna på din kropp och ge den det den behöver även efter Kickstart?";
        enPrompt = "How can you continue to listen to your body and give it what it needs even after Kickstart?";
      }
    }

    return { day, week, svTitle, enTitle, svPrompt, enPrompt };
  });

  const activePrompt = dailyPrompts[selectedDay - 1];

  // Helper to compile all user reflections from localStorage
  const getSavedReflections = () => {
    const list: { day: number; week: number; prompt: string; text: string }[] = [];
    dailyPrompts.forEach((p) => {
      const savedText = localStorage.getItem(`torun_kickstart_reflection_${p.day}`);
      if (savedText && savedText.trim()) {
        list.push({
          day: p.day,
          week: p.week,
          prompt: language === "sv" ? p.svPrompt : p.enPrompt,
          text: savedText
        });
      }
    });
    return list;
  };

  const savedReflections = getSavedReflections();

  // If user is not authenticated, show the login gate
  if (!isAuthenticated) {
    return (
      <div className="relative min-h-[90vh] py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-[#FAF8F5]" id="portal-login-stage">
        {/* Soft background glow circles */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#fff5fc] -z-10 blur-3xl opacity-80" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-pink-50/50 -z-10 blur-3xl opacity-80" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md w-full bg-white/70 backdrop-blur-2xl rounded-[3rem] p-8 sm:p-10 border border-white/60 shadow-2xl space-y-8 font-sans text-center"
        >
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-pink-100/50 text-[#fd80ff] border border-pink-200/40 shadow-3xs tracking-widest mx-auto">
              <Lock className="w-3.5 h-3.5" /> {t.loginTitle}
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#230c1e] tracking-tight leading-none pt-2">
              {t.loginSub}
            </h2>
            <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-light">
              {t.loginDesc}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input 
                type="password" 
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder={t.passcodePlaceholder}
                className="w-full bg-white border border-stone-200 rounded-full px-6 py-4 text-sm text-[#230c1e] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:border-transparent text-center font-sans tracking-wide"
                required
              />
            </div>
            
            {authError && (
              <p className="text-red-500 text-[11px] font-sans font-semibold text-center bg-red-500/10 border border-red-500/20 px-4 py-2.5 rounded-2xl animate-shake">
                {authError}
              </p>
            )}

            <button 
              type="submit"
              className="w-full py-4 bg-[#230c1e] hover:bg-[#3d1534] text-white text-[11px] font-sans font-black uppercase tracking-widest rounded-full transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#fd80ff]" /> {t.loginBtn}
            </button>
          </form>

          <div className="pt-6 border-t border-stone-100 text-center space-y-3">
            <p className="text-[10px] text-stone-500 leading-relaxed max-w-xs mx-auto">
              {t.buyPrompt}
            </p>
            <button
              onClick={() => onNavigate("programs")}
              className="text-[#fd80ff] hover:text-[#230c1e] text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 transition-colors cursor-pointer mx-auto"
            >
              {t.readMoreBtn} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // PORTAL MAIN VIEW (Authenticated)
  return (
    <div className="relative min-h-[90vh] py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] font-sans" id="kickstart-portal-dashboard">
      {/* Glow Effects */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-[#fff5fc] -z-10 blur-3xl opacity-50" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-pink-50/50 -z-10 blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto w-full space-y-8">
        
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-stone-200/60 pb-6">
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#fd80ff] bg-[#fff5fc] border border-[#fd80ff]/20 px-3 py-1 rounded-full">
              {language === "sv" ? "DINA FÖRSTA STEG – UTAN PRESS" : "YOUR FIRST STEPS – WITHOUT PRESSURE"}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#230c1e] tracking-tight mt-1">
              Kickstart Portal
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="text-stone-500 hover:text-red-500 text-xs font-bold uppercase tracking-wider border border-stone-200 hover:border-red-200 px-5 py-2.5 rounded-full cursor-pointer bg-white transition-all active:scale-95"
            >
              {t.logoutBtn}
            </button>
          </div>
        </div>

        {/* Dynamic Sub Tabs Navigation */}
        <div className="flex flex-wrap gap-2 pb-2 overflow-x-auto no-scrollbar border-b border-stone-200/30">
          {[
            { id: "welcome", label: t.tabWelcome, icon: BookOpen },
            { id: "workouts", label: t.tabWorkouts, icon: Dumbbell },
            { id: "videos", label: t.tabVideos, icon: Video },
            { id: "diary", label: t.tabDiary, icon: FileText }
          ].map((tab) => {
            const isActive = activePortalTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePortalTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-sans font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  isActive 
                    ? "bg-[#230c1e] text-white shadow-sm" 
                    : "bg-white hover:bg-stone-50 border border-stone-200 text-[#230c1e]/75"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#fd80ff]" : "text-stone-400"}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: WELCOME & PDF GUIDE */}
        {activePortalTab === "welcome" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in-fade">
            
            {/* Left side: Intro Text and Mindset cards */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Main Welcome letter */}
              <div className="glass-panel border border-white/65 p-8 sm:p-10 rounded-[2.5rem] shadow-xl space-y-6">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#230c1e] tracking-tight">
                  {t.welcomeTitle} ♡
                </h2>
                
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light">
                  {t.welcomeIntro}
                </p>

                <div className="bg-[#fff5fc]/60 border border-[#fd80ff]/20 p-6 rounded-2xl space-y-4">
                  <h4 className="text-xs uppercase font-extrabold tracking-wider text-[#fd80ff]">{t.whatYouGetTitle}</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-[13px] text-[#230c1e] font-sans">
                    {t.whatYouGetItems.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-white border border-pink-100 flex items-center justify-center text-[#fd80ff] shrink-0 shadow-3xs">
                          ✓
                        </span>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Mindset Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-stone-200/70 p-6 sm:p-8 rounded-[2rem] shadow-md space-y-4">
                  <span className="text-xl">🏋️‍♀️</span>
                  <h4 className="font-serif text-lg font-bold text-[#230c1e]">{t.mindsetTitle1}</h4>
                  <p className="text-xs leading-relaxed text-stone-500 font-light">{t.mindsetDesc1}</p>
                </div>

                <div className="bg-white border border-stone-200/70 p-6 sm:p-8 rounded-[2rem] shadow-md space-y-4">
                  <span className="text-xl">🍲</span>
                  <h4 className="font-serif text-lg font-bold text-[#230c1e]">{t.mindsetTitle2}</h4>
                  <p className="text-xs leading-relaxed text-stone-500 font-light">{t.mindsetDesc2}</p>
                </div>
              </div>

            </div>

            {/* Right side: PDF Download box */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Introduction Video Box */}
              <div className="glass-panel border border-white/65 p-6 rounded-[2rem] shadow-lg space-y-4">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-[#fd80ff] flex items-center gap-1.5">
                  <Video className="w-4 h-4" /> {t.introVideoTitle}
                </h4>
                
                {/* Mock Video Player */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 flex items-center justify-center group shadow-sm">
                  {isPlayingCoachingVideo ? (
                    <div className="absolute inset-0 bg-[#230c1e] flex flex-col items-center justify-center p-4 text-center text-white space-y-3 font-sans">
                      <div className="w-12 h-12 rounded-full border-4 border-[#fd80ff] border-t-transparent animate-spin" />
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#fd80ff]">Strömmar video...</span>
                      <button 
                        onClick={() => setIsPlayingCoachingVideo(false)}
                        className="text-white/60 hover:text-white text-[9px] uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full"
                      >
                        Stoppa
                      </button>
                    </div>
                  ) : (
                    <>
                      <img src={torunMeadow} alt="Torun Coaching Introduction" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <button 
                        onClick={() => setIsPlayingCoachingVideo(true)}
                        className="w-14 h-14 rounded-full bg-white text-[#230c1e] hover:bg-[#fd80ff] hover:text-white flex items-center justify-center shadow-lg transition-all transform hover:scale-110 active:scale-95 cursor-pointer z-10"
                      >
                        <Play className="w-6 h-6 fill-current ml-1" />
                      </button>
                    </>
                  )}
                </div>

                <p className="text-[11px] text-stone-500 leading-relaxed font-light">
                  {t.introVideoDesc}
                </p>
              </div>

              {/* Handbok download */}
              <div className="glass-panel border border-white/65 p-6 sm:p-8 rounded-[2.5rem] shadow-xl space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#230c1e]">
                  {t.pdfDownloadTitle}
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed font-light">
                  {t.pdfDownloadDesc}
                </p>
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(language === "sv" 
                      ? "Programhandboken laddas ner till din enhet! ♡" 
                      : "Program handbook is downloading to your device! ♡"
                    );
                  }}
                  className="w-full py-4 bg-[#230c1e] hover:bg-[#3d1534] text-white text-[10px] font-sans font-black uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4 text-[#fd80ff]" />
                  {t.pdfDownloadBtn}
                </a>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: WORKOUTS */}
        {activePortalTab === "workouts" && (
          <div className="space-y-6 animate-in-fade">
            
            {/* Header controls card */}
            <div className="glass-panel border border-white/65 p-6 sm:p-8 rounded-[2rem] shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1 max-w-xl">
                <h3 className="font-serif text-xl font-bold text-[#230c1e]">
                  {language === "sv" ? "Dina Träningspass" : "Your Workouts"}
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed font-light">
                  {t.workoutIntro}
                </p>
              </div>

              {/* Version toggle switch */}
              <div className="bg-[#fff5fc] p-1.5 rounded-full border border-[#fd80ff]/20 flex items-center shrink-0">
                <button
                  onClick={() => setIsHomeVersion(false)}
                  className={`px-5 py-2.5 rounded-full text-[10px] font-sans font-black uppercase tracking-widest transition-all cursor-pointer ${
                    !isHomeVersion 
                      ? "bg-[#230c1e] text-white" 
                      : "text-[#230c1e]/70 hover:text-[#230c1e]"
                  }`}
                >
                  {t.toggleGym}
                </button>
                <button
                  onClick={() => setIsHomeVersion(true)}
                  className={`px-5 py-2.5 rounded-full text-[10px] font-sans font-black uppercase tracking-widest transition-all cursor-pointer ${
                    isHomeVersion 
                      ? "bg-[#230c1e] text-white" 
                      : "text-[#230c1e]/70 hover:text-[#230c1e]"
                  }`}
                >
                  {t.toggleHome}
                </button>
              </div>
            </div>

            {/* Workouts detailed blocks */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {workouts.map((w, index) => {
                const exerciseList = isHomeVersion ? w.home : w.gym;
                return (
                  <div 
                    key={w.id}
                    className="glass-panel border border-white/65 rounded-[2.5rem] p-6 sm:p-8 shadow-lg space-y-6 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#fd80ff] block">PASS {index + 1}</span>
                        <h4 className="font-serif text-xl font-bold text-[#230c1e]">{w.title}</h4>
                        <span className="text-[11px] text-[#230c1e]/70 font-sans italic block">{w.focus}</span>
                      </div>

                      {/* Exercises List inside pass */}
                      <div className="divide-y divide-stone-100 text-left">
                        {exerciseList.map((ex, idx) => (
                          <div key={idx} className="py-3.5 space-y-1.5">
                            <div className="flex justify-between items-start gap-2">
                              <span className="text-xs font-bold text-[#230c1e] font-sans pr-1">
                                {idx + 1}. {ex.name}
                              </span>
                              <span className="text-[10px] font-bold text-[#fd80ff] font-mono shrink-0 whitespace-nowrap bg-[#fff5fc] px-2 py-0.5 rounded border border-[#fd80ff]/10">
                                {ex.reps}
                              </span>
                            </div>
                            <p className="text-[10.5px] text-stone-500 leading-relaxed font-light">
                              {ex.desc}
                            </p>
                            
                            <button
                              onClick={() => setActiveExerciseVideo({ name: ex.name, desc: ex.desc })}
                              className="inline-flex items-center gap-1 text-[9px] font-sans font-bold uppercase tracking-wider text-[#230c1e] hover:text-[#fd80ff] transition-colors cursor-pointer select-none"
                            >
                              <Eye className="w-3 h-3 text-[#fd80ff]" /> {t.viewVideoBtn}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB 3: DAILY VIDEOS */}
        {activePortalTab === "videos" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in-fade">
            
            {/* Left side: Calendar Grid */}
            <div className="lg:col-span-5 glass-panel border border-white/65 p-6 sm:p-8 rounded-[2.5rem] shadow-xl space-y-6">
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-[#230c1e]">
                  {language === "sv" ? "Dina 28 Dagar" : "Your 28 Days"}
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed font-light">
                  Klicka på en dag för att se coachingvideon och svara på veckans reflektion.
                </p>
              </div>

              {/* 4 Weeks calendar stack */}
              <div className="space-y-6">
                {[1, 2, 3, 4].map((wNum) => {
                  let svTheme = wNum === 1 ? "Landa" : wNum === 2 ? "Lyssna" : wNum === 3 ? "Bygg" : "Integrera";
                  let enTheme = wNum === 1 ? "Land" : wNum === 2 ? "Listen" : wNum === 3 ? "Build" : "Integrate";
                  return (
                    <div key={wNum} className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-sans font-black uppercase tracking-wider text-[#230c1e]/40 border-b border-stone-100 pb-1">
                        <span>{t.calendarWeek} {wNum}</span>
                        <span className="text-[#fd80ff]">{language === "sv" ? svTheme : enTheme}</span>
                      </div>
                      
                      <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: 7 }, (_, i) => {
                          const dayVal = (wNum - 1) * 7 + (i + 1);
                          const isSelected = selectedDay === dayVal;
                          const hasSavedNotes = localStorage.getItem(`torun_kickstart_reflection_${dayVal}`) !== null;
                          return (
                            <button
                              key={dayVal}
                              onClick={() => setSelectedDay(dayVal)}
                              className={`aspect-square rounded-xl text-xs font-bold cursor-pointer transition-all flex flex-col items-center justify-center relative ${
                                isSelected
                                  ? "bg-[#230c1e] text-white shadow-sm scale-105"
                                  : "bg-white hover:bg-stone-50 border border-stone-200 text-[#230c1e]"
                              }`}
                            >
                              <span>{dayVal}</span>
                              {hasSavedNotes && (
                                <span className={`absolute bottom-1 w-1 h-1 rounded-full ${isSelected ? "bg-[#fd80ff]" : "bg-[#fd80ff]"}`} />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Right side: Video Player & Reflection Area */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Daily Coaching Card */}
              <div className="glass-panel border border-white/65 p-8 rounded-[2.5rem] shadow-xl space-y-6">
                
                {/* Active day details */}
                <div className="flex justify-between items-center border-b border-stone-100 pb-4">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#fd80ff]">
                      {t.calendarWeek} {activePrompt.week} • {t.calendarDay} {activePrompt.day}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#230c1e]">
                      {language === "sv" ? activePrompt.svTitle : activePrompt.enTitle}
                    </h3>
                  </div>
                </div>

                {/* Video Container block */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase font-extrabold tracking-wider text-[#fd80ff] flex items-center gap-1.5">
                    <Video className="w-4 h-4" /> {t.coachingVideoTitle}
                  </h4>

                  {/* Daily Video mock */}
                  <div className="relative aspect-video rounded-[1.5rem] overflow-hidden bg-stone-900 border border-stone-800 flex items-center justify-center group shadow-sm">
                    {isPlayingCoachingVideo ? (
                      <div className="absolute inset-0 bg-[#230c1e] flex flex-col items-center justify-center p-6 text-center text-white space-y-4">
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-8 bg-[#fd80ff] rounded animate-pulse" />
                          <span className="w-2 h-12 bg-[#fd80ff] rounded animate-pulse delay-75" />
                          <span className="w-2 h-10 bg-[#fd80ff] rounded animate-pulse delay-150" />
                          <span className="w-2 h-14 bg-[#fd80ff] rounded animate-pulse delay-200" />
                          <span className="w-2 h-6 bg-[#fd80ff] rounded animate-pulse delay-300" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#fd80ff]">Lyssnar på Coaching (Dag {selectedDay})</span>
                        <button 
                          onClick={() => setIsPlayingCoachingVideo(false)}
                          className="text-white/60 hover:text-white text-[9px] uppercase tracking-widest border border-white/20 px-4 py-1.5 rounded-full"
                        >
                          Pausa
                        </button>
                      </div>
                    ) : (
                      <>
                        <img src={torunDock} alt="Torun Coaching" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#230c1e]/60 to-transparent" />
                        
                        {/* Play overlay button */}
                        <button
                          onClick={() => setIsPlayingCoachingVideo(true)}
                          className="w-14 h-14 rounded-full bg-white text-[#230c1e] hover:bg-[#fd80ff] hover:text-white flex items-center justify-center shadow-lg transition-all transform hover:scale-110 active:scale-95 cursor-pointer z-10"
                        >
                          <Play className="w-6 h-6 fill-current ml-1" />
                        </button>
                      </>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed font-light">
                    {t.coachingVideoDesc}
                  </p>
                </div>

                {/* Daily reflection section */}
                <div className="pt-6 border-t border-stone-100 space-y-4">
                  <h4 className="text-xs uppercase font-extrabold tracking-wider text-[#fd80ff] flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-pink-400" /> {t.reflectionTitle}
                  </h4>
                  
                  <div className="bg-[#FAF8F5] border border-stone-200/50 p-5 rounded-2xl">
                    <p className="text-xs sm:text-[13px] text-[#230c1e] font-sans leading-relaxed font-medium">
                      {language === "sv" ? activePrompt.svPrompt : activePrompt.enPrompt}
                    </p>
                  </div>

                  <textarea
                    rows={4}
                    value={reflectionText}
                    onChange={(e) => setReflectionText(e.target.value)}
                    placeholder={t.reflectionPlaceholder}
                    className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:border-transparent text-[#230c1e] placeholder-stone-400 font-sans leading-relaxed"
                  />

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-1">
                    {reflectionSavedMessage ? (
                      <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 animate-pulse">
                        <Check className="w-3.5 h-3.5" /> {t.reflectionSaved}
                      </span>
                    ) : (
                      <div />
                    )}
                    
                    <button
                      onClick={handleSaveReflection}
                      className="px-6 py-3.5 bg-[#230c1e] hover:bg-[#3d1534] text-white text-[10px] font-sans font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-98 w-full sm:w-auto justify-center"
                    >
                      <Save className="w-3.5 h-3.5 text-[#fd80ff]" /> {t.reflectionSaveBtn}
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 4: DIARY */}
        {activePortalTab === "diary" && (
          <div className="glass-panel border border-white/65 p-8 sm:p-12 rounded-[3rem] shadow-xl space-y-8 animate-in-fade">
            <div className="space-y-2 text-center max-w-2xl mx-auto">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#fd80ff] bg-[#fff5fc] border border-[#fd80ff]/20 px-4 py-1.5 rounded-full inline-block">
                📔 MIN DAGBOK & LOGGBOK
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#230c1e] tracking-tight pt-1">
                {t.diaryTitle}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-light">
                {t.diaryIntro}
              </p>
            </div>

            {savedReflections.length === 0 ? (
              <div className="text-center py-14 border-2 border-dashed border-stone-200 rounded-[2rem] max-w-md mx-auto space-y-4 bg-white/40">
                <span className="text-3xl block">📔</span>
                <p className="text-xs text-stone-500 font-sans italic px-6">
                  {t.diaryEmpty}
                </p>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto space-y-6 text-left">
                {savedReflections.map((ref, idx) => (
                  <div 
                    key={idx}
                    className="bg-white border border-stone-200/80 p-6 sm:p-8 rounded-[2rem] shadow-xs space-y-4"
                  >
                    <div className="flex justify-between items-center border-b border-stone-100 pb-2">
                      <span className="text-[9px] uppercase font-black tracking-widest text-[#fd80ff] font-sans">
                        {t.diaryWeekLabel} {ref.week} • {t.diaryDayLabel} {ref.day}
                      </span>
                      <span className="text-[9px] font-sans font-bold text-stone-400">Torun Kickstart</span>
                    </div>

                    <div className="space-y-3 font-sans">
                      <p className="text-xs text-[#230c1e]/80 font-semibold leading-relaxed">
                        Q: {ref.prompt}
                      </p>
                      <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-light whitespace-pre-wrap pl-3 border-l-2 border-pink-100">
                        {ref.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>

      {/* EXERCISE VIDEO DEMO MODAL */}
      <AnimatePresence>
        {activeExerciseVideo && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-[#230c1e]/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] border border-white/60 shadow-2xl p-6 sm:p-8 max-w-lg w-full relative text-left"
            >
              <button
                onClick={() => {
                  setActiveExerciseVideo(null);
                  setIsPlayingExerciseVideo(false);
                }}
                className="absolute top-6 right-6 p-2 rounded-full border border-stone-200 hover:bg-stone-50 text-stone-400 cursor-pointer w-9 h-9 flex items-center justify-center font-bold"
              >
                ×
              </button>

              <div className="space-y-6 font-sans">
                <div className="space-y-1">
                  <span className="text-[9px] font-sans uppercase font-black text-[#fd80ff] tracking-wider block">ÖVNINGSDEMONSTRATION</span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#230c1e]">
                    {activeExerciseVideo.name}
                  </h3>
                </div>

                {/* Mock Exercise Video Loop */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 flex items-center justify-center group shadow-sm">
                  {isPlayingExerciseVideo ? (
                    <div className="absolute inset-0 bg-[#230c1e] flex flex-col items-center justify-center p-4 text-center text-white space-y-2">
                      <div className="w-10 h-10 rounded-full border-4 border-[#fd80ff] border-t-transparent animate-spin" />
                      <span className="text-[9px] uppercase font-bold tracking-widest text-[#fd80ff]">Visar instruktionsvideo (loop)...</span>
                    </div>
                  ) : (
                    <>
                      <img src={torunMeadow} alt="Exercise Demo" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <button
                        onClick={() => setIsPlayingExerciseVideo(true)}
                        className="w-12 h-12 rounded-full bg-white text-[#230c1e] hover:bg-[#fd80ff] hover:text-white flex items-center justify-center shadow-lg transition-all transform hover:scale-105 active:scale-95 cursor-pointer z-10"
                      >
                        <Play className="w-5 h-5 fill-current ml-1" />
                      </button>
                    </>
                  )}
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-sans uppercase font-black text-[#fd80ff] tracking-wider block">Utförande & Säkerhetsinstruktioner</span>
                  <p className="text-xs text-stone-600 leading-relaxed font-light">
                    {activeExerciseVideo.desc} Försäkra dig om att hålla axlarna sänkta och andas lugnt under hela övningen. Kontakten i muskeln är viktigare än tunga vikter!
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveExerciseVideo(null);
                    setIsPlayingExerciseVideo(false);
                  }}
                  className="w-full py-3.5 bg-[#230c1e] hover:bg-[#3d1534] text-white text-[11px] font-sans font-extrabold uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-md"
                >
                  {language === "sv" ? "Stäng fönster" : "Close window"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
