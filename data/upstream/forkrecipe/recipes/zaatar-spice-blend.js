export default {
  repoId: "master_levantine_zaatar_001",
  parentRepoId: null,
  slug: "zaatar-spice-blend",
  author: "ForkRecipe Kitchen",

  title: "Za'atar Spice Blend",
  description: "Dried wild thyme, toasted sesame, tart sumac, and salt pounded into the Lebanese pantry's most essential blend — stirred into olive oil for bread dipping, scattered over labneh, or rubbed onto chicken before it hits the grill.",
  cuisine: "Middle Eastern",
  culture: "Levantine",
  category: "condiments",

  tags: ["zaatar", "middle eastern", "spice blend", "levantine", "condiment", "thyme", "sumac"],
  difficulty: 1,
  activeTime: "15 min",
  totalTime: "20 min",
  ratioSystem: "parts",

  stars: 1610,
  forks: 138,
  contributors: 40,
  license: "CC-BY-SA",
  createdAt: "2024-10-30",
  updatedAt: "2025-05-25",

  flavorRadar: { sweet: 0, salty: 3, sour: 3, bitter: 2, umami: 1, heat: 1 },

  ingredients: [
    { ingId: "ing_01", role: "Herb",      name: "Dried wild thyme (or dried thyme)",      ratioValue: 100, defaultUnit: "parts", substitutions: ["dried oregano", "dried marjoram", "a mix of all three"] },
    { ingId: "ing_02", role: "Spice",     name: "Ground sumac (dried, tart red berries)",  ratioValue: 50,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Aromatic",  name: "White sesame seeds (toasted)",            ratioValue: 40,  defaultUnit: "parts", substitutions: ["black sesame seeds"] },
    { ingId: "ing_04", role: "Seasoning", name: "Salt (flaky)",                            ratioValue: 10,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Spice",     name: "Ground cumin (optional)",                 ratioValue: 8,   defaultUnit: "parts", substitutions: ["ground coriander"] },
    { ingId: "ing_06", role: "Spice",     name: "Dried red chili flakes (optional)",       ratioValue: 5,   defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Toast",
      inputs: ["ing_03"],
      outputState: "toasted_sesame",
      instructions: "Place sesame seeds in a dry skillet over medium heat. Toast, stirring constantly, for 3–4 minutes until the seeds turn golden and begin to jump and pop in the pan. Remove immediately from the heat and transfer to a plate to cool — they will continue to cook on the hot pan. This is the only ingredient that requires toasting; the sumac and dried thyme should not be heated, as warmth drives off the volatile aromatic oils that make za'atar fragrant.",
      visualCue: {
        primaryTarget: "Seeds are uniformly golden — not dark brown, not white. A light pop-and-jump activity in the pan is audible.",
        spectrum: [
          { state: "Underdone", description: "Seeds are still white. No popping, no aroma change. Pan may not be hot enough.", action: "Continue on medium heat. The seeds take 2–3 minutes before any visible change — then it happens quickly." },
          { state: "Perfect",   description: "Uniformly golden, fragrant, with a few darker specks. A warm, nutty sesame aroma fills the kitchen. Seeds are jumping occasionally.", action: "Immediately off the heat and onto a cool plate." },
          { state: "Overdone",  description: "Seeds are dark brown to tan throughout. Smell is beginning to turn from nutty to bitter.", action: "Discard and re-toast. Dark sesame has a bitter note that will unbalance the entire za'atar blend." },
        ],
      },
      feelCue: "Press a toasted sesame seed between your fingers — it should feel dry and crisp, crumbling slightly with pressure and releasing an immediate warm, nutty aroma.",
    },
    {
      nodeId: "step_2",
      action: "Mix",
      inputs: ["toasted_sesame", "ing_01", "ing_02", "ing_04", "ing_05", "ing_06"],
      outputState: "blended_zaatar",
      instructions: "Combine the dried thyme, sumac, cooled toasted sesame, salt, and optional cumin and chili flakes in a bowl. If the dried thyme is on the stem, strip the leaves first and discard the woody stems. Mix thoroughly with a fork or spoon. The blend should look evenly red-green from the sumac and thyme, with white sesame seeds distributed throughout. No grinding or processing is needed — za'atar is meant to be a loose, textured blend, not a powder.",
      visualCue: {
        primaryTarget: "A loose, evenly mixed blend of green thyme, red-purple sumac, and white sesame with visible texture. Not powder — it should look almost like a rough herbed salt.",
        spectrum: [
          { state: "Underdone", description: "Thyme and sumac are sitting in separate clumps; the sesame is pooled at the bottom. Not mixed.", action: "Toss and fold more thoroughly. Za'atar is simply a mixing step — it just needs time and attention." },
          { state: "Perfect",   description: "Evenly distributed throughout. Green, red, and white are all visible in every spoonful. Aroma is herbal, tart, and nutty simultaneously.", action: "Taste, adjust salt, and store." },
          { state: "Overdone",  description: "Over-mixed with a spoon so vigorously that the thyme has broken to a fine powder and the sumac has clumped with moisture from the sesame.", action: "Spread on a plate to dry for 30 minutes, then combine again gently." },
        ],
      },
      feelCue: "Rub a pinch between your palms and bring them to your nose — the combined aroma should be wildly layered: tart sumac, herbal thyme, warm sesame, all at once, like a hillside in Lebanon after rain.",
    },
    {
      nodeId: "step_3",
      action: "Season",
      inputs: ["blended_zaatar"],
      outputState: "finished_zaatar_blend",
      instructions: "Taste the za'atar dry, then mixed into a small pool of olive oil. Adjust: more sumac if you want more tartness (it is the most important flavor driver in a good za'atar), more salt if flat, more sesame for nuttiness. The blend should be balanced: earthy and herbal from the thyme, sour from the sumac, nutty from the sesame, and savory from the salt. Store in a sealed glass jar in a cool, dark place for up to 6 months. The sumac will slowly fade in color and tartness over time — use the freshest sumac you can find.",
      visualCue: {
        primaryTarget: "A bright, vivid blend. The sumac holds a deep burgundy-red color; the thyme is a rich, dry green; the sesame is warm gold. No clumping, no grey coloration.",
        spectrum: [
          { state: "Underdone", description: "Za'atar tastes flat and primarily of thyme — the sumac note is absent or muted, suggesting old or poor-quality sumac.", action: "Add more sumac. The tartness of sumac is what distinguishes za'atar from simple dried thyme." },
          { state: "Perfect",   description: "Balanced: earthy-herbal first, then a clean sour note from the sumac, finishing with warm sesame and salt. Color is vivid and fresh-looking.", action: "Store in a sealed jar." },
          { state: "Overdone",  description: "Too much sumac dominates — the blend is aggressively tart and the thyme and sesame notes are buried.", action: "Add more dried thyme and sesame seeds to dilute the sumac and rebalance." },
        ],
      },
      feelCue: "Pour a small pool of good olive oil and dip a piece of fresh bread through the za'atar before dipping into the oil — the blend should coat the bread in a thin, fragrant layer that makes the bread taste alive.",
    },
  ],
};
