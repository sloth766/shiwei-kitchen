export default {
  repoId: "master_peruvian_pollo_a_la_brasa_001",
  parentRepoId: null,
  slug: "pollo-a-la-brasa",
  author: "ForkRecipe Kitchen",

  title: "Pollo a la Brasa (Peruvian Rotisserie Chicken)",
  description: "A whole chicken brined in soy sauce, cumin, aji panca, and garlic for 24 hours, then roasted on a rotisserie or in the oven until the skin is burnished and crackled and the meat inside is so juicy and aromatic it needs nothing beyond the bright green aji verde served alongside.",
  cuisine: "Peruvian",
  culture: "Peruvian",
  category: "proteins",

  tags: ["peruvian", "chicken", "rotisserie", "aji-panca", "cumin", "soy", "brasa"],
  difficulty: 2,
  activeTime: "20 min",
  totalTime: "26 hours",
  ratioSystem: "weight",

  stars: 0, forks: 0, contributors: 1, license: "CC-BY-SA",
  createdAt: "2026-06-27", updatedAt: "2026-06-27",

  flavorRadar: { sweet: 1, salty: 4, sour: 1, bitter: 1, umami: 4, heat: 2 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Whole chicken (1.6–2 kg)",         ratioValue: 1800, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_02", role: "Liquid",    name: "Soy sauce",                         ratioValue: 80,   defaultUnit: "g", substitutions: ["tamari"] },
    { ingId: "ing_03", role: "Allium",    name: "Garlic cloves, minced to a paste",  ratioValue: 30,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_04", role: "Spice",     name: "Ground cumin",                      ratioValue: 10,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_05", role: "Spice",     name: "Aji panca paste (or dried aji panca, rehydrated)", ratioValue: 40, defaultUnit: "g", substitutions: ["ancho chili paste + 1 tsp paprika"] },
    { ingId: "ing_06", role: "Spice",     name: "Smoked paprika",                    ratioValue: 8,    defaultUnit: "g", substitutions: [] },
    { ingId: "ing_07", role: "Acid",      name: "Fresh lime juice",                  ratioValue: 30,   defaultUnit: "g", substitutions: ["lemon juice"] },
    { ingId: "ing_08", role: "Seasoning", name: "Fine sea salt",                     ratioValue: 15,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_09", role: "Seasoning", name: "Black pepper, ground",              ratioValue: 5,    defaultUnit: "g", substitutions: [] },
    { ingId: "ing_10", role: "Aromatic",  name: "Dried oregano",                     ratioValue: 5,    defaultUnit: "g", substitutions: [] },
    { ingId: "ing_11", role: "Fat",       name: "Neutral oil",                       ratioValue: 30,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_12", role: "Aromatic",  name: "Fresh mint leaves (for aji verde)", ratioValue: 20,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_13", role: "Aromatic",  name: "Fresh cilantro (for aji verde)",    ratioValue: 30,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_14", role: "Heat",      name: "Fresh jalapeño or aji amarillo (for aji verde)", ratioValue: 20, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_15", role: "Fat",       name: "Mayonnaise (for aji verde)",        ratioValue: 80,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_16", role: "Acid",      name: "Lime juice (for aji verde)",        ratioValue: 15,   defaultUnit: "g", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Mix",
      inputs: ["ing_02", "ing_03", "ing_04", "ing_05", "ing_06", "ing_07", "ing_08", "ing_09", "ing_10", "ing_11"],
      outputState: "brasa_marinade",
      instructions: "Whisk together soy sauce, garlic paste, cumin, aji panca paste, smoked paprika, lime juice, salt, pepper, oregano, and oil until uniform. The mixture should be thick, dark, and deeply aromatic — the soy and aji panca together create the characteristic mahogany color of pollo a la brasa.",
      visualCue: {
        primaryTarget: "A dark mahogany marinade, slightly thicker than water, with a reddish undertone from the aji panca and paprika. Smells of earthy cumin, soy, and chili.",
        spectrum: [
          { state: "Underdone", description: "Marinade looks thin and pale. Not fully combined.", action: "Whisk more vigorously. The aji panca should be fully incorporated, not floating in patches." },
          { state: "Perfect",   description: "Dark, unified marinade. Tastes assertively of soy, cumin, and chili. It will be diluted somewhat by the large chicken — it should taste strong.", action: "Apply to chicken." },
          { state: "Overdone",  description: "N/A — raw marinade.", action: "Proceed." },
        ],
      },
      feelCue: "The marinade should taste dramatically seasoned on its own — salty, aromatic, and complex. If it tastes balanced at this stage, it won't be flavorful enough once distributed across 1.8 kg of chicken.",
    },
    {
      nodeId: "step_2",
      action: "Marinate",
      inputs: ["ing_01", "brasa_marinade"],
      outputState: "marinated_chicken",
      instructions: "Dry the chicken thoroughly inside and out. Using your fingers, carefully separate the skin from the breast and thigh meat and push half the marinade directly under the skin, massaging it over the meat. Rub remaining marinade all over the exterior and inside the cavity. Place in a large zip-lock bag or covered dish. Refrigerate 12–24 hours, turning once.",
      visualCue: {
        primaryTarget: "The chicken is deeply stained mahogany-red everywhere, including under the skin where the marinade bulges slightly against the breast. After 24 hours, the skin looks dark and matte.",
        spectrum: [
          { state: "Underdone", description: "Marinade only on the surface. Skin hasn't been separated to allow under-skin seasoning.", action: "Lift the skin gently with fingers, being careful not to tear. The under-skin application is what makes the breast moist and flavored." },
          { state: "Perfect",   description: "Even dark staining inside and out. Under-skin marinade has seeped into the flesh. Skin is dark and slightly tacky.", action: "Remove from fridge 1 hour before roasting." },
          { state: "Overdone",  description: "Over-24 hours. High soy content may start to darken the flesh.", action: "Still excellent. Proceed." },
        ],
      },
      feelCue: "After 24 hours, the breast meat under the skin should feel slightly firmer and denser — the soy and salt have done a light cure, improving the texture and ability to retain moisture during roasting.",
    },
    {
      nodeId: "step_3",
      action: "Roast",
      inputs: ["marinated_chicken"],
      outputState: "roasted_brasa_chicken",
      instructions: "Place chicken breast-side up on a rack in a roasting pan (or on a rotisserie spit). Roast at 200 C (400 F) for 1 hour to 1 hour 15 minutes. Every 20 minutes, baste with pan drippings. Rotate the pan if using a regular oven. The chicken is done when the thigh joint reads 82 C (180 F) and the skin is deeply burnished. Rest 10 minutes before carving.",
      visualCue: {
        primaryTarget: "A deeply mahogany-brown chicken with crackled, burnished skin. The wings and drumstick tips are very dark — nearly black — while the breast skin is deep amber. The thigh joint shows no pink juice when pierced.",
        spectrum: [
          { state: "Underdone", description: "Skin is a pale copper-red and soft. Juices at the thigh joint run pink. Internal temp below 74 C at breast.", action: "Continue roasting and basting. The skin needs more time to set and crackle." },
          { state: "Perfect",   description: "Deeply burnished, mahogany-to-dark-brown skin. Skin crackles when pressed with a spoon. Clear juices at the thigh joint. Internal breast temp 74 C, thigh 82 C.", action: "Rest 10 minutes tented loosely with foil." },
          { state: "Overdone",  description: "Skin is very dark, crackling, and dry. Breast meat beginning to dry at the edges.", action: "Rest immediately under foil. The breast may be marginally dry but the thigh will be excellent." },
        ],
      },
      feelCue: "After resting, press the skin — it should feel taut and papery, not soft or oily. A perfectly roasted pollo a la brasa skin should rustle faintly when pressed.",
    },
    {
      nodeId: "step_4",
      action: "Blend",
      inputs: ["ing_12", "ing_13", "ing_14", "ing_15", "ing_16"],
      outputState: "aji_verde",
      instructions: "Blend mint, cilantro, jalapeño, mayonnaise, and lime juice in a blender until completely smooth and vivid green. Season with salt. The sauce should be bright, herby, creamy, and slightly spicy — the essential accompaniment to cut the richness of the chicken.",
      visualCue: {
        primaryTarget: "A vivid green, completely smooth sauce with no visible herb chunks. The color should be a bright, clean green, not grey-green.",
        spectrum: [
          { state: "Underdone", description: "Sauce is still chunky with visible herb pieces and jalapeño skin.", action: "Blend longer. The sauce must be silky and uniform." },
          { state: "Perfect",   description: "Vivid, smooth green. Tastes bright, herby, slightly spicy, with a creamy richness from the mayonnaise. Balances the richness of the chicken.", action: "Refrigerate until ready to serve." },
          { state: "Overdone",  description: "Sauce is grey-green — over-blended and oxidized, or left too long before serving.", action: "Add a squeeze of fresh lime to brighten the color and serve immediately." },
        ],
      },
      feelCue: "The aji verde should feel creamy but not heavy on the tongue — the herb freshness should dominate, with the mayonnaise as a background emulsifier, not a dominant element.",
    },
    {
      nodeId: "step_5",
      action: "Slice",
      inputs: ["roasted_brasa_chicken", "aji_verde"],
      outputState: "finished_pollo_a_la_brasa",
      instructions: "Carve the rested chicken: separate the legs, split the breast, cut the wings. Arrange on a warm platter skin-side up so the burnished skin remains visible. Serve the aji verde in a bowl alongside, with fried yuca or papas fritas and a simple salad.",
      visualCue: {
        primaryTarget: "Carved chicken pieces arranged skin-side up, deeply mahogany, alongside a bowl of vivid green aji verde. The contrast between the dark chicken and bright green sauce is striking.",
        spectrum: [
          { state: "Underdone", description: "Skin is facing down or not prominent. The visual appeal of pollo a la brasa is the burnished skin.", action: "Always present skin-side up." },
          { state: "Perfect",   description: "Mahogany chicken carved and arranged, vivid green sauce, warm sides. The kitchen smells of cumin, roasted garlic, and caramelized soy.", action: "Serve." },
          { state: "Overdone",  description: "Chicken was carved before resting. Juices ran out of the carving board rather than into the meat.", action: "Always rest 10 minutes before carving." },
        ],
      },
      feelCue: "A piece of perfectly rested pollo a la brasa should feel moist and juicy to the touch — pressing the breast gently shouldn't cause juice to stream out, because the rest has retained it within the muscle fibers.",
    },
  ],
};
