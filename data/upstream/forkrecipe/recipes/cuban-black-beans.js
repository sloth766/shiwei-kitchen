export default {
  repoId: "master_cuban_cuban_black_beans_001",
  parentRepoId: null,
  slug: "cuban-black-beans",
  author: "ForkRecipe Kitchen",

  title: "Cuban Black Beans (Frijoles Negros)",
  description: "A sofrito of onion, green pepper, and garlic cooked down to a rich, sweet base carries black beans through a long simmer until the liquid becomes thick and dark as ink — seasoned with cumin and a splash of vinegar added at the very end, the brightness cuts through the deep, earthy richness like a sharp note on a low chord.",
  cuisine: "Cuban",
  culture: "Cuban",
  category: "grains",

  tags: ["cuban", "beans", "vegan", "sofrito", "slow-cooked"],
  difficulty: 2,
  activeTime: "20 min",
  totalTime: "1 hr 30 min",
  ratioSystem: "parts",

  stars: 1398,
  forks: 156,
  contributors: 18,
  license: "CC-BY-SA",
  createdAt: "2024-07-07",
  updatedAt: "2025-06-15",

  flavorRadar: { sweet: 1, salty: 3, sour: 1, bitter: 0, umami: 3, heat: 1 },

  ingredients: [
    { ingId: "ing_01", role: "Structure", name: "Dried black beans (soaked overnight, or canned)",  ratioValue: 100, defaultUnit: "parts", substitutions: ["canned black beans (reduce simmer time to 30 min)"] },
    { ingId: "ing_02", role: "Allium",    name: "Yellow onion (finely diced)",                     ratioValue: 25,  defaultUnit: "parts", substitutions: ["white onion"] },
    { ingId: "ing_03", role: "Aromatic",  name: "Green bell pepper (finely diced)",                ratioValue: 15,  defaultUnit: "parts", substitutions: ["cubanelle pepper"] },
    { ingId: "ing_04", role: "Allium",    name: "Garlic cloves (minced)",                          ratioValue: 5,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Spice",     name: "Ground cumin",                                    ratioValue: 1.5, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Fat",       name: "Olive oil",                                       ratioValue: 8,   defaultUnit: "parts", substitutions: ["lard for a richer, non-vegan version"] },
    { ingId: "ing_07", role: "Acid",      name: "Apple cider vinegar or dry white wine",           ratioValue: 5,   defaultUnit: "parts", substitutions: ["red wine vinegar"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Simmer",
      inputs: ["ing_01"],
      outputState: "cooked_beans",
      instructions: "If using dried beans (soaked overnight), drain and rinse. Place in a large pot and cover with 8cm of cold water. Bring to a boil over high heat, then reduce to a steady simmer. Cook for 60-90 minutes until beans are completely tender throughout — they should crush easily between two fingers. Season with salt only when completely soft; salt added before tenderness toughens the skin and extends cooking time significantly. Reserve 2 cups of the bean cooking liquid before draining.",
      visualCue: {
        primaryTarget: "Beans are uniformly tender and have swollen to approximately twice their dry size. The cooking liquid has turned deep purple-black and is slightly thick.",
        spectrum: [
          { state: "Underdone", description: "Beans are still chalky and firm at the center when bitten. The skin is intact but the interior is not soft.", action: "Continue simmering and test every 15 minutes. Do not salt yet." },
          { state: "Perfect",   description: "Beans crush completely between two fingers without resistance. Cooking liquid is deep, inky black.", action: "Season with salt now. Reserve 2 cups of cooking liquid and drain." },
          { state: "Overdone",  description: "Beans have split and are beginning to dissolve into the cooking liquid. Liquid is very thick.", action: "Proceed — partly dissolved beans will make the final dish creamier. Use all the liquid and reduce less at the end." },
        ],
      },
      feelCue: "Take a bean between your thumbnail and forefinger and apply gentle pressure — a perfectly cooked bean should collapse completely with minimal force, leaving no chalky center.",
    },
    {
      nodeId: "step_2",
      action: "Sauté",
      inputs: ["ing_02", "ing_03", "ing_04", "ing_05", "ing_06"],
      outputState: "sofrito",
      instructions: "Heat olive oil in a wide, heavy-bottomed pot over medium heat. Add diced onion and green pepper. Cook, stirring occasionally, for 8-10 minutes until completely soft and beginning to turn golden — the onion should be translucent throughout, not just at the edges. Add garlic and cumin. Cook for another 90 seconds, stirring constantly, until the garlic is fragrant and the cumin blooms in the fat, smelling toasty and warm. The sofrito should look like a thick, golden-green jam.",
      visualCue: {
        primaryTarget: "A soft, jammy paste of onion and pepper — translucent, golden, and significantly reduced in volume from the raw state. No white or crunchy pieces remain.",
        spectrum: [
          { state: "Underdone", description: "Onion and pepper are still crunchy and opaque white. The mixture looks watery, not jammy.", action: "Continue cooking over medium heat. Undercooked sofrito gives the finished dish a raw, harsh flavor." },
          { state: "Perfect",   description: "Completely translucent, golden onion and pepper that have melted into a cohesive, fragrant base. The fat has separated slightly around the edges.", action: "Add garlic and cumin, then immediately add the beans." },
          { state: "Overdone",  description: "Sofrito is darkening at the edges and beginning to stick to the pot. Garlic may be browning.", action: "Reduce heat and add a splash of water to deglaze. Brown sofrito will make the beans taste slightly bitter." },
        ],
      },
      feelCue: "A properly cooked sofrito should smell sweet and savory simultaneously — caramelized onion sweetness, the slight bitterness of cooked pepper, and a warm cumin bloom that rises in a single aromatic wave.",
    },
    {
      nodeId: "step_3",
      action: "Braise",
      inputs: ["sofrito", "cooked_beans", "ing_07"],
      outputState: "frijoles_negros",
      instructions: "Add the cooked beans to the sofrito pot along with the reserved cooking liquid. Stir to combine and bring to a simmer. Cook uncovered for 20-30 minutes, stirring occasionally, until the liquid has reduced and thickened considerably — it should coat the back of a spoon and look glossy. In the final 2 minutes of cooking, add the vinegar or white wine. Do not cook after adding the vinegar; you want the brightness to be present in the finished dish, not cooked away. Taste and adjust salt.",
      visualCue: {
        primaryTarget: "An intensely dark, glossy, thick sauce enveloping plump beans. The surface of the liquid barely moves when the pot is nudged. A spoon dragged through it leaves a trail that fills slowly.",
        spectrum: [
          { state: "Underdone", description: "The liquid is watery and dark but not thick. It runs quickly off the spoon. The beans taste separate from the sauce.", action: "Continue reducing over medium heat, uncovered. Stir more frequently as it thickens to prevent sticking." },
          { state: "Perfect",   description: "Thick, glossy, deeply flavored broth that clings to each bean. The surface is slightly viscous. The taste is complex: earthy, savory, with a clean acidic lift.", action: "Remove from heat. Add vinegar if not already done, stir, and serve." },
          { state: "Overdone",  description: "Beans are sitting in a thick paste. The bottom is beginning to stick and scorch.", action: "Add water or stock to loosen, stir from the bottom to incorporate any stuck bits, and remove from heat." },
        ],
      },
      feelCue: "Stir the pot and listen — properly thickened frijoles negros make a heavy, slow gurgling sound as bubbles push through the viscous liquid, not a thin, rapid boiling.",
    },
  ],
};
