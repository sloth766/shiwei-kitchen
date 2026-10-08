export default {
  repoId: "master_french_creme_patissiere_001",
  parentRepoId: null,
  slug: "creme-patissiere",
  author: "ForkRecipe Kitchen",

  title: "Crème Pâtissière (Pastry Cream)",
  description: "The workhorse of the French pastry kitchen — a thick, deeply vanilla-scented cream that sets firm enough to pipe into éclairs or crown a tart, yet dissolves on the tongue into pure silk and warmth.",
  cuisine: "French",
  culture: "French",
  category: "desserts",

  tags: ["pastry-cream", "custard", "vanilla", "filling", "french", "classic", "base"],
  difficulty: 2,
  activeTime: "20 min",
  totalTime: "2 hours",
  ratioSystem: "parts",

  stars: 1870,
  forks: 423,
  contributors: 71,
  license: "CC-BY-SA",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",

  flavorRadar: { sweet: 4, salty: 0, sour: 0, bitter: 0, umami: 1, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Dairy",     name: "Whole milk",                             ratioValue: 500, defaultUnit: "ml",    substitutions: ["oat milk (less rich)"] },
    { ingId: "ing_02", role: "Aromatic",  name: "Vanilla bean, split and scraped (or 2 tsp extract)", ratioValue: 1, defaultUnit: "whole", substitutions: ["vanilla bean paste (1 tsp)"] },
    { ingId: "ing_03", role: "Protein",   name: "Egg yolks",                              ratioValue: 6,   defaultUnit: "whole", substitutions: [] },
    { ingId: "ing_04", role: "Sweetener", name: "Caster sugar",                           ratioValue: 120, defaultUnit: "g",     substitutions: [] },
    { ingId: "ing_05", role: "Starch",    name: "Cornflour (cornstarch)",                 ratioValue: 40,  defaultUnit: "g",     substitutions: ["plain flour (45 g, less glossy result)"] },
    { ingId: "ing_06", role: "Fat",       name: "Cold unsalted butter, cubed",            ratioValue: 30,  defaultUnit: "g",     substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Infuse",
      inputs: ["ing_01", "ing_02"],
      outputState: "infused_milk",
      instructions: "Split the vanilla bean lengthwise, scrape out the seeds, and add both pod and seeds to the milk in a medium saucepan. Heat over medium heat, stirring occasionally, until the milk just reaches a simmer — small bubbles at the edges, steam rising. Remove from heat, cover, and steep for 10 minutes to deepen the vanilla infusion. Remove the pod (rinse and dry it for vanilla sugar).",
      visualCue: {
        primaryTarget: "Milk with a golden tinge from the vanilla seeds, steaming gently. Vanilla seeds are evenly distributed — visible as tiny black specks throughout.",
        spectrum: [
          { state: "Underdone", description: "Milk is still cold and the vanilla colour has not developed. Seeds are clumped around the pod.", action: "Heat to a proper simmer and steep the full 10 minutes." },
          { state: "Perfect",   description: "Creamy, warm milk with a golden cast and fragrant vanilla steam. Vanilla specks evenly distributed.", action: "Whisk together the egg yolks, sugar, and cornflour while the milk steeps." },
          { state: "Overdone",  description: "Milk has boiled aggressively and reduced slightly. Surface may have a skin.", action: "Skim any skin, top up to 500 ml with cold milk, and proceed." },
        ],
      },
      feelCue: "The kitchen should be filled with the warm, almost floral scent of vanilla in warm dairy — not a sharp synthetic note, but a deep, rounded sweetness.",
    },
    {
      nodeId: "step_2",
      action: "Whisk",
      inputs: ["ing_03", "ing_04", "ing_05"],
      outputState: "yolk_paste",
      instructions: "In a large bowl, whisk the egg yolks and sugar together vigorously for 1–2 minutes until the mixture is pale, thick, and forms a ribbon. Sift in the cornflour and whisk again until completely smooth with no lumps. This paste must be completely lump-free or the finished cream will have starchy pockets.",
      visualCue: {
        primaryTarget: "A thick, pale-yellow paste that falls from the whisk in a wide, slow ribbon. Smooth with no cornflour lumps.",
        spectrum: [
          { state: "Underdone", description: "Still a thin, grainy yellow mixture. Cornflour lumps visible.", action: "Whisk more vigorously. All cornflour must be fully incorporated before tempering." },
          { state: "Perfect",   description: "Pale, thick, smooth. Falls in a wide ribbon. No lumps when held up to the light.", action: "Temper with the hot infused milk." },
          { state: "Overdone",  description: "Cannot over-whisk at this stage.", action: "Proceed to tempering." },
        ],
      },
      feelCue: "The paste should feel smooth and slightly starchy between the fingers — no grittiness, no powdery pockets. It should be thick enough to hold a soft mound when dropped from a spoon.",
    },
    {
      nodeId: "step_3",
      action: "Temper",
      inputs: ["yolk_paste", "infused_milk"],
      outputState: "tempered_custard",
      instructions: "Pour a ladleful of the hot infused milk into the egg yolk paste, whisking constantly and vigorously to raise the temperature of the yolks gently without scrambling them. Once combined, pour in the remaining hot milk in a slow, steady stream while whisking. Return the entire mixture to the saucepan.",
      visualCue: {
        primaryTarget: "A smooth, uniform, pale-yellow liquid with vanilla seeds throughout. No scrambled egg bits, no lumps.",
        spectrum: [
          { state: "Underdone", description: "Only a small amount of milk added and mixture is still cold and thick.", action: "Add more hot milk gradually, whisking continuously." },
          { state: "Perfect",   description: "Smooth, fluid, warm. All components combined. Vanilla seeds visible throughout. No egg lumps.", action: "Pour back into the saucepan and cook to set." },
          { state: "Overdone",  description: "Added milk too quickly without whisking — small flecks of cooked egg visible.", action: "Strain through a fine sieve before returning to the pan." },
        ],
      },
      feelCue: "The mixture should warm smoothly in the bowl as you whisk in the hot milk — you should feel it thin and loosen as each addition incorporates, with no sudden lumping or resistance.",
    },
    {
      nodeId: "step_4",
      action: "Boil",
      inputs: ["tempered_custard", "ing_06"],
      outputState: "finished_creme_patissiere",
      instructions: "Return the custard to the saucepan and cook over medium heat, whisking constantly and reaching into every corner of the pan. The mixture will first appear to thicken slightly, then will suddenly seize up and become very thick — keep whisking as it crosses from liquid to thick paste. This is the starch gelatinising. Crucially, once the cream has thickened, continue cooking at a full boil for 1–2 minutes, whisking hard, to cook out the raw starch flavour. Remove from heat, beat in the cold butter, and press cling film directly onto the surface. Refrigerate until cold and firm (at least 1.5 hours).",
      visualCue: {
        primaryTarget: "A thick, glossy, vanilla-specked cream that falls from the whisk in heavy, slow mounds. When a line is drawn through the surface with a finger, it holds cleanly.",
        spectrum: [
          { state: "Underdone", description: "The mixture is still runny or only loosely thickened. It will not set firm in the fridge. Starchy, raw flavour lingers.", action: "Continue cooking and whisking over medium heat — cook for the full 2 minutes at a boil after it thickens." },
          { state: "Perfect",   description: "Thick, glossy, and deeply fragrant. Holds its shape on the whisk. A finger drawn across the surface leaves a clean channel. Clean taste — no starchiness.", action: "Add cold butter, mix, cover surface with cling film, refrigerate." },
          { state: "Overdone",  description: "Cream has begun to stick to the pan and smells slightly of scorched starch. Surface is lumpy.", action: "Strain through a fine sieve immediately. Discard any scorched residue." },
        ],
      },
      feelCue: "At the moment the cream fully sets in the pan, the whisk will drag with sudden, dramatic resistance — this is the starch gelatinising all at once. Push through it and keep whisking for the full 2 minutes to cook out the floury taste.",
    },
  ],
};
