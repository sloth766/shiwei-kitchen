export default {
  repoId: "master_japanese_miso_black_cod_001",
  parentRepoId: null,
  slug: "miso-black-cod",
  author: "ForkRecipe Kitchen",

  title: "Miso-Marinated Black Cod (Gindara Saikyo Yaki)",
  description: "Black cod fillets buried in white miso and mirin for three days, then broiled until the miso caramelizes into a lacquer of bittersweet umami and the fish beneath is silky, rich, and nearly dissolves on contact with the tongue.",
  cuisine: "Japanese",
  culture: "Japanese",
  category: "seafood",

  tags: ["japanese", "black-cod", "miso", "mirin", "broiled", "saikyo", "umami", "nobu-style"],
  difficulty: 2,
  activeTime: "15 min",
  totalTime: "3 days 20 min",
  ratioSystem: "weight",

  stars: 0, forks: 0, contributors: 1, license: "CC-BY-SA",
  createdAt: "2026-06-27", updatedAt: "2026-06-27",

  flavorRadar: { sweet: 4, salty: 3, sour: 0, bitter: 1, umami: 5, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Black cod (sablefish) fillets, skin-on, pin-bones removed", ratioValue: 600, defaultUnit: "g", substitutions: ["salmon fillets (reduce marination to 1 day)", "Chilean sea bass"] },
    { ingId: "ing_02", role: "Umami",     name: "Saikyo (Kyoto white) miso",         ratioValue: 200, defaultUnit: "g", substitutions: ["any white shiro miso"] },
    { ingId: "ing_03", role: "Sweetener", name: "Mirin (hon mirin preferred)",        ratioValue: 60,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_04", role: "Sweetener", name: "Sake",                               ratioValue: 45,  defaultUnit: "g", substitutions: ["dry sherry"] },
    { ingId: "ing_05", role: "Sweetener", name: "Granulated sugar",                   ratioValue: 15,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_06", role: "Garnish",   name: "Pickled ginger (gari), finely sliced",ratioValue: 20, defaultUnit: "g", substitutions: ["fresh ginger, very thinly sliced"] },
    { ingId: "ing_07", role: "Garnish",   name: "Yuzu zest or lemon zest",            ratioValue: 3,   defaultUnit: "g", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Mix",
      inputs: ["ing_02", "ing_03", "ing_04", "ing_05"],
      outputState: "miso_marinade",
      instructions: "Combine white miso, mirin, sake, and sugar in a small saucepan over medium-low heat. Stir until the sugar dissolves and the mixture is smooth and slightly warmed (do not boil). Remove from heat and cool completely to room temperature. The marinade should be thick and spreadable, slightly thicker than heavy cream.",
      visualCue: {
        primaryTarget: "A pale, creamy beige marinade that flows slowly off a spoon in thick sheets. Smells of sweet rice wine, fermented soybean, and alcohol.",
        spectrum: [
          { state: "Underdone", description: "Sugar not fully dissolved — granules visible at the bottom.", action: "Stir over gentle heat until fully smooth." },
          { state: "Perfect",   description: "Uniform, smooth, glossy marinade. No graininess. Sweet-savory smell with a clean miso base. Cool to the touch.", action: "Coat fish and marinate." },
          { state: "Overdone",  description: "Marinade has been cooked too hot and reduced significantly — thicker and darker than intended.", action: "Add a splash of sake or mirin to thin back to the right consistency." },
        ],
      },
      feelCue: "The marinade should feel like smooth yogurt on your fingers — thick, uniform, and slightly sticky from the miso and mirin. If it feels watery, reduce slightly.",
    },
    {
      nodeId: "step_2",
      action: "Marinate",
      inputs: ["ing_01", "miso_marinade"],
      outputState: "marinated_black_cod",
      instructions: "Pat the cod fillets completely dry with paper towels. Coat the flesh side generously with marinade, pressing it into the fish surface. A thin layer on the skin side is fine. Place in a zip-lock bag or container, making sure each piece is well-coated. Refrigerate for 2–3 days (72 hours for the full effect). The longer the marination, the deeper the flavor penetration and the more dramatic the miso lacquer during cooking.",
      visualCue: {
        primaryTarget: "After 3 days, the fish is deeply stained — the flesh under the miso looks slightly translucent and pale beige where the marinade has penetrated. The miso coating has adhered firmly and looks darker than when applied.",
        spectrum: [
          { state: "Underdone", description: "Marinated less than 24 hours. Flavor is surface-only. Fish interior will taste of plain cod rather than miso.", action: "The dish works at 24 hours but is transformative at 72. The extra days are worth it." },
          { state: "Perfect",   description: "After 72 hours, the miso has slightly 'cured' the fish surface — it looks translucent where it meets the flesh. The coating has darkened and adhered firmly. Fish feels slightly firmer than raw.", action: "Scrape off excess marinade before broiling." },
          { state: "Overdone",  description: "Marinated beyond 5 days. The fish has become over-cured and the texture may be mealy.", action: "Cook regardless — it will still be exceptional. Reduce future marination time." },
        ],
      },
      feelCue: "After 72 hours, the fish feels slightly firmer and denser than when you started — the miso enzymes have gently restructured the surface proteins, pre-seasoning the flesh all the way through.",
    },
    {
      nodeId: "step_3",
      action: "Broil",
      inputs: ["marinated_black_cod"],
      outputState: "broiled_black_cod",
      instructions: "Remove fillets from the marinade and gently scrape off the excess with a spoon or your fingers — do not rinse. Excess miso will burn, not caramelize. Place skin-side down on a foil-lined baking sheet lightly oiled. Broil 15–18 cm from the element for 8–12 minutes, watching constantly. The miso should caramelize to a deep golden-mahogany — not burnt, not pale.",
      visualCue: {
        primaryTarget: "The miso glaze has caramelized to a deep, blistered, uneven mahogany — darker at the thin edges of the fillet, lighter at the thickest part. The fish beneath is opaque and firm but still glistening.",
        spectrum: [
          { state: "Underdone", description: "Miso glaze is still pale and wet-looking. Has not caramelized. Fish may still be raw at the center.", action: "Continue broiling. Watch every 30 seconds — the transition from perfect to overdone is rapid." },
          { state: "Perfect",   description: "Deep mahogany caramelization, slightly blistered and darker at the edges. The glaze looks dry and slightly charred at the very thin points. Fish flakes easily and the flesh is opaque throughout.", action: "Remove immediately and serve." },
          { state: "Overdone",  description: "Miso is black and burned. Bitter, acrid smell. A very dark char has appeared across the whole fillet.", action: "Scrape the most burnt bits with a spoon and serve the flesh beneath — black cod is so rich the underlying fish is likely still excellent." },
        ],
      },
      feelCue: "Press the thickest part of the fillet with a finger — it should yield with almost no resistance, like pressing ripe avocado. If it springs back firmly, it needs another 2 minutes.",
    },
    {
      nodeId: "step_4",
      action: "Garnish",
      inputs: ["broiled_black_cod", "ing_06", "ing_07"],
      outputState: "finished_miso_black_cod",
      instructions: "Transfer each fillet carefully — they are extremely delicate — to a warm plate using a wide spatula. Add a small pile of sliced pickled ginger beside the fish. Grate a tiny amount of yuzu or lemon zest over the top. Serve immediately with steamed rice and a simple cucumber vinegar salad to cut the richness.",
      visualCue: {
        primaryTarget: "A glistening dark-caramelized fillet, skin crisped, with the blushing pink of pickled ginger and a faint yellow confetti of yuzu zest against the mahogany.",
        spectrum: [
          { state: "Underdone", description: "Fillet fell apart during transfer — the flesh is very flaky and delicate.", action: "Use the widest spatula you own and support the full fillet. Serve on the foil and slide onto the plate." },
          { state: "Perfect",   description: "Fillet transferred intact, mahogany glaze shining, garnishes vivid. The fish glistens with its own rich fat.", action: "Eat immediately — black cod at its peak is extraordinary." },
          { state: "Overdone",  description: "Fish has been sitting and begun to dry out.", action: "This is best served the moment it leaves the broiler. No resting needed." },
        ],
      },
      feelCue: "A perfect bite of miso black cod should offer almost no resistance — the fork should glide through the flesh and it should dissolve on the palate like warm butter, leaving behind the lingering umami of the miso and the sweetness of the mirin.",
    },
  ],
};
