export default {
  repoId: "master_chinese_ma_po_tofu_001",
  parentRepoId: null,
  slug: "ma-po-tofu",
  author: "ForkRecipe Kitchen",

  title: "Ma Po Tofu",
  description: "Silken tofu trembling in a Sichuan doubanjiang sauce with ground pork and a numbing, tingly cloud of freshly ground Sichuan peppercorn — one of the world's great flavor experiences, a dish where the 'ma' (numbing) and 'la' (spicy) arrive as two separate sensations.",
  cuisine: "Chinese",
  culture: "Sichuan",
  category: "proteins",

  tags: ["sichuan", "chinese", "tofu", "doubanjiang", "pork", "spicy", "numbing", "ma-la"],
  difficulty: 2,
  activeTime: "25 min",
  totalTime: "35 min",
  ratioSystem: "weight",

  stars: 0, forks: 0, contributors: 1, license: "CC-BY-SA",
  createdAt: "2026-06-27", updatedAt: "2026-06-27",

  flavorRadar: { sweet: 0, salty: 4, sour: 0, bitter: 1, umami: 5, heat: 5 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Silken or soft tofu, cut into 2 cm cubes", ratioValue: 500, defaultUnit: "g", substitutions: ["medium-firm tofu"] },
    { ingId: "ing_02", role: "Protein",   name: "Ground pork (20% fat)",               ratioValue: 150, defaultUnit: "g", substitutions: ["ground beef", "omit for vegan"] },
    { ingId: "ing_03", role: "Umami",     name: "Doubanjiang (Pixian chili bean paste)", ratioValue: 50,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_04", role: "Umami",     name: "Fermented black beans (douchi), minced", ratioValue: 20, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_05", role: "Allium",    name: "Garlic cloves, minced",               ratioValue: 15,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_06", role: "Aromatic",  name: "Fresh ginger, minced",                ratioValue: 10,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_07", role: "Liquid",    name: "Chicken or pork stock",               ratioValue: 300, defaultUnit: "g", substitutions: ["water with a dashi cube"] },
    { ingId: "ing_08", role: "Liquid",    name: "Soy sauce",                           ratioValue: 15,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_09", role: "Spice",     name: "Sichuan peppercorns, toasted and ground", ratioValue: 4, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_10", role: "Spice",     name: "Dried red chili flakes (er jing tiao or facing heaven chili)", ratioValue: 6, defaultUnit: "g", substitutions: ["Korean gochugaru"] },
    { ingId: "ing_11", role: "Binder",    name: "Cornstarch mixed with 60 g cold water (slurry)", ratioValue: 20, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_12", role: "Fat",       name: "Neutral oil",                         ratioValue: 40,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_13", role: "Allium",    name: "Green onions (scallions), sliced",    ratioValue: 30,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_14", role: "Seasoning", name: "Fine sea salt",                       ratioValue: 5,   defaultUnit: "g", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Blanch",
      inputs: ["ing_01", "ing_14"],
      outputState: "blanched_tofu",
      instructions: "Bring a pot of lightly salted water to a boil. Gently slide the tofu cubes in and blanch for 2 minutes. This firms the tofu slightly and removes any beany raw flavor. Drain carefully — the cubes are fragile. Leave to drain on a clean kitchen towel.",
      visualCue: {
        primaryTarget: "Tofu cubes hold their shape, appear white and clean. No cloudiness in the blanching water (which would indicate the tofu is breaking apart).",
        spectrum: [
          { state: "Underdone", description: "Tofu crumbled during blanching — silken tofu added to boiling (not barely simmering) water.", action: "Reduce heat. Silken tofu needs the gentlest possible blanch." },
          { state: "Perfect",   description: "Intact cubes, slightly firmed on the outside, clean white, fragile but handleable. Resting on the towel without collapse.", action: "Proceed — handle with a slotted spoon and patience." },
          { state: "Overdone",  description: "Tofu has become rubbery and tough on the outside. Lost its silken quality.", action: "Still fine — ma po tofu is forgiving. The sauce will rehydrate the exterior." },
        ],
      },
      feelCue: "Lift a cube on a slotted spoon and gently tilt — it should quiver like set custard and hold its shape, barely. It is incredibly delicate at this stage.",
    },
    {
      nodeId: "step_2",
      action: "Fry",
      inputs: ["ing_02", "ing_03", "ing_04", "ing_05", "ing_06", "ing_10", "ing_12"],
      outputState: "fragrant_base",
      instructions: "Heat oil in a wok over high heat until shimmering. Add ground pork and stir-fry, breaking up all clumps, until fully cooked and beginning to crisp at the edges — about 3 minutes. Push to the side. Add doubanjiang and fry in the oil for 1 minute until the oil turns red and the paste smells toasted. Add fermented black beans, garlic, ginger, and chili flakes. Fry together for 1 more minute.",
      visualCue: {
        primaryTarget: "The oil in the wok has turned vivid red-orange from the doubanjiang. The pork is fully cooked and slightly crispy at the edges. The base smells deeply savory, spicy, and fermented.",
        spectrum: [
          { state: "Underdone", description: "Doubanjiang is still bright red and hasn't turned the oil. Pork looks grey and steamed.", action: "Increase heat and fry longer — both the pork and the paste need to cook in the oil, not steam." },
          { state: "Perfect",   description: "Oil is deeply red, pork is crispy-edged, garlic and ginger have cooked down. The wok is fragrant with sizzling chili paste and fermented black bean.", action: "Add stock and tofu." },
          { state: "Overdone",  description: "Doubanjiang has begun to stick and scorch. Bitter, acrid smell.", action: "Add stock immediately to deglaze and rescue the paste." },
        ],
      },
      feelCue: "The wok should be very hot and active — the sound should be a continuous loud sizzle, not a quiet bubble. Ma po tofu needs high heat to develop its characteristic wok hei.",
    },
    {
      nodeId: "step_3",
      action: "Simmer",
      inputs: ["fragrant_base", "blanched_tofu", "ing_07", "ing_08"],
      outputState: "simmering_ma_po",
      instructions: "Pour in the stock and soy sauce. Gently slide the tofu cubes into the sauce using a ladle or your hand — never stir vigorously. Shake the wok by the handle to distribute without breaking the tofu. Bring to a gentle simmer and cook for 3–4 minutes, occasionally tilting and swirling the wok rather than stirring.",
      visualCue: {
        primaryTarget: "Tofu cubes sitting in a vibrant red sauce, gently trembling with the simmer but intact. The sauce is thin at this stage — it will be thickened next.",
        spectrum: [
          { state: "Underdone", description: "Sauce has barely heated through. Tofu still cold in the center.", action: "Ensure the sauce is at a genuine simmer before thickening — cold tofu releases water and dilutes the sauce." },
          { state: "Perfect",   description: "Tofu is heated through, intact, gently surrounded by the red sauce. System is at a lively simmer.", action: "Thicken the sauce with cornstarch slurry." },
          { state: "Overdone",  description: "Tofu has broken apart from vigorous stirring or boiling. The sauce is full of tofu fragments.", action: "Continue — the flavor is intact even if the presentation is broken." },
        ],
      },
      feelCue: "Tilt the wok and listen — the tofu cubes should slide against each other with a gentle, wet slipping sound. If they're clattering, the heat is too high.",
    },
    {
      nodeId: "step_4",
      action: "Reduce",
      inputs: ["simmering_ma_po", "ing_11"],
      outputState: "thickened_ma_po",
      instructions: "Stir the cornstarch slurry to redistribute (it settles quickly). Drizzle it around the edges of the wok in three additions, gently shaking between each, allowing the sauce to thicken before adding more. The sauce should thicken to coat the tofu in a glossy, clingy layer — not thick like gravy, but substantial enough to cling.",
      visualCue: {
        primaryTarget: "The sauce has changed from thin and watery to a glossy, clingy coating that wraps each tofu cube. The surface of the sauce is shiny and moves slowly when the wok is tilted.",
        spectrum: [
          { state: "Underdone", description: "Sauce is still watery and runs off the tofu immediately. The broth and oil have separated.", action: "Add more cornstarch slurry in small amounts, shaking after each addition." },
          { state: "Perfect",   description: "Sauce clings to the tofu and moves slowly. It coats the back of a spoon in a thin, even layer. The red oil and sauce are emulsified into a unified gloss.", action: "Finish with Sichuan pepper and green onion." },
          { state: "Overdone",  description: "Sauce is gummy and thick, pulling away from the tofu in sheets when the wok is tilted.", action: "Add a splash of stock and shake to loosen." },
        ],
      },
      feelCue: "Dip a spoon in and watch the sauce slide back off into the wok — it should flow off in sheets rather than drips. That flowing sheet is the correct consistency.",
    },
    {
      nodeId: "step_5",
      action: "Garnish",
      inputs: ["thickened_ma_po", "ing_09", "ing_13"],
      outputState: "finished_ma_po_tofu",
      instructions: "Slide the ma po tofu from the wok into a serving bowl. Scatter freshly ground Sichuan peppercorn and green onion over the top. The Sichuan pepper must be added at the very end — it goes on top as a finishing element, not cooked into the sauce, to preserve its numbing, floral volatility. Serve immediately over steamed rice.",
      visualCue: {
        primaryTarget: "A pool of vivid red-orange sauce with white tofu cubes barely visible beneath. A visible dusting of pale tan Sichuan pepper and bright green onion on the surface.",
        spectrum: [
          { state: "Underdone", description: "Sichuan pepper not added, or added too early and lost its numbing quality.", action: "Always add Sichuan pepper raw and last — its essential oils are destroyed by heat." },
          { state: "Perfect",   description: "The pepper dusting is visible and pale. When you eat the dish, the heat (la) hits first, then the numbing tingling (ma) arrives 10–15 seconds later as a separate sensation. Two distinct waves.", action: "Eat immediately." },
          { state: "Overdone",  description: "Too much Sichuan pepper — the numbing overwhelms all other flavor.", action: "Serve with plain rice to balance." },
        ],
      },
      feelCue: "The first bite should deliver spicy heat immediately, followed by a building, tingly numbness that makes your lips and tongue feel electrically alive — this is the ma, and it is the point of the dish.",
    },
  ],
};
