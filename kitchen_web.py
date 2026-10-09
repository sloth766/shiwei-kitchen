"""DeepSeek native web search, with evidence only from structured result blocks.

Wire contract verified against the official provider and API documentation:
https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/web/web-search-deepseek/src/provider.ts
https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/

This adapter does not load credentials, fetch result pages, or trust model prose
as search evidence. Callers explicitly supply the current API configuration.
"""
from __future__ import annotations

from http.client import HTTPException
import ipaddress
import json
import re
import socket
import urllib.error
import urllib.request
from urllib.parse import urlsplit, urlunsplit

from kitchen_secrets import redact_text


SEARCH_ENDPOINT = 'https://api.deepseek.com/anthropic/v1/messages'
SEARCH_TIMEOUT = 75
MAX_RESPONSE_BYTES = 2 * 1024 * 1024
MAX_SOURCES = 8
MAX_SEARCHES = 3


class _NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, request, fp, code, msg, headers, newurl):
        # Never forward either credential header to a Location target.
        return None


def _public_url(value, secrets=()):
    """Validate link syntax and exclude literal/private local destinations.

    No DNS or HTTP requests are made for returned links. We only display the
    public hostname; a future page fetcher would need its own resolved-IP check.
    """
    if (not isinstance(value, str) or not 1 <= len(value) <= 2000
            or any(char.isspace() or ord(char) < 32 or ord(char) == 127 for char in value)
            or '\\' in value):
        return None
    try:
        parsed = urlsplit(value)
        if parsed.scheme not in ('http', 'https') or not parsed.hostname or parsed.username is not None or parsed.password is not None:
            return None
        port = parsed.port
        if port is not None and not 1 <= port <= 65535:
            return None
        host = parsed.hostname.rstrip('.').encode('idna').decode('ascii').lower()
        if '%' in host:
            return None
        try:
            address = ipaddress.ip_address(host)
        except ValueError:
            labels = host.split('.')
            if (len(labels) < 2 or len(host) > 253
                    or any(not re.fullmatch(r'[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?', label) for label in labels)
                    or labels[-1].isdigit() or re.fullmatch(r'(?:0x[0-9a-f]+|[0-9]+)(?:\.(?:0x[0-9a-f]+|[0-9]+))*', host)
                    or host.endswith(('.localhost', '.local', '.localdomain', '.internal', '.lan', '.home', '.home.arpa', '.invalid', '.test', '.onion'))):
                return None
        else:
            if not address.is_global or address.is_multicast or address.is_reserved:
                return None
            if address.version == 6:
                host = '[' + address.compressed + ']'
        netloc = host + (f':{port}' if port is not None and port != (443 if parsed.scheme == 'https' else 80) else '')
        # The shared sanitizer encodes replacement markers in URL components.
        # Syntax and destination checks still apply to the original URL above.
        if redact_text(host, secrets=secrets) != host:
            return None
        normalized = redact_text(urlunsplit((parsed.scheme, netloc, parsed.path or '/', parsed.query, '')),
                                 secrets=secrets)
        # Redaction may replace a whole credential-bearing URL with a marker.
        # Publish only a link with the same already-validated destination; this
        # also keeps every original no-local-network and no-userinfo safeguard.
        cleaned = urlsplit(normalized)
        expected_port = port if port is not None and port != (443 if parsed.scheme == 'https' else 80) else None
        if (cleaned.scheme != parsed.scheme or cleaned.hostname != host.strip('[]')
                or cleaned.username is not None or cleaned.password is not None
                or cleaned.port != expected_port
                or any(char.isspace() or ord(char) < 32 or ord(char) == 127 for char in normalized)
                or '\\' in normalized):
            return None
        return normalized if len(normalized) <= 2000 else None
    except (ValueError, UnicodeError):
        return None


def safe_public_url(value):
    """True for a well-formed public HTTP(S) link, without fetching or DNS."""
    return _public_url(value) is not None


def _text(value, limit, secrets=()):
    return redact_text(value, secrets=secrets).strip()[:limit] if isinstance(value, str) else ''


