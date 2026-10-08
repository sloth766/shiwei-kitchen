export default {
  repoId: "master_polish_pierogi_001",
  parentRepoId: null,
  slug: "pierogi",
  author: "ForkRecipe Kitchen",

  title: "Pierogi",
  description: "Poland's answer to the dumpling: a thin, yielding dough pocket sealed around a filling of farmer's cheese and potato so creamy it collapses on the tongue, finished in brown butter with onions that have cooked into sweetness.",
  cuisine: "Polish",
  culture: "Polish",
  category: "breads",

  tags: ["polish", "dumpling", "potato", "cheese", "boiled"],
  difficulty: 3,
  activeTime: "1 hr",
  totalTime: "1 hr 30 min",
  ratioSystem: "parts",

  stars: 1560,
  forks: 198,
  contributors: 31,
  license: "CC-BY-SA",
  createdAt: "2024-08-05",
  updatedAt: "2025-05-22",

  flavorRadar: { sweet: 0, salty: 3, sour: 1, bitter: 0, umami: 2, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure", name: "All-purpose flour",                              ratioValue: 100, defaultUnit: "parts", substitutions: ["00 flour"] },
    { ingId: "ing_02", role: "Hydration", name: "Warm water",                                     ratioValue: 45,  defaultUnit: "parts", substitutions: ["sour cream + water mix"] },
    { ingId: "ing_03", role: "Dairy",     name: "Farmer's cheese (twaróg) or ricotta",            ratioValue: 60,  defaultUnit: "parts", substitutions: ["dry-curd cottage cheese"] },
    { ingId: "ing_04", role: "Starch",    name: "Russet potatoes, boiled and riced",              ratioValue: 60,  defaultUnit: "parts", substitutions: ["Yukon Gold potatoes"] },
    { ingId: "ing_05", role: "Allium",    name: "Yellow onion, finely diced",                     ratioValue: 15,  defaultUnit: "parts", substitutions: ["shallots"] },
    { ingId: "ing_06", role: "Fat",       name: "Unsalted butter",                                ratioValue: 10,  defaultUnit: "parts", substitutions: ["sour cream for serving"] },
    { ingId: "ing_07", role: "Seasoning", name: "Salt and white pepper",                          ratioValue: 2,   defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Knead",
      inputs: ["ing_01", "ing_02", "ing_07"],
      outputState: "pierogi_dough",
      instructions: "Combine the flour and a pinch of salt in a bowl. Add warm water gradually, mixing with a fork until shaggy. Turn out and knead by hand for 8–10 minutes until the dough is completely smooth, supple, and slightly tacky but not sticky. The dough should have the elasticity of an earlobe. Wrap tightly in cling film and rest for 30 minutes at room temperature — resting is non-negotiable, as it relaxes the gluten so the dough can be rolled paper-thin.",
      visualCue: {
        primaryTarget: "A smooth, pale, elastic dough ball with no visible flour specks or rough patches. The surface shines slightly from the fat in the dough.",
        spectrum: [
          { state: "Underdone", description: "Dough is rough and tears easily when stretched. Dry flour pockets are still visible. Gluten strands are not developed.", action: "Knead for 3–5 more minutes. Sprinkle a few drops of water if the dough is crumbling, or a pinch of flour if it is sticking." },
          { state: "Perfect",   description: "Completely smooth, elastic, slightly tacky dough that springs back when poked. A small piece stretched thin between your fingers should stretch without tearing before going translucent.", action: "Wrap and rest for 30 minutes minimum." },
          { state: "Overdone",  description: "Dough has been over-kneaded and feels tight and rubbery, snapping back aggressively when stretched. Very difficult to roll thin.", action: "Rest for an additional 20 minutes. The gluten will relax slightly, though over-kneaded dough never fully recovers." },
        ],
      },
      feelCue: "Well-developed pierogi dough should feel like a baby's cheek under your palm — smooth, warm, slightly yielding but with a gentle resistance underneath. It should not stick to dry hands, but will cling faintly to a damp fingertip.",
    },
    {
      nodeId: "step_2",
      action: "Mix",
      inputs: ["ing_03", "ing_04", "ing_05", "ing_07"],
      outputState: "potato_cheese_filling",
      instructions: "Sauté half the diced onion in butter until golden, then set aside to cool. In a bowl, combine the riced potatoes, farmer's cheese, and sautéed onion. Season aggressively with salt and white pepper — the filling will be encased in unseasoned dough, so it must carry all the flavor. Mix until just combined; do not overwork or the potato becomes gluey. Taste and adjust salt until the filling tastes pleasantly salty on its own.",
      visualCue: {
        primaryTarget: "A cohesive filling that holds its shape when pressed into a ball but crumbles slightly at the edges — not a paste, not a loose mixture.",
        spectrum: [
          { state: "Underdone", description: "Filling is underseasoned and bland. The cheese and potato taste flat and starchy without the salt to activate their flavors.", action: "Add more salt in small pinches, tasting after each addition. The filling should taste seasoned enough to eat on its own." },
          { state: "Perfect",   description: "Filling holds a ball shape when rolled between your palms. It tastes savory, cheesy, and distinctly potato-forward. A gentle herb perfume from the cooked onion. Color is uniform pale yellow.", action: "Use immediately, or cover and refrigerate for up to 4 hours." },
          { state: "Overdone",  description: "Filling has been overmixed and is gluey — it stretches like mashed potato paste instead of crumbling. Over-salted versions taste sharp and one-note.", action: "Add a tablespoon of fresh cheese to loosen it. If over-salted, add another riced potato (unseasoned) to dilute." },
        ],
      },
      feelCue: "Roll a small ball of filling between your palms — it should hold its shape but feel slightly crumbly, like a well-seasoned tuna mixture. If it feels wet and sticky on your hands, the filling has too much moisture and will make the dough soggy.",
    },
    {
      nodeId: "step_3",
      action: "Shape",
      inputs: ["pierogi_dough", "potato_cheese_filling"],
      outputState: "raw_pierogi",
      instructions: "On a lightly floured surface, roll the rested dough to 2–3mm thickness — thin enough to see the shadow of your hand through it. Cut circles using a 8–9cm cutter or glass. Place a generous teaspoon of filling in the center of each circle. Fold the dough over the filling and press the edges firmly together, crimping with a fork or a tight finger-pinch. Sealed edges must be completely airtight — any opening will burst during boiling.",
      visualCue: {
        primaryTarget: "Uniformly thin dough circles with a firm, well-crimped edge. The filling creates a gentle dome shape in the center. No air pockets visible inside the sealed dumpling.",
        spectrum: [
          { state: "Underdone", description: "Edges are not fully pressed together. Small gaps or thin spots in the seal where the dough is not bonded.", action: "Re-press the edges firmly between your thumb and forefinger, working around the entire perimeter. Wet your fingertip slightly to help seal any stubborn gaps." },
          { state: "Perfect",   description: "Clean, flat, firmly crimped edge with no gaps. The dumpling puffs slightly in the center from the filling. Held up to light, no filling is visible through the dough at the edges.", action: "Place on a lightly floured tray and cover with a damp towel. Boil within 30 minutes or freeze immediately." },
          { state: "Overdone",  description: "Too much filling has caused the dough to stretch thin and nearly tear at the top. The filling is pressing against an over-thin dough wall.", action: "These pierogi are delicate and may burst. Cook immediately and handle with extra care during boiling." },
        ],
      },
      feelCue: "Hold a sealed pierogi between two fingers and squeeze gently along the sealed edge — it should feel firm and resistant with no give. Any soft spot indicates a weak seal that will open in boiling water.",
    },
    {
      nodeId: "step_4",
      action: "Boil",
      inputs: ["raw_pierogi", "ing_06", "ing_05"],
      outputState: "finished_pierogi",
      instructions: "Bring a large pot of heavily salted water to a rolling boil. Add pierogi in batches — do not crowd. They will sink, then float to the surface after 2 minutes. After they float, cook 2 minutes more for a total of 4–5 minutes. Remove with a slotted spoon. For the classic finish, melt butter in a wide pan over medium heat, add the remaining diced onion and cook until golden. Toss the boiled pierogi in the browned butter for 2 minutes until lightly crisped on one side.",
      visualCue: {
        primaryTarget: "Pierogi are puffed, slightly translucent, and glistening with butter. One flat side shows a light golden-brown from the pan, while the other side remains smooth and pale.",
        spectrum: [
          { state: "Underdone", description: "Pierogi are still slightly firm and chewy. The dough edges have not fully softened and the filling is not warm throughout.", action: "Continue boiling for 1–2 more minutes. The dough goes from tough to yielding quickly — check frequently." },
          { state: "Perfect",   description: "Dough is silky, tender, and yielding — it cuts easily with the side of a fork. The filling is hot and creamy. The buttered side has a light golden crust with the onion perfume all through.", action: "Serve immediately with sour cream, extra caramelized onion, and fresh chives." },
          { state: "Overdone",  description: "Pierogi have burst open. Filling is escaping into the boiling water, clouding it. Dough is mushy and tears easily.", action: "Rescue what you can. Pierogi are delicate — use a large pot with plenty of water and do not overcrowd. A burst pierogi is usually a seal failure or overcrowding." },
        ],
      },
      feelCue: "Pierce a finished pierogi with a fork and it should yield immediately with no resistance — like pressing into very soft bread. The steam that escapes should smell intensely of butter, potato, and onion.",
    },
  ],
};
