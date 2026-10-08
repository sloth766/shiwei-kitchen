// Akara — Yoruba black-eyed pea fritters, crispy outside, pillowy within.
// Author: SpiceTrader

export default {
  repoId: "master_nigerian_akara_bean_fritters_001",
  parentRepoId: null,
  slug: "akara-bean-fritters",
  author: "ForkRecipe Kitchen",

  title: "Akara (Black-Eyed Pea Fritters)",
  description: "Black-eyed peas ground into a light, aerated batter — their skins removed so the paste is pure white and clean-tasting — then dropped by spoonfuls into hot oil where they puff, turn golden, and develop a crust that crackles while hiding a steaming, pillowy interior flecked with onion and chili.",
  cuisine: "Nigerian",
  culture: "Yoruba",
  category: "grains",

  tags: ["nigerian", "black-eyed-peas", "fritters", "vegan", "fried"],
  difficulty: 2,
  activeTime: "30 min",
  totalTime: "1 hr",
  ratioSystem: "parts",

  stars: 1560,
  forks: 140,
  contributors: 18,
  license: "CC-BY-SA",
  createdAt: "2025-03-08",
  updatedAt: "2026-05-14",

  flavorRadar: { sweet: 0, salty: 3, sour: 0, bitter: 0, umami: 2, heat: 3 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Dried black-eyed peas, soaked overnight and skins removed", ratioValue: 10, defaultUnit: "parts", substitutions: ["canned black-eyed peas, well-rinsed and skins rubbed off"] },
    { ingId: "ing_02", role: "Allium",     name: "White onion, roughly chopped",                               ratioValue: 2,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Spice",      name: "Fresh scotch bonnet or habanero pepper, chopped",            ratioValue: 0.5, defaultUnit: "parts", substitutions: ["cayenne powder"] },
    { ingId: "ing_04", role: "Seasoning",  name: "Salt",                                                       ratioValue: 0.5, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Liquid",     name: "Water (for blending batter to correct consistency)",         ratioValue: 1,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Fat",        name: "Vegetable or groundnut oil (for deep-frying)",               ratioValue: 8,  defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Peel and soak beans",
      inputs: ["ing_01"],
      outputState: "peeled_beans",
      instructions: "Soak the dried black-eyed peas in cold water for at least 6 hours or overnight. Drain, then rub the beans vigorously between your palms in a bowl of fresh water — the skins will loosen and float to the top. Skim off the skins and drain, repeating 3–4 times until most skins are removed. Clean, skin-free beans produce a white, fluffy akara batter; beans with skins still on make the fritters dense and grey-tinged. Even a 20-minute soak and aggressive rubbing will remove most skins.",
      visualCue: {
        primaryTarget: "The bowl of beans is full of creamy-white peas with most skins removed. The soaking water runs relatively clear with only a few stray skin fragments.",
        spectrum: [
          { state: "Underdone", description: "Many beans still have grey-green skins attached. The water is brown with released skin pigment.", action: "Rub and skim more aggressively. Skin-free beans are non-negotiable for the white, airy texture of authentic akara." },
          { state: "Perfect",   description: "Beans are predominantly white with most skins floated off. A few remaining skins are acceptable — complete skin removal is labor-intensive and a small number remaining is traditional.", action: "Drain and proceed to blending." },
          { state: "Overdone",  description: "Beans over-soaked (more than 18 hours) — they have begun to ferment slightly and smell sour. The interior has become waterlogged and soft.", action: "Use immediately. The slight ferment can add interesting flavor but the texture is softer — add slightly less water when blending." },
        ],
      },
      feelCue: "Pick up a peeled bean and squeeze it between your fingers — it should be plump, firm, and slightly slippery from soaking. It should split cleanly in half with finger pressure, revealing a pale yellow interior.",
    },
    {
      nodeId: "step_2",
      action: "Blend batter",
      inputs: ["peeled_beans", "ing_02", "ing_03", "ing_04", "ing_05"],
      outputState: "akara_batter",
      instructions: "Combine the peeled beans, onion, scotch bonnet, salt, and just enough water to help the blender run — start with 2 tablespoons and add more sparingly. Blend until very smooth, about 2–3 minutes. The goal is a thick, smooth, fluffy paste, not a thin pourable liquid. Transfer to a bowl and beat the batter vigorously with a wooden spoon or hand mixer for 3–5 minutes — this incorporates air and gives akara its characteristic lightness. The batter should double slightly in volume and turn paler as air is worked in.",
      visualCue: {
        primaryTarget: "Batter is thick, smooth, and pale — almost white. When a spoonful is dropped back into the bowl, it sits in a mound rather than spreading flat instantly. The surface looks slightly aerated.",
        spectrum: [
          { state: "Underdone", description: "Batter is still grainy from under-blending or thick and pasty from too little water. It will produce dense, heavy fritters with a gritty interior.", action: "Blend for another 2 minutes. If too thick, add water half a teaspoon at a time — the batter should be thick but not paste-like." },
          { state: "Perfect",   description: "Smooth, pale, thick batter that falls off the spoon in slow, heavy spoonfuls. When beaten, it lightens in color and develops a slightly foamy appearance on the surface. Holds a mound when dropped.", action: "Begin heating oil and proceed to frying immediately." },
          { state: "Overdone",  description: "Batter has been over-thinned with too much water — it pours like pancake batter. The fritters will spread flat and fry thin, not puff.", action: "Add more peeled beans or a tablespoon of bean flour and blend briefly to thicken. Test by dropping a teaspoon into the oil — if it spreads flat, the batter is still too thin." },
        ],
      },
      feelCue: "Scoop the batter up with a wooden spoon and feel the weight — it should feel substantial, almost resistant to falling. When you lift the spoon and let it fall, the batter should hold its shape for 1–2 seconds before collapsing.",
    },
    {
      nodeId: "step_3",
      action: "Fry in hot oil",
      inputs: ["akara_batter", "ing_06"],
      outputState: "fried_akara",
      instructions: "Heat enough oil in a medium saucepan to give a depth of at least 5 cm. Heat to 175 °C (a small drop of batter should sizzle and rise immediately). Using two spoons or a small ice cream scoop, drop spoonfuls of batter gently into the oil — do not crowd the pot, 4–5 at a time. Fry for 3–4 minutes total, turning gently halfway, until deep golden-brown on all sides. The fritters will puff and become round as they fry. Remove with a slotted spoon and drain on paper towels.",
      visualCue: {
        primaryTarget: "Akara are rounded, golden-brown spheres with a crisp, uniform crust. They bob actively at the oil surface, puffed and holding their shape.",
        spectrum: [
          { state: "Underdone", description: "Fritters are pale golden and soft. They flatten when pressed rather than springing back. The interior is gummy and under-cooked.", action: "Return to oil and continue frying. The oil temperature may have dropped — check with a thermometer and wait for it to recover before adding more batches." },
          { state: "Perfect",   description: "Deep golden-brown, round, and firm. Spring back gently when pressed with a spoon. A faint crackling sound when removed from the oil. Interior is fluffy and fully cooked when split open.", action: "Drain and serve immediately — akara is best in the first 5 minutes out of the oil." },
          { state: "Overdone",  description: "Fritters are very dark brown to reddish-brown with a slightly bitter, over-fried smell. Crust is very thick and hard.", action: "Drain and blot well. The interior is still good but the crust is bitter. Reduce oil temperature by 10 °C for the next batch." },
        ],
      },
      feelCue: "Listen to the oil as the akara cook — the initial loud, violent sizzle of the cold batter hitting the hot oil should quiet to a steady, moderate crackle as the crust forms. When it quiets to that steady crackle, they are close to done.",
    },
    {
      nodeId: "step_4",
      action: "Drain and serve",
      inputs: ["fried_akara"],
      outputState: "finished_akara",
      instructions: "Remove akara with a slotted spoon and drain on a paper towel-lined plate. Serve immediately — hot akara at peak crisp is the entire point of the dish. In Lagos, akara is sold from street stalls in the early morning alongside ogi (fermented corn porridge). Serve with a dipping sauce of tomato, onion, and pepper if desired. Akara made to order, eaten in the street, still crackling from the oil, is one of the great breakfast experiences of West Africa.",
      visualCue: {
        primaryTarget: "Golden-brown fritters sitting upright on the plate, visibly rounded, with oil still glistening on the surface. A split fritter shows a uniform, fluffy, pale yellow interior.",
        spectrum: [
          { state: "Underdone", description: "Fritters have collapsed flat after draining — the air incorporated during beating has escaped. Interior is dense and undercooked.", action: "These are still edible but not ideal. Ensure oil is hot enough for the next batch — cold oil allows the air to escape before the crust sets." },
          { state: "Perfect",   description: "Round, puffed, golden. When split open, the interior is airy and fluffy, pale yellow, fully cooked and fragrant with onion and chili. The crust crackles against the teeth.", action: "Eat immediately. This is the food." },
          { state: "Overdone",  description: "Akara allowed to sit more than 10 minutes — crust has softened and the fritters have deflated. The crackle is gone.", action: "Flash in a 200 °C oven for 3 minutes to restore the crust. Never satisfying as fresh-fried, but recoverable." },
        ],
      },
      feelCue: "Pick up a fresh akara and squeeze it very lightly — the crust should resist your fingers with a brittle crackling sensation, while the interior gives softly inward, like a hollow shell filled with airy foam.",
    },
  ],
};
