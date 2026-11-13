// 北越行程網頁。內容在 data.bin（加密），用網址 #k= 後面的家庭金鑰解開；家人的「想去」、加的行程、聊天存在 Firebase。
const FB_VER = '12.19.0';
const FB = {
  apiKey: 'AIzaSyA9IbsQQb4ruCJNK9i_gC8s7Y6RIs7G0_w',
  authDomain: 'nv-trip-2026.firebaseapp.com',
  projectId: 'nv-trip-2026',
  storageBucket: 'nv-trip-2026.firebasestorage.app',
  messagingSenderId: '637892467866',
  appId: '1:637892467866:web:b30695db236d0aacb25323',
};
const RECAPTCHA_KEY = '6Lf4uBkuAAAAAKUa7_RQyeChv6VeUQRQWAEQpDeO';
const OFF_VN = 7 * 36e5, OFF_TW = 8 * 36e5;
const WD = ['日', '一', '二', '三', '四', '五', '六'];
const VIEWS = [['now', '現在'], ['days', '每日行程'], ['stay', '住宿交通'], ['call', '電話'], ['tips', '須知']];
const GROUPS = [['eat', '好吃的'], ['cafe', '咖啡、甜點'], ['see', '景點、拍照'], ['shop', '逛街、伴手禮'], ['spa', '洗頭、按摩'], ['stop', '路上休息']];
const WHO = { tourist: '觀光客推薦', local: '在地人推薦', both: '觀光客、在地人都推' };
const AV = { ba: '爸', ma: '媽', yt: '彤', yk: '駃', cy: '羽' };
const QUICK = ['我想去這個', '好啊！', '幾點集合？', '我在飯店大廳', '我先回飯店休息', '等我一下'];
// 常用句：先翻好放著，沒網路也能用
const PHRASES = [
  ['打招呼', [['你好', 'Xin chào.'], ['謝謝', 'Cảm ơn.'], ['不用了，謝謝', 'Không, cảm ơn.'], ['不好意思／對不起', 'Xin lỗi.'], ['我聽不懂越南話', 'Tôi không hiểu tiếng Việt.'], ['你會說英文嗎？', 'Bạn có nói tiếng Anh không?'], ['再見', 'Tạm biệt.']]],
  ['點餐', [['我不吃牛肉', 'Tôi không ăn thịt bò.'], ['這道有牛肉嗎？', 'Món này có thịt bò không?'], ['不要放牛肉', 'Đừng cho thịt bò nhé.'], ['我不吃木耳', 'Tôi không ăn mộc nhĩ.'], ['這道有木耳嗎？', 'Món này có mộc nhĩ không?'], ['不要放木耳', 'Đừng cho mộc nhĩ nhé.'], ['我們 5 個人', 'Chúng tôi có năm người.'], ['請給我菜單', 'Cho tôi xem thực đơn.'], ['我要這個', 'Tôi lấy cái này.'], ['不要辣', 'Không cay nhé.'], ['不要香菜', 'Không cho rau mùi nhé.'], ['不要冰塊', 'Không đá nhé.'], ['少糖', 'Ít đường thôi.'], ['給我一瓶水', 'Cho tôi một chai nước.'], ['我要外帶', 'Cho tôi mang về.'], ['好吃！', 'Ngon quá!'], ['買單', 'Tính tiền nhé.']]],
  ['海鮮、龍蝦', [['今天有龍蝦嗎？', 'Hôm nay có tôm hùm không?'], ['龍蝦一公斤多少錢？', 'Tôm hùm bao nhiêu tiền một cân?'], ['這是一公斤的價錢嗎？', 'Giá này là một cân phải không?'], ['給我看活的龍蝦', 'Cho tôi xem tôm hùm còn sống.'], ['這隻幾公斤？', 'Con này nặng mấy cân?'], ['請在我面前秤', 'Cân trước mặt tôi nhé.'], ['就要這隻', 'Lấy con này.'], ['清蒸', 'Làm hấp nhé.'], ['蒜香奶油烤', 'Nướng bơ tỏi nhé.'], ['起司焗烤', 'Nướng phô mai nhé.'], ['龍蝦頭拿去煮粥', 'Đầu tôm hùm nấu cháo nhé.'], ['做好總共多少錢？', 'Làm xong tổng cộng bao nhiêu tiền?']]],
  ['買東西', [['這個多少錢？', 'Cái này bao nhiêu tiền?'], ['一公斤多少錢？', 'Bao nhiêu một cân?'], ['太貴了', 'Đắt quá!'], ['可以便宜一點嗎？', 'Bớt một chút được không?'], ['我只是看看', 'Tôi chỉ xem thôi.'], ['有大一點的嗎？', 'Có cỡ lớn hơn không?'], ['可以刷卡嗎？', 'Có trả bằng thẻ được không?'], ['這個價錢有含布料嗎？', 'Giá này đã gồm vải chưa?'], ['幾天可以做好？', 'Mấy ngày thì xong?'], ['20 號前做得好嗎？', 'Trước ngày 20 có xong được không?'], ['可以送到飯店嗎？', 'Có giao đến khách sạn không?']]],
  ['交通、問路', [['請載我到這個地址', 'Cho tôi đến địa chỉ này.'], ['到這裡多少錢？', 'Đến đây bao nhiêu tiền?'], ['在這裡停', 'Dừng ở đây.'], ['請開慢一點，我會暈車', 'Làm ơn lái chậm một chút, tôi bị say xe.'], ['廁所在哪裡？', 'Nhà vệ sinh ở đâu?'], ['請等我一下', 'Chờ tôi một chút.']]],
  ['飯店', [['我要辦入住', 'Tôi muốn nhận phòng.'], ['行李可以寄放嗎？', 'Tôi gửi hành lý ở đây được không?'], ['Wi-Fi 密碼是什麼？', 'Mật khẩu wifi là gì?'], ['我要退房', 'Tôi muốn trả phòng.']]],
  ['洗頭、按摩', [['輕一點', 'Nhẹ thôi.'], ['可以大力一點', 'Mạnh hơn một chút.'], ['會痛', 'Đau quá.'], ['請幫我把頭髮吹乾', 'Làm ơn sấy khô tóc giúp tôi.']]],
  ['緊急', [['救命！', 'Cứu tôi với!'], ['請叫救護車', 'Gọi xe cứu thương giúp tôi!'], ['我不舒服', 'Tôi thấy không khỏe.'], ['藥局在哪裡？', 'Hiệu thuốc ở đâu?'], ['我的護照不見了', 'Tôi bị mất hộ chiếu.']]],
];

const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const I = {
  now: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  days: svg('<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>'),
  stay: svg('<path d="M3 19V6M3 15h18v4M21 15v-2.5A3.5 3.5 0 0 0 17.5 9H11v6"/><circle cx="7" cy="11.5" r="2"/>'),
  call: svg('<path d="M5 3.5h3.5l2 5-2.4 1.6a11 11 0 0 0 5.8 5.8l1.6-2.4 5 2V19a1.5 1.5 0 0 1-1.5 1.5A16.5 16.5 0 0 1 3.5 5 1.5 1.5 0 0 1 5 3.5z"/>'),
  tips: svg('<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11M9 8h6"/>'),
  chat: svg('<path d="M4 5h16v11H9.5L5 20v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>'),
  gear: svg('<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2.2"/><circle cx="9" cy="17" r="2.2"/>'),
  close: svg('<path d="M6 6l12 12M18 6L6 18"/>'),
  chev: svg('<path d="M6 9l6 6 6-6"/>'),
  heart: svg('<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>'),
  bulb: svg('<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>'),
  plus: svg('<path d="M12 5v14M5 12h14"/>'),
  send: svg('<path d="M4 12l16-8-6 16-2.5-5.5z"/>'),
  share: svg('<path d="M12 4v11M7 9l5-5 5 5M5 14v6h14v-6"/>'),
  eat: svg('<path d="M3 11h18a9 9 0 0 1-18 0zM14 3l-3 7M19 4l-6 6"/>'),
  cafe: svg('<path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM16 10h2a2.5 2.5 0 0 1 0 5h-2M8 3v3M12 3v3"/>'),
  see: svg('<rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M8.5 7l1.5-3h4l1.5 3"/>'),
  shop: svg('<path d="M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2"/>'),
  spa: svg('<path d="M12 21c-4 0-7-3-7-6 2 0 4 .8 5 2-1-3 0-7 2-10 2 3 3 7 2 10 1-1.2 3-2 5-2 0 3-3 6-7 6z"/>'),
  stop: svg('<path d="M4 16v-4l2-5h12l2 5v4zM4 16v3M20 16v3M3 12h18"/>'),
  tr: svg('<path d="M4 5h9M8.5 3v2M6 5c1 4 4 7 7 8M11 5c-1 4-4 7-7 8M13 21l4-10 4 10M14.5 17h5"/>'),
  cam: svg('<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>'),
  mic: svg('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),
  speak: svg('<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>'),
  img: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-8 8"/>'),
  full: svg('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>'),
  edit: svg('<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>'),
  info: svg('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'),
  pin: svg('<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>'),
  near: svg('<path d="M3 21h18M5 21V9l7-5 7 5v12"/><path d="M10 21v-6h4v6"/>'),
  pill: svg('<rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-35 12 12)"/><path d="M9.2 8 14.8 16"/>'),
  cash: svg('<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6.5 9.5v5M17.5 9.5v5"/>'),
  users: svg('<circle cx="9" cy="8" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 5.5a3 3 0 0 1 0 5.5M17.5 14a5 5 0 0 1 3 5"/>'),
  check: svg('<path d="M4 12.5l5 5L20 6.5"/>'),
  copy: svg('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>'),
  plane: svg('<path d="M10.5 13.5 3 11l1.5-1.5 7 1 4-4.5c1-1 2.6-1.2 3.3-.5s.5 2.3-.5 3.3l-4.5 4 1 7L14 21.5l-2.5-7.5-3 2.5v2l-1.5 1-1-3-3-1 1-1.5h2z"/>'),
  sim: svg('<path d="M7 3h7l4 4v14H7z"/><rect x="9.5" y="11" width="6" height="6" rx="1"/>'),
  ticket: svg('<path d="M4 7h16v3a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4z"/><path d="M14 7v10" stroke-dasharray="2 2"/>'),
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* 私密模式存不了就算了 */ } },
};
const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

const S = {
  data: null, key: null, me: store.get('nv-me', null), view: 'now', day: null,
  mode: store.get('nv-mode', 'page'), fs: store.get('nv-fs', 1), scroll: {},
  place: new Map(), segs: [], events: [], openRecs: new Set(),
  likes: {}, plans: [], msgs: [], F: null, col: null, synced: false, lastRead: store.get('nv-read', 0), draftRef: null, draftPic: null, pics: new Map(), app: null,
};

// ---------- time ----------
const vnMs = (date, hm) => { const [y, m, d] = date.split('-').map(Number); const [h, mi] = hm.split(':').map(Number); return Date.UTC(y, m - 1, d, h, mi) - OFF_VN; };
const shift = (ms, off) => new Date(ms + off);
const hm = (ms, off) => { const d = shift(ms, off); return `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`; };
const ymd = (ms, off) => shift(ms, off).toISOString().slice(0, 10);
const label = (date) => { const d = new Date(date + 'T00:00:00Z'); return `${d.getUTCMonth() + 1}/${d.getUTCDate()}（${WD[d.getUTCDay()]}）`; };
const localTime = (ms) => { const d = new Date(ms); return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; };

// ---------- crypto ----------
const enc = new TextEncoder();
const sha256 = async (s) => new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(s)));
const hex = (b) => [...b].map((x) => x.toString(16).padStart(2, '0')).join('');
async function decrypt(buf, key) {
  const k = await crypto.subtle.importKey('raw', await sha256('nv-aes|' + key), 'AES-GCM', false, ['decrypt']);
  const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: buf.slice(0, 12) }, k, buf.slice(12));
  return JSON.parse(new TextDecoder().decode(pt));
}

// ---------- boot ----------
async function boot() {
  applyFont();
  const hp = new URLSearchParams(location.hash.slice(1));
  const key = hp.get('k') || store.get('nv-key', null);
  if (!key) return showLock();
  try {
    const res = await fetch('data.bin', { cache: 'no-cache' });
    if (!res.ok) throw new Error('data.bin ' + res.status);
    S.data = await decrypt(new Uint8Array(await res.arrayBuffer()), key);
  } catch (e) {
    console.warn(e);
    return showLock(navigator.onLine === false ? '現在沒有網路，連上網路再打開一次。' : '連結不完整或打錯了，請再跟家人要一次完整連結。');
  }
  S.key = key;
  store.set('nv-key', key);
  S.view = VIEWS.some(([v]) => v === hp.get('v')) ? hp.get('v') : store.get('nv-view', 'now');
  S.day = hp.get('d');
  index();
  render();
  setInterval(tick, 30000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });
  startFirebase();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
  dropExpiredCache().catch(() => {});
  setTimeout(prefetchVouchers, 2500);
}

function showLock(err) {
  $('#lock').hidden = false;
  if (err) { $('#lockErr').textContent = err; $('#lockErr').hidden = false; }
  $('#lockForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const v = $('#lockInput').value.trim();
    const k = /[#&]k=([\w-]+)/.exec(v)?.[1] || (/^[\w-]{16,}$/.test(v) ? v : null);
    if (!k) { $('#lockErr').textContent = '看不出密碼，請貼上完整的連結。'; $('#lockErr').hidden = false; return; }
    store.set('nv-key', k);
    location.hash = 'k=' + k;
    location.reload();
  });
}

function index() {
  const D = S.data;
  D.places.forEach((p) => S.place.set(p.id, p));
  D.days.forEach((d) => d.segs.forEach((s) => {
    S.segs.push({ ...s, day: d });
    s.ev.forEach((e) => S.events.push(Object.assign(e, { ms: vnMs(d.date, e.at), date: d.date, dayId: d.id })));
  }));
  S.events.sort((a, b) => a.ms - b.ms);
  if (!S.day || !D.days.some((d) => d.id === S.day)) S.day = defaultDay();
}

