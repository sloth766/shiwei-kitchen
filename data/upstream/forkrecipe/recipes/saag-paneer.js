export default {
  repoId: "master_indian_saag_paneer_001",
  parentRepoId: null,
  slug: "saag-paneer",
  author: "ForkRecipe Kitchen",

  title: "Saag Paneer",
  description: "Blanched spinach blended into a velvet-dark puree, simmered with ginger, garlic, and a bloom of whole spices until it becomes a rich, deeply savory sauce, then folded with golden-edged cubes of fresh paneer that hold their form against the silky green. The finished dish tastes like the forest floor and the hearth at the same time.",
  cuisine: "Indian",
  culture: "Punjabi",
  category: "vegetables",

  tags: ["spinach", "paneer", "vegetarian", "punjabi", "curry", "greens"],
  difficulty: 2,
  activeTime: "35 min",
  totalTime: "50 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 1, salty: 3, sour: 1, bitter: 2, umami: 3, heat: 3 },

  ingredients: [
    { ingId: "ing_01", role: "Herb",      name: "Fresh spinach (palak), washed, tough stems removed", ratioValue: 500, defaultUnit: "g",    substitutions: ["mustard greens (sarson) for a more bitter profile", "frozen spinach (thawed and squeezed)"] },
    { ingId: "ing_02", role: "Protein",   name: "Paneer, cut into 2 cm cubes",                        ratioValue: 250, defaultUnit: "g",    substitutions: ["firm tofu", "halloumi"] },
    { ingId: "ing_03", role: "Fat",       name: "Ghee or neutral oil",                                ratioValue: 3,   defaultUnit: "tbsp", substitutions: [] },
    { ingId: "ing_04", role: "Aromatic",  name: "Cumin seeds",                                         ratioValue: 1,   defaultUnit: "tsp",  substitutions: [] },
    { ingId: "ing_05", role: "Allium",    name: "Yellow onion, finely chopped",                        ratioValue: 1,   defaultUnit: "medium", substitutions: [] },
    { ingId: "ing_06", role: "Allium",    name: "Garlic cloves, minced",                               ratioValue: 4,   defaultUnit: "cloves", substitutions: [] },
    { ingId: "ing_07", role: "Aromatic",  name: "Fresh ginger, grated (1-inch piece)",                 ratioValue: 1,   defaultUnit: "tbsp", substitutions: [] },
    { ingId: "ing_08", role: "Spice",     name: "Ground coriander",                                    ratioValue: 1,   defaultUnit: "tsp",  substitutions: [] },
    { ingId: "ing_09", role: "Spice",     name: "Ground cumin",                                        ratioValue: 0.5, defaultUnit: "tsp",  substitutions: [] },
    { ingId: "ing_10", role: "Spice",     name: "Kashmiri red chili powder",                           ratioValue: 0.5, defaultUnit: "tsp",  substitutions: ["cayenne (use half the amount)"] },
    { ingId: "ing_11", role: "Spice",     name: "Ground turmeric",                                     ratioValue: 0.25, defaultUnit: "tsp", substitutions: [] },
    { ingId: "ing_12", role: "Spice",     name: "Garam masala",                                        ratioValue: 0.5, defaultUnit: "tsp",  substitutions: [] },
    { ingId: "ing_13", role: "Dairy",     name: "Heavy cream or full-fat yogurt",                      ratioValue: 3,   defaultUnit: "tbsp", substitutions: ["coconut cream"] },
    { ingId: "ing_14", role: "Seasoning", name: "Salt",                                                ratioValue: 1,   defaultUnit: "tsp",  substitutions: [] },
    { ingId: "ing_15", role: "Liquid",    name: "Water (for blanching)",                               ratioValue: 2,   defaultUnit: "L",    substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Blanch",
      inputs: ["ing_01", "ing_15"],
      outputState: "blanched_spinach",
      instructions: "Bring a large pot of unsalted water to a fierce rolling boil. Add all the spinach at once — it will seem like an enormous volume, but it collapses dramatically. Push the spinach below the surface and cook for exactly 2 minutes: no more, or it will lose its vivid green color and turn a muddy army-green. Immediately drain and plunge into a bowl of ice-cold water, holding for 1 full minute to arrest all cooking. Lift the spinach from the cold water and squeeze firmly with both hands to remove as much liquid as possible — excess water will thin the final sauce. Transfer to a blender and blitz until completely smooth, about 2 minutes, adding just 2–3 tablespoons of the blanching water if the blade struggles. The puree should be electric green and pourable.",
      visualCue: {
        primaryTarget: "A brilliantly vivid, almost neon-green spinach puree with no visible fiber. The color should resemble fresh grass rather than dried herbs.",
        spectrum: [
          { state: "Underdone", description: "The puree is still fibrous and chunky. The blender has left stringy bits. Color is good but texture is coarse.", action: "Continue blending on high. Add water one tablespoon at a time to get the blades moving." },
          { state: "Perfect",   description: "Silk-smooth, electric green, pours in a steady ribbon. Smells grassy and fresh, almost sweet.", action: "Set aside and begin the masala base." },
          { state: "Overdone",  description: "The spinach was not immediately shocked in cold water and has turned from bright green to a dull, gray-green. The oxidized color is permanent.", action: "Proceed — the flavor is unaffected. A pinch of baking soda in the pot next time will help preserve color." },
        ],
      },
      feelCue: "After squeezing, the spinach ball should feel almost dry between your palms — if water runs freely through your fingers, keep squeezing. The kitchen smells of hot, fresh vegetables, clean and slightly mineral.",
    },
    {
      nodeId: "step_2",
      action: "Sauté",
      inputs: ["ing_03", "ing_04", "ing_05", "ing_06", "ing_07", "ing_08", "ing_09", "ing_10", "ing_11"],
      outputState: "masala_base",
      instructions: "Heat the ghee in a wide, heavy pan over medium-high heat. When it shimmers, add the cumin seeds and let them crackle and darken for 20 seconds. Add the onion and cook, stirring frequently, for 10–12 minutes until it is deeply golden and caramelized at the edges — do not rush this step; the sweetness of properly browned onion forms the flavor backbone of the entire dish. Add the garlic and ginger and cook for 2 more minutes until the raw smell vanishes and the mixture turns a pale golden paste. Add the ground coriander, cumin, chili powder, and turmeric; stir constantly for 90 seconds, toasting the ground spices in the fat without letting them scorch. The masala is ready when the fat separates visibly around the edges of the spice mixture — an old cook's signal called 'bhunoing' that the rawness has been driven off.",
      visualCue: {
        primaryTarget: "A deep amber paste of onion, ginger, and garlic with a ring of clear golden ghee separating from the solid spice mass around the pan edges.",
        spectrum: [
          { state: "Underdone", description: "Onions are translucent and pale, barely softened. No separation of fat yet. The spice smell is sharp and raw, like powdered seasoning rather than cooked depth.", action: "Lower the heat and continue cooking. Rushing the onion is the most common mistake in Indian cooking." },
          { state: "Perfect",   description: "Onions are a deep tawny gold, almost jammy. Fat pools visibly around the edges. The smell is mellow, toasty, and deeply savory — nothing raw or harsh.", action: "Add the spinach puree." },
          { state: "Overdone",  description: "Onions are dark brown and bitter. Spices are beginning to smoke and smell acrid. The mass is sticking to the pan.", action: "Deglaze with a tablespoon of water to arrest the browning. The bitterness will be partly masked by the spinach, but use a more gentle heat next time." },
        ],
      },
      feelCue: "Press a wooden spoon into the onion mass — it should yield without resistance, like pressing through soft clay. The aroma transitions from sharp and onion-forward to sweet, toasty, and complex as the caramelization progresses.",
    },
    {
      nodeId: "step_3",
      action: "Simmer",
      inputs: ["masala_base", "blanched_spinach", "ing_14", "ing_12", "ing_13"],
      outputState: "saag_sauce",
      instructions: "Pour the spinach puree into the hot masala base — it will sputter and steam dramatically. Stir to combine thoroughly and reduce the heat to medium-low. Simmer uncovered for 8–10 minutes, stirring occasionally, until the saag has darkened slightly from its electric green to a richer forest green and has thickened to the consistency of a pourable sauce. Season with salt. Stir in the garam masala and swirl in the cream or yogurt — the dairy tempers the sharpness and adds body. If using yogurt, lower the heat to minimum before adding to prevent curdling. The sauce should now taste fully seasoned, warmly spiced, and rich without heaviness.",
      visualCue: {
        primaryTarget: "A thick, dark forest-green sauce that coats the back of a spoon and holds its shape when you drag a finger through it. Small pools of ghee are visible on the surface.",
        spectrum: [
          { state: "Underdone", description: "Sauce is still very thin and pale green, with the raw spinach and masala not yet integrated. The flavor is flat and vegetal.", action: "Continue simmering — the integration takes time. The color should deepen visibly over 5 minutes of cooking." },
          { state: "Perfect",   description: "Thick, glossy, and deeply flavored. Coats the spoon in a velvety layer. The color is a rich, saturated forest green with golden ghee flecks.", action: "Add the paneer." },
          { state: "Overdone",  description: "Sauce has reduced to a very thick paste and is spitting. The color has gone toward a muddy brown-green.", action: "Add hot water 2 tablespoons at a time until the sauce loosens to a pourable consistency. Taste for salt." },
        ],
      },
      feelCue: "The sauce should smell layered and complex — green and grassy from the spinach, toasty from the spices, sweet from the cream. It should cling to a spoon in a sheet, not drip like water.",
    },
    {
      nodeId: "step_4",
      action: "Sear",
      inputs: ["ing_02", "ing_03"],
      outputState: "golden_paneer",
      instructions: "In a separate small pan, heat 1 tablespoon of ghee over medium-high heat. Add the paneer cubes in a single layer — they should sizzle immediately on contact with the fat. Let them sit undisturbed for 90 seconds until the bottom face is golden, then flip each cube and repeat on the adjacent side. You are only browning the surface — the interior of paneer does not need cooking, only the exterior needs color and a slight crust to help it hold its shape in the sauce. Work in batches if your pan is small. Drain on a paper towel.",
      visualCue: {
        primaryTarget: "Paneer cubes with at least two golden-brown faces. The crust should be visibly set and slightly darker than the white interior.",
        spectrum: [
          { state: "Underdone", description: "Paneer is still pure white on all faces, soft, and breaking apart when moved. Has not developed any color.", action: "Increase heat. Paneer must be dry (pat it with paper towel) for the surface to brown rather than steam." },
          { state: "Perfect",   description: "Two or three faces have a golden, slightly crisp crust. The interior is still white and firm. Cubes hold their shape when nudged.", action: "Add to the saag sauce immediately — add them off the heat if the sauce is very hot to prevent breaking." },
          { state: "Overdone",  description: "Paneer is deeply brown and has become rubbery and tough. The crust is hard.", action: "Add the paneer to the sauce now and let it simmer for 5 minutes — the moisture will rehydrate the surface slightly." },
        ],
      },
      feelCue: "A well-seared paneer cube feels firm and springy when pressed, not soft and collapsing. The surface has a faint give, like pressing a firm rubber eraser, and the kitchen smells of browned dairy — warm, slightly sweet, nutty.",
    },
    {
      nodeId: "step_5",
      action: "Finish",
      inputs: ["saag_sauce", "golden_paneer"],
      outputState: "finished_saag_paneer",
      instructions: "Gently fold the golden paneer cubes into the hot saag sauce, being careful not to break the cubes. Turn the heat to low and let the paneer warm through in the sauce for 3–4 minutes — this allows the cheese to absorb the spiced sauce at the surface while remaining firm at the center. Do not boil the sauce after adding paneer, as high heat will make it rubbery. Taste the final dish for salt. Serve with a final swirl of cream or a small knob of butter over the top, accompanied by hot naan, paratha, or steamed basmati.",
      visualCue: {
        primaryTarget: "Ivory-gold paneer cubes cradled in a velvety, dark-green sauce. Each cube retains its shape and has a distinct golden crust visible where it was seared. The sauce coats every cube without drowning them.",
        spectrum: [
          { state: "Underdone", description: "Paneer cubes are still cold in the center and haven't absorbed any of the sauce's color or flavor. The dish looks assembled rather than cohesive.", action: "Continue on low heat for 3–4 more minutes. Cover with a lid to trap steam and gently warm the cheese through." },
          { state: "Perfect",   description: "Paneer is heated through, the exterior has taken on a faint green tint where the sauce has been absorbed, and each cube is structurally intact. Sauce and cheese are unified on the spoon.", action: "Serve immediately, before the cheese tightens." },
          { state: "Overdone",  description: "Paneer has become rubbery from prolonged heat. Cubes are shrinking and weeping liquid into the sauce, thinning it.", action: "Remove from heat immediately. The dish is still good — serve promptly before the cheese tightens further." },
        ],
      },
      feelCue: "Stir the finished saag paneer with a spoon — it should move as a unified, glossy, thick sauce, and each paneer cube should remain whole as the spoon passes around it. The smell is deeply savory, green, and warming.",
    },
  ],
};
