export default {
  repoId: "master_scandinavian_swedish_meatballs_001",
  parentRepoId: null,
  slug: "swedish-meatballs",
  author: "ForkRecipe Kitchen",

  title: "Swedish Meatballs (Köttbullar)",
  description: "Small, perfectly round, and seared to a mahogany crust — these meatballs are half pork, half beef, bound with cream-soaked breadcrumbs and spiced with allspice and white pepper, swimming in a gravy so silky it barely needs anything else.",
  cuisine: "Scandinavian",
  culture: "Swedish",
  category: "proteins",

  tags: ["swedish", "meatballs", "cream-sauce", "comfort", "pork-beef"],
  difficulty: 2,
  activeTime: "30 min",
  totalTime: "50 min",
  ratioSystem: "parts",

  stars: 2190,
  forks: 267,
  contributors: 35,
  license: "CC-BY-SA",
  createdAt: "2024-12-01",
  updatedAt: "2025-12-15",

  flavorRadar: { sweet: 1, salty: 3, sour: 1, bitter: 0, umami: 4, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Ground beef (20% fat)",                        ratioValue: 50,  defaultUnit: "parts", substitutions: ["all-pork", "ground turkey (less rich)"] },
    { ingId: "ing_02", role: "Protein",   name: "Ground pork",                                  ratioValue: 50,  defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Binder",    name: "Breadcrumbs soaked in heavy cream",            ratioValue: 20,  defaultUnit: "parts", substitutions: ["day-old white bread soaked in milk"] },
    { ingId: "ing_04", role: "Allium",    name: "Yellow onion, grated or minced very finely",  ratioValue: 15,  defaultUnit: "parts", substitutions: ["shallots"] },
    { ingId: "ing_05", role: "Spice",     name: "Allspice (ground) and white pepper",          ratioValue: 1,   defaultUnit: "parts", substitutions: ["nutmeg and black pepper"] },
    { ingId: "ing_06", role: "Dairy",     name: "Heavy cream and beef stock (for gravy)",      ratioValue: 60,  defaultUnit: "parts", substitutions: ["sour cream thinned with stock"] },
    { ingId: "ing_07", role: "Fat",       name: "Unsalted butter",                             ratioValue: 8,   defaultUnit: "parts", substitutions: ["ghee"] },
    { ingId: "ing_08", role: "Binder",    name: "All-purpose flour (for the gravy roux)",       ratioValue: 5,   defaultUnit: "parts", substitutions: ["gluten-free flour blend"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Mix",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_04", "ing_05"],
      outputState: "meatball_mixture",
      instructions: "In a large bowl, combine the ground beef, ground pork, cream-soaked breadcrumbs, grated onion, allspice, white pepper, and a generous pinch of salt. Mix by hand until just combined — do not overwork the mixture or the meatballs will become dense and tight rather than tender. Test one small ball by frying it in a hot pan for 2 minutes and tasting for seasoning. Adjust the seasoning of the raw mix accordingly.",
      visualCue: {
        primaryTarget: "A pale pink, uniformly textured meat mixture with no visible unmixed white breadcrumb lumps or dry spice pockets. Cohesive but loose.",
        spectrum: [
          { state: "Underdone", description: "Mixture is not fully combined — streaks of pure beef and pure pork are visible. White breadcrumb lumps have not been integrated. Flavor will be uneven throughout the meatballs.", action: "Mix further with your hands, squeezing through your fingers to combine completely. Stop as soon as uniform." },
          { state: "Perfect",   description: "Uniform pale pink mixture that holds a ball shape when rolled but is not tight or dense. No visible lumps or unmixed portions. Smells lightly of allspice and onion.", action: "Roll into balls of about 2.5cm diameter. Refrigerate for 15 minutes before cooking to help them hold their shape." },
          { state: "Overdone",  description: "Mixture has been overworked and feels tight and sticky. It pulls away from the bowl in one rubbery mass. The fat proteins have emulsified too tightly.", action: "Proceed, but the final meatballs will be denser and more like sausage than the traditional tender texture." },
        ],
      },
      feelCue: "The meatball mixture should feel cool, smooth, and slightly tacky between your palms when you roll it — like working with slightly wet clay that holds its shape when you stop pressing.",
    },
    {
      nodeId: "step_2",
      action: "Sear",
      inputs: ["meatball_mixture", "ing_07"],
      outputState: "seared_meatballs",
      instructions: "Melt butter in a wide, heavy-bottomed pan over medium-high heat until it foams and then begins to subside. Add meatballs in a single layer — do not crowd; work in batches if needed. Shake the pan gently after 90 seconds to roll the meatballs onto a new face — their round shape lets them self-rotate with a shake. Continue shaking and rolling every 60–90 seconds for 6–8 minutes total until evenly browned all over. Do not use a spoon to turn them; shaking preserves their round shape.",
      visualCue: {
        primaryTarget: "Uniformly dark golden-brown all over with no pale patches. The meatballs are rigid and hold their round shape when the pan is shaken.",
        spectrum: [
          { state: "Underdone", description: "Meatballs are pale golden or blond on their browned sides. They are still soft and deform slightly when the pan is shaken.", action: "Continue on medium-high heat. The surface needs to reach a proper Maillard crust before it will release cleanly from the pan." },
          { state: "Perfect",   description: "All meatballs show deep amber-brown color all over with no pale spots. Rigid and round when shaken. Juices that have escaped into the pan are dark amber and fragrant with meat and butter.", action: "Remove meatballs and reserve. Deglaze the pan for the gravy without cleaning it." },
          { state: "Overdone",  description: "Meatballs are dark brown to black on at least one face. Strong charred smell. They may have cracked from too much heat.", action: "Remove immediately. The interior is likely fine. The gravy will cover the exterior color, and the dark fond adds flavor to the sauce if you deglaze carefully." },
        ],
      },
      feelCue: "When the meatballs are ready to release from the pan, they will do so with a faint 'pop' as the vacuum of the crust breaks. Try rolling one with a spoon — if it slides smoothly across the pan in one piece, the crust has set.",
    },
    {
      nodeId: "step_3",
      action: "Reduce",
      inputs: ["seared_meatballs", "ing_06"],
      outputState: "cream_gravy",
      instructions: "In the meatball pan with its fond intact, melt a small knob of butter. Add a tablespoon of flour and cook for 1 minute, stirring constantly into the fond to make a roux. Gradually whisk in the beef stock, scraping up all the dark fond. Bring to a simmer, then stir in the heavy cream. Simmer for 5 minutes until the gravy is thick enough to coat a spoon. Season with salt, white pepper, and a dash of soy sauce for depth.",
      visualCue: {
        primaryTarget: "A glossy, pale-amber gravy that coats the back of a spoon in a thin, even layer. The surface shows a gentle, slow simmer with tiny bubbles at the edges.",
        spectrum: [
          { state: "Underdone", description: "Gravy is thin and watery, running off a spoon in a fast stream. The flour has not yet thickened it. Raw flour taste detectable.", action: "Simmer for 3–5 more minutes, stirring constantly. If still thin after 8 minutes, mix a teaspoon of cornstarch with cold water and whisk in." },
          { state: "Perfect",   description: "Gravy coats a spoon evenly and runs off slowly. When you tilt the pan, it moves as a cohesive sheet rather than water. Color is a warm, golden-amber from the beef stock and fond. Flavor is savory, creamy, and deeply meaty.", action: "Return the meatballs to the gravy and heat through for 3 minutes before serving." },
          { state: "Overdone",  description: "Gravy has reduced past a sauce consistency to a thick, gluey paste that mounds on a spoon. Flavor is very concentrated and may be too salty.", action: "Whisk in additional beef stock or cream to restore consistency." },
        ],
      },
      feelCue: "Dip a finger into the warm gravy and rub your thumb across it — the gravy should cling to your fingertip in a thin, oily film that does not immediately drip. It should feel rich, not watery, and leave a faint fatty residue on your skin.",
    },
    {
      nodeId: "step_4",
      action: "Finish",
      inputs: ["seared_meatballs", "cream_gravy"],
      outputState: "finished_swedish_meatballs",
      instructions: "Return all the seared meatballs to the cream gravy. Simmer gently on low heat for 5 minutes to heat through and allow the meatballs to absorb some of the gravy flavor. Do not boil — high heat will tighten the meatballs and make the gravy break. Serve over egg noodles, mashed potato, or lingonberry jam alongside, with a garnish of fresh dill.",
      visualCue: {
        primaryTarget: "Meatballs are fully coated in a shining, pale amber gravy. When cut in half, the interior is uniformly cooked — no pink at the center. Juices run clear.",
        spectrum: [
          { state: "Underdone", description: "Meatball center is still pink or grey-pink. Juices run slightly red-pink when cut. The interior temperature has not reached 70°C.", action: "Continue simmering in the gravy for another 3–4 minutes on low heat. The gentle simmer will cook the interior without toughening the outside." },
          { state: "Perfect",   description: "Uniformly cooked to a pale, juicy grey-brown throughout. When cut, the interior is tender and moist. The gravy clings to the cut surface. The allspice and white pepper are detectable but not dominant.", action: "Serve immediately. Meatballs in cream gravy cool quickly and the texture changes significantly as the fat solidifies." },
          { state: "Overdone",  description: "Meatballs have tightened and gone rubbery. The interior is dry and the meat has begun to pull away from the surface. The gravy has reduced and thickened around them.", action: "Add a splash of cream and a knob of butter to the gravy and serve with extra sauce over each portion to compensate for the dry texture." },
        ],
      },
      feelCue: "Press a meatball gently with the back of a spoon — it should yield slightly under pressure like a firm mushroom, then spring back halfway when you release. Full spring-back means undercooked; no spring-back means overcooked.",
    },
  ],
};
