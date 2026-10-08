export default {
  repoId: "master_turkish_turkish_red_lentil_soup_001",
  parentRepoId: null,
  slug: "turkish-red-lentil-soup",
  author: "ForkRecipe Kitchen",

  title: "Turkish Red Lentil Soup (Mercimek Çorbası)",
  description: "A soup of such simple ingredients that its depth of flavor seems almost impossible — red lentils collapse to velvet in under 40 minutes, transformed by a pul biber butter poured at the table into something smoky, earthy, and quietly magnificent.",
  cuisine: "Turkish",
  culture: "Turkish",
  category: "grains",

  tags: ["turkish", "lentil", "soup", "vegan", "cumin"],
  difficulty: 1,
  activeTime: "15 min",
  totalTime: "40 min",
  ratioSystem: "parts",

  stars: 1760,
  forks: 124,
  contributors: 16,
  license: "CC-BY-SA",
  createdAt: "2024-02-08",
  updatedAt: "2025-06-20",

  flavorRadar: { sweet: 1, salty: 3, sour: 1, bitter: 0, umami: 2, heat: 2 },

  ingredients: [
    { ingId: "ing_01", role: "Starch",    name: "Red lentils, rinsed",                        ratioValue: 100, defaultUnit: "parts", substitutions: ["yellow split peas (increase cook time by 15 min)"] },
    { ingId: "ing_02", role: "Allium",    name: "Yellow onion, diced",                         ratioValue: 40,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Aromatic",  name: "Carrot, diced",                               ratioValue: 20,  defaultUnit: "parts", substitutions: ["sweet potato"] },
    { ingId: "ing_04", role: "Spice",     name: "Ground cumin",                                ratioValue: 3,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Spice",     name: "Pul biber (Aleppo pepper)",                   ratioValue: 2,   defaultUnit: "parts", substitutions: ["mild chilli flakes + smoked paprika, equal parts"] },
    { ingId: "ing_06", role: "Liquid",    name: "Vegetable or chicken stock",                  ratioValue: 300, defaultUnit: "parts", substitutions: ["water (reduce salt slightly)"] },
    { ingId: "ing_07", role: "Fat",       name: "Olive oil",                                   ratioValue: 10,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_08", role: "Fat",       name: "Butter (for the finishing oil)",              ratioValue: 8,   defaultUnit: "parts", substitutions: ["olive oil for vegan version"] },
    { ingId: "ing_09", role: "Acid",      name: "Fresh lemon juice, for serving",              ratioValue: 5,   defaultUnit: "parts", substitutions: ["sumac dissolved in water"] },
    { ingId: "ing_10", role: "Seasoning", name: "Fine sea salt",                               ratioValue: 3,   defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Sweat aromatics",
      inputs: ["ing_02", "ing_03", "ing_07"],
      outputState: "sweated_aromatics",
      instructions: "Heat olive oil in a large heavy pot over medium heat. Add the onion and carrot and cook, stirring occasionally, for 8–10 minutes until the onion is completely soft and translucent and beginning to show faint golden color at the edges. Do not rush this — the sweetness of slow-cooked onion and carrot forms the flavor base of the soup, which cannot be added back later.",
      visualCue: {
        primaryTarget: "Onion is soft, translucent, and beginning to turn pale gold at the edges. Carrot has softened and lost its raw orange crunch. The pot bottom shows a thin layer of fond.",
        spectrum: [
          { state: "Underdone", description: "Onion is still white and slightly crunchy. Carrot is hard. The mixture looks almost unchanged from raw.", action: "Continue cooking. Raw onion in lentil soup results in a sharp, harsh flavor that does not mellow during the short cook time." },
          { state: "Perfect",   description: "Soft, sweet-smelling onion with a faint golden tinge. Carrot is yielding when pressed with a spoon. The pot smells sweet and savory.", action: "Add the spices and toast briefly." },
          { state: "Overdone",  description: "Onion is turning deep golden to brown and the pot bottom is getting a dark fond. Carrot may be starting to catch.", action: "Add a splash of water immediately to deglaze and reduce heat. Proceed to adding spices." },
        ],
      },
      feelCue: "The onion should press against a wooden spoon with no resistance — it should feel almost liquid when stirred, collapsing rather than bouncing back.",
    },
    {
      nodeId: "step_2",
      action: "Toast spices and add lentils",
      inputs: ["sweated_aromatics", "ing_01", "ing_04", "ing_05", "ing_06", "ing_10"],
      outputState: "soup_base",
      instructions: "Add the cumin and half the pul biber to the pot and stir constantly for 60 seconds until the spices are fragrant and toasting in the fat — this is called blooming and it activates fat-soluble flavor compounds that water alone cannot extract. Add the rinsed red lentils and stir to coat in the spiced oil. Pour in the stock, bring to a boil, then reduce to a steady simmer. Cook uncovered for 20–25 minutes, skimming any foam that rises in the first 5 minutes, until the lentils have completely dissolved into the liquid.",
      visualCue: {
        primaryTarget: "A thick, uniform orange-gold soup with no visible lentil grains remaining. The surface should barely ripple with a gentle simmer.",
        spectrum: [
          { state: "Underdone", description: "Lentils are still visible as distinct granules. The soup is thin and watery. Some lentils resist mashing when pressed against the side of the pot.", action: "Continue simmering. Red lentils can take up to 30 minutes to fully collapse, especially if the water is hard." },
          { state: "Perfect",   description: "Completely uniform orange-gold liquid. No whole lentils remain. The soup is thick and flows slowly when you stir it. It smells of cumin and sweet lentil.", action: "Blend until smooth, then season and serve." },
          { state: "Overdone",  description: "Soup has reduced significantly and is now very thick and starchy-smelling. Small patches are catching on the pot bottom.", action: "Add warm stock or water in increments, stirring to restore a pourable consistency. Season again after thinning." },
        ],
      },
      feelCue: "Drag a wooden spoon across the bottom of the pot — it should leave a clear path for 2 seconds before the soup flows back, indicating the right consistency.",
    },
    {
      nodeId: "step_3",
      action: "Blend until smooth",
      inputs: ["soup_base"],
      outputState: "blended_soup",
      instructions: "Remove the pot from heat. Using an immersion blender, blend the soup directly in the pot until completely smooth, about 2 minutes of continuous blending. Alternatively, transfer in batches to a stand blender (fill only halfway, cover with a kitchen towel, and hold the lid firmly — hot soup expands). The finished soup should be velvet-smooth with no fibrous texture from the lentil skins. If too thick, add warm stock to reach a pourable consistency similar to heavy cream.",
      visualCue: {
        primaryTarget: "A smooth, glossy, deep orange-gold soup with no texture when a small amount is rubbed between thumb and finger.",
        spectrum: [
          { state: "Underdone", description: "Soup still has grainy texture — some lentil skins are intact and visible. The surface has a matte, slightly rough appearance.", action: "Continue blending. An immersion blender needs 2–3 full minutes of sustained blending to get red lentil soup truly smooth." },
          { state: "Perfect",   description: "Glossy, completely smooth orange surface. When you scoop some on a spoon and run your finger across it, the surface is like liquid silk.", action: "Season, make the butter topping, and serve." },
          { state: "Overdone",  description: "Over-blending can make the soup gluey — this is unusual but possible with very starchy lentils. The soup looks slightly gummy.", action: "Add warm stock to thin slightly. The texture will normalize on reheating." },
        ],
      },
      feelCue: "Rub a small amount of the blended soup between your thumb and index finger — it should feel absolutely frictionless, like touching warm satin, with no gritty lentil particles.",
    },
    {
      nodeId: "step_4",
      action: "Make finishing butter and serve",
      inputs: ["blended_soup", "ing_08", "ing_05", "ing_09"],
      outputState: "finished_lentil_soup",
      instructions: "In a small saucepan, melt the butter over medium heat until it foams and begins to brown — stop when it smells nutty and is deep golden. Add the remaining pul biber off the heat: it will sizzle and bloom immediately, turning the butter a vivid red-orange. Ladle the soup into warmed bowls. Drizzle the sizzling butter over each bowl in a thin spiral from the edge to the center. Serve immediately with a generous squeeze of lemon and warm bread. The contrast between the hot red butter and the smooth soup is the dish.",
      visualCue: {
        primaryTarget: "A pool of smooth orange-gold soup with a vivid red-orange butter spiral on top, still sizzling when it arrives at the table.",
        spectrum: [
          { state: "Underdone", description: "Butter is pale yellow and not yet browned. The pul biber added to it looks wet and dull rather than sizzling-bright.", action: "Continue heating the butter until it turns golden-brown. The browning is essential — pale butter gives none of the nutty depth." },
          { state: "Perfect",   description: "Deep golden-brown butter with vivid orange-red pul biber sizzling in it. Added to the soup, it sits on the surface in a glistening pool. The soup smells of smoke and hazelnuts.", action: "Serve immediately — the butter loses its heat within 2 minutes." },
          { state: "Overdone",  description: "Butter has gone past brown to black. It smells burnt rather than nutty, and the pul biber added to it is acrid.", action: "Discard and make fresh. The finishing butter takes only 3 minutes — it is worth starting over." },
        ],
      },
      feelCue: "When you add the pul biber to the hot butter off the heat, the sizzle should be immediate and enthusiastic — a sharp hiss that fills the kitchen with the scent of smoked pepper and hazelnut.",
    },
  ],
};
