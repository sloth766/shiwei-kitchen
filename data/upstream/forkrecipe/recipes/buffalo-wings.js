export default {
  repoId: "master_american_buffalo_wings_001",
  parentRepoId: null,
  slug: "buffalo-wings",
  author: "ForkRecipe Kitchen",

  title: "Buffalo Wings",
  description: "Crispy-fried chicken wings, each one lacquered in a glossy, brick-red sauce that is simultaneously molten butter and eye-watering hot sauce — the kind of wings that require paper towels, cold beer, and no apology.",
  cuisine: "American",
  culture: "Buffalo, New York",
  category: "proteins",

  tags: ["american", "chicken", "wings", "spicy", "hot-sauce"],
  difficulty: 2,
  activeTime: "25 min",
  totalTime: "1 hr",
  ratioSystem: "parts",

  stars: 2947,
  forks: 318,
  contributors: 27,
  license: "CC-BY-SA",
  createdAt: "2024-05-10",
  updatedAt: "2025-08-14",

  flavorRadar: { sweet: 1, salty: 4, sour: 2, bitter: 0, umami: 3, heat: 4 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Chicken wings, split into flats and drumettes", ratioValue: 100, defaultUnit: "parts", substitutions: ["whole wings", "chicken thigh pieces"] },
    { ingId: "ing_02", role: "Structure", name: "Baking powder (aluminum-free)",                 ratioValue: 1.5, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Seasoning", name: "Kosher salt",                                   ratioValue: 1,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Liquid",    name: "Frank's RedHot Original hot sauce",             ratioValue: 20,  defaultUnit: "parts", substitutions: ["Crystal hot sauce", "Tabasco (use less)"] },
    { ingId: "ing_05", role: "Fat",       name: "Unsalted butter",                               ratioValue: 10,  defaultUnit: "parts", substitutions: ["clarified butter", "vegan butter"] },
    { ingId: "ing_06", role: "Seasoning", name: "Garlic powder",                                 ratioValue: 0.5, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Garnish",   name: "Celery sticks and blue cheese dressing (for serving)", ratioValue: 15, defaultUnit: "parts", substitutions: ["ranch dressing", "carrot sticks"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Dry and season",
      inputs: ["ing_01", "ing_02", "ing_03"],
      outputState: "seasoned_wings",
      instructions: "Pat the wings completely dry with paper towels — press firmly on all surfaces. In a large bowl, toss the dry wings with kosher salt and baking powder until evenly coated. The baking powder raises surface pH, which accelerates browning and draws moisture to the surface over time. Spread in a single layer on a wire rack over a sheet pan.",
      visualCue: {
        primaryTarget: "Wings are completely dry and coated in a thin, chalky white film of baking powder and salt. No moisture sheen on the skin.",
        spectrum: [
          { state: "Underdone", description: "Skin still looks shiny and damp. Baking powder hasn't coated evenly — patches of bare, wet skin.", action: "Pat dry again more aggressively, then toss with another light dusting of baking powder. Wet skin will steam, not crisp." },
          { state: "Perfect",   description: "Skin is matte and chalky-looking. All surfaces evenly coated. Wings look dry and slightly dusty.", action: "Refrigerate uncovered for 30 minutes or up to 24 hours for best results." },
          { state: "Overdone",  description: "Wings have been refrigerating so long that the baking powder has pulled moisture out visibly, and the skin looks almost leathery.", action: "Proceed to frying. Over-dried wings can actually crisp more quickly — watch them carefully and reduce cook time slightly." },
        ],
      },
      feelCue: "Pick up a wing and hold it — the skin should feel almost papery and slightly rough from the baking powder coating, never slick or tacky.",
    },
    {
      nodeId: "step_2",
      action: "Fry until crispy",
      inputs: ["seasoned_wings"],
      outputState: "fried_wings",
      instructions: "Heat oil in a deep pot or fryer to 190°C. Fry the wings in batches — do not crowd the pot — for 10–12 minutes, turning occasionally, until deep golden-brown and fully cooked through. Between batches, let the oil return to 190°C. Alternatively, bake at 220°C on a wire rack for 40–45 minutes, flipping halfway.",
      visualCue: {
        primaryTarget: "Wings are deep golden-brown all over, with taut, blistered, crispy skin. No soft or pale patches. An instant-read thermometer reads 74°C at the thickest point.",
        spectrum: [
          { state: "Underdone", description: "Skin is pale gold or blond, with some soft patches. The baking powder coating is visible and powdery-white in places. Skin bends without cracking.", action: "Return to the fryer or oven. Pale wings mean the skin has not rendered enough fat yet — they will not become crispy in the sauce." },
          { state: "Perfect",   description: "Deep, even golden-brown with blistered, taut skin. Skin shatters when bitten. Fat has fully rendered. Internal temp is 74°C or above.", action: "Drain briefly on a rack, then sauce immediately while still hot." },
          { state: "Overdone",  description: "Skin is dark brown to almost black. Wings smell slightly bitter. The exterior is very hard.", action: "Sauce generously — the butter-hot sauce mixture will hydrate the exterior. They may still be delicious despite the color." },
        ],
      },
      feelCue: "When you lift a wing from the fryer, the skin should sound like crumpling cellophane when you squeeze it gently — a dry, crackling rustle. If it makes a wet, soft sound, they need more time.",
    },
    {
      nodeId: "step_3",
      action: "Make buffalo sauce",
      inputs: ["ing_04", "ing_05", "ing_06"],
      outputState: "buffalo_sauce",
      instructions: "In a small saucepan over low heat, melt the butter. Remove from heat and whisk in the hot sauce and garlic powder until fully combined and glossy. The sauce should be warm but not boiling — boiling will break the emulsion, leaving a greasy, separated sauce. The ratio is roughly 2 parts hot sauce to 1 part butter by volume.",
      visualCue: {
        primaryTarget: "Sauce is opaque, glossy, and uniformly brick-orange with no visible pools of butter floating on the surface. It coats a spoon in a thin, even film.",
        spectrum: [
          { state: "Underdone", description: "Butter is still partially solid, with white lumps visible in the sauce. Sauce appears streaky — alternating orange and yellow.", action: "Whisk vigorously and warm briefly over low heat. Cold butter will not incorporate fully." },
          { state: "Perfect",   description: "Uniform, glossy, opaque orange sauce. Butter and hot sauce are fully emulsified. A spoon dragged through it leaves a clean trail that fills in slowly.", action: "Toss the wings immediately while both are hot." },
          { state: "Overdone",  description: "Sauce is boiling and separated — red hot sauce floating on top of yellow pools of clarified butter. Sauce smells harsh and vinegary.", action: "Remove from heat, let cool slightly, then whisk vigorously. A splash of cold butter can help re-emulsify. Do not re-boil." },
        ],
      },
      feelCue: "Dip a fingertip in the sauce — it should coat your finger in a thin, glossy film that clings evenly. If it runs off like water or pools in fat droplets, the emulsion needs more whisking.",
    },
    {
      nodeId: "step_4",
      action: "Toss and glaze",
      inputs: ["fried_wings", "buffalo_sauce"],
      outputState: "glazed_wings",
      instructions: "Transfer hot wings to a large bowl. Pour the warm buffalo sauce over them and toss vigorously until every surface is evenly coated. Work quickly — the heat from the wings will keep the sauce fluid and help it adhere. If the sauce starts to congeal, add a splash of hot sauce and toss again.",
      visualCue: {
        primaryTarget: "Every wing surface is lacquered in a glossy, even coating of brick-red sauce. No dry patches. No pooling sauce at the bottom of the bowl.",
        spectrum: [
          { state: "Underdone", description: "Some wings are partially coated. Dry, pale patches of skin visible. Sauce is pooling in the bowl rather than clinging.", action: "Toss more vigorously, tilting the bowl to redistribute sauce. Add a tablespoon more melted butter to help it adhere if needed." },
          { state: "Perfect",   description: "All wings uniformly coated in glossy, brick-red sauce. The crispy skin is still audible beneath the glaze. Wings smell of cayenne, vinegar, and butter.", action: "Plate immediately and serve with celery and blue cheese." },
          { state: "Overdone",  description: "Wings have been sitting in the sauce and the crispy skin has fully softened. Sauce has absorbed into the exterior.", action: "Serve immediately — delayed wings are a fact of life in restaurants. Next time, sauce in small batches only as you plate." },
        ],
      },
      feelCue: "Pick up a sauced wing — it should feel slightly slick and warm, with a faint tackiness from the sauce. When you bite through the skin, you should still hear a faint crunch beneath the sauce glaze.",
    },
    {
      nodeId: "step_5",
      action: "Plate and serve",
      inputs: ["glazed_wings", "ing_07"],
      outputState: "finished_buffalo_wings",
      instructions: "Arrange the glazed wings on a platter. Serve immediately with celery sticks and a generous pool of blue cheese dressing for dipping. Do not cover — the steam will destroy any remaining crispness. These are best eaten within 5 minutes of saucing.",
      visualCue: {
        primaryTarget: "Wings are glistening and deeply red-orange. Steam rises gently. Celery sticks and blue cheese dressing are plated alongside.",
        spectrum: [
          { state: "Underdone", description: "Wings are sitting cold and the sauce has congealed into a dull, matte coating. Celery and dressing not yet plated.", action: "If wings have gone cold, flash them in a 200°C oven for 3 minutes, then re-sauce with warm buffalo sauce." },
          { state: "Perfect",   description: "Wings are hot, glossy, and steam-fresh. Blue cheese dressing is cool against the heat. The room smells of cayenne and butter.", action: "Eat immediately. Buffalo wings are a singular moment." },
          { state: "Overdone",  description: "Wings have been sitting too long. Sauce has soaked in completely. Skin is soft. They're still flavorful but no longer the dish.", action: "Accept it. Reheat in a hot oven without more sauce, then re-glaze briefly for the best salvage." },
        ],
      },
      feelCue: "The first wing you pick up should be almost too hot to hold comfortably, with sauce that immediately transfers to your fingers — that's how you know the timing is right.",
    },
  ],
};