function defaultDay() {
  const t = ymd(Date.now(), OFF_VN), D = S.data;
  if (t < D.start) return D.days[0].id;
  return (D.days.find((d) => d.date === t) || D.days[D.days.length - 1]).id;
}

function setHash() {
  const p = new URLSearchParams({ k: S.key, v: S.view });
  if (S.view === 'days') p.set('d', S.day);
  history.replaceState(history.state, '', '#' + p);
}

function applyFont() { document.documentElement.style.fontSize = (S.fs * 100) + '%'; }

// ---------- shared bits ----------
const avatar = (id, sm) => id && AV[id] ? `<span class="av ${id}${sm ? ' sm' : ''}" title="${esc(memberName(id))}">${AV[id]}</span>` : '';
const memberName = (id) => S.data?.members.find((m) => m.id === id)?.name || '';
function linkHTML([type, text, val]) {
  if (type === 'tel') return `<a class="lnk tel" href="tel:${esc(val)}">${esc(text)}</a>`;
  if (type === 'wa') return `<button class="lnk wa" type="button" data-wa="${val.replace(/\D/g, '')}" data-wan="${esc(text)}">${esc(text)}</button>`;
  if (type === 'web') return `<a class="lnk web" href="${esc(val)}" target="_blank" rel="noopener">${esc(text)}</a>`;
  const href = /^https?:/.test(val) ? val : 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(val);
  return `<a class="lnk map" href="${esc(href)}" target="_blank" rel="noopener">${esc(text)}</a>`;
}
const addrBtn = (k) => `<button class="lnk car" type="button" data-addr="${k}">給司機看地址</button>`;
const stripZh = (s) => String(s || '').replace(/（[^）]*）/g, ' ').replace(/[\u3000-\u303f\u4e00-\u9fff\uff00-\uffef]+/g, ' ').replace(/\s+/g, ' ').replace(/^[\s,.:;–-]+|[\s,.:;–-]+$/g, '');
function grabDest(p) {
  const name = stripZh(p.local) || stripZh(p.name) || stripZh(plabel(p.id)[0]);
  // 地址有好幾個或來源不一致的，只給店名，讓 Grab 自己找
  const raw = /不一|不確定|沒查到/.test(p.addr || '') ? '' : String(p.addr || '').split(/[；;]|另有|也有|和/)[0];
  const addr = stripZh(raw).replace(/\s+,/g, ',');
  if (!addr && p.group !== 'see') return '';   // 沒地址的小吃、菜名（例如寧平鍋巴）不放 Grab
  return [name, addr && !addr.includes(name) ? addr : ''].filter(Boolean).join(', ');
}
const addrText = (k) => (S.data.addrs[k]?.vi || '').replace(/\n/g, ', ');
const grabBtn = (text) => text ? `<button class="lnk grab" type="button" data-grab="${esc(text)}">叫 Grab</button>` : '';
async function openGrab(text) {
  try { await navigator.clipboard.writeText(text); }
  catch { showBig(text, '在 Grab 的目的地輸入這段'); return; }
  toast('目的地已複製，在 Grab 的「要去哪裡」貼上');
  setTimeout(() => { location.href = 'grab://open?screenType=BOOKING&dropOffKeywords=' + encodeURIComponent(text); }, 700);
}

// 店名：原文＋（中文概述）。行程文字裡的 {id} 會換成可以點的店名，點了跳小浮窗（placePop）。
const plabel = (id) => S.data.labels?.[id] || [shortName(S.place.get(id) || { name: id }), ''];
function pn(id) {
  if (!S.place.has(id)) return esc(id);
  const [n, z] = plabel(id);
  return `<button type="button" class="pn" data-pop="${id}">${esc(n)}${z ? `<span class="zh">（${esc(z)}）</span>` : ''}</button>`;
}
const sayBtn = (t) => `<button type="button" class="say" data-say="${esc(t)}" lang="vi" translate="no">${esc(t)}${I.speak}</button>`;
const rich = (s) => String(s).replace(/\{([a-z0-9-]+)\}/g, (_, id) => pn(id)).replace(/\[\[(.+?)\]\]/g, (_, t) => sayBtn(t));
const byAv = (p) => (p.by || []).map((b) => avatar(b === 'mom' ? 'ma' : b, true)).join('');
function eatChip(id) {
  const p = S.place.get(id);
  if (!p) return '';
  const [n, z] = plabel(id);
  const img = p.photos?.[0] ? `<img src="${esc(p.photos[0].t)}" alt="" loading="lazy" decoding="async" crossorigin="anonymous" referrerpolicy="no-referrer">` : `<span class="eat-i">${I[p.group] || I.eat}</span>`;
  return `<button type="button" class="eat" data-pop="${id}">${img}<span class="eat-t"><b>${esc(n)}</b>${z ? `<small>${esc(z)}</small>` : ''}</span>${byAv(p)}</button>`;
}

// 一個行程：收起來時只有時間、標題、一行重點；有細節的整列可以點開（WAI-ARIA disclosure，展開用 grid-template-rows 動畫）
let evSeq = 0;
function evHTML(e, extraTop = '', { open = false } = {}) {
  const id = 'evd' + (++evSeq);
  const pts = (e.p || []).map((x) => `<li>${rich(x)}</li>`).join('');
  const chipRow = (ids, icon, name) => ids?.length ? `<div class="eats"><span class="eats-l">${icon}${name}</span><div class="eats-r">${ids.map(eatChip).join('')}</div></div>` : '';
  const eats = chipRow(e.route, I.pin, '路線') + chipRow(e.eat, I.eat, '順路') + chipRow(e.near, I.near, '飯店附近');
  // 叫 Grab 的目的地：預設是條列裡第一個店名，行程可以用 grab: 'id' 指定
  const firstId = e.grab || (e.p || []).join(' ').match(/\{([a-z0-9-]+)\}/)?.[1];
  const grab = e.addr ? grabBtn(addrText(e.addr)) : (e.links?.length && S.place.has(firstId) ? grabBtn(grabDest(S.place.get(firstId))) : '');
  const acts = (e.links?.length || e.addr) ? `<p class="acts">${(e.links || []).map(linkHTML).join('')}${grab}${e.addr ? addrBtn(e.addr) : ''}</p>` : '';
  const flags = (e.flags || []).map(([c, t]) => `<span class="flag ${c}">${t}</span>`).join('');
  const body = pts || e.warn || eats || acts;
  const time = `<span class="t${e.w ? ' w' : ''}">${extraTop}${esc(e.t)}${e.small ? `<small>${esc(e.small)}</small>` : ''}</span>`;
  const main = `<span class="ev-main"><span class="ev-h">${e.h}</span>${e.m ? `<span class="ev-m">${esc(e.m)}</span>` : ''}${flags ? `<span class="ev-flags">${flags}</span>` : ''}</span>`;
  const side = `<span class="ev-side"><span class="avs">${(e.who || []).map((m) => avatar(m, true)).join('')}</span>${body && !open ? `<span class="chev">${I.chev}</span>` : ''}</span>`;
  const details = body ? `<div class="ev-d" id="${id}"><div><div class="ev-in">${pts ? `<ul class="pts">${pts}</ul>` : ''}${e.warn ? `<p class="warn">${e.warn}</p>` : ''}${eats}${acts}</div></div></div>` : '';
  const row = body && !open
    ? `<button class="ev-row" type="button" data-ev aria-expanded="false" aria-controls="${id}">${time}${main}${side}</button>`
    : `<div class="ev-row">${time}${main}${side}</div>`;
  return `<li class="ev${e.key ? ' key' : ''}${open ? ' open' : ''}" data-ms="${e.ms}">${row}${details}</li>`;
}

