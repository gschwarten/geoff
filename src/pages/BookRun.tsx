
import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';

const BOOKRUN_STYLES = `
  .bookrun * { box-sizing: border-box; margin: 0; padding: 0; }
  .bookrun {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background: #accae5;
    color: #040949;
    min-height: 100vh;
    padding: 16px;
    padding-bottom: 100px;
  }
  .bookrun h1 { font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 700; text-align: center; margin-bottom: 4px; color: #040949; }
  .bookrun .subtitle { text-align: center; color: #040949; opacity: 0.6; font-size: 14px; margin-bottom: 12px; }
  .bookrun .branch-selector {
    display: flex; align-items: center; justify-content: center;
    gap: 8px; margin-bottom: 16px;
  }
  .bookrun .branch-selector label { font-size: 13px; font-weight: 600; }
  .bookrun .branch-selector select {
    font-size: 14px; padding: 6px 10px; border-radius: 8px;
    border: 2px solid #040949; background: white; color: #040949; font-weight: 600;
  }
  .bookrun .loader { display: flex; flex-direction: column; align-items: center; padding: 40px 0; }
  .bookrun .spinner {
    width: 36px; height: 36px;
    border: 3px solid rgba(4,9,73,0.15); border-top-color: #040949;
    border-radius: 50%; animation: bookrun-spin 0.8s linear infinite;
  }
  @keyframes bookrun-spin { to { transform: rotate(360deg); } }
  .bookrun .loader p { margin-top: 12px; color: #040949; opacity: 0.6; font-size: 14px; }
  .bookrun .error-msg {
    background: #fff0f0; border: 1px solid #e8c4c4; color: #8b3a3a;
    padding: 12px 16px; border-radius: 10px; text-align: center; font-size: 14px;
  }
  .bookrun .book-list { list-style: none; }
  .bookrun .book-item {
    background: #ffffff; border-radius: 12px; padding: 12px;
    margin-bottom: 10px; display: flex; align-items: center; gap: 10px;
    box-shadow: 0 1px 3px rgba(4,9,73,0.1); transition: transform 0.2s ease;
  }
  .bookrun .book-item.removed { opacity: 0.35; }
  .bookrun .book-item.kept { border-left: 4px solid #2e7d32; }
  .bookrun .rank { font-size: 13px; font-weight: 700; color: #040949; opacity: 0.4; min-width: 18px; text-align: center; }
  .bookrun .book-cover { width: 60px; height: 90px; border-radius: 4px; object-fit: cover; background: #d8e4ee; flex-shrink: 0; }
  .bookrun .book-info { flex: 1; min-width: 0; }
  .bookrun .book-title {
    font-size: 15px; font-weight: 600; line-height: 1.3; color: #040949;
    overflow: hidden; text-overflow: ellipsis; display: -webkit-box;
    -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  }
  .bookrun .book-author { font-size: 13px; color: #040949; opacity: 0.5; margin-top: 2px; }
  .bookrun .book-rating { font-size: 12px; color: #d4a017; margin-top: 3px; }
  .bookrun .book-reason { font-size: 12px; color: #040949; opacity: 0.65; margin-top: 4px; font-style: italic; }
  .bookrun .drag-handle {
    display: flex; align-items: center; justify-content: center;
    width: 28px; flex-shrink: 0; cursor: grab;
    -webkit-tap-highlight-color: transparent; touch-action: none; user-select: none;
  }
  .bookrun .drag-handle:active { cursor: grabbing; }
  .bookrun .drag-handle svg { width: 20px; height: 20px; fill: rgba(4,9,73,0.25); }
  .bookrun .controls { display: flex; flex-direction: column; gap: 4px; flex-shrink: 0; }
  .bookrun .ctrl-btn {
    width: 32px; height: 28px; border: 1px solid rgba(4,9,73,0.12);
    border-radius: 6px; background: rgba(172,202,229,0.3); color: #040949;
    font-size: 13px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; -webkit-tap-highlight-color: transparent;
  }
  .bookrun .ctrl-btn:active { background: rgba(172,202,229,0.6); }
  .bookrun .ctrl-btn.remove { color: #c44; font-size: 16px; }
  .bookrun .ctrl-btn.keep { color: #2e7d32; font-size: 15px; }
  .bookrun .ctrl-btn.keep.active { background: #2e7d32; color: white; }
  .bookrun .book-item.dragging {
    position: fixed !important; z-index: 1000;
    box-shadow: 0 10px 30px rgba(0,0,0,0.22); opacity: 0.95;
    pointer-events: none; transition: none;
  }
  .bookrun .primary-btn {
    display: block; width: 100%; padding: 16px; background: #040949;
    color: white; border: none; border-radius: 14px; font-size: 17px;
    font-weight: 600; cursor: pointer; margin-top: 16px;
    -webkit-tap-highlight-color: transparent;
  }
  .bookrun .primary-btn:active { background: #060d6b; }
  .bookrun .secondary-btn {
    display: block; width: 100%; padding: 10px; background: #040949;
    color: white; border: none; border-radius: 10px; font-size: 14px;
    font-weight: 600; cursor: pointer; margin-bottom: 14px;
    -webkit-tap-highlight-color: transparent;
  }
  .bookrun .secondary-btn:active { background: #060d6b; }
  .bookrun .scroll-hint {
    text-align: center; padding: 16px; color: #040949; opacity: 0.4; font-size: 13px;
  }
  .bookrun .tabs { display: flex; margin-bottom: 14px; border-radius: 10px; overflow: hidden; border: 2px solid #040949; }
  .bookrun .tab {
    flex: 1; padding: 10px 8px; text-align: center; font-size: 14px; font-weight: 600;
    cursor: pointer; background: #ffffff; color: #040949; border: none;
    -webkit-tap-highlight-color: transparent;
  }
  .bookrun .tab.active { background: #040949; color: white; }
  .bookrun .tab-content { display: none; }
  .bookrun .tab-content.active { display: block; }
  .bookrun .result-card {
    background: #ffffff; border-radius: 12px; padding: 14px;
    margin-bottom: 10px; box-shadow: 0 1px 3px rgba(4,9,73,0.1);
  }
  .bookrun .result-title { font-size: 15px; font-weight: 600; color: #040949; }
  .bookrun .result-author { font-size: 13px; color: #040949; opacity: 0.5; }
  .bookrun .result-status {
    display: inline-block; font-size: 13px; font-weight: 600;
    margin-top: 6px; padding: 3px 10px; border-radius: 20px;
  }
  .bookrun .status-available { background: #e8f5e9; color: #2e7d32; }
  .bookrun .status-park { background: #c8e6c9; color: #1b5e20; }
  .bookrun .status-hold { background: #fff3e0; color: #e65100; }
  .bookrun .status-unknown { background: #f0f0f0; color: #666; }
  .bookrun .result-link { display: inline-block; margin-top: 6px; margin-left: 6px; font-size: 13px; color: #040949; text-decoration: underline; }
  .bookrun .hold-link {
    display: inline-block; margin-top: 8px; padding: 6px 14px;
    background: #040949; color: white; border-radius: 8px;
    font-size: 13px; font-weight: 600; text-decoration: none;
  }
  .bookrun .result-detail { font-size: 13px; color: #040949; opacity: 0.5; margin-top: 4px; }
  .bookrun .refresh-link { display: block; text-align: center; margin-top: 20px; color: #040949; font-size: 14px; text-decoration: underline; cursor: pointer; }
  .bookrun .badge { display: inline-block; background: #040949; color: white; font-size: 12px; font-weight: 700; padding: 1px 7px; border-radius: 10px; margin-left: 6px; }
  .bookrun .footer { background: #ffffff; text-align: center; padding: 16px; margin: 30px -16px -100px -16px; font-size: 13px; color: #040949; opacity: 0.6; }
  .bookrun .footer a { color: #040949; text-decoration: underline; }
`;

