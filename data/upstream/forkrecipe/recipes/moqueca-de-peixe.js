export default {
  repoId: "master_brazilian_moqueca_de_peixe_001",
  parentRepoId: null,
  slug: "moqueca-de-peixe",
  author: "ForkRecipe Kitchen",

  title: "Moqueca de Peixe",
  description: "The Bahian stew of the African diaspora: thick white fish simmered in a terracotta pan with coconut milk, dendê palm oil, tomato, onion, and cilantro until the broth is a brilliant orange, perfumed with something entirely its own — tropical, rich, and gently fiery.",
  cuisine: "Brazilian",
  culture: "Bahian",
  category: "seafood",

  tags: ["gluten-free", "dairy-free", "fish", "stew", "coconut", "afro-brazilian"],
  difficulty: 2,
  activeTime: "25 min",
  totalTime: "50 min",
  ratioSystem: "weight",

  stars: 0, forks: 0, contributors: 1, license: "CC-BY-SA",
  createdAt: "2026-06-27", updatedAt: "2026-06-27",

  flavorRadar: { sweet: 2, salty: 3, sour: 2, bitter: 1, umami: 4, heat: 2 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",    name: "Thick white fish fillets (cod, sea bass, or grouper)", ratioValue: 700, defaultUnit: "g", substitutions: ["halibut", "snapper"] },
    { ingId: "ing_02", role: "Fat",        name: "Dendê (red palm oil)",                                 ratioValue: 40,  defaultUnit: "ml", substitutions: ["smoked paprika in olive oil — not authentic but functional"] },
    { ingId: "ing_03", role: "Liquid",     name: "Full-fat coconut milk",                                ratioValue: 400, defaultUnit: "ml", substitutions: [] },
    { ingId: "ing_04", role: "Structure",  name: "Ripe tomatoes, sliced into rounds",                    ratioValue: 300, defaultUnit: "g", substitutions: ["400 g tin whole tomatoes"] },
    { ingId: "ing_05", role: "Allium",     name: "White onion, sliced into thin rounds",                 ratioValue: 200, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_06", role: "Allium",     name: "Garlic cloves, minced",                                ratioValue: 15,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_07", role: "Structure",  name: "Red and green bell peppers, sliced into thin strips",  ratioValue: 200, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_08", role: "Herb",       name: "Fresh coriander (cilantro), roughly chopped",          ratioValue: 25,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_09", role: "Acid",       name: "Lime juice",                                           ratioValue: 30,  defaultUnit: "ml", substitutions: ["lemon juice"] },
    { ingId: "ing_10", role: "Heat",       name: "Malagueta chillies or scotch bonnet, finely sliced",   ratioValue: 10,  defaultUnit: "g", substitutions: ["bird's-eye chilli"] },
    { ingId: "ing_11", role: "Seasoning",  name: "Fine salt",                                            ratioValue: 8,   defaultUnit: "g", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Marinate",
      inputs: ["ing_01", "ing_09", "ing_06", "ing_11"],
      outputState: "marinated_fish",
      instructions: "Cut the fish fillets into large portions (approximately 150 g each). In a bowl, combine with the lime juice, half the garlic, and salt. Toss gently to coat. Marinate for 20–30 minutes in the refrigerator. The lime juice will begin to denature the surface proteins, giving the fish a slightly opaque look and a more flavourful surface.",
      visualCue: {
        primaryTarget: "Fish in the lime marinade",
        spectrum: [
          { state: "Underdone", description: "Fish is still completely translucent and raw-looking after only 5 minutes. Not enough time for the marinade to penetrate.", action: "Marinate for the full 20 minutes minimum." },
          { state: "Perfect",   description: "Fish surface is slightly opaque — lightly 'cooked' by the acid. Flesh is firm and fragrant with lime and garlic. No browning or graying.", action: "Proceed to building the stew." },
          { state: "Overdone",  description: "Fish has been marinating for over 2 hours in the lime juice. Surface is white and 'cooked' throughout, crumbling when touched.", action: "Reduce the simmering time significantly — the fish will need very little heat to cook through." },
        ],
      },
      feelCue: "Press a piece of marinated fish gently — it should feel slightly firmer than raw fish but still fully yielding, like firm tofu rather than meat.",
    },
    {
      nodeId: "step_2",
      action: "Assemble",
      inputs: ["ing_02", "ing_05", "ing_04", "ing_07", "ing_10"],
      outputState: "layered_moqueca",
      instructions: "In a heavy clay pot (ideal) or wide, heavy-bottomed pan, pour the dendê oil. Layer the onion rounds across the base, then the tomato rounds, then the pepper strips, then the chilli. This layered approach is traditional — the vegetables cook in sequence from the heat of the oil below.",
      visualCue: {
        primaryTarget: "Layered vegetables in the pan",
        spectrum: [
          { state: "Underdone", description: "N/A — this is a cold-assembly step.", action: "Ensure the layers are even and cover the entire base of the pan so the fish cooks surrounded by vegetables on all sides." },
          { state: "Perfect",   description: "Distinct, even layers of red-orange onion, red tomato rounds, and multicoloured pepper strips. The dendê oil at the base is a vivid orange-red.", action: "Scatter the remaining garlic over the top and lay the fish pieces on top of the vegetable layers." },
          { state: "Overdone",  description: "N/A at assembly stage.", action: "Proceed." },
        ],
      },
      feelCue: "The layered pan should feel cold and wet when you place the fish on top — the moisture from the vegetables and the raw fish will create the steam that begins the cooking process.",
    },
    {
      nodeId: "step_3",
      action: "Simmer",
      inputs: ["layered_moqueca", "marinated_fish", "ing_03", "ing_08"],
      outputState: "finished_moqueca",
      instructions: "Lay the marinated fish pieces on top of the layered vegetables. Pour the coconut milk over everything — it should nearly submerge the fish. Cover tightly and cook over medium heat for 15–20 minutes, without stirring, until the fish is just cooked through and the coconut milk has combined with the vegetable juices and palm oil to create a brilliant orange-red broth. Add most of the coriander in the final 2 minutes. Taste and adjust salt.",
      visualCue: {
        primaryTarget: "Moqueca broth and fish during cooking",
        spectrum: [
          { state: "Underdone", description: "Fish is still translucent at the centre. Broth is pale and has not yet emulsified the palm oil and coconut milk.", action: "Cover and continue simmering — the broth will turn orange as the dendê emulsifies into the coconut milk." },
          { state: "Perfect",   description: "Fish is opaque all the way through but still holds its shape in large, moist flakes. Broth is a vivid, cloudy orange-red — the dendê and coconut have emulsified into a rich, aromatic sauce. Coriander floats on top. The pot smells of tropical richness.", action: "Serve directly from the pan at the table. Scatter remaining coriander over the top." },
          { state: "Overdone",  description: "Fish has broken apart into flakes and disintegrated into the broth. Broth has separated — the oil floating on the surface of the coconut milk.", action: "Serve immediately and very gently. Do not stir. The flavour is intact but the fish texture is gone." },
        ],
      },
      feelCue: "Use a large spoon to pull a piece of fish from the broth — it should break into large, moist, separate flakes rather than one cohesive piece. If it resists and feels rubbery, it needs more time; if it dissolves in the spoon, it is overcooked.",
    },
  ],
};
