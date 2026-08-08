/* Google Analytics 4 — enhanced tracking
 *
 * The base gtag snippet lives inline in each page's <head>. gtag('config')
 * already sends the page_view, so this file must never send another one;
 * it only adds engagement signal on top.
 */
(function () {
  'use strict';

  function track(name, params) {
    if (typeof gtag !== 'function') return;
    var payload = params || {};
    payload.page_path = window.location.pathname;
    payload.page_title = document.title;
    gtag('event', name, payload);
  }

  /* -------------------------------------------------------------------
     Scroll depth
     Each milestone fires at most once per page view. The old version
     compared against maxDepth *after* updating it, so every new maximum
     between two milestones re-sent the lower one.
     ------------------------------------------------------------------- */
  var MILESTONES = [25, 50, 75, 100];
  var reached = {};
  var maxDepth = 0;
  var ticking = false;

  function measureScroll() {
    ticking = false;
    var doc = document.documentElement;
    var scrollable = doc.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;

    var pct = Math.round((window.pageYOffset || doc.scrollTop) / scrollable * 100);
    pct = Math.max(0, Math.min(100, pct));
    if (pct > maxDepth) maxDepth = pct;

    for (var i = 0; i < MILESTONES.length; i++) {
      var m = MILESTONES[i];
      if (pct >= m && !reached[m]) {
        reached[m] = true;
        track('scroll', { scroll_depth: m });
      }
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(measureScroll);
  }

  /* -------------------------------------------------------------------
     Time on page
     Threshold comparison rather than `=== 30`, which silently missed
     milestones whenever the interval drifted by a millisecond.
     ------------------------------------------------------------------- */
  var THRESHOLDS = [30, 60, 120, 300];
  var fired = {};
  var startedAt = Date.now();
  var timer = null;

  function checkTime() {
    var elapsed = (Date.now() - startedAt) / 1000;
    for (var i = 0; i < THRESHOLDS.length; i++) {
      var t = THRESHOLDS[i];
      if (elapsed >= t && !fired[t]) {
        fired[t] = true;
        track('engagement_time', { time_seconds: t });
      }
    }
    if (fired[THRESHOLDS[THRESHOLDS.length - 1]] && timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  /* -------------------------------------------------------------------
     Outbound links, resume downloads, project views
     ------------------------------------------------------------------- */
  function onClick(e) {
    var link = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!link) return;

    var href = link.href || '';
    if (!href) return;

    var isSameOrigin;
    try {
      isSameOrigin = new URL(href, window.location.href).origin === window.location.origin;
    } catch (err) {
      return;
    }

    if (/\.pdf($|\?)/i.test(href) && /resume/i.test(href)) {
      track('file_download', { file_name: 'resume', file_extension: 'pdf' });
      return;
    }

    if (!isSameOrigin) {
      track('click', {
        link_text: (link.textContent || '').trim().slice(0, 100) ||
          link.getAttribute('aria-label') || 'unknown',
        link_url: href,
        outbound: true
      });
    }
  }

  function trackProjectView() {
    var path = window.location.pathname;
    if (path.indexOf('/projects/') === -1) return;
    var name = path.split('/projects/')[1] || '';
    name = name.replace(/\.html$/, '');
    if (name) track('view_project', { project_name: name });
  }

  /* -------------------------------------------------------------------
     Session summary
     visibilitychange rather than beforeunload: beforeunload is unreliable
     on mobile and disqualifies the page from the back/forward cache.
     ------------------------------------------------------------------- */
  var summarySent = false;

  function sendSummary() {
    if (summarySent) return;
    summarySent = true;
    track('page_engagement', {
      engagement_time_msec: Date.now() - startedAt,
      max_scroll_depth: maxDepth
    });
  }

  function init() {
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('click', onClick, true);
    timer = setInterval(checkTime, 5000);
    trackProjectView();
    measureScroll();

    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') sendSummary();
    });
    window.addEventListener('pagehide', sendSummary);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Kept for manual instrumentation from page scripts.
  window.analytics = { track: track };
})();
