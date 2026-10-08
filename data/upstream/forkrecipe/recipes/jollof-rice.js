export default {
  repoId: "master_west_african_jollof_rice_001",
  parentRepoId: null,
  slug: "jollof-rice",
  author: "ForkRecipe Kitchen",

  title: "Party Jollof Rice",
  description: "West Africa's most celebrated dish — long-grain rice cooked directly in a vivid tomato, pepper, and scotch bonnet base until each grain is stained deep red and infused with the smoky, irreplaceable flavor of the party pot.",
  cuisine: "West African",
  culture: "Nigerian/Ghanaian",
  category: "grains",

  tags: ["gluten-free", "west-african", "rice", "tomato", "one-pot"],
  difficulty: 2,
  activeTime: "30 min",
  totalTime: "1 hr 15 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 2, salty: 2, sour: 1, bitter: 0, umami: 3, heat: 2 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Long-grain parboiled rice",          ratioValue: 400, defaultUnit: "g",   substitutions: ["jasmine rice (reduce cook time by 5 min)"] },
    { ingId: "ing_02", role: "Liquid",     name: "Canned whole peeled tomatoes",       ratioValue: 400, defaultUnit: "g",   substitutions: ["4 large fresh plum tomatoes, blanched and peeled"] },
    { ingId: "ing_03", role: "Aromatic",   name: "Red bell peppers",                   ratioValue: 200, defaultUnit: "g",   substitutions: ["pimento peppers"] },
    { ingId: "ing_04", role: "Heat",       name: "Scotch bonnet pepper",               ratioValue: 1,   defaultUnit: "whole", substitutions: ["habanero pepper", "½ tsp cayenne if unavailable"] },
    { ingId: "ing_05", role: "Allium",     name: "White onion (roughly chopped)",      ratioValue: 200, defaultUnit: "g",   substitutions: ["yellow onion"] },
    { ingId: "ing_06", role: "Allium",     name: "Garlic cloves",                      ratioValue: 4,   defaultUnit: "cloves", substitutions: [] },
    { ingId: "ing_07", role: "Aromatic",   name: "Fresh ginger (peeled, roughly chopped)", ratioValue: 15, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_08", role: "Umami",      name: "Tomato paste",                       ratioValue: 60,  defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_09", role: "Liquid",     name: "Chicken or vegetable stock",         ratioValue: 500, defaultUnit: "ml",  substitutions: ["water + 1 stock cube"] },
    { ingId: "ing_10", role: "Aromatic",   name: "Bay leaves",                         ratioValue: 2,   defaultUnit: "leaves", substitutions: [] },
    { ingId: "ing_11", role: "Spice",      name: "Curry powder",                       ratioValue: 5,   defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_12", role: "Herb",       name: "Dried thyme",                        ratioValue: 3,   defaultUnit: "g",   substitutions: ["fresh thyme (double the quantity)"] },
    { ingId: "ing_13", role: "Fat",        name: "Neutral oil (groundnut or sunflower)", ratioValue: 60, defaultUnit: "ml",  substitutions: ["vegetable oil"] },
    { ingId: "ing_14", role: "Fat",        name: "Unsalted butter",                    ratioValue: 20,  defaultUnit: "g",   substitutions: ["more oil for vegan version"] },
    { ingId: "ing_15", role: "Seasoning",  name: "Fine salt",                          ratioValue: 8,   defaultUnit: "g",   substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Blend",
      inputs: ["ing_02", "ing_03", "ing_04", "ing_05", "ing_06", "ing_07"],
      outputState: "tomato_pepper_puree",
      instructions: "Combine the canned tomatoes, red bell peppers, scotch bonnet, half the onion, garlic, and ginger in a blender. Blitz until completely smooth with no visible chunks — you want a liquid slurry, not a chunky salsa. The color will be a vivid brick-orange at this stage. Set aside; the puree will release a lot of steam when it hits the hot oil, so have the pot ready before you blend.",
      visualCue: {
        primaryTarget: "A smooth, vibrantly colored liquid ranging from deep orange to brick red, with a consistency slightly thicker than passata.",
        spectrum: [
          { state: "Underdone", description: "Visible chunks of pepper or tomato skin are floating in the mix.", action: "Blend for another 30 seconds and check again; whole pieces will cause uneven cooking." },
          { state: "Perfect",   description: "Completely smooth, pourable, a uniform deep orange-red with no solids. Pours cleanly off a spoon.", action: "Proceed to fry the paste immediately." },
          { state: "Overdone",  description: "The blender has been running so long it has warmed the mixture noticeably.", action: "This is fine — proceed. The warming has no meaningful effect on the outcome." },
        ],
      },
      feelCue: "The blended base should feel liquid and silky when rubbed between fingertips — any grittiness means the skin or seeds haven't broken down yet.",
    },
    {
      nodeId: "step_2",
      action: "Fry",
      inputs: ["ing_13", "ing_05", "ing_08", "tomato_pepper_puree", "ing_10", "ing_11", "ing_12", "ing_15"],
      outputState: "fried_tomato_base",
      instructions: "Heat the oil in a heavy-bottomed pot over medium-high heat until shimmering. Add the remaining sliced onion and fry for 4 minutes until softened and translucent. Add the tomato paste and fry, stirring constantly, for 3 minutes until it darkens to a deep rust-red. Pour in the blended tomato-pepper purée — stand back, it will splutter dramatically. Stir in bay leaves, curry powder, thyme, and salt. Cook uncovered on medium heat, stirring every 3-4 minutes, for 20-25 minutes total, until the paste has reduced by roughly half, darkened to a deep brick-red, and the oil has separated and floats visibly on top.",
      visualCue: {
        primaryTarget: "A deeply reduced, dark brick-red paste with glistening oil pools on the surface. The paste should hold its shape briefly when a spoon parts it, then slowly flow back together.",
        spectrum: [
          { state: "Underdone", description: "The paste is still bright orange and watery. Oil has not separated. It smells raw and slightly acidic.", action: "Continue cooking — the tomato's water must evaporate before the paste is ready to carry the rice. This step cannot be rushed." },
          { state: "Perfect",   description: "Deep, mahogany-red paste. Oil floats in distinct amber pools on top. The smell has shifted from acidic to sweet and smoky. A spoon dragged through the pot leaves a momentary channel.", action: "Add the stock, stir to combine, then add the rinsed rice." },
          { state: "Overdone",  description: "The paste is very dark brown, almost black at the edges, with a sharp, acrid smell.", action: "Immediately add the stock to stop the cooking and deglaze any scorched bits from the bottom. The slight bitterness may mellow in the final dish." },
        ],
      },
      feelCue: "You will hear the paste shift from a loud, aggressive sizzle to a deeper, quieter simmer as the water cooks out — that change in sound signals the paste is close to ready.",
    },
    {
      nodeId: "step_3",
      action: "Simmer",
      inputs: ["fried_tomato_base", "ing_09"],
      outputState: "seasoned_cooking_liquid",
      instructions: "Pour the stock into the reduced paste and stir vigorously to incorporate, scraping any caramelized bits from the bottom of the pot. Taste the liquid — it should be pleasantly seasoned, slightly more salty than you want the finished rice, since the rice will absorb and dilute the seasoning. Adjust salt now. Bring to a rolling boil.",
      visualCue: {
        primaryTarget: "A unified, deep reddish-brown liquid with a full, savory aroma and the texture of light tomato soup.",
        spectrum: [
          { state: "Underdone", description: "The stock and paste are not yet fully combined — streaks of pale stock visible.", action: "Stir more thoroughly, making sure to scrape the bottom. Bring to a boil before adding rice." },
          { state: "Perfect",   description: "A uniformly colored, deeply flavored red broth that tastes boldly of pepper and tomato. Slightly over-salted to the palate — correct.", action: "Add the rice now." },
          { state: "Overdone",  description: "You've let it reduce further and the broth is very thick, more like a sauce.", action: "Add a splash more stock or water to thin slightly — there needs to be enough liquid for the rice to cook through." },
        ],
      },
      feelCue: "Taste a spoonful; it should feel like drinking a well-seasoned, robust tomato soup with heat at the back of the throat from the scotch bonnet.",
    },
    {
      nodeId: "step_4",
      action: "Boil",
      inputs: ["ing_01", "seasoned_cooking_liquid"],
      outputState: "rice_in_pot",
      instructions: "Rinse the parboiled rice in cold water until the water runs mostly clear, then drain thoroughly. Add the rinsed rice to the boiling tomato base and stir once — just one firm stir to distribute the rice evenly and make sure no grains are floating above the liquid level. Add the butter in small pieces over the top. Do not stir again. Place the lid on the pot, reduce the heat to its absolute lowest setting, and cook for 30 minutes undisturbed.",
      visualCue: {
        primaryTarget: "All rice submerged and evenly distributed in the tomato liquid, butter melting on top, lid sealed tight.",
        spectrum: [
          { state: "Underdone", description: "Some rice is visible above the liquid level — dry peaks poking out.", action: "Add 50 ml more stock or hot water, tilt the pot to distribute, and replace the lid immediately." },
          { state: "Perfect",   description: "Rice is fully submerged in a deep red liquid that just barely covers the grains. Steam is beginning to rise. Butter is starting to melt.", action: "Seal the lid tightly and reduce heat to the minimum. Do not lift the lid for 30 minutes." },
          { state: "Overdone",  description: "Too much liquid — rice is floating freely rather than sitting in the base.", action: "Drain off a little excess liquid before sealing. The rice needs to steam-cook, not boil in liquid." },
        ],
      },
      feelCue: "After 15 minutes, press gently on the lid — you should feel the rhythmic pulse of steam pressure beneath your palm, a sign the pot is doing its work.",
    },
    {
      nodeId: "step_5",
      action: "Rest",
      inputs: ["rice_in_pot"],
      outputState: "finished_jollof_rice",
      instructions: "After 30 minutes, lift the lid quickly and look for steam holes — small craters on the surface of the rice where steam has tunneled up through the grains. These signal that the rice is cooked through. Using a long spoon, gently scrape the bottom of the pot: you should find the 'party crust' (conkon in Nigerian), a thin layer of smoky, slightly charred rice stuck to the pot floor. Fold this crust up through the rice — it is not burned; it is the prize. Replace the lid and let the rice rest off the heat for 10 minutes before serving.",
      visualCue: {
        primaryTarget: "Every grain uniformly stained deep red, separate and fluffy, with visible steam-hole craters on the surface. The bottom crust is dark, smoky, and fragrant — not acrid.",
        spectrum: [
          { state: "Underdone", description: "Grains in the center are still firm and chalky when bitten. No steam holes yet.", action: "Add 3 tablespoons of water around the edge, replace the lid, and cook for another 8-10 minutes on the lowest heat." },
          { state: "Perfect",   description: "Steam holes across the surface. Grains are tender, fluffy, and deep red all the way through. The crust at the bottom is smoky and intact. The smell is unmistakably jollof.", action: "Scrape the crust into the rice, replace the lid, and rest for 10 minutes off the heat." },
          { state: "Overdone",  description: "The crust has gone beyond smoky to genuinely burnt — the pot smells sharp and acrid rather than sweet-smoky.", action: "Remove the pot from the heat immediately. Carefully transfer the rice to a clean serving dish without scraping the very bottom, leaving the burnt layer behind." },
        ],
      },
      feelCue: "Each grain should feel distinct and firm between your fingers — not clumped, not mushy — and stained completely through with the red base rather than just coated on the outside.",
    },
  ],
};
