import React, { useState } from "react";
import { Soup, Heart, Zap, Sparkles, Clock, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Recipe {
  id: string;
  title: string;
  category: "pms" | "energy" | "stress" | "klimakterie";
  categoryLabel: string;
  prepTime: string;
  macroInfo: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  biologicalReason: string;
  accentColor: string;
  bgGradient: string;
}

interface NourishmentVaultProps {
  language: "sv" | "en";
}

export default function NourishmentVault({ language }: NourishmentVaultProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const t = {
    sv: {
      headerTitle: "”Äta för att prestera”-valvet",
      headerSub: "Glöm bantningshets och tomma förbud. Mat är din biologiska ork. Här hittar du hormonstöttande och nervsystemsvänliga recept med vetenskaplig motivering.",
      filterAll: "Visa Alla",
      filterPms: "PMS / Progesteron 🌸",
      filterEnergy: "Träningskraft ⚡",
      filterStress: "Nervsystemslugn 🧘‍♀️",
      filterKlimakterie: "Klimakterie & Benstyrka 💡",
      viewDetails: "Visa ingredienser & instruktioner",
      ingredientsLabel: "Ingredienser",
      instructionsLabel: "Gör så här",
      bioLabel: "Biologisk superkraft (Varför det fungerar)",
      closeBtn: "Stäng recept"
    },
    en: {
      headerTitle: "The “Eat to Perform” Vault",
      headerSub: "Forget dieting pressure and empty bans. Food is your biological fuel. Here you will find hormone-supporting and nervous-system-friendly recipes with scientific backing.",
      filterAll: "Show All",
      filterPms: "PMS / Progesterone 🌸",
      filterEnergy: "Workout Power ⚡",
      filterStress: "Nervous System Calm 🧘‍♀️",
      filterKlimakterie: "Menopause & Bones 💡",
      viewDetails: "Show ingredients & instructions",
      ingredientsLabel: "Ingredients",
      instructionsLabel: "Instructions",
      bioLabel: "Biological Superpower (Why it works)",
      closeBtn: "Close recipe"
    }
  }[language];

  const recipesSv: Recipe[] = [
    {
      id: "pms-knacke",
      title: "Boande Avokado- & Fröknäcke med Ägg",
      category: "pms",
      categoryLabel: "PMS-lindring & Progesteronsupport",
      prepTime: "10 min",
      macroInfo: "Rik på magnesium, zink, tryptofan & lipider för progesteronsyntes",
      description: "En mjuk, jordande frukost eller mellanmål speciellt framtagen för lutealfasens slutskede. Avokado och äggula ger hälsosamma kolesterol-byggstenar för progesteronproduktionen, medan fröna minskar cravings.",
      ingredients: [
        "1 st ekologiskt fröknäcke (fritt från tillsatt socker)",
        "1/2 st mogen avokado",
        "1 st kokt ekologiskt ägg (gärna löskokt)",
        "En nypa flingsalt & chiliflakes",
        "1 tsk pumpafrön (magnesium- och zinkrika)"
      ],
      instructions: [
        "Mosa avokadon direkt på fröknäcket och strö över flingsalt.",
        "Skiva ägget och lägg ovanpå avokadon.",
        "Toppa med pumpafrön och chiliflakes.",
        "Njut långsamt tillsammans med en varm kopp örtte."
      ],
      biologicalReason: "Ekologisk äggula tillför biotillgängligt kolesterol, vilket är den nödvändiga biokemiska byggstenen för kroppens syntes av gulkroppshormonet (progesteron) i binjurarna och corpus luteum. Avokado är rik på nyttiga enkelomättade fetter och glutation, en potent antioxidant som stöttar leverfas-2-metabolismen. Pumpafrön bidrar med högkoncentrerat magnesium och zink, vilket motverkar muskelspänningar, balanserar prostaglandinproduktionen och därmed lindrar uterus-kramper och PMS.",
      accentColor: "border-[#fd80ff]/20 text-[#fd80ff]",
      bgGradient: "from-[#fff5fc]/40 to-[#FAF8F5]/80"
    },
    {
      id: "preworkout-plat",
      title: "Östrogen-toppens Sötpotatis- & Kycklingplåt",
      category: "energy",
      categoryLabel: "Pre-Workout Kraft & Glykogensupport",
      prepTime: "35 min",
      macroInfo: "Högprotein, optimalt kolhydratsubstrat för anabol fas",
      description: "Perfekt måltid i follikulär- och ägglossningsfasen när östrogenet stiger och du planerar att lyfta tungt. Sötpotatis ger stabilt muskelbränsle utan blodsockerdippar och kycklingen reparerar fibrerna.",
      ingredients: [
        "150g ekologisk kycklingfilé (eller tofu för vegetariskt)",
        "200g sötpotatis skuren i klyftor",
        "1 näve broccoli och rödlök",
        "1 msk olivolja, oregano & paprika-krydda",
        "Sås: Grekisk yoghurt blandat med vitlök och örter"
      ],
      instructions: [
        "Sätt ugnen på 200 grader.",
        "Blanda sötpotatisklyftor, broccoli och kyckling med olivolja och kryddor på en plåt.",
        "Rosta i ugnen ca 25-30 minuter tills kycklingen är helt klar och sötpotatisen mjuk.",
        "Servera med en klick vitlökssås och färsk spenat."
      ],
      biologicalReason: "Under den follikulära fasens slut och ägglossningen (hormonell sommar) gör höga estradiolspeglar att musklernas förmåga att lagra och utnyttja glykogen ökar dramatiskt. Komplexa kolhydrater från ugnsrostad sötpotatis fyller effektivt dessa glykogensubstrat utan att störa blodsockerbalansen. Högkvalitativt protein från kyckling eller ekologisk tofu tillhandåller nödvändiga aminosyror (leucin, lysin) för muskelproteinsyntesen (anabolism) under de tyngsta lyftpassen, medan broccoli tillför indol-3-karbinol för hälsosam östrogenmetabolism.",
      accentColor: "border-emerald-200 text-emerald-700",
      bgGradient: "from-emerald-50/20 to-[#FAF8F5]/80"
    },
    {
      id: "stress-gröt",
      title: "Lugnande Havregrynsgröt med Magnesiumsmör",
      category: "stress",
      categoryLabel: "Nervsystemslugn & Anti-Kortisol",
      prepTime: "8 min",
      macroInfo: "Rik på magnesium, tryptofan, betaglukaner & nervsystemslugnande mineraler",
      description: "När stressnivåerna är höga eller sömnen varit lidande. Den här gröten är en mjuk kram för ditt nervsystem. Havre stimulerar serotoninproduktionen och mandelsmör lugnar kortisolet.",
      ingredients: [
        "1 dl ekologiska havregryn (gärna fiberrika)",
        "2.5 dl mineralrikt källvatten eller havremjölk",
        "1 msk mandelsmör (rikt på magnesium)",
        "1/2 banan skivad (tryptofanrik för sömnen)",
        "En nypa ceylonkanel och kardemumma"
      ],
      instructions: [
        "Koka upp havregryn med vatten/mjölk och kryddor på svag värme.",
        "Låt sjuda ca 3-5 minuter till en krämig konsistens.",
        "Häll upp i en vacker skål och toppa med bananskivor och en generös sked mandelsmör.",
        "Ät i tystnad utan skärmar för att låta nervsystemet registrera matron."
      ],
      biologicalReason: "Havregryn är laddade med betaglukaner (lösliga fibrer) som saktar ner glukosupptaget i blodet och förhindrar insulin- och kortisolsvängningar. Havre stimulerar även produktionen av neurotransmittorn serotonin via tryptofan. Mandelsmör är proppfullt med biologiskt aktivt magnesium, vilket verkar som en naturlig kalciumantagonist i muskelcellerna, främjar neuromuskulär avslappning och dämpar det sympatiska nervsystemets stresspåslag (sänker 'fight-or-flight'-responsen).",
      accentColor: "border-amber-200 text-amber-700",
      bgGradient: "from-amber-50/10 to-[#FAF8F5]/80"
    },
    {
      id: "klimakterie-chia",
      title: "Benstärkande Chia- & Hallonpudding",
      category: "klimakterie",
      categoryLabel: "Klimakteriestyrka & Kalcium-boost",
      prepTime: "5 min (vila över natten)",
      macroInfo: "Klimakteriesupport med växtöstrogener, kalcium, bor & omega-3",
      description: "För perimenopaus och klimakteriet. Chiafrön är en fantastisk källa till kalcium som skyddar benstommen, medan linfrön tillför milda fytoöstrogener för att lindra värmevallningar.",
      ingredients: [
        "3 msk chiafrön",
        "2 dl osötad mandel- eller sojamjölk",
        "1 tsk krossade linfrön",
        "1 dl varma ekologiska hallon",
        "Topping: 1 msk flagad mandel och lite vaniljpulver"
      ],
      instructions: [
        "Blanda chiafrön, krossade linfrön, mjölk och vaniljpulver i ett glas eller burk.",
        "Rör om ordentligt och låt stå i kylskåp i minst 4 timmar, gärna över natten.",
        "Mosa hallonen lätt med en gaffel.",
        "Varva chiapuddingen med hallonen i ett vackert glas och toppa med mandelspån."
      ],
      biologicalReason: "När östrogenet sjunker under och efter klimakteriet minskar stimuleringen av osteoblasterna, vilket påskyndar nedbrytningen av benvävnad. Chiafrön är en superb växtbaserad källa till kalcium, bor och magnesium i ett optimalt förhållande för benstommen. Linfrön tillför lignaner – en typ av fytoöstrogener som kan binda selektivt till östrogenreceptorer (speciellt ER-beta) och verka balanserande på hormonsvängningar, vilket dämpar vasomotoriska symptom som svettningar och vallningar.",
      accentColor: "border-indigo-150 text-indigo-700",
      bgGradient: "from-indigo-50/10 to-[#FAF8F5]/80"
    }
  ];

  const recipesEn: Recipe[] = [
    {
      id: "pms-knacke",
      title: "Nesting Avocado & Seed Crispbread with Egg",
      category: "pms",
      categoryLabel: "PMS Relief & Progesterone Support",
      prepTime: "10 min",
      macroInfo: "Rich in magnesium, zinc, tryptophan & lipids for progesterone synthesis",
      description: "A soft, grounding breakfast or snack specifically designed for the late luteal phase. Avocado and egg yolk provide healthy cholesterol building blocks for progesterone production, while seeds reduce cravings.",
      ingredients: [
        "1 organic seed crispbread (free from added sugar)",
        "1/2 ripe avocado",
        "1 boiled organic egg (preferably soft-boiled)",
        "A pinch of sea salt flakes & chili flakes",
        "1 tsp pumpkin seeds (rich in magnesium and zinc)"
      ],
      instructions: [
        "Mash the avocado directly onto the crispbread and sprinkle with sea salt flakes.",
        "Slice the egg and lay it on top of the avocado.",
        "Top with pumpkin seeds and chili flakes.",
        "Enjoy slowly with a warm cup of herbal tea."
      ],
      biologicalReason: "Organic egg yolk provides bioavailable cholesterol, which is the necessary biochemical building block for the body's synthesis of luteal hormone (progesterone) in the adrenal glands and corpus luteum. Avocado is rich in healthy monounsaturated fats and glutathione, a potent antioxidant that supports liver phase 2 metabolism. Pumpkin seeds contribute highly concentrated magnesium and zinc, which counteracts muscle tension, balances prostaglandin production, and thereby relieves uterine cramps and PMS.",
      accentColor: "border-[#fd80ff]/20 text-[#fd80ff]",
      bgGradient: "from-[#fff5fc]/40 to-[#FAF8F5]/80"
    },
    {
      id: "preworkout-plat",
      title: "Estrogen-Peak Sweet Potato & Chicken Sheet Pan",
      category: "energy",
      categoryLabel: "Pre-Workout Power & Glycogen Support",
      prepTime: "35 min",
      macroInfo: "Högprotein, optimalt kolhydratsubstrat för anabol fas",
      description: "Perfect meal in the follicular and ovulation phases when estrogen rises and you plan to lift heavy. Sweet potatoes provide stable muscle fuel without blood sugar crashes and chicken repairs fibers.",
      ingredients: [
        "150g organic chicken breast (or tofu for vegetarian)",
        "200g sweet potato cut into wedges",
        "1 handful of broccoli and red onion",
        "1 tbsp olive oil, oregano & paprika spice",
        "Sauce: Greek yogurt mixed with garlic and herbs"
      ],
      instructions: [
        "Preheat the oven to 200°C (392°F).",
        "Mix sweet potato wedges, broccoli, and chicken with olive oil and spices on a sheet pan.",
        "Roast in the oven for about 25-30 minutes until the chicken is fully cooked and sweet potatoes are tender.",
        "Serve with a dollop of garlic sauce and fresh spinach."
      ],
      biologicalReason: "During the late follicular phase and ovulation (hormonal summer), high estradiol levels dramatically increase the muscles' ability to store and utilize glycogen. Complex carbohydrates from oven-roasted sweet potatoes effectively fill these glycogen substrates without disrupting blood sugar balance. High-quality protein from chicken or organic tofu provides necessary amino acids (leucine, lysine) for muscle protein synthesis (anabolism) during your heaviest lifting sessions, while broccoli contributes indole-3-carbinol for healthy estrogen metabolism.",
      accentColor: "border-emerald-200 text-emerald-700",
      bgGradient: "from-emerald-50/20 to-[#FAF8F5]/80"
    },
    {
      id: "stress-gröt",
      title: "Calming Oatmeal with Magnesium Butter",
      category: "stress",
      categoryLabel: "Nervous System Calm & Anti-Cortisol",
      prepTime: "8 min",
      macroInfo: "Rich in magnesium, tryptophan, beta-glucans & nervous system calming minerals",
      description: "When stress levels are high or sleep has been lacking. This oatmeal is a warm hug for your nervous system. Oats stimulate serotonin production and almond butter calms cortisol.",
      ingredients: [
        "1 dl organic oats (preferably fiber-rich)",
        "2.5 dl mineral-rich spring water or oat milk",
        "1 tbsp almond butter (rich in magnesium)",
        "1/2 sliced banana (rich in tryptophan for sleep)",
        "A pinch of Ceylon cinnamon and cardamom"
      ],
      instructions: [
        "Boil oats with water/milk and spices on low heat.",
        "Let simmer for about 3-5 minutes until creamy.",
        "Pour into a beautiful bowl and top with banana slices and a generous spoon of almond butter.",
        "Eat in silence without screens to let the nervous system register meal peace."
      ],
      biologicalReason: "Oatmeal is loaded with beta-glucans (soluble fibers) that slow down glucose absorption in the blood, preventing insulin and cortisol swings. Oats also stimulate production of the neurotransmitter serotonin via tryptophan. Almond butter is packed with biologically active magnesium, which acts as a natural calcium antagonist in muscle cells, promoting neuromuscular relaxation and damping the sympathetic nervous system's stress response (lowering the 'fight-or-flight' response).",
      accentColor: "border-amber-200 text-amber-700",
      bgGradient: "from-amber-50/10 to-[#FAF8F5]/80"
    },
    {
      id: "klimakterie-chia",
      title: "Bone-Strengthening Chia & Raspberry Pudding",
      category: "klimakterie",
      categoryLabel: "Menopause Strength & Calcium Boost",
      prepTime: "5 min (resting overnight)",
      macroInfo: "Menopause support with phytoestrogens, calcium, boron & omega-3",
      description: "For perimenopause and menopause. Chia seeds are a fantastic source of calcium that protects the bones, while flax seeds provide mild phytoestrogens to ease hot flashes.",
      ingredients: [
        "3 tbsp chia seeds",
        "2 dl unsweetened almond or soy milk",
        "1 tsp crushed flax seeds",
        "1 dl warm organic raspberries",
        "Topping: 1 tbsp flaked almonds and a pinch of vanilla powder"
      ],
      instructions: [
        "Mix chia seeds, crushed flax seeds, milk, and vanilla powder in a glass or jar.",
        "Stir well and let stand in the refrigerator for at least 4 hours, preferably overnight.",
        "Mash the raspberries lightly with a fork.",
        "Layer the chia pudding with the raspberries in a beautiful glass and top with almond flakes."
      ],
      biologicalReason: "As estrogen drops during and after menopause, stimulation of osteoblasts decreases, accelerating bone tissue breakdown. Chia seeds are a superb plant-based source of calcium, boron, and magnesium in an optimal ratio for bone structure. Flax seeds provide lignans – a type of phytoestrogens that can selectively bind to estrogen receptors (specifically ER-beta) and balance hormone fluctuations, reducing vasomotor symptoms such as sweating and hot flashes.",
      accentColor: "border-indigo-150 text-indigo-700",
      bgGradient: "from-indigo-50/10 to-[#FAF8F5]/80"
    }
  ];

  const recipes = language === "en" ? recipesEn : recipesSv;

  const filteredRecipes = activeFilter === "all" 
    ? recipes 
    : recipes.filter(r => r.category === activeFilter);

  return (
    <div className="glass-panel rounded-[2.5rem] border border-white/60 shadow-xl overflow-hidden p-6 sm:p-10 text-[#230c1e] relative" id="nourishment-vault-widget">
      
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#fff5fc]/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
        <div className="w-12 h-12 rounded-full bg-[#fff5fc] border border-[#fd80ff]/20 flex items-center justify-center mx-auto">
          <Soup className="w-6 h-6 text-[#fd80ff]" />
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-normal tracking-tight text-center">
          {t.headerTitle}
        </h3>
        <p className="text-xs sm:text-sm text-[#230c1e]/75 font-sans font-light text-center">
          {t.headerSub}
        </p>

        {/* Filter categories tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-6 font-sans">
          {[
            { id: "all", label: t.filterAll },
            { id: "pms", label: t.filterPms },
            { id: "energy", label: t.filterEnergy },
            { id: "stress", label: t.filterStress },
            { id: "klimakterie", label: t.filterKlimakterie }
          ].map((filt) => (
            <button
              key={filt.id}
              onClick={() => { setActiveFilter(filt.id); setSelectedRecipe(null); }}
              className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === filt.id 
                  ? "bg-[#230c1e] text-white shadow-xs" 
                  : "bg-white/30 hover:bg-white/60 text-[#230c1e] border border-white/50"
              }`}
            >
              {filt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recipes list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start font-sans">
        <AnimatePresence>
          {filteredRecipes.map((recipe) => {
            return (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-3xl border p-6 bg-gradient-to-br ${recipe.bgGradient} transition-[border-color,box-shadow,transform] duration-300 relative overflow-hidden shadow-xs hover:shadow-md cursor-pointer border-white/55 active:scale-[0.98]`}
                onClick={() => setSelectedRecipe(recipe)}
              >
                {/* Visual Glow on cards */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#fd80ff]/5 rounded-full filter blur-xl pointer-events-none" />

                <div className="space-y-4 text-left">
                  {/* Category & Badge */}
                  <div className="flex justify-between items-center">
                    <span className="text-[8.5px] font-black uppercase tracking-widest text-[#230c1e]/70 bg-white/60 px-3 py-1 rounded-full border border-white/40">
                      {recipe.categoryLabel}
                    </span>
                    <div className="flex items-center gap-1.5 text-[9.5px] text-[#230c1e]/60 font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{recipe.prepTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-[#230c1e] leading-tight">
                    {recipe.title}
                  </h4>

                  {/* Short description */}
                  <p className="text-xs sm:text-[13.5px] text-[#230c1e]/80 leading-relaxed font-light">
                    {recipe.description}
                  </p>

                  {/* Nutrition value badge */}
                  <div className="flex items-center gap-2 text-[9.5px] font-bold text-[#230c1e]/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fd80ff]" />
                    <span>{recipe.macroInfo}</span>
                  </div>

                  {/* Show details CTA */}
                  <div className="pt-2 flex justify-between items-center text-[10px] uppercase font-bold tracking-wider text-[#230c1e]/80">
                    <span className="hover:text-[#fd80ff] transition-colors flex items-center gap-1">
                      {t.viewDetails}
                      <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Recipe Detail Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md"
            onClick={() => setSelectedRecipe(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="bg-[#FAF8F5] w-full max-w-2xl max-h-[85vh] rounded-[2.5rem] border border-white/60 shadow-2xl overflow-y-auto p-6 sm:p-10 text-[#230c1e] relative font-sans space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:text-[#230c1e] hover:border-stone-400 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4 text-left">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#230c1e]/70 bg-white/60 px-3 py-1 rounded-full border border-stone-200/50">
                    {selectedRecipe.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-stone-500 font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{selectedRecipe.prepTime}</span>
                  </div>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#230c1e] leading-tight pr-6">
                  {selectedRecipe.title}
                </h3>

                <p className="text-sm text-stone-600 leading-relaxed font-light">
                  {selectedRecipe.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-bold text-stone-700">
                  <span className="w-2 h-2 rounded-full bg-[#fd80ff]" />
                  <span>{selectedRecipe.macroInfo}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-left font-sans">
                {/* Ingredients */}
                <div className="space-y-3 bg-white/40 p-5 rounded-2xl border border-stone-200/30">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">{t.ingredientsLabel}</span>
                  <ul className="space-y-2 text-sm text-[#230c1e]/90 font-light">
                    {selectedRecipe.ingredients.map((ing, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <span className="text-[#fd80ff] mt-0.5">•</span>
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div className="space-y-3 bg-white/40 p-5 rounded-2xl border border-stone-200/30">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">{t.instructionsLabel}</span>
                  <ol className="space-y-2.5 text-sm text-[#230c1e]/90 font-light list-decimal list-inside font-sans">
                    {selectedRecipe.instructions.map((step, i) => (
                      <li key={i} className="leading-relaxed">
                        <span className="font-normal text-[#230c1e] ml-1">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Biological superpower */}
              <div className="bg-[#fff5fc]/60 p-5 rounded-2xl border border-[#fd80ff]/20 space-y-2 shadow-2xs text-left">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#fd80ff] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> {t.bioLabel}
                </span>
                <p className="text-sm text-[#230c1e]/85 leading-relaxed font-light">
                  {selectedRecipe.biologicalReason}
                </p>
              </div>

              <div className="pt-2 text-center">
                <button 
                  onClick={() => setSelectedRecipe(null)}
                  className="w-full sm:w-auto bg-[#230c1e] hover:bg-[#3d1534] text-white text-[10px] font-sans font-semibold uppercase tracking-widest px-8 py-3.5 rounded-full cursor-pointer transition-all active:scale-[0.98]"
                >
                  {t.closeBtn}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
