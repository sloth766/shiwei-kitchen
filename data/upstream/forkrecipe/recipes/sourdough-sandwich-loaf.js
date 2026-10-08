export default {
  repoId: "master_american_sourdough_sandwich_loaf_001",
  parentRepoId: null,
  slug: "sourdough-sandwich-loaf",
  author: "ForkRecipe Kitchen",

  title: "Sourdough Sandwich Loaf",
  description: "A soft, Pullman-style American sandwich loaf leavened entirely by an active sourdough starter — tender enough to slice thin for toast yet tangy enough that you taste the ferment on the back of every bite. The crumb is pillowy and close-knit, the crust thin and golden, and the whole kitchen smells like a proper bakery for hours.",
  cuisine: "American",
  culture: "Pacific Northwest",
  category: "breads",

  tags: ["sourdough", "sandwich", "bread", "pullman", "pan-loaf", "fermented"],
  difficulty: 3,
  activeTime: "45 min",
  totalTime: "18 hours",
  ratioSystem: "bakers_percentage",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",

  flavorRadar: { sweet: 1, salty: 3, sour: 4, bitter: 0, umami: 1, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Bread flour (12–13% protein)",          ratioValue: 100,  defaultUnit: "%", substitutions: ["all-purpose flour (add 1% vital wheat gluten)"] },
    { ingId: "ing_02", role: "Hydration",  name: "Warm water (30–34 C)",                  ratioValue: 72,   defaultUnit: "%", substitutions: [] },
    { ingId: "ing_03", role: "Leavener",   name: "Active sourdough starter (100% hydration, fed 8h ago)", ratioValue: 20, defaultUnit: "%", substitutions: [] },
    { ingId: "ing_04", role: "Seasoning",  name: "Fine sea salt",                          ratioValue: 2,    defaultUnit: "%", substitutions: ["kosher salt"] },
    { ingId: "ing_05", role: "Fat",        name: "Unsalted butter, softened",              ratioValue: 5,    defaultUnit: "%", substitutions: ["neutral oil"] },
    { ingId: "ing_06", role: "Sweetener",  name: "Honey",                                  ratioValue: 3,    defaultUnit: "%", substitutions: ["sugar", "maple syrup"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Mix",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_06"],
      outputState: "shaggy_dough",
      instructions: "Combine the flour, water, active starter, and honey in a large bowl. Stir with a wooden spoon or dough whisk until no dry flour remains. The dough will be rough and sticky — resist the urge to add more flour. Cover with a damp towel and let it rest (autolyse) for 30 minutes. This rest allows the flour to fully hydrate and gluten to begin forming without any kneading, which reduces mixing time significantly and improves the crumb structure. Check that your starter is truly active: it should have doubled since feeding and smell yeasty and pleasantly sour.",
      visualCue: {
        primaryTarget: "A rough, shaggy mass that holds together but looks uneven. No dry streaks, some stickiness. Surface is matte and slightly lumpy.",
        spectrum: [
          { state: "Underdone", description: "Dry flour pockets remain at the bottom or edges. The dough crumbles when pressed.", action: "Mix more thoroughly by hand, pressing and folding until completely incorporated. A splash more water (5g) can help if the flour is very thirsty." },
          { state: "Perfect",   description: "Uniformly rough and wet with no dry flour. Clings to the bowl sides. Smells of wheat and a hint of ferment from the starter.", action: "Cover and rest 30 minutes before adding salt and butter." },
          { state: "Overdone",  description: "Dough is already silky smooth from over-mixing — gluten is developed before salt and fat are incorporated.", action: "Proceed anyway; add salt and butter in the next step and continue. The loaf will be fine." },
        ],
      },
      feelCue: "The dough should stick aggressively to your hands and pull away in thick, gluey strings — that tackiness is hydration doing its job. If it peels off your palm cleanly, it is too dry.",
    },
    {
      nodeId: "step_2",
      action: "Knead",
      inputs: ["shaggy_dough", "ing_04", "ing_05"],
      outputState: "developed_dough",
      instructions: "Sprinkle the salt over the rested dough and squeeze it through the dough with your fingers until evenly distributed — about 2 minutes of aggressive squeezing. Add the softened butter in small pieces and continue squeezing and folding until fully absorbed. Perform stretch-and-folds: wet your hand, grab the far edge of the dough, stretch it up overhead without tearing, and fold it over the center. Rotate 90 degrees and repeat — 4 folds equals one round. Do 4 rounds total, spaced 30 minutes apart, over 2 hours. By the final round the dough should be smooth, strong, and clearly elastic.",
      visualCue: {
        primaryTarget: "A smooth, supple, slightly tacky dough that holds a round shape in the bowl. Surface is nearly silk-smooth. Large bubbles are just beginning to appear underneath.",
        spectrum: [
          { state: "Underdone", description: "Still ragged, tears easily when stretched, and breaks rather than stretching into a translucent windowpane.", action: "Complete all 4 fold rounds before moving on — gluten development is time-sensitive in sourdough; shortcuts show up in the crumb." },
          { state: "Perfect",   description: "Stretches into a thin, translucent sheet (windowpane test passes) without tearing. Bounces back slowly when poked. Smooth on the surface.", action: "Proceed to bulk fermentation in a lightly oiled bowl." },
          { state: "Overdone",  description: "Tight, snapping back instantly when stretched, resisting folds — over-kneaded gluten.", action: "Cover and rest 20 minutes uncovered to relax. Then proceed." },
        ],
      },
      feelCue: "After the final fold the dough should feel alive in your hands — slightly warm from fermentation, taut but yielding, like a firm earlobe rather than a rubber band.",
    },
    {
      nodeId: "step_3",
      action: "Ferment",
      inputs: ["developed_dough"],
      outputState: "bulk_fermented_dough",
      instructions: "Transfer the dough to a lightly oiled container and bulk-ferment at room temperature (21–24 C) for 8–10 hours, or overnight in the refrigerator (4 C) for 12–14 hours. The cold retard slows fermentation and develops deeper sour flavor — for a tangier loaf, always go cold. The dough is ready when it has grown by 50–75% in volume (not doubled, as sourdough is slower), feels lighter and jiggly, and small bubbles are visible along the sides and bottom of the container. Dimples pressed into the surface spring back slowly and lazily.",
      visualCue: {
        primaryTarget: "Dough is visibly puffed — roughly 60–70% larger than it started. Surface is domed and smooth. Bubbles cling to the sides of the container. A poke leaves a slow-filling indent.",
        spectrum: [
          { state: "Underdone", description: "Barely grown; dense, cold, and tight. Poke fills back immediately and completely.", action: "Give it more time at a warmer spot. Sourdough is not the yeast — it needs patience. Cold kitchens need more hours." },
          { state: "Perfect",   description: "Grown 60–70%, jiggly when the container is shaken, bubbles visible on sides. A poke fills back halfway and holds for a beat before completing.", action: "Shape it while cold — straight from the fridge is ideal." },
          { state: "Overdone",  description: "Ballooned and webby with large holes; smells aggressively acidic. Jiggles like loose jelly.", action: "Shape it immediately and proof in the pan without delay. A slightly over-fermented dough will be tangier and have a denser crumb but will still bake." },
        ],
      },
      feelCue: "Tip the container and the dough should slowly peel away from the walls like a relaxed, airy mass — not dump out like a dead weight, and not cling stubbornly like raw paste.",
    },
    {
      nodeId: "step_4",
      action: "Shape",
      inputs: ["bulk_fermented_dough"],
      outputState: "shaped_loaf",
      instructions: "Turn the dough onto an unfloured surface. Gently pat it into a rectangle roughly the length of your loaf pan. Fold the long sides in toward the center like a letter, then roll it tightly from the top, sealing the seam with your thumbs as you go. You want surface tension without degassing the crumb — firm but not aggressive rolling. Lower the log seam-side down into a well-greased 9x5 inch (23x13 cm) loaf pan. The dough should fill the pan about 60–65% and sit slightly below the rim.",
      visualCue: {
        primaryTarget: "A tight, evenly shaped log sitting seam-down in the pan, filling it from end to end. The surface is taut and smooth, with no tears or ragged patches.",
        spectrum: [
          { state: "Underdone", description: "Loose, floppy log with no surface tension. Dough sags and spreads flat in the pan.", action: "Remove from the pan, reshape with more tension — fold the seam tightly and roll again, applying downward pressure on the final roll." },
          { state: "Perfect",   description: "Tight cylinder with a smooth, taut skin. Springs back only slightly when poked. Fits the pan end to end and sits about 60% full.", action: "Cover with oiled plastic wrap and proof until it crests the rim." },
          { state: "Overdone",  description: "Surface has torn during shaping, revealing large interior holes. Dough is tight and resists moving.", action: "Place in the pan anyway — surface tears do not ruin the loaf, they just change the scoring. Seal any large rips by pinching the dough shut." },
        ],
      },
      feelCue: "A well-shaped loaf feels taut when tapped, like a drum — not hollow but springy, as though the surface is under gentle tension. Run your palm along the top: it should feel uniformly smooth and firm.",
    },
    {
      nodeId: "step_5",
      action: "Proof",
      inputs: ["shaped_loaf"],
      outputState: "proofed_loaf",
      instructions: "Cover the pan with oiled plastic wrap and proof at room temperature (21–24 C) for 3–5 hours, or until the dome of the dough crests about 2 cm above the rim of the pan. If you retarded the bulk in the fridge, the final proof will take the longer end of this range. You can also do a cold final proof overnight in the fridge for baking the next morning — pull it directly from the fridge into the oven. Thirty minutes before baking, preheat the oven to 200 C (400 F).",
      visualCue: {
        primaryTarget: "The dome rises 2 cm above the pan rim, jiggling softly when the pan is nudged. A finger-poke fills back slowly, about halfway, over 10–15 seconds.",
        spectrum: [
          { state: "Underdone", description: "Dough barely crowns the rim. Poke springs back instantly and completely. Loaf baked now will be dense with large tunnels.", action: "Wait longer — sourdough proofing cannot be rushed safely. Check again in 45 minutes." },
          { state: "Perfect",   description: "Dome rises confidently above the pan. Gentle jiggle. Poke springs back halfway and holds. Light and pillowy surface.", action: "Score a shallow line down the center with a sharp knife and load it into the hot oven." },
          { state: "Overdone",  description: "Dome is flat or beginning to dimple inward. Poke leaves a crater that barely moves. Surface looks slightly wrinkled.", action: "Bake immediately without scoring. The loaf will still have good flavor but may have a dense crumb. Next time use a slightly cooler room for final proof." },
        ],
      },
      feelCue: "Press the covered surface with one finger: a properly proofed loaf gives like a soft pillow and springs back lazily, as though the gluten is saying 'I'm ready but not in a rush.'",
    },
    {
      nodeId: "step_6",
      action: "Bake",
      inputs: ["proofed_loaf"],
      outputState: "finished_sourdough_sandwich_loaf",
      instructions: "Score a shallow slash down the center of the loaf (optional but gives the crust a controlled split). Bake at 200 C (400 F) for 35–40 minutes, covering the pan loosely with foil for the first 20 minutes to keep the crust from browning too fast before the crumb sets. Remove the foil and continue baking until the internal temperature reads 93–96 C (200–205 F) and the top is a rich golden brown. Let cool in the pan 10 minutes, then turn out onto a wire rack. Do not slice for at least 1 hour — the crumb continues to set as the bread cools.",
      visualCue: {
        primaryTarget: "Deep golden-brown domed top with a natural side-bloom split along the score. The crust sounds hollow when the bottom is tapped. Internal temperature 94 C.",
        spectrum: [
          { state: "Underdone", description: "Pale blond top. Interior temperature below 90 C. Crumb will be gummy and the loaf will compress when sliced.", action: "Return for 5–8 more minutes and re-probe. If the top is already dark, tent with foil while the center finishes." },
          { state: "Perfect",   description: "Rich amber-gold, hollow on the bottom, 94 C internal. The loaf pulls cleanly from the pan. Crust is thin and snaps gently.", action: "Cool 1 hour minimum before slicing — thermal patience is the final ingredient." },
          { state: "Overdone",  description: "Very dark, stiff crust. Bitter smell. Interior may be over-dry.", action: "Slice and check — if the crumb is fine, the crust was simply dark. Thick crusts mellow when the bread is wrapped." },
        ],
      },
      feelCue: "A properly baked loaf feels surprisingly light when you lift it — the air cells you built over 18 hours are in there, holding up the structure. The crust should crackle softly as it cools on the rack.",
    },
  ],
};
