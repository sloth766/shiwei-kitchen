export default {
  repoId: "master_thai_fish_curry_001",
  parentRepoId: null,
  slug: "thai-fish-curry",
  author: "ForkRecipe Kitchen",

  title: "Thai Red Fish Curry",
  description: "Coconut cream and red curry paste in their essential dialogue — the paste blooms in oil until the room smells like a Thai kitchen, coconut cream added in stages to build a sauce that is simultaneously rich and electric with heat.",
  cuisine: "Thai",
  culture: "Thai",
  category: "seafood",

  tags: ["thai", "curry", "coconut", "fish", "red curry", "southeast asian"],
  difficulty: 2,
  activeTime: "25 min",
  totalTime: "40 min",
  ratioSystem: "parts",

  stars: 2100,
  forks: 222,
  contributors: 58,
  license: "CC-BY-SA",
  createdAt: "2024-09-25",
  updatedAt: "2025-04-08",

  flavorRadar: { sweet: 3, salty: 3, sour: 2, bitter: 1, umami: 4, heat: 4 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Firm white fish (snapper or barramundi, skin-on, cut into 5cm pieces)", ratioValue: 100, defaultUnit: "parts", substitutions: ["salmon", "tofu for vegan"] },
    { ingId: "ing_02", role: "Spice",     name: "Thai red curry paste",                              ratioValue: 15,  defaultUnit: "parts", substitutions: ["green curry paste for a different heat profile"] },
    { ingId: "ing_03", role: "Dairy",     name: "Full-fat coconut cream (not milk)",                 ratioValue: 100, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Umami",     name: "Fish sauce",                                        ratioValue: 8,   defaultUnit: "parts", substitutions: ["soy sauce for vegan"] },
    { ingId: "ing_05", role: "Sweetener", name: "Palm sugar (or light brown sugar)",                 ratioValue: 5,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Structure", name: "Thai eggplant (halved) or bamboo shoots",          ratioValue: 30,  defaultUnit: "parts", substitutions: ["zucchini", "bell pepper"] },
    { ingId: "ing_07", role: "Herb",      name: "Fresh Thai basil (holy basil preferred)",           ratioValue: 8,   defaultUnit: "parts", substitutions: ["regular basil"] },
    { ingId: "ing_08", role: "Aromatic",  name: "Kaffir lime leaves (torn)",                        ratioValue: 3,   defaultUnit: "parts", substitutions: ["lime zest"] },
    { ingId: "ing_09", role: "Acid",      name: "Fresh lime juice",                                  ratioValue: 8,   defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Bloom",
      inputs: ["ing_02", "ing_03"],
      outputState: "bloomed_paste",
      instructions: "Spoon 4 tablespoons of the thick cream that has risen to the top of the coconut cream can into a wok or wide pan. Heat over medium-high until it begins to bubble and the cream starts to separate (the oil splits from the solids). Add the red curry paste and fry in the coconut cream for 2-3 minutes, stirring constantly, until the paste darkens slightly, the oil separates fully, and the fragrance fills the kitchen. This frying step in coconut cream is the most important step — do not rush it.",
      visualCue: {
        primaryTarget: "The curry paste has darkened and is frying in released coconut oil around it. Oil has clearly separated and is visible pooling at the edges of the paste.",
        spectrum: [
          { state: "Underdone", description: "Paste is pale and wet, sitting in coconut cream without frying. No separation, no darkening.", action: "Increase heat to medium-high. The cream must split for the paste to fry." },
          { state: "Perfect",   description: "Paste is deeper in color, fragrant, and surrounded by separated coconut oil. The smell is intensely of lemongrass, galangal, and chile.", action: "Add the rest of the coconut cream in stages." },
          { state: "Overdone",  description: "Paste is dark and sticking to the pan. Some pieces are beginning to burn. Acrid smell.", action: "Add remaining coconut cream immediately to stop the cooking." },
        ],
      },
      feelCue: "When the curry paste is properly bloomed, the fragrance is extraordinary — layers of lemongrass, galangal, kaffir lime, and chile rising together in one aromatic cloud.",
    },
    {
      nodeId: "step_2",
      action: "Simmer",
      inputs: ["bloomed_paste", "ing_03", "ing_04", "ing_05", "ing_08", "ing_06"],
      outputState: "curry_sauce",
      instructions: "Add the remaining coconut cream and stir to combine with the bloomed paste. Add fish sauce, palm sugar, and torn kaffir lime leaves. Stir and taste — adjust the balance of salty (fish sauce), sweet (palm sugar), and heat (curry paste) until it feels harmonious. Add the Thai eggplant. Simmer for 5-7 minutes until the eggplant is just tender but still holds its shape. The sauce should be rich, slightly thickened, and deeply colored.",
      visualCue: {
        primaryTarget: "A deep orange-red sauce with visible coconut cream richness — slightly glossy and uniform. Eggplant pieces are tender and have absorbed the sauce color.",
        spectrum: [
          { state: "Underdone", description: "Sauce is thin and pale. Eggplant is still firm and white inside. Curry paste flavor is thin.", action: "Simmer 5 more minutes. The vegetables need time to release moisture and concentrate the sauce." },
          { state: "Perfect",   description: "Rich, orange-red, slightly thickened sauce. Eggplant is tender all the way through. Balanced flavor profile.", action: "Add fish and cook briefly." },
          { state: "Overdone",  description: "Sauce has reduced too far and is very thick and oily. Eggplant has collapsed into mush.", action: "Add a splash of water to loosen. Proceed to cook the fish." },
        ],
      },
      feelCue: "A properly balanced Thai curry sauce should taste of four things simultaneously: heat, sweetness, salt, and the citrus ghost of kaffir lime. If any one dominates, adjust.",
    },
    {
      nodeId: "step_3",
      action: "Poach",
      inputs: ["curry_sauce", "ing_01"],
      outputState: "cooked_curry",
      instructions: "Nestle the fish pieces into the simmering curry sauce. Reduce heat to medium-low, cover, and cook for 4-6 minutes depending on thickness. Fish is done when it turns opaque throughout and flakes easily when a fork is pressed gently against the flesh. Do not stir after adding fish — the pieces are delicate and will break apart. Gently baste by spooning sauce over the exposed tops once during cooking.",
      visualCue: {
        primaryTarget: "Fish is opaque white throughout with a slight orange tinge from the sauce. The flesh flakes easily when a fork is pressed at the thickest point.",
        spectrum: [
          { state: "Underdone", description: "Fish has a translucent center and resists flaking. The flesh is cool at the center.", action: "Cover and cook 2-3 more minutes. Check again by pressing gently with a fork." },
          { state: "Perfect",   description: "Opaque throughout, flakes with gentle pressure, and the sauce has infused into the surface layers.", action: "Remove from heat and add basil and lime juice." },
          { state: "Overdone",  description: "Fish is flaking apart on its own and crumbling into the sauce. Texture is dry and granular.", action: "Remove from heat immediately. Serve gently, spooning around the fish rather than through it." },
        ],
      },
      feelCue: "Correctly poached fish in curry feels like it barely needs a fork — it yields at the touch and falls into large, moist flakes rather than small, dry crumbles.",
    },
    {
      nodeId: "step_4",
      action: "Finish",
      inputs: ["cooked_curry", "ing_07", "ing_09"],
      outputState: "finished_thai_fish_curry",
      instructions: "Remove from heat. Tear in Thai basil leaves and stir gently once. Squeeze lime juice over the top. Taste once more for the final balance of salt, sweet, sour, and heat — this is the moment to adjust. Serve immediately over jasmine rice. The basil must go in off the heat to preserve its anise-clove fragrance.",
      visualCue: {
        primaryTarget: "Deep orange-red curry with wilted-but-vibrant green basil leaves and glistening fish pieces just visible beneath the sauce surface.",
        spectrum: [
          { state: "Underdone", description: "No basil or lime juice added. Curry is flat and one-dimensional.", action: "Add both. The aromatic finish is what separates Thai curry from generic sauce." },
          { state: "Perfect",   description: "Basil has just wilted from the residual heat. Lime brightness cuts through the richness. Colors are vivid.", action: "Serve immediately over jasmine rice." },
          { state: "Overdone",  description: "Basil was added to the heat and has turned completely black and bitter. Lime was added too early and has faded.", action: "Add fresh basil torn over the top at the table instead." },
        ],
      },
      feelCue: "The fragrance of Thai basil torn into hot curry is immediate and powerful — anise-forward with a sweet clove note that rises through the coconut and chile steam.",
    },
  ],
};