// 小浮窗（HTML popover，點外面自動關）：店家簡介、時段提醒
function openPop(html, anchor) {
  const el = $('#pop');
  if (!el?.showPopover) return false;
  if (el.matches(':popover-open')) el.hidePopover();
  el.innerHTML = html;
  el.showPopover();
  const r = anchor.getBoundingClientRect(), w = el.offsetWidth, h = el.offsetHeight, pad = 12;
  const floor = innerHeight - ($('.tabbar')?.offsetHeight || 0) - pad;
  const left = Math.min(Math.max(pad, r.left + r.width / 2 - w / 2), innerWidth - w - pad);
  let top = r.bottom + 8;
  if (top + h > floor) top = Math.max(pad, r.top - h - 8);
  el.style.left = left + 'px';
  el.style.top = top + 'px';
  return true;
}
const closePop = () => { const el = $('#pop'); if (el?.matches?.(':popover-open')) el.hidePopover(); };
const firstBit = (s) => String(s || '').split(/[（(；;，]/)[0].trim();
const AREA = { 'Old Quarter': '老城區', 'Ba Đình–Trúc Bạch': '巴亭、竹帛湖', 'West Lake': '西湖', 'Hoàn Kiếm south': '還劍湖南邊', other: '' };
function placeWhere(p) {
  const area = AREA[p.area] ?? String(p.area || '').split(/[，；（(]/)[0];
  let w = String(p.walk || '').split(/[；;]/)[0].trim();
  if (/^(走路|Grab|約|步行)/.test(w)) w = '離飯店' + (/^[A-Za-z]/.test(w) ? ' ' : '') + w;
  return [area, w].filter(Boolean).join('・');
}
function placePop(id) {
  const p = S.place.get(id);
  if (!p) return '';
  const [n, z] = plabel(id), w = wanters(id);
  const facts = [firstBit(p.hours), shortPrice(p.price)].filter(Boolean);
  const img = p.photos?.[0] ? `<img class="pop-ph" src="${esc(p.photos[0].t)}" alt="" crossorigin="anonymous" referrerpolicy="no-referrer">` : `<span class="pop-ph">${I[p.group] || I.see}</span>`;
  return `<div class="pop-h">${img}<div class="pop-t"><b>${esc(n)}</b>${z ? `<span>${esc(z)}</span>` : ''}</div>${byAv(p)}</div>
    ${p.why ? `<p class="pop-why">${esc(p.why)}</p>` : ''}
    ${placeWhere(p) ? `<p class="pop-loc">${I.pin}<span>${esc(placeWhere(p))}</span></p>` : ''}
    ${facts.length ? `<p class="pop-f">${facts.map(esc).join('・')}</p>` : ''}
    <div class="pop-a">${wantBtn(id)}${linkHTML(['map', '地圖', p.q])}${grabBtn(grabDest(p))}<button class="btn small" type="button" data-open="${id}">詳細</button>${w.length ? `<span class="avs">${w.map((m) => avatar(m, true)).join('')}</span>` : ''}</div>`;
}

const thumb = (p) => p.photos?.[0]
  ? `<img class="ph" src="${esc(p.photos[0].t)}" alt="" loading="lazy" decoding="async" crossorigin="anonymous" referrerpolicy="no-referrer">`
  : `<span class="ph">${I[p.group] || I.see}</span>`;
const shortPrice = (s) => { s = String(s || ''); const c = s.split(/[，；;（(]/)[0]; return c.length > 22 ? c.slice(0, 21) + '…' : c; };
const shortName = (p) => p.name.replace(/（[^）]*）/g, '').trim();

function wantBtn(id) {
  const on = (S.likes[id] || []).includes(S.me);
  return `<button class="want" type="button" data-like="${id}" aria-pressed="${on}">${I.heart}<span>想去</span></button>`;
}
const wanters = (id) => (S.likes[id] || []).filter((m) => AV[m]);

const BY = { mom: '媽媽影片推薦', cy: '純羽提的' };
const byTags = (p) => (p.by || []).filter((b) => BY[b]).map((b) => `<span class="tag by-${b}">${BY[b]}</span>`).join('');
function recHTML(p) {
  const w = wanters(p.id), [n, z] = plabel(p.id);
  return `<article class="rec">
    <button class="rec-open" type="button" data-open="${p.id}">${thumb(p)}
      <span class="rec-txt"><b>${esc(n)}</b>${z ? `<small>${esc(z)}</small>` : ''}<span class="rec-why">${esc(p.why)}</span></span>
    </button>
    <div class="rec-foot">${wantBtn(p.id)}<span class="avs" data-avs="${p.id}">${w.map((m) => avatar(m, true)).join('')}</span><span class="want-n" data-wn="${p.id}">${w.length ? w.length + ' 人想去' : ''}</span>${p.by?.length ? `<span class="rec-by">${byAv(p)}</span>` : ''}</div>
  </article>`;
}

function recsFor(seg) { return S.data.places.filter((p) => p.segs.includes(seg)); }
function groupedRecs(list) {
  return GROUPS.map(([g, name]) => {
    const items = list.filter((p) => p.group === g).sort((a, b) => wanters(b.id).length - wanters(a.id).length);
    return items.length ? `<h5>${name}</h5>${items.map(recHTML).join('')}` : '';
  }).join('');
}
function recSummary(list) {
  const parts = GROUPS.map(([g, name]) => [name, list.filter((p) => p.group === g).length]).filter(([, n]) => n).map(([n, c]) => `${n} ${c}`);
  const liked = list.filter((p) => wanters(p.id).length).length;
  return parts.join('・') + (liked ? `・${liked} 個有人想去` : '');
}

// ---------- render ----------
function render() {
  const app = $('#app');
  app.innerHTML = `
  <header class="top">
    <div class="brand"><b>${esc(S.data.title)}</b><small id="topSub"></small></div>
    <button class="chip-me" id="meBtn" type="button"></button>
    <button class="iconbtn" type="button" data-tr aria-label="翻譯">${I.tr}</button>
    <button class="iconbtn" id="setBtn" type="button" aria-label="設定">${I.gear}</button>
  </header>
  <main class="views" id="views">
    ${VIEWS.map(([v, name]) => `<section class="view" id="v-${v}" data-view="${v}" aria-label="${name}"></section>`).join('')}
  </main>
  <button class="fab" id="chatFab" type="button" data-chat aria-label="家人聊天">${I.chat}<span class="fab-txt">家人聊天</span><span class="badge" id="badge" hidden></span></button>
  <nav class="tabbar" aria-label="分頁"><ul>${VIEWS.map(([v, name]) => `<li><button type="button" data-view="${v}">${I[v]}${name}</button></li>`).join('')}</ul></nav>
  <div class="ov" id="ov" hidden></div>
  <div class="pop" id="pop" popover></div>`;
  app.hidden = false;
  document.body.classList.toggle('flow', S.mode === 'flow');
  renderMe();
  renderNow(); renderDays(); renderStay(); renderCall(); renderTips();
  showView(S.view, { instant: true });
  tick();
  setupFlowSpy();
}

function renderMe() {
  const b = $('#meBtn');
  b.innerHTML = S.me ? `${avatar(S.me)}${esc(memberName(S.me))}` : `<span class="av">?</span>我是誰`;
  b.setAttribute('aria-label', S.me ? `目前是${memberName(S.me)}，按這裡換人` : '選擇你是誰');
  renderVouchers();
}

function renderNow() {
  const D = S.data;
  $('#v-now').innerHTML = `
  <div class="stack" style="padding-top:8px">
    <section class="now" aria-labelledby="nowHead">
      <p class="clock">越南時間 <b id="vnTime">--:--</b>台灣 <b id="twTime">--:--</b></p>
      <h2 id="nowHead"></h2>
      <p class="now-cur" id="nowCur" hidden>目前：<b id="nowCurText"></b></p>
      <div class="now-next" id="nowNext"><p class="now-sub" id="nowSub"></p><ol class="tl" id="nowEv"></ol></div>
      <button class="btn solid" type="button" id="nowGo"></button>
    </section>
    <div class="quick">
      <button class="btn" type="button" id="addrNow">${I.stop}給司機看地址</button>
      <button class="btn" type="button" data-view="call">${I.call}打電話</button>
      <button class="btn wide" type="button" data-tr>${I.tr}翻譯（拍菜單、說話、常用句）</button>
    </div>
    <section class="vch" id="vch" hidden></section>
    <section class="feed" id="feed"></section>
  </div>`;
  renderVouchers();
  renderFeed();
}

function renderFeed() {
  const el = $('#feed');
  if (!el) return;
  const msgs = S.msgs.slice(-3).reverse();
  const top = [...S.place.values()].map((p) => [p, wanters(p.id)]).filter(([, w]) => w.length).sort((a, b) => b[1].length - a[1].length).slice(0, 5);
  el.innerHTML = `<h3>${I.chat}家人動態 <span class="syncdot${S.synced ? ' ok' : ''}">${S.synced ? '已連線' : S.F ? '離線中' : '連線中'}</span></h3>
    ${msgs.length ? `<ul>${msgs.map((m) => `<li>${avatar(m.who, true)}<p>${esc(m.text || (m.pic ? '［傳了一張照片］' : ''))}<small>${esc(memberName(m.who))}・${m.ms ? localTime(m.ms) : ''}</small></p></li>`).join('')}</ul>` : '<p class="muted" style="margin:0">還沒有人留言。</p>'}
    ${top.length ? `<p style="margin:4px 0 0;font-weight:700">大家想去的</p><ul>${top.map(([p, w]) => `<li><span class="avs">${w.map((m) => avatar(m, true)).join('')}</span><p><button class="btn small" type="button" data-open="${p.id}" style="text-align:left">${esc(shortName(p))}</button></p></li>`).join('')}</ul>` : ''}
    <button class="btn solid" type="button" data-chat>${I.chat}打開家人聊天</button>`;
}

function renderDays() {
  const D = S.data;
  $('#v-days').innerHTML = `
  <h2 class="sr-only">每日行程</h2>
  <nav class="daybar" aria-label="選日期">${D.days.map((d) => { const dt = new Date(d.date + 'T00:00:00Z'); return `<button type="button" data-day="${d.id}" aria-pressed="false"><b>${dt.getUTCDate()}</b><small>${WD[dt.getUTCDay()]}</small></button>`; }).join('')}<button class="ib" type="button" data-tip="tz" aria-label="時間說明">${I.info}</button></nav>
  <div id="dayBody"></div>`;
  renderDay();
}

function renderDay() {
  const d = S.data.days.find((x) => x.id === S.day);
  const i = S.data.days.indexOf(d);
  $$('.daybar [data-day]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.day === d.id)));
  const extras = recsFor('extra-' + d.city).filter((p) => !d.segs.some((s) => p.segs.includes(s.key)));
  const isToday = ymd(Date.now(), OFF_VN) === d.date;
  $('#dayBody').innerHTML = `
    <header class="dh">
      <p class="dmeta">${isToday ? '<span class="today-tag">今天</span>' : ''}${label(d.date)}・第 ${i + 1} 天・${esc(d.stay.replace(/^今晚住\s*/, '住 '))}</p>
      <h3>${esc(d.title)}</h3>
    </header>
    ${d.segs.map(segHTML).join('')}
    ${extras.length ? `<section class="seg"><div class="seg-h"><h3>還可以去</h3><span class="sp"></span></div>${recBlock('x-' + d.id, extras)}</section>` : ''}`;
  S.openRecs.forEach((k) => fillRecs(k));
  markEvents();
}

function recBlock(key, list) {
  const open = S.openRecs.has(key);
  return `<div class="seg-acts"><button class="recbtn" type="button" data-recs="${key}" aria-expanded="${open}" aria-controls="r-${key}">
      ${I.eat}<span>附近推薦</span><b>${list.length}</b>${I.chev}</button>
    <div class="recs" id="r-${key}" ${open ? '' : 'hidden'}></div></div>`;
}

// 時段提醒的小燈泡：還沒點開過、或是那一天，就一閃一閃
const tipSeen = new Set(store.get('nv-tipseen', []));
function tipHot(key) {
  const day = S.data.days.find((d) => d.id === key.split('-')[0]);
  return !tipSeen.has(key) || day?.date === ymd(Date.now(), OFF_VN);
}

function segHTML(s) {
  const plans = S.plans.filter((p) => p.seg === s.key).sort((a, b) => (a.time || '99') < (b.time || '99') ? -1 : 1);
  const rows = s.ev.map((e) => ({ k: e.at, html: evHTML(e) }));
  plans.forEach((p) => rows.push({ k: p.time || '99:99', html: planHTML(p) }));
  rows.sort((a, b) => (a.k < b.k ? -1 : a.k > b.k ? 1 : 0));
  const tip = S.data.segTips[s.key];
  const list = recsFor(s.key);
  return `<section class="seg" data-seg="${s.key}">
    <div class="seg-h"><h3>${esc(s.name)}</h3><span class="sp"></span>
      ${tip ? `<button class="ib tipb${tipHot(s.key) ? ' hot' : ''}" type="button" data-tip="${s.key}" aria-label="${esc(s.name)}的提醒">${I.bulb}</button>` : ''}
      <button class="ib" type="button" data-add="${s.key}" aria-label="在${esc(s.name)}加行程">${I.plus}</button></div>
    <ol class="tl">${rows.map((r) => r.html).join('')}</ol>
    ${list.length ? recBlock(s.key, list) : ''}
  </section>`;
}

function planHTML(p) {
  const pl = p.place && S.place.get(p.place);
  return `<li class="ev fam open" data-plan="${p.id}">
    <div class="ev-row"><span class="t">${p.time ? esc(p.time) : '—'}</span>
      <span class="ev-main"><span class="ev-h">${esc(p.title)}</span>${p.note ? `<span class="ev-m">${esc(p.note)}</span>` : ''}</span>
      <span class="ev-side">${avatar(p.who, true)}<button class="ib" type="button" data-delplan="${p.id}" aria-label="刪除「${esc(p.title)}」">${I.close}</button></span></div>
    ${pl ? `<div class="ev-d"><div><div class="ev-in"><p class="acts"><button class="btn small" type="button" data-pop="${pl.id}">${esc(plabel(pl.id)[0])}</button></p></div></div></div>` : ''}
  </li>`;
}

function fillRecs(key) {
  const box = $('#r-' + key);
  if (!box) return;
  const list = key.startsWith('x-') ? (() => { const d = S.data.days.find((x) => x.id === key.slice(2)); return recsFor('extra-' + d.city).filter((p) => !d.segs.some((s) => p.segs.includes(s.key))); })() : recsFor(key);
  box.innerHTML = groupedRecs(list);
}

// 分區標題（和每日行程的「上午」「下午」同一種樣式）
const sectH = (name, extra = '') => `<div class="seg-h"><h3>${name}</h3><span class="sp"></span>${extra}</div>`;
// 一個可以點開的主題：收起來是圖示＋標題＋一行重點
let topicSeq = 0;
function topicHTML({ icon, h, m, body, open = false }) {
  const id = 'tp' + (++topicSeq);
  return `<div class="ev topic${open ? ' open' : ''}">
    <button class="ev-row" type="button" data-ev aria-expanded="${open}" aria-controls="${id}">
      <span class="tp-i">${I[icon] || I.info}</span>
      <span class="ev-main"><span class="ev-h">${h}</span>${m ? `<span class="ev-m">${m}</span>` : ''}</span>
      <span class="ev-side"><span class="chev">${I.chev}</span></span></button>
    <div class="ev-d" id="${id}"><div><div class="ev-in">${body}</div></div></div></div>`;
}

function renderStay() {
  const D = S.data;
  const fl = D.flights.map((f) => `<div class="fl"><p class="fl-lbl">${esc(f.label)}<b>${esc(f.no)}</b></p>
    <div class="fl-end"><span class="fl-time">${f.from[1]}</span><span class="fl-city">${esc(f.from[2])}</span></div>
    <span class="fl-arrow" aria-hidden="true">${I.plane}</span>
    <div class="fl-end"><span class="fl-time">${f.to[1]}</span><span class="fl-city">${esc(f.to[2])}</span></div></div>`).join('');
  const kv = (rows) => `<dl class="kv">${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`;
  const hotels = D.hotels.map((h) => `<article class="card" id="c-${h.id}"><img src="${h.img}" alt="${esc(h.alt)}" loading="lazy">
    <div class="in"><h3>${esc(h.name)}<span>${esc(h.zh)}</span></h3>
      ${kv(h.kv)}
      <button class="addr" type="button" data-addr="${h.addr}"><small>${I.stop}給司機看</small><span lang="vi" translate="no">${esc(D.addrs[h.addr].vi)}</span></button>
      <p class="acts">${h.links.map(linkHTML).join('')}${grabBtn(addrText(h.addr))}</p>
      ${h.more?.length ? topicHTML({ icon: 'info', h: '更多', body: kv(h.more) }) : ''}</div></article>`).join('');
  $('#v-stay').innerHTML = `
  <h2 class="sr-only">住宿與交通</h2>
  ${sectH('航班')}
  <div class="flights">${fl}<p class="visa">${I.check}<span>5 人電子簽證都已核准（11/15–11/21 單次入境），每人印一份自己的帶著</span></p></div>
  ${sectH('住宿')}
  <div class="stack">${hotels}</div>
  ${sectH('包車')}
  <div class="car"><p class="car-h"><b>${esc(D.car.head)}</b><span>${esc(D.car.sub)}</span></p>
    <ol class="legs">${D.car.legs.map(([t, d, s]) => `<li><b>${t}<small>${d}</small></b><span>${esc(s)}</span></li>`).join('')}</ol>
    <p class="acts">${linkHTML(['wa', 'WhatsApp Mr. Phuong', '+84854848484'])}</p></div>`;
}

function contactHTML(c) {
  const main = c.wa ? linkHTML(['wa', 'WhatsApp', c.wa]) : linkHTML(['tel', '撥打', c.tel]);
  return `<li class="contact"><div class="who"><b>${esc(c.who)}</b><span>${esc(c.sub)}</span><span class="num">${esc(c.num)}</span></div>
    <div class="c-acts">${main}<button class="ib" type="button" data-copy="${esc(c.wa || c.tel)}" aria-label="複製 ${esc(c.who)} 的電話">${I.copy}</button></div></li>`;
}

function renderCall() {
  const D = S.data;
  $('#v-call').innerHTML = `
  <h2 class="sr-only">電話</h2>
  ${sectH('緊急')}
  <div class="sos">${D.sos.map(([n, t]) => `<a href="tel:${n}"><b>${n}</b><span>${t}</span></a>`).join('')}</div>
  <ul class="contacts">${D.emergency.map(contactHTML).join('')}</ul>
  <p class="warn">${esc(D.emergencyNote)}</p>
  ${sectH('聯絡人')}
  <ul class="contacts">${D.contacts.map(contactHTML).join('')}</ul>`;
}

function renderTips() {
  const D = S.data;
  const spa = D.places.filter((p) => p.group === 'spa' && p.city === 'hanoi');
  const packed = store.get('nv-pack-v1', {});
  const g = Math.min(store.get('nv-phg', 1), PHRASES.length - 1);
  const pts = (list) => `<ul class="pts">${list.map((x) => `<li>${rich(x)}</li>`).join('')}</ul>`;
  $('#v-tips').innerHTML = `
  <h2 class="sr-only">出門須知</h2>
  ${sectH('我們 5 個人')}
  <ul class="members">${D.members.map((m) => `<li>${avatar(m.id)}<div class="mb"><b>${esc(m.name)}</b><span>${esc(m.full)}・<span class="en">${esc(m.en)}</span></span></div><span class="tagrow">${m.tags.map(([c, t]) => `<span class="flag ${c}">${t}</span>`).join('')}</span></li>`).join('')}</ul>
  ${sectH('注意事項')}
  <div class="topics">
    ${D.tips.map((t) => topicHTML({ icon: t.icon, h: esc(t.h), m: esc(t.m), body: pts(t.p) })).join('')}
    ${spa.length ? topicHTML({ icon: 'spa', h: '越式洗頭、按摩', m: `${spa.length} 家・套餐和價錢`, body: `<div class="recs" style="padding:0">${spa.map(recHTML).join('')}</div>${D.spaTips?.length ? pts(D.spaTips) : ''}` }) : ''}
    ${topicHTML({ icon: 'check', h: '要帶的東西', m: `<span id="packN">${packCount(packed)}</span>`, body: `<ul class="checks">${D.packing.map(([id, t]) => `<li><input type="checkbox" id="pk-${id}" data-pack="${id}"${packed[id] ? ' checked' : ''}><label for="pk-${id}">${esc(t)}</label></li>`).join('')}</ul>` })}
  </div>
  ${sectH('常用越南語')}
  <div class="phg" role="tablist" aria-label="句子分類">${PHRASES.map(([name], i) => `<button type="button" role="tab" data-phg="${i}" aria-selected="${i === g}">${name}</button>`).join('')}</div>
  <ul class="phr2" id="phr2">${phraseItems(g)}</ul>`;
}
const packCount = (packed) => `已準備 ${S.data.packing.filter(([id]) => packed[id]).length} / ${S.data.packing.length}`;
// 常用越南語：點整列就唸，右邊的放大鍵給對方看
const phraseItems = (g) => PHRASES[g][1].map(([zh, vi]) => `<li><button class="ph-say" type="button" data-say="${esc(vi)}"><b lang="vi" translate="no">${esc(vi)}</b><span>${esc(zh)}</span>${I.speak}</button><button class="ib" type="button" data-bigv="${esc(vi)}" data-bigz="${esc(zh)}" aria-label="放大給對方看：${esc(zh)}">${I.full}</button></li>`).join('');

// ---------- now / next ----------
function tick() {
  const now = Date.now(), ev = S.events;
  const vt = $('#vnTime'); if (!vt) return;
  vt.textContent = hm(now, OFF_VN); $('#twTime').textContent = hm(now, OFF_TW);
  const vnDate = ymd(now, OFF_VN), D = S.data;
  $('#topSub').textContent = `${label(vnDate)}・越南 ${hm(now, OFF_VN)}`;
  let i = ev.findIndex((e) => e.ms > now); if (i < 0) i = ev.length;
  const head = $('#nowHead'), cur = $('#nowCur'), next = $('#nowNext'), go = $('#nowGo');
  if (i === 0) {
    const tw = ymd(now, OFF_TW), days = Math.round((Date.parse(D.start) - Date.parse(tw)) / 864e5);
    head.textContent = days > 0 ? `還有 ${days} 天出發` : '今天出發！';
    cur.hidden = true; $('#nowSub').textContent = '第一件事：';
  } else if (i < ev.length) {
    const di = D.days.findIndex((d) => d.date === vnDate);
    head.textContent = di >= 0 ? `今天 ${label(vnDate)}・第 ${di + 1} 天` : label(vnDate);
    cur.hidden = false; $('#nowCurText').innerHTML = ev[i - 1].h;
    $('#nowSub').textContent = '下一個：';
  } else {
    head.textContent = '旅程結束，歡迎回家！'; cur.hidden = true;
  }
  next.hidden = go.hidden = i >= ev.length;
  if (i < ev.length) {
    const e = ev[i];
    const sig = e.ms + '|' + (e.date !== vnDate);
    if (next.dataset.sig !== sig) {
      next.dataset.sig = sig;
      $('#nowEv').innerHTML = evHTML(e, e.date !== vnDate ? `<span class="nw-date">${label(e.date)}</span>` : '', { open: true });
    }
    go.textContent = `看 ${label(e.date)} 全部行程`;
    go.dataset.godate = e.dayId;
  }
  $('#addrNow').dataset.addr = addrNow(now);
  renderVouchers();
  $$('.daybar [data-day]').forEach((b) => b.classList.toggle('today', S.data.days.find((d) => d.id === b.dataset.day)?.date === vnDate));
  markEvents();
}

function markEvents() {
  const now = Date.now(), ev = S.events;
  let i = ev.findIndex((e) => e.ms > now); if (i < 0) i = ev.length;
  const doneBefore = i > 0 ? ev[i - 1].ms : -Infinity, nextMs = ev[i]?.ms;
  $$('#dayBody .ev[data-ms]').forEach((li) => {
    const ms = +li.dataset.ms;
    li.classList.toggle('is-done', ms < doneBefore);
    li.classList.toggle('is-next', ms === nextMs);
  });
}

function addrNow(t) {
  let k = 'somerset';
  for (const [d, h, a] of [['2026-11-18', '08:00', 'legend'], ['2026-11-19', '06:30', 'pier'], ['2026-11-20', '11:00', 'somerset'], ['2026-11-21', '09:30', 'airport']]) if (t >= vnMs(d, h)) k = a;
  return k;
}

// ---------- views ----------
function showView(v, { instant } = {}) {
  if (S.mode === 'flow') {
    const el = $('#v-' + v);
    if (!instant || v !== 'now') el.scrollIntoView({ behavior: instant || reduceMotion() ? 'auto' : 'smooth' });
  } else {
    if (!instant) S.scroll[S.view] = scrollY;
    $$('.view').forEach((x) => x.classList.toggle('on', x.dataset.view === v));
    scrollTo(0, S.scroll[v] || 0);
  }
  S.view = v;
  store.set('nv-view', v);
  markTab();
  setHash();
  fitFab();
}
const markTab = () => $$('.tabbar button').forEach((b) => (b.dataset.view === S.view ? b.setAttribute('aria-current', 'page') : b.removeAttribute('aria-current')));

let spy;
function setupFlowSpy() {
  spy?.disconnect();
  if (S.mode !== 'flow') return;
  spy = new IntersectionObserver((ents) => {
    ents.filter((e) => e.isIntersecting).forEach((e) => {
      S.view = e.target.dataset.view;
      markTab();
      setHash();
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('.view').forEach((v) => spy.observe(v));
}

function selectDay(id) {
  S.day = id;
  renderDay();
  const bar = $('.daybar');
  if (bar && S.mode === 'page' && scrollY > bar.offsetTop) scrollTo(0, bar.offsetTop);
  if (S.mode === 'flow') bar.scrollIntoView({ block: 'start' });
  setHash();
}

// ---------- sheets ----------
const stack = [];
function openLayer(html, { full } = {}) {
  const ov = $('#ov');
  const layer = document.createElement('div');
  layer.className = 'layer';
  layer.innerHTML = `<div class="sheet${full ? ' full' : ''}" role="dialog" aria-modal="true">${html}</div>`;
  layer.addEventListener('click', (e) => { if (e.target === layer) requestClose(); });
  ov.append(layer); ov.hidden = false;
  document.body.classList.add('locked');
  stack.push(layer);
  history.pushState({ nvSheet: stack.length }, '');
  requestAnimationFrame(() => layer.classList.add('in'));
  setTimeout(() => layer.classList.add('in'), 60);
  setTimeout(() => layer.querySelector('[data-close]')?.focus({ preventScroll: true }), 50);
  return layer.firstElementChild;
}
function closeTop() {
  const layer = stack.pop();
  if (!layer) return;
  layer.cleanup?.();
  layer.remove();
  if (layer.dataset.kind === 'chat') { S.chatOpen = false; S.editing = null; }
  if (!stack.length) { $('#ov').hidden = true; document.body.classList.remove('locked'); }
}
const requestClose = () => history.back();
addEventListener('popstate', () => { if (stack.length) closeTop(); });
const head = (title, extra = '') => `<div class="sh-head"><h2>${title}</h2>${extra}<button class="x" type="button" data-close aria-label="關閉">${I.close}</button></div>`;

function openPlace(id) {
  const p = S.place.get(id);
  if (!p) return;
  const ph = p.photos || [];
  const gal = ph.length ? `<div class="gal-wrap"><div class="gal">${ph.map((x, i) => `<button type="button" data-lb="${p.id}" data-i="${i}" aria-label="放大第 ${i + 1} 張照片"><img src="${esc(x.t)}" alt="" loading="${i ? 'lazy' : 'eager'}" crossorigin="anonymous" referrerpolicy="no-referrer"></button>`).join('')}</div>${ph.length > 1 ? `<span class="gal-n">1 / ${ph.length}</span>` : ''}</div>
    <p class="credit">${credit(ph[0])}</p>` : '';
  const rows = [['必點／必看', p.try], ['不吃牛肉', p.noBeef], ['價錢', p.price], ['時間', p.hours], ['地址', p.addr && `<span lang="vi" translate="no">${esc(p.addr)}</span>`], ['怎麼去', p.walk], ['注意', p.notes], ['預約', p.booking], ['小費', p.tip], ['5 個人', p.group5 && ({ yes: '可以 5 人一起', 'call ahead': '5 人要先預約', unknown: '不確定，先問' }[p.group5] || p.group5)]]
    .filter(([, v]) => v).map(([k, v]) => `<dt>${k}</dt><dd>${k === '地址' ? v : linkify(v)}</dd>`).join('');
  const pk = p.packages?.length ? `<div><h3 style="margin:0 0 4px;font-size:1.1rem">套餐和價錢</h3><ul class="pk">${p.packages.map((k) => `<li><b>${esc(k.name_zh || k.name_local)}</b><span class="price">${k.price_vnd ? esc(fmtVnd(k.price_vnd)) : ''}</span><small>${[k.minutes ? k.minutes + ' 分鐘' : '', k.includes_zh].filter(Boolean).map(esc).join('・')}</small></li>`).join('')}</ul></div>` : '';
  const links = [['map', '地圖、照片', p.q]];
  if (p.website) links.push(['web', '官網', p.website]);
  const sheet = openLayer(`${head(esc(shortName(p)))}
    <div class="sh-body">
      ${gal}
      <h3 class="d-name">${esc(p.name)}${p.local ? `<small lang="vi">${esc(p.local)}</small>` : ''}</h3>
      <div class="tags">${byTags(p)}<span class="tag ${p.who}">${WHO[p.who] || ''}</span>${p.area ? `<span class="tag">${esc(p.area)}</span>` : ''}</div>
      ${p.why ? `<p>${esc(p.why)}</p>` : ''}
      ${pk}
      ${rows ? `<dl class="dl">${rows}</dl>` : ''}
      <p class="wanters" data-wanters="${p.id}"></p>
      ${p.sources?.length ? `<details class="src"><summary>資料來源（${p.sources.length}）</summary>${p.sources.map((u) => `<div><a href="${esc(u)}" target="_blank" rel="noopener">${esc(u)}</a></div>`).join('')}</details>` : ''}
      <div class="sticky-acts">${wantBtn(p.id)}${links.map(linkHTML).join('')}${grabBtn(grabDest(p))}
        <button class="btn" type="button" data-addplace="${p.id}">${I.plus}加進行程</button>
        <button class="btn" type="button" data-chatref="${p.id}">${I.chat}傳到聊天</button></div>
    </div>`, { full: true });
  updateWanters(sheet);
  const g = $('.gal', sheet);
  if (g && ph.length > 1) g.addEventListener('scroll', () => {
    const i = Math.round(g.scrollLeft / g.clientWidth);
    $('.gal-n', sheet).textContent = `${i + 1} / ${ph.length}`;
    $('.credit', sheet).innerHTML = credit(ph[i]);
  }, { passive: true });
}
const linkify = (s) => esc(s).replace(/https?:\/\/[^\s，；、）)]+/g, (u) => `<a href="${u}" target="_blank" rel="noopener">${u.replace(/^https?:\/\/(www\.)?/, '').slice(0, 40)}</a>`);
const fmtVnd = (v) => String(v).replace(/\d{4,}/g, (n) => Number(n).toLocaleString('en-US')) + (/\d/.test(v) && !/[đ₫]|VND|越/.test(v) ? ' 越南盾' : '');
const credit = (x) => x ? `照片：${esc(x.by || '不詳')}${x.lic ? '・' + esc(x.lic) : ''}・<a href="${esc(x.src)}" target="_blank" rel="noopener">Wikimedia Commons</a>` : '';

function openLightbox(id, i) {
  const p = S.place.get(id), ph = p.photos;
  const sheet = openLayer(`${head(esc(shortName(p)))}<div class="lb-track">${ph.map((x) => `<figure><img src="${esc(x.f || x.t)}" alt="" loading="lazy" crossorigin="anonymous" referrerpolicy="no-referrer"><figcaption>${credit(x)}</figcaption></figure>`).join('')}</div>`, { full: true });
  sheet.classList.add('lb');
  const tr = $('.lb-track', sheet);
  requestAnimationFrame(() => { tr.scrollLeft = tr.clientWidth * i; });
}

function openAddr(k) {
  const a = S.data.addrs[k];
  if (!a) return;
  openLayer(`${head('給司機看')}<div class="addrbig">
    <p class="ask" lang="vi" translate="no">Xin chở tôi đến địa chỉ này.</p>
    <p class="vi-big" lang="vi" translate="no">${esc(a.vi)}</p>
    <p class="zh">請載我到這個地址：${esc(a.zh)}</p>
    <p class="acts" style="justify-content:center">${grabBtn(addrText(k))}</p></div>`, { full: true });
}

// 入境申報 QR code：放在 qr.bin（家庭金鑰一層），每個人的那份再用自己的身分證字號（PBKDF2）加密，輸入對了才解得開。
// 解開的圖只放在這個畫面（不存手機），關掉就要再輸入一次；越南時間 11/16 起不顯示，qr.bin 也會從 GitHub 刪掉。
// ---------- 憑證、QR code（「現在」頁） ----------
// 每個憑證到「使用日隔天 00:00（越南時間）」就不顯示；加密檔 v/*.bin 也會被刪掉（build.mjs、GitHub Actions）。
// who：只給這些人看（eSIM）；lock：要輸入身分證字號（入境申報、電子簽證）
const b64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
const vLive = (v) => Date.now() < Date.parse(v.until);
const vMine = (v) => !v.who || !!(S.me && v.who[S.me]);
const vById = (id) => (S.data.vouchers || []).find((v) => v.id === id);
function renderVouchers() {
  const box = $('#vch');
  if (!box) return;
  const list = (S.data.vouchers || []).filter((v) => vLive(v) && vMine(v));
  const sig = list.map((v) => v.id).join();
  if (box.dataset.sig === sig) return;
  box.dataset.sig = sig;
  box.hidden = !list.length;
  box.innerHTML = list.length ? `${sectH('憑證、QR code')}<ul class="vlist">${list.map((v) => `<li><button class="vrow" type="button" data-voucher="${v.id}">
    <span class="tp-i">${I[v.icon] || I.ticket}</span>
    <span class="ev-main"><span class="ev-h">${esc(v.h)}</span><span class="ev-m">${esc(v.m)}</span></span>
    <span class="vr-go">${I.chev}</span></button></li>`).join('')}</ul>` : '';
}
async function vFile(path) {
  const res = await fetch(path, { cache: 'no-cache' });
  if (!res.ok) throw new Error('v ' + res.status);
  return decrypt(new Uint8Array(await res.arrayBuffer()), S.key);
}
const vErr = (e) => navigator.onLine === false ? '現在沒有網路，連上網路再試一次' : / 404$/.test(e?.message) ? '已經從網站刪掉了' : '下載失敗，重新整理網頁再試一次';
// 先在背景下載還沒到期的憑證，到越南剛下飛機沒網路也打得開（service worker 會存起來）
function prefetchVouchers() {
  for (const v of S.data.vouchers || []) if (vLive(v)) for (const f of [v.file, ...Object.values(v.files || {})]) if (f) fetch(f, { cache: 'no-cache' }).catch(() => {});
}
// 手機裡存過的、已經到期的憑證檔也刪掉
async function dropExpiredCache() {
  if (!window.caches) return;
  const now = new Date().toISOString().replace(/[-:]/g, '').slice(0, 13);
  for (const name of await caches.keys()) {
    const c = await caches.open(name);
    for (const req of await c.keys()) {
      const p = new URL(req.url).pathname, m = /\/v\/(\d{8}T\d{4})-\w+\.bin$/.exec(p);
      if ((m && m[1] <= now) || /\/qr\.bin$/.test(p)) await c.delete(req);
    }
  }
}

const qrFig = (img, alt, cap, no, sm) => `<figure class="vq${sm ? ' sm' : ''}"><div class="qr-box"><img src="${img}" alt="${esc(alt)}"></div>
  ${cap || no ? `<figcaption>${cap ? `<b>${esc(cap)}</b>` : ''}${no ? `<small>${esc(no)}</small>` : ''}</figcaption>` : ''}</figure>`;
async function fillQr(el, path, { rest = true } = {}) {
  try {
    const g = await vFile(path);
    const [main, ...more] = g.items;
    el.outerHTML = qrFig(main.img, g.t, g.items.length > 1 ? main.cap : '', main.no)
      + (rest && more.length ? `<p class="qr-cap">攤位要分開兌換時，掃下面這幾張</p><div class="vq-grid">${more.map((it) => qrFig(it.img, g.t, it.cap, it.no, true)).join('')}</div>` : '');
  } catch (e) { el.outerHTML = `<p class="qr-err">${vErr(e)}</p>`; }
}
const loadingQr = (path) => `<p class="vq-load" data-vqf="${path}">QR code 下載中…</p>`;

function openVoucher(id) {
  const v = vById(id);
  if (!v || !vLive(v)) return toast('這個憑證已經從網站刪掉了');
  if (v.who && !ensureMe(() => openVoucher(id))) return;
  if (v.lock) return openLocked(v);
  if (v.guide) return openEsim(v);
  const pts = v.p?.length ? `<ul class="pts">${v.p.map((x) => `<li>${rich(x)}</li>`).join('')}</ul>` : '';
  const links = v.links?.length ? `<p class="acts">${v.links.map(linkHTML).join('')}</p>` : '';
  const sheet = openLayer(`${head(esc(v.h))}<div class="sh-body">
    ${pts}${v.qr ? loadingQr(v.files[v.qr]) : ''}${links}</div>`);
  $$('[data-vqf]', sheet).forEach((el) => fillQr(el, el.dataset.vqf));
}

// eSIM：養駃、純羽看 iPhone 版（含自己的 QR code），玥彤看安卓版
function openEsim(v) {
  const os = v.who[S.me];
  if (!os) return toast('這個只有要用 eSIM 的人看得到');
  const qr = v.qrBy?.[S.me] && v.files?.[v.qrBy[S.me]];
  const step = (x) => x === '@qr' ? (qr ? `<li class="st-qr">${loadingQr(qr)}<p class="qr-cap">也可以用別支手機或電腦打開這個畫面，再用自己 iPhone 的「相機」掃</p></li>` : '') : `<li>${rich(x)}</li>`;
  const secs = v.guide[os].map((s) => `<section class="gd"><h3>${esc(s.h)}</h3><ol class="steps">${s.steps.map(step).join('')}</ol>
    ${s.note ? `<p class="gd-note">${I.info}<span>${rich(s.note)}</span></p>` : ''}</section>`).join('');
  const info = v.info?.[os]?.length ? `<section class="gd"><h3>流量</h3><ul class="pts">${v.info[os].map((x) => `<li>${rich(x)}</li>`).join('')}</ul></section>` : '';
  const links = v.links?.[os]?.length ? `<p class="acts">${v.links[os].map(linkHTML).join('')}</p>` : '';
  const sheet = openLayer(`${head(`${esc(v.h)}・${os === 'ios' ? 'iPhone' : '安卓手機'}`)}<div class="sh-body">${secs}${info}${links}</div>`);
  $$('[data-vqf]', sheet).forEach((el) => fillQr(el, el.dataset.vqf, { rest: false }));
}

// 入境申報、電子簽證：輸入自己的身分證字號才解得開，不存手機，關掉要再輸入一次
async function idDecrypt(e, id, iter) {
  const base = await crypto.subtle.importKey('raw', enc.encode(id), 'PBKDF2', false, ['deriveKey']);
  const k = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: b64(e.s), iterations: iter, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
  return new Uint8Array(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(e.i) }, k, b64(e.c)));
}
function openLocked(v) {
  if (!ensureMe(() => openVoucher(v.id))) return;
  if (!v.members?.includes(S.me)) return toast('找不到你的' + v.h);
  const name = esc(memberName(S.me)), isDoc = v.lock === 'visa';
  const pts = v.p?.length ? `<ul class="pts">${v.p.map((x) => `<li>${rich(x)}</li>`).join('')}</ul>` : '';
  const sheet = openLayer(`${head(esc(v.h))}<div class="sh-body"><form class="form" id="idForm" autocomplete="off">
      <label>${name}的身分證字號
        <input class="field" name="nid" autocapitalize="characters" autocomplete="off" autocorrect="off" spellcheck="false" maxlength="12" required placeholder="英文字母＋9 個數字"></label>
      <p class="qr-err" role="alert" hidden></p>
      <button class="btn solid" type="submit">打開</button>
      <button class="btn small" type="button" data-qrme>不是${name}？換人</button>
    </form>${pts}</div>`);
  const form = $('#idForm', sheet), err = $('.qr-err', sheet), go = $('button[type=submit]', form);
  const fail = (msg) => { err.textContent = msg; err.hidden = false; go.disabled = false; go.textContent = '打開'; };
  let found = null;
  sheet.addEventListener('click', (ev) => {
    if (ev.target.closest('[data-qrswitch]') && found) {
      S.me = found; store.set('nv-me', S.me); renderMe(); updateLikesUI(); updateBadge();
      ev.target.closest('p').remove();
      return;
    }
    if (!ev.target.closest('[data-qrme]')) return;
    requestClose();
    setTimeout(() => openMe(() => openVoucher(v.id)), 60);
  });
  const BAD_BROWSER = '這個瀏覽器打不開，請用 Safari 或 Chrome 打開家庭連結';
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    // 中文輸入法可能打出全形字（Ｌ２２…），先轉半形；空白、連字號都拿掉
    const id = form.elements.nid.value.normalize('NFKC').replace(/[\s\-‐‑–—]/g, '').toUpperCase();
    if (!/^[A-Z][0-9]{9}$/.test(id)) return fail('身分證字號是 1 個英文字母加 9 個數字');
    if (!crypto.subtle?.deriveKey) return fail(BAD_BROWSER);
    err.hidden = true; go.disabled = true; go.textContent = '打開中…';
    let Q;
    try { Q = await vFile(v.file); } catch (e) { return fail(vErr(e)); }
    // 先試目前選的人；不對再同時試其他人（身分可能選錯），誰的字號對就給誰的
    const tryOne = (m) => idDecrypt(Q.entries[m], id, Q.iter).then((bin) => ({ m, bin }));
    let hit = null, broken = false;
    const note = (e) => { if (e?.name !== 'OperationError') { broken = true; console.warn('lock', e); } };
    try { hit = await tryOne(S.me); } catch (e) {
      note(e);
      const rest = await Promise.allSettled(Object.keys(Q.entries).filter((m) => m !== S.me).map(tryOne));
      rest.forEach((r) => r.status === 'rejected' && note(r.reason));
      hit = rest.find((r) => r.status === 'fulfilled')?.value || null;
    }
    if (!hit) return fail(broken ? BAD_BROWSER : '字號不對，再確認一次');
    found = hit.m;
    const url = URL.createObjectURL(new Blob([hit.bin], { type: Q.mime || 'image/png' }));
    sheet.parentElement.cleanup = () => URL.revokeObjectURL(url);
    const owner = esc(memberName(hit.m)), all = (v.share?.[hit.m] || [hit.m]).map(memberName);
    const gone = label(ymd(Date.parse(v.until), OFF_VN)).replace(/（.*$/, '');
    $('.sh-body', sheet).innerHTML = `<p class="warn qr-warn" role="alert"><b>${I.cam}${isDoc ? '長按圖片 →「加入照片」存起來' : '請馬上截圖存到相簿'}</b>關掉這個畫面就要再輸入一次身分證字號，${gone} 起網站會刪掉。</p>
      ${isDoc ? `<div class="doc-box"><img src="${url}" alt="${owner}的電子簽證"></div><p class="qr-cap">${owner}的電子簽證・紙本也要帶</p>`
        : `<div class="qr-box"><img src="${url}" alt="${owner}的${esc(v.h)} QR code"></div>
      <p class="qr-cap">${all.length > 1 ? `${esc(all.join('、'))} ${all.length} 人共用這一張` : `${owner}自己的`}・入境時給海關看</p>`}
      ${hit.m !== S.me ? `<p class="qr-cap">這是${owner}的字號，這支手機選的是${name}・<button class="btn small" type="button" data-qrswitch>改成${owner}</button></p>` : ''}`;
  });
}

// WhatsApp：先選一句（中文看、英文送），點了複製英文、打開 WhatsApp 並填好訊息
function openWa(num, label) {
  const W = S.data.wa || {}, [name, own = []] = W[num] || [String(label || '').replace(/^WhatsApp\s*/, ''), []];
  const fill = (en) => en.replace(/\{(\w+)\}/g, (_, k) => W.vars?.[k]?.[S.me] || '______');
  const row = ([zh, en]) => { const t = fill(en); return `<li><a class="wa-ph" href="https://wa.me/${num}?text=${encodeURIComponent(t)}" target="_blank" rel="noopener" data-wacopy="${esc(t)}">
    <b>${esc(zh)}</b><span lang="en">${esc(t)}</span></a></li>`; };
  const sheet = openLayer(`${head(`WhatsApp・${esc(name || label)}`)}<div class="sh-body">
    <p class="muted wa-tip">點一句：會打開 WhatsApp 並填好英文，按送出就好（也會複製一份）。有 __:__ 的，送出前改成時間。</p>
    ${own.length ? `<ul class="wa-list">${own.map(row).join('')}</ul><h3 class="wa-h">其他常用</h3>` : ''}
    <ul class="wa-list">${(W.common || []).map(row).join('')}</ul>
    <p class="acts"><a class="lnk wa" href="https://wa.me/${num}" target="_blank" rel="noopener">直接打開 WhatsApp</a></p></div>`);
  sheet.addEventListener('click', (e) => {
    const a = e.target.closest('[data-wacopy]');
    if (a) navigator.clipboard?.writeText(a.dataset.wacopy).catch(() => {});
  });
}

function openMe(after) {
  const sheet = openLayer(`${head('你是誰？')}<div class="sh-body"><p>選一次就好，之後按「想去」、加行程、聊天都會用這個名字。</p>
    <div class="pick-me">${S.data.members.map((m) => `<button class="opt" type="button" data-pickme="${m.id}" aria-pressed="${S.me === m.id}">${avatar(m.id)}${esc(m.name)}</button>`).join('')}</div></div>`);
  sheet.addEventListener('click', (e) => {
    const b = e.target.closest('[data-pickme]');
    if (!b) return;
    S.me = b.dataset.pickme; store.set('nv-me', S.me);
    renderMe(); updateLikesUI(); updateBadge();
    requestClose();
    if (after) setTimeout(after, 60);
  });
}
function ensureMe(then) { if (S.me) return true; openMe(then); return false; }
function ensureDb() { if (S.F) return true; toast('還沒連上家人共用的資料，等一下再試'); return false; }

function openSettings() {
  const sheet = openLayer(`${head('設定')}<div class="sh-body">
    <div class="set-sec"><h3>我是誰</h3><div class="opt-row">${S.data.members.map((m) => `<button class="opt" type="button" data-setme="${m.id}" aria-pressed="${S.me === m.id}">${avatar(m.id, true)}${esc(m.name)}</button>`).join('')}</div></div>
    <div class="set-sec"><h3>怎麼往下滑</h3><div class="opt-row">
      <button class="opt" type="button" data-mode="page" aria-pressed="${S.mode === 'page'}">一次看一個區塊</button>
      <button class="opt" type="button" data-mode="flow" aria-pressed="${S.mode === 'flow'}">全部連在一起</button></div>
      <p>「一次看一個區塊」：滑到這一區最下面就停，用下面的按鈕換區。「全部連在一起」：可以一直往下滑到下一區。</p></div>
    <div class="set-sec"><h3>字的大小</h3><div class="opt-row">${[[1, '標準'], [1.12, '大'], [1.25, '特大']].map(([v, t]) => `<button class="opt" type="button" data-fs="${v}" aria-pressed="${S.fs === v}">${t}</button>`).join('')}</div></div>
    <div class="set-sec"><h3>分享給家人</h3><button class="btn solid" type="button" data-share>${I.share}傳連結給家人</button>
      <p>連結裡有密碼，只傳給家裡的人（例如家族 LINE 群組）。</p></div>
    <p class="muted" style="font-size:.9rem">資料整理日期：${esc(S.data.updated)}。行李清單打勾、字的大小只存在這支手機。</p>
  </div>`);
  sheet.addEventListener('click', (e) => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.setme) { S.me = t.dataset.setme; store.set('nv-me', S.me); renderMe(); updateLikesUI(); updateBadge(); }
    else if (t.dataset.mode) { S.mode = t.dataset.mode; store.set('nv-mode', S.mode); document.body.classList.toggle('flow', S.mode === 'flow'); setupFlowSpy(); }
    else if (t.dataset.fs) { S.fs = +t.dataset.fs; store.set('nv-fs', S.fs); applyFont(); }
    else return;
    $$('.opt', t.parentElement).forEach((o) => o.setAttribute('aria-pressed', String(o === t)));
  });
}

function openAdd(seg, placeId) {
  if (!ensureMe(() => openAdd(seg, placeId)) || !ensureDb()) return;
  const p = placeId && S.place.get(placeId);
  if (!seg && p) seg = p.segs.find((s) => S.segs.some((x) => x.key === s)) || S.segs.find((x) => x.day.id === S.day)?.key;
  const opts = S.data.days.map((d) => `<optgroup label="${label(d.date)} ${esc(d.title)}">${d.segs.map((s) => `<option value="${s.key}"${s.key === seg ? ' selected' : ''}>${label(d.date)} ${esc(s.name)}</option>`).join('')}</optgroup>`).join('');
  const sheet = openLayer(`${head('加一個行程')}<div class="sh-body"><form class="form" id="addForm">
    <label>哪一天、哪個時段<select class="field" name="seg">${opts}</select></label>
    <label>要做什麼<input class="field" name="title" maxlength="80" required value="${esc(p ? shortName(p) : '')}" placeholder="例如：去洗頭、吃河粉…"></label>
    <label>幾點 <small>可以不填</small><input class="field" type="time" name="time"></label>
    <label>備註 <small>可以不填</small><textarea class="field" name="note" maxlength="500" placeholder="例如：媽媽和玥彤想去…"></textarea></label>
    <button class="btn solid" type="submit">${I.plus}加進去</button>
    <p class="muted" style="margin:0;font-size:.95rem">加進去之後，全家的手機都看得到，誰都可以刪掉。</p></form></div>`);
  $('#addForm', sheet).addEventListener('submit', async (e) => {
    e.preventDefault();
    const f = new FormData(e.target), F = S.F;
    const doc = { who: S.me, seg: f.get('seg'), title: f.get('title').trim().slice(0, 80), at: F.serverTimestamp() };
    if (!doc.title) return;
    const time = f.get('time'), note = f.get('note').trim();
    if (time) doc.time = time.slice(0, 5);
    if (note) doc.note = note.slice(0, 500);
    if (p) doc.place = p.id;
    F.addDoc(S.col('plans'), doc).catch(() => toast('沒有存成功，檢查網路再試一次'));
    requestClose();
    toast('加好了');
    if (S.day !== S.segs.find((s) => s.key === doc.seg)?.day.id) { S.day = S.segs.find((s) => s.key === doc.seg).day.id; renderDay(); }
  });
}

// ---------- chat ----------
function openChat(ref) {
  if (!ensureMe(() => openChat(ref))) return;
  S.draftRef = ref || null;
  const sheet = openLayer(`${head('家人聊天', `<span class="syncdot${S.synced ? ' ok' : ''}" id="chatSync">${S.synced ? '已連線' : '連線中'}</span>`)}
    <div class="sh-body" id="chatBody"><ol class="msgs" id="msgs"></ol></div>
    <form class="composer" id="composer">
      <div id="refChip"></div>
      <div class="qp">${QUICK.map((q) => `<button type="button" data-qp>${esc(q)}</button>`).join('')}</div>
      <div class="row"><label class="btn icon-only" aria-label="傳照片">${I.img}<input type="file" accept="image/*" id="picIn" hidden></label>
        <textarea class="field" id="msgText" rows="1" maxlength="1000" placeholder="打字…" aria-label="訊息"></textarea>
        <button class="btn solid" type="submit" aria-label="送出">${I.send}送出</button></div>
    </form>`, { full: true });
  sheet.parentElement.dataset.kind = 'chat';
  S.chatOpen = true;
  S.draftPic = null;
  renderRefChip();
  if (ref) $('#msgText').value = '這個要不要去？';
  renderMsgs();
  $('#picIn').addEventListener('change', async (e) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    try { S.draftPic = await shrink(f, 1280, 0.72, 600000); renderRefChip(); }
    catch { toast('這張照片打不開，換一張試試'); }
  });
  $('#composer').addEventListener('submit', (e) => { e.preventDefault(); sendMsg(); });
  $('#msgText').addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey && !e.isComposing && matchMedia('(pointer:fine)').matches) { e.preventDefault(); sendMsg(); } });
  sheet.addEventListener('click', (e) => {
    const q = e.target.closest('[data-qp]');
    if (q) { const t = $('#msgText'); t.value = (t.value ? t.value + ' ' : '') + q.textContent; t.focus(); }
    if (e.target.closest('[data-unref]')) { S.draftRef = null; renderRefChip(); }
    if (e.target.closest('[data-unpic]')) { S.draftPic = null; renderRefChip(); }
    if (e.target.closest('[data-unedit]')) { S.editing = null; $('#msgText').value = ''; renderRefChip(); }
  });
}
function renderRefChip() {
  const p = S.draftRef && S.place.get(S.draftRef), el = $('#refChip');
  if (!el) return;
  el.innerHTML = (S.editing ? `<div class="editing">${I.edit || ''}<span>編輯訊息</span><button class="x" type="button" data-unedit aria-label="取消編輯">${I.close}</button></div>` : '') + (p ? `<div class="bub" style="padding:4px"><div class="refc">${thumb(p)}<span>${esc(shortName(p))}</span><button class="x" type="button" data-unref aria-label="不要附上">${I.close}</button></div></div>` : '')
    + (S.draftPic ? `<div class="bub" style="padding:4px"><div class="refc"><img src="${S.draftPic}" alt="要傳的照片"><span>附上這張照片</span><button class="x" type="button" data-unpic aria-label="不要附上照片">${I.close}</button></div></div>` : '');
}
async function sendMsg() {
  const t = $('#msgText'), text = t.value.trim(), pic = S.draftPic;
  if (S.editing) {   // 編輯自己的訊息：只改文字，Firestore 規則只允許動 text 和 edited
    const m = S.msgs.find((x) => x.id === S.editing);
    if (!m || !ensureDb()) return;
    if (!text && !m.pic) { toast('訊息不能是空的，要刪掉請按「收回」'); return; }
    const id = S.editing;
    S.editing = null; t.value = ''; renderRefChip();
    if (text === m.text) return;
    S.F.updateDoc(S.F.doc(S.col('msgs'), id), { text: text.slice(0, 1000), edited: S.F.serverTimestamp() }).catch(() => toast('沒有改成功，檢查網路再試一次'));
    return;
  }
  if ((!text && !pic) || !ensureDb()) return;
  const F = S.F, doc = { who: S.me, text: text.slice(0, 1000), at: F.serverTimestamp() };
  if (S.draftRef) doc.ref = S.draftRef;
  t.value = ''; S.draftRef = null; S.draftPic = null; renderRefChip();
  try {
    if (pic) {
      toast('照片傳送中…');
      const ref = await F.addDoc(S.col('pics'), { who: S.me, data: pic, at: F.serverTimestamp() });
      S.pics.set(ref.id, pic);
      doc.pic = ref.id;
    }
    await F.addDoc(S.col('msgs'), doc);
  } catch { toast('沒有送出，檢查網路再試一次'); }
}

