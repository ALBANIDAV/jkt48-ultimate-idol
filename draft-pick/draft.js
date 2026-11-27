/* =============================================
   JKT48 DRAFT PICK - Roulette Pick & Ban
   v2.0 - Balanced 3-Column Stage & Keyboard Focus Management
   ============================================= */

// ── Config ─────────────────────────────────
const DRAFT_CATEGORIES = [
  { id: 'captain', title: 'Captain', icon: 'crown' },
  { id: 'center', title: 'Center', icon: 'star' },
  { id: 'variety', title: 'Variety', icon: 'laugh' },
  { id: 'allrounder', title: 'All Rounder', icon: 'gem' },
  { id: 'dance', title: 'Dance', icon: 'music-4' },
  { id: 'stage', title: 'Stage Perform', icon: 'flame' },
  { id: 'fanservice', title: 'Fan Service', icon: 'heart' },
  { id: 'visual', title: 'Visual', icon: 'eye' },
  { id: 'vocal', title: 'Vocal', icon: 'mic-2' },
];
const DEFAULT_BAN_LIMIT = 3;
const MIN_POOL = DRAFT_CATEGORIES.length * 2; // 18 member minimal (9 kategori x 2 player)
const STORAGE_KEY = 'jkt48_draft_state_v1';
const SPIN_MS = 10000;
const WHEEL_COLORS = [
  '#e63946', '#f77f00', '#f4a300', '#2a9d8f', '#22c55e', '#118ab2', '#3a86ff', '#8338ec',
  '#d00000', '#ff006e', '#fb5607', '#457b9d', '#06a77d', '#c1121f', '#7209b7', '#e5383b',
];

const DRAFT_MEMBERS = (typeof JKT48_MEMBERS !== 'undefined' && Array.isArray(JKT48_MEMBERS))
  ? JKT48_MEMBERS.map(m => ({ ...m, img: memberPhotoPath(m.name, m.team) }))
  : [];
const memberById = new Map(DRAFT_MEMBERS.map(m => [m.id, m]));

// ── State ──────────────────────────────────
let state = null;
let isSpinning = false;
let resultMode = 'choose'; // 'choose' | 'place'
let showDraftPreview = false;
let activeModalId = null;
let lastFocusedEl = null;

function emptyPicks() {
  const picks = {};
  DRAFT_CATEGORIES.forEach(c => { picks[c.id] = null; });
  return picks;
}

function calcBanLimit(teams, poolSize) {
  if (teams.length === 1 && teams[0] === 'Trainee') return 0;
  return Math.min(DEFAULT_BAN_LIMIT, Math.max(0, Math.floor((poolSize - MIN_POOL) / 2)));
}

function newDraftState(names, teams, firstTurn) {
  const pool = DRAFT_MEMBERS.filter(m => teams.includes(m.team)).map(m => m.id);
  return {
    phase: 'drafting',
    teams,
    banLimit: calcBanLimit(teams, pool.length),
    firstTurn,
    players: names.map(name => ({ name, picks: emptyPicks(), bans: [] })),
    turn: firstTurn,
    wheelOrder: shuffle(pool),
    pending: null,
    rotation: 0,
    log: [],
    winners: {},
  };
}

function saveState() {
  try {
    if (state) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    else localStorage.removeItem(STORAGE_KEY);
  } catch (e) { /* storage penuh atau diblokir, game tetap berjalan */ }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (!s || !Array.isArray(s.players) || s.players.length !== 2 || !Array.isArray(s.wheelOrder)) return null;
    if (s.pending && !memberById.has(s.pending)) s.pending = null;
    return s;
  } catch (e) {
    return null;
  }
}

// ── Helpers ────────────────────────────────
function $(id) { return document.getElementById(id); }

