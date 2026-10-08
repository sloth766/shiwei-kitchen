export default {
  repoId: "master_thai_thai_iced_tea_001",
  parentRepoId: null,
  slug: "thai-iced-tea",
  author: "ForkRecipe Kitchen",

  title: "Thai Iced Tea",
  description: "Strongly brewed Ceylon tea stained to a vivid amber-orange by spices and food coloring, cooled over ice and crowned with a slow pour of sweetened condensed milk that sinks through the tea in billowing white clouds before it is stirred into a creamy, bittersweet drink. This is the beverage color of a Bangkok afternoon — the color of rust and sunshine simultaneously.",
  cuisine: "Thai",
  culture: "Central Thai",
  category: "beverages",

  tags: ["beverage", "thai", "tea", "iced", "condensed-milk", "street-drink", "sweet"],
  difficulty: 1,
  activeTime: "10 min",
  totalTime: "30 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 5, salty: 0, sour: 0, bitter: 2, umami: 0, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Base",      name: "Thai tea mix (cha yen blend — Ceylon with spices and orange food color)", ratioValue: 40, defaultUnit: "g", substitutions: ["strong Ceylon black tea + 1/4 tsp tamarind extract + food coloring (approximate)"] },
    { ingId: "ing_02", role: "Liquid",    name: "Boiling water (95-100°C)",                                                ratioValue: 350, defaultUnit: "ml", substitutions: [] },
    { ingId: "ing_03", role: "Sweetener", name: "Sweetened condensed milk",                                                ratioValue: 60,  defaultUnit: "ml", substitutions: ["evaporated milk + sugar (less rich)"] },
    { ingId: "ing_04", role: "Dairy",     name: "Evaporated milk (for the white top layer)",                               ratioValue: 30,  defaultUnit: "ml", substitutions: ["heavy cream (richer)", "whole milk (lighter)"] },
    { ingId: "ing_05", role: "Sweetener", name: "Sugar (optional, additional sweetness)",                                   ratioValue: 10,  defaultUnit: "g",  substitutions: ["simple syrup"] },
    { ingId: "ing_06", role: "Structure", name: "Ice cubes, large",                                                        ratioValue: 200, defaultUnit: "g",  substitutions: ["crushed ice (dilutes faster — serve quickly)"] },
    { ingId: "ing_07", role: "Spice",     name: "Star anise (optional, for aroma boost)",                                  ratioValue: 1,   defaultUnit: "whole", substitutions: ["cardamom pod, cracked"] },
    { ingId: "ing_08", role: "Spice",     name: "Ground tamarind (optional — deepens color and adds slight sour note)",    ratioValue: 1,   defaultUnit: "g",  substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Steep",
      inputs: ["ing_01", "ing_02", "ing_07", "ing_08"],
      outputState: "brewed_thai_tea",
      instructions: "Bring the water to a full rolling boil. Place the Thai tea mix (and optional star anise and tamarind if using) in a tea sock, fine-mesh strainer, or paper coffee filter set over a large heatproof pitcher or measuring cup. Pour the boiling water over the tea in a slow, steady stream to ensure full saturation. Allow the tea to steep for 5 minutes without disturbing it — no stirring. The extraction time is critical: too short and the tea will be weak and watery with insufficient bitterness to balance the sweetened milk; too long and it becomes aggressively tannic and harsh. After 5 minutes, press the tea mix firmly through the strainer to extract the last of the liquid, which carries the most color and body. Add the sugar now if using — stir to dissolve in the hot tea. Allow the tea to cool for at least 10 minutes before chilling further.",
      visualCue: {
        primaryTarget: "A deep, opaque amber-orange tea — the color of rust or terracotta tiles — with a slight reddish tinge and no cloudiness.",
        spectrum: [
          { state: "Underdone", description: "Tea is pale amber, almost the color of lightly brewed black tea. It lacks the vivid orange color and has insufficient body to balance the condensed milk.", action: "Steep for 2 more minutes and press the tea bag or sock more firmly when removing." },
          { state: "Perfect",   description: "A deep, vivid orange-amber that is almost opaque in the cup. Holds its color under direct light. Smells of spiced tea with a faint sweetness from the tea mix. Slightly bitter on its own but with body.", action: "Cool the tea to room temperature or use immediately over ice." },
          { state: "Overdone",  description: "Tea has steeped too long and is very dark — almost brown-black — with a sharp, astringent tannin bite that will not be masked by the condensed milk.", action: "Dilute with a small amount of hot water and reduce condensed milk slightly to compensate for the stronger extraction." },
        ],
      },
      feelCue: "Press the back of a spoon against the steeped tea sock and run it down — the liquid that drains should stain the spoon a deep amber-orange that is visible even in a thin film. That color intensity in a thin layer means the tea has full body.",
    },
    {
      nodeId: "step_2",
      action: "Assemble",
      inputs: ["brewed_thai_tea", "ing_03", "ing_06"],
      outputState: "iced_sweetened_tea",
      instructions: "Fill a large, clear glass completely with large ice cubes — the glass should be full to within 2 centimeters of the rim. Pour the condensed milk into the bottom of the glass first: it is heavier than the tea and will naturally settle to the bottom if you add the tea over it gently. Now pour the brewed Thai tea slowly over the ice, aiming for the side of the glass rather than the center to slow the pour and preserve the visual layering. The tea will be a vivid orange-amber column and the condensed milk will be a white layer visible at the bottom through the ice — this contrast is the visual signature of the drink. The condensed milk at the bottom has not yet been mixed in.",
      visualCue: {
        primaryTarget: "A glass of vivid orange-amber tea over ice, with a visible layer of white condensed milk settled at the bottom.",
        spectrum: [
          { state: "Underdone", description: "The condensed milk has already been mixed in and the drink is a uniform pale cream-orange rather than showing the dramatic two-tone separation.", action: "Presentation has been lost but the flavor is correct. Add a small drizzle of condensed milk over the top to partially restore the visual." },
          { state: "Perfect",   description: "The glass shows a vivid orange-amber tea column over ice with a distinct white condensed milk layer visible at the bottom. The contrast is dramatic and the ice cubes are visible as a clear middle zone.", action: "Add the evaporated milk float and serve with a straw for the diner to stir." },
          { state: "Overdone",  description: "Too much ice has been added and the tea volume is insufficient — the drink will be very dilute.", action: "Top up with more brewed tea." },
        ],
      },
      feelCue: "Hold the glass to the light — the tea should be translucent orange with enough depth of color that you cannot easily see your hand clearly through the glass. That opacity means the tea is properly concentrated to survive the ice dilution.",
    },
    {
      nodeId: "step_3",
      action: "Finish",
      inputs: ["iced_sweetened_tea", "ing_04"],
      outputState: "finished_thai_iced_tea",
      instructions: "Pour the evaporated milk slowly over the back of a spoon held just above the surface of the iced tea. The spoon breaks the fall and spreads the milk in a thin layer across the top of the tea rather than sinking it immediately. The evaporated milk should form a distinct white cloud or layer floating on top of the amber tea — a visual that is as much a part of Thai iced tea as the flavor. Serve with a long straw and do not stir before serving — the diner stirs their own drink at the table, swirling the condensed milk from the bottom and the evaporated milk from the top into the tea, watching the orange darken and the white dissolve. That act of stirring is part of the ritual.",
      visualCue: {
        primaryTarget: "A tricolor glass: white evaporated milk floating on top, vivid amber-orange tea in the middle, and white condensed milk visible at the bottom through the ice.",
        spectrum: [
          { state: "Underdone", description: "The evaporated milk has sunk into the tea and the top layer has merged with the orange tea. No visible white layer on top.", action: "Pour more evaporated milk over the spoon for a fresh float, very slowly." },
          { state: "Perfect",   description: "The three visible layers are distinct: white top, orange middle, white bottom. The evaporated milk float holds for at least 1 minute before slowly sinking. The glass is cold and condensation is forming on the outside.", action: "Serve immediately with a straw." },
          { state: "Overdone",  description: "Too much evaporated milk has been added — the top layer is thick and the tea tastes predominantly of milk rather than spiced tea.", action: "Stir in and top up with additional brewed tea." },
        ],
      },
      feelCue: "When you stir the fully assembled drink and take the first sip through the straw — pulling from the bottom where the condensed milk is richest — the cold, sweet, creamy, slightly bitter tea should coat your throat with a warmth that begins cold and ends warm from the spice notes of the tea blend.",
    },
  ],
};
