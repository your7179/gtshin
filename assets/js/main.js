(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') { fn(); } else { document.addEventListener('DOMContentLoaded', fn); }
  }

  ready(function () {
    // Mobile menu
    var btn = document.querySelector('.nav-toggle');
    var nav = document.getElementById('global-nav');
    if (btn && nav) {
      btn.addEventListener('click', function () {
        var open = nav.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    // Category cards: 6 per page, numbered pages, subcategory filter
    var grid = document.getElementById('card-grid');
    var pager = document.getElementById('pagination');
    if (grid && pager) {
      var per = parseInt(grid.getAttribute('data-per-page'), 10) || 6;
      var cards = Array.prototype.slice.call(grid.querySelectorAll('.card'));
      var filterBtns = Array.prototype.slice.call(document.querySelectorAll('.card-filter button'));
      var params = new URLSearchParams(window.location.search);
      var state = { page: parseInt(params.get('page'), 10) || 1, sub: params.get('sub') || '' };

      var visibleCards = function () {
        return cards.filter(function (c) { return !state.sub || c.getAttribute('data-sub') === state.sub; });
      };

      var makeBtn = function (label, page, opts) {
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = label;
        if (opts && opts.current) { b.className = 'is-current'; b.setAttribute('aria-current', 'page'); b.disabled = true; }
        if (opts && opts.disabled) { b.disabled = true; }
        if (opts && opts.aria) { b.setAttribute('aria-label', opts.aria); }
        b.addEventListener('click', function () { state.page = page; render(true); });
        return b;
      };

      var render = function (scroll) {
        var list = visibleCards();
        var pages = Math.max(1, Math.ceil(list.length / per));
        if (state.page > pages) { state.page = pages; }
        if (state.page < 1) { state.page = 1; }
        cards.forEach(function (c) { c.hidden = true; });
        list.slice((state.page - 1) * per, state.page * per).forEach(function (c) { c.hidden = false; });

        pager.innerHTML = '';
        if (pages > 1) {
          pager.appendChild(makeBtn('‹ 前へ', state.page - 1, { disabled: state.page === 1, aria: '前のページ' }));
          var last = 0;
          for (var i = 1; i <= pages; i++) {
            if (i === 1 || i === pages || Math.abs(i - state.page) <= 2) {
              if (last && i - last > 1) {
                var dots = document.createElement('span'); dots.textContent = '…'; pager.appendChild(dots);
              }
              pager.appendChild(makeBtn(String(i), i, { current: i === state.page, aria: i + 'ページ目' }));
              last = i;
            }
          }
          pager.appendChild(makeBtn('次へ ›', state.page + 1, { disabled: state.page === pages, aria: '次のページ' }));
        }
        pager.hidden = pages <= 1;

        filterBtns.forEach(function (b) {
          b.classList.toggle('is-active', b.getAttribute('data-filter') === state.sub);
        });

        var q = new URLSearchParams();
        if (state.sub) { q.set('sub', state.sub); }
        if (state.page > 1) { q.set('page', state.page); }
        var qs = q.toString();
        if (window.history && history.replaceState) {
          history.replaceState(null, '', window.location.pathname + (qs ? '?' + qs : ''));
        }
        if (scroll) {
          var top = document.querySelector('.card-filter') || grid;
          top.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      filterBtns.forEach(function (b) {
        b.addEventListener('click', function () {
          state.sub = b.getAttribute('data-filter');
          state.page = 1;
          render(false);
        });
      });

      render(false);
    }

    var body = document.querySelector('.article-body');
    if (!body) { return; }

    // Table of contents (built from h2 / h3, shown when there are 2+ h2)
    var toc = document.getElementById('toc');
    var tocList = document.getElementById('toc-list');
    var h2s = body.querySelectorAll('h2');
    if (toc && tocList && h2s.length >= 2) {
      var heads = body.querySelectorAll('h2, h3');
      var current = null;
      for (var i = 0; i < heads.length; i++) {
        var h = heads[i];
        if (!h.id) { h.id = 'section-' + (i + 1); }
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent;
        li.appendChild(a);
        if (h.tagName === 'H2') {
          tocList.appendChild(li);
          current = li;
        } else if (current) {
          var sub = current.querySelector('ul');
          if (!sub) { sub = document.createElement('ul'); current.appendChild(sub); }
          sub.appendChild(li);
        }
      }
      body.insertBefore(toc, h2s[0]);
      toc.hidden = false;
    }

    // Wrap tables so they can scroll sideways on phones
    var tables = body.querySelectorAll('table');
    for (var t = 0; t < tables.length; t++) {
      var wrap = document.createElement('div');
      wrap.className = 'table-wrap';
      tables[t].parentNode.insertBefore(wrap, tables[t]);
      wrap.appendChild(tables[t]);
    }

    // Copy button on code blocks
    var pres = body.querySelectorAll('pre');
    for (var p = 0; p < pres.length; p++) {
      (function (pre) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'copy-btn';
        b.textContent = 'コピー';
        b.addEventListener('click', function () {
          var code = pre.querySelector('code') || pre;
          var text = code.innerText.replace(/\n$/, '');
          var done = function () {
            b.textContent = 'コピーしました';
            setTimeout(function () { b.textContent = 'コピー'; }, 2000);
          };
          if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(done);
          } else {
            var ta = document.createElement('textarea');
            ta.value = text; document.body.appendChild(ta); ta.select();
            try { document.execCommand('copy'); done(); } catch (e) {}
            document.body.removeChild(ta);
          }
        });
        pre.appendChild(b);
      })(pres[p]);
    }
  });
})();
