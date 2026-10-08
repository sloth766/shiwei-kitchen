export default {
  repoId: "master_indonesian_nasi-goreng-paste_001",
  parentRepoId: null,
  slug: "nasi-goreng-paste",
  author: "ForkRecipe Kitchen",

  title: "Nasi Goreng Paste",
  description: "A dark, intensely savoury paste of charred shallots, garlic, and fermented shrimp paste ground into a fragrant black-red roux — the aromatic engine that transforms day-old rice into something smoky, funky, and deeply satisfying the moment it hits a screaming-hot wok.",
  cuisine: "Indonesian",
  culture: "Indonesian",
  category: "condiments",

  tags: ["fried rice", "paste", "indonesian", "shrimp paste", "chili"],
  difficulty: 2,
  activeTime: "20 min",
  totalTime: "25 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",

  // 0–5 scale. Deeply umami and savoury; shrimp paste adds funk; chili gives moderate heat.
  flavorRadar: { sweet: 1, salty: 4, sour: 0, bitter: 2, umami: 5, heat: 3 },

  ingredients: [
    { ingId: "ing_01", role: "Allium",   name: "Asian shallots (6–8), peeled",                         ratioValue: 3,   defaultUnit: "parts", substitutions: ["1 small red onion"] },
    { ingId: "ing_02", role: "Allium",   name: "Garlic (5 cloves), peeled",                            ratioValue: 2,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Umami",    name: "Terasi (Indonesian shrimp paste), toasted",            ratioValue: 0.5, defaultUnit: "parts", substitutions: ["belacan (Malaysian shrimp paste)", "miso paste for pescatarian"] },
    { ingId: "ing_04", role: "Spice",    name: "Dried red chilies (5–8), soaked in hot water 10 min", ratioValue: 1,   defaultUnit: "parts", substitutions: ["2 tablespoons sambal oelek"] },
    { ingId: "ing_05", role: "Spice",    name: "Bird's eye chilies (2–3, optional for extra heat)",    ratioValue: 0.25, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Seasoning", name: "Kecap manis (sweet soy sauce)",                       ratioValue: 1,   defaultUnit: "parts", substitutions: ["dark soy sauce + 1 tsp brown sugar"] },
    { ingId: "ing_07", role: "Fat",      name: "Neutral oil (canola or coconut)",                      ratioValue: 1,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_08", role: "Seasoning", name: "Salt",                                                ratioValue: 0.15, defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Toast",
      inputs: ["ing_03"],
      outputState: "toasted_shrimp_paste",
      instructions: "Wrap the terasi in a small square of aluminium foil and press it flat. Toast directly over a gas flame or in a dry pan for 30–45 seconds per side until it smells cooked and deeply savoury — the raw, ammonia-like sharpness of the raw paste should give way to a roasted, fermented complexity. Do not skip this step: raw terasi has an aggressive, harsh smell that cooking tames into something extraordinary. The foil prevents the paste from sticking and the flame from charring it unevenly.",
      visualCue: {
        primaryTarget: "The toasted terasi block is slightly darkened on the outside and crumbles more easily when pressed. The aroma shifts from sharp ammonia to toasted, oceanic, fermented.",
        spectrum: [
          { state: "Underdone", description: "Terasi still has a raw, very pungent ammonia smell. The block has not changed colour.", action: "Toast longer — raw terasi flavour will overwhelm the paste." },
          { state: "Perfect",   description: "Darker exterior, crumbly texture, smell is deeply savoury and complex rather than sharp. Like roasted anchovy paste.", action: "Unwrap and add to the mortar or blender with the other aromatics." },
          { state: "Overdone",  description: "Terasi has burnt — very dark, smells acrid and bitter through the foil.", action: "Scrape off the blackened exterior and use what remains. Or use a small amount of fresh untoasted terasi instead." },
        ],
      },
      feelCue: "Toasted terasi should crumble between your fingers like dry clay, whereas raw terasi stays sticky and plastic — that textural shift signals that the moisture has cooked off and the flavour has concentrated.",
    },
    {
      nodeId: "step_2",
      action: "Pound",
      inputs: ["ing_01", "ing_02", "ing_04", "ing_05", "toasted_shrimp_paste"],
      outputState: "raw_spice_paste",
      instructions: "Drain the soaked dried chilies — they should be soft and pliable. Combine shallots, garlic, soaked dried chilies, fresh bird's eye chilies (if using), and toasted terasi in a large mortar. Pound methodically starting with the hardest items (shallots, garlic) before adding the chilies and terasi. Work in a circular pounding motion, turning the pestle and occasionally scraping down the sides. The goal is a smooth, uniformly coloured, deep brick-red paste with no visible chunks. A blender works but produces a slightly more watery paste — add a tablespoon less water.",
      visualCue: {
        primaryTarget: "A smooth, deep brick-red to brownish-red paste with a glossy surface and a complex, sharp, chili-and-shallot aroma. No visible shallot or garlic pieces.",
        spectrum: [
          { state: "Underdone", description: "Coarse and chunky — shallot rings and garlic chunks still visible. The paste will cook unevenly in the wok.", action: "Keep pounding. This is the hardest step and the most important. Take your time." },
          { state: "Perfect",   description: "Smooth, deep red paste. When dragged with a spoon it leaves a clean, even layer on the mortar. Smell is intensely aromatic — chili, onion, fermented shrimp.", action: "Fry in oil to make the cooked paste." },
          { state: "Overdone",  description: "Paste is so finely ground it is almost a liquid. This is fine but more time-consuming in the frying step as it splatters aggressively.", action: "Proceed with care — use a splatter screen and stir constantly." },
        ],
      },
      feelCue: "Press your palm gently on the paste in the mortar — it should feel cold, wet, and slightly rough. If it still feels chunky under your palm, pound more. Smoothness here equals evenness in the wok.",
    },
    {
      nodeId: "step_3",
      action: "Fry",
      inputs: ["raw_spice_paste", "ing_07"],
      outputState: "cooked_nasi_goreng_paste",
      instructions: "Heat the oil in a wok or heavy frying pan over medium heat until shimmering. Add the spice paste all at once — it will spit and hiss loudly. Stand back. Fry, stirring constantly with a wooden spoon, for 6–8 minutes. The paste will progress through three visible stages: first it steams and sputters (water evaporating); then it fries and darkens from bright red to a deeper brick-brown; finally the oil separates around the paste (minyak pecah) and the paste smells sweet, toasted, and complex rather than raw. This cooked paste base is the foundation of all nasi goreng flavour.",
      visualCue: {
        primaryTarget: "Paste is a deep brick-brown, darker and richer than the raw version. Oil has visibly separated to the surface and edges. Smells toasted, nutty, and deeply savory.",
        spectrum: [
          { state: "Underdone", description: "Paste is still bright red, steaming and sputtering. Oil has not separated. Tastes raw and sharp.", action: "Continue frying on medium heat — rushing on high heat risks burning before the water evaporates." },
          { state: "Perfect",   description: "Deep brick-brown paste with oil separation at the edges. Smells cooked — complex, slightly smoky, deeply savoury. The sharp chili-shallot rawness is gone.", action: "Add kecap manis, stir to combine, and cook 1 more minute." },
          { state: "Overdone",  description: "Paste is very dark brown to black and sticking to the pan. Bitter smell.", action: "Add a splash of water immediately and scrape up. A slightly over-fried paste can still be used but reduce the heat significantly for the remaining cooking." },
        ],
      },
      feelCue: "When the paste is properly fried, stirring it should feel smooth and even — no resistance from chunks. The smell should be warm, complex, and cooked, making you think immediately of street food.",
    },
    {
      nodeId: "step_4",
      action: "Season",
      inputs: ["cooked_nasi_goreng_paste", "ing_06", "ing_08"],
      outputState: "finished_nasi_goreng_paste",
      instructions: "Add kecap manis and a pinch of salt to the cooked paste and stir over low heat for 1 minute until incorporated. The kecap manis adds sweetness and a deeper colour — the paste will darken further to a glossy, very dark brown. Taste: it should be savoury and complex with a distinct fermented depth. It will be intensely flavoured — this is a concentrated paste meant to season 2 cups (400 g cooked) of rice per this recipe amount. Store cooled paste in a sealed jar in the refrigerator for up to 1 week. To use: add 2 tablespoons of oil to a hot wok, add paste and stir-fry 30 seconds, then add day-old rice and toss.",
      visualCue: {
        primaryTarget: "Very dark, glossy, almost black-brown paste with a complex, deeply savoury aroma. Moves in the pan like a thick, sticky sauce.",
        spectrum: [
          { state: "Underdone", description: "Kecap manis not yet added. Paste looks dry and brick-red rather than glossy and dark.", action: "Add kecap manis and stir thoroughly." },
          { state: "Perfect",   description: "Intensely glossy, very dark paste. Smells of toasted shrimp paste, caramelised shallot, and dark soy with a chili warmth. The finished nasi goreng made from this will be deeply colourful and fragrant.", action: "Cool completely before storing, or use immediately." },
          { state: "Overdone",  description: "Kecap manis has been added too early or too much heat used — paste is seizing and sticking into a solid mass.", action: "Add a tablespoon of water and stir off heat. The paste should loosen as it cools." },
        ],
      },
      feelCue: "A tiny smear of finished paste on the back of your wrist should feel slightly tacky and leave a dark stain — that stickiness from the kecap manis is what makes nasi goreng cling to every grain of rice.",
    },
  ],
};
