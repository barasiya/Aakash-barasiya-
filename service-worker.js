/* ==========================================================================
   service-worker.js
   Minimal offline cache so the portfolio is installable as a PWA and
   still opens (from cache) without an internet connection.
   ========================================================================== */

const CACHE_NAME = "aakash-portfolio-v2";

const CORE_ASSETS = [
  "/",
  "/index.html",
  "/css/style.css",
  "/css/responsive.css",
  "/css/animations.css",
  "/js/projects.js",
  "/js/animations.js",
  "/js/main.js",
  "/assets/favicon.png",
  "/assets/icon-192.png",
  "/assets/icon-512.png",
  "/manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

/* Cache-first for core assets, network-first fallback for everything else */
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && response.type === "basic") {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match("/index.html"));
    })
  );
});
