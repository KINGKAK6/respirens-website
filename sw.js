/* Respirens service worker — eenvoudige offline-cache.
   Verhoog CACHE_VERSION bij elke grote update van de site. */
var CACHE_VERSION = 'respirens-v1';

var CORE = [
  './',
  './index.html',
  './behandelingen.html',
  './respiratoire-kinesitherapie.html',
  './cardiale-kinesitherapie.html',
  './algemene-kinesitherapie.html',
  './over-respirens.html',
  './tarieven.html',
  './praktisch.html',
  './contact.html',
  './privacybeleid.html',
  './404.html',
  './assets/css/style.css',
  './assets/js/main.js',
  './assets/img/logo-mark.png',
  './assets/img/logo-full-wit.png',
  './favicon.svg'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_VERSION).then(function (cache) {
      return cache.addAll(CORE);
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) {
        return k !== CACHE_VERSION;
      }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

/* Netwerk eerst voor pagina's (altijd de nieuwste versie als er internet is),
   cache eerst voor foto's en andere assets. */
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if (url.origin !== location.origin) return; /* Google Fonts e.d. gewoon doorlaten */

  var isPage = e.request.mode === 'navigate' || url.pathname.endsWith('.html');

  if (isPage) {
    e.respondWith(
      fetch(e.request).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE_VERSION).then(function (c) { c.put(e.request, copy); });
        return res;
      }).catch(function () {
        return caches.match(e.request).then(function (hit) {
          return hit || caches.match('./index.html');
        });
      })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function (hit) {
        return hit || fetch(e.request).then(function (res) {
          var copy = res.clone();
          caches.open(CACHE_VERSION).then(function (c) { c.put(e.request, copy); });
          return res;
        });
      })
    );
  }
});
