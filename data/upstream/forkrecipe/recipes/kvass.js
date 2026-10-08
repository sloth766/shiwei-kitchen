export default {
  repoId: "master_russian_kvass_001",
  parentRepoId: null,
  slug: "kvass",
  author: "ForkRecipe Kitchen",

  title: "Kvass",
  description: "Russia's ancient fermented rye bread drink — dark bread toasted to charcoal bitterness, steeped in boiling water, sweetened, and inoculated with yeast for 48 hours until it becomes a lightly fizzing, amber drink that tastes of sour bread, dark malt, and the earth itself, with barely enough alcohol to count and more than enough character to remember.",
  cuisine: "Russian",
  culture: "Eastern Europe",
  category: "beverages",

  tags: ["kvass", "russian", "fermented", "bread-drink", "rye", "eastern-european", "probiotic"],
  difficulty: 2,
  activeTime: "30 min",
  totalTime: "3 days",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",

  flavorRadar: { sweet: 2, salty: 0, sour: 3, bitter: 2, umami: 2, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Dark rye bread (stale, or any rye sourdough)", ratioValue: 1,   defaultUnit: "part", substitutions: ["pumpernickel bread", "Borodinsky bread"] },
    { ingId: "ing_02", role: "Solvent",    name: "Filtered water (boiling)",                      ratioValue: 8,   defaultUnit: "part", substitutions: [] },
    { ingId: "ing_03", role: "Sweetener",  name: "Raw cane sugar or dark honey",                  ratioValue: 0.5, defaultUnit: "part", substitutions: ["malt extract", "molasses"] },
    { ingId: "ing_04", role: "Leavener",   name: "Active dry yeast",                              ratioValue: 0.05, defaultUnit: "part", substitutions: ["sourdough starter (3x the amount for a wilder ferment)"] },
    { ingId: "ing_05", role: "Aromatic",   name: "Fresh mint or raisins (optional, for flavor)",  ratioValue: 0.1, defaultUnit: "part", substitutions: ["lemon zest", "caraway seeds"] },
    { ingId: "ing_06", role: "Acid",       name: "Slice of lemon (optional, for freshness)",      ratioValue: 0.05, defaultUnit: "part", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Toast the bread",
      inputs: ["ing_01"],
      outputState: "toasted_bread_cubes",
      instructions: "Slice or tear the rye bread into 1–2 cm cubes or thick slices and spread them on a baking sheet. Toast in the oven at 200 C (400 F) for 20–30 minutes, turning once halfway, until the bread is uniformly very dark — approaching but not quite black. Traditional kvass uses bread toasted dark enough that many Westerners would consider it burned. This dark toast is what gives kvass its characteristic deep, slightly bitter, malty-roasted flavor. The Maillard reaction compounds and caramelized starches from the crust of the bread are the structural flavor backbone of the drink. Do not use whitened or untoasted bread — the flavor will be flat and watery.",
      visualCue: {
        primaryTarget: "Dark brown to near-black bread cubes, uniformly toasted with no pale patches. The surface should look and smell like very dark toast with a slightly bitter char at the edges.",
        spectrum: [
          { state: "Underdone", description: "Light golden or mid-brown croutons. Smell is only of mild toast with no depth or bitterness.", action: "Return to the oven and toast darker. Traditional kvass requires deep, almost intimidating darkness in the bread." },
          { state: "Perfect",   description: "Very dark brown, approaching black at the thinnest edges. Uniformly roasted. Smells of dark malt, coffee, and caramelized rye. A piece snaps crisply when broken.", action: "Add to boiling water immediately to steep." },
          { state: "Overdone",  description: "Completely black and charred. Smells of carbon and burning. Ash-like quality when bitten.", action: "If only the very smallest pieces are charred, proceed anyway and taste the final brew — some char is traditional. If everything is fully burnt and acrid, start over with fresh bread." },
        ],
      },
      feelCue: "Snap a piece of well-toasted kvass bread: it should break cleanly and crisply with a sound like snapping a cracker. The interior should be dry and dark all the way through, not soft in the center.",
    },
    {
      nodeId: "step_2",
      action: "Steep",
      inputs: ["toasted_bread_cubes", "ing_02"],
      outputState: "bread_wort",
      instructions: "Place the toasted bread cubes in a large heatproof vessel (glass, ceramic, or stainless steel — not bare aluminum or reactive metal). Pour the boiling water over them. The water will immediately turn a deep, mahogany-brown as the roasted sugars and color compounds leach out — this rapid color extraction is deeply satisfying. Stir briefly, cover, and steep at room temperature for 2–3 hours until completely cool. The resulting liquid is called the 'wort' — the traditional brewers' term for the sugar-and-flavor-rich liquid that will be fermented. It should be very dark brown, taste of roasted rye and bitterness, and have a pleasant malty smell.",
      visualCue: {
        primaryTarget: "A very dark, mahogany-to-near-black liquid in which the bread is now soft and disintegrating. The color is deeper than any commercial dark beer.",
        spectrum: [
          { state: "Underdone", description: "Still pale — the bread wasn't dark enough, or the steep time was too short. Tastes watery.", action: "If the bread wasn't dark enough, you can toast additional bread cubes and add them to the wort. Steep longer — minimum 2 hours." },
          { state: "Perfect",   description: "Deep mahogany. Tastes bitter, malty, and slightly sweet from the bread's residual starch. Smells like a bakery crossed with a brewery.", action: "Strain and add sugar and yeast to ferment." },
          { state: "Overdone",  description: "Excessively bitter and tar-like from over-extracted charred bread. Tastes like coffee grounds.", action: "Dilute with additional hot water to reduce the bitterness. Taste and adjust." },
        ],
      },
      feelCue: "Lift some wort on a spoon and smell it: close your eyes and it should smell simultaneously of a dark bakery and a mild brewery — roasted grains, malt, caramel, and the barest hint of bread yeast from the crust. This is the aroma you are fermenting into.",
    },
    {
      nodeId: "step_3",
      action: "Ferment",
      inputs: ["bread_wort", "ing_03", "ing_04", "ing_05", "ing_06"],
      outputState: "fermented_kvass",
      instructions: "Strain the wort through a fine-mesh sieve, pressing the bread pulp to extract all liquid. Discard the spent bread. While the wort is still warm (but below 38 C — test on your wrist), dissolve the sugar completely and sprinkle the yeast over the surface. Stir gently to incorporate and add the optional mint or raisins and lemon slice. Cover with a cloth and leave at room temperature (21–24 C) for 24–48 hours. Within 8–12 hours you will see the kvass begin to bubble and foam at the surface as the yeast converts the bread's sugars into alcohol and carbon dioxide. Taste after 24 hours: sweet and gently sour; taste after 48: more sour and complex. The yeast sediment will settle.",
      visualCue: {
        primaryTarget: "After 48 hours: an amber-to-dark brown liquid with a thin foam at the surface, bubbling gently, and a yeasty-sour smell. The bread sediment has settled to the bottom.",
        spectrum: [
          { state: "Underdone", description: "Still very sweet, barely sour, with little to no foam activity after 24 hours.", action: "Move to a warmer spot. If still no activity after 36 hours, the yeast may have been dead — add a fresh 1/4 tsp of active dry yeast." },
          { state: "Perfect",   description: "Lively foam, clearly sour and pleasantly bitter, with just a whisper of residual sweetness. Smells of yeast, dark bread, and mild fermentation.", action: "Strain and bottle for light carbonation." },
          { state: "Overdone",  description: "Very sour, flat (all CO2 has escaped), and slightly alcoholic. No sweetness.", action: "Still fine to drink — it has fermented to its fullest. Bottle immediately in the refrigerator to halt further fermentation." },
        ],
      },
      feelCue: "Taste the kvass at 24 hours and again at 48: the change is dramatic. At 24 hours it tastes like dark bread dissolved in slightly sour water. At 48 hours it tastes like a proper beverage — complex, lively, alive. Trust your palate over the timer.",
    },
    {
      nodeId: "step_4",
      action: "Bottle and serve",
      inputs: ["fermented_kvass"],
      outputState: "finished_kvass",
      instructions: "Strain the kvass through a fine-mesh cloth to remove the yeast sediment and any aromatics. Transfer to clean, sealable bottles or a covered pitcher. For light carbonation, add 1/2 teaspoon of sugar per liter before sealing, and leave at room temperature for 6–12 more hours before refrigerating. Kvass is ready to drink immediately and keeps for 3–5 days refrigerated, after which it continues to sour and eventually becomes unpleasant. Serve cold, straight or over ice. In Russia it is also used as a base for okroshka (cold soup) and as a marinade for meat.",
      visualCue: {
        primaryTarget: "Dark amber to mahogany brown in a glass, faintly fizzing, with the color of dark craft beer and a light foam ring at the glass rim when poured.",
        spectrum: [
          { state: "Underdone", description: "Flat, sweet, barely any sour note. Tastes like dark bread water.", action: "Ferment another 12–24 hours before bottling." },
          { state: "Perfect",   description: "Pleasantly sour, malty, slightly bitter, earthy, and faintly fizzy. Refreshing despite its dark color. The taste lingers warmly on the tongue.", action: "Refrigerate and consume within 5 days." },
          { state: "Overdone",  description: "Very sour, almost vinegar-sharp, with no sweetness. Flat.", action: "Use it as a marinade for pork or beef — its acidity is a perfect tenderizer and the dark malt flavor adds depth." },
        ],
      },
      feelCue: "A glass of well-made kvass has a slight body from dissolved rye starch — it is denser than water but lighter than beer, somewhere between a light broth and a sparkling water. The carbonation is gentle and natural, more of a tingle than a fizz.",
    },
  ],
};
