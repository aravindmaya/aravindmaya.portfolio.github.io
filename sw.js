const CACHE_NAME = "rachel-chen-portfolio-v1";
const urlsToCache = [
  "/",
  "/about",
  "/fun",
  "/projects/1password",
  "/projects/pokergpt",
  "/projects/earth",
  "/projects/linkedin",
  "/projects/rbc",
  "/projects/chattin",
  "/projects/biogenesis",
];

// Cache project assets
const projectAssets = [
  "/projects/1password/1password.mp4",
  "/projects/pokergpt/pokergpt.mp4",
  "/projects/earth/earth.mp4",
  "/projects/1password/1password.png",
  "/projects/pokergpt/pokergpt.png",
  "/projects/earth/earth.png",
  "/projects/linkedin/linkedin.png",
  "/projects/rbc/rbc.png",
  "/projects/chattin/chattin.png",
  "/projects/biogenesis/biogenesis.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache.concat(projectAssets));
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
