'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../public/app.js'), 'utf8');
const start = source.indexOf('async function sendChat(');
const end = source.indexOf('async function loadHistory(', start);
const synthetic = 'opaque-synthetic-browser-credential-123456';

function harness() {
  const rendered = [], stored = [], requests = [];
  const node = () => ({remove() { this.removed = true; }});
  const elements = {
    '#chat-input': {value: '请保护 ' + synthetic},
    '#chat-web-search': {checked: false},
    '#send-button': {}, '#new-chat': {},
    '#chat-messages': {append(value) { rendered.push(value); }},
  };
  let resolve, reject;
  const response = new Promise((yes, no) => { resolve = yes; reject = no; });
  const state = {settings: {configured: true}, sending: false, sessionEpoch: 0,
    sessionId: null, messages: []};
  const sandbox = {
    state, document: {createElement: node},
    $: selector => elements[selector], icon: () => '',
    context: () => ({ingredients: '番茄'}), contextOverrides: new Set(),
    updateWebSearchControl() {}, scrollChat() {}, syncContext() {},
    loadHistory: async () => {}, toast() {},
    sessionStorage: {setItem(key, value) { stored.push({key, value}); }},
    appendMessage(role, content, mode, sources, save = true) {
      const value = {...node(), role, content};
      rendered.push(value);
      if (save) state.messages.push({role, content});
      return value;
    },
    api(url, options) { requests.push({url, body: JSON.parse(options.body)}); return response; },
  };
  vm.runInNewContext(source.slice(start, end) + '\nglobalThis.run = sendChat;', sandbox);
  return {state, elements, rendered, stored, requests, resolve, reject, run: sandbox.run};
}

test('pending chat keeps raw credentials out of rendered and saved history', async () => {
  const h = harness();
  const pending = h.run({preventDefault() {}});
  assert.equal(h.requests[0].url, '/api/chat');
  assert.equal(h.requests[0].body.message, '请保护 ' + synthetic);
  assert.equal(h.state.messages.length, 0);
  assert.ok(!JSON.stringify(h.rendered).includes(synthetic));
  h.resolve({session_id: 'session-test', user_content: '请保护 [密钥已隐藏]',
    content: '已处理', mode: 'local', sources: []});
  await pending;
  assert.equal(h.state.messages[0].content, '请保护 [密钥已隐藏]');
  assert.ok(!JSON.stringify([h.state.messages, h.rendered, h.stored]).includes(synthetic));
});

test('failed chat restores input for retry without saving raw text as history', async () => {
  const h = harness();
  const pending = h.run({preventDefault() {}});
  h.reject(new Error('服务暂时不可用'));
  await pending;
  assert.equal(h.elements['#chat-input'].value, '请保护 ' + synthetic);
  assert.equal(h.state.messages.length, 0);
  assert.ok(!JSON.stringify([h.rendered, h.stored]).includes(synthetic));
  assert.equal(h.state.sending, false);
});

test('older server response uses a safe placeholder for the user message', async () => {
  const h = harness();
  const pending = h.run({preventDefault() {}});
  h.resolve({session_id: 'session-test', content: '已处理', mode: 'local', sources: []});
  await pending;
  assert.equal(h.state.messages[0].content, '问题已提交');
  assert.ok(!JSON.stringify([h.state.messages, h.rendered]).includes(synthetic));
});
