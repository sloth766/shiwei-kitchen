export default {
  repoId: "master_mexican_tomatillo_salsa_verde_001",
  parentRepoId: null,
  slug: "tomatillo-salsa-verde",
  author: "ForkRecipe Kitchen",

  title: "Tomatillo Salsa Verde",
  description: "Husked tomatillos boiled until they surrender their tartness, then blended with roasted serrano chilis and cilantro into a bright, herbaceous, acid-punchy green salsa that makes a carnitas taco into something you dream about.",
  cuisine: "Mexican",
  culture: "Mexican",
  category: "condiments",

  tags: ["salsa verde", "tomatillo", "mexican", "condiment", "green", "tart"],
  difficulty: 1,
  activeTime: "20 min",
  totalTime: "30 min",
  ratioSystem: "parts",

  stars: 1730,
  forks: 152,
  contributors: 44,
  license: "CC-BY-SA",
  createdAt: "2024-08-20",
  updatedAt: "2025-03-25",

  flavorRadar: { sweet: 1, salty: 2, sour: 4, bitter: 1, umami: 2, heat: 3 },

  ingredients: [
    { ingId: "ing_01", role: "Structure", name: "Fresh tomatillos (husked and rinsed)",    ratioValue: 100, defaultUnit: "parts", substitutions: ["canned tomatillos (drained, skip boiling step)"] },
    { ingId: "ing_02", role: "Heat",      name: "Serrano chilis (or jalapeños)",           ratioValue: 12,  defaultUnit: "parts", substitutions: ["jalapeños (milder)", "habanero (much hotter)"] },
    { ingId: "ing_03", role: "Allium",    name: "White onion (roughly chopped)",           ratioValue: 20,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Allium",    name: "Garlic cloves (peeled)",                  ratioValue: 6,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Herb",      name: "Fresh cilantro (stems and leaves)",       ratioValue: 20,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Seasoning", name: "Salt",                                    ratioValue: 2,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Acid",      name: "Fresh lime juice",                        ratioValue: 10,  defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Boil",
      inputs: ["ing_01", "ing_04"],
      outputState: "cooked_tomatillos",
      instructions: "Place tomatillos and garlic cloves in a saucepan. Cover with cold water by about 3cm. Bring to a boil over high heat, then reduce to a steady simmer. Cook for 8–10 minutes until the tomatillos have changed from bright green to a dull, slightly olive-green color and have softened completely — they should look like they are about to collapse. Do not overcook to the point of disintegration. Reserve 1/4 cup of the cooking liquid in case you need to thin the salsa.",
      visualCue: {
        primaryTarget: "Tomatillos have turned from bright vivid green to a softer, more muted olive-green. They are visibly softened and some are beginning to split.",
        spectrum: [
          { state: "Underdone", description: "Tomatillos are still bright green and firm, springing back when pressed with a spoon.", action: "Continue simmering. Undercooked tomatillos produce a harsher, more astringent salsa." },
          { state: "Perfect",   description: "Muted olive-green, fully soft when poked with a spoon, some showing cracks or splits. The water is golden-green and tart.", action: "Drain, reserving some cooking liquid, and proceed." },
          { state: "Overdone",  description: "Tomatillos have completely disintegrated into the water. The cooking liquid is very tart and the tomatillos have lost their structure.", action: "Drain immediately — the tomatillos still have flavor, they have just lost their shape. The salsa may be thinner." },
        ],
      },
      feelCue: "Press a tomatillo against the side of the pan with a spoon — it should yield with almost no resistance and squish flat, releasing a burst of tart green juice.",
    },
    {
      nodeId: "step_2",
      action: "Roast",
      inputs: ["ing_02"],
      outputState: "charred_chilis",
      instructions: "While the tomatillos cook, char the serrano chilis directly over a gas flame or under a hot broiler, turning occasionally with tongs, until blistered and charred on all sides — about 5–8 minutes total. The skins should blacken and blister but the flesh should remain intact. Transfer to a bowl, cover with a plate for 5 minutes to steam, then peel, stem, and seed (or leave seeds for more heat). Charring the chilis adds a smokiness that offsets the tartness of the tomatillos.",
      visualCue: {
        primaryTarget: "Uniformly blistered and charred chilis — skin is bubbled and blackened but the chili underneath is soft and pliable, not burnt through.",
        spectrum: [
          { state: "Underdone", description: "Chilis are lightly marked in spots but mostly green and still firm. Little smoke flavor has developed.", action: "Continue charring — turn more frequently for even coverage." },
          { state: "Perfect",   description: "Most of the skin is black and blistered. The chili is clearly soft and yielding. It smells of roasted pepper rather than raw capsicum.", action: "Steam in a covered bowl for 5 minutes before peeling." },
          { state: "Overdone",  description: "Chili flesh has collapsed and blackened through — not just the skin.", action: "Discard if completely carbonized. If only very dark, proceed with peeling — the interior may be salvageable." },
        ],
      },
      feelCue: "After steaming, the charred skin should slip off between your fingers effortlessly — if it is pulling and resisting, steam for another 2 minutes.",
    },
    {
      nodeId: "step_3",
      action: "Blend",
      inputs: ["cooked_tomatillos", "charred_chilis", "ing_03", "ing_05", "ing_06", "ing_07"],
      outputState: "finished_salsa_verde",
      instructions: "Combine the drained tomatillos, garlic (cooked with them), charred chilis, raw onion, cilantro, salt, and lime juice in a blender. Add a couple tablespoons of reserved cooking liquid. Blend to your desired consistency: rough and rustic with 6 pulses, or completely smooth with 45 seconds on high. Taste immediately — adjust salt for savory depth, lime for brightness, and if too tart, a pinch of sugar to balance. The color will be a vibrant olive-green flecked with darker specks from the charred chili.",
      visualCue: {
        primaryTarget: "A bright, vivid olive-green salsa with herb flecks. Thick enough to mound slightly on a chip but pourable. Color is alive and herbal, not dull or grey.",
        spectrum: [
          { state: "Underdone", description: "Still chunky with large pieces of tomatillo and cilantro stem visible. Flavors are not unified.", action: "Blend more — pulse until the desired consistency is reached." },
          { state: "Perfect",   description: "Smooth to medium-smooth, bright olive-green, intensely aromatic. The flavor is tart, herbal, and slowly spicy with a clean finish.", action: "Taste for salt and lime, then serve or refrigerate." },
          { state: "Overdone",  description: "Completely smooth and light-colored from over-blending — the color has turned from olive-green to a lighter, airier green from aeration.", action: "Let settle to allow air to escape. Color will deepen. The texture is thinner than ideal." },
        ],
      },
      feelCue: "The finished salsa should smell so vividly of cilantro and tart tomatillo that it almost stings the inside of your nose — bright, green, and unmistakably alive.",
    },
  ],
};
