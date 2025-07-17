const CACHE_NAME = 'simats-cgpa-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/logo2.png',
  '/manifest.json',
  // Add other static assets or built JS/CSS files if known
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
