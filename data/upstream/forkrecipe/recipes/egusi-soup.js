// Egusi Soup — Nigerian melon seed stew, foundational to West African cooking.
// Author: SpiceTrader

export default {
  repoId: "master_nigerian_egusi_soup_001",
  parentRepoId: null,
  slug: "egusi-soup",
  author: "ForkRecipe Kitchen",

  title: "Egusi Soup",
  description: "Ground melon seeds fry in palm oil until they smell of toasted nuts, then melt into a thick, savory stew threaded with bitter greens and deepened by a layered umami base of stock fish, crayfish, and whatever meat fills the house — a soup that is simultaneously a stew, a sauce, and a meal.",
  cuisine: "Nigerian",
  culture: "Nigerian",
  category: "proteins",

  tags: ["nigerian", "melon-seeds", "greens", "palm-oil", "stew"],
  difficulty: 3,
  activeTime: "40 min",
  totalTime: "1 hr",
  ratioSystem: "parts",

  stars: 2100,
  forks: 180,
  contributors: 22,
  license: "CC-BY-SA",
  createdAt: "2024-06-03",
  updatedAt: "2025-08-14",

  flavorRadar: { sweet: 0, salty: 3, sour: 0, bitter: 1, umami: 4, heat: 3 },

  ingredients: [
    { ingId: "ing_01", role: "Structure", name: "Ground egusi (melon seeds), coarsely blended", ratioValue: 5,  defaultUnit: "parts", substitutions: ["ground pumpkin seeds — similar fat profile, milder flavor"] },
    { ingId: "ing_02", role: "Fat",       name: "Red palm oil",                                  ratioValue: 3,  defaultUnit: "parts", substitutions: ["vegetable oil (loses color and flavor authenticity)"] },
    { ingId: "ing_03", role: "Protein",   name: "Assorted meats or fish (beef, shaki, stockfish)", ratioValue: 6, defaultUnit: "parts", substitutions: ["chicken", "smoked fish alone"] },
    { ingId: "ing_04", role: "Umami",     name: "Ground crayfish (dried smoked shrimp)",          ratioValue: 1,  defaultUnit: "parts", substitutions: ["shrimp paste (use 1/3 the quantity)"] },
    { ingId: "ing_05", role: "Aromatic",  name: "Tomatoes and scotch bonnet peppers, blended",   ratioValue: 4,  defaultUnit: "parts", substitutions: ["canned tomatoes with habanero"] },
    { ingId: "ing_06", role: "Herb",      name: "Bitter leaf or spinach, washed and shredded",   ratioValue: 3,  defaultUnit: "parts", substitutions: ["kale", "frozen spinach"] },
    { ingId: "ing_07", role: "Seasoning", name: "Salt and seasoning cubes",                      ratioValue: 0.5, defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Cook meat base",
      inputs: ["ing_03", "ing_07"],
      outputState: "cooked_meat_stock",
      instructions: "Season all meats with salt and seasoning cubes. If using stockfish, rehydrate it in warm water for 30 minutes beforehand. Cook the assorted meats in a pot with a small amount of water over medium heat until tender, about 20–30 minutes depending on the cuts. This creates both cooked meat and a concentrated, savory stock that will form the liquid base of the soup. Reserve the cooking stock.",
      visualCue: {
        primaryTarget: "Meat is tender and pulls apart with minimal resistance. Stock is reduced to a rich, cloudy, deeply colored liquid with visible fat droplets on the surface.",
        spectrum: [
          { state: "Underdone", description: "Meat is still firm and chewy. Stock is pale and thin. Tough proteins will not soften further once added to the egusi base.", action: "Continue simmering with a lid on until a fork slides in and twists without resistance." },
          { state: "Perfect",   description: "Meat is tender throughout. Stock is richly savory and has good body — a small amount gels slightly when dropped on a cold surface.", action: "Remove from heat, set aside. Proceed to frying egusi." },
          { state: "Overdone",  description: "Meat is falling apart into strands. Stock has reduced too much and is very dark and concentrated.", action: "Remove meat immediately. Add water to the concentrated stock to restore volume before adding to egusi." },
        ],
      },
      feelCue: "Squeeze a piece of cooked beef between your fingers — it should compress fully and feel yielding throughout, not springy at the center. If it springs back, it needs more time.",
    },
    {
      nodeId: "step_2",
      action: "Fry egusi in palm oil",
      inputs: ["ing_01", "ing_02", "ing_05"],
      outputState: "fried_egusi_paste",
      instructions: "Heat the palm oil in a large, wide pot over medium heat until it liquefies and shimmers — do not let it smoke. Add the blended tomato and pepper purée and fry for 10 minutes, stirring, until the raw tomato smell is gone and the oil begins to separate again. Add the ground egusi in an even layer over the tomato base. Do not stir immediately — let it fry and set for 3–4 minutes. Then stir to combine and continue frying, stirring regularly, for 8–10 minutes until the egusi smells nutty and has turned from pale yellow to a deeper golden color.",
      visualCue: {
        primaryTarget: "Egusi has changed from pale, dry crumbles to a cohesive, golden-toasted mass that holds together when pressed with the spoon. The mixture smells of roasted nuts and spiced tomato.",
        spectrum: [
          { state: "Underdone", description: "Egusi is still pale yellow and crumbly with a raw, slightly bitter nut flavor. The mixture is dry and floury in texture.", action: "Continue frying and stirring. Raw egusi makes the soup gritty and bitter — this step is non-negotiable." },
          { state: "Perfect",   description: "Egusi is golden-toasted, cohesive, and smells of warm, toasted melon seeds and smoky tomato. The palm oil is visibly deep orange-red, separating at the edges.", action: "Add the crayfish, cooked meat, and meat stock. Stir and simmer." },
          { state: "Overdone",  description: "Egusi is dark brown with an acrid, bitter nut smell. Small black spots visible. The palm oil is smoking.", action: "Add the meat stock immediately to stop the cooking. The egusi will taste bitter but the soup can still be saved with extra seasoning and crayfish." },
        ],
      },
      feelCue: "Press a small amount of the egusi mixture between your fingers — it should feel like warm, slightly greasy almond meal, holding its shape briefly before crumbling. If it's powdery and dry, it hasn't absorbed enough fat yet.",
    },
    {
      nodeId: "step_3",
      action: "Simmer stew",
      inputs: ["fried_egusi_paste", "ing_04", "cooked_meat_stock"],
      outputState: "simmered_egusi",
      instructions: "Add the ground crayfish to the egusi mixture, stirring well. Add the cooked meats and pour in enough reserved meat stock to bring the soup to your desired consistency — egusi soup should be thick, not watery. Stir thoroughly to combine all elements. Bring to a gentle simmer and cook, stirring occasionally, for 10–12 minutes. The egusi will absorb the liquid and swell slightly, becoming rich and thick. Taste and adjust salt and seasoning.",
      visualCue: {
        primaryTarget: "Soup is thick enough that a spoon dragged across the surface leaves a trail that fills in slowly over 3–4 seconds. Deep orange-red with visible egusi, meat, and crayfish throughout.",
        spectrum: [
          { state: "Underdone", description: "Soup is still thin and watery with separate pools of oil visible on the surface. The egusi hasn't fully absorbed the liquid yet.", action: "Continue simmering uncovered, stirring every few minutes. The soup will thicken significantly as the egusi continues to hydrate and cook." },
          { state: "Perfect",   description: "Thick, cohesive stew that moves in one mass when the pot is tilted. Deeply savory and spiced. The egusi has fully melded with the stock into a rich, gravy-like consistency.", action: "Add the green leaves for the final step." },
          { state: "Overdone",  description: "Soup has become too thick and is sticking to the bottom with every stir, beginning to scorch.", action: "Add a splash of water or stock, reduce heat to the lowest setting, and stir continuously for 1 minute." },
        ],
      },
      feelCue: "The aroma should be deeply savory — roasted nuts, smoky crayfish, and warm pepper. Taste a small spoonful: the flavor should be rich and layered, not one-dimensional hot or one-dimensionally salty.",
    },
    {
      nodeId: "step_4",
      action: "Finish with greens",
      inputs: ["simmered_egusi", "ing_06"],
      outputState: "finished_egusi_soup",
      instructions: "Add the shredded bitter leaf or spinach to the pot and stir to combine. Cook for 3–5 minutes for spinach or up to 8 minutes for bitter leaf, which benefits from slightly longer cooking to mellow its edge. The greens should remain vibrant, wilted but not dull. Do a final seasoning check: the soup should be assertively salty (it is served over starchy pounded yam or fufu, which need well-seasoned sauces). Serve in bowls with pounded yam or eba.",
      visualCue: {
        primaryTarget: "Greens are wilted but vivid green, distributed throughout the thick orange-red stew. The pot looks like stained glass — warm red with bright green threads.",
        spectrum: [
          { state: "Underdone", description: "Greens are still raw-looking, bright and stiff, sitting on top rather than integrated. Raw bitter leaf has a harsh, medicinal edge.", action: "Stir and cover for 3 more minutes. The steam will help wilt the greens more evenly." },
          { state: "Perfect",   description: "Greens are fully wilted and uniformly distributed, retaining vibrant color. The soup moves as one thick, cohesive mass. Taste is balanced: savory, spiced, with a slight vegetal bitterness.", action: "Serve hot over pounded yam." },
          { state: "Overdone",  description: "Greens have turned khaki-olive and lost their color. They have an overcooked, slightly sulfurous smell. The soup looks dull.", action: "Serve immediately. For future batches, add greens in the last 3 minutes only." },
        ],
      },
      feelCue: "Lift a spoonful of the finished soup and watch how it falls back into the pot — a perfect egusi soup slides off in thick, slow sheets rather than dripping or pouring, coating the spoon generously with every lift.",
    },
  ],
};
