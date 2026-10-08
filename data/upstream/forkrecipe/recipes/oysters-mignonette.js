export default {
  repoId: "master_french_oysters_mignonette_001",
  parentRepoId: null,
  slug: "oysters-mignonette",
  author: "ForkRecipe Kitchen",

  title: "Oysters with Mignonette Granita",
  description: "French raw oysters served on crushed ice with a mignonette granita — shallot and sherry vinegar frozen into sharp, icy crystals that melt over the cold oyster, heightening the brine without masking it. The simplest luxury in the kitchen.",
  cuisine: "French",
  culture: "French",
  category: "seafood",

  tags: ["gluten-free", "raw", "oyster", "french", "elegant", "appetiser"],
  difficulty: 1,
  activeTime: "20 min",
  totalTime: "2 hrs 20 min",
  ratioSystem: "weight",

  stars: 0, forks: 0, contributors: 1, license: "CC-BY-SA",
  createdAt: "2026-06-27", updatedAt: "2026-06-27",

  flavorRadar: { sweet: 0, salty: 4, sour: 4, bitter: 1, umami: 5, heat: 1 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",    name: "Live oysters (Fines de Claire, Belon, or Kumamoto)", ratioValue: 900, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_02", role: "Acid",       name: "Sherry vinegar (Jerez vinegar)",                    ratioValue: 80,  defaultUnit: "ml", substitutions: ["champagne vinegar", "white wine vinegar"] },
    { ingId: "ing_03", role: "Allium",     name: "Shallots, very finely minced",                      ratioValue: 40,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_04", role: "Seasoning",  name: "Coarsely cracked black pepper",                     ratioValue: 3,   defaultUnit: "g", substitutions: ["pink peppercorns, crushed"] },
    { ingId: "ing_05", role: "Liquid",     name: "Cold water",                                        ratioValue: 20,  defaultUnit: "ml", substitutions: [] },
    { ingId: "ing_06", role: "Seasoning",  name: "Flaky sea salt",                                    ratioValue: 1,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_07", role: "Structure",  name: "Crushed ice, for serving",                          ratioValue: 400, defaultUnit: "g", substitutions: ["coarse rock salt bed"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Infuse",
      inputs: ["ing_02", "ing_03", "ing_04", "ing_05"],
      outputState: "mignonette_liquid",
      instructions: "Combine the sherry vinegar, very finely minced shallots, cracked black pepper, and cold water in a small bowl. Stir to combine. Taste: it should be sharply acidic with a pungent shallot note and a flicker of pepper heat. Adjust the balance with a touch more water if very sharp, or an extra pinch of cracked pepper for more heat. The shallots will soften slightly in the vinegar over time.",
      visualCue: {
        primaryTarget: "Mignonette liquid",
        spectrum: [
          { state: "Underdone", description: "The vinegar is still raw and harsh. The shallots are still raw and aggressive.", action: "Let the mixture rest for 10 minutes before tasting — the shallots need time to macerate and lose some of their raw sharpness." },
          { state: "Perfect",   description: "A clear, amber liquid with fine shallot pieces that have begun to turn slightly translucent. Smells of vinegar and shallot with a pleasant, clean sharpness. Tastes balanced — tart but not harsh, savoury from the shallot.", action: "Pour into a flat freezer-safe dish and freeze." },
          { state: "Overdone",  description: "N/A — the mignonette cannot be over-prepared at this stage.", action: "Proceed to freezing." },
        ],
      },
      feelCue: "A drop of mignonette on your wrist should sting slightly from the vinegar and cool from the liquid — together they should feel bracing, not aggressive. That bracing quality is what refreshes the oyster's brine rather than overpowering it.",
    },
    {
      nodeId: "step_2",
      action: "Freeze",
      inputs: ["mignonette_liquid"],
      outputState: "mignonette_granita",
      instructions: "Pour the mignonette liquid into a wide, shallow freezer-safe dish — the thinner the layer, the faster and more evenly it freezes. Place in the freezer. After 45 minutes, drag a fork across the partially frozen surface to break it into crystals. Repeat every 30 minutes for 2 hours total, until you have a loose, shimmering mass of sharp vinegar-shallot ice crystals.",
      visualCue: {
        primaryTarget: "Granita in the freezer dish",
        spectrum: [
          { state: "Underdone", description: "Liquid is barely cold and still fully liquid after 45 minutes.", action: "Ensure the freezer is at the correct temperature (-18 C). Check the dish is flat and the layer is thin (no more than 1.5 cm)." },
          { state: "Perfect",   description: "A loose, dry-looking mound of individual, translucent, amber-coloured ice crystals — like rough pink salt but slightly darker. The crystals fall apart when scraped and melt slowly on the tongue rather than in a single cold rush.", action: "Cover and keep frozen until the moment of serving. It will hold for up to 3 days." },
          { state: "Overdone",  description: "Frozen into a solid block — not raked into crystals. Will shatter rather than scrape cleanly.", action: "Leave at room temperature for 3 minutes, then scrape vigorously with a fork to break into crystals." },
        ],
      },
      feelCue: "Take a pinch of the finished granita between your fingers — the crystals should be discrete and separate, melting quickly against your warm skin into a cold, sharp, vinegar-scented liquid.",
    },
    {
      nodeId: "step_3",
      action: "Peel",
      inputs: ["ing_01"],
      outputState: "shucked_oysters",
      instructions: "Hold each oyster in a folded kitchen towel, flat shell up, hinge toward you. Insert an oyster knife into the hinge at a 45-degree angle. Apply firm, twisting pressure until the hinge pops. Slide the knife along the inner surface of the flat top shell, severing the adductor muscle. Discard the flat top shell. Sever the muscle on the bottom cup shell as well. Check the liquor: it should be clear and faintly salty — milky or muddy liquor means the oyster is stressed. Arrange on the crushed ice immediately.",
      visualCue: {
        primaryTarget: "Opened oyster in its cup",
        spectrum: [
          { state: "Underdone", description: "The knife is not penetrating the hinge — the oyster is winning. Considerable force is being applied with no movement.", action: "Redirect the knife tip to the very tip of the hinge, precisely where the two shells meet at a point. The hinge is the weakest point; all force should concentrate there." },
          { state: "Perfect",   description: "Oyster sits in its deep cup surrounded by clear, perfectly clean liquor that smells of the sea. The flesh is cream-grey and firm, with a glistening surface. No shell fragments visible.", action: "Arrange on crushed ice with the cup side down and the opening toward the guest. Do not drain the liquor." },
          { state: "Overdone",  description: "Shell fragments are floating in the liquor from rough shucking. The muscle has been torn rather than cleanly severed.", action: "Use the knife tip to carefully fish out any shell fragments. If the liquor is very milky or has shell debris, pour most of it away gently — it will not taste good." },
        ],
      },
      feelCue: "Tilt an opened oyster on its shell — the liquor should pool in the deep cup and the flesh should slide slightly but remain attached to the shell. If the liquor runs out immediately, the cup is too shallow or the shell was broken.",
    },
    {
      nodeId: "step_4",
      action: "Assemble",
      inputs: ["shucked_oysters", "mignonette_granita", "ing_07", "ing_06"],
      outputState: "finished_oysters_mignonette",
      instructions: "Arrange the shucked oysters in their cups on a large platter of crushed ice — the ice keeps them cold and holds them level. Place a half-teaspoon of mignonette granita on top of each oyster just before serving. Add a tiny pinch of flaky salt if the oysters are very mild. Serve immediately, before the granita melts completely.",
      visualCue: {
        primaryTarget: "Dressed oysters on the platter",
        spectrum: [
          { state: "Underdone", description: "No granita has been placed yet, or it has all melted. The oysters taste of nothing but raw sea.", action: "Place the granita at the very last moment — it melts fast and the contrast between cold crystal and cold oyster is the point of the dish." },
          { state: "Perfect",   description: "Each oyster cradles a small mound of amber granita crystals that are just beginning to melt at their edges, releasing a fragrant mist of sherry vinegar and shallot. The visual: cream, grey, and translucent amber on white crushed ice.", action: "Serve immediately. Eat in one motion — lift the shell, tip everything to the back of the tongue, and let the brine, granita, and oyster meet there simultaneously." },
          { state: "Overdone",  description: "The granita has fully melted and is now just a pool of vinegar liquid on top of the oyster, overpowering the delicate sea flavour.", action: "Tip most of the melted vinegar liquid off each shell before serving. Serve with fresh granita if available." },
        ],
      },
      feelCue: "Tip the oyster to your lips — the first sensation should be cold, then brine, then a sharp, melting crystal that dissolves into the back of the mouth with a clean, acidic shiver. If you are not involuntarily salivating, the granita has not been made sharp enough.",
    },
  ],
};
