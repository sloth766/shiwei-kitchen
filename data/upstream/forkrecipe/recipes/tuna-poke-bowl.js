export default {
  repoId: "master_hawaiian_tuna_poke_bowl_001",
  parentRepoId: null,
  slug: "tuna-poke-bowl",
  author: "ForkRecipe Kitchen",

  title: "Tuna Poke Bowl",
  description: "Hawaii's gift — sashimi-grade ahi cubed and dressed in a sesame-soy marinade that deepens its flavor without erasing it, served over warm rice with cool avocado and bright radish, a dish that exists at the boundary between Japanese and Hawaiian.",
  cuisine: "Hawaiian",
  culture: "Hawaiian",
  category: "seafood",

  tags: ["poke", "tuna", "ahi", "hawaii", "raw fish", "rice bowl", "japanese-inspired"],
  difficulty: 1,
  activeTime: "20 min",
  totalTime: "30 min",
  ratioSystem: "parts",

  stars: 2900,
  forks: 388,
  contributors: 96,
  license: "CC-BY-SA",
  createdAt: "2024-06-01",
  updatedAt: "2025-05-01",

  flavorRadar: { sweet: 2, salty: 4, sour: 2, bitter: 0, umami: 5, heat: 1 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Sashimi-grade ahi tuna (skin removed, cubed 2cm)", ratioValue: 100, defaultUnit: "parts", substitutions: ["salmon sashimi-grade", "yellowtail"] },
    { ingId: "ing_02", role: "Umami",     name: "Soy sauce (or tamari for gluten-free)",             ratioValue: 12,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Fat",       name: "Toasted sesame oil",                                ratioValue: 5,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Allium",    name: "Green onions (thinly sliced)",                      ratioValue: 8,   defaultUnit: "parts", substitutions: ["chives"] },
    { ingId: "ing_05", role: "Spice",     name: "Sesame seeds (toasted)",                            ratioValue: 3,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Spice",     name: "Sriracha or chili oil (optional for heat)",         ratioValue: 2,   defaultUnit: "parts", substitutions: ["sambal oelek"] },
    { ingId: "ing_07", role: "Starch",    name: "Short-grain Japanese rice (cooked, warm)",          ratioValue: 150, defaultUnit: "parts", substitutions: ["cauliflower rice for low-carb"] },
    { ingId: "ing_08", role: "Structure", name: "Ripe avocado (sliced)",                             ratioValue: 30,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_09", role: "Structure", name: "Cucumber (thinly sliced or julienned)",             ratioValue: 20,  defaultUnit: "parts", substitutions: ["daikon radish, thinly sliced"] },
    { ingId: "ing_10", role: "Umami",     name: "Nori (toasted, cut into strips)",                   ratioValue: 5,   defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Dice",
      inputs: ["ing_01"],
      outputState: "cubed_tuna",
      instructions: "Using an extremely sharp knife, cut the ahi tuna against the grain into uniform 2cm cubes. Use a single slicing motion — do not saw back and forth, which tears the flesh and damages the texture. Keep the tuna cold until the moment of mixing; place the cubed pieces on a plate in the refrigerator if working ahead. Uniformity of cut is important both aesthetically and for consistent marination.",
      visualCue: {
        primaryTarget: "Uniform, deep red cubes with clean, sharp edges. No ragged or torn surfaces. The flesh has a slight natural sheen.",
        spectrum: [
          { state: "Underdone", description: "Pieces are irregular, some much larger than others, with ragged torn edges from the knife dragging.", action: "Use a sharper knife and a single slicing motion. A sharp knife is the single most important tool for poke." },
          { state: "Perfect",   description: "Uniform 2cm cubes with clean edges. Deep red with a natural gloss. Cold to the touch.", action: "Refrigerate while mixing the marinade." },
          { state: "Overdone",  description: "Pieces have been handled too much and are beginning to show white surface oxidation.", action: "Proceed immediately to marinating to slow oxidation." },
        ],
      },
      feelCue: "Sashimi-grade tuna should feel cold, dense, and silky — not slimy or tacky. A single cube pressed between your fingers should feel like firm butter: cool, smooth, and yielding.",
    },
    {
      nodeId: "step_2",
      action: "Marinate",
      inputs: ["cubed_tuna", "ing_02", "ing_03", "ing_04", "ing_05", "ing_06"],
      outputState: "seasoned_poke",
      instructions: "In a bowl, combine soy sauce, sesame oil, green onions, sesame seeds, and sriracha. Taste the marinade on its own — it should be salty, nutty, and have a pleasant background heat. Add the cold tuna cubes and fold gently using a rubber spatula. Do not stir aggressively. Marinate for 10-15 minutes in the refrigerator. Do not exceed 20 minutes — the soy will begin to cure the tuna, changing its texture from silky to firmer and darkening the color.",
      visualCue: {
        primaryTarget: "Tuna cubes are uniformly coated in a glossy, deep brown-amber marinade. Each cube glistens with sesame oil. The green onion is distributed throughout.",
        spectrum: [
          { state: "Underdone", description: "Marinade has pooled at the bottom of the bowl. Tuna cubes are only partially coated.", action: "Fold more gently but thoroughly to distribute the marinade." },
          { state: "Perfect",   description: "Each cube coated, green onion distributed, sesame seeds visible on the surfaces. Still vivid red inside where the soy hasn't penetrated.", action: "Refrigerate for 10 minutes then assemble." },
          { state: "Overdone",  description: "Tuna has been marinating too long. The exterior is dark grey-brown and has firmed significantly from the salt cure.", action: "Assemble immediately. Over-marinated poke is less texturally ideal but safe and still flavorful." },
        ],
      },
      feelCue: "When you fold the tuna with the marinade, the bowl should smell instantly of toasted sesame and soy — rich, savory, and slightly sweet, with the ocean still underneath.",
    },
    {
      nodeId: "step_3",
      action: "Assemble",
      inputs: ["ing_07", "seasoned_poke", "ing_08", "ing_09", "ing_10"],
      outputState: "finished_poke_bowl",
      instructions: "Divide warm rice between bowls and pack it into a smooth mound on one side. Spoon the marinated tuna over half the rice. Fan avocado slices on the opposite side. Place cucumber alongside. Drape a few strips of nori over the tuna. Drizzle any remaining marinade from the bowl over everything. The temperature contrast of warm rice and cold tuna is an essential part of the dish — the rice warms the tuna from below as you eat.",
      visualCue: {
        primaryTarget: "A composed bowl with visual separation between components: deep red tuna, pale green avocado, white rice, dark nori, and bright green onion visible throughout.",
        spectrum: [
          { state: "Underdone", description: "Everything dumped into the bowl and mixed together. Colors are muddled and the visual separation is lost.", action: "Take the time to compose the bowl. The arrangement is part of the experience." },
          { state: "Perfect",   description: "Clear sections, vivid contrasting colors. Warm steam rising from the rice. Cold, glistening tuna alongside.", action: "Serve immediately." },
          { state: "Overdone",  description: "Bowl was assembled too early and sat. Avocado has browned, tuna has continued curing, and the rice has dried.", action: "Assemble only at the moment of serving. Poke bowls do not wait." },
        ],
      },
      feelCue: "The first bite of a poke bowl — when the warm rice meets the cold, silky tuna and the umami of the marinade hits — should feel like a temperature and texture revelation.",
    },
  ],
};
