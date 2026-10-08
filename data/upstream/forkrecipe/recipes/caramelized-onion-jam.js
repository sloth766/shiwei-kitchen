export default {
  repoId: "master_french_onion_jam_001",
  parentRepoId: null,
  slug: "caramelized-onion-jam",
  author: "ForkRecipe Kitchen",

  title: "Caramelized Onion Jam",
  description: "Two pounds of onions cooked into a quarter of their volume over an hour of patient heat — collapsing, sweetening, browning into a mahogany jam that makes every charcuterie board, burger, and cheese plate infinitely better.",
  cuisine: "French",
  culture: "French",
  category: "condiments",

  tags: ["onion", "jam", "french", "condiment", "caramelized", "spread"],
  difficulty: 2,
  activeTime: "75 min",
  totalTime: "90 min",
  ratioSystem: "parts",

  stars: 1680,
  forks: 163,
  contributors: 47,
  license: "CC-BY-SA",
  createdAt: "2024-09-10",
  updatedAt: "2025-04-05",

  flavorRadar: { sweet: 4, salty: 2, sour: 2, bitter: 1, umami: 4, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure", name: "Yellow onions (thinly sliced)",           ratioValue: 100, defaultUnit: "parts", substitutions: ["sweet Vidalia onions", "red onions (for color)"] },
    { ingId: "ing_02", role: "Fat",       name: "Unsalted butter",                          ratioValue: 8,   defaultUnit: "parts", substitutions: ["olive oil", "combination of both"] },
    { ingId: "ing_03", role: "Seasoning", name: "Salt",                                     ratioValue: 1.5, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Sweetener", name: "Brown sugar",                              ratioValue: 5,   defaultUnit: "parts", substitutions: ["white sugar", "honey"] },
    { ingId: "ing_05", role: "Acid",      name: "Balsamic vinegar",                         ratioValue: 6,   defaultUnit: "parts", substitutions: ["red wine vinegar", "sherry vinegar"] },
    { ingId: "ing_06", role: "Solvent",   name: "Dry white wine or dry vermouth",           ratioValue: 10,  defaultUnit: "parts", substitutions: ["chicken stock", "water"] },
    { ingId: "ing_07", role: "Herb",      name: "Fresh thyme (3–4 sprigs)",                 ratioValue: 1,   defaultUnit: "parts", substitutions: ["dried thyme (use half)", "bay leaf"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Sauté",
      inputs: ["ing_02", "ing_01", "ing_03", "ing_07"],
      outputState: "wilted_onions",
      instructions: "Melt the butter in a wide, heavy-bottomed skillet or Dutch oven over medium heat. Add all the sliced onions, salt, and thyme at once. The pan will appear overfull — this is correct, they reduce dramatically. Stir to coat in butter, then cook undisturbed for 5 minutes until the bottom layer begins to soften and turn translucent. The salt draws moisture immediately, which will build into a gentle steam. Stir every 3–4 minutes.",
      visualCue: {
        primaryTarget: "Onions have reduced to about half their original volume, are fully translucent, and are coated in a thin, glossy liquid from released moisture.",
        spectrum: [
          { state: "Underdone", description: "Onions are still opaque and mostly raw. The pan still looks very full with minimal liquid released.", action: "Be patient — do not raise the heat. The goal here is gentle moisture release, not browning. Continue at medium heat." },
          { state: "Perfect",   description: "Fully translucent, volume reduced by half. A pool of onion liquor has collected at the base. The aroma is sweet, just faintly cooked onion, nothing brown yet.", action: "Begin the long caramelization phase." },
          { state: "Overdone",  description: "Onions are browning before fully softening — some edges are golden while the centers are still firm. The heat is too high.", action: "Reduce heat immediately to medium-low. Add 2 tablespoons of water and stir to redistribute. Browned onions before fully soft will not caramelize properly." },
        ],
      },
      feelCue: "The kitchen should smell of gentle, sweet onion steam — moist and mild, like onion soup beginning, not like frying.",
    },
    {
      nodeId: "step_2",
      action: "Caramelize",
      inputs: ["wilted_onions"],
      outputState: "caramelized_onions",
      instructions: "Reduce heat to medium-low. From this point, the process takes 45–60 minutes and cannot be hurried. Stir every 5 minutes, scraping up any fond developing on the pan bottom. Do not add liquid unless the onions are sticking and threatening to burn — the moisture from the onions themselves is sufficient. At the 20-minute mark the onions will be golden; at 40 minutes, amber; at 60 minutes, a deep mahogany. The aroma shifts from raw sweetness to something deeply complex — caramel, savory, and almost meaty from the Maillard reaction.",
      visualCue: {
        primaryTarget: "Onions are a deep mahogany-brown, reduced to a fraction of their original volume, utterly soft, and glistening with their own concentrated juices.",
        spectrum: [
          { state: "Underdone", description: "Onions are golden but not mahogany. They still have visible structure and the aroma is mild and sweet rather than complex and deep.", action: "Continue at medium-low heat. This step cannot be shortened — pale gold onions are not caramelized, they are merely softened." },
          { state: "Perfect",   description: "Deep mahogany, almost jammy in appearance. Reduced to 20% of original volume. A spoon dragged across the pan reveals a clear line that fills slowly. Rich, caramel-savory aroma.", action: "Deglaze with wine, then add sugar and balsamic." },
          { state: "Overdone",  description: "Onions are dark brown and sticking aggressively. Some spots are nearly black. A slight burnt smell is present.", action: "Add 50ml of water immediately and stir vigorously. Remove any carbonized spots. The very dark caramel flavor may add bitterness — balance with more balsamic vinegar." },
        ],
      },
      feelCue: "The onions at this stage should feel almost gelatinous when stirred — they have collapsed into a soft, cohesive mass rather than individual strands, and the spoon meets almost no resistance.",
    },
    {
      nodeId: "step_3",
      action: "Deglaze",
      inputs: ["caramelized_onions", "ing_06", "ing_04", "ing_05"],
      outputState: "finished_onion_jam",
      instructions: "Pour in the wine and stir vigorously, scraping up all the fond from the pan bottom — this is concentrated flavor. Add the brown sugar and balsamic vinegar. Increase heat to medium and cook for another 5–8 minutes, stirring frequently, until the liquid has reduced almost completely and the mixture is thick, glossy, and jammy. Remove the thyme sprigs. Taste and adjust: more balsamic for tartness, more sugar for sweetness, a pinch more salt if flat.",
      visualCue: {
        primaryTarget: "A thick, glossy, deep mahogany jam that mounds slightly on a spoon and falls in slow, heavy drops rather than running freely.",
        spectrum: [
          { state: "Underdone", description: "The jam is still loose and runny — the wine and vinegar haven't reduced enough. It slides off a spoon like a thin syrup.", action: "Continue cooking over medium heat, stirring constantly, for another 3–5 minutes until the liquid visibly thickens." },
          { state: "Perfect",   description: "Thick, jammy, glistening mahogany. Falls from a spoon in slow, reluctant drops. Flavor is deeply sweet, savory, and acidic in perfect balance.", action: "Cool and store in a jar. Refrigerates for 2 weeks." },
          { state: "Overdone",  description: "Jam has reduced too far and is stiff and sticky, pulling away from the pan in a single mass.", action: "Add 2 tablespoons of water or extra wine and stir over low heat to loosen." },
        ],
      },
      feelCue: "Spread a small amount on your finger — it should feel like thick, warm jam, slightly tacky and coating your skin without dripping. If it runs off, cook longer.",
    },
  ],
};
