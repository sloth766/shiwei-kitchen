export default {
  repoId: "master_turkish_borek_001",
  parentRepoId: null,
  slug: "borek",
  author: "ForkRecipe Kitchen",

  title: "Börek (Turkish Phyllo Pastry)",
  description: "Tissue-thin sheets of yufka phyllo layered in spirals with salty white cheese and wilted spinach, brushed with eggy milk between every crackling layer — baked until the exterior shatters into translucent flakes while the interior stays moist, savory, and molten.",
  cuisine: "Turkish",
  culture: "Turkish",
  category: "breads",

  tags: ["turkish", "phyllo", "feta", "spinach", "baked"],
  difficulty: 3,
  activeTime: "45 min",
  totalTime: "1 hr 15 min",
  ratioSystem: "parts",

  stars: 1432,
  forks: 119,
  contributors: 16,
  license: "CC-BY-SA",
  createdAt: "2025-01-20",
  updatedAt: "2025-11-08",

  flavorRadar: { sweet: 0, salty: 3, sour: 0, bitter: 0, umami: 2, heat: 1 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Yufka sheets or thin phyllo dough (thawed if frozen)",    ratioValue: 100, defaultUnit: "parts", substitutions: ["standard phyllo (use more sheets)"] },
    { ingId: "ing_02", role: "Dairy",      name: "White Turkish cheese (beyaz peynir) or Greek feta, crumbled", ratioValue: 40, defaultUnit: "parts", substitutions: ["ricotta + feta blend", "cottage cheese + salt"] },
    { ingId: "ing_03", role: "Aromatic",   name: "Fresh spinach, washed and roughly chopped",                ratioValue: 30,  defaultUnit: "parts", substitutions: ["frozen spinach (well-squeezed)", "silverbeet"] },
    { ingId: "ing_04", role: "Binder",     name: "Eggs",                                                      ratioValue: 15,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Dairy",      name: "Whole milk (for brushing mixture)",                         ratioValue: 20,  defaultUnit: "parts", substitutions: ["sparkling water for crispier layers"] },
    { ingId: "ing_06", role: "Fat",        name: "Olive oil or melted butter (for brushing and filling)",     ratioValue: 25,  defaultUnit: "parts", substitutions: ["a blend of both"] },
    { ingId: "ing_07", role: "Spice",      name: "Dried red chilli flakes and black pepper",                  ratioValue: 2,   defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Prepare filling",
      inputs: ["ing_02", "ing_03", "ing_07"],
      outputState: "borek_filling",
      instructions: "If using fresh spinach, place in a dry skillet over high heat for 2 minutes until wilted. Transfer to a clean kitchen towel and squeeze hard — the spinach must be as dry as possible or it will make the börek soggy. Roughly chop the squeezed spinach. Combine with crumbled cheese, chilli flakes, and black pepper in a bowl. Mix until evenly combined. Do not add salt — the cheese provides enough.",
      visualCue: {
        primaryTarget: "A cohesive, slightly rough filling with dark green spinach and white cheese crumbles evenly distributed. The mixture should hold its shape when pressed into a mound but not be wet or liquid.",
        spectrum: [
          { state: "Underdone", description: "Spinach is not fully wilted — some raw, bright green leaves remain. The filling is wet, with liquid pooling at the bottom of the bowl.", action: "Squeeze the spinach more aggressively. Wet filling is the most common cause of soggy börek. Press into a ball in the towel and wring." },
          { state: "Perfect",   description: "Dark, compact, well-integrated filling. No standing liquid in the bowl. The mixture holds a shape when pressed. The smell is grassy-mineral from the spinach and salty from the cheese.", action: "Set aside and prepare the brushing mixture." },
          { state: "Overdone",  description: "Spinach was overcooked in the pan and has turned khaki-grey and very dry. The filling is crumbly rather than cohesive.", action: "Add a tablespoon of olive oil to bind. The flavor will be fine; the slightly grey color is acceptable." },
        ],
      },
      feelCue: "Grab a handful of the spinach-cheese filling and squeeze it — only the faintest trace of moisture should appear between your fingers, like pressing a just-squeezed, near-dry sponge.",
    },
    {
      nodeId: "step_2",
      action: "Whisk",
      inputs: ["ing_04", "ing_05", "ing_06"],
      outputState: "brushing_mixture",
      instructions: "Whisk together the eggs, milk, and olive oil in a bowl until completely combined. This brushing mixture is what makes the börek layers fuse into a coherent pastry rather than staying as separate dry sheets. It should be pale yellow, slightly frothy, and pourable. Prepare this just before assembling.",
      visualCue: {
        primaryTarget: "A smooth, pale yellow, frothy liquid that looks like thin French toast batter. The oil is fully emulsified — no visible pools of oil floating on the surface.",
        spectrum: [
          { state: "Underdone", description: "Oil and egg are not fully combined — pools of oil visible on the surface. The mixture is two-toned.", action: "Whisk more vigorously. The oil must be incorporated to distribute fat evenly across all layers." },
          { state: "Perfect",   description: "Uniformly pale gold, slightly frothy, with the consistency of thin cream. Oil is fully incorporated and invisible.", action: "Use immediately — this will begin to separate if left too long." },
          { state: "Overdone",  description: "Over-whisked — the mixture is very frothy and thick with foam. The foam will bake into large bubbles rather than a even coating.", action: "Let sit 2 minutes for foam to settle, then use." },
        ],
      },
      feelCue: "Dip your finger into the brushing mixture — it should coat your skin evenly in a thin golden film that doesn't run off instantly but also doesn't cling in thick drops.",
    },
    {
      nodeId: "step_3",
      action: "Assemble",
      inputs: ["borek_filling", "brushing_mixture", "ing_01"],
      outputState: "assembled_borek",
      instructions: "Brush a 30x20cm baking dish with the egg-milk mixture. Lay a sheet of yufka in the dish, letting it overhang the sides. Brush generously with the egg mixture. Repeat with 2 more sheets, brushing each. Spread the filling across the center in an even layer. Fold the overhanging edges over the filling. Layer 3 more sheets on top, brushing each generously. The top layer should be brushed last. For a cigar or spiral börek, lay filling along the long edge of a sheet and roll tightly, then coil into the dish.",
      visualCue: {
        primaryTarget: "A neat, multi-layered rectangle or coiled spiral in the baking dish, every layer glistening with the egg-milk wash. The filling is entirely enclosed with no gaps.",
        spectrum: [
          { state: "Underdone", description: "Not enough brushing mixture applied — layers look dry and pale. Sheets are cracking and tearing without binding. Filling is visible through gaps.", action: "Brush more generously. Every centimeter of phyllo must be moistened for the layers to fuse during baking." },
          { state: "Perfect",   description: "Every layer is glistening but not soaking wet. The assembled börek holds its shape when the dish is lifted. The filling is completely sealed inside.", action: "Refrigerate 10 minutes to firm, then bake." },
          { state: "Overdone",  description: "Too much brushing mixture has made the layers soggy. The assembled börek is slumping and wet-looking. Liquid pools in the dish.", action: "Proceed to baking — excess moisture will evaporate. The börek may be slightly denser but will still bake through." },
        ],
      },
      feelCue: "Press the assembled börek lightly with a flat palm — it should feel uniformly moist and slightly springy across its surface, not crackly-dry in some spots and sodden in others.",
    },
    {
      nodeId: "step_4",
      action: "Bake",
      inputs: ["assembled_borek"],
      outputState: "finished_borek",
      instructions: "Preheat the oven to 190°C (375°F). Brush the top of the börek generously with the remaining egg-milk mixture and scatter sesame seeds if desired. Bake for 30–35 minutes until the top is a deep, uniform golden-brown and the pastry sounds hollow when tapped. The edges should be pulling away from the dish slightly. Rest 5 minutes before slicing — this allows the layers to set slightly so the börek holds its shape when cut.",
      visualCue: {
        primaryTarget: "A uniformly deep golden-brown surface with slightly darker edges. The top is crisp and lacquered. A cut corner reveals distinct, defined layers with moist filling visible.",
        spectrum: [
          { state: "Underdone", description: "Top is pale golden and still soft to the touch. The pastry gives under pressure rather than crackling. A knife inserted in the center comes out wet and the filling is still cold.", action: "Return to oven for 5-minute intervals. The exterior must be genuinely crisp for the börek to hold its shape when sliced." },
          { state: "Perfect",   description: "Deep golden-brown, crisp top that crackles when pressed. The edges are pulling away from the dish. A knife inserted comes out hot and the filling is set and steaming.", action: "Rest 5 minutes, then slice into squares or wedges and serve." },
          { state: "Overdone",  description: "Top is dark brown with blackened patches. The pastry smell is starting to turn acrid and over-baked.", action: "Cover with foil and reduce heat to 160°C for 5 more minutes if the center still seems underdone. Otherwise remove and rest." },
        ],
      },
      feelCue: "Tap the center of the finished börek with a knuckle — it should produce a clear, hollow crack, like tapping the top of a ripe watermelon, not the muted thud of dense, uncooked dough.",
    },
  ],
};
