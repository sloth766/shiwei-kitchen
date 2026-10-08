export default {
  repoId: "master_hungarian_beef_goulash_001",
  parentRepoId: null,
  slug: "beef-goulash",
  author: "ForkRecipe Kitchen",

  title: "Hungarian Beef Goulash",
  description: "Paprika-red and deeply fragrant, this stew builds its soul in the fat that blooms the spice — the beef yields hour by hour into something that coats a wooden spoon and stains it permanently orange.",
  cuisine: "Hungarian",
  culture: "Hungarian",
  category: "proteins",

  tags: ["hungarian", "beef", "paprika", "stew", "hearty"],
  difficulty: 2,
  activeTime: "30 min",
  totalTime: "2 hrs",
  ratioSystem: "parts",

  stars: 1840,
  forks: 214,
  contributors: 27,
  license: "CC-BY-SA",
  createdAt: "2024-03-15",
  updatedAt: "2025-08-20",

  flavorRadar: { sweet: 1, salty: 3, sour: 1, bitter: 1, umami: 4, heat: 2 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Beef chuck, cut into 4cm cubes",          ratioValue: 100, defaultUnit: "parts", substitutions: ["beef shank", "pork shoulder"] },
    { ingId: "ing_02", role: "Allium",    name: "Yellow onions, diced",                     ratioValue: 50,  defaultUnit: "parts", substitutions: ["white onion"] },
    { ingId: "ing_03", role: "Spice",     name: "Sweet Hungarian paprika",                  ratioValue: 8,   defaultUnit: "parts", substitutions: ["half sweet, half smoked paprika"] },
    { ingId: "ing_04", role: "Fat",       name: "Lard or neutral oil",                      ratioValue: 6,   defaultUnit: "parts", substitutions: ["duck fat", "vegetable oil"] },
    { ingId: "ing_05", role: "Liquid",    name: "Beef stock or water",                      ratioValue: 80,  defaultUnit: "parts", substitutions: ["chicken stock"] },
    { ingId: "ing_06", role: "Seasoning", name: "Salt and caraway seeds",                   ratioValue: 2,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Aromatic",  name: "Garlic cloves, minced",                    ratioValue: 3,   defaultUnit: "parts", substitutions: ["garlic powder"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Sauté",
      inputs: ["ing_02", "ing_04"],
      outputState: "softened_onions",
      instructions: "Melt the lard in a heavy pot or Dutch oven over medium heat. Add the diced onions with a pinch of salt. Cook slowly, stirring often, for 15–20 minutes until the onions are deeply golden and jammy. Do not rush this step — the sweetness of the onion is the backbone of the entire dish.",
      visualCue: {
        primaryTarget: "Onions are collapsed, golden-amber throughout with soft, glossy edges. The volume has reduced by at least half.",
        spectrum: [
          { state: "Underdone", description: "Onions are still pale yellow and hold their shape. Raw, sharp onion aroma dominates.", action: "Continue cooking on medium-low. Adding paprika now will produce a raw, harsh flavor." },
          { state: "Perfect",   description: "Onions are deep golden, nearly jammy, and smell sweet and savory. They move as one mass when stirred.", action: "Remove from heat and bloom the paprika." },
          { state: "Overdone",  description: "Onions are dark brown and the pot bottom has dark residue. A bitter edge to the smell.", action: "Deglaze with a splash of water and scrape up the fond. The slight bitterness will be absorbed by the long braise." },
        ],
      },
      feelCue: "The onions should feel silky and offer no resistance when pressed against the pot wall with your spoon — they should collapse into a paste instantly.",
    },
    {
      nodeId: "step_2",
      action: "Bloom",
      inputs: ["softened_onions", "ing_03", "ing_07"],
      outputState: "paprika_base",
      instructions: "Remove the pot from heat completely — this is critical. Stir in the paprika and garlic off the flame. The residual heat will cook the spice enough to open its fat-soluble color compounds without burning it. Paprika burns at a very low temperature and turns bitter in seconds over direct heat. Stir for 30–45 seconds until the mixture is a vivid, uniform red paste.",
      visualCue: {
        primaryTarget: "The mixture transforms into a thick, brilliant red paste with an intensely sweet, earthy paprika aroma filling the kitchen.",
        spectrum: [
          { state: "Underdone", description: "Paprika is still orange and powdery. The raw spice smell is sharp and dusty.", action: "Stir for another 30 seconds in the residual heat. The oil must fully absorb the paprika pigment." },
          { state: "Perfect",   description: "Deep brick-red paste, glistening and uniform. The aroma is sweet, complex, and slightly fruity — like dried red peppers and earth.", action: "Return to heat and add the beef immediately." },
          { state: "Overdone",  description: "Paste has darkened to brown at the edges. A harsh, acrid smell. Dark bitter notes.", action: "Add a splash of stock immediately to stop the cooking. Proceed, but reduce the cooking time — bitterness will be present." },
        ],
      },
      feelCue: "Press a finger to the paste — it should feel oily and smooth, not powdery or gritty. The red pigment should stain your fingertip immediately.",
    },
    {
      nodeId: "step_3",
      action: "Sear",
      inputs: ["paprika_base", "ing_01", "ing_06"],
      outputState: "browned_beef",
      instructions: "Return the pot to medium-high heat. Add the beef cubes and season with salt and caraway seeds. Stir to coat every piece with the paprika base. Allow the beef to color on at least two sides — about 3–4 minutes per side without moving. Work in batches if needed to avoid steaming. The goal is a fond-building sear, not full browning.",
      visualCue: {
        primaryTarget: "Beef cubes show a dark red-brown crust on their surfaces where they touched the pan, surrounded by an intensely aromatic, sizzling paprika-onion mass.",
        spectrum: [
          { state: "Underdone", description: "Beef is grey and dull. It has released moisture and is steaming rather than searing. No crust visible.", action: "Raise the heat and stop stirring. Allow liquid to cook off before the Maillard reaction can start." },
          { state: "Perfect",   description: "At least two sides of each cube are mahogany-brown with a distinct crust. The pot bottom has a dark, fragrant fond.", action: "Add the stock and scrape up the fond." },
          { state: "Overdone",  description: "Crust is nearly black. Strong burnt smell from the paprika on the pot bottom.", action: "Deglaze immediately with stock and proceed. The braise will balance much of the bitterness." },
        ],
      },
      feelCue: "The beef should resist when you try to move it from the pot — if it releases easily, it has developed a proper crust. Forced lifting tears the crust off.",
    },
    {
      nodeId: "step_4",
      action: "Braise",
      inputs: ["browned_beef", "ing_05"],
      outputState: "finished_goulash",
      instructions: "Add enough stock to barely cover the beef. Scrape up any fond from the bottom. Bring to a boil, then reduce to the lowest simmer — just a bubble breaking the surface every few seconds. Cover and cook for 1 hour 30 minutes. Check occasionally and add a splash of water if the liquid drops below one-third the height of the meat. The stew is done when the beef yields completely to a fork with no resistance.",
      visualCue: {
        primaryTarget: "The sauce has reduced to a thick, glossy, deep-red gravy that coats a spoon and holds the coating when you tilt it. The beef breaks apart with a fork but holds its shape.",
        spectrum: [
          { state: "Underdone", description: "Beef resists the fork — chewy and tough at the center. Sauce is thin and watery, pale orange rather than deep red.", action: "Continue simmering for 20–30 more minutes. Connective tissue requires sustained heat to convert to gelatin." },
          { state: "Perfect",   description: "Beef yields like soft butter to a fork. The sauce is thick enough to coat a wooden spoon and runs off slowly. Color is a deep brick-red.", action: "Taste and adjust salt. Serve over egg noodles or with crusty bread." },
          { state: "Overdone",  description: "Beef has disintegrated into shreds. Sauce has reduced past gravy into a sticky paste. Color has darkened toward brown.", action: "Add a cup of stock to restore consistency. The shredded beef texture is not traditional but still delicious." },
        ],
      },
      feelCue: "A piece of the beef, pressed between your fingers, should fall apart without any chewing motion required — the collagen has fully converted to gelatin when you can pinch a cube in half with two fingers.",
    },
  ],
};
