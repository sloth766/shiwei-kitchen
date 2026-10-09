"""Synthetic credential sentinels only; no settings or real user files read."""
import base64
import copy
import html
import json
from pathlib import Path
import sys
import unittest
from urllib.parse import parse_qs, quote, quote_plus, unquote, urlsplit

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from kitchen_secrets import REDACTED, is_sensitive_field, redact_data, redact_text
from kitchen_web import safe_public_url


class SecretRedactionTests(unittest.TestCase):
    KEY = 'opaque-backup-\"<>&/中文-synthetic-key123'
    OPAQUE = 'opaque-synthetic-key-without-provider-prefix-123456'

    def test_known_literal_html_json_url_and_base64_variants(self):
        variants = (
            self.KEY, html.escape(self.KEY), quote(self.KEY, safe=''), quote_plus(self.KEY),
            json.dumps(self.KEY, ensure_ascii=False)[1:-1],
            json.dumps(self.KEY, ensure_ascii=True)[1:-1],
            base64.b64encode(self.KEY.encode()).decode(),
            base64.urlsafe_b64encode(self.KEY.encode()).decode(),
        )
        for variant in variants:
            with self.subTest(variant_type=variants.index(variant)):
                cleaned = redact_text('before ' + variant + ' after', secrets=(self.KEY,))
                self.assertNotIn(variant, cleaned)
                self.assertEqual(cleaned, 'before ' + REDACTED + ' after')

    def test_opaque_known_key_is_removed_without_provider_pattern(self):
        self.assertEqual(redact_text(self.OPAQUE, secrets=(self.OPAQUE,)), REDACTED)
        self.assertEqual(redact_text('normal text', secrets=(None, '', REDACTED)), 'normal text')

    def test_known_base64_without_optional_padding_is_removed(self):
        key = 'opaque-unpadded-base64-synthetic-12345'
        for encode in (base64.b64encode, base64.urlsafe_b64encode):
            encoded = encode(key.encode()).decode().rstrip('=')
            self.assertEqual(redact_text(encoded, secrets=(key,)), REDACTED)

    def test_provider_token_patterns_without_known_registry(self):
        sentinels = (
            'sk-' + 'A' * 32, 'sk-proj-' + 'B' * 32, 'sk-ant-api03-' + 'C' * 32,
            'ghp_' + 'D' * 36, 'github_pat_' + 'E' * 60,
            'xoxb-' + '1234567890-' * 3 + 'synthetic', 'AIza' + 'F' * 35,
            'AKIA' + 'G' * 16, 'ASIA' + 'H' * 16,
            'eyJ' + 'I' * 16 + '.' + 'J' * 16 + '.' + 'K' * 16,
        )
        for sentinel in sentinels:
            with self.subTest(prefix=sentinel[:14]):
                self.assertEqual(redact_text(sentinel), REDACTED)

    def test_complete_private_key_blocks_are_removed(self):
        for family in ('PRIVATE KEY', 'RSA PRIVATE KEY', 'EC PRIVATE KEY', 'OPENSSH PRIVATE KEY'):
            text = 'before\n-----BEGIN ' + family + '-----\nSYNTHETIC_PRIVATE_KEY_BODY\n-----END ' + family + '-----\nafter'
            cleaned = redact_text(text)
            self.assertEqual(cleaned, 'before\n' + REDACTED + '\nafter')

    def test_truncated_private_key_block_is_removed(self):
        text = '-----BEGIN PRIVATE KEY-----\nSYNTHETIC_INCOMPLETE_PRIVATE_BODY'
        self.assertNotIn('SYNTHETIC_INCOMPLETE_PRIVATE_BODY', redact_text(text))

    def test_sensitive_dict_fields_and_normalized_aliases(self):
        names = ('api_key', 'API-KEY', ' X API KEY ', 'AWS_SECRET_ACCESS_KEY', 'access_token',
                 'refreshToken', 'Authorization', 'Cookie', 'Set-Cookie', 'client_secret',
                 'private_key', 'password', 'credentials', '密钥', '密码', '令牌')
        for name in names:
            with self.subTest(name=name):
                self.assertTrue(is_sensitive_field(name))
                self.assertEqual(redact_data({name: 'synthetic-sensitive-value'}), {name: REDACTED})
        self.assertEqual(redact_data({'api_key': '', 'password': None}), {'api_key': '', 'password': None})

    def test_basic_and_bearer_authorization_are_removed(self):
        basic = base64.b64encode(b'synthetic-user:synthetic-password').decode()
        cases = ('Bearer synthetic-bearer-token-123456', 'Basic ' + basic,
                 'Authorization: Bearer synthetic-bearer-token-123456',
                 'Authorization: Basic ' + basic)
        for text in cases:
            with self.subTest(kind=text[:20]):
                cleaned = redact_text(text)
                self.assertNotIn('synthetic-bearer-token-123456', cleaned)
                self.assertNotIn(basic, cleaned)
                self.assertIn(REDACTED, cleaned)

    def test_short_authorization_token_does_not_leave_credential_suffix(self):
        self.assertNotIn('tiny', redact_text('Authorization: Bearer tiny'))
        self.assertNotIn('dTpw', redact_text('Authorization: Basic dTpw'))

    def test_authorization_headers_with_other_schemes_are_fully_hidden(self):
        headers = ('Authorization: CustomScheme synthetic-other-auth-secret',
                   'Proxy-Authorization: CustomScheme synthetic-other-auth-secret',
                   'Authorization: Digest username="synthetic-user", response="synthetic-other-auth-secret"',
                   'Authorization: AWS4-HMAC-SHA256 Credential=synthetic-user, Signature=synthetic-other-auth-secret')
        for header in headers:
            with self.subTest(scheme=header.split(':', 1)[1].split()[0]):
                once = redact_text(header)
                self.assertNotIn('synthetic-other-auth-secret', once)
                self.assertEqual(redact_text(once), once)

    def test_unknown_credential_headers_and_assignment_aliases_are_removed(self):
        cases = (
            'Cookie: session=synthetic-cookie-token-12345; theme=light',
            'Set-Cookie: session=synthetic-cookie-token-12345; HttpOnly',
            'ACCESS_KEY=synthetic-cookie-token-12345',
            'AWS_ACCESS_KEY_ID=synthetic-cookie-token-12345',
            'credential=synthetic-cookie-token-12345',
        )
        for text in cases:
            with self.subTest(prefix=text.split(':')[0].split('=')[0]):
                self.assertNotIn('synthetic-cookie-token-12345', redact_text(text))

    def test_credential_assignment_with_a_url_value_does_not_bypass_label_protection(self):
        cases = ('password="https://example.com/synthetic-url-valued-secret"',
                 'api_key=https://example.com/synthetic-url-valued-secret',
                 'Cookie: session=https://example.com/synthetic-url-valued-secret')
        for text in cases:
            with self.subTest(prefix=text.split(':')[0].split('=')[0]):
                self.assertNotIn('synthetic-url-valued-secret', redact_text(text))

    def test_json_string_remains_valid_and_nested_secret_field_is_removed(self):
        value = json.dumps({'topic': '豆腐', 'nested': [{'api_key': self.OPAQUE}], 'servings': 2})
        cleaned = redact_data(value)
        decoded = json.loads(cleaned)
        self.assertEqual(decoded['nested'][0]['api_key'], REDACTED)
        self.assertEqual(decoded['topic'], '豆腐')
        self.assertEqual(decoded['servings'], 2)

    def test_credential_url_userinfo_and_query_are_removed_and_link_stays_valid(self):
        text = 'https://synthetic-user:synthetic-password@example.com/recipe?access_token=synthetic-query-token&servings=2'
        cleaned = redact_text(text)
        self.assertNotIn('synthetic-user', cleaned)
        self.assertNotIn('synthetic-password', cleaned)
        self.assertNotIn('synthetic-query-token', cleaned)
        self.assertTrue(safe_public_url(cleaned))
        self.assertEqual(urlsplit(cleaned).hostname, 'example.com')
        self.assertEqual(parse_qs(urlsplit(cleaned).query)['servings'], ['2'])
        self.assertEqual(parse_qs(urlsplit(cleaned).query)['access_token'], [REDACTED])

    def test_url_opaque_key_in_path_query_and_fragment_is_encoded_and_hidden(self):
        urls = (
            'https://example.com/recipe/' + quote(self.OPAQUE),
            'https://example.com/recipe?note=' + quote(self.OPAQUE),
            'https://example.com/recipe#' + quote(self.OPAQUE),
            'https://example.com/recipe#access_token=synthetic-fragment-token',
        )
        for url in urls:
            with self.subTest(component=url.split('/recipe')[-1][:20]):
                cleaned = redact_text(url, secrets=(self.OPAQUE,))
                self.assertNotIn(self.OPAQUE, unquote(cleaned))
                self.assertNotIn('synthetic-fragment-token', cleaned)
                self.assertIn(REDACTED, unquote(cleaned))
                self.assertNotIn(REDACTED, cleaned)
                self.assertTrue(safe_public_url(cleaned))

    def test_nested_credential_urls_in_query_path_and_fragment_are_safe_and_idempotent(self):
        inner = 'https://nested.example.com/recipe?access_token=synthetic-nested-url-token&servings=2'
        encoded = quote(inner, safe='')
        outer_urls = ('https://example.com/redirect?next=' + encoded,
                      'https://example.com/redirect/' + encoded,
                      'https://example.com/redirect#' + encoded)
        for outer in outer_urls:
            with self.subTest(location=outer.split('/redirect')[-1][:12]):
                once = redact_text(outer)
                self.assertNotIn('synthetic-nested-url-token', unquote(unquote(once)))
                self.assertEqual(redact_text(once), once)
                self.assertTrue(safe_public_url(once))
                self.assertNotIn(REDACTED, once)

    def test_deep_nested_credential_url_fails_closed_before_recursion_limit(self):
        nested = 'https://nested.example.com/?access_token=synthetic-deep-url-token'
        for _ in range(12):
            nested = 'https://example.com/redirect?next=' + quote(nested, safe='')
        once = redact_text(nested)
        repeatedly_decoded = once
        for _ in range(16):
            repeatedly_decoded = unquote(repeatedly_decoded)
        self.assertNotIn('synthetic-deep-url-token', repeatedly_decoded)
        self.assertEqual(redact_text(once), once)
        self.assertTrue(safe_public_url(once))

    def test_multiple_percent_encoding_does_not_hide_registered_credentials(self):
        key = 'opaque/secret+credential=synthetic-1234'
        encoded = key
        for _ in range(3):
            encoded = quote(encoded, safe='')
        urls = ('https://example.com/recipe/' + encoded,
                'https://example.com/recipe?note=' + encoded,
                'https://example.com/recipe#' + encoded)
        for url in urls:
            with self.subTest(location=url.split('/recipe')[-1][:8]):
                cleaned = redact_text(url, secrets=(key,))
                decoded = cleaned
                for _ in range(5):
                    decoded = unquote(decoded)
                self.assertNotIn(key, decoded)
                self.assertEqual(redact_text(cleaned, secrets=(key,)), cleaned)
                self.assertTrue(safe_public_url(cleaned))

    def test_known_key_in_hostname_fails_closed(self):
        self.assertEqual(redact_text('https://' + self.OPAQUE + '.example.com/x', (self.OPAQUE,)), REDACTED)

    def test_malformed_sensitive_url_fails_closed(self):
        self.assertNotIn('synthetic-malformed-token', redact_text('https://[broken?token=synthetic-malformed-token'))
        for name in ('sig', 'signature', 'sessionid', 'key'):
            with self.subTest(query_field=name):
                self.assertNotIn('synthetic-malformed-token', redact_text('https://[broken?' + name + '=synthetic-malformed-token'))

    def test_ordinary_recipe_links_words_ids_and_scalar_types_are_preserved(self):
        ordinary_url = 'https://example.com/recipe?ingredients=tomato&servings=2#steps'
        self.assertEqual(redact_text(ordinary_url), ordinary_url)
        self.assertEqual(redact_text('Basic cooking uses ordinary pantry ingredients.'),
                         'Basic cooking uses ordinary pantry ingredients.')
        value = {'id': 'user-secret-test', 'recipe_id': 'tomato-eggs', 'name': '番茄豆腐',
                 'steps': ['放入一匙盐，煮 10 分钟。'], 'notes': 'secret sauce is a normal recipe phrase',
                 'quantity': 1.5, 'time': 10, 'servings': 2, 'use_pantry': False,
                 'numbers': [0, -2, 1.5, True, False, None]}
        cleaned = redact_data(value)
        self.assertEqual(cleaned, value)
        self.assertIs(type(cleaned['quantity']), float)
        self.assertIs(type(cleaned['time']), int)
        self.assertIs(type(cleaned['use_pantry']), bool)

    def test_redaction_is_idempotent_and_never_mutates_caller_values(self):
        value = {'messages': [{'content': self.OPAQUE, 'url': 'https://example.com/?api_key=' + self.OPAQUE}],
                 'password': 'another-synthetic-password', 'context': {'ingredients': '豆腐', 'servings': 2}}
        original = copy.deepcopy(value)
        once = redact_data(value, (self.OPAQUE,))
        twice = redact_data(once, (self.OPAQUE,))
        self.assertEqual(once, twice)
        self.assertEqual(value, original)
        self.assertIsNot(once, value)
        self.assertIsNot(once['messages'], value['messages'])
        self.assertIsNot(once['messages'][0], value['messages'][0])


if __name__ == '__main__':
    unittest.main()
