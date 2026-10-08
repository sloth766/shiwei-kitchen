export default {
  repoId: "master_american_buttermilk_biscuits_001",
  parentRepoId: null,
  slug: "buttermilk-biscuits",
  author: "ForkRecipe Kitchen",

  title: "Buttermilk Biscuits",
  description: "Tall, cloud-layered biscuits with a shattering golden crust and a soft, tangy interior — every pull-apart reveals a network of delicate, butter-laced flakes that no store-bought biscuit has ever achieved.",
  cuisine: "American",
  culture: "Southern",
  category: "breads",

  tags: ["southern", "biscuits", "buttermilk", "flaky", "breads"],
  difficulty: 2,
  activeTime: "20 min",
  totalTime: "40 min",
  ratioSystem: "bakers_percentage",

  stars: 1923,
  forks: 201,
  contributors: 22,
  license: "CC-BY-SA",
  createdAt: "2024-11-12",
  updatedAt: "2025-09-05",

  flavorRadar: { sweet: 1, salty: 2, sour: 1, bitter: 0, umami: 1, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure", name: "All-purpose flour (plus more for dusting)",       ratioValue: 100, defaultUnit: "%", substitutions: ["White Lily flour (Southern low-protein)", "cake flour (extra tender)"] },
    { ingId: "ing_02", role: "Leavener",  name: "Baking powder (aluminum-free)",                  ratioValue: 3.5, defaultUnit: "%", substitutions: [] },
    { ingId: "ing_03", role: "Leavener",  name: "Baking soda",                                    ratioValue: 0.5, defaultUnit: "%", substitutions: [] },
    { ingId: "ing_04", role: "Seasoning", name: "Fine sea salt",                                  ratioValue: 1.5, defaultUnit: "%", substitutions: ["kosher salt"] },
    { ingId: "ing_05", role: "Fat",       name: "Unsalted butter, very cold, cut into 1cm cubes", ratioValue: 30,  defaultUnit: "%", substitutions: ["lard (more flavorful)", "shortening (more lift)"] },
    { ingId: "ing_06", role: "Acid",      name: "Full-fat buttermilk, ice-cold",                  ratioValue: 65,  defaultUnit: "%", substitutions: ["whole milk + 1 tbsp white vinegar (rest 5 min)", "kefir"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Mix dry ingredients and cut in butter",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_04", "ing_05"],
      outputState: "shaggy_dry_mix",
      instructions: "Whisk together the flour, baking powder, baking soda, and salt in a large bowl. Add the cold butter cubes. Using your fingertips, quickly break the butter into the flour — smear each cube between your thumbs and fingers, working fast so body heat does not soften the butter. Stop when the largest pieces are the size of small peas and the smallest are sandy. Cold, intact butter pieces are what create layers.",
      visualCue: {
        primaryTarget: "The flour mixture looks like rough, pale yellow sand with visible butter pieces ranging from pea-size to sandy crumbs throughout.",
        spectrum: [
          { state: "Underdone", description: "Butter pieces are still large — thumb-sized chunks. The mixture doesn't look like sand at all, more like flour with lumps.", action: "Continue working the butter in. Each cube should be smeared flat and then broken — but do not overwork. Work one handful at a time." },
          { state: "Perfect",   description: "Sandy texture with pea-size and smaller butter pieces throughout. The flour looks slightly yellow from the butter fat. No large chunks remain.", action: "Move quickly to the buttermilk — warmth is the enemy now." },
          { state: "Overdone",  description: "The mixture is uniformly sandy with no visible butter pieces — the butter has been completely worked in and is now coating the flour. The mix looks greasy and yellow.", action: "Proceed, but the biscuits will be more cakey and crumbly than flaky. Refrigerate the mix for 15 minutes before adding buttermilk to firm up the butter." },
        ],
      },
      feelCue: "Grab a handful of the mix and squeeze — it should hold together briefly when released, then fall apart into clumps. If it holds together too well and feels waxy, the butter is too warm.",
    },
    {
      nodeId: "step_2",
      action: "Add buttermilk and form dough",
      inputs: ["shaggy_dry_mix", "ing_06"],
      outputState: "shaggy_biscuit_dough",
      instructions: "Pour the cold buttermilk into the flour-butter mixture all at once. Using a fork or your hands, stir and fold just until the dough comes together — it will look shaggy and rough, with dry flour still visible. Do not knead. Overworking develops gluten and creates tough, flat biscuits. Dump the shaggy mass onto a lightly floured surface.",
      visualCue: {
        primaryTarget: "A rough, shaggy mass that barely holds together. Dry flour patches are still visible. The dough is lumpy and uneven — that is exactly right.",
        spectrum: [
          { state: "Underdone", description: "Large dry clumps that refuse to cohere. The dough falls apart when you try to press it together. Buttermilk wasn't evenly distributed.", action: "Drizzle a tablespoon more buttermilk and fold 2–3 more times. Do not stir — fold." },
          { state: "Perfect",   description: "Rough, shaggy, slightly sticky dough. Not cohesive but holds together when pressed. Dry flour patches visible. Dough looks lumpy and uneven.", action: "Dump onto a floured surface and begin the folding process." },
          { state: "Overdone",  description: "Dough is smooth and elastic — it has been mixed too long. Gluten is developed. The surface looks like smooth bread dough, not a shaggy biscuit mass.", action: "Chill the dough in the fridge for 20 minutes before rolling. The developed gluten will relax and the biscuits will be less tough." },
        ],
      },
      feelCue: "Press the shaggy dough together with your palm — it should just barely hold together, like a loose snowball. It should not feel smooth or spring back like bread dough.",
    },
    {
      nodeId: "step_3",
      action: "Fold and laminate",
      inputs: ["shaggy_biscuit_dough"],
      outputState: "laminated_dough",
      instructions: "Pat the shaggy dough into a rough rectangle about 2cm thick. Fold it in thirds like a letter — left third over the center, then right third over that. Rotate 90 degrees, pat out to 2cm again, and repeat the fold. Do this 4–5 times total. These folds create the distinct layers. After the final fold, gently pat to about 2.5cm thick.",
      visualCue: {
        primaryTarget: "After 4–5 folds, the dough is smooth on the outside but you can see distinct layers when you look at the cut edge. No more dry flour patches.",
        spectrum: [
          { state: "Underdone", description: "Only 1–2 folds done. The dough still looks rough and shaggy, with dry patches. Layers haven't formed.", action: "Continue folding. Four folds minimum creates at least 27 distinct layers — each fold triples the layers." },
          { state: "Perfect",   description: "After 4–5 folds, the dough is cohesive on the exterior with a slight smoothness. Cut edge reveals layered striations. Dough is cold and firm.", action: "Cut biscuits immediately without further resting." },
          { state: "Overdone",  description: "Dough has been folded 8+ times and the butter has smeared flat — you can barely see any layers in the cut edge. Dough feels dense and smooth like puff pastry overworked.", action: "Chill for 15 minutes to firm the butter. The extra folds will make denser biscuits — compensate by baking at higher heat (230°C) for less time." },
        ],
      },
      feelCue: "After the final fold, press the dough with two fingers and look at the side — you should see faint horizontal striations, like layers of sediment in a cliff face. That is butter and dough alternating.",
    },
    {
      nodeId: "step_4",
      action: "Cut and bake",
      inputs: ["laminated_dough"],
      outputState: "finished_biscuits",
      instructions: "Preheat oven to 220°C. Using a sharp, round cutter (never twist — press straight down and pull straight up), cut biscuits. Place them touching each other on a parchment-lined sheet pan — this forces them to rise upward rather than spread outward. Brush tops with buttermilk or melted butter. Bake 12–14 minutes until deeply golden on top.",
      visualCue: {
        primaryTarget: "Biscuits have risen dramatically, pulling up and away from their neighbors. The tops are deeply golden-brown and the sides are pale. Visible layers on the sides.",
        spectrum: [
          { state: "Underdone", description: "Biscuits are pale golden or still blond on top. They may have risen but the tops look doughy. Interior is still dense and gummy.", action: "Return to oven for 2–3 more minutes. The top color matters — golden-brown means the crust has set and the interior is done." },
          { state: "Perfect",   description: "Deeply golden-brown tops with a faint crust. Biscuits have risen tall and show distinct layers on their sides. They lift off the pan cleanly. Interior is fluffy and layered.", action: "Remove and serve immediately." },
          { state: "Overdone",  description: "Tops are very dark brown. Biscuits have a hard crust that doesn't yield to gentle pressure. The bottoms may have burnt.", action: "Check the bottoms — if dark, use a doubled sheet pan next time. Tear the biscuit open; if the interior is still fluffy, they're still good despite the dark exterior." },
        ],
      },
      feelCue: "Pick up a just-baked biscuit and turn it upside down — tap the bottom with a knuckle. It should sound hollow with a light thud, not a dense thwack. The steam that escapes when you pull it apart should smell of butter and cultured tang.",
    },
  ],
};
