export default {
  repoId: "master_italian_farrotto_001",
  parentRepoId: null,
  slug: "farrotto",
  author: "ForkRecipe Kitchen",

  title: "Farrotto al Parmigiano",
  description: "Farro risotto — pearled farro cooked risotto-style, ladleful by ladleful, until it reaches a creamy, gloriously al dente texture with more chew and nuttiness than Arborio could ever offer, finished with the classic mantecatura of cold butter and parmesan.",
  cuisine: "Italian",
  culture: "Northern Italian",
  category: "grains",

  tags: ["vegetarian", "italian", "farro", "risotto-style", "parmesan"],
  difficulty: 2,
  activeTime: "35 min",
  totalTime: "50 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 0, salty: 3, sour: 1, bitter: 0, umami: 3, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Pearled farro (farro perlato)",               ratioValue: 300, defaultUnit: "g",   substitutions: ["semi-pearled farro (add 10 min to cooking)", "spelt berries (add 15 min)"] },
    { ingId: "ing_02", role: "Allium",     name: "White onion (finely diced)",                  ratioValue: 120, defaultUnit: "g",   substitutions: ["shallots (2 large)"] },
    { ingId: "ing_03", role: "Allium",     name: "Garlic cloves (minced)",                      ratioValue: 2,   defaultUnit: "cloves", substitutions: [] },
    { ingId: "ing_04", role: "Solvent",    name: "Dry white wine",                              ratioValue: 120, defaultUnit: "ml",  substitutions: ["dry vermouth", "extra stock + 1 tsp white wine vinegar"] },
    { ingId: "ing_05", role: "Liquid",     name: "Warm vegetable or chicken stock",             ratioValue: 1200, defaultUnit: "ml", substitutions: ["water in an emergency — season well"] },
    { ingId: "ing_06", role: "Fat",        name: "Unsalted butter (cold, cubed, divided)",      ratioValue: 80,  defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_07", role: "Dairy",      name: "Parmesan (finely grated on a microplane)",   ratioValue: 80,  defaultUnit: "g",   substitutions: ["Grana Padano", "Pecorino Romano (saltier — adjust seasoning)"] },
    { ingId: "ing_08", role: "Herb",       name: "Fresh thyme sprigs",                          ratioValue: 4,   defaultUnit: "sprigs", substitutions: ["dried thyme (1 tsp)"] },
    { ingId: "ing_09", role: "Fat",        name: "Extra-virgin olive oil",                      ratioValue: 30,  defaultUnit: "ml",  substitutions: [] },
    { ingId: "ing_10", role: "Seasoning",  name: "Fine salt",                                   ratioValue: 6,   defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_11", role: "Seasoning",  name: "Black pepper (freshly ground)",               ratioValue: 2,   defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_12", role: "Citrus",     name: "Lemon zest",                                  ratioValue: 1,   defaultUnit: "tsp", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Sauté",
      inputs: ["ing_09", "ing_06", "ing_02", "ing_03", "ing_08"],
      outputState: "soffritto",
      instructions: "In a wide, heavy-bottomed saucepan or braiser, warm the olive oil and 20 g of the butter together over medium-low heat. Add the onion, garlic, and thyme sprigs with a pinch of salt. Cook gently, stirring often, for 8-10 minutes until the onion is completely soft, translucent, and yielding — it should have absolutely no color. This is the soffritto; it provides the sweet, aromatic backbone of the farrotto and must be cooked low and slow so the natural sugars develop without caramelizing.",
      visualCue: {
        primaryTarget: "Onion is translucent, very soft, glistening in butter and oil, and completely colorless. Garlic is soft and fragrant. Thyme is wilted.",
        spectrum: [
          { state: "Underdone", description: "Onion is still opaque and has a slight crunch. Raw garlic smell.", action: "Lower the heat and continue cooking. A soffritto cooked too fast produces a harsh, sharp flavor rather than the gentle sweetness needed here." },
          { state: "Perfect",   description: "Onion is completely translucent, soft, and yielding to the spoon with no resistance. No browning anywhere. Smells sweet and gentle.", action: "Add the farro and toast immediately." },
          { state: "Overdone",  description: "The onion edges are beginning to turn golden. The butter smells slightly nutty.", action: "Reduce heat immediately. Light golden tint is acceptable but the dish will be slightly less delicate — proceed." },
        ],
      },
      feelCue: "The soffritto should feel almost melting when you press a piece of onion against the side of the pot with your spoon — completely without resistance, like pressing warm butter.",
    },
    {
      nodeId: "step_2",
      action: "Toast",
      inputs: ["ing_01", "soffritto"],
      outputState: "toasted_farro",
      instructions: "Add the pearled farro to the soffritto and stir to coat every grain in the butter and oil mixture. Raise the heat to medium. Toast the farro, stirring constantly, for 2 minutes until the grains look slightly shiny and smell of warm, nutty grain — like a mild popcorn aroma. This coating step is not strictly necessary for farro as it is for Arborio (which would absorb too much fat), but it perfumes the grain and adds a subtle depth to the finished dish.",
      visualCue: {
        primaryTarget: "Farro grains look slightly shiny and translucent at the edges. The pot smells of warm, toasted grain and butter.",
        spectrum: [
          { state: "Underdone", description: "Farro looks chalky and matte with no sheen. No toasted aroma.", action: "Continue toasting for another minute, stirring constantly over medium heat." },
          { state: "Perfect",   description: "Grains glisten with fat, slightly translucent at the edges, and smell gently of toasted grain without any color change.", action: "Add the white wine immediately." },
          { state: "Overdone",  description: "Farro has begun to turn golden and smells noticeably nutty.", action: "Add the wine at once to arrest the toasting. The extra nuttiness is pleasant but do not take it further." },
        ],
      },
      feelCue: "Stir the toasted farro and listen — it should make a dry, slightly glassy sound as the fat-coated grains whisper against each other, not the wet clump of raw grain.",
    },
    {
      nodeId: "step_3",
      action: "Deglaze",
      inputs: ["toasted_farro", "ing_04"],
      outputState: "wine_absorbed_farro",
      instructions: "Pour the white wine into the hot pot all at once — it will hiss and steam dramatically. Stir constantly until the wine is almost entirely absorbed, about 2-3 minutes. This step does three things: it deglazes any savory bits from the bottom of the pot, adds acidity that will balance the richness of butter and parmesan at the end, and begins the process of coaxing starch from the farro to build the creamy sauce. The smell of raw alcohol should cook off completely before you add the first ladleful of stock.",
      visualCue: {
        primaryTarget: "The wine has been absorbed and the pot smells of wine fragrance without raw alcohol. The farro looks slightly glossy and the pot bottom is clean.",
        spectrum: [
          { state: "Underdone", description: "The wine is still visibly pooled and you can smell raw alcohol sharply.", action: "Continue stirring over medium heat until the wine is fully absorbed and the raw alcohol smell is gone." },
          { state: "Perfect",   description: "Wine is absorbed, pot bottom is clear. Farro looks glossy. The smell is of white wine reduction — fruity and acidic without sharpness.", action: "Begin adding stock one ladle at a time." },
          { state: "Overdone",  description: "The wine has reduced so much that the farro is starting to stick and sizzle at the bottom.", action: "Add the first ladle of stock immediately and scrape the bottom clean." },
        ],
      },
      feelCue: "When you drag a spoon through the farro after the wine has absorbed, a brief, clean channel should appear before the mixture slowly flows back — this is the first sign of the starch beginning to release.",
    },
    {
      nodeId: "step_4",
      action: "Simmer",
      inputs: ["wine_absorbed_farro", "ing_05", "ing_10"],
      outputState: "cooked_farrotto",
      instructions: "Keep the stock warm in a separate saucepan — cold stock would arrest the cooking and cool the farro unevenly. Add the stock one ladle (about 100-120 ml) at a time, stirring almost constantly and waiting until each addition is nearly absorbed before adding the next. Maintain a steady, active simmer throughout — never a rolling boil, never a static pool. After 25-30 minutes the farro should be al dente: tender on the outside with a slight, satisfying chew at the center. Season with salt partway through. The risotto base will look quite loose and soupy when done — this is correct; the mantecatura will tighten it.",
      visualCue: {
        primaryTarget: "Farro grains are al dente — tender exterior with a faint chew at the center. The base is creamy and flows slowly when the pot is tipped, like a very loose porridge.",
        spectrum: [
          { state: "Underdone", description: "Grains are still quite firm throughout with a starchy, chalky center.", action: "Continue adding stock ladle by ladle and cooking. Farro is more forgiving than Arborio — it will not turn to mush quickly." },
          { state: "Perfect",   description: "Grains are tender with a distinct but pleasant chew. The base is creamy from released starch and flows when the pot is shaken. Smells nutty and savory.", action: "Remove from heat immediately and proceed to mantecatura." },
          { state: "Overdone",  description: "Grains are fully soft with no textural distinction. The base is very thick, almost pasty.", action: "Proceed to mantecatura immediately, being gentle. Add a splash more stock if the base is too thick to flow." },
        ],
      },
      feelCue: "Taste a grain of farro when you think it is ready — the outside should yield like a cooked pasta grain while the very center offers a gentle resistance, that satisfying al dente bite.",
    },
    {
      nodeId: "step_5",
      action: "Mount",
      inputs: ["cooked_farrotto", "ing_06", "ing_07", "ing_11", "ing_12"],
      outputState: "finished_farrotto",
      instructions: "Remove the pot from heat completely. This is the mantecatura — the Italian method of emulsifying fat into a risotto off-heat to create a creamy, unified sauce. Add the remaining cold butter cubes (60 g) and all the parmesan at once. Shake the pot vigorously in an elliptical motion while simultaneously stirring with a spoon — the goal is to emulsify the cold butter and cheese into the hot, starchy base without breaking the emulsion. Add the lemon zest and black pepper. Let the farrotto rest, uncovered, for exactly 2 minutes. It should look glossy, creamy, and fluid — not stiff. Serve in warmed bowls immediately.",
      visualCue: {
        primaryTarget: "Glossy, flowing, creamy farrotto that moves lazily when the pot is tilted — the all'onda (wave) test. Not stiff, not soupy: it ripples.",
        spectrum: [
          { state: "Underdone", description: "The butter and cheese are not fully incorporated — you can see pools of melted butter separating from the grain base.", action: "Continue stirring and shaking vigorously. The emulsion needs agitation to form — lazy stirring will break it." },
          { state: "Perfect",   description: "The farrotto is glossy and unified, flowing with a single slow wave when the pot is tilted. Cheese and butter are invisible — absorbed into a creamy sauce that coats every grain.", action: "Rest 2 minutes and serve in warmed bowls immediately." },
          { state: "Overdone",  description: "The farrotto is stiff and clumping — it has been stirred too long or the heat was left on during mantecatura.", action: "Add a small ladleful of warm stock and stir vigorously to loosen. Serve immediately." },
        ],
      },
      feelCue: "The mantecatura is complete when the farrotto coats the back of a spoon in a thin, creamy, uniform film — drag your finger through it and the line should hold cleanly for 3 seconds before slowly closing.",
    },
  ],
};
