export default {
  repoId: "master_french_french_onion_soup_001",
  parentRepoId: null,
  slug: "french-onion-soup",
  author: "ForkRecipe Kitchen",

  title: "French Onion Soup (Soupe à l'Oignon)",
  description: "An hour of patient caramelization transforms sharp raw onions into a mahogany-sweet, deeply savory broth that fills a crock to the brim — then Gruyère-draped croûtons are melted under the broiler until the cheese pulls into long, golden threads at the table.",
  cuisine: "French",
  culture: "Parisian",
  category: "stocks",

  tags: ["french", "onion", "soup", "gruyere", "caramelized"],
  difficulty: 2,
  activeTime: "20 min",
  totalTime: "1 hr 30 min",
  ratioSystem: "parts",

  stars: 3105,
  forks: 287,
  contributors: 33,
  license: "CC-BY-SA",
  createdAt: "2024-11-05",
  updatedAt: "2026-02-18",

  flavorRadar: { sweet: 3, salty: 4, sour: 0, bitter: 1, umami: 5, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Allium",    name: "Yellow onions, thinly sliced (about 5 large)",       ratioValue: 100, defaultUnit: "parts", substitutions: ["white onions", "a mix of yellow and red onions"] },
    { ingId: "ing_02", role: "Fat",       name: "Unsalted butter and olive oil (equal parts)",         ratioValue: 10,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Liquid",    name: "Dry white wine or dry sherry",                        ratioValue: 20,  defaultUnit: "parts", substitutions: ["dry vermouth"] },
    { ingId: "ing_04", role: "Liquid",    name: "Beef stock (good quality, ideally homemade)",         ratioValue: 80,  defaultUnit: "parts", substitutions: ["chicken stock (lighter color/flavor)"] },
    { ingId: "ing_05", role: "Structure", name: "Baguette slices, 2 cm thick, toasted dry",            ratioValue: 15,  defaultUnit: "parts", substitutions: ["any crusty bread, staled overnight"] },
    { ingId: "ing_06", role: "Dairy",     name: "Gruyère, generously grated",                          ratioValue: 25,  defaultUnit: "parts", substitutions: ["Comté", "Emmental", "a blend of both"] },
    { ingId: "ing_07", role: "Seasoning", name: "Salt, black pepper, a pinch of thyme, and bay leaf",  ratioValue: 2,   defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Caramelize",
      inputs: ["ing_01", "ing_02", "ing_07"],
      outputState: "caramelized_onions",
      instructions: "Melt butter with olive oil in a large, heavy pot over medium heat. Add all the onions with a pinch of salt, thyme, and bay leaf. Cook for 45–60 minutes over medium to medium-low heat, stirring every 5–10 minutes and scraping up any fond from the bottom. Resist the urge to raise the heat — true caramelization cannot be rushed. The onions will pass through many stages: first softening, then turning golden, then slowly deepening to mahogany.",
      visualCue: {
        primaryTarget: "Deeply mahogany-brown onions, collapsed to a fraction of their original volume, smelling intensely sweet and savory. The pot bottom has a rich, sticky brown fond that smells of roasted sugar.",
        spectrum: [
          { state: "Underdone", description: "Onions are golden but not dark brown. They smell sweet but still somewhat onion-sharp. Volume is still relatively high — about half reduced.", action: "Continue cooking. The real depth of French onion soup comes from properly dark caramelization — golden is not enough." },
          { state: "Perfect",   description: "Dark mahogany-brown, collapsed to about one-fifth of original volume. Smell is deeply sweet, complex, and savory. The fond on the pot bottom is very dark and sticky.", action: "Raise heat, add wine, and deglaze." },
          { state: "Overdone",  description: "Nearly black, very small volume. A bitter, slightly burnt edge to the sweet smell. Some strands may have crisped against the pot.", action: "Deglaze immediately with wine. A slight over-caramelization actually adds complexity, but any longer risks true bitterness." },
        ],
      },
      feelCue: "A fully caramelized onion strand pressed between fingers should dissolve immediately — offering no resistance whatsoever — like pressing warm, wet silk between fingertips.",
    },
    {
      nodeId: "step_2",
      action: "Deglaze",
      inputs: ["caramelized_onions", "ing_03"],
      outputState: "deglazed_onions",
      instructions: "Raise heat to high. Pour in the white wine or sherry and scrape the pot bottom vigorously — all that dark fond must dissolve into the liquid. Boil for 3–4 minutes until the wine has reduced by two-thirds and the alcohol smell is completely gone. The onions will absorb much of the wine and the mixture will look dense and jammy.",
      visualCue: {
        primaryTarget: "The wine has been absorbed or reduced almost completely. The onions are coated in a dark, glossy glaze. The pot bottom is completely clean and the mixture smells sweet, savory, and slightly tangy.",
        spectrum: [
          { state: "Underdone", description: "Wine is still liquid in the pan. Alcohol smell is sharp. The fond has barely lifted from the pot bottom.", action: "Boil harder and scrape more vigorously. Raw alcohol in the soup base will taste harsh." },
          { state: "Perfect",   description: "No standing liquid remains — the wine has reduced into a glaze coating the onions. Pot bottom is clean. Smell is sweet and rounded.", action: "Add the stock and simmer." },
          { state: "Overdone",  description: "Onions are sticking and beginning to scorch again. The glaze is very thick and the smell is sharp.", action: "Add the stock immediately. A small scorch at this stage is fine — it adds depth." },
        ],
      },
      feelCue: "The deglazed onions stirred with a spoon should pull away from the pot bottom in a single, heavy mass — sticky and dense, like stirring dark jam — not splashing like liquid.",
    },
    {
      nodeId: "step_3",
      action: "Simmer",
      inputs: ["deglazed_onions", "ing_04"],
      outputState: "onion_soup",
      instructions: "Add the warm beef stock and stir well, scraping any remaining fond from the pot sides. Bring to a simmer and cook uncovered for 20–25 minutes until the broth has taken on a deep mahogany color from the onions and has concentrated slightly. Taste and season with salt and black pepper. The soup should taste rich and complex — deeply sweet from the onions, savory from the stock, and slightly bitter at the edges.",
      visualCue: {
        primaryTarget: "A dark, mahogany-brown broth with soft, dissolved onion threads distributed throughout. The surface shimmers with a thin film of fat. The color is rich and deep.",
        spectrum: [
          { state: "Underdone", description: "Broth is pale and thin. Onion flavor is not yet fully integrated. The soup tastes separately of stock and onions rather than as a unified flavor.", action: "Continue simmering. The 20-minute simmer is necessary for the onion sweetness to fully marry with the stock." },
          { state: "Perfect",   description: "Deep mahogany broth that tastes cohesive and complex. Sweet, savory, and deeply umami. Onion threads are soft and barely visible. Ladle coats the spoon.", action: "Ladle into ovenproof crocks and add the croûtons and cheese." },
          { state: "Overdone",  description: "Broth has reduced significantly and become very salty and intensely concentrated. Onion threads are very few and almost dissolved.", action: "Add a splash of water or additional stock to adjust consistency and taste again for seasoning." },
        ],
      },
      feelCue: "Taste a spoonful — the soup should wrap around your tongue with a long, warm sweetness followed by a deep savory finish and a slight pleasurable bitterness at the very back of the palate.",
    },
    {
      nodeId: "step_4",
      action: "Bake",
      inputs: ["onion_soup", "ing_05", "ing_06"],
      outputState: "finished_french_onion_soup",
      instructions: "Preheat the broiler to high. Ladle the soup into oven-safe crocks, filling to about 1 cm from the top. Place one or two toasted baguette slices on top — they should sit on the surface of the soup, not sink. Pile grated Gruyère generously over the bread and let it overhang onto the crock rim. Set on a baking sheet and broil for 3–5 minutes until the cheese is deeply golden, bubbling, and has developed dark caramelized spots.",
      visualCue: {
        primaryTarget: "A domed, bubbling layer of golden-brown Gruyère covering the entire crock opening, with dark amber spots and slightly crisped edges where the cheese has touched the hot crock rim.",
        spectrum: [
          { state: "Underdone", description: "Cheese is melted but still pale and rubbery. No browning or bubbling. The croûton beneath is still visible through the cheese.", action: "Continue broiling. The flavour and texture transformation of Gruyère happens when it begins to brown." },
          { state: "Perfect",   description: "Golden-brown, bubbling dome with dark spots. The cheese has crisped where it touches the crock rim. Lifting the crock reveals long, ropy cheese threads pulling toward the table.", action: "Transfer to a plate and serve immediately. Warn diners that the crock is extremely hot." },
          { state: "Overdone",  description: "Cheese is uniformly dark brown or black. Smoke rising from the baking sheet. The cheese tastes bitter and acrid.", action: "Remove immediately. Scrape off the blackened top layer — the layer beneath is likely still good and melted." },
        ],
      },
      feelCue: "The finished soup in its crock should radiate heat that you feel on the back of your hand from 30 cm away — the crockery retains heat so intensely that it continues cooking the cheese after leaving the broiler.",
    },
  ],
};
