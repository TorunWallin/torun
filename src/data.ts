import { Package, Testimonial, Article } from "./types";

export const packages: Package[] = [
  {
    id: "kickstart",
    name: "Kickstart",
    subtitle: "Dina första steg – utan press.",
    price: "795 kr",
    period: "engångsbetalning",
    description: "En enkel 4-veckorsplan för dig som vill börja träna men inte vet var du ska ta vägen. Ingen perfektion, ingen stress – bara struktur som passar ditt liv och ger dig det där första lugnet i kroppen när du vet exakt vad du ska göra.",
    outputGoal: "Du kommer få: Struktur, momentum och en kropp som äntligen börjar känna sig hemma i träningen – utan att hela ditt liv måste läggas om.",
    features: [
      "4-veckors träningsprogram (gym eller hemma – du väljer)",
      "Videoinstruktioner till varje övning",
      "Enkla vardagsrutiner för sömn, rörelse och mat",
      "Tillgång till hela programmet i Everfit, i din egen takt",
      "Du kan höra av dig till mig när du behöver"
    ],
    buttonText: "Ja, jag är redo",
    recommended: false,
    colorTheme: "sage"
  },
  {
    id: "stark-med-torun",
    name: "Stark med Torun",
    subtitle: "Starkare, vecka för vecka.",
    price: "1 436 kr",
    originalPrice: "1 795 kr",
    period: "/mån · 6 mån bindning",
    badge: "LANSERINGSPRIS · T.O.M. 10 JULI",
    description: "Sex månader av coaching som verkligen lever med ditt liv. Träning, kost och vanor som anpassas efter din vecka, din kropp och din menscykel. Du har mig vid din sida hela vägen – jag guidar dig steg för steg genom hela resan.",
    outputGoal: "Du kommer få: En starkare och stabilare kropp – och en vardag som faktiskt går ihop. Inte ett quick fix, utan ett halvår som förändrar hur du rör dig genom livet.",
    features: [
      "Personligt anpassat träningsprogram (uppdateras varje vecka)",
      "Månadsvisa check-ins via möte/video",
      "Veckovisa chatt-avstämningar – du skickar, jag ger feedback och justerar varje vecka",
      "Kostvägledning anpassad efter dig (inte ett strikt schema)",
      "Anpassningar utifrån menscykel och energi",
      "Stöd i sömn, stress och återhämtning",
      "Löpande stöd via chatt på vardagar",
      "Full tillgång till ditt program i Everfit"
    ],
    buttonText: "Ja, jag vill börja",
    recommended: true,
    colorTheme: "terracotta"
  },
  {
    id: "coaching-oneonone",
    name: "1:1 Coaching",
    subtitle: "Full omfamning, hela vägen.",
    price: "2 796 kr",
    originalPrice: "3 495 kr",
    period: "/mån · löpande, minst 3 mån",
    badge: "LANSERINGSPRIS · T.O.M. 10 JULI",
    description: "Det djupaste stödet. Daglig chatt och veckovisa 1:1-möten med ett helt individuellt upplägg för träning, kost, mental hälsa och självkänsla. För dig som är redo å göra det här på riktigt – med någon som ser dig varje vecka.",
    outputGoal: "Du kommer få: En helt ny nivå av styrka, trygghet och självkänsla. Och en relation till din kropp som håller långt efter att samarbetet är klart.",
    features: [
      "Daglig chatt med mig varje vardag",
      "Veckovisa 1:1-möten (live video, bara vi två)",
      "Individuellt kostschema byggt bara för dig",
      "Mental coaching kring självkänsla och kroppsbild",
      "Prioriterad hjälp och löpande planering i realtid",
      "Allt som ingår i Stark med Torun"
    ],
    buttonText: "Ansök om plats",
    recommended: false,
    colorTheme: "clay"
  },
  {
    id: "medlemsportal-app",
    name: "Medlemsportal & App",
    subtitle: "Hela verktygslådan – på dina villkor.",
    price: "19 kr",
    period: "/mån · earlybird (ord. pris 39 kr)",
    badge: "KOMMANDE · LANSERAS SNART 💎",
    description: "För dig som vill träna självständigt men vill ha hela min verktygslåda nära till hands. Få tillgång till fullständiga cykelsynkade träningsprogram, Cycle Compass, Nourishment Vault (recept), loggböcker och vår systergemenskap – direkt i mobilen.",
    outputGoal: "Du kommer få: En digital friszon i din mobil fylld med cykelanpassad inspiration, hormonstöttande recept och träningsprogram – redo när du är.",
    features: [
      "Fullständig tillgång till min digitala medlemsportal",
      "Cykelsynkade träningsprogram för gymmet och hemmet",
      "Nourishment Vault med hundratals hormonvänliga recept",
      "Interaktiv symptomlogg och Cycle Compass",
      "Systergemenskap och gemensamma utmaningar",
      "Torun-appen i mobilen (Lanseras inom kort!)"
    ],
    buttonText: "Bevaka lansering",
    recommended: false,
    colorTheme: "sage"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Louise",
    age: 42,
    location: "Malmö",
    quote: "Efter år av utbrändhet trodde jag aldrig att jag skulle kunna träna igen. Torun lärde mig att lyssna på mitt nervsystem och vila i tid. Idag känner jag mig starkare inifrån än någonsin – utan piska eller självhat.",
    tags: ["Utbrändhet", "Nervsystem", "Stark inifrån"]
  },
  {
    id: "2",
    name: "Maria",
    age: 51,
    location: "Göteborg",
    quote: "Att kliva in i klimakteriet kändes ensamt och förvirrande för min kropp. Hos Torun fann jag djup kunskap, trygghet och anpassade lyft som tog bort ledvärken och gav mig gnistan tillbaka.",
    tags: ["Klimakteriet", "Hormonbalans", "Tunga lyft"]
  },
  {
    id: "3",
    name: "Ebba",
    age: 19,
    location: "Stockholm",
    quote: "Alla fitnesskonton på sociala medier skriker om kalorier, magrutor och perfektion. Stark Tjej har varit som ett varmt kram-rum för mig. Jag har äntligen hittat en sund relation till min hysteri-fria kropp.",
    tags: ["Unge vuxna", "Träningsglädje", "Friszon"]
  },
  {
    id: "4",
    name: "Johanna",
    age: 34,
    location: "Umeå",
    quote: "Du behöver inte förtjäna din egen kropp. Det citatet förändrade allt för mig. Torun hjälpte mig att sluta straffa mig med träning och istället äta gott för att orka leka med mina barn.",
    tags: ["Småbarnsåren", "Äta för att prestera", "Hjärtat först"]
  }
];

