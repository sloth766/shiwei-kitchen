export default {
  repoId: "master_american_drinkingshrub_raspberry_001",
  parentRepoId: null,
  slug: "drinking-shrub-raspberry",
  author: "ForkRecipe Kitchen",
  title: "Raspberry Drinking Shrub",
  description: "A cold-process raspberry and apple cider vinegar shrub aged in the refrigerator for three days — tart enough to make you wince on its own, but transformed by soda water into something bright, complex, and alive with fruit. A colonial American tradition revived by the craft cocktail movement, it works equally as a mocktail base or a whiskey mixer.",
  cuisine: "American",
  culture: "Colonial American",
  category: "beverages",
  tags: ["american", "shrub", "raspberry", "vinegar", "beverage", "cocktail-mixer", "drinking-vinegar", "vegan"],
  difficulty: 1,
  activeTime: "15 min",
  totalTime: "3 days",
  ratioSystem: "parts",
  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",
  flavorRadar: { sweet: 3, salty: 0, sour: 5, bitter: 0, umami: 0, heat: 0 },
  ingredients: [
    {
      ingId: "ing_01",
      role: "Structure",
      name: "Fresh or frozen raspberries",
      ratioValue: 2,
      defaultUnit: "parts",
      substitutions: ["blackberries", "blueberries", "strawberries", "mixed summer berries"],
    },
    {
      ingId: "ing_02",
      role: "Sweetener",
      name: "White cane sugar (or raw caster sugar)",
      ratioValue: 2,
      defaultUnit: "parts",
      substitutions: ["honey (adds floral notes)", "coconut sugar (adds toffee depth)", "maple sugar"],
    },
    {
      ingId: "ing_03",
      role: "Acid",
      name: "Raw unfiltered apple cider vinegar (with the mother)",
      ratioValue: 2,
      defaultUnit: "parts",
      substitutions: ["white wine vinegar (cleaner, less complex)", "champagne vinegar (delicate)"],
    },
  ],
  processNodes: [
    {
      nodeId: "step_1",
      action: "Cure",
      inputs: ["ing_01", "ing_02"],
      outputState: "macerated_raspberries",
      instructions:
        "Combine the raspberries and sugar in a clean glass jar or bowl. Mash the berries gently with a fork or muddler — just enough to break the skins and release the juice, but not so thoroughly that you make a smooth puree (some texture helps the extraction). Stir well to coat every berry with sugar. Cover and refrigerate for at least 8 hours, ideally 24 hours. During this time the sugar will draw the juice from the berries through osmosis, creating a thick, jewel-bright syrup. Stir or shake once after 4 hours.",
      visualCue: {
        primaryTarget:
          "After 24 hours: the raspberries are collapsed and surrounded by a deep crimson-magenta syrup. The sugar has almost entirely dissolved into the berry juice.",
        spectrum: [
          {
            state: "Underdone",
            description:
              "Sugar is still mostly granular. Berries are still firm with little juice extracted. Less than 4 hours in.",
            action:
              "Stir vigorously and return to the refrigerator. The osmotic process takes time — the sugar must fully draw out the juice.",
          },
          {
            state: "Perfect",
            description:
              "Deep, glossy crimson pool surrounds collapsed berries. Sugar is fully dissolved. Smells intensely of fresh raspberry with a sweet, jammy depth.",
            action:
              "Proceed to add the vinegar.",
          },
          {
            state: "Overdone",
            description:
              "Left at room temperature too long — mold beginning to form on the surface, or the mixture smells fermented.",
            action:
              "Discard and restart. For warm kitchens, always macerate in the refrigerator.",
          },
        ],
      },
      feelCue:
        "Rub a little of the syrup between your thumb and forefinger — it should feel thick and faintly sticky, like thin jam, and leave a deep raspberry stain that persists even after rinsing.",
    },
    {
      nodeId: "step_2",
      action: "Infuse",
      inputs: ["macerated_raspberries", "ing_03"],
      outputState: "finished_shrub",
      instructions:
        "Strain the macerated raspberry-sugar syrup through a fine-mesh sieve into a clean glass jar, pressing the berry solids firmly with the back of a spoon to extract every drop. Discard the spent solids or use them in a smoothie. Add the apple cider vinegar to the strained syrup and stir thoroughly to combine. The mixture will immediately shift in character — the vinegar cuts through the sweetness and the whole thing becomes more complex. Seal the jar and refrigerate for a minimum of 24 hours and ideally 48–72 hours before using: the cold maceration allows the vinegar to marry fully with the fruit syrup, softening its sharp edges. To serve, mix 2–3 tablespoons of shrub with 200 ml sparkling water and ice, or add to cocktails.",
      visualCue: {
        primaryTarget:
          "A translucent, deep-ruby liquid that catches the light like a garnet. When diluted with sparkling water, it blooms into a vivid pink.",
        spectrum: [
          {
            state: "Underdone",
            description:
              "Shrub tastes harshly of raw vinegar with the fruit and sweetness fighting rather than integrating. Less than 24 hours old.",
            action:
              "Return to the refrigerator for another 24–48 hours. Time is the only cure — the acids need to mellow and marry with the fruit sugars.",
          },
          {
            state: "Perfect",
            description:
              "Sharp but rounded. Fruit-forward on the nose, tart on the palate, with a long, clean finish. The vinegar is perceptible but not aggressive. Aged 3 days.",
            action:
              "Store refrigerated for up to 3 months. The flavor continues to mellow over time.",
          },
          {
            state: "Overdone",
            description:
              "After months in the fridge, the shrub has become very sharp and the fruit character has faded, tasting primarily of vinegar.",
            action:
              "Add a tablespoon of fresh honey and shake to combine — this restores sweetness and fruity depth. Still excellent as a cocktail mixer.",
          },
        ],
      },
      feelCue:
        "Pour a small amount over the back of your hand and smell — the vinegar should lift off the surface quickly, leaving behind the scent of raspberries and something almost wine-like, complex and softly fruity.",
    },
  ],
};
