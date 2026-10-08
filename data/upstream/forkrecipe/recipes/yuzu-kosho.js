export default {
  repoId: "master_japanese_yuzu_kosho_001",
  parentRepoId: null,
  slug: "yuzu-kosho",
  author: "ForkRecipe Kitchen",

  title: "Yuzu Kosho",
  description: "Yuzu zest and green chili ground together with salt and left to cure — a Kyushu condiment of almost impossible fragrance, equal parts floral, fiery, and saline, that transforms a simple bowl of noodles or a piece of grilled fish with a single small spoonful.",
  cuisine: "Japanese",
  culture: "Kyushu Japanese",
  category: "condiments",

  tags: ["yuzu", "japanese", "condiment", "chili", "fermented", "kyushu", "citrus"],
  difficulty: 2,
  activeTime: "30 min",
  totalTime: "7 days 30 min",
  ratioSystem: "parts",

  stars: 980,
  forks: 72,
  contributors: 19,
  license: "CC-BY-SA",
  createdAt: "2024-11-25",
  updatedAt: "2025-06-10",

  flavorRadar: { sweet: 0, salty: 4, sour: 3, bitter: 2, umami: 1, heat: 4 },

  ingredients: [
    { ingId: "ing_01", role: "Citrus",    name: "Fresh yuzu zest (from 6–8 yuzu)",         ratioValue: 100, defaultUnit: "parts", substitutions: ["lemon zest + Meyer lemon zest (combined, less floral)"] },
    { ingId: "ing_02", role: "Heat",      name: "Green Thai or serrano chilis (stemmed)",   ratioValue: 80,  defaultUnit: "parts", substitutions: ["red chilis (for red yuzu kosho)", "jalapeño (milder)"] },
    { ingId: "ing_03", role: "Seasoning", name: "Fine sea salt (non-iodized)",              ratioValue: 25,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Acid",      name: "Fresh yuzu juice",                         ratioValue: 20,  defaultUnit: "parts", substitutions: ["fresh lemon juice"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Zest",
      inputs: ["ing_01"],
      outputState: "yuzu_zest",
      instructions: "Zest the yuzu fruit using a fine microplane grater, working carefully to collect only the colored outer layer and avoid the bitter white pith beneath. A single yuzu yields a relatively small amount of zest — approximately 1–2 teaspoons. The oils in fresh yuzu zest are extraordinarily volatile and fragrant; work quickly and cover the zest as soon as it is collected to preserve those aromatics. If yuzu is not available, a combination of Meyer lemon and grapefruit zest approximates it loosely, though the floral complexity is quite different.",
      visualCue: {
        primaryTarget: "Fine, bright yellow-green zest with a distinctly wet, oily appearance from the natural oils released by grating. Intensely fragrant.",
        spectrum: [
          { state: "Underdone", description: "Zest pieces are too large and the pith is visible in the mixture — white fragments mixed with yellow.", action: "Grate more finely, applying less pressure to the fruit so you take only the very surface." },
          { state: "Perfect",   description: "Fine, uniformly yellow-green zest with a wet, oily sheen and an intensely floral, citrus fragrance. No white pith visible.", action: "Cover immediately and move to processing." },
          { state: "Overdone",  description: "You have pressed the fruit repeatedly over the same section and white pith fragments are appearing in the zest.", action: "Pick out pith fragments with a toothpick, or rotate to a fresh section of fruit. Pith will make the finished yuzu kosho bitter." },
        ],
      },
      feelCue: "The zest should coat your fingers in a faintly oily film that makes your skin smell like no other citrus — floral, almost herbal, with a complex top note that fades within seconds of leaving the skin.",
    },
    {
      nodeId: "step_2",
      action: "Mince",
      inputs: ["ing_02"],
      outputState: "minced_chili",
      instructions: "For a traditional yuzu kosho, use a suribachi (Japanese mortar) or, if unavailable, a small food processor. The chilis should be finely minced, retaining most of their seeds for heat. Remove the stem but leave seeds. The finer the mince, the more evenly the heat distributes through the finished paste. If using a knife, mince to an extremely fine, almost paste-like consistency — tiny fragments, not visible chunks.",
      visualCue: {
        primaryTarget: "A very fine, wet green mince — almost a paste — with seeds evenly distributed. No large chili pieces remaining.",
        spectrum: [
          { state: "Underdone", description: "Chili is still in visible chunks. Uneven mince means uneven heat in the final product.", action: "Continue mincing with a rocking knife motion, gathering and re-mincing until the texture is uniformly fine." },
          { state: "Perfect",   description: "Fine, wet, almost paste-like mince with seeds throughout. Color is a vivid, bright green.", action: "Combine with zest and salt." },
          { state: "Overdone",  description: "Chili is a smooth paste with seeds fully broken — some heat may have been lost from the capsaicin volatilizing.", action: "Proceed — the texture is smooth rather than slightly granular, but perfectly usable." },
        ],
      },
      feelCue: "Mince the chili wearing gloves — at this fine a cut, the capsaicin is airborne and will sting eyes and skin. The smell should be a sharp, clean green-chili fragrance.",
    },
    {
      nodeId: "step_3",
      action: "Pound",
      inputs: ["yuzu_zest", "minced_chili", "ing_03", "ing_04"],
      outputState: "yuzu_kosho_paste",
      instructions: "Combine the yuzu zest, minced chili, and salt in a suribachi or small food processor. Add the yuzu juice. Grind or process until the mixture forms a cohesive, slightly rough paste — the salt draws moisture from both the zest and chili, binding the paste together. Taste: it should be intensely salty, fiercely hot, and vibrantly citrus-forward. Transfer to a small sterilized jar.",
      visualCue: {
        primaryTarget: "A bright green, cohesive paste — smooth but slightly textured — that holds its shape when scooped on a spoon.",
        spectrum: [
          { state: "Underdone", description: "Mixture is still loose and the elements haven't coalesced — zest and chili fragments are visible separately.", action: "Continue grinding or processing. The salt needs more time to draw moisture and bind the paste." },
          { state: "Perfect",   description: "A bright green, uniform paste with a slightly granular texture. Holds on a spoon, smells intensely of yuzu and chili.", action: "Transfer to jar and cure." },
          { state: "Overdone",  description: "Completely smooth paste with all texture lost and green color beginning to oxidize to olive-drab.", action: "Proceed — it will still taste excellent. Next time, use a mortar rather than a processor for better texture control." },
        ],
      },
      feelCue: "The paste should feel wet and slightly sticky from the citrus oils and chili juice — like a very finely textured, very salty citrus jam that makes your tongue tingle before you even taste it.",
    },
    {
      nodeId: "step_4",
      action: "Cure",
      inputs: ["yuzu_kosho_paste"],
      outputState: "finished_yuzu_kosho",
      instructions: "Seal the jar and refrigerate for a minimum of 3 days, ideally 7. During this time, the salt continues to draw moisture, the flavors meld and deepen, and the sharpness of raw chili softens to something more complex. The color will shift from vivid green to a more muted olive-green — this is natural and desirable. Use in tiny amounts: a single teaspoon on grilled chicken, ramen, sashimi, or oysters. Store for up to 3 months refrigerated.",
      visualCue: {
        primaryTarget: "After curing, the paste is a deeper, more muted green-gold. The texture is uniform and slightly wetter than when packed. The aroma is deeply complex — floral citrus and chili integrated into one note.",
        spectrum: [
          { state: "Underdone", description: "After only 1 day, the paste still tastes of separate raw chili and zest. The flavors haven't integrated.", action: "Reseal and return to the refrigerator. The integration happens between days 3–7." },
          { state: "Perfect",   description: "After 5–7 days, the flavors are unified: one complex, fiery-floral-salty note. Color is olive-green. The heat has deepened from sharp to slow.", action: "Begin using in very small amounts." },
          { state: "Overdone",  description: "After 3+ months, the color has turned an olive-brown and the citrus fragrance has faded. The heat and salt remain but the floral note is gone.", action: "Still usable as a chili-salt paste. Add fresh yuzu zest to revive the fragrance." },
        ],
      },
      feelCue: "A fully cured yuzu kosho should smell like distilled citrus and chili — almost perfume-like in its intensity when you unseal the jar in a cool kitchen.",
    },
  ],
};
