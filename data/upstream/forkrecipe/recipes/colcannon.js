export default {
  repoId: "master_irish_colcannon_001",
  parentRepoId: null,
  slug: "colcannon",
  author: "ForkRecipe Kitchen",

  title: "Colcannon",
  description: "Ireland's most honest comfort food — floury potatoes beaten with pools of melted butter and sweet braised kale, the whole mass steaming and golden at the table where a well of butter melts slowly into the center like a warm hearth.",
  cuisine: "Irish",
  culture: "Irish",
  category: "vegetables",

  tags: ["potato", "kale", "irish", "comfort", "mash", "butter", "vegetarian"],
  difficulty: 1,
  activeTime: "20 min",
  totalTime: "45 min",
  ratioSystem: "parts",

  stars: 1124,
  forks: 67,
  contributors: 22,
  license: "CC-BY-SA",
  createdAt: "2024-10-28",
  updatedAt: "2025-01-15",

  flavorRadar: { sweet: 2, salty: 3, sour: 0, bitter: 1, umami: 2, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Starch",    name: "Floury potatoes (Maris Piper or Russet), peeled and quartered", ratioValue: 100, defaultUnit: "parts", substitutions: ["King Edward potatoes"] },
    { ingId: "ing_02", role: "Structure", name: "Curly kale or savoy cabbage, shredded",                         ratioValue: 30,  defaultUnit: "parts", substitutions: ["spring greens", "Brussels sprout leaves"] },
    { ingId: "ing_03", role: "Dairy",     name: "Whole milk or cream, warmed",                                   ratioValue: 25,  defaultUnit: "parts", substitutions: ["buttermilk", "oat milk"] },
    { ingId: "ing_04", role: "Fat",       name: "Unsalted butter",                                               ratioValue: 20,  defaultUnit: "parts", substitutions: ["cultured butter"] },
    { ingId: "ing_05", role: "Allium",    name: "Spring onions (scallions), thinly sliced",                      ratioValue: 10,  defaultUnit: "parts", substitutions: ["leeks, thinly sliced and sweated"] },
    { ingId: "ing_06", role: "Seasoning", name: "Fine sea salt",                                                 ratioValue: 2,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Seasoning", name: "White pepper, freshly ground",                                  ratioValue: 0.5, defaultUnit: "parts", substitutions: ["black pepper"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Boil",
      inputs: ["ing_01", "ing_06"],
      outputState: "cooked_potatoes",
      instructions: "Place the potatoes in a large pot of cold salted water — starting cold ensures even cooking from edge to center. Bring to a boil over high heat, then reduce to a steady simmer. Cook for 20–25 minutes until a skewer passes through the largest piece with zero resistance. Drain thoroughly in a colander and let steam-dry for 3 minutes — excess moisture is the enemy of a fluffy mash.",
      visualCue: {
        primaryTarget: "The potato pieces are completely tender. The cut edges appear slightly fluffy and beginning to crumble. When a piece is squeezed between two fingers it collapses completely.",
        spectrum: [
          { state: "Underdone", description: "A knife or skewer meets firm resistance in the center. The cut edges are still sharp and defined. The interior looks waxy when a piece is broken.", action: "Return to the boil for 5 more minutes and test again. Do not rush — undercooked potato makes gluey mash." },
          { state: "Perfect",   description: "Potatoes are completely yielding. The edges have begun to soften into the water. They break apart at a touch. Steam rises freely when drained.", action: "Drain and let steam-dry for 3 minutes before mashing." },
          { state: "Overdone",  description: "Potatoes are waterlogged and breaking apart in the water. The cooking liquid is cloudy with starch. They are on the verge of disintegrating.", action: "Drain immediately and proceed — overcooked potatoes absorb more butter, which is not entirely a tragedy." },
        ],
      },
      feelCue: "A bamboo skewer pushed into the largest potato quarter should glide through with the resistance of warm butter, with no firm core in the center — a single smooth pass from side to side.",
    },
    {
      nodeId: "step_2",
      action: "Braise kale",
      inputs: ["ing_02", "ing_05", "ing_04"],
      outputState: "braised_greens",
      instructions: "While the potatoes cook, melt half the butter in a wide pan over medium heat. Add the spring onions and cook for 2 minutes until softened. Add the shredded kale with a splash of water and a pinch of salt. Cover and cook for 4–6 minutes, stirring once or twice, until the kale is completely tender and the water has evaporated. Season and set aside. The kale should be cooked until it fully surrenders — wilted, soft, and sweet, not squeaky and raw.",
      visualCue: {
        primaryTarget: "Kale is deep, dark green and fully collapsed. No bright raw patches. The pan is dry — no pooled liquid remains. The scallions are translucent and sweet-smelling.",
        spectrum: [
          { state: "Underdone", description: "Kale still has some bright green, slightly squeaky patches. It springs back when pressed. Water is still visible in the pan.", action: "Replace the lid and cook another 2–3 minutes. Undercooked kale will make the colcannon taste raw and slightly bitter." },
          { state: "Perfect",   description: "Uniformly dark forest green, fully yielding. The pan is dry. The sweet, sulfurous scent of properly braised brassica fills the kitchen.", action: "Remove from heat and fold into the mash." },
          { state: "Overdone",  description: "Kale has gone khaki-olive and is sticking to the pan. Scallions have completely melted. The mixture smells slightly sulfurous.", action: "Proceed — it will still taste good, and the color will be masked once folded into the potato." },
        ],
      },
      feelCue: "Pick up a strand of kale with tongs — it should hang limp and heavy, not hold any structural rigidity. It should feel soft between the teeth with no squeakiness and a distinctly sweeter flavor than when it went in.",
    },
    {
      nodeId: "step_3",
      action: "Mash",
      inputs: ["cooked_potatoes", "ing_03", "ing_04", "ing_07"],
      outputState: "buttered_mash",
      instructions: "Pass the steam-dried potatoes through a ricer or food mill into the warm pot — never use a blender or food processor, which overworks the starch and makes the mash elastic and gluey. Add the remaining butter and warmed milk in alternating additions, beating vigorously with a wooden spoon or spatula between each. Season with salt and white pepper. The mash should be creamy and just fluid enough to fall slowly from a spoon, not stiff.",
      visualCue: {
        primaryTarget: "The mash is creamy, uniform, and ivory-white with no lumps. It falls from a spoon in slow, thick ribbons and mounds softly without holding stiff peaks.",
        spectrum: [
          { state: "Underdone", description: "Stiff, lumpy mash that holds its shape in peaks. Lumps of unmashed potato visible. The mixture looks dry and mat.", action: "Add more warm milk one tablespoon at a time, beating after each addition. Never add cold milk — it shocks the starch." },
          { state: "Perfect",   description: "Silky, ivory-white, and flowing. Falls in slow ribbons. Looks glossy from the butter. A bite reveals no lumps — it dissolves on the tongue.", action: "Fold in the braised greens immediately." },
          { state: "Overdone",  description: "The mash is elastic and slightly gluey. When stirred, it pulls away from the pot in strands. Overworked starch.", action: "There is no fix for gluey mash. Serve it — it will still taste rich — and switch to a ricer next time." },
        ],
      },
      feelCue: "Drag a spoon through the mash — it should leave a clean channel that slowly fills back in over 3–4 seconds. If it flows back immediately like soup it is too thin; if it holds the channel stiffly it needs more butter.",
    },
    {
      nodeId: "step_4",
      action: "Fold",
      inputs: ["buttered_mash", "braised_greens"],
      outputState: "finished_colcannon",
      instructions: "Fold the braised kale and scallions into the mash with a light hand — you want streaks of dark green through the ivory potato, not a uniform grey-green mass. Taste and adjust seasoning. Serve in warm bowls with a generous hollow pressed into the center of each portion, filled with extra butter to melt slowly into the mash. The colcannon is done when it smells of cream, butter, and something green and alive.",
      visualCue: {
        primaryTarget: "Distinct green streaks through ivory-white mash. The surface looks billowy and soft. A pool of melting butter glistens in the hollow.",
        spectrum: [
          { state: "Underdone", description: "Large clumps of kale that haven't been incorporated. The mash and greens look separate and dry at the junction points.", action: "Fold a few more times, but with restraint — you still want green streaks, not uniform color." },
          { state: "Perfect",   description: "Beautiful marbling of dark green through white. Every forkful has some kale. The mixture is hot, fluffy, and fragrant with butter.", action: "Serve immediately in warm bowls." },
          { state: "Overdone",  description: "Everything has been stirred to a uniform grey-green. The mash has deflated slightly. It looks and smells like it was processed rather than folded.", action: "Serve — it will still taste excellent even if the visual appeal is reduced." },
        ],
      },
      feelCue: "The finished colcannon should feel almost weightless when spooned — light and cloud-like, with just enough resistance to know something substantial is there. The aroma should be overwhelmingly of warm cream and butter with a whisper of green vegetable sweetness.",
    },
  ],
};