// 照片先縮小再存（Firestore 一筆最多 1MB），長邊最多 max 像素
async function shrink(file, max, q, limit) {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((ok, bad) => { const i = new Image(); i.onload = () => ok(i); i.onerror = bad; i.src = url; });
    let out = '';
    for (let size = max, qq = q; size >= 480; size = Math.round(size * 0.8), qq = Math.max(0.5, qq - 0.08)) {
      const k = Math.min(1, size / Math.max(img.naturalWidth, img.naturalHeight));
      const c = document.createElement('canvas');
      c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      out = c.toDataURL('image/jpeg', qq);
      if (out.length <= limit) return out;
    }
    if (out.length <= limit) return out;
    throw new Error('too big');
  } finally { URL.revokeObjectURL(url); }
}
async function loadPics(root = document) {
  for (const img of $$('img[data-picimg]', root)) {
    const id = img.dataset.picimg;
    if (img.src) continue;
    let data = S.pics.get(id);
    if (!data && S.F) {
      try { const d = await S.F.getDoc(S.F.doc(S.col('pics'), id)); data = d.exists() ? d.data().data : ''; S.pics.set(id, data); } catch { data = ''; }
    }
    if (data) img.src = data; else img.alt = '照片已收回';
  }
}
function openPic(id) {
  const data = S.pics.get(id);
  if (!data) return;
  const sheet = openLayer(`${head('照片')}<div class="lb-track"><figure><img src="${data}" alt="聊天裡的照片"></figure></div>`, { full: true });
  sheet.classList.add('lb');
}
function renderMsgs() {
  const ol = $('#msgs');
  if (!ol) return;
  if (!S.msgs.length) { ol.innerHTML = `<li class="empty">${S.F ? '還沒有訊息，說聲嗨吧！' : '連線中…'}</li>`; return; }
  let lastDay = '';
  ol.innerHTML = S.msgs.map((m) => {
    const d = m.ms ? new Date(m.ms) : null, day = d ? `${d.getMonth() + 1}/${d.getDate()}（${WD[d.getDay()]}）` : '';
    const sep = day && day !== lastDay ? `<li class="daysep">${day}</li>` : '';
    lastDay = day || lastDay;
    const p = m.ref && S.place.get(m.ref), mine = m.who === S.me;
    return `${sep}<li class="msg${mine ? ' me' : ''}">${avatar(m.who, true)}<div class="bub">${mine ? '' : `<span class="nm">${esc(memberName(m.who))}</span>`}${m.text ? `<p>${esc(m.text)}</p>` : ''}
      ${m.pic ? `<button class="picb" type="button" data-pic="${esc(m.pic)}" aria-label="放大照片"><img data-picimg="${esc(m.pic)}" alt="照片"></button>` : ''}
      ${p ? `<button class="refc" type="button" data-open="${p.id}">${thumb(p)}<span>${esc(shortName(p))}</span></button>` : ''}
      <time>${d ? `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}` : '傳送中'}${m.edited ? '・已編輯' : ''}${mine ? `<button class="mact" type="button" data-editmsg="${m.id}">編輯</button><button class="mact" type="button" data-delmsg="${m.id}">收回</button>` : ''}</time></div></li>`;
  }).join('');
  const body = $('#chatBody');
  body.scrollTop = body.scrollHeight;
  loadPics(ol).then(() => { body.scrollTop = body.scrollHeight; });
  markRead();
}
function markRead() {
  const last = S.msgs.reduce((m, x) => Math.max(m, x.ms || 0), 0);
  if (last > S.lastRead) { S.lastRead = last; store.set('nv-read', last); }
  updateBadge();
}
function updateBadge() {
  const n = S.msgs.filter((m) => m.who !== S.me && (m.ms || 0) > S.lastRead).length;
  const b = $('#badge');
  if (!b) return;
  b.hidden = !n; b.textContent = n > 99 ? '99+' : n;
  document.title = n ? `(${n}) 北越行程` : '北越行程';
}

