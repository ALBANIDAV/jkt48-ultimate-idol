/* =============================================
   BUILD YOUR ULTIMATE IDOL – JKT48
   v7.0 – Modal Picker, No Drag Panel
   ============================================= */

// ── Constants & Config ──────────────────────
const CATEGORIES = [
  { id: 'visual', emoji: '<i data-lucide="eye" style="width:16px;height:16px;"></i>', title: 'Visual' },
  { id: 'dance', emoji: '<i data-lucide="music-4" style="width:16px;height:16px;"></i>', title: 'Dance' },
  { id: 'vocal', emoji: '<i data-lucide="mic-2" style="width:16px;height:16px;"></i>', title: 'Vocal' },
  { id: 'fanservice', emoji: '<i data-lucide="heart" style="width:16px;height:16px;"></i>', title: 'Fan Service' },
  { id: 'mc', emoji: '<i data-lucide="mic" style="width:16px;height:16px;"></i>', title: 'MC' },
  { id: 'stage', emoji: '<i data-lucide="star" style="width:16px;height:16px;"></i>', title: 'Stage Performance' },
  { id: 'fashion', emoji: '<i data-lucide="shirt" style="width:16px;height:16px;"></i>', title: 'Fashion Sense' },
  { id: 'leadership', emoji: '<i data-lucide="crown" style="width:16px;height:16px;"></i>', title: 'Leadership' },
  { id: 'aura', emoji: '<i data-lucide="sparkles" style="width:16px;height:16px;"></i>', title: 'Aura' },
];

const TEAM_COLS = [
  { id: 'love', name: 'Love', matchTeam: 'Team Love' },
  { id: 'dream', name: 'Dream', matchTeam: 'Team Dream' },
  { id: 'passion', name: 'Passion', matchTeam: 'Team Passion' },
  { id: 'trainee', name: 'Trainee', matchTeam: 'Trainee' },
  { id: 'jkt48', name: 'JKT48', matchTeam: 'ANY' },
];

const RANDOM_GROUP_NAMES = [
  'Ferdy', 'Aditya', 'Rizky', 'Bima', 'Andika', 'Dimas',
  'Fauzan', 'Satria', 'Bayu', 'Reza', 'Gilang', 'Deka',
  'Pratama', 'Arif', 'Yudha', 'Farhan', 'Naufal', 'Bagas',
];

const TIER_CONFIG = [
  { min: 90, name: '👑 LEGENDARY', class: 'tier-legendary' },
  { min: 75, name: '💜 EPIC', class: 'tier-epic' },
  { min: 55, name: '💎 GREAT', class: 'tier-great' },
  { min: 35, name: '✅ GOOD', class: 'tier-good' },
  { min: 0, name: '🌱 STARTER', class: 'tier-starter' },
];

