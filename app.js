const CACHE_NAME = 'examen-v1-26004956';
const ASSETS = ['./', './index.html', './examenC_26004956.js', './manifest.json'];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(key => { if (key !== CACHE_NAME) return caches.delete(key); }))));
});
self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});