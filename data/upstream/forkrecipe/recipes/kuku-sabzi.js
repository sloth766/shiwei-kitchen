export default {
  repoId: "master_persian_kuku_sabzi_001",
  parentRepoId: null,
  slug: "kuku-sabzi",
  author: "ForkRecipe Kitchen",

  title: "Kuku Sabzi",
  description: "The Persian herb frittata of Nowruz — more herb than egg, so dense with dill, parsley, coriander, and fenugreek that it slices dark green, with walnut halves and tart dried barberries studding each piece like garnets in jade.",
  cuisine: "Persian",
  culture: "Persian",
  category: "eggs",

  tags: ["vegetarian", "gluten-free", "herbs", "frittata", "persian", "nowruz"],
  difficulty: 2,
  activeTime: "25 min",
  totalTime: "45 min",
  ratioSystem: "weight",

  stars: 0, forks: 0, contributors: 1, license: "CC-BY-SA",
  createdAt: "2026-06-27", updatedAt: "2026-06-27",

  flavorRadar: { sweet: 1, salty: 3, sour: 2, bitter: 2, umami: 2, heat: 1 },

  ingredients: [
    { ingId: "ing_01", role: "Binder",     name: "Large eggs",                                                    ratioValue: 300, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_02", role: "Herb",       name: "Fresh flat-leaf parsley, finely chopped",                      ratioValue: 80,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_03", role: "Herb",       name: "Fresh dill, finely chopped",                                   ratioValue: 80,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_04", role: "Herb",       name: "Fresh coriander (cilantro), finely chopped",                   ratioValue: 60,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_05", role: "Herb",       name: "Fresh or dried fenugreek leaves (methi), finely chopped",      ratioValue: 30,  defaultUnit: "g", substitutions: ["extra dill"] },
    { ingId: "ing_06", role: "Structure",  name: "Walnut halves, roughly broken",                                ratioValue: 60,  defaultUnit: "g", substitutions: ["pecans"] },
    { ingId: "ing_07", role: "Acid",       name: "Dried barberries (zereshk)",                                   ratioValue: 30,  defaultUnit: "g", substitutions: ["dried cranberries, roughly chopped"] },
    { ingId: "ing_08", role: "Allium",     name: "Spring onions (scallions), thinly sliced",                     ratioValue: 60,  defaultUnit: "g", substitutions: ["small shallot, finely diced"] },
    { ingId: "ing_09", role: "Seasoning",  name: "Fine salt and black pepper",                                   ratioValue: 6,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_10", role: "Spice",      name: "Ground turmeric",                                              ratioValue: 3,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_11", role: "Leavener",   name: "Baking powder",                                                ratioValue: 3,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_12", role: "Fat",        name: "Neutral oil or clarified butter (ghee)",                       ratioValue: 40,  defaultUnit: "ml", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Whisk",
      inputs: ["ing_01", "ing_09", "ing_10", "ing_11"],
      outputState: "seasoned_eggs",
      instructions: "Crack the eggs into a large bowl. Add the salt, pepper, turmeric, and baking powder. Whisk vigorously for 2 minutes until the mixture is pale yellow, slightly aerated, and all the yolk and white are thoroughly combined. The baking powder will give the kuku a slightly lighter, more soufflé-like texture.",
      visualCue: {
        primaryTarget: "Whisked egg mixture",
        spectrum: [
          { state: "Underdone", description: "Egg white still streaking through. Yellow and white not fully combined. Flat with no foam.", action: "Whisk more vigorously for another minute — streaky eggs will create uneven spots in the cooked kuku." },
          { state: "Perfect",   description: "Uniform pale golden-yellow with a thin surface foam. Colour is slightly lightened by the turmeric. Mixture falls from the whisk in a thick, steady ribbon.", action: "Add all the herbs, greens, walnuts, and barberries." },
          { state: "Overdone",  description: "N/A — eggs cannot be over-whisked for this purpose.", action: "Proceed." },
        ],
      },
      feelCue: "Run your finger along the whisk — the egg mixture should coat it in a smooth, slightly thick film, not thin and watery like raw egg.",
    },
    {
      nodeId: "step_2",
      action: "Fold",
      inputs: ["seasoned_eggs", "ing_02", "ing_03", "ing_04", "ing_05", "ing_06", "ing_07", "ing_08"],
      outputState: "kuku_batter",
      instructions: "Add all the chopped herbs, spring onions, broken walnuts, and barberries to the egg mixture. Fold everything together with a large spoon until the herbs are evenly distributed and the egg coats every strand of herb. The mixture will look almost entirely green with just a little yellow egg visible.",
      visualCue: {
        primaryTarget: "Combined batter",
        spectrum: [
          { state: "Underdone", description: "Herbs and egg are not fully combined — dry herb clumps sit on top of the liquid egg at the bottom.", action: "Fold more thoroughly, reaching to the bottom of the bowl each time." },
          { state: "Perfect",   description: "A dense, dark-green batter where every component is coated in egg. The ratio looks alarming — far more herb than egg — and that is exactly right. Barberries glint red throughout.", action: "Cook immediately — the herbs will begin to weep liquid if they sit." },
          { state: "Overdone",  description: "Herbs have sat in the egg too long and have begun to weep liquid, making the batter thin and watery.", action: "Cook immediately. The kuku will still work but may be more fragile." },
        ],
      },
      feelCue: "Lift a large spoonful of the batter — it should hold together as a cohesive, herb-dense mass rather than running off the spoon in a liquid stream. The herbs carry the egg, not the other way around.",
    },
    {
      nodeId: "step_3",
      action: "Fry",
      inputs: ["ing_12"],
      outputState: "oiled_pan",
      instructions: "Heat the oil or ghee in a 24–26 cm non-stick or well-seasoned cast-iron pan over medium heat. When the oil shimmers and a drop of water sizzles immediately, the pan is ready. Swirl to coat the sides as well as the base.",
      visualCue: {
        primaryTarget: "Oil in the pan",
        spectrum: [
          { state: "Underdone", description: "Oil is cool and still. A water drop does not sizzle.", action: "Wait — a cool pan will cause the kuku to stick and tear when flipped." },
          { state: "Perfect",   description: "Oil shimmers with faint ripples across the surface. A small water drop sizzles and evaporates instantly. Smell of neutral fat in the air.", action: "Pour in the batter immediately." },
          { state: "Overdone",  description: "Oil is smoking and very dark.", action: "Remove from heat, let cool briefly, and start again with less heat." },
        ],
      },
      feelCue: "Hold your palm 5 cm above the pan — you should feel a steady, dry radiant heat but not an aggressive burning sensation.",
    },
    {
      nodeId: "step_4",
      action: "Fry",
      inputs: ["oiled_pan", "kuku_batter"],
      outputState: "finished_kuku_sabzi",
      instructions: "Pour the herb batter into the hot pan and gently press it into an even layer with the back of a spoon. Cover with a lid and cook on medium-low heat for 10–12 minutes until the top is set but still very slightly glossy in the centre and the bottom is deeply golden. Slide the kuku onto a large flat plate, then invert the pan over the plate and flip to return the kuku to the pan uncooked-side-down. Cook uncovered for a further 5–7 minutes. Alternatively, finish under a medium grill for 4–5 minutes.",
      visualCue: {
        primaryTarget: "Kuku in the pan",
        spectrum: [
          { state: "Underdone", description: "Top surface is still wet and liquid. The kuku is not set enough to flip — attempting to flip now will break it.", action: "Replace the lid and give it 3–4 more minutes. The lid creates steam that sets the top from above." },
          { state: "Perfect",   description: "Top surface is set with only the faintest sheen of moisture in the very centre. Bottom (check by lifting edge with a spatula) is a rich, golden-brown crust. The kuku holds its shape when the pan is gently shaken.", action: "Flip confidently and cook the second side. The finished kuku is dark green with a golden-brown crust on both sides, firm enough to cut into clean wedges." },
          { state: "Overdone",  description: "Edges are pulling away from the pan and have begun to crack. The top is completely dry. Both sides are very dark brown.", action: "Remove from heat immediately. Over-cooked kuku is dry and slightly rubbery but still edible." },
        ],
      },
      feelCue: "Press the centre of the kuku gently — it should feel set and springy, bouncing back from your finger immediately. If it yields to a depression and doesn't spring back, it needs more time under the lid.",
    },
  ],
};
