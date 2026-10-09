"""Catalogue quality checks are read-only and do not infer recipe truth."""
import copy
import hashlib
import json
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import app
import kitchen_quality


class QualityTests(unittest.TestCase):
    def setUp(self):
        self.recipe = app.normalize_personal_recipe({
            'id': 'user-quality', 'name': '凉拌番茄',
            'ingredients': [{'name': '番茄', 'quantity': 2, 'unit': '个'}],
            'equipment': ['碗', '保鲜膜'],
            'steps': ['【准备】', '洗净并切好番茄。', '装碗拌匀。'],
        })

    def audit(self, recipes):
        return kitchen_quality.audit_catalogue(app, recipes)

    def test_valid_recipe_and_explicit_unknowns_are_information_only(self):
        recipe = copy.deepcopy(self.recipe)
        recipe['ingredients'].extend([
            {'name': '锅巴', 'quantity': None, 'unit': '适量'},
            {'name': '火锅底料', 'quantity': 1, 'unit': '克'},
        ])
        before = copy.deepcopy(recipe)
        with patch.object(app, 'validate_recipe', wraps=app.validate_recipe) as validate:
            report = self.audit([recipe])
        validate.assert_called_once_with(recipe)
        self.assertEqual(recipe, before)
        self.assertEqual(report['summary'], {
            'errors': 0, 'warnings': 0, 'info': 3,
            'recipes_with_errors': 0, 'recipes_with_warnings': 0,
            'unknown_time': 1, 'unknown_servings': 1, 'unknown_diet': 1,
        })
        self.assertEqual(report['issues'], [])
        self.assertEqual(report['schema_validation'], {'passed': 1, 'failed': 0})
        self.assertIn('不代表', report['scope'])
        json.dumps(report, allow_nan=False)

    def test_multiple_bad_fields_and_malformed_urls_do_not_abort_report(self):
        broken = copy.deepcopy(self.recipe)
        broken.update(id='', name='  ', image=123, minutes=True, diet='pretend',
                      source={'name': '', 'title': '测试', 'url': 'https://[', 'retrieved_at': '2026-02-30'},
                      ingredients=[{'name': '冰箱', 'quantity': float('inf'), 'unit': '台'},
                                   {'name': '番茄', 'quantity': -1, 'unit': '个'},
                                   {'name': '碗', 'quantity': 0, 'unit': None}],
                      steps=[' ', '【拌菜】'])
        report = self.audit([broken, {'id': 'missing'}, None])
        self.assertEqual(report['catalogue_count'], 3)
        self.assertEqual(report['summary']['recipes_with_errors'], 3)
        codes = {issue['code'] for issue in report['issues']}
        self.assertTrue({'invalid_id', 'invalid_text', 'invalid_image_path', 'invalid_minutes',
                         'invalid_diet', 'invalid_source_url', 'invalid_source_date', 'invalid_quantity',
                         'equipment_as_ingredient', 'invalid_step', 'missing_field', 'invalid_recipe'} <= codes)
        quantity_issues = [issue for issue in report['issues'] if issue['code'] == 'invalid_quantity']
        self.assertEqual(len(quantity_issues), 3)
        self.assertTrue(all(issue['field'].endswith('.quantity') for issue in quantity_issues))
        json.dumps(report, allow_nan=False)

    def test_duplicate_names_and_contents_only_warn_but_duplicate_ids_error(self):
        variant = copy.deepcopy(self.recipe)
        variant.update(id='user-quality-variant', steps=['切好后蒸熟。'])
        report = self.audit([self.recipe, variant])
        self.assertEqual(report['summary']['errors'], 0)
        self.assertEqual([issue['code'] for issue in report['issues']], ['duplicate_name', 'duplicate_name'])
        duplicate = copy.deepcopy(self.recipe)
        duplicate.update(id='user-quality-copy', name='另一标题')
        report = self.audit([self.recipe, duplicate])
        self.assertEqual(report['summary']['errors'], 0)
        self.assertEqual([issue['code'] for issue in report['issues']], ['duplicate_content', 'duplicate_content'])
        report = self.audit([self.recipe, self.recipe])
        self.assertEqual(report['summary']['recipes_with_errors'], 2)
        self.assertEqual(sum(issue['code'] == 'duplicate_id' for issue in report['issues']), 2)

    def test_step_headings_are_separate_from_actual_steps(self):
        headings = copy.deepcopy(self.recipe)
        headings.update(steps=['【准备】', '## 调味'])
        report = self.audit([headings])
        self.assertIn('heading_only_steps', [issue['code'] for issue in report['issues']])
        repeated = copy.deepcopy(self.recipe)
        repeated.update(steps=['【调味】', '拌匀。', '【调味】', ' 拌匀。 '])
        report = self.audit([repeated])
        self.assertEqual(report['summary']['errors'], 0)
        duplicate = [issue for issue in report['issues'] if issue['code'] == 'duplicate_step']
        self.assertEqual(len(duplicate), 1)
        self.assertEqual(duplicate[0]['field'], 'steps[3]')

    def test_missing_picture_external_source_and_unknown_servings_markers(self):
        missing = copy.deepcopy(self.recipe)
        missing.update(image='/assets/does-not-exist-quality.jpg', time_note='source', diet='vegan',
                       servings_note='原文为2份；保留原文用量')
        missing['source'].update(name='外部来源', url='')
        report = self.audit([missing])
        self.assertEqual(report['summary']['info'], 0)
        self.assertTrue({'missing_image', 'invalid_source_url'} <= {issue['code'] for issue in report['issues']})
        for note in ('按原文份量；原文用量说明保留，不自动缩放', '原文未标注人数；保留原文用量',
                     '原文为2张薄饼；不按人数自动换算', 'unknown'):
            with self.subTest(note=note):
                recipe = copy.deepcopy(self.recipe)
                recipe['servings_note'] = note
                self.assertEqual(self.audit([recipe])['summary']['unknown_servings'], 1)

    def test_raw_database_snapshot_preserves_devices_and_all_records_without_writes(self):
        with tempfile.TemporaryDirectory(prefix='shiwei-quality-') as tmp:
            db_path = Path(tmp) / 'kitchen.db'
            with patch.object(app, 'DB_PATH', db_path):
                app.init_db()
                with app.connect() as db:
                    app.write_recipes(db, [self.recipe])
                    db.execute('INSERT INTO ingredients VALUES(?,?,?,?,?)', ('user-quality', 1, '冰箱', None, '台'))
                    db.execute("UPDATE recipes SET tags='invalid json' WHERE id='user-quality'")
                    catalogue_count = db.execute('SELECT COUNT(*) FROM recipes').fetchone()[0]
                before = hashlib.sha256(db_path.read_bytes()).hexdigest()
                with patch.object(app, 'all_recipes', side_effect=AssertionError('must inspect raw rows')):
                    report = kitchen_quality.audit_catalogue(app)
                self.assertEqual(hashlib.sha256(db_path.read_bytes()).hexdigest(), before)
                self.assertEqual(report['source'], 'current_database')
                self.assertEqual(report['catalogue_count'], catalogue_count)
                matches = [issue for issue in report['issues'] if issue['recipe_id'] == 'user-quality']
                self.assertTrue({'equipment_as_ingredient', 'invalid_text_array'} <= {issue['code'] for issue in matches})
                with app.connect() as db:
                    self.assertEqual(db.execute('SELECT name FROM ingredients WHERE recipe_id=? AND position=1', ('user-quality',)).fetchone()[0], '冰箱')
                    self.assertEqual(db.execute('SELECT tags FROM recipes WHERE id=?', ('user-quality',)).fetchone()[0], 'invalid json')

    def test_no_database_is_created_and_no_input_array_is_assumed(self):
        with tempfile.TemporaryDirectory(prefix='shiwei-quality-missing-') as tmp:
            missing = Path(tmp) / 'missing.db'
            with patch.object(app, 'DB_PATH', missing):
                with self.assertRaises(app.AppError):
                    kitchen_quality.audit_catalogue(app)
                self.assertFalse(missing.exists())
        with self.assertRaises(app.AppError):
            self.audit({'recipes': []})
        report = self.audit([])
        self.assertEqual(report['catalogue_count'], 0)
        self.assertEqual(report['summary']['errors'], 0)

    def test_issue_cap_keeps_true_counts_and_mixed_optional_amounts_do_not_crash(self):
        recipe = copy.deepcopy(self.recipe)
        recipe['ingredients'] += [{'name': '番茄', 'quantity': None, 'unit': '个'}]
        self.assertEqual(self.audit([recipe])['summary']['errors'], 0)
        recipe['ingredients'][0]['quantity'] = 10 ** 500
        report = self.audit([recipe])
        self.assertIn('invalid_quantity', [issue['code'] for issue in report['issues']])
        with patch.object(kitchen_quality, 'MAX_ISSUES', 2):
            report = self.audit([None, None, None])
        self.assertEqual(len(report['issues']), 2)
        self.assertTrue(report['truncated'])
        self.assertEqual(report['issue_total'], 3)
        self.assertEqual(report['summary']['errors'], 3)


if __name__ == '__main__':
    unittest.main()
