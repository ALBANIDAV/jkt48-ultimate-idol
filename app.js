/* =============================================
   BUILD YOUR ULTIMATE IDOL – JKT48
   Ultimate Matrix Table Logic (45 Slots)
   ============================================= */

// ── Constants & Config ──────────────────────
const CATEGORIES = [
  { id: 'visual',     emoji: '👁️', title: 'Visual :' },
  { id: 'dance',      emoji: '💃', title: 'Dance :' },
  { id: 'vocal',      emoji: '🎤', title: 'Vocal :' },
  { id: 'fanservice', emoji: '❤️', title: 'Fan Service :' },
  { id: 'mc',         emoji: '🎙️', title: 'MC :' },
  { id: 'stage',      emoji: '🌟', title: 'Stage Performance :' },
  { id: 'fashion',    emoji: '👗', title: 'Fashion Sense :' },
  { id: 'leadership', emoji: '👑', title: 'Leadership :' },
  { id: 'aura',       emoji: '✨', title: 'Aura :' },
];

const TEAM_COLS = [
  { id: 'love',    name: 'Love',    matchTeam: 'Team Love' },
  { id: 'dream',   name: 'Dream',   matchTeam: 'Team Dream' },
  { id: 'passion', name: 'Passion', matchTeam: 'Team Passion' },
  { id: 'trainee', name: 'Trainee', matchTeam: 'Trainee' },
  { id: 'jkt48',   name: 'JKT48',   matchTeam: 'ANY' }, // All-Star Overall pick
];

const RANDOM_GROUP_NAMES = [
  'Ferdy', 'Aditya', 'Rizky', 'Bima', 'Andika', 'Dimas',
  'Fauzan', 'Satria', 'Bayu', 'Reza', 'Gilang', 'Deka',
  'Pratama', 'Arif', 'Yudha', 'Farhan', 'Naufal', 'Bagas',
  'Hadi', 'Kevin', 'Rangga', 'Alvin', 'Fandy', 'Erik',
  'Danish', 'Putra', 'Arya', 'Fajar', 'Rafi', 'Dino',
];

const TIER_CONFIG = [
  { min: 90, name: '👑 LEGENDARY', class: 'tier-legendary' },
  { min: 75, name: '💜 EPIC',      class: 'tier-epic' },
  { min: 55, name: '💎 GREAT',     class: 'tier-great' },
  { min: 35, name: '✅ GOOD',      class: 'tier-good' },
  { min: 0,  name: '🌱 STARTER',   class: 'tier-starter' },
];

