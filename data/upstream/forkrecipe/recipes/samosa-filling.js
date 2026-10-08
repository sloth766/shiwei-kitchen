export default {
  repoId: "master_indian_samosa_filling_001",
  parentRepoId: null,
  slug: "samosa-filling",
  author: "ForkRecipe Kitchen",

  title: "Samosa Filling",
  description: "Fluffy mashed potato and sweet green peas coarsely folded with a crackling bloom of cumin, coriander seed, ginger, and green chili — the filling that has made samosas irresistible for centuries, fragrant and slightly drier than you expect so it holds its shape inside the crisp pastry shell without steaming it soft. Every bite releases warm spiced starch and a bright herbal finish.",
  cuisine: "Indian",
  culture: "North Indian",
  category: "vegetables",

  tags: ["samosa", "potato", "peas", "vegetarian", "street food", "snack", "filling"],
  difficulty: 2,
  activeTime: "30 min",
  totalTime: "1 hr",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 2, salty: 3, sour: 2, bitter: 1, umami: 2, heat: 3 },

  ingredients: [
    { ingId: "ing_01", role: "Starch",    name: "Waxy potatoes (Yukon Gold or similar), boiled whole and peeled", ratioValue: 500, defaultUnit: "g",    substitutions: ["sweet potato for a sweeter variation"] },
    { ingId: "ing_02", role: "Starch",    name: "Green peas (fresh shelled or frozen, thawed)",                   ratioValue: 100, defaultUnit: "g",    substitutions: [] },
    { ingId: "ing_03", role: "Fat",       name: "Neutral oil or ghee",                                             ratioValue: 2,   defaultUnit: "tbsp", substitutions: [] },
    { ingId: "ing_04", role: "Aromatic",  name: "Cumin seeds",                                                     ratioValue: 1,   defaultUnit: "tsp",  substitutions: [] },
    { ingId: "ing_05", role: "Aromatic",  name: "Coriander seeds, lightly crushed in a mortar",                   ratioValue: 1,   defaultUnit: "tsp",  substitutions: ["1/2 tsp ground coriander"] },
    { ingId: "ing_06", role: "Aromatic",  name: "Fresh ginger, finely grated",                                    ratioValue: 1,   defaultUnit: "tsp",  substitutions: [] },
    { ingId: "ing_07", role: "Heat",      name: "Green chilies (serrano or Thai), finely minced",                 ratioValue: 2,   defaultUnit: "whole", substitutions: ["1/4 tsp cayenne"] },
    { ingId: "ing_08", role: "Spice",     name: "Ground coriander",                                               ratioValue: 1,   defaultUnit: "tsp",  substitutions: [] },
    { ingId: "ing_09", role: "Spice",     name: "Amchur (dried mango powder)",                                    ratioValue: 1,   defaultUnit: "tsp",  substitutions: ["1 tsp lemon juice (add at the end)"] },
    { ingId: "ing_10", role: "Spice",     name: "Garam masala",                                                   ratioValue: 0.5, defaultUnit: "tsp",  substitutions: [] },
    { ingId: "ing_11", role: "Spice",     name: "Ground turmeric",                                                ratioValue: 0.25, defaultUnit: "tsp", substitutions: [] },
    { ingId: "ing_12", role: "Seasoning", name: "Salt",                                                           ratioValue: 1,   defaultUnit: "tsp",  substitutions: [] },
    { ingId: "ing_13", role: "Herb",      name: "Fresh cilantro leaves and tender stems, finely chopped",         ratioValue: 3,   defaultUnit: "tbsp", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Boil",
      inputs: ["ing_01"],
      outputState: "boiled_potatoes",
      instructions: "Cover the whole, unpeeled potatoes with cold water in a pot. Bring to a boil over high heat, then reduce to a steady simmer and cook until a thin knife slides through the center with zero resistance — about 20–25 minutes depending on size. Do not rush with high heat or the skins will split and the potatoes will absorb too much water. Drain and immediately peel while hot — the skins slip off easily and the potato flesh sheds moisture better when peeled warm. Spread the peeled potatoes on a tray and leave them uncovered for 5 minutes to steam-dry. Then roughly crush them with a fork or your hands into a mix of small chunks and larger broken pieces. Do not mash smooth — the filling needs texture. Some pieces of potato 1–2 cm across are desirable.",
      visualCue: {
        primaryTarget: "Roughly broken, dry-looking potato pieces of varying sizes, mostly 0.5–2 cm. No smooth mashed sections. The surface looks fluffy and slightly chalky, not wet or glossy.",
        spectrum: [
          { state: "Underdone", description: "Potato centers are still firm and resist the fork. The flesh looks waxy and translucent rather than fluffy and opaque.", action: "Return to simmering water for another 5 minutes. Test again from the center." },
          { state: "Perfect",   description: "Fluffy, dry, breaks easily in the hand into irregular chunks. The color is pale yellow-white and opaque. No waxy look.", action: "Steam-dry on a tray and begin the spice temper immediately." },
          { state: "Overdone",  description: "Potato has become waterlogged and falls apart completely when crushed. Sticks to itself in a sticky mass.", action: "Spread on a wide tray and dry in a 150 C (300 F) oven for 10 minutes to drive off excess moisture before adding to the filling." },
        ],
      },
      feelCue: "A perfectly cooked potato should crumble and fall apart at a light press, with a dry, powdery break. If it squashes into a sticky paste, it needs to dry out further. If it bounces back, it needs more cooking.",
    },
    {
      nodeId: "step_2",
      action: "Sauté",
      inputs: ["ing_03", "ing_04", "ing_05", "ing_06", "ing_07", "ing_08", "ing_09", "ing_10", "ing_11"],
      outputState: "bloomed_spices",
      instructions: "Heat the oil or ghee in a wide pan over medium-high heat. Add the cumin seeds and crushed coriander seeds together — they should sizzle immediately and begin crackling. Let them bloom for about 30–40 seconds until the cumin turns a deep chestnut brown. Do not stop here — add the minced ginger and green chili and stir for 1 minute until the raw ginger smell softens to a sweet, fragrant note. Add the ground coriander, amchur, garam masala, and turmeric. Stir constantly for 60 seconds, scraping the bottom — the ground spices will form a thick, fragrant paste in the fat. This step, called the tadka or bhuna, is critical: the oil carries fat-soluble spice compounds directly into the potato and peas at the moment of contact. If your spice paste smells warm and rounded, with no raw edge, it is ready.",
      visualCue: {
        primaryTarget: "A dark, golden-red spice paste in the pan with visible whole cumin and coriander seeds, slightly darkened ginger threads, and a ring of clear oil around the edges.",
        spectrum: [
          { state: "Underdone", description: "Ground spices are still dry-looking and separate from the oil, sitting on top rather than blooming into a paste. The smell is powdery and raw.", action: "Add a teaspoon of water and stir vigorously — the steam will help the spices absorb and cook. Continue for another minute." },
          { state: "Perfect",   description: "A unified, glossy, dark paste that moves as a single mass. Smells of toasted cumin and warm, bright coriander. The fat glistens around the edges.", action: "Add the peas and potatoes immediately." },
          { state: "Overdone",  description: "Spices are dark brown or black, the pan is smoking, and the smell is bitter and acrid. The ground spice paste has scorched.", action: "Discard and start fresh. Burnt spices will make the entire filling bitter — there is no recovery." },
        ],
      },
      feelCue: "The kitchen should smell like a spice market at this point — toasty, warm, and complex, with the sharp green note of the chili cutting through. The pan hisses when you drag a spoon across the bottom.",
    },
    {
      nodeId: "step_3",
      action: "Toss",
      inputs: ["bloomed_spices", "boiled_potatoes", "ing_02", "ing_12", "ing_13"],
      outputState: "finished_samosa_filling",
      instructions: "Add the frozen or fresh peas directly to the spiced fat in the pan. Stir and cook for 2 minutes — the peas will warm through and absorb the spiced oil. Add the crushed potatoes all at once and fold everything together using a wide spatula or wooden spoon, working from the bottom of the pan and turning the mixture over itself. You want to evenly coat every piece of potato and pea in the spice blend without turning the mixture into a smooth mash — the filling should retain texture, with visible pieces of potato and peas throughout. Season with salt and stir. Off the heat, fold in the fresh cilantro. Taste: the filling should be intensely flavored — boldly salty, bright with amchur's sour note, and warmly spiced throughout. It needs to be seasoned aggressively because the pastry shell will dilute the intensity. Allow the filling to cool completely before enclosing in pastry — warm filling will steam the pastry and make it soggy.",
      visualCue: {
        primaryTarget: "A fragrant, textured mixture of golden-spiced potato chunks and vivid green peas, uniformly coated in a rust-orange spice blend. Cilantro flecks visible throughout. No smooth, paste-like mashed sections.",
        spectrum: [
          { state: "Underdone", description: "Spice coating is not uniform — pale potato pieces are visible next to very dark ones. The peas are still separate and pale. The filling tastes bland in spots.", action: "Fold more thoroughly, making sure each piece contacts the spiced fat. Cook for 2 more minutes on medium heat." },
          { state: "Perfect",   description: "Every piece is uniformly spiced and tinted orange-gold. Texture is varied and interesting. The smell is bright, complex, and deeply appetizing. Fills the mouth with warmth.", action: "Spread on a tray and cool completely before using as samosa filling." },
          { state: "Overdone",  description: "The mixture has been stirred too aggressively and is now a smooth, pasty mash. Texture is uniform and the peas are broken.", action: "The flavor is identical — proceed. The mashed consistency will still work as a filling, though the eating experience is less varied." },
        ],
      },
      feelCue: "A finished spoonful of samosa filling should feel slightly dry and crumbly in the hand — not wet, not sticky. It should hold a shape when pressed but crumble at a firm push. That dry texture is what prevents the samosa pastry from becoming soggy during frying.",
    },
  ],
};
