export default {
  repoId: "master_british_elderflower_cordial_001",
  parentRepoId: null,
  slug: "elderflower-cordial",
  author: "ForkRecipe Kitchen",

  title: "Elderflower Cordial",
  description: "A British early-summer ritual — fresh elderflower heads gathered at peak bloom and steeped for 24 hours in a hot lemon-and-sugar syrup that coaxes out their fleeting muscatel fragrance, producing a golden, intensely floral cordial that diluted with cold sparkling water tastes of warm meadows and the longest days of the year.",
  cuisine: "British",
  culture: "English Countryside",
  category: "beverages",

  tags: ["elderflower", "cordial", "british", "floral", "summer", "syrup", "non-alcoholic"],
  difficulty: 1,
  activeTime: "30 min",
  totalTime: "25 hours",
  ratioSystem: "weight",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",

  flavorRadar: { sweet: 5, salty: 0, sour: 2, bitter: 1, umami: 0, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Aromatic",   name: "Fresh elderflower heads (at peak bloom, fully open)", ratioValue: 25, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_02", role: "Sweetener",  name: "White caster sugar",                                   ratioValue: 1000, defaultUnit: "g", substitutions: ["granulated sugar"] },
    { ingId: "ing_03", role: "Solvent",    name: "Water",                                                 ratioValue: 1000, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_04", role: "Citrus",     name: "Unwaxed lemons, sliced into rounds",                   ratioValue: 200, defaultUnit: "g", substitutions: ["blood oranges for color"] },
    { ingId: "ing_05", role: "Acid",       name: "Citric acid",                                           ratioValue: 25,  defaultUnit: "g", substitutions: ["juice of 2 additional lemons (less shelf-life)"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Make syrup",
      inputs: ["ing_02", "ing_03"],
      outputState: "hot_syrup",
      instructions: "Combine the sugar and water in a large, wide saucepan. Heat over medium heat, stirring frequently, until every grain of sugar has completely dissolved and the syrup is clear — this takes about 5 minutes. Do not boil the syrup aggressively; a gentle simmer is enough to dissolve the sugar and sterilize the liquid. Remove from the heat as soon as the syrup is clear and the surface has just begun to simmer. A fully clear syrup means no undissolved sugar crystals remain — cloudy or grainy syrup means the sugar hasn't fully dissolved and the cordial may crystallize in the bottle.",
      visualCue: {
        primaryTarget: "A completely clear, colorless syrup with a faint steam rising from it. No granules visible when held up to the light. Surface is calm, not aggressively boiling.",
        spectrum: [
          { state: "Underdone", description: "Milky or slightly cloudy. Sugar granules still visible when tilted. Tastes of raw sugar water.", action: "Continue heating and stirring for another 2–3 minutes until the syrup runs completely clear." },
          { state: "Perfect",   description: "Crystal clear, colorless, and hot. A spoonful is thick and coats the spoon in a thin, even film when cooled.", action: "Remove from heat and add elderflowers and lemons immediately." },
          { state: "Overdone",  description: "Syrup has been boiling hard and turned very slightly golden at the edges — the sugar is beginning to caramelize.", action: "Pull from the heat — very light caramelization won't ruin the cordial, just tints it slightly amber. Deep caramelization would overpower the floral delicacy." },
        ],
      },
      feelCue: "Dip a cool metal spoon into the hot syrup and hold it in the air: a perfect cordial syrup should coat the spoon in a very thin, even film that drips in slow but continuous drops rather than sheets or individual drips.",
    },
    {
      nodeId: "step_2",
      action: "Steep",
      inputs: ["hot_syrup", "ing_01", "ing_04", "ing_05"],
      outputState: "steeping_cordial",
      instructions: "Shake the elderflower heads gently to dislodge any insects — do not wash them, as water dilutes the fragrant pollen that is the heart of the cordial. Add the flower heads and lemon slices to the hot syrup. Stir in the citric acid. Cover with a clean cloth or lid set slightly ajar, and leave to steep at room temperature for 24 hours. The syrup will slowly turn from clear to a pale golden-green as the floral compounds, lemon oils, and citric acid infuse. Do not refrigerate during steeping — the cold slows the infusion and you lose complexity.",
      visualCue: {
        primaryTarget: "After 24 hours: pale golden-green syrup with elderflower heads floating throughout, lemons suspended in the liquid, fragrant steam no longer rising.",
        spectrum: [
          { state: "Underdone", description: "At 4 hours: syrup is barely tinted and the floral aroma is faint.", action: "Leave to steep the full 24 hours — the floral intensity builds slowly and the best extraction happens in the second 12 hours." },
          { state: "Perfect",   description: "After 24 hours: golden, faintly green-tinted, visibly fragrant (you will smell it from across the kitchen). Tastes intensely floral, sweet, and tart.", action: "Strain and bottle." },
          { state: "Overdone",  description: "After 48+ hours: the floral notes may begin to turn slightly vegetal or medicinal from over-extraction of the stalks and leaves.", action: "Strain immediately. Slightly over-steeped cordial may be fuller and more complex — taste before discarding." },
        ],
      },
      feelCue: "After 24 hours, lean over the vessel and breathe in — the scent should be overwhelmingly floral, almost perfume-like, a wall of muscatel and honey and green. If the scent is faint, your flowers were past their peak bloom.",
    },
    {
      nodeId: "step_3",
      action: "Strain and bottle",
      inputs: ["steeping_cordial"],
      outputState: "finished_elderflower_cordial",
      instructions: "Line a fine-mesh sieve with cheesecloth or a clean, unscented muslin cloth. Strain the cordial through the cloth, pressing gently on the flower heads. Do not squeeze aggressively — pressing too hard forces green, bitter plant material through the cloth. Transfer the strained cordial to sterilized glass bottles with tight-sealing lids. Seal and refrigerate. The cordial keeps for 6 weeks refrigerated, or can be frozen in ice-cube trays for use year-round. To serve: dilute 1 part cordial with 4–5 parts sparkling or still water, or splash over prosecco.",
      visualCue: {
        primaryTarget: "A clear, pale golden cordial in a glass bottle — the color of weak elderflower wine, translucent, faintly green-tinted when held to the light.",
        spectrum: [
          { state: "Underdone", description: "Cordial is cloudy or greenish-grey from plant debris passing through the cloth.", action: "Re-strain through a finer cloth. Cloudiness does not affect flavor but does affect visual appeal." },
          { state: "Perfect",   description: "Clear, golden, fragrant. One spoonful added to a glass of sparkling water transforms it completely. Smells of summer and flowers.", action: "Bottle in sterilized glass. Refrigerate and use within 6 weeks." },
          { state: "Overdone",  description: "Very dark amber with bitter plant notes from over-squeezing the cloth.", action: "It is still usable but may need balancing. Blend with more fresh syrup (1:1 fresh syrup to bitter cordial) to dilute the bitterness." },
        ],
      },
      feelCue: "Pour a small amount and hold the bottle up to a window: perfect elderflower cordial is translucent gold, clear enough to see through, with the color of very weak honey water. Shake the bottle — the liquid should flow freely with no viscous clinging.",
    },
  ],
};