// ── Fallback JKT48 Member Data ──────────────
const FALLBACK_MEMBERS = [
  // Team Love (15 members)
  { id: 9, name: 'Alya Amanda', nickname: 'Alya', team: 'Team Love', img: null, gen: '11th' },
  { id: 3, name: 'Anindya Ramadhani', nickname: 'Anin', team: 'Team Love', img: null, gen: '11th' },
  { id: 10, name: 'Aurellia', nickname: 'Lia', team: 'Team Love', img: null, gen: '10th' },
  { id: 11, name: 'Aurhel Alana', nickname: 'Lana', team: 'Team Love', img: null, gen: '12th' },
  { id: 8, name: 'Cathleen Nixie', nickname: 'Nixie', team: 'Team Love', img: null, gen: '11th' },
  { id: 5, name: 'Celline Thefani', nickname: 'Elin', team: 'Team Love', img: null, gen: '11th' },
  { id: 7, name: 'Cynthia Yaputera', nickname: 'Cynthia', team: 'Team Love', img: null, gen: '11th' },
  { id: 1, name: 'Fiony Alveria', nickname: 'Fiony', team: 'Team Love', img: null, gen: '8th' },
  { id: 14, name: 'Fritzy Rosmerian', nickname: 'Fritzy', team: 'Team Love', img: null, gen: '12th' },
  { id: 6, name: 'Grace Octaviani', nickname: 'Gracie', team: 'Team Love', img: null, gen: '11th' },
  { id: 12, name: 'Hillary Abigail', nickname: 'Lily', team: 'Team Love', img: null, gen: '12th' },
  { id: 2, name: 'Indah Cahya', nickname: 'Indah', team: 'Team Love', img: null, gen: '9th' },
  { id: 13, name: 'Jazzlyn Trisha', nickname: 'Trisha', team: 'Team Love', img: null, gen: '12th' },
  { id: 4, name: 'Michelle Alexandra', nickname: 'Michie', team: 'Team Love', img: null, gen: '11th' },
  { id: 15, name: 'Nayla Suji', nickname: 'Nayla', team: 'Team Love', img: null, gen: '12th' },
  // Team Dream (12 members)
  { id: 26, name: 'Adeline Wijaya', nickname: 'Delynn', team: 'Team Dream', img: null, gen: '12th' },
  { id: 18, name: 'Febriola Sinambela', nickname: 'Olla', team: 'Team Dream', img: null, gen: '7th' },
  { id: 17, name: 'Freya Jayawardana', nickname: 'Freya', team: 'Team Dream', img: null, gen: '7th' },
  { id: 22, name: 'Gabriela Abigail', nickname: 'Ella', team: 'Team Dream', img: null, gen: '10th' },
  { id: 16, name: 'Gita Sekar Andarini', nickname: 'Gita', team: 'Team Dream', img: null, gen: '6th' },
  { id: 23, name: 'Greesella Adhalia', nickname: 'Greesel', team: 'Team Dream', img: null, gen: '11th' },
  { id: 19, name: 'Helisma Putri', nickname: 'Eli', team: 'Team Dream', img: null, gen: '7th' },
  { id: 21, name: 'Jesslyn Elly', nickname: 'Lyn', team: 'Team Dream', img: null, gen: '10th' },
  { id: 20, name: 'Marsha Lenathea', nickname: 'Marsha', team: 'Team Dream', img: null, gen: '9th' },
  { id: 27, name: 'Nina Tutachia', nickname: 'Nachia', team: 'Team Dream', img: null, gen: '12th' },
  { id: 25, name: 'Oline Manuel', nickname: 'Oline', team: 'Team Dream', img: null, gen: '12th' },
  { id: 24, name: 'Shabilqis Naila', nickname: 'Nala', team: 'Team Dream', img: null, gen: '12th' },
  // Team Passion (15 members)
  { id: 40, name: 'Abigail Rachel', nickname: 'Aralie', team: 'Team Passion', img: null, gen: '12th' },
  { id: 28, name: 'Angelina Christy', nickname: 'Christy', team: 'Team Passion', img: null, gen: '7th' },
  { id: 38, name: 'Catherina Vallencia', nickname: 'Erine', team: 'Team Passion', img: null, gen: '12th' },
  { id: 32, name: 'Cornelia Vanisa', nickname: 'Oniel', team: 'Team Passion', img: null, gen: '8th' },
  { id: 36, name: 'Dena Natalia', nickname: 'Danella', team: 'Team Passion', img: null, gen: '11th' },
  { id: 35, name: 'Desy Natalia', nickname: 'Daisy', team: 'Team Passion', img: null, gen: '11th' },
  { id: 99, name: 'Feni Fitriyanti', nickname: 'Feni', team: 'Team Passion', img: null, gen: '3rd' },
  { id: 30, name: 'Jessica Chandra', nickname: 'Jessi', team: 'Team Passion', img: null, gen: '7th' },
  { id: 33, name: 'Kathrina Irene', nickname: 'Kathrina', team: 'Team Passion', img: null, gen: '9th' },
  { id: 31, name: 'Lulu Salsabila', nickname: 'Lulu', team: 'Team Passion', img: null, gen: '8th' },
  { id: 39, name: 'Michelle Levia', nickname: 'Levi', team: 'Team Passion', img: null, gen: '12th' },
  { id: 29, name: 'Mutiara Azzahra', nickname: 'Muthe', team: 'Team Passion', img: null, gen: '7th' },
  { id: 34, name: 'Raisha Syifa', nickname: 'Raisha', team: 'Team Passion', img: null, gen: '10th' },
  { id: 41, name: 'Ribka Budiman', nickname: 'Ribka', team: 'Team Passion', img: null, gen: '12th' },
  { id: 37, name: 'Victoria Kimberly', nickname: 'Kimmy', team: 'Team Passion', img: null, gen: '12th' },
  // Trainee (19 members)
  { id: 51, name: 'Afera Thalia', nickname: 'Fera', team: 'Trainee', img: null, gen: '14th' },
  { id: 42, name: 'Astrella Virgiananda', nickname: 'Virgi', team: 'Trainee', img: null, gen: '13th' },
  { id: 43, name: 'Aulia Riza', nickname: 'Auwia', team: 'Trainee', img: null, gen: '13th' },
  { id: 44, name: 'Bong Aprilli', nickname: 'Rilly', team: 'Trainee', img: null, gen: '13th' },
  { id: 52, name: 'Carissa Dini', nickname: 'Carissa', team: 'Trainee', img: null, gen: '14th' },
  { id: 53, name: 'Christabella Bonita', nickname: 'Bella', team: 'Trainee', img: null, gen: '14th' },
  { id: 54, name: 'Fahira Putri', nickname: 'Fahira', team: 'Trainee', img: null, gen: '14th' },
  { id: 55, name: 'Fatimah Azzahra', nickname: 'Rara', team: 'Trainee', img: null, gen: '14th' },
  { id: 45, name: 'Hagia Sopia', nickname: 'Giaa', team: 'Trainee', img: null, gen: '13th' },
  { id: 56, name: 'Heidi Suyangga', nickname: 'Heidi', team: 'Trainee', img: null, gen: '14th' },
  { id: 46, name: 'Humaira Ramadhani', nickname: 'Maira', team: 'Trainee', img: null, gen: '13th' },
  { id: 47, name: 'Jacqueline Immanuela', nickname: 'Ekin', team: 'Trainee', img: null, gen: '13th' },
  { id: 48, name: 'Jemima Evodie', nickname: 'Jemima', team: 'Trainee', img: null, gen: '13th' },
  { id: 57, name: 'Maxine Faye', nickname: 'Maxine', team: 'Trainee', img: null, gen: '14th' },
  { id: 49, name: 'Mikaela Kusjanto', nickname: 'Mikaela', team: 'Trainee', img: null, gen: '13th' },
  { id: 50, name: 'Nur Intan', nickname: 'Intan', team: 'Trainee', img: null, gen: '13th' },
  { id: 58, name: 'Putry Jazyta', nickname: 'Jazzy', team: 'Trainee', img: null, gen: '14th' },
  { id: 59, name: 'Ralyne Van Irwan', nickname: 'Ralyne', team: 'Trainee', img: null, gen: '14th' },
  { id: 60, name: 'Sona Kalyana', nickname: 'Sona', team: 'Trainee', img: null, gen: '14th' },
];

