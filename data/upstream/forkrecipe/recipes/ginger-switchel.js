export default {
  repoId: "master_american_ginger_switchel_001",
  parentRepoId: null,
  slug: "ginger-switchel",
  author: "ForkRecipe Kitchen",

  title: "Ginger Switchel",
  description: "The haymaker's drink of colonial New England — apple cider vinegar, raw ginger, and a sweetener dissolved in cold water into a tart, fiery, faintly earthy shrub that farmers drank in the field to cut heat and quench thirst in a way that plain water never could. Cold-poured over ice it snaps at the tongue, then leaves a ginger warmth spreading down the chest.",
  cuisine: "American",
  culture: "Colonial New England / Appalachian folk tradition",
  category: "beverages",

  tags: ["switchel", "american", "ginger", "vinegar", "drink", "colonial", "shrub", "electrolyte"],
  difficulty: 1,
  activeTime: "10 min",
  totalTime: "2 hr 10 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 2, salty: 0, sour: 4, bitter: 1, umami: 0, heat: 3 },

  ingredients: [
    { ingId: "ing_01", role: "Acid",      name: "Raw apple cider vinegar (with the mother)", ratioValue: 1, defaultUnit: "parts", substitutions: ["white wine vinegar (cleaner, less complex)", "shrub syrup of your choice"] },
    { ingId: "ing_02", role: "Spice",     name: "Fresh ginger root, finely grated (or juiced)", ratioValue: 0.5, defaultUnit: "parts", substitutions: ["ground ginger (1/4 the quantity, less bright)", "galangal for a more floral note"] },
    { ingId: "ing_03", role: "Sweetener", name: "Blackstrap or dark molasses (traditional) OR pure maple syrup", ratioValue: 0.5, defaultUnit: "parts", substitutions: ["honey", "brown sugar", "piloncillo"] },
    { ingId: "ing_04", role: "Liquid",    name: "Cold water", ratioValue: 8, defaultUnit: "parts", substitutions: ["sparkling water for a fizzy switchel"] },
    { ingId: "ing_05", role: "Aromatic",  name: "Lemon juice, freshly squeezed (optional — for extra brightness)", ratioValue: 0.25, defaultUnit: "parts", substitutions: ["lime juice"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Mix",
      inputs: ["ing_01", "ing_02", "ing_03"],
      outputState: "switchel_concentrate",
      instructions: "In a small jar or bowl, combine the apple cider vinegar, freshly grated ginger, and molasses (or maple syrup). Stir vigorously until the molasses is fully dissolved — molasses in cold liquid is stubborn and tends to sink in a heavy, dark rope. Warm the jar briefly in a bowl of warm (not hot) water for 1–2 minutes if the molasses refuses to incorporate at room temperature. Taste the concentrate: it should be aggressively sour from the vinegar, fiery from the raw ginger, and dark-sweet from the molasses, with the mineral, almost iron-like depth that blackstrap molasses brings. This concentrate is intentionally overwhelming — it is designed to be diluted with 8 parts water. The raw, unfiltered apple cider vinegar brings probiotics and a complex, slightly yeasty sourness that pasteurised vinegar cannot replicate. If using raw grated ginger, the fine fibres remain in the drink — some people love this texture; if you prefer a cleaner drink, press the grated ginger through a fine sieve and use only the juice.",
      visualCue: {
        primaryTarget: "A dark amber-brown, uniformly mixed concentrate. The molasses is fully dissolved with no dark streaks at the bottom. The mixture smells powerfully of vinegar, ginger, and dark caramel.",
        spectrum: [
          { state: "Underdone", description: "Molasses visible as dark streaks or a settled layer at the bottom. The concentrate is not uniform.", action: "Stir more vigorously, or warm gently and stir until dissolved." },
          { state: "Perfect",   description: "Uniformly dark amber-brown, fully mixed. Pours smoothly. The smell is assertive — sharp vinegar, hot ginger, dark sweet molasses. No visible solids except ginger fibres.", action: "Add cold water and lemon juice." },
          { state: "Overdone",  description: "Not possible to over-mix this concentrate.", action: "Adjust balance: if too sour, add more sweetener; if too sweet, add a splash more vinegar." },
        ],
      },
      feelCue: "The fumes from the concentrate alone should make your eyes water slightly and your nose prickle — the acetic acid in the vinegar and the gingerols in the raw ginger are both volatile irritants, and together they announce the drink before it reaches your lips.",
    },
    {
      nodeId: "step_2",
      action: "Steep",
      inputs: ["switchel_concentrate"],
      outputState: "rested_concentrate",
      instructions: "Cover the concentrate and refrigerate for at least 2 hours, ideally overnight. This rest period allows the ginger's volatile compounds to fully infuse into the acidic vinegar — the acid acts as a gentle extractor, pulling the gingerols and shogaols (the pungent aromatic molecules) out of the grated ginger fibres and into the liquid. The result is a more deeply ginger-flavoured concentrate than freshly mixed. The vinegar also softens the harsh raw edges of the ginger during this time, making it more rounded without losing the heat. After resting, the concentrate will have darkened slightly and the ginger will have settled at the bottom. The aroma after resting is more complex — the single sharp vinegar note has opened into something with woody ginger depth underneath it. This step is optional but recommended for the best flavour.",
      visualCue: {
        primaryTarget: "The concentrate after resting should look the same but smell significantly more complex — deeper ginger aroma with the vinegar sharpness more integrated rather than dominant.",
        spectrum: [
          { state: "Underdone", description: "Only 30 minutes of resting. The ginger is present but still sharp and raw-tasting rather than infused.", action: "Give it more time. The overnight rest is worth it." },
          { state: "Perfect",   description: "After 2+ hours, the concentrate smells deeply of ginger with the vinegar now a supporting note. The flavour of a small taste is complex, tart, fiery, and sweet all at once.", action: "Strain if desired, then dilute with cold water." },
          { state: "Overdone",  description: "Resting beyond 48 hours. The ginger has started to taste slightly fermented and the concentrate is very dark.", action: "Strain immediately and use. The flavour is more intense but may be too strong for some — dilute with extra water." },
        ],
      },
      feelCue: "Open the container after resting — the aroma should drift out slowly, warm and pungent, like someone opened a spice drawer. It should smell less harsh and more complex than when you first mixed it.",
    },
    {
      nodeId: "step_3",
      action: "Season",
      inputs: ["rested_concentrate", "ing_04", "ing_05"],
      outputState: "finished_switchel",
      instructions: "Strain the concentrate through a fine-mesh sieve into a large jar or pitcher to remove the ginger fibres (optional — leave them in for a more rustic, textured switchel). Add the cold water and lemon juice if using. Stir well and taste: the finished switchel should be tart and refreshing, with a building ginger heat, a clean sweet note, and the complex sourness of the cider vinegar in the background. Adjust: more water if too strong, more sweetener if too sharp, a squeeze more lemon if it feels flat. Serve immediately over plenty of ice — switchel is not a room-temperature drink. Garnish with a slice of fresh ginger and a sprig of mint if desired. The undiluted concentrate keeps refrigerated for 2 weeks; the diluted switchel is best consumed within 3 days.",
      visualCue: {
        primaryTarget: "A clear to faintly amber-hued cold drink that pours like water but leaves a slight shimmer. Over ice it should look crisp and refreshing, not murky.",
        spectrum: [
          { state: "Underdone", description: "Still too concentrated — the drink is very sour and the ginger heat is overwhelming. Unpleasant to drink more than a small sip.", action: "Add more cold water, a splash at a time, tasting as you go." },
          { state: "Perfect",   description: "Tart, refreshing, complex. The sour hits first, then the sweetness, then a slow ginger warmth builds in the chest. Deeply quenching — the kind of drink that genuinely makes you feel better on a hot day.", action: "Serve over ice immediately." },
          { state: "Overdone",  description: "Too diluted — it tastes like faintly flavoured water with a hint of sourness. The character has been washed out.", action: "Add a small splash of concentrate back to re-intensify the flavour." },
        ],
      },
      feelCue: "Take a long sip and hold it for 2 seconds before swallowing — the sourness should coat your entire mouth and then the ginger warmth should spread from your throat down into your chest like a slow, spreading ember. That delayed warmth is the switchel doing exactly what the haymakers needed on a July afternoon.",
    },
  ],
};
