'use strict';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const icon = (name) => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl = (value) => { try { const u = new URL(value); return u.protocol === 'https:' ? u.href : '#'; } catch { return '#'; } };
const state = {recipes:[], favorites:new Set(), settings:{configured:false,model:'deepseek-flash'}, homeFilter:'all', exploreFilter:'all', areaGroup:'', area:'', recipePage:1, sessionId:null, sending:false, currentRecipe:null, searchTimer:null, messages:[], page:'home', sessionEpoch:0};
const contextIds = ['ingredients','servings','time','diet','avoid','equipment','region'];
let toastTimer;
let editingRecipe=null, importDraft=null;
const contextOverrides=new Set();
let expandedRegions=false;
let editingStock=null, pantry={items:[],counts:{}};
const stockFields=['name','quantity','unit','category','storage','expires_on','opened_on','notes'];
async function refreshPantry() { pantry=await api('/api/pantry');renderPantry(); }
function renderPantry() {
  const counts=pantry.counts;
  $('#pantry-date').textContent=pantry.today||'';
  $('#pantry-summary').innerHTML=[['可参考库存',counts.available||0,'批'],['3 天内到期',counts.urgent||0,'批'],['已过日期 · 待检查',counts.expired||0,'批'],['已用完',counts.depleted||0,'批']].map(([label,n,unit])=>`<div><small>${label}</small><strong>${n}<span>${unit}</span></strong></div>`).join('');
  const q=$('#pantry-search').value.trim().toLocaleLowerCase(),filter=$('#pantry-filter').value;
  const items=pantry.items.filter(item=>item.name.toLocaleLowerCase().includes(q)&&(filter==='all'||filter==='active'&&!['expired','depleted'].includes(item.status)||filter==='urgent'&&['today','soon'].includes(item.status)||filter===item.status));
  $('#pantry-total').textContent=`共 ${pantry.items.length} 个批次 · 当前显示 ${items.length} 个`;
  $('#pantry-items').innerHTML=items.length?items.map(item=>{
    const status={expired:'已过日期 · 待检查',today:'今天到期',soon:`${item.days_left} 天后到期`,fresh:`${item.days_left} 天后到期`,unknown:'日期未标注',depleted:'已用完'}[item.status];
    return `<article class="pantry-card"><div class="stock-heading"><span class="stock-category">${esc(item.category)} · ${esc(item.storage)}</span><span class="stock-status ${esc(item.status)}">${esc(status)}</span></div><h2>${esc(item.name)}</h2><div class="stock-quantity">${esc(item.quantity)}<small>${esc(item.unit)}</small></div><div class="stock-dates"><span>到期 ${esc(item.expires_on||'未填写')}</span><span>开封 ${esc(item.opened_on||'未填写')}</span></div>${item.notes?`<p class="stock-notes">${esc(item.notes)}</p>`:''}<div class="stock-actions"><button data-stock-action="edit" data-stock-id="${esc(item.id)}">编辑</button>${item.status!=='depleted'?`<button data-stock-action="used" data-stock-id="${esc(item.id)}">已用完</button>`:''}<button data-stock-action="delete" data-stock-id="${esc(item.id)}">移除</button></div></article>`;
  }).join(''):emptyState(pantry.items.length?'这里暂时没有食材':'给冰箱做一本小账本',pantry.items.length?'换个筛选条件试试。':'点击“放入新食材”，从手边的第一份新鲜开始。',false);
  $('#pantry-context-summary').textContent=`可参考 ${counts.available||0} 批 · 临期 ${counts.urgent||0} 批`;
}
function openPantryEditor(item=null) {
  editingStock=item;$('#pantry-editor-form').reset();$('#pantry-message').textContent='';
  $('#pantry-editor-title').textContent=item?'更新这份食材':'放入新食材';
  if(item)stockFields.forEach(key=>$(`#stock-${key}`).value=item[key]);
  // Use the server's local calendar date, not a UTC date that may be yesterday.
  if(pantry.today)$('#stock-opened_on').max=pantry.today;
  $('#pantry-editor').showModal();
}
async function savePantry(event) {
  event.preventDefault();const button=$('#save-pantry');button.disabled=true;
  const body=Object.fromEntries(stockFields.map(key=>[key,key==='quantity'?Number($('#stock-quantity').value):$(`#stock-${key}`).value.trim()]));
  try {await api(editingStock?`/api/pantry/${encodeURIComponent(editingStock.id)}`:'/api/pantry',{method:editingStock?'PUT':'POST',body:JSON.stringify(body)});await refreshPantry();$('#pantry-editor').close();toast('食材已保存，下一次推荐会参考最新库存');}catch(err){$('#pantry-message').textContent=err.message;}finally{button.disabled=false;}
}
async function pantryAction(button) {
  const item=pantry.items.find(item=>item.id===button.dataset.stockId);if(!item)return;
  if(button.dataset.stockAction==='edit'){openPantryEditor(item);return;}
  if(button.dataset.stockAction==='delete'&&!window.confirm(`移除“${item.name}”这一批食材？`))return;
  button.disabled=true;
  try {
    await api(`/api/pantry/${encodeURIComponent(item.id)}`,button.dataset.stockAction==='delete'?{method:'DELETE'}:{method:'PUT',body:JSON.stringify({...Object.fromEntries(stockFields.map(key=>[key,item[key]])),quantity:0})});
    await refreshPantry();toast(button.dataset.stockAction==='delete'?'已移除这批食材':'已标记用完，推荐将参考剩余库存');
  }finally{button.disabled=false;}
}
async function analyzePantry(mode) {
  if(state.sending){toast('小厨正在回答，请等这次回答完成。');return;}
  const buttons=[$('#pantry-menu'),$('#pantry-expiry')];buttons.forEach(b=>b.disabled=true);
  try {
    await refreshPantry();if(!pantry.counts.available){toast('还没有可参考的库存，先放入食材或检查日期吧。');return;}
    $('#context-use-pantry').checked=true;$('#context-pantry-mode').value=mode;saveContext();newChat();
    goChat(mode==='expiry'?'请根据食材仓库的到期日期安排消耗顺序，推荐 2–3 道适合的菜。列出建议用量、已有食材及需要补充的材料。':'请根据食材仓库推荐 2–3 道适合今天的菜，尽量使用现有食材。列出建议用量、已有食材及需要补充的材料。');
    $('#chat-form').requestSubmit();
  }catch(err){toast(err.message);}finally{buttons.forEach(b=>b.disabled=false);}
}
async function api(path, options = {}) {
  const response = await fetch(path, { ...options, headers: {'Content-Type':'application/json', ...options.headers} });
  let data;
  try { data = await response.json(); } catch { throw new Error('厨房服务没有返回有效数据，请检查服务是否正在运行。'); }
  if (!response.ok) { const error=new Error(data.error || '操作失败，请稍后重试。');error.status=response.status;throw error; }
  return data;
}
function toast(message) { $('#toast').textContent=message; $('#toast').classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3500); }
function context() { return {...Object.fromEntries(contextIds.map(id => [id,$(`#context-${id}`).value])),use_pantry:$('#context-use-pantry').checked,pantry_mode:$('#context-pantry-mode').value}; }
function saveContext() { try { localStorage.setItem('shiwei.context',JSON.stringify(context())); } catch {} updateContextChips(); }
function syncContext(values,expected=null) {
  if(!values)return;
  contextIds.forEach(key=>{
    const input=$(`#context-${key}`),value=values[key];
    if(value==null||expected&&input.value!==String(expected[key]))return;
    if(input.tagName==='SELECT'&&!Array.from(input.options).some(option=>option.value===String(value))){
      const option=document.createElement('option');option.value=String(value);option.textContent=key==='time'?`${value} 分钟`:`${value} 人`;input.append(option);
    }
    input.value=String(value);
  });
  saveContext();
}
function updateContextChips() { const c=context();$('#context-pantry-mode').disabled=!c.use_pantry; $('#composer-context').innerHTML=`<span>${esc(c.servings)} 人</span><span>${esc(c.time)} 分钟</span>${c.diet ? `<span>${c.diet==='vegan'?'纯素':'蛋奶素'}</span>`:''}${c.region?`<span>${esc(c.region)}菜式</span>`:''}${c.avoid?'<span>已填写忌口</span>':''}${c.use_pantry?`<span>${c.pantry_mode==='expiry'?'仓库 · 优先临期':'已引用食材仓库'}</span>`:''}`; }
function updateStatus() {
  const online=state.settings.configured;
  $('#connection-status').innerHTML=`<span class="status-dot"></span>${online?'DeepSeek 已配置':'本地菜谱模式'}`;
  $('#chat-mode-label').textContent=online?`DeepSeek · ${state.settings.model} · 结合本地菜谱回答`:'本地菜谱模式 · 配置 DeepSeek 后启用 AI 调整';
  $('#api-model').value=state.settings.model;
  $('#composer-note').textContent=online?'AI 会参考菜谱与厨房条件。请结合实际食材和设备判断做法。':'当前为本地检索，不能自由推理。连接 DeepSeek 后可获得个性化调整。';
}
function updateFavoriteCount() { $('#favorite-count').textContent=state.favorites.size; }
function emptyState(title, detail, link=true) { return `<div class="empty-state">${icon('leaf')}<h3>${esc(title)}</h3><p>${esc(detail)}</p>${link?'<a class="primary-button" href="#recipes">去发现新味道 →</a>':''}</div>`; }
function photoHandlers(root=document) { $$('img',root).forEach(img=>{ img.addEventListener('error',()=>{img.parentElement.classList.add('photo-fallback');}, {once:true}); }); }
function card(recipe) {
  const liked=state.favorites.has(recipe.id);
  return `<article class="recipe-card"><div class="card-image-wrap"><button class="card-image-button" data-recipe-id="${recipe.id}" aria-label="查看${esc(recipe.name)}的做法"><img src="${esc(recipe.image)}" alt="${esc(recipe.image_alt)}（风味示意）" loading="lazy"></button><span class="card-badge">${esc(recipe.cuisine)}</span><button class="favorite-button ${liked?'is-favorite':''}" data-favorite-id="${recipe.id}" aria-pressed="${liked}" aria-label="${liked?'取消收藏':'收藏'}${esc(recipe.name)}">${icon('heart')}</button></div><div class="card-content"><button class="card-name-button" data-recipe-id="${recipe.id}"><h3>${esc(recipe.name)}</h3></button><p class="card-description">${esc(recipe.description)}</p><div class="card-meta"><span>${icon('clock')}${esc(recipeTime(recipe))}</span><span>${icon('user')}${recipe.servings_note?'原文份量':recipe.servings+' 人份'}</span><span class="difficulty">${esc(recipe.difficulty)}</span></div></div></article>`;
}
function renderGrid(selector, recipes, empty=emptyState('还没有找到合适的菜谱','换个关键词或筛选条件，再试一次。',false)) {
  $(selector).innerHTML=recipes.length?recipes.map(card).join(''):empty; photoHandlers($(selector));
}
function renderHome() { const recipes=state.recipes.filter(r=>state.homeFilter==='all'||r.region===state.homeFilter); const picks=state.homeFilter==='all'?['tomato-eggs','carbonara','teriyaki-chicken'].map(id=>recipes.find(r=>r.id===id)).filter(Boolean):recipes.slice(0,3); renderGrid('#home-recipes',picks); }
function renderRegions() {
  const groups=['中国','亚洲','欧洲','美洲','中东','非洲','大洋洲','其他'].filter(g=>state.recipes.some(r=>r.area_group===g));
  const label=g=>g==='中国'?'中国各地':g==='亚洲'?'亚洲料理':g;
  const groupCount=g=>state.recipes.filter(r=>r.area_group===g).length;
  $('#region-groups').innerHTML=`<button data-region-group="" aria-pressed="${!state.areaGroup}" class="${!state.areaGroup?'active':''}">全部地区 <small>${state.recipes.length}</small></button>`+groups.map(g=>`<button data-region-group="${esc(g)}" aria-pressed="${state.areaGroup===g}" class="${state.areaGroup===g?'active':''}">${esc(label(g))} <small>${groupCount(g)}</small></button>`).join('');
  const selected=state.recipes.filter(r=>!state.areaGroup||r.area_group===state.areaGroup);
  const common=['家常菜','四川','广东','湖南','东北','日本','意大利','墨西哥'];
  const rank=area=>common.includes(area)?common.indexOf(area):common.length;
  const areas=[...new Set(selected.map(r=>r.area).filter(Boolean))].sort((a,b)=>rank(a)-rank(b)||a.localeCompare(b,'zh-CN'));
  const visible=expandedRegions?areas:areas.slice(0,10);
  if(state.area&&!visible.includes(state.area))visible.push(state.area);
  $('#region-areas').innerHTML=`<button data-region-area="" aria-pressed="${!state.area}" class="${!state.area?'active':''}">全部口味</button>`+visible.map(a=>`<button data-region-area="${esc(a)}" aria-pressed="${state.area===a}" class="${state.area===a?'active':''}">${esc(a)} <small>${selected.filter(r=>r.area===a).length}</small></button>`).join('')+(areas.length>10?`<button data-region-toggle aria-expanded="${expandedRegions}" class="region-toggle">${expandedRegions?'收起地区 ↑':`查看全部 ${areas.length} 个地区 ↓`}</button>`:'');
  $('#region-summary').textContent=`${new Set(state.recipes.map(r=>r.area).filter(Boolean)).size} 个地区与风味`;
}
function recipeTime(r) { return r.time_note==='unknown'?'用时未标注':`${r.time_note==='source'?'约 ':''}${r.minutes} 分钟`; }
function searchText(value) { let text=String(value||'').toLowerCase(); const aliases={'川菜':'四川','粤菜':'广东','湘菜':'湖南','鲁菜':'山东','苏菜':'江苏','浙菜':'浙江','闽菜':'福建','徽菜':'安徽','日式':'日本','韩式':'韩国','意式':'意大利','法式':'法国','西红柿':'番茄'};for(const [from,to] of Object.entries(aliases))text=text.replaceAll(from,to);return text; }
function renderExplore(resetPage=false) {
  if(resetPage)state.recipePage=1;
  renderRegions();
  const q=searchText($('#recipe-search').value.trim()), time=Number($('#time-filter').value)||Infinity, diet=$('#diet-filter').value;
  const recipes=state.recipes.filter(r=>(state.exploreFilter==='all'||r.region===state.exploreFilter)&&(!state.areaGroup||r.area_group===state.areaGroup)&&(!state.area||r.area===state.area)&&(!Number.isFinite(time)||(r.time_note!=='unknown'&&r.minutes<=time))&&(!diet||r.diet===diet||(diet==='vegetarian'&&r.diet==='vegan'))&&(!q||searchText([r.name,r.description,r.cuisine,r.area,r.area_group,r.tags.join(' '),r.ingredients.map(i=>i.name).join(' ')].join(' ')).includes(q)));
  $('#results-caption').textContent=`找到 ${recipes.length} 道菜谱 · 点击菜谱查看食材与步骤`;
  $('#recipe-total').textContent=`${state.recipes.length} 道菜谱 · 持续探索`;
  const pageSize=24, pages=Math.max(1,Math.ceil(recipes.length/pageSize));state.recipePage=Math.min(state.recipePage,pages);
  renderGrid('#explore-recipes',recipes.slice((state.recipePage-1)*pageSize,state.recipePage*pageSize));
  $('#results-caption').textContent=`${state.area||state.areaGroup||'全部地区'} · 找到 ${recipes.length} 道菜谱 · 每页 ${pageSize} 道`;
  $('#recipe-pagination').innerHTML=recipes.length>pageSize?`<button data-recipe-page="${state.recipePage-1}" ${state.recipePage===1?'disabled':''}>上一页</button><span>第 ${state.recipePage} / ${pages} 页</span><button data-recipe-page="${state.recipePage+1}" ${state.recipePage===pages?'disabled':''}>下一页</button>`:'';
}
function renderFavorites() { renderGrid('#favorite-recipes',state.recipes.filter(r=>state.favorites.has(r.id)),emptyState('把喜欢的味道收进来','点击菜谱上的爱心，建立属于你的小小食谱。')); }
function renderPersonal() {
  const recipes=state.recipes.filter(r=>r.personal);
  $('#personal-total').textContent=`已留下 ${recipes.length} 道自己的味道 · 点击菜谱可以查看、编辑和删除`;
  $('#export-recipes').disabled=!recipes.length;
  renderGrid('#personal-recipes',recipes,emptyState('第一道，写下你最熟悉的味道','手动添加一道菜，或导入 JSON 菜谱文件。'));
}
async function refreshRecipes() {
  const [recipes,favorites]=await Promise.all([api('/api/recipes'),api('/api/favorites')]);
  state.recipes=recipes;state.favorites=new Set(favorites);
  renderHome();renderExplore();renderFavorites();renderPersonal();updateFavoriteCount();
}
function downloadJson(name,data) {
  const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json;charset=utf-8'}));
  const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function openEditor(recipe=null) {
  editingRecipe=recipe?structuredClone(recipe):{id:`user-${crypto.randomUUID().replaceAll('-','')}`};
  $('#recipe-editor-form').reset();$('#editor-message').textContent='';
  $('#editor-title').textContent=recipe?'把这道菜写得更好':'记一道拿手菜';
  const fields={name:recipe?.name||'',group:recipe?.area_group||'中国',area:recipe?.area||'家常菜',minutes:recipe?.time_note==='unknown'?'':recipe?.minutes||'',servings:recipe?.servings_note?'':recipe?.servings||'',diet:recipe?.diet||'unknown',allergens:recipe?.allergens?.join('、')||'',description:recipe?.description||'',tip:recipe?.tip||'',source:recipe?.source?.url||'',steps:recipe?.steps?.join('\n')||'',ingredients:recipe?.ingredients?.map(i=>i.quantity==null?`${i.name}${i.unit?` | ${i.unit}`:''}`:`${i.name} | ${i.quantity} | ${i.unit}`).join('\n')||''};
  for(const [key,value] of Object.entries(fields))$(`#edit-${key}`).value=value;
  $('#recipe-area-options').innerHTML=[...new Set(state.recipes.map(r=>r.area).filter(Boolean))].map(area=>`<option value="${esc(area)}"></option>`).join('');
  $('#recipe-editor').showModal();
}
function parseIngredients(text) {
  return text.split('\n').map(line=>line.trim()).filter(Boolean).map(line=>{
    const parts=line.split('|').map(p=>p.trim());
    if(parts.length===1)return {name:line,quantity:null,unit:''};
    if(parts.length>3||!parts[0])throw new Error('食材请按“名称 | 数量 | 单位”填写，每行一项。');
    const numeric=parts[1]!==''&&Number.isFinite(Number(parts[1]));
    if(parts.length===3&&!numeric)throw new Error('三列食材的数量必须为数字；适量可写“盐 | 适量”。');
    return {name:parts[0],quantity:numeric?Number(parts[1]):null,unit:parts.length===3?parts[2]:numeric?'':parts[1]};
  });
}
async function saveRecipe(event) {
  event.preventDefault();const btn=$('#save-recipe');btn.disabled=true;$('#editor-message').textContent='';
  try {
    const read=key=>$(`#edit-${key}`).value.trim(), group=read('group'), sourceUrl=read('source');
    const recipe={...editingRecipe,name:read('name'),area_group:group,area:read('area'),cuisine:read('area'),region:['中国','亚洲'].includes(group)?'东方':'西方',minutes:read('minutes')?Number(read('minutes')):1,time_note:read('minutes')?'':'unknown',servings:read('servings')?Number(read('servings')):2,servings_note:read('servings')?'':'份量未注明，保留录入用量。',diet:read('diet'),allergens:read('allergens').split(/[,，、]/).map(s=>s.trim()).filter(Boolean),description:read('description')||'来自我的厨房的一道菜。',tip:read('tip')||'结合食材状态和锅具判断火候。',ingredients:parseIngredients(read('ingredients')),steps:read('steps').split('\n').map(s=>s.trim()).filter(Boolean)};
    recipe.source=sourceUrl?{name:editingRecipe.source?.url===sourceUrl?editingRecipe.source.name:'用户提供的参考来源',title:recipe.name,url:sourceUrl,retrieved_at:editingRecipe.source?.retrieved_at||new Intl.DateTimeFormat('sv-SE').format(new Date())}:{name:'我的厨房',title:recipe.name,url:'',retrieved_at:new Intl.DateTimeFormat('sv-SE').format(new Date())};
    await api('/api/recipes/import',{method:'POST',body:JSON.stringify({recipes:[recipe],on_conflict:'update'})});
    await refreshRecipes();$('#recipe-editor').close();location.hash='personal';toast('菜谱已保存，小厨也能查到它了');
  }catch(err){$('#editor-message').textContent=err.message;}finally{btn.disabled=false;}
}
async function deletePersonalRecipe(recipe) {
  if(!window.confirm(`删除“${recipe.name}”？这道菜及其收藏会移除。可先在“我的菜谱”导出备份。`))return;
  try {await api(`/api/personal-recipes/${encodeURIComponent(recipe.id)}`,{method:'DELETE'});$('#recipe-dialog').close();state.currentRecipe=null;await refreshRecipes();toast('已删除这道自建菜谱');}catch(err){toast(err.message);}
}
function invalidateImport() {importDraft=null;$('#confirm-import').disabled=true;$('#import-preview').hidden=true;$('#import-message').textContent='';}
function openImporter() {
  $('#import-json').value='';$('#import-file').value='';$('#import-conflict').value='skip';invalidateImport();$('#recipe-importer').showModal();
}
async function previewImport() {
  invalidateImport();const text=$('#import-json').value,policy=$('#import-conflict').value;$('#preview-import').disabled=true;
  try {
    if(new TextEncoder().encode(text).length>2*1024*1024)throw new Error('JSON 内容超过 2 MB，请分批导入。');
    const records=JSON.parse(text.replace(/^\uFEFF/,''));
    if(!Array.isArray(records))throw new Error('JSON 顶层需要是菜谱数组，请参考示例模板。');
    const recipes=records.map(r=>r&&typeof r==='object'&&!Array.isArray(r)?{...r,id:r.id||`user-${crypto.randomUUID().replaceAll('-','')}`}:r);
    const result=await api('/api/recipes/import',{method:'POST',body:JSON.stringify({recipes,dry_run:true,on_conflict:policy})});
    if(text!==$('#import-json').value||policy!==$('#import-conflict').value)throw new Error('内容已改变，请重新检查并预览。');
    importDraft={recipes,policy};
    $('#import-preview').innerHTML=`<strong>将新增 ${result.added} 道 · 更新 ${result.updated} 道 · 跳过 ${result.skipped} 道</strong><ul>${result.recipes.slice(0,20).map(r=>`<li>${esc(r.name)} <small>${esc(r.area_group)} / ${esc(r.area)}</small></li>`).join('')}</ul>${result.recipes.length>20?`<p>另有 ${result.recipes.length-20} 道菜谱…</p>`:''}`;
    $('#import-preview').hidden=false;$('#confirm-import').disabled=result.added+result.updated===0;
    $('#import-message').textContent='检查通过，点击“确认导入”才会保存到本机。';
  }catch(err){$('#import-message').textContent=err instanceof SyntaxError?'JSON 格式有误，请检查引号、逗号与括号。':err.message;}finally{$('#preview-import').disabled=false;}
}
async function confirmImport() {
  if(!importDraft)return;const draft=importDraft;
  const controls=['confirm-import','preview-import','import-json','import-file','import-conflict'];controls.forEach(id=>$(`#${id}`).disabled=true);
  try {
    const result=await api('/api/recipes/import',{method:'POST',body:JSON.stringify({recipes:draft.recipes,on_conflict:draft.policy})});
    importDraft=null;await refreshRecipes();$('#recipe-importer').close();location.hash='personal';toast(`已新增 ${result.added} 道、更新 ${result.updated} 道、跳过 ${result.skipped} 道菜谱`);
  }catch(err){$('#import-message').textContent=err.message;}finally{controls.forEach(id=>$(`#${id}`).disabled=false);$('#confirm-import').disabled=!importDraft;}
}
function navigate() {
  const page=location.hash.slice(1)||'home', valid=['home','recipes','favorites','chat','personal','pantry'].includes(page)?page:'home';
  state.page=valid;
  $$('.page').forEach(el=>{el.hidden=el.id!==`page-${valid}`;});
  $$('.nav-item[data-page]').forEach(el=>{el.classList.toggle('active',el.dataset.page===valid); if(el.dataset.page===valid)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});
  $('#page-label').textContent={home:'厨房首页',recipes:'探索菜谱',favorites:'我的收藏',chat:'问问小厨',personal:'我的菜谱',pantry:'食材仓库'}[valid];
  toggleSidebar(false);
  if(valid==='recipes')renderExplore();
  if(valid==='favorites')renderFavorites();
  if(valid==='personal')renderPersonal();
  if(valid==='pantry')refreshPantry().catch(err=>toast(err.message));
  if(valid==='chat')loadHistory().catch(()=>{});
  window.scrollTo(0,0);
}
function toggleSidebar(open) { $('#sidebar').classList.toggle('open',open); $('#sidebar').inert=window.matchMedia('(max-width:680px)').matches&&!open; $('#menu-button').setAttribute('aria-expanded',String(open)); }
async function toggleFavorite(id) {
  const button=$(`[data-favorite-id="${id}"]`), previous=state.favorites.has(id);
  if(button)button.disabled=true;
  try {
    await api(`/api/favorites/${encodeURIComponent(id)}`,{method:'PUT',body:JSON.stringify({favorite:!previous})});
    if(previous)state.favorites.delete(id);else state.favorites.add(id);
    updateFavoriteCount();renderHome();renderExplore();renderFavorites();renderPersonal();
    if(state.currentRecipe?.id===id)updateDetailFavorite();
    toast(previous?'已从收藏中移除':'已收藏，留住这个好味道');
  }catch(err){toast(err.message);}finally{if(button)button.disabled=false;}
}
function updateDetailFavorite() { const btn=$('#detail-favorite'); if(!btn)return;const liked=state.favorites.has(state.currentRecipe.id);btn.innerHTML=`${icon('heart')}${liked?'已收藏':'收藏菜谱'}`;btn.setAttribute('aria-pressed',String(liked)); }
function renderIngredients() {
  const recipe=state.currentRecipe, servings=Number($('#detail-servings').value);
  $('#detail-ingredients').innerHTML=recipe.ingredients.map(i=>{let quantity=i.quantity;if(typeof quantity==='number'){quantity=Number((quantity*servings/recipe.servings).toFixed(1));}return `<li><span>${esc(i.name)}</span><small>${quantity==null?esc(i.unit||'适量'):esc(quantity)+esc(i.unit)}</small></li>`;}).join('');
}
async function openRecipe(id) {
  try {
    const recipe=await api(`/api/recipes/${encodeURIComponent(id)}`);state.currentRecipe=recipe;
    $('#recipe-detail').innerHTML=`<div class="detail-top"><img src="${esc(recipe.image)}" alt="${esc(recipe.image_alt)}（风味示意）"><div class="detail-title"><small>${esc(recipe.area_group)} / ${esc(recipe.area || recipe.cuisine)}</small><h2>${esc(recipe.name)}</h2></div></div><div class="detail-content"><div class="detail-summary"><span>${icon('clock')}${esc(recipeTime(recipe))}</span><span>${icon('chef')}${esc(recipe.difficulty)}</span><span>${recipe.diet==='vegan'?'纯素':recipe.diet==='vegetarian'?'蛋奶素':recipe.diet==='unknown'?'饮食类型待核对':'荤素搭配'}</span><div class="detail-actions"><button class="secondary-button" id="detail-favorite"></button><button class="secondary-button" id="detail-ask">${icon('spark')}请小厨调整</button></div></div><p class="detail-description">${esc(recipe.description)}</p><div class="detail-columns"><section><h3>准备这些食材</h3><div class="servings-control"><span>${recipe.servings_note?'保留原文份量':'按人数换算用量'}</span><select id="detail-servings" aria-label="菜谱人数" ${recipe.servings_note?'disabled':''}>${recipe.servings_note?`<option value="${recipe.servings}">原文份量</option>`:[...new Set([1,2,3,4,6,8,recipe.servings])].sort((a,b)=>a-b).map(n=>`<option value="${n}" ${n===recipe.servings?'selected':''}>${n} 人份</option>`).join('')}</select></div><ul class="ingredient-list" id="detail-ingredients"></ul>${recipe.quantity_notes?`<details class="quantity-notes" open><summary>原文用量说明</summary><p>${esc(recipe.quantity_notes)}</p></details>`:''}</section><section><h3>一步一步，好好做饭</h3><ol class="step-list">${recipe.steps.map(s=>`<li ${s.startsWith('【')?'class="step-section"':''}>${esc(s)}</li>`).join('')}</ol><div class="recipe-tip">✦ 小提醒：${esc(recipe.tip)}</div></section></div><div class="detail-source">参考来源：${recipe.source.url?`<a href="${esc(safeUrl(recipe.source.url))}" target="_blank" rel="noopener noreferrer">${esc(recipe.source.name)} · ${esc(recipe.source.title)} ${icon('link')}</a>`:`<span>${esc(recipe.source.name)} · ${esc(recipe.source.title)}</span>`}<br>整理日期：${esc(recipe.source.retrieved_at)} · ${esc(recipe.adaptation)} 配图为风味示意。<br>常见过敏原：${esc(recipe.allergens.join('、')||'无已标注常见过敏原，请核对包装')}。人数换算仅缩放食材用量，烹饪时间须按锅具和食材状态判断。</div></div>`;
    renderIngredients();updateDetailFavorite();photoHandlers($('#recipe-detail'));
    $('#detail-servings').addEventListener('change',renderIngredients);
    $('#detail-favorite').addEventListener('click',()=>toggleFavorite(id));
    if(recipe.personal){
      const edit=document.createElement('button');edit.className='secondary-button';edit.textContent='编辑';edit.addEventListener('click',()=>{$('#recipe-dialog').close();openEditor(recipe);});
      const remove=document.createElement('button');remove.className='secondary-button';remove.textContent='删除';remove.addEventListener('click',()=>deletePersonalRecipe(recipe));
      $('.detail-actions').append(edit,remove);
    }
    $('#detail-ask').addEventListener('click',()=>{const servings=recipe.servings_note?$('#context-servings').value:$('#detail-servings').value;$('#recipe-dialog').close();goChat(`我想做${recipe.name}，请结合我的厨房条件调整为 ${servings} 人份，列出食材用量、替代方案和具体步骤。`);});
    if(!$('#recipe-dialog').open)$('#recipe-dialog').showModal();
  }catch(err){toast(err.message);}
}
function markdown(text) {
  // Text is escaped first. Only a small, safe Markdown subset is rendered.
  function inline(value) { return esc(value).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/`([^`]+)`/g,'<code>$1</code>'); }
  const blocks=[];let listType=null,items=[];
  const flush=()=>{if(listType){blocks.push(`<${listType}>${items.join('')}</${listType}>`);listType=null;items=[];}};
  text.split('\n').forEach(line=>{const heading=line.match(/^#{1,4}\s+(.+)$/),unordered=line.match(/^[-*]\s+(.+)$/),ordered=line.match(/^\d+[.)、]\s*(.+)$/);if(unordered||ordered){const type=unordered?'ul':'ol';if(listType&&listType!==type)flush();listType=type;items.push(`<li>${inline((unordered||ordered)[1])}</li>`);}else{flush();if(heading)blocks.push(`<h3>${inline(heading[1])}</h3>`);else if(line.trim())blocks.push(`<p>${inline(line)}</p>`);}});flush();return blocks.join('');
}
function appendMessage(role,content,mode=null,sources=[],save=true) {
  $('#chat-welcome').hidden=true;
  const div=document.createElement('div');div.className=`message ${role}`;
  const body=document.createElement('div');body.className='message-body';
  if(role==='assistant'&&mode){const label=document.createElement('div');label.className='message-mode';label.textContent=mode==='deepseek'?'DEEPSEEK · 参考本地菜谱':sources.length?'本地菜谱检索 · 尚未调用 AI':'本地菜谱检索 · 0 匹配';body.append(label);}
  const contentDiv=document.createElement('div');contentDiv.className='message-content';if(role==='user')contentDiv.textContent=content;else contentDiv.innerHTML=markdown(content);body.append(contentDiv);
  if(sources.length){const list=document.createElement('div');list.className='message-source-list';sources.forEach(r=>{const btn=document.createElement('button');btn.textContent=`↗ ${r.name}`;btn.dataset.recipeId=r.id;list.append(btn);});body.append(list);}
  const avatar=document.createElement('div');avatar.className='message-avatar';if(role==='user')avatar.textContent='我';else avatar.innerHTML=icon('chef');div.append(avatar,body);$('#chat-messages').append(div);
  if(save)state.messages.push({role,content,mode,sources});scrollChat();return div;
}
function scrollChat() { const box=$('#chat-scroll');box.scrollTop=box.scrollHeight; }
function goChat(prompt='') { location.hash='chat';if(prompt){$('#chat-input').value=prompt;setTimeout(()=>$('#chat-input').focus(),50);} }
async function sendChat(event) {
  event.preventDefault();if(state.sending)return;
  const message=$('#chat-input').value.trim();if(!message)return;
  state.sending=true;$('#send-button').disabled=true;$('#new-chat').disabled=true;const epoch=state.sessionEpoch;
  const userNode=appendMessage('user',message);$('#chat-input').value='';
  const thinking=document.createElement('div');thinking.className='message';thinking.innerHTML=`<span class="message-avatar">${icon('chef')}</span><div class="thinking">${state.settings.configured?'小厨正在查看菜谱，准备你的答案':'正在从本地菜谱中寻找好味道'} <span></span><span></span><span></span></div>`;$('#chat-messages').append(thinking);scrollChat();
  const sentContext=context();
  const sentOverrides=[...contextOverrides];
  try {
    const result=await api('/api/chat',{method:'POST',body:JSON.stringify({message,session_id:state.sessionId,context:sentContext,context_overrides:sentOverrides})});
    if(epoch!==state.sessionEpoch)return;
    state.sessionId=result.session_id;sessionStorage.setItem('shiwei.session',state.sessionId);thinking.remove();sentOverrides.forEach(key=>{if($(`#context-${key}`).value===String(sentContext[key]))contextOverrides.delete(key);});syncContext(result.context,sentContext);appendMessage('assistant',result.content,result.mode,result.sources);await loadHistory();
  } catch(err) {
    thinking.remove();userNode.remove();state.messages.pop();$('#chat-input').value=message;
    const error=document.createElement('div');error.className='error-message';error.textContent=err.message;$('#chat-messages').append(error);scrollChat();
  } finally { state.sending=false;$('#send-button').disabled=false;$('#new-chat').disabled=false; }
}
async function loadHistory() { const sessions=await api('/api/sessions');$('#chat-history').innerHTML=sessions.length?sessions.map(s=>`<button data-session-id="${esc(s.id)}" title="${esc(s.title)}">${esc(s.title)}</button>`).join(''):'<span class="history-empty">聊过的味道，会留在这里。</span>'; }
async function loadSession(id) {
  if(state.sending){toast('小厨正在回答，请等这次回答完成。');return;}
  const epoch=++state.sessionEpoch;
  try { const session=await api(`/api/sessions/${encodeURIComponent(id)}`);if(epoch!==state.sessionEpoch)return;state.sessionId=id;state.messages=[];sessionStorage.setItem('shiwei.session',id);syncContext(session.context);$('#chat-messages').replaceChildren();$('#chat-welcome').hidden=!!session.messages.length;session.messages.forEach(m=>appendMessage(m.role,m.content,m.mode,m.sources)); } catch(err){if(err.status===404&&sessionStorage.getItem('shiwei.session')===id)newChat();toast(err.message);}
}
function newChat() { if(state.sending)return;state.sessionEpoch++;state.sessionId=null;state.messages=[];sessionStorage.removeItem('shiwei.session');$('#chat-messages').replaceChildren();$('#chat-welcome').hidden=false;$('#chat-input').value='';$('#chat-input').focus(); }
function openSettings() { $('#api-key').value='';$('#settings-message').textContent='';$('#api-key').placeholder=state.settings.configured?'已配置 Key；留空保持不变':'输入你的 DeepSeek API Key';$('#api-model').value=state.settings.model;$('#settings-dialog').showModal(); }
async function saveSettings(event) {
  event.preventDefault();$('#save-settings').disabled=true;
  try { const data=await api('/api/settings',{method:'POST',body:JSON.stringify({api_key:$('#api-key').value.trim(),model:$('#api-model').value.trim()})});state.settings=data;updateStatus();$('#api-key').value='';$('#settings-dialog').close();toast(data.configured?'设置已保存，下次提问将调用 DeepSeek':'设置已保存，当前为本地菜谱模式'); }catch(err){$('#settings-message').textContent=err.message;}finally{$('#save-settings').disabled=false;}
}
async function disconnect() { try{state.settings=await api('/api/settings',{method:'POST',body:JSON.stringify({clear_key:true,model:$('#api-model').value.trim()})});updateStatus();$('#api-key').value='';$('#settings-message').textContent='已移除本机保存的 Key，切换为本地菜谱模式。';}catch(err){$('#settings-message').textContent=err.message;} }
function setExploreFilter(filter) { state.exploreFilter=filter;$$('#explore-tabs button').forEach(b=>b.classList.toggle('active',b.dataset.exploreFilter===filter)); }
function bindEvents() {
  $('#add-pantry').addEventListener('click',()=>openPantryEditor());$('#pantry-editor-form').addEventListener('submit',savePantry);
  $('#pantry-search').addEventListener('input',renderPantry);$('#pantry-filter').addEventListener('change',renderPantry);
  $('#pantry-menu').addEventListener('click',()=>analyzePantry('menu'));$('#pantry-expiry').addEventListener('click',()=>analyzePantry('expiry'));
  $('#context-use-pantry').addEventListener('change',saveContext);$('#context-pantry-mode').addEventListener('change',saveContext);
  $('#pantry-items').addEventListener('click',e=>{const b=e.target.closest('[data-stock-action]');if(b)pantryAction(b).catch(err=>toast(err.message));});
  $('#add-recipe').addEventListener('click',()=>openEditor());$('#recipe-editor-form').addEventListener('submit',saveRecipe);
  $('#import-recipes').addEventListener('click',openImporter);$('#preview-import').addEventListener('click',previewImport);$('#confirm-import').addEventListener('click',confirmImport);
  $('#import-json').addEventListener('input',invalidateImport);$('#import-conflict').addEventListener('change',invalidateImport);
  $('#import-file').addEventListener('change',async()=>{
    invalidateImport();const file=$('#import-file').files[0];if(!file)return;
    try {if(file.size>2*1024*1024)throw new Error('文件超过 2 MB，请分批导入。');const text=await file.text();$('#import-json').value=text;$('#import-message').textContent=`已读取 ${file.name}，请检查并预览。`;}catch(err){$('#import-message').textContent=err.message;}
  });
  $('#export-recipes').addEventListener('click',()=>downloadJson('拾味厨房-我的菜谱.json',state.recipes.filter(r=>r.personal)));
  $('#download-template').addEventListener('click',()=>downloadJson('拾味厨房-导入模板.json',[{name:'番茄炒鸡蛋（我的做法）',area_group:'中国',area:'家常菜',minutes:15,servings:2,diet:'vegetarian',allergens:['鸡蛋'],ingredients:[{name:'番茄',quantity:2,unit:'个'},{name:'鸡蛋',quantity:3,unit:'个'},{name:'盐',quantity:null,unit:'适量'}],steps:['番茄洗净切块，鸡蛋打散。','热锅加油炒熟鸡蛋，盛出。','炒软番茄，加入鸡蛋与盐，翻炒均匀。']} ]));
  window.addEventListener('hashchange',navigate);
  $('#menu-button').addEventListener('click',()=>toggleSidebar(!$('#sidebar').classList.contains('open')));$('#sidebar-backdrop').addEventListener('click',()=>toggleSidebar(false));
  window.matchMedia('(max-width:680px)').addEventListener('change',()=>toggleSidebar(false));
  document.addEventListener('keydown',event=>{if(event.key==='Escape')toggleSidebar(false);});
  ['settings-button','top-settings','connection-status'].forEach(id=>$(`#${id}`).addEventListener('click',openSettings));
  $('#hero-chat').addEventListener('click',()=>goChat());
  $('#home-ask-form').addEventListener('submit',e=>{e.preventDefault();goChat($('#home-question').value.trim());});
  $$('[data-prompt]').forEach(btn=>btn.addEventListener('click',()=>{goChat(btn.dataset.prompt); }));
  $$('[data-category]').forEach(btn=>btn.addEventListener('click',()=>{const cat=btn.dataset.category;state.areaGroup='';state.area='';state.recipePage=1;setExploreFilter(cat==='quick'?'all':cat);$('#time-filter').value=cat==='quick'?'30':'';$('#recipe-search').value='';$('#diet-filter').value='';location.hash='recipes';renderExplore();}));
  $$('[data-home-filter]').forEach(btn=>btn.addEventListener('click',()=>{state.homeFilter=btn.dataset.homeFilter;$$('[data-home-filter]').forEach(b=>b.classList.toggle('active',b===btn));renderHome();}));
  $$('[data-explore-filter]').forEach(btn=>btn.addEventListener('click',()=>{setExploreFilter(btn.dataset.exploreFilter);state.areaGroup='';state.area='';renderExplore(true);}));
  $('#recipe-search').addEventListener('input',()=>{clearTimeout(state.searchTimer);state.searchTimer=setTimeout(()=>renderExplore(true),120);});['time-filter','diet-filter'].forEach(id=>$(`#${id}`).addEventListener('change',()=>renderExplore(true)));
  $('#region-groups').addEventListener('click',e=>{const b=e.target.closest('[data-region-group]');if(b){state.areaGroup=b.dataset.regionGroup;state.area='';expandedRegions=false;setExploreFilter('all');renderExplore(true);}});
  $('#region-areas').addEventListener('click',e=>{if(e.target.closest('[data-region-toggle]')){expandedRegions=!expandedRegions;renderRegions();return;}const b=e.target.closest('[data-region-area]');if(b){state.area=b.dataset.regionArea;renderExplore(true);}});
  $('#recipe-pagination').addEventListener('click',e=>{const b=e.target.closest('[data-recipe-page]');if(b&&!b.disabled){state.recipePage=Number(b.dataset.recipePage);renderExplore();$('#results-caption').scrollIntoView({block:'start',behavior:'smooth'});}});
  document.addEventListener('click',e=>{const favorite=e.target.closest('[data-favorite-id]'),recipe=e.target.closest('[data-recipe-id]'),session=e.target.closest('[data-session-id]'),close=e.target.closest('[data-close-dialog]');if(favorite)toggleFavorite(favorite.dataset.favoriteId);else if(recipe)openRecipe(recipe.dataset.recipeId);else if(session)loadSession(session.dataset.sessionId);else if(close)$(`#${close.dataset.closeDialog}`).close();});
  $$('dialog').forEach(dialog=>dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}}));
  $('#settings-form').addEventListener('submit',saveSettings);$('#disconnect-ai').addEventListener('click',disconnect);$('#chat-form').addEventListener('submit',sendChat);$('#new-chat').addEventListener('click',newChat);
  $('#chat-input').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();$('#chat-form').requestSubmit();}});
  contextIds.forEach(id=>$(`#context-${id}`).addEventListener('input',()=>{contextOverrides.add(id);saveContext();}));
}
async function boot() {
  bindEvents();photoHandlers();
  $('#date-label').textContent=new Intl.DateTimeFormat('zh-CN',{month:'long',day:'numeric',weekday:'long'}).format(new Date());
  try {const saved=JSON.parse(localStorage.getItem('shiwei.context')||'{}');$('#context-use-pantry').checked=saved.use_pantry===true;if(['menu','expiry'].includes(saved.pantry_mode))$('#context-pantry-mode').value=saved.pantry_mode;syncContext(saved);}catch{}
  updateContextChips();navigate();
  try {
    const [recipes,favorites,settings,inventory]=await Promise.all([api('/api/recipes'),api('/api/favorites'),api('/api/settings'),api('/api/pantry')]);state.recipes=recipes;state.favorites=new Set(favorites);state.settings=settings;pantry=inventory;renderPantry();renderHome();renderExplore();renderFavorites();renderPersonal();updateFavoriteCount();updateStatus();
    const sessionId=sessionStorage.getItem('shiwei.session');if(sessionId)await loadSession(sessionId);
  } catch(err) {$('#connection-status').textContent='厨房连接失败';$('#home-recipes').innerHTML=emptyState('厨房暂时没有连接上',err.message,false);toast(err.message);}
}
boot();
