export default {
  repoId: "master_turkish_imam_bayildi_001",
  parentRepoId: null,
  slug: "imam-bayildi",
  author: "ForkRecipe Kitchen",

  title: "Imam Bayıldı",
  description: "Whole eggplants slit lengthwise and filled with a slow-cooked melange of onion, tomato, garlic, and olive oil, then braised in more olive oil until the eggplant walls collapse into translucent silk — the dish whose name means 'the imam fainted,' allegedly from the extravagance of the oil.",
  cuisine: "Turkish",
  culture: "Ottoman",
  category: "vegetables",

  tags: ["eggplant", "turkish", "ottoman", "vegetarian", "vegan", "olive-oil", "slow-cook"],
  difficulty: 2,
  activeTime: "35 min",
  totalTime: "1 hr 30 min",
  ratioSystem: "parts",

  stars: 1123,
  forks: 134,
  contributors: 41,
  license: "CC-BY-SA",
  createdAt: "2024-10-30",
  updatedAt: "2025-04-12",

  flavorRadar: { sweet: 2, salty: 2, sour: 1, bitter: 2, umami: 3, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure", name: "Medium globe eggplants",              ratioValue: 100, defaultUnit: "parts", substitutions: ["Italian eggplants"] },
    { ingId: "ing_02", role: "Allium",   name: "Onions (very thinly sliced)",          ratioValue: 50,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Allium",   name: "Garlic cloves (thinly sliced)",        ratioValue: 5,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Umami",    name: "Ripe tomatoes (peeled and chopped)",   ratioValue: 40,  defaultUnit: "parts", substitutions: ["San Marzano tomatoes (canned)"] },
    { ingId: "ing_05", role: "Herb",     name: "Flat-leaf parsley (chopped)",          ratioValue: 3,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Fat",      name: "Olive oil (use generously — this is the point)", ratioValue: 30, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Seasoning", name: "Kosher salt, black pepper, and a pinch of sugar", ratioValue: 2, defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Salt eggplant",
      inputs: ["ing_01", "ing_07"],
      outputState: "salted_eggplant",
      instructions: "Peel the eggplants in alternating 2cm strips of skin and bare flesh — this striped pattern is traditional and helps the eggplant maintain its shape while still softening quickly. Make a deep lengthwise slit in each eggplant, not cutting all the way through. Salt the cut surfaces generously and the slits. Let rest in a colander for 30 minutes — the salt draws out the bitter liquid and also begins to relax the cell structure, reducing the spongy oil-absorption that makes eggplant dishes greasy when not pre-salted.",
      visualCue: {
        primaryTarget: "After 30 minutes, dark, bitter liquid has pooled in the colander beneath the eggplants. The cut surfaces have softened and turned slightly tan.",
        spectrum: [
          { state: "Underdone", description: "Less than 15 minutes have passed and no liquid has emerged yet.", action: "Wait the full 30 minutes. The pre-salting step is what allows the eggplant to absorb the olive oil flavors, not the oil itself." },
          { state: "Perfect",   description: "Dark liquid in the colander, noticeably softer flesh, slightly tan surface. The eggplant compresses easily when squeezed.", action: "Rinse lightly, squeeze gently, and pat dry." },
          { state: "Overdone",  description: "More than 1 hour of salting — the eggplant has become very soft and may fall apart when filled.", action: "Handle carefully, fill gently, and proceed." },
        ],
      },
      feelCue: "Squeeze the salted eggplant gently — it should feel noticeably softer and more pliable than before salting. A small amount of dark liquid should be expressible from the flesh.",
    },
    {
      nodeId: "step_2",
      action: "Sauté",
      inputs: ["ing_02", "ing_03", "ing_04", "ing_05", "ing_06"],
      outputState: "filling_mixture",
      instructions: "Heat half the olive oil in a wide pan over medium heat. Cook the onions very slowly for 20 minutes, stirring occasionally, until they are completely soft and golden — they should be jammy and sweet with no raw bite. Add the garlic for the last 3 minutes. Add the tomatoes and cook for 10 more minutes until reduced to a thick, fragrant paste. Season with salt, pepper, and a pinch of sugar. Stir in the parsley. The filling should be very well-seasoned and richly flavored.",
      visualCue: {
        primaryTarget: "A deeply golden, jammy mixture of onion and tomato that holds its shape when mounded on a spoon — thick, fragrant, and glistening with olive oil.",
        spectrum: [
          { state: "Underdone", description: "Onions are still translucent and the tomato is still chunky and separate. The mixture tastes raw and sharp.", action: "Continue cooking. The onions need the full 20 minutes and the tomato needs to fully dissolve into the onions." },
          { state: "Perfect",   description: "Deeply golden, jammy onions completely fused with the tomato. The paste is thick and leaves the pan sides clean when pushed across. The smell is deeply savory and slightly sweet.", action: "Fill the eggplants." },
          { state: "Overdone",  description: "The filling has cooked down too far and is beginning to stick and burn.", action: "Add a splash of water to loosen and remove from heat immediately." },
        ],
      },
      feelCue: "Press the filling against the side of the pan with a spoon — it should move as a cohesive mass, not separate into liquid and solids. The olive oil should be fully integrated, making the mixture shine.",
    },
    {
      nodeId: "step_3",
      action: "Braise",
      inputs: ["salted_eggplant", "filling_mixture", "ing_06"],
      outputState: "braised_imam_bayildi",
      instructions: "Rinse and dry the eggplants. Open the slits and fill generously with the onion-tomato mixture, pressing it in firmly. Arrange in a baking dish or wide pan that holds them snugly upright. Pour the remaining olive oil over and around the eggplants — do not be shy. Pour in 100ml of water. Cover tightly with foil and bake at 180°C (350°F) for 45–55 minutes until the eggplant walls are completely soft and translucent.",
      visualCue: {
        primaryTarget: "The eggplant has turned from opaque purple-beige to translucent, almost glassy, and has softened to the point where it yields completely when pressed. The filling is visible through the slit.",
        spectrum: [
          { state: "Underdone", description: "The eggplant walls still feel firm and opaque. A knife through the wall meets resistance.", action: "Continue baking covered for 10–15 more minutes." },
          { state: "Perfect",   description: "Completely translucent, collapsing walls that yield to the lightest touch. The filling is hot and fragrant. The olive oil has been fully absorbed by the flesh.", action: "Uncover and cool to room temperature before serving." },
          { state: "Overdone",  description: "The eggplant has collapsed entirely and the filling is spilling out — the walls are disintegrating.", action: "Remove from the oven. Serve carefully. The flavor will be excellent even if the presentation is imperfect." },
        ],
      },
      feelCue: "Press the side of a braised eggplant very gently with a spoon — it should yield immediately with no resistance, like pressing into a water balloon. The flesh should feel completely yielding and almost liquid beneath the skin.",
    },
    {
      nodeId: "step_4",
      action: "Cool and serve",
      inputs: ["braised_imam_bayildi"],
      outputState: "finished_imam_bayildi",
      instructions: "Imam bayıldı is traditionally served at room temperature or warm, never hot. Allow to cool for at least 30 minutes after baking. This resting is part of the recipe — the olive oil is reabsorbed as it cools, and the flavors concentrate and integrate. Serve directly from the baking dish, garnished with additional fresh parsley and a drizzle of olive oil. Accompany with crusty bread to catch the accumulated juices.",
      visualCue: {
        primaryTarget: "Room-temperature eggplants, glistening with olive oil, their slit sides opening to reveal the dark golden filling inside. The juices in the dish have thickened to a concentrated, olive-oil-enriched sauce.",
        spectrum: [
          { state: "Underdone", description: "Served too hot — the olive oil is still liquid and pooled rather than integrated into the flesh.", action: "Allow to rest and cool further. Imam bayıldı genuinely improves with time." },
          { state: "Perfect",   description: "Room temperature, deeply savory, collapsed walls saturated with olive oil, filling perfumed and concentrated. It smells like a garden in late summer.", action: "Serve with crusty bread." },
          { state: "Overdone",  description: "Refrigerator-cold — the olive oil has solidified around the eggplant and the dish looks pale and congealed.", action: "Allow to come to room temperature for 45 minutes before serving. Do not microwave — it kills the texture." },
        ],
      },
      feelCue: "Scoop a bite — the eggplant flesh should be completely soft and silky, almost dissolving on the spoon. The olive oil and tomato juices should pool slightly in the spoon. There should be no firmness or resistance whatsoever.",
    },
  ],
};
