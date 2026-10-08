export default {
  repoId: "master_korean_bulgogi-marinade_001",
  parentRepoId: null,
  slug: "bulgogi-marinade",
  author: "ForkRecipe Kitchen",

  title: "Bulgogi Marinade",
  description: "A lacquer-dark marinade that tenderises thinly sliced beef with the enzymes in Asian pear while soy, sesame, and brown sugar build a glaze that caramelises to sticky, smoky edges on a hot grill — the soul of every Korean barbecue table.",
  cuisine: "Korean",
  culture: "Korean",
  category: "condiments",

  tags: ["beef", "marinade", "korean", "soy", "sesame"],
  difficulty: 1,
  activeTime: "10 min",
  totalTime: "10 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",

  // 0–5 scale. Soy and sesame give umami; sugar pushes sweet; moderate salty.
  flavorRadar: { sweet: 4, salty: 3, sour: 1, bitter: 0, umami: 4, heat: 1 },

  ingredients: [
    { ingId: "ing_01", role: "Umami",     name: "Soy sauce (ganjang)",                          ratioValue: 4,   defaultUnit: "parts", substitutions: ["tamari for gluten-free"] },
    { ingId: "ing_02", role: "Sweetener", name: "Brown sugar or dark muscovado",                 ratioValue: 2,   defaultUnit: "parts", substitutions: ["honey", "maple syrup"] },
    { ingId: "ing_03", role: "Structure", name: "Asian pear (or kiwi), grated on a fine grater", ratioValue: 2,   defaultUnit: "parts", substitutions: ["Bosc pear", "pineapple juice (1/2 part)"] },
    { ingId: "ing_04", role: "Allium",    name: "Garlic, grated or pressed (4 cloves)",          ratioValue: 1,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Allium",    name: "Scallion, finely sliced (3 stalks)",            ratioValue: 1,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Fat",       name: "Toasted sesame oil",                            ratioValue: 1,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Spice",     name: "Black pepper, freshly ground",                  ratioValue: 0.2, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_08", role: "Seasoning", name: "Gochugaru (optional, for heat)",                ratioValue: 0.5, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_09", role: "Garnish",   name: "Toasted sesame seeds",                          ratioValue: 0.25, defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Mix",
      inputs: ["ing_01", "ing_02"],
      outputState: "soy_sugar_base",
      instructions: "Combine soy sauce and brown sugar in a bowl large enough to eventually hold all your beef. Stir vigorously with a fork or whisk for 60–90 seconds until the sugar is fully dissolved — granular sugar will not dissolve evenly when the cold beef goes in and can leave sweet spots. The mixture should be uniformly dark and syrupy.",
      visualCue: {
        primaryTarget: "A glossy, dark-brown liquid with no visible sugar granules. When you lift the spoon, it flows in a thin, slightly viscous sheet.",
        spectrum: [
          { state: "Underdone", description: "Sugar granules are still visible, settled at the bottom when you stop stirring.", action: "Keep stirring — or microwave 10 seconds and stir again to help dissolution." },
          { state: "Perfect",   description: "Fully clear, uniformly dark liquid. Smells of caramel and soy.", action: "Add grated pear, garlic, and aromatics." },
          { state: "Overdone",  description: "You have heated the mixture on the stove and the sugar is starting to caramelise to a thick syrup.", action: "Remove from heat and thin with a tablespoon of water. Cool before adding pear or the enzymes will be destroyed." },
        ],
      },
      feelCue: "Rub a drop between thumb and forefinger — you should feel no gritty sugar crystals. The mixture should be slick and just slightly tacky.",
    },
    {
      nodeId: "step_2",
      action: "Mix",
      inputs: ["soy_sugar_base", "ing_03", "ing_04", "ing_05", "ing_07", "ing_08"],
      outputState: "complete_marinade",
      instructions: "Grate the Asian pear on the finest side of a box grater directly into the soy-sugar base — include all the juice that runs off. Add pressed garlic, sliced scallion, black pepper, and gochugaru if using. Stir everything together. The pear contributes crunchy protease enzymes that break down muscle fibres in beef over 30 minutes to 4 hours; beyond 6 hours the meat will become pasty, so plan accordingly.",
      visualCue: {
        primaryTarget: "A dark, chunky-smooth marinade with visible scallion threads and pear pulp suspended throughout. The colour is a deep mahogany-brown with flecks of green.",
        spectrum: [
          { state: "Underdone", description: "Ingredients are added but not stirred — pear sits on top, garlic clumped together.", action: "Stir thoroughly until all elements are evenly distributed." },
          { state: "Perfect",   description: "Uniform, cohesive marinade. Pear pulp evenly distributed. Smells of sesame, soy, and fresh pear.", action: "Add sesame oil last, then taste." },
          { state: "Overdone",  description: "You blended the marinade to a smooth puree — this is fine but you lose the textural garnish of scallion threads.", action: "Proceed — a smooth marinade works perfectly well." },
        ],
      },
      feelCue: "Rubbing a small amount of the raw marinade between your fingers should feel lightly oily from the sesame yet slightly sticky from the sugar — that tackiness is what creates the caramel crust on the grill.",
    },
    {
      nodeId: "step_3",
      action: "Finish",
      inputs: ["complete_marinade", "ing_06", "ing_09"],
      outputState: "finished_bulgogi_marinade",
      instructions: "Drizzle sesame oil over the marinade and stir gently to combine — do not emulsify it completely; you want visible oil drops that will hit the hot grill surface and instantly perfume the meat. Scatter toasted sesame seeds if using. Taste the marinade on a fingertip: it should be intensely savoury and sweet with a clean soy backbone. Add more sugar if flat, more soy if too sweet. To use: add thinly sliced ribeye or sirloin (2–3 mm), toss to coat every surface, and refrigerate for at least 30 minutes and up to 4 hours.",
      visualCue: {
        primaryTarget: "Glossy marinade with sesame oil sheen on the surface and toasted seeds dotted throughout. Deep brown colour with a warm, appetising aroma.",
        spectrum: [
          { state: "Underdone", description: "Sesame oil not added. Marinade smells flat, missing the nutty aromatic top note.", action: "Add sesame oil — it is not optional for the grill aroma profile." },
          { state: "Perfect",   description: "Fragrant, balanced, deeply savoury-sweet marinade that makes you want to start grilling immediately. Every component is visible.", action: "Add beef and marinate, or store covered in the fridge for up to 3 days." },
          { state: "Overdone",  description: "Marinade has been sitting with raw beef for over 8 hours — the pear enzymes have over-tenderised the meat to a mushy texture.", action: "Cook the beef immediately — it is still edible but will not hold its shape on the grill. Best cooked in a pan rather than grilled." },
        ],
      },
      feelCue: "When you toss the beef in this marinade it should coat every surface in a dark, glossy film — if the marinade pools at the bottom and the meat looks pale, you need to massage it in more aggressively.",
    },
  ],
};
