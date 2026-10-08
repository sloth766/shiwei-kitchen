// Thiéboudienne — Senegal's national dish, a monument of one-pot cooking.
// Author: SpiceTrader

export default {
  repoId: "master_west_african_thieboudienne_001",
  parentRepoId: null,
  slug: "thieboudienne",
  author: "ForkRecipe Kitchen",

  title: "Thiéboudienne (Senegalese Fish & Rice)",
  description: "Senegal's national dish is a lesson in architectural patience: fish stuffed with a paste of parsley, chili, and garlic, braised in a tomato-onion stock alongside whole vegetables, then the stock used to cook rice until it, too, absorbs every layer of flavor — and a smoky crust forms at the bottom as the final, prized reward.",
  cuisine: "West African",
  culture: "Senegalese",
  category: "seafood",

  tags: ["senegalese", "fish", "rice", "tomato", "one-pot"],
  difficulty: 4,
  activeTime: "1 hr",
  totalTime: "2 hrs",
  ratioSystem: "parts",

  stars: 1340,
  forks: 122,
  contributors: 17,
  license: "CC-BY-SA",
  createdAt: "2025-01-20",
  updatedAt: "2026-04-05",

  flavorRadar: { sweet: 1, salty: 4, sour: 1, bitter: 0, umami: 5, heat: 2 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Whole firm fish (thiof, snapper, grouper), scored and cleaned", ratioValue: 8, defaultUnit: "parts", substitutions: ["sea bass", "large mullet"] },
    { ingId: "ing_02", role: "Starch",    name: "Long-grain parboiled rice, rinsed",                             ratioValue: 6, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Aromatic",  name: "Tomato paste",                                                  ratioValue: 2, defaultUnit: "parts", substitutions: ["fresh tomatoes, blended and reduced"] },
    { ingId: "ing_04", role: "Allium",    name: "Yellow onion, one half sliced, one half in stuffing paste",     ratioValue: 2, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Herb",      name: "Flat-leaf parsley, for stuffing paste",                         ratioValue: 0.5, defaultUnit: "parts", substitutions: ["cilantro"] },
    { ingId: "ing_06", role: "Allium",    name: "Garlic cloves, for stuffing paste",                             ratioValue: 0.5, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Spice",     name: "Scotch bonnet pepper, halved",                                  ratioValue: 0.5, defaultUnit: "parts", substitutions: ["habanero"] },
    { ingId: "ing_08", role: "Structure", name: "Root vegetables: cassava, carrot, turnip, eggplant",            ratioValue: 5, defaultUnit: "parts", substitutions: ["sweet potato, carrot, zucchini"] },
    { ingId: "ing_09", role: "Fat",       name: "Vegetable oil",                                                 ratioValue: 2, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_10", role: "Seasoning", name: "Salt, black pepper, seasoning cube (Maggi)",                   ratioValue: 0.5, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_11", role: "Umami",     name: "Fermented locust beans (netetou) or dried shrimp",             ratioValue: 0.5, defaultUnit: "parts", substitutions: ["fish sauce, used sparingly"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Stuff and prepare fish",
      inputs: ["ing_01", "ing_05", "ing_06", "ing_04", "ing_10"],
      outputState: "stuffed_fish",
      instructions: "Blend the parsley, garlic, half the onion, half the scotch bonnet, salt, and pepper into a coarse green paste — this is the rof stuffing. Stuff the rof paste into the score marks of the fish, pressing it firmly into the cuts so the paste fills the incisions. Also rub a thin layer over the fish exterior. Let rest for 15 minutes. This step is the singular flavor signature of thiéboudienne — the rof perfumes the flesh from within as the fish braises.",
      visualCue: {
        primaryTarget: "Score marks are visibly packed with dark green paste. The fish exterior has a thin, even coating. The rof is inside and on the fish, not pooled around it.",
        spectrum: [
          { state: "Underdone", description: "Rof paste is sitting on the surface only, not packed into the score marks. It will wash off during braising rather than penetrating the flesh.", action: "Use your fingers to push the paste firmly into each cut. Make the cuts deeper if needed — they should reach almost to the bone." },
          { state: "Perfect",   description: "Every score mark is filled flush with green rof paste. The fish exterior has a thin, uniform green coating. Paste is firm and packed, not runny.", action: "Let rest 15 minutes then proceed to frying." },
          { state: "Overdone",  description: "Too much rof applied — thick clumps are falling off the fish. The paste will burn in the pan before the fish is seared.", action: "Scrape excess to a thin, even layer. A thin coat is all that is needed; the interior stuffing carries the primary flavor." },
        ],
      },
      feelCue: "Press the rof-packed score marks with your fingertip — the paste should feel firmly embedded, not yielding or loose. Bring the fish to your nose: you should smell parsley and garlic immediately.",
    },
    {
      nodeId: "step_2",
      action: "Sear fish and build base",
      inputs: ["stuffed_fish", "ing_03", "ing_04", "ing_09", "ing_11", "ing_07"],
      outputState: "tomato_broth_with_fish",
      instructions: "Heat oil in a large, wide pot over medium-high heat. Fry the stuffed fish for 3 minutes per side until the exterior is golden and the rof has crisped slightly. Remove the fish and set aside. In the same pot, fry the remaining sliced onion until golden. Add the tomato paste and fry, stirring, for 10 minutes until it darkens and the oil separates. Add the locust beans or dried shrimp and the remaining scotch bonnet half. Add enough water to cover all vegetables and fish (about 1.5 liters). Return the fish to the pot and bring to a simmer.",
      visualCue: {
        primaryTarget: "The tomato base has darkened to a deep burnt-orange and the oil has clearly separated around the pot edges. The stock is a rich amber-red, deeply aromatic.",
        spectrum: [
          { state: "Underdone", description: "Tomato paste is still bright red and raw-tasting. The oil has not separated and the base is wet and thin. Raw tomato acidity will dominate the final dish.", action: "Continue frying the tomato paste. This step requires patience — 10 minutes of active frying is the minimum." },
          { state: "Perfect",   description: "Deep orange-red base with oil clearly separated at the edges. The pot smells of caramelized tomato, onion, and a deep savory note from the locust beans.", action: "Add water, return fish, and bring to a simmer to cook the fish and vegetables." },
          { state: "Overdone",  description: "Tomato paste is dark brown with a bitter, acrid smell. Small black bits visible.", action: "Deglaze with water immediately. Taste the resulting liquid — if too bitter, add a pinch of sugar and proceed." },
        ],
      },
      feelCue: "The aroma rising from the pot at this stage should be deeply complex — caramelized tomato, sweet onion, and the pungent, fermented depth of the locust beans all layered and distinct, yet harmonious.",
    },
    {
      nodeId: "step_3",
      action: "Braise fish and vegetables",
      inputs: ["tomato_broth_with_fish", "ing_08"],
      outputState: "braised_fish_and_vegetables",
      instructions: "Add the root vegetables (cassava, carrot, turnip, eggplant) to the pot around the fish. Bring to a gentle simmer, cover, and cook for 20–25 minutes until the fish is cooked through and the vegetables are tender. As elements finish cooking, remove them to a serving platter and keep warm — the cassava and turnip take longer than the eggplant. Reserve ALL the braising stock — it is the most important ingredient in the dish.",
      visualCue: {
        primaryTarget: "Fish flesh is fully opaque and flakes at the thickest part of the spine when pressed. Vegetables yield to a knife with no resistance. The braising stock is deeply colored and rich.",
        spectrum: [
          { state: "Underdone", description: "Fish flesh is still translucent near the spine. Carrots and cassava resist a knife. Braising liquid looks thin.", action: "Cover and simmer for another 10 minutes. Root vegetables often take longer than expected — check them individually." },
          { state: "Perfect",   description: "Fish flakes cleanly at the spine with gentle pressure. All vegetables yield fully to a knife. Stock is deeply flavored and richly colored — almost like a consommé-rich broth.", action: "Remove fish and all vegetables to a platter. Strain and reserve every drop of stock for the rice." },
          { state: "Overdone",  description: "Fish has broken apart in the pot. Vegetables are very soft and some are beginning to dissolve. The stock has reduced significantly.", action: "Carefully scoop out the fish in pieces. Add water to bring the stock volume back up to the amount needed for the rice." },
        ],
      },
      feelCue: "Taste a spoonful of the braising stock — it should be deeply savory, tasting of fish, tomato, and a complex background of fermented locust beans. This is the soul of the dish; it should make you want to drink it.",
    },
    {
      nodeId: "step_4",
      action: "Cook rice in fish stock",
      inputs: ["braised_fish_and_vegetables", "ing_02", "ing_10"],
      outputState: "cooked_thieb_rice",
      instructions: "Measure the braising stock — you need a ratio of about 1.5 parts stock to 1 part rice. Top up with water if necessary and season the stock well (it should taste slightly salty). Bring the stock to a boil in the wide pot, add the rinsed rice, and stir once. Reduce heat to low. Cover with foil then lid (the tight steam seal from the jollof technique). Cook for 25–30 minutes until all liquid is absorbed and the rice is tender. Then uncover and increase heat for 3–5 minutes to develop the crust.",
      visualCue: {
        primaryTarget: "Rice is fully cooked and uniformly orange-red from the stock. The surface is dotted with burst steam bubbles. The bottom crust crackles audibly when the pot is shaken.",
        spectrum: [
          { state: "Underdone", description: "Rice grains have a hard white center when bitten. Some liquid still pooled around the edges of the foil.", action: "Re-seal and cook for 5–8 more minutes. The tight seal is critical — steam escaping means uneven cooking." },
          { state: "Perfect",   description: "Uniformly cooked, richly flavored rice in a warm amber color. Grains are separate and fluffy. The base of the pot crackles like caramel when shaken — the crust has formed.", action: "Remove from heat, rest 2 minutes. Serve rice with fish and vegetables arranged on top." },
          { state: "Overdone",  description: "Rice is mushy and clumping. Crust has burned beyond smokiness to bitterness.", action: "Scoop the upper rice immediately, leaving the burned crust. Spread on a wide plate to stop cooking. Taste the crust before deciding whether to serve it." },
        ],
      },
      feelCue: "Scrape the bottom of the pot with a spoon after the crust step — it should release in firm, caramelized chips that smell of toasted rice and spiced fish stock, not scorched or acrid.",
    },
    {
      nodeId: "step_5",
      action: "Plate and serve",
      inputs: ["cooked_thieb_rice", "braised_fish_and_vegetables"],
      outputState: "finished_thieboudienne",
      instructions: "Traditionally, thiéboudienne is served on a large communal platter: mound the rice in the center, arrange the fish on top (keeping it as whole as possible even if it has broken during cooking), and distribute the vegetables around the rice. Place the crust chips alongside or on top as a crispy bonus. Spoon any remaining braising liquid over the fish. Serve with lime wedges and a side of fermented onion-and-mustard dibi sauce if available.",
      visualCue: {
        primaryTarget: "A mountain of amber-red rice with a whole fish (or large pieces) on top, surrounded by richly colored root vegetables. The crust pieces are dark orange-brown, visible and appealing.",
        spectrum: [
          { state: "Underdone", description: "The presentation is complete but the rice is still pale and the fish looks dry. The dish hasn't come together visually or aromatically.", action: "This is a plating note, not a cooking note — return to the previous step and check the rice and fish temperature and seasoning before serving." },
          { state: "Perfect",   description: "The platter is visually striking — deep warm colors, the fish as the centerpiece, vegetables like jewels around it. The kitchen smells of the sea, tomato, and toasted rice all at once.", action: "Serve at the table and let guests dig in communally." },
          { state: "Overdone",  description: "Fish has fully broken down into flakes scattered throughout the rice rather than sitting as a centerpiece. Vegetables have dissolved.", action: "Stir everything together into a more rustic presentation — it will taste identical, just less majestic. Present with the crust prominently." },
        ],
      },
      feelCue: "Stand over the finished platter and breathe in — the aroma should be like standing at a Senegalese coastal market: sea salt, wood smoke, caramelized tomato, and something fermented and deep that you cannot quite name but cannot stop smelling.",
    },
  ],
};
