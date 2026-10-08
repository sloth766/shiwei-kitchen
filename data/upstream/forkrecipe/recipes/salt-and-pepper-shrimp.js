export default {
  repoId: "master_chinese_salt_and_pepper_shrimp_001",
  parentRepoId: null,
  slug: "salt-and-pepper-shrimp",
  author: "ForkRecipe Kitchen",

  title: "Salt and Pepper Shrimp",
  description: "Cantonese wok-fried whole shell-on shrimp that arrive at the table crackling and fragrant — the shells fried to a shattering crunch you eat whole, the flesh beneath barely cooked and sweet, buried under a confetti of garlic, scallion, and white pepper.",
  cuisine: "Chinese",
  culture: "Cantonese",
  category: "seafood",

  tags: ["seafood", "wok", "cantonese", "fried", "shrimp", "garlic"],
  difficulty: 2,
  activeTime: "20 min",
  totalTime: "30 min",
  ratioSystem: "weight",

  stars: 0, forks: 0, contributors: 1, license: "CC-BY-SA",
  createdAt: "2026-06-27", updatedAt: "2026-06-27",

  flavorRadar: { sweet: 1, salty: 4, sour: 0, bitter: 1, umami: 4, heat: 3 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",    name: "Large shell-on, head-on shrimp (prawns), deveined",          ratioValue: 600, defaultUnit: "g", substitutions: ["large tiger prawns"] },
    { ingId: "ing_02", role: "Starch",     name: "Cornstarch (cornflour)",                                     ratioValue: 40,  defaultUnit: "g", substitutions: ["potato starch"] },
    { ingId: "ing_03", role: "Fat",        name: "Neutral oil, for wok-frying",                                ratioValue: 500, defaultUnit: "ml", substitutions: ["sunflower oil"] },
    { ingId: "ing_04", role: "Allium",     name: "Garlic cloves, finely minced",                               ratioValue: 20,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_05", role: "Allium",     name: "Spring onions (scallions), thinly sliced",                   ratioValue: 40,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_06", role: "Heat",       name: "Fresh red chillies, thinly sliced (optional but traditional)", ratioValue: 15, defaultUnit: "g", substitutions: ["dried chilli flakes"] },
    { ingId: "ing_07", role: "Seasoning",  name: "Fine sea salt",                                              ratioValue: 6,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_08", role: "Spice",      name: "Ground white pepper",                                        ratioValue: 5,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_09", role: "Spice",      name: "Five-spice powder",                                          ratioValue: 2,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_10", role: "Fat",        name: "Sesame oil, to finish",                                      ratioValue: 5,   defaultUnit: "ml", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Season",
      inputs: ["ing_01", "ing_02", "ing_07", "ing_08", "ing_09"],
      outputState: "coated_shrimp",
      instructions: "Pat the shrimp completely dry with kitchen paper — any surface moisture will cause the oil to spit violently and prevent the shell from crisping. Toss in the cornstarch to coat very lightly — just enough for a barely-there dusting, not a thick batter. Mix in half the salt, white pepper, and the five-spice.",
      visualCue: {
        primaryTarget: "Shrimp coated in seasoned cornstarch",
        spectrum: [
          { state: "Underdone", description: "Shrimp are still visibly wet. Cornstarch is clumping in wet patches.", action: "Pat drier and toss again. Wet shrimp will steam instead of fry." },
          { state: "Perfect",   description: "Each shrimp has a very faint, even white dusting — barely visible but present. The shells feel slightly tacky to the touch. No clumping.", action: "Fry immediately — the cornstarch will absorb moisture quickly and become gluey if left." },
          { state: "Overdone",  description: "Shrimp are heavily coated in thick cornstarch — more like a battered prawn.", action: "Shake off excess vigorously. A thin coating is the goal, not a coating." },
        ],
      },
      feelCue: "A coated shrimp should feel dry and very slightly powdery on the outside — not slippery or wet. The shell should already feel slightly rigid from the starch.",
    },
    {
      nodeId: "step_2",
      action: "Fry",
      inputs: ["ing_03", "coated_shrimp"],
      outputState: "fried_shrimp",
      instructions: "Heat the oil in a wok over the highest possible heat to 190 C (375 F). Fry the shrimp in batches — 8–10 at a time — for exactly 60–75 seconds. The shells will sizzle aggressively and turn bright orange-red. Remove with a spider and drain on a rack. Do not over-fry — the shrimp continue cooking from residual heat.",
      visualCue: {
        primaryTarget: "Shrimp in the hot oil",
        spectrum: [
          { state: "Underdone", description: "Shells are pink but still translucent in places. The shrimp float limply in the oil. 60 seconds have not elapsed.", action: "Hold longer — but watch carefully. The window between raw and overcooked shrimp is only 30 seconds." },
          { state: "Perfect",   description: "Shells are a vivid, even orange-red and have crisped visibly — you can hear them crackle faintly when lifted from the oil. The shrimp have curled into a tight C shape. Heads (if on) are golden and fragrant.", action: "Remove immediately and drain. Proceed to the wok-toss step while oil is still hot." },
          { state: "Overdone",  description: "Shells are beginning to darken toward red-brown. The shrimp have tightened into a very tight curl and feel firm.", action: "Remove immediately. The flesh inside may be slightly overcooked but the shell will still crisp." },
        ],
      },
      feelCue: "Pick up a fried shrimp by the tail — it should feel surprisingly light and rigid, the shell almost papery-crisp. When you bite the shell, it should shatter with a very audible crunch.",
    },
    {
      nodeId: "step_3",
      action: "Toss",
      inputs: ["fried_shrimp", "ing_04", "ing_05", "ing_06", "ing_07", "ing_08", "ing_10"],
      outputState: "finished_salt_and_pepper_shrimp",
      instructions: "Pour off most of the frying oil, leaving about 1 tablespoon in the wok. Return to high heat. Add the garlic, most of the spring onion, and sliced chilli. Stir-fry for 30 seconds until the garlic is golden and fragrant. Add the fried shrimp back to the wok and toss furiously for 30 seconds to coat with the aromatic mixture. Season with remaining salt and white pepper. Drizzle with sesame oil and toss once more. Serve immediately, garnished with remaining spring onion.",
      visualCue: {
        primaryTarget: "Shrimp with aromatics in the wok",
        spectrum: [
          { state: "Underdone", description: "Garlic is still pale and raw-smelling. The aromatics have not had time to bloom.", action: "Toss over high heat for another 30 seconds — the garlic needs to turn golden to lose its rawness." },
          { state: "Perfect",   description: "Garlic is golden and fragrant. Each shrimp is glossy with sesame oil and flecked with crisped garlic, green scallion, and chilli. The shells remain audibly crisp. The wok smells of toasted garlic, sesame, and white pepper.", action: "Plate immediately and serve at the table without delay." },
          { state: "Overdone",  description: "Garlic has darkened to very dark brown or black. Bitter, acrid smell in the wok.", action: "Remove the dark garlic pieces if possible. The bitterness will dominate the dish if left." },
        ],
      },
      feelCue: "Eat one shrimp immediately from the wok — the shell should shatter between your teeth with a distinct crack, revealing sweet, barely-cooked flesh beneath. If the shell is soft and leathery, the oil was not hot enough.",
    },
  ],
};
