export default {
  repoId: "master_french_dijon_mustard_001",
  parentRepoId: null,
  slug: "dijon-mustard",
  author: "ForkRecipe Kitchen",

  title: "Dijon Mustard",
  description: "Yellow and brown mustard seeds cracked in vinegar and white wine, blended into a pale, pungent emulsion whose clean heat hits the back of your sinus in a wave that fades as quickly as it arrives — nothing like the yellow tube in the door of a refrigerator.",
  cuisine: "French",
  culture: "Burgundian",
  category: "condiments",

  tags: ["mustard", "dijon", "french", "condiment", "burgundian", "fermented"],
  difficulty: 2,
  activeTime: "20 min",
  totalTime: "2 days 20 min",
  ratioSystem: "parts",

  stars: 1340,
  forks: 107,
  contributors: 31,
  license: "CC-BY-SA",
  createdAt: "2024-10-15",
  updatedAt: "2025-05-20",

  flavorRadar: { sweet: 0, salty: 3, sour: 3, bitter: 2, umami: 1, heat: 4 },

  ingredients: [
    { ingId: "ing_01", role: "Structure", name: "Yellow mustard seeds",                    ratioValue: 60,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_02", role: "Structure", name: "Brown mustard seeds",                     ratioValue: 40,  defaultUnit: "parts", substitutions: ["black mustard seeds (hotter)"] },
    { ingId: "ing_03", role: "Acid",      name: "White wine vinegar",                      ratioValue: 60,  defaultUnit: "parts", substitutions: ["Champagne vinegar", "apple cider vinegar"] },
    { ingId: "ing_04", role: "Solvent",   name: "Dry white wine (Burgundy or Chablis)",    ratioValue: 60,  defaultUnit: "parts", substitutions: ["dry vermouth", "white grape juice + 1 tbsp vinegar"] },
    { ingId: "ing_05", role: "Allium",    name: "Shallot (finely minced)",                 ratioValue: 10,  defaultUnit: "parts", substitutions: ["1/4 small white onion"] },
    { ingId: "ing_06", role: "Seasoning", name: "Salt",                                    ratioValue: 4,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Aromatic",  name: "Bay leaf",                                ratioValue: 1,   defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Hydrate",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_04", "ing_05", "ing_07"],
      outputState: "soaked_seeds",
      instructions: "Combine both mustard seeds, white wine vinegar, white wine, shallot, and bay leaf in a glass jar or bowl. The seeds must be completely submerged in liquid. Cover and let soak at room temperature for 48 hours — the seeds will swell dramatically, absorbing most of the liquid, and the liquid will turn from pale yellow to a cloudy, mustardy gold. This soaking is essential: it begins to activate the myrosinase enzyme that converts glucosinolates into the pungent isothiocyanates that give mustard its heat, and the acid sets the color to pale yellow.",
      visualCue: {
        primaryTarget: "Seeds have swollen to nearly twice their original size, the soaking liquid has been almost entirely absorbed and the mixture looks like a thick, wet porridge.",
        spectrum: [
          { state: "Underdone", description: "After 12 hours, seeds are swollen but still separate; the liquid is still mostly liquid.", action: "Soak longer. 48 hours at room temperature is the minimum for seeds to absorb enough liquid and begin enzymatic activity." },
          { state: "Perfect",   description: "After 48 hours, seeds are plump and soft, the liquid is almost fully absorbed, and the mixture smells distinctly of raw mustard — pungent and slightly acidic.", action: "Blend with salt." },
          { state: "Overdone",  description: "Soaked for more than 72 hours — some fermentation may have begun and the mixture smells slightly alcoholic.", action: "Proceed. A slight fermented note will deepen the complexity of the finished mustard — it is not a problem." },
        ],
      },
      feelCue: "Press a soaked seed between your fingers — it should yield and split with gentle pressure, releasing a mustard-sharp odor, rather than being hard and resistant as when dry.",
    },
    {
      nodeId: "step_2",
      action: "Blend",
      inputs: ["soaked_seeds", "ing_06"],
      outputState: "blended_mustard",
      instructions: "Remove the bay leaf. Transfer the soaked seed mixture to a blender. Add the salt. Blend on high for 2–3 minutes for a smooth Dijon-style mustard, or pulse just 8–10 times for a grainy whole-seed style. The emulsification is important: the longer you blend, the more the seed hulls break down and release their oils into the liquid, creating a cohesive emulsion. Scrape down the sides regularly. Add a tablespoon or two of cold water if the blender is struggling — the cold water also reduces the enzyme temperature, preserving more heat.",
      visualCue: {
        primaryTarget: "A pale gold to cream-colored, thick, emulsified paste that holds its shape when dropped from a spoon.",
        spectrum: [
          { state: "Underdone", description: "Still visibly grainy with whole seeds floating in the liquid. Very sharp and hot but not yet emulsified.", action: "Continue blending at high speed. Dijon requires significant blending to reach its characteristic smooth texture." },
          { state: "Perfect",   description: "Smooth, pale gold emulsion that holds a soft peak. The heat is clean and sharp, fading quickly — the signature Dijon pungency.", action: "Strain through a fine-mesh sieve for a very smooth result, or use as-is for a slightly coarser texture." },
          { state: "Overdone",  description: "Blended so long the mixture has warmed from motor heat. Heat has begun destroying the isothiocyanates — the mustard will be noticeably milder.", action: "Proceed. The mild flavor is still excellent as a condiment; it will sharpen slightly as it chills." },
        ],
      },
      feelCue: "Rub a small amount on your wrist — within 5 seconds the heat should rise, sting briefly in the sinuses, and fade within 30 seconds. This volatile, quick heat is the diagnostic test for a properly made Dijon.",
    },
    {
      nodeId: "step_3",
      action: "Rest",
      inputs: ["blended_mustard"],
      outputState: "finished_dijon_mustard",
      instructions: "Transfer to a sterilized glass jar. Cover and refrigerate for at least 24 hours before using — the mustard needs time to mellow, for the sharp, raw edge to round out, and for the emulsion to stabilize. Freshly blended mustard is fiercely hot and somewhat bitter; after 24 hours it becomes more complex and cohesive. After 3 days, it is at its best. The mustard keeps refrigerated for 3 months. The heat will gradually diminish over time as the isothiocyanates degrade.",
      visualCue: {
        primaryTarget: "After resting, the mustard is a cohesive, stable paste with a pale ivory-gold color and a firm, spreadable consistency.",
        spectrum: [
          { state: "Underdone", description: "Freshly made mustard tastes raw and harsh — aggressively hot and slightly bitter. The emulsion may look separated or grainy.", action: "Refrigerate and wait. The flavors need 24–48 hours to integrate." },
          { state: "Perfect",   description: "After 48 hours, the mustard is smooth, complex, and cohesive. The heat is present and clean but no longer harsh. Flavor has depth.", action: "Serve. It is now at its peak." },
          { state: "Overdone",  description: "After 2 months, the color has darkened slightly and the heat has faded to nearly nothing. The acid and salt notes remain but the pungency is largely gone.", action: "Still usable as a mild, tangy condiment. Fresh mustard seeds can be blended in to add back some heat." },
        ],
      },
      feelCue: "After resting, dip a clean spoon and taste: the heat should arrive sharp and high in the nose, linger for 10 seconds, then vanish cleanly — leaving only a pleasant, acidic-savory aftertaste.",
    },
  ],
};
