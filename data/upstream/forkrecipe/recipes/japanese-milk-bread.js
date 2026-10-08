export default {
  repoId: "master_japanese_japanese_milk_bread_001",
  parentRepoId: null,
  slug: "japanese-milk-bread",
  author: "ForkRecipe Kitchen",

  title: "Japanese Milk Bread (Shokupan)",
  description: "Hokkaido shokupan — a pillowy, impossibly soft Japanese white bread built on the tangzhong technique, where a small portion of flour is cooked into a gel that locks moisture into the crumb, resulting in a loaf that tears into cloud-white, gossamer sheets and stays fresh for days.",
  cuisine: "Japanese",
  culture: "Hokkaido",
  category: "breads",

  tags: ["shokupan", "japanese", "milk-bread", "tangzhong", "soft", "pullman", "hokkaido"],
  difficulty: 3,
  activeTime: "50 min",
  totalTime: "5 hours",
  ratioSystem: "bakers_percentage",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",

  flavorRadar: { sweet: 3, salty: 2, sour: 0, bitter: 0, umami: 1, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Bread flour (12–13% protein)",            ratioValue: 100, defaultUnit: "%", substitutions: ["all-purpose flour (slightly less chew)"] },
    { ingId: "ing_02", role: "Starch",     name: "Bread flour for tangzhong (set aside)",   ratioValue: 6,   defaultUnit: "%", substitutions: [] },
    { ingId: "ing_03", role: "Hydration",  name: "Warm whole milk (38 C) for main dough",  ratioValue: 40,  defaultUnit: "%", substitutions: ["full-fat oat milk"] },
    { ingId: "ing_04", role: "Liquid",     name: "Whole milk for tangzhong",                ratioValue: 30,  defaultUnit: "%", substitutions: ["water"] },
    { ingId: "ing_05", role: "Fat",        name: "Unsalted butter, softened",               ratioValue: 10,  defaultUnit: "%", substitutions: ["margarine"] },
    { ingId: "ing_06", role: "Sweetener",  name: "Caster sugar",                            ratioValue: 8,   defaultUnit: "%", substitutions: ["honey"] },
    { ingId: "ing_07", role: "Protein",    name: "Large egg",                               ratioValue: 10,  defaultUnit: "%", substitutions: [] },
    { ingId: "ing_08", role: "Seasoning",  name: "Fine sea salt",                           ratioValue: 1.5, defaultUnit: "%", substitutions: [] },
    { ingId: "ing_09", role: "Leavener",   name: "Instant yeast",                           ratioValue: 1.5, defaultUnit: "%", substitutions: ["active dry yeast"] },
    { ingId: "ing_10", role: "Dairy",      name: "Heavy cream (for brushing, optional)",    ratioValue: 3,   defaultUnit: "%", substitutions: ["milk", "egg wash"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Cook tangzhong",
      inputs: ["ing_02", "ing_04"],
      outputState: "tangzhong_paste",
      instructions: "Whisk the tangzhong flour with the cold milk in a small saucepan until completely smooth and lump-free. Place over medium-low heat and cook, stirring constantly with a silicone spatula, for 3–5 minutes until the mixture thickens into a thick, glossy, pudding-like paste and a thermometer reads 65 C (150 F). At this temperature the starch granules fully gelatinize, and in this gelatinized state they can absorb and lock in far more water than raw starch — this is the scientific reason shokupan stays softer longer than any other bread. Remove from the heat, press a sheet of plastic wrap directly onto the surface to prevent a skin forming, and cool to room temperature.",
      visualCue: {
        primaryTarget: "A thick, smooth, ivory-white paste that holds a clear trail when the spatula is drawn across the pan bottom and temperature reads 65 C.",
        spectrum: [
          { state: "Underdone", description: "Still thin and milk-like. No trails form when stirred. Below 60 C.", action: "Continue cooking and stirring — the transformation from liquid to gel happens over a narrow temperature window near 65 C, so be patient." },
          { state: "Perfect",   description: "Thick and glossy, like a pastry cream without eggs. Holds its shape briefly, then settles slowly. Trail left by spatula closes in 2–3 seconds. 65 C.", action: "Press plastic wrap to the surface and cool completely before adding to the dough." },
          { state: "Overdone",  description: "Very stiff, gummy, and pulling away from the pan sides in a rubbery lump.", action: "Whisk in a teaspoon of milk to loosen, then proceed. The paste is still functional." },
        ],
      },
      feelCue: "Cool tangzhong pressed between two fingers feels smooth, thick, and slightly elastic — not gummy like over-cooked pudding, and not liquid. It should hold a fingerprint briefly before slowly filling back in.",
    },
    {
      nodeId: "step_2",
      action: "Mix",
      inputs: ["ing_01", "ing_03", "ing_06", "ing_07", "ing_08", "ing_09", "tangzhong_paste"],
      outputState: "shaggy_enriched_dough",
      instructions: "In a stand mixer bowl, combine the bread flour, sugar, salt, and instant yeast (keep salt and yeast on opposite sides of the bowl before mixing). Add the warm milk, egg, and cooled tangzhong. Using the dough hook, mix on low speed for 2 minutes until combined, then increase to medium for 5 minutes. The dough will be shaggy and sticky at first — resist adding extra flour. It will come together as the gluten develops and the tangzhong integrates. After 5 minutes it should begin to pull away from the bowl sides.",
      visualCue: {
        primaryTarget: "Dough that is clinging to the hook and pulling away from the bowl sides, not yet smooth, still somewhat sticky.",
        spectrum: [
          { state: "Underdone", description: "Dough is splashing around the bowl and not cohering. Flour is not fully incorporated.", action: "Let it mix on low speed for 1–2 more minutes before increasing speed." },
          { state: "Perfect",   description: "Dough clings to the hook and clears the bowl sides (mostly — some sticking at the bottom is fine). Looks rough and slightly shiny.", action: "Begin adding butter in the next step." },
          { state: "Overdone",  description: "Already smooth and pulling fully clean before butter is added.", action: "Proceed to butter addition — no harm done." },
        ],
      },
      feelCue: "At this stage the dough should feel quite sticky to a finger pressed into it — this is correct and expected. Shokupan is a high-hydration enriched dough and the stickiness will resolve completely once the butter is fully incorporated.",
    },
    {
      nodeId: "step_3",
      action: "Knead",
      inputs: ["shaggy_enriched_dough", "ing_05"],
      outputState: "developed_milk_dough",
      instructions: "With the mixer running on medium, add the softened butter in small pieces, about 1 tablespoon at a time, waiting for each addition to be fully absorbed before adding the next. This will take 8–10 minutes of mixing in total after the butter is all in. The dough will go through an ugly phase — looking greasy and broken — before it comes back together into a silky, elastic ball that pulls completely clean from the bowl. Increase to medium-high for the final 2 minutes. The windowpane test should be very easy to pass: a small piece stretches to nearly translucent without tearing.",
      visualCue: {
        primaryTarget: "A silky, smooth, ivory-white ball of dough that pulls completely clean from the bowl and the hook. Surface looks almost shiny.",
        spectrum: [
          { state: "Underdone", description: "Still slightly greasy or breaking apart. Windowpane tears immediately.", action: "Continue kneading — the gluten network is not yet strong enough to hold the fat in suspension. Give it 3 more minutes." },
          { state: "Perfect",   description: "Silky smooth, springs back quickly, clears the bowl completely, and passes the windowpane test easily. Surface almost looks like skin.", action: "Shape into a ball and bulk-ferment." },
          { state: "Overdone",  description: "Extremely tight and stiff, no longer tacky at all. Has a slightly rubbery quality.", action: "Rest 15 minutes covered and proceed. Over-worked enriched dough still bakes beautifully." },
        ],
      },
      feelCue: "Fully developed milk bread dough is the softest bread dough you will ever handle — it should feel like warm, silky putty, smooth and non-sticky, yielding to pressure like a firm marshmallow.",
    },
    {
      nodeId: "step_4",
      action: "Proof",
      inputs: ["developed_milk_dough"],
      outputState: "bulk_risen_dough",
      instructions: "Place the dough in a lightly oiled bowl, cover with plastic wrap, and let it rise at room temperature (24–26 C) for 1 to 1.5 hours, until doubled in size. Because of the tangzhong and high butter content this dough rises more slowly than a lean dough. Punching it down once at the halfway point (45 minutes) helps develop a more even, fine crumb by redistributing the yeast and redistributing gas. After the full rise, chill the dough in the refrigerator for 20 minutes to firm it up, which makes the sticky dough much easier to divide and shape cleanly.",
      visualCue: {
        primaryTarget: "Dough has clearly doubled — dome above the bowl rim. Surface is smooth and pillowy. The bowl shakes with a soft jiggle.",
        spectrum: [
          { state: "Underdone", description: "Less than 50% growth. Dense and firm. Poke fills back immediately.", action: "Return to a warmer spot — enriched doughs need warmth and time to overcome the fat's effect on the yeast." },
          { state: "Perfect",   description: "Doubled. A two-finger poke fills slowly, halfway. Dough is light and airy. Smells of warm milk and bread.", action: "Chill briefly, then divide and shape." },
          { state: "Overdone",  description: "More than doubled, surface showing large bubbles. Smells somewhat alcoholic.", action: "Punch down, shape, and proceed. Over-fermented milk bread is still very good." },
        ],
      },
      feelCue: "Stick your fist gently into the doubled dough — it should deflate slowly like a punctured tire, giving a soft sigh of gas. Over-fermented dough collapses instantly and flatly; under-fermented dough barely dents.",
    },
    {
      nodeId: "step_5",
      action: "Shape and pan",
      inputs: ["bulk_risen_dough"],
      outputState: "panned_milk_bread",
      instructions: "Divide the chilled dough into 4 equal pieces. Flatten each piece into a rectangle, fold the long sides in toward the center, and roll it into a tight cylinder. Place all 4 cylinders side by side in a greased 9x5 Pullman loaf pan (or a standard loaf pan), seam-side down. For a classic shokupan dome, leave the pan uncovered. For a flat-topped Pullman loaf, slide the lid on. Cover and proof at room temperature for 1 to 1.5 hours, until the dough crests 2 cm above the rim (dome) or fills the Pullman pan 90%.",
      visualCue: {
        primaryTarget: "Four evenly sized rolls filling the pan side by side, domed above the rim after proofing. Surface is smooth and slightly shiny from the egg/cream wash.",
        spectrum: [
          { state: "Underdone", description: "Rolls haven't crested the rim yet. Dense and tight.", action: "Wait another 20–30 minutes. Enriched doughs are slow at the final proof stage." },
          { state: "Perfect",   description: "Cresting 2 cm above the rim (or 90% filling the Pullman). Jiggle-jiggly. A poke springs back halfway.", action: "Brush with cream and bake." },
          { state: "Overdone",  description: "Jelly-like, almost trembling, and extremely soft. Poke doesn't spring back.", action: "Bake immediately — wait any longer and the dough will collapse." },
        ],
      },
      feelCue: "Brush the cream or milk onto the proofed surface: it should glide on easily without tearing the delicate skin. The surface should feel almost impossibly soft and light — like touching a baby's cheek.",
    },
    {
      nodeId: "step_6",
      action: "Bake",
      inputs: ["panned_milk_bread", "ing_10"],
      outputState: "finished_japanese_milk_bread",
      instructions: "Brush the proofed loaf with cream or milk for a shiny, deep golden crust. Bake at 180 C (355 F) for 30–35 minutes for a dome loaf, or 35–40 minutes with the Pullman lid on. The loaf is done when the top is a rich, even golden-brown (no pale doughy patches), the internal temperature reads 93–96 C (200–205 F), and the sides pull away from the pan. Remove from the pan immediately and cool completely on a wire rack for at least 1 hour before slicing. The crumb will be dense and gummy if cut hot — it continues to set as it cools.",
      visualCue: {
        primaryTarget: "Even, glossy golden-brown dome. No pale patches. Internal temperature 94 C. When lifted from the pan, sides are golden and the bottom sounds hollow.",
        spectrum: [
          { state: "Underdone", description: "Pale gold with white patches on the dome or sides. Internal temperature below 90 C. The loaf feels soft and heavy when thumped.", action: "Return for 5 more minutes. Tent with foil if top is already dark to finish cooking the interior." },
          { state: "Perfect",   description: "Rich, even, deep-golden dome. 94 C internal. Hollow bottom tap. The kitchen smells of warm milk, butter, and caramelized sugar.", action: "Cool 1 hour before slicing. Patience here is not optional." },
          { state: "Overdone",  description: "Dark brown or cracked dome. Stiff, hard crust.", action: "The interior may still be perfect — shokupan's enriched crust toughens quickly when over-baked, but the crumb usually survives." },
        ],
      },
      feelCue: "A cooled shokupan compressed between two palms should spring back completely and almost silently — the tangzhong crumb is so elastic it absorbs the pressure and releases it. Tear off a slice: the crumb should pull apart in long, silky, cotton-candy-like threads, not crumble.",
    },
  ],
};
