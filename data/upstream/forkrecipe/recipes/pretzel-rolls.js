export default {
  repoId: "master_german_pretzel_rolls_001",
  parentRepoId: null,
  slug: "pretzel-rolls",
  author: "ForkRecipe Kitchen",

  title: "Pretzel Rolls",
  description: "German Laugenbrötchen — dense, mahogany-dark rolls submerged in a baked-soda lye bath that turns the outer starch into a crackle-crisp, bitterly savory shell over a chewy, pillowy interior, finished with coarse pretzel salt that glints under kitchen light.",
  cuisine: "German",
  culture: "Bavaria",
  category: "breads",

  tags: ["pretzel", "german", "rolls", "lye", "baking-soda", "savory", "bread"],
  difficulty: 3,
  activeTime: "1 hour",
  totalTime: "3 hours",
  ratioSystem: "bakers_percentage",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",

  flavorRadar: { sweet: 0, salty: 5, sour: 1, bitter: 2, umami: 2, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Bread flour (12–13% protein)",         ratioValue: 100, defaultUnit: "%", substitutions: ["all-purpose flour (slightly less chew)"] },
    { ingId: "ing_02", role: "Hydration",  name: "Warm whole milk (38 C)",               ratioValue: 55,  defaultUnit: "%", substitutions: ["water (less tender crumb)"] },
    { ingId: "ing_03", role: "Leavener",   name: "Instant yeast",                         ratioValue: 1.5, defaultUnit: "%", substitutions: ["active dry yeast (proof first)"] },
    { ingId: "ing_04", role: "Seasoning",  name: "Fine sea salt",                         ratioValue: 2,   defaultUnit: "%", substitutions: [] },
    { ingId: "ing_05", role: "Fat",        name: "Unsalted butter, softened",             ratioValue: 5,   defaultUnit: "%", substitutions: ["lard (more traditional)"] },
    { ingId: "ing_06", role: "Base",       name: "Baking soda (for the lye bath)",        ratioValue: 12,  defaultUnit: "%", substitutions: ["food-grade lye 3% solution (true Laugengebäck, use with extreme caution)"] },
    { ingId: "ing_07", role: "Solvent",    name: "Water (for baked-soda bath)",           ratioValue: 500, defaultUnit: "%", substitutions: [] },
    { ingId: "ing_08", role: "Garnish",    name: "Coarse pretzel salt (or flaky sea salt)", ratioValue: 1, defaultUnit: "%", substitutions: ["Maldon salt", "coarse kosher salt"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Knead",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_04", "ing_05"],
      outputState: "pretzel_dough",
      instructions: "Combine the flour, yeast, and salt in a large bowl, then add the warm milk. Mix until a rough dough forms, then add the softened butter in pieces. Knead by hand for 10 minutes or in a stand mixer with the dough hook at medium speed for 7 minutes until the dough is smooth, elastic, and only faintly tacky. Pretzel dough is intentionally stiffer than a typical bread dough — the lower hydration is what allows the rolls to hold their shape during the lye bath and develop that distinctive dense, chewy crumb. The dough should pass the windowpane test: stretch a small piece thin and it should be nearly translucent without tearing.",
      visualCue: {
        primaryTarget: "A smooth, elastic ball of dough that holds its shape on the counter. Slightly stiffer than sandwich bread dough. Surface is glossy and taut.",
        spectrum: [
          { state: "Underdone", description: "Still rough and slightly ragged. Tears when pulled. Doesn't hold a round shape.", action: "Knead for 2–3 more minutes — the gluten needs more development for the rolls to hold their shape in the bath." },
          { state: "Perfect",   description: "Windowpane test passes. Smooth, elastic, only slightly tacky. Springs back within 2 seconds when poked. Surface looks almost glossy.", action: "Round into a ball and place in an oiled bowl to bulk ferment." },
          { state: "Overdone",  description: "Very stiff and tight, fighting back when kneaded. Snaps back immediately.", action: "Cover and rest 15 minutes. Over-developed gluten needs time to relax." },
        ],
      },
      feelCue: "Pretzel dough should feel like a firm handshake — not as soft as brioche, not as stiff as pizza dough, but somewhere confidently in between. Pull a piece: it should stretch without effort into a long ribbon before tearing.",
    },
    {
      nodeId: "step_2",
      action: "Proof",
      inputs: ["pretzel_dough"],
      outputState: "risen_pretzel_dough",
      instructions: "Place the dough in a lightly oiled bowl, cover with plastic wrap, and let it rise at room temperature for 1 to 1.5 hours until 50% larger (not doubled — pretzel dough is kept relatively under-fermented by design). This controlled fermentation keeps the crumb dense and chewy rather than airy. Meanwhile, prepare the baked-soda bath: spread the baking soda on a foil-lined sheet pan and bake at 250 C (480 F) for 1 hour until it turns from white powder to a yellowish crust. Baked soda is significantly more alkaline than regular baking soda and gives a much closer result to a real lye bath.",
      visualCue: {
        primaryTarget: "Dough has grown about 50% and feels lighter. Surface is domed and smooth. Not doubled — deliberately under-proofed.",
        spectrum: [
          { state: "Underdone", description: "Dough looks and feels identical to when it went in. No growth visible. Firm and dense.", action: "Move to a warmer place and wait. Under-fermented dough produces rolls too dense to enjoy." },
          { state: "Perfect",   description: "50% larger, feels slightly lighter and airier. A poke leaves a lazy-filling indent.", action: "Divide and shape into rolls while the oven heats and the lye bath is prepared." },
          { state: "Overdone",  description: "Doubled or more. Smells strongly of yeast. Very soft and gas-filled.", action: "Proceed quickly. Over-fermented pretzel rolls will be softer and more bready — still delicious, but less chewy." },
        ],
      },
      feelCue: "Properly fermented pretzel dough still feels relatively dense and firm compared to a sandwich loaf at the same stage — this is correct. It should feel like a soft stress ball, not a pillow.",
    },
    {
      nodeId: "step_3",
      action: "Shape",
      inputs: ["risen_pretzel_dough"],
      outputState: "shaped_rolls",
      instructions: "Divide the dough into 8 equal pieces (about 80–100 g each for a typical batch from 500 g flour). To shape a round roll: flatten each piece into a disc, fold the edges toward the center all around, then flip it over and roll it under your cupped palm on the counter with firm downward pressure, moving in tight circles. The goal is a taut, smooth ball with a sealed seam on the bottom. Alternatively, score a deep cross on top with a sharp knife or lame after shaping — this gives the classic Laugenbrötchen look. Place shaped rolls seam-side down on a parchment-lined sheet and refrigerate uncovered for 30 minutes — cold rolls hold their shape better during the lye bath.",
      visualCue: {
        primaryTarget: "Tight, smooth spheres with a sealed seam on the bottom. No tears or loose dough. Refrigerated rolls are firm and hold their shape when picked up.",
        spectrum: [
          { state: "Underdone", description: "Loose, floppy balls with visible seams and tears on the surface. They sag and flatten on the sheet.", action: "Reshape each one — flatten, fold, and re-roll with more downward pressure to build tension." },
          { state: "Perfect",   description: "Firm, taut balls that hold their round shape when set on the tray. Seam is invisible or sealed tightly.", action: "Refrigerate 30 minutes before the lye bath." },
          { state: "Overdone",  description: "Shaped rolls are warm and already proofing fast — surface looks puffy and soft.", action: "Get them into the refrigerator immediately to firm up before the lye bath." },
        ],
      },
      feelCue: "A well-shaped pretzel roll should feel solid and taut when squeezed lightly — not springy and puffy, not hard, but like a firmly packed snowball that holds its form.",
    },
    {
      nodeId: "step_4",
      action: "Boil in lye bath",
      inputs: ["shaped_rolls", "ing_06", "ing_07"],
      outputState: "lye_bathed_rolls",
      instructions: "Dissolve the baked baking soda in 1 liter of water in a wide, non-reactive pot (stainless steel or enameled — no bare aluminum). Bring to a gentle simmer. Wearing rubber gloves (baked soda solution is still caustic to skin), lower the cold rolls into the simmering bath one or two at a time. Simmer 20–30 seconds per side, turning once. The surface will turn a slightly tan, rubbery, tight skin. Lift out with a slotted spoon or spider and place on a parchment-lined baking sheet. Scatter coarse salt over the tops immediately while the surface is tacky.",
      visualCue: {
        primaryTarget: "Each roll emerges from the bath with a tight, slightly tanned, rubbery-looking skin that catches coarse salt immediately and holds it.",
        spectrum: [
          { state: "Underdone", description: "Still looks pale and doughy after 15 seconds in the bath. Surface has not tightened.", action: "Leave in the bath a full 30 seconds per side — the alkaline reaction takes time to gelatinize the exterior starch." },
          { state: "Perfect",   description: "Slightly tan, taut, rubbery surface — looks like a damp chamois skin. Salt sticks immediately. Will turn deep mahogany brown in the oven.", action: "Salt immediately and load into a 220 C (425 F) oven." },
          { state: "Overdone",  description: "More than 60 seconds in the bath — surface starts to dissolve and becomes slimy or cracked.", action: "Bake it anyway and score deeply before baking to let steam escape. The flavor will be fine; the crust may be irregular." },
        ],
      },
      feelCue: "Fresh from the lye bath, the surface of each roll feels rubbery and slightly slimy under a gloved finger — that gelatinized outer starch is the direct precursor to the crackle-crisp mahogany pretzel shell in the oven.",
    },
    {
      nodeId: "step_5",
      action: "Bake",
      inputs: ["lye_bathed_rolls", "ing_08"],
      outputState: "finished_pretzel_rolls",
      instructions: "Bake on the upper-middle rack at 220 C (425 F) with no steam for 18–22 minutes until deeply, uniformly dark mahogany-brown — much darker than you would ever take a regular roll. The lye reaction produces the characteristic dark color and bitter-savory flavor as the gelatinized exterior caramelizes aggressively. The coarse salt should be lightly toasted but intact. Let the rolls cool on a rack for at least 15 minutes before eating — the interior crumb needs time to firm up and the crust to crackle fully as it cools.",
      visualCue: {
        primaryTarget: "Deep mahogany-brown all over — not golden, not tan, but genuinely dark. Coarse salt glints. The surface is hard and crackle-crisp. The natural splits or scores show an inner pale crumb.",
        spectrum: [
          { state: "Underdone", description: "Golden-tan color. The crust is soft and the distinctive pretzel bitterness is missing. Doesn't look like a pretzel.", action: "Return to the oven for 3–5 minutes. Pretzel rolls must be baked much darker than normal bread — you're looking for mahogany, not gold." },
          { state: "Perfect",   description: "Uniformly dark mahogany with a crackle-hard crust that gives a sharp click when tapped. The kitchen smells of toasted malt and caramelized starch. Coarse salt toasted golden.", action: "Cool on a rack 15 minutes. The crumb will be dense and chewy under the brittle shell." },
          { state: "Overdone",  description: "Black or very dark brown with a burnt, harsh smell. Salt may be charred.", action: "The outer layer may be discardable; check the interior. If the crumb is good, remove the darkest bits of crust." },
        ],
      },
      feelCue: "Tap the bottom of a pretzel roll: it should sound like tapping a hard stone, not a hollow drum. The crust is its own layer — dense and rigid — and when you tear the roll open, it should resist and then snap apart rather than pull apart.",
    },
  ],
};
