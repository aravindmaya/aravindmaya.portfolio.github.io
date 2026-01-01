// Disable Next.js client-side routing for static site
(function() {
  'use strict';
  
  // Override Next.js router to use normal navigation
  if (window.next && window.next.router) {
    const originalPush = window.next.router.push;
    const originalReplace = window.next.router.replace;
    
    window.next.router.push = function(url, as, options) {
      if (typeof url === 'string' && url.startsWith('/')) {
        // Convert Next.js routes to actual file paths
        let filePath = url;
        if (url === '/') {
          filePath = '/index.html';
        } else if (!url.endsWith('.html')) {
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
        } else if (!url.endsWith('.html')) {
          filePath = url + '.html';
        }
        window.location.replace(filePath);
        return Promise.resolve();
      }
      return originalReplace.call(this, url, as, options);
    };
    
    console.log('Next.js routing disabled - using normal navigation');
  }
  
  // Also override any click handlers that prevent default
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.href && !link.href.startsWith('http') && !link.href.startsWith('mailto:')) {
      // Allow normal navigation for internal links
      e.stopImmediatePropagation();
      return true;
    }
  }, true);
  
})();
