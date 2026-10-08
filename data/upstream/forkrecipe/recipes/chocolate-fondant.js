export default {
  repoId: "master_french_chocolate_fondant_001",
  parentRepoId: null,
  slug: "chocolate-fondant",
  author: "ForkRecipe Kitchen",

  title: "Chocolate Fondant (Molten Lava Cake)",
  description: "A deeply dark individual chocolate cake with a barely-set shell that collapses on the plate to release a river of liquid ganache from the centre — the margin between triumph and disaster is exactly two minutes in the oven.",
  cuisine: "French",
  culture: "French",
  category: "desserts",

  tags: ["chocolate", "dessert", "molten", "individual", "dinner-party", "baking"],
  difficulty: 3,
  activeTime: "25 min",
  totalTime: "45 min",
  ratioSystem: "parts",

  stars: 2740,
  forks: 512,
  contributors: 63,
  license: "CC-BY-SA",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",

  flavorRadar: { sweet: 3, salty: 1, sour: 0, bitter: 4, umami: 1, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Fat",       name: "Unsalted butter, plus extra for greasing", ratioValue: 100, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_02", role: "Binder",    name: "Dark chocolate (70% cocoa solids), chopped", ratioValue: 100, defaultUnit: "g", substitutions: ["bittersweet chocolate 66-72%"] },
    { ingId: "ing_03", role: "Protein",   name: "Whole eggs",                                 ratioValue: 2,   defaultUnit: "whole", substitutions: [] },
    { ingId: "ing_04", role: "Binder",    name: "Egg yolks",                                  ratioValue: 2,   defaultUnit: "whole", substitutions: [] },
    { ingId: "ing_05", role: "Sweetener", name: "Caster sugar",                               ratioValue: 60,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_06", role: "Structure", name: "Plain flour, plus extra for dusting",        ratioValue: 20,  defaultUnit: "g", substitutions: ["rice flour (gluten-free)"] },
    { ingId: "ing_07", role: "Seasoning", name: "Fine sea salt",                              ratioValue: 1,   defaultUnit: "g", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Melt",
      inputs: ["ing_01", "ing_02"],
      outputState: "chocolate_butter_base",
      instructions: "Melt butter and chocolate together in a heatproof bowl set over a pan of barely simmering water (bain-marie). Do not let the bowl touch the water. Stir gently until fully melted and glossy. Remove from heat and set aside to cool slightly — you want it warm, not hot (around 40 C). Meanwhile, butter and flour six individual dariole moulds or ramekins (100 ml), tapping out excess flour.",
      visualCue: {
        primaryTarget: "A uniformly glossy, fluid ganache with no lumps or graininess. The surface shines like lacquered wood and falls in a smooth ribbon from the spoon.",
        spectrum: [
          { state: "Underdone", description: "Butter is melted but chocolate still has lumps. The mixture looks broken and grainy.", action: "Continue stirring over gentle heat — even gentle heat will melt remaining pieces." },
          { state: "Perfect",   description: "Smooth, glossy, fluid. Temperature feels warm but not burning when tested on the inner wrist.", action: "Remove from heat and cool 5 minutes before adding eggs." },
          { state: "Overdone",  description: "The mixture has seized — it is thick, grainy, and dull. Chocolate has burned.", action: "A seized ganache cannot be recovered. Start again with fresh chocolate and butter, using lower heat." },
        ],
      },
      feelCue: "The base should flow like thick cream and smell intensely of dark chocolate, with a hint of warm dairy — not smoky, not sharp.",
    },
    {
      nodeId: "step_2",
      action: "Whisk",
      inputs: ["ing_03", "ing_04", "ing_05"],
      outputState: "egg_sugar_ribbon",
      instructions: "In a large bowl, whisk together the whole eggs, egg yolks, and caster sugar vigorously by hand (or with an electric whisk) for 3–4 minutes until the mixture is pale, thick, and falls from the whisk in a wide ribbon that holds its shape on the surface for 2–3 seconds before dissolving. This aeration is what gives the fondant its thin, souffle-like shell.",
      visualCue: {
        primaryTarget: "A pale, creamy-yellow mixture that falls from the lifted whisk in a thick, slow ribbon, writing on itself for a moment before sinking back in.",
        spectrum: [
          { state: "Underdone", description: "Still liquid and yellow, no change in volume or colour. Drips off the whisk in thin threads.", action: "Keep whisking — the sugar needs to dissolve and the eggs need aeration." },
          { state: "Perfect",   description: "Pale and doubled in volume. Ribbon holds for 2-3 seconds. The mixture feels significantly thicker when the whisk lifts.", action: "Fold in the chocolate base immediately." },
          { state: "Overdone",  description: "Over-whisked by machine: very stiff and mousse-like, leaving stiff peaks. It will be difficult to fold without deflating.", action: "Fold very gently — the fondant will still work but may have a drier shell." },
        ],
      },
      feelCue: "When you lift the whisk, the ribbon should fall slowly and with weight, like a wide satin ribbon rather than a thread of water.",
    },
    {
      nodeId: "step_3",
      action: "Fold",
      inputs: ["egg_sugar_ribbon", "chocolate_butter_base", "ing_06", "ing_07"],
      outputState: "fondant_batter",
      instructions: "Pour the warm chocolate-butter base into the egg-sugar ribbon. Fold with a large spatula using wide, deliberate scooping motions from the bottom of the bowl — do not stir. When almost combined, sift over the flour and salt, then fold until just incorporated with no dry streaks visible. The batter should be glossy, fluid, and airy. Divide evenly between the prepared moulds, filling to 1 cm below the rim. Refrigerate for at least 20 minutes (up to 24 hours).",
      visualCue: {
        primaryTarget: "A smooth, glossy, dark batter with no streaks of flour or egg. It pours cleanly into the moulds and the surface is level and even.",
        spectrum: [
          { state: "Underdone", description: "Streaks of pale egg mixture and streaks of dark chocolate still visible. Unmixed pockets of flour.", action: "Continue folding with 4-5 more strokes — each fold incorporates roughly 10%." },
          { state: "Perfect",   description: "Uniformly dark and glossy. Batter holds its level in the mould without doming or sinking. It smells deeply chocolatey.", action: "Refrigerate until ready to bake." },
          { state: "Overdone",  description: "Batter has deflated — it is dense and liquid, no longer airy. Over-folded.", action: "Bake anyway. The shell will be denser and the liquid centre smaller but the fondant will still work." },
        ],
      },
      feelCue: "The batter should pour from the spatula like thick double cream — not as fluid as water, but not stiff enough to hold a shape. You should see small bubbles suspended throughout.",
    },
    {
      nodeId: "step_4",
      action: "Bake",
      inputs: ["fondant_batter"],
      outputState: "finished_fondant",
      instructions: "Preheat oven to 200 C (fan 190 C). Place moulds on a baking tray and bake for exactly 10–12 minutes (10 for a very liquid centre, 12 for a fudgey-flowing one). The exterior should be set and pulling away from the mould sides very slightly; the centre should still wobble. Run a knife around the edge, invert onto warmed plates, and wait 5 seconds before lifting the mould. Serve immediately — the centre begins to set within 2 minutes of leaving the oven.",
      visualCue: {
        primaryTarget: "Fully risen with a domed, matte, set surface. The mould lifts cleanly to reveal a glossy dark cake that holds its shape for 3–4 seconds before the centre begins to flow.",
        spectrum: [
          { state: "Underdone", description: "The top is still shiny and liquid. The cake collapses completely when inverted — more a puddle than a cake.", action: "Return the mould to the oven for 2 more minutes. The line between raw and right is narrow." },
          { state: "Perfect",   description: "Domed and set on top, matte, pulling from the mould. Inverts cleanly. The centre flows slowly and glossily when cut or pressed.", action: "Plate immediately and bring to the table at once." },
          { state: "Overdone",  description: "The top is fully set and dry-looking. When cut, the interior is uniformly sponge with no liquid centre — a chocolate cake, not a fondant.", action: "Accept the result. Serve with warm caramel sauce to compensate for the lost centre." },
        ],
      },
      feelCue: "Tap the top of the mould gently with a fingertip — the shell should feel set and spring back, but the mass beneath it should shift and ripple slightly, like tapping a water balloon.",
    },
  ],
};
