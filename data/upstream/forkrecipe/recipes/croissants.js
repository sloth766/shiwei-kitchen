export default {
  repoId: "master_french_croissants_001",
  parentRepoId: null,
  slug: "croissants",
  author: "ForkRecipe Kitchen",

  title: "Butter Croissants",
  description: "Laminated dough layered with European-style butter through dozens of turns — the result is a crescent of shattering honeycomb layers that hisses when you bite, fragrant with browned butter and lactic acid.",
  cuisine: "French",
  culture: "French Viennoiserie",
  category: "breads",

  tags: ["croissant", "laminated", "viennoiserie", "french", "butter", "flaky"],
  difficulty: 5,
  activeTime: "3 hr",
  totalTime: "18 hr",
  ratioSystem: "parts",

  stars: 2655,
  forks: 398,
  contributors: 97,
  license: "CC-BY-SA",
  createdAt: "2024-07-20",
  updatedAt: "2025-05-30",

  flavorRadar: { sweet: 3, salty: 2, sour: 1, bitter: 0, umami: 1, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure",  name: "Bread flour (12–13% protein)",         ratioValue: 100, defaultUnit: "parts", substitutions: ["T55 French flour"] },
    { ingId: "ing_02", role: "Hydration",  name: "Cold whole milk",                       ratioValue: 55,  defaultUnit: "parts", substitutions: ["water"] },
    { ingId: "ing_03", role: "Sweetener",  name: "Sugar",                                 ratioValue: 10,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_04", role: "Seasoning",  name: "Fine salt",                             ratioValue: 2,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_05", role: "Leavener",   name: "Instant dry yeast",                     ratioValue: 1.5, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_06", role: "Fat",        name: "Unsalted butter (détrempe, soft)",       ratioValue: 5,   defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Fat",        name: "European unsalted butter (beurrage, 84% fat, cold)", ratioValue: 50, defaultUnit: "parts", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Mix",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_04", "ing_05", "ing_06"],
      outputState: "detrempe_dough",
      instructions: "Combine flour, sugar, salt, yeast, cold milk, and soft butter in a stand mixer. Mix on low 3 minutes until combined, then on medium for 4–5 minutes only — stop while the dough is still slightly under-developed (rough surface, barely passing windowpane). Over-kneading the détrempe makes it too elastic to roll easily later. Shape into a rectangle, wrap tightly, and refrigerate overnight or at least 6 hours. Cold détrempe is easier to laminate and helps maintain the butter layers.",
      visualCue: {
        primaryTarget: "A smooth but slightly under-developed dough. Surface should look mostly smooth with very faint roughness. Not fully elastic.",
        spectrum: [
          { state: "Underdone", description: "Rough, shaggy surface. Tears on short stretches. Does not hold together well.", action: "Mix 1–2 more minutes on low." },
          { state: "Perfect",   description: "Mostly smooth surface with a few rough patches. Only slightly elastic — when you pull a piece it stretches a bit then tears. This is intentional.", action: "Shape into a flat rectangle, wrap, and refrigerate minimum 6 hours." },
          { state: "Overdone",  description: "Very smooth, elastic dough that springs back aggressively. Will resist rolling later.", action: "Refrigerate immediately. The cold will slow gluten activity." },
        ],
      },
      feelCue: "The détrempe should feel cool, slightly stiff, and only minimally elastic — it should not fight back like a mature kneaded dough. When cold, it should feel like firm clay that holds an impression.",
    },
    {
      nodeId: "step_2",
      action: "Fold",
      inputs: ["ing_07"],
      outputState: "butter_block",
      instructions: "Remove the butter from the refrigerator 15 minutes before lamination. Beat it between two sheets of parchment with a rolling pin until it forms a 20×20cm square, 5–6mm thick. The butter must be pliable but cold — 16°C (60°F) is ideal. It should bend without cracking and should not be greasy. If it cracks when bent, it is too cold. If it smears and softens immediately when handled, it is too warm. Proper butter plasticity is the most critical variable in lamination.",
      visualCue: {
        primaryTarget: "A neat 20×20cm square of uniform thickness, 5–6mm throughout. No cracks visible. Opaque, matte, and firm.",
        spectrum: [
          { state: "Underdone", description: "Butter is cracking and crumbling when beaten. White flakes visible.", action: "Rest at room temperature 5 more minutes. The butter is too cold." },
          { state: "Perfect",   description: "Pliable, smooth 20×20cm square. When a corner is bent 90°, it bends without cracking or breaking. Cool to the touch.", action: "Proceed to envelope the butter in the dough immediately." },
          { state: "Overdone",  description: "Butter is greasy and smearing. Your hands are warming it. Butter temperature above 20°C.", action: "Refrigerate the butter block for 10 minutes before proceeding." },
        ],
      },
      feelCue: "The butter block should feel like cold wax or thick cold clay — firm but plastic, not brittle. When you press a finger into it it should leave a clean impression without the butter cracking around the edges.",
    },
    {
      nodeId: "step_3",
      action: "Fold",
      inputs: ["detrempe_dough", "butter_block"],
      outputState: "laminated_dough",
      instructions: "Roll the cold détrempe into a 40×20cm rectangle. Place the butter block in the center, fold the dough ends over to completely encase the butter, and pinch the seams closed. Roll out to 60×20cm and perform a letter fold (three-fold). Return to refrigerator for 30 minutes. Repeat this roll-and-fold cycle three more times (4 total), chilling 30 minutes between each turn. After 4 turns of a letter fold you have 3×3×3×3 = 81 layers. Work quickly — if the butter breaks through the dough or you see it smearing, chill immediately.",
      visualCue: {
        primaryTarget: "After the final fold, the edges of the dough should show distinct layer lines when viewed from the cut edge — like looking at laminated plywood.",
        spectrum: [
          { state: "Underdone", description: "Layers not yet distinct. Butter and dough seem merged. Not enough folds completed.", action: "Complete remaining fold cycles with adequate chilling between each." },
          { state: "Perfect",   description: "Distinct layer lines at the cut edge — multiple visible strata of butter and dough. No butter breaks visible on the surface. Dough cold and firm.", action: "Final chill 30 minutes, then cut and shape." },
          { state: "Overdone",  description: "Butter has broken through the dough surface, or layers have merged from warmth. Greasy, smearing surface.", action: "Refrigerate immediately for 1 hour. Some layer integrity may be lost but croissants will still be good." },
        ],
      },
      feelCue: "After lamination, the dough feels distinctly stiffer and more stacked — you can feel the resistance of the layers when you press into it. The surface should be cold, dry, and smooth, with no butter visible through the dough skin.",
    },
    {
      nodeId: "step_4",
      action: "Shape",
      inputs: ["laminated_dough"],
      outputState: "shaped_croissants",
      instructions: "Roll the laminated dough into a 60×25cm rectangle, 4mm thick. Use a ruler and sharp knife to cut long triangles with a 12cm base. Stretch each triangle gently to 25cm long. Starting at the base, roll firmly toward the point without compressing too hard. The roll should be tight but not squeezing the layers flat. Curl the ends slightly toward you to form the crescent. Place on parchment-lined trays, with the point tucked under. Proof at 75°F (24°C) for 2–3 hours until nearly doubled and visibly layered.",
      visualCue: {
        primaryTarget: "Proofed croissants look jiggly, airy, and full. When the tray is shaken gently, they wobble noticeably. Visible layer definition at the cut ends.",
        spectrum: [
          { state: "Underdone", description: "Croissants are dense and don't jiggle. Feel heavy and compact when lifted.", action: "Continue proofing. Croissants need a full 2–3 hours at 24°C. Do not rush with heat." },
          { state: "Perfect",   description: "Full, airy, jiggling croissants with visible layers at the open ends. The crescent shape is maintained. When poked, springs back slowly.", action: "Egg wash gently and bake." },
          { state: "Overdone",  description: "Croissants are very puffy and the layers are beginning to separate or meld. Butter visible pooling on the parchment.", action: "Bake immediately. Reduce oven temperature by 10°C to account for excess butter." },
        ],
      },
      feelCue: "Fully proofed croissants feel impossibly light and tremble when you shake the tray — they should feel like they are barely there, full of air trapped between the layers. Press one very gently: it should yield like a foam pillow.",
    },
    {
      nodeId: "step_5",
      action: "Bake",
      inputs: ["shaped_croissants"],
      outputState: "finished_croissants",
      instructions: "Apply a thin, careful egg wash (egg + milk, well-beaten), brushing with the layers not against them to avoid deflating. Bake at 400°F (200°C) for 18–22 minutes until deep amber-brown. Croissants should puff dramatically in the oven — the butter creates steam that forces the layers apart. If they look pale at 18 minutes, increase to 410°F for a final 3 minutes. A properly baked croissant will leave a visible ring of clarified butter on the parchment.",
      visualCue: {
        primaryTarget: "Deep amber honeycomb exterior. Layers visibly separated and distinct. A pool of clarified butter on the parchment beneath each croissant. The smell of browned butter is unmistakable.",
        spectrum: [
          { state: "Underdone", description: "Pale golden. Layers barely separated. No butter pool. Interior may be wet and doughy between layers.", action: "Continue baking 4–5 more minutes. The interior must dry out." },
          { state: "Perfect",   description: "Deep amber. Distinct, shattered layers like a honeycomb visible at the cut ends. Butter pool on parchment. Sounds hollow when tapped on the bottom.", action: "Cool on a rack for 15 minutes before eating." },
          { state: "Overdone",  description: "Dark brown with some burnt edges. Excessive butter on parchment. Layers are very dark.", action: "Still delicious — the burnt layers add a pleasant bitterness. Just avoid the darkest bits." },
        ],
      },
      feelCue: "Lift a finished croissant and it should feel shockingly light — dramatically lighter than its size suggests. Tap the bottom and it rings hollow. Squeeze it gently: you should feel the resistance of dozens of distinct layers, and then hear a faint, satisfying crackle.",
    },
  ],
};
