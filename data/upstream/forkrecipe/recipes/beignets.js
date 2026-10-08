export default {
  repoId: "master_french_creole_beignets_001",
  parentRepoId: null,
  slug: "beignets",
  parentSlug: null,
  author: "ForkRecipe Kitchen",

  title: "New Orleans Beignets",
  description: "Pillowy squares of yeasted fried dough that puff and hollow in hot oil, their thin crust shatteringly fragile under a snowstorm of powdered sugar that coats your lips and dusts your shirt — the essential Café du Monde experience.",
  cuisine: "French Creole",
  culture: "New Orleans",
  category: "desserts",

  tags: ["new-orleans", "french-creole", "fried", "yeast-dough", "powdered-sugar", "street-food", "brunch"],
  difficulty: 2,
  activeTime: "30 min",
  totalTime: "2 hr",
  ratioSystem: "bakers_percentage",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 4, salty: 1, sour: 1, bitter: 0, umami: 0, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Bread flour (or all-purpose)",      ratioValue: 100, defaultUnit: "%", substitutions: [] },
    { ingId: "ing_02", role: "Hydration",  name: "Warm whole milk (38 C)",            ratioValue: 55,  defaultUnit: "%", substitutions: ["evaporated milk for richer dough"] },
    { ingId: "ing_03", role: "Leavener",   name: "Instant yeast",                     ratioValue: 1.5, defaultUnit: "%", substitutions: ["active dry yeast (proof first)"] },
    { ingId: "ing_04", role: "Sweetener",  name: "Caster sugar",                      ratioValue: 10,  defaultUnit: "%", substitutions: [] },
    { ingId: "ing_05", role: "Seasoning",  name: "Fine sea salt",                     ratioValue: 1.5, defaultUnit: "%", substitutions: [] },
    { ingId: "ing_06", role: "Protein",    name: "Egg (large, beaten)",               ratioValue: 12,  defaultUnit: "%", substitutions: [] },
    { ingId: "ing_07", role: "Fat",        name: "Unsalted butter (softened)",        ratioValue: 8,   defaultUnit: "%", substitutions: [] },
    { ingId: "ing_08", role: "Fat",        name: "Neutral oil for frying (vegetable)", ratioValue: 200, defaultUnit: "%", substitutions: ["lard for authentic flavour"] },
    { ingId: "ing_09", role: "Garnish",    name: "Icing sugar (powdered sugar)",      ratioValue: 30,  defaultUnit: "%", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Mix",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_04", "ing_05", "ing_06", "ing_07"],
      outputState: "beignet_dough",
      instructions: "Combine all ingredients in a stand mixer bowl. Mix on low with a dough hook for 2 minutes to combine, then increase to medium and knead for 6-8 minutes. The dough will be soft, slightly tacky, and smooth — softer than pizza dough and just firm enough to hold its shape without spreading. Do not add extra flour; the softness is what creates the airy, hollow puff in the fryer.",
      visualCue: {
        primaryTarget: "A smooth, glossy, slightly tacky dough that clings to the hook but clears the bowl sides. Soft as a pillow — not stiff, not sticky enough to coat your fingers.",
        spectrum: [
          { state: "Underdone", description: "Rough, uneven surface with dry patches. Dough tears rather than stretching when pulled.", action: "Continue mixing for 3 more minutes. The gluten needs development to create the structure that puffs in oil." },
          { state: "Perfect",   description: "Smooth, satiny surface with a gentle tacky quality. Stretches into a thin membrane without tearing when a piece is pulled thin.", action: "Cover and proof in a warm place for 1-1.5 hours, or refrigerate overnight." },
          { state: "Overdone",  description: "Dough is very tight and elastic, springing back aggressively when pressed.", action: "Rest the dough for 20 minutes uncovered before proving — overworked gluten needs to relax." },
        ],
      },
      feelCue: "Press the dough gently with one finger — it should slowly spring back about three-quarters of the way and leave a faint indent. It should feel like pressing a very firm, airy pillow.",
    },
    {
      nodeId: "step_2",
      action: "Proof",
      inputs: ["beignet_dough"],
      outputState: "proofed_dough",
      instructions: "Transfer the dough to a lightly oiled bowl, cover with cling film, and proof at room temperature (25-28 C) for 1-1.5 hours, until doubled in size. Alternatively, refrigerate overnight for a slower, more flavourful proof — the cold also makes the dough easier to roll and cut cleanly. If refrigerating, remove 30 minutes before frying to take the chill off.",
      visualCue: {
        primaryTarget: "Dough that has visibly doubled, is domed at the top, and jiggles gently when the bowl is tapped. Surface is smooth and bubbly beneath the cling film.",
        spectrum: [
          { state: "Underdone", description: "Dough has barely grown. Still dense and flat. Pressing it does not leave a slow-recovering indent.", action: "Move to a warmer spot and allow more time. Cold or draught conditions slow yeast significantly." },
          { state: "Perfect",   description: "Clearly doubled. The surface is domed, smooth, and faintly bubbled. A floured finger pressed 2 cm into the dough leaves an indent that fills back slowly over 5-8 seconds.", action: "Roll and cut immediately, or refrigerate if doing overnight." },
          { state: "Overdone",  description: "Dough has collapsed or the surface has a sour smell and large, irregular bubbles. Over-proofed.", action: "Deflate gently, shape into a ball, and let rest 30 minutes. The beignets will be slightly denser but will still fry well." },
        ],
      },
      feelCue: "Press a floured finger 2 cm into the proofed dough — it should fill back in with a lazy, slow recovery over 5-7 seconds. If it springs back immediately, it needs more time; if the indent stays and doesn't recover at all, it has over-proofed.",
    },
    {
      nodeId: "step_3",
      action: "Shape",
      inputs: ["proofed_dough"],
      outputState: "cut_beignets",
      instructions: "On a lightly floured surface, roll the proofed dough to 6 mm thickness — slightly thicker than you might expect. Cut into 6 x 6 cm squares using a sharp knife or pastry cutter. The edges should be clean cuts, not dragged. Lay the cut squares on a lightly floured tray and cover loosely with cling film. Allow to rest 15 minutes before frying — this second rest prevents toughness and encourages the initial puff.",
      visualCue: {
        primaryTarget: "Uniform 6 cm squares, 6 mm thick, with clean-cut edges. The dough should still look slightly puffed from proving, not flat and compressed from heavy rolling.",
        spectrum: [
          { state: "Underdone", description: "Squares are uneven in size and thickness. Edges are torn rather than clean.", action: "Roll more evenly and use a sharp implement for cutting. Torn edges will fry unevenly." },
          { state: "Perfect",   description: "Even squares with crisp, clean edges and uniform 6 mm thickness. Still lightly airy from the proof.", action: "Rest covered for 15 minutes, then fry immediately." },
          { state: "Overdone",  description: "Dough was rolled too thin — squares are under 4 mm and look translucent.", action: "Gather the dough, re-ball gently, rest for 10 minutes, and re-roll to 6 mm. Thin beignets will be crisp, not hollow." },
        ],
      },
      feelCue: "Pick up a cut square — it should feel light and slightly airy in your hand, almost like picking up a thick marshmallow. If it feels dense and heavy like a lump of clay, the dough may need more proofing time.",
    },
    {
      nodeId: "step_4",
      action: "Fry",
      inputs: ["cut_beignets", "ing_08"],
      outputState: "fried_beignets",
      instructions: "Heat oil to 175 C (350 F) in a wide, heavy pot — minimum 8 cm depth. Fry 3-4 beignets at a time; do not crowd. Slide them in gently. Within 30 seconds they should begin to puff and float. Fry 90 seconds per side, flipping once. The beignet should puff dramatically hollow, like a small pillow inflated from within. Total fry time: 3 minutes. Drain on a rack, not paper.",
      visualCue: {
        primaryTarget: "Puffed, golden-amber squares that are clearly hollow — dramatically ballooned, not flat. Even colour all over with slightly darker creases where the square's surface folded as it puffed.",
        spectrum: [
          { state: "Underdone", description: "Pale gold. Has not puffed fully or is still dense in some areas. Soft and doughy when squeezed gently.", action: "Continue frying. A pale beignet is undercooked — it must reach amber to cook through the hollow centre." },
          { state: "Perfect",   description: "Deep golden-amber all over. Dramatically puffed and hollow — squeezing gently produces a faint crunch. The interior is light and airy with minimal dough walls.", action: "Drain 20 seconds on the rack, then immediately shower with icing sugar." },
          { state: "Overdone",  description: "Dark amber approaching brown. The surface is hard rather than delicately crisp. Interior may be very dry.", action: "Reduce oil temperature by 5-10 C for the next batch. Serve immediately with very generous sugar — it helps." },
        ],
      },
      feelCue: "Squeeze a hot fried beignet gently between your fingers — you should feel the hollow interior give slightly and spring back, like squeezing an inflated balloon. A dense, heavy feel means the dough did not puff as it should.",
    },
    {
      nodeId: "step_5",
      action: "Garnish",
      inputs: ["fried_beignets", "ing_09"],
      outputState: "finished_beignets",
      instructions: "Transfer hot beignets to a plate lined with a rack. Using a fine-mesh sieve, shower an extravagant quantity of icing sugar over each beignet from a height of 20 cm for maximum coverage and drift. The sugar must land on the hot surface — it will adhere and partially dissolve, creating the signature opaque white crust. Serve within 5 minutes, while the exterior is still crisp. Traditionally served three per order, with café au lait.",
      visualCue: {
        primaryTarget: "Beignets blanketed in thick white icing sugar — so thoroughly covered that almost none of the golden dough is visible beneath. A fine-textured snowfall aesthetic.",
        spectrum: [
          { state: "Underdone", description: "Thin, patchy coverage — the golden dough shows through in large patches. Sugar looks scant and uneven.", action: "Sieve more sugar from greater height. Generosity is mandatory — beignets are supposed to be buried in white." },
          { state: "Perfect",   description: "Thick, opaque white blanket over every surface. Some sugar drifts onto the plate like fresh snow. The beignets look like powdered pillows.", action: "Serve immediately." },
          { state: "Overdone",  description: "Such a deep layer of sugar that it clumps, gets wet, and falls off in chunks.", action: "This is rarely a problem in practice — dust and serve, the excess falls away naturally." },
        ],
      },
      feelCue: "Pick up a beignet and inhale near the sugar — you should smell the warm, vanilla-sweet scent of icing sugar mixed with the hot yeast dough beneath. Bite: the sugar gives way to a faint crunch of crust, then the interior is almost empty air — like biting a very light, warm cloud.",
    },
  ],
};
