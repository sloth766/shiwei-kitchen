'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const cooking = require('../public/cooking.js');
const recipe = {id:'soup',steps:['【准备】','洗菜。','切菜。','## 下锅','煮熟。']};
test('section headings retain original indices and cannot become checkboxes', () => {
  assert.deepEqual(cooking.steps(recipe).map(step => step.index), [1,2,4]);
  assert.equal(cooking.isHeading('【准备】把菜洗净'), false);
  assert.equal(cooking.create(recipe).currentStep, 1);
});
test('progress survives JSON round trip without leaking between recipes', () => {
  let progress = cooking.toggle(cooking.create(recipe), 2);
  progress.currentStep = 4;
  progress = cooking.toggle(progress, 1);
  const stored = JSON.parse(JSON.stringify({[recipe.id]:progress}));
  assert.deepEqual(cooking.read(recipe, stored.soup).state, progress);
  const other = {...recipe,id:'salad'};
  assert.deepEqual(cooking.read(other, stored.salad).state.completed, []);
});
test('any step text, order, or section change requires explicit progress reset', () => {
  const progress = cooking.toggle(cooking.create(recipe), 2);
  for (const changed of [ ['【准备】','洗净菜。','切菜。','## 下锅','煮熟。'], [...recipe.steps].reverse(), ['【备菜】',...recipe.steps.slice(1)] ]) {
    const result = cooking.read({...recipe,steps:changed}, progress);
    assert.equal(result.changed, true);
    assert.deepEqual(result.state.completed, []);
    assert.equal(result.state.timer.status, 'idle');
  }
  assert.equal(cooking.read(recipe, progress).changed, false);
});
test('timer uses deadline across throttled background tabs and a page reload', () => {
  const timer = cooking.start(cooking.timer(120000), 1000000);
  assert.equal(cooking.remaining(timer, 1030123), 89877);
  const reloaded = JSON.parse(JSON.stringify(timer));
  assert.equal(cooking.remaining(reloaded, 1100000), 20000);
  assert.deepEqual(cooking.tick(reloaded, 1130000), {durationMs:120000,remainingMs:0,targetAt:null,status:'done'});
});
test('pause freezes time, continue establishes a new deadline, reset restores duration', () => {
  const paused = cooking.pause(cooking.start(cooking.timer(60000), 1000), 21345);
  assert.equal(paused.remainingMs, 39655);
  assert.equal(cooking.remaining(paused, 99999999), 39655);
  const resumed = cooking.start(paused, 2000000);
  assert.equal(resumed.targetAt, 2039655);
  assert.equal(cooking.tick(resumed, 2039655).status, 'done');
  assert.equal(cooking.timer(paused.durationMs).remainingMs, 60000);
});
test('expired timer cannot be resumed with negative time', () => {
  const expired = cooking.pause(cooking.start(cooking.timer(1000), 10), 3000);
  assert.equal(expired.status, 'done');
  assert.equal(expired.remainingMs, 0);
  assert.equal(cooking.start(expired, 5000).targetAt, 6000);
});
test('untrusted local state is restricted to real action indices and valid timers', () => {
  const saved = {...cooking.create(recipe),completed:[0,1,1,3,-1,4,'2',99],currentStep:3,timer:{durationMs:-1,remainingMs:-1,targetAt:0,status:'running'}};
  const result = cooking.read(recipe,saved).state;
  assert.deepEqual(result.completed, [1,4]);
  assert.equal(result.currentStep, 1);
  assert.equal(result.timer.status, 'idle');
  assert.equal(result.timer.durationMs, 300000);
});

test('full backup keeps old step versions pending confirmation and drops deleted recipe state', () => {
  const vm = require('node:vm');
  const fs = require('node:fs');
  const path = require('node:path');
  const old = cooking.create(recipe);
  old.stepsVersion = 'older-version-before-recipe-edit';
  old.completed = [8];
  const saved = {soup: old, 'deleted-recipe': cooking.create(recipe)};
  const sandbox = vm.createContext({
    state: {recipes:[recipe]},
    localStorage: {getItem: key => key === 'shiwei.cooking' ? JSON.stringify(saved) : null},
    context: () => ({time:'30',servings:'2'}), CookingState:cooking,
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../public/kitchen-tools.js'),'utf8'), sandbox);
  const backupPreferences = JSON.parse(JSON.stringify(vm.runInContext('kitchenPreferences()', sandbox)));
  assert.deepEqual(backupPreferences.cooking, {soup:old});
  assert.deepEqual(backupPreferences.context, {time:'30',servings:'2'});
});

test('quota failures preserve timer warnings and full backup rescues the latest in-memory progress', () => {
  const vm = require('node:vm');
  const fs = require('node:fs');
  const path = require('node:path');
  const stored = {[recipe.id]:cooking.create(recipe)};
  const elements = new Map();
  const element = selector => {
    if (!elements.has(selector)) elements.set(selector, {textContent:'',value:'',disabled:false,open:true});
    return elements.get(selector);
  };
  element('#timer-minutes').value='0';
  element('#timer-seconds').value='2';
  const sandbox = vm.createContext({
    recipe, state:{recipes:[recipe]}, CookingState:cooking,
    context:() => ({time:'30',servings:'2'}), $:element,
    localStorage:{getItem:() => JSON.stringify(stored),setItem:() => {throw new Error('QuotaExceededError');}},
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../public/kitchen-tools.js'),'utf8'),sandbox);
  vm.runInContext('cookingRecipe=recipe;cookingProgress=CookingState.toggle(CookingState.create(recipe),2)',sandbox);
  assert.equal(vm.runInContext("persistCooking('保存成功')",sandbox),false);
  assert.match(element('#cooking-message').textContent,/空间不足/);
  let exported=JSON.parse(JSON.stringify(vm.runInContext('kitchenPreferences()',sandbox)));
  assert.deepEqual(exported.cooking[recipe.id].completed,[2]);
  assert.deepEqual(stored[recipe.id].completed,[]);
  vm.runInContext('startCookingTimer({preventDefault(){}})',sandbox);
  assert.match(element('#cooking-message').textContent,/空间不足/);
  exported=JSON.parse(JSON.stringify(vm.runInContext('kitchenPreferences()',sandbox)));
  assert.equal(exported.cooking[recipe.id].timer.status,'running');
  assert.equal(exported.cooking[recipe.id].timer.durationMs,2000);
  vm.runInContext('cookingProgress.timer.targetAt=Date.now()-1;syncCookingTimer()',sandbox);
  assert.match(element('#cooking-message').textContent,/空间不足/);
  assert.equal(vm.runInContext('kitchenPreferences().cooking[recipe.id].timer.status',sandbox),'done');
  // Overlaying live memory must still respect recipe deletion.
  vm.runInContext('state.recipes=[]',sandbox);
  assert.deepEqual(JSON.parse(JSON.stringify(vm.runInContext('kitchenPreferences().cooking',sandbox))),{});
});
