export default {
  repoId: "master_french_pate_a_choux_001",
  parentRepoId: null,
  slug: "pate-a-choux",
  author: "ForkRecipe Kitchen",

  title: "Pâte à Choux",
  description: "A paradox of a dough — cooked twice, enriched with eggs added one at a time, it bakes into hollow golden shells that are simultaneously crisp as a cracker on the outside and utterly empty within, waiting to be filled with crème pâtissière, ganache, or whipped cream. The oven transforms a gluey paste into architecture.",
  cuisine: "French",
  culture: "Classical French Pâtisserie",
  category: "breads",

  tags: ["choux", "french", "pastry", "eclairs", "profiteroles", "baking", "dough"],
  difficulty: 3,
  activeTime: "30 min",
  totalTime: "1 hr 10 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 1, salty: 2, sour: 0, bitter: 0, umami: 1, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Liquid",    name: "Water", ratioValue: 1, defaultUnit: "parts", substitutions: ["half water, half whole milk (richer colour and flavour)"] },
    { ingId: "ing_02", role: "Fat",       name: "Unsalted butter, cubed", ratioValue: 0.45, defaultUnit: "parts", substitutions: ["salted butter (omit added salt)"] },
    { ingId: "ing_03", role: "Seasoning", name: "Fine sea salt", ratioValue: 0.02, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Sweetener", name: "Caster sugar (a pinch, aids browning)", ratioValue: 0.02, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Structure", name: "Plain flour (all-purpose), sifted", ratioValue: 0.6, defaultUnit: "parts", substitutions: ["bread flour for crispier shells"] },
    { ingId: "ing_06", role: "Binder",    name: "Whole eggs, lightly beaten, room temperature", ratioValue: 1, defaultUnit: "parts by weight of egg to flour", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Boil",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_04"],
      outputState: "boiling_butter_water",
      instructions: "Combine the water, cubed butter, salt, and sugar in a medium heavy-bottomed saucepan. Place over medium heat and bring to a full, rolling boil. The objective here is to melt the butter completely before the water boils — if the water boils first and begins to evaporate before the butter is melted, the fat-to-water ratio of the dough is compromised and the choux will be unpredictable. Watch carefully: as the butter melts you will see the water turn from clear to a slightly milky white emulsion. As it approaches the boil, the emulsion will foam up. The moment it reaches a full boil, proceed immediately to the next step — every extra second of boiling evaporates water and changes the dough's consistency.",
      visualCue: {
        primaryTarget: "A vigorous, rolling boil with milky-white butter-water emulsion foaming up in the pan. All butter is melted and fully emulsified.",
        spectrum: [
          { state: "Underdone", description: "Butter is not fully melted — you can see butter chunks still floating. The water has not yet boiled.", action: "Wait. Do not add flour until both boiling and full butter melt are achieved simultaneously." },
          { state: "Perfect",   description: "A full rolling boil — not a gentle simmer, but a vigorous, aggressive bubble across the entire surface. All butter is dissolved into the water.", action: "Add all the flour at once and stir immediately." },
          { state: "Overdone",  description: "The mixture has been boiling for more than 30 seconds. Steam and bubbling have reduced the water significantly. The liquid level is visibly lower.", action: "Proceed, but add 2 tablespoons of additional water to the panade during the drying step to compensate." },
        ],
      },
      feelCue: "The pan should feel uncomfortably hot to hold bare-handed. The vigorous boil sounds like a rapid, insistent rattling — not a gentle murmur but a full, churning roar.",
    },
    {
      nodeId: "step_2",
      action: "Mix",
      inputs: ["boiling_butter_water", "ing_05"],
      outputState: "dried_panade",
      instructions: "Remove the pan from the heat and add all the sifted flour in one go. Beat immediately and vigorously with a wooden spoon — this is urgent. The hot butter-water must hydrate every flour particle in the first few seconds, and the starch must gelatinise instantly in the residual heat. Beat until no dry flour remains, then return the pan to medium heat. Cook the panade (the dough ball), stirring and pressing constantly, for 2–3 minutes. You are driving off moisture — the panade is ready when it pulls away completely from the sides of the pan, forms a cohesive ball in the center, and leaves a thin, dry film on the bottom of the pan. This film is the sign that enough water has evaporated. The dough will be very stiff and non-sticky at this point.",
      visualCue: {
        primaryTarget: "A single, smooth, stiff dough ball sitting in the center of the pan, completely pulled away from the sides, with a dry white film on the pan bottom.",
        spectrum: [
          { state: "Underdone", description: "The dough is still sticky and clinging to the sides of the pan. The bottom shows no dry film. The dough looks wet and shiny.", action: "Keep cooking and stirring over heat. The drying takes 2–3 minutes of active cooking — do not rush it." },
          { state: "Perfect",   description: "A stiff, smooth, unified ball. Completely releases from the sides. Clear dry film on the pan bottom. The dough feels like thick, stiff mashed potato.", action: "Transfer to the bowl of a stand mixer fitted with the paddle attachment (or a large bowl for hand mixing) and cool for 5 minutes before adding eggs." },
          { state: "Overdone",  description: "The film on the bottom is getting dark or the dough is cracking on the surface. Overcooked.", action: "Remove from heat immediately. The choux may still work but will be drier — add eggs carefully to adjust consistency." },
        ],
      },
      feelCue: "Press the back of the spoon into the dough — it should resist firmly and spring back very slightly. If it sticks to the spoon and strings away, it needs more drying. The dough should smell of warm, slightly nutty cooked flour.",
    },
    {
      nodeId: "step_3",
      action: "Fold",
      inputs: ["dried_panade", "ing_06"],
      outputState: "piping_choux",
      instructions: "This is the most nuanced step in choux. Allow the panade to cool for 5 minutes (so it does not cook the eggs on contact), then begin adding the beaten eggs gradually — a tablespoon at a time for the first few additions, beating vigorously between each addition. The dough will at first look broken and curdled as the egg tries to separate from the fat in the panade. Keep beating — it will come back together. Do not add all the egg at once. The total egg needed varies with the exact water content of your panade, the protein content of your flour, and the ambient humidity. Stop adding egg when the dough reaches the correct consistency: when you lift the spatula and allow the dough to fall, it should drop in a slow, heavy 'V' shape that bends but does not break — the beak should be 2–3 cm long before it drops. Test by pulling the spatula through the dough: it should form a smooth channel that slowly closes.",
      visualCue: {
        primaryTarget: "Smooth, glossy, pipeable dough that hangs from the spatula in a slow V-shaped drip (2–3 cm beak) without snapping off. Glossy surface, not dull or matte.",
        spectrum: [
          { state: "Underdone", description: "The dough is stiff and breaks off cleanly when lifted on the spatula. It does not flow. Too little egg added.", action: "Add more beaten egg, a tablespoon at a time, and beat well between additions." },
          { state: "Perfect",   description: "The dough is glossy and smooth. When a spatula is lifted slowly, it forms a long inverted V-shape (the 'beak') that holds for 2–3 seconds before dropping. The channel test shows slow closing.", action: "Transfer to a piping bag fitted with a 1.5 cm round or star tip and pipe immediately." },
          { state: "Overdone",  description: "The dough is runny and flows off the spatula in a liquid stream. It spreads flat when piped. Too much egg.", action: "Unfortunately this cannot be recovered by adding more panade — make a second small batch of panade and fold the runny dough into it to re-stiff it." },
        ],
      },
      feelCue: "The dough should feel like a firm, heavy, warm batter when you press it between your fingers — smooth and glossy, never gritty or grainy. It should peel cleanly off a spatula with a satisfying, slow resistance.",
    },
    {
      nodeId: "step_4",
      action: "Bake",
      inputs: ["piping_choux"],
      outputState: "finished_choux_shells",
      instructions: "Pipe the choux onto parchment-lined baking sheets: for profiteroles, make 3 cm rounds spaced 4 cm apart; for éclairs, pipe 10 cm lines. Dampen your fingertip and smooth any peaks. Bake at 200°C (390°F) for 10 minutes without opening the oven — the initial blast of heat causes rapid steam expansion that puffs the shells. Then reduce to 180°C (356°F) and bake for a further 15–20 minutes until the shells are deep golden-brown all over, not just on top. The shells must be fully coloured before you open the oven: a pale shell will collapse when it meets the cool air. In the final 5 minutes, crack the oven door open 5 cm to allow steam to escape and the shells to dry completely inside. Transfer to a wire rack and pierce each shell with a skewer at the base to vent remaining steam.",
      visualCue: {
        primaryTarget: "Deep, even golden-brown shells that have puffed to 2–3 times their piped size, with no pale patches. They look like hollow domes or pillows.",
        spectrum: [
          { state: "Underdone", description: "Pale golden shells with a matte, damp-looking surface. They feel soft when pressed and will deflate if removed from the oven now.", action: "Return to the oven for 5 more minutes. Do not open the oven early — the collapse from cool air is irreversible." },
          { state: "Perfect",   description: "Deep, even golden-brown all over, including on the sides. Shells feel hollow and light when picked up. Tapping the base produces a dry, hollow sound.", action: "Pierce with a skewer to vent steam and cool on a wire rack. Fill within 4 hours for maximum crispness." },
          { state: "Overdone",  description: "Very dark brown, almost mahogany. Shells may be cracked on the sides. Smell of toasted egg.", action: "They are still usable — trim any very dark spots. The flavour will be more nutty and caramelised, which many people prefer." },
        ],
      },
      feelCue: "A perfectly baked choux shell weighs almost nothing — it should feel startlingly light for its size, as though the oven ate the inside and left only the crust. Squeeze gently: it should feel rigid, not yielding.",
    },
  ],
};
