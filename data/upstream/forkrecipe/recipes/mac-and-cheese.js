export default {
  repoId: "master_american_mac_and_cheese_001",
  parentRepoId: null,
  slug: "mac-and-cheese",
  author: "ForkRecipe Kitchen",

  title: "Baked Mac and Cheese",
  description: "Macaroni suspended in a molten, sharp cheddar béchamel, crowned with a golden breadcrumb crust that shatters into the cream below — the kind of mac and cheese that renders all the boxed versions a distant memory.",
  cuisine: "American",
  culture: "American",
  category: "grains",

  tags: ["american", "pasta", "cheese", "comfort-food", "baked"],
  difficulty: 2,
  activeTime: "25 min",
  totalTime: "50 min",
  ratioSystem: "parts",

  stars: 2671,
  forks: 287,
  contributors: 31,
  license: "CC-BY-SA",
  createdAt: "2024-09-03",
  updatedAt: "2025-07-22",

  flavorRadar: { sweet: 1, salty: 4, sour: 0, bitter: 0, umami: 4, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure", name: "Elbow macaroni or cavatappi",                         ratioValue: 100, defaultUnit: "parts", substitutions: ["shells", "penne", "rigatoni"] },
    { ingId: "ing_02", role: "Fat",       name: "Unsalted butter",                                     ratioValue: 15,  defaultUnit: "parts", substitutions: ["clarified butter"] },
    { ingId: "ing_03", role: "Starch",    name: "All-purpose flour",                                   ratioValue: 10,  defaultUnit: "parts", substitutions: ["gluten-free all-purpose flour"] },
    { ingId: "ing_04", role: "Dairy",     name: "Whole milk, warmed",                                  ratioValue: 60,  defaultUnit: "parts", substitutions: ["evaporated milk (richer)", "2% milk"] },
    { ingId: "ing_05", role: "Dairy",     name: "Sharp cheddar, freshly grated (plus Gruyère optional)", ratioValue: 50, defaultUnit: "parts", substitutions: ["Colby", "Fontina", "smoked Gouda"] },
    { ingId: "ing_06", role: "Seasoning", name: "Kosher salt, dry mustard, white pepper, nutmeg",     ratioValue: 2,   defaultUnit: "parts", substitutions: ["Dijon mustard (1 tsp)", "cayenne"] },
    { ingId: "ing_07", role: "Structure", name: "Panko breadcrumbs toasted in butter (for topping)",  ratioValue: 12,  defaultUnit: "parts", substitutions: ["crushed Ritz crackers", "plain breadcrumbs"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Boil pasta al dente",
      inputs: ["ing_01"],
      outputState: "al_dente_pasta",
      instructions: "Bring a large pot of generously salted water to a rolling boil. Cook the macaroni for 2 minutes less than the package directions — it will finish cooking in the oven. The pasta should have a distinct white core when bitten. Drain but do not rinse — the surface starch helps the sauce cling. Toss with a small knob of butter immediately to prevent sticking.",
      visualCue: {
        primaryTarget: "Pasta is barely tender at the exterior with a visible white chalky core when bitten in half. No floury taste but firm throughout.",
        spectrum: [
          { state: "Underdone", description: "Pasta is hard and snaps when bent. Center is chalky and still tastes raw. Much too firm to eat.", action: "Continue boiling. The 2-minutes-under rule applies to normal package times — if undercooked beyond that, add time." },
          { state: "Perfect",   description: "Tender exterior with a distinct white core and some resistance in the bite. You can still see the white center when you break a piece in half.", action: "Drain immediately. Do not rinse. Toss with butter and set aside." },
          { state: "Overdone",  description: "Pasta is fully cooked through with no white core. Soft and starting to swell. It will become mushy after baking.", action: "Proceed but reduce baking time to 15 minutes. Fully cooked pasta cannot go back, but fast baking minimizes further softening." },
        ],
      },
      feelCue: "Bite a piece of macaroni — the exterior should give way smoothly, but your teeth should hit a distinct resistance in the center, like biting through the skin of a grape into a firmer interior.",
    },
    {
      nodeId: "step_2",
      action: "Make béchamel",
      inputs: ["ing_02", "ing_03", "ing_04", "ing_06"],
      outputState: "bechamel_sauce",
      instructions: "In a heavy saucepan over medium heat, melt the butter until foaming. Add the flour all at once and stir constantly with a whisk for 2 minutes — this is the roux, and it must cook long enough to lose the raw flour taste. Gradually add the warm milk, a ladleful at a time, whisking vigorously after each addition until smooth before adding more. Once all the milk is incorporated, add mustard, nutmeg, salt, and white pepper. Cook, stirring, until the sauce thickens enough to coat a spoon, about 5 minutes.",
      visualCue: {
        primaryTarget: "A smooth, ivory sauce that coats the back of a spoon and holds a line drawn through it with a finger. No lumps. Faint smell of warm milk and butter.",
        spectrum: [
          { state: "Underdone", description: "Sauce is thin and watery. A finger drawn through the back of the spoon leaves a line that immediately fills in. Tastes slightly of raw flour.", action: "Continue cooking and stirring over medium heat. The sauce will thicken as the starch granules fully swell." },
          { state: "Perfect",   description: "Sauce is thick, smooth, and ivory. A finger dragged through the coated spoon leaves a clean line that holds for 3 seconds. Smells of warm dairy and faint nutmeg.", action: "Remove from heat and immediately begin adding cheese." },
          { state: "Overdone",  description: "Sauce is very thick — more like a paste than a sauce. When stirred, it pulls away from the sides of the pan cleanly.", action: "Whisk in a splash of warm milk to loosen. The sauce will relax slightly in the oven anyway — slightly thick is preferable to too thin." },
        ],
      },
      feelCue: "Dip a spoon in the sauce and hold it upright — the sauce should coat the back in a continuous, uniform film without dripping off immediately. Run a finger through: the clean line should hold for a slow count of three.",
    },
    {
      nodeId: "step_3",
      action: "Add cheese",
      inputs: ["bechamel_sauce", "ing_05"],
      outputState: "cheese_sauce",
      instructions: "Remove the béchamel from heat. Add the grated cheese in three additions, stirring between each until fully melted before adding more. The sauce must be off the heat — adding cheese to boiling sauce will cause the proteins to seize and become grainy. Stir gently in a figure-eight motion rather than vigorously, which can break the emulsion.",
      visualCue: {
        primaryTarget: "A glossy, golden-orange cheese sauce that flows slowly. No graininess or stringy clumps. The surface is slightly shiny from the cheese fat.",
        spectrum: [
          { state: "Underdone", description: "Cheese hasn't fully melted — visible shreds still floating in the sauce. Sauce looks unevenly colored, still streaky ivory and yellow.", action: "Stir gently over very low heat (not boiling) until fully incorporated. Freshly grated cheese melts much more readily than pre-shredded." },
          { state: "Perfect",   description: "Smooth, glossy, uniformly golden cheese sauce. Flows like thick cream. No graininess. Tastes intensely of cheddar with a hint of mustard.", action: "Immediately combine with pasta and transfer to baking dish." },
          { state: "Overdone",  description: "Sauce was too hot when cheese was added — it looks grainy and greasy, with visible fat pools and a curdled, ricotta-like texture.", action: "Whisk in 1 tbsp of sodium citrate or a splash of evaporated milk while warming gently. Grainy cheese sauce can sometimes be rescued by an emulsifying agent." },
        ],
      },
      feelCue: "Stir the cheese sauce with a spoon and observe the resistance — it should feel luxuriously thick, like stirring very soft cream cheese, and leave a coating on the spoon that you can see clearly.",
    },
    {
      nodeId: "step_4",
      action: "Combine and bake",
      inputs: ["cheese_sauce", "al_dente_pasta", "ing_07"],
      outputState: "baked_mac_and_cheese",
      instructions: "Preheat oven to 180°C. Fold the drained pasta into the cheese sauce until every piece is well coated. Pour into a buttered 23x33cm baking dish. Top evenly with the buttered panko breadcrumbs. Bake for 20–25 minutes until the breadcrumb topping is deep golden-brown and the edges are visibly bubbling.",
      visualCue: {
        primaryTarget: "Deep golden-brown, slightly crackled breadcrumb crust on top. Edges of the dish show cheese sauce bubbling up and caramelizing around the perimeter.",
        spectrum: [
          { state: "Underdone", description: "Breadcrumbs are still pale golden or blond. Edges not yet bubbling. The center of the dish may still look flat and unset.", action: "Return to oven. The bubbling at the edges is crucial — it means the sauce is hot all the way through, not just on the surface." },
          { state: "Perfect",   description: "Breadcrumbs are deep golden-brown. Edges are actively bubbling with caramelized cheese sauce. The top sounds faintly hollow when tapped.", action: "Remove and rest for 5 minutes before serving." },
          { state: "Overdone",  description: "Breadcrumbs are dark brown to black. Edges have dried and the cheese has separated into greasy pools visible around the perimeter.", action: "Tent with foil next time after the first 15 minutes. Serve it — the interior may still be perfect despite the over-browned top." },
        ],
      },
      feelCue: "Press the center of the crust gently with a spoon — it should give a satisfying crunch, and you should feel the soft, molten mac beneath the crispy layer give way slightly under the pressure.",
    },
    {
      nodeId: "step_5",
      action: "Rest and serve",
      inputs: ["baked_mac_and_cheese"],
      outputState: "finished_mac_and_cheese",
      instructions: "Remove from the oven and rest for 5 minutes. This brief rest allows the sauce to tighten slightly so that portions hold their shape when scooped. Serve in generous portions, ensuring each scoop gets some of the golden crust from the top and the creamy pasta beneath.",
      visualCue: {
        primaryTarget: "When a large spoon is pushed through the crust and lifted, it brings up a portion with intact crust on top and molten, cohesive mac and cheese beneath — not a runny soup.",
        spectrum: [
          { state: "Underdone", description: "Mac and cheese is still soupy and flows out of the spoon. The sauce hasn't tightened from the rest.", action: "Wait another 5 minutes. If it remains very loose, the sauce may have been under-thickened — still delicious, just more of a casserole." },
          { state: "Perfect",   description: "Portioned cleanly from the dish. The interior is molten and creamy. The crust holds together on top. Strings of cheese stretch between the dish and the spoon.", action: "Serve immediately in warm bowls." },
          { state: "Overdone",  description: "Mac and cheese has tightened into a firm, sliceable block. It holds its shape like a frittata rather than flowing at all.", action: "Add a splash of warm milk to the portion in the bowl and microwave for 30 seconds to loosen. Next time, reduce baking time by 5 minutes." },
        ],
      },
      feelCue: "When you scoop and lift, there should be a slight resistance from the set cheese sauce followed by a slow, molten flow. A few cheese strings should stretch between the pan and the spoon — that is the correct texture.",
    },
  ],
};
