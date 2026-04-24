const CACHE_NAME = 'simats-cgpa-v2'; // Bumped version to invalidate old cache
const urlsToCache = [
  '/',
  '/index.html',
  '/logo2.png',
  '/manifest.json',
];

// Install event
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force the waiting service worker to become active
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // Delete the old 'v1' cache
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event: Network-First strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // If the network request is successful, return it
        return response;
      })
      .catch(() => {
        // If the network fails (offline), fall back to the cache
        return caches.match(event.request);
      })
  );
});