// ── Fallback JKT48 Member Data ──────────────
const FALLBACK_MEMBERS = [
  // Team Love (15 members)
  { id: 1,  name: 'Fiony Alveria',        nickname: 'Fiony',   team: 'Team Love',    img: null, gen: '8th' },
  { id: 2,  name: 'Indah Cahya',          nickname: 'Indah',   team: 'Team Love',    img: null, gen: '9th' },
  { id: 3,  name: 'Anindya Ramadhani',    nickname: 'Anin',    team: 'Team Love',    img: null, gen: '11th' },
  { id: 4,  name: 'Michelle Alexandra',   nickname: 'Michie',  team: 'Team Love',    img: null, gen: '11th' },
  { id: 5,  name: 'Celline Thefani',      nickname: 'Elin',    team: 'Team Love',    img: null, gen: '11th' },
  { id: 6,  name: 'Grace Octaviani',      nickname: 'Gracie',  team: 'Team Love',    img: null, gen: '11th' },
  { id: 7,  name: 'Cynthia Yaputera',     nickname: 'Cynthia', team: 'Team Love',    img: null, gen: '11th' },
  { id: 8,  name: 'Cathleen Nixie',       nickname: 'Nixie',   team: 'Team Love',    img: null, gen: '11th' },
  { id: 9,  name: 'Alya Amanda',          nickname: 'Alya',    team: 'Team Love',    img: null, gen: '11th' },
  { id: 10, name: 'Aurellia',             nickname: 'Lia',     team: 'Team Love',    img: null, gen: '11th' },
  { id: 11, name: 'Aurhel Alana',         nickname: 'Lana',    team: 'Team Love',    img: null, gen: '11th' },
  { id: 12, name: 'Hillary Abigail',      nickname: 'Lily',    team: 'Team Love',    img: null, gen: '12th' },
  { id: 13, name: 'Jazzlyn Trisha',       nickname: 'Trisha',  team: 'Team Love',    img: null, gen: '12th' },
  { id: 14, name: 'Fritzy Rosmerian',     nickname: 'Fritzy',  team: 'Team Love',    img: null, gen: '12th' },
  { id: 15, name: 'Nayla Suji',           nickname: 'Nayla',   team: 'Team Love',    img: null, gen: '12th' },
  // Team Dream (12 members)
  { id: 16, name: 'Gita Sekar Andarini',  nickname: 'Gita',    team: 'Team Dream',   img: null, gen: '6th' },
  { id: 17, name: 'Freya Jayawardana',    nickname: 'Freya',   team: 'Team Dream',   img: null, gen: '7th' },
  { id: 18, name: 'Febriola Sinambela',   nickname: 'Olla',    team: 'Team Dream',   img: null, gen: '7th' },
  { id: 19, name: 'Helisma Putri',        nickname: 'Eli',     team: 'Team Dream',   img: null, gen: '7th' },
  { id: 20, name: 'Marsha Lenathea',      nickname: 'Marsha',  team: 'Team Dream',   img: null, gen: '9th' },
  { id: 21, name: 'Jesslyn Elly',         nickname: 'Lyn',     team: 'Team Dream',   img: null, gen: '10th' },
  { id: 22, name: 'Gabriela Abigail',     nickname: 'Ella',    team: 'Team Dream',   img: null, gen: '10th' },
  { id: 23, name: 'Greesella Adhalia',    nickname: 'Greesel', team: 'Team Dream',   img: null, gen: '11th' },
  { id: 24, name: 'Shabilqis Naila',      nickname: 'Nala',    team: 'Team Dream',   img: null, gen: '12th' },
  { id: 25, name: 'Oline Manuel',         nickname: 'Oline',   team: 'Team Dream',   img: null, gen: '12th' },
  { id: 26, name: 'Adeline Wijaya',       nickname: 'Delynn',  team: 'Team Dream',   img: null, gen: '12th' },
  { id: 27, name: 'Nina Tutachia',        nickname: 'Nachia',  team: 'Team Dream',   img: null, gen: '12th' },
  // Team Passion (14 members)
  { id: 28, name: 'Angelina Christy',     nickname: 'Christy', team: 'Team Passion', img: null, gen: '7th' },
  { id: 29, name: 'Mutiara Azzahra',      nickname: 'Muthe',   team: 'Team Passion', img: null, gen: '7th' },
  { id: 30, name: 'Jessica Chandra',      nickname: 'Jessi',   team: 'Team Passion', img: null, gen: '7th' },
  { id: 31, name: 'Lulu Salsabila',       nickname: 'Lulu',    team: 'Team Passion', img: null, gen: '8th' },
  { id: 32, name: 'Cornelia Vanisa',      nickname: 'Oniel',   team: 'Team Passion', img: null, gen: '8th' },
  { id: 33, name: 'Kathrina Irene',       nickname: 'Kathrina',team: 'Team Passion', img: null, gen: '9th' },
  { id: 34, name: 'Raisha Syifa',         nickname: 'Raisha',  team: 'Team Passion', img: null, gen: '10th' },
  { id: 35, name: 'Desy Natalia',         nickname: 'Daisy',   team: 'Team Passion', img: null, gen: '11th' },
  { id: 36, name: 'Dena Natalia',         nickname: 'Danella', team: 'Team Passion', img: null, gen: '11th' },
  { id: 37, name: 'Victoria Kimberly',    nickname: 'Kimmy',   team: 'Team Passion', img: null, gen: '11th' },
  { id: 38, name: 'Catherina Vallencia',  nickname: 'Erine',   team: 'Team Passion', img: null, gen: '11th' },
  { id: 39, name: 'Michelle Levia',       nickname: 'Levi',    team: 'Team Passion', img: null, gen: '12th' },
  { id: 40, name: 'Abigail Rachel',       nickname: 'Aralie',  team: 'Team Passion', img: null, gen: '12th' },
  { id: 41, name: 'Ribka Budiman',        nickname: 'Ribka',   team: 'Team Passion', img: null, gen: '12th' },
  // 13th Gen Trainees
  { id: 42, name: 'Astrella Virgiananda', nickname: 'Virgi',   team: 'Trainee',      img: null, gen: '13th' },
  { id: 43, name: 'Aulia Riza',           nickname: 'Auwia',   team: 'Trainee',      img: null, gen: '13th' },
  { id: 44, name: 'Bong Aprilli',         nickname: 'Rilly',   team: 'Trainee',      img: null, gen: '13th' },
  { id: 45, name: 'Hagia Sopia',          nickname: 'Giaa',    team: 'Trainee',      img: null, gen: '13th' },
  { id: 46, name: 'Humaira Ramadhani',    nickname: 'Maira',   team: 'Trainee',      img: null, gen: '13th' },
  { id: 47, name: 'Jacqueline Immanuela', nickname: 'Ekin',    team: 'Trainee',      img: null, gen: '13th' },
  { id: 48, name: 'Jemima Evodie',        nickname: 'Jemima',  team: 'Trainee',      img: null, gen: '13th' },
  { id: 49, name: 'Mikaela Kusjanto',     nickname: 'Mikaela', team: 'Trainee',      img: null, gen: '13th' },
  { id: 50, name: 'Nur Intan',            nickname: 'Intan',   team: 'Trainee',      img: null, gen: '13th' },
  // 14th Gen Trainees
  { id: 51, name: 'Afera Thalia',         nickname: 'Fera',    team: 'Trainee',      img: null, gen: '14th' },
  { id: 52, name: 'Carissa Dini',         nickname: 'Carissa', team: 'Trainee',      img: null, gen: '14th' },
  { id: 53, name: 'Christabella Bonita',  nickname: 'Bella',   team: 'Trainee',      img: null, gen: '14th' },
  { id: 54, name: 'Fahira Putri',         nickname: 'Fahira',  team: 'Trainee',      img: null, gen: '14th' },
  { id: 55, name: 'Fatimah Azzahra',      nickname: 'Rara',    team: 'Trainee',      img: null, gen: '14th' },
  { id: 56, name: 'Heidi Suyangga',       nickname: 'Heidi',   team: 'Trainee',      img: null, gen: '14th' },
  { id: 57, name: 'Maxine Faye',          nickname: 'Maxine',  team: 'Trainee',      img: null, gen: '14th' },
  { id: 58, name: 'Putry Jazyta',         nickname: 'Jazzy',   team: 'Trainee',      img: null, gen: '14th' },
  { id: 59, name: 'Ralyne Van Irwan',     nickname: 'Ralyne',  team: 'Trainee',      img: null, gen: '14th' },
  { id: 60, name: 'Sona Kalyana',         nickname: 'Sona',    team: 'Trainee',      img: null, gen: '14th' },
];

