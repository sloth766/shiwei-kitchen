export default {
  repoId: "master_turkish_pilaf_001",
  parentRepoId: null,
  slug: "pilaf",
  author: "ForkRecipe Kitchen",

  title: "Butter Pilaf",
  description: "The pillar of Central Asian and Turkish cooking — long-grain rice toasted in butter until translucent and nutty, then steamed in stock with onion and carrot until each grain is firm, separate, and fragrantly golden.",
  cuisine: "Turkish",
  culture: "Turkish/Uzbek",
  category: "grains",

  tags: ["gluten-free", "rice", "turkish", "central-asian", "side-dish"],
  difficulty: 1,
  activeTime: "20 min",
  totalTime: "45 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 0, salty: 2, sour: 0, bitter: 0, umami: 2, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Basmati or long-grain white rice", ratioValue: 300, defaultUnit: "g",   substitutions: ["extra-long grain jasmine rice"] },
    { ingId: "ing_02", role: "Fat",        name: "Unsalted butter",                  ratioValue: 40,  defaultUnit: "g",   substitutions: ["clarified butter (ghee)", "lamb fat for Uzbek plov"] },
    { ingId: "ing_03", role: "Allium",     name: "White onion (finely diced)",       ratioValue: 120, defaultUnit: "g",   substitutions: ["yellow onion"] },
    { ingId: "ing_04", role: "Aromatic",   name: "Carrot (cut into fine julienne)",  ratioValue: 100, defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_05", role: "Liquid",     name: "Chicken or lamb stock (hot)",      ratioValue: 450, defaultUnit: "ml",  substitutions: ["vegetable stock", "water + 1 tsp fine salt"] },
    { ingId: "ing_06", role: "Seasoning",  name: "Fine salt",                        ratioValue: 6,   defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_07", role: "Spice",      name: "Cumin seeds",                      ratioValue: 3,   defaultUnit: "g",   substitutions: ["ground cumin (half the quantity)"] },
    { ingId: "ing_08", role: "Seasoning",  name: "Black pepper (freshly ground)",    ratioValue: 2,   defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_09", role: "Aromatic",   name: "Whole head of garlic (unpeeled, optional)", ratioValue: 1, defaultUnit: "head", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Hydrate",
      inputs: ["ing_01"],
      outputState: "soaked_rice",
      instructions: "Rinse the rice under cold running water, swirling with your hand, until the water runs nearly clear — this removes excess surface starch that would cause the grains to clump. Transfer to a bowl and cover with cold water. Soak for 30 minutes. This hydrates the outer layers of the grain so they can expand uniformly under steam without the center remaining chalky. Drain thoroughly before cooking.",
      visualCue: {
        primaryTarget: "Rinse water has gone from cloudy white to nearly translucent. Soaked grains are slightly swollen and uniformly opaque white.",
        spectrum: [
          { state: "Underdone", description: "Rinse water is still milky white and the grains remain glassy and translucent at the center.", action: "Continue rinsing. The milky water is surface starch — it must go or the pilaf will be gluey." },
          { state: "Perfect",   description: "Water runs almost clear after 4-5 rinses. Grains are uniformly chalk-white and slightly swollen from soaking.", action: "Drain completely in a fine-mesh sieve and allow to sit 2 minutes so excess water drips off." },
          { state: "Overdone",  description: "Rice has soaked more than 1 hour and grains are beginning to break when pinched.", action: "Drain and proceed — cook slightly more gently and reduce the stock by 30 ml." },
        ],
      },
      feelCue: "After soaking, a grain pinched between fingertips should feel slightly springy and moist, bending rather than snapping — it has absorbed enough water to cook evenly.",
    },
    {
      nodeId: "step_2",
      action: "Sauté",
      inputs: ["ing_02", "ing_03", "ing_04", "ing_07"],
      outputState: "softened_aromatics",
      instructions: "Melt the butter in a wide, heavy-bottomed pot with a tight-fitting lid over medium heat until it foams and then settles — this is clarified butter temperature, ideal for frying. Add the diced onion and cook, stirring often, for 5-6 minutes until completely soft and just beginning to turn golden at the edges. Add the carrot julienne and cumin seeds and cook for 3 more minutes until the carrot softens slightly. The pot should smell of warm butter, sweet onion, and earthy cumin.",
      visualCue: {
        primaryTarget: "Onion is completely translucent and soft, tinged gold at the edges. Carrot has softened and the cumin seeds have darkened and become fragrant.",
        spectrum: [
          { state: "Underdone", description: "Onion is still white and firm in the center, with no golden color. Carrot is raw and hard.", action: "Continue cooking — undercooked alliums will leave a sharp, harsh note in the finished pilaf." },
          { state: "Perfect",   description: "Onion is soft, translucent, with gold fringing. Carrot is flexible and slightly shrunken. Cumin seeds are fragrant and a shade darker.", action: "Add the drained rice immediately and begin toasting." },
          { state: "Overdone",  description: "Onion edges are dark brown and beginning to crisp. Cumin seeds are very dark and smell sharp.", action: "Reduce heat immediately and add the rice to stop the cooking — the slight bitterness will be absorbed by the grain." },
        ],
      },
      feelCue: "The butter should still smell clean and nutty — if it smells sharp or burnt, the heat is too high; lower it before adding the rice.",
    },
    {
      nodeId: "step_3",
      action: "Toast",
      inputs: ["soaked_rice", "softened_aromatics"],
      outputState: "toasted_rice",
      instructions: "Add the drained rice to the pot with the aromatics and stir to coat every grain in the butter. Spread the rice in an even layer and cook over medium heat, stirring frequently, for 2-3 minutes. The grains will turn from opaque white to a slightly translucent, glassy appearance, and the pot will smell of warm, toasted grain — like popcorn but delicate. This toasting step coats each grain in fat, which keeps them separate during steaming.",
      visualCue: {
        primaryTarget: "Rice grains appear glassy and slightly translucent, glistening with butter. The mass looks like polished glass beads mixed through the aromatics.",
        spectrum: [
          { state: "Underdone", description: "Grains are still chalky white with no translucency. No toasted aroma.", action: "Continue stirring over medium heat — the translucency is the visual cue that the starch has been coated with fat." },
          { state: "Perfect",   description: "Grains are uniformly translucent with a butter sheen. The pot smells of warm, popcorn-like grain. Nothing has browned.", action: "Add the hot stock and proceed immediately." },
          { state: "Overdone",  description: "Some grains are beginning to turn golden-brown and the pot smells of toasted grain verging on nutty.", action: "Add the stock at once — a little extra toasting is fine and adds nuttiness, but stop before anything browns further." },
        ],
      },
      feelCue: "Stir the translucent rice with a spoon and listen — it makes a dry, glassy, whisper-like sound as the fat-coated grains slide against each other rather than clumping wetly.",
    },
    {
      nodeId: "step_4",
      action: "Simmer",
      inputs: ["toasted_rice", "ing_05", "ing_06", "ing_08", "ing_09"],
      outputState: "cooked_pilaf",
      instructions: "Pour the hot stock over the toasted rice — it will hiss and steam immediately. Add salt and black pepper. If using, nestle the whole unpeeled head of garlic into the center of the rice, cut side down (it perfumes the steam without making the pilaf garlicky). Stir once to distribute everything. Bring to a full boil over high heat, then immediately reduce to the absolute lowest setting. Cover tightly with the lid and cook for 15 minutes without lifting the lid once.",
      visualCue: {
        primaryTarget: "Boiling starts within 2-3 minutes, then subsides to a quiet simmer hidden under the lid. No steam should escape — a tight lid is essential.",
        spectrum: [
          { state: "Underdone", description: "After 15 minutes the lid lifts to reveal standing liquid still pooled across the surface.", action: "Replace the lid and continue on the lowest heat for 3-5 more minutes, then check again." },
          { state: "Perfect",   description: "After 15 minutes, all liquid has been absorbed. The rice surface is dimpled with small steam-hole craters. Grains at the edges are fluffy and separate.", action: "Remove from heat without lifting the lid and allow to rest for 10 minutes." },
          { state: "Overdone",  description: "A burning smell rises from the pot before the 15 minutes are up.", action: "Remove from heat immediately. The bottom may have formed a slight crust — leave the lid on and rest off heat, which will allow steam to loosen it." },
        ],
      },
      feelCue: "After 10 minutes of cooking, press your palm flat against the lid — you should feel the rhythmic warmth of rising steam but no liquid condensation dripping back; that means the rice is properly steam-cooking rather than boiling.",
    },
    {
      nodeId: "step_5",
      action: "Rest",
      inputs: ["cooked_pilaf"],
      outputState: "finished_pilaf",
      instructions: "Remove the pot from heat and let it rest, completely undisturbed with the lid on, for 10 minutes. This is not optional — it is the moment the steam redistributes through the grains, equalizing moisture and ensuring even texture. After 10 minutes, remove the lid and the garlic head (if used). Using a fork or the handle of a wooden spoon, gently fluff the rice from the bottom up with light, lifting motions — never press down or stir aggressively, which would crush the grains.",
      visualCue: {
        primaryTarget: "Each grain is distinct, elongated, fluffy, and completely separate. The rice pours off the fork in a gentle cascade of individual grains, not clumps.",
        spectrum: [
          { state: "Underdone", description: "Some grains in the center are still slightly firm and not quite fluffy. The rice seems a little dense.", action: "Re-cover and rest another 5 minutes — the residual heat will finish the center grains gently." },
          { state: "Perfect",   description: "Every grain is tender, fluffy, and completely separate. Carrot and onion are distributed throughout. The bottom has a very thin, lightly golden crust that releases cleanly.", action: "Serve immediately or keep covered with a clean cloth under the lid to hold heat for up to 20 minutes." },
          { state: "Overdone",  description: "Grains are soft and beginning to clump. The bottom crust is dark brown.", action: "Fluff immediately and serve at once — the texture will not worsen but it will not improve with more time." },
        ],
      },
      feelCue: "A perfectly rested pilaf grain, pressed between thumb and forefinger, should give with a gentle sigh of yielding starch — fully cooked, never mushy, like pressing a tiny pillow.",
    },
  ],
};
