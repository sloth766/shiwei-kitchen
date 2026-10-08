export default {
  repoId: "master_vietnamese_banh-mi-pickles_001",
  parentRepoId: null,
  slug: "banh-mi-pickles",
  author: "ForkRecipe Kitchen",

  title: "Bánh Mì Pickles",
  description: "Matchstick-cut daikon and carrot submerged in a cool, sweet-sour brine that turns them translucent and shatteringly crisp in under an hour — the sharp acid crunch that cuts through pâté and fatty pork on a Vietnamese baguette, indispensable and endlessly fast to make.",
  cuisine: "Vietnamese",
  culture: "Vietnamese",
  category: "fermented",

  tags: ["pickled", "daikon", "carrot", "vietnamese", "vegan"],
  difficulty: 1,
  activeTime: "15 min",
  totalTime: "1 hour 15 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",

  // 0–5 scale. Bright sour and sweet dominate; very low on heat, umami, bitter.
  flavorRadar: { sweet: 4, salty: 2, sour: 5, bitter: 0, umami: 0, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure", name: "Daikon radish, peeled and cut into 3 mm matchsticks",     ratioValue: 3,   defaultUnit: "parts", substitutions: ["turnip"] },
    { ingId: "ing_02", role: "Structure", name: "Carrot, peeled and cut into 3 mm matchsticks",            ratioValue: 2,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Acid",      name: "Distilled white vinegar (5% acidity)",                   ratioValue: 2,   defaultUnit: "parts", substitutions: ["rice vinegar (slightly milder, also excellent)"] },
    { ingId: "ing_04", role: "Liquid",    name: "Water",                                                   ratioValue: 2,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Sweetener", name: "White sugar",                                             ratioValue: 1,   defaultUnit: "parts", substitutions: ["caster sugar"] },
    { ingId: "ing_06", role: "Seasoning", name: "Fine sea salt",                                           ratioValue: 0.25, defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Salt",
      inputs: ["ing_01", "ing_02", "ing_06"],
      outputState: "salted_vegetables",
      instructions: "Combine the julienned daikon and carrot in a large bowl. Sprinkle the salt over them and toss well. Let stand for 15 minutes. The salt draws water out of the vegetables via osmosis, compressing their cell walls and making them both crunchier after pickling and better able to absorb the brine. After 15 minutes, the bowl will have a pool of liquid and the vegetables will have softened very slightly. Rinse thoroughly under cold water to remove the surface salt, then squeeze the vegetables firmly in your hands over the sink to remove as much liquid as possible. Pat dry with a clean towel.",
      visualCue: {
        primaryTarget: "After salting, the vegetables should be slightly limp but still hold their shape — not floppy, not raw-crunchy. The bowl will contain visible liquid drawn out by the salt.",
        spectrum: [
          { state: "Underdone", description: "Vegetables are still rigid and barely any liquid has been drawn out. Salt not working yet.", action: "Toss again and wait the full 15 minutes. Rushing this step means less-crisp pickles." },
          { state: "Perfect",   description: "Vegetables are pliable but not mushy. A good pool of liquid at the bottom. After rinsing and squeezing, they feel like a wrung-out cloth — most excess moisture removed.", action: "Pack into a clean jar and make the brine." },
          { state: "Overdone",  description: "Vegetables have been salted for over an hour and are very limp and watery, having released too much liquid.", action: "Rinse, squeeze, and proceed. The texture will be slightly softer but the flavour will still be good." },
        ],
      },
      feelCue: "After squeezing, a handful of the vegetables should feel damp but not dripping — like a well-wrung sponge. If liquid streams out when you squeeze, press harder.",
    },
    {
      nodeId: "step_2",
      action: "Dissolve",
      inputs: ["ing_03", "ing_04", "ing_05"],
      outputState: "pickling_brine",
      instructions: "Combine vinegar, water, and sugar in a small saucepan or microwave-safe bowl. Heat gently until the sugar dissolves completely — about 2 minutes on the stovetop over medium heat, or 60 seconds in the microwave. Stir until no granules are visible. The brine does not need to boil; a gentle warm-through is sufficient. Allow to cool to room temperature before pouring over the vegetables. The brine ratio here is classic Vietnamese: equal parts vinegar and water gives a bright but not face-puckering acid.",
      visualCue: {
        primaryTarget: "A clear, colourless to very faintly yellow liquid with no visible sugar crystals. Should taste simultaneously sour, sweet, and very slightly saline.",
        spectrum: [
          { state: "Underdone", description: "Sugar granules still visible — solution looks slightly cloudy near the bottom.", action: "Stir longer on low heat. Do not boil, but the heat is necessary to fully dissolve the sugar." },
          { state: "Perfect",   description: "Perfectly clear brine. On tasting: sour hits first, then sweetness follows immediately and lingers. Slight salt rounds it out.", action: "Cool to room temperature before using." },
          { state: "Overdone",  description: "Brine has been boiled vigorously and is slightly reduced, making it more concentrated.", action: "Add a tablespoon of water to restore the original ratio. Over-concentrated brine will make the pickles too sharp." },
        ],
      },
      feelCue: "Cool brine should feel neutral on your fingertip — not slimy, not thick. A small drop on the tongue should deliver a bright, clean sour-sweet hit with no caramel notes.",
    },
    {
      nodeId: "step_3",
      action: "Infuse",
      inputs: ["salted_vegetables", "pickling_brine"],
      outputState: "finished_banh_mi_pickles",
      instructions: "Pack the drained, squeezed vegetables tightly into a clean glass jar or container. Pour the cooled brine over the vegetables until they are completely submerged — press down if they float. Seal and refrigerate. The pickles are usable after just 30–60 minutes of refrigeration for a quick, fresh-pickle crunch. For a more developed flavour, refrigerate overnight. They will keep, refrigerated, for up to 2 weeks. The daikon will lose some of its sharpness after 3 days, becoming milder and more rounded — both stages are delicious.",
      visualCue: {
        primaryTarget: "All vegetables fully submerged in brine. After 1 hour, the daikon turns from stark white to a slightly translucent ivory; the carrot intensifies to a deeper orange.",
        spectrum: [
          { state: "Underdone", description: "Pickles have been in brine for under 30 minutes. Vegetables still taste raw and the brine has not penetrated deeply.", action: "Refrigerate for at least 1 more hour. Quick-pickled vegetables need time even if the brine is warm." },
          { state: "Perfect",   description: "After 1–2 hours: slightly translucent, snappy-crunchy, bright sour-sweet flavour with the daikon's sharpness still intact. After overnight: mellow, rounded, deeply flavourful.", action: "Use immediately in a bánh mì, or seal and refrigerate for up to 2 weeks." },
          { state: "Overdone",  description: "Pickles left unrefrigerated for over 4 hours or refrigerated for over 3 weeks. Daikon may have turned soft and sulphurous-smelling.", action: "Discard if soft or off-smelling. Always keep covered and cold." },
        ],
      },
      feelCue: "A perfectly pickled matchstick of daikon should snap audibly when you bite through it — that crisp crack is the hallmark of the right brine concentration and the right amount of salting time.",
    },
  ],
};
