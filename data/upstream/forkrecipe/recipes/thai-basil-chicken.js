export default {
  repoId: "master_thai_basil_chicken_001",
  parentRepoId: null,
  slug: "thai-basil-chicken",
  author: "ForkRecipe Kitchen",

  title: "Pad Krapow Gai (Thai Basil Chicken)",
  description: "The dish every Thai cook makes on a Tuesday — minced chicken with holy basil, chilies, and garlic in a searing-hot wok, finished in minutes, the basil leaves wilting into dark fragrant velvet that perfumes every grain of rice beneath them.",
  cuisine: "Thai",
  culture: "Central Thai",
  category: "proteins",

  tags: ["thai", "chicken", "basil", "stir-fry", "quick"],
  difficulty: 1,
  activeTime: "15 min",
  totalTime: "20 min",
  ratioSystem: "parts",

  stars: 4102,
  forks: 462,
  contributors: 48,
  license: "CC-BY-SA",
  createdAt: "2024-02-10",
  updatedAt: "2026-01-15",

  flavorRadar: { sweet: 1, salty: 3, sour: 0, bitter: 1, umami: 3, heat: 4 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Chicken thigh, minced or coarsely ground",                  ratioValue: 100, defaultUnit: "parts", substitutions: ["chicken breast (drier)", "pork", "firm tofu crumbled"] },
    { ingId: "ing_02", role: "Allium",    name: "Garlic cloves, minced",                                      ratioValue: 8,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Heat",      name: "Thai bird's eye chilies, sliced (adjust to tolerance)",      ratioValue: 5,   defaultUnit: "parts", substitutions: ["serrano chilies", "dried red chilies"] },
    { ingId: "ing_04", role: "Herb",      name: "Holy basil (krapow) leaves — NOT Thai basil",               ratioValue: 12,  defaultUnit: "parts", substitutions: ["Thai sweet basil (different flavor but workable)"] },
    { ingId: "ing_05", role: "Seasoning", name: "Oyster sauce",                                               ratioValue: 8,   defaultUnit: "parts", substitutions: ["vegetarian oyster sauce"] },
    { ingId: "ing_06", role: "Seasoning", name: "Fish sauce",                                                 ratioValue: 5,   defaultUnit: "parts", substitutions: ["soy sauce + pinch MSG"] },
    { ingId: "ing_07", role: "Seasoning", name: "Dark soy sauce",                                             ratioValue: 2,   defaultUnit: "parts", substitutions: ["light soy sauce (add more)"] },
    { ingId: "ing_08", role: "Fat",       name: "Neutral oil",                                                ratioValue: 8,   defaultUnit: "parts", substitutions: ["lard for restaurant depth"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Mix sauce",
      inputs: ["ing_05", "ing_06", "ing_07"],
      outputState: "krapow_sauce",
      instructions: "Combine oyster sauce, fish sauce, and dark soy sauce in a small bowl. Stir to blend. Taste — it should be powerfully salty and savory. This sauce goes in fast at high heat, so having it ready before you start is essential. Never season a stir-fry by shaking bottles over a hot wok.",
      visualCue: {
        primaryTarget: "Uniformly dark brown sauce, fully combined with no separation.",
        spectrum: [
          { state: "Underdone", description: "Fish sauce and oyster sauce not yet blended — you can see two distinct layers.", action: "Stir vigorously for 10 seconds." },
          { state: "Perfect",   description: "Smooth, uniform dark sauce. Smells of fish sauce and sweet oyster sauce.", action: "Set next to the stove within arm's reach." },
          { state: "Overdone",  description: "Not applicable — this is a cold mix.", action: "N/A" },
        ],
      },
      feelCue: "The sauce should be thick enough to coat a chopstick — not runny like soy sauce, not thick like molasses.",
    },
    {
      nodeId: "step_2",
      action: "Fry aromatics",
      inputs: ["ing_02", "ing_03", "ing_08"],
      outputState: "fried_aromatics",
      instructions: "Heat oil in a wok over high heat until smoking. Add garlic and bird's eye chilies together. Fry for 30-45 seconds, stirring constantly — the garlic will begin to golden at the edges and the chilies will turn the oil bright orange-red. Do not let the garlic burn or the dish will be bitter.",
      visualCue: {
        primaryTarget: "Garlic is pale gold at the edges with white centers; chilies have bloomed the oil to an orange-red. Fragrance fills the kitchen.",
        spectrum: [
          { state: "Underdone", description: "Garlic is raw white, chilies still bright red — no color, no fragrance released.", action: "Increase heat and continue; stir constantly." },
          { state: "Perfect",   description: "Garlic edges are pale gold, centers still white. Oil is vivid orange-red from the chilies. Sharp, toasty aroma with chili heat visible as steam.", action: "Add chicken immediately." },
          { state: "Overdone",  description: "Garlic is dark brown or black, smells harsh and bitter.", action: "Discard and start over — burnt garlic cannot be saved and will ruin the dish." },
        ],
      },
      feelCue: "The chili heat should hit the back of your throat even before the chicken goes in — if you are not tearing up slightly, either the chilies are mild or the wok is not hot enough.",
    },
    {
      nodeId: "step_3",
      action: "Stir-fry",
      inputs: ["ing_01", "fried_aromatics", "krapow_sauce"],
      outputState: "cooked_chicken",
      instructions: "Add minced chicken and break it apart with a spatula immediately. Stir-fry on high heat for 2-3 minutes, pressing the chicken flat against the wok to get color rather than steam. When no pink remains, pour the sauce around the edge of the wok (not over the chicken) — it will sizzle and char slightly before mixing in. Toss to coat.",
      visualCue: {
        primaryTarget: "Chicken is broken into varied, irregular pieces — some caramelized and darker, most pale golden. Uniformly coated in the dark sauce.",
        spectrum: [
          { state: "Underdone", description: "Pink patches still visible in the chicken; sauce hasn't fully coated — looks pale and watery.", action: "Continue on high heat for another 60-90 seconds, spreading the chicken flat." },
          { state: "Perfect",   description: "No pink remains; some pieces have charred edges. Sauce clings to every piece in a glossy coat. Kitchen is filled with smoke and fragrant steam.", action: "Add holy basil." },
          { state: "Overdone",  description: "Chicken has dried out and shrunk significantly; the sauce is beginning to burn on the wok.", action: "Add a splash of water (1-2 tbsp) immediately and toss to deglaze." },
        ],
      },
      feelCue: "Listen for the wok's roar — constant, aggressive crackling means you are stir-frying. Any drop to a gentle sizzle means the temperature has fallen and you are steaming.",
    },
    {
      nodeId: "step_4",
      action: "Finish with basil",
      inputs: ["cooked_chicken", "ing_04"],
      outputState: "finished_pad_krapow",
      instructions: "Remove wok from heat (or reduce to minimum). Add holy basil leaves all at once and toss vigorously for 10-15 seconds. The leaves will wilt almost instantly from the residual heat. Do not overcook them — they should be wilted and dark green, not brown and mushy. Plate immediately over jasmine rice with a fried egg on top.",
      visualCue: {
        primaryTarget: "Basil leaves are wilted to dark, glossy green — not brown. They cling to the chicken pieces and the dish smells intensely of holy basil and caramelized fish sauce.",
        spectrum: [
          { state: "Underdone", description: "Basil leaves are still bright green, upright, and raw — they haven't released their essential oils into the dish.", action: "Return to low heat for another 10-15 seconds, tossing constantly." },
          { state: "Perfect",   description: "Leaves wilted and darkened to a deep glossy green, completely integrated with the chicken. The aroma of holy basil — slightly clove-like, peppery — dominates the dish.", action: "Plate immediately." },
          { state: "Overdone",  description: "Basil is olive-brown and mushy; the aromatic oils have completely cooked off and it smells flat.", action: "The dish is still good — you just lost the herbal brightness. Serve immediately." },
        ],
      },
      feelCue: "The basil should wilt with just a toss or two in the residual heat of the wok — if it needs more than 15 seconds, the wok was not hot enough to begin with.",
    },
  ],
};