// ── State ──────────────────────────────────
let allMembers = [];
let slots = {};
let isExcelMode = false;

// Picker state
let pickerCatId = null;
let pickerColId = null;
let pickerFilterTeam = '';

// ── Local Storage ─────────────────────────
function saveSlotsToStorage() {
  const data = {};
  for (let catId in slots) {
    data[catId] = {};
    for (let colId in slots[catId]) {
      const m = slots[catId][colId];
      data[catId][colId] = m ? m.id : null;
    }
  }
  localStorage.setItem('jkt48_slots', JSON.stringify(data));
}

function loadSlotsFromStorage() {
  const stored = localStorage.getItem('jkt48_slots');
  if (!stored) return;
  try {
    const data = JSON.parse(stored);
    for (let catId in data) {
      if (!slots[catId]) continue;
      for (let colId in data[catId]) {
        if (slots[catId][colId] === undefined) continue;
        const memberId = data[catId][colId];
        if (memberId) {
          const member = allMembers.find(m => m.id === memberId);
          if (member) slots[catId][colId] = member;
        }
      }
    }
  } catch (e) {
    console.error('Error loading slots', e);
  }
}

// Pre-initialize slots
CATEGORIES.forEach(cat => {
  slots[cat.id] = {};
  TEAM_COLS.forEach(col => { slots[cat.id][col.id] = null; });
});

