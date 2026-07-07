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
  
  // Selected workout pass: 'pass1' | 'pass2' | 'pass3'
  const [selectedPass, setSelectedPass] = useState<string>("pass1");
  
  // Active week selection
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  
  // Text states for all 28 reflections
  const [reflectionTexts, setReflectionTexts] = useState<Record<number, string>>({});
  const [saveStatus, setSaveStatus] = useState<Record<number, boolean>>({});
  
  // Active exercise to show in video modal
  const [activeExerciseVideo, setActiveExerciseVideo] = useState<{ name: string; desc: string; trains?: string; videoUrl?: string } | null>(null);
  const [isPlayingExerciseVideo, setIsPlayingExerciseVideo] = useState(false);
  const [isPlayingCoachingVideo, setIsPlayingCoachingVideo] = useState(false);

  // Check authentication status on mount & load all saved reflections
  useEffect(() => {
    const isAuth = localStorage.getItem("torun_kickstart_authorized") === "true";
    if (isAuth) {
      setIsAuthenticated(true);
    }

    const initialTexts: Record<number, string> = {};
    for (let d = 1; d <= 28; d++) {
      const saved = localStorage.getItem(`torun_kickstart_reflection_${d}`);
      if (saved) {
        initialTexts[d] = saved;
      }
    }
    setReflectionTexts(initialTexts);
  }, []);

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

  const handleTextChange = (dayNum: number, text: string) => {
    setReflectionTexts(prev => ({
      ...prev,
      [dayNum]: text
    }));
  };

  const handleSaveReflection = (dayNum: number) => {
    const text = reflectionTexts[dayNum] || "";
    localStorage.setItem(`torun_kickstart_reflection_${dayNum}`, text);
    
    setSaveStatus(prev => ({ ...prev, [dayNum]: true }));
    setTimeout(() => {
      setSaveStatus(prev => ({ ...prev, [dayNum]: false }));
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
        { 
          name: language === "sv" ? "Barbell Hip Thrust" : "Barbell Hip Thrust", 
          reps: "3 set x 8-12 reps", 
          desc: language === "sv" 
            ? "Placera skulderbladen mot en bänk, stången över höften (använd skyddskudde). Tryck upp höften genom att pressa ner hälarna, knip sätet ordentligt i toppen och håll en sekund. Sänk kontrollerat."
            : "Place shoulder blades against a bench, barbell over hips. Push hips up by driving through your heels, squeeze glutes hard at the top for 1 second. Lower under control.",
          trains: language === "sv" ? "Säte (stora sätesmuskeln) & baksida lår" : "Glutes & hamstrings",
          videoUrl: "https://www.youtube.com/watch?v=LM8XHLYJoYs"
        },
        { 
          name: language === "sv" ? "Goblet Squat" : "Goblet Squat", 
          reps: "3 set x 10 reps", 
          desc: language === "sv" 
            ? "Håll en tung hantel eller kettlebell tätt intill bröstet. Stå axelbrett, sjunk djupt med stolt bröst och knän som pekar i samma riktning som tårna. Pressa dig upp genom hela foten."
            : "Hold a dumbbell or kettlebell close to your chest. Stand shoulder-width apart, sit deep keeping chest proud and knees tracking over toes. Drive back up through your entire foot.",
          trains: language === "sv" ? "Framsida lår (quads), säte & bålstabilitet" : "Quads, glutes & core stability",
          videoUrl: "https://www.youtube.com/watch?v=MeIiGibTCIk"
        },
        { 
          name: language === "sv" ? "Dumbbell Bulgarian Split Squat" : "Dumbbell Bulgarian Split Squat", 
          reps: "2-3 set x 8-10 reps/ben", 
          desc: language === "sv" 
            ? "Placera ena foten bakom dig på en bänk. Ta ett stort kliv framåt med den andra. Sänk dig rakt ner tills det bakre knäet nästan rör golvet. Pressa dig upp genom främre häl."
            : "Place back foot on a bench behind you. Take a large step forward. Lower your hips straight down until back knee almost touches the floor. Drive up through front heel.",
          trains: language === "sv" ? "Säte (rumpa), framsida lår & balans" : "Glutes, quads & balance",
          videoUrl: "https://www.youtube.com/watch?v=2C-uNgKw12A"
        },
        { 
          name: language === "sv" ? "Lying Leg Curl" : "Lying Leg Curl", 
          reps: "3 set x 10-12 reps", 
          desc: language === "sv" 
            ? "Ligg på mage i maskinen med rullen mot underbenen. Böj benen kontrollerat och dra rullen mot sätet. Håll emot långsamt på vägen tillbaka till raka ben."
            : "Lie face down with roller pad against lower calves. Curl legs up towards glutes under full control. Lower slowly back to straight legs.",
          trains: language === "sv" ? "Baksida lår (hamstrings)" : "Hamstrings (back of legs)",
          videoUrl: "https://www.youtube.com/watch?v=1Tq3QdIUutg"
        }
      ],
      home: [
        { 
          name: language === "sv" ? "Glute Bridge (med motstånd)" : "Glute Bridge (with load)", 
          reps: "3 set x 12-15 reps", 
          desc: language === "sv" 
            ? "Ligg på rygg med böjda knän och fötterna i golvet. Pressa upp höften mot taket genom hälarna, spänn sätet hårt i toppläget. Lägg en fylld ryggsäck på höften för extra vikt."
            : "Lie on back with bent knees, feet flat. Drive hips up through heels, squeezing glutes hard at the top. Place a loaded backpack on hips for weight.",
          trains: language === "sv" ? "Säte (sätesmusklerna) & baksida lår" : "Glutes & hamstrings",
          videoUrl: "https://www.youtube.com/watch?v=wPM8co451BE"
        },
        { 
          name: language === "sv" ? "Kroppsviktsknäböj (Air Squat)" : "Bodyweight Air Squat", 
          reps: "3 set x 12-15 reps", 
          desc: language === "sv" 
            ? "Stå höftbrett, fäll höften bakåt och sätt dig ner som på en stol. Håll bröstet stolt och tryck knäna utåt. Pressa dig kontrollerat upp till stående."
            : "Stand hip-width apart, send hips back and sit down as if on a chair. Keep chest proud, press knees outward. Drive back up to standing.",
          trains: language === "sv" ? "Framsida lår & säte" : "Quads & glutes",
          videoUrl: "https://www.youtube.com/watch?v=aclHkVaku9U"
        },
        { 
          name: language === "sv" ? "Step-ups på stol/soffa" : "Chair / Sofa Step-ups", 
          reps: "3 set x 10 reps/ben", 
          desc: language === "sv" 
            ? "Placera ena foten stadigt på en stabil stol eller soffkant. Tryck dig upp med benets styrka tills du står helt rak. Sänk dig långsamt och kontrollerat ner igen."
            : "Place one foot flat on a sturdy chair or couch. Step up using leg strength until standing straight. Lower down slowly and controlled.",
          trains: language === "sv" ? "Framsida lår, säte & balans" : "Quads, glutes & balance",
          videoUrl: "https://www.youtube.com/watch?v=dQqApCGd5Ss"
        },
        { 
          name: language === "sv" ? "Single Leg Glute Bridge" : "Single Leg Glute Bridge", 
          reps: "2-3 set x 10 reps/sida", 
          desc: language === "sv" 
            ? "Ligg på rygg med ena benet upplyft. Tryck upp höften med det andra benet genom att pressa ner hälen, spänn rumpan hårt i toppen. Håll höfterna jämna."
            : "Lie on back, lift one leg straight up. Press hips up driving through the heel of the floor foot, squeeze glute at the top. Keep hips level.",
          trains: language === "sv" ? "Säte, baksida lår & bålstabilitet" : "Glutes & core stability",
          videoUrl: "https://www.youtube.com/watch?v=seM3tZ8oXlE"
        }
      ]
    },
    {
      id: "pass2",
      title: language === "sv" ? "Pass 2: Kraft & Flöde" : "Workout 2: Strength & Flow",
      focus: language === "sv" ? "Fokus: Benstyrka, axelpressar & bålstabilitet" : "Focus: Leg strength, shoulder presses & core stability",
      gym: [
        { 
          name: language === "sv" ? "Leg Press" : "Leg Press", 
          reps: "3 set x 8-12 reps", 
          desc: language === "sv" 
            ? "Sitt djupt i maskinen, placera fötterna höftbrett på plattan. Sänk plattan kontrollerat mot bröstet utan att lyfta rumpan från sätet. Pressa tillbaka utan att låsa knäna helt."
            : "Sit in press, feet hip-width on sled. Lower sled controlled towards chest without lifting tailbone. Press back up without locking knees.",
          trains: language === "sv" ? "Framsida lår, baksida lår & säte" : "Quads, hamstrings & glutes",
          videoUrl: "https://www.youtube.com/watch?v=IZxyjWwJYlU"
        },
        { 
          name: language === "sv" ? "Dumbbell Shoulder Press" : "Dumbbell Shoulder Press", 
          reps: "3 set x 10 reps", 
          desc: language === "sv" 
            ? "Sitt på en bänk med ryggstöd. Håll hantlarna i öronhöjd, pressa dem rakt upp över huvudet under kontroll. Se till att inte svanka eller tappa nacken framåt."
            : "Sit on a supported bench. Hold dumbbells at ear height, press straight up overhead under control. Keep core tight, do not arch your lower back.",
          trains: language === "sv" ? "Axlar (deltoideus) & triceps" : "Shoulders & triceps",
          videoUrl: "https://www.youtube.com/watch?v=B-aVuyhvLHU"
        },
        { 
          name: language === "sv" ? "Seated Cable Row" : "Seated Cable Row", 
          reps: "3 set x 10-12 reps", 
          desc: language === "sv" 
            ? "Sitt med lätt böjda knän. Dra handtaget mot nedre delen av magen. Sänk axlarna och nyp ihop skulderbladen hårt i slutet av rörelsen. Håll emot på vägen ut."
            : "Sit with slightly bent knees. Pull handle towards lower chest/navel. Keep shoulders down, pinch shoulder blades hard at back. Resist weight returning.",
          trains: language === "sv" ? "Breda ryggmuskeln (lats), övre rygg & biceps" : "Lats, upper back & biceps",
          videoUrl: "https://www.youtube.com/watch?v=GZbfZ033fEs"
        },
        { 
          name: language === "sv" ? "Plankan (Forearm Plank)" : "Forearm Plank", 
          reps: "3 set x 30-45 sek", 
          desc: language === "sv" 
            ? "Stå på underarmar och tår. Håll kroppen i en spikrak linje. Spänn magen och sätet, tryck upp utrymmet mellan skulderbladen och andas lugnt."
            : "Rest on forearms and toes. Keep body in a straight line. Tighten core and glutes, push up through shoulder blades and breathe slowly.",
          trains: language === "sv" ? "Djupa bålmuskler (core) & stabilitet" : "Deep core muscles & stability",
          videoUrl: "https://www.youtube.com/watch?v=pSHjTRCQxIw"
        }
      ],
      home: [
        { 
          name: language === "sv" ? "Reverse Lunge (Utfallssteg bakåt)" : "Reverse Lunge", 
          reps: "3 set x 10 reps/ben", 
          desc: language === "sv" 
            ? "Stå stolt. Ta ett kontrollerat kliv bakåt med ena benet, sänk höften tills det bakre knäet nästan nuddar golvet. Pressa dig framåt och upp igen med främre hälen."
            : "Stand tall. Take a controlled step back with one leg, lower hips until back knee almost touches the floor. Drive forward and up through front heel.",
          trains: language === "sv" ? "Framsida lår, baksida lår & säte" : "Quads, hamstrings & glutes",
          videoUrl: "https://www.youtube.com/watch?v=wr69aWb93a0"
        },
        { 
          name: language === "sv" ? "Shoulder Press med vattenflaskor" : "Water Bottle Shoulder Press", 
          reps: "3 set x 12 reps", 
          desc: language === "sv" 
            ? "Stå stadigt. Håll två tunga vattenflaskor eller böcker i axelhöjd. Pressa dem rakt upp till raka armar under full kontroll. Sänk långsamt."
            : "Stand firm. Hold loaded water bottles or books at shoulder height. Press straight up to locked arms under control. Lower slowly.",
          trains: language === "sv" ? "Axlar & armar" : "Shoulders & arms",
          videoUrl: "https://www.youtube.com/watch?v=qE78Ed6mH4M"
        },
        { 
          name: language === "sv" ? "Superman Row" : "Superman Row", 
          reps: "3 set x 12 reps", 
          desc: language === "sv" 
            ? "Ligg på mage, lyft bröstet och armarna lätt från golvet. Dra armbågarna bakåt mot höften (som ett roddrag) och knip ihop skulderbladen. Sträck fram armarna igen."
            : "Lie face down, lift chest and arms slightly. Drive elbows back towards hips (rowing motion) pinching shoulder blades. Extend arms forward.",
          trains: language === "sv" ? "Hela baksidan, ländrygg & övre rygg" : "Erector spinae, lower & upper back",
          videoUrl: "https://www.youtube.com/watch?v=z6PJMT2y8GQ"
        },
        { 
          name: language === "sv" ? "Död insekt (Dead Bug)" : "Dead Bug", 
          reps: "3 set x 10 reps/sida", 
          desc: language === "sv" 
            ? "Ligg på rygg med armarna upp och knäna i 90 grader. Sänk långsamt motsatt arm och ben mot golvet. Pressa ländryggen hårt mot golvet under hela rörelsen!"
            : "Lie on back, arms up, knees bent at 90. Slowly lower opposite arm and leg toward floor. Keep lower back glued to the floor at all times!",
          trains: language === "sv" ? "Djupa bålmuskler (transversus abdominis)" : "Deep core muscles",
          videoUrl: "https://www.youtube.com/watch?v=g_BYB0R-4Ws"
        }
      ]
    },
    {
      id: "pass3",
      title: language === "sv" ? "Pass 3: Helhet & Balans" : "Workout 3: Wholeness & Balance",
      focus: language === "sv" ? "Fokus: Höftfällning (hinge), armar & core" : "Focus: Hip hinge, arms & core",
      gym: [
        { 
          name: language === "sv" ? "Romanian Deadlift (RDL)" : "Romanian Deadlift (RDL)", 
          reps: "3 set x 8-12 reps", 
          desc: language === "sv" 
            ? "Håll en stång framför höften. Skjut bak höften, böj minimalt i knäna och låt stången glida tätt längs benen till under knäna tills det sträcker i baksidan. Pressa fram höften."
            : "Hold bar in front of hips. Push hips back, bend knees slightly, slide bar close down legs to mid-shin feeling a hamstring stretch. Drive hips forward.",
          trains: language === "sv" ? "Baksida lår (hamstrings) & säte" : "Hamstrings & glutes",
          videoUrl: "https://www.youtube.com/watch?v=JCXUYuzw01M"
        },
        { 
          name: language === "sv" ? "Lat Pulldown" : "Lat Pulldown", 
          reps: "3 set x 10 reps", 
          desc: language === "sv" 
            ? "Sitt stadigt. Håll brett grepp om stången. Dra stången ner mot övre bröstet samtidigt som du öppnar upp bröstet och drar axlarna nedåt-bakåt."
            : "Sit comfortably, grip bar wide. Pull bar down to upper chest, opening chest and drawing shoulders down and backward.",
          trains: language === "sv" ? "Breda ryggmuskeln (lats) & övre rygg" : "Lats & upper back",
          videoUrl: "https://www.youtube.com/watch?v=CAwf7n6Luuc"
        },
        { 
          name: language === "sv" ? "Dumbbell Bicep Curl" : "Dumbbell Bicep Curl", 
          reps: "3 set x 12 reps", 
          desc: language === "sv" 
            ? "Stå axelbrett, en hantel i varje hand. Håll armbågarna låsta mot sidan av kroppen. Curla upp hantlarna kontrollerat till axelhöjd. Håll emot ner."
            : "Stand wide, dumbbell in each hand. Keep elbows pinned to ribs. Curl weights up controlled to shoulder height. Lower under tension.",
          trains: language === "sv" ? "Biceps (framsida armar)" : "Biceps (front of arms)",
          videoUrl: "https://www.youtube.com/watch?v=ykJgr1hx3KQ"
        },
        { 
          name: language === "sv" ? "Bird Dog (Hunden/Katten)" : "Bird Dog", 
          reps: "3 set x 10 reps/sida", 
          desc: language === "sv" 
            ? "Stå på alla fyra. Sträck ut motsatt arm och ben diagonalt tills de är i linje med kroppen. Håll bålen stabil, undvik att svanka eller tilta höften."
            : "Start on all fours. Extend opposite arm and leg straight out level with spine. Keep core solid, do not arch back or tilt hips.",
          trains: language === "sv" ? "Ländrygg, säte & djup bål" : "Lower back, glutes & deep core",
          videoUrl: "https://www.youtube.com/watch?v=wiF57z2sY2o"
        }
      ],
      home: [
        { 
          name: language === "sv" ? "Single Leg Romanian Deadlift" : "Single Leg Romanian Deadlift", 
          reps: "3 set x 10 reps/ben", 
          desc: language === "sv" 
            ? "Stå på ett ben. Fäll fram i höften med rak rygg samtidigt som det fria benet sträcks ut rakt bakom dig till vågrätt. Pressa dig upp genom stående benets häl."
            : "Stand on one leg. Pivot at hips keeping spine straight, extending back leg straight behind you to parallel. Drive up through standing heel.",
          trains: language === "sv" ? "Baksida lår, säte & fotledsstabilitet" : "Hamstrings, glutes & ankle stability",
          videoUrl: "https://www.youtube.com/watch?v=A1-4v1Tf_iU"
        },
        { 
          name: language === "sv" ? "Hängande rodd under bord" : "Inverted Table Row", 
          reps: "3 set x 8-10 reps", 
          desc: language === "sv" 
            ? "Ligg under ett stabilt matbord. Ta tag i bordskanten med händerna axelbrett. Håll kroppen spikrak och dra bröstkorgen upp mot bordet. Sänk kontrollerat."
            : "Lie under a sturdy table, grip edge shoulder-width. Keep body straight as a plank and pull chest up to the table edge. Lower controlled.",
          trains: language === "sv" ? "Övre rygg, breda ryggmuskeln & biceps" : "Upper back, lats & biceps",
          videoUrl: "https://www.youtube.com/watch?v=OYUxXAMVz80"
        },
        { 
          name: language === "sv" ? "Bicep Curl med kassar/vikter" : "Water Bottle Bicep Curl", 
          reps: "3 set x 12-15 reps", 
          desc: language === "sv" 
            ? "Håll två fyllda kassar eller vattenflaskor. Curla dem upp mot axlarna med fixerade armbågar intill revbenen. Spänn biceps i toppen."
            : "Hold loaded bags or water bottles. Curl up to shoulders keeping elbows pinned to ribs. Contract biceps at the top.",
          trains: language === "sv" ? "Framsida överarm (biceps)" : "Biceps",
          videoUrl: "https://www.youtube.com/watch?v=ykJgr1hx3KQ"
        },
        { 
          name: language === "sv" ? "Bird Dog (Hunden)" : "Bird Dog", 
          reps: "3 set x 10 reps/sida", 
          desc: language === "sv" 
            ? "Stå på knän och händer. Sträck långsamt ut motsatt arm och ben till en rak linje. Mycket bra och skonsam stabilitetsövning för rygg och bål."
            : "On hands and knees, slowly extend opposite arm and leg to a straight line. Excellent gentle stability work for back and core.",
          trains: language === "sv" ? "Bål, ländrygg & säte" : "Core, lower back & glutes",
          videoUrl: "https://www.youtube.com/watch?v=wiF57z2sY2o"
        }
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
              className="w-full py-4 bg-[#02473E] hover:bg-[#035a4f] text-white text-[11px] font-sans font-black uppercase tracking-widest rounded-full transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
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
              className="text-[#fd80ff] hover:text-[#02473E] text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 transition-colors cursor-pointer mx-auto"
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
                    ? "bg-[#02473E] text-white border border-[#fd80ff]/25 shadow-xs" 
                    : "bg-white hover:bg-stone-50 border border-stone-200 text-[#02473E]/75 hover:text-[#02473E]"
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
                
                {/* Native Video Player */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 flex items-center justify-center shadow-sm">
                  <video 
                    src="/welcome.mp4" 
                    controls 
                    className="w-full h-full object-cover font-sans"
                    poster={torunMeadow}
                  />
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
                  className="w-full py-4 bg-[#02473E] hover:bg-[#035a4f] text-white text-[10px] font-sans font-black uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md border border-[#fd80ff]/20"
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
          <div className="space-y-8 animate-in-fade">
            
            {/* Header controls card */}
            <div className="glass-panel border border-white/65 p-6 sm:p-8 rounded-[2rem] shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1 max-w-xl text-left">
                <h3 className="font-serif text-xl font-bold text-[#230c1e]">
                  {language === "sv" ? "Dina Träningspass" : "Your Workouts"}
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-light">
                  {t.workoutIntro}
                </p>
              </div>

              {/* Version toggle switch */}
              <div className="bg-[#fff5fc] p-1.5 rounded-full border border-[#fd80ff]/20 flex items-center shrink-0">
                <button
                  onClick={() => setIsHomeVersion(false)}
                  className={`px-5 py-2.5 rounded-full text-[10px] font-sans font-black uppercase tracking-widest transition-all cursor-pointer ${
                    !isHomeVersion 
                      ? "bg-[#02473E] text-white border border-[#fd80ff]/20 shadow-xs" 
                      : "text-[#02473E]/70 hover:text-[#02473E]"
                  }`}
                >
                  {t.toggleGym}
                </button>
                <button
                  onClick={() => setIsHomeVersion(true)}
                  className={`px-5 py-2.5 rounded-full text-[10px] font-sans font-black uppercase tracking-widest transition-all cursor-pointer ${
                    isHomeVersion 
                      ? "bg-[#02473E] text-white border border-[#fd80ff]/20 shadow-xs" 
                      : "text-[#02473E]/70 hover:text-[#02473E]"
                  }`}
                >
                  {t.toggleHome}
                </button>
              </div>
            </div>

            {/* Pass Switcher */}
            <div className="grid grid-cols-3 gap-2 bg-white border border-stone-200/60 p-2 rounded-3xl max-w-3xl mx-auto shadow-sm">
              {workouts.map((w, idx) => {
                const isSelected = selectedPass === w.id;
                return (
                  <button
                    key={w.id}
                    onClick={() => setSelectedPass(w.id)}
                    className={`px-3 py-3 rounded-2xl text-[10px] sm:text-xs font-sans font-black uppercase tracking-wider transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? "bg-[#02473E] text-white border border-[#fd80ff]/40 shadow-xs scale-[1.01]"
                        : "bg-white hover:bg-stone-50 border border-stone-200 text-[#02473E]/75 hover:text-[#02473E]"
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#fd80ff] animate-pulse" />}
                    {language === "sv" ? `Pass ${idx + 1}` : `Workout ${idx + 1}`}
                  </button>
                );
              })}
            </div>

            {/* Workout Details list */}
            {(() => {
              const currentPassObj = workouts.find(w => w.id === selectedPass) || workouts[0];
              const exerciseList = isHomeVersion ? currentPassObj.home : currentPassObj.gym;
              return (
                <div className="space-y-6 max-w-4xl mx-auto">
                  {/* Selected Pass Details Card */}
                  <div className="glass-panel border border-white/65 p-6 sm:p-8 rounded-[2.5rem] shadow-xl text-left space-y-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-stone-100 pb-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#fd80ff] block">
                          {language === "sv" ? "VALT TRÄNINGSPASS" : "SELECTED WORKOUT"}
                        </span>
                        <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#230c1e] mt-1">
                          {currentPassObj.title}
                        </h4>
                        <span className="text-sm text-[#02473E] font-medium mt-1 block">
                          {currentPassObj.focus}
                        </span>
                      </div>
                      
                      {/* Reps/version reminder */}
                      <div className="bg-[#fff5fc] px-4 py-2 rounded-2xl border border-[#fd80ff]/20 text-center sm:text-right shrink-0">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#fd80ff] block">
                          {language === "sv" ? "UTFÖRANDE" : "VERSION"}
                        </span>
                        <span className="text-xs font-black uppercase text-[#02473E] tracking-wider block">
                          {isHomeVersion 
                            ? (language === "sv" ? "Hemma (Inga maskiner)" : "Home version")
                            : (language === "sv" ? "Gym (Maskiner & vikter)" : "Gym version")
                          }
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                      {language === "sv"
                        ? "Värm upp med 5-10 minuters rörlighet innan du kör igång. Utför varje övning med fullt fokus på muskelkontakten – gör rörelserna långsamt och kontrollerat. ♡"
                        : "Warm up with 5-10 minutes of dynamic mobility before starting. Perform each exercise with complete focus on muscle connection – move slowly and with control. ♡"
                      }
                    </p>
                  </div>

                  {/* Exercises Stack */}
                  <div className="space-y-6">
                    {exerciseList.map((ex, idx) => (
                      <div 
                        key={idx} 
                        className="glass-panel border border-white/65 p-6 sm:p-8 rounded-[2rem] shadow-md text-left flex flex-col md:flex-row md:items-start justify-between gap-6 hover:shadow-lg transition-shadow"
                      >
                        {/* Left/Middle side: Exercise Info */}
                        <div className="space-y-4 flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-sm font-black text-white bg-[#02473E] w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <h5 className="font-serif text-lg sm:text-xl font-bold text-[#230c1e]">
                              {ex.name}
                            </h5>
                            <span className="text-xs font-bold text-[#fd80ff] font-mono bg-[#fff5fc] px-3 py-1 rounded-full border border-[#fd80ff]/15">
                              {ex.reps}
                            </span>
                          </div>

                          {/* Focus area */}
                          <div className="bg-[#FAF8F5] border border-stone-200/40 p-4 rounded-xl space-y-1">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-[#fd80ff] block">
                              {language === "sv" ? "Vad det tränar" : "Muscle focus"}
                            </span>
                            <p className="text-sm text-[#02473E] font-sans font-bold leading-relaxed">
                              {ex.trains}
                            </p>
                          </div>

                          {/* Step-by-step description */}
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block">
                              {language === "sv" ? "Hur du gör (steg-för-steg)" : "Execution"}
                            </span>
                            <p className="text-sm text-stone-600 leading-relaxed font-light">
                              {ex.desc}
                            </p>
                          </div>
                        </div>

                        {/* Right side: Watch Video button */}
                        <div className="md:self-center shrink-0">
                          <button
                            onClick={() => setActiveExerciseVideo({ name: ex.name, desc: ex.desc, trains: ex.trains, videoUrl: ex.videoUrl })}
                            className="w-full md:w-auto px-6 py-4 bg-[#02473E] hover:bg-[#035a4f] text-white text-xs font-sans font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-sm border border-[#fd80ff]/20"
                          >
                            <Play className="w-4 h-4 text-[#fd80ff] fill-current" />
                            {language === "sv" ? "Kolla videoinstruktion" : "Watch video"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

          </div>
        )}

        {/* TAB 3: WEEKLY VIDEOS & REFLECTIONS */}
        {activePortalTab === "videos" && (
          <div className="space-y-8 animate-in-fade" id="weekly-videos-stage">
            
            {/* Week Selection switcher */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white border border-stone-200/60 p-2 rounded-3xl max-w-3xl mx-auto shadow-sm">
              {[1, 2, 3, 4].map((wNum) => {
                const isSelected = selectedWeek === wNum;
                const svWeekTitle = wNum === 1 ? "Vecka 1: Landa" : wNum === 2 ? "Vecka 2: Lyssna" : wNum === 3 ? "Vecka 3: Bygg" : "Vecka 4: Integrera";
                const enWeekTitle = wNum === 1 ? "Week 1: Land" : wNum === 2 ? "Week 2: Listen" : wNum === 3 ? "Week 3: Build" : "Week 4: Integrate";
                return (
                  <button
                    key={wNum}
                    onClick={() => setSelectedWeek(wNum)}
                    className={`px-4 py-3 rounded-2xl text-xs font-sans font-black uppercase tracking-wider transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? "bg-[#02473E] text-white border border-[#fd80ff]/40 shadow-xs scale-[1.01]"
                        : "bg-white hover:bg-stone-50 border border-stone-200 text-[#02473E]/75 hover:text-[#02473E]"
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#fd80ff] animate-pulse" />}
                    {language === "sv" ? svWeekTitle : enWeekTitle}
                  </button>
                );
              })}
            </div>

            {/* Main Weekly Content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Weekly Video Player */}
              <div className="lg:col-span-5 glass-panel border border-white/65 p-6 sm:p-8 rounded-[2.5rem] shadow-xl space-y-6">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#fd80ff] block">
                    {language === "sv" ? "VECKANS COACHINGVIDEO" : "WEEKLY COACHING VIDEO"}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#230c1e] leading-snug">
                    {language === "sv" 
                      ? (selectedWeek === 1 ? "Vecka 1: Hitta ditt varför & landa" : selectedWeek === 2 ? "Vecka 2: Lyssna på kroppen" : selectedWeek === 3 ? "Vecka 3: Stärk tilliten" : "Vecka 4: Integrera rörelse")
                      : (selectedWeek === 1 ? "Week 1: Find your why & land" : selectedWeek === 2 ? "Week 2: Listen to your body" : selectedWeek === 3 ? "Week 3: Strengthen trust" : "Week 4: Integrate movement")
                    }
                  </h3>
                </div>

                {/* Actual Video tag for week */}
                <div className="relative aspect-video rounded-[1.5rem] overflow-hidden bg-stone-900 border border-stone-800 shadow-sm">
                  <video
                    src={`/week${selectedWeek}.mp4`}
                    controls
                    className="w-full h-full object-cover"
                    poster={torunDock}
                  />
                </div>

                <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-light">
                  {language === "sv"
                    ? "Titta på veckans coachingvideo först innan du startar dina träningspass och dagliga reflektioner. Den sätter tonen och temat för de kommande sju dagarna. ♡"
                    : "Watch this week's coaching video first before you start your workouts and daily reflections. It sets the theme for the upcoming seven days. ♡"
                  }
                </p>
              </div>

              {/* Right Column: Daily Reflections for this Week */}
              <div className="lg:col-span-7 space-y-6">
                <div className="glass-panel border border-white/65 p-6 sm:p-8 rounded-[2.5rem] shadow-xl space-y-6">
                  <div className="border-b border-stone-100 pb-4">
                    <h3 className="font-serif text-lg font-bold text-[#230c1e]">
                      {language === "sv" ? "Dina dagliga reflektioner" : "Your daily reflections"}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-500 font-light mt-1">
                      {language === "sv"
                        ? "Här samlar du dina tankar dag för dag. Skriv ner dina känslor och klicka på spara – dina svar sparas i din reflektionsbok."
                        : "Collect your thoughts day by day. Write down your feelings and click save – your answers will be saved in your reflection logbook."
                      }
                    </p>
                  </div>

                  <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">
                    {dailyPrompts
                      .filter((p) => p.week === selectedWeek)
                      .map((prompt) => {
                        const isSaved = saveStatus[prompt.day];
                        const textVal = reflectionTexts[prompt.day] || "";
                        
                        return (
                          <div 
                            key={prompt.day} 
                            className="bg-[#FAF8F5] border border-stone-200/50 p-5 rounded-2xl space-y-3 text-left"
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] uppercase font-bold tracking-widest text-[#fd80ff]">
                                {language === "sv" ? "Dag" : "Day"} {prompt.day} • {language === "sv" ? prompt.svTitle : prompt.enTitle}
                              </span>
                            </div>

                            <p className="text-sm text-[#230c1e] font-sans font-semibold leading-relaxed">
                              {language === "sv" ? prompt.svPrompt : prompt.enPrompt}
                            </p>

                            <div className="space-y-2">
                              <textarea
                                value={textVal}
                                onChange={(e) => handleTextChange(prompt.day, e.target.value)}
                                placeholder={t.reflectionPlaceholder}
                                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:border-transparent text-[#230c1e] placeholder-stone-400 font-sans leading-relaxed min-h-[70px]"
                                rows={2}
                              />

                              <div className="flex justify-end items-center gap-3">
                                {isSaved && (
                                  <span className="text-[11px] text-[#fd80ff] font-sans font-semibold animate-fade-in flex items-center gap-1">
                                    <Check className="w-3.5 h-3.5 stroke-[2.5]" /> {t.reflectionSaved}
                                  </span>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleSaveReflection(prompt.day)}
                                  className="px-4 py-2 bg-[#230c1e] hover:bg-[#3d1534] text-white text-[10px] font-sans font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer active:scale-95 flex items-center gap-1"
                                >
                                  <Save className="w-3.5 h-3.5" /> {t.reflectionSaveBtn}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
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
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-[#02473E]/45 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#FAF8F5] rounded-[2.5rem] border border-white/60 shadow-2xl p-6 sm:p-8 max-w-lg w-full relative text-left"
            >
              <button
                onClick={() => {
                  setActiveExerciseVideo(null);
                  setIsPlayingExerciseVideo(false);
                }}
                className="absolute top-6 right-6 p-2 rounded-full border border-stone-200 hover:bg-stone-100 text-stone-400 cursor-pointer w-9 h-9 flex items-center justify-center font-bold"
              >
                ×
              </button>

              <div className="space-y-5 font-sans">
                <div className="space-y-1">
                  <span className="text-[10px] font-sans uppercase font-bold text-[#fd80ff] tracking-wider block">ÖVNINGSDEMONSTRATION</span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#230c1e]">
                    {activeExerciseVideo.name}
                  </h3>
                </div>

                {/* Real YouTube Video Embed */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 flex items-center justify-center shadow-sm">
                  {(() => {
                    const videoUrl = activeExerciseVideo.videoUrl;
                    if (videoUrl) {
                      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                      const match = videoUrl.match(regExp);
                      const youtubeId = (match && match[2].length === 11) ? match[2] : null;
                      
                      if (youtubeId) {
                        return (
                          <iframe 
                            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}`}
                            title={activeExerciseVideo.name}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        );
                      }
                    }
                    return (
                      <div className="absolute inset-0 bg-[#02473E]/10 flex flex-col items-center justify-center p-4 text-center text-stone-500">
                        <span className="text-xs font-sans uppercase tracking-widest text-[#fd80ff]">Ingen video tillgänglig</span>
                      </div>
                    );
                  })()}
                </div>

                {activeExerciseVideo.trains && (
                  <div className="bg-[#fff5fc] border border-[#fd80ff]/20 p-4 rounded-xl space-y-0.5">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#fd80ff] block">Vad det tränar</span>
                    <p className="text-sm text-[#02473E] font-sans font-bold leading-relaxed">
                      {activeExerciseVideo.trains}
                    </p>
                  </div>
                )}

                <div className="space-y-1.5 bg-white border border-stone-200/50 p-4 rounded-xl">
                  <span className="text-[10px] font-sans uppercase font-bold text-stone-400 tracking-wider block">Utförande & Säkerhetsinstruktioner</span>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                    {activeExerciseVideo.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveExerciseVideo(null);
                    setIsPlayingExerciseVideo(false);
                  }}
                  className="w-full py-3.5 bg-[#02473E] hover:bg-[#035a4f] text-white text-[11px] font-sans font-extrabold uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-md border border-[#fd80ff]/20"
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
