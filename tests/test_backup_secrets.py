"""Secret-safe backups against a small, isolated database and synthetic keys."""
import copy
from contextlib import contextmanager
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
from kitchen_secrets import REDACTED, redact_data


class IsolatedBackupApp:
    AppError = app.AppError
    validate_recipe = staticmethod(app.validate_recipe)
    validate_context = staticmethod(app.validate_context)
    validate_pantry_item = staticmethod(app.validate_pantry_item)

    def __init__(self, root, secrets):
        self.ROOT = Path(root)
        self.DB_PATH = self.ROOT / 'isolated.db'
        self._secrets = secrets

    @property
    def CONFIG(self):
        raise AssertionError('Backup must not read configuration directly')

    @property
    def ENV_PATH(self):
        raise AssertionError('Backup must not read an environment file')

    def secret_values(self):
        return self._secrets

    def redact_public(self, value):
        return redact_data(value, secrets=self.secret_values())

    @contextmanager
    def connect(self):
        connection = sqlite3.connect(self.DB_PATH)
        connection.row_factory = sqlite3.Row
        try:
            with connection:
                yield connection
        finally:
            connection.close()


class BackupSecretTests(unittest.TestCase):
    KEY = 'opaque-backup-synthetic-credential-123456'
    OLD_KEY = 'opaque-retired-synthetic-credential-654321'
    PATTERN_KEY = 'sk-backupsyntheticcredential00000000000000'
    URL_TOKEN = 'unknown-url-synthetic-token-234567'
    JSON_SECRET = 'unknown-json-synthetic-password-345678'
    SESSION = '12345678123456781234567812345678'
    PANTRY = 'pantry-12345678123456781234567812345678'

    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='shiwei-backup-secret-tests-')
        self.fake = IsolatedBackupApp(self.temp.name, (self.KEY, self.OLD_KEY))
        (self.fake.ROOT / 'VERSION').write_text('1.0.0', encoding='utf-8')
        with self.fake.connect() as db:
            for name, columns in kitchen_backup.TABLE_COLUMNS.items():
                declarations = []
                for column in columns:
                    if name == 'messages' and column == 'id':
                        declaration = 'id INTEGER PRIMARY KEY AUTOINCREMENT'
                    else:
                        integer = column in kitchen_backup.INTEGER_FIELDS and not (
                            column == 'id' and name not in ('sources', 'messages'))
                        kind = 'INTEGER' if integer or column == 'web_search' else 'REAL' if column == 'quantity' else 'TEXT'
                        declaration = column + ' ' + kind
                    declarations.append(declaration)
                db.execute('CREATE TABLE ' + name + '(' + ','.join(declarations) + ')')
            recipe = app.normalize_personal_recipe({'id': 'user-secret-test', 'name': '测试豆腐',
                'region': '东方', 'diet': 'vegan', 'minutes': 10, 'servings': 2,
                'ingredients': ['豆腐'], 'steps': ['将豆腐炒熟。']})
            rows = {name: [] for name in kitchen_backup.TABLE_COLUMNS}
            rows['sources'] = [{'id': 1, 'name': '我的厨房', 'title': '测试菜谱',
                                'url': 'personal:user-secret-test', 'retrieved_at': '2021-01-01'}]
            rows['recipes'] = [{column: 1 if column == 'source_id' else
                               json.dumps(recipe[column], ensure_ascii=False) if column in ('tags', 'allergens', 'equipment') else
                               recipe[column] for column in kitchen_backup.TABLE_COLUMNS['recipes']}]
            rows['ingredients'] = [{'recipe_id': recipe['id'], 'position': 0, 'name': '豆腐', 'quantity': None, 'unit': ''}]
            rows['steps'] = [{'recipe_id': recipe['id'], 'position': 0, 'instruction': '将豆腐炒熟。'}]
            rows['sessions'] = [{'id': self.SESSION, 'title': '测试历史', 'created_at': '2021-01-01 01:02:03',
                                 'updated_at': '2021-01-01 01:02:03', 'constraints': '{}'}]
            rows['messages'] = [{'id': 42, 'session_id': self.SESSION, 'role': 'user', 'content': '测试内容',
                'mode': None, 'sources': '[]', 'context': '{}', 'created_at': '2021-01-01 01:02:03',
                'web_sources': '[]', 'web_search': 0}]
            rows['pantry'] = [{'id': self.PANTRY, 'name': '豆腐', 'quantity': 1.0, 'unit': '块',
                'category': '豆制品', 'storage': '冷藏', 'expires_on': '', 'opened_on': '', 'notes': '',
                'created_at': '2021-01-01 01:02:03', 'updated_at': '2021-01-01 01:02:03'}]
            for name, values in rows.items():
                kitchen_backup._insert_table(db, name, values)

    def tearDown(self):
        self.temp.cleanup()

    def assert_no_credentials(self, value):
        serialized = json.dumps(value, ensure_ascii=False)
        for secret in (self.KEY, self.OLD_KEY, self.PATTERN_KEY, self.URL_TOKEN, self.JSON_SECRET):
            self.assertNotIn(secret, serialized)

    def raw_snapshot(self):
        safe = kitchen_backup.export_backup(self.fake, {})
        with self.fake.connect() as db:
            safe['tables'] = kitchen_backup._tables(db)
        return safe

    def seed_sensitive_text(self):
        with self.fake.connect() as db:
            db.execute('UPDATE sessions SET title=?, constraints=?', (
                '密钥 ' + self.KEY,
                json.dumps({'topic': '旧密钥 ' + self.OLD_KEY, 'values': {'ingredients': self.KEY}}, ensure_ascii=False)))
            db.execute('UPDATE messages SET content=?, context=?, sources=?', (
                '用户粘贴 ' + self.PATTERN_KEY + ' 和 ' + self.KEY +
                '\n' + json.dumps({'password': self.JSON_SECRET}),
                json.dumps({'ingredients': self.OLD_KEY}),
                json.dumps([{'id': 'user-secret-test', 'name': '来源 ' + self.KEY,
                             'url': 'https://example.com/recipe?access_token=' + self.URL_TOKEN}])) )
            db.execute('UPDATE recipes SET description=?, tags=?', (self.KEY, json.dumps([self.OLD_KEY])))
            db.execute('UPDATE steps SET instruction=?', ('请勿公开 ' + self.KEY,))
            db.execute('UPDATE pantry SET notes=?', ('Authorization: Bearer ' + self.OLD_KEY,))

    def test_export_redacts_all_user_text_and_json_preferences_without_changing_live_database(self):
        self.seed_sensitive_text()
        backup = kitchen_backup.export_backup(self.fake, {'preferences': {
            'context': {'ingredients': self.KEY, 'avoid': self.OLD_KEY, 'time': '15'},
            'api_key': self.KEY}})
        self.assert_no_credentials(backup)
        self.assertIn(REDACTED, backup['tables']['messages'][0]['content'])
        self.assertEqual(json.loads(backup['tables']['recipes'][0]['tags']), [REDACTED])
        self.assertEqual(backup['tables']['messages'][0]['id'], 42)
        self.assertEqual(backup['tables']['messages'][0]['session_id'], self.SESSION)
        self.assertEqual(backup['tables']['pantry'][0]['quantity'], 1.0)
        self.assertEqual(backup['preferences']['context']['time'], '15')
        self.assertEqual(backup['preferences']['context']['ingredients'], REDACTED)
        with self.fake.connect() as db:
            self.assertIn(self.KEY, db.execute('SELECT content FROM messages').fetchone()[0])

    def test_import_sanitizes_persisted_rows_and_rollback_file_before_any_file_write(self):
        self.seed_sensitive_text()
        imported = self.raw_snapshot()
        original = copy.deepcopy(imported)
        result = kitchen_backup.restore_backup(self.fake, {'backup': imported, 'dry_run': False,
            'current_preferences': {'context': {'ingredients': self.OLD_KEY}}})
        self.assertEqual(imported, original)
        self.assert_no_credentials(result)
        rollback = self.fake.ROOT / 'backups' / result['rollback_backup_id']
        persisted = json.loads(rollback.read_text(encoding='utf-8'))
        self.assert_no_credentials(persisted)
        self.assertEqual(persisted, result['rollback_backup'])
        with self.fake.connect() as db:
            restored = kitchen_backup._tables(db)
        self.assert_no_credentials(restored)
        self.assertEqual(result['counts'], kitchen_backup._counts(original['tables']))
        self.assertEqual(restored['messages'][0]['id'], 42)
        self.assertEqual(restored['sessions'][0]['id'], self.SESSION)

    def test_direct_rollback_write_is_safe_and_fallback_uses_registry(self):
        self.seed_sensitive_text()
        raw = self.raw_snapshot()
        with patch.object(self.fake, 'redact_public', None):
            filename = kitchen_backup._write_rollback(self.fake, raw)
        content = json.loads((self.fake.ROOT / 'backups' / filename).read_text(encoding='utf-8'))
        self.assert_no_credentials(content)

    def test_malformed_sensitive_import_is_rejected_before_sanitization_or_writes(self):
        before = kitchen_backup.export_backup(self.fake, {})
        invalid = copy.deepcopy(before)
        invalid['tables']['messages'][0]['context'] = json.dumps({'api_key': self.KEY})
        with patch.object(self.fake, 'redact_public', side_effect=AssertionError('Validation must run first')):
            with self.assertRaises(app.AppError):
                kitchen_backup.restore_backup(self.fake, {'backup': invalid, 'dry_run': False})
        self.assertFalse((self.fake.ROOT / 'backups').exists())
        self.assertEqual(before['tables'], kitchen_backup.export_backup(self.fake, {})['tables'])

    def test_credentials_in_valid_structural_identity_are_rejected_without_changing_ids(self):
        before = kitchen_backup.export_backup(self.fake, {})
        with patch.object(self.fake, 'secret_values', return_value=(self.SESSION,)):
            with self.assertRaises(app.AppError):
                kitchen_backup.restore_backup(self.fake, {'backup': before, 'dry_run': False})
        self.assertFalse((self.fake.ROOT / 'backups').exists())
        self.assertEqual(before['tables'], kitchen_backup.export_backup(self.fake, {})['tables'])

    def test_legacy_import_is_sanitized_after_schema_upgrade(self):
        legacy = kitchen_backup.export_backup(self.fake, {})
        legacy['format_version'] = 1
        message = legacy['tables']['messages'][0]
        message.pop('web_sources')
        message.pop('web_search')
        message['content'] = self.KEY
        kitchen_backup.restore_backup(self.fake, {'backup': legacy, 'dry_run': False})
        restored = kitchen_backup.export_backup(self.fake, {})
        self.assert_no_credentials(restored)
        self.assertEqual(restored['tables']['messages'][0]['content'], REDACTED)
        self.assertEqual(restored['tables']['messages'][0]['web_sources'], '[]')


if __name__ == '__main__':
    unittest.main()
