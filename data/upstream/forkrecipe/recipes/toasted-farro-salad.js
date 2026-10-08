export default {
  repoId: "master_italian_toasted_farro_salad_001",
  parentRepoId: null,
  slug: "toasted-farro-salad",
  author: "ForkRecipe Kitchen",

  title: "Toasted Farro Salad with Roasted Vegetables",
  description: "Whole farro toasted in a dry pan until nutty and golden, then simmered until pleasantly chewy — tossed warm with caramelized roasted vegetables, fresh herbs, lemon, and good olive oil in the manner of Tuscan cucina povera: simply excellent ingredients treated with respect.",
  cuisine: "Italian",
  culture: "Tuscan",
  category: "grains",

  tags: ["vegan", "italian", "tuscan", "farro", "salad", "roasted-vegetables"],
  difficulty: 2,
  activeTime: "30 min",
  totalTime: "1 hour",
  ratioSystem: "weight",

  stars: 0, forks: 0, contributors: 1, license: "CC-BY-SA",
  createdAt: "2026-06-27", updatedAt: "2026-06-27",

  flavorRadar: { sweet: 1, salty: 3, sour: 3, bitter: 1, umami: 3, heat: 1 },

  ingredients: [
    { ingId: "ing_01", role: "Starch",    name: "Whole farro (not pearled)",               ratioValue: 300, defaultUnit: "g", substitutions: ["semi-pearled farro (reduce time by 15 min)", "spelt"] },
    { ingId: "ing_02", role: "Liquid",    name: "Water or vegetable stock",                ratioValue: 900, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_03", role: "Aromatic",  name: "Zucchini, cut into 2 cm pieces",          ratioValue: 250, defaultUnit: "g", substitutions: ["bell peppers"] },
    { ingId: "ing_04", role: "Aromatic",  name: "Cherry tomatoes, halved",                 ratioValue: 200, defaultUnit: "g", substitutions: ["sun-dried tomatoes (use fewer)"] },
    { ingId: "ing_05", role: "Aromatic",  name: "Red onion, cut into wedges",              ratioValue: 150, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_06", role: "Aromatic",  name: "Eggplant, cut into 2 cm cubes",           ratioValue: 200, defaultUnit: "g", substitutions: ["roasted fennel"] },
    { ingId: "ing_07", role: "Fat",       name: "Extra-virgin olive oil (divided)",        ratioValue: 80,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_08", role: "Acid",      name: "Fresh lemon juice",                       ratioValue: 30,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_09", role: "Citrus",    name: "Lemon zest (1 lemon)",                   ratioValue: 3,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_10", role: "Herb",      name: "Fresh flat-leaf parsley, roughly chopped", ratioValue: 20, defaultUnit: "g", substitutions: ["basil", "mint"] },
    { ingId: "ing_11", role: "Herb",      name: "Fresh mint leaves, torn",                 ratioValue: 10,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_12", role: "Seasoning", name: "Fine sea salt",                           ratioValue: 8,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_13", role: "Spice",     name: "Dried chili flakes",                      ratioValue: 2,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_14", role: "Garnish",   name: "Toasted pine nuts or walnuts",            ratioValue: 40,  defaultUnit: "g", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Toast",
      inputs: ["ing_01"],
      outputState: "toasted_farro",
      instructions: "Place the farro in a large dry skillet over medium heat. Toast, stirring constantly, for 4–6 minutes until the grains smell nutty and are golden — some grains may lightly pop. This step is optional but transforms the flavor dramatically. The toasted grains will have a nuttier, more complex flavor after cooking.",
      visualCue: {
        primaryTarget: "Grains have deepened from pale tan to golden-brown. A cloud of nutty, almost popcorn-like aroma rises from the pan.",
        spectrum: [
          { state: "Underdone", description: "Grains are still pale. No aroma change from raw farro.", action: "Continue toasting over medium heat — the color change is subtle but real." },
          { state: "Perfect",   description: "Golden-brown color on most grains. Clearly nutty, toasted smell. Some grains may have tiny cracks.", action: "Transfer immediately to a pot for cooking." },
          { state: "Overdone",  description: "Dark brown grains with a scorched, harsh smell.", action: "Discard and start over — burnt farro will make the entire salad bitter." },
        ],
      },
      feelCue: "Pinch a toasted grain — it should be dry and hard, unchanged in texture but warm and fragrant. The aroma tells you more than the color — when the kitchen smells of toasted wheat and hazelnuts, you are there.",
    },
    {
      nodeId: "step_2",
      action: "Simmer",
      inputs: ["toasted_farro", "ing_02", "ing_12"],
      outputState: "cooked_farro",
      instructions: "Transfer toasted farro to a pot. Cover with generously salted water or stock (3 parts liquid to 1 part farro by volume). Bring to a boil, reduce to a steady simmer, and cook uncovered for 30–40 minutes for whole farro (20–25 for semi-pearled) until the grains are tender but still have a distinct chew — al dente, like a well-cooked barley. Drain any excess liquid.",
      visualCue: {
        primaryTarget: "Plump, golden-brown grains that have roughly doubled in size. A clean bite reveals no white chalky center but a firm, pleasant resistance.",
        spectrum: [
          { state: "Underdone", description: "White chalky center when bitten. Grains still tight and unswollen.", action: "Continue simmering — farro is notoriously slow to cook through." },
          { state: "Perfect",   description: "Fully swollen, uniformly golden. Definite chew but no hardness. Grains separate cleanly when stirred.", action: "Drain and toss immediately with half the olive oil to prevent sticking." },
          { state: "Overdone",  description: "Grains are splitting, soft, starchy. No chew.", action: "Drain immediately. The salad will be slightly mushy but the flavors will hold." },
        ],
      },
      feelCue: "Bite through a grain of farro — you should feel a distinct, firm resistance before it gives, then a slightly creamy, starchy interior. It should chew like a very al dente pasta, not yield like rice.",
    },
    {
      nodeId: "step_3",
      action: "Roast",
      inputs: ["ing_03", "ing_04", "ing_05", "ing_06", "ing_07", "ing_12"],
      outputState: "roasted_vegetables",
      instructions: "Toss all the vegetables with a generous amount of olive oil, salt, and chili flakes on a large sheet pan. Spread in a single layer — do not crowd or they will steam. Roast at 220 C (425 F) for 25–30 minutes, turning once halfway, until caramelized and charred at the edges — particularly the cherry tomatoes, which should burst and concentrate.",
      visualCue: {
        primaryTarget: "Deeply caramelized vegetables with charred edges. Cherry tomatoes have burst, collapsed, and darkened. Zucchini is golden. Onion edges are dark and crispy.",
        spectrum: [
          { state: "Underdone", description: "Vegetables are soft and pale — no caramelization, no charring.", action: "Raise oven temperature or continue roasting. Pale roasted vegetables taste boiled." },
          { state: "Perfect",   description: "Dark golden edges on all vegetables. Tomatoes burst and jammy. Zucchini golden with grill-mark-style char. Kitchen smells of sweet, concentrated vegetables.", action: "Transfer while hot to toss with farro." },
          { state: "Overdone",  description: "Vegetables are very dark or burnt. Tomatoes are dried out and hard.", action: "Pick out and discard any truly burnt pieces. The slightly over-charred ones add good flavor." },
        ],
      },
      feelCue: "Press a piece of roasted zucchini — it should yield completely, offer no resistance, and feel soft but not wet. The skin should feel slightly blistered and papery, the interior like warm, collapsed softness.",
    },
    {
      nodeId: "step_4",
      action: "Toss",
      inputs: ["cooked_farro", "roasted_vegetables", "ing_07", "ing_08", "ing_09", "ing_10", "ing_11", "ing_13", "ing_14"],
      outputState: "finished_farro_salad",
      instructions: "While both the farro and vegetables are still warm, combine them in a large bowl. Drizzle with remaining olive oil and lemon juice. Add lemon zest, chili flakes, parsley, mint, and toasted nuts. Toss together gently — you want the warm farro to absorb the lemon and oil. Taste and adjust salt, acid, and oil. The salad is excellent warm, but also very good at room temperature.",
      visualCue: {
        primaryTarget: "A warm, golden-brown salad with vivid caramelized vegetables, bright green herbs, and glistening farro. Each component distinct but harmoniously combined.",
        spectrum: [
          { state: "Underdone", description: "Salad looks dry and underdressed — herbs are dull and the farro looks starchy.", action: "Add more olive oil and lemon juice, toss again. Taste: it should sing with acid and fat." },
          { state: "Perfect",   description: "Gleaming, fragrant, herb-studded. The lemon oil has coated every grain. Warm steam rising from the bowl.", action: "Serve immediately as a main or allow to cool to room temperature." },
          { state: "Overdone",  description: "Salad is overdressed and soggy — pooling with oil and lemon at the bottom.", action: "Add more plain farro to absorb excess dressing." },
        ],
      },
      feelCue: "Toss the finished salad with your hands — each grain of farro should move freely, coated in oil and lemon, clinging slightly to the warm vegetables but not clumping. The herbs should feel fresh and bright against the warm grains.",
    },
  ],
};
