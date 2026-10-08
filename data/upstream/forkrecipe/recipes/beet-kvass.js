export default {
  repoId: "master_ukrainian_beet_kvass_001",
  parentRepoId: null,
  slug: "beet-kvass",
  author: "ForkRecipe Kitchen",

  title: "Beet Kvass",
  description: "Raw beet cubes submerged in salt brine, left to ferment in a dark corner for a week — the result is a deeply ruby, probiotic tonic with an earthy sweetness and a clean lactic tang that borscht cooks have been sipping for generations.",
  cuisine: "Eastern European",
  culture: "Ukrainian",
  category: "beverages",

  tags: ["kvass", "beet", "fermented", "ukrainian", "probiotic", "beverage"],
  difficulty: 1,
  activeTime: "15 min",
  totalTime: "7 days 15 min",
  ratioSystem: "parts",

  stars: 680,
  forks: 42,
  contributors: 14,
  license: "CC-BY-SA",
  createdAt: "2025-01-20",
  updatedAt: "2025-06-05",

  flavorRadar: { sweet: 2, salty: 3, sour: 4, bitter: 1, umami: 2, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure", name: "Raw beets (washed, unpeeled, cubed 2cm)", ratioValue: 100, defaultUnit: "parts", substitutions: ["golden beets (milder)", "Chioggia beets"] },
    { ingId: "ing_02", role: "Liquid",    name: "Non-chlorinated water (filtered or boiled and cooled)", ratioValue: 200, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Seasoning", name: "Non-iodized salt (sea salt or kosher)",   ratioValue: 4,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Allium",    name: "Garlic cloves (peeled, optional)",        ratioValue: 4,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Aromatic",  name: "Caraway seeds (optional)",                ratioValue: 2,   defaultUnit: "parts", substitutions: ["dill seeds", "black pepper"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Dissolve",
      inputs: ["ing_02", "ing_03"],
      outputState: "brine",
      instructions: "Dissolve the salt in the water, stirring until completely clear with no visible crystals. Non-iodized salt is essential — iodine kills the beneficial lactobacillus bacteria that drive the fermentation. Non-chlorinated water matters equally: tap water with chlorine will inhibit fermentation. Use filtered water, or boil tap water and cool it completely before use. The brine concentration here (approximately 2% by weight) is below pickling strength, allowing fermentation rather than simply preservation.",
      visualCue: {
        primaryTarget: "Completely clear water with no visible salt crystals remaining. Water should look identical to plain water.",
        spectrum: [
          { state: "Underdone", description: "Salt crystals are still visible at the bottom of the container. Not fully dissolved.", action: "Stir more vigorously. Salt must be completely dissolved before adding beets — undissolved salt sits at the bottom and doesn't protect the beets above it." },
          { state: "Perfect",   description: "Completely clear, salt fully dissolved. A drop tasted is distinctly but pleasantly salty — like mild seawater.", action: "Add the beets and aromatics." },
          { state: "Overdone",  description: "Added too much salt — brine tastes aggressively salty, more than twice the salinity of seawater.", action: "Dilute with more water. A 2% brine allows fermentation; higher concentrations only pickle." },
        ],
      },
      feelCue: "Dip a clean finger in the brine and taste — it should be clearly salty but not overwhelming. Think mineral water at the beach, not mouthwash.",
    },
    {
      nodeId: "step_2",
      action: "Press",
      inputs: ["brine", "ing_01", "ing_04", "ing_05"],
      outputState: "packed_kvass_jar",
      instructions: "Cube the unpeeled beets into roughly 2cm pieces — peeling is not necessary and the skin carries wild yeast and bacteria that help kickstart fermentation. Pack the beet cubes tightly into a clean, wide-mouth jar along with the garlic and caraway seeds if using. Pour the salt brine over to completely submerge all the beets. The beets must remain below the brine surface at all times. If they float, weigh them down with a small jar of water or a clean stone. Leave 3–4cm of headspace for fermentation activity.",
      visualCue: {
        primaryTarget: "Beets are tightly packed, fully submerged in clear brine. No beet surfaces are exposed to air.",
        spectrum: [
          { state: "Underdone", description: "Beet cubes are floating above the brine line. Air-exposed surfaces will develop mold.", action: "Add more brine if needed, then weigh down the beets with something clean and heavy." },
          { state: "Perfect",   description: "All beet surfaces are submerged. Brine is clear. Jar is full to within 3–4cm of the lid.", action: "Cover loosely and begin fermentation." },
          { state: "Overdone",  description: "Jar is filled to the very top with no headspace.", action: "Remove some brine — the fermentation will produce CO2 gas and expand, and an overfull jar will overflow messily." },
        ],
      },
      feelCue: "The packed jar should feel heavy and dense in your hands — a good sign that the beets are packed efficiently and the brine is filling all the gaps.",
    },
    {
      nodeId: "step_3",
      action: "Ferment",
      inputs: ["packed_kvass_jar"],
      outputState: "finished_beet_kvass",
      instructions: "Cover the jar with a cloth secured with a rubber band, or a loose lid — it should allow gas to escape but keep contaminants out. Store at room temperature (18–22°C) out of direct light for 5–7 days. After 24 hours you should see small bubbles at the brine surface. Skim any white foam that forms on top — this is harmless kahm yeast, not mold. By day 5, the brine will be a vivid, deep ruby-red and the flavor will be earthy, sweet, and pleasantly sour. Strain into bottles and refrigerate. The cold halts fermentation and preserves the tonic for 4–6 weeks.",
      visualCue: {
        primaryTarget: "After 5–7 days: vivid, translucent ruby-red brine. Small bubbles visible in the liquid when the jar is gently tilted. Beet cubes have lightened slightly in color as pigment has leached into the brine.",
        spectrum: [
          { state: "Underdone", description: "After 3 days, brine is pale pink-red and still smells mainly of raw beet and salt. No sour note. Few bubbles.", action: "Wait 2 more days. Fermentation speed depends on temperature — cooler kitchens take longer." },
          { state: "Perfect",   description: "Deep ruby-red, visibly bubbly when tilted. The brine smells earthy and tangy — fermented beet rather than raw beet. A sip is pleasantly sour, earthy, and savory.", action: "Strain and refrigerate." },
          { state: "Overdone",  description: "Fermented past 10 days at room temperature — brine is very dark and intensely sour, nearly vinegary. Beet cubes are pale and spent.", action: "Use in smaller amounts and dilute with water. Excellent as a salad dressing base or added to borscht for sourness." },
        ],
      },
      feelCue: "Lean close to the jar on day 3 and tilt slightly — you should hear the faint hiss of escaping CO2 and smell the first sweet-sour note that tells you the lactobacillus has taken hold.",
    },
  ],
};
