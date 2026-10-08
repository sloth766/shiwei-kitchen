export default {
  repoId: "master_american_bbq_pulled_pork_001",
  parentRepoId: null,
  slug: "bbq-pulled-pork",
  author: "ForkRecipe Kitchen",

  title: "BBQ Pulled Pork",
  description: "A pork shoulder rubbed in brown sugar and smoked paprika, smoked low and slow until collagen surrenders into silk and the bark turns black-mahogany — pulled apart with two forks into shaggy, smoke-perfumed strands that need nothing more than a bun and maybe some slaw.",
  cuisine: "American",
  culture: "Southern BBQ",
  category: "proteins",

  tags: ["southern", "bbq", "pork", "slow-cooked", "smoky"],
  difficulty: 3,
  activeTime: "30 min",
  totalTime: "8 hrs",
  ratioSystem: "parts",

  stars: 4102,
  forks: 489,
  contributors: 43,
  license: "CC-BY-SA",
  createdAt: "2024-02-01",
  updatedAt: "2026-01-17",

  flavorRadar: { sweet: 3, salty: 4, sour: 2, bitter: 1, umami: 4, heat: 2 },

  ingredients: [
    { ingId: "ing_01", role: "Protein",   name: "Bone-in pork shoulder (Boston butt), 2–3 kg",   ratioValue: 100, defaultUnit: "parts", substitutions: ["boneless pork shoulder", "pork picnic"] },
    { ingId: "ing_02", role: "Sweetener", name: "Brown sugar, packed",                            ratioValue: 8,   defaultUnit: "parts", substitutions: ["turbinado sugar", "honey (apply after rub)"] },
    { ingId: "ing_03", role: "Spice",     name: "Smoked paprika",                                 ratioValue: 5,   defaultUnit: "parts", substitutions: ["sweet paprika plus liquid smoke", "ancho chili powder"] },
    { ingId: "ing_04", role: "Seasoning", name: "Kosher salt",                                    ratioValue: 4,   defaultUnit: "parts", substitutions: ["coarse sea salt"] },
    { ingId: "ing_05", role: "Spice",     name: "Black pepper, garlic powder, onion powder, cayenne (equal parts)", ratioValue: 6, defaultUnit: "parts", substitutions: ["all-purpose BBQ rub"] },
    { ingId: "ing_06", role: "Acid",      name: "Apple cider vinegar",                            ratioValue: 10,  defaultUnit: "parts", substitutions: ["white wine vinegar", "distilled white vinegar"] },
    { ingId: "ing_07", role: "Sweetener", name: "Prepared BBQ sauce (for serving)",               ratioValue: 15,  defaultUnit: "parts", substitutions: ["vinegar-based Carolina sauce", "mustard-based SC sauce"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Rub and rest",
      inputs: ["ing_01", "ing_02", "ing_03", "ing_04", "ing_05"],
      outputState: "rubbed_pork",
      instructions: "Combine brown sugar, smoked paprika, salt, and spice mix in a bowl. Pat the pork shoulder completely dry with paper towels. Apply the rub all over the shoulder — every surface, including the crevices around the bone. Press firmly so the rub adheres. Wrap tightly in plastic wrap and refrigerate for at least 4 hours, ideally overnight. The salt will draw moisture to the surface and then reabsorb it, seasoning deep into the meat.",
      visualCue: {
        primaryTarget: "The pork shoulder is uniformly coated in a dark rust-red rub with no bare patches. After resting, moisture beads on the surface as the salt draws liquid out.",
        spectrum: [
          { state: "Underdone", description: "Rub is patchy — bare pork visible in the crevices and on flat surfaces. Sugar looks dusty and hasn't adhered.", action: "Press the rub in more firmly with your hands. The fat cap needs extra attention — score it lightly first so the rub penetrates." },
          { state: "Perfect",   description: "Even, dark rust-red coating on every surface. Rub is adhered, not falling off. After resting, the exterior looks slightly moist — the brine cycle has started.", action: "Proceed to smoking when ready." },
          { state: "Overdone",  description: "Pork has been refrigerated more than 48 hours with the rub — the exterior has started to cure and the outermost layer of meat has a hammy, cured texture.", action: "Proceed. Very long rubs are fine — the flavor will be intense. The smoke will balance the saltiness." },
        ],
      },
      feelCue: "Press the rub firmly into the pork — you should feel some tackiness as the sugar slightly dissolves and binds. If the rub falls off when you tilt the shoulder, press harder or add a light brush of mustard as a binder.",
    },
    {
      nodeId: "step_2",
      action: "Smoke low and slow",
      inputs: ["rubbed_pork"],
      outputState: "smoked_pork",
      instructions: "Set up your smoker or oven at 107–121°C. For smokers, use hickory, apple, or cherry wood. Place pork fat-cap up. Smoke for 5–6 hours, maintaining temperature, until an instant-read thermometer reads 74°C internally. Spritz with apple cider vinegar every 90 minutes to keep the bark moist and add tang. The bark will form and harden during this phase — do not wrap yet.",
      visualCue: {
        primaryTarget: "After 5–6 hours, the exterior has formed a dark mahogany-to-black bark — a thick, crackling crust. An internal temperature of 74°C is reached.",
        spectrum: [
          { state: "Underdone", description: "Bark is still soft and reddish-brown, not the deep mahogany-black of true bark. Surface feels tacky and moist rather than firm. Internal temp below 74°C.", action: "Continue smoking. The bark formation between 68–79°C is where the Maillard reaction is most intense. Do not rush or increase temperature." },
          { state: "Perfect",   description: "Bark is deep mahogany-black, firm to the touch, and slightly crackled. Smells intensely of smoke and caramelized sugar. Internal temp is 74°C.", action: "Wrap tightly in butcher paper or foil (the Texas Crutch) to power through the stall." },
          { state: "Overdone",  description: "Bark is charred and black throughout, not just dark mahogany. Bitter smell. Some areas may have cracked and dried out.", action: "Wrap immediately in foil to halt further bark development. The interior will likely still be excellent." },
        ],
      },
      feelCue: "Knock on the bark with your knuckle — it should sound hollow and feel firm, like knocking on wood, not soft and giving like touching raw meat. This is the moment it sounds and feels like BBQ.",
    },
    {
      nodeId: "step_3",
      action: "Wrap and push through the stall",
      inputs: ["smoked_pork", "ing_06"],
      outputState: "stalled_pork",
      instructions: "When the internal temperature stalls between 65–74°C (the infamous BBQ 'stall' caused by evaporative cooling), tightly wrap the pork in two layers of butcher paper or heavy foil. Add a splash of apple cider vinegar inside the wrap. Return to the smoker or move to a 135°C oven. Cook until the internal temperature reaches 93–96°C, approximately 2–3 more hours.",
      visualCue: {
        primaryTarget: "The thermometer is steadily climbing past 88°C. The wrapped package feels heavy and slightly jiggly — liquids have pooled inside the wrap.",
        spectrum: [
          { state: "Underdone", description: "Temperature has stalled between 65–74°C for more than 90 minutes. The thermometer barely moves. This is normal — do not panic or raise temperature dramatically.", action: "This is exactly why you wrap. The stall can last 2+ hours without wrapping. Wrap now if you haven't." },
          { state: "Perfect",   description: "Internal temperature is climbing steadily and has reached 93–96°C. The wrapped pork jiggles when shaken — the collagen has converted to gelatin.", action: "Rest for at least 1 hour in the wrap before pulling." },
          { state: "Overdone",  description: "Temperature exceeded 99°C. Fat has fully rendered and the meat may have started to dry out in the center even though it jiggles.", action: "Rest immediately — do not continue cooking. The rest period will help redistribute what moisture remains." },
        ],
      },
      feelCue: "When you unwrap and probe the meat with a thermometer or skewer, it should slide in with no resistance at all — like pushing through softened butter. Any resistance means the collagen is not fully converted.",
    },
    {
      nodeId: "step_4",
      action: "Rest",
      inputs: ["stalled_pork"],
      outputState: "rested_pork",
      instructions: "Remove the wrapped pork from heat when it reaches 93–96°C. Without unwrapping, wrap the entire package in a towel and place in a cooler for at least 1 hour, up to 4 hours. This rest is not optional — it allows the temperature to equalize throughout the shoulder and lets the gelatin re-set, which means juicier, more cohesive pulled pork.",
      visualCue: {
        primaryTarget: "The exterior of the cooler-wrapped package is still warm to the touch after 1 hour. When opened, steam rises gently and juices have pooled in the wrap.",
        spectrum: [
          { state: "Underdone", description: "Pork was only rested for 20 minutes. The center is noticeably hotter than the outside. Juices run heavily when pulling begins.", action: "You can proceed, but the texture will be slightly less cohesive. Resting truly matters here — plan your timing better next cook." },
          { state: "Perfect",   description: "After 1+ hours, the internal temp has equalized across the shoulder. Steam rises gently when opened. Bone wiggles freely when you grab it.", action: "Begin pulling." },
          { state: "Overdone",  description: "Pork has cooled below 55°C after too long a rest. It has started to firm up as the gelatin re-sets at lower temperatures.", action: "Warm briefly in a 150°C oven still in its wrap for 20 minutes before pulling." },
        ],
      },
      feelCue: "Grip the exposed bone and wiggle — in properly cooked pulled pork, the bone should slide free with a gentle twist, with almost no resistance. If it feels locked, the collagen needs more time.",
    },
    {
      nodeId: "step_5",
      action: "Pull and serve",
      inputs: ["rested_pork", "ing_07"],
      outputState: "finished_pulled_pork",
      instructions: "Unwrap the pork over a large pan to catch all the juices. Using two forks or heat-resistant gloves, pull the meat apart into shaggy strands. Discard any large pieces of pure fat. Pour some of the collected pan juices back over the pulled pork to keep it moist. Serve with BBQ sauce on the side — never mix it in, so diners can control their sauce level.",
      visualCue: {
        primaryTarget: "Long, shaggy strands of pork that separate easily with a fork. Dark bark pieces distributed throughout the pulled meat. Pork is glistening with rendered juices.",
        spectrum: [
          { state: "Underdone", description: "Meat tears in large, intact chunks rather than separating into strands. Resistance when pulling. Collagen is not fully dissolved.", action: "If internal temp was below 93°C, return to heat. If time-constrained, chop with a cleaver — it won't be pulled pork but it will be edible." },
          { state: "Perfect",   description: "Meat pulls into long, silky strands with minimal resistance. Dark bark pieces mixed throughout. The entire mass glistens with juices.", action: "Moisten with pan juices. Serve with sauce on the side." },
          { state: "Overdone",  description: "Meat is dry and shreds into dust-dry fibers rather than moist strands. Virtually no visible juice.", action: "Toss with a mixture of pan juices, apple cider vinegar, and a splash of BBQ sauce. Let it absorb for 5 minutes before serving." },
        ],
      },
      feelCue: "Run your fingers through the pulled pork — the strands should feel silky and slightly sticky from gelatin, not dry or stringy. A piece of bark pressed between fingers should crumble slightly under pressure.",
    },
  ],
};
