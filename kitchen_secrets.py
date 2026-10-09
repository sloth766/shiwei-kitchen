"""Credential redaction at public/export/model-data boundaries (no file reads)."""
from __future__ import annotations

import base64
import binascii
from functools import lru_cache
import html
import json
import re
from urllib.parse import parse_qsl, quote, quote_plus, unquote, urlencode, urlsplit, urlunsplit

REDACTED = '[密钥已隐藏]'
_CREDENTIAL_FIELDS = {
    'apikey', 'xapikey', 'accesskey', 'secretkey', 'awsaccesskeyid',
    'awssecretaccesskey', 'authorization', 'proxyauthorization',
    'token', 'accesstoken', 'refreshtoken', 'idtoken', 'authtoken',
    'password', 'passwd', 'pwd', 'secret', 'clientsecret', 'privatekey',
    'credential', 'credentials', 'cookie', 'setcookie', 'sessiontoken',
    '密钥', '密码', '令牌',
}
_QUERY_FIELDS = _CREDENTIAL_FIELDS | {'key', 'signature', 'sig', 'sessionid'}
_URL = re.compile(r'\b(?:https?|wss?|ftp)://[^\s<>"\']+', re.IGNORECASE)
_PEM = re.compile(r'-----BEGIN [A-Z0-9 ]{0,40}PRIVATE KEY-----.*?(?:-----END [A-Z0-9 ]{0,40}PRIVATE KEY-----|$)', re.DOTALL)
_TOKEN_PATTERNS = (
    re.compile(r'(?<![A-Za-z0-9_])sk-(?:proj-|ant-api\d{2}-)?[A-Za-z0-9_-]{16,}'),
    re.compile(r'(?<![A-Za-z0-9_])gh[pousr]_[A-Za-z0-9_]{16,}'),
    re.compile(r'(?<![A-Za-z0-9_])github_pat_[A-Za-z0-9_]{16,}'),
    re.compile(r'(?<![A-Za-z0-9_])xox[baprs]-[A-Za-z0-9-]{16,}'),
    re.compile(r'(?<![A-Za-z0-9_])AIza[A-Za-z0-9_-]{30,}'),
    re.compile(r'(?<![A-Za-z0-9_])(?:AKIA|ASIA)[A-Z0-9]{16}(?![A-Z0-9])'),
    re.compile(r'(?<![A-Za-z0-9_])eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}'),
)
_TOKEN_HINTS = ('sk-', 'ghp_', 'gho_', 'ghu_', 'ghs_', 'ghr_',
                'github_pat_', 'xoxb-', 'xoxa-', 'xoxp-', 'xoxr-', 'xoxs-',
                'AIza', 'AKIA', 'ASIA', 'eyJ')
