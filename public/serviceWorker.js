let CACHE_NAME = "my-site-cache-v1";
const urlsToCache = [
  "/",
  "/pokemons",
  "/static/js/bundle.js",
  "/index.html",
  "/static/js/0.chunk.js",
  "/static/js/main.chunk.js",
];
self.addEventListener("install", function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request).catch(() => caches.match("index.html"));
    })
  );
});