const BOOKRUN_HTML = `
<h1>BookRun</h1>
<p class="subtitle">SFPL</p>

<div class="branch-selector">
    <label for="br-branch-select">My branch:</label>
    <select id="br-branch-select">
        <option value="">Loading branches...</option>
    </select>
</div>

<div id="br-app">
    <div id="br-loading-recs" class="loader">
        <div class="spinner"></div>
        <p>Fetching your Goodreads list & ranking with AI...</p>
    </div>

    <div id="br-recs-section" style="display:none;">
        <button id="br-check-btn-top" class="secondary-btn">
            Check Park Availability
        </button>
        <p style="font-size:14px; color:#040949; opacity:0.6; margin-bottom:6px; text-align:center;">
            Your top picks. Tap &#9829; to keep favorites across re-rolls.
        </p>
        <p style="font-size:12px; color:#040949; opacity:0.4; margin-bottom:12px; text-align:center;">
            Top 10 will be checked at the library. Scroll for more.
        </p>
        <p id="br-save-status" style="font-size:12px; color:#040949; opacity:0.5; text-align:center; margin-bottom:8px; display:none;"></p>
        <ul id="br-book-list" class="book-list"></ul>
        <div id="br-scroll-hint" class="scroll-hint" style="display:none;">Loading more...</div>
        <button id="br-check-btn" class="primary-btn">
            Check Park Availability (Top 10)
        </button>
        <a id="br-reroll-link" class="refresh-link">Re-roll recommendations (keeps &#9829;)</a>
    </div>

    <div id="br-loading-library" style="display:none;" class="loader">
        <div class="spinner"></div>
        <p id="br-library-progress">Checking availability... (0 / 0)</p>
    </div>

    <div id="br-results-section" style="display:none;"></div>

    <div id="br-error" style="display:none;" class="error-msg"></div>
</div>

<footer class="footer">
    Made with &#10084;&#65039; by <a href="https://geoff.lovable.app" target="_blank">Geoff</a>
</footer>
`;