_BEARER = re.compile(r'(?i)\b(Bearer|Basic)\s+(?P<token>[A-Za-z0-9_./+=:%-]+)')
_COOKIE_HEADER = re.compile(r'(?i)(?P<prefix>(?<![A-Za-z0-9_])(?:cookie|set-cookie)\s*[:=]\s*)[^\r\n]+')
_AUTH_HEADER = re.compile(r'(?i)(?P<prefix>(?<![A-Za-z0-9_])(?:proxy[ _-]*)?authorization\s*[:=]\s*)[^\r\n]+')
_LABELS = r'api[ _-]*key|x[ _-]*api[ _-]*key|access[ _-]*key|aws[ _-]*access[ _-]*key[ _-]*id|access[ _-]*token|refresh[ _-]*token|auth[ _-]*token|id[ _-]*token|session[ _-]*token|authorization|proxy[ _-]*authorization|client[ _-]*secret|secret[ _-]*key|private[ _-]*key|aws[ _-]*secret[ _-]*access[ _-]*key|password|passwd|pwd|token|secret|credentials?|cookie|set[ _-]*cookie|密钥|密码|令牌'
_ASSIGNMENT = re.compile(r'(?i)(?P<prefix>(?<![A-Za-z0-9_])(?:'+_LABELS+r')["\']?\s*[:=：]\s*)(?P<value>"(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'|[^\s,;&<>"\']+)')


def is_sensitive_field(name):
    return isinstance(name, str) and re.sub(r'[\s_-]', '', name).casefold() in _CREDENTIAL_FIELDS


def _variants(secrets):
    # Cache only bounded in-process variants; never write credentials to disk.
    normalized=tuple(sorted({secret for secret in secrets or () if isinstance(secret,str) and secret and secret!=REDACTED}))
    return _cached_variants(normalized)


@lru_cache(maxsize=64)
def _cached_variants(secrets):
    values = set()
    for secret in secrets or ():
        if not isinstance(secret, str) or not secret or secret == REDACTED:
            continue
        values.add(secret)
        values.update((quote(secret, safe=''), quote_plus(secret), html.escape(secret),
                       json.dumps(secret, ensure_ascii=False)[1:-1],
                       json.dumps(secret, ensure_ascii=True)[1:-1]))
        for encoder in (lambda value: quote(value, safe=''), quote_plus):
            encoded = secret
            for _ in range(8):
                encoded = encoder(encoded)
                values.add(encoded)
        if len(secret) >= 8:
            raw = secret.encode('utf-8')
            for encoded in (base64.b64encode(raw).decode('ascii'),
                            base64.urlsafe_b64encode(raw).decode('ascii')):
                values.update((encoded,encoded.rstrip('=')))
    return tuple(sorted(values, key=len, reverse=True))


@lru_cache(maxsize=64)
def _secret_pattern(variants):
    return re.compile('|'.join(re.escape(value) for value in variants)) if variants else None


def _plain(text, variants):
    known = _secret_pattern(variants)
    if known is not None:
        text = known.sub(lambda match: REDACTED, text)
    if 'PRIVATE KEY-----' in text:
        text = _PEM.sub(REDACTED, text)
    if any(hint in text for hint in _TOKEN_HINTS):
        for pattern in _TOKEN_PATTERNS:
            text = pattern.sub(REDACTED, text)
    def hide_auth(match):
        if match.group(1).casefold() == 'bearer':
            return match.group(1) + ' ' + REDACTED
        prefix = text[:match.start()]
        if re.search(r'(?i)(?:proxy[ _-]*)?authorization["\']?\s*[:=]\s*["\']?$', prefix):
            return match.group(1) + ' ' + REDACTED
        token = match.group('token')
        try:
            decoded = base64.b64decode(token + '=' * (-len(token) % 4), validate=True)
        except (ValueError, binascii.Error):
            return match.group()
        # Ordinary prose such as "Basic cooking" is not an auth payload.
        return match.group(1) + ' ' + REDACTED if b':' in decoded else match.group()
    lowered = text.casefold()
    if 'bearer' in lowered or 'basic' in lowered:
        text = _BEARER.sub(hide_auth, text)
    if 'cookie' in lowered:
        text = _COOKIE_HEADER.sub(lambda match: match.group('prefix')+REDACTED, text)
    if 'authorization' in lowered:
        text = _AUTH_HEADER.sub(lambda match: match.group('prefix')+REDACTED, text)
    def hide_assignment(match):
        # Recipe prose uses "the secret: a ..." without declaring a credential.
        # Actual known keys and provider tokens have already been hidden above.
        if (re.fullmatch(r'(?i)secret\s*:\s*', match.group('prefix'))
                and re.search(r'(?i)\bthe\s+$', text[:match.start()])):
            return match.group()
        value = match.group('value')
        wrapper = value[0] if value[:1] in ('"', "'") else ''
        return match.group('prefix') + wrapper + REDACTED + wrapper
    return _ASSIGNMENT.sub(hide_assignment, text) if any(char in text for char in ':=：') else text


def _url(text, variants,depth=0):
    if depth>=8:
        return REDACTED
    core = text
    while core and core[-1] in '.,;)]}' and not core.endswith(REDACTED):
        core = core[:-1]
    suffix = text[len(core):]
    try:
        parts = urlsplit(core)
        # Public links never contain login credentials.
        netloc = parts.netloc.rsplit('@', 1)[-1]
        if REDACTED in netloc or _plain(netloc, variants) != netloc:
            return REDACTED + suffix
        path = unquote(parts.path)
        clean_path = _with_urls(path, variants,depth+1)
        path = quote(clean_path, safe='/:@!$&\'()*+,;=-._~') if clean_path != path or REDACTED in clean_path else parts.path
        pairs = parse_qsl(parts.query, keep_blank_values=True)
        changed = netloc != parts.netloc or REDACTED in parts.query
        safe_pairs = []
        for name, value in pairs:
            clean_name = _plain(name, variants)
            field = re.sub(r'[\s_-]', '', name).casefold()
            clean_value = REDACTED if field in _QUERY_FIELDS else _with_urls(value, variants,depth+1)
            safe_pairs.append((clean_name, clean_value))
            changed |= clean_name != name or clean_value != value or field in _QUERY_FIELDS
        query = urlencode(safe_pairs, doseq=True) if changed else parts.query
        fragment = unquote(parts.fragment)
        clean_fragment = _with_urls(fragment, variants,depth+1)
        if clean_fragment != fragment or REDACTED in clean_fragment:
            fragment = quote(clean_fragment, safe='/:@!$&\'()*+,;=-._~')
        else:
            fragment = parts.fragment
        return urlunsplit((parts.scheme, netloc, path, query, fragment)) + suffix
    except (ValueError, UnicodeError):
        # A malformed credential-bearing link is not safe to publish.
        return REDACTED + suffix


def _with_urls(text,variants,depth=0):
    # Mask full credential assignments first: a password may itself be a URL.
    text=_plain(text,variants)
    pieces = []
    offset = 0
    for match in _URL.finditer(text):
        pieces.append(text[offset:match.start()])
        pieces.append(_url(match.group(), variants,depth))
        offset = match.end()
    pieces.append(text[offset:])
    return ''.join(pieces)


def redact_text(text, secrets=()):
    """Remove known/recognizable credentials; retain ordinary text and valid links."""
    if not isinstance(text, str):
        raise TypeError('redact_text requires text')
    return _with_urls(text,_variants(secrets))


def redact_data(value, secrets=()):
    """Copy JSON-like data, retaining ordinary structure and scalar types."""
    # Resolve credential encodings once per boundary, not once per field.
    # The memo lasts only for this call and is bounded: repeated schema keys,
    # source links and labels in a large catalogue need not be scanned again.
    variants = _variants(secrets)
    memo = {}

    def text(value):
        if value in memo:
            return memo[value]
        cleaned = _with_urls(value, variants)
        if len(memo) < 4096:
            memo[value] = cleaned
        return cleaned

    return _redact_data(value, text)


def _redact_data(value, text):
    if isinstance(value, str):
        # Stored JSON columns must stay valid JSON after nested field protection.
        if value.lstrip().startswith(('{', '[')):
            try:
                decoded = json.loads(value)
            except (ValueError, RecursionError):
                pass
            else:
                cleaned = _redact_data(decoded, text)
                if cleaned != decoded:
                    return json.dumps(cleaned, ensure_ascii=False, separators=(',', ':'))
        return text(value)
    if isinstance(value, dict):
        result = {}
        for name, item in value.items():
            safe_name = text(name) if isinstance(name, str) else name
            if is_sensitive_field(name) and item not in (None, ''):
                result[safe_name] = REDACTED
            else:
                result[safe_name] = _redact_data(item, text)
        return result
    if isinstance(value, list):
        return [_redact_data(item, text) for item in value]
    if isinstance(value, tuple):
        return tuple(_redact_data(item, text) for item in value)
    return value
