export default {
  repoId: "master_thai_green_papaya_salad_001",
  parentRepoId: null,
  slug: "green-papaya-salad",
  author: "ForkRecipe Kitchen",

  title: "Som Tam (Green Papaya Salad)",
  description: "Pounded and bruised in a clay mortar, shredded green papaya transforms into a vivid, dripping tangle where every strand carries sour lime, salty fish sauce, and enough chili heat to turn the tips of your ears red.",
  cuisine: "Thai",
  culture: "Isan Thai",
  category: "vegetables",

  tags: ["thai", "salad", "papaya", "vegan", "spicy"],
  difficulty: 1,
  activeTime: "15 min",
  totalTime: "15 min",
  ratioSystem: "parts",

  stars: 1924,
  forks: 221,
  contributors: 30,
  license: "CC-BY-SA",
  createdAt: "2024-07-03",
  updatedAt: "2025-05-18",

  flavorRadar: { sweet: 2, salty: 3, sour: 4, bitter: 0, umami: 2, heat: 4 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Green (unripe) papaya, peeled and shredded into matchsticks", ratioValue: 100, defaultUnit: "parts", substitutions: ["green mango", "kohlrabi", "jicama"] },
    { ingId: "ing_02", role: "Heat",       name: "Thai bird's eye chilies (2-5, adjust to tolerance)",          ratioValue: 3,   defaultUnit: "parts", substitutions: ["serrano chilies"] },
    { ingId: "ing_03", role: "Allium",     name: "Garlic cloves",                                               ratioValue: 4,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Acid",       name: "Fresh lime juice (from 2-3 limes)",                          ratioValue: 15,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Seasoning",  name: "Fish sauce (or soy sauce for vegan)",                        ratioValue: 8,   defaultUnit: "parts", substitutions: ["light soy + MSG for vegan"] },
    { ingId: "ing_06", role: "Sweetener",  name: "Palm sugar, shaved (or brown sugar)",                        ratioValue: 5,   defaultUnit: "parts", substitutions: ["coconut sugar", "brown sugar"] },
    { ingId: "ing_07", role: "Protein",    name: "Dried shrimp (kung haeng) — optional for Isan style",        ratioValue: 6,   defaultUnit: "parts", substitutions: ["omit for vegetarian"] },
    { ingId: "ing_08", role: "Structure",  name: "Cherry tomatoes, halved",                                    ratioValue: 20,  defaultUnit: "parts", substitutions: ["regular tomato, quartered"] },
    { ingId: "ing_09", role: "Structure",  name: "Long beans or green beans, cut into 3cm pieces",             ratioValue: 15,  defaultUnit: "parts", substitutions: ["snap peas"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Pound aromatics",
      inputs: ["ing_02", "ing_03"],
      outputState: "pounded_aromatics",
      instructions: "In a large clay or stone mortar, add chilies and garlic. Pound with the pestle until broken down into a coarse paste — not smooth, but no large chunks. The breaking of the cells releases volatile compounds that make the salad fragrant and permeating. A wooden salad bowl and spoon cannot replicate this; the mortar is not optional.",
      visualCue: {
        primaryTarget: "Garlic and chilies are bruised and broken, releasing oils — you should see a slightly moist, fragrant paste with visible texture.",
        spectrum: [
          { state: "Underdone", description: "Garlic is still in whole pieces; chilies are cracked but not broken open.", action: "Continue pounding — 15-20 firm strikes with the pestle." },
          { state: "Perfect",   description: "Coarse paste — garlic mashed to a pulp with some fibrous bits, chilies split and releasing orange-red oil. Smells sharply of raw garlic and chili.", action: "Add long beans and tomatoes." },
          { state: "Overdone",  description: "Smooth, wet paste with no texture — the garlic bitterness is overextracted.", action: "This is fine; the flavors will balance once the dressing is added." },
        ],
      },
      feelCue: "Your eyes should be watering slightly from the volatile chili compounds released into the air — that's the mortar working correctly.",
    },
    {
      nodeId: "step_2",
      action: "Bruise vegetables",
      inputs: ["pounded_aromatics", "ing_08", "ing_09"],
      outputState: "bruised_vegetables",
      instructions: "Add long beans and cherry tomatoes to the mortar. Use the pestle to bruise them — press and lightly pound the tomatoes until they release juice, and crack the beans open slightly. Then use a large spoon to toss everything together. The mortar technique simultaneously bruises and dresses — the vegetables should crack open, not disintegrate.",
      visualCue: {
        primaryTarget: "Tomatoes are lightly crushed and releasing red juice; long beans are cracked at intervals but still hold their shape.",
        spectrum: [
          { state: "Underdone", description: "Tomatoes are intact with no juice released; beans are whole and impermeable — they won't absorb the dressing.", action: "Bruise more firmly with the pestle, pressing down rather than striking." },
          { state: "Perfect",   description: "Tomatoes are split and juicy, long beans cracked in several places. The bottom of the mortar has a puddle of mixed tomato juice and chili-garlic paste.", action: "Add papaya and dressing." },
          { state: "Overdone",  description: "Tomatoes are completely mashed into pulp; beans are mushy — texture is lost.", action: "Continue with the recipe. The sauce will be thicker and more tomato-forward." },
        ],
      },
      feelCue: "Press a bruised bean between your fingers — it should flex and bend without snapping, meaning it's cracked open but still has structural integrity.",
    },
    {
      nodeId: "step_3",
      action: "Mix dressing",
      inputs: ["ing_04", "ing_05", "ing_06"],
      outputState: "som_tam_dressing",
      instructions: "In a small bowl, combine lime juice, fish sauce, and palm sugar. Stir until sugar dissolves. Taste — it should be aggressively sour with a savory backbone and a subtle sweetness. This dressing ratio is a starting point; adjust to your preference before adding to the salad. In Thailand, som tam is adjusted to order at the mortar.",
      visualCue: {
        primaryTarget: "Clear golden dressing with dissolved sugar — no crystals visible.",
        spectrum: [
          { state: "Underdone", description: "Sugar granules still visible at the bottom of the bowl.", action: "Stir more vigorously or warm briefly in the microwave for 5 seconds." },
          { state: "Perfect",   description: "Fully dissolved, smooth, bright yellow-gold. Tastes sour-first, savory-second, barely sweet. The lime aroma is vivid.", action: "Pour over the papaya." },
          { state: "Overdone",  description: "Not applicable for a cold dressing, but if the ratio is wrong — too sweet or too salty — adjust now before adding to the papaya, which is hard to fix once combined.", action: "Adjust with more lime juice or fish sauce as needed." },
        ],
      },
      feelCue: "Taste the dressing alone — it should be too much of everything, which is correct, because the green papaya is very neutral and will absorb and temper all the flavors.",
    },
    {
      nodeId: "step_4",
      action: "Toss and serve",
      inputs: ["ing_01", "ing_07", "bruised_vegetables", "som_tam_dressing"],
      outputState: "finished_som_tam",
      instructions: "Add shredded papaya and dried shrimp to the mortar. Pour dressing over the top. Using both the pestle (lightly) and a large spoon, toss and bruise everything together for 1-2 minutes — simultaneously mixing and pressing to help the papaya absorb the dressing. Taste, adjust, and serve immediately alongside sticky rice.",
      visualCue: {
        primaryTarget: "Papaya strands are glistening with dressing, slightly wilted but still with crunch — vivid white-green against red tomato and orange dried shrimp.",
        spectrum: [
          { state: "Underdone", description: "Papaya strands are still dry and pale; dressing pools at the bottom of the mortar rather than clinging to the papaya.", action: "Continue tossing and lightly pounding for another minute; the papaya needs to be slightly bruised to absorb." },
          { state: "Perfect",   description: "Every papaya strand glistens with dressing and has absorbed the lime-sour flavor. Crunch is present but slightly yielded. Colors are vivid. The smell is lime, fish sauce, and chili.", action: "Plate and serve immediately." },
          { state: "Overdone",  description: "Papaya has wilted to limpness; texture is lost and the salad looks waterlogged.", action: "Serve immediately regardless — wilted som tam is still delicious, just softer. Next time, serve faster after mixing." },
        ],
      },
      feelCue: "Grab a pinch of dressed papaya — it should feel cool and crisp with a slight moisture, the papaya releasing a small amount of juice when squeezed but not turning to mush.",
    },
  ],
};
