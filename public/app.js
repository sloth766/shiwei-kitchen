'use strict';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const icon = (name) => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl = (value) => { try { const u = new URL(value); return u.protocol === 'https:' ? u.href : '#'; } catch { return '#'; } };
const state = {recipes:[], favorites:new Set(), settings:{configured:false,model:'deepseek-flash'}, homeFilter:'all', exploreFilter:'all', areaGroup:'', area:'', recipePage:1, sessionId:null, sending:false, currentRecipe:null, searchTimer:null, messages:[], page:'home', sessionEpoch:0};
const contextIds = ['ingredients','servings','time','diet','avoid','equipment'];
let toastTimer;
async function api(path, options = {}) {
  const response = await fetch(path, { ...options, headers: {'Content-Type':'application/json', ...options.headers} });
  let data;
  try { data = await response.json(); } catch { throw new Error('厨房服务没有返回有效数据，请检查服务是否正在运行。'); }
  if (!response.ok) { const error=new Error(data.error || '操作失败，请稍后重试。');error.status=response.status;throw error; }
  return data;
}
function toast(message) { $('#toast').textContent=message; $('#toast').classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3500); }
function context() { return Object.fromEntries(contextIds.map(id => [id,$(`#context-${id}`).value])); }
function saveContext() { try { localStorage.setItem('shiwei.context',JSON.stringify(context())); } catch {} updateContextChips(); }
function updateContextChips() { const c=context(); $('#composer-context').innerHTML=`<span>${esc(c.servings)} 人</span><span>${esc(c.time)} 分钟</span>${c.diet ? `<span>${c.diet==='vegan'?'纯素':'蛋奶素'}</span>`:''}${c.avoid?'<span>已填写忌口</span>':''}`; }
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
  const groups=['中国','亚洲','欧洲','美洲','中东','非洲','其他'].filter(g=>state.recipes.some(r=>r.area_group===g));
  const label=g=>g==='中国'?'中国各地':g==='亚洲'?'亚洲料理':g;
  const groupCount=g=>state.recipes.filter(r=>r.area_group===g).length;
  $('#region-groups').innerHTML=`<button data-region-group="" aria-pressed="${!state.areaGroup}" class="${!state.areaGroup?'active':''}">全部地区 <small>${state.recipes.length}</small></button>`+groups.map(g=>`<button data-region-group="${esc(g)}" aria-pressed="${state.areaGroup===g}" class="${state.areaGroup===g?'active':''}">${esc(label(g))} <small>${groupCount(g)}</small></button>`).join('');
  const selected=state.recipes.filter(r=>!state.areaGroup||r.area_group===state.areaGroup);
  const areas=[...new Set(selected.map(r=>r.area).filter(Boolean))].sort((a,b)=>a==='家常菜'?-1:b==='家常菜'?1:a.localeCompare(b,'zh-CN'));
  $('#region-areas').innerHTML=`<button data-region-area="" aria-pressed="${!state.area}" class="${!state.area?'active':''}">全部口味</button>`+areas.map(a=>`<button data-region-area="${esc(a)}" aria-pressed="${state.area===a}" class="${state.area===a?'active':''}">${esc(a)} <small>${selected.filter(r=>r.area===a).length}</small></button>`).join('');
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
function navigate() {
  const page=location.hash.slice(1)||'home', valid=['home','recipes','favorites','chat'].includes(page)?page:'home';
  state.page=valid;
  $$('.page').forEach(el=>{el.hidden=el.id!==`page-${valid}`;});
  $$('.nav-item[data-page]').forEach(el=>{el.classList.toggle('active',el.dataset.page===valid); if(el.dataset.page===valid)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});
  $('#page-label').textContent={home:'厨房首页',recipes:'探索菜谱',favorites:'我的收藏',chat:'问问小厨'}[valid];
  toggleSidebar(false);
  if(valid==='recipes')renderExplore();
  if(valid==='favorites')renderFavorites();
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
    updateFavoriteCount();renderHome();renderExplore();renderFavorites();
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
    $('#recipe-detail').innerHTML=`<div class="detail-top"><img src="${esc(recipe.image)}" alt="${esc(recipe.image_alt)}（风味示意）"><div class="detail-title"><small>${esc(recipe.area_group)} / ${esc(recipe.area || recipe.cuisine)}</small><h2>${esc(recipe.name)}</h2></div></div><div class="detail-content"><div class="detail-summary"><span>${icon('clock')}${esc(recipeTime(recipe))}</span><span>${icon('chef')}${esc(recipe.difficulty)}</span><span>${recipe.diet==='vegan'?'纯素':recipe.diet==='vegetarian'?'蛋奶素':recipe.diet==='unknown'?'饮食类型待核对':'荤素搭配'}</span><div class="detail-actions"><button class="secondary-button" id="detail-favorite"></button><button class="secondary-button" id="detail-ask">${icon('spark')}请小厨调整</button></div></div><p class="detail-description">${esc(recipe.description)}</p><div class="detail-columns"><section><h3>准备这些食材</h3><div class="servings-control"><span>${recipe.servings_note?'保留原文份量':'按人数换算用量'}</span><select id="detail-servings" aria-label="菜谱人数" ${recipe.servings_note?'disabled':''}>${recipe.servings_note?'<option value="2">原文份量</option>':[1,2,3,4,6,8].map(n=>`<option value="${n}" ${n===recipe.servings?'selected':''}>${n} 人份</option>`).join('')}</select></div><ul class="ingredient-list" id="detail-ingredients"></ul>${recipe.quantity_notes?`<details class="quantity-notes" open><summary>原文用量说明</summary><p>${esc(recipe.quantity_notes)}</p></details>`:''}</section><section><h3>一步一步，好好做饭</h3><ol class="step-list">${recipe.steps.map(s=>`<li ${s.startsWith('【')?'class="step-section"':''}>${esc(s)}</li>`).join('')}</ol><div class="recipe-tip">✦ 小提醒：${esc(recipe.tip)}</div></section></div><div class="detail-source">参考来源：<a href="${esc(safeUrl(recipe.source.url))}" target="_blank" rel="noopener noreferrer">${esc(recipe.source.name)} · ${esc(recipe.source.title)} ${icon('link')}</a><br>整理日期：${esc(recipe.source.retrieved_at)} · ${esc(recipe.adaptation)} 配图为风味示意。<br>常见过敏原：${esc(recipe.allergens.join('、')||'无已标注常见过敏原，请核对包装')}。人数换算仅缩放食材用量，烹饪时间须按锅具和食材状态判断。</div></div>`;
    renderIngredients();updateDetailFavorite();photoHandlers($('#recipe-detail'));
    $('#detail-servings').addEventListener('change',renderIngredients);
    $('#detail-favorite').addEventListener('click',()=>toggleFavorite(id));
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
  if(role==='assistant'&&mode){const label=document.createElement('div');label.className='message-mode';label.textContent=mode==='deepseek'?'DEEPSEEK · 参考本地菜谱':'本地菜谱检索 · 尚未调用 AI';body.append(label);}
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
  try {
    const result=await api('/api/chat',{method:'POST',body:JSON.stringify({message,session_id:state.sessionId,context:context()})});
    if(epoch!==state.sessionEpoch)return;
    state.sessionId=result.session_id;sessionStorage.setItem('shiwei.session',state.sessionId);thinking.remove();appendMessage('assistant',result.content,result.mode,result.sources);await loadHistory();
  } catch(err) {
    thinking.remove();userNode.remove();state.messages.pop();$('#chat-input').value=message;
    const error=document.createElement('div');error.className='error-message';error.textContent=err.message;$('#chat-messages').append(error);scrollChat();
  } finally { state.sending=false;$('#send-button').disabled=false;$('#new-chat').disabled=false; }
}
async function loadHistory() { const sessions=await api('/api/sessions');$('#chat-history').innerHTML=sessions.length?sessions.map(s=>`<button data-session-id="${esc(s.id)}" title="${esc(s.title)}">${esc(s.title)}</button>`).join(''):'<span class="history-empty">聊过的味道，会留在这里。</span>'; }
async function loadSession(id) {
  if(state.sending){toast('小厨正在回答，请等这次回答完成。');return;}
  const epoch=++state.sessionEpoch;
  try { const session=await api(`/api/sessions/${encodeURIComponent(id)}`);if(epoch!==state.sessionEpoch)return;state.sessionId=id;state.messages=[];sessionStorage.setItem('shiwei.session',id);$('#chat-messages').replaceChildren();$('#chat-welcome').hidden=!!session.messages.length;session.messages.forEach(m=>appendMessage(m.role,m.content,m.mode,m.sources)); } catch(err){if(err.status===404&&sessionStorage.getItem('shiwei.session')===id)newChat();toast(err.message);}
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
  $('#region-groups').addEventListener('click',e=>{const b=e.target.closest('[data-region-group]');if(b){state.areaGroup=b.dataset.regionGroup;state.area='';setExploreFilter('all');renderExplore(true);}});
  $('#region-areas').addEventListener('click',e=>{const b=e.target.closest('[data-region-area]');if(b){state.area=b.dataset.regionArea;renderExplore(true);}});
  $('#recipe-pagination').addEventListener('click',e=>{const b=e.target.closest('[data-recipe-page]');if(b&&!b.disabled){state.recipePage=Number(b.dataset.recipePage);renderExplore();$('#results-caption').scrollIntoView({block:'start',behavior:'smooth'});}});
  document.addEventListener('click',e=>{const favorite=e.target.closest('[data-favorite-id]'),recipe=e.target.closest('[data-recipe-id]'),session=e.target.closest('[data-session-id]'),close=e.target.closest('[data-close-dialog]');if(favorite)toggleFavorite(favorite.dataset.favoriteId);else if(recipe)openRecipe(recipe.dataset.recipeId);else if(session)loadSession(session.dataset.sessionId);else if(close)$(`#${close.dataset.closeDialog}`).close();});
  $$('dialog').forEach(dialog=>dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}}));
  $('#settings-form').addEventListener('submit',saveSettings);$('#disconnect-ai').addEventListener('click',disconnect);$('#chat-form').addEventListener('submit',sendChat);$('#new-chat').addEventListener('click',newChat);
  $('#chat-input').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();$('#chat-form').requestSubmit();}});
  contextIds.forEach(id=>$(`#context-${id}`).addEventListener('input',saveContext));
}
async function boot() {
  bindEvents();photoHandlers();
  $('#date-label').textContent=new Intl.DateTimeFormat('zh-CN',{month:'long',day:'numeric',weekday:'long'}).format(new Date());
  try {const saved=JSON.parse(localStorage.getItem('shiwei.context')||'{}');contextIds.forEach(id=>{if(saved[id]!=null)$(`#context-${id}`).value=String(saved[id]);});}catch{}
  updateContextChips();navigate();
  try {
    const [recipes,favorites,settings]=await Promise.all([api('/api/recipes'),api('/api/favorites'),api('/api/settings')]);state.recipes=recipes;state.favorites=new Set(favorites);state.settings=settings;renderHome();renderExplore();renderFavorites();updateFavoriteCount();updateStatus();
    const sessionId=sessionStorage.getItem('shiwei.session');if(sessionId)await loadSession(sessionId);
  } catch(err) {$('#connection-status').textContent='厨房连接失败';$('#home-recipes').innerHTML=emptyState('厨房暂时没有连接上',err.message,false);toast(err.message);}
}
boot();
