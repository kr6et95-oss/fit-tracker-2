/* FIT TRACKER 2 service worker ??bump CACHE on every deploy */
const CACHE = 'fit-tracker-2-v42';
const APP_VERSION = '4.25';
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
  './anatomy/front.jpg',
  './anatomy/back.jpg',
  './anatomy/human.glb',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js',
  'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Noto+Sans+KR:wght@400;500;700;800&display=swap'
];

self.addEventListener('install', (e) => {
  // Do not skipWaiting here ??let the app show an update banner,
  // then client posts SKIP_WAITING (or user runs force refresh).
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS).catch(() => {}))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Client ??SW control (update apply / force clear)
self.addEventListener('message', (e) => {
  const data = e.data || {};
  const type = typeof data === 'string' ? data : data.type;
  if (type === 'SKIP_WAITING') {
    self.skipWaiting();
    return;
  }
  if (type === 'CLEAR_CACHES') {
    e.waitUntil(
      caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
    );
    return;
  }
  if (type === 'GET_VERSION' && e.ports && e.ports[0]) {
    e.ports[0].postMessage({ cache: CACHE, appVersion: APP_VERSION });
  }
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = e.request.url || '';
  // HTML shell: network first (prevents stuck old app shell)
  const isNav = e.request.mode === 'navigate'
    || url.endsWith('/')
    || url.endsWith('/index.html')
    || /\/fit-tracker-2\/?(\?.*)?$/.test(url);
  if (isNav) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(e.request).then((hit) => hit || caches.match('./index.html')))
    );
    return;
  }
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
      // stale-while-revalidate
      return hit || net;
    })
  );
});
