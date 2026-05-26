const CACHE_NAME = 'examen-v1-26004956';
const ASSETS = [
    './',
    './index.html',
    './examenC_26004956.js',
    './manifest.json'
];

// Evento de Instalación: Guarda archivos estáticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Evento de Activación: Limpia cachés antiguas
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// Evento Fetch: Sirve el contenido guardado cuando no hay red
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                return res || fetch(e.request);
            })
    );
});