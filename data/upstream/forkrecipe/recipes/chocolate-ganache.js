export default {
  repoId: "master_french_chocolate_ganache_001",
  parentRepoId: null,
  slug: "chocolate-ganache",
  author: "ForkRecipe Kitchen",

  title: "Dark Chocolate Ganache",
  description: "Cream and chocolate collapse into each other in a glossy, jet-black emulsion that clings to a spoon like liquid velvet. At room temperature it pours like a mirror glaze; chilled, it sets to a truffle-firm fudge you can slice clean.",
  cuisine: "French",
  culture: "Pâtisserie",
  category: "desserts",

  tags: ["chocolate", "ganache", "french", "pastry", "no-bake", "glaze", "truffle"],
  difficulty: 1,
  activeTime: "10 min",
  totalTime: "25 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 3, salty: 1, sour: 1, bitter: 4, umami: 1, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Dark chocolate (70% cacao), finely chopped", ratioValue: 2, defaultUnit: "parts", substitutions: ["60% bittersweet chocolate", "milk chocolate (reduce cream by 20%)"] },
    { ingId: "ing_02", role: "Dairy",      name: "Heavy cream (36% fat)", ratioValue: 1, defaultUnit: "parts", substitutions: ["full-fat coconut cream for vegan version"] },
    { ingId: "ing_03", role: "Fat",        name: "Unsalted butter, room temperature, cubed", ratioValue: 0.1, defaultUnit: "parts", substitutions: ["cold-pressed coconut oil"] },
    { ingId: "ing_04", role: "Sweetener",  name: "Light corn syrup (for gloss and shelf life)", ratioValue: 0.05, defaultUnit: "parts", substitutions: ["glucose syrup", "honey"] },
    { ingId: "ing_05", role: "Seasoning",  name: "Flaky sea salt", ratioValue: 0.005, defaultUnit: "parts", substitutions: ["smoked salt"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Melt",
      inputs: ["ing_02", "ing_04"],
      outputState: "hot_cream",
      instructions: "Pour the heavy cream and corn syrup into a small heavy-bottomed saucepan. Set over medium heat and bring to a full simmer — you want small, insistent bubbles breaking across the entire surface, not a rolling boil that would scorch the fat. Watch the edges of the pan: cream scalds quickly once it reaches a gallop. The moment you see a confident simmer with steam rising in a column, remove from heat. The corn syrup dissolves invisibly but is doing important work: it disrupts sugar crystallisation and gives the finished ganache that jewel-like sheen that makes mirror glazes sing. Do not stir once it approaches heat — just watch. Total time on heat: 2–3 minutes.",
      visualCue: {
        primaryTarget: "Small bubbles forming a ring around the edge, breaking toward the center. Surface is shimmering and a thin wisp of steam rises steadily.",
        spectrum: [
          { state: "Underdone", description: "Cream is warm but flat — no bubbles at the edges, no steam. Chocolate will not melt evenly when poured.", action: "Return to heat for another 60 seconds. The cream must be genuinely hot." },
          { state: "Perfect",   description: "A confident ring of small bubbles at the edges racing inward. Steam curls up. The cream has just puffed and risen slightly.", action: "Remove from heat immediately and pour over the chocolate." },
          { state: "Overdone",  description: "A hard rolling boil with large, violent bubbles. The cream is losing water as steam and may scorch.", action: "Remove from heat. Let it settle for 30 seconds before pouring — some water loss is acceptable, the ganache will be slightly firmer." },
        ],
      },
      feelCue: "Hold your hand 10 cm above the pot — you should feel firm, dry heat pushing up, not a moist cloud. That dry radiant heat means the cream is hot enough without having boiled off.",
    },
    {
      nodeId: "step_2",
      action: "Emulsify",
      inputs: ["hot_cream", "ing_01"],
      outputState: "emulsified_ganache",
      instructions: "Place the finely chopped chocolate in a deep, heatproof bowl — a deep bowl concentrates the heat and prevents splashing. Pour the hot cream over the chocolate in one confident pour, making sure all the chocolate is submerged or in contact with the cream. Do not stir yet. Wait 90 seconds, letting the residual heat of the cream melt the chocolate from the outside in. This patience is the secret: if you stir immediately, you introduce cold air before the chocolate has melted, risking a grainy, broken ganache. After 90 seconds, begin stirring with a silicone spatula from the very center of the bowl, making small, tight concentric circles. You will see a glossy, dark emulsion form in the center — keep working outward until the ganache is completely uniform, glossy, and no streaks of cream remain. This should take about 2 minutes of gentle, deliberate stirring.",
      visualCue: {
        primaryTarget: "A completely uniform, deeply glossy, dark brown emulsion with no white cream streaks and no visible chocolate chips remaining.",
        spectrum: [
          { state: "Underdone", description: "The mixture is streaky — pale cream and dark chocolate have not fully combined. Some chips still visible.", action: "Keep stirring from the center outward. If chips remain after 3 minutes, set the bowl over a pot of barely simmering water for 20 seconds and stir again." },
          { state: "Perfect",   description: "The ganache is glossy, uniformly dark, and flows slowly off the spatula in a thick, continuous ribbon. It moves like warm fudge sauce.", action: "Add the butter and salt in the next step." },
          { state: "Overdone",  description: "The ganache looks greasy or grainy — the emulsion has broken. Fat has separated and pools on the surface.", action: "Add a tablespoon of warm cream and whisk vigorously. If still broken, add another tablespoon. The emulsion can almost always be recovered." },
        ],
      },
      feelCue: "Drag the spatula through the center — it should feel like pulling through warm honey, coating the spatula in a smooth layer with no graininess when you rub a small amount between your fingertips.",
    },
    {
      nodeId: "step_3",
      action: "Mount",
      inputs: ["emulsified_ganache", "ing_03", "ing_05"],
      outputState: "finished_ganache",
      instructions: "While the ganache is still warm (but not burning hot — ideally around 40°C / 104°F), drop in the room-temperature butter cubes one at a time, stirring each in completely before adding the next. Room-temperature butter is critical: cold butter will not emulsify smoothly and can make the ganache seize. Add the pinch of flaky sea salt and stir it through — the salt performs two functions: it amplifies the chocolate's fruitiness and balances the sweetness so the ganache tastes complex rather than simply sweet. The finished ganache should be poured immediately if using as a glaze, or left at room temperature for 2 hours until it firms to a spreadable truffle consistency. For chocolate truffles, cover and refrigerate for at least 4 hours until scoopable. The ganache keeps at room temperature for 48 hours or refrigerated for two weeks.",
      visualCue: {
        primaryTarget: "The ganache deepens in gloss after the butter is incorporated — it should look lacquered, almost wet, and flow slowly off the spatula in a wide, glossy curtain.",
        spectrum: [
          { state: "Underdone", description: "The butter has not fully incorporated — the ganache looks pale or slightly mottled where butter pockets remain.", action: "Keep stirring gently. Add butter cubes one at a time, not all at once." },
          { state: "Perfect",   description: "Deep, mirror-like gloss. The ganache falls off the spatula in a single, slow, unbroken curtain. When a drop lands, it spreads and smooths itself.", action: "Pour immediately as a glaze, or cover and let set for your intended use." },
          { state: "Overdone",  description: "The ganache has been stirred too vigorously and has cooled and thickened unevenly. Surface looks dull and the texture is lumpy.", action: "Gently reheat over a double boiler, stirring slowly, until fluid and glossy again. Do not overheat." },
        ],
      },
      feelCue: "At the perfect warm temperature, a drop on the inside of your wrist should feel neutral — neither cold nor hot — and it should sit on your skin for 3 seconds before it begins to spread, which tells you the emulsion is stable and the fat is properly distributed.",
    },
  ],
};
