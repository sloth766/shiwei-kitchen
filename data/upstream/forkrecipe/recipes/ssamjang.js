export default {
  repoId: "master_korean_ssamjang_001",
  parentRepoId: null,
  slug: "ssamjang",
  author: "ForkRecipe Kitchen",

  title: "Ssamjang",
  description: "A dark, thick Korean dipping paste where earthy doenjang and fiery gochujang meet sesame oil, garlic, and a whisper of honey — the essential companion to Korean barbecue that wraps around grilled meat and crisp lettuce leaves and tastes like the table itself.",
  cuisine: "Korean",
  culture: "Korean",
  category: "condiments",

  tags: ["dipping sauce", "korean", "gochujang", "doenjang", "bbq"],
  difficulty: 1,
  activeTime: "10 min",
  totalTime: "10 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",

  // 0–5 scale. Doenjang and gochujang push umami and heat; honey rounds the sweetness.
  flavorRadar: { sweet: 2, salty: 4, sour: 1, bitter: 2, umami: 5, heat: 3 },

  ingredients: [
    { ingId: "ing_01", role: "Umami",     name: "Doenjang (Korean fermented soybean paste)",    ratioValue: 3,   defaultUnit: "parts", substitutions: ["white miso (milder, less funky)"] },
    { ingId: "ing_02", role: "Spice",     name: "Gochujang (Korean fermented chili paste)",     ratioValue: 1.5, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Fat",       name: "Toasted sesame oil",                           ratioValue: 0.75, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Sweetener", name: "Honey or rice syrup (maesil cheong optional)", ratioValue: 0.5, defaultUnit: "parts", substitutions: ["maple syrup"] },
    { ingId: "ing_05", role: "Allium",    name: "Garlic, finely minced (3 cloves)",             ratioValue: 0.5, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Allium",    name: "Scallion (2 stalks), very finely sliced",      ratioValue: 0.5, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Garnish",   name: "Toasted sesame seeds",                         ratioValue: 0.25, defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Mix",
      inputs: ["ing_01", "ing_02"],
      outputState: "paste_base",
      instructions: "Combine doenjang and gochujang in a small mixing bowl. Stir vigorously with a fork or small rubber spatula until the two pastes are fully unified — no streaks of red or brown should remain distinct. The doenjang is much thicker and drier than gochujang, so it will take some effort to bring them together. The combined paste should be a deep reddish-brown — darker than gochujang alone, earthier and more complex. Taste at this stage: the doenjang-gochujang balance should deliver earthy fermented depth first, then chili warmth.",
      visualCue: {
        primaryTarget: "A uniform, very dark reddish-brown paste with no visible red or brown streaks. Thick and slightly rough in texture from the soybean grains in the doenjang.",
        spectrum: [
          { state: "Underdone", description: "Red and brown streaks still visible — two pastes not fully incorporated.", action: "Keep stirring. The pastes are thick and need persistent pressure to combine." },
          { state: "Perfect",   description: "Uniform dark paste. A complex, deeply fermented smell — earthy, savoury, and slightly funky in the best way.", action: "Add sesame oil, honey, garlic, and scallion." },
          { state: "Overdone",  description: "N/A — this step cannot be over-done. A well-combined base is the goal.", action: "Proceed." },
        ],
      },
      feelCue: "The combined paste should feel dense and slightly gritty from the soybean particles in the doenjang — rubbing a small amount between your fingers should leave a dark, earthy-smelling stain.",
    },
    {
      nodeId: "step_2",
      action: "Mix",
      inputs: ["paste_base", "ing_03", "ing_04", "ing_05", "ing_06"],
      outputState: "seasoned_ssamjang",
      instructions: "Add sesame oil, honey, minced garlic, and sliced scallion to the paste base. Mix thoroughly until everything is evenly distributed. The sesame oil will loosen the paste slightly, making it more spreadable — traditional ssamjang should be thick enough to hold a shape on a spoon but loose enough to smear easily on a leaf of lettuce. Taste and adjust: more gochujang for heat and colour, more doenjang for depth and funk, more honey if the fermented flavour is too assertive for your preference.",
      visualCue: {
        primaryTarget: "A dark, glossy paste with green scallion flecks throughout. Slightly looser than the two fermented pastes alone. Smells of sesame, garlic, and deeply fermented soy.",
        spectrum: [
          { state: "Underdone", description: "Sesame oil not fully incorporated — floating in pools on the surface. Garlic raw and sharp-smelling.", action: "Keep stirring. The oil needs to be emulsified into the thick paste." },
          { state: "Perfect",   description: "Cohesive, glossy, deeply complex paste. The smell is layered: sesame oil on top, garlic in the middle, fermented funk underneath. Scallion is bright green.", action: "Scatter sesame seeds and serve, or refrigerate for up to 2 weeks." },
          { state: "Overdone",  description: "N/A — over-mixing is not a risk here.", action: "Proceed." },
        ],
      },
      feelCue: "Smear a small amount of the seasoned ssamjang on the back of your hand — it should spread smoothly without tearing or crumbling, leaving a dark, glossy film that smells of toasted sesame and fermented soy.",
    },
    {
      nodeId: "step_3",
      action: "Finish",
      inputs: ["seasoned_ssamjang", "ing_07"],
      outputState: "finished_ssamjang",
      instructions: "Scatter the toasted sesame seeds over the surface of the ssamjang — do not stir them in fully, leave them as a visible garnish that adds texture. Taste one final time. A great ssamjang should deliver: umami first (from the doenjang), then heat (from the gochujang), then a round sesame-honey sweetness that lingers. If the paste is too thick to spread easily, add a few drops of water and stir. Transfer to a small ceramic bowl for serving at the barbecue table. Keeps refrigerated in an airtight container for up to 2 weeks — the flavour deepens and mellows with time.",
      visualCue: {
        primaryTarget: "A small, neatly mounded bowl of very dark, glossy paste scattered with white and tan sesame seeds. The surface looks almost lacquered.",
        spectrum: [
          { state: "Underdone", description: "Ssamjang not yet tasted or adjusted. Sesame seeds not added.", action: "Always taste and adjust — then add sesame seeds as the final visual signal that the dish is complete." },
          { state: "Perfect",   description: "Dark, glossy, intensely flavoured paste that looks like it belongs on a Korean barbecue table. The sesame seeds are toasted and fragrant. One bite tells you everything is in balance.", action: "Serve immediately or cover and refrigerate." },
          { state: "Overdone",  description: "Paste has been made far in advance and the fresh garlic has turned harsh and bitter in the refrigerator.", action: "Stir in a tiny pinch of sugar and a few drops of sesame oil to smooth out the harshness. Or make fresh — it takes 10 minutes." },
        ],
      },
      feelCue: "When you use ssamjang as intended — smeared on a sesame leaf with a piece of grilled pork belly, a sliver of raw garlic, and a grain of rice — the fermented depth should bloom on the back of your palate and outlast every other flavour at the table.",
    },
  ],
};
