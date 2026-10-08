export default {
  repoId: "master_french_tarte_au_citron_001",
  parentRepoId: null,
  slug: "tarte-au-citron",
  author: "ForkRecipe Kitchen",

  title: "Tarte au Citron",
  description: "A buttery pâte sablée shell filled with a silken, intensely sour lemon curd just set enough to slice cleanly — the tart that separates timid lemon desserts from the real thing.",
  cuisine: "French",
  culture: "French pastry",
  category: "desserts",

  tags: ["lemon tart", "french", "pastry", "citrus", "dessert"],
  difficulty: 4,
  activeTime: "45 min",
  totalTime: "3 hr",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",

  flavorRadar: { sweet: 3, salty: 1, sour: 5, bitter: 1, umami: 0, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure", name: "All-purpose flour",             ratioValue: 100, defaultUnit: "parts", substitutions: ["cake flour (more crumbly result)"] },
    { ingId: "ing_02", role: "Fat",       name: "Cold unsalted butter (cubed)",  ratioValue: 60,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Sweetener", name: "Icing sugar (sifted)",          ratioValue: 35,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Binder",    name: "Large egg yolk",               ratioValue: 10,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Seasoning", name: "Fine salt",                    ratioValue: 1,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Acid",      name: "Fresh lemon juice (approx. 4 large lemons)", ratioValue: 60, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Citrus",    name: "Lemon zest (finely grated, same lemons)", ratioValue: 5, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_08", role: "Protein",   name: "Large eggs (whole)",           ratioValue: 80,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_09", role: "Sweetener", name: "Caster sugar",                 ratioValue: 70,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_10", role: "Fat",       name: "Unsalted butter (cold, cubed, for curd)", ratioValue: 50, defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Chill",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_04", "ing_05"],
      outputState: "pate_sablee_shell",
      instructions: "In a food processor or by hand, combine the flour, icing sugar, and salt. Add the cold cubed butter and pulse until the mixture resembles fine sand — no visible butter chunks. Add the egg yolk and 1–2 teaspoons of cold water and pulse until the dough just comes together. Do not overwork. Press into a flat disc, wrap, and refrigerate for 30 minutes. Roll to 3 mm thickness and line a 22–24 cm fluted tart tin with a removable base. Press gently into the flutes, trim the top neatly, and refrigerate for another 20 minutes. Blind-bake at 180°C (355°F) lined with parchment and weights for 15 minutes, then remove weights and bake a further 10–12 minutes until the base is a uniform pale golden-brown.",
      visualCue: {
        primaryTarget: "A fully golden, dry, set shell with crisp flute definition and no shrinkage — the base should look biscuit-pale, not white or doughy.",
        spectrum: [
          { state: "Underdone", description: "The base is still pale and feels soft when pressed — it will become soggy under the lemon curd.", action: "Return to oven for 5 more minutes without weights until visibly golden and dry." },
          { state: "Perfect",   description: "A uniform pale gold, completely set. Crisp flute ridges. Smells of shortbread. The base makes a papery crinkle sound when lightly tapped.", action: "Allow to cool completely in the tin before pouring in the curd." },
          { state: "Overdone",  description: "Edges are dark brown and slightly bitter-smelling. The base has a few darker spots.", action: "Trim any very dark edges carefully. Fill and serve — the curd will counterbalance any slight over-bake." },
        ],
      },
      feelCue: "Touch the cooled base — it should feel dry and papery-crisp under your fingertip, as if you are touching a thin biscuit through the tin.",
    },
    {
      nodeId: "step_2",
      action: "Whisk",
      inputs: ["ing_06", "ing_07", "ing_08", "ing_09"],
      outputState: "raw_lemon_curd",
      instructions: "In a medium bowl, whisk together the eggs, caster sugar, lemon juice, and lemon zest until the sugar is fully dissolved and the mixture is smooth and uniformly pale yellow. Do not beat to foam — this should be whisked just enough to combine. Set the bowl over a saucepan of barely simmering water (bain-marie), making sure the base of the bowl does not touch the water.",
      visualCue: {
        primaryTarget: "A smooth, pale lemon-yellow liquid that is completely homogenous, with no sugar grains or undissolved streaks visible when held up to light.",
        spectrum: [
          { state: "Underdone", description: "Sugar granules are still visible and the mixture feels slightly gritty on the tongue.", action: "Whisk for another minute — the sugar must be fully dissolved before the heat is applied." },
          { state: "Perfect",   description: "Uniformly pale, silky, and fully smooth. The lemon aroma is sharp and vivid — almost aggressive.", action: "Place over the bain-marie and begin whisking continuously." },
          { state: "Overdone",  description: "Mixture has been beaten to a foam. Too much air will cause the finished curd to have a spongy rather than silken texture.", action: "Let the foam settle by resting the bowl for 2 minutes, then skim any foam from the surface before cooking." },
        ],
      },
      feelCue: "Rub the mixture between your fingers — it should feel completely smooth, with no granular friction from undissolved sugar.",
    },
    {
      nodeId: "step_3",
      action: "Temper",
      inputs: ["raw_lemon_curd", "ing_10"],
      outputState: "lemon_curd",
      instructions: "Cook the lemon mixture over the bain-marie, whisking constantly with a flexible spatula or whisk, scraping the sides of the bowl frequently. The mixture will slowly thicken. Continue cooking until it reaches 82°C (180°F) on a thermometer, or the nappe stage: when you draw a finger across the back of a spoon coated in curd, it should leave a clean line. This takes 8–12 minutes. Remove from heat immediately and whisk in the cold butter cubes in two additions, waiting for each to incorporate before adding more. The butter is what makes the curd silky rather than just thick.",
      visualCue: {
        primaryTarget: "A glossy, lemon-yellow curd that coats the back of a spoon thickly and leaves a clean, defined finger trace that doesn't fill back in.",
        spectrum: [
          { state: "Underdone", description: "Curd is still very liquid and flows freely off the spoon. A finger trace fills back in immediately. Under 78°C.", action: "Continue cooking over the bain-marie, whisking constantly. Patience — the thickening happens gradually, then quickly." },
          { state: "Perfect",   description: "Thick, pourable, glossy curd. Clean finger line on the spoon stays defined. Temperature reads 82°C. After butter is added, it is even more silky and light-reflecting.", action: "Strain through a fine sieve into the cooled tart shell immediately." },
          { state: "Overdone",  description: "Curd has gone past 85°C — scrambled egg threads may be visible. The texture will be grainy rather than silken.", action: "Strain urgently through a fine sieve; aggressive straining can rescue a slightly over-cooked curd." },
        ],
      },
      feelCue: "Dip a clean finger into the warm curd — it should coat your finger in a smooth, glossy layer that clings without dripping, and the sharp lemon flavor should hit immediately.",
    },
    {
      nodeId: "step_4",
      action: "Set",
      inputs: ["pate_sablee_shell", "lemon_curd"],
      outputState: "finished_tarte_au_citron",
      instructions: "Strain the finished warm curd through a fine sieve directly into the cooled tart shell. Gently tap the tin on the counter twice to level the surface and release any air bubbles. Transfer to the refrigerator and chill uncovered for at least 2 hours, or until the curd has set to a sliceable consistency. Serve at room temperature — remove from the fridge 20–30 minutes before serving so the curd softens slightly to its ideal silken texture.",
      visualCue: {
        primaryTarget: "A flat, perfectly level, glossy surface the color of ripe lemons, reflecting light like a mirror with no cracks, pits, or uneven patches.",
        spectrum: [
          { state: "Underdone", description: "Curd is still liquid in the center — it flows when the tin is tilted. The surface has no set appearance.", action: "Return to the fridge for another hour. The curd needs time to set via the egg proteins and butter fat crystallization." },
          { state: "Perfect",   description: "The surface is completely flat, smooth, and glossy — it looks almost lacquered. When pressed very gently at the center it yields slightly and springs back. A knife cuts cleanly through with no liquid flowing.", action: "Remove from the tin carefully and serve at room temperature." },
          { state: "Overdone",  description: "Surface has cracked or the curd has shrunk slightly away from the shell edges. It may have been chilled too aggressively.", action: "The flavor is unaffected — serve as is. A fine dusting of icing sugar can mask surface cracks cosmetically." },
        ],
      },
      feelCue: "When a slice is cut and lifted, the curd should hold its angle cleanly — if it slides, it needs more chill time; if it shatters, it was over-set and slightly over-cooked.",
    },
  ],
};