// ── Photo Helpers ─────────────────────────
function getLocalPhotoPath(name, teamOrType) {
  let folder = 'Team Love';
  if (teamOrType === 'Team Dream') folder = 'Team Dream';
  else if (teamOrType === 'Team Passion') folder = 'Team Passion';
  else if (teamOrType === 'Trainee') folder = 'Trainee';
  const cleanName = (name || 'Unknown').trim().replace(/\s+/g, '_');
  return encodeURI(`${folder}/${cleanName}.jpg`);
}

function onPhotoError(imgEl, team) {
  const wrap = imgEl.parentElement;
  if (wrap) {
    wrap.innerHTML = `<div class="picker-member-placeholder">${getTeamEmoji(team)}</div>`;
  }
}

function onCellPhotoError(imgEl, team) {
  const wrap = imgEl.parentElement;
  if (wrap) {
    const name = wrap.querySelector('.cell-member-name');
    const btn = wrap.querySelector('.btn-cell-remove');
    const nameHtml = name ? name.outerHTML : '';
    const btnHtml = btn ? btn.outerHTML : '';
    imgEl.outerHTML = `<div class="cell-mini-emoji">${getTeamEmoji(team)}</div>`;
  }
}

function getTeamEmoji(team) {
  const map = {
    'Team Love': '<i data-lucide="heart" style="width:14px;height:14px;"></i>',
    'Team Dream': '<i data-lucide="cloud" style="width:14px;height:14px;"></i>',
    'Team Passion': '<i data-lucide="flame" style="width:14px;height:14px;"></i>',
    'Trainee': '<i data-lucide="leaf" style="width:14px;height:14px;"></i>',
  };
  return map[team] || '<i data-lucide="user" style="width:14px;height:14px;"></i>';
}

// ── Load Members ─────────────────────────
function loadMembers() {
  allMembers = FALLBACK_MEMBERS.map(m => ({
    ...m,
    img: getLocalPhotoPath(m.name, m.team),
  }));
  loadSlotsFromStorage();
  renderMatrixTable();
  updateStats();
}

