export default {
  repoId: "master_thai_larb_001",
  parentRepoId: null,
  slug: "larb",
  author: "ForkRecipe Kitchen",

  title: "Larb Moo",
  description: "A Northeastern Thai salad of minced pork cooked in its own rendered fat and doused with lime juice and fish sauce, the meat still steaming when it hits a blizzard of fresh herbs, shallots, and toasted rice powder that soaks up every last drop of the hot, sour, savoury dressing.",
  cuisine: "Thai",
  culture: "Isaan",
  category: "proteins",

  tags: ["minced pork", "herbs", "thai", "isaan", "lime"],
  difficulty: 2,
  activeTime: "20 min",
  totalTime: "25 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",

  // 0–5 scale. Lime and fish sauce push sour and salty hard; toasted spice adds bitterness.
  flavorRadar: { sweet: 1, salty: 4, sour: 5, bitter: 2, umami: 3, heat: 3 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Minced pork (20% fat minimum)",                          ratioValue: 4,    defaultUnit: "parts", substitutions: ["minced chicken thigh", "minced duck"] },
    { ingId: "ing_02", role: "Acid",      name: "Fresh lime juice (2–3 limes)",                          ratioValue: 1.5,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Seasoning", name: "Fish sauce (Tiparos preferred)",                        ratioValue: 1,    defaultUnit: "parts", substitutions: ["soy sauce for vegetarian"] },
    { ingId: "ing_04", role: "Spice",     name: "Dried chili flakes (prik bon), toasted",               ratioValue: 0.5,  defaultUnit: "parts", substitutions: ["fresh bird's eye chili, thinly sliced"] },
    { ingId: "ing_05", role: "Starch",    name: "Khao khua: raw glutinous or jasmine rice, dry-toasted", ratioValue: 0.5,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Allium",    name: "Asian shallots (4–5 small), thinly sliced into rings",  ratioValue: 1,    defaultUnit: "parts", substitutions: ["red onion, soaked in cold water"] },
    { ingId: "ing_07", role: "Herb",      name: "Fresh mint leaves",                                     ratioValue: 1,    defaultUnit: "parts", substitutions: ["Vietnamese mint (laksa leaf)"] },
    { ingId: "ing_08", role: "Herb",      name: "Fresh sawtooth coriander (culantro), sliced",          ratioValue: 0.5,  defaultUnit: "parts", substitutions: ["regular coriander (cilantro)"] },
    { ingId: "ing_09", role: "Aromatic",  name: "Lemongrass stalk, inner tender part only, very finely sliced", ratioValue: 0.5, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_10", role: "Garnish",   name: "Cabbage wedges and cucumber slices, to serve",          ratioValue: 2,    defaultUnit: "parts", substitutions: ["lettuce cups"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Toast",
      inputs: ["ing_05"],
      outputState: "khao_khua",
      instructions: "Place raw rice in a dry wok or small heavy pan over medium heat. Stir continuously with a wooden spoon or shake the pan constantly for 5–8 minutes until every grain has turned a deep golden-brown — the colour of a perfect wood-fired crouton. The rice will smell nutty, toasty, and faintly smoky. Allow to cool, then pound in a mortar or pulse in a spice grinder until you have a coarse powder — not fine flour, but irregular gritty crumbs the size of coarse sea salt. This toasted rice powder (khao khua) is what makes larb larb: it absorbs the dressing, thickens it slightly, and adds a nutty, slightly bitter back-note to every bite.",
      visualCue: {
        primaryTarget: "Deep golden-brown grains, uniform in colour, with a toasted, popcorn-like aroma. No pale grains, no burnt-black grains.",
        spectrum: [
          { state: "Underdone", description: "Grains are pale gold or unevenly coloured. The powder tastes starchy rather than nutty.", action: "Continue toasting on medium heat. Be patient — the colour deepens quickly in the last 90 seconds." },
          { state: "Perfect",   description: "All grains a deep even gold. The smell is intensely nutty, like roasted peanuts. The ground powder has a warm, complex aroma.", action: "Cool and pound to a coarse powder." },
          { state: "Overdone",  description: "Several grains have turned dark brown or black. The powder will be acrid and bitter.", action: "Pick out any burnt grains before grinding, or discard and start again — burnt khao khua ruins the dish." },
        ],
      },
      feelCue: "When you grind the toasted rice, the powder should feel gritty between your fingers like coarse polenta — not fine and floury. That texture is what gives larb its characteristic slight crunch.",
    },
    {
      nodeId: "step_2",
      action: "Heat",
      inputs: ["ing_01"],
      outputState: "cooked_pork",
      instructions: "Place the minced pork in a cold wok or wide pan — do not add oil, the pork fat will render. Set over medium-high heat and cook, breaking up the mince with a wooden spoon, for 4–5 minutes. You want the pork cooked through with some slight caramelisation around the edges — not a steamed grey mass and not a dry, hard crumble. Remove from heat as soon as the pork is just cooked. Transfer immediately to a large mixing bowl. The pork should still be steaming hot when you dress it — the heat blooms the herbs and opens up the lime.",
      visualCue: {
        primaryTarget: "Pork is cooked through and light brown with some caramelised edges. No pink, no grey water pooling around the meat. The fat has rendered and the meat looks slightly glossy.",
        spectrum: [
          { state: "Underdone", description: "Pork is still pink in patches. Liquid is pooling around the meat — it is steaming rather than frying.", action: "Drain any excess liquid and raise heat. Continue cooking until no pink remains." },
          { state: "Perfect",   description: "Cooked through, with some browning on the clumps that settled against the pan. Fat has rendered and coats the meat. Still steaming.", action: "Transfer to the mixing bowl immediately and dress while hot." },
          { state: "Overdone",  description: "Pork is dry, hard, and crumbling. All fat has cooked off and the meat is sticking to the pan.", action: "Proceed — it will still taste good dressed, but the texture will be less juicy. Add a touch more lime juice and fish sauce to rehydrate slightly." },
        ],
      },
      feelCue: "Freshly cooked pork mince should feel loosely textured and slightly moist when pressed with the back of a spoon — it should yield like coarse wet sand, not bounce back like rubber or crumble like dry breadcrumbs.",
    },
    {
      nodeId: "step_3",
      action: "Mix",
      inputs: ["cooked_pork", "ing_02", "ing_03", "ing_04"],
      outputState: "dressed_larb",
      instructions: "Working quickly while the pork is still very hot, add lime juice, fish sauce, and toasted chili flakes to the bowl. Toss aggressively — the acidity of the lime will stop the carryover cooking. Taste immediately: the dressing should be aggressively sour and salty with a chili hit at the back. Larb is intentionally bold — if it seems too intense in the bowl, it will balance beautifully when eaten with plain rice and fresh vegetables. Adjust: more lime for sour, more fish sauce for savoury depth, more chili for heat.",
      visualCue: {
        primaryTarget: "The pork looks glossy and lightly dressed, glistening with lime juice. The colour is warm brown-pink. Steam is still rising.",
        spectrum: [
          { state: "Underdone", description: "Dressing not yet added. The pork is cooling rapidly and will be cold before the herbs are added.", action: "Dress immediately — cold larb is a different (less good) dish." },
          { state: "Perfect",   description: "Hot, glossy, aggressively seasoned pork. You taste it and your mouth puckers from the lime and blooms with chili heat. The fish sauce gives umami depth.", action: "Add the herbs and rice powder immediately." },
          { state: "Overdone",  description: "Too much fish sauce or lime was added and the dressing is overwhelming. Pork tastes pickled.", action: "Balance by adding a pinch of sugar and a tablespoon of finely sliced fresh lemongrass to cut through." },
        ],
      },
      feelCue: "When you stir the dressed pork, it should smell like a market larb stall — hot lime steam, fish sauce funk, and dried chili warmth all hitting the face at once.",
    },
    {
      nodeId: "step_4",
      action: "Toss",
      inputs: ["dressed_larb", "khao_khua", "ing_06", "ing_07", "ing_08", "ing_09"],
      outputState: "finished_larb",
      instructions: "Add the toasted rice powder, sliced shallots, mint leaves (torn if large), sawtooth coriander, and lemongrass to the dressed pork. Toss gently but thoroughly, distributing all the herbs and powder evenly through the meat. The khao khua will immediately begin absorbing the dressing and thickening it slightly. Taste one more time and adjust seasoning if necessary. Serve immediately on a plate or in a shallow bowl with the cabbage wedges and cucumber slices on the side — these are not garnish, they are structural: you use them to scoop the larb and cool the heat.",
      visualCue: {
        primaryTarget: "A warm, fragrant mound of pork studded with bright green mint and herb shreds, pale shallot rings, and dusted with tan rice powder. Still steaming faintly.",
        spectrum: [
          { state: "Underdone", description: "Herbs just scattered on top, not tossed in. Rice powder not added. Larb tastes flat and unherbed.", action: "Toss everything together so every piece of pork has herb and rice powder coverage." },
          { state: "Perfect",   description: "Herbs are wilted very slightly by the heat of the pork, releasing their fragrance. Shallots retain crunch. Rice powder has thickened the dressing to a glaze.", action: "Plate immediately and serve at once." },
          { state: "Overdone",  description: "Larb has been sitting for 15 minutes — herbs are fully wilted and dark, shallots have softened, rice powder has dissolved into the dressing.", action: "It is still edible but has lost freshness. Dress with a handful of fresh mint leaves and a final squeeze of lime to revive it." },
        ],
      },
      feelCue: "The finished larb should be warm enough that the mint slightly wilts on contact and releases its menthol aroma into your face when you lean over the bowl — that steaming-herb perfume is the signature of larb cooked and dressed correctly.",
    },
  ],
};
