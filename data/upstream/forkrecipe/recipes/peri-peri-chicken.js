// Peri-Peri Chicken — Mozambican-Portuguese fire-grilled chicken in piri-piri marinade.
// Author: SpiceTrader

export default {
  repoId: "master_south_african_peri_peri_chicken_001",
  parentRepoId: null,
  slug: "peri-peri-chicken",
  author: "ForkRecipe Kitchen",

  title: "Peri-Peri Chicken",
  description: "A whole spatchcocked chicken marinated in a ferocious sauce of African bird's eye chilies, garlic, lemon, and smoked paprika — then grilled low and slow until the skin is lacquered and blistered and every bite delivers heat that builds from the back of the throat forward.",
  cuisine: "South African",
  culture: "Mozambican/Portuguese",
  category: "proteins",

  tags: ["south-african", "chicken", "chili", "grilled", "piri-piri"],
  difficulty: 2,
  activeTime: "20 min",
  totalTime: "2 hrs 20 min",
  ratioSystem: "parts",

  stars: 3200,
  forks: 380,
  contributors: 47,
  license: "CC-BY-SA",
  createdAt: "2024-09-25",
  updatedAt: "2026-03-11",

  flavorRadar: { sweet: 1, salty: 3, sour: 2, bitter: 0, umami: 2, heat: 5 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",  name: "Whole chicken, spatchcocked (backbone removed, flattened)", ratioValue: 10, defaultUnit: "parts", substitutions: ["bone-in chicken thighs and drumsticks"] },
    { ingId: "ing_02", role: "Heat",     name: "African bird's eye chilies (piri-piri), stemmed",           ratioValue: 2,  defaultUnit: "parts", substitutions: ["red Thai chilies", "fresh cayenne (milder)"] },
    { ingId: "ing_03", role: "Allium",   name: "Garlic cloves",                                             ratioValue: 1,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Acid",     name: "Lemon juice and zest",                                      ratioValue: 2,  defaultUnit: "parts", substitutions: ["lime juice"] },
    { ingId: "ing_05", role: "Spice",    name: "Smoked paprika and dried oregano",                          ratioValue: 0.5, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Fat",      name: "Olive oil",                                                 ratioValue: 2,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Seasoning", name: "Salt",                                                     ratioValue: 0.5, defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Blend peri-peri marinade",
      inputs: ["ing_02", "ing_03", "ing_04", "ing_05", "ing_06", "ing_07"],
      outputState: "peri_peri_marinade",
      instructions: "Blend the chilies, garlic, lemon juice and zest, smoked paprika, oregano, olive oil, and salt in a blender or food processor until smooth. The sauce should be a vivid red-orange. Taste carefully — it should be very hot, punchy with acid, and deeply savory. Adjust salt and lemon to balance. For a milder result, remove seeds before blending. For maximum heat, use the whole chili including seeds.",
      visualCue: {
        primaryTarget: "A smooth, vivid orange-red emulsion with no visible chunks of chili skin or garlic. Slightly thicker than a vinaigrette.",
        spectrum: [
          { state: "Underdone", description: "Sauce is chunky with visible pieces of chili and garlic. It won't penetrate the chicken evenly and will burn in patches during grilling.", action: "Blend for another 30–60 seconds. Scrape down the sides and blend again. The sauce needs to be smooth to form a proper lacquering marinade." },
          { state: "Perfect",   description: "Smooth, uniformly emulsified sauce that pours in a steady stream. Deep orange-red color. Smells intensely of chili, garlic, and citrus all at once.", action: "Proceed to coat and marinate the chicken." },
          { state: "Overdone",  description: "Blended too long — the sauce has aerated and lightened to a foam, losing density. It will coat less effectively.", action: "Let it sit in the blender for 2 minutes without running to allow the foam to subside. The sauce is still usable." },
        ],
      },
      feelCue: "Dip a fingertip — you should feel immediate, building heat within 10 seconds. If the heat doesn't arrive, the sauce needs more chili. If your eyes are watering immediately, you are on track.",
    },
    {
      nodeId: "step_2",
      action: "Marinate",
      inputs: ["ing_01", "peri_peri_marinade"],
      outputState: "marinated_chicken",
      instructions: "Score the chicken skin in a crosshatch pattern with a sharp knife — 4–5 cuts per side, slicing through the skin to the flesh. This allows the marinade to penetrate deeply. Rub the peri-peri sauce all over the chicken: under the skin where possible, into all scoring lines, into the cavity. Reserve about 3 tablespoons of the marinade for basting during grilling. Place the chicken in a container, cover, and refrigerate for a minimum of 2 hours or overnight.",
      visualCue: {
        primaryTarget: "Chicken is uniformly coated in vivid orange-red marinade. The scoring marks are filled with sauce. No pale spots of unmarinated skin.",
        spectrum: [
          { state: "Underdone", description: "Marinade is dripping off the surface rather than clinging. Pale, unmarinated patches of skin visible. Score marks are empty.", action: "Ensure the chicken skin is dry before applying marinade — moisture prevents it from adhering. Pat dry and re-apply." },
          { state: "Perfect",   description: "Even, vibrant coating on all surfaces. The marinade has begun to stain the flesh visible through the score marks. Chicken looks deeply colored and glossy.", action: "Cover and refrigerate for at least 2 hours before grilling." },
          { state: "Overdone",  description: "Marinated more than 12 hours — the acid in the lemon has begun to denature the chicken surface proteins, making the outer flesh pale and slightly mushy.", action: "Proceed to grilling immediately. The flavor will be excellent but the texture of the surface may be softer than ideal." },
        ],
      },
      feelCue: "Press the marinade-coated skin with your finger — the sauce should cling to your fingertip and leave a clean, uniform orange-red stain on your skin, indicating even, thorough penetration.",
    },
    {
      nodeId: "step_3",
      action: "Grill low and slow",
      inputs: ["marinated_chicken"],
      outputState: "grilled_chicken",
      instructions: "Prepare a two-zone grill: direct high heat on one side, indirect medium heat on the other. Start the chicken skin-side up on the indirect side and cook with the lid closed for 35–40 minutes, basting every 10 minutes with the reserved marinade. The lower, slower indirect heat allows the interior to cook through before the exterior burns. When the internal temperature reaches 68 °C in the thickest part of the thigh, move the chicken to direct heat skin-side down for 5–8 minutes to lacquer and char the skin.",
      visualCue: {
        primaryTarget: "Skin is deeply burnished, moving from orange-red to a charred, lacquered mahogany. Irregular black char spots across the raised skin areas. Leg joints move freely.",
        spectrum: [
          { state: "Underdone", description: "Skin is still pale and pink-orange, soft, and not yet lacquered. Leg joint is stiff and the thigh flesh is pink when pierced near the bone.", action: "Continue on indirect heat, basting every 10 minutes. The chicken needs both internal temperature (74 °C) and external color." },
          { state: "Perfect",   description: "Mahogany, lacquered skin with charred high spots. Leg joint moves freely and the thigh runs clear juices when pierced. Internal temp 74–76 °C at the thickest point.", action: "Remove from heat, rest 10 minutes before carving." },
          { state: "Overdone",  description: "Skin is uniformly black and the chicken smells of bitter char. Leg meat may be beginning to shred involuntarily.", action: "Remove from grill immediately. Trim the worst char with a knife. The interior meat is likely still excellent — the skin is the sacrifice." },
        ],
      },
      feelCue: "Wiggle the drumstick — if the leg joint moves with minimal resistance, like a door hinge that needs oil, the chicken is cooked. If the leg pulls straight and stiff, it needs more time.",
    },
    {
      nodeId: "step_4",
      action: "Rest and serve",
      inputs: ["grilled_chicken"],
      outputState: "finished_peri_peri_chicken",
      instructions: "Rest the chicken breast-side down on a cutting board for 10 minutes — resting breast-side down keeps the breast meat basted in its own juices. Carve and serve with Portuguese rolls, chips, and a simple salad. Drizzle any resting juices over the carved meat. The heat from peri-peri builds slowly — warn guests that the full effect arrives 30 seconds after the first bite.",
      visualCue: {
        primaryTarget: "Carved chicken shows a deeply charred, lacquered skin and juicy, pale flesh beneath that runs clear at the thigh joint. The skin holds its rigid, charred character even after resting.",
        spectrum: [
          { state: "Underdone", description: "Juices at the thigh joint run pink or red-tinged when the chicken is carved. Flesh is still distinctly pink near the bone.", action: "Return to the grill on indirect heat, or cover loosely with foil and rest in a warm oven at 160 °C for 10 minutes." },
          { state: "Perfect",   description: "Clear juices at every cut. Flesh is opaque throughout, white at the breast and pale rose at the thigh (safe at 74 °C). Skin is rigid and crackling. The resting liquid on the board smells of chili, char, and citrus.", action: "Serve immediately — this is best within 5 minutes of carving." },
          { state: "Overdone",  description: "Breast meat is dry and stringy when carved. No pooling juices on the board. Skin may have partially fallen off during carving.", action: "Serve with extra peri-peri sauce on the side for moisture. Thigh meat will still be juicy even when breast is overdone — route the white meat portions to those who want it." },
        ],
      },
      feelCue: "Press the center of the breast immediately before carving — it should feel firm but yield with a definite spring, not spongy (undercooked) and not board-hard (overcooked). The char on the skin should crackle audibly when pressed.",
    },
  ],
};
