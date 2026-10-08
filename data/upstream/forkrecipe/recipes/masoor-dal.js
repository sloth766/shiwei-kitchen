export default {
  repoId: "master_indian_masoor_dal_001",
  parentRepoId: null,
  slug: "masoor-dal",
  author: "ForkRecipe Kitchen",

  title: "Masoor Dal (Red Lentil Soup)",
  description: "Split red lentils that melt into golden silk in under thirty minutes, then meet a tarka of mustard seeds, cumin, and dried chili that hits the surface with a hiss and an aroma that fills the kitchen before the spoon reaches the bowl.",
  cuisine: "Indian",
  culture: "Bengali",
  category: "grains",

  tags: ["indian", "lentils", "vegan", "quick", "everyday"],
  difficulty: 1,
  activeTime: "15 min",
  totalTime: "35 min",
  ratioSystem: "parts",

  stars: 1542,
  forks: 178,
  contributors: 19,
  license: "CC-BY-SA",
  createdAt: "2024-08-30",
  updatedAt: "2025-04-12",

  flavorRadar: { sweet: 1, salty: 3, sour: 1, bitter: 0, umami: 2, heat: 2 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Red split lentils (masoor dal), rinsed",         ratioValue: 100, defaultUnit: "parts", substitutions: ["yellow split lentils (chana dal)"] },
    { ingId: "ing_02", role: "Umami",      name: "Ripe tomatoes, roughly chopped",                  ratioValue: 40,  defaultUnit: "parts", substitutions: ["canned diced tomatoes"] },
    { ingId: "ing_03", role: "Allium",     name: "Yellow onion, finely chopped",                    ratioValue: 30,  defaultUnit: "parts", substitutions: ["shallots"] },
    { ingId: "ing_04", role: "Aromatic",   name: "Ginger-garlic paste",                             ratioValue: 6,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Spice",      name: "Tarka spices (mustard seeds, cumin seeds, dried red chili, turmeric)", ratioValue: 4, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Fat",        name: "Mustard oil or ghee (for tarka)",                 ratioValue: 8,   defaultUnit: "parts", substitutions: ["sunflower oil"] },
    { ingId: "ing_07", role: "Acid",       name: "Fresh lemon juice",                               ratioValue: 5,   defaultUnit: "parts", substitutions: ["lime juice", "amchur powder"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Simmer",
      inputs: ["ing_01", "ing_02", "ing_04"],
      outputState: "cooked_dal",
      instructions: "Combine rinsed lentils, tomatoes, ginger-garlic paste, and 2.5 parts water in a medium saucepan. Add a pinch of turmeric. Bring to a boil over medium-high heat, then reduce to a brisk simmer. Cook uncovered for 15–20 minutes, stirring occasionally, until lentils have completely dissolved into the tomatoes and the mixture is thick and smooth. The lentils will turn from orange-red to golden yellow as they cook.",
      visualCue: {
        primaryTarget: "The dal is uniformly smooth and golden-yellow with no visible distinct lentils. The consistency is between a thick soup and a porridge — it flows slowly from a stirred spoon.",
        spectrum: [
          { state: "Underdone", description: "Individual lentils are still visible and hold their shape. The liquid is thin and orange-red, with a grainy rather than smooth texture.", action: "Continue simmering uncovered for 5–8 more minutes. Stir to prevent sticking. The lentils dissolve quickly once they reach temperature." },
          { state: "Perfect",   description: "Completely smooth and golden — no visible lentil shapes. Thick enough to mound slightly when a spoon is dragged across the surface. Smells lightly of cooked tomato and earth.", action: "Season with salt. The tarka will go on top — have the oil and spices ready before the next step." },
          { state: "Overdone",  description: "Dal is very thick and sticking to the bottom of the pan, producing a burnt smell. It has the consistency of mashed potatoes.", action: "Add 60ml water and stir vigorously, scraping the bottom. Thin to desired consistency and reduce heat immediately." },
        ],
      },
      feelCue: "Drag a spoon across the surface of the cooked dal — the trail should slowly fill back in over 3–4 seconds. Too fast and it is too thin; if it holds rigid, it is too thick.",
    },
    {
      nodeId: "step_2",
      action: "Bloom",
      inputs: ["ing_05", "ing_06"],
      outputState: "tarka",
      instructions: "In a small pan or ladle, heat mustard oil over high heat until it begins to smoke lightly (smoking point neutralizes mustard oil's harsh raw flavour). Add mustard seeds and wait for them to pop and splutter. Add cumin seeds — they will darken within 10 seconds. Add dried red chili and fry for 5 seconds. The entire tarka happens in under 30 seconds — have all spices measured and ready before heating the oil.",
      visualCue: {
        primaryTarget: "The oil is shimmering, mustard seeds are popping audibly, cumin seeds are dark brown and fragrant, and the chili has puffed and darkened slightly.",
        spectrum: [
          { state: "Underdone", description: "Oil is not hot enough — seeds sink and sit quietly in the oil rather than popping. The tarka will smell raw and oily rather than toasted.", action: "Wait for the oil to reach smoking point. High heat is mandatory for proper tarka — tempering at low heat produces flat, greasy flavour." },
          { state: "Perfect",   description: "Mustard seeds are popping vigorously like tiny firecrackers. Cumin seeds are dark golden-brown and filling the kitchen with a toasted, nutty aroma. Chili has expanded and darkened.", action: "Pour immediately over the dal — do not delay. The spices continue cooking in the residual oil heat." },
          { state: "Overdone",  description: "Mustard seeds have stopped popping and are charred. Cumin is black. Chili is blackened and smoking. The tarka smells bitter and acrid.", action: "Discard and start again. Burnt tarka will ruin the dal — the acrid bitterness cannot be masked." },
        ],
      },
      feelCue: "You should hear the tarka before you see it — the aggressive pop and crackle of mustard seeds in very hot oil is unmistakable and should start within 3–5 seconds of the seeds hitting the oil.",
    },
    {
      nodeId: "step_3",
      action: "Finish",
      inputs: ["cooked_dal", "tarka", "ing_03", "ing_07"],
      outputState: "finished_masoor_dal",
      instructions: "In the same dal pot, if including raw onion sauté it until golden in 1 tbsp oil, then combine with the dal. Pour the sizzling tarka directly over the surface of the dal in one decisive move. The oil will hit the dal with a dramatic hiss. Stir to incorporate. Add lemon juice, taste and adjust salt. The acidity brightens and lifts the entire dish — add it at the end, never during cooking.",
      visualCue: {
        primaryTarget: "The golden dal now has swirls of dark aromatic oil on the surface, dotted with visible cumin seeds, chili pieces, and popped mustard seeds.",
        spectrum: [
          { state: "Underdone", description: "The dal looks unchanged — tarka was not hot enough when poured and has sunk in without a visible reaction. The dal smells like plain cooked lentils.", action: "If the tarka cooled before pouring, reheat the dal and make a fresh tarka. Cold oil and spices won't bloom properly in the dal." },
          { state: "Perfect",   description: "The surface shows a vivid aromatic sheen with a complex landscape of spices. One stir releases a bloom of warm, toasted, smoky fragrance. The flavour is deep, balanced, and bright with lemon.", action: "Serve immediately in bowls with steamed rice. The tarka fragrance dissipates within minutes." },
          { state: "Overdone",  description: "Too much lemon juice added — the dal tastes aggressively sour and the spice balance is drowned. The colour has shifted towards tan from the acid.", action: "Add a small pinch of sugar and extra salt to rebalance. A tiny knob of butter will also smooth the sharpness." },
        ],
      },
      feelCue: "The moment the tarka hits the dal, the kitchen should flood with a wave of fragrance — toasted cumin, smoky chili, and the grassy punch of mustard. If the aroma is flat, the tarka was not hot enough.",
    },
  ],
};