function randInt(max) {
  if (window.crypto && crypto.getRandomValues) {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return buf[0] % max;
  }
  return Math.floor(Math.random() * max);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function playerName(p) { return state.players[p].name; }
function pClass(p) { return p === 0 ? 'p1' : 'p2'; }
function currentBanLimit() { return state && typeof state.banLimit === 'number' ? state.banLimit : DEFAULT_BAN_LIMIT; }
function bansLeft(p) { return Math.max(0, currentBanLimit() - state.players[p].bans.length); }
function emptyCats(p) { return DRAFT_CATEGORIES.filter(c => !state.players[p].picks[c.id]); }
function isFull(p) { return emptyCats(p).length === 0; }
function pickCount(p) { return DRAFT_CATEGORIES.length - emptyCats(p).length; }

function usedIds() {
  const used = new Set();
  state.players.forEach(pl => {
    Object.values(pl.picks).forEach(id => { if (id) used.add(id); });
    pl.bans.forEach(id => used.add(id));
  });
  return used;
}

function remainingIds() {
  const used = usedIds();
  return state.wheelOrder.filter(id => !used.has(id) && memberById.has(id));
}

function photoImg(m, cls, w = 40, h = 40) {
  return `<img class="${cls}" src="${escHtml(m.img)}" alt="${escHtml(m.nickname)}" width="${w}" height="${h}" loading="lazy" onerror="this.classList.add('img-failed')">`;
}

function teamShort(team) { return team.replace('Team ', ''); }

function iconHtml(name, size = 16) {
  return `<i data-lucide="${name}" style="width:${size}px;height:${size}px" aria-hidden="true"></i>`;
}

function refreshIcons() {
  if (window.lucide) lucide.createIcons();
}

// ── Setup Phase ────────────────────────────
function selectedTeams() {
  return [...document.querySelectorAll('#teamPoolGroup input:checked')].map(i => i.value);
}

function updatePoolCount() {
  const teams = selectedTeams();
  const n = DRAFT_MEMBERS.filter(m => teams.includes(m.team)).length;
  const limit = calcBanLimit(teams, n);
  const el = $('poolCount');
  let note = '';
  if (n < MIN_POOL) note = ` (min. ${MIN_POOL})`;
  else if (limit === 0) note = ' · tanpa ban';
  else if (limit < DEFAULT_BAN_LIMIT) note = ` · ban ${limit}x`;
  el.textContent = `· ${n} member${note}`;
  el.classList.toggle('is-low', n < MIN_POOL);
  el.classList.toggle('is-noban', n >= MIN_POOL && limit === 0);
}

function fillSetupForm() {
  const prev = loadState();
  const names = prev ? prev.players.map(p => p.name) : ['', ''];
  $('inputP1').value = names[0] && names[0] !== 'Player 1' ? names[0] : '';
  $('inputP2').value = names[1] && names[1] !== 'Player 2' ? names[1] : '';
  const presetPool = new URLSearchParams(window.location.search).get('pool');
  if (presetPool === 'trainee') {
    document.querySelectorAll('#teamPoolGroup input[type="checkbox"]').forEach(cb => {
      cb.checked = cb.value === 'Trainee';
    });
  }
  updatePoolCount();
}

function startDraft() {
  const n1 = $('inputP1').value.trim() || 'Player 1';
  const n2 = $('inputP2').value.trim() || 'Player 2';
  if (n1.toLowerCase() === n2.toLowerCase()) {
    showToast('Nama Player 1 dan Player 2 tidak boleh sama.');
    return;
  }
  const teams = selectedTeams();
  const poolSize = DRAFT_MEMBERS.filter(m => teams.includes(m.team)).length;
  if (poolSize < MIN_POOL) {
    showToast(`Minimal ${MIN_POOL} member di roulette. Tambah tim lagi.`);
    return;
  }
  const ft = document.querySelector('input[name="firstTurn"]:checked')?.value || '0';
  const firstTurn = ft === 'random' ? randInt(2) : parseInt(ft, 10);

  state = newDraftState([n1, n2], teams, firstTurn);
  saveState();
  render();
  showToast(`${playerName(firstTurn)} jalan duluan. Putar roulette-nya.`);
}

function playAgain() {
  if (!state) return;
  const names = state.players.map(p => p.name);
  const firstTurn = 1 - state.firstTurn;
  state = newDraftState(names, state.teams, firstTurn);
  saveState();
  render();
  showToast(`Ronde baru. ${playerName(firstTurn)} jalan duluan.`);
}

function resetToSetup() {
  closeModal('modalConfirmReset');
  closeModal('modalResult');
  const names = state ? state.players.map(p => p.name) : null;
  state = null;
  saveState();
  render();
  if (names) {
    $('inputP1').value = names[0];
    $('inputP2').value = names[1];
  }
}

// ── Render ─────────────────────────────────
function render() {
  if (!DRAFT_MEMBERS.length) {
    $('dataErrorSection').hidden = false;
    $('setupSection').hidden = true;
    $('gameSection').hidden = true;
    refreshIcons();
    return;
  }
  $('dataErrorSection').hidden = true;
  const inGame = !!state;
  $('setupSection').hidden = inGame;
  $('gameSection').hidden = !inGame;
  if (!inGame) {
    updatePoolCount();
    updatePendingBar();
    refreshIcons();
    return;
  }
  renderTurnBanner();
  renderBoard();
  renderBans();
  renderLog();
  renderDonePanel();
  drawWheel();
  applyWheelRotation(false);
  updateSpinControls();
  updatePendingBar();
  refreshIcons();
}

function renderTurnBanner() {
  const el = $('turnBanner');
  if (state.phase === 'done') {
    el.className = 'turn-banner is-done';
    el.innerHTML = `${iconHtml('trophy', 20)} <span>Draft selesai. Saatnya menilai line-up.</span>`;
    return;
  }
  const p = state.turn;
  const limit = currentBanLimit();
  const left = bansLeft(p);
  const banChip = limit > 0
    ? `<span class="turn-chip ${left === 0 ? 'is-empty' : ''}" title="Sisa jatah ban">${iconHtml('ban', 14)} <span class="ban-dots" aria-label="Sisa ban ${left} dari ${limit}">${Array.from({ length: limit }, (_, i) => `<span class="ban-dot ${i < left ? 'is-left' : ''}"></span>`).join('')}</span></span>`
    : `<span class="turn-chip is-muted" title="Mode tanpa ban">${iconHtml('ban', 14)} Tanpa Ban</span>`;
  el.className = `turn-banner ${pClass(p)}`;
  el.innerHTML = `
    <div class="turn-main">
      <span class="turn-label">Giliran</span>
      <span class="turn-name">${escHtml(playerName(p))}</span>
    </div>
    <div class="turn-meta">
      <span class="turn-chip" title="Kategori terisi">${iconHtml('layout-list', 14)} ${pickCount(p)}/${DRAFT_CATEGORIES.length}</span>
      ${banChip}
    </div>`;
}

function renderBoard() {
  const done = state.phase === 'done';
  const wins = [0, 0];
  Object.values(state.winners || {}).forEach(w => { if (w === 0 || w === 1) wins[w]++; });

  const headCell = p => {
    const active = !done && state.turn === p;
    const waiting = !done && state.turn !== p;
    return `<th class="dt-player ${pClass(p)} ${active ? 'is-turn' : ''} ${waiting ? 'is-waiting' : ''}">
      <span class="dt-player-name">${escHtml(playerName(p))}</span>
      ${done ? `<span class="dt-player-score">${wins[p]} menang</span>` : ''}
    </th>`;
  };

  const cell = (p, cat) => {
    const id = state.players[p].picks[cat.id];
    const m = id ? memberById.get(id) : null;
    const isWinner = done && state.winners[cat.id] === p;
    const clickable = done && m;
    if (!m) {
      return `<td class="dt-cell ${pClass(p)} is-empty"><span class="dt-empty">-</span></td>`;
    }
    const inner = `
      <span class="dt-avatar-wrap">${photoImg(m, 'dt-avatar', 34, 34)}</span>
      <span class="dt-member-text">
        <span class="dt-nick">${escHtml(m.nickname)}</span>
        <span class="dt-team team-${teamShort(m.team).toLowerCase()}">${escHtml(teamShort(m.team))}</span>
      </span>
      ${isWinner ? `<span class="dt-win-badge" aria-label="Pemenang">${iconHtml('trophy', 12)}</span>` : ''}`;

    if (clickable) {
      return `<td class="dt-cell ${pClass(p)} ${isWinner ? 'is-winner' : ''} is-clickable">
        <button type="button" class="dt-member dt-member-btn" onclick="toggleWinner('${cat.id}', ${p})" aria-pressed="${isWinner}" title="Tandai ${escHtml(m.nickname)} sebagai pemenang ${escHtml(cat.title)}">
          ${inner}
        </button>
      </td>`;
    }
    return `<td class="dt-cell ${pClass(p)}" title="${escHtml(m.name)}">
      <div class="dt-member">${inner}</div>
    </td>`;
  };

  $('draftTable').innerHTML = `
    <thead>
      <tr><th class="dt-cat-head">Kategori</th>${headCell(0)}${headCell(1)}</tr>
    </thead>
    <tbody>
      ${DRAFT_CATEGORIES.map(cat => `
        <tr>
          <td class="dt-cat">${iconHtml(cat.icon, 15)}<span>${cat.title}</span></td>
          ${cell(0, cat)}${cell(1, cat)}
        </tr>`).join('')}
    </tbody>`;

  const total = DRAFT_CATEGORIES.length * 2;
  $('boardProgress').textContent = `${pickCount(0) + pickCount(1)}/${total} terisi`;
}

function renderBans() {
  const board = $('banBoard');
  const limit = currentBanLimit();
  if (limit === 0) {
    board.hidden = true;
    board.innerHTML = '';
    return;
  }
  board.hidden = false;
  const col = p => {
    const bans = state.players[p].bans;
    const slots = Array.from({ length: limit }, (_, i) => {
      const m = bans[i] ? memberById.get(bans[i]) : null;
      return m
        ? `<div class="ban-slot is-filled" title="${escHtml(m.name)}">${photoImg(m, 'ban-avatar', 22, 22)}<span>${escHtml(m.nickname)}</span></div>`
        : `<div class="ban-slot" aria-label="Slot ban kosong"><span class="ban-slot-empty">${iconHtml('ban', 13)}</span></div>`;
    }).join('');
    return `<div class="ban-col ${pClass(p)}">
      <div class="ban-col-head">${escHtml(playerName(p))}</div>
      <div class="ban-slots" style="--ban-cols: ${limit}">${slots}</div>
    </div>`;
  };
  board.innerHTML = `
    <div class="ban-title">${iconHtml('ban', 15)} BAN</div>
    <div class="ban-cols">${col(0)}${col(1)}</div>`;
}

function renderLog() {
  const list = $('logList');
  const countEl = $('logCount');
  if (countEl) countEl.textContent = `${state.log.length} aksi`;

  if (!state.log.length) {
    list.innerHTML = `
      <li class="log-empty">
        ${iconHtml('disc-3', 22)}
        <span>Belum ada giliran tercatat. Putar roulette untuk memulai pick atau ban pertama.</span>
      </li>`;
    return;
  }
  list.innerHTML = state.log.map((e, i) => {
    const m = memberById.get(e.mid);
    const cat = DRAFT_CATEGORIES.find(c => c.id === e.cat);
    const tag = e.type === 'ban'
      ? `<span class="log-tag tag-ban">BAN</span>`
      : `<span class="log-tag tag-pick">PICK</span>`;
    const detail = e.type === 'ban'
      ? `Membuang <strong>${escHtml(m?.nickname)}</strong>`
      : `<strong>${escHtml(m?.nickname)}</strong> ke ${escHtml(cat?.title)}`;
    return `<li class="log-item ${pClass(e.p)}">
      <div class="log-item-head">
        <span class="log-item-who">
          <span class="log-num">#${i + 1}</span>
          <span class="log-player">${escHtml(playerName(e.p))}</span>
        </span>
        ${tag}
      </div>
      <div class="log-action">${detail}</div>
    </li>`;
  }).reverse().join('');
}

function renderDonePanel() {
  const done = state.phase === 'done';
  $('donePanel').hidden = !done;
  $('wheelWrap').classList.toggle('is-done', done);
  document.querySelector('.wheel-footer').hidden = done;
  if (!done) return;

  const wins = [0, 0];
  Object.values(state.winners || {}).forEach(w => { if (w === 0 || w === 1) wins[w]++; });
  const judged = wins[0] + wins[1];
  let verdict = `${judged}/${DRAFT_CATEGORIES.length} kategori sudah dinilai`;
  if (judged === DRAFT_CATEGORIES.length) {
    verdict = wins[0] === wins[1] ? 'Hasilnya seri.' : `${escHtml(playerName(wins[0] > wins[1] ? 0 : 1))} menang.`;
  }
  $('scoreboard').innerHTML = `
    <div class="score-side p1"><span class="score-name">${escHtml(playerName(0))}</span><span class="score-num">${wins[0]}</span></div>
    <div class="score-vs">VS</div>
    <div class="score-side p2"><span class="score-num">${wins[1]}</span><span class="score-name">${escHtml(playerName(1))}</span></div>
    <div class="score-verdict">${verdict}</div>`;
}

function updateSpinControls() {
  const btn = $('btnSpin');
  const hub = $('wheelHub');
  const shuffleBtn = $('btnShuffle');
  const remaining = remainingIds().length;
  const disabled = isSpinning || state.phase !== 'drafting';
  btn.disabled = disabled;
  hub.disabled = disabled;
  if (shuffleBtn) shuffleBtn.disabled = disabled || !!state.pending || remaining <= 1;
  $('wheelWrap').classList.toggle('is-spinning', isSpinning);
  const label = btn.querySelector('span');
  if (label) {
    if (isSpinning) label.textContent = 'Memutar...';
    else if (state.pending) label.textContent = 'Lihat Hasil';
    else label.textContent = `Putar Roulette (${playerName(state.turn)})`;
  }
  $('wheelRemaining').textContent = `${remaining} member tersisa di roulette`;
}

function shuffleWheel() {
  if (!state || state.phase !== 'drafting' || isSpinning || state.pending) return;
  if (remainingIds().length <= 1) return;
  state.wheelOrder = shuffle(state.wheelOrder);
  state.rotation = 0;
  saveState();
  applyWheelRotation(false);
  drawWheel();
  const wrap = $('wheelWrap');
  wrap.classList.remove('is-shuffling');
  void wrap.offsetWidth;
  wrap.classList.add('is-shuffling');
  showToast('Urutan nama di roulette berhasil diacak.');
}

// ── Wheel ──────────────────────────────────
function fitText(ctx, text, maxW) {
  if (ctx.measureText(text).width <= maxW) return text;
  let t = text;
  while (t.length > 1 && ctx.measureText(t + '...').width > maxW) t = t.slice(0, -1);
  return t.trim() + '...';
}

function drawWheel() {
  const canvas = $('wheelCanvas');
  const ids = remainingIds();
  const size = 640;
  const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, size, size);

  const c = size / 2;
  const r = c - 6;

  if (!ids.length) {
    ctx.beginPath();
    ctx.arc(c, c, r, 0, Math.PI * 2);
    ctx.fillStyle = '#23233a';
    ctx.fill();
    return;
  }

  const n = ids.length;
  const seg = (Math.PI * 2) / n;
  const fontSize = Math.max(9, Math.min(18, r * seg * 0.5));
  ctx.font = `700 ${fontSize}px Outfit, 'Segoe UI', sans-serif`;

  ids.forEach((id, i) => {
    const start = -Math.PI / 2 + i * seg;
    let color = WHEEL_COLORS[i % WHEEL_COLORS.length];
    if (i === n - 1 && n > 1 && color === WHEEL_COLORS[0]) color = WHEEL_COLORS[(i + 1) % WHEEL_COLORS.length];

    ctx.beginPath();
    ctx.moveTo(c, c);
    ctx.arc(c, c, r, start, start + seg);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    if (n > 1) {
      ctx.strokeStyle = 'rgba(0,0,0,0.22)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    ctx.save();
    ctx.translate(c, c);
    ctx.rotate(start + seg / 2);
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 3;
    const label = fitText(ctx, memberById.get(id).name, r * 0.72);
    ctx.fillText(label, r - 14, 0);
    ctx.restore();
  });

  ctx.beginPath();
  ctx.arc(c, c, r, 0, Math.PI * 2);
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#1c1c30';
  ctx.stroke();
}

function applyWheelRotation(animate) {
  const canvas = $('wheelCanvas');
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  canvas.style.transition = animate
    ? `transform ${reduce ? 400 : SPIN_MS}ms cubic-bezier(0.12, 0.65, 0.1, 1)`
    : 'none';
  canvas.style.transform = `rotate(${state.rotation || 0}deg)`;
}

function spinWheel() {
  if (!state || state.phase !== 'drafting' || isSpinning) return;
  if (state.pending) { openResult(); return; }

  const ids = remainingIds();
  if (!ids.length) {
    showToast('Member di roulette sudah habis.');
    return;
  }

  // Tentukan hasil lebih dulu, lalu hitung sudut agar jarum berhenti tepat di segmen tsb.
  const idx = randInt(ids.length);
  const segDeg = 360 / ids.length;
  const landAngle = idx * segDeg + segDeg * (0.2 + Math.random() * 0.6);
  const target = (360 - landAngle) % 360;
  const current = (((state.rotation || 0) % 360) + 360) % 360;
  const delta = (target - current + 360) % 360;
  state.rotation = (state.rotation || 0) + 360 * (10 + randInt(3)) + delta;
  state.pending = ids[idx];
  showDraftPreview = false;
  saveState();

  isSpinning = true;
  updateSpinControls();
  applyWheelRotation(true);

  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  setTimeout(() => {
    isSpinning = false;
    updateSpinControls();
    openResult();
  }, (reduce ? 400 : SPIN_MS) + 150);
}

// ── Result Modal (Pick / Ban) ──────────────
function openResult() {
  if (!state || !state.pending) return;
  resultMode = bansLeft(state.turn) > 0 ? 'choose' : 'place';
  renderResult();
  openModal('modalResult');
  updatePendingBar();
}

function minimizeResult() {
  closeModal('modalResult');
  updatePendingBar();
}

function peekFullBoard() {
  minimizeResult();
  const board = $('draftCapture');
  if (board) board.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function toggleDraftPreview() {
  showDraftPreview = !showDraftPreview;
  renderResult();
}

function updatePendingBar() {
  const bar = $('pendingBar');
  if (!bar) return;
  const modalOpen = $('modalResult')?.classList.contains('open');
  const show = !!(state && state.phase === 'drafting' && state.pending && !isSpinning && !modalOpen);
  bar.hidden = !show;
  if (!show) return;
  const p = state.turn;
  const m = memberById.get(state.pending);
  if (!m) { bar.hidden = true; return; }
  bar.className = `pending-bar ${pClass(p)}`;
  bar.innerHTML = `
    <div class="pending-info">
      <span class="pending-avatar-wrap">${photoImg(m, 'pending-avatar', 40, 40)}</span>
      <div class="pending-text">
        <span class="pending-name">${escHtml(m.name)}</span>
        <span class="pending-sub">Menunggu keputusan ${escHtml(playerName(p))}</span>
      </div>
    </div>
    <button type="button" class="btn-pending-open" onclick="openResult()">${iconHtml('arrow-up-right', 16)} ${currentBanLimit() > 0 && bansLeft(p) > 0 ? 'PICK / BAN' : 'Pilih Kategori'}</button>`;
  refreshIcons();
}

function renderMiniDraftComparison(p) {
  const opp = 1 - p;
  const myPicks = state.players[p].picks;
  const oppPicks = state.players[opp].picks;
  const limit = currentBanLimit();

  const rows = DRAFT_CATEGORIES.map(cat => {
    const mine = myPicks[cat.id] ? memberById.get(myPicks[cat.id]) : null;
    const theirs = oppPicks[cat.id] ? memberById.get(oppPicks[cat.id]) : null;
    return `<tr>
      <td class="md-cat">${cat.title}</td>
      <td class="md-cell ${pClass(p)} ${mine ? '' : 'is-empty'}">${mine ? escHtml(mine.nickname) : '-'}</td>
      <td class="md-cell ${pClass(opp)} ${theirs ? '' : 'is-empty'}">${theirs ? escHtml(theirs.nickname) : '-'}</td>
    </tr>`;
  }).join('');

  const banRow = limit > 0 ? `
    <div class="md-bans">
      <div><strong class="${pClass(p)}-text">Ban Kita:</strong> ${state.players[p].bans.length ? state.players[p].bans.map(id => escHtml(memberById.get(id)?.nickname)).join(', ') : '-'}</div>
      <div><strong class="${pClass(opp)}-text">Ban Lawan:</strong> ${state.players[opp].bans.length ? state.players[opp].bans.map(id => escHtml(memberById.get(id)?.nickname)).join(', ') : '-'}</div>
    </div>` : '';

  return `
    <div class="mini-draft-wrap">
      <table class="mini-draft-table">
        <thead>
          <tr>
            <th>Kategori</th>
            <th class="${pClass(p)}">Kita (${escHtml(playerName(p))})</th>
            <th class="${pClass(opp)}">Lawan (${escHtml(playerName(opp))})</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      ${banRow}
    </div>`;
}

function renderResult() {
  const p = state.turn;
  const opp = 1 - p;
  const m = memberById.get(state.pending);
  if (!m) return;
  const limit = currentBanLimit();
  const left = bansLeft(p);
  const forced = left === 0;
  const ranOutOfBans = limit > 0 && left === 0;

  const header = `
    <div class="result-topbar">
      <div class="result-turn ${pClass(p)}">Giliran <strong>${escHtml(playerName(p))}</strong></div>
      <button type="button" class="btn-result-peek" onclick="peekFullBoard()" title="Tutup sementara untuk melihat papan draft">
        ${iconHtml('eye', 15)} <span>Lihat Papan</span>
      </button>
    </div>
    <div class="result-member ${resultMode === 'place' || showDraftPreview ? 'is-compact' : ''}">
      <div class="result-photo">${photoImg(m, 'result-img', 160, 213)}<span class="result-team team-${teamShort(m.team).toLowerCase()}">${escHtml(teamShort(m.team))}</span></div>
      <div class="result-info">
        <div class="result-kicker">Roulette memilih</div>
        <h3 class="result-name">${escHtml(m.name)}</h3>
        <div class="result-meta">${escHtml(m.nickname)} · ${escHtml(m.team)} · Gen ${escHtml(m.gen)}</div>
      </div>
    </div>`;

  let body = '';
  if (resultMode === 'choose') {
    body = `
      <div class="result-actions">
        <button type="button" class="btn-pick" onclick="choosePick()">${iconHtml('check-circle-2', 20)} PICK</button>
        <button type="button" class="btn-ban" onclick="doBan()">${iconHtml('ban', 20)} BAN <small>(sisa ${left})</small></button>
      </div>
      <p class="result-hint">PICK: tempatkan di kategori milikmu · BAN: buang member ini</p>
      <button type="button" class="btn-preview-toggle ${showDraftPreview ? 'is-open' : ''}" onclick="toggleDraftPreview()">
        ${iconHtml(showDraftPreview ? 'chevron-up' : 'table-2', 15)}
        <span>${showDraftPreview ? 'Sembunyikan' : 'Lihat'} Draft Kita &amp; Lawan (${pickCount(p)}/9 vs ${pickCount(opp)}/9)</span>
      </button>
      ${showDraftPreview ? renderMiniDraftComparison(p) : ''}`;
  } else {
    const picks = state.players[p].picks;
    const oppPicks = state.players[opp].picks;
    body = `
      ${ranOutOfBans ? `<div class="result-forced">${iconHtml('alert-triangle', 16)} <span>Jatah ban kamu sudah habis, jadi <strong>${escHtml(m.nickname)}</strong> wajib ditempatkan.</span></div>` : ''}
      <div class="result-place-title">Tempatkan <strong>${escHtml(m.nickname)}</strong> di kategori:</div>
      <div class="cat-choice-grid">
        ${DRAFT_CATEGORIES.map(cat => {
          const filled = picks[cat.id] ? memberById.get(picks[cat.id]) : null;
          const oppFilled = oppPicks[cat.id] ? memberById.get(oppPicks[cat.id]) : null;
          return `<button type="button" class="cat-choice ${filled ? 'is-filled' : ''}" ${filled ? 'disabled' : ''} onclick="placePick('${cat.id}')">
            ${iconHtml(cat.icon, 18)}
            <span class="cat-choice-title">${cat.title}</span>
            <span class="cat-choice-sub">${filled ? escHtml(filled.nickname) : 'Kosong'}</span>
            <span class="cat-choice-opp ${oppFilled ? pClass(opp) + '-text' : ''}">vs ${oppFilled ? escHtml(oppFilled.nickname) : '-'}</span>
          </button>`;
        }).join('')}
      </div>
      <div class="result-footer-links">
        ${forced ? '' : `<button type="button" class="btn-result-back" onclick="backToChoice()">${iconHtml('arrow-left', 15)} Kembali (pilih BAN)</button>`}
        <button type="button" class="btn-result-back" onclick="peekFullBoard()">${iconHtml('eye', 15)} Lihat Papan Penuh</button>
      </div>`;
  }

  $('resultContent').innerHTML = header + body;
  refreshIcons();
}

function choosePick() {
  resultMode = 'place';
  renderResult();
  focusFirstInModal($('modalResult'));
}

function backToChoice() {
  if (bansLeft(state.turn) <= 0) return;
  resultMode = 'choose';
  renderResult();
  focusFirstInModal($('modalResult'));
}

function doBan() {
  const p = state.turn;
  const mid = state.pending;
  if (!mid || bansLeft(p) <= 0) return;
  state.players[p].bans.push(mid);
  state.log.push({ p, type: 'ban', mid });
  const m = memberById.get(mid);
  finishAction(`${playerName(p)} mem-BAN ${m.nickname} (sisa ban ${bansLeft(p)})`);
}

function placePick(catId) {
  const p = state.turn;
  const mid = state.pending;
  if (!mid || state.players[p].picks[catId]) return;
  state.players[p].picks[catId] = mid;
  state.log.push({ p, type: 'pick', mid, cat: catId });
  const m = memberById.get(mid);
  const cat = DRAFT_CATEGORIES.find(c => c.id === catId);
  finishAction(`${playerName(p)} memilih ${m.nickname} sebagai ${cat.title}`);
}

function finishAction(msg) {
  state.pending = null;
  advanceTurn();
  saveState();
  closeModal('modalResult');
  render();
  if (state.phase === 'done') {
    showToast('Draft selesai. Klik member di tabel untuk menilai pemenang tiap kategori.');
  } else {
    showToast(`${msg} · Giliran ${playerName(state.turn)}`);
  }
}

function advanceTurn() {
  if (isFull(0) && isFull(1)) {
    state.phase = 'done';
    return;
  }
  const other = 1 - state.turn;
  if (!isFull(other)) state.turn = other;
}

// ── Judging (setelah draft selesai) ─────────
function toggleWinner(catId, p) {
  if (!state || state.phase !== 'done') return;
  state.winners = state.winners || {};
  state.winners[catId] = state.winners[catId] === p ? null : p;
  saveState();
  renderBoard();
  renderDonePanel();
  refreshIcons();
}

// ── Download PNG ───────────────────────────
async function downloadDraftPNG() {
  const target = $('draftCapture');
  const btn = $('btnDownloadDraft');
  if (!target || typeof html2canvas === 'undefined') {
    showToast('Fitur download belum siap, coba lagi.');
    return;
  }
  const original = btn.innerHTML;
  btn.textContent = 'Memproses...';
  btn.disabled = true;
  try {
    const canvas = await html2canvas(target, {
      scale: 3,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#161616',
      logging: false,
      windowWidth: 1280,
      onclone: doc => {
        const el = doc.getElementById('draftCapture');
        if (el) { el.style.width = '620px'; el.style.maxWidth = '620px'; }
        const scroll = doc.querySelector('.table-scroll');
        if (scroll) scroll.style.overflow = 'visible';
      },
    });
    canvas.toBlob(blob => {
      if (!blob) {
        showToast('Browser memblokir export gambar. Buka lewat server lokal.');
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const fname = state.players.map(p => p.name.replace(/\s+/g, '_')).join('_vs_');
      a.download = `Draft_${fname}_JKT48.jpg`;
      a.href = url;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
      showToast('Gambar berhasil diunduh.');
    }, 'image/jpeg', 0.95);
  } catch (err) {
    console.error(err);
    showToast(window.location.protocol === 'file:'
      ? 'Download diblokir di file://. Jalankan server lokal lalu buka /draft-pick/.'
      : 'Gagal mengunduh gambar, coba lagi.');
  } finally {
    btn.innerHTML = original;
    btn.disabled = false;
    refreshIcons();
  }
}

// ── Modal (with Focus Trap & Return) & Toast ──
function getFocusableElements(container) {
  if (!container) return [];
  return [...container.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )].filter(el => el.offsetParent !== null);
}

function focusFirstInModal(modalEl) {
  const focusables = getFocusableElements(modalEl);
  if (focusables.length) focusables[0].focus();
}

function openModal(id) {
  const modalEl = $(id);
  if (!modalEl) return;
  if (!activeModalId) lastFocusedEl = document.activeElement;
  activeModalId = id;
  modalEl.classList.add('open');
  refreshIcons();
  requestAnimationFrame(() => focusFirstInModal(modalEl));
}

function closeModal(id) {
  const modalEl = $(id);
  if (!modalEl || !modalEl.classList.contains('open')) return;
  modalEl.classList.remove('open');
  if (activeModalId === id) {
    activeModalId = null;
    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function' && document.contains(lastFocusedEl)) {
      lastFocusedEl.focus();
    }
    lastFocusedEl = null;
  }
}

function handleModalTabTrap(e) {
  if (e.key !== 'Tab' || !activeModalId) return;
  const modalEl = $(activeModalId);
  const focusables = getFocusableElements(modalEl);
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

let toastTimer;
function showToast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

// ── Init ───────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  state = loadState();
  fillSetupForm();
  render();

  if (state && state.phase === 'drafting' && state.pending) {
    setTimeout(openResult, 300);
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => { if (state) drawWheel(); });
  }

  document.addEventListener('keydown', e => {
    handleModalTabTrap(e);
    if (e.key === 'Escape') {
      closeModal('modalConfirmReset');
      if ($('modalResult')?.classList.contains('open')) minimizeResult();
      return;
    }
    const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);
    const modalOpen = document.querySelector('.modal-overlay.open');
    if (e.code === 'Space' && !typing && !modalOpen && state && state.phase === 'drafting') {
      e.preventDefault();
      spinWheel();
    }
  });
});
