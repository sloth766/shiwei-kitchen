export default {
  repoId: "master_mexican_tacos_de_pescado_001",
  parentRepoId: null,
  slug: "tacos-de-pescado",
  author: "ForkRecipe Kitchen",

  title: "Baja Fish Tacos",
  description: "Beer-battered white fish from the Baja California coast — impossibly light, shatteringly crisp, tucked into warm corn tortillas with shredded cabbage, chipotle crema, and a squeeze of lime that cuts through the richness like a knife. Street food at its most honest.",
  cuisine: "Mexican",
  culture: "Baja California",
  category: "seafood",

  tags: ["fish-tacos", "mexican", "baja", "fried", "cabbage", "crema"],
  difficulty: 2,
  activeTime: "30 min",
  totalTime: "45 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 1, salty: 3, sour: 4, bitter: 1, umami: 2, heat: 3 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Firm white fish fillets (mahi-mahi, cod, or halibut), skinless", ratioValue: 600, defaultUnit: "g",  substitutions: ["tilapia", "snapper", "catfish"] },
    { ingId: "ing_02", role: "Binder",    name: "All-purpose flour",                                               ratioValue: 120, defaultUnit: "g",  substitutions: [] },
    { ingId: "ing_03", role: "Leavener",  name: "Baking powder",                                                   ratioValue: 5,   defaultUnit: "g",  substitutions: [] },
    { ingId: "ing_04", role: "Liquid",    name: "Ice-cold lager beer",                                             ratioValue: 200, defaultUnit: "ml", substitutions: ["sparkling water for alcohol-free"] },
    { ingId: "ing_05", role: "Seasoning", name: "Fine sea salt",                                                   ratioValue: 6,   defaultUnit: "g",  substitutions: [] },
    { ingId: "ing_06", role: "Spice",     name: "Cumin, ground",                                                   ratioValue: 3,   defaultUnit: "g",  substitutions: [] },
    { ingId: "ing_07", role: "Spice",     name: "Smoked paprika",                                                  ratioValue: 3,   defaultUnit: "g",  substitutions: [] },
    { ingId: "ing_08", role: "Fat",       name: "Neutral oil for deep-frying (vegetable or sunflower)",            ratioValue: 1,   defaultUnit: "L",  substitutions: ["canola oil"] },
    { ingId: "ing_09", role: "Structure", name: "Corn tortillas, warmed",                                          ratioValue: 12,  defaultUnit: "tortillas", substitutions: ["flour tortillas"] },
    { ingId: "ing_10", role: "Garnish",   name: "Green cabbage, finely shredded",                                  ratioValue: 200, defaultUnit: "g",  substitutions: ["purple cabbage", "pre-made slaw mix"] },
    { ingId: "ing_11", role: "Dairy",     name: "Mexican crema or sour cream",                                     ratioValue: 120, defaultUnit: "ml", substitutions: ["plain Greek yogurt"] },
    { ingId: "ing_12", role: "Spice",     name: "Chipotle peppers in adobo, minced",                               ratioValue: 20,  defaultUnit: "g",  substitutions: ["hot sauce + 1/2 tsp smoked paprika"] },
    { ingId: "ing_13", role: "Citrus",    name: "Fresh limes, cut in wedges",                                      ratioValue: 3,   defaultUnit: "limes", substitutions: [] },
    { ingId: "ing_14", role: "Herb",      name: "Fresh cilantro, roughly torn",                                    ratioValue: 20,  defaultUnit: "g",  substitutions: ["flat-leaf parsley for cilantro-averse"] },
    { ingId: "ing_15", role: "Garnish",   name: "Pickled jalapeños or fresh salsa",                                ratioValue: 1,   defaultUnit: "to taste", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Make chipotle crema",
      inputs: ["ing_11", "ing_12"],
      outputState: "chipotle_crema",
      instructions: "Whisk minced chipotles in adobo into the crema until fully combined. Start with half the chipotle and taste — it should be smoky, creamy, and moderately spicy. The heat blooms after a minute of contact, so taste again before adding more. Transfer to a squeeze bottle or small bowl. Refrigerate until ready to use.",
      visualCue: {
        primaryTarget: "An orange-tinged cream with visible red-brown flecks of chipotle throughout. Smooth enough to drizzle but thick enough to hold its shape on the taco.",
        spectrum: [
          { state: "Underdone", description: "Plain white crema with no smoke or heat. Chipotle not yet incorporated.", action: "Whisk more vigorously and taste again. The adobo sauce is as important as the pepper itself." },
          { state: "Perfect",   description: "Pale orange, pleasantly smoky and spicy. Coats a spoon in a thin film. Heat level is approachable but present.", action: "Cover and refrigerate. Flavors will deepen over 15 minutes." },
          { state: "Overdone",  description: "Crema is deeply orange and very spicy — too hot for most guests.", action: "Whisk in more plain crema to dilute. Chipotle heat is forgiving and can always be cut back." },
        ],
      },
      feelCue: "Taste a small amount on the tip of your tongue — the smoke should arrive first, then the cream, then the heat building gently at the back of the throat.",
    },
    {
      nodeId: "step_2",
      action: "Mix beer batter",
      inputs: ["ing_02", "ing_03", "ing_05", "ing_06", "ing_07", "ing_04"],
      outputState: "beer_batter",
      instructions: "Whisk flour, baking powder, salt, cumin, and paprika together in a wide bowl. Make a well in the center and pour in the ice-cold beer all at once. Whisk just until combined — lumps are welcome, overworking builds gluten and the batter will be tough. The batter should be the consistency of thin pancake batter. Keep the batter cold; set the bowl over ice if your kitchen is warm.",
      visualCue: {
        primaryTarget: "A loose, thin batter with some lumps remaining. Pale tan with flecks of red paprika. Bubbles rising from the carbonation of the beer — this is what makes the crust light.",
        spectrum: [
          { state: "Underdone", description: "Flour pockets still visible. Dry flour not fully incorporated.", action: "Fold a few more times with a spatula — but stop at incorporation, not smoothness." },
          { state: "Perfect",   description: "Thin, pourable, slightly lumpy. Runs off the whisk in a thin ribbon. Still carbonated and slightly foamy on top.", action: "Use immediately while cold and carbonated." },
          { state: "Overdone",  description: "Batter is smooth and elastic. No bubbles. Dense. Will produce a tough, bready crust rather than a crisp, airy one.", action: "Whisk in a little more cold beer to loosen and re-introduce carbonation." },
        ],
      },
      feelCue: "Dip a finger and let the batter drip — it should fall off in a thin, flowing curtain, not thick drops. Cold batter makes light crust; warm batter makes heavy crust.",
    },
    {
      nodeId: "step_3",
      action: "Fry",
      inputs: ["ing_01", "beer_batter", "ing_08"],
      outputState: "fried_fish",
      instructions: "Heat oil in a deep, heavy pot to 185°C (365°F). Cut fish into strips about 2.5 cm × 8 cm. Pat completely dry. Working in batches of 4–5 strips, dip each piece in batter, let excess drip for 2 seconds, then lower gently into the oil. Fry for 3–4 minutes, turning once, until the batter is deep golden and the fish floats freely. Drain on a wire rack over a sheet pan — never on paper towel, which steams the crust soft.",
      visualCue: {
        primaryTarget: "Deep golden-amber batter, blistered and puffy with air pockets from the carbonation. Fish floats at the surface of the oil. A piece lifted from the oil should steam visibly and sound hollow when tapped.",
        spectrum: [
          { state: "Underdone", description: "Batter is pale blond and still looks wet on the surface. Fish sinks in the oil rather than floating. Internal flesh is still translucent.", action: "Return to oil and check temperature — it may have dropped from overcrowding. Fry in smaller batches." },
          { state: "Perfect",   description: "Deep amber crust, free-floating, blistered and crisp. Fish inside is opaque and flakes cleanly when a piece is broken open. Crust sounds hollow when tapped.", action: "Drain on a wire rack and season with a pinch of salt immediately while hot." },
          { state: "Overdone",  description: "Crust is dark brown and very thick. Edges look brittle. Fish inside may be starting to dry out.", action: "Drain immediately. The exterior can be trimmed of the darkest bits. Next batch: reduce fry time by 30–45 seconds." },
        ],
      },
      feelCue: "Press the crust lightly with a fingertip — it should crunch and shatter under pressure, not compress softly like a damp sponge. If it gives without crackling, the oil was too cool.",
    },
    {
      nodeId: "step_4",
      action: "Assemble",
      inputs: ["fried_fish", "ing_09", "ing_10", "chipotle_crema", "ing_13", "ing_14", "ing_15"],
      outputState: "finished_fish_tacos",
      instructions: "Warm tortillas directly on a gas flame or dry hot griddle until pliable and slightly charred at the edges. Double them up (traditional Baja style prevents sogginess). Layer: a pinch of raw cabbage, 2–3 strips of hot fish, a drizzle of chipotle crema, a scattering of cilantro, and a stripe of salsa or pickled jalapeños. Finish with a hard squeeze of lime. Eat immediately — the crust on the fish is a living, dying thing that begins to soften the moment it is dressed.",
      visualCue: {
        primaryTarget: "A plump, slightly overstuffed taco, steaming from the hot fish. The crust of the fish is still visible and golden above the cabbage. Crema drizzle glints in orange-white ribbons. Lime juice glistens on the surface.",
        spectrum: [
          { state: "Underdone", description: "Tortilla not warmed. Cabbage placed under the fish, making the tortilla soggy. No acid applied.", action: "Lime juice is non-negotiable — the taco is incomplete without its brightness. Warm the tortilla or it will tear." },
          { state: "Perfect",   description: "Tortilla is warm and flexible. Fish is hot, crisp, and visible above the toppings. Every bite has cold cabbage crunch, hot crisp fish, smoky crema, and bright lime.", action: "Eat immediately, holding it in both hands." },
          { state: "Overdone",  description: "Fish sat too long and the crust has steamed soft. Crema has soaked the tortilla through.", action: "For the next round: dress and eat immediately, one taco at a time from the pan." },
        ],
      },
      feelCue: "The first bite should give you three textures in one: the slight chew of the warm tortilla, the sharp crunch and then yielding flake of the fish, and the cool, fresh snap of cabbage.",
    },
  ],
};
