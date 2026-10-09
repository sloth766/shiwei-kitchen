'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const dataset = require('../public/dataset-tests.js');

test('dataset import rejects malformed JSON, nonobjects and oversized UTF-8 before sending', () => {
  for (const value of ['', '{bad}', 'null', '[]', '42']) assert.throws(() => dataset.parseDataset(value));
  assert.throws(() => dataset.parseDataset(JSON.stringify({name:'菜'.repeat(350000)})), /1 MiB/);
  assert.deepEqual(dataset.parseDataset('{"name":"本地回归","cases":[]}'), {name:'本地回归',cases:[]});
});

test('assertion and question output escapes imported HTML including source attributes', () => {
  const payload = '<img src=x onerror="alert(1)">';
  const html = dataset.turnHtml({message:payload,status:'failed',assertions:[{field:payload,passed:false,expected:payload,actual:payload}],actual:{content:payload,sources:[{id:'" onclick="alert(1)',name:payload}],context:{ingredients:payload}}},0);
  assert.ok(html.includes('&lt;img'));
  assert.ok(!html.includes('<img'));
  assert.ok(!html.includes('data-recipe-id="" onclick='));
  assert.ok(html.includes('来源记录与有效条件 JSON'));
});

test('skipped turns remain distinguishable from failed assertions and preserve empty sources', () => {
  const html = dataset.turnHtml({message:'测试',status:'skipped',assertions:[],actual:{}},1);
  assert.ok(html.includes('已跳过'));
  assert.ok(html.includes('第 2 轮'));
  assert.ok(html.includes('此轮尚无断言结果'));
  assert.ok(html.includes('来源为空'));
});

test('web citations accept only safe web URLs, escape external text, and distinguish empty searched results', () => {
  const html = dataset.webSourcesHtml([
    {url:'javascript:alert(1)',title:'script'},
    {url:'data:text/html,bad',title:'data'},
    {url:'https://name:secret@example.com/',title:'credential'},
    {url:'https://example.com/?q="',title:'<img onerror="bad">',snippet:'<script>bad</script>'},
  ],true);
  assert.equal((html.match(/<a /g) || []).length,1);
  assert.ok(html.includes('rel="noopener noreferrer"'));
  assert.ok(html.includes('target="_blank"'));
  assert.ok(html.includes('[网页4]'));
  assert.ok(!html.includes('[网页1]'));
  assert.ok(html.includes('&lt;img'));
  assert.ok(!html.includes('<script>'));
  assert.ok(!html.includes('secret'));
  assert.equal(dataset.webSourcesHtml([],false),'');
  assert.ok(dataset.webSourcesHtml([],true).includes('联网搜索未返回可引用网页'));
  assert.ok(dataset.turnHtml({status:'passed',actual:{web_search:true,web_sources:[]}},0).includes('联网搜索未返回可引用网页'));
});

