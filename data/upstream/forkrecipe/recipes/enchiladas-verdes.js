export default {
  repoId: "master_mexican_enchiladas_verdes_001",
  parentRepoId: null,
  slug: "enchiladas-verdes",
  author: "ForkRecipe Kitchen",

  title: "Enchiladas Verdes",
  description: "Corn tortillas, briefly fried and pulled through a bright, tangy tomatillo sauce, encase a filling of shredded chicken and emerge from the oven under a blanket of crema and queso fresco that softens the fire of the green chile.",
  cuisine: "Mexican",
  culture: "Mexican",
  category: "proteins",

  tags: ["mexican", "chicken", "tomatillo", "enchiladas", "baked"],
  difficulty: 2,
  activeTime: "40 min",
  totalTime: "1 hr",
  ratioSystem: "parts",

  stars: 2104,
  forks: 248,
  contributors: 22,
  license: "CC-BY-SA",
  createdAt: "2024-08-17",
  updatedAt: "2025-07-30",

  flavorRadar: { sweet: 1, salty: 3, sour: 2, bitter: 1, umami: 3, heat: 2 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Bone-in chicken breast or thigh",                  ratioValue: 100, defaultUnit: "parts", substitutions: ["rotisserie chicken", "shredded pork"] },
    { ingId: "ing_02", role: "Acid",      name: "Tomatillos (husked and rinsed)",                   ratioValue: 80,  defaultUnit: "parts", substitutions: ["canned tomatillos"] },
    { ingId: "ing_03", role: "Heat",      name: "Serrano chiles (stemmed, whole)",                  ratioValue: 8,   defaultUnit: "parts", substitutions: ["jalapeños (milder)", "habanero (hotter)"] },
    { ingId: "ing_04", role: "Allium",    name: "White onion (quartered)",                          ratioValue: 20,  defaultUnit: "parts", substitutions: ["yellow onion"] },
    { ingId: "ing_05", role: "Herb",      name: "Fresh cilantro (stems and leaves)",                ratioValue: 5,   defaultUnit: "parts", substitutions: ["flat-leaf parsley (milder)"] },
    { ingId: "ing_06", role: "Starch",    name: "Corn tortillas (15cm diameter)",                   ratioValue: 60,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Dairy",     name: "Mexican crema or sour cream",                      ratioValue: 15,  defaultUnit: "parts", substitutions: ["crème fraîche"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Simmer",
      inputs: ["ing_01", "ing_04"],
      outputState: "poached_chicken",
      instructions: "Place chicken pieces in a pot with half the onion, a pinch of salt, and enough cold water to cover by 3cm. Bring to a gentle simmer over medium heat — never a rolling boil, which toughens the meat. Skim any foam that rises. Cook for 20-25 minutes until the chicken is just cooked through. Remove and let cool enough to handle, then shred into long, fine strands. Reserve the poaching liquid.",
      visualCue: {
        primaryTarget: "The chicken is white throughout with no pink near the bone. The poaching liquid is a pale gold, clear with just a gentle simmer — never aggressive bubbles.",
        spectrum: [
          { state: "Underdone", description: "Pink or translucent meat near the bone. Internal temperature below 74°C.", action: "Return to the liquid and continue simmering for 5 more minutes." },
          { state: "Perfect",   description: "Uniformly white, moist meat that shreds into long silky strands with two forks. Clear juices run when pressed.", action: "Remove and shred while still warm — hot chicken shreds far more easily." },
          { state: "Overdone",  description: "Dry, mealy chicken that crumbles rather than shreds. The poaching liquid is cloudy.", action: "Proceed — toss the shredded chicken with a spoon of the poaching liquid to remoisten." },
        ],
      },
      feelCue: "Properly poached chicken gives with almost no resistance when you pull it apart with two forks — the strands separate in long, clean ribbons without tearing.",
    },
    {
      nodeId: "step_2",
      action: "Roast",
      inputs: ["ing_02", "ing_03", "ing_04"],
      outputState: "roasted_verde",
      instructions: "Place tomatillos, serrano chiles, and the remaining onion quarters on a foil-lined baking sheet. Broil 15cm under the broiler for 8-10 minutes, turning once, until the tomatillos are blistered and charred in spots. The skins will split and release their juices. Alternatively, char directly over a gas flame with tongs. The charring is essential — it tempers the raw tartness and adds smokiness.",
      visualCue: {
        primaryTarget: "Tomatillos are softened and collapsed, their skins split and blackened in patches. The chiles are charred all over. The juices on the baking sheet are caramelized.",
        spectrum: [
          { state: "Underdone", description: "Tomatillos are warm but firm, only lightly browned. Skins are intact. The sauce will taste raw and harshly acidic.", action: "Continue under the broiler. The char is not optional — it creates depth." },
          { state: "Perfect",   description: "Tomatillos are soft, blistered, and collapsed, with blackened patches on the skins. Serranos are fully charred.", action: "Let cool slightly then transfer everything to the blender, including the collected juices." },
          { state: "Overdone",  description: "Tomatillos have completely disintegrated into a liquid on the pan and the skins are uniformly black.", action: "Transfer carefully. The flavor will be quite smoky — add an extra raw tomatillo to brighten." },
        ],
      },
      feelCue: "A properly roasted tomatillo should feel like a water balloon about to pop when pressed with the back of a spoon — the flesh has softened fully beneath the charred skin.",
    },
    {
      nodeId: "step_3",
      action: "Blend",
      inputs: ["roasted_verde", "ing_05"],
      outputState: "salsa_verde",
      instructions: "Transfer the roasted tomatillos, chiles, onion, and all their juices to a blender. Add the fresh cilantro and 100ml of the reserved chicken poaching liquid. Blend on high for 60 seconds until smooth. Taste: it should be bright, tangy, smoky, and mildly spicy. Adjust salt. The sauce will be thin — this is correct; it will thicken in the oven.",
      visualCue: {
        primaryTarget: "A vivid, opaque olive-green sauce with a slightly frothy surface from blending. It pours easily from the blender and smells intensely of tomatillo and char.",
        spectrum: [
          { state: "Underdone", description: "The sauce has visible chunks of tomatillo skin and chile flesh. The color is uneven.", action: "Blend for another 60 seconds. This sauce needs to be smooth to dip tortillas evenly." },
          { state: "Perfect",   description: "Uniformly olive-green and smooth. Pours with the consistency of thin cream. Bright, complex aroma.", action: "Transfer to a wide shallow bowl for dipping tortillas." },
          { state: "Overdone",  description: "Over-blended sauce is very frothy, almost milky in color, and warm from friction.", action: "Proceed. The foam will settle and the flavor is uncompromised." },
        ],
      },
      feelCue: "Run a finger along the inside of the blender jar — the sauce should coat it uniformly with no rough patches or watery separations.",
    },
    {
      nodeId: "step_4",
      action: "Assemble",
      inputs: ["salsa_verde", "poached_chicken", "ing_06", "ing_07"],
      outputState: "enchiladas_verdes",
      instructions: "Preheat oven to 190°C. Briefly fry each corn tortilla in 1cm of hot oil for 5-10 seconds per side until softened and pliable (not crispy). Drain on paper towels. Dip each tortilla in the salsa verde to coat both sides. Place 40g of shredded chicken in the center, roll firmly, and place seam-side down in a baking dish. Pour remaining salsa verde over the top. Bake for 15 minutes until the sauce is bubbling. Drizzle with crema and crumble queso fresco over the top before serving.",
      visualCue: {
        primaryTarget: "Enchiladas are snugly packed in the dish, uniformly sauced, and emerging from the oven with bubbling edges and lightly golden spots where the sauce has caramelized.",
        spectrum: [
          { state: "Underdone", description: "The sauce on top is still liquid and the enchiladas look pale and unset. The tortillas may still shift when the dish is moved.", action: "Return to the oven for another 5-8 minutes until the edges are visibly bubbling." },
          { state: "Perfect",   description: "A unified casserole — tortillas have melded with the sauce, edges are bubbling and slightly caramelized, filling is hot throughout.", action: "Add crema and queso fresco immediately and serve at the table." },
          { state: "Overdone",  description: "Sauce has reduced to a sticky paste on the pan edges. Tortillas are beginning to disintegrate.", action: "Remove immediately and serve. Add a spoon of fresh salsa verde over the top to restore moisture." },
        ],
      },
      feelCue: "The finished dish should smell like toasted corn, tangy tomatillo, and the gentle funk of melted cheese — a complete, rounded aroma, not sharp or raw.",
    },
  ],
};
