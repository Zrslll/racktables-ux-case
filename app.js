// Прототип логики: фильтры, поиск, сортировка, density, inline-edit.
// Без фреймворков, чтобы файл открывался двойным кликом.

(function () {
  const state = {
    search: '',
    filters: { type: new Set(), row: new Set(), status: new Set(), tag: new Set() },
    sort: { key: 'name', dir: 'asc' },
    density: 'comfortable',
  };

  // ---------- helpers ----------
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }

  function showToast(msg) {
    const t = $('#toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(showToast._tid);
    showToast._tid = setTimeout(() => t.classList.remove('show'), 1400);
  }

  // ---------- counts on chips ----------
  function updateChipCounts() {
    const objs = window.OBJECTS || [];
    const counts = { type: {}, row: {}, status: {} };
    objs.forEach(o => {
      counts.type[o.type] = (counts.type[o.type] || 0) + 1;
      counts.row[o.row] = (counts.row[o.row] || 0) + 1;
      counts.status[o.status] = (counts.status[o.status] || 0) + 1;
    });
    $$('[data-count-for]').forEach(el => {
      const [k, v] = el.getAttribute('data-count-for').split(':');
      el.textContent = (counts[k] && counts[k][v]) || 0;
    });
  }

  // ---------- filtering ----------
  function applyFilters(rows) {
    const s = state.search.trim().toLowerCase();
    return rows.filter(o => {
      if (s) {
        const hay = [o.name, o.type, o.label, o.tag, o.location].join(' ').toLowerCase();
        if (!hay.includes(s)) return false;
      }
      if (state.filters.type.size && !state.filters.type.has(o.type)) return false;
      if (state.filters.row.size && !state.filters.row.has(o.row)) return false;
      if (state.filters.status.size && !state.filters.status.has(o.status)) return false;
      if (state.filters.tag.size) {
        const ok = o.tags && o.tags.some(t => state.filters.tag.has(t));
        if (!ok) return false;
      }
      return true;
    });
  }

  function applySort(rows) {
    const { key, dir } = state.sort;
    const mul = dir === 'asc' ? 1 : -1;
    return rows.slice().sort((a, b) => {
      const av = (a[key] || '').toString().toLowerCase();
      const bv = (b[key] || '').toString().toLowerCase();
      if (av < bv) return -1 * mul;
      if (av > bv) return 1 * mul;
      return 0;
    });
  }

  // ---------- render ----------
  function render() {
    const objs = window.OBJECTS || [];
    let rows = applyFilters(objs);
    rows = applySort(rows);

    const tbody = $('#tbody');
    tbody.innerHTML = '';
    rows.forEach(o => {
      const tr = document.createElement('tr');
      tr.className = 'status-' + o.status;
      tr.dataset.id = o.id;

      const tagHtml = (o.tags && o.tags.length)
        ? '<div class="cell-tags">' + o.tags.map(t => '<span class="tag">' + t + '</span>').join('') + '</div>'
        : '<span style="color:var(--text-faint)">—</span>';

      const statusHtml = o.status === 'ok'
        ? '<span class="status-badge ok"><span class="dot"></span>OK</span>'
        : o.status === 'warning'
          ? '<span class="status-badge warning" title="' + (o.problemReason || '') + '"><span class="dot"></span>Warning</span>'
          : '<span class="status-badge problem" title="' + (o.problemReason || '') + '"><span class="dot"></span>Problem</span>';

      tr.innerHTML =
        '<td><a href="object.html?id=' + o.id + '">' + (o.name || '—') + '</a></td>' +
        '<td><span class="type-pill">' + o.type + '</span></td>' +
        '<td>' + (o.label || '<span style="color:var(--text-faint)">—</span>') + '</td>' +
        '<td>' + (o.tag || '<span style="color:var(--text-faint)">—</span>') + '</td>' +
        '<td><a href="#" data-loc-filter="' + o.row + '">' + o.location + '</a></td>' +
        '<td>' + statusHtml + '</td>' +
        '<td>' + tagHtml + '</td>';

      tr.addEventListener('click', e => {
        if (e.target.tagName === 'A') return;
        window.location.href = 'object.html?id=' + o.id;
      });

      tbody.appendChild(tr);
    });

    $('#resultCount').textContent = '(' + rows.length + ' of ' + objs.length + ')';
    $('#footerSummary').textContent = 'Showing ' + rows.length + ' of ' + objs.length;

    renderFilterSummary();
    updateSortHeaders();
  }

  function renderFilterSummary() {
    const parts = [];
    Object.keys(state.filters).forEach(k => {
      state.filters[k].forEach(v => parts.push('<strong>' + k + ':</strong>&nbsp;' + v));
    });
    if (state.search) parts.unshift('<strong>search:</strong>&nbsp;«' + state.search + '»');

    const el = $('#filterSummary');
    if (!parts.length) {
      el.innerHTML = '<span style="color:var(--text-faint)">No filters applied — showing all objects</span>';
      return;
    }
    el.innerHTML = parts.join(' &nbsp;·&nbsp; ') + ' <a class="clear" id="clearAll">clear all</a>';
    $('#clearAll').addEventListener('click', () => {
      state.search = '';
      $('#search').value = '';
      Object.keys(state.filters).forEach(k => state.filters[k].clear());
      $$('.chip.active').forEach(c => c.classList.remove('active'));
      render();
    });
  }

  function updateSortHeaders() {
    $$('th.sortable').forEach(th => {
      th.classList.remove('sorted');
      const arrow = $('.sort-arrow', th);
      if (arrow) arrow.textContent = '↕';
      if (th.dataset.sort === state.sort.key) {
        th.classList.add('sorted');
        if (arrow) arrow.textContent = state.sort.dir === 'asc' ? '↑' : '↓';
      }
    });
  }

  // ---------- wiring ----------
  function init() {
    updateChipCounts();

    $('#search').addEventListener('input', e => {
      state.search = e.target.value;
      render();
    });

    $$('.chip[data-filter]').forEach(chip => {
      chip.addEventListener('click', () => {
        const k = chip.dataset.filter;
        const v = chip.dataset.value;
        if (v === '*') { showToast('More filters — placeholder'); return; }
        const set = state.filters[k];
        if (!set) return;
        if (set.has(v)) { set.delete(v); chip.classList.remove('active'); }
        else { set.add(v); chip.classList.add('active'); }
        render();
      });
    });

    $$('th.sortable').forEach(th => {
      th.addEventListener('click', () => {
        const k = th.dataset.sort;
        if (state.sort.key === k) {
          state.sort.dir = state.sort.dir === 'asc' ? 'desc' : 'asc';
        } else {
          state.sort.key = k;
          state.sort.dir = 'asc';
        }
        render();
      });
    });

    $$('.density-toggle button').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.density-toggle button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.density = btn.dataset.density;
        $('#tableWrap').classList.toggle('dense', state.density === 'dense');
      });
    });

    $('#saveView').addEventListener('click', () => {
      showToast('View saved to "My lists"');
    });

    // Quick-filter on location link
    document.addEventListener('click', e => {
      const link = e.target.closest('[data-loc-filter]');
      if (!link) return;
      e.preventDefault();
      const v = link.dataset.locFilter;
      const chip = document.querySelector('.chip[data-filter="row"][data-value="' + v + '"]');
      if (chip) chip.click();
    });

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
