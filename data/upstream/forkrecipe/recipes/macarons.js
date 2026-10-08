export default {
  repoId: "master_french_macarons_001",
  parentRepoId: null,
  slug: "macarons",
  parentSlug: null,
  author: "ForkRecipe Kitchen",

  title: "French Macarons",
  description: "Gossamer almond shells that shatter at the tooth then melt into a chewy, jammy core — the product of aged egg whites, a precise batter, and the ruthless alchemy of the macaronage.",
  cuisine: "French",
  culture: "Parisian",
  category: "desserts",

  tags: ["gluten-free", "french", "almond", "meringue", "sandwich-cookie", "baking", "patisserie"],
  difficulty: 5,
  activeTime: "60 min",
  totalTime: "3 hr",
  ratioSystem: "weight",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 5, salty: 1, sour: 1, bitter: 0, umami: 0, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Almond flour (blanched, super-fine)", ratioValue: 100, defaultUnit: "g", substitutions: ["hazelnut flour for a praline variant"] },
    { ingId: "ing_02", role: "Sweetener",  name: "Icing sugar (powdered sugar, sifted)", ratioValue: 100, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_03", role: "Protein",    name: "Aged egg whites (room temperature)", ratioValue: 75,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_04", role: "Sweetener",  name: "Caster sugar (fine granulated)",     ratioValue: 75,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_05", role: "Liquid",     name: "Water (for sugar syrup)",             ratioValue: 25,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_06", role: "Seasoning",  name: "Fine sea salt",                       ratioValue: 1,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_07", role: "Fat",        name: "Unsalted butter (softened, for filling)", ratioValue: 80, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_08", role: "Sweetener",  name: "Icing sugar (for buttercream filling)", ratioValue: 160, defaultUnit: "g", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Blend",
      inputs: ["ing_01", "ing_02"],
      outputState: "tant_pour_tant",
      instructions: "Pulse almond flour and icing sugar together in a food processor for 30 seconds to eliminate any lumps and evenly combine. Sift through a fine-mesh sieve. Discard any large almond pieces that won't pass. The mixture should feel like talc — if it clumps, your almond flour is too moist; spread it on a sheet tray and dry in a 100 C oven for 10 minutes.",
      visualCue: {
        primaryTarget: "A perfectly uniform, fluffy, off-white powder with no lumps, no coarse almond slivers, no icing-sugar clumps.",
        spectrum: [
          { state: "Underdone", description: "Coarse almond pieces or visible sugar lumps remain after sifting.", action: "Re-process and re-sift. Lumps prevent a smooth shell surface." },
          { state: "Perfect",   description: "Silky, dusty powder that cascades through the sieve without effort. Consistent pale cream colour.", action: "Set aside and prepare the Italian meringue." },
          { state: "Overdone",  description: "Mixture looks oily and clumped — almond fat has been released by over-processing.", action: "Discard and start with fresh almond flour. Once oily, it cannot be corrected." },
        ],
      },
      feelCue: "Rub a pinch between your fingers — it should feel like smooth face powder, with no graininess and no oily residue.",
    },
    {
      nodeId: "step_2",
      action: "Whip",
      inputs: ["ing_03", "ing_04", "ing_05", "ing_06"],
      outputState: "italian_meringue",
      instructions: "Cook caster sugar and water in a small saucepan to 118 C (soft-ball stage), without stirring. Meanwhile, whip the aged egg whites with salt to soft peaks on medium speed. When the syrup hits 118 C, increase mixer to high and pour the syrup in a thin, steady stream down the bowl wall (not onto the whisk). Whip on high for 8-10 minutes until the bowl is no longer hot to the touch and the meringue is stiff and glossy.",
      visualCue: {
        primaryTarget: "A stiff, brilliant white meringue that forms sharp, upright peaks. The bowl should feel no warmer than body temperature.",
        spectrum: [
          { state: "Underdone", description: "Peaks flop over softly. Meringue feels warm. Surface is still slightly grainy from undissolved sugar.", action: "Continue whipping on high — the meringue must cool and reach full stiffness before macaronage." },
          { state: "Perfect",   description: "Peaks are stiff and slightly curled at the very tip. Meringue is silky-smooth and brilliant. When you lift the whisk, a beak forms and holds.", action: "Begin macaronage immediately while meringue is still at its peak." },
          { state: "Overdone",  description: "Meringue looks curdled, watery, or separating at the bowl edges. Peaks are crumbly, not silky.", action: "Overwhipped meringue cannot be fixed — start again. The macarons will spread and crack." },
        ],
      },
      feelCue: "Press the meringue between your thumb and forefinger — it should feel like satin, completely smooth, with zero graininess. If you feel sugar crystals, whip longer.",
    },
    {
      nodeId: "step_3",
      action: "Fold",
      inputs: ["tant_pour_tant", "italian_meringue"],
      outputState: "macaron_batter",
      instructions: "Add the tant-pour-tant to the Italian meringue in two additions. Macaronage: using a wide rubber spatula, fold by pressing the batter flat against the side of the bowl, then scooping from the bottom and folding over. Work decisively — this is not a gentle fold. You are deliberately deflating the meringue to achieve the correct flow. Perform roughly 40-50 strokes. Stop when the batter flows from the spatula in a thick, continuous ribbon that disappears back into the bowl within 10 seconds.",
      visualCue: {
        primaryTarget: "A flowing, lava-like batter. When the spatula is lifted and batter falls, it forms a thick continuous ribbon that ribbon folds back and becomes smooth within 10 seconds.",
        spectrum: [
          { state: "Underdone", description: "Batter is stiff and lumpy. When spatula is lifted it breaks off in clumps rather than ribboning.", action: "Continue folding — under-macaronaged batter makes lumpy, peaked shells." },
          { state: "Perfect",   description: "Thick flowing lava. Ribbon disappears back to a smooth surface in 8-10 seconds. Batter is shiny and flows uniformly.", action: "Transfer to a piping bag and pipe immediately." },
          { state: "Overdone",  description: "Batter is runny, spreads immediately when the spatula is lifted. No ribbon forms — it just pours.", action: "Over-macaronaged batter cannot be saved. The shells will spread flat. Start again." },
        ],
      },
      feelCue: "When you scoop a spatula-full and let it fall back into the bowl, it should flow off the spatula in a wide, glossy cascade, not drip in individual drops.",
    },
    {
      nodeId: "step_4",
      action: "Bake",
      inputs: ["macaron_batter"],
      outputState: "macaron_shells",
      instructions: "Pipe 3.5 cm rounds onto silicone-mat-lined baking sheets, spacing 3 cm apart. Tap the sheet firmly on the counter 3-4 times to release large air bubbles. Let rest at room temperature for 30-45 minutes until the surface forms a dry skin — it should not stick to your fingertip. Bake one sheet at a time at 150 C (fan-forced) for 14-16 minutes. Shells are done when they slide cleanly off the mat with no resistance at the base.",
      visualCue: {
        primaryTarget: "Smooth, matte-surfaced domes with a ruffled 'foot' (pied) around the base and no cracks on the crown.",
        spectrum: [
          { state: "Underdone", description: "Shells stick to the mat. The foot is there but the base is still soft and comes away in pieces.", action: "Return to the oven for 2 more minutes. A proper shell releases cleanly when the mat is peeled back." },
          { state: "Perfect",   description: "Smooth, uncracked dome. A proud, even foot. The shell slides off the mat cleanly when cool. Hollow sound when tapped.", action: "Cool fully on the mat before filling — minimum 30 minutes." },
          { state: "Overdone",  description: "Shells are ivory or tan on top, not pale — the almond is browning. Texture will be dry and crumbly.", action: "Reduce oven temperature by 5 C next batch. Overly browned shells lose their chew." },
        ],
      },
      feelCue: "Tap a cooled shell on its back — it should sound faintly hollow like a tiny ceramic bead, not dull and dense. Press the side gently: it should give slightly, like pressing a firm grape.",
    },
    {
      nodeId: "step_5",
      action: "Cream",
      inputs: ["ing_07", "ing_08"],
      outputState: "buttercream",
      instructions: "Beat the softened butter alone for 3 minutes until very pale and fluffy. Add icing sugar in three additions, beating for 1 minute between each. The finished buttercream should be smooth, ivory, and stiff enough to hold a peak but soft enough to pipe easily. Add 1 tsp of vanilla or other flavouring, and a pinch of salt to balance.",
      visualCue: {
        primaryTarget: "Very pale, almost white buttercream that holds a stiff, smooth peak. No graininess visible.",
        spectrum: [
          { state: "Underdone", description: "Buttercream looks yellow and grainy — butter not yet fully aerated, sugar not fully incorporated.", action: "Beat for 2 more minutes. Properly creamed butter is nearly white, not yellow." },
          { state: "Perfect",   description: "Pale ivory, silky-smooth, holds shape when piped. Springs back when pressed with a fingertip.", action: "Transfer to a piping bag and fill the macaron shells." },
          { state: "Overdone",  description: "Buttercream looks curdled or soupy — either over-beaten or butter was too warm.", action: "Chill the bowl in the fridge for 10 minutes, then re-beat. If soupy, the butter was too hot — chill until firm and retry." },
        ],
      },
      feelCue: "Taste a small amount — it should dissolve smoothly on the tongue with no graininess. If you can feel sugar crystals, beat longer.",
    },
    {
      nodeId: "step_6",
      action: "Assemble",
      inputs: ["macaron_shells", "buttercream"],
      outputState: "finished_macarons",
      instructions: "Match shells by size into pairs. Pipe a generous, even disc of buttercream onto the flat side of one shell, leaving a 2 mm border. Sandwich with its pair and press gently until the filling reaches the edge. Refrigerate, uncovered, for 24 hours — this is the 'maturation' step. The moisture from the filling softens the shell interior to its characteristic chewy texture. Bring to room temperature for 20 minutes before serving.",
      visualCue: {
        primaryTarget: "Uniform, neat sandwiches with filling visible in an even ring at the edge. Shells are smooth and uncracked.",
        spectrum: [
          { state: "Underdone", description: "Filling is squeezed to one side, sandwich is lopsided. Filling visible unevenly at edges.", action: "Apply filling more centrally next time. Gently press again to even out." },
          { state: "Perfect",   description: "Filling forms a neat, even halo at the equator. Top and bottom shells aligned. Sandwich feels substantial but not heavy.", action: "Refrigerate for 24 hours to mature before serving." },
          { state: "Overdone",  description: "Too much filling applied — it bulges beyond the shell edges and the sandwich feels cumbersome.", action: "Scrape back some filling and re-press. Ratio should be roughly 1:1 shell:filling by volume." },
        ],
      },
      feelCue: "After 24 hours in the refrigerator, the macaron should yield to gentle pressure with a slight resistance — the shell exterior is still faintly crisp but the interior has softened to a chew that gives like a ripe fig.",
    },
  ],
};
