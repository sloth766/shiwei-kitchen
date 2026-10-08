export default {
  repoId: "master_thai_coconut_ice_cream_001",
  parentRepoId: null,
  slug: "coconut-ice-cream",
  author: "ForkRecipe Kitchen",

  title: "Thai Coconut Ice Cream",
  description: "No-churn coconut ice cream made with full-fat coconut cream and palm sugar, frozen without a machine into a dense, creamy mass that melts on the tongue in a wave of tropical fat — the palm sugar's caramel-molasses depth threading through the clean white coconut like a dark ribbon. Served in a small wafer cone or over sticky rice on the street, this is simplicity perfected.",
  cuisine: "Thai",
  culture: "Central Thai",
  category: "desserts",

  tags: ["dessert", "thai", "coconut", "ice-cream", "no-churn", "palm-sugar", "frozen"],
  difficulty: 2,
  activeTime: "20 min",
  totalTime: "6 hr 30 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 4, salty: 2, sour: 0, bitter: 0, umami: 0, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Dairy",     name: "Coconut cream, full-fat (not coconut milk)",          ratioValue: 400, defaultUnit: "ml",  substitutions: ["full-fat coconut milk (slightly icier result)"] },
    { ingId: "ing_02", role: "Sweetener", name: "Palm sugar, grated or broken (not refined white)",    ratioValue: 80,  defaultUnit: "g",   substitutions: ["coconut sugar", "light brown sugar (lighter flavor)"] },
    { ingId: "ing_03", role: "Seasoning", name: "Fine sea salt",                                       ratioValue: 3,   defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_04", role: "Binder",    name: "Egg yolks",                                           ratioValue: 3,   defaultUnit: "whole", substitutions: ["omit for vegan (icier, less rich)"] },
    { ingId: "ing_05", role: "Sweetener", name: "Condensed coconut milk (or regular sweetened condensed milk)", ratioValue: 60, defaultUnit: "ml", substitutions: ["sweetened condensed milk"] },
    { ingId: "ing_06", role: "Aromatic",  name: "Pandan leaf, tied in a knot (optional)",             ratioValue: 1,   defaultUnit: "leaf", substitutions: ["1/4 tsp pandan extract", "vanilla bean (different flavor)"] },
    { ingId: "ing_07", role: "Garnish",   name: "Toasted coconut flakes (sweetened or unsweetened)",  ratioValue: 20,  defaultUnit: "g",   substitutions: [] },
    { ingId: "ing_08", role: "Garnish",   name: "Roasted peanuts, roughly crushed (optional)",        ratioValue: 15,  defaultUnit: "g",   substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Heat",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_06"],
      outputState: "warm_coconut_base",
      instructions: "Combine the coconut cream, grated palm sugar, fine salt, and the tied pandan leaf in a medium saucepan. Warm over medium-low heat, stirring regularly, until the palm sugar is completely dissolved — about 5 minutes. The palm sugar will dissolve slowly and the liquid will shift from pure white to a warm ivory-amber as the sugar's caramel compounds integrate. Do not rush this over high heat — the coconut cream scorches easily on the bottom of the pan and can develop a cooked, tinny taste. Once the sugar is fully dissolved, taste the base: it should be distinctly sweet, lightly salty, and carry the palm sugar's characteristic mild molasses note underneath the coconut richness. Remove the pandan leaf and remove from heat.",
      visualCue: {
        primaryTarget: "A smooth, warm, ivory-amber liquid with no visible sugar granules and the pandan leaf floating loosely.",
        spectrum: [
          { state: "Underdone", description: "Palm sugar is still in visible chunks or granules. The liquid is two-toned — pale where unmixed coconut cream dominates, darker where the sugar has begun to dissolve.", action: "Continue stirring over medium-low heat. The palm sugar takes longer than refined sugar." },
          { state: "Perfect",   description: "A uniform, pale amber-ivory liquid with a glossy, oily surface from the coconut fat. Completely smooth with no grainy resistance when rubbed between fingers. Smells of warm coconut and palm sugar caramel.", action: "Remove pandan leaf and proceed to tempering the eggs." },
          { state: "Overdone",  description: "The mixture is bubbling aggressively and a skin of slightly browned coconut has formed on the bottom of the pan.", action: "Remove from heat immediately. Pour into a clean bowl to stop further cooking. Check the bottom — if it smells scorched, the flavor of the ice cream will be affected." },
        ],
      },
      feelCue: "Dip a clean finger into the warm base (carefully — it is hot) and rub it between your thumb and forefinger: it should feel silky and faintly oily from the coconut fat, with absolutely no grainy texture from undissolved sugar.",
    },
    {
      nodeId: "step_2",
      action: "Temper",
      inputs: ["warm_coconut_base", "ing_04", "ing_05"],
      outputState: "tempered_custard_base",
      instructions: "Whisk the egg yolks and condensed milk together in a medium bowl until the mixture is pale yellow and smooth. Now temper the hot coconut base into the yolks: pour a thin, slow stream of the warm coconut base into the yolk mixture, whisking constantly and vigorously. Add the first few tablespoons in a very thin stream — the yolks must gradually equalize in temperature with the hot liquid before you add the bulk. Once you have added about one-third of the hot coconut base, the yolk mixture will be warm and safe to combine quickly — pour in the remainder in a steady stream while continuing to whisk. This technique prevents the yolks from scrambling. Return the combined mixture to the saucepan and cook over medium-low heat, stirring constantly with a silicone spatula in figure-eight strokes, until the mixture thickens slightly and coats the back of the spatula — about 3 to 4 minutes.",
      visualCue: {
        primaryTarget: "A pourable, lightly thickened custard that draws a clean line when a finger is dragged through the coating on the back of a spatula.",
        spectrum: [
          { state: "Underdone", description: "The mixture is still thin and watery — it runs off the spatula immediately without leaving a coating. The eggs have not yet contributed any thickening.", action: "Continue stirring over medium-low heat. The thickening happens quickly once the custard reaches 80°C." },
          { state: "Perfect",   description: "The custard coats the back of the spatula in a thin but even layer. When you draw a finger through the coating, the line holds its edges without the custard running back to fill it. The mixture has a faintly eggy richness added to the coconut base.", action: "Remove from heat and cool." },
          { state: "Overdone",  description: "The custard has begun to curdle — tiny yellow egg particles are visible in the mixture and the surface looks grainy and lumpy.", action: "Remove from heat immediately and strain through a fine sieve. Blend if necessary. The texture will be slightly less smooth but still usable." },
        ],
      },
      feelCue: "When the custard is done, run a clean finger down the back of the coated spatula — the two edges should hold apart cleanly with no liquid seeping back. The custard should feel slightly thicker than heavy cream and leave a thin, silky film on your finger.",
    },
    {
      nodeId: "step_3",
      action: "Freeze",
      inputs: ["tempered_custard_base"],
      outputState: "frozen_ice_cream",
      instructions: "Allow the custard base to cool to room temperature, then refrigerate for at least 1 hour until completely cold — ideally overnight. This pre-chilling dramatically reduces the freezing time and improves the final texture. Pour the cold custard into a shallow, freezer-safe container (a metal loaf pan works well). Freeze for 2 hours until the edges are solidly frozen but the center is still soft and slushy. Remove from freezer and beat vigorously with a fork or hand mixer, breaking up the ice crystals and incorporating air throughout. Return to freezer for another 2 hours. Repeat this beat-and-freeze cycle one more time for the smoothest result. For the final freeze, leave undisturbed for at least 2 hours until fully set. The no-churn method is slower than a machine but the beating cycles break down large ice crystals into fine ones — the difference between grainy and creamy.",
      visualCue: {
        primaryTarget: "A pale ivory-amber, smooth-surfaced, dense mass — no visible ice crystals, with a matte rather than glossy finish when fully set.",
        spectrum: [
          { state: "Underdone", description: "The surface is still liquid at the center and the edges are slushy but not properly frozen. The mixture is still pourable.", action: "Return to freezer. Do not beat until the edges have set solid." },
          { state: "Perfect",   description: "The ice cream is fully set, scoopable with a warm spoon, and produces smooth, cold curls without crumbling. The color is a warm ivory-amber and the surface is dense and matte. Smells of cold coconut and caramel.", action: "Temper at room temperature for 5 minutes before scooping." },
          { state: "Overdone",  description: "Ice cream is frozen rock-solid and shatters rather than scooping. Ice crystals are visible as a slightly grainy or frosty texture on the surface.", action: "Leave at room temperature for 10 minutes to soften. If particularly icy, consider processing briefly in a food processor to break down crystals." },
        ],
      },
      feelCue: "When scooping, the ice cream should yield with moderate resistance to a warm spoon — it should not crumble or shatter (too frozen) or collapse and run (under-set). The scoop should feel dense and cold in the spoon, like chilled clay.",
    },
    {
      nodeId: "step_4",
      action: "Garnish",
      inputs: ["frozen_ice_cream", "ing_07", "ing_08"],
      outputState: "finished_coconut_ice_cream",
      instructions: "Scoop the ice cream into small bowls, wafer cones, or — authentically — into a small portion served over steamed sticky rice. Scatter the toasted coconut flakes over the top of the scoop and add the crushed peanuts if using. The contrast of cold, creamy ice cream against warm or room-temperature sticky rice is a classic Thai street combination. Serve immediately — the ice cream will melt quickly in warm environments. The toasted coconut adds crunch and amplifies the coconut flavor, while the peanuts provide a salty, roasted counterpoint to the sweetness. At street stalls, this ice cream is sometimes served with sweet corn, kidney beans, or taro — do not be surprised by these additions, which are traditional.",
      visualCue: {
        primaryTarget: "A pale ivory-amber scoop with a matte surface, topped with golden-brown toasted coconut flakes and golden peanut pieces.",
        spectrum: [
          { state: "Underdone", description: "Ice cream is too soft from insufficient freezing and is collapsing rather than holding a scoop shape.", action: "Freeze for another hour before scooping." },
          { state: "Perfect",   description: "The scoop holds its shape at room temperature for 3 to 5 minutes before softening at the edges. Toasted coconut is visibly brown and fragrant against the pale ivory cream.", action: "Serve and eat immediately while the contrast between cold cream and crisp garnish is still vivid." },
          { state: "Overdone",  description: "Ice cream has melted to a pool before garnishes could be applied.", action: "Serve as a coconut soup — it still tastes excellent, and it is a legitimate Thai dessert preparation." },
        ],
      },
      feelCue: "The first spoonful should feel cold and dense against the roof of your mouth, melting in a slow, silky wave that coats the tongue in coconut fat and palm sugar caramel. The crunchy toasted coconut arriving a moment later provides the textural contrast that keeps each spoonful interesting.",
    },
  ],
};
