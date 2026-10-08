export default {
  repoId: "master_japanese_katsu_sauce_001",
  parentRepoId: null,
  slug: "katsu-sauce",
  author: "ForkRecipe Kitchen",

  title: "Katsu Sauce",
  description: "Japan's interpretation of Worcestershire — a thick, sweet-sour, deeply umami sauce built on fruit puree and fermented condiments, designed specifically to cut through the richness of deep-fried panko breading.",
  cuisine: "Japanese",
  culture: "Japanese Yōshoku",
  category: "condiments",

  tags: ["katsu", "tonkatsu", "japanese", "yoshoku", "fruity", "sweet", "dipping-sauce"],
  difficulty: 1,
  activeTime: "5 min",
  totalTime: "5 min",
  ratioSystem: "parts",

  stars: 1356,
  forks: 143,
  contributors: 47,
  license: "CC-BY-SA",
  createdAt: "2024-10-20",
  updatedAt: "2025-01-05",

  flavorRadar: { sweet: 4, salty: 3, sour: 3, bitter: 1, umami: 4, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Umami",     name: "Worcestershire sauce",              ratioValue: 25, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_02", role: "Umami",     name: "Ketchup (best quality)",            ratioValue: 25, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Sweetener", name: "Oyster sauce",                      ratioValue: 15, defaultUnit: "parts", substitutions: ["hoisin sauce"] },
    { ingId: "ing_04", role: "Sweetener", name: "Sugar",                             ratioValue: 5,  defaultUnit: "parts", substitutions: ["honey"] },
    { ingId: "ing_05", role: "Umami",     name: "Soy sauce",                         ratioValue: 5,  defaultUnit: "parts", substitutions: ["tamari"] },
    { ingId: "ing_06", role: "Spice",     name: "Japanese mustard (karashi) or dry mustard", ratioValue: 1, defaultUnit: "parts", substitutions: ["hot English mustard"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Mix",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_04", "ing_05", "ing_06"],
      outputState: "finished_katsu_sauce",
      instructions: "Combine all ingredients in a small bowl and whisk until completely smooth and the sugar is fully dissolved. Katsu sauce requires no cooking — the fermented condiments are already complex and balanced. Taste immediately: it should be simultaneously sweet, sour, savory, and faintly spicy in sequence. Adjust with more Worcestershire for depth, more ketchup for sweetness, more soy for saltiness. Keeps refrigerated for up to 1 month. The mustard will mellow over 24 hours as it hydrates.",
      visualCue: {
        primaryTarget: "A smooth, dark brown sauce — slightly darker than ketchup — with a medium-thick consistency that flows easily off a spoon.",
        spectrum: [
          { state: "Underdone", description: "Sugar not dissolved — visible granules at the bottom of the bowl. Ingredients not fully integrated.", action: "Whisk more vigorously for 1 minute until sugar dissolves completely." },
          { state: "Perfect",   description: "Smooth, glossy, dark brown sauce. No visible grains. Flows freely but coats a spoon. Balanced sweet-savory-sour taste.", action: "Serve immediately alongside fried cutlets, or refrigerate up to 1 month." },
          { state: "Overdone",  description: "Not really possible with a no-cook sauce. At most, the elements may taste unbalanced.", action: "Taste and adjust — more Worcestershire, ketchup, or soy as needed." },
        ],
      },
      feelCue: "Katsu sauce should feel slightly thicker than soy sauce on your tongue — syrupy but not cloying. The flavor sequence is important: sweetness first, then savory fermented depth, then a trailing sharpness from the Worcestershire that keeps it from being too simple.",
    },
  ],
};