// ── State ──────────────────────────────────
let allMembers = [];
let filteredMembers = [];
let slots = {}; // { catId: { love: member|null, dream: member|null, ... } }
let currentDragMember = null;
let isExcelMode = false;

// Pre-initialize matrix slots (9 categories x 5 teams = 45 cells)
CATEGORIES.forEach(cat => {
  slots[cat.id] = {};
  TEAM_COLS.forEach(col => {
    slots[cat.id][col.id] = null;
  });
});

// ── Member Scores (Generated deterministically) ──
function getMemberScore(memberId, catId, colId) {
  const seed = (memberId * 31 + catId.length * 17 + colId.length * 11) % 100;
  const base = 60 + ((memberId * 7 + catId.charCodeAt(0) * 3) % 40);
  return Math.min(100, Math.max(50, base));
}

// ── API & Data Loading ──────────────────────
const TEAM_MAP = {
  'LOVE': 'Team Love',
  'DREAM': 'Team Dream',
  'PASSION': 'Team Passion',
  'TRAINEE': 'Trainee',
  'JKT48_VIRTUAL': 'Trainee',
};

function getLocalPhotoPath(name, teamOrType) {
  let folder = 'Team Love';
  if (teamOrType === 'DREAM' || teamOrType === 'Team Dream') folder = 'Team Dream';
  else if (teamOrType === 'PASSION' || teamOrType === 'Team Passion') folder = 'Team Passion';
  else if (teamOrType === 'TRAINEE' || teamOrType === 'Trainee') folder = 'Trainee';

  const cleanName = (name || 'Unknown').trim().replace(/\s+/g, '_');
  return encodeURI(`${folder}/${cleanName}.jpg`);
}

function getPhotoProxyUrl(url, width = 300) {
  return url || '';
}

