export default {
  repoId: "master_mexican_agua_fresca_tamarindo_001",
  parentRepoId: null,
  slug: "agua-fresca-tamarindo",
  author: "ForkRecipe Kitchen",

  title: "Agua Fresca de Tamarindo",
  description: "A Mexican agua fresca made from tamarind pods cooked until their tart, date-like pulp dissolves into dark, earthy water, then strained and sweetened to a perfect balance of sour and sweet, brightened with a pinch of salt that makes every cold sip taste like the center of a tamarind candy.",
  cuisine: "Mexican",
  culture: "Central Mexico",
  category: "beverages",

  tags: ["agua-fresca", "tamarindo", "mexican", "cold-drink", "tamarind", "sour", "summer"],
  difficulty: 1,
  activeTime: "20 min",
  totalTime: "45 min",
  ratioSystem: "weight",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",

  flavorRadar: { sweet: 3, salty: 1, sour: 5, bitter: 1, umami: 1, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Acid",       name: "Tamarind paste block (not concentrate) or fresh tamarind pods", ratioValue: 200, defaultUnit: "g", substitutions: ["3 tbsp tamarind concentrate (skip the simmering step)"] },
    { ingId: "ing_02", role: "Solvent",    name: "Water (for simmering the tamarind)",     ratioValue: 500, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_03", role: "Solvent",    name: "Cold water (for diluting to drink strength)", ratioValue: 1000, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_04", role: "Sweetener",  name: "Caster sugar or simple syrup",           ratioValue: 100, defaultUnit: "g", substitutions: ["piloncillo", "honey", "agave syrup"] },
    { ingId: "ing_05", role: "Seasoning",  name: "Fine sea salt (a pinch)",                ratioValue: 2,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_06", role: "Citrus",     name: "Fresh lime juice (optional, to sharpen)", ratioValue: 30, defaultUnit: "g", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Simmer tamarind",
      inputs: ["ing_01", "ing_02"],
      outputState: "tamarind_liquid",
      instructions: "Break the tamarind paste block into chunks or remove the shells from fresh pods and pull out the seeds. Place the tamarind in a medium saucepan with the simmering water. Bring to a simmer over medium heat, then reduce to low and cook for 10–15 minutes, mashing the pulp against the sides of the pan with a wooden spoon or potato masher as it softens. The pulp will dissolve into the water, turning it a deep mahogany brown. The seeds, fibers, and any shell pieces will remain separate. The smell is intensely sour, fruity, and slightly sweet — the characteristic tamarind aroma that is used in cuisines across Asia, Africa, and Latin America.",
      visualCue: {
        primaryTarget: "A deep, dark brown liquid with the color of very dark iced tea, thick with dissolved tamarind pulp, seeds and fibrous strands visible throughout.",
        spectrum: [
          { state: "Underdone", description: "Tamarind chunks still intact and visible. The water is only lightly tinted. Pulp hasn't dissolved.", action: "Continue simmering and mashing another 5 minutes. The pulp must fully dissolve into the water to extract all the flavor and tartness." },
          { state: "Perfect",   description: "Deep mahogany liquid with pulp fully dissolved. Seeds and fiber remain but float freely. Smells intensely of tamarind. Taste is very sour, slightly sweet, and full-flavored.", action: "Cool slightly and strain." },
          { state: "Overdone",  description: "Liquid is very thick and syrupy from over-reduction. Quite dark.", action: "Add extra water to loosen before straining. Over-reduced tamarind is intensely concentrated — just dilute." },
        ],
      },
      feelCue: "The tamarind liquid at this stage will taste intensely sour and almost uncomfortably concentrated — that is correct. It will be diluted with cold water in the next step, and the final drink should taste balanced, not punishing.",
    },
    {
      nodeId: "step_2",
      action: "Strain",
      inputs: ["tamarind_liquid"],
      outputState: "strained_tamarind_base",
      instructions: "Pour the tamarind liquid through a fine-mesh sieve placed over a large bowl or pitcher, pressing firmly on the solids with the back of a spoon to extract every last drop of pulp. Discard the seeds, fibers, and any remaining shell pieces. The strained liquid will be thick, very dark, and intensely sour — this is your tamarind concentrate. It can be made ahead and stored refrigerated for up to a week at this stage before diluting and sweetening.",
      visualCue: {
        primaryTarget: "A smooth, dark brown, viscous liquid free of seeds and fiber. Almost opaque and thick, darker than any commercial tamarind drink.",
        spectrum: [
          { state: "Underdone", description: "Seeds and fiber are passing through the sieve. The liquid is still chunky.", action: "Use a finer-mesh sieve or line the sieve with cheesecloth." },
          { state: "Perfect",   description: "Smooth, fiber-free, deep brown liquid. Flows off the spoon in a thick stream. No grit when tasted.", action: "Add cold water, sugar, salt, and lime juice to complete the agua fresca." },
          { state: "Overdone",  description: "You pressed so hard that fibrous plant material pushed through the sieve. Liquid is slightly gritty.", action: "Strain again through a finer cloth. A small amount of fiber is not harmful, just unpleasant in texture." },
        ],
      },
      feelCue: "Taste a small spoonful of the strained concentrate undiluted: it should be mouth-puckeringly sour, earthy, and slightly sweet all at once — like concentrated tamarind candy. If it tastes flat or bland, simmer a bit longer before straining.",
    },
    {
      nodeId: "step_3",
      action: "Sweeten and dilute",
      inputs: ["strained_tamarind_base", "ing_03", "ing_04", "ing_05", "ing_06"],
      outputState: "finished_agua_fresca_tamarindo",
      instructions: "Add the cold water to the strained tamarind concentrate and stir to combine. Add the sugar (or simple syrup for faster dissolving) and a pinch of salt — the salt is not for seasoning in the traditional sense but works as a flavor amplifier, making the sweet-sour-earthy flavor of the tamarind taste more vivid and complete. Add the lime juice if using for additional brightness. Taste and adjust: more sugar if too sour, more tamarind concentrate if too sweet, more salt if it tastes flat. Serve ice-cold over a full glass of ice, stirring before each pour as the tamarind sediment settles quickly.",
      visualCue: {
        primaryTarget: "A translucent dark amber to brown drink poured over ice, lighter in color than the concentrate but still deeply pigmented, with a faint foam ring on the glass surface from the pour.",
        spectrum: [
          { state: "Underdone", description: "Still very sour and concentrated — not enough water or sugar. The color is very dark.", action: "Add more water in small amounts until the flavor is balanced between sour, sweet, and earthy. Taste after each addition." },
          { state: "Perfect",   description: "Balanced sour-sweet, earthy, with the salt amplifying every element. The color is a rich amber-brown over ice. Cold, refreshing, and completely unlike commercial tamarind drinks.", action: "Serve immediately over a full glass of ice." },
          { state: "Overdone",  description: "Over-sweetened — the tartness has been buried by sugar. Color looks watery and pale.", action: "Add more tamarind concentrate or a squeeze of lime to restore the sour balance." },
        ],
      },
      feelCue: "A well-balanced tamarindo agua fresca should make you experience the full sour-sweet-salty triad simultaneously in the first three seconds of tasting — sweet up front, sour blooming in the middle, salt extending the finish. If any of the three is missing, the drink feels incomplete.",
    },
  ],
};
