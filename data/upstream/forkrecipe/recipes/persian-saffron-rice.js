export default {
  repoId: "master_persian_saffron_rice_001",
  parentRepoId: null,
  slug: "persian-saffron-rice",
  author: "ForkRecipe Kitchen",

  title: "Persian Saffron Rice (Chelow)",
  description: "The crown jewel of Iranian cooking — long-grain basmati that has been soaked, parboiled, and then steamed over a low flame wrapped in a cloth to create a golden, shatteringly crisp crust called tahdig at the bottom of the pot while the rice above remains separate, elongated, and perfumed with saffron.",
  cuisine: "Persian",
  culture: "Iranian",
  category: "grains",

  tags: ["rice", "persian", "saffron", "tahdig", "chelow", "iranian", "basmati"],
  difficulty: 3,
  activeTime: "45 min",
  totalTime: "2 hr",
  ratioSystem: "parts",

  stars: 2456,
  forks: 198,
  contributors: 58,
  license: "CC-BY-SA",
  createdAt: "2024-10-05",
  updatedAt: "2025-04-30",

  flavorRadar: { sweet: 1, salty: 3, sour: 0, bitter: 0, umami: 1, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Starch",     name: "Extra-long basmati rice (aged preferred)",       ratioValue: 100, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_02", role: "Seasoning",  name: "Sea salt",                                       ratioValue: 3,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Fat",        name: "Unsalted butter",                                ratioValue: 10,  defaultUnit: "parts", substitutions: ["ghee (more traditional)"] },
    { ingId: "ing_04", role: "Fat",        name: "Neutral oil (for tahdig)",                       ratioValue: 8,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Aromatic",   name: "Saffron threads, bloomed in 3 tbsp hot water",  ratioValue: 0.5, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Liquid",     name: "Hot water (for blooming saffron)",               ratioValue: 5,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Structure",  name: "Lavash bread or thin flatbread (optional tahdig base)", ratioValue: 15, defaultUnit: "parts", substitutions: ["potato slices", "thick yogurt layer"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Soak",
      inputs: ["ing_01", "ing_02"],
      outputState: "soaked_rice",
      instructions: "Rinse the basmati rice in several changes of cold water until the water runs clear — this removes surface starch that would make the cooked grains clump. Add salt to cold water (about 1 tablespoon per 2 cups rice) and soak the rinsed rice for 30–60 minutes, up to overnight in the refrigerator. Soaking allows the grain to begin absorbing water, which ensures it cooks evenly all the way through during the rapid parboil and prevents the exterior from overcooking before the center is done.",
      visualCue: {
        primaryTarget: "Rice grains have visibly swollen and are now slightly opaque and plumper than dry. The soaking water is slightly milky from the surface starch that has released.",
        spectrum: [
          { state: "Underdone", description: "Rice has soaked less than 20 minutes. Grains are still slender and firm with no visible swelling. The soaking water is still nearly clear.", action: "Continue soaking — properly soaked rice is essential for the separate, elongated grain texture that defines Persian rice." },
          { state: "Perfect",   description: "Grains have visibly swollen — noticeably plumper and slightly translucent. Soaking water is milky-cloudy. Grains snap cleanly when one is pressed.", action: "Drain and proceed to parboiling." },
          { state: "Overdone",  description: "Rice has been soaking for many hours in warm water. Grains may have begun to break when pressed and look slightly ragged.", action: "Drain immediately and proceed. The parboiling step must be brief to compensate." },
        ],
      },
      feelCue: "Pick up a grain and press it between two fingernails — it should snap with slight resistance at the very center (not chalky-hard, not mushy-soft). This tells you the soaking has started hydration properly.",
    },
    {
      nodeId: "step_2",
      action: "Parboil",
      inputs: ["soaked_rice"],
      outputState: "parboiled_rice",
      instructions: "Bring a large pot of well-salted water to a vigorous boil — the water should taste pleasantly salty, like pasta water. Add the drained soaked rice and cook, stirring occasionally, for exactly 5–7 minutes. The rice is ready to drain when each grain has grown significantly in length and is just tender at the exterior but still has a firm, white, chalky core when bitten. The center should still have a snap. Drain immediately in a fine colander and rinse briefly with cool water to stop cooking.",
      visualCue: {
        primaryTarget: "Each grain has elongated significantly and the exterior is cooked but the center still shows a white, chalky line when a grain is cut in half. The grains are long, separate, and not clumping.",
        spectrum: [
          { state: "Underdone", description: "The grains haven't elongated much and the entire interior is chalky and raw. The grain resists sharply when bitten.", action: "Continue boiling 1–2 more minutes. Drain immediately when the center is just barely firm — it has more cooking ahead in the steam phase." },
          { state: "Perfect",   description: "Long, separate grains with just barely visible white at the center when bitten. The outer layer is cooked. They feel firm-tender, not mushy, not hard.", action: "Drain and rinse immediately. Do not delay — the residual heat will continue cooking." },
          { state: "Overdone",  description: "Grains are fully cooked throughout with no firm center. They may have split at the ends. They look bloated and the cooking water is very starchy.", action: "Drain immediately. The tahdig technique will still work but the grains may stick together more than ideal." },
        ],
      },
      feelCue: "Bite through a parboiled grain — it should feel like it has a thin, cooked outer layer giving way to a firm, chalky center that you can feel as resistance on your molars. That chalky center will finish cooking during the steam phase.",
    },
    {
      nodeId: "step_3",
      action: "Build tahdig",
      inputs: ["parboiled_rice", "ing_04", "ing_07"],
      outputState: "assembled_rice_pot",
      instructions: "In a wide, heavy-bottomed pot with a tight-fitting lid, heat the oil over medium heat. If using lavash, place a single layer over the oiled pot bottom, pressing to the edges. If using potato, layer thin slices over the base. Add 2 large spoonfuls of parboiled rice and spread to cover the lavash. Mound the remaining parboiled rice in a cone shape over the top — do not press or pack it. Create 5–6 holes down through the rice mound with the handle of a wooden spoon to allow steam to rise from below. Wrap the pot lid tightly in a clean kitchen cloth (this absorbs steam and prevents condensation dripping back onto the rice).",
      visualCue: {
        primaryTarget: "A pyramid of separate, pale rice grains mounded in the pot. The lavash or potato layer just visible at the edges around the rice base. Steam holes visible through the mound.",
        spectrum: [
          { state: "Underdone", description: "Rice has been packed flat rather than mounded. No steam holes. The lid cloth has been omitted.", action: "The cone shape and steam holes ensure even steam circulation and prevent the top from drying out before the bottom crisps." },
          { state: "Perfect",   description: "A proud cone of rice with 5–6 steam channels. Lavash visible at the edges. Lid wrapped and tight.", action: "Cook on medium-high for 5 minutes to start the tahdig, then reduce to absolute minimum heat for 45 minutes." },
          { state: "Overdone",  description: "Too much butter was added to the bottom and the rice is sitting in a pool of oil rather than a thin, even coating.", action: "Pour off the excess — too much fat makes the tahdig greasy and dense rather than crisp." },
        ],
      },
      feelCue: "When you place your hand near the side of the pot after 10 minutes of steaming, you should feel steady, even warmth — not intense heat. If the pot is very hot on the side, the heat is too high and the tahdig may be burning rather than crisping.",
    },
    {
      nodeId: "step_4",
      action: "Steam and unmold",
      inputs: ["assembled_rice_pot", "ing_03", "ing_05"],
      outputState: "finished_persian_rice",
      instructions: "After 5 minutes on medium-high, reduce to absolute minimum heat (use a heat diffuser if available). Steam for 45 minutes. While the rice steams, bloom the saffron in hot water for 5 minutes, then mix with 2 tablespoons of melted butter. At the 45-minute mark, remove the lid and drizzle the saffron butter over 3–4 spoonfuls of rice in a separate bowl — stir to coat, then return this golden-orange rice to the top of the pot as a garnish. Replace lid for 5 more minutes. To serve: invert the pot onto a large round platter in one decisive motion. The tahdig should release with a satisfying thud.",
      visualCue: {
        primaryTarget: "When inverted: a golden-amber crust (tahdig) on top surrounded by the white rice. The tahdig should be uniformly golden-amber and crisp-looking, not pale, not burnt. The saffron-tinted rice provides deep orange streaks.",
        spectrum: [
          { state: "Underdone", description: "The tahdig is pale gold or even white. It hasn't crisped fully and may have stuck to the pot. The rice looks steamed but the base hasn't developed color.", action: "Return pot right-side-up and cook on medium for 10 more minutes. Check by lifting the edge with a thin spatula." },
          { state: "Perfect",   description: "When inverted: a beautiful golden-amber crust that releases cleanly. The white rice is fluffy and separate. Deep orange saffron rice provides color contrast. The kitchen smells of saffron, butter, and toasted rice.", action: "Serve immediately — the contrast of crispy tahdig and fluffy rice is best within 10 minutes of unmolding." },
          { state: "Overdone",  description: "The tahdig is very dark brown or black in the center. A burnt smell came from the pot during steaming.", action: "Scoop off the burnt layer — the rice above it is usually unaffected. The rest of the tahdig around the edges may still be perfectly golden and crisp." },
        ],
      },
      feelCue: "The moment the pot hits the platter during inversion, you should hear a hollow thud and feel the weight shift as the rice falls away from the bottom. Lift the pot slowly — if the tahdig is releasing cleanly, you'll hear a soft, crispy sound as the crust separates from the metal.",
    },
  ],
};
