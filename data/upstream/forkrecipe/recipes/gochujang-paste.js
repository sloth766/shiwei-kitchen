export default {
  repoId: "master_korean_gochujang_001",
  parentRepoId: null,
  slug: "gochujang-paste",
  author: "ForkRecipe Kitchen",

  title: "Gochujang Paste",
  description: "Korean gochugaru chili fermented with meju powder, glutinous rice, and salt over weeks — a deep brick-red paste with layers of sweet, spicy, and savory complexity that no commercial tub can replicate, the foundational flavor of Korean cooking.",
  cuisine: "Korean",
  culture: "Korean",
  category: "condiments",

  tags: ["gochujang", "korean", "fermented", "chili paste", "condiment", "umami"],
  difficulty: 3,
  activeTime: "40 min",
  totalTime: "30 days 40 min",
  ratioSystem: "parts",

  stars: 1160,
  forks: 87,
  contributors: 23,
  license: "CC-BY-SA",
  createdAt: "2024-12-01",
  updatedAt: "2025-05-15",

  flavorRadar: { sweet: 3, salty: 4, sour: 1, bitter: 1, umami: 4, heat: 4 },

  ingredients: [
    { ingId: "ing_01", role: "Spice",     name: "Korean gochugaru (coarse red pepper flakes)", ratioValue: 100, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_02", role: "Starch",    name: "Glutinous rice flour (sweet rice flour)",    ratioValue: 50,  defaultUnit: "parts", substitutions: ["regular rice flour (slightly different texture)"] },
    { ingId: "ing_03", role: "Liquid",    name: "Water",                                       ratioValue: 150, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Umami",     name: "Meju powder (fermented soybean powder)",     ratioValue: 30,  defaultUnit: "parts", substitutions: ["miso paste (reduce salt)", "doenjang (reduce salt)"] },
    { ingId: "ing_05", role: "Sweetener", name: "Yeotgireum (barley malt syrup) or honey",    ratioValue: 40,  defaultUnit: "parts", substitutions: ["rice syrup", "honey"] },
    { ingId: "ing_06", role: "Seasoning", name: "Salt (non-iodized)",                         ratioValue: 20,  defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Simmer",
      inputs: ["ing_02", "ing_03"],
      outputState: "rice_porridge",
      instructions: "Whisk the glutinous rice flour into the cold water until no lumps remain, then transfer to a small saucepan. Cook over medium heat, stirring constantly with a wooden spoon or whisk, for 5–7 minutes until the mixture thickens to a thick, glossy porridge — it should hold a brief trail when you drag a spoon through it, like very thick cream of wheat. This porridge is the fermentation substrate and provides the sugars that the microorganisms will slowly convert. Remove from heat and cool to room temperature before combining with other ingredients.",
      visualCue: {
        primaryTarget: "A thick, glossy, translucent porridge — sticky and pulling away from the sides of the pan when stirred. Pale white to very light cream in color.",
        spectrum: [
          { state: "Underdone", description: "Mixture is still pourable and thin, like a pancake batter. No glossiness yet.", action: "Continue cooking over medium heat, stirring constantly. The starches need to fully gelatinize." },
          { state: "Perfect",   description: "Thick, glossy, and pulling away from the pan slightly. A spoon dragged through holds a clear path for 3 seconds before it slowly fills in.", action: "Remove from heat and cool completely." },
          { state: "Overdone",  description: "Porridge has started to stick and scorch at the base. Brown spots appearing.", action: "Transfer immediately to a clean bowl. Taste — if it tastes burnt, the scorched portion will carry through. Start again if heavily burnt." },
        ],
      },
      feelCue: "The cooled porridge should feel like very thick, sticky paste between your fingers — not liquid at all, but not rubbery either. It should stretch slightly before breaking.",
    },
    {
      nodeId: "step_2",
      action: "Mix",
      inputs: ["rice_porridge", "ing_01", "ing_04", "ing_05", "ing_06"],
      outputState: "gochujang_mixture",
      instructions: "In a large non-reactive bowl, combine the cooled rice porridge, gochugaru, meju powder, yeotgireum (barley malt syrup or honey), and salt. Mix thoroughly with a wooden spoon or, wearing gloves, by hand. The mixture will initially look like it cannot possibly combine — the gochugaru is dry and the porridge is wet — but after 3–5 minutes of mixing it will come together into a thick, uniform deep-red paste. It should be the consistency of peanut butter — stiff but spreadable.",
      visualCue: {
        primaryTarget: "A uniform, deep brick-red paste with no visible dry clumps of gochugaru or white streaks of rice porridge. Glossy and cohesive.",
        spectrum: [
          { state: "Underdone", description: "Dry gochugaru is still visible as red powder on the surface, not yet incorporated into the porridge base.", action: "Mix more vigorously. Work in circular pressing motions to fully incorporate the dry into the wet." },
          { state: "Perfect",   description: "Uniformly deep brick-red, glossy, and thick. A wooden spoon dragged through leaves a clean channel that holds its shape. Aroma is earthy chili and sweet malt.", action: "Transfer to fermentation vessel." },
          { state: "Overdone",  description: "Over-mixed and the paste has become aerated and slightly lighter in color.", action: "Proceed. The aeration is cosmetic and will settle during fermentation." },
        ],
      },
      feelCue: "Wearing gloves, press the paste against the bowl — it should feel like thick, smooth modeling clay, stiff but yielding, with the faint heat of the gochugaru immediately perceptible through the glove material.",
    },
    {
      nodeId: "step_3",
      action: "Ferment",
      inputs: ["gochujang_mixture"],
      outputState: "finished_gochujang_paste",
      instructions: "Transfer to a traditional onggi clay pot or, practically, a wide-mouth glass jar. Smooth the surface flat, then press a piece of parchment paper or plastic wrap directly onto the surface to prevent a crust from forming. Cover the jar loosely with cloth. Store outdoors in a sunny spot (traditional) or in a warm room (18–25°C). Over 4 weeks, the paste will ferment: the meju's enzymes will break down proteins and starches into glutamates and sugars, the chili will mellow slightly, and the paste will develop the characteristic gochujang depth. Stir daily for the first week. The longer it ferments, the more complex the flavor — some cooks ferment for 6 months.",
      visualCue: {
        primaryTarget: "After 4 weeks: a dark, deep brick-red paste with a noticeably more complex aroma than when packed. The surface may show a thin, dark crust — this is normal.",
        spectrum: [
          { state: "Underdone", description: "After 2 weeks, the paste tastes primarily of raw gochugaru with only a faint savory depth. The meju hasn't fully worked.", action: "Continue fermenting. Four weeks is the minimum for any meaningful complexity to develop." },
          { state: "Perfect",   description: "After 4 weeks: the paste has a deep, unified flavor — sweet, salty, spicy, and savory in one. Color is a deep mahogany-red. The raw gochugaru edge has rounded and deepened.", action: "The gochujang is ready to use. Refrigerate to halt fermentation." },
          { state: "Overdone",  description: "After 6+ months in warm conditions: very dark, concentrated, with an almost fermented-soy flavor. Very savory, less sweet.", action: "Still excellent — this is a more mature gochujang. Use in smaller quantities in marinades and stews." },
        ],
      },
      feelCue: "A fully fermented gochujang should have a deep, complex aroma when you open the jar — earthy, sweet, and slightly funky from the meju, with the chili heat in the background rather than the foreground.",
    },
  ],
};