function onPhotoError(imgEl, originalUrl, team) {
  const step = parseInt(imgEl.getAttribute('data-err-step') || '0', 10);
  const wrap = imgEl.parentElement;

  if (step === 0 && originalUrl && !imgEl.src.includes('weserv.nl')) {
    imgEl.setAttribute('data-err-step', '1');
    const cleanUrl = originalUrl.replace(/^https?:\/\//, '');
    imgEl.src = `https://images.weserv.nl/?url=${encodeURIComponent(cleanUrl)}&w=300&output=webp`;
  } else {
    if (wrap) {
      const badge = wrap.querySelector('.member-team-badge');
      wrap.innerHTML = `<div class="member-img-placeholder">${getTeamEmoji(team)}</div>`;
      if (badge) wrap.appendChild(badge);
    }
  }
}

async function loadMembers() {
  const grid = document.getElementById('membersGrid');
  grid.innerHTML = `<div class="loading-state"><div class="loading-spinner"></div><p>Memuat data anggota JKT48...</p></div>`;

  try {
    const res = await fetch('members.json', {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(5000),
    });

    if (res.ok) {
      const data = await res.json();
      const raw = Array.isArray(data) ? data : (data.members || data.data || []);
      if (raw.length > 0) {
        allMembers = raw.map((m, i) => {
          const teamName = TEAM_MAP[m.type] || 'Team Love';
          const localPhoto = getLocalPhotoPath(m.name || m.full_name, m.type);
          const fb = FALLBACK_MEMBERS.find(f => f.name.toLowerCase() === (m.name || m.full_name || '').toLowerCase());
          return {
            id: m.jkt48_member_id || m.id || i + 1,
            name: m.name || m.full_name || 'Unknown',
            nickname: m.nickname || (m.name || '').split(' ')[0],
            team: teamName,
            img: localPhoto,
            originalUrl: m.photo || m.image_url || null,
            gen: fb ? fb.gen : (m.gen || (m.type === 'TRAINEE' ? 'Trainee' : teamName)),
          };
        });
      } else {
        throw new Error('Empty members.json');
      }
    } else {
      throw new Error(`HTTP ${res.status}`);
    }
  } catch (err) {
    console.warn('Gagal memuat dari members.json, menggunakan data cadangan offline:', err.message);
    allMembers = FALLBACK_MEMBERS.map(m => ({
      ...m,
      img: getLocalPhotoPath(m.name, m.team),
      originalUrl: null,
    }));
  }

  filteredMembers = [...allMembers];
  renderMembersGrid();
  renderMatrixTable();
  updateStats();
}

// ── Render Members Grid ─────────────────────
function renderMembersGrid() {
  const grid = document.getElementById('membersGrid');
  const countEl = document.getElementById('memberPoolCount');

  if (!filteredMembers.length) {
    grid.innerHTML = `<div class="loading-state" style="grid-column:1/-1"><p style="font-size:2rem">😔</p><p>Tidak ada anggota ditemukan</p></div>`;
    countEl.textContent = '0 anggota';
    return;
  }

  countEl.textContent = `${filteredMembers.length} / ${allMembers.length} anggota`;

  grid.innerHTML = filteredMembers.map(m => {
    // Check if member is placed anywhere in the matrix
    let placeCount = 0;
    CATEGORIES.forEach(cat => {
      TEAM_COLS.forEach(col => {
        if (slots[cat.id][col.id]?.id === m.id) placeCount++;
      });
    });

    const teamBadge = getTeamBadge(m.team);
    const placeBadge = placeCount > 0 ? `<span class="member-place-badge" title="Dipasang di ${placeCount} kategori">👑 ${placeCount}x</span>` : '';
    const photoUrl = getPhotoProxyUrl(m.img, 300);
    const imgHtml = photoUrl
      ? `<img class="member-img" src="${escHtml(photoUrl)}" alt="${escHtml(m.name)}" referrerpolicy="no-referrer" onerror="onPhotoError(this, '${escHtml(m.originalUrl || m.img || '')}', '${escHtml(m.team)}')" loading="lazy">`
      : `<div class="member-img-placeholder">${getTeamEmoji(m.team)}</div>`;

    return `
      <div class="member-card ${placeCount > 0 ? 'placed' : ''}"
           id="mc-${m.id}"
           draggable="true"
           ondragstart="onDragStart(event, ${m.id})"
           ondragend="onDragEnd(event)"
           onclick="onMemberClick(${m.id})"
           title="${escHtml(m.name)} (${escHtml(m.team)})"
           data-member-id="${m.id}">
        <div class="member-img-wrap">
          ${imgHtml}
          <span class="member-team-badge ${teamBadge.cls}">${teamBadge.label}</span>
          ${placeBadge}
        </div>
        <div class="member-info">
          <div class="member-name">${escHtml(m.name)}</div>
          <div class="member-nickname">${escHtml(m.nickname)} • ${escHtml(m.gen)}</div>
        </div>
      </div>`;
  }).join('');
}

function getTeamBadge(team) {
  const map = {
    'Team Love':    { cls: 'badge-love',    label: '♥ Love' },
    'Team Dream':   { cls: 'badge-dream',   label: '✦ Dream' },
    'Team Passion': { cls: 'badge-passion', label: '★ Passion' },
    'Trainee':      { cls: 'badge-trainee', label: '🌱 Trainee' },
  };
  return map[team] || { cls: 'badge-trainee', label: team };
}

function getTeamEmoji(team) {
  const map = { 'Team Love': '♥', 'Team Dream': '✦', 'Team Passion': '★', 'Trainee': '🌱' };
  return map[team] || '🌸';
}

// ── Filter Members ──────────────────────────
function filterMembers() {
  const q = document.getElementById('searchMember').value.toLowerCase().trim();
  const team = document.getElementById('filterTeam').value;

  const clearBtn = document.getElementById('btnClearSearch');
  if (clearBtn) {
    if (q.length > 0) clearBtn.classList.add('show');
    else clearBtn.classList.remove('show');
  }

  filteredMembers = allMembers.filter(m => {
    const matchQ = !q || m.name.toLowerCase().includes(q) || m.nickname.toLowerCase().includes(q);
    const matchT = !team || m.team === team;
    return matchQ && matchT;
  });

  renderMembersGrid();
}

function clearSearchMember() {
  const inputEl = document.getElementById('searchMember');
  if (inputEl) {
    inputEl.value = '';
  }
  filterMembers();
}

// ── Render Matrix Table (9 Rows x 5 Team Cols) ──
function renderMatrixTable() {
  const tbody = document.getElementById('matrixTableBody');
  if (!tbody) return;

  tbody.innerHTML = CATEGORIES.map(cat => {
    const cellsHtml = TEAM_COLS.map(col => {
      const placed = slots[cat.id][col.id];
      return `
        <td class="td-matrix-cell"
            id="cell-${cat.id}-${col.id}"
            ondragover="onDragOverCell(event, '${cat.id}', '${col.id}')"
            ondragleave="onDragLeaveCell(event, '${cat.id}', '${col.id}')"
            ondrop="onDropCell(event, '${cat.id}', '${col.id}')"
            onclick="onCellClick('${cat.id}', '${col.id}')">
          ${placed ? renderCellContent(placed, cat.id, col.id) : `<span class="cell-empty-hint">+ Pilih</span>`}
        </td>`;
    }).join('');

    return `
      <tr class="matrix-row" id="row-${cat.id}">
        <td class="td-category">
          <div class="category-label-flex">
            <span class="category-label-icon">${cat.emoji}</span>
            <span>${cat.title}</span>
          </div>
        </td>
        ${cellsHtml}
      </tr>`;
  }).join('');

  // Re-apply zoom-out scale after table re-renders on mobile
  if (typeof scaleMatrixTable === 'function') {
    requestAnimationFrame(scaleMatrixTable);
  }
}

function renderCellContent(member, catId, colId) {
  const photoUrl = getPhotoProxyUrl(member.img, 100);
  const imgHtml = photoUrl
    ? `<img class="cell-mini-avatar" src="${escHtml(photoUrl)}" alt="${escHtml(member.nickname)}" referrerpolicy="no-referrer" onerror="onPhotoError(this, '${escHtml(member.originalUrl || '')}', '${escHtml(member.team)}')">`
    : `<div class="cell-mini-emoji">${getTeamEmoji(member.team)}</div>`;

  return `
    <div class="cell-content-pill">
      ${imgHtml}
      <span class="cell-member-name">${escHtml(member.nickname || member.name)}</span>
      <button class="btn-cell-remove" onclick="removeMemberCell(event, '${catId}', '${colId}')" title="Hapus">✕</button>
    </div>`;
}

// ── Drag & Drop Handlers ────────────────────
function onDragStart(event, memberId) {
  const member = allMembers.find(m => m.id === memberId);
  if (!member) return;

  currentDragMember = member;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', String(memberId));

  const card = document.getElementById(`mc-${memberId}`);
  if (card) {
    setTimeout(() => card.classList.add('dragging'), 0);
  }
}

function onDragEnd(event) {
  if (currentDragMember) {
    const card = document.getElementById(`mc-${currentDragMember.id}`);
    if (card) card.classList.remove('dragging');
  }
  currentDragMember = null;
}

function onDragOverCell(event, catId, colId) {
  event.preventDefault();
  const colObj = TEAM_COLS.find(c => c.id === colId);
  const cell = document.getElementById(`cell-${catId}-${colId}`);

  if (currentDragMember && colObj.matchTeam !== 'ANY' && currentDragMember.team !== colObj.matchTeam) {
    event.dataTransfer.dropEffect = 'none';
    if (cell) {
      cell.classList.remove('drag-over');
      cell.style.borderColor = 'rgba(255, 75, 75, 0.8)';
    }
    return;
  }

  event.dataTransfer.dropEffect = 'move';
  if (cell) {
    cell.style.borderColor = '';
    cell.classList.add('drag-over');
  }
}

function onDragLeaveCell(event, catId, colId) {
  const cell = document.getElementById(`cell-${catId}-${colId}`);
  if (cell) {
    cell.classList.remove('drag-over');
    cell.style.borderColor = '';
  }
}

function onDropCell(event, catId, colId) {
  event.preventDefault();
  const cell = document.getElementById(`cell-${catId}-${colId}`);
  if (cell) {
    cell.classList.remove('drag-over');
    cell.style.borderColor = '';
  }

  const memberId = parseInt(event.dataTransfer.getData('text/plain'));
  const member = allMembers.find(m => m.id === memberId);
  if (!member) return;

  const colObj = TEAM_COLS.find(c => c.id === colId);
  if (colObj.matchTeam !== 'ANY' && member.team !== colObj.matchTeam) {
    showToast(`❌ ${member.nickname} adalah anggota ${member.team}, tidak bisa dipasang di kolom ${colObj.name}!`);
    return;
  }

  placeMemberInCell(catId, colId, member);
}

// ── Click / Tap to Place (Desktop & Mobile) ──
let selectedMember = null;

function clearTapSelection() {
  selectedMember = null;
  document.querySelectorAll('.member-card').forEach(c => {
    c.classList.remove('selected-for-tap');
    c.style.outline = '';
  });
  document.querySelectorAll('.td-matrix-cell').forEach(cell => {
    cell.classList.remove('tap-target');
  });
}

function onMemberClick(memberId) {
  const member = allMembers.find(m => m.id === memberId);
  if (!member) return;

  if (selectedMember?.id === memberId) {
    clearTapSelection();
    showToast(`Batal memilih ${member.nickname}`);
    return;
  }

  clearTapSelection();
  selectedMember = member;

  const card = document.getElementById(`mc-${memberId}`);
  if (card) card.classList.add('selected-for-tap');

  // Highlight all cells where this member can be placed
  CATEGORIES.forEach(cat => {
    TEAM_COLS.forEach(col => {
      if (col.matchTeam === 'ANY' || col.matchTeam === member.team) {
        const cellEl = document.getElementById(`cell-${cat.id}-${col.id}`);
        if (cellEl) cellEl.classList.add('tap-target');
      }
    });
  });

  showToast(`✅ ${member.nickname} dipilih! Ketuk sel tabel bercahaya untuk langsung mengisi.`);
}

function onCellClick(catId, colId) {
  if (selectedMember) {
    const colObj = TEAM_COLS.find(c => c.id === colId);
    if (colObj.matchTeam !== 'ANY' && selectedMember.team !== colObj.matchTeam) {
      showToast(`❌ ${selectedMember.nickname} adalah anggota ${selectedMember.team}, tidak bisa dipasang di kolom ${colObj.name}!`);
      return;
    }

    placeMemberInCell(catId, colId, selectedMember);
    clearTapSelection();
  }
}

// ── Place & Remove Member in Matrix Cell ─────
function placeMemberInCell(catId, colId, member) {
  const colObj = TEAM_COLS.find(c => c.id === colId);
  const catObj = CATEGORIES.find(c => c.id === catId);

  if (colObj.matchTeam !== 'ANY' && member.team !== colObj.matchTeam) {
    showToast(`❌ ${member.nickname} adalah anggota ${member.team}, tidak bisa dipasang di kolom ${colObj.name}!`);
    return;
  }

  if (colObj.id === 'jkt48') {
    showToast(`👑 ${member.nickname} menjadi Ultimate JKT48 untuk ${catObj.title}!`);
  } else {
    showToast(`🌸 ${member.nickname} → ${catObj.title} (${colObj.name})`);
  }

  slots[catId][colId] = member;

  renderMatrixTable();
  updateMemberCardStates();
  updateStats();
}

function removeMemberCell(event, catId, colId) {
  if (event) event.stopPropagation();
  slots[catId][colId] = null;
  renderMatrixTable();
  updateMemberCardStates();
  updateStats();
  showToast('🗑️ Anggota dihapus dari sel');
}

function updateMemberCardStates() {
  allMembers.forEach(m => {
    const card = document.getElementById(`mc-${m.id}`);
    if (!card) return;
    let placeCount = 0;
    CATEGORIES.forEach(cat => {
      TEAM_COLS.forEach(col => {
        if (slots[cat.id][col.id]?.id === m.id) placeCount++;
      });
    });

    const wrap = card.querySelector('.member-img-wrap');
    let badge = wrap ? wrap.querySelector('.member-place-badge') : null;

    if (placeCount > 0) {
      card.classList.add('placed');
      if (wrap) {
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'member-place-badge';
          wrap.appendChild(badge);
        }
        badge.title = `Dipasang di ${placeCount} kategori`;
        badge.innerHTML = `👑 ${placeCount}x`;
      }
    } else {
      card.classList.remove('placed');
      if (badge) badge.remove();
    }
  });
}

