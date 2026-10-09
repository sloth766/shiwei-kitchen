"""Full-state backups use isolated SQLite files; no live settings are read."""
import copy
import json
from pathlib import Path
import sqlite3
import sys
import tempfile
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import app
import kitchen_backup


class BackupTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='shiwei-backup-tests-')
        self.original_db = app.DB_PATH
        app.DB_PATH = Path(self.temp.name) / 'kitchen.db'
        app.init_db()
        app.import_personal_recipes({'recipes': [{'id': 'user-backup-personal', 'name': '备份测试豆腐',
            'region': '东方', 'diet': 'vegan', 'minutes': 10, 'servings': 2,
            'ingredients': ['豆腐'], 'steps': ['将豆腐炒熟。']}]})
        with app.connect() as db:
            db.execute("INSERT INTO sessions(id,title,created_at,updated_at,constraints) VALUES(?,?,?,?,?)",
                       ('12345678123456781234567812345678', '历史问题', '2021-01-02 03:04:05', '2021-01-03 03:04:05',
                        json.dumps({'values': {'time': 15}, 'input': {}, 'topic': '咖喱'})))
            db.execute("INSERT INTO messages(id,session_id,role,content,mode,sources,context,created_at) VALUES(?,?,?,?,?,?,?,?)",
                       (42, '12345678123456781234567812345678', 'assistant', '没有匹配菜谱', 'local', '[]', '{"time":15}', '2021-01-03 03:04:05'))
            db.execute("INSERT INTO messages(id,session_id,role,content,mode,sources,context,created_at) VALUES(?,?,?,?,?,?,?,?)",
                       (47, '12345678123456781234567812345678', 'assistant', '番茄炒蛋', 'local',
                        '[{"id":"tomato-eggs","name":"番茄炒蛋","url":"https://example.com/recipe"}]', '{}', '2021-01-04 03:04:05'))
            db.execute("INSERT INTO favorites(recipe_id,created_at) VALUES('tomato-eggs','2021-01-02 03:04:05')")
            db.execute("INSERT INTO pantry(id,name,quantity,unit,category,storage,expires_on,opened_on,notes,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
                       ('pantry-12345678123456781234567812345678', '番茄', 0, '个', '蔬菜', '冷藏', '2021-01-01', '2020-12-25', '历史耗尽库存', '2020-12-25 01:02:03', '2021-01-01 01:02:03'))
        self.preferences = {
            'context': {'time': '15', 'ingredients': '虾', 'use_pantry': True},
            'cooking': {'tomato-eggs': {'version': 1, 'stepsVersion': 'v1-test-100',
                'completed': [0], 'currentStep': 1,
                'timer': {'durationMs': 60000, 'remainingMs': 30000, 'targetAt': None, 'status': 'paused'}}},
        }

    def tearDown(self):
        app.DB_PATH = self.original_db
        self.temp.cleanup()

    def snapshot(self):
        return kitchen_backup.export_backup(app, {'preferences': self.preferences})

    def test_round_trip_preserves_every_table_identity_order_dates_and_preferences(self):
        before = self.snapshot()
        with app.connect() as db:
            db.execute("DELETE FROM sessions")
            db.execute("DELETE FROM favorites")
            db.execute("UPDATE pantry SET quantity=4")
        current = kitchen_backup.export_backup(app, {'preferences': {'context': {'time': '60'}}})
        preview = kitchen_backup.restore_backup(app, {'backup': before, 'dry_run': True})
        self.assertTrue(preview['dry_run'])
        self.assertEqual(preview['counts']['messages'], 2)
        self.assertEqual(preview['existing_counts']['messages'], 0)
        restored = kitchen_backup.restore_backup(app, {'backup': before, 'dry_run': False,
            'current_preferences': {'context': {'time': '60'}}})
        after = self.snapshot()
        self.assertEqual(after['tables'], before['tables'])
        self.assertEqual(after['preferences'], before['preferences'])
        self.assertEqual(restored['preferences'], self.preferences)
        rollback = Path(app.DB_PATH.parent, 'backups', restored['rollback_backup_id'])
        self.assertTrue(rollback.is_file())
        persisted = json.loads(rollback.read_text(encoding='utf-8'))
        self.assertEqual(persisted, restored['rollback_backup'])
        self.assertEqual(persisted['tables'], current['tables'])
        self.assertEqual(persisted['preferences']['context']['time'], '60')
        self.assertEqual(app.read_session('12345678123456781234567812345678')['messages'][0]['match_status'], 'no_match')
        with app.connect() as db:
            row = dict(db.execute('SELECT * FROM pantry').fetchone())
            self.assertEqual(row['created_at'], '2020-12-25 01:02:03')
            self.assertEqual(row['expires_on'], '2021-01-01')

    def test_dry_run_is_read_only_and_requires_explicit_false_to_replace(self):
        before = self.snapshot()
        preview = kitchen_backup.restore_backup(app, {'backup': before})
        self.assertTrue(preview['dry_run'])
        self.assertFalse(Path(app.DB_PATH.parent, 'backups').exists())
        self.assertEqual(before['tables'], self.snapshot()['tables'])
        for invalid in ('false', 0, None):
            with self.subTest(invalid=invalid), self.assertRaises(app.AppError):
                kitchen_backup.restore_backup(app, {'backup': before, 'dry_run': invalid})

    def test_invalid_backups_never_change_original_data(self):
        before = self.snapshot()
        changes = [
            lambda b: b.update(format_version=999),
            lambda b: b['tables']['recipes'][0].update(minutes=True),
            lambda b: b['tables']['recipes'][0].update(tags='not-json'),
            lambda b: b['tables']['messages'][0].update(session_id='missing'),
            lambda b: b['tables']['messages'][1].update(sources='[{"id":"missing","name":"missing","url":""}]'),
            lambda b: b['tables']['ingredients'][0].update(recipe_id='missing'),
            lambda b: b['tables']['ingredients'][0].update(position=99999),
            lambda b: b['tables']['pantry'][0].update(quantity=float('nan')),
            lambda b: b['tables']['favorites'].append(dict(b['tables']['favorites'][0])),
            lambda b: b['tables']['sessions'][0].update(constraints='{"values": []}'),
            lambda b: b['tables']['sessions'][0].update(constraints='{"values":{"time":"15"}}'),
            lambda b: b['tables']['sessions'][0].update(constraints='{"input":{"api_key":"secret"}}'),
            lambda b: b['tables']['messages'][0].update(context='{"api_key":"secret"}'),
            lambda b: b['tables']['messages'][0].update(context='{"pantry":{"api_key":"secret"}}'),
            lambda b: b['tables']['pantry'][0].update(id='invalid-stock'),
            lambda b: b['tables']['sources'][0].update(url='https://['),
            lambda b: b['preferences']['cooking']['tomato-eggs']['completed'].append(99999),
            lambda b: b['preferences']['cooking']['tomato-eggs']['timer'].update(status='running', targetAt=None),
            lambda b: b['preferences']['cooking']['tomato-eggs']['timer'].update(durationMs=0, remainingMs=0),
            lambda b: b['preferences']['cooking']['tomato-eggs']['timer'].update(durationMs=60000.5),
            lambda b: b['tables'].update(unexpected=[]),
        ]
        for change in changes:
            damaged = copy.deepcopy(before)
            change(damaged)
            with self.subTest(change=change), self.assertRaises(app.AppError):
                kitchen_backup.restore_backup(app, {'backup': damaged, 'dry_run': False})
            self.assertEqual(before['tables'], self.snapshot()['tables'])
        self.assertFalse(Path(app.DB_PATH.parent, 'backups').exists())

    def test_failed_rollback_file_write_prevents_any_database_write(self):
        before = self.snapshot()
        replacement = copy.deepcopy(before)
        replacement['tables']['sessions'][0]['title'] = '替换标题'
        with patch.object(kitchen_backup, '_write_rollback', side_effect=OSError('disk full')):
            with self.assertRaises(app.AppError):
                kitchen_backup.restore_backup(app, {'backup': replacement, 'dry_run': False})
        self.assertEqual(before['tables'], self.snapshot()['tables'])

    def test_failed_insert_rolls_back_replacement_and_keeps_rollback_file(self):
        before = self.snapshot()
        replacement = copy.deepcopy(before)
        replacement['tables']['sessions'][0]['title'] = '替换标题'
        original_insert = kitchen_backup._insert_table
        def fail_late(db, table, rows):
            if table == 'messages':
                raise sqlite3.IntegrityError('simulated disk/database failure')
            return original_insert(db, table, rows)
        with patch.object(kitchen_backup, '_insert_table', side_effect=fail_late):
            with self.assertRaises(app.AppError):
                kitchen_backup.restore_backup(app, {'backup': replacement, 'dry_run': False})
        self.assertEqual(before['tables'], self.snapshot()['tables'])
        self.assertEqual(len(list(Path(app.DB_PATH.parent, 'backups').glob('*.json'))), 1)

    def test_never_reads_configuration_and_drops_unknown_browser_preferences(self):
        body = {'preferences': {**self.preferences, 'api_key': 'SECRET-FROM-BROWSER',
                               'model': 'secret-model', 'arbitrary': {'credential': 'secret'}}}
        with patch.object(app, 'CONFIG', {'api_key': 'SECRET-FROM-CONFIG'}), \
             patch.object(app, 'ENV_PATH', Path(self.temp.name, 'secret-not-readable.env')):
            backup = kitchen_backup.export_backup(app, body)
        serialized = json.dumps(backup)
        self.assertNotIn('SECRET-FROM', serialized)
        self.assertNotIn('secret-model', serialized)
        self.assertEqual(backup['preferences'], self.preferences)
        self.assertNotIn('config', backup)

    def test_oversized_payload_is_rejected_before_backup_file_or_database_writes(self):
        before = self.snapshot()
        with patch.object(kitchen_backup, 'MAX_BACKUP_BYTES', 100):
            with self.assertRaises(app.AppError) as raised:
                kitchen_backup.restore_backup(app, {'backup': before, 'dry_run': False})
        self.assertEqual(raised.exception.status, 413)
        self.assertEqual(before['tables'], self.snapshot()['tables'])
        self.assertFalse(Path(app.DB_PATH.parent, 'backups').exists())

    def test_historical_missing_recipe_reference_is_explicit_and_preserved(self):
        with app.connect() as db:
            db.execute("UPDATE messages SET sources=? WHERE id=47",
                       ('[{"id":"previously-deleted-recipe","name":"已删除的旧菜谱","url":""}]',))
        before = self.snapshot()
        self.assertEqual(before['unavailable_recipe_ids'], ['previously-deleted-recipe'])
        preview = kitchen_backup.restore_backup(app, {'backup': before})
        self.assertTrue(preview['warnings'])
        restored = kitchen_backup.restore_backup(app, {'backup': before, 'dry_run': False})
        self.assertTrue(restored['warnings'])
        self.assertEqual(before['tables'], self.snapshot()['tables'])
        damaged = copy.deepcopy(before)
        damaged['unavailable_recipe_ids'] = []
        with self.assertRaises(app.AppError):
            kitchen_backup.restore_backup(app, {'backup': damaged, 'dry_run': False})

    def test_restored_catalogue_survives_restart_without_rewriting_import_metadata(self):
        backup = self.snapshot()
        backup['tables']['recipes'][0]['description'] = '从旧备份完整恢复的菜谱说明'
        backup['tables']['data_imports'][0]['checksum'] = 'a' * 64
        kitchen_backup.restore_backup(app, {'backup': backup, 'dry_run': False})
        app.init_db()
        after = self.snapshot()
        self.assertEqual(after['tables'], backup['tables'])

    def test_preserves_stale_cooking_version_for_explicit_reset_in_ui(self):
        self.preferences['cooking']['tomato-eggs']['stepsVersion'] = 'v1-before-recipe-edit'
        self.preferences['cooking']['tomato-eggs']['completed'] = [0, 90]
        self.preferences['cooking']['tomato-eggs']['currentStep'] = 90
        backup = self.snapshot()
        result = kitchen_backup.restore_backup(app, {'backup': backup, 'dry_run': False})
        self.assertEqual(result['preferences'], self.preferences)

    def test_empty_restored_database_stays_empty_after_restart(self):
        backup = self.snapshot()
        backup['tables'] = {name: [] for name in backup['tables']}
        backup['preferences'] = {}
        kitchen_backup.restore_backup(app, {'backup': backup, 'dry_run': False})
        app.init_db()
        after = kitchen_backup.export_backup(app, {})
        self.assertEqual(after['tables'], backup['tables'])

    def test_ids_must_remain_usable_by_session_and_personal_recipe_routes(self):
        backup = self.snapshot()
        backup['tables']['sessions'][0]['id'] = 'invalid-session'
        for row in backup['tables']['messages']:
            row['session_id'] = 'invalid-session'
        with self.assertRaises(app.AppError):
            kitchen_backup.restore_backup(app, {'backup': backup})
        backup = self.snapshot()
        backup['tables']['personal_recipes'].append({'recipe_id': 'tomato-eggs', 'created_at': '2021-01-02 03:04:05'})
        with self.assertRaises(app.AppError):
            kitchen_backup.restore_backup(app, {'backup': backup})

    def test_real_pantry_message_snapshot_round_trips_and_rejects_nested_unknown_fields(self):
        app.save_pantry_item({'name': '豆腐', 'quantity': 1, 'unit': '块'})
        app.save_pantry_item({'name': '旧豆腐', 'quantity': 1, 'unit': '块', 'expires_on': '2020-01-01'})
        saved_context = {**app.validate_context({}), 'pantry': app.pantry_context()}
        with app.connect() as db:
            db.execute('UPDATE messages SET context=? WHERE id=42', (json.dumps(saved_context),))
        backup = self.snapshot()
        kitchen_backup.restore_backup(app, {'backup': backup, 'dry_run': False})
        self.assertEqual(backup['tables'], self.snapshot()['tables'])
        context = json.loads(backup['tables']['messages'][0]['context'])
        context['pantry']['counts']['api_key'] = 'not-a-count'
        backup['tables']['messages'][0]['context'] = json.dumps(context)
        with self.assertRaises(app.AppError):
            kitchen_backup.restore_backup(app, {'backup': backup})


if __name__ == '__main__':
    unittest.main()
