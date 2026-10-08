export default {
  repoId: "master_portuguese_pastel_de_nata_001",
  parentRepoId: null,
  slug: "pastel-de-nata",
  parentSlug: null,
  author: "ForkRecipe Kitchen",

  title: "Pastel de Nata",
  description: "A cupped shell of shatteringly crisp laminated pastry cradling a custard so silky and trembling it barely holds its shape — caramelised black on top where the fierce heat of the oven turned sugar to lacquer.",
  cuisine: "Portuguese",
  culture: "Lisboeta",
  category: "desserts",

  tags: ["portuguese", "custard-tart", "laminated-pastry", "patisserie", "baking"],
  difficulty: 4,
  activeTime: "60 min",
  totalTime: "4 hr",
  ratioSystem: "weight",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 4, salty: 1, sour: 0, bitter: 1, umami: 1, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Plain flour (all-purpose)",         ratioValue: 250, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_02", role: "Hydration",  name: "Cold water",                        ratioValue: 125, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_03", role: "Seasoning",  name: "Fine sea salt",                     ratioValue: 3,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_04", role: "Fat",        name: "Lard (or unsalted butter, softened)", ratioValue: 150, defaultUnit: "g", substitutions: ["vegetable shortening"] },
    { ingId: "ing_05", role: "Liquid",     name: "Whole milk",                        ratioValue: 250, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_06", role: "Sweetener",  name: "Caster sugar (for custard)",        ratioValue: 200, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_07", role: "Liquid",     name: "Water (for sugar syrup)",           ratioValue: 60,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_08", role: "Starch",     name: "Plain flour (for custard thickening)", ratioValue: 15, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_09", role: "Binder",     name: "Egg yolks (large)",                ratioValue: 6,   defaultUnit: "unit", substitutions: [] },
    { ingId: "ing_10", role: "Aromatic",   name: "Cinnamon stick",                   ratioValue: 1,   defaultUnit: "unit", substitutions: [] },
    { ingId: "ing_11", role: "Aromatic",   name: "Lemon peel strip (no pith)",       ratioValue: 1,   defaultUnit: "unit", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Knead",
      inputs: ["ing_01", "ing_02", "ing_03"],
      outputState: "pastry_dough",
      instructions: "Combine flour, water, and salt to form a smooth, supple dough. Knead for 5-6 minutes until it is soft, non-sticky, and has some elasticity. It should feel like very soft plasticine. Do not over-knead. Wrap in cling film and rest in the refrigerator for 30 minutes. This gluten rest is essential — it allows the dough to roll out without springing back when laminated.",
      visualCue: {
        primaryTarget: "A very smooth, soft dough ball with a slightly silky surface. When pressed, it holds the indent of a thumbprint cleanly.",
        spectrum: [
          { state: "Underdone", description: "Dough is rough, uneven in texture, and tears when stretched. Gluten is underdeveloped.", action: "Knead for 2-3 more minutes. The surface should be smooth and the dough should stretch without tearing." },
          { state: "Perfect",   description: "Smooth, uniform, very soft and pliable. Almost silky. Holds a fingerprint indent cleanly. Not sticky.", action: "Wrap and refrigerate for 30 minutes before laminating." },
          { state: "Overdone",  description: "Dough has become tough and elastic — it springs back aggressively when pressed.", action: "Refrigerate for 1 hour. Over-kneaded dough needs a longer rest to relax the gluten." },
        ],
      },
      feelCue: "The dough should feel like a warm earlobe — incredibly soft and yielding with a smooth, slightly tacky surface that doesn't cling to your palms.",
    },
    {
      nodeId: "step_2",
      action: "Fold",
      inputs: ["pastry_dough", "ing_04"],
      outputState: "laminated_pastry",
      instructions: "On a lightly floured surface, roll the rested dough into a large rectangle, about 40 x 30 cm. Spread the softened lard or butter evenly across the surface, leaving a 1 cm border. Roll up the dough tightly into a log from the short end. Slice the log into 12 equal rounds. Press each round flat between your fingers, then press it into a muffin tin to line the base and sides, pressing the pastry up above the rim. Refrigerate the lined tins for 20 minutes.",
      visualCue: {
        primaryTarget: "Muffin tin cups lined with a thin pastry shell that shows the swirled cross-section of the roll. The pastry layers are visible as concentric rings when looked at from above.",
        spectrum: [
          { state: "Underdone", description: "Pastry is too thick in places, especially the base. The layers are bunched rather than evenly spread.", action: "Use your thumb to thin the base further, pressing from the centre outward and working the pastry up the sides evenly." },
          { state: "Perfect",   description: "Thin, even shells with visible laminated layers from the swirl cut. The pastry extends just above the rim of each cup.", action: "Refrigerate and prepare the custard while chilling." },
          { state: "Overdone",  description: "Pastry has been worked too warm and the fat has melted in, losing the distinct layers.", action: "Refrigerate for 20 minutes before any further shaping — fat must be cold to create distinct layers." },
        ],
      },
      feelCue: "Properly chilled pastry shells should feel cool and very firm when you press the side — almost rigid. Any warmth or softness means the fat has softened and the layers will merge in the oven.",
    },
    {
      nodeId: "step_3",
      action: "Infuse",
      inputs: ["ing_05", "ing_10", "ing_11"],
      outputState: "infused_milk",
      instructions: "Heat milk with the cinnamon stick and lemon peel strip over medium heat until steaming and just below a simmer. Remove from heat and steep for 15 minutes. Remove the cinnamon stick and lemon peel. Meanwhile, cook the sugar and water in a separate small saucepan to 104 C (the soft thread stage), without stirring. This is the sugar syrup that will sweeten and enrich the custard with a faintly caramelised note.",
      visualCue: {
        primaryTarget: "Milk that smells of warm cinnamon and citrus. The syrup at 104 C will form thin threads when a small amount is dropped into cold water.",
        spectrum: [
          { state: "Underdone", description: "Milk has not fully infused — faint cinnamon scent only. Syrup below 100 C is still watery.", action: "Steep the milk longer with the spices and ensure the syrup reaches temperature." },
          { state: "Perfect",   description: "Milk smells strongly of cinnamon with a background of lemon. Syrup is clear and lightly viscous at 104 C.", action: "Combine with the flour and yolks to form the custard base." },
          { state: "Overdone",  description: "Syrup above 110 C will begin caramelising — the custard will taste of caramel rather than being subtly sweet.", action: "Add a tablespoon of cold water immediately to stop the cooking and lower the temperature." },
        ],
      },
      feelCue: "The steeped milk should smell like a Portuguese pastelaria — warm cinnamon-spice with a citrus whisper. Taste a small spoonful — it should be subtly flavoured, not aggressively perfumed.",
    },
    {
      nodeId: "step_4",
      action: "Whisk",
      inputs: ["infused_milk", "ing_06", "ing_07", "ing_08", "ing_09"],
      outputState: "custard_filling",
      instructions: "Whisk the flour into the infused milk until completely smooth. Pour in the hot sugar syrup, whisking constantly. Place over medium heat and stir constantly until the custard just begins to thicken — remove from heat the moment it thickens, while it is still pourable (do not let it set fully on the stove). Whisk in the egg yolks off the heat. Pass through a fine sieve into a jug. The custard should be thin enough to pour, not thick like a set pudding — it sets in the oven.",
      visualCue: {
        primaryTarget: "A thin, pourable custard that coats the back of a spoon with a thin, translucent layer. Still more liquid than a thick cream.",
        spectrum: [
          { state: "Underdone", description: "Custard is water-thin with no body — the flour has not begun to thicken it.", action: "Return to heat briefly, stirring. The starch needs to reach around 80 C to begin gelling." },
          { state: "Perfect",   description: "Lightly thickened, pourable, coats a spoon in a thin, translucent layer. Colour is pale yellow from the yolks.", action: "Pass through a sieve and pour into lined pastry shells." },
          { state: "Overdone",  description: "Custard has set into a thick, pudding-like mass. Cannot be poured into the shells.", action: "Whisk vigorously off heat and thin with a little warm milk. Strain again. This custard will set very stiff in the oven." },
        ],
      },
      feelCue: "Pour a thin stream of the custard from the sieve back into the jug — it should fall in a wide, smooth, barely viscous stream, like very thin cream. Thicker than water, thinner than cream of soup.",
    },
    {
      nodeId: "step_5",
      action: "Bake",
      inputs: ["laminated_pastry", "custard_filling"],
      outputState: "finished_pastel_de_nata",
      instructions: "Pour the custard into the chilled pastry shells, filling to within 3 mm of the rim. Bake in the highest position of a very hot oven — 240-260 C (460-500 F) — for 12-15 minutes. The pastry should be golden-brown and deeply blistered. The custard surface should have dramatic black blisters and patches of deep amber caramelisation over a set, trembling custard below. Serve warm, dusted with ground cinnamon.",
      visualCue: {
        primaryTarget: "Black blistered patches across the custard surface — not uniform brown, but dramatic charred spots over an amber base, with the custard set but trembling. The pastry is golden, blistered, and crisp.",
        spectrum: [
          { state: "Underdone", description: "Custard surface is pale yellow and has not caramelised. Pastry is blond. Custard may still be liquid in the centre.", action: "Return to oven. The defining feature of a pastel de nata is the black caramelisation — do not remove too early." },
          { state: "Perfect",   description: "Dramatic black blisters and deep amber caramelisation across the custard. Pastry is deeply golden and blistered. The custard jiggles softly when the tray is moved.", action: "Cool for 5 minutes in the tin, then remove. Serve warm with cinnamon." },
          { state: "Overdone",  description: "Entire custard surface is uniformly black and smells acrid rather than caramel-sweet. Pastry is very dark at the edges.", action: "Reduce the oven temperature by 10 C and shorten by 2 minutes next time. The line between perfect and burnt is narrow at this temperature." },
        ],
      },
      feelCue: "Hold a finished tart at its rim and tip it gently — the custard centre should tremble and wobble visibly, like a barely-set flan. A custard that doesn't move at all has been overbaked and will be rubbery.",
    },
  ],
};
