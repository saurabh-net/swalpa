const CACHE_NAME = 'swalpa-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/assets/img/app-icon-192.png',
    '/assets/img/app-icon-512.png',
    '/assets/img/hero.png',
    '/assets/js/scores.js',
    '/assets/js/progress.js',
    // Suffix Station
    '/games/suffix-station/index.html',
    '/games/suffix-station/css/style.css',
    '/games/suffix-station/js/game.js',
    // Meter Haaki
    '/games/auto-rickshaw/index.html',
    '/games/auto-rickshaw/css/style.css',
    '/games/auto-rickshaw/js/game.js',
    '/games/auto-rickshaw/js/data.js',
    // Adjust Maadi
    '/games/adjust-maadi/index.html',
    '/games/adjust-maadi/css/style.css',
    '/games/adjust-maadi/js/game.js',
    '/games/adjust-maadi/js/data.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
