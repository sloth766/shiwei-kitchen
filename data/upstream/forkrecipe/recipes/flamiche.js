export default {
  repoId: "master_french_flamiche_001",
  parentRepoId: null,
  slug: "flamiche",
  author: "ForkRecipe Kitchen",

  title: "Flamiche aux Poireaux",
  description: "A rich, open-faced tart of slowly stewed leeks and cream in a crisp pâte brisée shell — simple, warming, and deeply savory, the great leek tart of northern France.",
  cuisine: "French",
  culture: "Northern French / Flemish",
  category: "proteins",

  tags: ["tart", "leek", "french", "cream", "pastry"],
  difficulty: 3,
  activeTime: "40 min",
  totalTime: "2 hr",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",

  flavorRadar: { sweet: 2, salty: 3, sour: 0, bitter: 1, umami: 3, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure", name: "All-purpose flour",             ratioValue: 100, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_02", role: "Fat",       name: "Cold unsalted butter (cubed)",  ratioValue: 55,  defaultUnit: "parts", substitutions: ["lard (more flaky)"] },
    { ingId: "ing_03", role: "Liquid",    name: "Ice-cold water",               ratioValue: 20,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Seasoning", name: "Fine salt",                    ratioValue: 2,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Allium",    name: "Leeks (white and pale green parts only, sliced 1 cm thick)", ratioValue: 120, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Fat",       name: "Unsalted butter (for cooking leeks)", ratioValue: 15, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Dairy",     name: "Heavy cream",                  ratioValue: 40,  defaultUnit: "parts", substitutions: ["crème fraîche"] },
    { ingId: "ing_08", role: "Protein",   name: "Large eggs",                   ratioValue: 20,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_09", role: "Dairy",     name: "Gruyère or Comté (finely grated)", ratioValue: 20, defaultUnit: "parts", substitutions: ["Beaufort"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Chill",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_04"],
      outputState: "pate_brisee_shell",
      instructions: "In a large bowl, combine flour and salt. Add the cold cubed butter and rub quickly between your fingertips until the mixture resembles coarse, pea-sized breadcrumbs — work fast to keep the butter cold. Drizzle in the ice-cold water one tablespoon at a time, mixing with a fork until the dough just comes together without being wet or sticky. Press into a disc, wrap in plastic, and refrigerate for 30 minutes. Roll to a 3 mm circle and line a 24–26 cm tart tin. Prick the base all over with a fork. Refrigerate again for 15 minutes, then blind-bake at 190°C (375°F) lined with parchment and beans for 15 minutes; remove the beans and bake a further 8–10 minutes until the base is pale gold and set.",
      visualCue: {
        primaryTarget: "A pale golden shell with a dry, set base and crisp, defined edges — no visible raw patches or shrinkage from the tin walls.",
        spectrum: [
          { state: "Underdone", description: "Base looks pale and shiny — it is still raw and doughy. It will go soggy once the filling is added.", action: "Return to the oven without the beans for a further 5 minutes. The base must look dry and slightly matte." },
          { state: "Perfect",   description: "Pale golden-cream color, completely set and dry to the touch. No shrinkage. The base makes a faint crackle sound when tapped with a fingernail.", action: "Allow to cool slightly before adding the filling." },
          { state: "Overdone",  description: "Edges are dark brown and slightly burnt. Base has shrunk away from the sides, leaving a gap.", action: "Fill and bake immediately — the tart is still usable. Trim any very dark edges with scissors after the final bake." },
        ],
      },
      feelCue: "When you press the base lightly after blind baking, it should feel firm and dry, with a tiny crackle of resistance — not soft or pliable.",
    },
    {
      nodeId: "step_2",
      action: "Simmer",
      inputs: ["ing_05", "ing_06", "ing_04"],
      outputState: "stewed_leeks",
      instructions: "Wash the sliced leeks thoroughly in cold water and drain well. Melt the butter in a wide pan over low heat. Add the leeks with a pinch of salt and stir to coat. Cook over the lowest possible heat, covered, for 20–25 minutes, stirring occasionally, until the leeks are completely soft, sweet, and yielding — they should have no bite whatsoever. Remove the lid and cook for a further 5 minutes to evaporate any remaining moisture. The leeks should look translucent and silky, not watery.",
      visualCue: {
        primaryTarget: "Leeks that have collapsed completely into pale, almost translucent, silky strands with no visible liquid pooling in the pan.",
        spectrum: [
          { state: "Underdone", description: "Leeks still have a green raw color and resist biting. There is liquid in the pan.", action: "Continue cooking covered on low heat. The long gentle cook is the only way to develop the leeks' sweetness." },
          { state: "Perfect",   description: "Completely soft, pale, slightly translucent. Sweet rather than sharp. No pooling liquid. When pressed with a spoon they offer no resistance.", action: "Remove from heat and allow to cool slightly before combining with the custard." },
          { state: "Overdone",  description: "Leeks are mushy, slightly brownish, and have lost their distinct texture — they smell slightly of cooked cabbage.", action: "Proceed. The flavor is still good; the texture will be fine once baked in the custard." },
        ],
      },
      feelCue: "Press a leek strand between your fingers — it should disintegrate instantly with no thread-like resistance, completely surrendered to the butter.",
    },
    {
      nodeId: "step_3",
      action: "Whisk",
      inputs: ["ing_07", "ing_08", "ing_09", "ing_04"],
      outputState: "leek_custard",
      instructions: "In a bowl, whisk together the cream, eggs, and half the Gruyère until fully combined. Season generously with salt and white pepper. Fold the cooled stewed leeks into the custard mixture until evenly distributed. The mixture should look creamy and cohesive — not separated.",
      visualCue: {
        primaryTarget: "A pale, creamy mixture where leek strands are fully coated in the egg-cream custard, with no pools of liquid at the bottom.",
        spectrum: [
          { state: "Underdone", description: "Leeks and cream have not been mixed — they separate in the bowl. Eggs are not fully integrated.", action: "Whisk the cream and eggs first until combined, then fold in the leeks." },
          { state: "Perfect",   description: "A cohesive, creamy pale-green mixture. Leeks are distributed throughout. Smells of cream, cheese, and sweet allium.", action: "Pour immediately into the blind-baked shell and top with remaining Gruyère." },
          { state: "Overdone",  description: "Mixture has been stirred too vigorously and the cream has separated or the eggs have begun to foam.", action: "Proceed regardless — the bake will stabilize the custard." },
        ],
      },
      feelCue: "The custard should flow off a spoon like a thick, viscous cream — slow and coating, not watery.",
    },
    {
      nodeId: "step_4",
      action: "Bake",
      inputs: ["pate_brisee_shell", "leek_custard"],
      outputState: "finished_flamiche",
      instructions: "Pour the leek custard into the blind-baked shell. Scatter the remaining Gruyère evenly across the surface. Place on a baking sheet and bake at 180°C (355°F) for 30–35 minutes, until the custard is just set with only a very slight tremor in the center, the surface is golden, and the cheese has formed patches of deep golden-brown.",
      visualCue: {
        primaryTarget: "A golden, set tart surface with patches of deeper brown cheese and a very faint wobble in the very center when the tin is gently shaken.",
        spectrum: [
          { state: "Underdone", description: "The custard is liquid in the center — it sloshes freely when the tin is moved. The surface is pale and not yet set.", action: "Return for 5–8 more minutes. Check every 3 minutes — the transition from underdone to perfect is rapid." },
          { state: "Perfect",   description: "Surface is golden with patches of dark cheese. The outer three-quarters is fully set. The center still has a very gentle tremor — it will firm as it rests. Smells of warm butter and gruyère.", action: "Remove from the oven and rest for 15 minutes before slicing." },
          { state: "Overdone",  description: "Custard has puffed up dramatically and is starting to crack at the edges. The surface is very dark. The egg has over-cooked and will be slightly rubbery.", action: "Remove immediately. It is still edible but best eaten quickly while still warm." },
        ],
      },
      feelCue: "When you touch the center of the tart very gently with a fingertip, it should feel set but give a tiny trembling response beneath the surface — like very firm jelly.",
    },
  ],
};