// ── Auto Fill Random ────────────────────────
function autoFillRandom() {
  const byTeam = {
    'Team Love':    allMembers.filter(m => m.team === 'Team Love'),
    'Team Dream':   allMembers.filter(m => m.team === 'Team Dream'),
    'Team Passion': allMembers.filter(m => m.team === 'Team Passion'),
    'Trainee':      allMembers.filter(m => m.team === 'Trainee'),
  };

  CATEGORIES.forEach(cat => {
    TEAM_COLS.forEach(col => {
      if (!slots[cat.id][col.id]) {
        if (col.id === 'jkt48') {
          // Pick a random member from ANY team for overall JKT48
          const rand = allMembers[Math.floor(Math.random() * allMembers.length)];
          if (rand) slots[cat.id][col.id] = rand;
        } else {
          const pool = byTeam[col.matchTeam] || allMembers;
          if (pool.length > 0) {
            const rand = pool[Math.floor(Math.random() * pool.length)];
            slots[cat.id][col.id] = rand;
          }
        }
      }
    });
  });

  renderMatrixTable();
  updateMemberCardStates();
  updateStats();
  showToast('✨ Auto Fill selesai! Tabel telah diisi lengkap per tim.');
}

// ── Clear All ───────────────────────────────
function clearAllSlots() {
  CATEGORIES.forEach(cat => {
    TEAM_COLS.forEach(col => {
      slots[cat.id][col.id] = null;
    });
  });
  renderMatrixTable();
  updateMemberCardStates();
  updateStats();
  showToast('🗑️ Semua 45 sel tabel dikosongkan');
}