const BookRun: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'BookRun | Geoff Schwarten';
    const description = 'An app I made because I kept showing up to the library with 50 books on my Goodreads list and zero clue which ones were actually on the shelf. Now I know before I go.';
    
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (el) {
        el.setAttribute('content', content);
      } else {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        el.setAttribute('content', content);
        document.head.appendChild(el);
      }
    };

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', 'BookRun | Geoff Schwarten');
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', 'https://geoff.lovable.app/bookrun');
    setMeta('property', 'og:image', 'https://geoff.lovable.app/lovable-uploads/bookrun-og.png');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', 'BookRun | Geoff Schwarten');
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', 'https://geoff.lovable.app/lovable-uploads/bookrun-og.png');

    const API = 'https://bookrun.onrender.com';
    let brBooks: any[] = [];
    let brVisibleCount = 10;
    let brSelectedBranch = 'PARK BRANCH';
    let drag: any = null;
    let saveTimeout: ReturnType<typeof setTimeout>;
    let scrollTicking = false;

    const el = (id: string) => document.getElementById(id);

    function brShow(...ids: string[]) { ids.forEach(id => { const e = el(id); if (e) e.style.display = ''; }); }
    function brHide(...ids: string[]) { ids.forEach(id => { const e = el(id); if (e) e.style.display = 'none'; }); }

    function esc(s: string) { if (!s) return ''; const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

    function brStars(rating: number) {
      const full = Math.floor(rating);
      const half = rating - full >= 0.25 && rating - full < 0.75 ? 1 : 0;
      const extraFull = rating - full >= 0.75 ? 1 : 0;
      const empty = 5 - full - half - extraFull;
      return '\u2605'.repeat(full + extraFull) + (half ? '\u00BD' : '') + '\u2606'.repeat(empty);
    }

    function brShowError(msg: string) {
      brHide('br-loading-recs', 'br-loading-library');
      const errEl = el('br-error');
      if (errEl) { errEl.textContent = msg; }
      brShow('br-error');
    }

    function getBranchDisplayName() {
      return brSelectedBranch.replace(' BRANCH', '').replace(/\b\w/g, c => c.toUpperCase());
    }

    function updateBranchButtons() {
      const name = getBranchDisplayName();
      const topBtn = el('br-check-btn-top');
      const bottomBtn = el('br-check-btn');
      if (topBtn) topBtn.textContent = 'Check ' + name + ' Availability';
      if (bottomBtn) bottomBtn.textContent = 'Check ' + name + ' Availability (Top 10)';
    }

    // Branch selector
    async function loadBranches() {
      try {
        const resp = await fetch(API + '/api/branches');
        const data = await resp.json();
        const sel = el('br-branch-select') as HTMLSelectElement;
        if (!sel) return;
        sel.innerHTML = '';
        data.branches.forEach((b: string) => {
          const opt = document.createElement('option');
          opt.value = b;
          opt.textContent = b.replace(' BRANCH', '').replace(/\b\w/g, c => c.toUpperCase());
          if (b === data.default) opt.selected = true;
          sel.appendChild(opt);
        });
        brSelectedBranch = data.default;
        updateBranchButtons();
      } catch (e) {}
    }

    // Recommendations
    async function loadRecommendations(refresh: boolean) {
      brShow('br-loading-recs');
      brHide('br-recs-section', 'br-results-section', 'br-error');

      const kept = brBooks.filter(b => b._kept);

      try {
        const url = API + '/api/recommendations' + (refresh ? '?refresh=1' : '');
        const resp = await fetch(url);
        const data = await resp.json();

        if (data.error) { brShowError(data.error); return; }

        let newBooks = data.books || [];
        if (newBooks.length === 0) { brShowError('No books found on your to-read shelf.'); return; }

        if (refresh && kept.length > 0) {
          const keptTitles = new Set(kept.map((b: any) => b.title.toLowerCase()));
          newBooks = newBooks.filter((b: any) => !keptTitles.has(b.title.toLowerCase()));
          brBooks = [...kept, ...newBooks];
        } else {
          brBooks = newBooks;
        }

        brVisibleCount = 10;
        renderBooks();
        brHide('br-loading-recs');
        brShow('br-recs-section');
      } catch (e: any) {
        brShowError('Failed to load recommendations. ' + e.message);
      }
    }

    // Render books
    function renderBooks() {
      const ul = el('br-book-list');
      if (!ul) return;
      ul.innerHTML = '';

      const toShow = brBooks.slice(0, brVisibleCount);
      toShow.forEach((book, i) => {
        const li = document.createElement('li');
        li.className = 'book-item' + (book._removed ? ' removed' : '') + (book._kept ? ' kept' : '');
        li.dataset.index = String(i);
        li.innerHTML =
          '<div class="drag-handle">' +
            '<svg viewBox="0 0 24 24"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>' +
          '</div>' +
          '<span class="rank">' + (i + 1) + '</span>' +
          (book.image
            ? '<img class="book-cover" src="' + book.image + '" alt="">'
            : '<div class="book-cover"></div>') +
          '<div class="book-info">' +
            '<div class="book-title">' + esc(book.title) + '</div>' +
            '<div class="book-author">' + esc(book.author) + '</div>' +
            (book.avg_rating ? '<div class="book-rating">' + brStars(book.avg_rating) + ' ' + book.avg_rating.toFixed(2) + '</div>' : '') +
            (book.reason ? '<div class="book-reason">' + esc(book.reason) + '</div>' : '') +
          '</div>' +
          '<div class="controls">' +
            '<button class="ctrl-btn keep ' + (book._kept ? 'active' : '') + '" data-action="keep" data-index="' + i + '">&#9829;</button>' +
            (i > 0 ? '<button class="ctrl-btn" data-action="up" data-index="' + i + '">&#9650;</button>' : '<div style="height:28px"></div>') +
            (i < brBooks.length - 1 ? '<button class="ctrl-btn" data-action="down" data-index="' + i + '">&#9660;</button>' : '<div style="height:28px"></div>') +
            '<button class="ctrl-btn remove" data-action="remove" data-index="' + i + '">&times;</button>' +
          '</div>';
        ul.appendChild(li);
      });

      // Event delegation for controls
      ul.onclick = (e) => {
        const btn = (e.target as HTMLElement).closest('[data-action]') as HTMLElement;
        if (!btn) return;
        const action = btn.dataset.action;
        const idx = parseInt(btn.dataset.index || '0', 10);
        if (action === 'keep') { brBooks[idx]._kept = !brBooks[idx]._kept; renderBooks(); saveList(); }
        else if (action === 'up' && idx > 0) { [brBooks[idx - 1], brBooks[idx]] = [brBooks[idx], brBooks[idx - 1]]; renderBooks(); saveList(); }
        else if (action === 'down' && idx < brBooks.length - 1) { [brBooks[idx], brBooks[idx + 1]] = [brBooks[idx + 1], brBooks[idx]]; renderBooks(); saveList(); }
        else if (action === 'remove') { brBooks[idx]._removed = !brBooks[idx]._removed; renderBooks(); saveList(); }
      };

      const hint = el('br-scroll-hint');
      if (hint) {
        if (brVisibleCount < brBooks.length) {
          hint.textContent = 'Showing ' + brVisibleCount + ' of ' + brBooks.length + ' — scroll for more';
          hint.style.display = '';
        } else {
          hint.style.display = 'none';
        }
      }

      initDragAndDrop();
    }

    // Save
    function saveList() {
      clearTimeout(saveTimeout);
      const status = el('br-save-status');
      if (status) { status.textContent = 'Saving...'; status.style.display = ''; }
      saveTimeout = setTimeout(async () => {
        try {
          await fetch(API + '/api/save-list', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ books: brBooks }),
          });
          if (status) { status.textContent = 'List saved'; setTimeout(() => { status.style.display = 'none'; }, 1500); }
        } catch (e) { if (status) status.textContent = 'Failed to save'; }
      }, 500);
    }

    // Check library
    async function checkLibrary() {
      const active = brBooks.filter(b => !b._removed).slice(0, 10);
      if (active.length === 0) { brShowError('Add at least one book to check.'); return; }

      brHide('br-recs-section', 'br-error');
      brShow('br-loading-library');

      const results: any[] = [];
      for (let i = 0; i < active.length; i++) {
        const prog = el('br-library-progress');
        if (prog) prog.textContent = 'Checking ' + (i + 1) + ' of ' + active.length + ': ' + active[i].title.substring(0, 30) + '...';
        try {
          const resp = await fetch(API + '/api/check-book', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: active[i].title, author: active[i].author }),
          });
          const data = await resp.json();
          results.push(data);
        } catch (e) {
          results.push({ title: active[i].title, author: active[i].author, status: 'unknown', detail: 'Could not check', branches_available: [] });
        }
      }

      renderResults(results);
      brHide('br-loading-library');
      brShow('br-results-section');
    }

    function renderResults(results: any[]) {
      const branch = brSelectedBranch.toUpperCase();
      const atBranch = results.filter(b => b.branches_available && b.branches_available.some((br: string) => br.toUpperCase() === branch));
      const notAtBranch = results.filter(b => !b.branches_available || !b.branches_available.some((br: string) => br.toUpperCase() === branch));
      const branchName = branch.replace(' BRANCH', '').replace(/\b\w/g, c => c.toUpperCase());

      const div = el('br-results-section');
      if (!div) return;
      let html = '';

      html += '<div class="tabs">' +
        '<button class="tab active" data-tab="available">At ' + esc(branchName) + ' <span class="badge" style="background:white;color:#040949;">' + atBranch.length + '</span></button>' +
        '<button class="tab" data-tab="unavailable">Not Available <span class="badge">' + notAtBranch.length + '</span></button>' +
      '</div>';

      html += '<div id="br-tab-available" class="tab-content active">';
      if (atBranch.length > 0) {
        atBranch.forEach(b => {
          html += '<div class="result-card">' +
            '<div class="result-title">' + esc(b.title) + '</div>' +
            '<div class="result-author">' + esc(b.author) + '</div>' +
            '<span class="result-status status-park">At ' + esc(branchName) + '</span>' +
            (b.url ? '<a class="result-link" href="' + b.url + '" target="_blank">View on SFPL &rarr;</a>' : '') +
          '</div>';
        });
      } else {
        html += '<p style="text-align:center; color:#040949; opacity:0.5; padding:20px;">None of your picks are at ' + esc(branchName) + ' right now.</p>';
      }
      html += '</div>';

      html += '<div id="br-tab-unavailable" class="tab-content">';
      if (notAtBranch.length > 0) {
        notAtBranch.forEach(b => {
          let statusClass = 'status-unknown';
          let detail = b.detail || 'Not at ' + branchName;
          if (b.status === 'available') {
            statusClass = 'status-available';
            const otherBranches = (b.branches_available || [])
              .map((br: string) => br.replace(' BRANCH', '').replace(/\b\w/g, (c: string) => c.toUpperCase()))
              .slice(0, 3).join(', ');
            detail = otherBranches ? 'Available at: ' + otherBranches : detail;
          } else if (b.status === 'in_use') {
            statusClass = 'status-hold';
          }
          html += '<div class="result-card">' +
            '<div class="result-title">' + esc(b.title) + '</div>' +
            '<div class="result-author">' + esc(b.author) + '</div>' +
            '<span class="result-status ' + statusClass + '">' + esc(detail) + '</span>' +
            (b.holds ? '<div class="result-detail">' + esc(b.holds) + '</div>' : '') +
            (b.url ? '<a class="hold-link" href="' + b.url + '" target="_blank">Place Hold on SFPL</a>' : '') +
          '</div>';
        });
      } else {
        html += '<p style="text-align:center; color:#040949; opacity:0.5; padding:20px;">All your picks are at ' + esc(branchName) + '!</p>';
      }
      html += '</div>';

      html += '<a class="refresh-link" id="br-start-over">Start Over</a>';
      div.innerHTML = html;

      // Tab switching
      div.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
          div.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
          div.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          const tabId = 'br-tab-' + (tab as HTMLElement).dataset.tab;
          el(tabId)?.classList.add('active');
        });
      });

      el('br-start-over')?.addEventListener('click', () => {
        brHide('br-results-section');
        brShow('br-recs-section');
      });
    }

    // Drag and drop
    function initDragAndDrop() {
      document.querySelectorAll('.bookrun .book-item .drag-handle').forEach(handle => {
        handle.addEventListener('mousedown', (e: Event) => {
          e.preventDefault();
          beginDrag((handle as HTMLElement).closest('.book-item')!, (e as MouseEvent).clientY);
        });
        handle.addEventListener('touchstart', (e: Event) => {
          beginDrag((handle as HTMLElement).closest('.book-item')!, (e as TouchEvent).touches[0].clientY);
        }, { passive: true });
      });
    }

    function beginDrag(item: HTMLElement, startY: number) {
      const ul = el('br-book-list');
      if (!ul) return;
      const items = Array.from(ul.querySelectorAll('.book-item')) as HTMLElement[];
      const fromIndex = items.indexOf(item);
      const rect = item.getBoundingClientRect();
      const ulRect = ul.getBoundingClientRect();
      const rects = items.map(el => el.getBoundingClientRect());
      const itemH = rect.height;
      const gap = 10;

      ul.style.height = ulRect.height + 'px';
      ul.style.position = 'relative';

      items.forEach((el, i) => {
        el.style.position = 'absolute';
        el.style.left = '0'; el.style.right = '0';
        el.style.top = (rects[i].top - ulRect.top) + 'px';
        el.style.width = rects[i].width + 'px';
        el.style.margin = '0';
        if (i !== fromIndex) el.style.transition = 'top 0.2s ease';
      });

      item.classList.add('dragging');
      item.style.width = rect.width + 'px';
      item.style.top = rect.top + 'px';
      item.style.left = rect.left + 'px';
      item.style.position = 'fixed';

      drag = { item, items, fromIndex, currentIndex: fromIndex, startY, offsetY: startY - rect.top, itemH: itemH + gap, ulTop: ulRect.top, rects };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onEnd);
      document.addEventListener('touchmove', onMoveTouch, { passive: false });
      document.addEventListener('touchend', onEnd);
    }

    function onMoveTouch(e: Event) { e.preventDefault(); onMove((e as TouchEvent).touches[0] as any); }

    function onMove(e: { clientY: number }) {
      if (!drag) return;
      const y = e.clientY;
      drag.item.style.top = (y - drag.offsetY) + 'px';
      const relY = y - drag.offsetY - drag.ulTop + (drag.itemH / 2);
      let newIndex = Math.round(relY / drag.itemH);
      newIndex = Math.max(0, Math.min(drag.items.length - 1, newIndex));
      if (newIndex !== drag.currentIndex) { drag.currentIndex = newIndex; layoutItems(); }
    }

    function layoutItems() {
      const { items, fromIndex, currentIndex, itemH } = drag;
      items.forEach((el: HTMLElement, i: number) => {
        if (i === fromIndex) return;
        let visualPos = i;
        if (fromIndex < currentIndex) { if (i > fromIndex && i <= currentIndex) visualPos = i - 1; }
        else if (fromIndex > currentIndex) { if (i >= currentIndex && i < fromIndex) visualPos = i + 1; }
        el.style.top = (visualPos * itemH) + 'px';
      });
    }

    function onEnd() {
      if (!drag) return;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMoveTouch);
      document.removeEventListener('touchend', onEnd);
      const { fromIndex, currentIndex, items } = drag;
      const ul = el('br-book-list');
      if (ul) { ul.style.height = ''; ul.style.position = ''; }
      items.forEach((el: HTMLElement) => {
        el.classList.remove('dragging');
        el.style.position = ''; el.style.left = ''; el.style.right = '';
        el.style.top = ''; el.style.width = ''; el.style.margin = ''; el.style.transition = '';
      });
      drag = null;
      if (fromIndex !== currentIndex) {
        const moved = brBooks.splice(fromIndex, 1)[0];
        brBooks.splice(currentIndex, 0, moved);
        renderBooks();
        saveList();
      }
    }

    // Infinite scroll
    const handleScroll = () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        scrollTicking = false;
        const recsSection = el('br-recs-section');
        if (recsSection && recsSection.style.display !== 'none' && brVisibleCount < brBooks.length) {
          const hint = el('br-scroll-hint');
          if (hint && hint.getBoundingClientRect().top < window.innerHeight + 200) {
            brVisibleCount = Math.min(brVisibleCount + 10, brBooks.length);
            renderBooks();
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll);

    // Wire up event listeners
    const branchSelect = el('br-branch-select');
    branchSelect?.addEventListener('change', () => {
      brSelectedBranch = (branchSelect as HTMLSelectElement).value;
      updateBranchButtons();
    });

    el('br-check-btn-top')?.addEventListener('click', checkLibrary);
    el('br-check-btn')?.addEventListener('click', checkLibrary);
    el('br-reroll-link')?.addEventListener('click', () => loadRecommendations(true));

    // Init
    loadBranches();
    loadRecommendations(false);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMoveTouch);
      document.removeEventListener('touchend', onEnd);
      clearTimeout(saveTimeout);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>BookRun | Geoff Schwarten</title>
        <meta name="description" content="An app I made because I kept showing up to the library with 50 books on my Goodreads list and zero clue which ones were actually on the shelf. Now I know before I go." />
        <meta property="og:title" content="BookRun | Geoff Schwarten" />
        <meta property="og:description" content="An app I made because I kept showing up to the library with 50 books on my Goodreads list and zero clue which ones were actually on the shelf. Now I know before I go." />
        <meta property="og:image" content="https://geoff.lovable.app/lovable-uploads/bookrun-og.png" />
        <meta property="og:url" content="https://geoff.lovable.app/bookrun" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BookRun | Geoff Schwarten" />
        <meta name="twitter:description" content="An app I made because I kept showing up to the library with 50 books on my Goodreads list and zero clue which ones were actually on the shelf. Now I know before I go." />
        <meta name="twitter:image" content="https://geoff.lovable.app/lovable-uploads/bookrun-og.png" />
      </Helmet>
      <style dangerouslySetInnerHTML={{ __html: BOOKRUN_STYLES }} />
      <div className="bookrun" ref={containerRef} dangerouslySetInnerHTML={{ __html: BOOKRUN_HTML }} />
    </>
  );
};

export default BookRun;
