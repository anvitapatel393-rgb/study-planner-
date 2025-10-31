const CACHE_NAME = 'study-planner-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  // add any extra files like css/js/images here
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(res => {
        // optionally cache new requests
        return res;
      });
    })
  );
});
