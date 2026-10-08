export default {
  repoId: "master_persian_saffron_rice_001",
  parentRepoId: null,
  slug: "saffron-rice",
  author: "ForkRecipe Kitchen",

  title: "Chelow ba Tahdig",
  description: "Persian saffron rice — the parboil-and-steam technique that produces rice of extraordinary refinement, each grain separate and impossibly light, perfumed with bloomed saffron, and crowned with a golden, shattering tahdig crust that the cook claims as their prize.",
  cuisine: "Persian",
  culture: "Persian Iranian",
  category: "grains",

  tags: ["vegan", "gluten-free", "persian", "saffron", "tahdig", "rice"],
  difficulty: 3,
  activeTime: "20 min",
  totalTime: "1 hr 30 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 0, salty: 2, sour: 0, bitter: 0, umami: 0, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Basmati rice (best quality available)",            ratioValue: 400, defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_02", role: "Aromatic",   name: "Saffron threads (highest quality, loosely packed)", ratioValue: 0.5, defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_03", role: "Liquid",     name: "Boiling water (for blooming saffron)",             ratioValue: 60,  defaultUnit: "ml",  substitutions: [] },
    { ingId: "ing_04", role: "Seasoning",  name: "Fine salt (for soaking and parboiling water)",     ratioValue: 25,  defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_05", role: "Fat",        name: "Neutral oil or unsalted butter",                   ratioValue: 60,  defaultUnit: "ml",  substitutions: ["ghee for a richer tahdig"] },
    { ingId: "ing_06", role: "Dairy",      name: "Plain whole-milk yogurt (for tahdig binder)",      ratioValue: 60,  defaultUnit: "g",   substitutions: ["one egg yolk + 2 tbsp oil for a crispier crust", "thin potato slices for potato tahdig"] },
    { ingId: "ing_07", role: "Spice",      name: "Ground turmeric (optional, for golden color)",     ratioValue: 1,   defaultUnit: "g",   substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Hydrate",
      inputs: ["ing_01", "ing_04"],
      outputState: "soaked_rice",
      instructions: "Place the basmati rice in a large bowl. Dissolve 15 g of salt in 1 liter of cold water and pour over the rice — the water should be as salty as the sea; this salting firms the grain structure and prevents the rice from becoming mushy in later steps. Soak for a minimum of 30 minutes and ideally 1 hour. Soaking allows the grain to hydrate slowly and evenly so the parboiling step can cook the outside while the center remains firm. Drain and rinse gently with cold water.",
      visualCue: {
        primaryTarget: "Rice grains are uniformly swollen, chalk-white, and slightly elongated from the soak. The soaking water is cloudy from leached starch.",
        spectrum: [
          { state: "Underdone", description: "Grains are still glassy and translucent at the center — only the outer layer has hydrated.", action: "Soak for at least 30 more minutes. Under-soaked rice will take longer to parboil and may end up unevenly cooked." },
          { state: "Perfect",   description: "Grains are uniformly opaque white, slightly elongated, and have swollen noticeably. They are firm but have taken on water throughout.", action: "Drain and proceed to parboil within 10 minutes." },
          { state: "Overdone",  description: "Grains have soaked 3+ hours and are beginning to break when pinched.", action: "Drain immediately and reduce the parboiling time to 3-4 minutes." },
        ],
      },
      feelCue: "A soaked grain snapped between fingernails should break cleanly with a soft snap — not shattering like dry rice, not squashing wetly — confirming even hydration throughout.",
    },
    {
      nodeId: "step_2",
      action: "Bloom",
      inputs: ["ing_02", "ing_03"],
      outputState: "saffron_water",
      instructions: "Crush the saffron threads between fingertips or in a small mortar to a fine powder — whole threads release color and flavor incompletely. Place the saffron powder in a small glass or cup. Pour 60 ml of water that is just off the boil (not violently boiling — around 90°C) over the saffron. Stir once and cover the cup. Let steep for a minimum of 15 minutes. The water will turn a deep, glowing amber-orange and smell of hay, honey, and something metallic and floral. This bloomed saffron is used in two places: mixed into the tahdig, and drizzled over the finished rice.",
      visualCue: {
        primaryTarget: "A deeply concentrated, glowing amber-orange liquid with a rich, distinct floral-metallic aroma. The exhausted threads at the bottom are nearly colorless.",
        spectrum: [
          { state: "Underdone", description: "The water is pale yellow and the saffron threads are still bright red — they have not fully released their color or flavor.", action: "Wait at least 10 more minutes. Saffron cannot be rushed — the color compounds are slow to dissolve." },
          { state: "Perfect",   description: "Deep amber-orange, rich and saturated. Smells of saffron distinctly. Threads are pale gold or nearly white at the bottom.", action: "Divide: use half for the tahdig, reserve half for the final drizzle." },
          { state: "Overdone",  description: "The saffron water has gone slightly bitter from over-steeping with water that was too hot.", action: "Still usable but add less — the bitterness will be apparent at high concentration. Dilute with a tablespoon of water." },
        ],
      },
      feelCue: "Properly bloomed saffron water applied to the back of a hand should stain a vivid amber-orange that takes 30 seconds to even begin to fade — the color and the flavor are one; intense color means intense flavor.",
    },
    {
      nodeId: "step_3",
      action: "Boil",
      inputs: ["soaked_rice", "ing_04"],
      outputState: "parboiled_rice",
      instructions: "Bring a large pot of water to a vigorous rolling boil — use at least 2 liters of water for 400 g of rice; Persian rice demands space to move freely. Add the remaining salt (10 g). Add the drained rice and stir gently once. Boil uncovered for exactly 5-7 minutes. Test the rice by removing a grain and biting it in half: the outside should be fully cooked and soft, but a small white line should still be visible at the center — the grain is two-thirds cooked. This is the parboil stage. Drain immediately and run cold water over the rice for 15 seconds to stop cooking.",
      visualCue: {
        primaryTarget: "Drained rice grains are elongated, fully white on the outside, with a visible thread of uncooked white starch at the very center when bitten in half.",
        spectrum: [
          { state: "Underdone", description: "The grain center is large and chalky — more than half the grain is still uncooked.", action: "Return to the boiling water for 1-2 more minutes and test again. The outside must be fully cooked." },
          { state: "Perfect",   description: "Soft, fully cooked exterior with a thin, white, uncooked line at the center. The grain has lengthened significantly.", action: "Drain immediately and rinse with cold water. Do not let it sit in the pot." },
          { state: "Overdone",  description: "The grain is fully cooked all the way through — no white center visible. Grains may be starting to stick together.", action: "Drain and rinse immediately with cold water. Steam very gently for a shorter time to avoid total mushiness." },
        ],
      },
      feelCue: "Parboiled rice in the colander should feel almost dry and slightly firm when you run a hand through it — slippery from the starch, but each grain distinct and separate, not clumping.",
    },
    {
      nodeId: "step_4",
      action: "Set",
      inputs: ["ing_05", "ing_06", "parboiled_rice", "saffron_water", "ing_07"],
      outputState: "layered_pot",
      instructions: "Pour the oil into a wide, heavy-bottomed pot (non-stick or well-seasoned) and heat over medium heat. In a bowl, mix 3 large spoonfuls of parboiled rice with the yogurt, half the saffron water, and turmeric if using — this is the tahdig mixture. Spread it in a thin, even layer across the bottom of the hot oil. Listen: it should sizzle gently. Now pile the remaining rice on top in a pyramid shape — do not press down. Make 5-6 holes through the mound with the handle of a spoon to allow steam to circulate. Drizzle a thin stream of oil or melted butter over the pyramid.",
      visualCue: {
        primaryTarget: "A pyramid of loose rice grains rising above a thin, golden-saffron base layer. The sides of the pyramid look airy and the steam-hole channels are visible.",
        spectrum: [
          { state: "Underdone", description: "The tahdig mixture was spread in too thick a layer — over 1 cm. The oil was not hot enough when the mixture went in and it didn't sizzle.", action: "Proceed but expect a softer, less crispy tahdig. The heat was insufficient for initial crust formation." },
          { state: "Perfect",   description: "Thin, even tahdig layer that sizzled when it hit the oil. Rice mound is loose and airy, pyramid shape with clear steam channels. The pot smells of hot oil and saffron.", action: "Wrap the lid in a clean kitchen towel and cover the pot tightly." },
          { state: "Overdone",  description: "The tahdig is already browning aggressively and the oil is smoking before the lid goes on.", action: "Reduce heat immediately. The bottom will cook too fast without the top layers being ready." },
        ],
      },
      feelCue: "The saffron tahdig mixture should feel like a very loose, golden-yellow rice porridge as you spread it — just fluid enough to find its own level but thick enough to hold the grains together.",
    },
    {
      nodeId: "step_5",
      action: "Bake",
      inputs: ["layered_pot"],
      outputState: "finished_saffron_rice",
      instructions: "Wrap the pot lid tightly in a clean kitchen towel — the cloth absorbs condensation and prevents water droplets from falling back onto the rice, which would make it wet rather than fluffy. Place the lid on tightly. Cook over medium heat for 5 minutes (this starts the tahdig crisping), then reduce to the lowest possible heat and cook for 40-45 minutes without lifting the lid. To unmold: place the pot on a cold, damp cloth or a pot holder for 2 minutes — the thermal shock helps release the tahdig. Remove the lid, place a large flat platter firmly over the pot, and flip in one confident movement. The tahdig should slide out golden and intact onto the platter. Drizzle the remaining saffron water over the white rice.",
      visualCue: {
        primaryTarget: "The inverted rice is a white mountain with strands of golden saffron across the top, resting on a golden-brown, intact tahdig crust the color of autumn leaves.",
        spectrum: [
          { state: "Underdone", description: "The tahdig is pale and soft — it did not crisp, and it clings to the pot rather than releasing cleanly.", action: "Next time: ensure the oil was hot enough before the tahdig went in, and use medium heat for the first 8 minutes before reducing." },
          { state: "Perfect",   description: "The tahdig releases cleanly in one intact, golden-brown, shattering crust. The rice is white, fluffy, and fragrant with saffron. Individual grains are visible and distinct.", action: "Drizzle saffron water over the white rice and serve the tahdig pieces alongside as the prize." },
          { state: "Overdone",  description: "The tahdig is very dark brown, almost black, and smells sharp and burnt rather than golden and toasty.", action: "Serve the rice without the tahdig, leaving the burnt crust behind in the pot. Still an excellent rice." },
        ],
      },
      feelCue: "When you tap the bottom of an unmolded tahdig with a knuckle, it should ring with a hollow, glassy sound — like knocking on a ceramic tile — confirming the thin, crisp crust that is the hallmark of a perfect chelow.",
    },
  ],
};
