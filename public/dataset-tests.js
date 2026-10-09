'use strict';
// This module owns only dataset-test UI state. It never writes kitchen preferences.
const DatasetTests = (() => {
  const MAX_BYTES = 1024 * 1024, RUN_KEY = 'shiwei.dataset.run';
  const statusNames = {queued:'等待中',running:'运行中',completed:'已完成',cancelled:'已取消',passed:'通过',failed:'失败',error:'执行错误',skipped:'已跳过'};
  const severityNames = {error:'错误',warning:'警告',info:'信息'};
  const modeNames = {local:'本地离线检索',deepseek:'DeepSeek 回答',deepseek_web:'DeepSeek 联网回答'};
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const json = value => JSON.stringify(value === undefined ? null : value, null, 2);
  const active = report => report && ['queued','running'].includes(report.status);
  const badge = status => `<span class="testing-badge ${Object.hasOwn(statusNames,status) ? status : 'info'}">${escape(statusNames[status] || status)}</span>`;
  const metric = (label,value) => `<div><span>${escape(label)}</span><strong>${escape(value)}</strong></div>`;
  const timestamp = value => { const date = new Date(value); return value && !Number.isNaN(date.getTime()) ? date.toLocaleString('zh-CN') : '未记录'; };
  function parseDataset(text) {
    if (new TextEncoder().encode(text).length > MAX_BYTES) throw new Error('测试集超过 1 MiB，请减少用例或分批运行。');
    if (!text.trim()) throw new Error('请先加载内置用例或导入测试集。');
    let value;
    try { value = JSON.parse(text); } catch { throw new Error('JSON 格式不正确，请检查引号、逗号与括号。'); }
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('测试集应为 JSON 对象，请参考下载模板。');
    return value;
  }
  function assertionHtml(assertion) {
    return `<li class="testing-assertion"><div>${assertion.passed ? badge('passed') : badge('failed')} <strong>${escape(assertion.field)}</strong></div><div class="testing-values"><div><span>期望</span><pre>${escape(json(assertion.expected))}</pre></div><div><span>实际</span><pre>${escape(json(assertion.actual))}</pre></div></div></li>`;
  }
  function webSourcesHtml(sources = [], searched = false) {
    const links = (Array.isArray(sources) ? sources : []).flatMap((source,index) => {
      if (!source || typeof source !== 'object') return [];
      let url;
      try { url = new URL(source.url); } catch { return []; }
      if (!['https:','http:'].includes(url.protocol) || url.username || url.password) return [];
      return [`<li><a href="${escape(url.href)}" target="_blank" rel="noopener noreferrer">[网页${index + 1}] ${escape(source.title || url.hostname)}</a>${source.snippet ? `<p>${escape(source.snippet)}</p>` : ''}</li>`];
    });
    if (!links.length && !searched) return '';
    return `<div class="web-source-list"><strong>网页来源</strong>${links.length ? `<ul>${links.join('')}</ul>` : '<p>联网搜索未返回可引用网页。</p>'}</div>`;
  }
  function turnHtml(turn,index) {
    const actual = turn.actual || {}, sources = Array.isArray(actual.sources) ? actual.sources : [];
    return `<details class="testing-turn"><summary>第 ${index + 1} 轮 · ${escape(turn.message)} ${badge(turn.status)}</summary>${turn.error ? `<p class="testing-error">${escape(turn.error)}</p>` : ''}${turn.reason ? `<p class="testing-help">${escape(turn.reason)}</p>` : ''}<ul class="testing-assertions">${(turn.assertions || []).map(assertionHtml).join('')}</ul>${!turn.assertions?.length ? '<p class="testing-help">此轮尚无断言结果。</p>' : ''}<details class="testing-actual"><summary>实际回答、来源与条件</summary><p class="testing-answer">${escape(actual.content || '尚无回答')}</p><p class="testing-help">匹配状态：${escape(actual.match_status ?? '未执行')} · 匹配数：${escape(actual.match_count ?? '—')} · ${escape(turn.duration_ms ?? 0)} ms</p><div class="testing-source-links">${sources.map(source => typeof source === 'object' && source ? `<button class="secondary-button" data-recipe-id="${escape(source.id)}">${escape(source.name || source.id)}</button>` : `<span>${escape(source)}</span>`).join('') || '<span>来源为空</span>'}</div>${webSourcesHtml(actual.web_sources,actual.web_search === true)}<details><summary>来源记录与有效条件 JSON</summary><pre>${escape(json({sources,web_sources:actual.web_sources || [],web_search:actual.web_search === true,context:actual.context || {}}))}</pre></details></details></details>`;
  }
  let request, download, select, report = null, quality = null, initialized = false, opened = false;
  let loading = false, polling = null, pollEpoch = 0, lastResults = '', visibleIssues = 50, cancelPending = false, capabilities = null, capabilitiesEpoch = 0;
  const templates = new Map();
  const selectedMode = () => select('#dataset-mode').value || 'local';
  const message = (value,error = false) => { const el = select('#dataset-message'); el.textContent = value; el.classList.toggle('testing-error',error); };
  const qualityMessage = (value,error = false) => { const el = select('#quality-message'); el.textContent = value; el.classList.toggle('testing-error',error); };
  function controls() {
    const busy = loading || active(report);
    ['dataset-load','dataset-file','dataset-json','dataset-mode'].forEach(id => select(`#${id}`).disabled = busy);
    const ai = selectedMode() !== 'local';
    select('#dataset-run').disabled = busy || !select('#dataset-json').value.trim() || (ai && capabilities?.configured !== true);
    select('#dataset-run').textContent = ai ? `开始 ${selectedMode() === 'deepseek_web' ? 'DeepSeek 联网' : 'DeepSeek'} 测试（消耗额度）` : '开始运行';
    select('#dataset-cancel').disabled = !active(report) || cancelPending;
    select('#dataset-cancel').textContent = cancelPending ? '正在取消…' : '取消测试';
    select('#dataset-export').disabled = loading || active(report) || !report;
    select('#dataset-export').textContent = active(report) ? '完成后可下载报告' : '下载 JSON 报告';
  }
  function renderMode() {
    const ai = selectedMode() !== 'local', maxTurns = capabilities?.max_ai_turns || 20;
    select('#dataset-configure').hidden = !ai || capabilities?.configured === true;
    select('#dataset-mode-help').textContent = !ai ? '本地模式不调用 AI、不消耗模型额度。测试内容只在本机运行。' : capabilities?.configured === true ? `将真实调用 ${capabilities.model || 'DeepSeek'}；本批最多 ${maxTurns} 轮。问题、厨房条件及参考菜谱会发送至 API 服务，联网模式会额外查询网页并消耗额度。取消在当前轮完成后生效，当前轮可能继续产生 API 请求和费用。` : `当前服务尚未配置 DeepSeek API Key，不能运行 AI 测试。请先打开 AI 连接设置；每批最多 ${maxTurns} 轮，真实调用会消耗 API 额度。`;
    controls();
  }
  async function fetchCapabilities() {
    const epoch = ++capabilitiesEpoch;
    const value = await request('/api/dataset-tests/capabilities');
    if (epoch === capabilitiesEpoch) { capabilities = value; renderMode(); }
    return value;
  }
  async function refreshCapabilities() {
    try { await fetchCapabilities(); }
    catch (error) { capabilities = null; renderMode(); select('#dataset-mode-help').textContent = `无法确认 AI 配置：${error.message}。本地检索仍可使用；选择 AI 模式时请重试。`; }
  }
  async function getTemplate() {
    const mode = selectedMode();
    if (!templates.has(mode)) templates.set(mode,await request(`/api/dataset-tests/template?mode=${encodeURIComponent(mode)}`));
    return templates.get(mode);
  }
  async function loadTemplate() {
    loading = true; controls(); message('正在读取内置用例…');
    try {
      const data = await getTemplate();
      select('#dataset-json').value = json(data);
      select('#dataset-description').textContent = `已载入：${data.name || '内置测试集'} · ${data.cases?.length ?? 0} 个用例。可展开 JSON 修改预期。`;
      message('测试集已就绪，点击“开始运行”。');
    } catch (error) { message(error.message,true); }
    finally { loading = false; controls(); }
  }
  function rememberRun(id) {
    try { sessionStorage.setItem(RUN_KEY,id); } catch { /* Live reports remain available without session storage. */ }
  }
  function renderResults(force = false) {
    const failureOnly = select('#dataset-failures-only').checked;
    const results = (report?.results || []).filter(result => !failureOnly || ['failed','error'].includes(result.status));
    const signature = JSON.stringify([failureOnly,results]);
    if (!force && signature === lastResults) return;
    lastResults = signature;
    const expanded = new Set([...select('#dataset-results').querySelectorAll('details[data-case-id][open]')].map(el => el.dataset.caseId));
    const nested = new Map([...select('#dataset-results').querySelectorAll('details[data-case-id]')].map(el => [el.dataset.caseId,[...el.querySelectorAll('details')].map((detail,index) => detail.open ? index : -1).filter(index => index >= 0)]));
    select('#dataset-results').innerHTML = results.map(result => `<details class="testing-case" data-case-id="${escape(result.id)}" ${expanded.has(String(result.id)) ? 'open' : ''}><summary><span>${escape(result.name || result.id)}</span>${badge(result.status)}</summary><p class="testing-help">${escape(result.id)} · ${escape(result.duration_ms ?? 0)} ms</p>${result.error ? `<p class="testing-error">${escape(result.error)}</p>` : ''}${result.reason ? `<p class="testing-help">${escape(result.reason)}</p>` : ''}${(result.turns || []).map(turnHtml).join('')}</details>`).join('') || `<p class="testing-empty">${failureOnly ? '暂无失败或错误用例。' : '等待用例结果…'}</p>`;
    select('#dataset-results').querySelectorAll('details[data-case-id]').forEach(el => {
      const indices = nested.get(el.dataset.caseId) || [];
      el.querySelectorAll('details').forEach((detail,index) => { detail.open = indices.includes(index); });
    });
  }
  function renderReport(data) {
    report = data;
    select('#dataset-report').hidden = false;
    select('#dataset-report-name').textContent = report.name || '测试报告';
    select('#dataset-report-meta').textContent = `${modeNames[report.mode] || modeNames.local}${report.model ? ` · ${report.model}` : ''} · 菜谱快照 ${report.catalogue_count ?? '—'} 道 · 开始 ${timestamp(report.started_at)}${report.finished_at ? ` · 结束 ${timestamp(report.finished_at)}` : ''}`;
    const done = (report.completed || 0) + (report.skipped || 0), total = report.total || 0;
    select('#dataset-progress').max = Math.max(1,total);
    select('#dataset-progress').value = Math.min(total,done);
    select('#dataset-progress-text').textContent = `${statusNames[report.status] || report.status} · 已完成 ${report.completed || 0} / ${total} 个用例，跳过 ${report.skipped || 0} 个${report.total_turns != null ? ` · 已执行 ${report.executed_turns || 0} / ${report.total_turns} 轮` : ''}`;
    const percent = typeof report.pass_rate === 'number' ? `${report.pass_rate.toFixed(1)}%` : '—';
    select('#dataset-metrics').innerHTML = metric('已执行用例通过率',percent) + metric('通过',report.passed || 0) + metric('失败 / 错误',report.failed || 0) + metric('跳过',report.skipped || 0);
    renderResults(); controls();
    if (report.error) message(`测试执行失败：${report.error}`,true);
    else if (report.status === 'failed') message('测试执行失败，请下载报告查看已产生的结果并重新运行。',true);
    else if (report.status === 'completed') message('测试已完成。展开用例查看每轮的期望与实际结果。');
    else if (report.status === 'cancelled') message('测试已取消，未完成用例已跳过。当前报告可下载。');
    else if (active(report)) message(`正在运行${modeNames[report.mode] || modeNames.local}，可离开此页面；返回后继续查看结果。`);
  }
  async function poll(id,epoch) {
    try {
      const data = await request(`/api/dataset-tests/runs/${encodeURIComponent(id)}`);
      if (epoch !== pollEpoch) return;
      select('#dataset-reconnect').hidden = true;
      renderReport(data);
      if (active(data)) polling = setTimeout(() => poll(id,epoch),700);
    } catch (error) {
      if (epoch !== pollEpoch) return;
      if (error.status === 404) {
        report = null;
        try { sessionStorage.removeItem(RUN_KEY); } catch { /* No kitchen data is affected. */ }
        message('此测试报告已过期或服务已重启。请重新载入测试集并运行。',true);
        select('#dataset-reconnect').hidden = true;
        controls(); return;
      }
      message(`进度读取失败：${error.message}。点击“重新读取进度”重试。`,true);
      select('#dataset-reconnect').hidden = false;
      // Preserve the active state so a lost connection cannot start a duplicate run.
      controls();
    }
  }
  function resume(id) {
    clearTimeout(polling); pollEpoch++;
    if (!report || report.id !== id) report = {id,status:'running'};
    controls(); poll(id,pollEpoch);
  }
  async function run() {
    if (loading || active(report)) return;
    const previousReport = report;
    const mode = selectedMode();
    loading = true; controls(); message('正在校验测试集…');
    // Replace the previous completion state immediately, before asynchronous validation.
    // Otherwise a finished report can appear to belong to the newly started run.
    select('#dataset-report').hidden = true;
    select('#dataset-progress-text').textContent = '准备新测试…';
    try {
      const dataset = parseDataset(select('#dataset-json').value);
      const checked = await request('/api/dataset-tests/validate',{method:'POST',body:JSON.stringify({dataset})});
      select('#dataset-description').textContent = `${checked.dataset.name || '测试集'} · ${checked.case_count} 个用例 · ${checked.turn_count} 轮问题`;
      if (mode !== 'local') {
        const current = await fetchCapabilities();
        if (!current.configured) throw new Error('当前服务尚未配置 DeepSeek API Key，请先打开 AI 连接设置。');
        if (!current.modes?.includes(mode)) throw new Error('当前服务不支持所选 AI 模式，请重新选择运行方式。');
        if (checked.turn_count > current.max_ai_turns) throw new Error(`AI 测试每批最多 ${current.max_ai_turns} 轮；当前 ${checked.turn_count} 轮，请分批运行。`);
      }
      message('格式有效，正在启动隔离测试…');
      const data = await request('/api/dataset-tests/run',{method:'POST',body:JSON.stringify({dataset:checked.dataset,mode})});
      lastResults = ''; select('#dataset-reconnect').hidden = true; renderReport(data); rememberRun(data.id);
      if (active(data)) resume(data.id);
    } catch (error) {
      if (previousReport) renderReport(previousReport);
      message(`${error.message}${previousReport ? ' 下方保留的是上一次测试报告。' : ''}`,true);
    }
    finally { loading = false; controls(); }
  }
  async function cancel() {
    if (!active(report) || cancelPending) return;
    cancelPending = true; controls();
    const id = report.id;
    clearTimeout(polling); pollEpoch++;
    try {
      const data = await request(`/api/dataset-tests/runs/${encodeURIComponent(id)}/cancel`,{method:'POST',body:'{}'});
      renderReport(data);
      if (active(data)) resume(id);
    } catch (error) { message(`取消失败：${error.message}`,true); select('#dataset-reconnect').hidden = false; }
    finally { cancelPending = false; controls(); }
  }
  function renderQualityIssues(reset = true) {
    if (!quality) return;
    if (reset) visibleIssues = 50;
    const severity = select('#quality-severity').value, query = select('#quality-search').value.trim().toLocaleLowerCase();
    const issues = (quality.issues || []).filter(issue => (severity === 'all' || issue.severity === severity) && [issue.recipe_id,issue.recipe_name,issue.message,issue.code,issue.field].some(value => String(value || '').toLocaleLowerCase().includes(query)));
    select('#quality-count').textContent = severity === 'info' && !issues.length ? '未知字段的信息提示汇总在上方数量统计中；没有逐条信息记录。' : `符合筛选 ${issues.length} 条 · 已显示 ${Math.min(visibleIssues,issues.length)} 条`;
    select('#quality-issues').innerHTML = issues.slice(0,visibleIssues).map(issue => `<article class="testing-issue"><div class="testing-issue-heading"><span class="testing-badge ${Object.hasOwn(severityNames,issue.severity) ? issue.severity : 'info'}">${escape(severityNames[issue.severity] || issue.severity)}</span>${issue.recipe_id ? `<button class="text-button" data-recipe-id="${escape(issue.recipe_id)}">${escape(issue.recipe_name || issue.recipe_id)}</button>` : `<strong>${escape(issue.recipe_name || '菜谱库')}</strong>`}</div><p>${escape(issue.message)}</p><small>${escape(issue.recipe_id || '')} · ${escape(issue.code)}${issue.field ? ` · ${escape(issue.field)}` : ''}</small></article>`).join('') || `<p class="testing-empty">${severity === 'info' ? '请查看“未知用时、未知份量、未知饮食类型”的统计。未知值没有被当作错误。' : '此筛选下没有检查项。'}</p>`;
    select('#quality-more').hidden = issues.length <= visibleIssues;
  }
  async function runQuality() {
    select('#quality-run').disabled = true; qualityMessage('正在检查菜谱资料…');
    try {
      quality = await request('/api/dataset-tests/quality',{method:'POST',body:'{}'});
      const summary = quality.summary || {};
      select('#quality-report').hidden = false; select('#quality-export').disabled = false;
      select('#quality-meta').textContent = `当前菜谱库 ${quality.catalogue_count} 道 · 检查时间 ${timestamp(quality.generated_at)}${quality.truncated ? ` · 报告列出前 ${quality.issues.length} / ${quality.issue_total} 条，请结合汇总阅读` : ''}`;
      select('#quality-metrics').innerHTML = metric('错误',summary.errors || 0) + metric('警告',summary.warnings || 0) + metric('信息',summary.info || 0) + metric('有错误的菜谱',summary.recipes_with_errors || 0);
      select('#quality-unknown').textContent = `有警告的菜谱 ${summary.recipes_with_warnings || 0} 道；未知用时 ${summary.unknown_time || 0} 道、未知份量 ${summary.unknown_servings || 0} 道、未知饮食类型 ${summary.unknown_diet || 0} 道。未知不等于错误。`;
      renderQualityIssues(); qualityMessage('检查完成。可按级别筛选，点击菜谱名查看原始资料。');
    } catch (error) { qualityMessage(error.message,true); }
    finally { select('#quality-run').disabled = false; }
  }
  function init(dependencies) {
    if (initialized) return;
    initialized = true; request = dependencies.api; download = dependencies.downloadJson; select = selector => document.querySelector(selector);
    ['batch','quality'].forEach(name => select(`#testing-${name}-tab`).addEventListener('click',() => {
      ['batch','quality'].forEach(mode => { const selected = mode === name; select(`#testing-${mode}`).hidden = !selected; select(`#testing-${mode}-tab`).classList.toggle('active',selected); select(`#testing-${mode}-tab`).setAttribute('aria-pressed',String(selected)); });
    }));
    select('#dataset-load').addEventListener('click',loadTemplate);
    select('#dataset-mode').addEventListener('change',() => { renderMode(); message(`已选择${modeNames[selectedMode()] || selectedMode()}。当前 JSON 保持不变；需要时点击“加载内置用例”或“下载 JSON 模板”获取此模式的示例。`); refreshCapabilities(); });
    select('#dataset-configure').addEventListener('click',() => dependencies.openSettings?.());
    select('#dataset-template').addEventListener('click',async () => { try { download('拾味厨房-测试集模板.json',await getTemplate()); } catch (error) { message(error.message,true); } });
    select('#dataset-json').addEventListener('input',() => { controls(); select('#dataset-description').textContent = '测试集已编辑；开始运行时将重新校验。'; });
    select('#dataset-file').addEventListener('change',async event => {
      const file = event.target.files[0]; if (!file) return;
      loading = true; controls();
      try {
        if (file.size > MAX_BYTES) throw new Error('文件超过 1 MiB，请分批导入。');
        const text = await file.text(); parseDataset(text); select('#dataset-json').value = text;
        select('#dataset-description').textContent = `已读取 ${file.name}，开始运行时将校验用例格式。`; message('测试集已载入，可展开查看或编辑。');
      } catch (error) { message(error.message,true); }
      finally { event.target.value = ''; loading = false; controls(); }
    });
    select('#dataset-run').addEventListener('click',run); select('#dataset-cancel').addEventListener('click',cancel);
    select('#dataset-reconnect').addEventListener('click',() => { if (report?.id) resume(report.id); });
    select('#dataset-failures-only').addEventListener('change',() => renderResults(true));
    select('#dataset-export').addEventListener('click',() => { if (report && !loading && !active(report)) download(`拾味厨房-检索报告-${report.id}.json`,report); });
    select('#quality-run').addEventListener('click',runQuality);
    select('#quality-export').addEventListener('click',() => { if (quality) download('拾味厨房-菜谱质量报告.json',quality); });
    select('#quality-severity').addEventListener('change',() => renderQualityIssues()); select('#quality-search').addEventListener('input',() => renderQualityIssues());
    select('#quality-more').addEventListener('click',() => { visibleIssues += 50; renderQualityIssues(false); });
  }
  function open() {
    if (!initialized) return;
    refreshCapabilities();
    if (opened) return;
    opened = true;
    let id; try { id = sessionStorage.getItem(RUN_KEY); } catch { /* Session resumption is optional. */ }
    if (id) resume(id);
    else loadTemplate();
  }
  return {init,open,refreshCapabilities,parseDataset,assertionHtml,turnHtml,webSourcesHtml};
})();
if (typeof module !== 'undefined' && module.exports) module.exports = DatasetTests;
