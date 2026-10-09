"""DeepSeek Messages search contract; every HTTP operation is mocked."""
import io
import json
from pathlib import Path
import socket
import sys
import unittest
from unittest.mock import Mock, patch
import urllib.error
from urllib.parse import quote, urlsplit

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import app
import kitchen_web
from kitchen_secrets import REDACTED


class FakeResponse(io.BytesIO):
    status = 200


class WebSearchTests(unittest.TestCase):
    def setUp(self):
        self.config = {'api_key': 'test-sentinel-not-a-real-key', 'model': 'deepseek-flash'}

    def search(self, payload):
        raw = payload if isinstance(payload, bytes) else json.dumps(payload).encode()
        response = FakeResponse(raw)
        opener = Mock()
        opener.open.return_value = response
        with patch.object(kitchen_web.urllib.request, 'build_opener', return_value=opener) as build:
            result = kitchen_web.search_web(app, '番茄做法', self.config)
        return result, opener, build

    def block(self, *items):
        return {'type': 'web_search_tool_result', 'content': list(items)}

    def item(self, url='https://www.example.com/recipe', **fields):
        return {'type': 'web_search_result', 'url': url, 'title': '番茄做法', **fields}

    def test_native_request_body_headers_limits_and_fixed_endpoint(self):
        result, opener, build = self.search({'content': [self.block(self.item())]})
        request = opener.open.call_args.args[0]
        self.assertEqual(request.full_url, kitchen_web.SEARCH_ENDPOINT)
        self.assertEqual(request.method, 'POST')
        self.assertEqual(opener.open.call_args.kwargs['timeout'], 75)
        headers = {key.lower(): value for key, value in request.header_items()}
        self.assertEqual(headers['anthropic-version'], '2023-06-01')
        self.assertEqual(headers['x-api-key'], self.config['api_key'])
        self.assertEqual(headers['authorization'], 'Bearer ' + self.config['api_key'])
        body = json.loads(request.data)
        self.assertEqual(body['model'], self.config['model'])
        self.assertEqual(body['tools'], [{'type': 'web_search_20250305', 'name': 'web_search', 'max_uses': 3}])
        self.assertEqual(body['messages'][0]['content'][0]['type'], 'text')
        self.assertIn('番茄做法', body['messages'][0]['content'][0]['text'])
        self.assertNotIn(self.config['api_key'], json.dumps(body))
        self.assertEqual(result, [{'title': '番茄做法', 'url': 'https://www.example.com/recipe', 'snippet': ''}])
        self.assertIsInstance(build.call_args.args[0], kitchen_web._NoRedirect)

    def test_structured_citations_join_results_not_generated_prose_or_inline_snippets(self):
        payload = {'content': [self.block(self.item(snippet='untrusted inline text'), self.item()),
            {'type': 'text', 'text': 'Invented https://not-a-result.example.com/page and unsupported cooking claim',
             'citations': [{'type': 'web_search_result_location', 'url': 'https://www.example.com/recipe#part', 'cited_text': '原文引用。'},
                           {'url': 'https://not-a-result.example.com/page', 'cited_text': 'must not create source'}]}]}
        result, _, _ = self.search(payload)
        self.assertEqual(result, [{'title': '番茄做法', 'url': 'https://www.example.com/recipe', 'snippet': '原文引用。'}])

    def test_empty_result_is_valid_but_absent_or_malformed_result_is_an_error(self):
        self.assertEqual(self.search({'content': [self.block()]})[0], [])
        for payload in ({'content': [{'type': 'text', 'text': 'No evidence'}]},
                        {'content': []}, {'content': [None]}, [],
                        {'content': [{'type': 'web_search_tool_result'}]},
                        {'content': [self.block(None)]}, b'{bad json',
                        {'content': [self.block({'type': 'text', 'text': 'not evidence'})]},
                        {'type': 'error', 'error': {'message': self.config['api_key']}}):
            with self.subTest(payload=payload), self.assertRaises(app.AppError) as raised:
                self.search(payload)
            self.assertEqual(raised.exception.status, 502)
            self.assertNotIn(self.config['api_key'], str(raised.exception))

    def test_native_tool_errors_fail_even_after_eight_valid_sources(self):
        error = {'type': 'web_search_tool_result_error', 'error_code': self.config['api_key']}
        for payload in ({'content': [{'type': 'web_search_tool_result', 'content': error}]},
                        {'content': [self.block(error)]},
                        {'content': [self.block(*(self.item(f'https://example.com/{i}') for i in range(9))),
                                     {'type': 'web_search_tool_result', 'content': error}]}):
            with self.subTest(payload=payload), self.assertRaises(app.AppError) as raised:
                self.search(payload)
            self.assertIn('工具执行失败', str(raised.exception))
            self.assertNotIn(self.config['api_key'], str(raised.exception))

    def test_url_rules_filter_credentials_local_networks_and_ambiguous_hosts(self):
        rejected = ['file:///tmp/a', 'javascript:alert(1)', 'https://user:pass@example.com/a',
                    'http://localhost/a', 'http://localhost./a', 'https://test.local/a',
                    'http://machine.internal/a', 'http://printer/a', 'http://127.0.0.1/a',
                    'http://192.168.1.2/a', 'http://10.0.0.1/a', 'http://169.254.169.254/a',
                    'http://100.64.0.1/a', 'http://[::1]/a', 'http://[fd00::1]/a',
                    'http://[::ffff:127.0.0.1]/a', 'http://2130706433/a', 'http://127.1/a',
                    'http://0x7f000001/a', 'http://0177.0.0.1/a', 'http://0x7f.0.0.1/a',
                    'https://example.com\\@127.0.0.1/a', 'https://exa mple.com/a',
                    'https://example.com:99999/a', 'https://[', 'http://224.0.0.1/a']
        for url in rejected:
            with self.subTest(url=url):
                self.assertIsNone(kitchen_web._public_url(url))
                self.assertFalse(kitchen_web.safe_public_url(url))
        self.assertTrue(kitchen_web.safe_public_url('https://www.example.com/recipe'))
        result, _, _ = self.search({'content': [self.block(*(self.item(url) for url in rejected), self.item('https://www.example.com:443/a#section'))]})
        self.assertEqual([item['url'] for item in result], ['https://www.example.com/a'])

    def test_result_and_field_caps_and_duplicate_normalization(self):
        items = [self.item('https://EXAMPLE.com:443/a#part', title='字' * 800), self.item('https://example.com/a')]
        items += [self.item(f'https://example.com/{i}') for i in range(20)]
        result, _, _ = self.search({'content': [self.block(*items), {'type': 'text', 'citations': [
            {'url': 'https://example.com/a', 'cited_text': '摘' * 6000}]}]})
        self.assertEqual(len(result), 8)
        self.assertEqual(len(result[0]['title']), 500)
        self.assertEqual(len(result[0]['snippet']), 4000)
        self.assertEqual(len({item['url'] for item in result}), 8)

    def test_missing_invalid_key_and_query_do_not_open_network_or_load_config(self):
        with patch.object(kitchen_web.urllib.request, 'build_opener') as build, patch.object(app, 'load_config', side_effect=AssertionError('must not load config')):
            for query, config in [('番茄', {}), ('番茄', {'api_key': 'bad\nkey'}), ('', self.config), ('字' * 2001, self.config)]:
                with self.subTest(query=query[:10], config=bool(config)), self.assertRaises(app.AppError):
                    kitchen_web.search_web(app, query, config)
            build.assert_not_called()

    def test_http_transport_parse_size_and_redirect_errors_never_echo_secrets(self):
        for cause in (urllib.error.HTTPError(kitchen_web.SEARCH_ENDPOINT, 401, self.config['api_key'], {}, io.BytesIO(self.config['api_key'].encode())),
                      urllib.error.HTTPError(kitchen_web.SEARCH_ENDPOINT, 429, self.config['api_key'], {}, io.BytesIO()),
                      urllib.error.HTTPError(kitchen_web.SEARCH_ENDPOINT, 302, self.config['api_key'], {'Location': 'https://outside.example'}, io.BytesIO()),
                      urllib.error.URLError(self.config['api_key']), socket.timeout(self.config['api_key'])):
            opener = Mock()
            opener.open.side_effect = cause
            with patch.object(kitchen_web.urllib.request, 'build_opener', return_value=opener), self.assertRaises(app.AppError) as raised:
                kitchen_web.search_web(app, '番茄', self.config)
            self.assertNotIn(self.config['api_key'], str(raised.exception))
            opener.open.assert_called_once()
        with self.assertRaises(app.AppError) as raised:
            self.search(b' ' * (kitchen_web.MAX_RESPONSE_BYTES + 1))
        self.assertIn('2 MiB', str(raised.exception))
        self.assertIsNone(kitchen_web._NoRedirect().redirect_request(None, None, 302, None, {}, 'https://outside.example'))

    def test_query_and_model_cannot_send_credentials_outside_authentication_headers(self):
        current = self.config['api_key']
        retired, pasted = 'retired-search-test-sentinel', 'unconfigured-web-sentinel'
        query = f'番茄做法 {current} {retired} api_key={pasted} https://example.com/?token={current}'
        opener = Mock()
        opener.open.return_value = FakeResponse(json.dumps({'content': [self.block()]}).encode())
        with patch.object(app, 'secret_values', return_value=(retired,), create=True), \
                patch.object(kitchen_web.urllib.request, 'build_opener', return_value=opener):
            self.assertEqual(kitchen_web.search_web(app, query, self.config), [])
        request = opener.open.call_args.args[0]
        body = request.data.decode()
        for sentinel in (current, retired, pasted):
            self.assertNotIn(sentinel, body)
        self.assertIn('番茄做法', body)
        headers = {key.lower(): value for key, value in request.header_items()}
        self.assertEqual(headers['x-api-key'], current)
        self.assertEqual(headers['authorization'], 'Bearer ' + current)
        self.assertEqual(request.full_url, kitchen_web.SEARCH_ENDPOINT)
        with patch.object(kitchen_web.urllib.request, 'build_opener') as build, self.assertRaises(app.AppError):
            kitchen_web.search_web(app, '番茄', {**self.config, 'model': current})
        build.assert_not_called()

    def test_success_sources_redact_titles_citations_and_sensitive_url_values(self):
        current, retired = self.config['api_key'], 'retired-search-test-sentinel'
        unconfigured = 'unconfigured-query-secret-sentinel'
        url = f'https://www.example.com/recipe/{quote(current)}?api_key={unconfigured}&query={quote(retired)}&page=2'
        payload = {'content': [self.block(self.item(url, title='番茄 ' + current)),
            {'type': 'text', 'citations': [{'url': url + '#fragment', 'cited_text': '原文 ' + current + ' ' + retired}]}]}
        with patch.object(app, 'secret_values', return_value=(retired,), create=True):
            result, _, _ = self.search(payload)
        self.assertEqual(len(result), 1)
        serialized = json.dumps(result, ensure_ascii=False)
        for sentinel in (current, retired, unconfigured):
            self.assertNotIn(sentinel, serialized)
        self.assertIn(REDACTED, result[0]['title'])
        self.assertIn(REDACTED, result[0]['snippet'])
        self.assertTrue(kitchen_web.safe_public_url(result[0]['url']))
        self.assertEqual(urlsplit(result[0]['url']).scheme, 'https')
        self.assertEqual(urlsplit(result[0]['url']).hostname, 'www.example.com')
        self.assertIn('page=2', result[0]['url'])

    def test_sanitization_before_field_cap_does_not_leave_partial_key(self):
        sentinel = self.config['api_key']
        title = '字' * 490 + sentinel
        payload = {'content': [self.block(self.item(title=title))]}
        result, _, _ = self.search(payload)
        self.assertNotIn(sentinel[:10], result[0]['title'])
        self.assertLessEqual(len(result[0]['title']), 500)

    def test_normal_complex_links_and_basic_cooking_prose_remain_usable(self):
        url = 'https://www.example.com/%E7%95%AA%E8%8C%84/a%2Fb?source=guide&title=Basic+cooking&id=42&token_count=2'
        payload = {'content': [self.block(self.item(url, title='Basic cooking')), {'type': 'text',
            'citations': [{'url': url + '#ingredients', 'cited_text': 'Basic cooking: keep the original recipe link.'}]}]}
        result, _, _ = self.search(payload)
        self.assertEqual(result, [{'title': 'Basic cooking', 'url': url,
                                   'snippet': 'Basic cooking: keep the original recipe link.'}])
        self.assertTrue(kitchen_web.safe_public_url(result[0]['url']))

    def test_final_url_is_revalidated_after_redaction(self):
        # A short synthetic key may overlap a URL's port or scheme; a whole-URL
        # marker must never be published as if it were a navigable source link.
        self.assertIsNone(kitchen_web._public_url('https://example.com:8443/recipe', ('8443',)))
        self.assertIsNone(kitchen_web._public_url('https://example.com/recipe', ('https',)))
        original = kitchen_web.redact_text
        for replaced in (REDACTED, 'http://127.0.0.1/recipe', 'https://user:pass@example.com/recipe',
                         'https://outside.example/recipe'):
            def changed(value, secrets=()):
                return replaced if value.startswith('https://') else original(value, secrets)
            with self.subTest(replaced=replaced), patch.object(kitchen_web, 'redact_text', side_effect=changed):
                self.assertIsNone(kitchen_web._public_url('https://example.com/recipe'))
        self.assertEqual(kitchen_web._public_url('https://example.com:8443/recipe'),
                         'https://example.com:8443/recipe')


if __name__ == '__main__':
    unittest.main()
