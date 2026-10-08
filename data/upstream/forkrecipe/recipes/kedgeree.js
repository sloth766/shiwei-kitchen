export default {
  repoId: "master_british_kedgeree_001",
  parentRepoId: null,
  slug: "kedgeree",
  author: "ForkRecipe Kitchen",

  title: "Kedgeree",
  description: "The British breakfast that never quite forgot it was Indian — smoked haddock and basmati rice perfumed with curry leaf and cardamom, topped with soft-boiled eggs and parsley, a colonial collision that became its own distinct thing.",
  cuisine: "British",
  culture: "Anglo-Indian",
  category: "seafood",

  tags: ["kedgeree", "smoked haddock", "rice", "british", "breakfast", "anglo-indian", "eggs"],
  difficulty: 2,
  activeTime: "30 min",
  totalTime: "50 min",
  ratioSystem: "parts",

  stars: 980,
  forks: 82,
  contributors: 24,
  license: "CC-BY-SA",
  createdAt: "2025-01-05",
  updatedAt: "2025-05-11",

  flavorRadar: { sweet: 1, salty: 4, sour: 1, bitter: 1, umami: 4, heat: 2 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Undyed smoked haddock fillet",           ratioValue: 100, defaultUnit: "parts", substitutions: ["smoked cod", "kippered herring"] },
    { ingId: "ing_02", role: "Starch",    name: "Basmati rice (rinsed)",                  ratioValue: 80,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Protein",   name: "Eggs (soft-boiled, halved)",             ratioValue: 30,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Dairy",     name: "Full-fat milk (for poaching haddock)",   ratioValue: 60,  defaultUnit: "parts", substitutions: ["water"] },
    { ingId: "ing_05", role: "Fat",       name: "Unsalted butter",                        ratioValue: 15,  defaultUnit: "parts", substitutions: ["ghee"] },
    { ingId: "ing_06", role: "Allium",    name: "Yellow onion (finely diced)",            ratioValue: 40,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Spice",     name: "Mild curry powder (Madras-style)",       ratioValue: 5,   defaultUnit: "parts", substitutions: ["garam masala + turmeric"] },
    { ingId: "ing_08", role: "Aromatic",  name: "Cardamom pods and bay leaf",             ratioValue: 2,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_09", role: "Herb",      name: "Flat-leaf parsley (chopped)",            ratioValue: 5,   defaultUnit: "parts", substitutions: ["coriander for a more Indian style"] },
    { ingId: "ing_10", role: "Seasoning", name: "Black pepper (freshly ground)",          ratioValue: 2,   defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Poach",
      inputs: ["ing_01", "ing_04"],
      outputState: "poached_haddock",
      instructions: "Place smoked haddock in a wide, shallow pan, skin side down. Pour milk over to nearly cover. Add a bay leaf and a few peppercorns. Bring to a gentle simmer over medium heat — do not boil. Poach for 8-10 minutes until the fish turns opaque and flakes easily. Remove fish to a plate. Reserve the poaching milk — it carries smokiness and salt that will season the rice. When fish is cool enough to handle, remove the skin and flake into large, irregular pieces.",
      visualCue: {
        primaryTarget: "Fish is uniformly opaque and ivory-white throughout. The flesh flakes into large, natural pieces when a fork is pressed gently against the thickest part.",
        spectrum: [
          { state: "Underdone", description: "The center of the fish is still translucent grey and resists flaking. The flesh is rubbery.", action: "Continue poaching 3-4 more minutes. The milk should be at a gentle simmer, not a rolling boil." },
          { state: "Perfect",   description: "Fully opaque, natural flake, moist. Skin releases cleanly. Large pieces hold together when lifted.", action: "Remove from milk immediately and reserve the poaching liquid." },
          { state: "Overdone",  description: "Fish is breaking apart in the milk. Pieces are dry and crumble into small fragments.", action: "Remove immediately and handle carefully. The fish will still work but the large-flake texture is lost." },
        ],
      },
      feelCue: "A properly poached haddock flake should feel moist and slightly firm between your fingers — it resists breaking into small pieces, giving way at natural grain lines instead.",
    },
    {
      nodeId: "step_2",
      action: "Sauté",
      inputs: ["ing_05", "ing_06", "ing_07", "ing_08"],
      outputState: "spiced_onion_base",
      instructions: "Melt butter in a wide, heavy pot over medium heat. Add onion and cook for 10 minutes until soft and golden. Add crushed cardamom pods, bay leaf, and curry powder. Stir for 1-2 minutes until the spices are fragrant and have bloomed in the butter. The onion should be soft and perfumed with curry, cardamom, and the faint sweetness of cooked allium. Remove bay leaf and any large cardamom pieces before adding rice.",
      visualCue: {
        primaryTarget: "Onion is golden and soft, coated in deep yellow-orange curry butter. The spices are fragrant and well distributed. The pot smells warmly of curry and cardamom.",
        spectrum: [
          { state: "Underdone", description: "Onion is still translucent and sharp-smelling. Curry powder looks pale and raw.", action: "Cook 3-5 more minutes. The spices need the onion to fully soften first." },
          { state: "Perfect",   description: "Golden, jammy, uniformly yellow from curry. Deep, warm aromatic smell — spiced but not harsh.", action: "Add rice and stir to coat." },
          { state: "Overdone",  description: "Curry powder is scorching and the smell is acrid. Onion is very brown.", action: "Add a splash of poaching milk immediately to stop the spices burning." },
        ],
      },
      feelCue: "Bloomed curry in butter has a warm, round fragrance rather than a raw, sharp one — it smells like the inside of a good restaurant rather than an open spice jar.",
    },
    {
      nodeId: "step_3",
      action: "Simmer",
      inputs: ["spiced_onion_base", "ing_02", "ing_04"],
      outputState: "cooked_spiced_rice",
      instructions: "Add the rinsed rice to the pot and stir to coat in the spiced butter. Pour in 300ml of the reserved poaching milk (topped up with water if needed). Bring to a boil, reduce heat to very low, and cover tightly. Cook for 12 minutes without lifting the lid. Remove from heat and let steam, covered, for 8 minutes. The rice should be fully cooked, fragrant with spice, and slightly yellow from the curry.",
      visualCue: {
        primaryTarget: "Rice is uniformly cooked, fluffy, and yellow-gold from the curry. A fork drawn through leaves distinct grain channels. No pooling liquid.",
        spectrum: [
          { state: "Underdone", description: "Rice is still chalky at the center. Steam channels are absent or sparse. A chewy, starchy bite.", action: "Replace the lid and steam 5 more minutes over the lowest possible heat." },
          { state: "Perfect",   description: "Fluffy, separated, golden-yellow grains. Clean and fragrant. Fork slides through without resistance.", action: "Gently fold in the haddock pieces." },
          { state: "Overdone",  description: "Rice has clumped and the base layer is sticky. The poaching milk has overcooked and the bottom is scorching.", action: "Remove from heat immediately. Spoon from the center of the pot." },
        ],
      },
      feelCue: "Lifting the lid of properly cooked kedgeree rice releases a plume of cardamom-curry steam that smells like morning in a different century.",
    },
    {
      nodeId: "step_4",
      action: "Fold",
      inputs: ["cooked_spiced_rice", "poached_haddock", "ing_03", "ing_09", "ing_10"],
      outputState: "finished_kedgeree",
      instructions: "Gently fold the haddock flakes into the rice using a wide spatula, working in broad, careful motions to keep the fish in large pieces. Add the soft-boiled eggs (halved or quartered) and scatter chopped parsley over the top. Season with black pepper — the smoked fish will have contributed significant salt, so taste before adding any. Serve directly from the pot with butter on the side.",
      visualCue: {
        primaryTarget: "Golden rice with large ivory fish flakes, vivid green parsley, and the golden yolk of a soft-boiled egg visible throughout.",
        spectrum: [
          { state: "Underdone", description: "Haddock and rice are in separate layers. The parsley and eggs haven't been added.", action: "Fold gently but completely. Every spoonful should contain both rice and fish." },
          { state: "Perfect",   description: "Uniformly distributed golden rice with large, moist fish flakes and visible egg halves. The whole dish is fragrant and vibrant.", action: "Serve immediately in warm bowls." },
          { state: "Overdone",  description: "Haddock has broken into very small flakes from over-stirring. The egg yolks have crumbled into the rice.", action: "Serve anyway. The flavor is intact — only the texture of the fish has changed." },
        ],
      },
      feelCue: "A properly made kedgeree smells of smoked fish, warm spice, and fresh parsley — three things that have no obvious business being together, yet sit in perfect harmony.",
    },
  ],
};
