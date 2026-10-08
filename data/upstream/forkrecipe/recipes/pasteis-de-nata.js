export default {
  repoId: "master_portuguese_pasteis_de_nata_001",
  parentRepoId: null,
  slug: "pasteis-de-nata",
  author: "ForkRecipe Kitchen",

  title: "Pastéis de Nata (Portuguese Custard Tarts)",
  description: "Conceived by Jerónimo monks in Lisbon, these tarts exist at the intersection of violence and delicacy — shatteringly flaky pastry shells holding a barely-set custard that emerges from an inferno of an oven speckled with dark leopard spots of caramelized sugar.",
  cuisine: "Portuguese",
  culture: "Lisbon",
  category: "desserts",

  tags: ["portuguese", "custard", "tart", "pastry", "dessert"],
  difficulty: 4,
  activeTime: "1 hr",
  totalTime: "1 hr 30 min",
  ratioSystem: "parts",

  stars: 3210,
  forks: 412,
  contributors: 48,
  license: "CC-BY-SA",
  createdAt: "2024-02-14",
  updatedAt: "2025-10-30",

  flavorRadar: { sweet: 3, salty: 1, sour: 0, bitter: 0, umami: 0, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure", name: "All-purpose flour",                              ratioValue: 100, defaultUnit: "parts", substitutions: ["00 flour"] },
    { ingId: "ing_02", role: "Fat",       name: "Unsalted butter, softened to room temperature", ratioValue: 60,  defaultUnit: "parts", substitutions: ["lard (more traditional, flakier)"] },
    { ingId: "ing_03", role: "Dairy",     name: "Whole milk",                                    ratioValue: 80,  defaultUnit: "parts", substitutions: ["cream + milk combination"] },
    { ingId: "ing_04", role: "Sweetener", name: "Caster sugar",                                  ratioValue: 40,  defaultUnit: "parts", substitutions: ["superfine sugar"] },
    { ingId: "ing_05", role: "Binder",    name: "Egg yolks (5 total)",                           ratioValue: 30,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Starch",    name: "Plain flour (for custard thickening, small amount)", ratioValue: 8, defaultUnit: "parts", substitutions: ["cornstarch"] },
    { ingId: "ing_07", role: "Aromatic",  name: "Lemon zest strip and cinnamon stick",           ratioValue: 2,   defaultUnit: "parts", substitutions: ["vanilla bean"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Knead",
      inputs: ["ing_01", "ing_02"],
      outputState: "laminated_pastry",
      instructions: "Mix the flour with a pinch of salt and enough cold water (roughly 50 parts) to form a shaggy dough. Knead for 5 minutes until smooth. Rest 10 minutes, then roll into a large rectangle on a floured surface. Spread two-thirds of the softened butter in an even, thin layer across the surface. Fold into thirds (letter fold), rotate 90 degrees, roll out again, and repeat with remaining butter. Fold into thirds one final time. Chill for 20 minutes before shaping.",
      visualCue: {
        primaryTarget: "A layered dough package that, when cut at the edge, reveals distinct strata of pale dough and white butter with clean, separate lines.",
        spectrum: [
          { state: "Underdone", description: "Butter has smeared into the dough rather than layering — the cut edge shows a uniform pale yellow, not distinct stripes. The dough feels greasy.", action: "Chill for 15 minutes and try rolling more gently. Warm butter breaks down layers; cold butter maintains them." },
          { state: "Perfect",   description: "Clean, distinct layers visible when the folded block is cut at the edge. The dough is smooth on the outside, cool, and pliable but not sticky. The butter is in thin, flat sheets between the dough layers.", action: "Chill 20 minutes, then roll into a log and cut into rounds for the tart tins." },
          { state: "Overdone",  description: "Dough has been over-worked and is becoming elastic, springing back when rolled. Butter layers are beginning to merge. Gluten is developing excessively.", action: "Rest the dough in the fridge for 30 minutes. Over-kneaded laminated dough will never be as flaky but will still produce an acceptable pastry." },
        ],
      },
      feelCue: "The laminated dough, when pressed with a fingertip, should feel cool and firm at the surface with a slightly yielding interior — like pressing on a closed paperback book. It should not leave a grease mark on your fingers when you pick it up.",
    },
    {
      nodeId: "step_2",
      action: "Shape",
      inputs: ["laminated_pastry"],
      outputState: "lined_tins",
      instructions: "Roll the chilled dough into a tight cylinder about 4cm in diameter. Slice the cylinder into rounds 2cm thick. Press each round into a lightly greased tart tin, working from the center outward with your thumbs to line the sides, creating a thin, even shell that extends just above the tin rim. The walls should be thinner than you think — the butter layers will puff in the oven. Refrigerate the lined tins for 15 minutes before filling.",
      visualCue: {
        primaryTarget: "Evenly lined tins with thin walls (about 3mm) that come up just above the rim. The cut layers of dough are visible at the top edge.",
        spectrum: [
          { state: "Underdone", description: "Pastry shell walls are too thick (6mm+) and uneven. The bottom is thick and the sides are thin. Thick pastry will not cook through before the custard sets.", action: "Work the dough thinner by pressing more firmly from the center. Aim for translucence — you should almost see your fingers through the dough at the sides." },
          { state: "Perfect",   description: "Walls are a uniform 3mm with clean visible lamination layers. The top edge is slightly uneven and textured from the cut cylinder — this is correct and will form the most flaky edge.", action: "Chill 15 minutes before filling." },
          { state: "Overdone",  description: "Pastry has been handled so much it is very soft and greasy from warm hands melting the butter. The layers have begun to merge.", action: "Return to the freezer for 10 minutes. The butter must re-solidify before baking or the pastry will not puff." },
        ],
      },
      feelCue: "Run your thumb around the inside of the tin after lining — you should feel a uniform resistance and the layered dough should feel cool and slightly papery, not warm and greasy. Any thick spots will bake dense and raw.",
    },
    {
      nodeId: "step_3",
      action: "Whisk",
      inputs: ["ing_03", "ing_04", "ing_05", "ing_06", "ing_07"],
      outputState: "custard_filling",
      instructions: "Warm the milk in a saucepan with the lemon zest and cinnamon stick until steaming but not boiling. In a separate bowl, whisk together the sugar, flour, and egg yolks until pale and smooth. Remove aromatics from the milk. Stream the hot milk gradually into the egg mixture, whisking constantly — never add hot milk to cold eggs all at once. Return the mixture to the saucepan and cook over medium heat, stirring constantly, until it just begins to thicken and the first bubbles appear. Remove from heat immediately. The custard will look too loose — this is correct; it will set in the oven.",
      visualCue: {
        primaryTarget: "A smooth, glossy, pale-yellow custard that coats a spoon but flows freely. When you draw a finger across the back of the spoon, the line holds for 3–4 seconds before the custard creeps back.",
        spectrum: [
          { state: "Underdone", description: "Custard is thin and watery. No coating on the spoon. Line drawn in it disappears instantly. Flour has not cooked and will leave a raw starchy taste.", action: "Return to medium heat and stir until the coating consistency is reached. Do not stop stirring or the bottom will curdle." },
          { state: "Perfect",   description: "Custard coats the spoon in a thin, even layer. When poured, it falls in a steady ribbon, not a stream. It smells of warm milk, egg, and cinnamon. Color is deep golden-yellow from the yolks.", action: "Pass through a fine sieve into a jug for easy pouring. Use while warm." },
          { state: "Overdone",  description: "Custard has scrambled — yellow eggy lumps are visible. The mixture smells of cooked egg rather than custard. It is grainy when stirred.", action: "Pass urgently through a fine sieve, pressing hard. Some custard can be rescued this way if the lumps are not too large. Reduce oven temperature by 20°C when baking to prevent the pre-scrambled custard from completely setting hard." },
        ],
      },
      feelCue: "Dip a clean finger into the warm custard — it should feel silky and coating, like heavy cream, with no graininess on your fingertip. The warmth should be pleasantly hot but not scalding, around 60–65°C.",
    },
    {
      nodeId: "step_4",
      action: "Bake",
      inputs: ["lined_tins", "custard_filling"],
      outputState: "finished_pasteis",
      instructions: "Preheat your oven to its maximum temperature — at minimum 240°C (465°F), ideally 260°C or higher. The high heat is non-negotiable: it is what creates the characteristic leopard-spot caramelization on the custard surface. Fill the chilled pastry shells three-quarters full with warm custard. Bake on the top shelf for 12–15 minutes until the pastry is golden-brown and the custard surface is blistered with dark caramelized spots. Allow to cool for 5 minutes before eating.",
      visualCue: {
        primaryTarget: "Pastry shells are deep golden-brown with visible flaky layers. The custard surface has irregular dark brown to black caramelized spots, like a leopard's skin. The custard should still wobble slightly in the center when the tin is shaken.",
        spectrum: [
          { state: "Underdone", description: "Custard surface is pale yellow with no caramelized spots. The pastry is blond but not golden. The custard center feels completely liquid when the tin is gently shaken.", action: "Return to the oven for 3–5 more minutes. The caramelized spots are not optional — they are the defining character of the pastel de nata." },
          { state: "Perfect",   description: "Pastry is deep amber-gold and flaky at the visible edges. The custard has a dramatic pattern of dark spots from intense caramelization. When the tin is shaken, the center wobbles slightly like barely set gelatin — not liquid, not rigid.", action: "Cool for at least 5 minutes before eating — the custard is liquid-hot and will burn. They are best warm, eaten within 30 minutes of the oven." },
          { state: "Overdone",  description: "Custard has puffed dramatically and then collapsed, leaving a sunken center. The spots have merged into an entirely black, burnt surface. The custard edges have gone rubbery.", action: "The caramelized center may be salvageable if you peel away the worst of the surface. Reduce oven time by 3 minutes next batch." },
        ],
      },
      feelCue: "Lift a cooled tart from its tin — the bottom of the pastry should feel rigid and dry, not soggy. Tap the base with a fingernail and it should sound hollow, like a good cracker. The top custard, when touched with a fingertip, should resist gently and then slowly spring back.",
    },
  ],
};
