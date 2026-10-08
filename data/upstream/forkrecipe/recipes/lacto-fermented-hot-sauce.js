export default {
  repoId: "master_american_lacto_hot_sauce_001",
  parentRepoId: null,
  slug: "lacto-fermented-hot-sauce",
  author: "ForkRecipe Kitchen",

  title: "Lacto-Fermented Hot Sauce",
  description: "Chiles and garlic submerged in a 2% brine and left to ferment at room temperature for five to seven days — a quiet, bubbling transformation in which lactic acid bacteria consume sugars and build a complex, tangy, deeply flavored sauce that no vinegar-based shortcut can replicate.",
  cuisine: "American",
  culture: "Craft Fermentation",
  category: "fermented",

  tags: ["hot sauce", "fermented", "lacto-fermented", "chile", "probiotic", "craft", "condiment"],
  difficulty: 2,
  activeTime: "20 min",
  totalTime: "7 days",
  ratioSystem: "parts",

  stars: 2187,
  forks: 234,
  contributors: 67,
  license: "CC-BY-SA",
  createdAt: "2024-07-04",
  updatedAt: "2025-02-28",

  flavorRadar: { sweet: 1, salty: 3, sour: 4, bitter: 1, umami: 2, heat: 5 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Fresh red chiles (Fresno, cayenne, or Thai bird's eye), stems removed", ratioValue: 100, defaultUnit: "parts", substitutions: ["jalapeños (milder)", "habaneros (much hotter)"] },
    { ingId: "ing_02", role: "Allium",     name: "Garlic cloves, peeled",                                                  ratioValue: 10,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Seasoning",  name: "Non-iodized salt (kosher or sea salt) — for 2% brine",                   ratioValue: 2,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Liquid",     name: "Filtered or dechlorinated water — for 2% brine",                         ratioValue: 100, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Acid",       name: "Apple cider vinegar (added after fermentation, to taste)",               ratioValue: 10,  defaultUnit: "parts", substitutions: ["white wine vinegar"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Prepare brine",
      inputs: ["ing_03", "ing_04"],
      outputState: "salt_brine",
      instructions: "Dissolve the non-iodized salt in filtered water to create a 2% brine by weight — this means 20g of salt per 1 liter of water. Iodized salt must not be used as iodine is antibacterial and will inhibit or kill the lactic acid bacteria essential for fermentation. Tap water must be filtered or left to sit uncovered overnight to off-gas chlorine, which similarly inhibits fermentation. Stir until every grain of salt is fully dissolved — undissolved salt can create areas of inconsistent salinity that allow harmful bacteria to thrive.",
      visualCue: {
        primaryTarget: "Crystal-clear brine with no visible undissolved salt crystals. The water looks completely clear, indistinguishable from plain water.",
        spectrum: [
          { state: "Underdone", description: "Salt crystals still visible on the bottom of the container. The brine looks slightly hazy from undissolved salt.", action: "Stir more vigorously. The salt must be completely dissolved before adding the vegetables." },
          { state: "Perfect",   description: "Crystal-clear liquid with no sediment. When you look at the bottom of the container, the surface is completely clean.", action: "Use immediately to pack the jar." },
          { state: "Overdone",  description: "Not possible at the mixing stage. However, if too much salt was added by weight, the brine may inhibit fermentation.", action: "Taste the brine — it should taste pleasantly saline, like a slightly salty sea water. If it tastes extremely salty or makes you wince, dilute with more filtered water." },
        ],
      },
      feelCue: "A properly salted brine should taste unmistakably salty but not overwhelming — somewhere between a light sea water and a sports drink. If it makes you pucker or grimace, it is over-salted and will slow fermentation.",
    },
    {
      nodeId: "step_2",
      action: "Pack jar",
      inputs: ["ing_01", "ing_02", "salt_brine"],
      outputState: "packed_ferment_jar",
      instructions: "Pack the destemmed chiles and garlic cloves into a clean glass jar, leaving 4–5cm of headspace. Pour the brine over to cover everything completely — all vegetables must remain submerged below the brine line at all times. Use a weight (a small ziplock bag filled with brine, or a clean stone) to keep everything submerged. Cover the jar with a cloth secured with a rubber band, or use an airlock lid. Do not use a sealed lid — the CO2 produced during fermentation must be able to escape.",
      visualCue: {
        primaryTarget: "All chiles and garlic are submerged below the brine line. The brine is clear. The jar has some headspace above the brine for CO2 to collect.",
        spectrum: [
          { state: "Underdone", description: "Chiles and garlic are floating above the brine surface. Parts are exposed to air.", action: "Weigh everything down — exposed vegetables will mold. Use a brine-filled bag as a weight and ensure complete submersion." },
          { state: "Perfect",   description: "All vegetables are completely submerged, brine is clear, and adequate headspace remains above. The cloth cover is secure.", action: "Place in a location away from direct sunlight, at room temperature (18–24°C)." },
          { state: "Overdone",  description: "Jar was packed too tightly and the brine doesn't have room to circulate. Or too little brine was added and the vegetables are barely covered.", action: "Make additional brine and add to fully submerge all vegetables." },
        ],
      },
      feelCue: "Press down on the vegetables through the weight — they should feel firm and fresh still. By day 3, they will feel softer and begin to release their characteristic fermented aroma whenever the jar is opened.",
    },
    {
      nodeId: "step_3",
      action: "Ferment",
      inputs: ["packed_ferment_jar"],
      outputState: "fermented_chile_mash",
      instructions: "Ferment at room temperature (ideally 20–22°C) for 5–7 days. Check daily: by day 2–3, small bubbles should be rising through the brine — this is CO2 from active lactic acid bacteria. The brine will cloud noticeably as the bacterial population grows. Press the vegetables down daily to ensure submersion. If any white film (kahm yeast) appears on the surface, skim it off — it is harmless but affects flavor. If anything pink, black, or fuzzy grows, discard and start over. Taste daily from day 4 — the ferment is ready when it is pleasantly sour and complex.",
      visualCue: {
        primaryTarget: "Brine is visibly cloudy and slightly effervescent. Bubbles rise when the jar is gently agitated. Chiles have changed color slightly — from bright to slightly more muted.",
        spectrum: [
          { state: "Underdone", description: "Brine is still clear and no bubbles are visible after 3 days. No sourness when tasted. Fermentation has not started.", action: "Check the salt percentage and water quality. Add a tablespoon of whey from yogurt or brine from a known good ferment to introduce beneficial bacteria." },
          { state: "Perfect",   description: "Brine is cloudy with visible effervescence. Smells pleasantly sour, funky, and deeply of fermented chile. Taste is bright, sour, and complex with no off notes.", action: "Transfer to the blender and blend into hot sauce. Refrigerate to stop fermentation." },
          { state: "Overdone",  description: "Ferment has been running for 10+ days. The flavor is very sour — almost aggressively acidic. The chile color has faded significantly.", action: "Proceed — an over-fermented hot sauce has a very complex, deeply sour character. Balance with extra vinegar or honey when blending." },
        ],
      },
      feelCue: "By day 5, the ferment should smell like an exciting, complex version of what you put in — deeply savory, sour, alive, and unmistakably chili. Open the jar and take a deep breath: if it smells interesting and alive, it is working. If it smells wrong, trust your instincts.",
    },
    {
      nodeId: "step_4",
      action: "Blend",
      inputs: ["fermented_chile_mash", "ing_05"],
      outputState: "finished_hot_sauce",
      instructions: "Drain the fermented vegetables over a bowl, reserving the brine. Transfer the chiles and garlic to a blender. Blend on high, adding reserved brine a little at a time until the sauce reaches your desired consistency — from chunky to pourable. Add apple cider vinegar to taste: it brightens the flavor and extends shelf life. Strain through a fine mesh sieve for a smooth sauce, or leave unstrained for a chunkier, more rustic result. Bottle and refrigerate — the cold halts fermentation. The sauce improves after another 1–2 weeks in the refrigerator as flavors continue to meld.",
      visualCue: {
        primaryTarget: "A smooth, vibrant red-orange sauce with a pourable consistency. The color should be vivid — not the dull, dark red of cooked hot sauce — reflecting the living fermented character.",
        spectrum: [
          { state: "Underdone", description: "Sauce is still very chunky with large pieces not fully blended. It looks more like a salsa than a hot sauce.", action: "Blend longer, adding brine to help the blades process the pieces. For a smooth final sauce, blend for a full 2 minutes at high speed." },
          { state: "Perfect",   description: "Smooth, pourable, vividly colored sauce. When drizzled, it flows in a continuous, even stream. The flavor is simultaneously sour, salty, spicy, and complex.", action: "Bottle and refrigerate." },
          { state: "Overdone",  description: "The sauce has been blended so long it is very thin and completely smooth — more like chile water than sauce. Some of the aroma has been lost to the heat generated by extended blending.", action: "Add a small amount of xanthan gum (tiny pinch) to restore viscosity without changing flavor." },
        ],
      },
      feelCue: "A spoonful of the finished sauce on your tongue should deliver a clear sequence: first salty, then sour, then the building heat of the chiles, then a long, complex, slightly funky finish that no vinegar-only hot sauce can produce.",
    },
  ],
};
