export default {
  repoId: "master_thai_pad-thai-sauce_001",
  parentRepoId: null,
  slug: "pad-thai-sauce",
  author: "ForkRecipe Kitchen",

  title: "Pad Thai Sauce",
  description: "The amber-dark sauce that defines pad thai — a careful balance of sour tamarind, sweet palm sugar, and funky fish sauce that caramelises around the rice noodles in the wok, creating the sticky, slightly charred edges that street vendors call the hallmark of a well-made plate.",
  cuisine: "Thai",
  culture: "Central Thai",
  category: "sauces",

  tags: ["pad thai", "thai", "tamarind", "fish sauce", "street food"],
  difficulty: 1,
  activeTime: "15 min",
  totalTime: "15 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",

  // 0–5 scale. Tamarind pushes sour, palm sugar sweet, fish sauce salty-umami.
  flavorRadar: { sweet: 4, salty: 4, sour: 4, bitter: 0, umami: 3, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Acid",      name: "Tamarind paste (from a block, not concentrate)",  ratioValue: 3,   defaultUnit: "parts", substitutions: ["tamarind concentrate (use 1 part)", "lime juice (loses depth but works)"] },
    { ingId: "ing_02", role: "Sweetener", name: "Palm sugar (jaggery), grated or crumbled",        ratioValue: 2,   defaultUnit: "parts", substitutions: ["light brown sugar", "coconut sugar"] },
    { ingId: "ing_03", role: "Seasoning", name: "Fish sauce (Tiparos or Megachef preferred)",       ratioValue: 2,   defaultUnit: "parts", substitutions: ["soy sauce + 1/4 part lime juice for vegan"] },
    { ingId: "ing_04", role: "Umami",     name: "Oyster sauce",                                    ratioValue: 0.5, defaultUnit: "parts", substitutions: ["hoisin sauce"] },
    { ingId: "ing_05", role: "Seasoning", name: "Dark soy sauce (for colour, optional)",           ratioValue: 0.25, defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Dissolve",
      inputs: ["ing_01"],
      outputState: "tamarind_liquid",
      instructions: "If using block tamarind: break off 60 g and soak in 120 ml of warm (not boiling) water for 15 minutes. Work the softened block with your fingers, squeezing and pressing until all the pulp dissolves into the water. Pour the mixture through a fine sieve, pressing hard on the solids to extract all the liquid. Discard the fibres and seeds. You need a thick, dark-brown liquid, about 3 tablespoons of concentrated paste per portion of sauce. If using tamarind concentrate from a jar, thin with a little water to a pourable consistency.",
      visualCue: {
        primaryTarget: "A smooth, dark-brown liquid with the consistency of thin syrup — no fibres, no seeds, no pulp lumps. Colour is a deep amber-brown.",
        spectrum: [
          { state: "Underdone", description: "The block has not fully softened and chunks still float. Liquid is pale and thin.", action: "Soak longer in warm water and massage more aggressively, or use slightly hotter water." },
          { state: "Perfect",   description: "Thick, dark, smooth tamarind liquid. When you lift the strainer, almost no liquid should remain — you have extracted all the flavour.", action: "Measure out 3 parts for the sauce." },
          { state: "Overdone",  description: "N/A — this step is extractive. Over-soaking does not damage tamarind.", action: "Proceed." },
        ],
      },
      feelCue: "Rub a tiny amount of the tamarind liquid between your fingers and taste — it should be intensely sour, fruity, and faintly sweet with a slight astringency on the sides of your tongue.",
    },
    {
      nodeId: "step_2",
      action: "Simmer",
      inputs: ["tamarind_liquid", "ing_02", "ing_03", "ing_04", "ing_05"],
      outputState: "raw_pad_thai_sauce",
      instructions: "Combine the tamarind liquid, palm sugar, fish sauce, oyster sauce, and dark soy sauce in a small saucepan. Set over low-medium heat and stir continuously until the palm sugar dissolves completely — palm sugar lumps are denser than white sugar and need gentle heat and patience. Once dissolved, raise heat slightly and bring to a very gentle simmer for 2–3 minutes. The sauce will darken slightly and thicken a little as moisture evaporates. Remove from heat.",
      visualCue: {
        primaryTarget: "A glossy, dark amber sauce with the consistency of a loose syrup. When you stir, it moves as a single, cohesive liquid. No palm sugar granules visible.",
        spectrum: [
          { state: "Underdone", description: "Palm sugar not fully dissolved — visible lumps or granules sink to the bottom. Sauce tastes unbalanced: too sour in one spoonful, too sweet in the next.", action: "Keep stirring on low heat. Palm sugar needs more time than white sugar." },
          { state: "Perfect",   description: "Uniform, glossy, amber-brown sauce. Tastes simultaneously sour, sweet, and savoury in perfect balance when sampled on a spoon.", action: "Taste and adjust balance, then cool to room temperature before use." },
          { state: "Overdone",  description: "Sauce has reduced too far and is thick and sticky like molasses. It will seize up in the wok and burn.", action: "Thin with 1–2 tablespoons of water and stir over low heat to incorporate." },
        ],
      },
      feelCue: "Run a spoon across the bottom of the pan — it should leave a brief clean trail that fills back in within 2 seconds. Slower than that and the sauce is too thick; faster and it needs more reduction.",
    },
    {
      nodeId: "step_3",
      action: "Season",
      inputs: ["raw_pad_thai_sauce"],
      outputState: "finished_pad_thai_sauce",
      instructions: "Taste the sauce critically on a clean spoon — pad thai sauce should hit sour first, then sweet, then salty, with a savoury undertow. Adjust: too sour → add more palm sugar in small amounts; too sweet → add more fish sauce (not tamarind, which would change the body); flat → add more fish sauce. The sauce should taste noticeably stronger than you want the finished dish, because it will be diluted slightly by noodle water and wok steam during cooking. Store in a jar at room temperature for up to 1 week, or refrigerate for 1 month.",
      visualCue: {
        primaryTarget: "Clear, glossy amber sauce at room temperature. When poured from a spoon it falls in a thin, flowing stream — not thick and viscous.",
        spectrum: [
          { state: "Underdone", description: "Sauce has not been tasted and adjusted. It may be unbalanced — tamarind sourness varies wildly between brands and batches.", action: "Taste. Always taste. A 10-second calibration here saves a disappointing plate of pad thai." },
          { state: "Perfect",   description: "Balanced, intensely flavoured, slightly over-seasoned deliberately. It smells of tamarind fruit, caramel, and fermented fish in a harmonious way.", action: "Cool completely before using or storing. Use 3–4 tablespoons per serving of noodles in the wok." },
          { state: "Overdone",  description: "Sauce has been adjusted so many times it has become murky and confused in flavour.", action: "Start from scratch — a small batch of pad thai sauce is cheap and fast to make. Better a clean sauce than a compromised one." },
        ],
      },
      feelCue: "The moment the sauce hits a screaming-hot wok it should sizzle violently and release a caramel-sour steam cloud — that is the smell of pad thai being born; if the wok is not hot enough, the sauce steams instead of caramelising.",
    },
  ],
};
