export default {
  repoId: "master_american_coldbrewconcentrate_001",
  parentRepoId: null,
  slug: "cold-brew-concentrate",
  author: "ForkRecipe Kitchen",
  title: "Cold Brew Concentrate",
  description: "Coarsely ground single-origin coffee steeped in cold water for 12–16 hours — the slow extraction pulls chocolate, fruit, and caramel from the grounds while leaving behind the harsh acids and bitter compounds that heat unlocks. The result is a smooth, inky concentrate to dilute to taste over ice or with milk.",
  cuisine: "American",
  culture: "Third Wave Coffee",
  category: "beverages",
  tags: ["coffee", "cold-brew", "beverage", "concentrate", "vegan", "summer", "caffeinated"],
  difficulty: 1,
  activeTime: "10 min",
  totalTime: "16 hr",
  ratioSystem: "parts",
  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",
  flavorRadar: { sweet: 0, salty: 0, sour: 1, bitter: 3, umami: 0, heat: 0 },
  ingredients: [
    {
      ingId: "ing_01",
      role: "Structure",
      name: "Coarsely ground coffee (medium-dark or light-medium roast, single-origin preferred)",
      ratioValue: 1,
      defaultUnit: "parts",
      substitutions: ["medium roast blend — avoid dark roast which goes bitter cold"],
    },
    {
      ingId: "ing_02",
      role: "Solvent",
      name: "Cold filtered water (or room-temperature water for faster extraction)",
      ratioValue: 4,
      defaultUnit: "parts",
      substitutions: ["cold tap water that has rested overnight"],
    },
  ],
  processNodes: [
    {
      nodeId: "step_1",
      action: "Steep",
      inputs: ["ing_01", "ing_02"],
      outputState: "steeping_grounds",
      instructions:
        "Combine the coarsely ground coffee and cold filtered water in a large mason jar, French press, or dedicated cold-brew vessel. The grind must be coarse — similar to raw sugar or coarse sea salt. Fine grinds over-extract during the long steep and produce bitterness. Stir the grounds and water together to ensure all grounds are saturated with no dry pockets floating on top. Cover the vessel and place it in the refrigerator (4 C / 40 F). Steep for a minimum of 12 hours and a maximum of 16 hours — going beyond 16 hours begins to extract astringent and bitter compounds even in cold water. 14 hours is the sweet spot for most coffees.",
      visualCue: {
        primaryTarget:
          "After 14 hours: the liquid beneath the grounds is a very dark, nearly opaque deep brown — almost black in the jar. The grounds have sunk to the bottom or formed a floating puck.",
        spectrum: [
          {
            state: "Underdone",
            description:
              "Liquid is medium brown and translucent. Grounds still actively floating throughout. Under 10 hours.",
            action:
              "Return to the fridge. Check again in 2–4 hours. The extraction happens slowly and cannot be rushed by stirring.",
          },
          {
            state: "Perfect",
            description:
              "Deep, near-black liquid. When a small amount is poured into a glass, it is a rich chocolate-brown. Grounds have settled or formed a compact puck.",
            action:
              "Strain immediately to stop extraction.",
          },
          {
            state: "Overdone",
            description:
              "Liquid has a slight greenish tinge or smells acidic and sharp. Has been steeping 18+ hours.",
            action:
              "Strain immediately and dilute more heavily before drinking. The concentrate will be more bitter than ideal but is not unusable.",
          },
        ],
      },
      feelCue:
        "After straining a few drops onto your palm, the concentrate should feel slightly thicker than water — rich and oily, like a thin syrup — and leave a faint coffee stain on your skin.",
    },
    {
      nodeId: "step_2",
      action: "Strain",
      inputs: ["steeping_grounds"],
      outputState: "cold_brew_concentrate",
      instructions:
        "Pour the steeped grounds through a fine-mesh strainer lined with a paper coffee filter (or a clean muslin cloth) into a clean jar or bottle. Do not press or squeeze the grounds — gravity is sufficient. Pressing extracts bitter oils and fine particles that cloud and sharpen the concentrate. The filtration will take 5–10 minutes; patience here is rewarded. Once filtered, seal the jar and refrigerate. The concentrate keeps well for up to 2 weeks refrigerated. To serve, dilute 1:1 with cold water or milk for a standard strength, or 1:2 for something gentler.",
      visualCue: {
        primaryTarget:
          "Clear, dark-mahogany liquid that allows light to pass through at the edges but looks nearly black at depth. No particulate matter. A thin, smooth surface with no oil slick or cloudiness.",
        spectrum: [
          {
            state: "Underdone",
            description:
              "Liquid is muddy and thick with fine particles. The filter is clogged or the grind was too fine.",
            action:
              "Change the paper filter, pour the muddy liquid back through a fresh filter, and wait for gravity. Do not press.",
          },
          {
            state: "Perfect",
            description:
              "Clear, jewel-toned dark-brown liquid flows through the filter steadily. Smells of chocolate, fruit, and roasted coffee with no sharp burnt notes.",
            action:
              "Seal and refrigerate. Label with date and dilution ratio.",
          },
          {
            state: "Overdone",
            description:
              "Very dark, almost syrupy. You've pressed the grounds or used too much coffee. Tastes extremely concentrated and bitter undiluted.",
            action:
              "This is still usable — just dilute at a higher ratio (1:3 or 1:4) rather than the standard 1:1.",
          },
        ],
      },
      feelCue:
        "The finished concentrate, when a drop is rubbed between thumb and forefinger, should feel faintly slick from the natural coffee oils — smooth and clean, not gritty or astringent.",
    },
  ],
};
