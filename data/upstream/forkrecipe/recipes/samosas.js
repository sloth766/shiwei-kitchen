export default {
  repoId: "master_indian_samosas_001",
  parentRepoId: null,
  slug: "samosas",
  author: "ForkRecipe Kitchen",

  title: "Potato & Pea Samosas",
  description: "A shattering pastry shell that gives way to a warmly spiced interior of cumin-fragrant potato and bright peas — the hallmark is the dough made with minimal water for maximum flakiness, and the filling cooled completely so the shell never steams from within.",
  cuisine: "Indian",
  culture: "North Indian",
  category: "breads",

  tags: ["indian", "pastry", "potato", "vegan", "fried"],
  difficulty: 3,
  activeTime: "1 hr",
  totalTime: "1 hr 30 min",
  ratioSystem: "parts",

  stars: 1876,
  forks: 212,
  contributors: 27,
  license: "CC-BY-SA",
  createdAt: "2024-07-19",
  updatedAt: "2025-06-01",

  flavorRadar: { sweet: 0, salty: 3, sour: 1, bitter: 0, umami: 2, heat: 3 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "All-purpose flour (maida)",                       ratioValue: 100, defaultUnit: "parts", substitutions: ["whole wheat flour (gives denser shell)"] },
    { ingId: "ing_02", role: "Fat",        name: "Vegetable shortening or ghee (for rubbing into flour)", ratioValue: 20, defaultUnit: "parts", substitutions: ["cold butter", "refined coconut oil"] },
    { ingId: "ing_03", role: "Starch",     name: "Russet potatoes, boiled and roughly mashed",      ratioValue: 80,  defaultUnit: "parts", substitutions: ["Yukon Gold potatoes"] },
    { ingId: "ing_04", role: "Structure",  name: "Green peas (fresh or frozen, thawed)",             ratioValue: 20,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Spice",      name: "Filling spice blend (cumin seeds, coriander, amchur, garam masala, green chili, ginger)", ratioValue: 8, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Seasoning",  name: "Fine salt",                                        ratioValue: 3,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Heat",       name: "Neutral frying oil",                               ratioValue: 200, defaultUnit: "parts", substitutions: ["refined groundnut oil"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Knead",
      inputs: ["ing_01", "ing_02", "ing_06"],
      outputState: "samosa_dough",
      instructions: "Combine flour, fat, salt, and 1 tsp ajwain (carom seeds) if available. Rub the fat into the flour with your fingertips for 3–4 minutes until the mixture resembles coarse breadcrumbs with no loose flour remaining — this is the critical step for flakiness. Add ice-cold water 1 tbsp at a time (about 6–8 tbsp total) until the dough just comes together. It should be firm, stiff, and not sticky. Knead for 2 minutes, then rest covered for 20 minutes.",
      visualCue: {
        primaryTarget: "A firm, stiff, smooth dough that holds an impression when pressed but does not stick to hands or surface. Significantly stiffer than bread dough.",
        spectrum: [
          { state: "Underdone", description: "Dough is crumbly and falls apart when squeezed — the fat and flour have not cohered. Too little water.", action: "Add water 1 tsp at a time, kneading after each addition until the dough holds together without crumbling." },
          { state: "Perfect",   description: "Smooth, firm, non-sticky dough that holds its shape cleanly when rolled into a ball. When pressed with a finger, it slowly springs back halfway. No stickiness on hands.", action: "Cover with a damp cloth and rest for 20 minutes. Resting relaxes the gluten and makes it easier to roll thin without shrinking back." },
          { state: "Overdone",  description: "Dough is soft and slightly sticky from too much water. It stretches easily rather than feeling firm and stiff.", action: "Dust with flour and knead briefly to incorporate. Samosa dough must be stiff — soft dough produces a soft, oily, non-flaky crust." },
        ],
      },
      feelCue: "The properly mixed samosa dough should feel like stiff putty — firm resistance when you press it, but it yields without cracking. It should be notably stiffer than any bread dough you have made.",
    },
    {
      nodeId: "step_2",
      action: "Sauté",
      inputs: ["ing_03", "ing_04", "ing_05"],
      outputState: "samosa_filling",
      instructions: "Heat 1 tbsp oil in a pan over medium-high heat. Add cumin seeds and let them splutter 10 seconds. Add green chili and fresh ginger, cook 30 seconds. Add roughly mashed potato and peas, then all remaining ground spices. Cook for 3–4 minutes, folding rather than stirring to keep some potato texture. Add amchur (dried mango powder) or lemon juice for tartness and salt to taste. Spread on a plate and cool completely before using.",
      visualCue: {
        primaryTarget: "Filling is a golden-yellow with green peas visible throughout. The mixture has some texture — not completely smooth. Peas are intact. The aroma is warm, spiced, and slightly tangy.",
        spectrum: [
          { state: "Underdone", description: "Spices smell raw and the filling tastes flat. Peas are still frozen-cold and have not absorbed any flavour.", action: "Cook for 2 more minutes over medium heat, folding continuously. The spices need to toast briefly in the oil to develop." },
          { state: "Perfect",   description: "Vivid golden filling with whole peas visible. The aroma is complex — toasted cumin, warm coriander, sharp amchur tartness. The mash is mostly smooth with deliberate chunky bits.", action: "Spread on a tray and cool completely before filling. Hot filling creates steam that softens and splits the dough." },
          { state: "Overdone",  description: "Filling is completely smooth and paste-like from over-mashing. Peas have been crushed. The mixture is starting to dry out and stick to the pan.", action: "Proceed — the filling will still taste good. The texture will be smoother than ideal but the samosas will be fine." },
        ],
      },
      feelCue: "The cooled filling should hold its shape when pressed into a ball — if it spreads or feels wet, it is too moist and will soften the dough from the inside during frying.",
    },
    {
      nodeId: "step_3",
      action: "Shape",
      inputs: ["samosa_dough", "samosa_filling"],
      outputState: "shaped_samosas",
      instructions: "Divide the rested dough into equal portions and roll each into a thin oval about 18–20cm long and 10cm wide. Cut in half to make two semicircles. Form a cone by folding the straight edge over and sealing with a little water. Fill the cone with 2 tbsp of filling — do not overfill. Pinch the open edge closed firmly, pressing the seam flat. The sealed edge must be completely airtight or the samosa will burst during frying.",
      visualCue: {
        primaryTarget: "Samosas are neat, tightly sealed triangular cones with flat pleated seams. The dough is thin and almost translucent at the widest points. No air pockets visible inside when held to light.",
        spectrum: [
          { state: "Underdone", description: "Seams are poorly sealed with visible gaps or thin spots. The cone walls are thick and uneven. Overfilled samosas bulge at the seams.", action: "Press and re-seal any open seams with water and firm pressure. Excess filling makes sealing impossible — remove some if needed." },
          { state: "Perfect",   description: "Even, thin walls with a tightly sealed pleated seam. The samosa feels firm and compact when squeezed gently. The weight feels right — not too heavy (overfilled) or light (underfilled).", action: "Place on a floured surface, sealed-side down. Fry within 30 minutes or refrigerate up to 4 hours." },
          { state: "Overdone",  description: "Dough has been rolled too thin — it tears when filling is added and the seams cannot hold. The cone walls are nearly paper-thin in spots.", action: "Patch thin spots with small pieces of dough moistened with water. Re-roll with more flour if the dough continues to tear." },
        ],
      },
      feelCue: "Run your finger along the sealed seam — you should feel a continuous ridge of firmly pinched dough with no gaps or soft spots. Press the samosa gently — it should feel like a tightly packed ball, with no movement of the filling inside.",
    },
    {
      nodeId: "step_4",
      action: "Fry",
      inputs: ["shaped_samosas", "ing_07"],
      outputState: "finished_samosas",
      instructions: "Heat oil to 160–170°C (325°F) — lower than standard frying temperature. Slide samosas in gently, 3–4 at a time. Fry slowly for 12–15 minutes, turning occasionally, until deep golden. The low temperature slowly renders and crisps the pastry all the way through without burning the exterior before the interior heats. Drain on a wire rack, not paper towels — steam must escape from all sides to keep the crust crisp.",
      visualCue: {
        primaryTarget: "Uniformly deep golden-brown across all surfaces, with a slightly blistered texture on the walls. Colour is the deep gold of good toast, not the pale gold of underfried dough.",
        spectrum: [
          { state: "Underdone", description: "Pale yellow-gold exterior that looks dry rather than golden. The pastry feels soft rather than firm when tapped. The interior is not yet hot enough.", action: "Continue frying at the same temperature. Do not increase heat — this will brown the outside while leaving the inside raw." },
          { state: "Perfect",   description: "Deep, even golden-brown with a slightly pebbly, blistered surface. Tapping the samosa produces a hollow sound like tapping a wooden block. The pastry is visibly rigid and shatter-ready.", action: "Remove to a wire rack. Taste one immediately — the seam should crack cleanly and the inside should be steaming hot." },
          { state: "Overdone",  description: "Dark amber-brown verging on red-brown. Some dark spots forming. The oil smells acrid. The pastry is very rigid and has thickened slightly from overcooking.", action: "Remove immediately and drain. The exterior is deeply caramelized but the inside is likely fine. Let cool 2 minutes before eating." },
        ],
      },
      feelCue: "A perfectly fried samosa will produce a shattering crack when you bite through the shell — like breaking a cracker — and release a puff of spiced steam. If it gives silently without cracking, it was fried at too high a temperature and the pastry is dense rather than flaky.",
    },
  ],
};
