export default {
  repoId: "master_japanese_tonkatsu_001",
  parentRepoId: null,
  slug: "tonkatsu",
  author: "ForkRecipe Kitchen",

  title: "Tonkatsu",
  description: "A thick pork cutlet entombed in craggy panko armor, fried to a shattering golden crust while the pork within stays barely blushed and juicy — yōshoku at its most satisfying, served with shredded cabbage and the sweet-savory sauce that makes it complete.",
  cuisine: "Japanese",
  culture: "Japanese Yōshoku",
  category: "proteins",

  tags: ["pork", "japanese", "tonkatsu", "fry", "panko", "yoshoku", "cutlet"],
  difficulty: 2,
  activeTime: "25 min",
  totalTime: "40 min",
  ratioSystem: "parts",

  stars: 2190,
  forks: 289,
  contributors: 65,
  license: "CC-BY-SA",
  createdAt: "2024-08-03",
  updatedAt: "2025-02-14",

  flavorRadar: { sweet: 2, salty: 3, sour: 1, bitter: 0, umami: 3, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Pork loin cutlet (2.5cm thick)",   ratioValue: 100, defaultUnit: "parts", substitutions: ["pork tenderloin", "chicken breast"] },
    { ingId: "ing_02", role: "Starch",    name: "Panko breadcrumbs",                ratioValue: 20,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Binder",    name: "All-purpose flour",                ratioValue: 10,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Binder",    name: "Egg (beaten)",                     ratioValue: 8,   defaultUnit: "parts", substitutions: ["aquafaba"] },
    { ingId: "ing_05", role: "Fat",       name: "Neutral frying oil",               ratioValue: 60,  defaultUnit: "parts", substitutions: ["vegetable oil", "lard"] },
    { ingId: "ing_06", role: "Seasoning", name: "Kosher salt and white pepper",     ratioValue: 1.5, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Umami",     name: "Tonkatsu sauce (Bulldog or similar)", ratioValue: 5, defaultUnit: "parts", substitutions: ["Worcestershire sauce blended with ketchup and soy sauce"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Temper and dry",
      inputs: ["ing_01", "ing_06"],
      outputState: "prepared_cutlet",
      instructions: "Use a meat mallet or the back of a heavy pan to gently pound the cutlet to an even 2cm thickness. Snip the fat and connective tissue band around the edge of the cutlet at 2cm intervals — this prevents the cutlet from curling during frying. Season generously with salt and white pepper on both sides. Let sit at room temperature for 15 minutes.",
      visualCue: {
        primaryTarget: "An evenly thick cutlet with a series of small cuts along the fat cap edge, seasoned uniformly on both sides.",
        spectrum: [
          { state: "Underdone", description: "Cutlet thickness varies significantly across its surface — thick at the center, thin at the edges.", action: "Pound the thicker areas more to achieve an even thickness throughout." },
          { state: "Perfect",   description: "Consistent thickness from edge to edge. The fat cap shows neat snips at regular intervals. The seasoning is evenly applied.", action: "Set up the breading station." },
          { state: "Overdone",  description: "The cutlet has been pounded too thin or the snips in the fat cap go all the way through the meat.", action: "Proceed but be aware it will cook very quickly — check internal temperature early." },
        ],
      },
      feelCue: "Run a finger across the surface of the cutlet — it should feel uniformly firm with no thin, floppy patches. The fat cap should feel intact but notched at regular intervals.",
    },
    {
      nodeId: "step_2",
      action: "Bread the cutlet",
      inputs: ["prepared_cutlet", "ing_02", "ing_03", "ing_04"],
      outputState: "breaded_cutlet",
      instructions: "Set up three shallow containers in sequence: flour, beaten egg, panko. Dredge the cutlet in flour, shaking off every trace of excess — a thick flour coating creates a gummy layer that prevents the panko from crisping properly. Dip in egg, letting excess drip for a full 5 seconds. Press firmly into the panko, turning and pressing again, building up thick, jagged layers. The more aggressively you press the panko, the more dramatic the crust.",
      visualCue: {
        primaryTarget: "The cutlet is completely encased in a uniform, thick coating of panko with no egg or flesh visible. The panko stands up in jagged peaks and ridges rather than lying flat.",
        spectrum: [
          { state: "Underdone", description: "Thin, patchy panko coverage with the egg coating showing through in places.", action: "Press additional panko onto the bare patches firmly, then let rest 5 minutes before frying." },
          { state: "Perfect",   description: "Thick, even panko armour with craggy, three-dimensional texture. The cutlet can stand on its edge without losing coating.", action: "Rest 5 minutes to allow the coating to set before frying." },
          { state: "Overdone",  description: "Panko is so thick and tightly pressed that it has become dense and uniform rather than craggy.", action: "Proceed — the crust will still be crisp, if slightly denser in texture." },
        ],
      },
      feelCue: "Press the coated cutlet gently — the panko surface should feel like the surface of a coral reef, rough and three-dimensional, not flat and smooth. It should feel well-adhered when you shake the cutlet gently.",
    },
    {
      nodeId: "step_3",
      action: "Fry",
      inputs: ["breaded_cutlet", "ing_05"],
      outputState: "fried_tonkatsu",
      instructions: "Heat oil to 170°C (340°F) in a pot deep enough for the oil to come halfway up the cutlet. Test with a panko crumb — it should sink, bob, then sizzle immediately without browning in under 10 seconds. Lower the cutlet away from you and fry for 4 minutes per side without disturbing. The lower temperature (versus standard deep frying) allows heat to penetrate to the center before the crust over-browns.",
      visualCue: {
        primaryTarget: "A steady, consistent stream of small bubbles rising evenly from all sides of the cutlet. The crust is gradually deepening from pale yellow to a rich, even amber.",
        spectrum: [
          { state: "Underdone", description: "The crust is golden after only 2 minutes and the oil is aggressively bubbling and spattering.", action: "The oil is too hot. Remove the cutlet, reduce oil temperature to 170°C, and try again." },
          { state: "Perfect",   description: "After 4 minutes per side: deep amber-gold crust, steady moderate bubbling, internal temperature 63–65°C. The cutlet floats slightly as the fat in the meat renders.", action: "Remove and drain on a wire rack, not paper towels." },
          { state: "Overdone",  description: "The crust is dark brown and the bubbling has nearly stopped — the moisture has all been driven out.", action: "Remove immediately. The interior may be dry. Resting on a rack will help redistribute any remaining juices." },
        ],
      },
      feelCue: "Listen to the oil — it should sound like a steady rain on a roof, not an aggressive crackling storm. When the bubbling begins to slow and quiet, the moisture is nearly gone and the cutlet is almost done.",
    },
    {
      nodeId: "step_4",
      action: "Rest",
      inputs: ["fried_tonkatsu", "ing_07"],
      outputState: "finished_tonkatsu",
      instructions: "Transfer to a wire rack and rest for 3 minutes — never paper towels, which trap steam and soften the crust from beneath. The carryover heat will bring the interior to a perfect 68°C. Slice into 2cm strips with a sharp knife using a single downward press — sawing shatters the crust. Serve immediately with tonkatsu sauce drizzled over or alongside for dipping, and finely shredded raw cabbage.",
      visualCue: {
        primaryTarget: "When sliced, the interior is pale white-pink and juicy, with a very faint pink blush at the very center. The crust is completely separate from the meat in texture — crackling, golden, and rigid.",
        spectrum: [
          { state: "Underdone", description: "Interior is pink and the juices run clear-pink when pressed. The center feels soft and yielding.", action: "Return to the oil for 2 additional minutes per side, or finish in a 180°C oven for 5 minutes." },
          { state: "Perfect",   description: "Interior is white with the faintest blush of pink. Juices are clear. Crust is completely rigid. The contrast of textures — shatteringly crisp and tenderly juicy — is the goal.", action: "Serve immediately." },
          { state: "Overdone",  description: "Interior is fully white, no pink, and feels firm and dry when pressed. Juices are absent.", action: "Drizzle extra sauce to add moisture. Next time pull at 63–65°C internal temperature." },
        ],
      },
      feelCue: "The first bite should present two sensations simultaneously: the crack of the panko shattering between the teeth, immediately followed by the yielding, juicy pork. The tonkatsu sauce should smell of Worcestershire and fruit — caramel and vinegar.",
    },
  ],
};
