export default {
  repoId: "master_french_crispy_duck_legs_001",
  parentRepoId: null,
  slug: "crispy-duck-legs",
  author: "ForkRecipe Kitchen",

  title: "Slow-Rendered Crispy Duck Legs",
  description: "Duck legs cured overnight with thyme and salt, then rendered low and slow until the fat is completely liquid beneath a skin that shatters on first bite — the Gascon tradition of patience turning one of the richest cuts in the kitchen into something impossibly light and crisp.",
  cuisine: "French",
  culture: "Gascon",
  category: "proteins",

  tags: ["french", "duck", "gascon", "crispy", "slow-cooked", "thyme", "garlic", "confit-adjacent"],
  difficulty: 3,
  activeTime: "20 min",
  totalTime: "10 hours",
  ratioSystem: "weight",

  stars: 0, forks: 0, contributors: 1, license: "CC-BY-SA",
  createdAt: "2026-06-27", updatedAt: "2026-06-27",

  flavorRadar: { sweet: 0, salty: 3, sour: 0, bitter: 1, umami: 4, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Duck legs, whole (leg and thigh)",  ratioValue: 1200, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_02", role: "Seasoning", name: "Flaky sea salt",                    ratioValue: 20,   defaultUnit: "g", substitutions: ["kosher salt"] },
    { ingId: "ing_03", role: "Herb",      name: "Fresh thyme sprigs",                ratioValue: 15,   defaultUnit: "g", substitutions: ["rosemary", "savory"] },
    { ingId: "ing_04", role: "Allium",    name: "Garlic cloves, halved",             ratioValue: 20,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_05", role: "Seasoning", name: "Black pepper, coarsely cracked",    ratioValue: 4,    defaultUnit: "g", substitutions: [] },
    { ingId: "ing_06", role: "Aromatic",  name: "Bay leaves",                        ratioValue: 3,    defaultUnit: "whole", substitutions: [] },
    { ingId: "ing_07", role: "Garnish",   name: "Fleur de sel",                      ratioValue: 5,    defaultUnit: "g", substitutions: ["Maldon salt"] },
    { ingId: "ing_08", role: "Garnish",   name: "Fresh thyme leaves, stripped",      ratioValue: 5,    defaultUnit: "g", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Cure",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_04", "ing_05", "ing_06"],
      outputState: "cured_duck_legs",
      instructions: "Score the duck skin in a diagonal crosshatch with a sharp knife, cutting through the skin and fat but not the meat beneath. Rub the legs all over with flaky salt, cracked pepper, and thyme, pressing the herbs into the score marks. Tuck garlic halves and bay leaves under and around the legs in a dish. Refrigerate uncovered overnight (8–12 hours). The salt draws moisture from the skin and seasons the meat throughout.",
      visualCue: {
        primaryTarget: "After overnight curing, the skin is completely dry and slightly shrunken over the fat layer. The crosshatch pattern is clearly visible and defined. Moisture has beaded and been reabsorbed.",
        spectrum: [
          { state: "Underdone", description: "Only 1–2 hours of cure. Skin still feels moist and limp.", action: "Extend the cure. The overnight rest is what makes the skin crackle." },
          { state: "Perfect",   description: "Skin feels almost papery — dry, slightly stiff, completely matte. Crosshatch cuts are clean and open. The surface looks like it's already been lightly treated.", action: "Allow to come to room temperature 30 minutes before roasting." },
          { state: "Overdone",  description: "Cured beyond 24 hours — surface has become quite hard and salt-concentrated.", action: "Pat off excess salt with a dry cloth and proceed." },
        ],
      },
      feelCue: "Run your fingertip across the cured skin — it should feel like dry parchment paper. Any tackiness or moisture means the skin needs more uncovered refrigeration time to dry.",
    },
    {
      nodeId: "step_2",
      action: "Roast",
      inputs: ["cured_duck_legs"],
      outputState: "rendered_duck_legs",
      instructions: "Place duck legs skin-side down in a cold, dry, oven-proof skillet or roasting pan. Do not preheat — starting cold prevents the skin from buckling. Place in a cold oven and turn to 130 C (260 F). Cook for 3–4 hours, skin-side down the entire time. The duck fat will render out gradually; the legs will sit in an increasing pool of their own golden fat. Occasionally tilt the pan and spoon off excess fat.",
      visualCue: {
        primaryTarget: "After 3 hours, a generous pool of clear golden duck fat has accumulated in the pan. The skin, visible at the edges of each leg, is amber but not yet golden. The meat has begun to pull slightly from the drumstick bone.",
        spectrum: [
          { state: "Underdone", description: "Very little rendered fat in the pan. Skin still looks white and fatty rather than transparent and rendered.", action: "Continue at 130 C. The low-and-slow approach cannot be rushed — the fat needs time to liquefy through the entire layer." },
          { state: "Perfect",   description: "Large pool of golden fat. Skin at the edges is amber and beginning to feel firm rather than soft. Meat pulls freely from the drumstick tip. The leg has lost perhaps 20% of its original volume.", action: "Increase heat to crisp the skin." },
          { state: "Overdone",  description: "Fat has completely rendered and the duck leg is now beginning to fry in its own fat rather than render. Skin is browning unevenly.", action: "Move immediately to the high-heat crisping stage." },
        ],
      },
      feelCue: "After 3 hours of low rendering, press the leg firmly — it should feel yielding and jiggly under the skin, with no firm pockets of solid fat remaining. The fat is now all liquid.",
    },
    {
      nodeId: "step_3",
      action: "Sear",
      inputs: ["rendered_duck_legs"],
      outputState: "crispy_duck_legs",
      instructions: "Pour off most of the rendered fat into a jar to save. Increase oven to 220 C (425 F) or, for maximum control, transfer legs to a fresh skillet and crisp skin-side down on the stovetop over medium-high heat for 5–8 minutes. Watch attentively — the goal is a shattering, golden-mahogany skin, not burnt. Flip for a final 2 minutes on the meat side.",
      visualCue: {
        primaryTarget: "The skin is a deep, uniform golden-mahogany — not pale gold, not dark brown, but the particular rich amber of perfectly rendered duck skin. It looks visibly dry and crackling.",
        spectrum: [
          { state: "Underdone", description: "Skin is light gold and slightly soft. Pressing it yields a little rather than shattering.", action: "Continue crisping — the skin must lose all its moisture before it will shatter." },
          { state: "Perfect",   description: "Skin is deep amber-mahogany and completely rigid when pressed with a spoon. Tapping it makes a hollow sound. The crosshatch pattern is still visible but gilded.", action: "Rest 3 minutes then season with fleur de sel." },
          { state: "Overdone",  description: "Skin has gone very dark and is beginning to char. The fat beneath may have burnt.", action: "Remove immediately from heat. Trim the darkest patches with scissors. The meat inside is still beautiful." },
        ],
      },
      feelCue: "Press the skin with the back of a spoon — a perfectly rendered and crisped duck leg skin does not flex or give. It shatters slightly under pressure, like thin glass.",
    },
    {
      nodeId: "step_4",
      action: "Garnish",
      inputs: ["crispy_duck_legs", "ing_07", "ing_08"],
      outputState: "finished_duck_legs",
      instructions: "Rest the duck legs for 3 minutes — just enough for carryover cooking to complete, not long enough for the skin to steam and soften. Sprinkle with fleur de sel and fresh thyme leaves. Serve skin-side up, immediately, with lentils du Puy, sautéed wild mushrooms, or a bitter green salad dressed with the rendered duck fat.",
      visualCue: {
        primaryTarget: "A deep amber leg, skin taut and crackling, with the white crystals of fleur de sel catching the light. A few thyme leaves scattered across the surface.",
        spectrum: [
          { state: "Underdone", description: "Plated too quickly after the oven. Skin appears moist from steam.", action: "Allow the 3-minute rest on a rack, not a plate, so air circulates under the skin." },
          { state: "Perfect",   description: "Skin is still crackling and dry, the fleur de sel has not dissolved into moisture. Thyme is fragrant from the residual heat. The meat beneath pulls easily from the bone.", action: "Serve immediately." },
          { state: "Overdone",  description: "Rested too long or covered. Skin has gone soft.", action: "Return to a very hot pan for 90 seconds to restore the crackle." },
        ],
      },
      feelCue: "Cut through the skin with a knife — it should make a clearly audible crack, and the pieces should shatter rather than fold. The meat below should offer mild, yielding resistance.",
    },
  ],
};
