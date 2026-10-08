export default {
  repoId: "master_mexican_shrimp_aguachile_001",
  parentRepoId: null,
  slug: "shrimp-aguachile",
  author: "ForkRecipe Kitchen",

  title: "Shrimp Aguachile",
  description: "Sinaloa's answer to ceviche — raw shrimp butterflied and cured for mere minutes in a blast of blended serrano, lime, and cucumber water so vivid and green and shocking it barely qualifies as cooking, yet is unforgettable.",
  cuisine: "Mexican",
  culture: "Sinaloan",
  category: "seafood",

  tags: ["shrimp", "raw", "aguachile", "lime", "serrano", "mexican", "ceviche", "sinaloan"],
  difficulty: 1,
  activeTime: "25 min",
  totalTime: "35 min",
  ratioSystem: "parts",

  stars: 1430,
  forks: 118,
  contributors: 31,
  license: "CC-BY-SA",
  createdAt: "2025-01-18",
  updatedAt: "2025-05-29",

  flavorRadar: { sweet: 1, salty: 3, sour: 5, bitter: 1, umami: 3, heat: 4 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Large raw shrimp (peeled, deveined, butterflied)", ratioValue: 100, defaultUnit: "parts", substitutions: ["scallops, sliced thin"] },
    { ingId: "ing_02", role: "Acid",      name: "Fresh lime juice (about 8 limes)",                 ratioValue: 60,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Structure", name: "English cucumber (half for aguachile, half sliced for garnish)", ratioValue: 40, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Spice",     name: "Fresh serrano chiles (stems removed)",             ratioValue: 10,  defaultUnit: "parts", substitutions: ["jalapeño for milder heat"] },
    { ingId: "ing_05", role: "Allium",    name: "White onion (thinly sliced into half-moons)",      ratioValue: 20,  defaultUnit: "parts", substitutions: ["red onion"] },
    { ingId: "ing_06", role: "Seasoning", name: "Fine salt",                                        ratioValue: 3,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Herb",      name: "Fresh cilantro (leaves and thin stems)",           ratioValue: 5,   defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Slice",
      inputs: ["ing_01"],
      outputState: "prepared_shrimp",
      instructions: "Using a sharp knife, butterfly each shrimp by cutting along the back (where the vein ran) almost all the way through, then pressing it open flat. This doubles the surface area exposed to the cure and allows the lime juice to penetrate more quickly and evenly. Arrange the butterflied shrimp in a single layer in a cold, shallow dish. Refrigerate while you prepare the aguachile.",
      visualCue: {
        primaryTarget: "Shrimp are flat and symmetrical, open like a book. Flesh is pale, semi-translucent, and uniform — no dark spots or opaque areas.",
        spectrum: [
          { state: "Underdone", description: "Shrimp are whole or only partially cut. The cure will not penetrate evenly and curing time doubles.", action: "Continue butterflying. The cut needs to go 80% of the way through." },
          { state: "Perfect",   description: "Uniformly flat, fully open shrimp with identical thickness throughout. They lie flat naturally.", action: "Refrigerate while making the aguachile." },
          { state: "Overdone",  description: "Shrimp have been cut all the way through, separating into two pieces.", action: "Proceed — two pieces is not ideal visually but works identically for curing." },
        ],
      },
      feelCue: "Raw butterflied shrimp should feel cold and supple in your hands — firm but yielding, with a natural give, not stiff. Any ammonia smell means they are past their prime; do not proceed.",
    },
    {
      nodeId: "step_2",
      action: "Blend",
      inputs: ["ing_02", "ing_03", "ing_04", "ing_06"],
      outputState: "aguachile_verde",
      instructions: "Blend half the cucumber (peeled and roughly chopped), all the lime juice, serranos, and salt together in a blender for 60 seconds until completely smooth and vivid green. Strain through a fine sieve, pressing the solids to extract maximum liquid. Discard solids. The aguachile should be intensely green, bracingly acidic, and fiercely hot. Taste it — it should feel aggressive. Adjust heat by adding or removing serrano seeds.",
      visualCue: {
        primaryTarget: "A vivid, translucent green liquid that is thin but not watery. The color should be the bright green of a traffic light, not muddy or pale.",
        spectrum: [
          { state: "Underdone", description: "Liquid is pale green or greenish-yellow. Flavor is mostly lime juice with little chile heat or cucumber freshness.", action: "Blend longer, or add more serrano and fresh cucumber for color and heat." },
          { state: "Perfect",   description: "Vivid, electric green, translucent, and intensely flavored. Tastes like fire and lime in equal measure.", action: "Pour over shrimp immediately." },
          { state: "Overdone",  description: "Aguachile has turned dark and oxidized from prolonged blending heat. The color is dull olive.", action: "Strain and use immediately. Keep it cold to minimize further oxidation." },
        ],
      },
      feelCue: "When you taste the aguachile, you should feel the heat of the serrano in your throat within 3 seconds and a rush of salivation from the lime — both simultaneously. If only one, adjust.",
    },
    {
      nodeId: "step_3",
      action: "Marinate",
      inputs: ["prepared_shrimp", "aguachile_verde"],
      outputState: "cured_shrimp",
      instructions: "Pour the aguachile verde over the shrimp, ensuring every piece is fully submerged. The shrimp should cure for exactly 7-10 minutes — the lime juice denatures the proteins in the same way heat would, turning the flesh from translucent grey to opaque white-pink. Do not over-cure. At 10 minutes, the shrimp should be pink-white on the outside but still slightly translucent at the very center — this is the perfect texture. Longer curing produces rubbery, overcooked-tasting shrimp.",
      visualCue: {
        primaryTarget: "Shrimp have turned pink-white from the edges inward. The exposed butterflied surfaces are fully opaque but the very center retains a faint translucency.",
        spectrum: [
          { state: "Underdone", description: "Shrimp are still mostly grey and translucent throughout. Texture is too raw and slippery.", action: "Cure 3-4 more minutes. The lime acid must denature the exterior protein." },
          { state: "Perfect",   description: "Pink-white exterior graduating to a faint translucent center. Flesh is firm but yielding — like a medium-cooked shrimp.", action: "Remove immediately from the aguachile and arrange on plates." },
          { state: "Overdone",  description: "Shrimp are uniformly opaque white and have begun to contract and curl tightly. Texture is rubbery.", action: "Serve immediately. The texture will not improve, but the flavor is still good." },
        ],
      },
      feelCue: "A properly cured aguachile shrimp should feel firm but not bouncy when you pick it up — spring back is the enemy. If it feels like a rubber eraser, it has over-cured.",
    },
    {
      nodeId: "step_4",
      action: "Assemble",
      inputs: ["cured_shrimp", "ing_05", "ing_07", "ing_03"],
      outputState: "finished_aguachile",
      instructions: "Arrange the cured shrimp on a cold, flat plate. Drape thinly sliced onion half-moons over the shrimp. Layer cucumber slices around the plate. Spoon 2-3 tablespoons of the aguachile verde over everything. Scatter cilantro leaves. Serve immediately with tostadas or thick tortilla chips on the side. The dish should be cold, bright, and served instantly — aguachile waits for no one.",
      visualCue: {
        primaryTarget: "A jewel-bright plate: pink shrimp, green aguachile, white onion, green cucumber, and vivid cilantro against a cold white dish. Everything glistens.",
        spectrum: [
          { state: "Underdone", description: "Plating is rushed and the elements are piled rather than arranged. The aguachile pool is too deep.", action: "Spread the shrimp into a single layer. The dish should lie flat — aguachile is theater." },
          { state: "Perfect",   description: "Individual shrimp visible, vegetables artfully placed, aguachile pooled around rather than over. Vivid colors contrast dramatically.", action: "Serve within 2 minutes." },
          { state: "Overdone",  description: "The shrimp have sat in the aguachile on the plate for more than 5 minutes and have continued cooking from the acid.", action: "Serve immediately. Instruct guests to eat without delay." },
        ],
      },
      feelCue: "The finished plate smells of wet lime, fresh green chile, and the faint ocean sweetness of shrimp — clean, cold, and dangerously alive.",
    },
  ],
};
