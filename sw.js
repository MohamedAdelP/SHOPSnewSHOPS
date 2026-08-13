const CACHE_NAME = 'kafr-shokr-v1';
const assetsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js'
  // أضف أي روابط أو صور رئيسية تريد تخزينها مؤقتاً هنا
];

// تثبيت الـ Service Worker وحفظ الملفات في ذاكرة التخزين المؤقت
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

// جلب الملفات من الكاش عند انقطاع الإنترنت
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});