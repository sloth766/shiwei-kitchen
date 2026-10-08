export default {
  repoId: "master_american_pineapple_upside_down_cake_001",
  parentRepoId: null,
  slug: "pineapple-upside-down-cake",
  author: "ForkRecipe Kitchen",

  title: "Pineapple Upside-Down Cake",
  description: "A golden sponge baked over a glossy layer of caramelised pineapple rings and brown sugar, then inverted to reveal a lacquered, jewel-bright topping that smells of caramel and tropical fruit.",
  cuisine: "American",
  culture: "American",
  category: "desserts",

  tags: ["american", "pineapple", "cake", "caramel", "dessert"],
  difficulty: 2,
  activeTime: "20 min",
  totalTime: "55 min",
  ratioSystem: "parts",

  stars: 1124,
  forks: 138,
  contributors: 16,
  license: "CC-BY-SA",
  createdAt: "2024-08-09",
  updatedAt: "2025-04-25",

  flavorRadar: { sweet: 4, salty: 1, sour: 2, bitter: 0, umami: 0, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Canned or fresh pineapple rings",                 ratioValue: 60,  defaultUnit: "parts", substitutions: ["mango slices", "peach halves"] },
    { ingId: "ing_02", role: "Sweetener",  name: "Dark brown sugar (for caramel base)",             ratioValue: 40,  defaultUnit: "parts", substitutions: ["light brown sugar"] },
    { ingId: "ing_03", role: "Fat",        name: "Unsalted butter (for the caramel base)",          ratioValue: 30,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Structure",  name: "Plain (all-purpose) flour",                       ratioValue: 100, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Sweetener",  name: "Caster or granulated sugar",                      ratioValue: 80,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Binder",     name: "Eggs, at room temperature",                       ratioValue: 50,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Leavener",   name: "Baking powder",                                   ratioValue: 5,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_08", role: "Fat",        name: "Unsalted butter, softened (for the sponge batter)", ratioValue: 80, defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Build caramel base",
      inputs: ["ing_02", "ing_03"],
      outputState: "caramel_base",
      instructions: "Preheat oven to 175°C (350°F). Place a 24cm oven-safe skillet or round cake tin directly on the stovetop over medium heat. Add the butter and let it melt. Add the dark brown sugar and stir briefly to combine, then leave undisturbed for 2 minutes until it bubbles and darkens slightly. The caramel does not need to be fully made at this point — it will finish in the oven — but the butter and sugar should be melted and fragrant. Remove from heat.",
      visualCue: {
        primaryTarget: "A dark, glossy, bubbling mixture of butter and brown sugar covering the base of the pan. It smells of deep toffee with a hint of bitterness.",
        spectrum: [
          { state: "Underdone", description: "Butter and sugar have barely combined — still looks sandy and pale.", action: "Stir briefly and continue heating for 1 more minute. The mixture needs to be fully melted and beginning to bubble before adding the pineapple." },
          { state: "Perfect",   description: "Dark, glossy, and bubbling. Toffee aroma fills the kitchen. The mixture is uniform with no visible sugar crystals.", action: "Remove from heat and arrange pineapple rings immediately." },
          { state: "Overdone",  description: "Caramel is very dark and smells slightly burnt. It is beginning to separate and look oily.", action: "Remove from heat immediately. If it smells acrid, discard and start again — bitter burnt caramel will dominate the entire cake." },
        ],
      },
      feelCue: "The caramel at this stage should smell like warm toffee sauce — deeply sweet with a faint edge of bitterness. If it smells predominantly sweet and buttery, give it another 30 seconds of heat.",
    },
    {
      nodeId: "step_2",
      action: "Arrange fruit",
      inputs: ["caramel_base", "ing_01"],
      outputState: "decorated_base",
      instructions: "Lay the pineapple rings over the hot caramel in the pan, fitting them snugly — one in the centre and as many as will fit around the edge without overlapping. Press them gently into the caramel. If using canned pineapple, pat the rings thoroughly dry first — excess juice will water down the caramel and prevent the fruit from browning properly. Place a maraschino cherry or dried cherry in the centre of each ring if desired.",
      visualCue: {
        primaryTarget: "Pineapple rings are flat against the caramel base with no gaps between them. The caramel is visible at the edges and between the rings. The rings look slightly golden from the caramel heat.",
        spectrum: [
          { state: "Underdone", description: "Rings are sitting loosely on top and the caramel around them is still very fluid and separating.", action: "Press the rings down more firmly. Wet rings are also floating — pat them drier and replace." },
          { state: "Perfect",   description: "Rings are flush with the pan, caramel has crept up slightly around their edges. The arrangement looks neat and the rings have a slight gloss from the caramel.", action: "Pour the sponge batter immediately and evenly over the top." },
          { state: "Overdone",  description: "The caramel has hardened while arranging the fruit and the rings are sitting on a solid toffee disc.", action: "Very gently warm the pan base for 30 seconds to soften. Proceed — the fruit will still caramelise beautifully in the oven." },
        ],
      },
      feelCue: "When pressed gently, the pineapple rings should have a slight resistance — not the springiness of cold tinned fruit, but a settled, flush contact with the caramel beneath them.",
    },
    {
      nodeId: "step_3",
      action: "Mix batter",
      inputs: ["ing_04", "ing_05", "ing_06", "ing_07", "ing_03"],
      outputState: "cake_batter",
      instructions: "In a bowl, beat the softened butter and caster sugar together with an electric mixer for 3 minutes until pale and fluffy. Add the eggs one at a time, beating well after each addition. Sift in the flour and baking powder and fold until just combined — a few turns with a spatula rather than vigorous beating. The batter should be smooth, thick, and fall from the spatula in slow ribbons. A small splash of milk or pineapple juice from the tin can loosen it to the right consistency.",
      visualCue: {
        primaryTarget: "Pale, creamy batter that falls from a spoon or spatula in thick, slow ribbons. No flour streaks visible. Batter is smooth and glossy.",
        spectrum: [
          { state: "Underdone", description: "Butter and sugar are not fully creamed — the mixture is dense and yellowish rather than pale and fluffy. Flour streaks visible.", action: "Beat butter and sugar longer before adding eggs. Fold the flour more completely." },
          { state: "Perfect",   description: "Pale, very smooth batter that falls in thick ribbons. Slightly thicker than double cream — it holds a figure-eight pattern briefly when dropped.", action: "Pour evenly over the arranged pineapple and caramel." },
          { state: "Overdone",  description: "Batter has been over-mixed and looks slightly dense and gluey. It does not fall smoothly.", action: "Proceed. The texture may be slightly less tender but the caramelised topping is the star of this cake." },
        ],
      },
      feelCue: "A ribbon of batter dropped from a spoon should hold its shape on the surface for 2–3 seconds before slowly dissolving back — this viscosity ensures the sponge will bake with an even, fine crumb.",
    },
    {
      nodeId: "step_4",
      action: "Bake and invert",
      inputs: ["cake_batter", "decorated_base"],
      outputState: "finished_cake",
      instructions: "Pour the batter carefully over the pineapple arrangement, spreading gently to the edges to cover everything evenly without disturbing the fruit arrangement. Bake at 175°C for 30–35 minutes until the sponge is deep golden and a skewer inserted in the centre comes out clean. Remove from the oven and rest for 5 minutes — not longer. Run a knife around the edge, place a large serving plate on top, and invert decisively in one motion. Lift the pan straight up. Any caramel clinging to the pan can be scraped off and poured over the top.",
      visualCue: {
        primaryTarget: "After inversion: a glossy lacquer of amber caramel and golden pineapple rings facing upward on a dark, beautifully coloured sponge base.",
        spectrum: [
          { state: "Underdone", description: "After inversion, the centre of the sponge is sunken and raw-looking. The batter may have partially adhered to the pan.", action: "Re-cover with the pan and return to the oven for 10 minutes. The caramel can be re-warmed if needed." },
          { state: "Perfect",   description: "A perfect circle of glossy amber caramel and fruit rings resting on a golden sponge. The caramel has set to a glaze. No raw spots visible.", action: "Serve warm with cream or ice cream." },
          { state: "Overdone",  description: "The caramel has hardened to a dark, almost brittle toffee. Sponge edges are very brown and dry.", action: "The flavour is still good. Warm slices briefly in the microwave before serving, or serve with extra cream to moisten." },
        ],
      },
      feelCue: "The five-minute resting period before inversion is critical — the caramel needs to set slightly from its boiling state. If you invert immediately, it will pour off the cake; wait too long and it bonds to the pan.",
    },
  ],
};
