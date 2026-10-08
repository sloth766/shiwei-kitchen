export default {
  repoId: "master_thai_pad_thai_001",
  parentRepoId: null,
  slug: "pad-thai",
  author: "ForkRecipe Kitchen",

  title: "Pad Thai",
  description: "Smoke-kissed rice noodles tangled with egg, shrimp, and crunchy peanuts, bound by a glossy tamarind sauce that walks the razor edge between sweet, sour, salty, and savory. Every wok-blast of heat produces a layer of caramelized noodle crust — the hallmark of true street-stall pad thai.",
  cuisine: "Thai",
  culture: "Central Thai",
  category: "grains",

  tags: ["noodles", "thai", "stir-fry", "shrimp", "tamarind", "wok", "street-food"],
  difficulty: 3,
  activeTime: "20 min",
  totalTime: "45 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 3, salty: 4, sour: 3, bitter: 1, umami: 4, heat: 2 },

  ingredients: [
    { ingId: "ing_01", role: "Starch",    name: "Dried sen lek rice noodles (3mm wide)", ratioValue: 200, defaultUnit: "g",   substitutions: ["dried pad thai noodles", "rice vermicelli (thinner result)"] },
    { ingId: "ing_02", role: "Protein",   name: "Raw shrimp, peeled and deveined",        ratioValue: 150, defaultUnit: "g",   substitutions: ["firm tofu cubes", "chicken breast thinly sliced"] },
    { ingId: "ing_03", role: "Binder",    name: "Eggs",                                    ratioValue: 2,   defaultUnit: "whole", substitutions: [] },
    { ingId: "ing_04", role: "Sweetener", name: "Tamarind paste (concentrated)",           ratioValue: 45,  defaultUnit: "ml",  substitutions: ["lime juice + brown sugar (less depth)"] },
    { ingId: "ing_05", role: "Umami",     name: "Fish sauce (Tiparos or Megachef)",        ratioValue: 30,  defaultUnit: "ml",  substitutions: ["soy sauce + pinch of salt (vegetarian)"] },
    { ingId: "ing_06", role: "Sweetener", name: "Palm sugar, grated (or light brown sugar)", ratioValue: 20, defaultUnit: "g", substitutions: ["brown sugar", "coconut sugar"] },
    { ingId: "ing_07", role: "Allium",    name: "Shallots, thinly sliced",                ratioValue: 40,  defaultUnit: "g",   substitutions: ["red onion"] },
    { ingId: "ing_08", role: "Allium",    name: "Garlic cloves, minced",                  ratioValue: 3,   defaultUnit: "cloves", substitutions: [] },
    { ingId: "ing_09", role: "Fat",       name: "Neutral oil (rice bran or sunflower)",   ratioValue: 45,  defaultUnit: "ml",  substitutions: ["lard (traditional)", "vegetable oil"] },
    { ingId: "ing_10", role: "Protein",   name: "Dried shrimp (kung haeng), small",       ratioValue: 15,  defaultUnit: "g",   substitutions: ["omit for lighter flavor"] },
    { ingId: "ing_11", role: "Garnish",   name: "Bean sprouts, rinsed",                   ratioValue: 80,  defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_12", role: "Garnish",   name: "Roasted peanuts, roughly crushed",       ratioValue: 40,  defaultUnit: "g",   substitutions: ["cashews"] },
    { ingId: "ing_13", role: "Herb",      name: "Garlic chives (or green onion tops)",    ratioValue: 20,  defaultUnit: "g",   substitutions: ["green onion tops"] },
    { ingId: "ing_14", role: "Acid",      name: "Lime, cut into wedges",                  ratioValue: 1,   defaultUnit: "whole", substitutions: [] },
    { ingId: "ing_15", role: "Spice",     name: "Dried chili flakes (prik bon)",          ratioValue: 5,   defaultUnit: "g",   substitutions: ["fresh Thai chili, minced"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Hydrate",
      inputs: ["ing_01"],
      outputState: "soaked_noodles",
      instructions: "Place the dried rice noodles in a large bowl and cover with room-temperature water — not hot, not boiling. Let them soak for 25 to 30 minutes until they are pliable and can be bent without snapping, but still have a firm, slightly chalky bite at their core. They should feel like al dente pasta but more delicate. Drain in a colander and shake off excess water. Do not rinse. The surface starch left on the noodles helps them cling to the sauce in the wok. If you soak them in hot water, they will become fully cooked and turn to mush the moment they hit the wok. Spread them loosely if you need to wait — they stick aggressively once drained.",
      visualCue: {
        primaryTarget: "Noodles are opaque white, fully flexible, and loop without cracking — but not translucent.",
        spectrum: [
          { state: "Underdone", description: "Noodles snap when bent and have a white chalky center running the full width. They will not absorb wok sauce fast enough and will clump into a hard knot.", action: "Return to the soak water for another 5–10 minutes. Test again by bending a single noodle in a U-shape." },
          { state: "Perfect",   description: "Noodles bend in a full loop without cracking. The center is barely chalky — mostly opaque white shading toward translucency. They are pliable but still have structural integrity.", action: "Drain immediately and use within 15 minutes. The window closes fast." },
          { state: "Overdone",  description: "Noodles are fully translucent and completely soft, breaking apart when lifted. They will disintegrate in the wok and turn to paste when tossed.", action: "You can still cook them, but move extremely fast — high heat only, minimal tossing, and serve immediately. The texture will be softer than ideal." },
        ],
      },
      feelCue: "A properly soaked noodle draped over your finger should hang with gentle weight and bend back on itself without any resistance — like a ribbon of raw silk, cool and slightly slippery.",
    },
    {
      nodeId: "step_2",
      action: "Season",
      inputs: ["ing_04", "ing_05", "ing_06"],
      outputState: "pad_thai_sauce",
      instructions: "In a small saucepan over low heat, combine the tamarind paste, fish sauce, and palm sugar. Stir gently until the palm sugar dissolves completely and the mixture is uniform — about 2 minutes. Do not boil; you are dissolving and integrating, not reducing. Taste the sauce: it should hit sour first (tamarind), then salty (fish sauce), then sweet (palm sugar) in a rolling wave, with no single note dominating. The color should be a deep amber-brown, like strong iced tea. Adjust balance now: too sour, add a pinch more sugar; too sweet, add a dash more fish sauce; too flat, add a tiny extra squeeze of tamarind. This sauce is the entire flavor backbone of the dish — getting the balance right before the wok work begins is essential, because there is no time to adjust once you are cooking.",
      visualCue: {
        primaryTarget: "A glossy, deep amber liquid, uniform in color, with no grainy sugar crystals visible.",
        spectrum: [
          { state: "Underdone", description: "Sugar granules are still visible floating in the sauce. It looks slightly murky and the flavor is uneven — patches of sweetness and patches of sharp sour.", action: "Continue stirring over low heat. Do not increase heat sharply or the sugar will crystallize on the pan sides." },
          { state: "Perfect",   description: "A smooth, lacquer-like liquid the color of dark honey. All elements are integrated. It coats the back of a spoon in a thin, even film.", action: "Remove from heat and set aside. The sauce holds at room temperature for hours." },
          { state: "Overdone",  description: "The sauce has begun to simmer and concentrate. It smells of burnt caramel and the color has darkened to near-black at the edges.", action: "Add a small splash of water and stir vigorously off the heat. The flavor will still work but will be less bright." },
        ],
      },
      feelCue: "A drop of the finished sauce on your wrist should feel warm and slightly sticky, releasing a complex sweet-sour-savory aroma that makes your mouth water before it even reaches your lips.",
    },
    {
      nodeId: "step_3",
      action: "Fry",
      inputs: ["ing_09", "ing_07", "ing_08", "ing_10"],
      outputState: "aromatic_base",
      instructions: "Heat a wok or large heavy skillet over the highest heat your stove allows for a full 2 minutes — the pan should be smoking. Add the oil and swirl to coat. Add the sliced shallots and stir-fry for 90 seconds until they begin to soften and turn golden at the edges. Add the minced garlic and the dried shrimp. Stir-fry constantly for another 60 seconds, keeping everything moving. The dried shrimp will toast and release their deeply savory, oceanic fragrance — the aroma should shift from raw garlic to something roasted and complex. Do not let the garlic burn; it turns bitter fast at this temperature. The entire wok should be billowing with fragrant smoke. If your exhaust fan is not at maximum, open a window.",
      visualCue: {
        primaryTarget: "Shallots are translucent gold with lightly caramelized edges. Garlic is pale gold, not brown. Dried shrimp are pinkish-orange and smell toasted.",
        spectrum: [
          { state: "Underdone", description: "Shallots are still raw-white and the dried shrimp smell of the sea without any toasted depth. The garlic has not begun to color.", action: "Increase heat and keep tossing. Do not leave the wok unattended at this stage." },
          { state: "Perfect",   description: "Shallots have softened and carry golden-bronze edges. Garlic is warm straw-yellow. The wok smells of sweet roasted allium and briny toasted shrimp.", action: "Add the shrimp immediately — the wok is at peak temperature." },
          { state: "Overdone",  description: "Garlic is dark brown and smells sharp and acrid. Shallots have burnt edges and are pulling away from the wok sides as char.", action: "Discard and start again. Burnt garlic cannot be rescued and will make the entire dish bitter." },
        ],
      },
      feelCue: "Hold your hand 15 cm above the wok — you should feel the heat like opening an oven door. The oil should smoke continuously, and the dried shrimp will crackle audibly the moment they hit the surface.",
    },
    {
      nodeId: "step_4",
      action: "Sear",
      inputs: ["aromatic_base", "ing_02"],
      outputState: "cooked_shrimp_base",
      instructions: "Add the raw shrimp to the wok in a single layer and press them flat for 30 seconds without stirring, letting them sear against the hot wok surface. Flip once — they should be pink on the seared side. Stir-fry for another 30–45 seconds just until they are just cooked through and curled into a C-shape. Do not overcook; they will return to the wok heat twice more. Remove the shrimp to a plate and set aside. They should be 90% cooked — just opaque, still glossy, not rubbery. Leaving them slightly underdone here is intentional: they will finish in the final toss with the noodles.",
      visualCue: {
        primaryTarget: "Shrimp are pink and opaque on the outside, still just translucent at the very center, curled into a relaxed C rather than a tight O.",
        spectrum: [
          { state: "Underdone", description: "Shrimp are still translucent grey-blue throughout. The center shows no color change at all.", action: "Return to the wok for another 30 seconds of high heat. They only need seconds, not minutes." },
          { state: "Perfect",   description: "Shrimp are vivid pink-orange, curled to a gentle C. The center is just barely translucent, promising a tender finish when they return to the heat later.", action: "Remove from the wok immediately and plate separately." },
          { state: "Overdone",  description: "Shrimp are tightly coiled into a full O and feel firm and rubbery when pressed. They have released liquid into the wok.", action: "They are overcooked — add them back at the very end of the final toss just to coat them in sauce, not to cook further. They will be acceptable but chewy." },
        ],
      },
      feelCue: "A properly seared shrimp should yield under light pressure — springy and plump, not bouncing back hard. The wok should hiss and spit when the shrimp first touch the surface, a sound like rain on hot pavement.",
    },
    {
      nodeId: "step_5",
      action: "Toss",
      inputs: ["cooked_shrimp_base", "soaked_noodles", "pad_thai_sauce", "ing_03"],
      outputState: "sauced_noodles",
      instructions: "Return the wok to maximum heat. Add the drained noodles to the wok and immediately pour the pad thai sauce over them. Toss constantly for 60–90 seconds, folding the noodles through the sauce with tongs or a long spatula — the sauce will absorb and caramelize against the wok surface. Push the noodles to one side of the wok to expose the center. Crack both eggs into the exposed center and let them set for 15 seconds, then scramble loosely before the whites fully set. When the eggs are still glossy and 80% cooked, drag the noodles back over the eggs and fold everything together. The eggs should coat the noodles in broken golden ribbons, not clump into a dry omelette. Return the shrimp to the wok, toss once or twice, and plate immediately.",
      visualCue: {
        primaryTarget: "Noodles are deeply amber-colored from the sauce, with scattered char marks where they contacted the wok surface. Egg ribbons are visible, golden and just set.",
        spectrum: [
          { state: "Underdone", description: "Noodles are pale and watery — the sauce has not caramelized and the noodles are soggy rather than glossy.", action: "Increase heat to maximum and spread noodles flat against the wok for 30 seconds without stirring, forcing wok contact and caramelization." },
          { state: "Perfect",   description: "Noodles are a deep, glossy amber with occasional darker char flecks from the wok. The egg is in soft, golden, irregular ribbons throughout. The dish smells of caramelized tamarind and wok smoke.", action: "Plate immediately — noodles continue cooking in their own heat." },
          { state: "Overdone",  description: "Noodles have broken into short fragments and stuck to the wok in a dark, gluey mass. The eggs are dry and yellowed.", action: "Splash in a tablespoon of water and toss quickly to free the stuck noodles before they burn further. Plate immediately despite the imperfection." },
        ],
      },
      feelCue: "When tossing the noodles, you should hear a continuous sizzle and occasional crackle as the sauce sugars caramelize — the sound drops in pitch as the sauce is absorbed. The wok handle will be almost too hot to touch; use a cloth.",
    },
    {
      nodeId: "step_6",
      action: "Garnish",
      inputs: ["sauced_noodles", "ing_11", "ing_12", "ing_13", "ing_14", "ing_15"],
      outputState: "finished_pad_thai",
      instructions: "Plate the pad thai in a mound. On one side, pile the bean sprouts and garlic chives raw — they should be cold and crunchy against the hot noodles, providing textural contrast. Scatter the crushed peanuts over the top. Serve with a lime wedge pressed against the mound and a small pile of dried chili flakes on the side. Never mix the garnishes into the noodles before serving — each diner should mix their own, squeezing the lime and adjusting chili to taste. The pad thai is traditionally served with additional condiments on the side: fish sauce with floating chilies, more sugar, more chili flakes, and white vinegar — the four flavors of the Thai table.",
      visualCue: {
        primaryTarget: "A vibrant composition: amber-brown noodles topped with bright white-green sprouts, golden peanut rubble, and a vivid green lime wedge.",
        spectrum: [
          { state: "Underdone", description: "Garnishes have been stirred in and wilted from the heat of the noodles. The dish looks brown and homogenous.", action: "Add a fresh handful of raw sprouts and chives on top for visual and textural rescue." },
          { state: "Perfect",   description: "Noodles are glossy amber. Bean sprouts are cold and vibrantly white-green, standing apart from the noodles. Peanuts are visible golden chips. The lime is fresh and firm.", action: "Serve immediately while the noodles are hot and the sprouts are cold." },
          { state: "Overdone",  description: "Dish has sat too long — the sprouts have wilted into the noodles and everything has become uniform and soggy.", action: "Pad thai does not reheat well. Serve the moment it is plated." },
        ],
      },
      feelCue: "The finished plate should hit you with two distinct temperature zones — steaming hot noodles and cool, crunchy sprouts. When you squeeze the lime and it hisses faintly against the hot noodles, you know it is ready.",
    },
  ],
};
