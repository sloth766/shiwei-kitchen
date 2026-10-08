export default {
  repoId: "master_american_pumpkin_pie_001",
  parentRepoId: null,
  slug: "pumpkin-pie",
  author: "ForkRecipe Kitchen",

  title: "Pumpkin Pie",
  description: "A silky, trembling custard of pumpkin and warm spice set in a buttery, shatteringly crisp crust — the pie that makes an entire holiday smell like cinnamon and brown sugar from the moment it goes into the oven.",
  cuisine: "American",
  culture: "American",
  category: "desserts",

  tags: ["american", "pumpkin", "pie", "thanksgiving", "dessert"],
  difficulty: 2,
  activeTime: "25 min",
  totalTime: "1 hr 30 min",
  ratioSystem: "parts",

  stars: 1756,
  forks: 162,
  contributors: 20,
  license: "CC-BY-SA",
  createdAt: "2024-10-01",
  updatedAt: "2025-10-22",

  flavorRadar: { sweet: 3, salty: 1, sour: 0, bitter: 1, umami: 0, heat: 1 },

  ingredients: [
    { ingId: "ing_01", role: "Structure", name: "9-inch pie shell, par-baked (homemade or store-bought)", ratioValue: 30, defaultUnit: "parts", substitutions: ["graham cracker crust", "gingersnap crust"] },
    { ingId: "ing_02", role: "Starch",    name: "Pumpkin puree, canned (not pie filling)",               ratioValue: 60, defaultUnit: "parts", substitutions: ["roasted butternut squash puree", "kabocha squash puree"] },
    { ingId: "ing_03", role: "Dairy",     name: "Heavy cream",                                            ratioValue: 25, defaultUnit: "parts", substitutions: ["evaporated milk (more traditional)", "coconut cream"] },
    { ingId: "ing_04", role: "Binder",    name: "Large eggs (2 whole + 1 yolk)",                         ratioValue: 15, defaultUnit: "parts", substitutions: ["3 whole eggs (less rich)"] },
    { ingId: "ing_05", role: "Sweetener", name: "Dark brown sugar",                                      ratioValue: 20, defaultUnit: "parts", substitutions: ["granulated sugar", "maple syrup (reduce cream slightly)"] },
    { ingId: "ing_06", role: "Spice",     name: "Pumpkin pie spice (cinnamon, ginger, nutmeg, clove, allspice)", ratioValue: 2, defaultUnit: "parts", substitutions: ["individual spices blended fresh"] },
    { ingId: "ing_07", role: "Seasoning", name: "Kosher salt and vanilla extract",                       ratioValue: 1,  defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Par-bake crust",
      inputs: ["ing_01"],
      outputState: "par_baked_crust",
      instructions: "If using a raw pie shell, line it with parchment and fill with pie weights or dried beans. Bake at 190°C for 15 minutes. Remove weights and parchment and bake a further 5 minutes until the base is just set and dry, but not browned. This par-baking prevents the classic soggy bottom. Cool slightly before filling.",
      visualCue: {
        primaryTarget: "The crust bottom looks dry and matte — no raw, doughy sheen. The edges are barely starting to turn a light golden color.",
        spectrum: [
          { state: "Underdone", description: "Crust bottom still looks wet and shiny. Raw dough visible. It will turn soggy under the wet pumpkin filling.", action: "Return to oven for 3–5 more minutes. The base must look dry and slightly set before you pour in the custard." },
          { state: "Perfect",   description: "Base is dry and matte-looking with very light color at the edges. The dough no longer looks raw. Cool to the touch.", action: "Reduce oven to 165°C and fill with custard." },
          { state: "Overdone",  description: "Crust is already golden-brown and baked through before the custard has even been added. It will over-brown significantly during the filled bake.", action: "Tent the edges with foil strips during the custard bake to prevent burning." },
        ],
      },
      feelCue: "Press the base of the par-baked crust gently with a finger — it should feel firm and dry, not soft or give way. The edges should feel set but pale, not crumbly or crisp.",
    },
    {
      nodeId: "step_2",
      action: "Make pumpkin custard",
      inputs: ["ing_02", "ing_03", "ing_04", "ing_05", "ing_06", "ing_07"],
      outputState: "pumpkin_custard",
      instructions: "In a large bowl, whisk together the pumpkin puree and brown sugar until no lumps remain. Add the spice blend, salt, and vanilla and whisk to combine. In a separate bowl, whisk the eggs and extra yolk until smooth, then add the heavy cream and whisk to combine. Pour the egg-cream mixture into the pumpkin mixture and whisk until completely smooth. Do not over-whisk or you will incorporate air that causes cracking during baking.",
      visualCue: {
        primaryTarget: "A smooth, uniform, deep orange custard that flows like thick cream. No lumps, no bubbles on the surface, uniform in color throughout.",
        spectrum: [
          { state: "Underdone", description: "Lumps of unmixed pumpkin or undissolved brown sugar visible. The mixture looks streaky — orange swirls in a lighter background.", action: "Whisk more gently until uniform. Strain through a fine-mesh sieve if lumps persist — pumpkin custard should be silky-smooth." },
          { state: "Perfect",   description: "Smooth, deep orange, flowing custard. No lumps. When you hold a whisk above it, the custard falls in a smooth ribbon, not in drops.", action: "Strain through a sieve for extra smoothness, then pour into the par-baked crust." },
          { state: "Overdone",  description: "The custard has lots of bubbles on the surface from vigorous whisking. These bubbles will set into the pie and create an uneven, pockmarked surface.", action: "Let the custard stand for 5 minutes to allow most bubbles to dissipate before pouring. Or torch the surface briefly after pouring into the shell." },
        ],
      },
      feelCue: "Run a clean finger through the custard and taste — you should taste earthy pumpkin, warm spice in this order: cinnamon, then ginger warmth, then a distant heat from clove. If one spice dominates, the blend is off.",
    },
    {
      nodeId: "step_3",
      action: "Fill and bake",
      inputs: ["par_baked_crust", "pumpkin_custard"],
      outputState: "baked_pumpkin_pie",
      instructions: "Pour the custard into the par-baked shell, filling to within 5mm of the top edge. Tent the crust edges with foil or a pie shield. Bake at 165°C for 50–60 minutes until the edges of the custard are set but the center 5cm still jiggles when the pie is gently shaken. Remove and cool completely at room temperature for 2 hours, then refrigerate.",
      visualCue: {
        primaryTarget: "The custard surface is set and matte with a slight dome. The edges are completely firm. The center 5cm jiggles as a single mass — like jello — when the pan is gently shaken.",
        spectrum: [
          { state: "Underdone", description: "The center half of the pie is still liquid and moves like water when shaken, not as a single jiggly mass. The surface looks wet and shiny throughout.", action: "Return to oven for 5–10 minute intervals. Check often — the window between underdone and overdone is narrow." },
          { state: "Perfect",   description: "Edges are completely set and matte. The center 5cm jiggles as one unified mass. A paring knife inserted 2cm from the edge comes out clean, but the very center still looks underdone. Trust the jiggle.", action: "Remove immediately. The center will finish cooking from carryover heat." },
          { state: "Overdone",  description: "The entire pie is firm, even the center. The surface has cracked across the middle. The edges may be puffed and separating from the crust.", action: "Cool and refrigerate — cracked pies still taste good. Cover cracks with whipped cream. Next time, pull 10 minutes earlier and trust carryover heat." },
        ],
      },
      feelCue: "Gently shake the pie pan while it's still in the oven — rest your fingertips on the rack and tilt slightly. The center should move as a single disc, not as a liquid wave. The moment you feel one unified jiggle rather than a liquid slosh, pull it.",
    },
    {
      nodeId: "step_4",
      action: "Cool and set",
      inputs: ["baked_pumpkin_pie"],
      outputState: "set_pumpkin_pie",
      instructions: "Cool the pie on a wire rack at room temperature for 2 full hours. Do not refrigerate immediately — rapid temperature change causes cracking. After 2 hours, refrigerate uncovered for at least 2 hours before slicing. The filling must be completely cold before cutting — warm pumpkin pie filling is still technically liquid and will collapse when cut.",
      visualCue: {
        primaryTarget: "After cooling, the custard surface is completely matte, slightly shrunk from the edges, and firm with a very slight bounce when tapped. The pie holds its shape when sliced.",
        spectrum: [
          { state: "Underdone", description: "Pie was cut while still warm — the custard collapses out from the slice, pooling on the plate. Surface looks wet in the cut.", action: "Refrigerate the remaining pie and serve the collapsed slice as a 'deconstructed' portion. Slice cold next time." },
          { state: "Perfect",   description: "Cold pie slices cleanly, holding its triangular shape. Cut edge is smooth and firm, showing the deep orange custard and flaky crust at the base.", action: "Serve with whipped cream." },
          { state: "Overdone",  description: "Pie has been refrigerated for more than 2 days. The crust is slightly soft from moisture migration. The custard surface may have a slight sheen.", action: "Serve anyway — flavor is unaffected. Next time, store covered loosely with plastic wrap, not sealed, to reduce moisture condensation." },
        ],
      },
      feelCue: "Press the center of the cooled pie gently with one finger — it should spring back immediately with a faint bounce, like pressing a firm cheek. If it holds a dent, it needs more time in the refrigerator.",
    },
  ],
};
