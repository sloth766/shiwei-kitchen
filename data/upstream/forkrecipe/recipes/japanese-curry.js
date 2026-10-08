export default {
  repoId: "master_japanese_japanese_curry_001",
  parentRepoId: null,
  slug: "japanese-curry",
  author: "ForkRecipe Kitchen",

  title: "Japanese Curry",
  description: "The most comforting dish in the Japanese home kitchen: golden-brown chicken and sweet potato disappearing into a glossy, deeply spiced sauce that straddles the line between curry and gravy — warming, mildly sweet, and built for bowls of short-grain rice on cold evenings.",
  cuisine: "Japanese",
  culture: "Japanese Yōshoku",
  category: "proteins",

  tags: ["japanese", "curry", "comfort-food", "mild"],
  difficulty: 2,
  activeTime: "30 min",
  totalTime: "1 hr",
  ratioSystem: "parts",

  stars: 2178,
  forks: 223,
  contributors: 26,
  license: "CC-BY-SA",
  createdAt: "2024-10-05",
  updatedAt: "2025-06-18",

  flavorRadar: { sweet: 2, salty: 3, sour: 0, bitter: 1, umami: 3, heat: 2 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Chicken thigh, bone-in or boneless (cut into large chunks)", ratioValue: 100, defaultUnit: "parts", substitutions: ["beef chuck", "pork shoulder", "firm tofu (vegan)"] },
    { ingId: "ing_02", role: "Allium",    name: "Onion (large, roughly diced)",                                ratioValue: 50,  defaultUnit: "parts", substitutions: ["shallots"] },
    { ingId: "ing_03", role: "Structure", name: "Potato or sweet potato (large chunks)",                      ratioValue: 40,  defaultUnit: "parts", substitutions: ["kabocha squash", "carrot + potato"] },
    { ingId: "ing_04", role: "Structure", name: "Carrot (large chunks)",                                       ratioValue: 20,  defaultUnit: "parts", substitutions: ["parsnip"] },
    { ingId: "ing_05", role: "Spice",     name: "Japanese curry roux blocks (S&B Golden Curry or similar)",   ratioValue: 12,  defaultUnit: "parts", substitutions: ["homemade roux: 2 tbsp butter + 2 tbsp flour + 2 tsp curry powder"] },
    { ingId: "ing_06", role: "Liquid",    name: "Water or chicken stock",                                      ratioValue: 120, defaultUnit: "parts", substitutions: ["dashi"] },
    { ingId: "ing_07", role: "Fat",       name: "Neutral oil",                                                 ratioValue: 5,   defaultUnit: "parts", substitutions: ["butter (richer)"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Sear",
      inputs: ["ing_01", "ing_07"],
      outputState: "seared_chicken",
      instructions: "Heat oil in a large heavy pot or Dutch oven over medium-high heat. Pat chicken dry with paper towels and season generously with salt and pepper. Sear in a single layer, skin-side down if bone-in, for 3-4 minutes without moving until golden-brown. Flip and sear the other side for 2 minutes. Remove and set aside — chicken will not be cooked through at this point. The fond left in the pot is flavor gold.",
      visualCue: {
        primaryTarget: "Chicken pieces are golden-brown on both seared sides with some charred edges. The pot bottom has a layer of brown fond.",
        spectrum: [
          { state: "Underdone", description: "Chicken is pale yellow-white. No browning has occurred. Fond is minimal or absent.", action: "Increase heat and wait. The sear is contributing depth of flavor to the entire curry, not just the chicken." },
          { state: "Perfect",   description: "Deep golden-brown on the seared faces, with aromatic fond coating the pot bottom. Smells like roasted chicken.", action: "Remove chicken and proceed to the onions immediately before the fond burns." },
          { state: "Overdone",  description: "Chicken skin is very dark and the fond has turned black and smells bitter.", action: "Deglaze immediately with a splash of water, scraping up what you can. Discard any fully burnt black pieces of fond." },
        ],
      },
      feelCue: "The chicken should release cleanly from the pan when it is ready to flip — if it resists and tears, the sear is not complete and will leave the crust behind.",
    },
    {
      nodeId: "step_2",
      action: "Caramelize",
      inputs: ["ing_02"],
      outputState: "caramelized_onion",
      instructions: "Reduce heat to medium. Add onions to the same pot with the chicken fond. Cook, stirring regularly, for 12-15 minutes until the onions are deeply golden-brown and have reduced dramatically in volume. This extended caramelization of the onion is the secret to a rich, sweet Japanese curry base. Do not rush this step — pale, underdone onions produce a sharp, raw flavor that does not mellow in the sauce.",
      visualCue: {
        primaryTarget: "Onions have reduced to about one-third their original volume. Color is deep golden-brown, almost amber. No white or pale pieces remaining.",
        spectrum: [
          { state: "Underdone", description: "Onions are still pale and have only softened slightly. Volume is almost unchanged from raw. Flavor is sharp and raw.", action: "Continue cooking. Turn down heat to prevent burning and stir more frequently. Patience here is repaid in the final dish." },
          { state: "Perfect",   description: "Deeply amber, jammy, sweet-smelling. Onions stick slightly to the pot. When you drag a spoon through them, they flow back slowly.", action: "Add potato and carrot, stir to coat in the onion, and proceed." },
          { state: "Overdone",  description: "Onions are dark brown to black and smell bitter. They have stuck firmly to the pot.", action: "Deglaze with a small splash of water, scraping up the fond. The slightly bitter notes may add complexity or may be too much depending on how dark." },
        ],
      },
      feelCue: "The kitchen should smell of sweet, toasted onion — that caramel-savory aroma signals the Maillard reaction has run its course and the sugars are fully developed.",
    },
    {
      nodeId: "step_3",
      action: "Simmer",
      inputs: ["caramelized_onion", "ing_03", "ing_04", "ing_06", "seared_chicken"],
      outputState: "cooked_stew",
      instructions: "Add potato/sweet potato and carrot to the pot. Stir to coat in the caramelized onion. Return the seared chicken. Pour in water or stock, enough to just cover. Bring to a boil, then reduce to a gentle simmer. Skim any foam that rises. Simmer uncovered for 20-25 minutes until potatoes and carrots are completely tender when pierced with a skewer, and the chicken is cooked through. If using bone-in chicken, the meat should begin to pull away from the bone.",
      visualCue: {
        primaryTarget: "Vegetables are completely tender. Skewer inserts without resistance. Broth is lightly golden and has reduced by about a quarter from the boiling level.",
        spectrum: [
          { state: "Underdone", description: "Skewer meets resistance in the center of the potato. Broth is still very thin and pale. Chicken may still be pink inside.", action: "Continue simmering for 5-10 more minutes and re-test. Potato starch needs full gelatinization before adding roux." },
          { state: "Perfect",   description: "Everything is tender. Broth has a slight body from the potato starch leaching into it. Chicken is cooked through.", action: "Remove from heat before adding curry roux." },
          { state: "Overdone",  description: "Potatoes are beginning to fall apart and dissolve into the broth. Chicken is drying out.", action: "Add roux immediately. The dissolved potato will actually thicken the sauce more, which you need to account for." },
        ],
      },
      feelCue: "Dip a spoon into the broth and feel it between your fingers when cool — it should feel slightly slippery from the dissolved starch, not watery like plain water.",
    },
    {
      nodeId: "step_4",
      action: "Finish",
      inputs: ["cooked_stew", "ing_05"],
      outputState: "finished_japanese_curry",
      instructions: "Break the curry roux blocks into the pot, distributing them evenly. Stir gently over low heat until the blocks have completely dissolved — about 3-5 minutes. Return to a very gentle simmer, stirring frequently, for 5 more minutes as the starch in the roux thickens the sauce. The curry should be glossy and coat a spoon thickly. Taste and adjust with a little extra soy sauce for saltiness, or grated apple for sweetness. Serve over short-grain white rice with fukujinzuke pickles and tonkatsu sauce on the side.",
      visualCue: {
        primaryTarget: "Curry is thick, glossy, and uniform in color — a deep amber-brown with no visible lumps of roux remaining. It falls from a ladle in a thick, slow stream.",
        spectrum: [
          { state: "Underdone", description: "Sauce is thin and watery. Pieces of undissolved roux are still visible. Curry smells raw and spicy rather than cooked and rounded.", action: "Keep stirring over low heat. Roux lumps need full heat and stirring to dissolve completely." },
          { state: "Perfect",   description: "Thick, glossy, uniformly amber-brown. Sauce coats the back of a spoon and the line you draw with your finger through it stays clean. Smells of spice, sweetness, and meat.", action: "Serve immediately over rice, or rest for 5 minutes — the flavor improves as it sits." },
          { state: "Overdone",  description: "Curry is very thick and begins to stick to the pot bottom. When stirred, it moves as a single mass rather than a flowing sauce.", action: "Add hot water or stock, 2 tablespoons at a time, and stir to loosen to the correct consistency." },
        ],
      },
      feelCue: "Japanese curry should have a faintly tacky, almost velvety texture on your tongue — thicker than a broth, thinner than a gravy, with a lingering warmth that builds slowly rather than hitting immediately.",
    },
  ],
};
