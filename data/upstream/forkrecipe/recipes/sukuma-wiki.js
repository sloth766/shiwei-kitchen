export default {
  repoId: "master_kenyan_sukuma_wiki_001",
  parentRepoId: null,
  slug: "sukuma-wiki",
  author: "ForkRecipe Kitchen",

  title: "Sukuma Wiki",
  description: "Collard greens sautéed with tomato, onion, and a whisper of chili — Kenya's everyday green, whose name means 'push the week' in Swahili, a dish cooked in every household from Nairobi to Mombasa, at once humble and deeply satisfying.",
  cuisine: "Kenyan",
  culture: "East African",
  category: "vegetables",

  tags: ["collard-greens", "kenyan", "east-african", "vegetarian", "vegan", "quick", "everyday"],
  difficulty: 1,
  activeTime: "15 min",
  totalTime: "20 min",
  ratioSystem: "parts",

  stars: 892,
  forks: 78,
  contributors: 27,
  license: "CC-BY-SA",
  createdAt: "2025-01-08",
  updatedAt: "2025-05-22",

  flavorRadar: { sweet: 1, salty: 3, sour: 1, bitter: 3, umami: 2, heat: 2 },

  ingredients: [
    { ingId: "ing_01", role: "Structure", name: "Collard greens (sukuma wiki) — stems stripped, leaves chiffonade", ratioValue: 100, defaultUnit: "parts", substitutions: ["kale", "Swiss chard"] },
    { ingId: "ing_02", role: "Allium",   name: "Onion (thinly sliced)",                                             ratioValue: 20,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Umami",    name: "Ripe tomatoes (chopped)",                                           ratioValue: 20,  defaultUnit: "parts", substitutions: ["canned tomatoes"] },
    { ingId: "ing_04", role: "Allium",   name: "Garlic and fresh green chili (chopped)",                            ratioValue: 3,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Fat",      name: "Vegetable oil or palm oil",                                         ratioValue: 4,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Seasoning", name: "Kosher salt",                                                      ratioValue: 1.5, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Liquid",   name: "Water or light stock (small amount)",                               ratioValue: 5,   defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Prep greens",
      inputs: ["ing_01"],
      outputState: "chiffonade_greens",
      instructions: "Strip the tough central stem from each collard leaf by folding the leaf in half lengthwise and pulling the stem away. Stack several leaves, roll tightly like a cigar, and slice into thin ribbons (chiffonade) about 1cm wide. Thinner slices cook more quickly and evenly — thick slices need much longer cooking and remain tough. Wash in cold water and drain but do not dry completely — the residual water helps the greens steam as they cook.",
      visualCue: {
        primaryTarget: "Thin, uniform green ribbons, washed and slightly damp. No thick stems visible in the pile. The ribbons should be consistent in width.",
        spectrum: [
          { state: "Underdone", description: "The leaves are cut in large, irregular chunks with thick stem pieces remaining.", action: "Re-cut more finely and ensure all stems are removed. Thick pieces will remain tough throughout cooking." },
          { state: "Perfect",   description: "Thin, consistent ribbons with no stems. The pile looks bright, vibrant green and slightly damp from washing.", action: "Set aside and begin the onion and tomato base." },
          { state: "Overdone",  description: "The greens have been sitting cut for a long time and are beginning to wilt and discolor.", action: "Cook immediately — cut greens oxidize quickly." },
        ],
      },
      feelCue: "Pick up a handful of chiffonade greens — they should feel cool, slightly damp, and springy. Each ribbon should hold its shape when held between two fingers and not go completely limp.",
    },
    {
      nodeId: "step_2",
      action: "Sauté",
      inputs: ["ing_02", "ing_03", "ing_04", "ing_05"],
      outputState: "tomato_onion_base",
      instructions: "Heat oil in a wide pan over medium-high heat. Add the sliced onion and cook for 5–6 minutes until softened and beginning to turn golden. Add the garlic and green chili and cook for 1 minute. Add the tomatoes and cook for 3–4 minutes, stirring, until they break down into a rough sauce. The tomato provides the liquid and acidity that balance the bitterness of the collard greens.",
      visualCue: {
        primaryTarget: "Softened, slightly golden onions merged with broken-down tomato pieces into a loose, aromatic sauce. The chili and garlic are fragrant in the oil.",
        spectrum: [
          { state: "Underdone", description: "Onions are still raw and pale; tomatoes are still in chunks and look barely heated.", action: "Continue cooking. The tomato must fully break down to coat the greens." },
          { state: "Perfect",   description: "Golden onions, dissolved tomatoes, and a garlicky, spicy aroma filling the kitchen. The sauce is slightly reduced.", action: "Add the collard greens." },
          { state: "Overdone",  description: "The base has reduced and dried, sticking to the bottom of the pan.", action: "Add the greens immediately — their moisture will deglaze the pan." },
        ],
      },
      feelCue: "The base should smell of fried onion, fresh tomato, and green chili simultaneously. Press a tomato piece against the pan — it should dissolve immediately, offering no resistance.",
    },
    {
      nodeId: "step_3",
      action: "Toss",
      inputs: ["tomato_onion_base", "chiffonade_greens", "ing_06", "ing_07"],
      outputState: "cooking_sukuma",
      instructions: "Add the collard green ribbons to the pan all at once — they will seem like too much but will reduce dramatically. Toss aggressively with tongs to coat in the tomato-onion sauce. Season with salt. Add the splash of water and cover the pan for 2 minutes to steam the greens. Uncover, toss again, and cook for 3–5 more minutes over high heat until the greens are fully wilted but still hold a vibrant green color and pleasant bite.",
      visualCue: {
        primaryTarget: "Fully wilted collard greens in a dark green, glistening state — not khaki or grey-green — with the tomato sauce coating every ribbon.",
        spectrum: [
          { state: "Underdone", description: "Some ribbons are still bright, raw green and the pile is high and uncompressed. A bite has a tough, fibrous chew.", action: "Cover and steam for 2 more minutes, then toss again on high heat." },
          { state: "Perfect",   description: "All ribbons are wilted and dark green — not grey. They still have a pleasant, slightly resistant chew when bitten. The tomato sauce coats every piece.", action: "Taste, adjust salt, and serve immediately." },
          { state: "Overdone",  description: "Greens have turned khaki-grey and are completely limp, releasing more water into the pan.", action: "Serve immediately. Overcooked sukuma wiki is still edible; just less vibrant. Next time reduce cooking time." },
        ],
      },
      feelCue: "Press the cooked greens with the back of a spoon — they should compress slightly but spring back with some resistance. There should be no pooling liquid in the pan — if there is, increase heat and toss until it evaporates.",
    },
    {
      nodeId: "step_4",
      action: "Finish",
      inputs: ["cooking_sukuma"],
      outputState: "finished_sukuma_wiki",
      instructions: "Transfer to a serving dish and serve immediately. Sukuma wiki waits for no one — it loses color and texture with every minute it sits. The traditional accompaniment is ugali (a stiff maize porridge) which absorbs the juices from the greens. A fried egg on the side is the Kenyan working-family's way of making it a full meal.",
      visualCue: {
        primaryTarget: "A vibrant, dark-green mound of wilted greens with tomato-orange sauce coating each ribbon, ready to serve alongside ugali.",
        spectrum: [
          { state: "Underdone", description: "Greens still appear raw and very green, the sauce is watery and not coating the leaves.", action: "Return to high heat for 2 more minutes to reduce liquid and wilt fully." },
          { state: "Perfect",   description: "Dark, glossy, wilted ribbons with the tomato sauce integrated. The smell is of sautéed greens and garlic — earthy, slightly bitter, savory.", action: "Serve immediately." },
          { state: "Overdone",  description: "Greens are khaki, soggy, and unappetizing. They have released significant water into the dish.", action: "Drain excess liquid and serve. Add a drizzle of fresh oil to restore some vibrancy." },
        ],
      },
      feelCue: "Pick up a ribbon of cooked sukuma wiki with a fork — it should drape over the tines and hold together, not disintegrate. Taste: it should be pleasantly bitter, savory from the onion, and have a clean, green finish that lingers on the back of the palate.",
    },
  ],
};
