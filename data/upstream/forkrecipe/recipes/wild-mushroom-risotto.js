export default {
  repoId: "master_italian_wild_mushroom_risotto_001",
  parentRepoId: null,
  slug: "wild-mushroom-risotto",
  author: "ForkRecipe Kitchen",

  title: "Wild Mushroom Risotto",
  description: "Carnaroli rice coaxed ladle by ladle into a mantecatura of Parmigiano and butter, laced throughout with porcini and the dark, resinous perfume of forest fungi — a dish that rewards patience with an almost liquid, wave-like consistency.",
  cuisine: "Italian",
  culture: "Northern Italian",
  category: "grains",

  tags: ["italian", "risotto", "mushroom", "parmesan", "vegetarian"],
  difficulty: 3,
  activeTime: "40 min",
  totalTime: "55 min",
  ratioSystem: "parts",

  stars: 2751,
  forks: 318,
  contributors: 42,
  license: "CC-BY-SA",
  createdAt: "2024-02-15",
  updatedAt: "2026-01-08",

  flavorRadar: { sweet: 0, salty: 3, sour: 0, bitter: 1, umami: 5, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Starch",     name: "Carnaroli or Arborio rice",                              ratioValue: 100, defaultUnit: "parts", substitutions: ["Vialone Nano"] },
    { ingId: "ing_02", role: "Umami",      name: "Mixed wild mushrooms (porcini, chanterelle, cremini), sliced", ratioValue: 80, defaultUnit: "parts", substitutions: ["dried porcini rehydrated", "shiitake"] },
    { ingId: "ing_03", role: "Liquid",     name: "Warm vegetable or light chicken stock",                  ratioValue: 400, defaultUnit: "parts", substitutions: ["mushroom soaking liquid + stock"] },
    { ingId: "ing_04", role: "Allium",     name: "Shallots, finely diced",                                 ratioValue: 20,  defaultUnit: "parts", substitutions: ["white onion"] },
    { ingId: "ing_05", role: "Fat",        name: "Unsalted butter, cold, cubed",                           ratioValue: 20,  defaultUnit: "parts", substitutions: ["high-quality olive oil for vegan"] },
    { ingId: "ing_06", role: "Dairy",      name: "Parmigiano-Reggiano, finely grated",                     ratioValue: 25,  defaultUnit: "parts", substitutions: ["Grana Padano", "Pecorino Romano"] },
    { ingId: "ing_07", role: "Solvent",    name: "Dry white wine",                                         ratioValue: 30,  defaultUnit: "parts", substitutions: ["dry vermouth", "extra stock"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Sear",
      inputs: ["ing_02", "ing_05"],
      outputState: "seared_mushrooms",
      instructions: "In a wide pan over high heat, melt a small knob of butter until foaming subsides. Add mushrooms in a single layer and cook without moving for 2–3 minutes until deeply browned. Season with salt, toss once, and cook 1 minute more. Remove and set aside. The mushrooms must be seared separately to drive off moisture and develop flavour — adding them directly to the risotto results in grey, steamed fungi.",
      visualCue: {
        primaryTarget: "Mushrooms carry a deep mahogany crust on their flat faces, have reduced by about a third, and smell intensely of roasted forest floor.",
        spectrum: [
          { state: "Underdone", description: "Mushrooms are pale and wet, liquid pooling in the pan. They look steamed rather than seared.", action: "Increase heat and stop stirring. Moisture must evaporate before browning can occur." },
          { state: "Perfect",   description: "Deep brown on cut surfaces, shrunken and firm. Rich, nutty, earthy aroma fills the kitchen.", action: "Season, remove from heat, and set aside." },
          { state: "Overdone",  description: "Mushrooms are very dark and beginning to crisp at the edges. Smell is nearly burnt.", action: "Remove immediately. They will still flavour the risotto but add a slightly bitter note." },
        ],
      },
      feelCue: "Cooked mushrooms should feel firm and meaty under a spoon — nothing like the slippery, soft texture they started with. Pressing one should yield a dense, almost leather-like resistance.",
    },
    {
      nodeId: "step_2",
      action: "Toast",
      inputs: ["ing_01", "ing_04", "ing_05"],
      outputState: "toasted_rice",
      instructions: "In a heavy-bottomed wide pot over medium heat, melt half the butter and soften the shallots for 3–4 minutes until translucent. Add the dry rice and stir constantly for 2 minutes until every grain is coated in fat and the grains turn from chalky white to slightly translucent at the edges. You should hear a gentle clicking sound as the grains catch the bottom. This tostatura is essential — it seals the starch so the rice absorbs liquid gradually rather than all at once.",
      visualCue: {
        primaryTarget: "Rice grains are shiny with fat and slightly translucent at their edges. A faint nutty aroma rises and the grains click against the pan when stirred.",
        spectrum: [
          { state: "Underdone", description: "Grains are still uniformly chalky white. The raw starch smell persists.", action: "Continue toasting, stirring constantly. Under-toasted rice absorbs liquid too quickly and turns mushy." },
          { state: "Perfect",   description: "Grains glisten, edges have gone translucent, and a faint toasty aroma is present. A grain squeezed between fingers still feels hard at its core.", action: "Add the white wine." },
          { state: "Overdone",  description: "Grains are turning golden-brown and some are beginning to pop. The shallots are catching.", action: "Add the wine immediately to stop the heat. The rice will still be usable but will take slightly less liquid." },
        ],
      },
      feelCue: "The dry rice should click audibly against the metal pot as you stir — a subtle, pebbly rhythm that signals the grains are toasted and ready to drink wine.",
    },
    {
      nodeId: "step_3",
      action: "Deglaze and build",
      inputs: ["toasted_rice", "ing_07", "ing_03"],
      outputState: "built_risotto",
      instructions: "Pour the white wine into the toasted rice and stir vigorously. Cook until fully absorbed, about 2 minutes. Then add warm stock one ladle at a time (roughly 100ml), stirring constantly and waiting for each addition to be almost fully absorbed before adding the next. Keep the stock hot in a separate saucepan throughout. This process takes 18–20 minutes total — do not rush it with large additions of cold stock.",
      visualCue: {
        primaryTarget: "After each ladle, the liquid reduces to leave the rice creamy and barely fluid, the starch forming a milky slick between the grains.",
        spectrum: [
          { state: "Underdone", description: "After 18 minutes, rice is still very firm and chalky at the centre when bitten. Starch suspension looks watery.", action: "Continue adding stock and stirring. The rice will tell you when it is ready — tasting is the only reliable test." },
          { state: "Perfect",   description: "Rice is al dente — yielding at the outside with a tiny, pleasant resistance at the very centre. The mixture flows and spreads slowly when the pot is shaken, like lava. Starch is thick and creamy between grains.", action: "Remove from heat and mantecate immediately." },
          { state: "Overdone",  description: "Rice has no texture — each grain is soft all the way through and is beginning to break apart. The starch is glue-like and heavy.", action: "Remove from heat now. Add a small ladle of hot stock to loosen. Proceed to mantecatura — the butter will improve the texture." },
        ],
      },
      feelCue: "Tasting at the 18-minute mark: the grain should offer a tiny, toothsome pop of resistance at the very centre — not raw hardness, not soft uniformity, but a distinct, pleasant nub of starch.",
    },
    {
      nodeId: "step_4",
      action: "Mount",
      inputs: ["built_risotto", "seared_mushrooms", "ing_05", "ing_06"],
      outputState: "finished_risotto",
      instructions: "Remove the pot from the heat entirely. Add the seared mushrooms, then vigorously stir in the cold cubed butter and the grated Parmigiano all at once, using a wooden spoon or silicone spatula in a rapid figure-eight motion for 1–2 minutes. This mantecatura is what creates the signature wave-like, all'onda consistency. The cold butter emulsifies with the starchy cooking liquid into a glossy, rich sauce. Serve immediately on warm (not hot) plates.",
      visualCue: {
        primaryTarget: "The risotto moves as a single, glossy wave when the pot is shaken. It spreads slowly across a warm plate to form a thin, creamy disc rather than sitting in a mound.",
        spectrum: [
          { state: "Underdone", description: "Risotto sits in a tight mound on the plate and does not spread. The butter has not fully emulsified and pools separately.", action: "Stir more vigorously and add a tiny splash of warm stock — the emulsion needs both energy and water to form." },
          { state: "Perfect",   description: "A gentle shake of the plate sends the risotto rippling outward in a slow, glossy wave. The surface is shiny and uniform. It settles to about 1.5cm deep.", action: "Serve within two minutes before the starch sets." },
          { state: "Overdone",  description: "Risotto has cooled too long and is now thick and gluey, setting into a mass as it cools. The starch has gelled.", action: "Add a small ladle of hot stock and stir over low heat briefly. Serve immediately — risotto waits for no one." },
        ],
      },
      feelCue: "The finished risotto should have the fluidity of loose porridge and a glossiness like polished stone — when a spoonful is lifted and dropped, it should fall in slow, reluctant curtains, not land with a thud.",
    },
  ],
};
