export default {
  repoId: "master_austrian_apple_strudel_001",
  parentRepoId: null,
  slug: "apple-strudel",
  author: "ForkRecipe Kitchen",

  title: "Apple Strudel",
  description: "Viennese apfelstrudel — a tissue-thin dough stretched over a flour-dusted tablecloth until you can read a newspaper through it, filled with spiced apples and breadcrumbs, rolled into a log, and baked until the pastry shatters into translucent, butter-soaked layers.",
  cuisine: "Austrian",
  culture: "Viennese",
  category: "desserts",

  tags: ["strudel", "apple", "austrian", "viennese", "pastry", "hand-stretched", "cinnamon"],
  difficulty: 4,
  activeTime: "75 min",
  totalTime: "2 hr 30 min",
  ratioSystem: "parts",

  stars: 987,
  forks: 76,
  contributors: 22,
  license: "CC-BY-SA",
  createdAt: "2025-01-25",
  updatedAt: "2025-06-20",

  flavorRadar: { sweet: 4, salty: 1, sour: 2, bitter: 0, umami: 0, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "High-gluten bread flour or all-purpose flour",     ratioValue: 100, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_02", role: "Liquid",     name: "Warm water",                                       ratioValue: 55,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Fat",        name: "Neutral oil (for the dough)",                      ratioValue: 8,   defaultUnit: "parts", substitutions: ["melted lard"] },
    { ingId: "ing_04", role: "Seasoning",  name: "Fine sea salt",                                    ratioValue: 1,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Structure",  name: "Tart apples (Granny Smith or Cox), peeled, thinly sliced", ratioValue: 200, defaultUnit: "parts", substitutions: ["Boskoop apples"] },
    { ingId: "ing_06", role: "Sweetener",  name: "Granulated sugar",                                 ratioValue: 30,  defaultUnit: "parts", substitutions: ["brown sugar"] },
    { ingId: "ing_07", role: "Spice",      name: "Ground cinnamon",                                  ratioValue: 5,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_08", role: "Structure",  name: "Dry breadcrumbs, toasted in butter",               ratioValue: 25,  defaultUnit: "parts", substitutions: ["ground almonds"] },
    { ingId: "ing_09", role: "Fat",        name: "Unsalted butter, melted, for brushing",            ratioValue: 40,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_10", role: "Garnish",    name: "Powdered (icing) sugar, for dusting",              ratioValue: 10,  defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Knead",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_04"],
      outputState: "rested_strudel_dough",
      instructions: "Combine flour, warm water, oil, and salt, mixing until a shaggy dough forms. Knead vigorously for 10 full minutes — this dough requires serious development of gluten, which is what allows it to be stretched to an almost impossible thinness without tearing. Knead by slapping the dough against the work surface and folding it. The finished dough should be smooth as silk, warm from the kneading, and extremely elastic. Shape into a ball, brush with oil, and rest covered for 45 minutes at room temperature. The rest is not optional — it relaxes the gluten to the point where stretching becomes possible.",
      visualCue: {
        primaryTarget: "A smooth, satiny ball of dough with no rough patches. When stretched gently, it extends without tearing. The surface should be as smooth as an earlobe.",
        spectrum: [
          { state: "Underdone", description: "Dough is still slightly rough and tears when stretched even slightly. Springs back immediately when pushed — very tight gluten.", action: "Knead for 5 more minutes. Insufficiently kneaded strudel dough will tear during stretching." },
          { state: "Perfect",   description: "Perfectly smooth, satiny ball. When you poke it, the indentation springs back slowly — the gluten is developed but not overly tight. It already stretches slightly without tearing.", action: "Brush with oil, cover tightly, and rest 45 minutes before stretching." },
          { state: "Overdone",  description: "Not achievable by hand kneading — over-kneading by machine is possible but unlikely by hand. Proceed to rest.", action: "Rest as directed." },
        ],
      },
      feelCue: "Pull a small piece of the dough and stretch it between your fingers — after proper kneading and rest, it should stretch into a translucent membrane before tearing, like a thick balloon skin. If it tears immediately with no stretch, it needs more rest.",
    },
    {
      nodeId: "step_2",
      action: "Prep filling",
      inputs: ["ing_05", "ing_06", "ing_07", "ing_08"],
      outputState: "apple_filling",
      instructions: "Toss the thinly sliced apples with sugar and cinnamon and let macerate for 15 minutes — the sugar draws out juice. Drain the excess juice thoroughly, as too much moisture will make the strudel soggy. Toast the breadcrumbs in butter until golden and fragrant — these absorb any residual apple moisture during baking, keeping the pastry crisp from inside. Combine the drained apples and buttered breadcrumbs just before filling the stretched dough.",
      visualCue: {
        primaryTarget: "Apple slices glossy from the sugar maceration but well-drained — no pooling juice. Golden, buttery breadcrumbs mixed through evenly.",
        spectrum: [
          { state: "Underdone", description: "Apple slices still rigid and dry — no maceration liquid released. Breadcrumbs still pale and untoasted.", action: "Let the apples macerate longer and toast the breadcrumbs more. Raw breadcrumbs don't absorb moisture effectively." },
          { state: "Perfect",   description: "Apples have released juice, been drained, and look softened and glossy. Breadcrumbs are deeply golden and smell of toasted butter.", action: "Combine and fill immediately — do not let the filling sit or the breadcrumbs will rehydrate." },
          { state: "Overdone",  description: "The apples have been over-macerated and have released so much juice they look water-logged. Even after draining, they remain very wet.", action: "Drain as thoroughly as possible, pressing lightly. Add an extra handful of toasted breadcrumbs to compensate." },
        ],
      },
      feelCue: "A handful of the filling should feel slightly moist but not dripping — if you squeeze it in your fist, only a few drops should appear. The breadcrumbs should feel crispy and sandy, not soft.",
    },
    {
      nodeId: "step_3",
      action: "Stretch dough",
      inputs: ["rested_strudel_dough", "ing_09"],
      outputState: "stretched_strudel_dough",
      instructions: "Cover a large table with a clean cloth and dust lightly with flour. Place the rested dough in the center and roll it out with a pin to about 40x60cm. Then begin stretching by hand: place both hands under the dough, palms down, and stretch outward from the center using the backs of your knuckles. Walk around the table, stretching in all directions, until the dough is paper-thin (about 1mm) and almost transparent — roughly 60x80cm. The dough must be so thin you can read text through it. Brush thoroughly with melted butter as you work.",
      visualCue: {
        primaryTarget: "A nearly transparent sheet of dough. Newspaper text held beneath the stretched dough should be clearly legible through it. No thick patches, tears, or holes.",
        spectrum: [
          { state: "Underdone", description: "Dough is translucent but still white and opaque in most places. You cannot read through it. It is still several millimeters thick.", action: "Continue stretching — this is the skill of strudel and takes patience. Work from the center outward and keep your hands flat." },
          { state: "Perfect",   description: "Almost completely transparent in the center. Text is legible through it. Thin enough to see your hand through it. Edges are slightly thicker — trim them.", action: "Brush with butter and add the filling." },
          { state: "Overdone",  description: "The dough has torn in several places. Holes are scattered throughout.", action: "Patch tears by overlapping the dough and pressing gently. A few small holes are harmless and will seal during rolling. Work around large tears." },
        ],
      },
      feelCue: "The stretched dough should feel almost weightless in your hands — like handling a very large, slightly damp tissue. When you blow on it gently from a few inches away, it should flutter visibly.",
    },
    {
      nodeId: "step_4",
      action: "Roll and bake",
      inputs: ["stretched_strudel_dough", "apple_filling"],
      outputState: "finished_apple_strudel",
      instructions: "Spread the buttered breadcrumbs across two-thirds of the dough, leaving a 5cm border. Pile the apple filling evenly over the breadcrumbs. Using the tablecloth to assist, roll the strudel into a tight log, using the cloth to lift and fold rather than your hands. Place seam-side down on a parchment-lined baking sheet, curving into a horseshoe if needed. Brush generously with melted butter. Bake at 190°C (375°F) for 35–40 minutes, brushing with butter once more at the 20-minute mark. Dust with powdered sugar and serve warm.",
      visualCue: {
        primaryTarget: "A golden-amber log with visible flaky layers on the surface. Butter has basted the exterior to a deep, even golden color. The surface crackles audibly when the pan is moved.",
        spectrum: [
          { state: "Underdone", description: "The strudel is pale gold, not deep amber. The surface looks smooth rather than flaky. Pressing gently reveals the pastry is still soft.", action: "Brush with more butter and continue baking — pale strudel lacks the essential crunch and the filling won't be fully hot." },
          { state: "Perfect",   description: "Deep golden-amber with visible, distinct flaky layers. The pastry crackles audibly when touched. Powdered sugar dusted on top begins to dissolve at the edges. The apple filling is fragrant and hot.", action: "Cool for 10 minutes, dust with powdered sugar, and serve." },
          { state: "Overdone",  description: "Very dark brown surface with some crispy-black edges. The pastry at the ends has darkened significantly.", action: "Remove from oven. Tent loosely with foil for the last few minutes next time to protect the ends." },
        ],
      },
      feelCue: "A properly baked strudel should feel light and crackly — tap it with a finger and hear a crisp, hollow sound from the pastry layers. When you slice through it, the pastry should shatter at the knife's touch, releasing a cloud of buttery, cinnamon-apple steam.",
    },
  ],
};
