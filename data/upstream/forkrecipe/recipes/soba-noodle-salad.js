export default {
  repoId: "master_japanese_soba_noodle_salad_001",
  parentRepoId: null,
  slug: "soba-noodle-salad",
  author: "ForkRecipe Kitchen",

  title: "Cold Soba Noodle Salad",
  description: "Chilled buckwheat noodles dressed in a sesame-soy tsuyu that is simultaneously salty, nutty, and bright with rice vinegar — the kind of bowl that feels like relief on a hot afternoon.",
  cuisine: "Japanese",
  culture: "Japanese",
  category: "grains",

  tags: ["japanese", "soba", "noodle", "cold", "vegan"],
  difficulty: 1,
  activeTime: "20 min",
  totalTime: "30 min",
  ratioSystem: "parts",

  stars: 1204,
  forks: 97,
  contributors: 14,
  license: "CC-BY-SA",
  createdAt: "2024-07-20",
  updatedAt: "2025-06-30",

  flavorRadar: { sweet: 2, salty: 3, sour: 2, bitter: 0, umami: 3, heat: 1 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Dried soba noodles (100% buckwheat or blended)", ratioValue: 100, defaultUnit: "parts", substitutions: ["ramen noodles", "rice noodles for gluten-free"] },
    { ingId: "ing_02", role: "Seasoning",  name: "Soy sauce (low-sodium preferred)",               ratioValue: 15,  defaultUnit: "parts", substitutions: ["tamari for gluten-free", "coconut aminos"] },
    { ingId: "ing_03", role: "Fat",        name: "Toasted sesame oil",                              ratioValue: 8,   defaultUnit: "parts", substitutions: ["chili sesame oil for heat"] },
    { ingId: "ing_04", role: "Acid",       name: "Rice vinegar",                                    ratioValue: 8,   defaultUnit: "parts", substitutions: ["ponzu", "lime juice"] },
    { ingId: "ing_05", role: "Sweetener",  name: "Mirin or honey",                                  ratioValue: 6,   defaultUnit: "parts", substitutions: ["maple syrup", "agave"] },
    { ingId: "ing_06", role: "Heat",       name: "Grated fresh ginger",                             ratioValue: 3,   defaultUnit: "parts", substitutions: ["ginger paste"] },
    { ingId: "ing_07", role: "Garnish",    name: "Toasted sesame seeds and sliced spring onions",   ratioValue: 4,   defaultUnit: "parts", substitutions: ["nori strips", "shichimi togarashi"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Mix",
      inputs: ["ing_02", "ing_03", "ing_04", "ing_05", "ing_06"],
      outputState: "sesame_dressing",
      instructions: "Whisk together the soy sauce, sesame oil, rice vinegar, mirin, and grated ginger in a small bowl until fully combined. Taste and adjust: the balance should be salty from the soy, sharp from the vinegar, and with a clean sweetness from the mirin that rounds the edges. Make the dressing first so the flavours have time to meld while you cook the noodles.",
      visualCue: {
        primaryTarget: "A smooth, uniformly dark-amber dressing with no streaks of oil sitting on the surface. The oil should be fully emulsified.",
        spectrum: [
          { state: "Underdone", description: "Sesame oil is floating in a separate pool on top. The dressing looks split and oily.", action: "Whisk more vigorously. Ginger helps with emulsification — grate more finely for better binding." },
          { state: "Perfect",   description: "Uniform dark amber, slightly thickened. Sesame oil is fully incorporated. Tastes balanced: salty, tangy, sweet, nutty.", action: "Set aside and cook the noodles." },
          { state: "Overdone",  description: "Over-whisked — the dressing looks foamy and aerated.", action: "Let it settle for a minute. The foam will subside and the dressing is still perfectly usable." },
        ],
      },
      feelCue: "The dressing should smell of toasted sesame, soy, and ginger simultaneously — if one note dominates, adjust: a touch more vinegar for brightness, a touch more mirin for sweetness.",
    },
    {
      nodeId: "step_2",
      action: "Boil and chill",
      inputs: ["ing_01"],
      outputState: "chilled_noodles",
      instructions: "Bring a large pot of unsalted water to a rolling boil. Add the soba noodles and cook according to package directions, usually 4–6 minutes, stirring often to prevent clumping. When al dente, drain immediately and transfer to a large bowl of ice water. Agitate the noodles with your hands for 30 seconds to remove surface starch and chill thoroughly. Drain and shake off excess water. Soba becomes gluey if allowed to sit in warm water or without rinsing.",
      visualCue: {
        primaryTarget: "Noodles are chilled, separated, and have a slight sheen from the starch rinse. They hold their round cross-section and do not stick together.",
        spectrum: [
          { state: "Underdone", description: "Noodles feel stiff and chalky when bitten. Centre is still firm buckwheat-white.", action: "Return to boiling water for 1 minute more and re-test." },
          { state: "Perfect",   description: "Noodles are tender but with a slight buckwheat resistance. Chilled through, separated, and bouncy. Surface is no longer sticky.", action: "Drain well and dress immediately." },
          { state: "Overdone",  description: "Noodles are soft, floppy, and beginning to fall apart at the ends. They clump easily.", action: "Handle gently, dress lightly. The texture will be softer but the flavour is unchanged." },
        ],
      },
      feelCue: "Chilled soba should feel smooth and silky between your fingers, each strand separate — when you lift a handful, they should cascade back into the bowl individually, not in clumps.",
    },
    {
      nodeId: "step_3",
      action: "Toss and dress",
      inputs: ["chilled_noodles", "sesame_dressing"],
      outputState: "dressed_noodles",
      instructions: "Add the chilled, well-drained noodles to the dressing and toss using chopsticks or tongs, lifting and turning rather than stirring, for 1–2 minutes. Every strand should be evenly coated. Do not add all the dressing at once — start with three-quarters and add more to taste. The noodles will continue to absorb the dressing as they sit.",
      visualCue: {
        primaryTarget: "Every noodle strand is uniformly coated in a glossy, amber dressing. No white dry patches of noodle visible. The bowl looks glistening and dark.",
        spectrum: [
          { state: "Underdone", description: "Some noodles are pale and undressed. The dressing pools at the bottom of the bowl.", action: "Continue tossing and lifting. Chopsticks are better than spoons for reaching every strand." },
          { state: "Perfect",   description: "Uniform amber coating on every strand. The bowl smells of sesame, soy and ginger. Noodles slide over each other without sticking.", action: "Add garnishes and serve." },
          { state: "Overdone",  description: "Noodles are over-dressed and swimming in excess liquid. The texture is beginning to soften.", action: "Gently squeeze excess liquid from noodles. Serve quickly before the texture deteriorates further." },
        ],
      },
      feelCue: "Lift a tangle of dressed noodles — they should cascade in glossy ribbons without clumping. A strand pressed between fingers should feel smooth and slicked, not wet or slimy.",
    },
    {
      nodeId: "step_4",
      action: "Garnish and serve",
      inputs: ["dressed_noodles", "ing_07"],
      outputState: "finished_soba_salad",
      instructions: "Divide the dressed noodles between chilled serving bowls or a platter. Scatter toasted sesame seeds and sliced spring onions over the top. Serve immediately — the noodles are best within 10 minutes of dressing. If making ahead, keep noodles and dressing separate and combine just before serving.",
      visualCue: {
        primaryTarget: "Dark amber noodle coils crowned with white sesame seeds and vivid green spring onion rings. The bowl is cold to the touch.",
        spectrum: [
          { state: "Underdone", description: "Garnishes are absent or sparse. The bowl looks monochromatic and textureless.", action: "Add more sesame seeds and spring onions — they contribute texture and visual contrast that is part of the eating experience." },
          { state: "Perfect",   description: "Generous scatter of seeds and spring onion. Noodles still cold and separated. The bowl is vibrant and aromatic.", action: "Serve immediately while still cold." },
          { state: "Overdone",  description: "Noodles have been sitting for more than 20 minutes — they have absorbed all the dressing and become dry and clumped.", action: "Add a small drizzle of sesame oil and a splash of soy sauce, toss again. Next time, dress and serve at once." },
        ],
      },
      feelCue: "The bowl should feel cold in your hands — if it has warmed to room temperature, the entire experience changes; the flavours flatten and the texture dulls.",
    },
  ],
};
