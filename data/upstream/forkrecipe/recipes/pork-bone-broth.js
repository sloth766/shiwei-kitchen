export default {
  repoId: "master_chinese_pork_bone_broth_001",
  parentRepoId: null,
  slug: "pork-bone-broth",
  author: "ForkRecipe Kitchen",

  title: "Pork Bone Broth",
  description: "A Cantonese broth of crystalline clarity and extraordinary depth, achieved by blancing bones meticulously and simmering at the precise point where convection lifts collagen but never clouds the liquid — the restraint is the technique.",
  cuisine: "Chinese",
  culture: "Cantonese",
  category: "stocks",

  tags: ["broth", "pork", "cantonese", "chinese", "stock", "collagen", "slow-cook"],
  difficulty: 3,
  activeTime: "30 min",
  totalTime: "5 hr",
  ratioSystem: "parts",

  stars: 1124,
  forks: 88,
  contributors: 36,
  license: "CC-BY-SA",
  createdAt: "2024-12-10",
  updatedAt: "2025-05-20",

  flavorRadar: { sweet: 1, salty: 1, sour: 0, bitter: 0, umami: 5, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Pork neck bones or knuckles (split)", ratioValue: 50, defaultUnit: "parts", substitutions: ["pork spare ribs", "pork trotters"] },
    { ingId: "ing_02", role: "Protein",   name: "Pork back ribs (for gelatin)",         ratioValue: 20, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Liquid",    name: "Cold water",                           ratioValue: 100, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Aromatic",  name: "Fresh ginger (thick slices, unpeeled)", ratioValue: 5, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Allium",    name: "Spring onion / scallion (whole)",      ratioValue: 3,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Solvent",   name: "Shaoxing rice wine",                   ratioValue: 4,  defaultUnit: "parts", substitutions: ["dry sherry"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Blanch",
      inputs: ["ing_01", "ing_02", "ing_03"],
      outputState: "blanched_bones",
      instructions: "Place all bones in a large pot and cover with cold water. Bring to a full boil over high heat and boil vigorously for 5 minutes. You will see large quantities of grey scum (blood proteins and impurities) accumulate on the surface. Drain the bones and rinse each one individually under cold running water, removing all grey deposits. Also scrub the pot clean. This blanching step is the single most important technique for achieving clear, clean-tasting Cantonese broth — skipping it results in murky, gamy-smelling stock.",
      visualCue: {
        primaryTarget: "After blanching and rinsing, bones should be visibly clean and slightly pink with no grey-brown deposits clinging to them.",
        spectrum: [
          { state: "Underdone", description: "Bones still have grey-brown scum attached. The boil did not last long enough to fully purge the blood proteins.", action: "Boil another 3–5 minutes and rinse thoroughly again." },
          { state: "Perfect",   description: "Clean, pinkish-white bones. No visible scum. Boiling water was grey and murky — that murk is now discarded. Bones smell clean and faintly porky.", action: "Transfer to a clean pot and begin the long, slow simmer." },
          { state: "Overdone",  description: "Bones boiled too long in the blanch (15+ minutes) — some collagen has already released into the murky water.", action: "Rinse well and proceed. The broth will still be excellent." },
        ],
      },
      feelCue: "Run your fingers along a blanched, rinsed bone — it should feel smooth and clean, with no sticky or slippery deposits. The bone surface should feel almost chalky in spots where the marrow has started to melt out.",
    },
    {
      nodeId: "step_2",
      action: "Simmer",
      inputs: ["blanched_bones", "ing_03", "ing_04", "ing_05", "ing_06"],
      outputState: "simmered_broth",
      instructions: "Return the rinsed bones to the clean pot. Cover with fresh cold water and bring to a gentle simmer over medium heat. As it approaches simmer, skim any remaining foam from the surface. Add ginger slices, whole scallions, and Shaoxing wine. Reduce to the lowest possible simmer — the surface should show lazy ripples and occasional bubbles at the edges, but never a rolling boil. A boiling stock becomes cloudy; a simmering stock stays clear. Maintain this temperature for 3.5–4 hours.",
      visualCue: {
        primaryTarget: "A golden-amber broth with lazy surface ripples and edge-only bubble activity. The liquid should be increasingly golden and translucent, never grey or murky.",
        spectrum: [
          { state: "Underdone", description: "Broth is still very pale and thin at 2 hours. Flavor is light and watery. Gelatin not yet extracted.", action: "Continue simmering. Pork collagen needs minimum 3 hours at a gentle simmer." },
          { state: "Perfect",   description: "Golden amber, clear or near-clear. Lazy surface movement only. Tastes deeply porky and round. When a small amount is cooled on a spoon and refrigerated, it sets to a light jelly.", action: "Strain and season." },
          { state: "Overdone",  description: "Broth has been boiling rather than simmering — it is grey and murky. Or simmered so long it has reduced by more than half.", action: "Strain immediately. The flavor will be good even if the clarity is gone. Use for braising rather than clear soups." },
        ],
      },
      feelCue: "After 3 hours of proper simmering, the broth should smell like concentrated, sweet pork — a clean, almost caramel-like umami aroma with the ginger providing a warm green note. No gaminess, no liver-like odors. If it smells gamy, the blanching was insufficient.",
    },
    {
      nodeId: "step_3",
      action: "Strain",
      inputs: ["simmered_broth"],
      outputState: "finished_pork_bone_broth",
      instructions: "Remove the bones with tongs and discard. Line a fine-mesh strainer with a single layer of cheesecloth. Strain the broth slowly, without pressing. Allow to cool slightly, then refrigerate uncovered for 1–2 hours until the fat solidifies on the surface as a cream-colored cap. Remove the solidified fat layer. The broth beneath should be clear, golden, and slightly gelatinous when cold. Season with salt only at the point of use, never in the base stock.",
      visualCue: {
        primaryTarget: "After defatting, the chilled broth should be clear and golden, with a slight wobble when the container is shaken — indicating adequate gelatin content.",
        spectrum: [
          { state: "Underdone", description: "Broth is thin and watery when cold — does not gel. Color is pale. Flavor is light. Insufficient collagen was extracted.", action: "Return to the pot and simmer an additional hour. Add a split pig's foot if available for gelatin boost." },
          { state: "Perfect",   description: "Clear, golden broth. Gels to a soft jello when cold — holds its shape when spooned but melts immediately when warmed. Tastes clean, deep, and savory.", action: "Store up to 5 days refrigerated or 3 months frozen." },
          { state: "Overdone",  description: "Broth gels into a very firm, dense block when cold. Very concentrated.", action: "This is a bonus — dilute 1:1 with water when using. It is essentially a demi-glace." },
        ],
      },
      feelCue: "Spoon a small amount of the chilled, set broth — it should tremble like firm gelatin when the spoon is shaken and melt immediately on contact with your warm tongue. A broth with good gelatin feels silky and rich rather than watery, coating the inside of your mouth with a pleasant, lingering savory weight.",
    },
  ],
};