def _results(app, payload, secrets=()):
    if not isinstance(payload, dict) or payload.get('type') == 'error' or payload.get('error'):
        raise app.AppError('DeepSeek 联网搜索返回了服务错误。', 502)
    blocks = payload.get('content')
    if not isinstance(blocks, list) or any(not isinstance(block, dict) for block in blocks):
        raise app.AppError('DeepSeek 联网搜索响应格式无效。', 502)
    searches = [block for block in blocks if block.get('type') == 'web_search_tool_result']
    if not searches:
        raise app.AppError('DeepSeek 未返回原生联网搜索结果，不能将模型回答当作网页证据。', 502)

    snippets = {}
    for block in blocks:
        citations = block.get('citations')
        if block.get('type') != 'text' or not isinstance(citations, list):
            continue
        for citation in citations:
            if not isinstance(citation, dict):
                continue
            url = _public_url(citation.get('url'), secrets)
            excerpt = _text(citation.get('cited_text'), 4000, secrets)
            if url and excerpt and url not in snippets:
                snippets[url] = excerpt

    sources, seen = [], set()
    for block in searches:
        items = block.get('content')
        if isinstance(items, dict) and items.get('type') == 'web_search_tool_result_error':
            raise app.AppError('DeepSeek 原生联网搜索工具执行失败，请稍后重试。', 502)
        if not isinstance(items, list):
            raise app.AppError('DeepSeek 原生联网搜索结果格式无效。', 502)
        for item in items:
            if not isinstance(item, dict):
                raise app.AppError('DeepSeek 原生联网搜索结果条目无效。', 502)
            if item.get('type') == 'web_search_tool_result_error':
                raise app.AppError('DeepSeek 原生联网搜索工具执行失败，请稍后重试。', 502)
            if item.get('type') != 'web_search_result':
                raise app.AppError('DeepSeek 原生联网搜索结果条目类型无效。', 502)
            url = _public_url(item.get('url'), secrets)
            if not url or url in seen:
                continue
            seen.add(url)
            if len(sources) < MAX_SOURCES:
                sources.append({'title': _text(item.get('title'), 500, secrets) or urlsplit(url).hostname,
                                'url': url, 'snippet': snippets.get(url, '')})
    return sources


def search_web(app, query, config):
    """Return up to eight {title, url, snippet} sources, or raise AppError.

    An empty structured search result is [], while a missing search block or
    native-tool error is a failure. Exactly one Messages request is attempted.
    """
    if not isinstance(query, str) or not 1 <= len(query.strip()) <= 2000:
        raise app.AppError('联网搜索问题必须是 1–2000 字的文本。')
    config = dict(config) if isinstance(config, dict) else {}
    api_key = config.get('api_key')
    if not isinstance(api_key, str) or not api_key.strip():
        raise app.AppError('请先在 AI 连接设置中填写 DeepSeek API Key，再使用联网搜索。')
    api_key = api_key.strip()
    if len(api_key) > 4096 or any(ord(char) < 33 or ord(char) > 126 for char in api_key):
        raise app.AppError('DeepSeek API Key 格式无效，请检查 AI 连接设置。')
    secrets = (api_key,)
    if callable(getattr(app, 'secret_values', None)):
        secrets += tuple(app.secret_values())
    query = redact_text(query, secrets=secrets)
    model = config.get('model') or app.DEFAULT_MODEL
    if (not isinstance(model, str) or not model.strip() or len(model) > 100
            or redact_text(model, secrets=secrets) != model):
        raise app.AppError('DeepSeek 模型设置无效。')
    body = {'model': model.strip(), 'max_tokens': 4096,
            'messages': [{'role': 'user', 'content': [{'type': 'text', 'text': 'Search the web for this query: ' + query.strip()}]}],
            'tools': [{'type': 'web_search_20250305', 'name': 'web_search', 'max_uses': MAX_SEARCHES}]}
    request = urllib.request.Request(SEARCH_ENDPOINT,
        data=json.dumps(body, ensure_ascii=False).encode('utf-8'), method='POST',
        headers={'Content-Type': 'application/json', 'Accept': 'application/json',
                 'anthropic-version': '2023-06-01', 'x-api-key': api_key,
                 'Authorization': 'Bearer ' + api_key, 'User-Agent': 'ShiweiKitchen-WebSearch/1'})
    try:
        opener = urllib.request.build_opener(_NoRedirect())
        with opener.open(request, timeout=SEARCH_TIMEOUT) as response:
            if response.status != 200:
                raise app.AppError(f'DeepSeek 联网搜索请求失败（HTTP {response.status}）。', 502)
            raw = response.read(MAX_RESPONSE_BYTES + 1)
        if len(raw) > MAX_RESPONSE_BYTES:
            raise app.AppError('DeepSeek 联网搜索响应超过 2 MiB，已停止处理。', 502)
        payload = json.loads(raw)
    except urllib.error.HTTPError as error:
        status = error.code
        error.close()
        message = ('DeepSeek 联网搜索认证失败，请检查 API Key。' if status in (401, 403)
                   else 'DeepSeek 联网搜索请求过于频繁，请稍后重试。' if status == 429
                   else f'DeepSeek 联网搜索请求失败（HTTP {status}）。')
        raise app.AppError(message, 502) from None
    except (socket.timeout, TimeoutError):
        raise app.AppError('DeepSeek 联网搜索超时，请稍后重试。', 504) from None
    except (urllib.error.URLError, OSError, HTTPException):
        raise app.AppError('无法连接 DeepSeek 联网搜索服务，请检查网络后重试。', 502) from None
    except (ValueError, UnicodeError, RecursionError):
        raise app.AppError('DeepSeek 联网搜索响应不是有效 JSON。', 502) from None
    return _results(app, payload, secrets)
