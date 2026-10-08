export default {
  repoId: "master_levantine_cauliflower_shawarma_001",
  parentRepoId: null,
  slug: "cauliflower-shawarma",
  author: "ForkRecipe Kitchen",

  title: "Cauliflower Shawarma",
  description: "A whole cauliflower head lacquered in warm spices and roasted until the florets caramelise to a crackling amber — crunchy where exposed, yielding and smoky at the core.",
  cuisine: "Levantine",
  culture: "Levantine",
  category: "vegetables",

  tags: ["levantine", "cauliflower", "vegan", "roasted", "shawarma-spice"],
  difficulty: 1,
  activeTime: "15 min",
  totalTime: "45 min",
  ratioSystem: "parts",

  stars: 987,
  forks: 128,
  contributors: 19,
  license: "CC-BY-SA",
  createdAt: "2024-06-01",
  updatedAt: "2025-08-14",

  flavorRadar: { sweet: 1, salty: 2, sour: 2, bitter: 1, umami: 2, heat: 2 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Cauliflower, cut into large florets",            ratioValue: 100, defaultUnit: "parts", substitutions: ["broccoli", "romanesco"] },
    { ingId: "ing_02", role: "Fat",        name: "Olive oil",                                       ratioValue: 12,  defaultUnit: "parts", substitutions: ["avocado oil"] },
    { ingId: "ing_03", role: "Spice",      name: "Shawarma spice blend (cumin, coriander, turmeric, smoked paprika, cinnamon, allspice)", ratioValue: 6, defaultUnit: "parts", substitutions: ["ras el hanout"] },
    { ingId: "ing_04", role: "Seasoning",  name: "Fine sea salt",                                   ratioValue: 2,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Acid",       name: "Lemon juice, freshly squeezed",                   ratioValue: 5,   defaultUnit: "parts", substitutions: ["white wine vinegar"] },
    { ingId: "ing_06", role: "Garnish",    name: "Fresh flat-leaf parsley, roughly chopped",        ratioValue: 3,   defaultUnit: "parts", substitutions: ["fresh coriander"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Mix",
      inputs: ["ing_02", "ing_03", "ing_04"],
      outputState: "shawarma_paste",
      instructions: "In a large bowl, whisk together the olive oil, shawarma spice blend, and salt into a thick, fragrant paste. The oil should be fully absorbed by the spices — no separation. This paste needs to coat each floret generously, so make sure the consistency is thick enough to cling rather than drip.",
      visualCue: {
        primaryTarget: "A uniformly orange-gold paste with no pools of oil sitting on top. The spices are fully dispersed and the mixture has a paste-like consistency.",
        spectrum: [
          { state: "Underdone", description: "Spices are still powdery in pockets and oil sits separate on top. Mixture looks streaky.", action: "Whisk more vigorously. The oil needs time to fully hydrate the ground spices." },
          { state: "Perfect",   description: "Smooth, thick, evenly orange paste. All spices are fully incorporated and the mixture holds on a spoon without dripping.", action: "Add the cauliflower and toss to coat." },
          { state: "Overdone",  description: "Paste has been over-mixed and is beginning to separate again, looking greasy.", action: "Proceed — over-mixing the marinade does not harm it. The paste will still coat the florets." },
        ],
      },
      feelCue: "The paste should smell intensely of toasted cumin and smoke — if it smells only of raw powder, bloom the spices in the oil in a small pan for 30 seconds first.",
    },
    {
      nodeId: "step_2",
      action: "Coat and rest",
      inputs: ["shawarma_paste", "ing_01"],
      outputState: "marinated_cauliflower",
      instructions: "Add the cauliflower florets to the bowl of paste and toss thoroughly, using your hands to work the paste into every crevice. The more surface area covered, the more caramelisation you will get. Let the cauliflower rest in the marinade for at least 10 minutes while the oven preheats to 220°C (425°F).",
      visualCue: {
        primaryTarget: "Every floret is uniformly coated in deep orange paste. No white cauliflower is visible. The surface looks matte and almost velvety.",
        spectrum: [
          { state: "Underdone", description: "Large patches of white cauliflower visible. Paste is sitting on the surface rather than worked in.", action: "Continue massaging with your hands — fingers reach where spoons cannot." },
          { state: "Perfect",   description: "Uniform, even coat of paste over every surface. Florets look matte orange-gold. The paste has begun to absorb into the cut faces.", action: "Spread on a baking sheet and roast." },
          { state: "Overdone",  description: "Cauliflower has been over-handled and some florets are beginning to break apart.", action: "Proceed to roasting — the smaller pieces will caramelise faster and become crispy." },
        ],
      },
      feelCue: "Each floret should feel evenly slicked and slightly tacky under your fingers — if you can feel dry, rough patches, toss again.",
    },
    {
      nodeId: "step_3",
      action: "Roast",
      inputs: ["marinated_cauliflower"],
      outputState: "roasted_cauliflower",
      instructions: "Spread the coated florets in a single layer on a large baking sheet, cut-side down where possible. Roast at 220°C for 25–30 minutes, without stirring for the first 20 minutes. The high heat and stillness are what create the deep caramelised crust. After 20 minutes, check and flip any pieces that are very dark underneath.",
      visualCue: {
        primaryTarget: "Florets are deeply caramelised on the cut faces — dark amber to charred edges — while the interior is tender and steaming when pierced.",
        spectrum: [
          { state: "Underdone", description: "Florets are soft but pale yellow-orange. No caramelised crust. They look steamed rather than roasted.", action: "Return to the oven for 10 more minutes. The oven may need more time to reach temperature — check with a thermometer." },
          { state: "Perfect",   description: "Deep amber-brown crust on the cut faces, with some edges approaching charred. The cauliflower is tender when pierced with a knife but still holds its shape.", action: "Remove from the oven and finish with lemon juice and parsley." },
          { state: "Overdone",  description: "Many florets have blackened and the spices smell acrid. The centres are very soft and beginning to collapse.", action: "Remove immediately. The charred bits can be trimmed — the flavour will be more bitter-smoky." },
        ],
      },
      feelCue: "A fork should slide into the thickest part with almost no resistance, like pushing into soft butter — but the exterior should have a slight crust that gives a faint crunch when tapped.",
    },
    {
      nodeId: "step_4",
      action: "Finish and serve",
      inputs: ["roasted_cauliflower", "ing_05", "ing_06"],
      outputState: "finished_shawarma",
      instructions: "Transfer the roasted cauliflower to a serving platter immediately. Squeeze the fresh lemon juice over the top while still hot — the acid will sizzle on contact and lift the caramelised spices. Scatter with chopped flat-leaf parsley. Serve immediately as the crust softens as it sits.",
      visualCue: {
        primaryTarget: "Glistening amber florets on the platter, flecked with bright green parsley, with wisps of steam still rising.",
        spectrum: [
          { state: "Underdone", description: "Cauliflower still looks dry and dull, with no lemon sheen.", action: "Add more lemon juice — acid is the flavour bridge that ties the spice to the sweet caramelisation." },
          { state: "Perfect",   description: "Florets glisten from the lemon, parsley is vivid green and fresh-smelling. Steam is still rising from the hot cauliflower.", action: "Serve immediately." },
          { state: "Overdone",  description: "Cauliflower has sat too long, the crust has softened and the parsley has wilted to dark green.", action: "The flavour is still good. Next time, plate at the last second — this dish does not wait." },
        ],
      },
      feelCue: "The lemon hitting the hot spiced surface should produce a brief, fragrant hiss and a bloom of citrus-spice steam — that moment is the aroma peak of the dish.",
    },
  ],
};
