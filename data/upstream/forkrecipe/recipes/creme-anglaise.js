export default {
  repoId: "master_french_creme_anglaise_001",
  parentRepoId: null,
  slug: "creme-anglaise",
  author: "ForkRecipe Kitchen",

  title: "Crème Anglaise",
  description: "The mother of all dessert sauces — a slow-cooked ribbon of egg yolks, milk, cream, and vanilla that pours over a warm pudding like liquid cream and coats every surface in a thin, trembling veil. It exists in the narrow corridor between raw custard and scrambled egg, and cooking it well is the mark of a trained hand.",
  cuisine: "French",
  culture: "Classical French Pâtisserie",
  category: "sauces",

  tags: ["custard", "french", "vanilla", "sauce", "pastry", "egg-yolk", "dessert-sauce"],
  difficulty: 3,
  activeTime: "25 min",
  totalTime: "40 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 4, salty: 0, sour: 0, bitter: 0, umami: 1, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Dairy",     name: "Whole milk", ratioValue: 1, defaultUnit: "parts", substitutions: ["oat milk (thinner result)"] },
    { ingId: "ing_02", role: "Dairy",     name: "Heavy cream (36% fat)", ratioValue: 1, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Protein",   name: "Large egg yolks", ratioValue: 6, defaultUnit: "yolks per 500ml liquid", substitutions: [] },
    { ingId: "ing_04", role: "Sweetener", name: "Caster sugar", ratioValue: 0.4, defaultUnit: "parts", substitutions: ["honey"] },
    { ingId: "ing_05", role: "Aromatic",  name: "Vanilla bean, split and scraped (or 2 tsp pure extract)", ratioValue: 1, defaultUnit: "bean per 500ml", substitutions: ["vanilla paste", "tonka bean"] },
    { ingId: "ing_06", role: "Seasoning", name: "Fine sea salt, one small pinch", ratioValue: 0.005, defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Infuse",
      inputs: ["ing_01", "ing_02", "ing_05"],
      outputState: "infused_milk",
      instructions: "Combine the whole milk and heavy cream in a medium heavy-bottomed saucepan. Split the vanilla bean lengthwise with a sharp paring knife and scrape out the seeds — drag the back of the knife along the cut face to lift the fine black paste. Add both the seeds and the empty pod to the milk. Heat over medium heat until the mixture reaches a full simmer — you will see the vanilla seeds dispersing into tiny black dots throughout the milk. Turn off the heat, cover the pot, and let the vanilla infuse for 15 minutes. This off-heat infusion extracts the full aromatic complexity of the vanilla without cooking out the volatile top notes that make it smell floral rather than simply sweet. If using extract, add it after the anglaise is cooked and cooled to 60°C — heat destroys the delicate top notes of good extract.",
      visualCue: {
        primaryTarget: "Pale, cream-coloured milk with fine black vanilla seeds distributed throughout. A ring of small bubbles at the edge of the pan indicates it reached the right temperature.",
        spectrum: [
          { state: "Underdone", description: "Milk is warm but no bubbles appeared. Vanilla aroma is weak.", action: "Return to heat briefly until you see bubbles, then cover and infuse." },
          { state: "Perfect",   description: "Milk simmered, vanilla seeds are evenly dispersed, and the pot smells powerfully of warm vanilla and fresh cream.", action: "Proceed to whisk yolks while the milk infuses." },
          { state: "Overdone",  description: "Milk boiled hard and formed a thick skin on the surface. Cream smells slightly cooked.", action: "Remove the skin with a spoon. The anglaise will still work; the flavour will be slightly more cooked." },
        ],
      },
      feelCue: "Remove the lid and hold your face over the pot — the steam should be fragrant with vanilla and cream, not eggy or scorched. That aroma check tells you the milk is ready.",
    },
    {
      nodeId: "step_2",
      action: "Whisk",
      inputs: ["ing_03", "ing_04", "ing_06"],
      outputState: "ribbon_yolks",
      instructions: "While the milk infuses, place the egg yolks, caster sugar, and pinch of salt in a large heatproof bowl. Whisk vigorously for 2–3 minutes until the mixture reaches the ruban (ribbon) stage — a thick, pale, fluffy foam that falls from the whisk in a wide, slow ribbon that sits on top of itself for two seconds before dissolving. This step partially dissolves the sugar and coats the yolk proteins with a sugar barrier that raises their coagulation temperature, giving you a wider window before the anglaise scrambles on the heat. The mixture will go from a deep orange-yellow to a pale, creamy yellow as you incorporate air. Do not skimp on the whisking — under-developed yolks are the primary cause of grainy anglaise.",
      visualCue: {
        primaryTarget: "A pale, thick, foamy mixture that falls from the lifted whisk in a slow, continuous ribbon resting on the surface for 2 seconds before sinking.",
        spectrum: [
          { state: "Underdone", description: "The mixture is still orange-yellow and thin. It falls off the whisk in thin drops, not a ribbon.", action: "Keep whisking. Your arm will tire — this is normal. The transformation is abrupt; push through." },
          { state: "Perfect",   description: "Pale lemon-cream coloured foam. When the whisk is lifted, the batter falls in a thick, slow ribbon that sits on the surface briefly. The mixture has tripled in volume.", action: "Temper with the hot milk immediately." },
          { state: "Overdone",  description: "You have incorporated too much air — the mixture looks stiff and meringue-like. This is not possible by hand but can happen with an electric mixer at high speed.", action: "Proceed — a little extra air will cook out on the heat." },
        ],
      },
      feelCue: "Rub a small amount between your thumb and forefinger — you should feel almost no grit from sugar granules. A slight resistance, but smooth. That tells you enough sugar has dissolved into the yolk fat.",
    },
    {
      nodeId: "step_3",
      action: "Temper",
      inputs: ["ribbon_yolks", "infused_milk"],
      outputState: "tempered_custard",
      instructions: "This is the critical step that separates successful anglaise from sweet scrambled eggs. Remove the vanilla pod from the milk. With one hand whisking the yolk mixture constantly, use the other to slowly ladle or pour the hot milk into the yolks — start with just a small splash (about 60ml / ¼ cup) and whisk it in completely before adding more. This gradual addition raises the temperature of the yolks slowly, preventing them from cooking on contact with the hot milk. Add the milk in three additions over 30 seconds of whisking. Once you have incorporated about half the milk, you can pour the remaining milk in a thin, steady stream while whisking. Pour everything back into the saucepan. The mixture will be warm, thin, and faintly foamy on top — this foam dissipates as you cook.",
      visualCue: {
        primaryTarget: "A uniform, pale cream-coloured liquid — slightly thicker than the milk alone — with no white streaks of cooked egg and a faint foam on the surface.",
        spectrum: [
          { state: "Underdone", description: "You added the milk too slowly and the mixture is still cold. Foam sits thick on top.", action: "This is fine — you have simply been careful. Proceed to the heat." },
          { state: "Perfect",   description: "A smooth, warm, uniform custard base. Pourable consistency, no lumps, mild vanilla aroma.", action: "Pour into the saucepan and cook over medium-low heat." },
          { state: "Overdone",  description: "White curds floating in the mixture — you added hot milk too fast and cooked the outer layer of the yolks.", action: "Strain immediately through a fine sieve. The curd clumps can be removed; the anglaise is usually saveable." },
        ],
      },
      feelCue: "Hold your hand over the saucepan with the combined mixture — it should feel warm, not hot. If the pot is uncomfortable to hold, it was too hot and you needed to add the milk more slowly.",
    },
    {
      nodeId: "step_4",
      action: "Simmer",
      inputs: ["tempered_custard"],
      outputState: "finished_creme_anglaise",
      instructions: "Cook the custard over medium-low heat, stirring constantly with a wooden spoon or silicone spatula, reaching every corner and edge of the pan. This is not a step you can walk away from. The anglaise is done when it reaches 77–82°C (170–180°F) and nappe-coats the back of the spoon — a finger drawn through the coating leaves a clean, distinct line that does not run or fill in. At 83°C the egg proteins begin to scramble rapidly. Use a thermometer if you are new to this technique. Once done, immediately strain through a fine-mesh sieve into a clean bowl sitting over an ice bath. Stir to cool rapidly — the anglaise must drop below 60°C within 10 minutes. Serve warm alongside warm puddings or cakes, or chill completely to pour cold over ice cream as a pouring custard.",
      visualCue: {
        primaryTarget: "The spoon comes out coated in a thick, even, creamy layer of anglaise. A finger drawn through the coating on the spoon leaves a sharp line with clean edges.",
        spectrum: [
          { state: "Underdone", description: "The spoon comes out with a thin, uneven coating. The drawn line fills in immediately. The surface is still quite foamy.", action: "Keep cooking and stirring. The thickening happens gradually and then suddenly. Increase heat slightly if it is taking more than 10 minutes." },
          { state: "Perfect",   description: "A thick, even coating on the spoon. Clean line. The surface foam has mostly subsided. A faint ribbon of steam rises but no bubbles break the surface.", action: "Strain immediately into the ice bath. Speed matters here." },
          { state: "Overdone",  description: "Tiny lumps appear in the mixture. The anglaise smells eggy. Temperature exceeded 83°C.", action: "Strain through a fine sieve immediately — the sieve catches the cooked protein clumps. Blend briefly with an immersion blender if needed. It will still be usable." },
        ],
      },
      feelCue: "Dip a clean finger into the strained anglaise — it should feel like warm silk, coating your finger in a thin, trembling veil that clings without dripping. That coating weight is the texture you serve.",
    },
  ],
};
