const CACHE_NAME = "maya-chen-portfolio-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/about.html",
  "/fun.html",
  "/projects/1password.html",
  "/projects/pokergpt.html",
  "/projects/earth.html",
  "/projects/linkedin.html",
  "/projects/rbc.html",
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
      if (response) {
        return response;
      }
      
      // Handle navigation requests
      if (event.request.mode === 'navigate') {
        const url = new URL(event.request.url);
        const path = url.pathname;
        
        // Try to serve .html files for navigation requests
        if (!path.endsWith('.html') && !path.endsWith('/')) {
          const htmlUrl = new URL(path + '.html', event.request.url);
          return fetch(htmlUrl).catch(() => {
            // If .html version doesn't exist, try the original request
            return fetch(event.request);
          });
        }
      }
      
      return fetch(event.request);
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