// ── Calculate Group Score ───────────────────
function calculateGroupScore() {
  let total = 0;
  let count = 0;
  CATEGORIES.forEach(cat => {
    TEAM_COLS.forEach(col => {
      const member = slots[cat.id][col.id];
      if (member) {
        total += getMemberScore(member.id, cat.id, col.id);
        count++;
      }
    });
  });
  return count === 0 ? 0 : Math.round((total / count) * (count / 45));
}

function getGroupTier(score) {
  return TIER_CONFIG.find(t => score >= t.min) || TIER_CONFIG[TIER_CONFIG.length - 1];
}

// ── Update Stats ─────────────────────────────
function updateStats() {
  let count = 0;
  CATEGORIES.forEach(cat => {
    TEAM_COLS.forEach(col => {
      if (slots[cat.id][col.id]) count++;
    });
  });

  const score = calculateGroupScore();
  const tier = getGroupTier(score);

  document.getElementById('statMemberCount').textContent = `👥 ${count} / 45 Slot Terisi`;
  const statScoreEl = document.getElementById('statScore');
  if (statScoreEl) statScoreEl.textContent = `⭐ Score: ${score}`;
  const statTierEl = document.getElementById('statTier');
  if (statTierEl) statTierEl.textContent = `🏅 ${tier.name}`;

  const progressEl = document.getElementById('matrixProgressBar');
  if (progressEl) {
    const pct = Math.round((count / 45) * 100);
    progressEl.style.width = `${pct}%`;
  }

  const saveBtn = document.getElementById('btnSave');
  if (saveBtn) saveBtn.disabled = count === 0;
}

