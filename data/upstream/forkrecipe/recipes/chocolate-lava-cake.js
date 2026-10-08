export default {
  repoId: "master_french_lava_cake_001",
  parentRepoId: null,
  slug: "chocolate-lava-cake",
  author: "ForkRecipe Kitchen",

  title: "Chocolate Lava Cake",
  description: "A paradox in a ramekin — a cake with a fully set chocolate shell that conceals a dark, flowing center of pure molten ganache, the interior flowing out in a slow, warm river when the spoon breaks through the thin crust.",
  cuisine: "French",
  culture: "French",
  category: "desserts",

  tags: ["chocolate", "lava", "molten", "french", "dessert", "baking", "elegant"],
  difficulty: 3,
  activeTime: "20 min",
  totalTime: "45 min",
  ratioSystem: "parts",

  stars: 2891,
  forks: 312,
  contributors: 74,
  license: "CC-BY-SA",
  createdAt: "2024-08-15",
  updatedAt: "2025-05-02",

  flavorRadar: { sweet: 4, salty: 1, sour: 0, bitter: 3, umami: 1, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Fat",       name: "Unsalted butter, plus extra for ramekins",       ratioValue: 60,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_02", role: "Structure", name: "Dark chocolate (70% cacao), roughly chopped",    ratioValue: 60,  defaultUnit: "parts", substitutions: ["bittersweet chocolate chips"] },
    { ingId: "ing_03", role: "Protein",   name: "Large eggs (whole)",                             ratioValue: 40,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Protein",   name: "Egg yolks",                                      ratioValue: 20,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Sweetener", name: "Powdered (icing) sugar",                        ratioValue: 30,  defaultUnit: "parts", substitutions: ["caster sugar"] },
    { ingId: "ing_06", role: "Structure", name: "All-purpose flour",                              ratioValue: 12,  defaultUnit: "parts", substitutions: ["cake flour"] },
    { ingId: "ing_07", role: "Seasoning", name: "Fine sea salt",                                  ratioValue: 1,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_08", role: "Aromatic",  name: "Pure vanilla extract",                           ratioValue: 2,   defaultUnit: "parts", substitutions: ["vanilla bean paste"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Prep ramekins",
      inputs: ["ing_01"],
      outputState: "prepared_ramekins",
      instructions: "Butter four 180ml (6oz) ramekins generously and dust with cocoa powder or flour, tapping out the excess. The butter-cocoa coating must be thorough and even — any bare spot and the cake will stick, ruining the unmolding. Refrigerate the prepared ramekins while you make the batter. Cold ramekins help the outer shell set quickly in the oven, creating the temperature differential that keeps the center liquid.",
      visualCue: {
        primaryTarget: "The interior of each ramekin is uniformly coated in a thin, matte cocoa-brown film. No bare or shiny patches. The coating extends all the way to the rim.",
        spectrum: [
          { state: "Underdone", description: "Thin coverage with visible bare or shiny patches. Butter looks streaky rather than uniform. Cocoa hasn't adhered in spots.", action: "Butter and dust again — this step is the insurance policy for a clean unmold. Never rush ramekin prep." },
          { state: "Perfect",   description: "Complete, matte, uniform coverage from base to rim. When you tip the ramekin, no cocoa falls — it has adhered to the butter completely.", action: "Refrigerate the ramekins while making the batter." },
          { state: "Overdone",  description: "Heavy, thick layer of cocoa with clumps. Will leave a gritty, powdery exterior on the baked cake.", action: "Tap firmly to shake out the excess before refrigerating." },
        ],
      },
      feelCue: "Run a finger along the interior wall — it should feel slightly dry and grippy, like fine-grit sandpaper coated in fine cocoa, not slick or bare.",
    },
    {
      nodeId: "step_2",
      action: "Melt",
      inputs: ["ing_01", "ing_02"],
      outputState: "chocolate_butter_base",
      instructions: "Combine the butter and chopped chocolate in a heatproof bowl over a pot of barely simmering water (bain-marie). The water should not touch the bottom of the bowl. Stir gently and frequently until the mixture is completely melted and smooth — remove from heat the moment the last solid piece has melted, as continuing to heat will make the chocolate grainy. The finished mixture should be glossy, fluid, and smell deeply of dark chocolate.",
      visualCue: {
        primaryTarget: "A glossy, smooth, uniformly dark chocolate mixture with no lumps or graininess. It should flow like a thin, velvety sauce when the bowl is tilted.",
        spectrum: [
          { state: "Underdone", description: "Lumps of partially melted chocolate still visible. Butter and chocolate have not fully incorporated — they look separated or streaky.", action: "Continue stirring over barely simmering water. Move the bowl off the steam occasionally to avoid overheating." },
          { state: "Perfect",   description: "Perfectly smooth, glossy, and homogenous. Flows in a continuous ribbon from a spoon. A deep, clean chocolate scent with no bitterness.", action: "Remove from heat and cool to room temperature before adding eggs." },
          { state: "Overdone",  description: "The chocolate has seized — it looks grainy, dull, and stiff rather than glossy and fluid. It may have a slightly scorched smell.", action: "Add a tablespoon of warm cream and stir vigorously — this can sometimes rescue seized chocolate. If it smooths out, proceed." },
        ],
      },
      feelCue: "The melted chocolate should feel warm but not hot on the inside of your wrist — approximately body temperature. Hotter than that and it will cook the eggs when added; cooler and it will be thick and hard to incorporate.",
    },
    {
      nodeId: "step_3",
      action: "Whisk",
      inputs: ["ing_03", "ing_04", "ing_05", "ing_07", "ing_08"],
      outputState: "egg_sugar_mixture",
      instructions: "In a large bowl, whisk the whole eggs, yolks, powdered sugar, salt, and vanilla vigorously by hand for 2 full minutes until the mixture is pale, thick, and ribbon-like. This step aerates the batter and gives the outer shell its slightly cakey structure — without this whipping, the cake will be more like set ganache throughout rather than having a defined shell. The mixture should lighten in color noticeably.",
      visualCue: {
        primaryTarget: "The mixture has turned from deep gold to a pale, creamy yellow and has roughly doubled in volume. When the whisk is lifted, it falls back in thick, lazy ribbons that hold briefly before dissolving.",
        spectrum: [
          { state: "Underdone", description: "Still deeply golden and thin. No ribbon formation. Bubbles are large and unstable rather than fine and persistent.", action: "Continue whisking — this needs 2 full minutes of vigorous activity. Use an electric hand mixer if your arm is tiring." },
          { state: "Perfect",   description: "Pale, creamy, and aerated. Ribbon test passes — the mixture holds its shape briefly when drizzled from the whisk. Volume has increased visibly.", action: "Fold in the cooled chocolate mixture." },
          { state: "Overdone",  description: "The mixture has been beaten so long it looks stiff and slightly dry, and is not flowing smoothly. Over-aerated egg foam.", action: "Proceed — the excess air will escape during baking and the structural outcome is the same." },
        ],
      },
      feelCue: "When you let the whisk drip over the surface, the ribbon should sit on top for a moment before slowly sinking back in — this is the visual test that the eggs have trapped enough air to build the structure.",
    },
    {
      nodeId: "step_4",
      action: "Fold",
      inputs: ["chocolate_butter_base", "egg_sugar_mixture", "ing_06"],
      outputState: "lava_cake_batter",
      instructions: "Pour the cooled chocolate mixture into the egg mixture and fold gently with a spatula until just combined. Sift the flour over the top and fold again with minimal strokes — 8–10 folds maximum. Overmixing develops gluten and toughens the exterior shell. The batter should be smooth, dark, and just barely homogenous — stop the moment no flour streaks remain.",
      visualCue: {
        primaryTarget: "Smooth, dark, glossy batter with no flour streaks visible. It pours in a slow, thick ribbon. No large bubbles or streaks of unmixed chocolate.",
        spectrum: [
          { state: "Underdone", description: "Flour streaks still visible as pale ribbons through the dark batter. Chocolate and egg layers still marbled rather than combined.", action: "Fold 3–4 more times, turning the bowl as you go. Keep strokes large and deliberate." },
          { state: "Perfect",   description: "Uniformly dark and glossy. No flour streaks. No chocolate streaks. Falls in a slow, even ribbon from the spatula.", action: "Divide into prepared ramekins and bake or refrigerate." },
          { state: "Overdone",  description: "Batter has been over-folded and is smooth to the point of being elastic — you can see the batter pulling slightly when dropped. Gluten has developed.", action: "Bake immediately — the exterior will be slightly denser but the molten center will still work." },
        ],
      },
      feelCue: "The batter should feel almost airy when you fold it — the egg foam is still present, and the batter should feel lighter than it looks. A heavy, dense batter means the eggs were cold or under-whisked.",
    },
    {
      nodeId: "step_5",
      action: "Bake",
      inputs: ["lava_cake_batter", "prepared_ramekins"],
      outputState: "finished_lava_cake",
      instructions: "Fill each prepared ramekin three-quarters full. Bake at 220°C (425°F) for exactly 10–12 minutes — the timing is everything. The edges should be set and pulling away from the ramekin walls, but the center should visibly jiggle when the pan is shaken. Run a thin knife around the edge of each cake, place a warm plate on top, and invert in one decisive movement. Wait 10 seconds, then lift the ramekin. Serve immediately — the center will continue to set within 2 minutes.",
      visualCue: {
        primaryTarget: "Set, slightly domed top with matte dry surface. When the pan is shaken gently, the center of each cake wobbles distinctly while the edges remain firm.",
        spectrum: [
          { state: "Underdone", description: "The entire top surface wobbles when shaken. The edges haven't pulled away from the ramekin walls. The batter may still look wet and shiny in the center.", action: "Return for 2 more minutes. The difference between underdone and perfect here is approximately 2 minutes of baking time." },
          { state: "Perfect",   description: "Edges set and matte. Center jiggles but doesn't ripple like liquid. Top is domed and dry-looking. The aroma is intense dark chocolate.", action: "Remove from oven. Wait 1 minute, then invert onto warm plates." },
          { state: "Overdone",  description: "The entire top is firm and no jiggle remains. The edges have pulled fully away and may be slightly cracked. No movement at all.", action: "Invert anyway — you have a dense, fully baked chocolate cake. Still delicious, just not lava." },
        ],
      },
      feelCue: "When you invert the ramekin and lift it away, a warm dome of chocolate cake should release cleanly. Within 5 seconds, a crack should appear at the top as the molten center begins to push through — that is the moment to serve.",
    },
  ],
};
