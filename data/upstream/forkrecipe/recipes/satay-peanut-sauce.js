export default {
  repoId: "master_thai_satay_peanut_sauce_001",
  parentRepoId: null,
  slug: "satay-peanut-sauce",
  author: "ForkRecipe Kitchen",

  title: "Satay Peanut Sauce",
  description: "A sauce of roasted peanuts dissolved into coconut milk with red curry paste and palm sugar — thick enough to coat a skewer and leave a trembling drop at the tip, with a warmth that builds slowly from the red curry's dried chilies rather than hitting all at once. This is the sauce that makes satay worth the wait.",
  cuisine: "Thai",
  culture: "Central Thai",
  category: "sauces",

  tags: ["sauce", "thai", "peanut", "satay", "coconut", "curry", "dipping-sauce"],
  difficulty: 1,
  activeTime: "15 min",
  totalTime: "20 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 3, salty: 3, sour: 2, bitter: 1, umami: 3, heat: 2 },

  ingredients: [
    { ingId: "ing_01", role: "Fat",       name: "Coconut milk, full-fat",                              ratioValue: 250, defaultUnit: "ml",  substitutions: ["coconut cream (richer, thicker sauce)"] },
    { ingId: "ing_02", role: "Protein",   name: "Roasted peanut butter, natural (no added sugar)",     ratioValue: 120, defaultUnit: "g",   substitutions: ["finely ground roasted peanuts"] },
    { ingId: "ing_03", role: "Spice",     name: "Thai red curry paste (store-bought or homemade)",     ratioValue: 30,  defaultUnit: "g",   substitutions: ["massaman curry paste (sweeter, deeper)"] },
    { ingId: "ing_04", role: "Sweetener", name: "Palm sugar, grated",                                  ratioValue: 25,  defaultUnit: "g",   substitutions: ["brown sugar", "coconut sugar"] },
    { ingId: "ing_05", role: "Acid",      name: "Tamarind paste, concentrated",                        ratioValue: 20,  defaultUnit: "ml",  substitutions: ["lime juice (brighter, less deep)"] },
    { ingId: "ing_06", role: "Umami",     name: "Fish sauce",                                          ratioValue: 15,  defaultUnit: "ml",  substitutions: ["light soy sauce"] },
    { ingId: "ing_07", role: "Seasoning", name: "Fine sea salt",                                       ratioValue: 2,   defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_08", role: "Garnish",   name: "Roasted peanuts, roughly crushed, for topping",       ratioValue: 30,  defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_09", role: "Garnish",   name: "Dried chili flakes, for topping (optional)",          ratioValue: 2,   defaultUnit: "g",   substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Simmer",
      inputs: ["ing_01", "ing_03"],
      outputState: "bloomed_curry_coconut",
      instructions: "Pour the coconut milk into a small saucepan over medium heat. When it begins to steam and show the first signs of simmering at the edges, add the red curry paste. Whisk constantly to break up the paste and disperse it evenly through the coconut milk. Continue to cook over medium heat for 3 to 4 minutes, stirring regularly. You are not just dissolving the paste — you are cooking out the raw edge of its dried chilies and spices, blooming them in the coconut fat the way you would bloom spices in oil. The mixture will shift from bright orange-red (raw paste) to a deeper, richer terracotta-orange as the paste cooks. The aroma will change from sharp and raw to roasted and complex. This bloom step is what separates a cooked satay sauce from a merely mixed one.",
      visualCue: {
        primaryTarget: "A deep terracotta-orange liquid that is beginning to separate slightly at the surface — dots of red chili oil appearing in the coconut fat.",
        spectrum: [
          { state: "Underdone", description: "The paste has dissolved but the mixture is still bright, almost fluorescent orange and smells raw and sharp — like uncooked curry paste.", action: "Continue cooking and stirring over medium heat for another 2 minutes. The color deepening is the indicator." },
          { state: "Perfect",   description: "The mixture is a deep, slightly smoky terracotta-orange. The surface shows small dots of red chili oil floating in the coconut fat — the paste has released its oils. The aroma is rounded and aromatic, not sharp.", action: "Add the peanut butter, palm sugar, tamarind, and fish sauce." },
          { state: "Overdone",  description: "The mixture is dark brown and the chili oil is separating heavily. The coconut milk has reduced significantly and the bottom of the pan shows dark paste residue.", action: "Add 50ml of water and stir vigorously to re-emulsify. Continue with the recipe." },
        ],
      },
      feelCue: "When you stir the bloomed curry coconut and lift the spoon, it should pull away in a thin, even orange film — more viscous than plain coconut milk, with a glossy surface. The steam should smell of cooked chili and lemongrass, not raw paste.",
    },
    {
      nodeId: "step_2",
      action: "Simmer",
      inputs: ["bloomed_curry_coconut", "ing_02", "ing_04", "ing_05", "ing_06", "ing_07"],
      outputState: "finished_peanut_sauce",
      instructions: "Add the peanut butter to the simmering curry coconut mixture. Whisk vigorously to incorporate — the peanut butter will resist at first, then suddenly combine into a thick, uniform sauce. Add the palm sugar, tamarind paste, fish sauce, and salt. Stir constantly over medium-low heat for 2 to 3 minutes until the sugar dissolves and all elements are fully integrated. The sauce will thicken as it heats — adjust consistency with small additions of warm water if it becomes too thick to pour easily. The finished sauce should flow off a spoon in a heavy, slow ribbon. Taste and balance: if too thick and sweet, add a teaspoon more tamarind; if too sharp, add a pinch more palm sugar; if flat, a few more drops of fish sauce. The balance to aim for is rich-sweet-slightly-sour-deeply-savory.",
      visualCue: {
        primaryTarget: "A thick, smooth, warm terracotta-orange sauce that falls from a spoon in a slow, heavy ribbon without breaking.",
        spectrum: [
          { state: "Underdone", description: "Peanut butter has not fully incorporated — visible pale peanut butter streaks remain in the orange base and the sauce is lumpy.", action: "Continue whisking over gentle heat. The peanut butter needs warmth to loosen and incorporate fully." },
          { state: "Perfect",   description: "A completely smooth, opaque, terracotta-orange sauce of uniform consistency. It coats the back of a spoon heavily and falls in a slow, unbroken ribbon. The aroma is simultaneously of peanut, coconut, and warm curry spice.", action: "Remove from heat, scatter crushed peanuts and chili flakes on top, and serve warm." },
          { state: "Overdone",  description: "The sauce has become very thick and stiff — it no longer pours easily and is beginning to resemble peanut paste rather than a sauce. The peanut oil may be separating at the surface.", action: "Thin with warm water, adding a tablespoon at a time and whisking until the desired consistency returns." },
        ],
      },
      feelCue: "Dip a satay skewer or the back of a spoon into the finished sauce and lift it straight up — the sauce should cling to the wood or metal and form a single, slow drop at the tip that holds for 3 to 4 seconds before falling. That drop timing is the consistency test.",
    },
    {
      nodeId: "step_3",
      action: "Garnish",
      inputs: ["finished_peanut_sauce", "ing_08", "ing_09"],
      outputState: "plated_satay_sauce",
      instructions: "Transfer the warm peanut sauce to a serving bowl or pour it into a small clay pot for table presentation. Scatter the roughly crushed roasted peanuts over the surface — they should be chunky enough to provide texture but not so large they fall off a dipped item. Add a small pinch of dried chili flakes for color and a visual hint of heat. Serve warm alongside grilled chicken or pork satay skewers, fresh cucumber rounds, and the traditional Thai ajad (pickled cucumber relish). The sauce can be made up to 3 days ahead and refrigerated — it will thicken on cooling but returns to the correct consistency when gently reheated with a splash of water or coconut milk.",
      visualCue: {
        primaryTarget: "A deep terracotta bowl of glossy orange-brown sauce with visible peanut rubble and flecks of chili on the surface.",
        spectrum: [
          { state: "Underdone", description: "Sauce is too thin and the garnishes sink immediately rather than sitting on the surface.", action: "If serving, the flavor is still correct. Alternatively, return to heat and simmer 2 more minutes to thicken." },
          { state: "Perfect",   description: "Sauce has body and holds the peanut garnish at the surface for at least 30 seconds before they slowly sink. The surface is glossy and slightly oily from the peanut and coconut fats.", action: "Serve within 30 minutes of making for best texture and temperature." },
          { state: "Overdone",  description: "Sauce has been left too long and a skin has formed on the surface. The top layer is dry and matte.", action: "Stir the skin back in, add a tablespoon of warm water, and stir to restore the glossy surface." },
        ],
      },
      feelCue: "When you dip a satay skewer into the sauce and pull it through your lips, the sauce should feel thick and slightly oily — coating the inside of your mouth with a warm, peanut-coconut richness that is followed a second later by the slow heat of the red curry.",
    },
  ],
};
