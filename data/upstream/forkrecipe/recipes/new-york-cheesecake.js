export default {
  repoId: "master_american_new_york_cheesecake_001",
  parentRepoId: null,
  slug: "new-york-cheesecake",
  author: "ForkRecipe Kitchen",

  title: "New York Cheesecake",
  description: "A dense, ivory-white round of cream cheese, eggs, and sour cream baked low and slow until it trembles, then cooled for hours until it slices into clean, silken wedges with a biscuit crust that crumbles at the touch of a fork.",
  cuisine: "American",
  culture: "New York",
  category: "desserts",

  tags: ["american", "cheesecake", "cream-cheese", "dessert", "baked"],
  difficulty: 3,
  activeTime: "30 min",
  totalTime: "7 hrs",
  ratioSystem: "parts",

  stars: 3244,
  forks: 356,
  contributors: 38,
  license: "CC-BY-SA",
  createdAt: "2024-12-01",
  updatedAt: "2026-04-10",

  flavorRadar: { sweet: 3, salty: 1, sour: 2, bitter: 0, umami: 0, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure", name: "Graham crackers, crushed to fine crumbs",          ratioValue: 15,  defaultUnit: "parts", substitutions: ["digestive biscuits", "Oreo cookies (remove filling)"] },
    { ingId: "ing_02", role: "Fat",       name: "Unsalted butter, melted",                          ratioValue: 6,   defaultUnit: "parts", substitutions: ["coconut oil"] },
    { ingId: "ing_03", role: "Dairy",     name: "Full-fat cream cheese, room temperature",          ratioValue: 100, defaultUnit: "parts", substitutions: ["Neufchâtel (lighter)", "mascarpone (richer, Italian style)"] },
    { ingId: "ing_04", role: "Sweetener", name: "Granulated sugar",                                 ratioValue: 25,  defaultUnit: "parts", substitutions: ["caster sugar"] },
    { ingId: "ing_05", role: "Binder",    name: "Large eggs, room temperature",                     ratioValue: 20,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Dairy",     name: "Full-fat sour cream, room temperature",            ratioValue: 15,  defaultUnit: "parts", substitutions: ["full-fat Greek yogurt", "crème fraîche"] },
    { ingId: "ing_07", role: "Seasoning", name: "Vanilla extract and fine salt",                    ratioValue: 1,   defaultUnit: "parts", substitutions: ["lemon zest (brightens)", "vanilla bean"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Make and press crust",
      inputs: ["ing_01", "ing_02"],
      outputState: "pressed_crust",
      instructions: "Combine the graham cracker crumbs and melted butter in a bowl and mix until the crumbs are evenly moistened — they should look like wet sand and hold together when squeezed. Press firmly into the bottom of a 23cm springform pan using the flat bottom of a measuring cup. Press firmly and evenly — including 2–3cm up the sides. Bake at 175°C for 8–10 minutes until just set. Cool completely before filling.",
      visualCue: {
        primaryTarget: "A compact, even layer of golden-brown crumbs covering the bottom and slightly up the sides of the springform pan. The surface looks dry and holds its shape when you run a finger along the edge.",
        spectrum: [
          { state: "Underdone", description: "Crumbs are loosely packed — the crust crumbles when you press it and the surface looks rough and uneven. Too much butter visible, crumbs are glistening wet.", action: "Press more firmly with the bottom of a measuring cup. Add another teaspoon of melted butter if the crumbs are dry. The crust must be compacted enough to act as a structural base." },
          { state: "Perfect",   description: "Even, compact layer that holds together when a finger presses on the edge. Golden-brown after baking, with a slightly darker rim. Holds its shape when the pan is tilted.", action: "Cool completely before pouring in filling." },
          { state: "Overdone",  description: "Crust is dark brown and smells of burnt butter. The edges may have darkened significantly during the pre-bake.", action: "If only the edges are dark, scrape them down to below the dark layer. The filling will hide the top and a slightly over-baked crust still functions perfectly as a base." },
        ],
      },
      feelCue: "Press the crust firmly with your thumb — it should resist with a firm, dry compaction and not indent easily. Pick the pan up and tilt it 45 degrees — the crust should not slide or separate.",
    },
    {
      nodeId: "step_2",
      action: "Beat cream cheese base",
      inputs: ["ing_03", "ing_04", "ing_07"],
      outputState: "cream_cheese_base",
      instructions: "All ingredients must be at room temperature — cold cream cheese will not beat smooth and will leave lumps that never fully incorporate. Beat the cream cheese with a stand mixer paddle (not whisk) on medium speed until completely smooth and creamy, about 2 minutes. Scrape the bowl and beater thoroughly. Add the sugar and beat for 2 more minutes. Scrape again. Beat in the vanilla and salt. The goal is smooth — not airy. High-speed beating incorporates air that causes cracking.",
      visualCue: {
        primaryTarget: "Cream cheese mixture is completely smooth, glossy white, and flows off the paddle in a slow, thick ribbon. No lumps visible. The sides and bottom of the bowl are free of unincorporated cream cheese.",
        spectrum: [
          { state: "Underdone", description: "Lumps of cream cheese visible in the bowl. The mixture looks rough and grainy. Some areas still look dry and blocky.", action: "Scrape the bowl and beater thoroughly and beat more. Cold cream cheese is the usual culprit — if the room is cold, soften the cream cheese in the microwave at 50% power for 20 seconds." },
          { state: "Perfect",   description: "Completely smooth, glossy ivory cream. No lumps. Flows off the paddle in a slow, thick ribbon. Smells of cream and vanilla.", action: "Add eggs one at a time, on low speed." },
          { state: "Overdone",  description: "Mixture is smooth but has become very airy and pale — almost white. The beater left a trail of frothy, light cream cheese. Air has been incorporated.", action: "Switch to a spatula and fold the mixture a few times to deflate some air. Proceed gently. Excess air causes cheesecakes to puff and then crack dramatically when cooling." },
        ],
      },
      feelCue: "Rub a small amount of the cream cheese base between your fingers — it should feel silky and homogeneous, like thick lotion. Any grittiness or lumps under your fingers means more mixing is needed.",
    },
    {
      nodeId: "step_3",
      action: "Add eggs and sour cream",
      inputs: ["cream_cheese_base", "ing_05", "ing_06"],
      outputState: "cheesecake_batter",
      instructions: "With the mixer on low speed, add the eggs one at a time, beating only until each is just incorporated before adding the next — no more. Overmixing after adding eggs develops the batter and adds air. Finally, add the sour cream and mix on low just until combined. Scrape the bowl one final time and fold gently by hand with a spatula. The finished batter should be smooth, thick, and flow slowly.",
      visualCue: {
        primaryTarget: "A smooth, thick, ivory batter that pours in a slow, even ribbon from the bowl. The surface is flat and slightly glossy — no bubbles from overmixing.",
        spectrum: [
          { state: "Underdone", description: "Yellow streaks of egg yolk still visible in the batter. Sour cream looks like separate white swirls. Batter is not uniform.", action: "Fold gently with a spatula until uniform. Avoid the mixer at this stage — a few more folds by hand are better than risking air incorporation." },
          { state: "Perfect",   description: "Smooth, uniform ivory batter with no streaks. Flows slowly off a spatula like very thick cream. Surface is flat and bubble-free.", action: "Pour immediately into the cooled crust." },
          { state: "Overdone",  description: "Batter has a significant number of surface bubbles and looks frothy and light rather than dense. Eggs were beaten too fast or too long.", action: "Tap the bowl sharply on the counter several times to pop bubbles. Let stand 5 minutes and tap again. Strain through a fine-mesh sieve if very bubbly." },
        ],
      },
      feelCue: "Pour a small amount of batter from a ladle — it should fall in a thick, slow, unbroken ribbon before thinning out. If it spatters or flows too fast, the batter has been over-aerated.",
    },
    {
      nodeId: "step_4",
      action: "Water bath bake",
      inputs: ["cheesecake_batter", "pressed_crust"],
      outputState: "baked_cheesecake",
      instructions: "Preheat oven to 160°C. Wrap the outside of the springform pan tightly in two layers of heavy foil (to prevent water ingress). Pour the batter into the cooled crust. Set the pan in a larger roasting pan and pour boiling water into the roasting pan to come halfway up the sides of the springform. Bake for 60–70 minutes until the edges are set and the center 10cm jiggles as a single mass. Turn off oven, crack door 5cm, and leave for 1 hour.",
      visualCue: {
        primaryTarget: "After baking, the cheesecake is puffed slightly and set at the edges. The center 10cm jiggles slowly as one mass when the pan is gently shaken. Surface is matte white, not wet-looking.",
        spectrum: [
          { state: "Underdone", description: "Center half is still liquid — moves like water, not as a unified mass. Surface looks wet and shiny in the middle. Edges have not yet set.", action: "Return to the water bath and continue baking in 10-minute increments. Check the jiggle each time." },
          { state: "Perfect",   description: "Edges are fully set and firm. Center 10cm moves as one slow, unified jiggle. Surface is matte and creamy-white. A slight dome has formed.", action: "Turn off oven, crack door, and leave for 1 hour before removing." },
          { state: "Overdone",  description: "Entire surface is firm. Cheesecake has puffed significantly and may have cracked across the top. Center no longer jiggles at all.", action: "Remove from oven immediately. Cracks can be covered with sour cream topping or fruit. The texture may be slightly dry but still good." },
        ],
      },
      feelCue: "The finished cheesecake, after the oven rest, should be at the temperature of a warm room — not hot. If you rest your palm on the surface (gently) it should feel warm but not hot, and give the faintest yielding pressure.",
    },
    {
      nodeId: "step_5",
      action: "Cool and chill",
      inputs: ["baked_cheesecake"],
      outputState: "finished_new_york_cheesecake",
      instructions: "Remove from the water bath after the oven rest. Run a thin knife around the inside edge of the springform to release the cheesecake (this prevents cracking as it shrinks). Cool at room temperature for 2 hours. Refrigerate uncovered for at least 4 hours, ideally overnight. Remove the springform ring only when the cheesecake is fully cold. Slice with a hot, dry knife for clean cuts.",
      visualCue: {
        primaryTarget: "When fully chilled and sliced, each wedge stands upright with clean, smooth cut faces. The interior is dense and white, the crust is golden at the base. No sagging or oozing.",
        spectrum: [
          { state: "Underdone", description: "Cheesecake was sliced before fully chilled. The interior is soft and the slices slump and lose their shape on the plate.", action: "Refrigerate the remaining cheesecake and accept imperfect-looking slices from the first cut. The flavor is unaffected — only the presentation suffers." },
          { state: "Perfect",   description: "Cold, firm cheesecake slices cleanly into wedges that hold their triangular shape. Cut face is smooth and dense, cream-white throughout. The crust releases cleanly from the base.", action: "Serve at room temperature (remove from fridge 20 minutes before serving for best flavor)." },
          { state: "Overdone",  description: "Cheesecake has been refrigerated more than 3 days. The edges may have taken on a slightly grey tinge and the surface looks slightly dried out.", action: "Flavor is still good within 5 days. Cover tightly with plastic wrap after the first day to prevent the surface from drying." },
        ],
      },
      feelCue: "When slicing, the hot knife should glide through the chilled cheesecake with nearly no resistance — a clean, smooth cut. If you feel resistance or the cheesecake drags on the blade, it needs more time in the refrigerator.",
    },
  ],
};
