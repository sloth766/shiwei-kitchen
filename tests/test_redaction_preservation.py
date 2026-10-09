"""Public recipe preservation and synthetic mid-response key rotation checks.

Only checked-in public JSON is read. Persistence uses an in-memory mock and
provider requests are mocked: no real .env, user database, paid API, or network.
"""
import contextlib
import copy
import json
from pathlib import Path
import sys
import unittest
from unittest.mock import MagicMock, patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import app
from kitchen_secrets import REDACTED, redact_data


PUBLIC_DATA = Path(__file__).resolve().parents[1] / 'data'
SYNTHETIC_KEY = 'opaque-synthetic-performance-credential-123456'


def different_paths(before, after, path=''):
    """Report paths only, so a failing assertion never prints candidate values."""
    if type(before) is not type(after):
        return [path + '/<type>']
    if isinstance(before, dict):
        if before.keys() != after.keys():
            return [path + '/<keys>']
        return [found for key in before
                for found in different_paths(before[key], after[key], path + '/' + str(key))]
    if isinstance(before, list):
        if len(before) != len(after):
            return [path + '/<length>']
        return [found for index, (left, right) in enumerate(zip(before, after))
                for found in different_paths(left, right, path + '/' + str(index))]
    return [] if before == after else [path]


class RedactionPreservationTests(unittest.TestCase):
    def test_all_public_recipe_bundles_preserve_ordinary_recipe_data(self):
        for filename in ('recipes.json', 'community-recipes.json',
                         'public-domain-recipes.json', 'forkrecipe-recipes.json'):
            with self.subTest(bundle=filename):
                original = json.loads((PUBLIC_DATA / filename).read_text(encoding='utf-8'))
                cleaned = redact_data(original, (SYNTHETIC_KEY,))
                changes = different_paths(original, cleaned, filename)
                self.assertFalse(changes, 'Ordinary recipe values changed at: ' + ', '.join(changes[:16]))

    def test_mid_response_key_rotation_redacts_complete_persisted_constraints(self):
        prior = 'opaque-synthetic-prior-credential-123456'
        replacement = 'opaque-synthetic-concurrent-credential-654321'
        db = MagicMock()
        provider_calls = []

        @contextlib.contextmanager
        def memory_connect():
            yield db

        def synthetic_model(messages, config, allow_tools=True):
            provider_calls.append(copy.deepcopy(messages))
            self.assertEqual(config['api_key'], prior)
            # No settings file is created: emulate a configuration change
            # becoming visible while this mocked provider response is pending.
            with app.CONFIG_LOCK:
                app.CONFIG['api_key'] = replacement
            return {'role': 'assistant', 'content': '将豆腐炒熟。 ' + replacement}

        body = {'message': '做一道豆腐菜 ' + replacement,
                'context': {'ingredients': '豆腐 ' + replacement, 'time': 20,
                            'servings': 2, 'equipment': '炒锅 ' + replacement}}
        original = copy.deepcopy(body)
        with (patch.dict(app.CONFIG, {'api_key': prior, 'model': app.DEFAULT_MODEL}, clear=True),
              patch.object(app, '_RETIRED_SECRETS', set()),
              patch.object(app, 'connect', memory_connect),
              patch.object(app, 'session_constraints', return_value={}),
              patch.object(app, 'search_recipes', return_value=[]),
              patch.object(app, 'deepseek_request', side_effect=synthetic_model)):
            result = app.handle_chat(body)

        self.assertTrue(provider_calls, 'The mocked mid-response rotation must execute.')
        self.assertEqual(body, original, 'The caller input must remain unchanged.')
        persisted = []
        constraints = None
        for call in db.execute.call_args_list:
            sql, arguments = call.args
            persisted.append(arguments)
            if sql.startswith('UPDATE sessions SET constraints='):
                constraints = json.loads(arguments[0])
        self.assertIsNotNone(constraints)
        serialized = json.dumps([persisted, result], ensure_ascii=False)
        self.assertFalse(prior in serialized, 'Prior synthetic credential persisted or returned.')
        self.assertFalse(replacement in serialized, 'Rotated synthetic credential persisted or returned.')
        self.assertIn(REDACTED, constraints['input']['ingredients'])
        self.assertIn(REDACTED, constraints['input']['equipment'])
        self.assertIn('豆腐', constraints['input']['ingredients'])
        self.assertEqual((constraints['input']['time'], constraints['input']['servings']), (20, 2))
        self.assertEqual((result['context']['time'], result['context']['servings']), (20, 2))


if __name__ == '__main__':
    unittest.main()
