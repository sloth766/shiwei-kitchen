export default {
  repoId: "master_mexican_tacos_al_pastor_001",
  parentRepoId: null,
  slug: "tacos-al-pastor",
  author: "ForkRecipe Kitchen",

  title: "Tacos Al Pastor",
  description: "Thin-sliced pork shoulder stained crimson with guajillo and achiote, stacked onto a vertical spit with pineapple and roasted until the edges caramelize and char — served on warm corn tortillas with pineapple, onion, and cilantro.",
  cuisine: "Mexican",
  culture: "Mexico City",
  category: "proteins",

  tags: ["mexican", "pork", "tacos", "al-pastor", "achiote", "guajillo", "mexico-city", "spit-roasted"],
  difficulty: 3,
  activeTime: "1 hour",
  totalTime: "5 hours",
  ratioSystem: "weight",

  stars: 0, forks: 0, contributors: 1, license: "CC-BY-SA",
  createdAt: "2026-06-27", updatedAt: "2026-06-27",

  flavorRadar: { sweet: 3, salty: 3, sour: 2, bitter: 1, umami: 4, heat: 3 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Pork shoulder, sliced 5 mm thin across the grain", ratioValue: 1500, defaultUnit: "g", substitutions: ["pork butt", "boneless pork loin (less fatty)"] },
    { ingId: "ing_02", role: "Spice",     name: "Dried guajillo chilies, seeds removed",   ratioValue: 40,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_03", role: "Spice",     name: "Dried ancho chilies, seeds removed",      ratioValue: 20,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_04", role: "Spice",     name: "Achiote paste (recado rojo)",              ratioValue: 50,  defaultUnit: "g", substitutions: ["2 tsp annatto powder + 1 tsp cumin"] },
    { ingId: "ing_05", role: "Allium",    name: "White onion, quartered",                  ratioValue: 120, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_06", role: "Allium",    name: "Garlic cloves",                           ratioValue: 20,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_07", role: "Spice",     name: "Ground cumin",                            ratioValue: 5,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_08", role: "Spice",     name: "Dried Mexican oregano",                   ratioValue: 4,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_09", role: "Acid",      name: "Pineapple juice (freshly squeezed)",      ratioValue: 80,  defaultUnit: "g", substitutions: ["apple cider vinegar"] },
    { ingId: "ing_10", role: "Acid",      name: "White wine vinegar or apple cider vinegar",ratioValue: 30, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_11", role: "Aromatic",  name: "Fresh pineapple, sliced into rounds",     ratioValue: 300, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_12", role: "Seasoning", name: "Fine sea salt",                           ratioValue: 15,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_13", role: "Garnish",   name: "Corn tortillas, small (12 cm)",           ratioValue: 24,  defaultUnit: "whole", substitutions: [] },
    { ingId: "ing_14", role: "Garnish",   name: "White onion, finely diced",              ratioValue: 80,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_15", role: "Garnish",   name: "Fresh cilantro, roughly chopped",         ratioValue: 30,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_16", role: "Acid",      name: "Lime wedges",                             ratioValue: 60,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_17", role: "Heat",      name: "Salsa verde or salsa roja",               ratioValue: 100, defaultUnit: "g", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Toast",
      inputs: ["ing_02", "ing_03"],
      outputState: "toasted_chilies",
      instructions: "Toast dried chilies on a dry comal or skillet over medium heat for 15–20 seconds per side, until blistered and fragrant. Transfer to a bowl, cover with boiling water, and soak 20 minutes until fully softened. Drain, reserving 100 g of soaking liquid.",
      visualCue: {
        primaryTarget: "Chilies are pliable and deeply colored, smelling of chocolate, dried fruit, and smoke after toasting. After soaking, they are limp and swollen.",
        spectrum: [
          { state: "Underdone", description: "Chilies are still brittle and smell flat. The paste will taste dull and dusty.", action: "Return to the comal — the blistering and aroma development are essential." },
          { state: "Perfect",   description: "Blistered, pliable, aromatic. Soaking water is dark amber. Chilies are soft and pliable after soaking.", action: "Drain and blend." },
          { state: "Overdone",  description: "Burnt — black and acrid.", action: "Discard and start again. Burned guajillo ruins the marinade." },
        ],
      },
      feelCue: "A toasted, soaked guajillo should fold without cracking, like damp leather. If it snaps, it needs more soaking time.",
    },
    {
      nodeId: "step_2",
      action: "Blend",
      inputs: ["toasted_chilies", "ing_04", "ing_05", "ing_06", "ing_07", "ing_08", "ing_09", "ing_10", "ing_12"],
      outputState: "pastor_marinade",
      instructions: "Blend the drained chilies with achiote paste, onion, garlic, cumin, oregano, pineapple juice, vinegar, salt, and 80 g of chili soaking liquid until completely smooth. Pass through a medium strainer. The marinade should be vivid crimson, completely smooth, and smell of toasted chili, earthy achiote, and bright pineapple acid.",
      visualCue: {
        primaryTarget: "A vivid, deep crimson marinade — the achiote makes it almost unnaturally red. No visible chunks or skin fragments. Smells of earth, chili, and tropical fruit.",
        spectrum: [
          { state: "Underdone", description: "Marinade is chunky with chili skin fragments.", action: "Blend longer or strain more thoroughly." },
          { state: "Perfect",   description: "Completely smooth, deep crimson, slightly thick. Stains everything immediately on contact.", action: "Marinate pork." },
          { state: "Overdone",  description: "N/A — raw blend.", action: "Proceed." },
        ],
      },
      feelCue: "The marinade should stain your hands a vivid orange-red immediately — that's the achiote working. If it only makes a faint pink mark, add more achiote paste.",
    },
    {
      nodeId: "step_3",
      action: "Marinate",
      inputs: ["ing_01", "pastor_marinade"],
      outputState: "marinated_pork_slices",
      instructions: "Toss the thin pork slices with all the marinade in a large bowl, ensuring every surface is coated. Cover and refrigerate for at least 2 hours, ideally overnight. The pineapple juice enzymes (bromelain) tenderize the meat — but more than 12 hours can make the texture mealy in thin slices.",
      visualCue: {
        primaryTarget: "Every pork slice is deeply stained crimson-red. No pale or uncoated spots. The slices have become slightly tacky.",
        spectrum: [
          { state: "Underdone", description: "Uncoated patches of pork visible. Pink not deep enough.", action: "Toss more thoroughly, pressing marinade into cuts." },
          { state: "Perfect",   description: "Uniformly dark red, tacky coating. After overnight rest, slices feel slightly firmer from the acid and salt.", action: "Stack and roast." },
          { state: "Overdone",  description: "Marinated beyond 12 hours in fresh pineapple juice — the bromelain has begun to dissolve the meat proteins.", action: "Still fine for cooking but texture will be softer than ideal." },
        ],
      },
      feelCue: "After overnight marination, the pork slices feel slightly firmer and denser than raw pork — the salt and acid have done a light cure.",
    },
    {
      nodeId: "step_4",
      action: "Roast",
      inputs: ["marinated_pork_slices", "ing_11"],
      outputState: "roasted_pastor_meat",
      instructions: "Home method: Layer marinated pork slices in a cast iron skillet or on a baking sheet, overlapping slightly. Tuck pineapple rounds between and on top. Roast at 200 C (400 F) for 30 minutes, then broil for 5–8 minutes until the top edges char and caramelize. Alternative: build a vertical stack of pork slices on a skewer, interspersed with pineapple, and roast under the broiler, rotating every 5 minutes for 20–25 minutes total.",
      visualCue: {
        primaryTarget: "The top layer of pork is deeply browned and charred at the edges, nearly burnt in places — this char is the flavour. The pineapple is golden and slightly caramelized.",
        spectrum: [
          { state: "Underdone", description: "Pork is fully cooked but pale. No char. Flavor will be flat without the Maillard caramelization.", action: "Move under the broiler and char aggressively." },
          { state: "Perfect",   description: "Charred and caramelized at the exposed edges, with the smoky sweetness of the pineapple and the toasted chili paste. Exterior dark, interior juicy.", action: "Slice and serve immediately." },
          { state: "Overdone",  description: "Entire surface is burnt black. Bitter and acrid.", action: "Remove top layer. The layers beneath are likely perfect." },
        ],
      },
      feelCue: "The charred top layer of pastor should crackle when pressed — that texture contrast between the crispy char and the juicy meat beneath is the hallmark of the dish.",
    },
    {
      nodeId: "step_5",
      action: "Assemble",
      inputs: ["roasted_pastor_meat", "ing_13", "ing_14", "ing_15", "ing_16", "ing_17"],
      outputState: "finished_tacos_al_pastor",
      instructions: "Slice or chop the roasted pork into small, irregular pieces, including the charred edges. Warm corn tortillas directly over a gas flame or dry comal until lightly charred and pliable. Double the tortillas (Mexican taqueria style). Pile pork on tortillas, top with diced onion, cilantro, and a square of pineapple. Serve with lime wedges and salsa.",
      visualCue: {
        primaryTarget: "Small corn tortilla doubles filled with charred-edge crimson pork, bright white diced onion, green cilantro, and golden pineapple. The salsa pooling at the edges.",
        spectrum: [
          { state: "Underdone", description: "Tortillas are cold and not warmed through. They will tear and not fold properly.", action: "Always warm tortillas over direct flame or comal. Cold tortillas ruin tacos." },
          { state: "Perfect",   description: "Warm, slightly charred tortillas holding pork that includes both charred exterior pieces and juicy interior. Garnishes bright and fresh.", action: "Eat immediately." },
          { state: "Overdone",  description: "Tacos assembled too far in advance. Tortillas have gone soggy from the meat juices.", action: "Always assemble al momento." },
        ],
      },
      feelCue: "The perfect al pastor taco should have contrasting textures in every bite: slightly charred tortilla, crispy-edged meat, juicy pork interior, crunchy raw onion, and the burst of pineapple juice.",
    },
  ],
};
