export default {
  repoId: "master_mexican_birria_001",
  parentRepoId: null,
  slug: "birria",
  author: "ForkRecipe Kitchen",

  title: "Birria de Res (Jalisco Beef Birria)",
  description: "Beef braised in a deep, brick-red broth of toasted guajillo and ancho chilies, charred tomato, and aromatic spices until the meat falls apart — the rich consommé served alongside for dipping birria tacos.",
  cuisine: "Mexican",
  culture: "Jalisco",
  category: "proteins",

  tags: ["mexican", "jalisco", "beef", "birria", "chili", "braise", "consomme", "tacos"],
  difficulty: 4,
  activeTime: "1 hour",
  totalTime: "5 hours",
  ratioSystem: "weight",

  stars: 0, forks: 0, contributors: 1, license: "CC-BY-SA",
  createdAt: "2026-06-27", updatedAt: "2026-06-27",

  flavorRadar: { sweet: 2, salty: 3, sour: 2, bitter: 2, umami: 5, heat: 3 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Beef chuck, bone-in short ribs, and oxtail mixed", ratioValue: 2000, defaultUnit: "g", substitutions: ["goat shoulder", "lamb shoulder"] },
    { ingId: "ing_02", role: "Spice",     name: "Dried guajillo chilies, stems and seeds removed", ratioValue: 60,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_03", role: "Spice",     name: "Dried ancho chilies, stems and seeds removed",    ratioValue: 40,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_04", role: "Spice",     name: "Dried chipotle or morita chilies",               ratioValue: 15,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_05", role: "Aromatic",  name: "Roma tomatoes, halved",                           ratioValue: 300,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_06", role: "Allium",    name: "White onion, quartered",                          ratioValue: 200,  defaultUnit: "g", substitutions: [] },
    { ingId: "ing_07", role: "Allium",    name: "Garlic cloves, unpeeled",                         ratioValue: 30,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_08", role: "Spice",     name: "Ground cumin",                                    ratioValue: 6,    defaultUnit: "g", substitutions: [] },
    { ingId: "ing_09", role: "Spice",     name: "Dried oregano (Mexican)",                         ratioValue: 6,    defaultUnit: "g", substitutions: ["Italian oregano"] },
    { ingId: "ing_10", role: "Spice",     name: "Ground cloves",                                   ratioValue: 2,    defaultUnit: "g", substitutions: [] },
    { ingId: "ing_11", role: "Spice",     name: "Ground cinnamon",                                 ratioValue: 3,    defaultUnit: "g", substitutions: [] },
    { ingId: "ing_12", role: "Aromatic",  name: "Bay leaves",                                      ratioValue: 4,    defaultUnit: "whole", substitutions: [] },
    { ingId: "ing_13", role: "Aromatic",  name: "Fresh thyme sprigs",                              ratioValue: 10,   defaultUnit: "g", substitutions: ["dried thyme"] },
    { ingId: "ing_14", role: "Acid",      name: "Apple cider vinegar",                             ratioValue: 30,   defaultUnit: "g", substitutions: ["white wine vinegar"] },
    { ingId: "ing_15", role: "Liquid",    name: "Beef stock or water",                             ratioValue: 1500, defaultUnit: "g", substitutions: [] },
    { ingId: "ing_16", role: "Seasoning", name: "Fine sea salt",                                   ratioValue: 20,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_17", role: "Garnish",   name: "White onion, finely diced",                       ratioValue: 80,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_18", role: "Garnish",   name: "Fresh cilantro, chopped",                         ratioValue: 30,   defaultUnit: "g", substitutions: [] },
    { ingId: "ing_19", role: "Acid",      name: "Lime wedges",                                     ratioValue: 60,   defaultUnit: "g", substitutions: [] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Toast",
      inputs: ["ing_02", "ing_03", "ing_04"],
      outputState: "toasted_chilies",
      instructions: "Heat a dry comal or cast iron skillet over medium heat. Toast the dried chilies one by one: press each flat against the hot surface for 15–20 seconds per side, until they deepen in color, blister slightly, and release a rich, smoky aroma. Do not burn — they should smell of chocolate and smoke, not acrid char.",
      visualCue: {
        primaryTarget: "Each chili is slightly puffed and blistered, color has deepened to a near-black at the pressed spots. The kitchen smells of smoky chocolate and dried fruit.",
        spectrum: [
          { state: "Underdone", description: "Chilies look the same as before toasting — flat, dark, and without any blistering. Smell is flat and dusty.", action: "Return to the comal. The key moment is when you smell the chocolate-smoke aroma." },
          { state: "Perfect",   description: "Light blistering, a faint smokiness, and the skin has become slightly pliable. The smell is rich, complex — chocolate, raisin, smoke.", action: "Place in a bowl, cover with boiling water, and soak 20 minutes." },
          { state: "Overdone",  description: "Chilies are smoking and smell acrid and bitter. Black patches that crumble.", action: "Discard these chilies and start fresh. Burnt guajillo makes an intensely bitter birria that cannot be fixed." },
        ],
      },
      feelCue: "A properly toasted chili becomes pliable and almost leathery — it bends rather than cracks. Undertoasted ones snap brittlely; overtoasted ones crumble.",
    },
    {
      nodeId: "step_2",
      action: "Char",
      inputs: ["ing_05", "ing_06", "ing_07"],
      outputState: "charred_aromatics",
      instructions: "On the same dry comal or directly over a gas flame, char the halved tomatoes cut-side down until blackened. Char the quartered onion and unpeeled garlic cloves on all sides until deeply browned, almost black in spots. This charring adds a deep, slightly bitter smokiness essential to birria.",
      visualCue: {
        primaryTarget: "Tomatoes are black on the cut side and collapsed. Onion is charred at the edges with softened interior. Garlic cloves are dark brown in spots and softened.",
        spectrum: [
          { state: "Underdone", description: "Vegetables are only lightly browned, no char. Tomatoes haven't released their juices.", action: "Continue — the vegetables need to be genuinely charred, not just browned." },
          { state: "Perfect",   description: "Black char marks on all vegetables. Tomatoes are collapsing and juicy. Onion edges are black with a soft center. Garlic is nearly soft.", action: "Add directly to the soaking chilies." },
          { state: "Overdone",  description: "Completely black and acrid. Vegetables are entirely carbon.", action: "Trim the worst char off tomatoes and onion but retain some. Garlic should be discarded if completely burnt." },
        ],
      },
      feelCue: "Press a charred tomato — it should completely give way and release juices. The char on the skin should be almost crunchy, contrasting with the soft, steamy interior.",
    },
    {
      nodeId: "step_3",
      action: "Blend",
      inputs: ["toasted_chilies", "charred_aromatics", "ing_08", "ing_09", "ing_10", "ing_11", "ing_14"],
      outputState: "birria_sauce",
      instructions: "Drain the soaked chilies, reserving 250 g of the soaking liquid. Peel the charred garlic. Blend chilies, charred tomatoes, onion, garlic, all spices, and vinegar with the reserved soaking liquid until completely smooth. The sauce should be silky with no visible fiber or chunks. Pass through a medium-mesh strainer for maximum smoothness.",
      visualCue: {
        primaryTarget: "A deep, dark brick-red sauce — almost burgundy — completely smooth, with no visible pieces. Smells of toasted chili, chocolate, smoke, and spice.",
        spectrum: [
          { state: "Underdone", description: "Sauce is chunky with visible chili skin and seed pieces. Texture is rough.", action: "Blend longer and pass through a strainer. Chili skins left in will make the sauce bitter and gritty." },
          { state: "Perfect",   description: "Completely smooth, deep brick-burgundy, fragrant and slightly thick. Passes through a strainer leaving behind only a small amount of fibrous material.", action: "Fry the sauce to deepen flavor, then braise the meat." },
          { state: "Overdone",  description: "Blended too long and the sauce is very hot and frothy.", action: "Allow to cool before handling. Proceed." },
        ],
      },
      feelCue: "Rub a small amount of strained sauce between your fingers — it should feel completely smooth, like a thin paint, with no graininess.",
    },
    {
      nodeId: "step_4",
      action: "Sear",
      inputs: ["ing_01", "ing_16"],
      outputState: "seared_beef",
      instructions: "Season the beef generously with salt. In a large Dutch oven over high heat, sear all pieces in batches until deeply browned on all sides — about 4 minutes per side. Don't crowd the pot. The sear builds the fond that gives the consommé its depth.",
      visualCue: {
        primaryTarget: "Deep mahogany-brown crust on all seared surfaces. Dark, sticky fond on the pot bottom. The kitchen smells of roasting beef.",
        spectrum: [
          { state: "Underdone", description: "Beef is grey and steamed, not browned. Meat is sticking to the pot.", action: "The pot isn't hot enough. Remove beef, let pan reheat, and try again in smaller batches." },
          { state: "Perfect",   description: "Deep brown crust, meat releases cleanly. Dark, rich fond coating the pot bottom.", action: "Remove beef, reduce heat, and fry the chili sauce." },
          { state: "Overdone",  description: "Fond is very dark and beginning to burn. Bitter smell.", action: "Deglaze immediately with a splash of stock before adding the chili sauce." },
        ],
      },
      feelCue: "When searing correctly, the beef will initially stick, then release cleanly when a proper crust has formed. Never force it off the pan prematurely.",
    },
    {
      nodeId: "step_5",
      action: "Braise",
      inputs: ["seared_beef", "birria_sauce", "ing_15", "ing_12", "ing_13"],
      outputState: "braised_birria",
      instructions: "In the same pot, add the chili sauce over medium heat and fry for 3–4 minutes, stirring constantly, until it darkens slightly and smells toasted. Add the beef back in along with the stock, bay leaves, and thyme. Bring to a boil, skim thoroughly, then cover and cook in a 160 C (320 F) oven or over the lowest stovetop simmer for 3 to 3.5 hours.",
      visualCue: {
        primaryTarget: "After 3 hours, the broth is deep garnet-red and clear, the beef has collapsed into shreds at the slightest touch, and a layer of red-tinted fat floats at the top.",
        spectrum: [
          { state: "Underdone", description: "Beef is tender but still holds its shape firmly. Broth is thin and lighter in color.", action: "Continue braising. The collagen needs 3 full hours to dissolve into the broth." },
          { state: "Perfect",   description: "Beef falls apart at a touch. Broth is deep, clear garnet with a beautiful red fat cap. Taste is complex, smoky, and deeply savory.", action: "Shred the beef into the broth and serve." },
          { state: "Overdone",  description: "Beef has completely dissolved into the broth. Broth may be cloudy.", action: "Strain and serve as a soup. The shredded meat can be pressed and pan-fried for tacos." },
        ],
      },
      feelCue: "After 3 hours, reach in with tongs and squeeze a piece of beef — it should crumble between your fingers like wet paper, offering no resistance at all.",
    },
    {
      nodeId: "step_6",
      action: "Garnish",
      inputs: ["braised_birria", "ing_17", "ing_18", "ing_19"],
      outputState: "finished_birria",
      instructions: "Shred the beef with two forks and return to the consommé. Taste and adjust salt. Ladle meat and broth into bowls. Top with diced white onion and cilantro. Serve lime wedges alongside. For tacos, dip tortillas in the red fat cap of the consommé before gridding, fill with birria meat and cheese, and serve with the consommé for dipping.",
      visualCue: {
        primaryTarget: "Deep garnet consommé with shreds of dark, tender beef. Bright white onion and green cilantro on top. The fat cap on the broth surface is a vivid red from the chili oil.",
        spectrum: [
          { state: "Underdone", description: "Consommé is thin and lacks depth. Beef shreds are still somewhat firm.", action: "Simmer uncovered for 20 more minutes to concentrate the broth." },
          { state: "Perfect",   description: "Rich, deep-colored consommé that tastes intensely of chili, beef, and smoke. Shredded beef is silk-soft. Garnishes bright and fresh.", action: "Serve immediately." },
          { state: "Overdone",  description: "Consommé is very salty or very thick from over-reduction.", action: "Add water to dilute and adjust seasoning." },
        ],
      },
      feelCue: "The finished consommé should coat your lips when you sip it — not watery, but body-full from rendered collagen, with a lingering warmth from the chipotle.",
    },
  ],
};
