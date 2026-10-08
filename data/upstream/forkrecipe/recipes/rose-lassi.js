export default {
  repoId: "master_indian_rose_lassi_001",
  parentRepoId: null,
  slug: "rose-lassi",
  author: "ForkRecipe Kitchen",

  title: "Rose Lassi",
  description: "A cooling North Indian yogurt drink perfumed with rose water and green cardamom, tinted a blush pink by a spoonful of rose syrup, and finished with a pinch of saffron bloomed in warm milk — simultaneously cooling and aromatic, its floral complexity deepening with each sip.",
  cuisine: "Indian",
  culture: "Punjab",
  category: "beverages",

  tags: ["lassi", "indian", "yogurt-drink", "rose", "cardamom", "saffron", "punjab", "vegetarian"],
  difficulty: 1,
  activeTime: "10 min",
  totalTime: "15 min",
  ratioSystem: "weight",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",

  flavorRadar: { sweet: 4, salty: 0, sour: 2, bitter: 0, umami: 0, heat: 1 },

  ingredients: [
    { ingId: "ing_01", role: "Dairy",      name: "Full-fat plain yogurt (room temperature)",    ratioValue: 400, defaultUnit: "g", substitutions: ["Greek yogurt thinned with 100g milk", "coconut yogurt (vegan)"] },
    { ingId: "ing_02", role: "Liquid",     name: "Whole milk (cold)",                           ratioValue: 150, defaultUnit: "g", substitutions: ["water for a lighter lassi"] },
    { ingId: "ing_03", role: "Sweetener",  name: "Rose syrup (Rooh Afza or similar)",           ratioValue: 40,  defaultUnit: "g", substitutions: ["2 tbsp sugar + 1 tsp rose water"] },
    { ingId: "ing_04", role: "Aromatic",   name: "Rose water (pure, food-grade)",               ratioValue: 10,  defaultUnit: "g", substitutions: ["rose extract, use half the amount"] },
    { ingId: "ing_05", role: "Spice",      name: "Green cardamom pods, seeds ground",           ratioValue: 3,   defaultUnit: "g", substitutions: ["1/4 tsp pre-ground cardamom"] },
    { ingId: "ing_06", role: "Aromatic",   name: "Saffron threads",                             ratioValue: 0.1, defaultUnit: "g", substitutions: ["a pinch of turmeric for color only"] },
    { ingId: "ing_07", role: "Liquid",     name: "Warm milk (for blooming saffron)",            ratioValue: 30,  defaultUnit: "g", substitutions: ["warm water"] },
    { ingId: "ing_08", role: "Garnish",    name: "Dried rose petals and crushed pistachios",    ratioValue: 5,   defaultUnit: "g", substitutions: ["a pinch of ground cardamom"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Bloom saffron",
      inputs: ["ing_06", "ing_07"],
      outputState: "saffron_milk",
      instructions: "Crush the saffron threads between your fingers to break them into smaller pieces — this dramatically increases the surface area and the amount of color and flavor extracted. Add to the warm (not boiling) milk and stir. Leave to bloom for 5–10 minutes. The milk will turn a deep golden-orange and the room will fill with the unmistakable honeyed, slightly medicinal fragrance of good saffron. A small pinch of saffron is potent — more than 5–6 threads for this quantity will make the lassi bitter and medicinal rather than fragrant.",
      visualCue: {
        primaryTarget: "The warm milk has turned a deep amber-gold, with visible saffron threads floating. The color is vivid and saturated, not pale yellow.",
        spectrum: [
          { state: "Underdone", description: "Milk is barely tinted, pale yellow, after less than 2 minutes of blooming. Little aroma released.", action: "Wait the full 10 minutes. Saffron needs time and warmth to release its color and volatile aromatic compounds." },
          { state: "Perfect",   description: "Deep amber-gold color. Rich, complex floral-honey smell. Threads have given most of their color to the milk.", action: "Use immediately or cool and use later." },
          { state: "Overdone",  description: "The milk was too hot (boiling) and the saffron's most volatile aromatics have cooked off. Color present but fragrance diminished.", action: "The color and a baseline saffron flavor remain — use it. Next time, use warm (65 C) not boiling milk." },
        ],
      },
      feelCue: "Press a saffron thread between your fingers before adding: it should stain your fingertips deep orange immediately — that's the crocin pigment. A thread that barely stains is either old or low quality; genuine saffron (Kashmiri or Spanish) stains vividly.",
    },
    {
      nodeId: "step_2",
      action: "Blend",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_04", "ing_05", "saffron_milk"],
      outputState: "blended_lassi",
      instructions: "Combine the yogurt, cold milk, rose syrup, rose water, and ground cardamom in a blender. Add the bloomed saffron milk. Blend on high for 90 seconds until completely smooth, frothy, and well-combined. Taste after blending: the rose should be prominent but not soap-like, the cardamom a warm whisper on the finish, and the saffron should add a golden depth rather than a medicinal note. Adjust sweetness with a touch more rose syrup if needed. The lassi should be pourable but creamy — if too thick, add cold milk a tablespoon at a time.",
      visualCue: {
        primaryTarget: "A frothy, blush-pink to pale orange drink with a thick foam cap, blended so smoothly it shows no yogurt lumps or unmixed streaks.",
        spectrum: [
          { state: "Underdone", description: "Thick, lumpy, unblended. Visible yogurt curds. Layers of ingredients not fully mixed.", action: "Blend another 60 seconds on high speed until completely smooth and frothy." },
          { state: "Perfect",   description: "Uniformly pink-orange, frothy, smooth. Tastes floral, sweet, cool, and complex. Pours smoothly without any gluey resistance.", action: "Pour over ice and garnish." },
          { state: "Overdone",  description: "Over-blended until warm from friction — the ice will melt immediately. Rose flavor muted from heat.", action: "Refrigerate for 15 minutes before serving over ice." },
        ],
      },
      feelCue: "Pour a small amount into your palm: it should flow like heavy cream — smooth, slightly thick, with no graininess. The aroma off the foam should be immediately and unmistakably floral: rose dominant, with cardamom rising beneath it.",
    },
    {
      nodeId: "step_3",
      action: "Serve",
      inputs: ["blended_lassi", "ing_08"],
      outputState: "finished_rose_lassi",
      instructions: "Fill tall glasses with crushed ice. Pour the blended lassi over the ice. The foam will settle in a thick cap on top. Scatter a few dried rose petals and crushed pistachios across the foam for color and texture contrast. Serve immediately with a long spoon or wide straw. Rose lassi does not hold well — the foam settles and the ice dilutes within 10 minutes, so serve it the moment it is made. In Punjab, it is served in tall clay glasses (kulhads) that add an earthy, mineral note; a chilled glass is a good substitute.",
      visualCue: {
        primaryTarget: "A tall glass layered with crushed ice and blush-pink lassi foam, crowned with vivid dried rose petals and pale green pistachio crumble.",
        spectrum: [
          { state: "Underdone", description: "Served without enough ice or at room temperature. Flat, warm, and heavy.", action: "Add more crushed ice and serve in chilled glasses. The cold is not aesthetic — it changes the texture and the perceived sweetness." },
          { state: "Perfect",   description: "Ice-cold, frothy, aromatic, pink, and decorated. The first sip is cold and floral; the finish is warm from cardamom and saffron.", action: "Drink within 5–10 minutes." },
          { state: "Overdone",  description: "Left standing too long — ice has melted, foam has collapsed, and the drink is now watery and diluted.", action: "If this happens, re-blend with fresh ice and serve again." },
        ],
      },
      feelCue: "The first sip should deliver an immediate cold shock followed by a rapid expansion of rose fragrance at the back of the nose — that retronasal rose bloom is what distinguishes a real rose lassi from a sweetened yogurt drink.",
    },
  ],
};