// ── Toggle Excel Classic Mode ────────────────
function toggleExcelMode() {
  isExcelMode = !isExcelMode;
  const btn = document.getElementById('btnToggleExcel');
  if (isExcelMode) {
    document.body.classList.add('excel-classic-mode');
    btn.textContent = '🎨 Mode Premium (Glass)';
    showToast('📊 Mode Excel Classic diaktifkan! Persis seperti spreadsheet.');
  } else {
    document.body.classList.remove('excel-classic-mode');
    btn.textContent = '📊 Mode Excel Classic';
    showToast('🎨 Mode Premium (Glass) diaktifkan!');
  }
}

// ── Download Image ───────────────────────────
async function downloadPNG() {
  let count = 0;
  CATEGORIES.forEach(cat => {
    TEAM_COLS.forEach(col => {
      if (slots[cat.id][col.id]) count++;
    });
  });

  if (count === 0) {
    showToast('⚠️ Isi minimal 1 sel di tabel terlebih dahulu!');
    return;
  }

  const target = document.getElementById('matrixWrapper');
  if (!target) return;

  const btn = document.getElementById('btnSave');
  if (btn) btn.innerHTML = '⏳ Memproses...';

  const nameInput = document.getElementById('groupName');
  if (nameInput) nameInput.setAttribute('value', nameInput.value);

  showToast('⏳ Sedang memproses gambar, mohon tunggu...');

  try {
    const canvas = await html2canvas(target, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#191228',
      logging: false,
      ignoreElements: (el) => el.classList && el.classList.contains('btn-cell-remove'),
    });

    // Gunakan Blob download agar stabil di semua browser
    canvas.toBlob(function(blob) {
      if (!blob) {
        showToast('❌ Browser memblokir export gambar. Buka halaman via server lokal (lihat panduan).');
        if (btn) btn.innerHTML = '⬇️ Download Image';
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const groupName = (getGroupName() || 'JKT48').replace(/\s+/g, '_');
      link.download = `${groupName}_Ultimate_JKT48.jpg`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 5000);
      showToast('✅ Berhasil mengunduh gambar!');
      if (btn) btn.innerHTML = '⬇️ Download Image';
    }, 'image/jpeg', 0.95);

  } catch (err) {
    console.error('Error generating image:', err);
    if (window.location.protocol === 'file:') {
      showToast('❌ Download diblokir browser (file://). Jalankan: npx http-server di terminal lalu buka http://localhost:8080');
    } else {
      showToast('❌ Gagal mengunduh gambar: ' + (err.message || 'Silakan coba lagi'));
    }
    if (btn) btn.innerHTML = '⬇️ Download Image';
  }
}

