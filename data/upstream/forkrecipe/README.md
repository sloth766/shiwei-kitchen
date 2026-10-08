# ForkRecipe — Open Recipe Dataset

The recipe catalog behind [ForkRecipe](https://forkrecipe.com) — "recipes with lineage."

ForkRecipe treats recipes like code: every dish traces back to a canonical **Mother Recipe**,
and every variation is a **fork** with a real diff against its parent. This repo is just the
data layer — the recipe content itself, structured and open.

## What's here

916 recipes as schema-valid JS modules in [`recipes/`](./recipes), one file per dish, plus
[`recipes/_template.js`](./recipes/_template.js) documenting the schema (ingredients with
baker's-percentage-style ratios, structured process steps, flavor profile, cuisine/category
tags, etc.).

`data/` holds the small support tables the schema depends on — categories, the author
registry, ingredient-role colors, and the actual fork lineage graph (`forks.js`) and
per-recipe commit history (`commits.js`). `scripts/validate-recipes.js` checks every recipe
against all of it:

```
npm run validate
```

No dependencies to install — it's plain Node. See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for
how to add or fork a recipe.

Content is either originally authored for ForkRecipe or adapted from public-domain sources.
All recipes here are licensed **CC BY-SA 4.0** (see [`LICENSE`](./LICENSE)) — reuse and remix
freely, share alike, with attribution.

## What's not here

This is the dataset only — not the ForkRecipe app itself (the fork/diff engine, auth, the
AI content pipeline, admin tooling). The live product is at
[forkrecipe.com](https://forkrecipe.com).

## Licence and trademarks

The recipes are **CC BY-SA 4.0** ([`LICENSE`](./LICENSE)): credit ForkRecipe and share adaptations alike.
Copyright © 2026 [FoodML](https://foodml.xyz) and the contributors in `data/users.js`.

"ForkRecipe", its logo and "FoodML" are trademarks of FoodML, and the licence doesn't cover them: say your work is
*from* or *adapted from* the ForkRecipe dataset, but don't call it ForkRecipe. Details in [`NOTICE`](./NOTICE).

## Author

ForkRecipe is a [FoodML](https://foodml.xyz) project, built by [Michael Gutowski](https://www.linkedin.com/in/futurechef/) — a chef who also ships
software. More at [chefmjg.com](https://chefmjg.com).
