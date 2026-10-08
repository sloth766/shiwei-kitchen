export default {
  repoId: "master_mexican_tamales_de_pollo_001",
  parentRepoId: null,
  slug: "tamales-de-pollo",
  author: "ForkRecipe Kitchen",
  title: "Tamales de Pollo con Salsa Verde",
  description: "The corn husk is the cook's oldest envelope — spread with masa dough whipped with lard until it floats on a bowl of water, filled with braised tomatillo chicken, then folded and steamed until the masa pulls cleanly from the husk like paper from a gift, revealing a soft, fragrant package that smells of corn and steam and celebration.",
  cuisine: "Mexican",
  culture: "Central Mexican",
  category: "grains",
  tags: ["mexican", "tamale", "masa", "corn", "chicken", "salsa-verde", "celebration", "slow-cook"],
  difficulty: 4,
  activeTime: "2 hr",
  totalTime: "3 hr 30 min",
  ratioSystem: "weight",
  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",
  flavorRadar: { sweet: 0, salty: 3, sour: 1, bitter: 0, umami: 4, heat: 2 },
  ingredients: [
    {
      ingId: "ing_01",
      role: "Structure",
      name: "Masa harina (corn dough flour, Maseca brand)",
      ratioValue: 400,
      defaultUnit: "g",
      substitutions: ["fresh masa (skip the mixing with broth step)"],
    },
    {
      ingId: "ing_02",
      role: "Fat",
      name: "Lard (room temperature, soft)",
      ratioValue: 160,
      defaultUnit: "g",
      substitutions: ["vegetable shortening (vegan)"],
    },
    {
      ingId: "ing_03",
      role: "Liquid",
      name: "Warm chicken broth (for masa)",
      ratioValue: 480,
      defaultUnit: "g",
      substitutions: ["vegetable broth"],
    },
    {
      ingId: "ing_04",
      role: "Leavener",
      name: "Baking powder (for light masa texture)",
      ratioValue: 6,
      defaultUnit: "g",
      substitutions: [],
    },
    {
      ingId: "ing_05",
      role: "Seasoning",
      name: "Fine salt",
      ratioValue: 12,
      defaultUnit: "g",
      substitutions: [],
    },
    {
      ingId: "ing_06",
      role: "Protein",
      name: "Chicken thighs (bone-in, skin-on)",
      ratioValue: 600,
      defaultUnit: "g",
      substitutions: ["chicken breast (drier)", "pulled pork"],
    },
    {
      ingId: "ing_07",
      role: "Aromatic",
      name: "Tomatillos (husked, halved)",
      ratioValue: 300,
      defaultUnit: "g",
      substitutions: ["canned tomatillos"],
    },
    {
      ingId: "ing_08",
      role: "Heat",
      name: "Serrano or jalapeño chiles (2–3, roughly chopped)",
      ratioValue: 30,
      defaultUnit: "g",
      substitutions: ["canned chipotles in adobo (smokier flavor)"],
    },
    {
      ingId: "ing_09",
      role: "Allium",
      name: "White onion (half for braise, half for salsa verde)",
      ratioValue: 150,
      defaultUnit: "g",
      substitutions: [],
    },
    {
      ingId: "ing_10",
      role: "Allium",
      name: "Garlic cloves (4 cloves)",
      ratioValue: 20,
      defaultUnit: "g",
      substitutions: [],
    },
    {
      ingId: "ing_11",
      role: "Binder",
      name: "Dried corn husks (30–35 husks, soaked in hot water 1 hour)",
      ratioValue: 60,
      defaultUnit: "g",
      substitutions: ["banana leaves (wet, different flavor profile)"],
    },
  ],
  processNodes: [
    {
      nodeId: "step_1",
      action: "Braise",
      inputs: ["ing_06", "ing_07", "ing_08", "ing_09", "ing_10"],
      outputState: "salsa_verde_chicken",
      instructions:
        "Combine the chicken thighs, halved tomatillos, chopped chiles, half the onion (roughly sliced), and garlic in a pot with enough water to just cover (about 400g). Bring to a boil and simmer for 35–40 minutes until the chicken is completely cooked through and pulling from the bone. Remove the chicken pieces and let cool enough to handle. Shred the meat, discarding the bones and skin. Return the braising liquid and cooked vegetables to a blender and blend until smooth — this is your salsa verde filling sauce. Return the shredded chicken to the sauce and season assertively with salt. The filling should taste boldly seasoned — it will mellow inside the masa.",
      visualCue: {
        primaryTarget:
          "Shredded chicken coated in a bright, medium-green tomatillo salsa that clings to every fiber without pooling at the bottom.",
        spectrum: [
          {
            state: "Underdone",
            description:
              "Chicken has resistant spots at the bone and the tomatillos have not completely broken down.",
            action:
              "Simmer 10 more minutes — the filling must be tender to shred cleanly.",
          },
          {
            state: "Perfect",
            description:
              "Chicken falls from the bone in long, juicy fibers. Salsa verde is bright green and fragrant with charred tomatillo and chile.",
            action:
              "Shred and combine with sauce. Cool to room temperature before filling the tamales.",
          },
          {
            state: "Overdone",
            description:
              "Chicken has broken into very small fragments and the sauce is deeply reduced and concentrated.",
            action:
              "Add a splash of water to loosen and taste for salt. Very fine shredded chicken is still excellent as a filling.",
          },
        ],
      },
      feelCue:
        "The filling should feel moist and clingy — not wet enough to make the masa soggy, but not so dry that it crumbles out when you bite into the finished tamale.",
    },
    {
      nodeId: "step_2",
      action: "Cream",
      inputs: ["ing_02", "ing_01", "ing_03", "ing_04", "ing_05"],
      outputState: "masa_dough",
      instructions:
        "Beat the soft lard in a stand mixer with the paddle on high for 3–4 minutes until it is very pale, fluffy, and has roughly doubled in volume. With the mixer on medium, add the masa harina and baking powder alternating with the warm chicken broth in 4 additions, scraping down between each addition. Beat the salt in at the end. The finished masa should be light, spreadable, and very smooth — like thick hummus or a slightly stiff whipped cream. Test by dropping a small ball into a glass of cold water: if it floats, the lard is sufficiently aerated and the masa will be light. If it sinks, beat 2 more minutes.",
      visualCue: {
        primaryTarget:
          "A pale, ivory-cream colored masa that holds a soft peak when the paddle is lifted and falls back slowly — much lighter in color and texture than the dry masa harina was.",
        spectrum: [
          {
            state: "Underdone",
            description:
              "Masa is dense, heavy, and grey-colored. The float test fails — ball sinks immediately.",
            action:
              "Beat the lard longer before adding masa — the aeration happens at the lard stage, not after.",
          },
          {
            state: "Perfect",
            description:
              "Pale, pillowy, spreadable. The float test passes. Tastes of corn and chicken broth, well-salted.",
            action: "Cover with a damp towel and begin assembling the tamales.",
          },
          {
            state: "Overdone",
            description:
              "Masa is very wet and does not hold its shape on the husk.",
            action:
              "Beat in another 30g of masa harina to firm it up slightly.",
          },
        ],
      },
      feelCue:
        "The masa should feel like cool whipped butter — it should spread with a spatula without tearing, hold its shape in a thin layer, and feel noticeably lighter than raw masa harina.",
    },
    {
      nodeId: "step_3",
      action: "Assemble",
      inputs: ["masa_dough", "salsa_verde_chicken", "ing_11"],
      outputState: "assembled_tamales",
      instructions:
        "Lay a softened corn husk with the wider end facing you. Spread about 60g of masa in a thin, even rectangle (15x10 cm) on the upper two-thirds of the husk, leaving the bottom third and a 2cm border on the sides bare. Place 2 tablespoons of filling in a line down the center of the masa. Fold one side of the husk over the filling so the masa meets and encloses the filling, then fold the other side over, and fold the bare bottom of the husk up to seal. Stand the tamales upright in a steamer basket, open end up. If needed, use extra torn husk strips to tie them closed.",
      visualCue: {
        primaryTarget:
          "A neatly folded package with the masa fully enclosing the filling — no filling visible at the seam, the husk wrapped tightly enough to hold its shape when stood upright.",
        spectrum: [
          {
            state: "Underdone",
            description:
              "Masa is torn or uneven, filling is leaking from the sides.",
            action:
              "Patch tears with a small piece of extra masa pressed gently over the gap.",
          },
          {
            state: "Perfect",
            description:
              "Clean, firm package. The masa is an even layer, the filling is centered. The folded husk holds without unrolling.",
            action: "Stand upright in the steamer and continue assembling.",
          },
          {
            state: "Overdone",
            description:
              "Tamale is overfilled and the husk cannot fold to meet — filling is bulging out.",
            action:
              "Remove some filling and re-fold. Too much filling prevents the masa from sealing.",
          },
        ],
      },
      feelCue:
        "A well-assembled tamale should feel compact and even when you squeeze it gently between your palms — no soft spots indicating gaps, no hard lumps indicating overfilling.",
    },
    {
      nodeId: "step_4",
      action: "Steam",
      inputs: ["assembled_tamales"],
      outputState: "tamales_de_pollo",
      instructions:
        "Place the assembled tamales upright and packed tightly together in a steamer pot — they support each other. Add water to just below the steamer basket. Bring to a rolling boil over high heat, then reduce to maintain a vigorous steam. Cover tightly and steam for 75–90 minutes, checking the water level every 30 minutes and adding boiling water as needed. The tamales are done when the masa pulls cleanly and completely away from the corn husk without sticking. Let rest 10 minutes off the heat before serving — they firm and set during the rest.",
      visualCue: {
        primaryTarget:
          "The masa inside the husk looks firm and set, not shiny or wet, and peels cleanly from the husk surface leaving no residue.",
        spectrum: [
          {
            state: "Underdone",
            description:
              "The masa sticks to the husk and tears when you try to peel it away. It looks wet and translucent.",
            action:
              "Re-wrap and return to the steamer for 15–20 more minutes. Underdone tamales are the most common mistake.",
          },
          {
            state: "Perfect",
            description:
              "The husk peels away cleanly and easily. The masa surface is firm, slightly shiny, and pulls away in one clean sheet. The filling inside is piping hot.",
            action:
              "Rest 10 minutes. Serve in the husk and let guests peel their own.",
          },
          {
            state: "Overdone",
            description:
              "The masa has become very firm and slightly dry, pulling away from the husk in pieces.",
            action:
              "Serve with extra salsa verde or crema to rehydrate. Still perfectly edible.",
          },
        ],
      },
      feelCue:
        "When you press the outside of a finished tamale through the husk, it should feel firm but not hard — like pressing a firm stick of butter — with no soft wet spots.",
    },
  ],
};
