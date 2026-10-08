export default {
  repoId: "master_american_new_england_clam_chowder_001",
  parentRepoId: null,
  slug: "new-england-clam-chowder",
  author: "ForkRecipe Kitchen",

  title: "New England Clam Chowder",
  description: "A bowl of ivory cream thickened with tender potatoes and salt pork, shot through with briny, sweet clam liquor — every spoonful carries the cold Atlantic inside it.",
  cuisine: "American",
  culture: "New England",
  category: "seafood",

  tags: ["american", "clam", "chowder", "creamy", "soup"],
  difficulty: 2,
  activeTime: "30 min",
  totalTime: "50 min",
  ratioSystem: "parts",

  stars: 1834,
  forks: 143,
  contributors: 19,
  license: "CC-BY-SA",
  createdAt: "2024-06-20",
  updatedAt: "2025-05-11",

  flavorRadar: { sweet: 1, salty: 4, sour: 0, bitter: 0, umami: 4, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Chopped clams, canned or fresh (with liquor reserved)", ratioValue: 30, defaultUnit: "parts", substitutions: ["fresh littleneck clams, steamed and shucked", "razor clams"] },
    { ingId: "ing_02", role: "Fat",       name: "Salt pork or thick-cut bacon, diced",                   ratioValue: 8,  defaultUnit: "parts", substitutions: ["pancetta", "smoked bacon"] },
    { ingId: "ing_03", role: "Allium",    name: "Yellow onion, diced",                                    ratioValue: 15, defaultUnit: "parts", substitutions: ["shallot", "leek whites"] },
    { ingId: "ing_04", role: "Starch",    name: "Yukon Gold potatoes, peeled and diced 1cm",             ratioValue: 25, defaultUnit: "parts", substitutions: ["Russet potatoes", "red-skinned potatoes"] },
    { ingId: "ing_05", role: "Dairy",     name: "Heavy cream",                                            ratioValue: 20, defaultUnit: "parts", substitutions: ["half-and-half", "whole milk (thinner)"] },
    { ingId: "ing_06", role: "Structure", name: "All-purpose flour",                                      ratioValue: 3,  defaultUnit: "parts", substitutions: ["cornstarch slurry (use half the amount)"] },
    { ingId: "ing_07", role: "Seasoning", name: "Kosher salt, white pepper, and fresh thyme",            ratioValue: 2,  defaultUnit: "parts", substitutions: ["black pepper", "dried thyme"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Render salt pork",
      inputs: ["ing_02"],
      outputState: "rendered_fat_and_pork",
      instructions: "Place the diced salt pork in a cold, heavy-bottomed pot or Dutch oven and set over medium-low heat. Cook slowly, stirring occasionally, for 8–10 minutes until the fat has fully rendered and the pork bits are golden and crispy. Starting cold ensures maximum fat extraction. Remove the crispy pork bits with a slotted spoon and reserve.",
      visualCue: {
        primaryTarget: "A generous pool of clear, golden-white rendered fat in the pot. The pork pieces are shrunken, golden-brown, and crispy throughout.",
        spectrum: [
          { state: "Underdone", description: "Pork bits are still soft and pale. Fat has not fully released — the pieces look floppy and translucent.", action: "Continue on medium-low heat. Raising the heat will brown the outside before the interior fat renders — you want slow, thorough rendering." },
          { state: "Perfect",   description: "Pork bits are small, golden, and crisp. A pool of rendered fat coats the bottom of the pot evenly. The fat smells sweet and porky.", action: "Remove pork bits with a slotted spoon. Leave all the fat in the pot." },
          { state: "Overdone",  description: "Pork bits are dark brown to black and smell acrid. Fat may have started to smoke.", action: "Remove and discard the burnt bits. The fat in the pot should still be usable if it hasn't smoked too much. Proceed with caution." },
        ],
      },
      feelCue: "The pork bits, when pressed between fingers, should feel firm and crispy — like small croutons — with no soft or rubbery center.",
    },
    {
      nodeId: "step_2",
      action: "Sweat onion and build roux",
      inputs: ["rendered_fat_and_pork", "ing_03", "ing_06", "ing_07"],
      outputState: "onion_roux_base",
      instructions: "Add the diced onion to the rendered fat over medium heat and cook, stirring occasionally, for 5–7 minutes until soft and translucent but not browned. Sprinkle the flour over the onions and stir continuously for 1–2 minutes, coating every piece of onion. This blonde roux is the chowder's body — it must cook enough to lose its raw flour taste but must not take on any color.",
      visualCue: {
        primaryTarget: "Onions are soft, glassy, and translucent. The flour has coated them in a pasty layer that smells faintly nutty. The mixture clumps slightly when stirred.",
        spectrum: [
          { state: "Underdone", description: "Onions are still partially opaque, with a bite when pressed. Flour is powdery and smells raw. The chowder will taste starchy if you proceed now.", action: "Continue cooking the roux, stirring constantly. The flour needs at least 90 seconds of heat to cook out its raw flavor." },
          { state: "Perfect",   description: "Onions are completely soft and translucent. Flour is cooked into a smooth paste — slightly gummy, smells like warm bread rather than raw starch.", action: "Begin adding clam liquor gradually." },
          { state: "Overdone",  description: "Onions have browned at the edges. The roux has taken on a tan color. The chowder will taste more like a brown sauce and less like a pure, creamy New England chowder.", action: "Proceed — the flavor will still be good, just less classic. Reduce heat for the next step." },
        ],
      },
      feelCue: "Run a spoon through the roux-coated onions — it should drag slightly and leave a trail that fills in slowly, like very thick oatmeal. The smell should be warm wheat and sweet onion.",
    },
    {
      nodeId: "step_3",
      action: "Simmer potatoes",
      inputs: ["onion_roux_base", "ing_04", "ing_01"],
      outputState: "chowder_base",
      instructions: "Pour the reserved clam liquor plus enough water or clam juice to cover the potatoes by 2cm into the pot while whisking to prevent lumps. Add the diced potatoes. Bring to a gentle simmer and cook for 12–15 minutes until the potatoes are tender but still holding their shape. Do not boil vigorously — aggressive boiling will cause the potatoes to break apart and make the chowder muddy.",
      visualCue: {
        primaryTarget: "The broth is creamy-ivory and gently bubbling. Potato cubes are tender when pierced with a knife but hold their cube shape. The liquid has thickened slightly from the potato starch.",
        spectrum: [
          { state: "Underdone", description: "Potatoes resist the knife and feel chalky when bitten. Broth is still thin and watery. Cubes are bright white.", action: "Continue simmering for 3–5 more minutes. Test again with a knife — it should glide in with no resistance." },
          { state: "Perfect",   description: "Potatoes yield easily to a knife with a faint pop. They hold their shape but have a creamy, yielding interior. Broth is slightly thickened and pearlescent.", action: "Add the clams and cream." },
          { state: "Overdone",  description: "Potato cubes have begun to fall apart, edges are dissolving into the broth. Broth is cloudy with potato starch.", action: "Proceed immediately to adding cream. Some broken-down potato will actually thicken the chowder naturally — not a disaster." },
        ],
      },
      feelCue: "Pierce a potato cube with a paring knife and lift — it should offer a faint resistance before the knife goes through, then come off the knife cleanly. If it falls off in pieces, they're overdone.",
    },
    {
      nodeId: "step_4",
      action: "Add clams and cream",
      inputs: ["chowder_base", "ing_01", "ing_05"],
      outputState: "finished_chowder",
      instructions: "Reduce heat to low. Stir in the heavy cream and the chopped clams. Heat gently for 3–5 minutes until warmed through. Do not boil after adding the cream — it will break and curdle. The clams only need to be warmed, never cooked; if they were raw they would toughen severely at this stage. Taste and adjust salt and white pepper.",
      visualCue: {
        primaryTarget: "The chowder is ivory-white and opaque, gently steaming. Clam pieces are evenly distributed throughout. The surface has a faint sheen from the cream.",
        spectrum: [
          { state: "Underdone", description: "Cream is just added and streaky — visible white swirls in the potato broth that haven't fully incorporated. Chowder is still cool.", action: "Stir gently and continue warming on low heat for 2 more minutes. Never rush this step with high heat." },
          { state: "Perfect",   description: "Chowder is uniformly ivory and warm throughout. Clams are tender. A spoon dragged across the surface leaves a trail that fills in slowly. Steam rising gently.", action: "Taste and adjust seasoning. Ladle into warm bowls." },
          { state: "Overdone",  description: "Cream has broken — yellow fat droplets floating on top of a pinkish, curdled liquid. Clams are visibly tight and rubbery.", action: "Lower heat immediately. The appearance can improve if you whisk gently while cooling the pot — but rubbery clams cannot be saved. Serve with apologies." },
        ],
      },
      feelCue: "Dip a spoon in the finished chowder — it should coat the back of the spoon in a thin, uniform ivory film that stays put when you run a finger through it. If it runs off cleanly, the body needs more gentle heating.",
    },
    {
      nodeId: "step_5",
      action: "Garnish and serve",
      inputs: ["finished_chowder", "rendered_fat_and_pork"],
      outputState: "plated_chowder",
      instructions: "Ladle the chowder into warm bowls. Top with the reserved crispy pork bits and a crack of black pepper. Optionally drizzle with a few drops of heavy cream in a spiral. Serve with oyster crackers or crusty bread on the side. The chowder thickens considerably as it cools — serve while hot.",
      visualCue: {
        primaryTarget: "A full bowl of ivory, steaming chowder with golden pork bits on top and visible chunks of potato and clam throughout.",
        spectrum: [
          { state: "Underdone", description: "Chowder hasn't been garnished, bowls are cold, and pork bits have gone soft from steam.", action: "Toast the pork bits briefly in a dry pan to re-crisp them. Always garnish in warm, preheated bowls." },
          { state: "Perfect",   description: "Hot ivory chowder in a warm bowl. Pork bits are still crispy on top. The steam smells of clam, cream, and thyme.", action: "Eat immediately, before the garnish sinks." },
          { state: "Overdone",  description: "Chowder has thickened to a paste in a cold bowl. Pork bits have absorbed moisture and gone limp.", action: "Reheat gently with a splash of cream to loosen, re-garnish with fresh pork bits." },
        ],
      },
      feelCue: "Lift the bowl with both hands — it should warm your palms through the ceramic. The aroma that rises as you lower your face toward it should be briny sea air and rendered fat.",
    },
  ],
};