// ── Render Matrix Table ─────────────────────
function renderMatrixTable() {
  const tbody = document.getElementById('matrixTableBody');
  if (!tbody) return;

  tbody.innerHTML = CATEGORIES.map(cat => {
    const cellsHtml = TEAM_COLS.map(col => {
      const placed = slots[cat.id][col.id];
      return `
        <td class="td-matrix-cell"
            id="cell-${cat.id}-${col.id}"
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

  if (window.lucide) lucide.createIcons();
}

function renderCellContent(member, catId, colId) {
  const imgHtml = member.img
    ? `<img class="cell-mini-avatar" src="${escHtml(member.img)}" alt="${escHtml(member.nickname)}" referrerpolicy="no-referrer" onerror="onCellPhotoError(this, '${escHtml(member.team)}')">`
    : `<div class="cell-mini-emoji">${getTeamEmoji(member.team)}</div>`;

  return `
    <div class="cell-content-pill">
      ${imgHtml}
      <span class="cell-member-name">${escHtml(member.nickname || member.name)}</span>
      <button class="btn-cell-remove" onclick="removeMemberCell(event, '${catId}', '${colId}')" title="Hapus"><i data-lucide="x" style="width:12px;height:12px;"></i></button>
    </div>`;
}

// ── Cell Click → Open Member Picker ─────────
function onCellClick(catId, colId) {
  openMemberPicker(catId, colId);
}

function openMemberPicker(catId, colId) {
  pickerCatId = catId;
  pickerColId = colId;
  pickerFilterTeam = '';

  const catObj = CATEGORIES.find(c => c.id === catId);
  const colObj = TEAM_COLS.find(c => c.id === colId);

  // Update header
  document.getElementById('pickerCatIcon').innerHTML = catObj.emoji;
  document.getElementById('pickerCatTitle').textContent = `${catObj.title} — ${colObj.name}`;

  const subtitle = colObj.matchTeam === 'ANY'
    ? 'Pilih dari semua tim (All-Star)'
    : `Hanya anggota ${colObj.matchTeam}`;
  document.getElementById('pickerTeamBadge').textContent = subtitle;

  // Show/hide team filter tabs (only for JKT48 column)
  const filtersEl = document.getElementById('pickerTeamFilters');
  if (colObj.matchTeam === 'ANY') {
    const teams = ['Semua', 'Team Love', 'Team Dream', 'Team Passion', 'Trainee'];
    filtersEl.innerHTML = teams.map(t => {
      const val = t === 'Semua' ? '' : t;
      const label = t === 'Semua' ? 'Semua' : t.replace('Team ', '');
      return `<button class="picker-team-tab ${val === '' ? 'active' : ''}" onclick="setPickerTeamFilter('${val}')">${label}</button>`;
    }).join('');
    filtersEl.style.display = 'flex';
  } else {
    filtersEl.innerHTML = '';
    filtersEl.style.display = 'none';
  }

  // Show/hide remove button
  const removeBtn = document.getElementById('pickerBtnRemove');
  removeBtn.style.display = slots[catId][colId] ? 'inline-flex' : 'none';

  // Clear search
  const searchInput = document.getElementById('pickerSearchInput');
  searchInput.value = '';
  const clearBtn = document.getElementById('btnPickerClearSearch');
  if (clearBtn) clearBtn.classList.remove('show');

  renderPickerGrid();
  document.getElementById('modalMemberPicker').classList.add('open');

  if (window.lucide) lucide.createIcons();
}

function setPickerTeamFilter(team) {
  pickerFilterTeam = team;
  document.querySelectorAll('.picker-team-tab').forEach(tab => {
    const isActive = (team === '' && tab.textContent === 'Semua') || tab.textContent === team.replace('Team ', '');
    tab.classList.toggle('active', isActive);
  });
  renderPickerGrid();
}

function filterPickerMembers() {
  const q = document.getElementById('pickerSearchInput').value.trim();
  const clearBtn = document.getElementById('btnPickerClearSearch');
  if (clearBtn) clearBtn.classList.toggle('show', q.length > 0);
  renderPickerGrid();
}

function clearPickerSearch() {
  document.getElementById('pickerSearchInput').value = '';
  const clearBtn = document.getElementById('btnPickerClearSearch');
  if (clearBtn) clearBtn.classList.remove('show');
  renderPickerGrid();
}

function renderPickerGrid() {
  const grid = document.getElementById('pickerMembersGrid');
  const colObj = TEAM_COLS.find(c => c.id === pickerColId);
  const q = (document.getElementById('pickerSearchInput')?.value || '').toLowerCase().trim();

  // Filter members by team
  let members = allMembers;
  if (colObj.matchTeam !== 'ANY') {
    members = members.filter(m => m.team === colObj.matchTeam);
  } else if (pickerFilterTeam) {
    members = members.filter(m => m.team === pickerFilterTeam);
  }

  // Filter by search
  if (q) {
    members = members.filter(m => m.name.toLowerCase().includes(q) || m.nickname.toLowerCase().includes(q));
  }

  const currentPlaced = slots[pickerCatId]?.[pickerColId];

  if (!members.length) {
    grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:30px; color:var(--text-muted);">Tidak ditemukan</div>`;
    return;
  }

  grid.innerHTML = members.map(m => {
    const isSelected = currentPlaced?.id === m.id;
    const imgHtml = m.img
      ? `<img class="picker-member-img" src="${escHtml(m.img)}" alt="${escHtml(m.name)}" referrerpolicy="no-referrer" onerror="onPhotoError(this, '${escHtml(m.team)}')" loading="lazy">`
      : `<div class="picker-member-placeholder">${getTeamEmoji(m.team)}</div>`;

    return `
      <div class="picker-member-card ${isSelected ? 'selected-in-slot' : ''}"
           onclick="selectMemberFromPicker(${m.id})"
           title="${escHtml(m.name)} (${escHtml(m.team)})">
        ${imgHtml}
        <div class="picker-member-name">${escHtml(m.nickname)}</div>
        <div class="picker-member-gen">${escHtml(m.gen)}</div>
      </div>`;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

function selectMemberFromPicker(memberId) {
  const member = allMembers.find(m => m.id === memberId);
  if (!member || !pickerCatId || !pickerColId) return;

  slots[pickerCatId][pickerColId] = member;
  saveSlotsToStorage();
  renderMatrixTable();
  updateStats();
  closeModal('modalMemberPicker');

  const catObj = CATEGORIES.find(c => c.id === pickerCatId);
  const colObj = TEAM_COLS.find(c => c.id === pickerColId);
  if (colObj.id === 'jkt48') {
    showToast(`👑 ${member.nickname} menjadi Ultimate JKT48 untuk ${catObj.title}!`);
  } else {
    showToast(`🌸 ${member.nickname} → ${catObj.title} (${colObj.name})`);
  }
}

function clearActivePickerSlot() {
  if (pickerCatId && pickerColId) {
    slots[pickerCatId][pickerColId] = null;
    saveSlotsToStorage();
    renderMatrixTable();
    updateStats();
    closeModal('modalMemberPicker');
    showToast('🗑️ Slot dikosongkan');
  }
}

// ── Remove Member from Cell ─────────────────
function removeMemberCell(event, catId, colId) {
  if (event) event.stopPropagation();
  slots[catId][colId] = null;
  saveSlotsToStorage();
  renderMatrixTable();
  updateStats();
  showToast('🗑️ Anggota dihapus dari sel');
}

// ── Confirm & Clear All ─────────────────────
function confirmClearAll() {
  let count = 0;
  CATEGORIES.forEach(cat => { TEAM_COLS.forEach(col => { if (slots[cat.id][col.id]) count++; }); });
  if (count === 0) {
    showToast('ℹ️ Tabel sudah kosong');
    return;
  }
  document.getElementById('modalConfirmClear').classList.add('open');
}

function executeClearAll() {
  CATEGORIES.forEach(cat => { TEAM_COLS.forEach(col => { slots[cat.id][col.id] = null; }); });
  localStorage.removeItem('jkt48_slots');
  renderMatrixTable();
  updateStats();
  closeModal('modalConfirmClear');
  showToast('🗑️ Semua 45 sel tabel dikosongkan');
}

// ── Stats ────────────────────────────────────
function calculateGroupScore() {
  let total = 0, count = 0;
  CATEGORIES.forEach(cat => {
    TEAM_COLS.forEach(col => {
      const m = slots[cat.id][col.id];
      if (m) {
        total += 60 + ((m.id * 7 + cat.id.charCodeAt(0) * 3) % 40);
        count++;
      }
    });
  });
  return count === 0 ? 0 : Math.round((total / count) * (count / 45));
}

function updateStats() {
  let count = 0;
  CATEGORIES.forEach(cat => { TEAM_COLS.forEach(col => { if (slots[cat.id][col.id]) count++; }); });

  const el = document.getElementById('statMemberCount');
  if (el) {
    el.innerHTML = `<i data-lucide="users" style="width:16px;height:16px;margin-right:6px"></i> ${count} / 45 Slot Terisi`;
    if (window.lucide) lucide.createIcons({ root: el });
  }

  const bar = document.getElementById('matrixProgressBar');
  if (bar) bar.style.width = `${Math.round((count / 45) * 100)}%`;
}

// ── Excel Mode ──────────────────────────────
function toggleExcelMode() {
  isExcelMode = !isExcelMode;
  const btn = document.getElementById('btnToggleExcel');
  if (isExcelMode) {
    document.body.classList.add('excel-classic-mode');
    if (btn) {
      btn.innerHTML = `<i data-lucide="sparkles" style="width:16px;height:16px;margin-right:6px"></i> Mode Premium`;
      if (window.lucide) lucide.createIcons({ root: btn });
    }
    showToast('Mode Excel Classic diaktifkan!');
  } else {
    document.body.classList.remove('excel-classic-mode');
    if (btn) {
      btn.innerHTML = `<i data-lucide="layout-grid" style="width:16px;height:16px;margin-right:6px"></i> Mode Excel Classic`;
      if (window.lucide) lucide.createIcons({ root: btn });
    }
    showToast('Mode Premium diaktifkan!');
  }
}

// ── Download Image ──────────────────────────
async function downloadPNG() {
  let count = 0;
  CATEGORIES.forEach(cat => { TEAM_COLS.forEach(col => { if (slots[cat.id][col.id]) count++; }); });
  if (count === 0) { showToast('⚠️ Isi minimal 1 sel terlebih dahulu!'); return; }

  const target = document.getElementById('matrixWrapper');
  if (!target) return;

  const btn = document.getElementById('btnSave');
  if (btn) btn.innerHTML = '⏳ Memproses...';

  const nameInput = document.getElementById('groupName');
  if (nameInput) nameInput.setAttribute('value', nameInput.value);

  showToast('⏳ Sedang memproses gambar...');

  try {
    const canvas = await html2canvas(target, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#191228',
      logging: false,
      windowWidth: 1200,
      ignoreElements: (el) => el.classList && el.classList.contains('btn-cell-remove'),
    });

    canvas.toBlob(function (blob) {
      if (!blob) {
        showToast('❌ Browser memblokir export gambar.');
        if (btn) btn.innerHTML = '<i data-lucide="download" style="width:16px;height:16px;margin-right:4px"></i> Download Image';
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
      if (btn) btn.innerHTML = '<i data-lucide="download" style="width:16px;height:16px;margin-right:4px"></i> Download Image';
      if (window.lucide) lucide.createIcons({ root: btn });
    }, 'image/jpeg', 0.95);
  } catch (err) {
    console.error('Error generating image:', err);
    showToast('❌ Gagal mengunduh gambar: ' + (err.message || 'Coba lagi'));
    if (btn) btn.innerHTML = '<i data-lucide="download" style="width:16px;height:16px;margin-right:4px"></i> Download Image';
    if (window.lucide) lucide.createIcons({ root: btn });
  }
}

// ── Group Name ──────────────────────────────
function getGroupName() {
  return document.getElementById('groupName')?.value.trim() || 'JKT48 Fans';
}

// ── Share ────────────────────────────────────
function getShareText() {
  const name = getGroupName();
  const score = calculateGroupScore();
  return `🌸 JKT48 Ultimate Matrix oleh ${name} (Score: ${score})\n\nBuat tabel idol impianmu di: Build Your Ultimate Idol JKT48! #JKT48 #BuildYourUltimateIdol`;
}

function shareGroup() {
  document.getElementById('modalShareDesc').textContent = getShareText();
  document.getElementById('modalShare').classList.add('open');
}

function shareToTwitter() {
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText())}`, '_blank', 'width=600,height=400');
}

function shareToWhatsapp() {
  window.open(`https://wa.me/?text=${encodeURIComponent(getShareText())}`, '_blank');
}

async function copyShareLink() {
  try {
    await navigator.clipboard.writeText(getShareText());
    showToast('📋 Teks berhasil disalin!');
  } catch { showToast('⚠️ Gagal menyalin'); }
}

// ── Welcome Modal (first visit) ─────────────
function closeWelcomeModal() {
  closeModal('modalWelcome');
  localStorage.setItem('jkt48_welcome_seen', '1');
}

function showWelcomeIfNeeded() {
  if (!localStorage.getItem('jkt48_welcome_seen')) {
    document.getElementById('modalWelcome')?.classList.add('open');
  }
}

// ── Modal & Toast Helpers ───────────────────
function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
}

let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2800);
}

function escHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderMatrixTable();
  updateStats();
  loadMembers();

  if (window.lucide) lucide.createIcons();

  showWelcomeIfNeeded();

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      ['modalMemberPicker', 'modalConfirmClear', 'modalShare', 'modalWelcome'].forEach(closeModal);
    }
  });
});
