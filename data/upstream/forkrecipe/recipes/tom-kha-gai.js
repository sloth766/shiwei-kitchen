export default {
  repoId: "master_thai_tom_kha_gai_001",
  parentRepoId: null,
  slug: "tom-kha-gai",
  author: "ForkRecipe Kitchen",

  title: "Tom Kha Gai",
  description: "A silken, ivory broth of coconut milk infused with the floral heat of galangal and the citrus perfume of lemongrass — rich enough to coat a spoon, yet bright with lime and fish sauce. Torn mushrooms and tender chicken poach gently in the heat, absorbing the broth's layered warmth.",
  cuisine: "Thai",
  culture: "Central Thai",
  category: "stocks",

  tags: ["soup", "thai", "coconut", "galangal", "chicken", "lemongrass", "kaffir-lime"],
  difficulty: 2,
  activeTime: "25 min",
  totalTime: "45 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 2, salty: 3, sour: 3, bitter: 1, umami: 3, heat: 2 },

  ingredients: [
    { ingId: "ing_01", role: "Liquid",    name: "Coconut milk, full-fat, unsweetened",     ratioValue: 400, defaultUnit: "ml",   substitutions: ["coconut cream diluted 1:1 with water"] },
    { ingId: "ing_02", role: "Liquid",    name: "Chicken stock, light (or water)",          ratioValue: 300, defaultUnit: "ml",   substitutions: ["vegetable stock"] },
    { ingId: "ing_03", role: "Protein",   name: "Chicken thigh, boneless, skinless, sliced 5mm", ratioValue: 250, defaultUnit: "g", substitutions: ["chicken breast (drier)", "firm tofu"] },
    { ingId: "ing_04", role: "Aromatic",  name: "Galangal, fresh, sliced 3mm (not ginger)", ratioValue: 30,  defaultUnit: "g",   substitutions: ["frozen galangal (acceptable)"] },
    { ingId: "ing_05", role: "Aromatic",  name: "Lemongrass stalks, bruised and cut into 5cm pieces", ratioValue: 2, defaultUnit: "stalks", substitutions: ["lemongrass paste 1 tbsp (weaker aroma)"] },
    { ingId: "ing_06", role: "Herb",      name: "Kaffir lime leaves (makrut lime), torn",  ratioValue: 6,   defaultUnit: "leaves", substitutions: ["lime zest strips (inferior)"] },
    { ingId: "ing_07", role: "Umami",     name: "Fish sauce (Tiparos or Megachef)",         ratioValue: 30,  defaultUnit: "ml",   substitutions: ["light soy sauce + pinch salt"] },
    { ingId: "ing_08", role: "Acid",      name: "Lime juice, freshly squeezed",             ratioValue: 30,  defaultUnit: "ml",   substitutions: [] },
    { ingId: "ing_09", role: "Protein",   name: "Oyster mushrooms (or straw mushrooms), torn", ratioValue: 100, defaultUnit: "g", substitutions: ["button mushrooms quartered"] },
    { ingId: "ing_10", role: "Spice",     name: "Fresh Thai bird chilies, lightly bruised (do not split)", ratioValue: 3, defaultUnit: "whole", substitutions: ["1/2 tsp chili flakes added at the end"] },
    { ingId: "ing_11", role: "Herb",      name: "Fresh cilantro (coriander), leaves and fine stems", ratioValue: 10, defaultUnit: "g", substitutions: ["Thai basil"] },
    { ingId: "ing_12", role: "Sweetener", name: "Palm sugar (or light brown sugar)",        ratioValue: 10,  defaultUnit: "g",   substitutions: ["coconut sugar"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Infuse",
      inputs: ["ing_01", "ing_02", "ing_04", "ing_05", "ing_06", "ing_10"],
      outputState: "infused_broth",
      instructions: "Pour the coconut milk and chicken stock into a medium saucepan. Add the sliced galangal, bruised lemongrass pieces, torn kaffir lime leaves, and the lightly bruised (but whole) bird chilies. Bring to a gentle simmer over medium heat — never a rolling boil, which will break the coconut milk and make it grainy and oily. Simmer for 10 minutes, pressing the aromatics down occasionally with a spoon. The broth should carry a complex floral fragrance: the soap-citrus of kaffir lime, the hot-gingery punch of galangal, the lemon-grass green of the stalks. Do not remove the aromatics yet — they will steep through the entire cooking process and are removed before serving, not before. The chilies are left whole so they release mild background heat without the piercing intensity of split or chopped chili.",
      visualCue: {
        primaryTarget: "An ivory-white broth with a gentle quiver of movement at the surface — small bubbles drifting up at the edges, not a central boil.",
        spectrum: [
          { state: "Underdone", description: "Broth is still cold and the aromatics have not released their oils. It smells faintly of coconut milk only — no galangal heat, no lemongrass fragrance.", action: "Increase heat slightly and allow 5 more minutes. The galangal fragrance should be detectable before you add the protein." },
          { state: "Perfect",   description: "The broth is a soft, creamy ivory and smells intensely of galangal and kaffir lime. Small fat droplets may be visible on the surface. The bird chilies have swelled slightly.", action: "Add mushrooms and chicken now." },
          { state: "Overdone",  description: "The coconut milk has separated — you can see a slick of yellowish coconut oil on the surface and the broth looks curdled and grainy rather than silky.", action: "Reduce heat to low and whisk gently to re-emulsify. Adding a splash of cold coconut milk can help bring it back, but work quickly — continued heat will make it worse." },
        ],
      },
      feelCue: "Lean over the pot and breathe: the steam should carry a floral, almost soapy lemongrass fragrance that tingles the back of your throat with the galangal's quiet heat — like inhaling through a Thai kitchen window.",
    },
    {
      nodeId: "step_2",
      action: "Simmer",
      inputs: ["infused_broth", "ing_03", "ing_09"],
      outputState: "cooked_soup",
      instructions: "Add the torn oyster mushrooms to the simmering broth and stir gently. After 1 minute, slide in the sliced chicken thigh pieces, spreading them through the broth so they cook evenly. Maintain a gentle simmer — barely trembling at the surface. Cook the chicken for 5 to 7 minutes, stirring once or twice, until the slices are opaque all the way through with no pink remaining. Chicken thigh at this thickness finishes in the time it takes the broth to return to temperature after the cold protein goes in. The mushrooms will soften and absorb the coconut broth. Do not increase the heat to rush this step — aggressive heat toughens the chicken and breaks the coconut base.",
      visualCue: {
        primaryTarget: "Chicken slices are uniformly white-opaque throughout. Mushrooms are silky and slightly translucent, collapsed softly into the broth.",
        spectrum: [
          { state: "Underdone", description: "Chicken has a pink blush at the center when a thick slice is pressed open with a spoon. The flesh has a raw, dense look.", action: "Continue simmering for 2 more minutes. Thigh meat is forgiving — it will not dry out quickly." },
          { state: "Perfect",   description: "Chicken is fully opaque, white to its center. It separates easily when pressed with a spoon. Mushrooms have absorbed broth and look glossy and tender.", action: "Season with fish sauce, lime juice, and palm sugar immediately." },
          { state: "Overdone",  description: "Chicken slices are pulling apart into stringy fibres and the mushrooms have become completely soft and waterlogged.", action: "Season and serve at once — prolonged heat will continue to degrade both protein and mushrooms." },
        ],
      },
      feelCue: "A piece of properly cooked chicken thigh, lifted on a spoon, should yield with gentle pressure — soft and juicy, not firm. The surrounding broth should coat the back of the spoon in a thin, creamy film.",
    },
    {
      nodeId: "step_3",
      action: "Season",
      inputs: ["cooked_soup", "ing_07", "ing_08", "ing_12"],
      outputState: "seasoned_soup",
      instructions: "Add the fish sauce, palm sugar, and lime juice off heat or over the lowest flame. Stir to dissolve the sugar. Taste and adjust — tom kha gai should be simultaneously rich (coconut), sour (lime), salty (fish sauce), with background sweetness (palm sugar) and slow heat (galangal and chili). Start with the listed quantities and adjust in small increments. The lime goes in last and must not boil after adding — boiling destroys its bright top note and turns it bitter. The correct flavor is silky-rich on the palate immediately, then sour and bright mid-palate, then a long trailing warmth from the galangal. If it tastes flat, it needs more lime; if it tastes harsh, it needs more palm sugar.",
      visualCue: {
        primaryTarget: "Broth is a smooth, uniform ivory-cream with a subtle golden tinge from the galangal and chili. No visible curdling or oil slicks.",
        spectrum: [
          { state: "Underdone", description: "The broth tastes of coconut milk and stock but lacks brightness or complexity. The fish sauce and lime have not been added.", action: "Add fish sauce, lime, and palm sugar in the proportions listed, then taste and adjust." },
          { state: "Perfect",   description: "The broth delivers a layered rolling flavor: creamy and rich, then sour and bright, then slowly warming from galangal. It is impossible to taste any single ingredient in isolation.", action: "Ladle into bowls over the aromatics (which remain but are not eaten) and garnish." },
          { state: "Overdone",  description: "The broth tastes harshly sour or aggressively salty — lime or fish sauce was added too heavily.", action: "Balance with a small addition of coconut milk and palm sugar to round the edges." },
        ],
      },
      feelCue: "The finished broth on a tasting spoon should feel silky and coating, like thin cream — not watery, not grainy. The lime's acid should make the edges of your tongue tingle slightly, while the galangal's heat settles warmly at the back of your throat.",
    },
    {
      nodeId: "step_4",
      action: "Garnish",
      inputs: ["seasoned_soup", "ing_11"],
      outputState: "finished_tom_kha_gai",
      instructions: "Ladle the soup into deep bowls, ensuring each bowl gets equal portions of chicken, mushrooms, and broth. The aromatics — galangal, lemongrass, kaffir lime leaves, and bird chilies — remain in the bowl for visual beauty and ongoing aroma but are pushed to the side and not eaten. Scatter fresh cilantro leaves over the top of each bowl. Serve immediately while the broth is steaming. Provide a small spoon for the broth and chopsticks or a fork for the solids. At the table, diners may squeeze additional lime over their bowl. The soup does not improve on standing — the lime becomes bitter, the coconut milk may separate, and the chicken turns rubbery.",
      visualCue: {
        primaryTarget: "A beautiful ivory bowl with visible golden-white chicken, dark-gold mushrooms, and green cilantro scattered on a silky cream surface.",
        spectrum: [
          { state: "Underdone", description: "The bowl looks pale and unadorned — no garnish, no color contrast.", action: "Add the cilantro immediately. The visual contrast is part of the eating experience." },
          { state: "Perfect",   description: "Steaming ivory broth, tender chicken and soft mushrooms visible below the surface, bright green cilantro floating on top. The galangal and lemongrass pieces rest at the edge of the bowl.", action: "Serve within 2 minutes of ladling." },
          { state: "Overdone",  description: "The soup has been held too long and a ring of coconut oil has formed at the surface rim. Cilantro has wilted into the broth.", action: "Skim the oil with a spoon, add fresh cilantro, and serve." },
        ],
      },
      feelCue: "When you lift the bowl to your lips, the steam should carry the full aromatic profile — lemongrass, kaffir lime, galangal — before you taste a single drop. That fragrant cloud is the soup announcing itself.",
    },
  ],
};
