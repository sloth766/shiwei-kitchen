export default {
  repoId: "master_french_gougeres_001",
  parentRepoId: null,
  slug: "gougeres",
  author: "ForkRecipe Kitchen",

  title: "Gougères",
  description: "Airy, hollow choux buns laced with Gruyère — golden, puffed, and fragrant with warm cheese — the traditional Burgundian welcome bite served with Champagne or Kir.",
  cuisine: "French",
  culture: "Burgundy",
  category: "breads",

  tags: ["cheese puffs", "french", "choux", "gruyère", "burgundy"],
  difficulty: 2,
  activeTime: "30 min",
  totalTime: "1 hr",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",

  flavorRadar: { sweet: 0, salty: 3, sour: 0, bitter: 0, umami: 3, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Liquid",    name: "Water",                         ratioValue: 100, defaultUnit: "parts", substitutions: ["half milk half water (richer result)"] },
    { ingId: "ing_02", role: "Fat",       name: "Unsalted butter (cubed)",       ratioValue: 45,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Structure", name: "All-purpose flour (sifted)",    ratioValue: 60,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Protein",   name: "Large eggs (at room temperature)", ratioValue: 100, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Seasoning", name: "Fine salt and pinch of white pepper", ratioValue: 2, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Dairy",     name: "Gruyère (finely grated)",      ratioValue: 55,  defaultUnit: "parts", substitutions: ["Comté (more complex)", "aged Cheddar"] },
    { ingId: "ing_07", role: "Aromatic",  name: "Freshly grated nutmeg (small pinch)", ratioValue: 0.5, defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Boil",
      inputs: ["ing_01", "ing_02", "ing_05"],
      outputState: "panade",
      instructions: "Combine the water, butter, salt, and pepper in a medium saucepan over medium heat. Stir as the butter melts, then bring to a full rolling boil. Remove from heat and tip in all the flour in one addition. Stir vigorously with a wooden spoon until the mixture forms a smooth ball that pulls away cleanly from the sides of the pan. Return to medium-low heat and cook, stirring constantly, for 1–2 minutes until the paste dries slightly and a thin film forms on the pan bottom. This drying step is essential.",
      visualCue: {
        primaryTarget: "A smooth, compact ball of dough that rolls freely in the pan without sticking, with a thin, dry film coating the pan bottom and a faint smell of cooked flour.",
        spectrum: [
          { state: "Underdone", description: "Paste is still loose and wet, not holding together as a ball. It smells of raw flour.", action: "Continue cooking and stirring over medium-low heat until the paste pulls away cleanly and the pan film forms." },
          { state: "Perfect",   description: "A cohesive, smooth ball. Slightly matte surface. The pan bottom shows a thin, dry coating when the dough is pushed aside.", action: "Transfer to a bowl and let cool for 3–4 minutes before adding eggs." },
          { state: "Overdone",  description: "A thick crust is forming on the pan bottom and the dough smells of scorched starch.", action: "Transfer immediately to the bowl. The panade is still workable unless the bottom has burnt through." },
        ],
      },
      feelCue: "Press a finger into the warm panade — it should feel like dense, warm playdough: yielding but cohesive, no stickiness remaining on your finger.",
    },
    {
      nodeId: "step_2",
      action: "Fold",
      inputs: ["panade", "ing_04", "ing_06", "ing_07"],
      outputState: "gougere_dough",
      instructions: "Beat the eggs lightly together. With the panade still warm, add the beaten egg in four additions, beating vigorously with a wooden spoon or electric mixer between each — the paste will look horrifyingly split and greasy at first; keep beating until it comes back together before adding more. After all eggs are incorporated and the paste is smooth and glossy, stir in three-quarters of the Gruyère and the nutmeg. The dough should fall from the spoon in a slow, heavy V.",
      visualCue: {
        primaryTarget: "A glossy, smooth, elastic paste that falls from the spoon in a thick, slow V-shape and smells powerfully of warm cheese.",
        spectrum: [
          { state: "Underdone", description: "Paste is still stiff and holds its shape without any flow — too little egg has been incorporated.", action: "Add a little more beaten egg and beat vigorously to incorporate." },
          { state: "Perfect",   description: "Smooth, glossy, and elastic. The dough holds together and falls in a definitive V. Cheese is visibly studded throughout.", action: "Transfer to a piping bag and pipe immediately, or rest covered for up to 1 hour." },
          { state: "Overdone",  description: "Dough is too liquid and pours freely — it will spread flat and not hold its shape in the oven.", action: "The ratio is off. Make a new panade and combine the two — the stiffer new paste will firm up the runny mixture." },
        ],
      },
      feelCue: "The dough should feel alive and elastic — when you pull a spoonful away, it should stretch in a long, glossy strand before cleanly breaking.",
    },
    {
      nodeId: "step_3",
      action: "Bake",
      inputs: ["gougere_dough"],
      outputState: "finished_gougeres",
      instructions: "Preheat the oven to 200°C (390°F). Line two baking sheets with parchment. Pipe or spoon walnut-sized rounds, about 3 cm in diameter, spacing them 4 cm apart. Wet a finger and smooth any peaks. Sprinkle the reserved Gruyère over the tops. Bake for 22–25 minutes until deep golden-brown and puffed. Do not open the oven in the first 15 minutes — the choux needs uninterrupted heat to set its structure. Gougères are done when they are deeply colored and feel light for their size.",
      visualCue: {
        primaryTarget: "Fully puffed, round gougères with a deep golden-brown color and a golden cheese crust on top — uniform in shape with a crisp exterior.",
        spectrum: [
          { state: "Underdone", description: "Pale golden, slightly damp-feeling, and heavy. They will collapse if removed too early as the structure has not set.", action: "Return to the oven for 3–4 more minutes. The deep color is structural, not cosmetic." },
          { state: "Perfect",   description: "Deep golden-brown all over, with darker spots where the cheese has crisped. They feel almost weightless when picked up. The interior is hollow and slightly eggy when broken open.", action: "Serve immediately — gougères are best within 10 minutes of baking, while the shell is crisp." },
          { state: "Overdone",  description: "Very dark brown, with dry, cracked cheese on top. Shell is rigid and beginning to darken to burnt amber.", action: "Serve quickly — they will become very hard as they cool and lose their charm." },
        ],
      },
      feelCue: "Pick up a gougère and feel the hollow lightness — it should be startlingly insubstantial for its size. Pinch lightly: the shell should be crisp but give a slightly springy resistance.",
    },
  ],
};
