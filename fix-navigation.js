// Fix navigation by unregistering service worker and clearing cache
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
      console.log('Service worker unregistered');
    }
  });
}

// Clear all caches
if ('caches' in window) {
  caches.keys().then(function(names) {
    for (let name of names) {
      caches.delete(name);
      console.log('Cache deleted:', name);
    }
  });
}

// Override Next.js routing to allow normal navigation
document.addEventListener('DOMContentLoaded', function() {
  // Find all links with data-cursor attributes
  const links = document.querySelectorAll('a[data-cursor]');
  
  links.forEach(function(link) {
    link.addEventListener('click', function(e) {
      // Prevent Next.js from intercepting the click
      e.stopImmediatePropagation();
      
      // Allow normal navigation
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('mailto:')) {
        // Use normal navigation instead of Next.js routing
        window.location.href = href;
      }
    }, true); // Use capture phase to intercept before Next.js
  });
  
  console.log('Navigation override applied to', links.length, 'links');
});

console.log('Navigation fix applied - please refresh the page');
