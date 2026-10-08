export default {
  repoId: "master_indian_biryani_001",
  parentRepoId: null,
  slug: "biryani",
  author: "ForkRecipe Kitchen",

  title: "Hyderabadi Dum Biryani",
  description: "Layers of saffron-stained basmati and yogurt-marinated chicken sealed under a dough-crimped lid, slow-cooked on a tawa so the steam trapped within perfumes every grain from the inside out. When the seal breaks at the table, a cloud of rose water, mace, and charred meat rises and fills the room.",
  cuisine: "Indian",
  culture: "Hyderabadi",
  category: "grains",

  tags: ["biryani", "rice", "chicken", "hyderabadi", "saffron", "dum", "festive"],
  difficulty: 4,
  activeTime: "1 hr 30 min",
  totalTime: "3 hr 30 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 2, salty: 3, sour: 2, bitter: 1, umami: 4, heat: 3 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Bone-in chicken pieces (leg and thigh)",         ratioValue: 1,    defaultUnit: "kg",   substitutions: ["bone-in lamb shoulder pieces"] },
    { ingId: "ing_02", role: "Dairy",     name: "Full-fat plain yogurt",                           ratioValue: 200,  defaultUnit: "g",    substitutions: [] },
    { ingId: "ing_03", role: "Spice",     name: "Biryani masala (ground: coriander, cumin, cardamom, clove, black pepper, cinnamon, mace)", ratioValue: 2, defaultUnit: "tbsp", substitutions: [] },
    { ingId: "ing_04", role: "Spice",     name: "Kashmiri red chili powder",                       ratioValue: 1,    defaultUnit: "tbsp", substitutions: ["mild paprika"] },
    { ingId: "ing_05", role: "Acid",      name: "Fresh lemon juice",                               ratioValue: 2,    defaultUnit: "tbsp", substitutions: [] },
    { ingId: "ing_06", role: "Allium",    name: "Ginger-garlic paste (equal parts)",               ratioValue: 2,    defaultUnit: "tbsp", substitutions: [] },
    { ingId: "ing_07", role: "Seasoning", name: "Salt",                                             ratioValue: 2,    defaultUnit: "tsp",  substitutions: [] },
    { ingId: "ing_08", role: "Starch",    name: "Aged basmati rice, rinsed and soaked 30 min",    ratioValue: 500,  defaultUnit: "g",    substitutions: [] },
    { ingId: "ing_09", role: "Liquid",    name: "Water, heavily salted (for parboiling)",          ratioValue: 3,    defaultUnit: "L",    substitutions: [] },
    { ingId: "ing_10", role: "Aromatic",  name: "Whole spices: bay leaves, cardamom, cloves, cinnamon stick, star anise", ratioValue: 1, defaultUnit: "tbsp", substitutions: [] },
    { ingId: "ing_11", role: "Fat",       name: "Ghee",                                             ratioValue: 4,    defaultUnit: "tbsp", substitutions: ["clarified butter"] },
    { ingId: "ing_12", role: "Allium",    name: "Thin-sliced onions, deep-fried until mahogany (birista)", ratioValue: 3, defaultUnit: "medium", substitutions: [] },
    { ingId: "ing_13", role: "Sweetener", name: "Saffron strands steeped in 3 tbsp warm milk",    ratioValue: 0.5,  defaultUnit: "tsp",  substitutions: ["1 tsp turmeric dissolved in warm milk"] },
    { ingId: "ing_14", role: "Aromatic",  name: "Rose water",                                      ratioValue: 1,    defaultUnit: "tbsp", substitutions: ["kewra (pandanus) water"] },
    { ingId: "ing_15", role: "Herb",      name: "Fresh mint leaves",                               ratioValue: 20,   defaultUnit: "leaves", substitutions: [] },
    { ingId: "ing_16", role: "Structure", name: "Atta (whole wheat) dough for sealing (dum)",      ratioValue: 200,  defaultUnit: "g",    substitutions: ["foil crimped tightly"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Marinate",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_04", "ing_05", "ing_06", "ing_07"],
      outputState: "marinated_chicken",
      instructions: "In a large bowl, combine the chicken pieces with yogurt, biryani masala, Kashmiri chili powder, lemon juice, ginger-garlic paste, and salt. Use your hands to work the marinade into every crevice — get under the skin, into the joints, and between the bones. The yogurt should completely coat each piece in a thick, rust-red paste. Cover and refrigerate for at least 2 hours, ideally overnight. The lactic acid in the yogurt begins tenderizing the protein while the spices perfume the meat from the surface inward. Before cooking, return the chicken to room temperature for 30 minutes — cold chicken will steam rather than sear and will cook unevenly in the dum.",
      visualCue: {
        primaryTarget: "Every piece thickly coated in a vivid red-orange paste. No bare patches of skin visible. The marinade clings without dripping.",
        spectrum: [
          { state: "Underdone", description: "Marinade is thin and slides off the chicken. Pale patches visible where yogurt didn't penetrate.", action: "Massage more aggressively. Score the meat with a knife in two places per piece to allow the paste to penetrate deeper." },
          { state: "Perfect",   description: "Deep red, uniform coating. Marinade smells intensely of spice and lemon. Chicken feels firm and yielding.", action: "Cover and refrigerate. The longer it sits, the better — overnight is ideal." },
          { state: "Overdone",  description: "Chicken has been in the acidic marinade for more than 24 hours. Flesh feels mushy at the surface when you press it.", action: "Proceed immediately — the acid has gone as far as it can. Longer marination now works against texture." },
        ],
      },
      feelCue: "The paste should feel slightly gritty from the spices and cool from the yogurt — like applying a thick, fragrant clay mask to the meat. Your hands will smell of ginger and clove long after.",
    },
    {
      nodeId: "step_2",
      action: "Boil",
      inputs: ["ing_08", "ing_09", "ing_10", "ing_07"],
      outputState: "parboiled_rice",
      instructions: "Bring a large pot of heavily salted water (it should taste like the sea — about 1 tablespoon of salt per liter) to a rolling boil. Add the whole spices — the bay leaves, cardamom, cloves, cinnamon, and star anise — and let them bloom in the water for 2 minutes before adding the soaked, drained rice. Cook the rice at a vigorous boil, stirring gently once, for exactly 5–6 minutes. The rice is ready for dum when each grain is 70% cooked: the outside is tender but the center still has a chalky-white, firm resistance when you bite through one grain. Drain immediately through a fine-mesh sieve — do not rinse. The starchy, spice-perfumed surface of the partially cooked grains is essential for the layers to bind as they finish in the dum.",
      visualCue: {
        primaryTarget: "Long, individual grains, white with a visible white dot of underdone starch at the center of each grain when bitten. Grains fall separately, not clumped.",
        spectrum: [
          { state: "Underdone", description: "Center of the grain is entirely chalky and hard, like raw rice. The grain snaps cleanly when bent.", action: "Return to boiling water for 1–2 more minutes. Basmati can go from underdone to overdone quickly — watch closely." },
          { state: "Perfect",   description: "Tender exterior with a firm, slightly opaque center. Grain bends without snapping. Smells of whole spices. Each grain is distinct.", action: "Drain immediately without rinsing. The starch coat must remain." },
          { state: "Overdone",  description: "Grain is fully cooked through and beginning to swell and stick. No firm center remains. Grains are clumping.", action: "Drain and spread flat on a tray to arrest cooking and dry them out. The dum will still work but the grains may not stay as separate." },
        ],
      },
      feelCue: "Rubbing a drained grain between thumb and forefinger: the outer surface is soft and silky but the center pushes back with gentle firmness. Not hard, not mush — the texture of a slightly undercooked potato.",
    },
    {
      nodeId: "step_3",
      action: "Sear",
      inputs: ["marinated_chicken", "ing_11"],
      outputState: "seared_chicken",
      instructions: "In a wide, heavy-bottomed pot (a degchi or a 28 cm dutch oven), heat 2 tablespoons of ghee over high heat until it ripples. Working in batches if needed — do not crowd the pot — sear the marinated chicken pieces, skin-side down first, for 3–4 minutes per side. You are not cooking the chicken through; you are browning the marinade surface to create the caramelized crust that will give the biryani its base of savory depth. The yogurt will sputter and the spices will bloom explosively in the hot fat. Once all pieces are seared and arranged in a single layer in the pot, pour any remaining marinade around them and reduce the heat to medium. Cook, uncovered, for 8–10 minutes until the marinade has reduced into a thick, clinging gravy around the chicken.",
      visualCue: {
        primaryTarget: "Chicken pieces with deep, dark mahogany patches on each face, sitting in a thickened, glossy, brick-red gravy that has reduced and clings to the pot sides.",
        spectrum: [
          { state: "Underdone", description: "Marinade is still pale and wet around the chicken. No color on the meat surface. The liquid is thin.", action: "Increase heat and continue — the sear needs high heat to caramelize the yogurt. Patience." },
          { state: "Perfect",   description: "Dark, almost charred-looking patches on each piece. Marinade has reduced to a thick, fragrant sauce coating each piece and pooling at the bottom.", action: "Remove from heat and begin layering immediately." },
          { state: "Overdone",  description: "Marinade has dried completely and is beginning to blacken and adhere to the pot bottom. Smoke is acrid.", action: "Add a splash of water and scrape the pot — those browned bits are flavor. Reduce heat and layer the rice before more damage is done." },
        ],
      },
      feelCue: "The pot will roar with sputtering and the marinade will release a sharp, almost sweet smell as the dairy caramelizes. Tilt the pot — the gravy should run slowly and coat the sides thickly, like reduced tomato sauce.",
    },
    {
      nodeId: "step_4",
      action: "Assemble",
      inputs: ["seared_chicken", "parboiled_rice", "ing_12", "ing_13", "ing_14", "ing_15", "ing_11"],
      outputState: "layered_biryani",
      instructions: "With the chicken spread at the base of the pot in its gravy, begin the rice layers. Spread half the parboiled rice over the chicken in an even, flat layer — do not press it down; keep it loose and airy. Scatter half the fried onions (birista) across the rice, drop half the mint leaves evenly, and drizzle half the saffron milk in a zigzag pattern so pools of gold will marbleize the white grains. Drizzle 1 tablespoon of ghee and a few drops of rose water. Repeat with the remaining rice, onion, mint, saffron milk, ghee, and rose water. The final layer should be rice, crowned with the last of the saffron and golden onion. The pot is now a cathedral of layers — do not disturb it.",
      visualCue: {
        primaryTarget: "Clean, visible strata: dark meat at the base, then a white-gold rice layer with amber saffron streaks and dark crispy onion scattered throughout. The top layer is white with vivid yellow-orange patches of saffron.",
        spectrum: [
          { state: "Underdone", description: "Rice was mixed with the chicken rather than layered, or the saffron was not added. The assembly looks uniform and beige.", action: "This is cosmetic only — the dum will still work. Add the saffron milk by drizzling it along the sides of the pot to introduce some color." },
          { state: "Perfect",   description: "Distinct layers visible through the pot wall. The topmost rice is white with golden patches and dark onion. The aroma is rose water, saffron, and spiced meat.", action: "Seal and begin dum cooking." },
          { state: "Overdone",  description: "Rice has been pressed down and compacted. The layers have merged and the pot is over-full — there's no room for steam to circulate.", action: "Remove some rice from the top. The dum requires headspace for the steam." },
        ],
      },
      feelCue: "The pot should feel heavy and fragrant, radiating the perfume of saffron and rose water before it is even sealed. This is the moment of maximum anticipation.",
    },
    {
      nodeId: "step_5",
      action: "Braise",
      inputs: ["layered_biryani", "ing_16"],
      outputState: "finished_biryani",
      instructions: "Roll the atta dough into a thick rope and press it firmly around the rim of the pot, then set the lid on top and press to seal — the dough creates an airtight gasket that traps steam inside. Place the sealed pot over a flat tawa or griddle over the lowest possible heat. Cook on dum for 35–40 minutes. The tawa acts as a heat diffuser, turning the stove's direct flame into a gentle, all-surrounding warmth. After 25 minutes, lay a lit charcoal briquette on the lid if you want a smoky char note, or simply continue without it. To check doneness, press the lid — it should feel warm but not scorching, and you should hear a very faint, occasional hiss of steam. After 40 minutes, remove from heat and let the sealed pot rest for 10 minutes before breaking the seal at the table. Pry the dough seal off, lift the lid slowly, and let the column of fragrant steam rise before the room.",
      visualCue: {
        primaryTarget: "When the lid lifts, a great cloud of fragrant steam rises from rice grains that are individually separate, fully cooked, and every shade from white to deep amber. The chicken at the bottom is moist and falls easily from the bone.",
        spectrum: [
          { state: "Underdone", description: "Rice at the top layer is still firm and undercooked. The chicken is not yet falling from the bone. Steam was insufficient — the seal may have leaked.", action: "Re-seal if possible and return to low heat for another 15 minutes. If the seal has broken, cover tightly with foil and add 2 tablespoons of water around the edges." },
          { state: "Perfect",   description: "Every grain in every layer is cooked through and separate. Bottom layer of chicken is deeply fragrant, moist, and slides off the bone. The saffron has bloomed and marbleized the top rice in brilliant gold.", action: "Serve immediately, scooping from the pot so each plate gets all three layers — rice from top and bottom, chicken from the base." },
          { state: "Overdone",  description: "Rice is mushy and the layers have merged into a homogeneous mass. The bottom chicken may have stuck or scorched.", action: "The texture is compromised but the flavor is still extraordinary. Serve with a cooling raita to contrast the richness." },
        ],
      },
      feelCue: "The sealed pot should feel warm but not hot to a flat palm on the lid. When you break the dough seal after resting, it peels away cleanly, having fused to both pot and lid in a brittle, baked crust that smells of toasted wheat.",
    },
  ],
};
