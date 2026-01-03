// Disable Next.js client-side routing for static site
(function() {
  'use strict';
  
  function waitForNextRouter() {
    // Wait for Next.js router to be available
    if (window.next && window.next.router) {
      const originalPush = window.next.router.push;
      const originalReplace = window.next.router.replace;
      
      window.next.router.push = function(url, as, options) {
        if (typeof url === 'string' && url.startsWith('/')) {
          // Convert Next.js routes to actual file paths
          let filePath = url;
          if (url === '/') {
            filePath = '/index.html';
          } else if (!url.endsWith('.html') && !url.includes('.')) {
            filePath = url + '.html';
          }
          window.location.href = filePath;
          return Promise.resolve();
        }
        return originalPush.call(this, url, as, options);
      };
      
      window.next.router.replace = function(url, as, options) {
        if (typeof url === 'string' && url.startsWith('/')) {
          let filePath = url;
          if (url === '/') {
            filePath = '/index.html';
          } else if (!url.endsWith('.html') && !url.includes('.')) {
            filePath = url + '.html';
          }
          window.location.replace(filePath);
          return Promise.resolve();
        }
        return originalReplace.call(this, url, as, options);
      };
      
      console.log('Next.js routing disabled - using normal navigation');
      return true;
    }
    return false;
  }
  
  // Try immediately
  if (!waitForNextRouter()) {
    // If not available, wait for it
    let attempts = 0;
    const checkInterval = setInterval(function() {
      attempts++;
      if (waitForNextRouter() || attempts > 50) {
        clearInterval(checkInterval);
      }
    }, 100);
  }
  
  // Override link clicks to use normal navigation for internal links
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.href) {
      const href = link.getAttribute('href');
      // Only override internal links (not external, mailto, or anchor links)
      if (href && 
          !href.startsWith('http') && 
          !href.startsWith('mailto:') && 
          !href.startsWith('#') &&
          !href.startsWith('javascript:') &&
          link.target !== '_blank') {
        // Check if it's a file path (has .html or is a relative path)
        if (href.includes('.html') || href.startsWith('/') || href.startsWith('./')) {
          e.preventDefault();
          e.stopImmediatePropagation();
          window.location.href = href;
          return false;
        }
      }
    }
  }, true); // Use capture phase to intercept before Next.js
  
})();
