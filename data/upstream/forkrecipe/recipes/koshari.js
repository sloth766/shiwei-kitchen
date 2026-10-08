export default {
  repoId: "master_egyptian_koshari_001",
  parentRepoId: null,
  slug: "koshari",
  author: "ForkRecipe Kitchen",

  title: "Koshari",
  description: "Egypt's great street food assembled in layers — lentils, rice, and small pasta in one base, drowned in a fiery spiced tomato sauce, buried under crispy fried onions, and sharpened with a garlic-vinegar dressing — chaotic, cacophonous, and completely irresistible.",
  cuisine: "Egyptian",
  culture: "Egyptian",
  category: "grains",

  tags: ["vegan", "egyptian", "street-food", "lentils", "rice", "pasta"],
  difficulty: 2,
  activeTime: "50 min",
  totalTime: "1 hour 30 min",
  ratioSystem: "weight",

  stars: 0, forks: 0, contributors: 1, license: "CC-BY-SA",
  createdAt: "2026-06-27", updatedAt: "2026-06-27",

  flavorRadar: { sweet: 1, salty: 3, sour: 3, bitter: 1, umami: 3, heat: 3 },

  ingredients: [
    { ingId: "ing_01", role: "Starch",    name: "Long-grain white rice",                   ratioValue: 200, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_02", role: "Protein",   name: "Brown lentils, rinsed",                   ratioValue: 200, defaultUnit: "g", substitutions: ["green lentils"] },
    { ingId: "ing_03", role: "Structure", name: "Elbow macaroni or ditalini",               ratioValue: 150, defaultUnit: "g", substitutions: ["small shell pasta"] },
    { ingId: "ing_04", role: "Allium",    name: "Large yellow onions, thinly sliced",       ratioValue: 500, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_05", role: "Fat",       name: "Neutral oil (divided)",                    ratioValue: 100, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_06", role: "Liquid",    name: "Crushed canned tomatoes",                  ratioValue: 400, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_07", role: "Allium",    name: "Garlic cloves, minced",                    ratioValue: 20,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_08", role: "Spice",     name: "Ground cumin",                             ratioValue: 8,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_09", role: "Spice",     name: "Ground coriander",                         ratioValue: 4,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_10", role: "Heat",      name: "Cayenne pepper",                           ratioValue: 3,   defaultUnit: "g", substitutions: ["chili flakes"] },
    { ingId: "ing_11", role: "Acid",      name: "White wine vinegar",                       ratioValue: 30,  defaultUnit: "g", substitutions: ["apple cider vinegar"] },
    { ingId: "ing_12", role: "Seasoning", name: "Fine sea salt",                            ratioValue: 10,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_13", role: "Liquid",    name: "Water or vegetable stock",                 ratioValue: 600, defaultUnit: "g", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Boil",
      inputs: ["ing_02", "ing_13"],
      outputState: "cooked_lentils",
      instructions: "Place lentils in a pot, cover with water, bring to a boil and cook for 20 minutes until completely tender but not mushy — each lentil should hold its shape. Drain and season lightly with salt. Set aside.",
      visualCue: {
        primaryTarget: "Plump, fully cooked brown lentils that hold their shape. No chalky centers, no split or dissolved grains.",
        spectrum: [
          { state: "Underdone", description: "Chalky or crunchy center when bitten.", action: "Cook 5–8 more minutes." },
          { state: "Perfect",   description: "Completely tender, shape fully retained. Presses easily between fingers to a smooth paste.", action: "Drain and season lightly." },
          { state: "Overdone",  description: "Lentils have collapsed into a thick soup.", action: "Drain carefully; they can still be used but the koshari base will be less distinct." },
        ],
      },
      feelCue: "Press a lentil between your thumb and forefinger — it should collapse instantly into a smooth, paste-like smear with no granular resistance. That is a properly cooked lentil.",
    },
    {
      nodeId: "step_2",
      action: "Simmer",
      inputs: ["ing_01", "ing_13"],
      outputState: "cooked_rice",
      instructions: "Rinse rice until water runs clear. Combine with water in a 1:1.5 ratio in a saucepan. Add a pinch of salt and a teaspoon of oil. Bring to a boil, cover, reduce to minimum heat, and cook 15–18 minutes until liquid is fully absorbed. Rest covered 5 minutes.",
      visualCue: {
        primaryTarget: "Fluffy, separate grains of white rice. No visible pooling liquid. Steam vents when lid is lifted.",
        spectrum: [
          { state: "Underdone", description: "Chalky, firm rice grains. Liquid still visible.", action: "Replace lid and continue for 5 more minutes." },
          { state: "Perfect",   description: "Each grain separate and fluffy. Clean and white. Forks apart easily.", action: "Set aside uncovered briefly to release steam." },
          { state: "Overdone",  description: "Grains are clumped and sticky. Some have opened.", action: "Spread on a tray to cool and dry slightly before using." },
        ],
      },
      feelCue: "Run a fork through the rice — every grain should move independently, bouncing against the tines without clumping or dragging.",
    },
    {
      nodeId: "step_3",
      action: "Boil",
      inputs: ["ing_03"],
      outputState: "cooked_pasta",
      instructions: "Cook pasta in generously salted boiling water until al dente — just past the point of chalkiness. Drain and toss with a tiny drizzle of oil to prevent clumping. Set aside.",
      visualCue: {
        primaryTarget: "Small, evenly cooked pasta pieces with a slight firmness to the bite. Not mushy, not white-centered.",
        spectrum: [
          { state: "Underdone", description: "White chalky center when bitten.", action: "Cook 1–2 more minutes." },
          { state: "Perfect",   description: "Tender, slight bite, no white center. Pasta holds its shape.", action: "Drain and oil lightly." },
          { state: "Overdone",  description: "Pasta is soft and mushy.", action: "Use quickly; mushy pasta in koshari is not ideal but acceptable — the textures are already mixed." },
        ],
      },
      feelCue: "Bite a piece of pasta — you should feel a very faint resistance at the very center, then a clean, tender yield. That tiny resistance is al dente.",
    },
    {
      nodeId: "step_4",
      action: "Fry",
      inputs: ["ing_04", "ing_05"],
      outputState: "crispy_fried_onions",
      instructions: "Heat a generous amount of oil in a wide pan over medium-high heat. Add all the sliced onions and fry, stirring frequently, for 20–25 minutes until the onions are deeply browned, shrunken, and crispy — some edges should be almost charred. Remove with a slotted spoon to a paper towel-lined plate. Season with salt immediately. The onions will crisp further as they cool.",
      visualCue: {
        primaryTarget: "Dark mahogany, crispy-edged onion rings and strands. Shrunken to about one-fifth their original volume. Some almost-burnt tips are desirable.",
        spectrum: [
          { state: "Underdone", description: "Golden, soft, still limp. Not yet crispy.", action: "Continue frying — koshari onions must be crispy, not caramelized in the mujaddara style." },
          { state: "Perfect",   description: "Dark brown with very crispy edges. Crunch audible when handled. Deeply savory and slightly bitter.", action: "Remove and season immediately." },
          { state: "Overdone",  description: "Uniformly black and acrid.", action: "Discard and restart — burnt onions are too bitter to be used as a garnish." },
        ],
      },
      feelCue: "Lift a pinch of fried onions and listen — they should crackle audibly. Drop one on the counter: it should tap, not thud. If it thuds, it is still soft.",
    },
    {
      nodeId: "step_5",
      action: "Simmer",
      inputs: ["ing_06", "ing_07", "ing_08", "ing_09", "ing_10", "ing_11", "ing_12"],
      outputState: "spiced_tomato_sauce",
      instructions: "In the same pan used for onions, fry garlic in remaining oil for 30 seconds over medium heat until fragrant. Add cumin, coriander, and cayenne and stir for 30 seconds. Add crushed tomatoes, vinegar, and salt. Simmer uncovered for 15–20 minutes until the sauce has thickened and the oil has separated to the surface.",
      visualCue: {
        primaryTarget: "A deep, brick-red sauce. Thick enough to coat a spoon. Oil visible as a shimmering layer on top. Sharp vinegar aroma balanced by tomato sweetness.",
        spectrum: [
          { state: "Underdone", description: "Thin, watery sauce. Smells raw and acidic.", action: "Simmer uncovered 5–10 more minutes." },
          { state: "Perfect",   description: "Thick, rich, brick-red. Coats spoon. Spicy, savory, pleasantly sharp.", action: "Taste and adjust salt and vinegar before assembling." },
          { state: "Overdone",  description: "Very thick, paste-like, darkening. Sticking to pan.", action: "Add a splash of water and stir to loosen." },
        ],
      },
      feelCue: "Taste a spoonful of the sauce — it should punch you immediately with heat and acid, then give way to deep tomato and cumin warmth. It should taste slightly aggressive on its own, as it is meant to season the mild base underneath.",
    },
    {
      nodeId: "step_6",
      action: "Assemble",
      inputs: ["cooked_lentils", "cooked_rice", "cooked_pasta", "crispy_fried_onions", "spiced_tomato_sauce"],
      outputState: "finished_koshari",
      instructions: "In individual bowls or a large serving dish: layer rice and lentils together as the base. Add pasta on top. Ladle the tomato sauce generously over everything. Crown with a huge mound of crispy fried onions. Serve the extra tomato sauce and a small dish of white vinegar on the side for individual adjustments. Eat immediately — the crispy onions soften quickly once the sauce hits them.",
      visualCue: {
        primaryTarget: "A bowl of chaotic abundance: white and brown grains at the base, red sauce flooding over them, and a dramatic dark-brown onion crown. Vivid and colorful.",
        spectrum: [
          { state: "Underdone", description: "The bowl looks dry — insufficient sauce. The flavors won't unify without it.", action: "Add more tomato sauce liberally." },
          { state: "Perfect",   description: "Sauce soaking into the grains. Crispy onions providing textural contrast. The smell is complex: cumin, tomato, vinegar, and caramel onion all at once.", action: "Eat immediately." },
          { state: "Overdone",  description: "The bowl has been sitting too long — onions are limp and sauce-soaked. No crunch.", action: "Scatter fresh crispy onions from a reserved batch over the top." },
        ],
      },
      feelCue: "A correctly assembled spoonful should have at least three textures: the soft give of the rice and lentils, the resistance of al dente pasta, and the crunch-giving way of a fried onion. Every bite should be a different combination.",
    },
  ],
};
