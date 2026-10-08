export default {
  repoId: "master_georgian_adjika_001",
  parentRepoId: null,
  slug: "adjika",
  author: "ForkRecipe Kitchen",

  title: "Adjika",
  description: "A raw, vivid paste from the Caucasus built on fresh hot peppers, garlic, and blue fenugreek — aggressively aromatic, deeply green-spiced, and capable of transforming anything it touches with its herbal, funky heat.",
  cuisine: "Georgian",
  culture: "Caucasian",
  category: "sauces",

  tags: ["adjika", "georgian", "caucasian", "hot-pepper-paste", "fermented", "condiment"],
  difficulty: 2,
  activeTime: "25 min",
  totalTime: "2 hr 25 min",
  ratioSystem: "parts",

  stars: 721,
  forks: 58,
  contributors: 24,
  license: "CC-BY-SA",
  createdAt: "2025-01-15",
  updatedAt: "2025-04-20",

  flavorRadar: { sweet: 1, salty: 3, sour: 2, bitter: 2, umami: 2, heat: 5 },

  ingredients: [
    { ingId: "ing_01", role: "Spice",     name: "Fresh hot red peppers (serrano or cayenne, stemmed, seeded)", ratioValue: 40, defaultUnit: "parts", substitutions: ["dried reconstituted red chilies"] },
    { ingId: "ing_02", role: "Allium",    name: "Garlic cloves (peeled)",                 ratioValue: 15, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Aromatic",  name: "Blue fenugreek (utskho suneli)",         ratioValue: 5,  defaultUnit: "parts", substitutions: ["regular fenugreek (reduced quantity)", "ground coriander"] },
    { ingId: "ing_04", role: "Herb",      name: "Fresh cilantro (leaves and tender stems)", ratioValue: 10, defaultUnit: "parts", substitutions: ["fresh parsley"] },
    { ingId: "ing_05", role: "Seasoning", name: "Coarse salt (for maceration and seasoning)", ratioValue: 4, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Acid",      name: "White wine vinegar",                     ratioValue: 5,  defaultUnit: "parts", substitutions: ["apple cider vinegar"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Salt",
      inputs: ["ing_01", "ing_05"],
      outputState: "macerated_peppers",
      instructions: "Halve the peppers and remove seeds and membranes — wear gloves throughout. Toss with half the salt and spread on a clean kitchen towel or paper towels. Leave uncovered for 1–2 hours to draw out excess moisture. This salting and dehydration step concentrates the pepper flavor and removes the water content that would otherwise make the adjika too thin and watery. The peppers will visibly shrink and become slightly translucent.",
      visualCue: {
        primaryTarget: "Peppers have shrunk by 20–30% and look limp. The towel beneath them is visibly damp from extracted moisture.",
        spectrum: [
          { state: "Underdone", description: "Peppers still look plump and firm. No visible moisture on the towel. Only 30 minutes have passed.", action: "Continue salting for another hour. The dehydration is crucial for texture." },
          { state: "Perfect",   description: "Peppers look slightly limp and have lost 25% of their volume. Towel is damp. When squeezed, they release very little remaining liquid.", action: "Pat dry and proceed to grinding." },
          { state: "Overdone",  description: "Peppers have dried more than 4 hours and are now quite shriveled. They will be saltier than desired.", action: "Rinse briefly under cold water, pat dry, and reduce the additional salt in the recipe." },
        ],
      },
      feelCue: "The macerated peppers should feel limp and slightly leathery compared to when you started — press one between your fingers and it should yield easily with no crunch and release only a tiny amount of liquid.",
    },
    {
      nodeId: "step_2",
      action: "Pound",
      inputs: ["macerated_peppers", "ing_02", "ing_03", "ing_04", "ing_05", "ing_06"],
      outputState: "finished_adjika",
      instructions: "Traditional adjika is made in a stone mortar — a food processor is acceptable but produces a slightly less vibrant paste. Pound or pulse the garlic and remaining salt until a rough paste forms. Add the macerated peppers and pound/process until the peppers break down into a rough paste. Add the blue fenugreek, cilantro, and vinegar. Continue pounding or processing until a coarse, fibrous paste forms — not entirely smooth, with some texture from the pepper skins and herb stems remaining. Taste: it should be fiercely hot, salty, herbal, and slightly sour.",
      visualCue: {
        primaryTarget: "A vivid red-orange paste with green flecks from the herbs, coarsely textured with visible fiber. Glistening from the pepper oils.",
        spectrum: [
          { state: "Underdone", description: "Large pepper chunks still visible. Garlic is in recognizable pieces. Ingredients not fully incorporated.", action: "Continue pounding or processing. Adjika needs thorough working to meld the flavors." },
          { state: "Perfect",   description: "Coarse paste with visible fiber and herb flecks. Red-orange with green throughout. Smells fiercely aromatic — pepper heat, garlic, and the distinctive musty warmth of blue fenugreek.", action: "Pack into a sterilized jar, cover with a thin layer of vinegar, and refrigerate." },
          { state: "Overdone",  description: "Processed to a completely smooth, homogeneous paste — this is a valid style (Abkhazian) but loses some of the Georgian textural character.", action: "Proceed — smooth adjika is still authentic and delicious." },
        ],
      },
      feelCue: "Rub a small amount of adjika between your fingers — you should feel the coarse pepper fiber and tiny herb stems before the oils start to coat your skin. The heat registers almost immediately on contact with the skin, especially any small cuts or abrasions.",
    },
  ],
};
