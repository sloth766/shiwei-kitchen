export default {
  repoId: "master_indonesian_gado-gado-sauce_001",
  parentRepoId: null,
  slug: "gado-gado-sauce",
  author: "ForkRecipe Kitchen",

  title: "Gado-Gado Peanut Sauce",
  description: "A thick, rust-coloured Javanese peanut sauce with the body of a gravy and the complexity of a curry — ground peanuts loosen in coconut milk to a velvety pour, while galangal, lemongrass, and a spark of bird's eye chili build layered heat that clings to every vegetable and egg it touches.",
  cuisine: "Indonesian",
  culture: "Javanese",
  category: "sauces",

  tags: ["peanut", "indonesian", "satay", "vegan", "spicy"],
  difficulty: 2,
  activeTime: "25 min",
  totalTime: "30 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",

  // 0–5 scale. Rich, creamy, savoury with moderate heat; low sour and bitter.
  flavorRadar: { sweet: 3, salty: 3, sour: 2, bitter: 1, umami: 3, heat: 3 },

  ingredients: [
    { ingId: "ing_01", role: "Structure", name: "Roasted peanuts (unsalted), skins removed",             ratioValue: 4,   defaultUnit: "parts", substitutions: ["natural peanut butter (no sugar added)"] },
    { ingId: "ing_02", role: "Liquid",    name: "Full-fat coconut milk",                                 ratioValue: 3,   defaultUnit: "parts", substitutions: ["water (thinner sauce)"] },
    { ingId: "ing_03", role: "Spice",     name: "Bird's eye chili (2–4 chilies to taste), sliced",      ratioValue: 0.5, defaultUnit: "parts", substitutions: ["red chili flakes"] },
    { ingId: "ing_04", role: "Allium",    name: "Garlic (3 cloves), peeled",                            ratioValue: 0.5, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Allium",    name: "Asian shallots (3), peeled",                           ratioValue: 0.5, defaultUnit: "parts", substitutions: ["1/4 small red onion"] },
    { ingId: "ing_06", role: "Aromatic",  name: "Galangal (2 cm knob), thinly sliced",                  ratioValue: 0.25, defaultUnit: "parts", substitutions: ["fresh ginger (milder)"] },
    { ingId: "ing_07", role: "Sweetener", name: "Palm sugar (or dark brown sugar)",                     ratioValue: 0.5, defaultUnit: "parts", substitutions: ["coconut sugar"] },
    { ingId: "ing_08", role: "Acid",      name: "Tamarind paste (or lime juice)",                       ratioValue: 0.5, defaultUnit: "parts", substitutions: ["2 tablespoons lime juice"] },
    { ingId: "ing_09", role: "Seasoning", name: "Kecap manis (sweet soy sauce)",                        ratioValue: 0.5, defaultUnit: "parts", substitutions: ["soy sauce + 1/4 part honey"] },
    { ingId: "ing_10", role: "Seasoning", name: "Salt",                                                  ratioValue: 0.15, defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Blend",
      inputs: ["ing_01"],
      outputState: "peanut_paste",
      instructions: "If using whole roasted peanuts, pulse in a food processor or blender until you reach a coarse, chunky paste — not smooth peanut butter, but not whole peanuts either. You want irregular pieces from coarse sand to small pebble size. This textured paste will give the finished sauce its characteristic rustic body. If using natural peanut butter, skip this step.",
      visualCue: {
        primaryTarget: "A dry, sandy peanut paste with visible pieces. No large whole peanuts. Pale golden-tan in colour, intensely fragrant.",
        spectrum: [
          { state: "Underdone", description: "Still too many whole or half peanuts. The sauce will have a chunky, uneven texture.", action: "Pulse more in the food processor. Aim for mostly coarse sandy texture with a few small pieces." },
          { state: "Perfect",   description: "Coarse paste — about the texture of natural crunchy peanut butter. Smells of deep roasted peanut.", action: "Add to the aromatics when the spice paste is ready." },
          { state: "Overdone",  description: "Peanuts have been blended to a completely smooth paste. The sauce will be thicker and silkier but lose the textural character.", action: "Proceed — smooth sauce is still excellent, it is just a stylistic difference." },
        ],
      },
      feelCue: "Rub a pinch of the peanut paste between your fingers — it should feel gritty and slightly oily, leaving a golden residue. That oil is what makes the sauce rich and glossy.",
    },
    {
      nodeId: "step_2",
      action: "Blend",
      inputs: ["ing_03", "ing_04", "ing_05", "ing_06"],
      outputState: "spice_paste",
      instructions: "Combine chilies, garlic, shallots, and galangal in a mortar or small blender. Pound or blend to a coarse paste. A mortar is traditional and gives a more fibrous, aromatic paste with better depth; a blender works fine if you are short on time. The paste should be uniformly pulped — no large chunks of garlic or shallot remaining.",
      visualCue: {
        primaryTarget: "A rough, rust-coloured paste with a wet, chunky texture. The smell is pungent with raw garlic, chili heat, and the medicinal warmth of galangal.",
        spectrum: [
          { state: "Underdone", description: "Chunky — whole garlic halves and shallot pieces still visible. Will cook unevenly and leave harsh raw-allium pockets.", action: "Pound or blend more until the paste is relatively uniform." },
          { state: "Perfect",   description: "Coarse but uniform paste. The galangal is fully broken down. The smell is complex and aromatic.", action: "Fry in oil before adding other ingredients." },
          { state: "Overdone",  description: "Paste is a fine, very wet puree. It will splatter aggressively in hot oil.", action: "Pat dry with a paper towel and proceed with caution when adding to the hot pan." },
        ],
      },
      feelCue: "The raw spice paste should make your eyes water slightly from the chili vapour when you lean close — that pungency will mellow beautifully when fried in oil.",
    },
    {
      nodeId: "step_3",
      action: "Sauté",
      inputs: ["spice_paste", "ing_07"],
      outputState: "fried_spice_base",
      instructions: "Heat 2 tablespoons of neutral oil in a wok or saucepan over medium heat. Add the spice paste and stir-fry for 3–4 minutes until it darkens from pale pink-orange to a deeper rust-red and smells cooked and sweet rather than raw and sharp. Add the palm sugar and stir until melted and incorporated. The paste will begin to caramelise around the edges — this is correct. A properly fried spice base smells fragrant, slightly nutty, and deeply savoury.",
      visualCue: {
        primaryTarget: "Paste has darkened to a deep rust-orange. Fat has separated around the edges of the paste (minyak pecah — 'oil breaks'). Smells cooked and sweet.",
        spectrum: [
          { state: "Underdone", description: "Paste is still pale and smells raw. Oil has not separated. Less than 2 minutes of cooking.", action: "Continue frying — raw spice paste in the finished sauce will taste harsh and unpleasant." },
          { state: "Perfect",   description: "Deep rust colour. Oil visibly seeping around the edges of the paste. The smell is rich, nutty, and cooked. The sugar has darkened the paste further.", action: "Add peanut paste, coconut milk, tamarind, kecap manis, and salt." },
          { state: "Overdone",  description: "Paste is very dark brown and sticking aggressively. Bits are burning on the bottom of the pan.", action: "Add a splash of coconut milk immediately and scrape the bottom. The burnt bits will add complexity if not too dark." },
        ],
      },
      feelCue: "When you add the spice paste to hot oil you should hear a fierce sizzle followed by a fragrant chili-garlic steam — if there is no sizzle, the oil is not hot enough and the paste will stew rather than fry.",
    },
    {
      nodeId: "step_4",
      action: "Simmer",
      inputs: ["fried_spice_base", "peanut_paste", "ing_02", "ing_08", "ing_09", "ing_10"],
      outputState: "finished_gado_gado_sauce",
      instructions: "Add the peanut paste to the fried spice base and stir to combine — the mixture will be very thick and dry at this point. Pour in coconut milk gradually, stirring constantly to incorporate the peanut and spice paste. Add tamarind paste, kecap manis, and salt. Bring to a gentle simmer over medium-low heat, stirring frequently to prevent the thick sauce from catching on the bottom. Simmer for 5–8 minutes until the sauce is thick enough to coat the back of a spoon heavily and the oil from the peanuts rises to the surface in golden droplets. Taste and adjust: more palm sugar if too sharp, more tamarind if too sweet, salt to lift the whole.",
      visualCue: {
        primaryTarget: "A thick, rust-brown sauce with a velvety, slightly grainy texture. Golden peanut oil droplets visible on the surface. Falls in thick ribbons from a lifted spoon.",
        spectrum: [
          { state: "Underdone", description: "Sauce is too thin — pours freely. The raw coconut milk flavour is still dominant. The oil has not separated to the top.", action: "Continue simmering uncovered, stirring frequently, for another 3–5 minutes." },
          { state: "Perfect",   description: "Thick, coating consistency. Deep savoury-sweet flavour with chili warmth. Peanut oil gleaming on top. Balance of sweet, sour, savoury, and heat is harmonious.", action: "Cool slightly before serving. Thin with hot water if needed when serving." },
          { state: "Overdone",  description: "Sauce has reduced to a very thick, sticky paste that holds its shape. Peanut oil has fully separated into a pool on top.", action: "Thin with coconut milk or hot water, stir vigorously, and simmer briefly to re-emulsify." },
        ],
      },
      feelCue: "Run a finger through a drop of the sauce on the side of the pot — it should leave a clean line that fills in slowly, like condensed mushroom soup. If it fills immediately, cook longer; if it is solid, thin with water.",
    },
  ],
};
