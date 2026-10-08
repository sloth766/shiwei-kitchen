export default {
  repoId: "master_greek_prawn_saganaki_001",
  parentRepoId: null,
  slug: "prawn-saganaki",
  author: "ForkRecipe Kitchen",

  title: "Prawn Saganaki",
  description: "Plump prawns baked in a bubbling tomato and ouzo sauce, buried under a slab of crumbled feta that softens without melting, its saltiness pulling all the sweet tomato and briny prawn together into something irresistible. A Greek taverna dish made for a chunk of bread and a glass of cold white wine.",
  cuisine: "Greek",
  culture: "Greek",
  category: "seafood",

  tags: ["saganaki", "prawns", "greek", "tomato", "feta", "baked"],
  difficulty: 2,
  activeTime: "15 min",
  totalTime: "25 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 2, salty: 4, sour: 3, bitter: 1, umami: 4, heat: 2 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Raw shell-on prawns, head-on if possible (16/20 ct)", ratioValue: 600,  defaultUnit: "g",   substitutions: ["large shrimp, peeled and deveined"] },
    { ingId: "ing_02", role: "Protein",   name: "Feta cheese, crumbled into large chunks",              ratioValue: 150,  defaultUnit: "g",   substitutions: ["barrel-aged feta for more pungency"] },
    { ingId: "ing_03", role: "Structure", name: "Canned whole San Marzano tomatoes, hand-crushed",      ratioValue: 400,  defaultUnit: "g",   substitutions: ["fresh ripe tomatoes, grated", "crushed tomatoes"] },
    { ingId: "ing_04", role: "Allium",    name: "Shallots, finely sliced",                              ratioValue: 60,   defaultUnit: "g",   substitutions: ["red onion"] },
    { ingId: "ing_05", role: "Allium",    name: "Garlic cloves, thinly sliced",                         ratioValue: 3,    defaultUnit: "cloves", substitutions: [] },
    { ingId: "ing_06", role: "Fat",       name: "Extra-virgin olive oil",                               ratioValue: 45,   defaultUnit: "ml",  substitutions: [] },
    { ingId: "ing_07", role: "Solvent",   name: "Ouzo or Pernod",                                       ratioValue: 45,   defaultUnit: "ml",  substitutions: ["dry white wine", "Pastis"] },
    { ingId: "ing_08", role: "Spice",     name: "Dried red chili flakes",                               ratioValue: 3,    defaultUnit: "g",   substitutions: ["fresh chili, sliced"] },
    { ingId: "ing_09", role: "Herb",      name: "Fresh oregano, leaves only",                           ratioValue: 5,    defaultUnit: "g",   substitutions: ["dried oregano, 1 tsp"] },
    { ingId: "ing_10", role: "Herb",      name: "Fresh flat-leaf parsley, roughly chopped",             ratioValue: 15,   defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_11", role: "Seasoning", name: "Fine sea salt and black pepper",                       ratioValue: 1,    defaultUnit: "to taste", substitutions: [] },
    { ingId: "ing_12", role: "Sweetener", name: "Pinch of sugar",                                       ratioValue: 2,    defaultUnit: "g",   substitutions: ["honey, 1/2 tsp"] },
    { ingId: "ing_13", role: "Garnish",   name: "Crusty bread, for serving",                            ratioValue: 1,    defaultUnit: "loaf", substitutions: ["pita bread"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Build tomato base",
      inputs: ["ing_06", "ing_04", "ing_05", "ing_08", "ing_03", "ing_09", "ing_12", "ing_11"],
      outputState: "tomato_sauce",
      instructions: "Heat olive oil in a 25–30 cm oven-safe skillet (preferably cast-iron or a ceramic saganaki dish) over medium heat. Add shallots and cook for 3–4 minutes until softened. Add garlic and chili flakes, stir 30 seconds. Add ouzo — it will flame dramatically if using a gas burner; tilt the pan away from you and let the flames die naturally (about 10 seconds). Pour in the hand-crushed tomatoes and their juices, add oregano and a pinch of sugar. Simmer for 8–10 minutes, stirring occasionally, until the sauce has thickened and darkened slightly. Season with salt and pepper.",
      visualCue: {
        primaryTarget: "A thick, brick-red tomato sauce that holds its shape when a spoon is drawn through it, with just a slight pool of red oil forming at the edges. The sauce should be fragrant with the anise note of ouzo.",
        spectrum: [
          { state: "Underdone", description: "Sauce is thin and watery, tomatoes still chunky and raw-tasting. Runs to fill immediately when a spoon parts it.", action: "Continue simmering — the tomatoes need to break down and concentrate." },
          { state: "Perfect",   description: "Thick, glossy, dark-red sauce. Holds a channel when a spoon parts it. Smells of cooked tomato, herbs, and a whisper of anise. A thin film of red olive oil at the edges.", action: "Nestle the prawns into the sauce." },
          { state: "Overdone",  description: "Sauce has become dark and paste-like, beginning to stick to the pan bottom. Smells deeply concentrated, almost jammy.", action: "Add 2–3 tablespoons of water and stir to loosen before adding the prawns." },
        ],
      },
      feelCue: "Hold your hand over the pan — the steam rising from the sauce should smell of tomato and wine and faintly of anise, like a Greek summer kitchen.",
    },
    {
      nodeId: "step_2",
      action: "Add prawns and feta",
      inputs: ["tomato_sauce", "ing_01", "ing_02"],
      outputState: "assembled_saganaki",
      instructions: "Preheat the oven to 220°C (425°F). Nestle the prawns into the bubbling tomato sauce in a single layer, pressing them down gently. Scatter the crumbled feta over and around the prawns in large, irregular chunks — do not crumble it too finely, you want visible pieces that remain distinct when baked. The feta should cover perhaps 60% of the surface, leaving gaps of tomato visible.",
      visualCue: {
        primaryTarget: "Prawns arranged in a single layer, still raw-grey, nestled into the red sauce. Large irregular chunks of white feta scattered across the top like snowfall on a red earth. Sauce still bubbling at the edges of the pan.",
        spectrum: [
          { state: "Underdone", description: "Prawns piled on top of each other. Feta crumbled too finely into powder. Sauce not bubbling before going into the oven.", action: "Rearrange prawns into a single layer. The sauce should be hot before it enters the oven so the baking time is accurate." },
          { state: "Perfect",   description: "Prawns evenly spaced in a single layer. Large feta chunks visible with gaps of red sauce between. Pan is hot and sauce is actively simmering.", action: "Into the oven immediately." },
          { state: "Overdone",  description: "N/A — this is an assembly step with no cooking yet applied to the prawns.", action: "Proceed to the oven." },
        ],
      },
      feelCue: "The handle of the pan should be warm to the touch from the stovetop simmer — carry it to the oven carefully and place it on the top rack.",
    },
    {
      nodeId: "step_3",
      action: "Bake",
      inputs: ["assembled_saganaki"],
      outputState: "baked_saganaki",
      instructions: "Bake at 220°C (425°F) on the top rack for 8–10 minutes. The prawns will turn from grey to pink-orange, the feta will soften but not melt (it holds its shape unlike most cheeses), and the exposed sauce around the edges will bubble and concentrate, possibly catching color on the pan rim. The feta's surface may pick up a touch of golden color.",
      visualCue: {
        primaryTarget: "Prawns are fully pink-orange throughout. Feta has softened and may show golden tipping on exposed faces. Sauce is bubbling actively at the edges. The kitchen smells of roasting tomato, baked cheese, and anise.",
        spectrum: [
          { state: "Underdone", description: "Prawns still grey-pink near the head end. Feta chunks still white and firm-looking without any color.", action: "Return to oven for 2–3 minutes. Check by pressing a prawn — it should feel firm, not squishy." },
          { state: "Perfect",   description: "All prawns fully pink-orange, even at the thickest point near the head. Feta is creamy and soft-looking but still intact as distinct pieces. Sauce is deeply fragrant and slightly caramelized at the pan edges.", action: "Remove from oven. Scatter parsley and rush to the table." },
          { state: "Overdone",  description: "Prawn tails have contracted and begun to curl tightly upward, indicating the flesh inside has dried. Feta may be browning aggressively.", action: "Remove immediately. Squeeze lemon over the top to add back moisture and acidity." },
        ],
      },
      feelCue: "Press the tail of a prawn through the sauce — a done prawn springs back firmly with a definite resistance, like a firm gel. A rubbery, tight snap means overcooked; a soft squish means undercooked.",
    },
    {
      nodeId: "step_4",
      action: "Garnish and serve",
      inputs: ["baked_saganaki", "ing_10", "ing_13"],
      outputState: "finished_prawn_saganaki",
      instructions: "Bring the pan straight from the oven to the table — saganaki is a tableside experience and must be eaten from the pan while it is still bubbling. Scatter fresh parsley generously over the top. Serve with hunks of crusty bread for dragging through the sauce. To eat shell-on prawns: twist off the head (suck it — the inside is extraordinary), peel the body shell, eat.",
      visualCue: {
        primaryTarget: "The pan is still bubbling when it arrives at the table. A vivid tableau: bright pink prawns, white-and-golden feta chunks, scarlet sauce, bright green parsley. Steam rising.",
        spectrum: [
          { state: "Underdone", description: "Pan allowed to cool before serving. Sauce has set and lost its glossy fluidity. Feta has firmed back up.", action: "Return briefly to a hot oven (2 minutes) to re-bubble. Saganaki is always served aggressively hot." },
          { state: "Perfect",   description: "Arriving at the table still sizzling. The sauce is thin enough to pool into bread but thick enough to cling to the prawn. Feta is creamy and yielding. The room smells of Greece.", action: "Eat immediately with cold white wine." },
          { state: "Overdone",  description: "N/A at this final stage. Arrive at the table quickly and the dish speaks for itself.", action: "Eat while hot." },
        ],
      },
      feelCue: "A proper saganaki arrives making a sound — the low, lazy bubble of a sauce that has not quite decided to stop cooking. That sound, and the smell of tomato and baked feta, is the whole dish announcing itself.",
    },
  ],
};
