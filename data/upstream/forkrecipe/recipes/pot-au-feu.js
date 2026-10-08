export default {
  repoId: "master_french_pot_au_feu_001",
  parentRepoId: null,
  slug: "pot-au-feu",
  author: "ForkRecipe Kitchen",

  title: "Pot-au-Feu",
  description: "The most French of dishes — beef shin and marrow bones simmered slowly with root vegetables until the broth is golden and clear, served in two courses: broth first, then meat and vegetables.",
  cuisine: "French",
  culture: "French provincial",
  category: "proteins",

  tags: ["beef", "boiled", "french", "vegetables", "broth", "classic"],
  difficulty: 3,
  activeTime: "30 min",
  totalTime: "4 hr",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",

  flavorRadar: { sweet: 1, salty: 3, sour: 0, bitter: 1, umami: 5, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Beef shin (bone-in, tied in 2 pieces)", ratioValue: 100, defaultUnit: "parts", substitutions: ["oxtail", "beef brisket"] },
    { ingId: "ing_02", role: "Inosinate", name: "Marrow bones (5–6 cm sections, tied in muslin)", ratioValue: 25, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Allium",    name: "Large yellow onion (halved, cut-side charred dry in a pan)", ratioValue: 15, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Aromatic",  name: "Bouquet garni (thyme, bay leaf, parsley stalks, black peppercorns)", ratioValue: 5, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Structure", name: "Carrots (peeled, halved lengthwise)",  ratioValue: 30, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Structure", name: "Turnips (peeled, quartered)",          ratioValue: 20, defaultUnit: "parts", substitutions: ["parsnips"] },
    { ingId: "ing_07", role: "Structure", name: "Leeks (white and pale green, tied)",   ratioValue: 25, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_08", role: "Structure", name: "Celery root (peeled, cut in wedges)", ratioValue: 20, defaultUnit: "parts", substitutions: ["celery stalks"] },
    { ingId: "ing_09", role: "Seasoning", name: "Coarse sea salt",                      ratioValue: 3,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_10", role: "Garnish",   name: "Dijon mustard, cornichons, fleur de sel, and toasted baguette (to serve)", ratioValue: 5, defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Blanch",
      inputs: ["ing_01", "ing_02"],
      outputState: "blanched_meat",
      instructions: "Place the beef shin and marrow bones in a large pot, cover with cold water, and bring to a full boil over high heat. Boil for 5 minutes — a grey scum will rise aggressively. Drain, rinse the meat and bones under cold running water to remove all impurities, and scrub the pot clean. This blanching step is not optional — it is what allows the final broth to be clear rather than grey.",
      visualCue: {
        primaryTarget: "Meat and bones rinsed clean, with no traces of grey scum, and the cooking pot scrubbed of all residue.",
        spectrum: [
          { state: "Underdone", description: "Only a light scum has risen and the water is still fairly clear — not all impurities have been purged.", action: "Continue boiling for another 2–3 minutes until the scum has stopped rising aggressively." },
          { state: "Perfect",   description: "The water is thick with dark grey foam. When drained and rinsed, the meat looks grey-brown but clean. The pot is clear of residue.", action: "Return the cleaned meat to the clean pot and cover with fresh cold water." },
          { state: "Overdone",  description: "Meat has been boiled far too long in the blanching stage and is beginning to look dull and fibrous.", action: "Proceed quickly to the simmer stage — do not repeat the blanch." },
        ],
      },
      feelCue: "The meat after blanching and rinsing should feel cold and slightly sticky from the collagen beginning to release — run your fingers along the shin and feel the slight tackiness.",
    },
    {
      nodeId: "step_2",
      action: "Simmer",
      inputs: ["blanched_meat", "ing_03", "ing_04", "ing_09"],
      outputState: "simmering_broth",
      instructions: "Return the blanched meat and bones to the clean pot. Add the charred onion halves (hold them cut-side down in a dry pan over high heat for 3–4 minutes until blackened — this gives the broth its golden color). Add the bouquet garni and enough cold water to cover everything by 5 cm. Bring slowly to a simmer over medium heat — this should take 20 minutes. Skim any remaining scum carefully as it rises. Reduce to the lowest possible simmer — the surface should barely tremble, just an occasional lazy bubble breaking through. Cook for 2 hours before adding any vegetables.",
      visualCue: {
        primaryTarget: "A gently trembling, golden-amber broth with no visible roiling boil, and a clean surface with only an occasional slow bubble.",
        spectrum: [
          { state: "Underdone", description: "Water is barely warm and scum is still rising heavily. The broth has no color or body yet.", action: "Continue over medium heat, skimming steadily. The broth needs patience — a full slow warm-up is essential for clarity." },
          { state: "Perfect",   description: "A quiet, trembling simmer. The surface is nearly still. Broth is already deepening to amber from the charred onion. Smells deeply of beef and herbs.", action: "Maintain this simmer for 2 hours before adding vegetables." },
          { state: "Overdone",  description: "Broth is at a rolling boil — it will become cloudy and greasy as fat is emulsified into the liquid.", action: "Reduce heat immediately. Add a splash of cold water to shock the temperature down. Skim the surface thoroughly." },
        ],
      },
      feelCue: "Dip a clean spoon into the broth at the 2-hour mark and taste — it should already have a clear, golden beef flavor that coats the back of the spoon with barely perceptible viscosity.",
    },
    {
      nodeId: "step_3",
      action: "Poach",
      inputs: ["simmering_broth", "ing_05", "ing_06", "ing_07", "ing_08"],
      outputState: "cooked_pot_au_feu",
      instructions: "Add the vegetables to the simmering broth in stages by their cooking time: add turnips first (30 minutes to cook), then carrots and celery root (20 minutes), and finally leeks (15 minutes). The goal is for all vegetables to be perfectly tender at the same time. Do not add them all at once. The broth should remain at a gentle simmer throughout — never a boil.",
      visualCue: {
        primaryTarget: "Vegetables that are completely tender but still holding their shape — a knife passes through a carrot without resistance, the cut surface is clean, not fibrous.",
        spectrum: [
          { state: "Underdone", description: "Carrots or turnips resist a thin skewer. The centers feel cool to the touch when pressed.", action: "Continue simmering. Test each vegetable individually with a thin skewer or knife — they will not all be done at the same time." },
          { state: "Perfect",   description: "All vegetables yield to a knife with no resistance. Leeks are completely limp but not disintegrating. Carrots have a slight golden gleam from the broth.", action: "Lift everything from the broth. Serve the strained broth first, then the meat and vegetables." },
          { state: "Overdone",  description: "Leeks have collapsed into strands, turnips are falling apart, and the broth has absorbed their flavor to the point of muddiness.", action: "Serve immediately. Drain the vegetables quickly and present them on a platter; they are not irreparably lost." },
        ],
      },
      feelCue: "Press a carrot with your thumb against the side of the pot — it should yield completely with barely any pressure, like pressing into soft butter.",
    },
    {
      nodeId: "step_4",
      action: "Strain",
      inputs: ["cooked_pot_au_feu"],
      outputState: "finished_pot_au_feu",
      instructions: "Lift the meat and vegetables carefully from the broth with a slotted spoon onto a warmed platter. Untie and remove the muslin from the marrow bones. Strain the broth through a fine sieve lined with dampened muslin or a clean cloth. Taste and correct the salt. Serve the clear broth first in warmed soup bowls with a few small pasta or toasted bread. Follow with the meat, sliced thick, and the vegetables, accompanied by Dijon mustard, cornichons, coarse salt, and horseradish if desired.",
      visualCue: {
        primaryTarget: "A clear, jewel-like amber broth with no visible fat globules or cloudiness, and a platter of deeply colored, tender meat and vibrant vegetables.",
        spectrum: [
          { state: "Underdone", description: "Broth is grey and cloudy with floating fat and particles. It was boiled too hard at some stage.", action: "Strain through muslin a second time. The taste may still be excellent even if the appearance is compromised." },
          { state: "Perfect",   description: "The broth is a clear amber, almost like dark tea, with no cloudiness. Light shimmers through it. It has a gentle, rich, clean depth.", action: "Serve at once in the traditional two-service format." },
          { state: "Overdone",  description: "Broth has reduced too much from prolonged cooking and tastes salty and intensely concentrated.", action: "Add a small amount of hot water to balance. Taste again before serving." },
        ],
      },
      feelCue: "Ladle the strained broth slowly — it should have the faintest resistance as it flows off the ladle, the earliest hint of gelatin, proof that the collagen has given itself to the pot.",
    },
  ],
};
