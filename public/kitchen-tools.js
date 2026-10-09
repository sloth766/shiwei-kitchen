'use strict';
const COOKING_KEY = 'shiwei.cooking';
let cookingRecipe = null, cookingProgress = null, backupDraft = null, rollbackBackup = null, restoreBusy = false, backupPreviewEpoch = 0;
function readCooking() {
  try { const value = JSON.parse(localStorage.getItem(COOKING_KEY) || '{}'); return value && typeof value === 'object' && !Array.isArray(value) ? value : {}; } catch { return {}; }
}
function persistCooking(successMessage = null) {
  if (!cookingRecipe || !cookingProgress) return true;
  const saved = readCooking(); saved[cookingRecipe.id] = cookingProgress;
  try {
    localStorage.setItem(COOKING_KEY, JSON.stringify(saved));
    if (successMessage !== null) $('#cooking-message').textContent = successMessage;
    return true;
  } catch {
    $('#cooking-message').textContent = '本机存储空间不足，这次进度暂时无法保存。请导出完整备份。';
    return false;
  }
}
function kitchenPreferences() {
  const saved = readCooking(), cooking = {};
  // Keep old versions intact: reopening a changed recipe asks before resetting.
  // A deleted recipe has no step source to restore and is excluded.
  for (const recipe of state.recipes) {
    if (Object.hasOwn(saved, recipe.id)) cooking[recipe.id] = saved[recipe.id];
  }
  // A quota failure must not prevent the backup from rescuing the latest work.
  if (cookingRecipe && cookingProgress && state.recipes.some(recipe => recipe.id === cookingRecipe.id)) {
    cooking[cookingRecipe.id] = cookingProgress;
  }
  return {context: context(), cooking};
}
function openCooking(recipe) {
  if (!CookingState.steps(recipe).length) { toast('这道菜还没有可操作的步骤。'); return; }
  const restored = CookingState.read(recipe, readCooking()[recipe.id]);
  if (restored.changed && !window.confirm('这道菜的步骤已更新。重置原有勾选和计时，从新步骤开始？')) return;
  cookingRecipe = recipe; cookingProgress = restored.state;
  $('#cooking-title').textContent = recipe.name;
  $('#cooking-message').textContent = restored.changed ? '步骤已更新，已重置这道菜的进度和计时。' : '';
  persistCooking(); sessionStorage.setItem('shiwei.cooking.active', recipe.id);
  renderCooking(); setTimerInputs();
  if (!$('#cooking-dialog').open) $('#cooking-dialog').showModal();
  $('#cooking-current').focus();
}
function renderCooking() {
  const steps = CookingState.steps(cookingRecipe), current = steps.findIndex(item => item.index === cookingProgress.currentStep);
  $('#cooking-progress').textContent = `已完成 ${cookingProgress.completed.length} / ${steps.length} 步`;
  $('#cooking-current').textContent = `第 ${current + 1} 步：${steps[current].text}`;
  $('#cooking-prev').disabled = current <= 0;
  $('#cooking-next').disabled = current >= steps.length - 1;
  $('#cooking-complete').textContent = cookingProgress.completed.includes(cookingProgress.currentStep) ? '撤销本步完成' : '完成这一步';
  $('#cooking-complete').setAttribute('aria-pressed', String(cookingProgress.completed.includes(cookingProgress.currentStep)));
  let stepNumber = 0;
  $('#cooking-steps').innerHTML = cookingRecipe.steps.map((text, index) => {
    if (!String(text).trim()) return '';
    if (CookingState.isHeading(text)) return `<li class="cooking-section">${esc(text)}</li>`;
    stepNumber++;
    return `<li class="cooking-step ${index === cookingProgress.currentStep ? 'is-current' : ''} ${cookingProgress.completed.includes(index) ? 'is-complete' : ''}"><label><input type="checkbox" data-cooking-step="${index}" ${cookingProgress.completed.includes(index) ? 'checked' : ''}><span><small>第 ${stepNumber} 步</small>${esc(text)}</span></label><button class="text-button" data-cooking-go="${index}" ${index === cookingProgress.currentStep ? 'aria-current="step"' : ''} aria-label="查看第 ${stepNumber} 步">查看</button></li>`;
  }).join('');
  renderTimer();
}
function setTimerInputs() {
  $('#timer-minutes').value = Math.floor(cookingProgress.timer.durationMs / 60000);
  $('#timer-seconds').value = Math.floor(cookingProgress.timer.durationMs / 1000) % 60;
}
function renderTimer() {
  if (!cookingProgress) return;
  const timer = cookingProgress.timer, seconds = Math.ceil(CookingState.remaining(timer) / 1000);
  const hours = Math.floor(seconds / 3600), minutes = Math.floor(seconds / 60) % 60;
  $('#timer-display').textContent = `${hours ? String(hours).padStart(2,'0') + ':' : ''}${String(minutes).padStart(2,'0')}:${String(seconds % 60).padStart(2,'0')}`;
  $('#timer-status').textContent = {idle:'设好时间，再开始',running:'倒计时进行中',paused:'计时已暂停',done:'时间到，请检查锅中状态'}[timer.status];
  $('#timer-start').textContent = timer.status === 'paused' ? '继续' : timer.status === 'done' ? '重新开始' : '开始';
  $('#timer-start').disabled = timer.status === 'running';
  $('#timer-pause').disabled = timer.status !== 'running';
  $('#timer-minutes').disabled = $('#timer-seconds').disabled = ['running','paused'].includes(timer.status);
}
function syncCookingTimer() {
  if (!cookingProgress) return;
  const next = CookingState.tick(cookingProgress.timer);
  if (next !== cookingProgress.timer) {
    cookingProgress.timer = next; persistCooking('计时时间到，请检查锅中状态。');
  }
  if ($('#cooking-dialog').open) renderTimer();
}
function moveCooking(direction) {
  const steps = CookingState.steps(cookingRecipe), position = steps.findIndex(item => item.index === cookingProgress.currentStep);
  cookingProgress.currentStep = steps[Math.max(0, Math.min(steps.length - 1, position + direction))].index;
  persistCooking(); renderCooking(); $('#cooking-current').focus();
}
function startCookingTimer(event) {
  event.preventDefault(); if (!cookingProgress || cookingProgress.timer.status === 'running') return;
  if (cookingProgress.timer.status !== 'paused') {
    const minutes = Number($('#timer-minutes').value), seconds = Number($('#timer-seconds').value), duration = (minutes * 60 + seconds) * 1000;
    if (!Number.isInteger(minutes) || !Number.isInteger(seconds) || minutes < 0 || seconds < 0 || seconds > 59 || duration <= 0 || duration > CookingState.MAX_TIMER) {
      $('#cooking-message').textContent = '请填写 1 秒至 24 小时的倒计时，秒数为 0–59。'; return;
    }
    cookingProgress.timer = CookingState.timer(duration);
  }
  const saved = readCooking(); let pausedAnother = false;
  for (const [id, value] of Object.entries(saved)) {
    if (id !== cookingRecipe.id && value.timer?.status === 'running') { value.timer = CookingState.pause(value.timer); pausedAnother = true; }
  }
  try { localStorage.setItem(COOKING_KEY, JSON.stringify(saved)); } catch {}
  cookingProgress.timer = CookingState.start(cookingProgress.timer);
  persistCooking(pausedAnother ? '已暂停另一道菜的计时，当前只运行这一个倒计时。' : ''); renderTimer();
}
function openBackup() {
  if (state.sending) { toast('请等小厨完成本次回答，再备份或恢复。'); return; }
  backupPreviewEpoch++; backupDraft = null; $('#backup-file').disabled = false; $('#backup-file').value = ''; $('#backup-preview').hidden = true;
  $('#backup-confirm').disabled = true; $('#backup-message').textContent = '';
  $('#backup-dialog').showModal();
}
const backupCountNames = {sources:'菜谱来源',ingredients:'食材记录',steps:'做法步骤',personal_recipes:'个人菜谱',recipes:'菜谱',pantry_items:'库存批次',pantry:'库存批次',favorites:'收藏关系',messages:'对话消息',sessions:'会话',session_contexts:'会话条件',cooking:'做饭进度',cooking_state:'做饭进度'};
function backupCounts(counts) { return Object.entries(counts || {}).filter(([key]) => backupCountNames[key]).map(([key, count]) => `<li>${esc(backupCountNames[key])}：<strong>${esc(count)}</strong></li>`).join(''); }
async function previewBackup() {
  const epoch=++backupPreviewEpoch;
  backupDraft = null; $('#backup-confirm').disabled = true; $('#backup-preview').hidden = true; $('#backup-message').textContent = '';
  const file = $('#backup-file').files[0]; if (!file) return;
  $('#backup-file').disabled = true;
  try {
    if (file.size > 32 * 1024 * 1024) throw new Error('完整备份文件不能超过 32 MiB。');
    const backup = JSON.parse(await file.text());
    const preview = await api('/api/backup/restore', {method:'POST',body:JSON.stringify({backup,dry_run:true})});
    if (epoch!==backupPreviewEpoch) return;
    backupDraft = backup;
    const incomingCounts={...preview.counts,cooking:Object.keys(backup.preferences?.cooking || {}).length};
    const currentCounts={...preview.existing_counts,cooking:Object.keys(kitchenPreferences().cooking).length};
    const warnings=Array.isArray(preview.warnings)?preview.warnings:[];
    $('#backup-preview').innerHTML = `<h3>恢复预览</h3><p>文件：${esc(file.name)}</p><div class="backup-counts"><section><h4>备份中的记录</h4><ul>${backupCounts(incomingCounts)}</ul></section><section><h4>将被替换的当前记录</h4><ul>${backupCounts(currentCounts)}</ul></section></div><p>整套替换本机菜谱、库存、收藏、对话、厨房偏好与做饭进度。AI 连接设置不受影响。</p><p>确认后会先在本机保存恢复前的回滚备份，恢复成功后也可下载。</p>${warnings.length?`<div class="backup-warnings"><h4>恢复前请留意</h4><ul>${warnings.map(warning=>`<li>${esc(warning)}</li>`).join('')}</ul></div>`:''}`;
    $('#backup-preview').hidden = false; $('#backup-confirm').disabled = false;
    $('#backup-message').textContent = '备份已通过检查，请核对记录数量后确认恢复。';
  } catch (error) { if(epoch!==backupPreviewEpoch)return; $('#backup-message').textContent = error instanceof SyntaxError ? '文件不是有效的 JSON 备份。' : error.message; }
  finally { if(epoch===backupPreviewEpoch)$('#backup-file').disabled = false; }
}
async function exportBackup() {
  $('#backup-export').disabled = true;
  try {
    const backup = await api('/api/backup/export', {method:'POST',body:JSON.stringify({preferences:kitchenPreferences()})});
    downloadJson(`拾味厨房-完整备份-${new Date().toISOString().slice(0,10)}.json`, backup, false);
    $('#backup-message').textContent = '完整备份已生成，请保留下载的 JSON 文件。';
  } catch (error) { $('#backup-message').textContent = error.message; }
  finally { $('#backup-export').disabled = false; }
}
async function restoreBackup() {
  if (!backupDraft || restoreBusy) return;
  if (!window.confirm('确认用此备份整套替换当前厨房数据？恢复前会自动保存回滚备份。')) return;
  restoreBusy = true; $('#backup-confirm').disabled = $('#backup-file').disabled = $('#backup-export').disabled = true;
  $('#backup-message').textContent = '正在保存回滚备份并恢复，请稍候…';
  try {
    const result = await api('/api/backup/restore', {method:'POST',body:JSON.stringify({backup:backupDraft,dry_run:false,current_preferences:kitchenPreferences()})});
    rollbackBackup = result.rollback_backup; $('#backup-rollback').hidden = !rollbackBackup;
    cookingRecipe = null; cookingProgress = null;
    sessionStorage.removeItem('shiwei.cooking.active');
    if ($('#cooking-dialog').open) $('#cooking-dialog').close();
    newChat(); contextOverrides.clear();
    let preferenceError = false;
    try { localStorage.setItem(COOKING_KEY, JSON.stringify(result.preferences?.cooking || {})); localStorage.setItem('shiwei.context', JSON.stringify(result.preferences?.context || {})); }
    catch { preferenceError = true; }
    // Reset defaults before applying the restored preferences; omitted fields must not leak from the previous kitchen.
    syncContext({ingredients:'',servings:'2',time:'30',diet:'',avoid:'',equipment:'',region:'',...result.preferences?.context});
    $('#context-use-pantry').checked = result.preferences?.context?.use_pantry === true;
    $('#context-pantry-mode').value = result.preferences?.context?.pantry_mode === 'expiry' ? 'expiry' : 'menu';
    saveContext();
    backupDraft = null; $('#backup-preview').hidden = true;
    $('#backup-message').textContent = `恢复完成。恢复前的回滚备份已保存到本机，可点击下方下载。${preferenceError ? '浏览器存储写入失败，请检查可用空间后重新恢复偏好。' : ''}`;
    try { await Promise.all([refreshRecipes(),refreshPantry(),loadHistory()]); }
    catch (error) { $('#backup-message').textContent += ` 数据已恢复，页面刷新失败：${error.message} 请重新加载页面。`; }
  } catch (error) { $('#backup-message').textContent = error.message; }
  finally { restoreBusy = false; $('#backup-confirm').disabled = !backupDraft; $('#backup-file').disabled = $('#backup-export').disabled = false; }
}
function initKitchenTools() {
  $('#backup-button').addEventListener('click', openBackup);
  $('#backup-export').addEventListener('click', exportBackup);
  $('#backup-file').addEventListener('change', previewBackup);
  $('#backup-confirm').addEventListener('click', restoreBackup);
  $('#backup-rollback').addEventListener('click', () => { if (rollbackBackup) downloadJson('拾味厨房-恢复前回滚备份.json', rollbackBackup, false); });
  $('#backup-dialog').addEventListener('close', () => { backupPreviewEpoch++; });
  $('#backup-dialog').addEventListener('cancel', event => { if (restoreBusy) event.preventDefault(); });
  $('#cooking-prev').addEventListener('click', () => moveCooking(-1));
  $('#cooking-next').addEventListener('click', () => moveCooking(1));
  $('#cooking-complete').addEventListener('click', () => { cookingProgress = CookingState.toggle(cookingProgress, cookingProgress.currentStep); persistCooking(); renderCooking(); });
  $('#cooking-steps').addEventListener('change', event => {
    const input = event.target.closest('[data-cooking-step]'); if (!input) return;
    cookingProgress = CookingState.toggle(cookingProgress, Number(input.dataset.cookingStep)); persistCooking();
    const index = input.dataset.cookingStep; renderCooking(); $(`[data-cooking-step="${index}"]`).focus();
  });
  $('#cooking-steps').addEventListener('click', event => {
    const button = event.target.closest('[data-cooking-go]'); if (!button) return;
    cookingProgress.currentStep = Number(button.dataset.cookingGo); persistCooking(); renderCooking(); $('#cooking-current').focus();
  });
  $('#timer-form').addEventListener('submit', startCookingTimer);
  $('#timer-pause').addEventListener('click', () => { cookingProgress.timer = CookingState.pause(cookingProgress.timer); persistCooking(); renderTimer(); });
  $('#timer-reset').addEventListener('click', () => { cookingProgress.timer = CookingState.timer(cookingProgress.timer.durationMs); persistCooking(''); setTimerInputs(); renderTimer(); });
  $('#cooking-dialog').addEventListener('close', () => { persistCooking(); sessionStorage.removeItem('shiwei.cooking.active'); });
  document.addEventListener('visibilitychange', syncCookingTimer);
  setInterval(syncCookingTimer, 500);
}
