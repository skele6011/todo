const CACHE_NAME = 'quranic-light-v1';
const ASSETS_TO_CACHE = [
  './index.html',
  './script.js',
  './style.css',
  './src/white-trash.png',
  './src/red-trash.png',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  // 
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    // Try network first, fall back to cache if offline
    fetch(event.request).catch(() => {
      return caches.match(event.request).then((response) => {
        // If resource isn't cached, fallback to index page
        return response || caches.match('./quranic-light-index.html');
      });
    })
  );
});
