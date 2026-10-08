export default {
  repoId: "master_vietnamese_vietnamese_caramel_pork_001",
  parentRepoId: null,
  slug: "vietnamese-caramel-pork",
  author: "ForkRecipe Kitchen",

  title: "Thit Kho To (Vietnamese Caramel Pork)",
  description: "Pork belly braised in a dark amber caramel, fish sauce, and fresh coconut water until the fat is translucent-soft and the meat drinks in the salty-sweet glaze — the quintessential dish of Southern Vietnamese home cooking.",
  cuisine: "Vietnamese",
  culture: "Southern Vietnamese",
  category: "proteins",

  tags: ["vietnamese", "pork", "braised", "caramel", "fish-sauce", "southern-vietnamese"],
  difficulty: 2,
  activeTime: "30 min",
  totalTime: "1 hour 30 min",
  ratioSystem: "weight",

  stars: 0, forks: 0, contributors: 1, license: "CC-BY-SA",
  createdAt: "2026-06-27", updatedAt: "2026-06-27",

  flavorRadar: { sweet: 4, salty: 4, sour: 0, bitter: 1, umami: 5, heat: 1 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Pork belly, skin-on, cut into 4 cm pieces", ratioValue: 800,  defaultUnit: "g", substitutions: ["pork shoulder"] },
    { ingId: "ing_02", role: "Liquid",    name: "Fresh coconut water",               ratioValue: 400,  defaultUnit: "g", substitutions: ["plain water (less sweet)"] },
    { ingId: "ing_03", role: "Umami",     name: "Fish sauce (nuoc mam)",             ratioValue: 60,   defaultUnit: "g", substitutions: ["soy sauce for vegetarian"] },
    { ingId: "ing_04", role: "Sweetener", name: "Granulated white sugar (for caramel)", ratioValue: 80, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_05", role: "Sweetener", name: "Palm sugar or brown sugar",         ratioValue: 20,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_06", role: "Allium",    name: "Shallots, sliced",                  ratioValue: 60,   defaultUnit: "g", substitutions: ["red onion"] },
    { ingId: "ing_07", role: "Allium",    name: "Garlic cloves, sliced",             ratioValue: 20,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_08", role: "Protein",   name: "Eggs, hard-boiled and peeled",      ratioValue: 4,    defaultUnit: "whole", substitutions: [] },
    { ingId: "ing_09", role: "Seasoning", name: "Black pepper, ground",              ratioValue: 4,    defaultUnit: "g", substitutions: [] },
    { ingId: "ing_10", role: "Garnish",   name: "Green onions, sliced",              ratioValue: 20,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_11", role: "Heat",      name: "Thai bird's eye chili, sliced (optional)", ratioValue: 5, defaultUnit: "g", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Caramelize",
      inputs: ["ing_04"],
      outputState: "dry_caramel",
      instructions: "Place a clay pot or heavy-bottomed pot over medium heat. Add the white sugar in a thin, even layer. Watch carefully without stirring — as the edges begin to melt and turn amber (about 4–5 minutes), tilt the pan to distribute. When the sugar is fully liquid and the color of dark mahogany, with thin wisps of smoke just beginning, remove from heat immediately.",
      visualCue: {
        primaryTarget: "Liquid caramel the color of dark mahogany — deeper than honey, approaching the color of black coffee held to light. A faint smoke is just starting to appear at the edges.",
        spectrum: [
          { state: "Underdone", description: "Caramel is light amber or golden. It will taste purely sweet and the braise will be cloying without bitterness.", action: "Return to heat and continue watching. The color change accelerates — don't walk away." },
          { state: "Perfect",   description: "Dark mahogany, nearly black at the center. Smells of bitter toffee and smoke. A drop on a cold plate sets to a dark, glassy bead.", action: "Add pork immediately — the residual heat continues cooking the sugar." },
          { state: "Overdone",  description: "Caramel is black and smoking acridly. Bitter, burnt smell.", action: "Discard and start again — burnt caramel makes the entire dish bitter and cannot be saved." },
        ],
      },
      feelCue: "The caramel at this stage smells of bittersweet toffee with a slight smoky edge — that slight bitterness is the foundation of the dish's complexity.",
    },
    {
      nodeId: "step_2",
      action: "Sear",
      inputs: ["ing_01", "dry_caramel"],
      outputState: "caramel_coated_pork",
      instructions: "Add the pork belly pieces to the hot caramel and stir quickly to coat. Stand back — the fat will cause violent sputtering. Sear the pork in the caramel for 3–4 minutes, turning with tongs, until each piece is coated in the dark caramel and beginning to brown.",
      visualCue: {
        primaryTarget: "Each pork piece is dark-coated, caramel clinging to the surface and beginning to caramelize onto the meat. No pooled caramel remains at the bottom.",
        spectrum: [
          { state: "Underdone", description: "Caramel is still pooled at the bottom and not adhering to the pork. Pieces look bare.", action: "Stir more actively and let the caramel reduce slightly before adding the liquid." },
          { state: "Perfect",   description: "Each piece has a dark, sticky caramel coating. Pan is nearly dry. Meat surface is sizzling and fragrant.", action: "Add shallots and garlic, then deglaze." },
          { state: "Overdone",  description: "Caramel has burnt to the bottom of the pot. Strong burnt smell.", action: "Remove pork. Clean pot with hot water, deglaze, and strain out any charred bits before continuing." },
        ],
      },
      feelCue: "The pork should hiss and crackle loudly when it hits the caramel — if it's silent, the caramel has cooled too much and won't coat properly.",
    },
    {
      nodeId: "step_3",
      action: "Braise",
      inputs: ["caramel_coated_pork", "ing_06", "ing_07", "ing_02", "ing_03", "ing_05", "ing_09"],
      outputState: "braising_pork",
      instructions: "Add shallots and garlic to the pot and stir for 1 minute. Pour in coconut water and fish sauce — the liquid will seize and splatter as it hits the caramel, then rapidly dissolve it. Add palm sugar and black pepper. Bring to a boil, skim any foam, then reduce to the lowest possible simmer. Cover and cook for 45 minutes.",
      visualCue: {
        primaryTarget: "A dark amber broth, barely simmering with small bubbles breaking at the edges. Pork pieces are half-submerged and gradually taking on color.",
        spectrum: [
          { state: "Underdone", description: "Broth is pale and thin. Caramel hasn't fully dissolved into the liquid.", action: "Raise heat briefly and stir to dissolve remaining caramel from the pot bottom." },
          { state: "Perfect",   description: "Broth is dark amber, clear, and fragrant. A few small bubbles break the surface lazily. Pork is pale on the submerged side and browning on top.", action: "Cover and maintain this gentle simmer." },
          { state: "Overdone",  description: "Broth is boiling hard, pork is bouncing around. Fat will emulsify and make broth cloudy.", action: "Reduce heat immediately. A rolling boil toughens the pork and makes the sauce greasy." },
        ],
      },
      feelCue: "After 30 minutes, press the pork with the back of a spoon — it should indent slightly but not feel mushy. The fat layer should look slightly translucent at the edges.",
    },
    {
      nodeId: "step_4",
      action: "Simmer",
      inputs: ["braising_pork", "ing_08"],
      outputState: "finished_caramel_pork",
      instructions: "After 45 minutes, add the peeled hard-boiled eggs. Gently turn them to coat in the broth. Cook uncovered for another 20–25 minutes, occasionally spooning broth over the pork, until the broth has reduced to a glossy, syrupy sauce and the fat on the pork is completely tender and translucent.",
      visualCue: {
        primaryTarget: "The pork fat layer is completely translucent — you can nearly see through it. Eggs are stained a deep mahogany on all sides. The sauce is thick and glossy, coating the back of a spoon.",
        spectrum: [
          { state: "Underdone", description: "Fat is still opaque white. Broth is still thin. Eggs are barely colored.", action: "Continue simmering uncovered — fat needs time to render and collagen to melt." },
          { state: "Perfect",   description: "Fat is a beautiful translucent amber. Meat has pulled slightly at the edges. Eggs are mahogany. Sauce is thick enough to coat a spoon but not sticky.", action: "Garnish and serve over rice." },
          { state: "Overdone",  description: "Pork fat has broken down entirely and is greasy. Sauce is very thick and sticky. Eggs are rubbery.", action: "Add a splash of water to loosen the sauce and remove from heat immediately." },
        ],
      },
      feelCue: "Press the pork fat with a spoon — at perfection, it yields completely with no resistance, like soft tofu. The meat beneath should have the texture of pulled pork, not a dry chew.",
    },
    {
      nodeId: "step_5",
      action: "Garnish",
      inputs: ["finished_caramel_pork", "ing_10", "ing_11"],
      outputState: "plated_caramel_pork",
      instructions: "Ladle pork, eggs, and sauce into bowls or onto a platter. Scatter green onions and optional chili over the top. Serve immediately with steamed jasmine rice and pickled daikon.",
      visualCue: {
        primaryTarget: "Dark lacquered pork and mahogany-stained eggs in an amber pool of sauce. Green onion rings and red chili brighten the monochrome richness.",
        spectrum: [
          { state: "Underdone", description: "Dish looks pale and the sauce isn't coating the pork evenly.", action: "Reduce sauce further before plating." },
          { state: "Perfect",   description: "Everything gleaming and dark. The sauce pools around the rice and the eggs cut in half reveal a fully stained white and fully set golden yolk.", action: "Serve." },
          { state: "Overdone",  description: "Sauce has congealed. Pork looks dry.", action: "Add a splash of warm water and reheat gently before serving." },
        ],
      },
      feelCue: "The sauce at perfect consistency should fall off the ladle in thick sheets, not drops — and it should leave a coating on the inside of the pot.",
    },
  ],
};
