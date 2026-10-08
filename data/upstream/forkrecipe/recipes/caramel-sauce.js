export default {
  repoId: "master_french_caramel_sauce_001",
  parentRepoId: null,
  slug: "caramel-sauce",
  author: "ForkRecipe Kitchen",

  title: "Dry-Method Caramel Sauce",
  description: "Sugar caramelised in a dry pan to deep amber — pushed past the point where sweetness fades into something nutty and complex — then arrested with cream and finished with butter and salt into a glossy, pourable sauce.",
  cuisine: "French",
  culture: "French",
  category: "sauces",

  tags: ["caramel", "sauce", "dessert", "butter", "cream", "french", "classic"],
  difficulty: 2,
  activeTime: "20 min",
  totalTime: "30 min",
  ratioSystem: "parts",

  stars: 2180,
  forks: 476,
  contributors: 59,
  license: "CC-BY-SA",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",

  flavorRadar: { sweet: 4, salty: 2, sour: 0, bitter: 2, umami: 1, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Sweetener", name: "Caster sugar",                            ratioValue: 200, defaultUnit: "g",   substitutions: ["granulated sugar"] },
    { ingId: "ing_02", role: "Dairy",     name: "Double cream (heavy cream), warm",         ratioValue: 150, defaultUnit: "ml",  substitutions: ["coconut cream (dairy-free)"] },
    { ingId: "ing_03", role: "Fat",       name: "Cold unsalted butter, cubed",              ratioValue: 50,  defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_04", role: "Seasoning", name: "Flaky sea salt (Fleur de sel)",            ratioValue: 0.5, defaultUnit: "tsp", substitutions: ["fine sea salt (use less)"] },
    { ingId: "ing_05", role: "Aromatic",  name: "Vanilla extract (optional)",               ratioValue: 0.5, defaultUnit: "tsp", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Caramelize",
      inputs: ["ing_01"],
      outputState: "amber_caramel",
      instructions: "Place the sugar in a wide, heavy-based saucepan (light interior colour is ideal so you can see the caramel). Set over medium heat — do not stir. As the sugar melts at the edges, gently swirl the pan to even out the heat, but never use a spoon. Allow the sugar to melt slowly and evenly, swirling occasionally, until the entire mass is molten and a deep amber colour — the colour of dark honey or old whisky. Watch it carefully from the moment it fully liquefies: it will go from perfect to burnt in 15–20 seconds. The target temperature is 175–180 C.",
      visualCue: {
        primaryTarget: "A fully liquid, even amber pool with no crystallised sugar remaining — the colour of a 12-year whisky or a darkly tanned caramel chew. Thin wisps of smoke just beginning to rise.",
        spectrum: [
          { state: "Underdone", description: "The caramel is a pale gold — still tasting of sweet sugar rather than complex caramel. No bitterness yet.", action: "Continue cooking. Pale caramel makes a cloying sauce. Push toward amber." },
          { state: "Perfect",   description: "Deep amber, not quite mahogany. Smells of burnt toffee, coffee, and butterscotch. A small drop on a white plate is a rich amber-brown.", action: "Remove from heat immediately and add the warm cream." },
          { state: "Overdone",  description: "Dark mahogany to black. Acrid, smoky smell. Bitter smoke rising. The caramel has burnt.", action: "Discard and start again. Burnt caramel cannot be recovered." },
        ],
      },
      feelCue: "Watch the edge of the pan where the sugar first melts — those edges tell you where the heat is, and the molten sugar will move toward the cooler centre if you swirl rather than stir. The smell of the sugar progresses from sweet to toasty to coffee-like: the moment you smell coffee is the moment to move.",
    },
    {
      nodeId: "step_2",
      action: "Deglaze",
      inputs: ["amber_caramel", "ing_02"],
      outputState: "caramel_cream_base",
      instructions: "Remove the pan from the heat and immediately add the warm cream in a slow, steady pour — stand back, the mixture will bubble violently and steam dramatically as the cold cream hits the hot sugar. Stir or whisk continuously as you add it. The caramel will seize and harden around the cream at first — keep stirring. Return to low heat and stir until any hardened caramel lumps have dissolved and the mixture is smooth.",
      visualCue: {
        primaryTarget: "A smooth, uniform, deeply amber sauce with the cream fully incorporated. No white cream streaks and no caramel lumps remaining.",
        spectrum: [
          { state: "Underdone", description: "Cream added but white streaks remain unmixed, or lumps of hardened caramel have not yet dissolved.", action: "Return to low heat and stir continuously until all lumps melt." },
          { state: "Perfect",   description: "Smooth, glossy, amber-brown sauce. Uniform colour. Falls in a thick, even stream.", action: "Add the butter, salt, and vanilla off the heat." },
          { state: "Overdone",  description: "Not applicable at this step — cream cannot overcook here.", action: "Proceed to mounting with butter." },
        ],
      },
      feelCue: "The moment the cream hits the caramel you will feel the handle of the pan shudder from the violent boiling — do not pull away. The violent reaction settles within 10 seconds and the stirring brings it back together.",
    },
    {
      nodeId: "step_3",
      action: "Mount",
      inputs: ["caramel_cream_base", "ing_03", "ing_04", "ing_05"],
      outputState: "finished_caramel_sauce",
      instructions: "Remove the pan from the heat. Add the cold cubed butter, flaky salt, and vanilla extract. Stir or whisk until the butter is fully melted and incorporated — the sauce will turn from thin to glossy and slightly thickened as the butter emulsifies. Taste: it should be deeply sweet, properly bitter at the back of the throat, and finished with a definite hit of salt. Pour into a clean jar or bowl. The sauce thickens as it cools; reheat gently to serve.",
      visualCue: {
        primaryTarget: "A deeply glossy, amber sauce with a slight viscosity — it coats the inside of the pan in a thin, even film and falls from the spoon in a thick, slow ribbon.",
        spectrum: [
          { state: "Underdone", description: "Butter not yet fully incorporated — the sauce looks separated, with a greasy sheen and visible butter pools.", action: "Whisk more vigorously. The cold butter emulsifies as it melts." },
          { state: "Perfect",   description: "Perfectly glossy. Slow-dripping ribbon from the spoon. Deeply caramel-coloured. Tastes sweet, bitter, and salty in succession.", action: "Pour into a jar. Serve warm or refrigerate up to 2 weeks." },
          { state: "Overdone",  description: "Sauce has become very thick and is beginning to pull away from the pan as one mass — it is over-reducing on residual heat.", action: "Add a tablespoon of warm cream and stir vigorously to loosen." },
        ],
      },
      feelCue: "The finished sauce should coat the back of a cold spoon in a thin, even layer — run your finger through and the channel should hold cleanly, the sauce clinging like warm velvet. The salt should arrive on your tongue a beat after the sweet and bitter — a delay that means the seasoning is right.",
    },
  ],
};
