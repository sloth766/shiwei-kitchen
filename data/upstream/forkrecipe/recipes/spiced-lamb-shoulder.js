export default {
  repoId: "master_moroccan_spiced_lamb_shoulder_001",
  parentRepoId: null,
  slug: "spiced-lamb-shoulder",
  author: "ForkRecipe Kitchen",

  title: "Moroccan Slow-Roasted Lamb Shoulder",
  description: "A bone-in lamb shoulder rubbed with a thick paste of ras el hanout, preserved lemon, and garlic, then slow-roasted until the meat yields to the lightest touch and falls from the bone in tender, perfumed shreds.",
  cuisine: "Moroccan",
  culture: "Moroccan",
  category: "proteins",

  tags: ["moroccan", "lamb", "slow-roasted", "ras-el-hanout", "north-african", "spiced"],
  difficulty: 3,
  activeTime: "30 min",
  totalTime: "5 hours",
  ratioSystem: "weight",

  stars: 0, forks: 0, contributors: 1, license: "CC-BY-SA",
  createdAt: "2026-06-27", updatedAt: "2026-06-27",

  flavorRadar: { sweet: 2, salty: 3, sour: 2, bitter: 1, umami: 4, heat: 2 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Bone-in lamb shoulder (2–2.5 kg)", ratioValue: 2200, defaultUnit: "g", substitutions: ["bone-in leg of lamb"] },
    { ingId: "ing_02", role: "Spice",     name: "Ras el hanout",                    ratioValue: 25,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_03", role: "Allium",    name: "Garlic cloves",                    ratioValue: 30,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_04", role: "Acid",      name: "Preserved lemon, rind only",       ratioValue: 30,   defaultUnit: "g", substitutions: ["2 tsp lemon zest + 1 tsp salt"] },
    { ingId: "ing_05", role: "Fat",       name: "Extra-virgin olive oil",           ratioValue: 60,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_06", role: "Seasoning", name: "Fine sea salt",                    ratioValue: 15,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_07", role: "Aromatic",  name: "Fresh cilantro, roughly chopped",  ratioValue: 20,   defaultUnit: "g", substitutions: ["flat-leaf parsley"] },
    { ingId: "ing_08", role: "Herb",      name: "Fresh rosemary sprigs",            ratioValue: 10,   defaultUnit: "g", substitutions: ["thyme"] },
    { ingId: "ing_09", role: "Liquid",    name: "Chicken or lamb stock",            ratioValue: 300,  defaultUnit: "g", substitutions: ["water with a squeeze of lemon"] },
    { ingId: "ing_10", role: "Aromatic",  name: "Saffron threads, steeped in 2 tbsp warm water", ratioValue: 0.5, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_11", role: "Sweetener", name: "Honey",                            ratioValue: 20,   defaultUnit: "g", substitutions: ["date syrup"] },
    { ingId: "ing_12", role: "Garnish",   name: "Fresh cilantro and flat-leaf parsley, mixed", ratioValue: 20, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_13", role: "Garnish",   name: "Toasted almonds or pine nuts",     ratioValue: 30,   defaultUnit: "g", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Mix",
      inputs: ["ing_02", "ing_03", "ing_04", "ing_05", "ing_06", "ing_07", "ing_10", "ing_11"],
      outputState: "spice_paste",
      instructions: "Pound or blend the garlic to a paste with a pinch of salt. Finely mince the preserved lemon rind. Combine with ras el hanout, olive oil, cilantro, saffron water, honey, and salt to form a thick, aromatic paste. Taste — it should be salty, floral, pungently garlicky, and bright with citrus.",
      visualCue: {
        primaryTarget: "A thick, rust-orange paste with visible herb flecks and saffron threads. Should coat the back of a spoon without dripping.",
        spectrum: [
          { state: "Underdone", description: "Paste is too thin and oily. Won't adhere to the lamb surface.", action: "Add more ras el hanout or pound the garlic more thoroughly to thicken." },
          { state: "Perfect",   description: "Thick enough to hold its shape on a spoon. Deeply aromatic with saffron, cumin, cinnamon, and preserved lemon all distinct.", action: "Apply to lamb immediately." },
          { state: "Overdone",  description: "N/A — this is a raw paste.", action: "Proceed." },
        ],
      },
      feelCue: "Taste a fingertip of paste — the saffron should register as floral and faintly metallic, the preserved lemon as bright and saline, the ras el hanout as warm and complex.",
    },
    {
      nodeId: "step_2",
      action: "Marinate",
      inputs: ["ing_01", "spice_paste", "ing_08"],
      outputState: "marinated_shoulder",
      instructions: "Using a small sharp knife, make 12–16 deep incisions all over the shoulder, 3–4 cm deep. Push a sliver of garlic and a pinch of spice paste into each. Rub the remaining paste all over the exterior, working it into every crevice and around the bone. Tuck rosemary sprigs under the shoulder. Marinate covered in the refrigerator for at least 4 hours, ideally overnight.",
      visualCue: {
        primaryTarget: "The shoulder is completely covered in a thick, fragrant orange-brown paste with no bare patches of meat visible. The incisions are stuffed with paste and garlic.",
        spectrum: [
          { state: "Underdone", description: "Paste is only on the surface, no incisions made. The flavors won't penetrate deep into the thick shoulder.", action: "Cut the incisions — they are essential for a shoulder this large." },
          { state: "Perfect",   description: "All incisions stuffed, entire surface thickly coated. After overnight marination, the paste has darkened and adhered firmly.", action: "Bring to room temperature 1 hour before roasting." },
          { state: "Overdone",  description: "Over-marinated beyond 24 hours.", action: "Still excellent. Proceed." },
        ],
      },
      feelCue: "After overnight marination, the paste should feel almost dry on the surface — it has bonded to the lamb and will form a crust in the oven.",
    },
    {
      nodeId: "step_3",
      action: "Roast",
      inputs: ["marinated_shoulder", "ing_09"],
      outputState: "slow_roasted_shoulder",
      instructions: "Place the shoulder in a large roasting dish. Pour the stock around the base. Cover tightly with two layers of foil, sealing the edges completely. Roast at 160 C (320 F) for 3.5 to 4 hours. The shoulder is done when the meat pulls effortlessly from the bone when probed with a fork.",
      visualCue: {
        primaryTarget: "After 3.5 hours, lifting the foil reveals a shoulder that has visibly collapsed on itself. The bone is exposed at the end and the meat has pulled back significantly.",
        spectrum: [
          { state: "Underdone", description: "Meat still clings to the bone and resists when a fork is inserted and twisted. The shoulder retains its original shape.", action: "Re-cover and continue at 160 C. Check every 30 minutes." },
          { state: "Perfect",   description: "Meat slides from the bone without effort. The shoulder has collapsed and is almost falling off the bone on its own. The fat is completely rendered.", action: "Remove foil and raise temperature for the crust." },
          { state: "Overdone",  description: "Meat has completely fallen off the bone and is shredding into the juices.", action: "Remove from oven immediately. Still delicious — serve as pulled lamb." },
        ],
      },
      feelCue: "Push a fork into the thickest part of the shoulder and twist — at perfect doneness, the meat parts with no resistance and the fork comes out without effort.",
    },
    {
      nodeId: "step_4",
      action: "Bake",
      inputs: ["slow_roasted_shoulder"],
      outputState: "crusted_shoulder",
      instructions: "Remove the foil. Raise oven to 200 C (400 F). Roast uncovered for 20–25 minutes, basting with the pan juices every 8 minutes, until the surface develops a deeply burnished, aromatic crust. The juices in the pan should have reduced to a rich jus.",
      visualCue: {
        primaryTarget: "The shoulder surface is deeply bronzed and crusted, the spice paste visibly caramelized into a dark, glossy coating. The pan jus is amber and syrupy.",
        spectrum: [
          { state: "Underdone", description: "Surface looks pale and wet. No crust formation.", action: "Continue uncovered and baste more frequently." },
          { state: "Perfect",   description: "Dark, fragrant, crispy-edged crust over a shoulder that glistens with pan juices. The ras el hanout smells toasted and complex, not raw.", action: "Rest 15 minutes before serving." },
          { state: "Overdone",  description: "Crust has blackened and is crumbling off. Bitter smell.", action: "Remove immediately. Scrape darkest bits and serve with the good crust portions." },
        ],
      },
      feelCue: "The crust surface should feel firm and slightly dry under a spoon — press and it should resist, not give way. The meat below will be completely soft.",
    },
    {
      nodeId: "step_5",
      action: "Garnish",
      inputs: ["crusted_shoulder", "ing_12", "ing_13"],
      outputState: "finished_lamb_shoulder",
      instructions: "Rest the shoulder for 15 minutes before serving. Scatter fresh herbs and toasted nuts directly over the shoulder. Serve at the table in the roasting dish, using two large forks to pull the meat apart. Spoon the pan jus over each portion.",
      visualCue: {
        primaryTarget: "A dramatically crusted shoulder on a platter, bright herb green and ivory nut contrast against the dark mahogany crust. Pan jus pooling at the base.",
        spectrum: [
          { state: "Underdone", description: "Herbs placed before resting — they've wilted in the steam.", action: "Always add fresh garnish at the very last moment." },
          { state: "Perfect",   description: "Fresh, vibrant herbs on a rested, slightly cooled shoulder. Meat pulls apart in long, moist shreds with a tug of the fork.", action: "Serve with couscous or flatbread." },
          { state: "Overdone",  description: "Over-rested and too cool. Fat has solidified.", action: "A quick 5 minutes back in a hot oven will warm without drying." },
        ],
      },
      feelCue: "The meat should pull apart in long, moist shreds with almost no effort from two forks — if you need to cut it, the shoulder needed more time in the oven.",
    },
  ],
};
