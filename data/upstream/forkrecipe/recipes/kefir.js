export default {
  repoId: "master_eastern_european_kefir_001",
  parentRepoId: null,
  slug: "kefir",
  author: "ForkRecipe Kitchen",
  title: "Milk Kefir",
  description: "Whole milk cultured with live kefir grains for 24 hours into a tangy, lightly effervescent probiotic drink — thicker than buttermilk, alive with dozens of bacterial and yeast strains that have been passed hand-to-hand through the Caucasus for centuries. Poured cold over fruit or drunk straight from the jar, it is tart and creamy and faintly fizzy in a way no yogurt can replicate.",
  cuisine: "Eastern European",
  culture: "Caucasian (Georgia)",
  category: "fermented",
  tags: ["fermented", "milk", "kefir", "probiotic", "caucasian", "beverage", "gluten-free", "live-culture"],
  difficulty: 2,
  activeTime: "10 min",
  totalTime: "24 hr",
  ratioSystem: "parts",
  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",
  flavorRadar: { sweet: 1, salty: 1, sour: 4, bitter: 0, umami: 1, heat: 0 },
  ingredients: [
    {
      ingId: "ing_01",
      role: "Dairy",
      name: "Whole milk (full-fat, pasteurized — not ultra-pasteurized if possible)",
      ratioValue: 10,
      defaultUnit: "parts",
      substitutions: ["2% milk (thinner result)", "coconut milk (for dairy-free — use more grains)"],
    },
    {
      ingId: "ing_02",
      role: "Leavener",
      name: "Active milk kefir grains (live, rinsed)",
      ratioValue: 0.5,
      defaultUnit: "parts",
      substitutions: ["powdered kefir starter (cultures are less diverse, single-use)"],
    },
  ],
  processNodes: [
    {
      nodeId: "step_1",
      action: "Ferment",
      inputs: ["ing_01", "ing_02"],
      outputState: "fermenting_kefir",
      instructions:
        "Place the live kefir grains into a clean glass jar (do not use metal bowls or utensils with kefir — the grains are sensitive to reactive metals). Pour the whole milk over the grains at room temperature — if the milk is cold from the fridge, the fermentation will be slower and may take up to 36 hours. The ratio of grains to milk matters: about 1 tablespoon of grains per 250 ml milk is ideal. Too many grains ferment the milk too quickly, producing a very sour, thin result. Cover the jar with a cloth or paper towel secured with a rubber band — do not use an airtight lid during fermentation, as the CO2 produced needs to escape. Leave at room temperature (18–24 C) for 18–28 hours, tasting at 18 hours and again at 24 hours.",
      visualCue: {
        primaryTarget:
          "The milk has thickened noticeably. The grains are floating near the top or suspended in a thickened, cream-colored liquid that moves slowly when the jar is tilted.",
        spectrum: [
          {
            state: "Underdone",
            description:
              "Milk still looks and flows like fresh milk. No thickening. No sour aroma. Grains have sunk to the bottom.",
            action:
              "Move the jar to a warmer spot (22–25 C). Taste at 6-hour intervals — cold rooms slow the culture dramatically.",
          },
          {
            state: "Perfect",
            description:
              "Thickened to the consistency of thin yogurt. Tangy, effervescent aroma — like buttermilk with a yeasty edge. Slight separation of whey visible at the bottom.",
            action:
              "Strain immediately to stop fermentation and separate the grains.",
          },
          {
            state: "Overdone",
            description:
              "Kefir has separated dramatically into thick curds and watery, yellowish whey. Smells very sour and slightly alcoholic.",
            action:
              "Strain and blend to re-emulsify, then refrigerate. It is still safe to drink but very tart — ideal for baking or smoothies rather than drinking straight.",
          },
        ],
      },
      feelCue:
        "Tilt the jar gently — the cultured milk should flow slowly and coat the glass in a thin layer, like cream that has thickened overnight. If it flows as freely as fresh milk, it needs more time.",
    },
    {
      nodeId: "step_2",
      action: "Strain",
      inputs: ["fermenting_kefir"],
      outputState: "finished_kefir",
      instructions:
        "Pour the fermented kefir through a plastic or stainless-steel strainer (not fine-mesh — kefir grains need to pass through easily; use a coarse sieve with 2–3 mm holes) into a clean jar or pitcher. The grains will collect in the strainer. Stir gently with a plastic spatula to help the liquid drain through — do not force or press the grains. Once strained, rinse the grains very briefly under cool, unchlorinated water if desired (some fermenters do not rinse, which keeps cultures more diverse). Place the recovered grains into a fresh jar with fresh milk to begin the next batch immediately, or store the grains submerged in fresh milk in the refrigerator for up to 2 weeks. Seal the finished kefir and refrigerate; it will continue to ferment slowly and become more carbonated over 1–3 days in the fridge.",
      visualCue: {
        primaryTarget:
          "The finished kefir is a creamy, slightly lumpy, ivory-white liquid — thicker than milk, thinner than Greek yogurt. The strained grains look like small, translucent, cauliflower-like clumps.",
        spectrum: [
          {
            state: "Underdone",
            description:
              "The strained liquid flows as freely as fresh milk. The grains look flat and small.",
            action:
              "Pour the liquid back over the grains and ferment for another 6–8 hours. Underdeveloped grains need time to grow.",
          },
          {
            state: "Perfect",
            description:
              "Creamy, gently viscous ivory-white liquid. Grains are plump, white, and gelatinous, resembling small cauliflower florets.",
            action:
              "Refrigerate the kefir and begin the next batch with the recovered grains right away.",
          },
          {
            state: "Overdone",
            description:
              "Very sour, thin liquid with significant whey separation. Grains appear slightly slimy.",
            action:
              "Blend the strained kefir to unify the curds and whey. Rinse the grains and begin a fresh batch in slightly cooler conditions.",
          },
        ],
      },
      feelCue:
        "The recovered kefir grains should feel like soft, gelatinous pearls between your fingers — slippery and slightly bouncy, never mushy or dissolving. Healthy grains are the promise of tomorrow's batch.",
    },
  ],
};
