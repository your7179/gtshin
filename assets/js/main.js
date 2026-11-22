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
