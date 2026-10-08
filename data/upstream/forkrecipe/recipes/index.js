import { getForksOf } from "../forks.js";

const modules = import.meta.glob('./*.js', { eager: true });

export const RECIPES = {};
export const RECIPE_INDEX = {};

for (const [path, mod] of Object.entries(modules)) {
  if (path === './index.js' || path === './_template.js') continue;
  const recipe = mod.default;
  if (!recipe || !recipe.slug) continue;
  RECIPES[recipe.slug] = recipe;
  RECIPE_INDEX[recipe.slug] = {
    slug: recipe.slug,
    title: recipe.title,
    author: recipe.author,
    description: recipe.description,
    cuisine: recipe.cuisine,
    culture: recipe.culture,
    category: recipe.category,
    tags: recipe.tags,
    difficulty: recipe.difficulty,
    activeTime: recipe.activeTime,
    totalTime: recipe.totalTime,
    stars: recipe.stars,
    forks: recipe.forks,
    flavorRadar: recipe.flavorRadar,
    parentSlug: recipe.parentSlug || null,
    createdAt: recipe.createdAt || null,
  };
}

// A recipe's "forks" is its TRUE number of documented derivations, read from the
// lineage registry (the single source of truth) — never a stored/faked number.
for (const slug of Object.keys(RECIPES)) {
  const n = getForksOf(slug).length;
  RECIPES[slug].forks = n;
  RECIPE_INDEX[slug].forks = n;
}

export function getRecipesByCategory(category) {
  return Object.values(RECIPE_INDEX).filter((r) => r.category === category);
}

export function searchRecipes(query) {
  const q = query.toLowerCase();
  return Object.values(RECIPE_INDEX).filter((r) => {
    const haystack = [
      r.title, r.description, r.cuisine, r.culture,
      ...(r.tags || []),
    ].join(" ").toLowerCase();
    return haystack.includes(q);
  });
}
