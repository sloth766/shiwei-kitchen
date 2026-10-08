export default {
  repoId: "master_british_roasted_root_vegetables_001",
  parentRepoId: null,
  slug: "roasted-root-vegetables",
  author: "ForkRecipe Kitchen",

  title: "Roasted Root Vegetables",
  description: "Parsnips, carrots, and beetroot — peeled and cut to size, tossed in a generous coat of oil, and roasted at high heat until their sugars have caramelized to a deep, bittersweet char — the most honest and satisfying way to eat the vegetables of an English autumn.",
  cuisine: "British",
  culture: "British",
  category: "vegetables",

  tags: ["roasted", "vegetable", "british", "parsnip", "carrot", "beetroot", "vegan", "side"],
  difficulty: 1,
  activeTime: "15 min",
  totalTime: "50 min",
  ratioSystem: "parts",

  stars: 1102,
  forks: 98,
  contributors: 31,
  license: "CC-BY-SA",
  createdAt: "2025-02-10",
  updatedAt: "2025-06-01",

  flavorRadar: { sweet: 4, salty: 2, sour: 0, bitter: 2, umami: 1, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure", name: "Parsnips (peeled, halved lengthwise)",      ratioValue: 40, defaultUnit: "parts", substitutions: ["celeriac", "turnip"] },
    { ingId: "ing_02", role: "Structure", name: "Carrots (peeled, halved or quartered lengthwise)", ratioValue: 30, defaultUnit: "parts", substitutions: ["rainbow carrots"] },
    { ingId: "ing_03", role: "Structure", name: "Beetroot (peeled, cut into wedges)",        ratioValue: 30, defaultUnit: "parts", substitutions: ["golden beetroot", "swede"] },
    { ingId: "ing_04", role: "Fat",       name: "Sunflower or vegetable oil",                ratioValue: 6,  defaultUnit: "parts", substitutions: ["duck fat or goose fat for superior results"] },
    { ingId: "ing_05", role: "Herb",      name: "Fresh thyme sprigs and bay leaves",         ratioValue: 2,  defaultUnit: "parts", substitutions: ["fresh rosemary"] },
    { ingId: "ing_06", role: "Seasoning", name: "Flaky sea salt and black pepper",           ratioValue: 1.5, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Sweetener", name: "Honey or maple syrup (for glazing)",        ratioValue: 2,  defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Prep vegetables",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_04", "ing_06"],
      outputState: "prepped_roots",
      instructions: "Peel all vegetables. Cut into pieces of approximately equal size and similar surface area so they roast at the same rate — this is the single most important prep step. Parsnips halved lengthwise; carrots halved or quartered depending on size; beetroot into 6–8 wedges. Toss in a large bowl with the oil, coating every surface — do not season with salt yet, as salt draws moisture and creates steam in the early roasting stage.",
      visualCue: {
        primaryTarget: "Uniformly sized pieces across all three vegetable types, each surface glistening with an even coat of oil. The pieces should look roughly the same size when mounded together.",
        spectrum: [
          { state: "Underdone", description: "Pieces are of vastly different sizes — some large beetroot wedges alongside thin carrot strips.", action: "Re-cut the oversized pieces to match the smaller ones. Uneven sizes guarantee some pieces will burn while others undercook." },
          { state: "Perfect",   description: "Consistent size throughout. Even oil coat on every face. The vegetables look plump and glistening.", action: "Spread onto the roasting tray immediately." },
          { state: "Overdone",  description: "Vegetables have been sitting in oil for too long and some pieces appear waterlogged.", action: "Proceed — the oil absorption won't significantly affect the result." },
        ],
      },
      feelCue: "Pick up a piece of oiled parsnip — it should feel slick and the oil should not drip off when held for 5 seconds. The cut surfaces should feel smooth and slightly tacky from the oil.",
    },
    {
      nodeId: "step_2",
      action: "Roast",
      inputs: ["prepped_roots", "ing_05"],
      outputState: "roasting_roots",
      instructions: "Preheat the oven to 220°C (430°F) with a large, heavy roasting tray inside. The preheated tray is essential — vegetables placed in a cold tray steam rather than roast. Spread the vegetables in a single layer with the cut sides down, with space between each piece — touching vegetables steam each other. Scatter thyme and bay leaves throughout. Roast for 25 minutes without opening the oven.",
      visualCue: {
        primaryTarget: "After 25 minutes, the cut sides in contact with the tray should show deep caramelization — golden to dark-brown. The vegetables are beginning to shrink and the edges have started to color.",
        spectrum: [
          { state: "Underdone", description: "After 25 minutes, the cut sides are pale and the vegetables look steamed — no caramelization visible.", action: "The tray was likely not hot enough or the oven temperature was too low. Turn up to 230°C and return to oven." },
          { state: "Perfect",   description: "Cut sides are deeply golden to brown with distinct caramelization. The kitchen smells of caramelized carrot and earthy beetroot. Parsnips at the tips are beginning to char.", action: "Turn pieces over, season with salt, and return to oven." },
          { state: "Overdone",  description: "The cut surfaces have blackened and the vegetables are beginning to shrink dramatically.", action: "Remove immediately and serve. Deeply caramelized root vegetables are still delicious even at the border of charred." },
        ],
      },
      feelCue: "Open the oven after 25 minutes and you should hear a steady, moderate sizzle from every piece. The released steam should carry the sweet smell of caramelizing parsnip and carrot sugars.",
    },
    {
      nodeId: "step_3",
      action: "Glaze",
      inputs: ["roasting_roots", "ing_07", "ing_06"],
      outputState: "finished_roasted_roots",
      instructions: "Turn each piece over to expose an unbrowned side. Season now with flaky sea salt and black pepper. Drizzle honey or maple syrup over the pieces in the tray. Return to the oven for 15–20 more minutes until everything is tender, deeply caramelized, and the honey has darkened and concentrated. The sugar in the glaze accelerates the Maillard reaction on the freshly exposed surfaces.",
      visualCue: {
        primaryTarget: "Deep amber-brown caramelization on multiple sides, with the honey glaze forming a shiny, dark, concentrated coat on the exposed surfaces. Parsnip tips may be very dark — this is desirable.",
        spectrum: [
          { state: "Underdone", description: "Pale second side with honey not yet caramelized — it looks pale and liquid on the surface.", action: "Return to the oven. The honey needs heat to concentrate and caramelize." },
          { state: "Perfect",   description: "Multiple deep-caramelized sides. Honey has darkened and adhered to the vegetables, forming a sticky, shiny coat. Parsnip tips are dark, almost charred. A fork passes through all pieces with almost no resistance.", action: "Serve immediately from the tray." },
          { state: "Overdone",  description: "Honey has burnt to a black, bitter film and the vegetables are very dark and dry.", action: "Remove immediately. Scrape off the worst of the burnt honey. The underlying vegetable may still be excellent." },
        ],
      },
      feelCue: "Press a parsnip with the back of a fork — it should yield completely with a slight give, like pressing into firm butter. The honey glaze on the surface should feel tacky and slightly sticky, not wet.",
    },
  ],
};
