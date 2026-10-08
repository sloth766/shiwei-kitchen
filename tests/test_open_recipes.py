"""Open data integrity and safe conversion; no network or model requests."""
import hashlib
import json
from pathlib import Path
import sys
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from scripts import import_open_recipes as importer


class OpenRecipeTests(unittest.TestCase):
    def test_english_dish_names_do_not_match_substrings_or_shorter_dishes(self):
        import app
        plain=app.normalize_personal_recipe({'name':'Rice','minutes':20,'ingredients':['米'],'steps':['煮熟。']})
        fried=app.normalize_personal_recipe({'name':'蛋炒饭 · Egg Fried Rice','minutes':20,'ingredients':['米','鸡蛋'],'steps':['炒熟。']})
        plain.update(id='fork-rice',tags=['rice'],source={**plain['source'],'title':'Rice'})
        fried.update(id='fork-fried-rice',source={**fried['source'],'title':'Egg Fried Rice'})
        with patch.object(app,'all_recipes',return_value=[plain,fried]):
            self.assertEqual([r['id'] for r in app.search_recipes('Egg Fried Rice')],['fork-fried-rice'])
            self.assertEqual([r['id'] for r in app.search_recipes('蛋炒饭')],['fork-fried-rice'])
            self.assertEqual(app.search_recipes('licorice'),[])

    def test_literal_parser_rejects_executable_code(self):
        self.assertEqual(importer.js_data('// recipe\nexport default {title: "Soup", list: [1, null,],};'),
                         {'title': 'Soup', 'list': [1, None]})
        for code in ['export default {title: process.exit()};',
                     'export default {title: "Soup"}; fetch("https://example.com")',
                     'export default {title: "Soup", title: "Other"};',
                     'export default {instructions: () => "Soup"};']:
            with self.subTest(code=code), self.assertRaises(ValueError):
                importer.js_data(code)

    def test_total_time_does_not_use_active_time_or_guess_missing_units(self):
        self.assertEqual(importer.duration('4 hr 30 min'), 270)
        for duration in ('overnight', '15', '15-30 min', '30 min + overnight', '48 hr'):
            with self.subTest(duration=duration):
                self.assertIsNone(importer.duration(duration))
        path = 'recipes/chicken-stock.js'
        raw = (ROOT / 'data/upstream/forkrecipe' / path).read_text(encoding='utf-8')
        recipe = importer.parse_forkrecipe(path, raw)
        self.assertEqual(recipe['minutes'], 270)
        self.assertIn('Chicken bones', recipe['quantity_notes'])
        self.assertTrue(all(i['quantity'] is None for i in recipe['ingredients']))
        self.assertIn('CC BY-SA 4.0', recipe['adaptation'])
        self.assertIn('FoodML', recipe['adaptation'])

    def test_pantry_names_distinguish_preserved_and_processed_foods(self):
        import app
        fresh = importer.ingredient_name('2 tomatoes', with_amount=True)
        sauce = importer.ingredient_name('2 tbsp tomato paste', with_amount=True)
        self.assertTrue(app.pantry_matches('番茄', fresh))
        self.assertFalse(app.pantry_matches('番茄', sauce))
        self.assertFalse(app.pantry_matches('蒜', importer.ingredient_name('Garlic powder')))
        self.assertTrue(app.pantry_matches('蒜', importer.ingredient_name('Garlic, minced')))

    def test_snapshot_files_match_pinned_content_and_notices(self):
        manifests = json.loads((ROOT / 'data/open-recipe-sources.json').read_text(encoding='utf-8'))
        identifiers = set()
        for key, spec in importer.SOURCES.items():
            manifest = manifests[key]
            self.assertEqual(manifest['commit'], spec['commit'])
            recipes = json.loads((ROOT / 'data' / (key + '-recipes.json')).read_text(encoding='utf-8'))
            self.assertEqual(len(recipes), manifest['imported'])
            for recipe in recipes:
                self.assertNotIn(recipe['id'], identifiers)
                identifiers.add(recipe['id'])
                self.assertIn(spec['commit'], recipe['source']['url'])
                self.assertEqual(recipe['diet'], 'unknown')
            for path, digest in {**manifest['checksums'], **manifest['notice_checksums']}.items():
                self.assertEqual(hashlib.sha256((ROOT / 'data/upstream' / key / path).read_bytes()).hexdigest(), digest, path)


if __name__ == '__main__':
    unittest.main()
