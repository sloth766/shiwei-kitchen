export default {
  repoId: "master_japanese_tuna_tataki_001",
  parentRepoId: null,
  slug: "tuna-tataki",
  author: "ForkRecipe Kitchen",

  title: "Tuna Tataki with Ponzu",
  description: "Sushi-grade ahi tuna briefly seared on all sides in an almost-smoking pan until a thin cooked shell forms around a fully raw, deep-red center — sliced thin, draped with ponzu and ginger, the contrast between the warm sear and the cold interior the entire point.",
  cuisine: "Japanese",
  culture: "Japanese",
  category: "seafood",

  tags: ["japanese", "tuna", "tataki", "ponzu", "sashimi", "seared", "raw", "ahi"],
  difficulty: 2,
  activeTime: "15 min",
  totalTime: "1 hour",
  ratioSystem: "weight",

  stars: 0, forks: 0, contributors: 1, license: "CC-BY-SA",
  createdAt: "2026-06-27", updatedAt: "2026-06-27",

  flavorRadar: { sweet: 1, salty: 3, sour: 3, bitter: 0, umami: 4, heat: 1 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Sushi-grade ahi (yellowfin) tuna loin, in a block", ratioValue: 400, defaultUnit: "g", substitutions: ["bluefin otoro (richer)", "sashimi-grade salmon"] },
    { ingId: "ing_02", role: "Umami",     name: "Ponzu sauce",                       ratioValue: 60,  defaultUnit: "g", substitutions: ["soy sauce + 1 tbsp yuzu or lemon juice"] },
    { ingId: "ing_03", role: "Aromatic",  name: "Fresh ginger, very finely grated",  ratioValue: 10,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_04", role: "Seasoning", name: "Fine sea salt",                     ratioValue: 4,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_05", role: "Seasoning", name: "Freshly cracked black pepper",      ratioValue: 2,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_06", role: "Fat",       name: "Neutral oil with high smoke point (grapeseed or avocado)", ratioValue: 20, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_07", role: "Garnish",   name: "Thinly sliced green onions (scallions)", ratioValue: 15, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_08", role: "Garnish",   name: "Toasted sesame seeds",              ratioValue: 5,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_09", role: "Aromatic",  name: "Toasted sesame oil",                ratioValue: 8,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_10", role: "Garnish",   name: "Daikon radish, julienned (optional)", ratioValue: 50, defaultUnit: "g", substitutions: ["microgreens"] },
    { ingId: "ing_11", role: "Acid",      name: "Yuzu juice or lemon juice (optional finishing acid)", ratioValue: 10, defaultUnit: "g", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Chill",
      inputs: ["ing_01"],
      outputState: "cold_tuna_block",
      instructions: "Place the tuna in the freezer for 30–40 minutes before searing. Very cold tuna sears faster without cooking the interior — the goal is maximum exterior heat, minimum interior cook. The tuna should feel hard at the surface but not frozen solid. Remove and immediately season all four long sides with salt and pepper.",
      visualCue: {
        primaryTarget: "The tuna block feels very firm and cold to the touch but bends very slightly when pressed. Surface is dry and matte, not icy or frost-covered.",
        spectrum: [
          { state: "Underdone", description: "Tuna is only fridge-cold, not chilled below 5 C. The sear will cook too deep into the interior before a crust forms.", action: "Freeze for the full 30 minutes. A frozen exterior is essential to the technique." },
          { state: "Perfect",   description: "Surface is very cold and firm. The block doesn't flex. No ice crystals visible. Dry surface will maximize Maillard reaction in the pan.", action: "Season and sear immediately — do not let it sit and warm." },
          { state: "Overdone",  description: "Tuna is partly frozen solid throughout. Ice crystals inside mean the sear will steam instead of crust.", action: "Let stand at room temperature for 5 minutes, then sear." },
        ],
      },
      feelCue: "The chilled tuna should feel like cold, slightly flexible steel against your palm — not bouncy at room temperature, not rigid like a frozen block.",
    },
    {
      nodeId: "step_2",
      action: "Sear",
      inputs: ["cold_tuna_block", "ing_04", "ing_05", "ing_06"],
      outputState: "seared_tuna",
      instructions: "Heat a cast iron or stainless steel pan over maximum heat for 3 minutes until smoking — test by flicking a drop of water (should vaporize instantly). Add oil in a thin film. Sear the tuna block for exactly 30–45 seconds per side on all four long sides, moving it with tongs. Do not sear the ends. The tuna must never rest stationary long enough to cook through. Work quickly.",
      visualCue: {
        primaryTarget: "A thin, uniform grey-white cooked shell approximately 3–4 mm deep on all four sides, the interior remaining completely raw and deep-red when viewed at the ends.",
        spectrum: [
          { state: "Underdone", description: "Crust is very thin and patchy — less than 2 mm. Little to no color formation.", action: "The pan was not hot enough. The exterior must sear, not steam." },
          { state: "Perfect",   description: "A thin, uniform crust on all four sides. The ends reveal the interior is fully raw red. The exterior smells of seared meat. Removed from heat before color reached the center.", action: "Transfer to a cold plate to stop cooking." },
          { state: "Overdone",  description: "The cooked shell is more than 6 mm deep. The interior has begun to grey and is no longer fully raw. The tuna looks like a cooked piece with a small raw center.", action: "Still excellent if medium-rare is acceptable. Slice thin and serve." },
        ],
      },
      feelCue: "The seared tuna should hiss loudly the moment it hits the pan — a sustained, aggressive crackle. Any silence means the pan isn't hot enough and the tuna will steam instead of sear.",
    },
    {
      nodeId: "step_3",
      action: "Slice",
      inputs: ["seared_tuna"],
      outputState: "sliced_tataki",
      instructions: "Transfer the seared tuna immediately to a cold plate or rest over a small bowl of ice for 2 minutes to halt carryover cooking. Using a very sharp, thin-bladed knife (yanagiba or slicing knife), slice the tuna into 5 mm thick slices in one smooth, drawing motion — never saw. Arrange slices in a single overlapping layer on a cold plate.",
      visualCue: {
        primaryTarget: "Each slice reveals the tataki's signature: a clean white-grey outer ring (the sear) surrounding a vivid, deep-red, raw center. The slices are translucent at the center when held to light.",
        spectrum: [
          { state: "Underdone", description: "The outer ring is very thin and patchy. The contrast with the raw center is barely visible.", action: "Next time sear at higher heat for a complete, even ring. Still presentable." },
          { state: "Perfect",   description: "A dramatic contrast — the grey-white sear ring is uniform and 3–4 mm, the center is vivid crimson. Slices are translucent at the center and hold their shape cleanly.", action: "Dress immediately with ponzu." },
          { state: "Overdone",  description: "Slices reveal a large grey cooked portion with only a small raw center. Tuna is medium-well.", action: "Serve very cold with extra ponzu and yuzu to add brightness." },
        ],
      },
      feelCue: "The slices should yield to the knife with almost no resistance — a good tuna tataki is sliced, not cut. If you feel fibrous resistance, your knife is not sharp enough.",
    },
    {
      nodeId: "step_4",
      action: "Garnish",
      inputs: ["sliced_tataki", "ing_02", "ing_03", "ing_07", "ing_08", "ing_09", "ing_10", "ing_11"],
      outputState: "finished_tuna_tataki",
      instructions: "Drizzle ponzu over and around the slices. Spoon a small mound of grated ginger onto each slice or place at the side. Drizzle sesame oil in a thin stream. Scatter green onion and sesame seeds. Add daikon alongside if using. A few drops of yuzu juice at the very end brighten everything. Serve immediately.",
      visualCue: {
        primaryTarget: "Glistening slices of tuna in two-tone sear-and-raw, pooled in pale ponzu, bright with green onion and white sesame seeds. The daikon julienne provides a white counterpoint.",
        spectrum: [
          { state: "Underdone", description: "Ponzu not yet added. Slices are dry.", action: "Dress immediately before the tuna surface dries out." },
          { state: "Perfect",   description: "Slices glistening in ponzu, all garnishes in place. Served on a cold plate so the tuna stays at the right temperature.", action: "Eat immediately." },
          { state: "Overdone",  description: "Tuna has been sitting in ponzu for more than 5 minutes and the acid has begun to 'cook' the raw interior, turning it grey.", action: "Serve tataki the moment it is dressed. Never let raw fish sit in acid." },
        ],
      },
      feelCue: "A slice of perfect tuna tataki on the tongue should first register the cool, clean rawness of the center, then the slightly chewier texture of the seared exterior — two entirely different textures in one thin slice.",
    },
  ],
};
