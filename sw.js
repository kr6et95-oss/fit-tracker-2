const CACHE = 'fit-tracker-2-v36';
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
  const url = e.request.url || '';
  // HTML/앱 셸은 네트워크 우선 (옛 캐시가 클릭 먹통·구버전 고정하는 문제 방지)
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
      // stale-while-revalidate: 캐시가 있어도 백그라운드 갱신
      return hit || net;
    })
  );
});
