/* Mission Now — offline cache.
   アプリを更新したら VERSION の数字を1つ上げる(古いキャッシュを捨てるため) */
const VERSION = 'v1';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open('core-' + VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => !k.endsWith(VERSION)).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // KLMSなど外部APIはキャッシュしない(常に最新を取りに行く)
  if (url.origin !== location.origin && !/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) return;

  // フォント: あればキャッシュ、なければ取得して保存
  if (url.origin !== location.origin) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      caches.open('font-' + VERSION).then(c => c.put(req, copy));
      return res;
    }).catch(() => hit)));
    return;
  }

  // 自分のファイル: ネット優先・失敗したらキャッシュ(更新がすぐ届く)
  e.respondWith(fetch(req).then(res => {
    const copy = res.clone();
    caches.open('core-' + VERSION).then(c => c.put(req, copy));
    return res;
  }).catch(() => caches.match(req).then(hit => hit || caches.match('./index.html'))));
});
