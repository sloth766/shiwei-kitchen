export default {
  repoId: "master_thai_tom_yum_soup_001",
  parentRepoId: null,
  slug: "tom-yum-soup",
  author: "ForkRecipe Kitchen",

  title: "Tom Yum Goong",
  description: "A Thai broth that hits every receptor at once — galangal and lemongrass steep into a translucent, deeply fragrant base, shrimp cook just past translucent, and a final bloom of lime juice and fish sauce tilts everything into fierce, clean heat and sour brightness.",
  cuisine: "Thai",
  culture: "Central Thai",
  category: "stocks",

  tags: ["thai", "soup", "shrimp", "lemongrass", "hot-sour"],
  difficulty: 2,
  activeTime: "20 min",
  totalTime: "30 min",
  ratioSystem: "parts",

  stars: 2876,
  forks: 310,
  contributors: 35,
  license: "CC-BY-SA",
  createdAt: "2024-04-08",
  updatedAt: "2025-10-22",

  flavorRadar: { sweet: 1, salty: 3, sour: 4, bitter: 0, umami: 4, heat: 4 },

  ingredients: [
    { ingId: "ing_01", role: "Liquid",    name: "Water or light chicken stock",                               ratioValue: 100, defaultUnit: "parts", substitutions: ["shrimp shell stock for double intensity"] },
    { ingId: "ing_02", role: "Aromatic",  name: "Lemongrass stalks, bruised and cut into 5cm segments",      ratioValue: 10,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Aromatic",  name: "Galangal (kha), sliced into coins (not ginger)",            ratioValue: 8,   defaultUnit: "parts", substitutions: ["ginger is a different flavor — use only in emergency"] },
    { ingId: "ing_04", role: "Aromatic",  name: "Kaffir lime leaves, lightly bruised and torn",              ratioValue: 5,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Heat",      name: "Thai bird's eye chilies, crushed",                          ratioValue: 4,   defaultUnit: "parts", substitutions: ["serrano chilies"] },
    { ingId: "ing_06", role: "Protein",   name: "Large shrimp (head-on preferred), shell-on or peeled",      ratioValue: 40,  defaultUnit: "parts", substitutions: ["chicken breast slices", "mixed seafood"] },
    { ingId: "ing_07", role: "Umami",     name: "Straw mushrooms or oyster mushrooms, halved",               ratioValue: 15,  defaultUnit: "parts", substitutions: ["button mushrooms"] },
    { ingId: "ing_08", role: "Seasoning", name: "Fish sauce (Tiparos or Megachef)",                          ratioValue: 8,   defaultUnit: "parts", substitutions: ["light soy sauce for vegetarian"] },
    { ingId: "ing_09", role: "Acid",      name: "Fresh lime juice (from about 2 limes)",                     ratioValue: 10,  defaultUnit: "parts", substitutions: ["tamarind water for a more complex sour"] },
    { ingId: "ing_10", role: "Garnish",   name: "Fresh cilantro and spring onion, chopped",                  ratioValue: 5,   defaultUnit: "parts", substitutions: ["culantro / long coriander for authenticity"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Steep aromatics",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_04", "ing_05"],
      outputState: "aromatic_stock",
      instructions: "Combine water (or stock), lemongrass, galangal, kaffir lime leaves, and bruised chilies in a pot. Bring to a boil, then reduce to a vigorous simmer. Cook for 10-12 minutes to extract the aromatics fully. Do not strain yet — the aromatic solids continue infusing as you cook the rest of the soup.",
      visualCue: {
        primaryTarget: "Broth has taken on a pale golden-green tinge; the surface is fragrant with lemongrass, lime leaf, and a faint heat rising in the steam.",
        spectrum: [
          { state: "Underdone", description: "Broth still smells mostly like plain water; lemongrass and galangal haven't fully released their compounds.", action: "Continue simmering for another 5 minutes; the aromatics need time and heat." },
          { state: "Perfect",   description: "Broth is pale gold, fragrant with lemongrass, citrus, and earthy galangal. Chilies have released visible orange-red color into the liquid.", action: "Add mushrooms and proceed." },
          { state: "Overdone",  description: "Broth has reduced significantly and may taste slightly bitter from over-extracted kaffir lime — the pithy stems contribute bitterness over time.", action: "Remove kaffir lime leaves; add a splash of water to reconstitute volume." },
        ],
      },
      feelCue: "Lean over the pot and inhale — you should smell lemongrass, citrus, and something almost medicinal from the galangal. If the fragrance is faint, simmer longer with the lid off.",
    },
    {
      nodeId: "step_2",
      action: "Cook mushrooms",
      inputs: ["ing_07", "aromatic_stock"],
      outputState: "mushroom_broth",
      instructions: "Add halved mushrooms to the simmering aromatic stock. Cook for 3-4 minutes until tender but still holding their shape. The mushrooms release their own umami into the broth, deepening the base.",
      visualCue: {
        primaryTarget: "Mushrooms are tender and have absorbed the broth color; the stock itself looks slightly more golden and opaque from the mushroom release.",
        spectrum: [
          { state: "Underdone", description: "Mushrooms are still pale and resistant when pressed with a spoon.", action: "Cook another 2-3 minutes." },
          { state: "Perfect",   description: "Mushrooms yield slightly when pressed but hold their shape. The broth is a deeper golden with visible umami richness.", action: "Add shrimp immediately." },
          { state: "Overdone",  description: "Mushrooms are completely soft and beginning to disintegrate into the broth — texture is lost.", action: "Proceed quickly; they will still taste fine." },
        ],
      },
      feelCue: "The broth at this stage should smell like the sea and the forest simultaneously — the mushrooms add an earthy depth that anchors the citrus aromatics.",
    },
    {
      nodeId: "step_3",
      action: "Cook shrimp",
      inputs: ["ing_06", "mushroom_broth"],
      outputState: "cooked_shrimp_broth",
      instructions: "Add shrimp to the simmering broth. Cook for 1-2 minutes only — until just pink and curled. Do not overcook. If using head-on shrimp, the heads release a burst of shrimp essence into the broth: press them gently with a spoon as they cook. Remove from heat immediately when the shrimp curl.",
      visualCue: {
        primaryTarget: "Shrimp are uniformly pink-orange throughout, curled into a C-shape — not an O, which indicates overcooking.",
        spectrum: [
          { state: "Underdone", description: "Shrimp are still grey-translucent and limp. The color change hasn't completed.", action: "Cook another 30-60 seconds. Do not leave the pot." },
          { state: "Perfect",   description: "Shrimp are vivid pink-orange, curled to a loose C, and slightly firm when pressed. The broth smells strongly of sweet shrimp essence.", action: "Remove from heat and season immediately." },
          { state: "Overdone",  description: "Shrimp are curled tightly to an O-shape, opaque white throughout, and rubbery when pressed.", action: "Season and serve immediately — nothing further helps overcooked shrimp." },
        ],
      },
      feelCue: "Touch a shrimp with your finger — it should feel firm and spring back slightly, like a pencil eraser. If it feels hard and doesn't spring, it is already overcooked.",
    },
    {
      nodeId: "step_4",
      action: "Season and finish",
      inputs: ["cooked_shrimp_broth", "ing_08", "ing_09", "ing_10"],
      outputState: "finished_tom_yum",
      instructions: "Off heat (critical — lime juice loses brightness when simmered), add fish sauce and lime juice. Taste and balance: fish sauce for salt, lime for sour, and adjust chili level to taste. The soup should be bracingly sour and hot in equal measure. Ladle into bowls, add garnish, and serve immediately — this soup does not wait.",
      visualCue: {
        primaryTarget: "Clear, pale golden broth with vivid pink shrimp, green herbs floating, and orange chili specks — a soup that looks as electrifying as it tastes.",
        spectrum: [
          { state: "Underdone", description: "Soup tastes flat, mostly of lemongrass water — fish sauce and lime haven't been added yet.", action: "Add fish sauce first (season), then lime juice little by little, tasting as you go." },
          { state: "Perfect",   description: "The flavors hit in sequence: first the heat from the chilies, then the sour brightness of lime, then the savory depth of fish sauce and shrimp. Each element is distinct and loud.", action: "Ladle and garnish immediately." },
          { state: "Overdone",  description: "Over-seasoned — either too salty (too much fish sauce) or too sour (too much lime). The flavors overwhelm each other.", action: "Add a small amount of water and a pinch of sugar to balance. The sugar should be barely perceptible." },
        ],
      },
      feelCue: "The finished soup should make you draw a sharp breath from the heat, then exhale with the sour — that one-two punch is the soul of tom yum.",
    },
  ],
};
