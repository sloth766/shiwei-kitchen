export default {
  repoId: "master_french_pate_brisee_001",
  parentRepoId: null,
  slug: "pate-brisee",
  author: "ForkRecipe Kitchen",

  title: "Pâte Brisée (Shortcrust Tart Pastry)",
  description: "A tender, crumbly French shortcrust — barely any water, cold butter rubbed to sand — that bakes to a pale, biscuity shell with enough structure to hold the wettest custard without turning to paste.",
  cuisine: "French",
  culture: "French",
  category: "breads",

  tags: ["pastry", "tart", "shortcrust", "french", "base", "butter", "baking"],
  difficulty: 2,
  activeTime: "20 min",
  totalTime: "1 hour 30 min",
  ratioSystem: "bakers_percentage",

  stars: 1330,
  forks: 241,
  contributors: 38,
  license: "CC-BY-SA",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",

  flavorRadar: { sweet: 1, salty: 1, sour: 0, bitter: 0, umami: 0, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure", name: "Plain flour (all-purpose)",           ratioValue: 100, defaultUnit: "%", substitutions: ["half plain, half almond flour (for richer shell)"] },
    { ingId: "ing_02", role: "Fat",       name: "Cold unsalted butter, small cubes",   ratioValue: 50,  defaultUnit: "%", substitutions: ["cold lard (flakier, less buttery)"] },
    { ingId: "ing_03", role: "Seasoning", name: "Fine salt",                           ratioValue: 0.5, defaultUnit: "%", substitutions: [] },
    { ingId: "ing_04", role: "Hydration", name: "Ice-cold water",                      ratioValue: 15,  defaultUnit: "%", substitutions: [] },
    { ingId: "ing_05", role: "Binder",    name: "Egg yolk",                            ratioValue: 5,   defaultUnit: "%", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Mix",
      inputs: ["ing_01", "ing_02", "ing_03"],
      outputState: "flour_butter_sand",
      instructions: "Place the flour and salt in a large bowl (or food processor). Add the cold butter cubes. Rub the butter into the flour with your fingertips, lifting and dropping the mixture from a height to aerate it, until the mixture resembles coarse, damp sand with no individual butter pieces larger than a pea. Work quickly — if your hands are warm, press the bowl against a cold surface. Alternatively, pulse in a food processor 8–10 times.",
      visualCue: {
        primaryTarget: "A pale, dry, coarse-sand texture with no visible butter lumps — but not yet a fine powder. Some larger pea-sized clumps are acceptable.",
        spectrum: [
          { state: "Underdone", description: "Large, identifiable butter pieces still visible among the flour. The mixture looks floury with butter lumps.", action: "Continue rubbing, focusing on breaking down each butter cube individually." },
          { state: "Perfect",   description: "The mixture resembles damp breadcrumbs or coarse sand. Butter is distributed but not invisible. Lifts and falls freely.", action: "Make a well in the centre and add the egg yolk and water." },
          { state: "Overdone",  description: "The mixture looks uniform and pale — butter has melted into the flour. Feels greasy and warm.", action: "Refrigerate the entire mixture for 15 minutes before adding water. The pastry will be less crumbly but can still be used." },
        ],
      },
      feelCue: "Work with cold hands and a light touch — the mixture should feel cool and dry, flowing between your fingers like wet sand, with very faint oiliness from the butter coating the flour particles.",
    },
    {
      nodeId: "step_2",
      action: "Mix",
      inputs: ["flour_butter_sand", "ing_04", "ing_05"],
      outputState: "pastry_dough",
      instructions: "Beat together the egg yolk and ice-cold water in a small bowl. Make a well in the flour-butter mixture and pour in the egg-water. Using a fork or a pastry cutter, bring the dough together with minimal mixing — use a chopping and stirring motion, not kneading. The dough will look shaggy and barely coherent. As soon as it comes together when you squeeze a handful in your fist, stop. Turn out onto a lightly floured surface and press together into a flat disc. Do not knead.",
      visualCue: {
        primaryTarget: "A rough, shaggy disc that barely holds together when pressed — not a smooth ball. There should still be visible texture on the surface.",
        spectrum: [
          { state: "Underdone", description: "Mixture is still very crumbly and will not hold together even when squeezed. Dry and powdery.", action: "Add ice-cold water, one teaspoon at a time, mixing with the fork." },
          { state: "Perfect",   description: "Shaggy and rough-surfaced but cohesive when pressed firmly. No wet, sticky patches. Holds its shape as a disc.", action: "Wrap and refrigerate for at least 45 minutes." },
          { state: "Overdone",  description: "Dough has been over-worked and is smooth like bread dough. It may look elastic.", action: "Refrigerate for 1 hour. The gluten needs to relax or the pastry will shrink dramatically in the tin." },
        ],
      },
      feelCue: "The dough should feel almost crumbly in your hands — press a piece firmly and it holds, but it has no give or elasticity. It is cool, slightly rough-textured, and holds its shape without sticking to your palms.",
    },
    {
      nodeId: "step_3",
      action: "Rest",
      inputs: ["pastry_dough"],
      outputState: "rested_pastry",
      instructions: "Wrap the disc tightly in cling film and refrigerate for at least 45 minutes, or up to 3 days. This rest allows the gluten to relax (so it does not shrink when baked) and the butter to firm up again (so it stays in distinct layers). Remove from the fridge 5–10 minutes before rolling if very hard.",
      visualCue: {
        primaryTarget: "A firm, cold disc of dough that holds its shape when pressed and shows no sign of the butter melting or the dough warming.",
        spectrum: [
          { state: "Underdone", description: "Dough is still pliable and slightly warm from handling. Rolling now will cause shrinkage.", action: "Refrigerate for the full 45 minutes minimum." },
          { state: "Perfect",   description: "Firm, cold, and slightly resistant to pressing. The butter is re-solidified throughout.", action: "Roll out on a lightly floured surface to 3–4 mm thickness." },
          { state: "Overdone",  description: "The dough is very hard and cracks at the edges when pressed — it has been refrigerated too long or is too cold.", action: "Allow to soften at room temperature for 5-10 minutes before rolling." },
        ],
      },
      feelCue: "A properly rested pâte brisée feels like cold plasticine — firm but manageable, with no stickiness and no elasticity fighting back when you press it.",
    },
    {
      nodeId: "step_4",
      action: "Bake",
      inputs: ["rested_pastry"],
      outputState: "blind_baked_pate_brisee",
      instructions: "Roll the rested dough on a lightly floured surface to 3–4 mm thickness. Line a 23 cm tart tin, pressing gently into the corners. Trim the edge and prick the base lightly with a fork. Freeze for 15 minutes. Line with parchment and fill with baking beans or rice. Blind bake at 180 C for 15–18 minutes, remove beans, brush the base with a little beaten egg, and return for 5–8 minutes until the base is dry and golden. The egg wash seals the pastry against wet fillings.",
      visualCue: {
        primaryTarget: "A dry, evenly pale-gold shell that releases cleanly from the tin and shows no grey wet patches. The base is firm and sounds hollow when tapped.",
        spectrum: [
          { state: "Underdone", description: "The base remains pale and soft — grey or translucent in colour. Flexes when pressed.", action: "Return to the oven without the beans until fully dried. A wet base ruins the tart." },
          { state: "Perfect",   description: "Pale gold, dry, firm. The sides are lightly coloured. A hollow tap on the base. Egg-washed base has a faint sheen.", action: "Fill with desired filling and finish baking, or allow to cool and fill with a no-bake filling." },
          { state: "Overdone",  description: "Edges and base are deeply golden, approaching biscuit-brown. The pastry smells nutty.", action: "Still excellent. A slightly darker shell adds flavour that complements most fillings." },
        ],
      },
      feelCue: "Lift the shell — it should feel crisp and rigid, with no soft flex at the base. The sides and base should be uniform in colour and temperature, not pale and cold in the centre.",
    },
  ],
};
