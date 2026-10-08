export default {
  repoId: "master_peruvian_causa_limena_001",
  parentRepoId: null,
  slug: "causa-limena",
  author: "ForkRecipe Kitchen",
  title: "Causa Limeña",
  description: "A cold Limeño terrine of yellow potato mashed with ají amarillo and lime — tangy, sunny, and surprisingly bold — pressed around a filling of creamy tuna salad and sliced avocado, then chilled into a firm, sliceable tower that reveals its layers only when cut.",
  cuisine: "Peruvian",
  culture: "Lima",
  category: "vegetables",
  tags: ["peruvian", "potato", "terrine", "aji-amarillo", "lime", "avocado", "tuna", "cold"],
  difficulty: 3,
  activeTime: "45 min",
  totalTime: "2 hr",
  ratioSystem: "weight",
  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",
  flavorRadar: { sweet: 0, salty: 3, sour: 3, bitter: 0, umami: 3, heat: 2 },
  ingredients: [
    {
      ingId: "ing_01",
      role: "Starch",
      name: "Yellow-fleshed potato (papa amarilla or Yukon Gold, peeled)",
      ratioValue: 800,
      defaultUnit: "g",
      substitutions: ["russet potato (blander, but works)"],
    },
    {
      ingId: "ing_02",
      role: "Heat",
      name: "Ají amarillo paste",
      ratioValue: 60,
      defaultUnit: "g",
      substitutions: ["yellow bell pepper purée + ½ tsp cayenne (milder)"],
    },
    {
      ingId: "ing_03",
      role: "Acid",
      name: "Fresh lime juice",
      ratioValue: 45,
      defaultUnit: "g",
      substitutions: ["lemon juice"],
    },
    {
      ingId: "ing_04",
      role: "Fat",
      name: "Neutral oil (vegetable or sunflower)",
      ratioValue: 50,
      defaultUnit: "g",
      substitutions: ["light olive oil"],
    },
    {
      ingId: "ing_05",
      role: "Seasoning",
      name: "Fine salt",
      ratioValue: 10,
      defaultUnit: "g",
      substitutions: [],
    },
    {
      ingId: "ing_06",
      role: "Protein",
      name: "Canned tuna in olive oil (drained)",
      ratioValue: 300,
      defaultUnit: "g",
      substitutions: ["poached chicken breast, finely shredded", "canned salmon"],
    },
    {
      ingId: "ing_07",
      role: "Fat",
      name: "Mayonnaise",
      ratioValue: 80,
      defaultUnit: "g",
      substitutions: [],
    },
    {
      ingId: "ing_08",
      role: "Aromatic",
      name: "Ripe avocado (sliced 5mm thick)",
      ratioValue: 200,
      defaultUnit: "g",
      substitutions: [],
    },
    {
      ingId: "ing_09",
      role: "Garnish",
      name: "Black olive slices, hard-boiled egg, fresh parsley sprigs",
      ratioValue: 1,
      defaultUnit: "parts",
      substitutions: ["capers, sliced radishes, micro herbs"],
    },
  ],
  processNodes: [
    {
      nodeId: "step_1",
      action: "Boil",
      inputs: ["ing_01"],
      outputState: "cooked_potatoes",
      instructions:
        "Place the peeled, halved potatoes in a pot of well-salted cold water and bring to a boil. Cook until completely tender and a knife slides through without any resistance — about 20–25 minutes depending on size. Drain immediately and spread on a tray to steam-dry for 5 minutes. This step is critical: wet potatoes produce a gluey causa that will not hold its shape. The potatoes must be very dry when mashed.",
      visualCue: {
        primaryTarget:
          "Potatoes are very pale yellow, falling apart at the edges, with a completely dry, mealy surface after draining.",
        spectrum: [
          {
            state: "Underdone",
            description:
              "A knife meets resistance in the center. The potato snaps rather than compresses.",
            action:
              "Return to the pot with the heat on low for 5 more minutes — do not re-submerge in water.",
          },
          {
            state: "Perfect",
            description:
              "A skewer passes through with zero resistance. The potato's edges are just beginning to feather and crumble.",
            action:
              "Drain and spread out to dry. Do not cover with plastic — the steam must escape.",
          },
          {
            state: "Overdone",
            description:
              "Potatoes are waterlogged and crumbling in the pot, falling apart when lifted.",
            action:
              "Drain extremely well and spread on a tray in a 150°C oven for 5 minutes to dry out before mashing.",
          },
        ],
      },
      feelCue:
        "A perfectly cooked causa potato pressed between two fingers should crumble dryly and immediately — like pressing a chalk stick — with no damp springiness.",
    },
    {
      nodeId: "step_2",
      action: "Mash",
      inputs: ["cooked_potatoes", "ing_02", "ing_03", "ing_04", "ing_05"],
      outputState: "causa_dough",
      instructions:
        "While the potatoes are still hot, pass them through a potato ricer or press them through a fine-mesh strainer with a spatula — never use a food processor, which will make them gluey. Transfer the riced potato to a large bowl. Add the ají amarillo paste, lime juice, and oil. Fold and work with a flexible spatula until completely homogenous, with no white streaks of unmixed potato. Season with salt. The causa dough should taste boldly of lime and ají, with a vibrant orange-yellow color throughout and the texture of soft, pliable clay.",
      visualCue: {
        primaryTarget:
          "A uniform, vivid golden-yellow mass — the color of egg yolk — with no white patches of unmixed potato and no visible lumps.",
        spectrum: [
          {
            state: "Underdone",
            description:
              "White unmixed potato streaks are visible throughout, flavor is uneven.",
            action:
              "Fold more firmly until completely uniform — every bite must taste the same.",
          },
          {
            state: "Perfect",
            description:
              "Uniform golden-orange, smells intensely of lime and ají, holds its shape when pressed into a ball but is pliable and smooth.",
            action: "Divide into three equal portions. Proceed to assembly.",
          },
          {
            state: "Overdone",
            description:
              "Overworked — dough has become dense, sticky, and slightly gluey.",
            action:
              "Unfortunately this cannot be fixed. Work gently and quickly in the future — causa is not bread dough.",
          },
        ],
      },
      feelCue:
        "The causa dough should feel like dense, cool Play-Doh — smooth, pliable, and able to hold any shape you press it into without cracking or crumbling.",
    },
    {
      nodeId: "step_3",
      action: "Assemble",
      inputs: ["causa_dough", "ing_06", "ing_07", "ing_08"],
      outputState: "assembled_causa",
      instructions:
        "Mix the drained tuna with the mayonnaise and season with salt and a squeeze of lime — it should taste well-seasoned and creamy. Line a loaf pan or individual ring molds with plastic wrap. Press one-third of the causa dough firmly into the base in an even, compact layer. Lay the avocado slices in a single, slightly overlapping layer. Spread the tuna mixture evenly over the avocado. Press the remaining two-thirds of causa dough over the tuna in two equal layers, pressing firmly between each addition to eliminate air gaps. The layers must be dense and cohesive or the causa will crumble when sliced.",
      visualCue: {
        primaryTarget:
          "From the side of a glass container, distinct horizontal bands are visible: golden potato, green avocado, cream tuna, golden potato — each layer flat and level.",
        spectrum: [
          {
            state: "Underdone",
            description:
              "Layers are uneven, the tuna filling has lumps, air gaps are visible.",
            action:
              "Press the top firmly with the back of a wet spoon to compress, and refrigerate as-is.",
          },
          {
            state: "Perfect",
            description:
              "Flat, level layers with clear color distinctions. The assembled causa is firm under gentle pressing.",
            action:
              "Fold plastic wrap over the top and refrigerate for at least 1 hour before unmolding.",
          },
          {
            state: "Overdone",
            description:
              "The causa was overfilled and the plastic wrap cannot close over the top.",
            action:
              "Remove excess from the top layer, level it, and proceed. Serve the extra causa as a small side tasting.",
          },
        ],
      },
      feelCue:
        "When you press the top of the assembled causa through the plastic, it should give slightly and then resist — firm and cold, with no wobble.",
    },
    {
      nodeId: "step_4",
      action: "Chill",
      inputs: ["assembled_causa", "ing_09"],
      outputState: "causa_limena",
      instructions:
        "Refrigerate the assembled causa for at least 1 hour, or up to 24 hours — it only improves as it firms and the flavors meld. When ready to serve, unmold onto a cutting board or serving plate by inverting the mold and gently lifting. Remove the plastic wrap. With a sharp knife dipped in hot water and wiped dry between cuts, slice into clean portions. Garnish each serving with sliced black olives, hard-boiled egg quarters, and parsley. Serve cold — causa is a cold dish.",
      visualCue: {
        primaryTarget:
          "Clean, visible layer cross-sections when sliced — golden potato, green avocado, cream-white tuna, golden potato — each layer distinct and intact.",
        spectrum: [
          {
            state: "Underdone",
            description:
              "Causa crumbles when sliced, layers do not hold together.",
            action:
              "It needed more time in the refrigerator — 1 hour minimum, 2 hours ideal. Serve it as a fork-crushed pile and call it deconstructed.",
          },
          {
            state: "Perfect",
            description:
              "Clean, sharp slice reveals beautiful distinct horizontal layers. The causa holds its shape on the plate without crumbling.",
            action: "Garnish and serve immediately.",
          },
          {
            state: "Overdone",
            description:
              "Causa has been refrigerated too long (over 24 hours) — the avocado has discolored slightly.",
            action:
              "Trim any discolored avocado edge visible in the slice. The flavor is still excellent — serve with confidence.",
          },
        ],
      },
      feelCue:
        "The first forkful should give a clean, cool snap through the potato and a soft yield through the avocado — the contrast of firm and yielding in a single bite is the point.",
    },
  ],
};
