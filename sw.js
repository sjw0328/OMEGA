// 게임하자 PWA service worker — shell precache + CDN cache-first
const CACHE = 'gz-shell-v15';
const CDN = 'gz-cdn-v1';
const SHELL = ['./', './index.html', './support.js', './manifest.json', './icon-192.png', './icon-512.png'];
const CDN_HOSTS = ['cdn.jsdelivr.net', 'unpkg.com'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE && k !== CDN).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // React / Pretendard / supabase-js 등 버전 고정 CDN 자산은 cache-first
  if (CDN_HOSTS.includes(url.hostname)) {
    e.respondWith(
      caches.open(CDN).then((c) =>
        c.match(req).then((hit) =>
          hit || fetch(req).then((res) => {
            if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone()).catch(() => {});
            return res;
          })
        )
      )
    );
    return;
  }

  // Supabase API 등 그 외 교차 출처는 캐시하지 않음
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then((m) => m || caches.match('./index.html')))
  );
});
