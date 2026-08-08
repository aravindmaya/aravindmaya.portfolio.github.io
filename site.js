/* ==========================================================================
   Shared site behaviour — Aravindh Maya
   Theme, custom cursor, scroll reveal, hover-to-play media.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------------------------------------------------------------------
     Theme
     The inline snippet in each page's <head> sets the class before first
     paint to avoid a flash. This wires up the toggle and keeps <body> in
     sync once it exists.
     --------------------------------------------------------------------- */
  function storedTheme() {
    try {
      return localStorage.getItem('theme');
    } catch (e) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      /* private mode — theme just won't persist */
    }
  }

  function applyTheme(theme) {
    var isDark = theme === 'dark';
    // classList.toggle, never className assignment: the body carries font
    // and layout classes that must survive a theme change.
    root.classList.toggle('dark-mode', isDark);
    if (document.body) {
      document.body.classList.toggle('dark-mode', isDark);
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', isDark ? '#0a0a0a' : '#fafcfd');
    }
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(isDark));
      btn.setAttribute(
        'aria-label',
        isDark ? 'Switch to light mode' : 'Switch to dark mode'
      );
    });
  }

  function currentTheme() {
    return root.classList.contains('dark-mode') ? 'dark' : 'light';
  }

  function initTheme() {
    applyTheme(storedTheme() === 'dark' ? 'dark' : 'light');

    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = currentTheme() === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        storeTheme(next);
      });
    });

    // Follow the OS only while the visitor has never chosen for themselves.
    var media = window.matchMedia('(prefers-color-scheme: dark)');
    if (!storedTheme()) {
      applyTheme(media.matches ? 'dark' : 'light');
      media.addEventListener('change', function (e) {
        if (!storedTheme()) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  /* ---------------------------------------------------------------------
     Custom cursor
     --------------------------------------------------------------------- */
  function initCursor() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    var cursor = document.getElementById('glassCursor');
    if (!cursor) return;

    root.classList.add('has-custom-cursor');

    var x = 0;
    var y = 0;
    var frame = null;

    function draw() {
      frame = null;
      cursor.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    }

    document.addEventListener(
      'mousemove',
      function (e) {
        x = e.clientX;
        y = e.clientY;
        // Reveal only once the pointer has actually moved, so the cursor
        // never flashes at the top-left corner on load.
        cursor.classList.add('is-active');
        if (frame === null) frame = requestAnimationFrame(draw);
      },
      { passive: true }
    );

    // Delegated, so it covers content added after load.
    document.addEventListener(
      'mouseover',
      function (e) {
        var t = e.target;
        if (t && t.closest && t.closest('a, button, [data-cursor], input, textarea, select')) {
          cursor.classList.add('is-hovering');
        }
      },
      { passive: true }
    );

    document.addEventListener(
      'mouseout',
      function (e) {
        var t = e.target;
        if (t && t.closest && t.closest('a, button, [data-cursor], input, textarea, select')) {
          cursor.classList.remove('is-hovering');
        }
      },
      { passive: true }
    );

    document.addEventListener('mouseleave', function () {
      cursor.classList.remove('is-active');
    });
  }

  /* ---------------------------------------------------------------------
     Scroll reveal
     --------------------------------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      items.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------------------------------------------------------------------
     Hover-to-play video cards
     --------------------------------------------------------------------- */
  function initMediaCards() {
    var cards = document.querySelectorAll('.media-card[data-video]');
    if (!cards.length) return;

    // Autoplay-on-hover is a pointer affordance; on touch the poster stands
    // alone rather than downloading a video nobody asked for.
    var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!canHover) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    cards.forEach(function (card) {
      var video = null;

      card.addEventListener('mouseenter', function () {
        if (!video) {
          video = document.createElement('video');
          video.src = card.getAttribute('data-video');
          video.muted = true;
          video.loop = true;
          video.playsInline = true;
          video.preload = 'none';
          video.setAttribute('aria-hidden', 'true');
          video.tabIndex = -1;
          card.appendChild(video);
        }
        card.classList.add('is-playing');
        var p = video.play();
        if (p && p.catch) p.catch(function () {
          card.classList.remove('is-playing');
        });
      });

      card.addEventListener('mouseleave', function () {
        card.classList.remove('is-playing');
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });
    });
  }

  /* ---------------------------------------------------------------------
     Boot
     --------------------------------------------------------------------- */
  function init() {
    root.classList.remove('no-js');
    initTheme();
    initCursor();
    initReveal();
    initMediaCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
