/* ==========================================================================
   Magnetic cursor — shared across every page.
   Builds its own DOM, so pages only need to load this file.
   ========================================================================== */
(function () {
  'use strict';

  // A custom cursor only makes sense where there is a pointer to replace.
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var root = document.documentElement;

  /* Past this, taking an element's bounds stops reading as a cursor and
     starts reading as a selection outline. Large media gets a chip instead. */
  var MAX_W = 420;
  var MAX_H = 260;

  var TARGETS = [
    'a[href]',
    'button',
    '[role="button"]',
    '[data-cursor]',
    '[data-video]',
    '[data-project]',
    '[onclick]',
    '.media-card',
    '.project-card'
  ].join(',');

  var cursor, boxEl, chipEl;
  var x = 0, y = 0, frame = null, locked = null;

  function build() {
    cursor = document.createElement('div');
    cursor.className = 'mcur';
    cursor.setAttribute('aria-hidden', 'true');

    boxEl = document.createElement('div');
    boxEl.className = 'mcur__box';

    chipEl = document.createElement('div');
    chipEl.className = 'mcur__chip';

    cursor.appendChild(boxEl);
    cursor.appendChild(chipEl);
    document.body.appendChild(cursor);
  }

  /* ---------------------------------------------------------------------
     What does clicking this actually do?
     An explicit data-cursor-label always wins; everything below is the
     fallback for elements that haven't been annotated.
     --------------------------------------------------------------------- */
  function labelFor(el) {
    if (el.dataset.cursorLabel) return el.dataset.cursorLabel;

    // Anything that plays.
    if (el.hasAttribute('data-video') || el.querySelector('video')) return 'Play';

    var onclick = el.getAttribute('onclick') || '';
    if (onclick.indexOf('openImageModal') !== -1) return 'Expand';
    if (onclick.indexOf('openVideoModal') !== -1) return 'Play';
    if (onclick.indexOf('openProjectModal') !== -1) return 'View';

    var href = el.getAttribute('href') || '';
    if (href) {
      if (href.indexOf('mailto:') === 0) return 'Email';
      if (/\.pdf($|\?)/i.test(href)) return 'Download';
      if (href.indexOf('projects/') !== -1) return 'View';
      if (/^https?:/i.test(href)) return 'Open';
      if (/\.html($|#|\?)/i.test(href)) return 'View';
    }

    return 'View';
  }

  function draw() {
    frame = null;

    if (locked) {
      boxEl.style.transform =
        'translate(' + locked.cx + 'px,' + locked.cy + 'px) translate(-50%,-50%)';
    } else {
      boxEl.style.transform = 'translate(' + x + 'px,' + y + 'px) translate(-50%,-50%)';
    }

    // The chip always follows the hand — it exists precisely because the
    // element underneath is too large to be worth outlining.
    chipEl.style.transform = 'translate(' + x + 'px,' + y + 'px) translate(-50%,-50%)';
  }

  function queue() {
    if (frame === null) frame = requestAnimationFrame(draw);
  }

  function lockTo(el) {
    var r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;

    cursor.classList.add('is-hovering');

    if (r.width > MAX_W || r.height > MAX_H) {
      cursor.classList.add('is-over-media');
      chipEl.textContent = labelFor(el);
      locked = null;
      queue();
      return;
    }

    cursor.classList.remove('is-over-media');
    locked = { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
    boxEl.style.width = r.width + 14 + 'px';
    boxEl.style.height = r.height + 10 + 'px';

    var radius = window.getComputedStyle(el).borderRadius;
    boxEl.style.borderRadius = radius && radius !== '0px' ? radius : '999px';
    queue();
  }

  function suspend() {
    cursor.classList.remove('is-active', 'is-hovering', 'is-over-media', 'is-pressed');
    root.classList.remove('has-magnetic-cursor');
    locked = null;
  }

  function release() {
    locked = null;
    cursor.classList.remove('is-hovering', 'is-over-media');
    boxEl.style.width = '';
    boxEl.style.height = '';
    boxEl.style.borderRadius = '';
    queue();
  }

  function init() {
    build();

    document.addEventListener('mousemove', function (e) {
      x = e.clientX;
      y = e.clientY;
      // Take over the native cursor only once there is a replacement to
      // show, so there is never a moment with no pointer on screen.
      if (!cursor.classList.contains('is-active')) {
        cursor.classList.add('is-active');
        root.classList.add('has-magnetic-cursor');
      }
      queue();
    }, { passive: true });

    // Delegated, so content added after load is covered too.
    document.addEventListener('mouseover', function (e) {
      // An iframe swallows pointer events entirely — the parent stops
      // receiving mousemove, so a custom cursor would freeze mid-page.
      // Hand control back to the native pointer for as long as we're over one.
      if (e.target.tagName === 'IFRAME') {
        suspend();
        return;
      }
      var t = e.target.closest ? e.target.closest(TARGETS) : null;
      if (t) lockTo(t); else release();
    }, { passive: true });

    document.addEventListener('mousedown', function () {
      cursor.classList.add('is-pressed');
    }, { passive: true });

    document.addEventListener('mouseup', function () {
      cursor.classList.remove('is-pressed');
    }, { passive: true });

    // Leaving the window, or scrolling a locked element out from under the
    // pointer, should not strand the outline.
    document.addEventListener('mouseleave', function () {
      cursor.classList.remove('is-active', 'is-pressed');
      root.classList.remove('has-magnetic-cursor');
      release();
    });

    window.addEventListener('scroll', function () {
      if (locked) release();
    }, { passive: true });

    window.addEventListener('blur', function () {
      cursor.classList.remove('is-pressed');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
