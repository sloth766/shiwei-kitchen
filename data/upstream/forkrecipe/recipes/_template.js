// ─────────────────────────────────────────────────────────────────────────────
// RECIPE TEMPLATE — reference only. NOT loaded by the app.
//
// src/data/recipes/index.js explicitly skips this file. To author a real recipe:
//   1. Copy this file to src/data/recipes/<slug>.js
//   2. `slug` MUST equal the filename (without .js). The glob loader keys on it.
//   3. Fill in every field. Run `npm run validate` before committing.
//
// CONSTRAINTS the validator enforces (see scripts/validate-recipes.js):
//   • slug === filename
//   • category   ∈ keys of CATEGORIES   (src/data/categories.js)
//   • author     ∈ keys of USERS        (src/data/users.js) — add yourself there
//   • flavorRadar has ALL 6 axes        (src/data/schema.js → FlavorAxes)
//   • every ingredient.role ∈ RoleColor (src/data/schema.js)
//   • every processNode.inputs entry is either a real ingId OR a prior
//     node's outputState (this drives the dependency graph + diff engine)
//
// FORKS: if this recipe derives from another, see the FORK block at the bottom.
// Forks MUST reuse the parent's ingIds for unchanged ingredients so diff.js can
// track add/remove/modify by stable id. Only new ingredients get new ids.
// ─────────────────────────────────────────────────────────────────────────────

export default {
  repoId: "master_<cuisine>_<name>_001", // unique, snake_case. Forks use "fork_..."
  parentRepoId: null,                    // null for originals; parent's repoId for forks
  slug: "template-slug",                 // kebab-case, MUST match filename
  author: "ForkRecipe Kitchen",             // must be a key in src/data/users.js

  title: "Recipe Title",
  description: "One or two evocative, sensory sentences. This is the README.",
  cuisine: "Cuisine",                    // e.g. "French", "Italian", "Thai"
  culture: "Region",                     // e.g. "Ligurian", "Central Thai"
  category: "sauces",                    // must be an id in src/data/categories.js

  tags: ["tag1", "tag2"],
  difficulty: 2,                         // 1 (easy) – 5 (hard)
  activeTime: "20 min",                  // human string
  totalTime: "45 min",                   // human string
  ratioSystem: "parts",                  // "bakers_percentage" | "parts" | "weight"

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2025-01-01",               // YYYY-MM-DD
  updatedAt: "2025-01-01",               // YYYY-MM-DD

  // All six axes required, each 0–5 (higher = more intense).
  flavorRadar: { sweet: 0, salty: 0, sour: 0, bitter: 0, umami: 0, heat: 0 },

  // role MUST be a key in RoleColor (schema.js): Structure, Hydration, Fat,
  // Seasoning, Leavener, Heat, Aromatic, Allium, Citrus, Herb, Umami, Spice,
  // Solvent, Glutamate, Inosinate, Base, Acid, Sweetener, Binder, Garnish,
  // Protein, Starch, Dairy, Liquid.
  ingredients: [
    { ingId: "ing_01", role: "Structure", name: "Ingredient name (notes)", ratioValue: 100, defaultUnit: "%", substitutions: ["alt 1"] },
    { ingId: "ing_02", role: "Fat",       name: "Another ingredient",       ratioValue: 10,  defaultUnit: "%", substitutions: [] },
  ],

  // action is free-form prose ("Temper and dry", "Build ladle by ladle"). If it
  // matches a key in ActionIcons (schema.js: Mix, Fold, Sear, Reduce, Emulsify,
  // Mount, Temper, ...) it gets a custom glyph; otherwise it falls back to "●".
  // inputs reference earlier ingIds and/or prior outputStates — this is the
  // dependency graph rendered by ProcessGraph.jsx.
  processNodes: [
    {
      nodeId: "step_1",
      action: "Mix",
      inputs: ["ing_01", "ing_02"],
      outputState: "intermediate_state",
      instructions: "Clear, specific prose. What to do, how long, what to watch.",
      visualCue: {
        primaryTarget: "What the cook should SEE when this step is done right.",
        spectrum: [
          { state: "Underdone", description: "What it looks like if not there yet.", action: "How to fix / what to do." },
          { state: "Perfect",   description: "The target state, described concretely.", action: "Proceed to the next step." },
          { state: "Overdone",  description: "What it looks like if pushed too far.", action: "How to recover (or accept)." },
        ],
      },
      feelCue: "A tactile/sensory sentence — how it should feel, sound, or smell.",
    },
    {
      nodeId: "step_2",
      action: "Finish",
      inputs: ["intermediate_state"], // references step_1's outputState
      outputState: "finished_dish",
      instructions: "...",
      visualCue: {
        primaryTarget: "...",
        spectrum: [
          { state: "Underdone", description: "...", action: "..." },
          { state: "Perfect",   description: "...", action: "..." },
          { state: "Overdone",  description: "...", action: "..." },
        ],
      },
      feelCue: "...",
    },
  ],

  // ───────────────────────────────────────────────────────────────────────────
  // FORK-ONLY FIELDS — delete this block for original recipes.
  // Also required when forking:
  //   • register in src/data/forks.js → FORK_REGISTRY[parentSlug].push(thisSlug)
  //   • add a history in src/data/commits.js keyed by this slug, first commit
  //     type:"initial" with a message starting "Fork: ..."
  //   • bump the author's forksCreated in src/data/users.js
  // ───────────────────────────────────────────────────────────────────────────
  // parentSlug: "parent-recipe-slug",
  // forkNote: "One sentence: what this fork changes and why.",
  // changes: {
  //   ingredientsAdded: 0, ingredientsRemoved: 0, ingredientsModified: 0,
  //   stepsAdded: 0, stepsRemoved: 0, stepsModified: 0,
  // },
};