// ---------- translate ----------
// 鏡頭、拍照、說話翻譯用 Firebase AI Logic 的 Gemini；常用句是先翻好的，不用網路
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
// 要模型回傳每段越南文的位置（0–1000 的相對座標），才能把中文蓋在原本的字上
const PROMPT_BOX = '找出照片裡每一段越南文（一行或一個品項算一段），翻成繁體中文（台灣用語，越短越好，價格照抄）。'
  + '只輸出 JSON 陣列，每個元素：{"box_2d":[ymin,xmin,ymax,xmax],"vi":"原文","zh":"中文","beef":true或false}。'
  + 'box_2d 是框住那段越南文的位置，0 到 1000 的相對座標。beef 表示這道菜有牛肉（bò、bê）。沒有文字就輸出 []。';
const PROMPT_TO = { vi: '把下面的中文翻成自然、禮貌、口語的越南文（北越用語）。只輸出越南文，不要解釋。\n\n', zh: '把下面的越南文翻成自然口語的繁體中文（台灣用語）。只輸出中文，不要解釋。\n\n' };
// 實測 11/10：3.x flash 預設會「思考」要 10–20 秒，關掉思考約 2 秒；flash-lite 本來就快，但不接受思考設定。
// 看圖並回傳位置：通常 3–5 秒（字多的招牌約 10 秒），伺服器忙的時候會更久，所以邊收邊畫、慢了就同時問備用模型。
// 不用 JSON 模式：比較慢，還會把結果排成別的格式。3.1-flash-lite 看招牌會說沒有字，不能當備用。
// 免費額度（每個模型每天，越南時間下午 3 點重置）：3.5-flash-lite 500 次；3.6-flash、3.8-flash 只有 20 次，只當備用。
const M_TEXT = [{ model: 'gemini-3.5-flash-lite' }, { model: 'gemini-3.6-flash', think: 0 }, { model: 'gemini-3.8-flash', think: 0 }];
const QUOTA_MSG = '今天的免費翻譯次數用完了（越南時間下午 3 點重置）';
const M_IMG = [{ model: 'gemini-3.5-flash-lite' }, { model: 'gemini-3.6-flash', think: 0 }, { model: 'gemini-3.8-flash', think: 0 }];

