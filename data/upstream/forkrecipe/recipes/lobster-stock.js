export default {
  repoId: "master_french_lobster_stock_001",
  parentRepoId: null,
  slug: "lobster-stock",
  author: "ForkRecipe Kitchen",

  title: "Lobster Shell Stock",
  description: "Roasted lobster shells and heads reduced with aromatic vegetables, cognac, tarragon, and tomato into a deep orange, intensely seafood-rich base — the foundation for bisque, sauce Américaine, and any dish that demands the concentrated soul of a crustacean in a spoonful.",
  cuisine: "French",
  culture: "French",
  category: "stocks",

  tags: ["french", "seafood", "stock", "bisque-base", "lobster", "shellfish"],
  difficulty: 3,
  activeTime: "45 min",
  totalTime: "2 hours",
  ratioSystem: "weight",

  stars: 0, forks: 0, contributors: 1, license: "CC-BY-SA",
  createdAt: "2026-06-27", updatedAt: "2026-06-27",

  flavorRadar: { sweet: 1, salty: 3, sour: 1, bitter: 1, umami: 5, heat: 1 },

  ingredients: [
    { ingId: "ing_01", role: "Inosinate", name: "Lobster shells and heads (from 2 lobsters, roughly cracked)", ratioValue: 700, defaultUnit: "g", substitutions: ["crayfish shells", "large shrimp shells (weaker but available)"] },
    { ingId: "ing_02", role: "Fat",       name: "Unsalted butter",                          ratioValue: 40,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_03", role: "Fat",       name: "Extra-virgin olive oil",                  ratioValue: 30,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_04", role: "Allium",    name: "Shallots, thinly sliced",                 ratioValue: 100, defaultUnit: "g", substitutions: ["yellow onion"] },
    { ingId: "ing_05", role: "Aromatic",  name: "Carrot, finely diced",                   ratioValue: 100, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_06", role: "Aromatic",  name: "Celery stalk, finely diced",             ratioValue: 60,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_07", role: "Allium",    name: "Garlic cloves, smashed",                 ratioValue: 20,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_08", role: "Liquid",    name: "Tomato paste",                           ratioValue: 40,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_09", role: "Liquid",    name: "Crushed canned tomatoes",               ratioValue: 150, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_10", role: "Solvent",   name: "Cognac or Armagnac",                    ratioValue: 80,  defaultUnit: "g", substitutions: ["dry sherry", "Calvados"] },
    { ingId: "ing_11", role: "Liquid",    name: "Dry white wine",                         ratioValue: 200, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_12", role: "Hydration", name: "Cold water or fish stock",               ratioValue: 1500, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_13", role: "Herb",      name: "Fresh tarragon sprigs",                  ratioValue: 15,  defaultUnit: "g", substitutions: ["dried tarragon (1 tsp)"] },
    { ingId: "ing_14", role: "Herb",      name: "Bay leaves",                             ratioValue: 4,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_15", role: "Spice",     name: "Black peppercorns",                      ratioValue: 6,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_16", role: "Spice",     name: "Dried chili flakes or cayenne",          ratioValue: 2,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_17", role: "Seasoning", name: "Fine sea salt",                          ratioValue: 6,   defaultUnit: "g", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Roast",
      inputs: ["ing_01", "ing_03"],
      outputState: "roasted_shells",
      instructions: "Spread cracked lobster shells and heads on a large, rimmed baking sheet. Drizzle with olive oil and toss to coat. Roast at 220 C (425 F) for 15–20 minutes, turning once, until the shells are deeply caramelized — red-orange turning to mahogany — and the oven smells of roasted seafood. This Maillard reaction on the shells is the source of the stock's depth.",
      visualCue: {
        primaryTarget: "Shells have turned a deep reddish-mahogany, some with dark caramelized spots. The baking tray is coated in orange-red fat and juices. The kitchen smells powerfully of roasted crustacean.",
        spectrum: [
          { state: "Underdone", description: "Shells are still bright orange-red, wet, and barely colored.", action: "Return to oven for 5–8 more minutes — underdone shells produce a flat, grey stock." },
          { state: "Perfect",   description: "Deep reddish-mahogany shells with caramelized spots. Rendered tomalley and shell fat pooling on the tray.", action: "Transfer immediately to the stockpot and deglaze the tray." },
          { state: "Overdone",  description: "Shells are blackening and a scorched, bitter smell is present.", action: "Remove immediately. Discard any shell that is truly black. A few dark spots are acceptable." },
        ],
      },
      feelCue: "The roasting shells should feel brittle and dry — no longer wet. They should crackle when broken, not bend. The smell in the oven should be intensely savory and slightly sweet, like a concentrated broth.",
    },
    {
      nodeId: "step_2",
      action: "Sauté",
      inputs: ["roasted_shells", "ing_02", "ing_04", "ing_05", "ing_06", "ing_07"],
      outputState: "sauteed_aromatics_with_shells",
      instructions: "Transfer roasted shells to a large stockpot. Add butter and sauté the shallots, carrot, celery, and garlic directly in the pot with the shells over medium-high heat for 5–7 minutes until the vegetables are softened and golden. Deglaze the roasting tray with a splash of wine and scrape all the caramelized bits into the pot.",
      visualCue: {
        primaryTarget: "Softened, golden vegetables nestled around the roasted shells. All the caramelized fond from the roasting tray has been incorporated.",
        spectrum: [
          { state: "Underdone", description: "Vegetables are barely translucent. Fond from the roasting tray not yet deglazed.", action: "Continue sautéing and deglaze the tray immediately." },
          { state: "Perfect",   description: "Golden, soft vegetables. Fond fully incorporated. Pot smells of butter, shells, and softened aromatics.", action: "Add tomato paste and cook." },
          { state: "Overdone",  description: "Vegetables are beginning to burn in the shell fat.", action: "Add a splash of water to stop browning and proceed." },
        ],
      },
      feelCue: "The fond scraped from the roasting tray should lift easily with a spatula and dissolve into the liquid — if it resists, the deglaze liquid was not hot enough. Apply more heat to the liquid and scrape again.",
    },
    {
      nodeId: "step_3",
      action: "Deglaze",
      inputs: ["sauteed_aromatics_with_shells", "ing_08", "ing_10", "ing_11"],
      outputState: "deglazed_shell_base",
      instructions: "Add tomato paste to the pot and stir over medium-high heat for 2–3 minutes until the paste darkens and caramelizes. Remove the pot from the heat briefly and pour in the cognac — step back, the alcohol will ignite if using a gas flame. Let the flame die down or alcohol cook off for 30 seconds. Return to heat, add white wine, and bring to a boil. Reduce the wine by half.",
      visualCue: {
        primaryTarget: "A deep, brick-red, concentrated paste clinging to the shells. The wine reduction is rich and glossy, not watery.",
        spectrum: [
          { state: "Underdone", description: "Tomato paste is still bright red, not caramelized. Cognac smells raw.", action: "Cook tomato paste longer — it should darken. Allow all alcohol to cook off before adding water." },
          { state: "Perfect",   description: "Paste is dark burgundy. Cognac is fully reduced. White wine has reduced by half and smells sweet and savory.", action: "Add tomatoes, water, and herbs." },
          { state: "Overdone",  description: "Wine has reduced too far. Paste is scorching.", action: "Add water immediately to rescue." },
        ],
      },
      feelCue: "Taste the reduction at this point — it should be intensely seafood-flavored, sweet from the wine and cognac, sharp and complex. This concentrated base is the soul of the stock.",
    },
    {
      nodeId: "step_4",
      action: "Simmer",
      inputs: ["deglazed_shell_base", "ing_09", "ing_12", "ing_13", "ing_14", "ing_15", "ing_16", "ing_17"],
      outputState: "simmering_stock",
      instructions: "Add crushed tomatoes, cold water or fish stock, tarragon, bay leaves, peppercorns, chili, and salt. Bring to a gentle boil, then reduce to a slow simmer. Skim any foam from the surface in the first 15 minutes. Simmer uncovered for 45–60 minutes, until the stock has reduced by approximately one-third and is deeply flavored and a rich orange-red color.",
      visualCue: {
        primaryTarget: "A deep orange-red stock with a gentle lazy simmer. The surface has a slight orange oil sheen from the shell fat and tomato. Visibly more concentrated than when the water was added.",
        spectrum: [
          { state: "Underdone", description: "Stock is pale, thin, and watery. Flavor is weak and flat.", action: "Continue simmering uncovered — reduction is essential." },
          { state: "Perfect",   description: "Deep orange-red. Reduced by one-third. Intensely shellfish-flavored with tarragon brightness. Coats the back of a spoon with a very light body.", action: "Strain through a fine-mesh strainer, pressing shells firmly." },
          { state: "Overdone",  description: "Stock is very thick, dark, and over-salted — has reduced too far.", action: "Dilute with cold water and taste again." },
        ],
      },
      feelCue: "Skim a small amount from the surface on a spoon and cool it briefly — a perfect bisque-base stock should feel slightly silky and have a perceptible viscosity from the gelatin in the shells and tomato. It should never feel watery.",
    },
    {
      nodeId: "step_5",
      action: "Strain",
      inputs: ["simmering_stock"],
      outputState: "finished_lobster_stock",
      instructions: "Remove from heat. Pour the stock through a fine-mesh strainer placed over a large bowl. Press the shells firmly with the back of a ladle to extract every last drop of flavor. Strain a second time through a cheesecloth-lined strainer for maximum clarity if using for a refined bisque. Taste and adjust seasoning. Cool rapidly over an ice bath and refrigerate for up to 3 days, or freeze in small portions.",
      visualCue: {
        primaryTarget: "A glowing, clear orange-red stock — the color of a deep sunset. Not murky, not pale. A thin glossy layer of orange shell fat on the surface.",
        spectrum: [
          { state: "Underdone", description: "Stock is very pale orange-pink — not enough flavor extracted from the shells.", action: "Press shells harder and re-simmer the strained stock for another 20 minutes." },
          { state: "Perfect",   description: "Deep, luminous orange-red. Clear when held to light. The surface shimmers with shellfish fat. Taste is intensely sweet, savory, oceanic.", action: "Cool and refrigerate or freeze." },
          { state: "Overdone",  description: "Stock is murky and dark from over-pressing shells.", action: "Re-strain through a cheesecloth. The flavor is excellent; only the appearance is affected." },
        ],
      },
      feelCue: "Press a spoonful of the finished stock between your thumb and forefinger — it should feel slightly stickier than water, with a whisper of body from the natural gelatin. This tackiness is the promise of a bisque that clings to every spoonful.",
    },
  ],
};
