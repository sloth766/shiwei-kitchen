export default {
  repoId: "master_japanese_niban_dashi_001",
  parentRepoId: null,
  slug: "niban-dashi",
  author: "ForkRecipe Kitchen",

  title: "Niban Dashi",
  description: "The second extraction from spent kombu and katsuobushi — less refined than ichiban dashi but richer and more complex, carrying the fermented depth of exhausted bonito into braises, simmered vegetables, and noodle broths.",
  cuisine: "Japanese",
  culture: "Japanese Washoku",
  category: "stocks",

  tags: ["dashi", "niban", "japanese", "umami", "stock", "katsuobushi", "kombu"],
  difficulty: 2,
  activeTime: "20 min",
  totalTime: "45 min",
  ratioSystem: "parts",

  stars: 812,
  forks: 62,
  contributors: 29,
  license: "CC-BY-SA",
  createdAt: "2025-02-20",
  updatedAt: "2025-05-01",

  flavorRadar: { sweet: 0, salty: 1, sour: 0, bitter: 1, umami: 5, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Inosinate", name: "Spent katsuobushi (from ichiban dashi)", ratioValue: 20, defaultUnit: "parts", substitutions: ["fresh katsuobushi (smaller quantity)"] },
    { ingId: "ing_02", role: "Glutamate", name: "Spent kombu (from ichiban dashi)",       ratioValue: 10, defaultUnit: "parts", substitutions: ["fresh kombu (smaller piece)"] },
    { ingId: "ing_03", role: "Liquid",    name: "Cold water",                             ratioValue: 100,defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Inosinate", name: "Additional fresh katsuobushi (optional boost)", ratioValue: 5, defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Steep",
      inputs: ["ing_01", "ing_02", "ing_03"],
      outputState: "niban_infusion",
      instructions: "Place the spent kombu and katsuobushi from your ichiban dashi into a pot with fresh cold water. Bring slowly to 140°F (60°C) over medium-low heat — this is below simmering, and you should see gentle movement in the water but no bubbles. Niban dashi is extracted at a lower temperature than the initial steep because the depleted ingredients release their remaining glutamates and inosinates more slowly and at lower temperatures. Hold at this temperature for 15 minutes.",
      visualCue: {
        primaryTarget: "A gentle, trembling heat visible on the water surface — tiny shimmer lines but no bubbles. The water will begin to color pale golden within 5 minutes.",
        spectrum: [
          { state: "Underdone", description: "Water is barely warm. No movement on the surface. Still completely clear after 10 minutes.", action: "Increase heat slightly. The temperature must reach 140°F to extract the remaining compounds." },
          { state: "Perfect",   description: "Gentle shimmer, no bubbles. Water is turning pale amber at 10 minutes. Temperature holding at 130–150°F.", action: "Hold at this temperature for the full 15 minutes before adding fresh katsuobushi if using." },
          { state: "Overdone",  description: "Water is simmering with visible bubbles. Steam rising. Color is darkening quickly.", action: "Reduce heat immediately. Niban dashi extracted too hot will taste bitter and flat." },
        ],
      },
      feelCue: "Place your hand 15cm above the pot — you should feel gentle warmth, not heat. The steam should be invisible or nearly so. This is a patient, low-temperature extraction, more steep than cook.",
    },
    {
      nodeId: "step_2",
      action: "Simmer",
      inputs: ["niban_infusion", "ing_04"],
      outputState: "niban_dashi_strained",
      instructions: "If adding fresh katsuobushi for a flavor boost, add it now and simmer (not boil) for 8–10 minutes. Simmering niban dashi slightly harder than ichiban is acceptable — the goal is richer, more assertive umami rather than delicacy. Bring to a very gentle simmer (barely perceptible movement), not a rolling boil. Turn off the heat and let steep 5 minutes undisturbed.",
      visualCue: {
        primaryTarget: "A deeper amber broth, more richly colored than ichiban dashi. Tiny fine bubbles at the edges of the pot, not a rolling simmer.",
        spectrum: [
          { state: "Underdone", description: "Broth is pale and watery in color. Has not reached even a gentle simmer. Flavor is thin.", action: "Increase heat slightly to reach a very gentle simmer, then immediately reduce." },
          { state: "Perfect",   description: "Richer amber color than ichiban. Tiny edge bubbles only. Aroma is deeply savory, slightly more assertive than ichiban — woodsmoke and ocean.", action: "Remove from heat and steep 5 minutes before straining." },
          { state: "Overdone",  description: "Full boil maintained too long. Broth is dark and slightly bitter from over-extracted bonito.", action: "Strain immediately and dilute slightly with cold water." },
        ],
      },
      feelCue: "The finished niban dashi at the right strength should leave a light savory film on your tongue when you sip it — the glutamate and inosinate synergy creates a lasting umami sensation that gentle simmering delivers more robustly than ichiban's delicacy.",
    },
    {
      nodeId: "step_3",
      action: "Strain",
      inputs: ["niban_dashi_strained"],
      outputState: "finished_niban_dashi",
      instructions: "Line a fine-mesh strainer with a sheet of cheesecloth or a coffee filter. Pour the dashi through slowly without pressing the solids — pressing extracts bitter tannins. Discard the kombu and katsuobushi. The strained dashi should be clear or nearly so, with a warm amber color. Allow to settle 5 minutes; any remaining fine particles will sink. Use immediately or cool rapidly and refrigerate for up to 3 days, or freeze for 1 month.",
      visualCue: {
        primaryTarget: "Clear or near-clear amber liquid with no floating particles. Color should be a warm, transparent gold.",
        spectrum: [
          { state: "Underdone", description: "Dashi is turbid with floating fine particles. May still be hot and has not had time to settle.", action: "Allow to settle 10 minutes and strain again through a fresh coffee filter." },
          { state: "Perfect",   description: "Clear, warm amber. No particles visible when held up to light. Clean, deeply savory aroma.", action: "Use in simmered dishes, soups, and braising liquids where a robust dashi flavor is needed." },
          { state: "Overdone",  description: "Very dark brown, almost opaque. Tastes bitter and flat.", action: "Dilute with fresh cold water 1:1 to moderate the bitterness." },
        ],
      },
      feelCue: "Sip a small spoonful of finished niban dashi — it should feel like drinking a whisper of the sea. The umami lingers noticeably on the back of the tongue and sides of the mouth for 20–30 seconds after swallowing — this persistence is the synergistic effect of glutamate from kombu and inosinate from bonito.",
    },
  ],
};
