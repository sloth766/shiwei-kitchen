export default {
  repoId: "master_sicilian_sundried_tomato_pesto_001",
  parentRepoId: null,
  slug: "sun-dried-tomato-pesto",
  author: "ForkRecipe Kitchen",

  title: "Sun-Dried Tomato Pesto",
  description: "A Sicilian pesto born from summer abundance and the patience of the sun — oil-packed dried tomatoes ground with almonds, garlic, and basil into a deep, ruby-red paste that clings to rigatoni like velvet and tastes of August preserved in a jar.",
  cuisine: "Italian",
  culture: "Sicilian",
  category: "condiments",

  tags: ["pesto", "sun-dried tomato", "sicilian", "italian", "condiment", "pasta"],
  difficulty: 1,
  activeTime: "15 min",
  totalTime: "15 min",
  ratioSystem: "parts",

  stars: 1420,
  forks: 109,
  contributors: 28,
  license: "CC-BY-SA",
  createdAt: "2024-10-20",
  updatedAt: "2025-05-10",

  flavorRadar: { sweet: 2, salty: 3, sour: 2, bitter: 1, umami: 5, heat: 1 },

  ingredients: [
    { ingId: "ing_01", role: "Umami",     name: "Sun-dried tomatoes (oil-packed, drained)", ratioValue: 100, defaultUnit: "parts", substitutions: ["dry-packed sun-dried tomatoes (rehydrate in hot water 20 min)"] },
    { ingId: "ing_02", role: "Structure", name: "Blanched almonds",                          ratioValue: 30,  defaultUnit: "parts", substitutions: ["toasted pine nuts", "toasted walnuts"] },
    { ingId: "ing_03", role: "Allium",    name: "Garlic cloves (peeled)",                    ratioValue: 8,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Herb",      name: "Fresh basil leaves",                        ratioValue: 20,  defaultUnit: "parts", substitutions: ["flat-leaf parsley", "combination"] },
    { ingId: "ing_05", role: "Fat",       name: "Extra-virgin olive oil (Sicilian preferred)", ratioValue: 50, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Dairy",     name: "Pecorino Romano (grated)",                  ratioValue: 25,  defaultUnit: "parts", substitutions: ["Parmigiano-Reggiano", "nutritional yeast (vegan)"] },
    { ingId: "ing_07", role: "Seasoning", name: "Salt and black pepper",                     ratioValue: 2,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_08", role: "Heat",      name: "Dried peperoncino (red chili flakes)",      ratioValue: 2,   defaultUnit: "parts", substitutions: ["fresh red chili"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Pound",
      inputs: ["ing_02", "ing_03"],
      outputState: "almond_garlic_paste",
      instructions: "In a food processor, combine the blanched almonds and garlic cloves. Pulse 10–12 times until you have a coarse, irregular paste — the almonds should be broken down to small crumbs but not completely smooth. Over-processing now leads to an oily, textureless pesto. In Sicily, this would be done in a marble mortar, pressing in circular strokes, and that method produces a slightly rougher, more characterful texture — use it if you have the patience and the mortar.",
      visualCue: {
        primaryTarget: "A rough, dry-looking crumble of almond and garlic — irregular pieces ranging from fine crumbs to small 3mm chunks. No visible paste yet.",
        spectrum: [
          { state: "Underdone", description: "Almonds are still in large pieces and garlic is just cracked, not incorporated.", action: "Pulse more, in short bursts. The mixture should look like rough breadcrumbs before adding other elements." },
          { state: "Perfect",   description: "A dry, rough crumble with some small almond chunks still visible. Garlic is evenly distributed. The smell is sharp and nutty.", action: "Add the sun-dried tomatoes and continue." },
          { state: "Overdone",  description: "Almonds have been processed to a smooth paste and the mixture is beginning to look oily.", action: "Proceed — the final texture will be smoother than ideal but the flavor is unaffected." },
        ],
      },
      feelCue: "Rub a pinch of the crumble between your fingers — you should feel both the sandy grit of almond meal and harder fragments of not-quite-broken pieces.",
    },
    {
      nodeId: "step_2",
      action: "Blend",
      inputs: ["almond_garlic_paste", "ing_01", "ing_04", "ing_08"],
      outputState: "tomato_herb_mixture",
      instructions: "Add the sun-dried tomatoes, basil, and peperoncino to the food processor. Pulse 8–10 times to combine — the tomatoes will break down slowly, releasing their concentrated oils into the almond crumble. The mixture will start to look almost black-red at this stage, with the basil providing green flecks. It should be very coarse and dry-looking — the olive oil comes next and will transform the texture entirely.",
      visualCue: {
        primaryTarget: "A rough, dark red mixture with visible tomato pieces and basil flecks distributed throughout the almond base.",
        spectrum: [
          { state: "Underdone", description: "Sun-dried tomatoes are still in large pieces, sitting on top of the almond mixture rather than integrated.", action: "Pulse more — the tomatoes need to break down into smaller fragments to blend with the rest." },
          { state: "Perfect",   description: "A coarse, dark red-green mixture with the tomatoes evenly broken down into small pieces throughout. Intensely aromatic.", action: "Add olive oil and cheese." },
          { state: "Overdone",  description: "The mixture is completely smooth and paste-like before adding the oil.", action: "The pesto will be denser than ideal. Proceed — it will still taste excellent." },
        ],
      },
      feelCue: "The mixture will smell intensely of sun-dried tomato and raw garlic — a concentrated, slightly sweet, savory fragrance that is more complex than fresh tomato. If you smell nothing, check the quality of your sun-dried tomatoes.",
    },
    {
      nodeId: "step_3",
      action: "Emulsify",
      inputs: ["tomato_herb_mixture", "ing_05", "ing_06", "ing_07"],
      outputState: "finished_pesto",
      instructions: "With the food processor running, drizzle the olive oil in slowly. Add the grated Pecorino Romano. Pulse to combine. The pesto will transform from dry and crumbled to a cohesive, glossy, spreadable paste. Season with salt and black pepper. Taste: it should be intensely savory, slightly salty, with a deep tomato richness and bright herb note. If too thick, add more olive oil. Store covered in oil to prevent oxidation — a thin layer of oil poured over the top before refrigerating extends shelf life by several days.",
      visualCue: {
        primaryTarget: "A glossy, deep ruby-red paste with visible texture — not a smooth puree, but cohesive enough to hold its shape when spread on bread.",
        spectrum: [
          { state: "Underdone", description: "Mixture is still dry and crumbly, the oil hasn't fully integrated and pools separately.", action: "Add more oil and continue processing until the mixture coheres into a paste." },
          { state: "Perfect",   description: "Glossy, deeply colored, spreadable paste. Holds a shape when mounded on a spoon. Tastes intensely of tomato, garlic, and cheese.", action: "Transfer to a jar, smooth the surface, and pour a thin layer of olive oil on top." },
          { state: "Overdone",  description: "Over-processed to a completely smooth, oily puree. Has lost all texture.", action: "It is still excellent pesto — texture is a preference, not a requirement for flavor." },
        ],
      },
      feelCue: "A small amount spread on your fingertip should feel slightly oily and grainy — the almond and tomato texture intact beneath the slick of good olive oil.",
    },
  ],
};
