export default {
  repoId: "master_mexican_arroz_verde_001",
  parentRepoId: null,
  slug: "arroz-verde",
  author: "ForkRecipe Kitchen",

  title: "Arroz Verde",
  description: "Mexican green rice — long-grain rice toasted in oil until each grain turns translucent and nutty, then cooked in a blended purée of poblano pepper, jalapeño, cilantro, garlic, and onion until every grain is stained a vivid, verdant green and perfumed throughout with roasted chile.",
  cuisine: "Mexican",
  culture: "Central Mexican",
  category: "grains",

  tags: ["vegan", "gluten-free", "mexican", "rice", "poblano", "cilantro"],
  difficulty: 1,
  activeTime: "20 min",
  totalTime: "40 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 0, salty: 2, sour: 0, bitter: 0, umami: 1, heat: 2 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Long-grain white rice",                         ratioValue: 300, defaultUnit: "g",   substitutions: ["basmati rice (slightly more fragrant result)"] },
    { ingId: "ing_02", role: "Aromatic",   name: "Poblano pepper (roughly chopped)",              ratioValue: 150, defaultUnit: "g",   substitutions: ["2 Anaheim peppers", "1 green bell pepper + pinch extra cayenne"] },
    { ingId: "ing_03", role: "Heat",       name: "Jalapeño (roughly chopped, seeds optional)",    ratioValue: 1,   defaultUnit: "whole", substitutions: ["serrano chile (hotter)", "omit for mild version"] },
    { ingId: "ing_04", role: "Herb",       name: "Fresh cilantro (leaves and stems)",             ratioValue: 40,  defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_05", role: "Allium",     name: "White onion (roughly chopped)",                 ratioValue: 100, defaultUnit: "g",   substitutions: ["yellow onion"] },
    { ingId: "ing_06", role: "Allium",     name: "Garlic cloves",                                 ratioValue: 3,   defaultUnit: "cloves", substitutions: [] },
    { ingId: "ing_07", role: "Liquid",     name: "Chicken or vegetable stock",                    ratioValue: 500, defaultUnit: "ml",  substitutions: ["water (less flavor)"] },
    { ingId: "ing_08", role: "Fat",        name: "Neutral oil (sunflower or vegetable)",          ratioValue: 45,  defaultUnit: "ml",  substitutions: [] },
    { ingId: "ing_09", role: "Seasoning",  name: "Fine salt",                                     ratioValue: 7,   defaultUnit: "g",   substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Blend",
      inputs: ["ing_02", "ing_03", "ing_04", "ing_05", "ing_06", "ing_07"],
      outputState: "green_puree",
      instructions: "Combine the poblano, jalapeño, cilantro (stems and all), onion, and garlic in a blender. Add 250 ml of the stock. Blitz on high for 60-90 seconds until completely smooth with no visible pieces. The purée will be a vivid, almost neon green at first — it will darken as it cooks. Season the purée lightly with salt before adding it to the rice. Measure it — you need approximately 500 ml of purée total; if you have more, reserve it. If less, add a little more stock.",
      visualCue: {
        primaryTarget: "A smooth, vividly green liquid purée with no chunks. The color is electric — somewhere between grass green and jade.",
        spectrum: [
          { state: "Underdone", description: "Visible chunks of pepper and onion floating in the purée. The blender has not run long enough.", action: "Blend for another 30-45 seconds. Any unblended pieces will cook unevenly into the rice." },
          { state: "Perfect",   description: "Completely smooth, pourable, a brilliant green. Smells intensely of fresh cilantro and raw chile.", action: "Proceed to toast the rice." },
          { state: "Overdone",  description: "The blender has warmed the mixture noticeably from prolonged blending.", action: "This is fine — proceed. The warmth does not affect the outcome." },
        ],
      },
      feelCue: "Rubbed between fingertips, the purée should feel silky and uniform with no gritty texture — any roughness means the pepper skins or stems are not fully broken down.",
    },
    {
      nodeId: "step_2",
      action: "Toast",
      inputs: ["ing_01", "ing_08"],
      outputState: "toasted_rice",
      instructions: "Rinse the rice under cold water until the water runs clear, then spread it out on a clean kitchen towel and pat as dry as possible — wet rice will spatter violently in the hot oil and steam instead of toasting. Heat the oil in a wide, heavy-bottomed pot with a tight-fitting lid over medium-high heat until the oil shimmers. Add the dry rice and spread into an even layer. Cook, stirring constantly, for 4-5 minutes until the grains turn from white to a pale, even golden color and smell nutty and toasted.",
      visualCue: {
        primaryTarget: "Grains are an even, pale golden color — not white, not brown, but the specific blonde of toasted bread. Each grain looks opaque and slightly shiny.",
        spectrum: [
          { state: "Underdone", description: "Grains are still mostly white and translucent with no nutty aroma. Only the edges are beginning to color.", action: "Continue stirring over medium-high heat — undertested rice will taste bland and may not absorb the purée evenly." },
          { state: "Perfect",   description: "Every grain is uniformly pale golden. The kitchen smells of popcorn and warm grain. The rice sounds dry and clicking as it moves in the pot.", action: "Add the green purée immediately." },
          { state: "Overdone",  description: "Grains are deep golden-brown, some approaching burnt. A sharp, almost bitter toasted smell.", action: "Reduce heat and add the purée immediately to stop the toasting. The extra color adds bitterness — reduce the cooking time slightly." },
        ],
      },
      feelCue: "At proper toast stage, the rice grains sliding against the pot make a dry, sand-like sound — a continuous whispering clicks that tells you the moisture is gone and the starch is ready.",
    },
    {
      nodeId: "step_3",
      action: "Fry",
      inputs: ["toasted_rice", "green_puree"],
      outputState: "color_absorbed_rice",
      instructions: "Pour the entire green purée over the toasted rice all at once — it will hiss and spatter as it hits the hot oil and rice, so stand back. Stir immediately to prevent any rice from sticking. Cook over medium-high heat, stirring frequently, for 3-4 minutes as the purée dries out and the rice absorbs the green color. You are essentially frying the purée into the rice — when it no longer looks wet and the rice has absorbed the vivid green color, it is ready for the remaining stock.",
      visualCue: {
        primaryTarget: "The rice has absorbed the green purée and looks uniformly stained a deep, matte green. The base looks mostly dry with only a slight sheen of oil remaining.",
        spectrum: [
          { state: "Underdone", description: "The purée is still visibly wet and pooling around the rice. The mixture smells raw and of fresh herbs.", action: "Continue stirring over medium-high heat — the purée must dry and absorb before the stock is added, or the rice will be waterlogged." },
          { state: "Perfect",   description: "Rice is stained a deep green and looks mostly dry. No pools of liquid. The smell has shifted from raw to cooked chile — darker, sweeter, more complex.", action: "Add the remaining stock and salt immediately." },
          { state: "Overdone",  description: "The purée has dried completely and the rice is beginning to stick and scorch at the bottom.", action: "Add the stock immediately and deglaze the bottom by scraping with a spoon." },
        ],
      },
      feelCue: "When the purée is properly absorbed, the rice sounds different when stirred — from wet, heavy squelching to a lighter, slightly crackling sound, as if the water has left and only the green essence remains.",
    },
    {
      nodeId: "step_4",
      action: "Simmer",
      inputs: ["color_absorbed_rice", "ing_07", "ing_09"],
      outputState: "cooked_arroz_verde",
      instructions: "Pour the remaining stock (250 ml) over the rice, add the salt, and stir once to distribute. Bring to a full boil over high heat. Once boiling, reduce to the absolute lowest heat, cover tightly, and cook for 15 minutes without lifting the lid. The rice needs to steam in this final stage — every time the lid is lifted, you lose steam and the rice will cook unevenly. Set a timer and do not open the pot.",
      visualCue: {
        primaryTarget: "Before the lid goes on: a bright green mass of rice in just enough stock to cover. After 15 minutes: steam hole craters on the surface, no visible standing liquid.",
        spectrum: [
          { state: "Underdone", description: "After 15 minutes, liquid is still visible on the surface and steam holes have not formed.", action: "Replace the lid and cook for 3-5 more minutes on the lowest heat." },
          { state: "Perfect",   description: "Steam holes across the surface. No standing liquid. A clean, sweet-chile aroma rises from the pot when the lid is lifted.", action: "Remove from heat, keep the lid on, and rest for 5 minutes." },
          { state: "Overdone",  description: "The rice has dried out and the bottom smells of scorching before the time is up.", action: "Remove from heat immediately and do not scrape the bottom when fluffing. The crust at the bottom is acceptable." },
        ],
      },
      feelCue: "The lid of the pot after 10 minutes should feel hot to the touch and condensation should be visibly beading on the underside — signs that the steam is circulating and the rice is cooking properly.",
    },
    {
      nodeId: "step_5",
      action: "Finish",
      inputs: ["cooked_arroz_verde"],
      outputState: "finished_arroz_verde",
      instructions: "Remove from heat and let the rice rest, covered, for 5 minutes to allow the steam to redistribute evenly through the grains. Uncover and fluff gently with a fork, using a lifting and separating motion from the bottom of the pot. Taste and adjust salt. The rice should be a deep, even green throughout each grain — not just surface-stained. Serve as a side dish alongside chicken, fish, or beans, or as a base for a grain bowl.",
      visualCue: {
        primaryTarget: "Every grain is deep green through and through, distinct and fluffy, not clumped. The color is a rich, warm green rather than the vivid neon of the raw purée.",
        spectrum: [
          { state: "Underdone", description: "Some grains in the center are still firm and pale green, indicating insufficient cooking or not enough steam.", action: "Return to the lowest heat, add 2 tablespoons of water, cover, and cook 5 more minutes." },
          { state: "Perfect",   description: "Tender, fluffy, deeply green grains that smell of roasted chile and cilantro. Each grain is separate. The bottom has a thin, lightly toasted crust that releases cleanly.", action: "Serve immediately for the best texture, or keep covered with a cloth for up to 20 minutes." },
          { state: "Overdone",  description: "Grains are soft and beginning to clump. The green color has dullled slightly to an olive shade.", action: "Serve immediately — it will not improve with more resting. It is still delicious." },
        ],
      },
      feelCue: "A grain of arroz verde pinched between fingers should be uniformly green all the way through — if the center is still white, the rice absorbed the color on the outside but the purée did not penetrate fully during the frying step.",
    },
  ],
};
