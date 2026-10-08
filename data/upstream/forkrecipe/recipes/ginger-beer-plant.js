export default {
  repoId: "master_caribbean_ginger_beer_plant_001",
  parentRepoId: null,
  slug: "ginger-beer-plant",
  author: "ForkRecipe Kitchen",

  title: "Ginger Beer Plant",
  description: "A living Caribbean culture of wild yeast and lactobacillus bacteria fed daily on fresh ginger and sugar until it becomes a vigorous, fizzing starter that is then fermented with more water and sugar into a naturally carbonated ginger beer — fiery, tangy, and alive in a way no commercial version can replicate.",
  cuisine: "Caribbean",
  culture: "Jamaica",
  category: "fermented",

  tags: ["ginger-beer", "caribbean", "fermented", "probiotic", "ginger", "natural-carbonation"],
  difficulty: 2,
  activeTime: "20 min",
  totalTime: "14 days",
  ratioSystem: "weight",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",

  flavorRadar: { sweet: 3, salty: 0, sour: 3, bitter: 1, umami: 0, heat: 4 },

  ingredients: [
    { ingId: "ing_01", role: "Aromatic",   name: "Fresh ginger root, unpeeled and grated",  ratioValue: 100, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_02", role: "Sweetener",  name: "White cane sugar",                         ratioValue: 200, defaultUnit: "g", substitutions: ["raw cane sugar"] },
    { ingId: "ing_03", role: "Solvent",    name: "Filtered water (room temperature)",         ratioValue: 2000, defaultUnit: "g", substitutions: ["spring water"] },
    { ingId: "ing_04", role: "Acid",       name: "Fresh lemon or lime juice",                ratioValue: 60,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_05", role: "Sweetener",  name: "Extra sugar (for bottling carbonation)",   ratioValue: 20,  defaultUnit: "g", substitutions: ["honey"] },
    { ingId: "ing_06", role: "Solvent",    name: "Extra water (for diluting to drink strength)", ratioValue: 1000, defaultUnit: "g", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Build the plant",
      inputs: ["ing_01", "ing_02", "ing_03"],
      outputState: "active_ginger_plant",
      instructions: "In a clean glass jar, combine 1 teaspoon of grated fresh ginger (unpeeled — the skin carries the wild yeasts and bacteria that make ginger beer alive), 1 teaspoon of sugar, and 100 g of filtered water. Stir, cover loosely with a cloth, and leave at room temperature. Every day for 7 days, 'feed' the plant by adding another teaspoon of grated ginger and teaspoon of sugar and stirring. Within 3–4 days you will see bubbles forming at the surface, and the plant will develop a distinct, yeasty-gingery smell. By day 7 it should be vigorously fizzing when stirred. The cumulative daily feeding builds up a dense population of wild micro-organisms from the ginger's skin.",
      visualCue: {
        primaryTarget: "After 7 days: a cloudy, thick, aromatic liquid with visible bubbles rising constantly and a thick sediment of ginger at the bottom. Fizzes noticeably when stirred.",
        spectrum: [
          { state: "Underdone", description: "Day 4: barely any bubbles and a faint smell with no clear fermentation activity.", action: "Continue feeding daily. Some ginger root has fewer wild yeasts — add a small pinch of unwashed raisin for extra wild yeast inoculation." },
          { state: "Perfect",   description: "Day 7: vigorous bubbles, thick sediment, strong gingery-yeasty smell. Tastes sour and sharply gingery. Fizzes on the tongue.", action: "Strain and use the liquid to brew the ginger beer. Keep 200 g of the strained plant (solids plus some liquid) as your perpetual starter." },
          { state: "Overdone",  description: "Plant smells harshly of acetic acid (vinegar) rather than yeasty fermentation. Bubbles have subsided.", action: "Discard half and start feeding again from scratch — it has gone too acidic and the yeast population has been outcompeted by bacteria." },
        ],
      },
      feelCue: "By day 7 stir the plant vigorously and watch: it should foam up like a miniature science experiment, with bubbles breaking the surface for 20–30 seconds. Press a fingertip to the top and it will foam around your finger — that is a live, vigorous culture.",
    },
    {
      nodeId: "step_2",
      action: "Brew the beer",
      inputs: ["active_ginger_plant", "ing_02", "ing_03", "ing_04"],
      outputState: "brewed_ginger_beer",
      instructions: "Strain the ginger plant liquid through a fine-mesh sieve, pressing the ginger solids to extract all the liquid. Reserve the solids — this is your perpetual 'plant' to keep feeding. In a large glass jar or bucket, dissolve the remaining sugar in the filtered water (stir well, no heat needed). Add the strained plant liquid and the lemon juice. Stir vigorously, cover with a cloth, and leave at room temperature for 2–3 more days, stirring once daily. The now-diluted culture will continue to ferment the sugar water into a lightly alcoholic (0.5–1.5%), tangy, effervescent ginger beer.",
      visualCue: {
        primaryTarget: "After 2–3 days: a lightly cloudy, golden liquid with persistent small bubbles rising through it. The liquid has a pleasant sour edge on top of its sweetness when tasted.",
        spectrum: [
          { state: "Underdone", description: "Flat, clear, still very sweet with no sourness or bubbles visible.", action: "Leave another 24 hours — the plant liquid needs time to re-establish in the larger volume of water. Warmth helps (25–28 C is ideal)." },
          { state: "Perfect",   description: "Noticeably cloudy, fizzing gently when poured, balanced sweet-sour-ginger flavor. Tingly on the tongue. Smells of fresh ginger and fermentation.", action: "Bottle for carbonation or serve immediately over ice." },
          { state: "Overdone",  description: "Very sour and sharp. Dry with no residual sweetness. Flat (carbonation has been consumed).", action: "Bottle immediately with extra sugar for second-ferment carbonation. Dilute 1:1 with water to reduce harshness." },
        ],
      },
      feelCue: "Dip a spoon and taste the brewing ginger beer daily: on day one it tastes like very lightly fermented gingerade — mostly sweet with a hint of sourness. By day three it should tingle on your tongue with carbonation and taste unmistakably alive.",
    },
    {
      nodeId: "step_3",
      action: "Bottle and carbonate",
      inputs: ["brewed_ginger_beer", "ing_05", "ing_06"],
      outputState: "finished_ginger_beer",
      instructions: "Add the extra diluting water if you want a lighter, more sessionable drink. Stir in the bottling sugar (this feeds the residual yeast for in-bottle carbonation). Funnel into clean swing-top or plastic bottles, leaving 3 cm of headspace. Seal airtight. Leave at room temperature for 24–48 hours, squeezing plastic bottles daily to gauge pressure — they will go from soft to firm to rock-hard. When drum-tight (plastic bottles) or when a test bottle opens with a definitive hiss (glass), refrigerate all bottles immediately. Serve very cold over ice. Keep refrigerated and consume within 2 weeks.",
      visualCue: {
        primaryTarget: "A cold, golden, fizzing glass of ginger beer with abundant fine bubbles and a light haze. The first sip delivers a sharp ginger heat followed by citrus and faint tang.",
        spectrum: [
          { state: "Underdone", description: "Bottles are soft. Poured into a glass it's flat with no head. Taste is sweet and gingery but lifeless.", action: "Leave at room temperature another 12–24 hours, checking bottle firmness daily." },
          { state: "Perfect",   description: "Bottles are firm. Glass hisses on opening. Poured into a glass it cascades with bubbles and holds a light foam. Ginger heat, citrus brightness, faint tang, lightly sweet.", action: "Refrigerate all bottles. Best consumed within 2 weeks." },
          { state: "Overdone",  description: "Bottle is rock-hard or has already gushed violently on opening — a 'bottle bomb'.", action: "Refrigerate immediately to stop carbonation. Open very slowly over a sink, releasing pressure in small bursts. Next time refrigerate earlier." },
        ],
      },
      feelCue: "Squeeze a plastic bottle — the difference between underdone (soft, hollow) and perfect (drum-tight, firm under your palm) is unmistakable. A ready bottle of ginger beer hisses the moment the cap releases a crack of pressure.",
    },
  ],
};
