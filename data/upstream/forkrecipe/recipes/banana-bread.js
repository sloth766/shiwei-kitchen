export default {
  repoId: "master_american_banana_bread_001",
  parentRepoId: null,
  slug: "banana-bread",
  author: "ForkRecipe Kitchen",

  title: "Banana Bread",
  description: "Overripe bananas — almost black, intensely sweet and tropical — folded into a simple batter and baked into a dense, moist loaf with a crackling sugar crust that smells like a bakery and tastes like nostalgia.",
  cuisine: "American",
  culture: "American",
  category: "breads",

  tags: ["american", "banana", "bread", "baking", "comfort"],
  difficulty: 1,
  activeTime: "15 min",
  totalTime: "1 hr 15 min",
  ratioSystem: "bakers_percentage",

  stars: 2109,
  forks: 234,
  contributors: 28,
  license: "CC-BY-SA",
  createdAt: "2024-10-08",
  updatedAt: "2025-10-30",

  flavorRadar: { sweet: 4, salty: 1, sour: 0, bitter: 1, umami: 0, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure", name: "All-purpose flour",                                  ratioValue: 100, defaultUnit: "%", substitutions: ["whole wheat flour (50% swap for nuttier flavor)", "oat flour blend"] },
    { ingId: "ing_02", role: "Sweetener", name: "Overripe bananas, mashed (3–4 large, very black)",   ratioValue: 130, defaultUnit: "%", substitutions: ["plantains (very ripe)", "frozen-thawed bananas"] },
    { ingId: "ing_03", role: "Sweetener", name: "Brown sugar, packed",                               ratioValue: 65,  defaultUnit: "%", substitutions: ["granulated sugar", "coconut sugar"] },
    { ingId: "ing_04", role: "Fat",       name: "Unsalted butter, melted and cooled",                ratioValue: 40,  defaultUnit: "%", substitutions: ["vegetable oil (moister result)", "coconut oil"] },
    { ingId: "ing_05", role: "Binder",    name: "Large eggs",                                        ratioValue: 25,  defaultUnit: "%", substitutions: ["flax egg (1 tbsp flax + 3 tbsp water)"] },
    { ingId: "ing_06", role: "Leavener",  name: "Baking soda",                                      ratioValue: 1.5, defaultUnit: "%", substitutions: [] },
    { ingId: "ing_07", role: "Seasoning", name: "Fine salt, vanilla extract, ground cinnamon",       ratioValue: 1,   defaultUnit: "%", substitutions: ["cardamom", "nutmeg"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Mash and prep bananas",
      inputs: ["ing_02"],
      outputState: "mashed_banana",
      instructions: "Peel the overripe bananas into a large bowl. Mash thoroughly with a fork until almost completely smooth — a few small lumps are fine and add texture. The bananas must be very overripe: deep brown to black on the exterior, soft to the point of being nearly liquid. Underripe yellow bananas lack the concentrated sweetness and starch conversion that makes banana bread work.",
      visualCue: {
        primaryTarget: "A smooth, dark golden-brown paste with occasional small lumps. The mash is wet and glossy, not dry and pale. Smells intensely of ripe banana.",
        spectrum: [
          { state: "Underdone", description: "Bananas are yellow or barely spotted — they mash into a pale, stiff paste that smells green and starchy rather than sweet.", action: "Do not use yellow bananas. Ripen faster by baking unpeeled bananas at 150°C for 20 minutes until the skins turn black, then cool before using." },
          { state: "Perfect",   description: "Almost entirely black bananas mash into a dark, wet, smooth paste with an intensely sweet, almost fermented banana aroma. Very little resistance to the fork.", action: "Proceed to mixing." },
          { state: "Overdone",  description: "Bananas have started to ferment — the mash has a slightly alcoholic, sour smell alongside the banana sweetness.", action: "These are actually ideal for banana bread — the fermentation adds complexity. Proceed." },
        ],
      },
      feelCue: "The mashed banana should feel like thick, wet mud between the fork tines — not stiff or chalky. When you lift the fork, a thick ribbon of mash should fall slowly back into the bowl.",
    },
    {
      nodeId: "step_2",
      action: "Mix wet ingredients",
      inputs: ["mashed_banana", "ing_03", "ing_04", "ing_05", "ing_07"],
      outputState: "wet_mixture",
      instructions: "To the mashed banana, add the brown sugar, melted (and cooled) butter, eggs, vanilla, and spices. Whisk until fully combined and the sugar is mostly dissolved. The butter must be cooled — if it's still hot, it will scramble the eggs. The mixture will look thick and glossy, like a loose caramel sauce.",
      visualCue: {
        primaryTarget: "A thick, dark golden-brown liquid that flows slowly. Color is uniform — no streaks of unmixed butter or swirls of undissolved sugar visible.",
        spectrum: [
          { state: "Underdone", description: "Visible streaks of butter swirling through the mixture. Sugar sits in visible granules at the bottom. Eggs may not be fully incorporated.", action: "Whisk more vigorously for another 30 seconds. Warm butter rising to the surface is a sign the butter was too hot — let it cool and re-whisk." },
          { state: "Perfect",   description: "Uniform, thick, glossy dark-golden mixture. Smells of banana, vanilla, and brown sugar. Sugar is completely dissolved. Flows off a whisk in a thick ribbon.", action: "Add the flour and leavener." },
          { state: "Overdone",  description: "Not applicable for a cold-mixed batter. If you see curdled or scrambled egg bits, the butter was too hot.", action: "If eggs scrambled, strain the mixture through a sieve to remove the cooked egg bits. The batter will still work." },
        ],
      },
      feelCue: "Dip a finger in the wet mixture and rub between your fingers — it should feel slightly gritty from residual sugar, then smooth as you rub. No distinct butter film or sugar granule crunch.",
    },
    {
      nodeId: "step_3",
      action: "Fold in dry ingredients",
      inputs: ["wet_mixture", "ing_01", "ing_06"],
      outputState: "banana_batter",
      instructions: "Sift the flour, baking soda, and salt together over the wet mixture. Using a rubber spatula, fold gently with a J-stroke motion — scrape under, fold over — just until no dry flour streaks remain. Do not stir vigorously or beat. Overworking the batter develops gluten and creates a tough, rubbery loaf rather than a tender, moist one. Ten to fifteen folds should be enough.",
      visualCue: {
        primaryTarget: "A thick, lumpy batter with no visible dry flour. The texture is rough and uneven — not smooth. Banana mash creates visible brown swirls in the batter.",
        spectrum: [
          { state: "Underdone", description: "White streaks and pockets of dry flour still visible in the batter. Inconsistent mixing means some bites of the bread will be gummy from raw flour.", action: "Fold 3–4 more times until no dry patches remain. A few lumps are fine — lumps are banana, not unmixed flour." },
          { state: "Perfect",   description: "Batter is thick and uneven, with no dry flour visible. Looks slightly lumpy from banana pieces. The spatula leaves a trail that fills in slowly when dragged through.", action: "Pour immediately into the prepared pan." },
          { state: "Overdone",  description: "Batter is smooth and elastic — it stretches slightly when you lift the spatula, almost like a bread dough. Gluten has developed. The bread will be tighter and denser.", action: "Proceed to baking. Avoid this next time by counting folds — 15 maximum." },
        ],
      },
      feelCue: "Drag a spatula through the batter slowly — it should part and come back together gradually, like thick cake batter, not spring back like elastic dough or flow freely like pancake batter.",
    },
    {
      nodeId: "step_4",
      action: "Bake",
      inputs: ["banana_batter"],
      outputState: "finished_banana_bread",
      instructions: "Preheat the oven to 175°C. Pour the batter into a greased and floured 23x13cm loaf pan. Optionally, sprinkle the top with 1 tablespoon of brown sugar for a crackly crust. Bake for 55–65 minutes until a toothpick inserted in the center comes out clean or with just a few moist crumbs. The top should crack along the center — this is correct. Cool in the pan for 10 minutes before turning out.",
      visualCue: {
        primaryTarget: "Deep golden-brown top with a natural crack running down the center. The crack edges are slightly darker. The loaf has pulled away from the sides of the pan.",
        spectrum: [
          { state: "Underdone", description: "Top is golden but not deeply browned. The center of the top looks wet and sunken slightly. A toothpick comes out with wet batter on it, not crumbs.", action: "Return to the oven for 5–10 more minutes. Tent with foil if the top is browning too fast while the center is still wet." },
          { state: "Perfect",   description: "Deep golden-brown with a central crack. The crack interior is still moist-looking but the surrounding surface is set. Toothpick comes out clean or with a few moist crumbs — not wet batter.", action: "Cool in pan 10 minutes, then turn out." },
          { state: "Overdone",  description: "Top is very dark brown and the center crack looks dry. Edges have pulled significantly away from the pan. Toothpick comes out completely dry.", action: "Remove immediately. Cool in pan — the dry interior will rehydrate slightly from the steam trapped inside as it cools." },
        ],
      },
      feelCue: "Press the center of the loaf gently with a fingertip — it should spring back slowly and completely, like pressing a ripe but firm fruit. If it stays dented, the center is still liquid and needs more time.",
    },
  ],
};
