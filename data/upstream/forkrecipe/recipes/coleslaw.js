export default {
  repoId: "master_american_coleslaw_001",
  parentRepoId: null,
  slug: "coleslaw",
  author: "ForkRecipe Kitchen",

  title: "Creamy Coleslaw",
  description: "Shredded cabbage tossed in a tangy, slightly sweet mayonnaise dressing that has had an hour to draw out the cabbage's moisture and concentrate it into a crisp, glossy, deeply flavored slaw — the definitive BBQ side dish.",
  cuisine: "American",
  culture: "American",
  category: "vegetables",

  tags: ["american", "cabbage", "slaw", "bbq-side", "creamy"],
  difficulty: 1,
  activeTime: "15 min",
  totalTime: "1 hr 15 min",
  ratioSystem: "parts",

  stars: 1142,
  forks: 98,
  contributors: 13,
  license: "CC-BY-SA",
  createdAt: "2024-07-04",
  updatedAt: "2025-06-18",

  flavorRadar: { sweet: 2, salty: 2, sour: 3, bitter: 0, umami: 1, heat: 0 },

  ingredients: [
    { ingId: "ing_01", role: "Structure", name: "Green cabbage, cored and finely shredded",         ratioValue: 70,  defaultUnit: "parts", substitutions: ["Napa cabbage", "red cabbage (use half)"] },
    { ingId: "ing_02", role: "Structure", name: "Red cabbage, finely shredded",                     ratioValue: 15,  defaultUnit: "parts", substitutions: ["extra green cabbage"] },
    { ingId: "ing_03", role: "Structure", name: "Carrots, peeled and grated",                       ratioValue: 15,  defaultUnit: "parts", substitutions: ["fennel, finely sliced"] },
    { ingId: "ing_04", role: "Fat",       name: "Full-fat mayonnaise",                              ratioValue: 25,  defaultUnit: "parts", substitutions: ["Duke's mayo", "Japanese Kewpie mayo"] },
    { ingId: "ing_05", role: "Acid",      name: "Apple cider vinegar",                              ratioValue: 6,   defaultUnit: "parts", substitutions: ["white wine vinegar", "lemon juice"] },
    { ingId: "ing_06", role: "Sweetener", name: "Granulated sugar",                                 ratioValue: 4,   defaultUnit: "parts", substitutions: ["honey", "maple syrup"] },
    { ingId: "ing_07", role: "Seasoning", name: "Celery seed, kosher salt, black pepper",           ratioValue: 1.5, defaultUnit: "parts", substitutions: ["celery salt"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Salt and drain cabbage",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_07"],
      outputState: "salted_vegetables",
      instructions: "Combine the shredded green cabbage, red cabbage, and grated carrots in a large colander set over a bowl. Toss with 1 teaspoon of the kosher salt from the seasoning allotment. Let stand for 30 minutes — the salt will draw out the cabbage's excess water through osmosis. Rinse briefly under cold water, then squeeze firmly with your hands or press between two clean kitchen towels to remove as much liquid as possible.",
      visualCue: {
        primaryTarget: "After salting and resting, the cabbage has wilted slightly and a significant pool of cloudy liquid has collected in the bowl beneath the colander.",
        spectrum: [
          { state: "Underdone", description: "Very little liquid in the bowl — barely a tablespoon. Cabbage still looks fully rigid and hasn't wilted at all.", action: "Toss again with a bit more salt and wait longer. The liquid draw takes a full 30 minutes at a minimum. Rushing this step creates watery, diluted slaw." },
          { state: "Perfect",   description: "Several tablespoons of cloudy, slightly briny liquid in the bowl. The cabbage has softened and wilted slightly but still has crunch. Squeezed, it should yield without going limp.", action: "Rinse, squeeze dry, and proceed to the dressing." },
          { state: "Overdone",  description: "Cabbage has been salted for more than 2 hours and is very limp and translucent. The liquid drawn out is abundant.", action: "Rinse very thoroughly under cold water to remove excess salt. Squeeze very dry. The slaw will be softer but still flavorful." },
        ],
      },
      feelCue: "Grab a handful of the salted, rested cabbage and squeeze firmly — it should release a surprising amount of water, like wringing out a wet sponge. If it barely releases any liquid, it hasn't sat long enough.",
    },
    {
      nodeId: "step_2",
      action: "Make dressing",
      inputs: ["ing_04", "ing_05", "ing_06", "ing_07"],
      outputState: "coleslaw_dressing",
      instructions: "In a medium bowl, whisk together the mayonnaise, apple cider vinegar, sugar, celery seed, remaining salt, and a generous crack of black pepper until smooth and fully combined. Taste the dressing before adding it to the cabbage — it should taste tangier and saltier than you want the final slaw, because the cabbage will dilute it. Adjust the balance of vinegar and sugar to your preference.",
      visualCue: {
        primaryTarget: "A smooth, creamy white dressing that flows slowly off a spoon. No sugar crystals visible. The color is uniform ivory with faint brown specks of celery seed.",
        spectrum: [
          { state: "Underdone", description: "Sugar hasn't fully dissolved — visible white crystals when you hold the dressing up to light. Dressing is grainy when tasted.", action: "Whisk vigorously for another minute, or let stand 5 minutes and whisk again. The vinegar will dissolve the sugar if given time." },
          { state: "Perfect",   description: "Smooth, creamy, uniformly ivory dressing. Flows off a spoon in a slow, thick ribbon. Tastes boldly tangy with a rounded sweetness.", action: "Add to cabbage and toss immediately." },
          { state: "Overdone",  description: "Not applicable for a cold dressing — there is no overcooked state. However, if the dressing tastes too sweet or too acidic now, adjust before adding to cabbage.", action: "Taste and rebalance — add more vinegar for tang, more sugar for sweetness, a pinch of salt to sharpen." },
        ],
      },
      feelCue: "Dip your finger in the dressing — it should coat your finger in a thick, smooth film. The flavor should hit your tongue in this order: fat and richness first, then sharp vinegar, then a trailing sweetness.",
    },
    {
      nodeId: "step_3",
      action: "Dress and chill",
      inputs: ["salted_vegetables", "coleslaw_dressing"],
      outputState: "dressed_coleslaw",
      instructions: "Add the squeezed-dry cabbage mixture to the dressing and toss thoroughly until every strand is coated. Taste and adjust seasoning. Cover and refrigerate for at least 1 hour before serving — ideally 2 hours. The resting time is not optional: it allows the dressing to penetrate the cabbage, the flavors to meld, and the texture to achieve the perfect balance of crisp and tender.",
      visualCue: {
        primaryTarget: "Cabbage strands are fully coated in a glossy, clinging dressing. Red cabbage has bled slightly, tinting the dressing a pale purple-pink. The slaw looks glossy and uniform.",
        spectrum: [
          { state: "Underdone", description: "Dressing looks pooled at the bottom of the bowl. Cabbage strands are unevenly coated — some still look dry. Flavors taste separate, not melded.", action: "Toss more thoroughly and refrigerate. Do not serve immediately — 1 hour minimum rest is essential." },
          { state: "Perfect",   description: "Every strand evenly coated in a glossy dressing. Color is uniform pale lavender-green from the red cabbage bleed. Flavors are integrated. Cabbage is tender at the exterior but still snaps.", action: "Taste and adjust final seasoning. Serve cold." },
          { state: "Overdone",  description: "Slaw has been sitting for more than 8 hours. The cabbage is quite limp — more like a pickle than a salad. Dressing has absorbed into the cabbage and pooled at the bottom.", action: "Drain the excess liquid from the bottom. Toss again. Still good — Southern-style slaw is actually this style intentionally." },
        ],
      },
      feelCue: "After chilling, grab a small bunch of the slaw and hold it up — it should clump together slightly from the dressing, falling slowly rather than immediately scattering like a dry salad.",
    },
    {
      nodeId: "step_4",
      action: "Final taste and serve",
      inputs: ["dressed_coleslaw"],
      outputState: "finished_coleslaw",
      instructions: "Remove the slaw from the refrigerator 10 minutes before serving. Toss once more and taste for a final seasoning adjustment — cold suppresses flavor, so it may need a pinch more salt or a splash more vinegar after the chill. Serve cold alongside BBQ or fried chicken. Transfer to a serving bowl with tongs, allowing the excess dressing to drain in the bowl.",
      visualCue: {
        primaryTarget: "A glossy, slightly purple-tinged mound of shredded cabbage in the serving bowl. Individual strands are visible and coated but not swimming in dressing.",
        spectrum: [
          { state: "Underdone", description: "Slaw is still very cold and flavors are muted. Too much dressing pooled at the bottom.", action: "Let stand 10 more minutes at room temperature. Drain off excess pooled dressing." },
          { state: "Perfect",   description: "Glossy, evenly dressed slaw that is cold but not fridge-cold. Flavors are bright — tangy, slightly sweet, with a clean cabbage crunch.", action: "Serve immediately as a side dish." },
          { state: "Overdone",  description: "Slaw has been left out at room temperature for more than 2 hours. Dressing has fully absorbed. Color has turned uniformly purple-grey.", action: "Refrigerate and use within the day. Do not serve slaw that has sat at room temperature too long — the mayonnaise is a food safety concern." },
        ],
      },
      feelCue: "The finished slaw, when eaten, should offer two textures simultaneously: a tender, yielding exterior where the dressing has softened the cabbage, and a distinct inner snap when you bite through — the center of each shred should still crunch.",
    },
  ],
};
