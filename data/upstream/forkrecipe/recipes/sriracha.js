export default {
  repoId: "master_thai_sriracha_001",
  parentRepoId: null,
  slug: "sriracha",
  author: "ForkRecipe Kitchen",

  title: "Sriracha",
  description: "Red jalapeños ground with garlic and left to ferment for three days, then cooked briefly with vinegar and sugar — the result is a hot sauce with more depth than anything from a bottle, because time did the real seasoning.",
  cuisine: "Thai-American",
  culture: "Thai",
  category: "condiments",

  tags: ["hot sauce", "fermented", "thai", "chili", "garlic", "condiment"],
  difficulty: 2,
  activeTime: "25 min",
  totalTime: "3 days 25 min",
  ratioSystem: "parts",

  stars: 1980,
  forks: 246,
  contributors: 62,
  license: "CC-BY-SA",
  createdAt: "2024-06-20",
  updatedAt: "2025-01-15",

  flavorRadar: { sweet: 2, salty: 2, sour: 3, bitter: 1, umami: 2, heat: 5 },

  ingredients: [
    { ingId: "ing_01", role: "Structure", name: "Red jalapeños (or Fresno chilis)",       ratioValue: 100, defaultUnit: "parts", substitutions: ["red serranos", "red Holland chilis"] },
    { ingId: "ing_02", role: "Allium",    name: "Garlic cloves (peeled)",                 ratioValue: 8,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Sweetener", name: "White sugar",                            ratioValue: 10,  defaultUnit: "parts", substitutions: ["palm sugar", "brown sugar"] },
    { ingId: "ing_04", role: "Seasoning", name: "Salt (non-iodized)",                     ratioValue: 3,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Acid",      name: "Distilled white vinegar",                ratioValue: 20,  defaultUnit: "parts", substitutions: ["rice vinegar (milder)"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Blend",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_04"],
      outputState: "chili_mash",
      instructions: "Remove the stems from the chilis but leave the seeds — they carry heat and pectin that thickens the final sauce. Combine chilis, garlic, sugar, and salt in a food processor or blender. Pulse until you have a coarse, textured mash — think chunky salsa consistency, not a smooth puree. The mash should be bright red-orange and smell intensely of raw chili and sharp garlic. Transfer to a clean glass jar, leaving 3cm of headspace for fermentation gases.",
      visualCue: {
        primaryTarget: "A bright red-orange coarse mash that holds its texture when spooned — not a smooth paste, not large visible chunks. Seeds distributed throughout.",
        spectrum: [
          { state: "Underdone", description: "Still has large chili and garlic pieces. Uneven texture will ferment unevenly and clog the blender in the final step.", action: "Pulse more aggressively in short bursts until the texture is uniformly chunky." },
          { state: "Perfect",   description: "Evenly textured, deep red-orange mash. Seeds are visible but uniformly distributed. Aroma is sharply pungent — raw chili, garlic, and salt.", action: "Transfer to a jar and begin fermentation." },
          { state: "Overdone",  description: "Over-blended into a completely smooth puree. No texture remaining.", action: "Proceed — the fermentation and final cook will produce a thicker-than-ideal but perfectly fine sriracha." },
        ],
      },
      feelCue: "Wear gloves and avoid touching your eyes — the capsaicin in the mash will burn exposed skin. The raw mash should smell sharply pungent, almost eye-watering, with a bright green-red herbal note from the chili flesh.",
    },
    {
      nodeId: "step_2",
      action: "Ferment",
      inputs: ["chili_mash"],
      outputState: "fermented_mash",
      instructions: "Cover the jar loosely with cheesecloth secured with a rubber band — this allows fermentation gases to escape while keeping contaminants out. Store at room temperature (18–24°C) for 3–7 days. Stir the mash once per day with a clean spoon. After 24 hours, you should see small bubbles forming throughout the mash. By day 3, the mash will smell noticeably more complex — less raw, more savory, with an acidic tang. The color deepens from bright red to a darker, more saturated crimson.",
      visualCue: {
        primaryTarget: "Visible small bubbles throughout the mash surface when stirred. Color is deeper than the original red-orange.",
        spectrum: [
          { state: "Underdone", description: "No bubbles at all after 48 hours. Mash smells identical to day one — raw and sharp with no acidic note.", action: "Move the jar to a warmer spot (22–26°C). If still no activity after 72 hours, the salt percentage was too high or the chilis carried residual pesticide — start again with organic chilis." },
          { state: "Perfect",   description: "Steady fine bubbles throughout, especially when stirred. Mash has a tangy, complex aroma with garlic deepened and raw chili edge smoothed. Day 3 is typical for a lively ferment.", action: "Proceed to cooking with vinegar." },
          { state: "Overdone",  description: "Fermented past day 7 in warm conditions — mash smells very acidic, almost alcoholic, and the color has turned dark brown-red.", action: "Proceed with cooking — the extra fermentation increases acidity and complexity. Reduce the added vinegar by half to compensate." },
        ],
      },
      feelCue: "Lean close to the jar and stir — a properly fermenting mash releases a wave of savory, slightly tangy heat that is noticeably different from the raw sharpness of day one. Your eyes may water, but this time from acidity, not raw capsaicin.",
    },
    {
      nodeId: "step_3",
      action: "Simmer",
      inputs: ["fermented_mash", "ing_05"],
      outputState: "cooked_sriracha",
      instructions: "Transfer the fermented mash and vinegar to a saucepan. Bring to a boil over medium heat, then reduce to a steady simmer for 5–7 minutes, stirring frequently. The mash will thicken and darken slightly as it cooks. The vinegar both preserves the sauce and brightens the acidic note that fermentation softened. Do not over-reduce — you want a pourable hot sauce, not a paste.",
      visualCue: {
        primaryTarget: "A bubbling, deep red-orange sauce that has thickened slightly and smells cooked rather than raw.",
        spectrum: [
          { state: "Underdone", description: "Sauce is still thin and the mash hasn't fully integrated with the vinegar. Tastes separately of mash and vinegar.", action: "Simmer 2–3 more minutes, stirring constantly." },
          { state: "Perfect",   description: "A unified, deeply red sauce that coats the back of a spoon. Aroma is cooked chili, garlic, and vinegar — the signature sriracha note. Visible steam and gentle bubbling.", action: "Blend until smooth, then strain and bottle." },
          { state: "Overdone",  description: "Sauce has reduced too much — it is thick and sticky, pulling away from the pan sides.", action: "Add water a tablespoon at a time until the consistency loosens to a pourable sauce." },
        ],
      },
      feelCue: "The simmering sauce should fill the kitchen with a sweet-spicy vapor that makes the back of your throat tingle — put on the range hood fan.",
    },
    {
      nodeId: "step_4",
      action: "Blend",
      inputs: ["cooked_sriracha"],
      outputState: "finished_sriracha",
      instructions: "Allow the cooked sauce to cool for 10 minutes. Transfer to a blender and blend on high for 1–2 minutes until completely smooth. Pass through a fine-mesh strainer, pressing firmly with a spoon to extract every drop of sauce. Discard the dry solids (mostly seeds and skin). The strained sauce will be glossy, smooth, and deeply red. Bottle in sterilized squeeze bottles or glass jars. Refrigerate — it will keep for 6 months.",
      visualCue: {
        primaryTarget: "A glossy, smooth, deep red sauce with a consistency just thin enough to squeeze from a bottle but thick enough to hold a trail on a plate.",
        spectrum: [
          { state: "Underdone", description: "Sauce still has visible seeds and skin fragments after straining. Texture is rough.", action: "Strain again, pressing more firmly. If seeds are still passing through, use a finer strainer or cheesecloth." },
          { state: "Perfect",   description: "Silky smooth, glossy dark red. No particles. Drizzled on a white plate, it holds a clean trail and doesn't run immediately.", action: "Bottle and refrigerate." },
          { state: "Overdone",  description: "Over-strained and very little sauce remains — the solids were too dry to yield more.", action: "Add 1–2 tablespoons of water to the solids and press again; you will recover more sauce." },
        ],
      },
      feelCue: "The finished sauce should smell unmistakably like sriracha — that garlic-forward, vinegary, roasted chili aroma — but richer, more complex, and less synthetic than anything from a commercial bottle.",
    },
  ],
};
