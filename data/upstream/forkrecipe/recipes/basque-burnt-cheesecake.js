export default {
  repoId: "master_spanish_basque_burnt_cheesecake_001",
  parentRepoId: null,
  slug: "basque-burnt-cheesecake",
  author: "ForkRecipe Kitchen",

  title: "Basque Burnt Cheesecake",
  description: "A cream-cheese custard baked at furious heat until the top scorches to a deep mahogany — caramelized, almost bitter — while the center stays barely set, trembling like cold flan at room temperature.",
  cuisine: "Spanish",
  culture: "Basque",
  category: "desserts",

  tags: ["vegetarian", "gluten-free", "cheesecake", "basque", "spanish", "baking"],
  difficulty: 2,
  activeTime: "20 min",
  totalTime: "1 hour 20 min",
  ratioSystem: "bakers_percentage",

  stars: 0, forks: 0, contributors: 1, license: "CC-BY-SA",
  createdAt: "2026-06-27", updatedAt: "2026-06-27",

  flavorRadar: { sweet: 3, salty: 2, sour: 2, bitter: 2, umami: 1, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Dairy",     name: "Full-fat cream cheese, room temperature", ratioValue: 100, defaultUnit: "%", substitutions: [] },
    { ingId: "ing_02", role: "Sweetener", name: "Granulated sugar",                         ratioValue: 25,  defaultUnit: "%", substitutions: [] },
    { ingId: "ing_03", role: "Binder",    name: "Eggs (large), room temperature",           ratioValue: 20,  defaultUnit: "%", substitutions: [] },
    { ingId: "ing_04", role: "Dairy",     name: "Heavy cream (35% fat)",                    ratioValue: 30,  defaultUnit: "%", substitutions: ["creme fraiche"] },
    { ingId: "ing_05", role: "Binder",    name: "All-purpose flour",                        ratioValue: 2,   defaultUnit: "%", substitutions: ["cornstarch (use half)"] },
    { ingId: "ing_06", role: "Aromatic",  name: "Vanilla extract",                          ratioValue: 0.5, defaultUnit: "%", substitutions: ["vanilla paste"] },
    { ingId: "ing_07", role: "Seasoning", name: "Fine sea salt",                            ratioValue: 0.5, defaultUnit: "%", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Cream",
      inputs: ["ing_01", "ing_02", "ing_07"],
      outputState: "creamed_base",
      instructions: "Beat cream cheese with sugar and salt in a stand mixer with the paddle attachment on medium speed — or with a hand mixer — until the mixture is completely smooth, fluffy, and light, about 3 minutes. Scrape down the bowl twice. No lumps are acceptable here — cold cream cheese leaves clumps that never fully dissolve in the oven.",
      visualCue: {
        primaryTarget: "White, airy, and ribbony — holds a soft shape when the paddle is lifted but flows slowly back into itself.",
        spectrum: [
          { state: "Underdone", description: "Small white lumps visible; mixture feels grainy.", action: "Continue beating — lumps mean the cheese was too cold. Beat 2 more minutes." },
          { state: "Perfect",   description: "Silky, uniformly pale, no graininess. Falls from the paddle in a thick ribbon.", action: "Add eggs one at a time." },
          { state: "Overdone",  description: "Mixture has become very fluffy and airy — too much air will cause the cheesecake to puff and crack.", action: "Switch to the lowest speed for the remaining steps." },
        ],
      },
      feelCue: "Rub a small amount between thumb and forefinger — it should feel like cold face cream: smooth, no graininess at all.",
    },
    {
      nodeId: "step_2",
      action: "Blend",
      inputs: ["creamed_base", "ing_03", "ing_06"],
      outputState: "egg_enriched_batter",
      instructions: "Add eggs one at a time on low speed, mixing until just incorporated before adding the next. Add vanilla with the final egg. Do not rush this step — adding eggs too quickly causes the emulsion to break. Scrape the bowl after each addition.",
      visualCue: {
        primaryTarget: "A smooth, uniform batter with no streaks of yolk. Slightly more fluid than the creamed base, with a pale yellow tint.",
        spectrum: [
          { state: "Underdone", description: "Visible yellow streaks of egg yolk unmixed into the batter.", action: "Scrape and mix on low until streaks disappear." },
          { state: "Perfect",   description: "Homogeneous, pale cream color. No streaks, no bubbles, pours in a slow stream.", action: "Add cream and flour." },
          { state: "Overdone",  description: "Batter looks curdled or grainy — egg was added too fast.", action: "Continue mixing on medium — in most cases it will come back together; if not, warm the bowl briefly over a water bath." },
        ],
      },
      feelCue: "Tilt the bowl — the batter should flow lazily and evenly, like a slow-moving river of cream.",
    },
    {
      nodeId: "step_3",
      action: "Whisk",
      inputs: ["egg_enriched_batter", "ing_04", "ing_05"],
      outputState: "cheesecake_batter",
      instructions: "Sift flour directly into the batter. Add heavy cream. Whisk gently by hand until everything is incorporated — do not use the electric mixer at this stage. The batter should be thin, pourable, and completely smooth. Strain through a fine-mesh sieve into a jug for easy pouring.",
      visualCue: {
        primaryTarget: "A silky, fluid batter that pours like heavy cream. No lumps, no flour pockets. Almost translucent at the surface.",
        spectrum: [
          { state: "Underdone", description: "Flour pockets visible as white specks or streaks.", action: "Whisk until fully incorporated, then strain." },
          { state: "Perfect",   description: "Smooth, glossy, pours in an unbroken stream. Straining through a sieve yields no residue.", action: "Pour into parchment-lined pan and bake immediately." },
          { state: "Overdone",  description: "Over-whisked — many tiny bubbles across the surface.", action: "Let rest 5 minutes, then skim bubbles with a spoon before baking." },
        ],
      },
      feelCue: "Run the batter off a spoon — it should cascade in a thin, even sheet, coating the back of the spoon in a translucent film.",
    },
    {
      nodeId: "step_4",
      action: "Bake",
      inputs: ["cheesecake_batter"],
      outputState: "baked_cheesecake",
      instructions: "Preheat oven to 230 C (450 F) conventional, or 210 C (410 F) fan. Line a 20 cm (8 inch) springform pan with two sheets of parchment, pushing them up the sides — the paper will ruffle and buckle and that is perfectly traditional. Pour in the batter. Bake for 28–32 minutes, until the top is deeply scorched — nearly burnt — with a dark mahogany center and the entire interior wobbles dramatically when the pan is nudged.",
      visualCue: {
        primaryTarget: "Top is uniformly dark brown to mahogany-black, with lighter amber edges. The entire cheesecake jiggles like a still pond when the pan is tapped — center moves as one piece, not sloshing.",
        spectrum: [
          { state: "Underdone", description: "Top is pale gold or beige. No scorch. Interior sloshes visibly when moved.", action: "Return to oven for 5 more minutes — the burnt top is not a mistake, it is the recipe." },
          { state: "Perfect",   description: "Top is dark mahogany with traces of black at the peaks. Edges are set, center wobbles as a single mass. Parchment has puffed up and charred at the tips.", action: "Cool completely at room temperature, at least 1 hour, before chilling." },
          { state: "Overdone",  description: "Top is uniformly black and the edges have pulled away from the paper. Jiggles only slightly.", action: "Scrape off the very top layer if truly burnt to ash. The interior is likely still custardy and delicious." },
        ],
      },
      feelCue: "Wearing oven gloves, hold the pan and give it a quick jerk side-to-side — the center should ripple in slow, synchronous waves, like a waterbed settling. That wobble is the promise of a custardy interior.",
    },
    {
      nodeId: "step_5",
      action: "Chill",
      inputs: ["baked_cheesecake"],
      outputState: "finished_cheesecake",
      instructions: "Cool the cheesecake in the pan at room temperature for at least 1 hour — it will deflate dramatically as it cools, developing the characteristic sunken center. Refrigerate for a minimum of 3 hours (overnight is ideal) to allow the custard to fully set. Serve at room temperature for the most custardy texture: remove from fridge 30 minutes before slicing.",
      visualCue: {
        primaryTarget: "Sunken, wrinkled center with a dark cracked surface — almost like a deflated soufflé. Cream-colored interior is visible at the cuts, with a slightly translucent, barely-set center.",
        spectrum: [
          { state: "Underdone", description: "Interior is still liquid or pours off the cut face.", action: "Return to fridge for at least 2 more hours. A fully set Basque cheesecake still looks barely set — you need the chill to achieve it." },
          { state: "Perfect",   description: "Slices cleanly with a warm knife. Interior is creamy and just barely holds its shape on the plate, like very cold pastry cream.", action: "Serve at room temperature, in wedges, with no garnish needed." },
          { state: "Overdone",  description: "Interior is rubbery and dry — no custardy give.", action: "Over-baked; serve with a spoonful of creme fraiche to restore richness." },
        ],
      },
      feelCue: "A perfectly chilled slice should yield to gentle pressure from a fork with almost no resistance — parting like cold butter, never bouncing back.",
    },
  ],
};
