export default {
  repoId: "master_chinese_xo_sauce_001",
  parentRepoId: null,
  slug: "xo-sauce",
  author: "ForkRecipe Kitchen",

  title: "XO Sauce",
  description: "Hong Kong's most celebrated condiment — a slow-fried collision of dried scallops, dried shrimp, Chinese ham, chilli, and garlic, each ingredient separately rendered into its most concentrated, aromatic self before being united in a pool of shimmering oil. The result is a dark, rust-red, intensely savoury paste that elevates everything it touches: noodles, rice, stir-fries, steamed fish.",
  cuisine: "Chinese",
  culture: "Hong Kong",
  category: "condiments",

  tags: ["xo-sauce", "chinese", "hong-kong", "umami", "dried-seafood", "luxury"],
  difficulty: 4,
  activeTime: "1 hr",
  totalTime: "1.5 hr",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 1, salty: 5, sour: 0, bitter: 1, umami: 5, heat: 3 },

  ingredients: [
    { ingId: "ing_01", role: "Umami",    name: "Dried scallops (conpoy), soaked 2 hr", ratioValue: 3,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_02", role: "Umami",    name: "Dried shrimp, soaked 30 min",          ratioValue: 2,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Inosinate","name": "Chinese cured ham (Jinhua or prosciutto di Parma)", ratioValue: 1.5, defaultUnit: "parts", substitutions: ["Iberico ham", "prosciutto"] },
    { ingId: "ing_04", role: "Allium",   name: "Shallots (very finely minced)",         ratioValue: 2,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Allium",   name: "Garlic (very finely minced)",            ratioValue: 1,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Heat",     name: "Dried red chillies (árbol or tianjin), finely chopped", ratioValue: 1, defaultUnit: "parts", substitutions: ["Korean gochugaru"] },
    { ingId: "ing_07", role: "Fat",      name: "Neutral oil (rice bran, peanut, or grapeseed)", ratioValue: 6, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_08", role: "Seasoning","name": "Soy sauce",                            ratioValue: 0.5, defaultUnit: "parts", substitutions: ["tamari"] },
    { ingId: "ing_09", role: "Sweetener","name": "Caster sugar",                         ratioValue: 0.3, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_10", role: "Solvent",  name: "Shaoxing rice wine",                    ratioValue: 1,   defaultUnit: "parts", substitutions: ["dry sherry"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Prep",
      inputs: ["ing_01", "ing_02", "ing_03"],
      outputState: "prepped_seafood_and_ham",
      instructions: "Soak dried scallops in cold water for 2 hours; soak dried shrimp separately in cold water for 30 minutes. Reserve the scallop soaking liquid — it is intensely flavoured and will be added to the sauce. Drain and shred the rehydrated scallops by hand into thin strands along their natural fibres — they should pull apart like cooked chicken. Roughly chop the rehydrated shrimp. Finely dice the cured ham into pieces no larger than 5 mm.",
      visualCue: {
        primaryTarget: "Scallops are shredded into delicate pale gold strands. Shrimp are rough-chopped into small pieces. Ham is neatly diced. All three are ready and separate before frying begins.",
        spectrum: [
          { state: "Underdone", description: "Scallops are still firm and resist shredding — they feel rubbery and dense.", action: "Soak for another 30 minutes. Under-soaked scallops will not shred into the right texture and will fry unevenly." },
          { state: "Perfect",   description: "Scallops pull apart easily into silky golden fibres. Shrimp are plump and yielding. The soaking liquid is amber and deeply fragrant.", action: "Begin frying immediately, or refrigerate the prepared components for up to 8 hours." },
          { state: "Overdone",  description: "Scallops have soaked so long they are waterlogged and falling apart into mush rather than strands.", action: "Gently squeeze out excess water and proceed. The texture will be less distinct but the flavour is unaffected." },
        ],
      },
      feelCue: "A well-soaked scallop pulled along its grain should feel like wet silk — it separates into strands without resistance. If it tears in chunks, it needs more soaking.",
    },
    {
      nodeId: "step_2",
      action: "Fry",
      inputs: ["prepped_seafood_and_ham", "ing_07"],
      outputState: "fried_seafood_and_ham",
      instructions: "Heat half the oil in a wok or wide, heavy skillet over medium-low heat. Add the shredded scallops first — they take longest. Fry slowly, stirring frequently, for 10–12 minutes until they turn golden and slightly crispy at the edges but remain tender inside. Add the shrimp and ham and continue frying for another 5–6 minutes until the shrimp are golden and fragrant and the ham's fat is rendered. The oil will turn orange from the scallop collagen. Remove all from the oil with a slotted spoon and set aside, reserving the flavoured oil.",
      visualCue: {
        primaryTarget: "Scallop strands should be a light, even gold — crispy at the outermost tips but still tender and yielding in the middle. The frying oil turns a warm amber-orange.",
        spectrum: [
          { state: "Underdone", description: "Scallops are still pale and soft throughout — they have steamed rather than fried. Oil not hot enough.", action: "Increase heat to medium and continue frying. Underdone scallops will make the sauce taste steamed, not fried." },
          { state: "Perfect",   description: "Golden scallop strands with slightly crispy edges. The wok smells of caramelised seafood. Ham bits are rendered and lightly browned.", action: "Remove from oil and set aside. Keep the oil." },
          { state: "Overdone",  description: "Scallop strands are dark brown and brittle — they smell of burnt seafood.", action: "Taste a piece. If merely deeply toasted (not burnt), they may work. If bitter, discard and start this step over." },
        ],
      },
      feelCue: "A fried scallop strand pinched between the fingers should have a slight crunch at the tips and yield softly at the center — the contrast of texture is the prize.",
    },
    {
      nodeId: "step_3",
      action: "Fry",
      inputs: ["fried_seafood_and_ham", "ing_04", "ing_05", "ing_06"],
      outputState: "aromatics_cooked_into_oil",
      instructions: "In the same wok with the reserved flavoured oil, reduce heat to low. Add the remaining oil. When the oil is shimmering but not smoking, add shallots and fry slowly, stirring constantly, for 8–10 minutes until they are deeply golden and beginning to crisp. Add garlic and fry for another 3–4 minutes — garlic burns faster than shallots, so watch carefully. Finally add the dried chilli and fry for 2 minutes. The entire allium-chilli base should be deeply golden, fragrant, and slightly crispy at the edges.",
      visualCue: {
        primaryTarget: "Shallots are a deep, even amber-gold — lightly crispy at the edges, still cohesive. Garlic is just turning golden. Chilli has darkened and is fragrant but not burnt.",
        spectrum: [
          { state: "Underdone", description: "Shallots are still pale and soft — no colour has developed and they smell raw and sharp.", action: "Continue frying over low heat. Patience is essential — rushing the alliums makes harsh sauce." },
          { state: "Perfect",   description: "Deep golden shallots with slight crispiness. Garlic is golden and nutty-smelling. The chilli has opened up and made the oil red-orange. The wok smells extraordinary — sweet, sharp, oceanic, and spicy all at once.", action: "Return the fried scallops, shrimp, and ham to the wok." },
          { state: "Overdone",  description: "Garlic or shallots have turned dark brown and smell bitter. The oil is acrid.", action: "If slightly over, proceed quickly — the seafood and ham will balance some bitterness. If clearly burnt, start the aromatics step over." },
        ],
      },
      feelCue: "Stand close to the wok — you should feel gentle warmth from the oil, not aggressive heat. Low and slow is the only way to build XO's complex allium base.",
    },
    {
      nodeId: "step_4",
      action: "Simmer",
      inputs: ["aromatics_cooked_into_oil", "ing_08", "ing_09", "ing_10"],
      outputState: "combined_xo_sauce",
      instructions: "Return the fried scallops, shrimp, and ham to the wok. Add soy sauce, sugar, and Shaoxing rice wine. Add 2–3 tablespoons of the reserved scallop soaking liquid. Stir everything together and simmer over medium-low heat for 5–8 minutes, stirring frequently, until the wine has cooked off, the sugar has dissolved, and the sauce has come together into a cohesive, glistening, dark rust-red condiment. Taste and adjust salt.",
      visualCue: {
        primaryTarget: "A dark, rust-red, oil-glistening mixture where all components are distinct but unified — shredded scallop gold, orange-red chilli oil, amber alliums. The sauce should look rich and oily, not dry.",
        spectrum: [
          { state: "Underdone", description: "The sauce still smells sharply of wine or soy. Components look separate and unintegrated.", action: "Continue simmering until the wine evaporates and the sauce comes together." },
          { state: "Perfect",   description: "A deeply fragrant, cohesive rust-red sauce. Everything is glistening in the oil. The flavour is intensely savory, slightly spicy, and impossibly complex — the sum is more than the parts.", action: "Remove from heat and cool completely before jarring." },
          { state: "Overdone",  description: "The sauce has dried out — the oil has been absorbed and the mixture looks crumbly and dry.", action: "Add a small amount of neutral oil and stir over low heat until glossy again." },
        ],
      },
      feelCue: "A spoonful of finished XO sauce should feel slick and heavy — the oil should pool around the solids. If the spoon feels dry and the mixture is clumping, add more oil.",
    },
    {
      nodeId: "step_5",
      action: "Cool",
      inputs: ["combined_xo_sauce"],
      outputState: "finished_xo_sauce",
      instructions: "Cool the sauce to room temperature before transferring to sterilized glass jars. Ensure the sauce is fully submerged in the oil — add a thin layer of neutral oil on top if needed to seal it. Refrigerate. The oil will solidify slightly in the refrigerator — this is normal. XO sauce keeps refrigerated for 1 month and frozen for 3 months. Use a clean, dry spoon each time.",
      visualCue: {
        primaryTarget: "Jarred sauce should show a deep red-orange oil layer on top sealing the mixture below. When chilled, the oil layer will become slightly opaque and waxy.",
        spectrum: [
          { state: "Underdone", description: "Sauce is still warm when jarred and the heat has created condensation in the jar lid, which will introduce moisture and reduce shelf life.", action: "Cool completely before jarring. Condensation introduces water, which risks spoilage." },
          { state: "Perfect",   description: "Room-temperature sauce fully submerged in oil. A clean, sterilized jar with a tight seal. The sauce keeps perfectly for a month in the refrigerator.", action: "Refrigerate and allow the flavours to meld for at least 24 hours before first use." },
          { state: "Overdone",  description: "Sauce has been left to cool too long and has congealed. Difficult to transfer cleanly to the jar.", action: "Warm very gently over low heat until just fluid again, then jar." },
        ],
      },
      feelCue: "A cooled jar of XO sauce tilted to the side should show the oil moving slowly, like a viscous liquid — much slower than water. That viscosity is the rendered scallop collagen and flavored oil carrying weeks of work.",
    },
  ],
};
