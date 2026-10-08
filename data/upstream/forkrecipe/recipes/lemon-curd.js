export default {
  repoId: "master_british_lemon_curd_001",
  parentRepoId: null,
  slug: "lemon-curd",
  author: "ForkRecipe Kitchen",

  title: "British Lemon Curd",
  description: "Egg yolks, butter, and fierce citrus cook into a molten, traffic-light-yellow cream that strikes the tongue with a bright, almost painful tartness before butter smooths it into silk. Spread thick on warm scones or spooned over meringue, it is concentrated sunshine in a jar.",
  cuisine: "British",
  culture: "English afternoon tea",
  category: "desserts",

  tags: ["lemon", "curd", "british", "citrus", "pastry", "preserve", "spread"],
  difficulty: 2,
  activeTime: "20 min",
  totalTime: "35 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 3, salty: 1, sour: 5, bitter: 1, umami: 0, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Acid",      name: "Fresh lemon juice (about 4 large lemons), strained", ratioValue: 3, defaultUnit: "parts", substitutions: ["lime juice", "passion fruit juice"] },
    { ingId: "ing_02", role: "Sweetener", name: "Caster sugar (fine white sugar)", ratioValue: 3, defaultUnit: "parts", substitutions: ["honey (reduce by 20%)"] },
    { ingId: "ing_03", role: "Protein",   name: "Large egg yolks", ratioValue: 4, defaultUnit: "yolks per 100ml juice", substitutions: ["whole eggs (4 yolks = 2 whole eggs, richer result)"] },
    { ingId: "ing_04", role: "Fat",       name: "Unsalted butter, cold, cubed", ratioValue: 2, defaultUnit: "parts", substitutions: ["salted butter (omit added salt)"] },
    { ingId: "ing_05", role: "Aromatic",  name: "Lemon zest, finely grated (from same lemons)", ratioValue: 0.2, defaultUnit: "parts", substitutions: ["Meyer lemon zest"] },
    { ingId: "ing_06", role: "Seasoning", name: "Fine sea salt, a pinch", ratioValue: 0.01, defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Whisk",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_05"],
      outputState: "raw_curd_base",
      instructions: "In a medium heatproof bowl — glass or stainless steel, not aluminium, which reacts with citrus — combine the strained lemon juice, caster sugar, egg yolks, and lemon zest. Whisk vigorously for about 90 seconds until the mixture is uniformly combined and the sugar has begun to dissolve. You will notice the yolks thicken slightly just from the acid and sugar — this is safe at room temperature for the short time it takes to prepare your bain-marie. Do not add the butter yet; it goes in later at a lower temperature to create the emulsion that gives curd its characteristic silky body. Make sure there are no yolk streaks remaining — the mixture should be a uniform, bright canary yellow.",
      visualCue: {
        primaryTarget: "A uniform, bright yellow liquid, slightly thickened from the sugar-yolk interaction, with no white streaks and fine zest suspended throughout.",
        spectrum: [
          { state: "Underdone", description: "Sugar still visible as undissolved grains at the bottom of the bowl. White yolk streaks unmixed.", action: "Whisk another 30 seconds. The sugar does not need to be completely dissolved — it will dissolve on the heat." },
          { state: "Perfect",   description: "Smooth, bright yellow, uniform liquid. Sugar is mostly dissolved. Mixture coats the whisk in a thin, even layer.", action: "Set the bowl over the bain-marie and begin cooking." },
          { state: "Overdone",  description: "The acid has begun to cook the yolks prematurely — you can see white curds forming if you left it too long at room temperature.", action: "Pass through a fine-mesh sieve immediately and proceed with caution on the heat." },
        ],
      },
      feelCue: "The mixture should feel slightly slippery between your fingers from the egg yolk lecithin — not gritty, not watery, but a smooth, liquid gel.",
    },
    {
      nodeId: "step_2",
      action: "Simmer",
      inputs: ["raw_curd_base"],
      outputState: "thickened_curd",
      instructions: "Set the bowl over a pot of barely simmering water — the bottom of the bowl must not touch the water, and the water must not boil aggressively. This bain-marie setup is non-negotiable: direct heat will scramble the yolks before they can emulsify. Cook the curd, stirring constantly with a silicone spatula or wooden spoon, reaching into every corner of the bowl. Do not let the curd sit still for even 10 seconds — the edges and bottom will cook faster than the center. Maintain a constant, gentle motion. After 8–12 minutes the curd will thicken noticeably, shifting from thin and liquid to something that holds a trail when you drag the spatula across the surface. The curd is done when it coats the back of a spoon thickly and a finger drawn across leaves a clean, defined line that does not fill in. Target temperature: 75–82°C (167–180°F). Pull it off the moment it nappe-coats the spoon — the residual heat continues cooking.",
      visualCue: {
        primaryTarget: "The curd coats the back of a clean spoon in a thick, opaque, bright-yellow layer. A finger drawn through leaves a sharp, clean channel that does not close.",
        spectrum: [
          { state: "Underdone", description: "The curd is still thin and pourable. It runs off the back of the spoon like water. The channel closes immediately when you draw your finger.", action: "Keep cooking and stirring. It will thicken suddenly — be ready. At this stage you can increase heat slightly, but never let the water boil." },
          { state: "Perfect",   description: "The curd is thick and creamy — it moves slowly off the spatula. The channel stays crisp. Steam rises but the curd does not bubble. Pale, opaque yellow.", action: "Remove from heat immediately and strain through a fine sieve into the bowl with butter." },
          { state: "Overdone",  description: "The surface is showing tiny bubbles. The curd smells eggy rather than lemony. Scrambled bits visible.", action: "Strain immediately through a fine-mesh sieve, pressing through with the spatula. The lemon flavour will still be there." },
        ],
      },
      feelCue: "The spatula should drag against the curd with a gentle resistance — like stirring a thick milkshake — and when you lift it, the curd should fall in slow, heavy drops that briefly hold their shape before merging back in.",
    },
    {
      nodeId: "step_3",
      action: "Mount",
      inputs: ["thickened_curd", "ing_04", "ing_06"],
      outputState: "finished_lemon_curd",
      instructions: "Remove the bowl from the heat and immediately pass the hot curd through a fine-mesh sieve into a clean bowl — this catches any chalazae (white threads) or cooked egg bits and ensures a perfectly smooth curd. Add the cold, cubed butter to the sieved curd all at once. The temperature difference is intentional: the cold butter cools the curd rapidly (stopping the cooking) while simultaneously emulsifying into it. Stir gently with the spatula, encouraging each cube to melt and incorporate. Add the pinch of sea salt — it is remarkable what it does to the lemon flavour, lifting it from sweet-sour into something more complex and alive. Once all butter is incorporated and the curd is glossy and smooth, pour immediately into sterilised jars and seal. It will continue to thicken as it cools. Refrigerate for up to four weeks.",
      visualCue: {
        primaryTarget: "A deeply glossy, intensely yellow curd that is thick enough to mound in a spoon but still fluid enough to slowly level off over 10 seconds.",
        spectrum: [
          { state: "Underdone", description: "The curd is still thin and runny even after butter is added — butter has melted but not emulsified. The mixture looks slightly greasy.", action: "Stir more vigorously. If still thin after 2 minutes, the curd was undercooked — return to the bain-marie briefly to thicken further." },
          { state: "Perfect",   description: "Deeply glossy, thick, flowing curd that mounds on a spoon. Colour is intense canary yellow. Butter is completely absorbed and the surface has a subtle sheen.", action: "Jar and seal immediately while still warm." },
          { state: "Overdone",  description: "The curd has set too firm in the bowl before jarring — it looks stiff and almost jellied.", action: "Gently warm over the bain-marie, stirring slowly, until fluid again, then jar immediately." },
        ],
      },
      feelCue: "A small drop on your lip should feel cool from the butter and immediately sharp with lemon — the sourness should hit first, then the sweetness, then a long creamy finish that coats the inside of your mouth long after you have swallowed.",
    },
  ],
};