async function loadAI() {
  if (!S.app) throw new Error('no app');
  const AI = await import(`https://www.gstatic.com/firebasejs/${FB_VER}/firebase-ai.js`);
  S.ai ||= AI.getAI(S.app, { backend: new AI.GoogleAIBackend() });
  return AI;
}
const genCfg = (think) => (think === 0 ? { temperature: 0.1, thinkingConfig: { thinkingBudget: 0 } } : { temperature: 0.1 });
// 呼叫 Gemini（串流）：伺服器有時要排隊 10 秒以上，所以前一個模型 hedge 毫秒還沒開始回，
// 就同時問下一個模型，誰先開始回就用誰；回到一半斷線就先用已經收到的。
async function geminiStream(models, parts, { onText, hedge = 4000, timeout = 25000 } = {}) {
  const AI = await loadAI();
  return new Promise((resolve, reject) => {
    let win = -1, next = 0, live = 0, done = false, got = '', err, quota = false;
    const end = (fn, v) => { if (done) return; done = true; clearInterval(th); clearTimeout(tt); fn(v); };
    const launch = () => {
      if (done || win >= 0 || next >= models.length) return;
      const i = next++; live++;
      const { model, think } = models[i];
      (async () => {
        let text = '';
        try {
          const r = await AI.getGenerativeModel(S.ai, { model, generationConfig: genCfg(think) }, { timeout }).generateContentStream(parts);
          r.response.catch(() => {});
          for await (const chunk of r.stream) {
            if (done || (win >= 0 && win !== i)) return;   // 另一個模型先回了
            win = i; text += chunk.text(); got = text; onText?.(text);
          }
          end(resolve, { text: text.trim() });
        } catch (e) {
          console.warn(model, e); err = e; live--;
          if (/429/.test(String(e?.message))) quota = true;
          if (win === i) return end(resolve, { text: text.trim(), partial: true });
          if (win < 0) { if (next < models.length) launch(); else if (!live) end(reject, Object.assign(err, { quota })); }
        }
      })();
    };
    const th = setInterval(launch, hedge);
    const tt = setTimeout(() => (got ? end(resolve, { text: got.trim(), partial: true }) : end(reject, Object.assign(err || new Error('timeout'), { quota }))), timeout + 8000);
    launch();
  });
}
// 從還沒收完的 JSON 裡，先撈出已經完整的那幾段
const boxItems = (text) => (text.match(/\{[^{}]*?"box_2d"\s*:\s*\[[^\]]*\][^{}]*?\}/g) || [])
  .map((s) => { try { return JSON.parse(s); } catch { return null; } })
  .filter((x) => x && Array.isArray(x.box_2d) && x.box_2d.length === 4 && x.zh);

