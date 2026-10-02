/* =====================================================================
   RESPIRENS — motion.js
   Vloeiend scrollen en rustige bewegingseffecten.
   Wordt volledig overgeslagen voor wie 'verminderde beweging' aan
   heeft staan in zijn systeeminstellingen.
   ===================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  /* ---------- 1. Boterzacht scrollen (Lenis) -------------------------- */
  var lenis = null;
  if (window.Lenis) {
    lenis = new window.Lenis({ duration: 1.15, smoothWheel: true });
  }

  /* Ankerlinks op dezelfde pagina mee laten glijden */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a || !lenis) return;
    var href = a.getAttribute('href');
    var hash = null;
    if (href.charAt(0) === '#') hash = href;
    else {
      var parts = href.split('#');
      if (parts.length === 2 && location.pathname.endsWith(parts[0])) hash = '#' + parts[1];
    }
    if (!hash || hash === '#' || hash === '#main') return;
    var target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: -100, duration: 1.3 });
  });

  /* ---------- 2. Titels die woord per woord verschijnen --------------- */
  function splitWords(el) {
    function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (ch) {
        if (ch.nodeType === 3) {
          var frag = document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span'); w.className = 'w';
            var i = document.createElement('span'); i.className = 'wi';
            i.textContent = part;
            w.appendChild(i); frag.appendChild(w);
          });
          node.replaceChild(frag, ch);
        } else if (ch.nodeType === 1) walk(ch);
      });
    }
    walk(el);
    var delay = 0;
    el.querySelectorAll('.wi').forEach(function (s) {
      s.style.transitionDelay = delay + 'ms';
      delay += 60;
    });
    el.classList.add('split-ready');
  }

  var titles = document.querySelectorAll('.hero h1, .page-hero h1, main h2');
  titles.forEach(splitWords);

  if ('IntersectionObserver' in window) {
    var tio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('words-in');
          tio.unobserve(en.target);
        }
      });
    }, { threshold: 0.3 });
    titles.forEach(function (el) { tio.observe(el); });
  } else {
    titles.forEach(function (el) { el.classList.add('words-in'); });
  }

  /* ---------- 3. Parallax op de grote beelden ------------------------- */
  var heroMedia = Array.prototype.slice.call(
    document.querySelectorAll('.hero__media, .page-hero__media, .cta-band__media')
  ).map(function (el) { el.classList.add('has-parallax'); return el; });

  var blocks = Array.prototype.slice.call(document.querySelectorAll('.photo-block'));

  function applyParallax() {
    var vh = window.innerHeight;
    heroMedia.forEach(function (el) {
      var r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -80 || r.top > vh + 80) return;
      var p = (r.top + r.height / 2 - vh / 2) / vh;
      el.style.transform = 'scale(1.14) translateY(' + (p * -46).toFixed(1) + 'px)';
    });
    blocks.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -80 || r.top > vh + 80) return;
      var p = (r.top + r.height / 2 - vh / 2) / vh;
      el.style.transform = 'translateY(' + (p * 22).toFixed(1) + 'px)';
    });
  }

  /* ---------- 4. Eén animatielus voor alles --------------------------- */
  function raf(time) {
    if (lenis) lenis.raf(time);
    applyParallax();
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
})();
