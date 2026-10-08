export default {
  repoId: "master_cuban_moros_y_cristianos_001",
  parentRepoId: null,
  slug: "moros-y-cristianos",
  author: "ForkRecipe Kitchen",

  title: "Moros y Cristianos",
  description: "Cuba's foundational side dish — black beans and long-grain white rice cooked together in the same pot until the rice turns a deep, dramatic purple-grey, every grain infused with sofrito, cumin, and the starchy richness of the bean cooking liquid.",
  cuisine: "Cuban",
  culture: "Cuban",
  category: "grains",

  tags: ["vegan", "gluten-free", "cuban", "black-beans", "rice", "one-pot"],
  difficulty: 1,
  activeTime: "15 min",
  totalTime: "1 hr 30 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 0, salty: 2, sour: 1, bitter: 0, umami: 2, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Dried black beans (soaked overnight)",         ratioValue: 300, defaultUnit: "g",   substitutions: ["2 cans (800g total) cooked black beans — skip step 1, use water as liquid"] },
    { ingId: "ing_02", role: "Structure", name: "Long-grain white rice",                         ratioValue: 300, defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_03", role: "Allium",    name: "White onion (finely diced)",                    ratioValue: 150, defaultUnit: "g",   substitutions: ["yellow onion"] },
    { ingId: "ing_04", role: "Aromatic",  name: "Green bell pepper (finely diced)",              ratioValue: 100, defaultUnit: "g",   substitutions: ["poblano pepper"] },
    { ingId: "ing_05", role: "Allium",    name: "Garlic cloves (minced)",                        ratioValue: 4,   defaultUnit: "cloves", substitutions: [] },
    { ingId: "ing_06", role: "Fat",       name: "Olive oil",                                     ratioValue: 45,  defaultUnit: "ml",  substitutions: ["neutral oil"] },
    { ingId: "ing_07", role: "Spice",     name: "Ground cumin",                                  ratioValue: 5,   defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_08", role: "Herb",      name: "Dried oregano",                                 ratioValue: 3,   defaultUnit: "g",   substitutions: ["fresh oregano (6 g)"] },
    { ingId: "ing_09", role: "Aromatic",  name: "Bay leaves",                                    ratioValue: 2,   defaultUnit: "leaves", substitutions: [] },
    { ingId: "ing_10", role: "Seasoning", name: "Fine salt",                                     ratioValue: 8,   defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_11", role: "Seasoning", name: "Black pepper (freshly ground)",                 ratioValue: 2,   defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_12", role: "Acid",      name: "White wine vinegar (for finishing)",            ratioValue: 15,  defaultUnit: "ml",  substitutions: ["sherry vinegar", "lime juice"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Simmer",
      inputs: ["ing_01", "ing_09"],
      outputState: "cooked_beans_with_liquid",
      instructions: "Drain and rinse the soaked black beans and place in a large pot. Cover with cold water by 8 cm. Add the bay leaves. Bring to a boil over high heat, skimming any grey foam that rises to the surface in the first 10 minutes. Reduce to a gentle simmer and cook for 45-60 minutes until the beans are fully tender but still hold their shape. The cooking liquid will turn a deep, dramatic purple-black — this liquid is liquid gold; it is what turns the rice. Do not add salt until the beans are cooked — salting before tenderness toughens the skin.",
      visualCue: {
        primaryTarget: "Beans are plump, fully tender all the way through, and the cooking liquid is a deep, opaque purple-black. Skins are intact.",
        spectrum: [
          { state: "Underdone", description: "Beans have a firm, starchy center when bitten. The liquid is still quite watery and dark purple rather than near-black.", action: "Continue simmering. Test every 10 minutes. Under-cooked beans will not soften further once combined with the salt and rice." },
          { state: "Perfect",   description: "Each bean is completely tender with a creamy interior. Skins intact. Liquid is deep, almost black, and slightly viscous from released starch.", action: "Remove from heat. Do not drain — you will use 375 ml of this liquid to cook the rice." },
          { state: "Overdone",  description: "Beans are splitting and mushy. Liquid is very thick, almost sludgy.", action: "The dish will still taste excellent though the texture will be softer. Drain off some liquid if it is excessively thick, keeping at least 375 ml." },
        ],
      },
      feelCue: "A properly cooked bean pressed gently between thumb and forefinger should yield completely and smoothly, collapsing into a creamy paste with no hard kernel — like pressing a very soft ripe grape.",
    },
    {
      nodeId: "step_2",
      action: "Sauté",
      inputs: ["ing_06", "ing_03", "ing_04", "ing_05", "ing_07", "ing_08"],
      outputState: "sofrito",
      instructions: "In a wide, heavy-bottomed pot (large enough to hold the finished dish), heat the olive oil over medium heat until shimmering. Add the onion and green pepper and cook, stirring regularly, for 6-8 minutes until completely soft, translucent, and beginning to turn golden. Add the garlic and cook for 1 more minute. Add the ground cumin and oregano and stir for 30 seconds until fragrant — you will smell the spices bloom immediately. This sofrito is the flavor backbone of the dish.",
      visualCue: {
        primaryTarget: "Onion and pepper are completely soft, golden, and glistening in the oil. Garlic is pale and fragrant. Spices are incorporated and smell warm and toasted.",
        spectrum: [
          { state: "Underdone", description: "Onion is still white and firm with a raw, sharp smell.", action: "Continue cooking — an undercooked sofrito will leave a harsh, raw note in the finished dish." },
          { state: "Perfect",   description: "Onion and pepper are soft, golden, and fragrant. The kitchen smells of warm olive oil, sweet onion, and cumin.", action: "Add the beans and bean liquid immediately." },
          { state: "Overdone",  description: "Onion and pepper edges are dark brown and beginning to stick to the pot.", action: "Deglaze with a splash of water, scrape the bottom, and proceed. The slight caramelization will add sweetness." },
        ],
      },
      feelCue: "The sofrito should smell like the opening act of a Cuban kitchen — that specific harmony of olive oil, onion, pepper, and cumin that signals everything that follows will be good.",
    },
    {
      nodeId: "step_3",
      action: "Simmer",
      inputs: ["sofrito", "cooked_beans_with_liquid", "ing_10", "ing_11"],
      outputState: "seasoned_bean_base",
      instructions: "Add the cooked beans and exactly 375 ml of their cooking liquid to the sofrito pot, reserving any remaining liquid. Stir to combine. Add salt and pepper. Taste the liquid — it should be assertively seasoned, slightly saltier than you want the finished dish, because the rice will absorb and dilute it significantly. Bring to a rolling boil over high heat.",
      visualCue: {
        primaryTarget: "A deep purple-black liquid with whole beans suspended in the sofrito. Smells of cumin, pepper, and the deep, earthy sweetness of black beans.",
        spectrum: [
          { state: "Underdone", description: "The bean liquid and sofrito are not yet fully integrated — oil is floating separately.", action: "Stir more vigorously and bring to a full rolling boil before adding the rice." },
          { state: "Perfect",   description: "A unified, deeply colored base that smells richly seasoned and savory. Boiling aggressively with visible bubbles.", action: "Add the rinsed rice immediately." },
          { state: "Overdone",  description: "The base has reduced too much and the liquid is very thick and barely covers the beans.", action: "Add enough reserved bean liquid or water to bring the total volume to approximately 500 ml before adding the rice." },
        ],
      },
      feelCue: "Taste a spoonful of the liquid — it should be robustly flavored, almost aggressively so, with a deep savory sweetness from the bean starch and a warm cumin backbone.",
    },
    {
      nodeId: "step_4",
      action: "Boil",
      inputs: ["seasoned_bean_base", "ing_02"],
      outputState: "rice_in_beans",
      instructions: "Rinse the rice until the water runs nearly clear and drain well. Add the rice to the boiling bean base and stir once, firmly, to distribute the rice and submerge any floating grains. Reduce heat to the absolute lowest setting and cover tightly. Cook for 20 minutes without lifting the lid — the rice will absorb the bean liquid and turn the characteristic deep purple-grey that gives the dish its visual identity.",
      visualCue: {
        primaryTarget: "All rice grains fully submerged in the dark purple bean liquid, steam rising before the lid is sealed.",
        spectrum: [
          { state: "Underdone", description: "Some rice is above the liquid line. The liquid looks watery.", action: "Add 50 ml more bean liquid or water, submerge all grains, and seal the lid." },
          { state: "Perfect",   description: "Rice fully submerged, bean liquid just covering the surface. Boiling is vigorous before lid goes on.", action: "Seal tightly, reduce to lowest heat, cook 20 minutes." },
          { state: "Overdone",  description: "Ratio is very high on liquid — rice is floating freely.", action: "Drain a little liquid before covering, and reduce the final cooking time by 2-3 minutes." },
        ],
      },
      feelCue: "Once the lid is on, the pot should feel alive beneath your hand — the quiet, rhythmic warmth of steam building is the sound of the rice absorbing the bean liquid grain by grain.",
    },
    {
      nodeId: "step_5",
      action: "Finish",
      inputs: ["rice_in_beans", "ing_12"],
      outputState: "finished_moros_y_cristianos",
      instructions: "After 20 minutes, lift the lid briefly and check for steam holes on the surface — the telltale craters that signal the liquid has been fully absorbed and the rice is cooked. Remove from heat and rest, covered, for 10 minutes. Fluff gently with a fork, folding from the bottom up. Taste and adjust salt. Just before serving, drizzle the white wine vinegar over the dish and fold in gently — this sharp acid note brightens the deep, earthy flavor and is the traditional finishing touch that ties the dish together.",
      visualCue: {
        primaryTarget: "Rice grains are a beautiful, deep purple-grey, distinct and fluffy, dotted with whole black beans. The vinegar adds a faint gleam.",
        spectrum: [
          { state: "Underdone", description: "Grains in the center are still firm and pale. Steam holes not yet visible.", action: "Add 2 tablespoons of water around the edge, replace the lid, and cook 5 more minutes on low heat." },
          { state: "Perfect",   description: "Every grain is purple-grey, tender, and distinct. Beans are whole and creamy inside. The vinegar cuts the richness into something bright and alive.", action: "Serve immediately, ideally alongside roasted pork and fried plantains." },
          { state: "Overdone",  description: "Rice is slightly mushy and clumping at the bottom. Beans are splitting.", action: "Still delicious. Serve promptly without further resting, and call it bean rice porridge if needed." },
        ],
      },
      feelCue: "Each forkful should deliver tender rice grains that have taken on the color and flavor of the bean liquid — purple through and through, not just surface-stained — with the occasional yielding softness of a whole bean.",
    },
  ],
};
