/* Registers the service worker from any page depth.
 * Absolute path, so projects/*.html registers the same root-scoped worker
 * as the top-level pages rather than a scope of its own. */
(function () {
  if (!('serviceWorker' in navigator)) return;

  // Service workers need a secure context; file:// and plain http on a real
  // host will just fail noisily, so don't try.
  var secure = window.isSecureContext ||
    location.hostname === 'localhost' ||
    location.hostname === '127.0.0.1';
  if (!secure) return;

  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').catch(function () {
      /* registration is an enhancement — never surface it to the visitor */
    });
  });
})();
