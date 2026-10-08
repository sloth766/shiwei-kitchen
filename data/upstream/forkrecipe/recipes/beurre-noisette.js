export default {
  repoId: "master_french_beurre_noisette_001",
  parentRepoId: null,
  slug: "beurre-noisette",
  author: "ForkRecipe Kitchen",

  title: "Beurre Noisette",
  description: "Butter cooked past melting, past foaming, to the exact moment its milk solids turn from white to a deep hazelnut brown and fill the kitchen with an aroma of toasted nuts, caramel, and warm cream. The line between genius and ruin is less than thirty seconds — cross it and you have beurre noir; stop too early and you have merely melted butter.",
  cuisine: "French",
  culture: "French classical and brasserie cooking",
  category: "sauces",

  tags: ["french", "butter", "brown-butter", "sauce", "beurre-noisette", "pastry", "finishing"],
  difficulty: 2,
  activeTime: "10 min",
  totalTime: "12 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 2, salty: 1, sour: 0, bitter: 1, umami: 2, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Fat",       name: "Unsalted butter, high-fat European style preferred (84% fat)", ratioValue: 1, defaultUnit: "parts", substitutions: ["salted butter (omit added salt)"] },
    { ingId: "ing_02", role: "Acid",      name: "Fresh lemon juice (added at the end to halt cooking)", ratioValue: 0.05, defaultUnit: "parts", substitutions: ["white wine vinegar", "sherry vinegar"] },
    { ingId: "ing_03", role: "Seasoning", name: "Fine sea salt", ratioValue: 0.01, defaultUnit: "parts", substitutions: ["flaky salt, added as garnish"] },
    { ingId: "ing_04", role: "Herb",      name: "Fresh thyme or sage leaves (optional — for aromatic brown butter)", ratioValue: 0.05, defaultUnit: "parts", substitutions: ["rosemary", "bay leaf"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Melt",
      inputs: ["ing_01"],
      outputState: "foaming_butter",
      instructions: "Cut the butter into even, roughly 1 cm cubes — uniform size ensures even melting and heat distribution. Place in a light-coloured pan: stainless steel, enamelled cast iron, or tin-lined copper. Never use a dark non-stick pan — you cannot see the colour of the milk solids through the dark coating, and you will miss the moment. Medium heat. The butter will melt slowly (1–2 minutes), then begin to foam as the water in the butter converts to steam. This first foam is white and frothy. Watch it carefully — do not leave the pan. The foam will subside as the water evaporates, revealing a clear, golden liquid below. This is clarified butter — all the water has cooked off. The milk solids (the white bits) have sunk to the bottom of the pan. You are now in the danger zone: the Maillard reaction is beginning.",
      visualCue: {
        primaryTarget: "The first foam has subsided to reveal a clear, pale golden liquid with white milk solid particles visible at the bottom of the pan. A second, smaller foam is beginning to form.",
        spectrum: [
          { state: "Underdone", description: "Still thick, white foam covering the surface. Can't see the liquid below. The butter is still releasing water.", action: "Wait and watch. Do not increase heat — patience produces a more even browning." },
          { state: "Perfect",   description: "First foam has clearly subsided. Clear golden liquid visible. White milk solid particles visible at the bottom. A faint nutty smell is just beginning.", action: "This is the moment to pay maximum attention — browning happens fast from here." },
          { state: "Overdone",  description: "At this stage, you cannot over-do this step — it is simply the melting phase. But if the butter is already turning golden-brown immediately after the foam subsides, your heat is too high.", action: "Reduce heat immediately and swirl the pan to cool the butter slightly." },
        ],
      },
      feelCue: "Hold your hand 15 cm over the pan — the heat should feel steady and even, not aggressive. The sizzling sound should be a gentle, consistent hiss, like light rain on a roof, not a sputter or pop.",
    },
    {
      nodeId: "step_2",
      action: "Caramelize",
      inputs: ["foaming_butter", "ing_04"],
      outputState: "noisette_butter",
      instructions: "From the moment the first foam subsides, watch the milk solids at the bottom of the pan. They will begin to turn from white to golden to amber to hazelnut brown in rapid succession. Add the herb sprigs now if using — they will fry in the clarified butter, turning crisp and perfuming the beurre noisette with their volatile oils. Swirl the pan gently rather than stirring — swirling keeps the milk solids moving and prevents hot spots. The colour you are after is the colour of a roasted hazelnut shell: warm amber-brown with a hint of red. The aroma will change dramatically at this point — from the mild, milky smell of melted butter to something richer, complex, and almost nutty, with a faint caramel note underneath. A second, fine foam will appear just before the perfect moment. The total time from foam subsidence to perfect noisette: 60–90 seconds at medium heat.",
      visualCue: {
        primaryTarget: "The milk solids at the bottom of the pan are hazelnut-brown (not pale, not black). The liquid is a deep amber-gold. A fine, dark foam floats on the surface. The aroma is powerfully of toasted nuts.",
        spectrum: [
          { state: "Underdone", description: "Milk solids are golden but not brown. The butter smells nutty but not deeply so — more of a hint than an assertion.", action: "Keep going — 20 more seconds over the heat will get you there. The flavour improvement from golden to brown is dramatic." },
          { state: "Perfect",   description: "Milk solids are the colour of hazelnut shells — warm brown, not dark. The liquid is deep amber. The aroma is overwhelmingly of toasted nuts and caramel. A fine, dark-flecked foam sits on top.", action: "Remove from heat IMMEDIATELY and add lemon juice." },
          { state: "Overdone",  description: "Milk solids are dark brown, approaching black. The aroma has a bitter, burnt edge — you have made beurre noir. The kitchen smells of scorched milk.", action: "Discard if it smells acrid. Beurre noir (intentional) is a different sauce used with skate and brain — if that was your goal, strain and add capers and vinegar." },
        ],
      },
      feelCue: "The moment the kitchen fills with a powerful aroma of hazelnuts and warm toast — not a faint suggestion but a wave that hits you — the butter is at its peak. That olfactory alarm is more reliable than colour for those new to this technique.",
    },
    {
      nodeId: "step_3",
      action: "Finish",
      inputs: ["noisette_butter", "ing_02", "ing_03"],
      outputState: "finished_beurre_noisette",
      instructions: "The instant the butter reaches the hazelnut-brown stage, remove the pan from heat and add the lemon juice — it will spit and sizzle aggressively as it hits the hot fat. Swirl or whisk briefly. The acid performs two functions: it halts the cooking by reducing the pan temperature, and it brightens and lifts the flavour, cutting through the richness. Add the salt. If you added herbs, they can remain as a garnish or be removed if you prefer a cleaner finish. Pour the beurre noisette through a fine-mesh sieve (to catch any very dark milk solid particles) if you want maximum elegance, or leave the browned bits in for their flavour — they are the most intensely flavoured part of the sauce. Use immediately: spoon over pan-fried fish (trout, sole, skate), drizzle over gnocchi, pour over roasted cauliflower, or stir into cake batters for a deeper flavour.",
      visualCue: {
        primaryTarget: "A deep amber-golden sauce with flecks of browned milk solids, smelling powerfully of hazelnuts and caramel, slightly thickened from the addition of lemon juice.",
        spectrum: [
          { state: "Underdone", description: "The sauce looks pale and the lemon juice has barely been incorporated. No visible flecks of browned milk solids.", action: "Swirl to incorporate the lemon fully. The sauce is correct — pale means you caught it at the right moment." },
          { state: "Perfect",   description: "Deep amber with hazelnut-brown flecks. The sauce smells of toasted nuts, caramel, and lemon. It moves easily in the pan but has a slight viscosity from the browned milk proteins.", action: "Serve immediately. Brown butter begins to lose its volatile top notes within minutes of cooking." },
          { state: "Overdone",  description: "The sauce is very dark and smells bitter. The lemon juice was added too late — the milk solids had already gone beyond hazelnut to black.", action: "Discard. A bitter beurre noisette cannot be saved." },
        ],
      },
      feelCue: "Dip the tip of a clean finger into the finished sauce — at 60°C it should feel hot but not burning. The oil should feel silky and clean, not heavy or greasy. When you rub your fingers together, the browned milk solids leave a faint, toasty residue that smells extraordinary.",
    },
  ],
};
