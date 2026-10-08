export default {
  repoId: "master_persian_persian_tahdig_001",
  parentRepoId: null,
  slug: "persian-tahdig",
  author: "ForkRecipe Kitchen",

  title: "Persian Tahdig (Crispy Rice)",
  description: "Rice that is as much about its golden, shattering crust as the fluffy grains above it — parboiled, rested, steamed under a towel-wrapped lid for an hour until the bottom transforms into a burnished disk that comes away from the pot in one dramatic, crackling sheet.",
  cuisine: "Persian",
  culture: "Iranian",
  category: "grains",

  tags: ["persian", "rice", "crispy", "vegetarian", "technique"],
  difficulty: 3,
  activeTime: "20 min",
  totalTime: "1 hr 20 min",
  ratioSystem: "parts",

  stars: 4120,
  forks: 388,
  contributors: 42,
  license: "CC-BY-SA",
  createdAt: "2024-10-21",
  updatedAt: "2026-02-14",

  flavorRadar: { sweet: 0, salty: 2, sour: 0, bitter: 0, umami: 1, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Starch",    name: "Aged basmati rice (extra-long grain)",   ratioValue: 100, defaultUnit: "parts", substitutions: ["regular basmati (soak extra 30 min)"] },
    { ingId: "ing_02", role: "Seasoning", name: "Fine sea salt (for parboiling water)",   ratioValue: 3,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Fat",       name: "Neutral oil (sunflower or vegetable)",   ratioValue: 8,   defaultUnit: "parts", substitutions: ["clarified butter / ghee for richer flavor"] },
    { ingId: "ing_04", role: "Fat",       name: "Unsalted butter, cubed",                 ratioValue: 5,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Liquid",    name: "Water (for parboiling)",                 ratioValue: 500, defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Soak and parboil rice",
      inputs: ["ing_01", "ing_02", "ing_05"],
      outputState: "parboiled_rice",
      instructions: "Rinse the rice in cold water until the water runs clear — this removes excess surface starch that would otherwise glue the grains together. Soak in cold, lightly salted water for 30 minutes minimum, 2 hours ideally. Drain. Bring a large pot of heavily salted water (it should taste like the sea) to a vigorous boil. Add the soaked, drained rice and parboil for exactly 6–7 minutes, stirring gently once. The rice is done when the outside is fully cooked but the center still has a small chalky core — bite a grain to check. Drain immediately in a colander and rinse briefly with lukewarm water to stop the cooking.",
      visualCue: {
        primaryTarget: "Each grain is slightly translucent at the edges but shows a distinct white chalky core when bitten. The rice is al dente — cooked through on the outside, firm in the middle.",
        spectrum: [
          { state: "Underdone", description: "Most of the grain is still hard and chalky throughout. The exterior is barely softened. The rice looks largely unchanged from raw.", action: "Continue boiling for another 2 minutes and check again. The parboil is the foundation — undercooked rice will not steam to perfection in the final step." },
          { state: "Perfect",   description: "Outer layer fully cooked, translucent-soft. A visible white dot at the center when you bite a grain. The grain is elongated — it has expanded significantly.", action: "Drain immediately and rinse with lukewarm water. Work quickly — the carry-over cooking continues in the colander." },
          { state: "Overdone",  description: "Grain has no chalky center — it is fully soft throughout. The rice is already fully cooked and will turn mushy in the steam step.", action: "Drain and rinse with cold water immediately to stop cooking. Proceed with the steam step, but reduce steaming time to 30 minutes. The tahdig will still form." },
        ],
      },
      feelCue: "Bite a parboiled grain in half — the outside should yield immediately while the interior pushes back faintly, like an al dente pasta that still has one more minute of cooking ahead of it.",
    },
    {
      nodeId: "step_2",
      action: "Build tahdig crust",
      inputs: ["parboiled_rice", "ing_03"],
      outputState: "layered_rice_pot",
      instructions: "In a heavy-bottomed, non-stick pot (24–26cm diameter), heat the oil over medium heat until shimmering. For a plain crust: add 2–3 tablespoons of water to the oil and let it sizzle, then immediately pile in all the parboiled rice, mounding it slightly in the center. Do not press or compact it — use a spoon handle to poke 5–6 holes down through the rice to allow steam to travel upward. For a potato tahdig (beloved variation): place thin potato slices in the oiled pan in a single overlapping layer before adding the rice. Scatter the cubed butter over the top of the mounded rice.",
      visualCue: {
        primaryTarget: "A tall mound of rice with steam vents poked through, sitting in lightly sizzling oil, butter distributed across the top — ready to be covered for the steam phase.",
        spectrum: [
          { state: "Underdone", description: "Rice has been pressed down flat and compacted — no steam vents poked. The rice layer is dense and uniform.", action: "Use a chopstick to poke vents from top to bottom. Compact rice steams unevenly and produces a thick, rubbery crust rather than a crisp one." },
          { state: "Perfect",   description: "Loose, fluffy mound with visible vent holes. Oil is quietly sizzling at the edges of the pot. The bottom layer of rice is beginning to cook in the oil.", action: "Wrap the pot lid tightly in a clean kitchen towel, then place firmly on the pot." },
          { state: "Overdone",  description: "Oil is too hot — rice added to it is already sizzling aggressively and browning immediately, before the steam step.", action: "Reduce heat immediately. The crust forms over 45 minutes on low, not in the first 2 minutes." },
        ],
      },
      feelCue: "The pile of rice on top should feel as loose as freshly fallen snow — no compaction, no resistance when you push a chopstick through it. That airiness is what allows the steam to lift every grain.",
    },
    {
      nodeId: "step_3",
      action: "Steam under towel-wrapped lid",
      inputs: ["layered_rice_pot"],
      outputState: "steamed_tahdig",
      instructions: "Wrap the pot lid tightly in a clean kitchen towel, securing the corners at the top so they do not hang near the burner. Place the lid on the pot — the towel absorbs condensation that would otherwise drip back down and make the rice wet. Set heat to medium-high for 3 minutes to start building the crust, then reduce to the absolute lowest simmer your burner offers. Cook undisturbed for 40–45 minutes. Do not lift the lid. The golden crust develops from below through even, gentle heat — disturbing this process resets it.",
      visualCue: {
        primaryTarget: "After 40 minutes: wisps of steam are escaping around the towel-lid seal. The rice has puffed and separated above the pot line. A faint toasty aroma — not burnt, but golden.",
        spectrum: [
          { state: "Underdone", description: "After 30 minutes: steam is still actively escaping and the rice smells of steam rather than toasted grain. The pot bottom does not yet make a sizzling sound when shaken.", action: "Continue steaming. The tahdig crust takes time — check again at 40 minutes." },
          { state: "Perfect",   description: "After 40–45 minutes: the faintest golden, nutty, toasted smell rises from the pot. The rice is completely fluffy. When you place your hand near the bottom of the pot, you feel focused radiant heat.", action: "Remove from heat and let rest 5 minutes before unmolding." },
          { state: "Overdone",  description: "A sharp, acrid burnt smell — like scorched popcorn rather than toasted bread. The sizzling from the pot bottom has gone from a quiet whisper to a loud hiss.", action: "Remove from heat immediately. The top rice will be perfect; only the bottom crust layer is affected. Fill the sink with 3cm of cold water and place the pot in it for 30 seconds — this releases the crust from the pan." },
        ],
      },
      feelCue: "Hold your palm 10cm below the pot (without touching) during the steam phase — you should feel steady, even warmth like a low heat lamp. A scorching heat means the burner is too high.",
    },
    {
      nodeId: "step_4",
      action: "Unmold and serve",
      inputs: ["steamed_tahdig"],
      outputState: "finished_tahdig",
      instructions: "The unmolding is the theater of tahdig. Place a large serving platter on top of the pot. With one decisive, confident motion, flip the entire pot over onto the platter — like unmolding a cake. If the tahdig releases cleanly, you will hear it land in one piece. If it sticks, place the pot back on the cold sink bottom for 30 more seconds, then try again. Alternatively, serve family-style by first spooning the fluffy top rice onto the platter, then carefully lifting the crust in one piece to place on top, golden-side up.",
      visualCue: {
        primaryTarget: "A golden, burnished disk of crust — the color of a perfect caramel or a well-baked cookie — sitting intact on the platter, with fluffy white rice surrounding or beneath it.",
        spectrum: [
          { state: "Underdone", description: "When unmolded, the bottom is pale cream — barely golden, not yet caramelized. The crust is soft rather than crunchy, almost spongy.", action: "Return rice to the pot, replace the lid-towel, and steam 10 more minutes on medium-low. The crust needs more time to caramelize." },
          { state: "Perfect",   description: "A single, intact golden disk — evenly caramelized across its entire surface, from deep amber at the center to golden at the edges. It makes a hollow sound when tapped. The underside smells of toasted grain and butter.", action: "Bring to the table whole and crack with a spoon for dramatic service." },
          { state: "Overdone",  description: "The crust is very dark brown — almost black in the center — and acrid-smelling. It may have cracked into pieces during unmolding.", action: "Flip it broken-side down and serve it as a crumbled topping over the fluffy rice instead of as an intact disk. Offer extra salt to balance the bitter notes." },
        ],
      },
      feelCue: "Tap the bottom of the fresh tahdig crust with your knuckle — the perfect crust rings back with a hollow, ceramic sound and feels rigid and glassy, not soft or pliable under your finger.",
    },
  ],
};
