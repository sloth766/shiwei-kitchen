export default {
  repoId: "master_lebanese_tabouli_001",
  parentRepoId: null,
  slug: "tabouli",
  author: "ForkRecipe Kitchen",

  title: "Tabouli",
  description: "Lebanon's great herb salad — an enormous, verdant mass of flat-leaf parsley and mint, finely hand-chopped, with only a small quantity of fine bulgur soaked (never cooked), dressed aggressively with lemon juice and olive oil; the grain is an accent, the parsley is everything.",
  cuisine: "Lebanese",
  culture: "Levantine",
  category: "grains",

  tags: ["vegan", "gluten-free-option", "lebanese", "herb-salad", "bulgur", "fresh"],
  difficulty: 1,
  activeTime: "20 min",
  totalTime: "40 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 0, salty: 2, sour: 4, bitter: 1, umami: 0, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Herb",       name: "Flat-leaf parsley (4 large bunches, leaves and fine stems only)", ratioValue: 200, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_02", role: "Herb",       name: "Fresh mint leaves",                                              ratioValue: 30,  defaultUnit: "g",   substitutions: ["spearmint"] },
    { ingId: "ing_03", role: "Structure",  name: "Fine bulgur wheat (#1 grade)",                                   ratioValue: 50,  defaultUnit: "g",   substitutions: ["quinoa (gluten-free — soak 20 min in lemon juice)", "cooked millet"] },
    { ingId: "ing_04", role: "Aromatic",   name: "Ripe tomatoes (finely diced, drained of excess juice)",          ratioValue: 300, defaultUnit: "g",   substitutions: ["cherry tomatoes, quartered"] },
    { ingId: "ing_05", role: "Allium",     name: "Scallions (white and pale green parts, thinly sliced)",          ratioValue: 60,  defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_06", role: "Acid",       name: "Fresh lemon juice (about 3 lemons)",                            ratioValue: 80,  defaultUnit: "ml",  substitutions: [] },
    { ingId: "ing_07", role: "Fat",        name: "Extra-virgin olive oil",                                        ratioValue: 60,  defaultUnit: "ml",  substitutions: [] },
    { ingId: "ing_08", role: "Spice",      name: "Ground allspice",                                               ratioValue: 2,   defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_09", role: "Spice",      name: "Ground cinnamon",                                               ratioValue: 1,   defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_10", role: "Seasoning",  name: "Fine salt",                                                     ratioValue: 6,   defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_11", role: "Seasoning",  name: "Black pepper (freshly ground)",                                 ratioValue: 2,   defaultUnit: "g",   substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Hydrate",
      inputs: ["ing_03", "ing_06"],
      outputState: "soaked_bulgur",
      instructions: "Place the fine bulgur in a small bowl. Pour half the lemon juice (40 ml) directly over it — soaking in lemon juice rather than water means the bulgur absorbs acidity as it hydrates, so it is never bland or watery. Add just enough cold water to barely cover the grain (about 50 ml). Stir once and leave to soak for 20 minutes. After soaking, tip the bulgur into the center of a clean kitchen towel or several layers of cheesecloth and wring firmly — extracting as much liquid as possible. The bulgur must be as dry as you can make it, or it will water down the salad.",
      visualCue: {
        primaryTarget: "Bulgur grains have swollen to roughly double their dry size, absorbed all visible liquid, and are uniformly pale golden-tan. When squeezed, they release very little moisture.",
        spectrum: [
          { state: "Underdone", description: "Bulgur grains are still hard at the center and chewy in a gritty, unpleasant way.", action: "Add another tablespoon of liquid and soak for 10 more minutes. Fine bulgur should fully hydrate without heat." },
          { state: "Perfect",   description: "Grains are swollen, uniformly hydrated, and tender — but still have a very slight, pleasant bite. They clump when pressed but are not wet.", action: "Wring dry in a cloth and set aside. Proceed to chop the herbs." },
          { state: "Overdone",  description: "Bulgur has soaked too long in too much liquid and is completely waterlogged and mushy.", action: "Squeeze out as much liquid as possible. The texture will be softer in the final salad, but the flavor is unaffected." },
        ],
      },
      feelCue: "When you wring the soaked bulgur in the cloth, you should feel it resist the pressure like damp sand — yielding but not liquid, with grains that feel distinct between your knuckles.",
    },
    {
      nodeId: "step_2",
      action: "Chop",
      inputs: ["ing_01", "ing_02"],
      outputState: "chopped_herbs",
      instructions: "Wash and thoroughly dry the parsley and mint — wet herbs will release water into the salad. Use a sharp chef's knife only — never a food processor, which bruises the leaves and turns them dark and bitter within minutes. Gather the parsley into a tight bundle and chop fine with a rocking motion, then rotate 90 degrees and chop again. The goal is a fine, green confetti — not a paste, not rough chunks. Chop the mint separately (it is more delicate) and fold it in. The volume of herb should be approximately 4-5 times the volume of everything else; if you feel you have too much parsley, you are probably correct.",
      visualCue: {
        primaryTarget: "A brilliant green, fine confetti of parsley and mint — each piece no larger than 3-4 mm. No bruised, dark, or mushy patches.",
        spectrum: [
          { state: "Underdone", description: "Parsley is in large rough pieces with long stems still visible. The pieces are too large to distribute evenly through the salad.", action: "Continue chopping, gathering the parsley back into a tight mound between passes." },
          { state: "Perfect",   description: "Fine, vivid green confetti that looks like an explosion of color. Each piece is small enough to sit on a fingertip. No large stems. Smells intensely herbal.", action: "Transfer to a large mixing bowl and proceed." },
          { state: "Overdone",  description: "The parsley has been chopped to a near-paste and is beginning to turn dark green from bruising and oxidation.", action: "Use immediately — oxidized parsley cannot be recovered. The flavor is unaffected, but the salad will look duller." },
        ],
      },
      feelCue: "Properly chopped fresh parsley feels lively and springy in your hands — it bounces back when pressed, is cool and very slightly damp from its own volatile oils, and smells like a garden after rain.",
    },
    {
      nodeId: "step_3",
      action: "Dice",
      inputs: ["ing_04", "ing_05"],
      outputState: "prepared_vegetables",
      instructions: "Dice the tomatoes into small cubes, no larger than 5 mm. Place the diced tomatoes in a fine-mesh sieve or colander and let them drain for 10 minutes — tomatoes release a lot of water, and undrained tomatoes will pool at the bottom of the salad within minutes of serving. Slice the scallions into thin rounds. The scallion provides the onion note in tabouli — raw white onion is traditional in some versions, but scallions are milder and more commonly used in modern Lebanese kitchens.",
      visualCue: {
        primaryTarget: "Small, uniform tomato cubes that hold their shape and are not mushy. Thin scallion rounds. The tomatoes have drained and are no longer sitting in a pool of juice.",
        spectrum: [
          { state: "Underdone", description: "Tomato pieces are large and irregular. They are still sitting in a pool of juice in the bowl.", action: "Drain the tomatoes in a sieve before adding. Large pieces make the texture unbalanced." },
          { state: "Perfect",   description: "Small, uniform tomato cubes, drained and just slightly damp. Thin scallion rounds.", action: "Combine with the herbs and proceed to dress." },
          { state: "Overdone",  description: "Tomatoes have been chopped so fine they are mushy and more like a pulp than diced vegetables.", action: "Drain thoroughly and proceed — they will still taste good but lose textural definition in the final salad." },
        ],
      },
      feelCue: "A properly drained tomato cube should feel firm and dry on the outside when touched with a fingertip — if it leaves a wet tomato print, drain it longer.",
    },
    {
      nodeId: "step_4",
      action: "Toss",
      inputs: ["chopped_herbs", "soaked_bulgur", "prepared_vegetables", "ing_07", "ing_06", "ing_08", "ing_09", "ing_10", "ing_11"],
      outputState: "dressed_tabouli",
      instructions: "In a large mixing bowl, combine the chopped herbs, squeezed-dry bulgur, drained tomatoes, and scallions. Drizzle the remaining lemon juice and olive oil over everything. Add the allspice, cinnamon, salt, and pepper. Toss gently but thoroughly using two large spoons or clean hands, lifting from the bottom and turning — you are not trying to crush anything, just coat every element in the dressing. The salad will compress slightly as it is tossed. Taste: tabouli should be aggressively, almost bracingly lemony. If it seems too mild, add more lemon juice.",
      visualCue: {
        primaryTarget: "A vivid, glistening green salad with tiny red tomato jewels and golden bulgur dispersed throughout. Every element is coated in lemon and oil. It looks alive.",
        spectrum: [
          { state: "Underdone", description: "The dressing has not been fully tossed through — some dry parsley clumps at the top are undressed, and the bulgur has sunk to the bottom.", action: "Toss again, making sure to lift from the very bottom of the bowl. Every green piece must be coated." },
          { state: "Perfect",   description: "Uniformly glistening, every element coated. The parsley is still brilliant green. The smell is intensely herbal and lemony. When you taste it, the first sensation should be sharp lemon, followed by olive oil and herb.", action: "Rest for 15 minutes for the flavors to marry, then serve." },
          { state: "Overdone",  description: "The tabouli has sat dressed for more than 30 minutes. The parsley is beginning to wilt and the salad is pooling liquid at the bottom.", action: "Drain the excess liquid if it is significant. Serve immediately. Dressed tabouli does not keep; make it as close to serving as possible." },
        ],
      },
      feelCue: "When you toss tabouli, the herbs should feel springy and light in your hands — not wet and heavy; if the bowl feels like it is full of wet grass, the tomatoes were not drained enough.",
    },
    {
      nodeId: "step_5",
      action: "Season",
      inputs: ["dressed_tabouli"],
      outputState: "finished_tabouli",
      instructions: "Taste the dressed tabouli and adjust. The correct seasoning for tabouli is different from most dishes: the lemon must be the loudest note — if you are hesitant, add more. The olive oil should be present but should not make the salad heavy. The allspice and cinnamon are subtle warmth, not detectable as distinct spices. Salt should make everything pop without being perceptible on its own. Let the tabouli rest at room temperature for 15 minutes before serving — this brief rest allows the salt to draw a small amount of moisture from the herbs, which mingles with the dressing and creates the finished sauce.",
      visualCue: {
        primaryTarget: "A salad that looks impossibly green and fresh, slightly shiny from olive oil, with the parsley still holding its vivid color. The bulgur is barely visible among the herbs.",
        spectrum: [
          { state: "Underdone", description: "The salad tastes flat — not enough salt or lemon. The green tastes like raw parsley without the bright acidity that transforms it.", action: "Add more lemon juice first, then taste for salt. The Lebanese palate for this dish is bold — trust it." },
          { state: "Perfect",   description: "The first taste is bright acid lemon, followed immediately by the herbaceous, almost bitter freshness of parsley and mint, then the warm spice of allspice. The olive oil coats the palate and ties everything together.", action: "Serve immediately alongside romaine lettuce hearts or pita bread for scooping, and kibbeh or grilled meats." },
          { state: "Overdone",  description: "The tabouli is too salty or the lemon is too aggressive — one note dominates everything else.", action: "Add a little more olive oil to buffer the sharpness. A small amount of extra bulgur can absorb excess acid if needed." },
        ],
      },
      feelCue: "A spoonful of perfect tabouli should feel bright and clean on the palate, never heavy — the olive oil coats without weighing down, and the lemon lifts every element into clarity.",
    },
  ],
};
