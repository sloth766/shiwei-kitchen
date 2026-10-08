export default {
  repoId: "master_mexican_escabeche_001",
  parentRepoId: null,
  slug: "escabeche",
  author: "ForkRecipe Kitchen",

  title: "Escabeche (Pickled Jalapeños & Vegetables)",
  description: "The taqueria condiment that makes everything better — jalapeños, carrots, and onion submerged in a hot brine spiced with oregano, cumin, and bay leaf, then left overnight to soften and sour into a punchy, crunchy pickle that brightens anything it touches.",
  cuisine: "Mexican",
  culture: "Mexican",
  category: "condiments",

  tags: ["mexican", "pickled", "jalapeño", "condiment", "vegan"],
  difficulty: 1,
  activeTime: "15 min",
  totalTime: "24 hrs",
  ratioSystem: "parts",

  stars: 1143,
  forks: 134,
  contributors: 11,
  license: "CC-BY-SA",
  createdAt: "2024-11-20",
  updatedAt: "2025-10-03",

  flavorRadar: { sweet: 1, salty: 3, sour: 4, bitter: 0, umami: 1, heat: 3 },

  ingredients: [
    { ingId: "ing_01", role: "Heat",      name: "Jalapeños (sliced into rings, with seeds)",        ratioValue: 50,  defaultUnit: "parts", substitutions: ["serrano chiles (hotter)", "banana peppers (milder)"] },
    { ingId: "ing_02", role: "Aromatic",  name: "Carrots (peeled, sliced on the bias, 5mm thick)",  ratioValue: 30,  defaultUnit: "parts", substitutions: ["cauliflower florets", "radishes"] },
    { ingId: "ing_03", role: "Allium",    name: "White onion (thinly sliced into half-moons)",      ratioValue: 20,  defaultUnit: "parts", substitutions: ["pearl onions, halved"] },
    { ingId: "ing_04", role: "Acid",      name: "White distilled vinegar",                          ratioValue: 60,  defaultUnit: "parts", substitutions: ["apple cider vinegar (slightly sweeter)"] },
    { ingId: "ing_05", role: "Liquid",    name: "Water",                                            ratioValue: 40,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Seasoning", name: "Salt, dried oregano (Mexican), black peppercorns, bay leaves, dried cumin seeds", ratioValue: 3, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Fat",       name: "Neutral oil (optional — for a taqueria-style finish)", ratioValue: 5, defaultUnit: "parts", substitutions: ["olive oil"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Sauté",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_07"],
      outputState: "sauteed_vegetables",
      instructions: "Heat oil in a medium saucepan over medium-high heat. Add the carrot slices and cook for 2-3 minutes until they begin to develop a tiny amount of color but are still firmly crunchy. Add the jalapeño rings and onion slices. Toss and cook for another 2 minutes — just enough to soften the raw edge of the onion and coat everything in the oil. This brief sauté (a step often skipped but essential to the best taqueria-style escabeche) allows the oil to carry flavors between the vegetables and makes the brine more complex.",
      visualCue: {
        primaryTarget: "Vegetables are still visibly firm and bright in color — the jalapeños remain deep green, the carrots bright orange — but the onion has softened to translucency at the edges.",
        spectrum: [
          { state: "Underdone", description: "Vegetables are completely raw and the onion is still opaque and crunchy throughout.", action: "Cook another 1-2 minutes. The oil needs to coat the vegetables and start the flavor exchange." },
          { state: "Perfect",   description: "Onion is translucent at the edges. Carrots have 1-2 light color spots but are still firm. Jalapeños are bright green and beginning to turn slightly dull.", action: "Add the brine ingredients immediately to stop the cooking." },
          { state: "Overdone",  description: "Jalapeños have turned dull olive green and the carrots are softening. The onion is fully limp.", action: "Proceed. The escabeche will still taste excellent but the vegetables will be softer after pickling." },
        ],
      },
      feelCue: "Pick up a carrot slice with tongs — it should flex the tiniest amount when held horizontally but still snap if bent sharply. This is exactly right; the brine will soften it further.",
    },
    {
      nodeId: "step_2",
      action: "Simmer",
      inputs: ["sauteed_vegetables", "ing_04", "ing_05", "ing_06"],
      outputState: "hot_escabeche",
      instructions: "Add the vinegar, water, salt, oregano, black peppercorns, bay leaves, and cumin seeds directly to the pot with the vegetables. Bring to a boil over high heat, stirring to dissolve the salt. The brine should smell sharp and herby — vinegar dominant, with an oregano note underneath. Once boiling, reduce to a simmer for 3 minutes, pressing the vegetables gently to ensure they are all submerged. Remove from heat. The hot brine will continue to cook the vegetables slightly as it cools.",
      visualCue: {
        primaryTarget: "The brine is clear and very lightly tinted green from the jalapeños. The vegetables are fully submerged. Steam rises aggressively when it comes to the boil.",
        spectrum: [
          { state: "Underdone", description: "The salt has not fully dissolved — visible crystals at the bottom of the pot. The brine smells of raw vinegar without herbal complexity.", action: "Stir until all salt dissolves. Undissolved salt creates uneven pickling." },
          { state: "Perfect",   description: "Clear, salty-herby-acidic brine at a full boil. All vegetables submerged. The smell is classic taqueria: vinegar, oregano, and chile.", action: "Remove from heat and prepare jars." },
          { state: "Overdone",  description: "The brine has simmered long enough that the jalapeños are beginning to turn olive-colored and the carrots are softening.", action: "Proceed immediately to cooling and jarring. Do not simmer further." },
        ],
      },
      feelCue: "The brine at the correct strength should make your eyes water when you lean over it — not from fumes but from the sharp acidic steam. If it smells mild, add more vinegar.",
    },
    {
      nodeId: "step_3",
      action: "Cool",
      inputs: ["hot_escabeche"],
      outputState: "jarred_escabeche",
      instructions: "Transfer the hot escabeche to clean glass jars, ensuring the vegetables are fully submerged under the brine. Press them down if needed. Seal loosely and allow to cool at room temperature for 1 hour, then refrigerate for at least 8 hours before serving — 24 hours is ideal. The brine will change color as the pigments migrate: the jalapeños turn it pale green, the carrots add a warm gold, and the onion layers become slightly translucent and bright. These are not ready to eat until the vegetables have had time to fully absorb the brine.",
      visualCue: {
        primaryTarget: "After 24 hours, the brine is a clear olive-green-gold. Jalapeño rings are bright but slightly softened, carrots are cooked-looking but hold their shape, onion layers are translucent and glossy.",
        spectrum: [
          { state: "Underdone", description: "After only a few hours, the vegetables still taste mostly raw with a vinegar coating rather than a deep pickle flavor throughout.", action: "Return to the refrigerator. The escabeche needs at least 8 hours. The full depth develops at 24 hours." },
          { state: "Perfect",   description: "After 24 hours, the vegetables are fully pickled through — sour, slightly soft, with the heat of the jalapeño mellowed and the brine complex and rounded.", action: "Serve directly from the jar. Will keep refrigerated for 3-4 weeks." },
          { state: "Overdone",  description: "After several days, the jalapeños have turned fully olive and the carrots are mushy when pressed.", action: "Still edible, but chop finely to use as a condiment in cooking rather than serving whole." },
        ],
      },
      feelCue: "A 24-hour escabeche jalapeño ring should yield with a satisfying crunch when bitten — still firm but not raw-crunchy, the wall of the pepper has absorbed the brine and carries the acid all the way through.",
    },
  ],
};
