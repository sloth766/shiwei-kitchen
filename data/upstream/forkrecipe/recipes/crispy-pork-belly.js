export default {
  repoId: "master_chinese_crispy_pork_belly_001",
  parentRepoId: null,
  slug: "crispy-pork-belly",
  author: "ForkRecipe Kitchen",

  title: "Crispy Pork Belly",
  description: "Cantonese siu yuk at its finest — the skin shatters into a thousand lacquered shards, the fat beneath has rendered to a translucent, yielding layer, and the meat below is seasoned deep into the grain.",
  cuisine: "Chinese",
  culture: "Cantonese",
  category: "proteins",

  tags: ["pork", "cantonese", "crispy", "roast", "chinese", "siu-yuk"],
  difficulty: 3,
  activeTime: "40 min",
  totalTime: "8 hr",
  ratioSystem: "parts",

  stars: 1987,
  forks: 278,
  contributors: 61,
  license: "CC-BY-SA",
  createdAt: "2024-09-20",
  updatedAt: "2025-04-05",

  flavorRadar: { sweet: 1, salty: 4, sour: 0, bitter: 0, umami: 4, heat: 1 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Pork belly (skin-on, bone-out)", ratioValue: 100, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_02", role: "Seasoning", name: "Fine sea salt",                   ratioValue: 3,   defaultUnit: "parts", substitutions: ["kosher salt"] },
    { ingId: "ing_03", role: "Spice",     name: "Five-spice powder",               ratioValue: 1,   defaultUnit: "parts", substitutions: ["Chinese five-spice blend"] },
    { ingId: "ing_04", role: "Seasoning", name: "White pepper (ground)",           ratioValue: 0.5, defaultUnit: "parts", substitutions: ["black pepper"] },
    { ingId: "ing_05", role: "Acid",      name: "Rice vinegar",                    ratioValue: 2,   defaultUnit: "parts", substitutions: ["white vinegar", "malt vinegar"] },
    { ingId: "ing_06", role: "Allium",    name: "Garlic (minced)",                 ratioValue: 2,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Seasoning", name: "Baking soda (for skin pricking)", ratioValue: 0.5, defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Score",
      inputs: ["ing_01"],
      outputState: "scored_pork",
      instructions: "Using a metal skewer or a fork, prick the skin of the pork belly hundreds of times over its entire surface, going about 5mm deep but not piercing through to the fat layer. Flip the belly and score the meat side in a crosshatch pattern, 2cm deep. This mechanical disruption of the skin creates channels for rendered fat to escape during roasting, which is what causes the skin to blister and shatter.",
      visualCue: {
        primaryTarget: "The skin surface is covered uniformly with tiny puncture holes, showing no large unpierced patches. The meat side has a neat diamond pattern of cuts.",
        spectrum: [
          { state: "Underdone", description: "Skin has sparse punctures; large areas remain smooth and intact.", action: "Continue pricking — even coverage is essential. Unpierced areas will stay tough and chewy." },
          { state: "Perfect",   description: "Skin looks like fine-grained sandpaper, evenly pocked. The meat side shows uniform diamond cuts without tearing.", action: "Proceed to seasoning." },
          { state: "Overdone",  description: "Skin has been pierced so deeply that the fat layer beneath is exposed and beginning to separate.", action: "Proceed carefully — the skin may shrink more aggressively; watch closely during roasting." },
        ],
      },
      feelCue: "Run a finger over the pricked skin — it should feel rough and bristly like coarse sandpaper, with no smooth patches. The skin should not flex when you try to bend it.",
    },
    {
      nodeId: "step_2",
      action: "Season",
      inputs: ["scored_pork", "ing_02", "ing_03", "ing_04", "ing_06"],
      outputState: "seasoned_pork",
      instructions: "Flip the belly meat-side up. Rub the five-spice powder, minced garlic, white pepper, and half the salt thoroughly into the meat and into all the score cuts — get the seasoning as deep into the cuts as possible. Flip skin-side up and rub the remaining salt onto the skin evenly. Place skin-side up, uncovered, in the refrigerator for a minimum of 6 hours or overnight. The desiccating air of the refrigerator is what drives the final moisture out of the skin.",
      visualCue: {
        primaryTarget: "After refrigerating, the skin is visibly dry — almost papery — and has tightened. The surface looks translucent and leathery, not moist.",
        spectrum: [
          { state: "Underdone", description: "The skin still looks moist and plump after refrigeration, with a sheen of moisture.", action: "Return uncovered to the refrigerator for several more hours. Do not skip this step." },
          { state: "Perfect",   description: "Skin is bone-dry, slightly translucent, and taut. It makes a faint sound when tapped with a fingernail.", action: "Proceed with the acid treatment and roasting." },
          { state: "Overdone",  description: "Skin is very dark and contracted; it has been in the refrigerator for more than 24 hours.", action: "Still fine to proceed — a longer dry will generally yield crispier results." },
        ],
      },
      feelCue: "After overnight drying, the skin should feel like dry parchment — stiff, cool, and almost translucent when held to the light. It should make a soft crinkle sound when flexed.",
    },
    {
      nodeId: "step_3",
      action: "Roast",
      inputs: ["seasoned_pork", "ing_05", "ing_07"],
      outputState: "roasted_pork",
      instructions: "Dissolve the baking soda in rice vinegar and brush onto the skin generously; the alkalinity raises the pH of the skin, accelerating the Maillard reaction and driving crisping. Place skin-side up on a wire rack over a foil-lined tray. Roast at 180°C (360°F) for 50 minutes to render the fat, then blast at 230°C (450°F) for 20–25 minutes for the crackling. Watch closely in the final stage — the transformation from rendered to blistered is fast.",
      visualCue: {
        primaryTarget: "In the high-heat phase, the skin is actively blistering — small golden-brown bubbles are forming, rising, and turning deep amber across the entire surface.",
        spectrum: [
          { state: "Underdone", description: "The skin is golden but flat and glassy, with no blistering or bubbling visible.", action: "Increase oven temperature to 240°C and continue watching every 5 minutes." },
          { state: "Perfect",   description: "The entire surface is covered in golden-amber blisters of varying sizes, like a topographic map. Deep mahogany where blisters have peaked.", action: "Remove immediately and rest 10 minutes before slicing." },
          { state: "Overdone",  description: "Blisters have blackened; acrid smoke coming from the oven. The skin surface is charred.", action: "Remove immediately. Scrape any fully charred areas with a knife before serving." },
        ],
      },
      feelCue: "When you press gently on the skin with a spoon handle, it should sound hollow and crackle audibly — like tapping a glass Christmas ornament. The blisters should feel rigid, not soft.",
    },
    {
      nodeId: "step_4",
      action: "Rest",
      inputs: ["roasted_pork"],
      outputState: "rested_pork_belly",
      instructions: "Remove from the oven and rest on the wire rack — never on a flat surface which would trap steam and soften the crackling. Rest for 10 minutes before slicing. Slice using a sharp cleaver or heavy chef's knife with downward pressure rather than sawing; sawing shatters the crackling unevenly.",
      visualCue: {
        primaryTarget: "The crackling remains rigid and evenly blistered as it rests. No steam escapes from the skin surface. The fat layer beneath the skin is visible as a sheen through the translucent skin.",
        spectrum: [
          { state: "Underdone", description: "Steam is rising from the skin surface during rest; the crackling feels slightly soft when pressed.", action: "Rest longer on the rack — the surface moisture needs to fully evaporate." },
          { state: "Perfect",   description: "Crackling is rigid, shatteringly crisp, and completely dry. The fat layer is set and white, not liquid.", action: "Slice with confidence and serve immediately." },
          { state: "Overdone",  description: "Crackling has sat too long and has begun to absorb ambient humidity, turning slightly leathery.", action: "Return to a 230°C oven for 5 minutes to re-crisp." },
        ],
      },
      feelCue: "Press a finger against the crackling — it should shatter inward immediately with a sharp snap. Lift a piece and it should feel weightless and rigid; any flexibility means moisture is still present.",
    },
  ],
};
