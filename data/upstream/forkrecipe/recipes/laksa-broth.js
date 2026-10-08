export default {
  repoId: "master_malaysian_laksa_broth_001",
  parentRepoId: null,
  slug: "laksa-broth",
  author: "ForkRecipe Kitchen",

  title: "Laksa Broth",
  description: "A Peranakan broth that walks the edge between fire and velvet — the spice paste blooms in oil until the kitchen smells like a hawker stall, then coconut milk pulls everything into a silk-rich, furiously fragrant sea.",
  cuisine: "Malaysian",
  culture: "Peranakan",
  category: "stocks",

  tags: ["malaysian", "laksa", "coconut", "spicy", "broth"],
  difficulty: 3,
  activeTime: "40 min",
  totalTime: "1 hr 20 min",
  ratioSystem: "parts",

  stars: 1456,
  forks: 142,
  contributors: 27,
  license: "CC-BY-SA",
  createdAt: "2024-06-01",
  updatedAt: "2025-09-30",

  flavorRadar: { sweet: 2, salty: 3, sour: 2, bitter: 0, umami: 4, heat: 4 },

  ingredients: [
    { ingId: "ing_01", role: "Aromatic",  name: "Dried chilies (soaked), lemongrass, galangal, turmeric — laksa paste base", ratioValue: 25, defaultUnit: "parts", substitutions: ["store-bought laksa paste (rempah)"] },
    { ingId: "ing_02", role: "Allium",    name: "Shallots, roughly chopped",                                                   ratioValue: 15, defaultUnit: "parts", substitutions: ["red onion"] },
    { ingId: "ing_03", role: "Aromatic",  name: "Dried shrimp (udang kering), soaked",                                        ratioValue: 8,  defaultUnit: "parts", substitutions: ["shrimp paste / belacan (use 1/4 the quantity)"] },
    { ingId: "ing_04", role: "Fat",       name: "Coconut oil or neutral oil",                                                  ratioValue: 10, defaultUnit: "parts", substitutions: ["vegetable oil"] },
    { ingId: "ing_05", role: "Liquid",    name: "Chicken or shrimp stock",                                                    ratioValue: 80, defaultUnit: "parts", substitutions: ["water + 1 tbsp fish sauce"] },
    { ingId: "ing_06", role: "Dairy",     name: "Coconut milk (full-fat, canned)",                                            ratioValue: 40, defaultUnit: "parts", substitutions: ["coconut cream diluted 1:1 with water"] },
    { ingId: "ing_07", role: "Seasoning", name: "Fish sauce",                                                                 ratioValue: 5,  defaultUnit: "parts", substitutions: ["soy sauce + pinch of MSG"] },
    { ingId: "ing_08", role: "Acid",      name: "Tamarind paste (from block, dissolved in warm water)",                       ratioValue: 6,  defaultUnit: "parts", substitutions: ["lime juice (add at the end, not during cooking)"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Blend",
      inputs: ["ing_01", "ing_02", "ing_03"],
      outputState: "rempah_paste",
      instructions: "Combine soaked dried chilies (drained), lemongrass (inner stalk only), galangal, turmeric, shallots, and soaked dried shrimp in a blender or food processor. Add 2-3 tablespoons of water and blitz until a smooth, cohesive paste forms. You may need to scrape down the sides 3-4 times. A fine paste catches fire better in oil and distributes evenly through the broth.",
      visualCue: {
        primaryTarget: "Paste is uniformly smooth — no visible fiber chunks from lemongrass or shallot skin; color is deep orange-red from the chilies and turmeric.",
        spectrum: [
          { state: "Underdone", description: "Paste is chunky with visible fibrous strands and unblended shallot pieces.", action: "Continue blending, adding water one tablespoon at a time. A high-powered blender takes 2-3 minutes; a food processor may need 4-5." },
          { state: "Perfect",   description: "Smooth, homogeneous paste with a vivid orange-red color. When spread on your finger, no gritty texture is felt.", action: "Proceed to frying." },
          { state: "Overdone",  description: "Not truly applicable here — a very smooth paste is ideal. If the paste has become watery from excess water, it will splatter more in oil.", action: "That is still fine; just be cautious when adding it to the hot oil and stand back." },
        ],
      },
      feelCue: "The paste should hold its shape when scooped with a spoon — moist but not runny, like a thick hummus.",
    },
    {
      nodeId: "step_2",
      action: "Fry paste",
      inputs: ["rempah_paste", "ing_04"],
      outputState: "fried_rempah",
      instructions: "Heat oil in a heavy pot or wok over medium heat. Add the rempah paste all at once — it will splatter, so stand back and cover partially. Fry, stirring constantly, for 12-18 minutes. The paste must cook until the oil separates from the solids and rises to the surface (pecah minyak — 'oil breaks'). This is non-negotiable: an undercooked rempah tastes raw and harsh.",
      visualCue: {
        primaryTarget: "Oil visibly separates and pools around and on top of the paste; the rempah is deeply fragrant and a shade darker, with a slightly fried rather than wet aroma.",
        spectrum: [
          { state: "Underdone", description: "Paste is still emulsified with the oil — no separation visible. Smells sharp and raw, with a harsh chili edge.", action: "Continue frying on medium, stirring every 30 seconds. Do not rush with high heat or the exterior burns before the interior cooks." },
          { state: "Perfect",   description: "Clear oil pools on top of and around the rempah. The paste is slightly drier, a shade darker orange-red, and smells deeply fragrant — toasted spice and coconut.", action: "Add stock immediately." },
          { state: "Overdone",  description: "Paste is dark brown, sticking heavily and beginning to burn on the pot bottom. Smell is acrid.", action: "Remove from heat immediately, add stock right away to stop the cooking. The broth may have slight bitterness but is usually still usable." },
        ],
      },
      feelCue: "The sound transitions from violent wet sputtering to a calmer, steady sizzle as the moisture cooks out — that quieter sizzle in pooled oil means the rempah is ready.",
    },
    {
      nodeId: "step_3",
      action: "Simmer",
      inputs: ["fried_rempah", "ing_05", "ing_08"],
      outputState: "spiced_stock",
      instructions: "Pour stock into the fried rempah and stir to combine. Add tamarind water. Bring to a boil, then reduce to a gentle simmer. Cook uncovered for 20 minutes, skimming any foam. The broth will darken and deepen as the rempah fully integrates with the stock.",
      visualCue: {
        primaryTarget: "Broth is a rich brick-red to amber color, slightly thickened, with a thin layer of chili oil on the surface.",
        spectrum: [
          { state: "Underdone", description: "Broth is still the same color as the stock with orange streaks — the rempah hasn't fully dissolved into it.", action: "Continue simmering and stir vigorously; give it another 10 minutes." },
          { state: "Perfect",   description: "Uniformly deep amber-red, slightly glossy from the oil. Smells layered — lemongrass, shrimp, chili, and a faint sour note from the tamarind.", action: "Reduce heat and add coconut milk." },
          { state: "Overdone",  description: "Broth has reduced by more than a third and is very dark and extremely salty.", action: "Add more stock or water to bring back to desired volume, and taste for seasoning before adding coconut milk." },
        ],
      },
      feelCue: "Taste the broth at this point — it should be aggressively spiced and somewhat too salty, since the coconut milk will dilute and mellow it considerably.",
    },
    {
      nodeId: "step_4",
      action: "Add coconut milk",
      inputs: ["spiced_stock", "ing_06", "ing_07"],
      outputState: "finished_laksa_broth",
      instructions: "Reduce heat to low. Pour in coconut milk slowly while stirring constantly — never allow the broth to boil after adding coconut milk or it will split. Stir in fish sauce. Taste and adjust: add more fish sauce for salt, tamarind for sour, or a pinch of sugar to round. Hold at a very gentle simmer (surface should barely tremble) for 10 minutes.",
      visualCue: {
        primaryTarget: "Broth is a creamy, opaque coral-orange color — rich and silky, not watery or grainy. A thin sheen of red chili oil floats on the surface.",
        spectrum: [
          { state: "Underdone", description: "Broth is still separated — streaks of coconut milk not fully incorporated, or the flavors taste disjointed and harsh.", action: "Stir continuously on very low heat for another 5 minutes." },
          { state: "Perfect",   description: "Smooth, creamy, uniform coral color. Smells of coconut, lemongrass, and chili in equal measure. Balanced between rich, spicy, and tangy.", action: "Use immediately to finish laksa bowls, or cool and refrigerate up to 3 days." },
          { state: "Overdone",  description: "Coconut milk has split — visible white curds in an oily orange liquid. Texture is grainy.", action: "Remove from heat, let cool slightly, then blend with an immersion blender. It will re-emulsify if not overheated." },
        ],
      },
      feelCue: "Dip a spoon in and let the broth coat it — it should leave a thin, creamy layer that does not immediately run off, indicating the right balance of coconut richness.",
    },
  ],
};
