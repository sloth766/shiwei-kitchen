export default {
  repoId: "master_turkish_lentil_soup_001",
  parentRepoId: null,
  slug: "lentil-soup",
  author: "ForkRecipe Kitchen",

  title: "Red Lentil Soup",
  description: "Turkey's most democratic dish — red lentils dissolved to velvet, bloomed with paprika-butter at the table, and finished with a jolt of lemon that transforms humble into electric.",
  cuisine: "Turkish",
  culture: "Turkish",
  category: "grains",

  tags: ["lentil", "soup", "turkish", "vegan", "blended", "winter"],
  difficulty: 1,
  activeTime: "20 min",
  totalTime: "45 min",
  ratioSystem: "parts",

  stars: 1990,
  forks: 156,
  contributors: 44,
  license: "CC-BY-SA",
  createdAt: "2024-07-20",
  updatedAt: "2025-02-01",

  flavorRadar: { sweet: 1, salty: 3, sour: 3, bitter: 1, umami: 3, heat: 2 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Red lentils (rinsed)",             ratioValue: 100, defaultUnit: "parts", substitutions: ["yellow split peas"] },
    { ingId: "ing_02", role: "Allium",    name: "Yellow onion (diced)",              ratioValue: 60,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Allium",    name: "Garlic (minced)",                   ratioValue: 8,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Structure", name: "Carrot (diced)",                    ratioValue: 30,  defaultUnit: "parts", substitutions: ["parsnip"] },
    { ingId: "ing_05", role: "Liquid",    name: "Vegetable or chicken stock",        ratioValue: 500, defaultUnit: "parts", substitutions: ["water + bouillon"] },
    { ingId: "ing_06", role: "Spice",     name: "Sweet paprika",                     ratioValue: 3,   defaultUnit: "parts", substitutions: ["smoked paprika"] },
    { ingId: "ing_07", role: "Spice",     name: "Ground cumin",                      ratioValue: 2,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_08", role: "Fat",       name: "Butter (for bloom)",                ratioValue: 10,  defaultUnit: "parts", substitutions: ["olive oil"] },
    { ingId: "ing_09", role: "Acid",      name: "Fresh lemon juice",                 ratioValue: 15,  defaultUnit: "parts", substitutions: ["white wine vinegar"] },
    { ingId: "ing_10", role: "Seasoning", name: "Salt and black pepper",             ratioValue: 4,   defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Sauté",
      inputs: ["ing_02", "ing_03", "ing_04", "ing_08"],
      outputState: "softened_aromatics",
      instructions: "Melt half the butter in a large pot over medium heat. Add onion and carrot and cook, stirring occasionally, for 8-10 minutes until softened and the onion is translucent and lightly golden at the edges. Add garlic and cook 1 more minute. Add paprika and cumin and stir for 30 seconds — the spices should sizzle briefly in the butter and release a fragrant bloom. Do not let them scorch.",
      visualCue: {
        primaryTarget: "Onions are translucent and lightly golden. The pot smells of bloomed paprika and sweet carrot — a warm, brick-red aroma rising from the butter.",
        spectrum: [
          { state: "Underdone", description: "Onion is still white and firm. Garlic smells raw. Spices are pale and unactivated.", action: "Cook 3-5 more minutes. The onion base needs to be softened to blend smoothly." },
          { state: "Perfect",   description: "Onions are floppy and golden-edged. Spice in the butter is deep orange-red and fragrant.", action: "Add lentils and stock immediately." },
          { state: "Overdone",  description: "Spices are dark brown and smell bitter. Garlic has scorched.", action: "Add a splash of stock immediately to stop cooking. The bitter garlic flavor will be diluted by the lentils." },
        ],
      },
      feelCue: "When paprika hits butter, the kitchen fills immediately with a warm, slightly sweet spice cloud — it smells like the beginning of something good.",
    },
    {
      nodeId: "step_2",
      action: "Simmer",
      inputs: ["softened_aromatics", "ing_01", "ing_05", "ing_10"],
      outputState: "cooked_lentil_soup",
      instructions: "Add rinsed lentils and stock to the pot. Season with salt and pepper. Bring to a boil over high heat, then reduce to a steady simmer. Cook uncovered for 20-25 minutes, stirring occasionally. Red lentils dissolve on their own — no blending required for a smooth texture — but a brief blend produces a silkier, restaurant-quality result. Skim any foam that rises in the first few minutes.",
      visualCue: {
        primaryTarget: "Lentils have completely dissolved into the stock. The soup is thick, opaque, and deep orange-yellow. A wooden spoon dragged through the surface leaves a trail that closes slowly.",
        spectrum: [
          { state: "Underdone", description: "Lentils are visible as distinct pale-orange discs. The soup is thin and brothy.", action: "Simmer 10 more minutes. Red lentils lose structure gradually — they will dissolve with patience." },
          { state: "Perfect",   description: "Soup is thick and uniformly colored. Lentils are indistinguishable from the broth. Stirs with gentle resistance.", action: "Remove from heat and blend if desired, then return to pot." },
          { state: "Overdone",  description: "Soup has become very thick and is beginning to stick and spit. The bottom may be scorching.", action: "Remove from heat, add a ladle of hot water, and stir vigorously." },
        ],
      },
      feelCue: "The soup at this point smells warmly of cumin and lentil starch — almost bread-like, with a gentle mineral note from the stock.",
    },
    {
      nodeId: "step_3",
      action: "Blend",
      inputs: ["cooked_lentil_soup"],
      outputState: "blended_soup",
      instructions: "Use an immersion blender to blend the soup directly in the pot for 1-2 minutes until completely smooth. Alternatively, blend in batches in a stand blender, filling only halfway and holding the lid with a folded towel. Return to the pot, adjust consistency with a splash of hot water if too thick, and bring back to a simmer. Taste and adjust salt. The texture should flow like heavy cream — fluid but substantial.",
      visualCue: {
        primaryTarget: "Uniformly smooth, orange-amber soup with a glossy surface. No visible lentil pieces. It coats the back of a spoon and holds there.",
        spectrum: [
          { state: "Underdone", description: "Visible pieces of carrot or lentil remain. Texture is rough when you run a spoon across your tongue.", action: "Continue blending. An immersion blender takes longer than a stand blender — at least 90 seconds at full speed." },
          { state: "Perfect",   description: "Glossy, smooth, and perfectly uniform. The orange color deepens when blended. No grainy texture.", action: "Return to pot, adjust seasoning, and prepare the paprika butter." },
          { state: "Overdone",  description: "Blended too long and the soup has become thin from aeration and heat loss.", action: "Return to heat and simmer uncovered briefly to restore body. This cannot truly be over-blended — more is better." },
        ],
      },
      feelCue: "Properly blended lentil soup coats the back of a spoon and feels like velvet on your tongue — no grit, no lumps, only warmth.",
    },
    {
      nodeId: "step_4",
      action: "Bloom",
      inputs: ["ing_08", "ing_06"],
      outputState: "paprika_butter",
      instructions: "In a small saucepan or ladle held over the flame, melt the remaining butter over medium heat. When it foams, add a pinch more of paprika and swirl until the butter turns vivid orange-red and smells intensely of sweet pepper. This takes 30-45 seconds. Remove from heat the moment it begins to deepen past orange toward brown.",
      visualCue: {
        primaryTarget: "Butter is bright orange-red and foaming around the paprika. It smells intensely of bloomed sweet pepper, not burnt fat.",
        spectrum: [
          { state: "Underdone", description: "Butter is still yellow and the paprika is floating on top, unactivated.", action: "Increase heat slightly and swirl the pan more actively." },
          { state: "Perfect",   description: "Bright orange, foaming, intensely aromatic. The paprika has dissolved into the fat.", action: "Remove from heat and drizzle immediately over the soup bowls." },
          { state: "Overdone",  description: "Butter is dark brown and the paprika has turned bitter and dark. Acrid smell.", action: "Discard and start again — burnt butter drizzle will ruin the soup's delicate finish." },
        ],
      },
      feelCue: "The paprika butter moment is fleeting and theatrical — you can smell it from across the room, sweet and capsicum-rich, cutting through the neutral lentil steam.",
    },
    {
      nodeId: "step_5",
      action: "Finish",
      inputs: ["blended_soup", "paprika_butter", "ing_09"],
      outputState: "finished_lentil_soup",
      instructions: "Ladle the hot soup into warm bowls. Drizzle a teaspoon of paprika butter in a circle over each bowl. Squeeze fresh lemon juice directly into each serving — about half a teaspoon per bowl — and serve immediately with crusty bread or flatbread alongside. The lemon must be added at serving, not to the pot, to preserve its brightness.",
      visualCue: {
        primaryTarget: "A vivid orange bowl with a ring of burnt-orange paprika butter floating on the surface and a shimmer of lemon juice catching the light.",
        spectrum: [
          { state: "Underdone", description: "No paprika butter drizzle. The soup looks flat and monochrome.", action: "Add the paprika butter — it is essential, not decorative." },
          { state: "Perfect",   description: "Vibrant orange soup with a swirled red-orange butter ring. Steam rises. The smell is warm paprika, lemon, and cumin.", action: "Serve immediately before the butter sinks." },
          { state: "Overdone",  description: "Soup has sat too long and the paprika butter has sunk and incorporated. Lemon has faded.", action: "Add a fresh squeeze of lemon at the table to restore brightness." },
        ],
      },
      feelCue: "The moment lemon hits the hot soup, the aromatic profile snaps upward — the warmth and weight of the lentils are suddenly lifted, and the whole bowl tastes brighter.",
    },
  ],
};
