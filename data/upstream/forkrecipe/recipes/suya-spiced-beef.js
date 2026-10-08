// Suya-Spiced Beef Skewers — Northern Nigerian street food, sold by the suya spot.
// Author: SpiceTrader

export default {
  repoId: "master_nigerian_suya_spiced_beef_001",
  parentRepoId: null,
  slug: "suya-spiced-beef",
  author: "ForkRecipe Kitchen",

  title: "Suya-Spiced Beef Skewers",
  description: "Thin-sliced beef threaded onto skewers and buried in a dry rub of ground roasted peanuts, ginger, paprika, and hot pepper — cooked over hot coals until the edges char and the suya spice crust caramelizes into something smoky, nutty, and ferociously aromatic.",
  cuisine: "Nigerian",
  culture: "Northern Nigerian",
  category: "proteins",

  tags: ["nigerian", "beef", "skewers", "peanut", "spiced"],
  difficulty: 2,
  activeTime: "20 min",
  totalTime: "1 hr 20 min",
  ratioSystem: "parts",

  stars: 2480,
  forks: 290,
  contributors: 35,
  license: "CC-BY-SA",
  createdAt: "2024-07-19",
  updatedAt: "2025-10-05",

  flavorRadar: { sweet: 1, salty: 3, sour: 0, bitter: 1, umami: 3, heat: 4 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Sirloin or ribeye beef, sliced thin (5 mm) against the grain", ratioValue: 10, defaultUnit: "parts", substitutions: ["chicken breast or thigh, butterflied thin"] },
    { ingId: "ing_02", role: "Structure", name: "Ground roasted peanuts (yaji base)",                           ratioValue: 3,  defaultUnit: "parts", substitutions: ["peanut flour"] },
    { ingId: "ing_03", role: "Spice",     name: "Suya spice mix (paprika, cayenne, ginger, garlic, onion powder)", ratioValue: 2, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Seasoning", name: "Salt and seasoning cube (ground)",                             ratioValue: 0.5, defaultUnit: "parts", substitutions: ["salt only"] },
    { ingId: "ing_05", role: "Fat",       name: "Groundnut oil or vegetable oil",                               ratioValue: 1,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Garnish",   name: "Sliced raw onion, tomato, and suya spice for serving",         ratioValue: 2,  defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Mix suya rub",
      inputs: ["ing_02", "ing_03", "ing_04", "ing_05"],
      outputState: "suya_spice_paste",
      instructions: "Combine the ground roasted peanuts, suya spice mix, salt, ground seasoning cube, and oil in a bowl. Mix thoroughly to form a crumbly, slightly oily paste. The peanut flour absorbs the oil and spices into a coating that will cling to the meat rather than slide off. Taste it — it should be intensely seasoned, very peppery, and nutty. If it feels dry and doesn't hold together when pressed, add a few more drops of oil.",
      visualCue: {
        primaryTarget: "A crumbly, reddish-brown paste that clumps when pressed but falls apart easily — like a dry crumble topping. No dry dusty spots, no pools of oil.",
        spectrum: [
          { state: "Underdone", description: "Mixture is still dry and powdery — the spices and peanuts are not yet cohesive. It will fall off the meat during cooking.", action: "Add oil one teaspoon at a time, mixing after each addition, until the mixture just holds a clump when pressed." },
          { state: "Perfect",   description: "Crumbly and oily in even measure. Presses into a ball briefly then crumbles. Deep reddish-orange color from paprika. Smells of roasted peanuts and warm spice.", action: "Proceed to coating the beef." },
          { state: "Overdone",  description: "Paste is wet and greasy, sitting in pools of oil. Will drip off the skewers onto coals and flare up during grilling.", action: "Add more ground peanuts to absorb the excess oil, mixing until the crumbly texture returns." },
        ],
      },
      feelCue: "Pick up a small handful and squeeze — it should form a loose, crumbly disc that smells intensely of roasted peanuts and spice, staining your palm a warm orange-red.",
    },
    {
      nodeId: "step_2",
      action: "Marinate",
      inputs: ["ing_01", "suya_spice_paste"],
      outputState: "marinated_beef_skewers",
      instructions: "Thread the thin beef slices onto flat metal skewers or pre-soaked wooden skewers, weaving the meat back and forth in a zigzag so it lies flat rather than bunching. Press the suya spice paste firmly onto both sides of the meat — use your hands to work it into the surface, pressing hard so the coating adheres. The paste should fully obscure the beef beneath. Rest uncovered at room temperature for 1 hour, or refrigerate overnight (overnight marinades develop more depth).",
      visualCue: {
        primaryTarget: "Beef is entirely coated in a thick, dark reddish-brown crust of suya spice. No bare spots of meat visible. Skewers lie flat with meat woven evenly along their length.",
        spectrum: [
          { state: "Underdone", description: "Spice coating is thin and patchy, with bare pink meat visible in gaps. The coating will cook off quickly, leaving the meat under-seasoned.", action: "Add more suya paste and press firmly. Use the palm of your hand to really push the coating into the meat surface." },
          { state: "Perfect",   description: "Even, thick, opaque coating on all surfaces. The meat beneath is completely hidden. When held up, the coating doesn't drip or slide.", action: "Rest for 1 hour minimum before grilling." },
          { state: "Overdone",  description: "Coating is so thick it is lumping and falling off in clumps rather than adhering. The meat is buried under an inch of paste.", action: "Gently shake off the excess and press the remaining coat more firmly to the meat surface." },
        ],
      },
      feelCue: "Press a coated skewer between your palms — the spice crust should feel dry to the touch and adhere firmly, not smear off. When you pull your hands apart, only a faint orange stain should remain.",
    },
    {
      nodeId: "step_3",
      action: "Grill over high heat",
      inputs: ["marinated_beef_skewers"],
      outputState: "grilled_suya",
      instructions: "Grill over hot charcoal or a very hot gas grill (high heat is essential — suya requires intense, direct heat to char the crust while keeping the thin beef moist). Place skewers 8–10 cm from the coals. Cook for 3–4 minutes per side, turning once. The peanut crust should develop dark char spots and a deep, smoky caramelization. Avoid moving the skewers constantly — let the crust set on each side before flipping. If using a grill pan indoors, heat it to maximum temperature and cook in batches.",
      visualCue: {
        primaryTarget: "The suya crust is deeply caramelized with irregular char spots. The edges of the thin beef slices are slightly curled and crisped. The skewer holds a rigid, caramelized profile.",
        spectrum: [
          { state: "Underdone", description: "Crust is still soft and pale — the peanut coating hasn't caramelized and the spices look raw. Meat is floppy and yielding when prodded.", action: "Leave on heat longer. Suya benefits from slightly longer cooking than feels intuitive — the peanut crust needs sustained heat to caramelize." },
          { state: "Perfect",   description: "Deeply charred crust with smoky, nutty aroma. Irregular dark spots on the surface, golden-brown between them. Beef slices are cooked through and slightly crisped at the thinnest edges.", action: "Remove from heat and serve immediately with raw onion and tomato." },
          { state: "Overdone",  description: "Crust is uniformly black with a bitter, acrid smell. Meat has completely dried out and the peanut coating tastes burnt.", action: "Scrape off the worst of the char on one side. The interior may still be good. Serve with sliced tomato and onion to balance with freshness." },
        ],
      },
      feelCue: "Tap the crust of a cooked skewer with your fingernail — you should hear a faint hollow tap, indicating the outer crust has set hard and caramelized. The meat beneath should still give slightly, not be rigid.",
    },
    {
      nodeId: "step_4",
      action: "Garnish and serve",
      inputs: ["grilled_suya", "ing_06"],
      outputState: "finished_suya",
      instructions: "Remove skewers from heat and slide meat onto a serving surface lined with newspaper (traditional). Scatter sliced raw white onion and fresh tomato over the top — their sharpness and acidity cut through the rich peanut coating. Dust with additional suya spice if desired. Serve immediately while the crust is still crackling — suya loses its textural magic within 10 minutes of coming off the fire.",
      visualCue: {
        primaryTarget: "Dark, crackling beef pieces interspersed with fresh white onion rings and red tomato slices. The crust should be visibly charred in irregular spots with golden-brown sections between.",
        spectrum: [
          { state: "Underdone", description: "Served before the crust has fully set — the coating is soft and greasy rather than crackling. Onion and tomato are nowhere in sight.", action: "Return to the grill for 60–90 more seconds, then serve immediately with the fresh garnish — the contrast is non-optional." },
          { state: "Perfect",   description: "Crackling, smoky crust on beef with fresh, sharp onion rings and cool tomato alongside. The contrast between hot, charred meat and cold, sharp raw allium is the full suya experience.", action: "Eat immediately. Suya is a street food meant to be eaten hot, standing up." },
          { state: "Overdone",  description: "Served cold or allowed to sit — the crust has softened, the fat has congealed, and the peanut coating is gummy.", action: "Flash under a broiler or back on a hot grill pan for 1 minute to restore the crust. Suya always wants more heat." },
        ],
      },
      feelCue: "The aroma should stop you in your tracks — roasted peanut, char, warm ginger, and hot pepper in one concentrated blast. That is the smell of a suya spot, and it means you got it right.",
    },
  ],
};
