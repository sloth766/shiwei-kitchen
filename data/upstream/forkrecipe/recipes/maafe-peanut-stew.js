// Maafe — West African peanut stew from Mali and Senegal.
// Author: SpiceTrader

export default {
  repoId: "master_west_african_maafe_peanut_stew_001",
  parentRepoId: null,
  slug: "maafe-peanut-stew",
  author: "ForkRecipe Kitchen",

  title: "Maafe (West African Peanut Stew)",
  description: "A Malian and Senegalese stew where peanut butter melts into a tomato and broth base, enveloping braised lamb and sweet potato in a sauce so rich and unctuous it clings to the spoon like liquid velvet — every bowl a tightrope between nutty sweetness and savory, peppery depth.",
  cuisine: "West African",
  culture: "Malian/Senegalese",
  category: "proteins",

  tags: ["west-african", "peanut", "stew", "lamb", "tomato"],
  difficulty: 2,
  activeTime: "25 min",
  totalTime: "1 hr 15 min",
  ratioSystem: "parts",

  stars: 1780,
  forks: 165,
  contributors: 21,
  license: "CC-BY-SA",
  createdAt: "2024-10-14",
  updatedAt: "2025-12-28",

  flavorRadar: { sweet: 2, salty: 3, sour: 1, bitter: 0, umami: 3, heat: 2 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Bone-in lamb shoulder, cut into 5 cm pieces",  ratioValue: 8,  defaultUnit: "parts", substitutions: ["beef chuck", "skin-on chicken thighs"] },
    { ingId: "ing_02", role: "Structure", name: "Unsweetened peanut butter (smooth)",            ratioValue: 4,  defaultUnit: "parts", substitutions: ["freshly ground roasted peanuts"] },
    { ingId: "ing_03", role: "Aromatic",  name: "Canned whole tomatoes, crushed by hand",        ratioValue: 4,  defaultUnit: "parts", substitutions: ["4 fresh plum tomatoes, blended"] },
    { ingId: "ing_04", role: "Allium",    name: "Onion, diced",                                  ratioValue: 2,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Starch",    name: "Sweet potato, peeled and cubed",                ratioValue: 3,  defaultUnit: "parts", substitutions: ["regular potato", "winter squash"] },
    { ingId: "ing_06", role: "Liquid",    name: "Chicken or lamb stock",                         ratioValue: 6,  defaultUnit: "parts", substitutions: ["water"] },
    { ingId: "ing_07", role: "Spice",     name: "Fresh scotch bonnet or habanero, whole",        ratioValue: 0.5, defaultUnit: "parts", substitutions: ["cayenne powder"] },
    { ingId: "ing_08", role: "Seasoning", name: "Salt, black pepper, seasoning cube",            ratioValue: 0.5, defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Sear lamb",
      inputs: ["ing_01", "ing_08"],
      outputState: "seared_lamb",
      instructions: "Season lamb pieces generously with salt and pepper. Heat a neutral oil in a large, heavy pot over high heat until shimmering. Sear the lamb in batches — do not crowd the pot — for 3–4 minutes per side until deeply browned on at least two surfaces. Transfer to a plate. Browning is not merely aesthetic: it builds the Maillard flavor compounds that will give the stew its deep, roasted depth.",
      visualCue: {
        primaryTarget: "Each piece of lamb has a uniform, deep mahogany-brown crust on at least two sides. The pot has visible fond — dark, caramelized deposits stuck to the bottom.",
        spectrum: [
          { state: "Underdone", description: "Lamb is pale grey on the seared surface. Meat has steamed rather than seared, indicating the pot was overcrowded or not hot enough.", action: "Remove some pieces and sear in smaller batches. The fond and color are essential to the stew's flavor — do not skip this." },
          { state: "Perfect",   description: "Deep, even mahogany crust. The pot bottom has a layer of brown fond. Lamb releases from the pan cleanly when pulled with tongs.", action: "Set lamb aside and build the sauce in the same pot, using the fond as the flavor base." },
          { state: "Overdone",  description: "Lamb surfaces are very dark brown, nearly black, with an acrid smell. Fond on the pan bottom is dark and may be burnt.", action: "Deglaze immediately with the stock, scraping vigorously. Taste the stock — if bitter, proceed with less of the burnt fond and add a pinch of sugar to balance." },
        ],
      },
      feelCue: "Press a seared piece of lamb with your tongs — it should feel firm and resistant on the surface with a slight give underneath. You should hear a sustained, loud sizzle that doesn't quiet until you stop touching it.",
    },
    {
      nodeId: "step_2",
      action: "Build tomato-onion base",
      inputs: ["seared_lamb", "ing_03", "ing_04", "ing_07", "ing_06"],
      outputState: "tomato_stew_base",
      instructions: "In the same pot over medium heat, add the diced onion and cook, scraping up the fond, for 5 minutes until soft and translucent. Add the crushed tomatoes and stir, scraping all the caramelized bits from the bottom — these dissolve into the sauce. Add the whole scotch bonnet pepper (leave whole and intact to control heat — puncturing it releases much more capsaicin). Pour in the stock and add the seared lamb back. Bring to a simmer.",
      visualCue: {
        primaryTarget: "A deep red-orange broth with the lamb pieces submerged or nearly so, the intact scotch bonnet floating at the surface. All the fond has dissolved into the liquid.",
        spectrum: [
          { state: "Underdone", description: "Pan fond has not been fully incorporated — brown deposits still stuck to the bottom. The broth is thin and pale, lacking the color from the tomatoes.", action: "Stir vigorously and add a splash more stock to help dissolve the fond. The brown bits are concentrated flavor — leave none behind." },
          { state: "Perfect",   description: "Richly colored, tomato-red broth with no stuck fond. Lamb pieces visible beneath the surface. Whole scotch bonnet floating. The liquid smells deeply savory with a warm chili undertone.", action: "Add the peanut butter and simmer to combine." },
          { state: "Overdone",  description: "Scotch bonnet has been broken open or punctured — the broth will be very much hotter than intended. Oil from the chili is visible on the surface.", action: "Remove the scotch bonnet fragments. Add more stock and proceed — the stew will be very spicy. Taste and balance with extra peanut butter, which tempers heat." },
        ],
      },
      feelCue: "Drag a wooden spoon across the pot bottom — you should feel no resistance from stuck deposits. The liquid should flow smoothly back into the path left by the spoon, indicating everything has dissolved.",
    },
    {
      nodeId: "step_3",
      action: "Add peanut butter and sweet potato",
      inputs: ["tomato_stew_base", "ing_02", "ing_05"],
      outputState: "simmering_maafe",
      instructions: "Ladle a cup of the hot broth into a bowl and whisk the peanut butter into it until smooth — this tempers the peanut butter so it doesn't seize up when added to the pot. Pour the smooth peanut mixture back into the pot, stirring to fully incorporate. Add the sweet potato cubes. Simmer uncovered for 35–40 minutes, stirring every 10 minutes, until the lamb is pull-apart tender, the sweet potato is soft, and the sauce has thickened to a glossy, rich stew that coats the spoon.",
      visualCue: {
        primaryTarget: "The stew has thickened to a deep, orange-brown color. The peanut butter has fully integrated — no white streaks visible. Sweet potato is tender when pierced with a knife.",
        spectrum: [
          { state: "Underdone", description: "Sauce is still thin and watery, or streaks of un-integrated peanut butter are visible. Sweet potato resists a knife. Lamb is still firm when prodded.", action: "Continue simmering uncovered and stirring regularly. The stew will thicken naturally as the peanut butter proteins and sweet potato starch release." },
          { state: "Perfect",   description: "Thick, glossy, uniformly colored sauce. Sweet potato is tender throughout. Lamb falls apart with gentle fork pressure. A spoon dragged through the surface leaves a trail that fills in over 4–5 seconds.", action: "Remove the scotch bonnet pepper. Taste and adjust seasoning. Serve." },
          { state: "Overdone",  description: "Sauce has become very thick and is beginning to scorch on the bottom. Sweet potato is mushy and disintegrating into the stew. Lamb is falling apart into shreds.", action: "Add stock or water to loosen, stir gently (so as not to break up the sweet potato further), and remove from heat." },
        ],
      },
      feelCue: "Rub a small amount of the sauce between your fingers — it should feel slick and rich from the peanut oil, with no watery dilution. The aroma should be simultaneously nutty, savory, and lightly sweet from the potato.",
    },
    {
      nodeId: "step_4",
      action: "Finish and season",
      inputs: ["simmering_maafe"],
      outputState: "finished_maafe",
      instructions: "Remove the whole scotch bonnet pepper before serving — discard it. Taste the stew and adjust salt, seasoning cube, and heat to your preference. If the stew is too thick, add a splash of stock. If too thin, simmer uncovered for 5 more minutes. The sauce should be thick enough to mound slightly on a serving spoon. Serve over white rice or with white bread, with the lamb and sweet potato prominently visible.",
      visualCue: {
        primaryTarget: "Deep orange-brown stew with visible pieces of tender lamb and sweet potato. Sauce mounds slightly on a spoon. Rich, glossy surface with no oil separation.",
        spectrum: [
          { state: "Underdone", description: "Sauce is thin and pours like soup. The peanut butter flavor is weak and the tomato dominates. The balance between nutty and savory is off.", action: "Whisk in an additional tablespoon of peanut butter dissolved in hot stock and simmer 5 more minutes." },
          { state: "Perfect",   description: "Thick, glossy, deeply flavored sauce that is simultaneously nutty, savory, tomato-forward, and warmly spiced. Mounds on a spoon and falls in thick sheets. The scotch bonnet heat is a background warmth, not a punch.", action: "Serve immediately." },
          { state: "Overdone",  description: "Sauce has separated — pools of orange peanut oil visible on the surface with a stiff stew beneath. Overly thick and pasty.", action: "Add stock, remove from heat, and stir vigorously in large circles. The emulsion will re-form as it cools slightly." },
        ],
      },
      feelCue: "Taste the sauce alone — the peanut flavor should arrive first, warm and roasted, followed by savory tomato, then a slow building heat from the pepper. Each note should arrive in sequence, not simultaneously in a muddle.",
    },
  ],
};
