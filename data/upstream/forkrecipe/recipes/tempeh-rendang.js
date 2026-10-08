export default {
  repoId: "master_indonesian_tempeh_rendang_001",
  parentRepoId: null,
  slug: "tempeh-rendang",
  author: "ForkRecipe Kitchen",

  title: "Tempeh Rendang",
  description: "Indonesian vegan rendang where slabs of fermented soybean tempeh are slowly simmered in an aromatic coconut milk paste with galangal, lemongrass, and kaffir lime until the coconut cooks dry and the tempeh is encrusted in a dark, burnished spice coating.",
  cuisine: "Indonesian",
  culture: "West Sumatran",
  category: "proteins",

  tags: ["indonesian", "vegan", "tempeh", "rendang", "coconut-milk", "sumatran", "fermented"],
  difficulty: 3,
  activeTime: "45 min",
  totalTime: "2 hours 30 min",
  ratioSystem: "weight",

  stars: 0, forks: 0, contributors: 1, license: "CC-BY-SA",
  createdAt: "2026-06-27", updatedAt: "2026-06-27",

  flavorRadar: { sweet: 1, salty: 3, sour: 2, bitter: 2, umami: 4, heat: 3 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Tempeh, cut into 3 cm cubes",     ratioValue: 600,  defaultUnit: "g", substitutions: ["firm tofu (press well)", "jackfruit"] },
    { ingId: "ing_02", role: "Liquid",    name: "Full-fat coconut milk",            ratioValue: 800,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_03", role: "Aromatic",  name: "Lemongrass stalks, bruised",       ratioValue: 40,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_04", role: "Aromatic",  name: "Galangal (fresh or frozen), sliced",ratioValue: 30,  defaultUnit: "g", substitutions: ["ginger (different flavor)"] },
    { ingId: "ing_05", role: "Aromatic",  name: "Kaffir lime leaves",               ratioValue: 8,    defaultUnit: "whole", substitutions: ["bay leaves + lime zest"] },
    { ingId: "ing_06", role: "Aromatic",  name: "Turmeric leaf (optional)",         ratioValue: 1,    defaultUnit: "whole", substitutions: [] },
    { ingId: "ing_07", role: "Spice",     name: "Dried red chilies, soaked and drained", ratioValue: 25, defaultUnit: "g", substitutions: ["1 tsp chili flakes"] },
    { ingId: "ing_08", role: "Allium",    name: "Shallots, peeled",                 ratioValue: 100,  defaultUnit: "g", substitutions: ["red onion"] },
    { ingId: "ing_09", role: "Allium",    name: "Garlic cloves",                    ratioValue: 30,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_10", role: "Aromatic",  name: "Fresh ginger",                     ratioValue: 20,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_11", role: "Spice",     name: "Ground coriander",                 ratioValue: 8,    defaultUnit: "g", substitutions: [] },
    { ingId: "ing_12", role: "Spice",     name: "Ground cumin",                     ratioValue: 4,    defaultUnit: "g", substitutions: [] },
    { ingId: "ing_13", role: "Seasoning", name: "Fine sea salt",                    ratioValue: 10,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_14", role: "Sweetener", name: "Palm sugar (gula jawa)",           ratioValue: 20,   defaultUnit: "g", substitutions: ["brown sugar"] },
    { ingId: "ing_15", role: "Fat",       name: "Coconut oil or neutral oil",       ratioValue: 30,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_16", role: "Garnish",   name: "Fried shallots",                   ratioValue: 20,   defaultUnit: "g", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Blend",
      inputs: ["ing_07", "ing_08", "ing_09", "ing_10", "ing_11", "ing_12"],
      outputState: "rendang_paste",
      instructions: "Blend the soaked dried chilies, shallots, garlic, ginger, coriander, and cumin into a smooth paste in a food processor or blender. Add a tablespoon of water if needed to get it moving. The paste should be fine-textured, deep brick-red, and smell intensely of raw shallot and warm spice.",
      visualCue: {
        primaryTarget: "A smooth, deep brick-red paste with no large visible chunks. The color comes from the chilies, not from cooking — it should look vivid and raw.",
        spectrum: [
          { state: "Underdone", description: "Rough texture with visible shallot and chili fragments. Inconsistent color.", action: "Blend longer, scraping down the sides. The paste must be smooth to cook evenly." },
          { state: "Perfect",   description: "Fine-textured, deep red paste. Presses through fingers without chunks. Smells sharp and raw.", action: "Fry in oil before adding coconut milk." },
          { state: "Overdone",  description: "Paste has liquefied to a thin puree. Will spatter excessively when fried.", action: "It will still work. Cook on slightly lower heat and stir more frequently." },
        ],
      },
      feelCue: "The paste should feel like thick smooth hummus and smell sharp enough to make your eyes water — the raw allium bite will mellow during frying.",
    },
    {
      nodeId: "step_2",
      action: "Fry",
      inputs: ["rendang_paste", "ing_15"],
      outputState: "fried_paste",
      instructions: "Heat coconut oil in a large wok or heavy pot over medium heat. Add the paste and fry, stirring constantly, for 8–12 minutes. The paste will first thin out as moisture evaporates, then darken and deepen in color, and finally begin to separate from the oil — a thin ring of clear oil appears around the paste. This is keluarkan minyak — the oil breaking out. This step develops the foundational flavor.",
      visualCue: {
        primaryTarget: "The paste has darkened from brick-red to a deep reddish-brown. A thin ring of clear reddish oil visibly separates around the edges of the paste mass in the wok.",
        spectrum: [
          { state: "Underdone", description: "Paste is still bright red and wet. No oil separation visible. Raw shallot taste will persist into the finished dish.", action: "Keep frying — the paste needs to lose all its raw moisture. This takes patience." },
          { state: "Perfect",   description: "Deep reddish-brown, fragrant with cooked spice and toasted shallot. A clear ring of aromatic oil surrounds it. The paste presses into a rough dry mass when stirred.", action: "Add aromatics and coconut milk." },
          { state: "Overdone",  description: "Paste is very dark brown, approaching black at the edges. Smells slightly burnt.", action: "Add coconut milk immediately and reduce heat. The liquid will arrest further cooking." },
        ],
      },
      feelCue: "At the point the oil separates, the paste will sound different — a dry sizzle rather than a wet hiss. Trust your ears as much as your eyes.",
    },
    {
      nodeId: "step_3",
      action: "Simmer",
      inputs: ["fried_paste", "ing_01", "ing_02", "ing_03", "ing_04", "ing_05", "ing_06", "ing_13", "ing_14"],
      outputState: "simmering_rendang",
      instructions: "Add tempeh to the fried paste and stir to coat. Pour in coconut milk, add the lemongrass, galangal, kaffir lime leaves, turmeric leaf if using, salt, and palm sugar. Stir to combine. Bring to a boil, then reduce to a medium simmer. Cook uncovered, stirring every 10 minutes to prevent sticking.",
      visualCue: {
        primaryTarget: "A rich, fragrant coconut stew, gently bubbling with visible yellow-orange color from the turmeric and deep red from the chilies. Tempeh pieces are submerged.",
        spectrum: [
          { state: "Underdone", description: "Still pale and thin. Coconut milk has not yet integrated with the paste.", action: "Raise heat to bring to a proper simmer and continue cooking." },
          { state: "Perfect",   description: "Unified dark coconut sauce, fragrant with lemongrass and kaffir lime. Tempeh is beginning to absorb color. Bubbling steadily.", action: "Continue simmering uncovered until coconut milk reduces significantly." },
          { state: "Overdone",  description: "Boiling hard. Coconut milk will break and become greasy rather than rich.", action: "Reduce heat to a gentle simmer immediately." },
        ],
      },
      feelCue: "The aroma at this stage should be heady and multilayered — coconut, lemongrass, galangal, and chili all distinct and not yet merged. They'll unify over the next hour.",
    },
    {
      nodeId: "step_4",
      action: "Reduce",
      inputs: ["simmering_rendang"],
      outputState: "finished_tempeh_rendang",
      instructions: "Continue simmering uncovered for 1–1.5 hours, stirring every 10 minutes with increasing frequency as the liquid reduces. The coconut milk will pass through several stages: creamy white, then pale yellow, then the coconut fat will separate and the paste will begin to fry in its own oil. This final stage — when the rendang is almost dry and the tempeh is frying in coconut oil — develops the characteristic dark, burnished crust. Keep stirring to prevent scorching. The rendang is done when the tempeh is dark and encrusted and the 'sauce' is more of a thick, dark coating.",
      visualCue: {
        primaryTarget: "The tempeh pieces are dark mahogany to nearly black on the outside, encrusted in a thick spice coating. The pot is nearly dry, only a slick of dark oil remains. The tempeh fries in this oil.",
        spectrum: [
          { state: "Underdone", description: "Tempeh still looks pale and the sauce is thin. This is gulai stage — still a curry, not rendang.", action: "Continue reducing. True rendang can take 2 hours or more — patience is the ingredient." },
          { state: "Perfect",   description: "Tempeh pieces are dark, encrusted, and fragrant. The coating is almost dry and clings tightly to each piece. A wonderful nutty, spicy, caramelized smell fills the kitchen.", action: "Remove from heat and let stand 5 minutes." },
          { state: "Overdone",  description: "Tempeh has scorched, bitter smell, black powder at the bottom of the pot.", action: "Remove tempeh immediately. Discard the darkest bits from the pot bottom. The top pieces may be salvageable." },
        ],
      },
      feelCue: "Lift a piece of tempeh — the coating should feel dry and slightly crumbly on the outside, never wet or saucy. Press it: the crust should yield and the tempeh inside should be firm but not hard.",
    },
    {
      nodeId: "step_5",
      action: "Garnish",
      inputs: ["finished_tempeh_rendang", "ing_16"],
      outputState: "plated_tempeh_rendang",
      instructions: "Transfer to a serving plate or shallow bowl. Scatter fried shallots over the top. Serve with steamed rice, sambal, and pickled cucumber. Rendang improves overnight — the flavors deepen and the spice coating firms.",
      visualCue: {
        primaryTarget: "Dark, almost black-mahogany tempeh pieces on a white plate, each individually encrusted and separate. Crispy fried shallots add textural contrast.",
        spectrum: [
          { state: "Underdone", description: "Rendang looks wet and saucy rather than dry and crusted.", action: "This is gulai — delicious but not rendang. Continue reducing next time." },
          { state: "Perfect",   description: "Dark, dry-coated pieces with visible spice crust and fried shallot. The rich, concentrated aroma is almost overwhelming.", action: "Serve with rice." },
          { state: "Overdone",  description: "Tempeh is too dark and has a bitter edge.", action: "Serve with cooling accompaniments: cucumber, coconut rice, plain yogurt." },
        ],
      },
      feelCue: "A perfect piece of tempeh rendang should have a brittle, flaky outer crust that shatters slightly when bitten, giving way to the chewy, savory fermented interior.",
    },
  ],
};
