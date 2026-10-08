export default {
  repoId: "master_japanese_miso_roasted_sweet_potato_001",
  parentRepoId: null,
  slug: "miso-roasted-sweet-potato",
  author: "ForkRecipe Kitchen",

  title: "Miso-Roasted Sweet Potato",
  description: "Japanese whole sweet potatoes roasted low and slow until their sugars caramelise from within, then split and glazed with a white miso and butter mixture that melts into every crack — the simplest of things, made luminous.",
  cuisine: "Japanese",
  culture: "Japanese",
  category: "vegetables",

  tags: ["gluten-free", "sweet-potato", "miso", "roasted", "side", "umami"],
  difficulty: 1,
  activeTime: "10 min",
  totalTime: "1 hr 10 min",
  ratioSystem: "weight",

  stars: 0, forks: 0, contributors: 1, license: "CC-BY-SA",
  createdAt: "2026-06-27", updatedAt: "2026-06-27",

  flavorRadar: { sweet: 4, salty: 3, sour: 0, bitter: 1, umami: 4, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Japanese sweet potatoes (Satsumaimo) or orange-flesh sweet potatoes", ratioValue: 800, defaultUnit: "g", substitutions: ["any thick sweet potato variety"] },
    { ingId: "ing_02", role: "Umami",      name: "White shiro miso",                                                     ratioValue: 40,  defaultUnit: "g", substitutions: ["sweet yellow miso"] },
    { ingId: "ing_03", role: "Fat",        name: "Unsalted butter, softened",                                            ratioValue: 30,  defaultUnit: "g", substitutions: ["vegan butter"] },
    { ingId: "ing_04", role: "Sweetener",  name: "Mirin",                                                                ratioValue: 15,  defaultUnit: "ml", substitutions: ["1 tsp honey + 1 tsp sake"] },
    { ingId: "ing_05", role: "Seasoning",  name: "Flaky sea salt",                                                       ratioValue: 4,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_06", role: "Garnish",    name: "Toasted sesame seeds",                                                 ratioValue: 5,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_07", role: "Garnish",    name: "Thinly sliced spring onion (green part only)",                         ratioValue: 10,  defaultUnit: "g", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Roast",
      inputs: ["ing_01"],
      outputState: "roasted_sweet_potato",
      instructions: "Preheat the oven to 180 C (355 F). Place the whole, unpeeled sweet potatoes directly on the oven rack with a foil-lined tray below to catch drips. Roast for 55–75 minutes depending on size (a chopstick pressed into the thickest part should meet no resistance). The skin will blister and deflate; a dark, caramelised syrup will drip from the ends.",
      visualCue: {
        primaryTarget: "Whole sweet potato in the oven",
        spectrum: [
          { state: "Underdone", description: "Skin is still taut and bright. No syrup has dripped. Centre still firm when pressed.", action: "Continue roasting. Sweet potatoes need time — the sugars must migrate and concentrate slowly. A 200 g potato typically takes 60–65 minutes." },
          { state: "Perfect",   description: "Skin is wrinkled, slightly deflated, and very dark in places. A caramelised amber syrup has crystallised around the ends and dripped onto the tray. A chopstick glides in with zero resistance anywhere, including the centre. The potato feels very soft when squeezed gently.", action: "Remove from the oven and let rest 5 minutes before splitting." },
          { state: "Overdone",  description: "Skin is blackened and dry. Syrup has burnt on the tray. Interior may have dried out near the skin.", action: "The interior is likely still excellent. Discard the outermost 3–4 mm if it tastes bitter, then proceed." },
        ],
      },
      feelCue: "Squeeze the hot potato gently through a folded kitchen towel — it should feel like a soft beanbag with no firm spots anywhere. Any hardness is undercooked flesh that needs more time.",
    },
    {
      nodeId: "step_2",
      action: "Melt",
      inputs: ["ing_02", "ing_03", "ing_04"],
      outputState: "miso_butter_glaze",
      instructions: "While the potatoes roast, combine the softened butter, white miso, and mirin in a small bowl. Stir vigorously until completely smooth and homogenous. The mixture will be a pale amber paste. Set aside at room temperature.",
      visualCue: {
        primaryTarget: "Miso butter paste",
        spectrum: [
          { state: "Underdone", description: "Butter and miso are still separate — streaks of white butter visible in the brown miso.", action: "Stir more vigorously until completely unified. Cold butter will not blend easily — let it soften fully first." },
          { state: "Perfect",   description: "A smooth, pale amber paste that holds its shape on a spoon. Smells of fermented soy, dairy, and faint sweetness from the mirin.", action: "Set aside. It will melt on contact with the hot potato." },
          { state: "Overdone",  description: "N/A — this step cannot be overdone.", action: "Proceed." },
        ],
      },
      feelCue: "The finished paste should feel silky and cohesive when rubbed between your fingers — no graininess from undissolved miso, no separation from the butter.",
    },
    {
      nodeId: "step_3",
      action: "Glaze",
      inputs: ["roasted_sweet_potato", "miso_butter_glaze", "ing_05", "ing_06", "ing_07"],
      outputState: "finished_miso_sweet_potato",
      instructions: "Split each sweet potato lengthwise with a sharp knife — but not quite all the way through. Press the two ends toward each other to open up the split and create a cavity. Spoon or pipe a generous amount of the miso butter into the cavity. Finish under the grill (broiler) at high heat for 3–4 minutes until the glaze is bubbling and caramelised. Scatter flaky salt, sesame seeds, and spring onion.",
      visualCue: {
        primaryTarget: "Glazed sweet potato under the grill",
        spectrum: [
          { state: "Underdone", description: "Miso butter has not yet caramelised — it is still pale and melted but not bronzed.", action: "Return under the grill for 2 more minutes. The sugars in both the miso and mirin need direct radiant heat to caramelise." },
          { state: "Perfect",   description: "The miso butter has bubbled and set into a deep, glossy amber-brown glaze with darker caramelised patches. The edges of the split potato are golden and slightly crisped. The kitchen smells of toasted soy and sweet caramel.", action: "Plate immediately and garnish. Eat while hot — the contrast between the caramelised exterior and the creamy interior is at its best right now." },
          { state: "Overdone",  description: "Glaze is dark brown and beginning to smell burnt. The miso's sugars have crossed from caramel to bitter.", action: "Remove immediately. Scrape off the darkest parts of the glaze and add a small knob of fresh plain butter to soften the bitterness." },
        ],
      },
      feelCue: "Scoop into the split with a spoon — the interior should part like warm silk, yielding to the lightest pressure, with the glossy glaze pooling into the hollow and the whole thing collapsing gently into itself.",
    },
  ],
};
