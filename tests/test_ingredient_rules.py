"""Regression checks for ingredient identity and equipment classification."""
import copy
import importlib.util
import json
from pathlib import Path
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import app


class IngredientRulesTests(unittest.TestCase):
    def test_processing_annotations_are_not_discarded(self):
        for stock in ('番茄（罐头）', '番茄(冷冻)', '香菇（干制）', '牛奶（奶粉）'):
            with self.subTest(stock=stock):
                self.assertFalse(app.pantry_matches(stock, stock.split('（')[0].split('(')[0]))
        self.assertTrue(app.pantry_matches('番茄（可选）', '西红柿 2 个'))
        self.assertTrue(app.pantry_matches('番茄(罐头)', '番茄（罐头）'))

    def test_import_separates_devices_without_losing_food_or_notes(self):
        recipe=app.normalize_personal_recipe({'name':'试验凉拌菜',
            'ingredients':['番茄', '冰箱', '碗', '保鲜膜', '火锅底料', '锅巴'],
            'steps':['拌好冷藏。']})
        self.assertEqual([i['name'] for i in recipe['ingredients']], ['番茄','火锅底料','锅巴'])
        self.assertEqual(recipe['equipment'], ['冰箱','碗','保鲜膜'])

    def test_devices_are_persisted_and_returned_consistently(self):
        with tempfile.TemporaryDirectory() as tmp:
            original=app.DB_PATH
            try:
                app.DB_PATH=Path(tmp)/'kitchen.db'
                app.init_db()
                result=app.import_personal_recipes({'recipes':[{'id':'user-device-test',
                    'name':'设备分类菜', 'ingredients':['番茄','冰箱','碗'], 'steps':['拌匀。']}]})
                recipe=app.get_recipe('user-device-test')
                self.assertEqual([i['name'] for i in recipe['ingredients']], ['番茄'])
                self.assertEqual(recipe['equipment'], ['冰箱','碗'])
                with app.connect() as db:
                    self.assertEqual([r[0] for r in db.execute('SELECT name FROM ingredients WHERE recipe_id=?',('user-device-test',))],['番茄'])
                app.init_db()
                self.assertEqual(app.get_recipe('user-device-test'),recipe)
            finally:
                app.DB_PATH=original

    def test_bundled_equipment_corrections_keep_provenance(self):
        records=json.loads((app.ROOT/'data/community-recipes.json').read_text(encoding='utf8'))
        recipe=next(r for r in records if r['id']=='htc-d051be3bc11e466c')
        self.assertNotIn('冰箱',[i['name'] for i in recipe['ingredients']])
        self.assertIn('冰箱',recipe['equipment'])
        self.assertEqual(recipe['diet'],'unknown')
        self.assertEqual(recipe['time_note'],'source')
        self.assertIn('a2d45c6984dff9ee941da0e7c452f7965965d962',recipe['source']['url'])
        unknown=app.normalize_personal_recipe({'name':'未注明用时','ingredients':['豆腐','碗'],'steps':['拌匀。']})
        self.assertEqual(unknown['time_note'],'unknown')
        self.assertEqual(unknown['diet'],'unknown')


if __name__=='__main__':
    unittest.main()