// ── Group / Player Name Helpers ─────────────
function generateRandomName() {
  const name = RANDOM_GROUP_NAMES[Math.floor(Math.random() * RANDOM_GROUP_NAMES.length)];
  document.getElementById('groupName').value = name;
  showToast(`🎲 Nama diubah menjadi "${name}"`);
}

function getGroupName() {
  const val = document.getElementById('groupName').value.trim();
  return val || 'JKT48 Fans';
}

// ── Share ─────────────────────────────────────
function getShareText() {
  const name = getGroupName();
  const score = calculateGroupScore();
  return `🌸 JKT48 Ultimate Matrix oleh ${name} (Score: ${score})\n\nBuat dan isi tabel idol impianmu per kategori & tim di: Build Your Ultimate Idol JKT48! #JKT48 #BuildYourUltimateIdol`;
}

function shareGroup() {
  const desc = getShareText();
  document.getElementById('modalShareDesc').textContent = desc;
  document.getElementById('modalShare').classList.add('open');
}

function shareToTwitter() {
  const text = encodeURIComponent(getShareText(document.getElementById('shareTwitterBtn').dataset.groupId || null));
  window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank', 'width=600,height=400');
}

function shareToFacebook() {
  const text = encodeURIComponent(getShareText(null));
  window.open(`https://www.facebook.com/sharer/sharer.php?quote=${text}&u=${encodeURIComponent(window.location.href)}`, '_blank', 'width=600,height=400');
}

function shareToWhatsapp() {
  const text = encodeURIComponent(getShareText(null));
  window.open(`https://wa.me/?text=${text}`, '_blank');
}

async function copyShareLink() {
  const text = getShareText(null);
  try {
    await navigator.clipboard.writeText(text);
    showToast('📋 Teks berhasil disalin!');
  } catch {
    showToast('⚠️ Gagal menyalin - coba secara manual');
  }
}

// ── Tab Navigation ────────────────────────────
function showTab(tab) {
  if (tab === 'guide') {
    document.getElementById('modalGuide')?.classList.add('open');
    return;
  }
  if (tab === 'build') {
    closeModal('modalGuide');
    return;
  }
}

// ── Modal Helpers ─────────────────────────────
function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
}

// ── Toast ─────────────────────────────────────
let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ── Utility ───────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── Background Particles ──────────────────────
function initParticles() {
  const container = document.getElementById('bgParticles');
  const emojis = ['🌸', '✨', '⭐', '💫', '🌟', '💜', '🎵', '🎤', '👑'];
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position:absolute;
      font-size:${10 + Math.random()*16}px;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      opacity:${0.05 + Math.random()*0.12};
      animation: particleFloat ${6+Math.random()*10}s ease-in-out ${Math.random()*-12}s infinite;
      pointer-events:none;
      user-select:none;
    `;
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    container.appendChild(p);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleFloat {
      0%,100% { transform: translateY(0) rotate(0deg); }
      25% { transform: translateY(-30px) rotate(10deg); }
      75% { transform: translateY(20px) rotate(-10deg); }
    }
  `;
  document.head.appendChild(style);
}

// ── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  renderMatrixTable();
  updateStats();
  loadMembers();

  // Close modals on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      ['modalShare', 'modalGuide'].forEach(closeModal);
    }
  });

  // Dynamic table zoom-out for mobile
  scaleMatrixTable();
  window.addEventListener('resize', scaleMatrixTable);
});

// ── Dynamic Table Scale (Mobile Zoom-Out) ─────
function scaleMatrixTable() {
  const table = document.getElementById('idolMatrixTable');
  const wrapper = document.getElementById('matrixWrapper');
  if (!table || !wrapper) return;

  const DESIGN_WIDTH = 680; // px — the table's natural width

  if (window.innerWidth <= 600) {
    // Available width = wrapper's client width (minus any margin/padding)
    const availW = wrapper.clientWidth || window.innerWidth - 16;
    const scale = Math.min(1, availW / DESIGN_WIDTH);
    const scaledHeight = table.scrollHeight * scale;

    table.style.width = DESIGN_WIDTH + 'px';
    table.style.minWidth = DESIGN_WIDTH + 'px';
    table.style.maxWidth = DESIGN_WIDTH + 'px';
    table.style.transform = `scale(${scale})`;
    table.style.transformOrigin = 'top left';
    // Collapse whitespace left by scale transform
    table.style.marginBottom = (scaledHeight - table.scrollHeight) + 'px';

    // Keep wrapper height correct so page doesn't have huge blank gap
    wrapper.style.height = (scaledHeight + 12) + 'px';
    wrapper.style.overflow = 'hidden';
  } else {
    // Reset on desktop
    table.style.width = '';
    table.style.minWidth = '';
    table.style.maxWidth = '';
    table.style.transform = '';
    table.style.transformOrigin = '';
    table.style.marginBottom = '';
    wrapper.style.height = '';
    wrapper.style.overflow = '';
  }
}
