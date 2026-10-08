export default {
  repoId: "master_swedish_kladdkaka_001",
  parentRepoId: null,
  slug: "kladdkaka",
  author: "ForkRecipe Kitchen",

  title: "Kladdkaka",
  description: "A Swedish fudge cake deliberately baked underdone — the edges set into a thin, crackled crust while the center remains dense, gooey, and almost raw-textured, eaten cold from the fridge with a dusting of icing sugar and a cloud of whipped cream.",
  cuisine: "Swedish",
  culture: "Scandinavian",
  category: "desserts",

  tags: ["vegetarian", "swedish", "chocolate", "fudgy", "scandinavian", "baking"],
  difficulty: 1,
  activeTime: "15 min",
  totalTime: "1 hour 30 min",
  ratioSystem: "bakers_percentage",

  stars: 0, forks: 0, contributors: 1, license: "CC-BY-SA",
  createdAt: "2026-06-27", updatedAt: "2026-06-27",

  flavorRadar: { sweet: 4, salty: 1, sour: 0, bitter: 3, umami: 0, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "All-purpose flour",                        ratioValue: 100, defaultUnit: "%", substitutions: [] },
    { ingId: "ing_02", role: "Sweetener",  name: "Granulated sugar",                         ratioValue: 250, defaultUnit: "%", substitutions: [] },
    { ingId: "ing_03", role: "Spice",      name: "Unsweetened cocoa powder (Dutch-process)", ratioValue: 60,  defaultUnit: "%", substitutions: [] },
    { ingId: "ing_04", role: "Seasoning",  name: "Fine salt",                                ratioValue: 2,   defaultUnit: "%", substitutions: [] },
    { ingId: "ing_05", role: "Binder",     name: "Eggs (large)",                             ratioValue: 100, defaultUnit: "%", substitutions: [] },
    { ingId: "ing_06", role: "Fat",        name: "Unsalted butter, melted and cooled",       ratioValue: 120, defaultUnit: "%", substitutions: [] },
    { ingId: "ing_07", role: "Aromatic",   name: "Vanilla extract",                          ratioValue: 3,   defaultUnit: "%", substitutions: [] },
    { ingId: "ing_08", role: "Garnish",    name: "Icing sugar (powdered sugar), for serving", ratioValue: 10, defaultUnit: "%", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Whisk",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_04"],
      outputState: "dry_mixture",
      instructions: "Sift flour, cocoa powder, and salt into a mixing bowl. Add the sugar and whisk together until uniformly blended — the mixture will be dark and slightly fluffy. There should be no visible pockets of plain flour or lumps of cocoa.",
      visualCue: {
        primaryTarget: "Uniformly dark brown powder with no streaks. Light and airy from the sifting. Cohesive when pinched.",
        spectrum: [
          { state: "Underdone", description: "Visible pale flour streaks or dark cocoa lumps in the mixture.", action: "Whisk for another minute, pressing any lumps through with the whisk." },
          { state: "Perfect",   description: "Even dark color, no lumps, smells deeply of cocoa and caramel sugar.", action: "Add wet ingredients." },
          { state: "Overdone",  description: "Cannot over-mix dry ingredients — proceed.", action: "Proceed." },
        ],
      },
      feelCue: "Pinch a small amount — the dry mixture should clump briefly then fall apart, like good loose soil. The cocoa should be fully visible as a uniform dark-brown coloring.",
    },
    {
      nodeId: "step_2",
      action: "Mix",
      inputs: ["dry_mixture", "ing_05", "ing_06", "ing_07"],
      outputState: "kladdkaka_batter",
      instructions: "Make a well in the center of the dry ingredients. Add eggs, melted (but not hot) butter, and vanilla. Stir together with a wooden spoon or spatula until just combined — stop the moment no dry flour is visible. The batter will be thick, dark, and glossy. Do not use an electric mixer; the goal is zero air in this batter.",
      visualCue: {
        primaryTarget: "A dense, very dark brown batter that flows slowly and reluctantly off the spoon. Glossy, heavy, and shiny — like very thick chocolate sauce.",
        spectrum: [
          { state: "Underdone", description: "Dry pockets of flour still visible at the bottom or edges of the bowl.", action: "Fold gently with the spatula to incorporate — do not stir vigorously." },
          { state: "Perfect",   description: "Uniformly dark and glossy. No dry spots. Thick enough to hold a slow mound when dropped from a spoon.", action: "Pour into the prepared pan immediately." },
          { state: "Overdone",  description: "Batter looks airy or lighter — eggs have been over-worked and introduced air.", action: "Proceed; it will still be gooey in the center after baking, just fractionally less fudgy." },
        ],
      },
      feelCue: "Tilt the bowl — the batter should move very slowly, like cold honey. It should feel heavy and resistant, nothing like a normal cake batter.",
    },
    {
      nodeId: "step_3",
      action: "Bake",
      inputs: ["kladdkaka_batter"],
      outputState: "baked_kladdkaka",
      instructions: "Pour the batter into a buttered and cocoa-dusted 20 cm (8 inch) springform pan. Bake at 175 C (350 F) for exactly 15–17 minutes. The kladdkaka is done when the edges are set, crackled, and firm, and the center still wobbles dramatically — like a set crème brûlée — when the pan is gently shaken. A skewer will come out coated in fudgy batter from the center, and that is correct.",
      visualCue: {
        primaryTarget: "A crackled, firm crust around the outer 4 cm of the cake. The center still moves as a single liquid mass when nudged. The surface is matte and slightly domed.",
        spectrum: [
          { state: "Underdone", description: "The entire cake jiggles including the edges. The surface looks wet and liquid.", action: "Return to oven for 3–4 more minutes and watch closely — the window between underdone and perfect is narrow." },
          { state: "Perfect",   description: "Set, crackled edges. Wobbly center. A toothpick in the outer third comes out clean; in the center it comes out fudgy.", action: "Cool in the pan at room temperature, then refrigerate for at least 1 hour before serving." },
          { state: "Overdone",  description: "The center no longer wobbles. Skewer comes out clean from the middle.", action: "It is now a very moist chocolate cake, not a kladdkaka — serve with cream and call it what it is." },
        ],
      },
      feelCue: "Hold the oven rack and give the pan the gentlest possible side-to-side shake — you should see a slow, synchronized ripple travel across the center. If the edges ripple, it needs more time; if nothing moves, it is over.",
    },
    {
      nodeId: "step_4",
      action: "Chill",
      inputs: ["baked_kladdkaka", "ing_08"],
      outputState: "finished_kladdkaka",
      instructions: "Cool completely in the pan at room temperature — at least 30 minutes — before refrigerating. The fudgy center sets as it cools but remains dense and sticky. Refrigerate for at least 1 hour; cold kladdkaka is the correct serving temperature. Release the springform, dust the top heavily with icing sugar through a sieve, and serve in thin wedges with lightly whipped cream.",
      visualCue: {
        primaryTarget: "A flat-topped, crackled cake with a white snowfall of icing sugar. The cross-section shows a thin set crust giving way immediately to a dark, dense, barely-set center.",
        spectrum: [
          { state: "Underdone", description: "Center is still liquid and pours off the cut face — still too warm.", action: "Refrigerate for another 30 minutes." },
          { state: "Perfect",   description: "Cold, firm on the outside, fudge-dense on the inside. A spoon dragged through leaves a clean gouge that very slowly fills in.", action: "Dust with icing sugar and serve." },
          { state: "Overdone",  description: "Cake has hardened entirely — cuts like a brownie all the way through.", action: "Warm individual slices for 10 seconds in the microwave to restore some gooeyness." },
        ],
      },
      feelCue: "A finished cold kladdkaka should feel almost dense enough to be a truffle in your mouth — fudgy but not greasy, cohesive but not rubbery. It should dissolve slowly on the tongue rather than chewing.",
    },
  ],
};
