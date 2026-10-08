export default {
  repoId: "master_french_macaron_shells_001",
  parentRepoId: null,
  slug: "macaron-shells",
  author: "ForkRecipe Kitchen",

  title: "French Macaron Shells (Italian Meringue Method)",
  description: "Two almond-flour wafers joined by a pillow of buttercream — their surfaces smooth as polished porcelain, their feet ruffled like a lace collar, their interiors soft and yielding after a day of maturation. The Italian meringue method gives them a stability and gloss that withstands humidity and ships without crumbling.",
  cuisine: "French",
  culture: "French Pâtisserie",
  category: "desserts",

  tags: ["macaron", "french", "meringue", "almond", "pastry", "baking", "gluten-free"],
  difficulty: 5,
  activeTime: "1 hr 30 min",
  totalTime: "3 hr 30 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 5, salty: 0, sour: 0, bitter: 1, umami: 0, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Blanched almond flour, extra-fine (sifted twice)", ratioValue: 1, defaultUnit: "parts", substitutions: ["hazelnut flour for a noisette variation"] },
    { ingId: "ing_02", role: "Sweetener",  name: "Icing sugar (10X confectioners' sugar), sifted", ratioValue: 1, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Binder",     name: "Aged egg whites — divided: raw whites for tant-pour-tant, and whites for meringue", ratioValue: 0.74, defaultUnit: "parts total (split as directed)", substitutions: ["fresh egg whites (rest uncovered in fridge 48 hrs to age)"] },
    { ingId: "ing_04", role: "Sweetener",  name: "Caster sugar (for the Italian meringue syrup)", ratioValue: 0.74, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Liquid",     name: "Water (for the syrup)", ratioValue: 0.18, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Seasoning",  name: "Cream of tartar (stabilises the meringue)", ratioValue: 0.003, defaultUnit: "parts", substitutions: ["a few drops of white wine vinegar"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Blend",
      inputs: ["ing_01", "ing_02"],
      outputState: "tant_pour_tant",
      instructions: "Weigh the almond flour and icing sugar precisely — macarons are a baking formula, not a recipe, and a 5g deviation in a 300g batch will affect the outcome. Pulse them together in a food processor for 30 seconds to break up any clumps and homogenise the particle sizes. Sift through a fine-mesh sieve into a large bowl, discarding any coarse almond particles that won't pass through — these lumpy particles create bumps on the macaron surface. If your almond flour is coarser, re-process and sift again. The tant-pour-tant (equal-weight almond and sugar) should be completely smooth, dry, and fine, like very fine sand. Add the first portion of aged egg whites (approximately half the total egg whites) to the tant-pour-tant and mix with a spatula until you have a thick, paste-like batter. Cover and set aside.",
      visualCue: {
        primaryTarget: "A completely smooth, fine powder of almond and sugar with no clumps or coarse particles, mixed with egg whites into a thick, homogenous paste.",
        spectrum: [
          { state: "Underdone", description: "Coarse almond particles still visible. The sieve left too much behind.", action: "Process the almond flour longer or buy a finer-ground almond flour. The discarded particles can be used in cookies." },
          { state: "Perfect",   description: "Silky fine powder that passes completely through the sieve with gentle pressing. The paste made with egg whites is thick and spreads slowly. No lumps.", action: "Set the paste aside and make the Italian meringue." },
          { state: "Overdone",  description: "The food processor has run so long the almond flour is starting to express oil and clump into a paste before mixing with the sugar.", action: "Pulse in short bursts, not continuously. Almond flour can turn into almond butter if overprocessed." },
        ],
      },
      feelCue: "Rub a pinch of the tant-pour-tant between your fingers — it should feel as fine and dry as talcum powder, with no graininess from sugar and no oiliness from the almond. That fineness is what gives a macaron its smooth skin.",
    },
    {
      nodeId: "step_2",
      action: "Boil",
      inputs: ["ing_04", "ing_05"],
      outputState: "sugar_syrup",
      instructions: "Combine the caster sugar and water in a small, clean saucepan. Heat over medium-high heat without stirring — stirring encourages crystallisation. Fit a candy thermometer or use an instant-read thermometer. While the syrup heats, begin whipping the second portion of aged egg whites with the cream of tartar in the bowl of a stand mixer fitted with the whisk attachment, on medium speed. When the syrup reaches 115°C (239°F), increase the mixer to high speed. When the syrup reaches exactly 118–121°C (244–250°F, soft-ball stage), remove from heat immediately. With the mixer running on high, pour the hot syrup in a slow, thin, steady stream down the inside of the bowl — never directly onto the whisk, which will spin it into sugar threads on the bowl sides. The hot syrup cooks and stabilises the meringue as it is incorporated.",
      visualCue: {
        primaryTarget: "Clear, slightly viscous syrup with large, slow bubbles at 118°C. A drop in cold water forms a soft, pliable ball.",
        spectrum: [
          { state: "Underdone", description: "Syrup is still below 115°C. Thin and very fluid. A drop in cold water dissolves.", action: "Continue heating without stirring. The temperature climbs quickly above 100°C." },
          { state: "Perfect",   description: "Large, lazy bubbles rise slowly. The thermometer reads 118–121°C. A drop in ice water forms a soft, flexible ball you can squish between fingers.", action: "Pour immediately into the whipping egg whites." },
          { state: "Overdone",  description: "Syrup has gone past 125°C. It will seize the meringue into stiff, crystallised threads when poured.", action: "Discard and start the syrup again. There is no recovery from overcooked sugar syrup in this application." },
        ],
      },
      feelCue: "A drop of syrup at the right temperature landing on a cold metal surface sounds like a sharp tick and immediately sets into a pliable, almost gummy bead — not a brittle hard candy, not a thin runny puddle.",
    },
    {
      nodeId: "step_3",
      action: "Whip",
      inputs: ["sugar_syrup"],
      outputState: "italian_meringue",
      instructions: "After incorporating all the syrup into the whipping whites, continue beating on high for 8–10 minutes until the meringue reaches firm, glossy peaks and the bowl feels just warm — not hot — to the touch. The Italian meringue should be bright white, very glossy, and hold stiff peaks that curl slightly at the tip. If you lift the whisk and turn it upside down, the peak should hold its shape without drooping. The meringue must cool to around 40°C before you fold it into the almond paste — too hot and it will melt the fat in the almond flour; too cold and it will stiffen and resist folding. The meringue can rest, covered, for up to 10 minutes while you prepare for the macaronage.",
      visualCue: {
        primaryTarget: "Bright white, very glossy meringue with stiff peaks that curl slightly at the tip. Completely smooth, no visible sugar granules, feels just warm to the touch.",
        spectrum: [
          { state: "Underdone", description: "The meringue is still soft and drooping. Peaks fold over completely. The bowl feels quite warm.", action: "Continue whipping. It needs more time for the hot syrup to fully stabilise the whites." },
          { state: "Perfect",   description: "Stiff, glossy, brilliant-white peaks that curl slightly but don't droop. The bowl feels pleasantly warm, not hot. The meringue is dense and weighty.", action: "Cool slightly then begin macaronage immediately." },
          { state: "Overdone",  description: "The meringue looks dry and grainy. It has been beaten too long after cooling and has lost cohesion.", action: "Unfortunately it cannot be saved. The meringue's structure is irreversibly damaged. Start again." },
        ],
      },
      feelCue: "Rub a tiny amount between your fingers — it should feel perfectly smooth, like satin. Not gritty, not wet, not stiff. The temperature at the peak of the whisk should feel like warm skin, not hot water.",
    },
    {
      nodeId: "step_4",
      action: "Fold",
      inputs: ["italian_meringue", "tant_pour_tant"],
      outputState: "macaronage_batter",
      instructions: "Add the Italian meringue to the almond paste in three additions, folding with a wide silicone spatula. The technique is called macaronage: use the flat of the spatula to smear the batter against the side of the bowl in a sweeping motion, rotating the bowl with your other hand. This deliberately deflates the meringue to achieve the correct ribbon consistency. The macaronage is complete when the batter falls from the spatula in a thick, continuous ribbon — draw the spatula through the batter and lift: it should flow back together in 10 seconds, erasing the trace completely. If the trace takes more than 15 seconds to disappear, continue folding. If the batter flows like liquid, you have gone too far. The correct batter moves slowly, like lava, and when a ribbon of it falls onto the surface it sinks back in 8–10 seconds. Most batches take 40–60 fold strokes total.",
      visualCue: {
        primaryTarget: "Batter flows off the spatula in a wide, slow, continuous ribbon. When it lands, the ribbon sinks back into the surface in 8–10 seconds, leaving no trace.",
        spectrum: [
          { state: "Underdone", description: "The batter is still stiff and falls off the spatula in thick clumps. The ribbon stands proud for more than 15 seconds before sinking. Shells will have peaks that don't melt.", action: "Continue the macaronage fold. Count the strokes — you are probably at 20–30 and need 40–60." },
          { state: "Perfect",   description: "Slow, flowing ribbon. The drawn trace disappears in 8–10 seconds. The batter looks like lava — thick, slow-moving, but fluid. Glossy surface.", action: "Transfer to a piping bag and pipe immediately." },
          { state: "Overdone",  description: "The batter flows like thin pancake batter. The ribbon sinks instantly with no trace. The batter has been over-deflated.", action: "There is no recovery. Shells will spread flat with no feet. Use the batter to make a joconde sponge instead." },
        ],
      },
      feelCue: "The batter should sound like a slow, viscous pour — not a splat, not a trickle. Hold the spatula 30 cm above the bowl and let the batter fall: it should stretch into a long, unbroken tongue before releasing.",
    },
    {
      nodeId: "step_5",
      action: "Bake",
      inputs: ["macaronage_batter"],
      outputState: "finished_macaron_shells",
      instructions: "Pipe the batter onto parchment-lined baking sheets in 3.5 cm rounds, holding the piping bag perpendicular to the sheet at a height of 1 cm. After piping, firmly tap the baking sheet against the counter 5 times to release trapped air bubbles. Burst any bubbles with a toothpick. Let the piped rounds rest at room temperature for 30–60 minutes, until a dry skin forms on the surface — when you touch one lightly with the tip of a finger, it should not stick and should feel slightly tacky but firm. This skin is what forces the expanding air to push out through the bottom during baking, creating the characteristic ruffled feet. Bake at 150°C (300°F) in a convection oven (or 160°C / 320°F conventional) for 13–15 minutes. Rotate the pan at the 7-minute mark. The shells are done when they lift cleanly off the parchment with no resistance.",
      visualCue: {
        primaryTarget: "Smooth, porcelain-flat surfaces, well-defined ruffled feet at the base, and an even pale colour (or the colour of added dye). Shells lift cleanly from parchment.",
        spectrum: [
          { state: "Underdone", description: "Shells feel soft and sticky when pressed. The base resists lifting cleanly from the parchment. Feet are present but the interior is wet.", action: "Return to the oven for 2 more minutes. Test again — they often need just a minute more than you expect." },
          { state: "Perfect",   description: "Shells feel dry and firm on the surface. Feet are well-ruffled. They lift cleanly off the parchment. The top surface is smooth with no cracks. Interiors are slightly chewy.", action: "Cool completely on the pan before filling. Macaron shells improve after 24 hours rest in the fridge." },
          { state: "Overdone",  description: "Shells are too dry, brittle, and beginning to colour around the edges. Cracked surfaces.", action: "Still usable if not cracked. Fill immediately with a moist ganache which will rehydrate them. Do not fill with buttercream as it will not restore moisture." },
        ],
      },
      feelCue: "Run a fingertip across the dry shell surface before baking — it should feel like smooth matte paper, barely tacky, not wet or shiny. After baking, a gentle pinch should give a tiny, dry crunch on the surface before yielding to a soft, slightly chewy interior.",
    },
  ],
};
