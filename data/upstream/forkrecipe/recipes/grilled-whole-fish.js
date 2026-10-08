export default {
  repoId: "master_mediterranean_grilled_whole_fish_001",
  parentRepoId: null,
  slug: "grilled-whole-fish",
  author: "ForkRecipe Kitchen",

  title: "Mediterranean Grilled Whole Fish",
  description: "A whole sea bass or bream scored through its skin and filled with lemon slices, herbs, and garlic, then grilled over open coals until the skin blisters and crisps away from the flesh and the flesh itself sweats its juices onto the grate below. The Greek fisherman's answer to technique: simplicity, fire, and time.",
  cuisine: "Mediterranean",
  culture: "Greek",
  category: "seafood",

  tags: ["whole-fish", "grilled", "mediterranean", "greek", "herb", "lemon"],
  difficulty: 2,
  activeTime: "15 min",
  totalTime: "30 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 1, salty: 3, sour: 3, bitter: 2, umami: 3, heat: 1 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Whole sea bass or sea bream (400–500 g each), scaled and gutted", ratioValue: 2,   defaultUnit: "fish",   substitutions: ["red snapper", "branzino", "trout"] },
    { ingId: "ing_02", role: "Fat",       name: "Extra-virgin olive oil",                                          ratioValue: 60,  defaultUnit: "ml",     substitutions: [] },
    { ingId: "ing_03", role: "Citrus",    name: "Lemon, thinly sliced into rounds",                                ratioValue: 2,   defaultUnit: "lemons", substitutions: [] },
    { ingId: "ing_04", role: "Allium",    name: "Garlic cloves, thinly sliced",                                    ratioValue: 4,   defaultUnit: "cloves", substitutions: [] },
    { ingId: "ing_05", role: "Herb",      name: "Fresh oregano sprigs",                                            ratioValue: 6,   defaultUnit: "sprigs", substitutions: ["dried oregano, 1 tbsp"] },
    { ingId: "ing_06", role: "Herb",      name: "Fresh thyme sprigs",                                              ratioValue: 4,   defaultUnit: "sprigs", substitutions: [] },
    { ingId: "ing_07", role: "Herb",      name: "Fresh flat-leaf parsley",                                         ratioValue: 15,  defaultUnit: "g",      substitutions: [] },
    { ingId: "ing_08", role: "Seasoning", name: "Coarse sea salt",                                                 ratioValue: 10,  defaultUnit: "g",      substitutions: [] },
    { ingId: "ing_09", role: "Seasoning", name: "Black pepper, freshly cracked",                                   ratioValue: 4,   defaultUnit: "g",      substitutions: [] },
    { ingId: "ing_10", role: "Acid",      name: "Fresh lemon juice (for serving)",                                 ratioValue: 30,  defaultUnit: "ml",     substitutions: [] },
    { ingId: "ing_11", role: "Garnish",   name: "Lemon wedges, for serving",                                       ratioValue: 4,   defaultUnit: "wedges", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Score and stuff fish",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_04", "ing_05", "ing_06", "ing_08", "ing_09"],
      outputState: "prepared_fish",
      instructions: "Pat fish dry inside and out. With a sharp knife, score each side of the fish with 3–4 diagonal cuts, slicing down to the bone. The cuts should be about 2 cm apart. Season the cavity generously with salt and pepper. Fill each cavity with alternating slices of lemon, garlic, and herb sprigs — pack it firmly. Rub the outside of both fish liberally with olive oil, pressing it into the score marks. Season the scored skin with coarse salt and pepper. Let rest at room temperature for 15 minutes before grilling.",
      visualCue: {
        primaryTarget: "Fish with deep, clean diagonal score marks, cavity visibly filled with lemon rounds, garlic, and green herbs. Exterior shining with oil. Score marks show white flesh through the olive oil.",
        spectrum: [
          { state: "Underdone", description: "Score marks too shallow — barely scratching the skin without reaching the flesh. Aromatics will not penetrate.", action: "Score more deeply with a sharp knife, pressing firmly all the way to the lateral bone on each stroke." },
          { state: "Perfect",   description: "Score marks reach the bone cleanly. Cavity is fully stuffed. Exterior well-oiled and seasoned. Skin looks taut and ready.", action: "Allow 15-minute room-temperature rest, then grill." },
          { state: "Overdone",  description: "Score marks have sliced through the fish and separated the flesh from the skin in places.", action: "Still fine — fill the gaps with herbs and lemon and the fish will hold together on the grill. Handle carefully." },
        ],
      },
      feelCue: "Press the scored flesh — it should feel slightly tacky from the oil and salt, and the score marks should open slightly under finger pressure, showing white flesh within.",
    },
    {
      nodeId: "step_2",
      action: "Grill",
      inputs: ["prepared_fish"],
      outputState: "grilled_fish",
      instructions: "Prepare a two-zone grill — one side very hot (direct coals or high flame), one side cooler (indirect). Clean the grate aggressively with a wire brush and oil it with a folded paper towel dipped in oil on tongs. Place fish on the hot zone at a 45-degree angle to the grates. Do not move them for 4–5 minutes. The skin will initially stick and then release on its own when the crust has formed. When the fish releases freely, rotate 90 degrees to create crosshatch marks. After 2 more minutes, flip once. Grill second side for 4–5 minutes. If the fish is browning too fast, move to the cooler zone.",
      visualCue: {
        primaryTarget: "Skin is blistered, crisped, and shows clear crosshatch grill marks. The eyes have turned white and the flesh visible in the score marks is opaque throughout. No translucent pink flesh showing at the deepest score cut.",
        spectrum: [
          { state: "Underdone", description: "Skin is still pale and clinging to the grate. The fish has not yet released. Flesh in the score marks still shows translucency.", action: "Do not force a flip. Wait — the fish will release cleanly when the crust is formed. Forcing tears the skin." },
          { state: "Perfect",   description: "Skin is charred and crisped, releasing from the grates with a clean peel. Eyes white. Flesh fully opaque in scores. A metal skewer inserted at the thickest point and held to the lip for 3 seconds comes out warm, not cool.", action: "Rest 2 minutes before serving." },
          { state: "Overdone",  description: "Skin is deeply charred and beginning to blacken. Flesh in the scores looks dry and beginning to pull away from the bone excessively.", action: "Move to indirect heat immediately. Serve promptly — resting on residual heat will continue to cook." },
        ],
      },
      feelCue: "The fish is ready to flip when you can slide a thin spatula under the body and it lifts cleanly without tearing — it peels away from the grate with a sound like tearing velcro.",
    },
    {
      nodeId: "step_3",
      action: "Rest and plate",
      inputs: ["grilled_fish", "ing_10", "ing_07", "ing_11"],
      outputState: "finished_grilled_fish",
      instructions: "Lift fish to a warm platter. Let rest 2 minutes — the interior temperature will equalize and carry-over cooking will finish the center gently. Squeeze lemon juice over the entire fish, letting it pool in the score marks and run into the cavity. Scatter torn parsley over the top. Serve whole at the table with lemon wedges. To serve: use two large spoons to lift the top fillet along the lateral line, then peel the backbone away to expose the bottom fillet.",
      visualCue: {
        primaryTarget: "A beautifully charred fish on a platter, skin crisped, lemon juice glistening in the score marks, parsley scattered. The eyes should be fully white — a clear indicator of doneness.",
        spectrum: [
          { state: "Underdone", description: "Eyes still translucent or cloudy. Fish went to the table without resting — juices run out immediately when cut.", action: "A 2-minute rest is mandatory. Without it, the fish releases all its juices onto the plate rather than redistributing them through the flesh." },
          { state: "Perfect",   description: "Eyes completely white. Fish holds together when lifted, skin is still crisp. Lemon juice has brightened the aroma immediately. Flesh lifts cleanly from the bone in whole sections.", action: "Serve the first fillet and peel back the backbone to expose the second." },
          { state: "Overdone",  description: "Flesh falls off the bone before you are ready for it. Dry at the edges near the score cuts.", action: "Add extra olive oil and lemon to compensate. The flavor is still excellent — present it with confidence." },
        ],
      },
      feelCue: "Lift the top fillet with a spoon — it should slide off the bone in a single, clean motion with no tearing, like removing a sheet of paper from a pad. Resistance means it needed more time; falling apart means it had too much.",
    },
  ],
};
