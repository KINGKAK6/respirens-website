/* =====================================================================
   RESPIRENS — main.js
   Geen frameworks, geen build-stap. Gewoon vanilla JavaScript.
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- 1. Header: wit maken bij scrollen ---------------------- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-solid', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 2. Mobiel menu ----------------------------------------- */
  var burger  = document.querySelector('.burger');
  var nav     = document.querySelector('.nav');
  var overlay = document.querySelector('.nav-overlay');

  function closeNav() {
    if (!nav) return;
    nav.classList.remove('is-open');
    if (burger) {
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }
    if (overlay) overlay.classList.remove('is-visible');
    document.body.classList.remove('no-scroll');
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      if (overlay) overlay.classList.toggle('is-visible', open);
      document.body.classList.toggle('no-scroll', open);
    });
  }
  if (overlay) overlay.addEventListener('click', closeNav);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  /* Submenu uitklappen op mobiel */
  document.querySelectorAll('.nav__item--has-menu > .nav__link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.matchMedia('(max-width: 1080px)').matches) {
        e.preventDefault();
        link.parentElement.classList.toggle('is-open');
      }
    });
  });

  /* Menu sluiten na klik op een link (mobiel) */
  document.querySelectorAll('.nav a').forEach(function (a) {
    a.addEventListener('click', function () {
      if (!a.closest('.nav__item--has-menu > .nav__link')) closeNav();
    });
  });

  /* ---------- 3. Reveal-animatie bij scrollen ------------------------ */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- 4. Fotoblokken: patroon weg zodra de foto echt bestaat --
     Zolang het bestand ontbreekt, blijft het decoratieve patroon staan.
     ------------------------------------------------------------------- */
  document.querySelectorAll('.photo-block').forEach(function (el) {
    var value = getComputedStyle(el).backgroundImage || '';
    var match = value.match(/url\(\s*['"]?([^'")]+)['"]?\s*\)/);
    if (!match) return;
    var probe = new Image();
    probe.onload = function () { el.classList.add('has-photo'); };
    probe.src = match[1];
  });

  /* ---------- 5. FAQ: telkens maar één item open --------------------- */
  var faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item && other.closest('.faq') === item.closest('.faq')) other.open = false;
      });
    });
  });

  /* ---------- 6. Jaartal in de footer -------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- 7. Contactformulier ------------------------------------
     Het formulier werkt pas écht zodra je in contact.html een endpoint
     invult (zie README.md, onderdeel "Contactformulier activeren").
     Zolang dat niet gebeurd is, valt het terug op een e-mail-link.
     ------------------------------------------------------------------- */
  var form = document.querySelector('#contact-form');
  if (form) {
    var statusEl = form.querySelector('.form-status');

    form.addEventListener('submit', function (e) {
      var action = form.getAttribute('action') || '';
      var configured = action.indexOf('VUL-HIER') === -1 && action.length > 0;

      /* Nog geen endpoint ingesteld: open de mailclient met de gegevens. */
      if (!configured) {
        e.preventDefault();
        if (!form.reportValidity()) return;

        var data = new FormData(form);
        var lines = [];
        [
          ['Naam', 'naam'],
          ['E-mail', 'email'],
          ['Telefoon', 'telefoon'],
          ['Onderwerp', 'onderwerp'],
          ['Voorkeursmoment', 'moment'],
          ['Bericht', 'bericht']
        ].forEach(function (pair) {
          var v = data.get(pair[1]);
          if (v) lines.push(pair[0] + ': ' + v);
        });

        var mail = form.dataset.mailto || 'info@respirens.be';
        var href = 'mailto:' + mail +
          '?subject=' + encodeURIComponent('Website — ' + (data.get('onderwerp') || 'Contactaanvraag')) +
          '&body=' + encodeURIComponent(lines.join('\n'));
        window.location.href = href;

        if (statusEl) {
          statusEl.className = 'form-status is-ok';
          statusEl.textContent = 'Je e-mailprogramma wordt geopend met je bericht. Lukt dat niet? Mail rechtstreeks naar ' + mail + '.';
        }
        return;
      }

      /* Wel een endpoint: verstuur op de achtergrond (AJAX). */
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var original = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Versturen…'; }

      fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      }).then(function (res) {
        if (!res.ok) throw new Error('Netwerkfout');
        form.reset();
        if (statusEl) {
          statusEl.className = 'form-status is-ok';
          statusEl.textContent = 'Bedankt voor je bericht. We nemen zo snel mogelijk contact met je op.';
        }
      }).catch(function () {
        if (statusEl) {
          statusEl.className = 'form-status is-error';
          statusEl.textContent = 'Er ging iets mis bij het versturen. Bel ons gerust of mail rechtstreeks.';
        }
      }).finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = original; }
      });
    });
  }
})();

/* ---------- 8. PWA: service worker registreren -----------------------
   Werkt enkel via https of localhost; op file:// gebeurt er stilletjes niets. */
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js').catch(function () { /* geen drama */ });
  });
}
