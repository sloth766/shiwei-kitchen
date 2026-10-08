export default {
  repoId: "master_japanese_agedashi_tofu_001",
  parentRepoId: null,
  slug: "agedashi-tofu",
  author: "ForkRecipe Kitchen",

  title: "Agedashi Tofu",
  description: "Silken tofu cubes dusted in potato starch and fried until their coating puffs into a trembling, semi-translucent shell, then set adrift in warm tentsuyu broth that seeps through the crust in real time — agedashi is the izakaya dish that teaches you the beauty of transience.",
  cuisine: "Japanese",
  culture: "Japanese Izakaya",
  category: "proteins",

  tags: ["japanese", "tofu", "fried", "dashi", "izakaya"],
  difficulty: 2,
  activeTime: "20 min",
  totalTime: "30 min",
  ratioSystem: "parts",

  stars: 1654,
  forks: 142,
  contributors: 18,
  license: "CC-BY-SA",
  createdAt: "2024-08-19",
  updatedAt: "2025-10-02",

  flavorRadar: { sweet: 1, salty: 3, sour: 0, bitter: 0, umami: 4, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Silken or soft tofu",                  ratioValue: 100, defaultUnit: "parts", substitutions: ["firm tofu (less custardy)"] },
    { ingId: "ing_02", role: "Starch",    name: "Katakuriko (potato starch)",            ratioValue: 15,  defaultUnit: "parts", substitutions: ["cornstarch"] },
    { ingId: "ing_03", role: "Liquid",    name: "Dashi (kombu + katsuobushi)",           ratioValue: 60,  defaultUnit: "parts", substitutions: ["kombu dashi (vegan)", "shiitake dashi"] },
    { ingId: "ing_04", role: "Seasoning", name: "Soy sauce (usukuchi light soy)",        ratioValue: 10,  defaultUnit: "parts", substitutions: ["regular soy sauce (darker result)"] },
    { ingId: "ing_05", role: "Sweetener", name: "Mirin",                                ratioValue: 10,  defaultUnit: "parts", substitutions: ["sake + pinch of sugar"] },
    { ingId: "ing_06", role: "Fat",       name: "Neutral frying oil",                   ratioValue: 200, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Garnish",   name: "Grated daikon, grated ginger, katsuobushi, green onion", ratioValue: 5, defaultUnit: "parts", substitutions: ["myoga ginger", "shichimi"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Press and dry",
      inputs: ["ing_01"],
      outputState: "dried_tofu",
      instructions: "Remove the tofu from its packaging and wrap in 3-4 layers of paper towels. Place on a flat surface with a small plate on top as a weight — do not use heavy books, which will crush silken tofu. Let rest for 15 minutes to draw surface moisture. Cut into 6-8 cubes, approximately 4x4cm. Very gently pat each cut face dry with paper towels. This step is essential: surface moisture causes the starch coating to dissolve before frying, resulting in a bald, oil-soaked cube rather than a crisp shell.",
      visualCue: {
        primaryTarget: "Tofu cubes are visibly drier — the surface has a slight matte appearance rather than the wet-glossy look of fresh tofu. No water pooling on the cutting board.",
        spectrum: [
          { state: "Underdone", description: "Cubes are still very wet. A fingerprint on the surface immediately fills with moisture. Paper towels are completely saturated.", action: "Re-wrap in fresh paper towels for another 5-10 minutes. Wet tofu will steam-fry rather than crisp." },
          { state: "Perfect",   description: "Surfaces are matte and slightly tacky. Cubes feel firmer than fresh tofu but still jiggle when the board is shaken. Fingerprint mark stays visible.", action: "Proceed to dusting with starch immediately — do not let them sit long after drying." },
          { state: "Overdone",  description: "Tofu surface is beginning to look slightly dessicated — the outer 1mm has dried out and appears white and papery.", action: "Proceed anyway. The exterior may be slightly firmer than ideal but will still fry well." },
        ],
      },
      feelCue: "A dried tofu cube should feel like a firm piece of very cold butter — slightly resistant to your fingers but still clearly yielding inside if you press more firmly.",
    },
    {
      nodeId: "step_2",
      action: "Simmer",
      inputs: ["ing_03", "ing_04", "ing_05"],
      outputState: "tentsuyu_sauce",
      instructions: "Combine dashi, usukuchi soy sauce, and mirin in a small saucepan. Bring to a gentle simmer over medium heat, stirring to combine. Cook for 2 minutes. Taste — it should be lightly salty, savory with a background sweetness, and clean. The pale soy sauce is traditional for agedashi to preserve the golden color of the sauce; regular soy makes a darker, deeper version. Keep warm until needed.",
      visualCue: {
        primaryTarget: "Sauce is pale amber-gold in color, gently steaming. Surface shows tiny bubbles from the simmering but no rolling boil.",
        spectrum: [
          { state: "Underdone", description: "Sauce is cold or barely warm. Mirin has not fully incorporated — the sauce smells boozy and sweet separately.", action: "Simmer for at least 2 full minutes to cook off the raw alcohol and marry the flavors." },
          { state: "Perfect",   description: "Sauce is uniformly warm, pale golden, and smells of savory dashi with a gentle sweetness. The alcohol smell from the mirin has disappeared.", action: "Keep covered on the lowest heat until the tofu is fried." },
          { state: "Overdone",  description: "Sauce has reduced significantly and is now darker and very salty. Volume is noticeably less than started.", action: "Add more dashi to bring back to the correct volume and dilute the salt. Do not re-boil." },
        ],
      },
      feelCue: "The tentsuyu should smell of the sea from the dashi and taste clean and gently savory on your tongue — not sharp, not sweet, a background note that amplifies the tofu.",
    },
    {
      nodeId: "step_3",
      action: "Fry",
      inputs: ["dried_tofu", "ing_02", "ing_06"],
      outputState: "fried_tofu",
      instructions: "Heat oil to 180°C (355°F) in a deep, narrow pot or small wok. Working quickly, roll each tofu cube in potato starch, pressing gently to adhere, then shake off excess — you want a thin, even dust, not a thick coat. Lower cubes into oil one at a time using chopsticks or a spider. Fry 3-4 pieces at a time for 2-3 minutes, turning once, until the coating is set and very pale gold. The coating should be almost translucent, not deeply browned.",
      visualCue: {
        primaryTarget: "Coating is set but barely golden — almost transparent, faintly cream-colored. Cubes float freely and the bubbling around them is steady and medium-vigorous.",
        spectrum: [
          { state: "Underdone", description: "Coating is still soft and white — it has not set. Cubes may be sticking to each other. Oil temperature too low.", action: "Increase oil temperature and wait for the full 3 minutes. Moving pieces too early tears the soft coating." },
          { state: "Perfect",   description: "Coating is lightly set, semi-translucent, and just barely gold. Cubes do not stick together. When lifted, oil drips cleanly away.", action: "Remove and drain on a rack. Plate and add broth immediately." },
          { state: "Overdone",  description: "Coating is deep golden and beginning to brown. The subtle, delicate shell has become a thick, crisp crust.", action: "Proceed — still delicious, but the traditional translucent coating is gone. Reduce temperature for the next batch." },
        ],
      },
      feelCue: "Properly fried agedashi coating is whisper-thin — you can almost see the white tofu through it, like a frosted glass pane. If it is opaque and solid, it is overdone.",
    },
    {
      nodeId: "step_4",
      action: "Assemble",
      inputs: ["fried_tofu", "tentsuyu_sauce", "ing_07"],
      outputState: "finished_agedashi_tofu",
      instructions: "Place 2-3 fried tofu cubes in a small, deep bowl. Ladle hot tentsuyu sauce over and around them immediately — the sauce should come about halfway up the sides of the cubes. Garnish the top of each cube with a small mound of grated daikon, a pinch of grated ginger, a few strands of katsuobushi (which will wave in the heat), and thinly sliced green onion. Serve within 60 seconds. The entire magic of agedashi is the moment when the crisp coating begins to absorb the broth — this process starts the second you pour the sauce.",
      visualCue: {
        primaryTarget: "Cubes sit half-submerged in pale golden broth. Garnishes are placed on top. Katsuobushi flutters. The coating at the waterline is already beginning to soften and become translucent.",
        spectrum: [
          { state: "Underdone", description: "Tofu has been plated without broth or the broth has not been poured. No interplay between coating and sauce yet.", action: "Add hot broth immediately. This is the defining interaction of the dish." },
          { state: "Perfect",   description: "Broth is gently steaming. The coating just at the broth line has softened to a silky, gel-like texture while the top is still barely crisp. Katsuobushi is moving.", action: "Serve and eat immediately. This window lasts about 2 minutes." },
          { state: "Overdone",  description: "Tofu has been sitting in broth for too long. The entire coating has dissolved into the sauce. Cubes are soft and waterlogged throughout.", action: "Still delicious as a soft tofu in broth dish, but the textural contrast is gone. Serve faster next time." },
        ],
      },
      feelCue: "Eat agedashi with a spoon — pierce the softened coating, let the hot broth flood in, and experience the simultaneous softness of tofu and the barely-there resistance of the dissolving crust.",
    },
  ],
};
