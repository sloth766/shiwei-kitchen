export default {
  repoId: "master_japanese_cotton_cheesecake_001",
  parentRepoId: null,
  slug: "japanese-cotton-cheesecake",
  parentSlug: null,
  author: "ForkRecipe Kitchen",

  title: "Japanese Cotton Cheesecake",
  description: "A cake that trembles like set custard, its surface burnished to deep amber, its crumb so aerated it yields to a spoon like foam — a soufflé's lightness married to cream cheese's gentle tang, impossibly sustained.",
  cuisine: "Japanese",
  culture: "Japanese",
  category: "desserts",

  tags: ["vegetarian", "japanese", "cheesecake", "souffle", "cream-cheese", "baking", "delicate"],
  difficulty: 4,
  activeTime: "45 min",
  totalTime: "3 hr 30 min",
  ratioSystem: "weight",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 3, salty: 1, sour: 2, bitter: 0, umami: 0, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Dairy",      name: "Full-fat cream cheese (room temp)", ratioValue: 250, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_02", role: "Fat",        name: "Unsalted butter",                   ratioValue: 50,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_03", role: "Dairy",      name: "Whole milk",                        ratioValue: 100, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_04", role: "Binder",     name: "Egg yolks (large)",                 ratioValue: 6,   defaultUnit: "unit", substitutions: [] },
    { ingId: "ing_05", role: "Structure",  name: "Plain flour (cake flour preferred)", ratioValue: 60,  defaultUnit: "g", substitutions: ["plain flour sifted 3 times"] },
    { ingId: "ing_06", role: "Starch",     name: "Cornflour (cornstarch)",            ratioValue: 20,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_07", role: "Protein",    name: "Egg whites (large, cold)",          ratioValue: 6,   defaultUnit: "unit", substitutions: [] },
    { ingId: "ing_08", role: "Sweetener",  name: "Caster sugar",                      ratioValue: 130, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_09", role: "Acid",       name: "Cream of tartar",                   ratioValue: 1,   defaultUnit: "g", substitutions: ["1 tsp lemon juice"] },
    { ingId: "ing_10", role: "Aromatic",   name: "Vanilla extract",                   ratioValue: 5,   defaultUnit: "g", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Melt",
      inputs: ["ing_01", "ing_02", "ing_03"],
      outputState: "cream_cheese_base",
      instructions: "Place cream cheese, butter, and milk in a large heatproof bowl set over a saucepan of barely simmering water (bain-marie). Whisk gently until the cream cheese has melted completely and the mixture is smooth, silky, and uniform — no lumps, no streaks. Remove from heat and cool to 40-45 C before adding yolks. If the mixture is too hot it will scramble the yolks.",
      visualCue: {
        primaryTarget: "A smooth, homogeneous, pale cream-coloured mixture with no lumps, streaks of cream cheese, or separated fat. Silky and uniform in texture.",
        spectrum: [
          { state: "Underdone", description: "Lumps of un-melted cream cheese remain. Mixture looks curdled or uneven.", action: "Continue whisking over the bain-marie. Cold cream cheese takes 5-7 minutes to fully dissolve — patience is required." },
          { state: "Perfect",   description: "Perfectly smooth, silky, pale-cream mixture. Flows off the whisk in a smooth, uniform stream with no lumps visible.", action: "Cool to 40-45 C by placing the bowl in a bowl of cool water, then add yolks." },
          { state: "Overdone",  description: "Mixture is beginning to simmer or shows signs of scorching. It smells of overheated dairy.", action: "Remove from heat immediately. The fat in cream cheese can separate if overheated — whisk vigorously and cool fast." },
        ],
      },
      feelCue: "Dip a fingertip into the cooled base — it should feel warm but not hot, around body temperature or slightly above. Smooth as warmed lotion, with no graininess.",
    },
    {
      nodeId: "step_2",
      action: "Whisk",
      inputs: ["cream_cheese_base", "ing_04", "ing_05", "ing_06", "ing_10"],
      outputState: "yolk_batter",
      instructions: "Whisk the egg yolks into the cooled cream cheese base one at a time. Sift together the flour and cornflour and fold into the mixture in two additions until completely smooth with no lumps. Add vanilla. The batter should be thick but pourable — like thick pancake batter. Any lumps of flour will show as dense spots in the finished cake.",
      visualCue: {
        primaryTarget: "A pale, smooth, lemon-cream batter with a thick, flowing consistency. When the whisk is lifted, it falls in a thick ribbon that holds on the surface for 2 seconds.",
        spectrum: [
          { state: "Underdone", description: "Lumps of flour visible in the batter. Mixture looks rough and uneven.", action: "Whisk more vigorously and strain through a sieve if lumps persist." },
          { state: "Perfect",   description: "Perfectly smooth, thick, pale batter with a glossy sheen from the egg yolks. Ribbons slowly off the whisk.", action: "Set aside while you whip the egg whites." },
          { state: "Overdone",  description: "Batter has been over-mixed and looks very tight. Or it was mixed while too hot and shows signs of the eggs beginning to cook.", action: "Pass through a sieve to smooth and cool in an ice bath if needed." },
        ],
      },
      feelCue: "The yolk batter should feel like thick, cold cream when you run a finger through it — smooth, slightly resistant, and leaving a clean channel that slowly fills back in over 3 seconds.",
    },
    {
      nodeId: "step_3",
      action: "Whip",
      inputs: ["ing_07", "ing_08", "ing_09"],
      outputState: "swiss_meringue",
      instructions: "In a scrupulously clean bowl, whip cold egg whites with cream of tartar at medium speed until foamy. Add the caster sugar gradually while continuing to whip. Increase to medium-high and whip to firm peaks — the meringue should be stiff enough to hold a peak but still smooth and glossy, not dry or grainy. The critical point: do not over-whip. The meringue should be just firm, with a slight curl at the peak tip, not completely rigid.",
      visualCue: {
        primaryTarget: "A glossy, bright-white meringue with firm peaks that hold their shape but have a gentle curl at the very tip — not stiff and straight, not soft and drooping.",
        spectrum: [
          { state: "Underdone", description: "Peaks are soft and droop over. Meringue has a watery quality and runs off the whisk.", action: "Continue whipping. The meringue is not yet stiff enough — fold in too early and the soufflé effect will not develop." },
          { state: "Perfect",   description: "Stiff, glossy peaks with a very slight curl at the tip. When you lift the whisk, the peak stands and then the very tip gently curves over. Brilliant white.", action: "Fold into the yolk batter immediately in three additions." },
          { state: "Overdone",  description: "Meringue looks dry, grainy, and cottage-cheese-like. Peaks are stiff and straight with no gloss.", action: "Dry meringue cannot be saved — it will fold in as lumps, ruining the texture. Start again." },
        ],
      },
      feelCue: "Dip a clean finger into the meringue and pull away — the peak left on your finger should hold upright for 2 seconds and then the very tip should droop over gently. It should feel like incredibly smooth, cold, stiff foam.",
    },
    {
      nodeId: "step_4",
      action: "Fold",
      inputs: ["yolk_batter", "swiss_meringue"],
      outputState: "cheesecake_batter",
      instructions: "Add the meringue to the yolk batter in three additions. The first addition: stir in roughly to lighten the batter without concern for preserving air. The second and third additions: fold with a wide rubber spatula, scooping from the base and folding over, rotating the bowl. Stop as soon as no white streaks remain. Pour into a parchment-lined 20 cm round tin. Tap the tin once on the counter to release large bubbles.",
      visualCue: {
        primaryTarget: "A light, airy, pale-cream batter with no white meringue streaks. Noticeably more voluminous and airy than the yolk batter alone — holds a gentle mound in the tin.",
        spectrum: [
          { state: "Underdone", description: "White meringue streaks are still visible in the batter.", action: "One or two more deliberate fold strokes — scoop from the base and fold over." },
          { state: "Perfect",   description: "Uniform, airy, light batter. No streaks. The batter has a buoyant, cloud-like quality as it falls from the spatula. Fills the tin with a gentle mound.", action: "Place in water bath and bake immediately." },
          { state: "Overdone",  description: "Batter is flat and liquid — over-folding has deflated the meringue. The cake will not soufflé.", action: "Bake anyway. It will be denser than ideal but still delicious." },
        ],
      },
      feelCue: "When you scoop a spatula of batter and let it fall, it should land with a soft, cushioned sound and barely spread — like spooning a thick, airy cloud.",
    },
    {
      nodeId: "step_5",
      action: "Bake",
      inputs: ["cheesecake_batter"],
      outputState: "finished_cotton_cheesecake",
      instructions: "Wrap the base and sides of the tin tightly in two layers of foil. Place in a deep roasting tray and fill with boiling water to reach halfway up the tin sides (water bath / bain-marie baking). Bake at 160 C (320 F) for 55-65 minutes. The surface should be a deep amber-brown and the cake should tremble as a whole when the tin is gently shaken — not sloshing liquid, but a unified jiggle. Turn the oven off and leave the cake inside with the door ajar for 30 minutes before removing. Cool completely at room temperature before refrigerating overnight.",
      visualCue: {
        primaryTarget: "Deep, even amber-brown dome. When the tin is shaken, the entire cake trembles as a cohesive unit — like watching a very firm jelly. No liquid sloshing at the centre.",
        spectrum: [
          { state: "Underdone", description: "Centre sloshing as liquid when shaken. Surface is still pale. The batter has not set.", action: "Continue baking. Do not open the oven — sudden temperature changes cause cracking and collapse." },
          { state: "Perfect",   description: "Deep amber dome, trembles as a cohesive unit, does not slosh. A skewer at the edge comes out clean; a skewer in the centre comes out with a few moist crumbs.", action: "Turn off oven, leave the door ajar, and cool gradually inside for 30 minutes." },
          { state: "Overdone",  description: "A large crack has appeared across the top and the dome has started to pull away from the sides.", action: "Remove from the oven. A crack is cosmetic and does not affect flavour. Dust with icing sugar to disguise it." },
        ],
      },
      feelCue: "After overnight refrigeration, the surface should feel smooth, cool, and lightly springy when pressed very gently — it yields 2 mm under a fingertip and springs back completely. Cutting into it with a clean, hot knife reveals a crumb so fine it looks like compacted cotton.",
    },
  ],
};
