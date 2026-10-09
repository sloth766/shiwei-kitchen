/* Pure cooking state: persisted indices refer to the original recipe.steps array. */
(function (root, factory) {
  const state = factory();
  if (typeof module === 'object' && module.exports) module.exports = state;
  else root.CookingState = state;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const MAX_TIMER = 24 * 60 * 60 * 1000;
  const isHeading = step => /^【[^】]+】$/.test(String(step).trim()) || /^#{1,6}\s/.test(String(step).trim());
  const steps = recipe => recipe.steps.map((text, index) => ({text, index})).filter(item => String(item.text).trim() && !isHeading(item.text));
  function version(recipe) {
    const text = JSON.stringify(recipe.steps);
    let a = 2166136261, b = 5381;
    for (let i = 0; i < text.length; i++) {
      a = Math.imul(a ^ text.charCodeAt(i), 16777619);
      b = Math.imul(b, 33) ^ text.charCodeAt(i);
    }
    return `v1-${(a >>> 0).toString(16)}-${(b >>> 0).toString(16)}-${text.length}`;
  }
  function timer(durationMs = 300000) {
    return {durationMs, remainingMs: durationMs, targetAt: null, status: 'idle'};
  }
  function create(recipe) {
    return {version: 1, stepsVersion: version(recipe), completed: [], currentStep: steps(recipe)[0]?.index ?? 0, timer: timer()};
  }
  function remaining(value, now = Date.now()) {
    return value.status === 'running' ? Math.max(0, Math.min(value.durationMs, value.targetAt - now)) : value.remainingMs;
  }
  function tick(value, now = Date.now()) {
    if (value.status === 'running' && remaining(value, now) === 0) return {...value, remainingMs: 0, targetAt: null, status: 'done'};
    return value;
  }
  function start(value, now = Date.now()) {
    const remainingMs = value.status === 'paused' ? value.remainingMs : value.durationMs;
    return {...value, remainingMs, targetAt: now + remainingMs, status: 'running'};
  }
  function pause(value, now = Date.now()) {
    const remainingMs = remaining(value, now);
    return {...value, remainingMs, targetAt: null, status: remainingMs > 0 ? 'paused' : 'done'};
  }
  function read(recipe, saved) {
    const fresh = create(recipe);
    if (!saved || saved.version !== 1) return {state: fresh, changed: false};
    if (saved.stepsVersion !== fresh.stepsVersion) return {state: fresh, changed: true};
    const indices = new Set(steps(recipe).map(item => item.index));
    fresh.completed = [...new Set((Array.isArray(saved.completed) ? saved.completed : []).filter(i => Number.isInteger(i) && indices.has(i)))];
    if (indices.has(saved.currentStep)) fresh.currentStep = saved.currentStep;
    const t = saved.timer;
    if (t && Number.isInteger(t.durationMs) && t.durationMs > 0 && t.durationMs <= MAX_TIMER && Number.isInteger(t.remainingMs) && t.remainingMs >= 0 && t.remainingMs <= t.durationMs && ['idle','running','paused','done'].includes(t.status) && (t.status !== 'running' || Number.isSafeInteger(t.targetAt))) {
      fresh.timer = tick({...t});
    }
    return {state: fresh, changed: false};
  }
  function toggle(value, index) {
    const completed = value.completed.includes(index) ? value.completed.filter(i => i !== index) : [...value.completed, index].sort((a,b) => a-b);
    return {...value, completed};
  }
  return {MAX_TIMER, isHeading, steps, version, timer, create, remaining, tick, start, pause, read, toggle};
});
