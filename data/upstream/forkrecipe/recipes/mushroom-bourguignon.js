export default {
  repoId: "master_french_mushroom_bourguignon_001",
  parentRepoId: null,
  slug: "mushroom-bourguignon",
  author: "ForkRecipe Kitchen",

  title: "Mushroom Bourguignon",
  description: "A braise of wild and cultivated mushrooms surrendered to Burgundy wine until the broth is thick, deeply violet, and perfumed with thyme — all the gravity of boeuf bourguignon, none of the beef.",
  cuisine: "French",
  culture: "Burgundian",
  category: "vegetables",

  tags: ["french", "mushroom", "vegan", "red-wine", "bourguignon"],
  difficulty: 2,
  activeTime: "30 min",
  totalTime: "1 hr 20 min",
  ratioSystem: "parts",

  stars: 1843,
  forks: 214,
  contributors: 31,
  license: "CC-BY-SA",
  createdAt: "2024-03-10",
  updatedAt: "2025-11-22",

  flavorRadar: { sweet: 1, salty: 3, sour: 2, bitter: 2, umami: 5, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Mixed mushrooms (cremini, shiitake, king oyster), roughly torn", ratioValue: 100, defaultUnit: "parts", substitutions: ["portobello", "porcini"] },
    { ingId: "ing_02", role: "Allium",     name: "Shallots, quartered",                                            ratioValue: 20,  defaultUnit: "parts", substitutions: ["pearl onions"] },
    { ingId: "ing_03", role: "Solvent",    name: "Burgundy or other dry red wine",                                 ratioValue: 40,  defaultUnit: "parts", substitutions: ["Pinot Noir", "Merlot"] },
    { ingId: "ing_04", role: "Liquid",     name: "Vegetable stock",                                                ratioValue: 40,  defaultUnit: "parts", substitutions: ["mushroom stock", "water"] },
    { ingId: "ing_05", role: "Fat",        name: "Olive oil",                                                      ratioValue: 8,   defaultUnit: "parts", substitutions: ["vegan butter"] },
    { ingId: "ing_06", role: "Herb",       name: "Fresh thyme sprigs and bay leaves",                              ratioValue: 2,   defaultUnit: "parts", substitutions: ["dried thyme"] },
    { ingId: "ing_07", role: "Seasoning",  name: "Fine sea salt and black pepper",                                 ratioValue: 2,   defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Sear",
      inputs: ["ing_01", "ing_05", "ing_07"],
      outputState: "seared_mushrooms",
      instructions: "Heat olive oil in a wide, heavy-bottomed pot or Dutch oven over high heat until shimmering. Add mushrooms in a single layer — work in batches if needed. Season with salt and do not stir for 2 minutes. Allow the mushrooms to release their moisture and then re-absorb it, developing a deep mahogany sear on each cut face.",
      visualCue: {
        primaryTarget: "Each mushroom piece carries a deep golden-brown crust on at least one side. The bottom of the pot is dry and beginning to show fond.",
        spectrum: [
          { state: "Underdone", description: "Mushrooms are steaming and pale, moisture pooling in the pot. No colour has developed.", action: "Increase heat and wait — do not stir. Stirring releases more moisture and prevents browning." },
          { state: "Perfect",   description: "Rich mahogany sear on the flat faces. Fond (brown bits) coating the pot bottom. Mushrooms have reduced by about a third.", action: "Transfer to a bowl and sear the next batch." },
          { state: "Overdone",  description: "Mushrooms are very dark, nearly black at the edges. Fond on the pot is nearly burnt.", action: "Deglaze immediately with a splash of wine. Reduce heat before the next batch." },
        ],
      },
      feelCue: "The mushrooms should feel significantly lighter and denser than when raw — the moisture has cooked off and their fibres have tightened, like squeezing a sponge.",
    },
    {
      nodeId: "step_2",
      action: "Sweat",
      inputs: ["ing_02", "ing_05"],
      outputState: "softened_shallots",
      instructions: "In the same pot over medium heat, add shallots. Cook, stirring occasionally, for 6–8 minutes until softened and golden at the edges. The shallots should be translucent throughout but still hold their shape. Scrape up any remaining fond with a wooden spoon as the shallots release their liquid.",
      visualCue: {
        primaryTarget: "Shallots are translucent and limp, edges faintly golden, sitting in a thin glaze of their own juice.",
        spectrum: [
          { state: "Underdone", description: "Shallots are still firm and opaque white in the centre. Raw allium sharpness is still dominant.", action: "Continue cooking at medium heat. Adding the wine now will halt softening and leave a raw bite." },
          { state: "Perfect",   description: "Fully translucent, slightly golden, sweet-smelling. They collapse gently when pressed with a spoon.", action: "Add the wine and herbs." },
          { state: "Overdone",  description: "Shallots are deeply brown, shrinking to caramel. Edges are catching.", action: "Add a splash of stock to arrest the browning. The flavour will be sweeter and more intense but still usable." },
        ],
      },
      feelCue: "The kitchen should fill with a sweet, caramelised onion perfume — if you still smell raw sharpness, the shallots need more time.",
    },
    {
      nodeId: "step_3",
      action: "Reduce",
      inputs: ["softened_shallots", "ing_03", "ing_06"],
      outputState: "reduced_wine_base",
      instructions: "Pour the red wine into the pot with the shallots and add the thyme and bay leaves. Raise heat to medium-high and bring to a boil. Reduce the wine by half, about 8–10 minutes. This cooks off alcohol, concentrates fruit, and allows the tannins to mellow before the mushrooms rejoin.",
      visualCue: {
        primaryTarget: "The wine has reduced to a deep, glossy purple syrup coating the shallots. Volume has dropped by roughly half.",
        spectrum: [
          { state: "Underdone", description: "Wine is still thin and alcoholic-smelling. Steam is sharp and eye-watering.", action: "Continue reducing. Adding stock now will trap the alcohol and give a harsh, boozy flavour." },
          { state: "Perfect",   description: "Wine is concentrated and glossy, smells of dark fruit and earth. The alcohol sharpness has gone. Volume has halved.", action: "Add the stock and seared mushrooms." },
          { state: "Overdone",  description: "Wine has reduced to a sticky, near-dry glaze. Tannins smell harsh and burnt.", action: "Add stock immediately. The flavour will be very intense — you may need to balance with a small pinch of sugar at the end." },
        ],
      },
      feelCue: "Dip a spoon and let a drop fall — it should form a distinct bead that holds briefly before spreading, not disappear instantly into the pan.",
    },
    {
      nodeId: "step_4",
      action: "Braise",
      inputs: ["reduced_wine_base", "seared_mushrooms", "ing_04"],
      outputState: "braised_bourguignon",
      instructions: "Return the seared mushrooms to the pot, pour in the vegetable stock, and stir to combine. Bring to a gentle simmer, then reduce heat to low. Cover partially and cook for 40–45 minutes, stirring every 10 minutes. The liquid should maintain a slow, lazy bubble throughout — aggressive boiling will toughen the mushrooms.",
      visualCue: {
        primaryTarget: "The broth has turned deep garnet and thickened to coat a spoon. Mushrooms are very tender and have absorbed the wine colour throughout.",
        spectrum: [
          { state: "Underdone", description: "Broth is thin and light-coloured. Mushrooms still have some resistance when bitten. Flavours taste separate.", action: "Continue simmering uncovered to concentrate. Give it another 15 minutes." },
          { state: "Perfect",   description: "Broth is thick, garnet, and glossy. It coats a spoon and runs off slowly. Mushrooms are silky and yielding. Flavours are unified and deep.", action: "Taste, adjust seasoning, and serve." },
          { state: "Overdone",  description: "Broth has reduced to a thick, almost paste-like consistency. Mushrooms are very soft and collapsing.", action: "Add a splash of stock to loosen. The flavour will be very concentrated — taste before adding more salt." },
        ],
      },
      feelCue: "The broth should feel velvety on a fingertip — not watery, not sticky, but with a gentle body that clings slightly when you rub your fingers together.",
    },
  ],
};
