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
    '/games/play_suffix_station/index.html',
    '/games/play_suffix_station/css/style.css',
    '/games/play_suffix_station/js/game.js',
    // Meter Haaki
    '/games/play_meter_haaki/index.html',
    '/games/play_meter_haaki/css/style.css',
    '/games/play_meter_haaki/js/game.js',
    '/games/play_meter_haaki/js/data.js',
    // Adjust Maadi
    '/games/play_adjust_maadi/index.html',
    '/games/play_adjust_maadi/css/style.css',
    '/games/play_adjust_maadi/js/game.js',
    '/games/play_adjust_maadi/js/data.js'
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
