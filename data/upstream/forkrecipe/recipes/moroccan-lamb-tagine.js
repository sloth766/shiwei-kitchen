export default {
  repoId: "master_moroccan_moroccan_lamb_tagine_001",
  parentRepoId: null,
  slug: "moroccan-lamb-tagine",
  author: "ForkRecipe Kitchen",

  title: "Moroccan Lamb Tagine",
  description: "Lamb shoulder braised low and slow in a clay vessel with saffron, ginger, preserved lemon, and dried apricots until the meat surrenders completely — sweet and savory and aromatic all at once, the very scent of a Marrakech medina at dusk.",
  cuisine: "Moroccan",
  culture: "Moroccan",
  category: "proteins",

  tags: ["moroccan", "lamb", "stew", "spiced", "dried-fruit"],
  difficulty: 3,
  activeTime: "45 min",
  totalTime: "2 hrs 30 min",
  ratioSystem: "parts",

  stars: 2940,
  forks: 231,
  contributors: 30,
  license: "CC-BY-SA",
  createdAt: "2024-09-05",
  updatedAt: "2025-12-18",

  flavorRadar: { sweet: 3, salty: 3, sour: 1, bitter: 1, umami: 3, heat: 2 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",    name: "Lamb shoulder, bone-in, cut into 5cm chunks",  ratioValue: 100, defaultUnit: "parts", substitutions: ["bone-in goat shoulder", "beef chuck"] },
    { ingId: "ing_02", role: "Allium",     name: "Yellow onion, grated",                          ratioValue: 25,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Spice",      name: "Ras el hanout spice blend",                     ratioValue: 4,   defaultUnit: "parts", substitutions: ["equal mix of cumin, coriander, turmeric, ginger, cinnamon, paprika"] },
    { ingId: "ing_04", role: "Spice",      name: "Ground ginger",                                  ratioValue: 2,   defaultUnit: "parts", substitutions: ["fresh ginger, 3x quantity, grated"] },
    { ingId: "ing_05", role: "Aromatic",   name: "Saffron threads (bloomed in 2 tbsp warm water)", ratioValue: 0.2, defaultUnit: "parts", substitutions: ["pinch turmeric + pinch smoked paprika"] },
    { ingId: "ing_06", role: "Sweetener",  name: "Dried apricots, halved",                        ratioValue: 15,  defaultUnit: "parts", substitutions: ["pitted prunes", "golden raisins"] },
    { ingId: "ing_07", role: "Acid",       name: "Preserved lemon (rind only, rinsed and sliced)", ratioValue: 8,   defaultUnit: "parts", substitutions: ["2 tsp fresh lemon zest + 1 tsp salt"] },
    { ingId: "ing_08", role: "Fat",        name: "Olive oil",                                      ratioValue: 10,  defaultUnit: "parts", substitutions: ["argan oil for more authentic flavor"] },
    { ingId: "ing_09", role: "Liquid",     name: "Chicken or lamb stock",                          ratioValue: 40,  defaultUnit: "parts", substitutions: ["water with a lamb bone"] },
    { ingId: "ing_10", role: "Garnish",    name: "Fresh cilantro and toasted almond slivers",     ratioValue: 5,   defaultUnit: "parts", substitutions: ["flat-leaf parsley"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Marinate lamb",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_04", "ing_05"],
      outputState: "marinated_lamb",
      instructions: "In a large bowl, toss the lamb chunks with the grated onion, ras el hanout, ground ginger, and bloomed saffron water. Mix thoroughly to coat every surface. The onion will begin to break down from the salt in the spices and coat the lamb in a fragrant, slightly wet paste. Cover and marinate for at least 30 minutes at room temperature, or up to 24 hours refrigerated. The longer the marinate, the deeper the spice penetration into the meat.",
      visualCue: {
        primaryTarget: "Lamb pieces evenly coated in a deep golden-orange paste. The saffron has stained the onion and spices a uniform warm yellow.",
        spectrum: [
          { state: "Underdone", description: "Spice blend is sitting on the surface of the meat in dry clumps. The onion liquid has not yet dissolved and distributed the spices.", action: "Toss more vigorously and let sit for another 15 minutes. The onion must break down slightly to act as a vehicle for the spices." },
          { state: "Perfect",   description: "Every piece is coated in a uniform, clinging golden-orange paste. The saffron color is evenly distributed, no dry spice clumps visible.", action: "Proceed to browning." },
          { state: "Overdone",  description: "Lamb has marinated too long without refrigeration — the onion has begun to ferment slightly, giving a sour or off smell.", action: "Discard and start again. Unrefrigerated marination beyond 2 hours in warm conditions is a food-safety risk." },
        ],
      },
      feelCue: "The marinated lamb should feel sticky and tacky to the touch — the spice-onion coating clings to your fingers when you pick up a piece, a sign it will adhere through the sear.",
    },
    {
      nodeId: "step_2",
      action: "Sear",
      inputs: ["marinated_lamb", "ing_08"],
      outputState: "seared_lamb",
      instructions: "Heat olive oil in a tagine base or heavy Dutch oven over medium-high heat until shimmering. Remove the marinated lamb from the bowl, scraping off excess onion paste (set it aside — it goes in next). Sear the lamb in batches, without crowding, for 3–4 minutes per side until deeply browned. The spice coating will caramelize and form an aromatic mahogany crust. Do not rush this step — proper browning provides the structural complexity the long braise builds upon.",
      visualCue: {
        primaryTarget: "Deep mahogany-brown crust on all seared faces, with the spice coating caramelized to near-black patches and a rich, aromatic fond developing on the pan bottom.",
        spectrum: [
          { state: "Underdone", description: "Meat is grey and releasing liquid into the pan rather than browning. The spice coating looks dull and steamed rather than caramelized.", action: "Increase heat and reduce the amount of meat in the pan. Crowded meat steams — it needs dry space around each piece to brown." },
          { state: "Perfect",   description: "Deeply browned on the seared faces, with a mahogany crust. The pan bottom has a rich dark fond. The kitchen smells of spices toasting in fat.", action: "Remove to a plate and add the reserved onion paste to the pan." },
          { state: "Overdone",  description: "Crust is black and acrid-smelling. The fond on the pan bottom is dark and starting to smoke.", action: "Remove the lamb. Deglaze the pan with a splash of stock and reduce before adding the onion paste — the fond is valuable but burnt bits should be scraped up carefully." },
        ],
      },
      feelCue: "A properly seared lamb chunk should resist when you try to move it in the first minute — it is building its crust. When it releases cleanly on its own, it is ready to flip.",
    },
    {
      nodeId: "step_3",
      action: "Braise",
      inputs: ["seared_lamb", "ing_06", "ing_07", "ing_09"],
      outputState: "braised_tagine",
      instructions: "Add the reserved onion paste to the pan and cook over medium heat for 5 minutes until softened. Return the seared lamb and any resting juices. Add the apricots, preserved lemon rind, and stock — the liquid should reach halfway up the lamb pieces, not submerge them. Bring to a simmer, then cover tightly (use foil under the lid for a better seal) and reduce heat to the lowest possible simmer. Cook for 1 hour 45 minutes to 2 hours, checking every 30 minutes and turning the meat once, until the lamb is falling off the bone and the sauce has reduced to a richly flavored, slightly syrupy consistency.",
      visualCue: {
        primaryTarget: "Lamb that falls away when pressed with a spoon, surrounded by a deeply colored, glossy sauce with visible apricots swollen to translucency and lemon rind softened to silk.",
        spectrum: [
          { state: "Underdone", description: "Lamb resists when pressed — you can feel the muscle fibers still intact. Sauce is thin and watery. Apricots look dry and uncollapsed.", action: "Continue braising. Connective tissue in lamb shoulder needs time to convert to gelatin — there is no shortcut." },
          { state: "Perfect",   description: "Lamb collapses when pressed with two fingers. The sauce is thick and glossy, coating a spoon. Apricots are plump and slightly caramelized at the edges. Preserved lemon has almost dissolved.", action: "Remove lid, increase heat to medium, and reduce sauce by one-third if it still looks thin." },
          { state: "Overdone",  description: "Lamb has completely disintegrated — it is now stringy shreds in the sauce rather than identifiable pieces. The sauce is very sweet and thick.", action: "Proceed — the tagine will be saucy rather than structural, which is rustic but still delicious. Serve over couscous." },
        ],
      },
      feelCue: "Press a piece of lamb with your fingertip through the pot lid gap — if it gives immediately like butter, the braise is done. If it pushes back even slightly, give it another 20 minutes.",
    },
    {
      nodeId: "step_4",
      action: "Finish and garnish",
      inputs: ["braised_tagine", "ing_10"],
      outputState: "finished_tagine",
      instructions: "Taste the sauce and adjust — it should be complex, sweet-sour-savory, with the preserved lemon providing background brightness. If too sweet, add a squeeze of fresh lemon. If too thin, simmer uncovered on medium for 5–10 minutes with the lid off. Scatter fresh cilantro and toasted almond slivers over the surface just before serving. Serve in the tagine or Dutch oven directly at the table with couscous, flatbread, and harissa on the side.",
      visualCue: {
        primaryTarget: "A rich, deep amber-gold sauce studded with plump apricots and softened preserved lemon, lamb submerged and yielding, crowned with bright green cilantro and pale toasted almonds.",
        spectrum: [
          { state: "Underdone", description: "Sauce is still thin and pale — the flavor is flat and the lamb looks pale where it sits in liquid.", action: "Simmer uncovered for another 10 minutes to concentrate the sauce and deepen the color." },
          { state: "Perfect",   description: "Glossy, deeply flavored sauce. Lamb pieces are intact but collapsing. The sweet-sour-savory balance is immediately apparent. Garnish added just before service.", action: "Bring the whole vessel to the table and serve family style." },
          { state: "Overdone",  description: "Sauce has reduced to a thick, very sweet paste. The apricots are dissolving into it and the preserved lemon is invisible.", action: "Add a splash of warm stock to loosen and brighten with extra fresh lemon juice." },
        ],
      },
      feelCue: "The finished sauce should coat a spoon with a glossy, slightly syrupy film — run your finger across the spoon back and the line holds for 3 seconds before the sauce moves to fill it.",
    },
  ],
};
