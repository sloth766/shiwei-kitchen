// Bobotie — Cape Malay spiced meat bake with a silky egg custard top.
// Author: SpiceTrader

export default {
  repoId: "master_south_african_south_african_bobotie_001",
  parentRepoId: null,
  slug: "south-african-bobotie",
  author: "ForkRecipe Kitchen",

  title: "Bobotie",
  description: "A Cape Malay baked dish where curried minced lamb or beef — sweetened with apricot jam, sharpened with lemon, and perfumed with turmeric and cinnamon — is crowned with a quivering, golden egg custard that sets soft as a just-firm crème brûlée.",
  cuisine: "South African",
  culture: "Cape Malay",
  category: "proteins",

  tags: ["south-african", "lamb", "curry", "custard-top", "baked"],
  difficulty: 2,
  activeTime: "30 min",
  totalTime: "1 hr 15 min",
  ratioSystem: "parts",

  stars: 1650,
  forks: 155,
  contributors: 19,
  license: "CC-BY-SA",
  createdAt: "2024-08-08",
  updatedAt: "2025-07-22",

  flavorRadar: { sweet: 3, salty: 3, sour: 1, bitter: 0, umami: 3, heat: 2 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Minced lamb or beef",                           ratioValue: 10, defaultUnit: "parts", substitutions: ["ground turkey (less rich)"] },
    { ingId: "ing_02", role: "Allium",    name: "Onion, finely chopped",                         ratioValue: 2,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Spice",     name: "Curry powder, turmeric, cinnamon, allspice",    ratioValue: 1,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Sweetener", name: "Apricot jam",                                   ratioValue: 1,  defaultUnit: "parts", substitutions: ["mango chutney", "peach jam"] },
    { ingId: "ing_05", role: "Acid",      name: "White wine vinegar or lemon juice",              ratioValue: 0.5, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Binder",    name: "White bread slices, soaked in milk and squeezed", ratioValue: 1, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Dairy",     name: "Full-cream milk",                               ratioValue: 3,  defaultUnit: "parts", substitutions: ["coconut milk"] },
    { ingId: "ing_08", role: "Binder",    name: "Eggs",                                          ratioValue: 2,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_09", role: "Seasoning", name: "Salt, pepper, bay leaves",                      ratioValue: 0.3, defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Cook spiced meat filling",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_04", "ing_05", "ing_09"],
      outputState: "spiced_meat_filling",
      instructions: "Fry the onion in a splash of oil over medium heat until soft and golden, about 8 minutes. Add the spices and fry for 1 minute until fragrant. Add the mince and cook, breaking it up, for 8–10 minutes until browned and cooked through with no pink remaining. Stir in the apricot jam and vinegar. Taste — the filling should be sweet, savory, and warmly spiced with a background sharpness. Season with salt and pepper. The sweetness and acidity are what make this distinctly Cape Malay rather than a standard curry mince.",
      visualCue: {
        primaryTarget: "Meat is fully browned with no pink patches. The filling looks glossy from the jam and is fragrant with warm spice. The color is a warm golden-brown with orange-yellow from turmeric.",
        spectrum: [
          { state: "Underdone", description: "Pink mince still visible. Spice smells raw. Onions still translucent rather than golden.", action: "Continue cooking, breaking up any clumps. The meat must be fully cooked before baking as the custard top sets quickly and won't penetrate the filling." },
          { state: "Perfect",   description: "Uniformly brown, glossy, and fragrant. Sweet-savory-spiced aroma fills the kitchen. No liquid pooling in the pan.", action: "Fold in the soaked bread and transfer to a baking dish." },
          { state: "Overdone",  description: "Meat is very dry and beginning to stick. Jam has caramelized to sticky dark spots. Onions are turning dark.", action: "Add a splash of water to loosen. Remove from heat immediately and fold in the bread — the residual heat will continue cooking." },
        ],
      },
      feelCue: "The filling should move as a cohesive mass when the pan is shaken — moist and glossy, not dry and crumbly. If it sounds like it is frying rather than steaming, it is ready.",
    },
    {
      nodeId: "step_2",
      action: "Fold in bread and bake base",
      inputs: ["spiced_meat_filling", "ing_06"],
      outputState: "filled_baking_dish",
      instructions: "Squeeze the milk-soaked bread firmly to remove excess liquid, then crumble it into the meat filling and mix well. The bread acts as a binder and moisture reservoir — it keeps the filling from drying out during baking and gives it a slightly soft, yielding texture beneath the custard. Transfer the filling to a buttered oven dish (about 30 x 20 cm), pressing it down into an even layer. Tuck bay leaves on top. Preheat oven to 180 °C.",
      visualCue: {
        primaryTarget: "Filling is pressed into an even, compact layer about 4–5 cm deep in the dish. Surface is level. Bay leaves visible on top.",
        spectrum: [
          { state: "Underdone", description: "Filling is mounded unevenly with high spots and low spots. The custard will pool in the valleys and be too thin on the peaks.", action: "Use the back of a spoon to press and level the surface before adding the custard." },
          { state: "Perfect",   description: "Even, compact layer with smooth, level surface. Filling is slightly compressed but still has some give when pressed. Bay leaves lying flat on top.", action: "Pour the custard immediately and place in the preheated oven." },
          { state: "Overdone",  description: "Filling has been packed so tightly it has become dense and compressed — more like a meatloaf than a bobotie.", action: "Use a fork to loosen the top layer slightly before adding custard, which needs to seep into the surface." },
        ],
      },
      feelCue: "Press the surface of the filling with your palm — it should feel firmly padded, like a mattress, yielding 1–2 cm but springing back rather than compressing permanently.",
    },
    {
      nodeId: "step_3",
      action: "Pour and bake custard",
      inputs: ["filled_baking_dish", "ing_07", "ing_08"],
      outputState: "baked_bobotie",
      instructions: "Whisk the eggs and milk together with a pinch of salt and turmeric until smooth and uniformly yellow. Pour the custard mixture slowly and evenly over the meat layer. The custard should cover the surface completely and be visible around the edges — about 1 cm deep. Bake at 180 °C for 35–40 minutes until the custard is just set throughout and golden on top. The center should barely wobble when the dish is shaken.",
      visualCue: {
        primaryTarget: "The custard top is golden yellow with light brown spots where it has caramelized. The entire surface is set — no liquid movement when the dish is gently shaken.",
        spectrum: [
          { state: "Underdone", description: "Center of the custard is still liquid, sloshing visibly when shaken. The surface is pale yellow and set only at the edges.", action: "Return to the oven for 8–10 more minutes and check again. The oven temperature may be too low." },
          { state: "Perfect",   description: "Golden, uniformly set surface with a gentle dome. Center barely trembles with a slow, cohesive movement when the dish is moved — like set panna cotta. No liquid visible.", action: "Remove from oven and rest 5 minutes before serving." },
          { state: "Overdone",  description: "Custard is fully rigid with no wobble. Surface is dark golden with dry, cracked edges. The custard may be beginning to pull away from the sides.", action: "Remove immediately. The custard is overcooked but still edible — serve quickly before it continues to tighten from residual heat." },
        ],
      },
      feelCue: "Shake the dish gently — a perfect bobotie custard moves like a very slow-moving lava lamp: cohesive, not sloshy, with the center lagging a half-second behind the edges. That lag is where the perfect texture lives.",
    },
    {
      nodeId: "step_4",
      action: "Rest and serve",
      inputs: ["baked_bobotie"],
      outputState: "finished_bobotie",
      instructions: "Rest the bobotie for 5 minutes out of the oven — this allows the custard to fully set and the filling to firm up so it cuts cleanly. Serve in squares directly from the dish, accompanied by yellow rice (cooked with turmeric and raisins), chutney, and sliced banana. Remove and discard bay leaves before serving. A proper bobotie plate should have sweetness (banana, chutney), warmth (the spiced filling), and the silky custard acting as a gentle, binding crown.",
      visualCue: {
        primaryTarget: "When cut, the bobotie has two distinct layers: a golden custard top and a moist, spiced filling below. The cut edges are clean, not crumbling.",
        spectrum: [
          { state: "Underdone", description: "Custard top slides off when cut — it hasn't bonded with the filling. The filling is loose and unset.", action: "Return to the oven for 5–8 more minutes. Alternatively, rest longer at room temperature, which will allow carryover heat to finish the custard." },
          { state: "Perfect",   description: "Clean-cut squares with a distinct golden layer on top and moist, spiced meat below. The custard is soft enough to quiver slightly when the plate is moved. Sweet, spiced aroma.", action: "Serve immediately with yellow rice and chutney." },
          { state: "Overdone",  description: "Filling is dry and crumbles when cut. Custard is rubbery and separated from the filling. The dish smells slightly scorched.", action: "Serve with extra chutney and a generous spoonful of yogurt or cream to restore moisture." },
        ],
      },
      feelCue: "Cut through the custard with the side of a spoon — it should yield with gentle, even resistance, like cutting through a soft terrine, before giving way cleanly to the moist filling beneath.",
    },
  ],
};
