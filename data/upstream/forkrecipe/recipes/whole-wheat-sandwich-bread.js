export default {
  repoId: "master_american_whole_wheat_sandwich_001",
  parentRepoId: null,
  slug: "whole-wheat-sandwich-bread",
  author: "ForkRecipe Kitchen",

  title: "Whole Wheat Sandwich Bread",
  description: "A tender, slightly sweet whole-grain loaf built for the everyday sandwich — soft enough to compress under a knife without tearing, with just enough whole wheat earthiness to make you feel like you've done something right.",
  cuisine: "American",
  culture: "Home Baking",
  category: "breads",

  tags: ["whole-wheat", "sandwich", "everyday", "loaf", "soft", "home-baking"],
  difficulty: 2,
  activeTime: "40 min",
  totalTime: "3 hr 30 min",
  ratioSystem: "parts",

  stars: 982,
  forks: 112,
  contributors: 41,
  license: "CC-BY-SA",
  createdAt: "2024-12-01",
  updatedAt: "2025-02-20",

  flavorRadar: { sweet: 2, salty: 2, sour: 1, bitter: 1, umami: 1, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Whole wheat flour",                    ratioValue: 50,  defaultUnit: "parts", substitutions: ["white whole wheat flour"] },
    { ingId: "ing_02", role: "Structure",  name: "All-purpose flour",                    ratioValue: 50,  defaultUnit: "parts", substitutions: ["bread flour"] },
    { ingId: "ing_03", role: "Hydration",  name: "Warm water (105°F)",                   ratioValue: 72,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Leavener",   name: "Instant dry yeast",                    ratioValue: 1.2, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Sweetener",  name: "Honey",                                ratioValue: 4,   defaultUnit: "parts", substitutions: ["maple syrup", "sugar"] },
    { ingId: "ing_06", role: "Seasoning",  name: "Fine salt",                            ratioValue: 1.8, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Fat",        name: "Neutral oil (canola or sunflower)",     ratioValue: 3,   defaultUnit: "parts", substitutions: ["melted butter"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Hydrate",
      inputs: ["ing_01", "ing_02", "ing_03"],
      outputState: "soaked_flour",
      instructions: "Combine both flours with the warm water and mix until no dry flour remains. Cover and rest for 20 minutes. This brief soaker hydrates the bran in the whole wheat flour, giving it time to absorb water and soften the sharp bran edges that would otherwise cut through the gluten network and produce a dense, crumbly loaf. Whole wheat bran is hygroscopic — pre-hydrating it dramatically improves the final crumb's tenderness.",
      visualCue: {
        primaryTarget: "A rough, uniformly moist dough mass with no dry spots. Color will be medium brown from the whole wheat.",
        spectrum: [
          { state: "Underdone", description: "Dry flour patches still visible. Mixture is not fully combined.", action: "Mix another minute by hand, ensuring all flour is moistened." },
          { state: "Perfect",   description: "Uniform moist dough. No dry patches. Rough surface with slight tackiness. Ready for the rest period.", action: "Cover and rest 20 minutes before adding yeast and other ingredients." },
          { state: "Overdone",  description: "Over-mixed before adding other ingredients — no real harm done at this stage.", action: "Proceed to add remaining ingredients." },
        ],
      },
      feelCue: "The soaked flour should feel like cool, damp modeling clay — dense and uniform. Press it and it should hold an impression without springing back at all. The whole wheat adds a slightly gritty texture at this stage.",
    },
    {
      nodeId: "step_2",
      action: "Knead",
      inputs: ["soaked_flour", "ing_04", "ing_05", "ing_06", "ing_07"],
      outputState: "developed_sandwich_dough",
      instructions: "Add yeast, honey, salt, and oil to the soaked flour mixture. Mix on low in a stand mixer until combined, then increase to medium and knead for 8–10 minutes. The dough will be softer and stickier than white bread dough due to the whole wheat's lower gluten yield. Resist adding extra flour — a slightly tacky dough produces a moister, more tender loaf. The dough is ready when it passes a rough windowpane: thin enough to see light, even if it tears slightly.",
      visualCue: {
        primaryTarget: "A soft, slightly tacky dough that cleans the bowl after kneading. Smoother than when started but still somewhat rough-surfaced.",
        spectrum: [
          { state: "Underdone", description: "Tears immediately when stretched. Rough and uneven. Won't hold a ball shape.", action: "Continue kneading on medium for 3–5 more minutes." },
          { state: "Perfect",   description: "Soft, tacky but not sticky. Clears bowl sides. Stretches 3–4cm before tearing — not a full windowpane but close.", action: "Proof in oiled bowl until doubled, about 60–90 minutes." },
          { state: "Overdone",  description: "Tight, fighting the hook. Feels warm.", action: "Rest 10 minutes and proceed." },
        ],
      },
      feelCue: "Whole wheat sandwich dough should feel softer and slightly stickier than pure white bread dough — like soft putty with just a hint of graininess from the bran. It should stick just faintly to your hand when you touch it but release cleanly.",
    },
    {
      nodeId: "step_3",
      action: "Shape",
      inputs: ["developed_sandwich_dough"],
      outputState: "shaped_loaf",
      instructions: "After doubling, punch down the dough and turn onto a lightly floured surface. Pat into a rectangle roughly the width of your 9×5 loaf pan. Fold the two short ends toward the center, then roll the dough away from you into a tight cylinder. Pinch the seam closed. Place seam-side down in a greased 9×5 pan. The cylinder should fill the pan 60–70% full. Cover and proof until the crown rises 2–3cm above the pan rim, about 45–60 minutes at 75°F.",
      visualCue: {
        primaryTarget: "The dough crown sits 2–3cm above the pan rim, slightly domed and airy when shaken. When poked, the indent springs back halfway in 3 seconds.",
        spectrum: [
          { state: "Underdone", description: "Crown still level with or below the rim. Dough feels dense when jiggled.", action: "Continue proofing in a warm spot, covered." },
          { state: "Perfect",   description: "Crown domed 2–3cm above the rim. Airy jiggle. Poke springs back halfway slowly.", action: "Bake at 375°F for 30–35 minutes." },
          { state: "Overdone",  description: "Crown peeking 5+ cm above the rim, sagging slightly over the sides.", action: "Bake immediately. The crust will dome less in the oven but the bread will still be fine." },
        ],
      },
      feelCue: "Before baking, the proofed loaf should feel like a very full water balloon — taut and airy, yielding to the slightest touch but holding its shape overall. The dough surface should feel dry and warm from proofing.",
    },
    {
      nodeId: "step_4",
      action: "Bake",
      inputs: ["shaped_loaf"],
      outputState: "finished_sandwich_bread",
      instructions: "Bake at 375°F (190°C) for 30–35 minutes until the top is deep golden brown and the internal temperature reaches 190–195°F (88–90°C). An instant-read thermometer is the most reliable test. Cool in the pan for 10 minutes, then unmold and cool completely on a wire rack — at least 1 hour. The crumb sets as it cools; slicing early produces a gummy texture and compresses the slices permanently.",
      visualCue: {
        primaryTarget: "Deep golden-brown top crust, slightly pulled away from the pan sides. Internal temperature 190–195°F. Bottom taps hollow.",
        spectrum: [
          { state: "Underdone", description: "Pale top. Internal temp below 185°F. The loaf sounds dense when tapped. May collapse slightly when removed from pan.", action: "Return to oven for 8 more minutes, tent with foil to prevent further browning." },
          { state: "Perfect",   description: "Deep golden dome. Internal 190°F. Hollow knock. When sliced after cooling, the crumb is tender and slightly moist without being gummy.", action: "Cool fully on a wire rack before slicing." },
          { state: "Overdone",  description: "Dark brown top, deep amber sides. Internal over 200°F. Crumb may be dry.", action: "Cool and slice — it will make excellent toast." },
        ],
      },
      feelCue: "After cooling for an hour, the loaf should feel light and springy when squeezed gently from the sides. The crust will be firm but not hard. When sliced, each piece should hold its shape without crumbling or compressing — the test of a great sandwich bread.",
    },
  ],
};