function openTranslate(tab = store.get('nv-trtab', 'cam')) {
  const sheet = openLayer(`${head('翻譯')}<div class="sh-body tr">
    <div class="tabs" role="tablist">
      <button type="button" role="tab" data-trtab="cam">${I.cam}鏡頭翻譯</button>
      <button type="button" role="tab" data-trtab="talk">${I.mic}說話翻譯</button>
      <button type="button" role="tab" data-trtab="phr">${I.speak}常用句</button>
    </div>
    <section data-trpane="cam">
      <p>對準越南文（菜單、招牌、說明），會把中文直接蓋在原本的字上。有牛肉的菜用紅框標出。點中文可以放大。</p>
      <button class="btn solid big" type="button" id="liveOn">${I.cam}打開鏡頭翻譯</button>
      <div class="live" id="live" hidden>
        <video id="liveVid" playsinline muted autoplay></video>
        <div class="shot" id="shot" hidden><img id="shotImg" alt="要翻譯的畫面"><div class="ovl" id="ovl"></div></div>
        <span class="live-st" id="liveSt">對準文字…</span>
      </div>
      <div class="opt-row" id="liveCtl" hidden>
        <button class="btn solid" type="button" id="liveSnap">${I.cam}翻譯這個畫面</button>
        <button class="btn solid" type="button" id="liveAgain" hidden>${I.cam}再翻一張</button>
        <button class="btn" type="button" id="liveOff">關掉鏡頭</button>
      </div>
      <details class="tr-list" id="trList" hidden><summary>看文字清單（字比較大）</summary><div class="tr-out" id="trImgOut"></div></details>
      <div class="opt-row"><label class="btn">${I.cam}拍一張照片<input type="file" accept="image/*" capture="environment" data-trimg hidden></label>
        <label class="btn">${I.img}從相簿選<input type="file" accept="image/*" data-trimg hidden></label></div>
    </section>
    <section data-trpane="talk">
      <div class="opt-row" role="group" aria-label="翻譯方向">
        <button class="opt" type="button" data-trdir="vi" aria-pressed="true">我說中文 → 越南文</button>
        <button class="opt" type="button" data-trdir="zh" aria-pressed="false">對方說越南文 → 中文</button>
      </div>
      <textarea class="field" id="trIn" rows="3" placeholder="打字，或按麥克風說話…" aria-label="要翻譯的話"></textarea>
      <p class="muted" id="trMicHint" style="margin:0;font-size:.9rem" hidden>這個瀏覽器不能直接聽寫：點上面的框框，按鍵盤上的麥克風說話。</p>
      <div class="opt-row"><button class="btn" type="button" id="trMic">${I.mic}<span>按這裡說話</span></button>
        <button class="btn solid" type="button" id="trGo">翻譯</button></div>
      <div class="tr-res" id="trRes" hidden><p class="tr-big" id="trBig"></p>
        <div class="opt-row"><button class="btn" type="button" id="trSay">${I.speak}唸出來</button><button class="btn" type="button" id="trShow">${I.full}放大給對方看</button></div></div>
    </section>
    <section data-trpane="phr">
      <p>先翻好的句子，沒網路也能用。按「唸」播放越南語，或按句子放大給對方看。</p>
      ${PHRASES.map(([g, list]) => `<h3 class="tr-h">${g}</h3><ul class="phr">${list.map(([zh, vi]) => `<li><button class="phr-t" type="button" data-bigvi="${esc(vi)}" data-bigzh="${esc(zh)}"><b lang="vi">${esc(vi)}</b><span>${esc(zh)}</span></button><button class="btn small" type="button" data-say="${esc(vi)}" aria-label="唸出來：${esc(zh)}">${I.speak}唸</button></li>`).join('')}</ul>`).join('')}
    </section>
    <p class="muted tr-note">鏡頭、拍照、說話翻譯由 Google Gemini 提供，可能翻錯，重要的事請再確認。This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener">Terms of Service</a> apply.</p>
  </div>`, { full: true });
  const cam = makeCam(sheet);
  sheet.parentElement.cleanup = cam.stop;
  const showTab = (t) => {
    store.set('nv-trtab', t);
    $$('[data-trtab]', sheet).forEach((b) => b.setAttribute('aria-selected', String(b.dataset.trtab === t)));
    $$('[data-trpane]', sheet).forEach((p) => { p.hidden = p.dataset.trpane !== t; });
    if (t !== 'cam') cam.stop();
  };
  showTab(tab);
  let dir = 'vi', rec = null;
  if (!SR) { $('#trMic', sheet).hidden = true; $('#trMicHint', sheet).hidden = false; }
  const result = (text) => {
    $('#trRes', sheet).hidden = !text;
    $('#trBig', sheet).textContent = text;
    $('#trBig', sheet).lang = dir === 'vi' ? 'vi' : 'zh-Hant';
    $('#trSay', sheet).hidden = dir !== 'vi';
  };
  const go = async () => {
    const text = $('#trIn', sheet).value.trim();
    if (!text) return;
    const btn = $('#trGo', sheet);
    btn.disabled = true; btn.textContent = '翻譯中…';
    try { result((await geminiStream(M_TEXT, [PROMPT_TO[dir] + text], { hedge: 3000, timeout: 12000 })).text); }
    catch (e) { console.warn(e); result(''); toast(e?.quota ? QUOTA_MSG + '，先用「常用句」' : '翻譯失敗（可能沒網路），可以改用「常用句」'); }
    finally { btn.disabled = false; btn.textContent = '翻譯'; }
  };
  sheet.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.trtab) showTab(b.dataset.trtab);
    else if (b.id === 'liveOn') cam.start();
    else if (b.id === 'liveSnap') cam.snap();
    else if (b.id === 'liveAgain') cam.again();
    else if (b.id === 'liveOff') cam.stop();
    else if (b.dataset.ovi) cam.zoom(+b.dataset.ovi);
    else if (b.dataset.trdir) {
      dir = b.dataset.trdir;
      $$('[data-trdir]', sheet).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      $('#trIn', sheet).placeholder = dir === 'vi' ? '打中文，或按麥克風說中文…' : '請對方打越南文，或按麥克風說越南文…';
      result('');
    } else if (b.id === 'trGo') go();
    else if (b.id === 'trSay') say($('#trBig', sheet).textContent);
    else if (b.id === 'trShow') showBig(dir === 'vi' ? $('#trBig', sheet).textContent : '', dir === 'vi' ? $('#trIn', sheet).value : $('#trBig', sheet).textContent);
    else if (b.id === 'trMic') {
      if (rec) { rec.stop(); return; }
      rec = new SR();
      rec.lang = dir === 'vi' ? 'zh-TW' : 'vi-VN';
      rec.interimResults = true;
      const label = $('span', b);
      label.textContent = '在聽…按這裡停';
      rec.onresult = (ev) => { $('#trIn', sheet).value = [...ev.results].map((r) => r[0].transcript).join(''); };
      rec.onerror = () => toast('沒聽到，或沒有麥克風權限');
      rec.onend = () => { rec = null; label.textContent = '按這裡說話'; if ($('#trIn', sheet).value.trim()) go(); };
      rec.start();
    } else if (b.dataset.say) say(b.dataset.say);
    else if (b.dataset.bigvi) showBig(b.dataset.bigvi, b.dataset.bigzh);
  });
  sheet.addEventListener('change', async (e) => {
    const f = e.target.files?.[0];
    if (!e.target.matches('[data-trimg]') || !f) return;
    e.target.value = '';
    try { cam.photo(await shrink(f, 1024, 0.72, 900000)); }
    catch { toast('這張照片打不開，換一張試試'); }
  });
}

