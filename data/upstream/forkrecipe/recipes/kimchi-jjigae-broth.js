export default {
  repoId: "master_korean_kimchi-jjigae-broth_001",
  parentRepoId: null,
  slug: "kimchi-jjigae-broth",
  author: "ForkRecipe Kitchen",

  title: "Kimchi Jjigae Broth",
  description: "A rust-red broth that hits with funky fermented depth before pork fat coats your tongue — built from aged kimchi that collapses into a silky, lip-sticking stock that smells like the inside of a Korean grandmother's refrigerator in the best possible way.",
  cuisine: "Korean",
  culture: "Korean Home Cooking",
  category: "stocks",

  tags: ["kimchi", "stew", "korean", "pork", "fermented"],
  difficulty: 2,
  activeTime: "20 min",
  totalTime: "50 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",

  // 0–5 scale. Aged kimchi and gochugaru push sour, heat, and umami high.
  flavorRadar: { sweet: 1, salty: 4, sour: 4, bitter: 1, umami: 5, heat: 4 },

  ingredients: [
    // Fermented kimchi is the structural backbone of this broth.
    { ingId: "ing_01", role: "Structure",  name: "Aged napa cabbage kimchi (at least 2 weeks old), roughly chopped", ratioValue: 4,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_02", role: "Protein",    name: "Pork belly or shoulder, cut into 3 cm cubes",                      ratioValue: 3,   defaultUnit: "parts", substitutions: ["firm tofu for vegetarian"] },
    { ingId: "ing_03", role: "Liquid",     name: "Anchovy-kelp dashi or water",                                       ratioValue: 6,   defaultUnit: "parts", substitutions: ["low-sodium chicken stock"] },
    { ingId: "ing_04", role: "Umami",      name: "Kimchi brine (reserved from the kimchi jar)",                       ratioValue: 1,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Spice",      name: "Gochugaru (Korean red pepper flakes)",                              ratioValue: 0.5, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Umami",      name: "Doenjang (fermented soybean paste)",                                ratioValue: 0.25, defaultUnit: "parts", substitutions: ["white miso"] },
    { ingId: "ing_07", role: "Seasoning",  name: "Fish sauce",                                                        ratioValue: 0.25, defaultUnit: "parts", substitutions: ["soy sauce"] },
    { ingId: "ing_08", role: "Allium",     name: "Garlic, minced (4 cloves)",                                         ratioValue: 0.25, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_09", role: "Seasoning",  name: "Sesame oil, to finish",                                             ratioValue: 0.1,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_10", role: "Garnish",    name: "Scallion, sliced on the bias",                                      ratioValue: 0.25, defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Sear",
      inputs: ["ing_02"],
      outputState: "browned_pork",
      instructions: "Set a heavy-bottomed pot or Korean earthenware dolsot over medium-high heat without oil. Add pork cubes in a single layer and leave them undisturbed for 2–3 minutes. You want rendered fat pooling in the pot and caramel-brown crusts on at least two sides — this Maillard base is what gives the broth body. Turn once and brown the opposite side for 90 seconds. The pork should not be cooked through.",
      visualCue: {
        primaryTarget: "Mahogany-brown crust on at least two faces of each cube. Fat has rendered into the pot and the pork sizzles loudly in its own fat.",
        spectrum: [
          { state: "Underdone", description: "Meat is grey-white and steaming rather than searing. Fat has not rendered.", action: "Raise the heat and stop touching the meat — patience here pays dividends in broth depth." },
          { state: "Perfect",   description: "Deep brown crusts, clear rendered fat pooling, the pot smells of roasted meat. Pork still raw at the center.", action: "Lower heat to medium and add garlic and gochugaru." },
          { state: "Overdone",  description: "Crust is turning very dark or burning. Fond on the pot bottom is scorching.", action: "Add a splash of dashi immediately to deglaze, then proceed. The fond is still flavourful if not black." },
        ],
      },
      feelCue: "You should hear a sustained, aggressive sizzle the moment pork hits the pot — a quiet or steaming sound means the pot or pork is too wet; pat the pork dry and raise the heat.",
    },
    {
      nodeId: "step_2",
      action: "Sauté",
      inputs: ["browned_pork", "ing_08", "ing_05"],
      outputState: "bloomed_base",
      instructions: "Push the pork to one side. Drop garlic and gochugaru into the rendered fat in the center of the pot. Stir and cook for 60–90 seconds until the garlic is fragrant but not browned and the gochugaru has turned the fat a vivid brick-red. This blooms the fat-soluble capsaicin compounds and builds colour into the broth from the start.",
      visualCue: {
        primaryTarget: "The fat in the pot is uniformly deep red-orange. Garlic smells sweet and cooked, not sharp. No dark brown spots on the garlic.",
        spectrum: [
          { state: "Underdone", description: "Fat still orange-yellow. Raw garlic smell still sharp and pungent.", action: "Keep stirring on medium heat for another 30 seconds." },
          { state: "Perfect",   description: "Fat is rich brick-red. Garlic is softened and sweet-smelling. Kitchen smells of toasted chili.", action: "Add kimchi and stir to coat in the red oil." },
          { state: "Overdone",  description: "Garlic is tan or brown. Gochugaru has darkened and smells bitter.", action: "Add kimchi immediately and deglaze — the broth will absorb and mellow the bitterness." },
        ],
      },
      feelCue: "The fat should smell warm and deeply spiced, not acrid — a burnt-chili smell means the heat is too high.",
    },
    {
      nodeId: "step_3",
      action: "Simmer",
      inputs: ["bloomed_base", "ing_01", "ing_04", "ing_06"],
      outputState: "braised_kimchi",
      instructions: "Add the chopped kimchi and its reserved brine, then the doenjang. Stir everything together, coating the kimchi in the red fat. Raise heat to medium and cook the kimchi for 5–7 minutes, stirring occasionally. The kimchi will begin to soften and deepen in colour from bright orange-red to a darker, brick-maroon. The smell shifts from sharply fermented to rounder and more complex.",
      visualCue: {
        primaryTarget: "Kimchi has wilted and darkened to a brick-maroon. The pot smells of cooked fermented cabbage — punchy and complex, not raw.",
        spectrum: [
          { state: "Underdone", description: "Kimchi is still bright orange and barely wilted. Brine smells raw and acidic.", action: "Cook 2–3 more minutes, stirring. The kimchi needs to fry a little in the fat." },
          { state: "Perfect",   description: "Kimchi is visibly softened, darker, and fragrant. The doenjang has dissolved into the mix and smells savory.", action: "Pour in the dashi and raise heat to a boil." },
          { state: "Overdone",  description: "Kimchi has collapsed to mush and is beginning to stick. Pot smells scorched.", action: "Add dashi immediately and scrape the bottom. The flavour is concentrated but not lost." },
        ],
      },
      feelCue: "When you press a piece of kimchi with a wooden spoon it should yield easily and feel silky rather than crisp or squeaky.",
    },
    {
      nodeId: "step_4",
      action: "Simmer",
      inputs: ["braised_kimchi", "ing_03", "ing_07"],
      outputState: "developed_broth",
      instructions: "Pour in the anchovy-kelp dashi and fish sauce. Bring to a vigorous boil over high heat, then reduce to a gentle, steady simmer. Cook uncovered for 20–25 minutes. The broth will reduce slightly and the pork will become tender. Skim any grey foam that rises in the first 5 minutes — after that, the fat rising is flavourful and should be left in.",
      visualCue: {
        primaryTarget: "Broth is a deep brick-red, slightly opaque, with fat droplets shimmering on the surface. Pork cubes are tender when pressed with a spoon.",
        spectrum: [
          { state: "Underdone", description: "Broth is thin and still tastes sharp and raw-kimchi acidic. Pork is chewy.", action: "Continue simmering — 10 more minutes will knit it together." },
          { state: "Perfect",   description: "Broth has body, a round fermented depth, and the pork yields to gentle pressure. The fat has partially emulsified into the liquid, giving it a silky feel on the lip.", action: "Taste and season, then finish with sesame oil." },
          { state: "Overdone",  description: "Broth has reduced to a very thick paste. Kimchi is disintegrating.", action: "Add 1/4 cup hot water to bring it back, simmer 2 minutes to re-integrate." },
        ],
      },
      feelCue: "Dip a spoon and let the broth coat the back — it should leave a thin, slightly clinging film rather than sheeting off clean like water.",
    },
    {
      nodeId: "step_5",
      action: "Season",
      inputs: ["developed_broth", "ing_09", "ing_10"],
      outputState: "finished_kimchi_jjigae_broth",
      instructions: "Taste the broth and adjust: if it needs salt, add fish sauce in 1/4-teaspoon increments rather than table salt. If it's too sour, a small pinch of sugar (not in the recipe — use judgment) will round it. If it's flat, add a little more kimchi brine. Remove from heat and drizzle sesame oil over the surface — do not stir it in fully, let it pool in patches. Scatter scallion over the top and serve immediately in the pot.",
      visualCue: {
        primaryTarget: "Broth surface gleams with sesame oil pools. Scallion is bright green against the dark red broth. Steam carries a warm, complex, fermented-spicy aroma.",
        spectrum: [
          { state: "Underdone", description: "Sesame oil not added. Scallion raw. Broth seasoning not tasted and adjusted.", action: "Finish the seasoning step — the sesame oil is structural to the aroma, not optional." },
          { state: "Perfect",   description: "Broth is complex, lip-smacking, and deeply savory with a clean chili finish. Scallion adds fresh contrast.", action: "Serve in the pot immediately while still at a rolling simmer." },
          { state: "Overdone",  description: "Too much sesame oil has made the broth greasy and the sesame aroma dominates.", action: "Blot surface with a paper towel or add a splash more dashi to dilute." },
        ],
      },
      feelCue: "The finished broth should make the inside of your cheeks salivate immediately on the first taste — salt, acid, and umami all hitting simultaneously before the chili heat builds on the back of the throat.",
    },
  ],
};
