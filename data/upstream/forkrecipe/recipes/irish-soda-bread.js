export default {
  repoId: "master_irish_irish_soda_bread_001",
  parentRepoId: null,
  slug: "irish-soda-bread",
  author: "ForkRecipe Kitchen",

  title: "Irish Soda Bread",
  description: "Forty minutes from flour to table — no yeast, no kneading, no waiting — just the fizzing reaction of baking soda against buttermilk lifting the dough into a rustic, crumb-strewn loaf with a thick crust and a tender, slightly sour interior that pulls apart in satisfying chunks.",
  cuisine: "Irish",
  culture: "Irish",
  category: "breads",

  tags: ["irish", "bread", "buttermilk", "quick-bread", "baking-soda"],
  difficulty: 1,
  activeTime: "15 min",
  totalTime: "1 hr",
  ratioSystem: "bakers_percentage",

  stars: 1090,
  forks: 130,
  contributors: 16,
  license: "CC-BY-SA",
  createdAt: "2025-01-17",
  updatedAt: "2025-03-09",

  flavorRadar: { sweet: 1, salty: 2, sour: 2, bitter: 0, umami: 0, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure", name: "Whole wheat flour (or half white, half wholemeal)", ratioValue: 100, defaultUnit: "%", substitutions: ["all-purpose flour (softer crumb)"] },
    { ingId: "ing_02", role: "Hydration", name: "Buttermilk, cold",                                  ratioValue: 75,  defaultUnit: "%", substitutions: ["whole milk + 1 tbsp lemon juice, rested 5 min"] },
    { ingId: "ing_03", role: "Leavener",  name: "Baking soda (bicarbonate of soda)",                 ratioValue: 2,   defaultUnit: "%", substitutions: [] },
    { ingId: "ing_04", role: "Seasoning", name: "Fine sea salt",                                     ratioValue: 2,   defaultUnit: "%", substitutions: [] },
    { ingId: "ing_05", role: "Fat",       name: "Cold unsalted butter, cubed (optional, for richness)", ratioValue: 5, defaultUnit: "%", substitutions: ["lard", "omit for vegan version"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Mix",
      inputs: ["ing_01", "ing_03", "ing_04", "ing_05"],
      outputState: "dry_mix",
      instructions: "Preheat the oven to 220°C (425°F). In a large bowl, whisk together the flour, baking soda, and salt until evenly combined. If using butter, rub it into the flour using your fingertips until the mixture resembles coarse breadcrumbs. Work quickly — you do not want the butter to melt from the heat of your hands. The dry mix should be aerated and loose.",
      visualCue: {
        primaryTarget: "A pale, aerated mixture with no clumps of flour or butter visible. If using butter, no pieces larger than a pea remain.",
        spectrum: [
          { state: "Underdone", description: "Large chunks of butter are still visible. Baking soda is not fully distributed — visible white streaks.", action: "Continue rubbing the butter in and whisk the dry ingredients more thoroughly. Undistributed baking soda creates bitter, alkaline pockets in the baked loaf." },
          { state: "Perfect",   description: "Flour looks sandy and aerated. Butter (if used) is rubbed in to fine crumbs with no visible chunks. The mixture feels light and flows freely through your fingers.", action: "Add the buttermilk immediately — speed matters now. Baking soda activates the moment it contacts acid." },
          { state: "Overdone",  description: "The mixture has been worked so long that the butter has melted into the flour from your hand's warmth, forming a paste.", action: "Chill the bowl for 5 minutes. The fat in the crumb will not create the same flaky structure but the bread will still rise." },
        ],
      },
      feelCue: "Plunge your fingers into the dry mix — it should feel cool, light, and slightly gritty from the flour particles, like beach sand. If it feels dense and heavy, it needs more aerating.",
    },
    {
      nodeId: "step_2",
      action: "Fold",
      inputs: ["dry_mix", "ing_02"],
      outputState: "soda_bread_dough",
      instructions: "Make a well in the center of the dry mix. Pour in all the cold buttermilk at once. Using a large fork or your hand held flat like a paddle, stir in large circular motions from the inside out — 15 to 20 strokes maximum. Stop as soon as the dough just comes together. It will be shaggy, rough, and slightly sticky — this is correct. Over-mixing develops gluten and toughens the crumb fatally. The reaction between the soda and buttermilk has already begun.",
      visualCue: {
        primaryTarget: "A rough, shaggy dough that holds together in one mass but looks ragged at the edges. Dry flour streaks may still be visible on the edges — this is acceptable.",
        spectrum: [
          { state: "Underdone", description: "Dough is still crumbly and will not hold together when picked up. Dry flour pockets remain throughout.", action: "Fold 3–4 more times until it just coheres. A splash more buttermilk may be needed if the flour is particularly absorbent." },
          { state: "Perfect",   description: "Dough holds together as one rough, lumpy mass. It looks messy but can be lifted from the bowl without falling apart. Bubbles may already be visible from the baking soda reaction. The surface is slightly tacky.", action: "Turn onto a floured surface and shape immediately — the leavening is already working." },
          { state: "Overdone",  description: "Dough is smooth, elastic, and pulls cleanly away from the bowl. It has been over-mixed and developed gluten. The baking soda has had time to activate and may partially exhaust before baking.", action: "Shape and bake immediately. The bread will be chewier and denser than ideal but will still rise." },
        ],
      },
      feelCue: "The dough should feel slightly tacky when you press it with a floured finger — it clings very gently but releases without tearing. If it pulls like elastic, gluten has developed too much. If it crumbles, it needs a little more liquid.",
    },
    {
      nodeId: "step_3",
      action: "Shape",
      inputs: ["soda_bread_dough"],
      outputState: "shaped_loaf",
      instructions: "Turn the dough onto a lightly floured surface and shape quickly and gently into a round about 20cm in diameter and 5cm thick — use the minimum number of touches needed. Place on a parchment-lined baking tray. Using a sharp knife or blade, cut a deep cross into the top, nearly all the way through — this allows heat to penetrate the dense interior and is said traditionally to let the fairies out. Dust lightly with flour.",
      visualCue: {
        primaryTarget: "A rough, dome-shaped round with a deep, clean cross cut across the top. The surface is dusted with flour and slightly cracked from the cross.",
        spectrum: [
          { state: "Underdone", description: "The cross is too shallow — less than 1cm deep. Heat cannot penetrate the center and the interior will remain underbaked.", action: "Re-cut the cross more deeply. The knife should go through about 80% of the loaf depth." },
          { state: "Perfect",   description: "Cross is cut nearly to the base of the loaf. The four quadrants open slightly from the cut, like a flower about to bloom. The loaf is approximately round and evenly domed.", action: "Bake immediately on the center shelf." },
          { state: "Overdone",  description: "The loaf has been handled too much during shaping and is now smooth and flat — the dough has over-developed and spread. The baking soda has exhausted further.", action: "Bake immediately. Prioritize oven time — speed matters more than perfect shape at this stage." },
        ],
      },
      feelCue: "Pick up the shaped loaf gently — it should feel airy and springy, not dense or heavy. Press the center lightly with a floured finger; it should indent and spring back slowly, a sign the leavening is actively working.",
    },
    {
      nodeId: "step_4",
      action: "Bake",
      inputs: ["shaped_loaf"],
      outputState: "finished_soda_bread",
      instructions: "Bake at 220°C (425°F) for 20 minutes. Without opening the oven, reduce the temperature to 200°C (390°F) and bake for a further 20–25 minutes. To test doneness, lift the loaf and tap the base firmly with your knuckle — a fully baked soda bread sounds hollow, like an empty wooden box. If it sounds dense and dull, return to the oven for 5 more minutes base-side up. Cool on a wire rack for at least 20 minutes before cutting.",
      visualCue: {
        primaryTarget: "Deep golden-brown crust all over with the cross spread open. The four quadrants have bloomed out and risen separately. No pale patches remain.",
        spectrum: [
          { state: "Underdone", description: "Crust is pale gold and the cross has not fully opened. A tap on the base sounds dull and dense, not hollow.", action: "Return to the oven at 200°C for 10 more minutes, placing the loaf directly on the oven rack for a crisper base." },
          { state: "Perfect",   description: "Even dark golden-brown crust, open cross with each quarter slightly curled outward. The base tap produces a clear, hollow sound — like tapping an overturned ceramic bowl. The aroma is toasted grain and buttermilk tang.", action: "Cool on a wire rack. Cutting too early creates a gummy interior — the steam is still finishing the crumb." },
          { state: "Overdone",  description: "Crust is very dark brown or cracking. The cross quarters have split all the way and the bread has an almost hard exterior. The base smells slightly of char.", action: "The interior is likely still good. Slice off the very darkest crust to reveal the tender crumb beneath. Serve with plenty of butter to compensate." },
        ],
      },
      feelCue: "The tap test is the most reliable: hold the loaf on your palm and knock the center of the base firmly with your knuckle — a baked-through soda bread resonates with a clear, ringing hollow knock. An underbaked loaf thuds flatly like tapping a block of wood.",
    },
  ],
};
