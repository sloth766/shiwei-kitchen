export default {
  repoId: "master_israeli_shakshuka_verde_001",
  parentRepoId: null,
  slug: "shakshuka-verde",
  author: "ForkRecipe Kitchen",

  title: "Shakshuka Verde",
  description: "Green shakshuka: tomatillos and charred jalapeños form a bright, tangy, mildly spicy sauce in which eggs are poached just until the whites are set and the yolks still run gold — a pan of morning fire that wakes up slowly, then all at once.",
  cuisine: "Israeli",
  culture: "Israeli",
  category: "eggs",

  tags: ["vegetarian", "gluten-free", "eggs", "green", "tomatillo", "shakshuka"],
  difficulty: 2,
  activeTime: "30 min",
  totalTime: "45 min",
  ratioSystem: "weight",

  stars: 0, forks: 0, contributors: 1, license: "CC-BY-SA",
  createdAt: "2026-06-27", updatedAt: "2026-06-27",

  flavorRadar: { sweet: 1, salty: 3, sour: 3, bitter: 2, umami: 2, heat: 3 },

  ingredients: [
    { ingId: "ing_01", role: "Acid",       name: "Tomatillos, husked and halved",                      ratioValue: 500, defaultUnit: "g", substitutions: ["green tomatoes"] },
    { ingId: "ing_02", role: "Heat",       name: "Fresh jalapeño chillies",                            ratioValue: 80,  defaultUnit: "g", substitutions: ["serrano chillies (hotter)", "poblano (milder)"] },
    { ingId: "ing_03", role: "Structure",  name: "Baby spinach",                                       ratioValue: 100, defaultUnit: "g", substitutions: ["Swiss chard"] },
    { ingId: "ing_04", role: "Protein",    name: "Large eggs",                                         ratioValue: 300, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_05", role: "Allium",     name: "White onion, finely diced",                          ratioValue: 150, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_06", role: "Allium",     name: "Garlic cloves, minced",                              ratioValue: 12,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_07", role: "Fat",        name: "Olive oil",                                          ratioValue: 40,  defaultUnit: "ml", substitutions: [] },
    { ingId: "ing_08", role: "Spice",      name: "Ground cumin",                                       ratioValue: 5,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_09", role: "Herb",       name: "Fresh coriander (cilantro), chopped, plus more for garnish", ratioValue: 20, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_10", role: "Dairy",      name: "Feta cheese, crumbled",                              ratioValue: 80,  defaultUnit: "g", substitutions: ["goat's cheese", "labneh dollops"] },
    { ingId: "ing_11", role: "Seasoning",  name: "Fine salt and black pepper",                         ratioValue: 8,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_12", role: "Citrus",     name: "Lime juice",                                         ratioValue: 15,  defaultUnit: "ml", substitutions: ["lemon juice"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Roast",
      inputs: ["ing_01", "ing_02"],
      outputState: "charred_tomatillos",
      instructions: "Place the halved tomatillos and whole jalapeños on a foil-lined baking tray. Place directly under a hot grill (broiler) at maximum heat for 8–10 minutes, turning the jalapeños once halfway, until both the tomatillos and jalapeños are blistered and charred in spots. The tomatillo flesh will soften and slump. Transfer to a blender along with any accumulated juices.",
      visualCue: {
        primaryTarget: "Tomatillos and jalapeños under the grill",
        spectrum: [
          { state: "Underdone", description: "Tomatillos are still firm and bright green with no char. Jalapeños are unchanged.", action: "Return to the grill. The char is what introduces smokiness to the otherwise tart, bright sauce." },
          { state: "Perfect",   description: "Tomatillos are blistered and collapsed, slightly blackened at their cut edges with a rich, sweet-tart smell. Jalapeños have blackened skin in places and smell roasted and slightly smoky.", action: "Blend to a coarse purée, seeds and all from the jalapeños — this controls heat level." },
          { state: "Overdone",  description: "Both vegetables are very dark and starting to dry out. Acrid, burnt smell.", action: "Use them anyway — the bitterness of a small amount of char adds complexity. Remove any deeply burnt sections of jalapeño skin." },
        ],
      },
      feelCue: "After blending, the sauce should feel slightly textured on the tongue — not completely smooth. The tomatillo seeds add a faint crunch and the charred skin gives tiny bitter flecks throughout.",
    },
    {
      nodeId: "step_2",
      action: "Blend",
      inputs: ["charred_tomatillos"],
      outputState: "verde_sauce",
      instructions: "Blend the roasted tomatillos and jalapeños to a coarse purée. You want a rough, slightly chunky texture rather than a smooth sauce — blend in short pulses. Season with a pinch of salt and taste: it should be tart, faintly smoky, and have a gentle creeping heat.",
      visualCue: {
        primaryTarget: "Blended verde sauce",
        spectrum: [
          { state: "Underdone", description: "Sauce is still chunky with large pieces of tomatillo and jalapeño. Uneven texture will make it hard for the eggs to cook evenly.", action: "Pulse a few more times — aim for the texture of a rough salsa." },
          { state: "Perfect",   description: "A vivid, slightly textured green sauce — not smooth, not chunky. Colour is a deep, slightly muted olive-green from the charring. Smells of lime-adjacent tartness, smoke, and chilli.", action: "Proceed to build the sauce in the pan." },
          { state: "Overdone",  description: "Sauce has been blended to a completely smooth, uniform liquid with no texture.", action: "Still usable — the eggs will still cook correctly." },
        ],
      },
      feelCue: "The raw verde sauce on your finger should sting slightly from the jalapeño — if there is no heat at all, add more jalapeño; if it is incendiary, remove more seeds before blending.",
    },
    {
      nodeId: "step_3",
      action: "Sauté",
      inputs: ["ing_07", "ing_05", "ing_06", "ing_08"],
      outputState: "spiced_aromatics",
      instructions: "In a wide, lidded pan, heat the olive oil over medium heat. Cook the onion with a pinch of salt for 7–8 minutes until soft and translucent. Add the garlic and cumin; cook for 90 seconds until fragrant.",
      visualCue: {
        primaryTarget: "Onion in the pan",
        spectrum: [
          { state: "Underdone", description: "Onion is still crisp and raw-smelling. The harshness will not cook out when the sauce is added.", action: "Continue softening — the onion should virtually melt." },
          { state: "Perfect",   description: "Onion is translucent and very soft. Garlic and cumin are fragrant and nutty. No browning.", action: "Add the verde sauce." },
          { state: "Overdone",  description: "Onion has browned significantly. Pan is too hot for the eggs.", action: "Lower heat and add the sauce immediately to cool the pan." },
        ],
      },
      feelCue: "A softened onion piece should dissolve almost completely when pressed between your tongue and the roof of your mouth — no fibre, no crunch, just yielding sweetness.",
    },
    {
      nodeId: "step_4",
      action: "Simmer",
      inputs: ["spiced_aromatics", "verde_sauce", "ing_03", "ing_09", "ing_11"],
      outputState: "verde_shakshuka_sauce",
      instructions: "Pour the verde purée into the pan with the aromatics. Stir together and simmer over medium heat for 5–7 minutes until the sauce has thickened slightly and the raw edge of the tomatillo has mellowed. Stir in the spinach until wilted, about 90 seconds. Add the coriander. Taste and add salt and lime juice to balance.",
      visualCue: {
        primaryTarget: "Sauce with wilted spinach",
        spectrum: [
          { state: "Underdone", description: "Sauce is very thin and still tastes predominantly of raw tomatillo. Spinach has not yet wilted.", action: "Simmer longer and stir the spinach in — it needs to wilt completely before the eggs go in." },
          { state: "Perfect",   description: "Sauce has thickened to a loose, spoonable consistency. Spinach has wilted fully and is uniformly green throughout the sauce. Colour is a rich, deep sage-green.", action: "Create wells and add the eggs." },
          { state: "Overdone",  description: "Sauce has reduced too much and is sticking to the pan. Very thick.", action: "Add 3–4 tablespoons of water and stir to loosen before adding the eggs." },
        ],
      },
      feelCue: "The sauce at this stage should move like a thick porridge in the pan — slowly spreading to fill any space when stirred, heavy enough to hold the shape of a spoon-well for the eggs.",
    },
    {
      nodeId: "step_5",
      action: "Poach",
      inputs: ["verde_shakshuka_sauce", "ing_04", "ing_10"],
      outputState: "finished_shakshuka_verde",
      instructions: "Use a large spoon to create 4–5 wells in the sauce. Crack one egg into each well. Scatter the crumbled feta around the eggs. Cover the pan tightly and cook over medium-low heat for 5–7 minutes until the whites are fully set and opaque but the yolks remain runny when pressed. Do not lift the lid until the minimum time has elapsed.",
      visualCue: {
        primaryTarget: "Eggs poaching in the verde sauce",
        spectrum: [
          { state: "Underdone", description: "Whites are still translucent and jiggly. Runny white will be unpleasant — wait for full opacity.", action: "Re-cover and cook for 2 more minutes. Check every minute." },
          { state: "Perfect",   description: "Whites are fully opaque and set all the way to the edges where they meet the sauce. The yolk has a thin, just-set top film but visibly bulges and moves when the pan is gently tilted — it is still liquid inside. Feta has softened and is beginning to melt at the edges.", action: "Serve directly from the pan. Every second of additional cooking moves the yolk toward hard-set." },
          { state: "Overdone",  description: "Yolks are pale and domed but hard — pressing lightly reveals no give. The whites have contracted and pulled away from the sauce.", action: "Serve immediately regardless — nothing can restore a hard yolk." },
        ],
      },
      feelCue: "Press the top of a yolk very gently with your fingertip — a runny yolk should feel like a water balloon, giving beneath light pressure and feeling liquid inside its tight skin.",
    },
  ],
};
