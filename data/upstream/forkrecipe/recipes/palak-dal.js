export default {
  repoId: "master_indian_palak_dal_001",
  parentRepoId: null,
  slug: "palak-dal",
  author: "ForkRecipe Kitchen",

  title: "Palak Dal",
  description: "Toor dal cooked to a thick, golden-yellow soup, then folded with a puree of fresh spinach that colors it a deep forest green, finished with a mustard-seed, curry leaf, and asafoetida tadka that crackles and blooms across the surface like a spice-storm in miniature. Nutritionally dense and deeply comforting, this is the everyday dal that makes the subcontinent's protein work taste like a celebration.",
  cuisine: "Indian",
  culture: "South Indian",
  category: "grains",

  tags: ["dal", "lentils", "spinach", "south-indian", "vegetarian", "tadka", "mustard-seed"],
  difficulty: 2,
  activeTime: "30 min",
  totalTime: "1 hr 15 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 1, salty: 3, sour: 2, bitter: 2, umami: 3, heat: 3 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Toor dal (split pigeon peas), rinsed",          ratioValue: 1,    defaultUnit: "cup",    substitutions: ["masoor dal (red lentils)", "moong dal"] },
    { ingId: "ing_02", role: "Liquid",    name: "Water",                                           ratioValue: 3.5,  defaultUnit: "cups",   substitutions: [] },
    { ingId: "ing_03", role: "Spice",     name: "Ground turmeric",                                ratioValue: 0.5,  defaultUnit: "tsp",    substitutions: [] },
    { ingId: "ing_04", role: "Herb",      name: "Fresh spinach, washed, stems removed",            ratioValue: 200,  defaultUnit: "g",      substitutions: ["frozen spinach, thawed and squeezed dry"] },
    { ingId: "ing_05", role: "Fat",       name: "Ghee or coconut oil",                             ratioValue: 2,    defaultUnit: "tbsp",   substitutions: ["neutral oil"] },
    { ingId: "ing_06", role: "Aromatic",  name: "Mustard seeds (black)",                           ratioValue: 1,    defaultUnit: "tsp",    substitutions: [] },
    { ingId: "ing_07", role: "Aromatic",  name: "Cumin seeds",                                     ratioValue: 0.5,  defaultUnit: "tsp",    substitutions: [] },
    { ingId: "ing_08", role: "Aromatic",  name: "Fresh curry leaves (12–15 leaves)",              ratioValue: 12,   defaultUnit: "leaves", substitutions: [] },
    { ingId: "ing_09", role: "Spice",     name: "Asafoetida (hing), a small pinch",               ratioValue: 0.1,  defaultUnit: "tsp",    substitutions: [] },
    { ingId: "ing_10", role: "Allium",    name: "Garlic cloves, thinly sliced",                    ratioValue: 3,    defaultUnit: "cloves", substitutions: [] },
    { ingId: "ing_11", role: "Heat",      name: "Dried red chilies",                               ratioValue: 2,    defaultUnit: "whole",  substitutions: ["1/4 tsp red chili flakes"] },
    { ingId: "ing_12", role: "Seasoning", name: "Salt",                                             ratioValue: 1,   defaultUnit: "tsp",    substitutions: [] },
    { ingId: "ing_13", role: "Acid",      name: "Fresh lime juice",                                ratioValue: 1,   defaultUnit: "tbsp",   substitutions: ["tamarind water (1 tsp tamarind paste dissolved in 2 tbsp water)"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Simmer",
      inputs: ["ing_01", "ing_02", "ing_03"],
      outputState: "cooked_dal",
      instructions: "Combine the rinsed toor dal, water, and turmeric in a pressure cooker or saucepan. In a pressure cooker: seal and cook on high heat for 3–4 whistles, then let pressure release naturally for 10 minutes before opening. In an open pot: bring to a boil over high heat, skim the foam thoroughly, then reduce to a gentle simmer with the lid cracked, stirring every 10 minutes, for 40–50 minutes until fully soft. The dal is done when you can pinch a grain between your fingers and it crushes instantly with zero resistance. Use a wooden spoon or a whisk to stir vigorously until the dal is fairly smooth — you want the individual lentils to collapse into a unified golden porridge rather than sitting whole in a broth. Season with half the salt now. The base should be thicker than soup but looser than hummus.",
      visualCue: {
        primaryTarget: "A thick, uniform, turmeric-gold porridge with no whole lentils visible. A spoon dragged across the bottom should reveal a clean trail that fills in over 2–3 seconds.",
        spectrum: [
          { state: "Underdone", description: "Lentils hold their shape and the liquid is thin and separate. Pinching a grain reveals firm, chalky resistance.", action: "Continue cooking, adding water if needed. The lentils need more heat and steam to fully collapse." },
          { state: "Perfect",   description: "Thick and creamy, vivid gold, fully unified. Smells sweet and warm. Collapses from the spoon in slow, heavy ribbons.", action: "Whisk to smooth, season, and begin preparing the spinach." },
          { state: "Overdone",  description: "Very thick, beginning to stick, and scorching smell detectable. The dal has reduced too far.", action: "Add hot water in quarter-cup increments, stirring from the bottom. Reduce heat immediately." },
        ],
      },
      feelCue: "The finished dal should feel warm and heavy in the spoon — not watery, not solid, but something yielding and substantial between those two states. Rub a drop between thumb and forefinger: it should feel smooth, almost creamy.",
    },
    {
      nodeId: "step_2",
      action: "Blend",
      inputs: ["ing_04"],
      outputState: "spinach_puree",
      instructions: "Wilt the spinach directly in the hot dal by stirring it in and covering the pot for 3 minutes — the residual heat and steam will collapse the leaves completely without the step of blanching separately. Then use an immersion blender directly in the pot to partially blend the spinach into the dal, or transfer a third of the dal and all the wilted spinach to a countertop blender, blitz smooth, and return to the pot. The goal is a dal that has absorbed the spinach's deep green without losing all its body — you want a forest-green, thick soup with some residual texture from the lentils rather than a completely smooth puree. If the dal has thickened too much after adding spinach, loosen with a splash of hot water. Taste and add remaining salt.",
      visualCue: {
        primaryTarget: "A dark forest-green, thick soup where the lentil body is still faintly visible but the overall color and texture has been unified by the spinach. Neither bright green nor muddy — a deep, saturated intermediate.",
        spectrum: [
          { state: "Underdone", description: "Spinach is still in intact leaf form, sitting on top of the dal. The two have not integrated. Color is patchy green and gold.", action: "Stir to submerge the leaves and cover for 3 more minutes. Then blend." },
          { state: "Perfect",   description: "Unified dark green throughout. Thick, glossy, and fragrant. The dal's body gives it weight; the spinach gives it color and a pleasant bitterness.", action: "Proceed to the tadka." },
          { state: "Overdone",  description: "Blended too long into a completely smooth, featureless puree with no texture. The color is vivid but the body is gone.", action: "Stir in a tablespoon of cooked dal (kept aside) to reintroduce some texture. The flavor is unaffected." },
        ],
      },
      feelCue: "The palak dal at this stage smells green and earthy, like wet spinach and warm lentil — a high note and a low note in the same aroma. The texture when stirred should feel dense and cohesive, pulling back against the spoon.",
    },
    {
      nodeId: "step_3",
      action: "Heat",
      inputs: ["ing_05", "ing_06", "ing_07", "ing_08", "ing_09", "ing_10", "ing_11"],
      outputState: "south_indian_tadka",
      instructions: "Heat the ghee in a small pan over high heat until it is shimmering and a drop of water vaporizes on contact. Add the mustard seeds first — they will pop vigorously within 10–15 seconds. When the popping subsides, add the cumin seeds, dried red chilies, and asafoetida all at once. The asafoetida will bloom from a pungent, raw-smelling powder to a softer, garlic-onion aroma in seconds — this is the chemical transformation that makes hing such a fundamental flavoring. Add the curry leaves immediately after (stand back — fresh curry leaves in hot oil pop aggressively and spray hot fat). They will crackle and shrivel and release a powerful, citrus-adjacent, herbal fragrance unlike anything else in the spice world. Finally, add the sliced garlic and cook for 20–30 seconds until it turns pale gold. Pour the entire tadka immediately onto the surface of the palak dal — do not delay, as the tadka's temperatures and volatile aromatics are at their peak in the first 30 seconds.",
      visualCue: {
        primaryTarget: "Dark ghee with shriveled, dark-green curry leaves, pale gold garlic slices, puffed red chilies, and crackled cumin and mustard seeds. The fat should be nearly smoking and smelling powerfully of roasted aromatics.",
        spectrum: [
          { state: "Underdone", description: "Mustard seeds have not popped. Curry leaves are still flat and green. Garlic is translucent. The fat smells neutral.", action: "Wait — high heat is essential. South Indian tempering must be fast and fierce. Do not reduce the heat." },
          { state: "Perfect",   description: "Mustard seeds have popped quiet. Curry leaves are dark, shriveled, and crisp. Garlic is pale gold. Hing has transformed from sharp to mellow. The fat is fragrant and crackling.", action: "Pour immediately onto the dal." },
          { state: "Overdone",  description: "Garlic is dark brown and smells bitter. Curry leaves are black and brittle. Mustard seeds are charred.", action: "Discard and start fresh — burnt tadka is unrecoverable and will ruin the dish." },
        ],
      },
      feelCue: "The kitchen will fill with an almost shocking fragrance when the curry leaves hit the hot ghee — sharp, herbal, citrus-adjacent, and powerfully assertive. That fragrance should carry from the stovetop to the other side of the room instantly.",
    },
    {
      nodeId: "step_4",
      action: "Finish",
      inputs: ["spinach_puree", "south_indian_tadka", "ing_12", "ing_13"],
      outputState: "finished_palak_dal",
      instructions: "Pour the sizzling tadka over the surface of the palak dal and listen to the hiss. Fold it in gently with two or three sweeping strokes, leaving some of the tadka visible on the surface as a glistening, fragrant crown. Squeeze the lime juice over the top and stir once. The acid balances the bitterness of the spinach and the earthiness of the dal, and lifts the entire flavor profile without making it sour. Taste: the palak dal should be complex — earthy, savory, warmly spiced, with the distinctive pop and crackle of the south Indian tadka as the top note. Serve in deep bowls with steamed rice or roti. Thin with water when reheating — palak dal thickens considerably as it cools.",
      visualCue: {
        primaryTarget: "A deep forest-green, glossy bowl of dal with rivers of dark, fragrant ghee running across the surface, dotted with shriveled curry leaves, crisp garlic chips, and red chili fragments.",
        spectrum: [
          { state: "Underdone", description: "Tadka has been fully stirred in and is not visible on the surface. Lime juice has not been added. The dal tastes flat and one-dimensional.", action: "Squeeze the lime over the top. If the tadka was stirred in, drizzle a teaspoon of additional ghee over the top to restore some surface richness." },
          { state: "Perfect",   description: "Dark green and glossy, with the tadka's components visible on the surface and the lime's brightness cutting through the richness. The smell is layered, complex, and impossible to describe in fewer than four words.", action: "Serve immediately." },
          { state: "Overdone",  description: "The dal has become very thick and stodgy. The tadka has been absorbed and the surface is dull. The lime taste is lost in the richness.", action: "Thin with hot water to loosen. Drizzle with fresh ghee and an extra squeeze of lime to reintroduce brightness." },
        ],
      },
      feelCue: "The finished palak dal should radiate warmth from the bowl. The aroma reaches you before the spoon does — a layered, complex conversation between earthiness, green bitterness, and the sizzling perfume of the tadka.",
    },
  ],
};