test('starting a new run hides stale completion, restores prior report on validation failure, and exports only finished runs', async () => {
  delete require.cache[require.resolve('../public/dataset-tests.js')];
  const ui = require('../public/dataset-tests.js');
  const originalDocument = global.document, originalStorage = global.sessionStorage;
  const elements = new Map(), downloads = [];
  const element = selector => {
    if (!elements.has(selector)) elements.set(selector,{value:'',textContent:'',hidden:false,disabled:false,checked:false,innerHTML:'',listeners:{},classList:{toggle(){}},setAttribute(){},querySelectorAll(){return [];},addEventListener(name,callback){this.listeners[name] = callback;}});
    return elements.get(selector);
  };
  const completed = {id:'old',name:'旧报告',status:'completed',total:12,completed:12,passed:12,failed:0,skipped:0,pass_rate:100,results:[]};
  const running = {...completed,id:'new',name:'新报告',status:'running',completed:0,passed:0,pass_rate:null};
  let calls = 0, rejectValidation = null, finishPolling;
  const pollResponse = new Promise(resolve => { finishPolling = resolve; });
  try {
    global.document = {querySelector:element};
    global.sessionStorage = {setItem(){},getItem(){return null;}};
    element('#dataset-json').value = '{"name":"测试集","cases":[]}';
    ui.init({downloadJson:(name,data) => downloads.push({name,data}),api:async path => {
      if (path.endsWith('/validate')) {
        if (rejectValidation) await new Promise((resolve,reject) => { rejectValidation = reject; });
        return {dataset:{name:'测试集',cases:[]},case_count:12,turn_count:12};
      }
      if (path.endsWith('/run')) return ++calls === 1 ? completed : running;
      if (path.includes('/runs/')) return pollResponse;
      throw new Error(`Unexpected URL ${path}`);
    }});
    await element('#dataset-run').listeners.click();
    assert.match(element('#dataset-progress-text').textContent,/已完成 12 \/ 12/);
    assert.equal(element('#dataset-export').disabled,false);

    rejectValidation = true;
    const invalidRun = element('#dataset-run').listeners.click();
    assert.equal(element('#dataset-report').hidden,true);
    assert.equal(element('#dataset-progress-text').textContent,'准备新测试…');
    assert.equal(element('#dataset-export').disabled,true);
    element('#dataset-export').listeners.click();
    assert.equal(downloads.length,0);
    rejectValidation(new Error('测试集字段错误'));
    await invalidRun;
    assert.equal(element('#dataset-report').hidden,false);
    assert.match(element('#dataset-message').textContent,/上一次测试报告/);
    assert.equal(element('#dataset-export').disabled,false);

    rejectValidation = null;
    await element('#dataset-run').listeners.click();
    assert.match(element('#dataset-progress-text').textContent,/已完成 0 \/ 12/);
    assert.equal(element('#dataset-export').disabled,true);
    element('#dataset-export').listeners.click();
    assert.equal(downloads.length,0);
    finishPolling({...completed,id:'new',name:'新报告'});
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(element('#dataset-export').disabled,false);
    element('#dataset-export').listeners.click();
    assert.equal(downloads.length,1);
    assert.equal(downloads[0].data.id,'new');
    assert.equal(downloads[0].data.status,'completed');
  } finally {
    global.document = originalDocument;
    global.sessionStorage = originalStorage;
  }
});

test('AI runs recheck key configuration and round limits before dispatching the explicit paid mode', async () => {
  delete require.cache[require.resolve('../public/dataset-tests.js')];
  const ui = require('../public/dataset-tests.js');
  const originalDocument = global.document, originalStorage = global.sessionStorage;
  const elements = new Map(), dispatched = [];
  const element = selector => {
    if (!elements.has(selector)) elements.set(selector,{value:'',textContent:'',hidden:false,disabled:false,checked:false,innerHTML:'',listeners:{},classList:{toggle(){}},setAttribute(){},querySelectorAll(){return [];},addEventListener(name,callback){this.listeners[name] = callback;}});
    return elements.get(selector);
  };
  let configured = false, turns = 15;
  try {
    global.document = {querySelector:element};
    global.sessionStorage = {setItem(){},getItem(){return null;}};
    element('#dataset-json').value = '{"name":"联网测试","cases":[]}';
    element('#dataset-mode').value = 'deepseek_web';
    ui.init({downloadJson(){},api:async (path,options) => {
      if (path.endsWith('/validate')) return {dataset:{name:'联网测试',cases:[]},case_count:1,turn_count:turns};
      if (path.endsWith('/capabilities')) return {configured,model:'model-under-test',modes:['local','deepseek','deepseek_web'],max_ai_turns:20};
      if (path.endsWith('/run')) {
        const body = JSON.parse(options.body); dispatched.push(body);
        return {id:'ai-case',name:'联网测试',status:'completed',total:1,completed:1,passed:1,failed:0,skipped:0,pass_rate:100,results:[],mode:body.mode,model:'model-under-test'};
      }
      throw new Error(`Unexpected URL ${path}`);
    }});
    await element('#dataset-run').listeners.click();
    assert.equal(dispatched.length,0);
    assert.match(element('#dataset-message').textContent,/尚未配置 DeepSeek API Key/);
    assert.equal(element('#dataset-run').disabled,true);
    configured = true; turns = 21;
    await element('#dataset-run').listeners.click();
    assert.equal(dispatched.length,0);
    assert.match(element('#dataset-message').textContent,/最多 20 轮/);
    turns = 15;
    await element('#dataset-run').listeners.click();
    assert.equal(dispatched.length,1);
    assert.equal(dispatched[0].mode,'deepseek_web');
    assert.match(element('#dataset-run').textContent,/消耗额度/);
    assert.match(element('#dataset-report-meta').textContent,/DeepSeek 联网回答 · model-under-test/);
    assert.match(element('#dataset-mode-help').textContent,/取消在当前轮完成后生效，当前轮可能继续产生 API 请求和费用/);
  } finally {
    global.document = originalDocument;
    global.sessionStorage = originalStorage;
  }
});
