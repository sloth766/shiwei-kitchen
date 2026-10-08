export default {
  repoId: "master_japanese_furikake_001",
  parentRepoId: null,
  slug: "furikake",
  author: "ForkRecipe Kitchen",

  title: "Furikake",
  description: "A hand-crumbled scatter of toasted nori, sesame seeds, katsuobushi, and sugar-salt that transforms a plain bowl of rice into something you want to eat slowly. Each pinch delivers a mosaic of textures — papery, crunchy, silky — and an umami intensity that lingers long after the last grain.",
  cuisine: "Japanese",
  culture: "Japanese",
  category: "condiments",

  tags: ["furikake", "japanese", "seasoning", "nori", "rice"],
  difficulty: 1,
  activeTime: "15 min",
  totalTime: "20 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 2, salty: 4, sour: 0, bitter: 1, umami: 5, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Umami",     name: "Katsuobushi (bonito flakes)",              ratioValue: 4,   defaultUnit: "parts", substitutions: ["dried sakura shrimp", "dried anchovies finely chopped"] },
    { ingId: "ing_02", role: "Structure", name: "Nori sheets (toasted)",                    ratioValue: 2,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Seasoning", name: "White sesame seeds",                       ratioValue: 2,   defaultUnit: "parts", substitutions: ["black sesame seeds", "mixed sesame"] },
    { ingId: "ing_04", role: "Seasoning", name: "Fine sea salt",                            ratioValue: 0.5, defaultUnit: "parts", substitutions: ["flaky salt, crushed"] },
    { ingId: "ing_05", role: "Sweetener", name: "Caster sugar",                             ratioValue: 0.5, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Umami",     name: "Soy sauce",                                ratioValue: 1,   defaultUnit: "parts", substitutions: ["tamari"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Toast",
      inputs: ["ing_03"],
      outputState: "toasted_sesame",
      instructions: "Place sesame seeds in a dry skillet over medium heat. Shake or stir constantly — sesame seeds burn in seconds and will go from golden to black without warning. Toast until the seeds are a uniform light gold and several begin to pop audibly, about 3–4 minutes. Immediately tip them out onto a plate to stop the cooking.",
      visualCue: {
        primaryTarget: "Seeds should be an even, warm golden colour — not pale white, not dark brown. A few seeds will have popped open and the kitchen smells of warm, nutty sesame oil.",
        spectrum: [
          { state: "Underdone", description: "Seeds are still white and raw-smelling. No fragrance yet.", action: "Continue toasting over medium heat. Keep shaking the pan." },
          { state: "Perfect",   description: "Warm golden, popping, fragrant. Nutty aroma fills the kitchen. One or two look slightly darker — a sign the heat is right.", action: "Tip immediately onto a cool plate. Do not leave in the hot pan." },
          { state: "Overdone",  description: "Seeds are brown and some are dark. A bitter, almost burned sesame smell.", action: "Discard and start over — burned sesame cannot be saved and will make the furikake bitter." },
        ],
      },
      feelCue: "Rub a few toasted seeds between your fingers — they should crush easily and release a warm, oily fragrance immediately.",
    },
    {
      nodeId: "step_2",
      action: "Toast",
      inputs: ["ing_01", "ing_06", "ing_04", "ing_05"],
      outputState: "seasoned_katsuobushi",
      instructions: "Combine katsuobushi, soy sauce, salt, and sugar in the same skillet over medium-low heat. Stir and toss continuously as the soy sauce coats and then gradually evaporates, the sugar caramelizes slightly, and the bonito flakes dry out and separate from a damp clump to a loose, fluffy pile. This takes 4–5 minutes. The flakes are done when they feel dry to the touch and have turned from pale pink to a deeper tan-brown.",
      visualCue: {
        primaryTarget: "Katsuobushi transforms from a damp, clumped mass into a loose, fluffy scatter of dry, lightly caramelized strands. Colour deepens from pale rose to warm tan.",
        spectrum: [
          { state: "Underdone", description: "Flakes still clump together and feel damp. Soy sauce still visibly wet in the pan.", action: "Keep stirring over the heat — the moisture must evaporate completely for the furikake to stay dry." },
          { state: "Perfect",   description: "Completely separate, fluffy strands. Dry and light to the touch. A faint caramel-soy aroma. The pan looks dry.", action: "Remove from heat and cool completely before mixing with nori." },
          { state: "Overdone",  description: "Flakes are beginning to scorch — darkening in spots and smelling of burnt soy. Getting stiff.", action: "Remove immediately from heat. Spread on a cold plate. Some bitterness, but likely still usable." },
        ],
      },
      feelCue: "A pinch of finished katsuobushi should feel almost weightless — dry and wispy, with no stickiness. If your fingers feel damp and the flakes cling together, keep cooking.",
    },
    {
      nodeId: "step_3",
      action: "Chop",
      inputs: ["ing_02"],
      outputState: "nori_flakes",
      instructions: "Stack the toasted nori sheets and cut into thin strips with scissors, then cut the strips crosswise into small squares or shards roughly 5 mm across. Alternatively, crumble the nori sheets by hand into irregular pieces. The pieces should be small enough to distribute evenly but large enough to contribute distinct texture in each mouthful. Do not grind the nori to powder — you want presence, not uniformity.",
      visualCue: {
        primaryTarget: "Irregular dark green-black squares and shards, roughly 3–7 mm. No large intact sheets. No fine dust — visible pieces with edges.",
        spectrum: [
          { state: "Underdone", description: "Pieces are too large — thumbnail-size or bigger. They will dominate each spoonful rather than distributing evenly.", action: "Cut or crumble smaller." },
          { state: "Perfect",   description: "An irregular mosaic of small dark nori pieces that will distribute evenly through the other ingredients. Uniform in their irregularity.", action: "Combine with the other ingredients." },
          { state: "Overdone",  description: "Nori has been ground to a fine powder — it will clump and not contribute texture.", action: "Add a fresh sheet torn to larger pieces to bring back texture." },
        ],
      },
      feelCue: "A piece of cut nori between the fingers should feel papery and crisp, snapping cleanly without crumbling to dust — this means it is properly dry and toasted.",
    },
    {
      nodeId: "step_4",
      action: "Assemble",
      inputs: ["toasted_sesame", "seasoned_katsuobushi", "nori_flakes"],
      outputState: "finished_furikake",
      instructions: "Combine the toasted sesame seeds, dried katsuobushi, and nori pieces in a bowl. Toss gently to distribute — do not stir aggressively or the nori will shatter into dust. Taste and adjust salt if needed. Transfer to an airtight container or glass jar. Furikake keeps at room temperature in an airtight container for up to 2 weeks, but is most fragrant in the first 3 days.",
      visualCue: {
        primaryTarget: "A varied, visually lively mixture — dark nori shards, pale sesame seeds, and fluffy tan katsuobushi strands scattered together. No single ingredient should dominate visually.",
        spectrum: [
          { state: "Underdone", description: "Ingredients are still in separate piles, not combined.", action: "Toss gently until evenly distributed." },
          { state: "Perfect",   description: "An even mosaic of colours and textures. Every spoonful contains all three components. The aroma is toasted, oceanic, and slightly sweet.", action: "Store in an airtight container. Serve scattered generously over hot rice." },
          { state: "Overdone",  description: "Over-mixing has broken the nori into dust and the katsuobushi into fragments. The texture is lost.", action: "The flavour is still excellent. Use as is — the lack of texture is the only loss." },
        ],
      },
      feelCue: "A pinch between the fingers should have variety — some hard sesame seeds, some light wispy bonito, some papery nori. If it all feels uniform, it has been mixed too aggressively.",
    },
  ],
};
