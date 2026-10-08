export default {
  repoId: "master_middle_eastern_baharat_spice_blend_001",
  parentRepoId: null,
  slug: "baharat-spice-blend",
  author: "ForkRecipe Kitchen",

  title: "Baharat Seven-Spice Blend",
  description: "The Levantine pantry cornerstone: seven spices — allspice, coriander, cumin, cinnamon, black pepper, nutmeg, and clove — toasted and ground together into a warm, complex powder that perfumes rice, lamb, chickpeas, and soups with the particular depth that is instantly recognizable as the Arab kitchen.",
  cuisine: "Middle Eastern",
  culture: "Levantine",
  category: "condiments",

  tags: ["vegan", "gluten-free", "middle-eastern", "levantine", "spice-blend", "seasoning"],
  difficulty: 1,
  activeTime: "15 min",
  totalTime: "20 min",
  ratioSystem: "weight",

  stars: 0, forks: 0, contributors: 1, license: "CC-BY-SA",
  createdAt: "2026-06-27", updatedAt: "2026-06-27",

  flavorRadar: { sweet: 2, salty: 0, sour: 0, bitter: 2, umami: 1, heat: 2 },

  ingredients: [
    { ingId: "ing_01", role: "Spice",    name: "Allspice berries (whole)",     ratioValue: 30, defaultUnit: "g", substitutions: ["ground allspice (use 2 tsp less)"] },
    { ingId: "ing_02", role: "Spice",    name: "Coriander seeds (whole)",      ratioValue: 20, defaultUnit: "g", substitutions: ["ground coriander"] },
    { ingId: "ing_03", role: "Spice",    name: "Cumin seeds (whole)",          ratioValue: 20, defaultUnit: "g", substitutions: ["ground cumin"] },
    { ingId: "ing_04", role: "Spice",    name: "Cinnamon stick (broken)",      ratioValue: 15, defaultUnit: "g", substitutions: ["ground cinnamon (1.5 tsp)"] },
    { ingId: "ing_05", role: "Spice",    name: "Black peppercorns (whole)",    ratioValue: 15, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_06", role: "Spice",    name: "Whole nutmeg (grated fresh)",  ratioValue: 5,  defaultUnit: "g", substitutions: ["pre-ground nutmeg"] },
    { ingId: "ing_07", role: "Spice",    name: "Cloves (whole)",               ratioValue: 5,  defaultUnit: "g", substitutions: ["ground cloves (use half)"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Toast",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_04", "ing_05", "ing_07"],
      outputState: "toasted_whole_spices",
      instructions: "Place allspice, coriander, cumin, broken cinnamon pieces, black peppercorns, and cloves in a dry skillet (do not add the nutmeg — it is too oily and will scorch). Toast over medium heat, stirring constantly, for 3–5 minutes. The spices are ready when they turn one shade darker, small wisps of smoke begin to rise, and the kitchen fills with a deep, warm aroma. Transfer immediately to a plate to cool — leaving them in the hot pan will over-cook them.",
      visualCue: {
        primaryTarget: "Spices are one shade darker than when they started. A thin curl of smoke rising from the pan. The aroma has shifted from raw and dusty to deep, warm, and volatile.",
        spectrum: [
          { state: "Underdone", description: "Spices look and smell the same as when raw — flat, dusty, not fragrant.", action: "Continue toasting over medium heat — the oils need to warm. Move them constantly." },
          { state: "Perfect",   description: "Allspice is deeply aromatic. Coriander crackles slightly. Cumin is nutty and golden. A whisper of smoke. Everything smells alive.", action: "Pour onto a cool plate immediately — do not leave in the pan." },
          { state: "Overdone",  description: "Spices are very dark, almost black. Acrid, harsh, smoky smell.", action: "Discard — there is no recovery from over-toasted spices. They will taste bitter and harsh in every dish." },
        ],
      },
      feelCue: "Pick up a toasted allspice berry and break it between your teeth — it should release a burst of warm, complex aroma: clove, pepper, and cinnamon all at once. If it tastes flat or raw, it needs more time. If it tastes harsh, it went too far.",
    },
    {
      nodeId: "step_2",
      action: "Blend",
      inputs: ["toasted_whole_spices", "ing_06"],
      outputState: "baharat_blend",
      instructions: "Allow the toasted spices to cool completely before grinding — hot spices release steam in the grinder and produce clumped, wet powder. Transfer to a spice grinder or powerful blender. Grate fresh nutmeg directly into the grinder. Grind in 10-second pulses until the blend is a uniform, fine powder — no visible whole spice pieces remaining. Pass through a fine sieve if any coarse pieces persist.",
      visualCue: {
        primaryTarget: "A uniform, fine, warm reddish-brown powder — the color of terra cotta — with no visible whole spice fragments. When pinched, it holds briefly then releases, like fine sand.",
        spectrum: [
          { state: "Underdone", description: "Coarse pieces of allspice or cinnamon still visible. Uneven texture.", action: "Return to grinder and pulse 5–10 more times. Sieve and re-grind any coarse material." },
          { state: "Perfect",   description: "Fine, uniform, reddish-brown powder. Flows like silk. Smells intensely of all seven spices in harmony — warm, complex, deep.", action: "Transfer to an airtight jar immediately." },
          { state: "Overdone",  description: "Ground so long the spices have heated again from the grinder friction and clumped into a paste.", action: "Spread on a plate to cool and dry, then break apart and sieve." },
        ],
      },
      feelCue: "Rub a pinch between your fingers — the powder should feel feather-light and slightly oily from the spice oils, coating your fingers in a warm, fragrant film. The smell should be so strong it is almost physical — a wave of warmth.",
    },
    {
      nodeId: "step_3",
      action: "Set",
      inputs: ["baharat_blend"],
      outputState: "finished_baharat",
      instructions: "Transfer immediately to a small airtight jar — glass is preferred over plastic, as the volatile oils will slowly absorb into plastic over time. Label with the date. Store in a cool, dark cupboard away from the stove. Use within 2 months for maximum potency; the blend fades quickly once ground. To use: add 1–2 teaspoons per 500 g of meat or 200 g of rice, stirred in during the cooking of the aromatics.",
      visualCue: {
        primaryTarget: "A sealed jar of warm reddish-brown powder that colors the glass orange at the sides. When the jar is briefly opened, a wave of warm spice aroma escapes.",
        spectrum: [
          { state: "Underdone", description: "Blend has not been stored promptly and is already losing aroma after 10 minutes open on the counter.", action: "Seal immediately. Exposure to air, light, and heat rapidly degrades volatile compounds." },
          { state: "Perfect",   description: "Well-sealed jar. The blend smells intense when opened — complex, warm, unmistakably Middle Eastern. The color is vivid.", action: "Store and use within 2 months." },
          { state: "Overdone",  description: "Blend is more than 3 months old — smells faint, flat, dusty.", action: "Toast a fresh batch — spice blends are not expensive to make and fresh is transformative compared to old." },
        ],
      },
      feelCue: "Open the jar after storing for one day and smell from 15 cm away — you should be able to smell the blend clearly without putting your nose to the jar. If you need to press your nose in to detect it, the spices were not toasted properly or the jar is not sealed tightly.",
    },
  ],
};
