const CACHE = 'fit-tracker-2-v25';
const ASSETS = [
  './',
  './index.html',
  './foods.js',
  './workouts.js',
  './garmin.js',
  './micros.js',
  './manifest.json',
  './icon.svg',
  './coaches/seoan.jpg',
  './coaches/naeun.jpg',
  './coaches/ganghyeok.jpg',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Noto+Sans+KR:wght@400;500;700;800&display=swap'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((hit) => {
      const net = fetch(e.request)
        .then((res) => {
          if (res && res.status === 200 && (res.type === 'basic' || res.type === 'cors')) {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => hit);
      return hit || net;
    })
  );
});
