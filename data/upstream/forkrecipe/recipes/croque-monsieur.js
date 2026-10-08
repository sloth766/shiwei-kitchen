export default {
  repoId: "master_french_croque_monsieur_001",
  parentRepoId: null,
  slug: "croque-monsieur",
  author: "ForkRecipe Kitchen",

  title: "Croque-Monsieur",
  description: "The Parisian café sandwich elevated by proper béchamel — buttery bread, good ham, nutmeg-scented white sauce, and Gruyère that bubbles and blisters under the broiler into a savoury, slightly charred crust that crackles when you press down on it.",
  cuisine: "French",
  culture: "Parisian Café",
  category: "proteins",

  tags: ["french", "sandwich", "ham", "cheese", "bechamel"],
  difficulty: 2,
  activeTime: "20 min",
  totalTime: "30 min",
  ratioSystem: "parts",

  stars: 1560,
  forks: 143,
  contributors: 19,
  license: "CC-BY-SA",
  createdAt: "2024-08-30",
  updatedAt: "2025-12-09",

  flavorRadar: { sweet: 0, salty: 4, sour: 0, bitter: 0, umami: 4, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Thick-cut white bread (pain de mie preferred)",         ratioValue: 100, defaultUnit: "parts", substitutions: ["brioche", "sourdough (slightly more robust)"] },
    { ingId: "ing_02", role: "Protein",    name: "Good-quality cooked ham, sliced",                       ratioValue: 40,  defaultUnit: "parts", substitutions: ["jambon de Paris", "prosciutto cotto"] },
    { ingId: "ing_03", role: "Dairy",      name: "Gruyère, coarsely grated (Comté or Emmental work too)", ratioValue: 50,  defaultUnit: "parts", substitutions: ["Comté", "Emmental"] },
    { ingId: "ing_04", role: "Fat",        name: "Unsalted butter",                                       ratioValue: 20,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Dairy",      name: "Whole milk (for béchamel)",                             ratioValue: 60,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Starch",     name: "Plain flour (for béchamel roux)",                       ratioValue: 8,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Seasoning",  name: "Salt, white pepper, and freshly grated nutmeg",         ratioValue: 2,   defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Emulsify",
      inputs: ["ing_04", "ing_06", "ing_05", "ing_07"],
      outputState: "bechamel",
      instructions: "Melt butter in a small saucepan over medium heat. Add flour all at once and stir vigorously with a wooden spoon or whisk for 90 seconds — the roux should turn pale blonde and smell faintly nutty, not raw. Gradually pour in warm milk, whisking constantly to prevent lumps. Stir over medium heat until the sauce thickens to a consistency that coats the back of a spoon heavily. Season with salt, white pepper, and a generous grating of nutmeg.",
      visualCue: {
        primaryTarget: "A smooth, glossy white sauce that coats the back of a spoon in a thick, even layer and holds a line when you draw your finger through it.",
        spectrum: [
          { state: "Underdone", description: "Sauce is thin and milky. No coating on the spoon — it runs off immediately. Floury taste when sampled.", action: "Continue stirring over medium heat. Béchamel needs to reach near-boiling to fully cook the starch and thicken properly." },
          { state: "Perfect",   description: "Thick, glossy, smooth. A finger drawn through the coat on a spoon leaves a clean line that holds for 5+ seconds. Tastes rich with a warm nutmeg note, no floury raw edge.", action: "Remove from heat. Stir in a handful of the Gruyère if a cheesier sauce (Mornay) is desired." },
          { state: "Overdone",  description: "Sauce is very stiff and gluey — it mounds on the spoon rather than flowing. Lumps may appear from sticking to the pan bottom.", action: "Whisk in warm milk a tablespoon at a time to loosen. Pass through a sieve if lumps remain." },
        ],
      },
      feelCue: "Rub a small amount of béchamel between your fingers — the properly cooked sauce should feel silky-smooth with no gritty floury granules, and it should cling to your skin in a thin, even film.",
    },
    {
      nodeId: "step_2",
      action: "Toast",
      inputs: ["ing_01", "ing_04"],
      outputState: "toasted_bread",
      instructions: "Spread butter on one side of each bread slice. Toast buttered-side down in a dry skillet over medium heat for 2–3 minutes until golden and fragrant. This step is often skipped in shortcuts, but pre-toasting prevents the bottom bread from going soggy under the wet béchamel. Remove from heat.",
      visualCue: {
        primaryTarget: "The buttered side is an even, pale golden brown — not dark brown. The bread smells toasted and nutty. The unbuttered side remains soft and white.",
        spectrum: [
          { state: "Underdone", description: "The buttered side is still white or very pale yellow. Bread is soft throughout with no crust formed.", action: "Return to heat. Untoasted bread will become soggy and collapse under the béchamel." },
          { state: "Perfect",   description: "Even, golden-blonde color on the buttered surface. The bread is rigid and slightly crisp to the touch. Smells of brown butter.", action: "Remove from pan and assemble." },
          { state: "Overdone",  description: "Buttered side is dark brown, bordering on burnt. Bitter smell. Bread is very hard.", action: "Proceed — the béchamel and broiler will mask some bitterness, but be gentle with heat during the broil step." },
        ],
      },
      feelCue: "Tap the toasted surface with a fingernail — it should give a light, dry click, like tapping a wooden cutting board, not the soft thud of untoasted bread.",
    },
    {
      nodeId: "step_3",
      action: "Assemble",
      inputs: ["toasted_bread", "ing_02", "ing_03", "bechamel"],
      outputState: "assembled_croque",
      instructions: "Spread a generous layer of béchamel on the untoasted side of the bottom bread slice. Lay ham slices to cover completely. Add a layer of grated Gruyère. Place the second slice on top, toasted side up. Spread more béchamel over the top of the sandwich — this is the defining move of the croque-monsieur — and pile the remaining Gruyère on top.",
      visualCue: {
        primaryTarget: "A well-built sandwich with béchamel extending to the edges of the top surface and an even mound of Gruyère covering the top entirely. No bare bread visible through the cheese.",
        spectrum: [
          { state: "Underdone", description: "Too little béchamel on top — bread still visible. Not enough cheese. The top will dry out under the broiler rather than forming a crust.", action: "Add more béchamel and cheese. There should be no skimping — the excess is what creates the golden crust." },
          { state: "Perfect",   description: "Béchamel reaches the edges and cheese fully covers the top in an even mound. The sandwich looks slightly over-built — this is correct.", action: "Transfer to a baking sheet and broil." },
          { state: "Overdone",  description: "So much béchamel that it's sliding off the sides before even reaching the oven. Extremely difficult to handle.", action: "Refrigerate 5 minutes to firm up the béchamel before broiling." },
        ],
      },
      feelCue: "Pick up the assembled croque — it should feel satisfyingly heavy for its size, the cheese and sauce creating real substance, not a lightweight dry sandwich.",
    },
    {
      nodeId: "step_4",
      action: "Bake",
      inputs: ["assembled_croque"],
      outputState: "finished_croque_monsieur",
      instructions: "Place the assembled croque on a baking sheet under a hot broiler set to high, positioned 15 cm from the element. Broil for 3–5 minutes, watching constantly, until the Gruyère on top is bubbling, golden-brown, and developing dark spots. The edges of the béchamel should be caramelizing. Serve immediately — the crust is best in the first 90 seconds.",
      visualCue: {
        primaryTarget: "Gruyère is bubbling vigorously across the entire surface, with golden-brown patches and a few charred dark spots scattered throughout. The béchamel edges are caramelized and slightly darker.",
        spectrum: [
          { state: "Underdone", description: "Cheese has melted but is pale and barely golden. No bubbling spots. The surface looks damp and glistening but not browned.", action: "Continue broiling. The flavour transformation happens in the last 90 seconds when the cheese begins to colour." },
          { state: "Perfect",   description: "Deep golden bubbling across the surface. Dark spots visible — these are the best bites. Edges of the sauce are amber and slightly caramelized. An overwhelming smell of browned cheese fills the kitchen.", action: "Remove immediately. Transfer to a plate and serve within 90 seconds." },
          { state: "Overdone",  description: "Cheese is uniformly dark brown or black. Smoke is rising from the baking sheet. The acrid smell of burnt dairy fills the kitchen.", action: "Remove immediately. Scrape off the topmost blackened layer — the middle is likely still fine and melted underneath." },
        ],
      },
      feelCue: "Press the top of the finished croque lightly with a fingertip — the cheese crust should crack and give a slight crunch before yielding to the molten layer beneath, like pressing the surface of a freshly baked gratin.",
    },
  ],
};
