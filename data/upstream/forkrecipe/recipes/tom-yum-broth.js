export default {
  repoId: "master_thai_tom_yum_broth_001",
  parentRepoId: null,
  slug: "tom-yum-broth",
  author: "ForkRecipe Kitchen",

  title: "Tom Yum Broth",
  description: "A broth of such muscular clarity that every sip pricks the tongue with lime, burns with chili, and then retreats into the deep oceanic warmth of shrimp and fish sauce — the lemongrass and galangal floating in the bowl like aromatic driftwood, spent but still fragrant. This is the broth that defines hot-and-sour.",
  cuisine: "Thai",
  culture: "Central Thai",
  category: "stocks",

  tags: ["soup", "thai", "broth", "shrimp", "lemongrass", "hot-sour", "spicy"],
  difficulty: 2,
  activeTime: "25 min",
  totalTime: "40 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 1, salty: 3, sour: 5, bitter: 1, umami: 4, heat: 4 },

  ingredients: [
    { ingId: "ing_01", role: "Liquid",    name: "Water (or light shrimp stock)",                        ratioValue: 1000, defaultUnit: "ml",    substitutions: ["chicken stock (less seafood-forward)"] },
    { ingId: "ing_02", role: "Aromatic",  name: "Lemongrass stalks, bruised and cut into 3cm pieces",  ratioValue: 3,    defaultUnit: "stalks", substitutions: ["lemongrass paste 2 tbsp (weaker)"] },
    { ingId: "ing_03", role: "Aromatic",  name: "Galangal, fresh, sliced 3mm",                         ratioValue: 20,   defaultUnit: "g",      substitutions: ["frozen galangal"] },
    { ingId: "ing_04", role: "Herb",      name: "Kaffir lime leaves (makrut), torn",                   ratioValue: 6,    defaultUnit: "leaves", substitutions: ["lime zest strips (inferior)"] },
    { ingId: "ing_05", role: "Protein",   name: "Shrimp, head-on if possible (shells reserved for stock)", ratioValue: 300, defaultUnit: "g",  substitutions: ["prawns", "firm fish chunks"] },
    { ingId: "ing_06", role: "Umami",     name: "Fish sauce",                                          ratioValue: 40,   defaultUnit: "ml",     substitutions: ["soy sauce (less complex)"] },
    { ingId: "ing_07", role: "Acid",      name: "Lime juice, freshly squeezed",                        ratioValue: 50,   defaultUnit: "ml",     substitutions: [] },
    { ingId: "ing_08", role: "Spice",     name: "Fresh Thai bird chilies, lightly bruised",            ratioValue: 5,    defaultUnit: "whole",  substitutions: ["chili paste (roasted variety adds depth)"] },
    { ingId: "ing_09", role: "Umami",     name: "Nam prik pao (roasted chili paste)",                  ratioValue: 20,   defaultUnit: "g",      substitutions: ["omit for clearer tom yum nam sai"] },
    { ingId: "ing_10", role: "Protein",   name: "Oyster or straw mushrooms, torn",                     ratioValue: 100,  defaultUnit: "g",      substitutions: ["button mushrooms"] },
    { ingId: "ing_11", role: "Herb",      name: "Fresh cilantro leaves, for serving",                  ratioValue: 10,   defaultUnit: "g",      substitutions: [] },
    { ingId: "ing_12", role: "Sweetener", name: "Sugar (optional, to balance)",                        ratioValue: 5,    defaultUnit: "g",      substitutions: ["palm sugar"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Simmer",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_04"],
      outputState: "aromatic_stock",
      instructions: "Combine the water or shrimp stock with the bruised lemongrass, sliced galangal, and torn kaffir lime leaves in a medium saucepan. Bring to a full boil over high heat, then reduce to a vigorous simmer. Simmer uncovered for 10 minutes, pressing the aromatics down into the liquid with a spoon every few minutes. The liquid will reduce slightly and, more importantly, it will extract the volatile aromatic oils from the lemongrass, galangal, and kaffir lime. After 10 minutes, the broth should smell powerfully of the three aromatics — the lemon-citrus of lemongrass, the camphor-hot of galangal, and the distinct floral-citrus of kaffir lime. If your water is very soft, the flavors will be more pronounced; hard water slightly mutes the aromatics. Do not strain yet — the aromatics continue to flavor the broth through the next steps.",
      visualCue: {
        primaryTarget: "A pale gold broth with a vigorous surface simmer and visible aromatic pieces floating throughout.",
        spectrum: [
          { state: "Underdone", description: "Broth is still water-clear and the aromatics have not released their oils — it smells mostly of plain hot water.", action: "Continue simmering. The lemongrass must have time to release its oils into the liquid — 10 minutes is the minimum." },
          { state: "Perfect",   description: "Broth is a light golden color and the aroma hits you at arm's length from the pan — lemongrass, galangal, and kaffir lime, clear and vivid. The surface has a fine oily sheen from the released essential oils.", action: "Add the nam prik pao, chilies, and mushrooms." },
          { state: "Overdone",  description: "Broth has reduced by more than 25% and is concentrated to the point where the galangal's bitterness is coming forward and the lemongrass is harsh.", action: "Top up with water back to original volume. The aromatics are already well-extracted — do not continue reducing." },
        ],
      },
      feelCue: "Lean over the simmering pot and cup your hands to direct the steam toward your face — the galangal and lemongrass should open your sinuses and make your eyes water slightly. That sensory intensity is what you want in the finished bowl.",
    },
    {
      nodeId: "step_2",
      action: "Simmer",
      inputs: ["aromatic_stock", "ing_08", "ing_09", "ing_10"],
      outputState: "seasoned_stock",
      instructions: "Add the lightly bruised bird chilies and the nam prik pao (roasted chili paste) to the simmering aromatic stock. The nam prik pao is the differentiator between tom yum nam sai (clear, pale broth) and tom yum nam khon (cloudy, richer, darker broth) — this recipe uses it for depth and color. Stir until the paste dissolves into the broth — it will turn the stock a warm amber-orange. Add the torn mushrooms and simmer for 3 minutes until softened. Taste the broth now — before adding the shrimp, fish sauce, or lime — and check that the chili heat is at your desired level. At this stage you can add more bruised chilies. The mushrooms will add an umami depth that bridges the gap between the sharp aromatics and the seafood.",
      visualCue: {
        primaryTarget: "An amber-orange, slightly cloudy broth with mushrooms softened and chili pieces floating through it.",
        spectrum: [
          { state: "Underdone", description: "Nam prik pao has not fully dissolved and floats in dark clumps. Mushrooms are still raw and firm.", action: "Stir more vigorously and simmer for another 2 minutes." },
          { state: "Perfect",   description: "Broth is a uniform amber-orange, opaque with dissolved chili paste, fragrant with roasted chili and galangal. Mushrooms are soft and slightly translucent.", action: "Add the shrimp and season immediately." },
          { state: "Overdone",  description: "Broth has been simmering too long with the chili paste and has developed a sharp, almost burnt-chili bitterness.", action: "Add a splash of water and a pinch of sugar to moderate the bitterness." },
        ],
      },
      feelCue: "Stir the broth and hold your hand close to the steam — you should feel the prickle of chili volatiles in your nose and on the soft skin of your wrist. That sharpness in the air around the pot mirrors the heat you want at the back of the throat in the finished bowl.",
    },
    {
      nodeId: "step_3",
      action: "Poach",
      inputs: ["seasoned_stock", "ing_05", "ing_06", "ing_07", "ing_12"],
      outputState: "finished_tom_yum_broth",
      instructions: "Bring the broth to a full rolling boil. Add the shrimp and cook for exactly 2 to 3 minutes, watching closely — shrimp in a hot broth cook far faster than expected. Remove the pot from heat the moment the shrimp are pink and curled into a relaxed C. Off heat, add the fish sauce and lime juice — never boil these after adding. The lime especially must not be cooked further or its bright top note becomes flat and bitter. Add the optional sugar now if the broth needs rounding. Taste for balance: tom yum should be aggressively sour and hot with a deep salty backbone and mild sweetness at the very end. Correct if needed. Ladle into bowls, leaving the aromatic pieces in the bowl (they are decorative and continue to aroma, but are not eaten), and scatter cilantro over the surface.",
      visualCue: {
        primaryTarget: "Vivid pink-orange shrimp curled to a gentle C in an amber broth, with green cilantro leaves on the surface.",
        spectrum: [
          { state: "Underdone", description: "Shrimp are still translucent grey-blue and the bodies are straight, not curled. The broth tastes of aromatics without the seafood foundation.", action: "Return to a boil for 1 more minute. Shrimp finish very quickly." },
          { state: "Perfect",   description: "Shrimp are vivid pink, curled to a gentle C with just a hint of translucency at the very center. The broth is amber and aromatic, properly seasoned — sour, salty, hot, and faintly sweet.", action: "Serve immediately. Do not reheat." },
          { state: "Overdone",  description: "Shrimp are tightly curled into a full O, firm, and rubbery. The body has lost its glossy sheen and looks matte and dry.", action: "Serve at once despite the texture. Overcooked shrimp in a correctly seasoned broth are still pleasurable — the broth carries the dish." },
        ],
      },
      feelCue: "The finished bowl of tom yum should hit you with heat before you even taste it — the steam from the surface carries chili volatiles that sting the eyes and nose from 20 centimeters away. That sting is the dish keeping its promise.",
    },
  ],
};
