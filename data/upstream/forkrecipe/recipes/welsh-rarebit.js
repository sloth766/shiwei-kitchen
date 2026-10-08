export default {
  repoId: "master_british_welsh_rarebit_001",
  parentRepoId: null,
  slug: "welsh-rarebit",
  author: "ForkRecipe Kitchen",

  title: "Welsh Rarebit",
  description: "Not a cheese on toast but a cheese sauce — silky, beer-laced, and mustard-sharp — poured over bread and grilled until it bubbles and blisters into an amber, crater-pocked surface that collapses into richness with each bite.",
  cuisine: "British",
  culture: "Welsh",
  category: "sauces",

  tags: ["british", "cheese", "sauce", "beer", "toast"],
  difficulty: 1,
  activeTime: "15 min",
  totalTime: "20 min",
  ratioSystem: "parts",

  stars: 760,
  forks: 95,
  contributors: 12,
  license: "CC-BY-SA",
  createdAt: "2024-11-20",
  updatedAt: "2025-07-08",

  flavorRadar: { sweet: 0, salty: 4, sour: 1, bitter: 2, umami: 4, heat: 1 },

  ingredients: [
    { ingId: "ing_01", role: "Dairy",     name: "Mature cheddar, coarsely grated",              ratioValue: 100, defaultUnit: "parts", substitutions: ["gruyère", "sharp American cheddar"] },
    { ingId: "ing_02", role: "Liquid",    name: "Dark ale or stout",                             ratioValue: 25,  defaultUnit: "parts", substitutions: ["pale ale", "Worcestershire + water"] },
    { ingId: "ing_03", role: "Binder",    name: "Unsalted butter",                               ratioValue: 8,   defaultUnit: "parts", substitutions: ["salted butter (reduce added salt)"] },
    { ingId: "ing_04", role: "Spice",     name: "English mustard powder",                        ratioValue: 2,   defaultUnit: "parts", substitutions: ["Dijon mustard (double the amount)"] },
    { ingId: "ing_05", role: "Umami",     name: "Worcestershire sauce",                          ratioValue: 3,   defaultUnit: "parts", substitutions: ["soy sauce + tamarind"] },
    { ingId: "ing_06", role: "Structure", name: "Thick-cut bread (sourdough or bloomer)",        ratioValue: 40,  defaultUnit: "parts", substitutions: ["English muffin", "crumpet"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Toast",
      inputs: ["ing_06"],
      outputState: "toasted_bread",
      instructions: "Toast the bread under the grill (broiler) on one side only until golden-brown and firm. This single-sided toast means the underside stays slightly soft and absorbent — it will soak up the cheese sauce rather than repelling it. Do not toast both sides or the rarebit will slide off.",
      visualCue: {
        primaryTarget: "Top surface is golden-brown with darkened ridges on the high points. The underside remains pale and slightly pliable.",
        spectrum: [
          { state: "Underdone", description: "Top surface is barely colored, still soft and yielding. It will not hold the cheese sauce properly and may become soggy.", action: "Return under the grill for another minute until distinctly golden." },
          { state: "Perfect",   description: "Top surface is golden-amber with firm, dry crunch. High points have a slight char. The underside remains soft and white.", action: "Remove from grill and proceed to make the rarebit sauce while the bread is still warm." },
          { state: "Overdone",  description: "Top surface is dark brown or burnt in places. The bread is rigid throughout — the underside has dried out from heat.", action: "Proceed, but the base will be very crunchy. The burnt flavor may compete with the cheese." },
        ],
      },
      feelCue: "The toasted face should feel rigid and dry when pressed with a fingertip, while the bottom face gives slightly under pressure — this dual texture is the structural foundation of the dish.",
    },
    {
      nodeId: "step_2",
      action: "Melt",
      inputs: ["ing_03", "ing_02", "ing_04", "ing_05"],
      outputState: "beer_base",
      instructions: "Melt the butter in a small saucepan over low heat. Add the ale and bring to a gentle simmer — do not boil aggressively or the bitterness of the beer will dominate. Add the mustard powder and Worcestershire sauce and stir to combine. The base should be warm and unified before the cheese goes in.",
      visualCue: {
        primaryTarget: "A smooth, amber liquid that smells simultaneously of toasted hops, mustard, and butter. Slow, even bubbles at the surface.",
        spectrum: [
          { state: "Underdone", description: "Butter is just melted but the beer is cold. The mixture separates, with fat floating on top of ale.", action: "Continue heating gently — the mixture needs to reach a gentle simmer before the fat and liquid emulsify." },
          { state: "Perfect",   description: "Smooth, unified amber liquid. All components have merged into a fragrant, slightly frothy base. Temperature is just below a simmer.", action: "Reduce heat to the lowest setting and begin adding cheese." },
          { state: "Overdone",  description: "Beer has boiled and reduced significantly. Bitter, sharp hop aroma has intensified. Butter may have separated.", action: "Add a splash more beer and stir to reintegrate. Reduce heat before proceeding with the cheese." },
        ],
      },
      feelCue: "The beer base should smell tangy, malty, and buttery all at once — like a pub that also sells good cheese. This aroma means the alcohol has cooked off and the flavors are beginning to meld.",
    },
    {
      nodeId: "step_3",
      action: "Emulsify",
      inputs: ["beer_base", "ing_01"],
      outputState: "rarebit_sauce",
      instructions: "Add the grated cheese to the warm beer base in three or four additions, stirring constantly with a wooden spoon or spatula after each addition. Keep heat very low — the cheese should melt from residual heat, not direct heat. Overheating will cause the proteins to seize and the fat to separate. Stir in a figure-eight motion until completely smooth and glossy.",
      visualCue: {
        primaryTarget: "A thick, glossy, uniform sauce that flows slowly and coats a spoon heavily. No visible strings of protein or pools of separated fat.",
        spectrum: [
          { state: "Underdone", description: "Cheese has not fully melted — lumps and shreds are still visible. The sauce is stringy and uneven.", action: "Stir gently over very low heat for another 1–2 minutes until the lumps dissolve completely." },
          { state: "Perfect",   description: "Completely smooth, thick sauce with a glossy sheen. When you lift the spoon, the sauce falls in a slow, continuous ribbon. Color is deep golden-orange.", action: "Pour immediately over the toasted bread and grill at once." },
          { state: "Overdone",  description: "The sauce has broken — grainy, gritty texture with yellow fat pooling visibly on the surface. Proteins have seized from overheating.", action: "Remove from heat and whisk in a cold tablespoon of butter vigorously. This can partially rescue a broken cheese sauce." },
        ],
      },
      feelCue: "Dip a cold spoon into the rarebit sauce and lift it out — the sauce should cling to the metal surface in a thick, opaque layer without sliding off, like a béchamel. If it drips freely, stir longer. If it is grainy, the heat was too high.",
    },
    {
      nodeId: "step_4",
      action: "Grill",
      inputs: ["rarebit_sauce", "toasted_bread"],
      outputState: "finished_welsh_rarebit",
      instructions: "Ladle the rarebit sauce generously over the toasted side of the bread in a thick, even layer — at least 1cm deep. Place under a very hot grill (broiler) for 3–4 minutes until the surface is bubbling, blistered, and deeply golden-brown. Watch carefully: the difference between perfect and burnt is 30 seconds. Serve immediately on warmed plates.",
      visualCue: {
        primaryTarget: "The surface is domed and blistered with irregular dark-amber patches, like a gratin. The edges are slightly darker where they overhang the bread.",
        spectrum: [
          { state: "Underdone", description: "Surface is pale yellow with fine bubbles but no color. The sauce looks like it just came off the stove — no grilled character.", action: "Continue under the grill. The cheese surface needs to hit the Maillard reaction — color means flavor." },
          { state: "Perfect",   description: "Deep amber blistering with a few near-black char spots on the peaks. The sauce is puffed and set on the surface while still liquid beneath. A golden oil sheen glistens on the peaks.", action: "Slide onto warm plates and serve within 60 seconds — the crust collapses as it cools." },
          { state: "Overdone",  description: "Surface is dark brown and crackling. The burnt cheese smell is acrid. The sauce beneath has dried into a rubbery slab.", action: "The burnt top can be scraped off to reveal the molten cheese beneath. A cautionary tale for next time: never leave the grill unattended." },
        ],
      },
      feelCue: "The finished rarebit should feel heavy and molten when the plate is tilted — you can hear it shift slightly. Tapping the blistered surface with a spoon should give a hollow sound on the crust and a soft resistance beneath it.",
    },
  ],
};