export const articles: Article[] = [
  {
    id: "menscykel-superkraft",
    title: "Träna med menscykeln: Din biologiska superkraft",
    category: "Menscykel",
    readTime: "5 min",
    excerpt: "När vi slutar kämpa emot hormonerna och istället börjar samarbeta med dem kan vi maximera vår återhämtning och styra intensiteten med precision.",
    content: [
      "Att vara kvinna innebär att kroppen rör sig i cykliska vågor, månad efter månad. Traditionell träningslära är tyvärr nästan helt anpassad efter män, som har en linjär dygnshormonell kurva. För oss ser det annorlunda ut – och det är vår absoluta superkraft om vi lär oss lyssna.",
      "Din menscykel delas generellt in i fyra faser: menstruationsfasen, follikulärfasen (efter mens), ovulationsfasen (ägglossning) och lutealfasen (innan mens). Varje fas kommer med olika hormonella förutsättningar som påverkar din energi, din styrka och din sårbarhet för stress.",
      "Under den follikulära fasen stiger östrogenet. Du känner dig ofta mer utåtriktad, tålig och redo att lyfta tungt eller köra mer intensivt. Vid ägglossningen når energin ofta sin pik. Men efter ägglossningen stiger progesteronet – kroppens eget lugnande hormon. Här kan du märka att återhämtningen tar längre tid, att flåset blir högre och att din kropp ber om tyngre, långsammare baslyft snarare än hetsig intervallträning.",
      "I min coaching låter jag träningen anpassas efter din unika cykel. Det handlar inte om att ligga på soffan halva månaden, utan om att ge kroppen exakt rätt stimulans vid rätt tillfälle. Stark inifrån betyder att respektera kroppens intelligens."
    ]
  },
  {
    id: "ata-for-att-prestera",
    title: "Äta för att prestera: Bryt dig loss från kalorisvälten",
    category: "Mindset",
    readTime: "4 min",
    excerpt: "Kompensationsätande, skuldkänslor och ständiga bantningskurer sänker din sköldkörtel och skapar stress. Det är dags att mata din styrka.",
    content: [
      "Fitnessbranschen har under årtionden lärt kvinnor att det vackraste de kan vara är 'små'. Kvinnor utmanas ständigt att minska, äta mindre och eliminera hela livsmedelsgrupper. Men sanningen är att en svulten kropp är en stressad kropp.",
      "När du ligger i ett konstant energioffensivt underskott reagerar dina hormoner direkt. Sköldkörteln sänker ämnesomsättningen, stresshormonet kortisol skjuter i höjden och dina muskler bryts ner istället för att byggas upp. Du upplever trötthet, hjärndimma, försämrad sömn och ett lynnigt humör.",
      "Min grundpelare i TORUN är 'Äta för att prestera'. Med det menar jag inte professionell idrott, utan att utrusta din vardag. Att äta för att orka lyfta tungt, skratta med dina barn, hålla fokus på jobbet och hålla din hormonbalans intakt.",
      "Du behöver inte förtjäna din mat genom träning. Mat är inte ett straff eller en belöning – mat är ditt bränsle, din byggsten och en källa till njutning. Att ge din kropp tillräckligt med näringsrik mat är den mest basala formen av självrespekt."
    ]
  },
  {
    id: "hjartat-forst",
    title: "Hjärtat först: När träningshetsen skadar mer än den läker",
    category: "Återhämtning",
    readTime: "6 min",
    excerpt: "Om du använder träning som ett straff för vad du åt igår, eller som ett tvång för att duga, ökar du bara ditt inre lidande. Jag lägger hjärtat först.",
    content: [
      "Träning marknadsförs ofta med slagord som 'no pain, no gain' eller 'inga ursäkter'. Men om du lever ett liv fyllt av karriär, familj, logistik och inre krav, så är ditt nervsystem redan i ett förhöjt fight-or-flight-tillstånd.",
      "Att lägga till brutal och utmattande träning ovanpå det leder sällan till hälsa. Det leder snarare till utbrändhet, kronisk inflammation och skador. När jag sätter 'Hjärtat först' i min coaching, ställer jag mig alltid frågan: Vad behöver mitt nervsystem bäst just i denna stund?",
      "Vissa dagar är svaret en tung, jordande knäböjssession på gymmet. Andra dagar är svaret 20 minuters frigörande andningsövningar och en tidig kväll i säng. Båda valen är heroiska och bygger en hållbar, stark kvinna.",
      "Jag slutar mäta framgång i drop-sets och utmattning. Jag börjar mäta det i inre lugn, glädje, livslust och hur trygg du känner dig när du ser dig själv i spegeln."
    ]
  },
  {
    id: "klimakteriet-styrka",
    title: "Styrka under klimakteriet: Hormonbalans genom tunga lyft",
    category: "Styrketräning",
    readTime: "5 min",
    excerpt: "När östrogenet sjunker förändras benstommen och muskelmassan. Att lyfta tungt är inte farligt – det är din bästa medicin.",
    content: [
      "Klimakteriet är inte slutet på din kraft – det är början på ett nytt kapitel där din kropp behöver dig mer än någonsin. När östrogenet gradvis minskar under perimenopauser och menopausen förändras förutsättningarna för vår benhälsa och muskelmassa.",
      "Många kvinnor blir rekommenderade att enbart göra lugn yoga eller lätt rörlighet när de blir äldre. Även om rörlighet är fantastisk, är det de tunga, kontrollerade lyften som ger den bärande signalen till din benstomme att hålla sig tät, stark och frisk.",
      "Styrketräning förbättrar dessutom insulinkänsligheten (vilket naturligt minskar under klimakteriet), stöttar din mentala skärpa och hjälper till att reglera stress. Det handlar inte om att göra komplicerade akrobatiska rörelser, utan om att bygga trygg styrka i de stora muskelgrupperna.",
      "I min coaching möter jag klimakteriet med djup respekt och nyfikenhet. Jag ser till att ladda kroppen med rätt protein, ge utrymme för återhämtning och anpassa vikterna efter din dagsform. Du är värd att känna dig ostoppbar, oavsett ålder ♡"
    ]
  }
];
