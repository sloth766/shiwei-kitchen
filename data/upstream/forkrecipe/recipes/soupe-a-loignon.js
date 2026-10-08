export default {
  repoId: "master_french_soupe_a_loignon_001",
  parentRepoId: null,
  slug: "soupe-a-loignon",
  author: "ForkRecipe Kitchen",

  title: "Soupe à l'Oignon Gratinée",
  description: "Onions slow-cooked until impossibly sweet and jammy, then simmered in beef stock and poured over toasted bread, buried under molten, bubbling Gruyère — the Parisian cure for anything.",
  cuisine: "French",
  culture: "Parisian bistro",
  category: "stocks",

  tags: ["french onion soup", "french", "bistro", "gruyère", "bread"],
  difficulty: 3,
  activeTime: "30 min",
  totalTime: "1 hr 30 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",

  flavorRadar: { sweet: 3, salty: 4, sour: 0, bitter: 1, umami: 5, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Allium",    name: "Yellow onions (thinly sliced)", ratioValue: 100, defaultUnit: "parts", substitutions: ["white onions", "mixed onion varieties"] },
    { ingId: "ing_02", role: "Fat",       name: "Unsalted butter",               ratioValue: 10,  defaultUnit: "parts", substitutions: ["clarified butter", "olive oil"] },
    { ingId: "ing_03", role: "Liquid",    name: "Dry white wine",                ratioValue: 20,  defaultUnit: "parts", substitutions: ["dry vermouth", "white wine vinegar diluted"] },
    { ingId: "ing_04", role: "Base",      name: "Beef stock (good quality)",     ratioValue: 150, defaultUnit: "parts", substitutions: ["veal stock", "dark chicken stock"] },
    { ingId: "ing_05", role: "Starch",    name: "Baguette slices (1 cm thick, toasted)", ratioValue: 15, defaultUnit: "parts", substitutions: ["sourdough croutons", "pain de campagne"] },
    { ingId: "ing_06", role: "Dairy",     name: "Gruyère (coarsely grated)",    ratioValue: 25,  defaultUnit: "parts", substitutions: ["Comté", "Emmental", "Beaufort"] },
    { ingId: "ing_07", role: "Herb",      name: "Fresh thyme sprigs",           ratioValue: 1,   defaultUnit: "parts", substitutions: ["dried thyme"] },
    { ingId: "ing_08", role: "Seasoning", name: "Fine salt and black pepper",   ratioValue: 2,   defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Caramelize",
      inputs: ["ing_01", "ing_02", "ing_08"],
      outputState: "caramelized_onions",
      instructions: "Melt the butter in a wide, heavy-bottomed pot over medium-low heat. Add all the onions with a generous pinch of salt and stir to coat. Cook uncovered, stirring every 5–8 minutes, for 45–60 minutes total. Do not rush this: the onions must pass through transparent, then blond, then golden, then a deep mahogany-brown. They should reduce to roughly one-fifth of their original volume and smell sweet and nutty, never scorched.",
      visualCue: {
        primaryTarget: "A deeply golden-brown, jammy mass that has collapsed to a fraction of its original volume, with a glossy, almost syrupy sheen.",
        spectrum: [
          { state: "Underdone", description: "Onions are pale blond or translucent — sweet but flat, without depth. The soup will be thin and one-dimensional.", action: "Continue cooking on medium-low heat, stirring more frequently to prevent sticking. Add a splash of water if the bottom is darkening too fast." },
          { state: "Perfect",   description: "Deep amber-mahogany, jammy, and fragrant. They cling to the spoon like marmalade and the pot bottom is covered in a dark fond.", action: "Deglaze immediately with white wine and scrape up every bit of fond." },
          { state: "Overdone",  description: "Black bits visible; sharp, acrid burnt smell. Onions taste bitter rather than sweet.", action: "Discard if truly burnt. If just very dark and slightly bitter, proceed and add a small pinch of sugar to the stock to balance." },
        ],
      },
      feelCue: "A wooden spoon dragged through the pot should leave a trail that fills in slowly, like thick jam — the onions have no structural resistance left.",
    },
    {
      nodeId: "step_2",
      action: "Deglaze",
      inputs: ["caramelized_onions", "ing_03", "ing_07"],
      outputState: "deglazed_onion_base",
      instructions: "Pour in the white wine and scrape vigorously with a wooden spoon to lift all the browned fond from the pot bottom. Add the thyme sprigs. Let the wine reduce until almost completely absorbed, about 3–4 minutes — you should hear an aggressive sizzle that fades to a quiet bubble.",
      visualCue: {
        primaryTarget: "The wine has reduced to nearly nothing and the onions are glossy and dark again, now fragrant with reduced wine and herbs.",
        spectrum: [
          { state: "Underdone", description: "Wine is still very liquid and pale; the fond on the bottom hasn't fully lifted. The mixture looks watery.", action: "Continue reducing on medium heat, stirring frequently to prevent the onions from catching." },
          { state: "Perfect",   description: "Wine has reduced to a glaze. The fond is fully incorporated. Onions look glossy and slightly thickened. The smell is round and complex.", action: "Add the beef stock and simmer." },
          { state: "Overdone",  description: "Onions are sticking again and the wine has evaporated completely, leaving the mixture dry.", action: "Add the beef stock immediately to halt cooking." },
        ],
      },
      feelCue: "The steam at this stage smells sharp and winey, then transitions to a sweeter, rounder aroma as the alcohol burns off.",
    },
    {
      nodeId: "step_3",
      action: "Simmer",
      inputs: ["deglazed_onion_base", "ing_04"],
      outputState: "onion_soup",
      instructions: "Pour in the beef stock and bring to a gentle simmer. Cook uncovered for 20 minutes, allowing the onion sweetness and stock depth to meld. Taste and correct seasoning with salt and pepper. Fish out the thyme stems.",
      visualCue: {
        primaryTarget: "A dark, amber-brown soup with a lightly shimmering surface and visible onion strands throughout — rich-looking but clear, not murky.",
        spectrum: [
          { state: "Underdone", description: "Soup tastes of separate elements — beefy stock and sweet onions haven't unified. Surface looks flat.", action: "Simmer another 10 minutes uncovered to encourage integration." },
          { state: "Perfect",   description: "A unified, deeply savory broth with sweetness underneath. Color is a clear, dark amber. Tastes like the onions and stock are inseparable.", action: "Ladle into oven-safe crocks and proceed to gratinée." },
          { state: "Overdone",  description: "Soup has reduced significantly and tastes very salty; surface may look syrupy.", action: "Add a splash of hot water or unsalted stock to correct; re-taste seasoning." },
        ],
      },
      feelCue: "Taste on the tip of a spoon — it should be simultaneously sweet, savory, and full, with no harsh or sharp edges.",
    },
    {
      nodeId: "step_4",
      action: "Bake",
      inputs: ["onion_soup", "ing_05", "ing_06"],
      outputState: "finished_soupe_a_loignon",
      instructions: "Ladle the hot soup into oven-safe crocks placed on a baking sheet. Float one or two toasted baguette slices on each surface. Pile the Gruyère generously over the bread and the rim — the cheese should completely cover the surface and drape over the edge of each crock. Broil on the top rack for 4–6 minutes until the cheese is deeply golden, bubbling, and spotted with brown blisters.",
      visualCue: {
        primaryTarget: "A domed, blistered, golden-brown cheese crust that has sealed to the rim of the crock, with amber soup bubbling up through any cracks at the edges.",
        spectrum: [
          { state: "Underdone", description: "Cheese is melted but pale and white, with no color. No crust has formed.", action: "Return to the broiler for 2–3 more minutes. Move the crocks closer to the element." },
          { state: "Perfect",   description: "Deep golden-brown crust with darker blistered spots, sealed to the rim. Soup is audibly bubbling at the edges. The cheese pulls into long strands when a spoon breaks the surface.", action: "Serve immediately — the crocks are extremely hot." },
          { state: "Overdone",  description: "Cheese is dark brown and carbonized in patches. Smells bitter. The bread beneath may have hardened to a crisp.", action: "Scrape away the burnt spots. The soup beneath is still good — serve with caution." },
        ],
      },
      feelCue: "When you break through the crust with a spoon, a rush of trapped steam should escape with a faint hiss — the soup beneath still furiously hot.",
    },
  ],
};
