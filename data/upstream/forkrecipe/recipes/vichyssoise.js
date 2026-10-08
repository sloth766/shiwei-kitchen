export default {
  repoId: "master_french_vichyssoise_001",
  parentRepoId: null,
  slug: "vichyssoise",
  author: "ForkRecipe Kitchen",

  title: "Vichyssoise",
  description: "A cold French soup as pale and smooth as porcelain — leeks and potatoes gently simmered in stock, blended until silky, then enriched with cream and chilled until the flavors deepen and the texture becomes something between velvet and liquid satin.",
  cuisine: "French",
  culture: "French",
  category: "vegetables",

  tags: ["french", "leek", "potato", "cold-soup", "vegetarian"],
  difficulty: 2,
  activeTime: "20 min",
  totalTime: "1 hr 20 min",
  ratioSystem: "parts",

  stars: 876,
  forks: 64,
  contributors: 11,
  license: "CC-BY-SA",
  createdAt: "2025-02-11",
  updatedAt: "2025-10-30",

  flavorRadar: { sweet: 1, salty: 3, sour: 0, bitter: 0, umami: 2, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Allium",    name: "Leeks (white and pale-green parts only), cleaned, sliced", ratioValue: 60,  defaultUnit: "parts", substitutions: ["spring onions (milder)", "white onions (sharper)"] },
    { ingId: "ing_02", role: "Starch",    name: "Floury potatoes (Maris Piper or russet), peeled and cubed", ratioValue: 50, defaultUnit: "parts", substitutions: ["Yukon Gold (creamier, less starchy)"] },
    { ingId: "ing_03", role: "Fat",       name: "Unsalted butter",                                           ratioValue: 10,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Liquid",    name: "Chicken or vegetable stock (good quality, not too salty)",  ratioValue: 100, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Dairy",     name: "Double (heavy) cream",                                      ratioValue: 20,  defaultUnit: "parts", substitutions: ["crème fraîche (adds slight tang)"] },
    { ingId: "ing_06", role: "Seasoning", name: "Salt, white pepper (not black — it makes dark flecks)",     ratioValue: 2,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Garnish",   name: "Chives, finely snipped (for serving)",                      ratioValue: 3,   defaultUnit: "parts", substitutions: ["a drizzle of cream and chive oil"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Sauté",
      inputs: ["ing_01", "ing_03", "ing_06"],
      outputState: "sweated_leeks",
      instructions: "Melt butter in a heavy saucepan over medium-low heat. Add the sliced leeks and a generous pinch of salt. Sweat gently for 10–12 minutes, stirring occasionally, until completely soft, translucent, and sweet-smelling. Do not allow the leeks to color — the finished soup should be ivory-white. Use a lid for the first 5 minutes to steam them faster without browning.",
      visualCue: {
        primaryTarget: "Leeks are completely translucent, collapsed, and pale green-white. They smell sweet and onion-mild, not sharp. The butter in the pan is clear, not browned.",
        spectrum: [
          { state: "Underdone", description: "Leeks are still partially opaque with some firm texture remaining. They smell raw and slightly sharp. Some strands are still bright green.", action: "Continue sweating with the lid on. Underdone leeks will leave a raw, grassy edge in the finished soup." },
          { state: "Perfect",   description: "Fully translucent, soft, sweet-smelling. Color is pale sage-white. Butter remains clear and light. Leeks collapse under gentle pressure.", action: "Add potatoes and stock." },
          { state: "Overdone",  description: "Leeks are beginning to turn golden at the edges. Some caramelization is happening. The butter may be starting to brown.", action: "Add a splash of stock immediately to cool the pan. The soup will have a slightly sweeter, nuttier taste but remain acceptable." },
        ],
      },
      feelCue: "Press a leek strand against the side of the pot with a spoon — it should flatten immediately with no resistance, like pressing a soft tissue, not spring back with any firmness.",
    },
    {
      nodeId: "step_2",
      action: "Simmer",
      inputs: ["sweated_leeks", "ing_02", "ing_04"],
      outputState: "cooked_soup",
      instructions: "Add the cubed potatoes and pour in the warm stock. Bring to a simmer and cook for 20–25 minutes until the potatoes are completely tender throughout. Do not rush with high heat — a gentle simmer preserves the clean, delicate flavors. The liquid will turn very slightly cloudy as potato starch is released.",
      visualCue: {
        primaryTarget: "Potatoes are completely tender — a paring knife inserted meets zero resistance and the cube falls off when the knife is withdrawn. The stock is slightly cloudy and pale.",
        spectrum: [
          { state: "Underdone", description: "Potato cubes are firm and opaque in the center. A knife meets resistance. Soup tastes starchy and lean.", action: "Continue simmering. Underdone potato will leave a grainy texture even after blending." },
          { state: "Perfect",   description: "Potatoes fall apart when pressed with a spoon. Stock is slightly cloudy. The combination tastes mild, starchy, and sweet.", action: "Remove from heat and blend." },
          { state: "Overdone",  description: "Potatoes have completely dissolved into the stock. The mixture is already very thick and starchy-tasting.", action: "Proceed to blending — the soup will be even more velvety and may need extra stock to adjust consistency." },
        ],
      },
      feelCue: "Bite a potato cube from the simmering soup — it should crumble to a paste immediately on the tongue with no graininess, like a perfectly cooked floury potato in a jacket.",
    },
    {
      nodeId: "step_3",
      action: "Blend",
      inputs: ["cooked_soup", "ing_05"],
      outputState: "blended_soup",
      instructions: "Use an immersion blender directly in the pot, or carefully transfer in batches to a stand blender (never fill more than half full with hot liquid). Blend for at least 2 minutes until completely smooth. Pass through a fine-mesh sieve, pressing firmly with a ladle to extract all the liquid and force the vegetable pulp through. Stir in the cold double cream. This sieving step is non-negotiable for the characteristic silky vichyssoise texture.",
      visualCue: {
        primaryTarget: "A completely smooth, ivory-white soup with the consistency of thin cream. When poured, it falls in a single, unbroken ribbon with no lumps, fibrous strands, or opaque patches.",
        spectrum: [
          { state: "Underdone", description: "Blended but not sieved — visible fibrous strands from the leeks, small lumps, a slightly grainy texture. The soup is off-white but not fully smooth.", action: "Pass through a fine-mesh sieve. This step is essential for vichyssoise — the texture difference is dramatic." },
          { state: "Perfect",   description: "Completely smooth, ivory-white, flowing like thin cream. No visible particles. The cream is fully incorporated and the soup has a slight sheen.", action: "Season carefully with white pepper and salt. Chill for at least 1 hour before serving." },
          { state: "Overdone",  description: "Over-blended and too warm when cream was added — the cream may have partly separated or the potato has become slightly gluey.", action: "Sieve again and add a small amount of cold stock to loosen. Chill thoroughly." },
        ],
      },
      feelCue: "Rub a small amount of the blended, sieved soup between your fingers — it should feel entirely smooth with the slight slip of cream, like fine hand lotion, with absolutely no graininess.",
    },
    {
      nodeId: "step_4",
      action: "Chill",
      inputs: ["blended_soup", "ing_07"],
      outputState: "finished_vichyssoise",
      instructions: "Transfer the blended soup to a container and refrigerate for at least 1 hour, ideally 4 hours or overnight. Cold temperatures transform the soup — the flavors deepen and meld, and the texture firms slightly to a richer, more velvety consistency. Before serving, taste again — cold soup always needs more salt than warm soup. Adjust seasoning. Serve in chilled bowls with finely snipped chives.",
      visualCue: {
        primaryTarget: "A pale ivory soup in a chilled bowl, perfectly still and smooth as a mirror. Finely snipped chives scattered across the surface provide the only color contrast — vivid green against white.",
        spectrum: [
          { state: "Underdone", description: "Served too warm — above 10°C. The soup tastes flat and the texture feels thin. The cream hasn't fully integrated.", action: "Return to the refrigerator. Vichyssoise must be truly cold to taste correct — warmth flattens the flavors entirely." },
          { state: "Perfect",   description: "Served at 4–8°C — pleasantly cold, like a savoury milkshake. Flavors are clean, rounded, and gently sweet. Chives are bright and fragrant against the pale surface.", action: "Serve immediately from refrigerator-cold bowls." },
          { state: "Overdone",  description: "Soup is nearly freezing — ice crystals have begun to form at the edges. Flavor is muted and the texture is slightly grainy.", action: "Stir gently and allow to come up to 5°C before serving. Alternatively, blend the icy patches smooth." },
        ],
      },
      feelCue: "A spoonful of properly chilled vichyssoise on the tongue should feel cool and silky simultaneously — the cold temperature creates a clean, mineral sharpness while the cream coats the palate in richness.",
    },
  ],
};
