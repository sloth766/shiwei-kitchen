export default {
  repoId: "master_american_smash_burger_001",
  parentRepoId: null,
  slug: "smash-burger",
  author: "ForkRecipe Kitchen",

  title: "Smash Burger",
  description: "A loose ball of 80/20 beef, pressed hard against screaming-hot steel until the edges lacify into shatteringly crisp, mahogany-brown lace — this is the Maillard reaction at its most democratic and devastating.",
  cuisine: "American",
  culture: "American Diner",
  category: "proteins",

  tags: ["american", "beef", "burger", "diner", "crispy"],
  difficulty: 2,
  activeTime: "20 min",
  totalTime: "30 min",
  ratioSystem: "parts",

  stars: 3812,
  forks: 421,
  contributors: 34,
  license: "CC-BY-SA",
  createdAt: "2024-03-15",
  updatedAt: "2025-11-02",

  flavorRadar: { sweet: 1, salty: 4, sour: 1, bitter: 0, umami: 5, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "80/20 ground beef, loosely packed into 85g balls", ratioValue: 100, defaultUnit: "parts", substitutions: ["75/25 ground chuck", "wagyu blend"] },
    { ingId: "ing_02", role: "Seasoning", name: "Kosher salt",                                        ratioValue: 1.5, defaultUnit: "parts", substitutions: ["fine sea salt"] },
    { ingId: "ing_03", role: "Seasoning", name: "Black pepper, coarsely ground",                      ratioValue: 0.5, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Dairy",     name: "American cheese slices",                             ratioValue: 12,  defaultUnit: "parts", substitutions: ["white cheddar", "Colby Jack"] },
    { ingId: "ing_05", role: "Structure", name: "Martin's potato rolls or similar soft brioche bun",  ratioValue: 30,  defaultUnit: "parts", substitutions: ["brioche bun", "sesame seed bun"] },
    { ingId: "ing_06", role: "Fat",       name: "Unsalted butter, softened",                          ratioValue: 4,   defaultUnit: "parts", substitutions: ["mayo for toasting"] },
    { ingId: "ing_07", role: "Garnish",   name: "Yellow mustard, ketchup, diced white onion (for serving)", ratioValue: 10, defaultUnit: "parts", substitutions: ["special sauce", "pickles"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Heat griddle",
      inputs: ["ing_06"],
      outputState: "hot_griddle",
      instructions: "Set a cast-iron griddle or heavy skillet over the highest heat your stove will give. Let it preheat dry for at least 3 minutes — no oil, no butter yet. The surface temperature should reach 230–260°C. Smash burgers need maximum contact heat to drive the Maillard reaction before the beef can steam.",
      visualCue: {
        primaryTarget: "The griddle surface should be visibly dry and slightly hazy. A drop of water dropped onto it should vaporize into a ball and skitter away in under half a second.",
        spectrum: [
          { state: "Underdone", description: "Water drop hisses and evaporates slowly. Pan looks oily from factory coating or previous use. Dull surface with no heat haze.", action: "Wait another minute. Press palm 10cm above the surface — you should feel intense, radiating heat immediately." },
          { state: "Perfect",   description: "Dry, darkened surface. Any water drop vanishes in a fraction of a second. Faint smoke drifts from the metal.", action: "Add a thin smear of butter and immediately add the beef ball." },
          { state: "Overdone",  description: "Pan is smoking heavily and smells acrid. Metal may be developing hot spots that look darker than surrounding surface.", action: "Remove from heat for 30 seconds. Wipe briefly with a paper towel on tongs. Resume — even an overheated pan is better than an underheated one for smashing." },
        ],
      },
      feelCue: "Hold your open palm 8cm above the surface — the heat should be so intense you can only hold it there for one second before pulling back. If you can comfortably count to three, keep heating.",
    },
    {
      nodeId: "step_2",
      action: "Smash and sear",
      inputs: ["hot_griddle", "ing_01", "ing_02", "ing_03"],
      outputState: "smashed_patty",
      instructions: "Place a loosely packed beef ball onto the hot, lightly buttered griddle. Season the top immediately with salt and pepper. Using a heavy spatula or burger press, press down with your body weight — hard, fast, and sustained for 10 full seconds. The goal is maximum surface contact. Do not move it. Cook undisturbed for 90 seconds. The edges will turn brown and lacey before the center.",
      visualCue: {
        primaryTarget: "Deep mahogany crust spreading inward from the lacey, crinkled edges. The top of the patty transitions from raw red at the very center to cooked grey at the edges.",
        spectrum: [
          { state: "Underdone", description: "Crust is pale brown, not dark. Edges are not yet crispy — they look soft and the fat has not fully rendered. Center is still raw pink-red.", action: "Leave it alone. Every time you check by lifting, you break the crust forming underneath. Wait for the edges to look crackling and dark." },
          { state: "Perfect",   description: "A clearly defined, dark mahogany crust covers 80% of the visible surface. Lacey, crispy edges have formed. Fat has rendered and pooled around the patty.", action: "Flip once, using a thin, stiff spatula. Scrape all the fond off the griddle with the flip." },
          { state: "Overdone",  description: "Edges are black and smell charred, not caramelized. The fond on the pan is smoking and bitter.", action: "Flip immediately. Scrape off any truly burnt fond. The top side can still redeem it — add cheese quickly." },
        ],
      },
      feelCue: "When you finally slide the spatula under, you should feel and hear it separate from the griddle with a dry, sharp scrape — not a wet, squishing tear. If it tears, the crust is not fully formed yet.",
    },
    {
      nodeId: "step_3",
      action: "Cheese and steam",
      inputs: ["smashed_patty", "ing_04"],
      outputState: "cheesed_patty",
      instructions: "Flip the patty with a thin, stiff spatula, dragging all the browned fond up with it. Immediately lay an American cheese slice on top. If doubling up (double smash), place a second smashed patty on top of the first, then cheese on top. Add a splash of water to the griddle edge and cover with a dome or lid for 15 seconds to melt the cheese with steam.",
      visualCue: {
        primaryTarget: "Cheese is fully melted and glossy, draped over the edges of the patty in a smooth curtain. The second side of the patty has a lighter golden sear.",
        spectrum: [
          { state: "Underdone", description: "Cheese is still a solid square, only slightly soft in the center. Corners are still stiff.", action: "Add a few more drops of water and dome for another 10 seconds. American cheese melts fast — it should not need long." },
          { state: "Perfect",   description: "Cheese is fully melted, glossy, and draping over the edges in a smooth, even curtain. No distinct corners visible.", action: "Slide onto a toasted bun immediately." },
          { state: "Overdone",  description: "Cheese has started to brown and bubble at the edges, separating into grease. Patty second side is charring.", action: "Remove immediately. The cheese will still taste good even with some browning." },
        ],
      },
      feelCue: "When you lift the dome, a puff of steam and rendered beef fat should hit your face — it should smell intensely of caramelized beef and warm dairy, not smoke.",
    },
    {
      nodeId: "step_4",
      action: "Toast buns",
      inputs: ["ing_05", "ing_06"],
      outputState: "toasted_buns",
      instructions: "Split the bun and spread the cut faces with a thin layer of softened butter. Place cut-side down on the griddle or in a dry pan over medium heat. Toast for 60–90 seconds until golden and slightly crispy. The bun must be toasted — a soft untoasted bun collapses under the burger's moisture.",
      visualCue: {
        primaryTarget: "Cut surface is evenly golden-brown, with a slight crunch when you press it. The bun crown remains soft and pillowy while the interior face is toasted.",
        spectrum: [
          { state: "Underdone", description: "Cut face is pale and still soft. No color or crunch. Bun will absorb burger juices and become soggy immediately.", action: "Keep on the heat. A properly toasted bun is structural — it should hold for at least 2 minutes of eating without disintegrating." },
          { state: "Perfect",   description: "Even golden-brown color. Light crunch when pressed. The butter has browned slightly, adding nuttiness.", action: "Remove and dress immediately." },
          { state: "Overdone",  description: "Bun face is dark brown and hard. Smells like burnt toast.", action: "Use it anyway — the burger's moisture will soften it. Next time, lower heat or reduce toasting time by 30 seconds." },
        ],
      },
      feelCue: "Press the toasted face lightly with a finger — it should spring back with a faint crunch, not compress silently. The kitchen should smell like toasted butter and sesame.",
    },
    {
      nodeId: "step_5",
      action: "Assemble and serve",
      inputs: ["cheesed_patty", "toasted_buns", "ing_07"],
      outputState: "finished_smash_burger",
      instructions: "Dress the bottom bun with mustard and ketchup. Add a small pile of raw diced white onion. Place the cheesed patty on top. Crown it. Serve within 60 seconds — the window between perfect and sad is narrow. Wrap in paper if you need to transport it.",
      visualCue: {
        primaryTarget: "The cheese drapes over the patty and touches the bun. The lacey, dark-brown crust edge is visible from the side. Steam rises gently from the stack.",
        spectrum: [
          { state: "Underdone", description: "Bun is undressed, cheese is not melted, burger has been sitting for several minutes cooling.", action: "Reheat briefly on the griddle. A cold smash burger is a diminished one." },
          { state: "Perfect",   description: "Hot patty with melted cheese, toasted bun, steam still rising. Condiments are distributed evenly. The bun is not yet soggy.", action: "Eat immediately. This is your one chance." },
          { state: "Overdone",  description: "Burger has been sitting too long. Bun is soggy from steam, cheese is congealed, crust has softened.", action: "Learn the lesson: smash burgers are diner food, made to order. Never batch more than you can serve in 2 minutes." },
        ],
      },
      feelCue: "Pick it up immediately — the bun should still radiate warmth through the paper or your palm. The first bite should meet resistance from the toasted bun face, then give way to the yielding, juicy patty beneath.",
    },
  ],
};
