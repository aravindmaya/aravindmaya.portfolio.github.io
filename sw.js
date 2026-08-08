/* Service worker — Aravindh Maya portfolio
 *
 * Strategy:
 *   HTML       network-first, cache as fallback (so edits go live immediately)
 *   everything else  cache-first, then network
 *
 * The precache list is deliberately small and limited to files that are known
 * to exist. cache.addAll() is atomic: a single 404 rejects the whole promise
 * and the worker never installs, which is exactly what used to happen here.
 * Each entry is also fetched individually so one bad URL can't take the rest
 * down again.
 */

const CACHE_NAME = 'aravindh-maya-portfolio-v3';

const PRECACHE = [
  '/',
  '/index.html',
  '/about.html',
  '/fun.html',
  '/site.css',
  '/site.js',
  '/favicon.svg',
  '/manifest.json',
  '/_next/static/css/052620bd47d3101a.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // Individually, not addAll: one missing file must not abort the install.
      Promise.all(
        PRECACHE.map((url) =>
          cache.add(new Request(url, { cache: 'reload' })).catch(() => {
            /* skip anything unavailable at install time */
          })
        )
      )
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) =>
        Promise.all(
          names
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Same-origin only. Analytics and any other third party goes straight out.
  if (url.origin !== self.location.origin) return;

  const isHTML =
    request.mode === 'navigate' ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('/');

  if (isHTML) {
    // Network first, so a deploy is visible on the next load.
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match('/index.html'))
        )
    );
    return;
  }

  // Everything else: cache first, fall back to network, then populate.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        // Only cache complete, same-origin, successful responses.
        if (response && response.status === 200 && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