// 鏡頭翻譯：對準後拿穩約 1 秒（或 3 秒後不管有沒有拿穩）就自動拍下來翻；
// 翻好後畫面停在那一張、中文蓋在原本的字上，按「再翻一張」回到鏡頭。
function makeCam(sheet) {
  const $s = (q) => $(q, sheet);
  const vid = $s('#liveVid'), shot = $s('#shot'), img = $s('#shotImg'), ovl = $s('#ovl'), st = $s('#liveSt');
  const tiny = document.createElement('canvas'); tiny.width = 16; tiny.height = 12;
  const tctx = tiny.getContext('2d', { willReadFrequently: true });
  let stream = null, timer = 0, prev = null, still = 0, since = 0, mode = 'off', seq = 0, items = [];
  const show = (id, on) => { $s(id).hidden = !on; };
  const sig = () => {
    tctx.drawImage(vid, 0, 0, 16, 12);
    const d = tctx.getImageData(0, 0, 16, 12).data, g = new Float32Array(192);
    for (let i = 0; i < 192; i++) g[i] = d[i * 4] * 0.3 + d[i * 4 + 1] * 0.59 + d[i * 4 + 2] * 0.11;
    return g;
  };
  const diff = (a, b) => { if (!a || !b) return 255; let s = 0; for (let i = 0; i < a.length; i++) s += Math.abs(a[i] - b[i]); return s / a.length; };
  const tick = () => {
    if (mode !== 'live' || !vid.videoWidth) return;
    const s = sig();
    still = diff(s, prev) < 12 ? still + 1 : 0;
    prev = s;
    if (still >= 2 || Date.now() - since > 3000) snap();
  };
  const render = () => {
    if (!img.complete) { img.onload = render; return; }
    ovl.innerHTML = items.map((x, i) => {
      const [y0, x0, y1, x1] = x.box_2d.map(Number);
      const pad = 4; // 框稍微放大一點，把原本的字蓋乾淨
      return `<button type="button" class="ob${x.beef ? ' beef' : ''}" data-ovi="${i}" style="left:${(x0 - pad) / 10}%;top:${(y0 - pad) / 10}%;width:${(x1 - x0 + pad * 2) / 10}%;height:${(y1 - y0 + pad * 2) / 10}%"><span>${esc(x.zh)}</span></button>`;
    }).join('');
    for (const b of $$('.ob', ovl)) {   // 字的大小跟著框的高度，放不下就縮小
      const span = b.firstElementChild;
      let f = Math.max(11, Math.min(28, b.clientHeight * 0.75));
      span.style.fontSize = f + 'px';
      while ((span.scrollWidth > b.clientWidth + 1 || span.scrollHeight > b.clientHeight + 1) && f > 10) { f -= 1; span.style.fontSize = f + 'px'; }
    }
    const out = $s('#trImgOut');
    out.innerHTML = items.map((x) => `${esc(x.vi || '')} → ${esc(x.zh)}${x.beef ? ' <mark class="beef">牛肉</mark>' : ''}`).join('\n');
    show('#trList', items.length > 0);
  };
  const translate = async (dataUrl) => {
    const my = ++seq;
    items = []; ovl.innerHTML = ''; show('#trList', false);
    img.src = dataUrl;   // 不等 decode：有些瀏覽器在背景時 decode 會一直卡住
    show('#shot', true); vid.hidden = true;
    show('#liveSnap', false); show('#liveAgain', mode !== 'off');
    st.textContent = '翻譯中…';
    try {
      const { text, partial } = await geminiStream(M_IMG, [PROMPT_BOX, { inlineData: { data: dataUrl.split(',')[1], mimeType: 'image/jpeg' } }], {
        onText: (t) => {
          if (my !== seq) return;
          const got = boxItems(t);
          if (got.length !== items.length) { items = got; render(); st.textContent = `翻譯中…已經 ${items.length} 段`; }
        },
      });
      if (my !== seq) return;
      const all = boxItems(text);
      if (all.length >= items.length) items = all;
      render();
      st.textContent = !items.length ? '沒有看到文字，靠近一點再翻一張' : partial ? '可能沒翻完，可以再翻一張' : '點中文可以放大';
    } catch (e) {
      console.warn(e);
      if (my === seq) st.textContent = e?.quota ? QUOTA_MSG : '翻譯失敗（可能沒網路），再翻一張試試';
    }
  };
  const snap = () => {
    if (mode !== 'live' || !vid.videoWidth) return;
    mode = 'shot';
    const k = Math.min(1, 1024 / Math.max(vid.videoWidth, vid.videoHeight));
    const c = document.createElement('canvas'); c.width = Math.round(vid.videoWidth * k); c.height = Math.round(vid.videoHeight * k);
    c.getContext('2d').drawImage(vid, 0, 0, c.width, c.height);
    vid.pause();
    translate(c.toDataURL('image/jpeg', 0.72));
  };
  const again = () => {
    if (!stream) return;
    seq++; mode = 'live'; since = Date.now(); still = 0; prev = null;
    show('#shot', false); vid.hidden = false; vid.play();
    show('#liveSnap', true); show('#liveAgain', false); show('#trList', false);
    st.textContent = '對準文字，會自動翻譯…';
  };
  const stop = () => {
    clearInterval(timer); timer = 0; seq++; mode = 'off';
    stream?.getTracks().forEach((t) => t.stop()); stream = null;
    vid.srcObject = null;
    show('#live', false); show('#liveCtl', false); show('#liveOn', true);
  };
  return {
    stop, snap, again,
    async start() {
      if (stream) return;
      loadAI().catch(() => {});   // 開鏡頭時先把翻譯模組載好，第一張比較快
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 960 } }, audio: false });
      } catch (e) {
        console.warn(e);
        toast('打不開鏡頭：請允許使用相機；在 LINE 裡請改用 Safari 或 Chrome 開，或用「拍一張照片」');
        return;
      }
      vid.srcObject = stream;
      show('#live', true); show('#liveCtl', true); show('#liveOn', false);
      again();
      timer = setInterval(tick, 500);
    },
    photo(dataUrl) {   // 拍照或從相簿選：不開鏡頭，直接翻
      stop();
      show('#live', true); show('#liveCtl', false); show('#liveOn', true);
      translate(dataUrl);
    },
    zoom(i) { const x = items[i]; if (x) showPair(x.zh, x.vi); },
  };
}
function say(text) {
  if (!text || !('speechSynthesis' in window)) return toast('這支手機不能唸，請直接給對方看文字');
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'vi-VN';
  const v = speechSynthesis.getVoices().find((x) => /^vi/i.test(x.lang));
  if (v) u.voice = v; else toast('這支手機可能沒有越南語語音，請直接給對方看文字');
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}
function showPair(zh, vi) {
  openLayer(`${head('翻譯')}<div class="addrbig"><p class="vi-big">${esc(zh)}</p>${vi ? `<p class="zh" lang="vi" translate="no">${esc(vi)}</p>` : ''}</div>`, { full: true });
}
function showBig(vi, zh) {
  openLayer(`${head('給對方看')}<div class="addrbig">${vi ? `<p class="vi-big" lang="vi" translate="no">${esc(vi)}</p>` : ''}<p class="${vi ? 'zh' : 'vi-big'}">${esc(zh)}</p></div>`, { full: true });
}

// ---------- likes ----------
function toggleLike(id) {
  if (!ensureMe(() => toggleLike(id)) || !ensureDb()) return;
  const F = S.F, on = (S.likes[id] || []).includes(S.me);
  F.setDoc(F.doc(S.col('likes'), id), { [S.me]: on ? F.deleteField() : true }, { merge: true }).catch(() => toast('沒有存成功，再試一次'));
}
function updateLikesUI() {
  $$('[data-like]').forEach((b) => b.setAttribute('aria-pressed', String((S.likes[b.dataset.like] || []).includes(S.me))));
  $$('[data-avs]').forEach((el) => { el.innerHTML = wanters(el.dataset.avs).map((m) => avatar(m, true)).join(''); });
  $$('[data-wn]').forEach((el) => { const n = wanters(el.dataset.wn).length; el.textContent = n ? n + ' 人想去' : ''; });
  $$('.recbtn small').forEach((el) => {
    const k = el.closest('[data-recs]').dataset.recs;
    const list = k.startsWith('x-') ? null : recsFor(k);
    if (list) el.textContent = recSummary(list);
  });
  stack.forEach((l) => updateWanters(l));
  renderFeed();
}
function updateWanters(root) {
  const el = $('[data-wanters]', root);
  if (!el) return;
  const w = wanters(el.dataset.wanters);
  el.innerHTML = w.length ? `想去的人：<span class="avs">${w.map((m) => avatar(m)).join('')}</span>${w.map(memberName).join('、')}` : '還沒有人按想去。';
}

// ---------- Firebase ----------
async function startFirebase() {
  try {
    const base = `https://www.gstatic.com/firebasejs/${FB_VER}/`;
    const [{ initializeApp }, F] = await Promise.all([import(base + 'firebase-app.js'), import(base + 'firebase-firestore.js')]);
    const app = initializeApp(FB);
    S.app = app;
    if (location.hostname === 'youngjchen.github.io') {
      // 翻譯用的 Gemini 有開 App Check，要先拿到 reCAPTCHA 憑證
      const AC = await import(base + 'firebase-app-check.js');
      AC.initializeAppCheck(app, { provider: new AC.ReCaptchaEnterpriseProvider(RECAPTCHA_KEY), isTokenAutoRefreshEnabled: true });
    }
    let db;
    try { db = F.initializeFirestore(app, { localCache: F.persistentLocalCache({ tabManager: F.persistentMultipleTabManager() }) }); }
    catch { db = F.getFirestore(app); }
    const tid = hex(await sha256('nv-db|' + S.key)).slice(0, 32);
    S.col = (n) => F.collection(db, 'trips', tid, n);
    S.F = F;
    const sync = (snap) => { S.synced = !snap.metadata.fromCache; const el = $('#chatSync'); if (el) { el.className = 'syncdot' + (S.synced ? ' ok' : ''); el.textContent = S.synced ? '已連線' : '離線中'; } };
    const fail = (err) => { console.warn(err); S.synced = false; renderFeed(); };
    F.onSnapshot(F.query(S.col('msgs'), F.orderBy('at', 'desc'), F.limit(300)), { includeMetadataChanges: true }, (snap) => {
      sync(snap);
      S.msgs = snap.docs.map((d) => { const x = d.data({ serverTimestamps: 'estimate' }); return { id: d.id, ...x, ms: x.at?.toMillis?.() || 0 }; }).reverse();
      if (S.chatOpen) renderMsgs();
      updateBadge(); renderFeed();
    }, fail);
    F.onSnapshot(S.col('likes'), (snap) => {
      S.likes = {};
      snap.docs.forEach((d) => { S.likes[d.id] = Object.keys(d.data()); });
      updateLikesUI();
    }, fail);
    F.onSnapshot(S.col('plans'), (snap) => {
      S.plans = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      const y = scrollY;
      renderDay();
      scrollTo(0, y);
    }, fail);
    renderFeed();
  } catch (e) {
    console.warn(e);
    renderFeed();
  }
}

// ---------- misc ----------
let toastT;
function toast(msg) {
  $('.toast')?.remove();
  const t = document.createElement('div');
  t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg;
  document.body.append(t);
  clearTimeout(toastT); toastT = setTimeout(() => t.remove(), 2400);
}

async function copy(text, btn) {
  const orig = btn.innerHTML;
  try { await navigator.clipboard.writeText(text); btn.textContent = '已複製'; }
  catch {
    const num = btn.closest('.contact')?.querySelector('.num');
    if (num) { const r = document.createRange(); r.selectNodeContents(num); getSelection().removeAllRanges(); getSelection().addRange(r); }
    btn.textContent = '已選取，長按複製';
  }
  setTimeout(() => { btn.innerHTML = orig; }, 2000);
}

async function share() {
  const url = `${location.origin}${location.pathname}#k=${S.key}`;
  try {
    if (navigator.share) await navigator.share({ title: '北越行程', text: '我們的北越行程網頁（家人專用）', url });
    else { await navigator.clipboard.writeText(url); toast('連結已複製，貼到家族群組'); }
  } catch { /* 使用者取消 */ }
}

document.addEventListener('click', (e) => {
  const t = e.target.closest('button, [data-view]');
  if (!t) return;
  const d = t.dataset;
  if (t.closest('#pop') && (d.open || d.addplace || d.chatref)) closePop();
  if ('ev' in d) {
    const li = t.closest('.ev'), open = !li.classList.contains('open');
    li.classList.toggle('open', open);
    t.setAttribute('aria-expanded', String(open));
  }
  else if (d.pop) { if (!openPop(placePop(d.pop), t)) openPlace(d.pop); }
  else if (d.say) say(d.say);
  else if (d.grab) openGrab(d.grab);
  else if (d.bigv) showBig(d.bigv, d.bigz);
  else if (d.phg) {
    const g = +d.phg;
    store.set('nv-phg', g);
    $$('[data-phg]').forEach((b) => b.setAttribute('aria-selected', String(b === t)));
    $('#phr2').innerHTML = phraseItems(g);
  }
  else if (d.tip) {
    const txt = d.tip === 'tz' ? '行程上的時間都是越南時間，比台灣慢 1 小時。' : S.data.segTips[d.tip];
    if (d.tip !== 'tz' && !tipSeen.has(d.tip)) { tipSeen.add(d.tip); store.set('nv-tipseen', [...tipSeen]); t.classList.toggle('hot', tipHot(d.tip)); }
    if (txt && !openPop(`<p class="pop-tip">${rich(esc(txt))}</p>`, t)) toast(txt);
  }
  else if (d.view && t.closest('.tabbar, .quick')) showView(d.view);
  else if (d.day) selectDay(d.day);
  else if (d.recs) {
    const open = t.getAttribute('aria-expanded') !== 'true';
    t.setAttribute('aria-expanded', String(open));
    $('#r-' + d.recs).hidden = !open;
    if (open) { S.openRecs.add(d.recs); fillRecs(d.recs); } else S.openRecs.delete(d.recs);
  }
  else if (d.open) openPlace(d.open);
  else if (d.like) toggleLike(d.like);
  else if (d.add) openAdd(d.add);
  else if (d.addplace) openAdd(null, d.addplace);
  else if (d.addr) openAddr(d.addr);
  else if (d.voucher) openVoucher(d.voucher);
  else if (d.wa) openWa(d.wa, d.wan);
  else if (d.copy) copy(d.copy, t);
  else if ('close' in d) requestClose();
  else if (d.delplan) {
    const p = S.plans.find((x) => x.id === d.delplan);
    if (p && confirm(`要刪掉「${p.title}」嗎？全家都會看不到。`)) S.F.deleteDoc(S.F.doc(S.col('plans'), p.id)).catch(() => toast('沒有刪成功，再試一次'));
  }
  else if (d.editmsg) {
    const m = S.msgs.find((x) => x.id === d.editmsg), box = $('#msgText');
    if (!m || !box) return;
    S.editing = m.id; S.draftRef = null; S.draftPic = null;
    box.value = m.text || ''; renderRefChip();
    box.focus(); box.setSelectionRange(box.value.length, box.value.length);
  }
  else if (d.delmsg) {
    if (!confirm('要收回這則訊息嗎？')) return;
    const m = S.msgs.find((x) => x.id === d.delmsg);
    S.F.deleteDoc(S.F.doc(S.col('msgs'), d.delmsg)).catch(() => toast('沒有收回成功'));
    if (m?.pic) S.F.deleteDoc(S.F.doc(S.col('pics'), m.pic)).catch(() => {});
  }
  else if (d.pic) openPic(d.pic);
  else if (d.lb) openLightbox(d.lb, +d.i);
  else if ('tr' in d) openTranslate();
  else if ('chat' in d) openChat();
  else if (d.chatref) openChat(d.chatref);
  else if ('share' in d) share();
  else if (d.godate) { S.day = d.godate; showView('days'); renderDay(); }
  else if (t.id === 'meBtn') openMe();
  else if (t.id === 'setBtn') openSettings();
});
document.addEventListener('change', (e) => {
  const id = e.target.dataset?.pack;
  if (!id) return;
  const packed = store.get('nv-pack-v1', {});
  packed[id] = e.target.checked;
  store.set('nv-pack-v1', packed);
  const n = $('#packN');
  if (n) n.textContent = packCount(packed);
});

// 聊天按鈕往下滑就縮成小圓圈，回到最上面再展開
const fitFab = () => $('#chatFab')?.classList.toggle('mini', scrollY > 60);
addEventListener('scroll', fitFab, { passive: true });

boot();
