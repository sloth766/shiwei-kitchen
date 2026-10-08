export default {
  repoId: "master_italian_eggplant_parmigiana_001",
  parentRepoId: null,
  slug: "eggplant-parmigiana",
  author: "ForkRecipe Kitchen",

  title: "Eggplant Parmigiana",
  description: "The Neapolitan Sunday ritual: fat rounds of fried eggplant layered with a slow tomato sauce, torn basil, and fior di latte mozzarella, then baked until the layers meld into something greater than the sum of their parts — bronzed on top, yielding within.",
  cuisine: "Italian",
  culture: "Neapolitan",
  category: "vegetables",

  tags: ["vegetarian", "baked", "eggplant", "tomato", "mozzarella", "southern-italian"],
  difficulty: 3,
  activeTime: "1 hr 15 min",
  totalTime: "3 hrs",
  ratioSystem: "weight",

  stars: 0, forks: 0, contributors: 1, license: "CC-BY-SA",
  createdAt: "2026-06-27", updatedAt: "2026-06-27",

  flavorRadar: { sweet: 2, salty: 4, sour: 2, bitter: 2, umami: 4, heat: 1 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Large globe eggplants",                                         ratioValue: 1200, defaultUnit: "g", substitutions: ["Italian melanzane"] },
    { ingId: "ing_02", role: "Seasoning",  name: "Coarse salt (for drawing moisture from eggplant)",              ratioValue: 20,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_03", role: "Fat",        name: "Olive oil or sunflower oil, for shallow frying",                ratioValue: 300,  defaultUnit: "ml", substitutions: ["vegetable oil"] },
    { ingId: "ing_04", role: "Liquid",     name: "San Marzano tomatoes, hand-crushed (two 400 g tins)",           ratioValue: 800,  defaultUnit: "g", substitutions: ["ripe fresh plum tomatoes, peeled"] },
    { ingId: "ing_05", role: "Allium",     name: "Garlic cloves, lightly crushed",                                ratioValue: 15,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_06", role: "Fat",        name: "Extra-virgin olive oil, for the sauce",                         ratioValue: 40,   defaultUnit: "ml", substitutions: [] },
    { ingId: "ing_07", role: "Herb",       name: "Fresh basil leaves",                                            ratioValue: 20,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_08", role: "Seasoning",  name: "Fine salt and black pepper",                                    ratioValue: 8,    defaultUnit: "g", substitutions: [] },
    { ingId: "ing_09", role: "Protein",    name: "Fior di latte mozzarella, torn or sliced 5 mm thick",           ratioValue: 400,  defaultUnit: "g", substitutions: ["low-moisture mozzarella (less watery)"] },
    { ingId: "ing_10", role: "Umami",      name: "Parmigiano Reggiano, finely grated",                            ratioValue: 80,   defaultUnit: "g", substitutions: ["Pecorino Romano"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Salt",
      inputs: ["ing_01", "ing_02"],
      outputState: "salted_eggplant",
      instructions: "Slice the eggplants into 7–8 mm rounds. Layer them in a colander, salting each layer generously. Set a weighted plate on top and leave for 45–60 minutes. The salt will draw out the bitter, dark liquid that would otherwise make the eggplant oil-hungry during frying.",
      visualCue: {
        primaryTarget: "Eggplant slices in the colander",
        spectrum: [
          { state: "Underdone", description: "No liquid has pooled at the base of the colander. Slices still look turgid and bright.", action: "Wait longer — smaller, younger eggplant may need up to 90 minutes." },
          { state: "Perfect",   description: "Dark, slightly bitter liquid has pooled under the colander. Slices are visibly softened and slightly wrinkled, and have lost 15–20% of their volume.", action: "Rinse thoroughly, squeeze each slice gently between your palms, and pat bone-dry with kitchen paper." },
          { state: "Overdone",  description: "Slices have been salted for hours and are collapsing, with the texture of wet cloth.", action: "They can still be fried — handle gently. The flavour will be fine but texture softer." },
        ],
      },
      feelCue: "After patting dry, each slice should feel floppy but not slimy — soft leather rather than wet cloth. Any remaining surface moisture will spit violently in the frying oil.",
    },
    {
      nodeId: "step_2",
      action: "Simmer",
      inputs: ["ing_04", "ing_05", "ing_06", "ing_08"],
      outputState: "tomato_sauce",
      instructions: "Warm the extra-virgin olive oil and garlic in a wide pan over medium heat until the garlic turns pale gold and fragrant, about 3 minutes. Add the crushed tomatoes, a large pinch of salt, and simmer uncovered for 20–25 minutes, stirring occasionally, until the sauce has thickened and darkened to a deep scarlet. Remove the garlic. Tear in half the basil leaves.",
      visualCue: {
        primaryTarget: "Tomato sauce in the pan",
        spectrum: [
          { state: "Underdone", description: "Sauce is thin, bright red, and watery with a sharp, acidic raw-tomato smell.", action: "Continue simmering — the sauce needs to reduce by roughly one-third before it is ready." },
          { state: "Perfect",   description: "Sauce is thick enough to coat a spoon and hold a line drawn through it. Colour has deepened to a brick-red. Smell is sweet, rounded, and slightly caramelised.", action: "Remove garlic and add torn basil. Set aside." },
          { state: "Overdone",  description: "Sauce has reduced to a sticky paste that scorches at the edges. Very dark red, almost maroon.", action: "Add 50 ml of water and stir vigorously — the dish will still work, but be careful not to scorch it further." },
        ],
      },
      feelCue: "Dip a cold spoon into the sauce — it should coat the spoon evenly with no watery drips running off the back. The sauce should feel dense and jammy when you stir it.",
    },
    {
      nodeId: "step_3",
      action: "Fry",
      inputs: ["salted_eggplant", "ing_03"],
      outputState: "fried_eggplant",
      instructions: "Heat the frying oil in a deep wide pan to 175–180 C. Fry the eggplant rounds in batches, without crowding, for 2–3 minutes per side until deep golden-brown. Drain on a rack or kitchen paper. Do not stack them — they will steam each other and become soggy.",
      visualCue: {
        primaryTarget: "Eggplant slices in the frying oil",
        spectrum: [
          { state: "Underdone", description: "Rounds are pale gold and still slightly firm in the centre. They absorb oil visibly.", action: "Let them fry longer — under-fried eggplant releases its absorbed oil into the gratin during baking, making it greasy." },
          { state: "Perfect",   description: "Both sides are a deep mahogany-gold with slightly crisped edges. A slice pressed between your fingers gives easily — cooked through to the centre, with a creamy interior. Minimal oil on the drain rack.", action: "Drain immediately and continue frying in batches." },
          { state: "Overdone",  description: "Edges are dark brown verging on black. The interior has collapsed and is very soft.", action: "Still usable — burnt edges can be trimmed if very dark. The parmigiana will have a stronger, slightly bitter edge." },
        ],
      },
      feelCue: "A perfectly fried eggplant round feels almost weightless for its size — the moisture has left and the oil has not flooded in to replace it. Press the centre: it yields like soft butter.",
    },
    {
      nodeId: "step_4",
      action: "Assemble",
      inputs: ["fried_eggplant", "tomato_sauce", "ing_09", "ing_10", "ing_07"],
      outputState: "assembled_parmigiana",
      instructions: "Preheat the oven to 180 C (355 F). Spread a thin layer of tomato sauce on the base of a deep baking dish. Add a layer of fried eggplant slices, slightly overlapping. Scatter torn mozzarella, a few basil leaves, and a dusting of Parmigiano. Repeat the layers — sauce, eggplant, mozzarella, basil, Parmigiano — until all ingredients are used, finishing with a layer of sauce and a generous snowing of Parmigiano on top.",
      visualCue: {
        primaryTarget: "Layered baking dish before baking",
        spectrum: [
          { state: "Underdone", description: "Layers are too thick — each layer of eggplant is two or three slices deep, preventing heat from penetrating the centre.", action: "Reconstruct with thinner, more numerous layers. More layers with less in each one is always better." },
          { state: "Perfect",   description: "A neat, compact stack of 4–6 layers. Mozzarella and sauce visible between each layer. Top is evenly covered with sauce and Parmigiano. The dish is full to the rim.", action: "Bake uncovered." },
          { state: "Overdone",  description: "The mozzarella has been distributed so heavily between layers that the dish is mostly cheese with eggplant inserts.", action: "Remove some mozzarella from between the middle layers — too much cheese makes the dish heavy and greasy." },
        ],
      },
      feelCue: "Assembled, the dish should feel very heavy — dense and compact. If it feels loose and jiggly, the layers are not tight enough.",
    },
    {
      nodeId: "step_5",
      action: "Bake",
      inputs: ["assembled_parmigiana"],
      outputState: "finished_parmigiana",
      instructions: "Bake uncovered at 180 C (355 F) for 35–45 minutes until the top is deeply bronzed and the mozzarella around the edges is visibly bubbling. Rest for at least 20 minutes before serving — a freshly cut parmigiana will collapse; a rested one will slice cleanly.",
      visualCue: {
        primaryTarget: "Top of the parmigiana in the oven",
        spectrum: [
          { state: "Underdone", description: "Top is pale and the mozzarella has melted but not coloured. Sauce at the edges is barely bubbling.", action: "Return to the oven. The Parmigiano on top should caramelise — increase heat to 200 C for the final 5 minutes if needed." },
          { state: "Perfect",   description: "Top is a dark amber-gold. Edges show a rim of caramelised, almost lacquered tomato and cheese. The dish is visibly set — not moving when the rack is nudged. Smells of concentrated tomato and toasted cheese.", action: "Rest 20 minutes before cutting. It will hold its shape in the serving." },
          { state: "Overdone",  description: "The top Parmigiano has burnt to black crust. Edges are very dark.", action: "Carefully remove the burnt crust layer with a spatula. The layers beneath are likely perfect." },
        ],
      },
      feelCue: "After resting, run a knife through the centre and feel the resistance — it should cut cleanly, like a lasagne, with each layer distinct. If it slides apart, rest it longer.",
    },
  ],
};
