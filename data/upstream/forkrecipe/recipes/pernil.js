export default {
  repoId: "master_caribbean_pernil_001",
  parentRepoId: null,
  slug: "pernil",
  author: "ForkRecipe Kitchen",

  title: "Pernil (Puerto Rican Slow-Roasted Pork Shoulder)",
  description: "A bone-in pork shoulder buried in garlic-sazón adobo and marinated for 24 hours, then roasted low and slow until the meat is fall-apart tender — then blasted high to transform the thick skin into the crunchy, shattering cuerito that is the most coveted part of the entire dish.",
  cuisine: "Caribbean",
  culture: "Puerto Rican",
  category: "proteins",

  tags: ["puerto-rican", "pork", "slow-roasted", "adobo", "cuerito", "caribbean", "holiday"],
  difficulty: 3,
  activeTime: "30 min",
  totalTime: "10 hours",
  ratioSystem: "weight",

  stars: 0, forks: 0, contributors: 1, license: "CC-BY-SA",
  createdAt: "2026-06-27", updatedAt: "2026-06-27",

  flavorRadar: { sweet: 1, salty: 4, sour: 2, bitter: 1, umami: 4, heat: 1 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Bone-in pork shoulder (picnic or Boston butt), skin-on", ratioValue: 3500, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_02", role: "Allium",    name: "Garlic cloves",                     ratioValue: 40,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_03", role: "Spice",     name: "Dried oregano",                     ratioValue: 12,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_04", role: "Seasoning", name: "Fine sea salt",                     ratioValue: 30,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_05", role: "Seasoning", name: "Black pepper, coarsely ground",     ratioValue: 8,    defaultUnit: "g", substitutions: [] },
    { ingId: "ing_06", role: "Acid",      name: "White wine vinegar",                ratioValue: 45,   defaultUnit: "g", substitutions: ["distilled white vinegar", "sour orange juice"] },
    { ingId: "ing_07", role: "Fat",       name: "Olive oil",                         ratioValue: 40,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_08", role: "Spice",     name: "Sazón (with achiote/culantro blend)",ratioValue: 12,   defaultUnit: "g", substitutions: ["smoked paprika + cumin"] },
    { ingId: "ing_09", role: "Spice",     name: "Ground cumin",                      ratioValue: 6,    defaultUnit: "g", substitutions: [] },
    { ingId: "ing_10", role: "Aromatic",  name: "Fresh cilantro with stems, roughly chopped", ratioValue: 20, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_11", role: "Seasoning", name: "Coarse sea salt (for skin)",        ratioValue: 20,   defaultUnit: "g", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Mix",
      inputs: ["ing_02", "ing_03", "ing_04", "ing_05", "ing_06", "ing_07", "ing_08", "ing_09", "ing_10"],
      outputState: "adobo_paste",
      instructions: "Using a pilón (mortar and pestle) or food processor, pound the garlic, oregano, salt, pepper, and cumin to a rough paste. Add vinegar and olive oil and mix to a thick, pungent adobo. Stir in the sazón and cilantro. The paste should be thick enough to press into incisions without falling out.",
      visualCue: {
        primaryTarget: "A thick, rough orange-yellow paste flecked with oregano and cilantro. Strong garlic and herb aroma. Thick enough to hold its shape on a spoon.",
        spectrum: [
          { state: "Underdone", description: "Garlic is still chunky and not fully incorporated into a paste.", action: "Pound or process more. Garlic lumps burn in the oven and taste acrid." },
          { state: "Perfect",   description: "Smooth-ish paste with some texture. Vivid orange from sazón. Pungently garlicky and herbal.", action: "Apply immediately to the pork." },
          { state: "Overdone",  description: "N/A — raw paste.", action: "Proceed." },
        ],
      },
      feelCue: "The adobo should feel thick enough to mound on a spoon — if it slides off immediately, it's too thin and will run out of the incisions rather than staying in place.",
    },
    {
      nodeId: "step_2",
      action: "Marinate",
      inputs: ["ing_01", "adobo_paste", "ing_11"],
      outputState: "marinated_pernil",
      instructions: "Score the skin in a crosshatch pattern, cutting through skin and fat but not meat. Using a thin, sharp knife, make 20–30 deep incisions all over the meat (under and around the skin flap) and push a generous amount of adobo into each with your finger. Rub remaining adobo all over the meat. Rub coarse salt all over the skin only. Place in a roasting pan, skin-side up, uncovered, in the refrigerator for 24–36 hours.",
      visualCue: {
        primaryTarget: "After marination, the skin is dry and pale, the crosshatch cuts clearly visible. The meat visible around the skin edges has darkened from the adobo.",
        spectrum: [
          { state: "Underdone", description: "Marinated less than 8 hours. Adobo flavor will be surface-only, not deep.", action: "The 24-hour minimum is essential for a shoulder this large. Plan ahead." },
          { state: "Perfect",   description: "Skin is dry and matte after 24 hours. Crosshatch cuts are dry at the edges. The exposed meat is deeply stained with the adobo paste.", action: "Remove from fridge 1 hour before roasting." },
          { state: "Overdone",  description: "Marinated beyond 48 hours.", action: "Still excellent — pernil is very forgiving on marination time." },
        ],
      },
      feelCue: "After 24 hours, drag a finger across the skin — it should feel completely dry, like thick paper. Any moisture means the skin won't crackle properly.",
    },
    {
      nodeId: "step_3",
      action: "Roast",
      inputs: ["marinated_pernil"],
      outputState: "slow_roasted_pernil",
      instructions: "Place pork skin-side up on a rack in a deep roasting pan. Add 2 cups of water to the pan bottom. Cover tightly with foil. Roast at 160 C (325 F) for 5–6 hours (approximately 1.5 hours per kilogram). The pork is done when an instant-read thermometer reads 90 C (195 F) at the thickest part — this temperature ensures all collagen has converted to gelatin.",
      visualCue: {
        primaryTarget: "After 5 hours, lifting the foil reveals a shoulder that has visibly contracted and slumped. The skin looks pale and steamed. Juices in the pan are rich and fragrant.",
        spectrum: [
          { state: "Underdone", description: "Internal temperature below 85 C. Meat still holds its shape firmly and doesn't shred easily.", action: "Continue roasting. Do not rush — the collagen conversion is temperature-dependent, not time-dependent." },
          { state: "Perfect",   description: "Meat falls in large shreds when probed with a fork. The bone can be wiggled freely. Juices run clear. Internal temp 90–95 C.", action: "Remove foil and blast the skin at high heat." },
          { state: "Overdone",  description: "Meat has dried at the edges from oven heat despite the foil. Has lost some juiciness.", action: "Baste with the pan drippings and proceed to high-heat crisping immediately." },
        ],
      },
      feelCue: "After 5 hours, press the shoulder through the foil with your hand — it should feel like a pillow of rendered fat and tender meat, completely yielding. No resistance means the collagen has done its work.",
    },
    {
      nodeId: "step_4",
      action: "Bake",
      inputs: ["slow_roasted_pernil"],
      outputState: "finished_pernil",
      instructions: "Remove the foil and increase oven to 230 C (450 F). Roast uncovered for 30–45 minutes, watching constantly, until the skin bubbles and shatters into golden cuerito (crackling). Rotate the pan every 10 minutes. The skin should go from pale and steamed to blistered and golden — listen for the crackling, popping sound.",
      visualCue: {
        primaryTarget: "The skin is a uniform golden-mahogany, completely blistered and puffed into individual crackling bubbles. It looks like a vast, crispy expanse of golden domes across the shoulder.",
        spectrum: [
          { state: "Underdone", description: "Skin is still pale and chewy. Bubbles haven't formed in sections.", action: "Continue at high heat. If uneven, rotate the pan more frequently." },
          { state: "Perfect",   description: "The entire skin surface is golden and blistered. Tapping with a knuckle makes a hollow crackle. The most coveted part of the dish — distribute fairly.", action: "Rest 15 minutes before carving." },
          { state: "Overdone",  description: "Skin is very dark brown and edges are burning. Bitter smell.", action: "Tent loosely with foil and remove from oven immediately. Trim the darkest edges." },
        ],
      },
      feelCue: "Tap the cuerito — it should sound like knocking on a hard-boiled egg shell, dry and resonant. Any soft, dull tapping sound means there are pockets that haven't crisped.",
    },
    {
      nodeId: "step_5",
      action: "Rest",
      inputs: ["finished_pernil"],
      outputState: "rested_plated_pernil",
      instructions: "Rest uncovered for 15 minutes. Carve by pulling the meat in large chunks with two forks — pernil should not be sliced, it should be pulled. Keep the cuerito intact and break it into pieces separately, distributing equitably. Serve with arroz con gandules and tostones.",
      visualCue: {
        primaryTarget: "Pulled pork in large, juicy shreds, dark with adobo. Broken cuerito pieces are golden-mahogany, shattering when pressed. Pan drippings are rich and orange-tinted.",
        spectrum: [
          { state: "Underdone", description: "Meat is sliced rather than pulled — holds together in firm chunks rather than yielding to forks.", action: "If meat needs slicing, return to the oven at 160 C for 30 more minutes." },
          { state: "Perfect",   description: "Meat pulls in long, moist, fragrant shreds. Cuerito is golden and shatters. The pan drippings, drizzled over the meat, are the best sauce possible.", action: "Serve." },
          { state: "Overdone",  description: "Cuerito has gone soft from the resting steam.", action: "Blast under the broiler for 2 minutes to re-crisp before serving." },
        ],
      },
      feelCue: "The rested meat should pull apart in long shreds with essentially no resistance from two forks — if you have to tug hard, the shoulder needed another 30 minutes in the oven.",
    },
  ],
};
