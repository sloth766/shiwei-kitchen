export default {
  repoId: "master_french_eclairs_001",
  parentRepoId: null,
  slug: "eclairs",
  author: "ForkRecipe Kitchen",

  title: "Chocolate Éclairs",
  description: "The most demanding of the French pastry classics — a hollow shell of pâte à choux that must be absolutely dry and rigid, filled with cold pastry cream that has been folded with whipped cream to silk lightness, sealed with a mirror-gloss dark chocolate fondant that sets in seconds and cracks cleanly when bitten.",
  cuisine: "French",
  culture: "French Pâtisserie",
  category: "desserts",

  tags: ["eclairs", "choux", "pastry cream", "chocolate", "french", "patisserie", "elegant"],
  difficulty: 4,
  activeTime: "90 min",
  totalTime: "4 hr",
  ratioSystem: "parts",

  stars: 1567,
  forks: 112,
  contributors: 27,
  license: "CC-BY-SA",
  createdAt: "2025-03-08",
  updatedAt: "2025-07-01",

  flavorRadar: { sweet: 4, salty: 1, sour: 0, bitter: 2, umami: 0, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Liquid",    name: "Water",                                          ratioValue: 100, defaultUnit: "parts", substitutions: ["half water, half whole milk"] },
    { ingId: "ing_02", role: "Fat",       name: "Unsalted butter, cubed",                        ratioValue: 45,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Structure", name: "All-purpose flour, sifted",                     ratioValue: 60,  defaultUnit: "parts", substitutions: ["bread flour (crispier shell)"] },
    { ingId: "ing_04", role: "Protein",   name: "Large eggs (room temperature)",                 ratioValue: 110, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Seasoning", name: "Fine sea salt",                                 ratioValue: 1,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Dairy",     name: "Whole milk (for pastry cream)",                 ratioValue: 150, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Protein",   name: "Egg yolks (for pastry cream)",                  ratioValue: 40,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_08", role: "Sweetener", name: "Granulated sugar (for pastry cream)",           ratioValue: 35,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_09", role: "Starch",    name: "Cornstarch (for pastry cream)",                 ratioValue: 15,  defaultUnit: "parts", substitutions: ["custard powder"] },
    { ingId: "ing_10", role: "Structure", name: "Dark chocolate (64%) for fondant glaze",        ratioValue: 50,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_11", role: "Dairy",     name: "Heavy cream (for fondant glaze)",               ratioValue: 30,  defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Cook pastry cream",
      inputs: ["ing_06", "ing_07", "ing_08", "ing_09"],
      outputState: "pastry_cream",
      instructions: "Heat the milk to a bare simmer. Whisk yolks, sugar, and cornstarch together in a bowl until pale and thick. Pour half the hot milk over the egg mixture, whisking constantly, then return everything to the saucepan. Cook over medium heat, stirring constantly with a whisk, until the cream boils and thickens — it must reach a full boil to fully cook out the cornstarch enzyme that causes it to thin again on cooling. Strain through a fine sieve into a clean bowl, press plastic wrap directly on the surface, and refrigerate until fully cold — minimum 2 hours.",
      visualCue: {
        primaryTarget: "Thick, glossy, smooth cream with no lumps. When a finger is dragged through a coating on the back of a spoon, the line holds cleanly without flowing back.",
        spectrum: [
          { state: "Underdone", description: "Cream is still pourable and thin. A finger-line on the back of a spoon flows back immediately. It has not reached a full boil.", action: "Continue cooking and stirring vigorously. Undercooked pastry cream tastes starchy and will thin significantly on refrigeration." },
          { state: "Perfect",   description: "Thick, glossy, and just barely pourable in the hot state. Sets to a firm, sliceable consistency when chilled. The finger-line test holds perfectly.", action: "Strain immediately, press plastic wrap directly on surface, and refrigerate." },
          { state: "Overdone",  description: "Cream has become very thick and lumpy. Small curds visible — the egg proteins have begun to coagulate into scrambled egg.", action: "Strain immediately through a fine sieve and whisk vigorously — often salvageable if you act fast." },
        ],
      },
      feelCue: "The cream should fall from the whisk in thick, slow waves when it is done — denser than hollandaise but lighter than pudding. The aroma should be clean and milky with a cooked-egg note, never starchy or raw.",
    },
    {
      nodeId: "step_2",
      action: "Pipe choux",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_04", "ing_05"],
      outputState: "piped_eclairs",
      instructions: "Make pâte à choux: bring water, butter, and salt to a rolling boil, add all flour at once, stir vigorously until the dough pulls away from the pan and forms a dry film on the bottom (about 2 minutes over medium heat). Cool for 2 minutes, then beat in eggs one at a time until the dough falls from a spoon in a V-shaped ribbon. Fill a piping bag with a large plain tip (14mm). Pipe 12cm logs on a parchment-lined sheet, keeping the pipe absolutely level and consistent in pressure. Wet a finger and smooth any peaks.",
      visualCue: {
        primaryTarget: "Uniform 12cm logs with a consistent diameter of about 2.5cm. The surface is smooth with no peaks or ridges. All logs are the same size.",
        spectrum: [
          { state: "Underdone", description: "Logs are uneven in thickness — fat at the start, thin at the end. The dough dragged as it was piped. Peaks visible where the piping bag was lifted.", action: "Smooth peaks with a wet fingertip. Uneven thickness leads to uneven baking — thicker sections remain raw while thin sections burn." },
          { state: "Perfect",   description: "Uniform, smooth 12cm logs of consistent diameter. The surface is slightly glossy. All look identical.", action: "Bake immediately at 200°C for 25–30 minutes." },
          { state: "Overdone",  description: "Dough was too soft and logs have spread flat. They are wider than intended and the shape has lost definition.", action: "Bake anyway — the shell will work but may be harder to fill evenly." },
        ],
      },
      feelCue: "The dough should feel smooth but slightly sticky when touched. When you pull the piping bag away, the dough should stretch to a fine point then snap clean — if it doesn't snap, it is too wet.",
    },
    {
      nodeId: "step_3",
      action: "Bake",
      inputs: ["piped_eclairs"],
      outputState: "baked_eclairs",
      instructions: "Bake at 200°C (390°F) for 25 minutes without opening the oven — steam inside the shells is what causes the hollow cavity, and cold air will collapse them irreversibly. After 25 minutes, reduce to 170°C and bake 10 more minutes with the oven door slightly ajar to allow the steam to escape. The finished shells should be deep golden-brown, completely dry, hollow-sounding when tapped, and rigid. Pierce each end immediately with a skewer when they come out of the oven.",
      visualCue: {
        primaryTarget: "Deep golden-amber shells that feel completely rigid when squeezed gently. Hollow sound when tapped. The crack along the top (the natural choux split) looks dry and set.",
        spectrum: [
          { state: "Underdone", description: "Golden but the shells feel soft and slightly yielding when squeezed. The interior is still moist — the hollow has not fully dried out.", action: "Bake 5 more minutes with the door ajar. Soft-shelled eclairs collapse within minutes and cannot be filled." },
          { state: "Perfect",   description: "Rigid, deep golden shells that ring hollow when tapped. The natural split along the top is dry and set. They hold their shape completely.", action: "Pierce ends immediately and cool completely on a rack before filling." },
          { state: "Overdone",  description: "Very dark brown, almost mahogany. The shells are extremely rigid and the natural crack has opened very wide, exposing the hollow interior.", action: "Proceed — the darker bake means a slightly more bitter shell, which pairs well with sweet pastry cream." },
        ],
      },
      feelCue: "A perfect baked éclair shell feels hollow and light — almost impossibly light for its size. Squeeze it gently between thumb and fingers: it should be completely rigid with no give at all, like squeezing a dry cracker.",
    },
    {
      nodeId: "step_4",
      action: "Fill",
      inputs: ["baked_eclairs", "pastry_cream"],
      outputState: "filled_eclairs",
      instructions: "Whip the chilled pastry cream briefly until smooth. Fill a piping bag with a small plain tip (5mm). Insert the tip into one of the pierced ends of each éclair and pipe slowly, filling until cream just begins to emerge from the other end. The shell should feel noticeably heavier and the sides should resist gently when squeezed — a sign of even filling. Do not overfill — bulging shells look clumsy and risk cracking.",
      visualCue: {
        primaryTarget: "Each éclair feels evenly weighted and heavy. A tiny bead of cream is just barely visible at both ends. No bulging sides.",
        spectrum: [
          { state: "Underdone", description: "The éclair feels light and hollow. Very little cream emerged from the far end during filling. One bite will reveal a large empty cavity.", action: "Insert the piping tip again and add more cream — the goal is complete, even filling throughout." },
          { state: "Perfect",   description: "Shell feels heavy and uniform. A small bead of cream at each piercing. Sides are smooth with no bulging. The filling will be consistent in every bite.", action: "Dip in chocolate glaze immediately." },
          { state: "Overdone",  description: "The sides are beginning to bulge outward and may crack. Cream is emerging freely from both ends.", action: "The shell has been overfilled. Gently press the sides to redistribute, and glaze immediately to hold shape." },
        ],
      },
      feelCue: "A properly filled éclair should feel like it has a dense, uniform interior — no hollow center, no heavy spots. Run your fingers along the length: it should feel consistently solid and moderately weighted.",
    },
    {
      nodeId: "step_5",
      action: "Glaze",
      inputs: ["filled_eclairs", "ing_10", "ing_11"],
      outputState: "finished_eclairs",
      instructions: "Make the glaze: heat the heavy cream to a simmer, pour over the chopped dark chocolate, wait 60 seconds, then stir from the center outward until completely smooth and glossy. Dip the top of each éclair into the glaze at a 45-degree angle, allowing excess to drip for 3–4 seconds. Run a clean finger along one edge of the dipped side to create a clean glaze line. Refrigerate for 20 minutes to set the glaze before serving. The glaze should set firm and crack cleanly when bitten.",
      visualCue: {
        primaryTarget: "A smooth, mirror-gloss chocolate cap covering the top third of each éclair. The glaze line is clean and level. No drips down the sides. The glaze has set to a firm, shiny surface.",
        spectrum: [
          { state: "Underdone", description: "The glaze is too warm and thin — it runs down the sides rather than sitting in a controlled cap. Drips visible on the shell. The surface won't set firm enough.", action: "Let the glaze cool further until it coats the back of a spoon — about 35–38°C is ideal for dipping." },
          { state: "Perfect",   description: "Clean, level glaze cap with a mirror-like shine. No drips. The glaze sets at room temperature in about 5 minutes and feels firm — not tacky — when touched.", action: "Serve within 4 hours of glazing." },
          { state: "Overdone",  description: "The glaze has cooled too much and is thick and mattified. It drags on the shell surface and sets with a rough, uneven texture.", action: "Warm the glaze gently over a bain-marie to 38°C and re-dip." },
        ],
      },
      feelCue: "A set glaze should feel firm and cool under a fingertip — not tacky. When you bite through it, it should crack cleanly with a sharp, satisfying snap before giving way to the cool, silky pastry cream within.",
    },
  ],
};
