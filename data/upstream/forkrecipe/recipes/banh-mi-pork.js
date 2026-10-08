export default {
  repoId: "master_vietnamese_banh_mi_pork_001",
  parentRepoId: null,
  slug: "banh-mi-pork",
  author: "ForkRecipe Kitchen",

  title: "Bánh Mì Caramelized Pork",
  description: "Thin-sliced pork belly lacquered in fish-sauce caramel until the edges blacken and crisp, perfuming the kitchen with burnt sugar and soy — the kind of filling that makes a humble baguette taste like a destination.",
  cuisine: "Vietnamese",
  culture: "Saigon",
  category: "proteins",

  tags: ["vietnamese", "pork", "sandwich", "caramel", "banh-mi"],
  difficulty: 2,
  activeTime: "25 min",
  totalTime: "1 hr",
  ratioSystem: "parts",

  stars: 1842,
  forks: 203,
  contributors: 18,
  license: "CC-BY-SA",
  createdAt: "2024-03-15",
  updatedAt: "2025-11-02",

  flavorRadar: { sweet: 3, salty: 4, sour: 2, bitter: 0, umami: 4, heat: 2 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Pork belly or pork shoulder, thinly sliced (5mm)", ratioValue: 100, defaultUnit: "parts", substitutions: ["chicken thigh", "tofu"] },
    { ingId: "ing_02", role: "Sweetener", name: "Granulated sugar (for caramel)",                    ratioValue: 8,   defaultUnit: "parts", substitutions: ["palm sugar", "coconut sugar"] },
    { ingId: "ing_03", role: "Seasoning", name: "Fish sauce (Phu Quoc or Tiparos)",                  ratioValue: 10,  defaultUnit: "parts", substitutions: ["soy sauce + pinch MSG"] },
    { ingId: "ing_04", role: "Allium",    name: "Shallots, thinly sliced",                           ratioValue: 15,  defaultUnit: "parts", substitutions: ["yellow onion"] },
    { ingId: "ing_05", role: "Aromatic",  name: "Lemongrass, bruised and minced (inner stalk only)", ratioValue: 6,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Spice",     name: "Black pepper, coarsely cracked",                    ratioValue: 1,   defaultUnit: "parts", substitutions: ["white pepper"] },
    { ingId: "ing_07", role: "Fat",       name: "Neutral oil (vegetable or sunflower)",               ratioValue: 5,   defaultUnit: "parts", substitutions: ["lard"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Marinate",
      inputs: ["ing_01", "ing_03", "ing_04", "ing_05", "ing_06"],
      outputState: "marinated_pork",
      instructions: "Combine sliced pork with fish sauce, shallots, lemongrass, and black pepper. Toss to coat every surface thoroughly. Marinate at room temperature for 30 minutes, or refrigerate up to 4 hours. The fish sauce begins drawing moisture out of the meat, concentrating the brine.",
      visualCue: {
        primaryTarget: "Pork slices are evenly coated in a glossy amber marinade; shallot and lemongrass cling to each piece.",
        spectrum: [
          { state: "Underdone", description: "Marinade pools at the bottom of the bowl; pork surfaces still look dry and raw.", action: "Toss again and let sit another 10 minutes." },
          { state: "Perfect",   description: "Each slice is uniformly coated and slightly firmed from the salt draw. The liquid has thickened around the edges.", action: "Proceed to the caramel step." },
          { state: "Overdone",  description: "Pork has been sitting in fish sauce for over 6 hours; the protein is beginning to denature and will be mushy when cooked.", action: "Cook immediately — texture will be slightly softer but flavor is intact." },
        ],
      },
      feelCue: "The pork should feel slightly tacky when you pick up a slice — the fish sauce creates a light brine cure on the surface that will help the caramel adhere.",
    },
    {
      nodeId: "step_2",
      action: "Cook caramel",
      inputs: ["ing_02", "ing_07"],
      outputState: "amber_caramel",
      instructions: "In a wide heavy skillet or wok over medium heat, add oil then sugar in an even layer. Do not stir — let it melt and color. When the edges turn amber, gently swirl the pan. Pull from heat at a deep amber that smells like butterscotch, not burnt coffee. Work fast; caramel moves through its stages in seconds.",
      visualCue: {
        primaryTarget: "Liquid sugar is a deep amber-mahogany with no raw white sugar remaining; fragrance is rich butterscotch with a slight smoke.",
        spectrum: [
          { state: "Underdone", description: "Sugar is pale gold and still smells sweet; it will produce an insipid, overly sweet coating on the pork.", action: "Continue cooking, swirling the pan gently — another 30-60 seconds." },
          { state: "Perfect",   description: "Deep amber, just past the color of aged whisky. The smell shifts from candy to butterscotch with a faint bitter edge. Thin wisps of smoke may appear.", action: "Immediately add the pork." },
          { state: "Overdone",  description: "Near-black with acrid, harsh smoke. The smell is burnt and will make the dish bitter.", action: "Discard and start over. Burnt caramel cannot be saved." },
        ],
      },
      feelCue: "The moment the caramel smells like it could become bitter, it is perfect — that tension between sweet and smoke is the whole point of Vietnamese caramel.",
    },
    {
      nodeId: "step_3",
      action: "Sear",
      inputs: ["marinated_pork", "amber_caramel"],
      outputState: "caramelized_pork",
      instructions: "Add marinated pork to the caramel in a single layer, working quickly. The mixture will spit and bubble violently — step back. Do not stir for the first 90 seconds so a crust can form. Then toss and cook over medium-high for 4-5 minutes total, until edges char and sauce clings like lacquer.",
      visualCue: {
        primaryTarget: "Pork edges are charred at the very tips, bodies are deep mahogany, sauce has reduced to a thick glaze coating every surface.",
        spectrum: [
          { state: "Underdone", description: "Pork is still pale tan, sauce is loose and watery — the sugars haven't caramelized onto the meat.", action: "Increase heat to high and cook uncovered 2 more minutes, stirring less frequently." },
          { state: "Perfect",   description: "Edges black-tipped, flesh dark mahogany. Sauce is nearly dry, clinging to each slice in a thick, shiny lacquer. Smoke wisps from the pan.", action: "Remove from heat immediately." },
          { state: "Overdone",  description: "Everything is charcoal-black and the pan has a thick burnt layer. The pork is dry and bitter throughout.", action: "Salvage the interior pieces; scrape off heavily burnt bits. Add a splash of water and scrape the pan before serving." },
        ],
      },
      feelCue: "The sound should shift from violent bubbling to a tight, rapid crackling — that crackle means the water has cooked off and the sugars are frying directly on the pork.",
    },
    {
      nodeId: "step_4",
      action: "Deglaze and rest",
      inputs: ["caramelized_pork"],
      outputState: "finished_banh_mi_pork",
      instructions: "Remove from heat. Add 2 tablespoons of water to deglaze any stuck caramel from the pan and toss the pork to coat in the loose sauce. Let rest in the pan for 2 minutes — the residual heat melds the glaze and the resting reduces the risk of burning your mouth on the caramelized edges.",
      visualCue: {
        primaryTarget: "Each pork slice is coated in a glossy, tight lacquer; the pan has a thin layer of syrupy juices, not dry char.",
        spectrum: [
          { state: "Underdone", description: "Sauce is still very watery after deglazing — the caramel hasn't properly adhered to the meat.", action: "Return to heat for 1 minute, stirring constantly until sauce tightens again." },
          { state: "Perfect",   description: "Pork is lacquered, glossy, and smells of caramel and fish sauce. The pan sauce is thick enough to coat a spoon.", action: "Pile onto sliced baguette with pickled daikon, cucumber, cilantro, and chilies." },
          { state: "Overdone",  description: "Deglaze added too much water; pork is swimming in diluted sauce and the lacquer has loosened.", action: "Return to high heat for 2-3 minutes uncovered to re-reduce the sauce." },
        ],
      },
      feelCue: "Pick up a piece — it should feel heavy and dense with glaze, the edges slightly rigid from the caramel crust while the center remains yielding.",
    },
  ],
};
