/* 關卡安排（老師 2026-11-02）：教師設定頁與「關卡安排」頁共用的關卡清單
   學生連結的 lv 參數：用逗號分開的關卡代號；有好幾級的關卡可以寫「代號.起始級」
   例：lv=n.brave → 只開第三關、從「勇者」開始；lv=l1,n → 第一關＋第三關
   沒有 lv＝全部關卡依序解鎖（和以前一樣）
   起始級：比起始級低的級數也打開（給卡關的學生退路），比起始級高的照常逐級解鎖 */
window.LEVELS = {
  en: {app:'英文打字', setup:'typing-setup.html', stages:[
    {id:'l1', name:'第一關・單一字母', desc:'一次一個字母，不限時、打對為止'},
    {id:'l2', name:'第二關・字母組合', desc:'三個小關：2 個 → 3 個 → 4～5 個字母，有星星與皇冠'},
    {id:'n', name:'第三關・字母流星雨／打字忍者', desc:'依教師設定：流星（或敵人）上有字母，打出來就擊退', lv:[['novice','新手'],['brave','勇者'],['master','大師']]},
    {id:'race', name:'第四關・影子賽車', desc:'打對字母車子往前衝，和自己的最佳紀錄（影子車）比賽', lv:[['novice','新手盃'],['brave','勇者盃'],['master','大師盃']]}]},
  punc: {app:'標點符號大挑戰', setup:'punct-setup.html', stages:[
    {id:'l1', name:'第一關・單一符號', desc:'一次一個標點，不限時、打對為止'},
    {id:'l2', name:'第二關・譜面分歧', desc:'連續答對升階，一次 1～4 個標點'},
    {id:'n', name:'第三關・標點忍者', desc:'敵人頭上有標點，打出來就擊退', lv:[['novice','新手'],['brave','勇者'],['master','大師']]},
    {id:'boss', name:'第四關・魔王戰', desc:'句子填空，填對標點才打得到魔王、擋得住火球'}]},
  key: {app:'重要按鍵練習', setup:'keyboard.html', stages:[
    {id:'l1', name:'第一關・單一按鍵', desc:'看電腦畫面的情境，按下可以解決的鍵'},
    {id:'l2', name:'第二關・鍵盤偵探', desc:'比一比「之前」「之後」兩個畫面，推出按了哪個鍵'},
    {id:'n', name:'第三關・病毒來襲', desc:'病毒爬向電腦，看情境按對的鍵擊退', lv:[['novice','小兵'],['brave','勇士'],['master','傳奇勇者']]}]},
};
/* 文字 → {l1:true, n:'brave', …}；空白或看不懂＝null（全部依序） */
window.lvParse = function(kind, s){
  const K = LEVELS[kind]; if (!K || !s) return null; const o = {};
  String(s).split(/[,\s]+/).forEach(t => { const [id, v] = t.split('.'); const st = K.stages.find(x => x.id === id); if (!st) return;
    o[id] = st.lv && st.lv.some(l => l[0] === v) ? v : true; });
  return Object.keys(o).length ? o : null;
};
/* {…} → 文字（依關卡順序；從最低一級開始的不寫級數） */
window.lvString = function(kind, o){
  const K = LEVELS[kind]; if (!K || !o) return '';
  return K.stages.filter(st => o[st.id]).map(st => st.id + (st.lv && typeof o[st.id] === 'string' && o[st.id] !== st.lv[0][0] ? '.' + o[st.id] : '')).join(',');
};
/* 給老師看的一句話 */
window.lvText = function(kind, s){
  const K = LEVELS[kind], o = lvParse(kind, s);
  if (!o) return '全部關卡，依序解鎖（預設）';
  return '只開放：' + K.stages.filter(st => o[st.id]).map(st => {
    const short = st.name.replace(/^第.關・/, '');
    if (!st.lv || typeof o[st.id] !== 'string' || o[st.id] === st.lv[0][0]) return short;
    return `${short}（從「${st.lv.find(l => l[0] === o[st.id])[1]}」開始）`;
  }).join('、');
};
